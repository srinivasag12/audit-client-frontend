
(function (){
    'use strict';

    angular
        .module('app.dashboard')        
        .controller('DashboardController', DashboardController)
        .controller('AuditCreationController', AuditCreationController)
        
    function DashboardController($state,$window,ModalService,$cookies,masterFactory,userRole,$rootScope,$timeout,auditType,AppConstant){

    	var dboard = this;
console.log(dboard);
    	dboard.userRoleId = userRole[0].roles[0].roleId;
    	
    	
    	
    	var today = new Date();    	
    	var hours = today.getHours();
    	var minutes = today.getMinutes();
    	var seconds = today.getSeconds();
    	
    	var expiry = ((((24-hours)*60)*60) + ((60-minutes)*60) + (60-seconds))*1000;
    	
    	$timeout(function(){
    		$rootScope.checkReviewerFlag = true;
    	},expiry);  
    	
    	dboard.onlyIhm = false;
    	dboard.ihmReviewer = false;
    	dboard.planApprovalReview = false;
    	
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	
    	if(res && res.length>0 && res[0].ihmreview==1){
    		dboard.ihmReviewer = true;
    		if((res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
    			dboard.onlyIhm = true; 
    		}
    	 }
    	if(res && res.length>0 && res[0].planApprovalReview==1){
    		dboard.planApprovalReview = true;
    		if((res[0].ihmreview==0 || !res[0].ihmreview ) && (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
    			dboard.onlyPlanAccepted= true; 
    		}
    	 }
    	});

    	dboard.setSearchData = function(pageNo){
    		
    		var searchBeanValues={
    				
        			"vesselImoNo" : null,
        					
        			"companyImoNo" : null,
        					
        			"certIssueDate" : null,
        					
        			"certExpireDate" : null,
        	
        			"certificateNo" : null,
        					
        			"auditTypeId" : null,
        					
        			"auditSubTypeId" : null,
        					        					
        			"companyId" : sessionStorage.getItem("companyId"),
        			
        			"pageNo" : (Number(pageNo)) * 5,
        			
        			"userId" : userRole[0].sequenceNo,
        			
        			"auditStatusId": null,        					
        			
        			"auditSeqNo":[],
        			
        			"retrieveFlag" : false,
        			
        			"roleId" : dboard.userRoleId
        				
        		}
    		
    		return searchBeanValues;
    		
    	}

    	dboard.reviewerCount = function(){
    		
    		$rootScope.checkReviewerFlag = false;
    		
    		var searchData = dboard.setSearchData(0);
    		
    		masterFactory.reviewerData(searchData).$promise.then(function(res){
    			if(res.data>0){
    				ModalService.showModal({
    					
    					templateUrl : 'src/modals/reviewerApprove.html',
    					
    					controller  : "reviewerApproveController as apprv",
    					
    		            inputs : {data:searchData}
    				
    				}).then(function(modal) {
    					
    					modal.element.modal();
    					
    		            modal.close.then(function(result) {
    		            		            	
    		            });
    		            
    				});
    			}else{
    				$state.go('app.audit.search',{},{reload:true});
    			}
    		});
    		
    	}
    	   	
    		
    	dboard.reloadScreen = function(val){
    		
    		switch(val){
    		
    		case 'AUD_CRE_IHM':
    			/*$state.go('app.audit',{},{reload:true});*/
    			$rootScope.auditCreation('AUD_CRE_IHM','Creation');
    			break;
			//Added by sudharan for Jira-ID = IRI- 5715 Start here
			case 'AUD_CRE_PA':
				/*$state.go('app.audit',{},{reload:true});*/
				$rootScope.auditCreation('AUD_CRE_PA','Creation');
				break;
			//Added by sudharan for Jira-ID = IRI- 5715 End here
    		case 'AUD_CRE':
    			/*$state.go('app.audit',{},{reload:true});*/
    			$rootScope.auditCreation('AUD_CRE','Creation');
    			break;
    		case 'AUD_MAI':	    			
    			//dboard.reviewerCount();
    			//$rootScope.checkReviewerFlag?dboard.reviewerCount():$state.go('app.audit.search',{},{reload:true});
				$state.go('app.audit.search',{audittype:"search"},{reload:true});
    			break;
    		case 'CAR_MAI':
    			$state.go('app.carMaintenance.carSearch',{},{reload:true});
    			break;
    		case 'VES_STA':
				sessionStorage.removeItem('ImoNum');					//added by @Ramya on 3-1-2023 for Jira id - IRI-5556
				sessionStorage.removeItem('VeslNme');
    			$state.go('app.vesselStatement',{},{reload:true});
    			break;
    		case 'MAS_MAI':
    			$rootScope.auditCreation('MAS_MAI','Master Maintenance');
    			break;    			
    		case 'USE_CON':
    			$state.go('app.config',{},{reload:true});
    			break;    	
    		case 'CER_GEN':
    			sessionStorage.setItem('withOutAdtCertificateData','' );
    			//$state.go('app.certificate.search',{},{reload:true});
    			$rootScope.auditCreation('CER_GEN','Certificate Creation / Search');
    			break; 
    		case 'USE_DET':
    			$state.go('app.master.user',{},{reload:true});
    			break;
    		case 'AUD_CYC':
    			$state.go('app.auditCycle',{},{reload:true});
    			break;
    		case 'AUD_CREATE_SEARCH':
    			$rootScope.auditCreation('AUD_CREATE_SEARCH','Audit Creation / Search');
    			break; 
    		case 'LOG':
    			$state.go('app.centralLog',{},{reload:true});
    		
    			break; 
    		case 'BAC_DAT':
    			$state.go('app.support',{},{reload:true});
    			break;
    		case 'CER_GEN_IHM':
    			sessionStorage.setItem('withOutAdtCertificateData','' );
    			//$state.go('app.certificate.search',{},{reload:true});
    			$window.sessionStorage.setItem("auditTypeIdCreateIhm",AppConstant.IHM_TYPE_ID);
    			$rootScope.auditCreation('CER_GEN','Certificate Creation / Search');
    			break;
    			
    		case 'REV_IHM_MANAGER':
    			$rootScope.auditCreation('AUD_CREATE_SEARCH_IHM','Review Creation / Search');
    			break;
    		case 'CER_SEARCH':
    			
    	    	if(dboard.userRoleId==1003)
    	    		$rootScope.auditCreation('MANAGER_SEARCH','Certificate Generation / Search');
    	    	else
    	    		$state.go('app.certificate.search',{},{reload:true});
    			break;
    			
    			
/**     CODE ADDED start    **/
    			
    			
    		case 'IMH-SEARCH':

				if(dboard.userRoleId==1006)
    			$state.go('app.vesselHistory',{},{reload:true});
    			break;
    			
    			
    			/**     CODE ADDED  end   **/
    		default:
    			break;
		    	
    		}		
    	};	
    	
    	dboard.laptopURL = function() {
    		
    		$rootScope.laptopURL();
    	}
    	
    	$rootScope.auditCreation=function(val,tilte){

    		sessionStorage.removeItem('auditSeqNo');
    		
    		if(val=='AUD_CRE_IHM' && tilte=='Creation'){
    			console.log("dashboard Yes")
    		sessionStorage.removeItem("auditSeqNo");
		//	sessionStorage.removeItem("companyId");
			$window.sessionStorage.setItem("auditTypeId",AppConstant.IHM_TYPE_ID);

			$state.go('app.audit.detailsIhm',{'audittype':auditType[AppConstant.IHM_TYPE_ID].urlMap},{reload:true});
			
    		}else{
    			console.log("dashboard NO")
	   
    		ModalService.showModal({
			
    			templateUrl : 'src/modals/auditCreation.html',
			
    			controller  : "AuditCreationController as auditcreate",
			
    			inputs : {param:val,title:tilte}
		
    		}).then(function(modal) {
			
    			modal.element.modal();
			
    			modal.close.then(function(result) {
            		            	
    			});
    		});
    		}
	   }  
    	
    	
    	sessionStorage.removeItem('auditCycleData','');
    	sessionStorage.removeItem('auditCycleSearchBean', '');
    	sessionStorage.removeItem('quickSearchDataAuditTypeId');
		sessionStorage.removeItem('quickSearchDataVesselImoNo');
		sessionStorage.removeItem('quickSearchDataVeslNme');
		sessionStorage.removeItem('updateSearchData', '');
   }
    
    function AuditCreationController($cookies,toaster,$state,auditType,AppConstant,$window,masterFactory,param,title,$rootScope){
    
    	console.log(this)
    	 
    	var auditcreate = this;
    	auditcreate.Planapprovalmodel = false;
    	auditcreate.param=param;
    	
    	auditcreate.title=title;
	 
    	auditcreate.AppConstant = angular.copy(AppConstant);
    	
    	sessionStorage.removeItem("auditSeqNo");
    	
    	auditcreate.userRoleId = sessionStorage.getItem('userRoleId'); 
    	
    	auditcreate.onlyIhmType = false;
    	auditcreate.ihmReviewerr = false;
    	auditcreate.planApprovalReview = false;
    	
    	console.log(param,title);
    	
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	
    	if(res && res.length>0 && res[0].ihmreview==1){
    		auditcreate.ihmReviewerr = true;
    		if((res[0].planApprovalReview==0 || !res[0].planApprovalReview) && (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
    			auditcreate.onlyIhmType = true; 
    		}
    	 }
    	if(res && res.length>0 && res[0].planApprovalReview == auditcreate.AppConstant.PLAN_APPROVAL_REVIEW_OK){
    		auditcreate.planApprovalReview = true;
    		if((res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
    			auditcreate.onlyPlanAccepted= true; 
    		}
    	 }
	});
    	
    	if(auditcreate.userRoleId==auditcreate.AppConstant.MANAGER_ROLE_ID){
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	if(res && res.length>0 && res[0].ihmreview==1){ 
    		auditcreate.ihmReview = true; 
    	}
    	});
    	}
    	
    	
    	auditcreate.checkIspsReview = function(auditTypeId, planAccepted){
		
    	var auditDtl = '';
    	
    	
        
    	
    	//auditDtl = (auditTypeId==auditcreate.AppConstant.ISPS_TYPE_ID) ? 'ISPS Audit' : (auditTypeId==auditcreate.AppConstant.SSP_TYPE_ID) ? 'SSP Review' :'';
		//Added by sudharan for Jira-ID = IRI- 5715 Start here
    	if(auditcreate.param=='AUD_CRE_PA'){
			if(planAccepted){
				$window.sessionStorage.setItem("auditTypeId",auditTypeId);
				$state.go('app.audit.detailsPlanApproval',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
			}
		}
		//Added by sudharan for Jira-ID = IRI- 5715 End here
    	else if(auditcreate.param=='AUD_CRE'){
    	if(auditTypeId==auditcreate.AppConstant.ISPS_TYPE_ID || auditTypeId==auditcreate.AppConstant.SSP_TYPE_ID){
    		auditDtl = (auditTypeId==auditcreate.AppConstant.ISPS_TYPE_ID) ? 'ISPS Audit' : (auditTypeId==auditcreate.AppConstant.SSP_TYPE_ID) ? 'SSP Review' :'';
    		
    		
    		masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
				
				if(res.length>0 && res[0].ispsReview == auditcreate.AppConstant.ISPS_REVIEW_OK){
    				
    				sessionStorage.removeItem("auditSeqNo");
    	    	//	sessionStorage.removeItem("companyId");
    	    		$window.sessionStorage.setItem("auditTypeId",auditTypeId);
    	    		
    				$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
    			}else{
        			toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
        		}
    		});
    		
    	}else if(auditTypeId==auditcreate.AppConstant.MLC_TYPE_ID || auditTypeId==auditcreate.AppConstant.DMLC_TYPE_ID){
			auditDtl = (auditTypeId==auditcreate.AppConstant.MLC_TYPE_ID) ? 'MLC Inspection' : (auditTypeId==auditcreate.AppConstant.DMLC_TYPE_ID) ? 'DMLCII Review' :'';
			console.log('1');
			masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){

				if(res.length>0 && res[0].mlcreview == auditcreate.AppConstant.MLC_REVIEW_OK){

					sessionStorage.removeItem("auditSeqNo");
			//		sessionStorage.removeItem("companyId");
					$window.sessionStorage.setItem("auditTypeId",auditTypeId);

					$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
				}else{
					toaster.clear();
					toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
				}
			});

		
			
		}
    	else if(auditTypeId==auditcreate.AppConstant.ISM_TYPE_ID){
    		console.log("ISM COnt===========================")
    	
			masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
				console.log(res);
				if(res.length>0 && res[0].ismreview == auditcreate.AppConstant.ISM_REVIEW_OK){

					sessionStorage.removeItem("auditSeqNo");
			//		sessionStorage.removeItem("companyId");
					$window.sessionStorage.setItem("auditTypeId",auditTypeId);

					$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
				}else{
					toaster.clear();
					toaster.warning("Sorry, You aren't authorized for the ISM Audit");
				}
			});

		
			
		}/*else if(auditTypeId==auditcreate.AppConstant.IHM_TYPE_ID){
			auditDtl = 'IHM Part I Review';
			masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
				
				if(res.length>0 && res[0].ihmreview == auditcreate.AppConstant.IHM_REVIEW_OK){

					sessionStorage.removeItem("auditSeqNo");
					sessionStorage.removeItem("companyId");
					$window.sessionStorage.setItem("auditTypeId",auditTypeId);

					$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
				}else{
					toaster.clear();
					toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
				}
			});
		}*/else if(planAccepted){
			$window.sessionStorage.setItem("auditTypeId",auditTypeId);
    		$state.go('app.audit.detailsPlanApproval',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
			
			
			} else{
	    		
	    //		sessionStorage.removeItem("auditSeqNo");
	      //  	sessionStorage.removeItem("companyId");
	        	$window.sessionStorage.setItem("auditTypeId",auditTypeId);
	    		$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
	    	}
    	}
    	else if(auditcreate.param=='MAS_MAI'){
    		
    		if(auditTypeId=='code'){
    			$state.go('app.master.auditCode',{},{reload:true});
    			
    		}
    		else if(auditTypeId=='vslDetail'){
    			$state.go('app.master.vesselDetails',{},{reload:true});
    			
    		}
    		else if(auditTypeId=='vesselCompanyDetail'){
    			$state.go('app.master.vesselCompanyDetails',{},{reload:true});
    			
    		}
    		else if(auditTypeId=='userdetail'){
    			$state.go('app.master.user',{},{reload:true});
    			
    		}else if(auditTypeId=='reportdetail'){
    			
    			$('.modalLogin.modal.fade').remove();
				$('.modal-backdrop').remove();
    			$state.go('app.master.report',{},{reload:true});
    			
    		}else if(auditTypeId=='portDetails'){
    			$state.go('app.master.portDetails',{},{reload:true});
    			
    		}
    		else if(auditTypeId=='ihm_exemptionDetails'){
    			$state.go('app.master.ihm_ExemptionDetails',{},{reload:true});
    			
    		}
    		
    	}
    	else if(auditcreate.param=='CER_GEN'){
    		
    		if(auditTypeId=='certSearch'){
    			$state.go('app.certificate.search',{},{reload:true});
    			
    		}
    		else if(auditTypeId=='certDetail'){
    			sessionStorage.removeItem("certActiveStatus");
    			sessionStorage.removeItem("certAuditSeqNo");
    			sessionStorage.removeItem("certCompanyId");
    			sessionStorage.removeItem("certCurrPageNo");
    			sessionStorage.removeItem("certGenerateStatus");
    			sessionStorage.removeItem("certSeqNo");
    			sessionStorage.removeItem("certUTN");
    		
    			/*$state.go('app.certificate.details',{},{reload:true});*/

    			if(auditcreate.onlyIhmType) {
    				$state.go('app.certificate.detailsihm',{'certificate':'withOutAudit'},{ reload: true });
    			} else if (!auditcreate.ihmReviewerr) {
    				$state.go('app.certificate.details',{'certificate':'withOutAudit'},{ reload: true });
    			} else {
    				$rootScope.auditCreation('IHM_CER_GEN','Certificate Creation');
    			} 
    			
    		}
    		
    		
    	}
    	else if(auditcreate.param=='IHM_CER_GEN'){
    		
    		if(auditTypeId=='IHMcertDetail'){
    			$state.go('app.certificate.detailsihm',{'certificate':'withOutAudit'},{ reload: true });
    		}
    		else if(auditTypeId=='SMCcertDetail'){
    			$state.go('app.certificate.details',{'certificate':'withOutAudit'},{ reload: true });
    		}
    		
    	}
    	else if(auditcreate.param=='AUD_CREATE_SEARCH'){
    		
    		if(auditTypeId=='auditcreate'){
    			$rootScope.auditCreation('AUD_CRE','Creation');
    		}
    		else if(auditTypeId=='auditSearch'){
    			$('.modalLogin.modal.fade').remove();
				$('.modal-backdrop').remove();
    			$state.go('app.audit.search',{audittype:"search"},{reload:true});
    			
    		}
    		
    	}else if(auditcreate.param=='AUD_CREATE_SEARCH_IHM'){
    		
    		if(auditTypeId=='auditcreate'){
    			$rootScope.auditCreation('AUD_CRE_IHM','Creation');
    		}
    		else if(auditTypeId=='auditSearch'){
    			$('.modalLogin.modal.fade').remove();
				$('.modal-backdrop').remove();
    			$state.go('app.audit.search',{audittype:"search"},{reload:true});
    			
    		}
    		
    	}
    	else if(auditcreate.param=='MANAGER_SEARCH'){
    		if(auditTypeId=='MANAGER_CER_GEN'){
    		 
    			$state.go('app.certificate.generate',{'flag':'MANAGER_CER_GEN'},{reload:true});
    		}
    		else if(auditTypeId=='MANAGER_SEARCH'){
    			$state.go('app.certificate.search',{},{reload:true});
    			
    		}
    	}
    }
    	auditcreate.checkPlanApproval = function() {
    		auditcreate.Planapprovalmodel = true;
 		}
  }
})();