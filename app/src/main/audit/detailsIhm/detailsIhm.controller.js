                                                           /**
 * @package app\src\main\audit\details
 *
 *
 * @author sourav ghadai, dinesh, ravi, Parashuram
 *
 */

(function (){
    'use strict';

    angular
        .module('app.audit.detailsIhm')        
        .controller('DetailsControllerIhm', DetailsControllerIhm); 
    
    function DetailsControllerIhm($compile,CERTI_URL,auditFactory,$injector,$state,$window,$cookies,masterData,auditorName,auditType,AppConstant,detailsFactoryIhm,toaster,YYYYMMDD,MMMDDYYYY,DDMMMYYYY,HHmm,
    		DDMMYYYY,$timeout,ModalService,vesselStatementFactory,blockUI,auditService,$scope,$q,$rootScope,broadcastService,userFactory,auditCycleFactory,certificateFactory,masterFactory,getEcGrantedReason){
    	
        var det          = this; console.log(det);
        
        det.getEcGrantedReason = getEcGrantedReason;
         
        $scope.qrString = "";
       
        var MMDDYYYY     = 'MM/DD/YYYY';  
    
        det.AppConstant  = AppConstant; 
        
        det.toggle       = toggle;

        det.auditTypeId  = Number($window.sessionStorage.getItem('auditTypeId'));
        
        det.auditSeqNo   = Number($window.sessionStorage.getItem('auditSeqNo'));
        
        det.companyId    = Number($window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '');
        
        det.companyData = {'companyId':sessionStorage.getItem('companyName'), 'companyName':sessionStorage.getItem('companyName')};
                
        det.audObsNameArray          = auditorName;
        
        det.audObsNameArrayCopy =[];
        
        det.audArrayObserverUnQualified=[];
       
        det.auditSubTypeOptions      = masterData.auditSubType; 
    	
        /*det.auditSubTypeOptions = [];
      //Removed the Amendment in drop down
        det.auditSubTypeOptions_.forEach(function(value){
        	if(value.auditSubtypeId == 1001){
        		det.auditSubTypeOptions.push(value);
        	}
        });*/
    	
    	det.auditStatusOptions       = masterData.auditStatus; 
    
    	det.certificateIssuedOptions = masterData.certificateIssued;
    	
    	det.obsCategoryOptions       = masterData.obsCategory;
    	
    	det.obsStatusOptions         = masterData.obsStatus;
    	
    	det.audObsType               = masterData.audObsType;
    	
    	det.auditCodeArray			 = masterData.auditCodes; 
    	
    	det.maPort  				 = masterData.maPort;
    	
    	det.downloadCertificate = downloadCertificate;
    	
        det.generateCertificateHk = generateCertificateHk;
    	
    	det.generateCertificateEu = generateCertificateEu;
    	
    	det.generateCertificateEx = generateCertificateEx;
    	
    	det.downloadAllCertificate = downloadAllCertificate;
    	
    	det.generateAllCertificate = generateAllCertificate;
	
	det.getVendorNames = getVendorNames;
    	
    	det.getVendorAddress = getVendorAddress;
    	
    	det.setVendorDetails = setVendorDetails;
    	
    	
    	det.AllIhmCertificateData = '';
    	
    	det.disabledApproveButton = false;
    	 
		det.receiptStart=false;
		
    	det.checkFlagValue=true;
    	det.checkSign=true;
    	
    	det.maxDmlc1issueDate = '';
    	
    	det.imolabelVal = 'vesselImoNo';
    	
    	det.checkLeadStatus = false;
    	
    	det.checkPrelimAudit = 'Yes';
    	
    	det.receiptLtr= false;
    	
    	det.addSurvDueDateChange = addSurvDueDateChange;
    	
    	det.addSurvDueDateChanged = false;
    	
    	det.auditTypeId != det.AppConstant.MLC_TYPE_ID ? det.PreviousFindingsLabelValue = 'Previous Finding': det.PreviousFindingsLabelValue = 'Previous Finding' ;
    	
    	det.managerRegion = sessionStorage.getItem("managerRegion");
    	
    	det.apreAmendletter='Amendment Approval Letter';
    	
    	det.certiRecieptLetter = 'Receipt Letter';
    	
    	det.directAmendment=false;
    	
    	det.dmlcUpdated = false;
    	
    	det.auditCycleRoleId ='';
    	
    	det.auditCycleManagerOrAdmin='';
    	
    	det.avoidReportModel= false;
    	
    	det.emailLoad=true;
    	
    	det.vesselDtlsRefresh = vesselDtlsRefresh;
    	
    	det.vesselDtlsCheck = vesselDtlsCheck;
    	
    	det.updateVesselDeatils = updateVesselDeatils;
    	
    	det.vesselUpdate = false;
    	
    	det.UpdateVesselAvailable = false;
    	
    	 det.UpdateVesselRefreshed = false;
    	
    	det.certificateReissueMgrIHM = false;
    	
    	det.removeSignDisable = false;

		det.attachSignFlag=false;		// Added by Ramya on 17 Feb 2022 for CR-Ticket-423
    	
    	det.downloadIHMCertificate = downloadIHMCertificate;
    	
    	det.reportTypes = _.sortBy(det.reportTypes, 'attachmentTypeId');
    	
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactoryIhm.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				det.signerName = data.signer;
				console.log(det.signerName)
			});
		});
    	
    	det.imolabelValOptions = [{
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
    	
    	det.portArray2 = [];

    	det.userRoleId = sessionStorage.getItem('userRoleId'); 
    	
    	det.vendorDetails=[];
    	
    	det.vendorDetailsNames=[]; 
    	
    	det.vendorDetailsAddress=[];
    	
    	det.vendorDetailsNames.push('Other');
    	det.vendorDetailsAddress.push('Other');
    	
    	det.vendorDetailsNames.push('NA');
    	det.vendorDetailsAddress.push('NA');
    	
    	det.auditStatusOptions = det.auditStatusOptions.filter(function(obj) {
    		return (obj.auditTypeId == det.AppConstant.IHM_TYPE_ID) ? (obj.auditStatusId != det.AppConstant.REOPEN) : obj;
    	});
    	
    	det.maPort.forEach(function(port){
           if(port.activeFlag==1){
    			
    			var portToIns = port.portName?port.portName:'';
    			
    			portToIns = portToIns ? port.countryName ? portToIns+', '+port.countryName : portToIns : port.countryName ? port.countryName :'';
    					
    			det.portArray2.push(portToIns);
    		}
          
    	});
    	
    	detailsFactoryIhm.getAllRmiIhmCustomers().$promise.then(function(res){ console.log(res);
    	det.vendorDetails = angular.copy(res);
    	if(res && res.length>0){
    	det.vendorDetails.forEach(function(vendor){
    		det.vendorDetailsNames.push(vendor.vendorName);
    		det.vendorDetailsAddress.push(vendor.vendorAddress);
    	
    	}); }
        });
    	
    	$scope.$on('refreshDET', refreshDET)
    	function refreshDET(){
    		
    		var mailId = sessionStorage.getItem('emailId');
    	  	var comapnyId=sessionStorage.getItem('companyId');
    	  	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    		 var USER_ID = res[0].officialId;
    		 det.USER_ID=USER_ID
    	  	});
    		 var review_no=$scope.det.auditDetailOrg.auditReportNo;
    		console.log($scope.det.auditDetailOrg.auditReportNo)
    		 detailsFactoryIhm.getStampData(det.auditDetail.auditReportNo,det.auditDetail.auditSeqNo).$promise.then(function(res){
    			 	console.log(res)
	    			 res.forEach(function(a){
	    				 var filename=a.FILE_NAME.split("_IRI_"+review_no);
	    				 a.FILE_NAME=filename[0]+".pdf";
	    				 if(a.PAGE_NO.includes("All"))
	    					 a.noRepeatPG="All";
	    				 else{	 
		    				 var noRepeatPG = Array.from(new Set(a.PAGE_NO.split('&'))).toString();
		    				 a.noRepeatPG=noRepeatPG;
	    				 }
	    				
	    	 		});
	    			 
    			 	console.log(det.auditDetail.userIns)
    				det.stampDataDetails=angular.copy(res);
    				det.stampDataDetails.forEach(function(a){
    					a.userIns=det.auditDetail.userIns;
    				});
    				console.log(det.stampDataDetails)
    				checkLoadEmail(det.stampDataDetails[0]);
    				});
    				
    	  	
    	  }
    	function checkLoadEmail(stampDataDetails){
    		if(!det.lockStatus && det.userRoleId ==det.AppConstant.MANAGER_ROLE_ID)
    			det.emailLoad=false;
    		else if(!det.lockStatus){
    			det.emailLoad=false;
    		}else if(det.auditDetail.auditStatusId==det.AppConstant.COMPLETED_AUDIT_STATUS && stampDataDetails.USER_ID==det.USER_ID)
    			det.emailLoad=false;
    	}
    	  
    	det.portArray=[];
    	
    	 
    	 det.ihmUserDetails=_.findWhere(det.audObsNameArray, {'emailId' : sessionStorage.getItem('emailId')});
    	 
    	console.log(det.portArray); 
    	
    	det.audObsNameArrayCopy = angular.copy(det.audObsNameArray);
    	det.audArrayObserverUnQualified = angular.copy(det.audObsNameArray);
    	
    	console.log(det.audObsNameArray);
    	console.log(det.audObsNameArrayCopy);
    	$scope.$watch('det.auditDetail.sspReviewDetail[0].sspRevisionNo', function(){
        	if(det.auditDetail.sspReviewDetail && det.auditDetail.sspReviewDetail.length>0){
        		  
		          var cache = $scope.det.auditDetail.sspReviewDetail[0].sspRevisionNo;
		          if (!(/^[a-zA-Z0-9]+$/.test($scope.det.auditDetail.sspReviewDetail[0].sspRevisionNo[0]))){      	
		          	$scope.det.auditDetail.sspReviewDetail[0].sspRevisionNo = cache.slice(1,cache.length);
		          }
        	}
        })
        
      
    	
    	
    	det.btnColor        = 'primary'; 
    	    		
    	det.reportTypes     = masterData.reportTypes;
    	
    	det.vesselArray     = masterData.vesselData;
    	
    	det.vesselTypeArray = masterData.vesselTypeData; 
    	
    	det.auditTypes      = masterData.auditTypes;
    	
    	det.auditSummary    = masterData.auditSummary;
    	
    	det.companyDetails  = masterData.companyDetails;
    	
    	det.disableCertIssueExpiry  = true;
    	
    	det.exportReport   	= exportReport;
    	
    	det.stampApproval   = stampApproval;
    	
    	det.auditCreate 	= true;
    	
    	det.vesselDetail 	= {};
    	
    	det.vesselCompanyDtl = {};
    	
    	det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
    	
        det.auditDetail = {};
      
        det.enableCertificateIssuedType=[det.AppConstant.INTERIM_CERT,det.AppConstant.FULL_TERM_CERT,det.AppConstant.EXTENSION,det.AppConstant.INTERMEDAITE_ENDORSED,det.AppConstant.ADDITIONAL_ENDORSED,det.AppConstant.RENEWAL_ENDORSED1,det.AppConstant.RENEWAL_ENDORSED2,det.AppConstant.RE_ISSUE];
		
		det.auditDetailBeforeUpdate = {};
		
		det.auditType   = '';

        det.auditorType = ''; 
        
        det.certType    = '';

        det.showSwitch  = true;

        det.expiredate  = '';
        
        det.additionalSurvey = '';
        
        det.additionalSurveyChangeStatus = false;
        
        det.additionalSurveyChange = additionalSurveyChange;
        
        det.cmpnyAdrs = '';
		
		det.cmpnyNme = '';
		
		det.previousAudit = {};
		
		det.previousAuditForLetterHistory=[];
		
		
		det.LetterHistoryDetails=[];

		det.ihmCertDocHkEuChange = ihmCertDocHkEuChange;  //added by sudharsan for jira-ID = IRI-5566
		
		det.stampDataDetails=[];
		
		det.exportLetterHist=exportLetterHist;
	
		 det.showData=showData;
		
		det.iniRenCreated = 0;
		
		det.carFindMaxStatusDate = '';
		
		
		
		det.auditMaxDate = '';
		
		det.auditMinDateTemp = '';
		
		det.loginUserId = sessionStorage.getItem('emailId');
		
		det.userRelatedToAdt = (det.userRoleId == det.AppConstant.ADMIN_ROLE_ID || det.userRoleId == det.AppConstant.MANAGER_ROLE_ID  || det.userRoleId == det.AppConstant.IHM_MANAGER_ROLE_ID) ? true : false;
		
		det.reviewerLogin = false;
		
		det.currUserSign = false;
		
		det.leadSign = false;
		
		det.reviewerSign = false;
		
		det.lockStatus = false;
		
		det.auditCreateUpdate = det.AppConstant.CREATE;
		
		det.sspDtlAvl = false;
		
		det.rptAttchFlag = true;
		
		det.nextAdtCreated = false;
		
		det.enabled = false;
		
		det.summaryDate1 = 'DD/MMM/YYYY';
    	
    	det.summaryDate2 = 'DD/MOM/YYYY';
    	
    	
    	det.minAuditDatePer = '';
    	
    	det.notLead = (det.userRoleId==det.AppConstant.MANAGER_ROLE_ID)?true: false;
    	
    	det.expiryMinDate = '';
    	
    	det.expiryMaxDate = '';
    	
    	det.minOpenMeetingDate =''; moment(new Date()).subtract(89,'days').format(YYYYMMDD);
    	
    	det.maxIssueDate =  moment(new Date()).format(YYYYMMDD);
    	
    	det.receiptMaxDate =  moment(new Date()).format(YYYYMMDD);
    	
    	det.auditMinDate ='';// moment(new Date()).subtract(89,'days').format(YYYYMMDD);
    	
    	det.minAuditDatePer =''; //moment(new Date()).subtract(89,'days').format(YYYYMMDD);
    	
    	det.minAuditDatePerIHM = '';
    	
    	det.maxOpenMeetingDate = '';
    	
    	det.maxCloseMeetingDate = '';
    	
    	det.minCloseMeetingDate = '';
    	
    	det.minInternalDate = '';
    	
    	det.maxInternalDate = '';
    	
    	det.sspDmlcRevisionNo = 0;
    	
    	det.startExpiryDate = '';
    	
    	det.observationarrayprevious = [];
    	
    	det.dmlcFindingAray = [];
    	
    	det.startState = det.AppConstant.CREATE;
    	
    	det.vesselDataFromRmi = [];
    	
    	det.prevActiveCert = '';
    	
    	det.reasonForVoidReopen = reasonForVoidReopen;
    	
    	det.prevInitialOrRenewal='';
    	
    	det.prevAdtDataFetch = false;
    	
    	det.prevFindingDataFetch = false;
    	
    	det.finalReport = false;
    	
    	det.dMLCReportNos = [];
    	
    	det.newCertificateDetails = '';
    	
    	/***functions declaration***/
 
        det.back            = back;

        det.previousFinding = previousFinding;

        det.currentFinding  = currentFinding;
        
        det.typeCheck       = typeCheck;
        
        det.setAuditSCreen  = setAuditSCreen;
        
        det.avoidWhiteSpace = avoidWhiteSpace;
        
        det.setvesselImoNo  = setvesselImoNo;
        
        det.setAuditSummary = setAuditSummary;
        
        det.checkPreviousAuditDetails = checkPreviousAuditDetails;
        
        det.checkPreviousAuditDetailsIHM = checkPreviousAuditDetailsIHM;
        
        det.dateFormatConversion = dateFormatConversion;
        
        det.dateFormatConversionPreAudit = dateFormatConversionPreAudit
        
        det.setAuditData = setAuditData;
        
        det.auditorDetail = auditorDetail;
        
        det.setAuditDetailData = setAuditDetailData;
        
        det.auditDetailDataValidation = auditDetailDataValidation;
        
        det.saveAuditData = saveAuditData;
        
        det.validateAndSaveAuditData = validateAndSaveAuditData;
        
        det.reportUpload = reportUpload;
        
        det.vesselImoModel = vesselImoModel;
        
        det.getNewCertificate = getNewCertificate;
        
        det.auditSubTypeChange = auditSubTypeChange;
        
        det.setAuditDate = setAuditDate;
        
        det.setCertificateIssued = setCertificateIssued;
        
        det.setRelatedDataOnSubtypeSelect =  setRelatedDataOnSubtypeSelect;
        
       det.setExpiryDate = setExpiryDate;
        
        det.attachSignature = attachSignature;
        
        det.checkCompleted = checkCompleted;
        
        det.attachSignValidation = attachSignValidation;
        
        det.approvalLetterValidation=approvalLetterValidation;
        
        //only for DMLC Revieew
        det.isAllFindingClose = isAllFindingClose;
        
        det.removeSign = removeSign;
        
        det.completedStatusValidation = completedStatusValidation;

        det.allAuditorSignValidation = allAuditorSignValidation;
        
        det.disableNarativeSummary = disableNarativeSummary;
        
        det.enableNarativeSummary = enableNarativeSummary;
        
        det.createValidation = createValidation;
        
        det.initiateReview = initiateReview;
        
        det.revertReview = revertReview;
        
        det.changeCallback = changeCallback;
        
        det.docChange = docChange;
        
        det.downloadReport = downloadReport;
        
        det.reportFilePreview = reportFilePreview;
        
        det.reportFilePreviewModal = reportFilePreviewModal;
        
        det.removeReport = removeReport;
        
        det.setSummaryAndDueDate = setSummaryAndDueDate;
        
        det.setDefaultSummaryDate = setDefaultSummaryDate;
        
        det.exporttocertificate = exporttocertificate;
       
        
        det.setReceiptDate = setReceiptDate;
        
        
        det.getHeight  = getHeight;
        
        det.dateValidation	= dateValidation;
        
        det.setPrevFindingsRecords = setPrevFindingsRecords;
        
        det.setSSPMaxReceiptDate  = setSSPMaxReceiptDate;
        
        det.getExpiryDate = getExpiryDate;
        
        det.exportReceiptLetter = exportReceiptLetter;

		det.validateReceiptLetter=validateReceiptLetter;
        
        det.exportReceiptHist	= exportReceiptHist;
        
        det.exportapprovalletter = exportapprovalletter;
        
        det.ihmAmendmentApprovalLetter = ihmAmendmentApprovalLetter;
        
        det.exportAmendmentLetter = exportAmendmentLetter;
        
        det.generateUtn = generateUtn;
        
        det.vesselDetails = vesselDetails;
        
        det.vesselSpecificDtl = vesselSpecificDtl;
        
        det.validateVessel = validateVessel;
        
        det.validateVesselNull = validateVesselNull;
        
        det.saveCurrentFinding = saveCurrentFinding;
        
        det.getPort = getPort;
        
        det.validatePort = validatePort;
        
        det.validateAndExportapprovalletter = validateAndExportapprovalletter;
        
        det.valiudateAndExportAmendmentLetter = valiudateAndExportAmendmentLetter;
      
        det.checkFindingClosed = checkFindingClosed;
        
        det.lengthOfFindingExceptObs = lengthOfFindingExceptObs;
        
        det.doBlur = doBlur;
        
        det.preFindingClosed = true;
        
        det.preAuditFlag=false;
        
        det.reportHistory = [];

		det.notApprovedPrevAudit = false;

		det.notApprovedArray = [];

        det.dateFormater = dateFormater;
        
        det.setDynamicDirective = setDynamicDirective;
        
        det.dirInterAndAdditionalAudit = false;
        
        det.onChangeAuditStatus = onChangeAuditStatus;
        
        det.onChangeCertIssue = onChangeCertIssue;
        
        det.delegateSign = delegateSign;
        
        det.openForCar = false;
        
        det.lastSameAuditDate = '';
                
        det.managerOrAdminChangeLead='';
        
        det.auditReopnedStatus='';
        
        det.AuditReopenEnableFields=false
        
        det.disableSave=false;
        
        det.oldValue='';
        
        det.auditReopen = auditReopen;
        
        det.managerCreatedAudit=false;
        
        det.managerCreatingAudit='';
       
        det.certficateDetils = certficateDetils;
        
        det.findingMncVerifySerialNo=''
        	
        det.findingMncPlanacceptedSerialNo='';
       
        det.findingsMncverifyMaxDate='';
        
        det.findingsMncPlanacceptedMaxDate='';
        
        det.findingsNcDueDate='';
        
        det.findingsNcSerialNo='';
        
        det.validateAttchedStampOrNot =validateAttchedStampOrNot;
        
        det.emailForDoc = emailForDoc;
        
        det.reportHisList = [];
        
        det.generateFrPrintReport = generateFrPrintReport;
        
        det.generatePrPrintReport = generatePrPrintReport
        
        det.emailForDocClicked = false;
        
        det.genarateReceiptLetter = genarateReceiptLetter;
        
        det.validateReceiptDoc = validateReceiptDoc;
        
        det.generateApprovalletter = generateApprovalletter;
        
        det.exportGeneratedApprovalletter = exportGeneratedApprovalletter;
        
        det.title = '';
        
        det.vesselHistory = [];
        
        det.ihmPart1IssueDateChange = ihmPart1IssueDateChange;
    	
    	det.revNochange = revNochange;
    	
    	det.ihmCertModalHkChange = ihmCertModalHkChange;
    	
    	det.ihmCertModalEuChange = ihmCertModalEuChange;
        
    	det.reviewDocFr = false;
    	
    	det.reviewDocFrChange = reviewDocFrChange;
    	
    	det.reviewDocPr = false;
    	
    	det.receiptDoc = false;
    	
    	det.approvaDoc = false;
    	
    	det.certificateDoc = false;
    	
    	det.stampDoc = false;
    	
    	det.ihmCertDocHk = false;
    	
    	det.ihmCertDocEu = false;
    	
    	det.ihmCertDocEx = false;
    	
        det.ihmCertDocHkDisable = false;
    	
    	det.ihmCertDocEuDisable = false;
    	
    	det.ihmCertDocExDisable = false;
    	
    	det.approvalDocChange = approvalDocChange;
    	
    	//det.ihmCertDocHkChange = ihmCertDocHkChange;  //commented by sudharsan for jira-ID = IRI-5566
    	
    	//det.ihmCertDocEuChange = ihmCertDocEuChange;   //commented by sudharsan for jira-ID = IRI-5566
    	
    	det.ihmCertDocExChange = ihmCertDocExChange;
    	
    	det.stampDocChange = stampDocChange;
    	
    	det.vesselRefreshed = false;
    	    	
    	var validateReviewLetterWithAuditStatus=true;
    	console.log("DATE TEST"); 
    	console.log( moment(new Date()).format(YYYYMMDD));
    	console.log(moment(new Date()).format(MMMDDYYYY));
		
		 det.checkScope = [{
        	'scopeId':1000,
        	'scopeName':'Full Scope'
        },
        {
        	'scopeId':1001,
        	'scopeName':'Half Scope'
        }];
        
        det.scopeId = 1000;
        
        
        det.creditDateChange=creditDateChange;
        
        det.getDMLCReportNos = getDMLCReportNos;
        
        det.setSspDmlcAuditSeqNo = setSspDmlcAuditSeqNo;
        
        det.onChangeLinkedReportNumber = onChangeLinkedReportNumber;
        
        det.dmlcFinding = dmlcFinding;
        
        det.checkScopeFunval ={};
        
        det.checkScopeFun = checkScopeFun;
        
        det.nextAuditDetails = [];
        
        det.setNextAuditData = setNextAuditData;
        
        det.carUpdateStatus = false;
        
        det.previousAuditSuspendata = [];
        
        det.reasonForVoidShow = false;
        
        det.amSelect = "YES";
      
        det.ihmReviewer = det.ihmReviewer? det.ihmReviewer: null;
        /*    det.viewSspApproval = viewSspApproval;*/
          
            /* 
                AuditType Checking & Intialize
            */
          
          masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
        	
        	if(res && res.length>0 && res[0].ihmreview==1){
        		det.ihmReviewer = true;
        	 }
        	if(det.userRoleId == det.AppConstant.IHM_MANAGER_ROLE_ID){
          		det.disableNarativeSummary();
          	}
        	});
       
           $scope.$watch('det.auditDetail.auditPlace', function(){
        	
            var cache = $scope.det.auditDetail.auditPlace;
            if (det.auditDetail.auditPlace && !(/^[a-zA-Z0-9]+$/.test($scope.det.auditDetail.auditPlace[0]))){      	
            	$scope.det.auditDetail.auditPlace = cache.slice(1,cache.length);
           
            }
          })
        
        det.typeCheck();
        
        det.setAuditSCreen(function(){
       
        	 
        if(det.auditCreate){
        	var officialId = '';
      		 
    		detailsFactoryIhm.getCurrentUserDetail(_(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('userId').toString(),det.companyId).$promise.then(function(data){
    			
 			if(data.length>0 && data[0].managerOfficialId){
 				
 				officialId = data[0].managerOfficialId;
 				
 				detailsFactoryIhm.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
 			   		
 		   			det.title = res.title;
 		   			
 		   		    det.leadSignReceiptLtr=res.signature;
 		   		    
 		   		 });
 			}
 		}); 
    		
    		
        	
        }
          	   
        	
     	
      
        });
        
        function revNochange(){
    		det.auditDetail.sspReviewDetail[0].ltrStatus =0;
    	}
        
        function ihmPart1IssueDateChange(){
        	det.auditDetail.sspReviewDetail[0].ltrStatus =0;
        }
        
        function ihmCertModalHkChange(){
        	det.auditDetail.sspReviewDetail[0].ltrStatus = 0;
        }
        
        function ihmCertModalEuChange(){
        	det.auditDetail.sspReviewDetail[0].ltrStatus = 0;
        }
        
        /***functions body***/
        
        function setDynamicDirective(){
        	
        	/*var myEl = angular.element( document.querySelector( '#divID' ) );
        	
        	myEl.removeAttr('numeric');
        	myEl.attr('add-directive',det.imolabelValOptions[det.imolabelVal].directive);*/
        	
        	var myEl = angular.element(document.getElementById("divID"));
        	myEl.removeAttr('numeric');
        	myEl.attr('add-directive',det.imolabelValOptions[det.imolabelVal].directive);
        	
        	$compile(myEl)($scope);
        	
        	/*$injector = myEl.injector();
        	$injector.invoke(function($compile){
        	   $compile(myEl)($scope);
        	   
        	});*/
        }
    	
        function generateCertificateHk (res){
        	blockUI.start();
    		auditFactory.qrCodeGenerator(CERTI_URL+res.qid).$promise.then(function(response){
				det.qrCodeData= response.data;
				if(res){
					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue =[], intermediateReissue= [];
					var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
					if(res.auditTypeId == AppConstant.IHM_TYPE_ID){
						if(auditDate=="Invalid date")
							auditDate =moment(new Date(),MMMDDYYYY).format(YYYYMMDD);
					}
					certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
						generateAllCertificate(resp,response,res.certificateId,res);
	    			});
				}else{
					blockUI.stop();
				}
			});
        }
        
        function generateCertificateEu (res){
        	blockUI.start();
    		auditFactory.qrCodeGenerator(CERTI_URL+res.qid).$promise.then(function(response){
				det.qrCodeData= response.data;
				if(res){
					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue =[], intermediateReissue= [];
					var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
					if(res.auditTypeId == AppConstant.IHM_TYPE_ID){
						if(auditDate=="Invalid date")
							auditDate =moment(new Date(),MMMDDYYYY).format(YYYYMMDD);
					}
					certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
						generateAllCertificate(resp,response,res.certificateId,res);
	    			});
				}else{
					blockUI.stop();
				}
			});
        }
        function generateCertificateEx (res){
        	blockUI.start();
    		auditFactory.qrCodeGenerator(CERTI_URL+res.qid).$promise.then(function(response){
				det.qrCodeData= response.data;
				if(res){
					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue =[], intermediateReissue= [];
					var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
					if(res.auditTypeId == AppConstant.IHM_TYPE_ID){
						if(auditDate=="Invalid date")
							auditDate =moment(new Date(),MMMDDYYYY).format(YYYYMMDD);
					}
					certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
						generateAllCertificate(resp,response,res.certificateId,res);
	    			});
				}else{
					blockUI.stop();
				}
			});
        }
        

        function generateAllCertificate(res,response,certificateId,currRes){
    		 
			var certificate;
    		
			console.log(res)
			var certificate;
    		
    		var newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue1 =[],additionalReissue2 =[],renewalEndorse1 = [];
	    	var currInitialPage=[],reissCert=0,additionalReissue3 =[], intermediateReissue1= [],additional1=[],additional2=[],additional3=[],intermediate1=[];
	    	
    		var certResult = res.result,hkCertOrcerNo=0,euCertOrcerNo=0,exeCertOrcerNo=0,add1CertOrderNO=0,add2CertOrderNO=0,add3CertOrderNO=0;
    		
    		var statusExt = currRes.socType;
    		if(statusExt=='EU')
    			statusExt='eu';
    		else if(statusExt=='HK')
    	    	statusExt='hk';	
    	    else if(statusExt=='Exemption')
    	       	statusExt='exe';
    	       		
    	     var activeStatus;
    	     if(currRes.activeStatus==0)
    	    	 activeStatus = 'inactive'
    	     else if (currRes.activeStatus==1)
    	    	 activeStatus = 'active'
    	    		 
    	    		 
    		
			certResult.forEach(function(a,index){
				
				var ecreasonName= _(det.getEcGrantedReason).chain().where({'reasonId':a.condEcGrant}).pluck("ecGrantedReason").toString();
				
				if(a.certificateId==certificateId){
					
					if(a.socType=='hk' && a.certOderNo > hkCertOrcerNo)
						hkCertOrcerNo=a.certOderNo;
					else if(a.socType=='eu' && a.certOderNo > euCertOrcerNo)
						euCertOrcerNo=a.certOderNo;
					else if(a.socType=='exe' && a.certOderNo > exeCertOrcerNo)
						exeCertOrcerNo=a.certOderNo;
				}
				
				if(a.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM && a.socType==statusExt){
					if(a.socType==statusExt && a.certOderNo > add1CertOrderNO && add1CertOrderNO==0)
						add1CertOrderNO = a.certOderNo;
					if(a.socType==statusExt && a.certOderNo > add2CertOrderNO && add2CertOrderNO==0 && a.certOderNo > add1CertOrderNO && add1CertOrderNO!=0)
						add2CertOrderNO = a.certOderNo;
					if(a.socType==statusExt && a.certOderNo > add3CertOrderNO && add3CertOrderNO==0 && a.certOderNo > add2CertOrderNO && add2CertOrderNO!=0)
						add3CertOrderNO = a.certOderNo;
				}
				
				if(a.certIssueId==det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
					reissCert = a.certOderNo;
				}
				
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
							
							a.renewalRegulation = a.renewalRegulation ?a.renewalRegulation : '';
							
							a.condEcGrant = ecreasonName;
							
									
			});
    			certResult.forEach(function(a){
    				
    				if(a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' ){
    					
    					(a.socType==statusExt && a.certificateLink==currRes.certificateLink) ? currInitialPage={0:a} : '';
    					(a.socType==statusExt && a.certificateLink==currRes.certificateLink) ? newCertificate={0:a} : '';
    				}
    				if(a.certIssueId == det.AppConstant.EXTENSION_IHM){
						
						(a.socType==statusExt && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? extension={0:a} : '';
						//extension={0:a};
					}
					
				   else if(a.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
							
							(a.socType==statusExt && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? renewalEndorse1={0:a} : '';
							//renewalEndorse1={0:a};
					}
					
				   else if (a.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
						
						(a.socType==statusExt && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? renewalEndorse2={0:a} : '';
						//renewalEndorse2={0:a};
					}
				   else if (a.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM){
						
					 /*  (a.certOderNo<=currRes.certOderNo ) ? additional1={0:a} : '';
						(a.certOderNo<=currRes.certOderNo ) ? additional2={0:a} : '';
						(a.certOderNo<=currRes.certOderNo ) ? additional3={0:a} : '';	*/
					   (reissCert < add1CertOrderNO ) && (a.certOderNo==add1CertOrderNO) ? additional1={0:a} : (reissCert>0) && (add1CertOrderNO>0) && (reissCert > add1CertOrderNO ) ? additionalReissue1={0:a} : '';
						(reissCert < add2CertOrderNO ) && (a.certOderNo==add2CertOrderNO) ? additional2={0:a} : (reissCert>0) && (add2CertOrderNO>0) && (reissCert > add2CertOrderNO ) ? additionalReissue2={0:a} : '';
						(reissCert < add3CertOrderNO ) && (a.certOderNo==add3CertOrderNO) ? additional3={0:a} : (reissCert>0) && (add3CertOrderNO>0) && (reissCert > add3CertOrderNO ) ? additionalReissue3={0:a} : '';	
					}
    			});
    			
    			 console.log(newCertificate[0].auditReportNo)
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
					'expirydate'	:(newCertificate[0].certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
					'auditplace'	:newCertificate[0].auditPlace,
					'certissuedate'	:(newCertificate[0].certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
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
									'seal':newCertificate[0].seal ? newCertificate[0].seal : '',
									'title':newCertificate[0].title ? newCertificate[0].title : '',
											'additionalReissue1':additionalReissue1,
											'additionalReissue2':additionalReissue2,
											'additionalReissue3':additionalReissue3,
											'certificateDetails':certResult,
											'intermediateReissue':intermediateReissue1,
											'crossLineStatus':activeStatus,
											'currentCertiObj':certResult[0],
											'renewalEndorse1':renewalEndorse1,
											'ihmDocumentNo':certResult[0].ihmDocumentNo?certResult[0].ihmDocumentNo:(newCertificate[0].ihmDocumentNo ? newCertificate[0].ihmDocumentNo :''),
											'condEcGrant':certResult[0].condEcGrant ?certResult[0].condEcGrant:'' ,
											'completionSurveyDate':certResult[0].completionSurveyDate ? certResult[0].completionSurveyDate :'',
											'voyageEcGrant' : certResult[0].voyageEcGrant ?  certResult[0].voyageEcGrant :''
											
			} 
	
    		var certificateIhmHk = '';
			var certificateIhmEu = '';
			var certificateIhmEx = '';
			
			$timeout(function(){
				 
				certResult.forEach(function(a){
					if(a.certificateId==certificateId){
    				if(a.socType=='eu'){
    					/*certificate = auditService.ihmPdfService(certificateDatas,'EU');
						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');*/
						
    					 var certificateHkBase64Data = '';
    					 certificateIhmHk = auditService.ihmPdfService(certificateDatas,'EU');
    					 pdfMake.createPdf(certificateIhmHk).getBuffer(function(buffer) {
    							var byteArray = new Uint8Array(buffer);
    							var length = byteArray.byteLength;
    							for (var i = 0; i < length; i++) {
    								certificateHkBase64Data += String.fromCharCode(byteArray[i]);
    							}
    						});
    						
    					  $timeout(function(){
    						    var fileByte = [];
    		    				    fileByte = certificateHkBase64Data ? btoa(certificateHkBase64Data) : '';
    		    				var auditSubTypeDesc = newCertificate[0].auditSubTypeId == 1001 ? 'INITIAL' :'AMENDMENT';
    		    				var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
    							var parameter = {
    		    						'fileName'   : finalFileName_,
    		    						'fileByte'   : fileByte,
    		    						'reportName' : 'CertificateEu',
    		    						'userName'	 : sessionStorage.getItem('emailId')
    		    					};
    						auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
    	    							   
    						     });
    				       },2000);	
    					  
							
    				}
    				if(a.socType=='hk'){
    					/*certificate = auditService.ihmPdfService(certificateDatas,'HK');
						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');*/
    					 var certificateEuBase64Data = '';
    					 certificateIhmEu = auditService.ihmPdfService(certificateDatas,'HK');
    					 pdfMake.createPdf(certificateIhmEu).getBuffer(function(buffer) {
    							var byteArray = new Uint8Array(buffer);
    							var length = byteArray.byteLength;
    							for (var i = 0; i < length; i++) {
    								certificateEuBase64Data += String.fromCharCode(byteArray[i]);
    							}
    						});
    					
    				  $timeout(function(){
    					  var fileByte = [];
      				          fileByte = certificateEuBase64Data ? btoa(certificateEuBase64Data) : '';
      				        var auditSubTypeDesc = newCertificate[0].auditSubTypeId == 1001 ? 'INITIAL' :'AMENDMENT';
		    				var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
    					  var parameter = {
    	    						'fileName'   : finalFileName_,
    	    						'fileByte'   : fileByte,
    	    						'reportName' : 'CertificateHk',
    	    						'userName'	 : sessionStorage.getItem('emailId')
    	    					};
    					auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
        							   
    					     });
    			       },2000);
    				}
    				if(a.socType=='exe'){ 
    					/*certificate = auditService.ihmPdfService(certificateDatas,'Exemption');
						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');*/
						
    					var certificateExemptionBase64Data = '';
    					certificateIhmEx = auditService.ihmPdfService(certificateDatas,'Exemption');
    					pdfMake.createPdf(certificateIhmEx).getBuffer(function(buffer) {
    						var byteArray = new Uint8Array(buffer);
    						var length = byteArray.byteLength;
    						for (var i = 0; i < length; i++) {
    							certificateExemptionBase64Data += String.fromCharCode(byteArray[i]);
    						}
    					});
    					
    				  $timeout(function(){
    					  var fileByte = [];
    				          fileByte = certificateExemptionBase64Data ? btoa(certificateExemptionBase64Data) : '';
    				          var auditSubTypeDesc = newCertificate[0].auditSubTypeId == 1001 ? 'INITIAL' :'AMENDMENT';
  		    			 var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
    				      var parameter = {
    	    						'fileName'   : finalFileName_,
    	    						'fileByte'   : fileByte,
    	    						'reportName' : 'CertificateEx',
    	    						'userName'	 : sessionStorage.getItem('emailId')
    	    						
    	    					};
    					auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
        							   
    					     });
    			       },2000);	
    				 }
					}
    			});
					
				blockUI.stop();
			
			},2000);
    		
    	}
        
        
        
        
        function downloadCertificate (res){
        	blockUI.start("Preparing Certificate");
    		console.log("sequence Number",res);
    		auditFactory.qrCodeGenerator(CERTI_URL+res.qid).$promise.then(function(response){

				det.qrCodeData= response.data;

				if(res){

					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue =[], intermediateReissue= [];

					var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
					if(res.auditTypeId == AppConstant.IHM_TYPE_ID){
						if(auditDate=="Invalid date")
							auditDate =moment(new Date(),MMMDDYYYY).format(YYYYMMDD);
					}
					
					certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
						console.log(resp);
						
						downloadIHMCertificate(resp,response,res.certificateId,res);
	    			});
					// getAuditCertificateInActive
					/*if(res.getExactActiveStatus == 1 || res.activeStatus == 'Active'){
						console.log("Active status");
						detailsFactoryIhm.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate).$promise.then(function(result){
							console.log(result);
							downloadAllCertificate(result,res,response,"active");
						});
					}else{
						console.log("In-Active status");
						detailsFactoryIhm.getAuditCertificateInActive(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate).$promise.then(function(result){
    						
    						if(result.length == 0){
								detailsFactoryIhm.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate).$promise.then(function(result){
									downloadAllCertificate(result,res,response,"extent-inactive");
								});
							}else{
								
							downloadAllCertificate(result,res,response,"inactive");
							}
        				});
					}*/
				}else{
					blockUI.stop();
				}

			});
    		
        }
        
        function downloadIHMCertificate(res,response,certificateId,currRes){
    		console.log(res)
			var certificate;
    		
    		var newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue1 =[],additionalReissue2 =[],renewalEndorse1 = [];
	    	var currInitialPage=[],reissCert=0,additionalReissue3 =[], intermediateReissue1= [],additional1=[],additional2=[],additional3=[],intermediate1=[];
	    	
    		var certResult = res.result,hkCertOrcerNo=0,euCertOrcerNo=0,exeCertOrcerNo=0,add1CertOrderNO=0,add2CertOrderNO=0,add3CertOrderNO=0;
    		
    		var statusExt = currRes.socType;
    		if(statusExt=='EU')
    			statusExt='eu';
    		else if(statusExt=='HK')
    	    	statusExt='hk';	
    	    else if(statusExt=='Exemption')
    	       	statusExt='exe';
    	       		
    	     var activeStatus;
    	     if(currRes.activeStatus==0)
    	    	 activeStatus = 'inactive'
    	     else if (currRes.activeStatus==1)
    	    	 activeStatus = 'active'
    	    		 
    	    		 
    		
			certResult.forEach(function(a,index){
				
				var ecreasonName= _(det.getEcGrantedReason).chain().where({'reasonId':a.condEcGrant}).pluck("ecGrantedReason").toString();
				
				if(a.certificateId==certificateId){
					
					if(a.socType=='hk' && a.certOderNo > hkCertOrcerNo)
						hkCertOrcerNo=a.certOderNo;
					else if(a.socType=='eu' && a.certOderNo > euCertOrcerNo)
						euCertOrcerNo=a.certOderNo;
					else if(a.socType=='exe' && a.certOderNo > exeCertOrcerNo)
						exeCertOrcerNo=a.certOderNo;
				}
				
				if(a.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM && a.socType==statusExt){
					if(a.certOderNo<=currRes.certOderNo){
						if(a.socType==statusExt && a.certOderNo > add1CertOrderNO && add1CertOrderNO==0)
							add1CertOrderNO = a.certOderNo;
						if(a.socType==statusExt && a.certOderNo > add2CertOrderNO && add2CertOrderNO==0 && a.certOderNo > add1CertOrderNO && add1CertOrderNO!=0)
							add2CertOrderNO = a.certOderNo;
						if(a.socType==statusExt && a.certOderNo > add3CertOrderNO && add3CertOrderNO==0 && a.certOderNo > add2CertOrderNO && add2CertOrderNO!=0)
							add3CertOrderNO = a.certOderNo;
					}
				}
				
				if(a.certIssueId==det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM){
					if(a.certOderNo<=currRes.certOderNo)
						reissCert = a.certOderNo;
				}
				
				if(a.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM){
					if(a.certIssueId ==1005){
						a.addReissue = true;	
					}
						
				else
					a.addReissue = false;
				}
				
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
							
							a.renewalRegulation = a.renewalRegulation ?a.renewalRegulation : '';
							
							a.condEcGrant = ecreasonName;
							
									
			});
    			certResult.forEach(function(a){
    				
    				if(a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' ){
    					
    					(a.socType==statusExt && a.certificateLink==currRes.certificateLink) ? currInitialPage={0:a} : '';
    					(a.socType==statusExt && a.certificateLink==currRes.certificateLink) ? newCertificate={0:a} : '';
    				}
    				if(a.certIssueId == det.AppConstant.EXTENSION_IHM){
						
						(a.socType==statusExt && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? extension={0:a} : '';
						//extension={0:a};
					}
					
				   else if(a.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM){
							
							(a.socType==statusExt && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? renewalEndorse1={0:a} : '';
							//renewalEndorse1={0:a};
					}
					
				   else if (a.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM){
						
						(a.socType==statusExt && a.certOderNo<=currRes.certOderNo && a.certificateLink==currRes.certificateLink) ? renewalEndorse2={0:a} : '';
						//renewalEndorse2={0:a};
					}
				   else if (a.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM){
						
					 /*  (a.certOderNo<=currRes.certOderNo ) ? additional1={0:a} : '';
						(a.certOderNo<=currRes.certOderNo ) ? additional2={0:a} : '';
						(a.certOderNo<=currRes.certOderNo ) ? additional3={0:a} : '';	*/
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
					'expirydate'	:(newCertificate[0].certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedExpireDate  : newCertificate[0].certExpireDate,
					'auditplace'	:newCertificate[0].auditPlace,
					'certissuedate'	:(newCertificate[0].certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM) ? newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
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
									'seal':newCertificate[0].seal ? newCertificate[0].seal : '',
									'title':newCertificate[0].title ? newCertificate[0].title : '',
											'certificateDetails':certResult,
											'intermediateReissue':intermediateReissue1,
											'crossLineStatus':activeStatus,
											'currentCertiObj':certResult[0],
											'renewalEndorse1':renewalEndorse1,
											'ihmDocumentNo':certResult[0].ihmDocumentNo?certResult[0].ihmDocumentNo:(newCertificate[0].ihmDocumentNo ? newCertificate[0].ihmDocumentNo :''),
											'condEcGrant':certResult[0].condEcGrant ?certResult[0].condEcGrant:'' ,
											'completionSurveyDate':certResult[0].completionSurveyDate ? certResult[0].completionSurveyDate :'',
											'voyageEcGrant' : certResult[0].voyageEcGrant ?  certResult[0].voyageEcGrant :''
											
			} 
	
			$timeout(function(){
				
				certResult.forEach(function(a){
    				if(a.certificateId==certificateId){
    					/*var status;
    					if(a.socType=='hk')
    						status='HK';
    					else if(a.socType=='eu')
    						status='EU';
    					else if(a.socType=='exe')
    						status='Exemption';*/
    					if(a.socType=='hk' && hkCertOrcerNo==a.certOderNo){
    						certificate = auditService.ihmPdfService(certificateDatas,'HK');
    						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
    					}
    					else if(a.socType=='eu' && euCertOrcerNo==a.certOderNo){
    						certificate = auditService.ihmPdfService(certificateDatas,'EU');
    						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
    					}
    					else if(a.socType=='exe' && exeCertOrcerNo==a.certOderNo){
    						certificate = auditService.ihmPdfService(certificateDatas,'Exemption');
    						pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
    					}
    						
    				}
    			});
					
				blockUI.stop();
				toaster.success('Certificate downloaded successfully');
			
			},2000);
    		
    	}
        
        
        function downloadAllCertificate(result,res,response,txt){
	    	var newCertificate=[], renewalEndorse1 = [],renewalEndorse2 = [],extension =[],additionalReissue1 =[],additionalReissue2 =[];
	    	var currInitialPage=[],additionalReissue3 =[], intermediateReissue1= [],additional1=[],additional2=[],additional3=[],intermediate1=[];
			var overallAddCnt=0,overallInterCnt=0;
			console.log(res)
			var auditSubTypeId = det.auditSubTypeId,
			certificaIssueId = det.certIssueId,
			tempAuditSeqNo = det.auditSeqNo;
			var latestNumber = [];
			
			
			
			var latestAudit=res;
			var certResult =result;
			if(res.certIssueId==1008)
				certResult.forEach(function(a,index){
					if(a.certIssueId==1008){//reissue and extension
						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
					}
				
				});
			if(res.certIssueId==1003)
				certResult.forEach(function(a,index){
					if(a.certIssueId==1003){//reissue and extension
						certResult[index+1] && certResult[index+1].certificateNo == certResult[index].certificateNo ?(certResult[index+1].certIssueId==1008 ?(certResult[index].certOderNo=res.certOderNo,certResult[index+1].certOderNo=res.certOderNo):''):'';
					}
				
				});
			certResult.sort(function(c, d){
	            return c.auditSeqNo - d.auditSeqNo || c.seqNo - d.seqNo ;
	        });
			
			certResult.forEach(function(a){
				if(a.certIssueId==1008 && a.seqNo==1)
    				a.getEndrosedCount=0
				if(a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' ){
					(a.certOderNo<=res.certOderNo) ? currInitialPage={0:a} : currInitialPage.length==0 ? ' ' : currInitialPage[0];
				}
				if(result.length==1 && (result[0].auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || result[0].auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID)){
					currInitialPage={0:a}
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
				if(a.auditTypeId ==det.AppConstant.IHM_TYPE_ID && a.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){//IHM Amendment
					 if(a.auditSubTypeId === det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && a.certIssueId==1005 && a.getEndrosedCount==1){
						latestNumber.push(a.auditSeqNo);
						overallAddCnt++;
						a.overallAddCnt=overallAddCnt;
					 }
				}
				if(a.auditTypeId ==det.AppConstant.IHM_TYPE_ID){
					if(a.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1){
						overallAddCnt++;
						a.overallAddCnt=overallAddCnt;
						a.addReissue = true;
						
					}
					else
						a.addReissue = false;
				}
							
				if(a.auditSubTypeId === det.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId==1005 && a.getEndrosedCount==1){
					if(a.auditSubTypeId === det.AppConstant.ADDITIONAL_SUB_TYPE_ID)
						latestNumber.push(a.auditSeqNo);
					overallAddCnt++;
					a.overallAddCnt=overallAddCnt;
				}	
				
				if(a.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID)
					a.initialAvail = true;
				else
					a.initialAvail = false;
				
				if(a.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId==1004 && a.getEndrosedCount==1){
					overallInterCnt++;
					a.overallAddCnt=overallAddCnt;
					a.overallInterCnt=overallInterCnt;
				}
				 
				
				if((a.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1)){
					
					overallInterCnt++;
					a.overallInterCnt=overallInterCnt;
					a.overallAddCnt=overallAddCnt;
					a.interReissue = true;
					a.addReissue = true;
				}
				else
					a.interReissue = false;
				
				if(a.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && a.auditStatusId != 1004){
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
	
			 
				 
					if(a.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && currInitialPage[0] ? (currInitialPage[0].certificateNo==a.certificateNo):true){
							
					   if(a.certIssueId == det.AppConstant.EXTENSION){
								if(a.certIssueId == certificaIssueId){
									a.withoutCross = true;
								}else{
									a.withoutCross = false;
								}
								(a.certOderNo<=latestAudit.certOderNo) ? extension={0:a} : '';
						}
						
					   else if(a.certIssueId == det.AppConstant.RENEWAL_ENDORSED1){
								if(a.certIssueId == certificaIssueId){
									a.withoutCross = true;
								}else{
									a.withoutCross = false;
								}
								(a.certOderNo<=latestAudit.certOderNo) ? renewalEndorse1={0:a} : '';
						}
						
					   else if (a.certIssueId == det.AppConstant.RENEWAL_ENDORSED2){
							if(a.certIssueId == certificaIssueId){
								a.withoutCross = true;
								}else{
								a.withoutCross = false;
								}
							(a.certOderNo<=latestAudit.certOderNo) ? renewalEndorse2={0:a} : '';
						}
					}
					if(a.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
						 
						if(a.overallAddCnt==1 && overallInterCnt<=1){
							(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?additional1={0:a}:'';
							(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue1={0:a}:'';
						}else if(a.overallAddCnt==2 && overallInterCnt<=1){
							(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1005)?additional2={0:a}:'';
							(a.certOderNo<=latestAudit.certOderNo) && (a.certIssueId  == 1008)?additionalReissue2={0:a}:'';
						}

					}
					
				newCertificate[0]=currInitialPage[0]?(currInitialPage[0]):res;//res value for certificate without review
			 	
				
			});	
			console.log("DetailscertDetails",result);
			console.log("newCertificate",newCertificate);
			
			det.signature = result;
			
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
									'seal':newCertificate[0].seal ? newCertificate[0].seal : '',
									'title':newCertificate[0].title ? newCertificate[0].title : '',
											'additionalReissue1':additionalReissue1,
											'additionalReissue2':additionalReissue2,
											'additionalReissue3':additionalReissue3,
											'certificateDetails':result,
											'intermediateReissue':intermediateReissue1,
											'crossLineStatus':txt,
											'getEndrosedCountLatest':getEndrosedCountLatest,
											'renewalEndorse1':renewalEndorse1,
											'currentCertiObj':res,
											'ihmDocumentNo':res.ihmDocumentNo?res.ihmDocumentNo:(newCertificate[0].ihmDocumentNo ? newCertificate[0].ihmDocumentNo :''),
											'condEcGrant':result[0].condEcGrant ?result[0].condEcGrant:'' ,
											'completionSurveyDate':result[0].completionSurveyDate ? result[0].completionSurveyDate :'',
											'voyageEcGrant' : result[0].voyageEcGrant ?  result[0].voyageEcGrant :''
			} 
				console.log("INITIAL AUDIT DATE TRIGGERD");
				var a = result ?  _.min(result, function(find){  return   find.auditSeqNo; }) : '';
				certificateDatas.auditDate = a.auditDate;
				console.log(certificateDatas);
			if(det.auditTypeId == det.AppConstant.IHM_TYPE_ID){
				certificateDatas.res.issuerSign =result[0].issuerSign;
				certificateDatas.res.auditPlace = result[0].auditPlace;
			}
	 
			
			
			//certificateDatas.qrCodeUrl = CERTI_URL + res.qid;
			console.log(certificateDatas.qrCodeUrl);
			var certificate;
			var certificateIhmHk = '';
			var certificateIhmEu = '';
			var certificateIhmEx = '';
			
		$timeout(function(){
			if(certificateDatas.AuditTypeId == AppConstant.IHM_TYPE_ID){
					   certificate = auditService.ihmPdfService(certificateDatas,'HK');
					   pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
					 //Dont Delete
					 var certificateHkBase64Data = '';
					 certificateIhmHk = auditService.ihmPdfService(certificateDatas,'HK');
					 pdfMake.createPdf(certificateIhmHk).getBuffer(function(buffer) {
							var byteArray = new Uint8Array(buffer);
							var length = byteArray.byteLength;
							for (var i = 0; i < length; i++) {
								certificateHkBase64Data += String.fromCharCode(byteArray[i]);
							}
						});
						
					  $timeout(function(){
						    var fileByte = [];
		    				    fileByte = certificateHkBase64Data ? btoa(certificateHkBase64Data) : '';
		    				var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
		    				
							var parameter = {
		    						'fileName'   : finalFileName_,
		    						'fileByte'   : fileByte,
		    						'reportName' : 'CertificateHk',
		    						'userName'	 : sessionStorage.getItem('emailId')
		    					};
						auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
	    							   
						     });
				       },2000);	
					
					
					certificate = auditService.ihmPdfService(certificateDatas,'EU');
					pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
					
					 var certificateEuBase64Data = '';
					 certificateIhmEu = auditService.ihmPdfService(certificateDatas,'EU');
					 pdfMake.createPdf(certificateIhmEu).getBuffer(function(buffer) {
							var byteArray = new Uint8Array(buffer);
							var length = byteArray.byteLength;
							for (var i = 0; i < length; i++) {
								certificateEuBase64Data += String.fromCharCode(byteArray[i]);
							}
						});
					
				  $timeout(function(){
					  var fileByte = [];
  				          fileByte = certificateEuBase64Data ? btoa(certificateEuBase64Data) : '';
  				      var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
					  var parameter = {
	    						'fileName'   : finalFileName_,
	    						'fileByte'   : fileByte,
	    						'reportName' : 'CertificateEu',
	    						'userName'	 : sessionStorage.getItem('emailId')
	    					};
					auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
    							   
					     });
			       },2000);
					
				
					certificate = auditService.ihmPdfService(certificateDatas,'Exemption');
					pdfMake.createPdf(certificate).download(certificateDatas.certificateNo + '.pdf');
					
					var certificateExemptionBase64Data = '';
					certificateIhmEx = auditService.ihmPdfService(certificateDatas,'Exemption');
					pdfMake.createPdf(certificateIhmEx).getBuffer(function(buffer) {
						var byteArray = new Uint8Array(buffer);
						var length = byteArray.byteLength;
						for (var i = 0; i < length; i++) {
							certificateExemptionBase64Data += String.fromCharCode(byteArray[i]);
						}
					});
					
				  $timeout(function(){
					  var fileByte = [];
				          fileByte = certificateExemptionBase64Data ? btoa(certificateExemptionBase64Data) : '';
				      var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
				      
				      var parameter = {
	    						'fileName'   : finalFileName_,
	    						'fileByte'   : fileByte,
	    						'reportName' : 'CertificateEx',
	    						'userName'	 : sessionStorage.getItem('emailId')
	    					};
					auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
    							   
					     });
			       },2000);	
				  
			}
			toaster.success('Certificate downloaded successfully');
			blockUI.stop();
			},2000);}
	
			
        
        function downloadFile(blob, fileName) {
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
    		  toaster.success('Certificate downloaded successfully');
      	}
        
        
        function converBase64toBlob(content, contentType) {
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
	    	  return blob;
	    	}
        
        
        /***** on screen load on getting audit details *****/
    	function setAuditSCreen(callBack){ 
    	
    		if (det.auditSeqNo) {
    			 
    			$state.current.data.pageTitle = "UPDATE "+auditType[det.auditTypeId].src ;
    			
    			det.startState = det.AppConstant.UPDATE;
    			
        		det.auditCreate = false;
        		
        		det.auditCreateUpdate = det.AppConstant.UPDATE;
        		
        		
    			detailsFactoryIhm.getAuditDetailForIhm(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
    				
    				console.log(res);
    				
    				masterFactory.getCurrentUserDetail(res.auditAuditorDetail[0].userId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    				var officialId=res[0].officialId;
    				console.log(officialId)
	    				detailsFactoryIhm.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
	    				.then(function(data) {
	    					det.signerName = data.signer;
	    					console.log(det.signerName)
	    				});
    				});
    				
    				det.certInactive = res.auditSummaryId;
    				if(res.auditTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID|| res.auditTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID || res.auditTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID)
					{
					
			if(res.certificateDetail.length>0 &&  res.certExpireDate && res.certificateDetail[0].extendedExpireDate){
				res.certExpireDate =  res.certificateDetail[0].extendedExpireDate  ? res.certificateDetail[0].extendedExpireDate : res.certificateDetail[0].certExpireDate ? res.certificateDetail[0].certExpireDate : res.certExpireDate ;
				 res.certIssueDate =  res.certificateDetail[0].extendedIssueDate    ? res.certificateDetail[0].extendedIssueDate :  res.certificateDetail[0].certIssueDate  ?  res.certificateDetail[0].certIssueDate : res.certIssueDate;
				  
			}
					}
    			
    				
    				if(res.auditTypeId==det.AppConstant.IHM_TYPE_ID )
    					{
    				if(res.openMeetingDate)
					{
					det.ValidationForReceiptLetter=true;
					}
				else
					{
					det.ValidationForReceiptLetter=false;
					}
    				
    					}
    				
    				if(det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID && res.auditStatusId == det.AppConstant.REOPEN) {
    					det.narrativeSumStatus = true;
						det.disableNarativeSummary(); 
					}
    				
    				if(det.userRoleId ==det.AppConstant.OBSERVER_ROLE_ID && res.lockStatus==det.AppConstant.RETRIEVE_STATUS){
  						 toaster.warning('Current '+det.auditType+' is retrieved in the Laptop/Mobile '+det.auditType+' Application by   '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString()); 
  					    }
  					    
    				/**** checking lock Holder of current Audit/Inspection/Review ****/
    				if(res.lockHolder){
    					/*** locked ****/
    					det.enabled = true;
    					det.lockHolder = res.lockHolder;
    					
    					if(res.lockHolder == sessionStorage.getItem('emailId')){
    						/****current user locked****/
    						det.lockDisable=false;
    						
    						if((det.userRoleId == det.AppConstant.ADMIN_ROLE_ID || det.userRoleId == det.AppConstant.MANAGER_ROLE_ID) && res.auditStatusId!=det.AppConstant.REOPEN){
    							det.disableNarativeSummary(); 
    						}
    					
    					}else{
    						/****other user locked****/
    						det.lockDisable = (det.userRoleId == det.AppConstant.ADMIN_ROLE_ID) ? false:true;
    						det.lockStatus = true;
    						
    						if(_(auditorName).chain().where({'emailId':res.lockHolder}).pluck('firstName').toString()){
    	 						
    	 						toaster.warning('Current '+det.auditType+' Locked by '+_(auditorName).chain().where({'emailId':res.lockHolder}).pluck('firstName').toString()+' '+_(auditorName).chain().where({'emailId':res.lockHolder}).pluck('lastName').toString());
    						}else{
    							detailsFactoryIhm.getCurrentUserDetail(res.lockHolder,det.companyId).$promise.then(function(data){
    								if(data.length>0){
    									toaster.warning('Current '+det.auditType+' Locked by '+ data[0].firstName +' '+data[0].lastName);
    		    					}
    							});
    						}
    						
    						//toaster.warning('Current '+det.auditType+' is Locked by '+_(auditorName).chain().where({'emailId':res.lockHolder}).pluck('firstName').toString()+' '+_(auditorName).chain().where({'emailId':res.lockHolder}).pluck('lastName').toString());
    					}
    					
    				}else{
    					/*** Not locked and this Audit/Inspection/Review visible to only Participant AUDITORS and ADMIN and MANAGER on COMMENCED/OPEN status****/
    					det.enabled = false;
    					det.lockDisable=false;
    					det.lockStatus=true;
    				}
    				console.log(det.lockStatus)
    				if(det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID && res.auditStatusId == det.AppConstant.REOPEN) {
						det.disableNarativeSummary(); 
					}
    				
    				/**** checking LaptopRetrieve Status of current Audit ****/
    				if(res.lockStatus==det.AppConstant.RETRIEVE_STATUS && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
    					
    					det.lockStatus = true; 
    					det.enabled = true;
    					det.lockDisable=true;
    					toaster.warning('Current '+det.auditType+' is retrieved in the Laptop/Mobile '+det.auditType+' Application by   '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString());
    				
    				}else if(res.lockStatus == det.AppConstant.OPENFORCAR){
    					
    					if(!det.enabled &&  det.userRoleId!=det.AppConstant.OBSERVER_ROLE_ID ){
    						
    						toaster.warning('Apply lock to Proceed');
    					}
    					
    				}else{
    					
    					if(!det.enabled &&  det.userRoleId!=det.AppConstant.OBSERVER_ROLE_ID ){
    						
    						toaster.warning('Apply lock to Proceed');
    						
    					}else if(res.auditStatusId == det.AppConstant.VOID_AUDIT_STATUS){
    						
    						det.lockStatus = true;
    					
    						det.lockDisable = (det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID) ? true : false;
    					}
    				}
    				
    				if(res.lockStatus==det.AppConstant.LINKED_WITH_MLC && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
  						 toaster.warning('Current '+det.auditType+' is linked in MLC Inspection'); 
  					}
    			
    				det.setAuditData(res,function(){
    					
    					
        if(det.auditCreate == false){
        	var officialId = '';
      		
    		detailsFactoryIhm.getCurrentUserDetail(_(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('userId').toString(),det.companyId).$promise.then(function(data){
    			
 			if(data.length>0 && data[0].managerOfficialId){
 				
 				officialId = data[0].managerOfficialId;
 				
 				detailsFactoryIhm.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(response){
 			

 		   			det.title = response.title;
 		   		
 		  	det.leadSignReceiptLtr=response.signature;
 		   			
 		   		 });
 			}
    		}); 
        	}
        });
    				
    				$timeout(function(){
        				det.openForCar = $state.params.openForCar || res.lockStatus==det.AppConstant.OPENFORCAR ? true:false;
        			},10);
    				console.log(res);
    		 
    				det.auditDetail.sspReviewDetail[0] = res.sspReviewDetail[0];
				    if(res.certIssueDate && res.sspReviewDetail[0].sspRevisionNo){
				    	det.ValidationForReviewLetter=true;
				    }else{
					    det.ValidationForReviewLetter=false;
					}
				 
    				
				/*detailsFactoryIhm.getDMLCReportNos(res.vesselImoNo,det.companyId, det.auditTypeId).$promise.then(function(res){
    				det.dMLCReportNos = angular.copy(res);
    				console.log(det.dMLCReportNos);	   	          			   	
        		});*/
				
    		});
    			
    			
    		
    			
    		}else{ 
    			
    			det.userRelatedToAdt = true;
    			
    			var currLoginUserDtl = _.findWhere(auditorName, {'emailId' : det.loginUserId});
    			
    			$state.current.data.pageTitle = "CREATE "+auditType[det.auditTypeId].src ;
    		
    			det.auditDetail = {	
    					'auditTypeId':det.auditTypeId,
    					'companyId' : sessionStorage.getItem('companyId'),
    					'auditStatusId':'',//det.AppConstant.COMMENCED_AUDIT_STATUS,
    					'leadAuditorName': (det.userRoleId==det.AppConstant.MANAGER_ROLE_ID || det.userRoleId==det.AppConstant.IHM_MANAGER_ROLE_ID )?'':currLoginUserDtl.firstName+' '+currLoginUserDtl.lastName,
    					'leadAuditorId':(det.userRoleId==det.AppConstant.MANAGER_ROLE_ID || det.userRoleId==det.AppConstant.IHM_MANAGER_ROLE_ID)?'':currLoginUserDtl.sequenceNo,
    					'docFlag' :	det.AppConstant.DEFAULT_DOC_FLAG,
    		    		'lockStatus' : det.AppConstant.NOT_RETRIEVE_STATUS,
    		    		'reviewStatus' : det.AppConstant.REVERT_REVIEW_STATUS,
    		    		'grt':det.vesselDetail.grt?det.vesselDetail.grt:'',
    		    		'allowNext':det.AppConstant.NOTACCEPT,
    		    		'makeFinal':det.AppConstant.NOTACCEPT,
						'scope' : det.scopeId,
						'title':det.title,
						'auditPlace': det.ihmUserDetails ? det.ihmUserDetails.location : '',
    					'auditAuditorDetail':[{
    										'userId' : det.loginUserId,
    		    			
    										'auditorName' :(det.userRoleId==det.AppConstant.MANAGER_ROLE_ID || det.userRoleId==det.AppConstant.IHM_MANAGER_ROLE_ID)?'' : currLoginUserDtl.firstName+' '+currLoginUserDtl.lastName,
    		    			
    										'auditRoleID' : det.AppConstant.AUDIT_AUDITOR_ROLE_ID,
    										
    										'auditRoleDesc' : det.auditorType ,
    		    			
    										'audSignature' : '',
    		    			
    										'audSignatureDate' : moment(new Date()).format(MMMDDYYYY),
    		    			
    										'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS,
    		    			
    										'check' : false,
    		    			
    										'showSignatureButton' : true,
    							
    										'companyId' : det.companyId,
    										
    										'userIns' : (sessionStorage.getItem('emailId')).toString(),
    					    				
    					    				'dateIns' : moment(new Date()).format(YYYYMMDD),
    					    				
    					    				'delegateSign':0,
    		    							}],
    					'auditRptAttach':[],
    					'auditDate' : moment(new Date()).format(MMMDDYYYY),
    					'sspReviewDetail':[],
    					'auditFinding' : [],
    					'certificateDetails':[]
    					
    					};
    			
    		
    			det.auditDetail.auditDate =   '';
    			
    			det.auditDetail.vendorName='NA';
    			det.auditDetail.vendorAddress='NA';
    			
    			det.maxDmlc1issueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
    			
    			
    			
    			det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
    			
    			_.countFindingCategory(det.auditDetail.auditFinding,det.auditDetail.auditTypeId,"CURR",det.obsCategoryOptions);
    			
    			_.countFindingCategory(det.observationarrayprevious,det.auditDetail.auditTypeId,"PREV",det.obsCategoryOptions);
    			
    			//_.countFindingCategory(det.auditDetail.auditFinding,det.observationarrayprevious,det.auditDetail.auditTypeId,det.obsCategoryOptions);
    			det.setDefaultSummaryDate();
    			
    			callBack();	
    		}

    		 
    		auditFactory.getReportData(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
          	 
          		res.forEach(function(list){
          					var newAuditDate=moment(list.STATUS_DATE).format('L');
          					var formatedDate=moment(newAuditDate).format('DD-MMM-YYYY');
          					list.AUDIT_DATE = (list.VERSION_ID==1003 || list.VERSION_ID==1004) ? formatedDate : det.auditDetail.auditDate ? det.auditDetail.auditDate : '-';
      	            		list.AUDIT_PLACE = list.AUDIT_PLACE?decodeURIComponent(atob(list.AUDIT_PLACE)):'';
      	    				list.VERSION_TYPE = list.VERSION_ID == 1001 ?"Creation Of Review": "Reviewer Signature";
      	         });
          		
          		det.reportHisList = res;
          		
 

        	  });
    		
    	}// end of setAuditSCreen()
        
        function typeCheck(){
        	 
    			$state.current.data.pageTitle = 'IHM Part I Review';

                det.auditType    = 'Review';
                
                det.auditDate 	 = 'Approval'; 

                det.auditorType  = 'Reviewer';

                det.certType     = 'Letter';

                det.openMettingDate = 'Receipt Date';

                det.revsionNo = 'IHM Part I Revision No.';

                det.clseMetingdate = 'IHM Part I Issue Date';

                det.summaryHead    = 'The undersigned has carried out the IHM Part Ireview pursuant;';

                det.auditauditType ='IHM Part I';
                
                det.reportletter  = 'Print Report';
                
                det.apreletter = 'Approval Letter';
                
                det.FindingButton='Review Notes';
               
                det.sspLetterHistDate='IHM Part I Issue Date';
                
                det.ltrHistAuditor='Reviewer';
                
                det.certiletter   = 'Certificate';
                
                det.expiredate   = 'Expiry Date';
                
                det.additionalSurvey = 'Additional Survey';
                
                det.apreAmendletter='Amendment Approval Letter';
                
              
       }// typeCheck end
        
      
        function onChangeAuditStatus(oldValue){
        	 
        	det.AuditDetailForm.$dirty=true;
        	det.oldValue=oldValue;
        	console.log(det)
    	  var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
		  if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY))
		  {
			   det.receiptStart=true;									//added by ramya for jira id-->IRI-5299
		  }
        	if( (det.userRoleId == det.AppConstant.MANAGER_ROLE_ID || det.userRoleId == det.AppConstant.IHM_MANAGER_ROLE_ID ) && det.auditDetail.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS  && det.auditCreate){
        		det.managerCreatingAudit =true;
        		det.managerCreatedAuditFlag = true;
        		toaster.warning("Please Add Lead Auditor to Create  "+Review);
        		 
    		}
        	
        	
        	if(det.auditDetail.auditStatusId == det.AppConstant.VOID_AUDIT_STATUS){
        		 if(det.nextAdtCreated){
        			 det.auditDetail.auditStatusId = oldValue;
        		     toaster.warning('Next Review has been created');
    			}else{
        		     det.reasonForVoidReopen('void'); 
        		}
        		 det.vesselUpdate = true;
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && det.oldValue!=det.AppConstant.REOPEN){		//Changed by @Ramya on 8-8-2022 for Jira id - IRI-5406
        		var certStatusEU = false,certStatusHk=false,certStatusExe=false;
        		var certValidation = true;
        		if(det.auditDetail.certificateIhmDetail && det.auditDetail.certificateIhmDetail.length>0){
        			
	        			var eucert=0,hkcert=0,execert=0,eucer=[],hkcer=[],execer=[];
	        			det.auditDetail.certificateIhmDetail.forEach(function(a){
	        				if(eucert<a.certOderNo && a.socType == 'eu'){
	        					eucert = a.certOderNo;
	        					a.socName = 'HK/EU'
	        					eucer = angular.copy(a);
	        				}
	        				if(hkcert<a.certOderNo && a.socType == 'hk'){
	        					hkcert = a.certOderNo;
	        					a.socName = 'HK/EU'
	        					hkcer = angular.copy(a);
	        				}
	        				if(execert<a.certOderNo && a.socType == 'exe'){
	        					execert = a.certOderNo;
	        					a.socName = 'EXEMPTION'
	        					execer = angular.copy(a);
	        				}
	        				
	        			});
	        			if(eucert)
	        				certStatusEU = checkCertificateVesselDeatils(eucer, 'firstCheck');    
	        			
	        			if(hkcert)
	        				certStatusHK = checkCertificateVesselDeatils(hkcer, 'firstCheck');
	        			
	        			if(execert)
	        				certStatusExe = checkCertificateVesselDeatils(execer, 'firstCheck');
	        			
	        			if(certStatusEU || certStatusHk || certStatusExe){
	        				certValidation = false;
	        				det.auditDetail.auditStatusId = oldValue ? oldValue : '';
	        			}
	        			
	        			if(hkcert==0 && eucert==0 && det.auditDetail.auditSubTypeId != det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && det.auditDetail.additionalSurvey!="N.A"){
	        				certValidation = false;
	        				det.auditDetail.auditStatusId = oldValue ? oldValue : '';
	    	            	toaster.warning('Please Publish HK/EU Certificate');
	    	            }
	        			
	        			
        		}
	            else if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0){
	            	
		            	var eucert=0,hkcert=0,execert=0,eucer=[],hkcer=[],execer=[];
		            	
	        			det.auditDetail.certificateDetail.forEach(function(a){
	        				
	        				
		        				if(eucert<a.certOderNo && a.socType == 'eu'){
		        					eucert = a.certOderNo;
		        					a.socName = 'HK/EU'
		        					eucer = angular.copy(a);
		        				}
		        				if(hkcert<a.certOderNo && a.socType == 'hk'){
		        					hkcert = a.certOderNo;
		        					a.socName = 'HK/EU'
		        					hkcer = angular.copy(a);
		        				}
		        				if(execert<a.certOderNo && a.socType == 'exe'){
		        					execert = a.certOderNo;
		        					a.socName = 'EXEMPTION'
		        					execer = angular.copy(a);
		        				}
	        			});
	        			
	        			if(eucert)
	        				certStatusEU = checkCertificateVesselDeatils(eucer, 'firstCheck');     
	        			
	        			if(hkcert)
	        				certStatusHk = checkCertificateVesselDeatils(hkcer, 'firstCheck');
	        			
	        			if(execert)
	        				certStatusExe = checkCertificateVesselDeatils(execer, 'firstCheck');
	        			
	        			if(certStatusEU || certStatusHk || certStatusExe){
	        				certValidation = false;
	        				det.auditDetail.auditStatusId = oldValue ? oldValue : '';
	        			}
	        			
	        			if(hkcert==0 && eucert==0 && det.auditDetail.auditSubTypeId != det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && det.auditDetail.additionalSurvey!="N.A"){
	        				certValidation = false;
	        				det.auditDetail.auditStatusId = oldValue ? oldValue : '';
	    	            	toaster.warning('Please Publish HK/EU Certificate');
	    	            }
	        			
	        			
	            }else if(det.auditDetail.auditSubTypeId != det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && det.auditDetail.additionalSurvey!="N.A"){
	            	certValidation = false;
					toaster.warning('Please Publish HK/EU Certificate');
	            }
        		if(certStatusEU || certStatusHk || certStatusExe)
        			det.auditDetail.auditStatusId = oldValue ? oldValue : '';
        		if(det.UpdateVesselRefreshed){
        				vesselDtlsCheck();
        				det.vesselUpdate = true;
        				det.auditDetail.auditStatusId = oldValue ? oldValue : '';
        		}else if(certValidation){
	        	//  det.auditDetail.auditStatusId = oldValue ? oldValue : det.AppConstant.COMPLETED_AUDIT_STATUS;
				var notAvlReport = _.filter(det.auditDetail.auditRptAttach, function(obj){ 
					return !obj.fileName ;
				});
				if(notAvlReport.length>0 && det.auditDetail.sspReviewDetail[0].ltrStatus==0 ){ 		//added by ramya for jira id-->IRI-5299
					if(det.attachSignValidation()){
					   det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
				   }
				}
		        		if(det.attachSignValidation() && !det.UpdateVesselRefreshed){ 
		        			console.log(det.auditDetail.sspReviewDetail[0].ltrStatus+" det.disabledApproveButton "+det.disabledApproveButton)
		        			console.log(det.receiptLtr+" "+det.receiptStart)
		        			console.log(reciptDate+" - "+moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD).format(DDMMMYYYY));
		        			
		        			if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==0 && !(det.disabledApproveButton)  ){
		        				det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		        				var msg= det.auditDetail.auditSubTypeId==det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID?'Approval Letter':'Amendment Approval Letter';
		        				toaster.warning('Please Generate '+msg+' ');
		   				   }else if((det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY) &&  (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY) ||  det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo)){
		   					    det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		   					    var msg = det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID ? 'Amendment Approval Letter' : 'Approval Letter'  ;
		   					       toaster.warning('Please Generate '+msg+' Again');
		   					       det.avoidReportModel=true;
		   				   }else if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD).format('DD-MMM-YYYY') && det.receiptStart && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
		   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		 					   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
		 					   toaster.warning('Please save the review and Generate '+msg+''); 																			//CHANGED BY RAMYA FOR JIRA ID-->IRI-5206
		   				   }else if(det.receiptLtr && det.receiptStart  && reciptDate==moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD).format(DDMMMYYYY)  && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
		   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
							   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
							   toaster.warning('Please save the review and Generate '+msg+''); 
		   					   det.avoidReportModel=true;
		   				   }else if(!validateReviewLetterWithAuditStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
		   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		   					   var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
		   					   toaster.warning('Please Generate '+msg+' ');
		   				   }else if(det.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && det.additionalSurveyChangeStatus ){
		   					   toaster.warning('Additional Survey Due Date has changed, Please publish the certificate. ');
		   				   }
		        		   
		        			if(det.completedStatusValidation('statusChange')){ 
		        				if(det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY) ||  det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo && det.receiptStart) ){
		        						det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		        				 }else if((det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY)&& !det.receiptStart && reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)|| (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY))){
		        					if(det.attachSignValidation()){
										det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
									} 
		                		 }else{
		        						if(!validateReviewLetterWithAuditStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && det.receiptStart){
                                            det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		        						}else if((det.receiptLtr && det.receiptStart) && reciptDate==moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY) && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
		     		   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		     		 					   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
		     		 					   toaster.warning('Please save the review and Generate '+msg+''); 
		     		   				    }else if(validateReviewLetterWithAuditStatus && !det.receiptStart   && det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==1){
		        							 if((det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY) && !det.auditDetail.auditDate){  
													det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
		        		      					    toaster.warning('Please Enter Approval Date ');
		        		      				   }else if(det.attachSignValidation()){
		        								 det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
		        							   }
		        						}
		        					}
		        				
		    					if(det.lengthOfFindingExceptObs()==0){
		    						det.auditDetail.allowNext = ((det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) && det.leadSign)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
		    						// det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;			
		            			}
              
		        			}else{
		            			det.auditDetail.auditStatusId = oldValue ? oldValue : '';
		            		}
	        			}
						else{
							det.auditDetail.auditStatusId = oldValue ? oldValue : '';
						}
        		}
				else{
						det.auditDetail.auditStatusId = oldValue ? oldValue : '';
				}
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS && det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY){
		  
    			if(det.attachSignValidation()){
    				if(det.completedStatusValidation('statusChange'))
    					det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
    				else
    					det.auditDetail.auditStatusId = oldValue ? oldValue : '';
    			}else
					det.auditDetail.auditStatusId = oldValue ? oldValue : '';
        	
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS && det.userRoleId != det.AppConstant.ADMIN_ROLE_ID && det.userRoleId!=det.AppConstant.MANAGER_ROLE_ID){
        		det.enableNarativeSummary(); 
        		det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
        		if(det.UpdateVesselAvailable)
        			det.vesselUpdate = false;
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.REOPEN){
        		var temp=true;
        		if(oldValue==det.AppConstant.COMMENCED_AUDIT_STATUS &&  det.userRoleId != det.AppConstant.AUDITOR_ROLE_ID ){
    				det.disableSave=true;
    				temp = false;
    				det.auditDetail.auditStatusId = oldValue;
    				toaster.warning(det.auditType+' Status should be Completed  to Reopen  ');
    			}
        		
        		
        		det.auditDetail.auditAuditorDetail.forEach(function(index){ 
        		if(index.auditRoleID==det.AppConstant.AUDIT_REVIEWER_ROLE_ID && index.audSignature && det.nextAdtCreated==false && temp){
        			   det.reasonForVoidReopen('Reopen');
        			   
        			}else if(index.auditRoleID==det.AppConstant.AUDIT_REVIEWER_ROLE_ID && !index.audSignature && temp){ 
        				toaster.warning('Reviewer sign missing ');
        				det.auditDetail.auditStatusId = oldValue;
        				det.disableSave=true;
        			}else if(det.auditDetail.reviewStatus == det.AppConstant.REVERT_REVIEW_STATUS && temp){
        				toaster.warning(' Reviwer sign is mandatory  to Reopen the Audit ');
        				det.auditDetail.auditStatusId = oldValue;
        				det.disableSave=true;
        			}else if(det.nextAdtCreated && temp){
        				det.disableSave=true;
        				det.auditDetail.auditStatusId = oldValue;
        				toaster.warning('Next '+det.auditType+' has been created');
        			} 
        			
        		});
        	 }
        	
        	if(det.auditDetail.auditStatusId != det.AppConstant.REOPEN && (det.userRoleId == det.AppConstant.MANAGER_ROLE_ID || det.userRoleId == det.AppConstant.ADMIN_ROLE_ID) ){
        		det.disableNarativeSummary();
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.REOPEN && (det.userRoleId == det.AppConstant.MANAGER_ROLE_ID || det.userRoleId == det.AppConstant.ADMIN_ROLE_ID) )
        	{ det.enableNarativeSummary(); }
         
		}// end of onChangeAuditStatus
        
        function auditReopen()
        {
        	if(det.auditReopnedStatus){
				det.AuditReopenEnableFields=true;
				det.disableSave=false; 
				det.enableNarativeSummary();
				
			}
        }
        
        
        function reasonForVoidReopen(value){
        	
        	det.reasonValue = value;
        	
    		ModalService.showModal({
    			
    			templateUrl : 'src/modals/reason.html',
    			
    			controller  : 'reasonController as reason',
    			
	            inputs : {
	            	
	            	scope:det
	            }
    		
    		}).then(function(modal) {
    			
    			modal.element.modal();
    			
	            modal.close.then(function(result) {
	            	
	            });
	            
    		});
        	
        }
        
        
        /***Avoid the space bar***/
    	function avoidWhiteSpace($event){
    		
    		if($event.keyCode == 32){
    			$event.stopPropagation();
    		}
    	}

        
    	
        /***** Audit/Inspection/Review Create/Update time, from selected Vessel ImoNo getting vessel and company details *****/
    	function setvesselImoNo(item){
             
    	/*if(item.tcApprovalStatus == '1'&& det.nextAdtCreated == false){
			toaster.warning('This Review is not approved. Please changes status to edit!);
			det.lockStatus = true;
    	}*/
			
    	if(item.tcApprovalStatus=="1" || item.tcApprovalStatus=="0"){
    		
    		if(item.tcApprovalStatus=="0" && det.auditCreate){
    		toaster.warning("TC Status is Pending");
    		}
    		
        	if(det.auditCreate){ 
        		 
 
        		//det.vesselImoNo = {'vesselImoNo':item.vesselImoNo};
        		det.vesselDetail = angular.copy(item);
        		
        	    det.reasonForVoidShow = true;
        		var flag = det.validateVessel();
        		
        		if(flag){det.lockStatus = true;}else{det.lockStatus = false; det.removeClass(); }
        		
        		det.vesselDetail.vesselTypeName = det.vesselDetail.vesselType ?  det.vesselDetail.vesselType : '';
        	    det.vesselCompanyDtl = angular.copy(item.vesselCompany);   
            	det.vesselCompanyDtl.docType =  (det.vesselCompanyDtl.docTypeNo && det.vesselDetail.docTypeNumber ) ? det.vesselCompanyDtl.docTypeNo +' '+ det.vesselDetail.docTypeNumber : '';
            	det.vesselCompanyDtl.docExpiry = det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,YYYYMMDD).format(MMMDDYYYY) : '';
           	
           
           	    /*if(det.vesselCompanyDtl.docExpiry &&  moment(det.vesselCompanyDtl.docExpiry,MMMDDYYYY).format(YYYYMMDD) < moment(new Date()).format(YYYYMMDD)){
            	  	toaster.warning('DOC has been expired');
            	}*/
           	    
           	    det.auditDetail.grt = det.vesselDetail.grt;
        	    det.auditDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry? moment(det.vesselDetail.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY):'';
         
        	    det.vesselDetail.operationCode = det.vesselDetail.operationCode ? det.vesselDetail.operationCode : 'NA';
        	    
        	    
        	    /*if(!det.vesselDetail.keelLaidDate || !det.vesselDetail.regOwnedImoNo || !det.vesselDetail.registeredCompanyName || !det.vesselDetail.registeredCompanyAddress){
      	      		
      	      		var msg;
      	      		if(!det.vesselDetail.keelLaidDate)
      	      			msg	= 'Keel Laid Date';
      	      		if(!det.vesselDetail.regOwnedImoNo)
      	      			msg += ', Register Owner IMO Number';
      	      		if(!det.vesselDetail.registeredCompanyName)
    	      			msg += ', Registered Company Name';
      	      		if(!det.vesselDetail.registeredCompanyAddress)
      	      			msg += ', Registered Company Address';
      	      		
      	      		ModalService.showModal({
      					
      		    		templateUrl : 'src/modals/docChanged.html', 
      		    			
      		    		controller  : 'docChangedController',
      		    			
      		    		inputs		: {data: msg + ' is Missing in RMI'},	    			
      		    		
      		    	}).then(function(modal) {
      		    			
      		    		modal.element.modal();
      		    			
      		    		modal.close.then(function(result) {
      		    			
      		    		});
      		    	});	
      	        	
    		  	    }*/
           	}else{
           		
             	var currVslDtl = _.findWhere(det.vesselArray, {'vesselImoNo' : item.vesselImoNo, 'companyId' : Number(det.companyId)});
        		var currCoDtl = _.findWhere(det.companyDetails, {'companyImoNo' : item.companyImoNo, 'companyId' : Number(det.companyId)});
        		if(det.UpdateVesselAvailable){
        			det.vesselDetail = {};
        			det.vesselDetail = angular.copy(item);
        		}
        		else
        			det.vesselDetail = angular.copy(currVslDtl);
        		
        		if(!det.UpdateVesselAvailable){
        			det.vesselDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry ? moment(det.vesselDetail.dateOfRegistry,'MMM DD, YYYY').format(YYYYMMDD) : '';
        			det.vesselDetail.operationCode = det.vesselDetail.operationCode ? det.vesselDetail.operationCode : 'NA';
        		}	
        			
        	    if(det.UpdateVesselAvailable){
        	    	det.vesselCompanyDtl = {};
        	    	 det.vesselCompanyDtl = angular.copy(item.vesselCompany);
        	    	 
        	    }
        	    else	
        	    	det.vesselCompanyDtl = angular.copy(currCoDtl); 
            	console.log(det.vesselCompanyDtl);
            	if(!det.vesselRefreshed){
	        		det.vesselDetail.vesselTypeName = currVslDtl.vesselType ? currVslDtl.vesselType : '';	
	        		det.vesselCompanyDtl.docType = currCoDtl.docTypeNo; //det.vesselDetail.docTypeNumber;// ( currCoDtl.docTypeNo && det.vesselDetail.docTypeNumber) ? currCoDtl.docTypeNo +' '+ det.vesselDetail.docTypeNumber : '';
	        		det.vesselCompanyDtl.docExpiry= det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,'MMM DD, YYYY').format(MMMDDYYYY) : '';
	        		
	        		
            	}
            	if(det.vesselRefreshed){
            		det.vesselDetail.vesselTypeName = det.vesselDetail.vesselType;	
	        		det.vesselCompanyDtl.docType = det.vesselCompanyDtl.docTypeNo; //det.vesselDetail.docTypeNumber;// ( currCoDtl.docTypeNo && det.vesselDetail.docTypeNumber) ? currCoDtl.docTypeNo +' '+ det.vesselDetail.docTypeNumber : '';
	        		det.vesselCompanyDtl.docExpiry= det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,'YYYY-MM-DD').format(MMMDDYYYY) : '';
	        		
            	}
        		
        		checkPreviousAuditDetailsIHM();
        	}
       
        	det.vesselDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry ? moment(det.vesselDetail.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
   
        	try{
    			det.vesselCompanyDtl.vesselCompanyName = det.vesselCompanyDtl.vesselCompanyName ?  decodeURIComponent(det.vesselCompanyDtl.vesselCompanyName) :'';
				
    			det.vesselCompanyDtl.vesselCompanyAddress = det.vesselCompanyDtl.vesselCompanyAddress ?  decodeURIComponent(det.vesselCompanyDtl.vesselCompanyAddress) :'';
			}
			catch(err){}
	
			det.vesselCompanyDtl.companyAddress = det.vesselCompanyDtl.vesselCompanyName+'\n'+det.vesselCompanyDtl.vesselCompanyAddress;    			
			
			det.cmpnyAdrs = det.vesselCompanyDtl.vesselCompanyAddress;//vesselCompanyAddress
    		
			det.cmpnyNme = det.vesselCompanyDtl.vesselCompanyName;//vesselCompanyName
			
			/*det.auditDetail.vesselNameAud =  det.vesselDetail.vesselName ? det.vesselDetail.vesselName : '';
			
			det.auditDetail.vesselTypeAud =det.vesselDetail.vesselTypeName ? det.vesselDetail.vesselTypeName : '';
    		
			det.auditDetail.officialNoAud = det.vesselDetail.officialNo  ?  det.vesselDetail.officialNo: ''; 
    		
			det.auditDetail.docTypeNoAud = det.vesselCompanyDtl.docType  ?  det.vesselCompanyDtl.docType : '';
    		
			det.auditDetail.docIssuerAud = det.vesselCompanyDtl.docIssuer  ?  det.vesselCompanyDtl.docIssuer : '';
    		
			det.auditDetail.docExpiryAud = det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,MMMDDYYYY).format(YYYYMMDD)  : '';
    		
			det.auditDetail.companyAddressAud = det.vesselCompanyDtl.companyAddress ?  det.vesselCompanyDtl.companyAddress  : '';		*/
    		    		
    		$('#veselimono').removeAttr('data-original-title');
           
            $('#veselimono').tooltip('hide');
           
            if(det.auditCreate){
            	
               det.sspDtlAvl = false;
               det.checkPreviousAuditDetails(); 
             
             }else if(!det.auditCreate && (currVslDtl.companyImoNo  != item.companyImoNo)){
            	 if(!det.vesselRefreshed){
	            	 det.vesselCompanyDtl.docTypeNo = item.companyDoc;
						
					 det.vesselCompanyDtl.docExpiry = item.docExpiry;
					
					 det.vesselCompanyDtl.docIssuer = item.docIssuer;
					 
					 det.vesselCompanyDtl.docType =item.companyDoc  +' '+ det.auditDetail.docTypeNumber; 
            	 }
			     /*if(det.userRoleId == det.AppConstant.AUDIT_AUDITOR_ROLE_ID && item.docFlag != det.AppConstant.ACCEPTED_DOC_FLAG && det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS){ 
					 
					 det.docChange(det.AppConstant.UPDATE);
				 }*/
             }
            if(!det.vesselRefreshed)
            	vesselDtlsCheck();
    	}else{
    		
    		var leadauditorMail = _.findWhere(det.audObsNameArray, {'sequenceNo':det.auditDetail.leadAuditorId, 'companyId' : Number(det.companyId)});
    		//toaster.warning("Vessel TC is not approved");
    		
    		  var data = {
    				emailId : leadauditorMail.emailId
    			};
    		
    		ModalService.showModal({
				templateUrl : 'src/modals/reason.html',
				controller : "tcApprovalController as reason",
				inputs : {
					scope : $scope,
					leadId:det.auditDetail.leadAuditorId,
					companyId:Number(det.companyId),
					vesselImoNum:det.vesselImoNo.vesselImoNo,
					vesselName:item.vesselName,
					companyImono:item.vesselCompany.companyImoNo,
					doctypeno:item.vesselCompany.docTypeNo
						
					
				}
			}).then(function(modal) {
				modal.element.modal();
				modal.close.then(function(result) {
				});
			});
  
    		detailsFactoryIhm.tcApprovalStatus(data,det.companyId,item.vesselImoNo);
    		
    		}
    	if(det.vesselRefreshed)
			det.saveAuditData('Data saved successfully');
    	}//setvesselImoNo(p1) end
    	
    	
    	/**** check Previous AuditDetails IHM on audit search****/
    	function checkPreviousAuditDetailsIHM (){
    		detailsFactoryIhm.getPreviousAuditDetail(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(res){
    			if(res.prevAuditDtl.length>0){
    				det.previousAudit_ =  angular.copy(res.prevAuditDtl[res.prevAuditDtl.length-1]);
    				det.previousFullAudit =angular.copy(res.prevAuditDtl);
    				 
    				 
    				res.prevAuditDtl.forEach(function(index){
    					if(index.audSubTypeDesc == "INITIAL"){
    						
    						det.minAuditDatePerIHM = det.previousAudit_.auditDate ? moment(det.previousAudit_.auditDate,YYYYMMDD).format(YYYYMMDD) : '';
    						return false;
    					}
    				});
    			}
    		});
    	}
    	
    	/**** check Previous AuditDetails****/
    	function checkPreviousAuditDetails(){
    		 
    		/****request to get previous audit/inspection/review details****/
    		detailsFactoryIhm.getPreviousAuditDetail(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(res){
    		console.log(res);
    		if(res.prevAuditDtl.length>0){
    			det.previousFullAudit =angular.copy(res.prevAuditDtl);
    			 
    		}
    		 
          detailsFactoryIhm.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
            	        	  
        			response.forEach(function(response){

            			response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
        				
            			try {
    						var auditPlace = response.auditPlace ? atob(response.auditPlace): '-';
    								
    						response.auditPlace = decodeURIComponent(auditPlace);
    					} catch (err) {
    						console.log(err);
    								
    					}
            		});
        			
        			det.LetterHistoryDetails=response;
        			det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
    					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
    				});
        			
        			setVesselLetterHist(det.auditSeqNo,response);
        			
        			/*det.previousAuditSuspendata = res.prevAuditDtl.filter(function( obj ) {
    					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId==det.AppConstant.NOT_APPROVED_SUMMARY;
    				});*/
        			
	         	    
        			if(res.prevAuditDtl.length >0 && res.prevAuditDtl[0] &&  res.prevAuditDtl[0].auditSummaryId==det.AppConstant.NOT_APPROVED_SUMMARY){
        				det.previousAuditSuspendata = angular.copy(res.prevAuditDtl[0]);	
        			}
              	
                   if(det.previousAuditSuspendata && det.previousAuditSuspendata.length && det.previousAuditSuspendata.length >0){
                	det.auditMinDate = (det.previousAuditSuspendata && det.previousAuditSuspendata[0].auditDate && ( (det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD)) || !det.auditMinDate) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
    				det.minAuditDatePer = det.auditMinDate ? det.auditMinDate : det.minAuditDatePer;
    				det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate ;// (det.previousAuditSuspendata && det.previousAuditSuspendata[0].auditDate && ( (det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD)) || !det.auditMinDate) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.minOpenMeetingDate;
    				det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.minCloseMeetingDate ;
                   }
                   
    			det.preAuditFlag=true;
    			
    			res.prevAuditDtl.forEach(function(preAuditDtl){
        			preAuditDtl.openMeetingDate = preAuditDtl.openMeetingDate?moment(preAuditDtl.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY):''; 
        			
             	});
             	 
    			
    			var initalCount = res.initalCount;
    			var renewalCount = res.renewalCount;
    			det.previousAudit = {};
    			det.carFindMaxStatusDate = '';
    		    det.sspDmlcRevisionNo = 0;
    			
    			det.auditMinDate = ''; 		  det.auditMaxDate='';
				//det.minOpenMeetingDate = (!det.minOpenMeetingDate) ?   moment(new Date()).subtract(89,'days').format(YYYYMMDD) : det.minOpenMeetingDate;
				det.maxOpenMeetingDate = '';
				det.minCloseMeetingDate = ''; det.maxCloseMeetingDate = '';
				
				det.iniRenCreated = initalCount>0 ? 1:0;
    			
    			det.carFindMaxStatusDate =res.carFindMaxStatusDate? moment(res.carFindMaxStatusDate,YYYYMMDD).format(YYYYMMDD):'';
    			
    			if(res.prevAuditDtl.length > 0 && res.prevAuditDtl[0].auditStatusId == det.AppConstant.VOID_AUDIT_STATUS && res.prevAuditDtl[0].docFlag == det.AppConstant.NON_ACCEPTED_DOC_FLAG && (res.prevAuditDtl[0].companyImoNo != det.vesselCompanyDtl.companyImoNo || res.prevAuditDtl[0].companyDoc != det.vesselCompanyDtl.docTypeNo)){
    				
    				det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
    	               
					$timeout(function(){
    					$('#auditType').focus();
            		},0);
				}else{
					
				
				res.prevAuditDtl = res.prevAuditDtl.filter(function( obj ) {
					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
				});
			
				if(res.prevAuditDtl && res.prevAuditDtl.length>0 && res.initalCount==0 && (res.prevAuditDtl[0].auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || res.prevAuditDtl[0].auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || res.prevAuditDtl[0].auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID  ))
    			{det.noPreviousAudits = true;
    				det.dirInterAndAdditionalAudit=true; 
    				det.disableCertIssueExpiry= false; 
    				det.dirInterAndAdditionalAuditData = angular.copy(res.prevAuditDtl[0]);
    			}/*else if(res.prevAuditDtl && res.prevAuditDtl.length>0 && res.initalCount==0 && res.prevAuditDtl[0].auditSubTypeId!=1001) {
    				det.dirInterAndAdditionalAudit=true; 
    				det.disableCertIssueExpiry= false; 
    				
    			}else if( res.initalCount==0 && res.prevAuditDtl.length==0){
    				det.dirInterAndAdditionalAudit=true; 
    				det.disableCertIssueExpiry= false;
    			}*/else if(res.prevAuditDtl.length==0){
    				det.noPreviousAudits = true;
    			}
				
				/*direct additional follwed by direct intermeadite */
				if(res.prevAuditDtl && res.prevAuditDtl.length >0 && res.initalCount==0 && (res.prevAuditDtl.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID)){
            	    det.dirInterAndAdditionalAudit=true;
            		det.disableCertIssueExpiry= false; 
            	    res.prevAuditDtl.forEach(function(index){ 
            					if(index.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && index.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && index.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY){
            						det.directAdditionalByintermeadite = true ; }
            				});
            	}
				
    			if(res.prevAuditDtl.length > 0 && res.prevAuditDtl[0].sspRevisionNo &&  res.prevAuditDtl.length==Number(res.prevAuditDtl[0].sspRevisionNo.charAt(1)))
    					{
    				det.sspDmlcRevisionNo = res.prevAuditDtl.length;
    				
    					}
    			else if(res.prevAuditDtl.length > 0){
    				det.sspDmlcRevisionNo = res.prevAuditDtl.length;
    				console.log(det.sspDmlcRevisionNo);
    			}
			
    			
    			 if(res.prevAuditDtl.length == 0){
	         	    	if(!det.vesselDetail.keelLaidDate || !det.vesselDetail.regOwnedImoNo || !det.vesselDetail.registeredCompanyName || !det.vesselDetail.registeredCompanyAddress){
	          	      		
	          	      		var msg = '';
	          	      		if(!det.vesselDetail.keelLaidDate)
	          	      			msg	= 'Keel Laid Date,';
	          	      		if(!det.vesselDetail.regOwnedImoNo)
	          	      			msg += 'Register Owner IMO Number,';
	          	      		if(!det.vesselDetail.registeredCompanyName)
	        	      			msg += 'Registered Company Name,';
	          	      		if(!det.vesselDetail.registeredCompanyAddress)
	          	      			msg += 'Registered Company Address,';
	          	      		
	          	      		ModalService.showModal({
	          					
	          		    		templateUrl : 'src/modals/docChanged.html', 
	          		    			
	          		    		controller  : 'docChangedController',
	          		    			
	          		    		inputs		: {data: msg + ' is Missing in RMI'},	    			
	          		    		
	          		    	}).then(function(modal) {
	          		    			
	          		    		modal.element.modal();
	          		    			
	          		    		modal.close.then(function(result) {
	          		    			
	          		    		});
	          		    	});	
	          	        	
	        		  	    }
	         	    	
	         	    	
	         	    }

				
    			if(res.prevAuditDtl.length > 0){
    				
    				var prevNotCompleteAdt = _.findWhere(res.prevAuditDtl, {'allowNext' : det.AppConstant.NOTACCEPT});
    				var prevAuditReopen    =  _.findWhere(res.prevAuditDtl, {'auditStatusId' : det.AppConstant.REOPEN});
    				
    				var seqNo =	(res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length >0 ) ?  _.max(res.prevAuditDtl[0].certificateDetail, function(find){  return   find.seqNo; }) : '';

    				var  previosAuditpublishStatus = (res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length >0 ) ? 

   						 (_(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('publishStatus').toString() == 0 &&

   						 (_(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueId').toString() == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM || _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueId').toString() == det.AppConstant.ADDITIONAL_ENDORSED_IHM ) ? 1: _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('publishStatus').toString()) : 1;
   						 
	         	    var  auditSubTypeId = (res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length > 0) ? _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('auditSubTypeId').toString() : '';
	         	    
	         	   if(!prevNotCompleteAdt){
	         	    	if(!det.vesselDetail.keelLaidDate || !det.vesselDetail.regOwnedImoNo || !det.vesselDetail.registeredCompanyName || !det.vesselDetail.registeredCompanyAddress){
	          	      		
	          	      		var msg;
	          	      		if(!det.vesselDetail.keelLaidDate)
	          	      			msg	= 'Keel Laid Date';
	          	      		if(!det.vesselDetail.regOwnedImoNo)
	          	      			msg += ', Register Owner IMO Number';
	          	      		if(!det.vesselDetail.registeredCompanyName)
	        	      			msg += ', Registered Company Name';
	          	      		if(!det.vesselDetail.registeredCompanyAddress)
	          	      			msg += ', Registered Company Address';
	          	      		
	          	      		ModalService.showModal({
	          					
	          		    		templateUrl : 'src/modals/docChanged.html', 
	          		    			
	          		    		controller  : 'docChangedController',
	          		    			
	          		    		inputs		: {data: msg + ' is Missing in RMI'},	    			
	          		    		
	          		    	}).then(function(modal) {
	          		    			
	          		    		modal.element.modal();
	          		    			
	          		    		modal.close.then(function(result) {
	          		    			
	          		    		});
	          		    	});	
	          	        	
	        		  	    }
	         	    	
	         	    	
	         	    }
	         	   
					//Added by @Ramya on 10-8-2022 for jira id - IRI-5403
					res.prevAuditDtl = _.sortBy(res.prevAuditDtl, 'auditSeqNo');
					res.prevAuditDtl.reverse();
					if (res.prevAuditDtl[0].leadSign == null) {
							 toaster.warning('Previous ' + det.auditType + ' has not been signed off by Lead '+det.auditorType+'');	//Added by @Ramya for jira id - IRI-5479
			 
						 $timeout(function () {
 
							 det.vesselImoNo = '';
 
							 det.vesselDetail = {};
 
							 det.vesselCompanyDtl = {};
 
							 det.previousAuditForLetterHistory = [];
 
						 }, 0);
        					
        			}else if(previosAuditpublishStatus == 0 && auditSubTypeId){
        				
        				auditSubTypeId = det.AppConstant.AUDIT_SUB_TYPE[auditSubTypeId].SUB_TYPE_DESC;
						
						toaster.warning('Previous ' +auditSubTypeId+'  '+det.auditType+' Certificate has not yet published. Please contact Manager.');	
					
        				
        				$timeout(function(){
            				
            				det.vesselImoNo = '';
            					
            				det.vesselDetail = {};
            			        	
            			    det.vesselCompanyDtl = {};
            			    
            			    det.previousAuditForLetterHistory=[];	
            						
            				},0);
        				
        			}else if(prevAuditReopen){
        				
        				$timeout(function(){
        				
        				det.vesselImoNo = '';
        					
        				det.vesselDetail = {};
        			        	
        			    det.vesselCompanyDtl = {};
        			    
        			    det.previousAuditForLetterHistory=[];	
        						
        				},0);
        				
        				toaster.warning('Previous '+det.auditType+' has been Reopened');	
        			
        			}else{
        			
        				$timeout(function(){
                    		$('#auditType').focus();
                    	},0);
        				
        				
        				var prevIntermediate={};
        				console.log(res.prevAuditDtl);
        				/***** getting previous full term certificate Data i.e just previous initial or renewal *****/
        				/***** getting previous Intermediate Audit certificate Data for ISPS Audit for endorse Advancement*****/
        				
        				var renewalBreak= false,initialBreak=false,intermeaditeBreak=false;
        				for(var i=0; i<res.prevAuditDtl.length;i++){
        					
        				
        					if(res.prevAuditDtl[i].auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID  && !intermeaditeBreak){
        						prevIntermediate = angular.copy(res.prevAuditDtl[i]);
        						intermeaditeBreak = true;
        					}
        					
        					if((res.prevAuditDtl[i].auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || res.prevAuditDtl[i].auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID) && !initialBreak){
        						det.prevInitialOrRenewal = angular.copy(res.prevAuditDtl[i]);
        						initialBreak = true;
        					}
        					if(res.prevAuditDtl[i].auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && !renewalBreak){
        						det.prevRenewal = angular.copy(res.prevAuditDtl[i]);
        						renewalBreak = true;
        						 }
        				   }
        		
        				det.previousAudit = angular.copy(res.prevAuditDtl[0]);
        				
        			    det.minAuditDatePerIHM = det.previousAudit.auditDate ? det.previousAudit.auditDate : '';
        				
        				for(var i=0; i<res.prevAuditDtl.length;i++){

        					if(res.prevAuditDtl[i].scope == 1000){   console.log(res.prevAuditDtl[i].certIssueDate);
        						det.previousAudit.certificateDetail = res.prevAuditDtl[i].certificateDetail;
        						det.previousAudit.certExpireDate = res.prevAuditDtl[i].certExpireDate;
        						det.previousAudit.certIssueDate = res.prevAuditDtl[i].certIssueDate;
        						det.previousAudit.certIssueId = res.prevAuditDtl[i].certIssueId;
        						det.previousAudit.certificateNo = res.prevAuditDtl[i].certificateNo;
        					
        						break;
        					}
        				}
        				
        				
        				if(det.previousAudit.companyImoNo != det.vesselCompanyDtl.companyImoNo){
        					
        					det.docChange(det.AppConstant.CREATE);
        				}
        				
        				/***  getting certificate issue and expiry date for Intermediate/Additional as of just previous Fullterm certificate ***/
        				
        			    var  certIssue = (res.prevAuditDtl[0] && res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length >0 ) ?  _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString() : '';
    	         	    var  extendedIssue = (res.prevAuditDtl[0] && res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length > 0) ? _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString() : '';

        				if(det.prevInitialOrRenewal){
        					
        					det.previousAudit.utn = det.prevInitialOrRenewal.utn;
        					
        					det.previousAudit.certExpireDate = det.prevInitialOrRenewal.certExpireDate;
        					
        					det.prevActiveCert = _.findWhere(det.prevInitialOrRenewal.certificateDetail, {'activeStatus' : 1});
        		    		
        				}else{
        					det.prevActiveCert = _.findWhere(det.previousAudit.certificateDetail, {'activeStatus' : 1});
        		    	}
        				
        				/***** getting minimum date for current Audit/Inspection/Review *****/
        				
        				if(det.carFindMaxStatusDate && (det.carFindMaxStatusDate > det.previousAudit.auditDate)){
        					
            				det.auditMinDate = moment(moment(det.carFindMaxStatusDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
            				
            			}else{
            				det.setAudMin = extendedIssue && extendedIssue > certIssue ? extendedIssue : certIssue;
            				det.setAudMin = det.previousAudit.auditDate && det.previousAudit.auditDate > det.setAudMin ? det.previousAudit.auditDate : det.setAudMin;  
            				det.auditMinDate = det.setAudMin ? moment(moment(det.setAudMin,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate ;
            			}
        				
        				if(det.previousAudit.closeMeetingDate && (det.previousAudit.closeMeetingDate > det.auditMinDate)){
        					
            				det.auditMinDate = moment(moment(det.previousAudit.closeMeetingDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
            			}
        				
        				
        				det.auditMinDate = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[0].auditDate && det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
        				 
        				
        				if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID ){
        					if(res.prevAuditDtl.length>0){
        	    				det.previousAudit_ =  angular.copy(res.prevAuditDtl[res.prevAuditDtl.length-1])
        	    				res.prevAuditDtl.forEach(function(index){
        	    					if(index.audSubTypeDesc == "INITIAL"){
        	    						det.auditMinDate = det.previousAudit_.auditDate ? moment(moment( det.previousAudit_.auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD)  : '';
        	    						return false;
        	    					}
        	    				});
        	    			}
        				}
        				det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
        				det.minAuditDatePer = det.auditMinDate;
        				det.receiptMaxDate =  moment(new Date()).format(YYYYMMDD);
        				//det.receiptMaxDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):det.auditMinDate;
        				det.creditMinDate =det.previousAudit.creditDate ? moment(det.previousAudit.creditDate,YYYYMMDD).add(1,'days').format(YYYYMMDD):'';
        				det.enableAuditSubType = [det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID];
        				
        				 
        		    	detailsFactoryIhm.getPrevFinding(det.auditDetail.auditTypeId,det.vesselDetail.vesselImoNo,det.companyId,det.vesselCompanyDtl.companyImoNo,det.vesselCompanyDtl.docTypeNo).$promise.then(function(response) {
        					console.log(response);
        					
        					var auditFindings = angular.copy(response);
        					var flag = true;
        					
        					auditFindings.forEach(function(auditFinding){
        						
        						auditFinding.findingDetail.forEach(function(finding){
            						console.log('dueDate '+finding.dueDate);
            						if(flag && finding.dueDate && ( finding.dueDate.toUpperCase() == (moment(finding.dueDate,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() || finding.dueDate.toUpperCase() == (moment(finding.dueDate,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm)).toUpperCase() )){
            							console.log('dueDate correct format '+finding.dueDate);
            							if(moment(finding.dueDate,MMMDDYYYY).format(YYYYMMDD) < moment(new Date()).format(YYYYMMDD)){
            								toaster.warning('Over due date previous findings are available');
            								console.log('Over due date previous findings are available');
            								flag = false;
            							}
            						}
            					});
        					});
        				});
        			}
        				
    			}else{
    				
    				det.enableAuditSubType = [det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID];
    				det.receiptMaxDate =  moment(new Date()).format(YYYYMMDD);
    				//det.receiptMaxDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):det.auditMinDate;
    		    	
    				$timeout(function(){
            			$('#auditType').focus();
            		},0);
    				
    			}  
    		}
    			
    			/** MLC Additional follwed by interim **/
    			if(res.prevAuditDtl && res.prevAuditDtl.length > 1 && det.auditTypeId == det.AppConstant.IHM_TYPE_ID ){ 
    				var intrimCount=0,additionalCount=0,initialCount=0;
    				res.prevAuditDtl.forEach(function(index){
    					if(index.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){ intrimCount++; }else if(index.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){ 
    						additionalCount++;
    					}else if(index.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID){
    						initialCount++; }  });
    			
    				if(intrimCount != 0 && additionalCount !=0 && initialCount==0 ){
    					det.enableAuditSubType = [det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
    				}
    			}
    		
          });});//end of request
    	}// end of checkPreviousAuditDetails
    	
    	/*** on click of browser back ***/
    	window.onpopstate = function() {
    		
        	if(det.startState == det.AppConstant.CREATE){
				$state.go('app.dashboard',{},{ reload: true });
			}else if(det.startState == det.AppConstant.UPDATE){
				$state.go('app.audit.search',{'currPageNo':sessionStorage.getItem('currPageNo')},{ reload: true });
			}
        }
    	
    	/*** on click Audit screen back button ***/
        function back(){
        	
        	if(det.startState == det.AppConstant.CREATE){
				$state.go('app.dashboard',{},{ reload: true });
			}else if(det.startState == det.AppConstant.UPDATE){   
				
				$state.go('app.audit.search',{'currPageNo':sessionStorage.getItem('currPageNo'),'audittype':'search'},{ reload: true });
			}
        }
        
        $rootScope.$on("CallParentMethod", function(){
        	det.validateAndSaveAuditData();
         });
        
      
       
      $rootScope.$on('$stateChangeStart', function(event, fromState, toParams,toState) {
    	 
    	  var element=angular.element(document.getElementById("loader"));
    	
    	  if(det.AuditDetailForm && det.partialData!=true)
			{
  			
    		  if(det.AuditDetailForm.$dirty==true || $rootScope.report==true || $rootScope.lead==true)
				{
					if(det.AuditDetailForm.vslImo.$valid )
	    			{
				if (broadcastService.confirmService()) {
					if(det.auditDetailDataValidation())
						{
						if(fromState.url=='/findings')
						 event.preventDefault();
						det.saveAuditData('Data saved successfully',fromState.url); 
						
						
					}else{
						 event.preventDefault();
					}
		          }
				else{
					if(fromState.url=='/details' && !toState.url=='/details'){
						 event.preventDefault();
							toaster.warning('Please Save the Changes');
						console.log(det.openMeetingDatevalue);
						
					if(!det.openMeetingDatevalue){
							
							toaster.warning('Please Enter the '+det.openMettingDate);
							
							 event.preventDefault();
							 
							 det.auditDetail.openMeetingDate=null;
							 
							 det.auditDetail.closeMeetingDate=null;
							 
							 det.auditDetail.certIssueDate=null;
							 
							 det.auditDetail.certExpireDate=null;
							
						}else if(!det.closeMeetingDatevalue){
							
							toaster.warning('Please Enter the '+det.clseMetingdate); 
							
							 event.preventDefault();
							 
							 det.auditDetail.closeMeetingDate=null;
							 
							 det.auditDetail.certIssueDate=null;
							 
							 det.auditDetail.certExpireDate=null;
							
						}else if(!det.auditPlacevalue){
							
							toaster.warning('Please Enter the '+det.auditType+' Place');
							
							 event.preventDefault();
							 
							 det.auditDetail.auditPlace=null;
							 
							 
							
						}else if(det.summaryvalue){
							
							toaster.warning('Sorry, certificate can’t be generated, since the '+det.auditType+' Summary is marked as ‘Not Approved’');
							
							 event.preventDefault();
							 
							 det.auditDetail.auditSummaryId=null;
							
						}else if(!det.certIssueVal){
							
								toaster.warning('Please Enter Certificate Issue Date');
								
								 event.preventDefault();
								 
								 det.auditDetail.certIssueDate=null;
								 
								 det.auditDetail.certExpireDate=null;
								
						}else if(!det.certExpireVal){
							
								toaster.warning('Please Enter Certificate Expiry Date');
								
								 event.preventDefault();
								 
								 det.auditDetail.certExpireDate=null;
						}
						
					}
					else if(fromState.url=='/dmlc-findings'){
						
						if(!det.dmlcreportVal){
							
							toaster.warning('Please Enter Review Report No.');
							
							 event.preventDefault();
							 
							 det.auditDetail.sspReviewDetail[0].sspReportNo=null;
							
						}
						
					}
				}
				}
				
				}
			
			} 	
    	  element.addClass('hide');	
        });
        
        /***set AuditDatas when Navigating from search screen***/
        
     
        function setAuditData(res,callBack){
        	/***** checking Audit/Inspection/Review Details for same vessel and same Type***/
        	/*to get previous certificate details if current is in COMMENCED/OPEN status and to check next Audit/Inspection/Review created or not if status is COMPLETED/CLOSE same vessel and same Type*/
        	// (det.auditDetail.creditDate)?det.auditDetail.creditDate:  det.auditDetail.creditDateFromCyle;
        	
        	detailsFactoryIhm.getPreviousAuditDetail(det.auditTypeId,res.vesselImoNo,det.companyId).$promise.then(function(result){ console.log(result);
            var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
            
			det.notApprovedPrevAudit=false;
        		var leadEmail=leadDetail.userId;
        		
        		det.leadEmail=leadEmail;
	
        		var seqNo ='',extensionIssueDate ='',extensionexpiryDate ='';
            		
        		if(result.$resolved==true){
					if(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)
					{
					det.certiRecieptLetter= 'Amendment Receipt Letter';					//added by ramya for jira id-->IRI-5304
					}
            		detailsFactoryIhm.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
            		
        		
        		
        		det.carFindMaxStatusDate = result.carFindMaxStatusDate ? moment(result.carFindMaxStatusDate,YYYYMMDD).format(YYYYMMDD) : '';
        		var initalCount = result.initalCount;
        		
        		result.prevAuditDtl.forEach(function(preAuditDtl){
        					preAuditDtl.openMeetingDate = preAuditDtl.openMeetingDate?moment(preAuditDtl.openMeetingDate).format(DDMMMYYYY):''; 
        					preAuditDtl.auditDate = preAuditDtl.auditDate?moment(preAuditDtl.auditDate).format(YYYYMMDD):'';
        					preAuditDtl.certExpireDate = preAuditDtl.certExpireDate?moment(preAuditDtl.certExpireDate).format(YYYYMMDD):'';
        		});
        		
        				response.forEach(function(response){
        					response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
        					try {
        						var auditPlace = response.auditPlace ? atob(response.auditPlace): '-';
        						response.auditPlace = decodeURIComponent(auditPlace);
        					} catch (err) {
						
        					}
        				});
        				
        				if(det.auditDetail.certificateDetail.length>0){
        					
        					det.auditDetail.certificateDetail.forEach(function(index){ 
        						if(index.generatedBy == det.AppConstant.IHM_MANAGER_ROLE_ID){
        							det.removeSignDisable = true;
        						} 
        					});  
        					
        				}else if(det.auditDetail.certificateIhmDetail){
        					if(det.auditDetail.certificateIhmDetail.length>0){
        					det.auditDetail.certificateIhmDetail.forEach(function(index){ 
        						if(index.generatedBy == det.AppConstant.IHM_MANAGER_ROLE_ID){
        							det.removeSignDisable = true;
        						} 
        					}); 
        					}
        					
        				}
        				
        				 
        				det.LetterHistoryDetails=angular.copy(response);	
        				
        				setVesselLetterHist(det.auditSeqNo,response);
        	 
        				if(det.userRoleId != det.AppConstant.ADMIN_ROLE_ID &&  det.userRoleId != det.AppConstant.MANAGER_ROLE_ID){ 
        			    	det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
        					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.sspLtrStatus != 0 && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
        				   });
        				}
        				if(result.prevAuditDtl.length >0){
        					    det.previousAuditCertDetails = (result.prevAuditDtl.length >1 && result.prevAuditDtl[1] ) ? angular.copy(result.prevAuditDtl[1].certificateDetail):'';
        					    det.previousAuditSuspendata = result.prevAuditDtl.filter(function( obj ) {
            					  return ( obj.auditSummaryId==det.AppConstant.NOT_APPROVED_SUMMARY && det.auditDetail.auditSeqNo != obj.auditSeqNo && obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS ) ;
            				  });
        					    
        					    det.auditMinDate = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[0].auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY && det.previousAuditSuspendata[0].auditDate && det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;		    
        					    det.minOpenMeetingDate =  det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
                 				 
        				}

						//added by ramya for jira id-->IRI-4850
						if(det.auditDetail.auditSummaryId==det.AppConstant.NOT_APPROVED_SUMMARY){
							if(result.prevAuditDtl.length >0){
								result.prevAuditDtl.forEach(function(index){
									if(det.auditDetail.auditSeqNo<index.auditSeqNo){
										det.notApprovedArray.push(index);
									}
								});
							}
							if(det.notApprovedArray.length>0){
								det.notApprovedPrevAudit=true;
								det.disableNarativeSummary();
							}
						}
                            
        				/*direct additional follwed by direct intermeadite */
        				if(result.prevAuditDtl && result.prevAuditDtl.length >0 && initalCount==0  && (det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID))
            			{   det.dirInterAndAdditionalAudit=true;
            				det.disableCertIssueExpiry= false; 
            			    result.prevAuditDtl.forEach(function(index){ 
            					if(index.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && index.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && index.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY){
            						det.directAdditionalByintermeadite = true ; }
            				});
            			}
				
        				result = result.prevAuditDtl; 
        			
        				result = result.filter(function( obj ) {
        					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
        				});
        				
                
        				if(result.length>0 && initalCount==0 && (result[0].auditSubTypeId ==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || result[0].auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID ))
        				{ 
        					det.dirInterAndAdditionalAudit=true;
        					det.disableCertIssueExpiry= false;
        				}
        				
        				var tempDirectInterOrAdditional=true;
        				result.forEach(function(i){
        					if(tempDirectInterOrAdditional   && initalCount==0 && (i.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || i.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
        						det.dirInterAndAdditionalAudit=true;
            					det.disableCertIssueExpiry= false;
        					}
        					
        				});
                
        				
        				
        				if(result.length>0 && result[0].auditSeqNo >  det.auditSeqNo){
        					
        					det.nextAuditDetails = result[0];
        					det.nextAdtCreated = true;
        					det.lockStatus=true;
        					det.disableNarativeSummary();
        					det.setNextAuditData();
        					
        					if((result[0].allowNext==0) && (result[0].reviewerSign==null)) {        						
        						det.nextCreatedBlockFinding = true;
        					}
        					
        					/*IRI-4423*/
        					for(var j=0; j<result.length-1; j++) {
        						if(result[j].allowNext==0 && det.lockHolder!=det.loginUserId) {
            						det.lockStatus = false;
            						det.enabled = false;
            					}
        					}
        					
        				}
    			
        				det.lastSameAuditDate = result.length>0 ? result[0].auditDate : '';
    			
        				det.prevAdtDataFetch = true;
    			
        				if(det.openForCar){
    				
        					if(det.prevFindingDataFetch){
        						if($state.params.page=='prevFind'){
        							det.previousFinding();
        						}if($state.params.page=='currFind'){
        							det.currentFinding();
        						}
        					}
        				}

        				det.previousAudit = (result.length>1)? angular.copy(result[1]) : {};
        				
        				if(result.length>1 && (res.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS || res.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) ){
    				
        					var prevIntermediate={};
				
        					/***** getting previous full term certificate Data i.e just previous initial or renewal *****/
        					/***** getting previous Intermediate Audit certificate Data for ISPS Audit for endorse Advancement*****/
        					var prevIntermediateBreak =false,prevInitialOrRenewalBreak=false,prevRenewalBreak=false;
        					for(var i=1; i<result.length;i++){
					
        						if(result[i].auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && !prevIntermediateBreak){
        							prevIntermediate = angular.copy(result[i]);
        							prevIntermediateBreak =true;
        						}
					
        						if((result[i].auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || result[i].auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID) && !prevInitialOrRenewalBreak){
        							det.prevInitialOrRenewal = angular.copy(result[i]);
        							prevInitialOrRenewalBreak=true;
        						
        						}
        						
        						if(result[i].auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && !prevRenewalBreak){
        							det.prevRenewal = angular.copy(result[i]);
        							prevRenewalBreak =true;
        						}
        					}
    			
        					/***  getting certificate issue and expiry date for Intermediate/Additional as of just previous Fullterm certificate ***/
				
        					if(det.prevInitialOrRenewal){
        						det.previousAudit.certExpireDate = det.prevInitialOrRenewal.certExpireDate;
        						det.prevActiveCert = _.findWhere(det.prevInitialOrRenewal.certificateDetail, {'activeStatus' : 1});
        					}else{
        						det.prevActiveCert = _.findWhere(det.previousAudit.certificateDetail, {'activeStatus' : 1});
        					}
    				
    				
        					/**getting Audit/Inspection/Review minimum date	as of previous date and Findings updated in Car Maintenance screen**/
    				
        					if(det.carFindMaxStatusDate && (det.carFindMaxStatusDate > det.previousAudit.auditDate)){
    				
        						det.auditMinDate = moment(moment(det.carFindMaxStatusDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
    				
        					}else{
    			
        						det.auditMinDate = (det.previousAudit.auditDate && det.previousAudit.auditDate ) > det.auditMinDate ? moment(moment(det.previousAudit.auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate;
        						 
        					}
        				
        					 if(det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0){
        		      				var preAuditMinDate = det.auditMinDate;
        		      				var seqNo =	  _.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; });	
        		      				det.auditMinDate  = (seqNo && det.previousAudit &&  (seqNo.extendedIssueDate > det.previousAudit.auditDate  )) ? moment(moment(seqNo.extendedIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : 	det.auditMinDate;
        		      				det.auditMinDate = (preAuditMinDate > det.auditMinDate) ? preAuditMinDate : det.auditMinDate;
        		      				
        		      				if(seqNo && det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID && seqNo.certIssueId==det.AppConstant.RE_ISSUE) {
        		      					det.auditMinDate = (det.previousAudit &&  seqNo.extendedIssueDate) ? preAuditMinDate : det.auditMinDate;
        		      					det.minOpenMeetingDate =  det.auditMinDate;
        		      					det.minCloseMeetingDate = det.auditMinDate;
        		      					det.minDateReissueAdditional = true;
        		      				}
        					 }
        					
        					 certificateFactory.getAllCertificateDetailForIhm (det.auditDetail.auditTypeId, det.vesselImoNo.vesselImoNo,det.companyId,'soc').$promise.then(function(res){
      	        				det.AllIhmCertificateData = angular.copy(res.result);
      	        				console.log(res.result)
      	        				det.maxAddSurveyDate = det.AllIhmCertificateData[0].extendedExpireDate ? det.AllIhmCertificateData[0].extendedExpireDate : det.AllIhmCertificateData[0].certExpireDate;
      	        				det.minAddSurveyDate = det.AllIhmCertificateData[0].completionSurveyDate ? det.AllIhmCertificateData[0].completionSurveyDate : '';
      	        				det.minAddSurveyDate  = det.previousAudit.additionalSurvey && det.previousAudit.additionalSurvey != 'N.A'  ? moment(moment(det.previousAudit.additionalSurvey,YYYYMMDD).add(1,'days')).format(YYYYMMDD)  :  det.minAddSurveyDate;
      	    					
      	        			});
      	        				
        					 
        					det.auditMinDate = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[0].auditDate && det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
        					 
        					if( det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
        						det.auditMinDate = (det.previousAudit.auditDate && det.previousAudit.auditDate )  ? moment(moment(det.previousAudit.auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate;
        					}
        					
        					 var msg= "";	
        					//det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;

         					if(det.auditTypeId != det.AppConstant.DMLC_TYPE_ID ){
             					det.minOpenMeetingDate =  det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
             					
         					}else{
         						det.minOpenMeetingDmlc = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
         					}
        					
         					//det.receiptMaxDate = (det.auditDetail.auditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.IHM_TYPE_ID)  ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD): (det.auditDetail.auditSubTypeId!=det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID ||det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) ) ? det.auditMinDate:det.receiptMaxDate;
    		              
         					 
        					/*** setting minimum date for ADDITIONAL_SUB_TYPE and INTERMEDIATE_SUB_TYPE i.e in between previous Fullterm certificate issue - expire ***/
        					if(res.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || res.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
        			
        						if(det.previousAudit && res.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS){
        							//det.auditDetail.certExpireDate = moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
        						}
    					
        						var temp = (res.certIssueDate && !det.minDateReissueAdditional) ? moment(res.certIssueDate,YYYYMMDD).format(YYYYMMDD):'';
    		
        						det.maxCloseMeetingDate = res.certExpireDate ?moment(res.certExpireDate,YYYYMMDD).format(YYYYMMDD) : '';
    				
        						det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate; 
        						det.minOpenMeetingDate = det.minOpenMeetingDate > temp ? det.minOpenMeetingDate : temp ;
        						det.maxOpenMeetingDate = res.certExpireDate? moment(res.certExpireDate,YYYYMMDD).format(YYYYMMDD):'';
        				
        						if(det.prevInitialOrRenewal  && det.prevInitialOrRenewal.certificateDetail.length > 0 && ( det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ) && det.scopeId!=1001){ 
        				        	
        				        		 seqNo  =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){ return  find.seqNo; });
        				        	     extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
        				        		 extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
        				        		 if(!extensionIssueDate){
        				         			  extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
        					         		  extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
        					         	}
        				        }
        						
        						if(!det.dirInterAndAdditionalAudit &&  det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
        		    				var preAuditMidate = det.auditMinDate; 
        		    				det.auditMinDate = det.auditMinDate  ? moment(moment(det.auditMinDate,YYYYMMDD).add(1,'year')).format(YYYYMMDD): det.auditMinDate; 
        		    				det.auditMaxDate = det.auditMinDate ? moment(moment(det.auditMinDate,YYYYMMDD).add(3,'year')).format(YYYYMMDD) :  det.auditMaxDate; 
        		    			    det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
        		    			    det.maxOpenMeetingDate  =  det.auditMaxDate ?  det.auditMaxDate : det.maxOpenMeetingDate;
        		    			    det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.maxCloseMeetingDate;
        		    			    det.maxCloseMeetingDate =  det.auditMaxDate ?  det.auditMaxDate : det.maxCloseMeetingDate;
        		    			    
        		    			    det.firstIntermeadite = ( det.auditMinDate > preAuditMidate ) ? true : false;
        		    			}
        		    			
        						
        						det.maxCloseMeetingDate = (det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID &&  extensionexpiryDate ) ? moment(extensionexpiryDate,YYYYMMDD ).format(YYYYMMDD)   : det.maxCloseMeetingDate;
        					
        					} if(det.prevInitialOrRenewal  && det.prevInitialOrRenewal.certificateDetail.length > 0 && ( (det.auditDetail.auditSubTypeId ==1003 || det.auditDetail.auditSubTypeId ==1005) || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && (det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED2)))){
        						var seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){ return  find.seqNo; });
        		        	    var extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
        		        		var extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
        		        		var certIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
        		        		var certExpireDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
                                
        		        		if(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
        		        		det.additionalEndorsedCertificate = angular.copy(seqNo);
        		        		}
        		        		det.auditDetail.certIssueDate  = extensionIssueDate ? moment(extensionIssueDate,YYYYMMDD).format(MMMDDYYYY) : certIssueDate ? moment(certIssueDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certIssueDate ;
        		        		det.auditDetail.certExpireDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY) : certExpireDate ?  moment(certExpireDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
        		        		 
        		        		det.maxOpenMeetingDate = det.auditDetail.certExpireDate ? det.auditDetail.certExpireDate : '';
        		        		det.maxCloseMeetingDate = det.auditDetail.certExpireDate ? det.auditDetail.certExpireDate : '';
        		        		
        		        		if(res.certificateDetail.length>0 && res.certificateDetail[0].extendedExpireDate) {
        		        			
        		        			det.auditDetail.certExpireDate = result[0].certificateDetail[0].extendedExpireDate ? moment( result[0].certificateDetail[0].extendedExpireDate ,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
        		        		}
        		        		
        					}/*else if(res.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
        			
    						if(det.previousAudit && res.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS){
    							det.auditDetail.certExpireDate = moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
    						}
        			
    						det.expiryMaxDate = (det.userRoleId==det.AppConstant.AUDITOR_ROLE_ID && det.previousAudit.certExpireDate) ? det.previousAudit.certExpireDate : '';
                	
    						var temp = moment(moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(2,'years')).format(YYYYMMDD);
        			
    						det.maxCloseMeetingDate = moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(3,'years');
        			
        					det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
    						det.minOpenMeetingDate = det.minOpenMeetingDate > temp ? det.minOpenMeetingDate : temp ;
    						det.maxOpenMeetingDate = moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(3,'years');
        			
    						det.auditMinDate = det.auditMinDate > temp ? det.auditMinDate : temp ;
    						det.auditMaxDate = moment( moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(3,'years') ).format(YYYYMMDD);
        				}*/
        				}else{
        					det.receiptMaxDate =  moment(new Date()).format(YYYYMMDD);
        					 //det.receiptMaxDate = (det.auditDetail.auditDate && det.auditDetail.auditTypeId!=det.AppConstant.IHM_TYPE_ID) ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMinDate;
        				}
        				
        				 
        			
        				 det.creditMinDate =det.previousAudit.creditDate ? moment(det.previousAudit.creditDate,YYYYMMDD).add(1,'days').format(YYYYMMDD):'';
        				 
        			});
        		}
              
        	});
        	
        	
        	det.auditDetail = angular.copy(res);
        	det.auditDetail.auditPlace =(det.ihmUserDetails &&  det.ihmUserDetails.location && !res.auditPlace ) ?   btoa(encodeURIComponent( det.ihmUserDetails.location)) :det.auditDetail.auditPlace;
        	
        	if(det.auditDetail.certificateIhmDetail && det.auditDetail.certificateIhmDetail.length>0){
    			if(det.auditDetail.certificateIhmDetail[0].generatedBy == 1006)
    				det.certificateReissueMgrIHM = true;
    		}else if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0){
    			if(det.auditDetail.certificateDetail[0].generatedBy == 1006)
    				det.certificateReissueMgrIHM = true;
    		}
        	
        	det.docTypeNorFromAuditDetail = ( res && res.docTypeNumber && res.companyDoc) ? res.companyDoc + ' '+ res.docTypeNumber : det.vesselCompanyDtl.docType; 
        	det.docTypeNorFromAuditDetailTypeNor =  ( res && res.docTypeNumber ) ? res.docTypeNumber :'';
        	det.compnayDocFromAuditDetail =  ( res && res.companyDoc ) ? res.companyDoc :'';
        	if(res.auditTypeId==det.AppConstant.IHM_TYPE_ID){
			    switch(res.sspReviewDetail[0].reviewSummary){
			    case 11 :
			    	{
			    	det.ihmCertModal = {
			   		       hk : true,
			   		       eu : true
			   		     };
					break;
			    	}
				case 10 :
					det.ihmCertModal = {
			   		       hk : true,
			   		       eu : false
			   		     };
					break;
				case 1 :
					det.ihmCertModal = {
        			   		       hk : false,
        			   		       eu : true
        			   		     };
					break;
				case 0 :
					det.ihmCertModal = {
			   		       hk : false,
			   		       eu : false
			   		     };
					break;
			      }
				}
        	
        	det.auditDetailOrg =  angular.copy(res);
        	
          	if(det.auditTypeId==det.AppConstant.IHM_TYPE_ID && det.auditCreateUpdate=="Update"){
          			refreshDET();
          	}
        	
        	if(det.prevInitialOrRenewal && det.prevInitialOrRenewal.certificateDetail.length > 0 && ( det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID )){ 
        	
        		var seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){ return  find.seqNo; });
        	    var extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
        		var extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
        		
        		det.auditDetail.certIssueDate  = extensionIssueDate ? extensionIssueDate : (det.prevInitialOrRenewal.certificateDetail[0].certIssueDate) ? det.prevInitialOrRenewal.certificateDetail[0].certIssueDate : det.auditDetail.certIssueDate;
        		det.auditDetail.certExpireDate = extensionexpiryDate ? extensionexpiryDate : (det.prevInitialOrRenewal.certificateDetail[0].certExpireDate ) ? det.prevInitialOrRenewal.certificateDetail[0].certExpireDate : det.auditDetail.certExpireDate ;
        	}
        	
        	 
        	//** wen next extension is thre and maid audita void data need to rollabck**//
        	
        	if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length > 0){ 
        		var certificateNo='',certIssueId=''; 
        		var seqNo =	_.max(det.auditDetail.certificateDetail, function(find){ return  find.seqNo; });
        		certificateNo = _(det.auditDetail.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
        		certIssueId = _(det.auditDetail.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueId').toString();
        		det.auditDetail.certificateNo = certificateNo ? certificateNo: det.auditDetail.certificateNo;
        		 
        		det.auditDetail.certIssueId = certIssueId ? Number(certIssueId) : det.auditDetail.certIssueId;
        		 
        		
        	}
        	
        	
        	var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
    		
    		var leadEmail=leadDetail.userId;
    		
    		userFactory.nameBasedUserDetails(leadEmail,det.companyId).$promise.then(function(respuser) {console.log(respuser);
        		if(respuser[0] && respuser[0].region !== Number(det.managerRegion)){
        			
        			//det.lockDisabled = true;
        		}
    		});
    		
    		det.auditDetail.certificateData = angular.copy(res.certificateDetail);
    		
    		certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
					 console.log(resp)
				det.auditDetail.certificateDataHistory = angular.copy(resp.result);
					
			});
        	
    		det.auditDetail.certificateData.forEach(function(a){
      		  if(a.auditTypeId==1006 && a.auditSubTypeId==1002 && a.certIssueId==1005 ){
      			   a.endorsedDate =   det.auditDetail.additionalSurvey;
      		      }
			});	
    		
    		 
	       	 
	       
      		
      		
      		
      		
        	det.auditDetailBeforeUpdate = angular.copy(res);
        	
        	
    		det.openMeetingDatevalue=det.auditDetailBeforeUpdate.openMeetingDate;
    				
    		det.closeMeetingDatevalue=det.auditDetailBeforeUpdate.closeMeetingDate;
    		
    		det.auditPlacevalue=det.auditDetailBeforeUpdate.auditPlace;
    		
    		det.summaryvalue=det.auditDetailBeforeUpdate.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY;
    		
    		det.certIssueVal=det.auditDetailBeforeUpdate.certIssueDate;
    		
    		det.certExpireVal=det.auditDetailBeforeUpdate.certExpireDate;
        	
        	if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){
        		
        		det.enableCertificateIssuedType=[det.AppConstant.INTERIM_CERT,det.AppConstant.EXTENSION,det.AppConstant.RE_ISSUE];
        		
			}else if((det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID) || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID)){
				
				det.enableCertificateIssuedType=[det.AppConstant.FULL_TERM_CERT,det.AppConstant.EXTENSION,det.AppConstant.RENEWAL_ENDORSED1,det.AppConstant.RENEWAL_ENDORSED2,det.AppConstant.RE_ISSUE];
			
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
			
				det.enableCertificateIssuedType=[det.AppConstant.ADDITIONAL_ENDORSED,det.AppConstant.RE_ISSUE,det.AppConstant.EXTENSION];
				
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
				
				det.enableCertificateIssuedType=[det.AppConstant.INTERMEDAITE_ENDORSED,det.AppConstant.RE_ISSUE,det.AppConstant.EXTENSION];
			}
        	
        	det.vesselImoNo = {'vesselImoNo':det.auditDetail.vesselImoNo};
        	
			det.setvesselImoNo(det.auditDetail);
			
			try{ 
				det.auditDetail.auditPlace = det.auditDetail.auditPlace?decodeURIComponent(atob(det.auditDetail.auditPlace)):'';
				det.auditDetail.narrativeSummary = det.auditDetail.narrativeSummary?decodeURIComponent(atob(det.auditDetail.narrativeSummary)):'';
    		}
    		catch(err){
    		}
    	
    		
    		det.vesselDetail.grt=det.auditDetail.grt;
    		
    		det.expiryMinDate = (det.userRoleId==det.AppConstant.AUDITOR_ROLE_ID && det.auditDetail.certIssueDate) ? det.auditDetail.certIssueDate : (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID && det.auditDetail.certExpireDate) ? det.auditDetail.certExpireDate : '';
        	
        	det.expiryMaxDate = (det.userRoleId==det.AppConstant.AUDITOR_ROLE_ID && det.auditDetail.certExpireDate) ? det.getExpiryDate() : '';
        	
        	det.startExpiryDate = (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID && det.auditDetail.certExpireDate && det.auditDetail.auditStatusId != det.AppConstant.COMMENCED_AUDIT_STATUS && det.auditDetail.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS) ? det.auditDetail.certExpireDate : '';
        	
        	det.dateFormatConversion(det.auditDetail,YYYYMMDD,MMMDDYYYY);
        	
        	det.maxDmlc1issueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
        	
        	det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
    		
    		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
    		
    		/*det.maxInternalDate = det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(MMMDDYYYY):'';
        	det.maxInternalDate = det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
 			 
 			det.minInternalDate = moment(det.auditDetail.openMeetingDate,MMMDDYYYY).subtract(6,'months').format(YYYYMMDD);*/
 			
 			det.vesselDetail.dateOfRegistry = det.auditDetail.dateOfRegistry   ? det.auditDetail.dateOfRegistry : det.vesselDetail.dateOfRegistry ;
 			
        	/*if( (det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID) && det.auditDetail.auditStatusId != det.AppConstant.COMMENCED_AUDIT_STATUS && det.auditDetail.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS ){
        		det.auditDetail.certExpireDate = det.auditDetail.endorseExpireDate?moment(det.auditDetail.endorseExpireDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certExpireDate;
        	}*/
 			
        	/***select auditSummary radio button***/
 			
 			
    		if(det.auditDetail.auditSummaryId){
    		
    			_.findWhere(det.auditSummary, {'audSummaryId' : det.auditDetail.auditSummaryId, 'companyId' : Number(det.companyId)}).sumary = det.auditDetail.auditSummaryId;
    			
    				det.disabledApproveButton = (det.auditDetail.auditSummaryId == 1005)? true : false;
    		}else{
    			det.disabledApproveButton = true;
    		} 
    	
    	/*	det.sspApproveLetter = res.certificateNo;*/
			
    		
    		det.certificateVer = res.certificateVer;
    		
    		det.auditDetail.auditAuditorDetail.forEach(function(a){
    			
    			if(a.audLeadStatus==1 && a.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID ){
	    			a.auditRoleDesc = det.auditorType;
	    		}
	    		
    			a.check = false;
    			a.audSignature = a.audSignature?atob(a.audSignature):'';

    			a.audSignatureDate =  a.audSignatureDate ? moment(a.audSignatureDate,YYYYMMDD).format(MMMDDYYYY) : moment(new Date()).format(MMMDDYYYY);
    		});
    		
    		$scope.signatureonLoad = det.auditDetail.auditAuditorDetail;
    		
    		var currLoginUserDtl = _.findWhere(det.auditDetail.auditAuditorDetail, {'userId' : det.loginUserId});
    		var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
    		var reviewerDtl = _.findWhere(det.auditDetail.auditAuditorDetail, {'auditRoleID' : det.AppConstant.AUDIT_REVIEWER_ROLE_ID});
    		
    		det.notLead = (leadDetail && leadDetail.userId != sessionStorage.getItem('emailId')) ? true:false;
    		
    		if(currLoginUserDtl && currLoginUserDtl.auditRoleID==det.AppConstant.AUDIT_REVIEWER_ROLE_ID){
    			det.reviewerLogin = true;
    		}
    		if(currLoginUserDtl && det.userRoleId==det.AppConstant.AUDITOR_ROLE_ID){
    			det.userRelatedToAdt = true;
    		}
    		if(leadDetail && leadDetail.userId==det.loginUserId && leadDetail.auditTypeId==1006){
    			det.userRelatedToAdt = true;
    		}
    		
    		if(currLoginUserDtl && currLoginUserDtl.audSignature){
    			det.currUserSign = true;
    			det.disableNarativeSummary();
    		}
    		if(leadDetail && leadDetail.audSignature){
				det.leadSign = true;
			
			det.checkLeadStatus = true;
			}
    		if(reviewerDtl && reviewerDtl.audSignature){
    			det.reviewerSign = true;
			}
    		
    		_.countFindingCategory(det.auditDetail.auditFinding,det.auditTypeId,"CURR",det.obsCategoryOptions);
    		
    		/*	det.auditDetail.auditFinding.forEach(function (a){
         	   
				if(a.findingDetail[a.findingDetail.length-1].currentAuditSeq != det.auditSeqNo){
					det.nextAdtCreated = true;
				}
			});*/
			
    		/**** without lead sign participate auditors can't edit screen ****/
    		/*if(!det.leadSign && det.notLead && det.enabled && det.userRoleId==det.AppConstant.AUDITOR_ROLE_ID){
				
				det.lockStatus = true;console.log("2");
				
			}else*/ if(det.leadSign && !det.notLead){
				
	    		/** if lead logged in and lead sign available disable narrative summary content**/
	    		det.disableNarativeSummary();
			}
			if(det.notLead){
				/** if other reviewer logged in**/
	    		det.disableNarativeSummary();
			}
    	
    		det.setSummaryAndDueDate();
    		
    		det.setPrevFindingsRecords();
    		
    		
    		             
    		
    		if(det.auditDetail.auditStatusId==det.AppConstant.REOPEN &&  (det.userRoleId==det.AppConstant.MANAGER_ROLE_ID ||det.userRoleId==det.AppConstant.ADMIN_ROLE_ID) ){
    			det.AuditReopenEnableFields=true;
    			det.auditReopnedStatus =true;
    			det.enableNarativeSummary();
    		}
    		
    		det.scopeId = res.scope;
    		
    		det.title = res.title;
    		
    
    		if(det.auditDetail.auditFinding.length >0){
    			det.auditDetail.auditFinding.forEach(function(index){
    				index.findingDetail.filter(function( obj ) {
    				if(obj.currentAuditSeq == det.AppConstant.CAR_UPDATED_CURRENT_SEQ) {
    					det.carUpdateStatus =true;
    					return;
    				  }
                      if(obj.currentAuditSeq != obj.origAuditSeqNo && obj.updatedTypeId==det.AppConstant.MLC_TYPE_ID){
                    	  det.carUpdatedInMlc = true; 
    				   }
    				});	
    				
    			});
    			 
    		}
    		
    		//det.auditMaxDate =  (det.auditDetail.certExpireDate && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID ) ? moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMaxDate ;
        	
    		if(!det.auditDetail.certExpireDate){
        		det.auditMaxDate = '';
        	}
        	
        	if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length > 0 && det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
        		var fullTermIsThere = 0;
        		det.auditDetail.certificateDetail.forEach(function(index){ 
						if(index.certIssueId == det.AppConstant.FULL_TERM_CERT && index.publishStatus ==1){
							det.RenewalEndorsedGenrate = false; 
							fullTermIsThere = 1;
						} if(fullTermIsThere==0 && ((index.certIssueId==det.AppConstant.RENEWAL_ENDORSED1 && index.publishStatus ==1) || (index.certIssueId==det.AppConstant.RENEWAL_ENDORSED2 && index.publishStatus ==1)) ){
							det.RenewalEndorsedGenrate = true; 
						}
					}); 
        	}
        	det.creditDateChange('getCreditDate');
        	
        	
        	
        	callBack();
        	
        	if(det.vesselImoNo.vesselImoNo){ 
        	var auditCycleSearchBean={'vesselName': det.vesselDetail.vesselName ,'vesselImoNo':det.vesselImoNo.vesselImoNo,'auditTypeId':det.auditDetail.auditTypeId};	
        	sessionStorage.setItem('quickSearchDataVesselImoNo', det.vesselImoNo.vesselImoNo );
        	sessionStorage.setItem('quickSearchDataAuditTypeId', det.auditDetail.auditTypeId );
        	sessionStorage.setItem('quickSearchDataVeslNme', det.vesselDetail.vesselName );
        	sessionStorage.setItem('auditCycleSearchBean', auditCycleSearchBean );
        	}
        	
        	
        	
        	
        	
    	}//end of function setAuditData()
        
        
        
        function setVesselLetterHist(auditseqno,response){
        	// <-- IRI-5128
        	response.forEach(function(response){
				response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
				try {
					var auditPlace = response.auditPlace ? atob(response.auditPlace): '-';
							
					response.auditPlace = decodeURIComponent(atob(auditPlace));		//changed by @Ramya for jira id- IRI-5529
				} catch (err) {
					console.log(err);
							
				}
			});
			// -->IRI-5128
        	vesselStatementFactory.getVesselHistory(auditseqno,"auditSeqNo").$promise
			.then(function(resHistory) {
				det.vesselHistory = [];
				console.log("data====>",resHistory);
				det.vesselHistoryCopy = angular.copy(resHistory.result);
				
				var vesHist = [];
				
				det.vesselHistoryCopy.forEach(function(hist,index){
						if(vesHist.length>0){
							var cntDet = 0
							vesHist.forEach(function(arr,key){
								if(arr.VESSEL_ADDRESS!=hist.VESSEL_ADDRESS)
									cntDet++;
								else if(arr.VESSEL_ADDRESS==hist.VESSEL_ADDRESS)
									cntDet--;
								if(arr.VESSEL_NAME!=hist.VESSEL_NAME)
									cntDet++;
								else if(arr.VESSEL_NAME==hist.VESSEL_NAME)
									cntDet--;
							});
							if(cntDet>=0)
								vesHist.push(hist)
						}else{
							cntDet = 0;
								var splitAdd = det.vesselCompanyDtl.vesselCompanyName + "\n" + det.vesselCompanyDtl.vesselCompanyAddress; 
							
								if(splitAdd!=hist.VESSEL_ADDRESS)
									cntDet++;
								if(det.vesselDetail.vesselName!=hist.VESSEL_NAME)
									cntDet++;
								
							if(cntDet>0)
								vesHist.push(hist)
						}
						
				});
				
				vesHist.forEach(function(hist,index){
					
					var resCopy = angular.copy(response);
					resCopy.forEach(function(seNoRes,indexRes){
						if(seNoRes.auditSeqNo == det.auditSeqNo){
							var splitAdd = hist.VESSEL_ADDRESS.split("\n");
							
							resCopy[indexRes].companyAddressAud = splitAdd[1];
							resCopy[indexRes].companyName = splitAdd[0];
							resCopy[indexRes].vesselNameAud = hist.VESSEL_NAME;
							resCopy[indexRes].slNo = det.LetterHistoryDetails.length+1 + index;
							det.vesselHistory.push(resCopy[indexRes]);
						}
					});
					
				});
				console.log(det.vesselHistory)
				console.log(det.auditDetail)
				console.log(det.auditDetail.certificateDetail)
				console.log(det)
			});


        	
        	
        }
        
        
        
        /********** for setting previous finding records **********/

        function setPrevFindingsRecords(){ 
        	
        	var auditDate = det.auditDetail.auditDate?moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
    		
        	if(auditDate){
    		detailsFactoryIhm.getPrevFindingDetails(det.auditDetail.auditTypeId,auditDate,det.vesselImoNo.vesselImoNo,det.auditDetail.auditSeqNo,det.auditDetail.companyId,det.vesselCompanyDtl.companyImoNo,det.vesselCompanyDtl.docTypeNo).$promise.then(function(res){
    			
    			det.prevFindingDataFetch = true;
    			
    			res = res.filter(function( obj ) {
    				 if(obj.findingStatus==0){ 
            	    	  det.preFindingClosed=false;
            	    	 }
    				return obj.findingDetail.length>0 && obj.findingDetail[0].categoryId != det.AppConstant.OBS_FINDING_CATEGORY;
    			});
    			
    			det.observationarrayprevious = res.filter(function( obj ) {
    				
    				return (obj.findingDetail[obj.findingDetail.length -1].statusId != det.AppConstant.VERIFIED_CLOSED || obj.findingDetail[obj.findingDetail.length -1].currentAuditSeq >= det.auditSeqNo || ((obj.findingDetail[obj.findingDetail.length -1].currentAuditSeq == 600000) && (obj.findingDetail[obj.findingDetail.length -1].statusDate>moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD))));
    			});
    			 
    			_.countFindingCategory(det.observationarrayprevious,det.auditTypeId,"PREV",det.obsCategoryOptions);

    			if(det.openForCar){
    				
    		    	if(det.prevAdtDataFetch){
    		    		if($state.params.page=='prevFind'){
        					det.previousFinding();
        				}if($state.params.page=='currFind'){
        					det.currentFinding();
        				}
    		    	}
    		    }

    		});
        }
        	
        }
        
        
        /****date format conversion****/
        function dateFormatConversion(obj,formPattern,toPattern){
        	
        	
    		/*if(obj.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID || obj.auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID){
    			obj.certExpireDate = obj.endorseExpireDate?moment(obj.endorseExpireDate,formPattern).format(MMMDDYYYY):obj.certExpireDate;
        	}*/
        	
        	 
    		
        	if(formPattern==YYYYMMDD && toPattern==MMMDDYYYY){
        		
            	/*obj.openMeetingDate = obj.openMeetingDate?moment(new Date(obj.openMeetingDate),formPattern+HHmm).format(toPattern+HHmm):'';
        		
        		obj.closeMeetingDate = obj.closeMeetingDate?moment(new Date(obj.closeMeetingDate),formPattern+HHmm).format(toPattern+HHmm):'';*/
        		
        		//obj.openMeetingDate = obj.openMeetingDate ? moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern+HHmm) :'';
        			
        		//obj.openMeetingDate = (obj.openMeetingDate && obj.auditTypeId != det.AppConstant.IHM_TYPE_ID) ? moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern+HHmm) : ( obj.openMeetingDate && obj.auditTypeId == det.AppConstant.IHM_TYPE_ID ? moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern):'');
        		 
        		obj.openMeetingDate = obj.openMeetingDate?moment(obj.openMeetingDate,formPattern).format(toPattern):'';	
        		
        		obj.closeMeetingDate = obj.closeMeetingDate?moment(obj.closeMeetingDate,formPattern+HHmm).format(toPattern+HHmm):'';
        		
        		/*obj.auditDate = obj.auditDate?moment(new Date(obj.auditDate),formPattern).format(toPattern):'';
       		    
        		obj.certExpireDate = obj.certExpireDate?moment(new Date(obj.certExpireDate),formPattern).format(toPattern):'';
        			
            	obj.certIssueDate = obj.certIssueDate?moment(new Date(obj.certIssueDate),formPattern).format(toPattern):'';
        		
            	obj.dateIns = obj.dateIns?moment(new Date(obj.dateIns),formPattern).format(toPattern):'';
            	
            	obj.dateOfRegistry = obj.dateOfRegistry?moment(new Date(obj.dateOfRegistry),formPattern).format(toPattern):'';
    			
        		obj.creditDate = obj.creditDate?moment(new Date(obj.creditDate),formPattern).format(toPattern):'';
        		
        		obj.creditDateFromCyle = obj.creditDateFromCyle?moment(new Date(obj.creditDateFromCyle),formPattern).format(toPattern):'';
    		*/
        		obj.auditDate = obj.auditDate?moment(obj.auditDate,formPattern).format(toPattern):'';
       		    
        		obj.certExpireDate = obj.certExpireDate?moment(obj.certExpireDate,formPattern).format(toPattern):'';
        			
            	obj.certIssueDate = obj.certIssueDate?moment(obj.certIssueDate,formPattern).format(toPattern):'';
            	
            	obj.additionalSurvey = obj.additionalSurvey && obj.additionalSurvey != 'N.A'  ? moment(obj.additionalSurvey,formPattern).format(toPattern): (obj.additionalSurvey == 'N.A' ? 'N.A' :''); 
        		
            	obj.dateIns = obj.dateIns?moment(obj.dateIns,formPattern).format(toPattern):'';
            	
            	obj.dateOfRegistry = obj.dateOfRegistry?moment(obj.dateOfRegistry,formPattern).format(toPattern):'';
    			
        		obj.creditDate = obj.creditDate?moment(obj.creditDate,formPattern).format(toPattern):'';
        		
        		obj.creditDateFromCyle = obj.creditDateFromCyle?moment(obj.creditDateFromCyle,formPattern).format(toPattern):'';
        		
        		
        		
        		det.vesselDetail.vesselName=obj.vesselNameAud ? obj.vesselNameAud : det.vesselDetail.vesselName;
        			
        		                        
        			
        		 det.vesselDetail.vesselTypeName = obj.vesselTypeAud ? obj.vesselTypeAud  :det.vesselDetail.vesselTypeName;
        			
        		                        
        			
        		 det.vesselDetail.officialNo = obj.officialNoAud ? obj.officialNoAud  :det.vesselDetail.officialNo;
        			
        		                        
        			
        		det.vesselCompanyDtl.companyImoNo = obj.companyImoNo ? obj.companyImoNo  :det.vesselCompanyDtl.companyImoNo;
        			
        		                        
        			
        		 det.vesselCompanyDtl.docType = obj.docTypeNoAud ? obj.docTypeNoAud  :det.vesselCompanyDtl.docType;
        			
        		                        
        			
        		det.vesselCompanyDtl.docIssuer = obj.docIssuerAud ? obj.docIssuerAud  :det.vesselCompanyDtl.docIssuer;
        			
        		                        
        			
        		det.vesselCompanyDtl.companyAddress = obj.companyAddressAud ? obj.companyAddressAud  :det.vesselCompanyDtl.companyAddress;
        			
        		                        
        			
        		det.vesselCompanyDtl.docExpiry = obj.docExpiryAud?moment(obj.docExpiryAud,formPattern).format(toPattern):det.vesselCompanyDtl.docExpiry ;
        		                        
    		
        	}else if(formPattern==MMMDDYYYY && toPattern == YYYYMMDD){
    			
    			/*obj.openMeetingDate = obj.openMeetingDate  ? new Date(Date.parse((moment(obj.openMeetingDate,formPattern+HHmm).format(DDMMMYYYY+HHmm)).replace(/-/g,' ')))	: '';
						
    			obj.closeMeetingDate = obj.closeMeetingDate ? new Date(Date.parse((moment(obj.closeMeetingDate,formPattern+HHmm).format(DDMMMYYYY+HHmm)).replace(/-/g,' ')))	: '';*/
        		
        		obj.openMeetingDate = obj.openMeetingDate ? moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern+HHmm) : ''; 
        		
        		//obj.openMeetingDate = (obj.openMeetingDate && obj.auditTypeId != det.AppConstant.IHM_TYPE_ID ) ? moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern+HHmm)	: ( obj.openMeetingDate && obj.auditTypeId == det.AppConstant.IHM_TYPE_ID ?  moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern) :'');
        		 
    			obj.closeMeetingDate = obj.closeMeetingDate ? moment(obj.closeMeetingDate,formPattern+HHmm).format(toPattern+HHmm)	: '';
				
        		/*obj.auditDate = obj.auditDate?new Date(Date.parse((moment(obj.auditDate+' 00:00',formPattern).format(DDMMMYYYY+HHmm)).replace(/-/g,' ')))	: '';
    			
				obj.certExpireDate = obj.certExpireDate?new Date(Date.parse((moment(obj.certExpireDate+' 00:00',formPattern+HHmm).format(DDMMMYYYY+HHmm)).replace(/-/g,' ')))	: '';
    			
				obj.certIssueDate = obj.certIssueDate?new Date(Date.parse((moment(obj.certIssueDate+' 00:00',formPattern+HHmm).format(DDMMMYYYY+HHmm)).replace(/-/g,' ')))	: '';
				
				obj.creditDate = obj.creditDate?new Date(Date.parse((moment(obj.creditDate,formPattern).format(DDMMMYYYY)).replace(/-/g,' ')))	: '';
				
				obj.creditDateFromCyle = obj.creditDateFromCyle?new Date(Date.parse((moment(obj.creditDateFromCyle,formPattern).format(DDMMMYYYY)).replace(/-/g,' ')))	: '';
				*/
    			
				obj.auditDate = obj.auditDate?moment(obj.auditDate,formPattern).format(YYYYMMDD) : '';
				
				obj.certExpireDate = obj.certExpireDate?moment(obj.certExpireDate,formPattern).format(YYYYMMDD)	: '';
				
				obj.certIssueDate = obj.certIssueDate?moment(obj.certIssueDate,formPattern).format(YYYYMMDD)	: '';
				
				obj.additionalSurvey = obj.additionalSurvey && obj.additionalSurvey != 'N.A' ? moment(obj.additionalSurvey,formPattern).format(YYYYMMDD) : (obj.additionalSurvey == 'N.A' ? 'N.A' :'');
				
				obj.creditDate = obj.creditDate?moment(obj.creditDate,formPattern).format(YYYYMMDD)	: '';
				
				obj.creditDateFromCyle = obj.creditDateFromCyle?moment(obj.creditDateFromCyle,formPattern).format(YYYYMMDD)	: '';
				
				/*var userTimezoneOffset = obj.auditDate.getTimezoneOffset() * 60000;
				obj.auditDate = new Date(obj.auditDate.getTime() - userTimezoneOffset);*/
    		}
       
         }// end of dateFormatConversion
        
        function dateFormatConversionPreAudit(obj,toPattern){

       	 obj.forEach(function(preAudit,index){ // previous audit date format conversion 
       		
       		preAudit.auditDate = preAudit.auditDate ? moment(preAudit.auditDate).format(toPattern):'';
       		preAudit.certExpireDate = preAudit.certExpireDate? moment(preAudit.certExpireDate).format(toPattern):'';
       		preAudit.certIssueDate = preAudit.certIssueDate? moment(preAudit.certIssueDate).format(toPattern):'';
       		preAudit.openMeetingDate = preAudit.openMeetingDate?moment(preAudit.openMeetingDate).format(DDMMMYYYY):'';
       		preAudit.closeMeetingDate = preAudit.closeMeetingDate?moment(preAudit.closeMeetingDate).format(toPattern):'';
       		
       		 /*  preAudit.certificateDetails.forEach(function(preCertDetails){
       			
       			preCertDetails.auditDate = preCertDetails.auditDate? moment(new Date(preCertDetails.auditDate)).format(toPattern):'';
       			preCertDetails.certExpireDate = preCertDetails.certExpireDate? moment(new Date(preCertDetails.certExpireDate)).format(toPattern):'';
       			preCertDetails.certIssueDate = preCertDetails.certIssueDate? moment(new Date(preCertDetails.certIssueDate)).format(toPattern):'';
       			preCertDetails.creationDate = preCertDetails.creationDate? moment(new Date(preCertDetails.creationDate)).format(toPattern):'';
       			preCertDetails.dateOfRegistry = preCertDetails.dateOfRegistry? moment(new Date(preCertDetails.dateOfRegistry)).format(toPattern):'';
       			preCertDetails.docExpiry = preCertDetails.docExpiry? moment(new Date(preCertDetails.docExpiry)).format(toPattern):'';
       			preCertDetails.dateIns = preCertDetails.dateIns? moment(new Date(preCertDetails.dateIns)).format(toPattern):'';
       		   
       		     });*/
       		     
       		     preAudit.certificateDetail.forEach(function(preCertDetails){
       			
       			preCertDetails.auditDate = preCertDetails.auditDate? moment(preCertDetails.auditDate).format(toPattern):'';
       			preCertDetails.certExpireDate = preCertDetails.certExpireDate? moment(preCertDetails.certExpireDate).format(toPattern):'';
       			preCertDetails.certIssueDate = preCertDetails.certIssueDate? moment(preCertDetails.certIssueDate).format(toPattern):'';
       			preCertDetails.creationDate = preCertDetails.creationDate? moment(preCertDetails.creationDate).format(toPattern):'';
       			preCertDetails.dateOfRegistry = preCertDetails.dateOfRegistry? moment(preCertDetails.dateOfRegistry).format(toPattern):'';
       			preCertDetails.docExpiry = preCertDetails.docExpiry? moment(preCertDetails.docExpiry).format(toPattern):'';
       			preCertDetails.dateIns = preCertDetails.dateIns? moment(preCertDetails.dateIns).format(toPattern):'';
       		   
       		     });
         	}); 
      
        }
        
        function dmlcFinding(){  
        	
        	var data = {
        			auditStatusId	  : det.auditDetail.auditStatusId,
        			leadStatus		  : det.notLead,
        			openMeeting		  : det.auditDetail.openMeetingDate?det.auditDetail.openMeetingDate:det.auditMinDate?moment(det.auditMinDate,YYYYMMDD).format(MMMDDYYYY):'', //openMeeting		: det.auditDetail.openMeetingDate?moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):det.auditMinDate,
        			closeMeeting	  : det.auditDetail.closeMeetingDate?moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD):det.maxCloseMeetingDate,
        			auditorSignature  : det.auditDetail.auditAuditorDetail[0].audSignature?false:true,
        			lockStatus		  : det.lockStatus,
        			auditDate		  : det.auditDetail.auditDate,
        			vesselImoNo		  : det.vesselImoNo,
        			companyImoNo	  : det.vesselCompanyDtl.companyImoNo,
        			docTypeNo		  : det.vesselCompanyDtl.docTypeNo,
        			reviewStatus	  : (det.auditDetail.reviewStatus==1)?true:false,
        			enabled           : det.enabled,
        			reviewerSign      : det.reviewerSign,
        			leadSign    	  : det.leadSign,
        			auditPlace 		  : det.auditDetail.auditPlace,
        			auditSubtypeId    : det.auditDetail.auditSubTypeId,
        			auditDetail       : det.auditDetail,
        			findingData		  : det.auditDetail.auditFinding,
                	prevFinding		  : det.observationarrayprevious,
                	dmlcFinding       : det.dmlcFindingAray,
                	sspDmlcAuditSeqNo : det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo?det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo:''
        	};
        
        	auditFactory.setDmlcFindingData(data);

            $state.go('app.audit.dmlcfindings',{},{reload:true});
       } 
        
        	function previousFinding(){ 
        	        	
        	        	var data = {
        	        			auditStatusId	: det.auditDetail.auditStatusId,
        	        			leadStatus		: det.notLead,
        	        			openMeeting		: det.auditDetail.openMeetingDate?det.auditDetail.openMeetingDate:det.auditMinDate?moment(det.auditMinDate,YYYYMMDD).format(MMMDDYYYY):'', //openMeeting		: det.auditDetail.openMeetingDate?moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):det.auditMinDate,
        	        			closeMeeting	: det.auditDetail.closeMeetingDate?moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD):det.maxCloseMeetingDate,
        	        			auditorSignature: det.auditDetail.auditAuditorDetail[0].audSignature?false:true,
        	        			lockStatus		: det.lockStatus,
        	        			auditDate		: det.auditDetail.auditDate,
        	        			vesselImoNo		: det.vesselImoNo,
        	        			companyImoNo	: det.vesselCompanyDtl.companyImoNo,
        	        			docTypeNo		: det.vesselCompanyDtl.docTypeNo,
        	        			reviewStatus	: (det.auditDetail.reviewStatus==1)?true:false,
        	        			findingData		: det.auditDetail.auditFinding,
        	        			enabled         : det.enabled,
        	        			reviewerSign    : det.reviewerSign,
        	        			leadSign    	: det.leadSign,
        	        			auditPlace 		: det.auditDetail.auditPlace,
        	        			auditSubtypeId  : det.auditDetail.auditSubTypeId,
        	        			auditDetail     : det.auditDetail,
        	        			lockDisable		: det.lockDisable ? det.lockDisable : '',
        	        			auditComplteLaptop : (det.auditDetail.auditComplteLaptop && det.auditDetail.auditComplteLaptop == 1) ? true:'',
        	        			openForCar		   :(det.openForCar==true) ? 1:''
        	        	};
        	        
        	        	auditFactory.setFindingData(data);

        	            $state.go('app.audit.prevfindings',{},{reload:true});
        	       }  
        	 

        function currentFinding(){
        	 
    		var data = {
        			auditStatusId	: det.auditDetailBeforeUpdate.auditStatusId,
        			lockStatusValue	: det.auditDetail.lockStatus,
        			leadStatus		: det.notLead,
        			openMeeting		: det.auditDetailBeforeUpdate.openMeetingDate?moment(det.auditDetailBeforeUpdate.openMeetingDate,YYYYMMDD+HHmm).format(MMMDDYYYY+HHmm):det.minOpenMeetingDate?moment(det.minOpenMeetingDate,YYYYMMDD).format(MMMDDYYYY):'',
        			closeMeeting	: det.auditDetailBeforeUpdate.closeMeetingDate?moment(det.auditDetailBeforeUpdate.closeMeetingDate,YYYYMMDD+HHmm).format(MMMDDYYYY+HHmm):'',
        			auditorSignature: det.auditDetail.auditAuditorDetail[0].audSignature?true:false,
        			lockStatus		: det.lockStatus,
        			auditDate		: det.auditDetailBeforeUpdate.auditDate ? moment(det.auditDetailBeforeUpdate.auditDate,YYYYMMDD).format(MMMDDYYYY):'',
        			reviewStatus	: det.auditDetail.reviewStatus,
        			findingData		: det.auditDetail.auditFinding,
        			prevFinding		: det.observationarrayprevious,
        			enabled         : det.enabled,
        			leadSign    	: det.leadSign,
        			reviewerSign    : det.reviewerSign,
        			openForCar      : det.openForCar,
        			auditPlace 		: det.auditDetail.auditPlace,
        			auditSubtypeId  : det.auditDetail.auditSubTypeId,
        			lastSameAuditDate:det.lastSameAuditDate,
        			lockHolder      : det.enabled ? det.lockHolder ? det.lockHolder : sessionStorage.getItem('emailId') : '',
        			auditReopnedStatus:det.auditReopnedStatus ?det.auditReopnedStatus:'',
        			vesselImoNo 	: det.vesselImoNo ? det.vesselImoNo.vesselImoNo : '',
        			lockDisable		: det.lockDisable? det.lockDisable : '',
        			auditAuditorDetail :det.auditDetail.auditAuditorDetail	?det.auditDetail.auditAuditorDetail	:'',
        			auditReportNo   : det.auditDetail.auditReportNo,
        			nextAdtCreated  : det.nextCreatedBlockFinding ? det.nextCreatedBlockFinding : '',
        			auditMinDate	: det.auditMinDate ? det.auditMinDate : ''
        	};
        	
        	auditFactory.setFindingData(data);

            $state.go('app.audit.findings',{},{reload:true});

        }


        function toggle(event){
        	
        	var parent=angular.element(document.querySelector('#collapseAtOne'));
    				
        		if(angular.element(event.target).hasClass('collapsed')){
        		
        			for(var i=0; i<parent.context.childElementCount; i++){
        				
        				angular.element(parent[0].childNodes[i].firstChild).addClass('collapsed');
        				angular.element(parent[0].childNodes[i].lastChild).removeClass('in');
        				
        			}
        			
        			angular.element(event.target).removeClass('collapsed');
            		
        			angular.element(event.target.parentNode.lastChild).addClass('in');
        		
        		}else{
        			angular.element(event.target).addClass('collapsed');
            		
        			angular.element(event.target.parentNode.lastChild).removeClass('in');
        		
        		}
    	}
        
        /***on click of save collecting screen data/preparing JSON to save***/
        function setAuditDetailData(){
    		
        	var auditData = angular.copy(det.auditDetail);
        	
        	auditData.certExpireDate = det.auditDetail.certExpireDate;
        	
        	auditData.vesselImoNo = det.vesselImoNo.vesselImoNo ? det.vesselImoNo.vesselImoNo : '';
    				
        	auditData.companyImoNo = det.vesselCompanyDtl.companyImoNo ? det.vesselCompanyDtl.companyImoNo : '';
    						
        	auditData.companyDoc = det.vesselCompanyDtl.docTypeNo ? det.vesselCompanyDtl.docTypeNo : '';
        	
        	auditData.docTypeNumber = auditData.docTypeNumber ? auditData.docTypeNumber : det.vesselDetail.docTypeNumber ? det.vesselDetail.docTypeNumber : '';
    		
        	auditData.companyDoc =	det.compnayDocFromAuditDetail ?  det.compnayDocFromAuditDetail : auditData.companyDoc;
        	
        	auditData.docTypeNumber = det.docTypeNorFromAuditDetailTypeNor ? det.docTypeNorFromAuditDetailTypeNor : auditData.docTypeNumber;
        	
        	auditData.grt=Number(det.vesselDetail.grt);
        	
        	//auditData.allowNext = (det.userRoleId == det.AppConstant.ADMIN_ROLE_ID &&  det.auditDetail.auditStatusId == det.AppConstant.REOPEN)?0:det.auditDetail.allowNext;
        	
        	auditData.allowNext = det.auditDetail.allowNext;
        	
          	var selectedSummary = _.filter(det.auditSummary, function(obj){ 
			return obj.sumary ;
        	});
        	
        	auditData.certificateVer = 'IRI-1';
			
			auditData.scope = det.scopeId;
			
			auditData.title = det.title;
        	
        	det.dateFormatConversion(auditData,MMMDDYYYY,YYYYMMDD);
        	
    		auditData.auditSummaryId = selectedSummary.length>0 ? selectedSummary[0].sumary : '';
    		
     		auditData.auditPlace = auditData.auditPlace ? btoa(encodeURIComponent(auditData.auditPlace)) :'';
    		
    		auditData.narrativeSummary = auditData.narrativeSummary ? btoa(encodeURIComponent(auditData.narrativeSummary)) :'';
    		
    		auditData.lockHolder = det.enabled ? det.lockHolder ? det.lockHolder : sessionStorage.getItem('emailId') : '';
    		
    		auditData.userIns = sessionStorage.getItem('emailId');
    		
    		auditData.userInsName = sessionStorage.getItem('usrname');
    		
    		auditData.dateIns = moment(new Date()).format(YYYYMMDD);

    		auditData.dateOfRegistry = det.vesselDetail.dateOfRegistry ? moment( det.vesselDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) :  det.auditDetail.dateOfRegistry ? moment( det.auditDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD) :'' ;
    		
    		det.auditDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry ?  det.vesselDetail.dateOfRegistry : det.auditDetail.dateOfRegistry;
    		
    		auditData.allowNext = det.openForCar? det.AppConstant.ACCEPT : auditData.allowNext;
    				
    		auditData.auditAuditorDetail.forEach(function(a){
    			
    				a.audSignature = a.audSignature?btoa(a.audSignature):'';
    						
    				a.audSignatureDate = a.audSignatureDate?moment(a.audSignatureDate,MMMDDYYYY).format(YYYYMMDD):'';
    		
    				a.dateIns = a.dateIns? moment(a.dateIns,YYYYMMDD).format(YYYYMMDD): '';
    				
    				a.userIns = sessionStorage.getItem('emailId');
    		});
    		
    		
    		
    		 auditData.auditRptAttach.forEach(function(b){
    		
				b.dateIns = b.dateIns? b.dateIns:'';
		      });
    		
    		 
    		 auditData.maxSeqNo = (det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0) ? det.auditDetail.certificateDetail[0].seqNo : '';
    		
    		 auditData.lockStatus = (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID) ? det.AppConstant.NOT_RETRIEVE_STATUS : auditData.lockStatus;
    		
    		
    		 auditData.vesselNameAud =  det.vesselDetail.vesselName ? det.vesselDetail.vesselName : '';
    		 
    		 auditData.vesselTypeAud =det.vesselDetail.vesselTypeName ? det.vesselDetail.vesselTypeName : '';
    		 	
    		 auditData.officialNoAud = det.vesselDetail.officialNo  ?  det.vesselDetail.officialNo: '';
    		 	
    		 auditData.docTypeNoAud = det.vesselCompanyDtl.docType  ?  det.vesselCompanyDtl.docType : '';
    		 	
    		 auditData.docIssuerAud = det.vesselCompanyDtl.docIssuer  ?  det.vesselCompanyDtl.docIssuer : '';
    		 	
    		 auditData.docExpiryAud = det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,MMMDDYYYY).format(YYYYMMDD)  : '';
    		 	
    		 auditData.companyAddressAud = det.vesselCompanyDtl.companyAddress ?  det.vesselCompanyDtl.companyAddress  : '';
    		 
    		delete auditData.auditFinding;
    		delete auditData.certificateData;
    		
    		if(auditData.sspReviewDetail && auditData.sspReviewDetail.length>0){
    			
    			auditData.sspReviewDetail[0].auditTypeId = auditData.auditTypeId;
    			auditData.sspReviewDetail[0].vesselCompanyName = det.vesselCompanyDtl.vesselCompanyName;
    			auditData.sspReviewDetail[0].vesselCompanyAddress = det.vesselCompanyDtl.vesselCompanyAddress;
    			auditData.sspReviewDetail[0].officialNo = det.vesselDetail.officialNo;
    			if(det.approvalLtrStaus==false)
    				{
    				auditData.sspReviewDetail[0].ltrStatus =det.AppConstant.ACCEPT;
    				}
    			else if(det.approvalLtrStaus==true)
    				{
    				auditData.sspReviewDetail[0].ltrStatus =det.AppConstant.NOTACCEPT;
    				}
    			
    		}
    		
    		  
    		/*if(det.auditCreate && det.vesselDetail && det.vesselDetail.vesselId){
    			auditData.vesselId   = Number(det.vesselDetail.vesselId);
    			auditData.vesselName = det.vesselDetail.vesselName;
    		}*/
    		auditData.vesselId   = Number(det.vesselDetail.vesselId);
			auditData.vesselName = det.vesselDetail.vesselName;
    	
			auditData.userRole = det.userRoleId  ? Number(det.userRoleId) : '';
			
			delete auditData.certificateDetail;
			delete  auditData.auditCycle ;
			
			return auditData;
    	}//end of setAuditDetailData()
        
        /***before save Validating screen data***/
        function auditDetailDataValidation(){ 
        	
    		var vesselMailFLag =false;
    		var flag = true;
    		
    		var openMeetingDate = '', closeMeetingDate = '',auditDate='',creditDate='',certificateData='',certExpireDate='';
    		
    		openMeetingDate = det.auditDetail.openMeetingDate ? moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
    		closeMeetingDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
    		auditDate =  det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
    		   		
    		creditDate =  det.auditDetail.creditDate ? moment(det.auditDetail.creditDate,MMMDDYYYY).format(YYYYMMDD):'';
    		certExpireDate =  det.auditDetail.certExpireDate ? moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD):'';
    		
    		if(!det.auditDetail.vendorName){
    			det.auditDetail.vendorName ='NA';
    			
    		}if(!det.auditDetail.vendorAddress){
    			det.auditDetail.vendorAddress ='NA';
    		
    		}
    		
    		
    		
    		if( det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length > 0) {
				 certificateData =	  _.max(det.auditDetail.certificateDetail, function(find){  return   find.seqNo; });	
  			}
    		if(!det.dirInterAndAdditionalAudit &&  det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
			    det.auditMaxDate = det.auditMinDate ? moment(moment(det.auditMinDate,YYYYMMDD).add(3,'year')).format(YYYYMMDD) :  det.auditMaxDate; 
			}
    		if(!det.vesselImoNo || !det.vesselImoNo.vesselImoNo){
    			vesselMailFLag  = true;
    			flag = false;
    			
    			toaster.warning('Please Enter IMO Number');
    			
    		}else if(!det.vesselCompanyDtl.companyImoNo){
    			vesselMailFLag  = true;
    			flag = false;
    			
    			toaster.warning('Please Enter Vessel IMO No');
    			
    		} else if(!det.auditDetail.auditStatusId){
    			
    			flag = false;
    			
    			
    			toaster.warning('Please Enter '+det.auditType+' status'); 
    			
    		}else if(!det.auditDetail.leadAuditorName){
    			
    			flag = false;
    			
    			toaster.warning('Please Enter '+det.auditorType+' Name');
    			
    		}else if(!det.auditDetail.leadAuditorId){
    			
    			flag = false;
    			
    			toaster.warning('Please Enter '+det.auditorType+' ID Number');
    			    			
    		}else if(!det.auditDetail.auditSubTypeId){
    			
    			flag = false;
    			
    			toaster.warning('Please Select the '+det.auditType+' Sub Type'); 
    			
    		}else if(!det.auditDetail.auditReportNo){
    			
    			flag = false;
    			
    			toaster.warning('Please Enter '+det.auditType+' Report No');
    			
    		} else if(det.auditMaxDate && (moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) > det.auditMaxDate)){
    			
    			var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID) ? 'Please Select '+det.auditType+' Date. \n It Should Be less than  '+det.auditType+'`s fourth Anniversary  Date: '+ moment(det.auditMaxDate,YYYYMMDD).format(MMMDDYYYY) : 'Please Select '+det.auditType+' Date \n It Should Be Less then the  '+det.auditType+' Date: \n\n\n'+ moment(det.auditMaxDate,YYYYMMDD).format(MMMDDYYYY);
    			
    			toaster.warning(msg);
    			flag = false;
    		}else if(!det.vesselDetail.grt){
    			
    			flag = false;
    				
    			toaster.warning('Please Enter GRT ');
    			
    		}else if(!det.auditDetail.certIssueDate ){
               var msg='IHM Part I';
     			
     				var approvalDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
            		var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
     				if(!det.auditDetail.auditDate && !det.auditDetail.openMeetingDate){
     					flag = false;
         				toaster.warning('Please Enter '+msg+' Issue Date');
     				}else if(!det.auditDetail.certIssueDate){
     					flag = false;
         				toaster.warning('Please Enter '+msg+' Issue Date');
     				}
//     				if(approvalDate && reciptDate && reciptDate>approvalDate){
//            			flag = false; 
//            			var msg=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID || det.auditDetail.auditTypeId != det.AppConstant.IHM_TYPE_ID)?'Review':'Approval';
//            			toaster.warning(msg+' Date cannot be earlier than the Receipt Date');   
//            		 }
     				
     				 /*if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
	     					var dateMin =det.auditMinDate ?det.auditMinDate :'';
	        				var certIssueDate = det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
	         				if(certIssueDate <= dateMin ){
	        					flag = false;
	        					toaster.warning('IHM Part 1 Amendment  issue date cannot be earlier than the Initial Approval date  ('+moment(dateMin,'YYYY-MM-DD').format('DD-MMM-YYYY')+')');   
	        				}
     				 } */
     			 
            } else if( auditDate && certExpireDate && auditDate >certExpireDate){
            	flag = false;
      			toaster.warning(det.auditType + ' Date Should  be less than or equal to Certificate Expiry Date');
      			
      		}
            else if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID){
    			
    			var approvalDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
    			var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
    			
    			var issueDate =  det.auditDetail.certIssueDate ?  moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
       
       
    			if(approvalDate && reciptDate && (reciptDate>approvalDate && reciptDate!=approvalDate) ){
    			flag = false; 
    			var msg= 'Approval';
    			toaster.warning(msg+'  date should be greater than or equal to Receipt date');   
    			}else if(issueDate && reciptDate && (issueDate>reciptDate && issueDate!=reciptDate)){
    				flag = false; 
    				var msg= 'IHM Part I';
        			toaster.warning(' Receipt date Should be greater than or equal to '+msg+' Issue date');  
    			}else if(issueDate && approvalDate && approvalDate<issueDate){
    				flag = false;
    				var msg1= 'IHM Part I';
        			toaster.warning('Approval Date Should be greater than or equal to '+msg1+' Issue Date '); 
    			}
    			
    			if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID  &&
    					det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
    				var dateMin =det.minAuditDatePerIHM ? det.minAuditDatePerIHM :'';
    				var certIssueDate = det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
    			 
    				if(certIssueDate <= dateMin ){
	    					flag = false;
	    					var subTypeDesc = angular.lowercase(det.previousAudit.audSubTypeDesc);
	    					toaster.warning(' IHM part 1 issue date should be greater than previous ' +subTypeDesc+ ' Approval date   ('+moment(dateMin,'YYYY-MM-DD').format('DD-MMM-YYYY')+')');   
	    			} 
    			}
    			if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && (det.auditDetail.additionalSurvey=="N.A" || det.auditDetail.additionalSurvey=="")){
        			if(det.auditDetail.certificateDetail || det.auditDetail.certificateIhmDetail ){
        				if(det.auditDetail.certificateDetail.length>0){
    		    			flag = false;
    						
    		    			toaster.warning('Please Enter Additional Survey Due Date!');
    	    				}
        			}
        		}
    		}else if(det.auditDetail.certExpireDate && closeMeetingDate && (closeMeetingDate > moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) && ((det.auditDetail.auditSubTypeId != det.AppConstant.INTERIM_SUB_TYPE_ID &&  det.auditDetail.auditSubTypeId != det.AppConstant.INITIAL_SUB_TYPE_ID) || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId != det.AppConstant.FULL_TERM_CERT) ) ){
    			    flag = false;
    				toaster.warning('Please select the '+det.clseMetingdate+' should be less then or equal to Certificate Expiry Date ');
    			 }
    		
    		
    		if(det.auditDetail.auditStatusId!=det.AppConstant.VOID_AUDIT_STATUS && det.auditDetail.certExpireDate && closeMeetingDate && (closeMeetingDate > (moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) > closeMeetingDate && det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID) ){
    			flag = false;
    			toaster.warning('Please select closeMeeting Date  should be less then or equal to Certificate Expiry Date');
    		}else if(det.auditDetail.auditDate && det.auditDetail.certExpireDate && ((moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD)) > (moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) ) && det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
    			flag = false;
    			toaster.warning(det.auditType+' Date should not be more than Expiry Date');
    		
    		}
    		
    		if(!det.auditDetail.auditStatusId){
    			console.log(det.auditDetail.auditStatusId);
    			
    			console.log(!det.auditDetail.auditStatusId);
    			$('#auditstaus').addClass('err');
    		}/*else if(det.auditDetail.auditStatusId){
    			
    			$('#auditstaus').removeClass('err');
    		}*/
    		
    		
    		if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID  &&
					det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && det.previousFullAudit && (det.userRoleId != det.AppConstant.ADMIN_ROLE_ID || det.userRoleId != det.AppConstant.MANAGER_ROLE_ID)){
				var countOfAdditionSurvey = 0;
					console.log(det.previousFullAudit)
				
			     	 det.previousFullAudit.forEach(function (data){
			     		console.log(data.additionalSurvey+" "+data.auditSubTypeId+"---------------------")
		                    if (data.additionalSurvey != 'N.A' && data.additionalSurvey != 'null' && data.auditSubTypeId != 1001 && data.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS){
		                    	console.log(data.additionalSurvey+" "+data.auditSubTypeId)
		                    	countOfAdditionSurvey = countOfAdditionSurvey + 1;
		                    	console.log("countOfAdditionSurvey "+countOfAdditionSurvey)
		                    }
			          });
			     	 console.log(det.auditDetail.additionalSurvey)
			     	 console.log(countOfAdditionSurvey)
			     	 if(det.auditDetail.additionalSurvey != 'N.A'){
			     		if(countOfAdditionSurvey ==3 && det.sspDmlcRevisionNo > 3)
			     			countOfAdditionSurvey = det.sspDmlcRevisionNo;
			     		 if(countOfAdditionSurvey > 3 && det.sspDmlcRevisionNo > 3){
					    	 flag = false;
					     	toaster.warning('Maximum 3 Amendment Reviews are completed with Additional Survey Due Date');
					     	det.auditDetail.additionalSurvey = 'N.A'
					     } 
			     	 }
			    
    		}
    		if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
	    		var previousVesselCheck = det.previousAudit ? det.previousAudit.certificateIhmDetail ? det.previousAudit.certificateIhmDetail[0] : '' : '';
	    		console.log(previousVesselCheck)
	    		
	    		
				
	    		if(previousVesselCheck){
	    			if(previousVesselCheck.socType == 'eu' || previousVesselCheck.socType == 'hk')
		    			previousVesselCheck.socName = 'HK/EU'
					
					if(previousVesselCheck.socType == 'exe')
						previousVesselCheck.socName = 'EXEMPTION'
	    			
	    			checkCertificateVesselDeatils(previousVesselCheck,'initialCheck');
	    		}
    		}
    		return flag;
    	}
        
        function createValidation(){
        	
        	if(det.auditDetail.auditStatusId){
        		   			
    			$('#auditstaus').removeClass('err');
    		}
        	
        	 if(det.auditDetail.openMeetingDate){
        		
     			$('#openmeet').removeClass('err');
     		}
        	
        	 
        	 if(det.auditDetail.closeMeetingDate){
         		
      			$('#closemeet').removeClass('err');
      		}
        	 
        	 if(det.auditDetail.auditPlace){
      		   
      		   $('#auditplace').removeClass('err');
      	   }
        	 
        }
        
        function setAuditSummary(index){
         
            var ncOpenCount=''; var mncOpenCount=''; 
    		var lengthOfFindingExceptObs=det.lengthOfFindingExceptObs();
    		
    		det.auditDetail.auditFinding.forEach(function(indexval){ 
    			
    		var categoryId=indexval.findingDetail[indexval.findingDetail.length-1].categoryId;
    		var nextActionId= indexval.findingDetail[indexval.findingDetail.length-1].nextActionId;
    		
    	
    			if(indexval.findingDetail.length>0 &&  categoryId==1003 ){
    				mncOpenCount=1; }
    			if(indexval.findingDetail.length>0 &&  categoryId==1001 ){
    				mncOpenCount=1;}
    			
    			if(indexval.findingDetail.length>0 && categoryId ==1002){
    				ncOpenCount=1;}
    			
    		}); 
    		var msg=' Review ';
    		det.auditSummary.forEach(function(a,ind){ 
    			 a.sumary = (ind==index) ? a.audSummaryId : '';
        		 var status=det.isAllFindingClose();
        			
  				  a.sumary = (ind==index) ? a.audSummaryId : a.sumary;
        			if(ind==index){
        				det.ihmCertModal = {
        			   		       hk : false,
        			   		       eu : false
        			   		     };
        			}else{
        				det.ihmCertModal = {
        			   		       hk : true,
        			   		       eu : true
        			   		     };
        			}
        			
  				  det.disabledApproveButton=(a.sumary==1005)?true:false;
        		  det.auditDetail.auditSummaryId = a.sumary ? a.sumary : det.auditDetail.auditSummaryId;
        		});
    		 
        	
		}
        
        /***on click of Add Auditor/Inspector button opening Auditors add screen***/
        function auditorDetail(){

    		ModalService.showModal({
    			
    			templateUrl : 'src/modals/auditorDetail.html',
    			
    			controller  : 'auditorDetailController as auditor',
    			
	            inputs : {
	            	
	            	scope:det
	            }
    		
    		}).then(function(modal) {
    			
    			modal.element.modal();
    			
	            modal.close.then(function(result) {
	            	
	            });
	            
    		});
	   
    	}//end of auditorDetail()
        
        /**on click of save button validating screen data and saving**/
        function validateAndSaveAuditData(){
        	
	        	det.setSummaryAndDueDate();
	        	
	        
	        	if(det.auditDetailDataValidation()){
	        	 
	        		det.saveAuditData('Data Saved Successfully');
	        		
	        		det.openMeetingDatevalue=det.auditDetail.openMeetingDate;
	        				
	        		det.closeMeetingDatevalue=det.auditDetail.closeMeetingDate;
	        		
	        		det.auditPlacevalue=det.auditDetail.auditPlace;
	        		
	        		det.summaryvalue=det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY;
	        		
	        		det.certIssueVal=det.auditDetail.certIssueDate;
	        		 
	        		det.certExpireVal=det.auditDetail.certExpireDate;
	        		
	        		det.dmlcreportVal=det.auditDetail.sspReviewDetail.length>0?det.auditDetail.sspReviewDetail[0].sspReportNo:'';
	        		
	        			if (det.ihmCertModal.hk == true && det.ihmCertModal.eu == true){
	            			det.auditDetail.sspReviewDetail[0].reviewSummary ='11';
	            		}else if (det.ihmCertModal.hk == true && det.ihmCertModal.eu == false){
	            			det.auditDetail.sspReviewDetail[0].reviewSummary ='10';
	            		}else if (det.ihmCertModal.hk == false && det.ihmCertModal.eu == true){
	            			det.auditDetail.sspReviewDetail[0].reviewSummary ='01';
	            		}else if (det.ihmCertModal.hk == false && det.ihmCertModal.eu == false){
	            			det.auditDetail.sspReviewDetail[0].reviewSummary ='00';
	            		}
	        			
	        			
	        			 
	    			 
	        		
	        	}
	        	  /*var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
	        		  if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)){
	        			det.receiptLtr= true;
	        		}*/
					var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
					var reciptDateOrg = det.auditDetailOrg ? moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY):'';
					  if(reciptDate!=reciptDateOrg){		//added by ramya for jira id-->IRI-5291
						  det.receiptLtr= true;
					  }
			
 
        }//end of validateAndSaveAuditData()
       
        /***get screen data as json and send to server to save/store in DB***/
        function saveAuditData(todterMsg,event){
        
        	det.certInactive = det.auditDetail.auditSummaryId;
        	detailsFactoryIhm.getAuditDetailAndCheckSameAudit(det.auditTypeId,det.companyId,det.auditSeqNo,det.vesselImoNo.vesselImoNo).$promise.then(function(res) {
        		
        		if(det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS && det.leadSign){
        			det.auditDetail.reviewStatus = det.AppConstant.ACCEPTED_REVIEW_STATUS;
        		}else if(det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS && !det.leadSign){
        			det.auditDetail.reviewStatus = det.AppConstant.INITIATE_REVIEW_STATUS;
        		}else if(det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS && !det.leadSign){
        			det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
        		}
        		
        	if(res.auditDetail && res.auditDetail.lockStatus==det.AppConstant.RETRIEVE_STATUS && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
					
					toaster.warning('Current '+det.auditType+' is retrived in the Laptop/Mobile '+det.auditType+' Application by '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString());
				
					/*if('initiateReview' == event){
						det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
	        		}*/
					
					return;
					
        		}else if(!res.auditDetail && res.sameAuditCount>0){
        			
        			toaster.warning('Previous '+det.auditType+' is not completed yet');
        			return;
    			
        		}else{
        		
        			/* Reopen validation for manager and admin */
            		if( !det.managerChangingLeadFlag && !det.managerCreatingAudit &&  (det.userRoleId == det.AppConstant.ADMIN_ROLE_ID || det.userRoleId == det.AppConstant.MANAGER_ROLE_ID)){
            		  if(!det.checkFindingClosed() && det.auditDetail.auditStatusId ==1002){
            			  det.checkFlagValue = false;
        					toaster.warning('Please close all findings to make '+det.auditType+' completed.');
        				}else if(!det.managerCreatingAudit &&  det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS  && det.checkFindingClosed()){
        					det.checkFlagValue = false;
        						toaster.warning('Please change  '+det.auditType+' Status as completed. ');
        			    }else{
        			    	det.checkFlagValue = true;
        			    }
            		}
            		
            		
            		
        			
        			if(det.checkFlagValue==true)
        				{
        			
        			
        			var auditData = det.setAuditDetailData();
        			
        			blockUI.start('Saving The Data');
 	
                    var rev_Sign=_(auditData.auditAuditorDetail).chain().where({'audLeadStatus':0,'auditRoleID':1003}).pluck('audSignature').toString();
 	
                
                    if(det.scopeId == 1001){
                    	//auditData.certificateDetails = [];
                    	auditData.certificateDetail = [];
                    	auditData.certificateNo="";
                    	auditData.certExpireDate="";
                    	auditData.certIssueDate="";
                    	auditData.certIssueId="";
            			
            			}
                   
                    if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
                    	auditData.certificateNo = "Amendment-IHM";
                    }else{
                    	auditData.certificateNo = "Initial-IHM";
                    }
					if(det.auditDetailOrg && det.auditDetailOrg.auditDate && det.auditDetailOrg.certIssueDate && det.auditDetailOrg.openMeetingDate && det.auditDetailOrg.openMeetingDate && det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo)
					{
					var reciptDate= det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
				 	if(moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY)|| det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo){
				   		validateReviewLetterWithAuditStatus=false;
					}
					}
                
                    
                	detailsFactoryIhm.saveAuditData(auditData,det.auditCreateUpdate,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
                		
                		det.auditDetailOrg =  angular.copy(res); console.log(det.auditDetailOrg)
                		
                		
                		//approval letter validation for IHM 
	            		if(res.certIssueDate && res.sspReviewDetail[0].sspRevisionNo){
	            			det.ValidationForReviewLetter=true;
	            		 }else{
	            			det.ValidationForReviewLetter=false;
	            		 }
                		 
	    				if(res.openMeetingDate){
						   det.ValidationForReceiptLetter=true;
						}else{
						   det.ValidationForReceiptLetter=false;
						}
    				
    					 
                		
                		if(det.userRoleId==det.AppConstant.MANAGER_ROLE_ID || det.userRoleId==det.AppConstant.IHM_MANAGER_ROLE_ID ){
        					det.managerCreatingAudit=false;
        				   }
                		
            		        if(res.auditSeqNo){
            		        	
            		        	if(rev_Sign && det.finalReport){
        	    					detailsFactoryIhm.signatureGenBlobData(det.auditDetail.auditSeqNo,det.auditDetail.auditTypeId,det.auditDetail.companyId,1002).$promise.then(function(res){
        	    					 
        	    						det.finalReport = false;
            	    				});
        	    				} 
            		         
            		        	if(det.leadSign){
        	    					detailsFactoryIhm.signatureGenBlobData(det.auditDetail.auditSeqNo,det.auditDetail.auditTypeId,det.auditDetail.companyId,1002).$promise.then(function(res){
        	    					 
        	    						
        	    						det.finalReport = false;
            	    				});
        	    				} 
            		        	
                				if(todterMsg){
                					$timeout(function(){
                			        	auditFactory.getReportData(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
                			        		res.forEach(function(list){
                			        					var newAuditDate=moment(list.STATUS_DATE).format('L');
                			        					var formatedDate=moment(newAuditDate).format('DD-MMM-YYYY');
                			        					list.AUDIT_DATE = (list.VERSION_ID==1003 || list.VERSION_ID==1004) ? formatedDate : det.auditDetail.auditDate ? det.auditDetail.auditDate : '-';
                			    				
                			    	            		list.AUDIT_PLACE = list.AUDIT_PLACE?decodeURIComponent(atob(list.AUDIT_PLACE)):'';
                			    	            		
                			    	    				if(det.auditTypeId != 1006){
                			    	    					    	list.VERSION_TYPE = det.AppConstant.VERSION_ID[list.VERSION_ID].version_type;
                			    	    				}else{
                			    	    							list.VERSION_TYPE = list.VERSION_ID == 1001 ?"Creation Of Review": "Reviewer Signature";
                			    	    					}
                			    	       });
                			        		det.reportHisList = res;
                			          		console.log(det.reportHisList)
                			        	});
                			        	},1500);
                					toaster.success(todterMsg);
                				}
                				else{
                					toaster.success('Data Saved Successfully');
                				}
            					
                				/**** after AUDIT/INSPECTION/REVIEW create default lock that Audit/Inspection/Review with Lead ID****/
                				if(res.auditSeqNo && det.auditCreate && !det.enabled){
                		
                					det.lockStatus = true;
                					
                					detailsFactoryIhm.updateLockHolder(det.auditDetail.auditTypeId, det.auditSeqNo,sessionStorage.getItem('emailId'),det.companyId).$promise.then(function(data){
                	 					if(data.data=='Success'){
                	 						toaster.success('Lock Applied Successfully');
                	 						
                	 						det.enabled = true;
                	 						det.lockDisable=false;
                	 						det.lockStatus = false;
                	 					}
                	 				});
                					
                					if(det.auditCreate){
                						det.setPrevFindingsRecords();
                						 $state.current.data.pageTitle = "UPDATE "+auditType[det.auditTypeId].src ;
                				    }
                					
                					det.auditCreate?sessionStorage.setItem('auditSeqNo',res.auditSeqNo):'';
                					
                					det.auditCreate = false;
                	    		}
                				
            					det.auditDetailBeforeUpdate = {'auditStatusId' : res.auditStatusId, 'auditDate' : res.auditDate, 'openMeetingDate' : res.openMeetingDate, 'closeMeetingDate' : res.closeMeetingDate};
            					
            					det.auditDetail.certificateData = angular.copy(res.certificateDetail);
            					
            					certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
          							 console.log(resp)
          							 det.auditDetail.certificateDataHistory = angular.copy(resp.result);
          							
           						});
            					
            					if(det.auditDetail.certificateData.length==0){
            						
            						certificateFactory.getCertificateIHM(res.vesselImoNo,res.auditSeqNo).$promise.then(function(resp){
            							 console.log(resp)
            							det.auditDetail.certificateData = angular.copy(resp.result);
            							
            		    			});
            						certificateFactory.getIntitalCertForDownloadIhm(res.auditTypeId,res.vesselImoNo,res.companyId).$promise.then(function(resp){
           							 console.log(resp)
           							 det.auditDetail.certificateDataHistory = angular.copy(resp.result);
           							
            						});
            					}
            					 
            				if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
            				    det.auditDetail.certificateData.forEach(function(a){
                        			  a.endorsedDate =  moment(det.auditDetail.additionalSurvey,MMMDDYYYY).format(YYYYMMDD);
            				    });	
            		        } 
            					
            					$rootScope.report=false;
            					
            					$rootScope.lead=false;
            					
            					if(det.AuditDetailForm){
            						
            						det.AuditDetailForm.$dirty=false;
            						
            						
            					}
            					
            					if(event=='/findings')
            						{
            					det.currentFinding();
            						}
            					
            					if(det.auditCreate && det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
            		    			
            		    			var temp =det.auditDetail.certIssueDate? moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
            		    			
            		    			det.auditMinDate = det.auditMinDate > temp ? det.auditMinDate : temp ;
            		    			
            		    			
            		    			if(det.dirInterAndAdditionalAudit)
            		    			{  det.disableCertIssueExpiry =false; 
            		    			    det.auditMinDate = '';
            		    				}
            					}/*else if(det.auditCreate && det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
            		    			
            		    			var temp = moment(moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(2,'years')).format(YYYYMMDD);
            		    			
            		    			det.auditMinDate = det.auditMinDate > temp ? det.auditMinDate : temp ;
            		    			det.auditMaxDate = moment(moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(3,'years')).format(YYYYMMDD);
            		    		}*/
            					
            					det.saveSubType = true;
            					
            					det.currFindingDisable = false;
                				
            					/*if(checkval === true) {
            						
            						$scope.$broadcast('parent',resdata);
            					}*/
            					
            					blockUI.stop();
            					
            				}else{
            					/*if('initiateReview' == event){
            						det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
            	        		}*/
            					blockUI.stop();
            				}
            				
            				
                			res.auditAuditorDetail.forEach(function(a){
                        		if(a.audLeadStatus==1 && a.userId==det.loginUserId){
                                      det.notLead=false; 
                                      
                        			  }
                        		det.managerOrAdminChangeLead=false;
                        	
            				});	
                			
            				if(res.creditDate && det.auditCreateUpdate == det.AppConstant.CREATE){ 
                    			detailsFactoryIhm.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
                    			
                    			det.auditCreateUpdate = det.AppConstant.UPDATE; 
                    			det.creditDateChange('getCreditDate');
                    			  });
                				
                    			
                    		}else if(res.creditDate){ 
                    				 det.creditDateChange('getCreditDate'); 
                    			 } 
            				if(det.auditDetail.auditSubtypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID){
            				  /*auditCycleFactorte(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(cycleAllData) {
            				    	 det.cycleAllData = angular.copy(cycleAllData);
            				     });*/
                	         } 
            				det.auditCreateUpdate = det.AppConstant.UPDATE;
            				
            				
					/*changed by @Ramya for jira id - IRI-5357 - START*/
				detailsFactoryIhm.getPreviousAuditDetail(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(result){
        		
					result.prevAuditDtl.forEach(function(preAuditDtl){
						preAuditDtl.openMeetingDate = preAuditDtl.openMeetingDate?moment(preAuditDtl.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY):''; 
						
					 });
				detailsFactoryIhm.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
						
						response.forEach(function(response){
							response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
							try {
								var auditPlace = response.auditPlace ? atob(response.auditPlace): '-';
										
								response.auditPlace = decodeURIComponent(auditPlace);
							} catch (err) {
								console.log(err);
										
							}
						});
						
						det.LetterHistoryDetails=response;
						console.log(det.LetterHistoryDetails);
						
						setVesselLetterHist(det.auditSeqNo,response);
													
						if(det.userRoleId != det.AppConstant.ADMIN_ROLE_ID &&  det.userRoleId != det.AppConstant.MANAGER_ROLE_ID){  
						  det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
							return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
						  });	 
						}  
					
					});});
					 /*changed by @Ramya for jira id - IRI-5357 - END*/
				});
			}
        	}
        	});

    			det.enableNarativeSummary(); //  added by sudharsan for JIRA-5238
    	}//end of saveAuditData()
        
        
        /*********Audit SubType Change or Select*************/  	
        function auditSubTypeChange(auditSubTypeId){
         
        	det.setRelatedDataOnSubtypeSelect();
        	det.creditDateChange('getCreditDate');
        	det.scopeId = (det.scopeId==1001 && det.auditDetail.auditSubTypeId  != det.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? 1000 : det.scopeId;
        	if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
            	var previousVesselCheck = det.previousAudit ? det.previousAudit.certificateIhmDetail ? det.previousAudit.certificateIhmDetail[0] : '' : '';
        		console.log(previousVesselCheck)
        		
        		if(previousVesselCheck){
        			if(previousVesselCheck.socType == 'eu' || previousVesselCheck.socType == 'hk')
    	    			previousVesselCheck.socName = 'HK/EU'
    				
    				if(previousVesselCheck.socType == 'exe')
    					previousVesselCheck.socName = 'EXEMPTION'
        			
        			checkCertificateVesselDeatils(previousVesselCheck,'dropDown');
        		}
            }
        }//end of auditSubTypeChange()
        
        
        function addSurvDueDateChange(){
        	det.addSurvDueDateChanged = true;
        }
        /*** on subtype select set report number, certificate number, min date and max date****/
        function setRelatedDataOnSubtypeSelect(){
        	 
        	if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
        		det.auditDetail.auditReportNo = det.previousAudit.auditReportNo.split('-')[0] +'-0'+ (parseInt(det.previousAudit.sspRevisionNo)+1);
				det.auditDetail.additionalSurvey = det.auditDetail.additionalSurvey && ( det.auditDetail.additionalSurvey !== undefined )? det.auditDetail.additionalSurvey : 'N.A';
			}
        	
        	var extendedIssueDate='',extendedExpireDate='',certificateNo='' ;
        	
        	if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){
        		
        		det.enableCertificateIssuedType=[det.AppConstant.INTERIM_CERT,det.AppConstant.EXTENSION,det.AppConstant.RE_ISSUE];
        		
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID){
				
				det.enableCertificateIssuedType=[det.AppConstant.FULL_TERM_CERT,det.AppConstant.EXTENSION,det.AppConstant.RENEWAL_ENDORSED1,det.AppConstant.RENEWAL_ENDORSED2,det.AppConstant.RE_ISSUE];
			
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.fullTermIs){
				
				det.enableCertificateIssuedType=[det.AppConstant.FULL_TERM_CERT,det.AppConstant.RENEWAL_ENDORSED2];
			
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
				
				det.enableCertificateIssuedType=[det.AppConstant.FULL_TERM_CERT];
			
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
			
				det.enableCertificateIssuedType=[det.AppConstant.ADDITIONAL_ENDORSED];
				
			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
				
				det.enableCertificateIssuedType=[det.AppConstant.INTERMEDAITE_ENDORSED];
			}
        	
        	var checkAuditMinDate = '';
        	
        	var seqNo='', extensionIssueDate ='', extensionexpiryDate = '';
        	if(det.prevInitialOrRenewal && det.prevInitialOrRenewal.certificateDetail && det.prevInitialOrRenewal.certificateDetail.length>0){
       		 
	       		  seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){  return   find.seqNo; });
	       	      extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
	       		  extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
	       		  certificateNo = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
	       		if(!extensionIssueDate){
	       			 seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){  return   find.seqNo; });
		         	      extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
		         		  extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
		         		 certificateNo = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();	
	       		}
			}
        	
        	if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID) || (det.auditDetail.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.IHM_TYPE_ID) || det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
            	
        		if(det.newCertificateDetails){
        			
        			
    				
        			det.auditSeqNo = det.newCertificateDetails.auditSeqNo;
        			
        			det.auditDetail.auditSeqNo = det.newCertificateDetails.auditSeqNo;
        			
        			det.auditDetail.certificateNo = det.newCertificateDetails.certificateNo;
    				
        			det.auditDetail.auditReportNo = det.newCertificateDetails.auditReportNo;
        			
        			
    			}else{
    				
    				det.getNewCertificate();
    				
    			}
        	}

        	det.auditMinDate = det.minAuditDatePer ? det.minAuditDatePer : '' ;
        	if(det.auditSummary.length>3){
        		det.auditSummary[3].sumary = '';
        	}
        	
 			if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID ){
 				det.auditDetail.certIssueId = det.AppConstant.FULL_TERM_CERT;
 				det.auditDetail.interalAuditDate = '';
 				det.maxOpenMeetingDate = '';
 	 			det.maxCloseMeetingDate = '';
 				det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
 	 			det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.maxCloseMeetingDate;
 			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
 				
 				if(det.noPreviousAudits){
 					det.dirInterAndAdditionalAudit = true;
 				}
 				det.auditDetail.certIssueId = det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ? det.AppConstant.INTERMEDAITE_ENDORSED : det.AppConstant.ADDITIONAL_ENDORSED;
 				
 				if(det.newCertificateDetails){
 					
 					
 					
 					det.auditSeqNo = det.newCertificateDetails.auditSeqNo;
        			
        			det.auditDetail.auditSeqNo = det.newCertificateDetails.auditSeqNo;
        			
        			det.auditDetail.auditReportNo = det.newCertificateDetails.auditReportNo;
 					
    			}else{
    				
    				detailsFactoryIhm.getAuditSeqNo(det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
     					det.auditSeqNo = res.data;
     					det.auditDetail.auditSeqNo = res.data;
     				});
    				
    				detailsFactoryIhm.getAuditReportNo(det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
    					det.auditDetail.auditReportNo = res.data;
     				});
    			}
 				
 				det.auditDetail.certificateNo = det.previousAudit.certificateNo ? det.previousAudit.certificateNo : !(det.auditDetail.auditSeqNo && det.auditDetail.certificateNo && det.auditDetail.auditReportNo) ? det.getNewCertificate() : det.auditDetail.certificateNo;   
    			
 				
 				if(det.prevRenewal && det.prevRenewal.certificateDetail && det.prevRenewal.certificateDetail.length>0){
 		    		     seqNo =	_.max(det.prevRenewal.certificateDetail, function(find){  return   find.seqNo; });
	         	         extensionIssueDate = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
	         		     extensionexpiryDate = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
	         		    certificateNo = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
	         		     if(!extensionIssueDate){
	         			 seqNo =	_.max(det.prevRenewal.certificateDetail, function(find){  return   find.seqNo; });
		         	      extensionIssueDate = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
		         		  extensionexpiryDate = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
		         		 certificateNo = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
	         		     }
    			}
    			/* no Initial no Renewal and for direct additional follwed by additional */
    			if(!extensionIssueDate && det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0){
    				seqNo =	_.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; });
        	         extensionIssueDate = _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
        		     extensionexpiryDate = _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
        		  if(!extensionIssueDate){
        			 seqNo =	_.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; });
	         	      extensionIssueDate = _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
	         		  extensionexpiryDate = _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
	         	   }
			     }
    	      
    			det.auditDetail.certificateNo = certificateNo ? certificateNo : det.auditDetail.certificateNo;
    	         //det.auditDetail.certIssueDate =  extensionIssueDate ? moment( extensionIssueDate ,YYYYMMDD).format(MMMDDYYYY)   : det.previousAudit.certIssueDate?moment(det.previousAudit.certIssueDate,YYYYMMDD).format(MMMDDYYYY):'';
    	         
    			 det.auditDetail.certExpireDate = extensionexpiryDate ? moment( extensionexpiryDate ,YYYYMMDD).format(MMMDDYYYY) : det.previousAudit.certExpireDate?moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY):'';
    			
    	       det.auditDetail.interalAuditDate = 'N.A.';
    			
    			checkAuditMinDate = (det.previousAudit.auditDate) ? moment(det.previousAudit.auditDate,YYYYMMDD).format(YYYYMMDD) : det.auditMinDate; //(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? det.previousAudit.certIssueDate : moment(moment(det.previousAudit.certIssueDate,YYYYMMDD).add(2,'years')).format(YYYYMMDD);
    		
    			checkAuditMinDate = (  det.carFindMaxStatusDate  &&  det.carFindMaxStatusDate  > checkAuditMinDate ) ?  det.carFindMaxStatusDate :  checkAuditMinDate;
       			
       			det.auditMinDate =  checkAuditMinDate;
       			
       			det.maxCloseMeetingDate = det.previousAudit.certExpireDate? det.previousAudit.certExpireDate:''; //det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID ? det.previousAudit.certExpireDate : moment(moment(det.previousAudit.certIssueDate,YYYYMMDD).add(3,'years')).format(YYYYMMDD);
       			
       			det.maxCloseMeetingDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(YYYYMMDD) : det.maxCloseMeetingDate;
       			
       			det.maxOpenMeetingDate = det.maxCloseMeetingDate;
       			
       			det.minOpenMeetingDate =  det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
       			det.minOpenMeetingDate = det.minOpenMeetingDate > checkAuditMinDate ? det.minOpenMeetingDate : checkAuditMinDate;
    			var nowAudDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
    		
    			/*if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && (nowAudDate<det.minOpenMeetingDate || nowAudDate>det.maxOpenMeetingDate)){
    				
    				det.auditDetail.auditDate = moment(det.minOpenMeetingDate,YYYYMMDD).format(MMMDDYYYY);
    				toaster.warning(det.auditType+' Date for the Intermediate '+det.auditType+' Sub Type can be between the 2nd & 3rd Anniversary Dates');
    			}*/

    			det.auditMinDate = det.minOpenMeetingDate ? det.minOpenMeetingDate : '';
    			//det.auditMaxDate = det.maxOpenMeetingDate;
    			
    			if(!det.dirInterAndAdditionalAudit && det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    				 
                    var preAuditMidate=det.auditMinDate; 
                   console.log(det.auditMinDate); console.log(det.auditMaxDate);
                 //@Dileep Commented below line 
                    //   det.auditMinDate = extensionIssueDate ? moment(moment(extensionIssueDate,YYYYMMDD).add(1,'year')).format(YYYYMMDD): det.auditMinDate; 
    			   // det.auditMaxDate = extensionexpiryDate ? moment(moment(extensionexpiryDate,YYYYMMDD).subtract(1,'year')).format(YYYYMMDD) :  det.auditMaxDate; 
    			    det.auditMinDate =  det.auditMinDate ? moment(moment(det.auditMinDate,YYYYMMDD).add(1,'year')).format(YYYYMMDD): det.auditMinDate;
    			    det.firstIntermeadite = ( det.auditMinDate > preAuditMidate ) ? true : false;
    				
//    			    if(det.dirInterAndAdditionalAudit && (det.previousAudit && det.previousAudit.auditSubTypeId != det.AppConstant.ADDITIONAL_SUB_TYPE_ID)) {
//    			    	det.auditMinDate = preAuditMidate;
//    			    	det.auditMinDate = (extensionIssueDate && extensionIssueDate > det.auditMinDate) ? moment(moment(extensionIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
//    			    	 
//    			    }
    			   
    			    det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
    			    det.maxOpenMeetingDate  =  det.auditMaxDate ?  det.auditMaxDate : det.maxOpenMeetingDate;
    			    det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.maxCloseMeetingDate;
    			    det.maxCloseMeetingDate =  det.auditMaxDate ?  det.auditMaxDate : det.maxCloseMeetingDate;
    			}else {
    				//@Dileep Commented below line 
    				det.auditMinDate = checkAuditMinDate ? moment(moment(checkAuditMinDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate;
    				det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
     			    det.maxOpenMeetingDate  =  det.auditMaxDate ?  det.auditMaxDate : det.maxOpenMeetingDate;
     			    det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.maxCloseMeetingDate;
     			    det.maxCloseMeetingDate =  det.auditMaxDate ?  det.auditMaxDate : det.maxCloseMeetingDate;
     			     
    			}
    
    			//det.auditDetail.certIssueDate = extensionIssueDate ? moment(extensionIssueDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certIssueDate; 
    			det.auditDetail.certExpireDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certExpireDate;
    
 			}
    		
    		if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID &&  det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
 	        			//IHM amendment appending last review date to IHM Part 1 issue date
 	        			//setting min ihm part 1 issue date
    			 
 	        			 det.minIssueDate = det.minAuditDatePerIHM ? det.minAuditDatePerIHM : det.minIssueDate ;
 	        			// det.auditMinDate = det.minAuditDatePerIHM ? moment(det.minAuditDatePerIHM,'YYYY-MM-DD').add(1,'days').format('DD-MMM-YYYY') : '' ;
 	        			 //det.auditDetail.certIssueDate = det.minAuditDatePerIHM ? moment(det.minAuditDatePerIHM,'YYYY-MM-DD').add(1,'days').format('DD-MMM-YYYY') : moment(new Date()).format(MMMDDYYYY);
 	        			 
 	        			 //setting previous certificate no
 	        			det.auditDetail.certificateNo = det.previousAudit.certificateNo ? det.previousAudit.certificateNo : !(det.auditDetail.auditSeqNo && det.auditDetail.certificateNo && det.auditDetail.auditReportNo) ? det.getNewCertificate() : det.auditDetail.certificateNo;
 	        			
 	        			var firstVal = det.previousAudit.letterNo.split('-')[0];
 	        		 
 	        			det.auditDetail.letterNo = det.previousAudit.letterNo ? firstVal+'-'+((det.sspDmlcRevisionNo < 10) ? '0'+det.sspDmlcRevisionNo : det.sspDmlcRevisionNo) : !(det.auditDetail.auditSeqNo && det.auditDetail.letterNo && det.auditDetail.auditReportNo) ? det.getNewCertificate() : det.auditDetail.letterNo;
 	        			//det.auditDetail.letterNo = det.previousAudit.letterNo ? det.previousAudit.letterNo+"-01" : !(det.auditDetail.auditSeqNo && det.auditDetail.letterNo && det.auditDetail.auditReportNo) ? det.getNewCertificate() : det.auditDetail.letterNo;
 	        			det.auditDetail.certIssueId = det.AppConstant.ADDITIONAL_ENDORSED;
 	        			
 	        			 
 	        			
 	        			
 	        			
 	        			certificateFactory.getAllCertificateDetailForIhm (det.auditDetail.auditTypeId, det.vesselImoNo.vesselImoNo,det.companyId,'soc').$promise.then(function(res){
 	        				det.AllIhmCertificateData = angular.copy(res.result);
 	        				if(det.AllIhmCertificateData){
	 	        				det.maxAddSurveyDate = det.AllIhmCertificateData[0].extendedExpireDate ? det.AllIhmCertificateData[0].extendedExpireDate : det.AllIhmCertificateData[0].certExpireDate;
	 	        				det.minAddSurveyDate = det.AllIhmCertificateData[0].completionSurveyDate ? det.AllIhmCertificateData[0].completionSurveyDate : '';
	 	        				det.minAddSurveyDate  = det.previousAudit.additionalSurvey && det.previousAudit.additionalSurvey != 'N.A' ? moment(moment(det.previousAudit.additionalSurvey,YYYYMMDD).add(1,'days')).format(YYYYMMDD)  :  det.minAddSurveyDate;
 	        				}
 	        			});

 	        			
 	        				
 			}
    		
    	 
    			//det.certiletter   = 'Review Letter';
    			if(det.auditDetail.auditSubTypeId == det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
    					det.certiRecieptLetter = 'Receipt Letter';
    					det.auditDetail.certExpireDate = '' ;
    			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
    					det.auditDetail.certExpireDate =   '' ;
    					det.certiRecieptLetter = 'Amendment Receipt Letter';
    	    			det.apreAmendletter = 'Amendment Review Letter';
    			}
    			if(det.directAmendment){
    				det.certiRecieptLetter= 'Amendment Receipt Letter';
    			    det.apreAmendletter='Amendment Approval Letter';
    			}	
    		  
    		
    		if(det.auditDetail.certificateNo){
	    			var msg = ( det.auditDetail.auditTypeId == det.AppConstant.ISM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID ) ? 'E' : (  det.auditDetail.auditTypeId == det.AppConstant.ISM_TYPE_ID) ? 'F' : ( det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID)?'G' : (det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID) ? 'H' : ( det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID) ? 'I' :(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID) ? 'J' : '';
	    			var len = det.auditDetail.certificateNo.length-4;
	    			var char = det.auditDetail.certificateNo.slice(len,len+1);
	                det.auditDetail.certificateNo = det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID  && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID ? det.auditDetail.certificateNo : det.auditDetail.certificateNo.replace(char,msg);
    		 }
    		

			if(det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID  && det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0 && det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId != det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
				var preauditMinDate=det.auditMinDate;
				var seqNo =	(det.previousAudit.certificateDetail  ) ?  _.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; }) : '';	
				checkAuditMinDate = (seqNo && seqNo.extendedIssueDate && (seqNo.extendedIssueDate > seqNo.auditDate)) ? seqNo.extendedIssueDate : 	checkAuditMinDate;
				det.auditMinDate  = (seqNo && seqNo.extendedIssueDate && (seqNo.extendedIssueDate > seqNo.auditDate)) ? moment(moment(seqNo.extendedIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : 	det.auditMinDate;
				det.auditMinDate = det.auditMinDate > preauditMinDate ? det.auditMinDate  : preauditMinDate;
			}
			
			if( det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
			  det.receiptMinDate = det.auditMinDate ? det.auditMinDate : det.receiptMinDate;
				if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
					det.receiptMinDate ='';
				}
			  //det.receiptMaxDate=''; 
				det.receiptMaxDate =  moment(new Date()).format(YYYYMMDD);
			}
			
			det.auditDetail.certIssueDate = det.auditDetail.certIssueDate ? det.auditDetail.certIssueDate : moment(new Date()).format(MMMDDYYYY) ;
			det.auditDetail.openMeetingDate =  det.auditDetail.certIssueDate ? det.auditDetail.certIssueDate : moment(new Date()).format(MMMDDYYYY) ;
			det.auditDetail.auditDate =  '' ;
			
			 
			/*if(det.auditTypeId==det.AppConstant.IHM_TYPE_ID && det.auditDetail ){
				var revNo =  det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID ? '0'+(parseInt(det.previousAudit.sspRevisionNo)+1) :'00';
  			   	det.auditDetail.sspReviewDetail.push({
   				   'sspRevisionNo' : revNo
   			   	});
  			   	//setting audit summary by default 
  			    //det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY;
			}*/
			if(!det.directAmendment)
			{
				det.auditDetail.sspReviewDetail.push({
					   
					   'sspRevisionNo' : (det.sspDmlcRevisionNo < 10) ? '0'+det.sspDmlcRevisionNo : det.sspDmlcRevisionNo,'ltrStatus':0,
				});
			}
     
        	$timeout(function(){
				$('#auditstaus').focus();
    		},0);
        	
        	
        	console.log('sss'); var seqNoTemp=1;
        	det.auditDetail.auditRptAttach=det.reportTypes.filter(function( obj ) {
        		if(obj.auditSubTypeId == det.auditDetail.auditSubTypeId && obj.auditTypeId == det.auditDetail.auditTypeId && obj.attachmentTypeDesc!='OTHER')
        		{ 
        			obj.fileName ='';
        			obj.comments= '';
        			obj.fileByte= '';
        			obj.otherType= '';
        			obj.userIns= (sessionStorage.getItem('emailId')).toString();
        			obj.dateIns= moment(new Date()).format(YYYYMMDD);
        			obj.seqNo= seqNoTemp;
        			obj.attchTypeDescAudit = obj.attachmentTypeDesc;
        			seqNoTemp=seqNoTemp+1;
				return obj.auditSubTypeId == det.auditDetail.auditSubTypeId && obj.auditTypeId == det.auditDetail.auditTypeId  && obj.attachmentTypeDesc!='OTHER';
        		}
        		});
      }
        /***getting AuditSeqNo, ReportNo and CertificateNo for Audit create time. ***/
        function getNewCertificate(){
        
    		auditService.getAuditData(det.auditDetail.auditTypeId,det.auditDetail.auditSubTypeId,det.companyId).then(function(res){				
    			
    			det.auditSeqNo = res[0].data;
    			
    			det.auditDetail.auditSeqNo = res[0].data;

    			if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId != det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
    				 det.auditDetail.certificateNo = res[1].data;
    				 det.auditDetail.letterNo = det.auditDetail.certificateNo.split('-')[0];
    			 } 
    			 
    			 
    			if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
    				det.auditDetail.auditReportNo = res[2].data;
    			} 
    			 
    				
    			det.newCertificateDetails = {
    					'auditSeqNo'    : res[0].data,
    					'certificateNo' : res[1].data,
    					'auditReportNo' : res[2].data
    			};
    			 
			});
    	}
        
        /***Report upload time open Modal window***/
        function reportUpload(attachmentTypeId){
        if(det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS){
        	det.reportTypes = det.reportTypes.filter(function(value, index, arr){
                return  value.auditTypeId==det.auditDetail.auditTypeId && value.auditSubTypeId==det.auditDetail.auditSubTypeId;
             });
        ModalService.showModal({
    			
    			templateUrl : 'src/modals/reportattachment.html',
    			
	            controller  : 'reportController as rp',
	            
	            inputs : {
	            	
	            	scope : {'reportTypes':det.reportTypes, 'auditDetail':{'auditRptAttach': det.auditDetail.auditRptAttach,'auditTypeId':det.auditDetail.auditTypeId,'auditSubTypeId':det.auditDetail.auditSubTypeId,'carUpdateStatus':det.carUpdateStatus}, 'attachmentTypeId':attachmentTypeId , 'requiredData':det.auditDetail}
	            	
	            }
	            
    		}).then(function(modal) {
    			
	            modal.element.modal();
	            
	            modal.close.then(function(result) {
	            	
	            	if (result == 'OK') {		     				
	     								
	     			} else if (result == 'No' || result == 'cancel') {
	     							
	     			}
	            	
	            });
	            
    		});
        }
    	}
        
        /*** on close meeting date change set audit, issue and expire date***/
        
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
	            			det.vesselSpecificDtl(selectedVsl,'NOrefresh',[]);
	            		}else{
	            			det.validateVessel();
	            		}
	            	}else{
	            		det.validateVessel();
	            	}
	            });
	            
    		});       	
        }//end of vesselImoModel
        
        
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
        
        function setAuditDate(){
        	
       		if(det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID) ){
       			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
        		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
       			det.previousAudit.certExpireDate=(!det.previousAudit.certExpireDate)?'':det.previousAudit.certExpireDate;  
           		/*if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length==0 ) ){
          		   det.auditDetail.certIssueDate=det.auditDetail.creditDate? moment( det.auditDetail.creditDate,MMMDDYYYY).format(MMMDDYYYY):det.auditDetail.certIssueDate;  //(moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD) > det.previousAudit.certExpireDate) ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) : (moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY));
          		}*/
           		det.disableCertIssueExpiry = true;
           	    det.setExpiryDate();
           	}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
       			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
        		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
       			if(!det.previousAudit.certExpireDate && det.checkPreviousAuditDetails.length==0){
       				det.disableCertIssueExpiry =false; 
       				det.minIssueDate ='';
       				det.expiryMaxDate = det.auditDetail.certExpireDate ?moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD):'';
       				}
    		}
       		det.setExpiryDate();
       		if(det.scopeId==1001){
       			det.auditDetail.certIssueDate = '';
    			det.auditDetail.certExpireDate = '';
       		}
       		if(!det.auditDetail.certExpireDate){
        		det.auditMaxDate = '';
        	}
        }
        
        /***** on change of expiry date to change certificate issued *****/
     	function setCertificateIssued(){ 
     		
   		 if(det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditDetail.certIssueDate && det.auditDetail.certExpireDate   && det.auditDetail.certIssueId!=det.AppConstant.RENEWAL_ENDORSED2 && det.auditDetail.certIssueId!=det.AppConstant.RENEWAL_ENDORSED1 ){
   			 var issuedate = moment(det.auditDetail.certIssueDate,MMMDDYYYY);
   			 var expiryDate = moment(det.auditDetail.certExpireDate,MMMDDYYYY).add(1,'days');
   			 var diff = expiryDate.diff(issuedate,'years',true);
   			
   			 if(det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){ 
   				 if(diff<5){
//   					 det.auditDetail.certIssueId = det.AppConstant.SHORT_TERM_CERT;
   				 }else if(diff==5 || diff>5){
//   					 det.auditDetail.certIssueId = det.AppConstant.FULL_TERM_CERT;
   				 }
   			 }
   		 }
   		 if(det.scopeId==1001){
   		det.auditDetail.certIssueId='';
   		 }
   	}
     	
     	
     	/****set expire date as of audit/inspection subtype****/
     	function setExpiryDate(){
     	  		
         if(det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditDetail.certIssueDate && !det.dirInterAndAdditionalAudit && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0 ) ){
    
    			var expiryDate='';
    			if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID && det.auditDetail.certIssueDate){
    				
    				expiryDate = moment(moment(det.auditDetail.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).subtract(1,'days').format(MMMDDYYYY);
    				det.auditDetail.certExpireDate = expiryDate;
    		    }else if(det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID && det.auditDetail.certIssueDate ){
    		
    				  //expiryDate = moment(det.auditDetail.certIssueDate, MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    				
    		    }else if(det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT && det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueDate ){
    		    	det.auditDetail.certExpireDate=moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    			}else if(!det.previousAudit.certExpireDate && ( det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId ==det.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
    				det.expiryMinDate =  moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD);
    				det.expiryMaxDate =  moment(expiryDate,MMMDDYYYY).format(YYYYMMDD); 
    				
    			} 
    			  
    		 } 
                  if(det.dirInterAndAdditionalAudit &&  ( (det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ||  det.auditDetail.auditSubTypeId ==det.AppConstant.ADDITIONAL_SUB_TYPE_ID)  && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0))){ 
                	 det.auditDetail.certExpireDate = det.auditDetail.certIssueDate? moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):'';
                	}
                  if(det.dirInterAndAdditionalAudit){
                	  det.expiryMinDate = det.auditDetail.certIssueDate? moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
                	  det.expiryMaxDate = det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):'';
                  }
          
    		}
     	
     	
     	function getExpiryDate(){
    		
     		var expiryDate = '';
     
    		if(det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditDetail.certIssueDate){
    			
    			if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){
    			
    				var expiryDate = moment(moment(det.auditDetail.certIssueDate, MMMDDYYYY).add(6,'months'),DDMMYYYY).format(MMMDDYYYY);
    				
    				expiryDate = moment(moment(expiryDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
    				
    			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
    				
    				var expiryDate = moment(moment(det.auditDetail.certIssueDate, YYYYMMDD).add(5,'years'),DDMMYYYY).format(MMMDDYYYY);
    				
    				expiryDate = moment(moment(expiryDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(YYYYMMDD);
    				
    			}	
    			
    		}else{
    			
    			expiryDate =''; 
    		}
    		
    		return expiryDate;
    	}
     	
    /***** for signature attachment *****/
    	
   	function attachSignature(index,reveiwerId){
   		
   		//var mailId = sessionStorage.getItem('emailId');
   		 var mailId = det.auditDetail.auditAuditorDetail[index].userId;
   		 var officialId = '';
   		 
   		detailsFactoryIhm.getCurrentUserDetail(mailId,det.companyId).$promise.then(function(data){
   			
			if(data.length>0 && data[0].managerOfficialId){
				if(det.auditDetail.auditAuditorDetail[0].userId == sessionStorage.getItem('emailId') && (det.auditDetail.certificateIhmDetail || det.auditDetail.certificateDetail)){
						
						var certData = det.auditDetail.certificateIhmDetail ? det.auditDetail.certificateIhmDetail[0] : det.auditDetail.certificateDetail[0];
						if(certData){
							if(certData.socType == 'eu' || certData.socType == 'hk')
								certData.socName = 'HK/EU'
							
							if(certData.socType == 'exe')
								certData.socName = 'EXEMPTION'
							
							var status =checkCertificateVesselDeatils(certData, 'firstCheck');
							
							if(det.UpdateVesselRefreshed){
			        			vesselDtlsCheck();
					         }
							if(!det.UpdateVesselRefreshed && !status){
								det.vesselUpdate = true;
					        	 officialId = data[0].managerOfficialId;
									detailsFactoryIhm.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
							   			var sign =res.signature;
							   			checkAndPutSign(sign,index,reveiwerId);
							   		 });
					         }
						}else{
							officialId = data[0].managerOfficialId;
							detailsFactoryIhm.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
					   			var sign =res.signature;
					   			checkAndPutSign(sign,index,reveiwerId);
					   		 });
						}
					
				}else{
					officialId = data[0].managerOfficialId;
					detailsFactoryIhm.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
			   			var sign =res.signature;
			   			checkAndPutSign(sign,index,reveiwerId);
			   		 });
				}
			}else{
				
				detailsFactoryIhm.getSignature(mailId,det.companyId).$promise.then(function(res){
		   			var sign =res.userDetail.signature;
		   			checkAndPutSign(sign,index,reveiwerId);
		   		 });
			}
		});
    		
   	}
   	
   	function checkAndPutSign(sign,index,reveiwerId){
   		
   		if(sign){
			det.auditDetail.auditAuditorDetail[index].audSignature = sign;
  		 
  		 	det.auditDetail.auditAuditorDetail[index].showSignatureButton = false;
  		    
  		 	det.checkCompleted(index, reveiwerId);
  		      
  		 	if(!det.attachSignFlag)
				det.auditDetail.auditAuditorDetail[index].audSignatureDate =moment(new Date).format(MMMDDYYYY);
		   	else
				det.auditDetail.auditAuditorDetail[index].audSignatureDate = det.auditDetail.auditAuditorDetail[index].audSignatureDate ? det.auditDetail.auditAuditorDetail[index].audSignatureDate : moment(new Date).format(MMMDDYYYY);

			det.sign=det.auditDetail.auditAuditorDetail[0].audSignature;    
  		 
  		 	$scope.signatureonLoad = det.auditDetail.auditAuditorDetail;
  		 	
  		}else{
  			toaster.warning('Signature not found');  
  		}
   	}
   	 
   	function checkFindingClosed(){
   		
   		var tempFinding  = angular.copy(det.auditDetail.auditFinding);
		
		tempFinding = _.filter(tempFinding, function(obj){
			
				return obj.findingDetail[0].categoryId != det.AppConstant.OBS_FINDING_CATEGORY && obj.findingStatus==0;
        	});
		
		if(det.auditDetail.auditFinding.length==0 || tempFinding.length==0){
			
			return true;
		}else{
			return false;
		}
   	}
   	
	function lengthOfFindingExceptObs(){
   		
   		var tempFinding  = angular.copy(det.auditDetail.auditFinding);
		
		tempFinding =  tempFinding.filter(function( obj ) {
			return obj.findingDetail.length>0 && obj.findingDetail[0].categoryId != det.AppConstant.OBS_FINDING_CATEGORY;
		});
		
		return tempFinding.length;
   	}
   	
   	function checkCompleted(index,reveiwerId){
		
		if(reveiwerId == det.AppConstant.AUDIT_REVIEWER_ROLE_ID){
			
			if(det.completedStatusValidation()){ 
				
				ModalService.showModal({
	    			
	    			templateUrl : 'src/modals/approveReject.html',
	    			
	    			controller  : 'approveRejectController as aprv'
	    			
	    		
	    		}).then(function(modal) {
	    			
	    			modal.element.modal();
	    			
	    			modal.close.then(function(result) {      
	    			
	    				if(result!='Cancel'){ 
	    						
	    					det.auditDetail.rejectionReason = result.approve==det.AppConstant.REJECTED_REVIEW_STATUS && result.comments?result.comments:'';
	    					
	    					det.auditDetail.reviewStatus = result.approve ? result.approve : det.AppConstant.INITIATE_REVIEW_STATUS;
    	    				
    	    				if(result.approve == det.AppConstant.ACCEPTED_REVIEW_STATUS){
    	    					
    	    					det.currUserSign = true;
    	    					det.reviewerSign = true;
        	    				det.disableNarativeSummary();
        	    				det.auditDetail.reviewerSign = det.auditDetail.auditAuditorDetail[index].audSignature ? btoa(det.auditDetail.auditAuditorDetail[index].audSignature):'';       	    				
        	    				
        	    				det.auditDetail.allowNext = det.AppConstant.ACCEPT;
        	    				det.auditDetail.lockStatus = det.AppConstant.NOT_RETRIEVE_STATUS;
        	    				if(det.auditDetail.makeFinal == det.AppConstant.NOTACCEPT){
        	    				
        	    					det.auditDetail.makeFinal = det.AppConstant.ACCEPT;
        	    					
        	    					det.finalReport = true;
        	    				}
        	    				 
        	    				
        	    				
        	    			}else if(result.approve==det.AppConstant.REJECTED_REVIEW_STATUS){
        	    				det.auditDetail.auditComplteLaptop=0;
	    						//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
	    						det.auditDetail.auditAuditorDetail[index].audSignature = '';
	    						
	    						det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	    						det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
	    						det.leadSign = false;
	    						
	    						det.auditDetail.auditAuditorDetail.forEach(function(a){
	    							
	    							if(a.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID){
	    								//a.audSignatureDate = '';
		        	    				a.audSignature = '';
	    							}
	    						});
	    					}
    	    				
    	    				det.saveAuditData('Data Saved Successfully');
    	    				det.saveCurrentFinding();
    	    				
    	    			}else{
    	    				
    	    				//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
    	    				det.auditDetail.auditAuditorDetail[index].audSignature = '';
    					}
	    			});    	    			    	    			
	    		});    				
				    				    				
				det.disablePrintCert = false; 
				
				blockUI.stop();
				
			}else{
			//	det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
				det.auditDetail.auditAuditorDetail[index].audSignature = '';
				det.showSignatureButton = true;
			}
			
		}else if(det.auditDetail.auditAuditorDetail[index].audLeadStatus == det.AppConstant.AUD_LEAD_STATUS){
			
			if(det.attachSignValidation()){
				
				var notAvlAuditorSign = _.filter(det.auditDetail.auditAuditorDetail, function(obj){
					return (obj.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID) && (obj.audLeadStatus != det.AppConstant.AUD_LEAD_STATUS) && (!obj.audSignature ||  !obj.audSignatureDate);
				});
				var notSignNotDeligated = _.filter(det.auditDetail.auditAuditorDetail, function(obj){
					return (obj.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID) && (obj.audLeadStatus != det.AppConstant.AUD_LEAD_STATUS) && (!obj.audSignature ||  !obj.audSignatureDate) &&  obj.delegateSign!=1;
				});
				
				
				if(notAvlAuditorSign.length>0 && notSignNotDeligated.length>0){
					det.attachSignFlag=true;
					toaster.warning('Signatures and Signature Date of all the Additional '+det.auditorType+'s are required');
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
					
				}else if(notAvlAuditorSign.length>0){
					det.attachSignFlag=true;
					toaster.warning('Please attach the signature of the other Auditor(s) delegated to you');
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}else if(det.isAllFindingClose() && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID)){
					det.attachSignFlag=true;
					flag = false;
					toaster.warning('Please change '+det.auditType+' status to completed');	
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}else{
					det.attachSignFlag=false;
					toaster.success('Signature has been added successfully');
    				
					if(det.lengthOfFindingExceptObs()==0){
						det.auditDetail.allowNext = (det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
        			}else{
        				det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
        			}
					
					det.saveAuditData('Data Saved Successfully');
    				
    				det.currUserSign = true;
    				det.leadSign = true;
    				
    				
    				if(det.auditDetail.makeFinal == det.AppConstant.NOTACCEPT){
    					detailsFactoryIhm.signatureGenBlobData(det.auditDetail.auditSeqNo,det.auditDetail.auditTypeId,det.auditDetail.companyId,1001).$promise.then(function(res){
    						console.log(res);
    					});
    				}
    				
    				det.disableNarativeSummary();
    				
    				blockUI.stop();
				}
			}else{
				det.attachSignFlag=true;
				//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
				det.auditDetail.auditAuditorDetail[index].audSignature = '';
				
			}
		}else{
			
			var flag = true; var allsign = true;
			var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
			
			if((det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID) && (!(det.auditDetail.certificateDetail) || det.auditDetail.certificateDetail.length==0) && (det.scopeId == 1000)){
				
				flag = false;
				toaster.warning('Certificate is not generated yet ');
				
			//	det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
				
				det.auditDetail.auditAuditorDetail[index].audSignature = '';
				
			}else{
				
				var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
				
				det.auditDetail.auditAuditorDetail.forEach(function(index){
					
					if(index.audLeadStatus==0 && index.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID && !(index.audSignature) && allsign ){
						
						allsign =false;
					}
				});
				
			    if(allsign){
				 detailsFactoryIhm.allAuditorSign(det.auditDetail.auditSeqNo,det.auditDetail.companyId).$promise.then(function(result){
						console.log(result);
					     }); 
				}
			}
			
			/*var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
			
              if(!leadDetail.audSignature){
				
				toaster.warning('Lead '+det.auditorType+' signature required');
				
				flag = false;
				
				det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
				
				det.auditDetail.auditAuditorDetail[index].audSignature = '';
			}*/
			
			if(flag){
				if(det.auditDetail.auditAuditorDetail[index].audLeadStatus == det.AppConstant.AUD_LEAD_STATUS)
				{det.currUserSign = false;
				}else{
				 det.currUserSign = true;
				} 
				
				det.saveAuditData('Data Saved Successfully');
				
				det.disableNarativeSummary();
				
				blockUI.stop();
			}
		}
	}
	
	/***before sign validate mandatory fields***/
	function attachSignValidation(){ 

		var openMeetingDate = '', closeMeetingDate = '' , NotcarUpdateStatus = true;
		
		 var reviewerId='';
		 det.auditDetail.auditAuditorDetail.forEach(function(a){
				if(a.auditRoleDesc=="REVIEWER"){
					reviewerId=a.userId;
				}
		 });
		
		var certificateDetailDatas='';
		if(det.auditDetail.certificateDetail){
			det.auditDetail.certificateDetail.forEach(function(cerPublish){
				if(cerPublish.publishStatus == 0)
					certificateDetailDatas = cerPublish;
			});
		}
		if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0 && !certificateDetailDatas){
		 certificateDetailDatas = _.filter(det.auditDetail.certificateDetail, function(find){
			
			 if(find.publishStatus == 1001){
					return  find.seqNo;   }   
			});	
		}
		
		openMeetingDate = det.auditDetail.openMeetingDate ? moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
		closeMeetingDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
		
		var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
		
		var selectedSummary = _.filter(det.auditSummary, function(obj){ 
			return obj.sumary ;
        	});
		
		if(det.auditDetail.auditFinding.length >0){
			det.auditDetail.auditFinding.forEach(function(index){
				index.findingDetail.filter(function( obj ) {
				if(obj.currentAuditSeq == det.AppConstant.CAR_UPDATED_CURRENT_SEQ ||  obj.currentAuditSeq > det.auditDetail.auditSeqNo){
					NotcarUpdateStatus =false;
					return;
				  }
				});	
			});
		}
		
		var flag = true;	
		
		 
		if(!det.auditDetailDataValidation()){
    		
			flag = false;
			
    	}else if(!det.auditDetail.auditPlace){
			
			flag = false;
			$timeout(function(){
				toaster.warning('Please Enter the '+det.auditType+' Place');
			},10);
			 
			
		}else if(!det.auditDetail.openMeetingDate ){
			flag = false;
			$timeout(function(){
				toaster.warning('Please Enter the '+det.openMettingDate);
			},10);
			
		
		}else if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && !det.auditDetail.auditDate ){
			flag = false;
			$timeout(function(){
					toaster.warning('Please Enter Approval Date');
			},10);	
           
		} else if((!det.auditDetail.additionalSurvey || det.auditDetail.additionalSurvey == 'N.A') && certificateDetailDatas.publishStatus==1 && det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
			flag = false;
			$timeout(function(){
					toaster.warning('Please Enter Additional Survey Due Date');
			},10);	
		} else if(!det.auditDetail.narrativeSummary){
			
			flag = false;
			toaster.warning('Please write comment(s) in Narrative Summary');
	
		}else if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.sspReviewDetail[0].ltrStatus != 1 ){
			if(det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
				flag = false;
				var msg = det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID ? 'Amendment':'';
				toaster.warning('Please generate the '+msg+' Approval Letter');
			}
		}else if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.stampDataDetails.length == 0 ){
			
			flag = false;
			toaster.warning('Please complete the stamp process');
		
		}else if((!(det.auditDetail.certificateDetail) || det.auditDetail.certificateDetail.length==0 ||  certificateDetailDatas.publishStatus==0) && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID) && det.scopeId == 1000 && det.auditDetail.auditSummaryId!= det.AppConstant.NOT_APPROVED_SUMMARY && det.loginUserId!= reviewerId){
			if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && det.auditDetail.additionalSurvey == 'N.A'){
				flag = true;
			}else{
				var socTypeFor = '';
				var countSoc = 0;
				if(det.auditDetail.certificateDetail){						//added by @Ramya on 21-06-2022 for Jira id - IRI-5327
					if(det.auditDetail.certificateDetail.length>0){
						det.auditDetail.certificateDetail.forEach(function(a){
						if(a.publishStatus == 0){
						
							if(socTypeFor==''){
								if(a.socType.toUpperCase() == 'EXE')
									socTypeFor = "Exemption"
								else{
									socTypeFor = "HK/EU";
									countSoc++;
								}
							
							}else if(!socTypeFor.includes(a.socType)){
								if(a.socType.toUpperCase() == 'EXE')
									socTypeFor += ", " +"Exemption";
								else if(countSoc==0){
									socTypeFor += ", " + "HK/EU";
									countSoc++;
								}
							}
						}
						});
					}
				}
				flag = false;
				toaster.warning("Please publish " +socTypeFor+ " Certificate");
			}

		} else if(det.scopeId == 1000 && det.auditDetail.certificateDetail && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID && det.auditDetail.certificateDetail.length>0  && NotcarUpdateStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY   && (det.userRoleId != det.AppConstant.ADMIN_ROLE_ID && det.userRoleId != det.AppConstant.MANAGER_ROLE_ID)){
			
			var certificateDetail = _.max(det.auditDetail.certificateDetail, function(find){
				
				if(find.generatedBy == 1001){
				return  find.seqNo;   }
				});
 
			
			var auditPlace = certificateDetail.auditPlace ? atob(certificateDetail.auditPlace): '-';
			 auditPlace = auditPlace? decodeURIComponent(auditPlace):'-';
			
			/* to remove validation of date mismatch for manager and reviewer */ 
			if(certificateDetail.generatedBy &&   certificateDetail.generatedBy == 1001 && det.loginUserId!= reviewerId) {
				
				if(auditPlace!=det.auditDetail.auditPlace && auditPlace!='-' && certificateDetail.certIssueId !=1003 && certificateDetail.certIssueId !=1008){
					
					flag = false; 
					toaster.warning('Please publish the certificate once again because Audit place is mismatching');
				}/*else if(det.auditDetail.certificateDetail[0].grt!=det.vesselDetail.grt){
					flag = false;
					 toaster.warning('Please publish the certificate once again because GRT is mismatching');
				}*/else if(closeMeetingDate > moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD) && det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId != det.AppConstant.FULL_TERM_CERT){
					
					flag = false; 
					toaster.warning('Closing Meeting date should not be greater then expiry date');
				}
			}
			
		}

		//commented by ramya for jira id--> IRI-5297
		// var vesRefApp = false, vesRefRec = false;
		// var campAddress = '',compName='';
		// var vesselname = det.auditDetail.vesselNameAud ? det.auditDetail.vesselNameAud : det.auditDetail.vesselName ? det.auditDetail.vesselName : det.vesselDetail.vesselName;
		// if(det.auditDetail.companyAddressAud){
		// 	var orgComAdd = det.auditDetail.companyAddressAud.split("\n");
		// 	campAddress = orgComAdd[1];
		// 	compName = orgComAdd[0];
		// }else
		// {
		// 	campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
		// 	compName = det.vesselCompanyDtl.vesselCompanyName;
		// }
		// if(det.letterAppComp){
		// 	if(det.letterAppComp.companyAddress != campAddress)
		// 		vesRefApp = true;
		// 	if(det.letterAppComp.companyName != compName)
		// 		vesRefApp = true;
		// 	if(det.letterAppComp.vesselName != vesselname)
		// 		vesRefApp = true;
		// }
		// if(det.letterRecComp){
		// 	if(det.letterRecComp.companyAddress != campAddress)
		// 		vesRefRec = true;
		// 	if(det.letterRecComp.companyName != compName)
		// 		vesRefRec = true;
		// 	if(det.letterRecComp.vesselName != vesselname)
		// 		vesRefRec = true;
		// }
		// if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==1 && vesRefRec && vesRefApp){		//Added by ramya for jira ID-->IRI-5053
		// 	flag = false; 
		// 	var msgrec= det.auditDetail.auditSubTypeId==det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID?'Receipt Letter':'Amendment Receipt Letter';
		// 	var msgapp= det.auditDetail.auditSubTypeId==det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID?'Approval Letter':'Amendment Approval Letter';
		// 	toaster.warning('vessel details are Updated, please generate the '+msgrec+' and '+msgapp+' again'); 
		//    }
		// else if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==1 && vesRefRec ){
		// 	flag = false; 
		// 	var msg= det.auditDetail.auditSubTypeId==det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID?'Receipt Letter':'Amendment Receipt Letter';
		// 	toaster.warning('vessel details are Updated, please generate the '+msg+' again'); 
		//    }
		// else if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==1 && vesRefApp ){
		// 	flag = false; 
		// 	var msg= det.auditDetail.auditSubTypeId==det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID?'Approval Letter':'Amendment Approval Letter';
		// 	toaster.warning('vessel details are Updated, please generate the '+msg+' again');
		//    }
		/*var certData = det.auditDetail.certificateIhmDetail ? det.auditDetail.certificateIhmDetail[0] : det.auditDetail.certificateDetail[0];
		if(status == 'statusComplete')
			if(checkCertificateVesselDeatils(certData, 'firstCheck'))
				flag = false;*/
	
	return flag;
		
	}
	
	function isAllFindingClose(){
		
		var flag = true;
		console.log(det.auditDetail.auditFinding);
		det.auditDetail.auditFinding.forEach(function(a){
			
			if((a.findingDetail.length>0 &&  a.findingDetail[a.findingDetail.length -1].categoryId !=det.AppConstant.OBS_FINDING_CATEGORY &&   a.findingDetail[a.findingDetail.length -1].statusId != det.AppConstant.VERIFIED_CLOSED  ) || (a.findingDetail.length>0 && !(a.findingDetail[a.findingDetail.length -1].nextActionId) &&  a.findingDetail[a.findingDetail.length -1].categoryId !=det.AppConstant.OBS_FINDING_CATEGORY)){
				
				flag = false; 
			}
		});
		
		return flag;
	}
	
	/*********Remove Auditor, Reviewer & Observer Sign************/
	
	function removeSign(index,id){
		det.checkSign=false;
		det.vesselUpdate = false;
		if(det.auditDetail.auditTypeId==det.AppConstant.IHM_TYPE_ID){
	 				det.leadSign=false
	 				if(!det.leadSign){
	 						detailsFactoryIhm.removeIhmFinalReport(det.auditDetail.auditSeqNo,det.auditDetail.auditTypeId,det.auditDetail.companyId,1002).$promise.then(function(res){
           					det.finalReport = false;
					});
			} 
		}
		
		 if(det.nextAdtCreated){
		    
				 var msg=' Review ';
				 toaster.warning('Next '+msg+' has been Created');	
			 
				
		 }else if(id==det.AppConstant.AUDIT_REVIEWER_ROLE_ID){
			
			 ModalService.showModal({
	    			
		    		templateUrl : 'src/modals/docChanged.html', 
		    			
		    		controller  : 'docChangedController',
		    			
		    		inputs		: {data:'Do you want to remove your signature?'},	    			
		    		
		    	}).then(function(modal) {
		    			
		    		modal.element.modal();
		    			
		    		modal.close.then(function(result) {
		    				
		    			if(result == 'YES'){
		    				
		    				det.auditDetail.auditAuditorDetail[index].audSignature = '';
		    				 
		    				//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
		    				
		    				 det.auditDetail.reviewStatus = det.AppConstant.INITIATE_REVIEW_STATUS;
		    				
		    				// auditor.audSignatureDate=false;
		    				 
		    				 det.currUserSign = false;
		    				 det.reviewerSign = false;
		    				
		    				 det.enableNarativeSummary();
		    				 
		    				 if(det.lengthOfFindingExceptObs()>0){
	        						det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
	                		 }
	                		
		    				 det.vesselUpdate = false;
		    				 
	                		 det.saveAuditData('Data Saved Successfully');
		    			}
		    			
		    		});
		    	});
			 
		 }else{
		
			 det.auditDetail.auditAuditorDetail[index].audSignature = '';
			 
			 det.vesselUpdate = false;
		    				 
		   //  det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
		    
		   //  auditor.audSignatureDate=false;
		    				 				
			 det.currUserSign = false;
			
			 if(!det.notLead){
				 det.leadSign = false;
				 det.rptAttchFlag = true;
				 det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
			     det.checkLeadStatus = false;
			     det.enableNarativeSummary(); 
			 }
			 det.vesselUpdate = false;
		 
			 det.saveAuditData('Data Saved Successfully');
		
			 det.enableNarativeSummary();
		 }   
	}
	
	/***********all Auditor Sign Validation*********/
	function allAuditorSignValidation(){
		
		var flag = true;
		var notAvlAuditorSign = _.filter(det.auditDetail.auditAuditorDetail, function(obj){
			return obj.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID && (!obj.audSignature ||  !obj.audSignatureDate);
		});
		
		if(notAvlAuditorSign.length>0){
			flag = false;
			toaster.warning('Signatures and Signature Date of all the '+det.auditorType+'s are required');
		}
		
		return flag;
	}
	
	/***** Initiate Review time and Reviewer Attach sign time validation *****/
	function completedStatusValidation(val){ 
		
		var flag = true;
		
		var notAvlAuditorSign = _.filter(det.auditDetail.auditAuditorDetail, function(obj){
			return obj.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID && (!obj.audSignature ||  !obj.audSignatureDate);
		}); 

		if(det.attachSignValidation()){	        			
              
			if( det.auditDetail.auditRptAttach.length > 0){ 
				
				det.auditDetail.auditRptAttach.forEach(function(a){
					console.log(a);
					var reportType  = _(det.reportTypes).chain().where({'attachmentTypeId':a.attachmentTypeId}).pluck('attachmentTypeDesc').toString();
					
					if(flag && !a.fileName && a.mandatory==1){
						flag = false; 
						if(a.attchTypeDescAudit){
						toaster.warning('Please attach '+a.attchTypeDescAudit+' in Report Attachment section');
						}else {
							toaster.warning('Please attach '+a.attchmentTypeDesc+' in Report Attachment section');
							 
						}
					}
       			});
				
				if((val !='statusChange') && flag && notAvlAuditorSign.length>0){
					flag = false;
					toaster.warning('Signatures and Signature Date of all the '+det.auditorType+'s are required');
				}
				return flag;
			}else if(det.auditDetail.auditRptAttach.length == 0){
				flag = false;
				toaster.warning('Please Upload Report Attachments');
				return flag;
			}else{
				return flag;
			}
		}else{
			flag = false;
			return flag;
		}
		
	}
	
	/***disable Narrative summary content***/
	function disableNarativeSummary(){
		
		$('#narrative').summernote('disable'); //Added by sudharsan for IRI-5217
	}
	
	/***enable Narrative summary content***/
	function enableNarativeSummary(){
		
		if(!det.lockStatus && (det.userRoleId==det.AppConstant.AUDIT_AUDITOR_ROLE_ID || det.userRoleId==det.AppConstant.OBSERVER_ROLE_ID) && ((det.reviewerLogin && det.auditDetail.reviewStatus != det.AppConstant.REVERT_REVIEW_STATUS) || det.auditDetail.reviewStatus != det.AppConstant.INITIATE_REVIEW_STATUS) && det.auditDetail.reviewStatus != det.AppConstant.ACCEPTED_REVIEW_STATUS && (det.auditDetail.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS || det.auditDetail.auditStatusId==det.AppConstant.COMPLETED_AUDIT_STATUS) && /*((det.notLead && det.leadSign) || !det.notLead) &&*/ !det.currUserSign && !(det.nextAdtCreated)){
			
			$('#narrative').summernote('enable'); //Added by sudharsan for IRI-5217
			
			if(det.reviewerLogin && det.auditDetail.reviewStatus==det.AppConstant.REVERT_REVIEW_STATUS){ //Added by sudharsan for IRI-5217
				det.disableNarativeSummary();
			}
		}
		if(det.auditDetail.auditStatusId==det.AppConstant.REOPEN  &&  (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID || det.AppConstant.MANAGER_ROLE_ID )){
			$('#narrative').summernote('enable');  //Added by sudharsan for IRI-5217
		}	
	}
	
	/***disable and enable Narrative summary content on change of Lock Status***/
	$scope.$watch('det.lockStatus',function(newValue,oldValue){
	   
		if(newValue != oldValue && newValue){
	   		det.disableNarativeSummary();
	   	 }else if(newValue != oldValue && !newValue){
	   		det.enableNarativeSummary(); 
	   	 }
		
		if(det.narrativeSumStatus) {
			det.disableNarativeSummary();
		}
	   });
	
	$scope.$watch('det.enabled',function(newValue,oldValue){
		   
		det.lockMessage = newValue ? 'Locked':'Unlocked';
	   });
	
	$scope.$watch('det.auditDetail.auditDate',function(newValue,oldValue){
	   
	});
	
	
	/****on click of initiate review button****/
	function initiateReview(){ 
		
		var  reviewerAvl = false, flag = true; // allAuditorSign = true,
		
		if(det.attachSignValidation()){ 
			
			if(det.completedStatusValidation()){ 
			
					if((det.lengthOfFindingExceptObs()==0 || det.isAllFindingClose()) && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID)){
						flag = false;
						toaster.warning('Please change '+det.auditType+' status to completed');	
					}
					
					var reviewerDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'auditRoleID' : det.AppConstant.AUDIT_REVIEWER_ROLE_ID});
	    		
					if(flag && (!reviewerDetail || reviewerDetail.auditRoleID!=det.AppConstant.AUDIT_REVIEWER_ROLE_ID)){
						flag = false;
						toaster.warning('Please Add Reviewer to Initiate Review');
						
					}
					 
					if(flag){

			        	det.auditDetail.reviewStatus = det.AppConstant.INITIATE_REVIEW_STATUS;
	        			
	        			if(det.lengthOfFindingExceptObs()==0){
							det.auditDetail.allowNext = ((det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) && det.leadSign)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
	        			}else{
	        				det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
	        			}
	        			
	        			det.saveAuditData(det.auditType+' Review has been Initiated \n Successfully','initiateReview');
			
	        			/*$timeout(function(){
	        				toaster.clear();
	        				toaster.success(det.auditType+' Review has been Initiated Successfully');
	        			},500);*/
			        }
				/*}else{
					
					toaster.warning('Please close all findings');
				}*/
			 }
		  }
	   }
	
	function exporttocertificate(){
	
		det.showList = true;
		
		ModalService.showModal({
			
			templateUrl : 'src/modals/certificateHistory.html',
			
			controller  : 'certificateHistoryController as certHist',
			
            inputs : {
            	
            	scope:det
            	
            }
		
		}).then(function(modal) {
			
			modal.element.modal();
			
            modal.close.then(function(result) {
            	
            });
            
		});	
	}
		
	function valiudateAndExportAmendmentLetter(auditTypeId,companyId,auditSeqNo){
		    det.approvalLtrStaus=false;
			 var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
				if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)){
					det.receiptLtr= true;
				}
			 if(!det.notLead)/*only for Lead */
			 {
			if(det.approvalLetterValidation()){
				if(det.auditDetailDataValidation()){
					//det.saveAuditData('Preparing Data!');	
					det.saveAuditData('Amendment Approval Letter Downloaded Successfully');
					$timeout(function(){
					det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
					det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
					},1000);;
					det.validateAndSaveAuditData();
				}
				else{
					det.approvalLtrStaus=true;			//added by @Ramya on 22-06-2022 for Jira Id - IRI-5341
				}
			}
			else{
				det.approvalLtrStaus=true;
			}
		}
		else if(det.notLead)
		{
		det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
						
		det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
	}
}
	
	function exportAmendmentLetter(auditTypeId,companyId,auditSeqNo){
		
		var title = false;
		if (det.title != '') {
			if (det.title.indexOf('Special') >= 0) {
				title = true;
			} else if (det.title.indexOf('Deputy') >= 0) {
				title = true;
			}
			else{
				title = false;
			}
		}
		if(det.notLead)
		blockUI.start("Preparing Letter");
			
			detailsFactoryIhm.getAuditDetail(auditTypeId,companyId,auditSeqNo).$promise.then(function(res) {
					var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
		   			 
		   		res.userAddress = (det.ihmUserDetails &&  det.ihmUserDetails.address ) ? det.ihmUserDetails.address :'';
		   		console.log(res);
				blockUI.stop();
				blockUI.start("Preparing Letter");
				var certificateDatas = {
						'leadAuditorName':det.signerName,
						'auditTypeId'	 :res.auditTypeId,
						'companyaddress' :res.companyAddressAud,
						'auditDate'		 :res.auditDate==det.auditDetail.auditDate?moment( res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.auditDate,
						//'companyname'    :det.cmpnyNme,
						//'certIssueDate'	 :res.certIssueDate==det.auditDetail.certIssueDate?moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.certIssueDate,
						'certIssueDate'	 :res.closeMeetingDate ?moment(res.closeMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'):moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'),
						'vesselName'     :res.vesselNameAud,
						'officialNo'     :res.officialNoAud,					
						'vesselImoNo'    :res.vesselImoNo,
						'auditSubTypeId' :res.auditSubTypeId,
						'certificateNo' :res.certificateNo,
						'revisionNo':res.sspReviewDetail[0].sspRevisionNo==det.auditDetail.sspReviewDetail[0].sspRevisionNo?res.sspReviewDetail[0].sspRevisionNo:det.auditDetail.sspReviewDetail[0].sspRevisionNo,
						'leadSign':det.leadSignReceiptLtr, //**  IRI-5270 added by kiran */
						'title':det.title, /** IRI-5245 added by kiran  */
						'openMeetingDate' :res.openMeetingDate ?moment( res.openMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'):'',
						'additionalSurvey':res.additionalSurvey && res.additionalSurvey != 'N.A' ?moment( res.additionalSurvey ,YYYYMMDD).format('DD-MMMM-YYYY'):(res.additionalSurvey =='N.A' ?'N.A':''),
						'userAddress':res.userAddress
				}
				console.log(certificateDatas);
				validateReviewLetterWithAuditStatus=true;
				var certificate = "";
				var certificateName = "";
				var certificateIHM = "";
				if(res.auditTypeId == det.AppConstant.IHM_TYPE_ID){
					certificate = auditService.ihmAmendmentLetter(certificateDatas);
					certificateIHM = auditService.ihmAmendmentLetter(certificateDatas);
					certificateName = 'Amendment Approval Letter_' + certificateDatas.certificateNo + '.pdf';
					blockUI.stop();
				}
					
					if(title == false){
						toaster.warning("Can't generate Letter, because title is mismatching");
					}
					else{
						$timeout(function(){
							pdfMake
							.createPdf(certificate)
							.download(certificateName);
						},1000);
						
						var approvalBase64Data = "";
						pdfMake.createPdf(certificateIHM).getBuffer(function(buffer) {
							var byteArray = new Uint8Array(buffer);
							var length = byteArray.byteLength;
							for (var i = 0; i < length; i++) {
								approvalBase64Data += String.fromCharCode(byteArray[i]);
							}
						});
						 
					$timeout(function(){
						var fileByte = [];
	    				fileByte = approvalBase64Data ? btoa(approvalBase64Data) : '';
	    				
						var finalFileName_ =  det.auditDetail.vesselName + '_' + det.auditDetail.auditTypeDesc + '_' +det.auditDetail.audSubTypeDesc + '_' + det.auditDetail.auditReportNo+'.pdf';
    					var parameter = {
    							'fileName'   : finalFileName_,
    							'fileByte'   : fileByte,
    							'reportName' : 'ApprovalReport',
    							'userName'	 : sessionStorage.getItem('emailId')
    						};
				      auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
							   
				     });
					 },1000);
					
					}
				
				 
				detailsFactoryIhm.updateLtrStatus(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.ACCEPT).$promise.then(function(res){
					console.log(res)
					if(res.success){
						det.approvalLtrStaus=false;
							/*if(res){
							res.forEach(function(response){
			        			response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
			        			try {
									var auditPlace = response.auditPlace ? atob(response.auditPlace)
											: 'Nil';
									response.auditPlace = decodeURIComponent(auditPlace);
								} catch (err) {
									console
											.log(err);
								}
			        		});
							}*/
							
							detailsFactoryIhm.getSspReviewDetail(det.vesselDetail.vesselImoNo,auditTypeId,companyId).$promise.then(function(resp) {
								det.LetterHistoryDetails=resp; var auditPlace='';
								console.log(resp);
								if(resp && resp.length>1)
				        		det.LetterHistoryDetails = resp.filter(function( obj ) {
				        			 auditPlace = obj.auditPlace ? atob(obj.auditPlace)
											: '-';
				        			obj.auditPlace = decodeURIComponent(auditPlace);
				        			obj.certIssueDate = obj.certIssueDate ? moment(obj.certIssueDate ).format(MMMDDYYYY):'';
									return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
								});
								
								setVesselLetterHist(det.auditSeqNo,resp);
				        		
							});
							
			        			
			        			
			        	
						
					}
				});
		   		// });
			});
			
			
		//}
		
	}
	
	function validateAndExportapprovalletter(auditTypeId,companyId,auditSeqNo){
		det.approvalLtrStaus=false;
		 var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
		if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)){
			det.receiptLtr= true;
		}
	 
	  if(det.auditTypeId == det.AppConstant.IHM_TYPE_ID){
			
    			if (det.ihmCertModal.hk == true && det.ihmCertModal.eu == true){
        			det.auditDetail.sspReviewDetail[0].reviewSummary ='11';
        		}else if (det.ihmCertModal.hk == true && det.ihmCertModal.eu == false){
        			det.auditDetail.sspReviewDetail[0].reviewSummary ='10';
        		}else if (det.ihmCertModal.hk == false && det.ihmCertModal.eu == true){
        			det.auditDetail.sspReviewDetail[0].reviewSummary ='01';
        		}else if (det.ihmCertModal.hk == false && det.ihmCertModal.eu == false){
        			det.auditDetail.sspReviewDetail[0].reviewSummary ='00';
        		}
			if(!det.notLead)/*only for Lead */
				 {
			if(det.approvalLetterValidation()){
				if(det.validateAttchedStampOrNot()){
				  if(det.auditDetailDataValidation()){
					det.saveAuditData('Approval Letter Downloaded Successfully');
					
					  det.letterAppComp = [];
					  var campAddress = '',compName='';
					  var vesselname = det.auditDetail.vesselNameAud ? det.auditDetail.vesselNameAud : det.auditDetail.vesselName ? det.auditDetail.vesselName : det.vesselDetail.vesselName;
						if(det.auditDetail.companyAddressAud){
							var orgComAdd = det.auditDetail.companyAddressAud.split("\n");
							campAddress = orgComAdd[1];
							compName = orgComAdd[0];
						}else
						{
							campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
							compName = det.vesselCompanyDtl.vesselCompanyName;
						}
					  det.letterAppComp.companyAddress = campAddress;
					  det.letterAppComp.companyName = compName;
					  det.letterAppComp.vesselName = vesselname;
					 
					  //det.validateAndSaveAuditData();
					  $timeout(function(){												//added by @Ramya on 21-06-2022 for jira id - IRI-5336
						det.auditDetail.sspReviewDetail[0].ltrStatus=1;
						det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
					  },1000);;
					  }
					  else{
						det.approvalLtrStaus=true;
					  }
					}else{
						toaster.warning("Please attach the stamp for the review.");
						det.approvalLtrStaus=true;										//added by @Ramya on 21-06-2022 for Jira Id - IRI-5326
					}
			}
			else{
				det.approvalLtrStaus=true;		//added by @Ramya on 22-06-2022 for Jira Id - IRI-5341
			}
		}else if(det.notLead){
			
			det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
			
			det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
			
		}

		} 
	}
	
	
	 
	 
	function ihmAmendmentApprovalLetter(){
			if(det.validateAttchedStampOrNot()){
				det.valiudateAndExportAmendmentLetter(det.auditTypeId,   det.companyId , det.auditDetail.auditSeqNo);
    			det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
			}else{
				toaster.warning("Please attach the stamp for the review.");
			}
			det.letterAppComp = [];
			 var campAddress = '',compName='';
			 var vesselname = det.auditDetail.vesselNameAud ? det.auditDetail.vesselNameAud : det.auditDetail.vesselName ? det.auditDetail.vesselName : det.vesselDetail.vesselName;
				if(det.auditDetail.companyAddressAud){
					var orgComAdd = det.auditDetail.companyAddressAud.split("\n");
					campAddress = orgComAdd[1];
					compName = orgComAdd[0];
				}else
				{
					campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
					compName = det.vesselCompanyDtl.vesselCompanyName;
				}
			  det.letterAppComp.companyAddress = campAddress;
			  det.letterAppComp.companyName = compName;
			  det.letterAppComp.vesselName = vesselname;
	}
	
	
	function generateApprovalletter(auditTypeId,companyId,auditSeqNo){
		
			if (det.ihmCertModal.hk == true && det.ihmCertModal.eu == true){
    			det.auditDetail.sspReviewDetail[0].reviewSummary ='11';
    		}else if (det.ihmCertModal.hk == true && det.ihmCertModal.eu == false){
    			det.auditDetail.sspReviewDetail[0].reviewSummary ='10';
    		}else if (det.ihmCertModal.hk == false && det.ihmCertModal.eu == true){
    			det.auditDetail.sspReviewDetail[0].reviewSummary ='01';
    		}else if (det.ihmCertModal.hk == false && det.ihmCertModal.eu == false){
    			det.auditDetail.sspReviewDetail[0].reviewSummary ='00';
    		}
		
		if(det.approvalLetterValidation()){
			if(det.validateAttchedStampOrNot()){
			  if(det.auditDetailDataValidation()){
				  det.saveAuditData();
				  $timeout(function(){						//added by @Ramya on 21-06-2022 for jira id - IRI-5336
				  	det.exportGeneratedApprovalletter();
					},1000);;
				   /*det.auditDetail.sspReviewDetail[0].ltrStatus=1;
				     det.validateAndSaveAuditData();*/
				  }
			 }else{
				toaster.warning("Please attach the stamp for the review.");
			 }
		}
		
	}
	
 function exportGeneratedApprovalletter(){
		var title = false;
		if (det.title != '') {
			if (det.title.indexOf('Special') >= 0) {
				title = true;
			} else if (det.title.indexOf('Deputy') >= 0) {
				title = true;
			}
			else{
				title = false;
			}
		}
		
		detailsFactoryIhm.getAuditDetail(det.auditDetail.auditTypeId,det.auditDetail.companyId,det.auditDetail.auditSeqNo).$promise.then(function(res) {
			 
		if(res.$resolved==true){
			detailsFactoryIhm.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.auditDetail.companyId).$promise.then(function(response) {
		
			var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
			 
			   //res.userAddress = det.ihmUserDetails.address ? det.ihmUserDetails.address :'';
			
			 var leadauditorMail = _.findWhere(det.audObsNameArray, {'sequenceNo':det.auditDetail.leadAuditorId, 'companyId' : Number(det.companyId)});
				 det.ihmUserDetails=_.findWhere(det.audObsNameArray, {'emailId' : leadauditorMail.emailId});
				 res.userAddress = (det.ihmUserDetails &&  det.ihmUserDetails.address ) ? det.ihmUserDetails.address :'';
			   
			blockUI.stop();
		    blockUI.start();
					var certificateDatas = {
				
							'leadAuditorName':det.signerName,
							'auditTypeId'	 :res.auditTypeId,
							'companyaddress' :res.companyAddressAud,
							'auditDate'		 :res.auditDate==det.auditDetail.auditDate?moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.auditDate,
							'companyname'    :det.cmpnyNme,
							'certIssueDate'  :res.certIssueDate==det.auditDetail.certIssueDate?moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.certIssueDate,
							'vesselName'     :res.vesselNameAud,
							'officialNo'     :res.officialNoAud,					
							'vesselImoNo'    :res.vesselImoNo,
							'auditSubTypeId' :res.auditSubTypeId,
							'certificateNo' :res.certificateNo,
							'revisionNo':res.sspReviewDetail[0].sspRevisionNo==det.auditDetail.sspReviewDetail[0].sspRevisionNo?res.sspReviewDetail[0].sspRevisionNo:det.auditDetail.sspReviewDetail[0].sspRevisionNo,
							'receiptDate':moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'),
							'leadSign':det.leadSignReceiptLtr,//**  IRI-5270 added by kiran */
							'title':det.title, /** IRI-5245 added by kiran  */
							'certificateHk':det.ihmCertModal.hk,
							'certificateEu':det.ihmCertModal.eu,
							'userAddress':res.userAddress
					}
					//res.leadSign = det.leadSignReceiptLtr;
					validateReviewLetterWithAuditStatus=true;
					var certificate='';
					var certificateIHM=''	
					var certificateName = '';
						
						 
						 certificateIHM = auditService.ihmApproveLetter(certificateDatas);

					     blockUI.stop();
		
					
					if(title == false){
						toaster.warning("Can't generate Letter, because title is mismatching");
					}
					else{
						 //Dont Delete
					    var approvalBase64Data = '';
					    pdfMake.createPdf(certificateIHM).getBuffer(function(buffer) {
							var byteArray = new Uint8Array(buffer);
							var length = byteArray.byteLength;
							for (var i = 0; i < length; i++) {
								approvalBase64Data += String.fromCharCode(byteArray[i]);
							}
						});
						
						 
					$timeout(function(){
						var fileByte = [];
	    				fileByte = approvalBase64Data ? btoa(approvalBase64Data) : '';
						var finalFileName_ =  det.auditDetail.certificateDetail[0].vesselName + '_' + det.auditDetail.certificateDetail[0].auditTypeDesc + '_' +det.auditDetail.certificateDetail[0].audSubTypeDesc + '_' + det.auditDetail.certificateDetail[0].auditReportNo+'.pdf';
    					var parameter = {
    							'fileName'   : finalFileName_,
    							'fileByte'   : fileByte,
    							'reportName' : 'ApprovalReport',
    							'userName'	 : sessionStorage.getItem('emailId')
    						};
				         auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
				         });
					 },1000); 	
						
					}
					
	   		 
				});
				
			}});
	}
	
	
	
	function exportapprovalletter(auditTypeId,companyId,auditSeqNo){
		
		var title = false;
		if (det.title != '') {
			if (det.title.indexOf('Special') >= 0) {
				title = true;
			} else if (det.title.indexOf('Deputy') >= 0) {
				title = true;
			}
			else{
				title = false;
			}
		}
		if(det.notLead)
		blockUI.start("Preparing Letter");
		 
			
				detailsFactoryIhm.getAuditDetail(auditTypeId,companyId,auditSeqNo).$promise.then(function(res) {
					console.log(res);
					if(res.$resolved==true){
						
						detailsFactoryIhm.getSspReviewDetail(det.vesselDetail.vesselImoNo,auditTypeId,companyId).$promise.then(function(response) {
						
					//res.userAddress = det.ihmUserDetails.address ? det.ihmUserDetails.address :'';
					
					var leadauditorMail = _.findWhere(det.audObsNameArray, {'sequenceNo':det.auditDetail.leadAuditorId, 'companyId' : Number(det.companyId)});
					det.ihmUserDetails=_.findWhere(det.audObsNameArray, {'emailId' : leadauditorMail.emailId});
					res.userAddress = (det.ihmUserDetails &&  det.ihmUserDetails.address ) ? det.ihmUserDetails.address :'';
					
				
					var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
					 
					blockUI.stop();
				    blockUI.start("Preparing Letter");
							var certificateDatas = {
						
									'leadAuditorName':det.signerName,
									'auditTypeId'	 :res.auditTypeId,
									'companyaddress' :res.companyAddressAud,
									'auditDate'		 :res.auditDate==det.auditDetail.auditDate?moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.auditDate,
									'companyname'    :det.cmpnyNme,
									'certIssueDate'  :res.certIssueDate==det.auditDetail.certIssueDate?moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.certIssueDate,
									'vesselName'     :res.vesselNameAud,
									'officialNo'     :res.officialNoAud,					
									'vesselImoNo'    :res.vesselImoNo,
									'auditSubTypeId' :res.auditSubTypeId,
									'certificateNo' :res.certificateNo,
									'revisionNo':res.sspReviewDetail[0].sspRevisionNo==det.auditDetail.sspReviewDetail[0].sspRevisionNo?res.sspReviewDetail[0].sspRevisionNo:det.auditDetail.sspReviewDetail[0].sspRevisionNo,
									'receiptDate':moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'),
									'leadSign':det.leadSignReceiptLtr, //**  IRI-5270 added by kiran */
									'title':det.title, /** IRI-5245 added by kiran  */
									'certificateHk':det.ihmCertModal.hk,
									'certificateEu':det.ihmCertModal.eu,
									'userAddress':res.userAddress
							}
							
							//res.leadSign = det.leadSignReceiptLtr;
							validateReviewLetterWithAuditStatus=true;
							var certificate='';
							var certificateIHM=''	
							var certificateName = '';
								
								 certificate = auditService.ihmApproveLetter(certificateDatas);
								 certificateName = 'Approval Letter_' + res.certificateNo + '.pdf';
 
							     blockUI.stop();
				
							
							if(title == false){
								toaster.warning("Can't generate Letter, because title is mismatching");
							}
							else{
								 
									pdfMake
									.createPdf(certificate)
									.download(certificateName);
							}
							
							
							
							detailsFactoryIhm.updateLtrStatus(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.ACCEPT).$promise.then(function(res){
								
								if(res.success){
									det.approvalLtrStaus=false;
								
									
									detailsFactoryIhm.getPreviousAuditDetail(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(result){
										result.prevAuditDtl.forEach(function(preAuditDtl){
						        			preAuditDtl.openMeetingDate = preAuditDtl.openMeetingDate?moment(preAuditDtl.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY):''; 
						        			
						             	});
										response.forEach(function(response){
						        			response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
						        			try {
												var auditPlace = response.auditPlace ? atob(response.auditPlace)
														: '-';
												response.auditPlace = decodeURIComponent(auditPlace);
												response.sspLtrStatus =1;
											} catch (err) {
												console
														.log(err);
											}
						        		});
										det.LetterHistoryDetails=response;
										
						        		det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
											return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
										});
						        		
						        		setVesselLetterHist(det.auditSeqNo,response);	
						        			
						        	});
									
								}
							});
			   		 
						});
						
					
						
					}});
			 
	}
	
	 
	 function getHeight(){
		
		var def = $q.defer();
		
		$timeout(function() {
		 
			var tmpHgt=0;
			 if (window.navigator.msSaveOrOpenBlob) { // For IE:
				 tmpHgt=20;
				 def.resolve(tmpHgt);
				 
				 
	    	    }else{
	    	    	
			var canvasGetHgt = document.createElement('canvas');
			canvasGetHgt.id ="canvasGetHeight";
			canvasGetHgt.width = 797;
			canvasGetHgt.height = 100;
	
		
			
			var body = document.getElementsByTagName("body")[0];
			body.appendChild(canvasGetHgt);
	
			var canvashiddenhgt = angular.element( document.querySelector( '#canvasGetHeight' ));
			canvashiddenhgt.addClass('hidden');
	
	
			var canvashgt = document.getElementById("canvasGetHeight");

			  rasterizeHTML.drawHTML(det.auditDetail.narrativeSummary, canvashgt).then(function success(result){
				
					var parser = new DOMParser();
					var parsedHtml = parser.parseFromString(result.svg, 'text/html');
				    tmpHgt= parsedHtml.getElementsByTagName("svg")[0].height.baseVal.value;
					
					def.resolve(tmpHgt);
				});	
		
	
			$('#canvasGetHeight').remove();
			
			
			
	    	    }
			
			
			
		}, 100);
		
		return def.promise;
		
	}
	
	/** IHM Part 1 attach stamp of approval*/ 
	function stampApproval(){
		var flag = false;
		masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		
		detailsFactoryIhm.auditorSignAndSeal(res[0].officialId, sessionStorage.getItem('companyId')).$promise
		.then(function(data) {
			
			if(data.title.indexOf('Special') >= 0 || data.title.indexOf('Deputy') >= 0)
				flag = true;
			if(flag){
				ModalService.showModal({
					  templateUrl : 'src/modals/pdfsign.html',
					  controller  : 'PdfsignController as pdfsign',
					  inputs : {
					
				               scope : det
					 }
					}).then(function(modal){
						
						modal.element.modal();
						
						modal.close.then(function(result){
							
							
						});
					});
			}else{
				toaster.warning('Cant attach Stamp in PDF, because title is mismatching from Oracle RMI');
			}
		});
		});
		
		
		
	}
	
	function exportReport(){
		//Added by Ramya on 08-08-2022 for Jira Id-->IRI-5415
		if(!det.notLead){
			if(det.AuditDetailForm.vslImo.$valid && det.auditDetail.auditAuditorDetail[0].audSignature == ""){
				det.saveAuditData('Data saved successfully');	
			}
		}
		else{
			det.saveAuditData('Data Saved Successfully');
		}
        
		ModalService.showModal({
				  templateUrl : 'src/modals/reportHistory.html',
				  controller  : 'reportHistoryController as rptHist',
				  inputs : {
				
			               scope : det
				 }
				}).then(function(modal){
					modal.element.modal();
					modal.close.then(function(result){
					});
				});
	}
	
	
	
function genarateReceiptLetter (){
	 
	det.saveAuditData();
		
		$timeout(function(){
			var title = false;
			if (det.title != '') {
				if (det.title.indexOf('Special') >= 0) {
					title = true;
				} else if (det.title.indexOf('Deputy') >= 0) {
					title = true;
				}
				else{
					title = false;
				}
			}
	
  detailsFactoryIhm.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
		
		var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
	
	res.companyaddress = det.cmpnyAdrs;
	
	res.companyname = det.cmpnyNme;
	
	res.officialNo = det.vesselDetail.officialNo;
	
	res.leadSign = det.leadSignReceiptLtr; //**  IRI-5270 added by kiran */
	
	res.portofreg = "MAJURO";
	
	res.companyimono = det.vesselCompanyDtl.companyImoNo;

  res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm)?moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format('DD-MMMM-YYYY'); 
 
  res.receiptdate1 = moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY');
  
  res.title =det.title; /** IRI-5245 added by kiran  */
  
  res.leadAuditorName = det.signerName;
  
  //res.userAddress = det.ihmUserDetails.address ? det.ihmUserDetails.address :'';
  
  var leadauditorMail = _.findWhere(det.audObsNameArray, {'sequenceNo':det.auditDetail.leadAuditorId, 'companyId' : Number(det.companyId)});
	   det.ihmUserDetails=_.findWhere(det.audObsNameArray, {'emailId' : leadauditorMail.emailId});
	   res.userAddress = (det.ihmUserDetails &&  det.ihmUserDetails.address ) ? det.ihmUserDetails.address :'';
  
  console.log(res);
  
  var certificate = '';
  
  var certificateIHM = '';
  
  var certificateName ='';
  blockUI.stop();

  	blockUI.start();
  
   
  	// certificate = auditService.ihmReceiptLetter(res);
  	 certificateIHM = auditService.ihmReceiptLetter(res);
	
		 //Dont Delete
	 	var  receiptBase64Data = '';
	 	pdfMake.createPdf(certificateIHM).getBuffer(function(buffer) {
			var byteArray = new Uint8Array(buffer);
			var length = byteArray.byteLength;
			for (var i = 0; i < length; i++) {
				receiptBase64Data += String.fromCharCode(byteArray[i]);
			}
		});
		
		$timeout(function(){
			var fileByte = [];
			fileByte = receiptBase64Data ? btoa(receiptBase64Data) : '';
			var auditSubTypeId = _(det.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(res.auditSubTypeId)}).pluck('auditSubtypeDesc').toString();
			var finalFileName =  res.vesselName + '_' + res.audTypeDesc + '_' + auditSubTypeId + '_' + res.auditReportNo+'.pdf';
			var parameter = {
					'fileName'   : finalFileName,
					'fileByte'   : fileByte,
					'reportName' : 'ReciptLetter',
					'userName'	 : sessionStorage.getItem('emailId')
				};
			auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
		     });
     },1000);	
		
	blockUI.stop();
	
    });
		
		},2000);
	}

	function validateReceiptLetter()			//added by @Ramya on 24-6-22 for jira id - IRI-5346
	{
		var flag=true;
		var approvalDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
		var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
		var issueDate =  det.auditDetail.certIssueDate ?  moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
			
		if(approvalDate && reciptDate && (reciptDate>approvalDate)){
		flag = false; 
		var msg='Approval';
		toaster.warning(msg+' Date should be greater than or Equal to Receipt Date');   
		}else if(issueDate && reciptDate &&  issueDate>reciptDate){
			flag = false;
			toaster.warning('Receipt Date should be greater than or Equal to IHM Part I Issue Date');  
		}else if(approvalDate && issueDate && issueDate>approvalDate){
			var msg='Approval';
			toaster.warning(msg+' Date cannot be earlier than  or Equal to IHM Part I Issue Date'); 
			flag = false;
		}
	 //  added by ramya for jira-id-->IRI-5222
	 if(flag==true){
		 det.receiptStart=true;
		 det.receiptLtr=false;
	 }
	 return flag;
	 }
	
	function exportReceiptLetter(){
		
		det.receiptStart=true;
		
		var toasterReceiptMsg = (det.auditDetail.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID) ? 'Receipt Letter downloaded Successfully' : 'Amendment Receipt letter downloaded successfully';		//changed by @Ramya for Jira id - IRI-5627
		det.saveAuditData(toasterReceiptMsg);
		 
		det.receiptLtr= false;
		
		det.letterRecComp = [];
		var campAddress = '',compName='';
		var vesselname = det.auditDetail.vesselNameAud ? det.auditDetail.vesselNameAud : det.auditDetail.vesselName ? det.auditDetail.vesselName : det.vesselDetail.vesselName;
		if(det.auditDetail.companyAddressAud){
			var orgComAdd = det.auditDetail.companyAddressAud.split("\n");
			campAddress = orgComAdd[1];
			compName = orgComAdd[0];
		}else
		{
			campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
			compName = det.vesselCompanyDtl.vesselCompanyName;
		}
		  det.letterRecComp.companyAddress = campAddress;
		  det.letterRecComp.companyName = compName;
		  det.letterRecComp.vesselName = vesselname;
		
		blockUI.start("Preparing Letter");
		 
		//console.log(saveData+new Date().getTime() / 1000);
		$timeout(function(){
			var title = false;
			if (det.title != '') {
				if (det.title.indexOf('Special') >= 0) {
					title = true;
				} else if (det.title.indexOf('Deputy') >= 0) {
					title = true;
				}
				else{
					title = false;
				}
			}
		detailsFactoryIhm.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
		console.log(res);
			var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
		
		res.companyaddress = res.companyAddressAud ?res.companyAddressAud :'';
		
		//res.companyname = det.cmpnyNme;
		
		res.officialNo = det.vesselDetail.officialNo;
		
		res.leadSign = det.leadSignReceiptLtr; //**  IRI-5270 added by kiran */
		
		res.portofreg = "MAJURO";
		
		res.companyimono = det.vesselCompanyDtl.companyImoNo;
	
	    res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm)?moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format('DD-MMMM-YYYY'); 
	   
	    res.receiptdate1 = moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY');
	    
	    res.title =det.title; /** IRI-5245 added by kiran  */
	    
	    res.leadAuditorName =det.signerName;
	    
	    res.vesselName = res.vesselNameAud ? res.vesselNameAud :'';
	    
	    //res.approvalDate = det.auditDetail.auditDate;
	    
	    //res.userAddress = det.ihmUserDetails.address ? det.ihmUserDetails.address :'';
	    
 	    var leadauditorMail = _.findWhere(det.audObsNameArray, {'sequenceNo':det.auditDetail.leadAuditorId, 'companyId' : Number(det.companyId)});
		det.ihmUserDetails=_.findWhere(det.audObsNameArray, {'emailId' : leadauditorMail.emailId});
		res.userAddress = (det.ihmUserDetails &&  det.ihmUserDetails.address ) ? det.ihmUserDetails.address :'';
	    
	    var certificate = '';
	    
	    var certificateIHM = '';
	    
	    var certificateName ='';
	    
	    var certificateAmendment ='';
	    blockUI.stop();
	 
	    	blockUI.start("Preparing Letter");
	    
	     
	    	 //certificate = auditService.ihmReceiptLetter(res);
	    	 if(res.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
	    		 certificate = auditService.ihmReceiptLetter(res);
				 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
				 pdfMake.createPdf(certificate).download(certificateName);
			 }else if(res.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
				 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
				 certificateAmendment = auditService.ihmAmendmentReceiptLetter(res);
				 pdfMake.createPdf(certificateAmendment).download(certificateName);
			 }
	     
		
		
		if(title == false){
			toaster.warning("Can't generate Letter, because title is mismatching");
		}/*else{
			pdfMake.createPdf(certificate).download(certificateName);
			pdfMake.createPdf(certificateAmendment).download(certificateName);
		}*/
		
 
//		var enc = window.btoa(certificate);
//
//		var decrypt = window.atob(enc);
//	
//		doc.addImage(decrypt, 'PNG', 0, 0, doc.internal.pageSize.width,doc.internal.pageSize.height, "newCertificate", 'FAST');
//
//		doc.save('Receipt Letter_' + res.certificateNo + '.pdf');
		
		blockUI.stop();
		
		/*});*/});
		
		blockUI.stop();
		},2000);
		
	}
	
	
	
function exportReceiptHist(auditTypeId,companyId,auditSeqNo,vesselnameRec,compAddRec,compNameRec,activeStatusRec,openMeetingDateRec){
		
		det.receiptStart=true;
		 
		det.receiptLtr= false;
		
		det.letterRecComp = [];
		var campAddress = '',compName='';
		var vesselname = det.auditDetail.vesselNameAud ? det.auditDetail.vesselNameAud : det.auditDetail.vesselName ? det.auditDetail.vesselName : det.vesselDetail.vesselName;
		if(det.auditDetail.companyAddressAud){
			var orgComAdd = det.auditDetail.companyAddressAud.split("\n");
			campAddress = orgComAdd[1];
			compName = orgComAdd[0];
		}else
		{
			campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
			compName = det.vesselCompanyDtl.vesselCompanyName;
		}
		
		
		
		  det.letterRecComp.companyAddress = campAddress;
		  det.letterRecComp.companyName = compName;
		  det.letterRecComp.vesselName = vesselname;
		
		blockUI.start("Preparing Letter");
		 
		//console.log(saveData+new Date().getTime() / 1000);
		$timeout(function(){
			var title = false;
			if (det.title != '') {
				if (det.title.indexOf('Special') >= 0) {
					title = true;
				} else if (det.title.indexOf('Deputy') >= 0) {
					title = true;
				}
				else{
					title = false;
				}
			}
		detailsFactoryIhm.getAuditDetail(auditTypeId,companyId,auditSeqNo).$promise.then(function(res) {			//Changed by @Ramya for jira id - IRI-5373
		console.log(res);
			var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
		
		//res.companyaddress = res.companyAddressAud ?res.companyAddressAud :'';
		
		//res.companyname = det.cmpnyNme;
			
			var spliRec=compAddRec.split('\n');
			
			
			if(spliRec.length>1){
				res.companyaddress =compAddRec;
			
			}
			else{
				res.companyaddress = compNameRec +"\n"+compAddRec;
				
			}
		
		res.officialNo = det.vesselDetail.officialNo;
		
		res.leadSign = det.leadSignReceiptLtr; //**  IRI-5270 added by kiran */
		
		res.portofreg = "MAJURO";
		
		res.companyimono = det.vesselCompanyDtl.companyImoNo;
	
	    //res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm)?moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format('DD-MMMM-YYYY'); 
	   
	    res.receiptdate1 = moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY');
	    
	    res.title =det.title; /** IRI-5245 added by kiran  */;
	    
	    res.leadAuditorName =det.signerName;
	    
	    res.vesselName = vesselnameRec;
	    
	    res.activeStatus=activeStatusRec;
	    
	    res.receiptdate=moment(openMeetingDateRec,YYYYMMDD).format('DD-MMMM-YYYY');
	    
	    //res.approvalDate = det.auditDetail.auditDate;
	    
	    //res.userAddress = det.ihmUserDetails.address ? det.ihmUserDetails.address :'';
	    
 	    var leadauditorMail = _.findWhere(det.audObsNameArray, {'sequenceNo':det.auditDetail.leadAuditorId, 'companyId' : Number(det.companyId)});
		det.ihmUserDetails=_.findWhere(det.audObsNameArray, {'emailId' : leadauditorMail.emailId});
		res.userAddress = (det.ihmUserDetails &&  det.ihmUserDetails.address ) ? det.ihmUserDetails.address :'';
	    
	    var certificate = '';
	    
	    var certificateIHM = '';
	    
	    var certificateName ='';
	    
	    var certificateAmendment ='';
	    blockUI.stop();
	 
	    	blockUI.start("Preparing Letter");
	    	
		
		ModalService.showModal({
			
			templateUrl : 'src/modals/LetterView.html',
			
			controller  : 'ReceiptHistoryController as LtrHist',
			inputs : {
			scope:det,
				res:res
			}
		}).then(function(modal) {
			
			modal.element.modal();
			
           modal.close.then(function(result) {
           	
           });
           
		});	
		
		blockUI.stop();
		
		
		});
		
		blockUI.stop();
		},2000);
		
	}
	
	
	
	
	/***on click of revert review button***/
	function revertReview(){ 
		if(det.nextAdtCreated){
			var msg= ' Review ';
		 toaster.warning('Next '+msg+' has been Created');
		}else{
			ModalService.showModal({
				
				templateUrl : 'src/modals/docChanged.html',
				
				controller  : 'docChangedController',
				
				inputs		: {data:'Do You really want to Pull back Review request ?'},
			
			}).then(function(modal){
				
				modal.element.modal();
					    			
				modal.close.then(function(result){
					
					if(result=='YES'){
						
						det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
						
						det.rptAttchFlag = true;
						
						det.saveAuditData('Data Saved Successfully');
						
						det.lockStatus = false;
					}
				});
			});
		}	
		}
	
	/********Lock Applied or Released**********/
	function changeCallback() {
			
			if (det.enabled) {
				det.createedit = 'Lock';
				detailsFactoryIhm.updateLockHolder(det.auditDetail.auditTypeId, det.auditSeqNo,sessionStorage.getItem('emailId'),det.companyId).$promise.then(function(data){
					if(data.data=='Success'){
						toaster.success('Lock has been applied successfully');
						
						det.lockStatus = false;
						det.lockHolder = 	sessionStorage.getItem('emailId');
						if(det.nextAdtCreated == true){
							det.lockStatus=true;
						}
						
	 				}else{
	 					
	 					if(_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('firstName').toString()){
	 						
	 						toaster.warning('Current '+det.auditType+' Locked by '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('firstName').toString()+' '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('lastName').toString());
						}else{
							detailsFactoryIhm.getCurrentUserDetail(data.lockHolder,det.companyId).$promise.then(function(userDtl){
								if(userDtl.length>0){
									toaster.warning('Current '+det.auditType+' Locked by '+ userDtl[0].firstName +' '+userDtl[0].lastName);
		    					}
							});
						}
	 					
						det.enabled = false;
					}
				});	
				
			} else {
				det.createedit = 'Unlock';
				detailsFactoryIhm.updateLockHolder(det.auditDetail.auditTypeId, det.auditSeqNo,' ',det.companyId).$promise.then(function(data){
					if(data.data=='Success'){
						
						toaster.success('Lock Released Successfully');
						
						det.lockStatus = true;
					}
	 			});
			}
			
			console.log(det.lockStatus)
	}
	
	/***if doc changed for vessel which is in Audit process with commenced/open audit status or Vessel going for new Audit.***/
	function docChange(param){ 
		if(param == det.AppConstant.CREATE){
			ModalService.showModal({
				
	    		templateUrl : 'src/modals/docChanged.html', 
	    			
	    		controller  : 'docChangedController',
	    			
	    		inputs		: {data:'DOC has been changed. Please mark the previous Audit/Review as void in order to proceed further'},	    			
	    		
	    	}).then(function(modal) {
	    			
	    		modal.element.modal();
	    			
	    		modal.close.then(function(result) {
	    			if(result=='OK' || result=='Cancel'){
	    			 det.lockStatus = true;
					    det.lockDisable = true;
						det.previousAudit = {};
						det.carFindMaxStatusDate = '';
						
						det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID];
	    			}
	    		});
	    	});	
		}
		
		/*ModalService.showModal({
    			
    		templateUrl : 'src/modals/docChanged.html', 
    			
    		controller  : 'docChangedController',
    			
    		inputs		: {data:'DOC has been changed do you want to continue with existing certification flow'},	    			
    		
    	}).then(function(modal) {
    			
    		modal.element.modal();
    			
    		modal.close.then(function(result) { 
    				
    			if(result=='NO' && param == det.AppConstant.CREATE){
    				
    				    det.lockStatus = true;
					    det.lockDisable = true;
						det.previousAudit = {};
    					det.carFindMaxStatusDate = '';
    					
    					det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID];
    					
    			}else if(result=='NO' && param == det.AppConstant.UPDATE){
    			
    				detailsFactoryIhm.updateDocFlag(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.NON_ACCEPTED_DOC_FLAG).$promise.then(function(res){
    						
    						if(res.success){}
    					});
    					
    					det.lockStatus = true;
    					
    					det.lockDisable = true;
    					
    					toaster.warning('Please contact Admin, This audit need to be marked as void to proceed with new DOC Changes');
	    				
    			}else if(result == 'YES'){
    					
    					if(param == det.AppConstant.CREATE){
    						
    						detailsFactoryIhm.getPrevDocDetails(det.previousAudit.companyImoNo,det.previousAudit.companyDoc,det.previousAudit.companyId).$promise.then(function(res){
        						
        						if(res.prevDocDtl.length > 0){
        						
        							var vesselCoDtl = _.findWhere(det.companyDetails, {'companyImoNo' : det.previousAudit.companyImoNo, 'companyId' : det.previousAudit.companyId});

        							det.vesselCompanyDtl.companyImoNo = res.prevDocDtl[0].companyImoNo;
    	    					
        							det.vesselCompanyDtl.docTypeNo = res.prevDocDtl[0].docTypeNo;
    	    					
        							det.vesselCompanyDtl.docExpiry = moment(res.prevDocDtl[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY');
    	    					
        							det.vesselCompanyDtl.docIssuer = res.prevDocDtl[0].docIssuer;
        							
        							try{
        								vesselCoDtl.vesselCompanyName = decodeURIComponent(vesselCoDtl.vesselCompanyName);
        								
        								vesselCoDtl.vesselCompanyAddress = decodeURIComponent(vesselCoDtl.vesselCompanyAddress);
        							}
        							catch(err){}
        							
        							det.vesselCompanyDtl.companyAddress = vesselCoDtl.vesselCompanyName+'\n'+vesselCoDtl.vesselCompanyAddress;    			
        							
        							det.cmpnyAdrs = vesselCoDtl.vesselCompanyAddress;
        				    		
        							det.cmpnyNme = vesselCoDtl.vesselCompanyName;
    	    					
        							det.auditDetail.docFlag = det.AppConstant.ACCEPTED_DOC_FLAG;
        					}
        				});
    				}else if(param == det.AppConstant.UPDATE){
    					
    					det.auditDetail.docFlag = det.AppConstant.ACCEPTED_DOC_FLAG;
    				}
    			}
    		});
    	});*/
	}
	
	/*****download audit reports*****/
	function downloadReport(fileName,index){
		
		blockUI.start();
		
		var findingFileByte = det.auditDetail.auditRptAttach[index].fileByte ? atob(det.auditDetail.auditRptAttach[index].fileByte) : '';

		if(findingFileByte){
			
			var bytes = new Uint8Array(findingFileByte.length);
    	    
    	    for (var i = 0; i < findingFileByte.length ; i++){
    	        bytes[i] = findingFileByte.charCodeAt(i);
    	     }
    	   
    	    _.downloadFiles(new Blob([bytes.buffer], {type : 'content-type'}),fileName);
    	    
    	    blockUI.stop();
			
		}else{
			
			detailsFactoryIhm.downloadReport(fileName,det.auditSeqNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){ 
				
				if(res.status == 200){
					
					_.downloadFiles(new Blob([res.data],{type:'Content-Type'}), fileName);
					
					blockUI.stop();
				}
			});
		}
		
		blockUI.stop();
	}
	
	/***** report file preview modal window *****/
	function reportFilePreview(file,index){
		
		blockUI.start();
		
		det.reportClick = false;  
		
		var fileExtension = file.split('.').pop(); 
    	
		detailsFactoryIhm.downloadReport(file,det.auditSeqNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){ 
    			
    			if(res.status == 200 || det.auditDetail.auditRptAttach[index].fileByte){
    				
    				det.reportFilePreviewModal(file, index, det.auditDetail.auditRptAttach[index].fileByte);
    				
    				blockUI.stop();
    				        				
    			}else{
    				
    				blockUI.stop();
    			}
    	});
	}
	
	function reportFilePreviewModal(file,index,byteArray){
		
		ModalService.showModal({
			
			templateUrl : 'src/modals/reportPreview.html',
			
            controller  : 'reportPreviewController',
            
            inputs : {
            	
            	scope : det,
            	
            	reportTypes : det.reportTypes,
            	
            	fileData : {'file':file, 'index':index, 'ismReport':det.auditDetail.auditRptAttach, 'audSeqNo':det.auditSeqNo, 'audType':'MLC', 'byteArray':byteArray, 'auditTypeId':det.auditTypeId}
            }
            
		}).then(function(modal) {
			
            modal.element.modal();
            
            det.reportClick = true;    
            
            modal.close.then(function(result) {
            	
            	blockUI.stop();
            	
            });
            
		});
	}
	
		/*******for removing the Report attached files*******/
	function removeReport(indexnew,file,typeId){
		var index = _.findLastIndex(det.auditDetail.auditRptAttach, {
			seqNo: indexnew
    	});
		    		
		ModalService.showModal({
			
			templateUrl : 'src/modals/deleteAttachment.html',
			
			controller  : 'removeReportController',
			
			inputs		: {data:'Attachment'},
		
		}).then(function(modal) {
			
			modal.element.modal();
				    			
			modal.close.then(function(result) {
				if(result=='YES'){
					blockUI.start();    		
		    		if(typeId == det.AppConstant.OTHER_RPT_ATCH_ID){
		    			det.auditDetail.auditRptAttach.splice(index,1);
		    			blockUI.stop();
		    		}else{
		    			det.auditDetail.auditRptAttach[index].fileName = '';
		    			det.auditDetail.auditRptAttach[index].fileData = '';
		    			det.auditDetail.auditRptAttach[index].fileByte = '';
		    			det.auditDetail.auditRptAttach[index].comments = '';
		    			blockUI.stop();
		    		}
				}
			});
			
		}); 
	}
	
	 
    function setReceiptDate(){ 
    
    	det.minIssueDate ='';// det.auditDetail.openMeetingDate ? moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD) : '';
    	  
    	//det.receiptMaxDate =''; det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY+HHmm).format(YYYYMMDD) :'';
    	
    	det.receiptMaxDate =  moment(new Date()).format(YYYYMMDD);
    	
    	det.minIssueDate = '';
    	
    	//det.auditMinDate = '';// (det.auditDetail.openMeetingDate && moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) > det.auditMinDate )? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMinDate;
    	
    //	det.auditDetail.certIssueDate = (det.minIssueDate && det.auditDetail.certIssueDate && moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD) < det.minIssueDate) ? moment(det.minIssueDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certIssueDate;
    	
    	det.receiptMinDate ='';// det.minIssueDate ;
    	
    	if(moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) < moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD) ){ 
    		//det.auditDetail.certIssueDate ='';   
    		}

    	 
    }
    
     
    
    
    /********set Plan Accepted due Date and Summary Date**************/
   
    
    function setSummaryAndDueDate(){
	   var summaryDateChangeNc ='',summaryDateChangeNcPrevDate=0, summaryDateChangeNc2 ='',summaryDateChangeNcPrevDate2=0;
	   var summaryDateChangeMNC='',summaryDateChangeMNC2='',summaryDateChangeMNC2PrevDate=0; 
	   var summaryDateChangeMNCPrevDate='',summaryDateChangeMNCPrevDate='';
	   
	   var tempObsArray = det.auditDetail.auditFinding ? angular.copy(det.auditDetail.auditFinding) : [];
	   
	   var tempObsArray1 = det.auditDetail.auditFinding ? angular.copy(det.auditDetail.auditFinding) : [];
	   
	   tempObsArray = tempObsArray.filter(function( obj ) {
			return obj.findingDetail.length>0 && obj.findingDetail[0].categoryId == det.AppConstant.MINOR_FINDING_CATEGORY && obj.findingDetail[0].nextActionId;
	     });
	 
	
	 
	   tempObsArray1 = tempObsArray1.filter(function( obj ) {
		return obj.findingDetail.length>0 && (obj.findingDetail[0].categoryId == 1001 || obj.findingDetail[0].categoryId == 1003) && obj.findingDetail[0].nextActionId;
         });
	   
	
	   if(det.auditDetail.auditTypeId != det.AppConstant.MLC_TYPE_ID){
	   
	   var len = tempObsArray.length;
	   var len1 = tempObsArray1.length;
	   var i='', flagNC=true ,flagMNC=true,flagMNC2=true,noVerifyCloseMnc=true;  
	   tempObsArray.forEach(function(index){ console.log(index);
	  // identifying Nc lan accpeted  large date validate closing meeting date
		     if(flagNC){
			  summaryDateChangeNc= (index.findingDetail[0].dueDate)?index.findingDetail[0].dueDate:'';
			  
			  summaryDateChangeNc = (index.auditTypeId == det.AppConstant.ISPS_TYPE_ID && index.auditSubTypeId != det.AppConstant.ADDITIONAL_SUB_TYPE_ID && index.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && index.findingDetail[1] && index.findingDetail[1].dueDate ) ? index.findingDetail[1].dueDate : summaryDateChangeNc;
				  
			   if(summaryDateChangeNc && (summaryDateChangeNc.toUpperCase() == (moment(summaryDateChangeNc,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
				{  if(summaryDateChangeNcPrevDate==0){
					 summaryDateChangeNcPrevDate = moment(summaryDateChangeNc,MMMDDYYYY).format(YYYYMMDD);
				   }
				   if((moment(summaryDateChangeNc,MMMDDYYYY).format(YYYYMMDD))>summaryDateChangeNcPrevDate)
				   { summaryDateChangeNcPrevDate = moment(summaryDateChangeNc,MMMDDYYYY).format(YYYYMMDD); 
				   }
				    summaryDateChangeNc = (summaryDateChangeNcPrevDate)?moment(summaryDateChangeNcPrevDate,YYYYMMDD).format(MMMDDYYYY):'';
				   
				    det.findingsNcSerialNo = index.serialNo;
				    console.log();
				    det.findingsNcDueDate = moment( summaryDateChangeNc,MMMDDYYYY).format(YYYYMMDD);
				    det.findingsNcDueDate = moment( det.findingsNcDueDate,YYYYMMDD).format(YYYYMMDD);
				    console.log(det.findingsNcDueDate);
				}else{ 
					summaryDateChangeNc=''; 
					}
			}
		     //identifying Nc verify close large date validate closing meeting date
		     if(flagNC){
		    	 
		    	 summaryDateChangeNc2 =  (index.findingDetail[2] && index.findingDetail[2].nextActionId==det.AppConstant.VERIFY_CLOSE) ? index.findingDetail[2].dueDate:'DD/MMM/YYYY';
		       
				   if(summaryDateChangeNc2 && (summaryDateChangeNc2.toUpperCase() == (moment(summaryDateChangeNc2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
					{  if(summaryDateChangeNcPrevDate2==0){
						summaryDateChangeNcPrevDate2 = moment(summaryDateChangeNc2,MMMDDYYYY).format(YYYYMMDD);
						 }
					   if((moment(summaryDateChangeNc2,MMMDDYYYY).format(YYYYMMDD))>summaryDateChangeNcPrevDate2)
					   { summaryDateChangeNcPrevDate2 = moment(summaryDateChangeNc2,MMMDDYYYY).format(YYYYMMDD); 
					   } 
					    summaryDateChangeNc2 = (summaryDateChangeNcPrevDate2)?moment(summaryDateChangeNcPrevDate2,YYYYMMDD).format(MMMDDYYYY):'';
					}else{ 
						summaryDateChangeNc2=''; 
						}
				}
		     
	 }); 
	 //identifying MNC verify close large date validate closing meeting date 
	   tempObsArray1.forEach(function(index){
		    summaryDateChangeMNC2 =  (index.findingDetail[2] && index.findingDetail[2].nextActionId==det.AppConstant.VERIFY_CLOSE) ? index.findingDetail[2].dueDate:'DD/MMM/YYYY';
		
		   if(summaryDateChangeMNC2 && (summaryDateChangeMNC2.toUpperCase() == (moment(summaryDateChangeMNC2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
			{ noVerifyCloseMnc=false;
			   if(summaryDateChangeMNC2PrevDate==0){
				   summaryDateChangeMNC2PrevDate = moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD);
			  }det.findingMncOrNc = index.serialNo;
			   if((moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD))>summaryDateChangeMNC2PrevDate)
			   { summaryDateChangeMNC2PrevDate = moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD); }
			 }
	    });
	  

	    var flag1=true;	
		tempObsArray1.forEach(function(index){
			if(flag1){
			var tmp=(index.findingDetail[2] && index.findingDetail[2].nextActionId==det.AppConstant.VERIFY_CLOSE) ? index.findingDetail[2].dueDate:'';	
			
			 if(tmp && (tmp.toUpperCase() == (moment(tmp,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
				{  if((summaryDateChangeMNC2PrevDate)==(moment(tmp,MMMDDYYYY).format(YYYYMMDD))){ 
				   flag1=false; 
				   
				   det.findingMncVerifySerialNo = index.serialNo;
				  summaryDateChangeMNC=(index.findingDetail[1] && index.findingDetail[1].nextActionId==det.AppConstant.PLAN_ACCEPTED) ? index.findingDetail[1].dueDate:'';
		          }
			   }
			}
		});
		
		if(noVerifyCloseMnc){
			summaryDateChangeMNC2PrevDate=0;
			tempObsArray1.forEach(function(index){
				   
				   summaryDateChangeMNC2 =  (index.findingDetail[1] && index.findingDetail[1].nextActionId==det.AppConstant.PLAN_ACCEPTED) ? index.findingDetail[1].dueDate:'DD/MMM/YYYY';
			      if(summaryDateChangeMNC2 && (summaryDateChangeMNC2.toUpperCase() == (moment(summaryDateChangeMNC2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
					{ 
					   if(summaryDateChangeMNC2PrevDate==0){
						   summaryDateChangeMNC2PrevDate = moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD);
					  }
					   if((moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD))>summaryDateChangeMNC2PrevDate)
					{ summaryDateChangeMNC2PrevDate = moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD); }
					  
					   
					   summaryDateChangeMNC = (summaryDateChangeMNC2PrevDate)?moment(summaryDateChangeMNC2PrevDate,YYYYMMDD).format(MMMDDYYYY):'';
					}
			    });
		}
		
		
		
		//getting planaccepted large date to validate wit closing meeting date 
		var flag2=true;  var planAcceptedMax='',planAcceptedMaxprev=0; 	
		tempObsArray1.forEach(function(index){
			planAcceptedMax =  (index.findingDetail[1] && index.findingDetail[1].nextActionId==det.AppConstant.PLAN_ACCEPTED) ? index.findingDetail[1].dueDate:'DD/MMM/YYYY';
		
		   if(planAcceptedMax && (planAcceptedMax.toUpperCase() == (moment(planAcceptedMax,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
			{ 
			   if(planAcceptedMaxprev==0){
				   planAcceptedMaxprev = moment(planAcceptedMax,MMMDDYYYY).format(YYYYMMDD);
			   }
			   det.findingMncPlanacceptedSerialNo = index.serialNo;
			   
			   if((moment(planAcceptedMax,MMMDDYYYY).format(YYYYMMDD))>planAcceptedMaxprev)
			   { planAcceptedMaxprev = moment(planAcceptedMax,MMMDDYYYY).format(YYYYMMDD); }
			 }
           det.findingsMncPlanacceptedMaxDate = moment(planAcceptedMaxprev,YYYYMMDD).subtract(30,'days').format(YYYYMMDD);
		});
		
		summaryDateChangeMNC= summaryDateChangeMNC;
		summaryDateChangeMNC2 = (!noVerifyCloseMnc)?moment(summaryDateChangeMNC2PrevDate,YYYYMMDD).format(MMMDDYYYY):'';
		summaryDateChangeNc = (!summaryDateChangeNc)?'DD/MMM/YYYY':summaryDateChangeNc;
		
		
	   var newVal1 = new RegExp(det.summaryDate1, 'g');
	   var newVal2 = new RegExp(det.summaryDate2, 'g');
	   
	   } 
	   
	   if(det.auditDetail.auditTypeId != det.AppConstant.MLC_TYPE_ID){
		   if(summaryDateChangeNc2 && (summaryDateChangeNc2.toUpperCase() == (moment(summaryDateChangeNc2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
			{
			   summaryDateChangeNc2=summaryDateChangeNc2; 
		 
			}else{
				summaryDateChangeNc2 = 'DD/MMM/YYYY';
			}
		   if(summaryDateChangeNc && (summaryDateChangeNc.toUpperCase() == (moment(summaryDateChangeNc,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
			{
			   summaryDateChangeNc=summaryDateChangeNc; 
			   
			  
			}else{
				if(det.auditDetail.closeMeetingDate){
				var a = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
				a= moment(a,YYYYMMDD).add(29,'days').format(YYYYMMDD);
				summaryDateChangeNc=moment(a,YYYYMMDD).format(MMMDDYYYY);
				
				}
			}
		   if(summaryDateChangeMNC && (summaryDateChangeMNC.toUpperCase() == (moment(summaryDateChangeMNC,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
			{
			   summaryDateChangeMNC=summaryDateChangeMNC;
			  
			   }else{
				   if(det.auditDetail.closeMeetingDate){
						var a = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
						a= moment(a,YYYYMMDD).add(30,'days').format(YYYYMMDD);
						summaryDateChangeMNC=moment(a,YYYYMMDD).format(MMMDDYYYY); }
			}
		   if(summaryDateChangeMNC2 && (summaryDateChangeMNC2.toUpperCase() == (moment(summaryDateChangeMNC2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
			{ 
			   summaryDateChangeMNC2=summaryDateChangeMNC2;
			   
			   det.findingsMncverifyMaxDate = moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD);
			   det.findingsMncverifyMaxDate = moment(det.findingsMncverifyMaxDate,YYYYMMDD).subtract(90,'days').format(YYYYMMDD);
			 
			   }else{
				   if(det.auditDetail.closeMeetingDate){
						var a = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
						a= moment(a,YYYYMMDD).add(90,'days').format(YYYYMMDD);
						summaryDateChangeMNC2=moment(a,YYYYMMDD).format(MMMDDYYYY); }
                 }
		  
		if(tempObsArray.length>0){  	
	     det.auditSummary[1].audSummaryDesc = det.auditSummary[1].audSummaryDesc.replace(newVal1, summaryDateChangeNc);
  		
		}if(tempObsArray1.length>0){
		
			if(det.auditSummary.length>2){  
  			if(summaryDateChangeMNC){
  				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal1, summaryDateChangeMNC);
  			}
  		
  			if(summaryDateChangeMNC2){
  				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal2, summaryDateChangeMNC2);
  			}
  		}
  		}else{ if(det.auditSummary[2]){
  			det.auditSummary[2].audSummaryDesc =  det.auditSummary[2].audSummaryDesc.replace(newVal2, 'DD/MMM/YYYY');
  		        }
  		}
  		
  	}else{
			
			det.setDefaultSummaryDate();
		}
	}
    
    /**************set default summary date if failure finding not present******************/
    function setDefaultSummaryDate(){
 	   
 	   	var newVal1 = new RegExp(det.summaryDate1, 'g');
			
		var newVal2 = new RegExp(det.summaryDate2, 'g');
		
		
			
		det.auditSummary[1].audSummaryDesc = det.auditSummary[1].audSummaryDesc.replace(newVal1, 'DD/MMM/YYYY');
		
		if(det.auditSummary.length>2){
			
			det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal1, 'DD/MMM/YYYY');
			det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal2, 'DD/MMM/YYYY');
		}
		
		det.summaryDate1 = 'DD/MMM/YYYY'; 
	    	
	    det.summaryDate2 = 'DD/MMM/YYYY';
	    
	    
    }
    
    /********** manual typed date field validation **********/
	
    function dateValidation(val,id,minDate,maxDate,auditor){ 
 
		var flag = true; 
		
		var toastMsg = '';
		
		var idmatch = id.split('-')[0];
		
		switch (idmatch) {
		case 'auditdate':				
			toastMsg = det.auditType;				
			break;
		case 'receiptdate':
			toastMsg = 'Receipt';
			break;
		case 'expirydate':
			toastMsg = det.expiredate;
			break;
		case 'auditinternal':
			toastMsg = 'Internal '+det.auditType;
			break;
		case 'openmeet':
			toastMsg = det.openMettingDate;
			break;
		case 'closemeet':
			toastMsg = det.clseMetingdate;
			break;
		case 'issuedate':
			toastMsg = 'Issue';
			break;
		case 'dmlc1issueDate':	
			toastMsg = 'DMLC I Issue';
			break;
		case 'signDate':	
			toastMsg = 'Signature';
			break;
		}
		
		if(val && (val.toUpperCase() == (moment(val,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() || val.toUpperCase() == (moment(val,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm)).toUpperCase() )){
		
				if(minDate){ 
					
					if(moment(val,MMMDDYYYY).format(YYYYMMDD) < moment(minDate,YYYYMMDD).format(YYYYMMDD)){
						
						$timeout(function(){
	    					$('#'+id).focus();
	    					
	    					toaster.warning(toastMsg+' Date should be greater than or equal to '+ moment(minDate,YYYYMMDD).format(MMMDDYYYY));
	    				},1);
						
						flag = false;
					
					}
				}
				
				if(maxDate && flag){
					
					if(moment(val,MMMDDYYYY).format(YYYYMMDD) > moment(maxDate,YYYYMMDD).format(YYYYMMDD)){
						
						$timeout(function(){
	    					$('#'+id).focus();
	    					toaster.warning(toastMsg+' Date should be less than or equal to '+ moment(maxDate,YYYYMMDD).format(MMMDDYYYY));
	    				},1);
						
					}
				}
				
				if(id == 'openmeet' || id == 'closemeet' || id == 'receiptdate' || id == 'revcmpdate'){
					return moment(val,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm);
				}else{
					return moment(val,MMMDDYYYY).format(MMMDDYYYY);
				}	 				
			 				
			}else if(val=='N.A.' && (id=='auditinternal' || id == 'insauditinternal' || id == 'ispsexpirydate')){}
			
			else if(val){
				if(auditor && det.auditDetail && det.auditDetail.auditAuditorDetail.length>0){
					det.auditDetail.auditAuditorDetail.forEach(function(i){
						if(auditor.userId==i.userId){
						i.audSignatureDate='';
						}
					});
				}
			
			
				if(id == 'openmeet'){
				det.auditDetail.openMeetingDate=''; 
				val=''; }
				else if(id=='closemeet' || id=='creditDate'){
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
        
    
    function setSSPMaxReceiptDate(date){
    	 
    }
    
    function generateUtn(){
    	
    	var i=0, result = '';
    	
    	if(det.previousAudit.utn  && (det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
    		
    		result =  det.previousAudit.utn;
    	
    	}else{
    		
    		var companyName = det.companyData.companyName;
        	var auditSeqNo = det.auditSeqNo+'';
        	var companyId =  det.companyId;
        	var slno = 1;
        	
        	for(i=0; i<auditSeqNo.length; i++){
        		if(i<5 && auditSeqNo.charAt(i)!=0){
        			result = result+String.fromCharCode(Number(auditSeqNo.charAt(i))+64);
        		}else{
        			result = result+auditSeqNo.charAt(i);
        		}
        	}
        	
        	result = companyName.substring(0,3) + companyId + result + slno;
    	}
    	
    	return result;
    }//end of generateUtn()
    
    function vesselDetails(vesselImoNo,searchBy){
    	
    	var vesData = vesselImoNo;
    	det.vesselDetail = {};
    	var msg = '';
    	det.vesselCompanyDtl = {};
    	
    	if(searchBy=='vesselImoNo'){
    		msg = 'IMO Number';
    	}else if(searchBy=='vesselName'){
    		msg = 'Vessel Name';
    	}else if(searchBy=='officialNumber'){
    		msg = 'Official No';
    	}
    	
    	if(searchBy=='vesselName' && vesselImoNo.replace(/[*]/g,'').length<3){
			
    		toaster.warning('Please enter atleast 3 characters');
			vesselImoNo='';
			
		}else if(searchBy=='vesselName' && vesselImoNo.length>=3){
    		
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
		}
    	
    	if(vesselImoNo &&  ((vesselImoNo.length == 7 && searchBy=='vesselImoNo') || searchBy!='vesselImoNo')){
    		
    		detailsFactoryIhm.vesselDetails(det.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,searchBy).$promise.then(function(res){
    			console.log(res);
    			
    			$timeout(function(){
    			
    				det.vesselDataFromRmi = angular.copy(res);
    				det.latestVesselDetail = angular.copy(res);
    				if(det.vesselDataFromRmi.length==1){
    					
    					var autoVessel = res[0];
    	    			autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    	    			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    	    			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    	    			detailsFactoryIhm.updateVesselAuto(autoVessel).$promise.then(function(result) {
    						console.log(result)
    					});
    					if(searchBy!='vesselName' && searchBy!='officialNumber'){  //Added by sudharsan for Jira-ID = 5472 and JIRA-ID 5490
    					vesselStatementFactory.getVesselDetails(vesselImoNo,det.companyId).$promise.then(function(vesRes){
    	        			console.log(vesRes)
    	        			if(vesRes.vesselCompany){
    	        			var count = checkVesselHistory(res,vesRes);
	    	        			if(count!=12){
	    	        				
	    	        				 var vesselHistory = [];
	    	        				 
	    	        				 var comNameAdd = '';
	    		    				 
	    		    				 if(vesRes.vesselCompany[0].vesselCompanyName)
	    		    					 comNameAdd = vesRes.vesselCompany[0].vesselCompanyName;
	    		    				 else
	    		    					 comNameAdd = '-';
	    		    				 
	    		    				 if(vesRes.vesselCompany[0].vesselCompanyAddress)
	    		    					 comNameAdd += '\n' + vesRes.vesselCompany[0].vesselCompanyAddress;
	    		    				 else
	    		    					 comNameAdd += '\n' + '-';
	    		    				 
	    		    		    	 var parameter = {
	    		    		    			'auditSeqNo' : det.auditDetail.auditTypeId,
	 		    							'vesselImoNo' : res[0].imoNumber,
	 		    							'vesselNameAud' : vesRes.vsselDtl[0].vesselName ? vesRes.vsselDtl[0].vesselName : '-',
	 		    							'vesselTypeAud' : vesRes.vsselDtl[0].vesselType ? vesRes.vsselDtl[0].vesselType : '-',
	 		    							'grt' : vesRes.vsselDtl[0].grt ? vesRes.vsselDtl[0].grt : '-',
	 		    							'companyImoNo' : vesRes.vsselDtl[0].companyImoNo ? vesRes.vsselDtl[0].companyImoNo :'-',
	 		    							'dateOfRegistry' : vesRes.vsselDtl[0].dateOfRegistry ? moment(vesRes.vsselDtl[0].dateOfRegistry,'MMM DD, YYYY').format('YYYY-MM-DD') : '',
	 		    							'docIssuerAud' : vesRes.vesselCompany[0].docIssuer ? vesRes.vesselCompany[0].docIssuer : '-',
	 		    							'docExpiryAud' : vesRes.vesselCompany[0].docExpiry ? moment(vesRes.vesselCompany[0].docExpiry,'MMM DD, YYYY').format('YYYY-MM-DD') : '',
	 		    							'vesselAdrress' : comNameAdd,
	 		    							'dateIns' : moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),
	 		    							'vesselId'	: vesRes.vsselDtl[0].vesselId,
	 		    							'vesselCompanyName' : vesRes.vesselCompany[0].vesselCompanyName ? vesRes.vesselCompany[0].vesselCompanyName : '-',
	 		    							'portOfRegistry' : vesRes.vsselDtl[0].portOfRegistry ? vesRes.vsselDtl[0].portOfRegistry : '-',
	 		    							'companyAddress' : vesRes.vesselCompany[0].vesselCompanyAddress ? vesRes.vesselCompany[0].vesselCompanyAddress : '-',
	 		    							'keelLaidDate' : vesRes.vsselDtl[0].keelLaidDate ? moment(vesRes.vsselDtl[0].keelLaidDate,'MMM DD, YYYY').format('YYYY-MM-DD') : '',
	 		    							'regOwnedImoNo' : vesRes.vsselDtl[0].regOwnedImoNo ? vesRes.vsselDtl[0].regOwnedImoNo : 0,
	 		    							'registeredCompanyAddress' : vesRes.vsselDtl[0].registeredCompanyAddress ? vesRes.vsselDtl[0].registeredCompanyAddress : '-',
	 		    							'registeredCompanyName' : vesRes.vsselDtl[0].registeredCompanyName ? vesRes.vsselDtl[0].registeredCompanyName : '-',
	 		    							'statusUpdate' : 'vesselHistory'
	    		    						};
	    		    		    	 vesselHistory.push(parameter);
	    		    		    	 
	    		    		    	 detailsFactoryIhm.updateVesselDetails(vesselHistory).$promise
	    		     				.then(function(res) {
	    		     					
	    		     					
	    		     				});
	    	        			}
    	        			}
	    				    var selectedVsl = det.vesselDataFromRmi[0];
	    					det.vesselSpecificDtl(selectedVsl,'NOrefresh',[]);
    	        		});
    					//Added by sudharsan for Jira-ID = IRI-5472
					}
					else{
						var selectedVsl = det.vesselDataFromRmi[0];
	    					det.vesselSpecificDtl(selectedVsl,'NOrefresh',[]);
					}
    				//End here Jira-Id = IRI-5472
    				}else if(det.vesselDataFromRmi.length>0){
    					
    					//det.imolabelVal = 'vesselImoNo';
    					det.vesselImoModel(det.vesselDataFromRmi,vesData,searchBy);
    					
    				}else{
    					//det.validateVessel();
    					toaster.warning('No vessel present with entered '+msg);	
    				}
    				
    			},0);
    			
    			return res;
        	});
    	}
    }//end of vesselDetails
	
	
    
    function vesselSpecificDtl(object, status,parameter){
    	
    	var autoVessel = object;
    	console.log(autoVessel)
    	
    	var vesselImoNo = object.imoNumber, docTypeNum = object.vesselID;
    	console.log(object);
    	if(object.companyIMONumber){
    	detailsFactoryIhm.vesselSpecificDtl(det.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,docTypeNum).$promise.then(function(res){
    			console.log(res);

				autoVessel.docExpiry = res.vsselDtl.vesselCompany.docExpiry ? moment(res.vsselDtl.vesselCompany.docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			autoVessel.registrationDate = res.vsselDtl.dateOfRegistry ? moment(res.vsselDtl.dateOfRegistry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			autoVessel.keelLaidDate = res.vsselDtl.keelLaidDate ? moment(res.vsselDtl.keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			autoVessel.vesselID = res.vsselDtl.vesselId ? res.vsselDtl.vesselId : '';
    			autoVessel.grossTon = res.vsselDtl.grt ? res.vsselDtl.grt : '';
    			autoVessel.vesselName = res.vsselDtl.vesselName ? res.vsselDtl.vesselName : '';
    			autoVessel.vesselType = res.vsselDtl.vesselType ? res.vsselDtl.vesselType : '';
    			autoVessel.docIssuer = res.vsselDtl.vesselCompany.docIssuer ? res.vsselDtl.vesselCompany.docIssuer : '';
    			autoVessel.homePort = res.vsselDtl.portOfRegistry ? res.vsselDtl.portOfRegistry : '';
    			autoVessel.regOwnedImoNo = res.vsselDtl.regOwnedImoNo ? res.vsselDtl.regOwnedImoNo : '';
    			autoVessel.registeredCompanyAddress = res.vsselDtl.registeredCompanyAddress ? res.vsselDtl.registeredCompanyAddress : '';
    			autoVessel.registeredCompanyName = res.vsselDtl.registeredCompanyName ? res.vsselDtl.registeredCompanyName : '';
    			autoVessel.companyAddress = res.vsselDtl.vesselCompany.vesselCompanyAddress ? res.vsselDtl.vesselCompany.vesselCompanyAddress : '';
    			autoVessel.customerName = res.vsselDtl.vesselCompany.vesselCompanyName ? res.vsselDtl.vesselCompany.vesselCompanyName : '';
    			autoVessel.companyIMONumber = res.vsselDtl.companyImoNo ? res.vsselDtl.companyImoNo : '';
    			console.log(autoVessel)
				
				detailsFactoryIhm.updateVesselAuto(autoVessel).$promise.then(function(result) {
					console.log(result)
				});
    			
    			
    			
    			/*if(!res.leadSign){
    				toaster.warning("Your signature doesn't exist in the IRI System");
    				return;
    			}*/
    			
    			var res2 = angular.copy(res);; 
    			
    			res = angular.copy(res.vsselDtl);
    			
    			det.imolabelVal = 'vesselImoNo';
    			
    			det.vesselImoNo = {'vesselImoNo':res.vesselImoNo};
    			
    			det.setvesselImoNo(res);
    			
    	});}
    	
   	if(!object.companyIMONumber){
   		
   		det.CompanyImoMissingRmi =  true ;
    		
    		det.vesselImoNo.vesselImoNo=object.imoNumber;
    		
    		det.vesselDetail.vesselName=object.vesselName;
    				
    				det.vesselDetail.vesselTypeName=object.vesselType;
    				
    				det.vesselDetail.officialNo=object.officialNumber;
    				
    				det.vesselDetail.grt=object.grossTon;
    				
    				 if(det.CompanyImoMissingRmi){
      					  
       					 det.partialMissingData = ' , Comapny IMO Number and Comapny Details';
          				  det.partialMissingStatus = true; det.partialCount++; 
          				if(!det.vesselCompanyDtl.docType){
           					$('#doctype').addClass('err');} 
       				  }
    		
    		det.reasonForVoidReopen('halt');
			
			toaster.warning('Partial Vessel Details, please provide a Due Date');
    		
    	}
   	if(status == 'refresh'){
   		detailsFactoryIhm.updateVesselDetails(parameter).$promise
		.then(function(res) {
			
			det.vesselUpdate = false;
			toaster.success('Vessel Details Updated!');
			
		});
   	}
    }
    
    
    
    function saveCurrentFinding(){
    	
    	 
    }
    
   function getPort(val){
	   
	   var tempArray = [];
      	 
		if(val){
			var i = 0;
			
			for(i=0;i<det.portArray.length;i++){
				if(det.portArray[i].toUpperCase().indexOf(val.toUpperCase())>-1){
					tempArray.push(det.portArray[i]);
				}
				if(tempArray.length>16 && val.length<4){
					break;
				}
			}
		}
		
		return tempArray;
	}
   
   function setVendorDetails(item,flag){
	   if('vendorName'==flag){
	   var vendorDetail = _.findWhere(det.vendorDetails, {vendorName:item}); 
	   if(vendorDetail && vendorDetail.vendorAddress){
		   det.auditDetail.vendorAddress = vendorDetail.vendorAddress;
	   }
	   
	   if(item=='Other'){
		   det.auditDetail.vendorAddress='Other';
	   }
	   }else{
		   

		   var vendorDetail = _.findWhere(det.vendorDetails, {vendorAddress:item}); 
		   if(vendorDetail && vendorDetail.vendorAddress){
			   det.auditDetail.vendorName = vendorDetail.vendorName;
		   }
		   if(item=='Other'){
			   det.auditDetail.vendorName='Other';
		   }
		   
		   
	   }
   }
 function getVendorNames(val){
	   
	   var tempArray = [];
      	 
		if(val){
			var i = 0;
			
			for(i=0;i<det.vendorDetailsAddress.length;i++){
				if(det.vendorDetailsNames[i].toUpperCase().indexOf(val.toUpperCase())>-1){
					tempArray.push(det.vendorDetailsNames[i]);
				}
				if(tempArray.length>16 && val.length<4){
					break;
				}
			}
		}
		
		return tempArray;
	}
 
 
 function getVendorAddress(val){
	   
	   var tempArray = [];
    	 
		if(val){
			var i = 0;
			
			for(i=0;i<det.vendorDetailsAddress.length;i++){
				if(det.vendorDetailsAddress[i].toUpperCase().indexOf(val.toUpperCase())>-1){
					tempArray.push(det.vendorDetailsAddress[i]);
				}
				if(tempArray.length>16 && val.length<4){
					break;
				}
			}
		}
	
		return tempArray;
	}
   
 
 det.setCorrectVendorData = function(val,param){ console.log("aa");
	 if('vendorName'==param){
	if(! _.findWhere(det.vendorDetails, {vendorName:val}) && det.auditDetail.vendorName!='Other'){
		det.auditDetail.vendorName=''; det.auditDetail.vendorAddress='';
	}
 }else if('vendorAddress'==param && det.auditDetail.vendorAddress!="Other"){
		if(! _.findWhere(det.vendorDetails, {vendorAddress:val})){
			det.auditDetail.vendorAddress=''; 	det.auditDetail.vendorName='';
		}
	 }
	
 }
 
 
   function validatePort(val){
	   
	   if(det.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.portArray.indexOf(val)<0){
		   det.auditDetail.auditPlace = '';
	   }
   }
   
   
   function showData(auditSeqNo,vesselImoNo,auditTypeId,companyId){
		sessionStorage.setItem('auditSeqNo',auditSeqNo);
		sessionStorage.setItem('companyId',companyId);
		sessionStorage.setItem('auditTypeId',auditTypeId);
		$state.go('app.audit.detailsIhm',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
	}
   
   function exportLetterHist(auditTypeId,companyId,auditSeqNo,leadSign,emailId,activeStatus,vesselNameAud,companyAddressAud,companyName,portOfRegistryAud ){
	   masterFactory.getCurrentUserDetail(emailId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactoryIhm.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				var title = data.title; /** IRI-5245 added by kiran  */ 
				var leadSign = data.signature;
				var signerName = data.signer;
				var spliAdd=companyAddressAud.split('\n');				// added by kiran for jira id--> IRI-5293, IRI-5295
					if(spliAdd.length>1){
						companyAddressAud =companyAddressAud;
					}
					else{
						companyAddressAud = companyName +"\n"+companyAddressAud;	
					}
				ModalService.showModal({
					
					templateUrl : 'src/modals/LetterView.html',
					
					controller  : 'LetterHistoryController as LtrHist',
					inputs : {
					scope:det,
						auditTypeId:auditTypeId,
						companyId:companyId,
						auditSeqNo:auditSeqNo,
						leadSign:leadSign,
						signerName:signerName,
						activeStatus:activeStatus,
						vesselNameAud:vesselNameAud,
						companyAddressAud:companyAddressAud,
						portOfRegistryAud:portOfRegistryAud,		//added by ramya for jira id-->IRI-5296
						companyName:companyName,
						title:title,
					}
				}).then(function(modal) {
					
					modal.element.modal();
					
		           modal.close.then(function(result) {
		           	
		           });
		           
				});	
			});
		});
		
	}
   
   $scope.$watch('det.auditDetail.certificateData', function(values) {
		  
		if(values)
		{
			for(var i = 0; i < values.length ; i++){
				var current_cert = values[i];
				var prev_cert = null;
				if (i < values.length && values[i].certIssueId != det.AppConstant.FULL_TERM_IHM && values[i].certIssueId != det.AppConstant.ADDITIONAL_ENDORSED_IHM ){
					for(var j = i; j < values.length ; j++){
						if(values[j].certIssueId != values[j+1].certIssueId){
							prev_cert = values[j + 1];
							break;
						}
				}
				
				}
				  var socType;
				  if(current_cert.socType=='exe')
					  socType='Exemption';
				  else
					  socType=current_cert.socType.toUpperCase()
				  
				  	current_cert.auditDate = moment(current_cert.auditDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				  
				  current_cert.socType = socType;
				  if(current_cert.certIssueId == det.AppConstant.EXTENSION_IHM ){
					  current_cert.certIssueDesc  = "EXTENDED (11.6 applies)";
				  }
				  if(current_cert.certIssueId== det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM  && current_cert.extendedExpireDate && current_cert.extendedExpireDate!='' ){
					  current_cert.certExpireDate =  moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY')
				  }
				  else if(current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && current_cert.extendedExpireDate && current_cert.extendedExpireDate!='' ){
					  current_cert.certExpireDate=  prev_cert.extendedExpireDate && prev_cert.extendedExpireDate != '' ? moment(prev_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(current_cert.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				  }
				  else{
					  current_cert.certExpireDate=   moment(current_cert.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				  }
					
				  current_cert.certIssueDate = current_cert.certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(current_cert.certIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					
				  current_cert.dateOfRegistry = moment(current_cert.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY');
					
				  /*current_cert.extendedIssueDate  =current_cert.extendedIssueDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
				  current_cert.extendedExpireDate  =current_cert.extendedExpireDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
				  current_cert.endorsedDate  =current_cert.endorsedDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ?  moment(current_cert.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';*/
				  
				  current_cert.ex11 = (current_cert.certIssueId == det.AppConstant.EXTENSION_IHM && current_cert.socType!='Exemption')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-' ;
					
				  current_cert.re117 = (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM && current_cert.socType=='EU')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'):'-';  //Changed by sudharsan for Jira-id=5351 on 1-7-2022
				  
				  current_cert.re1189 = (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && current_cert.socType=='EU')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';  //Changed by sudharsan for Jira-id=5351 on 1-7-2022
					  
			      current_cert.addEndrosed = (current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM )? moment(current_cert.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-'
				  
			}
		}
	
	
 });
   
   $scope.$watch('det.auditDetail.certificateDataHistory', function(values) {
		  
		if(values)
		{
			var s =0
			var e =0
			for(var i = 0; i < values.length ; i++){
				
				//var certLinkMax = _.max(values, function(val){  return   val.certificateLink; });
				var currentMaxCerts = [];
				var count =0
				
				var exeCert = values.filter(function(val) {
					    return val.socType == 'exe'  ||  val.socType == "EXEMPTION" || val.socType == "Exemption" ;
					});
				
				var socCert = values.filter(function(val) {
					    return val.socType != 'exe'  &&  val.socType != "EXEMPTION" && val.socType != "Exemption" ;
					});
				if(values[i].socType != "exe" && values[i].socType != "EXEMPTION"){
				var current_cert = values[i];
				var prev_cert = null;
				if (s < socCert.length && socCert[s].certIssueId != det.AppConstant.FULL_TERM_IHM && socCert[s].certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && socCert[s].certIssueId != det.AppConstant.ADDITIONAL_ENDORSED_IHM ){
					 
					for(var j = 0; j < socCert.length ; j++){
						if( j < socCert.length-1 && socCert[s].certIssueId != socCert[s - j].certIssueId){
							
							prev_cert = socCert[s - j];
							break;
						}
				}
				
				}
				
				for (var l = 0; l < socCert.length; l++) {
				    if (socCert[l].certificateLink == current_cert.certificateLink) {
				    	currentMaxCerts.push(socCert[l]);
				    }
				}
				var occurrences = currentMaxCerts.filter(function(val) {
				    return val.certIssueId === det.AppConstant.EXTENSION;
				}).length;
				
				var fulltermOccurance = currentMaxCerts.filter(function(val) {
				    return val.certIssueId === det.AppConstant.FULL_TERM_IHM;
				}).length;
				if(fulltermOccurance == 0){
					fulltermOccurance = currentMaxCerts.filter(function(val) {
					    return val.certIssueId === det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM;
					}).length;
				}
				
				  var socType;
				  if(current_cert.socType=='exe')
					  socType='Exemption';
				  else
					  socType=current_cert.socType.toUpperCase()
				  
				  	current_cert.auditDate = moment(current_cert.auditDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				  
				  current_cert.socType = socType;
				  if(current_cert.certIssueId == det.AppConstant.EXTENSION_IHM ){
					  current_cert.certIssueDesc  = "EXTENDED (11.6 applies)";
				  }
			/*		  if(current_cert.certIssueId== det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM  && current_cert.extendedExpireDate && current_cert.extendedExpireDate!='' ){
					  current_cert.certExpireDate =  moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY')
				  }
				  else if(current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && current_cert.extendedExpireDate && current_cert.extendedExpireDate!='' ){*/
					  current_cert.certExpireDate=  prev_cert && prev_cert.extendedExpireDate && prev_cert.extendedExpireDate != '' ? moment(prev_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(current_cert.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				/*  }
				  else{
					  current_cert.certExpireDate=   moment(current_cert.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
				  }*/
					
				  current_cert.certIssueDate = current_cert.certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(current_cert.certIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					
				  current_cert.dateOfRegistry = moment(current_cert.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY');
					
				  /*current_cert.extendedIssueDate  =current_cert.extendedIssueDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
				  current_cert.extendedExpireDate  =current_cert.extendedExpireDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
				  current_cert.endorsedDate  =current_cert.endorsedDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ?  moment(current_cert.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';*/
				  
				  current_cert.ex11 = (current_cert.certIssueId == det.AppConstant.EXTENSION_IHM && current_cert.socType!='Exemption')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-' ;
				 
				  current_cert.re117 = (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM && current_cert.socType=='EU')?moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';  //Changed by sudharsan for Jira-id=5351 on 1-7-2022
				  
				  current_cert.re1189 = (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'):(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && current_cert.socType=='EU')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';  //Changed by sudharsan for Jira-id=5351 on 1-7-2022
					  
			      current_cert.addEndrosed = (current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM && current_cert.socType!='Exemption')? moment(current_cert.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-'
				  
			    	  if(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED2 || current_cert.certIssueId == det.AppConstant.EXTENSION_IHM || current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM){ 	  
					      if(current_cert.certIssueId == det.AppConstant.EXTENSION_IHM ){
					    	 if( current_cert.socType == 'Exemption' ){
					    	   		 current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
					    	  	}
					    	  
					    	 	
					    	 else if( current_cert.socType == 'HK' ){
					    		 current_cert.certExpireDate = prev_cert.extendedExpireDate ? prev_cert.extendedExpireDate : prev_cert.certExpireDate;
					    	 }
					    	 else {
				    	  		 current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
				    	  	}
					    	 current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY');
					    	  }
					      
					      if((current_cert.socType == 'Exemption' || current_cert.socType == 'EU') && (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED2 || current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM)) {
					    	  if( current_cert.socType == 'EU'){
					    		  if(occurrences > 0){
					    			  var extenRecords = [];
					    			  
					    			  for (var k = 0; k < currentMaxCerts.length; k++) {
					    				    if (currentMaxCerts[k].certIssueId == det.AppConstant.EXTENSION) {
					    				    	extenRecords.push(currentMaxCerts[k]);
					    				    	
					    				    }
					    				}
					    			  
					    			  if(extenRecords.length > 0 && extenRecords[0].seqNo < current_cert.seqNo){
			    				    		current_cert.certExpireDate = extenRecords[0].extendedExpireDate ? extenRecords[0].extendedExpireDate : extenRecords[0].certExpireDate;
			    				    		current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
			    				    		console.log(current_cert.certExpireDate);
			    				    	}
					    			  else {
					    				  current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
					    				  current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
					    				  console.log(current_cert.certExpireDate);
					    					}
					    			 
					    		  }
					    		  else {
				    				  current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
				    				  current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
				    				  console.log(current_cert.certExpireDate);
				    					}
					    	  }
					    	  else {
			    				  current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
			    				  current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
			    				  console.log(current_cert.certExpireDate);
			    					}
					    	  
					      }
					}
			       s = s + 1;
				}
				else {

					var current_cert = values[i];
					var prev_cert = null;
					if (e < exeCert.length && exeCert[e].certIssueId != det.AppConstant.FULL_TERM_IHM && exeCert[e].certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && exeCert[e].certIssueId != det.AppConstant.ADDITIONAL_ENDORSED_IHM ){
						for(var j = 0; j < exeCert.length ; j++){
							if( j < exeCert.length-1 && exeCert[e].certIssueId != exeCert[e - j].certIssueId){
								
								prev_cert = exeCert[e - j];
								break;
							}
					}
					
					}
					
					for (var l = 0; l < exeCert.length; l++) {
					    if (exeCert[l].certificateLink == current_cert.certificateLink) {
					    	currentMaxCerts.push(exeCert[l]);
					    }
					}
					var occurrences = currentMaxCerts.filter(function(val) {
					    return val.certIssueId === det.AppConstant.EXTENSION;
					}).length;
					
					var fulltermOccurance = currentMaxCerts.filter(function(val) {
					    return val.certIssueId === det.AppConstant.FULL_TERM_IHM;
					}).length;
					if(fulltermOccurance == 0){
						fulltermOccurance = currentMaxCerts.filter(function(val) {
						    return val.certIssueId === det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM;
						}).length;
					}
					
					  var socType;
					  if(current_cert.socType=='exe')
						  socType='Exemption';
					  else
						  socType=current_cert.socType.toUpperCase()
					  
					  	current_cert.auditDate = moment(current_cert.auditDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					  
					  current_cert.socType = socType;
					  if(current_cert.certIssueId == det.AppConstant.EXTENSION_IHM ){
						  current_cert.certIssueDesc  = "EXTENDED (11.6 applies)";
					  }
				/*		  if(current_cert.certIssueId== det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM  && current_cert.extendedExpireDate && current_cert.extendedExpireDate!='' ){
						  current_cert.certExpireDate =  moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY')
					  }
					  else if(current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM && current_cert.extendedExpireDate && current_cert.extendedExpireDate!='' ){*/
						  current_cert.certExpireDate=  prev_cert && prev_cert.extendedExpireDate && prev_cert.extendedExpireDate != '' ? moment(prev_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(current_cert.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					/*  }
					  else{
						  current_cert.certExpireDate=   moment(current_cert.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					  }*/
						
					  current_cert.certIssueDate = current_cert.certIssueId == det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(current_cert.certIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
						
					  current_cert.dateOfRegistry = moment(current_cert.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY');
						
					  /*current_cert.extendedIssueDate  =current_cert.extendedIssueDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
						
					  current_cert.extendedExpireDate  =current_cert.extendedExpireDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
						
					  current_cert.endorsedDate  =current_cert.endorsedDate && current_cert.certIssueId != det.AppConstant.RE_ISSUE_ADMINISTRATIVE_IHM ?  moment(current_cert.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';*/
					  
					  current_cert.ex11 = (current_cert.certIssueId == det.AppConstant.EXTENSION_IHM && current_cert.socType!='Exemption')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-' ;
						
					  current_cert.re117 = (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_7_IHM && current_cert.socType=='EU')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';  //Changed by sudharsan for Jira-id=5351 on 1-7-2022
					  
					  current_cert.re1189 = (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED_11_8_11_9_IHM && current_cert.socType=='HK')? moment(current_cert.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'):'-';  //Changed by sudharsan for Jira-id=5351 on 1-7-2022
						  
				      current_cert.addEndrosed = (current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM && current_cert.socType!='Exemption')? moment(current_cert.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-'
					  
				    	  if(current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED2 || current_cert.certIssueId == det.AppConstant.EXTENSION_IHM || current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM){ 	  
						      if(current_cert.certIssueId == det.AppConstant.EXTENSION_IHM ){
						    	 if( current_cert.socType == 'Exemption' ){
						    	   		 current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
						    	  	}
						    	  
						    	 	
						    	 else if( current_cert.socType == 'HK' ){
						    		 current_cert.certExpireDate = prev_cert.extendedExpireDate ? prev_cert.extendedExpireDate : prev_cert.certExpireDate;
						    	 }
						    	 else {
					    	  		 current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
					    	  	}
						    	 current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY');
						    	  }
						      
						      if((current_cert.socType == 'Exemption' || current_cert.socType == 'EU') && (current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || current_cert.certIssueId == det.AppConstant.RENEWAL_ENDORSED2 || current_cert.certIssueId == det.AppConstant.ADDITIONAL_ENDORSED_IHM)) {
						    	  if( current_cert.socType == 'EU'){
						    		  if(occurrences > 0){
						    			  var extenRecords = [];
						    			  
						    			  for (var k = 0; k < currentMaxCerts.length; k++) {
						    				    if (currentMaxCerts[k].certIssueId == det.AppConstant.EXTENSION) {
						    				    	extenRecords.push(currentMaxCerts[k]);
						    				    	
						    				    }
						    				}
						    			  
						    			  if(extenRecords.length > 0 && extenRecords[0].seqNo < current_cert.seqNo){
				    				    		current_cert.certExpireDate = extenRecords[0].extendedExpireDate ? extenRecords[0].extendedExpireDate : extenRecords[0].certExpireDate;
				    				    		current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
				    				    		console.log(current_cert.certExpireDate);
				    				    	}
						    			  else {
						    				  current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
						    				  current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
						    				  console.log(current_cert.certExpireDate);
						    					}
						    			 
						    		  }
						    		  else {
					    				  current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
					    				  current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
					    				  console.log(current_cert.certExpireDate);
					    					}
						    	  }
						    	  else {
				    				  current_cert.certExpireDate = currentMaxCerts[0].extendedExpireDate ? currentMaxCerts[0].extendedExpireDate : currentMaxCerts[0].certExpireDate;
				    				  current_cert.certExpireDate =  dateFormater(current_cert.certExpireDate,'DD-MMM-YYYY')
				    				  console.log(current_cert.certExpireDate);
				    					}
						    	  
						      }
						}
					e = e + 1;
				}
			}
		}
	
	
});
   
   
 
   
  	det.downloadBtn =function(pfilename){
  		var review_no=$scope.det.auditDetailOrg.auditReportNo;
		var finalFileName=pfilename.split('.pdf');
    	finalFileName=finalFileName[0]+"_IRI_"+review_no+".pdf";
		auditFactory.downloadStampPdf("output",finalFileName+".pdf").$promise.then(function(response){
			_.downloadFiles(new Blob([response.data],{type:'Content-Type'}), pfilename);
			toaster.success('Downloaded Successfully!');
		});
  		
	}
  	
  	det.editStamp =function(stampTable){
  		
  		stampTable.officialId=det.auditDetailBeforeUpdate.officialId;
  		stampTable.auditDetail=det.auditDetail;
  		var review_no=stampTable[0]?stampTable[0].REVIEW_REPORT_NO:stampTable.REVIEW_REPORT_NO
		var finalFileName = stampTable.FILE_NAME.split('.pdf');
		finalFileName = finalFileName[0] + "_IRI_"
				+ review_no + ".pdf";
		
  		detailsFactoryIhm.copyStampFile(finalFileName+ ".pdf").$promise.then(function(res){
		 });
  		
  		stampTable.message="Upload Seal or Signature on Existing Attachment";
  		console.log(stampTable)
  		ModalService.showModal({
			  templateUrl : 'src/modals/pdfsign.html',
			  controller  : 'PdfsignController as pdfsign',
			  inputs : {
			
		               scope : stampTable
			 }
			}).then(function(modal){
				
				modal.element.modal();
				
				modal.close.then(function(result){
					
					
				});
			});
	}
	 
	 
	 det.deleteStamp = function(filename){ 
			 
		
		 var review_no=$scope.det.auditDetailOrg.auditReportNo;
			ModalService.showModal({

				templateUrl : 'src/modals/deleteAttachment.html',

				controller  : 'removeReportController',

				inputs		: {data:'Attached PDF'},

			}).then(function(modal) {

				modal.element.modal();

				modal.close.then(function(result) {
					if(result=='YES'){
						if(det.auditTypeId==det.AppConstant.IHM_TYPE_ID){
							 var actualfilename=filename.split(".pdf");
							 actualfilename=actualfilename[0]+"_IRI_"+review_no+".pdf";
								 detailsFactoryIhm.deleteStamp("perDelete",actualfilename,det.USER_ID).$promise.then(function(res){
									 refreshDET();
								 });
							 
						 }
					}
				});

			});

		}
	 
	 
	 
	 det.emailFile = function(stampDetailsData){ 

			ModalService.showModal({

				templateUrl : 'src/modals/sendEmailPopUp.html',

				controller  : 'sendEmailController as ef',

				inputs		: {data:stampDetailsData},

			}).then(function(modal) {

				modal.element.modal();

				modal.close.then(function(result) {
					
				});

			});

		}
	 
	 
	 
	 
	   
   function doBlur(event){
	    event.target.blur();
	}
   
   function certficateDetils(caller){
	   var flag = true;
	
	    if(!det.auditDetail.auditPlace){
			toaster.warning('Please Enter the '+det.auditType+' Place');
		}else if(det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY){
			toaster.warning('Sorry, certificate can’t be generated, since the '+det.auditType+' Summary is marked as ‘Not Approved’');
		}else{
			
			det.auditDetail.grt = det.vesselDetail.grt?Number(det.vesselDetail.grt):'';
			det.auditDetail.auditlockStatus =  det.enabled;
			var data={auditDetail: det.auditDetail,vesselCompanyDtl:det.vesselCompanyDtl,vesselDetail:det.vesselDetail,minAuditDate:det.auditMinDate,maxAuditDate:det.auditMaxDate,nxtAuditCreate:det.nextAdtCreated,previousAudit:det.previousAudit,directAdditionalByintermeadite:det.dirInterAndAdditionalAudit , addSurvDueDateChanged:det.addSurvDueDateChanged};
             var flag = false;
			if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0){
			
			  if(det.auditDetail.grt && det.auditDetailOrg.grt && det.auditDetailOrg.grt != det.auditDetail.grt){
				  toaster.warning('GRT value has been changed, please save the Audit details');
                }else if(det.auditDetail.closeMeetingDate && det.auditDetailOrg.closeMeetingDate && moment(det.auditDetailOrg.closeMeetingDate,YYYYMMDD).format(YYYYMMDD) != moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD)){
				  toaster.warning('Closing Meeting Date value has been changed, please save the Audit details');
                }else if(det.auditDetail.auditPlace && det.auditDetailOrg.auditPlace && decodeURIComponent(atob(det.auditDetailOrg.auditPlace))!= det.auditDetail.auditPlace){
				  toaster.warning('Audit place  has been changed, please save the Audit details');
                } else if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditSummaryId && det.auditDetailOrg.auditSummaryId && det.auditDetailOrg.auditSummaryId != det.auditDetail.auditSummaryId){
				  toaster.warning('Review  Summmary  has been changed, please save the Audit details');
                } else if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID && det.auditDetail.auditStatusId && det.auditDetailOrg.auditStatusId && det.auditDetailOrg.auditStatusId != det.auditDetail.auditStatusId){
				  toaster.warning('Review  Status  has been changed, please save the Audit details');
                }else if(((det.auditDetail.auditSubTypeId ==det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId ==det.AppConstant.RENEWAL_SUB_TYPE_ID) && det.auditDetail.certIssueId==det.AppConstant.FULL_TERM_CERT) && det.auditDetail.creditDate && det.auditDetailOrg.creditDate && moment(det.auditDetailOrg.creditDate,YYYYMMDD).format(YYYYMMDD) != moment(det.auditDetail.creditDate,DDMMMYYYY).format(YYYYMMDD)){
                	toaster.warning('Credit  Date  has been changed, please save the Audit details');
                }else{
			        flag = true;
			    }
			  
			}else { flag = true;}
			
			if(flag){
				
					 if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
						 data.auditDetail.certificateNo =  "Amendment-IHM";
	                    }else{
	                     data.auditDetail.certificateNo =  "Initial-IHM";
	                    }
				
					  if((data.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || data.auditDetail.auditSubTypeId ==det.AppConstant.ADDITIONAL_SUB_TYPE_ID) && data.directAdditionalByintermeadite && (data.auditDetail.certIssueId==1004 || data.auditDetail.certIssueId==1005  )){
						 certificateFactory.UpdateDirectIntermediateIssueExpiryDate(data.auditDetail.auditTypeId,data.auditDetail.auditSeqNo,data.auditDetail.companyId,data.auditDetail.certExpireDate,data.auditDetail.certIssueDate,data.auditDetail.certIssueId,data.auditDetail.vesselImoNo)
						  .$promise.then(function(res){
							if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail[0]){
							    det.auditDetail.certificateDetail[0].certExpireDate=moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD);
							    det.auditDetail.certificateDetail[0].certIssueDate=moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD);
							 }
							
							if(caller != 'exe'){
								data.auditDetail.certificateData = data.auditDetail.certificateData.filter(function(val) {
								    return val.socType != 'exe' || val.socType != 'Exemption' ;
								});
								if( data.auditDetail.certificateDetail){ data.auditDetail.certificateDetail = data.auditDetail.certificateDetail.filter(function(val) {
								    return val.socType != 'exe' || val.socType != 'Exemption' ;
								});
								}
							}
							else{
								data.auditDetail.certificateData = data.auditDetail.certificateData.filter(function(val) {
								    return val.socType == 'exe' || val.socType == 'Exemption' ;
								});
								if( data.auditDetail.certificateDetail){ data.auditDetail.certificateDetail = data.auditDetail.certificateDetail.filter(function(val) {
								    return val.socType == 'exe' || val.socType == 'Exemption' ;
								});
								}
							}
							auditFactory.saveCertificateDetails(data);
							sessionStorage.setItem('certificateSeachType','Audit');
							sessionStorage.setItem('certificateSeachTypes','Audit' );
							sessionStorage.setItem('certificateType',caller );
							if(caller != 'exe'){
								
							$state.go('app.certificate.detailsihm',{'certificate':'Audit'},{ reload: true });
							}else {
								
								
								$state.go('app.certificate.detailsihmExe',{'certificate':'Audit'},{ reload: true });
							}
						});
					 }else{
						 
						 if(caller != 'exe'){
								data.auditDetail.certificateData = data.auditDetail.certificateData.filter(function(val) {
								    return val.socType != 'exe' || val.socType != 'Exemption' ;
								});
								if( data.auditDetail.certificateDetail){ data.auditDetail.certificateDetail = data.auditDetail.certificateDetail.filter(function(val) {
								    return val.socType != 'exe' || val.socType != 'Exemption' ;
								});
								}
							}
							else{
								data.auditDetail.certificateData = data.auditDetail.certificateData.filter(function(val) {
								    return val.socType == 'exe' || val.socType == 'Exemption' ;
								});
								if( data.auditDetail.certificateDetail){ data.auditDetail.certificateDetail = data.auditDetail.certificateDetail.filter(function(val) {
								    return val.socType == 'exe' || val.socType == 'Exemption' ;
								});
								}
							
							}
						 
						
							auditFactory.saveCertificateDetails(data);
						 	sessionStorage.setItem('certificateSeachType','Audit');
						 	sessionStorage.setItem('certificateSeachTypes','Audit' );
						 	sessionStorage.setItem('certificateType',caller );
						 	if(caller != 'exe'){
								$state.go('app.certificate.detailsihm',{'certificate':'Audit'},{ reload: true });
							}else {
								$state.go('app.certificate.detailsihmExe',{'certificate':'Audit'},{ reload: true });
								} 
					 }
			}
		}
	   
	   
	   
	   if(!det.auditDetail.openMeetingDate){
			$('#openmeet').addClass('err');
		}
	   if(!det.auditDetail.closeMeetingDate){
    		
 			$('#closemeet').addClass('err');
 		}
	   
	   
	   if(!det.auditDetail.auditPlace){
		   
		   $('#auditplace').addClass('err');
	   }
	}
	
    function onChangeCertIssue(){
  	  
 	   if (det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED2){
 		   
 		   var extensionIssueDate='',extensionexpiryDate='',certificateNo;
 		 
 		   det.fulltermCertificateNo = det.auditDetail.certificateNo;
 		   
 		   
 		   det.auditDetail.certificateNo = det.previousAudit.certificateNo ? det.previousAudit.certificateNo : !(det.auditDetail.auditSeqNo && det.auditDetail.certificateNo && det.auditDetail.auditReportNo) ? det.getNewCertificate() : det.auditDetail.certificateNo;   
 		  if(det.prevInitialOrRenewal && det.prevInitialOrRenewal.certificateDetail && det.prevInitialOrRenewal.certificateDetail.length>0){
 	    		 
         		var seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){  return   find.seqNo; });
         	      extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
         		  extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
         		  certificateNo =  _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
         		 
         		  extensionIssueDate = extensionIssueDate ? extensionIssueDate : det.prevInitialOrRenewal.certificateDetail[0].certIssueDate;
         		  extensionexpiryDate = extensionexpiryDate ? extensionexpiryDate : det.prevInitialOrRenewal.certificateDetail[0].certExpireDate;
         		  certificateNo = certificateNo ? certificateNo : det.prevInitialOrRenewal.certificateDetail[0].certificateNo;
 			}else if(det.previousAudit && (det.previousAudit.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ||  det.previousAudit.auditSubTypeId== det.AppConstant.ADDITIONAL_SUB_TYPE_ID) && det.previousAudit.certificateDetail.length > 0){
 				
 				var seqNo =	_.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; });
       	        extensionIssueDate = _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
       		    extensionexpiryDate = _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
       		    certificateNo =  _(det.previousAudit.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
       		 
       		    extensionIssueDate = extensionIssueDate ? extensionIssueDate : det.previousAudit.certificateDetail[0].certIssueDate;
       		    extensionexpiryDate = extensionexpiryDate ? extensionexpiryDate : det.previousAudit.certificateDetail[0].certExpireDate;
       		    certificateNo = certificateNo ? certificateNo : det.previousAudit.certificateDetail[0].certificateNo;
 			}
 		  
 		  
 		 if(det.prevRenewal && det.prevRenewal.certificateDetail && det.prevRenewal.certificateDetail.length>0){
	    	var seqNo =	_.max(det.prevRenewal.certificateDetail, function(find){  return   find.seqNo; });
      	      extensionIssueDate = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
      		  extensionexpiryDate = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
      	      certificateNo = _(det.prevRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
      		 
      	      extensionIssueDate = extensionIssueDate ? extensionIssueDate : det.prevRenewal.certificateDetail[0].certIssueDate;
      		  extensionexpiryDate = extensionexpiryDate ? extensionexpiryDate : det.prevRenewal.certificateDetail[0].certExpireDate;
      		  certificateNo = certificateNo ? certificateNo :  det.prevRenewal.certificateDetail[0].certificateNo;
 		 }
 		 
 		   det.auditDetail.certificateNo = certificateNo ? certificateNo : !(det.auditDetail.auditSeqNo && det.auditDetail.certificateNo && det.auditDetail.auditReportNo) ? det.getNewCertificate() : det.auditDetail.certificateNo;
 		   //det.auditDetail.certIssueDate = extensionIssueDate ? moment(extensionIssueDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certIssueDate;
 		   
 		   det.auditDetail.certExpireDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
 		   
 		   det.maxCloseMeetingDate = det.auditDetail.certExpireDate ? det.auditDetail.certExpireDate : det.maxCloseMeetingDate;
 		   det.maxOpenMeetingDate = det.maxCloseMeetingDate;
 		   
 	   }else{
 		   
 		   det.auditDetail.certificateNo = det.fulltermCertificateNo;
 		   det.auditDetail.certIssueDate='';
 		   det.auditDetail.certExpireDate='';
 		   
 		   det.maxOpenMeetingDate = '';
		   det.maxCloseMeetingDate = '';
		   
 		   det.setAuditDate();
 	   }
 	   
 	  if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
 	  		var previousVesselCheck = det.previousAudit ? det.previousAudit.certificateIhmDetail ? det.previousAudit.certificateIhmDetail[0] : '' : '';
 	  		console.log(previousVesselCheck)
 	  		
 	  		
 	  		 if(previousVesselCheck){
 	  			if(certData.socType == 'eu' || certData.socType == 'hk')
					certData.socName = 'HK/EU'
				
				if(certData.socType == 'exe')
					certData.socName = 'EXEMPTION'
 	  			checkCertificateVesselDeatils(previousVesselCheck,'dropDown');
 	  		 }
 	  }
    }
    
    function delegateSign(index,roleId,val){
      if(val=='Attach'){
         det.auditDetail.auditAuditorDetail[index].delegateSign = 1; 
         det.saveAuditData('Data Saved Successfully');
		     
       }else if(val=='Revert'){
     	 det.auditDetail.auditAuditorDetail[index].delegateSign = 0; 
     	det.saveAuditData('Data Saved Successfully');
       }
   }
   
   function approvalLetterValidation(){ 
 
		var openMeetingDate = '', closeMeetingDate = '';
		
		openMeetingDate = det.auditDetail.openMeetingDate ? moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
		closeMeetingDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
		
		var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
		
		var selectedSummary = _.filter(det.auditSummary, function(obj){ 
			return obj.sumary ;
        	});
		
		var flag = true;		
		
		if(!det.auditDetailDataValidation()){
    		
			flag = false;
			
    	}else if(!det.auditDetail.openMeetingDate){							//added by @Ramya on 21-06-2022 for jira id - IRI-5334
			
			flag = false;
			
			toaster.warning('Please Enter the '+det.openMettingDate);
			
		}else if(!det.auditDetail.certIssueDate && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID){
			
			flag = false;
            var msg=(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Initial':'';
			toaster.warning('Please Enter '+msg+' Issue Date');
		}else if(!det.auditDetail.sspReviewDetail[0].sspRevisionNo){
			flag=false;
			toaster.warning('Please Enter Revision No');
		}
		else if(!det.auditDetail.auditPlace){
			flag=false;
			toaster.warning('Please Enter Review Place');
		}
		if( det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY && det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID){
			flag=false;
			toaster.warning('Please select the '+det.auditType+' Summary as ‘Approved’');
		}
		if( !det.auditDetail.auditSummaryId && det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID){
			flag=false;
			toaster.warning('Please select the '+det.auditType+' Summary');
		} 
		
		
	return flag;
		
	}
    
    
  
   /*filter dmlc & isps report numbers*/
    function getDMLCReportNos(val){
		
    	var tempArray = [];
		var tempArray2 = det.dMLCReportNos;
		
		console.log(tempArray2);
		if(val=='*'){
			
			tempArray = tempArray2;
		}else{
			
			try{  
				
				var test = val;
				
				if(test.replace(/[^*]/g, '').length>1){
					throw 'not';
				}else if(val.indexOf('*')>0){
					if(val.indexOf('*')!=val.length-1){
						throw 'not';
					}
					val = val.substring(0,val.indexOf('*'));
				}
			  
				tempArray = _.filter(tempArray2, function(a){
   									return a.auditReportNo.indexOf(val)>-1;
   	        				});
				
			}catch(err){
				
			  tempArray = [];
			}
	  }
		return tempArray;
	}
    
    function setSspDmlcAuditSeqNo(obj){
    
    	if(det.auditDetail.sspReviewDetail.length>0){
    		
    		det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo = obj.auditSeqNo;
    		det.auditDetail.sspReviewDetail[0].sspLeadName = obj.leadAuditorName;
    		det.auditDetail.sspReviewDetail[0].sspRevisionNo=obj.sspRevisionNo;
    		det.auditDetail.sspReviewDetail[0].dmlcIssuedDate=obj.dmlcIssuedDate;
    		det.auditDetail.sspReviewDetail[0].dmlcAuditPlace=obj.dmlcAuditPlace;
    			
    		if(!det.auditCreate){
        		detailsFactoryIhm.getFindingData(det.AppConstant.DMLC_TYPE_ID,obj.auditSeqNo,det.companyId).$promise.then(function(data){
        			det.dmlcFindingAray = angular.copy(data);
        		});
        	}
    	}
    	det.dmlcReportNorIs=false;
    }
    
    function onChangeLinkedReportNumber(obj){
    
    	if(det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo){
    		det.auditDetail.sspReviewDetail[0].sspLeadName=''
    		det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo='';
    		det.auditDetail.sspReviewDetail[0].sspRevisionNo='';
    	} 
     }
     
    det.onSelectDmlcReportNor = function(obj){ 
    	if(obj){
        	det.dMLCReportNos.forEach(function(i){
        		
        		console.log(i.auditReportNo); console.log(obj);
        		if(i.auditReportNo!=obj){
        			det.dmlcReportNorIs= true;console.log(5);
        		}else if(Number(i.auditReportNo)==obj){
        			det.dmlcReportNorIs= false;
        		}
        	});
        	}else if(!obj){
        		det.dmlcReportNorIs= true; 
        	}else {
        		det.dmlcReportNorIs= false; 
        	}
    }
    
    function checkScopeFun(scopeId){
    	
					if(scopeId == 1001){
						det.checkScopeFunval.certificateNo=det.auditDetail.certificateNo
						det.checkScopeFunval.certificatIssueId=det.auditDetail.certIssueId;
						det.checkScopeFunval.certIssueDate=det.auditDetail.certIssueDate;
						det.checkScopeFunval.certExpireDate=det.auditDetail.certExpireDate;
						det.auditDetail.certificateNo='';
						det.auditDetail.certIssueId='';
						det.auditDetail.certIssueDate='';
						det.auditDetail.certExpireDate='';
					}else{
						det.auditDetail.certificateNo=det.checkScopeFunval.certificateNo;
						det.auditDetail.certIssueId=det.checkScopeFunval.certificatIssueId;
						//det.auditDetail.certIssueDate=det.checkScopeFunval.certIssueDate;
						det.auditDetail.certExpireDate=det.checkScopeFunval.certExpireDate;
					}
		
    }
    
     function setNextAuditData(){
    	 
    	if(det.nextAdtCreated && det.nextAuditDetails && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID && (det.nextAuditDetails.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.nextAuditDetails.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID )   && det.nextAuditDetails.certIssueId == det.AppConstant.RE_ISSUE){
		console.log(det.nextAuditDetails);
		
		var seqNo =	(det.nextAuditDetails.certificateDetail && det.nextAuditDetails.certificateDetail.length >0 ) ?  _.max(det.nextAuditDetails.certificateDetail, function(find){  return   find.seqNo; }) : '';
 	    var  certIssueId = (det.nextAuditDetails.certificateDetail.length >0) ?  _(det.nextAuditDetails.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueId').toString() :'';
 	    var  certificateNo =(det.nextAuditDetails.certificateDetail.length >0) ?  _(det.nextAuditDetails.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString() : '';
 	    var  audSubTypeDesc =(det.nextAuditDetails.certificateDetail.length >0) ?  _(det.nextAuditDetails.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('audSubTypeDesc').toString() : '';
 	    
 	        det.nextAuditDetails.audSubTypeDesc =  audSubTypeDesc ? audSubTypeDesc : det.nextAuditDetails.audSubTypeDesc;     
			det.auditDetail.certIssueId = certIssueId ?Number( certIssueId ) :  det.nextAuditDetails.certIssueId;
			det.auditDetail.certificateNo = certificateNo ? certificateNo : det.nextAuditDetails.certificateNo; 
			var msg = '';
			toaster.warning('Certificate details have been changed due to    Re-issuing of follow-up '+det.nextAuditDetails.audSubTypeDesc+' '+msg+'');
		}
    }
     
     
     function validateVessel(){
    	 
        	var vssel = det.vesselDetail;
        	var vselCo = vssel.vesselCompany;
        	
        	
        	var flag = false;  
        	
        	if(!det.vesselDetail.vesselImoNo){
    			
    		  det.vesselImoNo.vesselImoNo = '';
    		   
    		}else if(!vssel.vesselName || !vssel.activeStatus || !vssel.officialNo || !vssel.grt || !vssel.companyImoNo || !vssel.portOfRegistry){
    			flag = true;
    		}else if(!vssel.vesselType){
    			flag = true;
    		}else if( !vselCo.vesselCompanyAddress || !vselCo.vesselCompanyName){
    			flag = true;
    		}
        	
    		
    		if(flag){ 
    			
    		det.partialData = true;	
    		
    		var vData = {
					'companyId':det.companyId,
					
					'userId':det.loginUserId,
					
					'vesselImoNo':det.vesselDetail.vesselImoNo,
					
					'vesselId':det.vesselDetail.vesselId,
					
					'auditTypeId': det.auditTypeId?det.auditTypeId:'',
					'status':0};
    			
    			detailsFactoryIhm.vesselDtlIncomplete(det.loginUserId, det.vesselDetail.vesselImoNo, det.vesselDetail.vesselId,det.companyId,vData).$promise.then(function(res) {
    				det.AuditDetailForm.$dirty=false;
    				if(res.partialData.length>0 && res.partialData){
    					
    				det.dueDateAlreadyCaptured = 	res.partialData[0].dueDate ? true : false;
    				
    				}
    			
    				if(det.reasonForVoidShow){
    					
    				det.reasonForVoidShow=false;	
    				
    				det.reasonForVoidReopen('halt');
    				
    				toaster.warning('Partial Vessel Details, please provide a Due Date');
    				}
    			});
    			
    			//det.reasonForVoidReopen('halt');
    			//toaster.warning('Partial Vessel Details, please provide a Due Date');
    			
    			det.partialMissingData='';
    			
    			det.partialCount = 0;
    			
    			if(!vssel.vesselName){
   				 det.partialMissingData = ',Vessel Name  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				 if(!det.vesselDetail.vesselName){
					$('#vesselname').addClass('err');}
    			} 
   			 
    			/*if(!vssel.docTypeNumber){
   				 det.partialMissingData = det.partialMissingData +''+' ,DOC Type Number ';
   				 det.partialMissingStatus = true;
   				det.partialCount++; 
   				if(!det.vesselCompanyDtl.docType){
   					$('#doctype').addClass('err');} 
   				}*/
   			 
    			if(!vssel.activeStatus){
   				 det.partialMissingData = det.partialMissingData +''+' ,Active Status ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; }
   			 
   			
    			if(!vssel.officialNo){
   				 det.partialMissingData = det.partialMissingData +''+' ,Official Number  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				if(!det.vesselDetail.officialNo){
   					$('#officialnumber').addClass('err');}  
    			}
   			 
   			 
    			if(!vssel.grt){
   				 det.partialMissingData = det.partialMissingData +''+' ,GRT value ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++;
   				    if(!det.vesselDetail.grt){
   					$('#grt').addClass('err');} 
   				}
   			 
   			
    			if(!vssel.companyImoNo){
   				 det.partialMissingData = det.partialMissingData +''+' ,Company Imo Number ';
   				 det.partialMissingStatus = true;
   			   	 det.partialCount++; 
   			   	    if(!det.vesselCompanyDtl.companyImoNo){
    			    $('#companyimo').addClass('err');} 
   			   	 }
   			 
   			
    			if(!vssel.portOfRegistry){
   				 det.partialMissingData = det.partialMissingData +''+' ,Port Of Registry  ';
   				 det.partialMissingStatus = true;
   			    	det.partialCount++; }
    		
    			/*if(!vssel.dateOfRegistry){
   				 det.partialMissingData = det.partialMissingData +''+' ,Date Of Registry  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				   
   				 if(!det.vesselDetail.dateOfRegistry){
   					$('#dateOfReg').addClass('err');}
    			}*/
   			 
    			if(!vssel.vesselType){
   				 det.partialMissingData = det.partialMissingData +''+' ,Vessel Type ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				if(!det.vesselDetail.vesselTypeName){
   					$('#vesseltype').addClass('err');} 
    			}
   			
    			if(!vssel.vesselId){
   				 det.partialMissingData = det.partialMissingData +''+' ,Vessel Id  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; }
    			
    			/* if(!vselCo.docTypeNo){
   				 det.partialMissingData = det.partialMissingData +''+' , Company DOC Type Number  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; }
   			 
   			    if(!vselCo.docIssuer){
   				 det.partialMissingData = det.partialMissingData +''+' ,DOC Issuer  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				 if(!det.vesselCompanyDtl.docIssuer){
     			    $('#docissue').addClass('err');}
   				 }*/
   			
   			    /*if(!vselCo.docExpiry){
   				 det.partialMissingData = det.partialMissingData +''+' ,DOC Expiry  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++;
   				   if(!det.vesselCompanyDtl.docExpiry){
      			    $('#docexpiry').addClass('err');}
   				 }*/
   			
   			    if(!vselCo.vesselCompanyName){
   				 det.partialMissingData = det.partialMissingData +''+' ,Vessel Company Name  ';
   				 det.partialMissingStatus = true; det.partialCount++; }
   				 
   				  if(!vselCo.vesselCompanyAddress){
   				  det.partialMissingData = det.partialMissingData +''+' ,Vessel Comapny Address ';
   				  det.partialMissingStatus = true; det.partialCount++; 
   				  
   				if(!det.vesselCompanyDtl.companyAddress){
   					$('#companyaddress').addClass('err');} 
   				}
   				  
   				  if(det.CompanyImoMissingRmi){
   					  
   					 det.partialMissingData = ' , Comapny IMO Number and Comapny Details';
      				  det.partialMissingStatus = true; det.partialCount++; 
      				if(!det.vesselCompanyDtl.docType){
       					$('#doctype').addClass('err');} 
   				  }
    			
    		
    		}  
    		
    		return flag;
    	}
     
     
     
     det.removeClass = function(){ 
    	 
    	 $('#companyimo').removeClass('err');
    	 $('#companyaddress').removeClass('err');
    	 $('#doctype').removeClass('err');
    	 $('#docexpiry').removeClass('err');
    	 $('#docissue').removeClass('err');
    	 $('#vesseltype').removeClass('err');
    	 $('#dateOfReg').removeClass('err');
    	 $('#grt').removeClass('err');
    	 $('#officialnumber').removeClass('err');
    	 $('#doctype').removeClass('err');
    	 $('#vesselname').removeClass('err');
     }
     
     det.auditDateChange = function(date){
    	 det.auditDateChanged = true;
    	 if(det.auditDetail.sspReviewDetail ){
    	    det.auditDetail.sspReviewDetail[0].ltrStatus=0;
    	 }
    	 
    	/* if(det.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditTypeId!= det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId!=det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && det.auditDetail.auditSubTypeId!=det.AppConstant.ADDITIONAL_SUB_TYPE_ID )){
    	 if(date){
    		 
    		 det.auditDetail.creditDate = moment(date,MMMDDYYYY).format(MMMDDYYYY);
    		 if( det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID && det.auditDetail.creditDate && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0)){
    			 det.auditDetail.certIssueDate = det.auditDetail.creditDate;
    			 det.auditDetail.certExpireDate = moment(det.auditDetail.creditDate,MMMDDYYYY).add(6,'months').subtract(1,'days').format(MMMDDYYYY);
    		 }else if( det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID && det.auditDetail.creditDate && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0)){
    			 det.auditDetail.certIssueDate = det.auditDetail.creditDate;
    			 det.auditDetail.certExpireDate = moment(det.auditDetail.creditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    		
    		 }
    	 }else {  det.auditDetail.creditDate='';
    	 
    	 }
    	}*/
    	 
     }
     
     
     function creditDateChange(val){ 
     	
         if(det.auditCreateUpdate == det.AppConstant.CREATE && val!='creditDateChangeVal'){
           	  det.auditDetail.creditDateFromCyle='';
           	 // det.auditDetail.creditDate='';
         }
         if(det.auditCreate && det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID && det.auditDetail.creditDate ){
        	 det.auditDetail.certIssueDate  = det.auditDetail.creditDate ? moment(det.auditDetail.creditDate,MMMDDYYYY).format(MMMDDYYYY):det.auditDetail.creditDate;
             det.auditDetail.certExpireDate =  det.auditDetail.creditDate ? moment(det.auditDetail.creditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):det.auditDetail.certExpireDate;
              
         }
         	 
          if(val=='getCreditDate' && det.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditTypeId!= det.AppConstant.DMLC_TYPE_ID){
         
          var auditSeqNo =( det.auditCreateUpdate == det.AppConstant.CREATE  )?0:det.auditDetail.auditSeqNo;
         
         
         	
          auditCycleFactory.getAuditCreditDate(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId,auditSeqNo,det.auditDetail.auditSubTypeId).$promise.then(function(res) {
         
         	
         	 
         	 console.log(res);
         det.auditCycleData = angular.copy(res); 
         if(res && res.roleId && (det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT) ) && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length==0)){
         	   det.auditDetail.certIssueDate  = det.auditCycleData.creditDate ? moment(det.auditCycleData.creditDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certIssueDate;
                det.auditDetail.certExpireDate =  (det.auditCycleData.creditDate && det.auditCycleData.nextRenewal ) ? moment(det.auditCycleData.nextRenewal,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certExpireDate;
                console.log(res);
     	}
         
      det.auditCycleRoleId = res.roleId; 
       
      if(det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID){
             det.auditDetail.creditDate=(!det.auditCreate && det.auditDetail.creditDate ) ?det.auditDetail.creditDate:(res.creditDate) ?moment(res.creditDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.creditDate;
    	     det.auditDetail.creditDateFromCyle = res.creditDate?moment(res.creditDate,YYYYMMDD).subtract(6,'months').format(MMMDDYYYY):'';
     
      }
           else if(det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID){
         	  det.auditDetail.creditDate=(!det.auditCreate && det.auditDetail.creditDate ) ?det.auditDetail.creditDate:(res.creditDate) ?moment(res.creditDate,YYYYMMDD).format(MMMDDYYYY):'';
               det.auditDetail.creditDateFromCyle = res.creditDate?moment(res.creditDate,YYYYMMDD).format(MMMDDYYYY):'';
          
           }else if(det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){ 
         	   det.auditDetail.creditDate=(!det.auditCreate && det.auditDetail.creditDate ) ?det.auditDetail.creditDate:(res.nextIntermediateStart)?moment(res.nextIntermediateStart,YYYYMMDD).format(MMMDDYYYY):'';
                   det.auditDetail.creditDateFromCyle = res.nextIntermediateStart?moment(res.nextIntermediateStart,YYYYMMDD).format(MMMDDYYYY):'';
          
            }else if(det.auditDetail.auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID){
            	det.auditDetail.creditDate=(!det.auditCreate && det.auditDetail.creditDate ) ?det.auditDetail.creditDate :  (res.nextRenewalStart) ?moment(res.nextRenewalStart,YYYYMMDD).format(MMMDDYYYY):'';
                det.auditDetail.creditDateFromCyle = res.nextRenewalStart?moment(res.nextRenewalStart,YYYYMMDD).format(MMMDDYYYY):'';
                
            }
          
           det.auditCycleManagerOrAdmin = (res.roleId==det.AppConstant.MANAGER_ROLE_ID ) ? 'Manager' : 'Admin' ;
          
           if(res.creditDate &&   res.roleId!=det.AppConstant.AUDITOR_ROLE_ID && (det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID ) && det.auditCreateUpdate == det.AppConstant.CREATE) {
             
             
         	toaster.warning('For this vessel, Audit Cycle has  already been created by the '+det.auditCycleManagerOrAdmin+' for the Lead '+ det.auditorType+'  '+res.leadNameFromAuditCycle);
         	angular.element(document.getElementById('header_notification_bar cycle')).addClass('open');
         	$timeout(function(){
         		
             		angular.element(document.getElementById('header_notification_bar cycle')).removeClass('open');
             },3000);
           }
           if(!res.nextRenewal && res.creditDate && res.nextIntermediateStart && det.auditCreateUpdate == det.AppConstant.CREATE && det.auditDetail.auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID){
            	 
         	  toaster.warning('For this vessel, Audit Cycle`s Renewal  has  been skipped by the '+det.auditCycleManagerOrAdmin );  
             
           }else if(!res.creditDate && res.nextIntermediateStart && det.auditCreateUpdate == det.AppConstant.CREATE  && det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID){ 
            	
             	 toaster.warning('For this vessel, Audit Cycle`s Initial  has  been skipped by the '+det.auditCycleManagerOrAdmin );  
           
            }else if(!res.nextIntermediateStart && res.creditDate && det.auditCreateUpdate == det.AppConstant.CREATE && det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && res.nextRenewal){ 
            	
             	 toaster.warning('For this vessel, Audit Cycle`s Intermediate  has  been skipped by the '+det.auditCycleManagerOrAdmin );  
            }
           
           /*if(det.auditCreateUpdate == det.AppConstant.CREATE && det.auditDetail.auditSubTypeId != det.AppConstant.INITIAL_SUB_TYPE_ID){
         	  det.auditDetail.creditDateFromCyle='';
         	  det.auditDetail.creditDate='';
           }*/
         	res.auditSubTypeIdForcyle=true; console.log(det.cycleAllData);
         	res.currentauditSubTypeId = det.auditDetail.auditSubTypeId;
         	
         	
         	
         	/* auditCycleFactory.getAllCycleDate(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(cycleAllData) {
        	      console.log(cycleAllData);  
        	      det.cycleAllData = angular.copy(cycleAllData);
        	      det.setRenewalCycleData(det.auditDetail.auditSubTypeId);
          	    console.log(det.auditDetail); 
          	    det.currentAuditCycleData= det.auditDetail ? det.auditDetail : ''; 
          		console.log(det.currentAuditCycleData);
        	     $rootScope.$broadcast('setAuditCycle',cycleAllData,res,det.currentAuditCycleData,'AuditOrInspection');
        	      
        	 });*/
         	 
         
         	
         	 if(det.auditDetail.auditTypeId==det.AppConstant.IHM_TYPE_ID && det.auditCreate){
             setAuditSummary(0)
             }
         	//$rootScope.$broadcast('setAuditCycle',res );
             });
         	}
         	
         	if(det.auditDetail.creditDate!=det.auditDetail.creditDateFromCyle && det.auditDetail.creditDateFromCyle && det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID && val=='creditDateChangeVal' && det.auditCycleRoleId!=det.AppConstant.AUDITOR_ROLE_ID ){
            	toaster.warning(det.auditCycleManagerOrAdmin +' Entered Credit Date Is '+moment(det.auditDetail.creditDateFromCyle,MMMDDYYYY).format(MMMDDYYYY));
            	}
         	
         }
     
     
     
 det.setRenewalCycleData = function(auditSubTypeId){
    
 }
     
     
    
     function validateAttchedStampOrNot(){
    	 var flagStamp = true;
         if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID){
        	if(det.stampDataDetails && det.stampDataDetails.length ==0){
        		flagStamp=false;
        	} 
         }
         return flagStamp;
     }
     
     function approvalDocChange(){
    	  
    	 if( det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==0 ){
    		 det.approvaDoc = false;
    		 toaster.warning("Approval letter not generated.");
    	 }else if(det.approvalLetterValidation()){
				if(det.validateAttchedStampOrNot()){
				  if(det.auditDetailDataValidation()){
				  }
				}else{
					det.approvaDoc = false;
					toaster.warning("Please attach the stamp for the review.");
				 }
 		  }
     }
     
     function reviewDocFrChange(){
    	 if(!det.leadSign){
    		 det.reviewDocFr = false;
    		 toaster.warning("Reviewer sign not attached.");
    	 }
     }
      //changed by sudharsan for jira-ID = IRI-5566 Starthere
     function ihmCertDocHkEuChange(){
    	   var disablehkeu =false;
		   console.log(det)
	        for(var i=0;i<det.auditDetail.certificateData.length;i++){
	       		if(det.auditDetail.certificateData[i].socType == 'HK' &&  det.auditDetail.certificateData[i].activeStatus == 1 ){
	       			det.ihmCertDocHkDisable = true;
					disablehkeu=true;
	        		break;
	       		 }
				if(det.auditDetail.certificateData[i].socType == 'EU' &&  det.auditDetail.certificateData[i].activeStatus == 1 ){
					det.ihmCertDocEuDisable = true;
					disablehkeu=true;
					break;
				}
	       	 }  
    	  
	      	if(disablehkeu || det.userRoleId == AppConstant.AUDITOR_ROLE_ID){
	    		det.certficateDetils('hkeu');
	       	}  
		    else{
				
				det.ihmCertDocHk = false;
			  	det.ihmCertDocEu = !det.ihmCertDocEuDisable?false:true;
	       		toaster.warning("HK/EU Certificate is not generated");
			}
      }
     //changed by sudharsan for jira-ID = IRI-5566End here

    //  function ihmCertDocEuChange(){
    //     for(var i=0;i<det.auditDetail.certificateData.length;i++){
    //    		 if(det.auditDetail.certificateData[i].socType == 'EU' &&  det.auditDetail.certificateData[i].activeStatus == 1 ){
    //    			 det.ihmCertDocEuDisable = true;
    //     		 	 break;
    //    		 }
    //    	 }  
    //   if(!det.ihmCertDocEuDisable){
    // 	  det.ihmCertDocEu = false;
    // 	  toaster.warning("Certificate EU is Inactive or Not generated");
    //    	 }  
    //  }
     
     function ihmCertDocExChange(){
    	 
         for(var i=0;i<det.auditDetail.certificateData.length;i++){
        		 if(det.auditDetail.certificateData[i].socType == 'Exemption' &&  det.auditDetail.certificateData[i].activeStatus == 1 ){
        			 det.ihmCertDocExDisable = true;
         		 	 break;
        		 }
        	 }  
	//changed by sudharsan for jira-ID = IRI-5566 start here
       if(det.ihmCertDocExDisable || det.userRoleId == AppConstant.AUDITOR_ROLE_ID){
			det.certficateDetils('exe');
         }
		 else if(!det.ihmCertDocExDisable){
			det.ihmCertDocEx = false;
			toaster.warning("Exemption Certificate is not generated");
		 }
		  //changed by sudharsan for jira-ID = IRI-5566 End here
      }
     
     function stampDocChange(){
    	 if(det.stampDataDetails.length == 0){
    		 det.stampDoc = false;
    		 toaster.warning("Stamp not added.");
    	 } 
     }
 
     function validateReceiptDoc(){
    	 var flag = true;
    	 if(!det.auditDetail.openMeetingDate){
    		 det.receiptDoc = false;
    		 flag = false;
    		 toaster.warning("Please select the receipt date.");
    	 } 
    	 return flag;
     }
     
     
 function emailForDoc(){
	 	 var enableModal = true;
    	  det.emailForDocClicked =true;
    	  if(det.receiptDoc){
    		  if(det.validateReceiptDoc()){
    			  det.genarateReceiptLetter();
    		  }else{
    			  enableModal = false;
    		  }
    	  }
    	  if(det.approvaDoc){
    		  det.generateApprovalletter(det.auditDetail.auditTypeId,det.auditDetail.companyId,det.auditDetail.auditSeqNo);
    	  }
    	  if( det.auditDetail.certificateData && det.auditDetail.certificateData.length>0){
    		  var certi = det.auditDetail.certificateData;
    		  var countCert = 0;
    		  certi.forEach(function(certKey){
    			  countCert = countCert +1;
    			  if(countCert < 4){    			  
    				  if(det.ihmCertDocHk && certKey.socType=='HK'){
    					  det.generateCertificateHk(certKey);
    	    		  }
    	    		  if(det.ihmCertDocEu && certKey.socType=='EU'){
    	    			  det.generateCertificateEu(certKey);
    	    		  }
    	    		  if(det.ihmCertDocEx && certKey.socType=='Exemption'){
    	    			  det.generateCertificateEx(certKey);
    	    		  }  
    			  }
    		  });
    	  }
  		 if(det.reviewDocPr){
  			 det.generatePrPrintReport(det.reportHisList[0].VERSION_ID,det.auditDetail.auditSeqNo,det.auditDetail.companyId,det.reportHisList[0].FILE_NAME);
  		 }
  		 if(det.reviewDocFr){
 			 det.generateFrPrintReport(det.reportHisList[1].VERSION_ID,det.auditDetail.auditSeqNo,det.auditDetail.companyId,det.reportHisList[1].FILE_NAME);
 		 }
    	 
  		  
  		 if(enableModal){
  			ModalService.showModal({
  	 			
  	 			templateUrl : 'src/modals/emailReport.html',
  	 			
  	 			controller  : 'emailReportController as email',
  	 			
  		            inputs : {
  		            	
  		            	scope:det
  		            }
  	 		
  	 		}).then(function(modal) {
  	 			
  	 			modal.element.modal();
  	 			
  		            modal.close.then(function(result) {
  		            	
  		            });
  		            
  	 		});
  		 }
 		
   } 
     
     function additionalSurveyChange(){
    	 det.additionalSurveyChangeStatus  = det.auditDetail.additionalSurvey != 'N.A' ? true: false;
     }
     
     
     function generatePrPrintReport (version_id,auditSeqNo,companyId,fileName){

 		console.log(version_id+" "+auditSeqNo+" "+companyId)
     	
 		blockUI.start();
 		
 		auditFactory.getReportBlobData(version_id,auditSeqNo,companyId).$promise.then(function(tempResp){
 			
        var dmlcFinding = '';			
  		
 			
	tempResp.auditDtls.previousFinding = tempResp.previousFinding;
	
	dmlcFinding = tempResp.dmlcFinding ? tempResp.dmlcFinding:'';
	
	tempResp = tempResp.auditDtls;
 		
	tempResp.auditAuditorDetail.forEach(function(a){
				
				if(a.audSignature && a.audSignature != ''){

 				a.audSignature = a.audSignature != '' ?  atob(a.audSignature):'';
				}
			});
			
			det.signatureonLoad = tempResp.auditAuditorDetail;
			
			
 		
 		auditFactory.getReportBlobData(version_id,auditSeqNo,companyId).$promise.then(function(resp){
 			
 			
             resp.auditDtls.previousFinding = resp.previousFinding;

             resp = resp.auditDtls;
 			console.log(resp);
 			console.log(resp.docExpiry);
 			

 			det.duplicateNarrativeSummary = (resp.narrativeSummary !='' && resp.narrativeSummary != undefined) ? decodeURIComponent(atob(resp.narrativeSummary)):'';
     		
 			det.duplicateNarrativeSummary = det.duplicateNarrativeSummary.replace(/o:p/gi,'p');
 			
     		var leadSign = _(resp.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('audSignature').toString();
     		
     		var revSign = _(resp.auditAuditorDetail).chain().where({'audLeadStatus':0,'auditRoleID':1003}).pluck('audSignature').toString();
     		
     		
     		
     		if(fileName.indexOf('_Prelim')<=0){
     			console.log("No");
     			det.checkPrelimAudit = 'No';
     		
     		}else{
     			
     			console.log("Yes");
     			det.checkPrelimAudit = 'Yes';
     			
     		}
     		if(resp.docIssuer == undefined || resp.docIssuer =='' || !resp.docIssuer){
     			
     			resp.docIssuer = _(det.companyDetails).chain().where({'companyImoNo':resp.companyImoNo}).pluck('docIssuer').toString();
     		}
     		
     		resp.auditFinding.forEach(function(findingsArray,index){
     			
     			
     			if(Number(_(findingsArray.findingDetail).chain().where({'currentAuditSeq':Number(600000)}).pluck('currentAuditSeq').toString()) === Number(600000)){
     				
     				det.carUpdateCheck = true;
     			}
     			
     		});
     		
     	var cmpnyNme = det.auditDetail.companyName ? det.auditDetail.companyName : det.cmpnyNme;
     	
     	var cmpnyAdrs = det.auditDetail.companyAddress ? det.auditDetail.companyAddress : det.cmpnyAdrs;
     	
     	var respData = resp;
     	
     	respData.auditDate = det.auditDetail.auditDate ?  moment(det.auditDetail.auditDate, 'DD-MMM-YYYY').format(YYYYMMDD) : respData.auditDate;
      	
     	respData.certExpireDate = det.auditDetail.certExpireDate  ? moment(det.auditDetail.certExpireDate, 'DD-MMM-YYYY').format(YYYYMMDD): respData.certExpireDate;
      	
     	respData.certIssueDate = det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate, 'DD-MMM-YYYY').format(YYYYMMDD) : respData.certIssueDate
      	
     	respData.certIssueId = det.auditDetail.certIssueId ? det.auditDetail.certIssueId : respData.certIssueId
      	
     	respData.certificateNo = det.auditDetail.certificateNo ? det.auditDetail.certificateNo : respData.certificateNo;
      	
     	respData.grt = det.auditDetail.grt ? det.auditDetail.grt : respData.grt;
     	
     	respData.auditPlace = det.auditDetail.auditPlace ? btoa(encodeURIComponent(det.auditDetail.auditPlace)) : respData.auditPlace;
     	
     	respData.ihmDocumentNo = '';
     	if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID){
     		if(det.currentAuditCycleData.certificateData && det.currentAuditCycleData.certificateData.length > 0){
         		respData.ihmDocumentNo = det.currentAuditCycleData.certificateData[0].ihmDocumentNo ?det.currentAuditCycleData.certificateData[0].ihmDocumentNo :'N.A';
         	}
     	}
     	
     	respData.operationCode = det.vesselDetail.operationCode ? det.vesselDetail.operationCode :'';
     	
           
 		var ReportData={
 					'reportNo':resp.auditReportNo,
 					'VesselType':resp.vesselTypeName,
 					'OfficialNo':resp.officialNo,
 					'dateOfReg':moment(resp.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY'),
 					'Grt':resp.grt,
 					'CompanyImoNo':resp.companyImoNo,
 					'DocTypeNo': det.vesselCompanyDtl.docType ? det.vesselCompanyDtl.docType : resp.companyDoc+' '+resp.docTypeNumber,
 					'DocIssuer':resp.docIssuer,
 					'DocExpiry': moment(resp.docExpiry,'YYYY-MM-DD h:mm:ss a').format('DD-MMM-YYYY'),
 					'CompanyAddress':cmpnyNme+'\n'+cmpnyAdrs,
 					'AuditSubTypeId':_(det.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(resp.auditSubTypeId)}).pluck('auditSubtypeDesc').toString(),
 					'AuditStatus':_(det.auditStatusOptions).chain().where({'auditStatusId':Number(resp.auditStatusId)}).pluck('auditStatusDesc').toString(),
 					'CertificateIssued':_(det.certificateIssuedOptions).chain().where({'certificateIssueId':Number(resp.certIssueId)}).pluck('certificateIssueDesc').toString(),
 					'AuditSummary':_(det.auditSummary).chain().where({'audSummaryId':Number(resp.auditSummaryId)}).pluck('audSummaryDesc').toString(),
 					'CurVesData':respData,
 					'StatusOptions':det.obsStatusOptions,
 					'CategoryOptions':det.obsCategoryOptions,
 					'AuditCode':det.auditCodeArray,
 					'PreviousDetails':resp.previousFinding,
 					'AuditorArray':det.audObsNameArrayCopy,
 					'prelimAudit':det.checkPrelimAudit,
 					'carUpdateCheck':det.carUpdateCheck,
 					'dmlcFinding':dmlcFinding,
 					'narrativeSummary':det.duplicateNarrativeSummary,
 					'ihmDocumentNo':respData.ihmDocumentNo,
 					'OperationCode':respData.operationCode
 			}
 		console.log("ReportData",ReportData)
 			console.log(ReportData.DocExpiry);
 			 
 			var reportdata1=auditService.reportAuditGenerate(ReportData);
 			
 			
			$timeout(function(){	
				 
				
				var  reportdataBase64Data = "";
				
				pdfMake.createPdf(reportdata1).getBuffer(function(buffer) {
					var byteArray = new Uint8Array(buffer);
					var length = byteArray.byteLength;
					for (var i = 0; i < length; i++) {
						reportdataBase64Data += String.fromCharCode(byteArray[i]);
					}
				});
				
				//dont delete
				$timeout(function(){
					var fileByte = [];
					fileByte = reportdataBase64Data ? btoa(reportdataBase64Data) : '';
					 
					var auditSubTypeId = _(det.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(resp.auditSubTypeId)}).pluck('auditSubtypeDesc').toString();
					
					var finalFileName = 'Preliminary'+resp.vesselName + '_' + resp.audTypeDesc + '_' + auditSubTypeId + '_' + resp.auditReportNo+'.pdf';
					 
					
					var parameter = {
							'fileName'   : finalFileName,
							'fileByte'   : fileByte,
							'reportName' : 'ReviewReport',
							'userName'	 : sessionStorage.getItem('emailId')
						};
				
					auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
				     });
					},2000);	
				
				
			blockUI.stop();
			 
		},2000);
			 
			
 		});
 		});
 	
     }
     
     
     function generateFrPrintReport (version_id,auditSeqNo,companyId,fileName){

  		console.log(version_id+" "+auditSeqNo+" "+companyId)
      	
  		blockUI.start();
  		
  		auditFactory.getReportBlobData(version_id,auditSeqNo,companyId).$promise.then(function(tempResp){
  			
         var dmlcFinding = '';			
   		
  			
 	tempResp.auditDtls.previousFinding = tempResp.previousFinding;
 	
 	dmlcFinding = tempResp.dmlcFinding ? tempResp.dmlcFinding:'';
 	
 	tempResp = tempResp.auditDtls;
  		
 	tempResp.auditAuditorDetail.forEach(function(a){
 				
 				if(a.audSignature && a.audSignature != ''){

  				a.audSignature = a.audSignature != '' ?  atob(a.audSignature):'';
 				}
 			});
 			
 			det.signatureonLoad = tempResp.auditAuditorDetail;
 			
 			
  		
  		auditFactory.getReportBlobData(version_id,auditSeqNo,companyId).$promise.then(function(resp){
  			
  			
              resp.auditDtls.previousFinding = resp.previousFinding;

              resp = resp.auditDtls;
  			console.log(resp);
  			console.log(resp.docExpiry);
  			

  			det.duplicateNarrativeSummary = (resp.narrativeSummary !='' && resp.narrativeSummary != undefined) ? decodeURIComponent(atob(resp.narrativeSummary)):'';
      		
  			det.duplicateNarrativeSummary = det.duplicateNarrativeSummary.replace(/o:p/gi,'p');
  			
      		var leadSign = _(resp.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('audSignature').toString();
      		
      		var revSign = _(resp.auditAuditorDetail).chain().where({'audLeadStatus':0,'auditRoleID':1003}).pluck('audSignature').toString();
      		
      		
      		
      		if(fileName.indexOf('_Prelim')<=0){
      			console.log("No");
      			det.checkPrelimAudit = 'No';
      		
      		}else{
      			
      			console.log("Yes");
      			det.checkPrelimAudit = 'Yes';
      			
      		}
      		if(resp.docIssuer == undefined || resp.docIssuer =='' || !resp.docIssuer){
      			
      			resp.docIssuer = _(det.companyDetails).chain().where({'companyImoNo':resp.companyImoNo}).pluck('docIssuer').toString();
      		}
      		
      		resp.auditFinding.forEach(function(findingsArray,index){
      			
      			
      			if(Number(_(findingsArray.findingDetail).chain().where({'currentAuditSeq':Number(600000)}).pluck('currentAuditSeq').toString()) === Number(600000)){
      				
      				det.carUpdateCheck = true;
      			}
      			
      		});
      		
      	var cmpnyNme = det.auditDetail.companyName ? det.auditDetail.companyName : det.cmpnyNme;
      	
      	var cmpnyAdrs = det.auditDetail.companyAddress ? det.auditDetail.companyAddress : det.cmpnyAdrs;
      	
      	var respData = resp;
      	
      	respData.auditDate = det.auditDetail.auditDate ?  moment(det.auditDetail.auditDate, 'DD-MMM-YYYY').format(YYYYMMDD) : respData.auditDate;
       	
      	respData.certExpireDate = det.auditDetail.certExpireDate  ? moment(det.auditDetail.certExpireDate, 'DD-MMM-YYYY').format(YYYYMMDD): respData.certExpireDate;
       	
      	respData.certIssueDate = det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate, 'DD-MMM-YYYY').format(YYYYMMDD) : respData.certIssueDate
       	
      	respData.certIssueId = det.auditDetail.certIssueId ? det.auditDetail.certIssueId : respData.certIssueId
       	
      	respData.certificateNo = det.auditDetail.certificateNo ? det.auditDetail.certificateNo : respData.certificateNo;
       	
      	respData.grt = det.auditDetail.grt ? det.auditDetail.grt : respData.grt;
      	
      	respData.auditPlace = det.auditDetail.auditPlace ? btoa(encodeURIComponent(det.auditDetail.auditPlace)) : respData.auditPlace;
      	
      	respData.ihmDocumentNo = '';
      	if(det.auditDetail.auditTypeId == det.AppConstant.IHM_TYPE_ID){
      		if(det.currentAuditCycleData.certificateData.length > 0){
          		respData.ihmDocumentNo = det.currentAuditCycleData.certificateData[0].ihmDocumentNo ?det.currentAuditCycleData.certificateData[0].ihmDocumentNo :'N.A';
          	}
      	}
      	
      	respData.operationCode = det.vesselDetail.operationCode ? det.vesselDetail.operationCode :'';
      	
            
  		var ReportData={
  					'reportNo':resp.auditReportNo,
  					'VesselType':resp.vesselTypeName,
  					'OfficialNo':resp.officialNo,
  					'dateOfReg':moment(resp.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY'),
  					'Grt':resp.grt,
  					'CompanyImoNo':resp.companyImoNo,
  					'DocTypeNo': det.vesselCompanyDtl.docType ? det.vesselCompanyDtl.docType : resp.companyDoc+' '+resp.docTypeNumber,
  					'DocIssuer':resp.docIssuer,
  					'DocExpiry': moment(resp.docExpiry,'YYYY-MM-DD h:mm:ss a').format('DD-MMM-YYYY'),
  					'CompanyAddress':cmpnyNme+'\n'+cmpnyAdrs,
  					'AuditSubTypeId':_(det.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(resp.auditSubTypeId)}).pluck('auditSubtypeDesc').toString(),
  					'AuditStatus':_(det.auditStatusOptions).chain().where({'auditStatusId':Number(resp.auditStatusId)}).pluck('auditStatusDesc').toString(),
  					'CertificateIssued':_(det.certificateIssuedOptions).chain().where({'certificateIssueId':Number(resp.certIssueId)}).pluck('certificateIssueDesc').toString(),
  					'AuditSummary':_(det.auditSummary).chain().where({'audSummaryId':Number(resp.auditSummaryId)}).pluck('audSummaryDesc').toString(),
  					'CurVesData':respData,
  					'StatusOptions':det.obsStatusOptions,
  					'CategoryOptions':det.obsCategoryOptions,
  					'AuditCode':det.auditCodeArray,
  					'PreviousDetails':resp.previousFinding,
  					'AuditorArray':det.audObsNameArrayCopy,
  					'prelimAudit':det.checkPrelimAudit,
  					'carUpdateCheck':det.carUpdateCheck,
  					'dmlcFinding':dmlcFinding,
  					'narrativeSummary':det.duplicateNarrativeSummary,
  					'ihmDocumentNo':respData.ihmDocumentNo,
  					'OperationCode':respData.operationCode
  			}
  		console.log("ReportData",ReportData)
  			console.log(ReportData.DocExpiry);
  			 
  			var reportdata1=auditService.reportAuditGenerate(ReportData);
  			
  			
 			$timeout(function(){	
 				 
 				
 				var  reportdataBase64Data = "";
 				
 				pdfMake.createPdf(reportdata1).getBuffer(function(buffer) {
 					var byteArray = new Uint8Array(buffer);
 					var length = byteArray.byteLength;
 					for (var i = 0; i < length; i++) {
 						reportdataBase64Data += String.fromCharCode(byteArray[i]);
 					}
 				});
 				
 				//dont delete
 				$timeout(function(){
 					var fileByte = [];
 					fileByte = reportdataBase64Data ? btoa(reportdataBase64Data) : '';
 					 
 					var auditSubTypeId = _(det.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(resp.auditSubTypeId)}).pluck('auditSubtypeDesc').toString();
 					
 					var finalFileName = 'Final'+resp.vesselName + '_' + resp.audTypeDesc + '_' + auditSubTypeId + '_' + resp.auditReportNo+'.pdf';
 					
 					var parameter = {
 							'fileName'   : finalFileName,
 							'fileByte'   : fileByte,
 							'reportName' : 'ReviewReport',
 							'userName'	 : sessionStorage.getItem('emailId')
 						};
 				
 					auditFactory.uploadPdfInToMachine(parameter).$promise.then(function(res) {
 				     });
 					},2000);	
 				
 				
 			blockUI.stop();
 			 
 		},2000);
 			 
 			
  		});
  		});
  	
      }
     
     function vesselDtlsRefresh(){
    	 if(det.auditDetail.auditAuditorDetail[0].userId == sessionStorage.getItem('emailId')){
    		 detailsFactoryIhm.vesselDetails(det.companyId,(sessionStorage.getItem('emailId')).toString(),det.vesselImoNo.vesselImoNo,'vesselImoNo').$promise.then(function(res){
     			
     			res.sort(function(c, d){
     	            return d.vesselID - c.vesselID;
     	        });
     			
     			console.log(res);
     			
     			var count = 0,latestCnt=0;
     			det.vesselRefreshMsg = 'Refresh Vessel Details For ';
     			var dynamicMsg = '';
     			det.LatestVesselDetailsVM = [];
     			det.LatestVesselDetailsVM.fromPage = 'audit';
     			
     			if(res[0].companyAddress === det.latestVesselDetail[0].companyAddress)
     				latestCnt++;
    			
     			if(res[0].customerName == det.latestVesselDetail[0].customerName)
     				latestCnt++;
    			
	   	       	if(res[0].vesselName === det.latestVesselDetail[0].vesselName)
	   	       		latestCnt++;
	   	       	
		   	    if(res[0].vesselType === det.latestVesselDetail[0].vesselType)
		   	    	latestCnt++;
		   	       		
   	   	       	if(res[0].companyIMONumber == det.latestVesselDetail[0].companyIMONumber)
   	   	       		latestCnt++;
   	   	       	  				 
   	   	       	if(res[0].grossTon == det.latestVesselDetail[0].grossTon)
   	   	       		latestCnt++;

   	   	       	if(res[0].homePort == det.latestVesselDetail[0].homePort)
   	   	       		latestCnt++;
   	   	       	
   	   	       	var newkeel = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-'
   	   	       	var oldkeel = det.latestVesselDetail[0].keelLaidDate ? moment(det.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
    			if(newkeel == oldkeel)
    				latestCnt++;
    				
    			if(res[0].regOwnedImoNo == det.latestVesselDetail[0].regOwnedImoNo)
    				latestCnt++;
    				
    			if(res[0].registeredCompanyName == det.latestVesselDetail[0].registeredCompanyName)
    				latestCnt++;
    				
    			if(res[0].registeredCompanyAddress == det.latestVesselDetail[0].registeredCompanyAddress)
    				latestCnt++;
    			
    			if(latestCnt!=11){
    				var autoVessel = res[0];
    				autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
        			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
        			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    				detailsFactoryIhm.updateVesselAuto(autoVessel).$promise.then(function(result) {
    					console.log(result)
    				});
    			} 
    				
     			
     			det.latestVesselDetail = angular.copy(res);
     			
     			det.reasonForVoidShow = true;
     			
     			//var flag = det.validateVesselNull(det.latestVesselDetail[0]);
 		    				
 		    			
 		    				var campAddress = '',compName='';
 		    				
 		    				campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
 		    				compName = det.vesselCompanyDtl.vesselCompanyName;
 		    				
 		    				if(res[0].companyAddress === campAddress)
 		   	       			 count++;
 		    				else{
 			   	       			 dynamicMsg += 'Company Address,';
 				   	       		det.LatestVesselDetailsVM.oldAddress = campAddress ? campAddress : '-';
 								det.LatestVesselDetailsVM.newAddress = res[0].companyAddress ? res[0].companyAddress : '-';
 		    				}
 		    				
 		    				if(res[0].customerName == compName)
 		    		 			count++;
 		    				else{
 			   	       			 dynamicMsg += 'Company Name,';
 				   	       		det.LatestVesselDetailsVM.oldVMcompanyName = compName ? compName : '-';
 			    				det.LatestVesselDetailsVM.newVMcompanyName = res[0].customerName ? res[0].customerName : '-';
 				   	       		
 		    				}
 		       				
 		    				 
 			   	       		 if(res[0].vesselName === det.vesselDetail.vesselName)
 			   	       			 count++;
 			   	       		 else{
 			   	       			 dynamicMsg += 'Vessel Name,'
 			   	       			det.LatestVesselDetailsVM.oldVMVesselName = det.vesselDetail.vesselName ? det.vesselDetail.vesselName :'-';
 				    			det.LatestVesselDetailsVM.newVMVesselName = res[0].vesselName? res[0].vesselName : '-';
 			   	       		 }
 		   	    			
 			   	       		 
 				   	       		if(res[0].vesselType.toUpperCase().trim() === det.vesselDetail.vesselTypeName.toUpperCase().trim())
 				   	       			count++;
 				   	       		else{
 				   	       			 dynamicMsg += 'Vessel Type,';
 					   	       		det.LatestVesselDetailsVM.oldVMVesselType = det.vesselDetail.vesselTypeName ? det.vesselDetail.vesselTypeName : '-';
 				    				det.LatestVesselDetailsVM.newVMVesselType = res[0].vesselType ? res[0].vesselType : '-';
 				   	       		}
 				   	       		
 				   	       	
 			   	       		if(res[0].companyIMONumber == det.vesselDetail.companyImoNo)
 		   	   	       			count++;
 		   	   	       		else{
 		   	   	       			det.vesselRefreshed = false;
 		   	   	       			 dynamicMsg += 'Company IMO NO.,'
 		   	   	       			det.LatestVesselDetailsVM.oldVMCompanyIMONo = det.vesselDetail.companyImoNo ? det.vesselDetail.companyImoNo : '-';
 		   		    			det.LatestVesselDetailsVM.newVMCompanyIMONo = res[0].companyIMONumber ? res[0].companyIMONumber : '-';
 		   	   	       		}
 		   	   	       				 
 			   	       		
			   	       		if(res[0].grossTon == det.vesselDetail.grt)
 		   	   	       			count++;
 		   	   	       		else{
 		   	   	       			det.vesselRefreshed = false;
 		   	   	       			 dynamicMsg += 'GRT,';
 		   		   	       		det.LatestVesselDetailsVM.oldVMGRT = det.vesselDetail.grt ? det.vesselDetail.grt : '-';
 		   	    				det.LatestVesselDetailsVM.newVMGRT = res[0].grossTon ? res[0].grossTon : '-';
 		   	   	       		}
 		    				
			   	       		
		    				if(res[0].homePort == det.vesselDetail.portOfRegistry)
 		    		 			count++;
 		    				else{
 		    					det.vesselRefreshed = false;
 			   	       			 dynamicMsg += 'Port of Registry,';
 				   	       		det.LatestVesselDetailsVM.oldportOfRegistry = det.vesselDetail.portOfRegistry ? det.vesselDetail.portOfRegistry : '-';
 			    				det.LatestVesselDetailsVM.newportOfRegistry = res[0].homePort ? res[0].homePort : '-';
 				   	       		
 		    				}
		    				
		    				console.log(moment(det.vesselDetail.keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY'));
		    				console.log(moment(det.vesselDetail.keelLaidDate, 'MMM DD,YYYY' ,true).isValid())
		    				var kld
		    				if(det.vesselDetail.keelLaidDate)
		    					kld = moment(det.vesselDetail.keelLaidDate, 'YYYY-MM-DD' ,true).isValid() ? moment(det.vesselDetail.keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(det.vesselDetail.keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY');
		    				else
		    					kld = '-';	
		    				var newkeel = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
 		    				if(newkeel == kld)
 		    		 			count++;
 		    				else{
 		    					det.vesselRefreshed = false;
 			   	       			 dynamicMsg += 'Keel Laid Date,';
 				   	       		det.LatestVesselDetailsVM.oldkeelLaidDate = kld;
 			    				det.LatestVesselDetailsVM.newkeelLaidDate = newkeel;
 				   	       		
 		    				}
 		    				if(res[0].regOwnedImoNo == det.vesselDetail.regOwnedImoNo)
 		    		 			count++;
 		    				else{
 		    					det.vesselRefreshed = false;
 			   	       			 dynamicMsg += 'Register Owner IMO Number,';
 				   	       		det.LatestVesselDetailsVM.oldregOwnedImoNo = det.vesselDetail.regOwnedImoNo ? det.vesselDetail.regOwnedImoNo : '-';
 			    				det.LatestVesselDetailsVM.newregOwnedImoNo = res[0].regOwnedImoNo ? res[0].regOwnedImoNo : '-';
 				   	       		
 		    				}
 		    				if(res[0].registeredCompanyName == det.vesselDetail.registeredCompanyName)
 		    		 			count++;
 		    				else{
 		    					det.vesselRefreshed = false;
 			   	       			 dynamicMsg += 'Register Company Name,';
 				   	       		det.LatestVesselDetailsVM.oldregisteredCompanyName = det.vesselDetail.registeredCompanyName ? det.vesselDetail.registeredCompanyName : '-';
 			    				det.LatestVesselDetailsVM.newregisteredCompanyName = res[0].registeredCompanyName ? res[0].registeredCompanyName : '-';
 				   	       		
 		    				}
 		    				if(res[0].registeredCompanyAddress == det.vesselDetail.registeredCompanyAddress)
 		    		 			count++;
 		    				else{
 		    					det.vesselRefreshed = false;
 			   	       			 dynamicMsg += 'Register Company Address,';
 				   	       		det.LatestVesselDetailsVM.oldregisteredCompanyAddress = det.vesselDetail.registeredCompanyAddress ? det.vesselDetail.registeredCompanyAddress : '-';
 			    				det.LatestVesselDetailsVM.newregisteredCompanyAddress = res[0].registeredCompanyAddress ? res[0].registeredCompanyAddress : '-';
 				   	       		
 		    				}
 		    				
 		    				det.letterAppComp = [];
 							
 							  det.letterAppComp.companyAddress = campAddress;
 							  det.letterAppComp.companyName = compName;
 							  det.letterAppComp.vesselName = vesselname;
 			  			  
 			  			  det.letterRecComp = [];
 			  			  
 			  			  det.letterRecComp.companyAddress = campAddress;
 			  			  det.letterRecComp.companyName = compName;
 			  			  det.letterRecComp.vesselName = vesselname;
 			  			  
 			   	       		if(count!=11){
 			   	       			det.vesselUpdate = false;
 			   	       			det.UpdateVesselAvailable =true;
 			   	       			det.UpdateVesselRefreshed = true;
 			   	       			det.vesselRefreshMsg += dynamicMsg + " Do You wish to continue?"
 			   	       			det.LatestVesselDetailsVM.vesselRefreshMsg = det.vesselRefreshMsg;
 				   	             
 			   	       			det.updateVesselDeatils(det.LatestVesselDetailsVM);
			   	            	
			   	       		 }else if(count==11){

		    					ModalService.showModal({
		          					
		          		    		templateUrl : 'src/modals/docChanged.html', 
		          		    			
		          		    		controller  : 'docChangedController',
		          		    			
		          		    		inputs		: {data: 'No Updates from RMI for this VesselImoNo : '+det.vesselDetail.vesselImoNo},	    			
		          		    		
		          		    	}).then(function(modal) {
		          		    			
		          		    		modal.element.modal();
		          		    			
		          		    		modal.close.then(function(result) {
		          		    			
		          		    		});
		          		    	});	
		    				
			   	       		 }
         		});
    	 }
    	
     }//end of vesselDetailsRefresh
     
     
     
     function validateVesselNull(item){
    	 
      	var vssel = item;
      	
      	var flag = false;  
      	
      	if(!det.vesselDetail.vesselImoNo){
  			
  		  det.vesselImoNo.vesselImoNo = '';
  		   
  		}else if(!vssel.vesselName || !vssel.vesselType  || !vssel.grossTon || !vssel.companyIMONumber || !vssel.homePort){
  			flag = true;
  		}else if(!vssel.companyAddress || !vssel.customerName){
  			flag = true;
  		}      	
  		
  		if(flag){ 
		  			
			  		det.partialData = true;	
			  		
			  		var vData = {
			 					'companyId':det.companyId,
			 					
			 					'userId':det.loginUserId,
			 					
			 					'vesselImoNo':det.vesselDetail.vesselImoNo,
			 					
			 					'vesselId':det.vesselDetail.vesselId,
			 					
			 					'auditTypeId': det.auditTypeId?det.auditTypeId:'',
			 					'status':0};
			  			
			  			detailsFactoryIhm.vesselDtlIncomplete(det.loginUserId, det.vesselDetail.vesselImoNo, det.vesselDetail.vesselId,det.companyId,vData).$promise.then(function(res) {
			  				det.AuditDetailForm.$dirty=false;
			  				if(res.partialData.length>0 && res.partialData){
			  					
			  				det.dueDateAlreadyCaptured = 	res.partialData[0].dueDate ? true : false;
			  				
			  				}
			  				
			  				if(det.reasonForVoidShow && flag){
								
			    				det.reasonForVoidShow=false;
				  				det.reasonForVoidReopen('halt');
				  				
				  				toaster.warning('Partial Vessel Details, please provide a Due Date');
				  				det.lockStatus = true;
			  				}
			  				
			  			});
			  			
			  			det.partialMissingData='';
			  			
			  			det.partialCount = 0;
			  			
			  			if(!vssel.vesselName){
			 				 det.partialMissingData = ',Vessel Name  ';
			 				 det.partialMissingStatus = true;
			 				 det.partialCount++; 
			  			} 
			  			
			  			if(!vssel.vesselType){
			 				 det.partialMissingData = ',Vessel Type  ';
			 				 det.partialMissingStatus = true;
			 				 det.partialCount++; 
			 			} 
			  			
			  			if(!vssel.grossTon){
			 				 det.partialMissingData = det.partialMissingData +''+' ,GRT value ';
			 				 det.partialMissingStatus = true;
			 				 det.partialCount++;
			 			}
			 			 
			 			
			  			if(!vssel.companyIMONumber){
			 				 det.partialMissingData = det.partialMissingData +''+' ,Company Imo Number ';
			 				 det.partialMissingStatus = true;
			 			   	 det.partialCount++; 
			 			 }
			 			 
			 			
			  			if(!vssel.homePort){
			 				 det.partialMissingData = det.partialMissingData +''+' ,Port Of Registry  ';
			 				 det.partialMissingStatus = true;
			 			    	det.partialCount++; 
			 			 }
			  			
			 			 if(!vssel.customerName){
			 				 det.partialMissingData = det.partialMissingData +''+' ,Vessel Company Name  ';
			 				 det.partialMissingStatus = true; 
			 				 det.partialCount++; 
			 			 }
			 				 
			 			if(!vssel.companyAddress){
			 				  det.partialMissingData = det.partialMissingData +''+' ,Vessel Comapny Address ';
			 				  det.partialMissingStatus = true; 
			 				  det.partialCount++; 
			 			}
 				  
		  	    }  
  		
  			return flag;
  	}
    
     function vesselDtlsCheck(){
    	 if(det.auditCreate){
    		 detailsFactoryIhm.vesselDetails(det.companyId,(sessionStorage.getItem('emailId')).toString(),det.vesselImoNo.vesselImoNo,'vesselImoNo').$promise.then(function(res){
    			 var autoVessel = res[0];
 				
 				autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
     			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
     			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
 				
     			detailsFactoryIhm.updateVesselAuto(autoVessel).$promise.then(function(result) {
 					console.log(result)
 				});
    			 det.latestVesselDetail = angular.copy(res);
    		 });
    	 }
    	 else if(!det.auditCreate){
    		 console.log(det.auditDetailOrg)
    		 detailsFactoryIhm.getVesselRefresh(det.vesselImoNo.vesselImoNo).$promise.then(function(res) {
    			
    			res.result.sort(function(c, d){
    	            return d.vesselID - c.vesselID;
    	        });
    			
    			console.log(res);
    			det.latestVesselDetail = angular.copy(res.result);
    			console.log('docexpiry'+det.latestVesselDetail[0].docExpiry);
    			res.result[0].docExpiry = res.result[0].docExpiry ? moment(res.result[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			res.result[0].registrationDate = res.result[0].registrationDate ? moment(res.result[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			res.result[0].keelLaidDate = det.latestVesselDetail[0].keelLaidDate ? moment(det.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			det.latestVesselDetail = angular.copy(res.result);
    			var count = 0;
    			det.vesselRefreshMsg = 'Refresh Vessel Details For ';
    			var dynamicMsg = '';
    			det.LatestVesselDetailsVM = [];
    			det.LatestVesselDetailsVM.fromPage = 'audit'
    			
    			
    			console.log(det.latestVesselDetail)
    			
    			det.reasonForVoidShow = true;
    			
    			//var flag = det.validateVesselNull(det.latestVesselDetail[0]);
		    				
		    			
		    				var campAddress = '',compName='';
		    				if(det.auditDetailOrg.companyAddressAud){
		    					var orgComAdd = det.auditDetailOrg.companyAddressAud.split("\n");
		    					campAddress = orgComAdd[1];
		    					compName = orgComAdd[0];
		    				}else
		    				{
		    					campAddress = det.vesselCompanyDtl.vesselCompanyAddress;
		    					compName = det.vesselCompanyDtl.vesselCompanyName;
		    				}
		    				if(res.result[0].companyAddress === campAddress)
		   	       			 count++;
		    				else{
			   	       			 dynamicMsg += 'Company Address,';
				   	       		det.LatestVesselDetailsVM.oldAddress = campAddress ? campAddress : '-';
								det.LatestVesselDetailsVM.newAddress = res.result[0].companyAddress ? res.result[0].companyAddress : '-';
		    				}
		    				
		    				if(res.result[0].customerName == compName)
		    		 			count++;
		    				else{
			   	       			 dynamicMsg += 'Company Name,';
				   	       		det.LatestVesselDetailsVM.oldVMcompanyName = compName ? compName : '-';
			    				det.LatestVesselDetailsVM.newVMcompanyName = res.result[0].customerName ? res.result[0].customerName : '-';
				   	       		
		    				}
		       				
		    				 var vesselname = det.auditDetailOrg.vesselNameAud ? det.auditDetailOrg.vesselNameAud : det.auditDetailOrg.vesselName;
			   	       		 if(res.result[0].vesselName === vesselname)
			   	       			 count++;
			   	       		 else{
			   	       			 dynamicMsg += 'Vessel Name,'
			   	       			det.LatestVesselDetailsVM.oldVMVesselName = vesselname;
				    			det.LatestVesselDetailsVM.newVMVesselName = res.result[0].vesselName? res.result[0].vesselName : '-';
			   	       		 }
		   	    			
			   	       		 var vesselTypeAud=det.auditDetailOrg.vesselTypeAud ? det.auditDetailOrg.vesselTypeAud : det.auditDetailOrg.vesselTypeName;
				   	       		if(res.result[0].vesselType.toUpperCase().trim() === vesselTypeAud.toUpperCase().trim())
				   	       			count++;
				   	       		else{
				   	       			 dynamicMsg += 'Vessel Type,';
					   	       		det.LatestVesselDetailsVM.oldVMVesselType = vesselTypeAud;
				    				det.LatestVesselDetailsVM.newVMVesselType = res.result[0].vesselType ? res.result[0].vesselType : '-';
				   	       		}
		   	   	       		if(res.result[0].companyIMONumber == det.auditDetailOrg.companyImoNo)
		   	   	       			count++;
		   	   	       		else{
		   	   	       			det.vesselRefreshed = false;
		   	   	       			 dynamicMsg += 'Company IMO NO.,'
		   	   	       			det.LatestVesselDetailsVM.oldVMCompanyIMONo = det.auditDetailOrg.companyImoNo;
		   		    			det.LatestVesselDetailsVM.newVMCompanyIMONo = res.result[0].companyIMONumber ? res.result[0].companyIMONumber : '-';
		   	   	       		}
		   	   	       				 
		   	   	       		if(res.result[0].grossTon == det.auditDetailOrg.grt)
		   	   	       			count++;
		   	   	       		else{
		   	   	       			det.vesselRefreshed = false;
		   	   	       			 dynamicMsg += 'GRT,';
		   		   	       		det.LatestVesselDetailsVM.oldVMGRT = det.auditDetailOrg.grt;
		   	    				det.LatestVesselDetailsVM.newVMGRT = res.result[0].grossTon ? res.result[0].grossTon : '-';
		   	   	       		}
		       				
		       				
		    				
		    				if(res.result[0].homePort == det.vesselDetail.portOfRegistry)
		    		 			count++;
		    				else{
		    					det.vesselRefreshed = false;
			   	       			 dynamicMsg += 'Port of Registry,';
				   	       		det.LatestVesselDetailsVM.oldportOfRegistry = det.vesselDetail.portOfRegistry ? det.vesselDetail.portOfRegistry : '-';
			    				det.LatestVesselDetailsVM.newportOfRegistry = res.result[0].homePort ? res.result[0].homePort : '-';
				   	       		
		    				}
		    				console.log(moment(det.vesselDetail.keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY'))
		    				var newKeel = res.result[0].keelLaidDate ? moment(res.result[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
		    				var curKeel = det.vesselDetail.keelLaidDate ? moment(det.vesselDetail.keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
		    				if(newKeel == curKeel)
		    		 			count++;
		    				else{
		    					det.vesselRefreshed = false;
			   	       			 dynamicMsg += 'Keel Laid Date,';
				   	       		det.LatestVesselDetailsVM.oldkeelLaidDate = det.vesselDetail.keelLaidDate ? moment(det.vesselDetail.keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
			    				det.LatestVesselDetailsVM.newkeelLaidDate = res.result[0].keelLaidDate ? moment(res.result[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
				   	       		
		    				}
		    				if(res.result[0].regOwnedImoNo == det.vesselDetail.regOwnedImoNo)
		    		 			count++;
		    				else{
		    					det.vesselRefreshed = false;
			   	       			 dynamicMsg += 'Register Owner IMO Number,';
				   	       		det.LatestVesselDetailsVM.oldregOwnedImoNo = det.vesselDetail.regOwnedImoNo ? det.vesselDetail.regOwnedImoNo : '-';
			    				det.LatestVesselDetailsVM.newregOwnedImoNo = res.result[0].regOwnedImoNo ? res.result[0].regOwnedImoNo : '-';
				   	       		
		    				}
		    				if(res.result[0].registeredCompanyName == det.vesselDetail.registeredCompanyName)
		    		 			count++;
		    				else{
		    					det.vesselRefreshed = false;
			   	       			 dynamicMsg += 'Register Company Name,';
				   	       		det.LatestVesselDetailsVM.oldregisteredCompanyName = det.vesselDetail.registeredCompanyName ? det.vesselDetail.registeredCompanyName : '-';
			    				det.LatestVesselDetailsVM.newregisteredCompanyName = res.result[0].registeredCompanyName ? res.result[0].registeredCompanyName : '-';
				   	       		
		    				}
		    				if(res.result[0].registeredCompanyAddress == det.vesselDetail.registeredCompanyAddress)
		    		 			count++;
		    				else{
		    					det.vesselRefreshed = false;
			   	       			 dynamicMsg += 'Register Company Address,';
				   	       		det.LatestVesselDetailsVM.oldregisteredCompanyAddress = det.vesselDetail.registeredCompanyAddress ? det.vesselDetail.registeredCompanyAddress : '-';
			    				det.LatestVesselDetailsVM.newregisteredCompanyAddress = res.result[0].registeredCompanyAddress ? res.result[0].registeredCompanyAddress : '-';
				   	       		
		    				}
		    				
		    				det.letterAppComp = [];
							
							  det.letterAppComp.companyAddress = campAddress;
							  det.letterAppComp.companyName = compName;
							  det.letterAppComp.vesselName = vesselname;
			  			  
			  			  det.letterRecComp = [];
			  			  
			  			  det.letterRecComp.companyAddress = campAddress;
			  			  det.letterRecComp.companyName = compName;
			  			  det.letterRecComp.vesselName = vesselname;
			   	       		
			   	       		if(count!=11){
			   	       			det.vesselUpdate = false;
			   	       			det.UpdateVesselAvailable =true;
			   	       			det.UpdateVesselRefreshed = true;
			   	       			det.vesselRefreshMsg += dynamicMsg + " Do You wish to continue?"
			   	       			det.LatestVesselDetailsVM.vesselRefreshMsg = det.vesselRefreshMsg;
				   	             if(!det.auditDetail.auditAuditorDetail[0].audSignature ){
				   	            	 /*if(det.auditDetail.certificateDetail.length>0)
				   	            		 checkCertificateVesselDeatils(det.auditDetail.certificateDetail[0], 'firstCheck');*/
				   	            	det.vesselUpdate = false;
				   	            	
				   	            	if(det.auditDetail.auditAuditorDetail[0].userId == sessionStorage.getItem('emailId')){
				   	            		det.updateVesselDeatils(det.LatestVesselDetailsVM);
				   	            	}
				    				console.log(det.LatestVesselDetailsVM)
				   	             }
				   	            	
			   	       		 }
			   	       	if(det.auditDetail.auditSubTypeId == det.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
				   	       	if(!det.auditDetail.auditAuditorDetail[0].audSignature){
				   	       		
				  	            	 if(det.auditDetail.certificateIhmDetail && det.auditDetail.certificateIhmDetail.length>0){
				  	            		 var certData = det.auditDetail.certificateIhmDetail[0];
				  	            		if(certData.socType == 'eu' || certData.socType == 'hk')
											certData.socName = 'HK/EU'
										
										if(certData.socType == 'exe')
											certData.socName = 'EXEMPTION'
				  	            		 checkCertificateVesselDeatils(certData, 'firstCheck');
				  	            	 }
				  	            	else if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0){
				  	            		var certData = det.auditDetail.certificateDetail[0];
				  	            		if(certData.socType == 'eu' || certData.socType == 'hk')
											certData.socName = 'HK/EU'
										
										if(certData.socType == 'exe')
											certData.socName = 'EXEMPTION'
				  	            		 checkCertificateVesselDeatils(certData, 'firstCheck');
				  	            	}
					   	       		
					   	      }
			   	       	}
			   	     if(det.auditDetail.auditStatusId == det.AppConstant.VOID_AUDIT_STATUS || (det.auditDetail.auditAuditorDetail[0].audSignature && det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS))
				   	    	det.vesselUpdate = true;
	    		 
        	});
     	}
     }
     
     function checkCertificateVesselDeatils(data,status){
    	 var count = 0,flag = false;
    	
	     if(det.latestVesselDetail[0].vesselName === data.vesselName)
	       			 count++;
	     if(det.latestVesselDetail[0].vesselType.toUpperCase().trim() === data.vesselType.toUpperCase().trim())
	       			count++;
	     if(det.latestVesselDetail[0].companyIMONumber == data.companyImoNo)
	       			count++;
	     if(det.latestVesselDetail[0].grossTon == data.grt)
	       			count++;
	     
	     if(det.latestVesselDetail[0].homePort == data.portOfRegistry)
	 			count++;
	     var newKeel = det.latestVesselDetail[0].keelLaidDate ? moment(det.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
	     var curKeel = data.keelLaidDate ? moment(data.keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
	     if(newKeel == curKeel)
	 			count++;
	     if(det.latestVesselDetail[0].regOwnedImoNo == data.regOwnedImoNo)
	 			count++;
	     if(det.latestVesselDetail[0].registeredCompanyAddress == data.vesselCompanyAddress)
	 			count++;
	     if(det.latestVesselDetail[0].registeredCompanyName == data.vesselCompanyName)
	 			count++;
	     if(data.socType == 'exe'){
	    	 if(count<8){
	    		 if(status == 'firstCheck'){
		    		  if(data.publishStatus==1){
		    			  toaster.warning('Vessel details are mismatch in previous Active '+data.socName +' certificate, please re-issue in previous Active '+data.socName +' certificate.');
		    			  flag = true;
		    			  det.UpdateVesselAvailable = true;
		    			  det.UpdateVesselRefreshed = true;
		    		  }
		    		  else if(data.publishStatus==0){
		    			  toaster.warning('Vessel details are mismatch please Re-Generate the certificate.');
		    			  flag = true;
		    		  }
		    	  }else if(status == 'initialCheck'){
		    		  $timeout(function(){
		    			  toaster.warning('Vessel details are mismatch in previous Active certificate, please contact manager to make the current Review as void and re-issue in  previous Active certificate');
		    		  },2000); 
		    		  flag = true;
		    	  }else if(status == 'dropDown'){
		    		  if(data.publishStatus==0)
		    			  toaster.warning('Vessel details are mismatch please Re-Generate previous Active Certificate.');
		    		  else
		    			  toaster.warning('Vessel details are mismatch in previous Active certificate, please re-issue in  previous Active certificate.');
		    		  flag = true;
		    	  }
	    	 }
	     }
	     else if(count!=9){
	    	  if(status == 'firstCheck'){
	    		  if(data.publishStatus==1){
	    			  toaster.warning('Vessel details are mismatch in previous Active '+data.socName +' certificate, please re-issue in previous Active '+data.socName +' certificate.');
	    			  flag = true;
	    		  }
	    		  else if(data.publishStatus==0){
	    			  toaster.warning('Vessel details are mismatch please Re-Generate the certificate.');
	    			  flag = true;
	    		  }
	    	  }else if(status == 'initialCheck'){
	    		  $timeout(function(){
	    			  toaster.warning('Vessel details are mismatch in previous Active certificate, please contact manager to make the current Review as void and re-issue in  previous Active certificate');
	    		  },2000); 
	    		  flag = true;
	    	  }else if(status == 'dropDown'){
	    		  if(data.publishStatus==0)
	    			  toaster.warning('Vessel details are mismatch please Re-Generate previous Active Certificate.');
	    		  else
	    			  toaster.warning('Vessel details are mismatch in previous Active certificate, please re-issue in  previous Active certificate.');
	    		  flag = true;
	    	  }
	      }
	      if(data.publishStatus==0 && count==9 && status == 'dropDown'){
			  toaster.warning('Please publish previous Active Certificate!');
			  flag = true;
			  det.lockStatus = true;
		  }
	      else if(count==9 && status == 'dropDown' && det.auditDetail.auditSubTypeId == det.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
	    	  certificateFactory.getAllCertificateDetailForIhm (det.auditDetail.auditTypeId, det.vesselImoNo.vesselImoNo,det.companyId,'soc').$promise.then(function(resCert){
    				if(resCert.result[0].publishStatus==0){
    					flag = true;
    					toaster.warning('Please Publish ' + resCert.result[0].certIssueDesc +' Certificate!');
    					det.lockStatus = true;
    				}
					
    			});
	      }
	      
	      return flag;
	      	 
     }
     
     /***if doc changed for vessel which is in Audit process with commenced/open audit status or Vessel going for new Audit.***/
		function updateVesselDeatils(data){ 
			
			console.log(data)
			ModalService.showModal({
	    			
	    		templateUrl : 'src/modals/viewMoreAlert.html', 
	    			
	    		controller  : 'viewMoreController',
	    			
	    		inputs		: {data:data},	    			
	    		
	    	}).then(function(modal) {
	    			
	    		modal.element.modal();
	    			
	    		modal.close.then(function(result) { 
	    				
	    			if(result == 'YES'){
	    				if(det.latestVesselDetail.length==1){
			    				var flag = det.validateVesselNull(det.latestVesselDetail[0]);
			    				
			    				if(!flag){
				    				 console.log(det.latestVesselDetail)
				    				 det.vesselRefreshed = true;
				    				 det.UpdateVesselRefreshed = false;
				    				 var vesselHistory = [];
				    				 
				    				 var comNameAdd = '';
				    				 
				    				 if(det.vesselCompanyDtl.vesselCompanyName)
				    					 comNameAdd = det.vesselCompanyDtl.vesselCompanyName;
				    				 else
				    					 comNameAdd = '-';
				    				 
				    				 if(det.vesselCompanyDtl.vesselCompanyAddress)
				    					 comNameAdd += '\n' + det.vesselCompanyDtl.vesselCompanyAddress;
				    				 else
				    					 comNameAdd += '\n' + '-';
				    				 
				    		    	 var parameter = {
				    							'auditSeqNo' : det.auditSeqNo,
				    							'vesselImoNo' : det.latestVesselDetail[0].imoNumber,
				    							'vesselNameAud' : det.vesselDetail.vesselName ? det.vesselDetail.vesselName : '-',
				    							'vesselTypeAud' : det.vesselDetail.vesselTypeName ? det.vesselDetail.vesselTypeName : '-',
				    							'grt' : det.vesselDetail.grt ? det.vesselDetail.grt : '-',
				    							'companyImoNo' : det.vesselDetail.companyImoNo ? det.vesselDetail.companyImoNo : '-',
				    							'dateOfRegistry' : det.vesselDetail.dateOfRegistry ? moment(det.vesselDetail.dateOfRegistry,'DD-MMM-YYYY').format('YYYY-MM-DD') : '',
				    							'docIssuerAud' : det.vesselCompanyDtl.docIssuer ? det.vesselCompanyDtl.docIssuer : '-',
				    							'docExpiryAud' : det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,'DD-MMM-YYYY').format('YYYY-MM-DD') : '',
				    							'vesselAdrress' : comNameAdd,
				    							'dateIns' : moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),
				    							'vesselId'	: det.vesselDetail.vesselId,
				    							'vesselCompanyName' : det.vesselCompanyDtl.vesselCompanyName ? det.vesselCompanyDtl.vesselCompanyName : '-',
				    							'portOfRegistry' : det.vesselDetail.portOfRegistry ? det.vesselDetail.portOfRegistry : '-',
				    							'companyAddress' : det.vesselCompanyDtl.vesselCompanyAddress ? det.vesselCompanyDtl.vesselCompanyAddress : '-',
				    							'keelLaidDate' : det.vesselDetail.keelLaidDate ? moment(det.vesselDetail.keelLaidDate,'DD-MMM-YYYY').format('YYYY-MM-DD') : '',
				    							'regOwnedImoNo' : det.vesselDetail.regOwnedImoNo ? det.vesselDetail.regOwnedImoNo : 0,
				    							'registeredCompanyAddress' : det.vesselDetail.registeredCompanyAddress ? det.vesselDetail.registeredCompanyAddress : '-',
				    							'registeredCompanyName' : det.vesselDetail.registeredCompanyName ? det.vesselDetail.registeredCompanyName : '-',
				    							'statusUpdate' : 'vesselHistory'
				    						};
				    		    	 vesselHistory.push(parameter);
				    		    	 var parameter = {
				    							'auditSeqNo' : det.auditSeqNo,
				    							'vesselImoNo' : det.latestVesselDetail[0].imoNumber,
				    							'vesselNameAud' : det.latestVesselDetail[0].vesselName,
				    							'vesselTypeAud' : det.latestVesselDetail[0].vesselType,
				    							'grt' : det.latestVesselDetail[0].grossTon,
				    							'companyImoNo' : det.latestVesselDetail[0].companyIMONumber,
				    							'dateOfRegistry' : det.latestVesselDetail[0].registrationDate ? moment(det.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '',
				    							'docIssuerAud' :  det.latestVesselDetail[0].docIssuer,
				    							'docExpiryAud' : det.latestVesselDetail[0].docExpiry ? moment(det.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '',
				    							'vesselAdrress' : det.latestVesselDetail[0].customerName+'\n'+det.latestVesselDetail[0].companyAddress,
				    							'dateIns' : moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),
				    							'vesselId'	: det.latestVesselDetail[0].vesselID,
				    							'vesselCompanyName' : det.latestVesselDetail[0].customerName,
				    							'portOfRegistry' : det.latestVesselDetail[0].homePort,
				    							'companyAddress' : det.latestVesselDetail[0].companyAddress,
				    							'keelLaidDate' : det.latestVesselDetail[0].keelLaidDate ? moment(det.latestVesselDetail[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '',
				    							'regOwnedImoNo' : det.latestVesselDetail[0].regOwnedImoNo,
				    							'registeredCompanyAddress' : det.latestVesselDetail[0].registeredCompanyAddress,
				    							'registeredCompanyName' : det.latestVesselDetail[0].registeredCompanyName,
				    							'statusUpdate' : 'fromAudit'
				    						};
				    		    	 vesselHistory.push(parameter);
				    		    	 console.log(vesselHistory)
				    				 vesselSpecificDtl(det.latestVesselDetail[0],'refresh',vesselHistory);
			    				}
		    				}
	    				else{
	    					ModalService.showModal({
	          					
	          		    		templateUrl : 'src/modals/docChanged.html', 
	          		    			
	          		    		controller  : 'docChangedController',
	          		    			
	          		    		inputs		: {data: 'Multiple Vessel Details found in RMI for this VesselImoNO : '+det.auditDetail.vesselImoNo},	    				    			
	          		    		
	          		    	}).then(function(modal) {
	          		    			
	          		    		modal.element.modal();
	          		    			
	          		    		modal.close.then(function(result) {
	          		    			
	          		    		});
	          		    	});	
	    				}
	    						
	    			}
	    		});
	    	});
		}
		
		function checkVesselHistory(rmiData,LocalVesData){
	    	 
	    	 var count = 0;
	    	 
				if(rmiData[0].companyAddress === LocalVesData.vesselCompany[0].vesselCompanyAddress)
	   			 count++;
				
				if(rmiData[0].customerName == LocalVesData.vesselCompany[0].vesselCompanyName)
		 			count++;
	       		 
	       		 if(rmiData[0].vesselName === LocalVesData.vsselDtl[0].vesselName)
	       			 count++;
				
	       		if(moment(rmiData[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') == moment(LocalVesData.vsselDtl[0].dateOfRegistry,'MMM DD, YYYY').format('DD-MMM-YYYY'))
	       			count++;
	       		
	       		if(rmiData[0].vesselType === LocalVesData.vsselDtl[0].vesselType)
	       			count++;
	       		
	       		if(rmiData[0].companyIMONumber == LocalVesData.vsselDtl[0].companyImoNo)
	       			count++;
	       				 
	       		if(rmiData[0].grossTon == LocalVesData.vsselDtl[0].grt)
	       			count++;
				
				if(rmiData[0].homePort == LocalVesData.vsselDtl[0].portOfRegistry)
		 			count++;
				var newKeel = rmiData[0].keelLaidDate ? moment(rmiData[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
				var curKeel = LocalVesData.vsselDtl[0].keelLaidDate ? moment(LocalVesData.vsselDtl[0].keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
				if(newKeel == curKeel)
		 			count++;
				
				if(rmiData[0].regOwnedImoNo == LocalVesData.vsselDtl[0].regOwnedImoNo)
		 			count++;
				
				if(rmiData[0].registeredCompanyName == LocalVesData.vsselDtl[0].registeredCompanyName)
		 			count++;
				
				if(rmiData[0].registeredCompanyAddress == LocalVesData.vsselDtl[0].registeredCompanyAddress)
		 			count++;
				
				return count;
	       		
	     }
     
 }  
})();