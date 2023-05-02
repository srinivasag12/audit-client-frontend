(function() {
	'use strict';

	angular.module('app.master.user').factory('userFactory', userFactory);

	function userFactory(userApi) {

		var userFactory = {

			getMaRoles : getMaRoles,
			saveUserDetails : saveUserDetails,
			saveProfileImage : saveProfileImage,
			nameBasedUserDetails:nameBasedUserDetails,
			getManagerRegion:getManagerRegion,
			getStatusResponse:getStatusResponse,
			getActiveStatusResponse:getActiveStatusResponse,
			signupload:signupload,
			getManagerDetails:getManagerDetails,
			listAuditorsNotInOfficialIds:listAuditorsNotInOfficialIds,
			verifyOfficialId:verifyOfficialId,
			RefreshRmiData:RefreshRmiData,
			allUserRmi:allUserRmi,
			listAuditorsInOfficialIds:listAuditorsInOfficialIds

		};

		return userFactory;
		
		
		function allUserRmi(companyId) {
			return userApi.allUserRmi.query({
				
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;
		
		
		function getManagerDetails(regionId,companyId) {
			return userApi.getManagerDetails.get({
				regionId : regionId,
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;
		
		function verifyOfficialId(officialId,companyId) {
			return userApi.verifyOfficialId.query({
				officialId : officialId,
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;
		
		function getManagerRegion(companyId) {
			return userApi.getManagerRegion.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;

		/* data population for duallist */
		function getMaRoles(companyId) {
			return userApi.getMaRoles.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;
		

		/* saving and updating user details */
		function saveUserDetails(flag, data) {
			return userApi.saveUserDetails.save({
				flag : flag
			}, data, function(res) {
				return res;
			});
		}
		;

		function saveProfileImage(data) {
			return userApi.saveProfileImage.save({}, data, function(res) {
				return res;
			});
		}
		;
		

		function signupload(userName,companyId) {
			return userApi.getSignupload.query({
				userName : userName,
				companyId:companyId,
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;
		
//		function getMaRoles(companyId) {
//			return userApi.getMaRoles.query({
//				companyId : companyId,
//				method : 'GET'
//			}, function(res) {
//
//				return res;
//			});
//		}
//		;
		
		
		function RefreshRmiData(OfficialId,companyId) {
			return userApi.RefreshRmiData.query({
				OfficialId : OfficialId,
				companyId:companyId,
				method : 'GET'
			}, function(res) {

				return res;
			});
		};
		
		
		function listAuditorsNotInOfficialIds(officialIds){
			return userApi.listAuditorsNotInOfficialIds.query({method : 'POST'},officialIds,function(res){

				return res;
			});
		};
		function listAuditorsInOfficialIds(officialIds){
			return userApi.listAuditorsInOfficialIds.query({method : 'POST'},officialIds,function(res){

				return res;
			});
		};
	   
		function nameBasedUserDetails(emailId,companyId) {
			return userApi.nameBasedUserDetails.query({
				emailId : emailId,
				companyId:companyId,
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;
		
		
		function getStatusResponse(auditTypeId,companyId,data) {
			
			return userApi.getStatusResponse.save({
				auditTypeId:auditTypeId,
				companyId:companyId
			},data, function(res) {

				return res;
			});
		}
		;
		
   function getActiveStatusResponse(companyId,data) {
			
			return userApi.getActiveStatusResponse.save({
				
				companyId:companyId
			},data, function(res) {

				return res;
			});
		}
		;

	}

})();