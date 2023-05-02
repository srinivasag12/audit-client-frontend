(function () {
	'use strict';

	angular.module('app.centralLog').config(centralLogRouteConfig);

	function centralLogRouteConfig($stateProvider, $urlRouterProvider,
		$locationProvider) {

		$stateProvider.state('app.centralLog', {
			url: "/centralLog",
			views: {
				'module@app': {
					templateUrl: 'src/main/centralLog/centralLog.html',
					controller: 'CentralLogController as log'
				}
			},
			data: {
				pageTitle: 'Central Log',
				pageModule: 'log'
			},
			resolve: {

				searchRequiredData: function ($q, auditFactory, $cookies, detailsFactory) {
					return $q.all([

					detailsFactory.getAudObsData(sessionStorage.getItem("companyId")).$promise

					]).then(function (data) {

						return data;

					});

				}

			}
		});
	}

})();