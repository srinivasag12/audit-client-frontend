 (function (){
    'use strict'; 
    angular
    	.module('app.audit.details')
    	.factory('detailsApi', detailsApi);
    
     function detailsApi($resource,BASE_URL,BASE_URL_LOGIN){
    	
		var detailsApi ={};
		
		 detailsApi.tcDetails = $resource(BASE_URL
				+ 'audit/ism/tcDetails', {
			flag : '@flag'
		}, {

			save : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		
		detailsApi.vesselMissingMailCall = $resource(BASE_URL+'audit/ism/vesselMissingMailCall/:auditTypeId/:companyId/:vesselImoNo/:vesselName',{auditTypeId:'@auditTypeId',companyId:'@companyId',vesselImoNo:'@vesselImoNo',vesselName:'@vesselName'});
		
		detailsApi.tcApprovalStatus = $resource(BASE_URL+'audit/ism/tcApprovalStatus/:companyId/:vesselImoNo',{companyId:'@companyId',vesselImoNo:'@vesselImoNo'}, {
			save : {
				method : 'POST',
				isArray : true
			}
		});
		
		
	    detailsApi.getAudObsData = $resource('typeAhead/getAudObsData/:companyId',{companyId:'@companyId'});

		detailsApi.getAuditSubType = $resource('typeAhead/getAuditSubType/:auditType/:companyId',{
    		audType:'@auditType',
    		companyId:'@companyId'
    	});
		
		detailsApi.getAuditStatus = $resource('typeAhead/getAuditStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
		detailsApi.getCertificateIssued = $resource('typeAhead/getCertificateIssued/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
		detailsApi.getObsCategory = $resource('typeAhead/getObsCategory/:audType/:companyId',{audType:'@audType',companyId:'companyId'});
    	
    	detailsApi.getObsStatus = $resource('typeAhead/getObsStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsApi.getAudObsType = $resource('typeAhead/getAudObsType/:companyId',{companyId:'@companyId'});
    	
    	detailsApi.getReportTypes = $resource('typeAhead/getReportTypes/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsApi.getVesselData = $resource('master/getImoNo/:companyId',{companyId:'@companyId'});
    	
    	detailsApi.getVesselTypeData = $resource('master/getVesselTypes/:companyId',{companyId:'@companyId'});
    	
    	detailsApi.getAuditType = $resource('master/getAuditTypes/:companyId',{companyId:'@companyId'});
    	
    	detailsApi.getAuditSummary = $resource('typeAhead/getAuditSummary/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	detailsApi.getCompanyDetails = $resource('master/getCompanyImoNo/:companyId', {companyId:'@companyId'});
    	
    	detailsApi.getPreviousAuditDetail = $resource(BASE_URL+'audit/ism/getPreviousAuditDetail/:auditTypeId/:vesselIMONo/:companyId',{
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
    	
    	detailsApi.getAuditDetail = $resource(BASE_URL+'audit/ism/getAuditDetail/:auditTypeId/:auditSeqNo/:companyId',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId'
    	});
    	
    	detailsApi.getSspReviewDetail = $resource(BASE_URL+'audit/ism/getSspReviewDetail/:vesselImoNo/:auditTypeId/:companyId',{
    		vesselImoNo:'@vesselImoNo',
    		auditTypeId:'@auditTypeId',    		
    		companyId:'@companyId'
    	
		});
    	
    	detailsApi.getAuditDetailAndCheckSameAudit = $resource(BASE_URL+'audit/ism/getAuditDetailAndCheckSameAudit/:auditTypeId/:auditSeqNo/:companyId/:vesselImoNo',{
    		auditTypeId:'@auditTypeId',    		
    		auditSeqNo:'@auditSeqNo',
    		companyId:'@companyId',
    		vesselImoNo:'@vesselImoNo'
    	});
    	
    	detailsApi.getAuditDetailAndNextAdtCrtStatus = $resource(BASE_URL+'audit/ism/getAuditDetailAndNextAdtCrtStatus/:auditTypeId/:companyId/:auditSeqNo/:status/:vesselImoNo',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId',
    		auditSeqNo:'@auditSeqNo',
    		status:'@status',
    		vesselImoNo:'@vesselImoNo'
    	});
    	
    	detailsApi.getSignature = $resource(BASE_URL+'audit/ism/getSignature/:emailId/:companyId',{
    		emailId:'@emailId',    		
    		companyId:'@companyId'
    	});
    	
    	detailsApi.auditorSignandSeal = $resource(BASE_URL+'rmiService/auditorSignandSeal/:signer/:companyId',{
    		signer:'@signer',    		
    		companyId:'@companyId'
    	});
    	
    	detailsApi.auditorSignAndSeal = $resource(BASE_URL+'rmiService/auditorSignAndSeal/:officialId/:companyId',{
    		officialId:'@officialId',    		
    		companyId:'@companyId'
    	});
    	
    	detailsApi.getAuditCode = $resource('typeAhead/getAuditCode/:audType/:companyId',{
    		audType		:'@audType',
    		companyId	:'@companyId'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsApi.saveAuditData = $resource(BASE_URL+'audit/ism/create/:status/:auditTypeId/:companyId',{
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
    	
    	detailsApi.updateLockHolder = $resource(BASE_URL+'audit/ism/updateLockHolder/:auditTypeId/:auditSeqNo/:lockHolder/:companyId',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',lockHolder:'@lockHolder',companyId:'@companyId'});
    	
    	detailsApi.getSSPDetails = $resource(BASE_URL+'audit/ism/getSSPDetails/:vesselImoNo/:auditTypeId/:companyId/:auditSubTypeId/:auditSeqNo',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId',auditSubTypeId:'@auditSubTypeId',auditSeqNo:'@auditSeqNo'});
    	
    	detailsApi.getISPSInitialDetails = $resource(BASE_URL+'audit/ism/getISPSInitialDetails/:vesselImoNo/:auditTypeId/:companyId',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId'});
    	
    	detailsApi.getAuditSeqNo = $resource(BASE_URL+'audit/ism/getAuditSeqNo/:auditTypeId/:companyId',{
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
    	
    	detailsApi.getSSPRevisionNo = $resource(BASE_URL+'audit/ism/getSSPRevisionNo/:vesselImoNo/:auditTypeId/:companyId/:auditSeqNo',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId',companyId:'@companyId',auditSeqNo:'@auditSeqNo'});
    	
    	detailsApi.getNewCertificateNo = $resource(BASE_URL+'audit/ism/newCertificateNo/:auditTypeId/:auditSubTypeId/:companyId',{
    		
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
    	
    	detailsApi.getAuditReportNo = $resource(BASE_URL+'audit/ism/getAuditReportNo/:auditTypeId/:companyId',{
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
    	
    	detailsApi.checkAuditStatus = $resource(BASE_URL+'audit/ism/checkAuditStatus/:auditSeqNo/:auditTypeId/:companyId',{auditSeqNo:'@auditSeqNo',auditTypeId:'@auditTypeId',companyId:'@companyId'});
    	
    	detailsApi.updateDocFlag = $resource(BASE_URL+'audit/ism/updateDocFlag/:auditTypeId/:auditSeqNo/:companyId/:docFlag',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',docFlag:'@docFlag'});
    	
    	detailsApi.getPrevDocDetails = $resource(BASE_URL+'audit/ism/getPrevDocDetails/:compImoNo/:compDocNo/:companyId',{compImoNo:'@compImoNo',compDocNo:'@compDocNo',companyId:'@companyId'});
    	
    	detailsApi.downloadReport = $resource(BASE_URL+'audit/ism/getAuditRptAttach/:fileName/:auditSeqNo/:auditTypeId/:companyId',{
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
    	
    	
    	detailsApi.getAuditCertificateData = $resource(BASE_URL+'audit/search/getAuditCertificateData/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate/:directInterorAdd',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate',directInterorAdd:'@directInterorAdd'},{ //modified by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	
    	detailsApi.getAuditCertificateInActive = $resource(BASE_URL+'certificate/getAuditCertificateInActive/:vesselImoNo/:companyId/:certificateNo/:auditTypeId/:auditDate/:directInterorAdd',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',certificateNo:'@certificateNo',auditTypeId:'@auditTypeId',auditDate:'@auditDate',directInterorAdd:'@directInterorAdd'},{ //modified by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: true
    		}
    	});
    	
    	detailsApi.getPrevFindingDetails = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:auditDate/:vesselIMONo/:currentAuditSeqNo/:companyId/:companyImoNo/:companyDoc',{
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
    	
    	detailsApi.getPrevFinding = $resource(BASE_URL+'audit/ism/getPreviousFinding/:auditTypeId/:vesselImoNo/:companyId/:companyImoNo/:companyDoc',{
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
    	
    	detailsApi.getRmiVessel = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:VesselIMONo',{
    		companyId:'@companyId',
    		userId:'userId',
    		VesselIMONo:'@VesselIMONo'
    	},{
    		query :{
    			method : 'GET',
    			cache  : false
    		}
    	});
    	
    	detailsApi.vesselDetails = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:vesselIMONo/:searchBy',{
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
    	
    	detailsApi.vesselSpecificDtl = $resource(BASE_URL+'rmiService/vesselSpecificDtl/:companyId/:userId/:vesselIMONo/:docTypeNum',{
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
    	
    	detailsApi.getCurrentUserDetail = $resource('/master/getCurrentUserDetail/:emailId/:companyId',{emailId:'@emailId',companyId:'@companyId'},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	detailsApi.vesselDtlIncomplete = $resource(BASE_URL+'audit/ism/vesselDtlIncomplete/:userId/:vesselImoNo/:vesselId/:companyId',{userId:'@userId',vesselImoNo:'@vesselImoNo',vesselId:'@vesselId',companyId:'@companyId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsApi.getMaPort = $resource('master/getMaPort/:companyId',{companyId:'@companyId'});
    	detailsApi.updateLtrStatus = $resource(BASE_URL+'audit/ism/updateLtrStatus/:auditTypeId/:auditSeqNo/:companyId/:ltrStatus',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',ltrStatus:'@ltrStatus'});
    	
    	detailsApi.allAuditorSign = $resource(BASE_URL+'audit/ism/allAuditorSign/:auditSeqNo/:companyId/',{ 
    		auditSeqNo:'@auditSeqNo', 		
    		companyId:'@companyId'
    	});
    	
    	detailsApi.notifyDetails = $resource(BASE_URL_LOGIN+'emailNotify',{},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	
    	detailsApi.saveReportData = $resource(BASE_URL+'audit/ism/saveReportData/:auditTypeId/:companyId',{
    		auditTypeId:'@auditTypeId',
    		companyId:'@companyId'
    	},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsApi.getNotifyEmailDetail = $resource(BASE_URL_LOGIN+'notifyusermail/:emailId/:companyId',{emailId:'@emailId',companyId:'@companyId'},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	

    	detailsApi.signatureGenBlobData = $resource(BASE_URL+'audit/ism/signatureGenBlobData/:orgAuditseq/:auditTypeId/:companyId/:versionId',{orgAuditseq:'@orgAuditseq',auditTypeId:'@auditTypeId',companyId:'@companyId',versionId:'@versionId'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	detailsApi.getDMLCReportNos = $resource(BASE_URL+'audit/ism/getDMLCReportNos/:vesselImoNo/:companyId/:auditTypeId',{vesselImoNo:'@vesselImoNo',companyId:'@companyId',auditTypeId:'@auditTypeId'});
    	
    	detailsApi.getFindingData = $resource(BASE_URL+'audit/ism/currentFinding/:auditTypeId/:currentAuditSeqNo/:companyId',{
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
    	
    	detailsApi.getDMLCLocationDate = $resource(BASE_URL+'audit/ism/getDMLCLocationDate/:vesselImoNo/:companyId/:auditSeqNo/:status',{
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
    	
    	detailsApi.getCompletionDate = $resource(BASE_URL+'audit/ism/getCompletionDate/:vesselImoNo/:companyId/:auditTypeId/:status/:auditSeqNo',{
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
    	
    	
    	detailsApi.getReportType = $resource('typeAhead/getReportType/:audType/:companyId/:audSubType',{audType:'@audType',companyId:'@companyId',audSubType:'@audSubType'});
    	
    	
    	detailsApi.getLatestVesselDetails = $resource(BASE_URL+'rmiService/getLatestVesselDetails/:vesselIMONo/',{
    		vesselIMONo:'@vesselIMONo'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	/*detailsApi.updateVesselDetails = $resource(BASE_URL + 'audit/ism/updateVesselDetails', {}, {
			query : {
				method : 'POST',
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data
					};
				}
			}
		});*/
    	
    	detailsApi.updateVesselDetails = $resource(BASE_URL
				+ 'audit/ism/updateVesselDetails', {}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});
    	
    	detailsApi.getVesselRefresh = $resource(BASE_URL+'audit/ism/getVesselRefresh/:vesselIMONo/',{
    		vesselIMONo:'@vesselIMONo'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
    	detailsApi.getUpdatedData = $resource(BASE_URL_LOGIN+'/getUpdatedData',{},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
    	detailsApi.updateVesselAuto = $resource(BASE_URL + 'audit/ism/updateVesselAuto',
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
    	
    	
    	return detailsApi;
     }
    
   })();