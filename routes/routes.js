
var redis           = require('redis');
var request         = require('request');

/* Start section for downloading laptop application from Central Server */
var fs = require('fs');

var _=require('lodash');

var os = require('os');
var dns = require('dns');

var client = redis.createClient();
client.on('ready', function () {
  console.log('Redis is ready');
})
client.on('connect', function() {
    console.log('Redis Connected');
});
client.on('error', function (err) {
    console.log("Redis Error::" + err);
});




var QRCode = require('qrcode');


module.exports = function (app) {
	
	/*app.post('/master/pushCodes/:companyId',function(request,response){
	
	client.hmset('auditCodes-'+request.params.companyId,JSON.parse(request.body),function(err,res){
		
   		response.send(res);       		
	});
	

});*/
	
	/******************chcking internet connection*********************/
    app.get('/api/checkInternet',function(req,res){
    	dns.lookup('www.google.com',function(err){
    		if (err && err.code == "ENOTFOUND"){
    			res.status(200).send({data:'NOT CONNECTED'});
    		}else{
    			res.status(200).send({data:'CONNECTED'});
    		}
    	}); 
    });
    
    app.get('/api/qrCodeGenerator/:data',function(req,res){
    	
    	QRCode.toDataURL(req.params.data, function (err, url) {
    		    		
    		res.status(200).send({data:url,statusText:'Successfully Generated'});
    			
    		});
    });
    

	
/*validation for Unique AuditCodes*/
app.get('/master/getAuditCodes/:companyId',function(request,response){ 
	client.get('auditCodes-'+request.params.companyId,function(err,res){
		
   		response.send(res);       		
	});
}); 


/*To populate the company domain name based on companyId"*/
app.get('/master/getDomainName/:companyId',function(request,response){ 
	client.get('company-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 


app.get('/master/getAuditTypes/:companyId',function(request,response){ 
	client.get('auditType-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 


app.get('/master/getManagerRegion/:companyId',function(request,response){ 
	client.get('region-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 


app.get('/master/verifyOfficialId/:officialId/:companyId',function(request,response){ 
	console.log(request.params.officialId);
	var user;
	client.get('users-'+request.params.companyId,function(err,res){
	
		user = _.filter(JSON.parse(res), function(d){ 
			return  d.managerOfficialId == request.params.officialId;
   		});
		if(err==null)
		response.status(200).send(user);
		else
			response.status(401).send(err);	
		
	}); 
	
});

app.get('/master/getManagerDetails/:regionId/:companyId',function(request,response){ 
	var region;
	client.get('users-2',function(err,res){
		
		var allocate=JSON.parse(res);
		if(allocate){
		for(var i = 0; allocate[i]!= null; i++)
		{
			
			if(allocate[i].region == request.params.regionId  && allocate[i].companyId==request.params.companyId && allocate[i].roles && allocate[i].roles[0] &&  allocate[i].roles[0].roleId==1003 && allocate[i].activeStatus==1){
				console.log(allocate[i].activeStatus);
				var result=true;
				
			}
			
		}
		}
		
		if(result==true)
		{
		response.json({"success":true});
		}
	else
		{	
		response.json({"success":false});
		}	
	


}); 
}); 




app.post('/master/getRegionalUsers',function(request,response){
	
	
	
	
	var users;
	
	client.get('users-'+request.body.companyId ,function(err,res){
	//IRI-5552 start here added by sudharsan
		if(request.body.roleId==1006){
			if(request.body.auditorRoleId!=1003){
					users = _.filter(JSON.parse(res), function(d){
						return (d.ihmreview==1 && d.roles && d.roles[0] && (d.roles[0].roleId==1001 || d.roles[0].roleId==1004));
					});
				}
				else{
					users = _.filter(JSON.parse(res), function(d){
						return (d.roles && d.roles[0] && d.region == 2 &&(d.roles[0].roleId==1003 || d.roles[0].roleId==1006));
					});					
				}
				//response.send(users);
				}
		else if(request.body.region && request.body.companyId && request.body.auditorRoleId && request.body.roleId){
					users = _.filter(JSON.parse(res), function(d){ 

						if(request.body.auditorRoleId==1006){
							return  d.region == request.body.region  && d.companyId== Number(request.body.companyId) && d.roles[0].roleId==request.body.auditorRoleId && d.roles[0].roleId == request.body.roleId;
						}
						else if(request.body.region == 2 && request.body.auditorRoleId==1003){
							return  d.region == request.body.region  && d.companyId== Number(request.body.companyId) && d.roles[0].roleId== 1003 || d.roles[0].roleId== 1006;
						}
						else if(request.body.auditorRoleId==1003 && (d.roleId!= 1006) && d.roles[0].roleId !=1006){
							console.log('inside second if')						
							return  d.region === request.body.region  && d.companyId== Number(request.body.companyId) && (d.roleId== 1003) &&d.ihmreview !=1;
						}
						else{
							return  d.region == request.body.region  && d.companyId== Number(request.body.companyId) && d.roles[0].roleId==request.body.auditorRoleId; //Added by sudharsan for Jira-ID 5570
						}
						
					});

				}
				//End here IRI-5552
		else if(request.body.region && request.body.companyId && request.body.auditorRoleId && request.body.auditorUserId){ 
			users = _.filter(JSON.parse(res), function(d){ 
				
				
    			return  d.region == request.body.region  && d.companyId== Number(request.body.companyId) && d.roles[0].roleId==request.body.auditorRoleId && d.emailId == request.body.auditorUserId;
			});
		}
    			
		
    			else if(request.body.auditorUserId && request.body.companyId && request.body.auditorRoleId)
    			{
    				users = _.filter(JSON.parse(res), function(d){ 
    					
    					
    					return  d.emailId == request.body.auditorUserId  && d.companyId==request.body.companyId && d.roles[0].roleId == request.body.auditorRoleId ;
    					
    				});
    				
    			}
    			else if(request.body.auditorUserId &&  request.body.region)
    			{
    				users = _.filter(JSON.parse(res), function(d){ 
    					
    					
    					return  d.emailId == request.body.auditorUserId  && d.companyId==request.body.companyId &&  d.region == request.body.region; 
							
    				});
    				
    			}
						
    			else if(request.body.auditorRoleId &&  request.body.region)
    			{
    				users = _.filter(JSON.parse(res), function(d){ 
    					
    					
    					return  d.roles[0].roleId == request.body.auditorRoleId  && d.companyId==request.body.companyId  && d.region == request.body.region; 
    				    					
    				});
    			}
    				else if(request.body.region && request.body.companyId)
        			{
        				users = _.filter(JSON.parse(res), function(d){ 
        					
        					
        					return  d.region == request.body.region  && d.companyId==request.body.companyId;
        				});
        				
        			}	
		
    			else if(request.body.auditorRoleId && request.body.companyId)
    			{
					//Modified by sudharsan for Jira-Id = IRI-5505 and IRI-5552
					users = _.filter(JSON.parse(res), function(d){
						console.log(d);
						if(request.body.auditorRoleId == "1003" || request.body.auditorRoleId == "1006"){
							return ((d.roles[0].roleId == request.body.auditorRoleId || d.roles[0].roleId == 1006) && d.companyId==request.body.companyId);
						}
						else
						{
							return   d.roles[0].roleId == request.body.auditorRoleId  && d.companyId==request.body.companyId;	
						return   d.roles[0].roleId == request.body.auditorRoleId  && d.companyId==request.body.companyId;	
							return   d.roles[0].roleId == request.body.auditorRoleId  && d.companyId==request.body.companyId;	
						}
					});
				
				// End here IRI-5552
    			}
		
    			/*else if(request.body.auditorUserId && request.body.companyId)
    			{
    				users = _.filter(JSON.parse(res), function(d){ 
    					
    					
    					return  d.emailId== request.body.auditorUserId  && d.companyId==request.body.companyId;
    				});
    				
    			}*/
		
				/*****Added for to display users with same name*****/
    			else if(request.body.auditorUserId && request.body.companyId)
    			{
    				users = _.filter(JSON.parse(res), function(d){ 
    					
    					return  d.firstName== request.body.firstName  && d.lastName== request.body.lastName && d.companyId==request.body.companyId;
    				});
    				
    			}
    			
    			else if(request.body.companyId)
    			{
    				users = _.filter(JSON.parse(res), function(d){ 
    					
    					
    					return d.companyId==request.body.companyId;
    				});
    				
    			}
		
		else if( (request.body.userQualified) && ( request.body.userQualified=='ismQualified' || request.body.userQualified=='ispsQualified' || request.body.userQualified=='mlcQualified' || request.body.userQualified=='ihmQualified' )){ // modified by sudharsan for JIRA -ID IRI-5552
					response.send( _.filter(users, function(d){ 
    					if(request.body.userQualified=='ismQualified' && d.ismreview)
    					{return d.ismreview==1;
    					
    					}
    					if(request.body.userQualified=='ispsQualified' &&  d.ispsReview)
    					{return d.ispsReview==1;
    					
    					}
    					if(request.body.userQualified=='mlcQualified' && d.mlcreview)
    					{return d.mlcreview==1;
    					
    					}
    					if(request.body.userQualified=='ihmQualified' && d.ihmreview)
    					{return d.ihmreview==1;
    					
    					}
    				})
					);
					
				}else{
					response.send( _.filter(users, function(d){
    					
    					
    					if(d.roles && d.roles[0] && d.roles[0].roleId==1001){
    						if(d.ismreview==1 || d.ispsReview==1 ||  d.mlcreview==1){
    							return d;
    						}
    					}else if(d.roles && d.roles[0] && d.roles[0].roleId!=1001){
    						return d;
    					}
    					
    					
    				})
					);
				}	
				response.send(users);  //Added by sudharsan for Jira-ID =  IRI-5552
				
							
		
		
			
		
	
	
	}); 
	
	}); 




/*validation for Unique company ImoNumber*/
app.get('/master/checkCmpnyImoNo/:companyImoNo/:companyId',function(request,response){

	
	client.get('vesselcmpny-'+request.params.companyId,function(err,res){  
		var allocate=JSON.parse(res);
		for(var i = 0; allocate[i]!= null; i++)
			{
			if(allocate[i].companyImoNo==request.params.companyImoNo)
				{
				var result=true;
				}
				}
		if(result==true)
			{
			response.json({"success":true});
			}
		else
			{	
			response.json({"success":false});
			}
			
		});
	}); 




app.get('/master/getVesselTypes/:companyId',function(request,response){ 
	client.get('vesselType-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
});

app.get('/master/getMaPort/:companyId',function(request,response){ 
	client.get('port-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 

/*Fetch typeahead data for PortId*/
app.get('/master/getPortId/:companyId',function(request,response){ 
	
	console.log("11");
	
	client.get('port-'+request.params.companyId,function(err,res){  
//		console.log(res)
   		response.send(res);       		
	});
});

/*validation for Unique vessel ImoNumber*/
app.get('/master/checkImoNo/:vesselImoNo/:companyId',function(request,response){

	
	client.get('vessel-'+request.params.companyId,function(err,res){  
		var allocate=JSON.parse(res);
		for(var i = 0; allocate[i]!= null; i++)
			{
			if(allocate[i].vesselImoNo==request.params.vesselImoNo)
				{
				var result=true;
				}
				}
		if(result==true)
			{
			response.json({"success":true});
			}
		else
			{	
			response.json({"success":false});
			}
			
		});
	}); 


app.get('/master/checkRandomNumber/:emailId/:RandomNumber',function(request,response){
	var users;
	
	client.get('users-2',function(err,res){
		
		
			users = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.emailId == request.params.emailId  && d.verificationCode==request.params.RandomNumber;
    		});
			
			response.send(users);
		
	
	
	}); 
	
	}); 

app.get('/master/nameBasedUserDetails/:emailId/:companyId',function(request,response){
	var users;
	

	client.get('users-'+request.params.companyId,function(err,res){
		
		
			users = _.filter(JSON.parse(res), function(d){ 
			
    			return  d.emailId == request.params.emailId;
    		});
			
			response.send(users);
		
	
	
	}); 
	
	}); 

app.get('/master/getMaRoles/:companyId',function(request,response){ 
	client.get('rolesDet-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 

/* creating typeaheads for email in update mode */
app.get('/master/getEmail/:companyId',function(request,response){ 
	client.get('users-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 



 


app.get('/master/getCmpnyDet/:companyId',function(request,response){ 
	client.get('vesselcmpny-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 

/*Fetch typeahead data for CompanyImoNumber*/
app.get('/master/getCompanyImoNo/:companyId',function(request,response){ 
	client.get('vesselcmpny-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 

/*Fetch typeahead data for VesselImoNumber*/
app.get('/master/getImoNo/:companyId',function(request,response){ 
	
	client.get('vessel-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
});



app.get('/master/getConfigDetails/:data/:companyId',function(request,response){ 
	
	client.get('DetailsConfig-'+request.params.companyId,function(err,res){
		var config;
		
			
			config = _.filter(JSON.parse(res), function(d){ 
				return  d.userId == request.params.data;
    		});
			
			response.send(config);
		
	}); 
	
});

app.get('/typeAhead/getAuditCode/:audType/:companyId',function(request,response){ 
	client.get('auditCodes-'+request.params.companyId,function(err,res){
		var auditCode;
		auditCode = _.filter(JSON.parse(res), function(d){ 
			return  d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(auditCode);
		
	}); 
	
});

app.get('/master/getVesselCompanyDetails/:imo/:companyId',function(request,response){ 
	client.get('vesselcmpny-'+request.params.companyId,function(err,res){
		var cmpny;
		cmpny = _.filter(JSON.parse(res), function(d){ 
			
			return  d.companyImoNo == request.params.imo;
    		});
			response.send(cmpny);
		
	}); 
	
});



app.get('/master/getVesselDetails/:imo/:companyId',function(request,response){ 
	//Modified by sudharsan for Jira-ID= IRI-5555 start here
	var obj='',vsselDtl='',vesselCompany='';
	function vesselDetails(){
	client.get('vessel-'+request.params.companyId,function(err,res){
		request.setTimeout(2000);
		vsselDtl = _.filter(JSON.parse(res), function(d){ 
			if (d.vesselImoNo == request.params.imo) {
				console.log(vsselDtl);
			return  d;
			}
    		});	
	});
	vesselCompanyDetails();
}

	function vesselCompanyDetails(){
		client.get('vesselcmpny-'+request.params.companyId,function(err,res){
			
			if(vsselDtl[0]!=null && vsselDtl[0]!=undefined){
				vesselCompany = _.filter(JSON.parse(res), function(e){ 
					if( e.companyImoNo == vsselDtl[0].companyImoNo){
						
						return e;
					}
					
					});
			
				obj = {'vsselDtl':vsselDtl,'vesselCompany':vesselCompany }
				response.send(obj);
			}
			else{
				obj = {'vsselDtl':vsselDtl,'vesselCompany':vesselCompany }
				response.send(obj);
			}
		});
	}
	vesselDetails();
	//Modified by sudharsan for Jira-ID= IRI-5555 end here
});




app.get('/typeAhead/getVesselCompanyImoNo/:cImoNo/:companyId',function(request,response){ 
	var vesselCompany;
	client.get('vesselcmpny-'+request.params.companyId,function(err,res){
	
		vesselCompany = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.companyImoNo == request.params.cImoNo;
    		});
			response.send(vesselCompany);
		
	}); 
	
});


app.get('/typeAhead/getAuditSubType/:auditType/:companyId',function(request,response){ 
	var auditSubType;
	client.get('auditSubType-'+request.params.companyId,function(err,res){
	
		auditSubType = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.auditTypeId == request.params.auditType && d.activeStatus == 1;
    		});
			response.send(auditSubType);
		
	}); 
	
});



app.get('/typeAhead/getAuditStatus/:audType/:companyId',function(request,response){ 
	var auditStatus;
	client.get('auditStatus-'+request.params.companyId,function(err,res){
	
		auditStatus = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(auditStatus);
		
	}); 
	
});



app.get('/typeAhead/getCertificateIssued/:audType/:companyId',function(request,response){ 
	var certificateIssue;
	client.get('certIssue-'+request.params.companyId,function(err,res){
	
		certificateIssue = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(certificateIssue);
		
	}); 
	
});



app.get('/typeAhead/getObsCategory/:audType/:companyId',function(request,response){ 
	var findings;
	client.get('findings-'+request.params.companyId,function(err,res){
	
		findings = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(findings);
		
	}); 
	
});



app.get('/typeAhead/getObsStatus/:audType/:companyId',function(request,response){ 
	var status;
	client.get('status-'+request.params.companyId,function(err,res){
	
		status = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(_.sortBy(status, 'findingsStatusId'));
		
	}); 
	
});


app.get('/typeAhead/getAudObsType/:companyId',function(request,response){ 
	var roles;
	client.get('auditRoles-'+request.params.companyId,function(err,res){
	
		roles = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.activeStatus == 1;
    		});
			response.send(roles);
		
	}); 
	
});


app.get('/typeAhead/getReportTypes/:audType/:companyId',function(request,response){ 
	var attachmentTypes;
	client.get('attachmentTypes-'+request.params.companyId,function(err,res){
	
		attachmentTypes = _.filter(JSON.parse(res), function(d){ 
				
    			return d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(attachmentTypes);
		
	}); 
	
});

app.get('/typeAhead/getAuditSummary/:audType/:companyId',function(request,response){ 
	var auditSummary;
	client.get('auditSummary-'+request.params.companyId,function(err,res){
	
		auditSummary = _.filter(JSON.parse(res), function(d){ 
				
    			return d.auditTypeId == request.params.audType && d.activeStatus == 1;
    		});
			response.send(auditSummary);
		
	}); 
	
});

app.get('/typeAhead/getAudObsData/:companyId',function(request,response){
	var users;
	client.get('users-'+request.params.companyId,function(err,res){
	
		users = _.filter(JSON.parse(res), function(d){ 
			
    			return d.activeStatus == 1 && d.roles.length>0 && ( d.roles[0].roleId==1001 || d.roles[0].roleId==1003 || d.roles[0].roleId==1004);
    		});
		
		response.send(users);
	}); 
});

app.get('/typeAhead/getAudObsDataAll/:companyId',function(request,response){
	var users;
	client.get('users-'+request.params.companyId,function(err,res){
	
		users = _.filter(JSON.parse(res), function(d){ 
			
    			return d.roles.length>0 && ( d.roles[0].roleId!=1002);
    		});
		
		response.send(users);
	}); 
});



app.get('/typeAhead/getAudObsDataMangers/:companyId',function(request,response){
	var users;
	client.get('users-'+request.params.companyId,function(err,res){
	
		users = _.filter(JSON.parse(res), function(d){  
				
    			return d.activeStatus == 1 && d.roles.length>0 &&  (d.roles[0].roleId==1003 || d.roles[0].roleId==1001);
    		});
		
		response.send(users);
	}); 
});


app.get('/typeAhead/getAllFindingCategory/:companyId',function(request,response){ 
	var findings;
	client.get('findings-'+request.params.companyId,function(err,res){
	
		findings = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.activeStatus == 1;
    		});
			response.send(findings);
		
	}); 
	
});



app.get('/typeAhead/getAllAuditStatus/:companyId',function(request,response){ 
	var status;
	client.get('auditStatus-'+request.params.companyId,function(err,res){
	
		status = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.activeStatus == 1;
    		});
			response.send(status);
		
	}); 
	
});





app.get('/typeAhead/getAllAuditSubTypes/:companyId',function(request,response){ 
	var status;
	client.get('auditSubType-'+request.params.companyId,function(err,res){
	
		status = _.filter(JSON.parse(res), function(d){ 
				
    			return  d.activeStatus == 1;
    		});
			response.send(status);
		
	}); 
	
});

app.get('/master/getDefaultHomeScreen/:companyId',function(request,response){ 
	client.get('screenData-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 
/* Start section for downloading laptop application from Central Server */

app.post('/laptop/downloadSoft', function(req,res){		
	if(fs.existsSync('./LaptopSoft/LaptopSoftware.exe')){			
		fs.createReadStream('./LaptopSoft/LaptopSoftware.exe').pipe(res.status(200));
	}else{	
		res.status(404).send({'error':'File not found'});
	}
});

app.post('/api/savePdfFile', function(req,res){
	console.log("*****"+req.body.tempPath);
	var dir = req.body.tempPath;
	var createDir = createAuditTypeDir(dir,req);
	/*var theJSON = JSON.stringify(req.body.fileData);
	var uri = "data:application/pdf;charset=UTF-8," + encodeURIComponent(theJSON); */
	var filepath = dir+'/'+"ISM"+'/'+'testing/';
	console.log(filepath);

	
	if(createDir == 'SUCCESS'){
		fs.exists(dir+'/'+'tempPdfFile/'+req.body.certificateNo+'.pdf', function(exists) {
		    if(exists == true){
		    	fs.unlink(dir+'/'+'tempPdfFile/'+req.body.certificateNo+'.pdf', function(error) {
		    	    if (error) {
		    	        throw error;
		    	    }
		    	    else{
		    	    	fs.writeFile(dir+'/'+'tempPdfFile/'+req.body.certificateNo+'.pdf', req.body.fileData, 'binary', function(err,respp){
		        			if(err==null){
		    					res.send(filepath);
		    					console.log("Success"+respp);
		    				}else{
		    					console.log("err"+err);
		    					if(err.error){
		    						
		    						var error = err.error.toString();
		    						console.log(error);
		    					}
		    					res.status(200).send({data:'ERRORssss'});
		    				}
		    		  });
		    	    }
		    	});
		    }
		    else {
		    	fs.writeFile(dir+'/'+'tempPdfFile/'+req.body.certificateNo+'.pdf', req.body.fileData, 'binary', function(err,respp){
        			if(err==null){
    					res.send(filepath);
    					console.log("Success"+respp);
    				}else{
    					console.log("err"+err);
    					if(err.error){
    						
    						var error = err.error.toString();
    						console.log(error);
    					}
    					res.status(200).send({data:'ERRORssss'});
    				}
    		  });
		    }
		});
	}else{
		res.status(200).send({data:'Folder Not Created'});
	}
});

function createAuditTypeDir(dir,req){
var result = '';
if (!fs.existsSync(dir)){
	
    /*fs.mkdirSync(dir);
    fs.mkdirSync(dir+'/'+"ISM");*/

	fs.mkdirSync(dir+'/'+req.body.name);

    result = 'SUCCESS';
}else{
	if(!fs.existsSync(dir+'/'+req.body.name)){
		fs.mkdirSync(dir+'/'+req.body.name);
		
		//fs.mkdirSync(dir+'/'+"ISM"+'/'+req.body.name);
		
	    result = 'SUCCESS'
	}/*else{
		if(!fs.existsSync(dir+'/'+"ISM"+'/'+req.body.name)){					
			fs.mkdirSync(dir+'/'+"ISM"+'/'+req.body.name);
			
			result = 'SUCCESS';
		}
	}*/
	 result = 'SUCCESS';
}
return result;
}

app.get('/master/getCurrentUserDetail/:emailId/:companyId',function(request,response){
	
	console.log(request.params.emailId +request.params.companyId);
	var currUser;
	
	client.get('users-'+request.params.companyId,function(err,res){
		
		currUser = _.filter(JSON.parse(res), function(d){ 
			
			
    				return  (d.emailId).toLowerCase() == (request.params.emailId).toLowerCase() && d.companyId==request.params.companyId;
    			});
			
		response.send(currUser);
	});
});

app.get('/master/getCurrentUserFullName/:emailId/:companyId',function(request,response){
	
	console.log(request.params.emailId +request.params.companyId);
	var currUser;
	
	client.get('users-'+request.params.companyId,function(err,res){
		
		currUser = _.filter(JSON.parse(res), function(d){
    				return  (d.emailId).toLowerCase() == (request.params.emailId).toLowerCase() && d.companyId==request.params.companyId;
    			});
		if(currUser[0]){
		response.send({'userName' : (currUser[0].firstName +" "+ currUser[0].lastName)});
		}
	
	});
});



app.get('/master/getCertificateIssueReason/:companyId',function(request,response){ 
	client.get('CertificateIssueReason-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 

app.get('/master/getCertificateReissueReason/:companyId',function(request,response){ 
	client.get('CertificateReissueReason-'+request.params.companyId,function(err,res){    	
   		response.send(res);       		
	});
}); 

app.get('/master/getEcGrantedReason',function(request,response){ 
	client.get('EcGrantedReason-',function(err,res){    	
   		response.send(res);       		
	});
}); 

app.get('/typeAhead/getReportType/:audType/:companyId/:audSubType',function(request,response){ 
	var attachmentTypes; 
	client.get('attachmentTypes-'+request.params.companyId,function(err,res){
	
		attachmentTypes = _.filter(JSON.parse(res), function(d){ console.log(d);
				
    			return d.auditTypeId == request.params.audType &&  d.auditSubTypeId == request.params.audSubType ;
    		});
			response.send(attachmentTypes);
		
	}); 
	
});


};