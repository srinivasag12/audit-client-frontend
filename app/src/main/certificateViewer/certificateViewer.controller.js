
(function (){
    'use strict';
   
    angular
        .module('certificateViewer')        
        .controller('certificateViewerController', certificateViewerController); 
    
    function certificateViewerController(detailsFactory ,$scope,auditFactory,toaster,CERTI_URL,AppConstant,$stateParams,viewerFactory,auditService,MMMDDYYYY,$timeout,$sce,YYYYMMDD,ModalService){
    	//blockUI.start("Loading...");
    	
    	var certView = this;
    	
    	$scope.qrString = "";
    	
    	certView.AppConstant = AppConstant;
    	
    	viewerFactory.certificateViewerDetails($stateParams.companyId,$stateParams.Cqid).$promise.then(function(res){
    		
    		if(!res.error){
			
    		res = res[0];
    		if(!res.isSync)
			{
				if(res.getExactActiveStatus == 1){

					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue = [], intermediateReissue= [];

					//var doc = new jsPDF('p', 'mm', 'a4');	
					
					viewerFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,res.auditDate).$promise.then(function(result){
					
						var auditSubTypeId = certView.auditSubTypeId,
    					certificaIssueId = certView.certIssueId,
    					tempAuditSeqNo = certView.auditSeqNo;
						var reIssue = '';
						var latestNumber = [];
						var initialVal = 0;
						var intermediateVal = 0;
						var larg = 0;
						var alarg = 0;
						var asmall= 0,initialRe = false,inLargetoAdd = false;
						
    						result.forEach(function(a){
    							if(a.auditSubTypeId === certView.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.auditStatusId != 1004){
        							latestNumber.push(a.auditSeqNo);
        							if (a.auditSeqNo > alarg) {
        						        alarg = a.auditSeqNo;
        						    }
        							asmall = Math.min.apply(null,latestNumber);
        						}
        						
        						if(a.auditSubTypeId == certView.AppConstant.INITIAL_SUB_TYPE_ID && a.auditStatusId != 1004){
        							initialVal++;
        						}
        						
        						//if(a.auditSubTypeId == certView.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.auditStatusId != 1004){
        						//	intermediateVal++;
        							
        							if(a.auditSubTypeId == certView.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.auditStatusId != 1004){
        								intermediateVal++;
        								 if (a.auditSeqNo > larg) {
        								        larg = a.auditSeqNo;
        								    }
        							//}
        						}
    						
        							if(a.auditSeqNo != 600002 && a.auditSeqNo != 600001 && a.auditSeqNo != 600003){
        								if((a.auditSeqNo && a.audSubTypeDesc.indexOf('ADDITIONAL')) <  (a.auditSeqNo && a.audSubTypeDesc.indexOf('INTERMEDIATE'))){
        									inLargetoAdd = true;
        								}
        								}
        							
    						if((a.auditSubTypeId == certView.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == 1008)||(a.auditSubTypeId == certView.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId == 1008)){
    							reIssue = true;
    							
    						}});
    						
    						var maximum = Math.max.apply(null, latestNumber); // get the max of the array
        					latestNumber.splice(latestNumber.indexOf(maximum), 1); // remove max from the array
        				    var maximum2 = Math.max.apply(null, latestNumber); // get the 2nd max
        					var latestSeqNumber = '';
        					var getEndrosedCountLatest = '';
        					result.forEach(function(a){
        						a.interlarg = larg;
        						a.addlarg = alarg;
        						a.addsmall = asmall;
        								if (a.auditSeqNo === maximum2) {
        									a.aditionalbeforeseqnum = a.auditSeqNo;
        									latestSeqNumber = a.seqNo;
        									getEndrosedCountLatest = a.getEndrosedCount;
        									a.latestSeqNumber = latestSeqNumber;
        							    }
        								if(initialVal > 0){
        									a.initialAvail = true;
        								}else{
        									a.initialAvail = false;
        								}
        								if(intermediateVal > 0){
        									a.intermediateAvail = true;
        								}else{
        									a.intermediateAvail = false;
        								}
        						});
        					
        					var b=res;
        					var a = result;
        					console.log("result ",a);
        					console.log("res",b);
        					
        					result.sort(function(c, d){
        		                return c.certOderNo - d.certOderNo;
        		            });
        					
        					/*This for each loop is used for changing the certificate order number of Reissued certificates*/
        					var certResult =result;
        					certResult.forEach(function(a,index){
        					if(a.certIssueId==1008){//reissue 
        						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
        					}
        					
        					});
        					
        					
        				certResult.forEach(function(a){
							
							a.withoutIntermediate = false;
							
							a.auditPlace = a.auditPlace?decodeURIComponent(atob(a.auditPlace)) : '';

							a.certExpireDate = a.certExpireDate ? moment(a.certExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.certIssueDate = a.certIssueDate ? moment(a.certIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.auditDate = a.auditDate ? moment(a.auditDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.dateOfRegistry = a.dateOfRegistry ? moment(a.dateOfRegistry,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.issuerSignDate = a.issuerSignDate ? moment(a.issuerSignDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.extendedIssueDate = a.extendedIssueDate ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.extendedExpireDate = a.extendedExpireDate ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.issuerSign = atob(a.issuerSign);
							
							a.auditStatusId = a.auditStatusId;

							a.prevAuditIssueData = a.prevAuditIssueData ? moment(a.prevAuditIssueData,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
							

							if(a.certIssueId == certView.AppConstant.EXTENSION || a.certIssueId  == certView.AppConstant.RENEWAL_ENDORSED1){
								
								if(a.certIssueId == certificaIssueId && reIssue){

									a.withoutCross = true;
									}else{
									a.withoutCross = false;
									}
								a.certOderNo<=res.certOderNo||certDetails.ExtensionBtnClicked?extension.push(a):'';
								
							}else if(a.certIssueId  == certView.AppConstant.RENEWAL_ENDORSED2){
								
								if(a.certIssueId == certificaIssueId && reIssue){

									a.withoutCross = true;
									}else{
									a.withoutCross = false;
									}

								//	certDetails.newRenewalEndorse2Sign = "data:image/png;base64,"+a.issuerSign;

								a.certOderNo<=res.certOderNo?renewalEndorse2.push(a):'';

							}
							if( a.auditSubTypeId== certView.AppConstant.INITIAL_SUB_TYPE_ID  || a.auditSubTypeId == certView.AppConstant.RENEWAL_SUB_TYPE_ID ||a.auditSubTypeId == certView.AppConstant.INTERIM_SUB_TYPE_ID){

								//	certDetails.newCertificateSign = "data:image/png;base64,"+a.issuerSign;
								console.log("Initial");
								console.log(a.auditSubTypeId == auditSubTypeId);
								
							if(a.auditSubTypeId == auditSubTypeId && reIssue){

								a.withoutCross = true;
								}else{
								a.withoutCross = false;
								}
							a.certOderNo<=res.certOderNo?newCertificate.push(a):'';
							console.log(newCertificate)
							}else if(a.auditSubTypeId == certView.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
								
								console.log("Intermediate");
								console.log(a.auditSubTypeId == auditSubTypeId);
								
								if(a.certIssueId  == certView.AppConstant.INTERMEDAITE_ENDORSED)
								{
								if(a.auditSubTypeId == auditSubTypeId && reIssue){

									a.withoutCross = true;
									}else{
									a.withoutCross = false;
									}
								a.certOderNo<=res.certOderNo?intermediate.push(a):'';
								console.log();
								}
								
								if(a.certIssueId  == certView.AppConstant.RE_ISSUE){
									a.certOderNo<=res.certOderNo?intermediateReissue.push(a):'';
									
								
								}
								
								
								if(newCertificate.length == 0)	{
									console.log(newCertificate)
									if(a.certIssueId == certificaIssueId && reIssue){

										a.withoutCross = true;
										}else{
										a.withoutCross = false;
										}
									
									var copyData = angular.copy(a);
									copyData.withoutIntermediate = true;
									a.certOderNo<=res.certOderNo?newCertificate.push(copyData):'';
								}

							}else if(a.auditSubTypeId == certView.AppConstant.ADDITIONAL_SUB_TYPE_ID){

								if(a.certIssueId  == 1005 /*&& a.auditStatusId != 1004*/)
								{
									if(a.auditSubTypeId == auditSubTypeId && a.auditSeqNo == tempAuditSeqNo && reIssue){

										a.withoutCross = true;
										}else{
										a.withoutCross = false;
										}
									a.certOderNo<=res.certOderNo?additional.push(a):'';
								
								
								}
								if(a.certIssueId  == 1008 /*&& a.auditStatusId != 1004*/){
									a.certOderNo<=res.certOderNo?additionalReissue.push(a):'';
						
								}
								console.log(newCertificate)
								if(newCertificate.length == 0)	{
									console.log("additional push empty");
									if(a.certIssueId == certificaIssueId && reIssue && a.auditSeqNo == tempAuditSeqNo){

										a.withoutCross = true;
										}else{
										a.withoutCross = false;
										}
									var copyData = angular.copy(a);

									copyData.withoutIntermediate = true;
									a.certOderNo<=res.certOderNo?newCertificate.push(copyData):'';
								}
							}
						});

						certView.signature = result; 
						
						//$scope.qrString = CERTI_URL + res.companyId + '?Cqid=' +newCertificate[0].qid;
						//blockUI.stop();	
						var certificateDatas={

								'certificateNo' :newCertificate[0].certificateNo,
								'AuditTypeId'   :newCertificate[0].auditTypeId,
								'vesselName'    :newCertificate[0].vesselName,
								'officialNo'    :newCertificate[0].officialNo,
								'distinletter'  :newCertificate[0].officialNo,
								'vesselImoNo'   :newCertificate[0].vesselImoNo,
								'CompanyId'		:newCertificate[0].companyId,
								'AuditSeqNo'	:newCertificate[0].auditSeqNo,
								'UserIns'		:'BSOL',
								'DateIns'		:moment(new Date()).format(MMMDDYYYY),
								'portofreg'		:newCertificate[0].portOfRegistry,
								'shiptype'      :newCertificate[0].vesselType,
								'grt'			:newCertificate[0].grt,
								'companyaddress':newCertificate[0].vesselCompanyAddress,
								'companyname'   :newCertificate[0].vesselCompanyName,
								'companyimono'  :newCertificate[0].companyImoNo,
								'expirydate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
								'auditplace'	:newCertificate[0].auditPlace,
								'certissuedate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
								'auditSubTypeId':newCertificate[0].withoutIntermediate == true ? 1002 : newCertificate[0].auditSubTypeId,
								'AuditDate'		:newCertificate[0].auditDate,
								'auditDate'     :newCertificate[0].auditDate,
												'LeadAuditorSign':newCertificate[0].issuerSign,
												'headSubTitleism' :'Issued under the provisions of the International Convention for the Safety',
												'headSubTitleism1':'of Life at Sea, 1974(SOLAS), as amended',
												'certify':'THIS IS TO CERTIFY THAT',
												'res':newCertificate[0],
												'intermediate':intermediate,
												'additional':additional,
												'LeadAuditorName':newCertificate[0].issuerName,
												'headSubTitleisps':'Issued under the provisions of the International Code for the Security',
												'headSubTitleisps1':'of Ships and of Port Facilities (ISPS Code)',
//												'previousexpirydate':moment(certView.previousAudit.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'),
												'headSubTitlemlc':'Issued under the provisions of Article V and Title 5 of the Maritime Labour Convention, 2006',
												'HeadSubTitle':'(Note: This Certificate shall have a Declaration of Maritime Labour Compliance attached.)',
												'headSubTitle2':"(referred to below as the “Convention”)",
												'signaturetext'	:'Signature of the Duly Authorized Official Issuing the Certificate.',
												'sealcontent'	:'(Seal or stamp of issuing authority, as appropriate)',
												'certificateVer':newCertificate[0].certificateVer,
												'utn':newCertificate[0].utn,
												'qrCodeUrl':CERTI_URL + res.companyId + '?Cqid=' +newCertificate[0].qid,
												'intermediateIssue':(intermediate.length > 0)?intermediate[0].certIssueDate:'',
												'intermediateExpiry':(intermediate.length > 0)?intermediate[0].certExpireDate:'',
												'intermediatePlace':(intermediate.length > 0)?intermediate[0].auditPlace:'',
												'intermediateLeadSign':	(intermediate.length > 0)?intermediate[0].issuerSign:'',
												'interSignDate':	(intermediate.length > 0)?intermediate[0].issuerSignDate:'',
											//	'qrCodeData' :reponse.data,
												'dateOfReg': newCertificate[0].dateOfRegistry,
												'renewalEndorse2':renewalEndorse2,
												'extension':extension,
												'seal': newCertificate[0].seal,
												'title':newCertificate[0].title,
												'additionalReissue':additionalReissue,
												'certificateDetails':result,
												'latestSeqNumber':latestSeqNumber,
												'getEndrosedCountLatest':getEndrosedCountLatest,
												'intermediateReissue':intermediateReissue,
												'inLargetoAdd':inLargetoAdd
						} 
						if(certificateDatas.AuditTypeId == AppConstant.ISM_TYPE_ID){
							var temp = (certificateDatas.auditSubTypeId == certView.AppConstant.INTERIM_SUB_TYPE_ID) ? 'Interim ':"";
							 certificateDatas.CertType = temp+" Safety Management Certificate";
						}else if(certificateDatas.AuditTypeId == AppConstant.ISPS_TYPE_ID){
							var temp = (certificateDatas.auditSubTypeId == certView.AppConstant.INTERIM_SUB_TYPE_ID) ? 'Interim ':"";
							 certificateDatas.CertType = temp+" International Ship Security Certificate";
						}else if(certificateDatas.AuditTypeId == AppConstant.MLC_TYPE_ID){
							var temp = (certificateDatas.auditSubTypeId == certView.AppConstant.INTERIM_SUB_TYPE_ID) ? 'Interim ':"";
							 certificateDatas.CertType = temp+" Maritime Labour Certificate";
						}
							certView.obj= certificateDatas;

							/*console.log("INITIAL AUDIT DATE TRIGGERD");
							var a = result ?  _.min(result, function(find){  return   find.auditSeqNo; }) : '';
							certificateDatas.auditDate = a.auditDate;
						*/
						
						//var certificate;
						//blockUI.start("Preparing Certificate...");
					//	$timeout(function(){/*
							
							
							/*if (certificateDatas.AuditTypeId == AppConstant.ISM_TYPE_ID) {
								
									var certificate = auditService.ismPdfService(certificateDatas);
									
								} else if (certificateDatas.AuditTypeId == AppConstant.ISPS_TYPE_ID) {
									certificate = auditService.ispsPdfService(certificateDatas);
									
								} else if (certificateDatas.AuditTypeId == AppConstant.MLC_TYPE_ID) {
									certificate = auditService.mlcPdfService(certificateDatas);
								}

							
						
									
							console.log("certificate",certificate);
							
								//pdfMake.createPdf(certificate).open({}, window);
								pdfMake.createPdf(certificate).getBlob(function (data) {
									
								   
									downloadFiles(data,certificate.certificateno,"");
									
									//blockUI.stop();	
								});*/
								
								//var blob = converBase64toBlob(respose.data, 'application/pdf');
								
								
								
								
						//*/},2000)
						
    				});
						
				}else{
					ModalService.showModal({
		    			
		    			templateUrl : 'src/modals/certificateViewWarning.html', 
		    			
		    			controller  : 'certificateViewWarning',	
		    			inputs : {
		    				msg:"Sorry, certificate can’t be generated, since the Audit Summary is marked as 'Not Approved'"
		    					
		    				}
		    		
		    		}).then(function(modal) {
		    			
		    			modal.element.modal();
		    			
		    			modal.close.then(function(result) {
		    				
		    			});
		    			
		    		}); 
					
				}

    	}else if(res.isSync==1)
		{
			ModalService.showModal({
    			
    			templateUrl : 'src/modals/certificateViewWarning.html', 
    			
    			controller  : 'certificateViewWarning',	
    			inputs : {
    				msg:"Audit Not Synchronized to Central , Please Contact Admin"
    					
    				}
    		
    		}).then(function(modal) {
    			
    			modal.element.modal();
    			
    			modal.close.then(function(result) {
    				 	    				
    			});
    			
    		}); 	
		}
	else
	{
		ModalService.showModal({
			
			templateUrl : 'src/modals/certificateViewWarning.html', 
			
			controller  : 'certificateViewWarning',	
			inputs : {
				msg:"Certificate Not Available, Please Contact Admin"
					
				}
		
		}).then(function(modal) {
			
			modal.element.modal();
			
			modal.close.then(function(result) {
				
			});
			
		}); 
	}
  }

});
    	
    	
function downloadFiles(blob, fileName,assesUrl) {
	
    		
    	    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For IE:
    	    	
    	    	window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
    	    	
    	    		var link = document.createElement('a');
         	        link.href = window.URL.createObjectURL(blob);
         	       certView.CertificateBaseData = $sce.trustAsResourceUrl(link.href);
         	       console.log(certView.CertificateBaseData);
    	    	
    	    } else {
    	    		var link = document.createElement('a');
        	        link.style = "display: none"; 
        	        link.href = window.URL.createObjectURL(blob);
        	        document.body.appendChild(link);
        	        certView.CertificateBaseData = $sce.trustAsResourceUrl(link.href);
        	        console.log(certView.CertificateBaseData);
        	 }
    	}
    	
function converBase64toBlob(content, contentType) {
	console.log("enter convert64");
	  contentType = contentType || '';
	  var sliceSize = 512;
	  var byteCharacters = window.atob(content); //method which converts base64 to binary
	  var byteArrays = [
	  ];
	  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    var slice = byteCharacters.slice(offset, offset + sliceSize);
	    var byteNumbers = new Array(slice.length);
	    for (var i = 0; i < slice.length; i++) {
	      byteNumbers[i] = slice.charCodeAt(i);
	    }
	    var byteArray = new Uint8Array(byteNumbers);
	    byteArrays.push(byteArray);
	  }
	  var blob = new Blob(byteArrays, {
	    type: contentType
	  }); //statement which creates the blob
	  console.log("end convert64");
	  return blob;
	}    	


    	$scope.trustUrl = function(val){
    		console.log(val);
    		
    		return $sce.trustAsResourceUrl(val);
    	
    	}    
    	
    	//blockUI.stop();
    	
    }   
    
})();