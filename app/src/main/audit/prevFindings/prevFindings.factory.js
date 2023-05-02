(function (){
	
    'use strict';

    angular
    	.module('app.audit.prevfindings')
        
        .factory('prevFindingsFactory', prevFindingsFactory);
    

    function prevFindingsFactory(prevFindingsApi){    	   
    	
    	    var prevFindingsFactory = {
    	    		getPrevFindingDetails:getPrevFindingDetails,
    	    		createBlob:createBlob,
    	    		dmlcFinCloserEmail : dmlcFinCloserEmail
    	    };
    	    
    	    function getPrevFindingDetails(type,audDate,imoNo,seqNo,cId,companyImoNo,companyDoc){
     		   return prevFindingsApi.getPrevFindingDetails.put({auditTypeId:type,auditDate:audDate,vesselIMONo:imoNo,currentAuditSeqNo:seqNo,companyId:cId,companyImoNo:companyImoNo,companyDoc:companyDoc},
     				   	function(res){
     			   			return res;
     		   			});
     	   }
    	    
    	    function createBlob(auditSeqNo,companyId){
      		   return prevFindingsApi.createBlob.put({auditSeqNo:auditSeqNo,companyId:companyId,method:'POST',catche:true},
     				function(res){
     			   		return res;
     		   		});
      	   }
    	   
    	    function  dmlcFinCloserEmail(findingSeqNo,dmlcseqNo,mlcseqNo,companyId){
    	    	return prevFindingsApi.dmlcFinCloserEmail.put({findingSeqNo:findingSeqNo,dmlcseqNo:dmlcseqNo,mlcseqNo:mlcseqNo ,companyId:companyId,method:'POST',catche:true},
      				function(res){
      			   		return res;
      		   		});
       	   
    	    	
    	    }
    	    

			return prevFindingsFactory;
			   
    }
    
})();