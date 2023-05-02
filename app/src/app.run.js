(function ()
{
    'use strict';
    
    angular
    	.module('central')
    	.run(logoutRun);
    
    function logoutRun($cookies,$state,$rootScope,$timeout,masterFactory, websocketService){
    	
    	$rootScope.$state=$state;       	
    	   	    		
    /*	if(sessionStorage.getItem("authToken")){
    		var token = sessionStorage.getItem("authToken");
    		var data = {};
    		if (typeof token !== 'undefined') {
    			var encoded = token.split('.')[1];
    			data = JSON.parse(urlBase64Decode(encoded));
    			var expiry = ((data.exp) - Math.floor(Date.now()/1000))*1000;
    			setTimeout(function(){
    				sessionStorage.removeItem("authToken");
    				sessionStorage.removeItem("companyId");
    			},expiry);
    		}
    	}else{    		
    		setTimeout(function(){
    			$state.go('login',{},{reload:true});
    		},0);
    		
    	}*/
    	
    	if(sessionStorage.getItem("authToken")){

			if(sessionStorage.getItem("emailId") != undefined)				
				websocketService.socketService(sessionStorage.getItem("emailId"),sessionStorage.getItem("companyId"));

		}

    	$rootScope.lightenDarkenColor=function(col, amt){
    		var usePound = false;
    		
    	    if (col[0] == "#") {
    	        col = col.slice(1);
    	        usePound = true;
    	    }
    	 
    	    var num = parseInt(col,16);
    	 
    	    var r = (num >> 16) + amt;
    	 
    	    if (r > 255) r = 255;
    	    else if  (r < 0) r = 0;
    	 
    	    var b = ((num >> 8) & 0x00FF) + amt;
    	 
    	    if (b > 255) b = 255;
    	    else if  (b < 0) b = 0;
    	 
    	    var g = (num & 0x0000FF) + amt;
    	 
    	    if (g > 255) g = 255;
    	    else if (g < 0) g = 0;
    	 
    	    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    	}
    	
    	$rootScope.arrayBufferToBase64 = function(buffer) {
    		
			    var binary = '';
			    var bytes = new Uint8Array(buffer);
			    var len = bytes.byteLength;
			    for (var i = 0; i < len; i++) {
			        binary += String.fromCharCode( bytes[ i ] );
			    }
			    return window.btoa( binary );
			}	
    	
    	
    	function urlBase64Decode(str){
    		var output = str.replace('-', '+').replace('_', '/');
    		switch (output.length % 4) {
    		case 0:
    			break;
    		case 2:
    			output += '==';
                break;
    		case 3:
                output += '=';
                break;
    		default:
                throw 'Illegal base64url string!';
    		}
    		return window.atob(output);
    	}
    	
    	
    	
    	
    	
    	
    	if(sessionStorage.getItem("userSequenceNo") && sessionStorage.getItem('companyId'))
    		{
    	
    	
    	masterFactory.getConfigDetails(sessionStorage.getItem("userSequenceNo"),sessionStorage.getItem('companyId')).$promise.then(function(res){
    	
    		if(res.length>0)
    			{
    			
   			
			$rootScope.phoImage=$rootScope.arrayBufferToBase64(res[0].userIdentification);
			
			
			
			
			
			
			
			
			
			
    			}
			if(res.length>0)
				{
			$rootScope.headerColor=res[0].headerColor;
			$rootScope.backgroundColor=res[0].backgroundColor;
			$rootScope.fontColor=res[0].fontColor;
			$rootScope.buttonColor=res[0].buttonColor;
			$rootScope.headerFontColor=res[0].headerFontColor;
					if(res[0].headerColor)
					{
						$rootScope.sidebarinvertColor=$rootScope.lightenDarkenColor(res[0].headerColor,20);
					}
				}
			
			
			if(res.length!==0)
				{
				
				
	   			
				$rootScope.phoImage=$rootScope.arrayBufferToBase64(res[0].userIdentification);
		if(res[0].displayName!==null)
			{
			$rootScope.usrname=res[0].displayName;
			}
		else
			{
			$rootScope.usrname= sessionStorage.getItem("usrname");
			}
				}
			else
				{
				$rootScope.usrname= sessionStorage.getItem("usrname");
				}
		});
    	
    }
    	
    	if(sessionStorage.getItem("companyId"))
    	{	
    	
    	masterFactory.getDomainName(sessionStorage.getItem("companyId")).$promise.then(function(res){
	    		
    		if(res[0].companyLogo)
   			{	
	    		
    		
   			
   		  $rootScope.companyImage=$rootScope.arrayBufferToBase64(res[0].companyLogo);
   			}
   	
   		
   		
   		
   		});
    	
    	
    	}
    	
    }
    
})();