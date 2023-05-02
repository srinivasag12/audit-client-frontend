 (function (){
    'use strict'; 
    angular
    	.module('app.audit.findings')
    	
    	.factory('findingsApi', findingsApi);
    
    function findingsApi($resource,BASE_URL){
    	
		var findingsApi ={};

		findingsApi.getFindingData = $resource(BASE_URL+'audit/ism/currentFinding/:auditTypeId/:currentAuditSeqNo/:companyId',{
			auditTypeId 		: '@auditTypeId',
			currentAuditSeqNo	: '@currentAuditSeqNo',
			companyId 			: '@companyId'
		},{
			get : {
				cache	: false,
				method 	: 'GET',
				isArray : true
			}
		})
		
		findingsApi.createOrgBlob = $resource(BASE_URL+'audit/ism/createOrgBlob/:orgAuditseq/:auditTypeId/:companyId',{orgAuditseq:'@orgAuditseq',auditTypeId:'@auditTypeId',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});

		return findingsApi;	
     }
    
   })();