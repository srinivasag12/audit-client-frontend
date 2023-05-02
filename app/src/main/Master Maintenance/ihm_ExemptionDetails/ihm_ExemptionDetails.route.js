
(function() {
	'use strict';

	angular.module('app.master.ihm_ExemptionDetails').config(ihm_ExemptionDetailsRouteConfig);

	function ihm_ExemptionDetailsRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.master.ihm_ExemptionDetails', {
			url : "/ihm_ExemptionDetails",

			views : {
				'masterContent@app.master' : {
					templateUrl : 'src/main/Master Maintenance/ihm_ExemptionDetails/ihm_ExemptionDetails.html',
					controller : 'ihm_ExemptionDetailsController as exempdet'
				}
			},
			data : {
				pageTitle : 'IHM_EXEMPTION DETAILS',
				pageModule : 'MASTER'
			},resolve: {
		           
	        	 
				/*reportRequiredData : function($q,auditFactory,$cookies){
	             	 return $q.all([
	            	       
			               auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise,
			               
			               auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise,
			              	
			               ]).then(function(data){
			            	  
			             	   return data;
			            	   
			                });
	               }*/
	          }  

		});

	}

	
	

})();