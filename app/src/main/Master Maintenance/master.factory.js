(function() {
	'use strict';

	angular.module('app.master').factory('masterFactory', masterFactory);

	function masterFactory(masterApi) {

		var masterFactory = {

			getAuditCodes : getAuditCodes,
			getEmail : getEmail,
			getRoleUpdate : getRoleUpdate,
			getImoNo : getImoNo,
			getCompanyImoNo : getCompanyImoNo,
			getCmpnyDet : getCmpnyDet,
			saveConfigDetails : saveConfigDetails,
			removeImage:removeImage,
			getConfigDetails : getConfigDetails,
			getAllFindingCategory : getAllFindingCategory,
			getDefaultHomeScreen : getDefaultHomeScreen,
			reviewerData : reviewerData,
			reviewDataResult : reviewDataResult,
			updateReviewStatus : updateReviewStatus,
			getDomainName : getDomainName,
			getCompanydetails : getCompanydetails,
			downloadSoft : downloadSoft,/*
			 * Start section for downloading laptop
			 * application from Central Server
			 */
			getCountOfLockedAuditByCurrUser : getCountOfLockedAuditByCurrUser,
			getCompanyImoSearch : getCompanyImoSearch,
			getCompanyImoResult : getCompanyImoResult,
			getDocSearch : getDocSearch,
			getDocResult : getDocResult,
			getCurrentUserDetail:getCurrentUserDetail,
			checkrolesPresent:checkrolesPresent,
			getPortId : getPortId,
			getEcGrantedReason:getEcGrantedReason,
			saveOrUpdateEcGrantedReason:saveOrUpdateEcGrantedReason,
			checkEcReasonActiveStatus : checkEcReasonActiveStatus,
			refreshRedis:refreshRedis,
			redisUpdateExemptionReasons:redisUpdateExemptionReasons,
			checkInternet:checkInternet,
			allUserRmi:allUserRmi,//Added by sudharsan for JIRA-ID 5318 on 13-06-2022
			saveUserDetails:saveUserDetails//Added by sudharsan for JIRA-ID 5318 on 13-06-2022
		};

		return masterFactory;
		
		
		function checkInternet(){
            return masterApi.checkInternet.query({},function(res){return res});
        }
		
		//changed by sudharsan For Jira-Id IRI-5482 on 16-09-2022
		function checkrolesPresent(emailId,officialId,companyId,device){
 		   return masterApi.checkrolesPresent.get({emailId:emailId,officialId:officialId,companyId:companyId,device:device,method:'GET',catche:false},
 				   	function(res){
 			   			return res;
 		   			});
 	 }
	  //Added by sudharsan for JIRA-ID 5318 on 13-06-2022
	  function allUserRmi(companyId) {
		return masterApi.allUserRmi.query({
			
			method : 'GET'
		}, function(res) {
			return res;
		})
	};

	 function saveUserDetails(flag, data) {
		return masterApi.saveUserDetails.save({
			flag : flag
		}, data, function(res) {
			return res;
		});
	}	;
	//Endhere JIra-id 5318
		/* creating typeaheads for email in update mode */
		function getEcGrantedReason(companyId) {
			return masterApi.getEcGrantedReason.query({
				
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;

		function getEmail(companyId) {
			return masterApi.getEmail.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;
		
		function refreshRedis() {
			return masterApi.refreshRedis.query({
				
				method : 'GET'
			}, function(res) {

				return res;
			});
		}
		;
		
		/* population of all fields in update mode based on emailId */
		function getRoleUpdate(flag, companyId) {
			return masterApi.getRoleUpdate.save({
				companyId : companyId
			}, flag, function(res) {
				return res;
			});
		}
		;

		function redisUpdateExemptionReasons(){
			   return masterApi.redisUpdateExemptionReasons.get({method:'GET',catche:false},
					function(res){
				   		return res;
			   		});
		 }
		;
		
		/* To populate the company domain name based on companyId" */
		function getDomainName(companyId) {
			return masterApi.getDomainName.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;

		function getCountOfLockedAuditByCurrUser(emailId, companyId) {
			return masterApi.getCountOfLockedAuditByCurrUser.query({
				emailId : emailId,
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			});
		}

		function getDefaultHomeScreen(companyId) {
			return masterApi.getDefaultHomeScreen.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;

		/* To populate Typeahead data in AuditCode screen for AuditCodes */
		function getAuditCodes(companyId) {
			return masterApi.getAuditCodes.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;
		
		/* Fetch typeahead data for CompanyImoNumber */
		function getCompanyImoNo(companyId) {
			return masterApi.getCompanyImoNo.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;

		/* Fetching values from vesselcompany db for VesselImoNumber */
		function getImoNo(companyId) {
			return masterApi.getImoNo.query({
				companyId : companyId,
				method : 'GET',
				cache : true
			}, function(res) {
				return res;
			})
		}
		;

		/* Typeahead to display vesselCompanyImoNumber */
		function getCmpnyDet(companyId) {
			return masterApi.getCmpnyDet.query({
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			});
		}
		;

		function getCompanydetails(flag) {
			return masterApi.getCompanydetails.save({}, flag, function(res) {
				return res;
			});
		}
		;

		function saveConfigDetails(data) {
			return masterApi.saveConfigDetails.save({}, data, function(res) {
				return res;
			});
		}
		;
		
		
		
		function saveOrUpdateEcGrantedReason(data){ 
	   		   return masterApi.saveOrUpdateEcGrantedReason.put({method:'POST',catche:false},data,
	   				function(res){
	   			   
	   			   console.log(res);
	   			   		return res;
	   		   		});
	   	 };
	
	   	function checkEcReasonActiveStatus(reasonId){
	 		   return masterApi.checkEcReasonActiveStatus.get({reasonId:reasonId,method:'GET',catche:false},
	 				   	function(res){
	 			   			return res;
	 		   			});
	 	 }
	   	
		function removeImage(data) {
			return masterApi.saveConfigDetails.save({}, data, function(res) {
				return res;
			});
		}
		;

		function getConfigDetails(data, companyId) {
			return masterApi.getConfigDetails.query({
				data : data,
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			});
		}
		;

		function getAllFindingCategory(companyId) {
			return masterApi.getAllFindingCategory.query({
				companyId : companyId,
				method : 'GET',
				catche : true
			}, function(res) {
				return res;
			});
		}
		;

		function reviewerData(data) {
			return masterApi.reviewerData.query({}, data, function(res) {
				return res
			});
		}

		function reviewDataResult(data) {
			return masterApi.reviewDataResult.get({}, data, function(res) {
				return res
			});
		}

		function updateReviewStatus(audSeqNo, audType, companyId, revStatus) {
			return masterApi.updateReviewStatus.query({
				audSeqNo : audSeqNo,
				audType : audType,
				companyId : companyId,
				revStatus : revStatus
			}, function(res) {
				return res
			});
		}

		/* Start section for downloading laptop application from Central Server */
		function downloadSoft(data) {
			return masterApi.downloadSoft.save(data, function(res) {
				return res;
			});
		}

		function getCompanyImoSearch(imoNo, companyId) {
			return masterApi.getCompanyImoSearch.query({
				vesselImoNo : imoNo,
				companyId : companyId
			}, function(res) {
				return res;
			});
		}

		function getCompanyImoResult(imoNo, companyId, pageNo) {
			return masterApi.getCompanyImoResult.query({
				vesselImoNo : imoNo,
				companyId : companyId,
				pageNo : pageNo
			}, function(res) {
				return res;
			});
		}

		function getDocSearch(cImoNo, companyId) {
			return masterApi.getDocSearch.query({
				companyImoNo : cImoNo,
				companyId : companyId
			}, function(res) {
				return res;
			});
		}

		function getDocResult(cImoNo, companyId, pageNo) {
			return masterApi.getDocResult.query({
				companyImoNo : cImoNo,
				companyId : companyId,
				pageNo : pageNo
			}, function(res) {
				return res;
			});
		}
		
		/****to get current user detail****/
		function getCurrentUserDetail(emailId,companyId) {
			return masterApi.getCurrentUserDetail.query({
				emailId:emailId,
				companyId : companyId,
				method : 'GET'
			}, function(res) {
				return res;
			})
		}
		;
		
		/* Fetching values from MaPort db for PortId */
		function getPortId(companyId) {
			return masterApi.getPortId.query({
				companyId : companyId,
				method : 'GET',
				cache : true
			}, function(res) {
				return res;
			})
		}
		;

	}

})();