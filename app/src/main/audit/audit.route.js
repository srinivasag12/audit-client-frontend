
(function ()
{
    'use strict';
   
    angular
        .module('app.audit')
        .config(auditRouteConfig);
    
   
    function auditRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	$stateProvider
        .state('app.audit', {
          url: "/audit/{audittype}",
          
          views    : {
              'module@app'                      : {
                  templateUrl: 'src/main/audit/auditTemplate.html'
              }
          },
          data: {pageTitle: 'Audit', pageModule: 'Audit'},
          resolve: {
             
           }
        });
    }   
    
    
})();