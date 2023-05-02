
(function ()
{
    'use strict';
   
    angular
        .module('certificateViewer')
        .config(certificateViewerRouteConfig);
    
   
    function certificateViewerRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	$stateProvider
        .state('certificateViewer', {
          url: "/certificate/viewer/:companyId?Cqid=:qid",
         
          views    : {
              'root@'                      : {
                  templateUrl: 'src/main/certificateViewer/certificateViewer.html',
                  controller : 'certificateViewerController as certView'
              }
          },
          data: {pageTitle: 'Certificate Viewer', pageModule: 'Certificate Viewer'}
        });
    }   
    
    
})();