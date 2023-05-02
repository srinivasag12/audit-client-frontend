(function (){
	
    'use strict';

    angular
    	.module('app.certificate')
        
        .factory('certificateFactory', certificateFactory);
    

    function certificateFactory(certificateApi){    	   
    	
    	    var certificateFactory = {
    	    		getCertSearchResult:getCertSearchResult,
    	    		getCertificateDetail:getCertificateDetail,
    	    		getCertificateIssueReason:getCertificateIssueReason,
    	    		getEcGrantedReason : getEcGrantedReason,
    	    		generateCertificate:generateCertificate,
    	    		checkRelatedToCurrAdt:checkRelatedToCurrAdt,
    	    		vesselSpecificDtl:vesselSpecificDtl,
    	    		vesselDetails:vesselDetails,
    	    		getUTN:getUTN,
    	    		publishCertificate:publishCertificate,
    	    		getUtnAndCertificateId:getUtnAndCertificateId,
    	    		getUtnAndCertificateIdForIhm:getUtnAndCertificateIdForIhm,
    	    		getAuditCertDetails:getAuditCertDetails,
    	    		getAuditCertDetailsForIhm:getAuditCertDetailsForIhm,
    	    		getPreviousIssueDate:getPreviousIssueDate,
    	    		checkPreviousInitialaudit:checkPreviousInitialaudit,
    	    		generateCertificateWithoutAudit:generateCertificateWithoutAudit,
    	    		getCertificateReissueReason:getCertificateReissueReason,
    	    		getCurrentUserFullName:getCurrentUserFullName,
    	    		getAllIhmCertificateDetail:getAllIhmCertificateDetail,
    	    		getAllCertificateDetailForIhm:getAllCertificateDetailForIhm,
    	    		getAllCycleDate:getAllCycleDate,
    	    		UpdateDirectIntermediateIssueExpiryDate:UpdateDirectIntermediateIssueExpiryDate,
    	    		generateCertificatePublishStatusWithOutAudit:generateCertificatePublishStatusWithOutAudit,
    	    		generateCertificateForIhm:generateCertificateForIhm,
    	    		deleteCertificateForIhm:deleteCertificateForIhm,
    	    		getUTNForIhm:getUTNForIhm,
    	    		getSocTypeSelectDefault:getSocTypeSelectDefault,
    	    		getIntitalCertForDownloadIhm : getIntitalCertForDownloadIhm,
    	    		getCertSearchResultForIhm:getCertSearchResultForIhm,
    	    		getCertificateDetailForIhm:getCertificateDetailForIhm,
    	    		generateCertificateWithOutAuditIhm:generateCertificateWithOutAuditIhm,
    	    		getCertificateIHM:getCertificateIHM,
    	    		getCompletedStatus:getCompletedStatus
    	    };

    	    function getCertSearchResult(searchBeanValues){
    		    return certificateApi.getCertSearchResult.put({method:'POST',catche:true},searchBeanValues,
    				function(res){
    			   		return res;
    		   		});		   
    	   };
    	   
    	   function getCertSearchResultForIhm(searchBeanValues){
   		    return certificateApi.getCertSearchResultForIhm.put({method:'POST',catche:true},searchBeanValues,
   				function(res){
   			   		return res;
   		   		});		   
   	   };
   	   
    	   function getCurrentUserFullName(userId,companyId){
           	return certificateApi.getCurrentUserFullName.get({userId:userId, companyId:companyId},function(res){return res});
           }
    	
    	   function getCertificateDetail(auditSeqNo, companyId, seqNo, activeStatus){
   		    return certificateApi.getCertificateDetail.get({auditSeqNo:auditSeqNo, companyId:companyId, seqNo:seqNo, activeStatus:activeStatus, method:'get',catche:true},
   				function(res){
   			   		return res;
   		   		});		   
    	   };
    	   
    	   function getEcGrantedReason(){
     		    return certificateApi.getEcGrantedReason.query({ method:'get',catche:true},
     				function(res){
     			   		return res;
     		   		});		   
      	   };
      	   
    	   function getCertificateDetailForIhm(auditSeqNo, companyId, seqNo, activeStatus,socType){
      		    return certificateApi.getCertificateDetailForIhm.get({auditSeqNo:auditSeqNo, companyId:companyId, seqNo:seqNo, activeStatus:activeStatus, socType:socType, method:'get',catche:true},
      				function(res){
      			   		return res;
      		   		});		   
       	   };
       	   
    	   function getAllIhmCertificateDetail(auditTypeId, vesselImoNo, companyId){
      		    return certificateApi.getAllIhmCertificateDetail.get({auditTypeId:auditTypeId, vesselImoNo:vesselImoNo, companyId:companyId, method:'get',catche:true},
      				function(res){
      			   		return res;
      		   		});		   
       	   };
       	   
     	  function getUTNForIhm(count){
       		 return certificateApi.getUTNForIhm.get({count:count,method:'GET'},
       				   	function(res){
       			   			return res;
       		   			});
       	  };
       	  
       	  
       	  function getAllCertificateDetailForIhm(auditTypeId, vesselImoNo, companyId,socType){
    		    return certificateApi.getAllCertificateDetailForIhm.get({auditTypeId:auditTypeId, vesselImoNo:vesselImoNo, companyId:companyId, socType:socType, method:'get',catche:true},
    				function(res){
    			   		return res;
    		   		});		   
     	   };
     	   
    	   function getPreviousIssueDate(vesselImo, auditSeqNo, companyId){
      		    return certificateApi.getPreviousIssueDate.get({vesselImo:vesselImo,auditSeqNo:auditSeqNo, companyId:companyId, method:'get',catche:true},
      				function(res){
      			   		return res;
      		   		});		   
       	   };
       	   
       	  function checkPreviousInitialaudit(auditType, vesselImo, companyId, auditSubType, auditSeqNo){
    		    return certificateApi.checkPreviousInitialaudit.get({auditType:auditType, vesselImo:vesselImo, companyId:companyId, auditSubType:auditSubType, auditSeqNo:auditSeqNo, method:'get',catche:true},
    				function(res){
    			   		return res;
    		   		});		   
     	   };
    	  
     	  function deleteCertificateForIhm (certIssueId, companyId,vesselImo,auditSubType,auditSeqNo,certNo,socType){
  		    return certificateApi.deleteCertificateForIhm.get({certIssueId:certIssueId, companyId:companyId, vesselImo:vesselImo, auditSubType:auditSubType, auditSeqNo:auditSeqNo,certNo:certNo,socType:socType, method:'get',catche:true},
  				function(res){
  			   		return res;
  		   		});		   
   	   };
   	   
 	  function getSocTypeSelectDefault (certIssueId, companyId,vesselImo,auditSubType,auditSeqNo,certLink,socType){
		    return certificateApi.getSocTypeSelectDefault.get({certIssueId:certIssueId, companyId:companyId, vesselImo:vesselImo, auditSubType:auditSubType, auditSeqNo:auditSeqNo,certLink:certLink, socType:socType, method:'get',catche:true},
				function(res){
			   		return res;
		   		});		   
 	   };
   	
   	   
    	   function getAuditCertDetails(auditSeqNo, companyId){
      		    return certificateApi.getAuditCertDetails.get({auditSeqNo:auditSeqNo, companyId:companyId, method:'get',catche:true},
      				function(res){
      			   		return res;
      		   		});		   
       	   };
    	   
       	   function getAuditCertDetailsForIhm(auditSeqNo, companyId){
     		    return certificateApi.getAuditCertDetailsForIhm.get({auditSeqNo:auditSeqNo, companyId:companyId, method:'get',catche:true},
     				function(res){
     			   		return res;
     		   		});		   
      	   };
      	   
    	   function getCertificateIssueReason(companyId){
      		    return certificateApi.getCertificateIssueReason.query({companyId:companyId, method:'get',catche:true},
      				function(res){
      			   		return res;
      		   		});		   
       	   };
    	   
       	   function generateCertificate(certificateData,status,generateStatus){
       		   console.log(certificateData);
       		//certificateData='';
       		
       		   return certificateApi.generateCertificate.put({status:status,generateStatus:generateStatus,method:'POST',catche:false},certificateData,
       				   function(res){
			   			return res;
		   			});		   
       	   };
       	   
       	 function generateCertificateForIhm(certificateData,status,generateStatus){
     		   console.log(certificateData);
     		//certificateData='';
     		
     		   return certificateApi.generateCertificateForIhm.put({status:status,generateStatus:generateStatus,method:'POST',catche:false},certificateData,
     				   function(res){
			   			return res;
		   			});		   
     	   };
     	   
       	function generateCertificatePublishStatusWithOutAudit(certificateData){
    		   console.log("certificateData  "+certificateData);
    		//certificateData='';
    		
    		   return certificateApi.generateCertificatePublishStatusWithOutAudit.put({method:'POST',catche:false},certificateData,
    				   function(res){
			   			return res;
		   			});		   
    	   };
       	  function generateCertificateWithoutAudit(certificateData,status,generateStatus){
      		   return certificateApi.generateCertificateWithoutAudit.put({status:status,generateStatus:generateStatus,method:'POST',catche:false},certificateData,
      				   function(res){
			   			return res;
		   			});		   
      	   };
    	   
      	 function generateCertificateWithOutAuditIhm(certificateData,status,generateStatus){
    		   return certificateApi.generateCertificateWithOutAuditIhm.put({status:status,generateStatus:generateStatus,method:'POST',catche:false},certificateData,
    				   function(res){
			   			return res;
		   			});		   
    	   };
  	   
       	   function checkRelatedToCurrAdt(auditSeqNo, companyId, userId){
       		   return certificateApi.checkRelatedToCurrAdt.get({auditSeqNo:auditSeqNo, companyId:companyId, userId:userId, method:'get',catche:true},
       				   function(res){
   			   			return res;
   		   			});		   
       	   }; //---------------//
       	   
       	  function vesselDetails(companyId,userId,vesselIMONo,searchBy){
       		  return certificateApi.vesselDetails.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,searchBy:searchBy,method:'GET'},
  				   	function(res){
  			   			return res;
  		   			});
       	  };
       	 
       	  function vesselSpecificDtl(companyId,userId,vesselIMONo,docTypeNum){
    		 return certificateApi.vesselSpecificDtl.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,docTypeNum:docTypeNum,method:'GET'},
    				   	function(res){
    			   			return res;
    		   			});
    	  };
       	 
    	  function getUTN(){
     		 return certificateApi.getUTN.get({method:'GET'},
     				   	function(res){
     			   			return res;
     		   			});
     	  };
     	  
     
      	  
     	 function getUtnAndCertificateId(auditReportNo,certificateNo,companyId){
     		 return certificateApi.getUtnAndCertificateId.get({auditReportNo:auditReportNo,certificateNo:certificateNo,companyId:companyId,method:'GET'},
     				   	function(res){
     			   			return res;
     		   			});
     	  };
     	 function getUtnAndCertificateIdForIhm(auditReportNo,certificateNo,companyId){
     		 return certificateApi.getUtnAndCertificateIdForIhm.get({auditReportNo:auditReportNo,certificateNo:certificateNo,companyId:companyId,method:'GET'},
     				   	function(res){
     			   			return res;
     		   			});
     	  };
       	
     	  function publishCertificate(auditSeqNo,companyId,seqNo){
      		 return certificateApi.publishCertificate.get({auditSeqNo:auditSeqNo,companyId:companyId,seqNo:seqNo,method:'GET'},
      				   	function(res){
      			   			return res;
      		   			});
      	  };
      	  
      	  
      	 function getCertificateReissueReason(companyId){
   		    return certificateApi.getCertificateReissueReason.query({companyId:companyId, method:'get',catche:true},
   				function(res){
   			   		return res;
   		   		});		   
    	   };
      	  
    	 	 function getAllCycleDate(auditTypeId,vesselImoNo,companyId){
    	 		
    	   		    return certificateApi.getAllCycleDate.query({auditTypeId:auditTypeId,vesselImoNo:vesselImoNo,companyId:companyId, method:'get',catche:true},
    	   				function(res){
    	   			   		return res;
    	   		   		});		   
    	    	   };
    	      	  
      	  
    	    		 function UpdateDirectIntermediateIssueExpiryDate(auditTypeId,auditSeqNo,companyId,certExpireDate,certIssueDate,certIssueId,vesselImoNo){
    		     		   return certificateApi.UpdateDirectIntermediateIssueExpiryDate.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,certExpireDate:certExpireDate,certIssueDate:certIssueDate,certIssueId:certIssueId,vesselImoNo:vesselImoNo,method:'GET',catche:true},
    		     				function(res){
    		     			   		return res;
    		     		   		});
    		     	 } 
    	    		 
    	    		 function getIntitalCertForDownloadIhm(auditTypeId,vesselImoNo,companyId){
    	      		   return certificateApi.getIntitalCertForDownloadIhm.query({auditTypeId:auditTypeId,vesselImoNo:vesselImoNo,companyId:companyId,method:'GET',catche:false},
    	      				function(res){
    	      			   		return res;
    	      		   		});
    	      	   }
    	    		 function getCertificateIHM(VESSEL_IMO_NO,auditSeqNo){
      	      		   return certificateApi.getCertificateIHM.query({VESSEL_IMO_NO:VESSEL_IMO_NO,auditSeqNo:auditSeqNo,method:'GET',catche:false},
      	      				function(res){
      	      			   		return res;
      	      		   		});
      	      	   }
    	    		 function getCompletedStatus(vesselImoNo,auditTypeId){
    	     		    return certificateApi.getCompletedStatus.query({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId, method:'get',catche:false,isArray: false},
    	     				function(res){
    	     			   		return res;
    	     		   		});		   
    	      	   };
    	    	   
			return certificateFactory;
		
    }
    
})();