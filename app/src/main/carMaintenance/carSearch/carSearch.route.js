(function ()
{
	'use strict';
	
	angular
		.module('app.carMaintenance.carSearch')
		.config(carSearchRouteConfig);
	
	function carSearchRouteConfig($stateProvider, $urlRouterProvider, $locationProvider){
		
		$stateProvider
        .state('app.carMaintenance.carSearch', {
          url: "/search",
          params : {'currPageNo':null},
          
          views    : {
        	  'carContent@app.carMaintenance'                       : {
                  templateUrl: 'src/main/carMaintenance/carSearch/carSearch.html',
                  controller : 'CarSearchController as carsrch'
              }
          },
          data: {pageTitle: 'CAR SEARCH', pageModule: 'CAR MAINTENANCE'},
          resolve: {
             
              audittype : function(carMaintenanceFactory,$cookies){
            	 return carMaintenanceFactory.getAuditType(sessionStorage.getItem('companyId')).$promise.then(function(data){
            		 return data;
            	  });
              },
              
              vesselData : function(carMaintenanceFactory,$cookies){
            	  return carMaintenanceFactory.getVesselData(sessionStorage.getItem('companyId')).$promise.then(function(data){    
            		  return data;  	    		
            	  });
              },

              distinctAudStatus : function(carMaintenanceFactory,$cookies){
              	  return carMaintenanceFactory.getDistinctAudObsStatus(sessionStorage.getItem('companyId')).$promise.then(function(data){      			
              		  return data;  	    		
              	  });
              },
              
              auditSubTypes : function(carMaintenanceFactory,$cookies){
              	  return carMaintenanceFactory.getAudSubType(sessionStorage.getItem('companyId')).$promise.then(function(data){      			
              		  return data;  	    		
              	  });
              },
              
              allFingingStatus : function(carMaintenanceFactory,$cookies){
              	  return carMaintenanceFactory.getAllFingingStatus(sessionStorage.getItem('companyId')).$promise.then(function(data){      			
              		  return data;  	    		
              	  });
              },
              
              
              leadAuditorNames : function(detailsFactory,$cookies){
              	  return detailsFactory.getAudObsData(sessionStorage.getItem('companyId')).$promise.then(function(data){   
              		  console.log(data);
              		  return data;  	    		
              	  });
              },
              
              
              LatestCreatedAudit : function(auditFactory,$cookies){
              	  return  auditFactory.getLatestCreatedVesselCompanyImo(sessionStorage.getItem('emailId'),sessionStorage.getItem('companyId')).$promise.then(function(data){   
              		  console.log(data);
              		  return data;  	    		
              	  });
              },
            
              
          }
        });
		
	}
	
})();