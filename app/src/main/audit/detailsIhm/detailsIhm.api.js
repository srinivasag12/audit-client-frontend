 (function (){
    'use strict'; 
    angular
    	.module('app.audit.detailsIhm')
    	.factory('detailsIhmApi', detailsIhmApi);
    
     function detailsIhmApi($resource,BASE_URL,BASE_URL_LOGIN){
    	 
		var detailsIhmApi ={};
		
		 detailsIhmApi.tcDetails = $resource(BASE_URL
				+ 'audit/ism/tcDetails', {
			flag : '@flag'
		}, {

			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		
		detailsIhmApi.vesselMissingMailCall = $resource(BASE_URL+'audit/ism/vesselMissingMailCall/:auditTypeId/:companyId/:vesselImoNo/:vesselName',{auditTypeId:'@auditTypeId',companyId:'@companyId',vesselImoNo:'@vesselImoNo',vesselName:'@vesselName'});
		
		detailsIhmApi.tcApprovalStatus = $resource(BASE_URL+'audit/ism/tcApprovalStatus/:companyId/:vesselImoNo',{companyId:'@companyId',vesselImoNo:'@vesselImoNo'}, {
			save : {
				method : 'POST',
				isArray : true
			}
		});
		
		
	    detailsIhmApi.getAudObsData = $resource('typeAhead/getAudObsData/:companyId',{companyId:'@companyId'});

		detailsIhmApi.getAuditSubType = $resource('typeAhead/getAuditSubType/:auditType/:companyId',{
    		audType:'@auditType',
    		companyId:'@companyId'
    	});
		
		detailsIhmApi.getAuditStatus = $resource('typeAhead/getAuditStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
		detailsIhmApi.getCertificateIssued = $resource('typeAhead/getCertificateIssued/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
		detailsIhmApi.getObsCategory = $resource('typeAhead/getObsCategory/:audType/:companyId',{audType:'@audType',companyId:'companyId'});
    	
    	detailsIhmApi.getObsStatus = $resource('typeAhead/getObsStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsIhmApi.getAudObsType = $resource('typeAhead/getAudObsType/:companyId',{companyId:'@companyId'});
    	
    	detailsIhmApi.getReportTypes = $resource('typeAhead/getReportTypes/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsIhmApi.getVesselData = $resource('master/getImoNo/:companyId',{companyId:'@companyId'});
    	
    	detailsIhmApi.getVesselTypeData = $resource('master/getVesselTypes/:companyId',{companyId:'@companyId'});
    	
    	detailsIhmApi.getAuditType = $resource('master/getAuditTypes/:companyId',{companyId:'@companyId'});
    	
    	detailsIhmApi.getAuditSummary = $resource('typeAhead/getAuditSummary/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsIhmApi.getCompanyDetails = $resource('master/getCompanyImoNo/:companyId', {companyId:'@companyId'});
    	
    	detailsIhmApi.getPreviousAuditDetail = $resource(BASE_URL+'audit/ism/getPreviousAuditDetail/:auditTypeId/:vesselIMONo/:companyId',{
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
    	
    	detailsIhmApi.getAuditDetail = $resource(BASE_URL+'audit/ism/getAuditDetail/:auditTypeId/:auditSeqNo/:companyId',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId'
    	});
    	
    	detailsIhmApi.getAuditDetailForIhm = $resource(BASE_URL+'audit/ism/getAuditDetailForIhm/:auditTypeId/:auditSeqNo/:companyId',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId'
    	});
    	
    	detailsIhmApi.getSspReviewDetail = $resource(BASE_URL+'audit/ism/getSspReviewDetail/:vesselImoNo/:auditTypeId/:companyId',{
    		vesselImoNo:'@vesselImoNo',
    		auditTypeId:'@auditTypeId',    		
    		companyId:'@companyId'
    	
		});
    	
    	detailsIhmApi.getAuditDetailAndCheckSameAudit = $resource(BASE_URL+'audit/ism/getAuditDetailAndCheckSameAudit/:auditTypeId/:auditSeqNo/:companyId/:vesselImoNo',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId',
    		vesselImoNo:'@vesselImoNo'
    	});
    	
    	detailsIhmApi.getAuditDetailAndNextAdtCrtStatus = $resource(BASE_URL+'audit/ism/getAuditDetailAndNextAdtCrtStatus/:auditTypeId/:companyId/:auditSeqNo/:status/:vesselImoNo',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId',
    		auditSeqNo:'@auditSeqNo',
    		status:'@status',
    		vesselImoNo:'@vesselImoNo'
    	});
    	
    	detailsIhmApi.getSignature = $resource(BASE_URL+'audit/ism/getSignature/:emailId/:companyId',{
    		emailId:'@emailId',    		
    		companyId:'@companyId'
    	});
    	
    	detailsIhmApi.auditorSignandSeal = $resource(BASE_URL+'rmiService/auditorSignandSeal/:signer/:companyId',{
    		signer:'@signer',    		
    		companyId:'@companyId'
    	});
    	
    	detailsIhmApi.auditorSignAndSeal = $resource(BASE_URL+'rmiService/auditorSignAndSeal/:officialId/:companyId',{
    		officialId:'@officialId',    		
    		companyId:'@companyId'
    	});
    	
    	detailsIhmApi.getAuditCode = $resource('typeAhead/getAuditCode/:audType/:companyId',{
    		audType		:'@audType',
    		companyId	:'@companyId'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsIhmApi.saveAuditData = $resource(BASE_URL+'audit/ism/create/:status/:auditTypeId/:companyId',{
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
    	
    	detailsIhmApi.updateLockHolder = $resource(BASE_URL+'audit/ism/updateLockHolder/:auditTypeId/:auditSeqNo/:lockHolder/:companyId',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',lockHolder:'@lockHolder',companyId:'@companyId'});
    	
    	detailsIhmApi.getSSPDetails = $resource(BASE_URL+'audit/ism/getSSPDetails/:vesselImoNo/:auditTypeId/:companyId/:auditSubTypeId/:auditSeqNo',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId',auditSubTypeId:'@auditSubTypeId',auditSeqNo:'@auditSeqNo'});
    	
    	detailsIhmApi.getISPSInitialDetails = $resource(BASE_URL+'audit/ism/getISPSInitialDetails/:vesselImoNo/:auditTypeId/:companyId',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId'});
    	
    	detailsIhmApi.getAuditSeqNo = $resource(BASE_URL+'audit/ism/getAuditSeqNo/:auditTypeId/:companyId',{
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
    	
    	detailsIhmApi.getSSPRevisionNo = $resource(BASE_URL+'audit/ism/getSSPRevisionNo/:vesselImoNo/:auditTypeId/:companyId/:auditSeqNo',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId',auditSeqNo:'@auditSeqNo'});
    	
    	detailsIhmApi.getNewCertificateNo = $resource(BASE_URL+'audit/ism/newCertificateNo/:auditTypeId/:auditSubTypeId/:companyId',{
    		
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
    	
    	detailsIhmApi.copyStampFile = $resource(BASE_URL
				+ 'audit/ism/copyStampFile/:filename', {
			filename : '@filename'
		}, {
			query : {
				method : 'GET',
				isArray : false
			}
		});
		
		
    	
    	detailsIhmApi.getAuditReportNo = $resource(BASE_URL+'audit/ism/getAuditReportNo/:auditTypeId/:companyId',{
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
    	
    	detailsIhmApi.checkAuditStatus = $resource(BASE_URL+'audit/ism/checkAuditStatus/:auditSeqNo/:auditTypeId/:companyId',{auditSeqNo:'@auditSeqNo',auditTypeId:'@auditTypeId',companyId:'@companyId'});
    	
    	detailsIhmApi.updateDocFlag = $resource(BASE_URL+'audit/ism/updateDocFlag/:auditTypeId/:auditSeqNo/:companyId/:docFlag',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',docFlag:'@docFlag'});
    	
    	detailsIhmApi.getPrevDocDetails = $resource(BASE_URL+'audit/ism/getPrevDocDetails/:compImoNo/:compDocNo/:companyId',{compImoNo:'@compImoNo',compDocNo:'@compDocNo',companyId:'@companyId'});
    	
    	detailsIhmApi.downloadReport = $resource(BASE_URL+'audit/ism/getAuditRptAttach/:fileName/:auditSeqNo/:auditTypeId/:companyId',{
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
    	
    	detailsIhmApi.deleteStamp = $resource(BASE_URL+'audit/ism/deleteStamp/:status/:FILE_NAME/:USER_ID',{
    		status:'@status',
    		FILE_NAME : '@FILE_NAME',
    		USER_ID : '@USER_ID'
    	},{
    		query : {
    			method : 'DELETE'
    		}
    	});
    	
    	detailsIhmApi.getAuditCertificateData = $resource(BASE_URL+'audit/search/getAuditCertificateData/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	detailsIhmApi.getAuditCertificateDataForIhm = $resource(BASE_URL+'audit/search/getAuditCertificateDataForIhm/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	detailsIhmApi.getStampData = $resource(BASE_URL+'audit/ism/getStamp/:REVIEW_REPORT_NO/:AUDIT_SEQ_NO',{REVIEW_REPORT_NO:'@REVIEW_REPORT_NO',AUDIT_SEQ_NO:'@AUDIT_SEQ_NO'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	
    	detailsIhmApi.getStampFile = $resource(BASE_URL+'audit/ism/getFileStamp/:FILE_NAME/:auditSeqNo',{FILE_NAME:'@FILE_NAME',auditSeqNo:'@auditSeqNo'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: false
    		}
    	});
    	
    	
    	detailsIhmApi.getAuditCertificateInActive = $resource(BASE_URL+'certificate/getAuditCertificateInActive/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	detailsIhmApi.getAuditCertificateInActiveForIhm = $resource(BASE_URL+'certificateIhm/getAuditCertificateInActiveForIhm/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	detailsIhmApi.getPrevFindingDetails = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:auditDate/:vesselIMONo/:currentAuditSeqNo/:companyId/:companyImoNo/:companyDoc',{
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
    	
    	detailsIhmApi.getPrevFinding = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:vesselImoNo/:companyId/:companyImoNo/:companyDoc',{
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
    	
    	detailsIhmApi.getRmiVessel = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:VesselIMONo',{
    		companyId:'@companyId',
    		userId:'userId',
    		VesselIMONo:'@VesselIMONo'
    	},{
    		query :{
    			method : 'GET',
    			cache  : false
    		}
    	});
    	
    	detailsIhmApi.vesselDetails = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:vesselIMONo/:searchBy',{
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
    	
    	detailsIhmApi.vesselSpecificDtl = $resource(BASE_URL+'rmiService/vesselSpecificDtl/:companyId/:userId/:vesselIMONo/:docTypeNum',{
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
    	
    	detailsIhmApi.getCurrentUserDetail = $resource('/master/getCurrentUserDetail/:emailId/:companyId',{emailId:'@emailId',companyId:'@companyId'},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsIhmApi.vesselDtlIncomplete = $resource(BASE_URL+'audit/ism/vesselDtlIncomplete/:userId/:vesselImoNo/:vesselId/:companyId',{userId:'@userId',vesselImoNo:'@vesselImoNo',vesselId:'@vesselId',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsIhmApi.getMaPort = $resource('master/getMaPort/:companyId',{companyId:'@companyId'});
    	detailsIhmApi.updateLtrStatus = $resource(BASE_URL+'audit/ism/updateLtrStatus/:auditTypeId/:auditSeqNo/:companyId/:ltrStatus',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',ltrStatus:'@ltrStatus'});
    	
    	detailsIhmApi.allAuditorSign = $resource(BASE_URL+'audit/ism/allAuditorSign/:auditSeqNo/:companyId/',{ 
    		auditSeqNo:'@auditSeqNo', 		
    		companyId:'@companyId'
    	});
    	
    	detailsIhmApi.notifyDetails = $resource(BASE_URL_LOGIN+'emailNotify',{},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	
    	detailsIhmApi.saveReportData = $resource(BASE_URL+'audit/ism/saveReportData/:auditTypeId/:companyId',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsIhmApi.getNotifyEmailDetail = $resource(BASE_URL_LOGIN+'notifyusermail/:emailId/:companyId',{emailId:'@emailId',companyId:'@companyId'},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	

    	detailsIhmApi.signatureGenBlobData = $resource(BASE_URL+'audit/ism/signatureGenBlobData/:orgAuditseq/:auditTypeId/:companyId/:versionId',{orgAuditseq:'@orgAuditseq',auditTypeId:'@auditTypeId',companyId:'@companyId',versionId:'@versionId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsIhmApi.removeIhmFinalReport  = $resource(BASE_URL+'audit/ism/removeIhmFinalReport/:orgAuditseq/:auditTypeId/:companyId/:versionId',{orgAuditseq:'@orgAuditseq',auditTypeId:'@auditTypeId',companyId:'@companyId',versionId:'@versionId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsIhmApi.getDMLCReportNos = $resource(BASE_URL+'audit/ism/getDMLCReportNos/:vesselImoNo/:companyId/:auditTypeId',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',auditTypeId:'@auditTypeId'});
    	
    	detailsIhmApi.getFindingData = $resource(BASE_URL+'audit/ism/currentFinding/:auditTypeId/:currentAuditSeqNo/:companyId',{
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
    	
    	
    	detailsIhmApi.vesselDtlIncompleteYatch = $resource(BASE_URL+'audit/ism/vesselDtlIncompleteYatch/:userId/:vesselName/:vesselId/:companyId',{userId:'@userId',vesselName:'@vesselName',vesselId:'@vesselId',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsIhmApi.getDMLCLocationDate = $resource(BASE_URL+'audit/ism/getDMLCLocationDate/:vesselImoNo/:companyId/:auditSeqNo/:status',{
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
    	
    	detailsIhmApi.getCompletionDate = $resource(BASE_URL+'audit/ism/getCompletionDate/:vesselImoNo/:companyId/:auditTypeId/:status/:auditSeqNo',{
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
    	
    	
    	detailsIhmApi.getAllRmiIhmCustomers = $resource(BASE_URL+'rmiService/getAllRmiIhmCustomers',{
    		
    	},{
    		query :{
    			method : 'GET',
    			cache  : false,isArray : true
    		}
    	});
    	
    	detailsIhmApi.updateVesselDetails = $resource(BASE_URL
				+ 'audit/ism/updateVesselDetails', {}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});
    	
    	detailsIhmApi.getVesselRefresh = $resource(BASE_URL+'audit/ism/getVesselRefresh/:vesselIMONo/',{
    		vesselIMONo:'@vesselIMONo'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
    	detailsIhmApi.updateVesselAuto = $resource(BASE_URL + 'audit/ism/updateVesselAuto',
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
    	
    	
    	return detailsIhmApi;
     }
    
   })();