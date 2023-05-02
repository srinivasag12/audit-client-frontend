(function() {
	'use strict';
	angular.module('app.master.vesselCompanyDetails').factory(
			'vesselCompanyDetailsApi', vesselCompanyDetailsApi);
	function vesselCompanyDetailsApi($resource, BASE_URL) {

		var vesselCompanyDetailsApi = {};

		/* validation for unique ImoNo */
		vesselCompanyDetailsApi.checkCmpnyImoNo = $resource(
				'master/checkCmpnyImoNo/:companyImoNo/:companyId', {
					companyImoNo : '@companyImoNo',
					companyId : '@companyId'
				});

		/* saving and updating vessel company details */
		vesselCompanyDetailsApi.saveVesselCompany = $resource(BASE_URL
				+ 'master/saveVesselCompany/:flag', {
			flag : '@flag'
		}, {
			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		return vesselCompanyDetailsApi;
	}

})();