 (function (){
    'use strict'; 
    angular
    	.module('app.auditCycle')
    	.factory('auditCycleApi',auditCycleApi);
    function auditCycleApi($resource,BASE_URL){
     
     var auditCycleApi={};
    
     auditCycleApi.getAudObsDataMangers = $resource('typeAhead/getAudObsDataMangers/:companyId',{companyId:'@companyId'}); 
     
     
     
     auditCycleApi.createAuditCycle = $resource(BASE_URL+'auditCycle/createAuditCycle/:companyId',{companyId:'@companyId'},{
 		save : {
 			method :'POST',
 			cache  : false,
 			isArray: false 
 		}
 	});
     
     auditCycleApi.getAllCycleDate = $resource(BASE_URL+'auditCycle/getAllCycleDate/:auditTypeId/:vesselImoNo/:companyId',{
    	 auditTypeId:'@auditTypeId', 
    	 vesselImoNo:'@vesselImoNo',   		
 		companyId:'@companyId'
 	});
    	 auditCycleApi.getAuditCycleData = $resource(BASE_URL+'auditCycle/getAuditCycleData/:vesselImoNo/:auditTypeId/:companyId',{
    		 vesselImoNo:'@vesselImoNo',
    		 auditTypeId:'@auditTypeId',    		
     		companyId:'@companyId'
     	},{
     		query : {
     			method : 'GET',
     			cache  : false,
     			isArray: true
         	  }
     		});
    	 
    	 
    	
    	 auditCycleApi.getAuditCycleHistory = $resource(BASE_URL+'auditCycle/getAuditCycleHistory/:auditTypeId/:auditSubTypeId/:vesselIMONo/:companyId/:pageNo/:getDefaultSearchCount',{
     		vesselIMONo:'@vesselIMONo',
     		auditTypeId:'@auditTypeId',
     		auditSubTypeId:'@auditSubTypeId',
     		companyId:'@companyId',
     		pageNo:'@pageNo',
     		getDefaultSearchCount:'@getDefaultSearchCount'
     	},{
     		query : {
 			method : 'GET',
 			cache  : false,
 			isArray: true
     	  }
 		});
    	
    	 
    	
    	 auditCycleApi.getAuditCreditDate = $resource(BASE_URL+'auditCycle/getAuditCreditDate/:auditTypeId/:auditSubTypeId /:vesselImoNo/:companyId/:auditSeqNo/:iterator/:subIterator',{
    		 auditTypeId:'@auditTypeId',auditSubTypeId:'@auditSubTypeId',vesselImoNo:'@vesselImoNo',companyId:'@companyId'},
    		 {
    			 query : {
    		 			method : 'GET',
    		 			cache  : false,
    		 			isArray: true
    		     	  }
    	 		} 
    	 );
 
     return auditCycleApi;
    }
   })();