
(function ()
{
    'use strict';

    angular
        .module('central')
        .config(lazyLoadConfig)
        .config(controllerConfig)
        .config(appConfig)
        .config([ '$httpProvider', function($httpProvider) {
        	$httpProvider.interceptors.push('MyResourceInterceptor');
        }]);
      

  
    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    function lazyLoadConfig($ocLazyLoadProvider)
    {
    	$ocLazyLoadProvider.config({
    		'debug': false,
    		'events': false
           
        });    	
    }
  
    
    function controllerConfig($controllerProvider,$compileProvider)
    {
    	$compileProvider.debugInfoEnabled(false);
    	  $controllerProvider.allowGlobals();    	
    }
    
    function appConfig($httpProvider,localStorageServiceProvider, $compileProvider){
    	$httpProvider.interceptors.push(function ($q, $rootScope, $location,toaster,blockUI, $cookieStore) {
   	        return {
   	        	'responseError': function(rejection) {
 	        		var status = rejection.status;
   	        		var config = rejection.config;
   	        		//var method = config.method;
   	        		var url = config.url;
    	        		if (status == 401) {
   	        			$rootScope.errormsg = "Please Login To Continue...";   	        			
   	        		}       		
   	        		else if (status <= 0) {   	        		 
                 //    $rootScope.showExceptionAlert({errorType:"Server issue",message: "Something went wrong", url: url});	        			
   	        		} else if (status === 409) {   	        		 
                   //     $rootScope.showExceptionAlert({errorType:rejection.data.errorMessage,message: "data conflict error", url: url});	        			
      	        		}
   	        		else if (status === 400) {
   	        			var message = '';
   	        			 angular.forEach(rejection.data.errors,function(error){
   	        			 blockUI.stop();
   	        				message =' '+message+' '+error.defaultMessage;
     	        			});
 	   	        			toaster.warning(message);
       	        		}
   	        		/*else{
   	        			$rootScope.error = method + " on " + url + " failed with status " + status;
   	        		}*/
   	        		return $q.reject(rejection);
   	        		}
   	        	};
   	    	}
      	);

    }
  

})();