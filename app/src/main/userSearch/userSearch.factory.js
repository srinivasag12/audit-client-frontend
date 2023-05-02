(function() {
	'use strict';

	angular.module('app.userSearch').factory('userSearchFactory', userSearchFactory);

	function userSearchFactory(userSearchApi) {

		var userSearchFactory = {
				
				getRegionalUsers:getRegionalUsers
				
		};

		
		return userSearchFactory;
		
		function getRegionalUsers(regionData) {
			return userSearchApi.getRegionalUsers.query({method:'POST',catche:true},regionData, function(res) {
				return res;
			})
		}
		;
		
		
	

	}		

})();