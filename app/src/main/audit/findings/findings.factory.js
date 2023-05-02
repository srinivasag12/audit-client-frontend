(function (){
	
    'use strict';

    angular
    	.module('app.audit.findings')
        
        .factory('findingsFactory', findingsFactory);
    

    function findingsFactory(findingsApi){    	   
    	
    	    var findingsFactory = {
    	    		
    	    		getFindingData:getFindingData,
    	    		createOrgBlob:createOrgBlob
    	    		    	  
    	    };
    	    
    	    function getFindingData(auditTypeId,currentAuditSeqNo,companyId){
    	    	return findingsApi.getFindingData.get({auditTypeId:auditTypeId,currentAuditSeqNo:currentAuditSeqNo,companyId:companyId},function(res){return res;});
    	    }
    	    
    	    function createOrgBlob(orgAuditseq,auditTypeId,companyId){
        		   return findingsApi.createOrgBlob.put({orgAuditseq:orgAuditseq,auditTypeId:auditTypeId,companyId:companyId,method:'POST',catche:true},
       				function(res){
       			   		return res;
       		   		});
        	   }
    	    
			return findingsFactory;
			   
    }
    
})();