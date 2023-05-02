(function() {
	'use strict';

	angular.module('app.master.vesselCompanyDetails').factory(
			'vesselCompanyDetailsFactory', vesselCompanyDetailsFactory);

	function vesselCompanyDetailsFactory(vesselCompanyDetailsApi) {

		var vesselCompanyDetailsFactory = {
			checkCmpnyImoNo : checkCmpnyImoNo,
			saveVesselCompany : saveVesselCompany

		};

		/* validation for unique ImoNo */
		function checkCmpnyImoNo(value, companyId) {
			return vesselCompanyDetailsApi.checkCmpnyImoNo.get({
				companyImoNo : value,
				companyId : companyId,
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;

		/* saving and updating vesselCmpany details */
		function saveVesselCompany(flag, data) {
			return vesselCompanyDetailsApi.saveVesselCompany.save({
				flag : flag
			}, data, function(res) {
				return res;
			});
		}
		;

		return vesselCompanyDetailsFactory;

	}

})();