(function() {
	'use strict';
	angular.module('app.vesselStatement').factory('vesselStatementApi',
			vesselStatementApi);
	function vesselStatementApi($resource, BASE_URL) {
		var vesselStatementApi = {};
		
	
		
		vesselStatementApi.getRmiProced = $resource(BASE_URL
				+ 'audit/ism/getRmiProced/:companyId/:vesselImo', {
			companyId : '@companyId',
			vesselImo : '@vesselImo'
		}, {

			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		
		
		vesselStatementApi.getVesselImono = $resource(
				'master/getImoNo/:companyId', {
					companyId : '@companyId'
				});
		
		
		vesselStatementApi.getVesselCompanyDetails = $resource(
				'master/getVesselCompanyDetails/:imo/:companyId', {
					imo :'@imo',
					companyId : '@companyId'
				
				});
		vesselStatementApi.getVesselDetails = $resource(
				'master/getVesselDetails/:imo/:companyId', {
					imo :'@imo',
					companyId : '@companyId'
				
				},{
		    		query : {
		    			method  : 'GET',
		    			isArray : false
		    		}
		    	});

		vesselStatementApi.vesselSpecificDtl = $resource(BASE_URL+'rmiService/vesselDataWithoutUpdate/:companyId/:userId/:vesselIMONo/:docTypeNum',{
    		companyId:'@companyId',
    		userId:'@userId',
    		vesselIMONo:'@vesselIMONo',
    		docTypeNum:'@docTypeNum'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
		
		
		vesselStatementApi.getVesselSearchData = $resource(BASE_URL
				+ 'audit/search/getVesselSearchData/:ImoNo/:companyId', {
			ImoNo : '@ImoNo',
			companyId : '@companyId'
		}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : true
			}
		});

		vesselStatementApi.generateStatReport = $resource(
				BASE_URL
						+ 'audit/report/GenerateStatReport/:screenId/:category/:format/:companyId',
				{
					screenId : '@screenId',
					category : '@category',
					format : '@format',
					companyId : '@companyId'
				}, {

					put : {
						method : 'POST',
						isArray : false,
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,
								status) {
							return {
								data : data,
								status : status,
								headersGetter : headersGetter
							};
						}
					}
				});
		
		vesselStatementApi.getVesselHistory = $resource(BASE_URL+'audit/ism/getVesselHistory/:vesselImoNo/:status',{vesselImoNo:'@vesselImoNo',status:'@status'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: false
    		}
    	});

		return vesselStatementApi;

	}

})();