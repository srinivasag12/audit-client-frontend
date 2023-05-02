 (function (){
    'use strict'; 
    angular
    	.module('certificateViewer')
    	.factory('viewerApi', viewerApi);
    function viewerApi($resource,BASE_URL_LOGIN){
		var viewerApi ={};

		
		viewerApi.certificateViewerDetails = $resource(BASE_URL_LOGIN+
				'redis/certificateViewerDetails/:companyId/?qid=:qid', {
					companyId : '@companyId',
					qid:'@qid'
				});
		
		viewerApi.getAuditCertificateData = $resource(BASE_URL_LOGIN+'redis/getAuditCertificateData/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	return viewerApi;	
     }
    
   })();