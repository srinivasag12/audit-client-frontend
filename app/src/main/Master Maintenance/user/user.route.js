/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name user.route.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/user/user.route.js $
**/
(function() {
	'use strict';

	angular.module('app.master.user').config(userRouteConfig);

	function userRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.master.user', {
			url : "/user",

			views : {
				'masterContent@app.master' : {
					templateUrl : 'src/main/Master Maintenance/user/user.html',
					controller : 'UserController as user'
				}
			},
			data : {
				pageTitle : 'USER DETAILS',
				pageModule : 'MASTER'
			},
			resolve : {

				domainName : domainName,
				
				 emaile :  emaile 

			}

		});

	}

	
	function emaile(masterFactory,$cookies){
     	  return masterFactory.getEmail(sessionStorage.getItem("companyId")).$promise.then(function(data){ 
     		 return data;  	    		
     	  });
         }
	/*To populate the company domain name based on companyId"*/
	function domainName(masterFactory, $cookies) {
		return masterFactory.getDomainName(sessionStorage.getItem("companyId")).$promise
				.then(function(res) {
					return res;
				});
	}

})();