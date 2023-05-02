                                                          /**
 * @package app\src\main\audit\details
 *
 *
 * @author sourav ghadai, dinesh, ravi,
 *
 */

(function (){
    'use strict';

    angular
        .module('app.audit.details')        
        .controller('DetailsController', DetailsController); 
     
    function DetailsController($compile,masterFactory,CERTI_URL,auditFactory,$injector,$state,$window,$cookies,masterData,auditorName,auditType,AppConstant,detailsFactory,toaster,YYYYMMDD,MMMDDYYYY,DDMMMYYYY,HHmm,
    		DDMMYYYY,$timeout,ModalService,blockUI,auditService,$scope,$q,$rootScope,broadcastService,userFactory,auditCycleFactory,certificateFactory,vesselStatementFactory){
    	
    
        var det          = this;  console.log(det);
        
        $scope.qrString = "";
       
        var MMDDYYYY     = 'MM/DD/YYYY';  
    
        det.AppConstant  = AppConstant; 
        
        det.toggle       = toggle;
        
        det.audArrayObserverUnQualified=[];

        det.auditTypeId  = Number($window.sessionStorage.getItem('auditTypeId'));
        
        det.auditSeqNo   = Number($window.sessionStorage.getItem('auditSeqNo'));
        
        det.companyId    = Number($window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '');
        
        det.companyData = {'companyId':sessionStorage.getItem('companyName'), 'companyName':sessionStorage.getItem('companyName')};
                
        det.audObsNameArray          = auditorName;
        
        det.audObsNameArrayNoFilter         = auditorName;
        
        det.audObsNameArrayCopy =[];
       
        det.auditSubTypeOptions      = masterData.auditSubType; 
    	
    	det.auditStatusOptions       = masterData.auditStatus; 
    
    	det.certificateIssuedOptions = masterData.certificateIssued;
    	
    	det.obsCategoryOptions       = masterData.obsCategory;
    	
    	det.obsStatusOptions         = masterData.obsStatus;
    	
    	det.audObsType               = masterData.audObsType;
    	
    	det.auditCodeArray			 = masterData.auditCodes; 
    	
    	det.maPort  				 = masterData.maPort;
    	
    	det.downloadCertificate = downloadCertificate;
    	
    	det.downloadAllCertificate = downloadAllCertificate;
    	
    	det.vesselUpdate = false;
    	
    	det.vesselRefreshed = false;
    	
    	det.disabledApproveButton = false;
    	
		det.receiptStart=false;
		
    	det.checkFlagValue=true;
    	det.checkSign=true;
    	
    	det.auditDateChanged = false;
    	
    	det.maxDmlc1issueDate = '';
    	
    	det.imolabelVal = 'vesselImoNo';
    	
    	det.checkLeadStatus = false;
    	
    	det.checkPrelimAudit = 'Yes';
    	
    	det.receiptLtr= false;
    	
    	det.vesselDtlsRefresh = vesselDtlsRefresh;
    	
    	det.vesselDtlsCheck = vesselDtlsCheck;
    	
    	det.auditTypeId != det.AppConstant.MLC_TYPE_ID ? det.PreviousFindingsLabelValue = 'Previous Finding': det.PreviousFindingsLabelValue = 'Previous Finding' ;
    	
    	det.managerRegion = sessionStorage.getItem("managerRegion");
    	
    	det.apreAmendletter='Approval Letter';
    	
    	det.certiRecieptLetter = 'Receipt Letter';
    	
    	det.directAmendment=false;
    	
    	det.dmlcUpdated = false;
    	
    	det.auditCycleRoleId ='';
    	
    	det.auditCycleManagerOrAdmin='';
    	
    	det.avoidReportModel= false;
    	
    	det.updateVesselDeatils = updateVesselDeatils;

		det.attachSignFlag=false;		// Added by Ramya on 17 Feb 2022 for CR-Ticket-423
    	
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
    	
		det.leadSignChanges ='';

		det.leadTitalChanges =''; /** IRI-5245 added by kiran  */ 

		det.previousAudFindingCarUpdate = false				//added by @Ramya for jira id - IRI-5361

    	/*masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				det.signerName = data.signer;
				console.log(det.signerName)
			});
		});*/
    	
    	det.userRoleId = sessionStorage.getItem('userRoleId'); 
    	
    	det.maPort.forEach(function(port){
           if(port.activeFlag==1){
    			
    			var portToIns = port.portName?port.portName:'';
    			
    			portToIns = portToIns ? port.countryName ? portToIns+', '+port.countryName : portToIns : port.countryName ? port.countryName :'';
    					
    			det.portArray2.push(portToIns);
    		}
          
    	});
    	
    	
    	det.portArray = det.portArray2.filter(function(item, pos) {
    	    return det.portArray2.indexOf(item) == pos;
    	});
    	
    	det.audObsNameArrayCopy = angular.copy(det.audObsNameArray);
    	det.audArrayObserverUnQualified = angular.copy(det.audObsNameArray);
    	
    	if(det.auditTypeId==det.AppConstant.MLC_TYPE_ID || det.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
    		det.audObsType.forEach(function(a){
    			if(a.auditRoleId == det.AppConstant.AUDIT_AUDITOR_ROLE_ID){
    				a.auditRoleDesc = det.AppConstant.INSPECTOR;
    			}
    		});
    		det.audObsNameArray = det.audObsNameArray.filter(function( obj ) {
				return obj.mlcreview == det.AppConstant.MLC_REVIEW_OK ;
			});	
    		det.audObsNameArrayCopy = det.audObsNameArrayCopy.filter(function( obj ) {
				return obj.mlcreview == det.AppConstant.MLC_REVIEW_OK ;
			});
    		
    		det.audArrayObserverUnQualified = det.audArrayObserverUnQualified.filter(function( obj ) {
    			if (obj.mlcreview ==0 || !obj.mlcreview){
    				if(obj.roleId==1001 && ( obj.ismreview==1 || obj.ispsReview==1) ){
        				return obj;
        			    }else if(obj.roleId==1004){
        				return obj;
        			     }
    			}
    		});
    	}else if(det.auditTypeId==det.AppConstant.ISPS_TYPE_ID || det.auditTypeId==det.AppConstant.SSP_TYPE_ID){
    		
    		det.audObsNameArray = det.audObsNameArray.filter(function( obj ) {
			return obj.ispsReview == det.AppConstant.ISPS_REVIEW_OK ;
			});	
    		det.audObsNameArrayCopy = det.audObsNameArrayCopy.filter(function( obj ) {
				return obj.ispsReview == det.AppConstant.ISPS_REVIEW_OK ;
			});
    		
    		det.audArrayObserverUnQualified = det.audArrayObserverUnQualified.filter(function( obj ) {
    			if (obj.ispsReview ==0 || !obj.ispsReview){
    				if(obj.roleId==1001 && ( obj.ismreview==1 || obj.mlcreview==1) ){
        				return obj;
        			    }else if(obj.roleId==1004){
        				return obj;
        			     }
    			}
    		});
    	}
    	else if(det.auditTypeId==det.AppConstant.ISM_TYPE_ID){ 
    		
    		det.audObsNameArray = det.audObsNameArray.filter(function( obj ) {
    			
    			//det.managerRegion
				return obj.ismreview == det.AppConstant.ISM_REVIEW_OK;
			});	
    		det.audObsNameArrayCopy = det.audObsNameArrayCopy.filter(function( obj ) {
    			
    			//det.managerRegion
				return obj.ismreview == det.AppConstant.ISM_REVIEW_OK ;
			});
    		
    		det.audArrayObserverUnQualified = det.audArrayObserverUnQualified.filter(function( obj ) {
    			if (obj.ismreview ==0 || !obj.ismreview){
    				if(obj.roleId==1001 && ( obj.ispsReview==1 || obj.mlcreview==1) ){
    				return obj;
    			    }else if(obj.roleId==1004){
    				return obj;
    			     }
    			}
    		});
    	}
    	
    	
    	console.log(det.audObsNameArray);
    	console.log(det.audObsNameArrayCopy);
    	$scope.$watch('det.auditDetail.sspReviewDetail[0].sspRevisionNo', function(){
        	if(det.auditDetail.sspReviewDetail && det.auditDetail.sspReviewDetail.length>0)
        		{
          var cache = $scope.det.auditDetail.sspReviewDetail[0].sspRevisionNo;
          if (!(/^[a-zA-Z0-9]+$/.test($scope.det.auditDetail.sspReviewDetail[0].sspRevisionNo[0]))){      	
          	$scope.det.auditDetail.sspReviewDetail[0].sspRevisionNo = cache.slice(1,cache.length);
          }
          }
        })
    	
    	det.btnColor        = 'primary'; 
    	    		
    	//det.reportTypes     = masterData.reportTypes;
    	
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
        
        det.cmpnyAdrs = '';
		
		det.cmpnyNme = '';
		
		det.previousAudit = {};
		
		det.previousAuditForLetterHistory=[];
		
		
		det.LetterHistoryDetails=[];
		
		det.exportLetterHist=exportLetterHist;
		
		det.exportReceiptHist = exportReceiptHist;
	
		 det.showData=showData;
		
		det.iniRenCreated = 0;
		
		det.carFindMaxStatusDate = '';
		
		
		
		det.auditMaxDate = '';
		
		det.auditMinDateTemp = '';
		
		det.loginUserId = sessionStorage.getItem('emailId');
		
		det.userRelatedToAdt = (det.userRoleId == det.AppConstant.ADMIN_ROLE_ID || det.userRoleId == det.AppConstant.MANAGER_ROLE_ID) ? true : false;
		
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
    	
    	det.summaryDate2 = 'DD/MMM/YYYY';  // changed by sudharsan for date format in DB DDMOMYYYY	
    	
    	
    	det.minAuditDatePer = '';
    	
    	det.notLead = (det.userRoleId==det.AppConstant.MANAGER_ROLE_ID)?true: false;
    	
    	det.expiryMinDate = '';
    	
    	det.expiryMaxDate = '';
    	
    	det.minOpenMeetingDate =''; moment(new Date()).subtract(89,'days').format(YYYYMMDD);
    	
    	det.auditMinDate ='';// moment(new Date()).subtract(89,'days').format(YYYYMMDD);
    	
    	det.minAuditDatePer =''; //moment(new Date()).subtract(89,'days').format(YYYYMMDD);
    	
    	det.maxOpenMeetingDate = '';
    	
    	det.maxCloseMeetingDate = '';
    	
    	det.minCloseMeetingDate = '';
    	
    	det.minInternalDate = '';
    	
    	det.maxInternalDate = '';
    	
    	det.sspDmlcRevisionNo = 0;
    	
    	det.startExpiryDate = '';
    	
    	det.observationarrayprevious = [];

    	det.dmlcFindingAray = [];

		det.disableDmlcNote = false;		//added by @Ramya for Jira id - IRI-5643
    	
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
        
        det.setCloseMeetingDate = setCloseMeetingDate;
        
        det.setSummaryAndDueDate = setSummaryAndDueDate;
        
        det.setDefaultSummaryDate = setDefaultSummaryDate;
        
        det.exporttocertificate = exporttocertificate;
       
        
        det.setReceiptDate = setReceiptDate;
        
        det.setSSPIssueDate = setSSPIssueDate;
        
        det.getHeight  = getHeight;
        
        det.dateValidation	= dateValidation;
        
        det.setPrevFindingsRecords = setPrevFindingsRecords;
        
        det.setSSPMaxReceiptDate  = setSSPMaxReceiptDate;
        
        det.getExpiryDate = getExpiryDate;
        
        det.exportReceiptLetter = exportReceiptLetter;
        
        det.exportapprovalletter = exportapprovalletter;
        
        det.exportAmendmentLetter = exportAmendmentLetter;
        
        det.generateUtn = generateUtn;
        
        det.vesselDetails = vesselDetails;
        
        det.UpdateVesselAvailable = false;
        
        det.UpdateVesselRefreshed = false;
        
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
        
        det.validateReceiptLetter=validateReceiptLetter;
        
        det.title = '';
        
        det.vesselHistory = [];
        
       // det.reportTypes = _.sortBy(det.reportTypes, 'attachmentTypeId');
        
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
      
    /*    det.viewSspApproval = viewSspApproval;*/
      
        /* 
            AuditType Checking & Intialize
        */
       
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
      		 
    		detailsFactory.getCurrentUserDetail(_(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('userId').toString(),det.companyId).$promise.then(function(data){
    			
 			if(data.length>0 && data[0].managerOfficialId){
 				
 				officialId = data[0].managerOfficialId;
 				
 				detailsFactory.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
 			   		
 		   			det.title = res.title;
 		   			
 		   		det.leadSignReceiptLtr=res.signature;
 		   			
 		   			
 		   		 });
 			}
 		}); 
        	
        }
          	   
        	
     	
      
        });
        
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
    	
        
        function downloadCertificate (res){
        	blockUI.start("Preparing Certificate");
    		console.log("sequence Number",res);
    		auditFactory.qrCodeGenerator(CERTI_URL+res.qid).$promise.then(function(response){

				det.qrCodeData= response.data;

				if(res){

					var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue =[], intermediateReissue= [];

					var auditDate = moment(res.auditDate,MMMDDYYYY).format(YYYYMMDD);
					console.log(auditDate);
					// getAuditCertificateInActive
					//added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536 Start here
					det.previousAuditSuspendata.length!=0?det.previousAuditSuspendata.reverse():'';  //Added by sudharsan for Jira-ID 5641
					console.log(det.previousAuditSuspendata)
					var directInterorAdd =  det.previousAuditSuspendata.length!=0?
												(det.previousAuditSuspendata[0].auditSubTypeId!=undefined?
													(det.previousAuditSuspendata[0].auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.previousAuditSuspendata[0].auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID)?true:
													false:
												(res[0].auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || res[0].auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID)?true:
												false):
											false;
					if(res.getExactActiveStatus == 1 /*|| res.activeStatus == 'Active'*/){
						console.log("Active statuss",directInterorAdd);
											
						detailsFactory.getAuditCertificateData(res.vesselImoNo,res.companyId,res.certificateNo,res.auditTypeId,auditDate,directInterorAdd).$promise.then(function(result){
							//Added by sudharsan for Jira-ID = IRI-5690 ,IRI-5693,IRI-5673 Start here
							for (var i = 0; i<result.length; i++){
								console.log(result[i].activeStatus);
								result[i].activeStatus ==0?result[i].activeStatus =1:result[i].activeStatus;
								console.log(result[i].activeStatus);
							}//Added by sudharsan for Jira-ID = IRI-5690 ,IRI-5693,IRI-5673 End here							
							
							downloadAllCertificate(result,res,response,"active");
						});
						det.previousAuditSuspendata.length!=0?det.previousAuditSuspendata.reverse():''; //Modified by sudharsan for Jira-ID 5641
					}else{
						console.log("In-Active status");
						det.previousAuditSuspendata.reverse();
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
								/**chibi certificate changes this part of code not required end here*/
							}
							downloadAllCertificate(result,res,response,"inactive");
							}
        				});
						det.previousAuditSuspendata.reverse();
						//modifications for Jira-ID = 5511 , 5534, 5536, 5536 End here
					}
				}else{
					blockUI.stop();
				}

			});
    		
        }
        
        function downloadAllCertificate(result,res,response,txt){
	    	var newCertificate=[], renewalEndorse2 = [],extension =[],additionalReissue1 =[],additionalReissue2 =[];
	    	var currInitialPage=[],additionalReissue3 =[], intermediateReissue1= [],additional1=[],additional2=[],additional3=[],intermediate1=[];
			var overallAddCnt=0,overallInterCnt=0;
			console.log(res)
			var auditSubTypeId = det.auditSubTypeId,
			certificaIssueId = det.certIssueId,
			tempAuditSeqNo = det.auditSeqNo;
			var latestNumber = [];
			var directinter;//added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
			var directadditional;//added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
			
			
			var latestAudit=res;
			var certResult =result;
			var countIni=0;
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
			//added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536 Start here
			directinter = certResult[0].auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && certResult[0].certIssueId != 1008;
			directadditional= certResult[0].auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID && certResult[0].certIssueId != 1008;
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
			//modifications Jira-ID = 5511 , 5534, 5536, 5536 End here

			certResult.forEach(function(a){
				if(a.auditSubTypeId==1002 || (a.auditSubTypeId==1004 &&  a.certIssueId ==1002) || a.auditSubTypeId==1001)
					countIni++;
				if(a.certIssueId==1008 && a.seqNo==1)
    				a.getEndrosedCount=0
				if(a.certIssueDesc=='FULL TERM' || a.certIssueDesc=='RE-ISSUE/ADMINISTRATIVE' || a.certIssueDesc=='INTERIM'){
					(a.certOderNo<=res.certOderNo) ? currInitialPage={0:a} : currInitialPage.length==0 ? ' ' : currInitialPage[0];
				}
			});
			
			if(countIni==0)
				det.directInterAdd= "directInterAdd";
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
					a.overallInterCnt=overallInterCnt;
				}
				
				if(a.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1){
					overallAddCnt++;
					a.overallAddCnt=overallAddCnt;
					a.addReissue = true;
				}
				else if((a.reissuedinanother!=undefined?a.reissuedinanother:false) && a.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID ) //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
					a.addReissue = true;
				else
					a.addReissue = false;
				
				if((a.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.certIssueId == 1008 && a.getEndrosedCount==1)){
					
					overallInterCnt++;
					a.overallInterCnt=overallInterCnt;
					a.interReissue = true;
					a.addReissue = true;
				}
				else if((a.reissuedinanother!=undefined?a.reissuedinanother:false) && a.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID) //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
					a.interReissue = true;
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
			
			//var certorderInter=0;
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
					if(a.auditSubTypeId==1001 || a.auditSubTypeId==1002 || a.auditSubTypeId==1004 || a.auditSubTypeId==1003 || a.auditSubTypeId==1005){
						console.log(a)
						if(a.certIssueId == certificaIssueId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
						(a.certOderNo<=latestAudit.certOderNo) && (a.auditSubTypeId==1001 || a.auditSubTypeId==1002 || a.auditSubTypeId==1003 ||   a.auditSubTypeId==1004 || a.auditSubTypeId==1005)? extension={0:a} : '';
					}
					
				}else if(a.certIssueId  == 1007){
	
					if(a.certIssueId == certificaIssueId){
	
						a.withoutCross = true;
						}else{
						a.withoutCross = false;
						}
	
					(a.certOderNo<=latestAudit.certOderNo) ? renewalEndorse2={0:a} : '';
	
				}
							
				if(a.auditSubTypeId== det.AppConstant.INITIAL_SUB_TYPE_ID  || a.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID ||a.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){
	
				//	det.newCertificateSign = "data:image/png;base64,"+a.issuerSign;
	
					console.log("Initial");
					console.log(a.auditSubTypeId == auditSubTypeId);
					if(a.auditSubTypeId == auditSubTypeId){
	
					a.withoutCross = true;
					}else{
					a.withoutCross = false;
					}
					//console.log("FULLTERM..!!");
					a.certOderNo<=latestAudit.certOderNo?newCertificate.push(a):'';
	
				}else if(a.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
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
				}else if(a.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
					console.log("Intermediate");
					
					if(a.certIssueId  == 1004)
					{
						if(a.auditSubTypeId == auditSubTypeId){
							
							a.withoutCross = true;
							}else{
							a.withoutCross = false;
							}
							
						if(a.overallInterCnt ==1)
							a.certOderNo<=latestAudit.certOderNo ? (!(a.reissuedinanother)?intermediate1={0:a}:''):''; //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
						else if(a.overallInterCnt==2){
							(a.certOderNo<=latestAudit.certOderNo) && (additional1.length==0) ? additional1={0:a}:'';
						}else if(a.overallInterCnt==3){
							(a.certOderNo<=latestAudit.certOderNo) && (additional2.length==0) ? additional2={0:a}:'';
						}else if(a.overallInterCnt==4){
							(a.certOderNo<=latestAudit.certOderNo) && (additional3.length==0) ? additional3={0:a}:'';
						}
						
					}
					
					if(a.certIssueId  == 1008 || a.reissuedinanother){ //added by sudharsan for Jira-ID = 5511 , 5534, 5536, 5536
						if(a.overallInterCnt==1){
							
							 intermediateReissue1={0:a};
							}
							else if(a.overallInterCnt==2){	
							
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
				
				var certorderInter=result[0].certOderNo;
				if(det.directInterAdd== 'directInterAdd' && (a.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || a.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || a.certIssueId == 1007 || a.certIssueId == 1006)){
					
					if(certorderInter>a.certOderNo){
						certorderInter=a.certOderNo;
					}
					console.log("DetailscertDetails", certorderInter);
					console.log("newCertificate", a.auditSeqNo);
					(a.certOderNo ==certorderInter) ? currInitialPage={0:a} :  ' ';
				}
				
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
									'seal':newCertificate[0].seal ? newCertificate[0].seal : det.seal,
									'title':newCertificate[0].title ? newCertificate[0].title : det.title,
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
	/*						var certificate = auditService.pdfService(certificateDatas);
	
	
			if(certificate.length > 0) {
	
				for(var i=0;i<certificate.length;i++){	
	
					var decrypt =  window.atob(window.btoa(certificate[i]));				
	
					doc.addImage(decrypt, 'PNG', 0, 0 ,doc.internal.pageSize.width,doc.internal.pageSize.height,"'NewCertificate"+i+"'",'FAST');
	
					if((certificate.length - 1) != i ) {
						doc.addPage();
					}
				}				
			}*/
			
			
			//certificateDatas.qrCodeUrl = CERTI_URL + res.qid;
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
				
				pdfMake.createPdf(certificate).download(''+ certificateDatas.certificateNo+ '.pdf');
				blockUI.stop();
				toaster.success('Certificate downloaded successfully');
				
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
        
        function validateReceiptLetter()
    	{
    		var flag=true;
         if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
			
			var approvalDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
			var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
		    var closeMeetingDate =  det.auditDetail.closeMeetingDate? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
			var issueDate =  det.auditDetail.certIssueDate ?  moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
			
			issueDate = (closeMeetingDate && det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID) ? closeMeetingDate : issueDate;
		    var closeMeetingDate =  det.auditDetail.closeMeetingDate? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
			var issueDate =  det.auditDetail.certIssueDate ?  moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
			
			issueDate = (closeMeetingDate && det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID) ? closeMeetingDate : issueDate;
			//Added by sudharsan for JIRA-ID=5332 on 22-06-2022
			if(reciptDate==""){
				flag = false; 
				toaster.warning('Please Enter the Receipt Date');   
			}
			//Endhere
			else if(approvalDate && reciptDate && (reciptDate>approvalDate)){
			flag = false; 
			var msg=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)?'Review':'Approval';
			toaster.warning(msg+' date should be greater than OR equal to receipt date');   
			}else if(issueDate && reciptDate &&  issueDate>reciptDate){
				flag = false;
				var msg=(det.auditDetail.auditTypeId== det.AppConstant.SSP_TYPE_ID)?'SSP':'DMLC II';
    			toaster.warning(' Receipt date should be greater than OR equal to '+msg+' issue date. ');  
			}else if(approvalDate && issueDate && issueDate>approvalDate){
				var msg=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)?'Review':'Approval';
				var msg1=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)?'DMLC II':'SSP';
				toaster.warning(msg+' Date cannot be earlier than  or Equal to  '+msg+' Issue Date'); 
				flag = false;
			}
			
			if(det.auditDetail.auditFinding!=null)
				{
				if(det.auditDetail.auditFinding[0] && det.auditDetail.auditFinding[0].findingDetail[0] && det.auditDetail.auditFinding[0].findingDetail[0].statusDate)
				{
				det.statusDate=moment(det.auditDetail.auditFinding[0].findingDetail[0].statusDate,YYYYMMDD).format(YYYYMMDD);
				  //console.log(det.statusDate);
				 
				if(approvalDate < det.statusDate )
			{
			
			toaster.warning('Please change the Review date, which cannot be earlier than the status Date');		//changed by @Ramya for Jira id - IRI-5573
			flag = false;
			console.log(approvalDate < det.statusDate);
		}else if(approvalDate >  det.statusDate)
			{
			det.checkFlagV=true;
			toaster.warning('Please check the status date');
			flag = true;
			}
				}
				}
       
         }
		//  added by ramya for jira-id-->IRI-5222
		 if(flag){
			det.receiptStart=true;
			det.receiptLtr=false;
		}
        // console.log(det.auditDetail.auditFinding); 
         return flag;
         }
        
        /***** on screen load getting audit details *****/
    	function setAuditSCreen(callBack){ 
    	
    		if (det.auditSeqNo) {
    			
    			$state.current.data.pageTitle = "UPDATE "+auditType[det.auditTypeId].src ;
    			
    			det.startState = det.AppConstant.UPDATE;
    			
        		det.auditCreate = false;
        		
        		det.auditCreateUpdate = det.AppConstant.UPDATE;
        		
    			detailsFactory.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
    				
    				console.log(res);
    				
    				/*masterFactory.getCurrentUserDetail(res.auditAuditorDetail[0].userId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    				var officialId=res[0].officialId;
    				console.log(officialId)
	    				detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
	    				.then(function(data) {
	    					det.signerName = data.signer;
	    					console.log(det.signerName)
	    				});
    				});*/
    				
    				det.certInactive = res.auditSummaryId;
    				if(res.auditTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID|| res.auditTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID || res.auditTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID)
					{
					
			if(res.certificateDetail.length>0 &&  res.certExpireDate && res.certificateDetail[0].extendedExpireDate){
				res.certExpireDate =  res.certificateDetail[0].extendedExpireDate  ? res.certificateDetail[0].extendedExpireDate : res.certificateDetail[0].certExpireDate ? res.certificateDetail[0].certExpireDate : res.certExpireDate ;
				 res.certIssueDate =  res.certificateDetail[0].extendedIssueDate    ? res.certificateDetail[0].extendedIssueDate :  res.certificateDetail[0].certIssueDate  ?  res.certificateDetail[0].certIssueDate : res.certIssueDate;
			}
					}
    			
    				
    				if(res.auditTypeId==det.AppConstant.SSP_TYPE_ID || res.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
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
  						 toaster.warning('Current '+det.auditType+' is retrieved in the Laptop '+det.auditType+' Application by   '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString()); 
  					    }else if(det.userRoleId ==det.AppConstant.OBSERVER_ROLE_ID && res.lockStatus==7){
  						 toaster.warning('Current '+det.auditType+' is retrieved in the Mobile '+det.auditType+' Application by   '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString()); 
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
    							detailsFactory.getCurrentUserDetail(res.lockHolder,det.companyId).$promise.then(function(data){
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
    				
    				if(det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID && res.auditStatusId == det.AppConstant.REOPEN) {
						det.disableNarativeSummary(); 
					}
    				
    				/**** checking LaptopRetrieve Status of current Audit ****/
    				if(res.lockStatus==det.AppConstant.RETRIEVE_STATUS && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
    					
    					det.lockStatus = true; 
    					det.enabled = true;
    					det.lockDisable=true;
    					toaster.warning('Current '+det.auditType+' is retrieved in the Laptop '+det.auditType+' Application by   '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString());
    				
    				}else if(res.lockStatus==7 && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
    					
    					det.lockStatus = true; 
    					det.enabled = true;
    					det.lockDisable=true;
    					toaster.warning('Current '+det.auditType+' is retrieved in the Mobile '+det.auditType+' Application by   '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString());
    				
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

					if(res.auditTypeId==det.AppConstant.SSP_TYPE_ID || res.auditTypeId==det.AppConstant.DMLC_TYPE_ID){			//added by ramya for jira id-->IRI-5306
					  if(sessionStorage.getItem("emailId")!=res.auditAuditorDetail[0].userId)
					  {
						  if(res.auditSummaryId==det.AppConstant.NOT_APPROVED_SUMMARY){
							  toaster.warning("This Review marked as Not approved by Lead Auditor");
							  det.notApprovedCurAudit = true;
						  }
					  }
				  	}
    			
    				det.setAuditData(res,function(){
    					
    					
        if(det.auditCreate == false){
        	var officialId = '';
      		
    		detailsFactory.getCurrentUserDetail(_(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('userId').toString(),det.companyId).$promise.then(function(data){
    			
 			if(data.length>0 && data[0].managerOfficialId){
 				
 				officialId = data[0].managerOfficialId;
 				
 				detailsFactory.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(response){
 			

 		   			det.title = response.title;
 		   		
 		  	det.leadSignReceiptLtr=response.signature;
 		   			
 		   		 });
 			}
    		}); 
        	}
			det.enableNarativeSummary(); //Added by sudharsan for IRI-5228 on 12-04-2022
        });
    				
    				$timeout(function(){
        				det.openForCar = $state.params.openForCar || res.lockStatus==det.AppConstant.OPENFORCAR ? true:false;
        			},10);
    				console.log(res);
    				if(res.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
					{
				if(res.closeMeetingDate && res.sspReviewDetail[0].sspRevisionNo)
    			{
    			det.ValidationForReviewLetter=true;
    			}
				else
					{
					det.ValidationForReviewLetter=false;
					}
					}
    				
    				
    				if(res.auditTypeId==det.AppConstant.SSP_TYPE_ID)
					{
				if(res.certIssueDate && res.sspReviewDetail[0].sspRevisionNo)
    			{
    			det.ValidationForReviewLetter=true;
    			}
				else
					{
					det.ValidationForReviewLetter=false;
					}
					}
    			
    				console.log(det.auditDetail)
    				if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID){
	    				detailsFactory.getDMLCReportNos(res.vesselImoNo,det.companyId, det.auditTypeId).$promise.then(function(res){
	        				det.dMLCReportNos = angular.copy(res);
	        				console.log(det.dMLCReportNos);	
	        				if(det.dMLCReportNos.length>0){
		        				det.auditDetail.sspReviewDetail[0].dmlcIssuedDate =  det.dMLCReportNos.length>0 ? det.dMLCReportNos[0].dmlcissuedate : '';
		        				det.auditDetail.sspReviewDetail[0].dmlcAuditPlace = det.dMLCReportNos[0].dmlcissueplace ? det.dMLCReportNos[0].dmlcissueplace : '';
	        				}
	        				/*if(det.dMLCReportNos[0]){
	            				detailsFactory.getDMLCLocationDate(det.dMLCReportNos[0].vesselImoNo,det.dMLCReportNos[0].companyId).$promise.then(function(res){
	            					if(res.placeLocation[0]){
	            					sessionStorage.setItem('dmlcLocation',res.placeLocation[0].AUDIT_PLACE ? res.placeLocation[0].AUDIT_PLACE : res.placeLocation[0].DMLCII_ISSUE_LOCATION);
	            					var dateCloseFormat=res.placeLocation[0].CLOSE_MEETING_DATE ? res.placeLocation[0].CLOSE_MEETING_DATE : res.placeLocation[0].DMLCII_ISSUE_DATE;
	            					var dateCloseFormat1 = moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY');
	            					sessionStorage.setItem('dmlcIssueDate',dateCloseFormat1);
	            					console.log(sessionStorage.getItem('dmlcIssueDate'));
	            					}
	            				});
	            				}else{
	            					sessionStorage.setItem('dmlcLocation','');
	            					sessionStorage.setItem('dmlcIssueDate','');
	            					}*/
	            		});
    				}
    		});
    			
    		}else{ 
    			masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    			var officialId=res[0].officialId;
    			console.log(officialId)
    				detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
    				.then(function(data) {
						det.leadTitalChanges = data.title /** IRI-5245 added by kiran  */ 
						det.leadSignChanges = data.signature;
    					det.signerName = data.signer;
    			
		    			det.userRelatedToAdt = true;
		    			
		    			var currLoginUserDtl = _.findWhere(auditorName, {'emailId' : det.loginUserId});
		    			
		    			$state.current.data.pageTitle = "CREATE "+auditType[det.auditTypeId].src ;
		    		
		    			det.auditDetail = {	
		    					'auditTypeId':det.auditTypeId,
		    					'companyId' : sessionStorage.getItem('companyId'),
		    					'auditStatusId':'',//det.AppConstant.COMMENCED_AUDIT_STATUS,
		    					'leadAuditorName': (det.userRoleId==det.AppConstant.MANAGER_ROLE_ID)?'':currLoginUserDtl.firstName+' '+currLoginUserDtl.lastName,
		    					'leadAuditorId':(det.userRoleId==det.AppConstant.MANAGER_ROLE_ID)?'':currLoginUserDtl.sequenceNo,
		    					'docFlag' :	det.AppConstant.DEFAULT_DOC_FLAG,
		    		    		'lockStatus' : det.AppConstant.NOT_RETRIEVE_STATUS,
		    		    		'reviewStatus' : det.AppConstant.REVERT_REVIEW_STATUS,
		    		    		'grt':det.vesselDetail.grt?det.vesselDetail.grt:'',
		    		    		'allowNext':det.AppConstant.NOTACCEPT,
		    		    		'makeFinal':det.AppConstant.NOTACCEPT,
								'scope' : det.scopeId,
								'title':det.title,
		    					'auditAuditorDetail':[{
		    										'userId' : det.loginUserId,
		    		    			
		    										'auditorName' :(det.userRoleId==det.AppConstant.MANAGER_ROLE_ID)?'' : currLoginUserDtl.firstName+' '+currLoginUserDtl.lastName,
		    		    			
		    										'auditRoleID' : det.AppConstant.AUDIT_AUDITOR_ROLE_ID,
		    										
		    										'auditRoleDesc' : (det.auditTypeId==det.AppConstant.MLC_TYPE_ID || det.auditTypeId==det.AppConstant.DMLC_TYPE_ID)?'LEAD '+det.AppConstant.INSPECTOR:'LEAD '+det.AppConstant.AUDITOR,
		    		    			
		    										'audSignature' : '',
		    		    			
		    										'audSignatureDate' : moment(new Date()).format(MMMDDYYYY),
		    		    			
		    										'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS,
		    		    			
		    										'check' : false,
		    		    			
		    										'showSignatureButton' : true,
		    							
		    										'companyId' : det.companyId,
		    										
		    										'userIns' : (sessionStorage.getItem('emailId')).toString(),
		    					    				
		    					    				'dateIns' : moment(new Date()).format(YYYYMMDD),
		    					    				
		    					    				'delegateSign':0,
		    					    				
		    					    				'signerName' : det.signerName
		    		    							}],
		    					'auditRptAttach':[],
		    					'auditDate' : moment(new Date()).format(MMMDDYYYY),
		    					'sspReviewDetail':[],
		    					'auditFinding' : [],
		    					'certificateDetails':[]
		    					
		    					};
		    			
		    			det.auditDetail.auditDate = (det.auditTypeId==det.AppConstant.DMLC_TYPE_ID || det.auditTypeId==det.AppConstant.SSP_TYPE_ID ) ? '': det.auditDetail.auditDate ;
		    			
		    			
		    			
		    			det.maxDmlc1issueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
		    			
		    			
		    			det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
		    			
		    			_.countFindingCategory(det.auditDetail.auditFinding,det.auditDetail.auditTypeId,"CURR",det.obsCategoryOptions);
		    			
		    			_.countFindingCategory(det.observationarrayprevious,det.auditDetail.auditTypeId,"PREV",det.obsCategoryOptions);
		    			
		    			//_.countFindingCategory(det.auditDetail.auditFinding,det.observationarrayprevious,det.auditDetail.auditTypeId,det.obsCategoryOptions);
		    			det.setDefaultSummaryDate();
		    			
		    			callBack();	
		    		});
		    	});
    		}

    	}// end of setAuditSCreen()
        
        function typeCheck(){
        	
        	switch(Number(det.auditTypeId)){
    		
    		case det.AppConstant.ISM_TYPE_ID:
    			
    			$state.current.data.pageTitle = 'ism audit';

                det.auditType    = 'Audit';
                
                det.auditDate 	 = 'Audit'; 

                det.auditorType  = 'Auditor';

                det.certType     = 'Certificate';

                det.expiredate   = 'Expiry Date';

                det.openMettingDate = 'Opening Meeting Date';

                det.clseMetingdate = 'Closing Meeting Date';

                det.summaryHead    = 'The undersigned has carried out the above audit according to the ISM Code and found the vessel';

                det.auditauditType ='ISM';

                det.reportletter  = 'Print Report';

                det.certiletter   = 'Certificate';
                det.FindingButton='New Finding';
                
                break;
    			
    		case det.AppConstant.ISPS_TYPE_ID:
    			
    			$state.current.data.pageTitle = 'isps audit';
    			 
                det.auditType    = 'Audit';
                
                det.auditDate 	 = 'Audit'; 

                det.auditorType  = 'Auditor';

                det.certType     = 'Certificate';

                det.expiredate   = 'Expiry Date';

                det.openMettingDate = 'Opening Meeting Date';

                det.revsionNo = 'SSP Revision No.';

                det.leadNme = 'SSP Auditor Name';

                det.reportNumber = 'SSP Report No.';

                det.clseMetingdate = 'Closing Meeting Date';

                det.summaryHead    = 'The undersigned has carried out the above audit according to the ISPS Code and found the vessel';

                det.auditauditType ='ISPS';
                            
                det.reportletter  = 'Print Report';

                det.certiletter   = 'Certificate';
                det.FindingButton='New Finding';
                
                break;
    			
    		case det.AppConstant.MLC_TYPE_ID:
    			
    			$state.current.data.pageTitle = 'mlc inspection';

                det.auditType    = 'Inspection';
                
                det.auditDate 	 = 'Inspection'; 

                det.auditorType  = 'Inspector';      
                
                det.certType     = 'Certificate';

                det.expiredate   = 'Expiry Date';

                det.openMettingDate = 'Opening Meeting Date';

                det.revsionNo = 'DMLC II Revision No.';

                det.leadNme = 'DMLC II Inspector Name';

                det.reportNumber = 'DMLC II Review Report No.';

                det.clseMetingdate = 'Closing Meeting Date';

                det.summaryHead    = 'The undersigned has carried out the above inspection according to the MLC Code and found the vessel';

                det.auditauditType ='MLC';

                det.reportletter  = 'Print Report';

                det.certiletter   = 'Certificate';
                det.FindingButton='New Finding';
                
                break;
    			
    		case det.AppConstant.SSP_TYPE_ID:
    			
    			$state.current.data.pageTitle = 'ssp review';

                det.auditType    = 'Review';
                
                det.auditDate 	 = 'Approval'; 

                det.auditorType  = 'Auditor';

                det.certType     = 'Letter';
        
                det.expiredate   = 'ISPS Audit Due Date';

                det.revsionNo = 'SSP Revision No.';

                det.summaryHead    = 'The undersigned has carried out the Ship Security Plan (SSP) review for and on behalf of the Government of the Republic of the Marshall Islands (RMI) for compliance with the International Code for the Security of Ships and Port Facilities (ISPS Code), Part A and the provisions of ISPS Code B/8.1 to B/13.8 as appropriate for the ship; ';

                det.auditauditType ='SSP';
                
                det.reportletter  = 'Print Report';
                
                det.openMettingDate = 'Receipt Date';
                
                det.apreletter = 'Approval Letter';
                
                det.sspIssueDate = 'Initial Issue Date';
                
                det.sspLetterHistDate='SSP Issue Date';
                
                det.ltrHistAuditor='Auditor';
                
                
                break;
    			
    		case det.AppConstant.DMLC_TYPE_ID:
    			
    			$state.current.data.pageTitle = 'dmlc ii review';

                det.auditType    = 'Review';
                
                det.auditDate 	 = 'Review'; 

                det.auditorType  = 'Inspector';

                det.certType     = 'Letter';

                det.openMettingDate = 'Receipt Date';

                det.revsionNo = 'DMLC II Revision No.';

                det.clseMetingdate = 'DMLC II Issue Date';

                det.summaryHead    = 'The undersigned has carried out the DMLC Part II review pursuant to Standard A5.1.3 paragraph 10(b) of the MLC 2006 and RMI requirements for implementing MLC 2006 and found the DMLC Part II;';

                det.auditauditType ='DMLC II';
                
                det.reportletter  = 'Print Report';
                
                det.apreletter = 'Review Letter';
                
                det.FindingButton='Review Notes';
               
                det.sspLetterHistDate='DMLC II Issue Date';
                
                det.ltrHistAuditor='Inspector';

             }// switch end 
       }// typeCheck end
        
      
        function onChangeAuditStatus(oldValue){
        	
        	det.AuditDetailForm.$dirty=true;
        	det.oldValue=oldValue;
        	
    	  var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
		  if(det.auditDetailOrg && reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY) && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID))
		  {
			  det.receiptStart=true;								//added by ramya for jira id-->IRI-5301
		  }
        	if(det.userRoleId == det.AppConstant.MANAGER_ROLE_ID && det.auditDetail.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS  && det.auditCreate){
        		det.managerCreatingAudit =true;
        		det.managerCreatedAuditFlag = true;
        		var msg=(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)?' Inspection ':' Audit';
        		toaster.warning("Please Add Lead Auditor to Create  "+msg);
    		}
        	
        	if(det.auditDetail.auditStatusId == det.AppConstant.VOID_AUDIT_STATUS){
        		 if(det.nextAdtCreated){
        			 det.auditDetail.auditStatusId = oldValue;
					 var warnMsg=(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)?' Inspection ': ((det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID) ?' Audit ' : ' Review ');		//changed by @Ramya for jira id - IRI-5632
    				toaster.warning('Next'+warnMsg+'has been created')
    			}else{
        		det.reasonForVoidReopen('void'); }
        		 det.vesselUpdate = true;
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS && det.oldValue!=det.AppConstant.REOPEN && !det.carUpdateStatus){		//changed by @Ramya on 1-7-2022 for jira id - IRI-IRI-5358
        		var certStatus = false;
        		if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0)
	            	certStatus = checkCertificateVesselDeatils(det.auditDetail.certificateDetail[0], 'firstCheck');
        		if(certStatus){
        			det.auditDetail.auditStatusId = oldValue ? oldValue : '';
        		}
        		if(det.UpdateVesselRefreshed){
        				vesselDtlsCheck();
        				det.vesselUpdate = true;
        				det.auditDetail.auditStatusId = oldValue ? oldValue : '';
        		}else{
	        		//det.auditDetail.auditStatusId = oldValue ? oldValue : det.AppConstant.COMPLETED_AUDIT_STATUS;
	        		var notAvlReport = _.filter(det.auditDetail.auditRptAttach, function(obj){ 
						return !obj.fileName ;
					});
					
	        	 	if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID) && notAvlReport.length>0 && det.auditDetail.sspReviewDetail[0].ltrStatus==0 ){ 
	        	 		//det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS
	        	 		if(det.attachSignValidation()){
							det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
						}
	        	 	 
					} 
	        		  
	        		 
	        		if(det.attachSignValidation() && !det.UpdateVesselRefreshed){ 
	
	        			 if((det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY) && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && !det.auditDetail.auditDate){
	      					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	        					 var msg= (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Date': 'Review Date' ;
	      					   toaster.warning('Please Enter '+msg+'');
	      				   }
	        			 else if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==0 && !(det.disabledApproveButton) && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) ){
	        				det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	        				var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
	   					 toaster.warning('Please Generate '+msg+' ');
	   				   }
	        			
	        			else if((det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY) && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY) ||  det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo)){
	   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	   					   var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
	   					   toaster.warning('Please Generate '+msg+' Again');
	   					det.avoidReportModel=true;
	   				   }  else if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY) && det.receiptStart && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
	   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	 					   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
	 					   
	 					   toaster.warning('Please save the review and Generate '+msg+''); 				//CHANGED BY RAMYA FOR JIRA ID-->IRI-5206																		
	   					    
	   				   }
	   				    else if(det.receiptLtr && det.receiptStart  && reciptDate==moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMM-YYYY')  && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
	   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
						   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
						   toaster.warning('Please save the review and Generate '+msg+''); 
	   					 det.avoidReportModel=true;
	   				   } 
	   				   else if(!validateReviewLetterWithAuditStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY)
	   					   {
	   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	   					   var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
	   					   toaster.warning('Please Generate '+msg+' ');
	   					   }
	        			if(det.completedStatusValidation('statusChange')){ 
	        				if(!det.checkFindingClosed()){
	        					if(det.auditTypeId == det.AppConstant.DMLC_TYPE_ID)
	        						{
	        					toaster.warning('Please close all Review Notes to make '+det.auditType+' completed.');
	        				        }
	        					else
	        						{
	        						toaster.warning('Please close all findings to make '+det.auditType+' completed.');
	        						}
	        					det.auditDetail.auditStatusId = oldValue;
	        				}
	        				else{
	        				
	        					if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)&& det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY) ||  det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo && det.receiptStart) ){
	        						det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	        						}else if(((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY)&& !det.receiptStart && reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)|| (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY))){
	        							if(det.attachSignValidation()){
	        								det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
	        							} 
	                				}
	        					
	         					else{
	        						if(!validateReviewLetterWithAuditStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && det.receiptStart){
	        							det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS
	        						}else if((det.receiptLtr && det.receiptStart) && reciptDate==moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY) && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
	     		   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	     		 					   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
	     		 					   toaster.warning('Please save the review and Generate '+msg+''); 
	     		   				   }   						
	        						else if(((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && validateReviewLetterWithAuditStatus && !det.receiptStart   && det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==1)|| det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID){
	        							
	        							 if((det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY) && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && !det.auditDetail.auditDate){
	        								 det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	        								 var msg= (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Date': 'Review Date' ;
	        		      					   toaster.warning('Please Enter '+msg+'');
	        		      				   }
	        							else if(det.attachSignValidation()){
	        								det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;	
	        							}
	        							}
	        					}
	        					if(det.lengthOfFindingExceptObs()==0){
	        						det.auditDetail.allowNext = ((det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) && det.leadSign)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
	                			}
	        				}
	        			}else{
	            			det.auditDetail.auditStatusId = oldValue ? oldValue : '';
	            		}
	        		}else{
	        			det.auditDetail.auditStatusId = oldValue ? oldValue : '';
	        		}
        		}
        		
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS && det.userRoleId != det.AppConstant.ADMIN_ROLE_ID && det.userRoleId!=det.AppConstant.MANAGER_ROLE_ID && !det.carUpdateStatus){
        		det.enableNarativeSummary(); 
        		det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
        		if(det.vesselRefresh)
        			if(det.UpdateVesselAvailable)
        				det.vesselUpdate = false;
        	}else if(det.auditDetail.auditStatusId == det.AppConstant.REOPEN){
        		var temp=true;
        		/*if(det.UpdateVesselAvailable)
        			det.vesselUpdate = false;*/
//        		if(oldValue==det.AppConstant.COMMENCED_AUDIT_STATUS &&  det.userRoleId != det.AppConstant.AUDITOR_ROLE_ID ){
//    				det.disableSave=true;
//    				temp = false;
//    				det.auditDetail.auditStatusId = oldValue;
//    				toaster.warning(det.auditType+' Status should be Completed  to Reopen  ');
//    			}
//        		
        		
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

			//Added by @Ramya on 8-8-2022 for Jira id - IRI-5407
			if(det.carUpdateStatus)
			{
				if(!det.checkFindingClosed() && det.auditDetail.auditStatusId ==det.AppConstant.COMPLETED_AUDIT_STATUS){
					det.auditDetail.auditStatusId=det.AppConstant.COMMENCED_AUDIT_STATUS;
					  toaster.warning('Please close all findings to make '+det.auditType+' completed.');
				}
			}
			//Added by @Ramya for Jira id - IRI-5687
			if(det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS && oldValue==det.AppConstant.COMPLETED_AUDIT_STATUS && (det.userRoleId == det.AppConstant.MANAGER_ROLE_ID || det.userRoleId == det.AppConstant.ADMIN_ROLE_ID)){
				if(det.nextAdtCreated){
					det.auditDetail.auditStatusId = oldValue;
					var warnMsg=(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)?' Inspection ': ((det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID) ?' Audit ' : ' Review ');
				   toaster.warning('Next'+warnMsg+'has been created')
				}
			}
         
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
    		
    		if(item.tcApprovalStatus=="1" || item.tcApprovalStatus=="0"){
    		
    		if(item.tcApprovalStatus=="0" && det.auditCreate){
    		toaster.warning("TC Status is Pending");
    		}
    		console.log('Status');
        	if(det.auditCreate){
        		det.vesselDetail = angular.copy(item);
        		
        		//det.vesselImoNo = {'vesselImoNo':item.vesselImoNo};
        		
        	    det.reasonForVoidShow = true;
        		var flag = det.validateVessel();
        		
        		if(flag){det.lockStatus = true;}else{det.lockStatus = false; det.removeClass(); }
        		
        		det.vesselDetail.vesselTypeName = det.vesselDetail.vesselType ?  det.vesselDetail.vesselType : '';
        	    det.vesselCompanyDtl = angular.copy(item.vesselCompany);   
            	det.vesselCompanyDtl.docType =(det.vesselCompanyDtl.docTypeNo && det.vesselDetail.docTypeNumber ) ? det.vesselCompanyDtl.docTypeNo: ''; //+' '+ det.vesselDetail.docTypeNumber : '';
            	det.vesselCompanyDtl.docExpiry = det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,YYYYMMDD).format(MMMDDYYYY) : '';
            	console.log(det.vesselCompanyDtl);
           	  
           	    if(det.vesselCompanyDtl.docExpiry &&  moment(det.vesselCompanyDtl.docExpiry,MMMDDYYYY).format(YYYYMMDD) < moment(new Date()).format(YYYYMMDD)){
            	  	toaster.warning('DOC has been expired');
            	}
           	    
           	    det.auditDetail.grt = det.vesselDetail.grt;
        	    det.auditDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry? moment(det.vesselDetail.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY):'';
        	    
        		
         
           	}else{
        		
             	var currVslDtl = _.findWhere(det.vesselArray, {'vesselImoNo' : item.vesselImoNo, 'companyId' : Number(det.companyId)});
        		var currCoDtl = _.findWhere(det.companyDetails, {'companyImoNo' : item.companyImoNo, 'companyId' : Number(det.companyId)});
        		if(det.UpdateVesselAvailable){
        			det.vesselDetail = {};
        			det.vesselDetail = angular.copy(item);
        		}
        		else
        			det.vesselDetail = angular.copy(currVslDtl); 
        		if(!det.UpdateVesselAvailable)
        			det.vesselDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry ? moment(det.vesselDetail.dateOfRegistry,'MMM DD, YYYY').format(YYYYMMDD) : '';
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
        	}
       
        	det.vesselDetail.dateOfRegistry = det.vesselDetail.dateOfRegistry ? moment(det.vesselDetail.dateOfRegistry,YYYYMMDD).format(MMMDDYYYY) : '';
   
        	try{
    			det.vesselCompanyDtl.vesselCompanyName = det.vesselCompanyDtl.vesselCompanyName ?  decodeURIComponent(det.vesselCompanyDtl.vesselCompanyName) :'';
				
    			det.vesselCompanyDtl.vesselCompanyAddress = det.vesselCompanyDtl.vesselCompanyAddress ?  decodeURIComponent(det.vesselCompanyDtl.vesselCompanyAddress) :'';
			}
			catch(err){}
			det.vesselCompanyDtl.companyAddressOriginal = det.vesselCompanyDtl.vesselCompanyAddress;
			det.vesselCompanyDtl.companyAddress = det.vesselCompanyDtl.vesselCompanyName+'\n'+det.vesselCompanyDtl.vesselCompanyAddress;
			
			/*det.auditDetail.vesselNameAud =  det.vesselDetail.vesselName ? det.vesselDetail.vesselName : '';
			
			det.auditDetail.vesselTypeAud =det.vesselDetail.vesselTypeName ? det.vesselDetail.vesselTypeName : '';
    		
			det.auditDetail.officialNoAud = det.vesselDetail.officialNo  ?  det.vesselDetail.officialNo: ''; 
    		
			det.auditDetail.docTypeNoAud = det.vesselCompanyDtl.docType  ?  det.vesselCompanyDtl.docType : '';
    		
			det.auditDetail.docIssuerAud = det.vesselCompanyDtl.docIssuer  ?  det.vesselCompanyDtl.docIssuer : '';
    		
			det.auditDetail.docExpiryAud = det.vesselCompanyDtl.docExpiry ? moment(det.vesselCompanyDtl.docExpiry,MMMDDYYYY).format(YYYYMMDD)  : '';
    		
			det.auditDetail.companyAddressAud = det.vesselCompanyDtl.companyAddress ?  det.vesselCompanyDtl.companyAddress  : '';		
			*/
			det.cmpnyAdrs = det.vesselCompanyDtl.vesselCompanyAddress;//vesselCompanyAddress
    		
			det.cmpnyNme = det.vesselCompanyDtl.vesselCompanyName;//vesselCompanyName
    		    		
    		$('#veselimono').removeAttr('data-original-title');
           
            $('#veselimono').tooltip('hide');
           
            if(det.auditCreate){
            	
               det.sspDtlAvl = false;
               det.checkPreviousAuditDetails(); 
             
             }else if(!det.auditCreate && currVslDtl && (currVslDtl.companyImoNo  != item.companyImoNo)){
            	 if(!det.vesselRefreshed){
	            	 det.vesselCompanyDtl.docTypeNo = item.companyDoc;
						
					 det.vesselCompanyDtl.docExpiry = item.docExpiry;
					
					 det.vesselCompanyDtl.docIssuer = item.docIssuer;
					 
					 det.vesselCompanyDtl.docType =item.companyDoc; 
            	 }
				 
			     /*if(det.userRoleId == det.AppConstant.AUDIT_AUDITOR_ROLE_ID && item.docFlag != det.AppConstant.ACCEPTED_DOC_FLAG && det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS){ 
					 
					 det.docChange(det.AppConstant.UPDATE);
				 }*/
             }
            console.log(det.auditDetail)
            if(!det.vesselRefreshed && det.auditDetail.lockStatus!=7 && det.auditDetail.lockStatus!=det.AppConstant.RETRIEVE_STATUS && !det.carUpdateStatus)
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
  
    		detailsFactory.tcApprovalStatus(data,det.companyId,item.vesselImoNo);
    		
    		}
    		if(det.vesselRefreshed)
    			det.saveAuditData('Data saved successfully');
    	}//setvesselImoNo(p1) end
    	
    	/**** check Previous AuditDetails****/
    	function checkPreviousAuditDetails(){
    	
    		/****request to get previous audit/inspection/review details****/
    		detailsFactory.getPreviousAuditDetail(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(res){
    			console.log('getPreviousAuditDetail'); 	console.log(res);
				if(res.carFindMaxStatusDate)
				{
					det.previousAudFindingCarUpdate = true;					//added by @Ramya for jira id - IRI-5361
				}
    			/*detailsFactory.getCompletionDate(det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(completion){

        			var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? completion.completionDate[0].COMPLETION_DATE : '';
					var dateCloseFormat1 = dateCloseFormat ? moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY') : '';
					console.log(dateCloseFormat1)
					sessionStorage.setItem('completionDate',dateCloseFormat1);
				});*/
    			detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
            	        	  
        			response.forEach(function(response){

            			response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
        				
            			try {
    						var auditPlace = response.auditPlace ? atob(response.auditPlace): '-';
    								
    						response.auditPlace = decodeURIComponent(auditPlace);
    					} catch (err) {
    						console.log(err);
    								
    					}
            		});
        			if(response){
        			det.LetterHistoryDetails=response;
        			}
        			det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
    					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
    				});
					//Added by @Ramya on 14-10-2022 for jira id - IRI-5501
        			response = response.filter(function( obj ) {
                        return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
                    });
					//Added by @Ramya on 10-8-2022 for jira id - IRI-5403
					det.reviewerAvl = false;
					response = _.sortBy(response, "auditSeqNo");
					if (response.length>0){
						if (response[response.length - 1].auditAuditorDetail && response[response.length - 1].auditAuditorDetail.length > 1) {
							response[response.length - 1].auditAuditorDetail.forEach(function (auditors) {
								if (auditors.auditRoleID == det.AppConstant.AUDIT_REVIEWER_ROLE_ID) {
									det.reviewerAvl = true;
								}
							});
						}
					}
    				console.log(det.auditSeqNo)
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
             	
             	/*if(res.prevAuditDtl.length>0 && res.prevAuditDtl[0].auditStatusId==det.AppConstant.REOPEN){
    				toaster.warning('Previous Audit has Reopend')
    				$timeout(function(){
        				
        				det.vesselImoNo = '';
        					
        				det.vesselDetail = {};
        			        	
        			    det.vesselCompanyDtl = {};
        						
        				},0)
    			}*/
    			
				
				
    			
        		/*
    			if( res.prevAuditDtl.length >1 && (res.prevAuditDtl[0].auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || res.prevAuditDtl[0].auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID) && res.initalCount==0 )
    			{        
    			det.dirInterAndAdditionalAudit =true;
    			}*/
    			console.log(res);
    			
    			
    			//det.dateFormatConversionPreAudit(res.prevAuditDtl,YYYYMMDD);
    		
    			if(res.prevAuditDtl.length == 1){
    				/*if(res.prevAuditDtl[0].auditTypeId == det.AppConstant.SSP_TYPE_ID)
    				{	
    				det.sspIssueDate = 'Amendment Issue Date';
    				
    				det.revsionNo = 'Amendment Revision No.'
    				}*/
    			}
    			
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
				//added by @Ramya for Jira id - IRI-5509
				if((moment(res.carFindMaxStatusDate)._f)!="YYYY-MM-DD"){
					var carFindMaxStatusDate_dateconversion = new Date(res.carFindMaxStatusDate).toLocaleDateString('es-CL');
					carFindMaxStatusDate_dateconversion=moment(carFindMaxStatusDate_dateconversion,DDMMYYYY).format("YYYY-MM-DD");
					res.carFindMaxStatusDate = carFindMaxStatusDate_dateconversion;
				}
    			det.carFindMaxStatusDate =res.carFindMaxStatusDate? res.carFindMaxStatusDate:'';
    			
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
    				//det.disableCertIssueExpiry= false; 
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
    				det.sspDmlcRevisionNo = res.prevAuditDtl.length+1;
    				
    					}
    			else if(res.prevAuditDtl.length > 0){
    				det.sspDmlcRevisionNo = res.prevAuditDtl.length;
    				console.log(det.sspDmlcRevisionNo);
    			}
			
				
    			if(res.prevAuditDtl.length > 0){
    				res.prevAuditDtl = _.sortBy(res.prevAuditDtl, 'auditSeqNo');
					res.prevAuditDtl.reverse();
    				var prevAuditReopen    =  _.findWhere(res.prevAuditDtl, {'auditStatusId' : det.AppConstant.REOPEN});
    				
    				var seqNo =	(res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length >0 ) ?  _.max(res.prevAuditDtl[0].certificateDetail, function(find){  return   find.seqNo; }) : '';
	         	    var  previosAuditpublishStatus = (res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length >0 ) ?  _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('publishStatus').toString() : 1;
	         	    var  auditSubTypeId = (res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length > 0) ? _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('auditSubTypeId').toString() : '';
    				//Added by @Ramya on 10-8-2022 for jira id - IRI-5403
					if ((res.prevAuditDtl[0].auditStatusId==det.AppConstant.COMPLETED_AUDIT_STATUS && (((res.prevAuditDtl[0].reviewStatus==3 || res.prevAuditDtl[0].reviewStatus==0)) || res.prevAuditDtl[0].allowNext==0)) || 
					(res.prevAuditDtl[0].auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS && ((res.prevAuditDtl[0].leadSign && res.prevAuditDtl[0].reviewStatus==0) || !res.prevAuditDtl[0].leadSign))) {
						var auditorType= (det.auditType=='Audit')?'Auditor': (det.auditType=='Review'? 'Reviewer': 'Inspector');										//changed by @Ramya on 18-08-2022 for jira id - IRI-5428
						toaster.warning('Previous ' + det.auditType + ' has not been signed off/initiated by Lead '+auditorType+'');
			
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
        				
        				/*det.sspApproveLetter = det.previousAudit.certificateNo.split('-')[0];
        				
        				if(det.auditTypeId == det.AppConstant.SSP_TYPE_ID)
        				{
        					
        					det.previousInitialSspSeqNo = res.prevAuditDtl[res.prevAuditDtl.length -1].auditSeqNo;
        					
        				}*/
        				
        				
        				if(det.previousAudit.companyImoNo != det.vesselCompanyDtl.companyImoNo){
        					
        					det.docChange(det.AppConstant.CREATE);
        				}
        				
        				/***  getting certificate issue and expiry date for Intermediate/Additional as of just previous Fullterm certificate ***/
        				
        			    var  certIssue = (res.prevAuditDtl[0] && res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length >0 ) ?  _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString() : '';
    	         	    var  extendedIssue = (res.prevAuditDtl[0] && res.prevAuditDtl[0].certificateDetail && res.prevAuditDtl[0].certificateDetail.length > 0) ? _(res.prevAuditDtl[0].certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString() : '';

        				if(det.prevInitialOrRenewal){
        					
        					det.previousAudit.utn = det.prevInitialOrRenewal.utn;
        					
        					det.previousAudit.certExpireDate = det.prevInitialOrRenewal.certExpireDate;
        					
        				
        					/*if(det.auditTypeId==det.AppConstant.ISPS_TYPE_ID && prevIntermediate){
            					
        						det.previousAudit.certExpireDate = Number(prevIntermediate.certificateNo) > Number(det.prevInitialOrRenewal.certificateNo)  ? prevIntermediate.certExpireDate : det.prevInitialOrRenewal.certExpireDate;
            				}*/
        					
        					det.prevActiveCert = _.findWhere(det.prevInitialOrRenewal.certificateDetail, {'activeStatus' : 1});
        		    		
        				}else{
        					det.prevActiveCert = _.findWhere(det.previousAudit.certificateDetail, {'activeStatus' : 1});
        		    	}
        				
        				/***** getting minimum date for current Audit/Inspection/Review *****/
        				
        				if(det.carFindMaxStatusDate && det.auditCreateUpdate == det.AppConstant.CREATE  && (det.carFindMaxStatusDate > det.previousAudit.auditDate)){
        					 toaster.warning('Please note recent updated CAR Findings Status date was on ' + moment(det.carFindMaxStatusDate,YYYYMMDD).format(MMMDDYYYY) );
     						
            				//det.auditMinDate = moment(moment(det.carFindMaxStatusDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
            				
            			}
						//Added by @Ramya on 10-8-2022 for jira id - IRI-5403
						$timeout(function(){										//changed by @Ramya on 19-08-2022 for jira id - IRI-5433
							if (res.prevAuditDtl[0].leadSign && det.reviewerAvl) {
								if (res.prevAuditDtl[0].reviewerSign == null || (res.prevAuditDtl[0].auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS && res.prevAuditDtl[0].leadSign && res.prevAuditDtl[0].reviewStatus==1)) {
									console.log("asasas")
									toaster.warning('Previous ' + det.auditType + ' has not been signed off/reviewed by Reviewer');
								}
							}
							},0);
            				//det.setAudMin ='';// extendedIssue && extendedIssue > certIssue ? extendedIssue : certIssue;
            				det.setAudMin = det.previousAudit.auditDate  ? det.previousAudit.auditDate : det.setAudMin;  
            				det.auditMinDate = det.setAudMin ? moment(moment(det.setAudMin,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate ;
            			
            			
        				
        				if(det.previousAudit.closeMeetingDate && (det.previousAudit.closeMeetingDate > det.auditMinDate)){
        					
            				//det.auditMinDate = moment(moment(det.previousAudit.closeMeetingDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
            			}
        				
        				
        				det.auditMinDate = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[0].auditDate && det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
        				
        				det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
        				det.minAuditDatePer = det.auditMinDate;
        				det.receiptMaxDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):det.auditMinDate;
        				det.creditMinDate =det.previousAudit.creditDate ? moment(det.previousAudit.creditDate,YYYYMMDD).add(1,'days').format(YYYYMMDD):'';
        				
        				if(det.auditTypeId == det.AppConstant.SSP_TYPE_ID || det.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
        		    	
        					det.enableAuditSubType = [det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID];
        				
        				}else{
        					
        					var tempPreviousAuditSubType = det.previousAudit.auditSubTypeId;
        				
        					det.previousAudit.auditSubTypeId = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[det.previousAuditSuspendata.length-1].auditSubTypeId ) ? det.previousAuditSuspendata[det.previousAuditSuspendata.length-1].auditSubTypeId : det.previousAudit.auditSubTypeId;
        					
        					/****setting current subtype as of previous subtype****/
        					if(det.previousAudit.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){
        				
        						if(det.auditTypeId == det.AppConstant.ISPS_TYPE_ID || det.auditTypeId == det.AppConstant.ISM_TYPE_ID){
        						    det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID];
            					}else if(det.auditTypeId == det.AppConstant.MLC_TYPE_ID){
            						det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
            					}else{
            						det.enableAuditSubType = [det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID];
            					}
        					}else if (det.previousAudit.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID){
        						
        						det.enableAuditSubType = [det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
        						
        					}else if (det.previousAudit.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
        							
        						det.enableAuditSubType = [det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
        						
        					}else if (det.previousAudit.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
        						
        						det.enableAuditSubType = [det.AppConstant.RENEWAL_SUB_TYPE_ID];
        						
        						if(det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0 ){ 
        							det.previousAudit.certificateDetail.forEach(function(index){ 
        								if(index.certIssueId == det.AppConstant.FULL_TERM_CERT){
        									det.fullTermIs = true; console.log(index);
        									det.enableAuditSubType = [det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
        								}
        							});
        						}
        						
        						
        					}else if (det.previousAudit.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
        						
        				
        						if(prevIntermediate.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){ 
        						
        							det.enableAuditSubType = [det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID];
                					
                				}else{ 
                					det.enableAuditSubType = [det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
                    	        }
        				
        					}
        					/* after full term setting audit type and cerifictae issue ids */
        					if(det.previousAudit.auditSubTypeId != det.AppConstant.INTERIM_SUB_TYPE_ID){
        						if(det.prevInitialOrRenewal && det.prevInitialOrRenewal.certificateDetail && det.prevInitialOrRenewal.certificateDetail.length > 0 ){ 
        							det.prevInitialOrRenewal.certificateDetail.forEach(function(index){ 
        								if(index.certIssueId == det.AppConstant.FULL_TERM_CERT){
        									det.fullTermIs = true;
        									det.enableAuditSubType = [det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
        									if(index.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID){
        										det.enableAuditSubType = [det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
        									}
        									if(det.previousAudit.auditSubTypeId > det.AppConstant.INITIAL_SUB_TYPE_ID){
        										det.enableAuditSubType = [det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];	
        									}
        								}
        							});
        						}
        						
        						
        						if(det.prevRenewal && det.prevRenewal.certificateDetail && det.prevRenewal.certificateDetail.length > 0 ){ 
        							det.prevRenewal.certificateDetail.forEach(function(index){ 
        								if(index.certIssueId == det.AppConstant.FULL_TERM_CERT){
        									det.fullTermIs = true;
        									det.enableAuditSubType = [det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.RENEWAL_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
        								}
        							
        							
        							});
        						}
        						console.log(det.enableAuditSubType);
        						
        						if(det.dirInterAndAdditionalAuditData && det.dirInterAndAdditionalAuditData.certificateDetail && det.dirInterAndAdditionalAuditData.certificateDetail.length > 0){
        							det.fullTermIs = true; 
        						}
        					}
        					
        					if((initalCount == 0 && renewalCount == 0)  && det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID && !det.dirInterAndAdditionalAudit){
        						det.enableAuditSubType.push(det.AppConstant.INITIAL_SUB_TYPE_ID);
        	    			}
        					
        					 det.previousAudit.auditSubTypeId = tempPreviousAuditSubType;
        				}
        		    	
        		    	detailsFactory.getPrevFinding(det.auditDetail.auditTypeId,det.vesselDetail.vesselImoNo,det.companyId,det.vesselCompanyDtl.companyImoNo,det.vesselCompanyDtl.docTypeNo).$promise.then(function(response) {
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
    				
    				det.enableAuditSubType = (det.auditTypeId == det.AppConstant.SSP_TYPE_ID || det.auditTypeId == det.AppConstant.DMLC_TYPE_ID) ? [det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID] : [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID,det.AppConstant.INTERMEDIATE_SUB_TYPE_ID,det.AppConstant.ADDITIONAL_SUB_TYPE_ID];
    				
    				det.receiptMaxDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):det.auditMinDate;
    		    	
    				$timeout(function(){
            			$('#auditType').focus();
            		},0);
    				
    			}  
    		}
    			
    			/** MLC Additional follwed by interim **/
    			if(res.prevAuditDtl && res.prevAuditDtl.length > 1 && det.auditTypeId == det.AppConstant.MLC_TYPE_ID ){ 
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
					if (fromState.name == "app.certificate.details") {
						event.preventDefault();								// Changed by @Ramya on 16-11-2022 for jira id - IRI-5542
					}
					else if(fromState.url=='/details' && !toState.url=='/details'){
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
						
					}else if(fromState.url=='/findings'){		// Changed by @Ramya on 15-11-2022 for jira id - IRI-5542
						event.preventDefault();
					}
					else if(fromState.url=='/previous-findings'){
						event.preventDefault();
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
        	
        	detailsFactory.getPreviousAuditDetail(det.auditTypeId,res.vesselImoNo,det.companyId).$promise.then(function(result){ console.log(result);
        	console.log('getPreviousAuditDetail');
			if(result.carFindMaxStatusDate)
			{
				det.previousAudFindingCarUpdate = true;				//added by @Ramya for jira id - IRI-5361
			}
        	/*detailsFactory.getCompletionDate(det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(completion){

    			var dateCloseFormat=completion.completionDate[0].COMPLETION_DATE ? completion.completionDate[0].COMPLETION_DATE : '';
				var dateCloseFormat1 = dateCloseFormat ? moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY') : '';
				console.log(dateCloseFormat1)
				sessionStorage.setItem('completionDate',dateCloseFormat1);
			});*/
        	det.notApprovedPrevAudit=false;
            var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
            
        		var leadEmail=leadDetail.userId;
        		
        		det.leadEmail=leadEmail;
	
        		var seqNo ='',extensionIssueDate ='',extensionexpiryDate ='';
            		
        		if(result.$resolved==true){
            		
            		detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
            		
        		
        		
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
        		
        		
        				det.LetterHistoryDetails=angular.copy(response);	
        				console.log(det.LetterHistoryDetails)
        				det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
        					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
        				});
        				
        				
        				console.log(det.auditSeqNo)
        				
        				setVesselLetterHist(det.auditSeqNo,response);
        				
        		
        				if(result.prevAuditDtl.length >0){
        					    det.previousAuditCertDetails = (result.prevAuditDtl.length >1 && result.prevAuditDtl[1] ) ? angular.copy(result.prevAuditDtl[1].certificateDetail):'';
        					    det.previousAuditSuspendata = result.prevAuditDtl.filter(function( obj ) {
            					  return ( obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY && det.auditDetail.auditSeqNo != obj.auditSeqNo && obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS ) ;
            				  });
        					    
        					    det.auditMinDate = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[0].auditDate && det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;		    
                 					det.minOpenMeetingDate =  det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
									 if(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){

										det.receiptMinDate=det.auditMinDate;
									 }
                 				 
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
        					det.setNextAuditData();
        					
        					if((result[0].allowNext==0) && (result[0].reviewerSign==null)) {        						
        						det.nextCreatedBlockFinding = true;
        					}
        					
        					/*IRI-4423*/
        					for(var j=0; j<result.length-1; j++) {
        						if(result[j].allowNext==0) {
            						det.lockStatus = false;
            						// det.enabled = false;			//commented by @Ramya for Jira id - IRI-5674
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
        					for(var i=0; i<result.length;i++){
					
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
    			
        					/*	
    					if((det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID == det.auditDetail.auditSubTypeId) && (det.auditTypeId == det.AppConstant.SSP_TYPE_ID))
    					{
    					det.previousInitialSspSeqNo = result[result.length -1].auditSeqNo;
    					}
    				
    					det.sspApproveLetter = det.previousAudit.certificateNo.split('-')[0];*/
//    				
//        					if(det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0) {
//        						
//        						var seqNo =	  _.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; });	
//    		      				det.auditMinDate  = (seqNo &&   (seqNo.extendedIssueDate > det.previousAudit.auditDate  )) ? moment(moment(seqNo.extendedIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : 	det.auditMinDate;
//    		      				det.auditMinDate = (seqNo  &&  (seqNo.certIssueDate > det.previousAudit.auditDate  )) ? moment(moment(seqNo.certIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : 	det.auditMinDate;
//        					}
//    				
    				
        					/***  getting certificate issue and expiry date for Intermediate/Additional as of just previous Fullterm certificate ***/
				
        					if(det.prevInitialOrRenewal){
    					
        						det.previousAudit.certExpireDate = det.prevInitialOrRenewal.certExpireDate;
    			
        						/*if(det.auditTypeId==det.AppConstant.ISPS_TYPE_ID && prevIntermediate){
        					
    							det.previousAudit.certExpireDate = Number(prevIntermediate.certificateNo) > Number(det.prevInitialOrRenewal.certificateNo)  ? prevIntermediate.certExpireDate : det.prevInitialOrRenewal.certExpireDate;
        					}*/
        						det.prevActiveCert = _.findWhere(det.prevInitialOrRenewal.certificateDetail, {'activeStatus' : 1});
    		    		
        					}else{
        						det.prevActiveCert = _.findWhere(det.previousAudit.certificateDetail, {'activeStatus' : 1});
        					}
    				
    				
        					/**getting Audit/Inspection/Review minimum date	as of previous date and Findings updated in Car Maintenance screen**/
    				
        					if(det.carFindMaxStatusDate && det.auditCreateUpdate == det.AppConstant.CREATE  && (det.carFindMaxStatusDate > det.previousAudit.auditDate)){
    				           toaster.warning('Please note recent updated CAR Findings Status date was on ' + moment(det.carFindMaxStatusDate,YYYYMMDD).format(MMMDDYYYY) );
        						//det.auditMinDate = moment(moment(det.carFindMaxStatusDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
    				
        					}
    			
        						det.auditMinDate = (det.previousAudit.auditDate && det.previousAudit.auditDate ) > det.auditMinDate ? moment(moment(det.previousAudit.auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate;
								det.receiptMinDate=det.auditMinDate;
        					
        					 if(det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0){
        		      				var preAuditMinDate = det.auditMinDate;
        		      				var seqNo =	  _.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; });	
        		      				//det.auditMinDate  = (seqNo && det.previousAudit &&  (seqNo.extendedIssueDate > det.previousAudit.auditDate  )) ? moment(moment(seqNo.extendedIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : 	det.auditMinDate;
        		      				det.auditMinDate = (preAuditMinDate > det.auditMinDate) ? preAuditMinDate : det.auditMinDate;
        		      				
        		      				if(seqNo && det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID && seqNo.certIssueId==det.AppConstant.RE_ISSUE) {
        		      					//det.auditMinDate = (det.previousAudit &&  seqNo.extendedIssueDate) ? preAuditMinDate : det.auditMinDate;
        		      					det.minOpenMeetingDate =  det.auditMinDate;
        		      					det.minCloseMeetingDate = det.auditMinDate;
        		      					det.minDateReissueAdditional = true;
        		      				}
        					 }
        					//if(det.previousAuditSuspendata.auditSummaryId==det.AppConstant.NOT_APPROVED_SUMMARY)
        					det.auditMinDate = (det.previousAuditSuspendata.length >0 && det.previousAuditSuspendata[0].auditDate && det.auditMinDate <  moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) ) ? moment(moment( det.previousAuditSuspendata[0].auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
							det.receiptMinDate=det.auditMinDate;
        					 var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';	
        					//det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;

         					if(det.auditTypeId != det.AppConstant.DMLC_TYPE_ID ){
             					det.minOpenMeetingDate =   det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
             					
         					}else{
         						det.minOpenMeetingDmlc = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
         					}
        					det.receiptMaxDate = (det.auditDetail.auditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID)  ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD): (det.auditDetail.auditSubTypeId!=det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID ||det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) ) ? det.auditMinDate:det.receiptMaxDate;
    		              //** setting amendement recipt leter generation based on auditDate**//
        					if( !det.auditDetail.auditDate && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID ||det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)){
    		            	   det.receiptMinDate = det.auditMinDate ? det.auditMinDate : det.receiptMinDate; 
    		               }
        					/*** setting minimum date for ADDITIONAL_SUB_TYPE and INTERMEDIATE_SUB_TYPE i.e in between previous Fullterm certificate issue - expire ***/
        					if(res.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || res.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
        			
        						if(det.previousAudit && res.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS){
        							//det.auditDetail.certExpireDate = moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
        						}
    					
        						var temp ='';// (res.certIssueDate && !det.minDateReissueAdditional) ? moment(res.certIssueDate,YYYYMMDD).format(YYYYMMDD):'';
    		
        						//det.maxCloseMeetingDate = res.certExpireDate ?moment(res.certExpireDate,YYYYMMDD).format(YYYYMMDD) : '';
    				
        						det.minOpenMeetingDate = det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate; 
        						det.minOpenMeetingDate = det.minOpenMeetingDate > temp ? det.minOpenMeetingDate : temp ;
        						det.maxOpenMeetingDate = det.auditMaxDate? det.auditMaxDate : det.maxOpenMeetingDate;
        				
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
        		    				 
        		    				 det.auditMinDate = ( det.previousAudit.auditDate   && det.prevInitialOrRenewal && det.previousAudit.auditDate > det.prevInitialOrRenewal.auditDate && det.previousAudit.auditDate  != det.prevInitialOrRenewal.auditDate) ? moment(moment(det.previousAudit.auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate;
        		     			    
        		    				 
        						    det.auditMaxDate = det.auditMinDate ? moment(moment(det.auditMinDate,YYYYMMDD).add(3,'year')).format(YYYYMMDD) :  det.auditMaxDate; 
        		    			    det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
        		    			    det.maxOpenMeetingDate  =  det.auditMaxDate ?  det.auditMaxDate : det.maxOpenMeetingDate;
        		    			    det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.maxCloseMeetingDate;
        		    			    det.maxCloseMeetingDate =  det.auditMaxDate ?  det.auditMaxDate : det.maxCloseMeetingDate;
        		    			    
        		    			    det.firstIntermeadite = ( det.auditMinDate > preAuditMidate ) ? true : false;
        		    			}
        		    			
        						
        						det.maxCloseMeetingDate = (det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID &&  extensionexpiryDate ) ? moment(extensionexpiryDate,YYYYMMDD ).format(YYYYMMDD)   : det.maxCloseMeetingDate;
        					
        					} if(det.prevInitialOrRenewal  && det.prevInitialOrRenewal.certificateDetail.length > 0 && ( (det.auditDetail.auditSubTypeId ==1003 || det.auditDetail.auditSubTypeId ==1005) || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && (det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED2)))){
								if(det.prevInitialOrRenewal.auditSeqNo<det.auditDetail.auditSeqNo){
									var certIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueDate').toString();
									var certExpireDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certExpireDate').toString();
									var extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
									var extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
									det.auditDetail.certIssueDate  = extensionIssueDate ? moment(extensionIssueDate,YYYYMMDD).format(MMMDDYYYY) : certIssueDate ? moment(certIssueDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certIssueDate ;
									det.auditDetail.certExpireDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY) : certExpireDate ?  moment(certExpireDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
								
							}
								var seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){ return  find.seqNo; });
							
								if(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
								det.additionalEndorsedCertificate = angular.copy(seqNo);
								}	
								if(res.certificateDetail.length>0 && res.certificateDetail[0].extendedExpireDate) {
									var seqNo =	_.max(res.certificateDetail, function(find){ return  find.seqNo; });
									  det.auditDetail.certExpireDate = seqNo.extendedExpireDate ? moment( seqNo.extendedExpireDate ,YYYYMMDD).format(MMMDDYYYY) : seqNo.certExpireDate ? moment( seqNo.certExpireDate ,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
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
    				
        					 det.receiptMaxDate = (det.auditDetail.auditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID) ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMinDate;
        				}
        				
        				 
        			
        				 det.creditMinDate =det.previousAudit.creditDate ? moment(det.previousAudit.creditDate,YYYYMMDD).add(1,'days').format(YYYYMMDD):'';
        				 
        				 if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID){
        	    				
        	    				detailsFactory.getDMLCReportNos(det.vesselImoNo.vesselImoNo,det.companyId, det.auditDetail.auditTypeId).$promise.then(function(res){
        	    					
        	    					det.dMLCReportNos = angular.copy(res);
        	        				console.log(det.dMLCReportNos);	
        	        				if(det.dMLCReportNos.length>0){
	        	        				det.auditDetail.sspReviewDetail[0].dmlcIssuedDate =  det.dMLCReportNos[0].dmlcissuedate ? det.dMLCReportNos[0].dmlcissuedate : '';
	        	        				det.auditDetail.sspReviewDetail[0].dmlcAuditPlace = det.dMLCReportNos[0].dmlcissueplace ? det.dMLCReportNos[0].dmlcissueplace : '';
        	        				}
        	        				/*if(det.dMLCReportNos[0]){
        	            				detailsFactory.getDMLCLocationDate(det.dMLCReportNos[0].vesselImoNo,det.dMLCReportNos[0].companyId).$promise.then(function(res){
        	            					if(res.placeLocation[0]){
        	            					sessionStorage.setItem('dmlcLocation',res.placeLocation[0].AUDIT_PLACE ? res.placeLocation[0].AUDIT_PLACE : res.placeLocation[0].DMLCII_ISSUE_LOCATION);
        	            					var dateCloseFormat=res.placeLocation[0].CLOSE_MEETING_DATE ? res.placeLocation[0].CLOSE_MEETING_DATE : res.placeLocation[0].DMLCII_ISSUE_DATE;
        	            					var dateCloseFormat1 = moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY');
        	            					sessionStorage.setItem('dmlcIssueDate',dateCloseFormat1);
        	            					console.log(sessionStorage.getItem('dmlcIssueDate'));
        	            					}
        	            				});
        	            			}else{
        	            					sessionStorage.setItem('dmlcLocation','');
        	            					sessionStorage.setItem('dmlcIssueDate','');
        	            			}*/
        	    				});
        	    				
        	    				if(det.auditDetail.sspReviewDetail.length > 0 && det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo){
        	    				
        	    					detailsFactory.getFindingData(det.AppConstant.DMLC_TYPE_ID,det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo,det.companyId).$promise.then(function(data){
        	    						console.log(data);	
        	    						det.dmlcFindingAray = angular.copy(data);
        	    	        			var showMsg = true;
										var completedNoteCount=0;							//added by @Ramya for Jira id - IRI-5643
        	    	        			det.dmlcFindingAray.forEach(function(finding){
        	    	        				
        	    	        				finding.findingDetail.forEach(function(status){
        	    	        					
        	    	        					if(status.currentAuditSeq == det.auditSeqNo){
        	    	        						
        	    	        						det.dmlcUpdated = true;
        	    	        					}
        	    	        					
        	    	        					if(showMsg && status.statusSeqNo==2  && det.previousAudit && status.currentAuditSeq == det.previousAudit.auditSeqNo){
        	    	        						showMsg = false;
        	    	        						toaster.info('The linked DMLC II Review has been closed as part of MLC '+ det.previousAudit.audSubTypeDesc +' Inspecion');
        	    	        					}

												if(status.currentAuditSeq != det.auditSeqNo && status.nextActionId==1010)
													completedNoteCount++;
        	    	        				});
        	    	        			});
										det.disableDmlcNote =(completedNoteCount==det.dmlcFindingAray.length)?false:true;		//added by @Ramya for Jira id - IRI-5643
        	    	        		});
        	    				}
        	    			}
        				 det.minOpenMeetingDate =  det.auditMinDate;
        			});
        		}
        		
        		
        		
              
        	});
        	
        		
        	det.auditDetail = angular.copy(res);
        	
        	det.auditDetailOrg =  angular.copy(res);
        	
        	if(det.prevInitialOrRenewal && det.prevInitialOrRenewal.certificateDetail.length > 0 && ( det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID )){ 
        	
        		var seqNo =	_.max(det.prevInitialOrRenewal.certificateDetail, function(find){ return  find.seqNo; });
        	    var extensionIssueDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
        		var extensionexpiryDate = _(det.prevInitialOrRenewal.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
        		
        		det.auditDetail.certIssueDate  = extensionIssueDate ? extensionIssueDate : (det.prevInitialOrRenewal.certificateDetail[0].certIssueDate) ? det.prevInitialOrRenewal.certificateDetail[0].certIssueDate : det.auditDetail.certIssueDate;
        		det.auditDetail.certExpireDate = extensionexpiryDate ? extensionexpiryDate : (det.prevInitialOrRenewal.certificateDetail[0].certExpireDate ) ? det.prevInitialOrRenewal.certificateDetail[0].certExpireDate : det.auditDetail.certExpireDate ;
        	}
        	
        	if(res.certificateDetail && res.certificateDetail.length > 0 && ( det.auditDetail.auditSubTypeId!=det.AppConstant.ADDITIONAL_SUB_TYPE_ID && det.auditDetail.auditSubTypeId!=det.AppConstant.INTERMEDIATE_SUB_TYPE_ID )){ 
        		
            		var seqNo =	_.max(res.certificateDetail, function(find){ return  find.seqNo; });
            	    var extensionIssueDate = _(res.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
            		var extensionexpiryDate = _(res.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
            		
            		det.auditDetail.certIssueDate  = extensionIssueDate ? extensionIssueDate : (res.certificateDetail[0].certIssueDate) ? res.certificateDetail[0].certIssueDate : det.auditDetail.certIssueDate;
            		det.auditDetail.certExpireDate = extensionexpiryDate ? extensionexpiryDate : (res.certificateDetail[0].certExpireDate ) ? res.certificateDetail[0].certExpireDate : det.auditDetail.certExpireDate ;
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
    			det.leadSignChanges = respuser[0].signature ;
				det.leadTitalChanges = respuser[0].title /** IRI-5245 added by kiran  */ 
        		if(respuser[0] && respuser[0].region !== Number(det.managerRegion)){
        			
        			//det.lockDisabled = true;
        		}
    		});
    		
    		det.auditDetail.certificateData = angular.copy(res.certificateDetail);
        	
        	det.auditDetailBeforeUpdate = angular.copy(res);
        	
        	
    		det.openMeetingDatevalue=det.auditDetailBeforeUpdate.openMeetingDate;
    				
    		det.closeMeetingDatevalue=det.auditDetailBeforeUpdate.closeMeetingDate;
    		
    		det.auditPlacevalue=det.auditDetailBeforeUpdate.auditPlace;
    		
    		det.summaryvalue=det.auditDetailBeforeUpdate.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY;
    		
    		det.certIssueVal=det.auditDetailBeforeUpdate.certIssueDate;
    		
    		det.certExpireVal=det.auditDetailBeforeUpdate.certExpireDate;
        	
        	/*if(det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID){
				
				detailsFactory.getSSPRevisionNo(det.auditDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId,det.auditDetail.auditSeqNo).$promise.then(function(res){
	    			
	    			det.auditDetail.sspReviewDetail.push({
    				   
       			   	'sspRevisionNo' : (res.count < 10) ? '0'+res.count : res.count,
					});
	    			
	    		});
			}*/
        	
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
			
//			if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID){
//				
//				detailsFactory.getDMLCReportNos(det.vesselImoNo.vesselImoNo,det.companyId, det.auditDetail.auditTypeId).$promise.then(function(res){
//					
//					det.dMLCReportNos = angular.copy(res);
//				});
//				
//				if(det.auditDetail.sspReviewDetail.length > 0 && det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo){
//				
//					detailsFactory.getFindingData(1005,det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo,det.companyId).$promise.then(function(data){
//						console.log(data);	
//						det.dmlcFindingAray = angular.copy(data);
//	        			
//	        			det.dmlcFindingAray.forEach(function(finding){
//	        				
//	        				finding.findingDetail.forEach(function(status){
//	        					
//	        					if(status.currentAuditSeq == det.auditSeqNo){
//	        						
//	        						det.dmlcUpdated = true;
//	        					}
//	        					console.log(status); console.log(det.previousAudit );
//	        					if(status.statusSeqNo==2  && status.currentAuditSeq == det.previousAudit.auditSeqNo){
//	        						
//	        						toaster.info('The linked DMLC II Review has been closed as part of MLC '+ det.previousAudit.audSubTypeDesc +' Inspecion');
//	        					}
//	        				});
//	        			});
//	        		});
//				}
//			}

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
    			
    			if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID ||det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID))
    				 {
    				
    				det.disabledApproveButton = (det.auditDetail.auditSummaryId == 1005)? true : false;
				
				 }
    		}
    	
    	/*	det.sspApproveLetter = res.certificateNo;*/
			
    		
    		det.certificateVer = res.certificateVer;
    		
    		det.auditDetail.auditAuditorDetail.forEach(function(a){
    			
    			if(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID || det.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
    	    		
    	    		if(a.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID){
    	    				a.auditRoleDesc = det.AppConstant.INSPECTOR;
    	    		}
    	    	}
    			
    			if(a.audLeadStatus==1 && a.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID ){
	    			
	    			a.auditRoleDesc = (det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID || det.auditTypeId==det.AppConstant.DMLC_TYPE_ID)? 'LEAD '+ det.AppConstant.INSPECTOR:'LEAD '+det.AppConstant.AUDITOR;
	    		}
	    		
    			a.check = false;
    			a.audSignature = a.audSignature?atob(a.audSignature):'';

    			a.audSignatureDate =  a.audSignatureDate ? moment(a.audSignatureDate,YYYYMMDD).format(MMMDDYYYY) : moment(new Date()).format(MMMDDYYYY);
    		if(a.auditRoleID == 1002 && a.userId==det.loginUserId){
    			toaster.clear();
    			
    			det.disableLockObserverLogIn = true; 
    		}
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
    	
    		det.setSummaryAndDueDate();
    		
    		det.setPrevFindingsRecords();
    		
    		
    		if((det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)|| (det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID) ){
    			
    			//det.certiletter   = 'Review Letter';
    			if(det.auditDetail.auditSubTypeId == det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
    				
    				    det.certiRecieptLetter = 'Receipt Letter';
    					det.auditDetail.certExpireDate=  (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.certExpireDate=='') ? 'N/A' : det.auditDetail.certExpireDate;
    			
    			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
    				
    					det.auditDetail.certExpireDate=  (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.certExpireDate=='') ? 'N/A' : det.auditDetail.certExpireDate;	
    					
    					det.certiRecieptLetter = 'Amendment Receipt Letter';
    					
    					if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID){
    	    				
    						det.summaryHead='The undersigned has carried out the Ship Security Plan (SSP) Amendment review for and on behalf of the Government of the Republic of the Marshall Islands (RMI) for compliance with the International Code for the Security of Ships and Port Facilities (ISPS Code), Part A and the provisions of ISPS Code B/8.1 to B/13.8 as appropriate for the ship; ';
    						
    						det.apreAmendletter = 'Amendment Approval Letter';
    	    			}else{
    	    				
    	    				det.apreAmendletter = 'Amendment Review Letter';
    	    			}
    					
    			}
    		}            
    		
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
    			if(det.carUpdateStatus && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID ){
    				toaster.warning('Findings are updated through CAR');
    			} else if(det.carUpdatedInMlc && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
    				toaster.warning('Review Notes are updated in MLC Inspection');
    			}
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
        	
        	
        	detailsFactory.getReportType(det.auditDetail.auditTypeId,det.companyId,det.auditDetail.auditSubTypeId).$promise.then(function(res) { 
       			console.log(res);
       			
       			det.reportTypes=res;
       			det.reportTypes = _.sortBy(det.reportTypes, 'attachmentTypeId');	
        	});
    	}//end of function setAuditData()
        
        function setVesselLetterHist(auditseqno,response){
			// <-- IRI-5128
			response.forEach(function(response){
				response.certIssueDate = moment(response.certIssueDate).format(MMMDDYYYY);
				try {
					var auditPlace = response.auditPlace ? atob(response.auditPlace): '-';
							
					response.auditPlace = decodeURIComponent(atob(auditPlace));			//changed by @Ramya for jira id- IRI-5529
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
			});


        	
        	
        }
        
        /********** for setting previous finding records **********/

        function setPrevFindingsRecords(){ 
        	
        	var auditDate = det.auditDetail.auditDate?moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
    		
        	if(auditDate){
    		detailsFactory.getPrevFindingDetails(det.auditDetail.auditTypeId,auditDate,det.vesselImoNo.vesselImoNo,det.auditDetail.auditSeqNo,det.auditDetail.companyId,det.vesselCompanyDtl.companyImoNo,det.vesselCompanyDtl.docTypeNo).$promise.then(function(res){
    			
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
        		
        		if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
                	obj.openMeetingDate = obj.openMeetingDate?moment(obj.openMeetingDate,formPattern).format(toPattern):'';	
        		}else{
        			obj.openMeetingDate = obj.openMeetingDate?moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern+HHmm):'';
        		}
        		
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
        		
            	obj.dateIns = obj.dateIns?moment(obj.dateIns,formPattern).format(toPattern):'';
            	
            	obj.dateOfRegistry = obj.dateOfRegistry?moment(obj.dateOfRegistry,formPattern).format(toPattern):'';
    			
        		obj.creditDate = obj.creditDate?moment(obj.creditDate,formPattern).format(toPattern):'';
        		
        		obj.creditDateFromCyle = obj.creditDateFromCyle?moment(obj.creditDateFromCyle,formPattern).format(toPattern):'';
        		
        		obj.closeMeetingDate = ( obj.closeMeetingDate && obj.auditTypeId==det.AppConstant.DMLC_TYPE_ID ) ? moment(obj.closeMeetingDate,toPattern).format(toPattern) : obj.closeMeetingDate;
    		
        		
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
        		
        		obj.openMeetingDate = obj.openMeetingDate  ? moment(obj.openMeetingDate,formPattern+HHmm).format(toPattern+HHmm)	: '';
				
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
        //added by @Ramya on 12-12-2022 for IRI-5589
		if(!det.auditDetail.openMeetingDate && det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID){
				toaster.warning('Please Enter the '+det.openMettingDate);
		}else if(!det.auditDetail.closeMeetingDate && det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID){
				toaster.warning('Please Enter the '+det.clseMetingdate);
		}else{
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
       } 
        
        	function previousFinding(){ 
        	        	//added by @Ramya on 18-11-2022 for TICKET-574
			if(!det.auditDetail.openMeetingDate && (det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID ||
					det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID ||
					det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)){
					toaster.warning('Please Enter the '+det.openMettingDate);
			}else if(!det.auditDetail.closeMeetingDate && (det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID ||
					det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID ||
					det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)){
					toaster.warning('Please Enter the '+det.clseMetingdate);
			}else if (!det.auditDetail.auditDate && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){	//added by @Ramya for Jira id - IRI- 5563
					toaster.warning('Please Enter the Review Date');
			}else{
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
        	        			openForCar		   :(det.openForCar==true) ? 1:'',
        	        			disableLockObserverLogIn	:(det.disableLockObserverLogIn && det.disableLockObserverLogIn==true  ) ?1:0,
        	        			previousAudit : det.previousAudit  ?  det.previousAudit : ''		
        	        	};
        	        
        	        	auditFactory.setFindingData(data);

        	            $state.go('app.audit.prevfindings',{},{reload:true});
					}
        	       }  
        	 

        function currentFinding(){
			
			//added by @Ramya on 10-11-2022 for TICKET-574
			if(!det.auditDetail.openMeetingDate && (det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID ||
				det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID ||
				det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)){
				toaster.warning('Please Enter the '+det.openMettingDate);
			}else if(!det.auditDetail.closeMeetingDate && (det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID ||
				det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID ||
				det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)){
				toaster.warning('Please Enter the '+det.clseMetingdate); 	
			}else if (!det.auditDetail.auditDate && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)	//added by @Ramya for Jira id - IRI- 5563
			{
				toaster.warning('Please Enter the Review Date');
			}else{
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
        			auditMinDate	: det.auditMinDate ? det.auditMinDate : '',
        			disableLockObserverLogIn	:(det.disableLockObserverLogIn && det.disableLockObserverLogIn==true  ) ?1:0
        	};
        	
        	auditFactory.setFindingData(data);

            $state.go('app.audit.findings',{},{reload:true});
		}

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
        	
        	auditData.certExpireDate = (auditData.auditTypeId==det.AppConstant.SSP_TYPE_ID && (auditData.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID || auditData.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)  && auditData.certExpireDate=='N/A') ? '' : det.auditDetail.certExpireDate;
        	
        	auditData.vesselImoNo = det.vesselImoNo.vesselImoNo ? det.vesselImoNo.vesselImoNo : '';
    				
        	auditData.companyImoNo = det.vesselCompanyDtl.companyImoNo ? det.vesselCompanyDtl.companyImoNo : '';
    						
        	auditData.companyDoc = det.vesselCompanyDtl.docTypeNo ? det.vesselCompanyDtl.docTypeNo : '';
        	
        	auditData.docTypeNumber = auditData.docTypeNumber ? auditData.docTypeNumber : det.vesselDetail.docTypeNumber ? det.vesselDetail.docTypeNumber : '';
    		
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
    	
    		 auditData.auditSummaryId = selectedSummary.length>0 ? selectedSummary[0].sumary : '';			//uncommented by ramya for jira id-->IRI-5309
    		
     		auditData.auditPlace = auditData.auditPlace ? btoa(encodeURIComponent(auditData.auditPlace)) :'';
    		
    		auditData.narrativeSummary = auditData.narrativeSummary ? btoa(encodeURIComponent(auditData.narrativeSummary)) :'';
    		
    		auditData.lockHolder = det.enabled ? det.lockHolder ? det.lockHolder : sessionStorage.getItem('emailId') : '';
    		
    		auditData.userIns = (sessionStorage.getItem('emailId')).toString();
    		
    		auditData.userInsName = (sessionStorage.getItem('usrname')).toString();
    		
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
    		
    		
    		
    		
    		//auditData.endorseExpireDate = (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID && det.auditDetail.certExpireDate && det.auditDetail.auditStatusId != det.AppConstant.COMMENCED_AUDIT_STATUS && det.auditDetail.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && det.startExpiryDate <= auditData.certExpireDate) ? auditData.certExpireDate : auditData.endorseExpireDate ? auditData.endorseExpireDate :'';
    			                          
    		//auditData.certExpireDate = det.startExpiryDate ? det.startExpiryDate : auditData.certExpireDate;
        		
    		/*if(auditData.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && auditData.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS && auditData.auditTypeId == det.AppConstant.ISPS_TYPE_ID){
    			auditData.endorseExpireDate = det.previousAudit.certExpireDate ? det.previousAudit.certExpireDate : '';
    		}*/
    		
    		//auditData.lockStatus = (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID) ? det.AppConstant.NOT_RETRIEVE_STATUS : auditData.lockStatus;

			/*  Added by sudharsan for Ticket-543
				Finding details updating via car getting wrong mail
				Starting Here
			*/
			auditData.lockStatus = (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID) ? det.AppConstant.NOT_RETRIEVE_STATUS : auditData.lockStatus;
			if(det.auditDetailOrg){
				if((det.auditDetailOrg.lockStatus !=0) &&(det.auditDetailOrg.lockStatus)){
					auditData.lockStatus = det.auditDetailOrg.lockStatus;
				}
			}
			//Ticket-543 End here
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
    		
    		if(det.auditDetail.auditTypeId == det.AppConstant.ISM_TYPE_ID){
				
    			delete auditData.sspReviewDetail;
			} 
    		/*if(det.auditCreate && det.vesselDetail && det.vesselDetail.vesselId){
    			auditData.vesselId   = Number(det.vesselDetail.vesselId);
    			auditData.vesselName = det.vesselDetail.vesselName;
    		}*/
    		auditData.vesselId   = Number(det.vesselDetail.vesselId);
			auditData.vesselName = det.vesselDetail.vesselName;
    	
			if(det.auditTypeId == det.AppConstant.ISM_TYPE_ID || det.auditTypeId == det.AppConstant.ISPS_TYPE_ID || det.auditTypeId == det.AppConstant.MLC_TYPE_ID){/*
    		
    			if(auditData.certificateDetail.length==0 || (auditData.certificateDetails.length==1 && auditData.certificateDetails[0].generateStatus==0)){
    			
    				var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
    			
    				var certificateData = {
    					
    					'auditSeqNo' : auditData.auditSeqNo,
    	 	 		
    					'companyId' : auditData.companyId,
    				
    					'auditTypeId' : auditData.auditTypeId,
    					
    					'auditSubTypeId' : auditData.auditSubTypeId,
    				
    					'utn' : auditData.certificateDetails.length==0 ? det.generateUtn() : auditData.certificateDetails[0].utn,
    				
    					'certificateNo' : auditData.certificateNo,
    				
    					'qrCodeUrl' : '',
    				
    					'certificateVer' : 'IRI-1',
    				
    					'reasonOfIssuingId' : 1001,
    					
    					'vesselImoNo' : auditData.vesselImoNo,
    					
    					'vesselName' : det.vesselDetail.vesselName,
    				
    					'grt' : det.vesselDetail.grt,
    				
    					'vesselType' : det.vesselDetail.vesselType ? det.vesselDetail.vesselType : det.vesselDetail.vesselTypeName,
    				
    					'officialNo' : det.vesselDetail.officialNo,
    				
    					'companyImoNo' : auditData.companyImoNo,
    				
    					'vesselCompanyName' : det.vesselCompanyDtl.vesselCompanyName,
    				
    					'vesselCompanyAddress' : det.vesselCompanyDtl.vesselCompanyAddress, 
    				
    					'auditDate' : auditData.auditDate,
    				
    					'auditPlace' : auditData.auditPlace,
    				
    					'certExpireDate' : auditData.certExpireDate,
    				
    					'certIssueDate' : auditData.certIssueDate,
    				
    					'certIssueId' : auditData.certIssueId,
    				
    					'activeStatus' : 1,
    				
    					'generateStatus' : 0,
    				
    					'leadSign' : leadDetail && leadDetail.audSignature ? btoa(leadDetail.audSignature):'',
    				
    					'userIns' : auditData.userIns,
    				
    					'dateIns' : auditData.dateIns,
    					
    					'leadName' : auditData.leadAuditorName,
    					
    					'seqNo' : 1,
    					
    					'certificateId' : (det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID) && det.prevActiveCert ? det.prevActiveCert.certificateId : auditData.certificateDetails.length>0 ?auditData.certificateDetails[0].certificateId : '',
    					
    					'endorsementID' : auditData.certificateDetails.length>0 && auditData.certificateDetails[0].endorsementID ? auditData.certificateDetails[0].endorsementID : '',
    					
    					'issuedBy' : auditData.leadAuditorName,
    					
    					'vesselId' : det.vesselDetail.vesselId,
    					
    					'vesselUk' : det.vesselDetail.vesselUk,
    					
    					'vesselPk' : det.vesselDetail.vesselPk,
    					
    					'classSociety' : det.vesselDetail.classSociety,
    					
    					'callSign' : det.vesselDetail.callSign,
    					
    					'portOfRegistry' : det.vesselDetail.portOfRegistry,
    					
    		        	'dateOfRegistry' : det.vesselDetail.dateOfRegistry?moment(det.vesselDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD):'',
    					
    					'creationDate' : moment(new Date()).format(YYYYMMDD),
    					
    					'createdBy' : auditData.leadAuditorName,
    					
    					'docTypeNumber' : det.vesselDetail.docTypeNumber,
    					
    					'docExpiry' : moment(det.vesselCompanyDtl.docExpiry,MMMDDYYYY).format(YYYYMMDD),
    					
    					'docIssuer' : det.vesselCompanyDtl.docIssuer,
    					
    					'docType' : det.vesselCompanyDtl.docTypeNo
    					
    					};
    				
    				certificateData.qrCodeUrl = CERTI_URL+certificateData.companyId+'/'+certificateData.utn;
    			
    				auditData.certificateDetails = [];
    				
    				
    			
    				auditData.certificateDetails.push(certificateData);
    		
    			}else{
    			
    			delete auditData.certificateDetails;
    			}
    		*/}
			
			delete auditData.certificateDetail;
			delete  auditData.auditCycle ;
			
			return auditData;
    	}//end of setAuditDetailData()
        
        /***before save Validating screen data***/
        function auditDetailDataValidation(){ 
        	
    		var vesselMailFLag =false;
    		var flag = true;
    		console.log(det)
    		var openMeetingDate = '', closeMeetingDate = '',auditDate='',creditDate='',certificateData='',certExpireDate='';
    		
    		openMeetingDate = det.auditDetail.openMeetingDate ? moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
    		closeMeetingDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD):'';
    		auditDate =  det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
    		   		
    		creditDate =  det.auditDetail.creditDate ? moment(det.auditDetail.creditDate,MMMDDYYYY).format(YYYYMMDD):'';
    		certExpireDate =  det.auditDetail.certExpireDate ? moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD):'';
    		
    		if( det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length > 0) {
				 certificateData =	  _.max(det.auditDetail.certificateDetail, function(find){  return   find.seqNo; });	
  			}
    		
    		if(!det.vesselImoNo || !det.vesselImoNo.vesselImoNo){
    			vesselMailFLag  = true;
    			flag = false;
    			
    			toaster.warning('Please Enter IMO Number');
    			
    		}else if(!det.vesselCompanyDtl.companyImoNo){
    			vesselMailFLag  = true;
    			flag = false;
    			
    			toaster.warning('Please Enter Vessel IMO No');
    			
    		}else if(!det.vesselCompanyDtl.docTypeNo){
    			vesselMailFLag  = true;
    			flag = false;
    			
    			toaster.warning('Please Enter DOC Type & Number');
    			
    		}else if(!det.vesselCompanyDtl.docExpiry){
    			vesselMailFLag  = true;
    			flag = false;
    			
    			toaster.warning('Please Enter DOC Expiry');    			
    		}else if(!det.auditDetail.auditStatusId){
    			
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
    			
    		}else if(!det.auditDetail.auditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID){
    			flag = false;
    			
    			var msg=(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval':det.auditType;
    			 
    			toaster.warning('Please Enter '+msg+' Date'); 
    			
    		}else if(det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID && !det.auditDetail.creditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId!=det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && det.auditDetail.auditSubTypeId!=det.AppConstant.ADDITIONAL_SUB_TYPE_ID && det.auditDetail.auditSubTypeId!=det.AppConstant.RENEWAL_SUB_TYPE_ID )){
    			flag = false;
    
    			toaster.warning('Please Enter Credit  Date'); 
    			
    		}else if(det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID && !det.auditDetail.creditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID &&  det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT)){
    			flag = false;
    
    			toaster.warning('Please Enter Credit  Date'); 
    			
    		}else if((det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID || det.userRoleId == det.AppConstant.MANAGER_ROLE_ID)/*added by Sudharsan on 24-03-2022 for JIRA ID IRI-5039 */  && det.auditDetail.creditDate &&  det.auditDetail.auditDate && creditDate!=auditDate && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT))){
    			flag = false;

    			var msg=(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)?' Inspection ':' Audit';
    			toaster.warning('Credit Date should be same as '+msg+' Date'); 
    			
    		}else if(!det.auditDetail.certificateNo && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID) && det.scopeId == 1000){


    			flag = false;
    			
    			toaster.warning('Please Enter Certificate No.');
    			
    		}else if( !(det.openForCar) && det.auditMinDate > moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) && !(det.notLead) && !(det.auditDetail.auditStatusId==1002)){
    			var msg=(det.firstIntermeadite && det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID) ? 'Please Select '+det.auditType+' Date. \n It Should Be greater than previous '+det.auditType+'`s first Anniversary  Date: '+ moment(det.auditMinDate,YYYYMMDD).format(MMMDDYYYY) : 'Please Select '+det.auditType+' Date \n It Should Be greater  than previous '+det.auditType+' Date: \n\n\n'+ moment(det.auditMinDate,YYYYMMDD).format(MMMDDYYYY);
    				
    				/*if(det.carFindMaxStatusDate && ( moment(moment(det.carFindMaxStatusDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) == det.auditMinDate)){
    					
    					toaster.warning('Please Select '+det.auditType+' Date \n which Should Be greater than Last Updated \n CAR Maintenance Finding StatusDate ie.'+ (moment(det.carFindMaxStatusDate,YYYYMMDD).format(MMMDDYYYY)));
    				
    				}else*/
    				
    				 if( moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) < det.auditMinDate){
    				
    					toaster.warning(msg);
    				
    				}else {
    				
    					toaster.warning(msg);
    				}
    			
    			 flag = false;
    			 
    		}else if(det.auditMaxDate && (moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) > det.auditMaxDate)){
    			
    			var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID) ? 'Please Select '+det.auditType+' Date. \n It Should Be less than  '+det.auditType+'`s fourth Anniversary  Date: '+ moment(det.auditMaxDate,YYYYMMDD).format(MMMDDYYYY) : 'Please Select '+det.auditType+' Date \n It Should Be Less then the  '+det.auditType+' Date: \n\n\n'+ moment(det.auditMaxDate,YYYYMMDD).format(MMMDDYYYY);
    			
    			toaster.warning(msg);
    			flag = false;
    		}/*else if(det.auditDetail.openMeetingDate && ( (det.minOpenMeetingDate && openMeetingDate<det.minOpenMeetingDate) || (det.receiptMinDate && openMeetingDate<det.receiptMinDate) || (det.maxOpenMeetingDate && openMeetingDate>det.maxOpenMeetingDate) || (det.receiptMaxDate && openMeetingDate>det.receiptMaxDate) ) ){
    			
    			flag = false;
    			
    		}else if(det.auditDetail.closeMeetingDate && (det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID) && ( (det.minCloseMeetingDate && closeMeetingDate<det.minCloseMeetingDate) || (det.maxCloseMeetingDate && closeMeetingDate>det.maxCloseMeetingDate) ) ){
    			
    			flag = false;
    			
    		}*/else if((det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID) && (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID &&  det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT)) && !det.auditDetail.sspReviewDetail[0].sspReportNo && det.auditDetail.auditStatusId!=det.AppConstant.VOID_AUDIT_STATUS){
    			
    			flag = false;
    			
    			toaster.warning('Please Enter  '+det.reportNumber);
    			
    		}else if((det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID) && (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT )) && !det.auditDetail.sspReviewDetail[0].sspLeadName && det.auditDetail.auditStatusId!=det.AppConstant.VOID_AUDIT_STATUS){
    			
    			flag = false;
    			
    			toaster.warning('Please Enter '+det.leadNme);
    			
    		}else if((det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID) && (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT)) && !det.auditDetail.sspReviewDetail[0].sspRevisionNo && det.auditDetail.auditStatusId!=det.AppConstant.VOID_AUDIT_STATUS){
    			
    			flag = false;
    			toaster.warning('Please Enter '+det.revsionNo);
    		}else if(!det.vesselDetail.grt){
    			
    			flag = false;
    				
    			toaster.warning('Please Enter GRT ');
    			
    		}else if(!det.vesselDetail.dateOfRegistry)
    			{
    			flag = false;
				
    			toaster.warning('Please Enter Date Of Registry ');
    			
            }else if( (!det.auditDetail.certIssueDate && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID &&  !det.auditDetail.auditDate && !det.auditDetail.openMeetingDate ) || ( !det.auditDetail.closeMeetingDate && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && !det.auditDetail.auditDate && !det.auditDetail.openMeetingDate )){

               var msg=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)?'DMLC II':'SSP';
     			flag = false;
     			
     			toaster.warning('Please Enter '+msg+' Issue Date');
     			
     		
            }else if(det.auditDetail.auditStatusId!=det.AppConstant.VOID_AUDIT_STATUS && closeMeetingDate && auditDate &&  closeMeetingDate > auditDate  && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID &&  det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID){
            	flag = false;
      			toaster.warning('Closing Meeting Date Should Less then or  equal to Audit Date');
      			
      		}/*else if( auditDate && certExpireDate && auditDate >certExpireDate && (det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.INTERMEDIATE_SUB_TYPE_ID )){
            	flag = false;
      			toaster.warning(det.auditType + ' Date Should  be Less then or  equal to Certificate Expiry Date');
      			
      		}*/
            else if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
    			
    			var approvalDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
    			var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD):'';
    			
    			var issueDate =  det.auditDetail.certIssueDate ?  moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD):'';
    		
    			issueDate = (closeMeetingDate && det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID) ? closeMeetingDate : issueDate;
    			
    			if(approvalDate && reciptDate && (reciptDate>approvalDate && reciptDate!=approvalDate) ){
    			flag = false; 
    			var msg=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)?'Review':'Approval';
    			toaster.warning(msg+'  date should be greater than OR equal to receipt date');   
    			}else if(issueDate && reciptDate && (issueDate>reciptDate && issueDate!=reciptDate)){
    				flag = false; 
    				var msg=(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'SSP':'DMLC II';
    				
        			toaster.warning(' Receipt date should be greater than OR equal to '+msg+' issue date');  
    			}else if(issueDate && approvalDate && (approvalDate<issueDate && approvalDate!=issueDate) ){
    				flag = false;
    				var msg=(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'SSP':'DMLC II';
    				var msg1=(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)?'Review':'Approval';
        			toaster.warning(msg1+' Date cannot be Earlier then the '+msg+' Issue Date ');  
    			}
    			
    		}else if(!det.openForCar && det.findingsMncverifyMaxDate  && det.auditDetail.closeMeetingDate && closeMeetingDate<det.findingsMncverifyMaxDate){
    	    	
   			      if(det.findingsMncverifyMaxDate  && (det.findingsMncverifyMaxDate.toUpperCase() == (moment(det.findingsMncverifyMaxDate,YYYYMMDD).format(YYYYMMDD)).toUpperCase()))
   				     { flag = false;   var date = moment(det.findingsMncverifyMaxDate,YYYYMMDD).add(90,'days').format(MMMDDYYYY);
   				     toaster.warning('Please Change the verify close Due Date  '+date+' of '+det.findingMncVerifySerialNo+' cannot Exceeds 90 days from Closing meeting Date '); 
   				   }
   	     	  }else if(!det.openForCar && det.findingsMncPlanacceptedMaxDate  && det.auditDetail.closeMeetingDate && closeMeetingDate<det.findingsMncPlanacceptedMaxDate){
    	    	
   			      if(det.findingsMncPlanacceptedMaxDate  && (det.findingsMncPlanacceptedMaxDate.toUpperCase() == (moment(det.findingsMncPlanacceptedMaxDate,YYYYMMDD).format(YYYYMMDD)).toUpperCase()))
   				     { flag = false; var date = moment(det.findingsMncPlanacceptedMaxDate,YYYYMMDD).add(30,'days').format(MMMDDYYYY);
   				     toaster.warning('Please Change the Plan accepted  Due Date  '+date+' of ' +det.findingMncPlanacceptedSerialNo+' cannot Exceeds 30 days from Closing meeting Date'); 
   				   }
   	     	  }else if( !det.openForCar && det.findingsNcDueDate  && det.auditDetail.closeMeetingDate && closeMeetingDate<moment(det.findingsNcDueDate,YYYYMMDD).subtract(30,'days').format(YYYYMMDD)){
    	    	
   			      if(det.findingsNcDueDate  && (det.findingsNcDueDate.toUpperCase() == (moment(det.findingsNcDueDate,YYYYMMDD).format(YYYYMMDD)).toUpperCase()))
   				     { flag = false; var date = moment(det.findingsNcDueDate,YYYYMMDD).format(MMMDDYYYY);
   				     toaster.warning(' Please Change the Plan accepted Due Date  '+date+' of ' +det.findingsNcSerialNo+' cannot Exceeds 30 days from Closing meeting Date'); 
   				   }
   	     	  }/*else if(det.auditDetail.certExpireDate && closeMeetingDate && (closeMeetingDate > moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) && ((det.auditDetail.auditSubTypeId != det.AppConstant.INTERIM_SUB_TYPE_ID &&  det.auditDetail.auditSubTypeId != det.AppConstant.INITIAL_SUB_TYPE_ID) || (det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId != det.AppConstant.FULL_TERM_CERT) ) ){
    			    flag = false;
    				toaster.warning('Please select the '+det.clseMetingdate+' should be less then or equal to Certificate Expiry Date ');
    			 }*/
    		
    		/*
    		if(det.auditDetail.auditStatusId!=det.AppConstant.VOID_AUDIT_STATUS && det.auditDetail.certExpireDate && closeMeetingDate && (closeMeetingDate > (moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) > closeMeetingDate && det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID) ){
    			flag = false;
    			toaster.warning('Please select closeMeeting Date  should be less then or equal to Certificate Expiry Date');
    		}else if(det.auditDetail.auditDate && det.auditDetail.certExpireDate && ((moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD)) > (moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) ) && det.auditDetail.auditSubTypeId==det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
    			flag = false;
    			toaster.warning(det.auditType+' Date should not be more than Expiry Date');
    		
    		}*/
			//added by @Ramya on 10-11-2022 for TICKET-574
			else if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0)
			{
				if(!det.auditDetail.openMeetingDate){
			
					toaster.warning('Please Enter the '+det.openMettingDate);
					flag=false;
					
				}else if(!det.auditDetail.closeMeetingDate){
					flag=false;
					toaster.warning('Please Enter the '+det.clseMetingdate); 
				}	

			}
			else if(det.auditDetail.auditFinding && det.auditDetail.auditFinding.length>0)
			{
				if(!det.auditDetail.openMeetingDate){
			
					toaster.warning('Please Enter the '+det.openMettingDate);
					flag=false;
					
				}else if(!det.auditDetail.closeMeetingDate){
					flag=false;
					toaster.warning('Please Enter the '+det.clseMetingdate); 
				}	

			}
    		
    		if(!det.auditDetail.auditStatusId){
    			console.log(det.auditDetail.auditStatusId);
    			
    			console.log(!det.auditDetail.auditStatusId);
    			$('#auditstaus').addClass('err');
    		}/*else if(det.auditDetail.auditStatusId){
    			
    			$('#auditstaus').removeClass('err');
    		}*/
    		if(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ||(det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && (det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED2))){
	    		var previousVesselCheck = det.previousAudit ?(det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length>0) ? det.previousAudit.certificateDetail[0] : '' : '';				//changed by @Ramya on 27-1-2023 for Jira id - IRI-5634
	    		console.log(previousVesselCheck)
	    		if(previousVesselCheck!='' && det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && (det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED2)){
	      			checkCertificateVesselDeatils(previousVesselCheck,'renewaled');
	      		}
	      		else if(previousVesselCheck!='' && !det.previousAudFindingCarUpdate){		//added by @Ramya for jira id - IRI-5361
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
    		var msg=(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)?' Inspection ':' Audit';
    		det.auditSummary.forEach(function(a,ind){ 
    			
    			
    			 a.sumary = (ind==index) ? a.audSummaryId : '';
        		var status=det.isAllFindingClose();
        		
        		if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID ||  det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
        			
  				  a.sumary = (ind==index) ? a.audSummaryId : a.sumary;
  				  det.disabledApproveButton=(a.sumary==1005)?true:false;
				 
        		}else if(index==0){
					  if(lengthOfFindingExceptObs && lengthOfFindingExceptObs!=0){   
        			   toaster.warning('The' +msg+' summary is not matching with the '+msg+' results'); }
        			 
				  }else if(index==2){
        				 if( mncOpenCount==0){
        					 toaster.warning('The' +msg+' summary is not matching with the '+msg+' results'); }
        		  
				  }else if( index==1){
        		    	if(ncOpenCount==0 ){
        		    		toaster.warning('The' +msg+' summary is not matching with the '+msg+' results'); }
        		  
				  }else if(index==3){
        		    	if( lengthOfFindingExceptObs!=0){   
        		    		toaster.warning('The' +msg+' summary is not matching with the '+msg+' results'); }
        			
				  }else{
        			    a.sumary = (ind==index) ? a.audSummaryId : '';
        			}
        		
        			det.auditDetail.auditSummaryId = a.sumary ? a.sumary : det.auditDetail.auditSummaryId;
					console.log(det.auditDetail.auditSummaryId);
        		});
    		
    		
    		/*det.auditSummary.forEach(function(a,ind){
		
				a.sumary = (ind==index) ? a.audSummaryId :'';
				if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)||(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID))
        		{
					det.disabledApproveButton=(a.sumary==1002)?true:false;
					console.log(det.disabledApproveButton);
					
					
        		}
			});*/
        	
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
				
	        	if(det.auditDetailDataValidation()){

	        		det.saveAuditData('Data Saved Successfully');
	        		
	        		console.log(det.auditDetail.openMeetingDate);
	        		
	        		console.log(det.auditDetail.closeMeetingDate);
	        		
	        		det.openMeetingDatevalue=det.auditDetail.openMeetingDate;
	        				
	        		det.closeMeetingDatevalue=det.auditDetail.closeMeetingDate;
	        		
	        		det.auditPlacevalue=det.auditDetail.auditPlace;
	        		
	        		det.summaryvalue=det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY;
	        		
	        		det.certIssueVal=det.auditDetail.certIssueDate;
	        		
	        		det.certExpireVal=det.auditDetail.certExpireDate;
	        		
	        		det.dmlcreportVal=det.auditDetail.sspReviewDetail.length>0?det.auditDetail.sspReviewDetail[0].sspReportNo:'';
	        		
	        		
	        	}
	        	 var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
	        	 var reciptDateOrg = det.auditDetailOrg ? moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY):'';
	       		if(reciptDate!=reciptDateOrg){
	       			det.receiptLtr= true;
	       		}
			
        }//end of validateAndSaveAuditData()
       
        /***get screen data as json and send to server to save/store in DB***/
        function saveAuditData(todterMsg,event){
			det.checkFlagValue=true;		//added by @Ramya for Jira id - IRI-5573
        	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    		var officialId=res[0].officialId;
    		console.log(officialId)
			console.log(det);
    			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
    			.then(function(data) {
					det.leadTitalChanges = data.title /** IRI-5245 added by kiran  */ 
					det.leadSignChanges = data.signature;
    				det.signerName = data.signer;
        	
        
		        	det.certInactive = det.auditDetail.auditSummaryId;
		        	detailsFactory.getAuditDetailAndCheckSameAudit(det.auditTypeId,det.companyId,det.auditSeqNo,det.vesselImoNo.vesselImoNo).$promise.then(function(res) {
						//Added by sudharsan for Jira-id IRI-5440 Start here
						if(res.auditDetail!=null || res.auditDetail!= undefined){
						if((moment(res.auditDetail.creditDateFromCyle)._f)!="YYYY-MM-DD"){
							var creditDateFromCyle_dateconversion = new Date(res.auditDetail.creditDateFromCyle).toLocaleDateString('es-CL');
							creditDateFromCyle_dateconversion=moment(creditDateFromCyle_dateconversion,DDMMYYYY).format("YYYY-MM-DD");
							res.auditDetail.creditDateFromCyle = creditDateFromCyle_dateconversion;
						}}
						//Added by sudharsan for Jira-id IRI-5440 End here
		        	if(res.auditDetail && res.auditDetail.lockStatus==det.AppConstant.RETRIEVE_STATUS && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
							
							toaster.warning('Current '+det.auditType+' is retrieved in the Laptop '+det.auditType+' Application by '+_(res.auditAuditorDetail).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString());
						
							if('initiateReview' == event){
								det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
			        		}
							
							return;
							
		        		}else if(res.auditDetail && res.auditDetail.lockStatus==7 && det.userRoleId == det.AppConstant.AUDITOR_ROLE_ID){
							/**Added by sudharsan on 21-04-2022 for JIRA ID IRI-5243 & IRI-5244 */
							det.lockStatus = true; 
    						det.enabled = true;
    						det.lockDisable=true;
							var check_name= _(res.auditDetail.auditAuditorDetail[0]).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString()?_(res.auditDetail.auditAuditorDetail[0]).chain().where({'audLeadStatus':det.AppConstant.AUD_LEAD_STATUS}).pluck('auditorName').toString():res.auditDetail.auditAuditorDetail[0].auditorName;
							toaster.warning('Current '+det.auditType+' is retrieved in the Mobile '+det.auditType+' Application by '+check_name);
							/**End here */
							if('initiateReview' == event){
								det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
			        		}
							
							return;
							
							//commeneted by @Ramya on 21-10-2022 for jira id - IRI-5516 
		        		// }else if(!res.auditDetail && res.sameAuditCount>0){
		        			
		        		// 	toaster.warning('Previous '+det.auditType+' is not completed yet');
		        		// 	return;
		    			
		        		}else{
		        			
		        			if(res.auditDetail!=null)
		        				{
		        			if(res.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.checkSign==true)
		        			{
		        			
		        			if(res.auditDetail.auditFinding[0] && res.auditDetail.auditFinding[0].findingDetail[0] && res.auditDetail.auditFinding[0].findingDetail[0].statusDate)
		        			{
		        				
		        			var ReviewDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
		        			var statusDate = res.auditDetail.auditFinding[0].findingDetail[0].statusDate? moment(res.auditDetail.auditFinding[0].findingDetail[0].statusDate,YYYYMMDD).format(YYYYMMDD):'';
		        			
		        			if(!ReviewDate){
		        				det.checkFlagV=true;
		        				det.checkFlagValue=true;
		        			}
		        			else if(ReviewDate < statusDate )
		        				{
		        				det.checkFlagV=false;
		        				toaster.warning('Please change the Review date, which cannot be earlier than the status Date');		//changed by @Ramya for Jira id - IRI-5573
		        				det.checkFlagValue=false;
		        			}else if(ReviewDate > statusDate)
		        				{
		        				det.checkFlagV=true;
		        				toaster.warning('Please check the status date');
		        				det.checkFlagValue=true;
		        				}
		        			det.checkFlagV=true;
		        			}
		        			}
		        			
		        				}
		        		
		        			/* Reopen validation for manager and admin */
		            		if( !det.managerChangingLeadFlag && !det.managerCreatingAudit &&  (det.userRoleId == det.AppConstant.ADMIN_ROLE_ID || det.userRoleId == det.AppConstant.MANAGER_ROLE_ID)){
		            		  if(!det.checkFindingClosed() && det.auditDetail.auditStatusId ==1002){
		            			  det.checkFlagValue = false;
		        					toaster.warning('Please close all findings to make '+det.auditType+' completed.');
		        				}else if(!det.managerCreatingAudit &&  det.auditDetail.auditStatusId == det.AppConstant.COMMENCED_AUDIT_STATUS  && det.checkFindingClosed()){	//reverted by @Ramya jira id - IRI-5576
		        					det.checkFlagValue = false;
		        						toaster.warning('Please change  '+det.auditType+' Status as completed. ');
		        			    }else{
		        			    	det.checkFlagValue = true;
		        			    }
		            		}
		            		
		            		
		            		
		        			
		        			if(det.checkFlagValue==true)
		        				{
		        			
		        			
		        			var auditData = det.setAuditDetailData();
		        			//auditData.makeFinal =  det.auditDetail.makeFinal ? det.auditDetail.makeFinal : 0;
		        			
		        			blockUI.start('Saving The Data');
		        			
		        			
		        				/*var auditDataForReport=angular.copy(auditData);
		        			
		                    
		        			
		                    auditDataForReport.vesselName = det.vesselDetail.vesselName;
		                    
		                    auditDataForReport.vesselTypeName = det.vesselDetail.vesselTypeName;
		 	
		                    auditDataForReport.docIssuer = det.vesselCompanyDtl.docIssuer;
		                    
		                    auditDataForReport.docExpiry = det.vesselCompanyDtl.docExpiry;
		                    
		                    auditDataForReport.officialNo = det.vesselDetail.officialNo;
		                 
		                    auditDataForReport.narrativeSummary = (auditDataForReport.narrativeSummary == "") ? det.auditType+" work in progress"   :det.auditDetail.narrativeSummary;
		                    
		                    auditDataForReport.companyAddress =  det.vesselCompanyDtl.companyAddress;
		                    
		                    auditDataForReport.auditFinding = det.auditDetail.auditFinding ? angular.copy(det.auditDetail.auditFinding) : [];
		 	
		 	
		                    auditDataForReport.previousFinding        = det.observationarrayprevious ? angular.copy(det.observationarrayprevious) :[];
		 	
		                 //   console.log(auditDataForReport.auditFinding);
		 	
		 	
		                    
		 	
		                    
		 	
		 	
		                    var lead_sign= _(auditData.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('audSignature').toString();
		 	 */ 
		 	
		                    var rev_Sign=_(auditData.auditAuditorDetail).chain().where({'audLeadStatus':0,'auditRoleID':1003}).pluck('audSignature').toString();
		 	
		                
		                    if(det.scopeId == 1001){
		                    	//auditData.certificateDetails = [];
		                    	auditData.certificateDetail = [];
		                    	auditData.certificateNo="";
		                    	auditData.certExpireDate="";
		                    	auditData.certIssueDate="";
		                    	auditData.certIssueId="";
		            			
		            			}
		                    console.log(det.auditDetailOrg);
		                    console.log(det.auditDetail);
		                    if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
		                    	{
		                    	
		                    if(det.auditDetailOrg && det.auditDetailOrg.auditDate && det.auditDetailOrg.certIssueDate && det.auditDetailOrg.openMeetingDate && det.auditDetailOrg.openMeetingDate && det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo)
		                    	{
		                    	var reciptDate= det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
		                     if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY)|| det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo)){
		 					  validateReviewLetterWithAuditStatus=false;
		 					  console.log(validateReviewLetterWithAuditStatus);
		 				   }
		        				}
		                    	} 
		                    auditData.auditAuditorDetail[0].signerName=det.signerName;
		                    	console.log(auditData);
		                	detailsFactory.saveAuditData(auditData,det.auditCreateUpdate,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
		                		
		                		console.log(res);
		                		
		                		
		                		det.auditDetailOrg =  angular.copy(res); console.log(det.auditDetailOrg)
		                		
		                		
		                		if(res.auditTypeId==det.AppConstant.SSP_TYPE_ID)
		                			{
		                		if(res.certIssueDate && res.sspReviewDetail[0].sspRevisionNo)
		                			{
		                			det.ValidationForReviewLetter=true;
		                			}
		                		else
		                			{
		                			det.ValidationForReviewLetter=false;
		                			}
		                			}
		                		
		                		if(res.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
		            			{
		            		if(res.closeMeetingDate && res.sspReviewDetail[0].sspRevisionNo)
		            			{
		            			det.ValidationForReviewLetter=true;
		            			}
		            		else
		            			{
		            			det.ValidationForReviewLetter=false;
		            			}
		            			}
		                		
		                		if(res.auditTypeId==det.AppConstant.SSP_TYPE_ID || res.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
		    					{
		    				if(res.openMeetingDate)
							{
							det.ValidationForReceiptLetter=true;
							}
						else
							{
							det.ValidationForReceiptLetter=false;
							} 
		    				
		    				detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
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
		            			
		            			
		        				console.log(det.auditSeqNo)
		        				setVesselLetterHist(det.auditSeqNo,response);
		            		});
		    				
		    					}
		                		
		                		if(det.userRoleId==det.AppConstant.MANAGER_ROLE_ID){
		        					det.managerCreatingAudit=false;
		        					
		        				   }
		                		
		            		        if(res.auditSeqNo){
		            		        	
		            		        	if(rev_Sign && det.finalReport){
		        	    					detailsFactory.signatureGenBlobData(det.auditDetail.auditSeqNo,det.auditDetail.auditTypeId,det.auditDetail.companyId,1002).$promise.then(function(res){
		        	    						
		        	    						console.log(det.auditDetail.makeFinal);
		        	    						
		        	    						det.finalReport = false;
		            	    				});
		        	    				} 
		            		        	
		            		        	/*console.log(res);
		            		        	
		                                
		
		                                                            if(!det.checkLeadStatus){
		
		                                                                    
		                                                            	det.versionId = 1001;
		
		                                                                    
		
		                                                            }else if(rev_Sign){
		
		
		
		                                                                det.versionId = 1002;
		                                                                    
		                                                                    det.checkPrelimAudit = 'No';
		                                                            }else{
		                                                            	
		
		
		                                                                det.versionId = 1002;
		                                                            }
		
		                                
		
		
		                                      console.log(res);                     
		                                
		                                if(det.checkPrelimAudit == 'Yes'){
		            						
		                                	det.reportFileName = auditDataForReport.vesselName+'_'+res.vesselImoNo+'_Prelim'+auditType[res.auditTypeId].src+'_'+moment(new Date()).format('DD-MMMM-YYYY')+'.pdf';
		        							
		        						}else if(det.checkPrelimAudit == 'No'){
		        							
		        							det.reportFileName = auditDataForReport.vesselName+'_'+res.vesselImoNo+'_Final'+auditType[res.auditTypeId].src+'_'+moment(new Date()).format('DD-MMMM-YYYY')+'.pdf';
		        						}
		                                
		
		                                                                   var reportHistoryData = {
		
		                                                                                  
		
		                                                                                   'auditSeqNo':res.auditSeqNo,
		
		                                
		
		                                                                                   'companyId':res.companyId,
		
		                                
		
		                                                                                   'auditPlace':res.auditPlace ? res.auditPlace : '',
		
		                                
		
		                                                                                   'auditDate':res.auditDate ? res.auditDate :'',
		
		                                
		
		                                                                                   'reportBlob':btoa(JSON.stringify(auditDataForReport)),
		
		                                
		
		                                                                                   'leadAuditorName':res.leadAuditorName ? res.leadAuditorName : '',
		
		                                
		
		                                                                                   'versionId':det.versionId ? Number(det.versionId) : 1001,
		
		                                
		
		                                                                                   'fileName':det.reportFileName,
		
		                                                                                  
		
		                                                                                   'auditTypeId':res.auditTypeId
		
		                                
		
		                                                                   }
		
		                                */
		
		                                                                  
		/*
		                                                                 if(det.versionId)
		
		                                                                         {
		
		                                                                   detailsFactory.saveReportData(reportHistoryData,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
		
		                                
		
		                                                                           if(lead_sign){
		
		                                                                                          
		
		                                                                                           det.checkLeadStatus = true;
		
		                                                                                          
		
		                                                                                       }
		
		                                
		
		                                                                           console.log(res);
		
		                                
		
		                                                                   });
		
		                        
		
		                        
		
		                        
		
		                                                                         }*/
		            		        	
		            		        	
		            					
		                				if(todterMsg){
		                					toaster.success(todterMsg);
		                				}
		                				else{
		                					toaster.success('Data Saved Successfully');
		                					
		                				}
		            					
		                				/**** after AUDIT/INSPECTION/REVIEW create default lock that Audit/Inspection/Review with Lead ID****/
		                				if(res.auditSeqNo && det.auditCreate && !det.enabled){
		                		
		                					det.lockStatus = true;
		                					
		                					detailsFactory.updateLockHolder(det.auditDetail.auditTypeId, det.auditSeqNo,sessionStorage.getItem('emailId'),det.companyId).$promise.then(function(data){
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
		                						 
		                						 if(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID && det.auditDetail.sspReviewDetail.length>0 && det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo){
		                							 
		                							 detailsFactory.getFindingData(det.AppConstant.DMLC_TYPE_ID,det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo,det.companyId).$promise.then(function(data){
		                    				        	det.dmlcFindingAray = angular.copy(data);
														var completedNoteCount=0;							//added by @Ramya for Jira id - IRI-5644
														det.dmlcFindingAray.forEach(function(finding){
															
															finding.findingDetail.forEach(function(status){
																
																if(status.currentAuditSeq != det.auditSeqNo && status.nextActionId==1010)
																	completedNoteCount++;
															});
														});
														det.disableDmlcNote =(completedNoteCount==det.dmlcFindingAray.length)?false:true;		//added by @Ramya for Jira id - IRI-5644
													
		                    						 });
		                						 }
		                				    }
		                					
		                					det.auditCreate?sessionStorage.setItem('auditSeqNo',res.auditSeqNo):'';
		                					
		                					det.auditCreate = false;
		                	    		}
		                				
		            					det.auditDetailBeforeUpdate = {'auditStatusId' : res.auditStatusId, 'auditDate' : res.auditDate, 'openMeetingDate' : res.openMeetingDate, 'closeMeetingDate' : res.closeMeetingDate};
		            					
		            					det.auditDetail.certificateData = angular.copy(res.certificateDetail);
		            					
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
		            		    			
		            		    			//det.auditMinDate = det.auditMinDate > temp ? det.auditMinDate : temp ;
		            		    			
		            		    			
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
		            					if('initiateReview' == event){
		            						det.auditDetail.reviewStatus = det.AppConstant.REVERT_REVIEW_STATUS;
		            	        		}
		            					blockUI.stop();
		            				}
		            				
		            				console.log(res.auditAuditorDetail);
		                			res.auditAuditorDetail.forEach(function(a){
		                        		if(a.audLeadStatus==1 && a.userId==det.loginUserId){
		                                      det.notLead=false; 
		                                      
		                        			  }
		                        		det.managerOrAdminChangeLead=false;
		                        	
		            				});	
		            				
		            				if(res.creditDate && det.auditCreateUpdate == det.AppConstant.CREATE){ 
		                    			detailsFactory.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
		                    			
		                    			det.auditCreateUpdate = det.AppConstant.UPDATE; 
		                    			det.creditDateChange('getCreditDate');
		                    			  });
		                    			
		                    		}else if(res.creditDate){ 
		                    				 det.creditDateChange('getCreditDate'); 
		                    			 } 
		            				if(det.auditDetail.auditSubtypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID){
		            				  auditCycleFactory.getAllCycleDate(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(cycleAllData) {
		            				    	 det.cycleAllData = angular.copy(cycleAllData);
		            				     });
		                	         } 
		            				det.auditCreateUpdate = det.AppConstant.UPDATE;
		            				
		            				if(res.auditTypeId == det.AppConstant.MLC_TYPE_ID && res.sspReviewDetail[0] && res.sspReviewDetail[0].sspReportNo && det.dMLCReportNos && det.dMLCReportNos.length >0){
		            					det.onlyOneTimeReq=true;	
		            					det.dMLCReportNos.forEach(function(index){ console.log(index);	
		            				
		            						if(index.auditReportNo != res.sspReviewDetail[0].sspReportNo){
		            							
		            							det.dmlcFindingAray.forEach(function(index){
		            							
		            								index.findingDetail.forEach(function(i){ 
		                								if(i.currentAuditSeq==res.auditSeqNo && det.onlyOneTimeReq){
		                									det.onlyOneTimeReq = false;
		                									
		                									auditFactory.deleteFindingDmlcLinked(det.AppConstant.DMLC_TYPE_ID,res.auditSeqNo,det.companyId,i.findingSeqNo).$promise.then(function(res){
		                			    		    	console.log(res); 
		                			    		    	
		                									
		                			    		    			toaster.success('Updated Finding(s) part of MLC Inspection has been deleted successfully');
		                									if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo){
		                			    		    			detailsFactory.getFindingData(det.AppConstant.DMLC_TYPE_ID,det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo,det.companyId).$promise.then(function(data){
		                			    		        			
		                			    							det.dmlcFindingAray = angular.copy(data);
		                			    		        			
		                			    		        			det.dmlcFindingAray.forEach(function(finding){
		                			    		        				
		                			    		        				finding.findingDetail.forEach(function(status){
		                			    		        					
		                			    		        					if(status.currentAuditSeq == det.auditSeqNo){
		                			    		        						
		                			    		        						det.dmlcUpdated = true;
		                			    		        					}
		                			    		        				});
		                			    		        			});
		                			    		        		});
		                									}
		                			    		    			
		                			    		    			
		                			    		    		});
		                									
		                								}
		                								
		                							});
		            								
		            							});
		            						
		            						}
		            					});
		            				}
		            				
		            			});
		        		}
		        	}
		        	
		        	
		        	detailsFactory.getPreviousAuditDetail(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(result){
						if(result.carFindMaxStatusDate)
						{
							det.previousAudFindingCarUpdate=true;			//added by @Ramya for jira id - IRI-5361
						}
		        		/*detailsFactory.getCompletionDate(det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(completion){
		        			
		        			var dateCloseFormat=completion.completionDate[0]? completion.completionDate[0].COMPLETION_DATE : '';
							var dateCloseFormat1 = dateCloseFormat ? moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY') : '';
							console.log(dateCloseFormat1)
							sessionStorage.setItem('completionDate',dateCloseFormat1);
						});*/
						if(result.prevAuditDtl && result.prevAuditDtl.length>0)
		        		result.prevAuditDtl.forEach(function(preAuditDtl){
		        			preAuditDtl.openMeetingDate = preAuditDtl.openMeetingDate?moment(preAuditDtl.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY):''; 
		        			
		             	});
		        	detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
		            		
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
		        			det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
		    					return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
		    				});	
		        			
		        			
	        				console.log(det.auditSeqNo)
	        				setVesselLetterHist(det.auditSeqNo,response);
		        			    
		        		
		        		});});
		        	
		        	});
		        	});
		        	
		        });

				//added by @Ramya for Jira id - IRI-5592
				if((det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID)){		//added by @Ramya for Jira id - IRI-5594
				detailsFactory.getAuditSummary(det.auditDetail.auditTypeId,det.auditDetail.companyId).$promise.then(function (result) {
					det.auditSummary=result;
					det.setSummaryAndDueDate();
					if(det.auditDetail.auditSummaryId){
						_.findWhere(det.auditSummary, {'audSummaryId' : det.auditDetail.auditSummaryId, 'companyId' : Number(det.companyId)}).sumary = det.auditDetail.auditSummaryId;
					}
				});
			}
    			 det.enableNarativeSummary();   //  added by sudharsan for JIRA-5238
    	}//end of saveAuditData()
        
        /*********Audit SubType Change or Select*************/  	
        function auditSubTypeChange(auditSubTypeId){
        
        	/*det.setRelatedDataOnSubtypeSelect();*/
        	
        	if(det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID && auditSubTypeId== det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)
   		 {
   		 det.summaryHead='The undersigned has carried out the Ship Security Plan (SSP) Amendment review for and on behalf of the Government of the Republic of the Marshall Islands (RMI) for compliance with the International Code for the Security of Ships and Port Facilities (ISPS Code), Part A and the provisions of ISPS Code B/8.1 to B/13.8 as appropriate for the ship; ';
   		 }
        	
        	if((det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID) && det.auditDetail.sspReviewDetail.length==0){
        		
        		det.auditDetail.sspReviewDetail.push({
        			'companyId' : sessionStorage.getItem('companyId'),
      			
        			'auditTypeId' : det.auditDetail.auditTypeId,
      			
        			'sspReportNo' : '',
      					
        			'sspLeadName' : '',
      					
        			'sspRevisionNo' : '',
        			
        			'sspDmlcAuditSeqNo' : '',
        			
        			'ltrStatus':0,
        			
        			'dmlcIssuedDate':'',
        			
        			'dmlcAuditPlace':''
        		});
        		console.log(det.auditDetail.sspReviewDetail);
        	}
        	
        	if( !(det.sspDtlAvl) && det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID ){//|| det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID
        		
        		detailsFactory.getDMLCReportNos(det.vesselImoNo.vesselImoNo,det.companyId, det.auditDetail.auditTypeId).$promise.then(function(res){
					
        			det.dMLCReportNos = angular.copy(res);
    				console.log(det.dMLCReportNos);	
    				if(det.dMLCReportNos.length>0){
	    				det.auditDetail.sspReviewDetail[0].dmlcIssuedDate =  det.dMLCReportNos.length>0 ? det.dMLCReportNos[0].dmlcissuedate : '';
	    				det.auditDetail.sspReviewDetail[0].dmlcAuditPlace = det.dMLCReportNos.length>0 ? det.dMLCReportNos[0].dmlcissueplace : '';
    				}
    				/*if(det.dMLCReportNos[0]){
        				detailsFactory.getDMLCLocationDate(det.dMLCReportNos[0].vesselImoNo,det.dMLCReportNos[0].companyId).$promise.then(function(res){
        					if(res.placeLocation[0]){
        					sessionStorage.setItem('dmlcLocation',res.placeLocation[0].AUDIT_PLACE ? res.placeLocation[0].AUDIT_PLACE : res.placeLocation[0].DMLCII_ISSUE_LOCATION);
        					var dateCloseFormat=res.placeLocation[0].CLOSE_MEETING_DATE ? res.placeLocation[0].CLOSE_MEETING_DATE : res.placeLocation[0].DMLCII_ISSUE_DATE;
        					var dateCloseFormat1 = moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY');
        					sessionStorage.setItem('dmlcIssueDate',dateCloseFormat1);
        					console.log(sessionStorage.getItem('dmlcIssueDate'));
        					}
        				});
        				}else{
        					sessionStorage.setItem('dmlcLocation','');
        					sessionStorage.setItem('dmlcIssueDate','');
        					}*/
				
          		  /* if(!res.auditSeqNo && (auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID) && res.amendmentCount==0){
      				
          			det.AppConstant.ISPS_TYPE_ID ? toaster.warning("ISPS Initial Audit can't be created as SSP Initial Review hasn't been created/completed yet") : '';
      				det.AppConstant.MLC_TYPE_ID ? toaster.warning("MLC Initial can't be created as DMLC Part II Initial Review hasn't been created yet") : '';
      				
      				det.auditDetail.auditSubTypeId = '';
      				
          		   }else{*/
        			
        			det.setRelatedDataOnSubtypeSelect();
        			        			
        				det.auditDetail.sspReviewDetail = [];
        				
        				if(det.dMLCReportNos) {
          			 
	          			   	det.auditDetail.sspReviewDetail.push({
	          			   		
	          				   'companyId' : sessionStorage.getItem('companyId'),
	             			
	          				   'auditTypeId' : det.auditDetail.auditTypeId,
	             			
	          				   'sspReportNo' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].auditReportNo) ? det.dMLCReportNos[0].auditReportNo : '',
	             					
	          				   'sspLeadName' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].leadAuditorName) ? det.dMLCReportNos[0].leadAuditorName : '',
	             					
	          				   'sspRevisionNo' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].sspRevisionNo) ? det.dMLCReportNos[0].sspRevisionNo : '',
	             					
	          				   'sspDmlcAuditSeqNo' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].auditSeqNo) ? det.dMLCReportNos[0].auditSeqNo : '',
	          						   
	          				   'ltrStatus':0,
	               			
		               			'dmlcIssuedDate':(det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].dmlcissuedate) ? det.dMLCReportNos[0].dmlcissuedate : '',
		               			
		               			'dmlcAuditPlace':(det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].dmlcissueplace) ? det.dMLCReportNos[0].dmlcissueplace : '',
	          			   	});
	          			   	
	          			  console.log(det.auditDetail.sspReviewDetail);
        				}
          			   	          			   	
        		});	
        	
        		
        	}else if(det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID && auditSubTypeId== det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
        		
        		
        		detailsFactory.getISPSInitialDetails(det.vesselImoNo.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
        			
        			if(res.iSPSInitialExist){
        				
        				ModalService.showModal({
        					
        					templateUrl : 'src/modals/docChanged.html',
        					
        					controller  : 'docChangedController',
        					
        					inputs		: {data:'ISPS audit happened for this vessel, do you really want to create SSP?'},
        				
        				}).then(function(modal){
        					
        					modal.element.modal();
        						    			
        					modal.close.then(function(result){
        						
        						if(result=='YES'){
        							det.enableAuditSubType = [det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID];
        							det.setRelatedDataOnSubtypeSelect();
        							
        						}else if(result=='NO'){
        							
        							det.directAmendment=true;
        							det.setRelatedDataOnSubtypeSelect();
        							det.auditDetail.auditSubTypeId = det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID;
        							det.enableAuditSubType = [det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID,det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID];
        						}else{
        							
        							det.auditDetail.auditSubTypeId = null;
        						}
        					});
        				});
        			}else{	
        				det.setRelatedDataOnSubtypeSelect();
        			}
        		});
            	    
        	}else if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID){
				
				detailsFactory.getDMLCReportNos(det.vesselImoNo.vesselImoNo,det.companyId, det.auditDetail.auditTypeId).$promise.then(function(res){
					
					det.dMLCReportNos = angular.copy(res);
    				console.log(det.dMLCReportNos);	
    				if(det.dMLCReportNos.length>0){
	    				det.auditDetail.sspReviewDetail[0].dmlcIssuedDate =  det.dMLCReportNos.length>0 ? det.dMLCReportNos[0].dmlcissuedate : '';
	    				det.auditDetail.sspReviewDetail[0].dmlcAuditPlace = det.dMLCReportNos.length>0 ? det.dMLCReportNos[0].dmlcissueplace : '';
    				}
    				/*if(det.dMLCReportNos[0]){
        				detailsFactory.getDMLCLocationDate(det.dMLCReportNos[0].vesselImoNo,det.dMLCReportNos[0].companyId).$promise.then(function(res){
        					if(res.placeLocation[0]){
        					sessionStorage.setItem('dmlcLocation',res.placeLocation[0].AUDIT_PLACE ? res.placeLocation[0].AUDIT_PLACE : res.placeLocation[0].DMLCII_ISSUE_LOCATION);
        					var dateCloseFormat=res.placeLocation[0].CLOSE_MEETING_DATE ? res.placeLocation[0].CLOSE_MEETING_DATE : res.placeLocation[0].DMLCII_ISSUE_DATE;
        					var dateCloseFormat1 = moment(new Date(dateCloseFormat),'YYYYMMDD').format('DD-MMM-YYYY');
        					sessionStorage.setItem('dmlcIssueDate',dateCloseFormat1);
        					console.log(sessionStorage.getItem('dmlcIssueDate'));
        					}
        				});
        				}else{
        					sessionStorage.setItem('dmlcLocation','');
        					sessionStorage.setItem('dmlcIssueDate','');
        					}*/
					
					det.setRelatedDataOnSubtypeSelect();
					
					det.auditDetail.sspReviewDetail = [];
    				
    				console.log(det.dMLCReportNos);
      			 
    				if(det.dMLCReportNos) {
    					
	      			   	det.auditDetail.sspReviewDetail.push({
	      			   		
	      				   'companyId' : sessionStorage.getItem('companyId'),
	         			
	      				   'auditTypeId' : det.auditDetail.auditTypeId,
	         			
	      				   'sspReportNo' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].auditReportNo) ? det.dMLCReportNos[0].auditReportNo : '',
	         					
	      				   'sspLeadName' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].leadAuditorName) ? det.dMLCReportNos[0].leadAuditorName : '',
	         					
	      				   'sspRevisionNo' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].sspRevisionNo) ? det.dMLCReportNos[0].sspRevisionNo : '',
	         					
	      				   'sspDmlcAuditSeqNo' : (det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].auditSeqNo) ? det.dMLCReportNos[0].auditSeqNo : '',
	      						   
	      				   'ltrStatus':0,
	               			
	               			'dmlcIssuedDate':(det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].dmlcissuedate) ? det.dMLCReportNos[0].dmlcissuedate : '',
	               			
	               			'dmlcAuditPlace':(det.dMLCReportNos.length > 0 && det.dMLCReportNos[0].dmlcissueplace) ? det.dMLCReportNos[0].dmlcissueplace : '',
	      			   	});
	      			  
	      			
	    				if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID && det.auditDetail.sspReviewDetail.length > 0 && det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo){
	    				 var msgShow = true;
	    					detailsFactory.getFindingData(det.AppConstant.DMLC_TYPE_ID,det.auditDetail.sspReviewDetail[0].sspDmlcAuditSeqNo,det.companyId).$promise.then(function(data){
	    							
	    						det.dmlcFindingAray = angular.copy(data);
	    	        			if(msgShow){
	    	        			det.dmlcFindingAray.forEach(function(finding){
	    	        				
	    	        				finding.findingDetail.forEach(function(status){
	    	        					
	    	        					if(status.currentAuditSeq == det.auditSeqNo){
	    	        						
	    	        						det.dmlcUpdated = true;
	    	        					}
	    	        					
	    	        					if(status.statusSeqNo==2 && status.currentAuditSeq == det.previousAudit.auditSeqNo){
	    	        						msgShow = false;
	    	        						toaster.info('The linked DMLC II Review has been closed as part of MLC '+ det.previousAudit.audSubTypeDesc +' Inspecion');
	    	        					}
	    	        					
	    	        					
	    	        					
	    	        				});
	    	        			});
	    					}
	    	        		});
	    				}
	    			
	      			
    				}
      			   	      			   	
				});
				
			}else{
        		det.setRelatedDataOnSubtypeSelect();
        	}
        	
        	det.creditDateChange('getCreditDate');
        	
        	det.scopeId = (det.scopeId==1001 && det.auditDetail.auditSubTypeId  != det.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? 1000 : det.scopeId;
        	
        	if(auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID || auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ){
            	var previousVesselCheck = det.previousAudit ? det.previousAudit.certificateDetail ? det.previousAudit.certificateDetail[0] : '' : '';
        		console.log(previousVesselCheck)
        		if(previousVesselCheck!='' && !det.previousAudFindingCarUpdate)			//added by @Ramya for jira id - IRI-5361
        			checkCertificateVesselDeatils(previousVesselCheck,'dropDown');
            }
        	
        	
        }//end of auditSubTypeChange()
        
        
        /*** on subtype select set report number, certificate number, min date and max date****/
        function setRelatedDataOnSubtypeSelect(){
        	
        	var extendedIssueDate='',extendedExpireDate='',certificateNo='';
        	
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
        	
        	if(det.dirInterAndAdditionalAudit && det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID)
				det.enableCertificateIssuedType=[det.AppConstant.FULL_TERM_CERT,det.AppConstant.RENEWAL_ENDORSED2];
        	
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
        	
        	if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID || (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID) || det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
        	
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
        	
    		if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID){
        		
        		det.auditDetail.certIssueId = det.AppConstant.INTERIM_CERT;
 				
        		if(det.auditSummary.length>3){
        			det.auditSummary[3].sumary = det.AppConstant.INTERIM_SUMMARY_ID;
            	}
        		
        		//det.setExpiryDate();
 				
 			}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
 			
 				det.auditDetail.certIssueId = det.AppConstant.FULL_TERM_CERT;
 				
 				det.auditDetail.interalAuditDate = '';
 				
 				if(det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
 					
 					det.auditDetail.certIssueId = det.previousAudit.certIssueId;				
 	    		
 	 				detailsFactory.getAuditSeqNo(det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
 					
 	 					det.auditSeqNo = res.data;
 	 					det.auditDetail.auditSeqNo = res.data;
 	 					 det.auditDetail.sspReviewDetail.push({
 	          				   
 	             			   'sspRevisionNo' : (det.sspDmlcRevisionNo < 10) ? '0'+det.sspDmlcRevisionNo :det.sspDmlcRevisionNo,'ltrStatus':0,
 	             		});
 	 				
 	 					det.auditDetail.certificateNo = det.previousAudit.certificateNo.split('-')[0]+'-'+det.auditDetail.sspReviewDetail[0].sspRevisionNo;   
 	 	    			
 	 	    			det.auditDetail.auditReportNo = det.previousAudit.auditReportNo.split('-')[0]+'-'+det.auditDetail.sspReviewDetail[0].sspRevisionNo;
 	 				});
 	    			    			
 	    			//det.auditDetail.certIssueDate =( det.previousAudit.certIssueDate && det.auditDetail.auditSubTypeId != det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?moment(det.previousAudit.certIssueDate,YYYYMMDD).format(MMMDDYYYY):'';
 	    			
 	    			if(det.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
 	    			
 	    				det.auditDetail.interalAuditDate = det.previousAudit.interalAuditDate;
 	    				
 	    			}
 	    			
 	    			//det.auditDetail.certExpireDate = "N.A.";
 				}else{

 					det.maxOpenMeetingDate = '';
 	 				det.maxCloseMeetingDate = '';
 	 				
 					det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
 	 			    det.minCloseMeetingDate = det.auditMinDate ? det.auditMinDate : det.maxCloseMeetingDate;
 	 			    
 				}
 				//det.setExpiryDate(); 
 				
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
    				
    				detailsFactory.getAuditSeqNo(det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
     					det.auditSeqNo = res.data;
     					det.auditDetail.auditSeqNo = res.data;
     				});
    				
    				detailsFactory.getAuditReportNo(det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){
     					
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
    			 
    	         det.auditDetail.certIssueDate =  extensionIssueDate ? moment( extensionIssueDate ,YYYYMMDD).format(MMMDDYYYY)   : det.previousAudit.certIssueDate?moment(det.previousAudit.certIssueDate,YYYYMMDD).format(MMMDDYYYY):'';
    	         
    			 det.auditDetail.certExpireDate = extensionexpiryDate ? moment( extensionexpiryDate ,YYYYMMDD).format(MMMDDYYYY) : det.previousAudit.certExpireDate?moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY):'';
    			
    	       det.auditDetail.interalAuditDate = 'N.A.';
    			
    			checkAuditMinDate = (det.previousAudit.auditDate) ? moment(det.previousAudit.auditDate,YYYYMMDD).format(YYYYMMDD) : det.auditMinDate; //(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID) ? det.previousAudit.certIssueDate : moment(moment(det.previousAudit.certIssueDate,YYYYMMDD).add(2,'years')).format(YYYYMMDD);
    		
    			//checkAuditMinDate = (  det.carFindMaxStatusDate  &&  det.carFindMaxStatusDate  > checkAuditMinDate ) ?  det.carFindMaxStatusDate :  checkAuditMinDate;
       			
       			det.auditMinDate =  checkAuditMinDate;
    			
       			//det.maxCloseMeetingDate = det.previousAudit.certExpireDate? det.previousAudit.certExpireDate:''; //det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID ? det.previousAudit.certExpireDate : moment(moment(det.previousAudit.certIssueDate,YYYYMMDD).add(3,'years')).format(YYYYMMDD);
       			
       			//det.maxCloseMeetingDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(YYYYMMDD) : det.maxCloseMeetingDate;
       			
       			det.maxOpenMeetingDate = det.maxCloseMeetingDate;
       			
       			//det.minOpenMeetingDate =  det.minOpenMeetingDate > det.auditMinDate ? det.minOpenMeetingDate : det.auditMinDate;
       			det.minOpenMeetingDate = det.auditMinDate ? det.auditMinDate : det.minOpenMeetingDate;
    			var nowAudDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
    		
    			/*if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && (nowAudDate<det.minOpenMeetingDate || nowAudDate>det.maxOpenMeetingDate)){
    				
    				det.auditDetail.auditDate = moment(det.minOpenMeetingDate,YYYYMMDD).format(MMMDDYYYY);
    				toaster.warning(det.auditType+' Date for the Intermediate '+det.auditType+' Sub Type can be between the 2nd & 3rd Anniversary Dates');
    			}*/

    			
    			//det.auditMaxDate = det.maxOpenMeetingDate;
    			
    			if(!det.dirInterAndAdditionalAudit && det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
    				 
                    var preAuditMidate=det.auditMinDate; 
                   console.log(det.auditMinDate); console.log(det.auditMaxDate);
                 //@Dileep Commented below line 
                    //   det.auditMinDate = extensionIssueDate ? moment(moment(extensionIssueDate,YYYYMMDD).add(1,'year')).format(YYYYMMDD): det.auditMinDate; 
    			   // det.auditMaxDate = extensionexpiryDate ? moment(moment(extensionexpiryDate,YYYYMMDD).subtract(1,'year')).format(YYYYMMDD) :  det.auditMaxDate; 
    			    det.auditMinDate =  det.auditMinDate ? moment(moment(det.auditMinDate,YYYYMMDD).add(1,'year')).format(YYYYMMDD): det.auditMinDate;
    			    det.auditMinDate =  det.auditMinDate ? moment(moment(det.auditMinDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;					//Added by @Ramya on 9-3-22 for jiraId->4954
    			    det.firstIntermeadite = ( det.auditMinDate > preAuditMidate ) ? true : false;
    				
//    			    if(det.dirInterAndAdditionalAudit && (det.previousAudit && det.previousAudit.auditSubTypeId != det.AppConstant.ADDITIONAL_SUB_TYPE_ID)) {
//    			    	det.auditMinDate = preAuditMidate;
//    			    	det.auditMinDate = (extensionIssueDate && extensionIssueDate > det.auditMinDate) ? moment(moment(extensionIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD): det.auditMinDate;
//    			    	 
//    			    }
    			    
    			    det.auditMinDate = ( det.previousAudit.auditDate   && det.prevInitialOrRenewal && det.previousAudit.auditDate > det.prevInitialOrRenewal.auditDate && det.previousAudit.auditDate  != det.prevInitialOrRenewal.auditDate) ? moment(moment(det.previousAudit.auditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : det.auditMinDate;
    			    
    			    det.auditMaxDate = ( det.prevInitialOrRenewal && det.prevInitialOrRenewal.auditDate ) ? moment(moment(det.prevInitialOrRenewal.auditDate,YYYYMMDD).add(4,'years')).format(YYYYMMDD)  : det.auditMaxDate;
    			    det.auditMaxDate = ( det.prevInitialOrRenewal && det.prevInitialOrRenewal.auditDate ) ? moment(moment(det.auditMaxDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD)  : det.auditMaxDate;
    			    
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
     			   det.auditMaxDate='';
    			}
    
    			det.auditDetail.certIssueDate = extensionIssueDate ? moment(extensionIssueDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certIssueDate; 
    			det.auditDetail.certExpireDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY):det.auditDetail.certExpireDate;
    
 			}else {
 				det.auditMaxDate='';
 				det.maxOpenMeetingDate='';
 				
 			}
    		
    		if((det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)|| (det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID) ){
    		
    			//det.certiletter   = 'Review Letter';
    			if(det.auditDetail.auditSubTypeId == det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID)
    				{
    					det.certiRecieptLetter = 'Receipt Letter';
    					
    					det.auditDetail.certExpireDate = (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID) ? 'N/A' : '' ;
    				
    				}else if(det.auditDetail.auditSubTypeId == det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
    					
    					det.auditDetail.certExpireDate = (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID) ? 'N/A' : '' ;
    					
    					
    					det.certiRecieptLetter = 'Amendment Receipt Letter';
    			
    				if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID){
    					
    						det.apreAmendletter = 'Amendment Approval Letter';
    	    			}else{
    	    				
    	    				det.apreAmendletter = 'Amendment Review Letter';
    	    			}
    				
    				}
    			if(det.directAmendment){
    				det.certiRecieptLetter= 'Amendment Receipt Letter';
    			    det.apreAmendletter='Amendment Approval Letter';
    			}	
    		} 
    		
    		if(det.auditDetail.certificateNo){
    			var msg = ( det.auditDetail.auditTypeId == det.AppConstant.ISM_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID ) ? 'E' : (  det.auditDetail.auditTypeId == det.AppConstant.ISM_TYPE_ID) ? 'F' : ( det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID)?'G' : (det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID) ? 'H' : ( det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID) ? 'I' :(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID) ? 'J' : '';
    			var len = det.auditDetail.certificateNo.length-4;
    			var char = det.auditDetail.certificateNo.slice(len,len+1);
                det.auditDetail.certificateNo = det.auditDetail.certificateNo.replace(char,msg);
    			}
    		

			if(det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID  && det.previousAudit && det.previousAudit.certificateDetail && det.previousAudit.certificateDetail.length > 0){
				//var preauditMinDate=det.auditMinDate;
				//var seqNo =	(det.previousAudit.certificateDetail  ) ?  _.max(det.previousAudit.certificateDetail, function(find){  return   find.seqNo; }) : '';	
				//checkAuditMinDate = (seqNo && seqNo.extendedIssueDate && (seqNo.extendedIssueDate > seqNo.auditDate)) ? seqNo.extendedIssueDate : 	checkAuditMinDate;
				//det.auditMinDate  = (seqNo && seqNo.extendedIssueDate && (seqNo.extendedIssueDate > seqNo.auditDate)) ? moment(moment(seqNo.extendedIssueDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD) : 	det.auditMinDate;
				//det.auditMinDate = det.auditMinDate > preauditMinDate ? det.auditMinDate  : preauditMinDate;
			}
			
			if(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && (det.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditTypeId==det.AppConstant.DMLC_TYPE_ID)){
			det.receiptMinDate = det.auditMinDate ? det.auditMinDate : det.receiptMinDate;
			det.receiptMaxDate=''; 
			}
			
			det.auditDetail.certIssueDate = (det.auditTypeId==det.AppConstant.SSP_TYPE_ID) ? moment(new Date()).format(MMMDDYYYY) : det.auditDetail.certIssueDate;
			
			det.auditDetail.closeMeetingDate = (det.auditTypeId==det.AppConstant.DMLC_TYPE_ID) ? moment(new Date()).format(MMMDDYYYY) : det.auditDetail.closeMeetingDate;
			
			det.auditDetail.creditDate = (det.auditTypeId!=det.AppConstant.DMLC_TYPE_ID &&  det.auditTypeId!=det.AppConstant.SSP_TYPE_ID ) ?  det.auditDetail.auditDate :'' ;
			
			if(det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID && !det.auditDetail.certIssueDate && det.auditDetail.creditDate!=''){
				det.auditDetail.creditDate = '';
			}
			if(det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID && det.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditTypeId!=det.AppConstant.DMLC_TYPE_ID){
				det.auditDetail.certIssueDate = det.auditDetail.creditDate ? det.auditDetail.creditDate : det.auditDetail.certIssueDate;
				det.auditDetail.certExpireDate = det.auditDetail.creditDate ? moment(det.auditDetail.creditDate,MMMDDYYYY).add(6,'months').subtract(1,'days').format(MMMDDYYYY): det.auditDetail.certExpireDate;
			}
     
        	$timeout(function(){
				$('#auditstaus').focus();
    		},0);
        	
        	detailsFactory.getReportType(det.auditDetail.auditTypeId,det.companyId,det.auditDetail.auditSubTypeId).$promise.then(function(res) { 
       			console.log(res);
       			
       			det.reportTypes=res;
       			det.reportTypes = _.sortBy(det.reportTypes, 'attachmentTypeId');	
       		 var seqNoTemp=1;
     		
       		 $timeout(function(){
    		det.auditDetail.auditRptAttach=det.reportTypes.filter(function( obj ) {
         		if(obj.activeStatus==1   && obj.auditSubTypeId == det.auditDetail.auditSubTypeId && obj.auditTypeId == det.auditDetail.auditTypeId && (obj.attachmentTypeDesc!='OTHER' && obj.attachmentTypeDesc!='other'))
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
 				return obj.activeStatus==1 && obj.auditSubTypeId == det.auditDetail.auditSubTypeId && obj.auditTypeId == det.auditDetail.auditTypeId  && obj.attachmentTypeDesc!='OTHER';
         		}
         		});
         	
     		},500);
         	
       		});
        	
        	/*/
console.log('sss'); var seqNoTemp=1;
        	det.auditDetail.auditRptAttach=det.reportTypes.filter(function( obj ) {
        		if(obj.auditSubTypeId == det.auditDetail.auditSubTypeId && obj.auditTypeId == det.auditDetail.auditTypeId && (obj.attachmentTypeDesc!='OTHER' && obj.attachmentTypeDesc!='other'))
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
        	*/
        	
        	    			
        	
      }
        /***getting AuditSeqNo, ReportNo and CertificateNo for Audit create time. ***/
        function getNewCertificate(){
        
    		auditService.getAuditData(det.auditDetail.auditTypeId,det.auditDetail.auditSubTypeId,det.companyId).then(function(res){				
    			
    			det.auditSeqNo = res[0].data;
    			
    			det.auditDetail.auditSeqNo = res[0].data;
    			
    			det.auditDetail.certificateNo = res[1].data;
    			
    			det.auditDetail.auditReportNo = res[2].data;
    			
    			det.newCertificateDetails = {
    					'auditSeqNo'    : res[0].data,
    					'certificateNo' : res[1].data,
    					'auditReportNo' : res[2].data
    			};
				
				
    			if(det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
    				console.log(det.auditDetail.sspReviewDetail);
    				if(!det.directAmendment)
    					{
    				det.auditDetail.sspReviewDetail.push({
        				   
           			   'sspRevisionNo' : (det.sspDmlcRevisionNo < 10) ? '0'+det.sspDmlcRevisionNo : det.sspDmlcRevisionNo,'ltrStatus':0,
    				});
    			}else{
    				
    				det.auditDetail.sspReviewDetail.push({
     				   
            			   'sspRevisionNo' : (det.sspDmlcRevisionNo < 10) ? '0'+(det.sspDmlcRevisionNo+1) : det.sspDmlcRevisionNo,'ltrStatus':0,
     				});
    				
    				det.auditDetail.auditReportNo = det.auditDetail.auditReportNo+'-'+det.auditDetail.sspReviewDetail[0].sspRevisionNo;
    				det.auditDetail.certificateNo = det.auditDetail.certificateNo+'-'+det.auditDetail.sspReviewDetail[0].sspRevisionNo
    			
    			}
    				
    				console.log(det.auditDetail.sspReviewDetail);
    			}
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
	            	det.auditDetail.auditRptAttach=[];
	            	det.auditDetail.auditRptAttach=result;
	            	
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
	            			det.vesselSpecificDtl(selectedVsl,'notRefresh','NOrefresh',[]);
	            		}else{
	            			det.validateVessel();
	            		}
	            	}else{
	            		det.validateVessel();
	            	}
	            });
	            
    		});       	
        }//end of vesselImoModel
        
        
        function setAuditDate(){
        	
       		if(det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID) ){
       			
       			//det.auditDetail.auditDate = det.auditDetail.closeMeetingDate ?  moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) :det.auditDetail.auditDate;// moment(new Date()).format(MMMDDYYYY);
           	   
       			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
        		
        		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
        		
       			det.previousAudit.certExpireDate=(!det.previousAudit.certExpireDate)?'':det.previousAudit.certExpireDate;  
           		
           		if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length==0 ) ){
//           		
          		 det.auditDetail.certIssueDate=det.auditDetail.creditDate? moment( det.auditDetail.creditDate,MMMDDYYYY).format(MMMDDYYYY):det.auditDetail.certIssueDate;  //(moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD) > det.previousAudit.certExpireDate) ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) : (moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY));
//           		
          		}
//           		if(!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0){
//           		det.auditDetail.closeMeetingDate ? '' : det.auditDetail.certExpireDate = '';
//           		}
           		det.disableCertIssueExpiry = true;
           	    det.setExpiryDate();
           	}else if(det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID){
       			
       			//det.auditDetail.auditDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) : det.auditDetail.auditDate;
         
       			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
        		
        		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
        		
       			if(!det.previousAudit.certExpireDate && det.checkPreviousAuditDetails.length==0)
       				{
       				det.disableCertIssueExpiry =false; 
       				det.minIssueDate ='';
       				det.expiryMaxDate = det.auditDetail.certExpireDate ?moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD):'';
       				  
       				}
           
           	
//           	}else if(det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID){
//          
//    			det.auditDetail.auditDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) : det.auditDetail.auditDate;
//    			
//    			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
//        		
//        		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
//    			
//    			
//    			var seqNo ='',extensionIssueDate='',extensionexpiryDate='';
//    			
//    			
//    			var expiryDate1 = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(YYYYMMDD) : moment(det.previousAudit.certExpireDate,YYYYMMDD).format(YYYYMMDD);
//    			var auditDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
//    			var days = moment(expiryDate1).diff(auditDate,'days', true);
//    			
//    			if(det.auditDetail.certIssueId != det.AppConstant.RENEWAL_ENDORSED2 && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0) ){
//    			
//    				if(days > 89 && det.auditDetail.closeMeetingDate){ 
//    					
//        			    det.auditDetail.certIssueDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(1,'days'),DDMMYYYY).format(MMMDDYYYY);
//        			
//        			    det.setExpiryDate();
//        		    }else if(det.previousAudit.certExpireDate && det.auditDetail.closeMeetingDate){
//        		    
//        			    det.auditDetail.certIssueDate = moment(det.previousAudit.certExpireDate,YYYYMMDD).format(MMMDDYYYY);
//        			    
//        			  
//        			   
//        			   det.auditDetail.certIssueDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY) :  det.auditDetail.certIssueDate;   
//        			  
//        			   det.setExpiryDate();
//        				
//        			}else if(!det.auditDetail.closeMeetingDate && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0) ){
//        				
//        				det.auditDetail.certIssueDate = '';
//            			
//            			det.auditDetail.certExpireDate = '';
//        			}else{
//        				  det.auditDetail.certIssueDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate, MMMDDYYYY).format(MMMDDYYYY) : det.auditDetail.certIssueDate;
//        				  det.setExpiryDate();
//        			}
//    			}
//    			det.disableCertIssueExpiry = true;
//    		}else if(det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
    			//det.auditDetail.certIssueDate = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) : det.auditDetail.certIssueDate ;
    			}
			if(!det.dirInterAndAdditionalAudit){	
					det.setExpiryDate();
			}
       		if(det.scopeId==1001){
       			det.auditDetail.certIssueDate = '';
    			det.auditDetail.certExpireDate = '';
       		}
       		
       		if(det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
       			//det.auditMaxDate = det.auditDetail.certExpireDate ? moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMaxDate ;
       		}
       		
       		if(!det.auditDetail.certExpireDate  && det.scopeId!=1001 ){
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
                	var extensionIssueDate='', extensionexpiryDate='',seqNo='';
                	 det.auditDetail.certExpireDate = det.auditDetail.certIssueDate? moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):'';
                 	
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
          			 det.auditDetail.certExpireDate = extensionexpiryDate ? moment( extensionexpiryDate ,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
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
   		 
   		detailsFactory.getCurrentUserDetail(mailId,det.companyId).$promise.then(function(data){
   			
			if(data.length>0 && data[0].managerOfficialId){
				if(det.auditDetail.auditAuditorDetail[0].userId == sessionStorage.getItem('emailId')){
					var status = false;
					if(det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID  && !det.carUpdateStatus){
						if(det.auditDetail.certificateDetail){
							if(det.auditDetail.certificateDetail.length>0){
								status =checkCertificateVesselDeatils(det.auditDetail.certificateDetail[0], 'firstCheck');}
						}

					}
					if(det.UpdateVesselRefreshed && !det.carUpdateStatus){
	        			vesselDtlsCheck();
			        }
					if(det.carUpdateStatus){
						det.UpdateVesselRefreshed=false;
					}
					
					if(!det.UpdateVesselRefreshed && !status){
						det.vesselUpdate = true;
						
						officialId = data[0].managerOfficialId;
						
						detailsFactory.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
					   		
				   			var sign =res.signature;
				   			
				   			checkAndPutSign(sign,index,reveiwerId);
						 });
					}
				}else{
					officialId = data[0].managerOfficialId;
					
					detailsFactory.auditorSignAndSeal(officialId,det.companyId).$promise.then(function(res){
				   		
			   			var sign =res.signature;
			   			
			   			/*if(!det.isAllFindingClose() && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
			   			 sign='';
			   			toaster.warning('Findings are not closed');  
			   		    }*/
			   			
			   			
			   			checkAndPutSign(sign,index,reveiwerId);
					 });
				}
							
			}else{
				
				detailsFactory.getSignature(mailId,det.companyId).$promise.then(function(res){
		   		
		   			var sign =res.userDetail.signature;
		   			
		   			/*if(!det.isAllFindingClose() && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
		   			 sign='';
		   			toaster.warning('Findings are not closed');  
		   		    }*/
		   			
		   			checkAndPutSign(sign,index,reveiwerId);
		   		 });
			}
		});
    		
   		 //var sign =  _(auditorName).chain().where({'emailId':sessionStorage.getItem('emailId')}).pluck('signature').toString();
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
  		 	
  		 	det.vesselUpdate = true;
  		 	
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
			return obj.findingDetail.length>0 && obj.findingDetail[0].categoryId != det.AppConstant.OBS_FINDING_CATEGORY && obj.findingStatus==0;		//changed by @Ramya for jira id - IRI-5582
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
								det.auditDetail.auditAuditorDetail[index].audSignatureDate =moment(new Date()).format(MMMDDYYYY);		//added by ramya for jira id-->IRI-5234
	    						det.auditDetail.auditAuditorDetail[index].audSignature = '';
	    						
	    						det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
	    						det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
	    						det.leadSign = false;
	    						
	    						det.auditDetail.auditAuditorDetail.forEach(function(a){
	    							
	    							if(a.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID){
	    								a.audSignatureDate = moment(new Date()).format(MMMDDYYYY);		//Added by ramya on 04-03-2022 for jira id-> 5138
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
					
					toaster.warning('Signatures and Signature Date of all the Additional '+det.auditorType+'s are required');
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.attachSignFlag=true;
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
					
				}else if(notAvlAuditorSign.length>0){
					
					toaster.warning('Please attach the signature of the other Auditor(s) delegated to you');
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.attachSignFlag=true;
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}else if(det.isAllFindingClose() && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID)){
					
					flag = false;
					toaster.warning('Please change '+det.auditType+' status to completed');	
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.attachSignFlag=true;
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}else if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==0 && !(det.disabledApproveButton)){
					det.attachSignFlag=true;
					$timeout(function(){
						 var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
		   					
		   					toaster.warning('Please Generate '+msg+' ');
					},10);
					
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}else if(det.checkFindingClosed() && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
					det.attachSignFlag=true;
					$timeout(function(){
						toaster.warning('Please change '+det.auditType+' status to completed');	
					},10);
					
					
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}else if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS){
					
					$timeout(function(){
						toaster.warning('Please change '+det.auditType+' status to completed');	
					},10);
					
					
					//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
					det.attachSignFlag=true;
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				}
				else{
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
    					detailsFactory.signatureGenBlobData(det.auditDetail.auditSeqNo,det.auditDetail.auditTypeId,det.auditDetail.companyId,1001).$promise.then(function(res){
    						console.log(res);
    					});
    				}
    				
    				det.disableNarativeSummary();
    				
    				blockUI.stop();
				}
			}else{
				//det.auditDetail.auditAuditorDetail[index].audSignatureDate = '';
				det.attachSignFlag=true;
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
				// added by ramya for jira id-->IRI-5220
				if(det.auditDetail.sspReviewDetail.length>0){//Added by sudharsan for JIRA ID IRI-5228
					if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
					{
						if(det.auditDetail.sspReviewDetail[0].ltrStatus==0)		//IRI-5226
				 		{
							flag = false;
							if(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)
								var msg= det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID?'Approval Letter':'Amendment Approval Letter';
							else if(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID)
								var msg = det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID?'Review Letter':'Amendment Review Letter';
								
					det.attachSignFlag=true;			//added by ramya for jira id-->IRI-5233
					toaster.warning(msg+' is not generated yet ');
					det.auditDetail.auditAuditorDetail[index].audSignature = '';
				 		}
				 	}
				}
				var leadDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'audLeadStatus' : det.AppConstant.AUD_LEAD_STATUS});
				
				det.auditDetail.auditAuditorDetail.forEach(function(index){
					
					if(index.audLeadStatus==0 && index.auditRoleID == det.AppConstant.AUDIT_AUDITOR_ROLE_ID && !(index.audSignature) && allsign ){
						
						allsign =false;
					}
				});
				
			    if(allsign){
				 detailsFactory.allAuditorSign(det.auditDetail.auditSeqNo,det.auditDetail.companyId).$promise.then(function(result){
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
		
		var certificateDetailDatas='';
		if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0){
		 certificateDetailDatas = _.max(det.auditDetail.certificateDetail, function(find){
			
			 if(find.generatedBy == 1001){
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
			 
			
		}else if(!det.auditDetail.openMeetingDate){
			flag = false;
			$timeout(function(){
				toaster.warning('Please Enter the '+det.openMettingDate);
			},10);
			
		
		}/*else if((det.minOpenMeetingDate && openMeetingDate<det.minOpenMeetingDate) || (det.receiptMinDate && openMeetingDate<det.receiptMinDate) || (det.maxOpenMeetingDate && openMeetingDate>det.maxOpenMeetingDate) || (det.receiptMaxDate && openMeetingDate>det.receiptMaxDate)){
			
			flag = false;
			
		}*/else if(det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && !det.auditDetail.closeMeetingDate){
			
			flag = false;
			
			toaster.warning('Please Enter the '+det.clseMetingdate); 
			
		}/*else if((det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID) && ( (det.minCloseMeetingDate && closeMeetingDate<det.minCloseMeetingDate) || (det.maxCloseMeetingDate && closeMeetingDate>det.maxCloseMeetingDate) ) ){
			
			flag = false;
			
		}*/else if(!det.auditDetail.certIssueDate && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID && det.scopeId == 1000){
			
			
			flag = false;
			$timeout(function(){
				 var msg=(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'SSP':'';
					
					toaster.warning('Please Enter '+msg+' Issue Date');
			},10);	
           
			
			
		}else if(det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && !det.auditDetail.certExpireDate && det.scopeId == 1000){
			
			flag = false;
			
			toaster.warning('Please Enter '+det.expiredate);  
			
			
		}else if((det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID) && (det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID) && (!det.auditDetail.interalAuditDate || det.auditDetail.interalAuditDate=='N.A.')){
			
			    flag = false;
				
				toaster.warning('Please Select the Internal '+det.auditType+' Date');
			
		}else if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)&&(!det.auditDetail.sspReviewDetail[0].sspRevisionNo))
			{
			flag=false;
			
			$timeout(function(){
				toaster.warning('Please Enter '+det.revsionNo);
			},10);	
			
			}else if(selectedSummary.length==0){
			
			flag = false;
			$timeout(function(){
				toaster.warning('Mandatory '+det.auditType+' Summary selection is missing, please choose the appropriate');
			},10);	
			
			
		}else if(!det.auditDetail.narrativeSummary){
			
			flag = false;
			toaster.warning('Please write comment(s) in Narrative Summary');
			
		}else if((!(det.auditDetail.certificateDetail) || det.auditDetail.certificateDetail.length==0 ||  certificateDetailDatas.publishStatus==0) && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID) && det.scopeId == 1000 && det.auditDetail.auditSummaryId!= det.AppConstant.NOT_APPROVED_SUMMARY){
			var reviewerId='';
			 det.auditDetail.auditAuditorDetail.forEach(function(a){
					if(a.auditRoleDesc=="REVIEWER"){
						reviewerId=a.userId;
					}
			 });
			/*to remove validation of date mismatch for manager*/ 
			 if(det.loginUserId!= reviewerId) {
				flag = false;
				toaster.warning('Please publish Certificate');
			 }

		}else if(!det.auditDetail.creditDate && ( det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId != det.AppConstant.ADDITIONAL_SUB_TYPE_ID)){
			
		    flag = false;
			
			toaster.warning('Please Enter Credit Date');
		
	    }else if(det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
			{
			
			var ReviewDate =det.auditDetail.auditDate? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD):'';
			//var statusDate = res.auditDetail.auditFinding[0].findingDetail[0].statusDate? moment(new Date(res.auditDetail.auditFinding[0].findingDetail[0].statusDate),YYYYMMDD).format(YYYYMMDD):'';
			det.auditDetail.auditFinding.forEach(function(a){
				
				det.statusDate=a.findingDetail[0].statusDate? moment(a.findingDetail[0].statusDate,YYYYMMDD+HHmm).format(YYYYMMDD):'';
			});
			
			if(ReviewDate < det.statusDate )
				{
				flag = false;
				toaster.warning('Please change the Review date, which cannot be earlier than the status Date');			//changed by @Ramya for Jira id - IRI-5573
			
				}else if(ReviewDate >  det.statusDate)
    				{
			
    				toaster.warning('Please check the status date');
    				flag=true;
    				}
			
		}else if(det.scopeId == 1000 && det.auditDetail.certificateDetail && det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID && det.auditDetail.certificateDetail.length>0  && NotcarUpdateStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY   && (det.userRoleId != det.AppConstant.ADMIN_ROLE_ID && det.userRoleId != det.AppConstant.MANAGER_ROLE_ID)){
			
			var certificateDetail = _.max(det.auditDetail.certificateDetail, function(find){
				
				if(find.generatedBy == 1001){
				return  find.seqNo;   }
				});
//			if(det.additionalEndorsedCertificate){
//				 certificateDetail = angular.copy(det.additionalEndorsedCertificate);
//			 }
			
			var auditPlace = certificateDetail.auditPlace ? atob(certificateDetail.auditPlace): '-';
			 auditPlace = auditPlace? decodeURIComponent(auditPlace):'-';
			 
			 var reviewerId='';
			 det.auditDetail.auditAuditorDetail.forEach(function(a){
					if(a.auditRoleDesc=="REVIEWER"){
						reviewerId=a.userId;
					}
			 });
			 
			
			/*to remove validation of date mismatch for manager*/ 
			 if(certificateDetail.generatedBy &&   certificateDetail.generatedBy == 1001 && det.loginUserId!= reviewerId) {
					
					/*if(auditPlace!=det.auditDetail.auditPlace && auditPlace!='-' && certificateDetail.certIssueId !=1003 && certificateDetail.certIssueId !=1008){
					
					flag = false; 
					toaster.warning('Please publish the certificate once again because Audit place is mismatching');
				}*//*else if( (moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD)) != (moment(certificateDetail.auditDate).format(YYYYMMDD)) ){
		              flag = false; 
		              toaster.warning('Please publish the certificate once again because Audit Date is mismatching');
				}else */if( (moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD)) != (moment(certificateDetail.extendedIssueDate).format(YYYYMMDD))  && certificateDetail.extendedIssueDate){
		              flag = false;
		              toaster.warning('Please publish the certificate once again because Certificate Issue Date is mismatching');
				}else if( (moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) != (moment(certificateDetail.extendedExpireDate).format(YYYYMMDD))  && certificateDetail.extendedExpireDate){
		              flag = false; 
		              toaster.warning('Please publish the certificate once again because Certificate Expiry Date is mismatching');
				}else if( (moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD)) != (moment(certificateDetail.certIssueDate).format(YYYYMMDD))  && !certificateDetail.extendedIssueDate){
		              flag = false; 
		              toaster.warning('Please publish the certificate once again because Certificate Issue Date is mismatching');
				}else if( (moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD)) != (moment(certificateDetail.certExpireDate).format(YYYYMMDD)) && !certificateDetail.extendedExpireDate){
			          flag = false; 
			          toaster.warning('Please publish the certificate once again because Certificate Expiry Date is mismatching');
				}/*else if(det.auditDetail.certificateDetail[0].grt!=det.vesselDetail.grt){
					flag = false;
					 toaster.warning('Please publish the certificate once again because GRT is mismatching');
				}else if( (moment(det.auditDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD)) != (moment(certificateDetail.dateOfRegistry).format(YYYYMMDD)) ){
	              flag = false;
	              toaster.warning('Please publish the certificate once again because Date Of Registry is mismatching');
				}*//*else if(closeMeetingDate > moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD) && det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId != det.AppConstant.FULL_TERM_CERT){
					
					flag = false; 
					toaster.warning('Closing Meeting date should not be greater then expiry date');
				}*/
			}
			
		}
		
		/*if(moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD) < moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD)){
			 flag = false;
            toaster.warning('Please publish the certificate once again because Certificate Issue Date is less then Closing Meeting Date');
		}*/
		 
		if(flag && (det.auditDetail.auditTypeId==det.AppConstant.ISPS_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID)){
		
			if(flag && det.auditDetail.auditFinding.length>0){    			    			
			
				var dwngradeFlag = false
			
				var mncFlag = false;
			
				var deficiencyFlag = false
			
				det.auditDetail.auditFinding.forEach(function(a){
				
					dwngradeFlag = false;    				
					mncFlag = false;
					deficiencyFlag = false;
					a.findingDetail.forEach(function(b){
					
						if(b.categoryId == det.AppConstant.MAJOR_FINDING_CATEGORY && b.statusId == det.AppConstant.OPEN && b.nextActionId == det.AppConstant.DOWNGRADE){
						
							mncFlag = true;
						
						}else if(b.categoryId == det.AppConstant.MINOR_FINDING_CATEGORY && b.statusId == det.AppConstant.OPEN && b.nextActionId == det.AppConstant.RESTORE_COMPLAINCE){
							deficiencyFlag = true;
						}
					
						if(mncFlag){
							if(b.categoryId == det.AppConstant.MAJOR_FINDING_CATEGORY && b.statusId == det.AppConstant.DOWNGRADED && b.nextActionId == det.AppConstant.PLAN_ACCEPTED){
								dwngradeFlag = true;
							}
						}
						if(deficiencyFlag){
							if(b.categoryId == det.AppConstant.MINOR_FINDING_CATEGORY && b.statusId == det.AppConstant.COMPLAINCE_RESTORED && b.nextActionId == det.AppConstant.PLAN_ACCEPTED){
								dwngradeFlag = true;
							}
						}
						
					});
					
					if(!dwngradeFlag && mncFlag){
						flag = false;
						var type = (det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID) ? 'Serious Deficiency' : 'Major Failure';
    				
						toaster.warning(type+ ' need to be Downgraded');
					}
				
					if(!dwngradeFlag && deficiencyFlag){
						flag = false;
						var type = (det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID) ? 'Deficiency' : 'Failure';
    				
						toaster.warning(type+' need to be Compliance Restored');
    				}
			});
		}
	}else if(flag && det.auditDetail.auditTypeId==det.AppConstant.ISM_TYPE_ID){
	
		if(flag && det.auditDetail.auditFinding.length>0){   			    			
			
			var dwngradeFlag = false
			
			var mncFlag = false;
			
			det.auditDetail.auditFinding.forEach(function(a){
				
				dwngradeFlag = false;    				
				mncFlag = false;
				a.findingDetail.forEach(function(b){
					
					if(b.categoryId == det.AppConstant.MAJOR_FINDING_CATEGORY && b.statusId == det.AppConstant.OPEN && b.nextActionId == det.AppConstant.DOWNGRADE){
						
						mncFlag = true;
						
					}
					
					if(mncFlag){
						if(b.categoryId == det.AppConstant.MAJOR_FINDING_CATEGORY && b.statusId == det.AppConstant.DOWNGRADED && b.nextActionId == det.AppConstant.PLAN_ACCEPTED && b.statusDate){
							dwngradeFlag = true;
						}
					}
						
				});
				if(!dwngradeFlag && mncFlag){
    				flag = false;
    				toaster.warning('MNC need to be Downgraded');
    			}
			});
			   
		}
	}

	// commented by ramya for jira id--> IRI-5278
		
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
		// 	var msg ='';
		// 	if(det.auditTypeId == det.AppConstant.SSP_TYPE_ID)
		// 		msg= det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID?'Approval Letter':'Amendment Approval Letter';
		// 	else if(det.auditTypeId == det.AppConstant.DMLC_TYPE_ID)
		// 		msg = det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID?'Review Letter':'Amendment Review Letter';
			
		// 	toaster.warning('vessel details are Updated, please generate the '+msg+' again');
		//    }
		/*if(status == 'statusComplete')
			if(checkCertificateVesselDeatils(det.auditDetail.certificateDetail[0], 'firstCheck'))
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
		
		 
		 if(id==det.AppConstant.AUDIT_REVIEWER_ROLE_ID){
			 
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
				
			}else if(!det.notLead && det.rptAttchFlag && det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditRptAttach.length > 0 && (det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus!=0)){
				
				var notAvlReport = _.filter(det.auditDetail.auditRptAttach, function(obj){ 
					return !obj.fileName ;
				});
				
				if(notAvlReport.length>0 && !det.avoidReportModel){ 
					//&& det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS
					ModalService.showModal({
            			
            			templateUrl : 'src/modals/docChanged.html',
            			
            			controller  : 'docChangedController',
            			
            			inputs		: {data:'Report attachments are missing, Do you want to proceed ?'},
            		
            		}).then(function(modal){
            			
            			modal.element.modal();
            				    			
            			modal.close.then(function(result){
            				if(result=='NO'){
            					det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
            					flag = false;
            				}else if(result=='YES'){
            					
            					var reviewerDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'auditRoleID' : det.AppConstant.AUDIT_REVIEWER_ROLE_ID});
            					 
            					//det.rptAttchFlag = false;
            					
            					if((val =='statusChange')){
            						
            						var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
            						
            						 
            						
            						if((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY && (det.auditDetail.sspReviewDetail[0].ltrStatus==1) && (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY) || moment(det.auditDetailOrg.certIssueDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.certIssueDate,DDMMMYYYY).format(DDMMMYYYY)|| reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY) ||  det.auditDetailOrg.sspReviewDetail[0].sspRevisionNo!=det.auditDetail.sspReviewDetail[0].sspRevisionNo)){
            							det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
            						}
            						else if(((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID) && det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY) && reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)|| (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY))){
            							det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;
    		    					}
            						else if(det.receiptLtr && reciptDate==moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)&& det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
            		   					   det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
            		 					   var msg=(det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID)?'Amendment Receipt Letter' : 'Receipt Letter';
            		 					   toaster.warning('Please save the review and Generate '+msg+'');  
            		   				   }
            						else{
            		   					  if(!validateReviewLetterWithAuditStatus && det.auditDetail.auditSummaryId != det.AppConstant.NOT_APPROVED_SUMMARY){
            		   						det.auditDetail.auditStatusId = det.AppConstant.COMMENCED_AUDIT_STATUS;
            		   					   var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
            		   					   toaster.warning('Please Generate '+msg+' ');
            		   					  } else{
            		   						  det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;
            		   					  } 
            							}
            						
            						
            						if(det.lengthOfFindingExceptObs()==0){
                						det.auditDetail.allowNext = ((det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) && det.leadSign)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
                        			}
            						
            					}else if(det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS){
            						flag = false;
            						toaster.warning('Please change '+det.auditType+' status to completed');
            					}else if(notAvlAuditorSign.length>0){
            						flag = false;
            						toaster.warning('Signatures and Signature Date of all the '+det.auditorType+'s are required');
            					
            					}else if(val=='letter' && flag){
            						
            						det.exportapprovalletter(det.auditTypeId,det.companyId,det.auditSeqNo);
            						
            					}else if(val=='amendment' && flag){
            						
            						det.exportAmendmentLetter(det.auditTypeId,det.companyId,det.auditSeqNo);
            							
            					}else if(flag && (!reviewerDetail || reviewerDetail.auditRoleID!=det.AppConstant.AUDIT_REVIEWER_ROLE_ID)){
            		    			
            						flag = false;
            						toaster.warning('Please Add Reviewer to Initiate Review.');
            						
            		    		}else if(flag){

            			        	det.auditDetail.reviewStatus = det.AppConstant.INITIATE_REVIEW_STATUS;
            			        	
            			        	if(det.lengthOfFindingExceptObs()==0){
            							det.auditDetail.allowNext = ((det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) && det.leadSign)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
            	        			}else{
            	        				det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
            	        			}
            	        			
            	        			det.saveAuditData(det.auditType+' has been Initiated Successfully','initiateReview');
            	        			
            	        			/*$timeout(function(){
            	        				toaster.clear();
            	        				toaster.success(det.auditType+' Review has been Initiated Successfully');
            	        			},500);*/
            			        }
            					return flag;
            				}
            			});
            		});
        			
				}else if(((det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID) && det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY) && reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)|| (moment(det.auditDetailOrg.auditDate,YYYYMMDD).format(DDMMMYYYY)!=moment(det.auditDetail.auditDate,DDMMMYYYY).format(DDMMMYYYY))){
					det.auditDetail.auditStatusId = det.AppConstant.COMPLETED_AUDIT_STATUS;
				}
				else{
					flag = true;
					return flag;
				}
				
			}else if (!det.rptAttchFlag && det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID){
				 
				if((val !='statusChange') && notAvlAuditorSign.length>0){
					flag = false;
					toaster.warning('Signatures and Signature Date of all the '+det.auditorType+'s are required');
				}
				return flag;

			}/*else if(det.auditDetail.auditRptAttach.length == 0){
				
				flag = false;
				toaster.warning('Please Upload Report Attachments');
				return flag;
				
			}*/else{
				
				return flag;
			}
		}else{
			
			flag = false;
			return flag;
		}
		
	}
	
	/***disable Narrative summary content***/
	function disableNarativeSummary(){
		$('#narrative').summernote('disable');						//Added by ramya for jira ID-->5196
		// document.getElementById("nodeheight").setAttribute("contenteditable", "false");
	}
	
	/***enable Narrative summary content***/
	function enableNarativeSummary(){

		if(!det.lockStatus && det.userRoleId==det.AppConstant.AUDIT_AUDITOR_ROLE_ID && ((det.reviewerLogin && det.auditDetail.reviewStatus != det.AppConstant.REVERT_REVIEW_STATUS) || det.auditDetail.reviewStatus != det.AppConstant.INITIATE_REVIEW_STATUS) && det.auditDetail.reviewStatus != det.AppConstant.ACCEPTED_REVIEW_STATUS && (det.auditDetail.auditStatusId==det.AppConstant.COMMENCED_AUDIT_STATUS || det.auditDetail.auditStatusId==det.AppConstant.COMPLETED_AUDIT_STATUS) && /*((det.notLead && det.leadSign) || !det.notLead) &&*/ !det.currUserSign && !(det.nextAdtCreated)){
			$('#narrative').summernote('enable'); //Added by sudharsan for IRI-5217
			det.auditDetail.auditAuditorDetail.forEach(function(additional_auditor_check){ //Added by sudharsan for IRI-5217	
				if(additional_auditor_check.audLeadStatus == 0  && additional_auditor_check.userId==det.loginUserId || additional_auditor_check.delegateSign == 1 && additional_auditor_check.audSignature!=''){ //Added by sudharsan for JIRA ID IRI-5228
					det.disableNarativeSummary();
				}
			});	
			if((det.lockStatus==false ||det.lockStatus==true) && det.reviewerLogin && det.auditDetail.reviewStatus==det.AppConstant.REVERT_REVIEW_STATUS){
				det.disableNarativeSummary();
				
			}	
		}
			
		if(!det.lockStatus && det.auditDetail.auditStatusId==det.AppConstant.REOPEN  &&  (det.userRoleId==det.AppConstant.ADMIN_ROLE_ID || det.AppConstant.MANAGER_ROLE_ID )){
			$('#narrative').summernote('enable');
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
		
		if(det.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
			
			det.maxDmlc1issueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD);
			
			if(moment(det.auditDetail.interalAuditDate,MMMDDYYYY).format(YYYYMMDD)> det.maxDmlc1issueDate){
				det.auditDetail.interalAuditDate = '';
			}
		}
	   });
	
	
	/****on click of initiate review button****/
	function initiateReview(){ 
		
		var  reviewerAvl = false, flag = true; // allAuditorSign = true,
		
		if(det.attachSignValidation()){ 
			
			if(det.completedStatusValidation()){ 
			
				//if(det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID || det.isAllFindingClose()){
					
					if((det.lengthOfFindingExceptObs()==0 || det.isAllFindingClose()) && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS && (det.auditDetail.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditDetail.auditTypeId!=det.AppConstant.DMLC_TYPE_ID)){
						flag = false;
						toaster.warning('Please change '+det.auditType+' status to completed');	
					}
					
					var reviewerDetail = _.findWhere(det.auditDetail.auditAuditorDetail, {'auditRoleID' : det.AppConstant.AUDIT_REVIEWER_ROLE_ID});
	    		
					if(flag && (!reviewerDetail || reviewerDetail.auditRoleID!=det.AppConstant.AUDIT_REVIEWER_ROLE_ID)){
						flag = false;
						toaster.warning('Please Add Reviewer to Initiate Review');
						
					}else if(det.auditDetail.sspReviewDetail[0] && det.auditDetail.sspReviewDetail[0].ltrStatus==0 &&!(det.disabledApproveButton) && (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)){
				 
						 var msg= (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Approval Letter': (det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID && det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Amendment Approval Letter' :  ( det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID && det.auditDetail.auditSubTypeId==det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ?'Review Letter':'Amendment Review Letter';
						 flag = false; 
						 toaster.warning('Please Generate '+msg+'  to Intiate Review');
					
					}else if( (det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && (det.lengthOfFindingExceptObs()==0 || det.isAllFindingClose()) && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS){	//Added by Ramya on 3-3-2022 jira id -> IRI-5140
						
						flag = false;
						toaster.warning('Please change '+det.auditType+' status to completed');
					}
	    		
					/*if(flag && det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID && det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID && det.sspDmlcAuditSeqNo ){
				
						detailsFactory.checkAuditStatus(det.sspDmlcAuditSeqNo,det.AppConstant.DMLC_TYPE_ID,det.companyId).$promise.then(function(res){
			        		
			        		if(res.auditStatus != det.AppConstant.COMMENCED_AUDIT_STATUS){

			        			det.auditDetail.reviewStatus = det.AppConstant.INITIATE_REVIEW_STATUS;
			    				
			        			det.saveAuditData();
    				
			        			$timeout(function(){
			        				toaster.clear();
			        				toaster.success(det.auditType+' has been initiated successfully');
			        			},500);
			        		}else{
			        			toaster.warning('Linked DMLC II Review has not been Completed yet.');
			        		}
			        	});
			        }else */
					if(flag){

			        	det.auditDetail.reviewStatus = det.AppConstant.INITIATE_REVIEW_STATUS;
	        			
	        			if(det.lengthOfFindingExceptObs()==0){
							det.auditDetail.allowNext = ((det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS) && det.leadSign)?det.AppConstant.ACCEPT:det.AppConstant.NOTACCEPT;
	        			}else{
	        				det.auditDetail.allowNext = det.AppConstant.NOTACCEPT;
	        			}
	        			
	        			det.saveAuditData(det.auditType+' has been Initiated Successfully','initiateReview');
			
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
		  
		 var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
			if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)){
				det.receiptLtr= true;
			}
		if(det.auditTypeId == det.AppConstant.SSP_TYPE_ID){
			if(!det.notLead)/*only for Lead */
			{
			if(det.approvalLetterValidation()){
				if(det.auditDetailDataValidation()){
				
				det.saveAuditData('Data Saved Successfully');		
				$timeout(function(){
					det.receiptLtr=false;										//added by @Ramya on 27-06-2022 for Jira Id - IRI-5350
					det.receiptStart=true;
					det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
						
					det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
					
				},1000);;
				
				det.validateAndSaveAuditData();
				}
				else{
					det.approvalLtrStaus=true;							//added by @Ramya on 22-06-2022 for Jira Id - IRI-5341
				}
			}
			else{
				det.approvalLtrStaus=true;
			}
		}
		else if(det.notLead){
			
			det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
						
			det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
			
		}
		}else{/*
			if(det.auditDetailDataValidation()){
			det.auditDetail.sspReviewDetail[0].ltrStatus=1;	
			det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
			det.validateAndSaveAuditData();
			}
		*/
		
			
			det.auditDetail.auditAuditorDetail.forEach(function(index){
				if(index.audLeadStatus==1){  console.log(index);
					
				  }
			});
			
			if(det.auditDetailDataValidation()){ 
				if(!det.isAllFindingClose() && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID  && !det.notLead){
			   		

					 
					 ModalService.showModal({
			    			
				    		templateUrl : 'src/modals/docChanged.html', 
				    			
				    		controller  : 'docChangedController',
				    			
				    		inputs		: {data:'Review Note(s) are still open, do you want to proceed to generate the Review Letter'},	    			
				    		
				    	}).then(function(modal) {
				    			
				    		modal.element.modal();
				    			
				    		modal.close.then(function(result) { console.log("result"); console.log(result);
				    				
				    			if(result == 'YES'){
				    				det.saveAuditData('Data Saved Successfully');
				    				$timeout(function(){
				    					det.receiptLtr=false;											//added by @Ramya on 27-06-2022 for jira id - IRI-5350
										det.receiptStart=true;
				    					det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
				    						
				    					det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
				    					
				    				},1000);
				    				det.validateAndSaveAuditData();
				    			}else if(result == 'NO'){
				    				
				    				toaster.warning('please close findings');
				    				det.leadSignIndex=0;
				    				det.auditDetail.reviewStatus=(det.auditDetail.reviewStatus==1)?0:det.auditDetail.reviewStatus;
				    				det.removeSign(det.leadSignIndex,1001);
				    				det.currentFinding();
				    				
				    			}else if(result == 'Cancel'){
				    				close("result", 0);
				    				$('.modal-backdrop').remove();
				    				
				    			}
				    		});
				    	});
					 
				  
	   		   
				}else if(det.isAllFindingClose()){ 
					det.saveAuditData('Data Saved Successfully');
					$timeout(function(){
						
						det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
							
						det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
						
					},1000);
    				det.validateAndSaveAuditData();
				}
				
			/*det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
			det.auditDetail.sspReviewDetail[0].ltrStatus=1;
			det.validateAndSaveAuditData(); 
			*/
			
			
			}
			if(det.notLead){
				det.exportAmendmentLetter(auditTypeId,companyId,auditSeqNo);
			}
		
		}
		
	}
	
	function exportAmendmentLetter(auditTypeId,companyId,auditSeqNo){

		//var doc = new jsPDF('p', 'mm', 'a4');	
		
		masterFactory.getCurrentUserDetail(det.auditDetail.auditAuditorDetail[0].userId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				det.leadTitalChanges = data.title /** IRI-5245 added by kiran  */ 
				det.leadSignChanges = data.signature;
				det.signerName = data.signer;
		
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
				
				//if(det.auditDetailDataValidation()){
					
					detailsFactory.getAuditDetail(auditTypeId,companyId,auditSeqNo).$promise.then(function(res) {
							var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
						
				   		
				   		// detailsFactory.getSignature(leadEmailId,det.companyId).$promise.then(function(signRes){
				   		 
				   			 console.log(res);
				   				//det.leadSignImgData = signRes.userDetail.signature;
						blockUI.stop();
						blockUI.start("Preparing Letter");
				   			 
						var certificateDatas = {
								'leadAuditorName':det.signerName,
								'auditTypeId'	 :res.auditTypeId,
								'companyaddress' :res.companyAddress,
								'auditDate'		 :res.auditDate==det.auditDetail.auditDate?moment( res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.auditDate,
								'companyname'    :res.companyName,
								//'certIssueDate'	 :res.certIssueDate==det.auditDetail.certIssueDate?moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.certIssueDate,
								'certIssueDate'	 :res.closeMeetingDate ?moment(res.closeMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'):moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'),
								//'vesselName'     :_(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('vesselName').toString(),
								'vesselName'	 : det.vesselDetail.vesselName ? det.vesselDetail.vesselName : det.vesselArray ?  _(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('vesselName').toString() :' ',
								'officialNo'     :_(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('officialNo').toString(),					
								'vesselImoNo'    :res.vesselImoNo,
								'auditSubTypeId' :res.auditSubTypeId,
								'certificateNo' :res.certificateNo,
								'revisionNo':res.sspReviewDetail[0].sspRevisionNo==det.auditDetail.sspReviewDetail[0].sspRevisionNo?res.sspReviewDetail[0].sspRevisionNo:det.auditDetail.sspReviewDetail[0].sspRevisionNo,
								'leadSign':det.leadSignChanges,
								'title':det.leadTitalChanges, /** IRI-5245 added by kiran  */ 
						}
						validateReviewLetterWithAuditStatus=true;
						var certificate = "";
						var certificateName = "";
						
						if(res.auditTypeId == det.AppConstant.SSP_TYPE_ID){
							
							certificate = auditService.sspAmendmentLetter(certificateDatas);
							
							certificateName = 'Amendment Letter_' + certificateDatas.certificateNo + '.pdf';
		
							/*var enc = window.btoa(certificate);
		
							var decrypt = window.atob(enc);
		
							doc.addImage(decrypt, 'PNG', 0, 0, doc.internal.pageSize.width,doc.internal.pageSize.height, "newCertificate", 'FAST');
		
							doc.save('Amendment Letter_' + certificateDatas.certificateNo + '.pdf');*/
							
							blockUI.stop();
							
							/*if(_(det.auditDetail.auditAuditorDetail).chain().where({'auditRoleID':1003}).pluck('userId').toString() == det.loginUserId){
							
								var reviewerDtl2 = _.findWhere(det.auditDetail.auditAuditorDetail, {'auditRoleID' : det.AppConstant.AUDIT_REVIEWER_ROLE_ID});
									
								if(reviewerDtl2.auditRoleID==det.AppConstant.AUDIT_REVIEWER_ROLE_ID) { 
									
									det.auditDetail.auditStatusId = det.AppConstant.CLOSED_AUDIT_STATUS;
								
									det.validateAndSaveAuditData();
								}
							}*/
							
						}else if(res.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
							
							certificate = auditService.dmlcAmendmentLetter(certificateDatas);
							
							certificateName = 'Amendment Review Letter_' + certificateDatas.certificateNo + '.pdf';
			    			
							/*var enc = window.btoa(certificate);
		
							var decrypt = window.atob(enc);
		
							doc.addImage(decrypt, 'PNG', 0, 0, doc.internal.pageSize.width,doc.internal.pageSize.height, "newCertificate", 'FAST');
			               
							doc.save( 'Amendment Review Letter_' + certificateDatas.certificateNo + '.pdf');*/
							
							blockUI.stop();
		
						}
							
							if(title == false){
								toaster.warning("Can't generate Letter, because title is mismatching");
							}
							else{
								pdfMake
								.createPdf(certificate)
								.download(certificateName);
							}
						
						
						detailsFactory.updateLtrStatus(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.ACCEPT).$promise.then(function(res){
							console.log(res);
							
							if(res.success){
								det.approvalLtrStaus=false;
							
										
										detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response) {
											console.log(response);
									
					        		if(response){ 
		                           det.LetterHistoryDetails=response;
					        		
					        		det.LetterHistoryDetails = response.filter(function( obj ) {
					        			try {
					        				obj.certIssueDate = moment(obj.certIssueDate).format(MMMDDYYYY);
											var auditPlace = obj.auditPlace ? atob(obj.auditPlace)
													: '-';
											obj.auditPlace = decodeURIComponent(auditPlace);
										} catch (err) {
											console.log(err);
										}
					        			
										return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
									});
					        		
					        		
			        				console.log(det.auditSeqNo)
			        				setVesselLetterHist(det.auditSeqNo,response);
										}
					        		
					        			
										});
							}
						});
				   		// });
					});
				});
			});
			
			
		//}
		
	}
	
	function validateAndExportapprovalletter(auditTypeId,companyId,auditSeqNo){
		det.approvalLtrStaus=false;
		 var reciptDate =  det.auditDetail.openMeetingDate? moment(det.auditDetail.openMeetingDate,DDMMMYYYY).format(DDMMMYYYY):'';
		if(reciptDate!=moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY)){
			det.receiptLtr= true;
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
		if(det.auditTypeId == det.AppConstant.SSP_TYPE_ID){
			if(!det.notLead)/*only for Lead */
			{
			if(det.approvalLetterValidation()){
				if(det.auditDetailDataValidation()){
				det.saveAuditData('Data Saved Successfully');

				/*if(det.checkFlagV==true)
					{*/
				$timeout(function(){
					det.receiptLtr=false;										//added by @Ramya on 27-06-2022 for Jira Id - IRI-5350
					det.receiptStart=true;
					det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
				},50);	
					//}
					det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
				}
				else{
					det.approvalLtrStaus=true;								//added by @Ramya on 22-06-2022 for Jira Id - IRI-5341
				}
			}
			else{
				det.approvalLtrStaus=true;
			}
		}else if(det.notLead){
			
			det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
			
			det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
			
		}
		}else if(!det.notLead){ /*only for Lead */
			if(det.auditDetailDataValidation()){ 
				
				
				if(!det.isAllFindingClose() && det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID){
	   		

					 
					 ModalService.showModal({
			    			
				    		templateUrl : 'src/modals/docChanged.html', 
				    			
				    		controller  : 'docChangedController',
				    			
				    		inputs		: {data:'Review Note(s) are still Open, do you want to proceed'},	    			
				    		
				    	}).then(function(modal) {
				    			
				    		modal.element.modal();
				    			
				    		modal.close.then(function(result) {
				    				
				    			if(result == 'YES'){
				    				det.validateAndSaveAuditData();
				    				$timeout(function(){
										det.receiptLtr=false;										//added by @Ramya on 27-06-2022 for Jira Id - IRI-5350
										det.receiptStart=true;
				    					det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
									},50);
				    					det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
				    					
				    				
				    			
				    			}else if(result == 'NO'){
				    				
				    				toaster.warning('please close Review Note(s)');
				    				det.leadSignIndex=0;
				    				det.auditDetail.reviewStatus=(det.auditDetail.reviewStatus==1)?0:det.auditDetail.reviewStatus;
				    				det.removeSign(det.leadSignIndex,1001);
				    				det.currentFinding();
				    				
				    			}else if(result == 'Cancel'){
				    				close("result", 0);
				    				$('.modal-backdrop').remove();
				    				
				    			}
				    		});
				    	});
					 
				  
	   		   
				}else{
					det.validateAndSaveAuditData();
				
				
    					det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
						
    					det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
    					
    				
    				
				}
				
			/*det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
			det.auditDetail.sspReviewDetail[0].ltrStatus=1;
			det.validateAndSaveAuditData(); 
			*/
			
			
			}
		}else if(det.notLead){
			
			det.exportapprovalletter(auditTypeId,companyId,auditSeqNo);
			
			det.auditDetail.sspReviewDetail[0].ltrStatus=1; 
			
		}
	}
	
	
	function exportapprovalletter(auditTypeId,companyId,auditSeqNo){
		masterFactory.getCurrentUserDetail(det.auditDetail.auditAuditorDetail[0].userId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				det.leadTitalChanges = data.title /** IRI-5245 added by kiran  */ 
				det.leadSignChanges = data.signature;
				det.signerName = data.signer;
		
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
				
					//var doc = new jsPDF('p', 'mm', 'a4');	
				
					//if(det.auditDetailDataValidation()){
					
						detailsFactory.getAuditDetail(auditTypeId,companyId,auditSeqNo).$promise.then(function(res) {
							console.log(res);
							if(res.$resolved==true){
								
								detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,auditTypeId,companyId).$promise.then(function(response) {
								
							
						
							var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
							
					   		
					   		 //detailsFactory.getSignature(leadEmailId,det.companyId).$promise.then(function(signRes){
					   		
					   			 
					   				//det.leadSignImgData = signRes.userDetail.signature;
							blockUI.stop();
						    blockUI.start("Preparing Letter");
									var certificateDatas = {
								
											'leadAuditorName':det.signerName,
											'auditTypeId'	 :res.auditTypeId,
											'companyaddress' :res.companyAddressAud,
											'auditDate'		 :res.auditDate==det.auditDetail.auditDate?moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.auditDate,
											//'companyname'    :res.companyName,
											'certIssueDate'  :res.certIssueDate==det.auditDetail.certIssueDate?moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.certIssueDate,
											'vesselName'     :det.vesselDetail.vesselName ? det.vesselDetail.vesselName : det.vesselArray ?  _(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('vesselName').toString() :' ',
											'officialNo'     :det.vesselDetail.officialNo ? det.vesselDetail.officialNo :det.vesselArray ? _(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('officialNo').toString():'',					
											'vesselImoNo'    :res.vesselImoNo,
											'auditSubTypeId' :res.auditSubTypeId,
											'certificateNo' :res.certificateNo,
											'revisionNo':res.sspReviewDetail[0].sspRevisionNo==det.auditDetail.sspReviewDetail[0].sspRevisionNo?res.sspReviewDetail[0].sspRevisionNo:det.auditDetail.sspReviewDetail[0].sspRevisionNo,
											'receiptDate':moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'),
											'leadSign':det.leadSignChanges,
											'title':det.leadTitalChanges,/** IRI-5245 added by kiran  */ 	
									}
									//res.leadSign = det.leadSignReceiptLtr;
									validateReviewLetterWithAuditStatus=true;
									var certificate='';
										
									var certificateName = '';
									console.log(certificateDatas);
									if(res.auditTypeId == det.AppConstant.SSP_TYPE_ID){
						
										 certificate = auditService.sspApproveLetter(certificateDatas);
										 
										 certificateName = 'Approval Letter_' + res.certificateNo + '.pdf';
										
		//								var enc = window.btoa(certificate);
		//
		//								var decrypt = window.atob(enc);
		//
		//								doc.addImage(decrypt, 'PNG', 0, 0, doc.internal.pageSize.width,doc.internal.pageSize.height, "newCertificate", 'FAST');
		//
		//								doc.save('Approval Letter_' + certificateDatas.certificateNo + '.pdf');
										blockUI.stop();
										
								
						
									}else if(res.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
										var certificateDatas1 = {
												
												'leadAuditorName':det.signerName,
												'auditTypeId'	 :res.auditTypeId,
												'companyaddress' :res.companyAddressAud,
												'auditDate'		 :res.auditDate==det.auditDetail.auditDate?moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.auditDate,
												//'companyname'    :res.companyName,
												'certIssueDate'  :res.closeMeetingDate==det.auditDetail.closeMeetingDate?moment(res.closeMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'):det.auditDetail.closeMeetingDate,
												'vesselName'     :det.vesselDetail.vesselName ? det.vesselDetail.vesselName : det.vesselArray ?  _(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('vesselName').toString() :' ',
												'officialNo'     :det.vesselDetail.officialNo ? det.vesselDetail.officialNo :det.vesselArray ? _(det.vesselArray).chain().where({'vesselImoNo':res.vesselImoNo}).pluck('officialNo').toString():'',					
												'vesselImoNo'    :res.vesselImoNo,
												'auditSubTypeId' :res.auditSubTypeId,
												'certificateNo' :res.certificateNo,
												'revisionNo':res.sspReviewDetail[0].sspRevisionNo==det.auditDetail.sspReviewDetail[0].sspRevisionNo?res.sspReviewDetail[0].sspRevisionNo:det.auditDetail.sspReviewDetail[0].sspRevisionNo,
												'receiptDate':moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'),
												'leadSign':det.leadSignChanges,
												'title':det.leadTitalChanges,/** IRI-5245 added by kiran  */ 	
										}
										
										
						console.log(certificateDatas1);
										 certificate = auditService.dmlcReviewLetter(certificateDatas1);
										 
										 certificateName = 'Review Letter_' + res.certificateNo + '.pdf';
		    			
		//								var enc = window.btoa(certificate);
		//
		//								var decrypt = window.atob(enc);
		//
		//								doc.addImage(decrypt, 'PNG', 0, 0, doc.internal.pageSize.width,doc.internal.pageSize.height, "newCertificate", 'FAST');
		//               
		//								doc.save( 'Review Letter_' + certificateDatas.certificateNo + '.pdf');
										blockUI.stop();
									}
									
									if(title == false){
										toaster.warning("Can't generate Letter, because title is mismatching");
									}
									else{
										pdfMake
										.createPdf(certificate)
										.download(certificateName);
									}
									
									
									
									detailsFactory.updateLtrStatus(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.ACCEPT).$promise.then(function(res){
										console.log(res);
										if(res.success){
											det.approvalLtrStaus=false;
											
											detailsFactory.getSspReviewDetail(det.vesselDetail.vesselImoNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(response1) {
												console.log(response1);
												
												response1.forEach(function(val){
													val.certIssueDate = moment(val.certIssueDate).format(MMMDDYYYY);
								        			try {
														var auditPlace = val.auditPlace ? atob(val.auditPlace)
																: '-';
														val.auditPlace = decodeURIComponent(auditPlace);
													} catch (err) {
														console
																.log(err);
													}
								        		});
												if(response1){
												det.LetterHistoryDetails=response1;
												
								        		det.LetterHistoryDetails = det.LetterHistoryDetails.filter(function( obj ) {
													return obj.auditStatusId != det.AppConstant.VOID_AUDIT_STATUS && obj.auditSummaryId!=det.AppConstant.NOT_APPROVED_SUMMARY;
												});
								        		
								        		
						        				console.log(det.auditSeqNo)
						        				setVesselLetterHist(det.auditSeqNo,response1);		//added by @Ramya for jira id - IRI-5550
												}
								        			
								        			
								        	});
											
										}
									});
					   		//});
								});
								
							
								
							}});
						/*detailsFactory.updateLtrStatus(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.ACCEPT).;*/
						
						
						
						
						
						
					//}
			});
		});
	}
	
	
	/*function viewSspApproval(object){
		
		det.viewSSpApprove = true;
		
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
	*/
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
			
			detailsFactory.auditorSignAndSeal(res[0].officialId, sessionStorage.getItem('companyId')).$promise
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
		if(!det.notLead){
			console.log(det.auditDetail.auditAuditorDetail.length>0)
			
			if(det.AuditDetailForm.vslImo.$valid && det.auditDetail.auditAuditorDetail[0].audSignature == "")
			{
				
				det.saveAuditData('Data saved successfully');
				//toaster.warning('Please save the Auditor(s) details & proceed with the Report generation');
				
			}
			
		}
		else{															//Added by Ramya on 07-03-22 for Jira Id-->IRI-5143
			det.saveAuditData('Data Saved Successfully');
		}
		$timeout(function(){      //Added by archana on 18-10-2022 for jira Id MOBILE-708,MOBILE-710
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
			},2000);      //Added by archana on 18-10-2022 for jira Id MOBILE-708,MOBILE-710
		
	}
	
	
	function exportReceiptLetter(){
		masterFactory.getCurrentUserDetail(det.auditDetail.auditAuditorDetail[0].userId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				det.leadTitalChanges = data.title /** IRI-5245 added by kiran  */ 
				det.leadSignChanges = data.signature;
				det.signerName = data.signer;
				
				det.receiptStart=true;
				
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
				
				det.saveAuditData('Data Saved Successfully');
				det.receiptLtr= false;
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
				detailsFactory.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
				console.log(res);
					var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
					
			   		
			   		 /*detailsFactory.getSignature(leadEmailId,det.companyId).$promise.then(function(signRes){
			   		 
			   			 if(_(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('audSignature').toString()){
			   				
			   				det.leadSignImgData = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('audSignature').toString();
			   				
			   			 }else if(signRes.userDetail.signature){
			   			
			   				det.leadSignImgData = signRes.userDetail.signature;
			   			console.log(signRes.userDetail.signature);
			   			 }*/
						
				//var doc = new jsPDF('p', 'mm', 'a4');
				
				res.companyaddress = res.companyAddressAud;
				
				//res.companyname = res.companyName;
				
				res.vesselName =res.vesselNameAud;
				
				res.officialNo = det.vesselDetail.officialNo;
				
				res.leadSign = det.leadSignChanges;
				
				res.portofreg = "MAJURO";
				
				res.companyimono = det.vesselCompanyDtl.companyImoNo;
			
			    res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm)?moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format('DD-MMMM-YYYY'); 
			   
			    if(res.auditTypeId==1004 || res.auditTypeId ==1005){
			    	 res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD)?moment(res.openMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format('DD-MMMM-YYYY');
			    }
			    res.receiptdate1 = moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY');
			    
			    res.title =	det.leadTitalChanges;/** IRI-5245 added by kiran  */ 
			    
			    res.signerName =det.signerName;
			    
			    console.log("res",res);
			    
			    var certificate = '';
			    
			    var certificateName ='';
			    blockUI.stop();
			    blockUI.start("Preparing Letter");
			    if(res.auditTypeId == det.AppConstant.SSP_TYPE_ID){
			    	
		
					 certificate = auditService.sspReceiptLetter(res);
					 
					 if(res.auditSubTypeId == det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
		
						 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
					 }
					 else if(res.auditSubTypeId == det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
		
						 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
					 }
			    }else if(res.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
			    	
			    	 certificate = auditService.dmlcReceiptLetter(res);
			    	
			    	 //certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
			    	 if(res.auditSubTypeId == det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
		
						 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
					 }
					 else if(res.auditSubTypeId == det.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
		
						 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
					 }
			    }
				
				
				if(title == false){
					toaster.warning("Can't generate Letter, because title is mismatching");
				}else{
					(res.auditSubTypeId == det.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) ? toaster.success("Receipt Letter downloaded Successfully"): toaster.success("Amendment Receipt letter downloaded successfully");	//changed by @Ramya for Jira id - IRI-5627
					pdfMake
					.createPdf(certificate)
					.download(certificateName);
				}
				
		 
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
			});
		});
		
	}
	
	
	
	
	/***on click of revert review button***/
	function revertReview(){
		
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
	
	/********Lock Applied or Released**********/
	function changeCallback() {
		console.log(det.auditDetail)
		if(det.auditDetail.certificateData.length>0){
			if(det.auditDetail.certificateData[0].generatedBy == det.AppConstant.MANAGER_ROLE_ID && det.auditDetail.certificateData[0].publishStatus == 0 && det.auditDetail.certificateData[0].issuerId != sessionStorage.getItem('emailId')){
				 //toaster.success('Current '+det.auditType+' Locked by ' + det.auditDetail.certificateData[0].issuerName);
				 toaster.warning('Certificate is already generated and not yet published by Manager ' + det.auditDetail.certificateData[0].issuerName);		//changed by @Ramya for Jira id - IRI-5645
				 det.createedit = 'Unlock';
				 det.lockStatus = true;
				 det.enabled = false;
			}else{
				callSubBack();
			}	
		 }else{
			 callSubBack();
		 }
	}
		
		function callSubBack(){
			if (det.enabled) {
				det.createedit = 'Lock';
				detailsFactory.updateLockHolder(det.auditDetail.auditTypeId, det.auditSeqNo,sessionStorage.getItem('emailId'),det.companyId).$promise.then(function(data){
					if(data.data=='Success'){
						toaster.success('Lock has been applied successfully');
						
						det.lockStatus = false;
						det.lockHolder = 	sessionStorage.getItem('emailId');
						
	 				}else{
	 					
	 					if(_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('firstName').toString()){
	 						
	 						toaster.warning('Current '+det.auditType+' Locked by '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('firstName').toString()+' '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('lastName').toString());
						}else{
							detailsFactory.getCurrentUserDetail(data.lockHolder,det.companyId).$promise.then(function(userDtl){
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
				detailsFactory.updateLockHolder(det.auditDetail.auditTypeId, det.auditSeqNo,' ',det.companyId).$promise.then(function(data){
					if(data.data=='Success'){
						
						toaster.success('Lock Released Successfully');
						
						det.lockStatus = true;
					}
	 			});
			}
	 
		}
		
		/***if doc changed for vessel which is in Audit process with commenced/open audit status or Vessel going for new Audit.***/
		function updateVesselDeatils(data){ 
			
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
			    				 console.log(det.latestVesselDetail);
			    				 
			    				 det.UpdateVesselRefreshed = false;
			    				 
			    				 det.vesselRefreshed = true; 
			    				 
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
			    							'grt' : det.vesselDetail.grt ? det.vesselDetail.grt : 0,
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
			    							'docIssuerAud' : det.latestVesselDetail[0].docIssuer,
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
			    		    	 
					    		 det.letterAppComp = [];
									 
								 det.letterAppComp.companyAddress = det.latestVesselDetail[0].companyAddress;
								 det.letterAppComp.companyName = det.latestVesselDetail[0].customerName;
								 det.letterAppComp.vesselName = det.latestVesselDetail[0].vesselName;
					  			  
					  			 det.letterRecComp = [];
					  			  
					  			 det.letterRecComp.companyAddress = det.latestVesselDetail[0].companyAddress;
					  			 det.letterRecComp.companyName = det.latestVesselDetail[0].customerName;
					  			 det.letterRecComp.vesselName = det.latestVesselDetail[0].vesselName;
			    		    	 
			    		    	 vesselSpecificDtl(det.latestVesselDetail[0],'notRefresh','refresh',vesselHistory);
			    		    	 
			    		    	
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
		
	
	/***if doc changed for vessel which is in Audit process with commenced/open audit status or Vessel going for new Audit.***/
	function docChange(param){ 
		
		if(param == det.AppConstant.CREATE){
			ModalService.showModal({
	    			
	    		templateUrl : 'src/modals/docChanged.html', 
	    			
	    		controller  : 'docChangedController',
	    			
	    		inputs		: {data:'DOC Company has been changed. Please mark the previous Audit/Review as void in order to proceed further'},	    			
	    		
	    	}).then(function(modal) {
	    			
	    		modal.element.modal();
	    			
	    		modal.close.then(function(result) {
	    			if(result=='OK'|| result=='Cancel'){
	    			 det.lockStatus = true;
					    det.lockDisable = true;
						det.previousAudit = {};
						det.carFindMaxStatusDate = '';
						
						det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID];
	    			}
	    		});
	    	});	
		}
    			/* 
    			
    				
    			if(result=='NO' && param == det.AppConstant.CREATE){
    				
    				    det.lockStatus = true;
					    det.lockDisable = true;
						det.previousAudit = {};
    					det.carFindMaxStatusDate = '';
    					
    					det.enableAuditSubType = [det.AppConstant.INTERIM_SUB_TYPE_ID,det.AppConstant.INITIAL_SUB_TYPE_ID];
    					
    			}else if(result=='NO' && param == det.AppConstant.UPDATE){
    			
    				detailsFactory.updateDocFlag(det.auditDetail.auditTypeId, det.auditDetail.auditSeqNo, det.companyId, det.AppConstant.NON_ACCEPTED_DOC_FLAG).$promise.then(function(res){
    						
    						if(res.success){}
    					});
    					
    					det.lockStatus = true;
    					
    					det.lockDisable = true;
    					
    					toaster.warning('Please contact Admin, This audit need to be marked as void to proceed with new DOC Changes');
	    				
    			}else if(result == 'YES'){
    					
    					if(param == det.AppConstant.CREATE){
    						
    						detailsFactory.getPrevDocDetails(det.previousAudit.companyImoNo,det.previousAudit.companyDoc,det.previousAudit.companyId).$promise.then(function(res){
        						
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
    		*/
    	
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
			
			detailsFactory.downloadReport(fileName,det.auditSeqNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){ 
				
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
    	
		detailsFactory.downloadReport(file,det.auditSeqNo,det.auditDetail.auditTypeId,det.companyId).$promise.then(function(res){ 
    			
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
	
	/****on change of opening meeting date and close meeting date****/
    function setCloseMeetingDate(){

  		 if(det.auditDetail.openMeetingDate){
  			
  			 var prevMinStatusDate = '', prevMaxStatusDate = '';
			 
			 var maxStatusDate = '', minStatusDate = '';
			 	
			 if(det.auditDetail.auditFinding.length>0){
				 
				 var maxStatusDateFinding = det.auditDetail.auditFinding.reduce(function(prev, current){
			            return (prev.findingDetail[prev.findingDetail.length-1].statusDate > current.findingDetail[current.findingDetail.length-1].statusDate) ? prev : current
				 });
		
			    
				 maxStatusDate = maxStatusDateFinding.findingDetail[maxStatusDateFinding.findingDetail.length-1].statusDate;
				 maxStatusDate = moment(maxStatusDate,YYYYMMDD).format(YYYYMMDD);
				 var minStatusDateFinding = det.auditDetail.auditFinding.reduce(function(prev, current) {
					 return (prev.findingDetail[0].statusDate < current.findingDetail[0].statusDate) ? prev : current
				 });
				 
				 minStatusDate = minStatusDateFinding.findingDetail[0].statusDate;
				 minStatusDate = moment(minStatusDate,YYYYMMDD).format(YYYYMMDD);
			 }
			 
			/* det.observationarrayprevious.forEach(function(a){
				 var prevFindMaxFlag = true;
				 a.findingDetail.forEach(function(b){						
					 if(!(b.updateFlag) && b.statusDate && prevFindMaxFlag){
						 prevFindMaxFlag = false;
						 prevMinStatusDate = moment(b.statusDate).format(YYYYMMDD);
					 }	
				 });
					 
				 if(a.findingDetail.length > 0 && a.findingDetail[a.findingDetail.length-1].statusDate && !(a.findingDetail[a.findingDetail.length-1].updateFlag)){
					
					 if(moment(a.findingDetail[a.findingDetail.length-1].statusDate,MMMDDYYYY).format(YYYYMMDD) > prevMaxStatusDate){
						 prevMaxStatusDate = moment(a.findingDetail[a.findingDetail.length-1].statusDate,MMMDDYYYY).format(YYYYMMDD);
					 }
					
				 }else if(a.findingDetail.length > 1 && a.findingDetail[a.findingDetail.length-2].statusDate && !(a.findingDetail[a.findingDetail.length-2].updateFlag)){
					
					 if(moment(a.findingDetail[a.findingDetail.length-2].statusDate,MMMDDYYYY).format(YYYYMMDD) > prevMaxStatusDate){
						 prevMaxStatusDate = moment(a.findingDetail[a.findingDetail.length-2].statusDate,MMMDDYYYY).format(YYYYMMDD);
					 }
				 }
			 });*/
			
			 var openMeetingDate =  moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD);
			 var closeMeetingDate = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD);
				
			 /*if(((openMeetingDate > minStatusDate && minStatusDate) || (openMeetingDate > prevMinStatusDate && prevMinStatusDate)) && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID ){
					 
				 var minDate ='', findingDtl = '';
					 
				 if(!minStatusDate){
						
					 minDate = prevMinStatusDate;
					 findingDtl = 'Previous';
						
				 }else if(!prevMinStatusDate){
						 
					 minDate = minStatusDate;
					 findingDtl = 'Current';
						 
				 }else{
						
					 minDate = minStatusDate <= prevMinStatusDate ? minStatusDate : prevMinStatusDate;
					 findingDtl = minStatusDate <= prevMinStatusDate ? 'Current' : 'Previous';
				 }
    				 
				 det.auditDetail.openMeetingDate = '';
				 //toaster.warning('Please select the '+det.openMettingDate+' which should be less than or equal to the Finding Status Date:'+moment(minDate,YYYYMMDD).format(MMMDDYYYY));
				 toaster.warning('Finding status Date should be between the opening meeting and closing meeting date'); 
			 }*/
				 
			 det.observationarrayprevious.forEach(function(a){
				  a.findingDetail.forEach(function(b){						
						  if(b.currentAuditSeq == det.auditDetail.auditSeqNo){
							  console.log();
							     prevMinStatusDate = ( !prevMinStatusDate && b.statusDate ) ? b.statusDate : ( prevMinStatusDate < b.statusDate) ? prevMinStatusDate : b.statusDate ;
							     prevMaxStatusDate = ( !prevMaxStatusDate && b.statusDate ) ? b.statusDate : ( prevMaxStatusDate > b.statusDate) ? prevMaxStatusDate : b.statusDate ;
							     //prevMaxStatusDate = a.findingDetail[a.findingDetail.length-1].statusDate;
						  }
					 });
			 });
			 //added by @Ramya on 10-11-2022 for TICKET-574
			 if(det.auditDetailOrg && det.auditDetailOrg.openMeetingDate && det.auditDetailOrg.closeMeetingDate){		//added by @ramya for jira id - IRI-5580
			 var openMeetDate = moment(det.auditDetailOrg.openMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY+HHmm);
			 var closeMeetDate = moment(det.auditDetailOrg.closeMeetingDate,YYYYMMDD+HHmm).format(DDMMMYYYY+HHmm);
			 if(((openMeetingDate > maxStatusDate && maxStatusDate) || (openMeetingDate > prevMaxStatusDate && prevMaxStatusDate)) 
					 && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID ){
					$timeout(function(){
						toaster.warning('Finding status Date should be between the opening meeting and closing meeting date');
					},1);
					det.auditDetail.openMeetingDate = openMeetDate;
				 }
			 
			 
			 if( ( (closeMeetingDate < maxStatusDate && maxStatusDate )|| ( closeMeetingDate < prevMaxStatusDate && prevMaxStatusDate)) && 
					 det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID ){
					 $timeout(function(){
						toaster.warning('Finding status Date should be between the opening meeting and closing meeting date'); 
					},1);
					det.auditDetail.closeMeetingDate = closeMeetDate;
					//toaster.warning('Please select the '+det.clseMetingdate+' which should be less than or equal to the Finding Status Date: '+moment(maxDate,YYYYMMDD).format(MMMDDYYYY));
			 }
			}
			 
			 
			 
			 
  		 }
  		 
  		if(!(det.auditDetail.openMeetingDate) &&  det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID){
  			
  			 det.auditDetail.closeMeetingDate = '';
			 
  			 if(det.auditDetail.auditSubTypeId  && det.auditDetail.auditSubTypeId != det.AppConstant.ADDITIONAL_SUB_TYPE_ID && det.auditDetail.auditSubTypeId != det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && det.auditDetail.certIssueId !=det.AppConstant.RENEWAL_ENDORSED1 && det.auditDetail.certIssueId !=det.AppConstant.RENEWAL_ENDORSED2){
				 //added by @Ramya on 10-11-2022 for TICKET-574
  				//  det.auditDetail.auditDate = (det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID) ? det.auditDetail.auditDate :  moment(new Date()).format(MMMDDYYYY);
			
//			   if(det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && !det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0 ){
//  				 
//				   det.auditDetail.certIssueDate = '';
//  				 
//  				 det.auditDetail.certExpireDate = ''; }
			 }
			 
  			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
    		
    		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
			
  		 }else{
  			 
  			det.minInternalDate = moment(moment(det.auditDetail.auditDate, MMMDDYYYY).subtract(2,'years').format(MMMDDYYYY),MMMDDYYYY);
    		
    		det.maxInternalDate = moment(det.auditDetail.auditDate,MMMDDYYYY);
  			 
  			 det.minCloseMeetingDate = moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD);
  			 
  		 }
	  		
  		 if(det.auditDetail.closeMeetingDate && det.auditDetail.openMeetingDate && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID){
  			
  			 if(det.auditDetail.closeMeetingDate.toUpperCase() == (moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm)).toUpperCase() && det.auditDetail.openMeetingDate.toUpperCase() == (moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm)).toUpperCase()){
  			 
  				 var openDate = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm);
  				 var closeDate = moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm);
  				
  				 var diff = moment(openDate).diff(closeDate,'minutes', true);
  			 
  				 if(diff <= 60){
  					 det.auditDetail.closeMeetingDate = '';
  					 toaster.warning(det.clseMetingdate+' has to be atleast an hour later than the '+det.openMettingDate+', please select accordingly');
  				 }else{
  					 toaster.clear();
  					 det.minSignatureDate = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY);
  				 }
  			 }
  		 }
  		 
  		if(det.auditDetail.auditTypeId == det.AppConstant.DMLC_TYPE_ID){
  			det.maxDmlc1issueDate   = ''; 
  			det.minCloseMeetingDate = '';
  			det.maxCloseMeetingDate = '';
  			
  			det.auditDetail.closeMeetingDate = det.auditDetail.closeMeetingDate ?  moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(MMMDDYYYY) : det.auditDetail.closeMeetingDate;
		 }
  		 
  		if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID){
  			
  			det.setSummaryAndDueDate();
  		}
  		
  		if(det.dirInterAndAdditionalAudit && !det.previousAudit){
  			det.auditMinDate='';
  		}
  		
  		    
        	det.setAuditDate();
  		 
  		det.setCertificateIssued();
  	 }//end of function setCloseMeetingDate()
    
    function setReceiptDate(){ 
    
        det.receiptMaxDate='';
    
    	det.minIssueDate ='';// det.auditDetail.openMeetingDate ? moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD) : '';
    	  
    	det.receiptMaxDate ='';// det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY+HHmm).format(YYYYMMDD) :'';
    	
    	det.minIssueDate = '';
    	
    	//det.auditMinDate = '';// (det.auditDetail.openMeetingDate && moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) > det.auditMinDate )? moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMinDate;
    	
    //	det.auditDetail.certIssueDate = (det.minIssueDate && det.auditDetail.certIssueDate && moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD) < det.minIssueDate) ? moment(det.minIssueDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certIssueDate;
    	// det.receiptMinDate ='';// det.minIssueDate ;			//commented by ramya for jira ID->5213
    	
    	if(moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) < moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD) ){ 
    		//det.auditDetail.certIssueDate ='';   
    		}

    	det.setSSPIssueDate();
    }
    
    function setSSPIssueDate(){
    	
    	if(det.auditTypeId == det.AppConstant.SSP_TYPE_ID){
    		
    		//det.auditDetail.auditDate=det.auditDetail.certIssueDate?det.auditDetail.certIssueDate:moment(new Date()).format(MMMDDYYYY);
    		det.minIssueDate = '';
    		det.maxIssueDate = '';//det.auditDetail.openMeetingDate ?  moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD) : '';
    		
    	}
    	det.expiryMinDate = '';//det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD) : '';
    	
    //	det.auditDetail.certExpireDate = (det.expiryMinDate && det.auditDetail.certExpireDate && moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD) < det.expiryMinDate) ? '' : det.auditDetail.certExpireDate;
    }
    
    
    /********set Plan Accepted due Date and Summary Date**************/
   
    
    function setSummaryAndDueDate(){

    	if(det.auditDetail.auditSubTypeId!=det.AppConstant.INTERIM_SUB_TYPE_ID && det.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditTypeId!=det.AppConstant.SSP_TYPE_ID){
    		
    	var temp = det.AppConstant.AUDIT_SUB_TYPE[det.auditDetail.auditSubTypeId].SUB_TYPE_DESC;
    		
    	var temp1 =( det.auditDetail.auditTypeId!=1003)?'Audit':'Inspection'; 
    	
    	temp ='for '+ temp +' ' + temp1;
    	
    	det.auditSummary[0].audSummaryDesc = det.auditSummary[0].audSummaryDesc.replace('auditSubType', temp); 
    	
    	det.auditSummary[1].audSummaryDesc = det.auditSummary[1].audSummaryDesc.replace('auditSubType', temp);
    	
    	det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace('auditSubType', temp)
    	
    	}else if(det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID && det.auditTypeId!=det.AppConstant.DMLC_TYPE_ID && det.auditTypeId!=det.AppConstant.SSP_TYPE_ID){ 
    		
    	    det.auditSummary[0].audSummaryDesc = det.auditSummary[0].audSummaryDesc.replace('(auditSubType)',' '); 
        	
        	det.auditSummary[1].audSummaryDesc = det.auditSummary[1].audSummaryDesc.replace('(auditSubType)',' ');
        	
        	det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace('(auditSubType)',' ');
        	
    	}
    	
    	
    	
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
	   
	   }else if(det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID){
		summaryDateChangeNc = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).add(30,'days').format(MMMDDYYYY) : 'DD/MMM/YYYY';
		 
		   
		   summaryDateChangeMNC = summaryDateChangeNc;
		   
		   var newVal1 = new RegExp(det.summaryDate1, 'g');
			
 		    var newVal2 = new RegExp(det.summaryDate2, 'g');
 		  
 		   if(tempObsArray.length>0 && det.auditDetail.closeMeetingDate){ 
 			   
 			     det.auditSummary[1].audSummaryDesc = det.auditSummary[1].audSummaryDesc.replace(newVal1, summaryDateChangeNc);
 		  		
 				}
 		  if(tempObsArray1.length>0 && det.auditDetail.closeMeetingDate){
 				//changed by @Ramya on 10-11-2022 for TICKET-574
 		  		if(det.auditSummary.length>2){ 
					var summaryDateFirst =moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
					summaryDateFirst = moment(summaryDateFirst,YYYYMMDD).add(30,'days').format(MMMDDYYYY);
 		  			det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal1, summaryDateFirst);	
 		  			var summaryDateSecond =moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
 		  			summaryDateSecond = moment(summaryDateSecond,YYYYMMDD).add(90,'days').format(MMMDDYYYY);
 		  			var lastIndex = det.auditSummary[2].audSummaryDesc.lastIndexOf(" "); 
				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc. substring(0, lastIndex);
				console.log(det.auditSummary[2].audSummaryDesc);
  				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.concat(' ', summaryDateSecond);
  			}
	       }else{
	    	   if(det.auditSummary[2]){
	     			det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal2, 'DD/MMM/YYYY');
	     		        }
	  		}
	  
	   }
	   
	   if(det.auditDetail.auditTypeId != det.AppConstant.MLC_TYPE_ID){
		//    if(summaryDateChangeNc2 && (summaryDateChangeNc2.toUpperCase() == (moment(summaryDateChangeNc2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
		// 	{
		// 	   summaryDateChangeNc2=summaryDateChangeNc2; 
		 
		// 	}else{
		// 		summaryDateChangeNc2 = 'DD/MMM/YYYY';
		// 	}
		//    if(summaryDateChangeNc && (summaryDateChangeNc.toUpperCase() == (moment(summaryDateChangeNc,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
		// 	{
		// 	   summaryDateChangeNc=summaryDateChangeNc; 
			   
			  
		// 	}else{
				if(det.auditDetail.closeMeetingDate){
				var a = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
				a= moment(a,YYYYMMDD).add(30,'days').format(YYYYMMDD);
				summaryDateChangeNc=moment(a,YYYYMMDD).format(MMMDDYYYY);
				
				}
			// }
		//    if(summaryDateChangeMNC && (summaryDateChangeMNC.toUpperCase() == (moment(summaryDateChangeMNC,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
		// 	{
		// 	   summaryDateChangeMNC=summaryDateChangeMNC;
			  
		// 	   }else{
				   if(det.auditDetail.closeMeetingDate){
						var a = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
						a= moment(a,YYYYMMDD).add(30,'days').format(YYYYMMDD);
						summaryDateChangeMNC=moment(a,YYYYMMDD).format(MMMDDYYYY); }
			// }
		//    if(summaryDateChangeMNC2 && (summaryDateChangeMNC2.toUpperCase() == (moment(summaryDateChangeMNC2,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()))
		// 	{ 
		// 	   summaryDateChangeMNC2=summaryDateChangeMNC2;
			   
		// 	   det.findingsMncverifyMaxDate = moment(summaryDateChangeMNC2,MMMDDYYYY).format(YYYYMMDD);
		// 	   det.findingsMncverifyMaxDate = moment(det.findingsMncverifyMaxDate,YYYYMMDD).subtract(90,'days').format(YYYYMMDD);
			 
		// 	   }else{
				   if(det.auditDetail.closeMeetingDate){
						var a = moment(det.auditDetail.closeMeetingDate,MMMDDYYYY).format(YYYYMMDD);
						a= moment(a,YYYYMMDD).add(90,'days').format(YYYYMMDD);
						summaryDateChangeMNC2=moment(a,YYYYMMDD).format(MMMDDYYYY); }
                //  }
		  
		if(tempObsArray.length>0){  	
	     det.auditSummary[1].audSummaryDesc = det.auditSummary[1].audSummaryDesc.replace(newVal1, summaryDateChangeNc);
  		
		}if(tempObsArray1.length>0){
		
			if(det.auditSummary.length>2){  
  			if(summaryDateChangeMNC){
  				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.replace(newVal1, summaryDateChangeMNC);
  			}
  		
  			if(summaryDateChangeMNC2){
				//added by @Ramya on 10-11-2022 for TICKET-574
				var lastIndex = det.auditSummary[2].audSummaryDesc.lastIndexOf(" "); 
				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc. substring(0, lastIndex);
				console.log(det.auditSummary[2].audSummaryDesc);
  				det.auditSummary[2].audSummaryDesc = det.auditSummary[2].audSummaryDesc.concat(' ', summaryDateChangeMNC2);
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
					if(det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID)
					{return moment(val,MMMDDYYYY).format(MMMDDYYYY);}
					else{ return moment(val,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm);  }
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
			//	alert(id); alert(val); 
				$('#'+val).focus();
				$timeout(function(){
					$('#'+id).focus();
				},1);
				
				return  val;
			}
			
    }
        
    
    function setSSPMaxReceiptDate(date){
    	
    	if( (det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID || det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID) && date ){
    	//	det.receiptMaxDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMinDate;
    		// det.receiptMinDate = '';				//commented by ramya for jira ID->5213
    		//det.auditDetail.openMeetingDate = moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD) <= det.receiptMaxDate ? det.auditDetail.openMeetingDate  : '';
    		// det.minOpenMeetingDate = '';//commented by ramya for jira ID->5213
    		//det.maxOpenMeetingDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) : det.auditMinDate;
    		
    	}
    	if((det.auditDetail.auditTypeId==det.AppConstant.DMLC_TYPE_ID || det.auditDetail.auditTypeId == det.AppConstant.SSP_TYPE_ID )&& !date){
    	// det.minOpenMeetingDate = '';//commented by ramya for jira ID->5213
    	det.receiptMaxDate='';
    	}
    	
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
    		console.log(det)
    		detailsFactory.vesselDetails(det.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,searchBy).$promise.then(function(res){
    			console.log(res);
    			
    			
    			$timeout(function(){
    			
    				det.vesselDataFromRmi = angular.copy(res);
    				
    				if(det.vesselDataFromRmi.length==1){
    					var autoVessel = res[0];
    	    			autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    	    			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    	    			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    	    			console.log(autoVessel)
    	    			detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
    						console.log(result)
    					});
						if(searchBy!='vesselName' && searchBy!='officialNumber'){  //Added by sudharsan for Jira-ID = 5465 and JIRA-ID 5490
    					vesselStatementFactory.getVesselDetails(vesselImoNo,det.companyId).$promise.then(function(vesRes){
    						console.log(vesRes)
    	        			if(vesRes.vesselCompany.length>0){
	    	        			var count = checkVesselHistory(res,vesRes);
	    	        			if(count!=10){
	    	        				
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
	    		    							'grt' : vesRes.vsselDtl[0].grt ? vesRes.vsselDtl[0].grt : 0,
	    		    							'companyImoNo' : vesRes.vsselDtl[0].companyImoNo ? vesRes.vsselDtl[0].companyImoNo : '-',
	    		    							'dateOfRegistry' : vesRes.vsselDtl[0].dateOfRegistry ? moment(vesRes.vsselDtl[0].dateOfRegistry,'MMM DD, YYYY').format('YYYY-MM-DD') : '',
	    		    							'docIssuerAud' : vesRes.vesselCompany[0].docIssuer ? vesRes.vesselCompany[0].docIssuer : '-',
	    		    							'docExpiryAud' : vesRes.vesselCompany[0].docExpiry ? moment(vesRes.vesselCompany[0].docExpiry,'MMM DD, YYYY').format('YYYY-MM-DD') : '',
	    		    							'vesselAdrress' : comNameAdd,
	    		    							'dateIns' : moment(new Date(),'YYYY-MM-DD').format('YYYY-MM-DD'),
	    		    							'vesselId'	: vesRes.vsselDtl[0].vesselId,
	    		    							'vesselCompanyName' : vesRes.vesselCompany[0].vesselCompanyName ? vesRes.vesselCompany[0].vesselCompanyName : '-',
	    		    							'portOfRegistry' : vesRes.vsselDtl[0].portOfRegistry ? vesRes.vsselDtl[0].portOfRegistry : '-',
	    		    							'companyAddress' :vesRes.vesselCompany[0].vesselCompanyAddress ? vesRes.vesselCompany[0].vesselCompanyAddress : '-',
	    		    							'keelLaidDate' : vesRes.vsselDtl[0].keelLaidDate ? moment(vesRes.vsselDtl[0].keelLaidDate,'MMM DD, YYYY').format('YYYY-MM-DD') : '',
	    		    							'regOwnedImoNo' : vesRes.vsselDtl[0].regOwnedImoNo ? vesRes.vsselDtl[0].regOwnedImoNo : 0,
	    		    							'registeredCompanyAddress' : vesRes.vsselDtl[0].registeredCompanyAddress ? vesRes.vsselDtl[0].registeredCompanyAddress : '-',
	    		    							'registeredCompanyName' : vesRes.vsselDtl[0].registeredCompanyName ? vesRes.vsselDtl[0].registeredCompanyName : '-',
	    		    							'statusUpdate' : 'vesselHistory'
	    		    						};
	    		    		    	 vesselHistory.push(parameter);
	    		    		    	 console.log(vesselHistory)
	    		    		    	 detailsFactory.updateVesselDetails(vesselHistory).$promise
	    		     				.then(function(res) {
	    		     					
	    		     					
	    		     				});
	    	        				
	    	        			}
    	        			}
    	        			var selectedVsl = det.vesselDataFromRmi[0];
	    					det.vesselSpecificDtl(selectedVsl,'notRefresh','NOrefresh',[]);
    					});
					//Added by sudharsan for Jira-ID = 5465
					}
					else{
						var selectedVsl = det.vesselDataFromRmi[0];
	    					det.vesselSpecificDtl(selectedVsl,'notRefresh','NOrefresh',[]);
					}
    				//End here Jira-Id = 5465
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
	
	
    
    function vesselSpecificDtl(object,vesselRefresh,status,parameter){
    	
    	
    	var autoVessel = object;
    	console.log(autoVessel)
		
		
    	var vesselImoNo = object.imoNumber, docTypeNum = object.vesselID;
    	console.log(object);
    	if(object.companyIMONumber){
    	detailsFactory.vesselSpecificDtl(det.companyId,(sessionStorage.getItem('emailId')).toString(),vesselImoNo,docTypeNum).$promise.then(function(res){
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
				
				detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
					console.log(result)
				});
    			
    			
    			/*if(!res.leadSign){
    				toaster.warning("Your signature doesn't exist in the IRI System");
    				return;
    			}*/
    			if(vesselRefresh!='vesselRefresh'){
	    			var res2 = angular.copy(res);; 
	    			
	    			res = angular.copy(res.vsselDtl);
	    			
	    			det.imolabelVal = 'vesselImoNo';
	    			
	    			det.vesselImoNo = {'vesselImoNo':res.vesselImoNo};
	    			
	    			det.setvesselImoNo(res);
    			}
    			if(status == 'refresh'){
    				console.log(parameter)
    			   	detailsFactory.updateVesselDetails(parameter).$promise
    				.then(function(res) {
    					console.log(res)
    					
    					det.vesselUpdate = false;
    					toaster.success('Vessel Details Updated!');
    					
    				});
    				
    		   	}
    			
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
   	
    }
    
    
    
    function saveCurrentFinding(){
    	
    	if(det.auditTypeId == det.AppConstant.MLC_TYPE_ID){
    		
	    	det.auditDetail.auditFinding.forEach(function(a,aIndex){
    		
	    		var priorToDepatVsl = det.auditDetail.closeMeetingDate ? moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+ " HH:mm").format(MMMDDYYYY) : 'PRIOR TO DEPARTING VESSEL';
    				
    			a.findingDetail.forEach(function(b){
    				
    				if((b.categoryId == det.AppConstant.MINOR_FINDING_CATEGORY || b.categoryId == det.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY ) && b.nextActionId==det.AppConstant.PLAN_ACCEPTED){
       					 b.dueDate = priorToDepatVsl;
       				 }
    			});
    		
    			blockUI.start('Saving The Data');
    			
    			auditFactory.saveFindingData(a,'Update','NF',det.auditTypeId,det.companyId).$promise.then(function(res){
    				
    				blockUI.stop();    
    			});
	    	});
    	}
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
   
   function validatePort(val){
	   
	   if(det.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.portArray.indexOf(val)<0){
		   det.auditDetail.auditPlace = '';
	   }
   }
   
   
   function showData(auditSeqNo,vesselImoNo,auditTypeId,companyId){
		
		sessionStorage.setItem('auditSeqNo',auditSeqNo);
		sessionStorage.setItem('companyId',companyId);
		sessionStorage.setItem('auditTypeId',auditTypeId);
		
		/*var searchData = search.searchCriteria;
		
		sessionStorage.setItem('auditSrchData', search.searchCriteria);*/
		
		$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
		
	}
   
   function exportLetterHist(auditTypeId,companyId,auditSeqNo,leadSign,emailId,activeStatus,vesselNameAud,companyAddressAud,companyName,portOfRegistryAud){
	   masterFactory.getCurrentUserDetail(emailId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				var title = data.title; /** IRI-5245 added by kiran  */ 
				det.leadSignChanges = data.signature;
				var signerName = data.signer;
				var leadSign = data.signature;
				var spliAdd=companyAddressAud.split('\n');			// added by ramya for jira id--> IRI-5282
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
						companyName:companyName,
						portOfRegistryAud:portOfRegistryAud,
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
   
   
   
   function exportReceiptHist(emailId,vesselnameRec,compAddRec,compNameRec,activeStatusRec,openMeetingDateRec){
	 
		masterFactory.getCurrentUserDetail(emailId,sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		var officialId=res[0].officialId;
		console.log(officialId)
			detailsFactory.auditorSignAndSeal(officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				det.leadTitalChanges = data.title /** IRI-5245 added by kiran  */ 
				det.leadSignChanges = data.signature;
				det.signerName = data.signer;
				
				det.receiptStart=true;
				
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
				
				//det.saveAuditData('Data Saved Successfully');
				  
				det.receiptLtr= false;
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
				detailsFactory.getAuditDetail(det.auditTypeId,det.companyId,det.auditSeqNo).$promise.then(function(res) {
				console.log(res);
				blockUI.start("Opening Letter");
					var leadEmailId = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('userId').toString();
					
			   		
			   		 /*detailsFactory.getSignature(leadEmailId,det.companyId).$promise.then(function(signRes){
			   		 
			   			 if(_(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('audSignature').toString()){
			   				
			   				det.leadSignImgData = _(det.auditDetail.auditAuditorDetail).chain().where({'audLeadStatus':Number(1)}).pluck('audSignature').toString();
			   				
			   			 }else if(signRes.userDetail.signature){
			   			
			   				det.leadSignImgData = signRes.userDetail.signature;
			   			console.log(signRes.userDetail.signature);
			   			 }*/
						
				//var doc = new jsPDF('p', 'mm', 'a4');
					
					//console.log(compAdd+"-"+compName+"-"+vesselname)
					
					/*res.companyaddress = compAdd;
					
					res.companyname = compName;
					
					res.vesselName =vesselname;*/
					var spliRec=compAddRec.split('\n');
					
					
					if(spliRec.length>1){
						res.companyaddress =compAddRec;
					
					}
					else{
						res.companyaddress = compNameRec +"\n"+compAddRec;
						
					}
				//res.companyname = res.companyName;
				
				res.vesselName =vesselnameRec;
				
				res.officialNo = det.vesselDetail.officialNo;
				
				res.leadSign = det.leadSignChanges;
				
				res.portofreg = "MAJURO";
				
				res.companyimono = det.vesselCompanyDtl.companyImoNo;
			
			    res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD+HHmm)?moment(res.openMeetingDate,YYYYMMDD+HHmm).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY+HHmm).format('DD-MMMM-YYYY'); 
			   
			    if(res.auditTypeId==1004 || res.auditTypeId ==1005){
			    	 res.receiptdate =res.openMeetingDate==moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format(YYYYMMDD)?moment(res.openMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'):moment(det.auditDetail.openMeetingDate,MMMDDYYYY).format('DD-MMMM-YYYY');
			    }
			    res.receiptdate1 = moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY');
			    
			    res.title = det.leadTitalChanges;/** IRI-5245 added by kiran  */ 
			    
			    res.signerName =det.signerName;
			    res.activeStatus=activeStatusRec;
			    res.receiptdate=moment(openMeetingDateRec,YYYYMMDD).format('DD-MMMM-YYYY');
			    	
			    console.log("res",res);
			  
			    
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
				},2000);
			});
		});
		
	});
   }
   
   
  $scope.$watch('det.auditDetail.certificateData', function(values) {
	  console.log(values)
	 		if(values)
			{ 
			  values.forEach(function(a){
				   					
					a.auditDate = moment(a.auditDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					
					a.certExpireDate = a.certIssueId==1008 ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(a.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					
					a.certIssueDate = a.certIssueId==1008 ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : moment(a.certIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY');
					console.log(a.certExpireDate)
					console.log(a.certIssueDate)
					a.dateOfRegistry = moment(a.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY');
					if(a.auditTypeId==1001 && a.auditSubTypeId==1001)
						a.extendedIssueDate  =a.extendedEndorsedDate ? moment(a.extendedEndorsedDate).format('DD-MMM-YYYY') :'-';
					else	
						a.extendedIssueDate  =a.extendedIssueDate && a.certIssueId!=1008 ? moment(a.extendedIssueDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
					a.extendedExpireDate  =a.extendedExpireDate && a.certIssueId!=1008 ? moment(a.extendedExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
					a.endorsedDate  =a.endorsedDate ?  moment(a.endorsedDate,'YYYY-MM-DD').format('DD-MMM-YYYY') :'-';
					
					a.activeStatus = (a.activeStatus == 1)? 'Active':'InActive';
				});
			
			}
		
	   //a[7] = moment(new Date(a[7]),'YYYY-MM-DD').format('DD-MMMM-YYYY');
		
	  });
   function doBlur(event){
	    event.target.blur();
	}
   
   function certficateDetils(){

	   var flag = true;
	
	   if(!det.auditDetail.openMeetingDate){
			
			toaster.warning('Please Enter the '+det.openMettingDate);
			
		}else if(!det.auditDetail.closeMeetingDate){
			
			toaster.warning('Please Enter the '+det.clseMetingdate); 
			
		}else if(!det.auditDetail.auditPlace){
			
			toaster.warning('Please Enter the '+det.auditType+' Place');
			
		}else if(det.auditDetail.auditSummaryId == det.AppConstant.NOT_APPROVED_SUMMARY){
			
			toaster.warning('Sorry, certificate can’t be generated, since the '+det.auditType+' Summary is marked as ‘Not Approved’');
			
		}else if(((det.auditDetail.auditSubTypeId ==det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId ==det.AppConstant.RENEWAL_SUB_TYPE_ID) && det.auditDetail.certIssueId==det.AppConstant.FULL_TERM_CERT) && det.auditDetail.auditDate!=det.auditDetail.creditDate){
			
			toaster.warning('Credit Date must be same as Audit Date'); 
		
		}else if(!det.auditDetail.certIssueDate){
			
				toaster.warning('Please Enter Certificate Issue Date');
				
		}else if(!det.auditDetail.certExpireDate){
			
				toaster.warning('Please Enter Certificate Expiry Date');
		}else{
			
			det.auditDetail.grt = det.vesselDetail.grt?Number(det.vesselDetail.grt):'';
			det.auditDetail.auditlockStatus =  det.enabled;
			var data={auditDetail: det.auditDetail,vesselCompanyDtl:det.vesselCompanyDtl,vesselDetail:det.vesselDetail,minAuditDate:det.auditMinDate,maxAuditDate:det.auditMaxDate,nxtAuditCreate:det.nextAdtCreated,previousAudit:det.previousAudit,directAdditionalByintermeadite:det.dirInterAndAdditionalAudit,auditDateChanged:det.auditDateChanged};
             var flag = false;
			if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail.length>0){
			
			  if(det.auditDetail.grt && det.auditDetailOrg.grt && det.auditDetailOrg.grt != det.auditDetail.grt){
				  toaster.warning('GRT value has been changed, please save the Audit details');
               }else if(det.auditDetail.auditTypeId==det.AppConstant.MLC_TYPE_ID && det.auditDetail.grt && det.auditDetailOrg.grt && det.auditDetailOrg.dateOfRegistry !=  moment(det.vesselDetail.dateOfRegistry,MMMDDYYYY).format(YYYYMMDD)){
				  toaster.warning('Date of Registry  value has been changed, please save the Audit details');
                }else if(det.auditDetail.closeMeetingDate && det.auditDetailOrg.closeMeetingDate && moment(det.auditDetailOrg.closeMeetingDate,YYYYMMDD).format(YYYYMMDD) != moment(det.auditDetail.closeMeetingDate,MMMDDYYYY+HHmm).format(YYYYMMDD)){
				  toaster.warning('Closing Meeting Date value has been changed, please save the Audit details');
                }else if(det.auditDetail.auditPlace && det.auditDetailOrg.auditPlace && decodeURIComponent(atob(det.auditDetailOrg.auditPlace))!= det.auditDetail.auditPlace){
				  toaster.warning('Audit place  has been changed, please save the Audit details');
                }else if(det.auditDetail.auditSummaryId && det.auditDetailOrg.auditSummaryId && det.auditDetailOrg.auditSummaryId != det.auditDetail.auditSummaryId){
				  toaster.warning('Audit  Summmary  has been changed, please save the Audit details');
                }else if(det.auditDetail.auditStatusId && det.auditDetailOrg.auditStatusId && det.auditDetailOrg.auditStatusId != det.auditDetail.auditStatusId){
				  toaster.warning('Audit  Status  has been changed, please save the Audit details');
                }else if(((det.auditDetail.auditSubTypeId ==det.AppConstant.INITIAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId ==det.AppConstant.RENEWAL_SUB_TYPE_ID) && det.auditDetail.certIssueId==det.AppConstant.FULL_TERM_CERT) && det.auditDetail.creditDate && det.auditDetailOrg.creditDate && moment(det.auditDetailOrg.creditDate,YYYYMMDD).format(YYYYMMDD) != moment(det.auditDetail.creditDate,DDMMMYYYY).format(YYYYMMDD)){
                	toaster.warning('Credit  Date  has been changed, please save the Audit details');
                }else {
			           flag = true;
			          }
			  
			}else { flag = true;}
			
			if(flag){
				console.log(data);
				 
					 
					  if((data.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID || data.auditDetail.auditSubTypeId ==det.AppConstant.ADDITIONAL_SUB_TYPE_ID) && data.directAdditionalByintermeadite && (data.auditDetail.certIssueId==1004 || data.auditDetail.certIssueId==1005)){
						
			
						certificateFactory.UpdateDirectIntermediateIssueExpiryDate(data.auditDetail.auditTypeId,data.auditDetail.auditSeqNo,data.auditDetail.companyId,data.auditDetail.certExpireDate,data.auditDetail.certIssueDate,data.auditDetail.certIssueId,data.auditDetail.vesselImoNo).$promise.then(function(res){
							
							if(det.auditDetail.certificateDetail && det.auditDetail.certificateDetail[0]){
							det.auditDetail.certificateDetail[0].certExpireDate=moment(det.auditDetail.certExpireDate,MMMDDYYYY).format(YYYYMMDD);
							det.auditDetail.certificateDetail[0].certIssueDate=moment(det.auditDetail.certIssueDate,MMMDDYYYY).format(YYYYMMDD);}
							
							auditFactory.saveCertificateDetails(data);
							   
							   sessionStorage.setItem('certificateSeachType','Audit');
							   
							   sessionStorage.setItem('certificateSeachTypes','Audit');
							   
							   $state.go('app.certificate.details',{'certificate':'Audit'},{ reload: true });
						});
					 }else{
				 
				console.log(data);
				 
				auditFactory.saveCertificateDetails(data);
				   
				   sessionStorage.setItem('certificateSeachType','Audit');
				   
				   sessionStorage.setItem('certificateSeachTypes','Audit');
				   
				   $state.go('app.certificate.details',{'certificate':'Audit'},{ reload: true });
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
 		 
 		   det.auditDetail.certIssueDate = extensionIssueDate ? moment(extensionIssueDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certIssueDate;
 		   
 		   det.auditDetail.certExpireDate = extensionexpiryDate ? moment(extensionexpiryDate,YYYYMMDD).format(MMMDDYYYY) : det.auditDetail.certExpireDate;
 		   
 		   //det.maxCloseMeetingDate = det.auditDetail.certExpireDate ? det.auditDetail.certExpireDate : det.maxCloseMeetingDate;
 		   det.maxOpenMeetingDate = det.maxCloseMeetingDate;
 		   
 	   }else{
 		   
 		   det.auditDetail.certificateNo = det.fulltermCertificateNo;
 		   det.auditDetail.certIssueDate='';
 		   det.auditDetail.certExpireDate='';
 		   
 		   det.maxOpenMeetingDate = '';
		   det.maxCloseMeetingDate = '';
		   
		   if (det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT){
			   det.auditDetail.certIssueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(MMMDDYYYY);
 			   det.auditDetail.certExpireDate =  det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):det.auditDetail.certExpireDate;   
		   }
		   
 		   det.setAuditDate();
 	   }
 	  if(det.auditDetail.auditSubTypeId == det.AppConstant.ADDITIONAL_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.INTERMEDIATE_SUB_TYPE_ID ||(det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && (det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED1 || det.auditDetail.certIssueId == det.AppConstant.RENEWAL_ENDORSED2))){
  		var previousVesselCheck = det.previousAudit ? det.previousAudit.certificateDetail ? det.previousAudit.certificateDetail[0] : '' : '';
  		console.log(previousVesselCheck)
  		 if(previousVesselCheck!='')
  			checkCertificateVesselDeatils(previousVesselCheck,'dropDown');
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
			
    	}else if(!det.auditDetail.openMeetingDate){
			
			flag = false;
			
			toaster.warning('Please Enter the '+det.openMettingDate);
			
		}/*else if((det.minOpenMeetingDate && openMeetingDate<det.minOpenMeetingDate) || (det.receiptMinDate && openMeetingDate<det.receiptMinDate) || (det.maxOpenMeetingDate && openMeetingDate>det.maxOpenMeetingDate) || (det.receiptMaxDate && openMeetingDate>det.receiptMaxDate)){
			
			flag = false;
			
		}*/else if(det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID && !det.auditDetail.closeMeetingDate){
			
			flag = false;
			
			toaster.warning('Please Enter the '+det.clseMetingdate); 
			
		}/*else if((det.auditDetail.auditTypeId != det.AppConstant.SSP_TYPE_ID) && ( (det.minCloseMeetingDate && closeMeetingDate<det.minCloseMeetingDate) || (det.maxCloseMeetingDate && closeMeetingDate>det.maxCloseMeetingDate) ) ){
			
			flag = false;
			
		}*/else if(!det.auditDetail.certIssueDate && det.auditDetail.auditTypeId != det.AppConstant.DMLC_TYPE_ID){
			
			flag = false;
			
            var msg=(det.auditDetail.auditTypeId==det.AppConstant.SSP_TYPE_ID)?'Initial':'';
			
			toaster.warning('Please Enter '+msg+' Issue Date');
			   			
			
		}else if(!det.auditDetail.sspReviewDetail[0].sspRevisionNo)
			{
			flag=false;
			
			
			toaster.warning('Please Enter Revision No');
			
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
        		detailsFactory.getFindingData(det.AppConstant.DMLC_TYPE_ID,obj.auditSeqNo,det.companyId).$promise.then(function(data){
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
						det.auditDetail.certIssueDate=det.checkScopeFunval.certIssueDate;
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
			var msg = (det.auditDetail.auditTypeId == det.AppConstant.ISM_TYPE_ID ) ? 'SMC' : (det.auditDetail.auditTypeId == det.AppConstant.ISPS_TYPE_ID ) ? 'ISSC' :  (det.auditDetail.auditTypeId == det.AppConstant.MLC_TYPE_ID ) ? 'MLC':'';
			toaster.warning('Certificate details have been changed due to    Re-issuing of follow-up '+det.nextAuditDetails.audSubTypeDesc+' '+msg+'');
		}
    }
     
     
     function validateVessel(){
    	 
        	var vssel = det.vesselDetail;
        	var vselCo = vssel.vesselCompany;
        	
        	
        	var flag = false;  
        	
        	if(!det.vesselDetail.vesselImoNo){
    			
    		  det.vesselImoNo.vesselImoNo = '';
    		   
    		}else if(!vssel.vesselName || !vssel.docTypeNumber || !vssel.activeStatus || !vssel.officialNo || !vssel.grt || !vssel.companyImoNo || !vssel.portOfRegistry){
    			flag = true;
    		}else if(!vssel.dateOfRegistry || !vssel.vesselType){
    			flag = true;
    		}else if(!vselCo.docTypeNo || !vselCo.docIssuer || !vselCo.docExpiry || !vselCo.vesselCompanyAddress || !vselCo.vesselCompanyName){
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
    			
    			detailsFactory.vesselDtlIncomplete(det.loginUserId, det.vesselDetail.vesselImoNo, det.vesselDetail.vesselId,det.companyId,vData).$promise.then(function(res) {
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
   			 
    			if(!vssel.docTypeNumber){
   				 det.partialMissingData = det.partialMissingData +''+' ,DOC Type Number ';
   				 det.partialMissingStatus = true;
   				det.partialCount++; 
   				if(!det.vesselCompanyDtl.docType){
   					$('#doctype').addClass('err');} 
   				}
   			 
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
    		
    			if(!vssel.dateOfRegistry){
   				 det.partialMissingData = det.partialMissingData +''+' ,Date Of Registry  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				   
   				 if(!det.vesselDetail.dateOfRegistry){
   					$('#dateOfReg').addClass('err');}
    			}
   			 
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
    			
   			    if(!vselCo.docTypeNo){
   				 det.partialMissingData = det.partialMissingData +''+' , Company DOC Type Number  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; }
   			 
   			    if(!vselCo.docIssuer){
   				 det.partialMissingData = det.partialMissingData +''+' ,DOC Issuer  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++; 
   				 if(!det.vesselCompanyDtl.docIssuer){
     			    $('#docissue').addClass('err');}
   				 }
   			
   			    if(!vselCo.docExpiry){
   				 det.partialMissingData = det.partialMissingData +''+' ,DOC Expiry  ';
   				 det.partialMissingStatus = true;
   				 det.partialCount++;
   				   if(!det.vesselCompanyDtl.docExpiry){
      			    $('#docexpiry').addClass('err');}
   				 }
   			
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
    	 
    	 if(date && (date.toUpperCase() == (moment(date,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase()) ){
    	 det.auditDateChanged = true;
    	 if(det.auditDetail.sspReviewDetail && (det.auditTypeId==det.AppConstant.SSP_TYPE_ID || det.auditTypeId==det.AppConstant.DMLC_TYPE_ID)){
    	 det.auditDetail.sspReviewDetail[0].ltrStatus=0;
    	 }
    	 if(det.auditTypeId!=det.AppConstant.SSP_TYPE_ID && det.auditTypeId!= det.AppConstant.DMLC_TYPE_ID && (det.auditDetail.auditSubTypeId!=det.AppConstant.INTERMEDIATE_SUB_TYPE_ID && det.auditDetail.auditSubTypeId!=det.AppConstant.ADDITIONAL_SUB_TYPE_ID )){
    	 if(date){
    		 
    		 det.auditDetail.creditDate = moment(date,MMMDDYYYY).format(MMMDDYYYY);
    		 if( det.auditDetail.auditSubTypeId==det.AppConstant.INTERIM_SUB_TYPE_ID && det.auditDetail.creditDate && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0)){
    			 det.auditDetail.certIssueDate = det.auditDetail.creditDate;
    			 det.auditDetail.certExpireDate = moment(det.auditDetail.creditDate,MMMDDYYYY).add(6,'months').subtract(1,'days').format(MMMDDYYYY);
    		 }else if( det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID && det.auditDetail.creditDate && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0)){
    			 det.auditDetail.certIssueDate = det.auditDetail.creditDate;
    			 det.auditDetail.certExpireDate = moment(det.auditDetail.creditDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    		
    		 }
    	 }else {  det.auditDetail.creditDate='';}
    	}
    	 
     }
    	 
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
         	
         	 auditCycleFactory.getAllCycleDate(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(cycleAllData) {
        	      console.log(cycleAllData);  
        	      det.cycleAllData = angular.copy(cycleAllData);
        	      det.setRenewalCycleData(det.auditDetail.auditSubTypeId);
          	    console.log(det.auditDetail); 
          	    det.currentAuditCycleData= det.auditDetail ? det.auditDetail : ''; 
          		console.log(det.currentAuditCycleData);
        	     $rootScope.$broadcast('setAuditCycle',cycleAllData,res,det.currentAuditCycleData,'AuditOrInspection');
        	      
        	 });
         	
         	
         	//$rootScope.$broadcast('setAuditCycle',res );
             });
         	}
         	
         	if(det.auditDetail.creditDate!=det.auditDetail.creditDateFromCyle && det.auditDetail.creditDateFromCyle && det.auditDetail.auditSubTypeId==det.AppConstant.INITIAL_SUB_TYPE_ID && val=='creditDateChangeVal' && det.auditCycleRoleId!=det.AppConstant.AUDITOR_ROLE_ID ){
            	toaster.warning(det.auditCycleManagerOrAdmin +' Entered Credit Date Is '+moment(det.auditDetail.creditDateFromCyle,MMMDDYYYY).format(MMMDDYYYY));
            	}
         	
         }
     
     
     
     det.setRenewalCycleData = function(auditSubTypeId){
    	   
    	   if(det.auditTypeId!=det.AppConstant.IHM_TYPE_ID &&  (det.auditDetail.auditDate && (det.auditDetail.auditDate.toUpperCase() == (moment(det.auditDetail.auditDate,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase())) ){
    	     
    	        var auditDate = det.auditDetail.auditDate ? moment(det.auditDetail.auditDate,MMMDDYYYY).format(YYYYMMDD) : '';
    	        var nextRenewalStart,nextRenewalEnd,temp=true;
    	     
    	     if((!det.cycleAllData || det.cycleAllData.length==0 ) && auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT){
    	    	 det.auditCycleApi = true;
    	     auditCycleFactory.getAllCycleDate(det.auditTypeId,det.vesselImoNo.vesselImoNo,det.companyId).$promise.then(function(cycleAllData) {
    	    	 det.cycleAllData = angular.copy(cycleAllData);
    	     });
    	     }
    	    if( det.auditCreate){
    	     var seqNo =	(det.cycleAllData && det.cycleAllData.length >0 ) ?  _.max(det.cycleAllData, function(find){  return   find.cycleGenNo; }) : '';
    	  
    	    }else{// console.log(det.cycleAllData[1]);  console.log(det.cycleAllData);
    	    	var seqNo = angular.copy(det.cycleAllData[1]);
    	    }
    	    if(det.dirInterAndAdditionalAudit && det.cycleAllData &&  det.cycleAllData.length>0){
    	    	var seqNo = angular.copy(det.cycleAllData[det.cycleAllData.length-1]); 
    	    }
    	    console.log(seqNo);
    	    	 if(auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID && seqNo && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT){
    	    
    	        	    	  nextRenewalStart = seqNo.nextRenewalStart;
    	        	    	  nextRenewalEnd = seqNo.nextRenewal;
    	        
    	    		 if(det.cycleAllData && det.cycleAllData.length>0){
    	    			
    	    			
    	    		    			if(  det.auditDetail.certIssueId != det.AppConstant.RENEWAL_ENDORSED2 && (!det.auditDetail.certificateDetail || det.auditDetail.certificateDetail.length   == 0) ){
    	    		    			
    	    		    				if(auditDate && nextRenewalStart && auditDate < nextRenewalStart){ 
    	    		    					
    	    		        			    det.auditDetail.certIssueDate = moment(det.auditDetail.auditDate, MMMDDYYYY).format(MMMDDYYYY);
    	    		        			    
    	    		        			    det.auditDetail.certExpireDate = moment(det.auditDetail.auditDate, MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY);
    	    		        			  
    	    		    				}else if(auditDate){
    	    		    					
    	    		        			    det.auditDetail.certIssueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(MMMDDYYYY);
    	    		        			    
    	    		        			 
    	    		        			   det.auditDetail.certExpireDate =  nextRenewalEnd ? moment(nextRenewalEnd,YYYYMMDD).add(5,'years').format(MMMDDYYYY):det.auditDetail.certExpireDate;   
    	    		        			  
    	    		        			}
    	    		    			}
    	    		    			det.disableCertIssueExpiry = true;
    	    		 }
    	        	    //  });
    	    	 }else if(det.dirInterAndAdditionalAudit && det.cycleAllData && det.cycleAllData.length==0 && auditDate && auditSubTypeId==det.AppConstant.RENEWAL_SUB_TYPE_ID  && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT){
    				det.auditDetail.certIssueDate = moment(det.auditDetail.auditDate,MMMDDYYYY).format(MMMDDYYYY);
    	  			det.auditDetail.certExpireDate =  det.auditDetail.certIssueDate ? moment(det.auditDetail.certIssueDate,MMMDDYYYY).add(5,'years').subtract(1,'days').format(MMMDDYYYY):det.auditDetail.certExpireDate;   
    	  			nextRenewalStart = det.auditDetail.certIssueDate;
  	  	    	  	nextRenewalEnd = det.auditDetail.certExpireDate;
    				 
    			 }
    	        }
    	     }
     
     function vesselDtlsRefresh(){
    	 if(det.auditDetail.auditAuditorDetail[0].userId == sessionStorage.getItem('emailId') && !det.carUpdateStatus){
    		
    		 detailsFactory.vesselDetails(det.companyId,(sessionStorage.getItem('emailId')).toString(),det.vesselImoNo.vesselImoNo,'vesselImoNo').$promise.then(function(res){
    			 
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
    			
    			if(moment(res[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') == moment(det.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY'))
    				latestCnt++;
	    			
	   	       	if(res[0].vesselName === det.latestVesselDetail[0].vesselName)
	   	       		latestCnt++;
	   	       		 
	   	       	if(res[0].docIssuer === det.latestVesselDetail[0].docIssuer)
	   	       		latestCnt++;
	    			
	   	       	if(moment(res[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') == moment(det.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY'))
	   	       		latestCnt++;
	   	       		
	   	       	if(res[0].vesselType === det.latestVesselDetail[0].vesselType)
	   	       		latestCnt++;
	   	       		
	   	       	if(res[0].companyIMONumber == det.latestVesselDetail[0].companyIMONumber)
	   	       		latestCnt++;
	   	       				 
	   	       	if(res[0].grossTon == det.latestVesselDetail[0].grossTon)
	   	       		latestCnt++;
    				
    			if(res[0].homePort == det.latestVesselDetail[0].homePort)
    				latestCnt++;
    			
    			if(latestCnt!=10){
    				var autoVessel = res[0];
    				
    				autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
        			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
        			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    				
    				detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
    					console.log(result)
    				});
    				
    				 /*detailsFactory.getUpdatedData().$promise.then(function(res){
    	    			 console.log(res)
    	    		 });*/
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
 		    				
 			   	       		 
 		    				if(moment(res[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') == det.vesselCompanyDtl.docExpiry)
 			   	       			 count++;
 			   	       		 else{
 			   	       			 dynamicMsg += 'Doc Expiry,';
 				   	       		det.LatestVesselDetailsVM.oldVMDOCExpiry = det.vesselCompanyDtl.docExpiry ? det.vesselCompanyDtl.docExpiry : '-';
 			    				det.LatestVesselDetailsVM.newVMDOCExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
 			   	       		 }
 			    			
 			   	       		 if(res[0].docIssuer === det.vesselCompanyDtl.docIssuer)
 			   	       			 count++;
 			   	       		 else{
 			   	       			 dynamicMsg += 'Doc Issuer,';
 				   	       		det.LatestVesselDetailsVM.oldVMDOCIssuer = det.vesselCompanyDtl.docIssuer ? det.vesselCompanyDtl.docIssuer : '-';
 			    				det.LatestVesselDetailsVM.newVMDOCIssuer = res[0].docIssuer ? res[0].docIssuer : '-';
 			   	       		 }
 			    			
 			   	       		 
 			   	       		 if(res[0].vesselName === det.vesselDetail.vesselName)
 			   	       			 count++;
 			   	       		 else{
 			   	       			 dynamicMsg += 'Vessel Name,'
 			   	       			det.LatestVesselDetailsVM.oldVMVesselName = det.vesselDetail.vesselName ? det.vesselDetail.vesselName : '-';
 				    			det.LatestVesselDetailsVM.newVMVesselName = res[0].vesselName ? res[0].vesselName : '-';
 			   	       		 }
 			    			
 			   	       		if(moment(res[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') == det.vesselDetail.dateOfRegistry)
 			   	       			count++;
 			   	       		else{
 			   	       			 dynamicMsg += 'Date Of Registry,'
 			   	       			det.LatestVesselDetailsVM.oldVMPOR = det.vesselDetail.dateOfRegistry ? det.vesselDetail.dateOfRegistry : '-';
 				    			det.LatestVesselDetailsVM.newVMPOR = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
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
 			   	       			 dynamicMsg += 'Company IMO NO.,'
 			   	       			det.LatestVesselDetailsVM.oldVMCompanyIMONo = det.vesselDetail.companyImoNo ? det.vesselDetail.companyImoNo : '-';
 				    			det.LatestVesselDetailsVM.newVMCompanyIMONo = res[0].companyIMONumber ? res[0].companyIMONumber : '-';
 			   	       		}
 			   	       			
 			   	       		
 			   	       		if(res[0].grossTon == det.vesselDetail.grt)
 			   	       			count++;
 			   	       		else{
 			   	       			 dynamicMsg += 'GRT,';
 				   	       		det.LatestVesselDetailsVM.oldVMGRT = det.vesselDetail.grt ? det.vesselDetail.grt : '-';
 			    				det.LatestVesselDetailsVM.newVMGRT = res[0].grossTon ? res[0].grossTon : '-';
 			   	       		}
 		    				
 		    				
 		    				
 		    				if(res[0].homePort == det.vesselDetail.portOfRegistry)
 		    		 			count++;
 		    				else{
 			   	       			 dynamicMsg += 'Port of Registry';
 				   	       		det.LatestVesselDetailsVM.oldportOfRegistry = det.vesselDetail.portOfRegistry ? det.vesselDetail.portOfRegistry : '-';
 			    				det.LatestVesselDetailsVM.newportOfRegistry = res[0].homePort ? res[0].homePort : '-';
 				   	       		
 		    				}
 		    				
 		    				det.letterAppComp = [];
 							 
 							  det.letterAppComp.companyAddress = campAddress;
 							  det.letterAppComp.companyName = compName;
 							  det.letterAppComp.vesselName = det.auditDetail.vesselName;
 			  			  
 			  			  det.letterRecComp = [];
 			  			  
 			  			  det.letterRecComp.companyAddress = campAddress;
 			  			  det.letterRecComp.companyName = compName;
 			  			  det.letterRecComp.vesselName = det.auditDetail.vesselName;
 			   	       		if(count!=10){
 			   	       			det.vesselUpdate = false;
 			   	       			det.UpdateVesselAvailable =true;
 			   	       			det.UpdateVesselRefreshed = true;
 			   	       			det.vesselRefreshMsg += dynamicMsg + " Do You wish to continue?"
 			   	       			det.LatestVesselDetailsVM.vesselRefreshMsg = det.vesselRefreshMsg;
 				   	             
 				   	            det.updateVesselDeatils(det.LatestVesselDetailsVM);
 				   	            	
 			   	       		 }else if(count==10){

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
 		   
 		}else if(!vssel.vesselName || !vssel.vesselType  || !vssel.grossTon || !vssel.companyIMONumber || !vssel.homePort || !vssel.docTypeNumber || !vssel.docType){
 			flag = true;
 		}else if(!vssel.registrationDate || !vssel.docIssuer || !vssel.docExpiry || !vssel.companyAddress || !vssel.customerName){
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
 			
 			detailsFactory.vesselDtlIncomplete(det.loginUserId, det.vesselDetail.vesselImoNo, det.vesselDetail.vesselId,det.companyId,vData).$promise.then(function(res) {
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
 		
 			if(!vssel.registrationDate){
				 det.partialMissingData = det.partialMissingData +''+' ,Date Of Registry  ';
				 det.partialMissingStatus = true;
				 det.partialCount++; 
 			}
			    
 			if(!vssel.docIssuer){
				 det.partialMissingData = det.partialMissingData +''+' ,DOC Issuer  ';
				 det.partialMissingStatus = true;
				 det.partialCount++; 
			 }
			
			  if(!vssel.docExpiry){
				 det.partialMissingData = det.partialMissingData +''+' ,DOC Expiry  ';
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
			
			if(!vssel.docTypeNumber){
  				 det.partialMissingData = det.partialMissingData +''+' ,DOC Type Number ';
  				 det.partialMissingStatus = true;
  				det.partialCount++; 
  				if(!det.vesselCompanyDtl.docType){
  					$('#doctype').addClass('err');} 
  			}
			if(!vssel.docType){
  				 det.partialMissingData = det.partialMissingData +''+' , Company DOC Type Number  ';
  				 det.partialMissingStatus = true;
  				 det.partialCount++; 
  			}
				  
 		}  
 		
 		return flag;
 	}
     
    
     function vesselDtlsCheck(){
    	 if(det.auditCreate){
    		 detailsFactory.vesselDetails(det.companyId,(sessionStorage.getItem('emailId')).toString(),det.vesselImoNo.vesselImoNo,'vesselImoNo').$promise.then(function(res){
    			 var autoVessel = res[0];
 				
 				autoVessel.docExpiry = res[0].docExpiry ? moment(res[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
     			autoVessel.registrationDate = res[0].registrationDate ? moment(res[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
     			autoVessel.keelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
 				
 				detailsFactory.updateVesselAuto(autoVessel).$promise.then(function(result) {
 					console.log(result)
 				});
    			 det.latestVesselDetail = angular.copy(res);
    		 });
    	 }
    	 else if(!det.auditCreate){
         	console.log(det.auditDetailOrg)
    		 detailsFactory.getVesselRefresh(det.vesselImoNo.vesselImoNo).$promise.then(function(res) {
        		
        		res.result.sort(function(c, d){
    	            return d.vesselID - c.vesselID;
    	        });
    			
    			console.log(res);
    			det.latestVesselDetail = angular.copy(res.result);
    			console.log('docexpiry'+det.latestVesselDetail[0].docExpiry);
    			res.result[0].docExpiry = res.result[0].docExpiry ? moment(res.result[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			res.result[0].registrationDate = res.result[0].registrationDate ? moment(res.result[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
    			
    			var count = 0;
    			
    			det.vesselRefreshMsg = 'Refresh Vessel Details For ';
    			var dynamicMsg = '';
    			det.LatestVesselDetailsVM = [];
    			det.LatestVesselDetailsVM.fromPage = 'audit'
    				det.latestVesselDetail = angular.copy(res.result);
    			
    				det.reasonForVoidShow = true;
    				
    				//var flag = det.validateVesselNull(det.latestVesselDetail[0]);
		    			
    				var campAddress = '',compName='';
    				if(det.auditDetailOrg.companyAddressAud){
    					var orgComAdd = det.auditDetailOrg.companyAddressAud.split("\n");
    					campAddress = det.auditDetailOrg.companyAddress?det.auditDetailOrg.companyAddress:orgComAdd[1];		//changed by @Ramya on 17-11-2022 for jira id - IRI-5546
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
    				var perfectDateEx;
    				if(det.auditDetailOrg.docExpiryAud)
    					perfectDateEx = moment(det.auditDetailOrg.docExpiryAud, 'DD-MMM-YYYY',true).isValid() ? det.auditDetailOrg.docExpiryAud : det.auditDetailOrg.docExpiryAud ? moment(det.auditDetailOrg.docExpiryAud,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
    				else
    					perfectDateEx = moment(det.auditDetailOrg.docExpiry, 'DD-MMM-YYYY',true).isValid() ? det.auditDetailOrg.docExpiry : moment(det.auditDetailOrg.docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY');
    				var perfectdocExpiry = res.result[0].docExpiry ? moment(res.result[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
    				if(perfectdocExpiry == perfectDateEx)
	   	       			 count++;
	   	       		 else{
	   	       			 dynamicMsg += 'Doc Expiry,';
		   	       		det.LatestVesselDetailsVM.oldVMDOCExpiry = perfectDateEx;
	    				det.LatestVesselDetailsVM.newVMDOCExpiry = perfectdocExpiry;
	   	       		 }
	    			var docIssuer = det.auditDetailOrg.docIssuerAud ? det.auditDetailOrg.docIssuerAud : det.auditDetailOrg.docIssuer;
	   	       		 if(res.result[0].docIssuer === docIssuer)
	   	       			 count++;
	   	       		 else{
	   	       			 dynamicMsg += 'Doc Issuer,';
		   	       		det.LatestVesselDetailsVM.oldVMDOCIssuer = docIssuer ? docIssuer : '-';
	    				det.LatestVesselDetailsVM.newVMDOCIssuer = res.result[0].docIssuer ? res.result[0].docIssuer : '-';
	   	       		 }
	    			
	   	       		 var vesselname = det.auditDetailOrg.vesselNameAud ? det.auditDetailOrg.vesselNameAud : det.auditDetailOrg.vesselName;
	   	       		 if(res.result[0].vesselName === vesselname)
	   	       			 count++;
	   	       		 else{
	   	       			 dynamicMsg += 'Vessel Name,'
	   	       			det.LatestVesselDetailsVM.oldVMVesselName = vesselname;
		    			det.LatestVesselDetailsVM.newVMVesselName = res.result[0].vesselName ? res.result[0].vesselName : '-';
	   	       		 }
	    			var perfectDate = moment(det.auditDetailOrg.dateOfRegistry, 'DD-MMM-YYYY',true).isValid() ? det.auditDetailOrg.dateOfRegistry : det.auditDetailOrg.dateOfRegistry ? moment(det.auditDetailOrg.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
	    			var perfectregistrationDate = res.result[0].registrationDate ? moment(res.result[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
	   	       		if(perfectregistrationDate == perfectDate)
	   	       			count++;
	   	       		else{
	   	       			 dynamicMsg += 'Date Of Registry,'
	   	       			det.LatestVesselDetailsVM.oldVMPOR = perfectDate;
		    			det.LatestVesselDetailsVM.newVMPOR = perfectregistrationDate;
	   	       		}
	   	       		
	   	       		var vesselTypeAud=det.auditDetailOrg.vesselTypeAud ? det.auditDetailOrg.vesselTypeAud : det.auditDetailOrg.vesselTypeName
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
	   	       			 dynamicMsg += 'Company IMO NO.,'
	   	       			det.LatestVesselDetailsVM.oldVMCompanyIMONo = det.auditDetailOrg.companyImoNo;
		    			det.LatestVesselDetailsVM.newVMCompanyIMONo = res.result[0].companyIMONumber ? res.result[0].companyIMONumber : '-';
	   	       		}
	   	       				 
	   	       		if(res.result[0].grossTon == det.auditDetailOrg.grt)
	   	       			count++;
	   	       		else{
	   	       			 dynamicMsg += 'GRT,';
		   	       		det.LatestVesselDetailsVM.oldVMGRT = det.auditDetailOrg.grt;
	    				det.LatestVesselDetailsVM.newVMGRT = res.result[0].grossTon ? res.result[0].grossTon : '-';
	   	       		}
    				
    				
    				
    				if(res.result[0].homePort == det.vesselDetail.portOfRegistry)
    		 			count++;
    				else{
	   	       			 dynamicMsg += 'Port of Registry';
		   	       		det.LatestVesselDetailsVM.oldportOfRegistry = det.vesselDetail.portOfRegistry ? det.vesselDetail.portOfRegistry : '-';
	    				det.LatestVesselDetailsVM.newportOfRegistry = res.result[0].homePort ? res.result[0].homePort : '-';
		   	       		
    				}
    				
    				det.letterAppComp = [];
					 
					  det.letterAppComp.companyAddress = campAddress;
					  det.letterAppComp.companyName = compName;
					  det.letterAppComp.vesselName = det.auditDetailOrg.vesselName;
	  			  
	  			  det.letterRecComp = [];
	  			  
	  			  det.letterRecComp.companyAddress = campAddress;
	  			  det.letterRecComp.companyName = compName;
	  			  det.letterRecComp.vesselName = det.auditDetailOrg.vesselName;
			   	       		
			   	       		if(count!=10){
			   	       			det.vesselUpdate = false;
			   	       			det.UpdateVesselAvailable =true;
			   	       			det.UpdateVesselRefreshed =true;
			   	       			det.vesselRefreshMsg += dynamicMsg + " Do You wish to continue?"
			   	       			det.LatestVesselDetailsVM.vesselRefreshMsg = det.vesselRefreshMsg;
				   	             if(!det.auditDetail.auditAuditorDetail[0].audSignature ){
				   	            	 /*if(det.auditDetail.certificateDetail.length>0)
				   	            		 checkCertificateVesselDeatils(det.auditDetail.certificateDetail[0], 'firstCheck');*/
				   	            	det.vesselUpdate = false;
				   	            	
				   	            	if(det.auditDetail.auditAuditorDetail[0].userId == sessionStorage.getItem('emailId') && !det.carUpdateStatus){
				   	            		det.updateVesselDeatils(det.LatestVesselDetailsVM);
				   	            	}
				    				
				    				console.log(det.LatestVesselDetailsVM)
				   	             }
			   	       		 }
			   	       	if((det.auditDetail.auditSubTypeId == det.AppConstant.INTERIM_SUB_TYPE_ID || det.auditDetail.auditSubTypeId == det.AppConstant.INITIAL_SUB_TYPE_ID ||(det.auditDetail.auditSubTypeId == det.AppConstant.RENEWAL_SUB_TYPE_ID && det.auditDetail.certIssueId == det.AppConstant.FULL_TERM_CERT)) && !det.carUpdateStatus){
				   	       	if(!det.auditDetail.auditAuditorDetail[0].audSignature){
			  	            	 if(det.auditDetail.certificateDetail.length>0)
			  	            		 checkCertificateVesselDeatils(det.auditDetail.certificateDetail[0], 'firstCheck');
				   	       	}
			   	       	}
			   	       	
			   	     if(det.auditDetail.auditStatusId == det.AppConstant.VOID_AUDIT_STATUS || (det.auditDetail.auditAuditorDetail[0].audSignature && det.auditDetail.auditStatusId != det.AppConstant.COMPLETED_AUDIT_STATUS) || (det.auditDetail.auditAuditorDetail[0].audSignature && det.auditDetail.auditStatusId == det.AppConstant.COMPLETED_AUDIT_STATUS))
			   	    	det.vesselUpdate = true;
    				
        	});
     	}
     }
     
     function checkCertificateVesselDeatils(data,status){
    	 var count = 0,flag=false;
    	 if(det.latestVesselDetail[0].companyAddress ===data.vesselCompanyAddress)
      			 count++;
    	 if(moment(det.latestVesselDetail[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') === moment(data.docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY'))
	       			 count++;
	     if(det.latestVesselDetail[0].docIssuer === data.docIssuer)
	       			 count++;
	     if(det.latestVesselDetail[0].vesselName === data.vesselName)
	       			 count++;
	     if(moment(det.latestVesselDetail[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') === moment(data.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY'))
	       			count++;
	     if(det.latestVesselDetail[0].vesselType.toUpperCase().trim() === data.vesselType.toUpperCase().trim())
	       			count++;
	     if(det.latestVesselDetail[0].companyIMONumber == data.companyImoNo)
	       			count++;
	     if(det.latestVesselDetail[0].grossTon == data.grt)
	       			count++;
	     if(det.latestVesselDetail[0].customerName == data.vesselCompanyName)
 			count++;
	     if(det.latestVesselDetail[0].homePort == data.portOfRegistry)
	 			count++;
	      if(count!=10){
	    	  if(status == 'firstCheck'){
	    		  if(data.publishStatus==1){
	    			  toaster.warning('Vessel details are mismatch in active certificate please reissue the certificate.');
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
	    			  toaster.warning('Vessel details are mismatch in previous active certificate, Please make the current audit as void and contact manager to re-issue the cert or re-issue the certificate in current audit');
	    		  },2000); 
	    	  }else if(status == 'dropDown'){
	    			  toaster.warning('Vessel details are mismatch in previous active certificate please contact manager to reissue the certificate.');
	    	  }else if(status == 'renewaled'){
	    		  toaster.warning('Vessel details are mismatch in previous active certificate, Please make the current audit as void and contact manager to re-issue the cert');
	    	  }
	      }
	      
	      return flag;
	      	 
     }
     
     function checkVesselHistory(rmiData,LocalVesData){
    	 
    	 var count = 0;
    	 
			if(rmiData[0].companyAddress === LocalVesData.vesselCompany[0].vesselCompanyAddress)
   			 count++;
			
			if(rmiData[0].customerName == LocalVesData.vesselCompany[0].vesselCompanyName)
	 			count++;
			
       		 if(moment(rmiData[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') == moment(LocalVesData.vesselCompany[0].docExpiry,'MMM DD, YYYY').format('DD-MMM-YYYY'))
       			 count++;
			
       		 if(rmiData[0].docIssuer === LocalVesData.vesselCompany[0].docIssuer)
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
			
			return count;
       		
     }
     
 }  
})();
