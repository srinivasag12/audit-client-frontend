(function() {
	'use strict';

	angular.module('app.master.auditCode').factory('auditCodeFactory',
			auditCodeFactory);

	function auditCodeFactory(auditCodeApi) {

		var auditCodeFactory = {

			getAuditType : getAuditType,
			checkAuditCode : checkAuditCode,
			saveAuditCodes : saveAuditCodes,
			pushCodes:pushCodes

		};

		return auditCodeFactory;

		/* Fetching values for auditType Dropdown from auditType db */
		function getAuditType(companyId) {
			return auditCodeApi.getAuditType.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;

		/* validation for unique auditCode */
		function checkAuditCode(companyId) {
			return auditCodeApi.checkAuditCode.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;
		
		
		/* validation for unique auditCode */
		function pushCodes(companyId,data) {
			return auditCodeApi.pushCodes.save({
				companyId : companyId,
				method : 'POST'
			},data, function(res) {
				return res;
			})
		}
		;

		/* saving and updating audit code details */
		function saveAuditCodes(flag, data) {
			return auditCodeApi.saveAuditCodes.save({
				flag : flag
			}, data, function(res) {
				return res;
			});
		}
		;

	}

})();