(function() {
	'use strict';
	angular.module('app.master.report').factory('reportApi', reportApi);
	function reportApi($resource, BASE_URL) {

		var reportApi = {};
		
		
		
		reportApi.saveOrUpdateReportAttach = $resource(BASE_URL+'master/saveOrUpdateReportAttach',{
		
    	},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: true 
    		}
    	});
		
		
		
		reportApi.redisUpdateAttachmentReport = $resource(BASE_URL+'master/redisUpdateAttachmentReport/:companyId',{companyId:'@companyId'});
			

		return reportApi;
	}

})();