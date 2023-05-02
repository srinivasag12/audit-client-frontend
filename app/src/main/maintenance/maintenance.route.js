
(function ()
{
    'use strict';
   
    angular
        .module('maintenance')
        .config(maintenaceRouteConfig);
    
    
    function maintenaceRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	
    	//Default URL to be triggered
      //  $urlRouterProvider.when('/maintenance');
   
    	$stateProvider
        .state('maintenance', {
          url: "/maintenance",
         
          views    : {
        	'root@'                     : {
                  templateUrl: 'src/main/maintenance/maintenance.html',
                  controller : 'MaintenanceController as maintain'
              }
          },
          data: {pageTitle: 'Maintenance', pageModule: 'Maintenance'}
        });
    }   
     
    
   
 
    
    
})();