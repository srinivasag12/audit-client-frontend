
(function ()
{
    'use strict';

    angular
        .module('central')
        .controller('AppController', AppController)
        .controller('HeaderController',HeaderController )
        .controller('SidebarController',SidebarController )
        .controller('PageHeadController',PageHeadController )
        .controller('QuickSidebarController',QuickSidebarController )
        .controller('ThemePanelController',ThemePanelController )
        .controller('FooterController',FooterController )
        .controller('forgetPasswordController',forgetPasswordController)
        .controller('LoginPopupController',LoginPopupController)
        .controller('SessionPopupController',SessionPopupController)
         .controller('certificateViewWarning',certificateViewWarning);
    
    
    /* Application Controller */
    function AppController($rootScope,settings,$timeout,$scope,$window)
    {
        var vm = this;
		/* Added by Mohan to find internet connection availability
        $rootScope.isOnline;
         callFnOnInterval(function () {
         settings.getInternetStatus().$promise.then(function(data){
        		$rootScope.isOnline = data.isOnline;
       	  });
         });
 		 Added by Mohan to find internet connection availability
        var timeIntervalInSec = 1;
        function callFnOnInterval(fn, timeInterval) {
            var promise = $timeout(fn, 1000 * timeIntervalInSec);
           return promise.then(function(){
              callFnOnInterval(fn, timeInterval);
           });
       };*/
        $rootScope.$on('$viewContentLoaded', function() {
    		$timeout(function() {
    			
    				$rootScope.loaded = false;	
    				
    		         var w = angular.element($window).height();
    		           		           
    		           $rootScope.scrollOptions = {
    		           		'width': '300px',
    		           		'height': (w-140)+'px',
    		           		'color': '#659be0',
    		           		'allowPageScroll': true 
    		           		};
    		           
    				}, 1000);
    		
        });
     
        
       
        
 
        $rootScope.filterByAll = function(state, viewValue) {
    		var val = viewValue.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    		
    		if (viewValue == '*') {
    			
    			return state;
    			
    		}
    		
    		if (viewValue == '*' + val + '*') {
    			
    			var lowerStr = (state + "").toLowerCase();
    			
    			return lowerStr.search(val.toLowerCase()) >= 0;
    			
    		} else {
    			
    			var lowerStr = (state + "").toLowerCase();
    			
    			return lowerStr.indexOf(viewValue.toLowerCase()) === 0;
    			
    		}
    	}
        
        $rootScope.showExceptionAlert_backup = function(errMsg){} 	
 	   
    }
   

    
    /* Setup Layout Part - Header */
    function HeaderController($scope,$state)
    {
    	 Layout.initHeader(); // init header

    	 $scope.openLang = false;
    	 $scope.openProfile = false;
    	 
    }
    /* Setup Layout Part - Sidebar */
    function SidebarController($rootScope,$state)
    {
    	 
    	Layout.initSidebar($state);
    	
    }
    /* Setup Layout Part - Sidebar */
    function PageHeadController($scope)
    {
    	 $scope.$on('$includeContentLoaded', function() {        
             Demo.init(); // init theme panel
         });
    	
    }
    /* Setup Layout Part - Quick Sidebar */
    function QuickSidebarController($scope)
    {
    	 $scope.$on('$includeContentLoaded', function() {
             setTimeout(function(){
                  QuickSidebar.init(); // init quick sidebar        
              }, 2000)
          });
    	
    }
    /* Setup Layout Part - Theme Panel */
    function ThemePanelController($scope)
    {
    	 $scope.$on('$includeContentLoaded', function() {
             Demo.init(); // init theme panel
         });
    	
    }
    /* Setup Layout Part - Footer */
    function FooterController($scope)
    {
    	 $scope.$on('$includeContentLoaded', function() {
             Layout.initFooter(); // init footer
         });
    	
    }
    
    /*** Forget Password ***/
	function forgetPasswordController(scope, toaster, email, masterFactory,settings,
			ModalService, $scope, loginEmail, $state,oldPass) {
		var em = this;
		em.result = false;
		em.verfy = true;
		em.pass = "Password";
		em.oldPass=oldPass;
		em.showPassword ='';
		em.showConfirmPassword='';

		em.resend = function() {
			var emailJson = {
				emailId : email
			};
			//var num = Math.floor(Math.random() * 4520235);
			settings.VerificationCodeNotification(emailJson).$promise
					.then(function(res) {
						console.log(res);
					});
		}

		em.verify = function() {
			if (!em.ranNumber) {
				em.showSuccessMsg = false;
				em.showErrMsg = true;
				em.alerterrMsg = "Please Enter Verification Code sent to your mail ";
			} else {
				var data = {
					emailId : email
				};
				settings.checkRandomNumber(data).$promise
						.then(function(res) {
							console.log(res);
							if (res[0].verificationCode == em.ranNumber) {
								em.showErrMsg = false;
								em.showSuccessMsg = false;
								em.showSuccessMsg = true;
								em.alertsuccMsg = "Verification Code Checked Successfully ";
								if (em.alertsuccMsg) {
									em.result = true;
									em.verfy = false;
								}
							} else {
								em.showSuccessMsg = false;
								em.showErrMsg = true;
								em.alerterrMsg = "Invalid Verification Code ";
							}
						});
			}

		}
		em.alert = function() {
			em.showErrMsg = false;
			em.showSuccessMsg = false;			//added by ramya for jira id-->IRI-5285
		}

		em.reset = function() {
			if(em.newPas){
		var testSpeacilChar =false;// _.contains(em.newPas, '&');
			}
			if (em.newPas !== em.confNewPas) {
				em.showErrMsg = true;
				em.alerterrMsg = "Confirm New Password should be same as New Password";
				em.newPas = null;
				em.confNewPas = null;
			} else if (em.newPas == null || em.confNewPas == null) {
				em.showErrMsg = true;
				em.alerterrMsg = "Password Should not be empty";
			}else if(em.newPas == em.oldPass ){
				em.showErrMsg = true;
				em.alerterrMsg = "New password should not be same as old password";
				em.newPas = null;
				em.confNewPas = null;
			}else if(testSpeacilChar){
				em.showErrMsg = true;
				em.alerterrMsg = "Application Wont Support Special Character Password like &";
				em.newPas = null;
				em.confNewPas = null;
			}else{
				var pwd =  encodeURIComponent(em.newPas);
			settings.updateLoginPassword(loginEmail, pwd).$promise
					.then(function(res) {
						if (res.success == true) {
							em.newPas = null;
							em.confNewPas = null;
							em.showErrMsg = true;
							em.showErrMsg = false;
							em.showSuccessMsg = true;
							em.alertsuccMsg = "Password Updated Successfully";
							$('.modal').modal('hide');
							$('.modal-backdrop').remove();
							$state.go('login', {}, {
								reload : true
							});
						} else {
							em.showErrMsg = true;
							em.alerterrMsg = "Please Enter Valid EmailId";
						}
					});
		}
			em.alert = function() {
				em.showErrMsg = false;
			}
		}
		
		em.showPassword=function(){
     		var passwordInput = document.getElementById('newPas');
     		  var passStatus = document.getElementById('passStatus');
     		  
     		 if (passwordInput.type == 'password')
     		  {
     		    passwordInput.type='text';
     		    passStatus.className='fa fa-eye eye-position';
     		  }
     		  else
     		  {
     		    passwordInput.type='password';
     		    passStatus.className='fa fa-eye-slash eye-position';
     		  }
     	}
		
		em.showConfirmPassword=function(){
			
     		var passwordInput = document.getElementById('confNewPas');
     		  var passStatus = document.getElementById('passStatus1');
     		  
     		 if (passwordInput.type == 'password')
     		  {
     		    passwordInput.type='text';
     		    passStatus.className='fa fa-eye eye-position';
     		  }
     		  else
     		  {
     		    passwordInput.type='password';
     		    passStatus.className='fa fa-eye-slash eye-position';
     		  }
     	}
	}

	function LoginPopupController(scope, http, loginData, loginurl){

		var checkLogin = this;
		checkLogin.url = loginurl;
		checkLogin.emailId = loginData.uname;
		checkLogin.device = loginData.device;  //Added by sudharsan For Jira-Id IRI-5482 on 16-09-2022
		checkLogin.loginUserName = loginData.uname.substring(0, loginData.uname.indexOf("@"));

		checkLogin.removePop = function(result) {    	
			close(result, 0);
			$('.modal').modal('hide');
			$('.modal-backdrop').remove();
		};

		checkLogin.logoutAllDevice = function(){
			var req = {
					method: 'GET',
					url:checkLogin.url+"oauth/revoke/login?username="+checkLogin.emailId+"&device=Web",  //Added by sudharsan for JIRA-id IRI-5484,IRI-5485,IRI-5486
					headers: {	
						"Content-type": "application/x-www-form-urlencoded; charset=utf-8"
					}
			}
			http(req).then(function(uidResult){

				if(uidResult){
					$('.modal').remove();
					$('.modal-backdrop').remove();
					loginData.auth();
				}
			});
		}
	}
	
	function SessionPopupController(injector,aservice,checkUserlog,$http,BASE_URL_LOGIN,username){

		var sTimeout = this;
		sTimeout.auservice = aservice;
		sTimeout.inject = injector;		
		sTimeout.checkTimeout = checkUserlog;
		sTimeout.uname = username;

		sTimeout.sessiontime = function() {
			$('.modal').remove();
			$('.modal-backdrop').remove();
			sTimeout.auservice.clearAuthSession();
			sTimeout.inject.get("$state").go('login');
		};

		sTimeout.changeflag = function(){

			var req = {
				method: 'GET',
				url:BASE_URL_LOGIN+"redis/updateUserloginFlag?username="+sTimeout.uname,
				headers: {	
					"Content-type": "application/x-www-form-urlencoded; charset=utf-8"
				}
			}
			$http(req).then(function(res){
								
				if(res.data){		
				$('.modal').remove();
				$('.modal-backdrop').remove();
				sTimeout.auservice.clearAuthSession();
				sTimeout.inject.get("$state").go('login');
				}
			});

		}
	}
	function certificateViewWarning($scope,close,msg)
	{
		$scope.displayMsg=msg;
		
		$scope.close = function(result) {    		
    		close(result,0);
			$('.modal-backdrop').remove();
		};
	}

	
})();