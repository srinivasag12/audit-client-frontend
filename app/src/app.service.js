(function (){
	'use strict';
	angular
    .module('central')
    .service('broadcastService', broadcastService)
    .service('websocketService', websocketService)
	.service('MyResourceInterceptor', ['$cookieStore','$q','$location','$timeout','toaster','$injector','BASE_URL_LOGIN','$cookies', function($cookieStore,$q,$location,$timeout,toaster,$injector,BASE_URL_LOGIN,$cookies) {
    	
		var resendRequest = null;
		var mutiple_popup =0; //Added by sudharsan for Jira-ID =5492 on30-09-2022
		
		return{
    		request: function(config) {
    			
    			var auditService = $injector.get('auditService');
    			
    			var token = auditService.getAccessToken();
    			
    			var isRestCall = config.url.indexOf('/login') != -1;
    			
    			if(token && config.url !=BASE_URL_LOGIN+"oauth/token"){
    				
    			config.headers.Authorization = 'Bearer '+auditService.getAccessToken();
    			
    			}else if(!isRestCall && !token && (document.URL.indexOf('/certificate/viewer/') == -1)){   							
    				 $location.path('/login');
    			} 
    			
    			config.headers['Cache-Control'] = "no-cache, no-store, must-revalidate";
    			config.headers['pragma'] = 'no-cache';
    			
    			return config || $q.when(config);
    		},
    		requestError:function(requestError){
    			

    			console.log(requestError);
    			
    			
    			return requestError || $q.reject(requestError);
    		},
    		response: function(res){ 
    				
    			
                return res  || $q.when(res);
    			
    		},
    		responseError:function(responseError){   	
    		    
    			var auditService = $injector.get('auditService');
    			
    			console.log(responseError);
    		 			
    			try{
    				if(responseError.status === 400) {  
    					
    					if(responseError.data.error_description != 'Bad credentials' && responseError.data.error_description.indexOf("refresh") ){  
    				    						
    						var req = {
    								method: 'GET',
    								url:BASE_URL_LOGIN+"redis/checkUserLoggedin?username="+sessionStorage.getItem("emailId"),
    								headers: {	
    									"Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    								}
    						}
    						resendRequest = $injector.get("$http")(req);
    						resendRequest.then(function(res){
    							
    							var checkUserlog = res.data;
    							var modelService = $injector.get('ModalService');
    	    					
    	    					modelService.showModal({
    								templateUrl : 'src/modals/sessionTimeOutPopup.html',
    								controller : "SessionPopupController as sTimeout",
    								inputs : {
    									injector : $injector,
    									aservice : auditService,
    									checkUserlog : checkUserlog,
    									username : sessionStorage.getItem("emailId")
    								}
    							}).then(function(modal) {
    								modal.element.modal();
    								modal.close.then(function(result) {
    								});
    							});
    							
    						})
					
    						
    					
    					}
  				 } 
    				if(responseError.status === 401){
    					
    					
    			
    					
    					var token = auditService.getAccessToken();
    					

						
    					  var deferred = $q.defer();
    					  
    					  var credential = {
    		        				grant_type:"refresh_token", 
    		        				refresh_token: auditService.getRefreshToken(),
    		    		            client_id: "auditapp"
    		        		};
    					  
    					  
    					  var encoded = btoa("auditapp:secret");
  						
  							var req = {
  									method: 'POST',
  									url:BASE_URL_LOGIN+"oauth/token",
  									headers: {	
  										"Authorization": "Basic " + encoded,
  										"Content-type": "application/x-www-form-urlencoded; charset=utf-8"
  									},
  									data: $injector.get('$httpParamSerializer')(credential)
  							}
    					  
    					  
    					  
    	                    if(!resendRequest) {
    	                    	
    	                    	resendRequest = $injector.get("$http")(req);
    	                    	
    	                    }
  							
  							resendRequest.then(function(r) {
  								
  								resendRequest = null;
  		                        if (r.data.access_token && r.data.refresh_token && r.data.expires_in) {
  		                        	auditService.setAccessToken(r.data.access_token);
  		                        	auditService.setRefreshToken(r.data.refresh_token);
  		                        	auditService.setExpiresIn(r.data.expires_in);
  		                        	
  		                            $injector.get("$http")(responseError.config).then(function(resp) {
  		                                deferred.resolve(resp);
  		                            },function(resp) {
  		                                deferred.reject();
  		                            });
  		                        } else {
  		                            deferred.reject();
  		                        }
  		                    },function(response) {
  		                    	resendRequest = null;
  		                        deferred.reject();
  		                        auditService.clearAuthSession();
  		                        $injector.get("$state").go('login');
  		                        return;
  		                    });
  							
  							
  							
  		                    return deferred.promise;
    					
      				
    					
    					
    					    					
    				}
    				if(responseError.status === 500)
    				{
    					console.log("Ssss"+responseError.data.path);
    					if(responseError.data.path=="/CentralAuditApi/redis/certificateViewerDetails/2/")
    						{
    					var modelService = $injector.get('ModalService');
    					modelService.showModal({
    		    			
    		    			templateUrl : 'src/modals/certificateViewWarning.html', 
    		    			
    		    			controller  : 'certificateViewWarning',	
    		    			
    		    			inputs : {
    		    				msg:"Invalid Certificate Url, Please Contact Admin"
    		    					
    		    				}
    		    		
    		    		}).then(function(modal) {
    		    			
    		    			modal.element.modal();
    		    			
    		    			modal.close.then(function(result) {
    		    				 	    				
    		    			});
    		    			
    		    		}); 
    					console.log("Sasiiii"+responseError.data.error_description);
    						}
    					
    				}
					//Added by sudharsan for JIRA-ID=5442 on 1-9-2022 JIRA-ID=5491 on 29-09-2022
					if((responseError.status === -1 || responseError.data === null) && mutiple_popup ===0) {  //Added by sudharsan for Jira-ID =5492 on30-09-2022
    					
    					mutiple_popup =1;  //Added by sudharsan for Jira-ID =5492 on30-09-2022
							if(sessionStorage.getItem("emailId")!=null || sessionStorage.getItem("emailId")!= undefined){			
    						var req = {
    								method: 'GET',
    								url:BASE_URL_LOGIN+"redis/checkUserLoggedin?username="+sessionStorage.getItem("emailId"),
    								headers: {	
    									"Content-type": "application/x-www-form-urlencoded; charset=utf-8"
    								}
    						}
    						resendRequest = $injector.get("$http")(req);
    						resendRequest.then(function(res){
								console.log(res);
    							
    							var checkUserlog = res.data;
    							var modelService = $injector.get('ModalService');
    	    					
    	    					modelService.showModal({
    								templateUrl : 'src/modals/sessionTimeOutPopup.html',
    								controller : "SessionPopupController as sTimeout",
    								inputs : {
    									injector : $injector,
    									aservice : auditService,
    									checkUserlog : checkUserlog,
    									username : sessionStorage.getItem("emailId")
    								}
    							}).then(function(modal) {
    								modal.element.modal();
    								modal.close.then(function(result) {
    								});
    							});
							
    						})
						}
    						
    					
    					
  				 } 
				 //End Here JIRA-ID=5491
    			
    			}catch(e){
    				
    				$timeout(function() {
    					toaster.error(e.message);
    				},0);
    			}
    			
    			
    			
    			return responseError || $q.reject(responseError);
    		}
    	}        	
    }])
    
    
    
     function broadcastService()
    {
		
		
		this.confirmService=function(){
			
			var trueval=window.confirm("Do you want to save changes before proceeding");
			
			
			return trueval;
			
		}
		
		
    }
    
    
    ;
	
	function websocketService($stomp,BASE_URL_LOGIN,$interval,$rootScope, $cookies){
    	
    			this.socketService=function(emailId, companyId){
 
    				$stomp.connect(BASE_URL_LOGIN+'live-notification').then(function (frame) {
    					var emailNotification = $stomp.subscribe('/topic/notify/'+emailId+'/'+companyId, function (payload, headers, res) {
    						var countEmail = (JSON.parse(res.body) != 0) ? JSON.parse(res.body) : '';
    						$rootScope.checkCount(countEmail);
    					});
    				});

    				$interval(function(){
    					if(sessionStorage.getItem("authToken")){
    					$rootScope.callAtInterval();}}, 10000);

    				$rootScope.callAtInterval = function(){
    					$stomp.send('/app/notifymail/'+emailId+'/'+companyId);
    				}
    				return true;
    			}
    		}
	
	
})();