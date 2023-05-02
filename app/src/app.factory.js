
(function ()
{
    'use strict';

    angular
        .module('central')
        .factory('settings', settings);
    
    /* Setup global settings */
    function settings($rootScope,auditApi,centralApi)
    {
    	 // supported languages
        var settings = {
        	layout: {
                pageSidebarClosed: false, // sidebar menu state
                pageContentWhite: true, // set page content layout
                pageBodySolid: false, // solid body color state
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            assetsPath: '../assets',
            globalPath: '../assets/global',
            layoutPath: '../assets/layouts/layout4',
            getInternetStatus: getInternetStatus, /* Added by Mohan to find internet connection availability*/
            getUserDetails:getUserDetails,
            checkRandomNumber : checkRandomNumber,
            updatePassword : updatePassword,
            VerificationCodeNotification : VerificationCodeNotification,
            updateLoginPassword:updateLoginPassword
         };
		
        
        function getUserDetails(data){
        	return auditApi.getUserDetails.get(data,function(res){return res});
        }
        
        /* Added by Mohan to find internet connection availability*/
        function getInternetStatus() {
        	return auditApi.getInternetStatus.get({method:'GET'},
     			function(res){
      			   		return res;
     		   }) 
        };
       
        function checkRandomNumber(flag) {
			return centralApi.checkRandomNumber.save({}, flag, function(res) {
				return res;
			});
		}
		;
		
		/** updating resetted password **/
			function updatePassword(data) {
			console.log(" update pwd " + JSON.stringify(data));
			return centralApi.updatePassword.save(data, function(res) {
				return res;
			});
		}
		;
		
		/** updating resetted password **/
			function updateLoginPassword(mail,pass) {                                             //changed by ramya for jira id-->IRI-5286
			return centralApi.updateLoginPassword.save({mail:mail,pass:pass}, function(res) {
				return res;
			});
		}
		;
		
		/*** Updating Verification code in db ***/
		function VerificationCodeNotification(emailId) {
			
			return centralApi.VerificationCodeNotification.save({
			}, emailId, function(res) {
				return res;
			});
		}
		;
       
        
        
        $rootScope.settings = settings;

        return settings;
    }
})();