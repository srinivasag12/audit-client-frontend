
(function (){
    'use strict';
   
    angular
        .module('login')        
        .controller('LoginController', LoginController); 
    
    function LoginController(ModalService,$state,$httpParamSerializer,$rootScope,settings,$cookieStore,$http,BASE_URL_LOGIN,$cookies,$scope,masterFactory,toaster,auditService, websocketService){
    	
    	var login=this;  
    	
    	login.errorMsg = '';
    	
    	login.forgeterrMsg='';
    	
    	login.focus = false;
    	
     	login.showErrMsg = false;
     	
     	login.loginForm = true;
     	
     	login.forgetForm = false;
     	
     	sessionStorage.setItem("usrR2", "res");
     	
     	login.pass = "Password";
		
     	
     	login.showPassword=function(){
     		var passwordInput = document.getElementById('passInput');
     		  var passStatus = document.getElementById('passStatus');
     		  
     		 if (passwordInput.type == 'password')
     		  {
     		    passwordInput.type='text';
     		    passStatus.className='fa fa-eye eye-position';		//changed by @Ramya for Jira id - IRI-5718
     		  }
     		  else
     		  {
     		    passwordInput.type='password';
     		    passStatus.className='fa fa-eye-slash eye-position';		//changed by @Ramya for Jira id - IRI-5718
     		  }
     	}



		     		/** * Forget Password ** */
		login.reset = function() {
			
			login.email = (login.email).toLowerCase();
			
			var loginEmail = login.email;
			var data = {
				emailId : login.email
			};
			if (!login.email) {
				toaster.warning('please Enter Valid EmailId');
			} else {
				settings.VerificationCodeNotification(data).$promise.then(function(res) {
						
					if (res.success.result == true && res.success && res.success.oldValue && res.success.oldValue[0][0]==1) { console.log(res);
						toaster.success('Please Enter the verification code which you have received in your Email id');
						ModalService.showModal({
							templateUrl : 'src/modals/forgetPassword.html',
							controller : "forgetPasswordController as em",
							inputs : {
								scope : $scope,
								email : login.email,
								loginEmail : loginEmail,
								oldPass:res.success.oldValue[0][1]
							}
						}).then(function(modal) {
							modal.element.modal();
							modal.close.then(function(result) {
							});
						});
					}else if(res.success && res.success.oldValue && res.success.oldValue[0] &&  res.success.oldValue[0][0]==0){
						login.showErrMsg = true;
						login.forgeterrMsg = "Current User is Inactive";
					}else if(res && res.success && res.success.oldValue==null){
						login.showErrMsg = true;
						login.forgeterrMsg = "Please Enter Correct User Email Id";
					}
					else {
						login.showErrMsg = true;
						login.forgeterrMsg = "Check EmailId";
					}
				});
			}
		}
    	
     	
     	$scope.images =[
    	        '/assets/global/img/11.jpg',
    	        '/assets/global/img/12.jpg',
    	        '/assets/global/img/14.jpg',
    	        '/assets/global/img/16.jpg',
    	        '/assets/global/img/15.jpg'
    	]; 
     	
     	
     login.checkUserPresent = function(){
    	 
    	 masterFactory.checkInternet().$promise.then(function(res){
 			
 			if(res.data=="CONNECTED"){

				var un = (login.uname).toLowerCase();
	            var pd =     encodeURIComponent( login.pwd);
				var req = {
	                    method: 'GET',
	                    url:BASE_URL_LOGIN+"oauth/login?un="+un+"&pd="+pd,
	                    headers: {   
	                        "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
	                    }
	            }
	
				$http(req).then(function(uidResult){
					console.log(uidResult);
						
					if(uidResult && uidResult.data &&   uidResult.data.val == 'invalied'){
						login.showErrMsg = true;
	    				login.errorMsg = 'Incorrect Username / Password...!';
					
					}else if( uidResult && uidResult.data && uidResult.data.val == 'Inactive'){
						
						login.showErrMsg = true;
	    				login.errorMsg = 'Login User is InActive';
						
					}else{
						if( uidResult && uidResult.data && uidResult.data.val){
						var resul = uidResult.data
						login.device = uidResult.data.device?uidResult.data.device:''; //Added by sudharsan For Jira-Id IRI-5482 on 16-09-2022 Start here
						var modalUpdateVersion = document.getElementsByClassName('modal-backdrop');
	
						if(modalUpdateVersion.length == 0){
	
							ModalService.showModal({
								templateUrl : 'src/modals/loginUserPopup.html',
								controller : "LoginPopupController as checkLogin",
								inputs : {
									scope : $scope,
									http : $http,
									loginData : login,
									loginurl : BASE_URL_LOGIN
								}
							}).then(function(modal) {
								modal.element.modal();
								modal.close.then(function(result) {
								});
							});
						}
					}else if(uidResult.status==-1){
						login.showErrMsg = true;
	    				login.errorMsg = 'Server Is Down...!';
					
					}else{
					
						login.auth();
					}
					}
				});
		     } else {
		    	 login.showErrMsg = true;
					login.errorMsg = 'Check for Internet Connection...!';
		     }
    	 });
	}
     	
    	login.auth=function(){
    		
    		login.uname = (login.uname).toLowerCase();
    		
    		sessionStorage.removeItem('authToken');
    	
    		login.userDetail = {
    				grant_type:"password", 
		            username: login.uname, 
		            password: login.pwd, 
		            client_id: "auditapp"
    		};
    		
    		login.encoded = btoa("auditapp:secret");
    		
    		var req = {
    				method: 'POST',
    				url:BASE_URL_LOGIN+"oauth/token",
    				headers: {	
    					"Authorization": "Basic " + login.encoded,
    					"Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    				},
    				data: $httpParamSerializer(login.userDetail)
    		}
		       console.log(req); 
    		$http(req).then(function(authenticationResult) {    			
    			console.log(authenticationResult);
    			login.showErrMsg = false;
    			if(authenticationResult.status!=400){
    			
       		//Setting authToken
    			var authToken = authenticationResult.data.access_token;
    			
				auditService.setAccessToken(authenticationResult.data.access_token);
				
				auditService.setExpiresIn(authenticationResult.data.expires_in);
				
				auditService.setRefreshToken(authenticationResult.data.refresh_token);
				
				auditService.setTokenType(authenticationResult.data.token_type);
				
				auditService.setUserAuthorization(login.uname);
				
				auditService.setAuthorization(login.pwd);
    			
				sessionStorage.setItem('authToken', authToken);
    			
    			console.log(authenticationResult.data);
    			
    			//Setting Login Status & messgage
    			
    			if(authToken !== undefined){                	
    				var emailId = login.uname; 
    				var data = {
    						emailId : emailId
    				};
					//Added by sudharsan for JIRA-ID 5318 on 13-06-2022
					masterFactory.allUserRmi().$promise.then(function(rmirescheck) {
						rmirescheck.forEach(function(element) {
							if(element.emailAddress.toLowerCase() === emailId.toLowerCase()){
								masterFactory.getCompanydetails(data).$promise.then(function(res) {
								masterFactory.getCurrentUserDetail(emailId,res[0].companyId).$promise.then(function(from_db_user){
									from_db_user[0].password=login.pwd;	
									element.planApproval=element.planApproval!=null?element.planApproval.toUpperCase():element.planApproval;
									from_db_user[0].planApprovalReview=from_db_user[0].planApprovalReview==1?'Y':'N';
									if(element.planApproval!=null && element.planApproval!=from_db_user[0].planApprovalReview &&element.planApproval=='Y' && element.planApproval!=undefined){  //Added by sudharsan for JIRA-ID-IRI-5379

										from_db_user[0].planApprovalReview=0;
										masterFactory.saveUserDetails("UPDATEREVIEW",from_db_user[0]).$promise.then(function(res) {
										});
									}
									else if(element.planApproval!=from_db_user[0].planApprovalReview &&(element.planApproval!='Y' && from_db_user[0].planApprovalReview=='Y')){
										from_db_user[0].planApprovalReview=1;
										masterFactory.saveUserDetails("UPDATEREVIEW",from_db_user[0]).$promise.then(function(res) {
										});
									}
								});
							});
							}
						});
					})
					//End hereJIRA-ID 5318

    			/*** To display user details and user image in dashboard ***/	
						masterFactory.getCompanydetails(data).$promise.then(function(res) { console.log(res); 
							var managerOfficialId= (res[0] &&  res[0].managerOfficialId ) ? res[0].managerOfficialId:'';
							if(res[0] && res[0].roles[0] &&  (res[0].roles[0].roleId==1002 || res[0].roles[0].roleId==1006))
							{
								managerOfficialId=null;	
							}
							
							if(res[0].activeStatus==1){
								var emailId=login.uname;
								 masterFactory.checkrolesPresent(emailId,managerOfficialId,res[0].companyId,"Web").$promise.then(function(rmires) {  //Added by sudharsan For Jira-Id IRI-5482 on 16-09-2022 Start here
	
							if((rmires.result=="present" || managerOfficialId==null)  || (rmires.result=="rmiSignMissing"  && res && res.length > 0 && res[0].roles.length >0  && res[0].roles[0].roleId ==1004 )){	
									sessionStorage.setItem("companyId", res[0].companyId );
							sessionStorage.setItem("userRoleId",res[0].roles[0].roleId  );
							sessionStorage.setItem("ispsReview",res[0].ispsReview  );
							sessionStorage.setItem("userSequenceNo",res[0].sequenceNo  );
							sessionStorage.setItem("managerRegion",res[0].region  );
							
							
							auditService.setAuthorization(res[0].password);
							
							sessionStorage.setItem("usrname",res[0].firstName+" "+res[0].lastName );
							$rootScope.usrname=res[0].firstName+" "+res[0].lastName;
							
							var username=res[0].firstName+" "+res[0].lastName;
							
							sessionStorage.setItem("usrResult",res);
							sessionStorage.setItem("usrResultEmail",res[0].emailId  );
							$rootScope.authToken = authToken;             	
							sessionStorage.setItem('authToken', authToken );
							sessionStorage.setItem("emailId",login.uname  );
							sessionStorage.setItem("userId",login.uname  );
							$rootScope.checkReviewerFlag = true; 
							masterFactory.getConfigDetails(res[0].sequenceNo,sessionStorage.getItem('companyId')).$promise.then(function(resp){
								if(resp.length > 0){
									
									
								if(resp[0].displayName==null){
										console.log('if');
										sessionStorage.setItem("usrname",username  );
										$rootScope.usrname=username;
										}
									else
										{
										console.log('else');
										console.log(resp[0].displayName);
										sessionStorage.setItem("usrname",resp[0].displayName  );
										$rootScope.usrname=resp[0].displayName;
										}
									$rootScope.headerColor=resp[0].headerColor;
									$rootScope.backgroundColor=resp[0].backgroundColor;
									$rootScope.fontColor=resp[0].fontColor;
									$rootScope.buttonColor=resp[0].buttonColor;
									$rootScope.headerFontColor=resp[0].headerFontColor;
									
									
									
									if(resp[0].headerColor){
										$rootScope.sidebarinvertColor=$rootScope.lightenDarkenColor(resp[0].headerColor,20);
									}
									sessionStorage.setItem("defaultSearchCount",resp[0].searchResult  );
									if(resp[0].defaultHomeScreen){
										$state.go(resp[0].defaultHomeScreen,{},{reload:true});
									}
								}
								if(resp.length>0){
									$rootScope.phoImage=$rootScope.arrayBufferToBase64(resp[0].userIdentification);
									
								}
								if(resp.length>0){
									$rootScope.headerColor=resp[0].headerColor;
									$rootScope.backgroundColor=resp[0].backgroundColor;
									$rootScope.fontColor=resp[0].fontColor;
									$rootScope.buttonColor=resp[0].buttonColor;
									$rootScope.headerFontColor=resp[0].headerFontColor;
									if(resp[0].headerColor){
										$rootScope.sidebarinvertColor=$rootScope.lightenDarkenColor(resp[0].headerColor,20);
									}
								}
								if(resp.length!==0){
									if(resp.length>0){
										
										$rootScope.phoImage=$rootScope.arrayBufferToBase64(resp[0].userIdentification);
										
										if(resp[0].displayName!==null){
											$rootScope.usrname=resp[0].displayName;
										}
										else{
											$rootScope.usrname= sessionStorage.getItem("usrname");
										}
									}	
								}else{
									$rootScope.usrname= sessionStorage.getItem("usrname");
								}
							});
							
							   
							/*** To display company details and Logo in dashboard ***/	
							masterFactory.getDomainName(sessionStorage.getItem("companyId")).$promise.then(function(res){
							   
								if(res[0].companyLogo){
									$scope.arrayBufferToBase64 = function(buffer) {
										var binary = '';
										var bytes = new Uint8Array(buffer);
										var len = bytes.byteLength;
										for (var i = 0; i < len; i++) {
											binary += String.fromCharCode( bytes[ i ] );
										}
										return window.btoa( binary );
									}	
								   
									$rootScope.companyImage=$scope.arrayBufferToBase64(res[0].companyLogo);
								 
								}
							   
								sessionStorage.setItem("companyName",res[0].companyName  );
							});
							websocketService.socketService(login.uname,sessionStorage.getItem("companyId"));
							$state.go('app.dashboard',{},{reload:true});
								}
								else if(rmires.result=="notpresent"){
									login.showErrMsg = true;
									login.errorMsg = 'Login User is not an RMI User';
								}else if(rmires.result=="rmiSignMissing"){ 
									login.showErrMsg = true;
									login.errorMsg = 'Signature is Missing From RMI DataBase';
								}else if(rmires.result=="inActiveUser"){ 
									login.showErrMsg = true;
									login.errorMsg = 'User Is In Active In RMI DataBase';
								}else {
									login.showErrMsg = true;
									login.errorMsg = 'RMI Sever Is Down...!';
								}
							});}
							else{
								login.showErrMsg = true;
								login.errorMsg = 'Login User is InActive';
							}});
					}
					//});
              		
    		}else{
    			
				login.showErrMsg = true;
	
				login.errorMsg = 'Incorrect Username / Password...!';
	
			}},function(errorResponse) {
    			
    			var status = errorResponse.status;            		
    			if(status === 400){
    				login.showErrMsg = true;
    				login.errorMsg = 'Incorrect Username / Password...!';
    			} 
    		});  
    	}
    	
    	if(sessionStorage.getItem("rememberMe")=='true'){
    		
    		login.remember = true;
    	
    		login.uname = sessionStorage.getItem("userId");
    		
    	}

    	login.rememberMe = function(){
    		if(login.remember){
    			sessionStorage.setItem("userId",login.uname  );
        		sessionStorage.setItem("rememberMe",true  );
    		}else{
    			
        		sessionStorage.setItem("rememberMe",false  );
    		}
    	}
    	
    	
    	
    	
    	
    	login.forgetBlock =function(){
    		
    		login.showErrMsg = false;
    		
    		login.loginForm = false;
         	
         	login.forgetForm = true;
         	
         	login.focus=true;
         	
         	
    	}
    	login.back=function(){
    		
    		login.showErrMsg = false;
    		
    		login.loginForm = true;
         	
         	login.forgetForm = false;
         	
         	login.focus=true;
         	
    	}
    	login.alert=function(){
    		
    		login.showErrMsg = false;
    		
    	}
    	
    	
    	sessionStorage.clear();
		sessionStorage.removeItem("authToken");
		//sessionStorage.removeItem("companyId");
		sessionStorage.removeItem("userSequenceNo");
		sessionStorage.removeItem('userRoleId');
		sessionStorage.removeItem("companyName");
		sessionStorage.removeItem("companyId");
		sessionStorage.removeItem('emailId');
		sessionStorage.removeItem("userId");
		sessionStorage.removeItem("usrResultEmail");
		sessionStorage.removeItem('usrname');
		sessionStorage.removeItem("usrResult");
		sessionStorage.removeItem("phoImage");
		sessionStorage.removeItem('ImoNum');
		sessionStorage.removeItem('VeslNme');
		sessionStorage.removeItem('managerRegion');
		sessionStorage.removeItem('quickSearchDataVesselImoNo');
		auditService.clearAuthSession();
		
		
    	
    }   
    
})();