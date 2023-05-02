
(function ()
{
    'use strict';

    angular
        .module('central')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	$locationProvider.html5Mode(true);
        $stateProvider  	
        //Common Template Page for all modules
    	.state('app', {
          url: "/app",
          abstract: true,
          views    : {
              'root@'                      : {
                  templateUrl: 'src/template/template.html',
                  controller : 'TemplateController as tm'
              }
          },
          resolve: {
             allFindingCategory : function(masterFactory,$cookies){
            	  return masterFactory.getAllFindingCategory(sessionStorage.getItem('companyId')).$promise.then(function(res){
            		  return res;
            	  });
              
              }

          }
          
        })       
    }

})();