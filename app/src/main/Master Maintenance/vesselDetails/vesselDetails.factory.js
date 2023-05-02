(function() {
	'use strict';

	angular.module('app.master.vesselDetails').factory('vesselDetailsFactory',
			vesselDetailsFactory);

	function vesselDetailsFactory(vesselDetailsApi) {

		var vesselDetailsFactory = {
			getVesselTypes : getVesselTypes,
			checkImoNo : checkImoNo,
			saveVesselType : saveVesselType

		};

		return vesselDetailsFactory;

		/* Fetching values for VesselType Dropdown from VesselType db */
		function getVesselTypes(companyId) {
			return vesselDetailsApi.getVesselTypes.query({
				companyId : companyId,
				method : 'GET',
				cache : false
			}, function(res) {
				return res;
			})
		}
		;

		/* validation for unique ImoNo */
		function checkImoNo(value, companyId) {
			return vesselDetailsApi.checkImoNo.get({
				vesselImoNo : value,
				companyId : companyId,
				method : 'GET',
				cache : false
			}, function(res) {
				return res;
			});
		}
		;

		/* saving and updating vessel details */
		function saveVesselType(flag, data) {
			return vesselDetailsApi.saveVesselType.save({
				flag : flag
			}, data, function(res) {
				return res;
			});
		}
		;

	}

})();