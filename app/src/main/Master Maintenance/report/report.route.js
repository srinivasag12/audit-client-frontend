
(function() {
	'use strict';

	angular.module('app.master.report').config(reportRouteConfig);

	function reportRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.master.report', {
			url : "/report",

			views : {
				'masterContent@app.master' : {
					templateUrl : 'src/main/Master Maintenance/report/report.html',
					controller : 'masterReportController as report'
				}
			},
			data : {
				pageTitle : 'REPORT DETAILS',
				pageModule : 'MASTER'
			},resolve: {
		           
	        	 
				reportRequiredData : function($q,auditFactory,$cookies){
	             	 return $q.all([
	            	       
			               auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise,
			               
			               auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise,
			              	
			               ]).then(function(data){
			            	  
			             	   return data;
			            	   
			                });
	               }
	          }  

		});

	}

	
	

})();