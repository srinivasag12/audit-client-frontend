
(function() {
	'use strict';

	angular.module('app.master.report').controller('masterReportController',
			masterReportController);

	function masterReportController($scope, $cookies, toaster, $http, blockUI, $timeout, $filter, $rootScope, $templateCache, masterFactory,AppConstant,ModalService,detailsFactory,reportRequiredData,$window,reportFactory,YYYYMMDD,MMMDDYYYY,HHmm) {
		
		var report=this;
		console.log(report); console.log(reportRequiredData);

		report.companyId    = Number($window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '');
	       
		
		report.reportData=[];
		
		report.audtype=reportRequiredData[0];
		
		report.allAuditSubTypes =reportRequiredData[1];
		
		report.mandatoryOrStatus = mandatoryOrStatus;
   
		report.getReports = getReports;
		
	    report.reportToBeUpdated = [];
		
		
		report.yesOrNoOptions = [{
         	'id':0,
         	'value':'No'
         },
         {
         	'id':1,
         	'value':'Yes'
         }];
		
		//Added by sudharsan for Jira-ID= IRI-5505
		if(sessionStorage.getItem("userRoleId") == 1002){
			report.audtype = report.audtype.filter(function( obj ) {
				return obj.auditTypeId;
			});
		}
		//Added by sudharsan for Jira-ID = IRI- 5549
		else if(sessionStorage.getItem("userRoleId") == 1003){
			report.audtype = report.audtype.filter(function( obj ) {
				return obj.auditTypeId != 1006 && obj.auditTypeId != 1007 &&
				obj.auditTypeId != 1008 &&obj.auditTypeId != 1009 &&
				obj.auditTypeId != 1010 &&obj.auditTypeId != 1011 &&
				obj.auditTypeId != 1012 &&obj.auditTypeId != 1013;
			});
		}
		//Added by sudharsan for Jira-ID = IRI-5551
		else if(sessionStorage.getItem("userRoleId") == 1006){
			report.audtype = report.audtype.filter(function( obj ) {
				return 	obj.auditTypeId != 1001 && obj.auditTypeId != 1002 &&
			obj.auditTypeId != 1003 && obj.auditTypeId != 1004 &&
			obj.auditTypeId != 1005;
			});
		}
		else{
			report.audtype = report.audtype.filter(function( obj ) {
				return obj.auditTypeId != 1006;
			});
		}
		
    		report.showUpdateGlobal=true;
		
    		report.updateReport = function(rep){
    			
    			report.updateReportFlag=true;
    			
    			report.newAddedReportCurrent=rep.attachmentTypeId;
    			
    	    	   ModalService.showModal({
    	   			
    	   			templateUrl : 'src/modals/addMasterReports.html',
    	   			
    		            controller  : 'addMasterReportController as addmasrep',
    		            
    		            inputs : {
    		            	
    		            	scope : report
    		            	
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
		
		
		report.getReportSubType = function(auditTypeId){
    		
    		report.audsubtype = report.allAuditSubTypes.filter(function( obj ) { 
				return obj.auditTypeId == auditTypeId ;
				
			});
		
		}
		
		
		report.clearReports= function(){
			
			
			report.reportData=[]; report.auditSubTypeId='';
		}
		
		function getReports(auditSubTypeId){
		   report.reportData=[];
       	
    	   detailsFactory.getReportType(report.auditTypeId,report.companyId,auditSubTypeId).$promise.then(function(res) {
    		
    		var data=res;
   			report.reportData=res;
   			report.reportData = report.reportData.filter(function( obj ) {
   				
   				obj.lastUpdatedDateVal =moment(obj.lastUpdatedDate).format(MMMDDYYYY);
				return (obj && (obj.attachmentTypeDesc!='OTHER' &&  obj.attachmentTypeDesc!='other'));
			});
   			
   		});
		
    	}
		
       report.clear = function(){
    	   report.addReports =false;
    	   report.auditTypeId=''; report.auditSubTypeId='';
    		report.reportData=[];
		}
       
       report.addNewAttachment = function(){
    	   report.updateReportFlag=false;
    	   /**added by archana for jira id-IRI-5411 & TICKET-549 start */
		   report.activeStatusCountForSubmited = 0;
		   report.reportData.forEach(function(dat) {
						if(dat.activeStatus == 1){
							report.activeStatusCountForSubmited = report.activeStatusCountForSubmited+1;
						 }
					   });
    	   /**added by archana for jira id-IRI-5411 & TICKET-549 end */
					   
    	   if(!report.auditTypeId){
			sessionStorage.getItem("userRoleId") == 1006?toaster.warning('please select Review  Type'):		//added by @Ramya for Jira id - IRI-5586
				toaster.warning('please select Audit/Review  Type');   
    		   
    	   }else if(!report.auditSubTypeId){
			sessionStorage.getItem("userRoleId") == 1006?toaster.warning('please select Review Sub Type'):		//added by @Ramya for Jira id - IRI-5586
    		   toaster.warning('please select Audit/Review Sub Type');   
		   }
    		   /**added by archana for jira id-IRI-5411 & TICKET-549 start */
			else if(report.activeStatusCountForSubmited > 19){
				toaster.warning('maximum 20 active report types are only allowed');
			}
			/**added by archana for jira id-IRI-5411 & TICKET-549 end */
    	   else {
    	   ModalService.showModal({
    		
   			templateUrl : 'src/modals/addMasterReports.html',
   			
	            controller  : 'addMasterReportController as addmasrep',
	            
	            inputs : {
	            	
	            	scope : report
	            
	            	
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
		}
       
		
       report.saveOrUpdateReport = function(){
    	   
    
    	   var  newReportDatas =[];
    	   
    	   newReportDatas = report.reportData.filter(function( obj ) {
    		   
    		   return obj.addNewReport ==1;
    	   });
    	   
    	 
    	   var updatedData =angular.copy(report.reportToBeUpdated);
    	   
    	   var newUpdateDatas = updatedData.concat(newReportDatas);
    	  	
    	  
    	   reportFactory.saveOrUpdateReportAttach( newUpdateDatas).$promise.then(function(res) { 
    	 		
    	 	
    	 			report.showUpdateGlobal=false;
    	 			report.addReports =false;
					toaster.success('Reports Saved Successfully');
					report.reportToBeUpdated.length = 0;
     				reportFactory.redisUpdateAttachmentReport(report.companyId).$promise.then(function(res1) { console.log(res1); 
     				report.getReports(report.auditSubTypeId);
     				});
     			
      		});
    	 	
    	 	
    	 
    	 	
    	 	
       }
		
       function mandatoryOrStatus(attachmentTypeId){
		report.activeStatusCount =0; //added by archana for jira-id IRI-5411 & TICKET-549
    	   	report.reportData.forEach(function(data, aIndex) {
    	   		
    			   if (attachmentTypeId==data.attachmentTypeId) {
    				   /** added by archana for jira-id IRI-5411 & TICKET-549 start */
					   report.reportData.forEach(function(dat, aIndex) {
						if(dat.activeStatus == 1){
							report.activeStatusCount = report.activeStatusCount+1;
						 }
					   });
					   if(report.activeStatusCount > 20){
						data.activeStatus = 0;
						toaster.warning('maximum 20 active report types are only allowed');   
					 }
					 /** added by archana for jira-id IRI-5411 & TICKET-549 end */
    				   data.addNewReport =0;
    				   data.showUpdateFlag = 1;
    				   data.dateIns = moment(new Date()).format("YYYY-MM-DD");
    				   data.lastUpdatedDate = moment(new Date()).format( "MMM D, YYYY h:mm:ss a");
    				   data.lastUpdatedDateVal = moment(new Date()).format(MMMDDYYYY);
    				   
    				   report.reportToBeUpdated.push(data);
    				  
    				  
				   }
    			 
    			 
    		   });
		
    	   
       }
		/*  report controlerr end  */
	}

})();