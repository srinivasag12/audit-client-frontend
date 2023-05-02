(function ()
{
	'use strict';
	
	angular
		.module('app.audit.details')
		.config(detailsRouteConfig);
	
	function detailsRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
        
        $stateProvider
        .state('app.audit.details', {
          url: "/details",
          params : {'openForCar':null, 'page':null},
          
          views    : {
        	  'auditContent@app.audit'                       : {
                  templateUrl: 'src/main/audit/details/details.html',
                  controller : 'DetailsController as det'
              }
          },
          data: {pageTitle: 'AUDIT', pageModule: 'AUDIT'},
          resolve: {

        	  masterData:getMasterData,
        	  auditorName:getAudObsData,
        	  //masterData : getMasterData(),
        	  //auditorName :getAudObsData(),
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