(function ()
{
	'use strict';
	
	angular
		.module('app.audit.detailsIhm')
		.config(detailsRouteConfigIhm);
	
	function detailsRouteConfigIhm($stateProvider, $urlRouterProvider, $locationProvider){
		 
        $stateProvider
        .state('app.audit.detailsIhm', {
          url: "/detailsIhm",
          params : {'openForCar':null, 'page':null},
          
          views    : {
        	  'auditContent@app.audit'                       : {
                  templateUrl: 'src/main/audit/detailsIhm/detailsIhm.html',
                  controller : 'DetailsControllerIhm as det'
              }
          },
          data: {pageTitle: 'AUDIT', pageModule: 'AUDIT'},
          resolve: {

        	  masterData:getMasterData,
        	  auditorName:getAudObsData,
        	  getEcGrantedReason:getEcGrantedReason
        	  //masterData : getMasterData(),
        	  //auditorName :getAudObsData(),
          }
        });
	}

	function getMasterData($window,auditService){
		
console.log($window.sessionStorage.getItem('auditTypeId'));
		return auditService.getMasterData($window.sessionStorage.getItem('auditTypeId')).then(function(res){
			return res;
  	  	});
	}
	
	function getAudObsData($cookies,detailsFactory){

		return detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise.then(function(res){
			return res;
  	  });
	}
	function getEcGrantedReason(certificateFactory){

		return certificateFactory.getEcGrantedReason().$promise.then(function(res){
			return res;
  	  });
	}
	
})();