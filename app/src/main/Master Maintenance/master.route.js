
(function ()
{
    'use strict';
   
    angular
        .module('app.master')
        .config(masterRouteConfig);
    
   
    function masterRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	
   
    	$stateProvider
        .state('app.master', {
          url: "/master",
          abstract:true,
          views    : {
              'module@app'  : {
                  templateUrl: 'src/main/Master Maintenance/masterTemplate.html'
              }
          },
          data: {pageTitle: 'User Details', pageModule: 'master'}
         
        
          
          
          
        
        });
    }   
    
    
})();