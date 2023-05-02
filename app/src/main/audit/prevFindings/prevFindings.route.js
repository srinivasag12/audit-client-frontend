(function ()
{
	'use strict';
	
	angular
		.module('app.audit.prevfindings')
		.config(prevFindingsRouteConfig);
	
	function prevFindingsRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
		
		$stateProvider
        .state('app.audit.prevfindings', {
          url: "/previous-findings",
          
          views    : {
        	  'auditContent@app.audit'                       : {
                  templateUrl: 'src/main/audit/prevFindings/prevFindings.html',
                  controller : 'PrevFindingsController as pfind'
              }
          },
          data: {pageTitle: 'PREVIOUS  FINDINGS', pageModule: 'AUDIT'},
          
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