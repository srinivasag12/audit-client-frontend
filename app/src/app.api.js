 (function (){
    'use strict'; 
    angular
    	.module('central')
    	.factory('centralApi',centralApi);
    function centralApi($resource,BASE_URL,BASE_URL_LOGIN){
     
     var centralApi={};
    
     centralApi.getUserDetails = $resource('/master/UserDetails:userId/:domain' , {
    	username : '@userId',
    	password : '@domain'
 	});
     
     centralApi.checkRandomNumber = $resource(BASE_URL_LOGIN
				+ 'redis/checkRandomNumber', {

		}, {
			save : {
				method : 'POST',
				isArray : true
			}
		});
     
     
     /** updating resetted password **/
     centralApi.updatePassword = $resource(BASE_URL
				+ 'master/updatePassword/:mail/:pass', {}, {
			save : {
				method : 'POST',
				isArray : false
			}

		});
     
     /** updating resetted password **/
     centralApi.updateLoginPassword = $resource(BASE_URL_LOGIN
				+ 'redis/updateLoginPassword/:mail/:pass', {
					mail:'@mail',
					pass:'@pass'
				}, {
			save : {
				method : 'POST',
				isArray : false
			}

		});
    
     /*** Updating Verification code in db ***/
      centralApi.VerificationCodeNotification = $resource(BASE_URL_LOGIN
				+ 'redis/verificationCodeNotification', {
		
		}, {
			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});
    
    return centralApi;
    }
   })();