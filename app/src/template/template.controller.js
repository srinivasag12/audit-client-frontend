 (function (){
	'use strict';

	angular
	.module('app.template.menubar')
	.controller('TemplateController', TemplateController)
	.controller('resetPasswordController',resetPasswordController)
	.controller('emailPopupController',emailPopupController);

	 function TemplateController($stomp, ModalService,$scope,masterFactory,BASE_URL,blockUI, $rootScope, $state, $cookieStore,$timeout,$interval,$window,$location,$cookies,$http,auditType,AppConstant,toaster,allFindingCategory,BASE_URL_LOGIN,auditService,detailsFactory,YYYYMMDD,MMMDDYYYY){

		var tm = this;console.log(tm);
		
		var auditNavigationLength;

		$rootScope.$state=$state;    	  	   

		tm.AppConstant = AppConstant;

		var emailId = sessionStorage.getItem("emailId");

		tm.userRoleId = sessionStorage.getItem("userRoleId");

		tm.companyName= sessionStorage.getItem("companyName") ? sessionStorage.getItem("companyName") : 'MARSHALL ISLANDS';

		tm.usrResult= sessionStorage.getItem("usrResult");

		$rootScope.userPassword=auditService.getAuthorization();

		tm.userEmail=sessionStorage.getItem("usrResultEmail");
		
		$rootScope.usrname=sessionStorage.getItem("usrname");
		
		var companyId =sessionStorage.getItem("companyId");
		
		tm.certWithOutAudit = certWithOutAudit;
		
		tm.arrVal = [];
		
		tm.prevAduditCycleData=[]
		
		tm.clearCycleData = clearCycleData;
		
		tm.userSearch = userSearch;
		
		tm.support = support;
		
		tm.currentCycleData;
		tm.allCycleData;
		
		tm.tempCycleGenNo=[];
		tm.currCycleGenNo;
		tm.currPos;
		tm.currentAuditCycle;
		
		
		tm.onlyIhm = false;
		tm.ihmReviewer = false;
		tm.planApprovalReview = false;
		
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	
    	if(res && res.length>0 && res[0].ihmreview==1 || res[0].roleId == AppConstant.ADMIN_ROLE_ID){  //Added by sudharsan for Jira-ID=5499
    		tm.ihmReviewer = true;
    		if((res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
    			tm.onlyIhm = true; 
    		}
    	 }
    	
    	if(res && res.length>0 && res[0].planApprovalReview == 1 || res[0].roleId == AppConstant.ADMIN_ROLE_ID){  //Added by sudharsan for Jira-ID=5499
    		tm.planApprovalReview = true;
    		if((res[0].ihmreview==0 || !res[0].ihmreview ) && (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
    			tm.onlyPlanAccepted= true; 
    		}
    	 }
    	
    	if(res && res.length>0 && (res[0].ismreview==1 || res[0].mlcreview==1 || res[0].ispsReview==1)){
    		tm.smcUser=true;
    	}
    	
    	
    	});
		 
		
	//tm.auditCycleDataNavigation = auditCycleDataNavigation();
		
	/*	tm.test = test;
		
		test();
		
		function test(){
			console.log(pdfMake);
			
			
			var dd = {
					content: [
						
						
						{
					columns: [
					     {
				            width:'45%',
							text: 'Republic of the Marshall Islands',
							style: 'headerLeft'
						},
				       {
				            width:'45%',
							text: 'Republic of the Marshall Islands',
							style: 'header'
						},	
						{   
				            width:'10%',
						    qr: 'https://localhost:8888/certificate/viewer/2/RPA59HPL19' ,
						    fit: 80
						}
				             ]
						},{
							image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAMDklEQVR4Xu2dach1VRmGL82pMDNNy8ohLSmHimxUQ60wwkItwyKHEgvNfphBEOGUiRVNEFhmWWSGaaQ2/dAUtT5Nk2iwQbRyCFGynLIPc4oH9ocv6veeZ+3hPXudfS04nB/nXms/61oPN3vvs4Z1sEhAAhKohMA6lcRpmBKQgATQsEwCCUigGgIaVjVDZaASkICGZQ5IQALVENCwqhkqA5WABDQsc0ACEqiGgIZVzVAZqAQkoGGZAxKQQDUENKxqhspAJSABDcsckIAEqiGgYVUzVAYqAQloWOaABCRQDQENq5qhMlAJSEDDMgckIIFqCGhY1QyVgUpAAhqWOSABCVRDQMOqZqgMVAIS0LDMAQlIoBoCGlY1Q2WgEpCAhmUOSEAC1RDQsKoZKgOVgAQ0LHNAAhKohoCGVc1QGagEJKBhmQMSkEA1BDSsaobKQCUgAQ3LHJCABKohoGFVM1QGKgEJaFjmgAQkUA0BDauaoTJQCUhAwzIHJCCBaghoWNUMlYFKQAIaljkgAQlUQ0DDqmaoDFQCEtCwzAEJSKAaAhpWNUNloBKQgIZlDkhAAtUQ0LCqGSoDlYAENCxzQAISqIaAhlXNUBmoBCSgYZkDEpBANQQ0rGqGykAlIAENyxyQgASqIaBhVTNUBioBCWhY5oAEJFANAQ1rfEP1GHAP8ADwn+b7XuBW4Ebgr83nBuC+8YVvRBIYjoCGNRzbti2HYWXLzcAVwJXN56ZsRXUSqJGAhjW+USsxrCdGfxfwY+Bc4OLxdc2IJNCNgIbVjd8QtbsY1tJ47gC+D3wPuHaIQG1TAitNQMNaaeKzr9eXYS290m+BU4EfAo/ODkGFBMZJQMMa37gMYVhrevkX4DTgHOCR8XXdiCSwPAENa3wZMqRhrelt/MP4YeCy8XXfiCSwdgIa1viyYyUMa02v4xHxWOC28WEwIgk8mYCGNb6sWEnDit6vbh4TPwc8OD4cRiSBxwloWOPLhpU2rDUE/gy8C4hviwRGSUDDGuWwsCWwyZLPC4Gtl3xeDmwzQOj/BY4Czh6gbZuUQGcCGlZnhHNr4PnAnsDewL7ADj1GchbwkeZxscdmbUoC3QhoWN34jan27sBhwMHApj0EFnO3wgj/2UNbNiGBXghoWL1gHF0j7wdOBLbrGFmsVXwbEPO3LBKYOwENa+5DMFgA6wEfAI5v3n21vVDsFBGmdXXbBqwngb4IaFh9kRx3O8cBJwMbdwgzHjXP61DfqhLoTEDD6oywmgae08y3OgJYt0XUMd0iTOv8FnWtIoFeCGhYvWCsqpH4ZzHulLZqEfXDwFtd0tOCnFV6IaBh9YKxukae3cy12q9F5LET6pvcsqYFOat0JqBhdUZYdQMxSfSLwNMLexFbOL8eiEXUFgmsGAENa8VQj/ZCuwE/bzF3K6Y8xIz7+0fbMwNbOAIa1sINaasO7QRcAsTs+ZJyEXBASQW1EuhCQMPqQm+x6sbaxMuBFxV266PAlwvrKJdAKwIaVitsC1vpucBVwPaFPYz3WdcU1lEugWICGlYxsoWvEHdacWhFmFe2/A2Ix0r308oSU9eKgIbVCtvCV9qludN6ZkFPTwFOKNArlUAxAQ2rGNlkKsQE00uBDZI9fgjY1akOSVrKWhHQsFphm0ylI4EzC3ob77/2KNArlUARAQ2rCNckxXFQxYEFPY+1it8q0CuVQJqAhpVGNVlhvMf6fcHeWrHhX2zp/L/JErPjgxHQsAZDu1ANx26mqwp6FEt+zijQK5VAioCGlcKkCPg2cHiSRCzbiT3mH03qlUkgRUDDSmFSBMR+WjcWrDk8BDhHchLok4CG1SfNxW/rg8DXk928vlkcPa9zFpNhKquJgIZV02jNP9bIlziQYsdkKHsBVya1yiQwk4CGNRORgicQiIMt4tzCTPkacHRGqEYCGQIaVoaSmqUE4jSeW5Jb0dwNbAE8IkIJ9EFAw+qD4vTaOBb4UrLbbwd+mtQqk8CyBDQsE6QNgZhM+i9g/UTl+Kcw/jG0SKAzAQ2rM8LJNpBdshNbKG8yWUp2vFcCGlavOCfV2EEFZxTG3u9/mBQdOzsIAQ1rEKyTaDQeB+OxMLNn1jHA6ZOgYicHJaBhDYp34Ru/ENg/0ctzgfcmdEok4Et3c2AwAh8DPp9o/XbgBQmdEgloWObAYAReW3D4RMzHumuwSGx4EgR8JJzEMA/WyZhEGv8CbpS4whuAXyV0SiSwVgIalsnRlUCY0OsSjbh7QwKSkuUJaFhmSFcC3wXel2jkJODkhE6JBLzDMgcGI3AiEGY0q5wNHDZL5O8SWI6Ad1jmR1cCcXcVd1mzyiXAvrNE/i4BDcscGJLAPsBliQtcDcTe8BYJtCbgHVZrdFZsCOwGXJegEUtzYomORQKtCWhYrdFZsSHw4mav91lA/g5sP0vk7xLwkdAcGJLAlsCdiQvEeYWhtUigNQHvsFqjs2JDICaNrk7QCM0zEjolElgrAQ3L5OhKYAPgwUQjcRL0hgmdEgloWObAYAQ2a7aZmXWBfwObzxL5uwR8h2UODElgm+ZQilnXuBXYdpbI3yWgYZkDQxLYCfhj4gJ/AnZO6JRIwEdCc2AwArHwObMLw7XJRdKDBWrD9RPwpXv9YzjvHhwAXJAI4lLgLQmdEgl4h2UODEbg48BnE63HesNDEzolEtCwzIHBCHwTOCLReuzq8KmETokENCxzYDACvwD2TLQeh1DEYRQWCbQm4Dus1uisCKwL3AtsnKARi6R/k9ApkYB3WObAIAReDfw62XIs4cnMiE82p2yKBLzDmuKo99fn7DFfNwI79ndZW5oqAQ1rqiPfT79/BLwj0VS8mD8yoVMigWUJaFgmSFsC8Yh3d/KIr8OB77S9kPUksIaAhmUutCVwcMG/ftsl1xu2jcV6EyGgYU1koAfo5oXA/ol27wC2SuiUSGAmAQ1rJiIFT0EgpjHEdjHrJ+icDhyT0CmRwEwCGtZMRAqegsBxwBeSZGJS6aqkVpkEliWgYZkgpQTWA2Jvq8xj3j+ArUsvoF4CayOgYZkbpQRi3WBMU8iUzwCfyAjVSCBDQMPKUFKzhkDkyw3AS5JI4hzCOI/QIoFeCGhYvWCcTCMx+fPMZG+vAvZIapVJIEVAw0phUgRsCsRhqPGdKfsBP8sI1UggS0DDypJS91XgqCSG2ON9l6RWmQTSBDSsNKpJC3cFfgdk88W9ryadLsN1PpuAw0Vgy2MnEKc1Xwe8LBnoLcD2wKNJvTIJpAloWGlUkxWeDxxU0Pt3Az8o0CuVQJqAhpVGNUnhh4AzCnp+ObBPgV6pBIoIaFhFuCYl3hu4BIiZ7ZkSu4nGY2P8k2iRwCAENKxBsFbf6CuAmEcV76+y5QTglKxYnQTaENCw2lBb7DrxwjxOad68oJvxD2Ls7/5wQR2lEigmoGEVI1voCs8DrgZiw71suQ+IO7KbsxXUSaAtAQ2rLbnFq7ctcAUQ3yUljqq/qKSCWgm0JaBhtSW3WPVeCVwMbFHYLTfnKwSmvBsBDasbv0WovVez5q/kBXv0O95bvQZ4aBEg2Ic6CGhYdYzTUFHGuYKnJbc6XhrDncCrgNuHCsx2JfBUBDSsaebFs4DzgH1bdP9+YHfg+hZ1rSKBTgQ0rE74qqy8G3BBy62LY9pCzGT/ZZU9N+jqCWhY1Q9hugNxV3Vqs0XM09K1Hhc+BsRZhLG20CKBuRDQsOaCfUUvGuZ0NHAysFnLK8ed1aEFB6e2vIzVJLA8AQ1rcTNkXeAQ4JPAjh26uRqIuVYx7cEigbkS0LDmin+Qi8f0hHcCJwE7dLzCPUBsdRzrCi0SmDsBDWvuQ9BLADHh88Dm6Pg3Axv20GqcjhNH0ce3RQKjIKBhjWIYioOItX5xovIbm+/Y1qXPsfwJ8B7ggeLIrCCBAQn0meQDhjmppjcCNlnyiX/3Xtoc6rBzs9A4e3JNG3DHA59uU9E6EhiagIY1NOHy9mP6wDxK7LYQL+lXzePiXlMCGQIaVobSympW2rDisIivNEfKxz+CFgmMloCGNb6hWUnDuqm5q7pmfBiMSAJPJqBhjS8rVsKwbmsWPX/D3RbGlwBGtHYCGtb4smNIw4ozA2N3hrM0qvENvBHNJvB/k80Rpq2wa+4AAAAASUVORK5CYII=',
						//	image: test(),
							width: 150
						}
					],
					styles: {
						header: {
							fontSize: 14,
							alignment:'center',
							font:'Times',
							bold:true
						},
						headerLeft:{
							fontSize: 14,
							alignment:'center',
							font:'Roboto',
							bold:true
						}
					    
					}
					
				}

			
			 pdfMake.createPdf(dd).download('testdoc.pdf');
		}*/
		
		
		function userSearch(){
			$state.go('app.userSearch',{},{ reload: true });
		}
		
		function support(){
			$state.go('app.support',{},{ reload: true });
		}
		 
		
		function certWithOutAudit(val){
			
			sessionStorage.removeItem("certificateSeachType");
			sessionStorage.removeItem("certAuditSeqNo");
			sessionStorage.removeItem("certCompanyId");
			sessionStorage.removeItem("certUTN");
			sessionStorage.removeItem("certSeqNo");
			sessionStorage.setItem('certificateSeachTypes','dashBoard' );
			sessionStorage.setItem('withOutAdtCertificateData','' );
			if(val=="smc") {
				$state.go('app.certificate.details',{'certificate':'withOutAudit'},{ reload: true });
			} else {
				$state.go('app.certificate.detailsihm',{'certificate':'withOutAudit'},{ reload: true });
			}
		 }


		tm.settings=function()
		{
			$state.go('app.config',{},{ reload: true });
		}



		$rootScope.$on('profilepic', function(event,data)
				{
			if(data!=null)
				$scope.phoImage=data;
				$scope.imageValue=data;
				});
		
		



		$rootScope.$on('displayName', function(event,data)
				{
			if(data!=null)
				$scope.usrname=data.toUpperCase();
			
				});

		tm.downloadSoft = function(){
			$window.location.href = BASE_URL_LOGIN+'download/file/ShipboardApplication.exe';
		}
		
		tm.userManulDownload=function(){
			$window.location.href = BASE_URL_LOGIN+'download/file/Audit_User_Manual.pdf';	 //Changed by sudharsan for JIRA-id 5317 on 14-06-2022
		}
		
		tm.userManulDownloadIhm=function(){
			$window.location.href = BASE_URL_LOGIN+'download/file/IHM_User_Manual.pdf';	  //Changed by sudharsan for JIRA-id 5317 on 14-06-2022
		}
		//Changed by sudharsan for JIRA-id 5317 on 14-06-2022
		tm.userManulDownloadPA=function(){
			$window.location.href = BASE_URL_LOGIN+'download/file/Plan_Approval_User_Manual.pdf';	 
		}
		//End here

		/* Start section for downloading laptop application from Central Server */
		$rootScope.laptopURL = function(){
			tm.logout();
			$window.open('https://auditingapp.shipboard.bsolsystems.com/login');
		}

		tm.downloadFiles = function(blob,fileName){

			if (window.navigator.msSaveOrOpenBlob) { // For IE:
				navigator.msSaveBlob(blob, fileName);

			} else { // For other browsers:   
				var link = document.createElement('a');
				link.style = "display: none"; 
				link.href = window.URL.createObjectURL(blob);  
				document.body.appendChild(link);
				link.download = fileName;    
				//link.click();
				link.click();
				setTimeout(function(){
					document.body.removeChild(link);
					window.URL.revokeObjectURL(link.href);  
				}, 1000);  
			}
		}    
		/* End section for downloading laptop application from Central Server */


		
		
		/** * Reset Password ** */
		tm.resetPassword = function() {
			ModalService.showModal({
				templateUrl : 'src/modals/resetPassword.html',
				controller : "resetPasswordController as pas",
				inputs : {
					scope : $scope,
					userPassword : $rootScope.userPassword,
					userEmail : tm.userEmail
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
				});
			});
		}

		tm.countFindingCategory = {
				auditTypeId  : 0,
				majorDesc 	 : "",
				majorPrevCnt : 0,
				majorCurrCnt : 0,
				minorDesc    : "",
				minorPrevCnt : 0,
				minorCurrCnt : 0,
				obsDesc      : "",
				obsPrevCnt   : 0,
				obsCurrCnt   : 0,
				reviewNoteCount : 0
		};




		var preLang=sessionStorage.getItem("langKey");

		tm.clearSession = function(auditTypeId){

			var auditDtl = '';
			
			masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
				
				if(auditTypeId==tm.AppConstant.ISM_TYPE_ID){
					
					auditDtl = 'ISM Audit'
							
					if(res.length>0 && res[0].ismreview == tm.AppConstant.ISPS_REVIEW_OK){
						
						sessionStorage.removeItem("auditSeqNo");
				//		sessionStorage.removeItem("companyId");
						$window.sessionStorage.setItem("auditTypeId",auditTypeId);
						$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
						
					}else{
						toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
					}
					
				}else if(auditTypeId==tm.AppConstant.MLC_TYPE_ID || auditTypeId==tm.AppConstant.DMLC_TYPE_ID){
				
					auditDtl = (auditTypeId==tm.AppConstant.MLC_TYPE_ID) ? 'MLC Inspection' : (auditTypeId==tm.AppConstant.DMLC_TYPE_ID) ? 'DMLC Review' :'';
					
					if(res.length>0 && res[0].mlcreview == tm.AppConstant.ISPS_REVIEW_OK){
						
						sessionStorage.removeItem("auditSeqNo");
				//		sessionStorage.removeItem("companyId");
						$window.sessionStorage.setItem("auditTypeId",auditTypeId);
						$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
					
					}else{
						toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
					}
					
				}else if(auditTypeId==tm.AppConstant.ISPS_TYPE_ID || auditTypeId==tm.AppConstant.SSP_TYPE_ID){
					
					auditDtl = (auditTypeId==tm.AppConstant.ISPS_TYPE_ID) ? 'ISPS Audit' : (auditTypeId==tm.AppConstant.SSP_TYPE_ID) ? 'SSP Review' :'';
					
					if(res.length>0 && res[0].ispsReview == tm.AppConstant.ISPS_REVIEW_OK){
						
						sessionStorage.removeItem("auditSeqNo");
					//	sessionStorage.removeItem("companyId");
						$window.sessionStorage.setItem("auditTypeId",auditTypeId);
						$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
						
					}else{
						toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
					}
					
				}else if(auditTypeId==tm.AppConstant.IHM_TYPE_ID){
					auditDtl = 'IHM Part I Review';
					masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
						
						if(res.length>0 && res[0].ihmreview == tm.AppConstant.IHM_REVIEW_OK){

							sessionStorage.removeItem("auditSeqNo");
					//		sessionStorage.removeItem("companyId");
							$window.sessionStorage.setItem("auditTypeId",auditTypeId);

							$state.go('app.audit.detailsIhm',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
						}else{
							toaster.clear();
							toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
						}
					});
				}else if(auditTypeId==tm.AppConstant.SOPEP_TYPE_ID || auditTypeId==tm.AppConstant.STS_TYPE_ID 
						|| auditTypeId==tm.AppConstant.SMPEP_TYPE_ID || auditTypeId==tm.AppConstant.BWS_TYPE_ID 
						|| auditTypeId==tm.AppConstant.VOC_TYPE_ID || auditTypeId==tm.AppConstant.SDR_TYPE_ID 
						|| auditTypeId==tm.AppConstant.COW_TYPE_ID  ){
					auditDtl = 'Plan Approval';
					masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
						
						if(res.length>0 && res[0].planApprovalReview == tm.AppConstant.PLAN_APPROVAL_REVIEW_OK){

							sessionStorage.removeItem("auditSeqNo");
					//		sessionStorage.removeItem("companyId");
							$window.sessionStorage.setItem("auditTypeId",auditTypeId);
				    		$state.go('app.audit.detailsPlanApproval',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
						}else{
							
							toaster.warning("Sorry, You aren't authorized for the "+auditDtl);
						}
					});
				}
				
				else if(auditTypeId>=1007 && auditTypeId<=1013){
					$window.sessionStorage.setItem("auditTypeId",auditTypeId);
		    		$state.go('app.audit.detailsPlanApproval',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
					
					
					}else{

					sessionStorage.removeItem("auditSeqNo");
				//	sessionStorage.removeItem("companyId");
					$window.sessionStorage.setItem("auditTypeId",auditTypeId);
					$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
				}
			});
		}

		tm.ShowAuditCycle = function($event){
			
	        if(tm.initialStartDate || tm.nextIntermediateStart || tm.nextRenewalStart){
			angular.element($event.currentTarget.offsetParent).addClass('open');
			}else { toaster.info("Audit Cycle hasn't yet created");}

		}
           tm.showfindcategorystatus = function($event){
			
			angular.element($event.currentTarget.offsetParent).addClass('open');
		}	
		//Added by sudharsan for JIRA-ID=   on 16-06-2022
		tm.fileDownload_validation=function(){
				masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
			if(res[0].planApprovalReview == 1 || res[0].roleId == AppConstant.ADMIN_ROLE_ID){ //Added by sudharsan for Jira-ID=5499
				tm.planApprovalReview = true;
			 }
			 else{
				tm.planApprovalReview = false;
			 }
			});
		}
		//End here JIRA-ID=

		tm.fileDownload=function($event){
			console.log("ddddddd",$event);
			angular.element($event.currentTarget.offsetParent).addClass('open');
		}
		tm.hidefileDownload=function($event){
			var val=angular.element($event.currentTarget.offsetParent).hasClass('open');
			if(val == true){
				angular.element($event.currentTarget.offsetParent).removeClass('open');
			}
		}; 
//$rootScope.$on('setAuditCycle', function(event,data1,data)
	
		
		tm.hidefindcategorystatus =function($event){
					 
					//tm.countFindingCategory.auditTypeId  findingCategoryCount.auditTypeId
 					//console.log("tm.countFindingCategory.auditTypeId"+tm.countFindingCategory.auditTypeId);
					
				
			var val=angular.element($event.currentTarget.offsetParent).hasClass('open');
			if(val == true){
				angular.element($event.currentTarget.offsetParent).removeClass('open');
			}
		}; 
		//('setAuditCycle', function(event,data1,data)
		/*  auditCycleDataNavigation=function(event,data1,data){
			 alert("back");
			console.log(data2);
			console.log(data1);
		};*/
		
		
		var statelogin=sessionStorage.getItem('statelogin');
		/*
    	if(!statelogin){
    		$state.go('login',{},{reload:true});
    	}
		 */
		tm.logout = function(){ 
			/*$http.get('/api/logoutApp/').then(function(res){

    		});*/
		  
			
		

			masterFactory.getCountOfLockedAuditByCurrUser(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){

				var access_token =	sessionStorage.getItem('authToken');
				console.log(access_token);
				var req = {
						method: 'GET',
						url:BASE_URL_LOGIN+"oauth/revoke?username="+sessionStorage.getItem("emailId")+"&companyId="+sessionStorage.getItem('companyId')
				}

				$http(req).then(function(removeToken) {


					/*if(res.lockCount>0){

					ModalService.showModal({

		    			templateUrl : 'src/modals/deleteAttachment.html',

		    			controller  : 'removeReportController',

		    			inputs		: {data:'logout'},

		    		}).then(function(modal) {

		    			modal.element.modal();

		    			modal.close.then(function(result) {

		    				if(result=='YES'){
		    					sessionStorage.removeItem('auditSrchData');
		    					sessionStorage.setItem('logout',true);
		    					$state.go('app.audit.search',{'currPageNo':1,'logout':true},{reload:true});

		    				}else if(result=='NO'){

		    					sessionStorage.clear();
		    		    		sessionStorage.removeItem("authToken");
		    		    		sessionStorage.removeItem("companyId");
		    		    		sessionStorage.removeItem("userSequenceNo");
		    		    		sessionStorage.removeItem('userRoleId');
		    		    		sessionStorage.removeItem("usrResult");
		    		    		sessionStorage.removeItem("phoImage");
		    		    		$state.go('login',{},{reload:true});
		    				}
		    			});

		    		});
				}else{*/

					if(removeToken.status == 200)
					{
//						if(res.lockCount==0){
							$state.go('login',{},{reload:true});
							sessionStorage.clear();
							sessionStorage.removeItem("authToken");
							//sessionStorage.removeItem("companyId");
							sessionStorage.removeItem("userSequenceNo");
							sessionStorage.removeItem('userRoleId');
							sessionStorage.removeItem("companyName");
							sessionStorage.removeItem("usrResult");
							sessionStorage.removeItem("phoImage");
							sessionStorage.removeItem('ImoNum');
							sessionStorage.removeItem('VeslNme');
							sessionStorage.removeItem("companyId");
							sessionStorage.removeItem('emailId');
							sessionStorage.removeItem("userId");
							sessionStorage.removeItem("usrResultEmail");
							sessionStorage.removeItem('usrname');
							sessionStorage.removeItem('managerRegion');
							auditService.clearAuthSession();						
//						}
						
						$stomp.disconnect().then(function () {
					          console.log('disconnected')
					        })

					}

				},function(errorResponse) {


				});  		

			});





		}    	   	

		tm.gotoMainPage = function(){
			$state.go('app.mainpage',{},{reload:true});
		}; 

		/*    	tm.title=((($state.current.data.pageTitle != 'Audit')==true)?"Dashboard":"CREATE ISM");*/

		tm.reloadScreen = function(val){

			switch(val){
			case 'Dashboard':
				$state.go('app.dashboard',{},{reload:true});
				break;
			case 'CREATE ISM':	
				$state.go('app.audit.ism',{},{reload:true});
				break;

			default:
				break;

			}		
		};		

		$scope.changePassword= function(){}

		$scope.changeProfilePic= function(){}

		/*$rootScope.$on("setCountFindingCategory",function(event,newFindCategoryCount,prevFindingCategoryCount,auditTypeId){

    		tm.countFindingCategory = {
    					'auditTypeId'     : auditTypeId,

    					'majorDesc'       : _(allFindingCategory).chain().where({'auditTypeId':auditTypeId,'findingsCategoryId':tm.AppConstant.MAJOR_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString(),

    					'majorPrevCnt'    : prevFindingCategoryCount.majorCount ? prevFindingCategoryCount.majorCount : 0,

    					'majorCurrCnt'    : newFindCategoryCount.majorCount ? newFindCategoryCount.majorCount : 0,

    					'minorDesc'       : _(allFindingCategory).chain().where({'auditTypeId':auditTypeId,'findingsCategoryId':tm.AppConstant.MINOR_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString(),

    					'minorPrevCnt'    : prevFindingCategoryCount.minorCount ? prevFindingCategoryCount.minorCount : 0,

    					'minorCurrCnt'    : newFindCategoryCount.minorCount ? newFindCategoryCount.minorCount : 0,

    					'obsDesc'         : _(allFindingCategory).chain().where({'auditTypeId':auditTypeId,'findingsCategoryId':tm.AppConstant.OBS_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString(),

    					'obsPrevCnt'      : prevFindingCategoryCount.obsCount ? prevFindingCategoryCount.obsCount : 0,

    					'obsCurrCnt'      : newFindCategoryCount.obsCount ? newFindCategoryCount.obsCount : 0,

    					'reviewNoteDesc'  : _(allFindingCategory).chain().where({'auditTypeId':auditTypeId,'findingsCategoryId':tm.AppConstant.REVIEW_NOTE}).pluck('findingsCategoryDesc').toString(),

    					'reviewNoteCount' : newFindCategoryCount.reviewNoteCount ? newFindCategoryCount.reviewNoteCount : 0
    				};

    	});*/

		$rootScope.$on("setCountFindingCategory",function(event,findingCategoryCount){

			if(findingCategoryCount.auditTypeId != tm.countFindingCategory.auditTypeId){

				tm.countFindingCategory = {
						auditTypeId  : findingCategoryCount.auditTypeId,
						majorDesc 	 : _(findingCategoryCount.categoryArray).chain().where({'auditTypeId':findingCategoryCount.auditTypeId,'findingsCategoryId':tm.AppConstant.MAJOR_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString(),
						majorPrevCnt : findingCategoryCount.param == "PREV" ? findingCategoryCount.majorCount : 0,
								majorCurrCnt : findingCategoryCount.param == "CURR" ? findingCategoryCount.majorCount : 0,
										minorDesc    : _(findingCategoryCount.categoryArray).chain().where({'auditTypeId':findingCategoryCount.auditTypeId,'findingsCategoryId':tm.AppConstant.MINOR_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString(),
										minorPrevCnt : findingCategoryCount.param == "PREV" ? findingCategoryCount.minorCount : 0,
												minorCurrCnt : findingCategoryCount.param == "CURR" ? findingCategoryCount.minorCount : 0,
														obsDesc      : _(findingCategoryCount.categoryArray).chain().where({'auditTypeId':findingCategoryCount.auditTypeId,'findingsCategoryId':tm.AppConstant.OBS_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString(),
															obsPrevCnt   : findingCategoryCount.param == "PREV" ? findingCategoryCount.obsCount : 0,
																obsCurrCnt   : findingCategoryCount.param == "CURR" ? findingCategoryCount.obsCount : 0,
																		reviewNoteDesc : _(findingCategoryCount.categoryArray).chain().where({'auditTypeId':findingCategoryCount.auditTypeId,'findingsCategoryId':tm.AppConstant.REVIEW_NOTE}).pluck('findingsCategoryDesc').toString(),
																		reviewNoteCount : findingCategoryCount.reviewNoteCount 
				};
			}else{
				if(findingCategoryCount.param == "CURR"){
					tm.countFindingCategory.majorCurrCnt = findingCategoryCount.majorCount;
					tm.countFindingCategory.minorCurrCnt = findingCategoryCount.minorCount;
					tm.countFindingCategory.obsCurrCnt = findingCategoryCount.obsCount;
					tm.countFindingCategory.reviewNoteCount = findingCategoryCount.reviewNoteCount;
				}
				else if(findingCategoryCount.param == "PREV"){
					tm.countFindingCategory.majorPrevCnt = findingCategoryCount.majorCount;
					tm.countFindingCategory.minorPrevCnt = findingCategoryCount.minorCount;
					tm.countFindingCategory.obsPrevCnt = findingCategoryCount.obsCount;
					//tm.countFindingCategory.reviewNoteCount = findingCategoryCount.reviewNoteCount;
				}
			}
		});
		
		tm.auditCycleData = function(){
			var data = tm.allCycleData[tm.currPos];
		//	console.log(data); console.log(tm);
			if(data){
			if(data && data.auditSubTypeIdForcyle){
			tm.auditSubTypeIdToCycle = data.auditSubTypeIdForcyle?data.auditSubTypeIdForcyle:'-';}
			tm.nextIntermediateStart = data.nextIntermediateStart?moment(data.nextIntermediateStart,YYYYMMDD).format(MMMDDYYYY):'-';
		    tm.intermediateDueDate = data.intermediateDueDate?moment(data.intermediateDueDate,YYYYMMDD).format(MMMDDYYYY):'-';
		    
			tm.nextIntermediateEnd = data.nextIntermediateEnd?moment(data.nextIntermediateEnd,YYYYMMDD).format(MMMDDYYYY):'-';
			tm.nextRenewal = data.nextRenewal?moment(data.nextRenewal,YYYYMMDD).format(MMMDDYYYY):'-';
			tm.nextRenewalDueDate = data.nextRenewalDueDate?moment(data.nextRenewalDueDate,YYYYMMDD).format(MMMDDYYYY):'-';
			
			tm.initialStartDate = data.creditDate?moment(data.creditDate,YYYYMMDD).format(MMMDDYYYY):'-';
			//console.log(data);
			tm.nextRenewalStart = (data.nextRenewalStart && data.nextRenewalStart!='-') ? moment(data.nextRenewalStart,YYYYMMDD).format(MMMDDYYYY):'-';
		//	console.log(tm.nextRenewalstat);
			
			
			tm.initilOrRenewal = (data.auditSubTypeCycleGen && data.auditSubTypeCycleGen==1004 ) ?'RENEWAL':'INITIAL'; 
		//	console.log(tm.initialAuditCycleData);
			if(!tm.directRenewalAuditCycleData){
				tm.renewalTemp = (data.auditSubTypeCycleGen!=1004) ? '1':'';
				tm.cycleGenNo= data.cycleGenNo ? (data.cycleGenNo+1):'';
				tm.cycleGenNo1= data.cycleGenNo ? (data.cycleGenNo):'';
			}else if(tm.directRenewalAuditCycleData){
				tm.cycleGenNo4= data.cycleGenNo ? (data.cycleGenNo):'';
				tm.cycleGenNo1= data.cycleGenNo ? (data.cycleGenNo):'';
				tm.cycleGenNo3= data.cycleGenNo ? (data.cycleGenNo+1):'';
			}
			//tm.nextRenewalstat = (tm.nextRenewal && tm.nextRenewal!='-') ? moment(data.nextRenewal,YYYYMMDD).subtract(1,'days').format(MMMDDYYYY):'-';
			if(data.auditSubTypeId==1004 || data.auditSubTypeId==1003 ){
				tm.initialOrRenwal = 'RENEWAL';
			//	tm.initialStartDate='-';
				
			}else{
				tm.initialOrRenwal = 'INITIAL';
				tm.renewalTemp1 = (data.auditSubTypeCycleGen!=1004) ? '1':'';
				 
			}
			
			tm.initialSkip = (tm.initialStartDate =='-' && ( tm.nextRenewal!='-' || tm.nextIntermediateStart!='-'  )) ? 0 : 1;
			tm.interSkip =  (tm.nextIntermediateStart =='-' && ( tm.nextRenewal!='-'  ||tm.initialStartDate!='-'   )) ? 0 : 1;
			tm.renewalSkip = (tm.nextRenewal =='-' && ( tm.nextIntermediateStart!='-'  ||tm.initialStartDate!='-'   )) ? 0 : 1;
			
		}
					
				}
		
		$rootScope.$on('setAuditCycle', function(event,allCycleData,dirInterAndAdditionalAudit,currentCycle,AuditOrInspection)		//Changed by ramya for jira ID-->5194
				{ 
			 
			tm.AuditOrInspection = (AuditOrInspection=='AuditOrInspection')?true:false;
			tm.currentCycleData = currentCycle;
			tm.dirInterAndAdditionalAudit=dirInterAndAdditionalAudit;
		//	 console.log(tm.allCycleData);
			tm.allCycleData = _.sortBy(allCycleData, 'cycleGenNo');
			
			// console.log(tm.currentCycleData);
			// console.log(dirInterAndAdditionalAudit);
			 
			//  tm.dirInterAndAdditionalAudit= tm.dirInterAndAdditionalAudit.cycleGenNo ? tm.dirInterAndAdditionalAudit.cycleGenNo:'';
			if(tm.allCycleData.length>0 && tm.dirInterAndAdditionalAudit)
			tm.dirInterAndAdditionalAudit= tm.dirInterAndAdditionalAudit.cycleGenNo ? tm.dirInterAndAdditionalAudit.cycleGenNo:tm.allCycleData[tm.allCycleData.length-1].cycleGenNo; 	//added by ramya for jira id-->IRI-5267
			 tm.currentAuditCycle= tm.currentCycleData.cycleGenNo;
			 
 			 tm.firstAuditCycle= _.min(tm.allCycleData, function(find){  return   find.cycleGenNo; });
			 tm.lastAuditCycle= _.max(tm.allCycleData, function(find){  return   find.cycleGenNo; });
 
			if(tm.firstAuditCycle.cycleGenNo == 1){
				tm.directRenewalAuditCycleData= true;
				tm.currCycleGenNo=  tm.dirInterAndAdditionalAudit;
			}else if(tm.firstAuditCycle.cycleGenNo == 0){
				 tm.currCycleGenNo=tm.dirInterAndAdditionalAudit;
			}
			for(var i=0;i<tm.allCycleData.length;i++){
				tm.tempCycleGenNo.push(tm.allCycleData[i].cycleGenNo);
				if(tm.allCycleData[i].cycleGenNo==tm.currCycleGenNo){
					tm.currPos=i;
				} 
			}
	 		var data;
			var data1 = tm.allCycleData[tm.currPos];
			//console.log(data1);
			if(data1){
				 if((data1.auditTypeId== tm.AppConstant.ISM_TYPE_ID ||data1.auditTypeId==tm.AppConstant.ISPS_TYPE_ID ||data1.auditTypeId==tm.AppConstant.MLC_TYPE_ID) && data1.cycleGenNo == 0){
					 data = tm.allCycleData[tm.currPos];
				 }else if(data1.cycleGenNo == tm.currCycleGenNo){
					 data = tm.allCycleData[tm.currPos];
				 }
				 else if(data1.cycleGenNo == tm.lastAuditCycle.cycleGenNo){
					 data = tm.allCycleData[tm.currPos];
				 }else{
					 data = tm.allCycleData[tm.currPos+1];
				 }
				if(data){
				if(data && data.auditSubTypeIdForcyle){
				tm.auditSubTypeIdToCycle = data.auditSubTypeIdForcyle?data.auditSubTypeIdForcyle:'-';}
				tm.nextIntermediateStart = data.nextIntermediateStart?moment(data.nextIntermediateStart,YYYYMMDD).format(MMMDDYYYY):'-';
				tm.intermediateDueDate = data.intermediateDueDate?moment(data.intermediateDueDate,YYYYMMDD).format(MMMDDYYYY):'-';
				
				tm.nextIntermediateEnd = data.nextIntermediateEnd?moment(data.nextIntermediateEnd,YYYYMMDD).format(MMMDDYYYY):'-';
				tm.nextRenewal = data.nextRenewal?moment(data.nextRenewal,YYYYMMDD).format(MMMDDYYYY):'-';
				tm.nextRenewalDueDate = data.nextRenewalDueDate?moment(data.nextRenewalDueDate,YYYYMMDD).format(MMMDDYYYY):'-';
				
				tm.initialStartDate = data.creditDate?moment(data.creditDate,YYYYMMDD).format(MMMDDYYYY):'-';
				//console.log(data);
				tm.nextRenewalStart = (data.nextRenewalStart && data.nextRenewalStart!='-') ? moment(data.nextRenewalStart,YYYYMMDD).format(MMMDDYYYY):'-';
				//console.log(tm.nextRenewalstat);
				tm.initilOrRenewal = (data.auditSubTypeCycleGen && data.auditSubTypeCycleGen==1004 ) ?'RENEWAL':'INITIAL'; 
				 
				if(!tm.directRenewalAuditCycleData){
					tm.renewalTemp = (data.auditSubTypeCycleGen!=1004) ? '1':'';
					tm.cycleGenNo= data.cycleGenNo ? (data.cycleGenNo+1):'';
					tm.cycleGenNo1= data.cycleGenNo ? (data.cycleGenNo):'';
				}else if(tm.directRenewalAuditCycleData){
					tm.cycleGenNo4= data.cycleGenNo ? (data.cycleGenNo):'';
					tm.cycleGenNo1= data.cycleGenNo ? (data.cycleGenNo):'';
					tm.cycleGenNo3= data.cycleGenNo ? (data.cycleGenNo+1):'';
				}
				 
				//tm.nextRenewalstat = (tm.nextRenewal && tm.nextRenewal!='-') ? moment(data.nextRenewal,YYYYMMDD).subtract(1,'days').format(MMMDDYYYY):'-';
				if(data.auditSubTypeId==1004 || data.auditSubTypeId==1003 ){
					tm.initialOrRenwal = 'RENEWAL';
				//	tm.initialStartDate='-';
					
				}else{
					tm.initialOrRenwal = 'INITIAL';
					tm.renewalTemp1 = (data.auditSubTypeCycleGen!=1004) ? '1':'';
				}
				tm.initialSkip = (tm.initialStartDate =='-' && ( tm.nextRenewal!='-' || tm.nextIntermediateStart!='-'  )) ? 0 : 1;
				tm.interSkip =  (tm.nextIntermediateStart =='-' && ( tm.nextRenewal!='-'  ||tm.initialStartDate!='-'   )) ? 0 : 1;
				tm.renewalSkip = (tm.nextRenewal =='-' && ( tm.nextIntermediateStart!='-'  ||tm.initialStartDate!='-'   )) ? 0 : 1;
			}
			}
				
		  
			
			});
		
		
		tm.auditCycleDataNavigationPrev = function(){
			var currPos=tm.currPos;
			tm.currPos--;
			for(var i=0;i<tm.tempCycleGenNo.length;i++){
			//	console.log(i);
				
				if(tm.currPos< i && i==0)
					{
					tm.currPos=currPos;
					toaster.info("No Previous Cycle");
					}
				else if(tm.currPos == i){
					tm.currPos=i;
				}
			}
				tm.auditCycleData();
		}
		
		tm.auditCycleDataNavigationNext = function(){
			var currPos=tm.currPos;
			tm.currPos++;
			for(var i=0;i<tm.tempCycleGenNo.length;i++){
				if(tm.currPos==i){
					tm.currPos=i;
				}
				else if(tm.currPos>tm.tempCycleGenNo.length){
					tm.currPos=currPos;
					toaster.info("No Next Cycle");
				}
			}
				tm.auditCycleData();
			
		}

		$rootScope.checkCount = function(mailCount){
			$scope.notifyLength = mailCount;
		}

		$scope.changeflag = function(jsonData){
			
			var notifyData ={
					"MAIL_SEQ_NO": jsonData.MAIL_SEQ_NO,
					"USERNAME": jsonData.USERNAME,				
					"EMAIL_SEQ": jsonData.EMAIL_SEQ,
					"COMPANY_ID":jsonData.COMPANY_ID
				};
			
			
			detailsFactory.notifyDetails(notifyData).$promise.then(function(res){
				
				ModalService.showModal({
					templateUrl : 'src/modals/emailPopup.html',
					controller : "emailPopupController as email",
					inputs : {
						emailData : res
					}
				}).then(function(modal) {
					modal.element.modal();
					modal.close.then(function(result) {
					});
				});
				
			});
		}
		
		$scope.getUserEmailDtls = function(){

			if($scope.notifyLength > 0){
				if($scope.notifyLength != tm.arrVal.length){
					detailsFactory.getNotifyEmailDetail(emailId, companyId).$promise.then(function(res){
						console.log(res)
						$scope.myArray = res;
						tm.arrVal = $scope.myArray;
					});
				}else{
					$scope.myArray = tm.arrVal;
				}
			}else{
				$scope.myArray = [];
			}
		}
		
		$scope.getVesselDeatilsUpdate = function(){

			alert();
		}
	 
		function clearCycleData(){
			//sessionStorage.setItem('auditCycleSearchBean', '');
		}
		
	}
	
	/** Email Pop Up **/
	function emailPopupController($scope,emailData,$rootScope){
		
		var email = this;
		email.fromMail = emailData.FROM_MAIL;
		email.subject = emailData.SUBJECT;
		email.message = emailData.MESSAGE;
	}
	
	
	/** *Reset Password** */
	function resetPasswordController($scope, close, userPassword, toaster,settings,
			masterFactory, userEmail,auditService,$rootScope) {
		var pas = this;
		pas.Username = userPassword;
		//console.log(pas.Username);
		pas.emaile = userEmail;
		pas.pass = "Password";
		
		pas.valPass = function(value) {
			var pass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
			if (value != null) {
				if (!pass.test(value)) {
					pas.showErrMsg = false;
					pas.showSuccessMsg = false;
					pas.showErrMsg = true;
					pas.alerterrMsg = "Password should be atleast 8 characters long and should contain one number,one character and one special character";
					pas.newPas = null;
					pas.confNewPas = null;
					return true;
				}
			}
		}
		pas.reset = function() {
			if (pas.oldPas == null) {
				pas.showErrMsg = false;
				pas.showSuccessMsg = false;
				pas.showErrMsg = true;
				pas.alerterrMsg = "Please Enter Old Password";
				pas.newPas = null;
				pas.confNewPas = null;
			} else if (pas.newPas !== pas.confNewPas || pas.newPas == null) {
				if (pas.newPas !== pas.confNewPas) {
					pas.showErrMsg = false;
					pas.showErrMsg = true;
					pas.alerterrMsg = "Confirm New Password should be same as New Password";
					pas.newPas = null;
					pas.confNewPas = null;
				} else if (pas.newPas == null) {
					pas.showSuccessMsg = false;
					pas.showErrMsg = true;
					pas.alerterrMsg = "Password Should not be empty";
				}
			} else if (pas.newPas == pas.oldPas || pas.confNewPas== pas.oldPas ) {

				pas.showErrMsg = false;
				pas.showErrMsg = true;
				pas.alerterrMsg = "New password should not be same as old password";
				pas.newPas = null;
				pas.confNewPas = null;

			}else if (pas.newPas == pas.confNewPas && pas.oldPas !== null) {
				$('.modal').modal('hide');
				$('.modal-backdrop').remove();
				 var all = {	
					 oldPwd:pas.oldPas,	
					 newPwd: pas.newPas,	
					 email:pas.emaile	
				 }	
				settings.updatePassword(all).$promise
			//	settings.updatePassword(pas.emaile, pas.newPas).$promise
				.then(function(res) {
					if (res.success == true) {
						pas.showErrMsg = false;
						pas.showSuccessMsg = true;
						toaster
						.success('Password Updated Successfully');
					//	pas.Username = pas.newPas;
					//	$rootScope.userPassword=pas.newPas;
					//	auditService.setAuthorization(pas.newPas);
					}
				});
			}
		}
		pas.alert = function() {
			pas.showErrMsg = false;
		}
	}

})();