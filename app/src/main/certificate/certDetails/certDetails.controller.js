(function (){
    'use strict';
    
    angular
        .module('app.certificate.details')        
        .controller('certificateHistoryController', certificateHistoryController)
        .controller('CertificateDetailsController', CertificateDetailsController); 
    
    function CertificateDetailsController(userFactory,ModalService,blockUI,AppConstant,auditType,$window,$state,$scope,certificateFactory,$cookies,$timeout,certDtlRequiredData,toaster,YYYYMMDD,MMMDDYYYY,DDMMYYYY,DDMMMYYYY,HHmm,detailsFactory,auditService,auditFactory,CERTI_URL,masterFactory,vesselStatementFactory){
    	
    	var certDetails = this; 
    	
    	$scope.qrString = "";
    	
    	certDetails.AppConstant    = AppConstant;
    	
    	certDetails.ExtensionBtnClicked=false;
    	
    	certDetails.auditType	   = auditType;
    	
    	certDetails.withOutAdt	   = false;
    	
    	certDetails.withAdt	   	   = false;
    	
    	certDetails.disableDates   = false;
    	
    	certDetails.disableVsl	   = false;
    	
    	certDetails.disableAll	   = false;
    	
    	certDetails.disableIssue     = false;
    	
    	certDetails.disableExpire    = false;
    	
    	certDetails.disablExtnIssue  = false;
    	
    	certDetails.disablExtnExpire = false;
    	
    	certDetails.directIntOrAdd = false;
    	
    	certDetails.disableCertType  = false;
    	
    	certDetails.preventOnChange  = false;
    	
    	certDetails.enableCompletionDate = false;
    	
    	certDetails.disableReissue  = false;
    	
    	certDetails.managerDisableDropdown = false;
    	
    	certDetails.extManager = true;
    	
    	certDetails.setVesselHistory  = setVesselHistory;
    	
    	certDetails.minCertIssueDate      = '';
    	
		certDetails.maxCertIssueDate      = '';
		
		certDetails.minCertExpireDate     = '';
		
		certDetails.maxCertExpireDate     = '';
		
		certDetails.minExtnCertIssueDate  = '';
		
		certDetails.maxExtnCertIssueDate  = '';
		
		
		certDetails.dynamicMsg = '';
		
		certDetails.minExtnCertExpireDate = '';
		
		certDetails.maxExtnCertExpireDate = '';
		
		certDetails.nxtAuditCreate = false;
		
		certDetails.checkNxtAuditCreate = false;

		certDetails.renewalFulltermCertVal = false;
		
		certDetails.intermediateMinAuditDate = '';
		
		certDetails.previousCertExpiryDate = '';
		
		certDetails.checkPublish=false;
		
		certDetails.setCertIssueExpiry=setCertIssueExpiry;
		
		certDetails.dateFormater = dateFormater;
		
		certDetails.onChangeIssueExpiryDate=onChangeIssueExpiryDate;
		
		certDetails.certGenerateDisable=certGenerateDisable;
		
		certDetails.certPublsihDisable = certPublsihDisable;
		
		certDetails.disableCertIssue=disableCertIssue;
		
		//certDetails.updateVesselDetails = updateVesselDetails;
		
		certDetails.doBlur=doBlur;
		
		certDetails.onchangeReissueName = '';
		
		certDetails.checkPreviousInitialOrRenewal=false;
		
		certDetails.onchangeReissueExpireName = '';
		
		certDetails.checkRefreshValue=false;
		
		certDetails.checkGenerate=false;
		
    	certDetails.auditSeqNo     = Number($window.sessionStorage.getItem('certAuditSeqNo'));
        
    	certDetails.companyId      = Number($window.sessionStorage.getItem('certCompanyId') ? $window.sessionStorage.getItem('certCompanyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '');
        
    	certDetails.utn 		   = $window.sessionStorage.getItem('certUTN') ? $window.sessionStorage.getItem('certUTN') : '';
    	
    	certDetails.seqNo 	       = $window.sessionStorage.getItem('certSeqNo') ? $window.sessionStorage.getItem('certSeqNo') : '';
    
    	certDetails.activeStatus   = $window.sessionStorage.getItem('certActiveStatus') ? $window.sessionStorage.getItem('certActiveStatus') : '';
    	
    	certDetails.generateStatus = $window.sessionStorage.getItem('certGenerateStatus') ? $window.sessionStorage.getItem('certGenerateStatus') : '';
    	
    	certDetails.userRoleId     = sessionStorage.getItem('userRoleId');
    	
    	certDetails.loginUserId    = sessionStorage.getItem('emailId');
    	
    	certDetails.type   		   = $window.sessionStorage.getItem('certificateSeachType');
    	
    	certDetails.auditTypeArray           = certDtlRequiredData.auditTypes;
    	
    	certDetails.auditTypeArray = _.filter(certDetails.auditTypeArray, function(obj){ 
			return obj.auditTypeId==1001 || obj.auditTypeId==1002 || obj.auditTypeId==1003;
        });
    
    	certDetails.auditSubTypeArray        = certDtlRequiredData.auditSubTypes;
    
    	certDetails.vesselTypeArray          = certDtlRequiredData.vesselTypeData;
    	
    	certDetails.certificateIssuedOptions = certDtlRequiredData.certificateIssueReasons;
    	
    	certDetails.enableCertType 		 	 = [certDetails.AppConstant.INTERIM_CERT, certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.EXTENSION,certDetails.AppConstant.INTERMEDAITE_ENDORSED,certDetails.AppConstant.ADDITIONAL_ENDORSED,certDetails.AppConstant.RENEWAL_ENDORSED1,certDetails.AppConstant.RENEWAL_ENDORSED2,certDetails.AppConstant.RE_ISSUE];
    	
    	certDetails.getAudObsData            = certDtlRequiredData.getAudObsData;
    	
    	certDetails.maPort                   = certDtlRequiredData.maPort;
    	
    	certDetails.certificateReissueReason =certDtlRequiredData.ReissueReason;
    	
    	certDetails.certificateLength	   	 = 0;
    	
    	certDetails.vesselDataFromRmi = [];
    	
    	certDetails.vesselDetail      = {};
    	
    	certDetails.auditCreate       = false;
    	
    	certDetails.Stateflag = false;
    	
    	certDetails.enabled = false;
    	
    	certDetails.initialAudit = true;

    	certDetails.validateIssueDate = '';

    	certDetails.validateExpiryDate = '';
    	
    	certDetails.auditSubTypes     = [];
    	
    	certDetails.auditorNameArray  = {};
    	
    	certDetails.changeCallback = changeCallback;
    
    	certDetails.createValidation = createValidation;
    	
    	certDetails.certificateDtl    = {};
    	
    	certDetails.orgCertificateDtl    = {};
    	
    	certDetails.certDetails       = {};
    	
    	certDetails.portArray         = [];
    	
    	certDetails.vesselHistory   = [];
    	
    	certDetails.oldVesseldata 	= [];
    	
    	certDetails.nameToPrint       = [{'nameID':'0','nameValue':'No'},{'nameID':'1','nameValue':'Yes'}];
    	
    	certDetails.consecutive       = [{'consecutiveId':1000,'nameValue':'No'},{'consecutiveId':1001,'nameValue':'Yes'}];
    	
    	certDetails.signToPrint       = [{'signID':'0','signValue':'No'},{'signID':'1','signValue':'Yes'}];
    	
    	certDetails.auditWithOutCertificate = [certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ, certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ, certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ];

    	certDetails.viewCertificate = viewCertificate;
    	
    	certDetails.certificateBackOption = sessionStorage.getItem('certificateSeachTypes');
    	
    	certDetails.downloadCertifiacte = downloadCertifiacte;
    	
    	certDetails.downloadAllCertificate = downloadAllCertificate;
    	
    	certDetails.checkBlankCompletion = checkBlankCompletion;
    	
    	certDetails.dateValidation=dateValidation;
    	
    	certDetails.seal='';
		
    	certDetails.title='';
    	
    	certDetails.checkCertDesc = '';
    	
    	certDetails.latestVesselDetail = [];
    	
    	certDetails.latestVesselCompanyDetail = [];
    	
    	certDetails.checkAdminGenCer = checkAdminGenCer;
    	
    	certDetails.vesselDtlsCheck = vesselDtlsCheck;
    	
    	certDetails.renewalFulltermcertFlag = true;
    	
    	certDetails.nxtAuditInterOrAdd = false;
    	
    	certDetails.renewalExtendedExpiryDate = '';
    	
    	 certDetails.checkNxtAuditCreate = false;
    	 
    	 certDetails.checkRenewalGenerate = false;
    	 
    	 certDetails.certSearchScreen = false;
    	 
    	 certDetails.checkFlagGenerateOrPublish = false;
    	 
    	 certDetails.certDownType ="nor";

		 certDetails.prevAudFindingCarUpdate = false;			//added by @Ramya on 4-7-2022 for jira id - IRI-5361
    	
    	certDetails.imolabelValOptions = [{
						'index' : 0,
						'imolabelValTypeDesc':'IMO Number',
						'directive':'numeric',
						'reqUrl':'vesselImoNo'
    	},{
						'index' : 1,
						'imolabelValTypeDesc':'Vessel Name',
						'directive':'auditplace',
						'reqUrl':'vesselName'
    	},{
						'index' : 2,
						'imolabelValTypeDesc':'Official No',
						'directive':'numeric',
						'reqUrl':'officialNumber'
    	}];
    	
    	certDetails.withOutAudit = {
    			
				'auditSeqNo' 	: '',
				'seqNo' 		: 0,
				'endorsementID' : '',
				'auditDate' 	: moment(new Date()).format(MMMDDYYYY),
				'auditReportNo' : '',
				'certificateNo' : '',
				'utn' 			: '',
				'qrCodeUrl' 	: '',
				'certificateVer': certDetails.AppConstant.CERTIFICATE_VERSION,
				'publishStatus' : 0,
				'notes' 		: certDtlRequiredData.getCurrentUserFullName.userName,
				'leadName' 		: certDtlRequiredData.getCurrentUserFullName.userName,
				'issuerId' 		: sessionStorage.getItem('emailId')
		};
    	
    	certDetails.maPort.forEach(function(port){
    		
            if(port.activeFlag==1){ 
    			
    			var portToIns = port.portName?port.portName:'';
    			
    			portToIns = portToIns ? port.countryName ? portToIns+', '+port.countryName : portToIns : port.countryName ? port.countryName :'';
    					
    			certDetails.portArray.push(portToIns);
    		}
         });
    	
    	certDetails.auditorNameArray = certDetails.getAudObsData.filter(function(array){
    		
    		if(array.roles[0].roleId!=1004){
    			return array;
    		}
    	});
    	
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    		var officialId= res[0].officialId ? res[0].officialId : res[0].managerOfficialId;
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				certDetails.signerNameGen = data.signer;
			});
		});
    	

    	/*********function declaration*********/
    	certDetails.vesselDetails            = vesselDetails;
    	
    	certDetails.vesselSpecificDtl        = vesselSpecificDtl;
    	
    	certDetails.vesselSpecificDtl_Generate = vesselSpecificDtl_Generate;
    	
    	certDetails.vesselImoModel           = vesselImoModel;
    	
    	certDetails.setvesselImoNo           =  setvesselImoNo;
    	
    	certDetails.dateFormatConversion     = dateFormatConversion;
    	
    	certDetails.getAuditSubType          = getAuditSubType;
    	
    	certDetails.setCertDetails           = setCertDetails;
    	
    	certDetails.getPort                  = getPort;
    	
    	certDetails.test                     = test;
    	
    	certDetails.validateAndGenerateCert  = validateAndGenerateCert;
    	
    	certDetails.genrateCertifiacte       =  genrateCertifiacte;
    	
    	certDetails. getCertificateDetails   = getCertificateDetails;
    	
    	certDetails.attachSignature          = attachSignature;
    	
    	certDetails.validateCertificate  	 = validateCertificate;
    
    	certDetails.stringToDate 			 = stringToDate;
    	
    	certDetails.back 					 = back;
    	
    	certDetails.validateAndPublishCert   = validateAndPublishCert;
    	
    	certDetails.validatePublish 		 = validatePublish;
    	
    	certDetails.checkPublishPopup        = checkPublishPopup;
    	
    	certDetails.setExpireDate			 = setExpireDate;
    	
    	certDetails.setIssueDate			 = setIssueDate;
    	
    	certDetails.checkConsective			= checkConsective;
    	
    	certDetails.setExtendedExpireDate	 = setExtendedExpireDate;
    	
    	certDetails.onChangeSubType 		 = onChangeSubType;
    	
    	certDetails.checkRenewalType		= checkRenewalType;
    	
    	certDetails.getAuditCertDetails      = getAuditCertDetails;
    	
    	certDetails.setDateAndDisableCertIssueExpiry = setDateAndDisableCertIssueExpiry;
    	    	
    	certDetails.onChangeIssueType 		 = onChangeIssueType;

		certDetails.onChangeReissueReason	= onChangeReissueReason;  //Added by sudharsan for JIRA IRI-5248 
    	
    	certDetails.disableCertIssueTypeId = false;
    	
    	certDetails.certificateNum = '';
    	 
    	certDetails.certificateUtn = '';
    	
		certDetails.certificateqrCodeUrl = '';
    	
    	certDetails.releaseLock = true;
    	
    	certDetails.navigationScreen = false;
    	
    	certDetails.managerSearch = false;
    	
    	certDetails.disableExtension = 0;
    	 
    	certDetails.getPreviousAuditCerData;
    	
    	certDetails.portOfRegistry;
    	
    	/*     ON SCREEN LOAD STRAT   */
    	certDetails.auditingType = '';
    	
    	certDetails.auditingSubType = '';
    	
    	certDetails.imolabelVal    = 'vesselImoNo';
    	
    	certDetails.auditTypeLabel = 'Audit Type';
    	
    	certDetails.auditTypeLabelMLC = 'Inspection Type';
    	
    	certDetails.auditSubTypeLabel = 'Audit Sub Type';
    	
    	certDetails.auditSubTypeLabelMLC = 'Inspection Sub Type';
    	
    	certDetails.auditDateForScreen='Audit Date';
    	
    	certDetails.auditDateForScreenMLC='Inspection Date';
    	
    	certDetails.auditOrInspectionDetailsForScreen='AUDIT DETAILS';
    	
    	certDetails.auditOrInspectionDetailsForScreenMLC='INSPECTION DETAILS';
    	
    	certDetails.reasonForVoidReopen  = reasonForVoidReopen;
    	
    	certDetails.validateVessel       = validateVessel;
    	
    	certDetails.checkIntermCertPresent = 1;
    	
		certDetails.checkFullTermCertPresent = 1;
		
		certDetails.checkNxtInterOrAddiReissuePresent = 1;
		
		certDetails.checkPrevRenewalIsFullterm = 1;
		
		certDetails.checkPrevRenewalIsRenewalEndrosed = 1;
		
		certDetails.checkIntermediateCertPresent = 1;
		
		certDetails.checkAdditionalCertPresent = 1;
		
		certDetails.checkExtensionInInterOrAdd = 1;
		
		certDetails.certificateDtl.getRenewalPublishCount = 0;
		
		certDetails.certificateDtl.checkOnlyRenewalEndrosed = 1;
		
		certDetails.certificateDtl.checkRenEndrosAftFullTerm = 1;
		
		certDetails.certificateDtl.checkAdminRenewalEndrosed = 1;
		
		certDetails.certificateDtl.checkAdminRenewalCert = 1;
		
		certDetails.certificateDtl.checkExtensionCert = 1;
		
		certDetails.certificateDtl.checkExtensionInRenewal = 1;
		
		certDetails.getCurrentClosingMeetingDate = '';
		
		certDetails.generateCertIssueDate = '';
		
		certDetails.renewalfulltermPublish = true;
		
		certDetails.auditDtlsissedPlace = '';
		
		certDetails.auditDtlsGrt = '';
		
		certDetails.auditDtlsAuditDate = '';
		
		certDetails.auditDtlsdateOfRegistry = '';
		
		certDetails.orgNameToPrint = '';

		certDetails.orgSignToPrint = '';

		certDetails.orgAuditDate = '';

		certDetails.orgSignatureDate = '';

		certDetails.orgCertIssueDate = '';

		certDetails.orgCertExpiryDate = '';
		
		certDetails.orgCertAuditPlace = '';

		certDetails.orgCertExtIssueDate = '';

		certDetails.orgCertExtExpiryDate = '';

		certDetails.orgCertEndrosedDate = '';

		certDetails.orgCertExtEndrosedDate = '';

		certDetails.orgCertGrt = '';

		certDetails.orgCertDor = '';
		
		certDetails.orgVesselCompanyAddress = '';
		
		certDetails.orgVesselCompanyName = '';
		
		certDetails.orgDocExpiry = '';
		
		certDetails.orgDocIssuer = '';
		
		certDetails.orgVesselName = '';
		
		certDetails.orgPor = '';
		
		certDetails.orgVesselType = '';
		
		certDetails.orgCompanyImoNo = '';
				
		certDetails.orgVesselId = '';
		
		certDetails.publishCheckStatus = false;
		
     	/*certDetails.dmlcIssueDate=sessionStorage.getItem('dmlcIssueDate') ? sessionStorage.getItem('dmlcIssueDate') : 'N.A';
     	certDetails.dmlcIssuePlace=decodeURIComponent(atob(sessionStorage.getItem('dmlcLocation'))) ? decodeURIComponent(atob(sessionStorage.getItem('dmlcLocation'))) : 'N.A';*/
     	if($state.params.certificate){
    		
			if($state.params.certificate == 'Audit'){
				certDetails.disableVsl = true;
				certDetails.withAdt    = true;
				certDetails.navigationScreen = true;
				if(auditFactory.getCertificateDetails()){
					var auditAndCertData = angular.copy(auditFactory.getCertificateDetails());
					console.log(auditAndCertData)
					
					sessionStorage.setItem('vesselDetail', auditAndCertData.vesselDetail );
					
					sessionStorage.setItem('vesselCompanyDtl', auditAndCertData.vesselCompanyDtl );
					
					certDetails.certificateDtl = angular.copy(auditFactory.getCertificateDetails()).auditDetail;
					
					sessionStorage.setItem('certActiveStatus',certDetails.certificateDtl.activeStatus);
					
					certDetails.certificateDtl.getExactActiveStatus=1;
					console.log(certDetails.certificateDtl);

					certDetails.orgCertificateDtl = angular.copy(auditFactory.getCertificateDetails()).auditDetail;
					
					certDetails.getPreviousAuditCerData = angular.copy(auditFactory.getCertificateDetails()).previousAudit;

					certDetails.minAuditDate = auditAndCertData.minAuditDate;

					certDetails.maxAuditDate = auditAndCertData.maxAuditDate;
					
					certDetails.certificateDtl.nameToPrint='1';
					
					certDetails.certificateDtl.signToPrint='1';
					
					certDetails.getCurrentClosingMeetingDate = moment(certDetails.orgCertificateDtl.closeMeetingDate,DDMMMYYYY+HHmm).format(DDMMMYYYY);
					console.log(certDetails.getCurrentClosingMeetingDate);
					certDetails.Stateflag = true;
					if(certDetails.certificateDtl.vesselImoNo){
					 certificateFactory.getAllCycleDate(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.vesselImoNo ,certDetails.certificateDtl.companyId).$promise.then(function(res) {
			  				console.log(res);
			  				certDetails.arrOfDate = res;
			  			/*	certDetails.arrOfDate=res.sort(function(a, b) {
			  				    return parseFloat(a.cycleSeqNo) - parseFloat(b.cycleSeqNo);
			  				});*/
			  			console.log(certDetails.arrOfDate);
			  			});
					}
					certDetails.auditDtlsissedPlace = certDetails.orgCertificateDtl.auditPlace ? certDetails.orgCertificateDtl.auditPlace : '';
					
					certDetails.auditDtlsGrt = certDetails.orgCertificateDtl.grt ? certDetails.orgCertificateDtl.grt : '' ;
					
					var lstCertGrtVal =  certDetails.orgCertificateDtl.certificateDetail ? _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length,'publishStatus' : 0}).pluck("grt").toString() : certDetails.orgCertificateDtl.grt;
					
					certDetails.lstCertGrt =  lstCertGrtVal && lstCertGrtVal != null ? lstCertGrtVal : certDetails.orgCertificateDtl.grt;
					
					certDetails.auditDtlsdateOfRegistry = certDetails.orgCertificateDtl.dateOfRegistry ? certDetails.orgCertificateDtl.dateOfRegistry : '';

					var lstCertDorVal =  certDetails.orgCertificateDtl.certificateDetail ? _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length,'publishStatus' : 0}).pluck("dateOfRegistry").toString() : certDetails.orgCertificateDtl.dateOfRegistry;

					certDetails.lstCertDor =  lstCertDorVal && lstCertDorVal != null ? moment(lstCertDorVal, YYYYMMDD).format(MMMDDYYYY) : certDetails.orgCertificateDtl.dateOfRegistry;

					certDetails.auditDtlsAuditDate = certDetails.orgCertificateDtl.auditDate ? certDetails.orgCertificateDtl.auditDate : '' ;
					
					var lstCertAuditDateVal =  certDetails.orgCertificateDtl.certificateDetail ? moment((_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length,'publishStatus' : 0}).pluck("auditDate").toString() ),YYYYMMDD).format(MMMDDYYYY) : certDetails.orgCertificateDtl.auditDate;

					certDetails.lstCertAuditDate =  lstCertAuditDateVal && lstCertAuditDateVal != null ? moment(lstCertAuditDateVal,MMMDDYYYY).format(MMMDDYYYY) : certDetails.orgCertificateDtl.auditDate;
					
					if(certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
						certDetails.checkFullTermCertPresent = _(certDetails.certificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_CERT,'publishStatus' : 1}).pluck("certIssueId").toString() ? 1 : 0;

						if(auditAndCertData.auditDetail.certificateDetail && auditAndCertData.auditDetail.certificateDetail.length >0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){

							certDetails.certificateDtl.getRenewalPublishCount = auditAndCertData.auditDetail.certificateDetail[0].getRenewalPublishCount;
							certDetails.certificateDtl.checkOnlyRenewalEndrosed = auditAndCertData.auditDetail.certificateDetail[0].checkOnlyRenewalEndrosed;
							certDetails.certificateDtl.checkRenEndrosAftFullTerm = auditAndCertData.auditDetail.certificateDetail[0].checkRenEndrosAftFullTerm;
							certDetails.certificateDtl.checkAdminRenewalEndrosed = auditAndCertData.auditDetail.certificateDetail[0].checkAdminRenewalEndrosed;
							certDetails.certificateDtl.checkExtensionInRenewal = auditAndCertData.auditDetail.certificateDetail[0].checkExtensionInRenewal;
						}

					}else if(certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
						certDetails.checkIntermCertPresent = _(certDetails.certificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.INTERIM_CERT,'publishStatus' : 1}).pluck("certIssueId").toString() ? 1 : 0;

					}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

						if(certDetails.certificateDtl.certificateDetail){
							certDetails.checkIntermediateCertPresent = _(certDetails.certificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.INTERMEDAITE_ENDORSED,'publishStatus' : 1}).pluck("certIssueId").toString() ? 1 : 0;
						}else{
							certDetails.checkIntermediateCertPresent = 0;
						}

					}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

						if(certDetails.certificateDtl.certificateDetail){
							certDetails.checkAdditionalCertPresent = _(certDetails.certificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.ADDITIONAL_ENDORSED,'publishStatus' : 1}).pluck("certIssueId").toString() ? 1 : 0;
						}else{
							certDetails.checkAdditionalCertPresent = 0;
						}
					}
				
					var detailsLead= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});

					certDetails.leadStatus = (detailsLead.userId == sessionStorage.getItem('emailId')) ? true : false;
					certDetails.leadSign=detailsLead.audSignature!=null && detailsLead.audSignature!=undefined && detailsLead.audSignature!=''?true:false;
					
				/*	if(!certDetails.leadStatus) {
						certDetails.disableAll = true;
					}*/
                    var check= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
 		    		
 					certDetails.reviewSign=check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined?true:false;
 		    		

					if(!(certDetails.leadStatus) && auditAndCertData.auditDetail.allowNext==0){

						certDetails.disableAll = true;
					}
					if(!(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.allowNext==1){

						certDetails.disableAll = true;
					}
					
					certDetails.bckButton = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? "Audit Home" : "Inspection Home";
					
					certDetails.auditingType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditTypeLabel : certDetails.auditTypeLabelMLC;
					
					certDetails.auditingSubType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditSubTypeLabel : certDetails.auditSubTypeLabelMLC;

					
					certDetails.auditOrInspectionDetailsForScreenType=certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ?certDetails.auditOrInspectionDetailsForScreen:certDetails.auditOrInspectionDetailsForScreenMLC;
					
					certDetails.auditDateForScreenType=certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID?certDetails.auditDateForScreen:certDetails.auditDateForScreenMLC;
							
					if(certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.MLC_TYPE_ID){
						certDetails.userLoggedName = 'Auditor Name';
					}else{certDetails.userLoggedName = 'Inspector Name';}
					
					if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){

						if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){
							displayCertDtlsData(auditAndCertData);
						}else{
						
							certDetails.certificateDtl.extendedIssueDate = moment(certDetails.certificateDtl.certificateDetail[0].extendedIssueDate, 'YYYYMMDD').format('DD-MMM-YYYY')?moment(certDetails.certificateDtl.certificateDetail[0].extendedIssueDate, 'YYYYMMDD').format('DD-MMM-YYYY'):certDetails.certificateDtl.certIssueDate;
							certDetails.certificateDtl.extendedExpireDate =moment(certDetails.certificateDtl.certificateDetail[0].extendedExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY')?moment(certDetails.certificateDtl.certificateDetail[0].extendedExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'):certDetails.certificateDtl.certExpireDate;
						}

					}

					setEnableIssueType();
					
					certDetails.setDateAndDisableCertIssueExpiry();

					certDetails.enableCertType.push(certDetails.certificateDtl.certIssueId);

					certDetails.auditSeqNo = certDetails.certificateDtl.auditSeqNo;

					sessionStorage.setItem('certAuditSeqNo',certDetails.auditSeqNo);

					delete certDetails.certificateDtl.utn;

					for(var x in auditAndCertData.vesselDetail) {

						if(x != 'dateOfRegistry' && x != 'grt'){
							certDetails.certificateDtl[x]=auditAndCertData.vesselDetail[x];
						}
					}

					for(var x in auditAndCertData.vesselCompanyDtl) {

						certDetails.certificateDtl[x]=auditAndCertData.vesselCompanyDtl[x];
					}

					certDetails.portOfRegistry = auditAndCertData.vesselDetail.portOfRegistry;

					certDetails.orgCertificateDtl.portOfRegistry = certDetails.orgCertificateDtl.portOfRegistry ? certDetails.orgCertificateDtl.portOfRegistry : auditAndCertData.vesselDetail.portOfRegistry;

					certDetails.getAuditSubType(certDetails.certificateDtl.auditTypeId);

					if(certDetails.leadStatus){
						if(((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID 
								|| certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)  && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE)
								|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2
								|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1){
							certDetails.certificateDtl.endorsedDate = certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : certDetails.certificateDtl.auditDate;
					
						}					
					}

					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){

						certDetails.certificateDtl.extendedIssueDate =certDetails.certificateDtl.extendedIssueDate?certDetails.certificateDtl.extendedIssueDate:certDetails.certificateDtl.certIssueDate;
						certDetails.certificateDtl.extendedExpireDate =certDetails.certificateDtl.extendedExpireDate?certDetails.certificateDtl.extendedExpireDate:certDetails.certificateDtl.certExpireDate;
						certDetails.certificateDtl.endorsedDate = certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : certDetails.certificateDtl.auditDate;
					}

					if(!(auditAndCertData.auditDetail.certificateDetail) || auditAndCertData.auditDetail.certificateDetail.length==0){

						certDetails.certificateDtl.seqNo = 0;

					}else if(auditAndCertData.auditDetail.certificateDetail.length>0){

						certDetails.certificateLength = auditAndCertData.auditDetail.certificateDetail.length;

						var maxSeqNoCert = auditAndCertData.auditDetail.certificateDetail.reduce(function(prev, current){
							return (prev.seqNo > current.seqNo) ? prev : current
						});

						if(maxSeqNoCert && maxSeqNoCert.publishStatus){

							certDetails.certificateDtl.publishStatus = maxSeqNoCert.publishStatus;

							if(!(certDetails.disableAll) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT) && certDetails.certificateDtl.publishStatus==1){

								toaster.warning('Certificate already published for this Audit, please update certificate type to update certificate details');
							}

							certDetails.certificateDtl.seqNo = 0;
							certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
							certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
							certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
							certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;

						}else if(maxSeqNoCert && !(maxSeqNoCert.publishStatus)){

							certDetails.certificateDtl.seqNo 		  = maxSeqNoCert.seqNo;
							certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
							certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
							certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
							certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;
							certDetails.certificateDtl.certificateVer = maxSeqNoCert.certificateVer;
							certDetails.certificateDtl.publishStatus  = maxSeqNoCert.publishStatus;
							certDetails.certificateDtl.activeStatus   = maxSeqNoCert.activeStatus;
							certDetails.certificateDtl.leadName       = maxSeqNoCert.leadName;
							certDetails.certificateDtl.vesselId		  = maxSeqNoCert.vesselId;
							certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID
						}
					}
					
					
					if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
						
						var expiryDate = '';
						
     					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				 
     	    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				
     	    			 }
     					
     				}

	
					if((auditAndCertData.auditDetail.certificateData.length > 0 && certDetails.leadStatus) || (!certDetails.leadStatus) || (certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS)){
							displayCertDtlsData(auditAndCertData);
					}

					if(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS){
						certDetails.disableAll = true;
					}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 0){
						certDetails.disableAll = true;
					}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 1){

						checkPreviousInitialaudit('Manager');						
					}
					console.log(certDetails.orgCertificateDtl);
					certDetails.certificateDtl.extendedEndorsedDate = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? ((certDetails.leadStatus) ? moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY') : certDetails.certificateDtl.extendedEndorsedDate ? certDetails.certificateDtl.extendedEndorsedDate : '') : '';
					
					if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION){
						certDetails.orgCertificateDtl.portOfRegistry = certDetails.certificateDtl.portOfRegistry;
					}

					if(auditAndCertData.auditDetail.certificateData.length >1){
					
						validateIssueExpiryDate();
					}
					certDetails.disableCertIssueTypeId = false;

					if(auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS){
						toaster.info('Current audit marked as void');
						certDetails.disableAll = true;
						displayCertDtlsData(auditAndCertData);
					}else if(certDetails.certificateDtl.lockStatus == 1){
						toaster.info('Current audit retrieved in the laptop');
						certDetails.disableAll = true;
					}else if(certDetails.certificateDtl.lockStatus == 7){
						toaster.info('Current audit retrieved in the Mobile');
						certDetails.disableAll = true;
					}

					if(!(certDetails.leadStatus || certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)){
						certDetails.enabled = false;
					}

					certDetails.enabled = auditAndCertData.auditDetail.auditlockStatus;

					if(auditAndCertData.auditDetail.auditlockStatus){
						certDetails.releaseLock = false;
					}

					if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
						certDetails.certificateDtl.consecutiveId=1000;
						certDetails.subInterimDate='N.A';
						certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
						certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
					}

					certDetails.checkCertDesc = certDetails.orgCertificateDtl.certIssueId;
					//certDetails.certificateDtl.issuerName = certDetails.certificateDtl.issuerName ? certDetails.certificateDtl.issuerName : (auditAndCertData.auditDetail.leadAuditorName ? auditAndCertData.auditDetail.leadAuditorName : certDtlRequiredData.getCurrentUserFullName.userName);
					//certDetails.certificateDtl.issuerName =  certDtlRequiredData.getCurrentUserFullName.userName;

					certDetails.certificateDtl.auditStatusId = auditAndCertData.auditDetail.auditStatusId;
					
					renewalEndrosedChangedVal();

					certDetails.releaseLock = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID) ? true : certDetails.releaseLock;
					
					var userFlag = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) ? 'Manager' : 'lead';
	    			
	    			checkPreviousInitialaudit(userFlag);
					
					 certDetails.onchangeReissueName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? 'Issue Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ? 'Reissue Certificate Date' : '';

    				 certDetails.onchangeReissueExpireName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? 'Extended Expiry Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ? 'Expiration Date' : '';
					
    				 certDetails.checkExtensionInInterOrAdd = (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? 1 : 0;
    				 
     				
    				 
					$timeout(function(){
	    				if((certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.publishStatus==1) && certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS
	            				&& ((certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS) 
	            				|| ((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 1))){
	            			/*toaster.info('certificate already published please change the certificate issue type'); console.log("bvdvjvdjvd");
	            			certDetails.disableGenerate = true;*/
	            			if($state.params.certificate != 'managerSearch'){
								if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN){				//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359          				toaster.info('certificate already published please change the certificate issue type'); console.log("bvdvjvdjvd");
		            			certDetails.disableGenerate = true;
    	     				 }
							}
	            		}
	    			},20);
	        		
					checkOrgCertDtlVal(certDetails.certificateDtl,certDetails.orgCertificateDtl);
					if(certDetails.certificateDtl.generatedBy==1003){
						 if(certDetails.certificateDtl.issuerId == sessionStorage.getItem("emailId")){
							 certDetails.userLoggedName = 'Manager Name';
							 certDetails.signerName = certDtlRequiredData.getCurrentUserFullName.userName;
							 certDetails.certificateDtl.issuerName = certDetails.signerName;
						 }
						 if(certDetails.certificateDtl.issuerId != sessionStorage.getItem("emailId")){
    						 certDetails.getAudObsData.filter(function(array){
    					    		
    					    		if(array.emailId == certDetails.certificateDtl.issuerId){
    					    			certDetails.signerName = array.firstName + " " + array.lastName;
    					    		}
    					    	});
    						 certDetails.userLoggedName = 'Manager Name';
    						 certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 }
					}else{
						certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : auditAndCertData.auditDetail.leadAuditorName;
						certDetails.certificateDtl.issuerName = certDetails.signerName;
					}
				}
				console.log(certDetails.certificateDtl)
				
				console.log(certDetails.certificateDtl.auditTypeId+" "+certDetails.certificateDtl.vesselImoNo+ " "+certDetails.certificateDtl.companyId);
				
				detailsFactory.getPreviousAuditDetail(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId).$promise.then(function(res){
					 console.log(res)
					  //Added by sudharsan for Jira-ID = 5517 start here		 
						res.prevAuditDtl.forEach(function (audits){
							if(certDetails.auditSeqNo === audits.auditSeqNo){ //Added by sudharsan for Jira-Id = IRI=5631
							if(certDetails.certificateDtl.auditTypeId == audits.auditTypeId && certDetails.certificateDtl.auditSubTypeId == audits.auditSubTypeId && certDetails.certificateDtl.publishStatus == certDetails.AppConstant.ACCEPT ){
								certDetails.isSignAttached=audits.isSignAttached?true:false;  //Added by sudharsan for Jira-Id = IRI=5631

								 //commented by sudharsan for Jira-Id = IRI=5631
								// if(audits.isSignAttached){
								// 	certDetails.isSignAttached = true;	
								// }
								// else{
								// 	certDetails.isSignAttached = false;	
								// }
							}
						}
						});
					  //Added by sudharsan for Jira-ID = 5517 end here
					 var originalCompDate = certDetails.certificateDtl.completionDate;
					 certDetails.prevAuditDetls = angular.copy(res);
					 certDetails.prevAudFindingCarUpdate = certDetails.prevAuditDetls ?(certDetails.prevAuditDetls.carFindMaxStatusDate? true: false): false;		//added by @Ramya on 4-7-2022 for jira id - IRI-5361
    				 if((certDetails.certificateDtl.auditTypeId==1001 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || (certDetails.certificateDtl.auditTypeId==1002 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || (certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID)){
    				 certificateFactory.getAuditCertDetails(certDetails.certificateDtl.auditSeqNo, certDetails.certificateDtl.companyId).$promise.then(function(comp){
						console.log(comp)	
 						var compformatting=comp.auditDetail.certificateDetail;
 						console.log(compformatting)
 						var completionDateHighest='',dmlcDateHighest='',dmlcLocHighest='';
 						if(compformatting.length==0){
 						if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
								detailsFactory.getDMLCLocationDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditSeqNo,'dmlc').$promise.then(function(resDMLC){
	    							if(resDMLC.placeLocation[0]){
	    	        					var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
	    	        					if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE!='N.A' && resDMLC.placeLocation[0].CLOSE_MEETING_DATE!=''){
	    	        						if(checkDateFormat(resDMLC.placeLocation[0].CLOSE_MEETING_DATE)){
	    	        							var dateCloseFormat=moment(resDMLC.placeLocation[0].CLOSE_MEETING_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	    	        						}else{
	    	        							var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	    	        						}
 					        			/*var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE),'DD-MMM-YYYY').format('DD-MMM-YYYY');
 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
 								 	}else if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE=='N.A' || resDMLC.placeLocation[0].CLOSE_MEETING_DATE==''){
 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
 								 	}
	    	        					if(resDMLC.placeLocation[0].AUDIT_PLACE!='N.A' && resDMLC.placeLocation[0].AUDIT_PLACE!='' && resDMLC.placeLocation[0].AUDIT_PLACE!=null){ //Added by sudharan for Jira-Id = IRI-5530
 					        			
 					        			certDetails.certificateDtl.dmlcIssuePlace = decodeURIComponent(atob(resDMLC.placeLocation[0].AUDIT_PLACE)) ;
 								 	}else if(resDMLC.placeLocation[0].AUDIT_PLACE=='N.A' || resDMLC.placeLocation[0].AUDIT_PLACE=='' || resDMLC.placeLocation[0].AUDIT_PLACE==null){ //Added by sudharan for Jira-Id = IRI-5530
 								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
 								 	}
	    							}else{
	    								certDetails.certificateDtl.dmlcIssueDate = 'N.A';
	    								certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
	    							}
	    							
	    							certDetails.prevDmlcIssueDate = certDetails.certificateDtl.dmlcIssueDate;
	    							certDetails.prevDmlcIssuePlace = certDetails.certificateDtl.dmlcIssuePlace;
	    						});
							}
 						}
     						if(compformatting.length!=0 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
     							
 								var certcomplorder=0;
 								compformatting.forEach(function(a){
 									if(a.certOderNo>certcomplorder && (a.certIssueId==1002 || a.certIssueId==1008)){//reissue 
 										certcomplorder=a.certOrderNo;
 										completionDateHighest=a.completionDate;
 										dmlcDateHighest=a.dmlcIssueDate;
 										dmlcLocHighest=a.dmlcIssuePlace;
 									}
 								});
 								console.log(completionDateHighest)
 								if(certDetails.certificateDtl.auditTypeId==1003){

								 	if(dmlcDateHighest!='N.A' && dmlcDateHighest!=''){
								 		if(checkDateFormat(dmlcDateHighest)){
    	        							var dateCloseFormat=moment(dmlcDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    	        						}else{
    	        							var dateCloseFormat=moment(new Date(dmlcDateHighest),'MMMDDYYYY').format('DD-MMM-YYYY');
     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    	        						}
					        			/*var dateCloseFormat=moment(new Date(dmlcDateHighest),'DD-MMM-YYYY').format('DD-MMM-YYYY');
					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
								 	}else if(dmlcDateHighest=='N.A' || dmlcDateHighest==''){
								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
								 	}
								 	
								 	if(dmlcLocHighest!='N.A' && dmlcLocHighest!=''){
					        			certDetails.certificateDtl.dmlcIssuePlace = decodeURIComponent(atob(dmlcLocHighest));
								 	}else if(dmlcLocHighest=='N.A' || dmlcLocHighest==''){
								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
								 	}
 								}
 								 	if(completionDateHighest!='N.A' && completionDateHighest!=''){
 								 		var dateCloseFormat=moment(completionDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 					        			certDetails.certificateDtl.completionDate = dateCloseFormat;
 					        			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
 								 		
 					        			/*var dateCloseFormat=moment(new Date(completionDateHighest),'DD-MMM-YYYY').format('DD-MMM-YYYY');
 					        			certDetails.certificateDtl.completionDate = dateCloseFormat;
 					        			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;*/
 								 	}else if(completionDateHighest=='N.A'){
 								 		certDetails.certificateDtl.completionDate = completionDateHighest;
 								 		certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
 								 	}
 								 	else{
 								 		
 								 		certDetails.certificateDtl.completionDate = moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 								 		certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
 								 	}
				 				}
 								else{
 									certDetails.certificateDtl.completionDate=moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 									certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
 								}
	     						if(res.initalCount==0 && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
	 								detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',certDetails.certificateDtl.auditSeqNo).$promise.then(function(completion){
	 									if(completion.completionDate[0]){
			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
		 								 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
		 								 		}else if(completion.completionDate[0].COMPLETION_DATE==''){
		 								 			certDetails.certificateDtl.completionDate = 'N.A';
		 								 			}else{
		 								 				if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
		 								 					certDetails.certificateDtl.completionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
		 		    	        						}else{
		 		    	        							certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
		 		    	        						}
		 								 				//certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'DD-MMM-YYYY').format('DD-MMM-YYYY');
		 								 			}
			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
	 									}
			 		            		});
	 							}
     							var countPreVoid=0,firstInter=false;
     							var actualAuditLength=res.prevAuditDtl.length-1;
     							res.prevAuditDtl.forEach(function(a){
	 									if(a.auditStatusId==certDetails.AppConstant.VOID_AUDIT_STATUS){
	 										countPreVoid++;
	 									}
	 								});
     							var firstInterArray = res.prevAuditDtl[res.prevAuditDtl.length-1];
     							firstInterArray.certificateDetail.forEach(function(a){
										if(a.certOderNo == certDetails.certificateDtl.certOderNo)
											firstInter=true;
									});
     							
     							if(res.initalCount==0 && res.prevAuditDtl.length>=2){
     								var audSQNO=0;
			 		            		res.prevAuditDtl.forEach(function(a){
		 									if(a.auditSeqNo>audSQNO && (a.certIssueId==1002 || a.certIssueId==1008)){//reissue 
		 										audSQNO=a.auditSeqNo;
		 									}
		 								});
			 		            		console.log(audSQNO)
			 		            		if(audSQNO==0){
			 		            			audSQNO=res.prevAuditDtl[1].auditSeqNo;
			 		            			res.prevAuditDtl.forEach(function(a){
			 		            				audSQNO=a.auditSeqNo;
	 		 									if(a.auditSeqNo<audSQNO && (a.certIssueId==1004 || a.certIssueId==1005)){//add or inter 
	 		 										audSQNO=a.auditSeqNo;
	 		 									}
	 		 								});
			 		            		}
			 		            		detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',audSQNO).$promise.then(function(completion){
			 		            			if(completion.completionDate[0]){
			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
			 		            			
 			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
 		 								 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
 		 								 		
 		 								 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
 		 								 		certDetails.certificateDtl.completionDate = 'N.A';
 		 								 		
 		 								 	}
 		 								 	else{
 		 								 		if(firstInter){
 				 		            				certDetails.directIntermediate="directIntermediate";
 					 		            			certDetails.directIntermAdd="directIntermAdd";
 					 		            			certDetails.certificateDtl.completionDate = originalCompDate;
 				 		            			}else{
 				 		            				if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
 				 		            					certDetails.certificateDtl.completionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	 		    	        						}else{
	 		    	        							certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
	 		    	        						}
 				 		            				//certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'DD-MMM-YYYY').format('DD-MMM-YYYY');
 				 		            			}
 				 		            				
 		 								 		
 		 								 	}
			 		            			
			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
			 		            			}
			 		            		});
			 		            	}
     							
     							
     							
 								 if(res.prevAuditDtl.length==0 || res.prevAuditDtl.length==1 && res.initalCount!=1 || actualAuditLength == countPreVoid){
 			 		    				certDetails.enableCompletionDate=false;
 			 		            		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005)){
 			 		            			
 			 		            			certDetails.directIntermediate="directIntermediate";
 			 		            			certDetails.directIntermAdd="directIntermAdd";
 			 		            			if(comp.auditDetail.certificateDetail.length==0)
 			 		            				certDetails.certificateDtl.completionDate='N.A';
 			 		            			else
 			 		            				certDetails.certificateDtl.completionDate=moment(comp.auditDetail.certificateDetail[0].completionDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
 			 		            		}
 			 		            		
 			 		            	}else if(res.prevAuditDtl.length>1 && res.initalCount==0){
 			 		            		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005 || certDetails.certificateDtl.certIssueId == 1007 || certDetails.certificateDtl.certIssueId == 1006)){
 			 		            			certDetails.directIntermAdd="directIntermAdd";
 			 		            		}
 			 		            	}else if(res.prevAuditDtl.length>=2 && res.initalCount==1 && certDetails.certificateDtl.audCertIssueDesc != 'FULL TERM'){
 			 		            		var audSQNO=0;
 			 		            		res.prevAuditDtl.forEach(function(a){
 		 									if(a.auditSeqNo>audSQNO && (a.certIssueId==1002 || a.certIssueId==1008 || a.certIssueId==1003 )){//reissue 
 		 										audSQNO=a.auditSeqNo;
 		 									}
 		 								});
 			 		            		detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',audSQNO).$promise.then(function(completion){
 			 		            			if(completion.completionDate[0]){
 			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
 			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
 		 								 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
 		 								 		
 		 								 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
 		 								 		certDetails.certificateDtl.completionDate = 'N.A';
 		 								 		
 		 								 	}
 		 								 	else{
 		 								 		if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
				 		            					certDetails.certificateDtl.completionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 		    	        						}else{
 		    	        							certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
 		    	        						}
 		 								 		//certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'DD-MMM-YYYY').format('DD-MMM-YYYY');
 		 								 		
 		 								 	}
 			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
 			 		            			}
 			 		            		});
 			 		            		if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
		     								detailsFactory.getDMLCLocationDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,audSQNO,'mCert').$promise.then(function(resDMLC){
		     	    							if(resDMLC.placeLocation[0]){
		     	    	        					var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
		     	    	        					if(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE!='N.A' && resDMLC.placeLocation[0].DMLCII_ISSUE_DATE!=''){
		     	    	        						
		     	    	        						if(checkDateFormat(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE)){
		     	    	        							var dateCloseFormat=moment(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
			    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
		 		    	        						}else{
		 		    	        							var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
			    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
		 		    	        						}
		     	    	        						
		    	 					        			/*var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE),'DD-MMM-YYYY').format('DD-MMM-YYYY');
		    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
		    	 								 	}else if(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE=='N.A' || resDMLC.placeLocation[0].DMLCII_ISSUE_DATE==''){
		    	 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
		    	 								 	}
		     	    	        					if(resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION!='N.A' && resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION!=''){
		    	 					        			
		    	 					        			certDetails.certificateDtl.dmlcIssuePlace = resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION;
		    	 								 	}else if(resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION=='N.A' || resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION==''){
		    	 								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
		    	 								 	}
		     	    							}else{
		    	    								certDetails.certificateDtl.dmlcIssueDate = 'N.A';
		    	    								certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
		    	    							}
		     	    							certDetails.prevDmlcIssueDate = certDetails.certificateDtl.dmlcIssueDate;
		    	    							certDetails.prevDmlcIssuePlace = certDetails.certificateDtl.dmlcIssuePlace;
		     	    						});
		     							}
 			 		            		if(res.prevAuditDtl[0].auditSubTypeId=='1002' || res.prevAuditDtl[0].auditSubTypeId=='1004' ){
 			 		            			certDetails.enableCompletionDate=false;
 			 		            		}
 			 		            		else 
 			 		            			certDetails.enableCompletionDate=true;
 			 		            	}
 			 	    				/*if(certDetails.directIntermediate=="directIntermediate"){
 			 	    							if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE || !certDetails.checkGenerate)
 			 	    								certDetails.certificateDtl.completionDate='N.A';
 			 	    				}*/
 			 	    				
    				 		});
    				
    				 	}
    			
    				     //Added by sudharsan for Jira-ID=IRI-5581 Start here
    				     if(!certDetails.publishCheckStatus && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ ){
							if($state.params.certificate != 'managerSearch'){
								if((certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN && !certDetails.reviewSign && certDetails.certificateDtl.publishStatus == '1')&& certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){ //Modified by sudharsan for Jira ID => and IRI-5602
									toaster.info('Audit has not been signed off by Reviewer');
								}
							}
						}
						//Added by sudharsan for Jira-ID=IRI-5581 End here
    				 
					 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
						 detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'consecutive',certDetails.certificateDtl.auditSeqNo).$promise.then(function(completion){
							 if(completion.completionDate[0]){
							 console.log(completion.completionDate[0])
							 
							 if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
							 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
							 		certDetails.subInterimDate = certDetails.certificateDtl.completionDate;
							 		
							 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
							 		certDetails.certificateDtl.completionDate = 'N.A';
							 		certDetails.subInterimDate = certDetails.certificateDtl.completionDate;
							 		
							 	}
							 	else{ 
							 		var dateCloseFormat1;
							 		if(completion.completionDate[0].COMPLETION_DATE && checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
							 			dateCloseFormat1=moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 					        			
 	        						}else{
 	        							dateCloseFormat1=moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
 					        			
 	        						}
							 		var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? dateCloseFormat1 : moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
							 		//var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? moment(new Date(completion.completionDate[0].COMPLETION_DATE),'DD-MMM-YYYY').format('DD-MMM-YYYY') : moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
							 		certDetails.subInterimDate = certDetails.subInterimDate ? certDetails.subInterimDate : dateCloseFormat;
				 					certDetails.certificateDtl.completionDate = certDetails.certificateDtl.completionDate ? certDetails.certificateDtl.completionDate : certDetails.subInterimDate;
				 					
							 	}
							 certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
							 }
							
						});
		    				
	    			 }
//					 detailsFactory.vesselDetails(certDetails.certificateDtl.companyId,sessionStorage.getItem('emailId'),certDetails.certificateDtl.vesselImoNo,'vesselImoNo').$promise.then(function(res){
//						 console.log(res);
//						 
//						 
//					 });
				if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN && !certDetails.prevAudFindingCarUpdate){		//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359, IRI-5361
					 vesselDtlsCheck();
				}
    				 });
					

			}else if($state.params.certificate == 'Search'){
		
				certDetails.checkRefreshValue=true;
				certDetails.disableVsl = true;
				certDetails.withAdt    = true;
				certDetails.bckButton='Back';
				certDetails.getCertificateDetails();
				certDetails.certSearchScreen = true;
			
			}else if($state.params.certificate == 'managerSearch'){
				
				certDetails.checkRefreshValue=true;
				certDetails.disableVsl = true;
				certDetails.withAdt    = true;
				certDetails.bckButton='Back';
				certDetails.getCertificateDetails();
				certDetails.certSearchScreen = true;
				var managerPublished = sessionStorage.getItem('managerPublished');
				if(managerPublished=="true"){
					certDetails.onChangeIssueType();
					changeCallback();
				}
				if(managerPublished=="false" && certDetails.releaseLock)
					changeCallback();
			
			}else if($state.params.certificate == 'withOutAudit'){
				
				$timeout(function(){
					if(!certDetails.enabled){
						toaster.warning('Apply lock to Proceed');
    				}
    			},10);
    			//certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
				certDetails.bckButton='DashBoard';
				certDetails.auditingType ='Audit Type';
				certDetails.auditingSubType ='Audit Sub Type';
				certDetails.auditDateForScreenType='Audit Date';
				certDetails.withOutAdt = true;
			}

    	}else{

    		if(certDetails.type=='Search'){
    		
    			certDetails.checkRefreshValue=true;
    			certDetails.bckButton='Back';
    			certDetails.disableVsl = true;
    			certDetails.withAdt    = true;
    			certDetails.certSearchScreen = true;

    			certDetails.getCertificateDetails();


    		}else if(certDetails.type=='Audit'){

    			certDetails.disableVsl = true;
    			certDetails.withAdt    = true;
    			certDetails.bckButton='Audit Home';
    			certDetails.getAuditCertDetails();
    			
    		}else{
    			/*******without Audit generate certificate*********/
    			if(certDetails.userRoleId != certDetails.AppConstant.AUDITOR_ROLE_ID){
    				certDetails.disableAll = true;
    			}
    			
    			//certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    			certDetails.auditDateForScreenType='Audit Date';
    			if(certDetails.auditSeqNo && certDetails.companyId && certDetails.seqNo){

    				certDetails.getCertificateDetails();
    				certDetails.bckButton='Back';

    			}else{
    				
    				$timeout(function(){
    					if(!certDetails.enabled){
        					toaster.warning('Apply Lock to Proceed');
        				}
        			},10);
    				
    				certDetails.auditingType ='Audit Type';
    				certDetails.auditingSubType ='Audit Sub Type';
    				certDetails.bckButton='Back';
    				certDetails.withOutAdt = true;
    				
    				if(sessionStorage.getItem('withOutAdtCertificateData').auditSeqNo){
    				
    				certDetails.auditSeqNo = sessionStorage.getItem('withOutAdtCertificateData').auditSeqNo;
    				certDetails.companyId  = sessionStorage.getItem('withOutAdtCertificateData').companyId;
    				certDetails.seqNo      = sessionStorage.getItem('withOutAdtCertificateData').seqNo;
    				certDetails.activeStatus = sessionStorage.getItem('withOutAdtCertificateData').activeStatus;
    				}
    				
    			}
    		}					

    	}
     	
     	
    	
    	$scope.$watch('certDetails.enabled',function(newValue,oldValue){

    		certDetails.lockMessage = newValue ? 'Locked':'Unlocked';
    	});
    	
    	$scope.$watch('certDetails.certificateDtl.certExpireDate',function(newValue,oldValue){

    		var expireDate = (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT) ? moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)
    				: certDetails.certificateDtl.extendedExpireDate ? moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD)  : moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD);

    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    			certDetails.maxAuditDate = moment(expireDate).subtract(1,'year').format(YYYYMMDD);
    		}else{
    			certDetails.maxAuditDate = expireDate;
    		}

    	});
    	
    	$scope.$watch('certDetails.certificateDtl.extendedExpireDate',function(newValue,oldValue){

    		var expireDate = certDetails.certificateDtl.extendedExpireDate ? moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD)  : moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD);

    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    			certDetails.maxAuditDate = moment(expireDate).subtract(1,'year').format(YYYYMMDD);
    		}else{
    			certDetails.maxAuditDate = expireDate;
    		}
    		
    	});
    	
    	 $scope.$watch('certDetails.certificateDtl.portOfRegistry', function(){
            	
             var cache1 = $scope.certDetails.certificateDtl.portOfRegistry;
             var cache = cache1.trim();
             if (!(/^[a-zA-Z0-9_ ]+$/.test(cache))){      	
             	$scope.certDetails.certificateDtl.portOfRegistry = cache.slice(1,cache.length);
            
             }
           })
    	 $scope.$watch('certDetails.certificateDtl.dateOfRegistry', function(){
            	
             
             
             if (moment(certDetails.certificateDtl.dateOfRegistry, YYYYMMDD ,true).isValid()){      	
             	$scope.certDetails.certificateDtl.dateOfRegistry = moment(certDetails.certificateDtl.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) 
            
             }
           });
    	 
           
          function checkDateFormat(dateFor){
    		 var bool = false;
    		 var stringHypen = dateFor.toString();
    		 if(stringHypen.includes("-")){
	    		 var dateHypen = dateFor.split("-");
		    		 if(dateHypen.length>0)
		    			 bool = true;
    		 }
    		 
    		 return bool;
    	 }
    	
    	 function vesselDtlsCheck(){
             if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
            	 certDetails.oldVesseldata = angular.copy(certDetails.certificateDtl);
    		 detailsFactory.vesselDetails(certDetails.certificateDtl.companyId,sessionStorage.getItem('emailId'),certDetails.certificateDtl.vesselImoNo,'vesselImoNo').$promise.then(function(res){
        			console.log(res);
						
						 	var autoVessel = res[0];
		    				
		    				autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
		        			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
		        			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
		    				
		    				detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
		    					console.log(result)
		    				});
					 
        			if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT) && certDetails.certificateDtl.publishStatus == 0 ){
            			vesselStatementFactory.getVesselDetails(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId).$promise.then(function(vesRes){
            				console.log(vesRes);
            				
            				certDetails.latestVesselDetail = vesRes.vsselDtl;
            				certDetails.latestVesselCompanyDetail = vesRes.vesselCompany;
            				
            				certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselCompanyDetail[0].vesselCompanyAddress;
	    	   	       		
	    	   	       		certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselCompanyDetail[0].vesselCompanyName;
	    	   	       		
			   	       		certDetails.certificateDtl.docExpiry = certDetails.certificateDtl.docExpiry ? dateFormater(certDetails.latestVesselCompanyDetail[0].docExpiry, 'DD-MMM-YYYY'): "";
			  				
		    	   	    	certDetails.certificateDtl.docIssuer = certDetails.latestVesselCompanyDetail[0].docIssuer;
		    	  			
		    	   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
		    	   	       	
		    	   	       	certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.dateOfRegistry ? dateFormater(certDetails.latestVesselDetail[0].dateOfRegistry , 'DD-MMM-YYYY'): '';//moment(vesselDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD);
			   	       
			   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
			   	       		
			   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselCompanyDetail[0].companyImoNo;
			  				
			   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grt;
			   	       		
			   	       	    certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].portOfRegistry;
			   	       	    
			   	       	    certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselId;
            				
            				
            				
            			});
            			
            			}
            			else{
        			var count = 0;
        			//det.vesselRefreshMsg = 'Refresh Vessel Deatils For ';
        			var dynamicMsg = '';
        				certDetails.latestVesselDetail = angular.copy(res);
        				var doc_exp_date = new Date(moment(res[0].docExpiry, YYYYMMDD ,true).isValid() ? res[0].docExpiry :  moment(res[0].docExpiry,'DD-MMM-YYYY').format('YYYY-MM-DD')).getTime();
        				var doc_exp_date_cert = new Date(moment(certDetails.certificateDtl.docExpiry, YYYYMMDD ,true).isValid() ? certDetails.certificateDtl.docExpiry :  moment(certDetails.certificateDtl.docExpiry,'DD-MMM-YYYY').format('YYYY-MM-DD')).getTime();
        				console.log(doc_exp_date + " == "+ doc_exp_date_cert);
        				if(res[0].companyAddress ===certDetails.certificateDtl.vesselCompanyAddress)
       	       			 count++;
        				else
       	       			 dynamicMsg += 'Company Address,'
        				
       	       			if(res[0].customerName == certDetails.certificateDtl.vesselCompanyName)
    	   	       			count++;
    	   	       		else
    	   	       			 dynamicMsg += 'Company Name,'
    	   	       				 
    	   	       		 if(doc_exp_date == doc_exp_date_cert)
    	   	       				   	       			
    	   	       			 count++; 
    	   	       		 else
    	   	       			 dynamicMsg += 'Doc Expiry,'
    	   	       		  	       		 
        				
    	   	       		 if(res[0].docIssuer === certDetails.certificateDtl.docIssuer)
    	   	       			 count++;
    	   	       		 else
    	   	       			 dynamicMsg += 'Doc Issuer,'
    	    				
    	   	       		 if(res[0].vesselName === certDetails.certificateDtl.vesselName)
    	   	       			 count++;
    	   	       		 else
    	   	       			 dynamicMsg += 'Vessel Name,'
    	    			
    	   	       		if(dateFormater(res[0].registrationDate,'DD-MMM-YYYY') === certDetails.certificateDtl.dateOfRegistry)
    	   	       			count++;
    	   	       		else
    	   	       			 dynamicMsg += 'Date Of Registry,'
    	   	       				 
    	   	       		if(res[0].homePort === certDetails.certificateDtl.portOfRegistry)
        	   	       			count++;
        	   	       	else
        	   	       			dynamicMsg += 'Port Of Registry,'
    	   	       		if(res[0].vesselType.toUpperCase().trim() === certDetails.certificateDtl.vesselType.toUpperCase().trim())
    	   	       			count++;
    	   	       		else
    	   	       			 dynamicMsg += 'Vessel Type,'
    	   	       		if(res[0].companyIMONumber == certDetails.certificateDtl.companyImoNo)
    	   	       			count++;
    	   	       		else
    	   	       			 dynamicMsg += 'Company IMO NO.,'
    	   	       				 
    	   	       		if(res[0].grossTon == certDetails.certificateDtl.grt)
    	   	       			count++;
    	   	       		else
    	   	       			 dynamicMsg += 'GRT'
    	   	       		
    	   	       		 	     	   	     
        	     	   	       			
    	   	       		if(count!=10){
    	   	       			
    	   	       		var vesselDetail = [];
    	   	       		var vesselCompanyDtl = [];
    	   	       		if(certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERIM_SUB_TYPE_ID){ 	
   	   	       			 toaster.warning(dynamicMsg + ' has been changed in RMI. Please reissue the certificate');
		   	   	       		 }
		   	   	       		 else if(certDetails.certificateDtl.publishStatus == 0){
		   	   	       	if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
	    	   	       		toaster.warning(dynamicMsg + ' has been changed ,please contact manager to make the current Audit as void and reissue the Active certificate.');
	    	   	       		}else if(certDetails.certificateDtl.certIssueId != certDetails.AppConstant.FULL_TERM_IHM){
		    	   	       			certDetails.dynamicMsg = dynamicMsg + ' has been changed in RMI. Do you want to re-generate the certificate';
    	   	       		
	    	   	       		}
    					if(($state.params.certificate == 'managerSearch' && certDetails.certificateDtl.certIssueId != certDetails.AppConstant.EXTENSION)|| certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    					
    					certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].companyAddress;
    	  				
    					certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].customerName;
    	   	       		certDetails.certificateDtl.docExpiry = certDetails.certificateDtl.docExpiry ? dateFormater(certDetails.latestVesselDetail[0].docExpiry,'DD-MMM-YYYY') : "";
    	  				
    		   	    	certDetails.certificateDtl.docIssuer = certDetails.latestVesselDetail[0].docIssuer;
    		  			
    		   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
    		  				
    	   	       		certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.dateOfRegistry ? dateFormater(certDetails.latestVesselDetail[0].registrationDate,'DD-MMM-YYYY') : "";
    	   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
    	   	       		
    	   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
    	  				
    	   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
    	   	       		
    	   	       		certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
    		       	    
    		       	    certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselID;
    		       	    
    					}
    					
    					//setVesselHistory(certDetails);
    	   	       			}
    	   	       			else if(certDetails.certificateDtl.publishStatus && certDetails.certificateDtl.publishStatus == 1) {
		    	   	       			certDetails.dynamicMsg = dynamicMsg + ' has been changed in RMI. Do you want to reissue the certificate';
		    	   	       		if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
		    	   	       		toaster.warning(dynamicMsg + ' has been changed ,please contact manager to make the current Audit as void and reissue the Active certificate.');
		    	   	       		}else{
		    	   	       		toaster.warning(dynamicMsg + ' has been changed in RMI. Please reissue the certificate');
		    	   	       		}
    	   	       		
    	   	       			}
    	   	       			

    	   	       		 }
            			}
            	});
             }
         }
    	 
    
    	function changeCallback(){
    		 console.log(certDetails.certificateDtl)
    		 if(certDetails.certificateDtl.generatedBy == certDetails.AppConstant.MANAGER_ROLE_ID && certDetails.certificateDtl.publishStatus == 0 && certDetails.certificateDtl.issuerId != sessionStorage.getItem('emailId')){
    			// toaster.success("Certificate is already generated by " + certDetails.certificateDtl.issuerId);
    			 
    			 toaster.warning( "Certificate is already generated and not yet published by Manager "+ certDetails.certificateDtl.issuerName + ".");			//changed by @Ramya for Jira id - IRI-5645
    			 certDetails.createedit = 'Unlock';
    			 certDetails.releaseLock = true;
    			 certDetails.enabled = false;
    		 }else{
			    		  if(certDetails.enabled){
						 certDetails.releaseLock = false;
						
						 if(certDetails.withAdt){
						 certDetails.createedit = 'Lock';
						  detailsFactory.updateLockHolder(certDetails.certificateDtl.auditTypeId, certDetails.auditSeqNo,sessionStorage.getItem('emailId'),certDetails.companyId).$promise.then(function(data){
						  if(data.data=='Success'){
								toaster.success('Lock has been applied successfully');
								
							  }
						   });
					    }else {
					    	toaster.success('Lock has been applied successfully');
					         }
					
					   }else {
						   if(certDetails.withAdt){
						    certDetails.createedit = 'Unlock';
						    detailsFactory.updateLockHolder(certDetails.certificateDtl.auditTypeId, certDetails.auditSeqNo,' ',certDetails.companyId).$promise.then(function(data){
							console.log(data);
							if(data.data=='Success'){
								toaster.success('Lock Released Successfully');  }
			 			         });
						         }else{
						        	 toaster.success('Lock Released Successfully');
						              }
					             certDetails.releaseLock = true;
					          }
	    		  
	    		 }
    		 }
    	
    	function displayCertDtlsData(auditAndCertData){

    		certDetails.certificateDtl = angular.copy(_(auditAndCertData.auditDetail.certificateDetail).chain().where({'seqNo':auditAndCertData.auditDetail.certificateDetail.length})._wrapped[0]);
    		certDetails.certificateDtl.issuerName = certDetails.signerName;
    		if(auditAndCertData.auditDateChanged){
    			certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate;
    			auditAndCertData.auditDateChanged = false;
    		}
    		//certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate 
    		console.log(certDetails.certificateDtl)
    		if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=1001){
	    		certDetails.certificateDtl.dmlcIssueDate=certDetails.certificateDtl.dmlcIssueDate ? certDetails.certificateDtl.dmlcIssueDate : 'N.A';;
				certDetails.certificateDtl.dmlcIssuePlace=certDetails.certificateDtl.dmlcIssuePlace ? certDetails.certificateDtl.dmlcIssuePlace :  'N.A';
    		}
    		certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint+'';
    		certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';
    		certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);

    	try{ 
    			certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.auditPlace?decodeURIComponent(atob(certDetails.certificateDtl.auditPlace)):'';
    		}
    		catch(err){
    		}
    		certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);
    		
    		certDetails.setDateAndDisableCertIssueExpiry();

    	}
    	

    	/*     ON SCREEN LOAD  END  */
    	
    	
    	/******* function body *******/
    	
    	function getCertificateDetails(){

    		certificateFactory.getCertificateDetail(certDetails.auditSeqNo, certDetails.companyId, certDetails.seqNo,certDetails.activeStatus).$promise.then(function(res){
    			console.log(res)
				
    			certDetails.certificateDtl = angular.copy(res.result);
				/**Added by sudharsan for JIRA-ID 5232 and 5225  -- Start Here*/		
				if((moment(certDetails.certificateDtl.certIssueDate)._f)=="YYYY-MM-DD"){
					certDetails.certificateDtl.certIssueDate=moment(certDetails.certificateDtl.certIssueDate,YYYYMMDD).format(MMMDDYYYY);	
					if((moment(res.result.certIssueDate)._f)=="YYYY-MM-DD"){
						res.result.certIssueDate=moment(res.result.certIssueDate,YYYYMMDD).format(MMMDDYYYY);	
					}
				}
				/**End here */
    			if(certDetails.certificateDtl){
    				if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=1001){
		    			certDetails.certificateDtl.dmlcIssueDate=certDetails.certificateDtl.dmlcIssueDate ? certDetails.certificateDtl.dmlcIssueDate :  'N.A';
						certDetails.certificateDtl.dmlcIssuePlace=certDetails.certificateDtl.dmlcIssuePlace ? certDetails.certificateDtl.dmlcIssuePlace :  'N.A';
    				}
    				/*if(res.result.auditSubTypeId==certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID || res.result.auditSubTypeId==certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID)
    					certDetails.directIntermediate="directIntermediate";*/
    				detailsFactory.getPreviousAuditDetail(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId).$promise.then(function(respre){
					 console.log(respre)
					 certDetails.prevAuditDetls = angular.copy(respre);
					 var originalCompDate = certDetails.certificateDtl.completionDate;
    				 if((certDetails.certificateDtl.auditTypeId==1001 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || (certDetails.certificateDtl.auditTypeId==1002 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || (certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID)){
    				 certificateFactory.getAuditCertDetails(certDetails.certificateDtl.auditSeqNo, certDetails.certificateDtl.companyId).$promise.then(function(comp){
						console.log(comp)	
 						var compformatting=comp.auditDetail.certificateDetail;
 						console.log(compformatting)
 						var completionDateHighest='',dmlcDateHighest='',dmlcLocHighest='';
 						if(compformatting.length==0){
 						if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
								detailsFactory.getDMLCLocationDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditSeqNo,'dmlc').$promise.then(function(resDMLC){
	    							if(resDMLC.placeLocation[0]){
	    								
	    								if(checkDateFormat(resDMLC.placeLocation[0].CLOSE_MEETING_DATE)){
	    									var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
		    	        					if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE!='N.A' && resDMLC.placeLocation[0].CLOSE_MEETING_DATE!=''){
	 					        			    dateCloseFormat=moment(resDMLC.placeLocation[0].CLOSE_MEETING_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
		    	        					}else if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE=='N.A' || resDMLC.placeLocation[0].CLOSE_MEETING_DATE==''){
		 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
		 								 	}
	 	        						}else{
	 	        							var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
		    	        					if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE!='N.A' && resDMLC.placeLocation[0].CLOSE_MEETING_DATE!=''){
	 					        			   dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
		    	        					}else if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE=='N.A' || resDMLC.placeLocation[0].CLOSE_MEETING_DATE==''){
		 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
		 								 	}
	 	        						}
	    								
	    								
	    	        					/*var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
	    	        					if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE!='N.A' && resDMLC.placeLocation[0].CLOSE_MEETING_DATE!=''){
 					        			var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE)).format('DD-MMM-YYYY');
 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
 								 	}else if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE=='N.A' || resDMLC.placeLocation[0].CLOSE_MEETING_DATE==''){
 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
 								 	}*/
 								 	
 								 	if(resDMLC.placeLocation[0].AUDIT_PLACE!='N.A' && resDMLC.placeLocation[0].AUDIT_PLACE!=''){
 					        			
 					        			certDetails.certificateDtl.dmlcIssuePlace = decodeURIComponent(atob(resDMLC.placeLocation[0].AUDIT_PLACE)) ;
 								 	}else if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE=='N.A' || resDMLC.placeLocation[0].CLOSE_MEETING_DATE==''){
 								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
 								 	}
	    							}else{
	    								certDetails.certificateDtl.dmlcIssueDate = 'N.A';
	    								certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
	    							}
	    							certDetails.prevDmlcIssueDate = certDetails.certificateDtl.dmlcIssueDate;
	    							certDetails.prevDmlcIssuePlace = certDetails.certificateDtl.dmlcIssuePlace;
	    						});
							}
 						}
     						if(compformatting.length!=0 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
     							
 								var certcomplorder=0;
 								compformatting.forEach(function(a){
 									if(a.certOderNo>certcomplorder && (a.certIssueId==1002 || a.certIssueId==1008)){//reissue 
 										certcomplorder=a.certOrderNo;
 										completionDateHighest=a.completionDate;
 										dmlcDateHighest=a.dmlcIssueDate;
 										dmlcLocHighest=a.dmlcIssuePlace;
 									}
 								});
 								console.log(completionDateHighest)
 								if(certDetails.certificateDtl.auditTypeId==1003){

								 	if(dmlcDateHighest!='N.A' && dmlcDateHighest!=''){
								 		
								 		if(checkDateFormat(dmlcDateHighest)){
								 			var dateCloseFormat=moment(dmlcDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
						        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	 	        						}else{
	 	        							var dateCloseFormat=moment(new Date(dmlcDateHighest),MMMDDYYYY).format('DD-MMM-YYYY');
						        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	 	        						}
								 		
					        			/*var dateCloseFormat=moment(new Date(dmlcDateHighest)).format('DD-MMM-YYYY');
					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
								 	}else if(dmlcDateHighest=='N.A' || dmlcDateHighest==''){
								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
								 	}
								 	
								 	if(dmlcLocHighest!='N.A' && dmlcLocHighest!=''){
					        			certDetails.certificateDtl.dmlcIssuePlace = decodeURIComponent(atob(dmlcLocHighest));
								 	}else if(dmlcLocHighest=='N.A' || dmlcLocHighest==''){
								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
								 	}
 								}
 								 	if(completionDateHighest!='N.A' && completionDateHighest!=''){
 								 		
 								 		
 								 		if(checkDateFormat(completionDateHighest)){
 								 			var dateCloseFormat=moment(completionDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 	 					        			certDetails.prevcompletionDate = dateCloseFormat;
	 	        						}else{
	 	        							var dateCloseFormat=moment(new Date(completionDateHighest),MMMDDYYYY).format('DD-MMM-YYYY');
	 					        			certDetails.prevcompletionDate = dateCloseFormat;
	 	        						}
 								 		
 					        			/*var dateCloseFormat=moment(new Date(completionDateHighest)).format('DD-MMM-YYYY');
 					        			certDetails.prevcompletionDate = dateCloseFormat;*/
 								 	}else if(completionDateHighest=='N.A'){
 								 		certDetails.prevcompletionDate = completionDateHighest;
 								 	}
 								 	else{
 								 		certDetails.prevcompletionDate = moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 								 	}
				 				}
 								else{
 									certDetails.prevcompletionDate=moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 								}
	     						if(respre.initalCount==0 && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
	 								detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',certDetails.certificateDtl.auditSeqNo).$promise.then(function(completion){
	 									if(completion.completionDate[0]){
			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
			 		            				certDetails.prevcompletionDate = completion.completionDate[0].COMPLETION_DATE;
		 								 		}else if(completion.completionDate[0].COMPLETION_DATE==''){
		 								 			certDetails.prevcompletionDate = 'N.A';
		 								 			}else{
		 								 				
		 								 				if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
		 								 					certDetails.prevcompletionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');		//changed by ramya for jira id - IRI-5522
		 			 	        						}else{
		 			 	        							certDetails.prevcompletionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
		 			 	        						}
		 								 				//certDetails.prevcompletionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY');
		 								 			}
	 									}
			 		            		});
	 							}
     							var countPreVoid=0,firstInter=false;
     							var actualAuditLength=respre.prevAuditDtl.length-1;
     							respre.prevAuditDtl.forEach(function(a){
	 									if(a.auditStatusId==certDetails.AppConstant.VOID_AUDIT_STATUS){
	 										countPreVoid++;
	 									}
	 								});
     							if(res.prevAuditDtl){
	     							var firstInterArray = respre.prevAuditDtl[respre.prevAuditDtl.length-1];
	     							firstInterArray.certificateDetail.forEach(function(a){
											if(a.certOderNo == certDetails.certificateDtl.certOderNo)
												firstInter=true;
										});
     							}

     							if(respre.initalCount==0 && respre.prevAuditDtl.length>=2){
     								var audSQNO=0;
			 		            		respre.prevAuditDtl.forEach(function(a){
		 									if(a.auditSeqNo>audSQNO && (a.certIssueId==1002 || a.certIssueId==1008)){//reissue 
		 										audSQNO=a.auditSeqNo;
		 									}
		 								});
			 		            		console.log(audSQNO)
			 		            		if(audSQNO==0){
			 		            			audSQNO=respre.prevAuditDtl[1].auditSeqNo;
			 		            			respre.prevAuditDtl.forEach(function(a){
			 		            				audSQNO=a.auditSeqNo;
	 		 									if(a.auditSeqNo<audSQNO && (a.certIssueId==1004 || a.certIssueId==1005)){//add or inter 
	 		 										audSQNO=a.auditSeqNo;
	 		 									}
	 		 								});
			 		            		}
			 		            		detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',audSQNO).$promise.then(function(completion){
			 		            			if(completion.completionDate[0]){
			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
			 		            			
 			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
 			 		            				certDetails.prevcompletionDate = completion.completionDate[0].COMPLETION_DATE;
 		 								 		
 		 								 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
 		 								 		certDetails.prevcompletionDate = 'N.A';
 		 								 		
 		 								 	}
 		 								 	else{
 		 								 		if(firstInter){
 				 		            				certDetails.directIntermediate="directIntermediate";
 					 		            			certDetails.directIntermAdd="directIntermAdd";
 					 		            			certDetails.certificateDtl.completionDate = originalCompDate;
 				 		            			}else{
 				 		            				
	 				 		            				if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
	 				 		            					certDetails.prevcompletionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
		 			 	        						}else{
		 			 	        							certDetails.prevcompletionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
		 			 	        						}
	 				 		            				//certDetails.prevcompletionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY');
 				 		            				}
 		 								 		}
			 		            			}
			 		            		});
			 		            	}
     							
 								 if(respre.prevAuditDtl.length==0 || respre.prevAuditDtl.length==1 && respre.initalCount!=1 || actualAuditLength == countPreVoid){
 			 		    				certDetails.enableCompletionDate=false;
 			 		            		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005)){
 			 		            			
 			 		            			certDetails.directIntermediate="directIntermediate";
 			 		            			certDetails.directIntermAdd="directIntermAdd";
 			 		            			if(comp.auditDetail.certificateDetail.length==0)
 			 		            				certDetails.prevcompletionDate='N.A';
 			 		            			else{
 			 		            				if(checkDateFormat(comp.auditDetail.certificateDetail[0].completionDate)){
				 		            					certDetails.prevcompletionDate = moment(comp.auditDetail.certificateDetail[0].completionDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 			 	        						}else{
 			 	        							certDetails.prevcompletionDate = moment(new Date(comp.auditDetail.certificateDetail[0].completionDate),MMMDDYYYY).format('DD-MMM-YYYY');
 			 	        							
 			 	        						}
 			 		            				//certDetails.prevcompletionDate=moment(comp.auditDetail.certificateDetail[0].completionDate).format('DD-MMM-YYYY');
 			 		            			}
 			 		            				
 			 		            			
 			 		            		}
 			 		            		
 			 		            	}else if(respre.prevAuditDtl.length>1 && respre.initalCount==0){
 			 		            		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005|| certDetails.certificateDtl.certIssueId == 1007 || certDetails.certificateDtl.certIssueId == 1006)){
 			 		            			certDetails.directIntermAdd="directIntermAdd";
 			 		            		}
 			 		            	}else if(respre.prevAuditDtl.length>=2 && respre.initalCount==1 && certDetails.certificateDtl.audCertIssueDesc != 'FULL TERM'){
 			 		            		var audSQNO=0;
 			 		            		respre.prevAuditDtl.forEach(function(a){
 		 									if(a.auditSeqNo>audSQNO && (a.certIssueId==1002 || a.certIssueId==1008 || a.certIssueId==1003)){//reissue 
 		 										audSQNO=a.auditSeqNo;
 		 									}
 		 								});
 			 		            		detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',audSQNO).$promise.then(function(completion){
 			 		            			if(completion.completionDate[0]){
 			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
 			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
 			 		            				certDetails.prevcompletionDate = completion.completionDate[0].COMPLETION_DATE;
 		 								 		
 		 								 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
 		 								 		certDetails.prevcompletionDate = 'N.A';
 		 								 		
 		 								 	}
 		 								 	else{
 		 								 		if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
			 		            					certDetails.prevcompletionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
			 	        						}else{
			 	        							certDetails.prevcompletionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
			 	        							
			 	        						}
 		 								 		
 		 								 		//certDetails.prevcompletionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY');
 		 								 		
 		 								 	}
 			 		            			
 			 		            			}
 			 		            			var changedCertificateId = sessionStorage.getItem('managerSearch');
 			 		            			
 			 		            			if($state.params.certificate == 'managerSearch' && certDetails.extManager == true && changedCertificateId=='RE-ISSUE/ADMINISTRATIVE'){
	 			 		          				certDetails.managerSearch = true;
	 			 		          				certDetails.disableGenerate = false;
	 			 		      					certDetails.enabled = true;
		 			 		      				var managerPublished = sessionStorage.getItem('managerPublished');
		 			 		    				if(managerPublished=="true"){
		 			 								certDetails.onChangeIssueType();
		 			 								changeCallback();
		 			 		    				}
		 			 		    				if(managerPublished=="false" && certDetails.releaseLock)
		 			 		    					changeCallback();
	 			 		            			}
 			 		            		});
 			 		            		if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
		     								detailsFactory.getDMLCLocationDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,audSQNO,'mCert').$promise.then(function(resDMLC){
		     	    							if(resDMLC.placeLocation[0]){
		     	    	        					var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
		     	    	        					if(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE!='N.A' && resDMLC.placeLocation[0].DMLCII_ISSUE_DATE!=''){
		     	    	        						
		     	    	        						if(checkDateFormat(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE)){
		     	    	        							var dateCloseFormat=moment(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
			    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
					 	        						}else{
					 	        							var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
			    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
					 	        						}
		     	    	        						
		     	    	        						
		    	 					        			/*var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE)).format('DD-MMM-YYYY');
		    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
		    	 								 	}else if(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE=='N.A' || resDMLC.placeLocation[0].DMLCII_ISSUE_DATE==''){
		    	 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
		    	 								 	}
		     	    	        					if(resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION!='N.A' && resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION!=''){
		    	 					        			
		    	 					        			certDetails.certificateDtl.dmlcIssuePlace = resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION;
		    	 								 	}else if(resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION=='N.A' || resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION==''){
		    	 								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
		    	 								 	}
		     	    							}else{
		    	    								certDetails.certificateDtl.dmlcIssueDate = 'N.A';
		    	    								certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
		    	    							}
		     	    							certDetails.prevDmlcIssueDate = certDetails.certificateDtl.dmlcIssueDate;
		    	    							certDetails.prevDmlcIssuePlace = certDetails.certificateDtl.dmlcIssuePlace;
		     	    						});
		     							}
 			 		            		if(respre.prevAuditDtl[0].auditSubTypeId=='1002' || respre.prevAuditDtl[0].auditSubTypeId=='1004' ){
 			 		            			certDetails.enableCompletionDate=false;
 			 		            		}
 			 		            		else 
 			 		            			certDetails.enableCompletionDate=true;
 			 		            	}
 			 	    				/*if(certDetails.directIntermediate=="directIntermediate"){
 			 	    							if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE || !certDetails.checkGenerate)
 			 	    								certDetails.certificateDtl.completionDate='N.A';
 			 	    				}*/
 								if($state.params.certificate == 'managerSearch' && certDetails.extManager == true){
 				    				certDetails.managerSearch = true;
 				    				certDetails.disableGenerate = false;
 				    				certDetails.enabled = true;
 				    				var managerPublished = sessionStorage.getItem('managerPublished');
 				    				if(managerPublished=="true"){
 										certDetails.onChangeIssueType();
 										changeCallback();
 				    				}
 				    				if(managerPublished=="false" && certDetails.releaseLock)
 				    					changeCallback();
 							
 								}
 			 	    				
    				 		});
    				
    				 	}
					 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
						 detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'consecutive',certDetails.certificateDtl.auditSeqNo).$promise.then(function(completion){
							 if(completion.completionDate[0]){
							 console.log(completion.completionDate[0])
							 
							 if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
							 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
							 		certDetails.subInterimDate = certDetails.certificateDtl.completionDate;
							 		
							 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
							 		certDetails.certificateDtl.completionDate = 'N.A';
							 		certDetails.subInterimDate = certDetails.certificateDtl.completionDate;
							 		
							 	}
							 	else{ 
							 		var dateCloseFormat1;
							 		if(completion.completionDate[0].COMPLETION_DATE && checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
 	        							dateCloseFormat1=moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
 					        			
 	        						}else{
 	        							dateCloseFormat1=moment(new Date(completion.completionDate[0].COMPLETION_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
 					        			
 	        						}
							 		
							 		
							 		var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? dateCloseFormat1 : moment(certDetails.certificateDtl.certIssueDate).format('DD-MMM-YYYY');
							 		certDetails.subInterimDate = certDetails.subInterimDate ? certDetails.subInterimDate : dateCloseFormat;
				 					certDetails.certificateDtl.completionDate = certDetails.certificateDtl.completionDate ? certDetails.certificateDtl.completionDate : certDetails.subInterimDate;
				 					
							 	}
							 certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
							 }
						});
		    				
	    			 }
    				 });
    			}
    			if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    				certDetails.subInterimDate = certDetails.subInterimDate ? certDetails.subInterimDate : certDetails.certificateDtl.completionDate;
					certDetails.certificateDtl.completionDate = certDetails.certificateDtl.completionDate ? certDetails.certificateDtl.completionDate : certDetails.subInterimDate;
					
    			}
    			console.log(certDetails.certificateDtl);
				
				/**Added by sudharsan for JIRA-ID 5232 and 5225  -- Start Here*/
				if((moment(certDetails.certificateDtl.certIssueDate)._f)=="YYYY-MM-DD"){
					certDetails.certificateDtl.certIssueDate=moment(certDetails.certificateDtl.certIssueDate,YYYYMMDD).format(MMMDDYYYY);	
				}
				/**End Here */
    			if(res.initalCount==1 || res.renewalCount==1){
    				certDetails.checkPreviousInitialOrRenewal=true;
    			}
    				 if(certDetails.auditSeqNo==certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ || certDetails.auditSeqNo==certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || certDetails.auditSeqNo ==certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ){
    					 certDetails.withOutAdt=true;
    				 }
    			certDetails.getPreviousAuditCerData = angular.copy(auditFactory.getCertificateDetails()).previousAudit;
    			
    			certificateFactory.getAuditCertDetails(certDetails.auditSeqNo, certDetails.companyId).$promise.then(function(response){
					console.log(response);
					certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : response.auditDetail.leadAuditorName;
					certDetails.certificateDtl.issuerName = certDetails.signerName;
					/*var countPreVoid=0;
					var actualAuditLength=response.prevAuditDtl.length-1;
					response.prevAuditDtl.forEach(function(a){
							if(a.auditStatusId==certDetails.AppConstant.VOID_AUDIT_STATUS){
								countPreVoid++;
							}
						});
				 if(response.prevAuditDtl.length==0 || response.prevAuditDtl.length==1 && response.initalCount!=1 || actualAuditLength == countPreVoid){
				 		certDetails.enableCompletionDate=false;
				 		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005)){
				 			certDetails.directIntermediate="directIntermediate";
				 			certDetails.certificateDtl.completionDate=response.auditDetail.certificateDetail.length>0 ? moment(response.auditDetail.certificateDetail[0].completionDate).format('DD-MMM-YYYY') : 'N.A';
				 		}
				 	}*/
				if(certDetails.auditSeqNo!=600001 && certDetails.auditSeqNo!=600002 && certDetails.auditSeqNo!=600003){
				
					certDetails.auditAuditorDetail1=angular.copy(response.auditDetail.auditAuditorDetail);}
    			
					if(certDetails.certificateDtl.publishStatus==1 && certDetails.certSearchScreen == true){
						certDetails.certificateNotPublish==true;
					}
				
					 var detailsLead= _.findWhere(certDetails.auditAuditorDetail1, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});

	 					certDetails.leadSign=detailsLead && detailsLead!=undefined && detailsLead.audSignature!=null && detailsLead.audSignature!=undefined && detailsLead.audSignature!=''?true:false;

	 					var check= _.findWhere(certDetails.auditAuditorDetail1, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
	 		    		
	 					certDetails.reviewSign=check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined?true:false;
	 		    		
	 					certDetails.getPreviousAuditCerData = angular.copy(res.prevAuditDtl);

	 					try{ 
    				certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.auditPlace?decodeURIComponent(atob(certDetails.certificateDtl.auditPlace)):'';
 					certDetails.auditDtlsissedPlace = certDetails.certificateDtl.auditDtlsAuditPlace ? decodeURIComponent(atob(certDetails.certificateDtl.auditDtlsAuditPlace)) : '';

    			}
    			catch(err){
    			}
				/**Added by sudharsan for JIRA-ID 5232 and 5225  -- Start Here*/
				if(!(moment(res.result.certIssueDate)._f)){
					res.result.certIssueDate=moment(res.result.certIssueDate, MMMDDYYYY).format(YYYYMMDD);	
				}
				/**End Here */
    			certDetails.orgCertificateDtl = angular.copy(res.result);
    			console.log(certDetails.orgCertificateDtl)
    			
    			certDetails.dateFormatConversion(certDetails.orgCertificateDtl,YYYYMMDD,MMMDDYYYY);

				certDetails.auditDtlsGrt = certDetails.orgCertificateDtl.auditDtlsGrt ? certDetails.orgCertificateDtl.auditDtlsGrt : '' ;
								
				certDetails.auditDtlsdateOfRegistry =  certDetails.orgCertificateDtl.auditDtlsdateOfRegistry ?  moment(certDetails.orgCertificateDtl.auditDtlsdateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';

				certDetails.auditDtlsAuditDate = certDetails.orgCertificateDtl.auditDtlsAuditDate ?  moment(certDetails.orgCertificateDtl.auditDtlsAuditDate,YYYYMMDD).format(MMMDDYYYY) : '';

				certDetails.lstCertGrt =  (certDetails.orgCertificateDtl.seqNo == certDetails.orgCertificateDtl.maxSeqNo) && (certDetails.orgCertificateDtl.publishStatus == 0) ? certDetails.orgCertificateDtl.grt  :  certDetails.orgCertificateDtl.grt;

				certDetails.lstCertDor =  (certDetails.orgCertificateDtl.seqNo == certDetails.orgCertificateDtl.maxSeqNo) && (certDetails.orgCertificateDtl.publishStatus == 0) ? certDetails.orgCertificateDtl.dateOfRegistry : certDetails.orgCertificateDtl.dateOfRegistry;
								
				certDetails.lstCertAuditDate = (certDetails.orgCertificateDtl.seqNo == certDetails.orgCertificateDtl.maxSeqNo) && (certDetails.orgCertificateDtl.publishStatus == 0) ? certDetails.orgCertificateDtl.auditDate : certDetails.orgCertificateDtl.auditDate;		
				
				
    			if(certDetails.certificateDtl.maxSeqNo == certDetails.certificateDtl.seqNo){
    				certDetails.disableCertIssueTypeId = false;
    			}else{
    				certDetails.enabled = false;
    				certDetails.disableCertIssueTypeId = true;
    			}
    			if(certDetails.certificateDtl.vesselImoNo){
    			certificateFactory.getAllCycleDate(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.vesselImoNo ,certDetails.certificateDtl.companyId).$promise.then(function(res) {
      				console.log(res);
      				
      				certDetails.arrOfDate = res;
      				/*certDetails.arrOfDate=res.sort(function(a, b) {
      				    return parseFloat(a.cycleSeqNo) - parseFloat(b.cycleSeqNo);
      				});*/
      				console.log(certDetails.arrOfDate);
      				});
    			}
    			
    			certDetails.nxtAuditCreate = res.nextAudit ? res.nextAudit : certDetails.nxtAuditCreate;

    			certDetails.nxtAuditInterOrAdd = res.nxtAuditInterOrAdd ? res.nxtAuditInterOrAdd : certDetails.nxtAuditInterOrAdd;

    			certDetails.previousCertExpiryDate = res.previousCertExpiryDate ?  moment(res.previousCertExpiryDate,YYYYMMDD).format(MMMDDYYYY) : '';

    			certDetails.checkNxtAuditCreate =  res.checkNxtAuditCreate ?  res.checkNxtAuditCreate : certDetails.checkNxtAuditCreate;

    			certDetails.certificateLength = certDetails.certificateDtl.seqNo;

    			certDetails.intermediateMinAuditDate = res.intermediateMinAuditDate ? moment(res.intermediateMinAuditDate,YYYYMMDD).format(MMMDDYYYY) : '';	 

    			certDetails.getAuditSubType(certDetails.certificateDtl.auditTypeId);
    			
    			certDetails.auditingType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditTypeLabel : certDetails.auditTypeLabelMLC;
				
				certDetails.auditingSubType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditSubTypeLabel : certDetails.auditSubTypeLabelMLC;

				certDetails.checkPrevRenewalIsFullterm = res.prevRenewalIsFullterm ? 1 : 0;
				
				certDetails.checkPrevRenewalIsRenewalEndrosed = res.prevRenewalIsRenewalEndrosed ? 1 : 0;
				
				certDetails.auditOrInspectionDetailsForScreenType=certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ?certDetails.auditOrInspectionDetailsForScreen:certDetails.auditOrInspectionDetailsForScreenMLC;
				
				certDetails.auditDateForScreenType=certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID?certDetails.auditDateForScreen:certDetails.auditDateForScreenMLC;
				
				
				if(certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.MLC_TYPE_ID){
					certDetails.userLoggedName = 'Auditor Name';
					
				}else{
					certDetails.userLoggedName = 'Inspector Name';
				}
				
				
				
				
    			if (res.carFindMaxStatusDate && (res.carFindMaxStatusDate > res.previousAuditDate)) {
    				certDetails.minAuditDate = moment(moment(res.carFindMaxStatusDate, YYYYMMDD).add(1, 'days')).format(YYYYMMDD);
    			} else { 
    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

    					if(res.intermediateMinAuditDate){
    						certDetails.minAuditDate =	 moment(certDetails.intermediateMinAuditDate,MMMDDYYYY).add(1,'year').format(YYYYMMDD);
							 certDetails.maxAuditDate =	moment(moment(certDetails.orgCertificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)).subtract(1,'year').format(YYYYMMDD);
    					}else{
    						certDetails.minAuditDate =	 res.previousAuditDate ? moment(res.previousAuditDate,YYYYMMDD).add(1, 'days').format(MMMDDYYYY): '';
    						certDetails.maxAuditDate = certDetails.certificateDtl.certExpireDate? moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD):'';
    					}

    				}else{
    					certDetails.minAuditDate = res.previousAuditDate ? moment(res.previousAuditDate,YYYYMMDD).add(1, 'days').format(YYYYMMDD): '';
    				}
    			}

    			certDetails.certificateDtl.issuerSign = certDetails.certificateDtl.issuerSign ? atob(certDetails.certificateDtl.issuerSign):'';

    			certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint;

    			certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint;

    			certDetails.leadStatus = (certDetails.certificateDtl.leadAuditorId == sessionStorage.getItem('emailId')) ? true : false;

    			if(!(certDetails.leadStatus) && certDetails.certificateDtl.allowNext==0){
    				certDetails.disableAll = true;
    			}
    			if(!(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.allowNext==1){
    				certDetails.disableAll = true;
    			}

    			if(!(certDetails.disableAll) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT) && certDetails.certificateDtl.publishStatus==1 && !((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 0) && !(certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS) && (certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS)){

    				if(!certDetails.publishCheckStatus && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ ){
    					if($state.params.certificate != 'managerSearch'){
							if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN && certDetails.reviewSign && certDetails.certificateDtl.publishStatus == 0){					//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359 //Added by sudharsan for Jira-ID=IRI-5581
    						toaster.warning('Current Certificate is already published, please change the certificate type');
    						}
							else if((!certDetails.reviewSign && certDetails.certificateDtl.publishStatus == '1') && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
								toaster.info('Audit has not been signed off by Reviewer');  //Added by sudharsan for Jira-ID=IRI-5581 and IRI-5602
							}
						}
    				}
    			}

    			if(!certDetails.certificateDtl.leadAuditorId){
    				if(certDetails.certificateDtl.issuerId == sessionStorage.getItem('emailId') && certDetails.certificateDtl.publishStatus != 1){
    					certDetails.leadStatus =  true;
    					certDetails.disableAll = false;
    				}else{
    					certDetails.leadStatus =  false;
    				}
    			}

    			if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT) && certDetails.certificateDtl.publishStatus==1 && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) {
    				if($state.params.certificate != 'managerSearch'){
						if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN && certDetails.reviewSign && certDetails.certificateDtl.publishStatus==0){						//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359//Added by sudharsan for Jira-ID=IRI-5581
    					toaster.warning('Current Certificate is already published, please change the certificate type');
					}
					//Added by sudharsan for Jira-ID=IRI-5581 start here
					else if((!certDetails.reviewSign && certDetails.certificateDtl.publishStatus == '1') && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){  //Modified by sudharsan for Jira ID => and IRI-5602
						toaster.info('Audit has not been signed off by Reviewer');
					}
					//Added by sudharsan for Jira-ID=IRI-5581 end here
    				}
    			}

    			certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);

    			certDetails.setDateAndDisableCertIssueExpiry();

    			certDetails.onchangeReissueName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? 'Issue Date' : 
					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ? 'Reissue Certificate Date' : '';

				certDetails.onchangeReissueExpireName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? 'Extended Expiry Date' : 
					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ? 'Expiration Date' : '';

    			
    			if(certDetails.certificateDtl.activeStatus==0){
    				certDetails.disableAll = true
    			}

    			if(certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS){
    				certDetails.disableAll = true;
    				certDetails.enabled = false;
    			}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 0){
    				if(res.nextAudit){
    					certDetails.disableAll = certDetails.nxtAuditCreate ? true : certDetails.nxtAuditCreate;
    				}else{
    					certDetails.disableAll = true;
    				}
    				certDetails.enabled = false;

    			}

    			 if(certDetails.certificateDtl.lockHolder){
					 certDetails.releaseLock = false;
					 certDetails.enabled = true;
				 }
    			certDetails.enableCertType.push(certDetails.certificateDtl.certIssueId);
    			
    		
    			
    			validateIssueExpiryDate();
    			
    			renewalEndrosedChangedVal();

    			if(certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS){
    				toaster.info('Current audit marked as void');
    				certDetails.enabled = false;
    			}else if(certDetails.certificateDtl.lockStatus == 1){
    				toaster.info('Current audit retrieved in the laptop');
    				certDetails.disableAll = true;
    			}else if(certDetails.certificateDtl.lockStatus == 7){
    				toaster.info('Current audit retrieved in the Mobile');
    				certDetails.disableAll = true;
    			}

    			if(!(certDetails.leadStatus || certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)){
    				certDetails.enabled = false;
    			}

    			if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    				certDetails.certificateDtl.consecutiveId=1000;
    				certDetails.subInterimDate='N.A';
    				certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
    				certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    			}
    			
    			var userFlag = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) ? 'Manager' : 'lead';
    			
    			checkPreviousInitialaudit(userFlag);

    			if(!certDetails.nxtAuditCreate && (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)){

    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RE_ISSUE];

    				if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){

    					certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION);
    				}

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					enableRenewalCertTypeVthSearchScreen();
    					
    				}

    			}

    			certDetails.checkNxtInterOrAddiReissuePresent = (certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && certDetails.nxtAuditInterOrAdd) ? 1 : 0;
    			
    			certDetails.releaseLock = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID) ? true : certDetails.releaseLock;

    			if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    				var val =( res.checkFullTermCert && res.checkFullTermCert==true) ? true : false;    					 
    				if(val){
    					certDetails.checkFullTermCertPresent = 1;
    				}else{
    					certDetails.checkFullTermCertPresent = 0;
    				}


    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    				var val =( res.checkIntermCert && res.checkIntermCert==true) ? true : false;    					 
    				if(val){
    					certDetails.checkIntermCertPresent = 1;
    				}else{
    					certDetails.checkIntermCertPresent = 0;
    				}

    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

    				var val =( res.checkIntermediateCert && res.checkIntermediateCert==true) ? true : false;    					 
    				if(val){
    					certDetails.checkIntermediateCertPresent = 1;
    				}else{
    					certDetails.checkIntermediateCertPresent = 0;
    				}

    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    				var val =( res.checkAdditionalCert && res.checkAdditionalCert==true) ? true : false;    					 
    				if(val){
    					certDetails.checkAdditionalCertPresent = 1;
    				}else{
    					certDetails.checkAdditionalCertPresent = 0;
    				}
    			}
    			
				 certDetails.checkExtensionInInterOrAdd = (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? 1 : 0;
    			
    			if(!certDetails.publishCheckStatus && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.publishStatus==1) && certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS
        				&& ((certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS) 
        				|| ((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 1))){
        			/*toaster.info('certificate already published please change the certificate issue type');
        			certDetails.disableGenerate = true;*/
    				if($state.params.certificate != 'managerSearch'){
						if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN){				//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359	
    					toaster.info('certificate already published please change the certificate issue type');
						}
            			certDetails.disableGenerate = true;
    				}
        		}
		      
    			checkOrgCertDtlVal(certDetails.certificateDtl,angular.copy(res.result));
    			
    			certDetails.publishCheckStatus = false;
    			
    			if(certDetails.certificateDtl.generatedBy==1003){
					 if(certDetails.certificateDtl.issuerId == sessionStorage.getItem("emailId")){
						 certDetails.userLoggedName = 'Manager Name';
						 certDetails.signerName = certDtlRequiredData.getCurrentUserFullName.userName;
						 certDetails.certificateDtl.issuerName = certDetails.signerName;
					 }
					 if(certDetails.certificateDtl.issuerId != sessionStorage.getItem("emailId")){
						 certDetails.getAudObsData.filter(function(array){
					    		
					    		if(array.emailId == certDetails.certificateDtl.issuerId){
					    			certDetails.signerName = array.firstName + " " + array.lastName;
					    		}
					    	});
						 certDetails.userLoggedName = 'Manager Name';
						 certDetails.certificateDtl.issuerName = certDetails.signerName;
					 }
				}else{
					certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : auditAndCertData ? auditAndCertData.auditDetail.leadAuditorName : certDetails.signerName;
					certDetails.certificateDtl.issuerName = certDetails.signerName;
				}
    			
    			if($state.params.certificate == 'managerSearch' && certDetails.extManager == true){
    				certDetails.managerSearch = true;
    				certDetails.disableGenerate = false;
    				certDetails.enabled = true;
    				var managerPublished = sessionStorage.getItem('managerPublished');
    				if(managerPublished=="true"){
						certDetails.onChangeIssueType();
						changeCallback();
    				}
    				if(managerPublished=="false" && certDetails.releaseLock)
    					changeCallback();
			
				}
    		});
			
			if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN && !certDetails.prevAudFindingCarUpdate){		//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359, IRI-5361	
    			vesselDtlsCheck();
			}
    	});
    		
    	}
    	
    	function validateAndGenerateCert(){
    		
			 certDetails.generOrPubStatus = 'generate';

    		if(certDetails.validateCertificate()){
    			if(certDetails.withOutAdt){
      				getCertificateNoWithOutAudit();
      			}
    			certDetails.genrateCertifiacte();
    		}
    	}//end of validateAndGenerateCert()
    	
    	
    	
    	 function doBlur(event){
 		    event.target.blur();
 		}
    	
    	function genrateCertifiacte(){
    		
    		var certificateData = certDetails.setCertDetails();
    		certDetails.preventOnChange = true;
    		if(certificateData.certIssueId == certDetails.AppConstant.RE_ISSUE){
    			vesselSpecificDtl_Generate(certDetails.latestVesselDetail[0]);
    			
    			if(certDetails.latestVesselDetail.length > 0) {
 					
			          var autoVessel = certDetails.latestVesselDetail[0];
			          autoVessel.docExpiry = certDetails.latestVesselDetail[0].docExpiry ? moment(certDetails.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
			          autoVessel.registrationDate = certDetails.latestVesselDetail[0].registrationDate ? moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
			          autoVessel.keelLaidDate = certDetails.latestVesselDetail[0].keelLaidDate ? moment(certDetails.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
			          detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
			              console.log(result)
			          });
					 }
    		}
    		if(certificateData.auditDate < certificateData.certIssueDate && (certificateData.certIssueId == certDetails.AppConstant.INTERIM_CERT || certificateData.certIssueId == certDetails.AppConstant.FULL_TERM_CERT || certificateData.certIssueId == certDetails.AppConstant.RE_ISSUE) && certificateData.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID){
    			toaster.warning('Audit date is less than Issue date');
				}
    	
    		console.log(certificateData.utn ? true : false);
    		if(!(certificateData.utn)){
    			if((certificateData.auditSubTypeId==certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certificateData.auditSubTypeId==certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID || (certificateData.auditSubTypeId==certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && (certificateData.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED2 || certificateData.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED1))) && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE){

    				certificateFactory.getUtnAndCertificateId(certificateData.auditReportNo,certificateData.certificateNo,certificateData.companyId).$promise.then(function(resUtnCertId){

    					certificateData.utn = resUtnCertId.utn;
    					certificateData.certificateId = resUtnCertId.certificateId;
    					certificateData.qrCodeUrl = resUtnCertId.qrCodeUrl;

    					if(!certificateData.utn){
    						certificateFactory.getUTN().$promise.then(function(resUtn){

    							certificateData.utn = resUtn.utnString;
    							//here serverSide Concatinating QID and save with certificate data
    							certificateData.qrCodeUrl = CERTI_URL+certificateData.companyId + "?Cqid=";
    							certificateFactory.generateCertificate(certificateData,1,1).$promise.then(function(resCert){
    								setCertDataAfterGenerate(resCert);
    							});
    						});
    						
    					}else{
    						
    						certificateFactory.generateCertificate(certificateData,1,1).$promise.then(function(resCert){
    							setCertDataAfterGenerate(resCert);
    						});
    					}
    				});
    				console.log(certificateData);
    			}else{
    				console.log(certificateData);
    				certificateFactory.getUTN().$promise.then(function(resUtn){
    					console.log(certificateData);
    					certificateData.utn = resUtn.utnString;

    					//here serverSide Concatinating QID and save with certificate data
    					certificateData.qrCodeUrl = CERTI_URL+certificateData.companyId+"?Cqid=";
    					
                          
    					
    					if(certDetails.withOutAdt){
						var withOutAdtCertificateData={ 
							    'auditSeqNo':certificateData.auditSeqNo ? certificateData.auditSeqNo : '',
								'seqNo': 1,
								'withOutAdt': true,
								'activeStatus' : 1,
								'companyId'    :certificateData.companyId ? certificateData.companyId : ''
						};
						
						sessionStorage.setItem('withOutAdtCertificateData', withOutAdtCertificateData );
					}
    					

    					if(certDetails.withOutAdt || certDetails.auditWithOutCertificate.indexOf(certDetails.certificateDtl.auditSeqNo) > -1){
    						console.log(certificateData)
    						certificateFactory.generateCertificateWithoutAudit(certificateData,1,1).$promise.then(function(resCert){
    							if(resCert.check && resCert.check == 'publish the certificate'){
    								toaster.warning('Certificate already generated please publish the certificate');
    							}
    							setCertDataAfterGenerate(resCert);
    						});
    					}else{
    						
    						certificateFactory.generateCertificate(certificateData,1,1).$promise.then(function(resCert){
    						
    							setCertDataAfterGenerate(resCert);
    						});
    					}
    				});
    			}
    		}else{
    			console.log(certificateData)
    			if(certDetails.withOutAdt || certDetails.auditWithOutCertificate.indexOf(certDetails.certificateDtl.auditSeqNo) > -1){
    				
    				certificateFactory.generateCertificateWithoutAudit(certificateData,1,1).$promise.then(function(resCert){
    					if(resCert.check && resCert.check == 'publish the certificate'){
    						toaster.warning('Certificate already generated please publish the certificate');
    					}
    				
    					setCertDataAfterGenerate(resCert);
    				});
    			}else{
    				
    				certificateFactory.generateCertificate(certificateData,1,1).$promise.then(function(resCert){
    					
    					setCertDataAfterGenerate(resCert);
    				});
    			}
    		}
    		certDetails.checkPublish=false;

    	}//end of genrateCertifiacte()
    	
    	function setCertDataAfterGenerate(res,msg){
    		console.log(res);
    		certDetails.certificateDtl.utn            = res.updatedData.utn;
    		certDetails.certificateDtl.seqNo          = res.updatedData.seqNo;
    		certDetails.certificateDtl.auditSeqNo     = res.updatedData.auditSeqNo;
    		certDetails.certificateDtl.certificateNo  = res.updatedData.certificateNo;
    		certDetails.certificateDtl.certificateId  = res.updatedData.certificateId;
    		certDetails.certificateDtl.endorsementID  = res.updatedData.endorsementID;
    		certDetails.certificateDtl.qrCodeUrl 	  = res.updatedData.qrCodeUrl;
//  		certDetails.certificateDtl.auditDate 	  = new Date(res.updatedData.auditDate);
    		certDetails.certificateDtl.auditDate      = res.updatedData.auditDate?moment(res.updatedData.auditDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.certificateVer = res.updatedData.certificateVer;
    		certDetails.certificateDtl.publishStatus  = res.updatedData.publishStatus;
    		certDetails.certificateDtl.leadName       = res.updatedData.leadName;
    		certDetails.certificateDtl.issuerId 	  = res.updatedData.issuerId;
    		certDetails.certificateDtl.endorsedDate = res.updatedData.endorsedDate ? moment(res.updatedData.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.extendedExpireDate = res.updatedData.extendedExpireDate ? moment(res.updatedData.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : '';	
			/**Added by sudharsan for JIRA-ID 5232 and 5225  -- Start Here*/
			if((moment(res.updatedData.certIssueDate)._f)=="YYYY-MM-DD"){
				certDetails.certificateDtl.certIssueDate=moment(res.updatedData.certIssueDate,YYYYMMDD).format(MMMDDYYYY);	
			}
			/**End Here */
    		certDetails.checkCertDesc = res.updatedData.certIssueId;
    		certDetails.renewalExtendedExpiryDate =  res.updatedData.extendedIssueDate ? moment(res.updatedData.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.certificateLink = res.updatedData.certificateLink;
    		certDetails.orgCertificateDtl.portOfRegistry =  res.updatedData.portOfRegistry;
    		certDetails.orgCertificateDtl.grt =  res.updatedData.grt;
    		certDetails.checkRenewalGenerate = true;
    		certDetails.checkFlagGenerateOrPublish = true;
    		certDetails.auditDtlsGrt =  res.updatedData.grt;
    		certDetails.auditDtlsdateOfRegistry =  res.updatedData.dateOfRegistry ?  moment(res.updatedData.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
			certDetails.auditDtlsAuditDate = res.updatedData.auditDate ? moment(res.updatedData.auditDate,YYYYMMDD).format(MMMDDYYYY) : '' ;
			certDetails.lstCertGrt =  res.updatedData.grt;
			certDetails.lstCertDor =  res.updatedData.dateOfRegistry ?  moment(res.updatedData.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
			certDetails.lstCertAuditDate = res.updatedData.auditDate ? moment(res.updatedData.auditDate,YYYYMMDD).format(MMMDDYYYY) : '' ;    		
    		
    		if(res.updatedData.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && res.updatedData.certIssueId == certDetails.AppConstant.FULL_TERM_CERT ){
    			certDetails.generateCertIssueDate =	res.updatedData.certIssueDate ? moment(res.updatedData.certIssueDate,YYYYMMDD).format(MMMDDYYYY) : '';	
    			certDetails.renewalfulltermPublish = res.updatedData.publishStatus == 1 ? false : true;
    		} 
    		sessionStorage.setItem('seqNo',certDetails.certificateDtl.seqNo);
    		sessionStorage.setItem('certificateSeachType','Search');
    		sessionStorage.setItem('certSeqNo',certDetails.certificateDtl.seqNo);
    		sessionStorage.setItem('certActiveStatus',certDetails.certificateDtl.activeStatus);
    	
    		certDetails.disableVsl = true;
    		if(res.updatedData.publishStatus == 0){
    			certDetails.checkGenerate=true;
				/**Added by sudharsan for JIRA-ID 5232 and 5225  -- Start Here*/
				if(moment(res.updatedData.certIssueDate,YYYYMMDD)){
					certDetails.certificateDtl.certIssueDate = moment(res.updatedData.certIssueDate,YYYYMMDD).format(MMMDDYYYY);
				}
				/**End here */
    			checkOrgCertDtlVal(certDetails.certificateDtl,res.updatedData);
    		}
    	
    		if(res.updatedData.publishStatus == 1 && (res.updatedData.auditSeqNo == certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ
    				|| res.updatedData.auditSeqNo == certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || res.updatedData.auditSeqNo == certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ))
    		{
    			certDetails.disableAll = true;

    		}else{
    				if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.FULL_TERM_CERT){
    					certDetails.checkFullTermCertPresent = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.INTERIM_CERT){
    					certDetails.checkIntermCertPresent = 1
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED){
    					certDetails.checkIntermediateCertPresent = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED){
    					certDetails.checkAdditionalCertPresent =1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){
    					certDetails.certificateDtl.checkAdminRenewalEndrosed =1;
    					certDetails.certificateDtl.checkAdminRenewalCert = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
    					certDetails.certificateDtl.checkOnlyRenewalEndrosed = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.EXTENSION){
    					certDetails.certificateDtl.checkExtensionCert = 1;
    					certDetails.certificateDtl.checkExtensionInRenewal = 1;
    				}
    				
    				if (msg=='publish'){
    	    			toaster.success('Certificate published successfully');
    	    		}
    				//new
    				if(res.updatedData.auditSeqNo!=600001 && res.updatedData.auditSeqNo!=600002 && res.updatedData.auditSeqNo!=600003){
    				if(res.updatedData.publishStatus == 0 && !certDetails.certSearchScreen){
    					certDetails.publishCheckStatus = false;
    					getAuditCertDetails();
    					}
    				if(res.updatedData.publishStatus == 1 && !certDetails.certSearchScreen){
    					certDetails.publishCheckStatus = true;
    					getAuditCertDetails();
    				}else if(res.updatedData.publishStatus == 1 && certDetails.certSearchScreen){  
    					certDetails.seqNo = $window.sessionStorage.getItem('certSeqNo') ? $window.sessionStorage.getItem('certSeqNo') : '';
    					 certDetails.publishCheckStatus = true;
    					certDetails.getCertificateDetails();
    				}
    		}
    			}
    	
    		res = res.updatedData;
    	
    		if(res.auditSeqNo == certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ
    				|| res.auditSeqNo == certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || res.auditSeqNo == certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ)
    		{
    		
    			sessionStorage.setItem('certAuditSeqNo',res.auditSeqNo);
    		}
    		/*auditFactory.qrCodeGenerator(CERTI_URL+res.companyId+'/'+res.utn).$promise.then(function(response){

				certDetails.qrCodeData= response.data;

				if(res){

					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[];

					var doc = new jsPDF('p', 'mm', 'a4');	

					detailsFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId).$promise.then(function(result){

						result.forEach(function(a){

							a.certExpireDate = a.certExpireDate ? moment( new Date(a.certExpireDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.certIssueDate = a.certIssueDate ? moment(new Date(a.certIssueDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.auditDate = a.auditDate ? moment(new Date(a.auditDate),'YYYY-MM-DD').format('DD-MMMM-YYYY') : '';

							a.dateOfRegistry = a.dateOfRegistry ? moment(new Date(a.dateOfRegistry),'YYYY-MM-DD').format('DD-MMMM-YYYY') : '';

							a.issuerSignDate = a.issuerSignDate ? moment(new Date(a.issuerSignDate),'YYYY-MM-DD').format('DD-MMMM-YYYY') : '';

							a.extendedIssueDate = a.extendedIssueDate ? moment(new Date(a.extendedIssueDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.extendedExpireDate = a.extendedExpireDate ? moment(new Date(a.extendedExpireDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';

							a.issuerSign = atob(a.issuerSign);


							if(a.certIssueId == 1003 || a.certIssueId  == 1006){

								certDetails.extensionSign = "data:image/png;base64,"+a.issuerSign;

								extension.push(a);

							}else if(a.certIssueId  == 1007){

								certDetails.newRenewalEndorse2Sign = "data:image/png;base64,"+a.issuerSign;

								renewalEndorse2.push(a);


							}else if( a.auditSubTypeId== certDetails.AppConstant.INITIAL_SUB_TYPE_ID  || a.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID ||a.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

								certDetails.newCertificateSign = "data:image/png;base64,"+a.issuerSign;

								newCertificate.push(a);


							}else if(a.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){


								intermediate.push(a);

								certDetails.intermediateSign = "data:image/png;base64,"+a.issuerSign;

							}else if(a.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

								a[9] = a.issuerSign;

								additional.push(a);
							}
						});

						certDetails.signature = result; 

						var certificateDatas={

								'certificateNo' :newCertificate[0].certificateNo,
								'AuditTypeId'   :newCertificate[0].auditTypeId,
								'vesselName'    :newCertificate[0].vesselName,
								'officialNo'    :newCertificate[0].officialNo,
								'distinletter'  :newCertificate[0].officialNo,
								'vesselImoNo'   :newCertificate[0].vesselImoNo,
								'CompanyId'		:newCertificate[0].companyId,
								'AuditSeqNo'	:newCertificate[0].auditSeqNo,
								'UserIns'		:'BSOL',
								'DateIns'		:moment(new Date()).format(MMMDDYYYY),
								'portofreg'		:newCertificate[0].portOfRegistry,
								'shiptype'      :newCertificate[0].vesselType,
								'grt'			:newCertificate[0].grt,
								'companyaddress':newCertificate[0].vesselCompanyAddress,
								'companyname'   :newCertificate[0].vesselCompanyName,
								'companyimono'  :newCertificate[0].companyImoNo,
								'expirydate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
								'auditplace'	:newCertificate[0].auditPlace,
								'certissuedate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
								'auditSubTypeId':newCertificate[0].auditSubTypeId,
								'AuditDate'		:newCertificate[0].auditDate,
								'auditDate'     :newCertificate[0].auditDate,
												'LeadAuditorSign':newCertificate[0].issuerSign,
												'headSubTitleism' :'Issued under the provisions of the International Convention for the Safety',
												'headSubTitleism1':'of Life at Sea, 1974(SOLAS), as amended',
												'certify':'THIS IS TO CERTIFY THAT',
												'res':newCertificate[0],
												'intermediate':intermediate,
												'additional':additional,
												'LeadAuditorName':newCertificate[0].issuerName,
												'headSubTitleisps':'Issued under the provisions of the International Code for the Security',
												'headSubTitleisps1':'of Ships and of Port Facilities (ISPS Code)',
//												'previousexpirydate':moment(certDetails.previousAudit.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'),
												'headSubTitlemlc':'Issued under the provisions of Article V and Title 5 of the Maritime Labour Convention, 2006',
												'HeadSubTitle':'(Note: This Certificate shall have a Declaration of Maritime Labour Compliance attached.)',
												'headSubTitle2':"(referred to below as the “Convention”)",
												'signaturetext'	:'Signature of the Duly Authorized Official Issuing the Certificate.',
												'sealcontent'	:'(Seal or stamp of issuing authority, as appropriate)',
												'certificateVer':newCertificate[0].certificateVer,
												'utn':newCertificate[0].utn,
												'intermediateIssue':(intermediate.length > 0)?intermediate[0].certIssueDate:'',
												'intermediateExpiry':(intermediate.length > 0)?intermediate[0].certExpireDate:'',
												'intermediatePlace':(intermediate.length > 0)?intermediate[0].auditPlace:'',
												'intermediateLeadSign':	(intermediate.length > 0)?intermediate[0].issuerSign:'',
												'interSignDate':	(intermediate.length > 0)?intermediate[0].issuerSignDate:'',
												'qrCodeData' : response.data,
												'dateOfReg': newCertificate[0].dateOfRegistry,
												'renewalEndorse2':renewalEndorse2,
												'extension':extension,
												'seal':newCertificate[0].seal ? newCertificate[0].seal : certDetails.seal,
												'title':newCertificate[0].title ? newCertificate[0].title : certDetails.title
						} 

						var certificate = auditService.pdfService(certificateDatas);


						if(certificate.length > 0) {

							for(var i=0;i<certificate.length;i++){	

								var decrypt =  window.atob(window.btoa(certificate[i]));				

								doc.addImage(decrypt, 'PNG', 0, 0 ,doc.internal.pageSize.width,doc.internal.pageSize.height,"'NewCertificate"+i+"'",'FAST');

								if((certificate.length - 1) != i ) {
									doc.addPage();
								}
							}				
						}

						$timeout(function(){
							doc.save(''+certificateDatas.certificateNo+'.pdf');
							blockUI.stop();
						},2000);

					});

					toaster.success('Certificate data updated successfully');
					blockUI.stop();
				}else{
					blockUI.stop();
				}

			});*/

    		if (msg=='publish'){
    			toaster.success('Certificate published successfully');
    		}else{
    			toaster.success('Certificate generated. Please click publish button to publish certificate');
    		}

    	}
    	
    	/***** Audit/Inspection After generating the certificate we can view the latest certificate which is in active status*****/
    	function viewCertificate(){

    		ModalService.showModal({

    			templateUrl : 'src/modals/certificateHistory.html',

    			controller  : 'certificateHistoryController as certHist',

    			inputs : {

    				scope:certDetails.certificateDtl

    			}

    		}).then(function(modal) {

    			modal.element.modal();

    			modal.close.then(function(result) {

    			});

    		});	

    	}
    	
    	/***** Audit/Inspection/Review Create/Update time, from selected Vessel ImoNo getting vessel and company details *****/
    	function setvesselImoNo(item){

    		if(item.tcApprovalStatus=="1" || item.tcApprovalStatus=="0"){
        		
        		if(item.tcApprovalStatus=="0"){
        		
        		toaster.warning("TC Status is Pending");
        		}
    			//det.vesselImoNo = {'vesselImoNo':item.vesselImoNo};
    			
    			certDetails.certificateDtl = angular.copy(item);
				certDetails.certificateDtl.issuerName = certDetails.signerName
    			certDetails.validateVessel();

    			for(var x in item.vesselCompany) {
    				certDetails.certificateDtl[x]=item.vesselCompany[x];
    			}

    			//certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;

    			try{
    				certDetails.certificateDtl.vesselCompanyName = certDetails.certificateDtl.vesselCompany.vesselCompanyName ? decodeURIComponent(certDetails.certificateDtl.vesselCompany.vesselCompanyName) : '';

    				certDetails.certificateDtl.vesselCompanyAddress = certDetails.certificateDtl.vesselCompany.vesselCompanyAddress ? decodeURIComponent(certDetails.certificateDtl.vesselCompany.vesselCompanyAddress) :'';

    			}catch(err){}

    			certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);
    		}

    	}
    	
    	 function dateFormater(date,format,getTime){ // parm 1 - conversion date -## parm 2 - convert format ## boolean parm 3- convert to seconds for comparision
			 var res= '';
			 if(format == 'YYYY-MM-DD'){
				 res = moment(date, 'YYYY-MM-DD' ,true).isValid() ? date : ( moment(date, MMMDDYYYY ,true).isValid() ? moment(date,MMMDDYYYY).format('YYYY-MM-DD') :(moment(date, 'MMM DD, YYYY' ,true).isValid() ? moment(date,'MMM DD, YYYY').format('YYYY-MM-DD') : ( moment(date, MMMDDYYYY ,true).isValid() ? moment(date,MMMDDYYYY).format('YYYY-MM-DD') :(moment(date, 'MMM D, YYYY' ,true).isValid() ? moment(date,'MMM D, YYYY').format('YYYY-MM-DD') : '')) ))
			 }
			 else 
				 if(format == 'DD-MMM-YYYY'){
					 res =	 moment(date, 'DD-MMM-YYYY' ,true).isValid() ? date : ( moment(date, 'YYYY-MM-DD',true).isValid() ? moment(date,'YYYY-MM-DD').format('DD-MMM-YYYY') :(moment(date, 'MMM DD, YYYY' ,true).isValid() ? moment(date,'MMM DD, YYYY').format('DD-MMM-YYYY') : (moment(date, 'MMM D, YYYY' ,true).isValid() ? moment(date,'MMM D, YYYY').format('DD-MMM-YYYY') : '')) )
	    			  }
			 if(getTime){
				 res= new Date(res).getTime();
			 }
			 return res;
		 }
		 
            
    	function setCertDetails(){
    		
    		var certData = angular.copy(certDetails.certificateDtl);
    		console.log(certData);
    		console.log(certDetails.prevAuditDetls)
    		if(certDetails.certificateDtl.audCertIssueDesc){
    			delete certData["audCertIssueDesc"];
    		}
    		var audSeq = '';

    		if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.ISM_TYPE_ID){

    			audSeq = certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ;

    		}else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.ISPS_TYPE_ID){

    			audSeq = certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ;

    		}else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.MLC_TYPE_ID){

    			audSeq = certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ;
    		}

    		if(!(certData.auditSeqNo)){

    			for(var x in certDetails.withOutAudit){

    				if(x == 'auditDate'){
    					certData[x] = certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate : moment(new Date()).format(MMMDDYYYY)
    				}else{
    					certData[x]=certDetails.withOutAudit[x];
    				}
    				
    			}
    		}

    		certData.auditSeqNo=certData.auditSeqNo ? certData.auditSeqNo : audSeq;
			/**Added by sudharsan for Jira-id= 5439 */
			if((moment(certData.docExpiry)._f)=="YYYY-MM-DD"){
				certData.docExpiry=moment(certData.docExpiry,YYYYMMDD).format(MMMDDYYYY);	
		  	}
			//End Here Jira-id = 5439
    		certDetails.stringToDate(certData);

    		if(certDetails.certificateDtl.publishStatus==1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE) ){
    			certData.seqNo=0;
    			certData.certificateNo=((certData.auditSubTypeId==1003 || certData.auditSubTypeId==1005) && certData.certIssueId != certDetails.AppConstant.RE_ISSUE) ? certData.certificateNo : '';
    			certData.utn=((certData.auditSubTypeId==1003 || certData.auditSubTypeId==1005) && certData.certIssueId != certDetails.AppConstant.RE_ISSUE) ? certData.utn : '';
    			certData.certificateId = ((certData.auditSubTypeId==1003 || certData.auditSubTypeId==1005) && certData.certIssueId != certDetails.AppConstant.RE_ISSUE) ? certData.certificateId : '';

    		}else if(certDetails.certificateDtl.publishStatus==1){
    			certData.seqNo=0;
    		}
    		
    		if(certData.publishStatus == undefined && ((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE)){
    			certData.certificateNo = '';
    		}
    		certData.keelLaidDate = '';
    		certData.publishStatus = 0;
    		certData.issuerSign = certData.issuerSign ? btoa(certData.issuerSign):'';

    		certData.userIns  = sessionStorage.getItem('emailId');
    		certData.dateIns  = moment(new Date()).format(YYYYMMDD);
			certData.leadName = sessionStorage.getItem('usrname');  //Added by sudharsan for Jira-ID = IRI-5672
    		certData.issuerId = sessionStorage.getItem('emailId');
    		certData.docType  = certData.docTypeNo ? certData.docTypeNo :certData.docType;
    		certData.generatedBy = sessionStorage.getItem('userRoleId');

    		certData.certificateVer = certDetails.AppConstant.CERTIFICATE_VERSION;


    		var audPlace = '';
    		audPlace = certData.auditPlace?encodeURIComponent(certData.auditPlace):'';
    		audPlace = audPlace ? btoa(audPlace) : '';

    		certData.auditPlace = audPlace;
    		
    		certData.issuerName = certDetails.signerNameGen;
    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.ADDITIONAL_ENDORSED || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT){	
    			delete certData.extendedIssueDate;
    			delete certData.extendedExpireDate;
    			if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT){
    				delete certData.endorsedDate;
    			}
    		}
    		
    		if(certDetails.certificateDtl.tcApprovalStatus==0){
				 toaster.warning("TC Status is Pending");
			 }

    		delete certData.openMeetingDate;
    		delete certData.closeMeetingDate;
    		
    		certData.roleId = certDetails.userRoleId ? certDetails.userRoleId :'';
    		return  certData;
    	}
    	
    	
    	function vesselDetails(vesselImoNo,searchBy){ 

    		var vesData = vesselImoNo;
    		certDetails.vesselDetail = {};
    		var msg = '';
    		certDetails.vesselCompanyDtl = {};

    		if(searchBy=='vesselImoNo'){
    			msg = 'IMO Number';
    		}else if(searchBy=='vesselName'){
    			msg = 'Vessel Name';
    		}else if(searchBy=='officialNumber'){
    			msg = 'Official No';
    		}

    		if(searchBy=='vesselName' && vesselImoNo.length>=3){
    			var vesselImoNo2 = '';
    			var i;
    			for (i = 0; i < vesselImoNo.length; i++) {
    				if((i==0 || i==vesselImoNo.length-1) && vesselImoNo[i]=='*'){
    					vesselImoNo2 = vesselImoNo2+'%';
    				}else if(vesselImoNo[i]=='*'){
    					vesselImoNo2 = vesselImoNo2+'_';
    				}else{
    					vesselImoNo2 = vesselImoNo2+vesselImoNo[i];
    				}
    			}

    			vesselImoNo = vesselImoNo2;

    		}else if(searchBy=='vesselName' && vesselImoNo.replace(/[*]/g,'').length<3){
    			toaster.warning('Please enter atleast 3 characters');
    			vesselImoNo='';
    		}

    		if( vesselImoNo &&  ((vesselImoNo.length == 7 && searchBy=='vesselImoNo') || searchBy!='vesselImoNo')){

    			certificateFactory.vesselDetails(certDetails.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,searchBy).$promise.then(function(res){

    				$timeout(function(){

    					certDetails.vesselDataFromRmi = angular.copy(res);

    					if(certDetails.vesselDataFromRmi.length==1){

    						var selectedVsl = certDetails.vesselDataFromRmi[0];
    						certDetails.vesselSpecificDtl(selectedVsl);

    					}else if(certDetails.vesselDataFromRmi.length>0){

    						certDetails.vesselImoModel(certDetails.vesselDataFromRmi,vesData,searchBy);

    					}else{

    						toaster.warning('No vessel present with entered '+msg);	
    					}

    				},0);

    				return res;
    			});
    		}
    	}//end of vesselDetails
    	
    	
    	function vesselSpecificDtl(object){

    		var vesselImoNo = object.imoNumber, docTypeNum = object.vesselID;

    		certificateFactory.vesselSpecificDtl(certDetails.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,docTypeNum).$promise.then(function(res){


    			res = angular.copy(res.vsselDtl);

    			certDetails.imolabelVal = 'vesselImoNo';

    			certDetails.vesselImoNo = {'vesselImoNo':res.vesselImoNo};

    			certDetails.setvesselImoNo(res);
    		
    		});
    	}
    	function vesselSpecificDtl_Generate(object){
    		if(object){
	    		var vesselImoNo = object.imoNumber, docTypeNum = object.vesselID;
	
	    		certificateFactory.vesselSpecificDtl(certDetails.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,docTypeNum).$promise.then(function(res){
	    			res = angular.copy(res.vsselDtl);
	    			certDetails.oldVesseldata.keelLaidDate = res.keelLaidDate;
	    			certDetails.oldVesseldata.registeredCompanyAddress = res.registeredCompanyAddress;
	    			certDetails.oldVesseldata.registeredCompanyName = res.registeredCompanyName;
	    			var count = checkVesselHistory(res, certDetails.oldVesseldata);
	    			if(count > 0){
			    		setVesselHistory(certDetails.oldVesseldata);
			    		
			    		detailsFactory.updateVesselDetails(certDetails.vesselHistory).$promise
							.then(function(hisRes) {
								console.log(hisRes);
								//toaster.success('Vessel Details Updated!');
								
						});
			
			    		
	    			}
	    			console.log(res);
	    		});
    		}
    	}
    	  function getCertificateNoWithOutAudit(){
    		
    		  detailsFactory.getNewCertificateNo(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.auditSubTypeId,certDetails.companyId).$promise.then(function(res){
    			
    			certDetails.certificateDtl.certificateNo = res.data;    			  
    		  });    		  
    	  }
    	  
    	
    	  
    	  function vesselImoModel(vesselList,vesselImoNo,searchBy){

    		  ModalService.showModal({

    			  templateUrl : 'src/modals/vesselImoNo.html',

    			  controller  : 'vesselController as vc',

    			  inputs : {

    				  scope : {'vesselList':vesselList,'vesselImoNo':vesselImoNo,'searchBy':searchBy}

    			  }

    		  }).then(function(modal) {

    			  modal.element.modal();

    			  modal.close.then(function(result) {
    				  if(result=='OK'){

    					  var selectedVsl = _.findWhere(vesselList, {'check' : 1});

    					  if(selectedVsl){
    						  certDetails.vesselSpecificDtl(selectedVsl);
    					  }else{
    						  certDetails.validateVessel();
    					  }
    				  }else{
    					  certDetails.validateVessel();
    				  }
    			  });

    		  });       	
    	  }//end of vesselImoModel
    	  
    	  function getPort(val){

    		  var tempArray = [];

    		  if(val){
    			  var i = 0;

    			  for(i=0;i<certDetails.portArray.length;i++){
    				  if(certDetails.portArray[i].toUpperCase().indexOf(val.toUpperCase())>-1){
    					  tempArray.push(certDetails.portArray[i]);
    				  }
    				  if(tempArray.length>16 && val.length<4){
    					  break;
    				  }
    			  }
    		  }

    		  return tempArray;
    	  }
    	  
    		  
    	  function dateFormatConversion(obj,formPattern,toPattern){


    		  if(formPattern==YYYYMMDD && toPattern==MMMDDYYYY){
    			
    			  obj.openMeetingDate = obj.openMeetingDate?moment(obj.openMeetingDate,formPattern).format(toPattern):'';
    			  obj.closeMeetingDate = obj.closeMeetingDate?moment(obj.closeMeetingDate,formPattern).format(toPattern):'';
    			  obj.dateOfRegistry = obj.dateOfRegistry && moment(obj.dateOfRegistry, YYYYMMDD ,true).isValid()?moment(obj.dateOfRegistry,formPattern).format(toPattern):(obj.dateOfRegistry ? obj.dateOfRegistry :'');
    			  obj.certIssueDate = obj.certIssueDate?moment(obj.certIssueDate,formPattern).format(toPattern):'';
    			  obj.certExpireDate = obj.certExpireDate?moment(obj.certExpireDate,formPattern).format(toPattern):'';
    			  obj.auditDate = obj.auditDate?moment(obj.auditDate,formPattern).format(toPattern):'';
    			  obj.issuerSignDate = obj.issuerSignDate?moment(obj.issuerSignDate,formPattern).format(toPattern):'';
    			  obj.extendedIssueDate = obj.extendedIssueDate?moment(obj.extendedIssueDate,formPattern).format(toPattern):'';
    			  obj.extendedExpireDate = obj.extendedExpireDate?moment(obj.extendedExpireDate,formPattern).format(toPattern):'';
    			  obj.endorsedDate = obj.endorsedDate?moment(obj.endorsedDate,formPattern).format(toPattern):'';
    			  obj.extendedEndorsedDate = obj.extendedEndorsedDate?moment(obj.extendedEndorsedDate,formPattern).format(toPattern):'';
    			  obj.dateIns = obj.dateIns?moment(obj.dateIns,formPattern).format(toPattern):'';
    			  obj.docExpiry =  obj.docExpiry && moment(obj.docExpiry, toPattern ,true).isValid() ? obj.docExpiry : moment(obj.docExpiry,formPattern).format(toPattern);

    		  }else if(formPattern== MMMDDYYYY && toPattern==YYYYMMDD){

    			  obj.dateOfRegistry = obj.dateOfRegistry?moment(obj.dateOfRegistry,formPattern).format(toPattern):'';
    			  obj.certIssueDate = obj.certIssueDate?moment(obj.certIssueDate,formPattern).format(toPattern):'';
    			  obj.certExpireDate = obj.certExpireDate?moment(obj.certExpireDate,formPattern).format(toPattern):'';
    			  obj.auditDate = obj.auditDate?moment(obj.auditDate,formPattern).format(toPattern):'';
    			  obj.issuerSignDate = obj.issuerSignDate?moment(obj.issuerSignDate,formPattern).format(toPattern):'';
    			  obj.dateIns = obj.dateIns?moment(obj.dateIns,formPattern).format(toPattern):'';
    			  obj.docExpiry = obj.docExpiry?moment(obj.docExpiry,formPattern).format(toPattern):'';
    		  }
    	  }
    		  
    		  function getAuditSubType(auditTypeId){
    			  var flag = true;
				//  toaster.clear(); //Commented by sudharsan for Jira-ID=IRI-5581
    			  masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){ 
      				console.log(res);
      			if(res && res.length>0 && (!certDetails.certificateDtl.generatedBy)){
      			
      			if(auditTypeId==certDetails.AppConstant.MLC_TYPE_ID  && res[0].mlcreview==0){
      				toaster.clear(); flag=false;
					toaster.warning("Sorry, You aren't MLC Inspection authorized user");
      			}else if(auditTypeId==certDetails.AppConstant.ISM_TYPE_ID && res[0].ismreview==0){
      				toaster.clear(); flag=false;
					toaster.warning("Sorry, You aren't ISM Audit authorized user");
      			}else if(auditTypeId==certDetails.AppConstant.ISPS_TYPE_ID && res[0].ispsReview==0){
      				toaster.clear(); flag=false;
					toaster.warning("Sorry, You aren't ISPS Audit authorized user");
      			}
      			if(flag){
      			certDetails.auditSubTypes = certDetails.auditSubTypeArray.filter(function( obj ) {
    				  return obj.auditTypeId == auditTypeId;
    			    });
      			}else{
      				certDetails.auditSubTypes=[];	
      			}
      			
      			
      			}else{
      				certDetails.auditSubTypes = certDetails.auditSubTypeArray.filter(function( obj ) {
      				  return obj.auditTypeId == auditTypeId;
      			    });
      				
      			}
      			
    			  });
    			  
    		  }
    		  
    		  function test (){

    			  var mailId = sessionStorage.getItem('emailId');

    			  var data ={'auditSeqNo' : 600001,
    					  'companyId'  : 2,
    					  'auditTypeId' : 1001,
    					  'seqNo' : 1,
    					  'certificateId' :'',
    					  'endorsementID' :'',
    					  'auditSubTypeId' : 1001,
    					  'auditDate' : '2018-09-26',
    					  'auditPlace' : 'bsol',
    					  'auditReportNo' : '1234567',
    					  'certificateNo' : '',
    					  'utn' : 'MAReee677',
    					  'certIssueId' : 1001,
    					  'qrCodeUrl' : 'bsolurl',
    					  'certificateVer' : 'iri01',
    					  'certIssueDate' : '2018-09-26',
    					  'certExpireDate' : '2018-09-26',
    					  'extendedIssueDate' : '',
    					  'extendedExpireDate' : '',
    					  'endorsedDate' : '',
    					  'publishStatus' : 1,
    					  'activeStatus' : 1,
    					  'notes' : 'something',
    					  'leadName' : 'souarv',
    					  'issuerId' : 'sourv.bsol.com',
    					  'issuerName' : 'souarv',
    					  'issuerSign' : '', 
    					  'issuerSignDate' : '2018-09-26',
    					  'nameToPrint' : 1,
    					  'signToPrint' : 1,
    					  'vesselId' : 12345,
    					  'vesselImoNo' : 1234567,
    					  'vesselName' : 'souravVessel',
    					  'grt' :        12345,
    					  'vesselType' : 1001,
    					  'officialNo' : 12345,
    					  'portOfRegistry' : 'bsolport',
    					  'dateOfRegistry' :'2018-09-26',
    					  'companyImoNo' : '1234567',
    					  'vesselCompanyName' : 'bsolComapny',
    					  'vesselCompanyAddress' : 'N nagar',
    					  'vesselUk' : 1234,
    					  'vesselPk' : 1234,
    					  'classSociety' : '2346',
    					  'callSign' : '1234',
    					  'docTypeNumber' : '1234',
    					  'docType' : '45',
    					  'docIssuer' : 'sourav',
    					  'docExpiry' : '2018-09-26',
    					  'userIns' : 'sou',
    					  'dateIns' :'2018-09-26'
    			  };
    			  detailsFactory.getSignature(mailId,2).$promise.then(function(res){

    				  var sign =res.userDetail.signature;

    				  if(sign){
    					  data.issuerSign = sign?btoa(sign):'';
    				  }
    				  delete data.certOderNo;
    				  certificateFactory.generateCertificate(data,1,1).$promise.then(function(res){

    				  });

    			  });

    		  }
    		  
    		  function IsValidDate(myDate) {
                  var filter = /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(JAN|FEB|MAR|APR|MAY|JUN|JULY|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/
                                  return filter.test(myDate);
              }
    		 //certDetails.test();
    		 function checkAdminGenCer(){
    			 if(certDetails.certificateDtl.certIssueId=='1003'||certDetails.certificateDtl.certIssueId=='1006')
    				 certDetails.ExtensionBtnClicked=true;
					 certDetails.certificateDtl.activeStatus = 1; //Added by sudharsan for jira-ID = IRI-5703
    			 if(!(certDetails.certificateDtl.publishStatus==1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT))){
    				 if(certDetails.certificateDtl.issuerName != certDtlRequiredData.getCurrentUserFullName.userName){

    					//certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    					 attachSignature('admin' , function() {
    						 validateAndGenerateCert();
    					 });
    				 }else{
    					 validateAndGenerateCert();
    				 }
    			 }else{
    				 validateAndGenerateCert();

    			 }
    		 }
    		 
    		 function attachSignature(value , callback){

    			 var mailId = sessionStorage.getItem('emailId');

    			 var officialId = '';

    			 detailsFactory.getCurrentUserDetail(mailId,certDetails.companyId).$promise.then(function(data){

    				 if(data.length>0 && data[0].managerOfficialId){

    					 officialId = data[0].managerOfficialId;

    					 detailsFactory.auditorSignAndSeal(officialId,certDetails.companyId).$promise.then(function(res){

    						 var sign =res.signature;

    						 /****seal and Desig*****/

    						 certDetails.certificateDtl.seal=res.seal;
    						 certDetails.certificateDtl.title=res.title;
                           
    						 if(sign){
    							 certDetails.certificateDtl.issuerSign = sign;
    							
    							 if(data[0].roles[0].roleId==1003){
    								
    								 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate ? certDetails.certificateDtl.issuerSignDate : moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    							 }else{
    								 certDetails.certificateDtl.issuerSignDate =certDetails.certificateDtl.auditDate;
    							 }
    							 certDetails.createValidation();
    							 if(value=='admin'){
    								 callback();
    							 }

    						 }
    					 });

    				 }else{


    					 toaster.warning('Lead Auditor information not found');

    					 /*detailsFactory.getSignature(mailId,certDetails.companyId).$promise.then(function(res){

    			   			var sign =res.userDetail.signature;

    			   			if(sign){

    			   				certDetails.certificateDtl.issuerSign = sign;
    	 		   				certDetails.certificateDtl.issuerSignDate = moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    	 	    			}
    			   		});*/
    					 /*certDetails.userName = certDetails.certificateDtl.issuerName;
    					userFactory.signupload(certDetails.userName,certDetails.companyId).$promise.then(function(res) {
    						certDetails.userList=res;
    						if(res.length==1){


			   				certDetails.certificateDtl.issuerSign = res[0].signature;
    	 		   			certDetails.certificateDtl.issuerSignDate = moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    						certDetails.seal=res[0].seal;
			   				certDetails.title=res[0].title;

    						}
    						else if(res.length>1){


    						 	ModalService.showModal({

    				    			templateUrl : 'src/modals/userSignature.html',

    					            controller  : 'UserSigantureController as uc',

    					            inputs : {

    					            	scope : {'userList':certDetails.userList}

    					            }

    				        	}).then(function(modal) {

    				    			modal.element.modal();

    					            modal.close.then(function(result) {

    					            	if(result=='OK'){

    					            		var selectedUsr = _.findWhere(certDetails.userList, {'check' : 1});

    					            		if(selectedUsr.officialId && selectedUsr.signature){

    					            			certDetails.officialId=selectedUsr.officialId;


    					            			var selectedUsr =selectedUsr.signature;

    					  *//****seal and Desig*****//*

        			    			   			certDetails.seal=selectedUsr.seal;
        						   				certDetails.title=selectedUsr.title;
        						   				certDetails.certificateDtl.issuerSign = selectedUsr;
        			    	 		   			certDetails.certificateDtl.issuerSignDate = moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');

    					            		}


    					            	}

    					            });

    				    		});  



    						}
    						else if(res.length==0){
    							toaster.warning('Lead Auditor information not found');
    						}
    					});*/


    				 }
    			 });
    		 }
    		 
    		 function validateCertificate(){
    		
    			 if(certDetails.certificateDtl.generatedBy==1001){
    			 certDetails.certificateDtl.issuerSignDate=certDetails.certificateDtl.issuerSignDate?certDetails.certificateDtl.issuerSignDate:certDetails.certificateDtl.auditDate;
    			 }
                var flag=true;
    			 
    			 var title = false;
    			
    	    		if (certDetails.certificateDtl.title != '') {
    					if (certDetails.certificateDtl.title.indexOf('Special') >= 0) {
    						title = true;
    					} else if (certDetails.certificateDtl.title.indexOf('Deputy') >= 0) {
    						title = true;
    					}
    					else{
    						title = false;
    					}
    				}
    	    		console.log(certDetails.certificateDtl.completionDate)
    	    		if(certDetails.certificateDtl.completionDate){
	       			 	if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
		    	    		
		    	    		var isValid = moment(certDetails.certificateDtl.completionDate, 'DD-MMM-YYYY', true).isValid()
		    	    		console.log(isValid)
		    	    		
		    	    		if(certDetails.certificateDtl.completionDate=='N.A'){
		    	    			 flag=false;
			       				 toaster.warning('Please provide Date on which Certificate is based');
		    	    		}
		    	    		
		    	    		else if (!isValid) {
		       					flag=false;
		       					var data1='Please provide correct Date format for Date on which Certificate is based';
		       					completionDateValidation(data1);
		       					//toaster.warning('Please provide correct Date format for Date on which Certificate is based');
		                    }
	       			 	}
	       			 	if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
		    	    		
		    	    		var isValid = moment(certDetails.certificateDtl.completionDate, 'DD-MMM-YYYY', true).isValid()
		    	    		console.log(isValid)
		    	    		
		    	    		if(certDetails.certificateDtl.completionDate=='N.A'){
		    	    			 flag=false;
			       				 toaster.warning('Please provide Date on which Certificate is based');
		    	    		}
		    	    		
		    	    		else if (!isValid) {
		       					flag=false;
		       					var data1='Please provide correct Date format for Date on which Certificate is based';
		       					completionDateValidation(data1);
		       					//toaster.warning('Please provide correct Date format for Date on which Certificate is based');
		                    }
	       			 	}
       			 	}else if(certDetails.certificateDtl.completionDate==''){
	       			 	if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
	       			 		flag=false;
	       			 		toaster.warning('Please provide Date on which Certificate is based');
	       			 	}
	       			 	if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
	       			 		flag=false;
	       			 		toaster.warning('Please provide Date on which Certificate is based');
	       			 	}
       			 	}
    	    		if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
	    	    		if(certDetails.subInterimDate && certDetails.certificateDtl.consecutiveId==1001){
			    	    		var isValid = moment(certDetails.subInterimDate, 'DD-MMM-YYYY', true).isValid()
			    	    		console.log(isValid)
			    	    		
			    	    		if (!isValid && certDetails.subInterimDate!='N.A') {
			       					flag=false;
			       					//toaster.warning('Please provide correct Date format for Issuance of Initial Interim Date');
			       					var data1='Please provide correct Date format for Issuance of Initial Interim Date';
			       					completionDateValidation(data1);
			                    }else{
			                    	certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
			          				certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
			                    }
		       			 	}else if(certDetails.subInterimDate=='' && certDetails.certificateDtl.consecutiveId==1000){
		    	    			certDetails.subInterimDate='N.A';
		    	    			certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
		          				certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
		    	    		}else if(certDetails.subInterimDate=='' && certDetails.certificateDtl.consecutiveId==1001){
		    	    			flag=false;
		    	    			toaster.warning('Please provide Date for Issuance of Initial Interim Date');
		       					
		    	    		}
    	    		}
    	    		
    	    		if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    	    			if(certDetails.certificateDtl.dmlcIssueDate!=''){
    	    				var isValid = moment(certDetails.certificateDtl.dmlcIssueDate, 'DD-MMM-YYYY', true).isValid()
		    	    		console.log(isValid)
		    	    		
		    	    		if (!isValid && certDetails.certificateDtl.dmlcIssueDate!='N.A') {
		       					flag=false;
		       					//toaster.warning('Please provide correct Date format for DMLC II Issue Date');
		       					var data1='Please provide correct Date format for DMLC II Issue Date';
		       					completionDateValidation(data1);
		                    }
    	    			}else{
    	    				certDetails.certificateDtl.dmlcIssueDate = 'N.A'
    	    			}
    	    			if(certDetails.certificateDtl.dmlcIssuePlace=='')
    	    				certDetails.certificateDtl.dmlcIssuePlace='N.A'
    	    		}
    	    		if(!certDetails.certificateDtl.vesselImoNo){

    				 flag=false;
    				 toaster.warning('Please provide the vessel IMO no');

    			 }else if(!certDetails.certificateDtl.vesselName){

    				 flag=false;
    				 toaster.warning('Please provide the vessel name');

    			 }else if(certDetails.certificateDtl.grt == 0){

    				 flag=false;
    				 toaster.warning('Invalid GRT value');

    			 }else if(!certDetails.certificateDtl.grt){

    				 flag=false;
    				 toaster.warning('Please enter the GRT value');

    			 }else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2){

    				 flag=false;
    				 setEnableIssueType();
    				 var renewalTypeDesc = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID ? 'RENEWAL ENDORSED (ISM PART B 13:13)' : (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID ? 'RENEWAL ENDORSED (ISPS PART B 13:13)' : (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? 'RENEWAL ENDORSED (MLC APPENDIX A5–II)' : ''));	 
     				 toaster.warning('Please change the Certificate type Manager cant perform '+renewalTypeDesc);

    			 }else if(!certDetails.certificateDtl.dateOfRegistry){

    				 flag=false;
    				 toaster.warning('Please enter the date of registry');

    			 }else if(!certDetails.certificateDtl.docExpiry){

    				 flag=false
    				 toaster.warning("RMI DOC Expiry date is missing, Can't Generate Certificate!");

    			 }
    			 else if(!certDetails.certificateDtl.portOfRegistry){

    				 flag=false;
    				 toaster.warning('Please enter the port of registry');

    			 }else if(!certDetails.certificateDtl.auditDate){

    				 flag=false;
    				 toaster.warning('Please enter the Audit Date');

    			 }else if(!certDetails.certificateDtl.auditTypeId){

    				 flag=false;
    				 toaster.warning('Please select the Certificate Audit Type');

    			 }else if(!certDetails.certificateDtl.auditSubTypeId){

    				 flag=false;
    				 toaster.warning('Please select the Certificate Audit Subtype');

    			 }else if(!certDetails.certificateDtl.certIssueId){

    				 flag=false;
    				 toaster.warning('Please select the Certificate type');

    			 }else if(!certDetails.certificateDtl.endorsedDate && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED  || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2)){ 
    			 
    				 flag=false;
    				 toaster.warning('Please provide the Endorsed date');
    			 
    			 }else if(!certDetails.certificateDtl.extendedIssueDate && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION)){
    				 
    				 flag=false;
    				 toaster.warning('please provide the '+certDetails.onchangeReissueName);
    				 
    			 }else if(!certDetails.certificateDtl.extendedExpireDate && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION
    						|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2
    						|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1)){
    				 
    				 flag=false;
    				 toaster.warning('please provide the '+certDetails.onchangeReissueExpireName);
    				 
    			 }if(!certDetails.certificateDtl.extendedEndorsedDate && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION)){
				 
					 flag=false;
					 toaster.warning('Please Provide Extended Endorsed Date');
				 
    			 } else if(!certDetails.certificateDtl.certIssueDate){

    				 flag=false;
    				 toaster.warning('Please provide the Certificate Issue Date');

    			 }else if(!certDetails.certificateDtl.certExpireDate){

    				 flag=false;
    				 toaster.warning('Please provide the Certificate Expiry Date');

    			 }else if(!certDetails.certificateDtl.auditPlace){

    				 flag=false;
    				 toaster.warning('Please select the Issued Place');

    			 }else if(!certDetails.certificateDtl.issuerSign){

    				 flag=false;
    				 toaster.warning('Please attach signature');

    			 }else if(!certDetails.certificateDtl.issuerSignDate){

    				 flag=false;
    				 toaster.warning('Please provide signature date');

    			 }else if(!certDetails.certificateDtl.nameToPrint){

    				 flag=false;
    				 toaster.warning('Please select name to be printed or not');

    			 }else if(!certDetails.certificateDtl.signToPrint){

    				 flag=false;
    				 toaster.warning('Please select signature to be printed or not');

    			 }/*else if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){

    				 flag=false;
    				 toaster.warning('Please select Consective Subsequent');
                 }*/else if(1==2 && !certDetails.certificateDtl.extendedIssueDate){

    				 flag=false;
    				 toaster.warning('Please provide extended Issue Date');

    			 }else if(1==2 && !certDetails.certificateDtl.extendedExpireDate){

    				 flag=false;
    				 toaster.warning('Please provide extended expiry Date');

    			 }else if( 1==2 && !certDetails.certificateDtl.endorsedDate  && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED  || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2)){

    				 flag=false;
    				 toaster.warning('Please provide Endorsed Date');

    			 }else if((!(certDetails.renewalFulltermCertVal && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)) && certDetails.certificateDtl.publishStatus==1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT)){

    				 flag=false;
    				 toaster.warning('Please change certificate issue type');
    			 }else if(certDetails.nxtAuditInterOrAdd && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE && (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)){
    				 
    				 flag=false;
    				 toaster.warning('Please change certificate issue type');
    			 }
				 /**Added by sudharsan for JIRA IRI-5248  */
				 else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certReissueReason==1){
					 flag=false;
					 toaster.warning('Please Select Reissue Reason and Try')
				 }
				 /**End Here */
				 /*else if((moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_CERT) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION)){

    				 flag=false;
    				 toaster.warning('Audit date should not be greater then expiry date');
    				 
    			 }else if((moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.INTERIM_CERT && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.FULL_TERM_CERT)){
    				 
    				 flag=false;
    				 toaster.warning('Audit date should not be greater then expiry date');
    				 
    			 }*/else if(certDetails.certificateDtl.certIssueDate && certDetails.certificateDtl.certExpireDate && (moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_CERT) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION)){

    				 flag=false;
    				 toaster.warning('Issue date should not be greater then expiry date');
    				 
    			 }else if(certDetails.certificateDtl.extendedIssueDate && certDetails.certificateDtl.extendedExpireDate && (moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.INTERIM_CERT && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.FULL_TERM_CERT)){
    				 
    				 flag=false;
    				 toaster.warning('Issue date should not be greater then expiry date');
    				 
    			 }/*else if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) && ((moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) <= moment(certDetails.validateIssueDate,MMMDDYYYY).format(YYYYMMDD)) && certDetails.certificateDtl.publishStatus==1)){

    				 flag=false;    				
    				 toaster.warning('Please change '+certDetails.onchangeReissueName+' for generate/publish the certificate');
    			 }*/else if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED) && (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)){

    				 flag=false;    				
    				 toaster.warning('Please change certificate issue type');
    			 }else if(certDetails.checkCertDesc != '' && certDetails.checkCertDesc != certDetails.certificateDtl.certIssueId && certDetails.certificateDtl.publishStatus != 1 && !((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.publishStatus == undefined) && !(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2 && certDetails.certificateDtl.publishStatus== undefined)){
    				 
    				 if(certDetails.certificateDtl.getRenewalPublishCount == 1 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					 flag=false;
    					 toaster.warning('Please publish the '+ _(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.checkCertDesc}).pluck('issueReasonDesc').toString().toLowerCase()+' certificate before generate/publish the '+_(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.certificateDtl.certIssueId}).pluck('issueReasonDesc').toString().toLowerCase() +' certificate');  
    				 }else if(certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && !(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID))){
    					 if(!certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
	    					 flag=false;
	    					 toaster.warning('Please publish the '+ _(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.checkCertDesc}).pluck('issueReasonDesc').toString().toLowerCase()+' certificate before generate/publish the '+_(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.certificateDtl.certIssueId}).pluck('issueReasonDesc').toString().toLowerCase() +' certificate');
    					 }
    				 }
    			 //}else if(moment(certDetails.certificateDtl.extendedIssueDate ? certDetails.certificateDtl.extendedIssueDate : certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) < moment(certDetails.getCurrentClosingMeetingDate ? certDetails.getCurrentClosingMeetingDate : certDetails.certificateDtl.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)   && (certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ  && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo != undefined) && !(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)){
    			 }/*else if(moment(certDetails.certificateDtl.certIssueDate ?certDetails.certificateDtl.certIssueDate: certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) < moment(certDetails.getCurrentClosingMeetingDate ? certDetails.getCurrentClosingMeetingDate : certDetails.certificateDtl.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)   && (certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ  && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo != undefined) && !(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)){
    				 flag = false;
    				 toaster.warning('Issue Date should not be less then Closing Meeting Date');
    			 }else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
    				 
    				 flag = false;
    				 toaster.warning('Extension can not perform in endorsed audit');
    			 }*/
    			 
    			 else if(title == false){
    				 flag = false;
    				 toaster.warning("Can't generate certificate, because title is mismatching");
    			 }else if(certDetails.checkPublish && certDetails.checkPublish!=undefined && certDetails.checkPublish==true && certDetails.generOrPubStatus=='generate' && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    				 /*flag = false;
    				 toaster.warning('certificate already published please change the certificate issue type');*/
    				 if($state.params.certificate != 'managerSearch'){
						flag = false;
						if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN){					//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359
    					
        				 toaster.warning('certificate already published please change the certificate issue type');
     				 }
					}
    			 }/*else if(certDetails.certificateDtl.closeMeetingDate && moment(certDetails.certificateDtl.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD) < moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT || certDetails.certificateDtl.certIssueId ==1001) &&  (certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID &&   certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RENEWAL_ENDORSED2 &&  certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RENEWAL_ENDORSED1) && (certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ  && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ) && !(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) ){
                    toaster.warning('Issue Date is different from Closing Meeting Date now'); 
    				 
    			 }*/
//    			 
//    			 if((certDetails.certificateDtl.auditPlace != certDetails.auditDtlsissedPlace 
//    					 || (certDetails.auditDtlsGrt != certDetails.lstCertGrt && certDetails.auditDtlsGrt != certDetails.certificateDtl.grt) 
//    					 || (moment(certDetails.lstCertAuditDate,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) && moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD)) 
//    					 || (moment(certDetails.lstCertDor,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsdateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && moment(certDetails.certificateDtl.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsdateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID)) 
//    					 && certDetails.generOrPubStatus == 'generate' && !certDetails.checkFlagGenerateOrPublish && !certDetails.withOutAdt){
//    				
////    				 if(!certDetails.withOutAdt && certDetails.certificateDtl.auditPlace != certDetails.auditDtlsissedPlace && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION){
////    					// flag = false;
////    					 toaster.warning('Certificate issued place changed from '+certDetails.certificateDtl.auditPlace+' to '+certDetails.auditDtlsissedPlace);
////    					// certDetails.certificateDtl.auditPlace = certDetails.auditDtlsissedPlace;
////    					 
////    				 }else 
//    				 if(!certDetails.withOutAdt && certDetails.auditDtlsGrt != certDetails.lstCertGrt && certDetails.auditDtlsGrt != certDetails.certificateDtl.grt){
//
//        				 if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){
//        					 certDetails.certificateDtl.grt = certDetails.auditDtlsGrt;
//        				 }else{ 							
//        					 flag = false;
//        				 }
//        				 toaster.warning('Please change the GRT from '+certDetails.lstCertGrt+' to '+certDetails.auditDtlsGrt);
//        			 }else if(!certDetails.withOutAdt && moment(certDetails.lstCertDor,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsdateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && moment(certDetails.certificateDtl.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsdateOfRegistry,MMMDDYYYY).format(YYYYMMDD)  && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID){
//
//        				 if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
//        					 certDetails.certificateDtl.dateOfRegistry = certDetails.auditDtlsdateOfRegistry;    						 
//        				 }else{
//        					 flag = false;
//        				 }
//        				 toaster.warning('Please change the Date Of Registry from '+certDetails.lstCertDor+' to '+certDetails.auditDtlsdateOfRegistry);
//        			 }/*else if(moment(certDetails.lstCertAuditDate,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) && moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) != moment( certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD)){
//
//        				 if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){
//        					
//        					// certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate; 
//        					
//        					 certDetails.certificateDtl.issuerSignDate=certDetails.certificateDtl.auditDate;
//        				 }else{
//        					
//        					 flag = false;
//        				 }
//        				 if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
//        				 toaster.warning('Please change the Audit Date from '+certDetails.lstCertAuditDate+' to '+certDetails.auditDtlsAuditDate);}
//        			 } */
//    			 }
				
    			 
    			 if(!certDetails.certificateDtl.dateOfRegistry){
  	      		   
  	      		   $('#dateOfReg').addClass('err');
  	      	   }
    			 
    			 if(!certDetails.certificateDtl.grt){
    	      		   
    	      		   $('#grt').addClass('err');
    	      	   }
    			 
    			 if(!certDetails.certificateDtl.auditDate){
  	      		   
  	      		   $('#auditdate').addClass('err');
  	      	   }
    			 
    		  if(!certDetails.certificateDtl.certIssueDate){
  	      		   
  	      		   $('#issuedate').addClass('err');
  	      	   }
    			 
    			 if(!certDetails.certificateDtl.certExpireDate){
  	      		   
  	      		   $('#expirydate').addClass('err');
  	      	   }
    			 
    			 
    			 if(!certDetails.certificateDtl.nameToPrint){
  	      		   
  	      		   $('#printedName').addClass('err');
  	      	   }
    			 if(!certDetails.certificateDtl.signToPrint){
  	      		   
  	      		   $('#signPrint').addClass('err');
  	      	   }
    			 
    			 if(!certDetails.certificateDtl.issuerSign){
  	      		   
  	      		   $('#issuerSign').addClass('err');
  	      	   }
    			 
    			 if(!certDetails.certificateDtl.issuerSignDate){
  	      		   
  	      		   $('#signDate').addClass('err');
  	      	   }
    			 if(!certDetails.certificateDtl.endorsedDate){
    	      		   
    	      		   $('#endorseDate').addClass('err');
    	      	   }
    			 
    			 if(!certDetails.certificateDtl.extendedIssueDate){
    				 
    				  $('#exteIssueDate').addClass('err'); 
    			 }
    			 
    			 if(!certDetails.certificateDtl.extendedExpireDate){

   				  $('#exteExpiryDate').addClass('err');
    				 
    			 }
    			 if(certDetails.certificateDtl.certReissueReason==1){  //Added by sudharsan for JIRA IRI-5248 
					$('#certReissueReason').addClass('err');
				}
    		
    			 return flag;
    		 }//end of validateCertificate()
    		 
    		 
    		 function completionDateValidation(data){
    			 ModalService.showModal({
  	    			
  	    			templateUrl : 'src/modals/warning.html', 
  	    			
  	    			controller  : "warningControllerCompletion as warn",
  	    			
  	    			inputs		: {data:data},
  	    		
  	    		}).then(function(modal) {
  	    			
  	    			modal.element.modal();
  	    			
  	    			modal.close.then(function(result) {
  	    				if(result == 'YES'){
  	    					clickFlag = true;
  	    				}				
  	    			});
  	    			
  	    		}); 	
    		 }
    		 
    		   function createValidation(){
    			   
    			   if(certDetails.certificateDtl.endorsedDate){
    	      		   
    	      		   $('#endorseDate').removeClass('err');
    	      	   }
    			   
    			   if(certDetails.certificateDtl.dateOfRegistry){
      	      		   
      	      		   $('#dateOfReg').removeClass('err');
      	      	   }
        			 
        			 if(certDetails.certificateDtl.auditDate){
      	      		   
      	      		   $('#auditdate').removeClass('err');
      	      	   }
        			 
        		  if(certDetails.certificateDtl.certIssueDate){
      	      		   
      	      		   $('#issuedate').removeClass('err');
      	      	   }
        			 
        			 if(certDetails.certificateDtl.certExpireDate){
      	      		   
      	      		   $('#expirydate').removeClass('err');
      	      	   }
        			 
        			 
        			 if(certDetails.certificateDtl.nameToPrint){
      	      		   
      	      		   $('#printedName').removeClass('err');
      	      	   }
        			 if(certDetails.certificateDtl.signToPrint){
      	      		   
      	      		   $('#signPrint').removeClass('err');
      	      	   }
        			 
        			 if(certDetails.certificateDtl.issuerSign){
      	      		   
      	      		   $('#issuerSign').removeClass('err');
      	      	   }
        			 
        			 if(certDetails.certificateDtl.issuerSignDate){
      	      		   
      	      		   $('#signDate').removeClass('err');
      	      	   }
        			 
        			 
        			 if(certDetails.certificateDtl.extendedIssueDate){
        				 
       				  $('#exteIssueDate').removeClass('err'); 
       			 }
        			 
        			 if(certDetails.certificateDtl.extendedExpireDate){

          				  $('#exteExpiryDate').removeClass('err');
           				 
           			 }
        			 if(certDetails.certificateDtl.grt){

         				  $('#grt').removeClass('err');
          				 
          			 }
    			   
    		   }
    		 
    		 
    		 
    		 
    		 
    		 function validatePublish(){
    			
    			 if(certDetails.certificateDtl.auditSeqNo==certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ || certDetails.certificateDtl.auditSeqNo==certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || certDetails.certificateDtl.auditSeqNo==certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ){
					
					 certDetails.withOutAdt=true;
				 }
    		
    			 var flag=true;
    			 
    			 if(!(certDetails.certificateDtl.auditSeqNo && certDetails.certificateDtl.companyId && certDetails.certificateDtl.auditTypeId && 
    					 certDetails.certificateDtl.seqNo && certDetails.certificateDtl.certificateId && certDetails.certificateDtl.certificateNo && 
    					 certDetails.certificateDtl.utn)){

    				 flag = false;
    				 toaster.warning('Please generate certificate before publish');

    			 }else if(certDetails.certificateDtl.publishStatus==1 && certDetails.certificateDtl.activeStatus==1){
    				 
    				 flag = false;
    				 toaster.warning('Please generate certificate before publish');		 
    				 
    			 }else if(certDetails.certificateDtl.publishStatus==1){

    				 flag = false;
    				 toaster.warning('Certificate already published');

    			 }else if(certDetails.certificateDtl.activeStatus==0){

    				 flag = false;
    				 toaster.warning('Certificate is not active');
    			 }/*else if(moment(certDetails.certificateDtl.extendedIssueDate ? certDetails.certificateDtl.extendedIssueDate : certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) < moment(certDetails.getCurrentClosingMeetingDate ? certDetails.getCurrentClosingMeetingDate : certDetails.certificateDtl.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)  && (certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ  && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ )){
    				 
    				 flag = false;
    				 toaster.warning('Please generate the certificate once again because Issue Date is different from Closing Meeting Date');
    			 }else if((moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) > (certDetails.certificateDtl.extendedExpireDate ? moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD) : moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD))) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION)){
    				 	 
    				 flag=false;
    				 toaster.warning('Audit date should not be greater then expiry date');
    				 
    			 }else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
    				 
    				 flag = false;
    				 toaster.warning('Extension can not perform in endorsed audit');
    			}*/
    			 /*else if(((!certDetails.withOutAdt && certDetails.certificateDtl.auditPlace != certDetails.auditDtlsissedPlace && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE) || certDetails.certificateDtl.grt != certDetails.auditDtlsGrt || (moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD)) || (moment(certDetails.certificateDtl.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsdateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID )) && certDetails.generOrPubStatus == 'publish'){

    				 var tosterMsg = '';

    				  if(!certDetails.withOutAdt && certDetails.certificateDtl.auditPlace != certDetails.auditDtlsissedPlace && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE){
    					
    					//  flag = false;
    					 tosterMsg = 'issued place changed from '+certDetails.certificateDtl.auditPlace+' to '+certDetails.auditDtlsissedPlace;
    					// toaster.warning('Please generate the Certificate because ' + tosterMsg);
    				 }else if(!certDetails.withOutAdt && certDetails.certificateDtl.grt != certDetails.auditDtlsGrt){
    					 flag = false;
    					 tosterMsg = 'grt as changed';
    					 toaster.warning('Please generate the Certificate because ' + tosterMsg);
    				 }else if(!certDetails.withOutAdt && moment(certDetails.certificateDtl.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsdateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ){
    					 flag = false;
    					 tosterMsg = 'Date of Registry changed from '+certDetails.certificateDtl.dateOfRegistry+' to '+certDetails.auditDtlsdateOfRegistry;
    					 toaster.warning('Please generate the Certificate because ' + tosterMsg);
    				 }else if(moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) != moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD)){
    					 
    					 tosterMsg = 'Audit Date changed from '+certDetails.certificateDtl.auditDate+' to '+certDetails.auditDtlsAuditDate;
    				 }
    				
    				
    			 }*/else if(!certDetails.withOutAdt && certDetails.orgCertGrt != null && certDetails.orgCertGrt != certDetails.certificateDtl.grt && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because grt has been changed');

    		  }
    			 else if(!certDetails.withOutAdt && certDetails.orgVesselCompanyAddress != null && certDetails.orgVesselCompanyAddress != certDetails.certificateDtl.vesselCompanyAddress){

       			  flag = false;
       			  toaster.warning('Please generate the certificate because CompanyAddress has been changed');

       		  }
    			 else if(!certDetails.withOutAdt && certDetails.orgVesselCompanyName != null && certDetails.orgVesselCompanyName != certDetails.certificateDtl.vesselCompanyName){

          			  flag = false;
          			  toaster.warning('Please generate the certificate because Company Name has been changed');

          		  }
    		 else if(!certDetails.withOutAdt && certDetails.orgDocExpiry != null && new Date (moment(certDetails.orgDocExpiry, MMMDDYYYY,true).isValid() ? certDetails.orgDocExpiry : moment(certDetails.orgDocExpiry,YYYYMMDD).format(MMMDDYYYY)).getTime()  != new Date(moment(certDetails.certificateDtl.docExpiry, MMMDDYYYY ,true).isValid() ? certDetails.certificateDtl.docExpiry : moment(certDetails.certificateDtl.docExpiry,YYYYMMDD).format(MMMDDYYYY)).getTime() ){
    			console.log( new Date (moment(certDetails.orgDocExpiry, MMMDDYYYY,true).isValid() ? certDetails.orgDocExpiry : moment(certDetails.orgDocExpiry,YYYYMMDD).format(MMMDDYYYY))); console.log( new Date(moment(certDetails.certificateDtl.docExpiry, MMMDDYYYY ,true).isValid() ? certDetails.certificateDtl.docExpiry : moment(certDetails.certificateDtl.docExpiry,YYYYMMDD).format(MMMDDYYYY)));
          			  flag = false;
          			  toaster.warning('Please generate the certificate because Doc Expiry date has been changed');

              }
    	     else if(!certDetails.withOutAdt && certDetails.orgDocIssuer != null && certDetails.orgDocIssuer != certDetails.certificateDtl.docIssuer){

         			  flag = false;
         			  toaster.warning('Please generate the certificate because Doc Issuer has been changed');

         	}
    	     else if(!certDetails.withOutAdt && certDetails.orgVesselName != null && certDetails.orgVesselName != certDetails.certificateDtl.vesselName){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Vessel Name has been changed');

    	     }
    	     else if(!certDetails.withOutAdt && certDetails.orgPor != null && certDetails.orgPor != certDetails.certificateDtl.portOfRegistry){

   			  flag = false;
   			  toaster.warning('Please generate the certificate because Port Of Registry has been changed');

   	     }
    			 
    	     else if(!certDetails.withOutAdt && certDetails.orgVesselType != null && certDetails.orgVesselType != certDetails.certificateDtl.vesselType){

   			  flag = false;
   			  toaster.warning('Please generate the certificate because Vessel Type has been changed');

    	     }else if(!certDetails.withOutAdt && certDetails.orgCompanyImoNo != null && certDetails.orgCompanyImoNo != certDetails.certificateDtl.companyImoNo){

      			  flag = false;
      			  toaster.warning('Please generate the certificate because Company IMO no has been changed');

       	     }
 
    	     else if(!certDetails.withOutAdt && certDetails.orgCertDor != null && certDetails.orgCertDor != moment(certDetails.certificateDtl.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Date of Registry has been changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgAuditDate != null && certDetails.orgAuditDate != moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Audit Date has been  changed');

    		  }else if(! !certDetails.withOutAdt && certDetails.orgCertIssueDate != null && certDetails.orgCertIssueDate != moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_CERT)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Issue Date has been  changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertExpiryDate != null && certDetails.orgCertExpiryDate != moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_CERT)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Expiry Date has been  changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertEndrosedDate != null && certDetails.orgCertEndrosedDate != moment(certDetails.certificateDtl.endorsedDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.INTERIM_CERT && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Endorsed Date has been  changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertExtIssueDate != null && certDetails.orgCertExtIssueDate != moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because '+certDetails.onchangeReissueName+' has been  changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertExtExpiryDate != null && certDetails.orgCertExtExpiryDate != moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2 || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because '+certDetails.onchangeReissueExpireName+' has been  changed');

    		  }else if( !certDetails.withOutAdt && certDetails.orgNameToPrint != null && certDetails.orgNameToPrint != certDetails.certificateDtl.nameToPrint){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Name to be Printed has been  changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgSignToPrint != null && certDetails.orgSignToPrint != certDetails.certificateDtl.signToPrint){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Sign to be Printed has changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgSignatureDate != null && certDetails.orgSignatureDate != moment(certDetails.certificateDtl.issuerSignDate,MMMDDYYYY).format(YYYYMMDD)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Signature Date has changed');

    		  }else if(!certDetails.withOutAdt &&  certDetails.orgCertExtEndrosedDate != null && certDetails.orgCertExtEndrosedDate != moment(certDetails.certificateDtl.extendedEndorsedDate,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Extended Endorsed Date has changed');
    		  
    		  }
    		  if(!certDetails.withOutAdt && certDetails.orgCertAuditPlace != null && decodeURIComponent(atob(certDetails.orgCertAuditPlace)) != certDetails.certificateDtl.auditPlace){
        			 
       			  flag = false;
       			  toaster.warning('Please generate the certificate because Audit Place has been  changed');

    			}

    			 return flag;
    		 }
    		 
    		 function validateAndPublishCert(){
    			 
    			 certDetails.generOrPubStatus = 'publish';
    			 
    			 certDetails.extManager = false;

    			 if(certDetails.validateCertificate()){

    				 if(certDetails.validatePublish()){

    					 certDetails.checkPublishPopup();
    				 }
    			 }
    		 }//end of validateAndPublishCert()
    		 
    		 function back(){


    			 if(certDetails.certificateBackOption == 'Audit'){


    				 $state.go('app.audit.details',{},{ reload: true });
    			 }else if(certDetails.certificateBackOption == 'Search'){


    				 $state.go('app.certificate.search',{'currPageNo':sessionStorage.getItem('certCurrPageNo'),'certificateSeachType':'Search'},{ reload: true });
    			 }else if(certDetails.certificateBackOption == 'dashBoard'){

    				 $state.go('app.dashboard',{},{ reload: true });
    			 }else {
    				 $state.go('app.certificate.search',{},{ reload: true });
    			 }

    		 }
    	        
    		 function stringToDate(obj){

    			 obj.auditDate = obj.auditDate?moment(obj.auditDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.certIssueDate = obj.certIssueDate?moment(obj.certIssueDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.certExpireDate = obj.certExpireDate?moment(obj.certExpireDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.extendedIssueDate = obj.extendedIssueDate?moment(obj.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.extendedExpireDate = obj.extendedExpireDate?moment(obj.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.endorsedDate = obj.endorsedDate?moment(obj.endorsedDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.issuerSignDate = obj.issuerSignDate?moment(obj.issuerSignDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.dateOfRegistry = obj.dateOfRegistry?moment(obj.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.docExpiry = obj.docExpiry?moment(obj.docExpiry,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.docExpiry = obj.docExpiry && moment(obj.docExpiry, MMMDDYYYY ,true).isValid()?moment(obj.docExpiry,MMMDDYYYY).format(YYYYMMDD):(obj.docExpiry ? obj.docExpiry :'');
    			 obj.extendedEndorsedDate = obj.extendedEndorsedDate?moment(obj.extendedEndorsedDate,MMMDDYYYY).format(YYYYMMDD) : '';

    		 }
    		 
    		 function checkPublishPopup(){ 

    			 ModalService.showModal({

    				 templateUrl : 'src/modals/warning.html',

    				 controller  : 'warningController as warn',

    				 inputs		: {data:'This Certificate is the finalized one, post to which (if any changes) Certificate need to be re-issued. Do you want to continue ?'},

    			 }).then(function(modal) {

    				 modal.element.modal();

    				 modal.close.then(function(result) {

    					 if(result=='YES'){

    						 var certificateData = certDetails.setCertDetails();
    						
    						 certificateData.publishStatus = 1;
    						 certDetails.preventOnChange = true;
    							certDetails.checkPublish=true;
    							console.log(certificateData)
    							certificateFactory.generateCertificate(certificateData,1,1).$promise.then(function(resCert){

    							 setCertDataAfterGenerate(resCert,'publish');

    						 });

    					 }
    				 });

    			 });   		

    		 }
    		 
    		 function checkConsective(){

    			 /*if(certDetails.certificateDtl.consecutiveId==1001 && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    				 certificateFactory.getPreviousIssueDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.companyId).$promise.then(function(res){

    					 if(!res.previousIssueDate && certDetails.userRoleId!=1003){
    						 toaster.info('Previously published interim certificate does not exist');
    						 certDetails.certificateDtl.consecutiveId = 1000;
    					 }
    				 });

    			 } */
    			 console.log(certDetails.subPrevInterimDate)
    			if(certDetails.certificateDtl.consecutiveId==1001 && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
					if(certDetails.subPrevInterimDate=='N.A'){
						certDetails.subInterimDate = certDetails.certificateDtl.certIssueDate;
						certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
						
					}
					else{
						certDetails.subInterimDate = certDetails.subPrevInterimDate ? certDetails.subPrevInterimDate : certDetails.certificateDtl.certIssueDate;
						certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
						
					}
					certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    			}
    			if(certDetails.certificateDtl.consecutiveId==1000 && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
					certDetails.subInterimDate = 'N.A';
					certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
					certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    			}
    			 
    		 }
    		 
    		 /*function updateVesselDetails(){ 
    				
    			 ModalService.showModal({

    				 templateUrl : 'src/modals/warning.html',

    				 controller  : 'warningController as warn',

    				 inputs		: {data:certDetails.dynamicMsg},	

    			 }).then(function(modal) {
    		    		
    		    		modal.element.modal();
    		    			
    		    		modal.close.then(function(result) { 
    		    				
    		    			if(result == 'YES'){
    		    				
    		    				 console.log(certDetails.latestVesselDetail)
    		 	    			
    				   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].companyAddress;
    				  				
    				   	       		certDetails.certificateDtl.docExpiry = moment(certDetails.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY');
    				  				
    			    	   	    	certDetails.certificateDtl.docIssuer = certDetails.latestVesselDetail[0].docIssuer;
    			    	  			
    			    	   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
    			    	  				
    				   	       		certDetails.certificateDtl.dateOfRegistry = moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
    				   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
    				   	       		
    				   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
    				  				
    				   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
    		    						
    		    		    	   		    						
    		    						
    		    			}
    		    		});
    		    	});
    			}*/
    		 
    		 function setExpireDate(){
    			console.log(certDetails.certificateDtl);
    			console.log(certDetails.orgCertificateDtl);
    			 var expiryDate = '';
    			var validatIssueDate='';
    			 var validatExpireDate='';
    			 var issueDate='';
    			 if(certDetails.certificateDtl.certIssueDate){

    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    					
    					 issueDate= moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
    					
    					 expiryDate = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
    					
    					 if(certDetails.withOutAdt){
    						 certDetails.certificateDtl.certExpireDate=moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
    					 }
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID ) {

    					 expiryDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					
    					 issueDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					
    					 if(certDetails.withOutAdt){
    						 certDetails.certificateDtl.certExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    	 	     				}
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					 var days = moment(certDetails.certificateDtl.certIssueDate).diff(certDetails.orgCertificateDtl.certIssueDate,'days', true);
    					
    					 expiryDate=moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).add(days,'days').format(MMMDDYYYY);
    					 
    					 issueDate=moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(MMMDDYYYY);
    					 
    					 if(certDetails.withOutAdt){
    						 certDetails.certificateDtl.certExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    	 	     				}
    				 }

    				 validatExpireDate = expiryDate ? expiryDate : certDetails.certificateDtl.certExpireDate;
    				 validatIssueDate  =  issueDate?issueDate:certDetails.certificateDtl.certIssueDate;
    				 certDetails.minCertIssueDate      =moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).format(YYYYMMDD);
    				 certDetails.maxCertIssueDate      = moment(validatIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				 certDetails.minCertExpireDate     = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				 certDetails.maxCertExpireDate     = moment(validatExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				 if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID ){
      					certDetails.maxCertExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
      					
      				 }
    				
    			 }
    		 }
    		 
    		 function setIssueDate() {

    			var issueDate='';
    			var validatIssueDate='';
    			 
	 			if(certDetails.certificateDtl.certExpireDate){

	 				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
						
	 					issueDate= moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).subtract(1,'days').format(MMMDDYYYY);
	 					
						if(certDetails.withOutAdt){
							certDetails.certificateDtl.certExpireDate=moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
						}
					}
	 				
	 				validatIssueDate = issueDate ? issueDate : certDetails.certificateDtl.certExpireDate;
	 				certDetails.minCertIssueDate = moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).format(YYYYMMDD);
					certDetails.maxCertIssueDate = moment(validatIssueDate, MMMDDYYYY).format(YYYYMMDD);
	 			}
    		 }
    		 function differenceBetweenDate(maxDate,minDate){
    			 var date1 = new Date(maxDate); 
    			 var date2 = new Date(minDate); 
    			   
    			 // To calculate the time difference of two dates 
    			 var Difference_In_Time = date1.getTime() - date2.getTime(); 
    			   
    			 // To calculate the no. of days between two dates 
    			 var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    			 return Difference_In_Days;
    		 }
    		 
    		 function setExtendedExpireDate(caller){

   				 
    				 console.log(certDetails.arrOfDate);
    			 var expiryDate = '';
    			 var validatExpireDate = '';
    			 var validatIssueDate='';
    			 var issueDate='';
    			 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){

    				 if(certDetails.certificateDtl.extendedIssueDate){
    				
    					 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    						 if(caller =='onChange'){
    							 
        							 var diffDays = differenceBetweenDate(certDetails.certificateDtl.extendedIssueDate , certDetails.minExtnCertIssueDate);
        							 
        							 issueDate= moment(moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
        							 expiryDate =  moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(diffDays,'days'),DDMMYYYY).format(MMMDDYYYY);
        						 
	    						 }
    						 else{
	    						 if( certDetails.certificateDtl.publishStatus ==0 ){
	    							 issueDate= moment(moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
	    							 expiryDate = certDetails.orgCertificateDtl.certificateDetail ? (certDetails.orgCertificateDtl.certificateDetail[1].extendedExpireDate ? certDetails.orgCertificateDtl.certificateDetail[1].extendedExpireDate :certDetails.orgCertificateDtl.certificateDetail[1].certExpireDate) :( certDetails.orgCertificateDtl.extendedExpireDate? certDetails.orgCertificateDtl.extendedExpireDate :certDetails.orgCertificateDtl.certExpireDate);
	    						 	}
	    						 else{
		    						 issueDate= moment(moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
		    						 expiryDate = certDetails.certificateDtl.extendedExpireDate;
	    						 	}
    						 	}
    						 certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD);
    					 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){ 
    						
    						 issueDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 
    						 expiryDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 
    						
    						 certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD);
    					 
    					 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    						
    						 var days = moment(certDetails.certificateDtl.extendedIssueDate).diff(certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate!=''?certDetails.orgCertificateDtl.extendedIssueDate :certDetails.orgCertificateDtl.creditDate,'days', true);
    	    				
    						 issueDate=moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(MMMDDYYYY);
    						
    						 expiryDate=moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).add(days,'days').format(MMMDDYYYY);
        					 
        					 certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD);
    				
    					 }else if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    						 
//    						 if(caller =='onChange'){
//    							 
//    							 issueDate= allCertificates[0].extendedIssueDate ? dateFormater(allCertificates[0].extendedIssueDate,'DD-MMM-YYYY') : dateFormater(allCertificates[0].certIssueDate,'DD-MMM-YYYY');
//        						 
//        						 expiryDate=allCertificates[0].extendedExpireDate ? dateFormater(allCertificates[0].extendedExpireDate,'DD-MMM-YYYY') : dateFormater(allCertificates[0].certExpireDate,'DD-MMM-YYYY');
//        						
//        						 certDetails.minExtnCertIssueDate=moment(issueDate,MMMDDYYYY).format(YYYYMMDD);
//    						 }
    						 	
    							 
    							 issueDate= certDetails.arrOfDate && certDetails.arrOfDate.length > 0 && certDetails.arrOfDate[0].creditDate ? dateFormater(certDetails.arrOfDate[0].creditDate,'DD-MMM-YYYY') : '';
        						 
        						 expiryDate= certDetails.arrOfDate && certDetails.arrOfDate.length > 0 && certDetails.arrOfDate[0].nextRenewal ? dateFormater(certDetails.arrOfDate[0].nextRenewal,'DD-MMM-YYYY') : '';
        						
        						 certDetails.minExtnCertIssueDate=moment(issueDate,MMMDDYYYY).format(YYYYMMDD);
    						 	
    					/*	 else{
    						 issueDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 
    						 expiryDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						
    						 certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD);
    						 }*/
    					 }

                         validatIssueDate=issueDate?issueDate:certDetails.certificateDtl.extendedIssueDate;
    					
    					
    					
    					
    					 validatExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    					 
    					 certDetails.maxExtnCertIssueDate= dateFormater(validatExpireDate, 'DD-MMM-YYYY');
//    					 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
//    						 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
//        					 
//        					 certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(YYYYMMDD);
//    					 }
    					 
    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
    					 
    					 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    						 certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(6,'months').subtract(1,'days'),DDMMYYYY).format(YYYYMMDD);
    						 certDetails.maxExtnCertIssueDate= moment(moment(dateFormater(certDetails.certificateDtl.extendedExpireDate, 'YYYY-MM-DD')).subtract(1,'days'),DDMMYYYY).format(YYYYMMDD) //dateFormater(certDetails.certificateDtl.extendedExpireDate, 'DD-MMM-YYYY');
    					 }else{
    					 certDetails.maxExtnCertExpireDate =validatExpireDate;
    					 }
    					 
    					
    					 if(certDetails.certificateDtl.publishStatus==0 && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID ) ){
 	     					certDetails.maxExtnCertExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
 	     					
 	     				}

    				 }
    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION){
    				 
    				 certDetails.minExtnCertExpireDate = moment(moment( certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
    				
    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    				
    					 certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    				
    					 certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);

    				 }
    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){
    				 
    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMMDD);  //Modified by sudharsan for Jira-ID = IRI-5669
						 //console.log('-----------------------------',moment(expiryDate));
    					 certDetails.certificateDtl.certExpireDate=expiryDate;
    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    				 
    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
    				 
    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					 certDetails.certificateDtl.certExpireDate=expiryDate;
    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    				 
    			 }
    			
    		 }
    		 
    		 function onChangeSubType(){

    			 certDetails.setExpireDate();

    			 certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ? 
    					 certDetails.AppConstant.INTERIM_CERT : 
    						 (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || 
    								 certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) ? 
    										 certDetails.AppConstant.FULL_TERM_CERT : certDetails.certificateDtl.certIssueId;

    		 }
    		 
    		
    		 function onChangeIssueExpiryDate(){
    			 
    			
    			if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT){
    				 
    				if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
    					toaster.info('Validity of the certificate is more than 5 Years');
       			 }else if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
       				toaster.info('Validity of the certificate is less than 5 Years');
       			 }	
       			else if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD) == moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
       				toaster.info('Validity of the certificate is equal to 5 Years');
       			 }	
    				
    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT){
    				 
    				if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
    					toaster.info('Validity of the certificate is more than 6 Months');
       			 }else if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
       				toaster.info('Validity of the certificate is less than 6 Months');
       			 }	
    				
    			
    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
    				
    				if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
    					toaster.info('Validity of the certificate is more than 5 Years');
       			 }else if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
       				toaster.info('Validity of the certificate is less than 5 Years');
       			 }	
    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
    				
    				if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
    					toaster.info('Validity of the certificate is more than 6 Months');
       			 }else if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
       				toaster.info('Validity of the certificate is less than 6 Months');
       			 }	
    			}
    			else if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_ENDORSED) && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
    				
    				if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD) == moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
    					toaster.info('Validity of the certificate is exactky 5 Years');
       			 }	
    			}
    					
    			     	}
    		 
    		 function getAuditCertDetails(){
    			 
    	
    			 certificateFactory.getAuditCertDetails(certDetails.auditSeqNo, certDetails.companyId).$promise.then(function(res){

    				 certDetails.disableVsl = true;
    				 certDetails.withAdt    = true;
    				 certDetails.Stateflag = true;

    				 var auditAndCertData = angular.copy(res);
    				 console.log(auditAndCertData);
    				 certDetails.certificateDtl = angular.copy(res).auditDetail;
    				 
    				 detailsFactory.getPreviousAuditDetail(auditAndCertData.auditDetail.auditTypeId,auditAndCertData.auditDetail.vesselImoNo,auditAndCertData.auditDetail.companyId).$promise.then(function(res){
    					 console.log(res)
    					 certDetails.prevAuditDetls = angular.copy(res);
						  //Added by sudharsan for Jira-ID = 5517 start here		 
						res.prevAuditDtl.forEach(function (audits){
							if(certDetails.auditSeqNo === audits.auditSeqNo){  //Added by sudharsan for Jira-Id = IRI=5631
							if(certDetails.certificateDtl.auditTypeId == audits.auditTypeId && certDetails.certificateDtl.auditSubTypeId == audits.auditSubTypeId && certDetails.certificateDtl.publishStatus == certDetails.AppConstant.ACCEPT ){
								certDetails.isSignAttached=audits.isSignAttached?true:false;  //Added by sudharsan for Jira-Id = IRI=5631

								 //commented by sudharsan for Jira-Id = IRI=5631
								// if(audits.isSignAttached){
								// 	certDetails.isSignAttached = true;	
								// }
								// else{
								// 	certDetails.isSignAttached = false;	
								// }
							}
						}
						});
					  //Added by sudharsan for Jira-ID = 5517 end here
						 certDetails.prevAudFindingCarUpdate = certDetails.prevAuditDetls ?(certDetails.prevAuditDetls.carFindMaxStatusDate? true: false): false;		//added by @Ramya on 4-7-2022 for jira id - IRI-5361
                         var originalCompDate = certDetails.certificateDtl.completionDate;
        				 if((certDetails.certificateDtl.auditTypeId==1001 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || (certDetails.certificateDtl.auditTypeId==1002 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || (certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID)){
        				 certificateFactory.getAuditCertDetails(certDetails.certificateDtl.auditSeqNo, certDetails.certificateDtl.companyId).$promise.then(function(comp){
     						console.log(comp)	
     						var compformatting=comp.auditDetail.certificateDetail;
     						console.log(compformatting)
     						var completionDateHighest='',dmlcDateHighest='',dmlcLocHighest='';
     						if(compformatting.length==0){
     						if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    								detailsFactory.getDMLCLocationDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditSeqNo,'dmlc').$promise.then(function(resDMLC){
    	    							if(resDMLC.placeLocation[0]){
    	    	        					var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
    	    	        					if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE!='N.A' && resDMLC.placeLocation[0].CLOSE_MEETING_DATE!=''){
    	    	        						
    	    	        						if(checkDateFormat(resDMLC.placeLocation[0].CLOSE_MEETING_DATE)){
    	    	        							var dateCloseFormat=moment(resDMLC.placeLocation[0].CLOSE_MEETING_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
    	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    	    	        						}else{
    	    	        							var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
    	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    	    	        						}
    	    	        						
    	    	        						
	     					        			/*var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE)).format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
	     								 	}else if(resDMLC.placeLocation[0].CLOSE_MEETING_DATE=='N.A' || resDMLC.placeLocation[0].CLOSE_MEETING_DATE==''){
	     								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
	     								 	}
	    	    	        				if(resDMLC.placeLocation[0].AUDIT_PLACE!='N.A' && resDMLC.placeLocation[0].AUDIT_PLACE!='' && resDMLC.placeLocation[0].AUDIT_PLACE!=null){//Added by sudharan for Jira-Id = IRI-5530
	     					        			
	     					        			certDetails.certificateDtl.dmlcIssuePlace = decodeURIComponent(atob(resDMLC.placeLocation[0].AUDIT_PLACE)) ;
	     								 	}else if(resDMLC.placeLocation[0].AUDIT_PLACE=='N.A' || resDMLC.placeLocation[0].AUDIT_PLACE=='' || resDMLC.placeLocation[0].AUDIT_PLACE==null){
	     								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
	     								 	}
	    	    							}else{
    	    								certDetails.certificateDtl.dmlcIssueDate = 'N.A';
    	    								certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
    	    							}
    	    							certDetails.prevDmlcIssueDate = certDetails.certificateDtl.dmlcIssueDate;
    	    							certDetails.prevDmlcIssuePlace = certDetails.certificateDtl.dmlcIssuePlace;
    	    						});
    							}
     						}
         						if(compformatting.length!=0 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
         							
     								var certcomplorder=0;
     								compformatting.forEach(function(a){
     									if(a.certOderNo>certcomplorder && (a.certIssueId==1002 || a.certIssueId==1008)){//reissue 
     										certcomplorder=a.certOrderNo;
     										completionDateHighest=a.completionDate;
     										dmlcDateHighest=a.dmlcIssueDate;
     										dmlcLocHighest=a.dmlcIssuePlace;
     									}
     								});
     								console.log(completionDateHighest)
     								if(certDetails.certificateDtl.auditTypeId==1003){

    								 	if(dmlcDateHighest!='N.A' && dmlcDateHighest!=''){
    								 		
    								 		/*if(checkDateFormat(resDMLC.placeLocation[0].CLOSE_MEETING_DATE)){
    								 			
    								 			if(checkDateFormat(dmlcDateHighest)){
    	    	        							var dateCloseFormat=moment(dmlcDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
    	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    	    	        						}else{
    	    	        							var dateCloseFormat=moment(new Date(dmlcDateHighest),'MMMDDYYYY').format('DD-MMM-YYYY');
    	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    	    	        						}
    								 			
	    	        							var dateCloseFormat=moment(resDMLC.placeLocation[0].CLOSE_MEETING_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	    	        						}else{
	    	        							var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].CLOSE_MEETING_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	    	        						}
    					        			var dateCloseFormat=moment(new Date(dmlcDateHighest)).format('DD-MMM-YYYY');
    					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
    								 		
    								 		if(checkDateFormat(dmlcDateHighest)){
	    	        							var dateCloseFormat=moment(dmlcDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	    	        						}else{
	    	        							var dateCloseFormat=moment(new Date(dmlcDateHighest),'MMMDDYYYY').format('DD-MMM-YYYY');
	     					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
	    	        						}
    								 	}else if(dmlcDateHighest=='N.A' || dmlcDateHighest==''){
    								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
    								 	}
    								 	
    								 	if(dmlcLocHighest!='N.A' && dmlcLocHighest!=''){
    					        			certDetails.certificateDtl.dmlcIssuePlace = decodeURIComponent(atob(dmlcLocHighest));
    								 	}else if(dmlcLocHighest=='N.A' || dmlcLocHighest==''){
    								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
    								 	}
     								}
     								 	if(completionDateHighest!='N.A' && completionDateHighest!=''){
     								 		
     								 		var dateCloseFormat=moment(completionDateHighest,'DD-MMM-YYYY').format('DD-MMM-YYYY');
     					        			certDetails.certificateDtl.completionDate = dateCloseFormat;
     					        			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
     								 		
     					        			/*var dateCloseFormat=moment(new Date(completionDateHighest)).format('DD-MMM-YYYY');
     					        			certDetails.certificateDtl.completionDate = dateCloseFormat;
     					        			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;*/
     								 	}else if(completionDateHighest=='N.A'){
     								 		certDetails.certificateDtl.completionDate = completionDateHighest;
     								 		certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
     								 	}
     								 	else{
     								 		certDetails.certificateDtl.completionDate = moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
     								 		certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
     								 	}
    				 				}
     								else{
     									certDetails.certificateDtl.completionDate=moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
     									certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
     								}
    	     						if(res.initalCount==0 && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    	 								detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',certDetails.certificateDtl.auditSeqNo).$promise.then(function(completion){
    	 									if(completion.completionDate[0]){
    			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
    			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
    		 								 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
    		 								 		}else if(completion.completionDate[0].COMPLETION_DATE==''){
    		 								 			certDetails.certificateDtl.completionDate = 'N.A';
    		 								 			}else{
    		 								 				
    		 								 				if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
    		 								 					certDetails.certificateDtl.completionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
    		 		    	        						}else{
    		 		    	        							certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
    		 		    	        						}
    		 								 				
    		 								 				//certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY');
    		 								 			}
    			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    	 									}
    			 		            		});
    	 							}
         							var countPreVoid=0,firstInter=false;
         							var actualAuditLength=res.prevAuditDtl.length-1;
         							res.prevAuditDtl.forEach(function(a){
    	 									if(a.auditStatusId==certDetails.AppConstant.VOID_AUDIT_STATUS){
    	 										countPreVoid++;
    	 									}
    	 								});
         							var firstInterArray = res.prevAuditDtl[res.prevAuditDtl.length-1];
         							firstInterArray.certificateDetail.forEach(function(a){
    										if(a.certOderNo == certDetails.certificateDtl.certOderNo)
    											firstInter=true;
    									});
         							if(res.initalCount==0 && res.prevAuditDtl.length>=2){
         								var audSQNO=0;
    			 		            		res.prevAuditDtl.forEach(function(a){
    		 									if(a.auditSeqNo>audSQNO && (a.certIssueId==1002 || a.certIssueId==1008)){//reissue 
    		 										audSQNO=a.auditSeqNo;
    		 									}
    		 								});
    			 		            		console.log(audSQNO)
    			 		            		if(audSQNO==0){
    			 		            			audSQNO=res.prevAuditDtl[1].auditSeqNo;
    			 		            			res.prevAuditDtl.forEach(function(a){
    			 		            				audSQNO=a.auditSeqNo;
    	 		 									if(a.auditSeqNo<audSQNO && (a.certIssueId==1004 || a.certIssueId==1005)){//add or inter 
    	 		 										audSQNO=a.auditSeqNo;
    	 		 									}
    	 		 								});
    			 		            		}
    			 		            		detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',audSQNO).$promise.then(function(completion){
    			 		            			if(completion.completionDate[0]){
    			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
    			 		            			
     			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
     		 								 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
     		 								 		
     		 								 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
     		 								 		certDetails.certificateDtl.completionDate = 'N.A';
     		 								 		
     		 								 	}
     		 								 	else{
     		 								 		if(firstInter){
     				 		            				certDetails.directIntermediate="directIntermediate";
     					 		            			certDetails.directIntermAdd="directIntermAdd";
     					 		            			certDetails.certificateDtl.completionDate = originalCompDate;
     				 		            			}else{
     				 		            				
     				 		            				if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
     				 		            					certDetails.certificateDtl.completionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
    	 		    	        						}else{
    	 		    	        							certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
    	 		    	        						}
     				 		            				
     				 		            				//certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY');
     				 		            			}
     		 								 	}
    			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    			 		            			}
    			 		            		});
    			 		            	}
         							console.log(res)
     								 if(res.prevAuditDtl.length==0 || res.prevAuditDtl.length==1 && res.initalCount!=1 || actualAuditLength == countPreVoid){
     			 		    				certDetails.enableCompletionDate=false;
     			 		            		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005)){
     			 		            			
     			 		            			certDetails.directIntermediate="directIntermediate";
     			 		            			certDetails.directIntermAdd="directIntermAdd";
     			 		            			if(comp.auditDetail.certificateDetail.length==0)
     			 		            				certDetails.certificateDtl.completionDate='N.A';
     			 		            			else
     			 		            				certDetails.certificateDtl.completionDate=moment(comp.auditDetail.certificateDetail[0].completionDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
     			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
     			 		            		}
     			 		            		
     			 		            	}else if(res.prevAuditDtl.length>1 && res.initalCount==0){
     			 		            		if((certDetails.certificateDtl.auditSubTypeId==1003 || certDetails.certificateDtl.auditSubTypeId==1005 || certDetails.certificateDtl.certIssueId == 1007 || certDetails.certificateDtl.certIssueId == 1006)){
     			 		            			certDetails.directIntermAdd="directIntermAdd";
     			 		            		}
     			 		            	}else if(res.prevAuditDtl.length>=2 && res.initalCount==1 && certDetails.certificateDtl.audCertIssueDesc != 'FULL TERM'){
     			 		            		var audSQNO=0;
     			 		            		res.prevAuditDtl.forEach(function(a){
     		 									if(a.auditSeqNo>audSQNO && (a.certIssueId==1002 || a.certIssueId==1008 || a.certIssueId==1003)){//reissue 
     		 										audSQNO=a.auditSeqNo;
     		 									}
     		 								});
     			 		            		detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'completion',audSQNO).$promise.then(function(completion){
     			 		            			if(completion.completionDate[0]){
     			 		            			console.log(completion.completionDate[0].COMPLETION_DATE)
     			 		            			if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
     		 								 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
     		 								 		
     		 								 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
     		 								 		certDetails.certificateDtl.completionDate = 'N.A';
     		 								 		
     		 								 	}
     		 								 	else{
     		 								 		if(checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
				 		            					certDetails.certificateDtl.completionDate = moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	 		    	        						}else{
	 		    	        							certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
	 		    	        						}
     		 								 		
     		 								 		//certDetails.certificateDtl.completionDate = moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY');
     		 								 		
     		 								 	}
     			 		            			certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
     			 		            			}
     			 		            		});
     			 		            		if(certDetails.certificateDtl.auditTypeId==1003 && certDetails.certificateDtl.auditSubTypeId!=certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    		     								detailsFactory.getDMLCLocationDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,audSQNO,'mCert').$promise.then(function(resDMLC){
    		     	    							if(resDMLC.placeLocation[0]){
    		     	    	        					var dateCloseFormat=resDMLC.placeLocation[0].CLOSE_MEETING_DATE ;
    		     	    	        					if(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE!='N.A' && resDMLC.placeLocation[0].DMLCII_ISSUE_DATE!=''){
    		     	    	        						
    		     	    	        						if(checkDateFormat(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE)){
    		     	    	        							var dateCloseFormat=moment(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
    			    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    					 	        						}else{
    					 	        							var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE),MMMDDYYYY).format('DD-MMM-YYYY');
    			    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;
    					 	        						}
    		     	    	        						
    		    	 					        			/*var dateCloseFormat=moment(new Date(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE)).format('DD-MMM-YYYY');
    		    	 					        			certDetails.certificateDtl.dmlcIssueDate = dateCloseFormat;*/
    		    	 								 	}else if(resDMLC.placeLocation[0].DMLCII_ISSUE_DATE=='N.A' || resDMLC.placeLocation[0].DMLCII_ISSUE_DATE==''){
    		    	 								 		certDetails.certificateDtl.dmlcIssueDate = 'N.A';
    		    	 								 	}
    		     	    	        					if(resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION!='N.A' && resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION!=''){
    		    	 					        			
    		    	 					        			certDetails.certificateDtl.dmlcIssuePlace = resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION;
    		    	 								 	}else if(resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION=='N.A' || resDMLC.placeLocation[0].DMLCII_ISSUE_LOCATION==''){
    		    	 								 		certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
    		    	 								 	}
    		     	    							}else{
    		    	    								certDetails.certificateDtl.dmlcIssueDate = 'N.A';
    		    	    								certDetails.certificateDtl.dmlcIssuePlace = 'N.A';
    		    	    							}
    		     	    							certDetails.prevDmlcIssueDate = certDetails.certificateDtl.dmlcIssueDate;
    		    	    							certDetails.prevDmlcIssuePlace = certDetails.certificateDtl.dmlcIssuePlace;
    		     	    						});
    		     							}
     			 		            		if(res.prevAuditDtl[0].auditSubTypeId=='1002' || res.prevAuditDtl[0].auditSubTypeId=='1004' ){
     			 		            			certDetails.enableCompletionDate=false;
     			 		            		}
     			 		            		else 
     			 		            			certDetails.enableCompletionDate=true;
     			 		            	}
     			 	    				/*if(certDetails.directIntermediate=="directIntermediate"){
     			 	    							if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE || !certDetails.checkGenerate)
     			 	    								certDetails.certificateDtl.completionDate='N.A';
     			 	    				}*/
     			 	    				
        				 		});
        				
        				 	}
    					 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    						 detailsFactory.getCompletionDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId,certDetails.certificateDtl.auditTypeId,'consecutive',certDetails.certificateDtl.auditSeqNo).$promise.then(function(completion){
    							 
    							 if(completion.completionDate[0]){
    								 console.log(completion.completionDate[0])
	    							 if(completion.completionDate[0].COMPLETION_DATE=='N.A'){
	    							 		certDetails.certificateDtl.completionDate = completion.completionDate[0].COMPLETION_DATE;
	    							 		certDetails.subInterimDate = certDetails.certificateDtl.completionDate;
	    							 	}else if(completion.completionDate[0].COMPLETION_DATE==''){
	    							 		certDetails.certificateDtl.completionDate = 'N.A';
	    							 		certDetails.subInterimDate = certDetails.certificateDtl.completionDate;
	    							 	}
	    							 	else{ 
	    							 		var dateCloseFormat1;
	    							 		if(completion.completionDate[0].COMPLETION_DATE && checkDateFormat(completion.completionDate[0].COMPLETION_DATE)){
	    							 			dateCloseFormat1=moment(completion.completionDate[0].COMPLETION_DATE,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	     					        			
	     	        						}else{
	     	        							dateCloseFormat1=moment(new Date(completion.completionDate[0].COMPLETION_DATE),'MMMDDYYYY').format('DD-MMM-YYYY');
	     					        			
	     	        						}
	    							 		var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? dateCloseFormat1 : moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
	    							 		
	    							 		//var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? moment(new Date(completion.completionDate[0].COMPLETION_DATE)).format('DD-MMM-YYYY') : moment(certDetails.certificateDtl.certIssueDate).format('DD-MMM-YYYY');
	    							 		certDetails.subInterimDate = certDetails.subInterimDate ? certDetails.subInterimDate : dateCloseFormat;
	    				 					certDetails.certificateDtl.completionDate = certDetails.certificateDtl.completionDate ? certDetails.certificateDtl.completionDate : certDetails.subInterimDate;
	    							 	}
    								 certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    							 }
    							 	
    						});
    		    				
    	    			 }
        				 });
    				
    				if(certDetails.withOutAdt){
    				 certDetails.certificateDtl.creditDate=moment(certDetails.certificateDtl.creditDate,YYYYMMDD).format(MMMDDYYYY);}
    				 
    				 var detailsLead= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});

 					certDetails.leadSign=detailsLead.audSignature!=null && detailsLead.audSignature!=undefined && detailsLead.audSignature!=''?true:false;
 					

 					var check= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
 		    		
 					certDetails.reviewSign=check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined?true:false;
 		    		

    			console.log(certDetails.certificateDtl);
    				 certDetails.orgCertificateDtl = angular.copy(res).auditDetail;
    				 
    				 certDetails.getPreviousAuditCerData = angular.copy(res).prevAuditDtl;
    				
    			if(res.initalCount==1 || res.renewalCount==1){
    				certDetails.checkPreviousInitialOrRenewal=true;
    			}
    			if(certDetails.certificateDtl.vesselImoNo){
    				 certificateFactory.getAllCycleDate(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.vesselImoNo ,certDetails.certificateDtl.companyId).$promise.then(function(res) {
    	      				console.log(res);
    	      				certDetails.arrOfDate = res;
    	      				/*certDetails.arrOfDate=res.sort(function(a, b) {
    	      				    return parseFloat(a.cycleSeqNo) - parseFloat(b.cycleSeqNo);
    	      				});*/
    	      				console.log(certDetails.arrOfDate);
    	      				});
    				 
    			}

    				
    				 certDetails.dateFormatConversion(certDetails.orgCertificateDtl,YYYYMMDD,MMMDDYYYY);
    				 
    				 certDetails.nxtAuditCreate = res.nextAudit ? res.nextAudit : certDetails.nxtAuditCreate;
    				 
    				 certDetails.disableReissue = res.disableReissue ? res.disableReissue : certDetails.disableReissue;
    				 
    				 certDetails.checkNxtAuditCreate =  res.checkNxtAuditCreate ?  res.checkNxtAuditCreate : certDetails.checkNxtAuditCreate;
    				 
    				 certDetails.nxtAuditInterOrAdd = res.nxtAuditInterOrAdd ? res.nxtAuditInterOrAdd : certDetails.nxtAuditInterOrAdd;
    				     				 
    				 certDetails.previousCertExpiryDate = res.previousCertExpiryDate ?  moment(res.previousCertExpiryDate,YYYYMMDD).format(MMMDDYYYY) : '';
    				 
    				 certDetails.intermediateMinAuditDate = res.intermediateMinAuditDate ? moment(res.intermediateMinAuditDate,YYYYMMDD).format(MMMDDYYYY) : '';
    				 
 					certDetails.auditDtlsissedPlace = certDetails.orgCertificateDtl.auditPlace ? decodeURIComponent(atob(certDetails.orgCertificateDtl.auditPlace)) : '';
 					
					certDetails.auditDtlsdateOfRegistry = certDetails.orgCertificateDtl.dateOfRegistry ? certDetails.orgCertificateDtl.dateOfRegistry : '';
 					
					certDetails.auditDtlsGrt = certDetails.orgCertificateDtl.grt ? certDetails.orgCertificateDtl.grt : '' ;
					
					certDetails.auditDtlsAuditDate = certDetails.orgCertificateDtl.auditDate ?  certDetails.orgCertificateDtl.auditDate : '';
					
					var lstCertGrtVal =  certDetails.orgCertificateDtl.certificateDetail ? _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length,'publishStatus' : 0}).pluck("grt").toString() : certDetails.orgCertificateDtl.grt;
					
					certDetails.lstCertGrt =  lstCertGrtVal && lstCertGrtVal != null ? lstCertGrtVal : certDetails.orgCertificateDtl.grt;
					
					var lstCertDorVal =  certDetails.orgCertificateDtl.certificateDetail ? _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length,'publishStatus' : 0}).pluck("dateOfRegistry").toString() : certDetails.orgCertificateDtl.dateOfRegistry;

					certDetails.lstCertDor =  lstCertDorVal && lstCertDorVal != null ? moment(lstCertDorVal, YYYYMMDD).format(MMMDDYYYY) : certDetails.orgCertificateDtl.dateOfRegistry;
					
					var lstCertAuditDataVal =  certDetails.orgCertificateDtl.certificateDetail ? _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length,'publishStatus' : 0}).pluck("auditDate").toString() : certDetails.orgCertificateDtl.auditDate;

					certDetails.lstCertAuditDate =  lstCertAuditDataVal && lstCertAuditDataVal != null ? moment(lstCertAuditDataVal, YYYYMMDD).format(MMMDDYYYY) : certDetails.orgCertificateDtl.auditDate;
										
					certDetails.checkPrevRenewalIsFullterm = res.prevRenewalIsFullterm ? 1 : 0;
					
					certDetails.checkPrevRenewalIsRenewalEndrosed = res.prevRenewalIsRenewalEndrosed ? 1 : 0;
					
					certDetails.certificateNotPublish = res.certificateNotPublish ? res.certificateNotPublish : false;
					
    				 
    				 if (res.carFindMaxStatusDate && (res.carFindMaxStatusDate > res.previousAuditDate)) {
    					 certDetails.minAuditDate = moment(moment(res.carFindMaxStatusDate, YYYYMMDD).add(1, 'days')).format(YYYYMMDD);
    				 } else {

    					 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

    						 if(res.intermediateMinAuditDate){
    							 certDetails.minAuditDate =	 moment(certDetails.intermediateMinAuditDate,MMMDDYYYY).add(1,'year').format(YYYYMMDD);
    							 certDetails.maxAuditDate =	moment(moment(certDetails.orgCertificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)).subtract(1,'year').format(YYYYMMDD);
    						 }else{
    							 certDetails.minAuditDate =	 res.previousAuditDate ? moment(res.previousAuditDate,YYYYMMDD).add(1, 'days').format(YYYYMMDD): '';
    							 certDetails.maxAuditDate = certDetails.orgCertificateDtl.certExpireDate? moment(certDetails.orgCertificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD):'';
    						 }

    					 }else{
    						 certDetails.minAuditDate = res.previousAuditDate ? moment(res.previousAuditDate,YYYYMMDD).add(1, 'days').format(YYYYMMDD): '';
    					 }

    				 }
    				 
    				 if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
    						certDetails.auditingType = certDetails.auditTypeLabel;
    						certDetails.auditingSubType = certDetails.auditSubTypeLabel;
    						certDetails.auditOrInspectionDetailsForScreenType=certDetails.auditOrInspectionDetailsForScreen;
    						
    						certDetails.auditDateForScreenType=certDetails.auditDateForScreen;
    						certDetails.auditingButton = "Audit Home";
    				}else{
    						certDetails.auditingType = certDetails.auditTypeLabelMLC;
    						certDetails.auditingSubType = certDetails.auditSubTypeLabelMLC;
    						certDetails.auditOrInspectionDetailsForScreenType=certDetails.auditOrInspectionDetailsForScreenMLC;
    						certDetails.auditDateForScreenType=certDetails.auditDateForScreenMLC;
    						certDetails.auditingButton = "Inspection Home";
    				}
    				 
    					
 					if(certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.MLC_TYPE_ID){
 						certDetails.userLoggedName = 'Auditor Name';
 					}else{certDetails.userLoggedName = 'Inspector Name';}
 					
    				 
    				 setEnableIssueType();

    				 certDetails.auditSeqNo = certDetails.certificateDtl.auditSeqNo;

    				 sessionStorage.setItem('certAuditSeqNo',certDetails.auditSeqNo);

    				 delete certDetails.certificateDtl.utn;

    				 auditAndCertData.vesselCompanyDtl = auditAndCertData.vesselDetail.vesselCompany;

    				 for(var x in auditAndCertData.vesselDetail) {
    					 if(x != 'dateOfRegistry' && x != 'grt'){
    						 certDetails.certificateDtl[x]=auditAndCertData.vesselDetail[x];
    					 }
    				 }

    				 for(var x in auditAndCertData.vesselCompanyDtl) {

    					 certDetails.certificateDtl[x]=auditAndCertData.vesselCompanyDtl[x];
    				 }

    				 certDetails.orgCertificateDtl.portOfRegistry = certDetails.certificateDtl.portOfRegistry;

    				 var detailsLead= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});

    				 certDetails.leadStatus = (detailsLead.userId == sessionStorage.getItem('emailId')) ? true : false;

    				 if(!(certDetails.leadStatus) && auditAndCertData.auditDetail.allowNext==0){

    					 certDetails.disableAll = true;
    				 }
    				 if(!(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.allowNext==1){

    					 certDetails.disableAll = true;
    				 }

    				 //certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;

    				 certDetails.getAuditSubType(certDetails.certificateDtl.auditTypeId);

    				 if(!(auditAndCertData.auditDetail.certificateDetail) || auditAndCertData.auditDetail.certificateDetail.length==0){

    					 certDetails.certificateDtl.seqNo = 0;

    				 }else if(auditAndCertData.auditDetail.certificateDetail.length>0){

    					 certDetails.certificateLength = auditAndCertData.auditDetail.certificateDetail.length;

    					 var maxSeqNoCert = auditAndCertData.auditDetail.certificateDetail.reduce(function(prev, current){
    						 return (prev.seqNo > current.seqNo) ? prev : current
    					 });

    					 if(maxSeqNoCert && maxSeqNoCert.publishStatus){
    						 certDetails.certificateDtl.publishStatus = maxSeqNoCert.publishStatus;

    						 if(!certDetails.publishCheckStatus && !(certDetails.disableAll) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT) && certDetails.certificateDtl.publishStatus==1 && !(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS) && !((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 0) && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){//Modified by sudharsan for Jira ID => and IRI-5602
								if(auditAndCertData.auditDetail.auditStatusId != certDetails.AppConstant.REOPEN && certDetails.certificateDtl.publishStatus == '1' && !certDetails.reviewSign){			//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359
									toaster.info('Audit has not been signed off by Reviewer');//Added by sudharsan for Jira-ID=IRI-5581
								}
    						 }
							 else if(auditAndCertData.auditDetail.auditStatusId != certDetails.AppConstant.REOPEN && certDetails.certificateDtl.publishStatus == '1' && !certDetails.reviewSign && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){			//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359
								toaster.info('Audit has not been signed off by Reviewer');//Added by sudharsan for Jira-ID=IRI-5581 and IRI-5602
							}

    						 certDetails.certificateDtl.seqNo = 0;
    						 certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
    						 certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
    						 certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
    						 certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;

    					 }else if(maxSeqNoCert && !(maxSeqNoCert.publishStatus)){

    						 certDetails.certificateDtl.seqNo 		  = maxSeqNoCert.seqNo;
    						 certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
    						 certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
    						 certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
    						 certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;
    						 certDetails.certificateDtl.certificateVer = maxSeqNoCert.certificateVer;
    						 certDetails.certificateDtl.publishStatus  = maxSeqNoCert.publishStatus;
    						 certDetails.certificateDtl.activeStatus   = maxSeqNoCert.activeStatus;
    						 certDetails.certificateDtl.leadName       = maxSeqNoCert.leadName;
    						 certDetails.certificateDtl.vesselId		  = maxSeqNoCert.vesselId;
    						 certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID
    					 }
    				 }
    				 
    				 certDetails.certificateDtl.extendedEndorsedDate = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? ((certDetails.leadStatus) ? moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY') : '') : '';

    				 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){

    					 certDetails.certificateDtl.extendedIssueDate =certDetails.certificateDtl.extendedIssueDate?certDetails.certificateDtl.extendedIssueDate:certDetails.certificateDtl.certIssueDate;
    					 certDetails.certificateDtl.extendedExpireDate = certDetails.certificateDtl.extendedExpireDate?certDetails.certificateDtl.extendedExpireDate:certDetails.certificateDtl.certExpireDate;
    			
    				 }

    				 if(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS &&  auditAndCertData.auditDetail.certificateDetail.length > 0){
    					 certDetails.certificateDtl = angular.copy(_(auditAndCertData.auditDetail.certificateDetail).chain().where({'seqNo':auditAndCertData.auditDetail.certificateDetail.length})._wrapped[0]);
    						certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 if(auditAndCertData.auditDateChanged){
    			    			certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate;
    			    			auditAndCertData.auditDateChanged = false;
    			    		}
    			//		 certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint+'';
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    				 }

    				 if(!certDetails.leadStatus){
    					 certDetails.certificateDtl = angular.copy(_(auditAndCertData.auditDetail.certificateDetail).chain().where({'seqNo':auditAndCertData.auditDetail.certificateDetail.length})._wrapped[0]);
    						certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate;					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint +'';					
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';					
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    				 }

    				 if(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS){
    					 certDetails.disableAll = true;
    					 certDetails.enabled = false;

    					 certDetails.certificateDtl = angular.copy(_(auditAndCertData.auditDetail.certificateDetail).chain().where({'seqNo':auditAndCertData.auditDetail.certificateDetail.length})._wrapped[0]);
    						certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate;					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint +'';					
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';					
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    				 }else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 0){
 						certDetails.disableAll = true;
 					}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 1){
 						
 						 certDetails.disableAll = certDetails.nxtAuditCreate ? true : certDetails.nxtAuditCreate;						
 					}
    				 
    				 if(auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS){
    					 toaster.info('Current audit marked as void');
    					 certDetails.certificateDtl = angular.copy(_(auditAndCertData.auditDetail.certificateDetail).chain().where({'seqNo':auditAndCertData.auditDetail.certificateDetail.length})._wrapped[0]);
    						certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate;					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint +'';					
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';					
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    					 certDetails.enabled = false;

    				 }else if(certDetails.certificateDtl.lockStatus == 1){
    					 toaster.info('Current audit retrieved in the laptop');
    					 certDetails.disableAll = true;
    				 }else if(certDetails.certificateDtl.lockStatus == 7){
    					 toaster.info('Current audit retrieved in the Mobile');
    					 certDetails.disableAll = true;
    				 }

    				 try{
    					 certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.auditPlace?decodeURIComponent(atob(certDetails.certificateDtl.auditPlace)):'';
    				 }catch(err){
    				 }

    				 certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);
    				 setEnableIssueType();
    				 certDetails.setDateAndDisableCertIssueExpiry();
    				 certDetails.enableCertType.push(certDetails.certificateDtl.certIssueId);
    				
    				 if(auditAndCertData.auditDetail.certificateDetail.length >1){
    					
    					 validateIssueExpiryDate();
    				 }else if(auditAndCertData.auditDetail.certificateDetail.length ==1 && certDetails.leadStatus && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
    					
    					 getPrevioiusCertDtlsForRenewal();
    				 }

    				 if(!(certDetails.leadStatus || certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)){
    					 certDetails.enabled = false;
    				 }
    				 certDetails.disableCertIssueTypeId = false;

    				 if(auditAndCertData.auditDetail.lockHolder){
    					 certDetails.releaseLock = false;
    					 certDetails.enabled = true;
    				 }

    				 if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    					 certDetails.certificateDtl.consecutiveId=1000;
    					 certDetails.subInterimDate='N.A'
    					 certDetails.certificateDtl.completionDate=certDetails.subInterimDate;
    				 }
    				 
    				 if(certDetails.nxtAuditCreate){
 						certDetails.releaseLock = certDetails.nxtAuditCreate 
 					}
    				 certDetails.checkNxtInterOrAddiReissuePresent = ((certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && certDetails.nxtAuditInterOrAdd) || certDetails.disableReissue) ? 1 : 0;
    				
    				 if(certDetails.nxtAuditInterOrAdd){
    					 certDetails.enableCertType = (res.checkFullTermCert && res.checkFullTermCert==true) ? (certDetails.certificateDtl.auditTypeId == AppConstant.MLC_TYPE_ID ? [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.RE_ISSUE] : [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.EXTENSION,certDetails.AppConstant.RE_ISSUE] ) : [certDetails.certificateDtl.certIssueId];
    					
    					 if(!certDetails.nxtAuditCreate && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    						 certDetails.enableCertType = [certDetails.AppConstant.EXTENSION];
    					
    			    			//certDetails.certificateDtl.extendedExpireDate = certDetails.previousCertExpiryDate ? certDetails.previousCertExpiryDate : certDetails.certificateDtl.extendedExpireDate;
    			    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			    		}
    				 }
    			
    				var userFlag = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) ? 'Manager' : 'lead';
    	    			
    	    		checkPreviousInitialaudit(userFlag);

    				 renewalEndrosedChangedVal();
    				 
    				 certDetails.releaseLock = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID) ? true : certDetails.releaseLock;
    				 
    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					 var val =( res.checkFullTermCert && res.checkFullTermCert==true) ? true : false;    					 
    					 if(val){
    						certDetails.checkFullTermCertPresent = 1;
    					}else{
    						certDetails.checkFullTermCertPresent = 0;
    					}	    					 
    					
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    					 var val =( res.checkIntermCert && res.checkIntermCert==true) ? true : false;    					 
    					 if(val){
    						certDetails.checkIntermCertPresent = 1;
    					}else{
    						certDetails.checkIntermCertPresent = 0;
    					}
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

        				 var val =( res.checkIntermediateCert && res.checkIntermediateCert==true) ? true : false;   
        				 if(val){
        					 certDetails.checkIntermediateCertPresent = 1;
        				 }else{
        					 certDetails.checkIntermediateCertPresent = 0;
        				 }

        			 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

        				 var val =( res.checkAdditionalCert && res.checkAdditionalCert==true) ? true : false;    					 
        				 if(val){
        					 certDetails.checkAdditionalCertPresent = 1;
        				 }else{
        					 certDetails.checkAdditionalCertPresent = 0;
        				 }
        			 }
    				 
    				 certDetails.onchangeReissueName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? 'Issue Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ? 'Reissue Certificate Date' : '';

    				 certDetails.onchangeReissueExpireName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION) ? 'Extended Expiry Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ? 'Expiration Date' : '';

    				 certDetails.checkExtensionInInterOrAdd = (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? 1 : 0;
    				 
    				 if(!certDetails.publishCheckStatus && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.publishStatus==1) && certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS
    	        				&& ((certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS) 
    	        				|| ((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 1))){
    	        			/*toaster.info('certificate already published please change the certificate issue type');
    	        			certDetails.disableGenerate = true;*/
    	        			
    	        			if($state.params.certificate != 'managerSearch'){
								if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN){				//added by @Ramya 0n 1-7-2022 for jira id - IRI-5359
    	        				toaster.info('certificate already published please change the certificate issue type');
								}
								certDetails.disableGenerate = true;
    	     				 }
    	        		}
    				 
    				 checkOrgCertDtlVal(certDetails.certificateDtl,certDetails.orgCertificateDtl);
    				 if(certDetails.certificateDtl.generatedBy==1003){
    					 if(certDetails.certificateDtl.issuerId == sessionStorage.getItem("emailId")){
    						 certDetails.userLoggedName = 'Manager Name';
    						 certDetails.signerName = certDtlRequiredData.getCurrentUserFullName.userName;
    						 certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 }
    					 if(certDetails.certificateDtl.issuerId != sessionStorage.getItem("emailId") ){
    						 certDetails.getAudObsData.filter(function(array){
 					    		
 					    		if(array.emailId == certDetails.certificateDtl.issuerId){
 					    			certDetails.signerName = array.firstName + " " + array.lastName;
 					    		}
 					    	});
    						 certDetails.userLoggedName = 'Manager Name';
    						 certDetails.certificateDtl.issuerName = certDetails.signerName;
    					 }
    				}else{
 						certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : auditAndCertData.auditDetail.leadAuditorName;
 						certDetails.certificateDtl.issuerName = certDetails.signerName;
 					}
    				 
    				 certDetails.publishCheckStatus = false;
    				 
   				  if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
						
						var expiryDate = '';
						
     					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){
     	    				
     	    					 //expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     						
     						     expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				 
     	    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				
     	    			 }
     					
     				}
				/*  if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
						
						var expiryDate = '';
						
     					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				 
     	    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				
     	    			 }
     					
     				}*/
			/*	  if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
						
						var expiryDate = '';
						
     					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				 
     	    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
     	    				
     	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
     	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
     	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
     	    				
     	    			 }
     					
     				}*/
		$timeout(function(){
			if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.REOPEN && !certDetails.prevAudFindingCarUpdate){		//added by @Ramya on 4-7-2022 for jira id - IRI-5361
   				vesselDtlsCheck();
			}
		},2000);
    			 });	
    			 
    			 
    		 }//end of getAuditCertDetails();
    		 
    		 function setEnableIssueType(){
    			
    		var check= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
    		
    		if(check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined){
    			certDetails.reviewSign=true;
    		}
    		
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

    				 certDetails.enableCertType = [certDetails.AppConstant.INTERMEDAITE_ENDORSED, certDetails.AppConstant.RE_ISSUE,certDetails.AppConstant.EXTENSION];

    			 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    				 certDetails.enableCertType = [certDetails.AppConstant.ADDITIONAL_ENDORSED, certDetails.AppConstant.RE_ISSUE,certDetails.AppConstant.EXTENSION];
    			 }

    			 if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){

    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT, certDetails.AppConstant.RE_ISSUE];

    					 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE)){
    						
    						 certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION);
    					 }

    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.EXTENSION,certDetails.AppConstant.RE_ISSUE];

    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					 if(certDetails.Stateflag){
    					
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    				 }

    			 }else if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID){

    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT,certDetails.AppConstant.RE_ISSUE];

    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RE_ISSUE];

    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					 
    					  if(certDetails.Stateflag){
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    				 }
    			 }
    		 }//end of setEnableIssueType()
    	
    	
    	function downloadCertifiacte(res){
    		console.log(res);
			//res.certVersion = certVersion;
    		blockUI.start("Preparing Certificate");
    		console.log("certificateDtl",certDetails.certificateDtl);    		    		

    		auditFactory.qrCodeGenerator(CERTI_URL+res.companyId+'/'+res.utn).$promise.then(function(response){

    			certDetails.qrCodeData= response.data;

    			if(res){
					certDetails.prevAuditDetls.prevAuditDtl.reverse();  //Added by sudharsan for Jira-ID = IRI-5641
//    				var doc = new jsPDF('p', 'mm', 'a4');	
    				console.log("currentRespose",res);
    				var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
    				//added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536 Start here
					var directInterorAdd = certDetails.prevAuditDetls.length!=0 && certDetails.prevAuditDetls.prevAuditDtl.length!=0?
												(certDetails.prevAuditDetls.prevAuditDtl[0].auditSubTypeId!=undefined?
													(certDetails.prevAuditDetls.prevAuditDtl[0].auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.prevAuditDetls.prevAuditDtl[0].auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)?true:
													false:
													(res[0].auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || res[0].auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)?true:
												false):
											false;
    				if((res.getExactActiveStatus == 1 && res.auditSeqNo == 600001) || (res.getExactActiveStatus == 1)){ //changed by sudharsan for Jira-id=5338 on 28-06-2022
    					console.log("Active status");
						console.log("certdetails",certDetails.prevAuditDetls.prevAuditDtl);
						

    					detailsFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){
    						console.log("getAuditCertificateData result"); console.log(result);
    						console.log("getAuditCertificateData res"); console.log(res);
    						console.log("getAuditCertificateData response"); console.log(response);
								//Added by sudharsan for Jira-ID = 5690 ,IRI-5693,IRI-5673 Start here
								for (var i = 0; i<result.length; i++){
									console.log(result[i].activeStatus);
									result[i].activeStatus ==0?result[i].activeStatus =1:result[i].activeStatus;
									console.log(result[i].activeStatus);
								}//Added by sudharsan for Jira-ID = 5690 ,IRI-5693,IRI-5673 End here	
    						downloadAllCertificate(result,res,response,"active");
        				});
						
    				}else{
    					console.log("In-Active status");
    					
    					detailsFactory.getAuditCertificateInActive(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){
    						
    						if(result.length == 0){
								detailsFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){
									if(directInterorAdd){
										/**With chibi certificate changes this part of code not required */
										result.forEach(function updateactivestatus(inactive_certificate){
											inactive_certificate.activeStatus = 0;
										});
										/**End here */
									}
									downloadAllCertificate(result,res,response,"extent-inactive");
								});
							}else{
								if(directInterorAdd){
									/**With chibi certificate changes this part of code not required */
									result.forEach(function updateactivestatus(inactive_certificate){
										inactive_certificate.activeStatus = 0;
									});
									/**End here */
								}
							downloadAllCertificate(result,res,response,"inactive");
							}
        				});
						certDetails.prevAuditDetls.prevAuditDtl.reverse()
						//Modifications for Jira-ID = 5511 , 5534, 5536, 5536 end here
    				}
    				//toaster.success('Please wait Certificate will be preparing');
    				//blockUI.stop();
					certDetails.prevAuditDetls.prevAuditDtl.reverse(); //Added by sudharsan for Jira-ID = IRI-5641
    			}else{
    				blockUI.stop();
    			}
    		});
    	}
    	
    	function certGenerateDisable(){
    		var res = (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN) || 
    		(certDetails.certificateNotPublish && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) || 
    		certDetails.checkNxtAuditCreate || certDetails.disableAll || certDetails.disableGenerate || 
    		certDetails.disableCertIssueTypeId || certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS
    		|| certDetails.certificateDtl.auditSummaryId == certDetails.AppConstant.NOT_APPROVED_SUMMARY || (( certDetails.userRoleId != certDetails.AppConstant.AUDITOR_ROLE_ID && 
    		certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ||
    		(certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERIM_CERT && 
    		certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) || 
    		(certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)
    		|| (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) 
    		|| (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.FULL_TERM_CERT && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) 
    		|| (certDetails.checkIntermediateCertPresent ==1 && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED) 
    		|| (certDetails.certificateDtl.checkOnlyRenewalEndrosed == 1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2 
    				|| certDetails.certificateDtl.certIssueId==certDetails.AppConstant.FULL_TERM_CERT)) || (certDetails.certificateDtl.checkRenEndrosAftFullTerm == 1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) 
    				|| (certDetails.certificateDtl.checkAdminRenewalEndrosed ==1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1) 
    				|| (certDetails.checkAdditionalCertPresent ==1 && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED)) 
    				|| (certDetails.checkExtensionInInterOrAdd==1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION) 
    				|| (certDetails.checkNxtInterOrAddiReissuePresent == 1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE) ||
    				(certDetails.checkFullTermCertPresent == 0 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID
    						&& certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) || 
    						(certDetails.certificateDtl.checkExtensionCert ==1 && certDetails.checkFullTermCertPresent ==1 && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID 
    								|| certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) &&
    								certDetails.certificateDtl.certIssueId==certDetails.AppConstant.EXTENSION || (certDetails.managerSearch && certDetails.checkPublish)||certDetails.releaseLock && !(certDetails.userRoleId==1003)) ;//Added by sudharsan for JiraID-5258
    		
    		return res;
    		
    	}
    	
    	function certPublsihDisable(){
    		var res = (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN) 
    		|| (certDetails.certificateNotPublish && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) 
    		|| certDetails.checkNxtAuditCreate || certDetails.disableAll || certDetails.disableCertIssueTypeId 
    		|| certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS 
    		|| certDetails.certificateDtl.auditSummaryId == certDetails.AppConstant.NOT_APPROVED_SUMMARY
    		|| (( certDetails.userRoleId != certDetails.AppConstant.AUDITOR_ROLE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) 
    		|| (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERIM_CERT && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)
    		|| (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) 
    		|| (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) 
    		|| (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.FULL_TERM_CERT && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) 
    		|| (certDetails.checkIntermediateCertPresent ==1 && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED) 
    		|| (certDetails.certificateDtl.checkOnlyRenewalEndrosed == 1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2 
    		|| certDetails.certificateDtl.certIssueId==certDetails.AppConstant.FULL_TERM_CERT)) 
    		|| (certDetails.certificateDtl.checkRenEndrosAftFullTerm == 1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) 
    		|| (certDetails.certificateDtl.checkAdminRenewalEndrosed ==1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1) 
    		|| (certDetails.checkAdditionalCertPresent ==1 && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED)) 
    		|| (certDetails.certificateDtl.publishStatus==1 && certDetails.certificateDtl.activeStatus==1) 
    		|| (certDetails.checkNxtInterOrAddiReissuePresent == 1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE) 
    		|| (certDetails.checkExtensionInInterOrAdd==1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION) 
    		|| (certDetails.certificateDtl.checkExtensionCert ==1 && certDetails.checkFullTermCertPresent ==1 && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID 
    		|| certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.EXTENSION) 
    		|| (certDetails.checkFullTermCertPresent == 0 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) ||certDetails.releaseLock && !(certDetails.userRoleId==1003); //Added by sudharsan for JiraID-5258

    		
    		return res
    		
    	}
    	
    	function checkBlankCompletion(){
    		/*if(certDetails.certificateDtl.completionDate=='')
    			certDetails.certificateDtl.completionDate='N.A'
    		if(certDetails.certificateDtl.dmlcIssueDate=='')
    			certDetails.certificateDtl.dmlcIssueDate='N.A'
    		$timeout(function(){		
    	    if(certDetails.certificateDtl.dmlcIssuePlace=='')
    	    	certDetails.certificateDtl.dmlcIssuePlace='N.A'
    		},3000);
    	    if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RE_ISSUE){	
	    	    if(certDetails.subInterimDate=='')
	    	    	certDetails.subInterimDate='N.A'
	    	    certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
	    	    console.log(certDetails.certificateDtl.completionDate)
    	    }*/
    	}
    	function downloadAllCertificate(result,res,response,txt){
    		console.log(result)
    		console.log(res)
    		if(result[0].auditSeqNo==600001 || result[0].auditSeqNo==600002 || result[0].auditSeqNo==600003){
    			result[0].certOderNo=-999;
    			res.certOderNo=-999;
    		}
	    	var newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue1 =[],additionalReissue2 =[];
	    	var currInitialPage=[],additionalReissue3 =[], intermediateReissue1= [],additional1=[],additional2=[],additional3=[],intermediate1=[];
			var overallAddCnt=0,overallInterCnt=0;
			console.log(res)
			var auditSubTypeId = certDetails.auditSubTypeId,
			certificaIssueId = certDetails.certIssueId,
			tempAuditSeqNo = certDetails.auditSeqNo;
			var latestNumber = [];
			
			
			var latestAudit=res;
			var certResult =result;
			var directinter; //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
			var directadditional; //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
			
		/*	certResult.sort(function(c, d){
	            return c.certOderNo - d.certOderNo ;
	        });*/
			
			if(res.certIssueId==1008)
				certResult.forEach(function(a,index){
					if(a.certIssueId==1008){//reissue and extension
						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
					}
				
				});
			if(certDetails.ExtensionBtnClicked){
				certResult.sort(function(c, d){
		            return c.auditSeqNo - d.auditSeqNo || c.seqNo - d.seqNo ;
		        });
				latestAudit='';
				latestAudit=certResult[certResult.length-1];
				
				latestAudit.auditPlace = res.auditPlace?decodeURIComponent(btoa(res.auditPlace)) : '';
				
			}else if(res.certIssueId==1003){
				certResult.forEach(function(a,index){
					if(a.certIssueId==1003){//reissue and extension
						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
					}
				
				});
			}
			certResult.sort(function(c, d){
	            return c.auditSeqNo - d.auditSeqNo || c.seqNo - d.seqNo ;
	        });
			//added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536 Start here
			directinter = certResult[0].auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certResult[0].certIssueId != 1008;
			directadditional= certResult[0].auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && certResult[0].certIssueId != 1008;
			if(directinter || directadditional){
				var check =true;
				certResult.reverse();
				certResult.forEach(function(certificates){
					if(certificates.certIssueId == 1008 && check){
						certResult.forEach(function(mod){
							if (mod.auditSeqNo<certificates.auditSeqNo){
								mod.reissuedinanother = true;
							}
						});	
						check = false;
					}
				});
				certResult.reverse();
			}
			//End here Jira-ID = 5511 , 5534, 5536, 5536
			var certorderInter=result[0].certOderNo;
			certResult.forEach(function(a){
				if(a.certIssueId==1008 && a.seqNo==1)
    				a.getEndrosedCount=0
				if(a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' || a.certIssueDesc=='INTERIM'){
					if(a.publishStatus==0 && res.publishStatus==0 && a.auditSubTypeId==res.auditSubTypeId)
						currInitialPage={0:a}
					else if(a.publishStatus==1 && a.certIssueId!=1008)
						(a.certOderNo<=res.certOderNo) ? currInitialPage={0:a} : currInitialPage.length==0 ? ' ' : currInitialPage[0];
					else if(a.publishStatus==1 && a.certIssueId==1008)
						currInitialPage={0:a};
				}
				 
				if(certDetails.directIntermAdd=='directIntermAdd' && (a.auditSubTypeId==certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID || a.auditSubTypeId==certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || a.certIssueId == 1007 || a.certIssueId == 1006)){
					
					if(certorderInter>a.certOderNo){
						certorderInter=a.certOderNo;
					}
					(a.certOderNo==certorderInter) ? currInitialPage={0:a} :  ' ';
				}
			});
			certResult.forEach(function(a){
				a.nameItalics = false;
				a.nameFull = '';
				a.sealImage = '';
				if (a.title.indexOf('Special') >= 0) {
					a.sealImage = sourceToDataURL('sa');
				} else if (a.title.indexOf('Deputy') >= 0) {
					a.sealImage = sourceToDataURL('dc');
				}
				
				if (a.nameToPrint == 1) {
					a.nameFull = a.issuerName + '\n';
					a.nameItalics = false;
				}
				else if (a.nameToPrint == 0) {
					a.nameFull = '(Name) \n';
					a.nameItalics = true;
				}
				
							
				if(a.auditSubTypeId === certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId==1005 && a.getEndrosedCount==1){
					if(a.auditSubTypeId === certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)
						latestNumber.push(a.auditSeqNo);
					overallAddCnt++;
					a.overallAddCnt=overallAddCnt;
				}	
				
				if(a.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID)
					a.initialAvail = true;
				else
					a.initialAvail = false;
				
				if(a.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId==1004 && a.getEndrosedCount==1){
					overallInterCnt++;
					a.overallInterCnt=overallInterCnt;
				}
				
				if(a.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1){
					overallAddCnt++;
					a.overallAddCnt=overallAddCnt;
					a.addReissue = true;
				}
				else if((a.reissuedinanother!=undefined?a.reissuedinanother:false) && a.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID ) //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
					a.addReissue = true;
				else
					a.addReissue = false;
				
				if((a.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1)){
					
					overallInterCnt++;
					a.overallInterCnt=overallInterCnt;
					a.interReissue = true;
					a.addReissue = true;
				}
				else if((a.reissuedinanother!=undefined?a.reissuedinanother:false) && a.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID) //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
					a.interReissue = true;
				else
					a.interReissue = false;
				
				if(a.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && a.auditStatusId != 1004){
					a.renewalEndorsedAvail = true;
				}else
					a.renewalEndorsedAvail = false;
			});
			
			var maximum = Math.max.apply(null, latestNumber); // get the max of the array
			latestNumber.splice(latestNumber.indexOf(maximum), 1); // remove max from the array
		    var maximum2 = Math.max.apply(null, latestNumber); // get the 2nd max
			var latestSeqNumber = '';
			var getEndrosedCountLatest = '';
			certResult.forEach(function(a){
				if (a.auditSeqNo === maximum2) {
					latestSeqNumber = a.seqNo;
					getEndrosedCountLatest = a.getEndrosedCount;
					a.latestSeqNumber = latestSeqNumber;
				}
			});
			console.log(certResult)
			
			certResult.forEach(function(a,index){
				
				a.withoutIntermediate = false;
				
				a.auditPlace = a.auditPlace?decodeURIComponent(atob(a.auditPlace)) : '';
	
				a.certExpireDate = a.certExpireDate ? moment(a.certExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.certIssueDate = a.certIssueDate ? moment(a.certIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.auditDate = a.auditDate ? moment(a.auditDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.dateOfRegistry = a.dateOfRegistry ? moment(a.dateOfRegistry,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.issuerSignDate = a.issuerSignDate ? moment(a.issuerSignDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.extendedIssueDate = a.extendedIssueDate ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.extendedExpireDate = a.extendedExpireDate ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
	
				a.prevAuditIssueData = a.prevAuditIssueData ? moment(a.prevAuditIssueData,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
				
				a.issuerSign = atob(a.issuerSign);
				
				a.auditStatusId = a.auditStatusId;
	
	
				if(a.certIssueId == 1003 || a.certIssueId  == 1006){
					if(a.auditSubTypeId==1001 || a.auditSubTypeId==1002 ||  a.auditSubTypeId==1003 || a.auditSubTypeId==1004 || a.auditSubTypeId==1005){
						console.log(a)
						if(a.certIssueId == certificaIssueId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
					
						(a.certOderNo <= latestAudit.certOderNo) && (a.auditSubTypeId==1001 || a.auditSubTypeId==1002 || a.auditSubTypeId==1003 ||   a.auditSubTypeId==1004 || a.auditSubTypeId==1005)? extension={0:a} : '';
						
					}
					
				}else if(a.certIssueId  == 1007){
	
					if(a.certIssueId == certificaIssueId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
	
					(a.certOderNo<=latestAudit.certOderNo) ? renewalEndorse2={0:a} : '';
	
				}
							
				if(a.auditSubTypeId== certDetails.AppConstant.INITIAL_SUB_TYPE_ID  || a.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID ||a.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
	
				//	det.newCertificateSign = "data:image/png;base64,"+a.issuerSign;
	
					console.log("Initial");
					console.log(a.auditSubTypeId == auditSubTypeId);
					if(a.auditSubTypeId == auditSubTypeId){
	
					a.withoutCross = true;
					}else{
					a.withoutCross = false;
					}
					//console.log("FULLTERM..!!");
					console.log(a)
					console.log(latestAudit)
					if(a.publishStatus==0 && latestAudit.publishStatus==0 && a.certOderNo>res.certOderNo)
						newCertificate.push(a);
					else
						a.certOderNo<=latestAudit.certOderNo?newCertificate.push(a):'';
	
				}else if(a.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
					if(a.overallAddCnt==1){
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?a.reissuedinanother!=undefined?(a.reissuedinanother?additionalReissue1={0:a}:additional1={0:a}):additional1={0:a}:''; //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue1={0:a}:'';
					}else if(a.overallAddCnt==2){
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?a.reissuedinanother!=undefined?(a.reissuedinanother?additionalReissue2={0:a}:additional2={0:a}):additional2={0:a}:''; //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue2={0:a}:'';
					}else if(a.overallAddCnt==3){
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?a.reissuedinanother!=undefined?(a.reissuedinanother?additionalReissue3={0:a}:additional3={0:a}):additional3={0:a}:''; //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
						(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue3={0:a}:'';
					}
					if(newCertificate.length == 0)	{
						
						if(a.certIssueId == certificaIssueId && reIssue){
	
							a.withoutCross = true;
							}else{
							a.withoutCross = false;
							}
						
						var copyData = angular.copy(a);
						copyData.withoutIntermediate = true;
						newCertificate.push(copyData);
					}
				}else if(a.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
					console.log("Intermediate");
					
					if(a.certIssueId  == 1004)
					{
					if(a.auditSubTypeId == auditSubTypeId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
						
					if(a.overallInterCnt ==1)
					a.certOderNo<=latestAudit.certOderNo ? !(a.reissuedinanother)?intermediate1={0:a}:'':''; //modified by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
					else if(a.overallInterCnt==2){
						(a.certOderNo<=latestAudit.certOderNo) && (additional1.length==0) ? additional1={0:a}:'';
					}else if(a.overallInterCnt==3){
						(a.certOderNo<=latestAudit.certOderNo) && (additional2.length==0) ? additional2={0:a}:'';
					}else if(a.overallInterCnt==4){
						(a.certOderNo<=latestAudit.certOderNo) && (additional3.length==0) ? additional3={0:a}:'';
					}
					
				}
				
				if(a.certIssueId  == 1008 || a.reissuedinanother){ //modified by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
					if(a.overallInterCnt==1){
					
					 intermediateReissue1={0:a};
					}
					else if(a.overallInterCnt==2){	
						console.log(a.overallInterCnt);
						(a.certOderNo<=latestAudit.certOderNo) &&(additionalReissue1.length==0) ? additionalReissue1={0:a}:'';
					}
					else if(a.overallInterCnt==3){
						(a.certOderNo<=latestAudit.certOderNo) && (additionalReissue2.length==0) ? additionalReissue2={0:a}:'';
					}
					else if(a.overallInterCnt==4){
						(a.certOderNo<=latestAudit.certOderNo) && (additionalReissue3.length==0) ? additionalReissue3={0:a}:'';
					}
					}
					
					if(newCertificate.length == 0)	{
						
						if(a.certIssueId == certificaIssueId && reIssue){
	
							a.withoutCross = true;
							}else{
							a.withoutCross = false;
							}
						
						var copyData = angular.copy(a);
						copyData.withoutIntermediate = true;
						newCertificate.push(copyData);
					}
				}
				
			});	
			console.log("DetailscertDetails",result);
			console.log("newCertificate",newCertificate);
			
			certDetails.signature = result;
			
			// $scope.qrString = CERTI_URL + res.companyId +'?Cqid='+ newCertificate[0].qid;
			var certificateDatas={
	
					'certificateNo' :newCertificate[0].certificateNo,
					'AuditTypeId'   :newCertificate[0].auditTypeId,
					'AuditStatusId' :newCertificate[0].auditStatusId,
					'vesselName'    :newCertificate[0].vesselName,
					'officialNo'    :newCertificate[0].officialNo,
					'distinletter'  :newCertificate[0].officialNo,
					'vesselImoNo'   :newCertificate[0].vesselImoNo,
					'CompanyId'		:newCertificate[0].companyId,
					'AuditSeqNo'	:newCertificate[0].auditSeqNo,
					'UserIns'		:'BSOL',
					'grt'			:newCertificate[0].grt,
					'DateIns'		:moment(new Date()).format(MMMDDYYYY),
					'portofreg'		:newCertificate[0].portOfRegistry,
					'shiptype'      :newCertificate[0].vesselType,
					'currInitialPage':currInitialPage,
					'companyaddress':newCertificate[0].vesselCompanyAddress,
					'companyname'   :newCertificate[0].vesselCompanyName,
					'companyimono'  :newCertificate[0].companyImoNo,
					'expirydate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
					'auditplace'	:newCertificate[0].auditPlace,
					'certissuedate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
					'auditSubTypeId':newCertificate[0].withoutIntermediate == true ? 1002 : newCertificate[0].auditSubTypeId,
					'AuditDate'		:newCertificate[0].auditDate,
					'ispsPreviousIssueDate'  : newCertificate[0].prevAuditIssueData,
					'consecutiveId'	: newCertificate[0].consecutiveId,
					'auditDate'     :newCertificate[0].auditDate,
									'LeadAuditorSign':newCertificate[0].issuerSign,
									'headSubTitleism' :'Issued under the provisions of the International Convention for the Safety',
									'headSubTitleism1':'of Life at Sea, 1974(SOLAS), as amended',
									'certify':'THIS IS TO CERTIFY THAT',
									'res':newCertificate[0],
									'intermediate':intermediate1,
									'additional1':additional1,
									'additional2':additional2,
									'additional3':additional3,
									'LeadAuditorName':newCertificate[0].issuerName,
									'headSubTitleisps':'Issued under the provisions of the International Code for the Security',
									'headSubTitleisps1':'of Ships and of Port Facilities (ISPS Code)',
								//	'previousexpirydate':moment(det.previousAudit.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'),
									'headSubTitlemlc':'Issued under the provisions of Article V and Title 5 of the Maritime Labour Convention, 2006',
									'HeadSubTitle':'(Note: This Certificate shall have a Declaration of Maritime Labour Compliance attached.)',
									'headSubTitle2':"(referred to below as the “Convention”)",
									'signaturetext'	:'Signature of the Duly Authorized Official Issuing the Certificate.',
									'sealcontent'	:'(Seal or stamp of issuing authority, as appropriate)',
									'certificateVer':newCertificate[0].certificateVer,
									'utn':newCertificate[0].utn,
									'qrCodeUrl':CERTI_URL + newCertificate[0].qid,
									'intermediateIssue':(intermediate1[0])?intermediate1[0].certIssueDate:'',
									'intermediateExpiry':(intermediate1[0])?intermediate1[0].certExpireDate:'',
									'intermediatePlace':(intermediate1[0])?intermediate1[0].auditPlace:'',
									'intermediateLeadSign':	(intermediate1[0])?intermediate1[0].issuerSign:'',
									'interSignDate':	(intermediate1[0])?intermediate1[0].issuerSignDate:'',
									'qrCodeData' : response.data,
									'dateOfReg': newCertificate[0].dateOfRegistry,
									'renewalEndorse2':renewalEndorse2,
									'extension':extension,
									'seal':newCertificate[0].seal ? newCertificate[0].seal : certDetails.seal,
									'title':newCertificate[0].title ? newCertificate[0].title : certDetails.title,
									'voluntaryCert':certDetails.certDownType=='vol'?true:false,
											'additionalReissue1':additionalReissue1,
											'additionalReissue2':additionalReissue2,
											'additionalReissue3':additionalReissue3,
											'certificateDetails':result,
											'intermediateReissue':intermediateReissue1,
											'crossLineStatus':txt,
											'getEndrosedCountLatest':getEndrosedCountLatest,
											'currentCertiObj':res
			} 
				console.log("INITIAL AUDIT DATE TRIGGERD");
				var a = result ?  _.min(result, function(find){  return   find.auditSeqNo; }) : '';
				certificateDatas.auditDate = a.auditDate;
				console.log(certificateDatas);
	
			console.log(certificateDatas.qrCodeUrl);
			var certificate;
	
			$timeout(function(){
				/*var QrCs = "";
				if(window.navigator.msSaveOrOpenBlob){
					QrCs = document.getElementsByTagName("qr")[0].children[1].src;
				}else{
					QrCs = document.getElementById('qrC').childNodes[2].currentSrc;
				}
				*/
				if (certificateDatas.AuditTypeId == AppConstant.ISM_TYPE_ID) {
					
				//	certificateDatas.QrC = QrCs;
					var certificate = auditService.ismPdfService(certificateDatas);
					
				} else if (certificateDatas.AuditTypeId == AppConstant.ISPS_TYPE_ID) {
					
				//	certificateDatas.QrC = QrCs;
					certificate = auditService.ispsPdfService(certificateDatas);
					
				} else if (certificateDatas.AuditTypeId == AppConstant.MLC_TYPE_ID) {
					
				//	certificateDatas.QrC = QrCs;
					certificate = auditService.mlcPdfService(certificateDatas);
				}
				if(certificateDatas.voluntaryCert){
		            var certNo = certificateDatas.certificateNo
		                        .replace("E", "EV")
		                        .replace("F", "FV")
		                        .replace("G", "GV")
		                        .replace("H", "HV")
		                        .replace("I", "IV")
		                        .replace("J", "JV");
		            pdfMake.createPdf(certificate).download(''+ certNo+ '.pdf');
		        }
		        else{
		            pdfMake.createPdf(certificate).download(''+ certificateDatas.certificateNo+ '.pdf');
		        }
				
				
				blockUI.stop();
				toaster.success('Certificate downloaded successfully');
				
				},2000);}
    	
    /*	function downloadFile(blob, fileName) {
    		 console.log("enter download blob");
		  var link = document.createElement('a'); // create a blobURI pointing to our Blob

		  link.href = URL.createObjectURL(blob);
		  link.download = fileName; // some browser needs the anchor to be in the doc

		  document.body.append(link);
		  link.click();
		  link.remove(); // in case the Blob uses a lot of memory

		  window.addEventListener('focus', function (e) {
		    return URL.revokeObjectURL(link.href);
		  }, {
		    once: true
		  });
		  console.log("end download blob");
		  toaster.success('Certificate downloaded successfully');
	}
    	
    	function converBase64toBlob(content, contentType) {
    		console.log("enter convert64");
	    	  contentType = contentType || '';
	    	  var sliceSize = 512;
	    	  var byteCharacters = window.atob(content); //method which converts base64 to binary
	    	  var byteArrays = [
	    	  ];
	    	  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    	    var slice = byteCharacters.slice(offset, offset + sliceSize);
	    	    var byteNumbers = new Array(slice.length);
	    	    for (var i = 0; i < slice.length; i++) {
	    	      byteNumbers[i] = slice.charCodeAt(i);
	    	    }
	    	    var byteArray = new Uint8Array(byteNumbers);
	    	    byteArrays.push(byteArray);
	    	  }
	    	  var blob = new Blob(byteArrays, {
	    	    type: contentType
	    	  }); //statement which creates the blob
	    	  console.log("end convert64");
	    	  return blob;
	    	}*/
    	function setCertIssueExpiry(){
       
       	console.log(certDetails.orgCertificateDtl);
    		certDetails.getPreviousAuditCerData = angular.copy(auditFactory.getCertificateDetails()).previousAudit;
    		if(certDetails.certificateDtl.vesselImoNo){
    			certificateFactory.getAllCycleDate(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.vesselImoNo ,certDetails.certificateDtl.companyId).$promise.then(function(res) {
  				console.log(res);
  				certDetails.arrOfDate = res;
  				/* certDetails.arrOfDate=res.sort(function(a, b) {
  				    return parseFloat(a.cycleSeqNo) - parseFloat(b.cycleSeqNo);
  				});*/
  				console.log(certDetails.arrOfDate);
  				 if(certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED ){
  	    			  certDetails.certificateDtl.certExpireDate=certDetails.orgCertificateDtl.certExpireDate?certDetails.orgCertificateDtl.certExpireDate:certDetails.certificateDtl.certExpireDate;
  	    		  }
        		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
        		
        			if(certDetails.certificateDtl.closeMeetingDate){
        		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
        		
        			/*var seqNo =	_.max(certDetails.orgCertificateDtl.certificateDetail, function(find){  return   find.seqNo; });
          		
          			var extendedExpireDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
          		
    				 //certDetails.certificateDtl.extendedIssueDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(MMMDDYYYY);
    				 //certDetails.certificateDtl.extendedExpireDate= moment(moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
        			certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
     				certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.extendedExpireDate && certDetails.orgCertificateDtl.extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY)? moment(extendedExpireDate,YYYYMMDD).format(MMMDDYYYY): moment(extendedExpireDate,YYYYMMDD).format(MMMDDYYYY):moment(certDetails.orgCertificateDtl.certExpireDate, MMMDDYYYY).format(MMMDDYYYY);*/
        			 if(certDetails.orgCertificateDtl.certificateDetail){
 	          			var seqNo =	_.max(certDetails.orgCertificateDtl.certificateDetail, function(find){  return   find.seqNo; });
 	          			
 	          			var extendedExpireDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
 	          			var extendedIssueDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
 	     				 //certDetails.certificateDtl.extendedIssueDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(MMMDDYYYY);
 	     				 //certDetails.certificateDtl.extendedExpireDate= moment(moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
 	         			certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY)?moment(extendedIssueDate, YYYYMMDD).format(MMMDDYYYY) : moment(extendedIssueDate, YYYYMMDD).format(MMMDDYYYY):moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
 	      				certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.extendedExpireDate && certDetails.orgCertificateDtl.extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY)?moment(extendedExpireDate, YYYYMMDD).format(MMMDDYYYY) : moment(extendedExpireDate, YYYYMMDD).format(MMMDDYYYY):moment(certDetails.orgCertificateDtl.certExpireDate, MMMDDYYYY).format(MMMDDYYYY);
     				  }else{
     					  certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
     	                    //changes done by Kalirajan JIRA id-IRI-4593  03-01-2020
     	                     certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.extendedExpireDate && certDetails.orgCertificateDtl.extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certExpireDate,MMMDDYYYY).format(MMMDDYYYY);
     				  }
     			
        		}
        		else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){

    				// certDetails.certificateDtl.extendedIssueDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(MMMDDYYYY);
    				
        		//certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
        			 certDetails.certificateDtl.extendedIssueDate =res ? certDetails.arrOfDate.length>0 ? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY): '' : '';
        			certDetails.certificateDtl.extendedExpireDate=res ? certDetails.arrOfDate.length>0 ? moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY) : '' : '';
        			// certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    			 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){

    				// certDetails.certificateDtl.extendedIssueDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(MMMDDYYYY);
    				
        		//certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
        			 certDetails.certificateDtl.extendedIssueDate =res ? certDetails.arrOfDate.length>0 ? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY): certDetails.certificateDtl.certIssueDate : certDetails.certificateDtl.certIssueDate;
        			certDetails.certificateDtl.extendedExpireDate=res ? certDetails.arrOfDate.length>0 ? moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY) : certDetails.certificateDtl.certExpireDate : certDetails.certificateDtl.certExpireDate;
    			 }else if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    			
    				 if((certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].getInitialRenewalPublishCount && certDetails.orgCertificateDtl.certificateDetail[0].getInitialRenewalPublishCount!=undefined && certDetails.orgCertificateDtl.certificateDetail[0].getInitialRenewalPublishCount==1) || (certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.getInitialRenewalPublishCount==1)){
    						
    					
          				 certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate[0]? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
          				 certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate[0] ? moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
      				}else if(certDetails.orgCertificateDtl.audCertIssueDesc=="INTERMEDIATE ENDORSED" && certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.auditCycle && (certDetails.orgCertificateDtl.auditCycle.auditSubTypeCycleGen==1002 || certDetails.orgCertificateDtl.auditCycle.auditSubTypeCycleGen==1004)){
      					
      					certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
         				 certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate?moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
      				}else if(certDetails.arrOfDate && certDetails.arrOfDate.length>0 && (certDetails.arrOfDate[certDetails.arrOfDate.length-1].auditSubTypeCycleGen==1002 || certDetails.arrOfDate[certDetails.arrOfDate.length-1].auditSubTypeCycleGen==1004)){
      					
      					certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
        				 certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate?moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
      				}
      				else{
      				
      					if(certDetails.orgCertificateDtl.certificateDetail){
      						certDetails.orgCertificateDtl.certificateDetail[0].endorsedDate=moment(certDetails.orgCertificateDtl.certificateDetail[0].endorsedDate,YYYYMMDD).format(MMMDDYYYY);
      				
      					}
          				//certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate, YYYYMMDD).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.certificateDetail[0].endorsedDate, MMMDDYYYY).format(MMMDDYYYY);
          				//certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate, YYYYMMDD).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate, YYYYMMDD).format(MMMDDYYYY);
          				certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate != '' ?certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate, YYYYMMDD).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.certExpireDate, MMMDDYYYY).format(MMMDDYYYY);
						/* Start here for IRI-5023 added by sudharsan on 25-3-2022 */  
						if(certDetails.userRoleId=='1003' && certDetails.orgCertificateDtl.certificateDetail[0].certIssueDesc=="EXTENSION" &&certDetails.orgCertificateDtl.certificateDetail[1].certIssueDesc=="INTERMEDIATE ENDORSED"){
							certDetails.certificateDtl.extendedIssueDate = moment(certDetails.orgCertificateDtl.certificateDetail[0].certIssueDate, YYYYMMDD).format(MMMDDYYYY);			
						}
						else{
							certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate != '' ? certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate,YYYYMMDD).format(MMMDDYYYY):moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
						}
						/*End here for IRI-5023*/ 
      				}
      				}
           			
        		}
        		}
        		certDetails.certificateDtl.certReissueReason=1;  //changed by sudharsan for JIRA IRI-5248 
        		certDetails.setExtendedExpireDate();
    		});
    		}
        	}
    	function setDateAndDisableCertIssueExpiry(){ 

    		certDetails.minExtnCertIssueDate =certDetails.certificateDtl.extendedIssueDate? moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).format(YYYYMMDD):moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);

    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    			certDetails.disableIssue   = true;
    			certDetails.disableExpire  = true;
    			certDetails.disablExtnExpire = true;
    			
    			if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    				certDetails.enableCertType = [certDetails.AppConstant.INTERMEDAITE_ENDORSED, certDetails.AppConstant.RE_ISSUE ,certDetails.AppConstant.EXTENSION]
    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
    				certDetails.enableCertType = [certDetails.AppConstant.ADDITIONAL_ENDORSED, certDetails.AppConstant.RE_ISSUE,certDetails.AppConstant.EXTENSION]
    			}
    			
    			if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    				certDetails.setExtendedExpireDate();
    			} 
    		}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    			if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID){

    				certDetails.disableIssue   	 = false;
    				certDetails.disableExpire    = false;
    				certDetails.disablExtnExpire = true;

    				certDetails.minCertIssueDate = moment(certDetails.certificateDtl.closeMeetingDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.maxCertIssueDate = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.minCertExpireDate     = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
    				//certDetails.maxCertExpireDate     = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.setExpireDate();
    			
    				
    				certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT,certDetails.AppConstant.RE_ISSUE];

    			}else if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){

    				certDetails.disableIssue   = true;
    				certDetails.disableExpire  = true;
    				certDetails.disablExtnExpire = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID ? false : true;
    				certDetails.minExtnCertIssueDate =certDetails.certificateDtl.extendedIssueDate? moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).format(YYYYMMDD):moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).format(YYYYMMDD);

    				certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT,certDetails.AppConstant.RE_ISSUE];

    				if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE)){
    					
    					certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION);
    				}

    			}

    		}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){

    			if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID){

    				certDetails.disableIssue   	 = false;
    				certDetails.disableExpire    = false;
    				certDetails.disablExtnExpire = true;
    				certDetails.minCertIssueDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.maxCertIssueDate = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.minCertExpireDate     = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);;
    				
    				/*if(!certDetails.certDetails.checkExpiryDateValidation ){
    				certDetails.maxCertExpireDate     = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				}*/
    				certDetails.setExpireDate();

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){
    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RE_ISSUE];
    				}

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					 if(certDetails.Stateflag){
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    					
    				}

    				if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2){
    					certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    					certDetails.maxCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate ? certDetails.validateExpiryDate : certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    				}

    				/*if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
    	    				certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION);
    	    			}*/

    			}else if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){

    				certDetails.disableIssue   = true;
    				certDetails.disableExpire    = true;
    				certDetails.disablExtnExpire = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? true : false;
    				certDetails.minExtnCertIssueDate =certDetails.certificateDtl.extendedIssueDate? moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).format(YYYYMMDD):moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				
    				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).format(YYYYMMDD);

    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RE_ISSUE];
    				
    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					 if(certDetails.Stateflag){
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    					
    				}
    				
    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
    					certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION);
    				}
    				if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1){
    					certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    					certDetails.maxCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    	    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate ? certDetails.validateExpiryDate : certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    		
    				}
    			}			
    		}
    		
    		if(((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE)
    				|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2 ){
    			
    			
    			if(!certDetails.certificateDtl.endorsedDate){
    				
    				//certDetails.certificateDtl.endorsedDate = moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    				certDetails.certificateDtl.endorsedDate=certDetails.certificateDtl.auditDate;
    			}
    		}
    		
    	}// end of setDateAndDisableCertIssueExpiry
    	
    	function onChangeIssueType(){
    		

    		/*var signtoPrint=document.getElementById("signPrint");
    		signtoPrint.selectedIndex = 1;
    		
    		var opts = signtoPrint.options;
    		console.log()
    		  for (var opt, j = 0; opt = opts[j]; j++) {
    		    if (opt.value == "string:1") {
    		    	signtoPrint.selectedIndex = j;
    		      break;
    		    }
    		  }
    		     
    		var nametoPrint=document.getElementById("printedName");
    		nametoPrint.selectedIndex = 1;*/
    		var changedCertificateId = sessionStorage.getItem('managerSearch');
    		if(changedCertificateId && certDetails.managerSearch){
    			if(changedCertificateId=='EXTENSION')
    				certDetails.certificateDtl.certIssueId =1003;
    			if(changedCertificateId=='RE-ISSUE/ADMINISTRATIVE')
    				certDetails.certificateDtl.certIssueId =1008;
    			if(changedCertificateId=='RENEWAL_ENDORSED')
    				certDetails.certificateDtl.certIssueId =1006;
    			
    		}
    		
    		certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.certIssueId == '' || certDetails.certificateDtl.certIssueId==null ?certDetails.orgCertificateDtl.certIssueId : certDetails.certificateDtl.certIssueId;
    	
    		
    		if(certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RE_ISSUE){
    			
    			
//    			  if(certDetails.dynamicMsg && certDetails.dynamicMsg != ''){
//					  console.log(certDetails.latestVesselDetail)
//	 	    			console.log(certDetails.enableCertType);
//		   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].companyAddress;
//		  				
//					  	certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].customerName;
//					  
//		   	       		certDetails.certificateDtl.docExpiry = moment(certDetails.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY');
//		  				
//	    	   	    	certDetails.certificateDtl.docIssuer = certDetails.latestVesselDetail[0].docIssuer;
//	    	  			
//	    	   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
//	    	  				
//		   	       		certDetails.certificateDtl.dateOfRegistry = moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
//		   	       		
//		   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
//		   	       		
//		   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
//		  				
//		   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
//		   	       		
//		   	       		certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
//		   	       		
//		   	       		certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselID;
//				  }
   			  
    			 
    			if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    				certDetails.certificateDtl.consecutiveId=1000;
    				certDetails.subInterimDate='N.A'
    				console.log(certDetails.certificateDtl.certIssueDate)
    				certDetails.certificateDtl.completionDate = certDetails.subInterimDate;
    				certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
    			}
    			
    		}
    		console.log(certDetails.prevcompletionDate)
    		if(certDetails.prevDmlcIssueDate)
    			certDetails.certificateDtl.dmlcIssueDate = certDetails.prevDmlcIssueDate;
    		if(certDetails.prevDmlcIssuePlace)
    			certDetails.certificateDtl.dmlcIssuePlace = certDetails.prevDmlcIssuePlace;
    		if(certDetails.prevcompletionDate)
    			certDetails.certificateDtl.completionDate = certDetails.prevcompletionDate;
    		if(certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RE_ISSUE){
         		certDetails.enableCompletionDate=false;
         	}
    		if((certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1)
					|| (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2)
					|| (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION))
    		{
    			certDetails.enableCompletionDate=true;
    		}

    		if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1){

    			var prevIssueDate;
    			var prevExpiryDate; 
    			
    			
    			if(certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail.length >0 ){

    				prevIssueDate =	_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length}).pluck("extendedIssueDate").toString() ?
    						moment( _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length}).pluck("extendedIssueDate").toString(), YYYYMMDD).format(MMMDDYYYY)	
    						: moment( _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length}).pluck("certIssueDate").toString(), YYYYMMDD).format(MMMDDYYYY);

    				prevExpiryDate =	_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length}).pluck("extendedExpireDate").toString() ?
    								moment( _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length}).pluck("extendedExpireDate").toString(), YYYYMMDD).format(MMMDDYYYY)	
    								: moment( _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':certDetails.orgCertificateDtl.certificateDetail.length}).pluck("certExpireDate").toString(), YYYYMMDD).format(MMMDDYYYY);
    			}else{
    				prevIssueDate = certDetails.orgCertificateDtl.extendedIssueDate ? certDetails.orgCertificateDtl.extendedIssueDate : certDetails.orgCertificateDtl.certIssueDate;
    				prevExpiryDate = certDetails.orgCertificateDtl.extendedExpireDate ? certDetails.orgCertificateDtl.extendedExpireDate : certDetails.orgCertificateDtl.certExpireDate;
    			
    			
    			}
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
        	
        			certDetails.setCertIssueExpiry();
        	
        			}else{
        				
    			certDetails.certificateDtl.extendedIssueDate =prevIssueDate;
    			certDetails.certificateDtl.extendedExpireDate =prevExpiryDate;
    		
        			}
    		
    		}else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2){
    		
    			getPrevioiusCertDtlsForRenewal();
    			
    		}

    		if( certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION ){

    			certDetails.certificateDtl.auditDate = certDetails.orgCertificateDtl.auditDate;
    			certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.dateOfRegistry? certDetails.orgCertificateDtl.dateOfRegistry: "";
//    			certDetails.certificateDtl.grt = certDetails.orgCertificateDtl.grt;
//    			certDetails.certificateDtl.portOfRegistry = certDetails.portOfRegistry ? certDetails.portOfRegistry : certDetails.orgCertificateDtl.portOfRegistry;
    			
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    			
    			//setVesselHistory(certDetails);
    			detailsFactory.vesselDetails(certDetails.certificateDtl.companyId,sessionStorage.getItem('emailId'),certDetails.certificateDtl.vesselImoNo,'vesselImoNo').$promise.then(function(res){
        			console.log(res);
        			var autoVessel = res[0];
    				
    				autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
        			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
        			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    				
    				detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
    					console.log(result)
    				});
        			certDetails.latestVesselDetail = angular.copy(res);
        			
	    			console.log(certDetails.latestVesselDetail)
		    			
	   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].companyAddress;
	  				
	    			certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].customerName;
	    			
	   	       		certDetails.certificateDtl.docExpiry = certDetails.latestVesselDetail[0].docExpiry ? moment(certDetails.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY'): "";
	  				
		   	    	certDetails.certificateDtl.docIssuer = certDetails.latestVesselDetail[0].docIssuer;
		  			
		   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
		  				
	   	       		certDetails.certificateDtl.dateOfRegistry = certDetails.latestVesselDetail[0].registrationDate ? moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY'): "";
	   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
	   	       		
	   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
	  				
	   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
	   	       		
	   	       		certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
		       	    
		       	    certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselID;
    			});
    		}
    		else {
    			 if(certDetails.orgVesselName && certDetails.orgVesselName != ''){
    			certDetails.certificateDtl.vesselCompanyAddress = certDetails.orgVesselCompanyAddress;
  				
    			certDetails.certificateDtl.vesselCompanyName = certDetails.orgVesselCompanyName
    			
   	       		certDetails.certificateDtl.docExpiry =certDetails.certificateDtl.docExpiry ? certDetails.orgDocExpiry:'';
  				
	   	    	certDetails.certificateDtl.docIssuer = certDetails.orgDocIssuer;
	  			
	   	       	certDetails.certificateDtl.vesselName =  certDetails.orgVesselName;
	  				
   	       		certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.dateOfRegistry ? certDetails.orgCertDor:"";
   	       		certDetails.certificateDtl.vesselType = 	certDetails.orgVesselType;
   	       		
   	       		certDetails.certificateDtl.companyImoNo = certDetails.orgCompanyImoNo;
  				
   	       		certDetails.certificateDtl.grt = certDetails.orgCertGrt;
   	       		
   	       		certDetails.certificateDtl.portOfRegistry = certDetails.orgPor;
       	    
   	       		certDetails.certificateDtl.vesselId = certDetails.orgVesselId;
    			 }		
    		}

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){
    			certDetails.onchangeReissueName = 'Issue Date';
    			certDetails.onchangeReissueExpireName = 'Extended Expiry Date';
    			certDetails.certificateDtl.extendedEndorsedDate = certDetails.certificateDtl.extendedEndorsedDate ? certDetails.certificateDtl.extendedEndorsedDate : moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    			/*console.log(certDetails.extDataCert);
					var extDataCendorsed=certDetails.extDataCert.auditDetail.certificateDetail;
					console.log(extDataCendorsed);
					 var extOrderNo=0;
					 var extEndDate;
					 extDataCendorsed.forEach(function(a){
							if(a.certIssueId==1003){//reissue and extension
								if(a.certOderNo>extOrderNo){
									extOrderNo=a.certOderNo;
									extEndDate=a.extendedEndorsedDate;
								}
							}
						
						});
					 certDetails.certificateDtl.extendedEndorsedDate = extEndDate ? moment(extEndDate).format('DD-MMM-YYYY') : moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');*/

    			if(!certDetails.preventOnChange){
    			reIssueOfCertificate();
    			
    			}
    			certDetails.preventOnChange = false;
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1){
    		
    			certDetails.certificateDtl.endorsedDate = certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : certDetails.certificateDtl.auditDate;
    			certDetails.onchangeReissueName = 'Reissue Certificate Date';
    			certDetails.onchangeReissueExpireName = 'Expiration Date';
    			reIssueOfCertificate();
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2){
    			
    			certDetails.certificateDtl.endorsedDate =  certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : certDetails.certificateDtl.auditDate;
    			certDetails.onchangeReissueName = 'Reissue Certificate Date';
    			certDetails.onchangeReissueExpireName = 'Expiration Date';
    			reIssueOfCertificate();
    		}else{
    			certDetails.certificateDtl.extendedEndorsedDate = '';
    		}

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    			certDetails.onchangeReissueName = 'Reissue Certificate Date';
    			certDetails.onchangeReissueExpireName = 'Expiration Date';
    			certDetails.maxExtnCertExpireDate = certDetails.validateExpiryDate;
    			reIssueOfCertificate();
    		}

    		validateIssueExpiryDate();
    		
    		certDetails.certificateDtl.nameToPrint='1';
			
			certDetails.certificateDtl.signToPrint='1';
			 if(certDetails.certificateDtl.auditSubTypeId==certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
			
				 certDetails.checkRenewalType();
			 }
			 
			 console.log((certDetails.certificateNotPublish && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) || certDetails.checkNxtAuditCreate || certDetails.disableAll || certDetails.disableGenerate || certDetails.disableCertIssueTypeId)
			 
			 console.log((certDetails.checkExtensionInInterOrAdd==1 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION))
			 
			 if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
 				
 				if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD) == moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
 					toaster.info('Validity of the certificate is exactly 5 Years');
    			 }	
 			}
			 
			 
			 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){			
				if(certDetails.prevAuditDetls.prevAuditDtl[1].auditSubTypeId==certDetails.AppConstant.FULL_TERM_CERT && certDetails.prevAuditDetls.prevAuditDtl[0].certificateDetail[0].certIssueId== certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId== certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.prevAuditDetls.prevAuditDtl[1].auditSubTypeId==certDetails.AppConstant.FULL_TERM_CERT && certDetails.prevAuditDetls.prevAuditDtl[0].certificateDetail[0].certIssueId== certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certIssueId== certDetails.AppConstant.ADDITIONAL_ENDORSED){					
					 certDetails.certificateDtl.certIssueDate=  certDetails.oldVesseldata.certIssueDate;
					 certDetails.certificateDtl.certExpireDate=certDetails.certificateDtl.extendedExpireDate;
					 
				 }
				
				//if(certDetails.prevAuditDetls.prevAuditDtl[certDetails.prevAuditDetls.prevAuditDtl.length-1].certificatedeatil == 1008)					 
				
			 } 
			 

			 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
				 certDetails.prevAuditDetls.prevAuditDtl.forEach(function(a){
					 a.certificateDetail.forEach(function(b){
						 var certOrder_no=0;
						 if(b.certIssueId== certDetails.AppConstant.RE_ISSUE  &&  certOrder_no<b.certOderNo){
							 certOrder_no=b.certOderNo;
							 certDetails.certificateDtl.docExpiry=  b.docExpiry;
							 certDetails.certificateDtl.docExpiry= moment(certDetails.certificateDtl.docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY');			 
						 }
					 });
					 
				 });
			 }
			 /**added by sudharsan for IRI-5039 */
			 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
				certDetails.certificateDtl.extendedExpireDate=moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),MMMDDYYYY).subtract(1,'days').format(MMMDDYYYY);
			 }
    	}
    	
  
    	 function setVesselHistory(certDetailsVess){
			 console.log(certDetails)
			 var parameter = {
						'auditSeqNo' : certDetailsVess.auditSeqNo,
						'vesselImoNo' : certDetailsVess.vesselImoNo,
						'vesselNameAud' : certDetailsVess.vesselName,
						'vesselTypeAud' : certDetailsVess.vesselType,
						'grt' : certDetailsVess.grt,
						'companyImoNo' : certDetailsVess.companyImoNo,
						'dateOfRegistry' : certDetailsVess.dateOfRegistry ? moment(certDetailsVess.dateOfRegistry, YYYYMMDD ,true).isValid() ? certDetailsVess.dateOfRegistry : moment(certDetailsVess.dateOfRegistry,'DD-MMM-YYYY').format('YYYY-MM-DD') :"",
						'docIssuerAud' : certDetailsVess.docIssuer,
						'docExpiryAud' : certDetailsVess.docExpiry ? moment(certDetailsVess.docExpiry, YYYYMMDD ,true).isValid() ? certDetailsVess.docExpiry : moment(certDetailsVess.docExpiry,'DD-MMM-YYYY').format('YYYY-MM-DD') :"",
						'vesselAdrress' :certDetailsVess.vesselCompanyName + '\n' + certDetailsVess.vesselCompanyAddress,
						'dateIns' : moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),
						'vesselId'	: certDetailsVess.vesselId,
						'vesselCompanyName' :certDetailsVess.vesselCompanyName,
						'portOfRegistry' :certDetailsVess.portOfRegistry,
						'companyAddress' : certDetailsVess.vesselCompanyAddress,
						'keelLaidDate' :certDetailsVess.keelLaidDate ?  moment(new Date(certDetailsVess.keelLaidDate),'DD-MMM-YYYY').format('YYYY-MM-DD') : '',
						'regOwnedImoNo' : certDetailsVess.regOwnedImoNo,
						'registeredCompanyAddress' : certDetailsVess.registeredCompanyAddress ? certDetailsVess.registeredCompanyAddress : '',
						'registeredCompanyName' : certDetailsVess.registeredCompanyName ? certDetailsVess.registeredCompanyName : '',
						'statusUpdate' : 'vesselHistory'
					};
   	       		 		certDetails.vesselHistory.push(parameter);
   	       		 		
		 }
    	 
    	 function checkVesselHistory(rmiData,LocalVesData){
	    	 
	    	 var count = 0;
	    	 
				if(rmiData.vesselCompany.vesselCompanyAddress != LocalVesData.vesselCompanyAddress)
	   			 count++;
				
				if(rmiData.vesselCompany.vesselCompanyName != LocalVesData.vesselCompanyName)
		 			count++;
				
	       		 if(moment(rmiData.vesselCompany.docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') != moment(LocalVesData.docExpiry,'DD-MMM-YYYY').format('DD-MMM-YYYY'))
	       			 count++;
				
	       		 if(rmiData.vesselCompany.docIssuer != LocalVesData.docIssuer)
	       			 count++;
	       		 
	       		 if(rmiData.vesselName != LocalVesData.vesselName)
	       			 count++;
				
	       		if(moment(rmiData.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY') != moment(LocalVesData.dateOfRegistry,'DD-MMM-YYYY').format('DD-MMM-YYYY'))
	       			count++;
	       		
	       		if(rmiData.vesselType.toUpperCase().trim() != LocalVesData.vesselType.toUpperCase().trim())			//changed by @Ramya on 08-08-2022 for jira id - 5414
	       			count++;
	       		
	       		if(rmiData.vesselCompany.companyImoNo != LocalVesData.companyImoNo)
	       			count++;
	       				 
	       		if(rmiData.grt != LocalVesData.grt)
	       			count++;
				
				if(rmiData.portOfRegistry != LocalVesData.portOfRegistry)
		 			count++;
				
				return count;
	       		
	     }
    	
    	function getPrevioiusCertDtlsForRenewal(){

  
   
    		var checkFulltermPresent = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_CERT ,'publishStatus' : 1}).pluck("certIssueId").toString() ? true : 
    			(certDetails.orgCertificateDtl.certIssueId == 1002 && certDetails.orgCertificateDtl.publishStatus ==1 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID ? true : false);
    		    		
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && certDetails.leadStatus && !checkFulltermPresent && certDetails.renewalfulltermPublish){

    			if((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) <= 0 || ((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) == 1 && (certDetails.orgCertificateDtl.certificateDetail[0] ? certDetails.orgCertificateDtl.certificateDetail[0].certIssueId : 0) == certDetails.AppConstant.FULL_TERM_CERT)){

    				if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2 && (certDetails.certificateDtl.checkRenEndrosAftFullTerm ? certDetails.certificateDtl.checkRenEndrosAftFullTerm : 0) == 0){
    					console.log(certDetails.getPreviousAuditCerData)
    					certDetails.certificateDtl.utn = certDetails.getPreviousAuditCerData.certificateDetail[0].utn;
    					certDetails.certificateDtl.certificateNo = certDetails.getPreviousAuditCerData.certificateDetail[0].certificateNo;
    					certDetails.certificateDtl.extendedExpireDate =	certDetails.renewalExtendedExpiryDate ? certDetails.renewalExtendedExpiryDate : (certDetails.certificateDtl.extendedExpireDate ? certDetails.certificateDtl.extendedExpireDate : (certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate ? moment(certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY)));
    					certDetails.certificateDtl.extendedIssueDate = certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate ? moment(certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certIssueDate,YYYYMMDD).format(MMMDDYYYY); 
    					certDetails.minExtnCertExpireDate = certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate ? certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate : certDetails.getPreviousAuditCerData.certificateDetail[0].certIssueDate;
    					certDetails.maxExtnCertExpireDate =  moment(moment((certDetails.renewalExtendedExpiryDate ? certDetails.renewalExtendedExpiryDate : (certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate ? moment(certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY))), MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					/*here serverSide Concatinating QID and save with certificate data*/
    					certDetails.certificateDtl.qrCodeUrl = CERTI_URL+certDetails.certificateDtl.companyId+"?Cqid=";
    					certDetails.certificateDtl.endorsedDate = certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : certDetails.certificateDtl.auditDate;
    					
    					certDetails.certificateDtl.certIssueDate = moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certIssueDate,YYYYMMDD).format(MMMDDYYYY);
    		    		certDetails.certificateDtl.certExpireDate = moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY);    		    		

    				
    				}else if(certDetails.certificateDtl.audCertIssueDesc == "RENEWAL ENDORSED (ISM Part B 13:13)"){

    					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT){
    						
    						renewalFulltermCertDtls();
    					}

    				}else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT){
    				
    					renewalFulltermCertDtls();

    				}
    			}else{

    				if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT){
    					
    					renewalFulltermCertDtls();
    				}else{
    					
    					certDetails.certificateDtl.certificateNo = certDetails.orgCertificateDtl.certificateNo;
    					certDetails.certificateDtl.extendedExpireDate = certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY); 
    					certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certificateDetail[0].certIssueDate,YYYYMMDD).format(MMMDDYYYY); 
    					certDetails.certificateDtl.endorsedDate = certDetails.orgCertificateDtl.certificateDetail[0].endorsedDate ?  moment(certDetails.orgCertificateDtl.certificateDetail[0].endorsedDate,YYYYMMDD).format(MMMDDYYYY) :certDetails.certificateDtl.auditDate;

    					certDetails.certificateDtl.certIssueDate = moment(certDetails.orgCertificateDtl.certificateDetail[0].certIssueDate,YYYYMMDD).format(MMMDDYYYY);
    		    		certDetails.certificateDtl.certExpireDate = moment(certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY);    		    		

    				
    					if(certDetails.certificateDtl.publishStatus == 0){

    						certDetails.minExtnCertExpireDate = certDetails.orgCertificateDtl.certificateDetail[0].certIssueDate;
    						certDetails.maxExtnCertExpireDate =  moment(moment(certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate, YYYYMMDD).add(5,'months'),MMMDDYYYY).subtract(1,'days').format(MMMDDYYYY);

    					}else{
    						certDetails.minExtnCertExpireDate = certDetails.certificateDtl.extendedIssueDate;
    						certDetails.maxExtnCertExpireDate =  moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);

    					}

    				}

    			}
    		}else{
    			
    			certDetails.certificateDtl.extendedIssueDate =certDetails.certificateDtl.extendedIssueDate?certDetails.certificateDtl.extendedIssueDate:certDetails.certificateDtl.certIssueDate;
    			certDetails.certificateDtl.extendedExpireDate =certDetails.certificateDtl.extendedExpireDate?certDetails.certificateDtl.extendedExpireDate:certDetails.certificateDtl.certExpireDate;
    		
    		}
    	}
    	
    	function renewalFulltermCertDtls(){
    	
    			
    		if(!certDetails.checkRenewalGenerate){
        		
        		console.log(certDetails.certificateDtl);
        		certDetails.certificateDtl.certIssueDate = certDetails.orgCertificateDtl.certificateDetail ? 
        				(_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_CERT ,'publishStatus' : 0}).pluck("certIssueId").toString() ? 
        						moment(_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_CERT ,'publishStatus' : 0}).pluck('certIssueDate').toString(),YYYYMMDD).format(MMMDDYYYY) 
        						: moment(moment(certDetails.certificateDtl.creditDate, MMMDDYYYY)).format(MMMDDYYYY)) : 
        							(certDetails.orgCertificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT ?  certDetails.orgCertificateDtl.certIssueDate :
        								moment(moment(certDetails.certificateDtl.closeMeetingDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY));
        		
        	
    		}else{
        		
        		certDetails.certificateDtl.certIssueDate = certDetails.generateCertIssueDate ? certDetails.generateCertIssueDate : moment(moment(certDetails.certificateDtl.closeMeetingDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
        	
        	}
    		
    
    		certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate?certDetails.certificateDtl.certExpireDate:'';
    				//moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):'';
    		
    		certDetails.minCertIssueDate = moment(moment(certDetails.certificateDtl.closeMeetingDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);;
    		certDetails.maxCertIssueDate = certDetails.certificateDtl.certExpireDate;
    		certDetails.minCertExpireDate = certDetails.certificateDtl.certIssueDate;
    		certDetails.maxCertExpireDate = certDetails.certificateDtl.certExpireDate;

    		if(certDetails.renewalFulltermcertFlag){

    			detailsFactory.getNewCertificateNo(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.companyId).$promise.then(function(res){
    				
    				certDetails.certificateDtl.certificateNo = res.data;
    				certDetails.certificateNum = res.data;

    			});  
    			
    			certificateFactory.getUTN().$promise.then(function(resUtn){

    				certDetails.certificateDtl.utn = resUtn.utnString;
    				certDetails.certificateDtl.qrCodeUrl = CERTI_URL+certDetails.certificateDtl.companyId + "?Cqid=";
    				certDetails.certificateUtn = resUtn.utnString;
    				certDetails.certificateqrCodeUrl = CERTI_URL+certDetails.certificateDtl.companyId + "?Cqid=";
    				
    			});

    			certDetails.renewalFulltermcertFlag = false;

    		}else{

    			certDetails.certificateDtl.certificateNo = certDetails.certificateNum;
    			certDetails.certificateDtl.utn = certDetails.certificateUtn;
    			certDetails.certificateDtl.qrCodeUrl = certDetails.certificateqrCodeUrl;
    		}	

    	}
    	
    	
    	function validateIssueExpiryDate(){

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2){

    			if(certDetails.Stateflag){					


    				if((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) > 1){

    					var seqLength = certDetails.orgCertificateDtl.certificateDetail.length;					
    					var extendedIssueDateArr = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('extendedIssueDate').toString();
    					var extendedExpiryDateArr = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('extendedExpireDate').toString();
    					var issueDateArr = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('certIssueDate').toString();
    					var expiryDateArr =  _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('certExpireDate').toString();

						certDetails.validateIssueDate = extendedIssueDateArr && extendedIssueDateArr != '' ? moment(extendedIssueDateArr, YYYYMMDD).format(MMMDDYYYY) : moment(issueDateArr, YYYYMMDD).format(MMMDDYYYY);
    					certDetails.validateExpiryDate = extendedExpiryDateArr && extendedExpiryDateArr != '' ? moment(extendedExpiryDateArr, YYYYMMDD).format(MMMDDYYYY): moment(expiryDateArr, YYYYMMDD).format(MMMDDYYYY) ;
    				
    				}else if ((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) == 0 && (((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE) || (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2))){
    					
    					certDetails.validateIssueDate =certDetails.orgCertificateDtl.certIssueDate;
    					certDetails.validateExpiryDate =certDetails.orgCertificateDtl.certExpireDate;
    					
    				}else if((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) == 0){
    					
    					certDetails.validateIssueDate = certDetails.orgCertificateDtl.certIssueDate;
    					certDetails.validateExpiryDate =  certDetails.orgCertificateDtl.certExpireDate;
    					
    				}else{
    					certDetails.validateIssueDate = certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate, YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certificateDetail[0].certIssueDate, YYYYMMDD).format(MMMDDYYYY);
    					certDetails.validateExpiryDate = certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate != '' ? moment( certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate, YYYYMMDD).format(MMMDDYYYY): moment(certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate, YYYYMMDD).format(MMMDDYYYY) ;
    				}
    			}else{
    				certDetails.validateIssueDate = certDetails.orgCertificateDtl.extendedIssueDate != '' ? certDetails.orgCertificateDtl.extendedIssueDate : certDetails.orgCertificateDtl.certIssueDate;
    				certDetails.validateExpiryDate = certDetails.orgCertificateDtl.extendedExpireDate != '' ? certDetails.orgCertificateDtl.extendedExpireDate : certDetails.orgCertificateDtl.certExpireDate;
    			}
    		}
    		  if(certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED ){
    			  certDetails.certificateDtl.certExpireDate=certDetails.orgCertificateDtl.certExpireDate?certDetails.orgCertificateDtl.certExpireDate:certDetails.certificateDtl.certExpireDate;
    		  }
    		if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    			certDetails.disableExpire = true;
    		}

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    				
    				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    				
    				certDetails.maxExtnCertIssueDate = certDetails.maxExtnCertExpireDate;
    			}
    		// added by kali for reissue extension expiry max date was not setting 6 more months
    		else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
				
				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
				
				certDetails.maxExtnCertIssueDate = certDetails.maxExtnCertExpireDate;
			}

    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1){
    			certDetails.disableExpire = false;

    			//    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
//    			certDetails.maxCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			certDetails.maxCertExpireDate = moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).format(YYYYMMDD);
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2){
    			    			
    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			certDetails.maxCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    			
/*if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    				
    				if(!certDetails.checkRefreshValue){
    				certDetails.checkRenewalType();}
    				
    			    			}else{*/
    			    			
    			    				certDetails.setExtendedExpireDate();
    			    				
    			    			//}
    			
//    			certDetails.maxExtnCertExpireDate = moment(certDetails.validateExpiryDate, MMMDDYYYY).format(YYYYMMDD);  
    			
    		}else{
    			
    			certDetails.certificateDtl.extendedEndorsedDate = '';
    		}

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED1 || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED2 || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){

    			if(certDetails.certificateDtl.publishStatus==1){    				
   				
    				certDetails.setExtendedExpireDate();
    				certDetails.minExtnCertIssueDate = moment(certDetails.validateIssueDate, MMMDDYYYY).format(YYYYMMDD);  
    				certDetails.maxExtnCertIssueDate = moment(certDetails.validateExpiryDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.minExtnCertExpireDate = moment(moment(certDetails.minExtnCertIssueDate, YYYYMMDD).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
					/**added by sudharsan for IRI-5039 start here */
					if(certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
						certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(8,'months'),DDMMYYYY).subtract(2,'days').format(YYYYMMDD);
					}
					else{
						certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD); //Added by sudharsan for Jira-ID=IRI-5695
						//certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
					}
    				/**end here IRI-5039 */
    				
    			}else{
    				
    				if(!certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
        				
    					certDetails.setExtendedExpireDate();}
    				//certDetails.minExtnCertIssueDate = moment(certDetails.validateIssueDate, MMMDDYYYY).format(YYYYMMDD);  
    				//certDetails.maxExtnCertIssueDate = moment(certDetails.validateExpiryDate, MMMDDYYYY).format(YYYYMMDD);
    				//certDetails.minExtnCertExpireDate = certDetails.minExtnCertIssueDate;
    			}
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION){
    			certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD); 
    			if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID ){
    				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);// Edited by sudharsan for IRI-5023 //Modified by sudharsan for Jira-ID = IRI-5692
    			}else if( certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID) {
    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			}
    			else {
        			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
        			}
    		}
    		
    		if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
				
    			certDetails.minCertIssueDate = moment(certDetails.certificateDtl.closeMeetingDate, MMMDDYYYY).format(YYYYMMDD);
				certDetails.maxCertIssueDate = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
				certDetails.minCertExpireDate     = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);;
				certDetails.maxCertExpireDate     = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
			
    		}
    		
    		if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    			
    			certDetails.certificateDtl.endorsedDate = '';
    			
    		}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
    			certDetails.certificateDtl.endorsedDate =certDetails.certificateDtl.auditDate;
    		}
    		
    		if(!certDetails.navigationScreen){
    			certDetails.checkCertDesc = certDetails.orgCertificateDtl.certIssueId;
    		}
    		    		
    		if(((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) == 0) && certDetails.orgCertificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && certDetails.orgCertificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2 && certDetails.certificateDtl.publishStatus == undefined){
			
			
    			certDetails.checkCertDesc = certDetails.certificateDtl.certIssueId;	
    			
			}
    		
    		if(certDetails.leadStatus){
    		
    			getPrevioiusCertDtlsForRenewal();
    		}
    		
    		 if(certDetails.nxtAuditInterOrAdd){
    			 
    			 certDetails.enableCertType = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? [certDetails.certificateDtl.certIssueId] : [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.EXTENSION];
					
				 if(!certDetails.nxtAuditCreate && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
			
					 certDetails.enableCertType = [certDetails.AppConstant.EXTENSION];	
					// certDetails.certificateDtl.extendedExpireDate = certDetails.previousCertExpiryDate ? certDetails.previousCertExpiryDate : certDetails.certificateDtl.extendedExpireDate ?  moment(certDetails.certificateDtl.extendedExpireDate).format(MMMDDYYYY) : moment(certDetails.certificateDtl.certIssueDate,YYYYMMDD).format(MMMDDYYYY) ; 
		    			//certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
		    		}
			 }
    		
    	}
    	
    	
    	function reIssueOfCertificate(){

    		if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID){
    			certDetails.userLoggedName = 'Admin Name';
    			certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    			certDetails.certificateDtl.issuerSign = '';
    		}else if(certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    			certDetails.userLoggedName = 'Manager Name';
    			certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    			certDetails.certificateDtl.issuerSign = '';
    		}else{
    			if(certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.MLC_TYPE_ID){
    				certDetails.userLoggedName = 'Auditor Name';
    			}else{certDetails.userLoggedName = 'Inspector Name';}
    			certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    		}

    		certDetails.certificateDtl.nameToPrint = '';
    		certDetails.certificateDtl.signToPrint = '';
    		certDetails.certificateDtl.issuerSignDate = '';
    		certDetails.certificateDtl.issuerSign = '';
			//Commented by sudharsan for Jira-ID = IRI-5678 Second scenario
    		//certDetails.certificateDtl.certReissueReason=1;  //changed by sudharsan for JIRA IRI-5248 
    	}
    	
    	function checkPreviousInitialaudit(flag){


    		certificateFactory.checkPreviousInitialaudit(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId, certDetails.certificateDtl.auditSubTypeId, certDetails.certificateDtl.auditSeqNo).$promise.then(function(res){


    			if(flag == 'Manager'){
    				    				
    				certDetails.nxtAuditCreate = res.nextAudit ? res.nextAudit : certDetails.nxtAuditCreate;

    				certDetails.disableReissue = res.disableReissue ? res.disableReissue : certDetails.disableReissue;
    				
    				certDetails.nxtAuditInterOrAdd = res.nxtAuditInterOrAdd ? res.nxtAuditInterOrAdd : certDetails.nxtAuditInterOrAdd;

    				certDetails.previousCertExpiryDate = res.previousCertExpiryDate ?  moment(res.previousCertExpiryDate,YYYYMMDD).format(MMMDDYYYY) : '';

    				certDetails.checkNxtAuditCreate =  res.checkNxtAuditCreate ?  res.checkNxtAuditCreate : certDetails.checkNxtAuditCreate;
    				
    				certDetails.disableAll = certDetails.nxtAuditCreate ? true : certDetails.nxtAuditCreate;
    				  
    				certDetails.managerDisableDropdown = res.managerDisableDropdown ? true : false;
    				
    				certDetails.directIntOrAdd = certDetails.directIntOrAdd ? true:false;
    				
    				 if(certDetails.nxtAuditInterOrAdd){
    					     				
    					 certDetails.enableCertType = certDetails.checkFullTermCertPresent == 1 ? (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.RE_ISSUE] : [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.EXTENSION,certDetails.AppConstant.RE_ISSUE]) : [certDetails.certificateDtl.certIssueId];
    					
    					 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    						 if(certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    							 certDetails.enableCertType = certDetails.checkFullTermCertPresent == 1 ? (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.RE_ISSUE] : [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.EXTENSION,certDetails.AppConstant.RENEWAL_ENDORSED1]) : [certDetails.certificateDtl.certIssueId];
    						 }
    						 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1 && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)
    							 certDetails.enableCertType=[certDetails.AppConstant.RENEWAL_ENDORSED1];
    					 }
    					 if(!certDetails.nxtAuditCreate && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    					
    						 certDetails.enableCertType = [certDetails.AppConstant.EXTENSION];
    					
    			    			//certDetails.certificateDtl.extendedExpireDate = certDetails.previousCertExpiryDate ? certDetails.previousCertExpiryDate : certDetails.certificateDtl.extendedExpireDate ;
    			    			certDetails.maxExtnCertExpireDate = certDetails.previousCertExpiryDate ? moment(moment(certDetails.previousCertExpiryDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).format(YYYYMMDD): certDetails.certificateDtl.extendedExpireDate ?  moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).format(YYYYMMDD): moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).format(YYYYMMDD);
    			    		}

    				 }
    				 if(res.initalCount == 0 && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID) &&  certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ){
    					 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.publishStatus == 1){
    						 certDetails.checkExtensionInInterOrAdd = 1;
    						 if(certDetails.managerSearch && !certDetails.disableGenerate)
    							 certDetails.checkExtensionInInterOrAdd = 0;
    					 }
    					 else {
    						 certDetails.checkExtensionInInterOrAdd = 0;
    					 }
    				 }
    				 certDetails.enableCertType =  res.initalCount == 0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID  && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? (res.intermCount == 0 ? [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.RE_ISSUE] : [certDetails.certificateDtl.certIssueId]) : certDetails.enableCertType;
    								 
    				 if(!(certDetails.nxtAuditInterOrAdd && certDetails.checkNxtAuditCreate) && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && certDetails.certificateDtl.publishStatus == 1 && !(certDetails.managerSearch)){
    					 certDetails.checkExtensionInInterOrAdd = 1;
    					 certDetails.preventOnChange = true;
    				 }
    				 
    			}else{

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    					if(res.initalCount > 0 || res.renewalCount > 0){
    						certDetails.enableCertType.push(certDetails.AppConstant.RE_ISSUE);
    						certDetails.initialAudit = false;

    					}else{
    						certDetails.enableCertType =  res.initalCount == 0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? (res.intermCount == 0 ? [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.RE_ISSUE] : [certDetails.certificateDtl.certIssueId]) : certDetails.enableCertType;
    						certDetails.initialAudit = true;
    					}
    				}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					certDetails.checkPrevRenewalIsFullterm = res.prevRenewalIsFullterm ? 1 : 0;
    					certDetails.checkPrevRenewalIsRenewalEndrosed = res.prevRenewalIsRenewalEndrosed ? 1 : 0;
    				}

    			}
    			certDetails.checkNxtInterOrAddiReissuePresent = ((certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && certDetails.nxtAuditInterOrAdd) || certDetails.disableReissue) ? 1 : 0;

				certDetails.certificateNotPublish = res.certificateNotPublish ? res.certificateNotPublish : false;

    		});
    	}
    	
    	function enableRenewalCertTypeVthSearchScreen(){
    
    		if(certDetails.orgCertificateDtl.getRenewalCertVal == 1){
				
				if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
					
					if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID){
						certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RE_ISSUE];
					}else{
						certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RENEWAL_ENDORSED1,certDetails.AppConstant.RE_ISSUE, certDetails.AppConstant.EXTENSION];
					}
					
				}else{
					certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RENEWAL_ENDORSED2,certDetails.AppConstant.RE_ISSUE];
				}
			}else {
				if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
					if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
						certDetails.enableCertType = [certDetails.AppConstant.RENEWAL_ENDORSED1];
					}
				}else{
					certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RENEWAL_ENDORSED2];
				}
				if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID && certDetails.certificateDetail.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED2 && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
					certDetails.enableCertType==[];
				}
			}
    		
    		
    		
    	}

    	function enableRenewalCertTypesVthAuditScreen(){

    		if(certDetails.orgCertificateDtl.certificateDetail){
    			if(certDetails.orgCertificateDtl.certificateDetail.length > 0){

    				for(var i=0; i<certDetails.orgCertificateDtl.certificateDetail.length;i++){

    					if(certDetails.orgCertificateDtl.certificateDetail[i].certIssueId == 1002 && certDetails.orgCertificateDtl.certificateDetail[i].publishStatus == 1){
    						
    						if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    						
    							if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID){
    								certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RE_ISSUE];
    							}else{
    								
    								certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RENEWAL_ENDORSED1,certDetails.AppConstant.RE_ISSUE, certDetails.AppConstant.EXTENSION];
    							}
    							
    						}else{
    							certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RENEWAL_ENDORSED2,certDetails.AppConstant.RE_ISSUE];
    						}
    						certDetails.renewalFulltermCertVal = false;
    						break;
    					}else {
    						certDetails.renewalFulltermCertVal = true;
    					}
    				}
    			}else{
    				certDetails.renewalFulltermCertVal = true;
    			}
    		}else{
    			certDetails.renewalFulltermCertVal = true;
    		}

    		if(certDetails.renewalFulltermCertVal){
    			
    			if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    				
    				if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
						
    					certDetails.enableCertType = [certDetails.AppConstant.RENEWAL_ENDORSED1];
					}else{
						certDetails.enableCertType = [];
					}
    			}else{
    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_CERT,certDetails.AppConstant.RENEWAL_ENDORSED2];
    			}
    		}
    		
    	}
    		 
    	function test123(){
    		log("certDetails.certificateDtl "+certDetails.certificateDtl.certIssueId);
    	}
    	function renewalEndrosedChangedVal(){

    		var AdminRenewalvalue = _(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':1006}).pluck('issueReasonDesc').toString();
    		var AuditorRenewalvalue = _(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':1007}).pluck('issueReasonDesc').toString();
    		var finalAdminRenewalVal = '';
    		var finalAuditorRenewalVal = '';


    		if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.ISM_TYPE_ID){

    			finalAdminRenewalVal = AdminRenewalvalue.replace(AdminRenewalvalue, ' RENEWAL ENDORSED (ISM PART B:13:12-13:14)');
    			finalAuditorRenewalVal= AuditorRenewalvalue.replace(AuditorRenewalvalue, 'RENEWAL ENDORSED (ISM PART B 13:13)');

    		}else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.ISPS_TYPE_ID){

    			finalAdminRenewalVal = AdminRenewalvalue.replace(AdminRenewalvalue, ' RENEWAL ENDORSED (ISPS 19.3.5-19.3.6)');
    			finalAuditorRenewalVal= AuditorRenewalvalue.replace(AuditorRenewalvalue, 'RENEWAL ENDORSED (ISPS 19.3.4)');

    		}else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.MLC_TYPE_ID){
    			finalAuditorRenewalVal= AuditorRenewalvalue.replace(AuditorRenewalvalue, 'RENEWAL ENDORSED (MLC APPENDIX A5–II)');
    			finalAdminRenewalVal= AdminRenewalvalue;
    		}

    		certDetails.certificateIssuedOptions.find(function(res) { return res.issueReasonId == certDetails.AppConstant.RENEWAL_ENDORSED1; }).issueReasonDesc = finalAdminRenewalVal;
    		certDetails.certificateIssuedOptions.find(function(res) { return res.issueReasonId == certDetails.AppConstant.RENEWAL_ENDORSED2; }).issueReasonDesc = finalAuditorRenewalVal;


    	}
    	
    	 function dateValidation(val,id,minDate,maxDate){ 
    	 		
  			var flag = true; 
  			
  			var toastMsg = '';
  			
  			var idmatch = id.split('-')[0];
  			
  			switch (idmatch) {
  			
  			case 'issuedate':
  				toastMsg = 'Issuedate';
  				break;
  			case 'expirydate':
  				toastMsg = 'expirydate';
  				break;
  			case 'endorseDate':
  				toastMsg = 'endorseDate';
  				break;
  			case 'exteIssueDate':
  				toastMsg = 'ExtendedIssueDate';
  				break;
  			case 'exteExpiryDate':
  				toastMsg = 'ExtendedExpiryDate';
  				break;
  			
  			}
  			
  			if(val && (val.toUpperCase() == (moment(val,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() || val.toUpperCase() == (moment(val,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() )){
  			
  					
  					
  					if(id == 'issuedate' || id == 'exteIssueDate' || id == 'exteExpiryDate' || id == 'expirydate'||id=='endorseDate'){
  						
  						return moment(val,MMMDDYYYY).format(MMMDDYYYY);
  					}else{
  						return moment(val,MMMDDYYYY).format(MMMDDYYYY);
  					}	 				
  				 				
  				}else if(val=='N.A.' && (id == 'issuedate' || id == 'exteIssueDate' || id=='exteExpiryDate' || id=='endorseDate' ||  id=='signtureDate' )){}
  				
  				else if(val){
  					
  					if(id=='signtureDate' || id == 'exteIssueDate' || id=='exteExpiryDate' || id=='endorseDate' || id == 'issuedate' || id == 'expirydate'){
  						val='';
  					}
  					 				 				
  					ModalService.showModal({
  		    			
  		    			templateUrl : 'src/modals/dateWarning.html', 
  		    			
  		    			controller  : 'dateWarningController',	    			
  		    		
  		    		}).then(function(modal) {
  		    			
  		    			modal.element.modal();
  		    			
  		    			modal.close.then(function(result) {
  		    				 	    				
  		    			});
  		    			
  		    		}); 		
  					
  					$timeout(function(){
  						$('#'+id).focus();
  					},1);
  					
  					return  val;
  				}
  				
  	    }
    	 
    	 
    	 
    	 
    	 
    	 function reasonForVoidReopen(value){
         	
    		 certDetails.reasonValue = value;
         	
     		ModalService.showModal({
     			
     			templateUrl : 'src/modals/reason.html',
     			
     			controller  : 'reasonController as reason',
     			
 	            inputs : {
 	            	
 	            	scope:certDetails
 	            }
     		
     		}).then(function(modal) {
     			
     			modal.element.modal();
     			
 	            modal.close.then(function(result) {
 	            	
 	            });
 	            
     		});
         	
         }
    	 
    	 
    	 
    	  function validateVessel(){ console.log(certDetails.certificateDtl); 
      		
    		  var vssel = certDetails.certificateDtl;
    		  var vselCo = vssel.vesselCompany;
    		  var flag = false; 
    		
    		  
    		  if(!certDetails.certificateDtl.vesselImoNo){
      			
    			  certDetails.certificateDtl.vesselImoNo = '';
        		   
        		}else if(!vssel.vesselName || !vssel.docTypeNumber || !vssel.activeStatus || !vssel.officialNo || !vssel.grt || !vssel.companyImoNo || !vssel.portOfRegistry){
        			flag = true; 	  
        		}else if(!vssel.dateOfRegistry || !vssel.vesselType){
        			flag = true; 	  
        		}else if(!vselCo.docTypeNo || !vselCo.docIssuer || !vselCo.docExpiry || !vselCo.vesselCompanyAddress || !vselCo.vesselCompanyName){
        			flag = true; 	  
        		}      		
      		if(flag){
      			
      			var vData = {
    					'companyId':certDetails.companyId,
    					'userId':certDetails.loginUserId,
    					'vesselImoNo':certDetails.certificateDtl.vesselImoNo,
    					'vesselId':certDetails.certificateDtl.vesselId,
    					'status':0};
        			
        			
        			certDetails.vesselDetail.vesselImoNo = certDetails.certificateDtl.vesselImoNo;
        			certDetails.vesselDetail.vesselId =  certDetails.certificateDtl.vesselId;
        			
        			if(certDetails.loginUserId && certDetails.certificateDtl.vesselImoNo && certDetails.certificateDtl.vesselId && certDetails.companyId){
        			detailsFactory.vesselDtlIncomplete(certDetails.loginUserId, certDetails.certificateDtl.vesselImoNo , certDetails.certificateDtl.vesselId,certDetails.companyId,vData).$promise.then(function(res) {
        				console.log(res);
        				if(res.partialData.length>0 && res.partialData){ 
        				certDetails.dueDateAlreadyCaptured = 	res.partialData[0].dueDate ? true : false;
        				
        				}
        			

        				toaster.warning('Partial Vessel Details, please provide a Due Date');
        				
        				certDetails.reasonForVoidReopen('halt');
        			});
        			}
      			
      			certDetails.partialMissingData='';
      			
      			certDetails.partialCount = 0;
      			
      			if(!vssel.vesselName){
      				certDetails.partialMissingData = ',Vessel Name  ';
      				certDetails.partialMissingStatus = true;
      				certDetails.partialCount++; 
     				 if(!certDetails.certificateDtl.vesselName){
  					$('#vesselname').addClass('err');}
      			} 
     			 
      			if(!vssel.docTypeNumber){
      				certDetails.partialMissingData = certDetails.partialMissingData +''+' ,DOC Type Number ';
      				certDetails.partialMissingStatus = true;
      				certDetails.partialCount++; 
     			
     				}
     			 
      			if(!vssel.activeStatus){
     				 certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Active Status ';
     				 certDetails.partialMissingStatus = true;
     				 certDetails.partialCount++; }
     			 
     			
      			if(!vssel.officialNo){
     				 certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Official Number  ';
     				 certDetails.partialMissingStatus = true;
     				 certDetails.partialCount++; 
     				if(!certDetails.certificateDtl.officialNo){
     					$('#officialNo').addClass('err');}  
      			}
     			 
     			 
      			if(!vssel.grt){
     				 certDetails.partialMissingData = certDetails.partialMissingData +''+' ,GRT value ';
     				 certDetails.partialMissingStatus = true;
     				 certDetails.partialCount++;
     				    if(!certDetails.certificateDtl.grt){
     					$('#grt').addClass('err');} 
     				}
     			 
     			
      			if(!vssel.companyImoNo){
     				 certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Company Imo Number ';
     				 certDetails.partialMissingStatus = true;
     			   	 certDetails.partialCount++; 
     			   	    if(!certDetails.certificateDtl.companyImoNo){
      			    $('#companyimo').addClass('err');} 
     			   	 }
      			
     			
      			if(!vssel.portOfRegistry){
     				 certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Port Of Registry  ';
     				certDetails.partialMissingStatus = true;
     				certDetails.partialCount++; 
     			    if(!certDetails.certificateDtl.portOfRegistry){
          			    $('#portOfReg').addClass('err');} 
         		}
      			
      			
      			
      			if(!vssel.dateOfRegistry){
      				certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Date Of Registry  ';
      				certDetails.partialMissingStatus = true;
      				certDetails.partialCount++; 
     				   
     				 if(!certDetails.certificateDtl.dateOfRegistry){
     					$('#dateOfReg').addClass('err');}
      			}
     			 
      			if(!vssel.vesselType){
      				certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Vessel Type ';
      				certDetails.partialMissingStatus = true;
      				certDetails.partialCount++; 
     				if(!certDetails.certificateDtl.vesselType){
     					$('#vesseltype').addClass('err');} 
      			}
     			
      			if(!vssel.vesselId){
      				certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Vessel Id  ';
      				certDetails.partialMissingStatus = true;
      				certDetails.partialCount++; }
      			
     			    if(!vselCo.docTypeNo){
     			    	certDetails.partialMissingData = certDetails.partialMissingData +''+' , Company Doc Type Number  ';
     			    	certDetails.partialMissingStatus = true;
     			    	certDetails.partialCount++; }
     			 
     			    if(!vselCo.docIssuer){
     			    	certDetails.partialMissingData = certDetails.partialMissingData +''+' ,DOC Issuer  ';
     			    	certDetails.partialMissingStatus = true;
     			    	certDetails.partialCount++; 
     				
     				 }
     			
     			    if(!vselCo.docExpiry){
     			    	certDetails.partialMissingData = certDetails.partialMissingData +''+' ,DOC Expiry  ';
     			    	certDetails.partialMissingStatus = true;
     			    	certDetails.partialCount++;
     			    }
     			
     			    if(!vselCo.vesselCompanyName){
     			    	certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Vessel Company Name  ';
     			    	certDetails.partialMissingStatus = true; certDetails.partialCount++; 
     				 
     				 if(!certDetails.certificateDtl.vesselCompanyName){
      					$('#cmpnyName').addClass('err');}
     				 }
     				 
     				  if(!vselCo.vesselCompanyAddress){
     					 certDetails.partialMissingData = certDetails.partialMissingData +''+' ,Vessel Comapny Address ';
     					certDetails.partialMissingStatus = true; certDetails.partialCount++; 
     				  
     				if(!certDetails.certificateDtl.vesselCompanyAddress){
     					$('#cmpnyAddress').addClass('err');} 
     				}
      			
      		
      		}  
      		
      		return flag;
      	}
    	 
    	 
    	 
    	  certDetails.checkCertVal = function(certValue,certIssueId){
			console.log(certDetails.certificateIssuedOptions);
			console.log((certDetails.disableExtension == 1 && 1003==certDetails.AppConstant.EXTENSION))
			console.log((certDetails.userRoleId != certDetails.AppConstant.MANAGER_ROLE_ID && 1003==certDetails.AppConstant.EXTENSION))
			 console.log((certDetails.directIntOrAdd == true && 1003==certDetails.AppConstant.EXTENSION))
			 console.log((certDetails.certificateDtl.checkExtensionCert ==1 && certDetails.checkFullTermCertPresent ==1 && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) && 1003==certDetails.AppConstant.EXTENSION))
			 console.log((certDetails.checkExtensionInInterOrAdd==1 && 1003==certDetails.AppConstant.EXTENSION))
			 console.log((1003==certDetails.AppConstant.EXTENSION   && certDetails.managerSearch && certDetails.certificateDtl.certIssueId != 1003 ))
			 console.log((certDetails.checkFullTermCertPresent == 0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID  && 1003==certDetails.AppConstant.EXTENSION));
    		  
    		  certDetails.checkPublish=false;
    		
    		  var checkFulltermPresent='';
    	
    		  console.log(certDetails.orgCertificateDtl);
    		  
    		  //if(MANAGER_ROLE_ID)
    		console.log(certDetails.arrOfDate);
//    		  certDetails.certificateDtl.grt = certDetails.certificateDtl.publishStatus == 1 ? certDetails.auditDtlsGrt : certDetails.certificateDtl.grt;
//    		  certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.publishStatus == 1 ? certDetails.auditDtlsdateOfRegistry : certDetails.certificateDtl.dateOfRegistry;
    		  certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.publishStatus == 1 ?  certDetails.auditDtlsissedPlace : certDetails.certificateDtl.auditPlace;
    		  certDetails.certificateDtl.auditDate = (certDetails.certificateDtl.publishStatus == 1 && certDetails.certificateDtl.certIssueId==1003 )?  certDetails.auditDtlsAuditDate : certDetails.certificateDtl.auditDate;
    		  
    		  if(certValue==1009 && certDetails.certificateDtl.certIssueId==1008 && certDetails.certificateDtl.publishStatus == 1){
    			  certDetails.certificateDtl.issuerSign = '';
    			  certDetails.certificateDtl.certIssueId=1008;
    			  certDetails.certificateDtl.issuerSignDate = '';
    			  certDetails.certificateDtl.certReissueReason=1;  //changed by sudharsan for JIRA IRI-5248 
    			  certDetails.disableGenerate = false;
    			 
    		  }else if(certValue==1004 && certDetails.certificateDtl.certIssueId==1003 && certDetails.certificateDtl.publishStatus == 1){
    			  certDetails.certificateDtl.issuerSign = '';
    			  certDetails.certificateDtl.certIssueId=1003;
    			  certDetails.certificateDtl.issuerSignDate = '';
    			  //certDetails.setCertIssueExpiry();
    			  certDetails.disableGenerate = false;
    		  }
    		  
    		  if(certValue==1009 && certDetails.certificateDtl.certIssueId==1008){
	    		  if(certDetails.dynamicMsg && certDetails.dynamicMsg != ''){
					  console.log(certDetails.latestVesselDetail)
	 	    			console.log(certDetails.enableCertType);
					  
					  	//setVesselHistory(certDetails);
					  
		   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].companyAddress;
		  				
					  	certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].customerName;
					  
		   	       		certDetails.certificateDtl.docExpiry = certDetails.certificateDtl.docExpiry ? moment(certDetails.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') : "";
		  				
	    	   	    	certDetails.certificateDtl.docIssuer = certDetails.latestVesselDetail[0].docIssuer;
	    	  			
	    	   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
	    	  				
		   	       		certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.dateOfRegistry ? moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :"";
		   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
		   	       		
		   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
		  				
		   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
		   	       		
		   	       		certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
				  }
		  
		  }
    		  if(certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED || certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED ){
    			  if(certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail.length>0){
    				  certDetails.certificateDtl.certExpireDate=certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate?moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY):certDetails.orgCertificateDtl.certExpireDate;
    			  }else{
    			  certDetails.certificateDtl.certExpireDate=certDetails.orgCertificateDtl.extendedExpireDate?certDetails.orgCertificateDtl.extendedExpireDate:certDetails.certificateDtl.certExpireDate;
    			  }
    			  }
    		  
    		 
    		  if(certIssueId==certDetails.AppConstant.RE_ISSUE){
    			  certDetails.certificateDtl.completionDate=moment(certDetails.certificateDtl.certIssueDate,'DD-MMM-YYYY').format('DD-MMM-YYYY');
    			  certDetails.certificateDtl.nameToPrint='1';
    			  certDetails.certificateDtl.signToPrint='1';
    			  certDetails.certificateDtl.certReissueReason=1;  //changed by sudharsan for JIRA IRI-5248 
    			  if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    				  if(certDetails.orgCertificateDtl.certificateDetail){
    					  var extendedExpireDate =null;
    					  var extendedIssueDate =null;
	          			var seqNo =	_.max(certDetails.orgCertificateDtl.certificateDetail, function(find){  return   find.seqNo; });
	          			if(certDetails.orgCertificateDtl.certificateDetail.length > 1){
	          				extendedExpireDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
		          			 extendedIssueDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
	          			}
	          			else{
	          				 
		          			 extendedExpireDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
		          			 extendedIssueDate = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
	          			}
	     				 
	         			certDetails.certificateDtl.extendedIssueDate = extendedIssueDate && extendedIssueDate != '' ? moment(extendedIssueDate, YYYYMMDD).format(MMMDDYYYY) : certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY)?moment(extendedIssueDate, YYYYMMDD).format(MMMDDYYYY) : moment(extendedIssueDate, YYYYMMDD).format(MMMDDYYYY):moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
	      				certDetails.certificateDtl.extendedExpireDate= extendedExpireDate && extendedExpireDate != '' ? moment(extendedExpireDate, YYYYMMDD).format(MMMDDYYYY) : certDetails.certificateDtl.extendedExpireDate ? moment (certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) : '';
    				  }else{
    					  certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
    	                    //changes done by Kalirajan JIRA id-IRI-4593  03-01-2020
    	                     certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.extendedExpireDate && certDetails.orgCertificateDtl.extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certExpireDate,MMMDDYYYY).format(MMMDDYYYY);
    				  }
     			
         		}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){

     				// certDetails.certificateDtl.extendedIssueDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(MMMDDYYYY);
     				
         		//certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
         			 certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate? certDetails.arrOfDate.length>0 ? certDetails.arrOfDate[0].creditDate ? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY): certDetails.certificateDtl.certIssueDate :certDetails.certificateDtl.certIssueDate:certDetails.certificateDtl.certIssueDate;
         			certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate? certDetails.arrOfDate.length>0 ? certDetails.arrOfDate[0].nextRenewal ? moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY):certDetails.certificateDtl.certExpireDate :certDetails.certificateDtl.certExpireDate:certDetails.certificateDtl.certExpireDate;
         			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
         				certDetails.minExtnCertIssueDate = certDetails.certificateDtl.extendedIssueDate;
         				certDetails.maxExtnCertIssueDate = certDetails.certificateDtl.extendedExpireDate;
         				certDetails.minExtnCertExpireDate = certDetails.certificateDtl.extendedIssueDate;
         			}
     			 }else if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
     				
     		
     		
     			if((certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].getInitialRenewalPublishCount && certDetails.orgCertificateDtl.certificateDetail[0].getInitialRenewalPublishCount!=undefined && certDetails.orgCertificateDtl.certificateDetail[0].getInitialRenewalPublishCount==1) || (certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.getInitialRenewalPublishCount && certDetails.orgCertificateDtl.getInitialRenewalPublishCount==1)){
     			
           				 certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate.length>0? moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
           				 certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate.length>0?moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
     			
     				 }else if(certDetails.orgCertificateDtl.audCertIssueDesc=="INTERMEDIATE ENDORSED" && certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.auditCycle && (certDetails.orgCertificateDtl.auditCycle.auditSubTypeCycleGen==1002 || certDetails.orgCertificateDtl.auditCycle.auditSubTypeCycleGen==1004)){
     					
     					 certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate? moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
        				 certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate?moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
     				}else if(certDetails.arrOfDate && certDetails.arrOfDate.length>0 && (certDetails.arrOfDate[certDetails.arrOfDate.length-1].auditSubTypeCycleGen==1002 || certDetails.arrOfDate[certDetails.arrOfDate.length-1].auditSubTypeCycleGen==1004)){
     					certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate? moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
       				 certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate?moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
     				}
     				else{
     					
     					//certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate!=undefined && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
          				//certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl && certDetails.orgCertificateDtl.extendedExpireDate && certDetails.orgCertificateDtl.extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) : moment(certDetails.orgCertificateDtl.certExpireDate, MMMDDYYYY).format(MMMDDYYYY);
     					certDetails.certificateDtl.extendedIssueDate = certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate != '' ? certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate,YYYYMMDD).format(MMMDDYYYY):moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
          				certDetails.certificateDtl.extendedExpireDate= certDetails.orgCertificateDtl.certificateDetail && certDetails.orgCertificateDtl.certificateDetail[0] && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate && certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate != '' ?certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].extendedExpireDate, YYYYMMDD).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) :moment(certDetails.orgCertificateDtl.certExpireDate, MMMDDYYYY).format(MMMDDYYYY);
     				}
     			
     			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
     				certDetails.minExtnCertIssueDate = certDetails.certificateDtl.extendedIssueDate;
     				certDetails.maxExtnCertIssueDate = certDetails.certificateDtl.extendedExpireDate;
     				certDetails.minExtnCertExpireDate = certDetails.certificateDtl.extendedIssueDate;
     			}
     				}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
     					
     					//certDetails.certificateDtl.extendedIssueDate =certDetails.arrOfDate? moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].creditDate,YYYYMMDD).format(MMMDDYYYY):'';
              			//certDetails.certificateDtl.extendedExpireDate=certDetails.arrOfDate?moment(certDetails.arrOfDate[certDetails.arrOfDate.length-1].nextRenewal,YYYYMMDD).format(MMMDDYYYY):'';
     					certDetails.certificateDtl.extendedIssueDate = certDetails.arrOfDate? moment(certDetails.arrOfDate[0].creditDate,YYYYMMDD).format(MMMDDYYYY) : (certDetails.orgCertificateDtl.extendedIssueDate && certDetails.orgCertificateDtl.extendedIssueDate != '' ? moment(certDetails.orgCertificateDtl.extendedIssueDate, MMMDDYYYY).format(MMMDDYYYY) : certDetails.orgCertificateDtl.certificateDetail.length>0 ? moment(certDetails.orgCertificateDtl.certificateDetail).format(DD-MMM-YYYY) : moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY));
     		              certDetails.certificateDtl.extendedExpireDate= certDetails.arrOfDate?moment(certDetails.arrOfDate[0].nextRenewal,YYYYMMDD).format(MMMDDYYYY): (certDetails.orgCertificateDtl.extendedExpireDate && certDetails.orgCertificateDtl.extendedExpireDate != '' ? moment(certDetails.orgCertificateDtl.extendedExpireDate, MMMDDYYYY).format(MMMDDYYYY) : certDetails.orgCertificateDtl.certificateDetail.length>0 ? moment(certDetails.orgCertificateDtl.certificateDetail).format(DD-MMM-YYYY) : moment(certDetails.orgCertificateDtl.certExpireDate,MMMDDYYYY).format(MMMDDYYYY));
           			 }
    		  }
    		  if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID){
    		  if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE)){
					
					 certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION);
				 }
    		  }
    		 
      			if(certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
      				certDetails.subPrevInterimDate = certDetails.certificateDtl.completionDate;
      				if(certDetails.certificateDtl.consecutiveId!=1000 && certDetails.subInterimDate!='N.A'){
	      				certDetails.certificateDtl.consecutiveId=1000;
						certDetails.subInterimDate='N.A';
      				}
      				certDetails.prevcompletionDate = certDetails.certificateDtl.completionDate;
      				console.log(certDetails.certificateDtl.completionDate)
      			}
      			if(certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && (certIssueId==certDetails.AppConstant.RE_ISSUE || certIssueId==certDetails.AppConstant.EXTENSION || certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED2)){
      				certDetails.userLoggedName = 'Manager Name';
					certDetails.signerName = certDtlRequiredData.getCurrentUserFullName.userName;
					certDetails.certificateDtl.issuerName = certDetails.signerName;
      			}
      			
      			if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_ENDORSED) && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
    				
    				if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD) == moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
    					moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD) == moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD);
    					toaster.info('Validity of the certificate is exactly 5 Years');
       			 }	
    			}
      	}
    	 
    	  function checkOrgCertDtlVal(certCurrVal,certOrgVal){
    		console.log(certCurrVal)
    		console.log(certOrgVal)
    		  certDetails.orgNameToPrint = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("nameToPrint").toString() : certOrgVal.nameToPrint;
    		  certDetails.orgSignToPrint = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("signToPrint").toString() : certOrgVal.signToPrint;
    		  certDetails.orgAuditDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("auditDate").toString() : certOrgVal.auditDate;
    		  certDetails.orgSignatureDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("issuerSignDate").toString() : certOrgVal.issuerSignDate;
    		  certDetails.orgCertIssueDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("certIssueDate").toString() : certOrgVal.certIssueDate;
    		  certDetails.orgCertExpiryDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("certExpireDate").toString() : certOrgVal.certExpireDate;
    		  certDetails.orgCertAuditPlace = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("auditPlace").toString() : certOrgVal.auditPlace;
    		  certDetails.orgCertExtIssueDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("extendedIssueDate").toString() : certOrgVal.extendedIssueDate;
    		  certDetails.orgCertExtExpiryDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("extendedExpireDate").toString() : certOrgVal.extendedExpireDate;
    		  certDetails.orgCertEndrosedDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("endorsedDate").toString() : certOrgVal.endorsedDate;
    		  certDetails.orgCertExtEndrosedDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("extendedEndorsedDate").toString() : (certOrgVal.extendedEndorsedDate ? certOrgVal.extendedEndorsedDate : '');
    		  certDetails.orgCertGrt = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("grt").toString() : certOrgVal.grt;
    		  certDetails.orgCertDor = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("dateOfRegistry").toString() : certOrgVal.dateOfRegistry;
    		  certDetails.orgVesselCompanyAddress = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselCompanyAddress").toString() : certOrgVal.vesselCompanyAddress;
    		  certDetails.orgVesselCompanyName = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselCompanyName").toString() : certOrgVal.vesselCompanyName;
    		  certDetails.orgDocExpiry = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("docExpiry").toString() : certOrgVal.docExpiry;
    		  certDetails.orgDocIssuer = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("docIssuer").toString() : certOrgVal.docIssuer;
    		  certDetails.orgVesselName = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselName").toString() : certOrgVal.vesselName;
    		  certDetails.orgVesselType = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselType").toString() : certOrgVal.vesselType;
    		  certDetails.orgCompanyImoNo = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("companyImoNo").toString() : certOrgVal.companyImoNo;
    		  certDetails.orgPor = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("portOfRegistry").toString() : certOrgVal.portOfRegistry;
    		  
    		  certDetails.orgVesselId =  certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselId").toString() : certOrgVal.vesselId;
    		  certCurrVal.certIssueDate = certOrgVal.certIssueDate;
			  /**Added by sudharsan for JIRA-ID 5232 and 5225  -- Start Here*/
			  if((moment(certCurrVal.certIssueDate)._f)=="YYYY-MM-DD"){
					  certCurrVal.certIssueDate=moment(certCurrVal.certIssueDate,YYYYMMDD).format(MMMDDYYYY);	
				}
				/**End here */
    		  if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && (certDetails.certificateDtl.certIssueId !=1008 && certDetails.checkGenerate==true)){
    			
    			  checkRenewalType();
    		  }
    	  }
/**Added by sudharsan for JIRA IRI-5248 */
		  function onChangeReissueReason(){ 
			if(certDetails.certificateDtl.certReissueReason!=1){
				$('#certReissueReason').removeClass('err');
			}
			console.log("________inside onchange reissue rason");
		  }
/**End Here */    	  
    	  function checkRenewalType(status){
    		
    		  if(certDetails.certificateDtl.vesselImoNo){
    		  certificateFactory.getAllCycleDate(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.vesselImoNo ,certDetails.certificateDtl.companyId).$promise.then(function(res) {
  				console.log(res);
  				certDetails.arrOfDate = res;
  			/*	var arrOfDate=res.sort(function(a, b) {
  				    return parseFloat(a.cycleSeqNo) - parseFloat(b.cycleSeqNo);
  				});*/
  			console.log(arrOfDate);
  			
    		  status =  !status ? (!certDetails.certificateDtl.publishStatus  && certDetails.certificateDtl.publishStatus !=0  ? 'Audit' : '') : status ;   
    		      	
    		  
    		 
    		  if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID &&  (certDetails.certificateDtl.publishStatus == undefined || certDetails.certificateDtl.publishStatus == 0)){    			  
    			
    			  if((certDetails.certificateDtl.audCertIssueDesc=="RENEWAL  ENDORSED(ISM PART B:1" || certDetails.certificateDtl.audCertIssueDesc=="RENEWAL  ENDORSED(MLC Appendix A5–II"||certDetails.certificateDtl.audCertIssueDesc=="RENEWAL  ENDORSED(ISPS PART B:1"|| certDetails.certificateDtl.audCertIssueDesc=="RENEWAL ENDORSED(ISM PART B:13") && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_CERT){
    				
    				  var currAuditDate =  certDetails.certificateDtl.auditDate;
    				  var auditDate = moment(currAuditDate,MMMDDYYYY).format(YYYYMMDD);
    				  var nextrenewalStartDate=moment(arrOfDate[arrOfDate.length-1].nextRenewalStart,YYYYMMDD).format(YYYYMMDD);
    				  var expDate2=moment(arrOfDate[arrOfDate.length-1].nextRenewal,YYYYMMDD).add(5,'years').format(MMMDDYYYY);
    		    		
        			  var expDateMax=moment(arrOfDate[arrOfDate.length-1].nextRenewal,YYYYMMDD);
    			  }else{
    				
    			  var prevExtendedExpiryDate = _(certDetails.getPreviousAuditCerData.certificateDetail).chain().where({'seqNo':certDetails.getPreviousAuditCerData.certificateDetail.length}).pluck("extendedExpireDate").toString();

    			  var prevExpiryDate = _(certDetails.getPreviousAuditCerData.certificateDetail).chain().where({'seqNo':certDetails.getPreviousAuditCerData.certificateDetail.length}).pluck("certExpireDate").toString();

    			  var prevAuditDate = certDetails.getPreviousAuditCerData.auditDate;

    			  var currAuditDate =  certDetails.certificateDtl.auditDate;

    			  var preAudCertExpireDate = prevExtendedExpiryDate ? prevExtendedExpiryDate : prevExpiryDate;	
    			  
    			  
    			  var expDate=moment(arrOfDate[arrOfDate.length-2].nextRenewal,YYYYMMDD).format(MMMDDYYYY);

    			  var expiryDate1 = moment(expDate,MMMDDYYYY).format(YYYYMMDD);

    			  var auditDate = moment(currAuditDate,MMMDDYYYY).format(YYYYMMDD);
    		
    			  var nextrenewalStartDate=moment(arrOfDate[arrOfDate.length-2].nextRenewalStart,YYYYMMDD).format(YYYYMMDD);
    			  
    			  var days = moment(expiryDate1).diff(auditDate,'month', true);
    			 
    			  var expDate2=moment(arrOfDate[arrOfDate.length-2].nextRenewal,YYYYMMDD).add(5,'years').format(MMMDDYYYY);
    		
    			  var expDateMax=moment(arrOfDate[arrOfDate.length-2].nextRenewal,YYYYMMDD);
    			  }
    			  if(status == 'Audit' ) {


    				  if(auditDate < nextrenewalStartDate){ 
    				
    					  //certDetails.certificateDtl.certIssueDate = moment(moment(currAuditDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
                    certDetails.certificateDtl.certIssueDate =moment(certDetails.certificateDtl.creditDate,MMMDDYYYY).format(MMMDDYYYY);
                    certDetails.certificateDtl.certExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				  }else{
    				
    					 // certDetails.certificateDtl.certIssueDate = moment(preAudCertExpireDate,YYYYMMDD).format(MMMDDYYYY);
    					  certDetails.certificateDtl.certIssueDate = moment(certDetails.certificateDtl.creditDate,MMMDDYYYY).format(MMMDDYYYY);
    					 // certDetails.certificateDtl.certExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					  certDetails.certificateDtl.certExpireDate=moment(expDate2,MMMDDYYYY).format(MMMDDYYYY); 
    				  }
    				 
    			  }
    			  
    			  
    			  checkMinandMaxRenewalDates(auditDate,expDate2,nextrenewalStartDate);
    		  }else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE){
    	
    		
    		console.log(certDetails.certificateDtl);
    			 
    			  var currAuditDate =  certDetails.certificateDtl.auditDate;

    			  var expDate=moment(arrOfDate[arrOfDate.length-1].nextRenewal,YYYYMMDD).format(MMMDDYYYY);

    			  var expiryDate1 = moment(expDate,MMMDDYYYY).format(YYYYMMDD);

    			  var auditDate = moment(currAuditDate,MMMDDYYYY).format(YYYYMMDD);

    			  var days = moment(expiryDate1).diff(auditDate,'month', true);
    			  
    			  var nextrenewalStartDate=moment(arrOfDate[arrOfDate.length-2].nextRenewalStart,YYYYMMDD).format(YYYYMMDD);
    			  console.log(arrOfDate);
    			  
    			  var expDate2=moment(arrOfDate[arrOfDate.length-1].nextRenewal,YYYYMMDD).add(5,'years').format(MMMDDYYYY);
    			  
    			   var expDateMax=moment(arrOfDate[arrOfDate.length-1].nextRenewal,YYYYMMDD);
    			
    				  if(auditDate < nextrenewalStartDate){ 
    					
    					  certDetails.certificateDtl.extendedIssueDate =moment(arrOfDate[arrOfDate.length-1].creditDate,YYYYMMDD).format(MMMDDYYYY);
    					  certDetails.certificateDtl.extendedExpireDate=moment(expDateMax,YYYYMMDD).format(MMMDDYYYY); 
    					 // certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 //certDetails.certificateDtl.extendedIssueDate = moment(moment(currAuditDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
    						 //certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				  }else{
    				
    					  certDetails.certificateDtl.extendedIssueDate = moment(arrOfDate[arrOfDate.length-1].creditDate,YYYYMMDD).format(MMMDDYYYY);
    					  certDetails.certificateDtl.extendedExpireDate=moment(expDateMax,YYYYMMDD).format(MMMDDYYYY); 
    					 // certDetails.certificateDtl.extendedIssueDate = moment(preAudCertExpireDate,YYYYMMDD).format(MMMDDYYYY);
    					 // certDetails.certificateDtl.extendedExpireDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				  }
    				  checkMinandMaxRenewalDatesReissue(auditDate,expDateMax,nextrenewalStartDate);
    			  
    		  }
    		  });
    		  }
    	  }
    		 
    	  function checkMinandMaxRenewalDates(auditDate,expDate2,nextrenewalStartDate){
    		  console.log(certDetails.certificateDtl);

    		  var issueDate = '';

    		  if(auditDate < nextrenewalStartDate){
    			 
    			  issueDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
    			  //certDetails.minCertIssueDate = moment((moment(moment(currAuditDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY)), MMMDDYYYY).format(YYYYMMDD);
    			  //certDetails.maxCertIssueDate = moment(preAudCertExpireDate, YYYYMMDD).format(YYYYMMDD);
    			  certDetails.maxCertIssueDate= moment(certDetails.certificateDtl.creditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD); 
    			
    			  certDetails.minCertIssueDate = moment(certDetails.certificateDtl.creditDate, MMMDDYYYY).format(YYYYMMDD);
    			  certDetails.minCertExpireDate     = moment(issueDate, MMMDDYYYY).format(YYYYMMDD);
        		  certDetails.maxCertExpireDate     = moment(issueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD);
    			 
    		  }else{
    			  
    			  issueDate = moment(certDetails.certificateDtl.creditDate,MMMDDYYYY).format(MMMDDYYYY);
    			  certDetails.minCertIssueDate = moment(certDetails.certificateDtl.creditDate, MMMDDYYYY).format(YYYYMMDD);
    			  certDetails.maxCertIssueDate = moment(expDate2, MMMDDYYYY).format(YYYYMMDD);
    			  certDetails.minCertExpireDate     = moment(issueDate, MMMDDYYYY).format(YYYYMMDD);
        		  certDetails.maxCertExpireDate     = moment(expDate2, MMMDDYYYY).format(YYYYMMDD);
    		  }


    		  //certDetails.minCertExpireDate     = moment(issueDate, MMMDDYYYY).format(YYYYMMDD);
    		  //certDetails.maxCertExpireDate     = moment(issueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD);
    	  }
    	  
    	  function checkMinandMaxRenewalDatesReissue(auditDate,expDate2,nextrenewalStartDate){

    		  var issueDate = '';

    		  if(auditDate < nextrenewalStartDate){
    			  issueDate = moment(moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
    			     certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD);
					 certDetails.maxExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD);
					
					 certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD);
					 certDetails.maxExtnCertExpireDate = moment(expDate2, MMMDDYYYY).format(YYYYMMDD);
    			 
    		  }else{
    			  
    			  issueDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(MMMDDYYYY);
    			  certDetails.minCertIssueDate = moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).format(YYYYMMDD);
    			  certDetails.maxExtnCertIssueDate = moment(expDate2, MMMDDYYYY).format(YYYYMMDD);
    			  certDetails.minExtnCertExpireDate = moment(issueDate ,MMMDDYYYY).format(YYYYMMDD);
    			  certDetails.maxExtnCertExpireDate = moment(expDate2, MMMDDYYYY).format(YYYYMMDD);
    		  }


    		  //certDetails.minCertExpireDate     = moment(issueDate, MMMDDYYYY).format(YYYYMMDD);
    		  //certDetails.maxCertExpireDate     = moment(issueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD);
    	  }
    	  
    	  function disableCertIssue(){
    		  
    		  var condition = (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN) || 
    		  (certDetails.certificateNotPublish && !certDetails.reviewSign && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID) ||
    		  certDetails.checkNxtAuditCreate || certDetails.withOutAdt || certDetails.disableAll || certDetails.disableCertType || 
    		  (!certDetails.leadSign && certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID)
    		  || 
    		  (((certDetails.certificateLength==0 || certDetails.certificateLength==1) && certDetails.certificateDtl.publishStatus!=1) && 
    		  certDetails.initialAudit && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) 
    		  ||
    		  certDetails.disableCertIssueTypeId || certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || 
    		  certDetails.certificateDtl.auditSummaryId == certDetails.AppConstant.NOT_APPROVED_SUMMARY || certDetails.releaseLock ||
    		  (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID ||
    		   certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.publishStatus==0) ||
    	     (certDetails.certificateDtl.publishStatus == 0 && ((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && 
    		  certDetails.certificateDtl.checkRenEndrosAftFullTerm == 0 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2) ||
    		 (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && certDetails.certificateDtl.checkAdminRenewalEndrosed == 0 &&
    		certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED1) ||
    		(certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && 
    		 certDetails.certificateDtl.certIssueId != certDetails.AppConstant.FULL_TERM_CERT && certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RENEWAL_ENDORSED2 && 
    		 certDetails.userRoleId != certDetails.AppConstant.MANAGER_ROLE_ID) ||
    		 (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION ||
    		certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE) )))
    		|| (certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && !certDetails.managerDisableDropdown && !(certDetails.userRoleId==1003)) || certDetails.managerSearch
			//Commented by sudharsan for reverting changes
			 //&&(certDetails.userRoleId != certDetails.AppConstant.MANAGER_ROLE_ID || (certDetails.isSignAttached && certDetails.userRoleId != certDetails.AppConstant.MANAGER_ROLE_ID)) ;  //Added by sudharsan for Jira ID-5258 and 5558
			|| (certDetails.isSignAttached && certDetails.userRoleId != certDetails.AppConstant.MANAGER_ROLE_ID) || (certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && !certDetails.reviewSign)   //Added by sudharsan for Jira ID-5258 and 5558
    		  console.log(condition)
    		  return condition;
    	  }
    	  
    }  
    
    
    function certificateHistoryController(scope,$scope,auditFactory,detailsFactory,CERTI_URL,blockUI,toaster,AppConstant,MMMDDYYYY,YYYYMMDD,auditService,$timeout,$sce){
    	var certHist = this;
    	$scope.qrString = "";
    	certHist.qrCodeData ='';
    	
    	certHist.viewCertificate = viewCertificate;
    	
    	certHist.AppConstant = AppConstant;
    	
    console.log(scope);
    	viewCertificate();
    	
    	
    	function viewCertificate(){
    		
    		
    		auditFactory.qrCodeGenerator(CERTI_URL+scope.companyId+'/'+scope.utn).$promise.then(function(response){
        		
    			certHist.qrCodeData= response.data;
    			
    			if(scope.certificateNo){
    				var auditDate = moment(scope.auditDate,MMMDDYYYY).format(YYYYMMDD);
    				var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[];
    				
    			//	var doc = new jsPDF('p', 'mm', 'a4');	
    					console.log("scope",scope);
    					detailsFactory.getAuditCertificateData(scope.vesselImoNo,scope.companyId,scope.certificateNo,scope.auditTypeId,auditDate).$promise.then(function(result){
    			    		var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[], additionalReissue = [], intermediateReissue= [];
    						console.log("response",result);
    						var auditSubTypeId = certHist.auditSubTypeId,
    						certificaIssueId = certHist.certIssueId,
    						tempAuditSeqNo = certHist.auditSeqNo;
    						var reIssue = '';
    						var latestNumber = [];
    						var initialVal = 0;
    						var intermediateVal = 0;
    						var renewalEndorsedval = 0;
    						var larg = 0;
    						var alarg = 0;
    						var asmall= 0,initialRe = false,inLargetoAdd = false;
    						
    						result.forEach(function(a){
    							if(a.auditSubTypeId === certHist.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.auditStatusId != 1004){
    								latestNumber.push(a.auditSeqNo);
    								
    								if (a.auditSeqNo > alarg) {
    							        alarg = a.auditSeqNo;
    							    }

    								asmall = Math.min.apply(null,latestNumber);
    							}
    							
    							if(a.auditSubTypeId == certHist.AppConstant.INITIAL_SUB_TYPE_ID && a.auditStatusId != 1004){
    								initialVal++;
    							}
    							if(a.auditSubTypeId == certHist.AppConstant.RENEWAL_SUB_TYPE_ID && a.auditStatusId != 1004){
    								renewalEndorsedval++;
    							}
    							
    							//if(a.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.auditStatusId != 1004){
    							//	intermediateVal++;
    								
    								if(a.auditSubTypeId == certHist.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.auditStatusId != 1004){
    									intermediateVal++;
    									 if (a.auditSeqNo > larg) {
    									        larg = a.auditSeqNo;
    									    }
    								}
    							//}
    							
    							if(a.auditSeqNo != 600002 && a.auditSeqNo != 600001 && a.auditSeqNo != 600003){
    							if((a.auditSeqNo && a.audSubTypeDesc.indexOf('ADDITIONAL')) <  (a.auditSeqNo && a.audSubTypeDesc.indexOf('INTERMEDIATE'))){
    								console.log('entere');
    								inLargetoAdd = true;
    							}
    							}
    							
    							if((a.auditSubTypeId == certHist.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == 1008)||(a.auditSubTypeId == certHist.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId == 1008)){
    								reIssue = true;
    								
    							}});
    							var maximum = Math.max.apply(null, latestNumber); // get the max of the array
    						latestNumber.splice(latestNumber.indexOf(maximum), 1); // remove max from the array
    					    var maximum2 = Math.max.apply(null, latestNumber); // get the 2nd max
    						var latestSeqNumber = '';
    						var getEndrosedCountLatest = '';
    						result.forEach(function(a){
    							a.interlarg = larg;
    							a.addlarg = alarg;
    							a.addsmall = asmall;
    									if (a.auditSeqNo === maximum2) {
    										a.aditionalbeforeseqnum = a.auditSeqNo;
    										latestSeqNumber = a.seqNo;
    										getEndrosedCountLatest = a.getEndrosedCount;
    										a.latestSeqNumber = latestSeqNumber;
    								    }
    									if(initialVal > 0){
    										a.initialAvail = true;
    									}else{
    										a.initialAvail = false;
    									}
    									if(intermediateVal > 0){
    										a.intermediateAvail = true;
    									}else{
    										a.intermediateAvail = false;
    									}
    									
    									if(renewalEndorsedval > 0){
    										a.renewalEndorsedAvail = true;
    									}else{
    										a.renewalEndorsedAvail = false;
    									}
    							});
    						console.log(asmall);
    						console.log("latest Intermediate",larg);
    						console.log("latest Additional",alarg);
    			    						result.forEach(function(a){
    			    						
    			    						a.withoutIntermediate = false;
    			    						
    			    							a.auditPlace = a.auditPlace?decodeURIComponent(atob(a.auditPlace)):'';
    			    							
    			    							a.certExpireDate = a.certExpireDate ? moment( a.certExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    			    							a.certIssueDate = a.certIssueDate ? moment(a.certIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    											a.auditDate = a.auditDate ? moment(a.auditDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    											a.dateOfRegistry = a.dateOfRegistry ? moment(a.dateOfRegistry,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    											a.issuerSignDate = a.issuerSignDate ? moment(a.issuerSignDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    											a.extendedIssueDate = a.extendedIssueDate ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    											a.extendedExpireDate = a.extendedExpireDate ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    											a.issuerSign = atob(a.issuerSign);
    											
    											a.auditStatusId = a.auditStatusId;

    											a.prevAuditIssueData = a.prevAuditIssueData ? moment(a.prevAuditIssueData,'YYYY-MM-DD').format('DD MMMM YYYY') : '';
    											
    									
    											
    											if(a.certIssueId == 1003 || a.certIssueId  == 1006){
    												
    												if(a.certIssueId == certificaIssueId && reIssue){

    									a.withoutCross = true;
    									}else{
    									a.withoutCross = false;
    									}
    												
    												extension.push(a);
    												
    											}else if(a.certIssueId  == 1007){
    												
    												if(a.certIssueId == certificaIssueId && reIssue){

    									a.withoutCross = true;
    									}else{
    									a.withoutCross = false;
    									}
    												
    												renewalEndorse2.push(a);
    												
    												
    											}else if( a.auditSubTypeId== certHist.AppConstant.INITIAL_SUB_TYPE_ID  || a.auditSubTypeId == certHist.AppConstant.RENEWAL_SUB_TYPE_ID ||a.auditSubTypeId == certHist.AppConstant.INTERIM_SUB_TYPE_ID){
    			    								
						    			    								console.log("Initial");
						    								console.log(a.auditSubTypeId == auditSubTypeId);
						    								if(a.auditSubTypeId == auditSubTypeId && reIssue){
						
						    								a.withoutCross = true;
						    								}else{
						    								a.withoutCross = false;
						    								}
    			    								
    			    								newCertificate.push(a);
    			    								
    			    								//console.log(certHist.newCertificateSign);
    			    								
    			    							}else if(a.auditSubTypeId == certHist.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    								
    								console.log("Intermediate");
    								console.log(a.auditSubTypeId == auditSubTypeId);
    								
    								if(a.certIssueId  == 1004)
    								{
    								if(a.auditSubTypeId == auditSubTypeId && reIssue){

    									a.withoutCross = true;
    									}else{
    									a.withoutCross = false;
    									}
    								intermediate.push(a);
    								}
    								if(a.certIssueId  == 1008){
    									intermediateReissue.push(a);
    								}
    								
    								if(newCertificate.length == 0)	{

    									if(a.certIssueId == certificaIssueId && reIssue){

    										a.withoutCross = true;
    										}else{
    										a.withoutCross = false;
    										}
    									
    									var copyData = angular.copy(a);
    									copyData.withoutIntermediate = true;
    									newCertificate.push(copyData);

    								}



    							}else if(a.auditSubTypeId == certHist.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    								//	a[9] = a.issuerSign;
    								if(a.certIssueId  == 1005 /*&& a.auditStatusId != 1004*/)
    								{
    									if(a.auditSubTypeId == auditSubTypeId && a.auditSeqNo == tempAuditSeqNo && reIssue){

    										a.withoutCross = true;
    										}else{
    										a.withoutCross = false;
    										}
    								additional.push(a);

    								}/*else if(a.certIssueId  == 1005 && a.auditStatusId == 1004){
    									console.log("yesssss");
    									if(a.auditSubTypeId == auditSubTypeId && a.auditSeqNo == tempAuditSeqNo && reIssue){

    										a.withoutCross = true;
    										}else{
    										a.withoutCross = false;
    										}
    								additionalVoid.push(a);

    								}*/
    								if(a.certIssueId  == 1008 /*&& a.auditStatusId != 1004*/){
    									additionalReissue.push(a);
    								}/*else if(a.certIssueId  == 1008 && a.auditStatusId == 1004){
    									additionalVoid.push(a);
    								}*/
    								if(newCertificate.length == 0)	{
    									console.log("additional push empty");
    									if(a.certIssueId == certificaIssueId && reIssue && a.auditSeqNo == tempAuditSeqNo){

    										a.withoutCross = true;
    										}else{
    										a.withoutCross = false;
    										}
    									var copyData = angular.copy(a);

    									copyData.withoutIntermediate = true;
    									newCertificate.push(copyData);
    									
    									

    								}
    							}
    						});
    						
    				//		$scope.qrString = CERTI_URL + scope.companyId + '?Cqid='+newCertificate[0].qid;
    						
    						certHist.signature = result;
    			    												
    			    												
    			    						var certificateDatas={

    								'certificateNo' :newCertificate[0].certificateNo,
    								'AuditTypeId'   :newCertificate[0].auditTypeId,
    								'AuditStatusId' :newCertificate[0].auditStatusId,
    								'vesselName'    :newCertificate[0].vesselName,
    								'officialNo'    :newCertificate[0].officialNo,
    								'distinletter'  :newCertificate[0].officialNo,
    								'vesselImoNo'   :newCertificate[0].vesselImoNo,
    								'CompanyId'		:newCertificate[0].companyId,
    								'AuditSeqNo'	:newCertificate[0].auditSeqNo,
    								'UserIns'		:'BSOL',
    								'DateIns'		:moment(new Date()).format(MMMDDYYYY),
    								'portofreg'		:newCertificate[0].portOfRegistry,
    								'shiptype'      :newCertificate[0].vesselType,
    								'grt'			:newCertificate[0].grt,
    								'companyaddress':newCertificate[0].vesselCompanyAddress,
    								'companyname'   :newCertificate[0].vesselCompanyName,
    								'companyimono'  :newCertificate[0].companyImoNo,
    								'expirydate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
    										'auditplace'	:newCertificate[0].auditPlace,
    										'certissuedate'	:(newCertificate[0].certIssueId == 1008) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
    												'auditSubTypeId':newCertificate[0].withoutIntermediate == true ? 1002 : newCertificate[0].auditSubTypeId,
    														'AuditDate'		:newCertificate[0].auditDate,
    														'ispsPreviousIssueDate'  : newCertificate[0].prevAuditIssueData,
    														'consecutiveId'			: newCertificate[0].consecutiveId,
    														'auditDate'     :newCertificate[0].auditDate,
    														'LeadAuditorSign':newCertificate[0].issuerSign,
    														'headSubTitleism' :'Issued under the provisions of the International Convention for the Safety',
    														'headSubTitleism1':'of Life at Sea, 1974(SOLAS), as amended',
    														'certify':'THIS IS TO CERTIFY THAT',
    														'res':newCertificate[0],
    														'intermediate':intermediate,
    														'additional':additional,
    														'LeadAuditorName':newCertificate[0].issuerName,
    														'headSubTitleisps':'Issued under the provisions of the International Code for the Security',
    														'headSubTitleisps1':'of Ships and of Port Facilities (ISPS Code)',
//    														'previousexpirydate':moment(certDetails.previousAudit.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'),
    														'headSubTitlemlc':'Issued under the provisions of Article V and Title 5 of the Maritime Labour Convention, 2006',
    														'HeadSubTitle':'(Note: This Certificate shall have a Declaration of Maritime Labour Compliance attached.)',
    														'headSubTitle2':"(referred to below as the “Convention”)",
    														'signaturetext'	:'Signature of the Duly Authorized Official Issuing the Certificate.',
    														'sealcontent'	:'(Seal or stamp of issuing authority, as appropriate)',
    														'certificateVer':newCertificate[0].certificateVer,
    														'utn':newCertificate[0].utn,
    														'qrCodeUrl':CERTI_URL + scope.companyId + '?Cqid='+newCertificate[0].qid,
    														'intermediateIssue':(intermediate.length > 0)?intermediate[0].certIssueDate:'',
    																'intermediateExpiry':(intermediate.length > 0)?intermediate[0].certExpireDate:'',
    																		'intermediatePlace':(intermediate.length > 0)?intermediate[0].auditPlace:'',
    																				'intermediateLeadSign':	(intermediate.length > 0)?intermediate[0].issuerSign:'',
    																						'interSignDate':	(intermediate.length > 0)?intermediate[0].issuerSignDate:'',
    																								'qrCodeData' : response.data,
    																								'dateOfReg': newCertificate[0].dateOfRegistry,
    																								'renewalEndorse2':renewalEndorse2,
    																								'extension':extension,
    																								'seal':newCertificate[0].seal ? newCertificate[0].seal : certHist.seal,
    																										'title':newCertificate[0].title ? newCertificate[0].title : certHist.title,
    																										'additionalReissue':additionalReissue,
    																										'certificateDetails':result,
    																										'latestSeqNumber':latestSeqNumber,
    																										'getEndrosedCountLatest':getEndrosedCountLatest,
    																										'intermediateReissue':intermediateReissue,
    																										'inLargetoAdd':inLargetoAdd
    						} 
    			    						console.log(certificateDatas);

    				//certificateDatas.qrCodeUrl = CERTI_URL + res.companyId + '/'+ result.qid;

    				var certificate;
    			    						
    				$timeout(function() {
    					
    					/*var QrCs = "";
						if(window.navigator.msSaveOrOpenBlob){
							QrCs = document.getElementsByTagName("qr")[0].children[1].src;
						}else{
							QrCs = document.getElementById('qrC').childNodes[2].currentSrc;
							console.log("QrCs",QrCs);
						}*/
						
						if (certificateDatas.AuditTypeId == AppConstant.ISM_TYPE_ID) {
							
						//	certificateDatas.QrC = QrCs;
							var certificate = auditService.ismPdfService(certificateDatas);
							
						} else if (certificateDatas.AuditTypeId == AppConstant.ISPS_TYPE_ID) {
							
						//	certificateDatas.QrC = QrCs;
							certificate = auditService.ispsPdfService(certificateDatas);
							
						} else if (certificateDatas.AuditTypeId == AppConstant.MLC_TYPE_ID) {
							
							//certificateDatas.QrC = QrCs;
							certificate = auditService.mlcPdfService(certificateDatas);
						}

    					
    					pdfMake.createPdf(certificate).getBlob(function(dataBlob) {
						    var assesUrl ='';
							
							downloadFiles(new Blob([dataBlob], {type : 'application/pdf'}),certificateDatas.certificateNo,assesUrl);
							
						});
    					
    				},2000)					
    			    				
    	});
    			/*	
    				toaster.success('Certificate data updated successfully');*/
    			}else{
    				blockUI.stop();
    			}
    			
        		});
    	}
    	
    	
    	
    	
    	
    	
    	
    	
    	
	function downloadFiles(blob, fileName,assesUrl) {
    		
    	    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For IE:
    	    	
    	    	window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
    	    	
    	    		var link = document.createElement('a');
         	        link.href = window.URL.createObjectURL(blob);
         	        certHist.CertificateBaseData = $sce.trustAsResourceUrl(link.href);
    	    	
    	    } else {
    	    		var link = document.createElement('a');
        	        link.style = "display: none"; 
        	        link.href = window.URL.createObjectURL(blob);
        	        document.body.appendChild(link);
        	        certHist.CertificateBaseData = $sce.trustAsResourceUrl(link.href);
        	 }
    	}
    	
    	
    	$scope.trustUrl = function(val){
    		
    		return $sce.trustAsResourceUrl(val);
    		blockUI.stop();
    	}    
		
    	
    	
    	
		
    	$scope.close = function(result) {
    		
    		close(result, 0);
			
			$('.modal-backdrop').remove();
			
		};
		
		
		
		
		
    }
    
})();