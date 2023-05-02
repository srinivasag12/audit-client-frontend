
(function() {
	'use strict';

	angular.module('app.support.supportSearch').config(supportConfig);

	function supportConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.support.supportSearch', {
			url : "/supportSearch",
			views : {
				'module@app' : {
					templateUrl : 'src/main/support/supportSearch/supportSearch.html',
					controller : 'supportSearchController as supSearch'
				}
			},
			data : {
				pageTitle : 'View Rmi Data',
				pageModule : 'File'
			},
			resolve : {

				userRole : userRole,
			
			searchRequiredData : function($q,$cookies){
				return 
			}

			}
		});
	}
	
	
	
	function userRole(masterFactory, $cookies) {
		var email = {
			emailId : sessionStorage.getItem("emailId")
		};
		return masterFactory.getRoleUpdate(email, sessionStorage.getItem("companyId")).$promise
				.then(function(res) {
					return res;
				});
	}	
		
	
})();









    	
    	
  