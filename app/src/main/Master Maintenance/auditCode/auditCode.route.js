/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name auditCode.route.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/auditCode/auditCode.route.js $
**/
(function() {
	'use strict';

	angular.module('app.master.auditCode').config(auditCodeRouteConfig);

	function auditCodeRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {
		$stateProvider
				.state(
						'app.master.auditCode',
						{
							url : "/audit-code",

							views : {
								'masterContent@app.master' : {
									templateUrl : 'src/main/Master Maintenance/auditCode/auditCode.html',
									controller : 'AuditCodeController as code'
								}
							},
							data : {
								pageTitle : 'AUDIT CODE',
								pageModule : 'MASTER'
							},
							resolve : {
								auditCodes : auditCodes
							}

						});

	}

	/* To populate Typeahead data in AuditCode screen for AuditCodes */
	function auditCodes(masterFactory, $cookies) {
		return masterFactory.getAuditCodes(sessionStorage.getItem("companyId")).$promise
				.then(function(data) {
					return data;
				});
	}

})();