 (function (){
    'use strict'; 
    angular
    	.module('app.audit.dmlcfindings')
    	
    	.factory('dmlcFindingsApi', dmlcFindingsApi);
    
    function dmlcFindingsApi($resource,BASE_URL){
    	
		var prevFindingsApi ={};

		prevFindingsApi.getPrevFindingDetails = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:auditDate/:vesselIMONo/:currentAuditSeqNo/:companyId/:companyImoNo/:companyDoc',{
    		auditTypeId:'@auditTypeId',
    		auditDate:'@auditDate',
    		vesselIMONo:'@vesselIMONo',
    		currentAuditSeqNo:'@currentAuditSeqNo',
    		companyId:'@companyId',
    		companyImoNo:'@companyImoNo',
    		companyDoc:'@companyDoc'
    	},{
    		put : {
    			method : 'GET',
    			isArray : true
    		}
    	});

		
		prevFindingsApi.createBlob = $resource(BASE_URL+'audit/ism/createBlob/:auditSeqNo/:companyId',{auditSeqNo:'@auditSeqNo',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
		
		
		
		return prevFindingsApi;	
     }
    
   })();