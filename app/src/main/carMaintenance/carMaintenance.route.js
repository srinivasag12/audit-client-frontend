(function ()
{
	'use strict';
	
	angular
		.module('app.carMaintenance')
		.config(carMaintenanceRouteConfig);
	
	function carMaintenanceRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
		
		$stateProvider
        .state('app.carMaintenance', {
          url: "/car",
          
          views    : {
        	  'module@app'                       : {
                  templateUrl: 'src/main/carMaintenance/carMaintenance.html',
                  controller : 'CarMaintenanceController as carmain'
              }
          },
          data: {pageTitle: 'Car Maintenance', pageModule: 'Main'}
        });
		
	}
	
})();