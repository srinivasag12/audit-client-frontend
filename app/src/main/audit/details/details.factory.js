(function (){
	
    'use strict';

    angular
    	.module('app.audit.details')
        
        .factory('detailsFactory', detailsFactory);
    

     function detailsFactory(detailsApi){    	   
    	
    	    var detailsFactory = {
    	    		
    	    		getAudObsData:getAudObsData,
    	    		getAuditSubType:getAuditSubType,
		            getAuditStatus:getAuditStatus,
		            getCertificateIssued:getCertificateIssued,
		            getObsCategory:getObsCategory,
		            getObsStatus:getObsStatus,
		            getAudObsType:getAudObsType,   		               
		            getReportTypes:getReportTypes,
		            getVesselData:getVesselData,
		            getVesselTypeData:getVesselTypeData,
		            getAuditType:getAuditType,
		            getAuditSummary:getAuditSummary,
		            getCompanyDetails:getCompanyDetails,
		            getPreviousAuditDetail:getPreviousAuditDetail,
		            getAuditDetail:getAuditDetail,
		            getSspReviewDetail:getSspReviewDetail,
		            getAuditDetailAndNextAdtCrtStatus:getAuditDetailAndNextAdtCrtStatus,
		            getAuditDetailAndCheckSameAudit:getAuditDetailAndCheckSameAudit,
		            getAuditCode:getAuditCode,
		            saveAuditData:saveAuditData,
		            getSSPDetails:getSSPDetails,
		            getISPSInitialDetails:getISPSInitialDetails,
		            getAuditSeqNo:getAuditSeqNo,
		            getSSPRevisionNo:getSSPRevisionNo,
		            getNewCertificateNo:getNewCertificateNo,
		            getAuditReportNo:getAuditReportNo,
		            checkAuditStatus:checkAuditStatus,
		            updateLockHolder:updateLockHolder,
		            updateDocFlag:updateDocFlag,
		            getPrevDocDetails:getPrevDocDetails,
		            downloadReport:downloadReport,
		            getAuditCertificateData:getAuditCertificateData,
		            getAuditCertificateInActive:getAuditCertificateInActive,
		            getPrevFindingDetails:getPrevFindingDetails,
		            getPrevFinding:getPrevFinding,
		            getRmiVessel:getRmiVessel,
		        	vesselMissingMailCall:vesselMissingMailCall,
		        	tcApprovalStatus:tcApprovalStatus,
		        	vesselDetails:vesselDetails,
		        	vesselSpecificDtl:vesselSpecificDtl,
		        	tcDetails:tcDetails,
		        	getSignature:getSignature,
		        	auditorSignandSeal:auditorSignandSeal,
		        	auditorSignAndSeal:auditorSignAndSeal,
		        	getCurrentUserDetail:getCurrentUserDetail,
		        	vesselDtlIncomplete:vesselDtlIncomplete,
		        	getMaPort:getMaPort,
		        	allAuditorSign:allAuditorSign,
		        	updateLtrStatus:updateLtrStatus,
		        	saveReportData :saveReportData,
		        	notifyDetails:notifyDetails,
		        	getNotifyEmailDetail:getNotifyEmailDetail,
		        	signatureGenBlobData:signatureGenBlobData,
		        	getDMLCReportNos:getDMLCReportNos,
		        	getFindingData:getFindingData,
		        	getDMLCLocationDate:getDMLCLocationDate,
		        	getCompletionDate : getCompletionDate,
		        	getReportType:getReportType,
		        	getLatestVesselDetails:getLatestVesselDetails,
		        	updateVesselDetails:updateVesselDetails,
		        	getVesselRefresh:getVesselRefresh,
		        	updateVesselAuto:updateVesselAuto
		        	
		    };

			return detailsFactory;
			
			function tcDetails(data) {
				return detailsApi.tcDetails.save({
				}, data, function(res) {
					return res;
				});
			}
			;
			
			function vesselMissingMailCall(auditTypeId,companyId,vesselImoNo,vesselName){
	    		   return detailsApi.vesselMissingMailCall.get({auditTypeId:auditTypeId,companyId:companyId,vesselImoNo:vesselImoNo,vesselName:vesselName,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	   } 
			
			function tcApprovalStatus(flag,companyId,vesselImoNo){
			
	    		   return detailsApi.tcApprovalStatus.save({
	    			   companyId:companyId,vesselImoNo:vesselImoNo
	    			   },flag,function(res){
	    			   		return res;
	    		   		});
	    	   } 
	    	   
			
			/********** for getting vessel from RMI **********/
			function getRmiVessel(cId,userId,imoNo){
				return detailsApi.getRmiVessel.query({companyId:cId,userId:userId,VesselIMONo:imoNo},function(res){return res;});
			}
			
			/***** to get the Auditors Details*****/
			function getAudObsData(companyId){
	    		 return detailsApi.getAudObsData.query({companyId:companyId,method:'GET',catche:true},
	    				  function(res){
	    			   		return res;
	    		   		  });
	    	}
			
			/***** to get the AuditSubTypes*****/
	    	function getAuditSubType(audType,companyId){
	    		 return detailsApi.getAuditSubType.query({auditType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		},function(err){
	    		   			return err;
	    		   		});
	    	}
	    	   
	    	/***** to get the audit status*****/
	    	function getAuditStatus(audType,companyId){
	    		 return detailsApi.getAuditStatus.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the certificate issued*****/
	    	function getCertificateIssued(audType,companyId){
	    		 return detailsApi.getCertificateIssued.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the observation/findings category*****/
	    	function getObsCategory(audType,companyId){
	    		   return detailsApi.getObsCategory.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	   
	    	/***** to get the observation/findings status*****/
	    	function getObsStatus(audType,companyId){
	    		   return detailsApi.getObsStatus.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the Audit Observation Detail Type(Auditor/reviewer/observer) *****/
	    	function getAudObsType(companyId){
	    		 return detailsApi.getAudObsType.query({companyId:companyId,method:'GET',catche:true},
	       				function(res){
	       			   		return res;
	       		 		});
	    	}
	    	
	    	/***** to get the Audit Report Types Detail *****/
	    	function getReportTypes(audType,companyId){
	    		 return detailsApi.getReportTypes.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    		   		function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the Audit Report Types Detail *****/
	    	function getReportType(audType,companyId,audSubType){
	    		 return detailsApi.getReportType.query({audType:audType,companyId:companyId,audSubType:audSubType ,method:'GET',catche:true},
	    		   		function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the Vessel Details *****/
	    	function getVesselData(companyId){
	    		   return detailsApi.getVesselData.query({companyId:companyId,method:'GET',catche:true},
	       		   		function(res){
	    			   
	       			   		return res;
	       		   		});
	    	}
	    	
	    	/***** to get the Vessel Type Details *****/
	    	function getVesselTypeData(companyId){
	    		   return detailsApi.getVesselTypeData.query({companyId:companyId,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	}
	    	
	    	/****TO get the type of audit****/
	    	 function getAuditType(companyId){
	    		   return detailsApi.getAuditType.query({companyId:companyId,method:'GET'},
	       				function(res){
	    			   		return res;
	       		   		});
	    	 }
	    	 
	    	 /****TO get the type of audit****/
	    	 function getAuditSummary(audType,companyId){
	    		   return detailsApi.getAuditSummary.query({audType:audType,companyId:companyId,method:'GET'},
	    				   function(res){
	    			   		return res;
	    			   	   });	
	    	 }
	    	 
	    	 /*** to get vessel company details***/
	    	 function getCompanyDetails(companyId){
	    			return detailsApi.getCompanyDetails.query({companyId:companyId,method : 'GET'},
	    					function(res) {
	    						return res;
	    					})
	    	 };
	    	 
	    	 function getPreviousAuditDetail(auditTypeId,imoNo,cId){
	    		   return detailsApi.getPreviousAuditDetail.query({vesselIMONo:imoNo,auditTypeId:auditTypeId,companyId:cId,method:'GET',catche:true,isArray:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetail(auditTypeId,companyId,auditSeqNo){
	    		   return detailsApi.getAuditDetail.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getSspReviewDetail(vesselImoNo,auditTypeId,companyId){
	    		   return detailsApi.getSspReviewDetail.query({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,method:'GET',catche:false,isArray:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetailAndNextAdtCrtStatus(auditTypeId,companyId,auditSeqNo,status,vesselImoNo){
	    		   return detailsApi.getAuditDetailAndNextAdtCrtStatus.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,status:status,vesselImoNo:vesselImoNo,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetailAndCheckSameAudit(auditTypeId,companyId,auditSeqNo,vesselImoNo){
	    		   return detailsApi.getAuditDetailAndCheckSameAudit.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,vesselImoNo:vesselImoNo,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getSignature(emailId,companyId){
	    		   return detailsApi.getSignature.get({emailId:emailId,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function auditorSignandSeal(signer,companyId){
	    		   return detailsApi.auditorSignandSeal.get({signer:signer,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function auditorSignAndSeal(officialId,companyId){
	    		   return detailsApi.auditorSignAndSeal.get({officialId:officialId,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditCode(audType,companyId){
	    		 return detailsApi.getAuditCode.query({audType:audType,companyId:companyId},function(res){return res;});
	    	 }
	    	 
	    	 function saveAuditData(data,status,auditTypeId,companyId){
	    		   return detailsApi.saveAuditData.put({status:status,auditTypeId:auditTypeId,companyId:companyId,method:'POST',catche:true},data,
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function updateLockHolder(auditTypeId,auditSeqNo,lockHolder,companyId){
	    		   return detailsApi.updateLockHolder.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,lockHolder:lockHolder,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getSSPDetails(vesselImoNo,auditTypeId,companyId,auditSubTypeId,auditSeqNo){
	      		   return detailsApi.getSSPDetails.get({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,auditSubTypeId:auditSubTypeId,auditSeqNo:auditSeqNo,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	      	 
	      	function getISPSInitialDetails(vesselImoNo,auditTypeId,companyId){
	      		   return detailsApi.getISPSInitialDetails.get({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	      	 
	    	 function getAuditSeqNo(auditTypeId,companyId){
	    		   return detailsApi.getAuditSeqNo.query({auditTypeId:auditTypeId,companyId:companyId},function(res){return res});
	    	 }
	    	 
	    	 function getSSPRevisionNo(vesselImoNo,auditTypeId,companyId,auditSeqNo){
	      		   return detailsApi.getSSPRevisionNo.get({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,auditSeqNo:auditSeqNo,method:'GET',catche:false},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function getNewCertificateNo(auditTypeId,auditSubTypeId,companyId){
	    		   return detailsApi.getNewCertificateNo.query({auditTypeId:auditTypeId,auditSubTypeId:auditSubTypeId,companyId:companyId},function(res){return res});
	    	 }
	    	 
	    	 function getAuditReportNo(auditTypeId,companyId){
	    		   return detailsApi.getAuditReportNo.query({auditTypeId:auditTypeId,companyId:companyId},function(res){return res});
	    	 }
	    	 
	    	 function checkAuditStatus(auditSeqNo,auditTypeId,companyId){
	      		   return detailsApi.checkAuditStatus.get({auditSeqNo:auditSeqNo,auditTypeId:auditTypeId,companyId:companyId,method:'GET',catche:false},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function updateDocFlag(auditTypeId,auditSeqNo,companyId,docFlag){
	     		   return detailsApi.updateDocFlag.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,docFlag:docFlag,method:'GET',catche:true},
	     				function(res){
	     			   		return res;
	     		   		});
	     	 }
	    	 
	    	 function getPrevDocDetails(compImoNo,compDocNo,companyId){
	      		   return detailsApi.getPrevDocDetails.get({compImoNo:compImoNo,compDocNo:compDocNo,companyId:companyId,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function downloadReport(name,seqNo,id,companyId){ 
	    		   return detailsApi.downloadReport.put({fileName:name,auditSeqNo:seqNo,auditTypeId:id,companyId:companyId},function(res){
	    			   return res;
	    		   });
	    	 }
	    	 
	    	 function getAuditCertificateData(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate,directInterorAdd){ //modified by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
	    		   return detailsApi.getAuditCertificateData.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,directInterorAdd:directInterorAdd,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getAuditCertificateInActive(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate,directInterorAdd){ //modified by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
	    		   return detailsApi.getAuditCertificateInActive.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,directInterorAdd:directInterorAdd,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getPrevFindingDetails(type,audDate,imoNo,seqNo,cId,companyImoNo,companyDoc){
	    		   return detailsApi.getPrevFindingDetails.put({auditTypeId:type,auditDate:audDate,vesselIMONo:imoNo,currentAuditSeqNo:seqNo,companyId:cId,companyImoNo:companyImoNo,companyDoc:companyDoc},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getPrevFinding(auditTypeId,vesselImoNo,companyId,companyImoNo,companyDoc){
	    		   return detailsApi.getPrevFinding.put({auditTypeId:auditTypeId,vesselImoNo:vesselImoNo,companyId:companyId,companyImoNo:companyImoNo,companyDoc:companyDoc},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	
	    	 function vesselDetails(companyId,userId,vesselIMONo,searchBy){
	    		   return detailsApi.vesselDetails.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,searchBy:searchBy,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
			  
	    	 function vesselSpecificDtl(companyId,userId,vesselIMONo,docTypeNum){
	    		 return detailsApi.vesselSpecificDtl.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,docTypeNum:docTypeNum,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getCurrentUserDetail(emailId,companyId){
	    		 return detailsApi.getCurrentUserDetail.query({emailId:emailId,companyId:companyId,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function vesselDtlIncomplete(userId,vesselImoNo,vesselId,companyId,vesselDtlIncomplete){
	      		   return detailsApi.vesselDtlIncomplete.put({userId:userId,vesselImoNo:vesselImoNo,vesselId:vesselId,companyId:companyId,method:'POST',catche:false},vesselDtlIncomplete,
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function getMaPort(companyId){
	    		   return detailsApi.getMaPort.query({companyId:companyId,method:'GET',catche:true},
	       		   		function(res){
	    			   
	       			   		return res;
	       		   		});
	    	}
	    	 
	    	function allAuditorSign(auditSeqNo,companyId){ console.log(auditSeqNo);
	    		 
	    		 return detailsApi.allAuditorSign.query({auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:true},
		       				function(res){
		       			   		return res;
		       			   		console.log(res);
		       		 		});
		    	
	    	 }
	    	
	    	 function updateLtrStatus(auditTypeId,auditSeqNo,companyId,ltrStatus){
	     		   return detailsApi.updateLtrStatus.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,ltrStatus:ltrStatus,method:'GET',catche:true},
	     				function(res){
	     			   		return res;
	     		   		});
	     	 }
	    	 
	    	 function saveReportData(data,auditTypeId,companyId){
	    		   return detailsApi.saveReportData.put({auditTypeId:auditTypeId,companyId:companyId,method:'POST',catche:true},data,
	    				function(res){
	    			   
	    			   console.log(res);
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function notifyDetails(data){
	    		   return detailsApi.notifyDetails.put({method:'POST',catche:true},data,
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 
	    	 function signatureGenBlobData(orgAuditseq,auditTypeId,companyId,versionId){
	       		   return detailsApi.signatureGenBlobData.put({orgAuditseq:orgAuditseq,auditTypeId:auditTypeId,companyId:companyId,versionId:versionId,method:'POST',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	       	   }
	    	 
	    	 function getNotifyEmailDetail(emailId,companyId){
	    		 return detailsApi.getNotifyEmailDetail.query({emailId:emailId,companyId:companyId ,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getDMLCReportNos(vesselImoNo,companyId,auditTypeId){
	    		   return detailsApi.getDMLCReportNos.query({vesselImoNo:vesselImoNo,companyId:companyId,auditTypeId:auditTypeId,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	};
	    	
	    	function getFindingData(auditTypeId,currentAuditSeqNo,companyId){
    	    	return detailsApi.getFindingData.get({auditTypeId:auditTypeId,currentAuditSeqNo:currentAuditSeqNo,companyId:companyId},function(res){return res;});
    	    }
	    	
	    	function getDMLCLocationDate(vesselImoNo,companyId,auditSeqNo,status){
    	    	return detailsApi.getDMLCLocationDate.get({vesselImoNo:vesselImoNo,companyId:companyId,auditSeqNo:auditSeqNo,status:status},function(res){return res;});
    	    }
	    	    
	    	function getCompletionDate(vesselImoNo,companyId,auditTypeId,status,auditSeqNo){
    	    	return detailsApi.getCompletionDate.get({vesselImoNo:vesselImoNo,companyId:companyId,auditTypeId:auditTypeId,status:status,auditSeqNo:auditSeqNo},function(res){return res;});
    	    }
	    	
	    	function getLatestVesselDetails(vesselIMONo){
	    		   return detailsApi.getLatestVesselDetails.query({vesselIMONo:vesselIMONo,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	function updateVesselDetails(data){
	    		   return detailsApi.updateVesselDetails.query({method:'POST',catche:false},data,
	       				function(res){
	       			   		return res;
	       		   		});	
	    	   };
	    	   
	    	function getVesselRefresh(vesselIMONo){
	    		   return detailsApi.getVesselRefresh.query({vesselIMONo:vesselIMONo,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	}
	    	
	    	function getUpdatedData(){
	    		   return detailsApi.getUpdatedData.query({method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	}
	    	
	    	function updateVesselAuto(data){
	    		   return detailsApi.updateVesselAuto.query({method:'POST',catche:false},data,
	       				function(res){
	       			   		return res;
	       		   		});	
	    	   };
    }
    
})();