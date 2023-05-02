/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name vesselDetails.route.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/vesselDetails/vesselDetails.route.js $
**/

(function() {
	'use strict';

	angular.module('app.master.vesselDetails').config(
			vesselStatementRouteConfig);

	function vesselStatementRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider
				.state(
						'app.master.vesselDetails',
						{
							url : "/vessel-details",

							views : {
								'masterContent@app.master' : {
									templateUrl : 'src/main/Master Maintenance/vesselDetails/vesselDetails.html',
									controller : 'VesselDetailsController as vesdet'
								}
							},
							data : {
								pageTitle : 'VESSEL DETAILS',
								pageModule : 'MASTER'
							},
							resolve : {

								cmpnyImoNo : cmpnyImoNo,

								vslImoNo : vslImoNo
							}
						});

	}

	/* Fetch typeahead data for CompanyImoNumber */
	function cmpnyImoNo(masterFactory, $cookies) {
		return masterFactory.getCompanyImoNo(sessionStorage.getItem("companyId")).$promise
				.then(function(data) {
					return data;
				});
	}

	/* Fetch typeahead data for VesselImoNumber */
	function vslImoNo(masterFactory, $cookies) {
		return masterFactory.getImoNo(sessionStorage.getItem("companyId")).$promise
				.then(function(data) {
					return data;
				});
	}

})();