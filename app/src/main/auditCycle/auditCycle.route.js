(function ()
{
    'use strict';
   
    angular
        .module('app.auditCycle')
        .config(auditCycleRouteConfig);
    
   
    function auditCycleRouteConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
    	$stateProvider
        .state('app.auditCycle', {
          url: "/auditCycle",
          
          views    : {
              'module@app'                      : {
                  templateUrl: 'src/main/auditCycle/auditCycle.html',
                  controller : 'auditCycleController as cycle'
              }
          },
          data: {pageTitle: 'Audit Cycle', pageModule: 'Audit Cycle'},
           resolve: {
        	         
		        	  masterData:getMasterData,
		        	  getAudObsData:getAudObsData,
		        	  getAudObsDataMangers:getAudObsDataMangers,		        	  
		        	  getAuditType:getAuditType,
		        	  getAllAuditSubTypes:getAllAuditSubTypes
		        	  
		        	  
		        	
		        	  
		          }
        });
    }   
    
    
    function getMasterData($window,auditService){
    
		return auditService.getMasterData(1001).then(function(res){ console.log(res);
			return res;
  	  	});
	}
	
	function getAudObsData($cookies,detailsFactory){

		return detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise.then(function(res){ console.log(res);
			return res;
  	  });
	}
	
	function getAudObsDataMangers($cookies,auditCycleFactory){
	
		return auditCycleFactory.getAudObsDataMangers(sessionStorage.getItem('companyId')).$promise.then(function(res){
			console.log(res);
			return res;
  	  });
	}
	
	function getAuditType($cookies,auditFactory){

		return auditFactory.getAuditType(sessionStorage.getItem('companyId')).$promise.then(function(res){
			console.log(res);
			return res;
  	  });
	}
	
	function getAllAuditSubTypes($cookies,auditFactory){

		return auditFactory.getAllAuditSubTypes(sessionStorage.getItem('companyId')).$promise.then(function(res){
			console.log(res);
			return res;
  	  });
	}
	
	
    

    
    
})();


