(function (){
	
    'use strict';

    angular
    	.module('app.audit.detailsIhm')
        
        .factory('detailsFactoryIhm', detailsFactoryIhm);
    

     function detailsFactoryIhm(detailsIhmApi){    	   
    	  
    	    var detailsFactoryIhm = {
    	    		
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
		            getAuditDetailForIhm:getAuditDetailForIhm,
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
		            getAuditCertificateDataForIhm:getAuditCertificateDataForIhm,
		            getAuditCertificateInActive:getAuditCertificateInActive,
		            getAuditCertificateInActiveForIhm:getAuditCertificateInActiveForIhm,
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
		        	vesselDtlIncompleteYatch:vesselDtlIncompleteYatch,
		        	getStampData:getStampData,
		        	deleteStamp:deleteStamp,
		        	removeIhmFinalReport:removeIhmFinalReport,
		        	copyStampFile:copyStampFile,
		        	getFileStamp:getFileStamp,
		        	getCompletionDate : getCompletionDate,
		        	getDMLCLocationDate : getDMLCLocationDate,
		        	getAllRmiIhmCustomers:getAllRmiIhmCustomers,
		        	updateVesselDetails:updateVesselDetails,
		        	getVesselRefresh:getVesselRefresh,
		        	updateVesselAuto:updateVesselAuto
		        	 
		        	
		    };

			return detailsFactoryIhm;
			
			function tcDetails(data) {
				return detailsIhmApi.tcDetails.save({
				}, data, function(res) {
					return res;
				});
			};
			
			function copyStampFile(filename){ 
	    		   return detailsIhmApi.copyStampFile.query({filename:filename},function(){
	    		   });
	    		   
	    	   }
			
			function deleteStamp(status,FILE_NAME,USER_ID){
		   		   return detailsIhmApi.deleteStamp.query({status:status,FILE_NAME:FILE_NAME,USER_ID:USER_ID},
		   				   function(res){return res});
		     	  }
			
			function vesselMissingMailCall(auditTypeId,companyId,vesselImoNo,vesselName){
	    		   return detailsIhmApi.vesselMissingMailCall.get({auditTypeId:auditTypeId,companyId:companyId,vesselImoNo:vesselImoNo,vesselName:vesselName,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	   } 
			
			function tcApprovalStatus(flag,companyId,vesselImoNo){
			
	    		   return detailsIhmApi.tcApprovalStatus.save({
	    			   companyId:companyId,vesselImoNo:vesselImoNo
	    			   },flag,function(res){
	    			   		return res;
	    		   		});
	    	   } 
	    	   
			
			/********** for getting vessel from RMI **********/
			function getRmiVessel(cId,userId,imoNo){
				return detailsIhmApi.getRmiVessel.query({companyId:cId,userId:userId,VesselIMONo:imoNo},function(res){return res;});
			}
			
			/***** to get the Auditors Details*****/
			function getAudObsData(companyId){
	    		 return detailsIhmApi.getAudObsData.query({companyId:companyId,method:'GET',catche:true},
	    				  function(res){
	    			   		return res;
	    		   		  });
	    	}
			
			/***** to get the AuditSubTypes*****/
	    	function getAuditSubType(audType,companyId){
	    		 return detailsIhmApi.getAuditSubType.query({auditType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		},function(err){
	    		   			return err;
	    		   		});
	    	}
	    	   
	    	/***** to get the audit status*****/
	    	function getAuditStatus(audType,companyId){
	    		 return detailsIhmApi.getAuditStatus.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the certificate issued*****/
	    	function getCertificateIssued(audType,companyId){
	    		 return detailsIhmApi.getCertificateIssued.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the observation/findings category*****/
	    	function getObsCategory(audType,companyId){
	    		   return detailsIhmApi.getObsCategory.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	   
	    	/***** to get the observation/findings status*****/
	    	function getObsStatus(audType,companyId){
	    		   return detailsIhmApi.getObsStatus.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the Audit Observation Detail Type(Auditor/reviewer/observer) *****/
	    	function getAudObsType(companyId){
	    		 return detailsIhmApi.getAudObsType.query({companyId:companyId,method:'GET',catche:true},
	       				function(res){
	       			   		return res;
	       		 		});
	    	}
	    	
	    	/***** to get the Audit Report Types Detail *****/
	    	function getReportTypes(audType,companyId){
	    		 return detailsIhmApi.getReportTypes.query({audType:audType,companyId:companyId,method:'GET',catche:true},
	    		   		function(res){
	    			   		return res;
	    		   		});
	    	}
	    	
	    	/***** to get the Vessel Details *****/
	    	function getVesselData(companyId){
	    		   return detailsIhmApi.getVesselData.query({companyId:companyId,method:'GET',catche:true},
	       		   		function(res){
	    			   
	       			   		return res;
	       		   		});
	    	}
	    	
	    	/***** to get the Vessel Type Details *****/
	    	function getVesselTypeData(companyId){
	    		   return detailsIhmApi.getVesselTypeData.query({companyId:companyId,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	}
	    	
	    	/****TO get the type of audit****/
	    	 function getAuditType(companyId){
	    		   return detailsIhmApi.getAuditType.query({companyId:companyId,method:'GET'},
	       				function(res){
	    			   		return res;
	       		   		});
	    	 }
	    	 
	    	 /****TO get the type of audit****/
	    	 function getAuditSummary(audType,companyId){
	    		   return detailsIhmApi.getAuditSummary.query({audType:audType,companyId:companyId,method:'GET'},
	    				   function(res){
	    			   		return res;
	    			   	   });	
	    	 }
	    	 
	    	 /*** to get vessel company details***/
	    	 function getCompanyDetails(companyId){
	    			return detailsIhmApi.getCompanyDetails.query({companyId:companyId,method : 'GET'},
	    					function(res) {
	    						return res;
	    					})
	    	 };
	    	 
	    	 function getPreviousAuditDetail(auditTypeId,imoNo,cId){
	    		   return detailsIhmApi.getPreviousAuditDetail.query({vesselIMONo:imoNo,auditTypeId:auditTypeId,companyId:cId,method:'GET',catche:true,isArray:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetail(auditTypeId,companyId,auditSeqNo){
	    		   return detailsIhmApi.getAuditDetail.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetailForIhm(auditTypeId,companyId,auditSeqNo){
	    		   return detailsIhmApi.getAuditDetailForIhm.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 function getSspReviewDetail(vesselImoNo,auditTypeId,companyId){
	    		   return detailsIhmApi.getSspReviewDetail.query({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,method:'GET',catche:false,isArray:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetailAndNextAdtCrtStatus(auditTypeId,companyId,auditSeqNo,status,vesselImoNo){
	    		   return detailsIhmApi.getAuditDetailAndNextAdtCrtStatus.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,status:status,vesselImoNo:vesselImoNo,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditDetailAndCheckSameAudit(auditTypeId,companyId,auditSeqNo,vesselImoNo){
	    		   return detailsIhmApi.getAuditDetailAndCheckSameAudit.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,vesselImoNo:vesselImoNo,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getSignature(emailId,companyId){
	    		   return detailsIhmApi.getSignature.get({emailId:emailId,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function auditorSignandSeal(signer,companyId){
	    		   return detailsIhmApi.auditorSignandSeal.get({signer:signer,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function auditorSignAndSeal(officialId,companyId){
	    		   return detailsIhmApi.auditorSignAndSeal.get({officialId:officialId,companyId:companyId,method:'GET',catche:false},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getAuditCode(audType,companyId){
	    		 return detailsIhmApi.getAuditCode.query({audType:audType,companyId:companyId},function(res){return res;});
	    	 }
	    	 
	    	 function saveAuditData(data,status,auditTypeId,companyId){
	    		   return detailsIhmApi.saveAuditData.put({status:status,auditTypeId:auditTypeId,companyId:companyId,method:'POST',catche:true},data,
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function updateLockHolder(auditTypeId,auditSeqNo,lockHolder,companyId){
	    		   return detailsIhmApi.updateLockHolder.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,lockHolder:lockHolder,companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getSSPDetails(vesselImoNo,auditTypeId,companyId,auditSubTypeId,auditSeqNo){
	      		   return detailsIhmApi.getSSPDetails.get({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,auditSubTypeId:auditSubTypeId,auditSeqNo:auditSeqNo,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	      	 
	      	function getISPSInitialDetails(vesselImoNo,auditTypeId,companyId){
	      		   return detailsIhmApi.getISPSInitialDetails.get({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	      	 
	    	 function getAuditSeqNo(auditTypeId,companyId){
	    		   return detailsIhmApi.getAuditSeqNo.query({auditTypeId:auditTypeId,companyId:companyId},function(res){return res});
	    	 }
	    	 
	    	 function getSSPRevisionNo(vesselImoNo,auditTypeId,companyId,auditSeqNo){
	      		   return detailsIhmApi.getSSPRevisionNo.get({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId,auditSeqNo:auditSeqNo,method:'GET',catche:false},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function getNewCertificateNo(auditTypeId,auditSubTypeId,companyId){
	    		   return detailsIhmApi.getNewCertificateNo.query({auditTypeId:auditTypeId,auditSubTypeId:auditSubTypeId,companyId:companyId},function(res){return res});
	    	 }
	    	 
	    	 function getAuditReportNo(auditTypeId,companyId){
	    		   return detailsIhmApi.getAuditReportNo.query({auditTypeId:auditTypeId,companyId:companyId},function(res){return res});
	    	 }
	    	 
	    	 function checkAuditStatus(auditSeqNo,auditTypeId,companyId){
	      		   return detailsIhmApi.checkAuditStatus.get({auditSeqNo:auditSeqNo,auditTypeId:auditTypeId,companyId:companyId,method:'GET',catche:false},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function updateDocFlag(auditTypeId,auditSeqNo,companyId,docFlag){
	     		   return detailsIhmApi.updateDocFlag.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,docFlag:docFlag,method:'GET',catche:true},
	     				function(res){
	     			   		return res;
	     		   		});
	     	 }
	    	 
	    	 function getPrevDocDetails(compImoNo,compDocNo,companyId){
	      		   return detailsIhmApi.getPrevDocDetails.get({compImoNo:compImoNo,compDocNo:compDocNo,companyId:companyId,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function downloadReport(name,seqNo,id,companyId){ 
	    		   return detailsIhmApi.downloadReport.put({fileName:name,auditSeqNo:seqNo,auditTypeId:id,companyId:companyId},function(res){
	    			   return res;
	    		   });
	    	 }
	    	 
	    	 function getAuditCertificateData(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate){
	    		   return detailsIhmApi.getAuditCertificateData.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getAuditCertificateDataForIhm(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate){
	    		   return detailsIhmApi.getAuditCertificateDataForIhm.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getStampData(REVIEW_REPORT_NO,AUDIT_SEQ_NO){
	    		   return detailsIhmApi.getStampData.query({REVIEW_REPORT_NO:REVIEW_REPORT_NO,AUDIT_SEQ_NO:AUDIT_SEQ_NO,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getFileStamp(filename,auditSeqNo){
	    		   return detailsIhmApi.getStampFile.query({FILE_NAME:filename,auditSeqNo:auditSeqNo,method:'GET',catche:false},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getAuditCertificateInActive(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate){
	    		   return detailsIhmApi.getAuditCertificateInActive.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getAuditCertificateInActiveForIhm(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate){
	    		   return detailsIhmApi.getAuditCertificateInActiveForIhm.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function getPrevFindingDetails(type,audDate,imoNo,seqNo,cId,companyImoNo,companyDoc){
	    		   return detailsIhmApi.getPrevFindingDetails.put({auditTypeId:type,auditDate:audDate,vesselIMONo:imoNo,currentAuditSeqNo:seqNo,companyId:cId,companyImoNo:companyImoNo,companyDoc:companyDoc},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getPrevFinding(auditTypeId,vesselImoNo,companyId,companyImoNo,companyDoc){
	    		   return detailsIhmApi.getPrevFinding.put({auditTypeId:auditTypeId,vesselImoNo:vesselImoNo,companyId:companyId,companyImoNo:companyImoNo,companyDoc:companyDoc},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	
	    	 function vesselDetails(companyId,userId,vesselIMONo,searchBy){
	    		   return detailsIhmApi.vesselDetails.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,searchBy:searchBy,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
			  
	    	 function vesselSpecificDtl(companyId,userId,vesselIMONo,docTypeNum){
	    		 return detailsIhmApi.vesselSpecificDtl.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,docTypeNum:docTypeNum,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getCurrentUserDetail(emailId,companyId){
	    		 return detailsIhmApi.getCurrentUserDetail.query({emailId:emailId,companyId:companyId,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    			   						});
	    	 }
	    	 
	    	 function vesselDtlIncomplete(userId,vesselImoNo,vesselId,companyId,vesselDtlIncomplete){
	      		   return detailsIhmApi.vesselDtlIncomplete.put({userId:userId,vesselImoNo:vesselImoNo,vesselId:vesselId,companyId:companyId,method:'POST',catche:false},vesselDtlIncomplete,
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 function vesselDtlIncompleteYatch(userId,vesselName,vesselId,companyId,vesselDtlIncomplete){
	      		   return detailsIhmApi.vesselDtlIncompleteYatch.put({userId:userId,vesselName:vesselName,vesselId:vesselId,companyId:companyId,method:'POST',catche:false},vesselDtlIncomplete,
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	 
	    	 
	    	 function getMaPort(companyId){
	    		   return detailsIhmApi.getMaPort.query({companyId:companyId,method:'GET',catche:true},
	       		   		function(res){
	    			   
	       			   		return res;
	       		   		});
	    	}
	    	 
	    	function allAuditorSign(auditSeqNo,companyId){ console.log(auditSeqNo);
	    		 
	    		 return detailsIhmApi.allAuditorSign.query({auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:true},
		       				function(res){
		       			   		return res;
		       			   		console.log(res);
		       		 		});
		    	
	    	 }
	    	
	    	 function updateLtrStatus(auditTypeId,auditSeqNo,companyId,ltrStatus){
	     		   return detailsIhmApi.updateLtrStatus.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,ltrStatus:ltrStatus,method:'GET',catche:true},
	     				function(res){
	     			   		return res;
	     		   		});
	     	 }
	    	 
	    	 function saveReportData(data,auditTypeId,companyId){
	    		   return detailsIhmApi.saveReportData.put({auditTypeId:auditTypeId,companyId:companyId,method:'POST',catche:true},data,
	    				function(res){
	    			   
	    			   console.log(res);
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 function notifyDetails(data){
	    		   return detailsIhmApi.notifyDetails.put({method:'POST',catche:true},data,
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
	    	 
	    	 
	    	 function signatureGenBlobData(orgAuditseq,auditTypeId,companyId,versionId){
	       		   return detailsIhmApi.signatureGenBlobData.put({orgAuditseq:orgAuditseq,auditTypeId:auditTypeId,companyId:companyId,versionId:versionId,method:'POST',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	       	   }
	    	 
	    	 function getNotifyEmailDetail(emailId,companyId){
	    		 return detailsIhmApi.getNotifyEmailDetail.query({emailId:emailId,companyId:companyId ,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 
	    	 function getDMLCReportNos(vesselImoNo,companyId,auditTypeId){
	    		   return detailsIhmApi.getDMLCReportNos.query({vesselImoNo:vesselImoNo,companyId:companyId,auditTypeId:auditTypeId,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	};
	    	
	    	function getFindingData(auditTypeId,currentAuditSeqNo,companyId){
    	    	return detailsIhmApi.getFindingData.get({auditTypeId:auditTypeId,currentAuditSeqNo:currentAuditSeqNo,companyId:companyId},function(res){return res;});
    	    }
	    	
	    	 function removeIhmFinalReport(orgAuditseq,auditTypeId,companyId,versionId){
	       		   return detailsIhmApi.removeIhmFinalReport.put({orgAuditseq:orgAuditseq,auditTypeId:auditTypeId,companyId:companyId,versionId:versionId,method:'POST',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	       	   }
	    	 
	    	 function getDMLCLocationDate(vesselImoNo,companyId,auditSeqNo,status){
	    	    	return detailsIhmApi.getDMLCLocationDate.get({vesselImoNo:vesselImoNo,companyId:companyId,auditSeqNo:auditSeqNo,status:status},function(res){return res;});
	    	    }
	    	 
	    	 function getCompletionDate(vesselImoNo,companyId,auditTypeId,status,auditSeqNo){
	    	    	return detailsIhmApi.getCompletionDate.get({vesselImoNo:vesselImoNo,companyId:companyId,auditTypeId:auditTypeId,status:status,auditSeqNo:auditSeqNo},function(res){return res;});
	    	    }
	    	 
	    	 function getAllRmiIhmCustomers(){
	    		   return detailsIhmApi.getAllRmiIhmCustomers.query({method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	 }
	    	 function updateVesselDetails(data){
	    		   return detailsIhmApi.updateVesselDetails.query({method:'POST',catche:false},data,
	       				function(res){
	       			   		return res;
	       		   		});	
	    	   }
	    	 function getVesselRefresh(vesselIMONo){
	    		   return detailsIhmApi.getVesselRefresh.query({vesselIMONo:vesselIMONo,method:'GET'},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	}
	    	 
	    	function updateVesselAuto(data){
	    		   return detailsIhmApi.updateVesselAuto.query({method:'POST',catche:false},data,
	       				function(res){
	       			   		return res;
	       		   		});	
	    	   };
	    	 
    }
    
})();