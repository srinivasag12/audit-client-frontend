
(function (){
    'use strict';
   
    angular
        .module('app.certificate.generate')        
        .controller('certificateGenerateController', certificateGenerateController);
    
    function certificateGenerateController(AppConstant,$scope,$state,auditFactory,detailsFactory,auditService,CERTI_URL,blockUI ,DTOptionsBuilder,DTColumnBuilder, $q,$compile,certificateFactory,$cookies,$timeout,searchRequiredData,toaster,YYYYMMDD,MMMDDYYYY){

    	console.log(searchRequiredData)
    	console.log($state.current.data.pageTitle)
    	/*********variable declaration start**********/
    	
    	var certGenerate = this; 
    	console.log(certGenerate);
    	
    	certGenerate.AppConstant = AppConstant;
    	
    	certGenerate.showCertificateScreen = false;
    	
    	certGenerate.toggle       = toggle;
    	
    	certGenerate.downloadCertificate = downloadCertificate;
    	
    	certGenerate.managerPublished = true;
    	
		certGenerate.managerHide = false;
    	
    	certGenerate.names = [];
    	
    	certGenerate.certSubType = '';
    	
    	certGenerate.messageAudit = '';
    	
    	certGenerate.toggleSwitch = '';
    	
    	certGenerate.certSearchCriteria = {
    			certificateNo  : '',
    			companyImoNo : '',
    			certIssueDate  : '',
    			certExpireDate : '',
    			activeStatus   : '',
    			auditTypeId    : '',
    			auditSubTypeId : '',
    			vesselImoNo    : '',
    			checkCertVthAudit : 1001,
    			certDes : ''
    			
    	};
    	
    	certGenerate.showBlock = false;
    	
    	certGenerate.hideCert = false;
    	
    	certGenerate.proceed = false;

        certGenerate.vesselData        = searchRequiredData[0];
        
        certGenerate.audtype           = searchRequiredData[1];
        
        certGenerate.latestCreatedImo	= searchRequiredData[7];
        
        certGenerate.audtype = certGenerate.audtype.filter(function (obj){
    		return (obj.auditTypeId < certGenerate.AppConstant.SSP_TYPE_ID)
    	});
        
      
        certGenerate.activeinactive=[{id:'1',value:'Active'},{id:'0',value:'Inactive'},{id:'2',value:'All'}];
        
        
        /*********variable declaration end**********/
    	
        /*********function declaration start**********/
        
        certGenerate.search = search;
    	
    	certGenerate.getCertSearchData = getCertSearchData;
    	
    	certGenerate.certSearchData = [];
    	
    	certGenerate.certExtData = [];
    	
    	certGenerate.showCertificateDetail = showCertificateDetail;
    	
    	certGenerate.validateSearhCriteria = validateSearhCriteria;
    	
    	certGenerate.setVessel         = setVessel;
    	
    	certGenerate.back              = back;
    	
    	certGenerate.clear             = clear;
    	
    	/*********function declaration end**********/

    	function showCertificateDetail(){
    		if(certGenerate.setCert || !certGenerate.managerPublished){
    			var certGen;
				sessionStorage.setItem('certificateSeachTypes','Search'); //Added by sudharsan for Jira-ID IRI-5667
    			if(certGenerate.setCert)
    				certGen = certGenerate.certExtData[certGenerate.setCert.certDes];
    			else if(!certGenerate.managerPublished)
    				certGen = certGenerate.certExtData[0];
    			certGenerate.toggleSwitch = '';
    			if(!certGenerate.managerPublished){
    				if(sessionStorage.getItem('emailId')==certGen.issuerId)
    					showData(certGen.auditSeqNo, certGen.companyId, certGen.utn, certGen.seqNo, certGen.activeStatus, certGen.generateStatus,certGen.reqCertDesc);
    				else
    					toaster.warning("Certificate is already generated and not yet published by Manager "+ certGen.issuerName + ".");		//changed by @Ramya for Jira id - IRI-5645
    			}else
    				showData(certGen.auditSeqNo, certGen.companyId, certGen.utn, certGen.seqNo, certGen.activeStatus, certGen.generateStatus,certGen.reqCertDesc);
    			
    		}else
    			toaster.warning('Please select the Certificate Type');
    		
    	}
    	
    	function showData(auditSeqNo,companyId,utn,seqNo,activeStatus,generateStatus,reqCertDesc){
    		
    		sessionStorage.setItem('certAuditSeqNo',auditSeqNo);
    		sessionStorage.setItem('certCompanyId',companyId);
    		sessionStorage.setItem('certUTN',utn);
    		sessionStorage.setItem('certSeqNo',seqNo);
    		sessionStorage.setItem('certActiveStatus',activeStatus);
    		sessionStorage.setItem('certGenerateStatus',generateStatus);
    		sessionStorage.setItem('certificateSeachType','managerSearch');
    		sessionStorage.setItem('managerSearch',reqCertDesc);
    		sessionStorage.setItem('managerPublished',certGenerate.managerPublished);
    		sessionStorage.setItem('managerHide',certGenerate.managerHide);
    		certGenerate.showCertificateScreen = true;
    		certGenerate.hideCert = false;
    		$timeout(function(){
    			certGenerate.proceed = true;
        		angular.element(document.querySelector('#collapseAtTwo')).click();
        		
        	},1000);
    		
            //$state.go('app.certificate.details',{'certificate':'managerSearch'},{ reload: true });
    		
    	}
    	
    	function toggle(event){
    		console.log(certGenerate.certSearchData)
    		console.log(certGenerate.toggleSwitch)
			//Added by sudharsan for Jira-Id = IRI-5649 start here
			var vesselImoNo_data = certGenerate.certSearchCriteria.vesselImoNo.vesselImoNo?certGenerate.certSearchCriteria.vesselImoNo.vesselImoNo:certGenerate.certSearchCriteria.vesselImoNo
			detailsFactory.getPreviousAuditDetail(certGenerate.certSearchCriteria.auditTypeId,vesselImoNo_data,2).$promise.then(function(respre){
				console.log(respre);
				certGenerate.prevAuditDtl = respre.prevAuditDtl;
			});
    		//Added by sudharsan for Jira-Id = IRI-5649 end here
        	var parent=angular.element(document.querySelector('#collapseAtOne'));
        		if(angular.element(event.target).hasClass('collapsed')){
        			if(certGenerate.toggleSwitch!='close'){
	        			for(var i=0; i<parent.context.childElementCount; i++){
	        				
	        				angular.element(parent[0].childNodes[i].firstChild).addClass('collapsed');
	        				angular.element(parent[0].childNodes[i].lastChild).removeClass('in');
	        				
	        			}
	        			
	        			angular.element(event.target).removeClass('collapsed');
	            		
	        			angular.element(event.target.parentNode.lastChild).addClass('in');
	        			
	        			if(certGenerate.proceed)
	        				search(0,'manualClick');
        			}
    			}
        		else{
        			if(certGenerate.toggleSwitch!='open'){
		        		angular.element(event.target).addClass('collapsed');
		            	angular.element(event.target.parentNode.lastChild).removeClass('in');
        			}
        		}
        		certGenerate.toggleSwitch = '';
    	}
    	
    	function downloadCertificate (res){
        	blockUI.start("Preparing Certificate");
    		console.log("sequence Number",res);
    		auditFactory.qrCodeGenerator(CERTI_URL+res.qid).$promise.then(function(response){

				certGenerate.qrCodeData= response.data;

				if(res){
					//Added by sudharsan for Jira-Id = IRI-5649 start here
					certGenerate.prevAuditDtl.reverse();
					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue =[], intermediateReissue= [];
					var directInterorAdd = certGenerate.prevAuditDtl.length!=0 && certGenerate.prevAuditDtl.length!=0?
												(certGenerate.prevAuditDtl[0].auditSubTypeId!=undefined?
													(certGenerate.prevAuditDtl[0].auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certGenerate.prevAuditDtl[0].auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID)?true:
													false:
													(res[0].auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || res[0].auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID)?true:
												false):
											false;
					//Added by sudharsan for Jira-Id = IRI-5649 end here
					var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
					console.log(auditDate);
					// getAuditCertificateInActive
					if(res.getExactActiveStatus == 1 /*|| res.activeStatus == 'Active'*/){
						console.log("Active status");
						detailsFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){//Added by sudharsan for Jira-Id = IRI-5649 start here
							console.log(result);
								//Added by sudharsan for Jira-ID = IRI-5690 ,IRI-5693,IRI-5673 Start here
								for (var i = 0; i<result.length; i++){
									console.log(result[i].activeStatus);
									result[i].activeStatus ==0?result[i].activeStatus =1:result[i].activeStatus;
									console.log(result[i].activeStatus);
								}//Added by sudharsan for Jira-ID = IRI-5690 ,IRI-5693,IRI-5673 End here	
							downloadAllCertificate(result,res,response,"active");
						});
					}else{
						console.log("In-Active status");
						//Added by sudharsan for Jira-Id = IRI-5649 start here
						detailsFactory.getAuditCertificateInActive(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){
    						
    						if(result.length == 0){
								detailsFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){
									if(directInterorAdd){
										/**With chibi certificate changes this part of code not required */
										result.forEach(function updateactivestatus(inactive_certificate){
											inactive_certificate.activeStatus = 0;
										});
										/**End here */
									}
									downloadAllCertificate(result,res,response,"extent-inactive");
								});
							}else{
								
								if(directInterorAdd){
									/**With chibi certificate changes this part of code not required */
									result.forEach(function updateactivestatus(inactive_certificate){
										inactive_certificate.activeStatus = 0;
									});
									/**End here */
								}
								//Added by sudharsan for Jira-Id = IRI-5649 end here
							downloadAllCertificate(result,res,response,"inactive");
							}
        				});
					}
				}else{
					blockUI.stop();
				}

			});
    		
        }
    	
    	function downloadAllCertificate(result,res,response,txt){
	    	var newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue1 =[],additionalReissue2 =[];
	    	var currInitialPage=[],additionalReissue3 =[], intermediateReissue1= [],additional1=[],additional2=[],additional3=[],intermediate1=[];
			var overallAddCnt=0,overallInterCnt=0;
			console.log(res)
			var auditSubTypeId = certGenerate.auditSubTypeId,
			certificaIssueId = certGenerate.certIssueId,
			tempAuditSeqNo = certGenerate.auditSeqNo;
			var latestNumber = [];
			
			var directinter;  //Added by sudharsan for Jira-Id = IRI-5649
			var directadditional;  //Added by sudharsan for Jira-Id = IRI-5649
			
			var latestAudit=res;
			var certResult =result;
			var countIni=0;
			if(res.certIssueId==1008)
				certResult.forEach(function(a,index){
					if(a.certIssueId==1008){//reissue and extension
						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
					}
				
				});
			
			if(res.certIssueId==1003)
				certResult.forEach(function(a,index){
					if(a.certIssueId==1003){//reissue and extension
						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
					}
				
				});
			certResult.sort(function(c, d){
	            return c.auditSeqNo - d.auditSeqNo || c.seqNo - d.seqNo ;
	        });
			//Added by sudharsan for Jira-Id = IRI-5649 start here
			directinter = certResult[0].auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certResult[0].certIssueId != 1008;
			directadditional= certResult[0].auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID && certResult[0].certIssueId != 1008;
			if(directinter || directadditional){
				var check =true;
				certResult.reverse();
				certResult.forEach(function(certificates){
					if(certificates.certIssueId == 1008 && check){
						certResult.forEach(function(mod){
							if (mod.auditSeqNo<certificates.auditSeqNo){
								mod.reissuedinanother = true;
							}
						});	
						check = false;
					}
				});
				certResult.reverse();
			}
			//Added by sudharsan for Jira-Id = IRI-5649 End here
			certResult.forEach(function(a){
				if(a.auditSubTypeId==1002 || a.auditSubTypeId==1004 || a.auditSubTypeId==1001)
					countIni++;
				if(a.certIssueId==1008 && a.seqNo==1)
    				a.getEndrosedCount=0
				if(a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' || a.certIssueDesc=='INTERIM'){
					(a.certOderNo<=res.certOderNo) ? currInitialPage={0:a} : currInitialPage.length==0 ? ' ' : currInitialPage[0];
				}
			});
			
			if(countIni==0)
				certGenerate.directInterAdd= "directInterAdd";
			certResult.forEach(function(a){
				a.nameItalics = false;
				a.nameFull = '';
				a.sealImage = '';
				if (a.title.indexOf('Special') >= 0) {
					a.sealImage = sourceToDataURL('sa');
				} else if (a.title.indexOf('Deputy') >= 0) {
					a.sealImage = sourceToDataURL('dc');
				}
				
				if (a.nameToPrint == 1) {
					a.nameFull = a.issuerName + '\n';
					a.nameItalics = false;
				}
				else if (a.nameToPrint == 0) {
					a.nameFull = '(Name) \n';
					a.nameItalics = true;
				}
				
							
				if(a.auditSubTypeId === certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId==1005 && a.getEndrosedCount==1){
					if(a.auditSubTypeId === certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID)
						latestNumber.push(a.auditSeqNo);
					overallAddCnt++;
					a.overallAddCnt=overallAddCnt;
				}	
				
				if(a.auditSubTypeId == certGenerate.AppConstant.INITIAL_SUB_TYPE_ID)
					a.initialAvail = true;
				else
					a.initialAvail = false;
				
				if(a.auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId==1004 && a.getEndrosedCount==1){
					overallInterCnt++;
					a.overallInterCnt=overallInterCnt;
				}
				
				if(a.auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1){
					overallAddCnt++;
					a.overallAddCnt=overallAddCnt;
					a.addReissue = true;
				}
				else if((a.reissuedinanother!=undefined?a.reissuedinanother:false) && a.auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID )  //Added by sudharsan for Jira-Id = IRI-5649
					a.addReissue = true;
				else
					a.addReissue = false;
				
				if((a.auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1)){
					
					overallInterCnt++;
					a.overallInterCnt=overallInterCnt;
					a.interReissue = true;
					a.addReissue = true;
				}
				else if((a.reissuedinanother!=undefined?a.reissuedinanother:false) && a.auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID) //Added by sudharsan for Jira-Id = IRI-5649
					a.interReissue = true;
				else
					a.interReissue = false;
				
				if(a.auditSubTypeId == certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID && a.auditStatusId != 1004){
					a.renewalEndorsedAvail = true;
				}else
					a.renewalEndorsedAvail = false;
			});
			
			var maximum = Math.max.apply(null, latestNumber); // get the max of the array
			latestNumber.splice(latestNumber.indexOf(maximum), 1); // remove max from the array
		    var maximum2 = Math.max.apply(null, latestNumber); // get the 2nd max
			var latestSeqNumber = '';
			var getEndrosedCountLatest = '';
			certResult.forEach(function(a){
				if (a.auditSeqNo === maximum2) {
					latestSeqNumber = a.seqNo;
					getEndrosedCountLatest = a.getEndrosedCount;
					a.latestSeqNumber = latestSeqNumber;
				}
			});
			
			var certorderInter=0;
			certResult.forEach(function(a,index){
				
				a.withoutIntermediate = false;
				
				a.auditPlace = a.auditPlace?decodeURIComponent(atob(a.auditPlace)) : '';
	
				a.certExpireDate = a.certExpireDate ? moment(a.certExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.certIssueDate = a.certIssueDate ? moment(a.certIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.auditDate = a.auditDate ? moment(a.auditDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.dateOfRegistry = a.dateOfRegistry ? moment(a.dateOfRegistry,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.issuerSignDate = a.issuerSignDate ? moment(a.issuerSignDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.extendedIssueDate = a.extendedIssueDate ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.extendedExpireDate = a.extendedExpireDate ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.prevAuditIssueData = a.prevAuditIssueData ? moment(a.prevAuditIssueData,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
				
				a.issuerSign = atob(a.issuerSign);
				
				a.auditStatusId = a.auditStatusId;
	
	
				if(a.certIssueId == 1003 || a.certIssueId  == 1006){
					if(a.auditSubTypeId==1001 || a.auditSubTypeId==1002 || a.auditSubTypeId==1004){
						console.log(a)
						if(a.certIssueId == certificaIssueId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
						(a.certOderNo<=latestAudit.certOderNo) ? extension={0:a} : '';
					}
					
				}else if(a.certIssueId  == 1007){
	
					if(a.certIssueId == certificaIssueId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
	
					(a.certOderNo<=latestAudit.certOderNo) ? renewalEndorse2={0:a} : '';
	
				}
							
				if(a.auditSubTypeId== certGenerate.AppConstant.INITIAL_SUB_TYPE_ID  || a.auditSubTypeId == certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID ||a.auditSubTypeId == certGenerate.AppConstant.INTERIM_SUB_TYPE_ID){
	
				//	certGenerate.newCertificateSign = "data:image/png;base64,"+a.issuerSign;
	
					console.log("Initial");
					console.log(a.auditSubTypeId == auditSubTypeId);
					if(a.auditSubTypeId == auditSubTypeId){
	
					a.withoutCross = true;
					}else{
					a.withoutCross = false;
					}
					//console.log("FULLTERM..!!");
					a.certOderNo<=latestAudit.certOderNo?newCertificate.push(a):'';
	
				}else if(a.auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID){
					if(a.overallAddCnt==1){
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?a.reissuedinanother!=undefined?(a.reissuedinanother?additionalReissue1={0:a}:additional1={0:a}):additional1={0:a}:''; //Added by sudharsan for Jira-Id = IRI-5649
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue1={0:a}:'';
					}else if(a.overallAddCnt==2){
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?a.reissuedinanother!=undefined?(a.reissuedinanother?additionalReissue2={0:a}:additional2={0:a}):additional2={0:a}:'';  //Added by sudharsan for Jira-Id = IRI-5649
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue2={0:a}:'';
					}else if(a.overallAddCnt==3){
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?a.reissuedinanother!=undefined?(a.reissuedinanother?additionalReissue3={0:a}:additional3={0:a}):additional3={0:a}:'';  //Added by sudharsan for Jira-Id = IRI-5649
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue3={0:a}:'';
					}
					if(newCertificate.length == 0)	{
						
						if(a.certIssueId == certificaIssueId && reIssue){
	
							a.withoutCross = true;
							}else{
							a.withoutCross = false;
							}
						
						var copyData = angular.copy(a);
						copyData.withoutIntermediate = true;
						newCertificate.push(copyData);
					}
				}else if(a.auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
					console.log("Intermediate");
					
					if(a.certIssueId  == 1004)
					{
					if(a.auditSubTypeId == auditSubTypeId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
						
						if(a.overallInterCnt==1)
						a.certOderNo<=latestAudit.certOderNo ? !(a.reissuedinanother)?intermediate1={0:a}:'':''; //Added by sudharsan for Jira-Id = IRI-5649
						else if(a.overallInterCnt>=2){
							(a.certOderNo<=latestAudit.certOderNo) && (additionalReissue1.length==0) ? additionalReissue1={0:a}:'';
						}else if(a.overallInterCnt>=3){
							(a.certOderNo<=latestAudit.certOderNo) && (additionalReissue2.length==0) ? additionalReissue2={0:a}:'';
						}else if(a.overallInterCnt>=4){
							(a.certOderNo<=latestAudit.certOderNo) && (additionalReissue3.length==0) ? additionalReissue3={0:a}:'';
						}
						
					}
					
					if(a.certIssueId  == 1008 || a.reissuedinanother){ //Added by sudharsan for Jira-Id = IRI-5649
						if(a.overallInterCnt>=1){ //Modified by sudharsan for Jira-ID = IRI-5694
							a.certOderNo<=latestAudit.certOderNo ? intermediateReissue1={0:a}:'';
						}
						// else if(a.overallInterCnt==2){	
						// 	(a.certOderNo<=latestAudit.certOderNo) && (additional1.length==0) ? additional1={0:a}:'';
						// }
						// else if(a.overallInterCnt==3){
						// 	(a.certOderNo<=latestAudit.certOderNo) && (additional1.length==0) ? additional1={0:a}:'';
						// }
						// else if(a.overallInterCnt==4){
						// 	(a.certOderNo<=latestAudit.certOderNo) && (additional1.length==0) ? additional1={0:a}:'';
						// }
					}
					
					if(newCertificate.length == 0)	{
						
						if(a.certIssueId == certificaIssueId && reIssue){
	
							a.withoutCross = true;
							}else{
							a.withoutCross = false;
							}
						
						var copyData = angular.copy(a);
						copyData.withoutIntermediate = true;
						newCertificate.push(copyData);
					}
				}
				if(certGenerate.directInterAdd== 'directInterAdd' && (a.auditSubTypeId==certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID || a.auditSubTypeId==certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || a.certIssueId == 1007 || a.certIssueId == 1006)){
					
					if(certorderInter<a.auditSeqNo){
						certorderInter=a.auditSeqNo;
					}
					console.log("DetailscertDetails", certorderInter);
					console.log("newCertificate", a.auditSeqNo);
					(a.auditSeqNo==certorderInter) ? currInitialPage={0:a} :  ' ';
				}
				
			});	
			console.log("DetailscertDetails",result);
			console.log("newCertificate",newCertificate);
			
			certGenerate.signature = result;
			
			// $scope.qrString = CERTI_URL + res.companyId +'?Cqid='+ newCertificate[0].qid;
			var certificateDatas={
	
					'certificateNo' :newCertificate[0].certificateNo,
					'AuditTypeId'   :newCertificate[0].auditTypeId,
					'AuditStatusId' :newCertificate[0].auditStatusId,
					'vesselName'    :newCertificate[0].vesselName,
					'officialNo'    :newCertificate[0].officialNo,
					'distinletter'  :newCertificate[0].officialNo,
					'vesselImoNo'   :newCertificate[0].vesselImoNo,
					'CompanyId'		:newCertificate[0].companyId,
					'AuditSeqNo'	:newCertificate[0].auditSeqNo,
					'UserIns'		:'BSOL',
					'grt'			:newCertificate[0].grt,
					'DateIns'		:moment(new Date()).format(MMMDDYYYY),
					'portofreg'		:newCertificate[0].portOfRegistry,
					'shiptype'      :newCertificate[0].vesselType,
					'currInitialPage':currInitialPage,
					'companyaddress':newCertificate[0].vesselCompanyAddress,
					'companyname'   :newCertificate[0].vesselCompanyName,
					'companyimono'  :newCertificate[0].companyImoNo,
					'expirydate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
					'auditplace'	:newCertificate[0].auditPlace,
					'certissuedate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
					'auditSubTypeId':newCertificate[0].withoutIntermediate == true ? 1002 : newCertificate[0].auditSubTypeId,
					'AuditDate'		:newCertificate[0].auditDate,
					'ispsPreviousIssueDate'  : newCertificate[0].prevAuditIssueData,
					'consecutiveId'	: newCertificate[0].consecutiveId,
					'auditDate'     :newCertificate[0].auditDate,
									'LeadAuditorSign':newCertificate[0].issuerSign,
									'headSubTitleism' :'Issued under the provisions of the International Convention for the Safety',
									'headSubTitleism1':'of Life at Sea, 1974(SOLAS), as amended',
									'certify':'THIS IS TO CERTIFY THAT',
									'res':newCertificate[0],
									'intermediate':intermediate1,
									'additional1':additional1,
									'additional2':additional2,
									'additional3':additional3,
									'LeadAuditorName':newCertificate[0].issuerName,
									'headSubTitleisps':'Issued under the provisions of the International Code for the Security',
									'headSubTitleisps1':'of Ships and of Port Facilities (ISPS Code)',
								//	'previousexpirydate':moment(det.previousAudit.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'),
									'headSubTitlemlc':'Issued under the provisions of Article V and Title 5 of the Maritime Labour Convention, 2006',
									'HeadSubTitle':'(Note: This Certificate shall have a Declaration of Maritime Labour Compliance attached.)',
									'headSubTitle2':"(referred to below as the “Convention”)",
									'signaturetext'	:'Signature of the Duly Authorized Official Issuing the Certificate.',
									'sealcontent'	:'(Seal or stamp of issuing authority, as appropriate)',
									'certificateVer':newCertificate[0].certificateVer,
									'utn':newCertificate[0].utn,
									'qrCodeUrl':CERTI_URL + newCertificate[0].qid,
									'intermediateIssue':(intermediate1[0])?intermediate1[0].certIssueDate:'',
									'intermediateExpiry':(intermediate1[0])?intermediate1[0].certExpireDate:'',
									'intermediatePlace':(intermediate1[0])?intermediate1[0].auditPlace:'',
									'intermediateLeadSign':	(intermediate1[0])?intermediate1[0].issuerSign:'',
									'interSignDate':	(intermediate1[0])?intermediate1[0].issuerSignDate:'',
									'qrCodeData' : response.data,
									'dateOfReg': newCertificate[0].dateOfRegistry,
									'renewalEndorse2':renewalEndorse2,
									'extension':extension,
									'seal':newCertificate[0].seal ? newCertificate[0].seal : certGenerate.seal,
									'title':newCertificate[0].title ? newCertificate[0].title : certGenerate.title,
											'additionalReissue1':additionalReissue1,
											'additionalReissue2':additionalReissue2,
											'additionalReissue3':additionalReissue3,
											'certificateDetails':result,
											'intermediateReissue':intermediateReissue1,
											'crossLineStatus':txt,
											'getEndrosedCountLatest':getEndrosedCountLatest,
											'currentCertiObj':res
			} 
				console.log("INITIAL AUDIT DATE TRIGGERD");
				var a = result ?  _.min(result, function(find){  return   find.auditSeqNo; }) : '';
				certificateDatas.auditDate = a.auditDate;
				console.log(certificateDatas);
	/*						var certificate = auditService.pdfService(certificateDatas);
	
	
			if(certificate.length > 0) {
	
				for(var i=0;i<certificate.length;i++){	
	
					var decrypt =  window.atob(window.btoa(certificate[i]));				
	
					doc.addImage(decrypt, 'PNG', 0, 0 ,doc.internal.pageSize.width,doc.internal.pageSize.height,"'NewCertificate"+i+"'",'FAST');
	
					if((certificate.length - 1) != i ) {
						doc.addPage();
					}
				}				
			}*/
			
			
			//certificateDatas.qrCodeUrl = CERTI_URL + res.qid;
			console.log(certificateDatas.qrCodeUrl);
			var certificate;
	
			$timeout(function(){
				/*var QrCs = "";
				if(window.navigator.msSaveOrOpenBlob){
					QrCs = document.getElementsByTagName("qr")[0].children[1].src;
				}else{
					QrCs = document.getElementById('qrC').childNodes[2].currentSrc;
				}
				*/
				if (certificateDatas.AuditTypeId == AppConstant.ISM_TYPE_ID) {
					
				//	certificateDatas.QrC = QrCs;
					var certificate = auditService.ismPdfService(certificateDatas);
					
				} else if (certificateDatas.AuditTypeId == AppConstant.ISPS_TYPE_ID) {
					
				//	certificateDatas.QrC = QrCs;
					certificate = auditService.ispsPdfService(certificateDatas);
					
				} else if (certificateDatas.AuditTypeId == AppConstant.MLC_TYPE_ID) {
					
				//	certificateDatas.QrC = QrCs;
					certificate = auditService.mlcPdfService(certificateDatas);
				}
				
				pdfMake.createPdf(certificate).download(''+ certificateDatas.certificateNo+ '.pdf');
				blockUI.stop();
				toaster.success('Certificate downloaded successfully');
				
				},2000);
			}
    	
    	
        function getCertSearchData(pageNo){
        	certGenerate.hideCert = true;
        	certGenerate.showCertificateScreen = false;
    		var certSearchBeanValues={
        			
        			'auditTypeId' : certGenerate.certSearchCriteria.auditTypeId ? certGenerate.certSearchCriteria.auditTypeId : null,
        				
        			'vesselImoNo' :  certGenerate.certSearchCriteria.vesselImoNo ? certGenerate.certSearchCriteria.vesselImoNo.vesselImoNo : null,
        		    
        			'pageNo' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null'? pageNo*sessionStorage.getItem('defaultSearchCount') : pageNo*5,
        			
        			'defaultSearchCount' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null' ? sessionStorage.getItem('defaultSearchCount') : 5,
        				
    		};
    		
    		return certSearchBeanValues;
    	}
        
    	function search(pageNo,clickedEvent){
    		
    		certGenerate.managerHide = false;
    		certGenerate.toggleSwitch = 'open';
    		if(clickedEvent=='fromBtn')
    			certGenerate.proceed = false;
    		certGenerate.names = [];
    		certGenerate.certExtData = [];
    		certGenerate.certSearchData = [];
    		certGenerate.setCert = '';
    		certGenerate.messageAudit = '';
    		certGenerate.showBlock = false;
    		
    		certGenerate.pagination = false;
    	
    		var certSearchBeanValues = certGenerate.getCertSearchData(pageNo);
    		
    		if(certGenerate.validateSearhCriteria()){
    			
    		certGenerate.searchData = certSearchBeanValues;
    		
    		console.log(certSearchBeanValues)
    		
    		//$scope.pagination.current = pageNo+1;
    		
    		certificateFactory.getCertSearchResult(certSearchBeanValues).$promise.then(function(res){
    			//certGenerate.certSearchData = angular.copy(res.result);
    			
    			var resultCer = angular.copy(res.result);
    			certGenerate.total = res.numOfRecords ? res.numOfRecords: 0;
				var certShowList = angular.copy(res.result); //Added by sudharsan for Jira-ID = IRI-5650
				//Added by sudharsan for Jira-ID = IRI-5683 & IRI-5682 Start here

				var current_certificate_no_arr = [];
				var current_audit_subtype_arr = [];
				var void_audit_sequence_no_arr = [];
				
				resultCer = certShowList;
				//Added by sudharsan for Jira-ID = IRI-5683 & IRI-5682 Start here
    			console.log(resultCer);
				console.log(certShowList);
    			certGenerate.checkSeq=res.result;
    			
    			var ftCert=0,tempArray = [],inerAddCert=0,reneCert=0,reneCert1=0,tempAuditSeqNo=[],renewalft=0,cntAuditSeq=0;
    			
    			certGenerate.checkSeq.forEach(function(a){
    				  if (!tempAuditSeqNo.includes(a.auditSeqNo))
    					  tempAuditSeqNo.push(a.auditSeqNo)
    				  
                  }); 
    			
    			certificateFactory.getCompletedStatus(certSearchBeanValues.vesselImoNo,certSearchBeanValues.auditTypeId).$promise.then(function(certAuditSeq){
    				console.log(certAuditSeq)
    				certGenerate.check = [];
    				var cntSummary =0;
    				certGenerate.checkSeq.forEach(function(a){
    					if(a.auditSummaryId==certGenerate.AppConstant.NOT_APPROVED_SUMMARY && a.certIssueId != 1008)
    						cntSummary++;
    				});
					//Added by sudharsan for Jira-ID IRI-5689 Start here
    				certAuditSeq.result.forEach(function(details_audit){
						if(details_audit.auditStatusId == certGenerate.AppConstant.VOID_AUDIT_STATUS){
							void_audit_sequence_no_arr.push(details_audit.auditSeqNo);
						}
					});
    				//Added by sudharsan for Jira-ID IRI-5689 End here
    				
    				if(certAuditSeq.result.length==cntSummary ){
	        			
    					certGenerate.showCertificateScreen = false;
    			    	
    			    	certGenerate.names = [];
    			    	
    			    	certGenerate.certSubType = '';
    			    	
    			    	certGenerate.messageAudit = '';
    			    
    			    	certGenerate.showBlock = false;
    			    	
    			    	certGenerate.hideCert = false;
    			    	
    			    	certGenerate.proceed = false;
    			        
    			    	certGenerate.certSearchData = [];
    			    	
    			    	certGenerate.certExtData = [];
    					
    				}else{
    					console.log(certAuditSeq.result)
    					if(((certAuditSeq.result[certAuditSeq.result.length-1].reviewStatus==2 ||  certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.VOID_AUDIT_STATUS) && (certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.COMPLETED_AUDIT_STATUS || certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.COMMENCED_AUDIT_STATUS || certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.VOID_AUDIT_STATUS)) && certAuditSeq.result.length>0){
    	        			for(var i=0;i<certAuditSeq.result.length;i++){
    	        				certGenerate.checkSeq.forEach(function(a){
    	        					if(certAuditSeq.result[i].auditSeqNo==a.auditSeqNo && certAuditSeq.result[i].reviewStatus==2 && certAuditSeq.result[i].auditStatusId!=certGenerate.AppConstant.VOID_AUDIT_STATUS && certAuditSeq.result[i].auditSummaryId != certGenerate.AppConstant.NOT_APPROVED_SUMMARY)
    	        						certGenerate.check.push(a);
    	        				});
    	        			}
        				}else{
        					if(certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.COMMENCED_AUDIT_STATUS || (certAuditSeq.result[certAuditSeq.result.length-1].reviewStatus!=2 && certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.COMPLETED_AUDIT_STATUS))
        						certGenerate.messageAudit = "Audit in Progress!";
        				}
						//added by Ramya on 1-7-2022 for jira id - IRI-5360
						if(certAuditSeq.result[certAuditSeq.result.length-1].auditStatusId==certGenerate.AppConstant.REOPEN)
						{
							certGenerate.messageAudit =  "Audit is in Reopen state!";	
						}
    				    				
    				console.log(res)
    				if(certGenerate.check.length>0){
    				var extCertGenerated=0,reissCertGenerated=0,directInterAdd=false;;
    				certGenerate.check.sort(function(c, d){
			            return c.certOderNo - d.certOderNo;
			        });
    				if(certGenerate.check[0].auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certGenerate.check[0].auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID){
    					ftCert = certGenerate.check[0].certOderNo;
    					directInterAdd = true;
    				}
    				certGenerate.check.forEach(function(a){
	    				
	    				if((a.auditSubTypeId == certGenerate.AppConstant.INITIAL_SUB_TYPE_ID || a.auditSubTypeId == certGenerate.AppConstant.INTERIM_SUB_TYPE_ID) && ftCert<a.certOderNo)
	    					ftCert = a.certOderNo;
	    				
	    				if(a.auditSubTypeId == certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID && (a.certIssueId == certGenerate.AppConstant.FULL_TERM_CERT || a.certIssueId == certGenerate.AppConstant.RE_ISSUE )){
	    					renewalft = a.certOderNo;
	    					inerAddCert = 0;
	    					reneCert = 0;
	    					reneCert1 = 0;
	    					extCertGenerated = 0;
	    					reissCertGenerated =0;
	    				}
	    				
	    				if(a.auditSubTypeId == certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID && a.certIssueId == certGenerate.AppConstant.RENEWAL_ENDORSED2 && reneCert<a.certOderNo){
	    					if(a.publishStatus==1){
		    					if(renewalft>ftCert && renewalft<a.certOderNo)
		    						reneCert = a.certOderNo;
		    					if(renewalft==0)
		    						reneCert = a.certOderNo;
	    					}else if(a.publishStatus==0)
	    						reneCert=a.certOderNo;
	    					
	    				}
	    				
	    				if(inerAddCert<a.certOderNo && a.auditSubTypeId == certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID && a.certIssueId == certGenerate.AppConstant.RENEWAL_ENDORSED1 && reneCert1<a.certOderNo){
	    					if(a.publishStatus==1){
		    					if(renewalft>ftCert && renewalft<a.certOderNo)
		    						reneCert1 = a.certOderNo;
		    					if(renewalft==0)
		    						reneCert1 = a.certOderNo;
	    					}else if(a.publishStatus==0)
	    						reneCert1 = a.certOderNo;
	    				}
	    				
	    				if((a.auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || a.auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID) && cntAuditSeq<=a.auditSeqNo){
	    					cntAuditSeq = a.auditSeqNo;
	    					if(renewalft>0 && renewalft>ftCert && renewalft<a.certOderNo)
	    						inerAddCert = a.certOderNo;
	    					if(renewalft==0)
	    						inerAddCert = a.certOderNo;
	    					
	    				}
	    					
	    				if(a.certIssueId == certGenerate.AppConstant.EXTENSION ){
	    					if(a.publishStatus==1){
		    					if(renewalft>ftCert && renewalft<a.certOderNo)
		    						extCertGenerated=a.certOderNo;
		    					if(renewalft==0)
		    						extCertGenerated=a.certOderNo;
	    					}else if(a.publishStatus==0)
	    						extCertGenerated=a.certOderNo;
	    				}
	    				if(a.certIssueId == certGenerate.AppConstant.RE_ISSUE){
	    					if(a.publishStatus==1){
		    					if(renewalft>ftCert && renewalft<=a.certOderNo){
		    						reissCertGenerated=a.certOderNo;
		    						extCertGenerated = 0;
		    						reneCert = 0;
		    						reneCert1 = 0;
		    					}
		    					if(renewalft==0)
		    						reissCertGenerated=a.certOderNo;
	    					}else if(a.publishStatus==0)
	    						reissCertGenerated=a.certOderNo;
	    				}
	    				
                });
	    			
	    			if(certGenerate.check.length>0)
	    			if((reissCertGenerated<extCertGenerated || reissCertGenerated<reneCert) && (extCertGenerated!=0 || reneCert1!=0) && (reneCert!=0 || extCertGenerated!=0) && certGenerate.check[certGenerate.check.length-1].auditSubTypeId == certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID && (certGenerate.check[certGenerate.check.length-1].certIssueId == certGenerate.AppConstant.RENEWAL_ENDORSED1 || certGenerate.check[certGenerate.check.length-1].certIssueId == certGenerate.AppConstant.RENEWAL_ENDORSED2)){
	    				certGenerate.check = [];
    					certGenerate.messageAudit = "No more EXTENSION/RE-ISSUE/ADMINISTRATIVE can be Generated!"
    				}
	    			
	    			console.log("fultl-term"+ftCert+"inter/additional"+inerAddCert+"renewal"+reneCert);
	    			certGenerate.check.forEach(function(a){
	    				a.reqCertDesc = a.certIssueDesc;
	    				if(a.publishStatus==1){
		    				if(ftCert == a.certOderNo && inerAddCert==0 && renewalft==0 && a.certIssueId == certGenerate.AppConstant.EXTENSION){
		    					certGenerate.showBtn=true;
		    					a.certIssueDate = "-";
		    					a.certExpireDate = "-";
		    					a.certificateNo = "-";
		    					if (!certGenerate.names.includes('RE-ISSUE/ADMINISTRATIVE'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
		    					a.reqCertDesc = 'RE-ISSUE/ADMINISTRATIVE';
		    					certGenerate.managerPublished = true;
		    					
		    					if(reneCert==0 && a.certIssueId == certGenerate.AppConstant.EXTENSION && inerAddCert ==0)
		    						tempArray.push(angular.copy(a));
		    					if(reneCert==0 && inerAddCert > 0)
		    						tempArray.push(angular.copy(a));
		    					if(inerAddCert ==0 && reneCert==0 && a.certIssueId != certGenerate.AppConstant.EXTENSION)
		    						tempArray.push(angular.copy(a));
		    					
		    				}
							//added by ramya for jira id - IRI-5521
							if(a.certIssueId == certGenerate.AppConstant.RE_ISSUE && (certGenerate.check[0].auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certGenerate.check[0].auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
								ftCert =a.certOderNo;
							}
		    				if((renewalft==0 && ftCert == inerAddCert && a.auditTypeId==certGenerate.AppConstant.ISM_TYPE_ID && inerAddCert > 0) || (renewalft==0 && ftCert == inerAddCert && a.auditTypeId==certGenerate.AppConstant.ISPS_TYPE_ID && inerAddCert > 0) && inerAddCert == a.certOderNo && (a.certIssueId == certGenerate.AppConstant.RE_ISSUE || a.auditSubTypeId == certGenerate.AppConstant.INTERMEDIATE_SUB_TYPE_ID || a.auditSubTypeId == certGenerate.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
		    					//direct intermediate and additional cases
		    					certGenerate.showBtn=true;
		    					a.certIssueDate = "-";
		    					a.certExpireDate = "-";
		    					a.certificateNo = "-";
		    					if (!certGenerate.names.includes('EXTENSION'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'EXTENSION'});
		    					a.reqCertDesc = 'EXTENSION';
		    					tempArray.push(angular.copy(a));
		    					certGenerate.managerPublished = true;
		    				}
		    				if((renewalft==0 && a.auditTypeId==certGenerate.AppConstant.ISM_TYPE_ID && (a.auditSubTypeId==certGenerate.AppConstant.INTERIM_SUB_TYPE_ID || a.auditSubTypeId==certGenerate.AppConstant.INITIAL_SUB_TYPE_ID) || (renewalft==0 && a.auditTypeId==certGenerate.AppConstant.ISPS_TYPE_ID &&  a.auditSubTypeId==certGenerate.AppConstant.INITIAL_SUB_TYPE_ID) )  && ftCert == a.certOderNo && (a.certIssueId == certGenerate.AppConstant.RE_ISSUE || a.certIssueId == certGenerate.AppConstant.FULL_TERM_CERT || a.certIssueId == certGenerate.AppConstant.INTERIM_CERT)){
		    					certGenerate.showBtn=true;
		    					a.certIssueDate = "-";
		    					a.certExpireDate = "-";
		    					a.certificateNo = "-";
		    					if (!certGenerate.names.includes('EXTENSION'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'EXTENSION'});
		    					a.reqCertDesc = 'EXTENSION';
		    					tempArray.push(angular.copy(a));
		    					certGenerate.managerPublished = true;
		    				}
		    				
		    				if(renewalft==0 && inerAddCert==a.certOderNo && reneCert==0 && inerAddCert > 0){
		    					certGenerate.showBtn=true;
		    					a.certIssueDate = "-";
		    					a.certExpireDate = "-";
		    					a.certificateNo = "-";
		    					if (!certGenerate.names.includes('RE-ISSUE/ADMINISTRATIVE'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
		    					a.reqCertDesc = 'RE-ISSUE/ADMINISTRATIVE';
		    					certGenerate.managerPublished = true;
		    					tempArray.push(angular.copy(a));
		    				}
		    				if(renewalft==0 && inerAddCert ==0 && reneCert==0 && ftCert==a.certOderNo && a.certIssueId != certGenerate.AppConstant.EXTENSION){
		    					certGenerate.showBtn=true;
		    					a.certIssueDate = "-";
		    					a.certExpireDate = "-";
		    					a.certificateNo = "-";
		    					if (!certGenerate.names.includes('RE-ISSUE/ADMINISTRATIVE'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
		    					a.reqCertDesc = 'RE-ISSUE/ADMINISTRATIVE';
		    					certGenerate.managerPublished = true;
		    					tempArray.push(angular.copy(a));
		    				}
		    				if(renewalft==0 && reneCert==a.certOderNo && a.auditTypeId!=certGenerate.AppConstant.MLC_TYPE_ID){
		    					certGenerate.showBtn=true;
		    					a.certIssueDate = "-";
		    					a.certExpireDate = "-";
		    					a.certificateNo = "-";
		    					if (!certGenerate.names.includes('RENEWAL ENDORSED')){
		    						if(a.auditTypeId == certGenerate.AppConstant.ISM_TYPE_ID)
		    							certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'Renewal Endorsed (ISM Part B 13:12-13:14)'});
		    						else if(a.auditTypeId == certGenerate.AppConstant.ISPS_TYPE_ID)
		    							certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'Renewal Endorsed (ISPS 19.3.5-19.3.6)'});
		    					}
		    					a.reqCertDesc = 'RENEWAL_ENDORSED';
		    					certGenerate.managerPublished = true;
		    					tempArray.push(angular.copy(a));
		    					
		    				}
		    				if(renewalft>0 && a.publishStatus==1 && a.certOderNo>=renewalft){
		    					if(reneCert==0){
			    					certGenerate.showBtn=true;
			    					a.certIssueDate = "-";
			    					a.certExpireDate = "-";
			    					a.certificateNo = "-";
			    					a.reqCertDesc = 'RE-ISSUE/ADMINISTRATIVE';
			    					certGenerate.managerPublished = true;
			    					
			    					if(reneCert1==0 && reneCert==0 && a.certIssueId == certGenerate.AppConstant.EXTENSION && inerAddCert ==0){
			    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
			    						tempArray.push(angular.copy(a));
			    					}
			    					
			    					if(reneCert==0 && reneCert1>0 && reneCert1== a.certOderNo && a.certIssueId == certGenerate.AppConstant.RENEWAL_ENDORSED1 && inerAddCert ==0){
			    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
			    						tempArray.push(angular.copy(a));
			    					}
			    						
			    					if(reneCert==0 && inerAddCert > 0 && inerAddCert==a.certOderNo){
			    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
			    						tempArray.push(angular.copy(a));
			    					}
			    					if(reneCert1==0 && inerAddCert ==0 && reneCert==0 && extCertGenerated==0 && renewalft==a.certOderNo && a.certIssueId != certGenerate.AppConstant.EXTENSION){
			    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
			    						tempArray.push(angular.copy(a));
			    					}
		    					}
		    					if((renewalft==a.certOderNo &&  extCertGenerated==0 &&  reneCert1==0 && a.auditTypeId==certGenerate.AppConstant.ISM_TYPE_ID && (a.auditSubTypeId==certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID || a.auditSubTypeId==certGenerate.AppConstant.INTERIM_SUB_TYPE_ID || a.auditSubTypeId==certGenerate.AppConstant.INITIAL_SUB_TYPE_ID) || (renewalft==a.certOderNo && a.auditTypeId==certGenerate.AppConstant.ISPS_TYPE_ID &&  a.auditSubTypeId==certGenerate.AppConstant.RENEWAL_SUB_TYPE_ID || a.auditSubTypeId==certGenerate.AppConstant.INITIAL_SUB_TYPE_ID) )  && (a.certIssueId == certGenerate.AppConstant.RE_ISSUE || a.certIssueId == certGenerate.AppConstant.FULL_TERM_CERT || a.certIssueId == certGenerate.AppConstant.INTERIM_CERT)){
			    					certGenerate.showBtn=true;
			    					a.certIssueDate = "-";
			    					a.certExpireDate = "-";
			    					a.certificateNo = "-";
			    					if (!certGenerate.names.includes('EXTENSION'))
			    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'EXTENSION'});
			    					a.reqCertDesc = 'EXTENSION';
			    					tempArray.push(angular.copy(a));
			    					certGenerate.managerPublished = true;
			    				}
		    					if(renewalft==a.certOderNo &&  reneCert1==0 && extCertGenerated==0 && a.auditTypeId!=certGenerate.AppConstant.MLC_TYPE_ID){
			    					certGenerate.showBtn=true;
			    					a.certIssueDate = "-";
			    					a.certExpireDate = "-";
			    					a.certificateNo = "-";
			    					if (!certGenerate.names.includes('RENEWAL ENDORSED')){
			    						if(a.auditTypeId == certGenerate.AppConstant.ISM_TYPE_ID)
			    							certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'Renewal Endorsed (ISM Part B 13:12-13:14)'});
			    						else if(a.auditTypeId == certGenerate.AppConstant.ISPS_TYPE_ID)
			    							certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'Renewal Endorsed (ISPS 19.3.5-19.3.6)'});
			    					}
			    					a.reqCertDesc = 'RENEWAL_ENDORSED';
			    					certGenerate.managerPublished = true;
			    					tempArray.push(angular.copy(a));
			    					
			    				}
		    				}
	    				}
	    				if(a.publishStatus==0){
	    					/*tempArray = [];
	    					certGenerate.names = [];*/
	    					certGenerate.showBtn=true;
	    					certGenerate.managerPublished = false;
		    				if(a.certIssueId == certGenerate.AppConstant.EXTENSION)
		    				{
		    					if (!certGenerate.names.includes('EXTENSION'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'EXTENSION'});
		    					a.reqCertDesc = 'EXTENSION';
		    					tempArray.push(angular.copy(a));
		    				}
		    				if(a.certIssueId == certGenerate.AppConstant.RE_ISSUE && ftCert == a.certOderNo && inerAddCert==0 )
		    				{
		    					if (!certGenerate.names.includes('RE-ISSUE/ADMINISTRATIVE'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
		    					a.reqCertDesc = 'RE-ISSUE/ADMINISTRATIVE';
		    					tempArray.push(angular.copy(a));
		    				}
		    				else if(a.certIssueId == certGenerate.AppConstant.RE_ISSUE && inerAddCert==a.certOderNo )
		    				{
		    					if (!certGenerate.names.includes('RE-ISSUE/ADMINISTRATIVE'))
		    						certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'RE-ISSUE/ADMINISTRATIVE'});
		    					a.reqCertDesc = 'RE-ISSUE/ADMINISTRATIVE';
		    					tempArray.push(angular.copy(a));
		    				}
		    				if(a.certIssueId == certGenerate.AppConstant.RENEWAL_ENDORSED1)
		    				{
		    					if (!certGenerate.names.includes('RENEWAL ENDORSED')){
		    						if(a.auditTypeId == certGenerate.AppConstant.ISM_TYPE_ID)
		    							certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'Renewal Endorsed (ISM Part B 13:12-13:14)'});
		    						else if(a.auditTypeId == certGenerate.AppConstant.ISPS_TYPE_ID)
		    							certGenerate.names.push({seqNo : certGenerate.names.length,'certType' : 'Renewal Endorsed (ISPS 19.3.5-19.3.6)'});
		    					}
		    					a.reqCertDesc = 'RENEWAL_ENDORSED';
		    					tempArray.push(angular.copy(a));
		    				}
	    				}
	                });
    			}
    			console.log(certGenerate.names)
    			
    			if(certGenerate.names.length != 0)
    				certGenerate.setCert = {certDes : certGenerate.names[0].seqNo};
    			
    			var certOrderNo = 0, resCert =[];
    			if(resultCer[0] && resultCer[0].getExactActiveStatus ==1)
    				resCert.push(resultCer[0]);
    			else if(resultCer[0] && resultCer[0].getExactActiveStatus ==0){
    				certGenerate.check.forEach(function(certa){
    					resultCer.forEach(function(resa){
    						if(certa.auditSeqNo == resa.auditSeqNo)
    							resCert.push(resa);
    					});
    				});
    			}
				//Added by sudharsan for Jira-ID IRI-5624 start here
				if(resultCer.length>0){
					certShowList = resultCer; //Added by sudharsan for Jira-ID IRI-5689
					var keepGoing = true;
					resultCer.forEach(function(audits){
						//Added by sudharsan for Jira-ID IRI-5689 Start here
						void_audit_sequence_no_arr.forEach(function(remove){
							if(remove == audits.auditSeqNo){
								certShowList = certShowList.filter(function(remove_data){
									return remove_data.auditSeqNo != remove;
								});
							}
						});
						//Added by sudharsan for Jira-ID IRI-5689 End here
						
						if(keepGoing) {
							if(audits.auditStatusId != certGenerate.AppConstant.VOID_AUDIT_STATUS){
								certGenerate.certSubType = audits.audSubTypeDesc;
								keepGoing = false;
							}
						}
					});
					resultCer = certShowList; //Added by sudharsan for Jira-ID IRI-5689
				}
				else{certGenerate.certSubType = '';}
				//Added by sudharsan for Jira-ID IRI-5624 end here
    			//certGenerate.certSubType = resultCer.length>0 ? resultCer[0].audSubTypeDesc : ''; //commented by sudharsan for Jira-ID IRI-5624 
    			resultCer.forEach(function(a){
    				a.certIssueDate = a.extendedIssueDate ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(a.certIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
    				
    				a.certExpireDate = a.extendedExpireDate ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(a.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
	  				if(a.auditTypeId==certGenerate.AppConstant.ISM_TYPE_ID && a.auditSubTypeId==certGenerate.AppConstant.INTERIM_SUB_TYPE_ID && a.certIssueId==certGenerate.AppConstant.EXTENSION){
	  					a.certIssueDate =moment(a.extendedEndorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
	  				}
    				a.reqCertDesc = a.certIssueDesc;
    				if(a.getExactActiveStatus == 0){
    					a.statusDesc = "InActive";
    				}else if(a.getExactActiveStatus == 1){
    					a.statusDesc = "Active";
    				}
    				
    			});
				//Modified by sudharsan for Jira-ID = IRI-5710,IRI-5707,IRI-5705,IRI-5704 start here
				resultCer.forEach(function(delete_record,delete_index){
					if(resultCer.length > delete_index +1){
						if(delete_record.auditSubTypeId != resultCer[delete_index+1].auditSubTypeId){
							current_certificate_no_arr.push(delete_record.certOderNo);
							current_audit_subtype_arr.push(delete_record.auditSubTypeId);
						}
					}
				});
				for(var delete_index = 0; delete_index<current_audit_subtype_arr.length; delete_index++){
					resultCer.forEach(function(delete_record,delete_record_index){
						if(delete_record.auditSubTypeId != current_audit_subtype_arr[delete_index] && 
							current_certificate_no_arr[delete_index] < delete_record.certOderNo){
								certShowList.splice(delete_record_index,1);
						}						
					});
				}
				//Modified by sudharsan for Jira-ID = IRI-5710,IRI-5707,IRI-5705,IRI-5704 End here
    			console.log(certGenerate.names[0]);
    			certGenerate.certExtData = tempArray;
    			// certGenerate.certSearchData = certShowList; //Added by sudharsan for Jira-ID = IRI-5650 
				certGenerate.certSearchData = resultCer; //Modified by sudharsan for Jira-ID = IRI-5689
    			console.log(certGenerate.certSearchData)
    			$timeout(function(){
    				if(!certGenerate.proceed)
    					angular.element(document.querySelector('#collapseAtTwo')).click();
            		
            	},500);
    			}
    			
    			});
    		});
    		
    	   }
    	}

    	 /***** Validating Search criteria *****/
    	function validateSearhCriteria(){
    		var flag=true;
    	 
    		if(!certGenerate.certSearchCriteria.vesselImoNo){ 
    			flag=false;
				toaster.warning('Please provide the Vessel IMO no.');
    		}else if(!certGenerate.certSearchCriteria.vesselName){
    			flag=false;
				toaster.warning('Please provide the Vessel Name');
    		}else if(!certGenerate.certSearchCriteria.auditTypeId && certGenerate.certSearchCriteria.auditTypeId == 0){
    			flag=false;
				toaster.warning('Please provide the Audit Type');
    		}
    		return flag;
    	}
    	
        function setVessel(item){
            
            certGenerate.certSearchCriteria.vesselImoNo = {'vesselImoNo':item.vesselImoNo};
            
            certGenerate.certSearchCriteria.vesselName = {'vesselName':item.vesselName};
            
        }
        
    	function back(){
    		
    		$state.go('app.dashboard',{},{reload:true});
    	}
    	
        function clear(){ 
        	
        	certGenerate.certSearchData = [];
            
            certGenerate.certSearchCriteria = {
        			certificateNo  : '',
        			companyImoNo : '',
        			certIssueDate  : '',
        			certExpireDate : '',
        			activeStatus   : '',
        			auditTypeId    : '',
        			auditSubTypeId : '',
        			vesselImoNo    : '',
        			checkCertVthAudit : 1001,
        			certDes : ''
        			
        	};
            
            certGenerate.setCert = '';
            
            certGenerate.certExtData =[];
            
            certGenerate.showBlock = false;
            
            certGenerate.pagination = false;
            
            certGenerate.hideCert = true;
            
        	certGenerate.showCertificateScreen = true;
        	
        	certGenerate.names = [];
        	
        	certGenerate.messageAudit = '';
        	
        	certGenerate.toggleSwitch = 'close';
        	
        	$timeout(function(){
					angular.element(document.querySelector('#collapseAtTwo')).click();
        		
        	},500);
        }
        
        
        
    }   
})();