/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name vesselCompanyDetails.route.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/vesselCompanyDetails/vesselCompanyDetails.route.js $
**/
(function() {
	'use strict';

	angular.module('app.master.vesselCompanyDetails').config(
			vesselCompanyDetailsRouteConfig);

	function vesselCompanyDetailsRouteConfig($stateProvider,
			$urlRouterProvider, $locationProvider) {

		$stateProvider
				.state(
						'app.master.vesselCompanyDetails',
						{
							url : "/vessel-companydetails",

							views : {
								'masterContent@app.master' : {
									templateUrl : 'src/main/Master Maintenance/vesselCompanyDetails/vesselCompanyDetails.html',
									controller : 'VesselCompanyDetailsController as vcdetail'
								}
							},
							data : {
								pageTitle : 'VESSEL COMPANY DETAILS',
								pageModule : 'MASTER'
							},
							resolve : {
								vesselDetails : vesselDetails
							}
						});

	}
	/* Typeahead to display vesselCompanyImoNumber */
	function vesselDetails(masterFactory, $cookies) {
		return masterFactory.getCmpnyDet(sessionStorage.getItem("companyId")).$promise
				.then(function(data) {
					console.log(data);
					return data;
				});
	}

})();