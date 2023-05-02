
(function ()
{
    'use strict';
   
    angular
        .module('app.certificate.search')
        .config(certificatesearchRouteConfig);
    
   
    function certificatesearchRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	
   
    	$stateProvider
        .state('app.certificate.search', {
          url: "/search",
          params : {'currPageNo':null,'logout':null},
         
          views    : {
              'certContent@app.certificate'                      : {
                  templateUrl: 'src/main/certificate/certSearch/certSearch.html',
                  controller : 'certificateSearchController as certSearch'
              }
          },
          data: {pageTitle: 'Certificate Search', pageModule: 'Certificate Generate'},
           resolve: {
           
           
               searchRequiredData : function($q,auditFactory,$cookies){
               return $q.all([
                              
                     auditFactory.getVesselData(sessionStorage.getItem('companyId')).$promise,

                   auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise,
                   
                   auditFactory.getVesselCompanyImo(sessionStorage.getItem('companyId')).$promise,
                   
                   auditFactory.getAuditCertificate(sessionStorage.getItem('companyId')).$promise,
                   
                   auditFactory.getAllAuditStatus(sessionStorage.getItem('companyId')).$promise,
                   
                   auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise,
                   
                   auditFactory.getAuditCertificate(sessionStorage.getItem('companyId')).$promise,
                   
                   auditFactory.getLatestCreatedVesselCompanyImo(sessionStorage.getItem('emailId'),sessionStorage.getItem("companyId")).$promise
                   
                    ]).then(function(data){
                    
                     return data;
                     
                    });
               }
          } 
        });
    }   
    
    
})();