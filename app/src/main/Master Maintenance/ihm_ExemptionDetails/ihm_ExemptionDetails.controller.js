
(function() {
	'use strict';

	angular.module('app.master.ihm_ExemptionDetails').controller('ihm_ExemptionDetailsController',
			ihm_ExemptionDetailsController);

	function ihm_ExemptionDetailsController($scope, $cookies, toaster, $http,ModalService,$filter,masterFactory, $rootScope,$templateCache,YYYYMMDD,MMMDDYYYY,HHmm) {
		
		var exempdet=this;
		//exempdet.onChangeActiveStatus = onChangeActiveStatus;
		exempdet.exempData=[];
		console.log(exempdet.exempData);
		exempdet.yesOrNoOptions = [{
         	'id':0,
         	'value':'No'
         },
         {
         	'id':1,
         	'value':'Yes'
         }];
		getEcReasons();
		
		exempdet.validateEcReason = validateEcReason;
		
		exempdet.addNewExemptCert = function(){
			
			exempdet.updateExemptCertFlag = false;
	    	   
	    	    ModalService.showModal({
	    		
	   			templateUrl : 'src/modals/addExemption.html',
	   			
		        controller  : 'addExemptionController as addExe',
		            
		            inputs : {
		            	
		            	scope : exempdet
		            
		            	
		            }
		            
	   		}).then(function(modal) {
	   			
	            modal.element.modal();
	            
	            modal.close.then(function(result) {
	            	
	            	if (result == 'OK') {		     				
							
	     			} else if (result == 'No' || result == 'cancel') {
	     							
	     			}
	            	
	            });
	            
			});
	    	   
	   }
		
		exempdet.updateExemptCert = function(exemp){
			
			
			exempdet.updateExemptCertFlag=true;
		
			exempdet.newAddedExemptCurrent=exemp.reasonId;
			
			
			
			ModalService.showModal({
	   			
	   			templateUrl : 'src/modals/addExemption.html',
	   			
		            controller  : 'addExemptionController as addExe',
		            
		            inputs : {
		            	
		            	scope : exempdet
		            	
		            }
		            
	   		}).then(function(modal) {
				
	            modal.element.modal();
	            
	            modal.close.then(function(result) {
	            	
	            	if (result == 'OK') {		     				
	     								
	     			} else if (result == 'No' || result == 'cancel') {
	     							
	     			}
	            	
	            });
	            
			});
	    	   
	   }
		
		
		function getEcReasons(){
			exempdet.exempData=[];
			exempdet.tempDataToFilter=[];
				masterFactory.getEcGrantedReason().$promise.then(function(res) { 
	   			
	   			var data=res;
	   			exempdet.exempData=res;
	   		//	exempdet.tempDataToFilter=data;
	   			
	   			exempdet.exempData = exempdet.exempData.filter(function( obj ) {
	   				obj.updatedOn =moment(obj.updatedOn,YYYYMMDD).format(MMMDDYYYY);
	   				obj.addreason=0;
					return obj;
				});
	   			
	   			
	   			
	   		});
				
				masterFactory.getEcGrantedReason().$promise.then(function(resnew) { 
	      			
	      			
					exempdet.tempDataToFilter=resnew;
					exempdet.tempDataToFilter = exempdet.tempDataToFilter.filter(function( val ) {
		     				val.updatedOn =moment(val.updatedOn,YYYYMMDD).format(MMMDDYYYY);
		   				return val;
		   			});
		      			
		      		});
			
	    	   
			}
		
		 function validateEcReason(){
		 
		
			var flag=true;
			
			console.log(exempdet.exempData);
				
			var	ecreasonActive= _(exempdet.exempData).chain().where({'activeStatus':1}).pluck("reasonId").toString();
				
			
				if(ecreasonActive.length == '0'){
					
		 		   toaster.warning('Please select atleast one  Exemption Certificate as Active  ');   
		 		 
		 		   flag = false;
				 }
				
				
			return flag;
		 }
		 
		
		
		exempdet.saveOrUpdateEcGrantedReason = function(){
	    	   var len=exempdet.exempData.length; var temp=0,datas='';
	    	   if(exempdet.validateEcReason()){
	    	   exempdet.exempData.forEach(function(data, aIndex) { 
	    		    datas=''; 
	    		   datas = data;
	    		 
	    		   data.updatedOn =moment(data.updatedOn,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm);
	    		   
	    		   data.ecGrantedReason = data.ecGrantedReason.trim();
	    		   
	    		   data.addreason=0;
	    		      
	    	   });
	    	   masterFactory.saveOrUpdateEcGrantedReason(exempdet.exempData).$promise.then(function(res) { 
	      			console.log("saveOrUpdateEcGrantedReason "+res);
	      			exempdet.addExempt =false;
	      			//temp = temp +1;
	      			//if (temp==len){ 
	      			getEcReasons();
	      			
	      			masterFactory.redisUpdateExemptionReasons().$promise.then(function(res1) {
	      				console.log("res1 " + res1);
		   
		   				toaster.success('Saved Successfully');
		   			});
	      			
	      				
	      				
	      			//}
	       		}); 
	    	   }
	       }
		 
		exempdet.onChangeActiveStatus =  function(reasonId,activeStatus){
	    	   
	    	  console.log("coming" + reasonId);
	    	  if(!activeStatus){
	    		  masterFactory.checkEcReasonActiveStatus(reasonId).$promise.then(function(res) {
	    			  console.log(res);
	    			  if(res.reasonCount){
	    				  toaster.warning('Please note that certificates are not published which is generated with Exemption attachment');
	    			  }
	    		  });
	    		 
	    		   
	    	  }
	    	  
			 exempdet.exempData.forEach(function(data, aIndex) {
				 if (reasonId==data.reasonId) {
				 exempdet.tempDataToFilterTemp= _.findWhere(exempdet.tempDataToFilter, {reasonId: reasonId});
  		   console.log(exempdet.tempDataToFilterTemp); 
  		   console.log(data); 
  		   if(exempdet.tempDataToFilterTemp && (exempdet.tempDataToFilterTemp.activeStatus!= data.activeStatus)){
  			   data.updatedOn = moment(new Date()).format(MMMDDYYYY);
  			   data.updatedBy = sessionStorage.getItem('emailId');
 			   }else if (exempdet.tempDataToFilterTemp && (exempdet.tempDataToFilterTemp.activeStatus == data.activeStatus)) {
 				data.updatedOn =exempdet.tempDataToFilterTemp.updatedOn;
 				data.updatedBy = exempdet.tempDataToFilterTemp.updatedBy;
			             }
  			   
				 }
  		   });
	    	  
  	   
     }
		 
		exempdet.clearExemptCert= function(){
			
			
			exempdet.exempData=[];
			exempdet.addExempt =false;
		}
		
		
			
	}

})();