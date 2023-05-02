(function ()
{
	'use strict';
	
	angular
		.module('app.audit.findings')
		.config(findingsRouteConfig);
	
	function findingsRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
		
		$stateProvider
        .state('app.audit.findings', {
          url: "/findings",
          
          views    : {
        	  'auditContent@app.audit'                       : {
                  templateUrl: 'src/main/audit/findings/findings.html',
                  controller : 'FindingsController as cfind'
              }
          },
          data: {pageTitle: 'NEW FINDINGS', pageModule: 'AUDIT'},
          
          resolve:{
        	  
        	  masterData:getMasterData,
        	  auditorName:getAudObsData,
          }
         
        });
		
	}
	
	function getMasterData($window,auditService){

		return auditService.getMasterData($window.sessionStorage.getItem('auditTypeId')).then(function(res){
			return res;
  	  	});
	}
	
	function getAudObsData($cookies,detailsFactory){

		return detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise.then(function(res){
			return res;
  	  });
	}
	
})();