/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name vesselStatement.route.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/vesselStatement/vesselStatement.route.js $
**/
(function() {
	'use strict';

	angular.module('app.vesselStatement').config(vesselStatementRouteConfig);

	function vesselStatementRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider
				.state(
						'app.vesselStatement',
						{
							url : "/vessel-statement",

							views : {
								'module@app' : {
									templateUrl : 'src/main/vesselStatement/vesselStatement.html',
									controller : 'VesselStatementController as stat'
								}
							},
							data : {
								pageTitle : 'VESSEL / STATUS STATEMENT',
								pageModule : 'VESSEL STATUS'
							},
							resolve : {

								imonum : imonum

							}
						});

	}
	function imonum(vesselStatementFactory, $cookies) {
		return vesselStatementFactory.getVesselImono(sessionStorage.getItem('companyId')).$promise
				.then(function(res) {
					console.log(res);
					angular.forEach(res, function(key, value) {
						if (sessionStorage.getItem("ImoNum") == res[value].vesselImoNo) {
							sessionStorage.setItem("VeslNme", res[value].vesselName );
						}
					});

					return res;
				});
	}

})();