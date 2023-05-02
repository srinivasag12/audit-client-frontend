/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name user.controller.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/user/user.controller.js $
**/
(function() {
	'use strict';

	angular.module('app.master.user').controller('UserController',
			UserController);

	function UserController($scope, $cookies, toaster, $http, userFactory,
			blockUI, $timeout, broadcastService, $q, domainName, emaile,
			$filter, $rootScope, $templateCache, masterFactory,AppConstant,ModalService) {

		var user = this; console.log(user);
		user.onlyPlanApproval = false;
		user.planApproval = false;
		var companyId = sessionStorage.getItem("companyId");
		var loggedInUser = sessionStorage.getItem("usrResultEmail");
		user.AppConstant = angular.copy(AppConstant);
		user.enabled = true;
		user.createedit = user.AppConstant.CREATE.toUpperCase();
		user.lockMessage = user.AppConstant.CREATE.toUpperCase();
		user.domainName = domainName;
		user.userId = sessionStorage.getItem("userSequenceNo");
		$scope.domainName = "@" + user.domainName[0].domainName;
		user.mail = emaile;
		user.lengthValue=50-$scope.domainName.length;
		user.officialIds=[];
		user.focusSuccessive = focusSuccessive;
		user.changeCallback  = changeCallback ;
		user.fieldNull =fieldNull;
		user.toCertifyIhm =[];
		user.officilIdsToIhm = [];
		user.toCertifySMC =[];
		
	user.userRoleId = sessionStorage.getItem("userRoleId");	
	
	
	masterFactory.getCurrentUserDetail(loggedInUser,companyId).$promise.then(function(res){
		console.log(res);
		if(res[0].ihmreview==0 && res[0].ismreview==0 && res[0].ispsReview==0 && res[0].mlcreview==0 && res[0].planApprovalReview==1){
			user.onlyPlanApproval = true;
			user.planApproval = true;
		}
		else if(res[0].planApprovalReview==1 && (res[0].ihmreview==1 || res[0].ismreview==1 || res[0].ispsReview==1 || res[0].mlcreview==1)){
			user.planApproval = true;
		}
	
	
	});
	
	 
	
		user.refreshDataRmi = function(){
			
			var signer =(user.firstname && user.lastname) ?  ""+user.firstname+" "+user.lastname:null;
		    var officialId = user.officialId ?  user.officialId  : user.managerOfficialId ? user.managerOfficialId:'';
			if(officialId){
			userFactory.RefreshRmiData(officialId,companyId).$promise.then(function(res) {
				console.log(res);
				var ism='', isps='',mlc='', status='';
				/* to Check missmatch with rmi data */
				if(res && res.officialId){
					 ism = (res.ism && res.ism.toUpperCase()=="N" ) ?  0 : (res.ism && res.ism.toUpperCase()=="Y" ) ? 1 : 0;
					 isps = (res.msa && res.msa.toUpperCase()=="N" ) ? 0 : (res.msa && res.msa.toUpperCase()=="Y" ) ? 1 : 0;
					 mlc = (res.mlc && res.mlc.toUpperCase()=="N" ) ? 0 : (res.mlc && res.mlc.toUpperCase()=="Y" ) ? 1 : 0;
					 status =(res.status && res.status.toUpperCase()=='ACTIVE') ? 1 :0;
					if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID){
					user.ihmreviewFromRmi = (res.ihm && res.ihm.toUpperCase()=="N" ) ? 0 : (res.ihm && res.ihm.toUpperCase()=="Y" ) ? 1 : 0; 
					if(user.ihmreview!=user.ihmreviewFromRmi || user.locationIHM!=res.location || user.status !=status){
						user.saveForUpdateMode=true;
						}
					}else if(user.ismreview!=ism || user.review!=isps || user.mlcreview!= mlc || user.status !=status) {
						
						}
					
					if( (res.firstName && res.firstName!=user.firstname) || (res.lastName && res.lastName!=user.lastname) || (user.address.toUpperCase()!=res.address.toUpperCase()) ){
						user.saveForUpdateMode=true; }
					
				}
				
				if(res && res.officialId){
					user.userForm.$dirty = true;
					
					toaster.clear();
					toaster.success('RMI Data refreshed successfully for the user '+ signer+ ' Please Update  it to save the changes');
					
					if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID){
						user.ihmreview = (res.ihm && res.ihm.toUpperCase()=="N" ) ? 0 : (res.ihm && res.ihm.toUpperCase()=="Y" ) ? 1 : 0; 
						user.ihmHideFlag = user.ihmreview==1?true:user.ihmreview;
					}else {
					
					user.ismreview =(res.ism && res.ism.toUpperCase()=="N" ) ?  0 : (res.ism && res.ism.toUpperCase()=="Y" ) ? 1 : 0;
					user.review = (res.msa && res.msa.toUpperCase()=="N" ) ? 0 : (res.msa && res.msa.toUpperCase()=="Y" ) ? 1 : 0;
					user.mlcreview = (res.mlc && res.mlc.toUpperCase()=="N" ) ? 0 : (res.mlc && res.mlc.toUpperCase()=="Y" ) ? 1 : 0;
					user.planApprovalReview= (res.planApproval && res.planApproval.toUpperCase()=="N" ) ? 0 : (res.planApproval && res.planApproval.toUpperCase()=="Y" ) ? 1 : 0;  //Added by sudharsan for PA changes not reflecting in UI
					}
					user.userSignature = res.signature ? res.signature : 	user.userSignature;
					$scope.signatureImage = res.signature ? res.signature : 	$scope.signatureImage;
					user.locationIHM= res.location ? res.location :user.locationIHM;
					user.status =(res.status && res.status.toUpperCase()=='ACTIVE') ? 1 :0;
					//user.emailid = res.emailAddress ? res.emailAddress: user.emailid;
					user.firstname = res.firstName ? res.firstName : user.firstname;
					user.lastname = res.lastName ? res.lastName : user.lastname;
					user.address = res.address ? res.address : user.address;
					
					
				}else if(res){ user.userNotPresentRmi=true;
				            toaster.warning(signer + ' does not exists in the RMI DB ');
				}else {
					toaster.success('Please contact Administrator');
				}
				
				
				
				
			});
		}
		}
	
		
		user.mail.forEach(function(a){
			
			if(a.officialId){
				user.officialIds.push(a.officialId);
			}
		});
		
		
		
		user.leftValue = [];
		var leftcounter = 0;
		user.rightValue = [];
		var rightcounter = 0;
		user.addValue = [];
		user.removeValue = [];
		user.lftval = [];
		user.rgtval = [];
		user.data = [];
		user.data1 = [];
		var val;
		loadMoreLeft();
		loadMoreRight();
		user.disableCreate=0;
		
		user.managerRegion = sessionStorage.getItem("managerRegion");
		user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion; //Added by sudharsan for Jira-ID = IRI-5716
		user.ismreview=false;
		user.review=false;
		user.mlcreview=false;
		user.ihmreview=false;
		user.uploadVar=0;
		user.adminhide=0;
		user.managerhide=0;
		
		user.retrieveUsers = retrieveUsers;		
		
		
		userFactory.getManagerRegion(companyId).$promise.then(function(res) {
			//Added by sudharsan for Jira-ID = IRI-5716 Start here
			res.forEach(function (regionArray_){
				if(regionArray_.regionId == 1)
					regionArray_.regionId = 1001
				else if(regionArray_.regionId == 2)
					regionArray_.regionId = 1002
				else if(regionArray_.regionId == 3)
					regionArray_.regionId = 1003

			});
			//Added by sudharsan for Jira-ID = IRI-5716 End here
			user.regionArray=res;
			if(user.regionArray && user.regionArray.length>0){
				if(_.findWhere(user.regionArray, {regionName: "R1"}) &&  _.findWhere(user.regionArray, {regionName: "R2"}) && _.findWhere(user.regionArray, {regionName: "R3"})){
					user.r1r2r3AreThere=true;
				}
			}
		});

		
			 
	
		if(sessionStorage.getItem("userRoleId")==1003 || sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID)
		{
			user.managerRole=1;
			// user.region = user.managerRegion;
			user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion; //Added by sudharsan for Jira-ID = IRI-5716
			if(!user.rightValue[0])
			{
				$scope.disabled = false;
				
			}
		
			/** Fetching values for auditType Dropdown from auditType db **/
			
		}
		else if(sessionStorage.getItem("userRoleId")==user.AppConstant.ADMIN_ROLE_ID)
		{
			user.adminRole=1;
		}
		user.updateActive=true;
		user.signValue=false;
		
		user.search=function(name,param,addName){
			
			user.validateTypeahead(name,param,addName);
			
		}
		
		

		/** Confirmation window while navigating to another page **/
		$rootScope.$on('$stateChangeStart', function(event, fromState,
				toParams, toState) {
			var element = angular.element(document.getElementById("loader"));
			if (user.userForm) {
				if (user.userForm.$dirty == true) {
					if (user.userForm.firstName.$valid
							|| user.userForm.lastName.$valid
							|| user.userForm.email.$valid
							|| user.userForm.mobnum.$valid
							|| user.userForm.id.$valid
							|| user.userForm.stat.$valid
							|| user.userForm.address.$valid
							|| user.userForm.reviewisps.$valid
							|| user.userForm.profile.$valid
							|| user.userForm.file.$valid) {
						if (broadcastService.confirmService()) {
							if (user.submit(user.createedit)) {
							} else {
								event.preventDefault();
							}
						}
					}
				}
			}
			element.addClass('hide');
		});
		if(sessionStorage.getItem('updateSearchData')){
		user.focusSuccessive(sessionStorage.getItem('updateSearchData'));
		
		if(sessionStorage.getItem('updateSearchData').updateMode==1){
		user.enabled=false;
		user.changeCallback();
		}
		}
		user.toasterClear = function() {
			toaster.clear();
			
		}

		user.check=function(){

			 if(user.createedit == user.AppConstant.UPDATE.toUpperCase() && !user.rightValue[0]){
				 if(user.audLeadStatus>0){
					// toaster.warning('You may change the lead Auditor for the Audit post to which the region of the Audit can be changed');
				 }
			 }
			 
		 
			
		}
		
		user.checkOne=function(){

			 if(user.createedit == user.AppConstant.UPDATE.toUpperCase()){
				
				     if(user.onlyIhmUser && user.leadSignPending){
				    	 toaster.warning('You may Change the Role Post to The Lead Auditor sign of Review');
			         }else if(user.leadSignPending){
						 toaster.warning('You may Change the Role Post to the Reviewer Auditor sign of Audit/Inspection/Review');	 
					 }else{
						 toaster.warning('You may Change the Role Post to The Reviewer Auditor sign of Audit/Inspection/Review'); 
					 }
				 
			 }
			 
		 
			
		}
		
		
		

		/** checking for Unique Mail **/
		user.getMail = function() {
			user.email = user.emailid + $scope.domainName;
			if (user.emailid != null) {
				blockUI.start('Checking for Unique Mail Id');
				for (var i = 0; user.emailResult[i] != null; i++) {
					if (angular.lowercase(user.email) == angular
							.lowercase(user.emailResult[i].emailId)) {
						$timeout(function() {
							toaster.warning('Please Enter Unique mail Id');
						}, 0)
						user.emailid = null;
						blockUI.stop();
					} else {

						blockUI.stop();
					}
				}
			}
		}

		/** checking for Unique UserId **/
		user.getid = function() {
			if(!user.makingIhmORSMC){
			for (var i = 0; user.mail[i] != null; i++) {
				if (angular.lowercase(user.seq) == angular
						.lowercase(user.mail[i].sequenceNo)) {
					toaster.warning('Please Enter Unique Id')
					user.seq = null;
				}
			}
			}
		}

		user.validateTypeahead = function(val, param,item) {
			
			
			
			if (param == 'MAIL' && val) {
				val=val+$scope.updateDomain;
				var val={"emailId":val};
				
				if (!(_(user.UserArray).chain().where({'emailId' : val.emailId}).pluck('emailId') == val.emailId)) {
				
					
					user.emailid = '';
					user.nul();
				}
			}
			
			if (param == 'FNAME' && val) {
				
				var addName=user.emailid+$scope.updateDomain;
				var val={"firstName":val};
				var vals={"emailId":addName};
					
				if (!(_(user.UserArray).chain().where({'firstName' : val.firstName} && {'emailId' : vals.emailId}).pluck('firstName') == val.firstName)) {
				
					user.firstname = '';
					user.emailid = '';
					user.lastname = '';
					user.nul();
					
					
				}
			}
			
			if (param == 'LNAME' && val) {
				var addName=user.emailid+$scope.updateDomain;
				
				var val={"lastName":val};
				var vals={"emailId":addName};
				
				
				
				if (!(_(user.UserArray).chain().where({'lastName' : val.lastName} && {'emailId' : vals.emailId}).pluck('lastName') == val.lastName)) {
					
					user.lastname = '';
					user.emailid = '';
					user.firstname = '';
					user.nul();
					
					

					
				}
			}

		}

		
		/** Left data population for duallist **/
		function loadMoreLeft() {
			userFactory.getMaRoles(companyId).$promise.then(function(res) {
				
				user.roleResult = res;
				console.log(res);
				for (var i = 0; res[i] != null; i++) {
					if (user.managerRole==1 ? res[i].roleId !== user.AppConstant.ADMIN_ROLE_ID && res[i].roleId !== 1003 && res[i].roleId !== 1005 && res[i].roleId !== user.AppConstant.IHM_MANAGER_ROLE_ID : res[i].roleId !== user.AppConstant.ADMIN_ROLE_ID && res[i].roleId !== 1005 && res[i].roleId !== user.AppConstant.IHM_MANAGER_ROLE_ID) {
					if(sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){
						if( res[i].roleId==1001){
						user.leftValue.push({
							'name' : res[i].roleDesc,
							'id' : res[i].roleId
						});
						user.lftval.push({
							'name' : res[i].roleDesc,
							'id' : res[i].roleId
						});
						}
				
			         }else{
						//Added by sudharsan for Jira-id=IRI-5515
						if( res[i].roleId!=1007){
							user.leftValue.push({
								'name' : res[i].roleDesc,
								'id' : res[i].roleId
							});
							user.lftval.push({
								'name' : res[i].roleDesc,
								'id' : res[i].roleId
							});
						}
			         }
					}
				}
			});
		}

	
		function loadMoreRight() { 
			user.rgtval = user.rightValue;
		}

		user.options = {
			leftContainerScrollEnd : function() {
				loadMoreLeft()
			},
			rightContainerScrollEnd : function() {
				loadMoreRight();
			},
			leftContainerSearch : function(text) {
				if (user.createedit == user.AppConstant.CREATE.toUpperCase()) {
					var results1 = user.lftval;
					var results2 = user.rightValue;
					var propes = [ 'name', 'id' ];
					var results = results1.filter(function(o1) {
						return !results2.some(function(o2) {
							return o1.id === o2.id;
						});
					}).map(function(o) {
						return propes.reduce(function(newo, name) {
							newo[name] = o[name];
							return newo;
						}, {});
					});
					user.leftValue = results;
					user.leftValue = $filter('filter')(user.leftValue, {
						'name' : text
					})
				} else {
					var result1 = user.lValue;
					var result2 = user.rightValue;
					var props = [ 'name', 'id' ];
					var result = result1.filter(function(o1) {
						return !result2.some(function(o2) {
							return o1.id === o2.id;
						});
					}).map(function(o) {
						return props.reduce(function(newo, name) {
							newo[name] = o[name];
							return newo;
						}, {});
					});
					user.leftValue = result;
					user.leftValue = $filter('filter')(user.leftValue, {
						'name' : text
					})
				}
			},
			rightContainerSearch : function(text) {
				if (user.createedit == user.AppConstant.CREATE.toUpperCase()) {
					var result1 = user.rgtval;
					var result2 = user.leftValue;
					var props = [ 'name', 'id' ];
					var result = result1.filter(function(o1) {
						return !result2.some(function(o2) {
							return o1.id === o2.id;
						});
					}).map(function(o) {
						return props.reduce(function(newo, name) {
							newo[name] = o[name];
							return newo;
						}, {});
					});
					user.rightValue = result;
					user.rightValue = $filter('filter')(user.rightValue, {
						'name' : text
					})
				} else {
					var result1 = user.lValue;
					var result2 = user.leftValue;
					var props = [ 'name', 'id' ];
					var result = result1.filter(function(o1) {
						return !result2.some(function(o2) {
							return o1.id === o2.id;
						});
					}).map(function(o) {
						return props.reduce(function(newo, name) {
							newo[name] = o[name];
							return newo;
						}, {});
					});
					user.rightValue = result;
					user.rightValue = $filter('filter')(user.rightValue, {
						'name' : text
					})
				}
			},
			leftContainerLabel : 'Available Lists',
			rightContainerLabel : 'Selected Lists',
			onMoveRight : function() {
				
				 var id = (user.rightValue && user.rightValue[0] &&  user.rightValue[0].id) ? user.rightValue[0].id :'';
				if(user.rightValue && user.rightValue[0].id==1003){
				//	user.officialId=null;
					if(user.seq && user.seq[0]+user.seq[1]+user.seq[2]!='IRI')
						 user.seq='IRI'+ user.seq;
						 
					else
					 user.seq=user.seq;
					
				}else {
					user.seq=user.seq.replace('IRI',''); 
					
				}
				user.roleTiltle = id==1004 ? 'Observer': id==1001 ? 'Auditor' :id==1003 ?'Manager' : user.roleTiltle ;
			
				
				
			},
			onMoveLeft : function() {
			
			user.temp=[]; var k=0,l=0,n=0;
			for(var i=0; i<user.leftValue.length ;i++){
				if(user.leftValue[i].id==1001 && k==0)
					{
					k++;
					user.temp.push(user.leftValue[i]);
					}
				if(user.leftValue[i].id==1003 && l==0)
				{
				l++;  user.temp.push(user.leftValue[i]);
				}
				if(user.leftValue[i].id==1004 && n==0)
				{
				n++; user.temp.push(user.leftValue[i]);
				}
				
				
				
		}
			$timeout(function(){
				user.leftValue=angular.copy(user.temp);
			},10);
			
				if(user.rightValue.length==0){
					 
					//user.status=0;
					
				}
			}
		};
		var leftValue = angular.copy(user.leftValue)
		var rightValue = angular.copy(user.rightValue)
		user.moveRight = function() {
			
			
			user.temp=[]; var k=0,l=0,n=0;
			for(var i=0; i<user.leftValue.length ;i++){
				if(user.leftValue[i].id==1001 && k==0)
					{
					k++;
					user.temp.push(user.leftValue[i]);
					}
				if(user.leftValue[i].id==1003 && l==0)
				{
				l++;  user.temp.push(user.leftValue[i]);
				}
				if(user.leftValue[i].id==1004 && n==0)
				{
				n++; user.temp.push(user.leftValue[i]);
				}
				
				
				
		}
			$timeout(function(){
				user.leftValue=angular.copy(user.temp);
			},10);
			
			
			
			
			for (var i = 0; i < $scope.leftscope.length; i++) {
				if ($scope.leftscope[i].selected) {
					$scope.leftscope[i].selected = false
					$scope.rightscope.push($scope.leftscope[i]);
					$scope.addscope.push($scope.leftscope[i]);
					var index = $scope.leftscope.indexOf($scope.leftscope[i]);
					$scope.leftscope.splice(index, 1)
					i--
				}
			}
		};

		user.moveLeft = function() {
			for (var i = 0; i < $scope.rightscope.length; i++) {
				if ($scope.rightscope[i].selected) {
					$scope.rightscope[i].selected = false
					$scope.leftscope.push($scope.rightscope[i]);
					$scope.removescope.push($scope.rightscope[i]);
					var index = $scope.rightscope.indexOf($scope.rightscope[i]);
					$scope.rightscope.splice(index, 1)
					i--
				}
			}

		};

		user.selectAllLeftContainer = function() {
			angular.forEach($scope.leftscope, function(val) {
				if ($scope.leftSelectAll) {
					val.selected = true;
				} else {
					val.selected = false;
				}
			});
		}

		user.selectAllRightContainer = function() {
			angular.forEach($scope.rightscope, function(val) {
				if ($scope.rightSelectAll) {
					val.selected = true;
				} else {
					val.selected = false;
				}
			});
		}

		/** Not null validation **/
		user.validate = function(val) {
			var flag = true;
			if (!val.companyId) {
				flag = false;
				toaster.warning('Check CompanyId')
			}

			if (val.roles[0] == null && user.managerRole==1) {
				flag = false;
				toaster.warning('Fill Roles')
			}
			
			if (val.region == null && user.adminRole) {
				flag = false;
				toaster.warning('Select Manager Region')
			}

			if (!val.signature && val.roles  && val.roles.length > 0 && val.roles[0].roleId!=1004) {
				flag = false;
				toaster.warning('Signature is missing in RMI DB')
			}

			if (!val.sequenceNo) {
				flag = false;
				toaster.warning('Id is missing in RMI DB')
			}

			if (!val.address ) {
				flag = false;
				toaster.warning('Address is missing in RMI DB')
			}

			if (!val.phoneNo) {
				flag = false;
				toaster.warning('Please enter a valid Phone Number');
			}

			if (!val.emailId) {
				flag = false;
				toaster.warning(' Email Id is missing in RMI DB')
			}

			if (!val.lastName) {
				flag = false;
				toaster.warning(' Last Name is missing in RMI DB')
			}

			if (!val.firstName) {
				flag = false;
				toaster.warning(' First Name is missing in RMI DB')
			}else if(user.ihmHideFlag && !user.locationIHM && user.createedit!="CREATE" && sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){
				
				flag = false;
				toaster.warning('Location is Empty For IHM certified User Please Refresh RMI Data / Contact Administrator ');
			}else if(user.ihmHideFlag && !user.locationIHM && user.createedit=="CREATE" && sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){
				
				flag = false;
				toaster.warning('Location is Empty For IHM certified User Please  Contact Administrator ');
			}else if(sessionStorage.getItem("userRoleId")==user.AppConstant.ADMIN_ROLE_ID  && val.roles && val.roles.length>0 && val.roles[0].roleId==1001 && val.ismreview==0  && val.ispsReview==0 && val.mlcreview==0){
				flag = false;
				toaster.warning("To select the Role as Auditor there should be at least one type as certified, please select the role accordingly  ");
			}
			

			return flag;

		}
		
		
		user.userDetails=function(val){
			
				
			userFactory.nameBasedUserDetails(val.emailId,companyId).$promise.then(function(res) {
		console.log(res);
				
				if(res.length>0)
					{
					
					user.firstname = res[0].firstName;
					user.lastname = res[0].lastName;
					user.phoneno = res[0].phoneNo;
					user.status = res[0].activeStatus;
					user.review = res[0].ispsReview;
					user.ismreview = res[0].ismreview;
					user.mlcreview = res[0].mlcreview;
					user.ihmreview = res[0].ihmreview;
					user.address = res[0].address;
					user.seq = res[0].sequenceNo;
					// user.region = res[0].region;
					user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion;//Added by sudharsan for Jira-ID = IRI-5716
					user.emailid=res[0].emailId;
					
					user.lValue = [];
					for (var i = 0; user.roleResult[i] != null; i++) {
						if (user.roleResult[i].roleDesc !== "Administrator") {
							user.lValue.push({
								'name' : user.roleResult[i].roleDesc,
								'id' : user.roleResult[i].roleId
							});
						}
					}
					
					user.rgtval = [];
					for (var i = 0; res[0].roles[i] != null; i++) {
						user.rightValue.push({
							'name' : res[0].roles[i].roleDesc,
							'id' : res[0].roles[i].roleId
						});
						user.rgtval.push({
							'name' : res[0].roles[i].roleDesc,
							'id' : res[0].roles[i].roleId
						});
					}
					user.tempArray = [];
					user.temArr = [];
					
				
					var result1 = user.lValue;
					var result2 = user.rightValue;
					
					var props = [ 'name', 'id' ];
					var result = result1.filter(function(o1) {
						return !result2.some(function(o2) {
							return o1.id === o2.id;
						});
					}).map(function(o) {
						return props.reduce(function(newo, name) {
							newo[name] = o[name];
							return newo;
						}, {});
					});
					user.leftValue = result;
					
					
					$scope.arrayBufferToBase64 = function(buffer) {
						
						var binary = '';
						var bytes = new Uint8Array(buffer);
						var len = bytes.byteLength;
						for (var i = 0; i < len; i++) {
							binary += String.fromCharCode( bytes[ i ] );
						}
						return window.btoa( binary );
					}	
	    			
					$scope.signatureImage=$scope.arrayBufferToBase64(res[0].signature);
				
					
					}
				else
					{
					toaster.warning('First Name and Last Name does not matches');
					}
				
			});
				}
			
		

		/** on removing mail id in update mode all fields are emptied **/
		user.nul = function() {
			
			user.rightValue = [];
			user.leftValue = [];
			angular.element("input[type='file']").val(null);
			$scope.signatureImage = null;
			user.userSignature = null;
			$scope.photoImage = null;
			user.userProfilePic = null;
			user.firstname = null;
			user.lastname = null;
			user.phoneno = null;
			user.roles = null;
			user.status = null;
			user.review = null;
			user.ismreview =null; 
			user.mlcreview = null ;
			user.ihmreview = null ;
			user.address = null;
			user.seq = null;
			user.region = null;
			$scope.updateDomain=null;

		}
		
		user.nullmailid=function(){
			user.rightValue = [];
			user.leftValue = [];
			angular.element("input[type='file']").val(null);
			$scope.signatureImage = null;
			user.userSignature = null;
			$scope.photoImage = null;
			user.userProfilePic = null;
			user.phoneno = null;
			user.roles = null;
			user.status = null;
			user.review = null;
			user.ismreview = null;
			user.mlcreview = null ;
			user.ihmreview = null ;
			user.address = null;
			user.seq = null;
			user.region = null;
			$scope.updateDomain=null;
		}

		user.disable = function(val) {
			user.rightValue=[];
			user.leftValue=[];
	
			user.adminhide=0;
			user.managerhide=0;
			
		if (!val) {
				user.fieldNull();
			}
		}
		user.deleteDomain=function(){
			
			$scope.updateDomain=null;
		}
		/** Making fields null while changing to update or create mode **/
		function  fieldNull(){
			user.firstname = null;
			user.lastname = null;
			user.emailid = null;
			user.phoneno = null;
			user.roles = null;
			user.status = null;
			user.review = null;
			user.ismreview = null;
			user.planApprovalReview=null;
			user.mlcreview = null;
			user.ihmreview = null;
			user.address = null;
			angular.element("input[type='file']").val(null);
			$scope.signatureImage = null;
			user.userSignature = null;
			$scope.photoImage = null;
			user.userProfilePic = null;
			user.seq = null;
			user.region = null;
			user.lValue = [];
			user.rightValue = [];
			user.leftValue = [];
			user.rgtval = [];
			user.lftval = [];

		}
		
		 
		
		
		/*$scope.$watch('user.watch', function() {
			alert('hi');
			
			if(user.sendEmail){
				
				var mail = {
						emailId : user.sendEmail
					};
					
					if(user.status == undefined){
				
				 userFactory.getActiveStatusResponse(sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
					 
					 if(res.success > 0){
							toaster.warning('Current user has been Active');
						}
				 });
					}
			}
			
		});*/
		
		
		
		
		$scope.$watch('user.status', function() {
		
			if(user.emailid==undefined || user.emailid==""){
				toaster.clear();
			}
			else{
				toaster.clear();
				var mail = {
						emailId : user.sendEmail
					};
					
					if(user.status == undefined){
				
				 userFactory.getActiveStatusResponse(sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
					 
					 if(res.success > 0){
							toaster.warning('Current user is Active');
						}
				 });
					}
			}
			
		});
		
		
 $scope.$watch('user.review', function() {
	 if(user.emailid==undefined || user.emailid==""){
			toaster.clear();
		}
	 else{
				var mail = {
					emailId : user.sendEmail
				};
				
				 if(user.review == undefined){
					
	                   userFactory.getStatusResponse(user.AppConstant.ADMIN_ROLE_ID,sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
	                	   toaster.clear();
						if(res.success>0){
							toaster.warning('Current user has been assigned to process the ISPS Audit');
						}
						else if(res.success == 0){
							
							 userFactory.getStatusResponse(1004,sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
								
								 if(res.success>0){
										toaster.warning('Current user has been assigned to process the SSP Review');
									} 
							 });
							
						}
					});
					
				}
		
			}
		});
		user.checkLeadStatus=function(){
			console.log(user.region);
			toaster.warning('You region',user.region);
		}
 /*user.checkLeadStatus=function(){
	 if(user.createedit == user.AppConstant.UPDATE.toUpperCase()){
		 toaster.clear();
		 if(user.audLeadStatus>0){
			 toaster.warning('You may change the lead Auditor for the Audit post to which the region of the Audit can be changed');
		 }
	 }
	 
 }*/
		
		$scope.$watch('user.mlcreview', function() {
			if(user.emailid==undefined || user.emailid==""){
				toaster.clear();
			}
			else{
				var mail = {
					emailId : user.sendEmail
				};
				
				 if(user.mlcreview == undefined){
					
	                userFactory.getStatusResponse(1003,sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
						toaster.clear();
						if(res.success>0){
							toaster.warning('Current user has been assigned to process the MLC Inspection');
						}
						else if(res.success == 0){
							
							 userFactory.getStatusResponse(1005,sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
								 if(res.success>0){
										toaster.warning('Current user has been assigned to process the DMLCII Review');
									} 
							 });
							
						}
					});
					
				}
		
			}
		});
		
		$scope.$watch('user.ihmreview', function() {
			if(user.emailid==undefined || user.emailid==""){
				toaster.clear();
			}
			else{
				var mail = {
					emailId : user.sendEmail
				};
				
				 if(user.ihmeview == undefined){
					
	                userFactory.getStatusResponse(1003,sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
						toaster.clear();
						if(res.success>0){
							//toaster.warning('Current user has been assigned to process the IHM Part1 Inspection');
						}
						 
					});
					
				}
		
			}
		});
		
		$scope.$watch('user.ismreview', function() {
			
			if(user.emailid==undefined || user.emailid==""){
				toaster.clear();
			}
			else{
			var mail = {
				emailId : user.sendEmail
			};
			
			if(user.ismreview == undefined){
				
				userFactory.getStatusResponse(1001,sessionStorage.getItem("companyId"),mail).$promise.then(function(res) {
					
					if(res.success>0){
						toaster.warning('Current user has been assigned to process the ISM Audit');
					}
				});
			}
			
			
		}});

		user.filterUserArray=function(val,param){
			
			var tempArray = [];
		if (val == '*') {
			tempArray = user.UserArray;
		} else if(val.length>2 && param =='em') {
			tempArray = _.filter(user.UserArray, function(d) {
				return (d.emailId.toUpperCase()).toString().indexOf(val.toUpperCase()) > -1;
			});
		}else if(val.length>2 && param =='fn') {
			tempArray = _.filter(user.UserArray, function(d) {
				return (d.firstName.toUpperCase()).toString().indexOf(val.toUpperCase()) > -1;
			});
		}else if(val.length>2 && param =='ln') {
			tempArray = _.filter(user.UserArray, function(d) {
				return (d.lastName.toUpperCase()).toString().indexOf(val.toUpperCase()) > -1;
			});
		}
		return tempArray;
		};
		
		//userFactory.allUserRmi().$promise.then(function(res) { user.allUsersFromRmi= res;
		
	
		/** creating typeaheads for email in update mode **/
		masterFactory.getEmail(companyId).$promise.then(function(res) {
			console.log(res);
			
			user.emailResult = res;
			if(sessionStorage.getItem("userRoleId")==user.AppConstant.ADMIN_ROLE_ID){
			angular.forEach(res, function(value, key) {
				
				if( (value.ispsReview!=1 || value.ismreview!=1  || value.mlcreview != 1 || value.planApprovalReview!=1)  && (value.roles[0].roleId!=user.AppConstant.ADMIN_ROLE_ID && value.roles[0].roleId!=user.AppConstant.IHM_MANAGER_ROLE_ID) ){
				if(value.officialId){
					user.officilIdsToIhm.push(value.officialId);
				}
				user.data1.push({
					'emailId' : value.emailId,
					'firstName' : value.firstName,
					'lastName' : value.lastName,
					'activeStatus' : value.activeStatus,
					"signature" : value.signature,
					"phoneno" : value.phoneNo,
					"address" : value.address,
					"photo" : value.userIdentification,
					"officialId":value.officialId ? value.officialId :'',
					"ismreview":value.ismreview ? value.ismreview :'',
					"ispsReview":value.ispsReview ? value.ispsReview :'',
					"mlcreview":value.mlcreview ? value.mlcreview :'',
					"ihmreview":value.ihmreview ? value.ihmreview :'',
					"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :''  
				});
				
				
				}
				if( ((value.ispsReview==1 || value.ismreview==1  || value.mlcreview == 1 || value.planApprovalReview==1)  || (value.roles[0].roleId==1004 || value.roles[0].roleId==1003) ) && (value.roles[0].roleId!=user.AppConstant.ADMIN_ROLE_ID && value.roles[0].roleId!=user.AppConstant.IHM_MANAGER_ROLE_ID) ){
				user.data.push({
					'emailId' : value.emailId,
					'firstName' : value.firstName,
					'lastName' : value.lastName,
					'activeStatus' : value.activeStatus,
					"signature" : value.signature,
					"phoneno" : value.phoneNo,
					"address" : value.address,
					"photo" : value.userIdentification,
					"officialId":value.officialId ? value.officialId :'',
					"ismreview":value.ismreview ? value.ismreview :'',
					"ispsReview":value.ispsReview ? value.ispsReview :'',
					"mlcreview":value.mlcreview ? value.mlcreview :'',
					"ihmreview":value.ihmreview ? value.ihmreview :'',
					"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :''  
				});
				

				}
			});
		}
			else if(sessionStorage.getItem("userRoleId")==1003){
			
				angular.forEach(res, function(value, key) {
					
					if( (value.region == user.managerRegion) && (value.ispsReview!=1 || value.ismreview!=1  || value.mlcreview != 1 || value.planApprovalReview!=1)  && (value.roles[0].roleId!=user.AppConstant.ADMIN_ROLE_ID && value.roles[0].roleId!=user.AppConstant.IHM_MANAGER_ROLE_ID) ){
						if(value.officialId){
							user.officilIdsToIhm.push(value.officialId);
						}
						user.data1.push({
							'emailId' : value.emailId,
							'firstName' : value.firstName,
							'lastName' : value.lastName,
							'activeStatus' : value.activeStatus,
							"signature" : value.signature,
							"phoneno" : value.phoneNo,
							"address" : value.address,
							"photo" : value.userIdentification,
							"officialId":value.officialId ? value.officialId :'',
							"ismreview":value.ismreview ? value.ismreview :'',
							"ispsReview":value.ispsReview ? value.ispsReview :'',
							"mlcreview":value.mlcreview ? value.mlcreview :'',
							"ihmreview":value.ihmreview ? value.ihmreview :'',
							"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :''  
						});
						
						
						}
					
					
					if(value.region == user.managerRegion && ( (value.roles[0].roleId==1001 && (value.ispsReview==1 || value.ismreview==1  || value.mlcreview == 1 || value.planApprovalReview==1) ) || value.roles[0].roleId==1004) ){
						
					user.data.push({
						'emailId' : value.emailId,
						'firstName' : value.firstName,
						'lastName' : value.lastName,
						'activeStatus' : value.activeStatus,
						"signature" : value.signature,
						"phoneno" : value.phoneNo,
						"address" : value.address,
						"photo" : value.userIdentification,
						"ismreview":value.ismreview ? value.ismreview :'',
						"ispsReview":value.ispsReview ? value.ispsReview :'',
						"mlcreview":value.mlcreview ? value.mlcreview :'',
						"ihmreview":value.ihmreview ? value.ihmreview :'',
						"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :''  		
					});
					
					if(!value.ihmreview || value.ihmreview==0){ 
						if(value.officialId){
							user.officilIdsToIhm.push(value.officialId);
						} }
					
					
					
			    }
					
			
				});
			}else if(sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){
			
				angular.forEach(res, function(value, key) { 
					
					
					if(value.officialId &&  (!value.ihmreview || value.ihmreview==0) ){ 
						user.officilIdsToIhm.push(value.officialId); }
					
					if( (!value.ihmreview || value.ihmreview==0)  && (value.roles[0].roleId!=user.AppConstant.ADMIN_ROLE_ID && value.roles[0].roleId!=user.AppConstant.IHM_MANAGER_ROLE_ID) ){
					
						user.data1.push({
							'emailId' : value.emailId,
							'firstName' : value.firstName,
							'lastName' : value.lastName,
							'activeStatus' : value.activeStatus,
							"signature" : value.signature,
							"phoneno" : value.phoneNo,
							"address" : value.address,
							"photo" : value.userIdentification,
							"officialId":value.officialId ? value.officialId :'',
							"ismreview":value.ismreview ? value.ismreview :'',
							"ispsReview":value.ispsReview ? value.ispsReview :'',
							"mlcreview":value.mlcreview ? value.mlcreview :'',
							"ihmreview":value.ihmreview ? value.ihmreview :'',
							"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :'' 
						});
						
						
						}
					
					
					if(value.region){
					if(value.ihmreview==1){
						if((value.roles[0].roleId==1001 || value.roles[0].roleId==1004) ){
							
						
					user.data.push({
						'emailId' : value.emailId,
						'firstName' : value.firstName,
						'lastName' : value.lastName,
						'activeStatus' : value.activeStatus,
						"signature" : value.signature,
						"phoneno" : value.phoneNo,
						"address" : value.address,
						"photo" : value.userIdentification,
						"officialId":value.officialId ? value.officialId :'',
						"ismreview":value.ismreview ? value.ismreview :'',
						"ispsReview":value.ispsReview ? value.ispsReview :'',
						"mlcreview":value.mlcreview ? value.mlcreview :'',
						"ihmreview":value.ihmreview ? value.ihmreview :'',
						"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :''  		
					});
					
					
					
					
					
						}
						}}
				});
			}else if(user.onlyPlanApproval){
			
				angular.forEach(res, function(value, key) { 
					
					
					if(value.officialId &&  (!value.planApprovalReview || value.planApprovalReview==0) ){ 
						user.officilIdsToIhm.push(value.officialId); }
					
					if( (!value.planApprovalReview || value.planApprovalReview==0)  && (value.roles[0].roleId!=user.AppConstant.ADMIN_ROLE_ID && value.roles[0].roleId!=user.AppConstant.IHM_MANAGER_ROLE_ID) ){
					
						user.data1.push({
							'emailId' : value.emailId,
							'firstName' : value.firstName,
							'lastName' : value.lastName,
							'activeStatus' : value.activeStatus,
							"signature" : value.signature,
							"phoneno" : value.phoneNo,
							"address" : value.address,
							"photo" : value.userIdentification,
							"officialId":value.officialId ? value.officialId :'',
							"ismreview":value.ismreview ? value.ismreview :'',
							"ispsReview":value.ispsReview ? value.ispsReview :'',
							"mlcreview":value.mlcreview ? value.mlcreview :'',
							"ihmreview":value.ihmreview ? value.ihmreview :'',
							"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :'' 
						});
						
						
						}
					
					
					if(value.region){
					if(value.ihmreview==1){
						if((value.roles[0].roleId==1001 || value.roles[0].roleId==1004) ){
							
						
					user.data.push({
						'emailId' : value.emailId,
						'firstName' : value.firstName,
						'lastName' : value.lastName,
						'activeStatus' : value.activeStatus,
						"signature" : value.signature,
						"phoneno" : value.phoneNo,
						"address" : value.address,
						"photo" : value.userIdentification,
						"officialId":value.officialId ? value.officialId :'',
						"ismreview":value.ismreview ? value.ismreview :'',
						"ispsReview":value.ispsReview ? value.ispsReview :'',
						"mlcreview":value.mlcreview ? value.mlcreview :'',
						"ihmreview":value.ihmreview ? value.ihmreview :'',
						"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :''  		
					});
					
					
					
					
					
						}
						}}
				});
			}
			
			user.UserArray = user.data;
			user.UserArray1 = user.data1;
			
			console.log("user.UserArray"); console.log(user.UserArray);
			console.log("user.UserArray1"); console.log(user.UserArray1);
		});
		
	//	});

		/** Automatically fetching form data for update mode **/
	function focusSuccessive(val){
		user.saveForUpdateMode=false;
		user.userNotPresentRmi = false;	
			if(user.createedit=='UPDATE'){
			var temp = val;
			if(temp.signature){
			temp.signature='';
			temp.updateMode=1;
			
			}
			
			sessionStorage.removeItem('updateSearchData', '');
			sessionStorage.setItem('updateSearchData', temp );
			}
			user.sendEmail=val.emailId;
			user.firstname=val.firstName;
			user.lastname=val.lastName;
			user.emailid=val.emailId;
			user.updateActive=true;
			user.signValue=true;
		
			var data = {
				emailId : val.emailId 
			};
			
			
			user.lValue = [];
			if(user.roleResult){
			for (var i = 0; user.roleResult[i] != null; i++) {
				
				if (user.roleResult[i].roleId !== user.AppConstant.ADMIN_ROLE_ID && user.roleResult[i].roleId !== 1003 ) {
					user.lValue.push({
						'name' : user.roleResult[i].roleDesc,
						'id' : user.roleResult[i].roleId
					});
				}
			} 
			
			}
			/** Population of all fields in update mode based on emailId **/
			masterFactory.getRoleUpdate(data, companyId).$promise
					.then(function(res) {
						console.log(res)
						if(user.userRoleId!=user.AppConstant.IHM_MANAGER_ROLE_ID){
						if(res && res.length>0 && Number(res[0].auditIsThere)>0){
							user.reviewerSign =res[0].reviewerSign;
							if(Number(res[0].reviewerSign)>0 || Number(res[0].observerOrAdditional) > 0){ 
								user.showuserupdateMode = true;
							}else if(Number(res[0].leadSign)>0){
								user.showuserupdateMode = true;
								user.leadSignPending = true;
							}else if(Number(res[0].auditIsThere)>0 && Number(res[0].noReviewerData)==0){
								user.showuserupdateMode = true;
								//user.leadSignPending = true;
							}else{
								user.showuserupdateMode = false;
								user.leadSignPending = false;
							}
							
							
					}else{
						user.showuserupdateMode = false;
						user.leadSignPending = false;
					}
						
						if(res && res.length>0){
							user.onlyIhmUser = (res[0].ihmreview==1 && res[0].ismreview==0 && res[0].ispsReview==0 && res[0].mlcreview==0) ? true : false; 
							if(user.onlyIhmUser){
								user.showuserupdateMode = false;
								user.leadSignPending = false;
								if(Number(res[0].leadSign)>0){
									user.showuserupdateMode = true;
									user.leadSignPending = true;
								}
								
							}
							
						}
					}
						
						user.lpin=res[0].userPin[0].lapUniqId;
				   user.roleTiltle=res[0].roles[0].roleDesc;
					$rootScope.generateStatus=res[0].generateStatus;
					$rootScope.reviewerSign=res[0].reviewerSign;
					console.log(res[0].reviewerSign);
					if(res[0].reviewerSign>0 || res[0].audLeadStatus>0)
					{
						//user.leftValue = null;
					}
					res[0].officialId ? user.officialId=res[0].officialId : user.officialId=null;
					res[0].managerOfficialId ? user.managerOfficialId=res[0].managerOfficialId : user.managerOfficialId=null;
					user.title=res[0].title;
					user.initialId=res[0].roles[0].roleId;
						user.audLeadStatus=res[0].audLeadStatus;
						user.password = res[0].password;
						user.firstname = res[0].firstName;
						user.lastname = res[0].lastName;
						user.phoneno = res[0].phoneNo;
						user.address = res[0].address  ? decodeURIComponent(res[0].address) : '';
						user.status = res[0].activeStatus;
						user.seq = res[0].sequenceNo;
						//user.region = res[0].region;
						user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion;//Added by sudharsan for Jira-ID = IRI-5716
						user.review = res[0].ispsReview;
						user.ismreview = res[0].ismreview; 
						user.mlcreview = res[0].mlcreview;
						user.auditorId = res[0].auditorId  ? res[0].auditorId : '';
						user.planApprovalReview = res[0].planApprovalReview; 
						
						user.ismreview = user.ismreviewSMCUpdate ? user.ismreviewSMCUpdate : user.ismreview;
						user.review = user.reviewSMCUpdate ? user.reviewSMCUpdate : user.review;
						user.mlcreview = user.mlcreviewSMCUpdate ? user.mlcreviewSMCUpdate : user.mlcreview;
						//if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID){
						user.ihmreview = res[0].ihmreview;
						user.locationIHM= res[0].location ? res[0].location: '' ;
						
						user.ihmreview = user.ihmreviewSMCUpdate ? user.ihmreviewSMCUpdate : user.ihmreview;
						user.locationIHM = user.ihmreviewLocSMCUpdate  ? user.ihmreviewLocSMCUpdate  : user.locationIHM;
						user.ihmHideFlag = user.ihmreview==1?true:user.ihmreview;
						//}
						if(res[0].officialId && !user.makingIhmORSMC){
							user.refreshDataRmiMissMatch(res[0].officialId);
						}
						var email = res[0].emailId; 
						  var indexVal = email.indexOf("@");
						  var resultEmail = email.slice(0,indexVal);
						 var domname=email.length-1;
						 var domainName=email.slice(indexVal,domname+1);
						$scope.updateDomain=domainName;
						user.emailid=resultEmail;
					
						if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID && res && res[0] && res[0].roleId){ 
							user.roleIdFromDbForIhm = res[0].roleId;
						}
						if (res[0].phoneNo) {
							
							var element = angular.element(document
									.getElementById("phoneno"));
							
							
							angular
									.element(
											element.context.parentNode.nextElementSibling)
									.addClass('labelfloat');
							angular
									.element(
											element.context.parentNode.nextElementSibling)
									.removeClass("phonelabelalign");
						}
						user.rgtval = [];
						user.rightValue=[];
						for (var i = 0; res[0].roles[i] != null; i++) {
							if(sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){
								user.rightValue.push({
									'name' :'AUDITOR',
									'id' : res[0].roles[i].roleId
								});
								user.rgtval.push({
									'name' :'AUDITOR',
									'id' : res[0].roles[i].roleId
								});
								
							}else {
							user.rightValue.push({
								'name' :res[0].roles[i].roleDesc,
								'id' : res[0].roles[i].roleId
							});
							user.rgtval.push({
								'name' :res[0].roles[i].roleDesc,
								'id' : res[0].roles[i].roleId
							});
							}
						}
						user.tempArray = [];
						user.temArr = [];
				
						if(user.rightValue[0].id==user.AppConstant.ADMIN_ROLE_ID ){
						user.adminhide=1;
						user.managerhide=0;
						//user.region=5;
						}
						/*else if(user.rightValue[0].id==1003 && 1==2){
										user.managerhide=1;	console.log(res);
										user.adminhide=0;
										
										}*/
						else if(user.rightValue[0].id==1004 || user.rightValue[0].id==1001  || user.rightValue[0].id==1003){
							 user.adminhide=0;
							 user.managerhide=0;
						var result1 = user.lValue;
						var result2 = user.rightValue;
						
						
						var props = [ 'name', 'id' ];
						var result = result1.filter(function(o1) {
							
						
							return !result2.some(function(o2) {
								
								return o1.id === o2.id;
							});
						}).map(function(o) {
							return props.reduce(function(newo, name) {
								newo[name] = o[name];
								return newo;
							}, {});
						});
						console.log(res);
						console.log(res[0].roles[0].roleId);
						console.log(res[0].officialId);
						
						userFactory.getMaRoles(companyId).$promise.then(function(res) {
							console.log(res);
							user.roleResult = res;
							
							for (var i = 0; res[i] != null; i++) {
								if ( res[i].roleId==1001 || res[i].roleId==1003 || res[i].roleId==1004) {
									user.leftValue.push({
										'name' : res[i].roleDesc,
										'id' : res[i].roleId
									});
									user.lftval.push({
										'name' : res[i].roleDesc,
										'id' : res[i].roleId
									});
								}
							}
						});
						$timeout(function(){
						if(res[0].roles[0].roleId==1001 || res[0].roles[0].roleId==1004 || res[0].roles[0].roleId==1003)
						{
							if( res[0].roles[0].roleId==1003){
								res[0].officialId = res[0].managerOfficialId;
							}
							
							
							if(res[0].officialId){
						userFactory.verifyOfficialId(res[0].officialId,companyId).$promise.then(function(resp) {
							console.log(resp);
							
							var a=resp;
							console.log(a);
							console.log(user.region);
							
							if(resp && resp.length>1){
								
								resp[0]=_.findWhere(resp, {sequenceNo: user.seq});
								
								
								$timeout(function(){ console.log(a);
									user.temp=[];
									var k=0,l=0,n=0;
									for(var i=0; i<user.leftValue.length ;i++){
										if(user.leftValue[i].id!=resp[0].roles[0].roleId)
											{
										//	user.temp.push(user.leftValue[i]);
											
										if(sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){/*ihmmanger only auditior need to comea8 */ n++;}
											
										if(user.leftValue[i].id==1001 && k==0)
										{
										k++;
										user.temp.push(user.leftValue[i]);
										}
									if(user.leftValue[i].id==1003 && l==0 && sessionStorage.getItem("userRoleId")==user.AppConstant.ADMIN_ROLE_ID)
									{
									l++;  user.temp.push(user.leftValue[i]);
									}
									if(user.leftValue[i].id==1004 && n==0)
									{
									n++; user.temp.push(user.leftValue[i]);
									}
									}
									}
								},10);
								
								$timeout(function(){
									user.leftValue=angular.copy(user.temp);
								},20);
								
							}else{
							
							user.temp=[];
							var k=0,l=0,n=0;
							for(var i=0; i<user.leftValue.length ;i++){
								if(resp[0] && resp[0].roles[0] && user.leftValue[i].id!=resp[0].roles[0].roleId)
									{
								//	user.temp.push(user.leftValue[i]);
									if(sessionStorage.getItem("userRoleId")==user.AppConstant.IHM_MANAGER_ROLE_ID){k++;/*ihmmanger only auditior need to comea8 */ n++;}
										
								if(user.leftValue[i].id==1001 && k==0)
								{
								k++;
								user.temp.push(user.leftValue[i]);
								}
							if(user.leftValue[i].id==1003 && l==0 && sessionStorage.getItem("userRoleId")==user.AppConstant.ADMIN_ROLE_ID)
							{
							l++;  user.temp.push(user.leftValue[i]);
							}
							if(user.leftValue[i].id==1004 && n==0)
							{
							n++; user.temp.push(user.leftValue[i]);
							}
							}
							}
							}
							$timeout(function(){
								user.leftValue=angular.copy(user.temp);
							},10);
							
							if(resp.length==2){
								//var index = user.leftValue.findIndex(p => p.id == 1003);
								var index = user.leftValue.findIndex(function(val) {
									  return val.id == 1003
								});
			        			if (index > -1) {
								user.leftValue.splice(index, 1);
							}
			        			

			        	    	
							}
							
							
						});
						
							
						}
						}
						
						},10);
						
						if(user.leftValue!=null){
						user.rightValue[0].id==1004 ? user.leftValue=result : user.leftValue.push({
							'id':1003,
							'name':'Manager'
						});
						}
						
						
						
					}
						
						
					
						$scope.signatureImage = res[0].signature;
						user.userSignature = $scope.signatureImage;
						
					});
			
			userFactory.getMaRoles(companyId).$promise.then(function(res) {
				console.log(res);
				user.roleResult = res;
				
				for (var i = 0; res[i] != null; i++) {
					if (user.managerRole==1 ? res[i].roleId !== user.AppConstant.ADMIN_ROLE_ID && res[i].roleId !== 1005 && res[i].roleId !== user.AppConstant.IHM_MANAGER_ROLE_ID: res[i].roleId !== user.AppConstant.ADMIN_ROLE_ID && res[i].roleId !== 1005  && res[i].roleId !== user.AppConstant.IHM_MANAGER_ROLE_ID) {
						user.leftValue.push({
							'name' : res[i].roleDesc,
							'id' : res[i].roleId
						});
						user.lftval.push({
							'name' : res[i].roleDesc,
							'id' : res[i].roleId
						});
					}
				}
			});
			if(user.userForm){
			user.userForm.$dirty = false;
			}
		}

		function changeCallback(){ 
			user.makingIhmORSMC  = false;
			if(user.saveForUpdateMode){
				user.enabled=false;
				toaster.warning(' please update it , in order to save the changes');	
				}
			else if (user.enabled) {
				
				user.lockMessage = user.AppConstant.CREATE.toUpperCase();
				user.createedit = user.AppConstant.CREATE.toUpperCase();
				 user.adminhide=0;
				 user.managerhide=0;
				user.updateActive=true;
				user.fieldNull();
				user.fname = false;
				user.lname = false;
				user.pNo = false;
				user.add = false;
				user.fil = false;
				user.photo = false;
				user.active = false;
				user.rev = false;
				user.idtru = true;
				user.idd = false;
				user.rightValue = [];
				user.leftValue = [];
				loadMoreLeft();
				sessionStorage.removeItem('updateSearchData', '');
				
			} else {
				
				user.lockMessage = user.AppConstant.UPDATE.toUpperCase();
				 user.adminhide=0;
				 user.managerhide=0;
				user.updateActive=false;
				user.signValue=false;
				user.fieldNull();
				user.createedit = user.AppConstant.UPDATE.toUpperCase();
				user.fname = true;
				user.lname = true;
				user.pNo = true;
				user.add = true;
				user.fil = true;
				user.photo = true;
				user.active = true;
				user.rev = true;
				user.idd = true;
				user.rightValue = [];
				user.leftValue = [];

			}
		};

		/** Email validation **/
		user.valEmail = function(value) {
			var email = /^(\w+([\.]?\w+))/i;
			 if (value && value.length && value.length<3) {
					toaster
							.warning('Please enter EmailId of Minimum length 3');
					user.emailid = null;
					return true;
				}
			if (value != null) {
			 if (!email.test(value) || value.indexOf("@") > 0) {
					toaster
							.warning('Please enter a valid Email ID <email@xyz.com>');
					user.emailid = null;
					return true;
				}
				
			}
		}

		user.update = function(roleId) {
			
			
		
			
			if(user.userupdateArray){
			if(user.userupdateArray.length!==0)
			{
				if(user.savedData.roles[0].roleId==1004)
				{/*
					//var index = user.leftValue.findIndex(p => p.id == 1003);
					var index = user.leftValue.findIndex(function(val) {
						  return val.id == 1003
					});
        			if (index > -1) {
					user.leftValue.splice(index, 1);
				}
				*/}
			else if(user.userupdateArray[0].managerOfficialId == user.savedData.managerOfficialId)
				{
					
					
					user.leftValue=null;
				}
				}	
		}
		
			if(roleId==1003){
				user.managerhide=1;
				user.roleTiltle='Manager';
			}
			
			user.enabled = false;
			user.updateActive=false;
			if(sessionStorage.getItem("userRoleId")==1003)
			{
				user.managerRole=1;
				//user.region = user.managerRegion;
				user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion;//Added by sudharsan for Jira-ID = IRI-5716
				if(!user.rightValue[0])
				{
					$scope.disabled = false;
				}
				if(user.savedData.roles[0].roleId==1001)
				{/*
					//var index = user.leftValue.findIndex(p => p.id == 1004);
					
				
					var index = user.leftValue.findIndex(function(val) {
						  return val.id == 1004
					});
					
        			if (index > -1) {
					user.leftValue.splice(index, 1);
				}
				
				*/}
			
			}
			else if(sessionStorage.getItem("userRoleId")==user.AppConstant.ADMIN_ROLE_ID)
			{
				user.adminRole=1;
			}	
			
			user.managerRegion = sessionStorage.getItem("managerRegion");
			//user.region = user.managerRegion;
			user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion;//Added by sudharsan for Jira-ID = IRI-5716
			user.createedit = user.AppConstant.UPDATE.toUpperCase();
			user.address = user.address ? decodeURIComponent(user.address):'';
			
		}

		/**Image File Conversion **/
		function getDataUri(url, callback) {
			var image = new Image();
			image.onload = function() {
				var canvas = document.createElement('canvas');
				canvas.width = this.naturalWidth;
				canvas.height = this.naturalHeight;
				canvas.getContext('2d').drawImage(this, 0, 0);
				callback(canvas.toDataURL('image/png').replace(
						/^data:image\/(png|jpg);base64,/, ''));
			};
			image.src = url;
		}
		
		
		user.saveUserDetails=function(maUsers){ 
			maUsers.region = maUsers.region == 1001? 1:maUsers.region == 1002?2:maUsers.region == 1003?3:maUsers.region;
			 userFactory.saveUserDetails(user.createedit,maUsers).$promise
					.then(function(res) {console.log(res);
						user.savedData=res;	
						toaster.success('User Details created successfully')
						console.log(user.savedData);	
						if(res && res.roles && res.roles.length>0){
							user.roleTiltle = res.roles[0].roleId==1004 ? 'Observer': res.roles[0].roleId==1001 ? 'Auditor' :res.roles[0].roleId==1003 ?'Manager' : user.roleTiltle ; 
						}
						
						if (user.createedit == user.AppConstant.CREATE.toUpperCase() && !res.error) {
							if (window.navigator.msSaveOrOpenBlob) {
								user.UserArray.push({
									'emailId' : res.emailId
								});
								
								
								
							}
							
							if (res.$resolved==true) {
								
								if(user.officialId)
								user.officialIds.push(user.officialId);
								
								user.roleId=maUsers.roles[0].roleId;
								
								getDataUri(
										'/assets/global/img/images.png',
										function(res) {
											
											$scope.dataurl = res;
											var UserDetailsConfig = {
												"displayName" : "",
												"searchResult" : '5',
												"userId" : user.seq != null ? (/^\d+$/.test(user.seq) ? user.seq : user.seq.toUpperCase()): user.seq,
												"emailId" : maUsers.emailId,
												"defaultHomeScreen" : 'app.dashboard',
												"managerName" : "",
												"role" : "",
												"headerColor" : "",
												"backgroundColor" : "",
												"fontColor" : "",
												"buttonColor" : "",
												"headerFontColor" : "",
												"companyId" : Number(companyId),
												"userIdentification" : $scope.dataurl
												
											};

											userFactory
													.saveProfileImage(UserDetailsConfig).$promise
													.then(function(res) {
														
														if(res.$resolved==true && !res.error)
														{
															
														user.lpin=maUsers.userPin[0].lapUniqId;
														}
														
													});

										});
							}
							user.userForm.$dirty = false;
							user.leftV = [];

							/** Creating typeaheads for Email in Update mode **/
							masterFactory.getEmail(companyId).$promise
									.then(function(res) {
										
										angular
												.forEach(
														res,
														function(value, key) {
															if (value.emailId == maUsers.emailId) {
																var email = value.emailId; 
																var indexVal = email.indexOf("@");
																var resultEmail = email.slice(0,indexVal);
																 var domname=email.length-1;
																 var domainName=email.slice(indexVal,domname+1);
																$scope.updateDomain=domainName;
																user.emailid=resultEmail;
																console.log(value);
																user.data
																		.push({
																			'emailId' :  maUsers.emailId,
																			'firstName' : value.firstName,
																			'lastName' : value.lastName,
																			'activeStatus' : value[3],
																			"signature" : value[4],
																			"phoneno" : value.phoneNo,
																			"address" : value.address,
																			'seqNo' : value.sequenceNo,
																			"ismreview":value.ismreview ? value.ismreview :'',
																			"ispsReview":value.ispsReview ? value.ispsReview :'',
																			"mlcreview":value.mlcreview ? value.mlcreview :'',
																			"ihmreview":value.ihmreview ? value.ihmreview :'' ,
																			"planApprovalReview":value.planApprovalReview ? value.planApprovalReview :'' ,
																			"officialId":value.officialId ? value.officialId:''		

																		});
																user.mail.push({
																	'sequenceNo':value.sequenceNo
																});
																user.emailResult.push({
																	'emailId' :  maUsers.emailId
															});
															}

														});
										user.UserArray = user.data;
										user.UserArray1 = user.data;
										angular
												.forEach(
														user.data,
														function(value, key) {
															if (value.emailId == maUsers.emailId) {
																user.emailid = user.emailid
																		//+ $scope.domainName;
															}
														});
									});
						} else if(user.createedit == user.AppConstant.UPDATE.toUpperCase() && !res.error) {
							
							
							toaster
									.success('User Details updated successfully')
									angular
												.forEach(
														user.UserArray,
														function(value, key) {
															if (res.emailId == value.emailId) {
																console.log(value);
																console.log(res);
																value.firstName=res.firstName;
																value.lastName=res.lastName;
																value.ihmreview = res.ihmreview ? res.ihmreview:'';
																value.ismreview = res.ismreview ? res.ismreview:'';
																value.ispsReview = res.ispsReview ? res.ispsReview:'';
																value.mlcreview = res.mlcreview ? res.mlcreview:'';
																value.officialId = res.officialId ? res.officialId:'';
																value.region = res.region;
															}
														});
							user.userForm.$dirty = false;
							if(user.makingIhmORSMC){
							user.UserArray.push(res); }
						}
						else if(res.error){
							toaster.error('User already exists for the same Official Id for the respective role');
						}
						
						user.UserArray = user.data;
						console.log(user.UserArray);
						user.update(user.roleId);
						
						userFactory.getMaRoles(companyId).$promise.then(function(res) {
							user.leftValue = [];
							if(user.savedData && user.savedData.roles && user.savedData.roles.length>0){
							for (var i = 0; res[i] != null; i++) {
								if ( user.savedData.roles[0].roleId!=res[i].roleId &&  ( (user.userRoleId==user.AppConstant.ADMIN_ROLE_ID && (res[i].roleId == 1001 || res[i].roleId ==1003 || res[i].roleId==1004))  || (user.userRoleId==1003 && (res[i].roleId == 1001  || res[i].roleId==1004)) ) ) {
									user.leftValue.push({
										'name' : res[i].roleDesc,
										'id' : res[i].roleId
									});
									user.lftval.push({
										'name' : res[i].roleDesc,
										'id' : res[i].roleId
									});
								}
							}
						}
						});

					});
			}
		user.validateEmail = function() {	  
			var flag= true;
			
			if (!user.emailid) {
				flag = false;
				toaster.warning('Email Id is Empty')
			}
			
			return flag;
			
		}
		
			
		user.submit = function(values, file) {
			
			if (user.validateEmail()) {
			
			user.address = user.address ? encodeURIComponent(user.address) :'';
			user.userSignature = $scope.signatureImage;
			
			user.leftV = [];
			user.userPin=[];
			
			
		
			angular.forEach(user.rightValue, function(value, key) {
				user.leftV.push({
					'roleId' : user.roleIdFromDbForIhm ? user.roleIdFromDbForIhm :  value.id,
					'emailId' : user.emailid ? user.emailid.emailId
							| user.emailid.toLowerCase() : user.emailid.toLowerCase(),
					'dateIns' : Date.now(),
					'userIns' : 'BSOL',
					'companyId' : Number(companyId),
					"activeStatus" : user.status 
				});
			});
			user.userPin.push({
				
				'emailId' : user.emailid ? user.emailid.emailId
					|| user.emailid.toLowerCase() : user.emailid.toLowerCase(),
				'lapUniqId': user.createedit == user.AppConstant.CREATE.toUpperCase() ? 'demo' : user.lpin,
				'macAddress':"mac",
				'dateIns' : Date.now(),
				'userIns' : 'BSOL',
			   'companyId' : Number(companyId),
				
			});
		
			
				
			
			var maUsers = {
				"firstName" :  user.firstname ? user.firstname :  user.firstname.firstName,
				"lastName" :  user.firstname ? user.lastname : user.lastname.lastName,
				"emailId" : user.emailid ? user.emailid.emailId || user.emailid.toLowerCase()
						: user.emailid.emailId,
				"password" : user.createedit == user.AppConstant.CREATE.toUpperCase() ? (user.createedit == user.AppConstant.UPDATE.toUpperCase() ? (user.emailid.emailId == 'kmoorhouse@register-iri.com'
						|| user.emailid.emailId == 'iriadmin@register-iri.com' ? 'welcome@123'
						: 'demo')
						: (user.emailid == "kmoorhouse@register-iri.com"
								|| user.emailid == "iriadmin@register-iri.com" ? 'welcome@123'
								: 'demo')) : 'demo',
				"phoneNo" : user.phoneno,
				"address" :( user.address && user.address != null ) ? decodeURIComponent(user.address)
						: user.address,
				"activeStatus" : user.status ? 1 : 0,
				"companyId" : Number(companyId),
				"userIns" : 'BSOL',
				"dateIns" : Date.now(),
				"signature" : user.userSignature,
				"roles" : user.leftV,
				"sequenceNo" : user.seq != null ? (/^\d+$/.test(user.seq) ? user.seq : user.seq.toUpperCase())
						: user.seq,
				"region" :	user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion == 1003?3:user.managerRegion,//Added by sudharsan for Jira-ID = IRI-5716
				//user.managerRole==1 ? user.managerRegion : user.region,
				"ispsReview" :user.review ? 1 : 0,
				"ismreview" : user.ismreview ? 1 : 0,
				"mlcreview" : user.mlcreview ? 1 : 0,
				"ihmreview" : user.ihmreview ? 1 : 0,
				"planApprovalReview" : user.planApprovalReview ? 1 : 0,
				"userIdentification" : user.userProfilePic,
				"officialId":user.officialId,
				"title":user.title,
				"userPin":user.userPin,
				"managerOfficialId":user.managerOfficialId,
				"updateBy":loggedInUser,
				"location": user.locationIHM ? user.locationIHM : '',
				"auditorId": user.auditorId ? user.auditorId :''		
			};

		}
			

			if (user.result = user.validate(maUsers)) {
				
				
				user.saveForUpdateMode = false;
				
				if(user.makingIhmORSMC){
				var  index = user.officilIdsToIhm.indexOf(user.officialId);
				if (index > -1) {
					user.officilIdsToIhm.splice(index, 1);
				}
			}else { user.officilIdsToIhm.push(user.officialId);
				
			}
				
					maUsers.emailId = maUsers.emailId + $scope.domainName;
				
					maUsers.userPin[0].emailId = maUsers.userPin[0].emailId + $scope.domainName;
					
					
				if(maUsers.roles[0].roleId==1001 || maUsers.roles[0].roleId==1004 || maUsers.roles[0].roleId==1003)
				{
					
				userFactory.getManagerDetails(Number(maUsers.region == 1001? 1:maUsers.region == 1002?2:maUsers.region == 1003?3:maUsers.region),companyId).$promise.then(function(res) {
					
					if(res.success==true)
					{
						user.saveUserDetails(maUsers);
					}
					else{
						
						var place = _.findWhere(user.regionArray, {'regionId' : maUsers.region});
						
						toaster.warning('Create Active Manager for '+place.regionName +' Region');
					}
				});
				}
				else{
					
					user.saveUserDetails(maUsers);
				}
					
				console.log("insidesubmitlast")
			
			}
			user.address = user.address ? decodeURIComponent(user.address):'';
			return user.result;
		}
		
		function retrieveUsers(){
			
			
			if(user.officialIds && user.officialIds.length==0){
				user.officialIds.push(100);	
			}
			
			userFactory.listAuditorsNotInOfficialIds(user.officialIds).$promise.then(function(res) {
		console.log(res);
		          userFactory.listAuditorsInOfficialIds(user.officilIdsToIhm).$promise.then(function(data) {
		        	  console.log(data);
		        	  
		        	  if(sessionStorage.getItem("userRoleId")==1006){
		        	  user.toCertifyIhm = data; 
		        	  var userDataTemp='';
		        	  if(user.toCertifyIhm && user.toCertifyIhm.length>0){
		        		  user.toCertifyIhm = user.toCertifyIhm.filter(function( obj ) {
								return obj.signer!='R1Manager' && obj.signer!='R2Manager' && obj.signer!='R3Manager';
							});
		        		  
		        		  user.toCertifyIhm = user.toCertifyIhm.filter(function(obj) {
		        			  userDataTemp = _.findWhere(user.UserArray1, {officialId: obj.officialId});
		        			 
		        			  
					    		if (userDataTemp && (!userDataTemp.ihmreview ||  userDataTemp.ihmreview!=1 ) && obj.ihm && (obj.ihm=='Y' || obj.ihm=='y')){
					    			
					    			return obj;
					    			}
					    	});
		        	  }
		        	}else if(sessionStorage.getItem("userRoleId")!=user.AppConstant.IHM_MANAGER_ROLE_ID){
		        		var userDataTemp='';
		        		user.toCertifySMC = data;
		        		 if(user.toCertifySMC && user.toCertifySMC.length>0){
			        		  user.toCertifySMC = user.toCertifySMC.filter(function( obj ) {
									return obj.signer!='R1Manager' && obj.signer!='R2Manager' && obj.signer!='R3Manager';
								});
			        		  
			        		  user.toCertifySMC = user.toCertifySMC.filter(function(obj) {
			        			  userDataTemp = _.findWhere(user.UserArray1, {officialId: obj.officialId});
			        			   if( userDataTemp && ((userDataTemp.ispsReview!=1 && (obj.msa=='Y'|| obj.msa=='y')) || (userDataTemp.ismreview!=1 && (obj.ism=='Y'|| obj.ism=='y')) ||  (userDataTemp.mlcreview!=1 && (obj.mlc=='Y'|| obj.mlc=='y')))  ){
						    			   return obj;
						    		   }else if( userDataTemp && ((userDataTemp.ispsReview!=1 && (obj.msa=='N'|| obj.msa=='n')) && (userDataTemp.ismreview!=1 && (obj.ism=='N'|| obj.ism=='n')) &&  (userDataTemp.mlcreview!=1 && (obj.mlc=='n'|| obj.mlc=='N')))  ){
						    			   return obj; /* make observer rmi N N N*/
						    		   }	
						    		
						    	});
			        	  }
		        		 
		        	}
		        	  
		        	  
				if(res.length==0 && (user.toCertifyIhm && user.toCertifyIhm.length==0 && user.toCertifySMC && user.toCertifySMC.length==0)){
					toaster.warning('There are no User Details');
					}
				else{
					if(user.r1r2r3AreThere){
					res = res.filter(function( obj ) {
						return obj.signer!='R1Manager' && obj.signer!='R2Manager' && obj.signer!='R3Manager';
					});	
					}
				if(user.createedit == user.AppConstant.CREATE.toUpperCase() || user.makingIhmORSMC){
					
					
					user.userList=res;
					
					 if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID){
						user.userList = user.userList.filter(function(obj) {
				    		return (obj.ihm && (obj.ihm=='Y' || obj.ihm=='y'  ));
				    	});
						}
					
					if(res.length>0 || ( (user.toCertifyIhm && user.toCertifyIhm.length>0 ) || (user.toCertifySMC && user.toCertifySMC.length>0) )){
						//user.toCertifyIhm   = user.userList;
						ModalService.showModal({
			    			
			    			templateUrl : 'src/modals/userSignature.html',
			    			
				            controller  : 'UserSigantureController as uc',
				            
				            inputs : {
				            	
				            	scope : {'userList':user.userList ,'toCertifyIhm' :  user.toCertifyIhm , 'toCertifySMC' :  user.toCertifySMC}
				            }
				            
			        	}).then(function(modal) {
			    			
			    			modal.element.modal();
			    			
				            modal.close.then(function(result) {
				            	
				            	if(result=='OK'){
				            		user.makingIhmORSMC = false;
				            		user.phoneno = '';
				            		//user.region='';
									user.region = user.managerRegion == 1? 1001:user.managerRegion == 2?1002:user.managerRegion== 3?1003:user.managerRegion; //Added by sudharsan for Jira-ID = IRI-5716
				            		var selectedUsr = _.findWhere(user.userList, {'check' : 1});
				            	 
				            		if(selectedUsr){
				            			
				            			if(user.leftValue.length==2 && user.managerRole!=1){
				            			user.leftValue.push({
											'name' : 'MANAGER',
											'id' : 1003
										});
				            			}
				            			 
				            			user.status = (selectedUsr.status && ( selectedUsr.status=="ACTIVE" || selectedUsr.status=="Active"  || selectedUsr.status=="active")) ? 1 : user.status;
				            			
				            			if(user.userRoleId !=user.AppConstant.IHM_MANAGER_ROLE_ID && !user.onlyPlanApproval){
				            			
					            			selectedUsr.ism=selectedUsr.ism ? selectedUsr.ism.toLowerCase():'';
					            			selectedUsr.msa=selectedUsr.msa ? selectedUsr.msa.toLowerCase() : '';
					            			selectedUsr.mlc=selectedUsr.mlc ? selectedUsr.mlc.toLowerCase() : '';
											selectedUsr.planApproval=selectedUsr.planApproval?selectedUsr.planApproval.toLowerCase():'';//Added by sudharsan for jira id=IRI-5495
											selectedUsr.ihm=selectedUsr.ihm ? selectedUsr.ihm.toLowerCase():'';//Added by sudharsan for jira id=IRI-5495
					            			selectedUsr.ism == "y" ? user.ismreview=1 : user.ismreview=0;
					            			selectedUsr.msa =="y" ? user.review=1 : user.review=0;
					            			selectedUsr.mlc=="y" ? user.mlcreview=1: user.mlcreview=0;
											selectedUsr.planApproval=="y"?user.planApprovalReview = 1:user.planApprovalReview=1;//Added by sudharsan for jira id=IRI-5495
											selectedUsr.ihm=="y"?user.ihmreview = 1:user.ihmreview=1;//Added by sudharsan for jira id=IRI-5495
				            			}
				            		
				            		user.managerOfficialId=selectedUsr.officialId  ? selectedUsr.officialId : '';
				            		user.seq=selectedUsr.officialId;
			            			$scope.signatureImage = selectedUsr.signature ? selectedUsr.signature : '';
			            			user.officialId=selectedUsr.officialId;
			            			console.log(selectedUsr); 
			            			
			            			user.emailid = (selectedUsr && selectedUsr.emailAddress && selectedUsr.emailAddress!=null) ?  selectedUsr.emailAddress.substring(0,selectedUsr.emailAddress.indexOf("@")) : user.emailid;
			            			user.lastname = (selectedUsr.lastName) ? selectedUsr.lastName : user.lastname;
			            			user.firstname = (selectedUsr.firstName) ? selectedUsr.firstName : user.firstname;
			            			user.auditorId = selectedUsr.auditorId ? selectedUsr.auditorId : 0;
			            			user.address = (selectedUsr.address) ? selectedUsr.address : user.address;
			            			
			            			if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID){
			            			selectedUsr.ihm=="y" ? user.ihmreview=1: user.review=0;
			            			user.locationIHM = (selectedUsr.ihm=='Y' && selectedUsr.location ) ?  selectedUsr.location : user.locationIHM; 
			            			user.ihmHideFlag = (selectedUsr.ihm=='Y') ? true : user.ihmHideFlag;
			            			user.ihmreview = (selectedUsr.ihm && selectedUsr.ihm=="N" ) ? 0 : (selectedUsr.ihm && selectedUsr.ihm=="Y" ) ? 1 : user.ihmreview; 
			            			
			            			}
			            			user.review = (selectedUsr.msa && selectedUsr.msa=="y" ) ? 1 : user.review;
			            		//	var index = user.leftValue.findIndex(p => p.id == 1005);
			            			
			            			var index = user.leftValue.findIndex(function(val) {
			  						  return val.id == 1005
			  					});
			            		
			            			if (index > -1) {
	            					user.leftValue.splice(index, 1);
			            			}
	            					
			            			userFactory.verifyOfficialId(user.officialId,companyId).$promise.then(function(res) {
			            				console.log(res);
			            				user.userupdateArray=res;
			            				if(res[0]){
			            				if(res[0].managerOfficialId && !res[0].officialId)
			            				{
			            					
					            			
					            			
					            			//var index = user.leftValue.findIndex(p => p.id == 1003);
			            					var index = user.leftValue.findIndex(function(val) {
			          						  return val.id == 1003
			          					});
					            			if (index > -1) {
			            					user.leftValue.splice(index, 1);
					            			}
			            					
			            				}}
			            			});
			            			
				            		if(user.rightValue[0]){
				            			if(user.rightValue[0].id==1003){
				            			user.managerOfficialId=selectedUsr.officialId;
				            			user.seq ? user.seq='IRI'+ user.seq : user.seq='';
				            			//user.officialId='';
				            			}
				            		}
				            			
				            			
				            			user.title=selectedUsr.title;
				            			toaster.success('Signature fetched Successfully');
				            		}
				            	}else if(result=="okForToIhm"){
				            		user.makingIhmORSMC = true;
				            		var selectedUsr = _.findWhere(user.toCertifyIhm, {'check' : 1});
				            		selectedUsr.ihm=="y" ? user.ihmreview=1: user.review=0;
			            			user.locationIHM = (selectedUsr.ihm=='Y' && selectedUsr.location ) ?  selectedUsr.location : user.locationIHM; 
			            			user.ihmHideFlag = (selectedUsr.ihm=='Y') ? true : user.ihmHideFlag;
			            			user.ihmreview = (selectedUsr.ihm && selectedUsr.ihm=="N" ) ? 0 : (selectedUsr.ihm && selectedUsr.ihm=="Y" ) ? 1 : user.ihmreview; 
			            			user.enableForAdminIHM=true
			            			user.createedit = user.AppConstant.UPDATE.toUpperCase();
			            			user.ihmreviewSMCUpdate = (selectedUsr.ihm &&  ( selectedUsr.ihm=='y' || selectedUsr.ihm=='Y' )) ? 1  :'';
			            			user.ihmreviewLocSMCUpdate = ( selectedUsr.ihm &&  ( selectedUsr.ihm=='y' || selectedUsr.ihm=='Y' ) && selectedUsr.location ) ?  selectedUsr.location : user.locationIHM; 
				            		userFactory.verifyOfficialId(selectedUsr.officialId,companyId).$promise.then(function(resp) { console.log(resp); 
				            		if(resp && resp.length>0 && resp[0]){
				            			user.focusSuccessive(resp[0]);
				            		}
				            		});
				            		
				            		
				            		
				            	}else if(result=="okForToSMC"){
				            		user.makingIhmORSMC = true;
				            		var selectedUsr = _.findWhere(user.toCertifySMC, {'check' : 1});
				            		console.log(selectedUsr);
				            		user.ismreviewSMCUpdate =(selectedUsr.ism &&  ( selectedUsr.ism=='y' || selectedUsr.ism=='Y' )) ? 1 :'';
									user.reviewSMCUpdate = (selectedUsr.msa &&  ( selectedUsr.msa=='y' || selectedUsr.msa=='Y' )) ? 1  :'';
									user.mlcreviewSMCUpdate = (selectedUsr.mlc &&  ( selectedUsr.mlc=='y' || selectedUsr.mlc=='Y' )) ? 1  :'';
									
			            			user.createedit = user.AppConstant.UPDATE.toUpperCase();
			            			
				            		userFactory.verifyOfficialId(selectedUsr.officialId,companyId).$promise.then(function(resp) { console.log(resp); 
				            		if(resp && resp.length>0 && resp[0]){
				            			user.focusSuccessive(resp[0]);
				            		}
				            		});
				            		
				            		
				            	}
				            });
				        });  
						
					}else if(res.length==0){
						
						user.disableCreate=1;
						if(!$scope.signatureImage)
						toaster.warning('Sorry, user details are not available');
						user.fieldNull(); 
					}
				}}
				
			});
			});
		}//end of retrieveUsers()
		
		user.refreshDataRmiMissMatch = function(offcialId){ 
            	var signer =(user.firstname && user.lastname) ?  ""+user.firstname+" "+user.lastname:null;
			userFactory.RefreshRmiData(offcialId,companyId).$promise.then(function(res) {
				console.log(res);
				if(res && res.officialId){
					var ism = (res.ism && res.ism.toUpperCase()=="N" ) ?  0 : (res.ism && ( res.ism=="Y" || res.ism=="y")) ? 1 : 0;
					var isps = (res.msa && res.msa.toUpperCase()=="N" ) ? 0 : (res.msa && (res.msa=="Y" || res.msa=="y" ) ) ? 1 : 0;
					var mlc = (res.mlc && res.mlc=="N" ) ? 0 : (res.mlc && (res.mlc=="Y" || res.mlc=="y") ) ? 1 : 0;
					var status =(res.status && (res.status=='ACTIVE' || res.status=='Active' || res.status.toUpperCase()=='ACTIVE')) ? 1 :0;
					var planapproval = (res.planApproval && res.planApproval.toUpperCase()=="N" ) ? 0 : (res.planApproval && res.planApproval.toUpperCase()=="Y" ) ? 1 : 0;  //Added by sudharsan for PA changes not updating in UI
					if(user.userRoleId==user.AppConstant.IHM_MANAGER_ROLE_ID){
					user.ihmreviewFromRmi = (res.ihm && res.ihm=="N" ) ? 0 : (res.ihm && (res.ihm=="Y" || res.ihm=="y" )) ? 1 : 0; 
					if(user.ihmreview!=user.ihmreviewFromRmi || user.locationIHM!=res.location || user.status !=status){
						toaster.clear();
						toaster.warning('User details have been updated in  RMI , Please Refresh  RMI data and Update it');
						
					}
					}else if(user.ismreview!=ism || user.review!=isps || user.mlcreview!= mlc || user.status !=status || user.planApprovalReview!=planapproval) {  //Added by sudharsan for PA changes not updating in UI
						toaster.clear();
						toaster.warning(' User details have been updated in  RMI , Please Refresh  RMI data and Update it ');
						
					}
					
					if( (res.firstName && res.firstName!=user.firstname) || (res.lastName && res.lastName!=user.lastname) || (res.address && res.address.toUpperCase() !=user.address.toUpperCase()) ){
						toaster.clear();
						toaster.warning('User details have been updated in  RMI , Please Refresh  RMI data and Update it');
					
					}
					
				}else if(res && signer){
					user.userNotPresentRmi=true;
					toaster.warning(signer + ' does not exists in the RMI DB ');
				}
				
			});
			
			
		}

	}

})();