 (function (){
    'use strict'; 
    angular
    	.module('app.audit.prevfindings')
    	
    	.factory('prevFindingsApi', prevFindingsApi);
    
    function prevFindingsApi($resource,BASE_URL){
    	
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
		
		
		prevFindingsApi.dmlcFinCloserEmail = $resource(BASE_URL+'audit/ism/dmlcFinCloserEmail/:findingSeqNo/:dmlcseqNo/:mlcseqNo/:companyId',{findingSeqNo:'@findingSeqNo',dmlcseqNo:'@dmlcseqNo',mlcseqNo:'@mlcseqNo',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
		
		
		
		
		return prevFindingsApi;	
     }
    
   })();