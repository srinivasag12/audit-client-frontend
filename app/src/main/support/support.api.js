(function() {
	'use strict';
	angular.module('app.support').factory('supportApi', supportApi);

	function getLeadName($resource, BASE_URL) {

	}

	function supportApi($resource, BASE_URL) {

		supportApi.upload = $resource(BASE_URL + 'audit/support/fileUpload', {},
				{
			query : {
				method : 'POST'
			}
				});

		supportApi.getSupportSearchResult = $resource(BASE_URL+'audit/support/getReterivedAudits',{},{
			put : {
				method :'POST',
				cache  : false,
				isArray: true 
			}
		});

		supportApi.getUploadedSearchResult = $resource(BASE_URL+'audit/support/getSupportAuditDtls',{},{
			put : {
				method :'POST',
				cache  : false,
				isArray: true 
			}
		});


		supportApi.getLeadName = $resource(BASE_URL + 'audit/support/getLeadName',
				{}, {
					query : {
						auditSeqNo : '@auditSeqNo',
						companyId : '@companyId'
					}
				});

		supportApi.getReterivedAuditData = $resource(BASE_URL + 'audit/support/getReterivedAuditData/:auditSeqNo/:auditType/:auditSubType/:companyId',
				{}, {
					query : {
						auditSeqNo : '@auditSeqNo',
						auditType : '@auditType',
						auditSubType : '@auditSubType',
						companyId : '@companyId'
					}
				});

		supportApi.downloadSupportAttach = $resource(BASE_URL + 'audit/support/downloadReterivedAudit/:auditSeqNo/:vesselImoNo/:auditTypeId/:auditSubTypeId/:companyId',
				{
			auditSeqNo 		: '@auditSeqNo',
			vesselImoNo 	: '@vesselImoNo',
			auditTypeId 	: '@auditTypeId',
			auditSubTypeId  : '@auditSubTypeId',
			companyId 		: '@companyId'
				} ,{
					query : {
						method : 'GET',
						isArray : false,
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,status){
							return {
								data : data,
								status : status,
								headersGetter:headersGetter
							};
						}
					}
				});

		supportApi.getSupportData = $resource(

				BASE_URL + 'audit/ism/getSupportData', {}, {
					save : {
						method : 'GET',
						isArray : true
					}
				});

		supportApi.unzip = $resource('/api/unzip', {}, {
			query : {
				method : 'POST'
			}
		});

		supportApi.checkFileExits = $resource('/api/checkFile',{},{
			query : {
				method :'POST',
				isArray: false,
				responseType : 'arraybuffer',
				transformResponse : function(data, headersGetter,status){						
					return {
						data : data,
						status : status
					};
				}
			}
		});
		
		supportApi.getRmiData = $resource(BASE_URL+'rmiService/getRmiData/:tableName/:key',{
	   		
	    	   tableName:'@tableName',
	    	   key:'@key'
	   	},{
	   		query : {
				method : 'GET',
				cache  : false,
				isArray: false
	   	  }
			});

		return supportApi;
	}

})();