
(function ()
{
    'use strict';
   
    angular
        .module('app.audit.search')
        .config(searchRouteConfig);
    
   
    function searchRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    $stateProvider
        .state('app.audit.search', {
          url: "/search",
          params : {'currPageNo':null,'logout':null},
         
          views    : {
        	  'auditContent@app.audit'                    : {
                  templateUrl: 'src/main/audit/search/search.html',
                  controller : 'SearchController as search'
              }
          },
          data: {pageTitle: sessionStorage.userRoleId == 1006? 'REVIEW SEARCH' : 'AUDIT SEARCH', pageModule: 'AUDIT SEARCH'},
          resolve: {
           
        	 
               searchRequiredData : function($q,auditFactory,$cookies,detailsFactory){
             	 return $q.all([
            	                
             	       auditFactory.getVesselData(sessionStorage.getItem('companyId')).$promise,

		               auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise,
		               
		               auditFactory.getVesselCompanyImo(sessionStorage.getItem('companyId')).$promise,
		               
		               auditFactory.getAuditCertificate(sessionStorage.getItem('companyId')).$promise,
		               
		               auditFactory.getAllAuditStatus(sessionStorage.getItem('companyId')).$promise,
		               
		               auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise,
		               
		               detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise,
		               
		               auditFactory.getLatestCreatedVesselCompanyImo(sessionStorage.getItem('emailId'),sessionStorage.getItem("companyId")).$promise
             	  			
		               ]).then(function(data){
		            	  
		             	   return data;
		            	   
		                });
               }
          }  
        });
    }   
    
    
})();