(function ()
{
	'use strict';
	
	angular
		.module('app.audit.dmlcfindings')
		.config(dmlcFindingsRouteConfig);
	
	function dmlcFindingsRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
		
		$stateProvider
        .state('app.audit.dmlcfindings', {
          url: "/dmlc-findings",
          
          views    : {
        	  'auditContent@app.audit'                       : {
                  templateUrl: 'src/main/audit/dmlcFindings/dmlcFindings.html',
                  controller : 'DmlcFindingsController as dfind'
              }
          },
          data: {pageTitle: 'REVIEW  NOTES', pageModule: 'AUDIT'},
          
          resolve:{
        	  
        	  masterData:getMasterData,
        	  auditorName:getAudObsData,
          }
        });
		
	}
	
	function getMasterData($window,auditService){

		return auditService.getMasterData(1005).then(function(res){
			return res;
  	  	});
	}
	
	function getAudObsData($cookies,detailsFactory){

		return detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise.then(function(res){
			return res;
  	  });
	}
	
})();