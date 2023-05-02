
(function ()
{
    'use strict';
   
    angular
        .module('app.dashboard')
        .config(dashboardRouteConfig);
    
   
    function dashboardRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	$locationProvider.html5Mode(true);
    	/*  
    	$urlRouterProvider.otherwise('/app/dashboard');*/
    	$stateProvider
        .state('app.dashboard', {
          url: "/dashboard",
          
          views    : {
        	  'module@app'                      : {
                  templateUrl: 'src/main/dashboard/dashboard.html',
                  controller : 'DashboardController as dboard'
              }
          },
          data: {pageTitle: 'Dashboard', pageModule: 'Main'},
          resolve: {
             
              userRole : function(masterFactory,$cookies){
            	  var email = {emailId:sessionStorage.getItem("emailId")};
            	  return masterFactory.getRoleUpdate(email,sessionStorage.getItem("companyId")).$promise.then(function(res){
            		  return res;
            	  });
              }
          
          }
        });
    }   
    
    
})();