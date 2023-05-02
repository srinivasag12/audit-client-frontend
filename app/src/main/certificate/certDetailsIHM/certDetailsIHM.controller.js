(function (){
    'use strict';
   
    
    angular
        .module('app.certificate.detailsihm')        
        .controller('certificateHistoryControllerIhm', certificateHistoryControllerIhm)
        .controller('CertificateDetailsControllerIhm', CertificateDetailsControllerIhm)
        .controller('ihmCertificatesController', ihmCertificatesController)
        .controller('completionSurveyDatePopUpController', completionSurveyDatePopUpController); 
    
    
    function CertificateDetailsControllerIhm(userFactory,masterFactory,ModalService,blockUI,AppConstant,auditType,$window,$state,$scope,certificateFactory,$cookies,$timeout,certDtlRequiredData,toaster,YYYYMMDD,MMMDDYYYY,DDMMYYYY,DDMMMYYYY,HHmm,detailsFactory,auditService,auditFactory,detailsFactoryIhm,CERTI_URL,vesselStatementFactory){
    	
    	var certDetails = this;
    	$scope.qrString = "";
    	 
    	certDetails.AppConstant    = AppConstant;
    	
    	certDetails.ExtensionBtnClicked=false;
    	
    	certDetails.auditType	   = auditType;
    	
    	certDetails.withOutAdt	   = false;
    	
    	certDetails.withAdt	   	   = false;
    	
    	certDetails.disableVsl	   = false;
    	
    	certDetails.issName  = '';
    	
    	certDetails.disableAll	   = false;
    	
    	certDetails.disableDefaultFields  = true;
    	
    	certDetails.isAmendCreated  = false;
    	
    	certDetails.disableIssue     = false;
    	
    	certDetails.disableExpire    = false;
    	
    	certDetails.disablExtnIssue  = false;
    	
    	certDetails.disableEcField = false;
    	
    	certDetails.disablExtnExpire = false;
    	
    	certDetails.disableCertType  = false;
    	
    	certDetails.disableReissue  = false;
    	
    	certDetails.tempAuditData = '';
    	
    	certDetails.vesselHistory   = [];
    	
    	certDetails.certissued = '';
    	
    	certDetails.currentAuditData = '';
    	    	
    	certDetails.minCertIssueDate      = '';
    	
		certDetails.maxCertIssueDate      = '';
		
		certDetails.minCertExpireDate     = '';
		
		certDetails.maxCertExpireDate     = '';
		
		certDetails.minExtnCertIssueDate  = '';
		
		certDetails.maxExtnCertIssueDate  = '';
		
		certDetails.minExtnCertExpireDate = '';
		
		certDetails.maxExtnCertExpireDate = '';
		
		certDetails.tempPlace = '';
		certDetails.tempIssuerName = '';
		
		certDetails.nxtAuditCreate = false;
		
		certDetails.checkNxtAuditCreate = false;

		certDetails.IhmDisable = false;
		
		certDetails.renewalFulltermCertVal = false;
		
		certDetails.intermediateMinAuditDate = '';
		
		certDetails.previousCertExpiryDate = '';
		
		certDetails.checkPublish=false;
		
		certDetails.setCertIssueExpiry=setCertIssueExpiry;
		
		certDetails.onChangeIssueExpiryDate=onChangeIssueExpiryDate;
		
		certDetails.doBlur=doBlur;
		
		certDetails.disableExpireDate = disableExpireDate;
		
		certDetails.onChangeEndroseDate = onChangeEndroseDate;
		
		certDetails.ihmCertificatesPopup = ihmCertificatesPopup; 
		
		certDetails.onChangeCompletionDate = onChangeCompletionDate;
		
		certDetails.disableLock  = false ;
		
		certDetails.lockFunciton  =  lockFunciton ;
		
		certDetails.vesselDtlsCheck = vesselDtlsCheck;
		
		certDetails.ecGrantedReason = certDtlRequiredData.getEcGrantedReason;
		
		certDetails.ecGrantedReasonAll = certDtlRequiredData.getEcGrantedReason;
		
		certDetails.AuditVesselRefresh = [];
		
		console.log(certDetails.ecGrantedReason)
		
		certDetails.onchangeReissueName = '';
		
		certDetails.checkPreviousInitialOrRenewal=false;
		
		certDetails.onchangeReissueExpireName = '';
		
		certDetails.checkRefreshValue=false;
		
		certDetails.disableReissueFields=false;

		certDetails.setVesselHistory  = setVesselHistory;
		
		certDetails.checkGenerate=false;
		
    	certDetails.auditSeqNo     = Number($window.sessionStorage.getItem('certAuditSeqNo'));
        
    	certDetails.companyId      = Number($window.sessionStorage.getItem('certCompanyId') ? $window.sessionStorage.getItem('certCompanyId') :$window.sessionStorage.getItem('companyId') && $window.sessionStorage.getItem('companyId')!= 'null' ? $window.sessionStorage.getItem('companyId') : '');
        
    	certDetails.utn 		   = $window.sessionStorage.getItem('certUTN') ? $window.sessionStorage.getItem('certUTN') : '';
    	
    	certDetails.seqNo 	       = $window.sessionStorage.getItem('certSeqNo') ? $window.sessionStorage.getItem('certSeqNo') : '';
    
    	certDetails.activeStatus   = $window.sessionStorage.getItem('certActiveStatus') ? $window.sessionStorage.getItem('certActiveStatus') : '';
    	
    	certDetails.generateStatus = $window.sessionStorage.getItem('certGenerateStatus') ? $window.sessionStorage.getItem('certGenerateStatus') : '';
    	
    	certDetails.userRoleId     = sessionStorage.getItem('userRoleId');
    	
    	certDetails.loginUserId    = sessionStorage.getItem('emailId');
    
    	certDetails.auditingType = '';
    	
    	certDetails.ihmRev = false;
    	
    	certDetails.IHMCertIssueFlag = false;
    	  
        certDetails.mlcRev = false;
          
        certDetails.ispsRev = false;
          
        certDetails.ismRev = false;
        
        certDetails.auditDetailIhm = '';
        
        certDetails.validateFlagForIssueExpDate = true;
        
        certDetails.hkeuec = true;
        
        certDetails.downloadIHMCertificate = downloadIHMCertificate;
         
    	var currentUserDtl;
    	for(var j=0;j<certDtlRequiredData.getAudObsData.length;j++){
    		if(certDtlRequiredData.getAudObsData[j].emailId == certDetails.loginUserId){
    			currentUserDtl=certDtlRequiredData.getAudObsData[j];
    			}
    	}
    	
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem('emailId'),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		certDetails.issName = res[0].firstName + " " + res[0].lastName;
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				certDetails.signerNameGen = data.signer;
			});
    	});
    	
    	certDetails.type = $window.sessionStorage.getItem('certificateSeachType');
    	
      
    	 
    detailsFactory.getCurrentUserDetail(sessionStorage.getItem('emailId'),sessionStorage.getItem('companyId')).$promise.then(function(res){ 
    		 
    	 if(res.length>0){
		if(res[0].ihmreview == certDetails.AppConstant.IHM_REVIEW_OK){
			certDetails.ihmRev = true;
		 } 
		if(res[0].mlcreview == certDetails.AppConstant.MLC_REVIEW_OK){
			certDetails.mlcRev = true;
		}
	    	if( res[0].ispsReview == certDetails.AppConstant.ISPS_REVIEW_OK){
	    		certDetails.ispsRev = true;
			}
	    	if(res[0].ismreview == certDetails.AppConstant.ISM_REVIEW_OK){ 
	    		certDetails.ismRev = true;
	    	}
	    	 
    	    }
	}); 
    	
   	  certDetails.auditTypeArray  = certDtlRequiredData.auditTypes; 
   
     $timeout(function(){
   		 
   		certDetails.auditTypeArray = _.filter(certDetails.auditTypeArray, function(obj){
   			/*if(certDetails.ismRev && obj.auditTypeId ==1001  ){
    	    	   obj.userAuditType='ism';
   	    	 }
   			if(certDetails.ispsRev && obj.auditTypeId ==1002 ){
    	    	   obj.userAuditType='isps';
   	    	 }
   			if(certDetails.mlcRev  && obj.auditTypeId ==1003){
    	    	   obj.userAuditType='mlc';
   	    	 }*/
   	    	if(certDetails.ihmRev && obj.auditTypeId ==certDetails.AppConstant.IHM_TYPE_ID ){
   	    		obj.userAuditType='ihm';
   	    	 }
   	    	return  obj; 
   	    });
   		 
		},2000);  
   	     
		 
		 $scope.auditTypeFilter = function(item) {
			return (item.userAuditType === 'ihm' || item.userAuditType === 'mlc' || item.userAuditType === 'isps' || item.userAuditType === 'ism');
		 } 
		
    
    	certDetails.auditSubTypeArray        = certDtlRequiredData.auditSubTypes;
    
    	certDetails.vesselTypeArray          = certDtlRequiredData.vesselTypeData;
    	
    	certDetails.certificateIssuedOptions = certDtlRequiredData.certificateIssueReasons;
    	
    	certDetails.enableCertType 		 	 = [certDetails.AppConstant.INTERIM_CERT, certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.INTERMEDAITE_ENDORSED,certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    	
    	certDetails.enableCertTypeForIHM 	 = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    	
    	certDetails.CertTypeForIHM           = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    	
    	certDetails.CertTypeForAmendmentIHM = [];
    	
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
    	
    	certDetails.IHMDisableFunc = IHMDisableFunc;
    	
     	certDetails.IHMDisableVesselDetails = IHMDisableVesselDetails;
    	
    	certDetails.auditSubTypes     = [];
    	
    	certDetails.auditorNameArray  = {};
    	
    	certDetails.maxcompletionSurveyDate = '';
    	
    	certDetails.changeCallback = changeCallback;
    
    	certDetails.createValidation = createValidation;
    	
    	certDetails.auditDisable   = auditDisable;
    	
    	certDetails.auditPlaceDisable   = auditPlaceDisable;
    	
    	certDetails.certificateDtl    = {};
    	
    	//certDetails.certificateDtl.condEcGrant = 1;
    	
    	certDetails.orgCertificateDtl    = {};
    
    	certDetails.certDetails       = {};
    	
    	certDetails.portArray         = [];
    	
    	certDetails.oldVesseldata 	= [];
    	
    	certDetails.nameToPrint       = [{'nameID':'0','nameValue':'No'},{'nameID':'1','nameValue':'Yes'}];
    	
    	certDetails.consecutive       = [{'consecutiveId':1000,'nameValue':'No'},{'consecutiveId':1001,'nameValue':'Yes'}];
    	
    	certDetails.signToPrint       = [{'signID':'0','signValue':'No'},{'signID':'1','signValue':'Yes'}];
    	
    	certDetails.auditWithOutCertificate = [certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ, certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ, certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ];

    	certDetails.viewCertificate = viewCertificate;
    	
    	certDetails.certificateBackOption = sessionStorage.getItem('certificateSeachTypes');
    	
    	certDetails.downloadCertifiacte = downloadCertifiacte;
    	
    	//certDetails.downloadAllCertificate = downloadAllCertificate;
    	
    	certDetails.attachmentDisable = attachmentDisable;
    	
    	certDetails.dateValidation=dateValidation;
    	
    	certDetails.seal='';
		
    	certDetails.title='';
    	
    	certDetails.checkCertDesc = '';
    	
    	certDetails.dynamicMsg = '';
    	
    	certDetails.socLength = 0;
    	
    	certDetails.generateDisableIhm = generateDisableIhm;
    	
    	certDetails.publishDisableIhm = publishDisableIhm;
    	
    	certDetails.endroseDateDisable = endroseDateDisable;
    	
    	certDetails.checkAdminGenCer = checkAdminGenCer;

    	certDetails.renewalFulltermcertFlag = true;
    	
    	certDetails.nxtAuditInterOrAdd = false;
    	
    	certDetails.renewalExtendedExpiryDate = '';
    	
    	 certDetails.checkNxtAuditCreate = false;
    	 
    	 certDetails.checkRenewalGenerate = false;
    	 
    	 certDetails.certSearchScreen = false;
    	 
    	 certDetails.checkFlagGenerateOrPublish = false;
    	 
    	 certDetails.yatchImoNoRegistry = yatchImoNoRegistry;
    	 
    	 certDetails.completionSurveyPopup = completionSurveyPopup;
    	
    	 certDetails.ihmCertModal = {
  		       hk : false,
  		       eu : false,
  		       exe: false
  		     };
    	 
    	 certDetails.certDownType ="nor";
    	 
    	 certDetails.vesselData = certDtlRequiredData.vesselData;
    	 
    	 certDetails.vesselImoNorsIhm =[];
    	 
    	 certDetails.MaVesselYatchDataImoNors=[];
    	 
    	 certDetails.MaVesselYatchData =  certDtlRequiredData.getMaVesselYatchData; 
    	
    	 
    	 certDetails.ihmPrevReview       = [{'ihmPrevReviewID':'0','ihmPrevReviewValue':'No'},{'ihmPrevReviewID':'1','ihmPrevReviewValue':'Yes'}];
    	 
    	 certDetails.ihmDocumentNo = ' ';
    	 
    	 certDetails.certificateDtl.completionSurveyDate = moment(new Date()).format(DDMMMYYYY);
    	 
    	 certDetails.voyageEcGrant       = [{'voyageEcGrantID':'1','voyageEcGrantValue':'No'},{'voyageEcGrantID':'3','voyageEcGrantValue':'Yes'}];
    	 
    	 certDetails.hkEcEuPrevDet = hkEcEuPrevDet;

    	 $scope.$watch('certDetails.ihmDocumentNo', function(){
             var cache = $scope.certDetails.ihmDocumentNo ? $scope.certDetails.ihmDocumentNo :'';
             if (certDetails.ihmDocumentNo && !(/^[a-zA-Z0-9]+$/.test($scope.certDetails.ihmDocumentNo[0]))){      	
             	$scope.certDetails.ihmDocumentNo = cache.slice(1,cache.length);
             }
           })
    	 
           $scope.$watch('certDetails.certificateDtl.condEcGrant', function(){
                if (certDetails.certificateDtl.condEcGrant == 2 || certDetails.certificateDtl.condEcGrant == 3 ){         
                   
                    certDetails.ecGrantedReason = certDtlRequiredData.getEcGrantedReason.filter(function( obj ) {
                        return obj.activeStatus == 1 || obj.reasonId ==1;
                    });
                    certDetails.ecGrantedReasonExa = certDtlRequiredData.getEcGrantedReason.filter(function( obj ) {
                        return obj.activeStatus == 0 || obj.reasonId ==1;
                    });
                }
               
                else{
                     certDetails.ecGrantedReason = certDtlRequiredData.getEcGrantedReason.filter(function( obj ) {
                     return obj.activeStatus == 1 || obj.reasonId ==1;
                 });
                     certDetails.ecGrantedReasonExa = certDtlRequiredData.getEcGrantedReason.filter(function( obj ) {
                         return obj.activeStatus == 0 || obj.reasonId ==1;
                     });
              }
           });
           
           
    	 if(certDtlRequiredData.vesselData){
    	  _.filter(certDtlRequiredData.vesselData, function(obj){ 
    		 certDetails.vesselImoNorsIhm.push(obj.vesselImoNo) ;
			});
    	 }
    	 if(certDetails.MaVesselYatchData && certDetails.MaVesselYatchData.length>0){
    		 _.filter(certDetails.MaVesselYatchData, function(obj){ 
    			 certDetails.MaVesselYatchDataImoNors.push(obj.vesselImoNo) ;
    			 //certDetails.MaVesselYatchDataImoNors.push(obj.vesselName) ;
    			});
    	 }
    	
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
    	
    	
    	function yatchImoNoRegistry(data){ var vesselList='';
		 
    	//certDetails.vesselImoNorsIhm = angular.copy(certDetails.vesselImoNorsIhm);
    	certDetails.vesselDataYatch = data;
			ModalService.showModal({
    	    			
				templateUrl : 'src/modals/vesselImoNoRegistry.html',
				
				controller  : "vesselImoNoRegistryController as yatch",
				
					  inputs : { 
						  scope : certDetails	    				  //scope : {certDetails,'vesselImoNorsIhm':certDetails.vesselImoNorsIhm,'vesselData':data,'MaVesselYatchDataImoNors':certDetails.MaVesselYatchDataImoNors}

	    			  }
			
			}).then(function(modal) {
				
				modal.element.modal();
				
//				cfind.findingFileClick = true;
				
				modal.close.then(function(result) {
					
					blockUI.stop();
				});
				
			}); 
    		
    	}
    	
    	
    	
    	certDetails.maPort.forEach(function(port){
    		
            if(port.activeFlag==1){ 
    			
    			var portToIns = port.portName?port.portName:'';
    			
    			portToIns = portToIns ? port.countryName ? portToIns+', '+port.countryName : portToIns : port.countryName ? port.countryName :'';
    					
    			certDetails.portArray.push(portToIns);
    		}
         });
    	
    	certDetails.auditorNameArray = certDetails.getAudObsData.filter(function(array){
    		
    		
    			return array;
    		
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
    	
    	certDetails.validateAndGenerateCert  = validateAndGenerateCert;
    	
    	certDetails.genrateCertifiacte       =  genrateCertifiacte;
    	
    	certDetails. getCertificateDetails   = getCertificateDetails;
    	
    	certDetails.attachSignature          = attachSignature;
    	
    	certDetails.disableOptionsIhm        = disableOptionsIhm;
    	
    	certDetails.disableOptionsIhm_new   = disableOptionsIhm_new;
    	    	
    	certDetails.validateCertificate  	 = validateCertificate;
    
    	certDetails.stringToDate 			 = stringToDate;
    	
    	certDetails.onChangeCaller           = false; 	
    	
    	certDetails.back 					 = back;
    	
    	certDetails.dateFormater = dateFormater;
    	
    	certDetails.validateAndPublishCert   = validateAndPublishCert;
    	
    	certDetails.validatePublish 		 = validatePublish;
    	
    	certDetails.checkPublishPopup        = checkPublishPopup;
    	
    	certDetails.setExpireDate			 = setExpireDate;
    	
    	certDetails.setExpireDateIHM			 = setExpireDateIHM;
    	
    	certDetails.isIssueExpDateChanged    =  isIssueExpDateChanged; 
    	
    	certDetails.checkConsective			= checkConsective;
    	
    	certDetails.setExtendedExpireDate	 = setExtendedExpireDate;
    	
    	certDetails.onChangeSubType 		 = onChangeSubType;
    	
   // 	certDetails.checkRenewalType		= checkRenewalType;
    	
    	certDetails.getAuditCertDetails      = getAuditCertDetails;
    	
    	certDetails.disableIhmAmendment = disableIhmAmendment;
    	
    	certDetails.getAllIhmCertifiactes = getAllIhmCertifiactes;
    	
    	certDetails.IhmOptions = IhmOptions;
    	
    	certDetails.setDateAndDisableCertIssueExpiry = setDateAndDisableCertIssueExpiry;
    	
    	certDetails.setDateAndDisableCertIssueExpiryIHM = setDateAndDisableCertIssueExpiryIHM;
    	    	
    	certDetails.onChangeIssueType 		 = onChangeIssueType;

		certDetails.onChangeReissueReason	= onChangeReissueReason;  //Added by sudharsan for JIRA IRI-5248 
    	
    	certDetails.disableCertIssueTypeId = false;
    	
    	certDetails.certificateNum = '';
    	 
    	certDetails.certificateUtn = '';
    	
		certDetails.certificateqrCodeUrl = '';
		
		certDetails.latestVesselDetail = [];
    	
    	certDetails.releaseLock = true;
    	certDetails.allowEdit = false;
    	
    	certDetails.navigationScreen = false;
    	
    	certDetails.getPreviousAuditCerData;
    	
    	certDetails.portOfRegistry;
    	
    	/*     ON SCREEN LOAD STRAT   */
    	
    	
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

		certDetails.orgCertExtIssueDate = '';

		certDetails.orgCertExtExpiryDate = '';

		certDetails.orgCertEndrosedDate = '';

		certDetails.orgCertExtEndrosedDate = '';

		certDetails.orgCertGrt = '';

		certDetails.orgCertDor = '';
		
		certDetails.orgCertIhmDocumentNo = '';
		
		certDetails.orgCertcompletionSurveyDate = '';
		
		certDetails.orgCertCondEcGrant = '';
		
		certDetails.orgCertVoyageEcGrant = '';
		
		certDetails.AllIhmCertificateData = '';
		
		certDetails.orgCertKeelLaidDate = '';
		
		certDetails.orgRenewalRegulation = '';
		
		certDetails.orgRegCompanyAddress = '';
		
		certDetails.orgRegCompanyName = '';
		
		certDetails.orgRegOwnedImoNo = '';
		
		certDetails.orgVesselName = '';
		
		certDetails.orgPor = '';
		
		certDetails.orgVesselType = '';
		
		certDetails.orgCompanyImoNo = '';
		
		certDetails.orgVesselId = '';
		
		certDetails.publishCheckStatus = false;
		
		certDetails.isIssuExpIhmChange =  false;
    	
		
	
		
    	if($state.params.certificate){
			if($state.params.certificate == 'Audit'){
				console.log("==On click certificate==Audit");
				certDetails.disableVsl = true;
				certDetails.withAdt    = true;
				certDetails.navigationScreen = true;
				if(auditFactory.getCertificateDetails()){
					var auditAndCertData = angular.copy(auditFactory.getCertificateDetails());
					certDetails.tempAuditData = angular.copy(auditFactory.getCertificateDetails()).auditDetail;
					certDetails.AuditVesselRefresh = auditAndCertData.vesselDetail;
					certDetails.currentAuditData = angular.copy(auditFactory.getCertificateDetails()).auditDetail;
					certDetails.certificateDtl = angular.copy(auditFactory.getCertificateDetails()).auditDetail;
					
					
					certDetails.certificateDtl.certificateData = certDetails.certificateDtl.certificateData.filter(function(val) {
					    return val.socType != 'exe' &&  val.socType != "EXEMPTION" ;
					});
					
					certDetails.certificateDtl.certificateDataHistory = certDetails.certificateDtl.certificateDataHistory.filter(function(val) {
					    return val.socType != 'exe' &&  val.socType != "EXEMPTION";
					});
					if(certDetails.certificateDtl.certificateDetail){
					certDetails.certificateDtl.certificateDetail = certDetails.certificateDtl.certificateDetail.filter(function(val) {
					    return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
					});
					}
					
					if(auditAndCertData.auditDetail.certificateDetail){
						
						auditAndCertData.auditDetail.certificateDetail = auditAndCertData.auditDetail.certificateDetail.filter(function(val) {
							return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
						});
						
					 certDetails.socLength = auditAndCertData.auditDetail.certificateDetail.filter(function(val) {
					    return  val.socType != 'exe'  &&  val.socType != "EXEMPTION";
					}).length;
					}
					if(auditAndCertData.auditDetail.certificateDetails){
						
						auditAndCertData.auditDetail.certificateDetails = auditAndCertData.auditDetail.certificateDetails.filter(function(val) {
						    return  val.socType != 'exe'  &&  val.socType != "EXEMPTION";
						});
						
					 certDetails.socLength = auditAndCertData.auditDetail.certificateDetails.filter(function(val) {
						 return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
						}).length;
					}
					if(auditAndCertData.auditDetail.certificateData){
						
						auditAndCertData.auditDetail.certificateData = auditAndCertData.auditDetail.certificateData.filter(function(val) {
							return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
						});
						
					 certDetails.socLength = auditAndCertData.auditDetail.certificateData.filter(function(val) {
						 return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
					}).length;
					}
					
//					certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : auditAndCertData.auditDetail.leadAuditorName;
					certDetails.certificateDtl.issuerName = certDetails.signerName;
				
					certDetails.onChangeCaller = true;
					 
					$timeout(function(){
						certDetails.certificateDtl.regOwnedImoNo = certDetails.certificateDtl.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
					},1500);
					
					//certDetails.certificateDtl.completionSurveyDate = (certDetails.certificateDtl.completionSurveyDate == null) ? moment(new Date()).format(DDMMMYYYY): moment(certDetails.certificateDtl.completionSurveyDate).format(DDMMMYYYY)
					
					certDetails.certificateDtl.ihmDocumentNo = (!certDetails.certificateDtl.ihmDocumentNo) ? 'N/A' : certDetails.certificateDtl.ihmDocumentNo;
					
					//certDetails.certificateDtl.condEcGrant = (!certDetails.certificateDtl.condEcGrant) ? '1' : certDetails.certificateDtl.condEcGrant;
					
					var sortedECReason=certDetails.ecGrantedReason.sort(function(a,b){
					    return a.reasonId - b.reasonId;
					});
					
					
					certDetails.certificateDtl.certIssueId =  certDetails.certificateDtl.certificateData.length > 0 ? certDetails.certificateDtl.certificateData[0].certIssueId : (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID ? certDetails.AppConstant.FULL_TERM_IHM : certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
					certDetails.certificateDtl.condEcGrant = (!certDetails.certificateDtl.condEcGrant)?sortedECReason[0].reasonId:certDetails.certificateDtl.condEcGrant;
    			  	certDetails.certificateDtl.voyageEcGrant = (!certDetails.certificateDtl.voyageEcGrant) ? '1' : certDetails.certificateDtl.voyageEcGrant;
					
//					certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.certIssueId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID ? certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID : certDetails.certificateDtl.certIssueId;
					
					sessionStorage.setItem('certActiveStatus',certDetails.certificateDtl.activeStatus);
					
					certDetails.certificateDtl.getExactActiveStatus=1;
					
					certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;

				//	certDetails.orgCertificateDtl = angular.copy(auditFactory.getCertificateDetails()).auditDetail;
					
					certDetails.orgCertificateDtl = angular.copy(auditAndCertData.auditDetail); 
					
					if(! certDetails.certificateDtl.certificateDetails && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && !certDetails.withOutAdt && auditAndCertData.auditDetail.certificateDetail.length > 0){
					certDetails.disableOptionsIhm(auditAndCertData.auditDetail); 
					}
					
					certDetails.getPreviousAuditCerData = angular.copy(auditFactory.getCertificateDetails()).previousAudit;

					certDetails.minAuditDate = auditAndCertData.minAuditDate;

					certDetails.maxAuditDate = auditAndCertData.maxAuditDate;
					
					certDetails.certificateDtl.nameToPrint='1';
					
					certDetails.certificateDtl.signToPrint='1';
					
					certDetails.certificateDtl.ihmPrevReview='0';
					
					certDetails.getCurrentClosingMeetingDate = moment(certDetails.orgCertificateDtl.closeMeetingDate,DDMMMYYYY+HHmm).format(DDMMMYYYY);
 
					certDetails.Stateflag = true;
					
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
					
					if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
							certDetails.certificateDtl.completionSurveyDate = certDetails.certificateDtl.completionSurveyDate && certDetails.certificateDtl.completionSurveyDate != null ? certDetails.certificateDtl.completionSurveyDate: certDetails.certificateDtl.certIssueDate;
						
					}
					
					certDetails.IhmFieldsDisable = certDetails.socLength > 0 && certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certificateDetail.length> 0 ? (certDetails.certificateDtl.certificateDetail[0].publishStatus == 1 ? true: false) : false;
					if((!certDetails.certificateDtl.certificateDetail || certDetails.certificateDtl.certificateDetail.length == 0 ) && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
						certDetails.certificateDtl.certIssueDate = moment(new Date()).format(DDMMMYYYY);
					}
					
			/*		if(certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certificateDetail.length> 0 && certDetails.certificateDtl.certificateDetail[0].publishStatus == 1 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
						certDetails.disableIhmAmendment();
					}*/
					
					if(certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certificateDetail.length == 0  && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
						certDetails.disableIhmAmendment();
					}
					else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
						certDetails.CertTypeForIHM = [];
						certDetails.CertTypeForIHM.push(certDetails.AppConstant.FULL_TERM_IHM);
		    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.EXTENSION_IHM);
		    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM);
		    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM);
					}
					
					var detailsLead= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});
					

					certDetails.leadStatus = (detailsLead.userId == sessionStorage.getItem('emailId')) ? true : false;
					certDetails.leadSign=detailsLead.audSignature!=null && detailsLead.audSignature!=undefined && detailsLead.audSignature!=''?true:false;
					
					
                    var check= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
 		    		
 					certDetails.reviewSign=check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined?true:false;
 		    		
					certDetails.bckButton = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? "Inspection Home" : certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID ?"Audit Home" : "Review Home";
					
					certDetails.auditingType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditTypeLabel : certDetails.auditTypeLabelMLC;
					
					certDetails.auditingSubType = "Review Sub Type";
					
					certDetails.auditDateForScreenType=certDetails.auditDateForScreen;

				     certDetails.userLoggedName = 'Auditor Name';
				     
					certDetails.setDateAndDisableCertIssueExpiryIHM();
					 
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
					certDetails.certificateDtl.vesselCompanyName = auditAndCertData.vesselDetail.registeredCompanyName;
 					certDetails.certificateDtl.vesselCompanyAddress = auditAndCertData.vesselDetail.registeredCompanyAddress;

					certDetails.certificateDtl.keelLaidDate = dateFormater(certDetails.certificateDtl.keelLaidDate,'DD-MMM-YYYY');
					certDetails.portOfRegistry = auditAndCertData.vesselDetail.portOfRegistry;

					certDetails.orgCertificateDtl.portOfRegistry = certDetails.orgCertificateDtl.portOfRegistry ? certDetails.orgCertificateDtl.portOfRegistry : auditAndCertData.vesselDetail.portOfRegistry;

					certDetails.getAuditSubType(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.auditSubTypeId);
					
					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
						certDetails.certificateDtl.extendedIssueDate =certDetails.certificateDtl.extendedIssueDate?certDetails.certificateDtl.extendedIssueDate:certDetails.certificateDtl.certIssueDate;
						certDetails.certificateDtl.extendedExpireDate =certDetails.certificateDtl.extendedExpireDate?certDetails.certificateDtl.extendedExpireDate:certDetails.certificateDtl.certExpireDate;
						certDetails.certificateDtl.endorsedDate = certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : (certDetails.certificateDtl.certIssueDate);
					}
					
					if(!(auditAndCertData.auditDetail.certificateDetail) || auditAndCertData.auditDetail.certificateDetail.length==0){

						certDetails.certificateDtl.seqNo = 0;

					}else if(auditAndCertData.auditDetail.certificateDetail.length>0){

						certDetails.certificateLength = auditAndCertData.auditDetail.certificateDetail.length;

						var maxSeqNoCert = auditAndCertData.auditDetail.certificateDetail.reduce(function(prev, current){
							return (prev.seqNo > current.seqNo) ? prev : current
						});

						if(maxSeqNoCert && maxSeqNoCert.publishStatus){
							certDetails.IhmDisable = false; 
							certDetails.certificateDtl.publishStatus = maxSeqNoCert.publishStatus;

							if(!(certDetails.disableAll) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM) && certDetails.certificateDtl.publishStatus==1){

								toaster.warning('Certificate already published for this Audit, please update certificate type to update certificate details');
							}

							certDetails.certificateDtl.seqNo = 0;
							certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
							certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
							certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
							certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;

						}else if(maxSeqNoCert && !(maxSeqNoCert.publishStatus)){
							if(maxSeqNoCert.activeStatus == 1 && maxSeqNoCert.auditStatusId != certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && maxSeqNoCert.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
									certDetails.IhmDisable = true; 
							}
							certDetails.certificateDtl.seqNo 		  = maxSeqNoCert.seqNo;
							certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
							certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
							certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
							certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;
							certDetails.certificateDtl.certificateVer = maxSeqNoCert.certificateVer;
							certDetails.certificateDtl.publishStatus  = maxSeqNoCert.publishStatus;
							certDetails.certificateDtl.activeStatus   = maxSeqNoCert.activeStatus;
							certDetails.certificateDtl.leadName       = maxSeqNoCert.issuerName;
							certDetails.certificateDtl.vesselId		  = maxSeqNoCert.vesselId;
							certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID
						}
					}
				
					
					
					if(((auditAndCertData.auditDetail.certificateData && auditAndCertData.auditDetail.certificateData.length > 0 && certDetails.leadStatus) || (!certDetails.leadStatus) || (certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS)) && certDetails.socLength  > 0){
							displayCertDtlsData(auditAndCertData);
					}

//					if(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS ){
//						certDetails.disableAll = true;
//					}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 0){
//						certDetails.disableAll = true;
//					}
					
					if(auditAndCertData.auditDetail.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS ){
						certDetails.disableAll = false;
					}
					certDetails.certificateDtl.extendedEndorsedDate = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? ((certDetails.leadStatus) ? moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY') : certDetails.certificateDtl.extendedEndorsedDate ? certDetails.certificateDtl.extendedEndorsedDate : '') : '';
					
					if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM){
						certDetails.orgCertificateDtl.portOfRegistry = certDetails.certificateDtl.portOfRegistry;
					}

					if(auditAndCertData.auditDetail.certificateData.length >1){
					
						certDetails.getAllIhmCertifiactes();
					}
					certDetails.disableCertIssueTypeId = false;

					if(auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS){
						toaster.info('Current audit marked as void');
						certDetails.disableAll = true;
						displayCertDtlsData(auditAndCertData);
					}else if(certDetails.certificateDtl.lockStatus == 1){
						toaster.info('Current audit reterived in the laptop');
						certDetails.disableAll = true;
					}

					if(!(certDetails.leadStatus || certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID)){
						certDetails.enabled = false;
					}

					certDetails.enabled = auditAndCertData.auditDetail.auditlockStatus;

					if(auditAndCertData.auditDetail.auditlockStatus){
						certDetails.releaseLock = false;
						 
					}
					
					if(auditAndCertData.auditDetail.lockHolder != certDetails.loginUserId){
   					 certDetails.allowEdit = true;
   				 }

					if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
						certDetails.certificateDtl.consecutiveId=1000;
					}

					certDetails.checkCertDesc = certDetails.orgCertificateDtl.certIssueId;

//					certDetails.certificateDtl.issuerName =  auditAndCertData.auditDetail.leadAuditorName ? auditAndCertData.auditDetail.leadAuditorName : certDtlRequiredData.getCurrentUserFullName.userName;

					certDetails.certificateDtl.auditStatusId = auditAndCertData.auditDetail.auditStatusId;

					certDetails.releaseLock = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID) ? true : certDetails.releaseLock;
					
					var userFlag = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) ? 'Manager' : 'lead';
	    			
					 certDetails.onchangeReissueName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? 'Issue Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM) ? 'Issue Date' : '';

    				 certDetails.onchangeReissueExpireName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? 'Extended Expiry Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM) ? 'Expiration Date' : '';
					
					$timeout(function(){
	    				if((certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.publishStatus==1) && certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS
	            				&& ((certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS) 
	            				|| ((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 1))){
	            			toaster.info('certificate already published please change the certificate issue type'); console.log("bvdvjvdjvd");
	            			certDetails.disableGenerate = true;
	            		}
	    			},20);
					
					setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
					checkOrgCertDtlVal(certDetails.certificateDtl,certDetails.orgCertificateDtl);
					vesselDtlsCheck();
					 
 						certDetails.lockFunciton();
 						
				}

			}else if($state.params.certificate == 'Search'){
				certDetails.onChangeCaller = true;
		        console.log("else search");
				certDetails.checkRefreshValue=true;
				certDetails.disableVsl = true;
				certDetails.withAdt    = true;
				certDetails.bckButton='Back';
				certDetails.getCertificateDetails();
			
				certDetails.certSearchScreen = true;
			
			}else if($state.params.certificate == 'withOutAudit'){
				console.log("Without audit");
				$timeout(function(){
					if(!certDetails.enabled){
						toaster.warning('Apply lock to Proceed');
    				}
    			},10);
    			//certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
				certDetails.bckButton='DashBoard';
				certDetails.auditingType ='Review Type';
				certDetails.auditingSubType ='Review Sub Type';
				//certDetails.auditDateForScreenType='Audit Date';
				certDetails.withOutAdt = true;
				
			}

    	}else{
    		 
    		console.log("else");
    		 
    		if(certDetails.type=='Search'){
    			console.log("Search "+certDetails.type);
    			certDetails.onChangeCaller = true;
    			 	certDetails.getCertificateDetails();
     			 	certDetails.checkRefreshValue=true;
    			 	certDetails.certSearchScreen = true;
    			 	certDetails.auditingType ='Audit Type';
    				certDetails.auditingSubType ='Audit Sub Type';
    				certDetails.bckButton='Back';
    				certDetails.withOutAdt = true;
	

    		}else if(certDetails.type=='Audit'){
    			console.log("Audit");
    			certDetails.onChangeCaller = true;
    			certDetails.disableVsl = true;
    			certDetails.withAdt    = true;
    			certDetails.getAuditCertDetails();
//    			setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo);
    			$timeout(function(){
    			certDetails.bckButton = "Review Home";
    			},1000);
    		}else{
    			/*******without Audit generate certificate*********/
    			console.log("Without audit2");
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

    		var expireDate = (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM) ? moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)
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
    	
    	function changeCallback(){
    		 
    		  if(certDetails.enabled){
    			  certDetails.allowEdit = false;
			 certDetails.releaseLock = false;
			
			 if(certDetails.withAdt){
			 certDetails.createedit = 'Lock';
			  detailsFactory.updateLockHolder(certDetails.certificateDtl.auditTypeId, certDetails.auditSeqNo,sessionStorage.getItem('emailId'),certDetails.companyId).$promise.then(function(data){
			  if(data.data=='Success'){
					toaster.success('Lock has been applied successfully');
					certDetails.disableAll = false;
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
					toaster.success('Lock Released Successfully');
					certDetails.disableAll = false;
					}
 			         });
			         }else{
			        	 toaster.success('Lock Released Successfully');
			              }
		             certDetails.releaseLock = true;
		          }
    		  
    		  
    		 }
    	function IHMDisableFunc(){
    		var v = (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN) || 
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
		  || (certDetails.userRoleId == certDetails.AppConstant.MANAGER_ROLE_ID && !certDetails.managerDisableDropdown && !(certDetails.userRoleId==1003)) || certDetails.managerSearch ||(certDetails.generOrPubStatus =='generate' || certDetails.certificateDtl.generatedBy=='1001' && certDetails.certificateDtl.publishStatus!=1);   //Added by sudharsan for JIRA-ID=5342 on 27-06-2022 && JIRA-ID=5371
    			return v;
    	}
    	
    	
    	function displayCertDtlsData(auditAndCertData){
			IHMDisableFunc();  //Added by sudharsan for JIRA-ID=5342 on 27-06-2022
    		var socCert = auditAndCertData.auditDetail.certificateDetail.filter(function(val) {
			    return val.socType != 'exe' ;
			});
    		
    		certDetails.certificateDtl = angular.copy(angular.copy(socCert))[0];
    		 getUserDet(certDetails.certificateDtl.issuerId,certDetails.certificateDtl.companyId);
//    		certDetails.certificateDtl.issuerName = certDetails.signerName;
			 if(auditAndCertData.auditDetail.certificateDetail.length > 1){
			 if(auditAndCertData.auditDetail.certificateDetail[1].auditDate !=  moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) ){
				 certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate;
			 }
			 }
			 else {
    			 if(auditAndCertData.auditDetail.certificateDetail[0].auditDate !=  moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) ){
    				 certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate;
    			 }
    		 }
	//		 certDetails.certificateDtl.certIssueDate = moment(certDetails.certificateDtl.auditDate,YYYYMMDD).format(MMMDDYYYY);
    		certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint+'';
    		certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';
    		//certDetails.certificateDtl.condEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' : (!certDetails.certificateDtl.condEcGrant) ? '1' :  certDetails.certificateDtl.condEcGrant;
    		certDetails.certificateDtl.voyageEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' :  (!certDetails.certificateDtl.voyageEcGrant) ? '1' : ''+certDetails.certificateDtl.voyageEcGrant+'';
    		certDetails.certificateDtl.ihmPrevReview = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '0' :  ''+certDetails.certificateDtl.ihmPrevReview+'';
    		certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    		certDetails.certificateDtl.ihmDocumentNo = (!certDetails.certificateDtl.ihmDocumentNo)? 'N/A' : certDetails.certificateDtl.ihmDocumentNo;
    		certDetails.certificateDtl.regOwnedImoNo =certDetails.certificateDtl.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
    	try{ 
    			certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.auditPlace?decodeURIComponent(atob(certDetails.certificateDtl.auditPlace)):'';
    		}
    		catch(err){
    		}
    		certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);
    		
    		certDetails.setDateAndDisableCertIssueExpiryIHM();

    	}
    	

    	/*     ON SCREEN LOAD  END  */
    	
    	
    	/******* function body *******/
    	
    	function getCertificateDetails(){
    		
    		certificateFactory.getCertificateDetailForIhm(certDetails.auditSeqNo, certDetails.companyId, certDetails.seqNo,certDetails.activeStatus,'soc').$promise.then(function(res){
                   
    			certDetails.certificateDtl = angular.copy(res.result);
    			
    			if(res.initalCount==1 || res.renewalCount==1){
    				certDetails.checkPreviousInitialOrRenewal=true;
    			}
    				 if(certDetails.auditSeqNo==certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ || certDetails.auditSeqNo==certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || certDetails.auditSeqNo ==certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ){
    					 certDetails.withOutAdt=true;
    				 }
    			certDetails.getPreviousAuditCerData = angular.copy(auditFactory.getCertificateDetails()).previousAudit;
    		 
    			certificateFactory.getAuditCertDetailsForIhm(certDetails.auditSeqNo, certDetails.companyId).$promise.then(function(response){
					console.log(response);
					certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : response.auditDetail.leadAuditorName;
					certDetails.certificateDtl.issuerName = certDetails.signerName;
				
					certDetails.socLength = response.auditDetail.certificateDetail.filter(function(val) {
 					    return val.socType != 'exe'  &&  val.socType != "EXEMPTION"; ;
 					}).length;
					
				if(certDetails.auditSeqNo!=600001 && certDetails.auditSeqNo!=600002 && certDetails.auditSeqNo!=600003 && certDetails.auditSeqNo!=600004){
				 
					certDetails.auditAuditorDetail1=angular.copy(response.auditDetail.auditAuditorDetail);
					certDetails.auditDetailIhm = angular.copy(response.auditDetail);
					 
				}
    			
					if(certDetails.certificateDtl && certDetails.certificateDtl.publishStatus==1 && certDetails.certSearchScreen == true){
						certDetails.certificateNotPublish==true;
					}
				if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.activeStatus==1){
					certDetails.ihmDisable = true;
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
    			certDetails.orgCertificateDtl = angular.copy(res.result);
        
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
    			if(certDetails.withOutAdt){
    				setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
    				if(certDetails.certificateDtl.activeStatus == 1 && certDetails.certificateDtl.publishStatus == 0){
    				certDetails.enabled = true;
    				certDetails.releaseLock = false;
    				certDetails.disableCertIssueTypeId = false;
    				}
    			}
    			certDetails.nxtAuditCreate = res.nextAudit ? res.nextAudit : certDetails.nxtAuditCreate;

    			certDetails.nxtAuditInterOrAdd = res.nxtAuditInterOrAdd ? res.nxtAuditInterOrAdd : certDetails.nxtAuditInterOrAdd;

    			certDetails.previousCertExpiryDate = res.previousCertExpiryDate ?  moment(res.previousCertExpiryDate,YYYYMMDD).format(MMMDDYYYY) : '';

    			certDetails.checkNxtAuditCreate =  res.checkNxtAuditCreate ?  res.checkNxtAuditCreate : certDetails.checkNxtAuditCreate;

    			certDetails.certificateLength = certDetails.certificateDtl.seqNo;

    			certDetails.intermediateMinAuditDate = res.intermediateMinAuditDate ? moment(res.intermediateMinAuditDate,YYYYMMDD).format(MMMDDYYYY) : '';	 

    			certDetails.getAuditSubType(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.auditSubTypeId);
    			
    			certDetails.auditingType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditTypeLabel : certDetails.auditTypeLabelMLC;
				
				certDetails.auditingSubType = certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ? certDetails.auditSubTypeLabel : certDetails.auditSubTypeLabelMLC;

				certDetails.checkPrevRenewalIsFullterm = res.prevRenewalIsFullterm ? 1 : 0;
				
				certDetails.checkPrevRenewalIsRenewalEndrosed = res.prevRenewalIsRenewalEndrosed ? 1 : 0;
				
				certDetails.auditOrInspectionDetailsForScreenType= certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID ? "Review Details" :certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID ?certDetails.auditOrInspectionDetailsForScreen:certDetails.auditOrInspectionDetailsForScreenMLC;
				
				certDetails.auditDateForScreenType=certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID?certDetails.auditDateForScreen:certDetails.auditDateForScreenMLC;
				
				
				if(certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.MLC_TYPE_ID){
					certDetails.userLoggedName = 'Auditor Name';
				}else{certDetails.userLoggedName = 'Inspector Name';}
				
				
				
				
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

    			if(certDetails.certificateDtl.socType == "hk"){
    				certDetails.ihmCertModal.hk = true
    			}else if(certDetails.certificateDtl.socType == "eu"){
    				certDetails.ihmCertModal.eu = true
    			}
    			else if(certDetails.certificateDtl.socType == "exe"){
    				certDetails.ihmCertModal.exe = true
    			}
    			
    			certDetails.certificateDtl.issuerSign = certDetails.certificateDtl.issuerSign ? atob(certDetails.certificateDtl.issuerSign):'';

    			certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint;

    			certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint;
    			
    			//certDetails.certificateDtl.condEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' : (!certDetails.certificateDtl.condEcGrant) ? '1' : certDetails.certificateDtl.condEcGrant;
    			
    			certDetails.certificateDtl.voyageEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' :(!certDetails.certificateDtl.voyageEcGrant) ? '1': ''+certDetails.certificateDtl.voyageEcGrant;
    			
    			certDetails.certificateDtl.ihmPrevReview = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '0' :''+certDetails.certificateDtl.ihmPrevReview;
    			
    			certDetails.certificateDtl.ihmDocumentNo = (!certDetails.certificateDtl.ihmDocumentNo) ? 'N/A' : certDetails.certificateDtl.ihmDocumentNo;
    			
    			certDetails.certificateDtl.regOwnedImoNo =certDetails.certificateDtl.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
    			
    			certDetails.leadStatus = (certDetails.certificateDtl.leadAuditorId == sessionStorage.getItem('emailId')) ? true : false;

    			if(!(certDetails.leadStatus) && certDetails.certificateDtl.allowNext==0){
    				certDetails.disableAll = true;
    			}


    			if(!(certDetails.disableAll) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM) && certDetails.certificateDtl.publishStatus==1 && !((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID && certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 0) && !(certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS) && (certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS)){

    				if(!certDetails.publishCheckStatus && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ && certDetails.certificateDtl.auditSeqNo!=certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ ){
    					toaster.warning('Current Certificate is already published, please change the certificate type');
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

    			if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM) && certDetails.certificateDtl.publishStatus==1 && certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) {

    				toaster.warning('Current Certificate is already published, please change the certificate type');
    			}

    			certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);

    			certDetails.setDateAndDisableCertIssueExpiryIHM();

    			certDetails.onchangeReissueName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? 'Issue Date' : 
					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM) ? 'Issue Date' : '';

				certDetails.onchangeReissueExpireName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? 'Extended Expiry Date' : 
					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM) ? 'Expiration Date' : '';

    			
    			if(certDetails.certificateDtl.activeStatus==0){
    				certDetails.disableAll = true
    			}

    			if(certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS){
    				certDetails.disableAll = true;
    				certDetails.enabled = false;
    			}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 0){
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
    			certDetails.enableCertTypeForIHM.push(certDetails.certificateDtl.certIssueId);
    		
    			
    			validateIssueExpiryDate();
    			
    			renewalEndrosedChangedVal();

    			if(certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS){
    				toaster.info('Current audit marked as void');
    				certDetails.enabled = false;
    			}else if(certDetails.certificateDtl.lockStatus == 1){
    				toaster.info('Current audit reterived in the laptop');
    				certDetails.disableAll = true;
    			}

    			if(!(certDetails.leadStatus || certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID)){
    				certDetails.enabled = false;
    			}

    			if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    				certDetails.certificateDtl.consecutiveId=1000;
    			}
    			
    			var userFlag = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) ? 'Manager' : 'lead';
    			
    			if(!certDetails.nxtAuditCreate && (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)){

    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];

    				if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){

    					certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION_IHM);
    				}

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					enableRenewalCertTypeVthSearchScreen();
    					
    				}

    			}

    			certDetails.checkNxtInterOrAddiReissuePresent = (certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID && certDetails.nxtAuditInterOrAdd) ? 1 : 0;
    			
    			certDetails.releaseLock = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID) ? true : certDetails.releaseLock;

    			if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.auditSeqNo !=certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ ){
    			  certDetails.getAllIhmCertifiactes();
    			  
    			}

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
    			
    			if(!certDetails.publishCheckStatus && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.publishStatus==1) && certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS
        				&& ((certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS) 
        				|| ((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 1))){
        			toaster.info('certificate already published please change the certificate issue type');
        			certDetails.disableGenerate = true;
        		}
    			 
    			checkOrgCertDtlVal(certDetails.certificateDtl,angular.copy(res.result));
    			
    			certDetails.publishCheckStatus = false;

    		});
    		
    			if(certDetails.certificateDtl && certDetails.certificateDtl.vesselImoNo){ 
    				
    			
	    	        	var auditCycleSearchBean={'vesselName': certDetails.certificateDtl.vesselName ,'vesselImoNo':certDetails.certificateDtl.vesselImoNo,'auditTypeId':certDetails.certificateDtl.auditTypeId};	
	    	        	sessionStorage.setItem('quickSearchDataVesselImoNo', certDetails.certificateDtl.vesselImoNo );
	    	        	sessionStorage.setItem('quickSearchDataAuditTypeId', certDetails.certificateDtl.auditTypeId );
	    	        	sessionStorage.setItem('quickSearchDataVeslNme', certDetails.certificateDtl.vesselName );
	    	        	sessionStorage.setItem('auditCycleSearchBean', auditCycleSearchBean );
    				
    	        }
    			if(($state.params.certificate == 'Search'|| certDetails.type=='Search') && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && !certDetails.withOutAdt){
					certDetails.disableOptionsIhm_new(certDetails.certificateDtl);
				}
    			vesselDtlsCheck();
    	});
    	
    	}
    	
    	function validateAndGenerateCert(){
    		
			 certDetails.generOrPubStatus = 'generate';

    		if(certDetails.validateCertificate()){
    			if(certDetails.withOutAdt){
//      				getCertificateNoWithOutAudit();
      			}
    			certDetails.genrateCertifiacte();
    		}
    	}//end of validateAndGenerateCert()
    	/**Added by sudharsan for JIRA IRI-5248 */
		  function onChangeReissueReason(){ 
			if(certDetails.certificateDtl.certReissueReason!=1010){
				$('#certReissueReason').removeClass('err');
			}
		  }
			/**End Here */    
    	
    	
    	 function doBlur(event){
 		    event.target.blur();
 		}
    	 
    	function getAllIhmCertifiactes(){
    		
				certificateFactory.getAllCertificateDetailForIhm(certDetails.certificateDtl.auditTypeId, certDetails.certificateDtl.vesselImoNo, certDetails.certificateDtl.companyId,'soc').$promise.then(function(res){
			          
					certDetails.AllIhmCertificateData = angular.copy(res.result);
					certDetails.hkEcEuPrevDet();
					if(certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
					if (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
					certDetails.disableIhmAmendment(certDetails.AllIhmCertificateData);
					}
					else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && ($state.params.certificate == 'Search' || certDetails.type == 'Search' ) && !certDetails.withOutAdt)
						{
						certDetails.disableOptionsIhm_new(certDetails.AllIhmCertificateData);
						}
					validateIssueExpiryDate();
					}
					else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
						 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM, certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM];
					}
				});
				
    	}
    	
    	function genrateCertifiacte(){
    		
  
    		certDetails.ihmCertificatesPopup();

    	}//end of genrateCertifiacte()
    	
    
    	function IHMDisableVesselDetails(){ //grt,date of registry, keel laid date  fields are disable
    		if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    			
    			if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM &&certDetails.certificateDtl.publishStatus==1)|| certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM ||certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
				
    			var v = ((certDetails.certificateDtl.certificateDetail) || certDetails.IhmDisable || certDetails.disableVsl) 
        		return v;
        	 }
    		}
    	}
    	function setCertDataAfterGenerate(res,msg){
    		certDetails.hkeuec = false;
    		certDetails.certificateDtl.utn            = res.updatedData.utn;
    		certDetails.certificateDtl.seqNo          = res.updatedData.seqNo;
    		certDetails.certificateDtl.auditSeqNo     = res.updatedData.auditSeqNo;
    		certDetails.certificateDtl.certificateNo  = res.updatedData.certificateNo;
    		certDetails.certificateDtl.certificateId  = res.updatedData.certificateId;
    		certDetails.certificateDtl.endorsementID  = res.updatedData.endorsementID;
    		certDetails.certificateDtl.qrCodeUrl 	  = res.updatedData.qrCodeUrl;
//  		certDetails.certificateDtl.auditDate 	  = new Date(res.updatedData.auditDate);
    		certDetails.certificateDtl.auditDate      = res.updatedData.auditDate?moment(res.updatedData.auditDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.additionalSurvey      =  res.updatedData.endorsedDate ? moment(res.updatedData.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.certificateVer = res.updatedData.certificateVer;
    		certDetails.certificateDtl.publishStatus  = res.updatedData.publishStatus;
    		certDetails.certificateDtl.activeStatus  = res.updatedData.activeStatus;
    		certDetails.certificateDtl.leadName       = res.updatedData.leadName;
    		certDetails.certificateDtl.issuerId 	  = res.updatedData.issuerId;
    		certDetails.certificateDtl.endorsedDate = res.updatedData.endorsedDate ? moment(res.updatedData.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.extendedExpireDate = res.updatedData.extendedExpireDate ? moment(res.updatedData.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.checkCertDesc = res.updatedData.certIssueId;
    		certDetails.renewalExtendedExpiryDate =  res.updatedData.extendedIssueDate ? moment(res.updatedData.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) : '';
    		certDetails.certificateDtl.certificateLink = res.updatedData.certificateLink;
    		certDetails.orgCertificateDtl.portOfRegistry =  res.updatedData.portOfRegistry;
    		certDetails.orgCertificateDtl.grt =  res.updatedData.grt;
    		certDetails.checkRenewalGenerate = true;
    		certDetails.checkFlagGenerateOrPublish = true;
    		certDetails.certificateDtl.renewalRegulation = res.updatedData.renewalRegulation; 
    		certDetails.auditDtlsGrt =  res.updatedData.grt;
    		certDetails.auditDtlsdateOfRegistry =  res.updatedData.dateOfRegistry ?  moment(res.updatedData.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
			certDetails.auditDtlsAuditDate = res.updatedData.auditDate ? moment(res.updatedData.auditDate,YYYYMMDD).format(MMMDDYYYY) : '' ;
			certDetails.lstCertGrt =  res.updatedData.grt;
			certDetails.lstCertDor =  res.updatedData.dateOfRegistry ?  moment(res.updatedData.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
			certDetails.lstCertAuditDate = res.updatedData.auditDate ? moment(res.updatedData.auditDate,YYYYMMDD).format(MMMDDYYYY) : '' ;    		
			
    		if(res.updatedData.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && res.updatedData.certIssueId == certDetails.AppConstant.FULL_TERM_IHM ){
    			certDetails.generateCertIssueDate =	res.updatedData.certIssueDate ? moment(res.updatedData.certIssueDate,YYYYMMDD).format(MMMDDYYYY) : '';	
    			certDetails.renewalfulltermPublish = res.updatedData.publishStatus == 1 ? false : true;
    			
    		} 
    		    		
    		sessionStorage.setItem('seqNo',certDetails.certificateDtl.seqNo);
    		if(certDetails.type != "Audit"){
    		sessionStorage.setItem('certificateSeachType','Search');
    		}
    		sessionStorage.setItem('certSeqNo',certDetails.certificateDtl.seqNo);
    		sessionStorage.setItem('certActiveStatus',certDetails.certificateDtl.activeStatus);
    	
    		certDetails.disableVsl = true;
    		if(res.updatedData.publishStatus == 0){
    			certDetails.checkGenerate=true;
    			checkOrgCertDtlVal(certDetails.certificateDtl,res.updatedData);
    		}
    		if(res.updatedData.publishStatus == 1 && (res.updatedData.auditSeqNo == certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ
    				|| res.updatedData.auditSeqNo == certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || res.updatedData.auditSeqNo == certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ))
    		{
    			certDetails.disableAll = true;

    		}else{
    				if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.FULL_TERM_IHM){
    					certDetails.checkFullTermCertPresent = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.INTERIM_CERT){
    					certDetails.checkIntermCertPresent = 1
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED){
    					certDetails.checkIntermediateCertPresent = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    					certDetails.checkAdditionalCertPresent =1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
    					certDetails.certificateDtl.checkAdminRenewalEndrosed =1;
    					certDetails.certificateDtl.checkAdminRenewalCert = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    					certDetails.certificateDtl.checkOnlyRenewalEndrosed = 1;
    				}else if(res.updatedData.publishStatus == 1 && res.updatedData.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
    					certDetails.certificateDtl.checkExtensionCert = 1;
    					certDetails.certificateDtl.checkExtensionInRenewal = 1;
    				}
    				
    				if (msg=='publish'){
    	    			toaster.success('Certificate published successfully');
    	    		}
//	
    				if(res.updatedData.publishStatus == 0 && !certDetails.certSearchScreen){
    					certDetails.publishCheckStatus = false;
    					 if(!certDetails.withOutAdt){ 
    						 getAuditCertDetails(); 
    					 }
    					}
    				if(res.updatedData.publishStatus == 1 && !certDetails.certSearchScreen){
    					certDetails.publishCheckStatus = true;
    					if(!certDetails.withOutAdt){ 
   						 getAuditCertDetails(); 
   						  
   					 } 
    				}else if(res.updatedData.publishStatus == 1 && certDetails.certSearchScreen){  
    					certDetails.seqNo = $window.sessionStorage.getItem('certSeqNo') ? $window.sessionStorage.getItem('certSeqNo') : '';
    					 certDetails.publishCheckStatus = true;
    					certDetails.getCertificateDetails();
    					 
    				}
    			}
    	
    		res = res.updatedData;
    	
    		if(res.auditSeqNo == certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ
    				|| res.auditSeqNo == certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ || res.auditSeqNo == certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ || res.auditSeqNo == certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ)
    		{
    		
    			sessionStorage.setItem('certAuditSeqNo',res.auditSeqNo);
    		}
    		 

    		if (msg=='publish'){
    			toaster.success('Certificate published successfully');
    		}else{
    			toaster.success('Certificate generated. Please click publish button to publish certificate');
    		}

    	}
    	
    	function setSocTypeCheckBoxValue(certIssueId,companyId,vesselImoNo,auditSubTypeId,auditSeqNo,certLink){
    		if(!certLink && certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certificateDetail.length > 0){
    			certLink = certDetails.certificateDtl.certificateDetail[0].certificateLink;
    		}
    		if( certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certificateDetail.length == 0 && auditSubTypeId == 1002){
    			certLink = 0;
    		}
    		if( !certDetails.certificateDtl.certificateDetail && !certLink){
    			certLink = 0;
    		}
    		certificateFactory.getSocTypeSelectDefault(certIssueId,companyId,vesselImoNo,auditSubTypeId,auditSeqNo,certLink,'soc').$promise.then(function(res){
        		
        		certDetails.ihmCertModal.hk = false;
        		certDetails.ihmCertModal.eu = false;
        		certDetails.ihmCertModal.exe = false;
        		if(res.result){
        			for(var i = 0; i < res.result.length ; i++){
        				if(res.result[i] == "hk"){
        					certDetails.ihmCertModal.hk = true
        				}
        				else if(res.result[i] == "eu"){
        					certDetails.ihmCertModal.eu = true
        				}
        				else{
        					certDetails.ihmCertModal.exe = true
        				}
        			}
        		}
        		
        	});
    	}
    	/***** Audit/Inspection After generating the certificate we can view the latest certificate which is in active status*****/
    	function viewCertificate(){

    		ModalService.showModal({

    			templateUrl : 'src/modals/certificateHistory.html',

    			controller  : 'certificateHistoryControllerIhm as certHist',

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
    			certDetails.certificateDtl.issuerName = certDetails.signerName;
    			if(!certDetails.checkPartialForYatch){
    			certDetails.validateVessel();
    			}
    			for(var x in item.vesselCompany) {
    				certDetails.certificateDtl[x]=item.vesselCompany[x];
    			}
   			 certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName ?  certDtlRequiredData.getCurrentUserFullName.userName : certDetails.certificateDtl.issuerName ;
   			 
    			try{
    				certDetails.certificateDtl.vesselCompanyName = certDetails.certificateDtl.registeredCompanyName ? decodeURIComponent(certDetails.certificateDtl.registeredCompanyName) : '';

    				certDetails.certificateDtl.vesselCompanyAddress = certDetails.certificateDtl.registeredCompanyAddress ? decodeURIComponent(certDetails.certificateDtl.registeredCompanyAddress) :'';
                    if(certDetails.certificateDtl.regOwnedImoNo){
                    certDetails.certificateDtl.regOwnedImoNo = (certDetails.certificateDtl.regOwnedImoNo==0) ? '' : certDetails.certificateDtl.regOwnedImoNo;
    			    }
    			}catch(err){}

    			certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);
    			certDetails.certificateDtl.issuerName = (sessionStorage.getItem('usrname')).toString().toLocaleLowerCase();  //Changed by sudharsan for reviewername showing in capital_letter
    			
    		}

    	}
    	
            
    	function setCertDetails(){
			//Added by sudharsan for JIRA-ID=5342 on 27-06-2022
			if(certDetails.generOrPubStatus =='generate' || certDetails.certificateDtl.generatedBy=='1001'){
				IHMDisableFunc();
			}
			//Endhere
    		var certData = angular.copy(certDetails.certificateDtl);
    		console.log(certData);
    		
    		console.log("certDetails.AllIhmCertificateData "+certDetails.AllIhmCertificateData);

    		var audSeq = '';

    		if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.ISM_TYPE_ID){

    			audSeq = certDetails.AppConstant.ISM_NO_AUD_CERT_AUDITSEQ;

    		}else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.ISPS_TYPE_ID){

    			audSeq = certDetails.AppConstant.ISPS_NO_AUD_CERT_AUDITSEQ;

    		}else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.MLC_TYPE_ID){

    			audSeq = certDetails.AppConstant.MLC_NO_AUD_CERT_AUDITSEQ;
    		}else if(certDetails.certificateDtl.auditTypeId== certDetails.AppConstant.IHM_TYPE_ID){ 
    			certDetails.IhmDisable = true;
    			audSeq = certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ; 
    		}

    		if(certDetails.certificateDtl.certIssueId== certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    			certData.certIssueDate = certData.extendedIssueDate ? certData.extendedIssueDate : '';
    				certData.certExpireDate =certData.extendedExpireDate ? certData.extendedExpireDate : '';
    		}
    		
    		certData.issuerId = certData.issuerId ? certData.issuerId : sessionStorage.getItem('emailId');
    		if(!(certData.auditSeqNo)){

    			for(var x in certDetails.withOutAudit){
    				  
    				if(x == 'auditDate'){
    					certData[x] = certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate : moment(new Date()).format(MMMDDYYYY);
    						
    				}else{
    					certData[x]=certDetails.withOutAudit[x];
    				}
    				
    			}
    		}
    		certData.ihmPrevReview = certData.ihmPrevReview ? certData.ihmPrevReview:0;
    		certData.socType = certDetails.certificateDtl.socType;
    		certData.auditSeqNo=certData.auditSeqNo ? certData.auditSeqNo : audSeq;
    		
    		if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    		certData.renewalRegulation = certDetails.certificateDtl.renewalRegulation;
    		}
    		else {
    			certData.renewalRegulation = '';
    		}
    		certDetails.stringToDate(certData);
    		
    		if(certDetails.certificateDtl.publishStatus==1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ){
    			certData.seqNo=0;
    			certData.certificateNo=((certData.auditSubTypeId==1003 || certData.auditSubTypeId==1005) && certData.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? certData.certificateNo : '';
    			certData.utn=((certData.auditSubTypeId==1003 || certData.auditSubTypeId==1005) && certData.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? certData.utn : '';
    			certData.certificateId = ((certData.auditSubTypeId==1003 || certData.auditSubTypeId==1005) && certData.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? certData.certificateId : '';

    		}else if(certDetails.certificateDtl.publishStatus==1){
    			certData.seqNo=0;
    		}
    		
    		if(certData.publishStatus == undefined && ((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){
    			certData.certificateNo = '';
    		}
//    		certData.auditDate = certDetails.certificateDtl.auditDate;
    		certData.publishStatus = 0;
    		certData.activeStatus = 1;
    		certData.issuerSign = certData.issuerSign ? btoa(certData.issuerSign):'';

    		certData.userIns  = sessionStorage.getItem('emailId');
    		certData.dateIns  = moment(new Date()).format(YYYYMMDD);
    		certData.issuerId = sessionStorage.getItem('emailId');
    		certData.docType  = certData.docTypeNo ? certData.docTypeNo :certData.docType;
    		certData.generatedBy = sessionStorage.getItem('userRoleId');

    		certData.certificateVer = certDetails.AppConstant.CERTIFICATE_VERSION;


    		var audPlace = '';
    		audPlace = certData.auditPlace?encodeURIComponent(certData.auditPlace):'';
    		audPlace = audPlace ? btoa(audPlace) : '';

    		certData.auditPlace = audPlace;
    		
    		certData.issuerName = certDetails.signerNameGen;
    		
    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT){	
    			delete certData.extendedIssueDate;
    			delete certData.extendedExpireDate;
    			if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT){
    				delete certData.endorsedDate;
    			}
    		}
    		
    		 
    		if(certDetails.certificateDtl.tcApprovalStatus==0 && certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID){
				 toaster.warning("TC Status is Pending");
			 }

    		delete certData.openMeetingDate;
    		delete certData.closeMeetingDate;
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
    					  
    					console.log(certDetails.vesselDataFromRmi);
    					
    					var existYatch = _.find(certDetails.MaVesselYatchData, function(a){return a.vesselImoNo  == vesselImoNo; });
    					console.log(existYatch);
    					if(certDetails.vesselDataFromRmi.length==1 && certDetails.vesselDataFromRmi[0].imoNumber!=0){

    						var selectedVsl = certDetails.vesselDataFromRmi[0];
    						certDetails.vesselSpecificDtl(selectedVsl);
 
    					} else if(certDetails.vesselDataFromRmi.length==1 && certDetails.vesselDataFromRmi[0].imoNumber==0){
    						
    						certDetails.checkPartialForYatch=true;
    						
    						var existYatchData = _.find(certDetails.MaVesselYatchData, function(a){return a.vesselName.toLowerCase()  == certDetails.vesselName.toLowerCase(); });
                           console.log(existYatchData);
                            if(existYatchData){
                            	
                            	var res1 = angular.copy(existYatchData);

                    			certDetails.imolabelVal = 'vesselImoNo';

                    			certDetails.vesselImoNo = {'vesselImoNo':res1.vesselImoNo};
                                
                    			
                    			
                    			res1.vesselCompanyName = res1.getCompanyName ? encodeURIComponent(res1.getCompanyName) : '';

                    			res1.vesselCompanyAddress = res1.getCompanyAddress ? encodeURIComponent(res1.getCompanyAddress) :'';
                    			
                    			res1.docTypeNo =  res1.getDocTypeNo ? res1.getDocTypeNo : res1.docTypeNo;
                    			res1.docIssuer =  res1.getDocIssuer ?   res1.getDocIssuer : res1.docIssuer;
                    			res1.docExpiry =  res1.getDocExpiry ?   res1.getDocExpiry : res1.docExpiry  ;
                    			
                    			if(res1.vesselStatus=='Active'){	
                        			certDetails.setvesselImoNo(res1);
                        			}else if(res1.vesselStatus=='Pending'){
                        				toaster.warning(res1.vesselName+' Vessel is Inactive.');	
                        			}
                            	
                            }else { console.log(certDetails.vesselDataFromRmi[0]); 
                            
                           /* if(!certDetails.yatchImoNoCheckPartilData(certDetails.vesselDataFromRmi[0])){
                            
                            certDetails.yatchImoNoRegistry(certDetails.vesselDataFromRmi[0]);
                            }*/
                            
                            }
    						
    					}else if(certDetails.vesselDataFromRmi.length>0){

    						certDetails.vesselImoModel(certDetails.vesselDataFromRmi,vesData,searchBy);

    					} else if(existYatch){
    						
    						var res1 = angular.copy(existYatch);

                			certDetails.imolabelVal = 'vesselImoNo';

                			certDetails.vesselImoNo = {'vesselImoNo':res1.vesselImoNo};
                            
                			
                			
                			res1.vesselCompanyName = res1.getCompanyName ? encodeURIComponent(res1.getCompanyName) : '';

                			res1.vesselCompanyAddress = res1.getCompanyAddress ? encodeURIComponent(res1.getCompanyAddress) :'';
                			
                			res1.docTypeNo =  res1.getDocTypeNo ? res1.getDocTypeNo : res1.docTypeNo;
                			res1.docIssuer =  res1.getDocIssuer ?   res1.getDocIssuer : res1.docIssuer;
                			res1.docExpiry =  res1.getDocExpiry ?   res1.getDocExpiry : res1.docExpiry  ;
                			console.log(existYatch);
                			if(res1.vesselStatus=='Active'){
                				certDetails.checkPartialForYatch=true;
                			certDetails.setvesselImoNo(res1);
                			}else if(res1.vesselStatus=='Pending'){
                				toaster.warning(res1.vesselName+' Vessel is Inactive.');	
                			} 
    						
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
    	function vesselSpecificDtl_Generate(object,parameter){

    		var vesselImoNo = object.imoNumber ?  object.imoNumber : object.vesselImoNo , docTypeNum = object.vesselID ? object.vesselID : object.vesselId;

    		certificateFactory.vesselSpecificDtl(certDetails.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,docTypeNum).$promise.then(function(res){


    			res = angular.copy(res.vsselDtl);
    			
    			/*certDetails.oldVesseldata.keelLaidDate = certDetails.certificateDtl.keelLaidDate;
    			certDetails.oldVesseldata.registeredCompanyAddress = certDetails.certificateDtl.vesselCompanyAddress;
    			certDetails.oldVesseldata.registeredCompanyName = certDetails.certificateDtl.vesselCompanyName;*/
    			var count = checkVesselHistory(res, certDetails.oldVesseldata);
    			if(count > 0){
    				console.log(certDetails.vesselHistory)
		    		// setVesselHistory(certDetails.oldVesseldata);								//commented by @Ramya on 21-06-2022 for Jira id - IRI-5325 
		    		
		    		detailsFactory.updateVesselDetails(certDetails.vesselHistory).$promise
						.then(function(hisRes) {
							console.log(hisRes);
							toaster.success('Vessel Details Updated!');
							
					});
		
		    		
    			}

    		console.log(res);
    		
    		});
    	}
    	  function getCertificateNoWithOutAudit(){ 
    		var a=certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID ?0: certDetails.certificateDtl.auditSubTypeId;
    		  detailsFactory.getNewCertificateNo(certDetails.certificateDtl.auditTypeId,a,certDetails.companyId).$promise.then(function(res){
    			
    			certDetails.certificateDtl.certificateNo = res.data;
    			
    		  });    		  
    	  }
    	  
    	  function checkVesselHistory(rmiData,LocalVesData){
 	    	 
 	    	 var count = 0;
 	    	 
 	       		 if(rmiData.vesselName != LocalVesData.vesselName)
 	       			 count++;
 	       		if(rmiData.vesselType.toUpperCase().trim() != LocalVesData.vesselType.toUpperCase().trim())				//changed by @Ramya on 08-08-2022 for jira id - 5414
 	       			count++;
 	       		
 	       		if(rmiData.vesselCompany.companyImoNo != LocalVesData.companyImoNo)
 	       			count++;
 	       				 
 	       		if(rmiData.grt != LocalVesData.grt)
 	       			count++;
 				
 				if(rmiData.portOfRegistry != LocalVesData.portOfRegistry)
 		 			count++;
 				if(moment(rmiData.keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') != moment(LocalVesData.keelLaidDate,'DD-MMM-YYYY').format('DD-MMM-YYYY'))
		 			count++;
				
				if(rmiData.regOwnedImoNo != LocalVesData.regOwnedImoNo)
		 			count++;
				
				if(rmiData.registeredCompanyName != LocalVesData.vesselCompanyName)
		 			count++;
				
				if(rmiData.registeredCompanyAddress != LocalVesData.vesselCompanyAddress)
		 			count++;
 				
 				return count;
 	       		
 	     }
    	  
    	function onChangeCompletionDate(){
    		if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM){
    		certDetails.certificateDtl.certExpireDate =  certDetails.certificateDtl.completionSurveyDate? moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):'';
    		certDetails.maxCertExpireDate = certDetails.certificateDtl.certExpireDate;
    		certDetails.minCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(MMMDDYYYY);
    		}
    		else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    			certDetails.certificateDtl.extendedExpireDate =  certDetails.certificateDtl.completionSurveyDate? moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):'';
        		certDetails.maxExtnCertExpireDate = certDetails.certificateDtl.extendedExpireDate;
        		certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(MMMDDYYYY);
    		}
    		 
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
    			  obj.dateOfRegistry = obj.dateOfRegistry?moment(obj.dateOfRegistry,formPattern).format(toPattern):'';
    			  obj.certIssueDate = obj.certIssueDate?moment(obj.certIssueDate,formPattern).format(toPattern):'';
    			  obj.certExpireDate = obj.certExpireDate?moment(obj.certExpireDate,formPattern).format(toPattern):'';
    			  obj.auditDate = obj.auditDate?moment(obj.auditDate,formPattern).format(toPattern):'';
    			  obj.issuerSignDate = obj.issuerSignDate?moment(obj.issuerSignDate,formPattern).format(toPattern):'';
    			  obj.extendedIssueDate = obj.extendedIssueDate?moment(obj.extendedIssueDate,formPattern).format(toPattern):'';
    			  obj.extendedExpireDate = obj.extendedExpireDate?moment(obj.extendedExpireDate,formPattern).format(toPattern):'';
    			  obj.endorsedDate = obj.endorsedDate?moment(obj.endorsedDate,formPattern).format(toPattern):'';
    			  obj.extendedEndorsedDate = obj.extendedEndorsedDate?moment(obj.extendedEndorsedDate,formPattern).format(toPattern):'';
    			  var addVerifyFormat = obj.additionalSurvey?moment(obj.additionalSurvey,formPattern).format(toPattern):''
    				  if(addVerifyFormat != "Invalid date"){
    					  obj.additionalSurvey = addVerifyFormat;
    				  }
    			  obj.dateIns = obj.dateIns?moment(obj.dateIns,formPattern).format(toPattern):'';
    			  obj.docExpiry = obj.docExpiry?moment(obj.docExpiry,formPattern).format(toPattern):'';
				  /**Added by sudharan for Jira-id IRI-5344 */
				  if(moment(obj.keelLaidDate)._f == formPattern){
					obj.keelLaidDate = obj.keelLaidDate?moment(obj.keelLaidDate,formPattern).format(toPattern):'';  	
				  }
				  //End here IRI-5344
    			  obj.completionSurveyDate = obj.completionSurveyDate != null?moment(obj.completionSurveyDate,formPattern).format(toPattern):null;
    			  certDetails.certificateDtl.regOwnedImoNo =certDetails.certificateDtl.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
    			  certDetails.certificateDtl.ihmDocumentNo = (!certDetails.certificateDtl.ihmDocumentNo) ? 'N/A' : certDetails.certificateDtl.ihmDocumentNo;
    			  certDetails.certificateDtl.nameToPrint = (!certDetails.certificateDtl.nameToPrint) ? '1' : certDetails.certificateDtl.nameToPrint;
    			  certDetails.certificateDtl.signToPrint = (!certDetails.certificateDtl.signToPrint) ? '1' : certDetails.certificateDtl.signToPrint;
    		
				  var sortedECReason=certDetails.ecGrantedReason.sort(function(a,b){
					    return a.reasonId - b.reasonId;
    			  });
				  
				  certDetails.certificateDtl.condEcGrant = (!certDetails.certificateDtl.condEcGrant)?sortedECReason[0].reasonId:certDetails.certificateDtl.condEcGrant;
				  certDetails.certificateDtl.voyageEcGrant = (!certDetails.certificateDtl.voyageEcGrant) ? '1' : certDetails.certificateDtl.voyageEcGrant;
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
    		  
    		  function getAuditSubType(auditTypeId,auditSubTypeId){
    			 
    			  certDetails.auditSubTypes = certDetails.auditSubTypeArray.filter(function( obj ) {
    				  return obj.auditTypeId == auditTypeId;
    			  });
    			 
    			  if(auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    				  certDetails.certificateDtl.auditSubTypeId = auditSubTypeId;
    				  var ihmUserDetails=_.findWhere(certDetails.auditorNameArray, {'emailId' : sessionStorage.getItem('emailId')});
    				  if(ihmUserDetails && ihmUserDetails.location){ 
    				  certDetails.certificateDtl.auditPlace = ihmUserDetails.location;
    				  certDetails.ihmUserPlace = ihmUserDetails.location;
    				  certDetails.ihmAutoDishPlace = true;
    				  }else if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID){
    					  toaster.warning('Location is Empty for thise IHM user '+ sessionStorage.getItem('usrname'));
    				  }
    			  }
    			
    				 certDetails.maxCompletionSurveyDate = moment(new Date()).format(DDMMMYYYY);
    			
    			  if(certDetails.certificateDtl.auditTypeId ==certDetails.AppConstant.IHM_TYPE_ID){
        			  $timeout(function(){
        		     	console.log(certDetails.certificateIssuedOptions)
        		     		 
        		     		certDetails.certificateIssuedOptions = _.filter(certDetails.certificateIssuedOptions, function(obj){
        		     			var type='';
        		     			
        		     			
        		        			if( obj.issueReasonId ==AppConstant.FULL_TERM_IHM ){
        		        				type='FULL TERM';
        		        	    	 }
        		        			if( obj.issueReasonId ==AppConstant.EXTENSION_IHM ){
        		        				type='EXTENSION';
        		        				obj.issueReasonDesc="EXTENDED (11.6 applies)";
        		        	    	 }
        		        			
        		        			if(obj.issueReasonId ==AppConstant.ADDITIONAL_ENDORSED_IHM){
        		        				type='ADDITIONAL ENDORSED';
        		        	    	 }
        		        			if(obj.issueReasonId==AppConstant.RENEWAL_ENDORSED_11_7_IHM){
        		        				type='RENEWAL_ENDORSED_11_7_IHM';
        		        	    	 }
        		        	    	if(obj.issueReasonId == AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM ){
        		        	    		type='RENEWAL_ENDORSED_11_8_11_9_IHM';
        		        	    	 }
        		        	    	if(obj.issueReasonId ==AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
        		        	    		type= 'RE_ISSUE_ADMINISTRATIVE_IHM';
        		        	    	}
        		        	    
        		        	    	return type; 
        		        	    });
        		     		
        			  },2000);
        		        	    	
        		     		
        		     	}
    		  $scope.certFilter = function(item) {
		     		
	     			return  certDetails.certificateIssuedOptions;
	     		 }
    		  
    		  renewalEndrosedChangedVal();
    		  }

    		  
    		  function checkAdminGenCer(){
			if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    				 if(certDetails.certificateDtl.ihmDocumentNo=='')
    					 certDetails.certificateDtl.ihmDocumentNo='N/A' 
    			 }
			
			
			
    			 
    			 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM	||certDetails.certificateDtl.certIssueId== certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM)
    				 certDetails.ExtensionBtnClicked=true;
    			 if(!(certDetails.certificateDtl.publishStatus==1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM))){
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
    					 certDetails.certificateDtl.issuerName =  data[0].firstName + " " + data[0].lastName;
    					 certDetails.certificateDtl.auditPlace = data[0].location;
    					 detailsFactory.auditorSignAndSeal(officialId,certDetails.companyId).$promise.then(function(res){

    						 var sign =res.signature;

    						 /****seal and Desig*****/

    						 certDetails.certificateDtl.seal=res.seal;
    						 certDetails.certificateDtl.title=res.title;
    						 console.log(data[0].signature == sign);
    						 if(sign){
    							 certDetails.certificateDtl.issuerSign = sign;
    						//	 certDetails.certificateDtl.issuerName = res.firstName + " " + res.lastName;
    							 if(data[0].roles[0].roleId==1003 ){
    								 certDetails.certificateDtl.issuerSignDate = moment(new Date()).format(MMMDDYYYY);
    								 
    							 }else{
    								 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    									 certDetails.certificateDtl.issuerSignDate = moment(new Date()).format(MMMDDYYYY);
    								 }else{
    									 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.auditDate;
    								 }
    							 }
    							 certDetails.createValidation();
    							 if(value=='admin'){
    								 callback();
    							 }

    						 }
    					 });

    				 }else{


    					 toaster.warning('Lead Auditor information not found');



    				 }
    			 });
    		 }
    		 
    		 function vesselDtlsCheck(){
            	 
    		if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
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
            			if(certDetails.tempAuditData.auditStatusId != 1002 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM && certDetails.certificateDtl.publishStatus == 0 ){
            			vesselStatementFactory.getVesselDetails(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId).$promise.then(function(vesRes){
            				console.log(vesRes);
            				certDetails.latestVesselDetail = vesRes.vsselDtl;
            				certDetails.certificateDtl.vesselCompanyAddress =vesRes.vsselDtl[0].registeredCompanyAddress;
        	   	       		
        	   	       		certDetails.certificateDtl.vesselCompanyName = vesRes.vsselDtl[0].registeredCompanyName;
        	   	       		
    		   	       		certDetails.certificateDtl.keelLaidDate = dateFormater(vesRes.vsselDtl[0].keelLaidDate , 'DD-MMM-YYYY');
    		  				
    	    	   	    	certDetails.certificateDtl.regOwnedImoNo = vesRes.vsselDtl[0].regOwnedImoNo;
    	    	  			
    	    	   	       	certDetails.certificateDtl.vesselName = vesRes.vsselDtl[0].vesselName;
    	    	   	       	
    		   	       		certDetails.certificateDtl.vesselType = 	vesRes.vsselDtl[0].vesselType;
     		   	       		
    		   	       		certDetails.certificateDtl.companyImoNo = vesRes.vsselDtl[0].companyImoNo;
    		  				
    		   	       		certDetails.certificateDtl.grt = vesRes.vsselDtl[0].grt;
    		   	       		
    		   	       	    certDetails.certificateDtl.portOfRegistry = vesRes.vsselDtl[0].portOfRegistry;
    		   	       	    console.log(vesRes.vsselDtl[0].portOfRegistry)
    		   	       	    
    		   	       	    certDetails.certificateDtl.vesselId = vesRes.vsselDtl[0].vesselId;
            				
            				
            				
            			});
            			
            			}
            				if( (certDetails.tempAuditData.auditStatusId == 1002 && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM && (!certDetails.certificateDtl.publishStatus || certDetails.certificateDtl.publishStatus == 0 ))){
                			
            				
            				certDetails.certificateDtl.vesselCompanyAddress =res[0].registeredCompanyAddress;
        	   	       		
        	   	       		certDetails.certificateDtl.vesselCompanyName = res[0].registeredCompanyName;
        	   	       		
    		   	       		certDetails.certificateDtl.keelLaidDate = dateFormater(res[0].keelLaidDate , 'DD-MMM-YYYY');
    		  				
    	    	   	    	certDetails.certificateDtl.regOwnedImoNo = res[0].regOwnedImoNo;
    	    	  			
    	    	   	       	certDetails.certificateDtl.vesselName = res[0].vesselName;
    	    	   	       	
    		   	       		certDetails.certificateDtl.vesselType = 	res[0].vesselType;
     		   	       		
    		   	       		certDetails.certificateDtl.companyImoNo = res[0].companyIMONumber;
    		  				
    		   	       		certDetails.certificateDtl.grt = res[0].grossTon;
    		   	       		
    		   	       	    certDetails.certificateDtl.portOfRegistry = res[0].homePort;
    		   	       	    
    		   	       	    certDetails.certificateDtl.vesselId = res[0].vesselID;
            				
            				
            				

            			
            			}
            			else{
            			var count = 0;
            			//det.vesselRefreshMsg = 'Refresh Vessel Deatils For ';
            			var dynamicMsg = '';
            				certDetails.latestVesselDetail = angular.copy(res);

            				if(res[0].registeredCompanyAddress ===certDetails.certificateDtl.vesselCompanyAddress)
            					{
            					console.log(res[0].registeredCompanyAddress + "   "+certDetails.certificateDtl.vesselCompanyAddress);
           	       			 count++;
            					}
            				else
           	       			 dynamicMsg += 'Registerd Company Address,'
            				
           	       			if(res[0].registeredCompanyName == certDetails.certificateDtl.vesselCompanyName)
        	   	       			count++;
        	   	       		else
        	   	       			 dynamicMsg += 'Registerd Company Name,'
        	   	       		
        	   	       				 console.log(dateFormater(res[0].keelLaidDate,'DD-MMM-YYYY',true), + "  "+ dateFormater(certDetails.certificateDtl.keelLaidDate,'DD-MMM-YYYY',true));
        	   	       		 if(dateFormater(res[0].keelLaidDate,'DD-MMM-YYYY',true) == dateFormater(certDetails.certificateDtl.keelLaidDate,'DD-MMM-YYYY',true))
        	   	       				   	       			
        	   	       			 count++; 
        	   	       		 else
        	   	       			 dynamicMsg += 'Keel Laid Date,'
        	   	       		  	       		 
            				
        	   	       		 if(res[0].regOwnedImoNo === certDetails.certificateDtl.regOwnedImoNo)
        	   	       			 count++;
        	   	       		 else
        	   	       			 dynamicMsg += 'Reg Owner IMO No,'
        	    				
        	   	       		 if(res[0].vesselName === certDetails.certificateDtl.vesselName)
        	   	       			 count++;
        	   	       		 else
        	   	       			 dynamicMsg += 'Vessel Name,'
        	    			
        	    					 
        	   	       		if(res[0].homePort === certDetails.certificateDtl.portOfRegistry){
        	   	       			count++;
        	   	       		}
            	   	       	else{
            	   	       			dynamicMsg += 'Port Of Registry,'
            	   	       	}
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
        	   	       			 dynamicMsg += 'GRT '
        	   	       		
            	     	   	       			
        	   	       		if(count!=9){
        	   	       	
        	   	       		if(certDetails.certificateDtl.certificateDetail && certDetails.certificateDtl.certIssueId != 1008 && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.INTERIM_SUB_TYPE_ID){ 	
       	   	       			 toaster.warning(dynamicMsg + ' has been changed in RMI. Please reissue the certificate');
    		   	   	       		 }
    		   	   	       		 else if(certDetails.certificateDtl.publishStatus == 0){
    		   	   	       			 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    		   	   	       				 	certDetails.dynamicMsg = dynamicMsg + ' has been changed in RMI. Do you want to re-generate the certificate';
    		   	   	       				 toaster.warning("Vessel details are mismatch in previous Active certificate, please contact manager to mark the current Review as void and re-issue in previous Active certificate");
    		   	   	       			 }else{
		    		   	   	       		if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
				    		   	   	       	certDetails.dynamicMsg = dynamicMsg + ' has been changed in RMI. Do you want to re-generate the certificate';
				    		   	   	       	toaster.warning(dynamicMsg + ' has been changed in RMI. Please Re-generate the certificate');
		    		   	   	       		}else{
		    		   	   	       			if(certDetails.certificateDtl.certIssueId != certDetails.AppConstant.FULL_TERM_IHM){
		    		    	   	       			certDetails.dynamicMsg = dynamicMsg + ' has been changed in RMI. Do you want to re-generate the certificate';
		    		    	   	       		    toaster.warning(dynamicMsg + ' has been changed in RMI. Please reissue the certificate');
		    		   	   	       			}
		    		   	   	       		}
		    		    	   	       	if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
		    		    	   	       	
		            	   	       			var vesselDetail = sessionStorage.getItem('vesselDetail');
		            	   	       			
		            	   	       		 	  	 
		            	   	       		 	
		            	   	       			//setVesselHistory(certDetails);
		            	   	       		 	
			            	   	       			console.log(vesselDetail);
			            	   	       		//console.log(vesselCompanyDtl);
			            	   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].registeredCompanyAddress;
			            	   	       		
			            	   	       		certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].registeredCompanyName;
			            	   	       		
			        		   	       		certDetails.certificateDtl.keelLaidDate = dateFormater(certDetails.latestVesselDetail[0].keelLaidDate , 'DD-MMM-YYYY');
			        		  				
			        	    	   	    	certDetails.certificateDtl.regOwnedImoNo = certDetails.latestVesselDetail[0].regOwnedImoNo;
			        	    	  			
			        	    	   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
			        	    	   	       	
			        	    	   	       	certDetails.certificateDtl.dateOfRegistry = certDetails.latestVesselDetail[0].dateOfRegistry;//moment(vesselDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD);
			        		   	       
			        		   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
			        		   	       		
			        		   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
			        		  				
			        		   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
			        		   	       		
			        		   	       	    certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
			        		   	       	    
			        		   	       	    certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselID;
			        		   	       		
			    		    	   	       	}
    		   	   	       			 }
        					
        	   	       			}
        	   	       			else if(certDetails.certificateDtl.publishStatus && certDetails.certificateDtl.publishStatus == 1) {
    		    	   	       			certDetails.dynamicMsg = dynamicMsg + ' has been changed in RMI. Do you want to reissue the certificate';
    		    	   	       		if(!(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM)){
    		    	   	       			toaster.warning(dynamicMsg + ' has been changed in RMI. Please reissue the certificate');
    		    	   	       		}
        	   	       		
        	   	       			}
        	   	       			
//        	   	       			
        	   	       		 }
            			}
                	});
        		 
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
    						'dateOfRegistry' : moment(certDetails.latestVesselDetail[0].registrationDate, YYYYMMDD ,true).isValid() ? certDetails.latestVesselDetail[0].registrationDate : '',
    						'docIssuerAud' : certDetails.latestVesselDetail[0].docIssuer,
    						'docExpiryAud' : moment(certDetails.latestVesselDetail[0].docExpiry, YYYYMMDD ,true).isValid() ? certDetails.latestVesselDetail[0].docExpiry : '',
    						'vesselAdrress' :certDetails.latestVesselDetail[0].customerName  + '\n' + certDetails.latestVesselDetail[0].companyAddress ,
    						'dateIns' : moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),
    						'vesselId'	: certDetailsVess.vesselId,
    						'vesselCompanyName' :certDetails.latestVesselDetail[0].customerName,
    						'portOfRegistry' :certDetailsVess.portOfRegistry,
    						'companyAddress' : certDetails.latestVesselDetail[0].companyAddress,
    						'keelLaidDate' :certDetailsVess.keelLaidDate ? moment(certDetailsVess.keelLaidDate,'DD-MMM-YYYY').format('YYYY-MM-DD') : '',
    						'regOwnedImoNo' : certDetailsVess.regOwnedImoNo,
    						'registeredCompanyAddress' : certDetailsVess.vesselCompanyAddress,
							'registeredCompanyName' : certDetailsVess.vesselCompanyName,
    						'statusUpdate' : 'vesselHistory'
    						
    					};
       	       		 		certDetails.vesselHistory.push(parameter);
       	       		 		
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
    		 
    		 function validateCertificate(){
    			 console.log(certDetails.ecGrantedReason.map(function(e) { return e.reasonId; }));
				 //Commented by sudharsan for Jira-ID=5352 on 1-7-2022
    			 //if(certDetails.certificateDtl.generatedBy==1001){
    			 //certDetails.certificateDtl.issuerSignDate=certDetails.certificateDtl.issuerSignDate?certDetails.certificateDtl.issuerSignDate:certDetails.certificateDtl.auditDate;
    			 //}
				 //End here
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

    			 }else if(!certDetails.certificateDtl.regOwnedImoNo || certDetails.certificateDtl.regOwnedImoNo==0){
    				 flag = false;
    				
    				 setEnableIssueType();
    				 var renewalTypeDesc = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID ? 'RENEWAL ENDORSED (ISM PART B 13:13)' : (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID ? 'RENEWAL ENDORSED (ISPS PART B 13:13)' : (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? 'RENEWAL ENDORSED (MLC APPENDIX A5–II)' : ''));	 
     				// toaster.warning('Please change the Certificate type Manager cant perform '+renewalTypeDesc);
     				toaster.warning('Registered Owner Id is missing from RMI Database');
    			 }else if(!certDetails.certificateDtl.vesselCompanyAddress){
    				 flag=false;
    				 toaster.warning(' Registered Company Address is missing from RMI Database ');
    			 }else if(!certDetails.certificateDtl.vesselCompanyName){
    				 flag=false;
    				 toaster.warning(' Registered Company Name is missing from RMI Database ');
    			 }else if(!certDetails.certificateDtl.keelLaidDate){
    				 flag=false;
    				 toaster.warning(' KeelLaid Date is missing from RMI Database ');
    			 }else if(!certDetails.certificateDtl.portOfRegistry){

    				 flag=false;
    				 toaster.warning('Please enter the Port of Registry');

    			 }else if(!certDetails.certificateDtl.auditDate && certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.IHM_TYPE_ID ){

    				 flag=false;
    				 toaster.warning('Please enter the Audit Date');

    			 }else if(!certDetails.certificateDtl.auditTypeId){

    				 flag=false;
    				 toaster.warning('Please select the Certificate Audit Type');

    			 }else if(!certDetails.certificateDtl.auditSubTypeId && certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.IHM_TYPE_ID ){

    				 flag=false;
    				 toaster.warning('Please select the Certificate Audit Subtype');

    			 }else if(!certDetails.certificateDtl.certIssueId){

    				 flag=false;
    				 toaster.warning('Please select the Certificate type');

    			 }else if(!certDetails.certificateDtl.extendedIssueDate && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM)){
    				
    				 flag=false;
    				 toaster.warning('please provide the '+certDetails.onchangeReissueName);
    				 
    			 }else if(!certDetails.certificateDtl.extendedExpireDate && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM
    						|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM
    						|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM)){
    				 
    				 flag=false;
    				 toaster.warning('please provide the '+certDetails.onchangeReissueExpireName);
    				 
    			 }else if(!certDetails.certificateDtl.certIssueDate){

    				 flag=false;
    				 toaster.warning('Please provide the Certificate Issue Date');

    			 }else if(!certDetails.certificateDtl.certExpireDate){

    				 flag=false;
    				 toaster.warning('Please provide the Certificate Expiry Date');

    			 }else if(!certDetails.certificateDtl.auditPlace){

    				 flag=false;
    				 toaster.warning('Please select the Issued Place');

    			 }else if(!(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && !certDetails.certificateDtl.issuerSign){

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

    			 }else if(certDetails.certificateDtl.ihmDocumentNo == 'N/A'||!certDetails.certificateDtl.ihmDocumentNo){

    				 flag=false;
    				 toaster.warning('Please enter valid IHM Part I ID/Doc No.');

    			 }else if(!certDetails.certificateDtl.completionSurveyDate){

    				 flag=false;
    				 toaster.warning('Please select Completion Date of the Survey');

    			 }else if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){

    				 flag=false;
    				 toaster.warning('Please select Consective Subsequent');
                 }else if(1==2 && !certDetails.certificateDtl.extendedIssueDate){

    				 flag=false;
    				 toaster.warning('Please provide extended Issue Date');

    			 }else if(1==2 && !certDetails.certificateDtl.extendedExpireDate){

    				 flag=false;
    				 toaster.warning('Please provide extended expiry Date');

    			 }else if((!(certDetails.renewalFulltermCertVal && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID)) && certDetails.certificateDtl.publishStatus==1 && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM)){
    				  
    				 flag=false;
    				 toaster.warning('Please change certificate issue type');
    			 }else if(certDetails.nxtAuditInterOrAdd && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID)){
    				 
    				 flag=false;
    				 toaster.warning('Please change certificate issue type');
    			 }else if((certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID)&& (moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM)){

    				 flag=false;
    				 toaster.warning('Audit date should not be greater then expiry date');
    				 
    			 }else if((certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) && (moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.INTERIM_CERT && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.FULL_TERM_IHM)){
    				 
    				 flag=false;
    				 toaster.warning('Audit date should not be greater then expiry date');
    				 
    			 }
				 /**Added by sudharsan for JIRA IRI-5248  */
				 else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE && certDetails.certificateDtl.certReissueReason==1010){
					flag=false;
					toaster.warning('Please Select Reissue Reason and Try')
				}
				/**End Here */
				/*else if(certDetails.certificateDtl.certIssueDate && certDetails.certificateDtl.certExpireDate && (moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM)){

    				 flag=false;
    				 toaster.warning('Issue date should not be greater then expiry date');
    				 
    			 }else if(certDetails.certificateDtl.extendedIssueDate && certDetails.certificateDtl.extendedExpireDate && (moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) > moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD)) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.INTERIM_CERT && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.FULL_TERM_IHM)){
    				 
    				 flag=false;
    				 toaster.warning('Issue date should not be greater then expiry date');
    				 
    			 }*/else if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM) && (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID)){

    				 flag=false;    				
    				 toaster.warning('Please change certificate issue type');
    			 }else if(certDetails.checkCertDesc != '' && certDetails.checkCertDesc != certDetails.certificateDtl.certIssueId && certDetails.certificateDtl.publishStatus != 1 && !((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.publishStatus == undefined) && !(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && certDetails.certificateDtl.publishStatus== undefined)){
    				 if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID){
    				  
    				 if(certDetails.certificateDtl.getRenewalPublishCount == 1 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					 flag=false;
    					 toaster.warning('Please publish the '+ _(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.checkCertDesc}).pluck('issueReasonDesc').toString().toLowerCase()+' certificate before generate/publish the '+_(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.certificateDtl.certIssueId}).pluck('issueReasonDesc').toString().toLowerCase() +' certificate');  
    				 }else if(certDetails.certificateDtl.auditSubTypeId != certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && !(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID))){
    					 
    					 flag=false;
    					 toaster.warning('Please publish the '+ _(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.checkCertDesc}).pluck('issueReasonDesc').toString().toLowerCase()+' certificate before generate/publish the '+_(certDetails.certificateIssuedOptions).chain().where({'issueReasonId':certDetails.certificateDtl.certIssueId}).pluck('issueReasonDesc').toString().toLowerCase() +' certificate');	 
    				 }
    			 }
    			 }else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
    				 
    				 flag = false;
    				 toaster.warning('Extension can not perform in endorsed audit');
    			 }
    			 
    			 else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && (certDetails.certificateDtl.renewalRegulation == undefined || certDetails.certificateDtl.renewalRegulation == '')){
    				 
    				 flag = false;
    				 toaster.warning('Please select Regulation to generate certificate');
    			 }
    			 
    			 
    			 else if(title == false){
    				 flag = false;
    				 toaster.warning("Can't generate certificate, because title is mismatching");
    			 }else if(certDetails.checkPublish && certDetails.checkPublish!=undefined && certDetails.checkPublish==true && certDetails.generOrPubStatus=='generate' && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    				 flag = false;
    				 toaster.warning('certificate already published please change the certificate issue type');
    			 }
    			 
    			 else if((certDetails.ecGrantedReason.map(function(e) { return e.reasonId; }).indexOf(certDetails.certificateDtl.condEcGrant) === -1) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){
    				 console.log(certDetails.ecGrantedReason.indexOf(certDetails.certificateDtl.condEcGrant) === -1);
						flag = false;
						 toaster.warning('Please select the Condition, EC is granted');
    			 }
 			
    			 
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
				 if(certDetails.certificateDtl.certReissueReason==1010){  //Added by sudharsan for JIRA IRI-5248 
					$('#certReissueReason').addClass('err');
				}
	     			
    			 
    			 return flag;
    			 
			
     }//end of validateCertificate()
    		 
    		 
    		 
    		 
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
    			 }else if((certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) && (moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD) > (certDetails.certificateDtl.extendedExpireDate ? moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD) : moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD))) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM)){
    				 	 
    				 flag=false;
    				 toaster.warning('Audit date should not be greater then expiry date');
    				 
    			 }else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM && (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
    				 
    				 flag = false;
    				 toaster.warning('Extension can not perform in endorsed audit');
    			 }

    			 else if(!certDetails.withOutAdt && certDetails.orgCertGrt != null && certDetails.orgCertGrt != certDetails.certificateDtl.grt && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because grt has been  changed');

    		  }
    	
    		  
    		  else if((certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) && !certDetails.withOutAdt && certDetails.orgAuditDate != null && certDetails.orgAuditDate != moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Audit Date has been  changed');

    		  }else if(! !certDetails.withOutAdt && certDetails.orgCertIssueDate != null && certDetails.orgCertIssueDate != moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Issue Date has changed');

    		  }
    		  else if(certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && !certDetails.withOutAdt && certDetails.orgCertEndrosedDate != null &&  certDetails.orgCertEndrosedDate != '' &&  certDetails.orgCertEndrosedDate != moment(certDetails.certificateDtl.endorsedDate,MMMDDYYYY).format(YYYYMMDD)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Endorsed Date has changed');

    		  }
    		  else if(!certDetails.withOutAdt && certDetails.orgCertExpiryDate != null && certDetails.orgCertExpiryDate != moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Expiry Date has changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertExtIssueDate != null && certDetails.orgCertExtIssueDate != moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because '+certDetails.onchangeReissueName+' has changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertExtExpiryDate != null && certDetails.orgCertExtExpiryDate != moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because '+certDetails.onchangeReissueExpireName+' has changed');

    		  }else if( !certDetails.withOutAdt && certDetails.orgNameToPrint != null && certDetails.orgNameToPrint != certDetails.certificateDtl.nameToPrint){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Name to be Printed has changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgSignToPrint != null && certDetails.orgSignToPrint != certDetails.certificateDtl.signToPrint){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Sign to be Printed has changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgSignatureDate != null && certDetails.orgSignatureDate != moment(certDetails.certificateDtl.issuerSignDate,MMMDDYYYY).format(YYYYMMDD)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Signature Date has changed');

    		  }else if(certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED2 && !certDetails.withOutAdt && certDetails.orgRenewalRegulation != null &&  certDetails.orgRenewalRegulation != certDetails.certificateDtl.renewalRegulation  ){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Regulation no. has changed');

    		  }else if(certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && !certDetails.withOutAdt && certDetails.orgCertIhmDocumentNo != null && ((certDetails.orgCertIhmDocumentNo != certDetails.certificateDtl.ihmDocumentNo) || (certDetails.certificateDtl.ihmDocumentNo == 'N/A' && certDetails.orgCertIhmDocumentNo != 'N/A'))){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because IHM Part 1 Id/Documentation No. has changed');

    		  }else if(certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && !certDetails.withOutAdt && certDetails.orgCertCondEcGrant != null &&  certDetails.orgCertCondEcGrant != certDetails.certificateDtl.condEcGrant  ){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Condition,EC is granted  has changed');

    		  }else if(certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && !certDetails.withOutAdt && certDetails.orgCertVoyageEcGrant != null &&  certDetails.orgCertVoyageEcGrant != certDetails.certificateDtl.voyageEcGrant  ){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Voyages,EC is granted  has changed');

    		  }else if(certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && !certDetails.withOutAdt && certDetails.orgCertKeelLaidDate != null &&  certDetails.orgCertKeelLaidDate != moment(certDetails.certificateDtl.keelLaidDate,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.auditSubTypeId ==  certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Keel Laid Date has changed');

    		  }else if(!certDetails.withOutAdt && certDetails.orgCertIssueDate != null && certDetails.orgCertIssueDate != moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM && certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Issue Date has changed');

    		  }
    		  else if(!certDetails.withOutAdt && certDetails.orgCertIssueDate != null && certDetails.orgCertIssueDate != moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM && certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSeqNo != certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Issue Date has changed');

    		  }
    		  else if(!certDetails.withOutAdt && certDetails.orgRegCompanyAddress != null && certDetails.orgRegCompanyAddress != certDetails.certificateDtl.vesselCompanyAddress){

       			  flag = false;
       			  toaster.warning('Please generate the certificate because Registerd CompanyAddress has been changed');

       		  }
    		  else if(!certDetails.withOutAdt && certDetails.orgRegCompanyName != null && certDetails.orgRegCompanyName != certDetails.certificateDtl.vesselCompanyName){
    		
          			  flag = false;
          			  toaster.warning('Please generate the certificate because Registerd Company Name has been changed');

              }
    	     else if(!certDetails.withOutAdt && certDetails.orgRegOwnedImoNo != null && certDetails.orgRegOwnedImoNo != certDetails.certificateDtl.regOwnedImoNo){

         			  flag = false;
         			  toaster.warning('Please generate the certificate Reg Owned IMO No has been changed');

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
    	     else if(!certDetails.withOutAdt && certDetails.orgCertDor != null && certDetails.certificateDtl.dateOfRegistry != null && certDetails.certificateDtl.dateOfRegistry !='' && certDetails.orgCertDor != moment(certDetails.certificateDtl.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) && (certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION || certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE)){

    			  flag = false;
    			  toaster.warning('Please generate the certificate because Date of Registry has changed');

    		  }

    			 return flag;
    		 }
    		 
    		 function validateAndPublishCert(){
    			 certDetails.hkeuec = true;
    			 certDetails.generOrPubStatus = 'publish';
    			 
    			 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    				 if(certDetails.certificateDtl.ihmDocumentNo=='')
    					 certDetails.certificateDtl.ihmDocumentNo='N/A' 
    			 }

    			 if(certDetails.validateCertificate()){

    				 if(certDetails.validatePublish()){

    					 certDetails.checkPublishPopup();
    				 }
    			 }
    		 }//end of validateAndPublishCert()
    		 
    		 function back(){


    			 if(certDetails.certificateBackOption == 'Audit'){
    				  
    				 $state.go('app.audit.detailsIhm',{},{ reload: true });
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
    			 obj.extendedEndorsedDate = obj.extendedEndorsedDate?moment(obj.extendedEndorsedDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.keelLaidDate = obj.keelLaidDate?moment(obj.keelLaidDate,MMMDDYYYY).format(YYYYMMDD) : '';
    			 obj.completionSurveyDate = obj.completionSurveyDate != null?moment(obj.completionSurveyDate,MMMDDYYYY).format(YYYYMMDD) : null;
    			}
    		 
    		 function checkPublishPopup(){ 

    			 var socTypestoDisplay = '' ;
    			 if(certDetails.ihmCertModal.hk == true){
    				 socTypestoDisplay = socTypestoDisplay + ','+ ' HK ';
    			 }
    			 if(certDetails.ihmCertModal.eu == true){
    				 socTypestoDisplay = socTypestoDisplay + ','+ ' EU ';
    			 }
    			  if(certDetails.ihmCertModal.exe == true){
    				 socTypestoDisplay = socTypestoDisplay + ','+ ' Exemption ';
    			 }

    			 ModalService.showModal({

    				 templateUrl : 'src/modals/warning.html',

    				 controller  : 'warningController as warn',
    				 
    				 inputs		: {data:'The following SOC ( ' + socTypestoDisplay.substring(1) +' ) are going to be finalized, post to which (if any changes) SOC need to be re-issued. Do you want to Publish ?'},

    			 }).then(function(modal) {

    				 modal.element.modal();

    				 modal.close.then(function(result) {

    					 if(result=='YES'){

    						 var refcertificateData = [];
    						 var certificateData = certDetails.setCertDetails();
    						 certDetails.IhmDisable = false; 
    						 certificateData.publishStatus = 1;
    						 certificateData.certIssueId = certDetails.certificateDtl.certIssueId;
    						 console.log("certificateData.certIssueId  "+certificateData.certIssueId );
    						 refcertificateData.push(certificateData);
    							certDetails.checkPublish=true;
    							certificateFactory.generateCertificateForIhm(refcertificateData,1,1).$promise.then(function(resCert){

    							 setCertDataAfterGenerate(resCert,'publish');
    							 if(certificateData.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    								if( certificateData.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    							 if( certificateData.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID ){
    								 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM, certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM];
    							 }else {
    								 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM, certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM, certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM];
    							 }
    								 }
    								else{
    							 certDetails.CertTypeForIHM.push(certificateData.certIssueId);
    								}
    								
    								certDetails.IhmFieldsDisable  =  true; 
    							 }
    							 

    						 });

    					 }
    				 });

    			 });   		

    		 }
    		 
    	function ihmCertificatesPopup(){ 
    			
    			var socTypestoDisplay = '' ;
    			var certificateName ='';
    			
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE){
    			vesselSpecificDtl_Generate(certDetails.latestVesselDetail[0]);
    			}
    			
    			if(certDetails.ihmCertModal.hk == true &&(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM ||certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM ||certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM)){
    				socTypestoDisplay = socTypestoDisplay + "  "+' HK ';
    			}
    			if(certDetails.ihmCertModal.eu == true &&(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM ||certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM)){
    				socTypestoDisplay = socTypestoDisplay + ','+ ' EU ';
    			}
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
    				certificateName = certificateName +'Extension 11.6';
    			}
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
    				certificateName = certificateName +'Renewal Endorsed 11.7';
    			}
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    				certificateName = certificateName +'Renewal Endorsed 11.8 or 11.9';
    			}
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    				certificateName = certificateName +'Additional Endorsed';
    			}
    			 ModalService.showModal({

    				 templateUrl : 'src/modals/ihmCertificates.html',

    				 controller  : 'ihmCertificatesController as ihmCertificates',
    				 inputs : {
    	 	            	
    					 data:'Please select at least one Type of SOC to initiate the generate process',
    					 
    					 data1:'Please note that while generating the'+ ' ('+ certificateName +') ' +'It will applicable to'+ socTypestoDisplay.substring(0)+ '(which is selected)',
    					 
    	 	             scope:certDetails
    	 	            }
    			 
    			 }).then(function(modal) {

    				 modal.element.modal();
   				 
    		modal.close.then(function(result) {
    					
    					 var res = result;
    					 
    			 if(res[0] == "YES"){ 
    					 var socType_data = [];
    					 if(res[1].hk == true){
    						 socType_data.push('hk');
    					 }
    					 if(res[1].eu == true){
    						 socType_data.push('eu');
    					 }
    					 if(res[1].exe == true){
    						 socType_data.push('exe');
    					 }
    					 
    					 var auditSeqNo =  certDetails.withOutAdt ? 600004 : certDetails.certificateDtl.auditSeqNo;
    					 var certNo = certDetails.certificateDtl.certificateNo ? certDetails.certificateDtl.certificateNo : 0;
    					certificateFactory.deleteCertificateForIhm(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,auditSeqNo,certNo,'soc').$promise.then(function(res){
    					 var resData = [];
    					 var resultData = [];
    					 var len = socType_data.length;
    					 var certificateData = [];
    					for(var i=0; i< socType_data.length;i++){
    						certDetails.certificateDtl.socType = socType_data[i];
    						var certificateData1 =  certDetails.setCertDetails();
    						 certificateData.push(certificateData1);
    					}
    					// for Full term certificates
    				if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM )&& certDetails.certificateDtl.activeStatus == 1){
    					certificateFactory.getUTNForIhm(len).$promise.then(function(resUtn){
    						
    						for(var i = 0 ; i < resUtn.UTN.length; i++){
    							certificateData[i].utn = resUtn.UTN[i].utnString;
    							certificateData[i].qrCodeUrl = CERTI_URL;
    						}
    					
    						if(certDetails.withOutAdt){
    							var withOutAdtCertificateData={ 
    								    'auditSeqNo':certificateData.auditSeqNo ? certificateData.auditSeqNo : '',
    									'seqNo': 1,
    									'withOutAdt': true,
    									'activeStatus' : 1,
    									'companyId'    :certificateData.companyId ? certificateData.companyId : ''
    							};
          	
    							sessionStorage.setItem('withOutAdtCertificateData', withOutAdtCertificateData );
    							certificateFactory.generateCertificateWithOutAuditIhm(certificateData,1,1).$promise.then(function(resCert){
        							setCertDataAfterGenerate(resCert);
									//Added by sudharsan for JiraId = IRI-5475
        							certDetails.certificateDtl.publishStatus = 0;
    								certDetails.certificateDtl.activeStatus = 1;
									//End here IRI-5475
        							setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
        							
        						});
    						}
    						else{
    						certificateFactory.generateCertificateForIhm(certificateData,1,1).$promise.then(function(resCert){
    							setCertDataAfterGenerate(resCert);
								//Added by sudharsan for JiraId = IRI-5475
    							certDetails.certificateDtl.publishStatus = 0;
    							certDetails.certificateDtl.activeStatus = 1;
								//End here IRI-5475
    							setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
    							
    						});
    						
    						}
    					});
    					}
    				else {
    					if(certDetails.withOutAdt){
          
							certificateFactory.generateCertificateWithOutAuditIhm(certificateData,1,1).$promise.then(function(resCert){
    							setCertDataAfterGenerate(resCert);
								//Added by sudharsan for JiraId = IRI-5475
    							certDetails.certificateDtl.publishStatus = 0;
    							certDetails.certificateDtl.activeStatus = 1;
								//End here IRI-5475
    							setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
    							
    						});
						}
    					else{
    					certificateFactory.generateCertificateForIhm(certificateData,1,1).$promise.then(function(resCert){
							setCertDataAfterGenerate(resCert);
							//Added by sudharsan for JiraId = IRI-5475
							certDetails.certificateDtl.publishStatus = 0;
    						certDetails.certificateDtl.activeStatus = 1;
							//End here IRI-5475
							setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
							
						});
    					}
    				}
    					
    				 });  					 
    				 }
    					 });
    					 
    				 });
    			 }
    	
        	
    		 function checkConsective(){

    			 if(certDetails.certificateDtl.consecutiveId==1001 && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    				 certificateFactory.getPreviousIssueDate(certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.companyId).$promise.then(function(res){

    					 if(!res.previousIssueDate && certDetails.userRoleId!=1003){
    						 toaster.info('Previously published interim certificate does not exist');
    						 certDetails.certificateDtl.consecutiveId = 1000;
    					 }
    				 });

    			 } 
    		 }
    		 
    		 function setExpireDate(){
    			 var expiryDate = '';
    			var validatIssueDate='';
    			 var validatExpireDate='';
				 var issueDate='';
				  
    			 if(certDetails.certificateDtl.certIssueDate){
    			 
    				 if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID){
	    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
	    					issueDate= moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
	    					
	    					expiryDate = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
	    					 
	    					
	    					 if(certDetails.withOutAdt){
	    						 certDetails.certificateDtl.certExpireDate=moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
	    					 }
	    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID   ) {
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
    				
    				 	}else if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID) {
    				 	 certDetails.certificateDtl.ihmPrevReview='0';
    				 	 expiryDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					 issueDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					  if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    						if(certDetails.isIssuExpIhmChange){
    							//certDetails.certificateDtl.certIssueDate  = certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate: certDetails.certificateDtl.certIssueDate;
    						  certDetails.certificateDtl.certIssueDate = certDetails.certificateDtl.certIssueDate ? certDetails.certificateDtl.certIssueDate : certDetails.certificateDtl.auditDate;
    							//certDetails.certificateDtl.certExpireDate = moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    							certDetails.isIssuExpIhmChange = true;
    						}else{
    							certDetails.certificateDtl.certIssueDate  = certDetails.certificateDtl.certIssueDate || certDetails.certificateDtl.certIssueDate != '' ? certDetails.certificateDtl.certIssueDate :(certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate: certDetails.certificateDtl.certIssueDate);
    							certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate != '' ? certDetails.certificateDtl.certExpireDate : moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    							certDetails.isIssuExpIhmChange = false;
    						}
    					 }else{
    						 certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certIssueDate ? moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) : certDetails.certificateDtl.certExpireDate;
    					 }
    					  
    					 if(certDetails.withOutAdt){
    						 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    							 certDetails.certificateDtl.certExpireDate = certDetails.orgCertificateDtl.certIssueDate ?   moment(certDetails.orgCertificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) : moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) ;
    						 }else{
    							 certDetails.certificateDtl.certExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 }
    					 }
    				 	}else if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID) {
    				 		expiryDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 		issueDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 		if(certDetails.withOutAdt){
    						 certDetails.certificateDtl.certExpireDate= certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate : moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					}
    				 }
    				 

    				 validatExpireDate = expiryDate ? expiryDate : certDetails.certificateDtl.certExpireDate;
    				 validatIssueDate  =  issueDate?issueDate:certDetails.certificateDtl.certIssueDate;
    				 
    				 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    					 certDetails.minCertIssueDate      = certDetails.certificateDtl.auditDate ? (moment(certDetails.orgCertificateDtl.auditDate, MMMDDYYYY).format(YYYYMMDD)):(moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD));
    				 }else{
    					 certDetails.minCertIssueDate      =moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).format(YYYYMMDD);
    				 }
    				 certDetails.maxCertIssueDate      = moment(validatIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				 certDetails.minCertExpireDate     = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				 certDetails.maxCertExpireDate     = moment(validatExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				 
    				 if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID ){
     					certDetails.maxCertExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
     					
     				}
    			 }
    		 }
    		 
    		 
    		 function setExpireDateIHM(){
    			 var expiryDate = '';
    			var validatIssueDate='';
    			 var validatExpireDate='';
				 var issueDate='';
				  
    			 if(certDetails.certificateDtl.certIssueDate){
    				 
    				 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID) {
    				 	 certDetails.certificateDtl.ihmPrevReview='0';
    				 	 expiryDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					 issueDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					  if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    						if(certDetails.isIssuExpIhmChange){
    						    certDetails.certificateDtl.certIssueDate = certDetails.certificateDtl.certIssueDate ? certDetails.certificateDtl.certIssueDate : certDetails.certificateDtl.auditDate;
    							certDetails.isIssuExpIhmChange = true;
    						}else if(certDetails.certificateDtl.activeStatus == 1 && !certDetails.certificateDtl.publishStatus && certDetails.certificateDtl.publishStatus != 0){
    							certDetails.certificateDtl.certIssueDate  = moment(new Date()).format(DDMMMYYYY);
    							certDetails.certificateDtl.certExpireDate =  certDetails.certificateDtl.completionSurveyDate != '' ?  moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY): '';
    						}
    						else if(certDetails.certificateDtl.activeStatus == 1 && certDetails.certificateDtl.publishStatus == 0){
    							certDetails.certificateDtl.certIssueDate  = certDetails.certificateDtl.certIssueDate || certDetails.certificateDtl.certIssueDate != '' ? certDetails.certificateDtl.certIssueDate :(certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate: certDetails.certificateDtl.certIssueDate);
    							certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate :(moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY));
    						}
    						else if(certDetails.certificateDtl.activeStatus == 1 && certDetails.certificateDtl.publishStatus == 1){
    							certDetails.certificateDtl.certIssueDate  = certDetails.certificateDtl.certIssueDate || certDetails.certificateDtl.certIssueDate != '' ? certDetails.certificateDtl.certIssueDate :(certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate: certDetails.certificateDtl.certIssueDate);
    							certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate :(moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY));
    						}
    						else{
    							certDetails.certificateDtl.certIssueDate  = certDetails.certificateDtl.certIssueDate || certDetails.certificateDtl.certIssueDate != '' ? certDetails.certificateDtl.certIssueDate :(certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate: certDetails.certificateDtl.certIssueDate);
    							certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.completionSurveyDate != '' ?  moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY): '';
    							certDetails.isIssuExpIhmChange = false;
    						}
    					 }else{
    						 certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certIssueDate ? moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) : certDetails.certificateDtl.certExpireDate;
    					 }
    					  
 					 if(certDetails.withOutAdt){
    						 if(certDetails.certificateDtl.certExpireDate == ''){
    							 certDetails.certificateDtl.certExpireDate = certDetails.orgCertificateDtl.certIssueDate ?   moment(certDetails.orgCertificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) : moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) ;
    						 }
    					 }
    				 	}else if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID) {
    				 		expiryDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 		issueDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 		if(certDetails.withOutAdt){
    						 certDetails.certificateDtl.certExpireDate= certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate : moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					}
    				 }
    				 
    				 validatIssueDate = (moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD));
    				 validatExpireDate  =  moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 
    				 certDetails.minCertIssueDate      = '';
    				 
    				 certDetails.maxCertIssueDate      = '';
    				 certDetails.minCertExpireDate     = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(MMMDDYYYY);
    				 certDetails.maxCertExpireDate     = moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 
    				 certDetails.maxCompletionSurveyDate = moment(new Date()).format(DDMMMYYYY);// certDetails.currentAuditData ? certDetails.currentAuditData.certIssueDate:( certDetails.AllIhmAuditDetails && certDetails.AllIhmAuditDetails.length > 0 ? _(certDetails.AllIhmAuditDetails).chain().where({'auditSeqNo':certDetails.certificateDtl.auditSeqNo}).pluck("certIssueDate").toString() : (certDetails.auditAndCertData1 ?certDetails.auditAndCertData1.certIssueDate: certDetails.certificateDtl.completionSurveyDate));
    			 }
    		 }
    		 
    		 
    		 
    		 function isIssueExpDateChanged(){
    			 certDetails.isIssuExpIhmChange = true;
    		 } 
    		 
    		 function setExtendedExpireDate(){

    			 var expiryDate = '';
    			 var validatExpireDate = '';
    			 var validatIssueDate='';
    			 var issueDate='';
    			 
    			 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){ 

    				 if(certDetails.certificateDtl.extendedIssueDate){

    					 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
    						 issueDate= moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
    						 expiryDate = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
    						
    						// certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD);
    					 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){ 
    						
    						 issueDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 
    						 expiryDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    						 
    						
    						// certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD);
    					 
    					 }

                        
    					
    				 	 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    				 		 issueDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				 		 expiryDate=moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    					 } 
    				 	 
    				 	 validatIssueDate=issueDate?issueDate:certDetails.certificateDtl.extendedIssueDate;
    					 //certDetails.maxExtnCertIssueDate=moment(validatIssueDate, MMMDDYYYY).format(YYYYMMDD);
    					 
    					 validatExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    					 
    					 certDetails.minExtnCertExpireDate = certDetails.certificateDtl.completionSurveyDate;
    					 
    					 certDetails.maxExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
//    					 if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID ){
//    	     					certDetails.maxExtnCertExpireDate=moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
//    	     					
//    	     				}
    					
    				 }
    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
    				 certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){
    					 certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					 certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    				 }
    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
    				 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					 certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    				 }else{
    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					 certDetails.certificateDtl.certExpireDate=expiryDate;
    					 certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    				 }
    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    				 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					 certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    				 }else{
    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					 certDetails.certificateDtl.certExpireDate=expiryDate;
    					 certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
    				 }
    			 }
    			 
    		 }
    		 
    		 
    		 function onChangeSubType(){

    			 certDetails.setExpireDateIHM();

    			 certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ? 
    					 certDetails.AppConstant.INTERIM_CERT : 
    						 (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID || 
    								 certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID) ? 
    										 certDetails.AppConstant.FULL_TERM_IHM : certDetails.certificateDtl.certIssueId;
    			 if(certDetails.withOutAdt){
    			 var certificateData = certDetails.setCertDetails();
    			 console.log("certificateData  "+certificateData);
    			 certificateFactory.generateCertificatePublishStatusWithOutAudit(certificateData).$promise.then(function(resCert){
    				  
    				 
    				 if(resCert.check && resCert.check == 'present'){
							toaster.warning('Please publish the previous certificate');
							certDetails.disableGenerate = true;
						}else{
							certDetails.disableGenerate = false;
						}
    				 
    			 })
    			 }
    			 if( certDetails.certificateDtl.auditTypeId ==  certDetails.AppConstant.IHM_TYPE_ID && certDetails.withOutAdt){
    				 
    				 certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID ? certDetails.AppConstant.FULL_TERM_IHM:(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID)? certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM : certDetails.certificateDtl.certIssueId; 
    				
    			 }
    		 }
    		 
    		
 function onChangeIssueExpiryDate(){
 
	 certDetails.validateFlagForIssueExpDate =true;
	 certDetails.disableGenerate = false;
		if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM && certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.IHM_TYPE_ID) ||
			(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && 
			 certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM  )){
    			 if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).format(YYYYMMDD)){
    					toaster.info('Validity of the certificate is more than 5 Years');
    					certDetails.validateFlagForIssueExpDate = false;
    					certDetails.disableGenerate = true;
       			 }else if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).format(YYYYMMDD)){
       				    toaster.info('Validity of the certificate is less than 5 Years');
       				     
       			 }	
		}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT){
			if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
				toaster.info('Validity of the certificate is more than 6 Months');
				certDetails.validateFlagForIssueExpDate = false;
				certDetails.disableGenerate = true;
		 	}else if(moment(certDetails.certificateDtl.certExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).format(YYYYMMDD)){
			    toaster.info('Validity of the certificate is less than 6 Months');
			     
		    }	
		}else if((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.IHM_TYPE_ID) ||
				(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.IHM_TYPE_ID)){
				 if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).format(YYYYMMDD)){
					toaster.info('Validity of the certificate is more than 5 Years');
					certDetails.validateFlagForIssueExpDate = false;
					certDetails.disableGenerate = true;
	   			 }else if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(5,'years').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).format(YYYYMMDD)){
	   				toaster.info('Validity of the certificate is less than 5 Years');
	   				 
	   			 }	
		}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
			 if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)>moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
				toaster.info('Validity of the certificate is more than 6 Months');
				certDetails.validateFlagForIssueExpDate = false;
				certDetails.disableGenerate = true;
   			 }else if(moment(certDetails.certificateDtl.extendedExpireDate,MMMDDYYYY).subtract(6,'months').add(1,'days').format(YYYYMMDD)<moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).format(YYYYMMDD)){
   				toaster.info('Validity of the certificate is less than 6 Months');
   				 
   			 }	
		}
    					
    }

    		 
    		 function getAuditCertDetails(){
    			 
    			 certificateFactory.getAuditCertDetailsForIhm(certDetails.auditSeqNo, certDetails.companyId).$promise.then(function(res){
    				 
    				 certDetails.disableVsl = true;
    				 certDetails.withAdt    = true;
    				 certDetails.Stateflag = true;
    				 
    				
    				 var auditAndCertData = angular.copy(res);
    				 console.log(auditAndCertData);
    				// this is used to get the prevoius certificate
    				 certDetails.tempAuditData = angular.copy(res).auditDetail;
    				 certDetails.auditAndCertData1  =  angular.copy(res).auditDetail;
    				 certDetails.AuditVesselRefresh = angular.copy(res).auditDetail;
    				 certDetails.certificateDtl = angular.copy(res).auditDetail;
    				 
    				 certDetails.certificateDtl.certificateDetail = certDetails.certificateDtl.certificateDetail.filter(function(val) {
 					    return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
 					});
    				 
    				 
    				 auditAndCertData.auditDetail.certificateDetail = certDetails.certificateDtl.certificateDetail.filter(function(val) {
 					    return val.socType != 'exe'  &&  val.socType != "EXEMPTION";
 					});
    				 
    				 certDetails.socLength = certDetails.auditAndCertData1.certificateDetail.filter(function(val) {
 					    return val.socType != 'exe'  &&  val.socType != "EXEMPTION"; ;
 					}).length;
    				 
    					 certDetails.signerName = certDetails.certificateDtl.leadAuditorName ? certDetails.certificateDtl.leadAuditorName : auditAndCertData.auditDetail.leadAuditorName;
    				 
    				 
    				 
//  					certDetails.certificateDtl.issuerName = certDetails.signerName;
    			//	 certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.certIssueId == 1001 ?1002 : certDetails.certificateDtl.certIssueId;
    				if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
    				 certDetails.certificateDtl.additionalSurvey = certDetails.certificateDtl.additionalSurvey ? moment(certDetails.certificateDtl.additionalSurvey,YYYYMMDD).format(MMMDDYYYY):'';
    				}
    				
    				 if(certDetails.loginUserId == certDetails.certificateDtl.lockHolder){
    					 certDetails.allowEdit = true;
    				 }
    				 
 				     if(certDetails.withOutAdt){
    				    certDetails.certificateDtl.creditDate=moment(certDetails.certificateDtl.creditDate,YYYYMMDD).format(MMMDDYYYY);
    				 }
    				 
 				    setSocTypeCheckBoxValue(certDetails.certificateDtl.certIssueId,certDetails.certificateDtl.companyId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.auditSubTypeId,certDetails.certificateDtl.auditSeqNo,certDetails.certificateDtl.certificateLink);
    				 var detailsLead= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});

 					certDetails.leadSign=detailsLead.audSignature!=null && detailsLead.audSignature!=undefined && detailsLead.audSignature!=''?true:false;
 					

 					var check= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
 		    		
 					certDetails.reviewSign=check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined?true:false;
 		    		

 					
    				 certDetails.orgCertificateDtl = angular.copy(res).auditDetail;
    				 
    				 certDetails.getPreviousAuditCerData = angular.copy(res).prevAuditDtl;
    				 
    				 if(!certDetails.withOutAdt){
 						certDetails.getAllIhmCertifiactes();
 					}
    				
    			if(res.initalCount==1 || res.renewalCount==1){
    				certDetails.checkPreviousInitialOrRenewal=true;
    			}

    				 certDetails.dateFormatConversion(certDetails.orgCertificateDtl,YYYYMMDD,MMMDDYYYY);
    				 
    				 certDetails.nxtAuditCreate = res.nextAudit ? res.nextAudit : certDetails.nxtAuditCreate;
    				 
    				 certDetails.checkNxtAuditCreate =  res.checkNxtAuditCreate ?  res.checkNxtAuditCreate : certDetails.checkNxtAuditCreate;
    				 
    				 certDetails.disableReissue = res.disableReissue ? res.disableReissue : certDetails.disableReissue;
    				 
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
    				 
 					certDetails.userLoggedName = 'Inspector Name';
    				 
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

 					certDetails.certificateDtl.vesselCompanyName = auditAndCertData.vesselDetail.registeredCompanyName;
 					certDetails.certificateDtl.vesselCompanyAddress = auditAndCertData.vesselDetail.registeredCompanyAddress;
 					
    				 certDetails.orgCertificateDtl.portOfRegistry = certDetails.certificateDtl.portOfRegistry;

    				 var detailsLead= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'audLeadStatus' : certDetails.AppConstant.AUD_LEAD_STATUS});

    				 certDetails.leadStatus = (detailsLead.userId == sessionStorage.getItem('emailId')) ? true : false;

    				 if(!(certDetails.leadStatus) && auditAndCertData.auditDetail.allowNext==0){

    					 certDetails.disableAll = true;
    				 }
    				 if(!(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && auditAndCertData.auditDetail.allowNext==1){

    					 certDetails.disableAll = true;
    				 }
    				 /********Manager Role id - block *******/
//    				 if(certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
//
//    					 certDetails.disableAll = true;
//    					 certDetails.IhmFieldsDisable  =  false; 
//    				 }
    				 
    				 certDetails.certificateDtl.issuerName = certDetails.certificateDtl.leadAuditorName;

    				 certDetails.getAuditSubType(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.auditSubTypeId);

    				 if(!(auditAndCertData.auditDetail.certificateDetail) || auditAndCertData.auditDetail.certificateDetail.length==0){

    					 certDetails.certificateDtl.seqNo = 0;

    				 }else if(auditAndCertData.auditDetail.certificateDetail.length>0){

    					 certDetails.certificateLength = auditAndCertData.auditDetail.certificateDetail.length;

    					 var maxSeqNoCert = auditAndCertData.auditDetail.certificateDetail.reduce(function(prev, current){
    						 return (prev.seqNo > current.seqNo) ? prev : current
    					 });
    					 		if(certDetails.type=='Audit' && certDetails.auditAndCertData1.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && !certDetails.withOutAdt ){
    					 				certDetails.disableOptionsIhm(auditAndCertData.auditDetail);
    					 				}
    					 		/*else if(certDetails.type=='Audit' && certDetails.auditAndCertData1.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && !certDetails.withOutAdt ){
					 				certDetails.disableIhmAmendment();
				 				}*/
    		
    					 if(maxSeqNoCert && maxSeqNoCert.publishStatus){
    						 certDetails.certificateDtl.publishStatus = maxSeqNoCert.publishStatus;

    						 if(!certDetails.publishCheckStatus && !(certDetails.disableAll) && (certDetails.certificateDtl.certIssueId == certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM) && certDetails.certificateDtl.publishStatus==1 && !(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS) && !((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID && certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 0)){
    							 toaster.info('Certificate is already published, please change the certificate type');
    						 }

    						 certDetails.certificateDtl.seqNo = 0;
    						 certDetails.certificateDtl.certificateId  = maxSeqNoCert.certificateId;
    						 certDetails.certificateDtl.endorsementID  = maxSeqNoCert.endorsementID;
    						 certDetails.certificateDtl.utn			  = maxSeqNoCert.utn;
    						 certDetails.certificateDtl.qrCodeUrl	  = maxSeqNoCert.qrCodeUrl;

    					 }else if(maxSeqNoCert && !(maxSeqNoCert.publishStatus)){
  
    						 if(maxSeqNoCert.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
    							 certDetails.IhmDisable =  maxSeqNoCert.activeStatus == 1 ?( maxSeqNoCert.auditStatusId == 1002 && (maxSeqNoCert.certIssueId== certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || maxSeqNoCert.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM) ?  false : true):false;
    						 }
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
    				 
    				 certDetails.certificateDtl.extendedEndorsedDate = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? ((certDetails.leadStatus) ? moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY') : '') : '';

    				 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){

    					 certDetails.certificateDtl.extendedIssueDate =certDetails.certificateDtl.extendedIssueDate?certDetails.certificateDtl.extendedIssueDate:certDetails.certificateDtl.certIssueDate;
    					 certDetails.certificateDtl.extendedExpireDate = certDetails.certificateDtl.extendedExpireDate?certDetails.certificateDtl.extendedExpireDate:certDetails.certificateDtl.certExpireDate;
    			
    				 }

    				 if(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS &&  auditAndCertData.auditDetail.certificateDetail.length > 0){
    					 certDetails.certificateDtl = angular.copy(auditAndCertData.auditDetail.certificateDetail[0]);
    					
    					  getUserDet(certDetails.certificateDtl.issuerId,certDetails.certificateDtl.companyId);
    					 if(auditAndCertData.auditDetail.certificateDetail.length > 1){
    					 if(auditAndCertData.auditDetail.certificateDetail[1].auditDate !=  moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) ){
    						 certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate;
    					 }
    					 }
    					 else {
    		    			 if(auditAndCertData.auditDetail.certificateDetail[0].auditDate !=  moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) && certDetails.certificateDtl.auditDate == moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) ){
    		    				 certDetails.certificateDtl.auditDate = certDetails.auditDtlsAuditDate != '' && certDetails.auditDtlsAuditDate ? moment(certDetails.auditDtlsAuditDate,MMMDDYYYY).format(YYYYMMDD) :certDetails.certificateDtl.auditDate;
    		    			 }
    		    		 }
    					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint+'';
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';
    					certDetails.certificateDtl.condEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' : (!certDetails.certificateDtl.condEcGrant) ? '1' : certDetails.certificateDtl.condEcGrant;
    					 certDetails.certificateDtl.voyageEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' :(!certDetails.certificateDtl.voyageEcGrant) ? '1' :''+certDetails.certificateDtl.voyageEcGrant+'';
    					 certDetails.certificateDtl.ihmPrevReview = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '0' :''+certDetails.certificateDtl.ihmPrevReview+'';
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    					 certDetails.certificateDtl.ihmDocumentNo = (!certDetails.certificateDtl.ihmDocumentNo)? 'N/A' : certDetails.certificateDtl.ihmDocumentNo;
    					 certDetails.certificateDtl.regOwnedImoNo =certDetails.certificateDtl.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
    				 }

    				 if(!certDetails.leadStatus){
    					 certDetails.certificateDtl = angular.copy(angular.copy(auditAndCertData.auditDetail.certificateDetail[0]));
    					 getUserDet(certDetails.certificateDtl.issuerId,certDetails.certificateDtl.companyId);
    					 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate;					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint +'';					
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';					
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    					//certDetails.certificateDtl.condEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' : (!certDetails.certificateDtl.condEcGrant) ? '1' : certDetails.certificateDtl.condEcGrant;
    					 certDetails.certificateDtl.voyageEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' :(!certDetails.certificateDtl.voyageEcGrant) ? '1' : ''+certDetails.certificateDtl.voyageEcGrant +'';
    					 certDetails.certificateDtl.ihmPrevReview = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '0' :''+certDetails.certificateDtl.ihmPrevReview +'';
    					 certDetails.certificateDtl.ihmDocumentNo = (!certDetails.certificateDtl.ihmDocumentNo) ? 'N/A' : certDetails.certificateDtl.ihmDocumentNo ;
    					 certDetails.certificateDtl.regOwnedImoNo =certDetails.certificateDtl.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
    				 }

    				 if(certDetails.leadStatus && auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS){
    					 certDetails.disableAll = true;
    					 certDetails.enabled = false;
    					 certDetails.certificateDtl = angular.copy(angular.copy(auditAndCertData.auditDetail.certificateDetail[0]));
    					  getUserDet(certDetails.certificateDtl.issuerId,certDetails.certificateDtl.companyId);
    					 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate;					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint +'';					
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';	
    					 //certDetails.certificateDtl.condEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? 1 :(!certDetails.certificateDtl.condEcGrant) ? 1 : certDetails.certificateDtl.condEcGrant ;
    					 certDetails.certificateDtl.voyageEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' :(!certDetails.certificateDtl.voyageEcGrant) ? '1' : ''+certDetails.certificateDtl.voyageEcGrant +'';
    					 certDetails.certificateDtl.ihmPrevReview = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '0' :''+certDetails.certificateDtl.ihmPrevReview +'';
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    				 }else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 0){
 						certDetails.disableAll = true;
 					}else if((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && auditAndCertData.auditDetail.makeFinal == 1){
 						
 						 certDetails.disableAll = certDetails.nxtAuditCreate ? true : certDetails.nxtAuditCreate;	
 					}
    				 if(auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.COMPLETED_AUDIT_STATUS && auditAndCertData.auditDetail.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID)
    				 {
    					 certDetails.disableAll = false;
    				 }
    				 if(auditAndCertData.auditDetail.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS){
    					 toaster.info('Current audit marked as void');
    					 certDetails.certificateDtl = angular.copy(angular.copy(auditAndCertData.auditDetail.certificateDetail[0]));
    					  getUserDet(certDetails.certificateDtl.issuerId,certDetails.certificateDtl.companyId);
    					 certDetails.certificateDtl.issuerSignDate = certDetails.certificateDtl.issuerSignDate;					
    					 certDetails.certificateDtl.nameToPrint = ''+certDetails.certificateDtl.nameToPrint +'';					
    					 certDetails.certificateDtl.signToPrint = ''+certDetails.certificateDtl.signToPrint+'';	
    					// certDetails.certificateDtl.condEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? 1 : (!certDetails.certificateDtl.condEcGrant) ? 1 : certDetails.certificateDtl.condEcGrant ;
    					 certDetails.certificateDtl.voyageEcGrant = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '1' : (!certDetails.certificateDtl.voyageEcGrant) ? '1' : ''+certDetails.certificateDtl.voyageEcGrant +'';
    					 certDetails.certificateDtl.ihmPrevReview = (certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.IHM_TYPE_ID) ? '0' :''+certDetails.certificateDtl.ihmPrevReview +'';
    					 certDetails.certificateDtl.issuerSign = atob(certDetails.certificateDtl.issuerSign);
    					 certDetails.enabled = false;

    				 }else if(certDetails.certificateDtl.lockStatus == 1){
    					 toaster.info('Current audit reterived in the laptop');
    				 }

    				 try{
    					 certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.auditPlace  ?decodeURIComponent(atob(certDetails.certificateDtl.auditPlace)):'';
    				     if(certDetails.ihmAutoDishPlace && certDetails.ihmUserPlace){
    				    	 certDetails.certificateDtl.auditPlace = certDetails.ihmUserPlace;
    				     }
    				 }catch(err){
    				 }
    				 certDetails.certificateDtl.completionSurveyDate = certDetails.certificateDtl.completionSurveyDate && certDetails.certificateDtl.completionSurveyDate != null && certDetails.certificateDtl.completionSurveyDate != '' ? certDetails.certificateDtl.completionSurveyDate: certDetails.certificateDtl.certIssueDate;
    				 certDetails.dateFormatConversion(certDetails.certificateDtl,YYYYMMDD,MMMDDYYYY);
    				 
    				 setEnableIssueType();
    				 certDetails.setDateAndDisableCertIssueExpiryIHM();
    				 certDetails.enableCertType.push(certDetails.certificateDtl.certIssueId);
    				 certDetails.enableCertTypeForIHM.push(certDetails.certificateDtl.certIssueId);
    				 if(auditAndCertData.auditDetail.certificateDetail.length >1){
    					
    					 validateIssueExpiryDate();
    				 }else if(auditAndCertData.auditDetail.certificateDetail.length ==1 && certDetails.leadStatus && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    					
    					 getPrevioiusCertDtlsForRenewal();
    				 }

    				 if(!(certDetails.leadStatus || certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID)){
    					 certDetails.enabled = false;
    				 }
    				 certDetails.disableCertIssueTypeId = false;

    				 if(auditAndCertData.auditDetail.lockHolder){
    					 certDetails.releaseLock = false;
    					 
    					 certDetails.enabled = true;
    				 }
    				 if(auditAndCertData.auditDetail.lockHolder != certDetails.loginUserId){
    					 certDetails.allowEdit = true;
    					 certDetails.disableAll = true;
    					 
    				 }
    				
			 
				 
    				 if(!certDetails.certificateDtl.consecutiveId && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISPS_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ){
    					 certDetails.certificateDtl.consecutiveId=1000;
    				 }
    				 
    				 if(certDetails.nxtAuditCreate){
 						certDetails.releaseLock = certDetails.nxtAuditCreate 
 					}
    				 certDetails.checkNxtInterOrAddiReissuePresent = ((certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID && certDetails.nxtAuditInterOrAdd) || certDetails.disableReissue) ? 1 : 0;
    				
    				 if(certDetails.nxtAuditInterOrAdd){
    					 certDetails.enableCertType = (res.checkFullTermCert && res.checkFullTermCert==true) ? (certDetails.certificateDtl.auditTypeId == AppConstant.MLC_TYPE_ID ? [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM] : [certDetails.certificateDtl.certIssueId,certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM] ) : [certDetails.certificateDtl.certIssueId];
    					
    					 if(!certDetails.nxtAuditCreate && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM && certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
    						 certDetails.enableCertType = [certDetails.AppConstant.EXTENSION_IHM];
    					
    			    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			    		}
    				 }
    				 
    				 setEnableIssueType();
    				 
    				var userFlag = (certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) ? 'Manager' : 'lead';
    	    			
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
    				 
    				 certDetails.onchangeReissueName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? 'Issue Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM) ? 'Issue Date' : '';

    				 certDetails.onchangeReissueExpireName = (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM) ? 'Extended Expiry Date' : 
    					 (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM) ? 'Expiration Date' : '';

    				 certDetails.checkExtensionInInterOrAdd = (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? 1 : 0;
    				 
    				 if(!certDetails.publishCheckStatus && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.publishStatus==1) && certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS
    	        				&& ((certDetails.leadStatus && certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS) 
    	        				|| ((certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && certDetails.certificateDtl.makeFinal == 1))){
    	        			toaster.info('certificate already published please change the certificate issue type');
    	        			certDetails.disableGenerate = true;
    	        		}
    				 
    				 checkOrgCertDtlVal(certDetails.certificateDtl,certDetails.orgCertificateDtl);
    				 
    				 certDetails.publishCheckStatus = false; 
    			     
    				  if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && (certDetails.certificateDtl.publishStatus == undefined ) && !certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    					   //if certificate created
    					 //	certDetails.certificateDtl.certIssueDate = certDetails.certificateDtl.auditDate ? certDetails.certificateDtl.auditDate : certDetails.certificateDtl.certIssueDate;
    				 		certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certIssueDate ? moment(certDetails.certificateDtl.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY) : certDetails.certificateDtl.certExpireDate;
    				 }else if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID  && (certDetails.certificateDtl.publishStatus == 0)){
    					 //If certificate generated
    					 certDetails.certificateDtl.certExpireDate = certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate ? moment(certDetails.orgCertificateDtl.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY):''; ;
    				 }  
    				  if(certDetails.certificateDtl.publishStatus==0 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
  						
  						var expiryDate = '';
  						
       					if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
       	    				
       	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
       	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
       	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
       	    				 
       	    			 }else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
       	    				
       	    					 expiryDate = moment(moment(certDetails.certificateDtl.extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
       	    					 certDetails.minExtnCertExpireDate = moment(moment(certDetails.certificateDtl.endorsedDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
       	    					 certDetails.maxExtnCertExpireDate = expiryDate?expiryDate:certDetails.certificateDtl.extendedExpireDate;
       	    				
       	    			 }
       					
       				}
    				
    				  vesselDtlsCheck();
    				
  						certDetails.lockFunciton();
  						
    			 });	
    		 }//end of getAuditCertDetails();
    		 
    		 function setEnableIssueType(){
    			
    		var check= _.findWhere(certDetails.certificateDtl.auditAuditorDetail, {'auditRoleID' : certDetails.AppConstant.AUDIT_REVIEWER_ROLE_ID});
    		
    		if(check && check!=undefined && check.audSignature!=null && check.audSignature!='' && check.audSignature!=undefined){
    			certDetails.reviewSign=true;
    		}
    		
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){

    				 certDetails.enableCertType = [certDetails.AppConstant.INTERMEDAITE_ENDORSED, certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];

    			 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    				 certDetails.enableCertType = [certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM, certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    			 }

    			 if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){

    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT, certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];

    					 if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){
    						
    						 certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION_IHM);
    						
    					 }

    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    					
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					 if(certDetails.Stateflag){
    					
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    				 }

    			 }else if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID){
    				 
    				 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    				
    				 }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){

    					 certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];

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
    		if(res.auditTypeId==AppConstant.IHM_TYPE_ID && certDetails.ihmCertModal.hk==false && certDetails.ihmCertModal.eu==false &&
    			certDetails.ihmCertModal.exe==false ){
    			toaster.warning('Please select certificate type to download');
    			return true;
    		}
    		blockUI.start("Preparing Certificate");
    		console.log("certificateDtl",certDetails.certificateDtl);    		    		

    		auditFactory.qrCodeGenerator(CERTI_URL+res.companyId+'/'+res.utn).$promise.then(function(response){

    			certDetails.qrCodeData= response.data;

    			if(res){

//    				var doc = new jsPDF('p', 'mm', 'a4');	
    				console.log("currentRespose",res);
    				var auditDate =res.auditDate ? moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD): moment(new Date(),MMMDDYYYY).format(YYYYMMDD);

    				
    				certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
    					downloadIHMCertificate(resp,response,res);
    				});
    				
    				
    			}else{
    				blockUI.stop();
    			}

    		});


    	}
    	
    	function lockFunciton(){
    		auditFactory.getAllIhmAuditDetail(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId).$promise.then(function(res){
    			certDetails.AllIhmAuditDetails = angular.copy(res);
    		var message = '';
    		console.log("certDetails.AllIhmAuditDetails  "+certDetails.AllIhmAuditDetails);
    		var len = certDetails.AllIhmAuditDetails.length;
    		if(certDetails.AllIhmAuditDetails.length > 1 && certDetails.AllIhmAuditDetails[len - 1].auditStatusId == certDetails.AppConstant.COMMENCED_AUDIT_STATUS){
    			certDetails.disableLock = true;
    		}
    		else{
    	//	toaster.warning( "Certificate is already generated and not yet published by "+ certDetails.certificateDtl.issuerName + ".");
    		var certData = certDetails.tempAuditData.certificateDetails ? certDetails.tempAuditData.certificateDetails : certDetails.tempAuditData.certificateDetail;
    		if(certDetails.tempAuditData.lockHolder && certDetails.tempAuditData.lockHolder != sessionStorage.getItem('emailId')){
				certDetails.disableAll = true;
				
			}
    		if(certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
    			if(certDetails.certificateDtl.publishStatus == 1 && certDetails.certificateDtl.activeStatus == 1){
    				certDetails.disableLock = false;
    			
    			}
    			else {
    				if(certDetails.certificateDtl.publishStatus == 0 && certDetails.certificateDtl.activeStatus == 1){
    					if(certDetails.certificateDtl.issuerId == certDetails.loginUserId){
    						certDetails.disableLock = false;
    					}else{
    					
    						 message = 'Certificate is already generated and not published.'; //changed by sudharsan for jira-ID = IRI-5566
    					certDetails.disableLock = true;
    					}
    				 
    				
    				}
    				
    			}
    		}
    		else {
    			if(certDetails.tempAuditData.lockHolder && certDetails.tempAuditData.lockHolder != sessionStorage.getItem('emailId')){
    				certDetails.disableLock = true;
    			}
    			else{
    		//	toaster.success( "Certificate is already generated and not yet published by  "+ certDetails.certificateDtl.issuerName + ".");
    			if(certData.length > 0){
    				if(certData.length == 1 && certData[0].socType == 'exe'){
    					certDetails.disableLock = false;
    				}else{
    			if(certDetails.tempAuditData.lockHolder && (certDetails.tempAuditData.lockHolder != certDetails.loginUserId)){
    				certDetails.disableLock = true;
    			}
    			
    			if(certDetails.certificateDtl.issuerId && (certDetails.certificateDtl.issuerId != certDetails.loginUserId)){
    				 if (certDetails.tempAuditData.leadSign){
    					 if(certDetails.certificateDtl.publishStatus == 0  && certDetails.certificateDtl.activeStatus == 1){
    					 certDetails.disableLock = true;
    					 
    					 message = 'Certificate is already generated and not published.';  //changed by sudharsan for jira-ID = IRI-5566
    					 }
    				 }
    				 else {
    					 if(certDetails.certificateDtl.issuerId == certDetails.loginUserId ){
 							certDetails.disableLock = false;
 						}
 						else{
 						certDetails.disableLock = true;
 						}
    				 }
    				
    			}
    				}
    	//	certDetails.disableLock = auditAndCertData.auditDetail.lockHolder && (auditAndCertData.auditDetail.lockHolder != certDetails.loginUserId)  ? true : false;
    		//certDetails.disableLock = (certDetails.certificateDtl.leadAuditorId && (certDetails.certificateDtl.leadAuditorId == certDetails.loginUserId)) ? false : true;
    			
    			}
    			
    			else {
    				certDetails.disableLock = false;
    			}
    		}
    		}
    		}
    		if(certDetails.disableLock){
    			certDetails.disableAll = true;
    		}
    	if(message!=''){
    		$timeout(function(){
    		toaster.warning(message);  //changed by sudharsan for jira-ID = IRI-5566
    		});
    	}
    		});
    	}
    	
    	function funcEUECEXE(status,res,response,currRes){

    		console.log(res)
			var certificate;
    		var statusActiveInt,statusActive;
    		statusActiveInt = currRes.activeStatus;
    		if(statusActiveInt==1)
    			statusActive = 'active';
    		else 
    			statusActive = 'inactive';
    		var newCertificate=[], renewalEndorse2 = [],extension =[],renewalEndorse1 = [],additionalReissue1 =[],additionalReissue2 =[],additionalReissue3 =[];
	    	var currInitialPage=[],additional1=[],additional2=[],additional3=[],add1CertOrderNO=0,add2CertOrderNO=0,add3CertOrderNO=0,reissCert=0;
	    	
    		var certResult = res.result;
    		var auditSubTypeId = certDetails.auditSubTypeId,
			certificaIssueId = certDetails.certIssueId,
			tempAuditSeqNo = certDetails.auditSeqNo;
    		
    		certResult.forEach(function(a){
				if(a.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM  && a.socType==status){
					
					if(a.certOderNo > add1CertOrderNO && add1CertOrderNO==0)
						add1CertOrderNO = a.certOderNo;
					if(a.certOderNo > add2CertOrderNO && add2CertOrderNO==0 && a.certOderNo > add1CertOrderNO && add1CertOrderNO!=0)
						add2CertOrderNO = a.certOderNo;
					if(a.certOderNo > add3CertOrderNO && add3CertOrderNO==0 && a.certOderNo > add2CertOrderNO && add2CertOrderNO!=0)
						add3CertOrderNO = a.certOderNo;
					
						
				}
				if(a.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
					if(a.certIssueId ==1005){
						a.addReissue = true;	
					}
						
				else
					a.addReissue = false;
				}				
				
				if(a.certIssueId==certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
					reissCert = a.certOderNo;
				}
				
    			
			});
    		//console.log(a.certIssueId + " "+add1CertOrderNO +" "+ add2CertOrderNO +" "+add3CertOrderNO)
    		if(status=='hk'){
				if(certDetails.ihmCertModal.hk==true){
					
	    			certResult.forEach(function(a){
	    				if(a.socType=='hk' && (a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' )){
	    					console.log(a);
	    					/*currInitialPage={0:a};
	    					newCertificate.push(a);*/
	    					(a.certificateLink==currRes.certificateLink) ? currInitialPage={0:a} : '';
	    					(a.certificateLink==currRes.certificateLink) ? newCertificate={0:a} : '';
	    				}
	    			});
	    		}
    		}
    		if(status=='eu'){
				if(certDetails.ihmCertModal.eu==true){
	    			certResult.forEach(function(a){
	    				if(a.socType=='eu' && (a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' )){
	    					console.log(a);
	    					/*currInitialPage={0:a};
	    					newCertificate.push(a);*/
	    					(a.certificateLink==currRes.certificateLink) ? currInitialPage={0:a} : '';
	    					(a.certificateLink==currRes.certificateLink) ? newCertificate={0:a} : '';
	    				}
	    			});
				}
    		}
    		if(status=='exe'){
    			if(certDetails.ihmCertModal.exe==true){
	    			certResult.forEach(function(a){
	    				if(a.socType=='exe' && (a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' )){
	    					console.log(a);
	    					/*currInitialPage={0:a};
	    					newCertificate.push(a);*/
	    					(a.certificateLink==currRes.certificateLink) ? currInitialPage={0:a} : '';
	    					(a.certificateLink==currRes.certificateLink) ? newCertificate={0:a} : '';
	    				}
	    				
	    			});
    			}
    		}
    		certResult.forEach(function(a,index){
					
					   if(a.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
								if(a.certIssueId == certificaIssueId){
									a.withoutCross = true;
								}else{
									a.withoutCross = false;
								}
								(a.socType==status && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? extension={0:a} : '';
								//extension={0:a};
						}
						
					   else if(a.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
								if(a.certIssueId == certificaIssueId){
									a.withoutCross = true;
								}else{
									a.withoutCross = false;
								}
								(a.socType==status && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? renewalEndorse1={0:a} : '';
								//renewalEndorse1={0:a};
						}
						
					   else if (a.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
							if(a.certIssueId == certificaIssueId){
								a.withoutCross = true;
								}else{
								a.withoutCross = false;
								}
							(a.socType==status && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? renewalEndorse2={0:a} : '';
							//renewalEndorse2={0:a};
						}
					   else if (a.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
						   if(a.certIssueId == certificaIssueId){
								a.withoutCross = true;
								}else{
								a.withoutCross = false;
								}
							(reissCert < add1CertOrderNO ) && (a.certOderNo==add1CertOrderNO) ? additional1={0:a} : (reissCert>0) && (add1CertOrderNO>0) && (reissCert > add1CertOrderNO ) ? additionalReissue1={0:a} : '';
							(reissCert < add2CertOrderNO ) && (a.certOderNo==add2CertOrderNO) ? additional2={0:a} : (reissCert>0) && (add2CertOrderNO>0) && (reissCert > add2CertOrderNO ) ? additionalReissue2={0:a} : '';
							(reissCert < add3CertOrderNO ) && (a.certOderNo==add3CertOrderNO) ? additional3={0:a} : (reissCert>0) && (add3CertOrderNO>0) && (reissCert > add3CertOrderNO ) ? additionalReissue3={0:a} : '';	
						}	
				});	
    			
    		
    		
    			console.log(currInitialPage)
    			console.log(newCertificate)
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
					'expirydate'	:(newCertificate[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
					'auditplace'	:newCertificate[0].auditPlace,
					'certissuedate'	:(newCertificate[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
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
									'additional1':additional1,
									'additional2':additional2,
									'additional3':additional3,
									'additionalReissue1':additionalReissue1,
									'additionalReissue2':additionalReissue2,
									'additionalReissue3':additionalReissue3,
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
									'qrCodeData' : response.data,
									'dateOfReg': newCertificate[0].dateOfRegistry,
									'renewalEndorse2':renewalEndorse2,
									'extension':extension,
									'seal':newCertificate[0].seal ? newCertificate[0].seal : certDetails.seal,
									'title':newCertificate[0].title ? newCertificate[0].title : certDetails.title,
									'voluntaryCert':certDetails.certDownType=='vol'?true:false,
											'certificateDetails':certResult,
											'crossLineStatus':statusActive,
											'currentCertiObj':certResult[0],
											'renewalEndorse1':renewalEndorse1,
											'ihmDocumentNo':certDetails.certificateDtl.ihmDocumentNo?certDetails.certificateDtl.ihmDocumentNo:'',
											'condEcGrant':certDetails.certificateDtl.condEcGrant ?certDetails.certificateDtl.condEcGrant:'' ,
											'completionSurveyDate':certDetails.certificateDtl.completionSurveyDate ? certDetails.certificateDtl.completionSurveyDate :'',
											'voyageEcGrant' : certDetails.certificateDtl.voyageEcGrant ?  certDetails.certificateDtl.voyageEcGrant :'',
											'renewalRegulation':certDetails.certificateDtl.renewalRegulation ?certDetails.certificateDtl.renewalRegulation:''
			} 
    			console.log(certificateDatas);
    		return certificateDatas;
    		
    	}
    
    	
    	function downloadIHMCertificate(res,response,currRes){
    		
    		res.result.forEach(function(a,index){
    			console.log(certDetails.ecGrantedReasonExa);
    			
    			var ecreasonName= _(certDetails.ecGrantedReasonExa).chain().where({'reasonId':a.condEcGrant}).pluck("ecGrantedReason").toString();
			
    			if(ecreasonName=="")
    				ecreasonName= _(certDetails.ecGrantedReason).chain().where({'reasonId':a.condEcGrant}).pluck("ecGrantedReason").toString();
				
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
							
							a.condEcGrant = ecreasonName;
							
							
									
			});
    		
			$timeout(function(){
					if(certDetails.ihmCertModal.hk==true){
						
						var certificateDatas=funcEUECEXE('hk',res,response,currRes);
						var certificate = auditService.ihmPdfService(certificateDatas,'HK');
						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
					}
					if(certDetails.ihmCertModal.eu==true){
						var certificateDatas=funcEUECEXE('eu',res,response,currRes);
						var certificate = auditService.ihmPdfService(certificateDatas,'EU');
						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
					}
					if(certDetails.ihmCertModal.exe==true){
						var certificateDatas=funcEUECEXE('exe',res,response,currRes);
						var certificate = auditService.ihmPdfService(certificateDatas,'Exemption');
						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
					}	
				blockUI.stop();
				toaster.success('Certificate downloaded successfully');
			
			},2000);
    		
    	}
    	
 
    	function setDateAndDisableCertIssueExpiryIHM(){ 

    		if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
				certDetails.minExtnCertIssueDate = ''
					
			}else{
			//    certDetails.minExtnCertIssueDate =certDetails.certificateDtl.extendedIssueDate? moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).format(YYYYMMDD):moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
			}

    		certDetails.setExpireDateIHM();
    	
    		if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID ){
    				var vesselImoNo = certDetails.certificateDtl.vesselImoNo ? certDetails.certificateDtl.vesselImoNo : auditAndCertData.vesselDetail.vesselImoNo;
    				certificateFactory.getAllCertificateDetailForIhm(certDetails.certificateDtl.auditTypeId, vesselImoNo, certDetails.certificateDtl.companyId,'soc').$promise.then(function(res){
  			          
    					certDetails.AllIhmCertificateData = angular.copy(res.result);
    				
    					if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM && certDetails.certificateDtl.auditSubTypeId ==  certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
    					if(auditAndCertData && auditAndCertData.addSurvDueDateChanged && certDetails.certificateDtl.publishStatus != 1){
    						certDetails.certificateDtl.endorsedDate = certDetails.orgCertificateDtl.additionalSurvey ;
    						auditAndCertData.addSurvDueDateChanged = false;
    					}
    					//if(certDetails.certificateDtl.auditSubTypeId = 1001 && certDetails.certificateDtl.certIssueId = 1002 )
    					else if(!certDetails.certificateDtl.endorsedDate){
    						certDetails.certificateDtl.endorsedDate = certDetails.orgCertificateDtl.additionalSurvey;
    					}
    					certDetails.certificateDtl.ihmPrevReview = certDetails.certificateDtl.ihmPrevReview ? certDetails.certificateDtl.ihmPrevReview : '0';
    					console.log(typeof auditAndCertData);
    					if(typeof auditAndCertData !== "undefined") auditAndCertData.addSurvDueDateChanged = false;
    					sessionStorage.setItem('certEndrosedDateIHM',certDetails.certificateDtl.endorsedDate);
    					
    						certDetails.maxEndorseDate = certDetails.AllIhmCertificateData && certDetails.AllIhmCertificateData.length > 0 && certDetails.AllIhmCertificateData[0].extendedExpireDate ? certDetails.AllIhmCertificateData[0].extendedExpireDate : certDetails.AllIhmCertificateData[0].certExpireDate;
        					certDetails.minEndorseDate = certDetails.AllIhmCertificateData && certDetails.AllIhmCertificateData.length > 0 && certDetails.AllIhmCertificateData[0].completionSurveyDate ? certDetails.AllIhmCertificateData[0].completionSurveyDate : '';
    					
    							
    					
    					certDetails.certificateDtl.certIssueDate = certDetails.AllIhmCertificateData && certDetails.AllIhmCertificateData.length>0 && certDetails.AllIhmCertificateData[0].extendedIssueDate ? moment(certDetails.AllIhmCertificateData[0].extendedIssueDate, 'YYYYMMDD').format('DD-MMM-YYYY'):moment(certDetails.AllIhmCertificateData[0].certIssueDate, 'YYYYMMDD').format('DD-MMM-YYYY');
     				    certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate:(certDetails.AllIhmCertificateData[0].extendedExpireDate ? moment(certDetails.AllIhmCertificateData[0].extendedExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'):moment(certDetails.AllIhmCertificateData[0].certExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'));
     				   certDetails.certificateDtl.completionSurveyDate = certDetails.AllIhmCertificateData[0].completionSurveyDate ?moment(certDetails.AllIhmCertificateData[0].completionSurveyDate, 'YYYYMMDD').format('DD-MMM-YYYY') :  moment(new Date()).format(DDMMMYYYY);
     				 
     				  if(certDetails.AllIhmCertificateData.length > 0 && (certDetails.AllIhmCertificateData[0].certIssueId == certDetails.AppConstant.EXTENSION_IHM || certDetails.AllIhmCertificateData[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){
  						certDetails.maxEndorseDate = certDetails.AllIhmCertificateData[0].extendedExpireDate ? certDetails.AllIhmCertificateData[0].extendedExpireDate : certDetails.AllIhmCertificateData[0].certExpireDate;
      					certDetails.minEndorseDate = certDetails.AllIhmCertificateData[0].completionSurveyDate ? certDetails.AllIhmCertificateData[0].completionSurveyDate : certDetails.AllIhmCertificateData[0].certIssueDate;
  					}
    					}
    					  if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
       	       				certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate).format(YYYYMMDD);
       	       				certDetails.maxExtnCertExpireDate =  moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD);
       	    		}
      					if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM && certDetails.certificateDtl.auditSubTypeId ==  certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
      						
      						certDetails.certificateDtl.extendedIssueDate = certDetails.AllIhmCertificateData[0].extendedIssueDate ? moment(certDetails.AllIhmCertificateData[0].extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) :'';
              				certDetails.certificateDtl.extendedExpireDate =certDetails.AllIhmCertificateData[0].extendedExpireDate ? moment(certDetails.AllIhmCertificateData[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) :'';
              				
      						certDetails.certificateDtl.ihmDocumentNo =certDetails.AllIhmCertificateData[0].ihmDocumentNo;
      						certDetails.certificateDtl.condEcGrant =  certDetails.AllIhmCertificateData[0].condEcGrant ;
      						certDetails.certificateDtl.voyageEcGrant = ''+certDetails.AllIhmCertificateData[0].voyageEcGrant+'';
      						
      						
      						
      					}
      					if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM && certDetails.certificateDtl.auditSubTypeId ==  certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
      						
      						certDetails.certificateDtl.certIssueDate = certDetails.AllIhmCertificateData && certDetails.AllIhmCertificateData.length>0 && certDetails.AllIhmCertificateData[0].extendedIssueDate ? moment(certDetails.AllIhmCertificateData[0].extendedIssueDate, 'YYYYMMDD').format('DD-MMM-YYYY'):moment(certDetails.AllIhmCertificateData[0].certIssueDate, 'YYYYMMDD').format('DD-MMM-YYYY');
         				    certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate:(certDetails.AllIhmCertificateData[0].extendedExpireDate ? moment(certDetails.AllIhmCertificateData[0].extendedExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'):moment(certDetails.AllIhmCertificateData[0].certExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'));
         				   certDetails.certificateDtl.completionSurveyDate = certDetails.AllIhmCertificateData[0].completionSurveyDate ?moment(certDetails.AllIhmCertificateData[0].completionSurveyDate, 'YYYYMMDD').format('DD-MMM-YYYY') :  moment(new Date()).format(DDMMMYYYY);
      						certDetails.certificateDtl.ihmDocumentNo =certDetails.AllIhmCertificateData[0].ihmDocumentNo;
      						certDetails.certificateDtl.condEcGrant =  certDetails.AllIhmCertificateData[0].condEcGrant ;
      						certDetails.certificateDtl.voyageEcGrant = ''+certDetails.AllIhmCertificateData[0].voyageEcGrant+'';
      						
      						
      						
      					}
      					
    				});
    				
    		}
    		
    			
    	}
    	
    	
    	function setDateAndDisableCertIssueExpiry(){ 

    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){

    			certDetails.disableIssue   = true;
    			certDetails.disableExpire  = true;
    			certDetails.disablExtnExpire = true;
    			
    			if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    				certDetails.enableCertType = [certDetails.AppConstant.INTERMEDAITE_ENDORSED, certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM]
    			}else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID){
    				certDetails.enableCertType = [certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM, certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM]
    			}
    			
    			if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    				certDetails.setExtendedExpireDate();
    			} 
    		}else if(( certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERIM_SUB_TYPE_ID ) || ( certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID ) ){

    			if(certDetails.userRoleId == certDetails.AppConstant.AUDITOR_ROLE_ID){

    				certDetails.disableIssue   	 = false;
    				certDetails.disableExpire    = false;
    				certDetails.disablExtnExpire = true;

    				certDetails.minCertIssueDate = moment(certDetails.certificateDtl.closeMeetingDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.maxCertIssueDate = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.minCertExpireDate     = moment(moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).add(1,'days'),DDMMYYYY).format(YYYYMMDD);
    				certDetails.maxCertExpireDate     = moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).format(YYYYMMDD);
    			 
    				certDetails.setExpireDate(); 
    				
    			
    				
    				certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];

    			}else if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){

    				certDetails.disableIssue   = true;
    				certDetails.disableExpire  = true;
    				certDetails.disablExtnExpire = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID ? false : true;
    			//	certDetails.minExtnCertIssueDate =certDetails.certificateDtl.extendedIssueDate? moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).format(YYYYMMDD):moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).format(YYYYMMDD);
 
    				certDetails.enableCertType = [certDetails.AppConstant.INTERIM_CERT,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];

    				if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.ISM_TYPE_ID && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){
    					
    					certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION_IHM);
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
    				certDetails.setExpireDate();

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID){
    				  					
    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    				}

    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					 if(certDetails.Stateflag){
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    					
    				}

    			}else if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){

    				certDetails.disableIssue   = true;
    				certDetails.disableExpire    = true;
    				certDetails.disablExtnExpire = certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID ? true : false;
    			//	certDetails.minExtnCertIssueDate =certDetails.certificateDtl.extendedIssueDate? moment(certDetails.certificateDtl.extendedIssueDate, MMMDDYYYY).format(YYYYMMDD):moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    			 
    				certDetails.maxExtnCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).format(YYYYMMDD);

    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    				
    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID){
    					
    					 if(certDetails.Stateflag){
    						 enableRenewalCertTypesVthAuditScreen();
    					 }else{
    						 enableRenewalCertTypeVthSearchScreen();
    					 }
    					
    				}
    				
    				if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INITIAL_SUB_TYPE_ID && certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
    					certDetails.enableCertType.push(certDetails.AppConstant.EXTENSION_IHM);
    				}
    				if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
    					certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    					certDetails.maxCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    	    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate ? certDetails.validateExpiryDate : certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    		
    				}
    				if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    					certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(YYYYMMDD);
    					certDetails.maxCertExpireDate = moment(moment(certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    	    			certDetails.maxExtnCertExpireDate = moment(moment(certDetails.validateExpiryDate ? certDetails.validateExpiryDate : certDetails.certificateDtl.certExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    		
    				}
    			}			
    		}
    		
    		if(((certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.INTERMEDIATE_SUB_TYPE_ID || certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.ADDITIONAL_SUB_TYPE_ID) && certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)
    				|| certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM ){
    			
    			
    			if(!certDetails.certificateDtl.endorsedDate){
    				
    				//certDetails.certificateDtl.endorsedDate = moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    				certDetails.certificateDtl.endorsedDate =  certDetails.certificateDtl.certIssueDate;
    			}
    		}
    		if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID ){
    			if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    				var vesselImoNo = certDetails.certificateDtl.vesselImoNo ? certDetails.certificateDtl.vesselImoNo : auditAndCertData.vesselDetail.vesselImoNo;
    				certificateFactory.getAllCertificateDetailForIhm(certDetails.certificateDtl.auditTypeId, vesselImoNo, certDetails.certificateDtl.companyId,'soc').$promise.then(function(res){
  			          
    					certDetails.AllIhmCertificateData = angular.copy(res.result);
    				
    			
    					if(auditAndCertData && auditAndCertData.addSurvDueDateChanged && certDetails.certificateDtl.publishStatus != 1){
    						certDetails.certificateDtl.endorsedDate = certDetails.orgCertificateDtl.additionalSurvey ;
    						auditAndCertData.addSurvDueDateChanged = false;
    					}
    					else if(!certDetails.certificateDtl.endorsedDate){
    						certDetails.certificateDtl.endorsedDate = certDetails.orgCertificateDtl.additionalSurvey;
    					}
    					auditAndCertData.addSurvDueDateChanged = false;
    					sessionStorage.setItem('certEndrosedDateIHM',certDetails.certificateDtl.endorsedDate);
    					certDetails.maxEndorseDate = certDetails.AllIhmCertificateData[0].extendedExpireDate ? certDetails.AllIhmCertificateData[0].extendedExpireDate : certDetails.AllIhmCertificateData[0].certExpireDate;
    					certDetails.minEndorseDate = certDetails.AllIhmCertificateData[0].extendedEndorsedDate ? certDetails.AllIhmCertificateData[0].extendedEndorsedDate : certDetails.AllIhmCertificateData[0].certIssueDate;
    			//	certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate : $window.sessionStorage.getItem('certExpireDateIHM');
    				certDetails.certificateDtl.certExpireDate = certDetails.certificateDtl.certExpireDate ? certDetails.certificateDtl.certExpireDate:(certDetails.AllIhmCertificateData[0].extendedExpireDate ? moment(certDetails.AllIhmCertificateData[0].extendedExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'):moment(certDetails.AllIhmCertificateData[0].certExpireDate, 'YYYYMMDD').format('DD-MMM-YYYY'));
    				});
    				}
    		}
    		setEnableIssueType();
    	}// end of setDateAndDisableCertIssueExpiry
    	
    	
    	function onChangeIssueType(){
    		
    		certDetails.certificateDtl.certIssueId = certDetails.certificateDtl.certIssueId &&( certDetails.certificateDtl.certIssueId != '' || certDetails.certificateDtl.certIssueId != null) ?certDetails.certificateDtl.certIssueId : (certDetails.certissued != null && certDetails.certissued !='' )? certDetails.certissued: certDetails.orgCertificateDtl.certIssueId;
    		certDetails.certificateDtl.certIssueDesc = certDetails.IhmOptions(certDetails.certificateDtl.certIssueId);
    		if((!certDetails.IHMCertIssueFlag)  && !(certDetails.onChangeCaller && certDetails.certificateDtl.auditSubTypeId == 1002) ){
    		//certDetails.certificateDtl.condEcGrant = (!certDetails.certificateDtl.condEcGrant) ? '1' : certDetails.certificateDtl.condEcGrant;
    			 
    		certDetails.certificateDtl.voyageEcGrant = (!certDetails.certificateDtl.voyageEcGrant) ? '1' : certDetails.certificateDtl.voyageEcGrant;
    		var previous_cert_data = {};
    		if(certDetails.AllIhmCertificateData){
    			var previous_cert_data = {};
        		if(certDetails.AllIhmCertificateData){
        			//certDetails.Stateflag = true;
        			if(certDetails.AllIhmCertificateData[0]){
        				if(certDetails.AllIhmCertificateData[0].publishStatus == 1 && certDetails.AllIhmCertificateData[0].activeStatus == 1){
        					previous_cert_data = certDetails.AllIhmCertificateData[0];
        				}
        				else{
        	    			previous_cert_data = certDetails.AllIhmCertificateData[1];
        	    		}
        			}
        			else{
            			previous_cert_data = certDetails.AllIhmCertificateData[1];
            		}
        		}
    		}

    		
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
    			
			
    	  	if(previous_cert_data.certIssueId == certDetails.AppConstant.FULL_TERM_IHM){
    				if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
    					certDetails.certificateDtl.extendedIssueDate = moment(previous_cert_data.certIssueDate,YYYYMMDD).format(MMMDDYYYY);
    					certDetails.certificateDtl.extendedExpireDate = moment(previous_cert_data.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
    				}else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    					certDetails.certificateDtl.endorsedDate = moment(new Date()).format(DDMMMYYYY);
    					certDetails.certificateDtl.extendedIssueDate =previous_cert_data.extendedIssueDate? previous_cert_data.extendedIssueDate :  moment(previous_cert_data.certIssueDate,YYYYMMDD).format(MMMDDYYYY);
        				certDetails.certificateDtl.extendedExpireDate = moment(previous_cert_data.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
        				}
    				
    			}else if(previous_cert_data.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
    				 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    					certDetails.certificateDtl.endorsedDate =previous_cert_data.endorsedDate && previous_cert_data.endorsedDate !='' ? moment(previous_cert_data.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : moment(new Date()).format(DDMMMYYYY);
        				certDetails.certificateDtl.extendedExpireDate = moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY);
        				}
    				
    			}
    			else if(previous_cert_data.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || previous_cert_data.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
   				 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
    					certDetails.certificateDtl.extendedIssueDate = moment(previous_cert_data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY);
        			certDetails.certificateDtl.extendedExpireDate = moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY);
        				} 
   				 else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
   					certDetails.certificateDtl.endorsedDate = previous_cert_data.endorsedDate && previous_cert_data.endorsedDate !='' ? moment(previous_cert_data.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : moment(new Date()).format(DDMMMYYYY);
       				certDetails.certificateDtl.extendedExpireDate =moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY);
       				}
   				
    			}else if(previous_cert_data.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    				  if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
     					certDetails.certificateDtl.extendedIssueDate = previous_cert_data.extendedIssueDate ? moment(previous_cert_data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY):(previous_cert_data.certIssueDate ? moment(previous_cert_data.certIssueDate,YYYYMMDD).format(MMMDDYYYY) :'');
         			certDetails.certificateDtl.extendedExpireDate = previous_cert_data.extendedExpireDate ? moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY):(previous_cert_data.certExpireDate ? moment(previous_cert_data.certExpireDate,YYYYMMDD).format(MMMDDYYYY) :'');
         				}
    				  else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
      					certDetails.certificateDtl.endorsedDate = previous_cert_data.endorsedDate && previous_cert_data.endorsedDate !='' ? moment(previous_cert_data.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : moment(new Date()).format(DDMMMYYYY);
      					certDetails.certificateDtl.extendedIssueDate = previous_cert_data.extendedIssueDate ? moment(previous_cert_data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) :(previous_cert_data.certIssueDate ? moment(previous_cert_data.certIssueDate,YYYYMMDD).format(MMMDDYYYY):'');
          				certDetails.certificateDtl.extendedExpireDate =previous_cert_data.extendedExpireDate ? moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) :(previous_cert_data.certExpireDate ? moment(previous_cert_data.certExpireDate,YYYYMMDD).format(MMMDDYYYY):'');
          				}
    				
    			}
    			else if(previous_cert_data.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
  				  if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.EXTENSION_IHM){
   					certDetails.certificateDtl.extendedIssueDate = moment(previous_cert_data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY);
       			certDetails.certificateDtl.extendedExpireDate = moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY);
       				}
  				  else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    					certDetails.certificateDtl.endorsedDate = previous_cert_data.endorsedDate && previous_cert_data.endorsedDate !='' ? moment(previous_cert_data.endorsedDate,YYYYMMDD).format(MMMDDYYYY) : moment(new Date()).format(DDMMMYYYY);
    					certDetails.certificateDtl.extendedIssueDate = moment(previous_cert_data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY);
        				certDetails.certificateDtl.extendedExpireDate =  moment(previous_cert_data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY);
        				}
  				
  			}
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    				certDetails.certificateDtl.extendedIssueDate = moment(previous_cert_data.certIssueDate,YYYYMMDD).format(MMMDDYYYY);
           			certDetails.certificateDtl.extendedExpireDate = moment(previous_cert_data.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
    			}
   			
    			
    		}
    		
    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM ){

    			certDetails.certificateDtl.auditDate = certDetails.orgCertificateDtl.auditDate;
   			
    			
    			if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM){
    				certDetails.certificateDtl.portOfRegistry = certDetails.portOfRegistry ? certDetails.portOfRegistry : certDetails.orgCertificateDtl.portOfRegistry;
    			}else{
    				//certDetails.certificateDtl.portOfRegistry = certDetails.orgCertificateDtl.portOfRegistry;
    				  if(certDetails.dynamicMsg && certDetails.dynamicMsg != ''){
    					  console.log(certDetails.latestVesselDetail)
    	 	    			console.log(certDetails.enableCertType);
    					  
    					  	//setVesselHistory(certDetails);
    		   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].registeredCompanyAddress;
    		  				
    					  	certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].registeredCompanyName;
    					  
    		   	       		certDetails.certificateDtl.keelLaidDate = moment(certDetails.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
    		  				
    	    	   	    	certDetails.certificateDtl.regOwnedImoNo = certDetails.latestVesselDetail[0].regOwnedImoNo;
    	    	  			
    	    	   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
    	    	  				
    		   	       		certDetails.certificateDtl.dateOfRegistry = certDetails.latestVesselDetail && certDetails.latestVesselDetail.length > 0  && certDetails.latestVesselDetail[0].registrationDate&& certDetails.latestVesselDetail[0].registrationDate != null &&  certDetails.latestVesselDetail[0].registrationDate != '' ? moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '';    		   	       		
    		   	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
    		   	       		
    		   	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
    		  				
    		   	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
    		   	       		
    		   	       		certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
    		   	       		
    		   	       		certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselID;
    				  }
    			}
    		}
    		else {
    			if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    				certDetails.certificateDtl.completionSurveyDate = certDetails.certificateDtl.completionSurveyDate && certDetails.certificateDtl.completionSurveyDate != null ? certDetails.certificateDtl.completionSurveyDate: certDetails.certificateDtl.certIssueDate;
    				certDetails.certificateDtl.extendedIssueDate = certDetails.certificateDtl.auditDate,YYYYMMDD;
    				certDetails.certificateDtl.extendedExpireDate = moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY)
    			}
    		}
    		if(certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    			
		   	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.orgRegCompanyAddress;
		  				
					  	certDetails.certificateDtl.vesselCompanyName = certDetails.orgRegCompanyName;
					  
		   	       		certDetails.certificateDtl.keelLaidDate = dateFormater(certDetails.orgCertKeelLaidDate,'DD-MMM-YYYY');
		  				
	    	   	    	certDetails.certificateDtl.regOwnedImoNo = certDetails.orgRegOwnedImoNo;
	    	  			
	    	   	       	certDetails.certificateDtl.vesselName = certDetails.orgVesselName;
	    	  				
		   	       		certDetails.certificateDtl.dateOfRegistry = certDetails.orgCertDor && certDetails.orgCertDor != null && certDetails.orgCertDor !='' ? dateFormater(certDetails.orgCertDor,'DD-MMM-YYYY'):certDetails.orgCertDor;
		   	       		
		   	       		certDetails.certificateDtl.vesselType = 	certDetails.orgVesselType;
		   	       		
		   	       		certDetails.certificateDtl.companyImoNo =certDetails.orgCompanyImoNo;
		  				
		   	       		certDetails.certificateDtl.grt = certDetails.orgCertGrt;
		   	       		
		   	       		certDetails.certificateDtl.portOfRegistry =  certDetails.orgPor;
		   	       		
		   	       		certDetails.certificateDtl.vesselId = certDetails.orgVesselId ;
		   	       		
		   	       		certDetails.certificateDtl.condEcGrant = parseInt(certDetails.orgCertCondEcGrant);
				  
    		}
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
    			certDetails.certificateDtl.extendedIssueDate = previous_cert_data.extendedIssueDate ? previous_cert_data.extendedIssueDate : '';
				certDetails.certificateDtl.extendedExpireDate = previous_cert_data.extendedExpireDate ? previous_cert_data.extendedExpireDate : '';
    		}

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM){
    			certDetails.onchangeReissueName = 'Issue Date';
    			certDetails.onchangeReissueExpireName = 'Extended Expiry Date';
    			certDetails.certificateDtl.extendedEndorsedDate = moment(new Date(), 'YYYYMMDD').format('DD-MMM-YYYY');
    			
    		

    			reIssueOfCertificate();
    			   
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    		
    			certDetails.onchangeReissueName = 'Issue Date';
    			certDetails.onchangeReissueExpireName = 'Expiration Date';
    			reIssueOfCertificate();
    		}
    		else{
    			certDetails.certificateDtl.extendedEndorsedDate = '';
    		}

    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    			certDetails.onchangeReissueName = 'Reissue Certificate Date';
    			certDetails.onchangeReissueExpireName = 'Expiration Date';
    			
    			reIssueOfCertificate();
    			
    		}
    		
    		validateIssueExpiryDate();
    		if(!certDetails.disableReissueFields && certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
    		certDetails.IhmFieldsDisable  =  false;
    		certDetails.checkNxtAuditCreate = false;
    		certDetails.IhmDisable = false;
    		}
    		else{
    			certDetails.IhmFieldsDisable  =  false;
    		}
    		
    		certDetails.disableReissueFields = false;
    		
    		
    		certDetails.certificateDtl.nameToPrint='1';
			
			certDetails.certificateDtl.signToPrint='1';
			
			certDetails.certificateDtl.ihmPrevReview='0';
    		}
    		certDetails.IHMCertIssueFlag = false;
    		certDetails.isAmendCreated = false;
    		certDetails.onChangeCaller = false ;
    		
    		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    			certDetails.disableEcField = true;
    		}
    		else{
    			certDetails.disableEcField = false;
    		}
    		//getUserDet(sessionStorage.getItem('emailId'),certDetails.certificateDtl.companyId); //Commented  by sudharsan for Jira-ID=IRI-5593
    	}

    	function getPrevioiusCertDtlsForRenewal(){

  
   
    		var checkFulltermPresent = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_IHM ,'publishStatus' : 1}).pluck("certIssueId").toString() ? true : 
    			(certDetails.orgCertificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM && certDetails.orgCertificateDtl.publishStatus ==1 && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID ? true : false);
    		    		
    		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && certDetails.leadStatus && !checkFulltermPresent && certDetails.renewalfulltermPublish){

    			if((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) <= 0 || ((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) == 1 && (certDetails.orgCertificateDtl.certificateDetail[0] ? certDetails.orgCertificateDtl.certificateDetail[0].certIssueId : 0) == certDetails.AppConstant.FULL_TERM_IHM)){

    				if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && (certDetails.certificateDtl.checkRenEndrosAftFullTerm ? certDetails.certificateDtl.checkRenEndrosAftFullTerm : 0) == 0){
    				
    					certDetails.certificateDtl.utn = certDetails.getPreviousAuditCerData.certificateDetail[0].utn;
    					certDetails.certificateDtl.certificateNo = certDetails.getPreviousAuditCerData.certificateDetail[0].certificateNo;
    					
    					certDetails.certificateDtl.extendedExpireDate =	certDetails.renewalExtendedExpiryDate ? certDetails.renewalExtendedExpiryDate : (certDetails.certificateDtl.extendedExpireDate ? certDetails.certificateDtl.extendedExpireDate : (certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate ? moment(certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY)));
    					certDetails.certificateDtl.extendedIssueDate = certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate ? moment(certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certIssueDate,YYYYMMDD).format(MMMDDYYYY);
    					certDetails.minExtnCertExpireDate = certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate ? certDetails.getPreviousAuditCerData.certificateDetail[0].extendedIssueDate : certDetails.getPreviousAuditCerData.certificateDetail[0].certIssueDate;
    					certDetails.maxExtnCertExpireDate =  moment(moment((certDetails.renewalExtendedExpiryDate ? certDetails.renewalExtendedExpiryDate : (certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate ? moment(certDetails.getPreviousAuditCerData.certificateDetail[0].extendedExpireDate,YYYYMMDD).format(MMMDDYYYY) : moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY))), MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    					/*here serverSide Concatinating QID and save with certificate data*/
    					certDetails.certificateDtl.qrCodeUrl = CERTI_URL;
    					certDetails.certificateDtl.endorsedDate = certDetails.certificateDtl.endorsedDate ? certDetails.certificateDtl.endorsedDate : certDetails.certificateDtl.auditDate;
    					
    					certDetails.certificateDtl.certIssueDate = moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certIssueDate,YYYYMMDD).format(MMMDDYYYY);
    		    		certDetails.certificateDtl.certExpireDate = moment(certDetails.getPreviousAuditCerData.certificateDetail[0].certExpireDate,YYYYMMDD).format(MMMDDYYYY);    		    		
    				
    				}else if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM){
    				
    					renewalFulltermCertDtls();

    				}
    			}else{

    				if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM){
    					
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
    	
    	function setCertIssueExpiry(){
    	       
           	console.log(certDetails.orgCertificateDtl);
        		certDetails.getPreviousAuditCerData = angular.copy(auditFactory.getCertificateDetails()).previousAudit;
        		
            		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.REISSUE_IHM){
            		
            			if(certDetails.certificateDtl.closeMeetingDate){
            		if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
            		
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
               			
            		}
            		}
            		certDetails.certificateDtl.certReissueReason=1010;  //changed by sudharsan for JIRA IRI-5248 
            		//certDetails.setExtendedExpireDate();
        		
        		}
            	
    	
    	function renewalFulltermCertDtls(){
    	
    			
    		if(!certDetails.checkRenewalGenerate){
        		
        		console.log(certDetails.certificateDtl);
        		certDetails.certificateDtl.certIssueDate = certDetails.orgCertificateDtl.certificateDetail ? 
        				(_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_IHM ,'publishStatus' : 0}).pluck("certIssueId").toString() ? 
        						moment(_(certDetails.orgCertificateDtl.certificateDetail).chain().where({'certIssueId':certDetails.AppConstant.FULL_TERM_IHM ,'publishStatus' : 0}).pluck('certIssueDate').toString(),YYYYMMDD).format(MMMDDYYYY) 
        						: moment(moment(certDetails.certificateDtl.creditDate, MMMDDYYYY)).format(MMMDDYYYY)) : 
        							(certDetails.orgCertificateDtl.certIssueId == certDetails.AppConstant.FULL_TERM_IHM ?  certDetails.orgCertificateDtl.certIssueDate :
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
    				certDetails.certificateDtl.qrCodeUrl = CERTI_URL;
    				certDetails.certificateUtn = resUtn.utnString;
    				certDetails.certificateqrCodeUrl = CERTI_URL;
    				
    			});

    			certDetails.renewalFulltermcertFlag = false;

    		}else{

    			certDetails.certificateDtl.certificateNo = certDetails.certificateNum;
    			certDetails.certificateDtl.utn = certDetails.certificateUtn;
    			certDetails.certificateDtl.qrCodeUrl = certDetails.certificateqrCodeUrl;
    		}	

    	}
    	
    	function hkEcEuPrevDet(){
    				var previous_data = {};
    				var certOderNo = [];
    				var count = 0;
    				var temp = 0;
    				var certOderNoFilt;
    				var length = certDetails.AllIhmCertificateData.length;
    				certDetails.AllIhmCertificateData.forEach(function(a){
    							certOderNo[count]=a.certOderNo;
    							count++;
    				});	
    				for(var i=0; i<length; i++){
    					if( temp < parseInt(certOderNo[i]) ){
    						certOderNoFilt = certOderNo[i];
    					}
    					temp = certOderNo[i]    			
    				}
    				console.log(certOderNoFilt)
    				for(var i=0; i<length; i++){
    					if(certOderNoFilt == certDetails.AllIhmCertificateData[i].certOderNo){
    						if(certDetails.AllIhmCertificateData[i].auditSeqNo == 600001 ||certDetails.AllIhmCertificateData[i].auditSeqNo == 600002 || certDetails.AllIhmCertificateData[i].auditSeqNo == 600003 || certDetails.AllIhmCertificateData[i].auditSeqNo == 600004 ){
    							previous_data = null;
    						}else{
    							previous_data = certDetails.AllIhmCertificateData[i];
    						}
    						
    						console.log(previous_data)
    						if(certDetails.hkeuec && certDetails.certificateDtl.auditSubTypeId != 1002 && certDetails.certificateDtl.certIssueId != 1008){
    							certDetails.certificateDtl.regOwnedImoNo = previous_data.regOwnedImoNo == 0 ? '': certDetails.certificateDtl.regOwnedImoNo;
    							certDetails.certificateDtl.ihmDocumentNo = previous_data.ihmDocumentNo;
    							certDetails.certificateDtl.condEcGrant = previous_data.condEcGrant;
    							certDetails.certificateDtl.voyageEcGrant = ''+previous_data.voyageEcGrant+'';
    							certDetails.certificateDtl.ihmPrevReview = ''+previous_data.ihmPrevReview+'';
    							certDetails.certificateDtl.completionSurveyDate = previous_data.completionSurveyDate != null ? moment(previous_data.completionSurveyDate,YYYYMMDD).format(DDMMMYYYY): null;
    						}
    			}
    		}
    	}
    	
    	function validateIssueExpiryDate(){
    		/**** this is used to get the prevoius certificate *******/
    		var previous_cert_data = {};
    		if(certDetails.AllIhmCertificateData){
    			//certDetails.Stateflag = true;
    			var v = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'activeStatus':0,'publishStatus':1}).pluck('seqNo');
    			
    			var max = v.reduce(function(a, b) {
    			    return Math.max(a, b);
    			});
    			console.log(max._wrapped);
    			if(certDetails.AllIhmCertificateData[0]){
    				if(certDetails.AllIhmCertificateData[0].publishStatus == 1 && certDetails.AllIhmCertificateData[0].activeStatus == 1){
    					previous_cert_data = certDetails.AllIhmCertificateData[0];
    				}
    				else{
    	    			previous_cert_data = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':max._wrapped})._wrapped[0];
    	    		}
    			}
    			else{
        			previous_cert_data = certDetails.AllIhmCertificateData[1];
        		}
    		}
    		/***********END ***************/
    		
    	console.log("certDetails.certificateDtl  "+ certDetails.certificateDtl);
    	if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.publishStatus == 1)
    	{ 
    		certDetails.IhmFieldsDisable  =  true;  		
    	}
   		if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){

    			if(certDetails.Stateflag){					


    				if((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) > 1){

    					var seqLength = certDetails.orgCertificateDtl.certificateDetail.length;					
    					var extendedIssueDateArr = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('extendedIssueDate').toString();
    					var extendedExpiryDateArr = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('extendedExpireDate').toString();
    					var issueDateArr = _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('certIssueDate').toString();
    					var expiryDateArr =  _(certDetails.orgCertificateDtl.certificateDetail).chain().where({'seqNo':seqLength}).pluck('certExpireDate').toString();

    					certDetails.validateIssueDate = extendedIssueDateArr && extendedIssueDateArr != '' ? moment(extendedIssueDateArr, YYYYMMDD).format(MMMDDYYYY) : moment(issueDateArr, YYYYMMDD).format(MMMDDYYYY);
    					certDetails.validateExpiryDate = extendedExpiryDateArr && extendedExpiryDateArr != '' ? moment(extendedExpiryDateArr, YYYYMMDD).format(MMMDDYYYY): moment(expiryDateArr, YYYYMMDD).format(MMMDDYYYY) ;
    				
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
    		if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
    			certDetails.disableExpire = true;
    		}

    		else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
    			certDetails.disableExpire = false;
    		
   				    var extendedExpireDate = previous_cert_data.extendedExpireDate || previous_cert_data.extendedExpireDate != undefined ? moment(previous_cert_data.extendedExpireDate).format(MMMDDYYYY) : (previous_cert_data.certExpireDate || previous_cert_data.certExpireDate != undefined ? moment(previous_cert_data.certExpireDate).format(MMMDDYYYY) : certDetails.certificateDtl.extendedExpireDate);
   				    certDetails.maxExtnCertExpireDate = moment(moment(extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
   				    certDetails.maxCertExpireDate = moment(moment(extendedExpireDate, MMMDDYYYY).add(5,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
   				    
				    
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    	
    				 var extendedExpireDate = previous_cert_data.extendedExpireDate || previous_cert_data.extendedExpireDate != undefined ? moment(previous_cert_data.extendedExpireDate).format(MMMDDYYYY) : (previous_cert_data.certExpireDate || previous_cert_data.certExpireDate != undefined ? moment(previous_cert_data.certExpireDate).format(MMMDDYYYY) : certDetails.certificateDtl.extendedExpireDate);
    	    		    certDetails.maxExtnCertExpireDate = moment(moment(extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    	    			certDetails.maxCertExpireDate = moment(moment(extendedExpireDate, MMMDDYYYY).add(3,'months'),DDMMYYYY).subtract(1,'days').format(YYYYMMDD);
    			 
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    			
    			    				certDetails.setExtendedExpireDate();
    			
    		}else if(certDetails.certificateDtl.certIssueId !=  certDetails.AppConstant.EXTENSION_IHM){
    				
    			certDetails.certificateDtl.extendedEndorsedDate = '';
    		}

    		if((certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) && certDetails.certificateDtl.publishStatus==1){

    				certDetails.setExtendedExpireDate();
    			
    		}else if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.EXTENSION_IHM){
    				certDetails.maxExtnCertExpireDate = "";
    				certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
    			
    		}
    		if(!certDetails.navigationScreen){
    			certDetails.checkCertDesc = certDetails.orgCertificateDtl.certIssueId;
    		}
    		    		
    		if(((certDetails.orgCertificateDtl.certificateDetail ? certDetails.orgCertificateDtl.certificateDetail.length : 0) == 0) && certDetails.orgCertificateDtl.auditSubTypeId == certDetails.AppConstant.RENEWAL_SUB_TYPE_ID && certDetails.orgCertificateDtl.certIssueId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && certDetails.certificateDtl.publishStatus == undefined){
			
			
    			certDetails.checkCertDesc = certDetails.certificateDtl.certIssueId;	
    			
			}
    		
    		if(certDetails.leadStatus){
    		
    			getPrevioiusCertDtlsForRenewal();
    		}
    		
    	}
    	
    	
    	function reIssueOfCertificate(){

    		if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID){
    			certDetails.userLoggedName = 'Admin Name';
    			certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    			certDetails.certificateDtl.issuerSign = '';
    		}else if(certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
    			certDetails.userLoggedName = 'Manager Name';
    			certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    			certDetails.certificateDtl.issuerSign = '';
    		}else{
    			if(certDetails.certificateDtl.auditTypeId!=certDetails.AppConstant.MLC_TYPE_ID){
    				certDetails.userLoggedName = 'Auditor Name';
    			}else{certDetails.userLoggedName = 'Inspector Name';}
    			//certDetails.certificateDtl.issuerName = certDtlRequiredData.getCurrentUserFullName.userName;
    		}

    		certDetails.certificateDtl.nameToPrint = '';
    		certDetails.certificateDtl.signToPrint = '';
    		certDetails.certificateDtl.issuerSignDate = '';
    		certDetails.certificateDtl.issuerSign = '';
    		certDetails.certificateDtl.certReissueReason=1010;  //changed by sudharsan for JIRA IRI-5248 
    	}
    	
    	function getUserDet(emailId,companyId){
    		
    		masterFactory.getCurrentUserDetail(emailId,companyId).$promise.then(function(res){console.log(res);
    		certDetails.tempPlace = res[0].location;
    		certDetails.tempIssuerName = res[0].firstName + " " + res[0].lastName;
    		 certDetails.certificateDtl.auditPlace = res[0].location;
    		certDetails.certificateDtl.issuerName = res[0].firstName + " " + res[0].lastName;
    		});
    		
    	}
    	function auditDisable(){
    		var v = !certDetails.withOutAdt && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM || certDetails.disableAll || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM ||
					  !certDetails.certificateDtl.auditSubTypeId ||
					   certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || certDetails.certificateDtl.auditSummaryId  == certDetails.AppConstant.NOT_APPROVED_SUMMARY || certDetails.releaseLock
					   || (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN))
					   return v;
    	}
    	
    	
    	function onChangeEndroseDate(){
    		if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID &&
    				certDetails.certificateDtl.endorsedDate && (certDetails.certificateDtl.endorsedDate.toUpperCase() == (moment(certDetails.certificateDtl.endorsedDate,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() || certDetails.certificateDtl.endorsedDate.toUpperCase() == (moment(certDetails.certificateDtl.endorsedDate,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() )){
    		var maxDate = new Date(certDetails.maxEndorseDate);
    		var minDate = new Date(certDetails.minEndorseDate);
    		var endroseDate = new Date(moment(certDetails.certificateDtl.endorsedDate,MMMDDYYYY).format(YYYYMMDD));
    		console.log("endrosed date details "+endroseDate.getTime() +" " + minDate.getTime() +" "+ maxDate.getTime());
    		if (!(endroseDate.getTime() >= minDate.getTime() && endroseDate.getTime() <= maxDate.getTime())){
    			certDetails.certificateDtl.endorsedDate = $window.sessionStorage.getItem('certEndrosedDateIHM');
    			toaster.warning('Endorsed Date should be within Issue Date  and Expiry date');
    			}
    		}
    	}
    	function enableRenewalCertTypeVthSearchScreen(){
    
    		if(certDetails.orgCertificateDtl.getRenewalCertVal == 1){
				
				if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
					
					if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID){
						certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
					}else{
						certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM, certDetails.AppConstant.EXTENSION_IHM];
					}
					
				}else{
					certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
				}
			}else {
				if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
					if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
						certDetails.enableCertType = [certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM];
					}
				}else{
					certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM];
				}
				if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID && certDetails.certificateDetail.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
					certDetails.enableCertType==[];
				}
			}
    		
    		
    		
    	}

    	function enableRenewalCertTypesVthAuditScreen(){

    		if(certDetails.orgCertificateDtl.certificateDetail){
    			if(certDetails.orgCertificateDtl.certificateDetail.length > 0){

    				for(var i=0; i<certDetails.orgCertificateDtl.certificateDetail.length;i++){

    					if(certDetails.orgCertificateDtl.certificateDetail[i].certIssueId == certDetails.AppConstant.FULL_TERM_IHM && certDetails.orgCertificateDtl.certificateDetail[i].publishStatus == 1){
    						
    						if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
    						
    							if(certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.MLC_TYPE_ID){
    								certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
    							}else{
    								
    								certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM, certDetails.AppConstant.EXTENSION_IHM];
    							}
    							
    						}else{
    							certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
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
    			
    			if(certDetails.userRoleId == certDetails.AppConstant.ADMIN_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID){
    				
    				if(certDetails.certificateDtl.auditTypeId != certDetails.AppConstant.MLC_TYPE_ID){
						
    					certDetails.enableCertType = [certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM];
					}else{
						certDetails.enableCertType = [];
					}
    			}else{
    				certDetails.enableCertType = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM];
    			}
    		}
    		
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
    		
    		else if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.IHM_TYPE_ID){
    			
    			finalAdminRenewalVal = AdminRenewalvalue.replace(AdminRenewalvalue, ' RENEWAL ENDORSED (11.7 applies)');
    			finalAuditorRenewalVal= AuditorRenewalvalue.replace(AuditorRenewalvalue, 'RENEWAL ENDORSED (11.8 or 11.9 applies)');
    		}

    		certDetails.certificateIssuedOptions.find(function(res) { return res.issueReasonId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM; }).issueReasonDesc = finalAdminRenewalVal;
    		certDetails.certificateIssuedOptions.find(function(res) { return res.issueReasonId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM; }).issueReasonDesc = finalAuditorRenewalVal;


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
  			case 'keelLaidDate':
  				toastMsg = 'KeelLaidDate';
  				break;
  			case 'completionSurveyDate':
  				toastMsg = 'CompletionSurveyDate';
  				break;
  			case 'signDate':
  				toastMsg = 'signDate';
  				break;
  			case 'auditdate':
  				toastMsg = 'auditdate';
  				break;
  			}
  			
  			if(val && (val.toUpperCase() == (moment(val,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() || val.toUpperCase() == (moment(val,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() )){
  			
  					
  					
  					if(id == 'issuedate' || id == 'exteIssueDate' || id == 'exteExpiryDate' || id == 'expirydate'||id=='endorseDate' || id == 'keelLaidDate' || id == 'completionSurveyDate' || id == 'signDate' || id == 'auditdate'){
  						
  						return moment(val,MMMDDYYYY).format(MMMDDYYYY);
  					}else{
  						return moment(val,MMMDDYYYY).format(MMMDDYYYY);
  					}	 				
  				 				
  				}else if(val=='N.A.' && (id == 'issuedate' || id == 'exteIssueDate' || id=='exteExpiryDate' || id=='endorseDate' || id == 'keelLaidDate' || id == 'completionSurveyDate' || id == 'signDate' || id == 'auditdate')){}
  				
  				else if(val){
  					 				 				
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
    	 
    	 
    	 function completionSurveyPopup(){
    		// console.log(moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).format(YYYYMMDD));
    		
    		 ModalService.showModal({
      			
      			templateUrl : 'src/modals/completionSurveyDate.html',
      			
      			controller  : 'completionSurveyDatePopUpController as completionDatePopUp',
      			
      			inputs		: {data:'Do you want to change the Completion Survey Date.',
      				
      						   scope     :certDetails	
      			}
      			
      			 
    		 
      		}).then(function(modal) {
      			
      			modal.element.modal();
      			
  	            modal.close.then(function(result) {
  	            	
  	           });
  	            
      		});
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
        			
        			/*if(certDetails.loginUserId && certDetails.certificateDtl.vesselImoNo && certDetails.certificateDtl.vesselId && certDetails.companyId){
        			detailsFactory.vesselDtlIncomplete(certDetails.loginUserId, certDetails.certificateDtl.vesselImoNo , certDetails.certificateDtl.vesselId,certDetails.companyId,vData).$promise.then(function(res) {
        				console.log(res);
        				if(res.partialData.length>0 && res.partialData){ 
        				certDetails.dueDateAlreadyCaptured = 	res.partialData[0].dueDate ? true : false;
        				
        				}
        			

        				toaster.warning('Partial Vessel Details, please provide a Due Date');
        				
        				certDetails.reasonForVoidReopen('halt');
        			});
        			}*/
      			
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
    	 
    	  certDetails.yatchImoNoCheckPartilData = function(data){
    		  var flag= false;
    		  console.log(data);
    		  if(!data.vesselID || !data.vesselName || !data.officialNumber || !data.grossTon || !data.companyIMONumber || !data.tcApprovalStatus || !data.homePort ||  !data.registrationDate || !data.vesselStatus || !data.classSociety || !data.companyIMONumber || !data.companyStatus || !data.docTypeNumber || !data.issueDate || !data.docExpiry || !data.docType || !data.customerName || !data.companyAddress || !data.docIssuer){
        			flag = true; 	   //!data.activeStatus 
        		}    		
      		if(flag){
      			
      			var vData = {
    					'companyId':certDetails.companyId,
    					'userId':certDetails.loginUserId,
    					'vesselName':data.vesselName ? data.vesselName:'',
    					'vesselId':data.vesselID ? data.vesselID :'',
    					'status':0};
        			
        			
        			certDetails.vesselDetail.vesselImoNo = certDetails.certificateDtl.vesselImoNo;
        			certDetails.vesselDetail.vesselId =  certDetails.certificateDtl.vesselId;

      			
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
      		if(data.vesselStatus=='Pending'){
      			toaster.warning(data.vesselName+' vessel is Inactive.');
      			flag= true;
      		return flag;
      		 }else{
      			return flag;	
      		 }
      	
    	  }
    	 
    	 
certDetails.checkCertVal = function(certValue,certIssueId){
	  certDetails.checkPublish=false;
	  console.log(certIssueId +"  typ id");
	  console.log("certDetails.AllIhmCertificateData  "+JSON.stringify(certDetails.AllIhmCertificateData));
	  var checkFulltermPresent='';
	 // certDetails.certificateDtl.grt = certDetails.certificateDtl.publishStatus == 1 ? certDetails.auditDtlsGrt : certDetails.certificateDtl.grt;
	  certDetails.certificateDtl.dateOfRegistry = certDetails.certificateDtl.publishStatus == 1 ? certDetails.auditDtlsdateOfRegistry : certDetails.certificateDtl.dateOfRegistry;
	//  certDetails.certificateDtl.auditPlace = certDetails.certificateDtl.publishStatus == 1 ?  certDetails.auditDtlsissedPlace : certDetails.certificateDtl.auditPlace;
	  certDetails.certificateDtl.auditDate = (certDetails.certificateDtl.publishStatus == 1 && certDetails.certificateDtl.certIssueId== certDetails.AppConstant.EXTENSION_IHM) ? certDetails.certificateDtl.auditDate: certDetails.auditDtlsAuditDate ;
	  
	  if(certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.IHM_TYPE_ID && certIssueId  == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ){
		  certDetails.IhmFieldsDisable  =  false; 
	  }
	  if(certValue==1009 && certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.publishStatus == 1){
		  certDetails.certificateDtl.issuerSign = '';
		  certDetails.certificateDtl.certIssueId=certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM;
		  certDetails.certificateDtl.issuerSignDate = '';
		  certDetails.certificateDtl.certReissueReason=1010;  //changed by sudharsan for JIRA IRI-5248 
		  certDetails.disableGenerate = false;
		 
	  }else if(certValue==1004 && certDetails.certificateDtl.certIssueId== certDetails.AppConstant.EXTENSION_IHM && certDetails.certificateDtl.publishStatus == 1  && !certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID){
		  certDetails.certificateDtl.issuerSign = '';
		  certDetails.certificateDtl.certIssueId= certDetails.AppConstant.EXTENSION_IHM;
		  certDetails.certificateDtl.issuerSignDate = '';
		  certDetails.disableGenerate = false;
	  }
    		  
  if(certIssueId==certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
	  
	  certDetails.certificateDtl.nameToPrint='1';
	  certDetails.certificateDtl.signToPrint='1';
	  certDetails.certificateDtl.certReissueReason=1010;  //changed by sudharsan for JIRA IRI-5248 
	  certDetails.certificateDtl.auditPlace = certDetails.tempPlace ? certDetails.tempPlace : certDetails.certificateDtl.auditPlace ;
		
	  certDetails.certificateDtl.issuerName = certDetails.tempIssuerName ? certDetails.tempIssuerName : certDetails.certificateDtl.issuerName  ;
		  //If it is IHM appending extendedIssueDate
//	  getUserDet(sessionStorage.getItem('emailId'),certDetails.certificateDtl.companyId);
	  if(certDetails.dynamicMsg && certDetails.dynamicMsg != ''){
		  console.log(certDetails.latestVesselDetail)
 			console.log(certDetails.enableCertType);
		  
		  		//setVesselHistory(certDetails);
	       		certDetails.certificateDtl.vesselCompanyAddress = certDetails.latestVesselDetail[0].registeredCompanyAddress;
				
		  	certDetails.certificateDtl.vesselCompanyName = certDetails.latestVesselDetail[0].registeredCompanyName;
		  
	       		certDetails.certificateDtl.keelLaidDate = certDetails.latestVesselDetail[0].keelLaidDate ? moment(certDetails.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY'): "" ;
				
   	    	certDetails.certificateDtl.regOwnedImoNo = certDetails.latestVesselDetail[0].regOwnedImoNo;
  			
   	       	certDetails.certificateDtl.vesselName = certDetails.latestVesselDetail[0].vesselName;
  				
	       		certDetails.certificateDtl.dateOfRegistry = certDetails.latestVesselDetail && certDetails.latestVesselDetail.length > 0  && certDetails.latestVesselDetail[0].registrationDate&& certDetails.latestVesselDetail[0].registrationDate != null &&  certDetails.latestVesselDetail[0].registrationDate != '' ? moment(certDetails.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '';
	       		
	       		certDetails.certificateDtl.vesselType = 	certDetails.latestVesselDetail[0].vesselType;
	       		
	       		certDetails.certificateDtl.companyImoNo = certDetails.latestVesselDetail[0].companyIMONumber;
				
	       		certDetails.certificateDtl.grt = certDetails.latestVesselDetail[0].grossTon;
	       		
	       		certDetails.certificateDtl.portOfRegistry = certDetails.latestVesselDetail[0].homePort;
	       		
	       		certDetails.certificateDtl.vesselId = certDetails.latestVesselDetail[0].vesselID;
	  }
	  
	 if( certDetails.certificateDtl.auditTypeId==certDetails.AppConstant.IHM_TYPE_ID ){
		  if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
			  
			  if(certDetails.auditDetailIhm){
				  
				  certDetails.certificateDtl.extendedIssueDate = certDetails.auditDetailIhm.auditDate ? moment(certDetails.auditDetailIhm.auditDate, YYYYMMDD).format(MMMDDYYYY)  : moment(certDetails.auditDetailIhm.certIssueDate, YYYYMMDD).format(MMMDDYYYY) ;
   				  certDetails.certificateDtl.extendedExpireDate = moment(certDetails.certificateDtl.extendedIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
			  }else if(certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
				  certDetails.certificateDtl.completionSurveyDate = certDetails.certificateDtl.completionSurveyDate && certDetails.certificateDtl.completionSurveyDate != null ? certDetails.certificateDtl.completionSurveyDate: certDetails.certificateDtl.certIssueDate;
				  certDetails.certificateDtl.extendedIssueDate =  moment(new Date()).format(DDMMMYYYY);// certDetails.orgCertificateDtl.certIssueDate ? moment(certDetails.orgCertificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY)  : '' ;
   				  certDetails.certificateDtl.extendedExpireDate = moment(certDetails.certificateDtl.completionSurveyDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
   				 
  				certDetails.minExtnCertIssueDate = '';
  				certDetails.maxExtnCertIssueDate ='';
   				certDetails.minExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).format(YYYYMMDD);
   				certDetails.maxExtnCertExpireDate = moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).add(5,'years').subtract(1,'days').format(YYYYMMDD)
			  }
				
			  
		  }else if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
			  
			  if(certDetails.AllIhmAuditDetails.length > 0){
				  certDetails.certificateDtl.completionSurveyDate = certDetails.AllIhmAuditDetails ? moment(_(certDetails.AllIhmAuditDetails).chain().where({'auditSeqNo':certDetails.certificateDtl.auditSeqNo}).pluck("additionalSurvey").toString()).format(MMMDDYYYY) : certDetails.certificateDtl.completionSurveyDate;
			  }
			  certDetails.certificateDtl.extendedIssueDate = moment(new Date()).format(DDMMMYYYY);//certDetails.certificateDtl.auditDate ? moment(certDetails.certificateDtl.auditDate).format(MMMDDYYYY)  : moment(certDetails.certificateDtl.certIssueDate).format(MMMDDYYYY) ;
			//  certDetails.certificateDtl.completionSurveyDate =certDetails.certificateDtl.certIssueDate;
			  certDetails.certificateDtl.extendedExpireDate =  moment(certDetails.certificateDtl.completionSurveyDate, MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);//moment(certDetails.certificateDtl.extendedIssueDate).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
			  certDetails.maxCompletionSurveyDate = moment(new Date()).format(DDMMMYYYY);//certDetails.certificateDtl.completionSurveyDate;
		  }
	  }
		  
  }
  if(certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
		certDetails.disableEcField = true;
	}
	else{
		certDetails.disableEcField = false;
	}
	if(certDetails.certificateDtl.auditSeqNo == certDetails.AppConstant.IHM_NO_AUD_CERT_AUDITSEQ){
		certDetails.withOutAdt	   = false;
	}

 }//END checkCertVal
    	 
    	  function checkOrgCertDtlVal(certCurrVal,certOrgVal){
    			
    		  certDetails.orgNameToPrint = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("nameToPrint").toString() : certOrgVal.nameToPrint;
    		  certDetails.orgSignToPrint = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("signToPrint").toString() : certOrgVal.signToPrint;
    		  certDetails.orgAuditDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("auditDate").toString() : certOrgVal.auditDate;
    		  certDetails.orgSignatureDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("issuerSignDate").toString() : certOrgVal.issuerSignDate;
    		  certDetails.orgCertIssueDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("certIssueDate").toString() : certOrgVal.certIssueDate;
    		  certDetails.orgCertExpiryDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("certExpireDate").toString() : certOrgVal.certExpireDate;
    		  certDetails.orgCertExtIssueDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("extendedIssueDate").toString() : certOrgVal.extendedIssueDate;
    		  certDetails.orgCertExtExpiryDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("extendedExpireDate").toString() : certOrgVal.extendedExpireDate;
    		  certDetails.orgCertEndrosedDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("endorsedDate").toString() : certOrgVal.endorsedDate;
    		  certDetails.orgCertExtEndrosedDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("extendedEndorsedDate").toString() : (certOrgVal.extendedEndorsedDate ? certOrgVal.extendedEndorsedDate : '');
    		  certDetails.orgCertGrt = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("grt").toString() : certOrgVal.grt;
    		  certDetails.orgCertDor = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("dateOfRegistry").toString() : certOrgVal.dateOfRegistry;
    		  certDetails.orgCertIhmDocumentNo = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("ihmDocumentNo").toString() : certOrgVal.ihmDocumentNo;
    		  certDetails.orgCertCondEcGrant = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("condEcGrant").toString() : certOrgVal.condEcGrant;
    		  certDetails.orgCertVoyageEcGrant = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("voyageEcGrant").toString() : certOrgVal.voyageEcGrant;
    		  certDetails.orgCertCompletionSurveyDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("completionSurveyDate").toString() : certOrgVal.completionSurveyDate;
    		  certDetails.orgCertKeelLaidDate = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("keelLaidDate").toString() : certOrgVal.keelLaidDate;
    		  certDetails.orgRenewalRegulation = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("renewalRegulation").toString() : certOrgVal.renewalRegulation;
    		  certDetails.orgRegCompanyAddress = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselCompanyAddress").toString() : certOrgVal.vesselCompanyAddress;
    			
    		  certDetails.orgRegCompanyName = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselCompanyName").toString() : certOrgVal.vesselCompanyName;
    			
    		  certDetails.orgRegOwnedImoNo = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("regOwnedImoNo").toString() : certOrgVal.regOwnedImoNo;
    			
    		  certDetails.orgVesselName = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselName").toString() : certOrgVal.vesselName;
    			
    		  certDetails.orgPor = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("portOfRegistry").toString() : certOrgVal.portOfRegistry;
    			
    		  certDetails.orgVesselType = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselType").toString() : certOrgVal.vesselType;
    			
    			certDetails.orgCompanyImoNo = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("companyImoNo").toString() : certOrgVal.companyImoNo;
    			certDetails.orgVesselId = certOrgVal.certificateDetail ? _(certOrgVal.certificateDetail).chain().where({'seqNo':certCurrVal.seqNo ,'publishStatus' : certCurrVal.publishStatus,'auditSeqNo':certCurrVal.auditSeqNo}).pluck("vesselId").toString() : certOrgVal.vesselId;
    			
    	  }
    	  
    	  function attachmentDisable(){
    		  var v = certDetails.disableAll || !certDetails.certificateDtl.certIssueId || certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || certDetails.certificateDtl.auditSummaryId == certDetails.AppConstant.NOT_APPROVED_SUMMARY || certDetails.releaseLock || certDetails.IhmFieldsDisable ;
    		  return v;
    		  
    	  }
    	  
    	  
	    	 function IhmOptions(certIssuedId){
	    		 var description = '';
	 
	    		 if(certIssuedId == certDetails.AppConstant.FULL_TERM_IHM){
	    			 description = "FULL TERM";
	    		 }else  if(certIssuedId == certDetails.AppConstant.EXTENSION_IHM){
	    			 description = "EXTENSION";
	    		 }
	    	 else  if(certIssuedId == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
				 description = "RENEWAL ENDORSED(11.7 applies)";
			 }
	    	else  if(certIssuedId == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
			 description = "RENEWAL ENDORSED(11.8 or 11.9 applies)";
	    	}
			else  if(certIssuedId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
		 description = "RE-ISSUE/ADMINISTRATIVE";
			}else if (certIssuedId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
				description = "ADDITIONAL ENDORSED";
			}
	 
	    		 return description;
	    	 } 
    	 

     	function auditDisable(){
     		var v = !certDetails.withOutAdt && (certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.INTERIM_CERT || certDetails.certificateDtl.certIssueId ==  certDetails.AppConstant.FULL_TERM_IHM || certDetails.disableAll || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.INTERMEDAITE_ENDORSED || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM || (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM && !certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) || certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM ||
 					  !certDetails.certificateDtl.auditSubTypeId ||
 					   certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || certDetails.certificateDtl.auditSummaryId  == certDetails.AppConstant.NOT_APPROVED_SUMMARY || certDetails.releaseLock
 					   || (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN))
 					   return v;
     	}
     	
     	function auditPlaceDisable(){
     		var v = (certDetails.withAdt && certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM &&  certDetails.certificateDtl.certIssueId != certDetails.AppConstant.EXTENSION_IHM && (certDetails.certificateDtl.certIssueId==certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM && !certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID))
     		        || certDetails.disableAll || !certDetails.certificateDtl.certIssueId || certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || certDetails.certificateDtl.auditSummaryId == certDetails.AppConstant.NOT_APPROVED_SUMMARY || certDetails.releaseLock || certDetails.ihmAutoDishPlace || !certDetails.certificateDtl.publishStatus || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID;
     		return v;
     	}
    	  function checkMinandMaxRenewalDates(auditDate,expDate2,nextrenewalStartDate){
    		  console.log(certDetails.certificateDtl);

    		  var issueDate = '';

    		  if(auditDate < nextrenewalStartDate){
    			 
    			  issueDate = moment(certDetails.certificateDtl.certIssueDate, MMMDDYYYY).format(MMMDDYYYY);
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

    	  }
    	  
    	  function checkMinandMaxRenewalDatesReissue(auditDate,expDate2,nextrenewalStartDate){

    		  var issueDate = '';

    		  if(auditDate < nextrenewalStartDate){
    			  issueDate = moment(moment(certDetails.certificateDtl.auditDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
    		//	     certDetails.minExtnCertIssueDate=moment(certDetails.certificateDtl.auditDate,MMMDDYYYY).format(YYYYMMDD);
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
    	  

     	 

     	certDetails.setYatchVesselData = function(vesselAndCompanyData){
     		var data = vesselAndCompanyData;
     		console.log(data);
     		certDetails.certificateDtl = angular.copy(data);
     		certDetails.certificateDtl.vesselCompanyName = data.customerName ? data.customerName :'';
     		certDetails.certificateDtl.vesselCompanyAddress = data.companyAddress ?  data.companyAddress :'';
     		certDetails.certificateDtl.dateOfRegistry =data.dateOfRegistry ? moment(data.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
     		certDetails.certificateDtl.docTypeNo =  data.docType ? data.docType :'' 
     		certDetails.certificateDtl.docIssuer =  data.getDocIssuer ?   data.getDocIssuer : certDetails.certificateDtl.docIssuer;
     		certDetails.certificateDtl.docExpiry =  data.getDocExpiry ?   data.getDocExpiry : certDetails.certificateDtl.docExpiry;
     		certDetails.imolabelVal    = 'vesselImoNo';
     		certDetails.certificateDtl.issuerName = (sessionStorage.getItem('usrname')).toString();
     	
    	}
     	
     	
     	/**************************** START - Enable Disable Conditions   ***************************/
     	
     	function generateDisableIhm(){
			 var res =  (!certDetails.validateFlagForIssueExpDate && 
						 certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS && certDetails.releaseLock && certDetails.certificateDtl.publishStatus==0) ||
						 certDetails.IhmFieldsDisable || certDetails.disableAll || certDetails.releaseLock
						 || (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM )
						 ;
			 
			 return res;
		 }
     	
     	function publishDisableIhm(){
     		var condition = (certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN)
				     		|| certDetails.disableAll || certDetails.disableCertIssueTypeId || 
							 certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || 
							 certDetails.certificateDtl.auditSummaryId == certDetails.AppConstant.NOT_APPROVED_SUMMARY || 
							 certDetails.releaseLock
							 
							 || ( certDetails.certificateDtl.auditStatusId != certDetails.AppConstant.VOID_AUDIT_STATUS 
								 && certDetails.releaseLock && certDetails.certificateDtl.publishStatus==0) 
									 
							 ||  certDetails.IhmFieldsDisable 
							 || (certDetails.certificateDtl.auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
     		
     		return condition;
    			 
     	}
     	
     	
     	function endroseDateDisable(){
     		var condition = ((certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN) || certDetails.disableAll || !certDetails.certificateDtl.certIssueId || 
     						certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || 
     						certDetails.certificateDtl.auditSummaryId  == certDetails.AppConstant.NOT_APPROVED_SUMMARY ||
     						certDetails.releaseLock) || certDetails.IhmFieldsDisable
     						|| (certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID
     								&& certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM)
     						;
     		 
     		return condition;
     	}
     	
     	function disableExpireDate(){
     		var condition = ((certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.REOPEN) || certDetails.disableAll || !certDetails.certificateDtl.certIssueId || 
						certDetails.certificateDtl.auditStatusId == certDetails.AppConstant.VOID_AUDIT_STATUS || 
						certDetails.certificateDtl.auditSummaryId  == certDetails.AppConstant.NOT_APPROVED_SUMMARY ||
						certDetails.releaseLock) || certDetails.IhmFieldsDisable
						;
		 
		return condition;
     	}
     	/**************************** END - Enable Disable Conditions   ***************************/
     	
     	
     	
     	/*********************************Start - Option Disable IHM***********************************************************/
     	
     	 function disableOptionsIhm(data){
     		 if( ((data.certificateDetail[0].auditTypeId == certDetails.AppConstant.IHM_TYPE_ID && data.certificateDetail[0].certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) || (data.certificateDetail[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && data.leadSign))){	
     				
     			 auditFactory.getAllIhmAuditDetail(data.auditTypeId,data.vesselImoNo,data.companyId).$promise.then(function(res){
     				 console.log("resss "+ JSON.stringify(res));
     				certDetails.AllIhmAuditDetails = angular.copy(res);
     				
     				var socCertificates = certDetails.AllIhmAuditDetails[0].certificateDetail.filter(function(val) {
					    return (val.socType === 'hk' || val.socType === 'eu');
					});
     				
     				
     				 if(res.length > 1 && res[0].auditSubTypeId != 1001){
     				// certDetails.IHMCertIssueFlag = true;
     				certDetails.isAmendCreated = true;
     				 }
     				 if(res.length > 1 && res[0].auditSummaryId != 1005 && res[0].auditStatusId == 1001 && res[1].auditStatusId != 1004 && ( res[1].auditSummaryId != 1005 && !res[0].leadSign)){
     					 certDetails.disableAll = true;
     				 }
     				 else if(res.length > 1 && res[0].certificateDetail.length > 0 &&  socCertificates[0].activeStatus == 1 && ((socCertificates[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ||(socCertificates[0].certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM) )){
     					 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM, certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
     				 }
    				 
     				
     				 if((certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) && res[res.length -1 ].auditStatusId != certDetails.AppConstant.COMPLETED_AUDIT_STATUS ){
     					
     					certDetails.disableAll = true;
     					 
     				 }
     				 
     				 if(data.certificateDetail[0].activeStatus == 1 && data.certificateDetail[0].publishStatus == 0){
      					certDetails.IhmDisable = true;
       				 }
     				 else{
     					var certNo = data.certificateDetail.filter(function(val) {
    					    return val.socType != 'exe' ;
    					});
     					
     					 
     					 var certNo = certNo.length > 0 ? certNo[0].certificateNo:"";
     					 certDetails.CertTypeForIHM = data.certificateDetail.map(function(item){
     						 if(certNo == item.certificateNo){
     				 var desc = "";
     				 console.log("auditAndCertData.auditDetail.auditSubTypeId "+data.auditSubTypeId);
     				switch(data.auditSubTypeId){ 
     				case certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID:
     				 if(item.publishStatus == 1){
     					 if(item.certIssueId != 1008){
     					 desc = item.certIssueId;
     					 }
     					  }
     				 break;
     				}
     				 return desc;
     						 }
     				
     			 });
     					 }
     			 
     			
     				 
     			 
     			 if(data.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID)
     			 {
     				 if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
     				 if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.FULL_TERM_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.FULL_TERM_IHM);
     				 if( res.length > 1 && socCertificates.length > 1 && socCertificates[0].activeStatus == 1 && res[1].certificateDetail[1].auditStatusId != 1004){
     				//	 certDetails.CertTypeForIHM.push(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM);
     					 certDetails.certissued = certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM;
     					 certDetails.checkNxtAuditCreate = false;
     					if($state.params.certificate != 'Audit' && $state.params.certificate !=null){
     						certDetails.IHMCertIssueFlag =  true;
     					}
     					
     					 if(socCertificates[0].auditStatusId == 1002 && socCertificates.length > 1 && socCertificates[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
     						 certDetails.checkNxtAuditCreate = true;
     						 certDetails.disableReissueFields = true;
     			       		 certDetails.IhmFieldsDisable = true;
     					 }
     				 }
     			/*	 if( res.length > 1 && res[0].certificateDetail[0].activeStatus == 0 && res[0].certificateDetail[0].certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
     					 if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM);
     				 }*/
     				 if(res.length > 1 && socCertificates.length > 1 && ((socCertificates[0].activeStatus == 1 && socCertificates[0].publishStatus==0 ) || (socCertificates[0].activeStatus == 0 && socCertificates[0].publishStatus==1 ))&& certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)
     					 {
     					 certDetails.checkNxtAuditCreate = false;
     					 }
     				if((certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID || certDetails.userRoleId == certDetails.AppConstant.IHM_MANAGER_ROLE_ID) ){
     					certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM,certDetails.AppConstant.EXTENSION_IHM,certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM,certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM];
     				}
     			 }
     			 if(data.certificateDetail[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && !data.leadSign){
     				 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM, certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM];
     				     								 
     			 }
     			 });
     		 }
     	 }
     	 function disableOptionsIhm_new(data){
     		var aud_type_id = null;
     		var vessel_imo = null;
     		var comp_id = null;
     		 if(certDetails.type == "Search"){
     			 aud_type_id = certDetails.certificateDtl.auditTypeId;
     			 vessel_imo = certDetails.certificateDtl.vesselImoNo;
     			 comp_id = certDetails.certificateDtl.companyId;
     		 }
     		 else
     			 {
     			 aud_type_id = certDetails.auditTypeId;
     			 vessel_imo = certDetails.vesselImoNo;
     			 comp_id = certDetails.companyId;
     			 }
     		 
     		 auditFactory.getAllIhmAuditDetail(aud_type_id,vessel_imo,comp_id).$promise.then(function(res){
     			 console.log("resss "+ JSON.stringify(res));
     			certDetails.AllIhmAuditDetails = angular.copy(res);
     			
     			res[0].certificateDetail = res[0].certificateDetail.filter(function(val) {
				    return (val.socType != 'exe');
				});
     			
     			certDetails.AllIhmAuditDetails.certificateDetail = certDetails.AllIhmAuditDetails[0].certificateDetail.filter(function(val) {
				    return (val.socType != 'exe');
				})
				
     			if(res.length > 1 && res[0].auditSubTypeId != 1001){
   				 certDetails.IHMCertIssueFlag = true;
   				 certDetails.isAmendCreated = true;
   				 }
     			 if(res.length > 1 && res[0].auditStatusId == 1001 && !res[0].leadSign){
     				 certDetails.disableAll = true;
     			 }
     			 else if(res.length > 1 && res[0].certificateDetail.length > 0 &&  res[0].certificateDetail[0].activeStatus == 1 && ((res[0].certificateDetail[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ||(res[0].certificateDetail[0].certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM) )){
     				 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM, certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM,certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM];
     				 certDetails.disableAll = false;
     			 }
     			

     			 else{
     				 certDetails.CertTypeForIHM = data.map(function(item){
     					 if(certDetails.certificateDtl.certificateNo == item.certificateNo){
     			 var desc = "";
     			 console.log("auditAndCertData.auditDetail.auditSubTypeId "+data.auditSubTypeId);
     			switch(certDetails.certificateDtl.auditSubTypeId){ 
     			case certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID:
     			 if(item.publishStatus == 1){
     				 if(item.certIssueId != 1008){
     					 desc = item.certIssueId;
     					 }
     				  }
     			 break;
     			}
     			 return desc;
     					 }
     			
     		 });
     				 }
     		 
     		
     			 
     		 
     		 if(certDetails.certificateDtl.auditSubTypeId == certDetails.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID)
     		 {
     			if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
     			if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.FULL_TERM_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.FULL_TERM_IHM);
     			 if( res.length > 1 && res[0].certificateDetail[0].activeStatus == 1){
     				 if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM);
     				 certDetails.certissued = certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM;
     				 certDetails.checkNxtAuditCreate = false;
     				certDetails.AllIhmAuditDetails = angular.copy(res);
    				 if(res.length > 1 && res[0].auditSubTypeId != 1001){
    				// certDetails.IHMCertIssueFlag = true;
    				certDetails.isAmendCreated = true;
    				 }
     				 if(res[0].certificateDetail[0].auditStatusId == 1002 && res[0].certificateDetail[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
     					 certDetails.checkNxtAuditCreate = true;
     					 certDetails.disableReissueFields = true;
     		       		 certDetails.IhmFieldsDisable = true;
     				 }
     			 }
     			 if( res.length > 1 && res[0].certificateDetail[0].activeStatus == 0 && res[0].certificateDetail[0].certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM){
     				 if(certDetails.CertTypeForIHM.indexOf(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) === -1) certDetails.CertTypeForIHM.push(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM);
     			 }
     			 if(res.length > 1 && ((res[0].certificateDetail[0].activeStatus == 1 && res[0].certificateDetail[0].publishStatus==0 ) || (res[0].certificateDetail[0].activeStatus == 0 && res[0].certificateDetail[0].publishStatus==1 ))&& certDetails.certificateDtl.certIssueId != certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)
     				 {
     				 certDetails.checkNxtAuditCreate = false;
     				 }
     			 
     		 }
     		 if(certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && !data.leadSign && certDetails.certificateDtl.auditStatusId != 1002){
     			 certDetails.CertTypeForIHM = [certDetails.AppConstant.FULL_TERM_IHM, certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM];
     			     								 
     		 }
     		 });
     		
     	 }
     	 
	function disableIhmAmendment(data){
		
    		certDetails.CertTypeForIHM = [];
    		auditFactory.getAllIhmAuditDetail(certDetails.certificateDtl.auditTypeId,certDetails.certificateDtl.vesselImoNo,certDetails.certificateDtl.companyId).$promise.then(function(res){
    			certDetails.IHMCertIssueFlag = true;
    			certDetails.AllIhmAuditDetails = angular.copy(res);
    			
    			var socCertificates = certDetails.AllIhmAuditDetails[0].certificateDetail.filter(function(val) {
				    return (val.socType === 'hk' || val.socType === 'eu');
				});
    			
    			if(certDetails.certificateDtl.publishStatus == 1){
    				certDetails.IhmFieldsDisable = true;
    			}
    			if(certDetails.certificateDtl.auditStatusId == 1002 && res.length>0 && res[0].auditSeqNo == certDetails.certificateDtl.auditSeqNo){
    				certDetails.CertTypeForIHM.push(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
    				certDetails.IhmFieldsDisable = true;
    			}
    			else if (certDetails.certificateDtl.auditStatusId == 1002 && res.length>0 && socCertificates[0].auditSeqNo != certDetails.certificateDtl.auditSeqNo){
    				certDetails.disableAll = true;
    			}
    			if(data && data.length > 0 && data[0].certIssueId == 1005 && data[0].publishStatus == 1){
    				certDetails.CertTypeForIHM.push(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
    			}
//    			if(certDetails.certificateDtl.activeStatus == 1){
//    				certDetails.IhmFieldsDisable = true;
//    			}
    			/*else if((certDetails.certificateDtl.certIssueId == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM || certDetails.certificateDtl.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM )&& certDetails.certificateDtl.publishStatus == 1){
    				certDetails.CertTypeForIHM.push(certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM);
    		}*/
    			
    		
    /*		else{
    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM);
    		}*/
    			
    			if(res && res.length > 1){
 					var count = 0;
 					res.map(function(item){
 						if(item.auditSubTypeId == 1002){
 							count = count + 1;
 						}
 						for(var i = 0; i < certDetails.certificateIssuedOptions.length ; i++){
 							if(certDetails.certificateIssuedOptions[i].issueReasonId == 1005)
 							certDetails.certificateIssuedOptions[i].issueReasonDesc = "ADDITIONAL ENDORSED - "+count;
 							
 						}
 						
		        	    	
		        	    	
 						});
 					}
 					
 					
				 
    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.FULL_TERM_IHM);
    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.EXTENSION_IHM);
    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM);
    			certDetails.CertTypeForIHM.push(certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM);
   		  console.log("certDetails.CertTypeForAmendmentIHM "+certDetails.CertTypeForAmendmentIHM);
    		
    		
    		});
    	}

     	/*********************************END - Option Disable IHM***********************************************************/
     	 
    }  
    
    
 function completionSurveyDatePopUpController(scope,$scope,close,toaster,AppConstant,certificateFactory,data){
    	console.log("test");
    	var  completionDatePopUp = this;
    	completionDatePopUp.certDetails=scope.certificateDtl;
    	completionDatePopUp.message = data;
    
    	completionDatePopUp.AppConstant    = AppConstant;
    	
    
    	completionDatePopUp.close = function(result) { 
    		
    		if(result == 'NO'){
    			
    			completionDatePopUp.certDetails.completionSurveyDate = scope.orgCertificateDtl.certIssueDate;
    			completionDatePopUp.certDetails.certExpireDate = completionDatePopUp.certDetails.completionSurveyDate ? moment(completionDatePopUp.certDetails.completionSurveyDate,'DD-MMM-YYYY').add(5,'years').subtract(1,'days').format('DD-MMM-YYYY'):'';
    			close(result, 0);
        		$('.modal-backdrop').remove();
        		return true;
    		}
    		else {
    			close(result, 0);
    			
    			$('.modal-backdrop').remove();
    		}
    		
		};
	
    	}
 
 function ihmCertificatesController(scope,$scope,close,toaster,AppConstant,certificateFactory,data,data1){
    	
    	var  ihmCertificates = this;
    	ihmCertificates.certDetails=scope.certificateDtl;
    	ihmCertificates.message = data;
    	ihmCertificates.message1 = data1;
    	ihmCertificates.AppConstant    = AppConstant
    	ihmCertificates.disableOptions = false;
    	ihmCertificates.disableOptionHk = false;
    	ihmCertificates.disableOptionEu = false;
    	ihmCertificates.disableOptionExe = true;
    	
    	ihmCertificates.checkboxModelEnable = checkboxModelEnable;
    	ihmCertificates.checkboxModel = {
    						hk : false,
    						eu : false,
    						exe:false
    	};
    	function checkboxModelEnable(socType){
        	}
    	
    	if(scope.ihmCertModal){
    		ihmCertificates.checkboxModel.hk = scope.ihmCertModal.hk;
    		ihmCertificates.checkboxModel.eu = scope.ihmCertModal.eu;
    		ihmCertificates.checkboxModel.exe = scope.ihmCertModal.exe;
    	}
    	if(ihmCertificates.certDetails.certIssueId != ihmCertificates.AppConstant.FULL_TERM_IHM && ihmCertificates.certDetails.certIssueId != ihmCertificates.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
    		ihmCertificates.disableOptions = true;
    	}
    	
    	console.log("certDetails "+scope.certificateDtl.certIssueId,scope.certificateDtl.companyId,scope.certificateDtl.vesselImoNo,scope.certificateDtl.auditSubTypeId,scope.certificateDtl.auditSeqNo);
    	ihmCertificates.close = function(result) { 
    		result = [result,ihmCertificates.checkboxModel];
    		if(result[0] == 'YES'){
    		if(ihmCertificates.checkboxModel.hk ==false && ihmCertificates.checkboxModel.eu==false && ihmCertificates.checkboxModel.exe ==false){
    			toaster.warning('Please select certificate type ');
    			$('.modal-backdrop').remove();
        		return true;
    		}
    		
    		else if(ihmCertificates.checkboxModel.hk ==true ||  ihmCertificates.checkboxModel.eu==true || ihmCertificates.checkboxModel.exe ==true){
    			
    			close(result, 0);
        		$('.modal-backdrop').remove();
        		return true;
        		
    		}
    		}
    		else {
    			close(result, 0);
    			
    			$('.modal-backdrop').remove();
    		}
    		
		};

    	}
 
    function certificateHistoryControllerIhm(scope,$scope,auditFactory,detailsFactory,CERTI_URL,blockUI,toaster,AppConstant,MMMDDYYYY,YYYYMMDD,auditService,$timeout,$sce){
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
    				var auditDate = scope.auditDate ? moment(scope.auditDate,MMMDDYYYY).format(YYYYMMDD): moment(new Date()).format(MMMDDYYYY);
    				var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[];
    			 
    			//	var doc = new jsPDF('p', 'mm', 'a4');	
    					console.log("scope",scope);
    					detailsFactoryIhm.getAuditCertificateDataForIhm(scope.vesselImoNo,scope.companyId,scope.certificateNo,scope.auditTypeId,auditDate).$promise.then(function(result){
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
    							
    							if((a.auditSubTypeId == certHist.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)||(a.auditSubTypeId == certHist.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM)){
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
    											
    									
    											
    											if(a.certIssueId == certDetails.AppConstant.EXTENSION_IHM || a.certIssueId  == certDetails.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
    												
    												if(a.certIssueId == certificaIssueId && reIssue){

    									a.withoutCross = true;
    									}else{
    									a.withoutCross = false;
    									}
    												
    												extension.push(a);
    												
    											}else if(a.certIssueId  == certDetails.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
    												
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
    								if(a.certIssueId  == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
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
    								if(a.certIssueId  == certDetails.AppConstant.ADDITIONAL_ENDORSED_IHM /*&& a.auditStatusId != 1004*/)
    								{
    									if(a.auditSubTypeId == auditSubTypeId && a.auditSeqNo == tempAuditSeqNo && reIssue){

    										a.withoutCross = true;
    										}else{
    										a.withoutCross = false;
    										}
    								additional.push(a);

    								}
    								if(a.certIssueId  == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ){
    									additionalReissue.push(a);
    								}
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
    								'expirydate'	:(newCertificate[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
    										'auditplace'	:newCertificate[0].auditPlace,
    										'certissuedate'	:(newCertificate[0].certIssueId == certDetails.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
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
    														'qrCodeUrl':CERTI_URL ,
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
    																										'inLargetoAdd':inLargetoAdd,
    																										'renewalEndorse1':renewalEndorse1,
    																										'ihmDocumentNo':certDetails.certificateDtl.ihmDocumentNo?certDetails.certificateDtl.ihmDocumentNo:'',
    																										'condEcGrant':certDetails.certificateDtl.condEcGrant ?certDetails.certificateDtl.condEcGrant :'',
    																										'completionSurveyDate':	certDetails.certificateDtl.completionSurveyDate ? certDetails.certificateDtl.completionSurveyDate:''
    						} 
    			    						console.log(certificateDatas);

    				//certificateDatas.qrCodeUrl = CERTI_URL + res.companyId + '/'+ result.qid;

    				var certificate;
    			    						
    				$timeout(function() {

    					
    					if(certificateDatas.AuditTypeId == AppConstant.IHM_TYPE_ID){
    						
    						if(certDetails.ihmCertModal.hk==true){
    							certificate = auditService.ihmPdfService(certificateDatas,'HK');
    							pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
    							
    						}
    						if(certDetails.ihmCertModal.eu==true){
    							certificate = auditService.ihmPdfService(certificateDatas,'EU');
    							pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
    					
    						}
    						if(certDetails.ihmCertModal.exe==true){
    							certificate = auditService.ihmPdfService(certificateDatas,'Exemption');
    							pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
    							
    						}	
    					}else{
    						if (certificateDatas.AuditTypeId == AppConstant.ISM_TYPE_ID) {
    							
    							var certificate = auditService.ismPdfService(certificateDatas);
    							
    						} else if (certificateDatas.AuditTypeId == AppConstant.ISPS_TYPE_ID) {
    							
    							certificate = auditService.ispsPdfService(certificateDatas);
    							
    						} else if (certificateDatas.AuditTypeId == AppConstant.MLC_TYPE_ID) {
    							
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
    						
    					}
    					
    					
    					
    					
    					
    					blockUI.stop();
    					toaster.success('Certificate downloaded successfully');
    					
    					
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