(function() {
	'use strict';
	angular.module('app.master.portDetails').factory('portDetailsApi',
			portDetailsApi);
	function portDetailsApi($resource, BASE_URL) {

		var portDetailsApi = {};
		
		/* Fetching values for VesselType Dropdown from VesselType db */
		portDetailsApi.getAllPort = $resource('master/getMaPort/:companyId', {companyId : '@companyId'});
		
		
//		detailsApi.getAuditDetail = $resource(BASE_URL+'audit/ism/getAuditDetail/:auditTypeId/:auditSeqNo/:companyId',{
//    		auditTypeId:'@auditTypeId',    		
//    		auditSeqNo:'@auditSeqNo',
//    		companyId:'@companyId'
//    	});
	

		/* saving and updating port details */
		portDetailsApi.savePort = $resource(BASE_URL
				+ 'master/saveMaportData/:flag', {
			flag : '@flag'
		}, {
			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		return portDetailsApi;

	}

})();