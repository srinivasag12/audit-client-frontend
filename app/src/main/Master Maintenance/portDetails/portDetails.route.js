(function() {
	'use strict';

	angular.module('app.master.portDetails').config(portDetailsRouteConfig);

	function portDetailsRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {
		$stateProvider
				.state(
						'app.master.portDetails',
						{
							url : "/port-details",

							views : {
								'masterContent@app.master' : {
									templateUrl : 'src/main/Master Maintenance/portDetails/portDetails.html',
									controller : 'PortDetailsController as portDet'
								}
							},
							data : {
								pageTitle : 'PORT DETAILS',
								pageModule : 'MASTER'
							},
							resolve : {
								portValues :portValues
							}

						});

	}
	/* Typeahead to display portdetails */
	function portValues(masterFactory, $cookies) {
		return masterFactory.getPortId(sessionStorage.getItem("companyId")).$promise
				.then(function(data) {
					
					return data;
				});
	}
	

})();