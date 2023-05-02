
(function() {
	'use strict';

	angular.module('app.userSearch').config(userSearchRouteConfig);

	function userSearchRouteConfig($stateProvider, $urlRouterProvider,
			$locationProvider) {

		$stateProvider.state('app.userSearch', {
			url : "/userSearch",
			views : {
				'module@app' : {
					templateUrl : 'src/main/userSearch/userSearch.html',
					controller : 'UserSearchController as userSearch'
				}
			},
			data : {
				pageTitle : 'user search',
				pageModule : 'search'
			},
			resolve : {

		           
	        	 
	               searchRequiredData : function($q,auditFactory,$cookies,detailsFactory){
	             	 return $q.all([
	            	                
	             	     
			               
			               detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise
			               
			               ]).then(function(data){
				            	  
			             	   return data;
			            	   
			                });
			               
			            
	               }
	          
				
			}
		});
	}
	
	
})();









    	
    	
  