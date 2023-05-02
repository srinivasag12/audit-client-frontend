(function() {
	'use strict';
	angular.module('app.master.user').factory('userApi', userApi);
	function userApi($resource, BASE_URL) {

		var userApi = {};
		
		
		userApi.allUserRmi = $resource(BASE_URL+'rmiService/allUserRmi', {
			
		}, {
			get : {
				isArray : true
			}
		});
		
		
		
		
		userApi.getManagerDetails = $resource(
				'master/getManagerDetails/:regionId/:companyId', {
					regionId:'@regionId',
					companyId : '@companyId'
				});
		
		
		userApi.verifyOfficialId = $resource(
				'master/verifyOfficialId/:officialId/:companyId', {
					officialId:'@officialId',
					companyId : '@companyId'
				}, {
					get : {
						isArray : false
					}
				});
		
		userApi.getManagerRegion = $resource(
				'master/getManagerRegion/:companyId', {
					companyId : '@companyId'
				});

		/* data population for duallist */
		userApi.getMaRoles = $resource('master/getMaRoles/:companyId', {
			companyId : '@companyId'
		}, {
			get : {
				isArray : true
			}
		});

		userApi.saveUserDetails = $resource(BASE_URL
				+ 'master/saveUserDetails/:flag', {
			flag : '@flag'
		}, {
			save : {
				method : 'POST',
				isArray : false
			},
			update : {
				method : 'POST',
				isArray : false
			}
		});

		userApi.saveProfileImage = $resource(BASE_URL
				+ 'master/saveProfileImage', {}, {
			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});
		
		userApi.getSignupload = $resource(BASE_URL+'rmiService/listAuditorSignAndSeal/:userName/:companyId', {
			userName : '@userName',
			companyId:'@companyId'
		}, {
			get : {
				isArray : true
			}
		});
		
		
		
		
		userApi.RefreshRmiData = $resource(BASE_URL+'rmiService/auditorSignAndSeal/:OfficialId/:companyId', {
			OfficialId : '@OfficialId',
			companyId:'@companyId'
		}, {
			query : {
				method :'GET',
				isArray: false,
				cache  : false,
			}
		});
		
		userApi.listAuditorsNotInOfficialIds = $resource(BASE_URL+'rmiService/listAuditorsNotInOfficialIds',{},{
			query : {
				method :'POST',
				isArray: true,
				cache  : false,
			}
		});
		
		
		userApi.listAuditorsInOfficialIds = $resource(BASE_URL+'rmiService/listAuditorsInOfficialIds',{},{
			query : {
				method :'POST',
				isArray: true,
				cache  : false,
			}
		});
		
		
		userApi.nameBasedUserDetails = $resource('master/nameBasedUserDetails/:emailId/:companyId', {
			emailId : '@emailId',
			companyId:'@companyId'
		}, {
			get : {
				isArray : true
			}
		});
		
		userApi.getStatusResponse = $resource(BASE_URL+'master/getStatusResponse/:auditTypeId/:companyId', {
			auditTypeId:'@auditTypeId',
			companyId:'@companyId',
			
		}, {
			save : {
			method : 'POST',
				isArray : false
			}
		});
		
		
		userApi.getActiveStatusResponse = $resource(BASE_URL+'master/getActiveStatusResponse/:companyId', {
			companyId:'@companyId',
			
		}, {
			save : {
			method : 'POST',
				isArray : false
			}
		});
			

		return userApi;
	}

})();