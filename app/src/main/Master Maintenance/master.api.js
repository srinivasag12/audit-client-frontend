(function() {
	'use strict';
	angular.module('app.master').factory('masterApi', masterApi);
	function masterApi($resource, BASE_URL,BASE_URL_LOGIN) {
		var masterApi = {};
		
		masterApi.checkInternet = $resource('/api/checkInternet',{},{
	         query : {
	           method : 'GET'
	         }
	    });
		
		/* Fetch typeahead data for PortId */
		masterApi.getPortId = $resource(
				'master/getPortId/:companyId', {
					companyId : '@companyId'
				});

		//Changed by sudharsan For Jira-Id IRI-5482 on 16-09-2022
		masterApi.checkrolesPresent = $resource(BASE_URL+'rmiService/checkrolesPresent/:emailId/:officialId/:companyId/:device',{
			emailId:'@emailId',officialId:'@officialId',    		
    		companyId:'@companyId',device: '@device'
    		
    	});
		//Added by sudharsan for JIRA-ID 5318 on 13-06-2022
		masterApi.allUserRmi = $resource(BASE_URL+'rmiService/allUserRmi', {
			
		}, {
			get : {
				isArray : true
			}
		});
		masterApi.saveUserDetails = $resource(BASE_URL
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
		},
		
		updatereview :{
			method : 'POST',
			isArray : false
		}
		
	});
	//End here JIRA-ID 5318

		masterApi.checkEcReasonActiveStatus = $resource(BASE_URL+'master/checkEcReasonActiveStatus/:reasonId',{
			reasonId:'@reasonId'
		});
		
		
		
		
		masterApi.redisUpdateExemptionReasons = $resource(BASE_URL+'master/redisUpdateExemptionReasons',{});

		/* creating typeaheads for email in update mode */
		masterApi.getEmail = $resource('master/getEmail/:companyId', {
			companyId : '@companyId'
		}, {
			get : {
				isArray : false
			}
		});

		masterApi.getEcGrantedReason = $resource(BASE_URL+'master/getEcGrantedReason', {
			
		}, {
			get : {
				isArray : false
			}
		});
		
		/* population of all fields in update mode based on emailId */
		masterApi.getRoleUpdate = $resource(BASE_URL
				+ 'master/getRoleUpdate/:companyId', {
			companyId : '@companyId'
		}, {
			save : {
				method : 'POST',
				isArray : true
			}
		});

		/* To populate the company domain name based on companyId" */
		masterApi.getDomainName = $resource('master/getDomainName/:companyId',
				{
					companyId : '@companyId'
				});

		/* Fetching values for auditType Dropdown from auditType db */
		masterApi.getAuditCodes = $resource('master/getAuditCodes/:companyId',
				{
					companyId : '@companyId'
				});
		
		masterApi.getDefaultHomeScreen = $resource(
				'master/getDefaultHomeScreen/:companyId', {
					companyId : '@companyId'
				});

		/* creating typeaheads for VesselImoNumber in update mode */
		masterApi.getImoNo = $resource('master/getImoNo/:companyId', {
			companyId : '@companyId'
		});

		/* Fetch typeahead data for CompanyImoNumber */
		masterApi.getCompanyImoNo = $resource(
				'master/getCompanyImoNo/:companyId', {
					companyId : '@companyId'
				});

		masterApi.getCountOfLockedAuditByCurrUser = $resource(
				BASE_URL
						+ 'audit/ism/getCountOfLockedAuditByCurrUser/:emailId/:companyId',
				{
					emailId : '@emailId',
					companyId : '@companyId'
				}, {
					query : {
						method : 'GET',
						isArray : false
					}
				});

		/* Typeahead to display vesselCompanyImoNumber */
		masterApi.getCmpnyDet = $resource('master/getCmpnyDet/:companyId', {
			companyId : '@companyId'
		});

		masterApi.getConfigDetails = $resource('master/getConfigDetails/:data/:companyId', {
			data : '@data',
			companyId : '@companyId'
		});

		masterApi.getCompanydetails = $resource(BASE_URL
				+ 'master/getCompanydetails', {}, {
			save : {
				method : 'POST',
				isArray : true
			}
		});

		masterApi.saveConfigDetails = $resource(BASE_URL
				+ 'master/saveConfigDetails', {}, {
			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		masterApi.getAllFindingCategory = $resource(
				'typeAhead/getAllFindingCategory/:companyId', {
					companyId : '@companyId'
				});

		masterApi.reviewerData = $resource(BASE_URL
				+ 'audit/search/reviewerDataCount', {}, {
			query : {
				method : 'POST',
				transformResponse : function(data, headersGetter) {
					return {
						data : data
					};
				}
			}
		});

		masterApi.reviewDataResult = $resource(BASE_URL
				+ 'audit/search/reviewerDataSearch', {}, {
			get : {
				method : 'POST',
				isArray : true
			}
		});

		masterApi.updateReviewStatus = $resource(
				BASE_URL
						+ 'audit/ism/updateReviewerStatus/:audSeqNo/:audType/:companyId/:revStatus',
				{
					audSeqNo : '@audSeqNo',
					audType : '@audType',
					companyId : '@companyId',
					revStatus : '@revStatus'
				}, {
					query : {
						method : 'GET',
						transformResponse : function(data, headersGetter) {
							return {
								data : data
							};
						}
					}
				});

		/* Start section for downloading laptop application from Central Server */
		masterApi.downloadSoft = $resource('/laptop/downloadSoft', {}, {
			save : {
				method : 'POST',
				isArray : false,
				responseType : 'arraybuffer',
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data,
						status : status
					};
				}
			}
		});

		masterApi.getCompanyImoSearch = $resource(BASE_URL
				+ 'master/getCompanyImoHistoryCount/:vesselImoNo/:companyId', {
			vesselImoNo : '@vesselImoNo',
			companyId : '@companyId'
		}, {
			query : {
				method : 'GET',
				transformResponse : function(data, headersGetter) {
					return {
						data : data
					};
				}
			}
		});

		masterApi.saveOrUpdateEcGrantedReason = $resource(BASE_URL+'master/saveOrUpdateEcGrantedReason',{
			
    	},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
		
		masterApi.getCompanyImoResult = $resource(
				BASE_URL
						+ 'master/getCompanyImoHistoryResult/:vesselImoNo/:companyId/:pageNo',
				{
					vesselImoNo : '@vesselImoNo',
					companyId : '@companyId',
					pageNo : '@pageNo'
				}, {
					query : {
						method : 'GET',
						isArray : true
					}
				});

		masterApi.getDocSearch = $resource(BASE_URL
				+ 'master/getDocHistoryCount/:companyImoNo/:companyId', {
			companyImoNo : '@companyImoNo',
			companyId : '@companyId'
		}, {
			query : {
				method : 'GET',
				transformResponse : function(data, headersGetter) {
					return {
						data : data
					};
				}
			}
		});

		masterApi.getDocResult = $resource(
				BASE_URL
						+ 'master/getDocHistoryResult/:companyImoNo/:companyId/:pageNo',
				{
					companyImoNo : '@companyImoNo',
					companyId : '@companyId',
					pageNo : '@pageNo'
				}, {
					query : {
						method : 'GET',
						isArray : true
					}
				});
		
		/***to get current user details***/
		masterApi.getCurrentUserDetail = $resource('master/getCurrentUserDetail/:emailId/:companyId',{emailId : '@emailId',companyId : '@companyId'});

		masterApi.refreshRedis = $resource(BASE_URL_LOGIN + 'redis/getRedisData',{});
		
		return masterApi;

	}

})();