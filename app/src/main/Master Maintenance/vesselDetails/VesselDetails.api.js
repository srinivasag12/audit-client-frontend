(function() {
	'use strict';
	angular.module('app.master.vesselDetails').factory('vesselDetailsApi',
			vesselDetailsApi);
	function vesselDetailsApi($resource, BASE_URL) {

		var vesselDetailsApi = {};

		/* Fetching values for VesselType Dropdown from VesselType db */
		vesselDetailsApi.getVesselTypes = $resource(
				'master/getVesselTypes/:companyId', {
					companyId : '@companyId'
				});

		/* validation for unique ImoNo */
		vesselDetailsApi.checkImoNo = $resource(
				'master/checkImoNo/:vesselImoNo/:companyId', {
					vesselImoNo : '@vesselImoNo',
					companyId : '@companyId'
				});

		/* saving and updating vessel details */
		vesselDetailsApi.saveVesselType = $resource(BASE_URL
				+ 'master/saveVesselDatas/:flag', {
			flag : '@flag'
		}, {
			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		return vesselDetailsApi;

	}

})();