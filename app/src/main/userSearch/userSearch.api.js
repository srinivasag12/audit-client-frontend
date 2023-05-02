(function() {
	'use strict';
	angular.module('app.userSearch').factory('userSearchApi', userSearchApi);
	function userSearchApi($resource, BASE_URL) {
		var userSearchApi = {};
		
		userSearchApi.getRegionalUsers = $resource('master/getRegionalUsers', {},{
			query : {
			method :'POST',
			cache  : false,
			isArray: false,
			transformResponse : function(data, headersGetter,status) {
				return {
					data : data,
					status : status
				};
			}
		}
		});
		
		return userSearchApi;
	}

})();