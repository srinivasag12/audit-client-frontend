
(function() {
	'use strict';

	angular.module('app.support').config(supportConfig);

	function supportConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.support', {
			url : "/support",
			views : {
				'module@app' : {
					templateUrl : 'src/main/support/support.html',
					controller : 'supportController as support'
				}
			},
			data : {
				pageTitle : 'File Upload',
				pageModule : 'File'
			},
			resolve : {

				userRole : userRole,
			
			searchRequiredData : function($q,auditFactory,$cookies,detailsFactory){
				return $q.all([

					auditFactory.getVesselData(sessionStorage.getItem('companyId')).$promise,

					auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise,

					auditFactory.getVesselCompanyImo(sessionStorage.getItem('companyId')).$promise,

					auditFactory.getAuditCertificate(sessionStorage.getItem('companyId')).$promise,

					auditFactory.getAllAuditStatus(sessionStorage.getItem('companyId')).$promise,

					auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise,

					detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise,
					
				

					auditFactory.getLatestCreatedVesselCompanyImo(sessionStorage.getItem('emailId'),sessionStorage.getItem("companyId")).$promise

					]).then(function(data){

						return data;

					});
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









    	
    	
  