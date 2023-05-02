
(function ()
{
    'use strict';
   
    angular
        .module('app.certificate')
        .config(certificateRouteConfig);
    
   
    function certificateRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	
   
    	$stateProvider
        .state('app.certificate', {
          url: "/certificate",
         
          views    : {
              'module@app'                      : {
                  templateUrl: 'src/main/certificate/certificate.html',
                  controller : 'CertificateController as cert'
              }
          },
          data: {pageTitle: 'Certificate Generate', pageModule: 'Certificate Generate'}
        });
    }   
    
    
})();