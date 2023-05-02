/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name config.controller.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh, Tharani priya  DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/config/config.controller.js $
**/

(function() {
	'use strict';

	angular.module('app.config')

	.controller('ConfigAuditController', ConfigAuditController);

	function ConfigAuditController(masterFactory, toaster, $rootScope,
			$cookies, auditorName, screenData, $scope) {

		var config = this; 

		config.userId = sessionStorage.getItem("userSequenceNo");
		var companyId = sessionStorage.getItem("companyId");
		config.closeIcon=true;
		config.userRoleId = sessionStorage.getItem('userRoleId'); 
		
		config.removeImage = removeImage;

		config.role = _(auditorName).chain().where({
			'emailId' : sessionStorage.getItem("emailId")
		}).pluck('roles').flatten().value()[0].roleDesc;

		config.roldeId = _(auditorName).chain().where({
			'emailId' : sessionStorage.getItem("emailId")
		}).pluck('roles').flatten().value()[0].roleId;

		config.managerName = sessionStorage.getItem("usrname");

		config.screenArray = screenData;

		config.searchCount = [ {
			searchResults : '5'
		}, {
			searchResults : '10'
		}, {
			searchResults : '15'
		}, {
			searchResults : '20'
		}, {
			searchResults : '25'
		} ];

		config.authorisation=[];
		
masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	if(res && res.length>0){
    		config.authorisation=res[0];
    		if(res[0].ihmreview==1){
    			config.ihmUser=true;
    		}
			if(res[0].planApprovalReview==1)
			{
				config.planApprovalUser=true;
			}
    	}
});
		
		
		masterFactory.getConfigDetails(config.userId, companyId).$promise
				.then(function(res) {
					if (res.length != 0) {
						
						config.homeScreen = res[0].defaultHomeScreen ? res[0].defaultHomeScreen : 'app.dashboard';
						
						config.displayname = res[0].displayName;
						if(config.displayname==null){
						config.displayname=sessionStorage.getItem("usrname");
						}
						config.searchResults = res[0].searchResult ? res[0].searchResult : '5' ;
						config.headerColor = res[0].headerColor;
						config.backgroundColor = res[0].backgroundColor;
						config.fontColor = res[0].fontColor;
						config.buttonColor = res[0].buttonColor;
						config.headerFontColor = res[0].headerFontColor;

						$rootScope.headerColor = res[0].headerColor ? res[0].headerColor
								: '';
						$rootScope.backgroundColor = res[0].backgroundColor ? res[0].backgroundColor
								: '';
						$rootScope.fontColor = res[0].fontColor ? res[0].fontColor
								: '';
						$rootScope.buttonColor = res[0].buttonColor ? res[0].buttonColor
								: '';
						$rootScope.headerFontColor = res[0].headerFontColor ? res[0].headerFontColor
								: '';
						if (res[0].headerColor) {
							$rootScope.sidebarinvertColor = $rootScope
									.lightenDarkenColor(res[0].headerColor, 20);
						}
						if (res[0].userIdentification == null) {

							config.userProfilePic = $scope.dataurl;

						} else {
							
							$scope.photoImage = $rootScope.arrayBufferToBase64(res[0].userIdentification);
							config.userProfilePic = $scope.photoImage;
						}
					}

					if (res[0] == null) {
						config.displayname = null;
						config.searchResults = null;
						config.headerColor = null;
						config.backgroundColor = null;
						config.fontColor = null;
						config.buttonColor = null;
						config.headerFontColor = null;

					}

				});

		config.defaultColor = function() {
			config.headerColor = null;
			config.backgroundColor = null;
			config.fontColor = null;
			config.buttonColor = null;
			config.headerFontColor = null;
		}

		
		
		config.submit = function() {

			config.userProfilePic = $scope.photoImage;
			var UserDetailsConfig = {
				"displayName" :config.displayname ?  config.displayname.toUpperCase():'',
				"searchResult" : config.searchResults,
				"userId" : config.userId,
				"defaultHomeScreen" : config.homeScreen,
				"managerName" : config.managerName,
				"role" : config.role,
				"headerColor" : config.headerColor,
				"backgroundColor" : config.backgroundColor,
				"fontColor" : config.fontColor,
				"buttonColor" : config.buttonColor,
				"headerFontColor" : config.headerFontColor,
				"companyId" : Number(companyId),
				"userIdentification" : config.userProfilePic,
				"emailId":sessionStorage.getItem("emailId")

			};

			if (config.headerColor) {
				$rootScope.sidebarinvertColor = $rootScope.lightenDarkenColor(
						config.headerColor, 20);
			} else {
				$rootScope.sidebarinvertColor = "";
			}

			$rootScope.headerColor = config.headerColor;
			$rootScope.buttonColor = config.buttonColor;
			$rootScope.backgroundColor = config.backgroundColor;
			$rootScope.fontColor = config.fontColor;
			$rootScope.headerFontColor = config.headerFontColor;
			$rootScope.$broadcast('displayName', config.displayname.toUpperCase());
			sessionStorage.setItem("usrname",config.displayname );
			$rootScope.$broadcast('profilepic', config.userProfilePic);
			$rootScope.phoImage=config.userProfilePic;
			
			masterFactory.saveConfigDetails(UserDetailsConfig).$promise
					.then(function(res) {
						if (res) {
							sessionStorage.setItem("defaultSearchCount",	config.searchResults );
							if ($rootScope.fileUploadValue == true)
								toaster
										.success('User Configuration Details updated successfully');
							else
								toaster
										.warning('Please upload image file (FileName should not be longer than 35 characters)');

						}
					});

		};

		
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

		
		
		function removeImage(){
			getDataUri(
					'/assets/global/img/images.png',
					function(res) {
						$scope.dataurl = res;
						var UserDetailsConfig = {
								"displayName" : config.displayname,
								"searchResult" : config.searchResults,
								"userId" : config.userId,
								"defaultHomeScreen" : config.homeScreen,
								"managerName" : config.managerName,
								"role" : config.role,
								"headerColor" : config.headerColor,
								"backgroundColor" : config.backgroundColor,
								"fontColor" : config.fontColor,
								"buttonColor" : config.buttonColor,
								"headerFontColor" : config.headerFontColor,
								"companyId" : Number(companyId),
								"userIdentification" : $scope.dataurl,
								"emailId":sessionStorage.getItem("emailId")
						};

						masterFactory.removeImage(UserDetailsConfig).$promise.then(function(res) {
							
							if(res){
							$scope.photoImage = $scope.dataurl;
							config.closeIcon=false;
							}
							
						});

					});
			
			
			
		}
		
	}

})();