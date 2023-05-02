(function (){
	
    'use strict';

    angular
    	.module('app.auditCycle')
        
        .factory('auditCycleFactory', auditCycleFactory);
    

    function auditCycleFactory(auditCycleApi){    	   
    	
    	    var auditCycleFactory = {
    	    		
    	    		getAudObsDataMangers:getAudObsDataMangers,
    	    		createAuditCycle:createAuditCycle,
    	    		getAuditCycleData:getAuditCycleData,
    	    		getAuditCycleHistory:getAuditCycleHistory,
    	    		getAuditCreditDate:getAuditCreditDate,
    	    		getAllCycleDate:getAllCycleDate
    	    };
    	    
    	    return auditCycleFactory;
    	    /***** to get the Mangers Details*****/
			function getAudObsDataMangers(companyId){ 
	    		 return auditCycleApi.getAudObsDataMangers.query({companyId:companyId,method:'GET',catche:true},
	    				  function(res){
	    			   		return res;
	    		   		  });
	    	}
			
			
			function createAuditCycle(auditcycledata,companyId){ console.log(auditcycledata);
	    		 return auditCycleApi.createAuditCycle.save({companyId:companyId},auditcycledata,
	    				  function(res){
	    			   		return res;
	    		   		  });
	    	};
	    	
	    	function getAuditCycleData(vesselImoNo,auditTypeId,companyId){ 
	    		console.log(vesselImoNo); console.log(auditTypeId); console.log(companyId);
   		      return auditCycleApi.getAuditCycleData.query({vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,companyId:companyId, method:'GET',catche:true,isArray:false},
	    				   	function(res){ console.log(res);
	    			   			return res;
	    		   			});
	    	   }
	    	
	    	function getAuditCycleHistory(auditTypeId,auditSubTypeId,imoNo,cId,pageNo,getDefaultSearchCount){
	    		   return auditCycleApi.getAuditCycleHistory.query({vesselIMONo:imoNo,auditTypeId:auditTypeId,auditSubTypeId:auditSubTypeId,companyId:cId,pageNo:pageNo,getDefaultSearchCount:getDefaultSearchCount,method:'GET',catche:true,isArray:false},
	    				   	function(res){console.log(res)
	    			   			return res;
	    		   			});
	    	 }
	    	
	    	
	    	
	    	 function getAuditCreditDate(auditTypeId,vesselImoNo,companyId,auditSeqNo ,auditSubTypeId){
	    		
	    		  return auditCycleApi.getAuditCreditDate.get({auditTypeId:auditTypeId,auditSubTypeId:auditSubTypeId,vesselImoNo:vesselImoNo,companyId:companyId,auditSeqNo:auditSeqNo,method:'GET',catche:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
	    	
 			
	    	
    	    
	    	 function getAllCycleDate(auditTypeId,vesselImoNo,companyId){
		    		
	    		  return auditCycleApi.getAllCycleDate.query({auditTypeId:auditTypeId,vesselImoNo:vesselImoNo,companyId:companyId,method:'GET',catche:true,isArray:true},
	      				function(res){
	      			   		return res;
	      		   		});
	      	 }
    		
    		
    }
    
})();