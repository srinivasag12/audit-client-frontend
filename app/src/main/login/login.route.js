
(function ()
{
    'use strict';
   
    angular
        .module('login')
        .config(loginRouteConfig);
    
   
    function loginRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	
    	$locationProvider.html5Mode(true);
    	//Default URL to be triggered
        $urlRouterProvider.otherwise('/login');
   
    	$stateProvider
        .state('login', {
          url: "/login",
         
          views    : {
              'root@'                      : {
                  templateUrl: 'src/main/login/login.html',
                  controller : 'LoginController as login'
              }
          },
          data: {pageTitle: 'LOGIN', pageModule: 'Login'}
        });
    }   
    
    
})();