(function ()
{
	'use strict';
	
	angular
		.module('app.carMaintenance.carDetails')
		.config(carDetailRouteConfig);
	
	function carDetailRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
		
		$stateProvider
        .state('app.carMaintenance.carDetails', {
          url: '/details',
          
          views    : {
        	  'carContent@app.carMaintenance'                       : {
                  templateUrl: 'src/main/carMaintenance/carDetails/carDetails.html',
                  controller : 'CarDetailsController as cardtl'
              }
          },
          data: {pageTitle: 'Car Details', pageModule: 'Main'}
        });
		
	}
	
})();