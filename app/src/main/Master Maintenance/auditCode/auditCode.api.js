(function() {
	'use strict';
	angular.module('app.master.auditCode')
			.factory('auditCodeApi', auditCodeApi);
	function auditCodeApi($resource, BASE_URL) {

		var auditCodeApi = {};

		/* Fetching values for auditType Dropdown from auditType db */
		auditCodeApi.getAuditType = $resource(
				'master/getAuditTypes/:companyId', {
					companyId : '@companyId'
				});

		/* validation for unique auditCode */
		auditCodeApi.checkAuditCode = $resource(
				'master/getAuditCodes/:companyId', {
					companyId : '@companyId'
				});
		
		
		
		/* validation for unique auditCode */
		auditCodeApi.pushCodes = $resource(
				'master/pushCodes/:companyId',{},{
					companyId : '@companyId'
				});

		/* saving and updating audit code details */
		auditCodeApi.saveAuditCodes = $resource(BASE_URL
				+ 'master/saveAuditCodes/:flag', {
			flag : '@flag'
		}, {

			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		return auditCodeApi;

	}

})();