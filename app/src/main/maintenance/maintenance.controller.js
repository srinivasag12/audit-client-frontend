
(function (){
    'use strict';
   
    angular
        .module('maintenance')        
        .controller('MaintenanceController', MaintenanceController); 
    function MaintenanceController($state){
    	
    	var maintain=this;  
    	
    	maintain.goHome=function(){
    		$state.go('login',{},{ reload: true });
    	}
    
    }
    
     
    
})();