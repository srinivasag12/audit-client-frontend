/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name config.route.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh, Tharani priya  DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/config/config.route.js $
**/

(function() {
	'use strict';

	angular.module('app.config').config(userconfigRouteConfig);

	function userconfigRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.config', {
			url : "/config",
			views : {
				'module@app' : {
					templateUrl : 'src/main/config/config.html',
					controller : 'ConfigAuditController as config'
				}
			},
			data : {
				pageTitle : 'user configuration',
				pageModule : 'config'
			},
			resolve : {

				auditorName : auditorName,

				screenData : screenData

			}
		});
	}
	function auditorName(auditFactory, $cookies) {
		return auditFactory.getAudDetails(sessionStorage.getItem("companyId")).$promise
				.then(function(res) {
					return res;
				});
	}
	function screenData(masterFactory, $cookies) {
		return masterFactory.getDefaultHomeScreen(sessionStorage.getItem("companyId")).$promise
				.then(function(res) {
					return res;
				});

	}
})();