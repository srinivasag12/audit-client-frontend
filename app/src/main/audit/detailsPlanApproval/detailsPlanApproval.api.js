 (function (){
    'use strict'; 
    angular
    	.module('app.audit.detailsPlanApproval')
    	.factory('detailsPlanApprovalApi', detailsPlanApprovalApi);
    
     function detailsPlanApprovalApi($resource,BASE_URL,BASE_URL_LOGIN){
    	
		var detailsPlanApprovalApi ={};
		
		detailsPlanApprovalApi.tcDetails = $resource(BASE_URL
				+ 'audit/ism/tcDetails', {
			flag : '@flag'
		}, {

			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		
		detailsPlanApprovalApi.vesselMissingMailCall = $resource(BASE_URL+'audit/ism/vesselMissingMailCall/:auditTypeId/:companyId/:vesselImoNo/:vesselName',{auditTypeId:'@auditTypeId',companyId:'@companyId',vesselImoNo:'@vesselImoNo',vesselName:'@vesselName'});
		
		detailsPlanApprovalApi.tcApprovalStatus = $resource(BASE_URL+'audit/ism/tcApprovalStatus/:companyId/:vesselImoNo',{companyId:'@companyId',vesselImoNo:'@vesselImoNo'}, {
			save : {
				method : 'POST',
				isArray : true
			}
		});
		
		
	    detailsPlanApprovalApi.getAudObsData = $resource('typeAhead/getAudObsData/:companyId',{companyId:'@companyId'});

		detailsPlanApprovalApi.getAuditSubType = $resource('typeAhead/getAuditSubType/:auditType/:companyId',{
    		audType:'@auditType',
    		companyId:'@companyId'
    	});
		
		detailsPlanApprovalApi.getAuditStatus = $resource('typeAhead/getAuditStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
		detailsPlanApprovalApi.getCertificateIssued = $resource('typeAhead/getCertificateIssued/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
		detailsPlanApprovalApi.getObsCategory = $resource('typeAhead/getObsCategory/:audType/:companyId',{audType:'@audType',companyId:'companyId'});
    	
    	detailsPlanApprovalApi.getObsStatus = $resource('typeAhead/getObsStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getAudObsType = $resource('typeAhead/getAudObsType/:companyId',{companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getReportTypes = $resource('typeAhead/getReportTypes/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getVesselData = $resource('master/getImoNo/:companyId',{companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getVesselTypeData = $resource('master/getVesselTypes/:companyId',{companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getAuditType = $resource('master/getAuditTypes/:companyId',{companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getAuditSummary = $resource('typeAhead/getAuditSummary/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getCompanyDetails = $resource('master/getCompanyImoNo/:companyId', {companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getPreviousAuditDetail = $resource(BASE_URL+'audit/ism/getPreviousAuditDetail/:auditTypeId/:vesselIMONo/:companyId',{
    		vesselIMONo:'@vesselIMONo',
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		query : {
			method : 'GET',
			cache  : false,
			isArray: false
    	  }
		});
    	
    	detailsPlanApprovalApi.getAuditDetail = $resource(BASE_URL+'audit/ism/getAuditDetail/:auditTypeId/:auditSeqNo/:companyId',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId'
    	});
    	
    	detailsPlanApprovalApi.getSspReviewDetail = $resource(BASE_URL+'audit/ism/getSspReviewDetail/:vesselImoNo/:auditTypeId/:companyId',{
    		vesselImoNo:'@vesselImoNo',
    		auditTypeId:'@auditTypeId',    		
    		companyId:'@companyId'
    	
		});
    	
    	detailsPlanApprovalApi.getAuditDetailAndCheckSameAudit = $resource(BASE_URL+'audit/ism/getAuditDetailAndCheckSameAudit/:auditTypeId/:auditSeqNo/:companyId/:vesselImoNo',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId',
    		vesselImoNo:'@vesselImoNo'
    	});
    	
    	detailsPlanApprovalApi.getAuditDetailAndNextAdtCrtStatus = $resource(BASE_URL+'audit/ism/getAuditDetailAndNextAdtCrtStatus/:auditTypeId/:companyId/:auditSeqNo/:status/:vesselImoNo',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId',
    		auditSeqNo:'@auditSeqNo',
    		status:'@status',
    		vesselImoNo:'@vesselImoNo'
    	});
    	
    	detailsPlanApprovalApi.getSignature = $resource(BASE_URL+'audit/ism/getSignature/:emailId/:companyId',{
    		emailId:'@emailId',    		
    		companyId:'@companyId'
    	});
    	
    	detailsPlanApprovalApi.auditorSignandSeal = $resource(BASE_URL+'rmiService/auditorSignandSeal/:signer/:companyId',{
    		signer:'@signer',    		
    		companyId:'@companyId'
    	});
    	
    	detailsPlanApprovalApi.auditorSignAndSeal = $resource(BASE_URL+'rmiService/auditorSignAndSeal/:officialId/:companyId',{
    		officialId:'@officialId',    		
    		companyId:'@companyId'
    	});
    	
    	detailsPlanApprovalApi.getAuditCode = $resource('typeAhead/getAuditCode/:audType/:companyId',{
    		audType		:'@audType',
    		companyId	:'@companyId'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsPlanApprovalApi.saveAuditData = $resource(BASE_URL+'audit/ism/create/:status/:auditTypeId/:companyId',{
    		status:'@status',
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsPlanApprovalApi.updateLockHolder = $resource(BASE_URL+'audit/ism/updateLockHolder/:auditTypeId/:auditSeqNo/:lockHolder/:companyId',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',lockHolder:'@lockHolder',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getSSPDetails = $resource(BASE_URL+'audit/ism/getSSPDetails/:vesselImoNo/:auditTypeId/:companyId/:auditSubTypeId/:auditSeqNo',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId',auditSubTypeId:'@auditSubTypeId',auditSeqNo:'@auditSeqNo'});
    	
    	detailsPlanApprovalApi.getISPSInitialDetails = $resource(BASE_URL+'audit/ism/getISPSInitialDetails/:vesselImoNo/:auditTypeId/:companyId',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.getAuditSeqNo = $resource(BASE_URL+'audit/ism/getAuditSeqNo/:auditTypeId/:companyId',{
    		auditTypeId : '@auditTypeId',
    		companyId : '@companyId'
    	},{
    		query : {
				method : 'GET',
				isArray : false,
				transformResponse : function(data) {						
					return {
						data : data
					};
				}
			}
    	});
    	
    	detailsPlanApprovalApi.getSSPRevisionNo = $resource(BASE_URL+'audit/ism/getSSPRevisionNo/:vesselImoNo/:auditTypeId/:companyId/:auditSeqNo',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId',auditSeqNo:'@auditSeqNo'});
    	
    	detailsPlanApprovalApi.getNewCertificateNo = $resource(BASE_URL+'audit/ism/newCertificateNo/:auditTypeId/:auditSubTypeId/:companyId',{
    		
    		auditTypeId:'@auditTypeId',
    		auditSubTypeId:'@auditSubTypeId',
    		companyId:'@companyId'
    		
    	},{
    		query : {
				method : 'GET',
				isArray : false,
				transformResponse : function(data) {						
					return {
						data : data
					};
				}
			}
    	});
    	
    	detailsPlanApprovalApi.getAuditReportNo = $resource(BASE_URL+'audit/ism/getAuditReportNo/:auditTypeId/:companyId',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		query : {
				method : 'GET',
				isArray : false,
				transformResponse : function(data) {						
					return {
						data : data
					};
				}
			}
    	});
    	
    	detailsPlanApprovalApi.checkAuditStatus = $resource(BASE_URL+'audit/ism/checkAuditStatus/:auditSeqNo/:auditTypeId/:companyId',{auditSeqNo:'@auditSeqNo',auditTypeId:'@auditTypeId',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.updateDocFlag = $resource(BASE_URL+'audit/ism/updateDocFlag/:auditTypeId/:auditSeqNo/:companyId/:docFlag',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',docFlag:'@docFlag'});
    	
    	detailsPlanApprovalApi.getPrevDocDetails = $resource(BASE_URL+'audit/ism/getPrevDocDetails/:compImoNo/:compDocNo/:companyId',{compImoNo:'@compImoNo',compDocNo:'@compDocNo',companyId:'@companyId'});
    	
    	detailsPlanApprovalApi.downloadReport = $resource(BASE_URL+'audit/ism/getAuditRptAttach/:fileName/:auditSeqNo/:auditTypeId/:companyId',{
    		fileName:'@fileName',
    		auditSeqNo:'@auditSeqNo',
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		put : {
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
    	
    	
    	detailsPlanApprovalApi.getAuditCertificateData = $resource(BASE_URL+'audit/search/getAuditCertificateData/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	
    	detailsPlanApprovalApi.getAuditCertificateInActive = $resource(BASE_URL+'certificate/getAuditCertificateInActive/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	detailsPlanApprovalApi.getPrevFindingDetails = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:auditDate/:vesselIMONo/:currentAuditSeqNo/:companyId/:companyImoNo/:companyDoc',{
    		auditTypeId:'@auditTypeId',
    		auditDate:'@auditDate',
    		vesselIMONo:'@vesselIMONo',
    		currentAuditSeqNo:'@currentAuditSeqNo',
    		companyId:'@companyId',
    		companyImoNo:'@companyImoNo',
    		companyDoc:'@companyDoc'
    	},{
    		put : {
    			method : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsPlanApprovalApi.getPrevFinding = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:vesselImoNo/:companyId/:companyImoNo/:companyDoc',{
    		auditTypeId:'@auditTypeId',
    		vesselImoNo:'@vesselImoNo',
    		companyId:'@companyId',
    		companyImoNo:'@companyImoNo',
    		companyDoc:'@companyDoc'
    	},{
    		put : {
    			method : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsPlanApprovalApi.getRmiVessel = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:VesselIMONo',{
    		companyId:'@companyId',
    		userId:'userId',
    		VesselIMONo:'@VesselIMONo'
    	},{
    		query :{
    			method : 'GET',
    			cache  : false
    		}
    	});
    	
    	detailsPlanApprovalApi.vesselDetails = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:vesselIMONo/:searchBy',{
    		companyId:'@companyId',
    		userId:'@userId',
    		vesselIMONo:'@vesselIMONo',
    		searchBy:'@searchBy'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsPlanApprovalApi.vesselSpecificDtl = $resource(BASE_URL+'rmiService/vesselSpecificDtl/:companyId/:userId/:vesselIMONo/:docTypeNum',{
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
    	
    	detailsPlanApprovalApi.getCurrentUserDetail = $resource('/master/getCurrentUserDetail/:emailId/:companyId',{emailId:'@emailId',companyId:'@companyId'},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsPlanApprovalApi.vesselDtlIncomplete = $resource(BASE_URL+'audit/ism/vesselDtlIncomplete/:userId/:vesselImoNo/:vesselId/:companyId',{userId:'@userId',vesselImoNo:'@vesselImoNo',vesselId:'@vesselId',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsPlanApprovalApi.getMaPort = $resource('master/getMaPort/:companyId',{companyId:'@companyId'});
    	detailsPlanApprovalApi.updateLtrStatus = $resource(BASE_URL+'audit/ism/updateLtrStatus/:auditTypeId/:auditSeqNo/:companyId/:ltrStatus',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',ltrStatus:'@ltrStatus'});
    	
    	detailsPlanApprovalApi.allAuditorSign = $resource(BASE_URL+'audit/ism/allAuditorSign/:auditSeqNo/:companyId/',{ 
    		auditSeqNo:'@auditSeqNo', 		
    		companyId:'@companyId'
    	});
    	
    	detailsPlanApprovalApi.notifyDetails = $resource(BASE_URL_LOGIN+'emailNotify',{},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	
    	detailsPlanApprovalApi.saveReportData = $resource(BASE_URL+'audit/ism/saveReportData/:auditTypeId/:companyId',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsPlanApprovalApi.getNotifyEmailDetail = $resource(BASE_URL_LOGIN+'notifyusermail/:emailId/:companyId',{emailId:'@emailId',companyId:'@companyId'},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	

    	detailsPlanApprovalApi.signatureGenBlobData = $resource(BASE_URL+'audit/ism/signatureGenBlobData/:orgAuditseq/:auditTypeId/:companyId/:versionId',{orgAuditseq:'@orgAuditseq',auditTypeId:'@auditTypeId',companyId:'@companyId',versionId:'@versionId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsPlanApprovalApi.getDMLCReportNos = $resource(BASE_URL+'audit/ism/getDMLCReportNos/:vesselImoNo/:companyId/:auditTypeId',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',auditTypeId:'@auditTypeId'});
    	
    	detailsPlanApprovalApi.getFindingData = $resource(BASE_URL+'audit/ism/currentFinding/:auditTypeId/:currentAuditSeqNo/:companyId',{
			auditTypeId 		: '@auditTypeId',
			currentAuditSeqNo	: '@currentAuditSeqNo',
			companyId 			: '@companyId'
		},{
			get : {
				cache	: false,
				method 	: 'GET',
				isArray : true
			}
		});
    	
    	detailsPlanApprovalApi.getDMLCLocationDate = $resource(BASE_URL+'audit/ism/getDMLCLocationDate/:vesselImoNo/:companyId/:auditSeqNo/:status',{
    		vesselImoNo 		: '@vesselImoNo',
    		companyId			: '@companyId',
    		auditSeqNo			: '@auditSeqNo',
    		status				: '@status'
		},{
			get : {
				cache	: false,
				method 	: 'GET',
				isArray : false
			}
		});
    	
    	detailsPlanApprovalApi.getCompletionDate = $resource(BASE_URL+'audit/ism/getCompletionDate/:vesselImoNo/:companyId/:auditTypeId/:status/:auditSeqNo',{
    		vesselImoNo 		: '@vesselImoNo',
    		companyId			: '@companyId',
    		auditTypeId			: '@auditTypeId',
    		status				: '@status',
    		auditSeqNo			: '@auditSeqNo'
		},{
			get : {
				cache	: false,
				method 	: 'GET',
				isArray : false
			}
		});
    	
    	
    	detailsPlanApprovalApi.getReportType = $resource('typeAhead/getReportType/:audType/:companyId/:audSubType',{audType:'@audType',companyId:'@companyId',audSubType:'@audSubType'});
    	
    	
    	detailsPlanApprovalApi.getLatestVesselDetails = $resource(BASE_URL+'rmiService/getLatestVesselDetails/:vesselIMONo/',{
    		vesselIMONo:'@vesselIMONo'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	/*detailsPlanApprovalApi.updateVesselDetails = $resource(BASE_URL + 'audit/ism/updateVesselDetails', {}, {
			query : {
				method : 'POST',
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data
					};
				}
			}
		});*/
    	
    	detailsPlanApprovalApi.updateVesselDetails = $resource(BASE_URL
				+ 'audit/ism/updateVesselDetails', {}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});
    	
    	detailsPlanApprovalApi.getVesselRefresh = $resource(BASE_URL+'audit/ism/getVesselRefresh/:vesselIMONo/',{
    		vesselIMONo:'@vesselIMONo'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
    	detailsPlanApprovalApi.getUpdatedData = $resource(BASE_URL_LOGIN+'/getUpdatedData',{},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
    	detailsPlanApprovalApi.updateVesselAuto = $resource(BASE_URL + 'audit/ism/updateVesselAuto',
				{}, {
					query : {
						method : 'POST',
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,
								status) {
							return {
								data : data
							};
						}
					}
				});
    	
    	
    	return detailsPlanApprovalApi;
     }
    
   })();