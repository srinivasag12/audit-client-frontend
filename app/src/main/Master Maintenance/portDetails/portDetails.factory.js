(function() {
	'use strict';

	angular.module('app.master.portDetails').factory('portDetailsFactory',
			portDetailsFactory);

	function portDetailsFactory(portDetailsApi) {
		var portDetailsFactory = {
			savePort : savePort,
			getAllPort : getAllPort
		};

		return portDetailsFactory;
		
		/* Fetching values for Port Details from Port db */
		function getAllPort(companyId) {
			return portDetailsApi.getAllPort.query({
				companyId : companyId,
				method : 'GET',
				cache : false
			}, function(res) {
				return res;
			})
		};

		//saving and updating port details 
		function savePort(flag, data) {
			return portDetailsApi.savePort.save({
				flag : flag
			}, data, function(res) {
				return res;
			});
		};
	}
})();