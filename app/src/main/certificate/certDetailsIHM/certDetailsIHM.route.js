
(function ()
{
    'use strict';
   
    angular
        .module('app.certificate.detailsihm')
        .config(certificateDetailsIhmRouteConfig);
    
   
    function certificateDetailsIhmRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	
   
    	$stateProvider
        .state('app.certificate.detailsihm', {
          url: "/details_ihm",
          params : {'certificate':null,'logout':null},
         
          views    : {
              'certContent@app.certificate'                      : {
                  templateUrl: 'src/main/certificate/certDetailsIHM/certDetailsIHM.html',
                  controller : 'CertificateDetailsControllerIhm as certDetails'
              }
          },
          data: {pageTitle: 'SOC Details', pageModule: 'Certificate Generate'},
         
          resolve: {
              
         	 certDtlRequiredData : function($q,auditFactory,$cookies,certificateFactory,detailsFactory,auditService){
         		 console.log(sessionStorage.getItem('companyId'));
            	 return $q.all([
           	                
            	       auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise,
		               
		               auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise,
		               
		               certificateFactory.getCertificateIssueReason(sessionStorage.getItem('companyId')).$promise,
		               
		               detailsFactory.getVesselTypeData(sessionStorage.getItem('companyId')).$promise,
		               
		               detailsFactory.getMaPort(sessionStorage.getItem('companyId')).$promise,
		               
		               detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise,
		               
		               certificateFactory.getCertificateReissueReason(sessionStorage.getItem('companyId')).$promise,
		               
		               certificateFactory.getCurrentUserFullName(sessionStorage.getItem('emailId'),sessionStorage.getItem('companyId')).$promise,
		               
		               detailsFactory.getVesselData(sessionStorage.getItem('companyId')).$promise,
		               
		               auditFactory.getMaVesselYatchData(sessionStorage.getItem('companyId')).$promise,
		               
		               certificateFactory.getEcGrantedReason().$promise
		               
		                ]).then(function(data){ console.log(data);
		            	  
		             	   return {'auditTypes':data[0],'auditSubTypes':data[1],'certificateIssueReasons':data[2], 'vesselTypeData':data[3],'maPort':data[4],'getAudObsData':data[5],'ReissueReason':data[6], 'getCurrentUserFullName':data[7],'vesselData' : data[8],'getMaVesselYatchData':data[9] ,'getEcGrantedReason' :data[10] };
		            	   
		                });
            	 
            	 
            	 
            	 
              }
          
         
         }  
        });
    }   
    
    
})();