
(function (){
    'use strict';

    angular
        .module('app.audit')       
        
        .controller('AuditController', AuditController)
        
        .controller('auditorDetailController', AuditorDetailController)
        
    	.controller('reportController', ReportController)
    	
		.controller('docChangedController', docChangedController)
		
		.controller('reportPreviewController', ReportPreviewController)
		
		.controller('removeReportController',removeReportController)
		
		.controller('sendEmailController',sendEmailController)
		
		.controller('dateWarningController', dateWarningController)
		
		.controller('warningControllerCompletion', warningControllerCompletion)
		
		.controller('historyController', historyController)
		
		.controller('findingFilePreviewController', findingFilePreviewController)
		
		.controller('warningController', warningController)
		
		.controller('approveRejectController', approveRejectController)
	
	// .controller('certificateHistoryController', certificateHistoryController)
		
		.controller('tcApprovalController',tcApprovalController)
    
    	.controller('vesselController',vesselController)
    	
    	.controller('emailReportController',EmailReportController)
    	
    	.controller('UserSigantureController',UserSigantureController)
    	
    	.controller('reasonController',reasonController)
    
        .controller('LetterHistoryController',LetterHistoryController)
        
        .controller('reportHistoryController',reportHistoryController)
        
		.controller('supportAttachementController', SupportAttachementController)

		.controller('vesselImoNoRegistryController', vesselImoNoRegistryController)
		
		.controller('PdfsignController', PdfsignController)
    
        .controller('ihmController', ihmController)
        
        .controller('stamPointersController',StamPointersController)
        
        .controller('viewMoreController',viewMoreController)
        
        .controller('okModalController',okModalController)
        
       // .controller('completionSurveyDateController',completionSurveyDateController);
    
    .controller('addMasterReportController',addMasterReportController)
    .controller('addExemptionController',addExemptionController)
    .controller( 'vesselHistoryDetailsPopupController',vesselHistoryDetailsPopupController)
    .controller( 'ReceiptHistoryController',ReceiptHistoryController);
    
    function addMasterReportController($rootScope, $sce, $state, ModalService, $scope,
    		scope, $filter, auditFactory, $http, BASE_URL, $timeout,
   		 $cookies, blockUI, toaster,YYYYMMDD,MMMDDYYYY,close,HHmm){

	var addmasrep=this; console.log('sss');
	console.log(addmasrep);
	console.log(scope);
	
	
	
	addmasrep.reportData = scope.reportData;
	
	
	
	addmasrep.newAddedReport =1;
	
	addmasrep.updateReportData = updateReportData;
	
	console.log($scope);    	
	addmasrep.yesOrNoOptions = [{
    	'id':1,
    	'value':'Yes'
    },
    {
    	'id':0,
    	'value':'No'
    }];
	
	addmasrep.updateReportFlag=scope.updateReportFlag ? scope.updateReportFlag :'';
	
	addmasrep.attachmentTypeId=scope.newAddedReportCurrent ? scope.newAddedReportCurrent :'';
	
	
	 addmasrep.reportnewdatas =[];
	
	 addmasrep.reportnewdatas = addmasrep.reportData.filter(function( obj ) {
		   
		   return obj.addNewReport ==1;
	 });
	 

	addmasrep.deleteReport = deleteReport;
	
	function deleteReport(attachmentTypeId){
		
		if( addmasrep.reportnewdatas.length == 1 ){
			
			scope.addReports =false;
			
		}
		for (var i = addmasrep.reportData.length - 1; i >= 0; --i) {
		    if (addmasrep.reportData[i].attachmentTypeId == attachmentTypeId) {
		  
		     addmasrep.reportData.splice(i,1);
		     toaster.success('Report Removed Successfully');
		    }
		}
		
		close('Cancel', 0);
		
		$('.modal-backdrop').remove();
		
	}
	
	if (addmasrep.updateReportFlag) {
		addmasrep.updateReportData(1);
		
	}else {
		addmasrep.showUpdate = false;
	}
	function updateReportData(id){  
		if (id==1) {
			
		addmasrep.newAddedReportData=_.filter(addmasrep.reportData, function(obj){ 
			return obj.attachmentTypeId && obj.attachmentTypeId==addmasrep.attachmentTypeId;
			
		});
		console.log(addmasrep.newAddedReportData);
		if (addmasrep.newAddedReportData  && addmasrep.newAddedReportData.length  && addmasrep.newAddedReportData.length>0) {
			addmasrep.fileTypeDesc =addmasrep.newAddedReportData[0].attachmentTypeDesc.toUpperCase();
			addmasrep.mandtory=addmasrep.newAddedReportData[0].mandatory;
			addmasrep.active=addmasrep.newAddedReportData[0].activeStatus;
			addmasrep.showUpdate = true;
			
		}
		
		}else if (id==2) {
			if(addmasrep.validateReport()){
			addmasrep.reportData=_.filter(addmasrep.reportData, function(obj){ 
				if ( obj.attachmentTypeId && obj.attachmentTypeId==addmasrep.attachmentTypeId) {
					obj.mandatory=addmasrep.mandtory;
					obj.activeStatus=addmasrep.active;
					obj.attachmentTypeDesc=addmasrep.fileTypeDesc.toUpperCase();
					toaster.success('Report Updated Successfully');
					
					
				}
				return obj;
				
			});
			
			close('Cancel', 0);
			
			$('.modal-backdrop').remove();
			}	
		}
	}
	
	
	$scope.close = function(result){ 
   	
   	console.log('kkkk');
   		close(result, 0);
   		
   		$('.modal-backdrop').remove();
		}
	
	
	addmasrep.validateReport = function(){
		var flag = true; 
		
		
	 //addmasrep.alreadyExist=_.findWhere(addmasrep.reportData, {'attachmentTypeDesc' : addmasrep.fileTypeDesc});
	
		 if(!addmasrep.fileTypeDesc){
 		   toaster.warning('Please Enter the Valid Report Type');   
 		   flag = false;
 	   }else if(!addmasrep.mandtory && addmasrep.mandtory!=0  ){
 		   toaster.warning('Please Select Mandatory Option');   
 		   flag = false;
 	   }else if(!addmasrep.active && addmasrep.active!=0){
 		   toaster.warning('Please Select Active Option');   
   		 	flag = false;
   	   }/*else if(addmasrep.alreadyExist || addmasrep.fileTypeDesc=='OTHER' || addmasrep.fileTypeDesc=='other'){
   		   	toaster.warning('Already Report Type Exists');   
 	   		 flag = false;
 	   	   }*/
		 
		 for(var i = 0; i < addmasrep.reportData.length ; i++){
			//Changed by Archana for JIRA-ID= IRI-5411 & TICKET-549
			//if(addmasrep.fileTypeDesc.toUpperCase() == addmasrep.reportData[i].attachmentTypeDesc || addmasrep.reportData[i].addNewReport ==0){ 
			 if(addmasrep.fileTypeDesc.toUpperCase() == addmasrep.reportData[i].attachmentTypeDesc ) {		//added by ramya for jira id-->5250  
			  toaster.warning('Already Report Type Exists ');
			  flag = false;
			
			 }
		 }
		 
		 return flag;
	}

	addmasrep.saveReports = function(){
		
		if(addmasrep.validateReport()){
		close('Cancel', 0);
		
		$('.modal-backdrop').remove();
		
      var maxattachmentTypeId=_.max(scope.reportData, function(find){  return   find.attachmentTypeId; }) ;
       maxattachmentTypeId = maxattachmentTypeId.attachmentTypeId + 1;
       if(maxattachmentTypeId==1005){ maxattachmentTypeId=maxattachmentTypeId + 1;  }
       scope.showUpdateGlobal=true;
       scope.addReports =true;
       
       
		var data={
				'activeStatus': addmasrep.active,
				'attachmentTypeDesc': addmasrep.fileTypeDesc.toUpperCase(),
				'attachmentTypeId': maxattachmentTypeId	,
				'auditSubTypeId': scope.auditSubTypeId,
				'auditTypeId': scope.auditTypeId,
				'companyId': 2,
				'dateIns': moment(new Date()).format( "MMM D, YYYY h:mm:ss a"),
				//'dateIns': moment(new Date()).format(MMMDDYYYY+HHmm),
				'lastUpdatedDate' : moment(new Date()).format( "MMM D, YYYY h:mm:ss a"),
				'lastUpdatedDateVal': moment(new Date()).format(MMMDDYYYY+HHmm),
				'mandatory': addmasrep.mandtory,
				'userIns': "BSOL",
				'showUpdateFlag': 1,
				'addNewReport':1
			};
		addmasrep.newAddedReport = addmasrep.newAddedReport+1;
		 toaster.success('Report Added Successfully');   
		addmasrep.reportData.push(data);
		
		console.log(addmasrep.reportData);
		
	 }
	
	}
	
}
    
    
    function addExemptionController($rootScope,$state,$cookies, ModalService, $scope,$http,scope,toaster,YYYYMMDD,MMMDDYYYY,close,HHmm){

	var addExe=this;
	console.log(scope);
	
		addExe.exempData=scope.exempData;
		
		addExe.updateExemptCertData = updateExemptCertData;
		
		
		addExe.yesOrNoOptions = [{
			'id':1,
			'value':'YES'
		},
		{
			'id':0,
			'value':'NO'
		}];
		
		addExe.updateExemptCertFlag=scope.updateExemptCertFlag ? scope.updateExemptCertFlag :'';
		
		addExe.reasonId=scope.newAddedExemptCurrent ? scope.newAddedExemptCurrent :'';
		
		addExe.deleteExemptCert = deleteExemptCert;
		
		if (addExe.updateExemptCertFlag) {
			addExe.updateExemptCertData(1);
			
		}else {
			addExe.showUpdate = false;
		}
	
		$scope.close = function(result){ 
			close(result, 0);
			$('.modal-backdrop').remove();
			console.log("789");
		}
		
		
		 addExe.validateExempCert = function(){
			var flag = true; 
			
			 
			if(! addExe.ecGrantedReason){
	 		   toaster.warning('Please Enter the Exemption Certificate');   
	 		 flag = false;
			 }
			 
			 if(! addExe.active && addExe.active !=0){
		 		   toaster.warning('Please Select the Active Status');   
		 		 flag = false;
			 }
			 
			 for(var i = 0; i < addExe.exempData.length ; i++){
			 
				 if(addExe.ecGrantedReason == addExe.exempData[i].ecGrantedReason && addExe.exempData[i].addreason ==0){
				 
				 toaster.warning('Exemption Certificate already exists ');
				 flag = false;
				
				 }
			 }
				
			 
			 return flag;
		 }
		 
		
		 
		
		 addExe.saveExempCert = function(){
			 
			if(addExe.validateExempCert()){
			close('Cancel', 0);
			
			$('.modal-backdrop').remove();
			
			 var maxreasonId =_.max(scope.exempData, function(find){  return   find.reasonId; }) ;
			 
			 maxreasonId = maxreasonId.reasonId + 1;
			 scope.addExempt =true;
			
			var data={
					'activeStatus':  addExe.active,
					'ecGrantedReason':addExe.ecGrantedReason,
					'updatedOn': moment(new Date()).format(MMMDDYYYY),
					'reasonId': 0,
					'updatedBy': sessionStorage.getItem('emailId'),
					'showUpdateFlag': 1,
					'reasonId': maxreasonId	,
					'addNewExempt':1,
					'addreason':1
					
					
				};
			
			 toaster.success('Exemption Certificate Added successfully');   
			 addExe.exempData.push(data);
			
		 }
			
			
		}
		
		function updateExemptCertData(id){  
			if (id==1) {
				
				addExe.newAddedExemptData=_.filter(addExe.exempData, function(obj){ 
				return  obj.reasonId && obj.reasonId == addExe.reasonId;
				
			});
			console.log(addExe.newAddedReportData);
			if (addExe.newAddedExemptData  && addExe.newAddedExemptData.length  && addExe.newAddedExemptData.length>0) {
				addExe.ecGrantedReason =addExe.newAddedExemptData[0].ecGrantedReason;
				addExe.active=addExe.newAddedExemptData[0].activeStatus ;
				addExe.showUpdate = true;
				
			}
			
			}else if (id==2) {
			  if(addExe.validateExempCert()){
				addExe.exempData =_.filter(addExe.exempData, function(obj){ 
					
					if ( obj.reasonId && obj.reasonId==addExe.reasonId) {
						
						obj.ecGrantedReason=addExe.ecGrantedReason;
						obj.activeStatus= addExe.active,
						toaster.success('Exemption Certificate Updated Successfully');
					}
					
					return obj;
				});
				

				close('Cancel', 0);
				
				$('.modal-backdrop').remove();
			 }
			}
		}
		
		
		
		
		function deleteExemptCert(reasonId){
			
			for (var i = addExe.exempData.length - 1; i >= 0; --i) {
			    if (addExe.exempData[i].reasonId == reasonId) {
			    	addExe.exempData.splice(i,1);
			     toaster.success(' Exemption Certificate has been removed  successfully');
			    }
			}
			
			close('Cancel', 0);
			
			$('.modal-backdrop').remove();
			
		}
		
		
	
    }

   
    function PdfsignController($rootScope, $sce, $state, ModalService, $scope,
    		scope, $filter, auditFactory, $http, BASE_URL, $timeout,
    		detailsFactoryIhm, $cookies, blockUI, toaster,masterFactory,auditService) {
    	
    	var pdfsign = this;
    	console.log(scope.userIns)
    	console.log($scope)
    	console.log(scope)
    	pdfsign.auditTypeId = scope.auditDetail.auditTypeId;
    	//console.log(scope.auditDetailOrg.userIns)
    	pdfsign.userName =   (scope.userIns ? scope.userIns :  (scope.auditDetailOrg && scope.auditDetailOrg.userIns) ? scope.auditDetailOrg.userIns : null);
    	pdfsign.edit=scope;
    	pdfsign.fileBtn=false;
    	pdfsign.pointerValues = [];
    	var cordinatesx = [];
    	var cordinatesy = [];
    	pdfsign.pageCor = [];
    	pdfsign.pageCorx = [];
    	pdfsign.pageCory = [];
    	pdfsign.tableTrue = true;
    	pdfsign.signArray = [];
    	pdfsign.sealArray = [];
    	pdfsign.signerArray = [];
    	pdfsign.moutputNo = '';
    	pdfsign.file;
    	pdfsign.reportReviewNo;
    	pdfsign.auditSeqNo;
    	pdfsign.dwnBtn = true;
    	pdfsign.returnValue;
    	pdfsign.addedpageNos = [];
    	pdfsign.mInputNo = '';
    	pdfsign.table = [];
    	pdfsign.editTable=[];
    	pdfsign.preview;
    	pdfsign.fileBlob='';
    	pdfsign.signerName='';
    	pdfsign.pointers = [];
    	pdfsign.savedTable=[];
    	pdfsign.uploadBtn=true;
    	pdfsign.checkboxModel = {
			       seal : false,
			       sign : false,
			       signer:false
			     };
    	pdfsign.uploadedSuccessfully = false;
    	pdfsign.submit = true;
    	
    	pdfsign.isSspDmlc = false; 
    	
    	pdfsign.isIhm = false; 
    	
    	if(scope.auditDetail.auditTypeId == 1004 || scope.auditDetail.auditTypeId == 1005)
    		pdfsign.isSspDmlc = true;
    	
    	if(scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013){
    		pdfsign.isSspDmlc = true;
			pdfsign.signdate=scope.auditDetail.auditDate;
		}
    	if(scope.auditDetail.auditTypeId == 1006)
    		pdfsign.isIhm = true;
    	
    	if(scope.auditDetail.auditTypeId == 1006){
    	
	    	cordinatesx.push("75", "180", "290", "395","75", "180", "290", "395","75", "180", "290", "395","75", "180", "290", "395","75", "180", "290", "395",
	    			"75", "180", "290", "395","75", "180", "290", "395","75", "180", "290", "395","75", "180", "290", "395");
	
	    	cordinatesy.push("705", "705", "705", "705", "620", "620", "620", "620",
	    	    			"540", "540", "540", "540", "480", "480", "480", "480", 
	    	    			"360", "360", "360", "360", "295", "295", "295", "295",
	    	    			"210", "210","210", "210", "130", "130", "130", "130",
	    	    			"50", "50", "50", "50");
    	}else if(scope.auditDetail.auditTypeId == 1004 || scope.auditDetail.auditTypeId == 1005 || (scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013)){
    		cordinatesx.push("75", "180", "290", "395",
    						"75", "180", "290", "395",
    						"75", "180", "290", "395",
    						"75", "180", "290", "395",
    						"75", "180", "290", "395",
    						"75", "180", "290", "395",
    						"75", "180", "290", "395",
    						"75", "180", "290", "395",
			    			"75", "180", "290", "490");
	
	    	cordinatesy.push("650", "650", "650", "650", "620", "620", "620", "620",
	    	    			"540", "540", "540", "540", "480", "480", "480", "480", 
	    	    			"360", "360", "360", "360", "295", "295", "295", "295",
	    	    			"210", "210","210", "210", "130", "130", "130", "130",
	    	    			"50", "50", "50", "40");
    	}

    	for (var i = 1; i <= 36; i++) {
    		pdfsign.pointerValues.push({
    			"num" : i,
    			"valuex" : cordinatesx[i - 1],
    			"valuey" : cordinatesy[i - 1]
    		});
    	}
    	
    	pdfsign.changePdfDate = function() {
    		pdfsign.dwnBtn = true;
    	};
    	
    	pdfsign.editStampData = function() {
    		pdfsign.file=[];
    		pdfsign.returnValue=pdfsign.edit.TOTAL_NO_PAGES;
    		pdfsign.file.name=pdfsign.edit.FILE_NAME;
    		pdfsign.signdate=moment(pdfsign.edit.STAMP_DATE).format('DD-MMM-YYYY');
    		pdfsign.submit=false;
    		pdfsign.tableTrue=false;
    		pdfsign.dwnBtn=false;
    		
    		var cntPage=pdfsign.edit.PAGE_NO.split("&");
    		var cntPointers=pdfsign.edit.POINTERS.split(",");
    		var cntSeal=pdfsign.edit.ISSEAL.split(",");
    		var cntSign=pdfsign.edit.ISSIGN.split(",");
    		var cntSigner=pdfsign.edit.SIGNER.split(",");
    		
    		for(var k=0;k<cntSign.length-1;k++){
    			
    			var cor=parseInt(cntPointers[k]);
    			var PTRpoints=getCor(cor);
    				pdfsign.table.push({
						'pageno' : cntPage[k],
						'pointer' : cntPointers[k],
						'index' : k,
						'seal' : cntSeal[k]=='true'?'Yes':'No',
						'sign' : cntSign[k]=='true'?'Yes':'No',
						'signer':cntSigner[k]=='true'?'Yes':'No',
	    				'corx' : PTRpoints.valuex,
	    				'cory' : PTRpoints.valuey,
	    				'deleteBtnDis':true
					});
    		}
    		console.log(pdfsign.edit)
    		var actualfilename = pdfsign.edit.FILE_NAME.split(".pdf");
			actualfilename = actualfilename[0] + "_IRI_" + pdfsign.edit.REVIEW_REPORT_NO
					+ ".pdf";
    		pdfsign.savedTable = {
					'fileName' : actualfilename,
					'signByte' : pdfsign.signByte,
					'sealByte' : pdfsign.sealByte,
					'pagenumbers' : pdfsign.edit.PAGE_NO,
					'corx' : pdfsign.table[0].corx,
					'cory' : pdfsign.table[0].cory,
					'sign' : pdfsign.edit.ISSIGN,
					'seal' : pdfsign.edit.ISSEAL,
					'signer':pdfsign.edit.SIGNER,
					'userId' : pdfsign.edit.USER_ID,
					'modifiedDate' : moment(pdfsign.edit.STAMP_DATE).format('DD-MMM-YYYY'),
					'emailId' : pdfsign.edit.CREATED_BY,
					'signerName':pdfsign.edit.SIGNER_NAME,
					'createdDate' : moment(pdfsign.edit.STAMP_DATE).format('DD-MMM-YYYY'),
					'reviewReportNo' : pdfsign.edit.REVIEW_REPORT_NO,
					'stampDate' : moment(pdfsign.edit.STAMP_DATE).format('DD-MMM-YYYY'),
					'totalNoPages' : pdfsign.edit.TOTAL_NO_PAGES,
					'pointers' : pdfsign.edit.POINTERS,
					'status' : 'preview',
					'userName' : pdfsign.userName
				};
    		console.log(pdfsign.savedTable)
    		
    	}
    	
    	function uploadBtnDisable(){
    		if(pdfsign.file)
    			pdfsign.uploadBtn=false;
    		else if(pdfsign.edit.message)
    			pdfsign.uploadBtn=true;
    	}
    	
    	if(pdfsign.edit.message){
    		uploadBtnDisable();
    		pdfsign.editStampData();
    	}
    	
    	pdfsign.allClicked=function(){
    		pdfsign.mInputNo = '';
    	}
    	console.log(scope)
    	pdfsign.reportReviewNo = scope.REVIEW_REPORT_NO;
    	
    	
    	if(pdfsign.reportReviewNo){
    		pdfsign.reportReviewNo = scope.REVIEW_REPORT_NO;
    		pdfsign.auditSeqNo = scope.AUDIT_SEQ_NO;
    	}
    	else{
    		
    		pdfsign.reportReviewNo = scope.auditDetailOrg.auditReportNo;
    		pdfsign.auditSeqNo = scope.auditDetailOrg.auditSeqNo;
    			
    	}
    	console.log(pdfsign.auditSeqNo)
    	masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
		pdfsign.officialId=res[0].officialId;
		
			console.log(pdfsign.signerName)
			detailsFactoryIhm.auditorSignAndSeal(pdfsign.officialId, sessionStorage.getItem('companyId')).$promise
			.then(function(data) {
				console.log(data)
				pdfsign.signByte = data.signature;
				pdfsign.signerName = data.signer;
				if (data.title.indexOf('Special') >= 0) {
					pdfsign.sealByte = sourceToDataURL('sa_transparent');
				} else if (data.title.indexOf('Deputy') >= 0) {
					pdfsign.sealByte = sourceToDataURL('dc_transparent');
				}
				if (pdfsign.sealByte) {
					var splitseal = [];
					splitseal = pdfsign.sealByte.split(",");
					pdfsign.sealByte = splitseal[1];
				}
			});
		});
    	
    	function getCor(point){
    		for (var i = 0; i < pdfsign.pointerValues.length; i++){
    			  if (pdfsign.pointerValues[i].num == point){
    			     return pdfsign.pointerValues[i];
    			  }
    			}
    	}
    	
    	pdfsign.close1 = function() {
    		
    		close('cancel');
    		$('#pdf-modal-backdrop').remove();
    		$rootScope.$broadcast('refreshDET', 'refreshDET');
    		if (pdfsign.file) {
    			var actualfilename = pdfsign.file.name.split(".pdf");
    			actualfilename = actualfilename[0] + "_IRI_" + pdfsign.reportReviewNo
    					+ ".pdf";
    			if(!pdfsign.savedTable.signByte){
	    			pdfsign.savedTable.signByte=pdfsign.signByte;
	    			pdfsign.savedTable.sealByte=pdfsign.sealByte;
    			}
    			
    			if(scope.auditDetail.auditTypeId == 1004 || scope.auditDetail.auditTypeId == 1005 || (scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013)){
    				detailsFactoryIhm.deleteStamp("perDelete", actualfilename,
	    					pdfsign.officialId).$promise.then(function(res) {
	    						console.log(res)
	    			});
    			}
    			else if(pdfsign.savedTable.length!=0){
    				$timeout(function() {
    				auditFactory.pdfPostNo(pdfsign.savedTable).$promise.then(function(res) {
    					if(res){
	    					detailsFactoryIhm.deleteStamp("close", actualfilename,
			    					pdfsign.officialId).$promise.then(function(res) {
			    						console.log(res)
			    						pdfsign.refreshButton();
			    			});
    					}
    				});
    				},1000);
    			}else{
    				detailsFactoryIhm.deleteStamp("perDelete", actualfilename,
	    					pdfsign.officialId).$promise.then(function(res) {
	    						console.log(res)
	    			});
    			}
    		}
    	};

    	$rootScope.closestamp = function() {
    		close('cancel');
    		$('#pdf-preview').remove();
    	};

    	$scope.trustUrl = function(val) {

    		return $sce.trustAsResourceUrl(val);

    	}
    	// NOW UPLOAD THE FILES.

    	pdfsign.SelectFile = function(e) {
    		
    		var actualfilename = pdfsign.file.name.split(".pdf");
			actualfilename = actualfilename[0] + "_IRI_" + pdfsign.reportReviewNo
					+ ".pdf";
			console.log(pdfsign.auditSeqNo)
			detailsFactoryIhm.getFileStamp(actualfilename,pdfsign.auditSeqNo).$promise.then(function(res) {
				console.log(res.fileExists)
				
	    		if(!res.fileExists){
					/*var indexPdf = pdfsign.file.name.split(".pdf");
		    		console.log(indexPdf[1])*/
		    		if(pdfsign.file.type==='application/pdf'){
		    		blockUI.start("Loading...");
		    		var reader = new FileReader();
		    		var binary = "";
		    		reader.readAsArrayBuffer(pdfsign.file);
		    		reader.onload = function(readerEvt) {
		    			console.log(readerEvt)
		    			var bytes = new Uint8Array(reader.result);
		    			
		    			var length = bytes.byteLength;
		
		    			for (var i = 0; i < length; i++) {
		
		    				binary += String.fromCharCode(bytes[i]);
		    			}
		    			pdfsign.binary=binary;
		    			/*if(binary.match(/\/Type\s*\/Page\b/g))
		    				pdfsign.returnValue = binary.match(/\/Type\s*\/Page\b/g).length;
		    			else
		    				toaster.warning("Please Upload Proper PDF")*/
		    			if (pdfsign.file.type == 'application/pdf') {
		        				
		    	    				blockUI.start("Loading...");
		    	    				var url = BASE_URL + 'pdfSignUpload/upload';
		    	    				var fileByte = [];
		    	    				
		    	    				fileByte = pdfsign.binary ? btoa(pdfsign.binary) : '';
		    	    				$timeout(function() {
		    	    					var modifiedDate = $filter('date')
		    	    							(new Date(), "dd-MM-yyyy");
		    	    					var reportReviewNo = scope.auditDetailOrg.auditReportNo;
		    	    					var finalFileName = pdfsign.file.name.split('.pdf');
		    	    					finalFileName = finalFileName[0] + "_IRI_"
		    	    							+ pdfsign.reportReviewNo + ".pdf";
		    	    					var mailId = sessionStorage.getItem('emailId');
		    	    					var parameter = {
		    	    						'fileName' : finalFileName,
		    	    						'fileByte' : fileByte,
		    	    						'userId' : pdfsign.officialId,
		    	    						'modifiedDate' : modifiedDate,
		    	    						'emailId' : mailId,
		    	    						'createdDate' : modifiedDate,
		    	    						'reviewReportNo' : reportReviewNo,
		    	    						'auditSeqNo' : pdfsign.auditSeqNo,
		    	    						'stampDate' : pdfsign.signdate,
		    	    						'totalNoPages' : parseInt(pdfsign.returnValue),
		    	    						'userName' : pdfsign.userName
		    	    					};
		    	    					
		    	    					auditFactory.pdfLoad(parameter).$promise
		    	    							.then(function(res) {
		    	    								console.log(parseInt(res.data))
		    	    								if(parseInt(res.data)>0){
		    		    								pdfsign.uploadedSuccessfully = true;
		    		    								pdfsign.returnValue = parseInt(res.data);
		    	    								}else if(parseInt(res.data)==0){ 
		    	    									toaster.warning('Error! File Corrupted.');
		    	    									pdfsign.uploadBtn = true;
		    	    									pdfsign.returnValue = 0;
		    	    								}
		    	    								else{
		    	    									toaster.warning('File Upload Error! Please check Internet connection and Try again');
		    	    									pdfsign.uploadBtn = true;
		    	    									pdfsign.returnValue = 0;
		    	    								}
		    	    							});
		    					      
		    	    					blockUI.stop();
		    	    				}, 1000);
		        			
		        		} else {
		        			toaster.warning('Please Upload PDF format only');
		        		}
		
		    			blockUI.stop();
		    		}
		    		angular.element("input[type='file']").val(null);
		    		}
		    		else{
		    			pdfsign.file = '';
		    			pdfsign.refreshButton();
		    			toaster.warning("Please Upload PDF Only");
		    		}
		    		uploadBtnDisable();
	    		}else{
	    			pdfsign.file = '';
	    			toaster.warning("File already exists");
	    		}
			});
    	}

    	pdfsign.refreshButton = function() {
    		pdfsign.fileBtn=false;
    		pdfsign.checkboxModel.sign=false;
    		pdfsign.checkboxModel.seal=false;
    		pdfsign.checkboxModel.signer=false;
    		pdfsign.returnValue = '';
    		pdfsign.file = '';
    		delete pdfsign.file;
    		pdfsign.checkAll = false;
    		pdfsign.addedpageNos = [];
    		pdfsign.mInputNo = '';
    		pdfsign.dwnBtn = true;
    		pdfsign.table = [];
    		pdfsign.submit = true;
    		cordinatesx = [];
    		cordinatesy = [];
    		pdfsign.pageCor = [];
    		pdfsign.pageCorx = [];
    		pdfsign.pageCory = [];
			pdfsign.signdate=(scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013)?scope.auditDetail.auditDate:'';
    		pdfsign.signArray = [];
    		pdfsign.sealArray = [];
    		pdfsign.signerArray = [];
    		pdfsign.pointers = [];
    		pdfsign.tableTrue=true;
    		pdfsign.fileBlob='';
    		pdfsign.uploadBtn=true;
    		pdfsign.binary='';
    		pdfsign.savedTable=[];
    		$scope.pdfsign.pointerDrop='';
    	}

    	pdfsign.addNoButton = function(keyEvent) {
    		
    		var lengthTable = pdfsign.table.length;
    		pdfsign.dwnBtn = true;
    		if (pdfsign.stampValidate()) {
    			
	    			if (pdfsign.checkAll) {
	    				/*for (var i = 1; i <= pdfsign.returnValue; i++) {*/
	    					pdfsign.tableTrue = false;
	    					pdfsign.table.push({
	    						'pageno' : 'All',
	    						'index' : lengthTable++,
	    						'pointer' : pdfsign.pointerDrop.num,
	    						/*'seal' : pdfsign.ssradio=='seal'?'Yes':'No',
	    						'sign' : pdfsign.ssradio=='sign'?'Yes':'No',*/
	    						'seal':pdfsign.checkboxModel.seal==1?'Yes':'No',
	    	        	    	'sign':pdfsign.checkboxModel.sign==1?'Yes':'No',
	    	        	    	'signer':pdfsign.checkboxModel.signer==1?'Yes':'No',
	    						'corx' : pdfsign.pointerDrop.valuex,
	    						'cory' : pdfsign.pointerDrop.valuey,
	    						'deleteBtnDis':false
		    					});
			    			}
	    					else {
	    						pdfsign.tableTrue = false;
		    					pdfsign.table.push({
		    						'pageno' : pdfsign.mInputNo,
		    						'pointer' : pdfsign.pointerDrop.num,
		    						'index' : lengthTable++,
		    						'seal' : pdfsign.ssradio=='seal'?'Yes':'No',
		    	    				'sign' : pdfsign.ssradio=='sign'?'Yes':'No',
		    	    				'seal':pdfsign.checkboxModel.seal==1?'Yes':'No',
		    	        	    	'sign':pdfsign.checkboxModel.sign==1?'Yes':'No',
		    	        	    	'signer':pdfsign.checkboxModel.signer==1?'Yes':'No',
		    	    				'corx' : pdfsign.pointerDrop.valuex,
		    	    				'cory' : pdfsign.pointerDrop.valuey,
		    	    				'deleteBtnDis':false
		    					});
	    					}
    					}
    		}
    	

    	pdfsign.previewPointerButton = function() {
    		
    		pdfsign.previewFile=false;
    		
    		ModalService.showModal({

    			templateUrl : 'src/modals/stampIframe.html',

    			controller : 'stamPointersController as stPointer',
				inputs : {
				scope:pdfsign
				}
    		}).then(function(modal) {

    			modal.element.modal();

    			modal.close.then(function(result) {
    				close('cancel');
    			});

    		});

    	}
    	
    	
    	
    	pdfsign.stampValidate = function() {
    		var flag = true;
    		if( pdfsign.checkNum() || pdfsign.checkAll){
    			
    		if(pdfsign.mInputNo=='' && (!pdfsign.checkAll || pdfsign.checkAll==0)){
    			flag = false;
    			toaster.warning('Please Enter Page Numbers')
    		}
    		if(!pdfsign.pointerDrop){
    			flag = false;
    			toaster.warning('Please Select Pointer')
    		}else if (pdfsign.returnValue == -1) {
    			flag = false;
    			toaster.error('Error')
    		}else if(!pdfsign.checkboxModel.sign && !pdfsign.checkboxModel.seal && !pdfsign.checkboxModel.signer){
				flag = false;
				if(pdfsign.auditTypeId==1006)
					toaster.warning('Please select Seal, Signer or Signature');
				else if(pdfsign.auditTypeId==1004 || (scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013))
					toaster.warning('Please select Seal, Approved or Date');
				else if(pdfsign.auditTypeId==1005)
					toaster.warning('Please select Seal');
			}
    		var add=pdfsign.mInputNo;
    		var pat = /^[0-9,-]*$/;
    		var valvalue = add.match(/^[0-9,-]*$/g);
    		if(!valvalue){
    			flag =  false;
    			toaster.warning("Please input Numbers,Comma and Hyphen only")
    		}
    		
    		var pagenoArr = pdfsign.mInputNo.split(",");
    		if(pagenoArr.length==1){
    			if(pagenoArr[0]){
	    			var pagnoHyp = pagenoArr[0].split("-");
	    			if(pagnoHyp.length==2 && pagnoHyp[0] && pagnoHyp[1]){
	    				if(parseInt(pagnoHyp[0])>parseInt(pagnoHyp[1])){
	    					flag = false;
	    					toaster.warning("Please enter valid page no.");
	    				}
	    			}
	    			if(pagnoHyp.length>=2 ){
	    				for(var i=0;i <pagnoHyp.length; i++){
		    					if(pagnoHyp[i]==''){
								flag = false;
								toaster.warning("Please enter valid page no.");
								return;
	    					}
	    				}
					}
    			}
    		}else{
    			for(var i=0;i <pagenoArr.length; i++){
    				if(pagenoArr[0]==''){
    					flag = false;
						toaster.warning("Please enter valid page no.");
						return;
    				}
    				if(pagenoArr[i]){
    					var pagnoHyp = pagenoArr[i].split("-");
    					if(pagnoHyp.length==2 && pagnoHyp[0] && pagnoHyp[1]){
    	    				if(parseInt(pagnoHyp[0])>parseInt(pagnoHyp[1])){
    	    					flag = false;
    	    					toaster.warning("Please enter valid page no.");
    	    					return;
    	    				}
    	    			}
    					if(pagnoHyp.length>=2 ){
    	    				for(var j=0;j <pagnoHyp.length; j++){
    		    					if(pagnoHyp[j]==''){
	    								flag = false;
	    								toaster.warning("Please enter valid page no.");
	    								return;
    	    					}
    	    				}
    					}
    				}
    					
    			}
    		}
    		
    		var seal = pdfsign.checkboxModel.seal==1?'Yes':'No';
    		var sign = pdfsign.checkboxModel.sign==1?'Yes':'No';
    		var signer = pdfsign.checkboxModel.signer==1?'Yes':'No';
    		
    		for(var i=0;i<pdfsign.table.length;i++){
    			console.log(pdfsign.table[i].pageno)
    			if(pdfsign.table[i].pageno=='All'){
    					if(pdfsign.pointerDrop.num==pdfsign.table[i].pointer && seal==pdfsign.table[i].seal && sign==pdfsign.table[i].sign && signer==pdfsign.table[i].signer){
    						toaster.warning("Please provide different combination, this combination already exists!");
    						flag=false;
    					}
    			}else{
    					if(pdfsign.table[i].pageno==pdfsign.mInputNo && pdfsign.pointerDrop.num==pdfsign.table[i].pointer && seal==pdfsign.table[i].seal && sign==pdfsign.table[i].sign && signer==pdfsign.table[i].signer){
    						toaster.warning("Please provide different combination, this combination already exists!");
    						flag=false;
    					}
    				
    			}
    			
    		}
		}else{
			flag = false;
			toaster.warning('Enter Page Number between 1 to '+pdfsign.returnValue);
		}
    		return flag;
    	}
    	
    	pdfsign.checkNum = function(stampIndex,disableBtn) {
    		var pageNo = [],retValue=true;
    		var pagenoArr = pdfsign.mInputNo.split(",");
    		if(pagenoArr.length==1){
    			var pagnoHyp = pagenoArr[0].split("-");
    			if(pagnoHyp.length==1 && pagnoHyp[0])
    				pageNo.push(pagnoHyp[0])
    			else if(pagnoHyp.length==2 && pagnoHyp[0] && pagnoHyp[1]){
    				for(var j=pagnoHyp[0];j <=pagnoHyp[1]; j++){
    					pageNo.push(j)
    				}
    			}
    		}else{
    			for(var i=0;i <pagenoArr.length; i++){
    				if(pagenoArr[i]){
    					var pagnoHyp = pagenoArr[i].split("-");
    					if(pagnoHyp.length==1 && pagnoHyp[0])
    	    				pageNo.push(pagnoHyp[0])
    	    			else if(pagnoHyp.length==2 && pagnoHyp[0] && pagnoHyp[1]){
    	    				for(var j=pagnoHyp[0];j <=pagnoHyp[1]; j++){
    	    					pageNo.push(j)
    	    				}
    	    			}
    				}
    			}
    		}
	    		pageNo.forEach(function(a){
	    				if(a>pdfsign.returnValue)
	    					retValue = false;
	    				if(a==0)
	    					retValue = false;
	    		});
	    		
	    		var add=pdfsign.mInputNo;
	    		var pat = /^[0-9,-]*$/;
	    		var valvalue = add.match(/^[0-9,-]*$/g);
	    		if(!valvalue)
	    			retValue = true;
	    		
	    		
    		return retValue;
    	}

    	pdfsign.uploadButton = function() {
    		
    		if (pdfsign.dateValid('upload')) {
    			if(pdfsign.uploadedSuccessfully = true){
	    			pdfsign.fileBtn=true;
					pdfsign.submit =  false ;
					pdfsign.uploadBtn=true ;
    			}
    			else{
    				pdfsign.fileBtn=false;
					pdfsign.submit =  true ;
					pdfsign.uploadBtn= false ;
    			}
    		}
    		
    		/*if (pdfsign.file.type == 'application/pdf') {
    			if (pdfsign.dateValid('upload')) {
    				
	    				blockUI.start("Uploading Pdf");
	    				var url = BASE_URL + 'pdfSignUpload/upload';
	    				var fileByte = [];
	    				
	    				fileByte = pdfsign.binary ? btoa(pdfsign.binary) : '';
	    				$timeout(function() {
	    					var modifiedDate = $filter('date')
	    							(new Date(), "dd-MM-yyyy");
	    					var reportReviewNo = scope.auditDetailOrg.auditReportNo;
	    					var finalFileName = pdfsign.file.name.split('.pdf');
	    					finalFileName = finalFileName[0] + "_IRI_"
	    							+ pdfsign.reportReviewNo + ".pdf";
	    					var mailId = sessionStorage.getItem('emailId');
	    					var parameter = {
	    						'fileName' : finalFileName,
	    						'fileByte' : fileByte,
	    						'userId' : pdfsign.officialId,
	    						'modifiedDate' : modifiedDate,
	    						'emailId' : mailId,
	    						'createdDate' : modifiedDate,
	    						'reviewReportNo' : reportReviewNo,
	    						'auditSeqNo' : pdfsign.auditSeqNo,
	    						'stampDate' : pdfsign.signdate,
	    						'totalNoPages' : parseInt(pdfsign.returnValue),
	    						'userName' : pdfsign.userName
	    					};
	    					
	    					auditFactory.pdfLoad(parameter).$promise
	    							.then(function(res) {
	    								if(parseInt(res.data)>0){
		    								console.log(parseInt(res.data))
		    								pdfsign.fileBtn=true;
		    								pdfsign.submit = res.data != -1 ? false : true;
		    								pdfsign.uploadBtn=res.data != -1 ? true : false;
	    								}else 
	    									toaster.warning('File Upload Error! Please check Internet connection and Try again');
	    							});
					      
	    					blockUI.stop();
	    				}, 1000);
    				
    			} 
    		} else {
    			toaster.warning('Please Upload PDF format only');
    		}*/

    	}

    	pdfsign.submitButton = function() {
    		pdfsign.preSave("save");
    		
    	}
    	
    	pdfsign.dateValid = function(status){
    		var flag = true;
    		
    		var	isValid = moment(pdfsign.signdate, 'DD-MMM-YYYY', true).isValid()
    		
    		if (!isValid && status!='preview') {
    			if(!pdfsign.signdate){
        			flag= false;
    				toaster.warning('Please provide Date');
                }else{
	    			flag= false;
					toaster.warning('Please provide correct Date format');
                }
            }
    		
    		return flag;
    	}

    	pdfsign.preSave = function(status) {
    		
    		if (pdfsign.dateValid(status) || status=='preview') {
	    		
    			if(scope.auditDetail.auditTypeId == 1004 || scope.auditDetail.auditTypeId == 1005 || (scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013))
        			pdfsign.dwnBtn = false;
    			
	    			pdfsign.pageCor = [];
	        		pdfsign.pageCorx = [];
	        		pdfsign.pageCory = [];
	        		pdfsign.signArray = [];
	        		pdfsign.sealArray = [];
	        		pdfsign.signerArray = [];
	        		pdfsign.pointers = [];
	    			pdfsign.table.forEach(function(a) {
	    				
	    				if (pdfsign.pageCor) {
	    					pdfsign.pageCor += a.pageno + "&";
	    					pdfsign.pageCorx += a.corx + ",";
	    					pdfsign.pageCory += a.cory + ",";
	    					pdfsign.signArray += a.sign=='Yes'?true+ ",":false + ",";
	    					pdfsign.sealArray += a.seal=='Yes'?true+ ",":false + ",";
	    					pdfsign.signerArray += a.signer=='Yes'?true+ ",":false + ",";
	    					pdfsign.pointers += a.pointer + ",";
	    				} else {
	    					pdfsign.pageCor = a.pageno + "&";
	    					pdfsign.pageCorx = a.corx + ",";
	    					pdfsign.pageCory = a.cory + ",";
	    					pdfsign.signArray = a.sign=='Yes'?true+ ",":false + ",";
	    					pdfsign.sealArray = a.seal=='Yes'?true+ ",":false + ",";
	    					pdfsign.signerArray = a.signer=='Yes'?true+ ",":false + ",";
	    					pdfsign.pointers = a.pointer + ",";
	    				}
	    			});
	    			
	    			var parameter;
	    			
	    				var modifiedDate = $filter('date')(new Date(), "dd-MM-yyyy");
	    				var reportReviewNo = scope.auditDetailOrg?scope.auditDetailOrg.auditReportNo:pdfsign.edit.REVIEW_REPORT_NO;
	
	    				var finalFileName = pdfsign.file.name.split('.pdf');
	    				finalFileName = finalFileName[0] + "_IRI_" + pdfsign.reportReviewNo
	    						+ ".pdf";
	    				parameter = {
	    					'fileName' : finalFileName,
	    					'signByte' : pdfsign.signByte,
	    					'sealByte' : pdfsign.sealByte,
	    					'pagenumbers' : pdfsign.pageCor,
	    					'corx' : pdfsign.pageCorx,
	    					'cory' : pdfsign.pageCory,
	    					'sign' : pdfsign.signArray,
	    					'seal' : pdfsign.sealArray,
	    					'signer':pdfsign.signerArray,
	    					/*'sign':pdfsign.checkboxModel.sign,
	    	    			'seal':pdfsign.checkboxModel.seal,*/
	    					'userId' : pdfsign.officialId,
	    					'modifiedDate' : modifiedDate,
	    					'emailId' : sessionStorage.getItem("emailId"),
	    					'signerName':pdfsign.signerName,
	    					'createdDate' : modifiedDate,
	    					'reviewReportNo' : reportReviewNo,
	    					'auditSeqNo' : pdfsign.auditSeqNo,
	    					'stampDate' : pdfsign.signdate,
	    					'totalNoPages' : parseInt(pdfsign.returnValue),
	    					'pointers' : pdfsign.pointers,
	    					'status' : (scope.auditDetail.auditTypeId == 1004 || scope.auditDetail.auditTypeId == 1005 || (scope.auditDetail.auditTypeId >= 1007 && scope.auditDetail.auditTypeId <= 1013)) ? 'sspDmlc' : status,
	    					'userName' : pdfsign.userName
	    				};
	    				if(status=="save"){
	    					pdfsign.savedTable=[];
	    					pdfsign.savedTable=parameter;
	    					pdfsign.dwnBtn = false;
	    				}
	    				console.log(parameter)
	    				auditFactory.pdfPostNo(parameter).$promise.then(function(res) {
	        				pdfsign.fileBlob='';
	    					pdfsign.fileBlob=res.data;
	    					
	    					pdfsign.previewFile=true;
	    					if(status=="preview"){
		    					ModalService.showModal({
		    		    					templateUrl : 'src/modals/stampPreview.html',
		    		    					controller : 'stamPointersController as stPointer',
		    		    					inputs : {
		    		    					scope:pdfsign
		    		    					}
		    		    		}).then(function(modal) {
		
		    		    					modal.element.modal();
		
		    		    					modal.close.then(function(result) {
		    		    						close('cancel');
		    		    					});
		
		    		    		});
	    					}
	    		    		blockUI.stop();
	    				});
	
	    			
	    			/**
					 * validating the weither stamp has attached or not to review.
					 * validateAttchedStampOrNot
					 */
	    			if(status=="save")
	    				toaster.success('Saved Successfully');
	    			scope.stampAttedFlag = true;
	
	    			blockUI.stop();
	    			/*
					 * return true; } else return false;
					 */
    		}
    	}

    	pdfsign.stampRemoveRow = function(stampIndex,disableBtn) {
    		var countRow=0;
    		for(var i=0;i<pdfsign.table.length;i++){
    			if(pdfsign.table[i].deleteBtnDis){
    				countRow++ ;
    			}
    		}
    		if(countRow == pdfsign.table.length)
    			pdfsign.dwnBtn = false;
    		if(!disableBtn)
    			pdfsign.table.splice(stampIndex, 1);
    		if(pdfsign.table.length==0){
    			pdfsign.tableTrue = true;
    			pdfsign.dwnBtn = true;
    		}
    		
    		
    	}

    	pdfsign.downloadBtn = function() {
    		var finalFileName = pdfsign.file.name.split('.pdf');
    		finalFileName = finalFileName[0] + "_IRI_" + pdfsign.reportReviewNo
    				+ ".pdf";
        	
	    		auditFactory.downloadStampPdf("output", finalFileName + ".pdf").$promise
	    				.then(function(response) {
	    					_.downloadFiles(new Blob([ response.data ], {
	    						type : 'Content-Type'
	    					}), pdfsign.file.name);
	    					toaster.success('Downloaded Successfully');
	    				});
        	
    	}

    	pdfsign.previewButton = function() {
    		
    		pdfsign.preSave("preview");
    		
    		}
    }	
    
    function StamPointersController(scope,$sce,blockUI,$timeout){
    	blockUI.start("Loading");
    	var stPointer = this;
    	console.log(scope)
    	if(scope.previewFile){
    		downloadFiles(scope.fileBlob);
    	}else{
    		if(scope.auditTypeId == 1004 || scope.auditTypeId == 1005 || (scope.auditTypeId >= 1007 && scope.auditTypeId <= 1013)){
    			stPointer.previewPointer = './assets/global/img/pointersPreviewSSPDMLC.pdf'+'#zoom=40';
	    		blockUI.stop();
    		}else{
	    		stPointer.previewPointer = './assets/global/img/pointersPreview.pdf'+'#zoom=40';
	    		blockUI.stop();
    		}
    	}
    	
    	function downloadFiles(blob) {
    		
    	   if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For
				// IE:
    		   var blobData = new Blob([blob], {type : 'application/pdf'});
    	    	window.navigator.msSaveOrOpenBlob(blobData, scope.file.name);
    	    	
    	    	var link = document.createElement('a');
     	        link.href = window.URL.createObjectURL(blobData);
     	        stPointer.previewStampPageno = $sce.trustAsResourceUrl(link.href);
     	       blockUI.stop();
    	    	
    	    }else {
    	    	
    	    	$timeout(function() {
    	    		var link = document.createElement('a');
        	        link.style = "display: none"; 
        	        link.href = window.URL.createObjectURL(new Blob([blob], {type : 'application/pdf'}));
        	        document.body.appendChild(link);
        	        console.log(link)
        	        stPointer.previewStampPageno = $sce.trustAsResourceUrl(link.href);
        	        blockUI.stop();
    	    	},4000);
        	       
        	 }
    	}
    	
    }
    
    function reportHistoryController(scope,$scope,auditFactory,toaster,auditService,$q,$timeout,blockUI,MMMDDYYYY,YYYYMMDD){
    	
    	var rptHist = this;
    	
    	rptHist.carUpdateCheck = false;
    	
    	rptHist.reportHisList = [];
    	console.log(scope);
    	
    	rptHist.auditReportNo = scope.auditDetail.auditReportNo;
    	
    	rptHist.auditSeqNo = scope.auditDetail.auditSeqNo;
    	
    	rptHist.reportDownload = reportDownload;
    	
    	rptHist.companyId = scope.auditDetail.companyId;
    	
    	rptHist.getReportVersion = getReportVersion;
    	
    	rptHist.auditorType = (scope.auditTypeId !=1006) ? scope.auditorType: "Reviewer";
    	
    	rptHist.auditType = scope.auditType;
    	
    	rptHist.auditTypeId = scope.auditTypeId;
    	
    	auditFactory.getReportData(scope.auditTypeId,scope.companyId,scope.auditSeqNo).$promise.then(function(res) {
    		
    		res.forEach(function(list){
				// added by ramya for jira id-->5223
				if(list.STATUS_DATE){													
    					var newAuditDate=moment(list.STATUS_DATE).format('L');															
    					var formatedDate=moment(newAuditDate).format('DD-MMM-YYYY');
						list.AUDIT_DATE = (list.VERSION_ID==1003 || list.VERSION_ID==1004) ? formatedDate : scope.auditDetail.auditDate ? scope.auditDetail.auditDate : '-';
				}
				else{
						list.AUDIT_DATE = scope.auditDetail.auditDate ? scope.auditDetail.auditDate : '-';
				}
	            		list.AUDIT_PLACE = list.AUDIT_PLACE?decodeURIComponent(atob(list.AUDIT_PLACE)):'-';
	            		
	    				if(scope.auditTypeId != 1006){
	    					    	list.VERSION_TYPE = (list.VERSION_ID==1003 && scope.auditTypeId==1005) ? "Latest Review Note Update" :scope.AppConstant.VERSION_ID[list.VERSION_ID].version_type;		//changed by @Ramya for Jira id - IRI-5651
	    				}else{
	    							list.VERSION_TYPE = list.VERSION_ID == 1001 ?"Creation Of Review": "Reviewer Signature";
	    					}
	       });
    		
    		rptHist.reportHisList = res;
    		
    		
    		console.log(rptHist.reportHisList);
    		
    	});
    	function getReportVersion(a){
    		
    		a= a.toString();
    		
    		return a.split('')[a.split('').length-1];
    	}
    	
    	
    	
    	function reportDownload(version_id,auditSeqNo,companyId,fileName){
    		
    	console.log(scope);
    		blockUI.start("Preparing Report");
    		
    		auditFactory.getReportBlobData(version_id,auditSeqNo,companyId).$promise.then(function(tempResp){
    			
    			var dmlcFinding=[];		
    		    if(tempResp.dmlcFinding){
    			    tempResp.dmlcFinding.forEach(function(finding){
    					if(finding.findingDetail[finding.findingDetail.length-1].nextActionId !=1010 || finding.findingDetail[finding.findingDetail.length-1].currentAuditSeq == rptHist.auditSeqNo)
    						dmlcFinding.push(finding);
    				});
    		    }else
    		    	dmlcFinding = [];
    		  
    			
    //var dmlcFinding = '';			
    console.log("tempResp",tempResp);		
    			
	tempResp.auditDtls.previousFinding = tempResp.previousFinding;
	
	//dmlcFinding = tempResp.dmlcFinding ? tempResp.dmlcFinding:'';
	
	tempResp = tempResp.auditDtls;
    		
	tempResp.auditAuditorDetail.forEach(function(a){
				
				if(a.audSignature && a.audSignature != ''){

    				a.audSignature = a.audSignature != '' ?  atob(a.audSignature):'';
				}
			});
			
			rptHist.signatureonLoad = tempResp.auditAuditorDetail;
			
			
    		
    		auditFactory.getReportBlobData(version_id,auditSeqNo,companyId).$promise.then(function(resp){
    			
    			console.log(scope);
                resp.auditDtls.previousFinding = resp.previousFinding;

                resp = resp.auditDtls;
    			console.log(resp);
    			console.log(resp.docExpiry);
    			

    			scope.duplicateNarrativeSummary = (resp.narrativeSummary !='' && resp.narrativeSummary != undefined) ? decodeURIComponent(atob(resp.narrativeSummary)):'';
        		
    			scope.duplicateNarrativeSummary = scope.duplicateNarrativeSummary.replace(/o:p/gi,'p');
    			
        		var leadSign = _(resp.auditAuditorDetail).chain().where({'audLeadStatus':1,'auditRoleID':1001}).pluck('audSignature').toString();
        		
        		var revSign = _(resp.auditAuditorDetail).chain().where({'audLeadStatus':0,'auditRoleID':1003}).pluck('audSignature').toString();
        		
        		/**added by archana for jira id-IRI-4776 start */
        		
        		if(resp.auditTypeId != 1006){
					if(fileName.indexOf('_Prelim')<=0 && leadSign && revSign){
						console.log("No");
						rptHist.checkPrelimAudit = 'No';
					
					}else{
						
						console.log("Yes");
						rptHist.checkPrelimAudit = 'Yes';
						
					}
				}else{
					if(fileName.indexOf('_Prelim')<=0){
						console.log("No");
						rptHist.checkPrelimAudit = 'No';
					
					}else{
						
						console.log("Yes");
						rptHist.checkPrelimAudit = 'Yes';
						
					}
				}
				/**added by archana for jira id-IRI-4776 end */
        		if(resp.docIssuer == undefined || resp.docIssuer =='' || !resp.docIssuer){
        			
        			resp.docIssuer = _(scope.companyDetails).chain().where({'companyImoNo':resp.companyImoNo}).pluck('docIssuer').toString();
        		}
        		
        		resp.auditFinding.forEach(function(findingsArray,index){
        			
        			
        			if(Number(_(findingsArray.findingDetail).chain().where({'currentAuditSeq':Number(600000)}).pluck('currentAuditSeq').toString()) === Number(600000)){
        				
        				rptHist.carUpdateCheck = true;
        			}
        			
        		});
        	
        	
        	
        	//var cmpnyNme = scope.auditDetail.customerName ? scope.latestVesselDetail[0].customerName : scope.cmpnyNme;
        	
        	var cmpnyAdrs = resp.companyAddressAud ? resp.companyAddressAud  : scope.auditDetail.companyAddressAud;
        	
        	
        	var respData = resp;
        	
        	respData.auditDate = scope.auditDetail.auditDate ?  moment(scope.auditDetail.auditDate, 'DD-MMM-YYYY').format(YYYYMMDD) : respData.auditDate;
         	
        	respData.certExpireDate = scope.auditDetail.certExpireDate  ? moment(scope.auditDetail.certExpireDate, 'DD-MMM-YYYY').format(YYYYMMDD): respData.certExpireDate;
         	
        	respData.certIssueDate = scope.auditDetail.certIssueDate ? moment(scope.auditDetail.certIssueDate, 'DD-MMM-YYYY').format(YYYYMMDD) : respData.certIssueDate
         	
        	respData.certIssueId = scope.auditDetail.certIssueId ? scope.auditDetail.certIssueId : respData.certIssueId
         	
        	respData.certificateNo = scope.auditDetail.certificateNo ? scope.auditDetail.certificateNo : respData.certificateNo;
         	
        	respData.grt = scope.auditDetail.grt ? scope.auditDetail.grt : respData.grt;
        	
        	respData.auditPlace = scope.auditDetail.auditPlace ? btoa(encodeURIComponent(scope.auditDetail.auditPlace)) : respData.auditPlace;
        	
        	respData.ihmDocumentNo = '';
        	
        	respData.vesselName =  respData.vesselNameAud? respData.vesselNameAud : scope.auditDetail.vesselNameAud;
        	
        	respData.vesselType =  respData.vesselTypeAud ? respData.vesselTypeAud : scope.auditDetail.vesselTypeAud ;
        	if(scope.auditDetail.auditTypeId == scope.AppConstant.IHM_TYPE_ID){
        		
        		var cmpnyAdrs = scope.vesselCompanyDtl.companyAddress ? scope.vesselCompanyDtl.companyAddress  : respData.companyAddressAud;
        		
        		respData.vesselName =  scope.vesselDetail.vesselName? scope.vesselDetail.vesselName : respData.vesselNameAud;
        		
        		if(scope.AllIhmCertificateData && scope.AllIhmCertificateData.length >0){
        			
            		respData.ihmDocumentNo = scope.AllIhmCertificateData[0].ihmDocumentNo ?scope.AllIhmCertificateData[0].ihmDocumentNo :'N.A';
            		
            	}
        		else if(scope.auditDetail.certificateData.length >0){
        			
        			respData.ihmDocumentNo = scope.auditDetail.certificateData[0].ihmDocumentNo? scope.auditDetail.certificateData[0].ihmDocumentNo :'N.A';
        		}
        		
        	}
        	respData.operationCode = scope.vesselDetail.operationCode ? scope.vesselDetail.operationCode :'N.A';
        	console.log(resp.auditTypeId == 1006)
			/** added by archana for jira ID-IRI-5664 start*/
			resp.previousFinding = _.chain(resp.previousFinding)
					.sortBy('findingSeqNo')
					.sortBy('auditSeqNo')
					.value();
			/** added by archana for jira ID-IRI-5664 end*/
        	if(resp.auditTypeId == 1006){
        	var ReportData={
					'reportNo':resp.auditReportNo,
					'VesselType':respData.vesselTypeAud ? respData.vesselTypeAud : scope.auditDetail.vesselTypeAud ,
					'OfficialNo':resp.officialNoAud ? resp.officialNoAud : scope.auditDetail.officialNoAud,				//Changed by @Ramya on 6-7-2022 for jra id - IRI-5370 
					'dateOfReg':moment(resp.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY'),
					'Grt':scope.vesselDetail.grt ? scope.vesselDetail.grt :resp.grt,
					'CompanyImoNo':(scope.vesselCompanyDtl && scope.vesselCompanyDtl.companyImoNo ) ? scope.vesselCompanyDtl.companyImoNo : resp.companyImoNo,
					'DocTypeNo': scope.vesselCompanyDtl.docType ? scope.vesselCompanyDtl.docType : resp.companyDoc+' '+resp.docTypeNumber,
					'DocIssuer': (scope.vesselCompanyDtl && scope.vesselCompanyDtl.docIssuer ) ? scope.vesselCompanyDtl.docIssuer :  resp.docIssuer,
					'DocExpiry': moment(resp.docExpiry,'YYYY-MM-DD h:mm:ss a').format('DD-MMM-YYYY'),
					'CompanyAddress':cmpnyAdrs,
					'AuditSubTypeId':_(scope.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(resp.auditSubTypeId)}).pluck('auditSubtypeDesc').toString(),
					'AuditStatus':_(scope.auditStatusOptions).chain().where({'auditStatusId':Number(resp.auditStatusId)}).pluck('auditStatusDesc').toString(),
					'CertificateIssued':_(scope.certificateIssuedOptions).chain().where({'certificateIssueId':Number(resp.certIssueId)}).pluck('certificateIssueDesc').toString(),
					'AuditSummary':_(scope.auditSummary).chain().where({'audSummaryId':Number(resp.auditSummaryId)}).pluck('audSummaryDesc').toString(),
					'CurVesData':respData,
					'StatusOptions':scope.obsStatusOptions,
					'CategoryOptions':scope.obsCategoryOptions,
					'AuditCode':scope.auditCodeArray,
					'PreviousDetails':resp.previousFinding,
					'AuditorArray':scope.audArrayObserverUnQualified,
					'prelimAudit':rptHist.checkPrelimAudit,
					'carUpdateCheck':rptHist.carUpdateCheck,
					'dmlcFinding':dmlcFinding,
					'narrativeSummary':scope.duplicateNarrativeSummary,
					'ihmDocumentNo':respData.ihmDocumentNo,
					'OperationCode':respData.operationCode
			}
        }else{
    		var ReportData={
					'reportNo':resp.auditReportNo,
					'VesselType':respData.vesselTypeAud ? respData.vesselTypeAud : scope.auditDetail.vesselTypeAud ,
					'OfficialNo':resp.officialNoAud ? resp.officialNoAud : scope.auditDetail.officialNoAud,				//Changed by @Ramya on 6-7-2022 for jra id - IRI-5370 
					'dateOfReg':moment(resp.dateOfRegistry,'YYYY-MM-DD').format('DD-MMM-YYYY'),
					'Grt':scope.vesselDetail.grt ? scope.vesselDetail.grt :resp.grt,
					'CompanyImoNo':(scope.vesselCompanyDtl && scope.vesselCompanyDtl.companyImoNo ) ? scope.vesselCompanyDtl.companyImoNo : resp.companyImoNo,
					'DocTypeNo': scope.vesselCompanyDtl.docType ? scope.vesselCompanyDtl.docType : resp.companyDoc+' '+resp.docTypeNumber,
					'DocIssuer': (scope.vesselCompanyDtl && scope.vesselCompanyDtl.docIssuer ) ? scope.vesselCompanyDtl.docIssuer :  resp.docIssuer,
					'DocExpiry': moment(resp.docExpiry,'YYYY-MM-DD h:mm:ss a').format('DD-MMM-YYYY'),
					'CompanyAddress':cmpnyAdrs,
					'AuditSubTypeId':_(scope.auditSubTypeOptions).chain().where({'auditSubtypeId':Number(resp.auditSubTypeId)}).pluck('auditSubtypeDesc').toString(),
					'AuditStatus':_(scope.auditStatusOptions).chain().where({'auditStatusId':Number(resp.auditStatusId)}).pluck('auditStatusDesc').toString(),
					'CertificateIssued':_(scope.certificateIssuedOptions).chain().where({'certificateIssueId':Number(resp.certIssueId)}).pluck('certificateIssueDesc').toString(),
					'AuditSummary':_(scope.auditSummary).chain().where({'audSummaryId':Number(resp.auditSummaryId)}).pluck('audSummaryDesc').toString(),
					'CurVesData':respData,
					'StatusOptions':scope.obsStatusOptions,
					'CategoryOptions':scope.obsCategoryOptions,
					'AuditCode':scope.auditCodeArray,
					'PreviousDetails':resp.previousFinding,
					'AuditorArray':scope.audObsNameArrayNoFilter,
					'prelimAudit':rptHist.checkPrelimAudit,
					'carUpdateCheck':rptHist.carUpdateCheck,
					'dmlcFinding':dmlcFinding,
					'narrativeSummary':scope.duplicateNarrativeSummary,
					'ihmDocumentNo':respData.ihmDocumentNo,
					'OperationCode':respData.operationCode
			}
        }
    		console.log("ReportData",ReportData);
    		
    			if (ReportData  && ReportData.PreviousDetails &&( ReportData.CurVesData.auditTypeId ==1001  || ReportData.CurVesData.auditTypeId ==1002 || ReportData.CurVesData.auditTypeId ==1003 ) && ReportData.PreviousDetails && ReportData.PreviousDetails.length && ReportData.PreviousDetails.length >0  ) {
    			ReportData.PreviousDetails = ReportData.PreviousDetails.filter(function( obj ) {
        			return obj.findingDetail.length>0 && obj.findingDetail[0].categoryId !=1004;
        	     });
			}
    			var reportdata=auditService.reportAuditGenerate(ReportData);
    			
			$timeout(function(){	
				pdfMake.createPdf(reportdata).download(fileName);
				
			blockUI.stop();
			toaster.success('Report downloaded successfully');
		},2000);
			 
			
    		});
    		});
    	}
    	
$scope.close = function(result) { 
    		
    		
    		close(result, 0);
			
			$('.modal-backdrop').remove();
		};
    	
    }
    
    
    function reasonController($scope,scope,close,detailsFactory,toaster,YYYYMMDD,AppConstant){
    	
    	var reason = this; console.log(scope);
 
    	reason.void = false;
    	
    	reason.halt = false; 
    	
    	reason.validate=validate;
    	
    	reason.save = save;
    	
    	reason.Reopen=false;
    	
    	
    	reason.AppConstant = AppConstant;
    	
    	reason.auditTypeId= (scope && scope.auditDetail && scope.auditDetail.auditTypeId ) ? scope.auditDetail.auditTypeId:'' ;
    	
    	 
    	  //console.log("publish st "+scope.auditDetail.certificateData[0].publishStatus)
    	
    	// reason.voiding=''true;
    	
    	reason.minDueDate = moment(new Date()).format(YYYYMMDD);
    
    	reason.reasonDesc=[{rasonValue:'Postponed '},{rasonValue:' Change of RO / RSO'},{rasonValue:'Training '},{rasonValue:'Database Error '},{rasonValue:'Other'}]; 
    	
    	reason.reasonReopenDesc=(scope.auditTypeId!=1004) ?[{rasonValue:'Certificate '},{rasonValue:'Findings'},{rasonValue:'Assessment Remarks '},{rasonValue:'Attachments'},{rasonValue:'Summary'},{rasonValue:'Report date'},{rasonValue:'Other'}]  :  [{rasonValue:'Certificate '},{rasonValue:'Assessment Remarks '},{rasonValue:'Attachments'},{rasonValue:'Summary'},{rasonValue:'Report date'},{rasonValue:'Other'}];
    	
    	reason.partialDataShow ='';
    	
    	reason.YetachCertificate = YetachCertificate;
    	
    	reason.checkPartialForYatchFlag = scope.checkPartialForYatchFlag ?  scope.checkPartialForYatchFlag :'';
    	
    	function YetachCertificate(){
    		
    	}
    	if(scope.partialMissingStatus){
    		
    		var msg = (scope.partialCount && scope.partialCount==1) ? 'is' :'are';
    		
    		reason.partialMissingStatus = scope.partialMissingStatus;
    		reason.partialDataShow = scope.partialMissingData;	
    		reason.partialDataShow = reason.partialDataShow +' '+msg +' Missing From Oracle DataBase  Please Contact ';
    		reason.partialDataShow = reason.partialDataShow.replace(',', '');
    		reason.partialTick = 1;
    	}
    	
    	if(scope.reasonValue == 'void'){
    		
    		reason.void = true;
    		
    	}else if(scope.reasonValue == 'halt'){
    		
    		reason.halt = true;
    		
    		if(scope.dueDateAlreadyCaptured){
    			reason.duedatecaptred = true;
    			toaster.warning('Due Date already captured to notify VESDOC department to enter missing fields.');
    			
    		}
    	}else if(scope.reasonValue== 'Reopen'){
    		reason.Reopen=true;
    	}
    	
    	function validate(){
    		 if(reason.voiding){ 
    			 
    			if((!reason.comment)||(reason.comment.length<10) ){
    				toaster.warning('Please Enter atleast 10 characters');
    				return false;
    				} 
    			
    			}else{
    				if(reason.voiding){
    				toaster.warning('please Select Reason');
    				return false; }
    			}
    		 
    		 if(reason.Reopen){ 
    			 if(!reason.Reopening){ 
            	    toaster.warning('please Select Reason');
            	    return false; 
            	    }else if((!reason.comment)||(reason.comment.length<10)){
            	    	
            	    	toaster.warning('Please Enter atleast 10 characters');
        				return false;
            	    	
            	    }
            			
    			 
    		 }
    		 return true; 
    	  
    	}
    	function save(){
    		if(validate()){
    		var mandatoryMsg = reason.void ? 'Please select void reason' :  reason.halt ? 'Please select due date' : '';
    		
    		
    		
    		if( (!reason.voiding && reason.void) || (!reason.haltDate && reason.halt) ){
    			
    			toaster.warning(mandatoryMsg);
    			
    		}else if(reason.Reopen){ 
    		
    		scope.auditDetail.auditStatusId=1005;
    		scope.auditDetail.voidReason=reason.comment ? reason.Reopening+'-'+reason.comment: '';
    		scope.auditReopnedStatus=true;
    		scope.AuditReopenEnableFields=true;
    		scope.auditReopen();
    		 close("result", 0);
				$('.modal-backdrop').remove();
    		
    		}else{
    			
    			if(reason.halt){
    			
    				var vData = {
    						'companyId':scope.companyId,
    						
    						'userId':scope.loginUserId,
    						
    						'vesselImoNo':scope.vesselDetail.vesselImoNo,
    						
    						'vesselId':scope.vesselDetail.vesselId,
    						
    						'dueDate':moment(reason.haltDate,'DD-MMM-YYYY').format('YYYY-MM-DD'),
    						
    						'auditTypeId': scope.auditTypeId?scope.auditTypeId:'',
    						
    						'status':0};
    				
    				if(reason.checkPartialForYatchFlag!=1){
    				detailsFactory.vesselDtlIncomplete(scope.loginUserId, scope.vesselDetail.vesselImoNo, scope.vesselDetail.vesselId,scope.companyId,vData).$promise.then(function(res) {
    					
    					if(res){
    						toaster.success('Due Date captured successfully. We will notify, once all the vessel details will be collected for   this vessel');
    						close("result", 0);
    						$('.modal-backdrop').remove();
    					}
    				});
    				}else { console.log(scope.yatchPartilaData); console.log(vData);
    				vData.vesselName =scope.yatchPartilaData.vesselName;
    				vData.vesselId =  scope.yatchPartilaData.vesselId;
    					detailsFactory.vesselDtlIncompleteYatch(scope.loginUserId, scope.yatchPartilaData.vesselName, scope.yatchPartilaData.vesselId,scope.companyId,vData).$promise.then(function(res) {
        					
        					if(res){
        						toaster.success('Due Date captured successfully. We will notify, once all the vessel details will be collected for   this vessel');
        						close("result", 0);
        						$('.modal-backdrop').remove();
        					}
        				});
    					
    				}
    				
    				
    			}else if(reason.void){
    				scope.disableSave =scope.disableSave?false:'';
    				scope.auditDetail.voidReason=reason.comment ? reason.voiding+'-'+reason.comment: ''; 
    				 if(scope.auditDetail.auditTypeId==reason.AppConstant.IHM_TYPE_ID){
    			       scope.auditDetail.ihmDishplayActive = true;
    				 }
    			    close("result", 0);
					$('.modal-backdrop').remove();
    			}
    		}
    	}else{}
    	}
    	$scope.close = function(result) { 
    		
    		if(result=='Cancel'){
    			if(scope.auditDetail.auditStatusId==1004){
    				
    			// toaster.warning('No Reason selected');
    			
    			scope.auditDetail.auditStatusId=scope.oldValue;  }
    			
    			if(scope.auditDetail.auditStatusId==1005){
    				scope.auditDetail.auditStatusId=scope.oldValue;  }
    		}
    		close(result, 0);
			/**Added by sudharsan for IRI-5214  
			 * Start here
			*/
			 if(!scope.auditDetail.lockStatus && scope.auditDetail.auditStatusId==1002 &&  sessionStorage.getItem("userRoleId")==AppConstant.MANAGER_ROLE_ID || AppConstant.ADMIN_ROLE_ID){
			 	$('#narrative').summernote('disable');
			 }			
			 /**End here */	
			$('.modal-backdrop').remove();
		};
    }
    
    function AuditController(){
    	
    	var aud = this;
    	
    }
    
    function tcApprovalController(detailsFactory,toaster,scope,leadId,vesselImoNum,vesselName,companyImono,doctypeno,companyId,MMMDDYYYY){
    	
    	var reason = this;
    	
    	reason.content = 'Tc Approval Status';
    	
    	reason.halt = true;
    	reason.leadId=leadId;
    	reason.vesselImoNum=vesselImoNum;
    	reason.vesselName=vesselName;
    	reason.companyImono=companyImono;
    	reason.doctypeno=doctypeno;
    	reason.companyId=companyId;
    
    	reason.save=function(){
    		var VesselApprovalDetails = {
				"vesselImoNo" :reason.vesselImoNum,
				"vesselName" :reason.vesselName,
				"companyImoNo" :reason.companyImono ,
				"docTypeNumber" :reason.doctypeno ,
				"companyId" : reason.companyId,
				"auditDueDate" : reason.dueDate,
				"leadSequenceNumber":reason.leadId,
				"tcApprovalStatus":0,
				"userIns":"BSOL",
				"dateIns" :moment(moment(reason.haltDate).format(MMMDDYYYY), MMMDDYYYY)
			};

    	detailsFactory.tcDetails(VesselApprovalDetails).$promise
		.then(function(res) {
			if(res){
				toaster.success('TC Approval Details are updated');
				close(res, 0);
				$('.modal-backdrop').remove();
				
			}
			
		});
    }
    	
    }
    
/*
 * function
 * certificateHistoryController(scope,$scope,auditFactory,detailsFactory,CERTI_URL,blockUI,toaster,AppConstant,MMMDDYYYY,auditService,$timeout,$sce){
 * var certHist = this;
 * 
 * certHist.qrCodeData ='';
 * 
 * certHist.viewCertificate = viewCertificate;
 * 
 * certHist.AppConstant = AppConstant;
 * 
 * console.log(scope); viewCertificate();
 * 
 * 
 * function viewCertificate(){
 * 
 * 
 * auditFactory.qrCodeGenerator(CERTI_URL+scope.companyId+'/'+scope.utn).$promise.then(function(response){
 * 
 * certHist.qrCodeData= response.data;
 * 
 * if(scope.certificateNo){
 * 
 * var intermediate = [], additional= [], newCertificate=[], renewalEndorse2 =
 * [],extension =[];
 * 
 * var doc = new jsPDF('p', 'mm', 'a4');
 * 
 * detailsFactory.getAuditCertificateData(scope.vesselImoNo,scope.companyId,scope.certificateNo,scope.auditTypeId).$promise.then(function(result){
 * 
 * console.log(result); result.forEach(function(a){
 * 
 * a.certExpireDate = a.certExpireDate ? moment( new
 * Date(a.certExpireDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.certIssueDate = a.certIssueDate ? moment(new
 * Date(a.certIssueDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.auditDate = a.auditDate ? moment(new
 * Date(a.auditDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.dateOfRegistry = a.dateOfRegistry ? moment(new
 * Date(a.dateOfRegistry),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.issuerSignDate = a.issuerSignDate ? moment(new
 * Date(a.issuerSignDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.extendedIssueDate = a.extendedIssueDate ? moment(new
 * Date(a.extendedIssueDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.extendedExpireDate = a.extendedExpireDate ? moment(new
 * Date(a.extendedExpireDate),'YYYY-MM-DD').format('DD MMMM YYYY') : '';
 * 
 * a.issuerSign = atob(a.issuerSign);
 * 
 * 
 * if(a.certIssueId == 1003 || a.certIssueId == 1006){
 * 
 * certHist.extensionSign = "data:image/png;base64,"+a.issuerSign;
 * 
 * extension.push(a);
 * 
 * }else if(a.certIssueId == 1007){
 * 
 * certHist.newRenewalEndorse2Sign = "data:image/png;base64,"+a.issuerSign;
 * 
 * renewalEndorse2.push(a);
 * 
 * 
 * }else if( a.auditSubTypeId== certHist.AppConstant.INITIAL_SUB_TYPE_ID ||
 * a.auditSubTypeId == certHist.AppConstant.RENEWAL_SUB_TYPE_ID
 * ||a.auditSubTypeId == certHist.AppConstant.INTERIM_SUB_TYPE_ID){
 * 
 * certHist.newCertificateSign = "data:image/png;base64,"+a.issuerSign;
 * 
 * newCertificate.push(a);
 * 
 * console.log(certHist.newCertificateSign);
 * 
 * }else if(a.auditSubTypeId == certHist.AppConstant.INTERMEDIATE_SUB_TYPE_ID){
 * 
 * console.log(a);
 * 
 * intermediate.push(a);
 * 
 * certHist.intermediateSign = "data:image/png;base64,"+a.issuerSign;
 * 
 * }else if(a.auditSubTypeId == certHist.AppConstant.ADDITIONAL_SUB_TYPE_ID){
 * 
 * a[9] = a.issuerSign;
 * 
 * additional.push(a); } });
 * 
 * certHist.signature = result;
 * 
 * var certificateDatas={
 * 
 * 'certificateNo' :newCertificate[0].certificateNo, 'AuditTypeId'
 * :newCertificate[0].auditTypeId, 'vesselName' :newCertificate[0].vesselName,
 * 'officialNo' :newCertificate[0].officialNo, 'distinletter'
 * :newCertificate[0].officialNo, 'vesselImoNo' :newCertificate[0].vesselImoNo,
 * 'CompanyId' :newCertificate[0].companyId, 'AuditSeqNo'
 * :newCertificate[0].auditSeqNo, 'UserIns' :'BSOL', 'DateIns' :moment(new
 * Date()).format(MMMDDYYYY), 'portofreg' :newCertificate[0].portOfRegistry,
 * 'shiptype' :newCertificate[0].vesselType, 'grt' :newCertificate[0].grt,
 * 'companyaddress':newCertificate[0].vesselCompanyAddress, 'companyname'
 * :newCertificate[0].vesselCompanyName, 'companyimono'
 * :newCertificate[0].companyImoNo, 'expirydate' :(newCertificate[0].certIssueId ==
 * 1008) ? newCertificate[0].extendedExpireDate :
 * newCertificate[0].certExpireDate, 'auditplace' :newCertificate[0].auditPlace,
 * 'certissuedate' :(newCertificate[0].certIssueId == 1008) ?
 * newCertificate[0].extendedIssueDate : newCertificate[0].certIssueDate,
 * 'auditSubTypeId':newCertificate[0].auditSubTypeId, 'AuditDate'
 * :newCertificate[0].auditDate, 'auditDate' :newCertificate[0].auditDate,
 * 'LeadAuditorSign':newCertificate[0].issuerSign, 'headSubTitleism' :'Issued
 * under the provisions of the International Convention for the Safety',
 * 'headSubTitleism1':'of Life at Sea, 1974(SOLAS), as amended', 'certify':'THIS
 * IS TO CERTIFY THAT', 'res':newCertificate[0], 'intermediate':intermediate,
 * 'additional':additional, 'LeadAuditorName':newCertificate[0].issuerName,
 * 'headSubTitleisps':'Issued under the provisions of the International Code for
 * the Security', 'headSubTitleisps1':'of Ships and of Port Facilities (ISPS
 * Code)', //
 * 'previousexpirydate':moment(certHist.previousAudit.certExpireDate,'YYYY-MM-DD').format('DD-MMM-YYYY'),
 * 'headSubTitlemlc':'Issued under the provisions of Article V and Title 5 of
 * the Maritime Labour Convention, 2006', 'HeadSubTitle':'(Note: This
 * Certificate shall have a Declaration of Maritime Labour Compliance
 * attached.)', 'headSubTitle2':"(referred to below as the â€œConventionâ€)",
 * 'signaturetext' :'Signature of the Duly Authorized Official Issuing the
 * Certificate.', 'sealcontent' :'(Seal or stamp of issuing authority, as
 * appropriate)', 'certificateVer':newCertificate[0].certificateVer,
 * 'utn':newCertificate[0].utn, 'intermediateIssue':(intermediate.length >
 * 0)?intermediate[0].certIssueDate:'',
 * 'intermediateExpiry':(intermediate.length >
 * 0)?intermediate[0].certExpireDate:'',
 * 'intermediatePlace':(intermediate.length > 0)?intermediate[0].auditPlace:'',
 * 'intermediateLeadSign': (intermediate.length >
 * 0)?intermediate[0].issuerSign:'', 'interSignDate': (intermediate.length >
 * 0)?intermediate[0].issuerSignDate:'', 'qrCodeData' : response.data,
 * 'dateOfReg': newCertificate[0].dateOfRegistry,
 * 'renewalEndorse2':renewalEndorse2, 'extension':extension,
 * 'seal':newCertificate[0].seal, 'title':newCertificate[0].title }
 * console.log(certificateDatas);
 * 
 * 
 * 
 * var certificate = auditService.pdfService(certificateDatas);
 * 
 * 
 * if(certificate.length > 0) {
 * 
 * for(var i=0;i<certificate.length;i++){
 * 
 * var decrypt = window.atob(window.btoa(certificate[i]));
 * 
 * doc.addImage(decrypt, 'PNG', 0, 0
 * ,doc.internal.pageSize.width,doc.internal.pageSize.height,"'NewCertificate"+i+"'",'FAST');
 * 
 * if((certificate.length - 1) != i ) { doc.addPage(); } } }
 * 
 * var file = doc.output('blob');
 * 
 * var assesUrl ='';
 * 
 * downloadFiles(new Blob([file], {type :
 * 'application/pdf'}),certificateDatas.certificateNo,assesUrl);
 * 
 * });
 * 
 * toaster.success('Certificate data updated successfully'); blockUI.stop();
 * }else{ blockUI.stop(); }
 * 
 * }); }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * function downloadFiles(blob, fileName,assesUrl) {
 * 
 * if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For IE:
 * 
 * window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
 * 
 * var link = document.createElement('a'); link.href =
 * window.URL.createObjectURL(blob); certHist.CertificateBaseData =
 * $sce.trustAsResourceUrl(link.href); } else { var link =
 * document.createElement('a'); link.style = "display: none"; link.href =
 * window.URL.createObjectURL(blob); document.body.appendChild(link);
 * certHist.CertificateBaseData = $sce.trustAsResourceUrl(link.href); } }
 * 
 * 
 * $scope.trustUrl = function(val){
 * 
 * return $sce.trustAsResourceUrl(val); }
 * 
 * 
 * 
 * 
 * 
 * $scope.close = function(result) {
 * 
 * close(result, 0);
 * 
 * $('.modal-backdrop').remove(); }; }
 */
    
    
    
    function warningController(data,close){
    	
    	var warn = this;
    	
    	warn.message = data;
    	
    	(warn.message == 'Please Enter Correct Date')?(warn.dateWarn = true):(warn.dateWarn = false);
    	    	
    	warn.close = function(result) {
    		
			close(result);
			
			$('.modal-backdrop').remove();
		};
    	
    }
    

    //*** vessel history details ***///
    
    function vesselHistoryDetailsPopupController(data,data2,close,$scope){
    	
       	var vesselHistoryPopup = this;
    	vesselHistoryPopup.vesselArray = data2;
       	vesselHistoryPopup.vesselHistory = data;
       	console.log(vesselHistoryPopup.vesselArray)
       	$scope.close = function(result) {
       		
       		close(result,0);
       		
			$('.modal-backdrop').remove();
		};
       	
       }
    
    
    
    	//**** end *****///
    
    
    
    function okModalController(data,close){
    	
    	var okMod = this;
    	okMod.message = data;  	
    	okMod.close = function(result) {
			console.log(result)
			$('.modal-backdrop').remove();
		};
    	
    }
    
    function warningControllerCompletion(data,close){
    	
    	var warn = this;
    	
    	warn.message = data;
    	
    	warn.dateWarn = true;
    	    	
    	warn.close = function(result) {
    		
			close(result);
			
			$('.modal-backdrop').remove();
		};
    	
    }
 
   
    
    
    
    
    /** *** FINDING FILE PREVIEW CONTROLLER **** */    
    function findingFilePreviewController($cookies,$sce,auditFactory,$scope,fileData,close,BASE_URL,$timeout){
    	
    	var fPrv = this;
    	
    	fPrv.close = function(val){ 
    		
    		close(val, 0);   
    		
    		$('.modal-backdrop').remove();
    	}

    	var companyId = sessionStorage.getItem("companyId");
    	
    	var file, fileURL;
    	        
        var fileExtension = fileData.fileName.split('.').pop(); 
         
        auditFactory.downloadFindingFile(fileData.audSeqNo,fileData.findNo,fileData.fileName,fileData.findSeqNo,fileData.auditTypeId,companyId).$promise.then(function(res){
    		 
        	if(res.status == 200 && res.data.byteLength){
    			
        		file = new Blob([res.data], {type : res.headersGetter('content-type')});
				
        		fileURL = URL.createObjectURL(file);
	     	   	
        		var authToken = sessionStorage.getItem('authToken');
        		
	    		//var val = BASE_URL+"audit/ism/getFindingStatusAttach/"+ fileData.audSeqNo +"/"+ fileData.findNo +"/"+ fileData.fileName +"/"+ fileData.findSeqNo +"/"+ fileData.auditTypeId +"/"+companyId+'?access_token='+authToken.substring(1,authToken.length-1);
	     	 
        		//fPrv.content =  $sce.trustAsResourceUrl(val);
        		
        		var link = document.createElement('a');
     	        link.href = window.URL.createObjectURL(file);
     	        fPrv.content = $sce.trustAsResourceUrl(link.href);
	     	    
        	}else if(fileData.byteArray){
		    	
        		var bytes = new Uint8Array(fileData.byteArray.length);
        		
        		for (var i = 0; i < fileData.byteArray.length ; i++){
        			bytes[i] = fileData.byteArray.charCodeAt(i);
        		}
		    	   
        		file = new Blob([bytes.buffer], {type : res.headersGetter('content-type')});
        		
        		fileURL = URL.createObjectURL(file);
			         
        		fPrv.content = $sce.trustAsResourceUrl(fileURL);
			        	    		 
        	}
    		
        	fPrv.trustUrl = function(){
        		
        		var authToken = sessionStorage.getItem('authToken');
    			var val = BASE_URL+"audit/ism/getFindingStatusAttach/"+ fileData.audSeqNo +"/"+ fileData.findNo +"/"+ fileData.fileName +"/"+ fileData.findSeqNo +"/"+ fileData.auditTypeId +"/"+companyId;
        	
    			val = val+'?access_token='+authToken.substring(1,authToken.length-1);
    			return $sce.trustAsResourceUrl(val);
        	}
    		
        	if(fileExtension == 'xlsx' || fileExtension == 'docx' || fileExtension == 'xls' || fileExtension == 'doc'){
        		
        		$timeout(function(){
        			fPrv.close('Cancel');
        		},0);
        		    		
        	}    		
    	});
        
    	/** *** END OF FINDING FILE PREVIEW CONTROLLER **** */
    }
    
    function historyController($scope,close,data,masterFactory,$cookies,$q,DTOptionsBuilder,DTColumnBuilder,$timeout,$compile){
    	
    	var his 				= this;
    	
    	var companyId 			= sessionStorage.getItem("companyId");
    	
    	his.dtInstance 			= {};
    	
    	his.pagination 			= {};
    	
    	his.searchData 			= {};
    	
    	his.showBlock 			= false;
    	
    	his.pageTitle			= data.title
    	
    	his.close = function(result) {  
    		
    		close(result,0);
    		
			$('.modal-backdrop').remove();
		};
		
		his.search = function(pageNo){
			
			var hisSearch = '', hisSearchResult = '';
			
			if(data.history == "IMO"){
				
				hisSearch 		= masterFactory.getCompanyImoSearch;
				
				hisSearchResult	= masterFactory.getCompanyImoResult;
				
			}else if(data.history == "DOC"){
				
				hisSearch 		= masterFactory.getDocSearch;
				
				hisSearchResult	= masterFactory.getDocResult;
			}
			
			hisSearch(data.imoNo,companyId).$promise.then(function(res){
				
				his.pagination.totalPages = Math.ceil(Number(res.data) / 5);    
    			
    			if(his.pagination.totalPages == 0){
    				
    				his.pagination.current = 0;
    				
    			}else{
    				
    				his.pagination.current = pageNo+1;
    			}
    			
    			his.pagination.last = his.pagination.totalPages;
    			
    			his.showBlock = false;
    			
    			his.paginationn = false;
    			
    			hisSearchResult(data.imoNo,companyId,(Number(pageNo)*5)).$promise.then(function(result){ 
            		
    				his.setDataTableData(result);
        		});
				
			});
			
		}
		
		his.search(0);
		
		his.setDataTableData = function(result){
       		
			var defer = $q.defer();
			
			defer.resolve(result);  
			
			his.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)
			
        	.withDOM('<<"tableinside"t><"clearfix">i>')	.withOption('deferRender', true)
        	
            .withOption('scrollY', 350)            
                        
            .withOption('createdRow', function (row, dataa, dataIndex) {
            	
            	$compile(angular.element(row).contents())($scope);
            	
            });
			
			(data.history == "IMO")?his.dtColumns = [                    
			               			                	 
			                	 DTColumnBuilder.newColumn(null).withTitle('IMO No').renderWith(function(res){        	                    	
				                	 return res.vesselImoNo;	      	                    	        	                    	        	                    	 
				                 }),
	        	                    
				                 DTColumnBuilder.newColumn('vesselName').withTitle('Vessel Name').renderWith(function(res){if(!res){return '-'}else{
				                	 return res;
				                 }}),
				                 
				                 DTColumnBuilder.newColumn('companyImoNo').withTitle('Company IMO No').renderWith(function(res){if(!res){return '-'}else{
				                	 return res;
				                 }}),
				                 
				                 DTColumnBuilder.newColumn('userIns').withTitle('User ').renderWith(function(res){if(!res){return '-'}else{
				                	 return res;
				                 }}),
	                        		
				                 DTColumnBuilder.newColumn('dateIns').withTitle('Date ').renderWith(function(res){if(!res){return '-'}else{
				                	 return moment(res).format("DD-MMM-YYYY");
				                 }})
			                				                	 
			                 ]:his.dtColumns = [
			                                    DTColumnBuilder.newColumn('companyImoNo').withTitle('Company IMO No').renderWith(function(res){if(!res){return '-'}else{
			                                    	return res;
			                                    }}),

			                                    DTColumnBuilder.newColumn('companyName').withTitle('Company Name').renderWith(function(res){if(!res){return '-'}else{
			                                    	return res;
			                                    }}),
                        		
			                                    DTColumnBuilder.newColumn('docTypeNo').withTitle('DOC Type No').renderWith(function(res){if(!res){return '-'}else{
			                                    	return res;
			                                    }}),

			                                    DTColumnBuilder.newColumn('docIssuer').withTitle('DOC Issuer').renderWith(function(res){if(!res){return '-'}else{
			                                    	return res;
			                                    }}),

			                                    DTColumnBuilder.newColumn('docExpiry').withTitle('DOC Expiry').renderWith(function(res){if(!res){return '-'}else{
			                                    	return moment(res,"DD-MM-YY").format("DD-MMM-YYYY");
			                                    }}),

			                                    DTColumnBuilder.newColumn('userIns').withTitle('User ').renderWith(function(res){if(!res){return '-'}else{
			                                    	return res;
			                                    }}),
	
			                                    DTColumnBuilder.newColumn('dateIns').withTitle('Date ').renderWith(function(res){if(!res){return '-'}else{
			                                    	return moment(res).format("DD-MMM-YYYY");
			                                    }})
			                                    ];	 
			
			his.showBlock = true;
			
			$timeout(function() {
				his.paginationn = true;
			},0);
        	    	
		}
		
		his.range = function(len){
    		
    		var count = [];
    		
    		for (var i = 1; i <= len; i++) {
    			
    			count.push(i);    			
    		}
    		
    		return count;    		
    	}
    	
    }
    
    function AuditorDetailController(scope,AppConstant,close, $scope, toaster,$timeout,$cookies,$rootScope,MMMDDYYYY){
    	
    	var auditor 				= this;
    	
    	auditor.AppConstant 		= AppConstant; 
		
    	auditor.lockStatus 			= scope.auditDetail.lockStatus;
    	
    	auditor.reviewStatus		= scope.auditDetail.reviewStatus;
    	
    	auditor.auditStatusId 		= scope.auditDetail.auditStatusId;
    	
    	auditor.audObsTypeOptions 	= scope.audObsType;
    	
    	auditor.useRoleId 			= scope.userRoleId;
    	
    	auditor.auditTypeId 		= scope.auditTypeId;		
    	
    	auditor.audObsNameArray 	= scope.audObsNameArray; 	
    	
    	auditor.audObsNameArrayCopy = scope.audObsNameArrayCopy;
		
		auditor.auditAuditorDetail	= angular.copy(scope.auditDetail.auditAuditorDetail);
		
		auditor.setAudObsId 		= setAudObsId;
				
		auditor.removeItem 			= removeItem;
		
		auditor.save 				= save;
		
		auditor.validCheck 			= validCheck;
		
		auditor.checkReviewer 		= checkReviewer;
		
		auditor.setOldId			= setOldId;
		
		auditor.oldUserId			= '';
		
		auditor.oldSignature		= '';
		
		auditor.checkLead = checkLead ;
		
		auditor.loginUserId = scope.loginUserId;
		
		auditor.leadSign = scope.leadSign;
		
		auditor.notLead = scope.notLead; 
		
		auditor.orgLead=''; auditor.currLead='';  
		
		auditor.certGenrateStatus = false; 
		
		auditor.userRoleId = sessionStorage.getItem('userRoleId');
		
		auditor.reviwerSign = false;
		
		auditor.reviwerLogged = false;
		
		auditor.managerOrAdminChangeLead=scope.managerOrAdminChangeLead
		
		auditor.additionalAuditoorsSign=false;
		
		auditor.auditorAndReviwerNameArray=[];
		
		auditor.observerNameArray= scope.audArrayObserverUnQualified ? scope.audArrayObserverUnQualified : [];
		
		auditor.auditorAndReviwerNameArrayCopy=[];
		 
		auditor.managerCreatingAudit =  scope.managerCreatingAudit; 
		
		auditor.managerCreatingAudit = scope.managerCreatingAudit;
		
		auditor.ltrStatus='';
		
		auditor.orgLeadDb= scope.leadEmail;
		
		auditor.carUpdateStatus = scope.carUpdateStatus ? scope.carUpdateStatus : false;
		
		if(auditor.observerNameArray && auditor.observerNameArray.length>0){
			auditor.observerNameArray = auditor.observerNameArray.filter(function(obj){
			return( obj.roles && obj.roles[0] &&  (obj.roles[0].roleId==1001 || obj.roles[0].roleId==1004))
			});
			}
		
		if(scope.auditDetail.sspReviewDetail.length && scope.auditDetail.sspReviewDetail.length >0 && (scope.auditTypeId==scope.AppConstant.DMLC_TYPE_ID || scope.auditTypeId==scope.AppConstant.SSP_TYPE_ID ||(scope.auditTypeId>=scope.AppConstant.SOPEP_TYPE_ID && scope.auditTypeId<=scope.AppConstant.COW_TYPE_ID)))
		{
			auditor.ltrStatus = (scope.auditDetail.sspReviewDetail[0].ltrStatus && scope.auditDetail.sspReviewDetail[0].ltrStatus==1)?true:'';
		}
		
		// removing reviewer name from Add Reviewer modal dropdown when type of
		// the audit is IHM
		if(auditor.auditTypeId == auditor.AppConstant.IHM_TYPE_ID )
		{
			auditor.audObsTypeOptions = auditor.audObsTypeOptions.filter(function(item) {
		    return item.auditRoleId !== AppConstant.AUDIT_REVIEWER_ROLE_ID
			})
			
			auditor.audObsTypeOptions = auditor.audObsTypeOptions.filter(function(item) {
				if(item.auditRoleId==AppConstant.AUDITOR_ROLE_ID){
					item.auditRoleDesc="REVIEWER";
				}
				
		    return item.auditRoleId!=AppConstant.AUDIT_REVIEWER_ROLE_ID ;
			})
			auditor.audObsTypeOptionsIhmObser =  scope.audObsType.filter(function(item) {
		    return item.auditRoleId ==1002;
			})
		}
		
		auditor.auditAuditorDetail.forEach(function(index){
			
			if(index.audLeadStatus==1){
				auditor.orgLead = index.userId; 
				auditor.currLead =  index.userId;
			  }
			if(index.auditRoleID==1003 && index.audSignature){
				auditor.reviwerSign=true; 
			}
			if(index.auditRoleID==1003 && index.userId==auditor.loginUserId){
				auditor.reviwerLogged=true;
			}
			if(index.audLeadStatus==0 && index.auditRoleID==1001 && index.audSignature ){
				
				auditor.additionalAuditoorsSign=true;
			}
		});
		
		
		
		auditor.audObsNameArray.forEach(function(index){
		if(auditor.auditTypeId != auditor.AppConstant.IHM_TYPE_ID){ 
		 if(index.roles[0].roleId==1004){   
		    auditor.observerNameArray.push(index);
		       }else if(index.roles[0].roleId==1001){
		    	   
		    	   auditor.auditorAndReviwerNameArray.push(index);   
		       }
		       
		     }else if(auditor.auditTypeId == auditor.AppConstant.IHM_TYPE_ID){
		     if(index.roles[0].roleId==1004 && index.ihmreview==1){
		         auditor.observerNameArray.push(index);
				}
				 if(index.roles[0].roleId==1001  && index.ihmreview==1){ 
		    	   auditor.auditorAndReviwerNameArray.push(index); 
		       }
		     
		     }  
		  });
		
     
		auditor.audObsNameArrayCopy.forEach(function(index){
			//added by @Ramya for TICKET-673
			var found = false;
			for(var i = 0; i < auditor.observerNameArray.length; i++) {
   				 if (auditor.observerNameArray[i].sequenceNo == index.sequenceNo) {
       				 found = true;
        				break;
					}
			}
		    if(index.roles[0].roleId==1004 && !found){   
		    auditor.audObsNameArrayCopy.push(index);
		       }else if(index.roles[0].roleId==1001){
		    	   
		    	   auditor.auditorAndReviwerNameArrayCopy.push(index);   
		       }
		  });
		
		
		if(scope.auditDetail.certificateDetail && scope.auditDetail.certificateDetail.length>0){
			auditor.certGenrateStatus = true;
		}
		
		function checkLead(index){
		
			auditor.auditAuditorDetail.forEach(function(index){ 
				if(index.audLeadStatus==1){
					index.audLeadStatus=0;
				  } 
				if(index.auditRoleID==1001 && index.audLeadStatus==0){ 
					 index.auditRoleDesc=(scope.auditTypeId==auditor.AppConstant.MLC_TYPE_ID || scope.auditTypeId==auditor.AppConstant.DMLC_TYPE_ID)?auditor.AppConstant.INSPECTOR:auditor.AppConstant.AUDITOR;
				}
		});
			// auditor.notLead = false;
		
		    auditor.auditAuditorDetail[index].auditRoleDesc=(scope.auditTypeId==auditor.AppConstant.MLC_TYPE_ID || scope.auditTypeId==auditor.AppConstant.DMLC_TYPE_ID)?'LEAD '+auditor.AppConstant.INSPECTOR:'LEAD '+auditor.AppConstant.AUDITOR;
			auditor.auditAuditorDetail[index].audLeadStatus=1; 
			
			auditor.currLead = auditor.auditAuditorDetail[index].userId;
			if(auditor.orgLead!=auditor.auditAuditorDetail[index].userId){
			scope.notLead = false ;
			toaster.warning("Lead has been changed please save details");
			
			scope.managerChangingLeadFlag = true; 
			
			if(auditor.userRoleId==1003 || auditor.userRoleId==1002){
				scope.managerOrAdminChangeLead=true;
				auditor.managerOrAdminChangeLead=true;
			}
			}else if(auditor.orgLead==auditor.auditAuditorDetail[index].userId){
				
				if(auditor.userRoleId==1003 || auditor.userRoleId==1002){
					scope.managerOrAdminChangeLead=false;
					auditor.managerOrAdminChangeLead=false;
				}
			}
			
			auditor.auditAuditorDetail.sort(function(obj1, obj2) {
				return obj2.audLeadStatus - obj1.audLeadStatus;
			});
		}
		 auditor.auditAuditorDetail.forEach(function(a){
				a.seqNo = _(auditor.audObsNameArrayCopy).chain().where({'emailId':a.userId}).pluck('sequenceNo').toString();
			    if(a.auditRoleID==1002){
			    	a.seqNo = _(auditor.observerNameArray).chain().where({'emailId':a.userId}).pluck('sequenceNo').toString();
			    }
			});
		
		
		$scope.close = function(res){
			
			close(res, 0);
			
			$('.modal-backdrop').remove();
			
		}
		
		function setOldId(id,index){
			
			
			
			auditor.auditAuditorDetail[index].seqNo='';
			
			auditor.auditAuditorDetail[index].oldUserId?auditor.auditAuditorDetail[index].oldUserId=id:'';
			
			auditor.auditAuditorDetail[index].oldSignature?auditor.auditAuditorDetail[index].oldSignature=auditor.auditAuditorDetail[index].audSignature:'';
		}
		
		/** ** On select of AuditorName set his/her Id*** */
		function setAudObsId(item,index){ 
		   
		    auditor.auditAuditorDetail[index].userId = item.emailId;
			auditor.auditAuditorDetail[index].seqNo = item.sequenceNo;
			  
			auditor.auditAuditorDetail[index].auditorName = item.firstName+' '+item.lastName;
			
			
			
			if(auditor.auditAuditorDetail[index].oldUserId != item.emailId){
			
				
				auditor.auditAuditorDetail[index].audSignature = '';
				
				auditor.auditAuditorDetail[index].audSignatureDate = moment(new Date()).format(MMMDDYYYY);
				
			}else{
				
				auditor.auditAuditorDetail[index].audSignature = auditor.auditAuditorDetail[index].oldSignature;
			}
			
			var selectedNameDtl = _.where(auditor.auditAuditorDetail, { 'userId': item.emailId });
			
			
			if(selectedNameDtl.length>1){
						
				toaster.warning("The Name is already selected. Please select any other Name");
		    		 
				auditor.auditAuditorDetail[index].auditorName ='';
		    		 
				auditor.auditAuditorDetail[index].seqNo = '';
		    }
		 }
		
		/** ** remove selected Items to remove from list *** */		
		function removeItem(obj,key){
			//added by @ramya for jira id - IRI-5564
			var auditorNo=0;
			auditor.auditAuditorDetail = _.deleteRows(obj,key);
			if(obj && obj.length>0){
				obj.forEach(function(a){
				if(a.check==true)
					auditorNo+=1;
				});
			}
			if(auditorNo>0)
			toaster.success("Auditor(s) removed successfully");
			
			$rootScope.lead=true;
						
		};	
		
		/** ** Save of Auditor Array *** */
		function save(){
			
			if (auditor.validCheck(auditor.auditAuditorDetail)){
				
				auditor.auditAuditorDetail.forEach(function(a,index){
					a.auditorName = a.auditorName.firstName ? a.auditorName.firstName+' '+a.auditorName.lastName || '' : a.auditorName;
					a.auditRoleDesc =  a.auditRoleDesc ? a.auditRoleDesc : _(auditor.audObsTypeOptions).chain().where({'auditRoleId':Number(a.auditRoleID)}).pluck('auditRoleDesc').toString()
				});
					
				scope.auditDetail.auditAuditorDetail = angular.copy(auditor.auditAuditorDetail);
				
				var leadData = _.findWhere(auditor.auditAuditorDetail, {'audLeadStatus' : 1});
				
				scope.auditDetail.leadAuditorName = leadData.auditorName;
				scope.auditDetail.leadAuditorId  = leadData.seqNo;
				
				if( ( scope.userRoleId==1003 || scope.userRoleId==1006 ) && leadData.userId!=scope.loginUserId && scope.managerCreatingAudit){
					scope.managerCreatedAudit = true;
					scope.notLead=true;
					toaster.warning("Please Save Details to Create Audit");
					
					
				}
				if(scope.auditTypeId==scope.AppConstant.IHM_TYPE_ID && leadData && scope.userRoleId==1006 && scope.auditDetail.auditStatusId==1001){
					
					auditor.ihmUserDetails=_.findWhere(scope.audObsNameArray, {'emailId' : leadData.userId});
					
					if(auditor.ihmUserDetails){
						scope.auditDetail.auditPlace = auditor.ihmUserDetails.location; 
					}
				}
				
				if( (auditor.userRoleId==1003  || auditor.userRoleId==1006) && scope.managerCreatingAudit){ 
					
					auditor.managerCreatingAudit=false;
				}
				$timeout(function(){
					
					toaster.success("Auditor(s) added successfully");
					
					$rootScope.lead=true;
				},0);

				scope.managerChangingLeadFlag = true;
				
	    		/*
				 * if($scope.auditorForm.$dirty){
				 * 
				 * $rootScope.$broadcast("formsave"); }
				 */
	    		
	    		close('Cancel', 0);
	    		
	    		$('.modal-backdrop').remove();
			}
		}
		
		
       /** ** Auditor Array Validation before Save***** */
		function validCheck(auditArray) {
	
			var flag = true;
			console.log(auditor);
			console.log(auditArray);
			auditArray.forEach(function(a,index) { 
			
				if (!a.auditRoleID) {
					
					flag = false;
					
					toaster.warning("Please Select Type");
					
				} else if (!a.auditorName) {
					
					flag = false;
					
					toaster.warning("Please Enter Name");
					
				}else if (!a.userId) {
                	
            		flag = false;
					
					toaster.warning("Please Select Name From Typehead For Id");
				}else if(a.auditorName){
					scope.audObsNameArray.find(function(index) {
						var name = index.firstName+' '+index.lastName;
						if(a.auditorName!=name && a.userId == index.emailId){
							flag = false;
							 toaster.warning('Please Select Correct User for '+a.auditorName);
						     }
						});
				}/*
					 * else if (auditor.orgLead !=auditor.currLead){ // flag =
					 * true;
					 * 
					 * toaster.warning("Lead has been changed please save
					 * details"); }
					 */
				
			
			
			});
			
			return flag;
			
		}
		
		/** * checking not to allow multiple reviewer**** */		
		function checkReviewer(val,index){
			
			var selectedAuditorType = _.where(auditor.auditAuditorDetail, { 'auditRoleID': 1003 });
			
			auditor.observerNameArray.forEach(function(indexval){
				if( val!=1002 && indexval.emailId==auditor.auditAuditorDetail[index].userId){ 
					auditor.auditAuditorDetail[index].auditorName = '';
					auditor.auditAuditorDetail[index].seqNo='';
				}else if(val==1002 && indexval.emailId!=auditor.auditAuditorDetail[index].userId ){
					auditor.auditAuditorDetail[index].auditorName = '';
					auditor.auditAuditorDetail[index].seqNo='';
				}
			});
		
		// console.log(auditor.auditAuditorDetail);
		// console.log(auditor.loginUserId);
			
			
			
			/*
			 * auditor.auditAuditorDetail.forEach(function(index){
			 * 
			 * if(auditor.userRoleId==1003 && index.audLeadStatus!=1 &&
			 * auditor.loginUserId!=index.userId && scope.managerCreatingAudit){
			 * toaster.warning('Please Add Lead Auditor ');
			 * auditor.auditAuditorDetail[index].auditRoleID = '';
			 * auditor.auditAuditorDetail[index].auditRoleDesc = ''; }
			 * 
			 * });
			 */
			
			auditor.auditAuditorDetail[index].auditRoleDesc =  _(auditor.audObsTypeOptions).chain().where({'auditRoleId':Number(auditor.auditAuditorDetail[index].auditRoleID)}).pluck('auditRoleDesc').toString();
					
			if(selectedAuditorType.length>1){
						
				toaster.warning("Reveiwer Cannot be Multiple");
		    		 
				auditor.auditAuditorDetail[index].auditRoleID = '';
				auditor.auditAuditorDetail[index].auditRoleDesc =  '';
		    }else if(scope.leadSign && val!=auditor.AppConstant.AUDIT_REVIEWER_ROLE_ID){
		    	toaster.warning("Please remove your Signature to proceed further");
	    		 
				auditor.auditAuditorDetail[index].auditRoleID = '';
				auditor.auditAuditorDetail[index].auditRoleDesc =  '';
		    }
		}		
		
	}/** *** END OF AUDITOR DETAIL CONTROLLER **** */	
    
    	function vesselController(scope,$scope,close){
    		
    		var vc = this;
    	
    		vc.vesselList = scope.vesselList;
    		    		
    		vc.vslImoNo = scope.vesselImoNo;
    		
    		vc.criteria = scope.searchBy;
    		
    		if(scope.searchBy =='vesselName'){
    			vc.criteria = 'Vessel Name';
    		}else if(scope.searchBy =='vesselImoNo'){
    			vc.criteria = 'Imo No';
    		}else if(scope.searchBy =='officialNumber'){
    			vc.criteria = 'Oficial No';
    		}
    		    		
    		vc.setVesselDtl = setVesselDtl;
    		
    		vc.cancel = cancel;
    	
    		vc.setVessel = setVessel;
    		
    		function setVesselDtl(){
    		
    			var selectedVsl = _.findWhere(vc.vesselList, {'check' : 1});
    		
    			close('OK', 0);
    			$('.modal-backdrop').remove();
    		}
    	
    		function cancel(){
    			
    			close('Cancel',0);
    			$('.modal-backdrop').remove();
    		}

		function setVessel(index){
		
			vc.vesselList.forEach(function(a,ind){
			
				a.check = ind==index?1:0;
			});
		}
	
	}
    	
function UserSigantureController(scope,$scope,close,$cookies,AppConstant){
	
	var uc = this;

	uc.userList = scope.userList;
	
	uc.toCertifyIhm = scope.toCertifyIhm;
	
	uc.toCertifySMC = scope.toCertifySMC;
	    		
    uc.cancel = cancel;

	uc.setUser = setUser;
	
	uc.setUserDtl = setUserDtl;

	uc.setUserForIhm=setUserForIhm;
	
	uc.setUserForSMC = setUserForSMC;
	
	uc.toCertifyIhmFlag=false;
	
	uc.toCertifySMCFlag=false;
	
	if(sessionStorage.getItem("userRoleId")==AppConstant.ADMIN_ROLE_ID || sessionStorage.getItem("userRoleId")==AppConstant.MANAGER_ROLE_ID){
		  uc.dishplayToSMC = true;
	}else if(sessionStorage.getItem("userRoleId")==AppConstant.IHM_MANAGER_ROLE_ID){
		uc.dishplayToIhm = true;
	}
	
	function cancel(){
		
		close('Cancel',0);
		$('.modal-backdrop').remove();
	}
	
	function setUserDtl(){
	
	if(uc.toCertifySMCFlag){ 
		var selectedUsr = _.findWhere(uc.toCertifySMC, {'check' : 1});
		close('okForToSMC', 0);
		
	}else if(uc.toCertifyIhmFlag){
		var selectedUsr = _.findWhere(uc.toCertifyIhm, {'check' : 1});
		close('okForToIhm', 0);
	}else {close('OK', 0); 
	var selectedUsr = _.findWhere(uc.userList, {'check' : 1});
	}
		$('.modal-backdrop').remove();
	}
	
	function setUser(index){  
		uc.toCertifyIhmFlag = false; 
		uc.toCertifySMCFlag = false;
		uc.userList.forEach(function(a,ind){
		
			a.check = ind==index?1:0;
		});
	}
    function setUserForIhm(index){ 
		
		uc.toCertifyIhm.forEach(function(a,ind){
		
			a.check = ind==index?1:0;
			if(ind==index){
				uc.toCertifyIhmFlag =  true;
			}
		});
	}
    
    function setUserForSMC(index){ 
		
		uc.toCertifySMC.forEach(function(a,ind){
		
			a.check = ind==index?1:0;
			if(ind==index){
				uc.toCertifySMCFlag =  true;
			}
		});
	}
	
	$scope.close = function(result){
		close('close', 0);
		
		$('.modal-backdrop').remove();
	}



}

function SupportAttachementController(data,$scope,$rootScope,close,toaster,blockUI,auditFactory,$compile,$timeout,AppConstant,auditType,$cookies,YYYYMMDD,ModalService,supportFactory){ 

	var supAta = this;
	
	supAta.AppConstant = AppConstant;

	supAta.disableOthers=false;

	supAta.disableUpload=false;

	supAta.uploadCount=false;	

	supAta.path = data.path;
	
	supAta.disableDisplay = data.disableDisplay ? data.disableDisplay : false;
	
	supAta.fname = data.fileName;

	supAta.auditData = data;

	supAta.auditData.leadId = sessionStorage.getItem('emailId');

	supAta.auditData.companyId = sessionStorage.getItem('companyId');

	supAta.auditData.userIns = sessionStorage.getItem('emailId');

	supAta.uploadReport =  function(index){ 

		var count = supAta.fileReport.name.lastIndexOf(".");

		var fileName = supAta.fileReport.name.slice(0,count);

		var reader = new FileReader();

		var binary = "";

		var filePath =supAta.fileReport.path;


		if(supAta.auditData.auditSeqNo == fileName){

			reader.readAsArrayBuffer(supAta.fileReport);

			reader.onload = function(readerEvt) {

				var binaryImage = readerEvt.target.result;

				var bytes = new Uint8Array(reader.result);

				var length = bytes.byteLength;

				for (var i = 0; i < length; i++) {

					binary += String.fromCharCode(bytes[i]);
				}
				supAta.auditData.fileData =  binary ? btoa(binary):'';
			}

		}else{
			supAta.fileReport = "";
			toaster.warning('Please Select Valid File');
		}
	}

	$scope.uploadFile = function(result){ 

		var flag=true;

		blockUI.start("File uploading...");

		supportFactory.upload(supAta.auditData).$promise
		.then(function(res) {


			if (!res.error && res.val == 'Success'){
				flag=false;
				toaster.success('File Uploaded Successfully');

			}else if(!res.error && res.val == 'Invalid File'){
				flag=false;
				toaster.warning('Uploaded File is Invalid');

			}else {
				flag=false;
				toaster.warning('Issue in File Upload');
			}

			blockUI.stop();
		});

		if(flag){
			blockUI.stop();	
			close(result, 0);
			$('.modal-backdrop').remove();
		}
	}

	supAta.clearFiles = function(index){
		angular.element("input[type='file']").val(null);
	}

	supAta.deleteFile = function(index,typeId){ 

		ModalService.showModal({

			templateUrl : 'src/modals/deleteAttachment.html',

			controller  : 'removeReportController',

			inputs		: {data:'Attachment'},

		}).then(function(modal) {

			modal.element.modal();

			modal.close.then(function(result) {
				if(result=='YES'){
					blockUI.start();
					supAta.fileReport = '';
					blockUI.stop();

				}
			});

		});

	}

	$scope.close = function(result){ 
		close(result, 0);
		$('.modal-backdrop').remove();
	}

	/** *** END OF SUPPORT CONTROLLER **** */
}



/** *** REPORT CONTROLLER **** */    
function ReportController(scope,$scope,$rootScope,close,toaster,blockUI,auditFactory,$compile,$timeout,AppConstant,auditType,$cookies,YYYYMMDD,ModalService){ 
    	
    	var rp = this; console.log(rp);
    	
    	rp.auditData = scope.requiredData;
    	
    	rp.AppConstant = AppConstant;
    	
    	rp.auditTypeId = scope.auditDetail.auditTypeId;
    	
    	rp.reportTypeArray = scope.auditDetail.auditRptAttach;
    	
    	rp.loginUserId = sessionStorage.getItem('emailId');
    	
    	rp.auditRptAttach = scope.auditDetail.auditRptAttach;
    	
    	rp.auditRptAttach=_.sortBy(rp.auditRptAttach, 'attachmentTypeId');
    	
        rp.reportTypes = scope.attachmentTypeId;
        
    	rp.addOtherAttachment = addOtherAttachment;
    	
    	
    	rp.auditingType = auditType[scope.auditDetail.auditTypeId].auditingType;
    	
    	rp.auditSubType = scope.auditDetail.auditSubTypeId; 
    	
    	rp.disableOthers=false;
    	rp.disableUpload=false;
    	rp.disableComments=false;
    	rp.disableAdd=false;
    	
    	rp.uploadCount=false;
    	
    	rp.carUpdateStatus = scope.auditDetail.carUpdateStatus;
    	
    	
    	
    	var fileReport;
    	
//    	rp.reportTypeArray = rp.reportTypeArray.filter(function(value, index, arr){
//           return  value.auditTypeId==scope.auditDetail.auditTypeId && value.auditSubTypeId==scope.auditDetail.auditSubTypeId;
//        });
    	
    	
    	if(rp.auditData.reviewStatus == AppConstant.INITIATE_REVIEW_STATUS){
    		
    		rp.disableComments=true;
    		rp.disableOthers=true;	
    		rp.disableUpload=true;
    		rp.disableAdd=true;
    		}
    		
    	
    	function addOtherAttachment(){
    		
    		var checkOtherFilled=false, seqNo;
    		
    		rp.auditRptAttach.forEach(function(index){
    			
             if(index.attachmentTypeId== AppConstant.OTHER_RPT_ATCH_ID && !index.fileName){
    			toaster.warning('Please fill Other Attachment details');
    			seqNo=index.seqNo;
            	 checkOtherFilled =true;
             }else if(index.attachmentTypeId== AppConstant.OTHER_RPT_ATCH_ID && !index.otherType){
            	 seqNo=index.seqNo;
            	 checkOtherFilled =true;
            	
         			toaster.warning('Please specify the name of the Other report type attachment.');
             }else{
            	 seqNo=index.seqNo;
             }	
    		});
    		 var seqNoTemp =_.max(rp.auditRptAttach, function(find){  return   find.seqNo; }) ;
    		 if (seqNoTemp) {
    			 seqNo = seqNoTemp.seqNo;
			}
    		     		
    		if (!seqNo) {// if no report
    			seqNo=0;
			}
    		
    		if(!checkOtherFilled){
    		rp.auditRptAttach.push({
				'attachmentTypeId' : AppConstant.OTHER_RPT_ATCH_ID,
				'attchTypeDescAudit' :'OTHER',
				'attachmentTypeDesc' :'OTHER',
				'auditTypeId'  : scope.auditDetail.auditTypeId,
				'companyId'    :  sessionStorage.getItem('companyId'),
				'auditSeqNo'   :'',
				'dateIns': moment(new Date()).format(YYYYMMDD),
				'fileName':'',
				'seqNo':seqNo+1,
				'userIns': (sessionStorage.getItem('emailId')).toString(),
				'fileByte':'',
			    'otherType':'',
			    'comments':''
			});
    		rp.reportTypeArray.push({
				'attachmentTypeId' : AppConstant.OTHER_RPT_ATCH_ID,
				'attchTypeDescAudit' :'OTHER',
				'attachmentTypeDesc' :'OTHER',
				'auditTypeId'  : scope.auditDetail.auditTypeId,
				'companyId'    :  sessionStorage.getItem('companyId'),
				'auditSeqNo'   :'',
				'dateIns': moment(new Date()).format(YYYYMMDD),
				'fileName':'',
				'seqNo':seqNo+1,
				'userIns': (sessionStorage.getItem('emailId')).toString(),
				'fileByte':'',
			    'otherType':'',
			    'comments':''
			});
    		}
    		
    		 $timeout(function(){
				$("#others-"+ (rp.auditRptAttach.length-1)).focus();
    		  },0);
    		
    		
    	}
    	
       	
    	rp.uploadReport =  function(indexnew){ 
    		var index = _.findLastIndex(rp.auditRptAttach, {
    			seqNo: indexnew
        	});
    		
    		
             var flag=true;
    	     var count = rp.fileReport.name.lastIndexOf(".");
  			 var fileName = rp.fileReport.name.slice(0,count);
  			 var fileSize = rp.fileReport.size;
  			 var reader = new FileReader();
  			 var binary = "";
  			 var fileType =rp.fileReport.type;
  		// 10526720 10 mb size
  			 var flag2=true;
				
  			if(fileSize>52633600){
  				flag=false;
  				flag2=false;
  				toaster.warning("Uploaded File size("+Math.round((fileSize/1048576) * 100) / 100+"MB) should be less than 50MB");		//Added by @Ramya on 10-8-2022 for jira id - IRI-5416
  			} else if(fileName.length>70){
			    flag=false;
			    flag2=false;
					toaster.warning("File name should be less than 70 characters");	 	
				}else {
    		rp.auditRptAttach.forEach(function(a){
	        	
	        	 if(a.fileName && a.fileName==rp.fileReport.name){ 
	             toaster.warning(rp.fileReport.name+' file name already exists ');
	        	 flag=false;
	        	 }
	         });
    		
    		if(fileSize>10526720 && flag2){
				blockUI.start("Uploading Report");
				$timeout(function(){
					blockUI.stop();	 
			},1000);
				
    		// 104857601048576
			}
  			
    			
  				
  			}
    		
            if(rp.fileReport && rp.reportTypes){
    			fileReport = rp.fileReport; 
    		 }else{
    			toaster.warning('Please Select Report Type');
    		  } 
            if(flag){
            	rp.uploadCount = true;
            	rp.auditRptAttach[index].comments='';
    			rp.auditRptAttach[index].fileName = rp.fileReport.name;
    			rp.reportTypeArray[index].comments='';
    			rp.reportTypeArray[index].fileName = rp.fileReport.name;
    			reader.readAsArrayBuffer(rp.fileReport);
    			}
            
               reader.onload = function(readerEvt) {
            	var binaryImage = readerEvt.target.result;
    			
    			var bytes = new Uint8Array(reader.result);
    			
    			var length = bytes.byteLength;
    				
    			for (var i = 0; i < length; i++) {
    				
    				binary += String.fromCharCode(bytes[i]);
    			}
    			rp.reportTypeArray[index].fileByte = binary ?btoa(binary):'';
				rp.auditRptAttach[index].fileByte = binary ?btoa(binary):'';
			  }            

    	}
    	
    	/** **** to save the report **** */
    	$scope.saveReport = function(result){ 
    		var flag=true;
    		blockUI.start("Uploading Report");
    		
    		rp.auditRptAttach.forEach(function(index){
    			
    			if(index.attachmentTypeId== AppConstant.OTHER_RPT_ATCH_ID){
    				
    				rp.reportTypeArray.forEach(function(val){ 
    					
    					if (val.seqNo==index.seqNo && val.attachmentTypeId== AppConstant.OTHER_RPT_ATCH_ID) {
							val.otherType=index.otherType;
							val.comments=index.comments;
						}
    				});
    				
    				if(!index.fileName){
    					blockUI.stop();
    					flag =false;
    					toaster.warning('Please Select File for Other Type');	
    				
    			    }else if(!index.otherType){
    					blockUI.stop();
    					flag =false;
    					toaster.warning('Please specify the name of the Other report type attachment.');
    				}
    			}
    				
    		});
    		
    		
    		if(flag){
    		blockUI.stop();	
    		close(rp.auditRptAttach, 0);
    		$('.modal-backdrop').remove();
			
			var auditTypeAttch='';
			if(scope.auditDetail.auditTypeId==1001 || scope.auditDetail.auditTypeId==1002)
				{
				auditTypeAttch='Audit';
				}
			else if(scope.auditDetail.auditTypeId==1003)
				{
				auditTypeAttch='Inspection';
				}
			else if(scope.auditDetail.auditTypeId==1004 || scope.auditDetail.auditTypeId==1005 || scope.auditDetail.auditTypeId==1006 || (scope.auditDetail.auditTypeId>=1007 && scope.auditDetail.auditTypeId<=1013))		//changed by Ramya on 19-10-2022 for jira id - IRI-5510
			{
			auditTypeAttch='Review';
			}
			if(rp.uploadCount){
			toaster.success("Attachment(s) to the "+auditTypeAttch+" added successfully" ); }
			
			$rootScope.report=true;
    		
			
    		}
    	}
   
    
    	rp.clearFiles = function(index){
    		
    		angular.element("input[type='file']").val(null);
    	}
    	
    	rp.deleteFile = function(indexnew,typeId){
			if(!rp.carUpdateStatus){					//added by @Ramya on 4-7-2022 for jira id - IRI-5361
    		
    		var index = _.findLastIndex(rp.auditRptAttach, {
    			seqNo: indexnew
        	});
    		var index2 = _.findLastIndex(rp.reportTypeArray, {
    			seqNo: indexnew
        	});
    		
         
         $timeout(function(){
          if(rp.auditRptAttach[index].fileName){
        	 
	      ModalService.showModal({
			
			   templateUrl : 'src/modals/deleteAttachment.html',
			
			   controller  : 'removeReportController',
			
			   inputs		: {data:'Attachment'},
		
		       }).then(function(modal) {
			
			   modal.element.modal();
				    			
			   modal.close.then(function(result) {
				    if(result=='YES'){
					    		
		    		if(typeId == AppConstant.OTHER_RPT_ATCH_ID){
		    			blockUI.start();
		    			rp.auditRptAttach.splice(index,1);
		    			rp.reportTypeArray.splice(index2,1);
		    			blockUI.stop();
		    		}else{
		    			blockUI.start();
		    			rp.auditRptAttach[index].fileName='';
		    			rp.auditRptAttach[index].fileByte='';
						rp.auditRptAttach[index].comments='';	//added by ramya for jira id-->IRI-5246
		    			rp.reportTypeArray[index2].fileName='';
		    			rp.reportTypeArray[index2].fileByte='';
						rp.reportTypeArray[index2].comments='';	//added by ramya for jira id-->IRI-5246
		    			blockUI.stop();
		    		}
				}
			  });
			
		   }); 
           
          }  },300);
		}
    	}
    	    	
    	rp.validateReport = function(){
    		
    		var flag = true;
    		if(rp.reportTypes == AppConstant.OTHER_RPT_ATCH_ID && !rp.others){
    			toaster.warning('Please specify the name of the Other report type attachment.');
    		// flag = false;
    		}
    		
    		return flag;
    	}
    	
    	    /* start closing add attachment model   */	
    	// $scope.closes = function(result){
    	// 	close(rp.auditRptAttach, 0);
    		
    	// 	$('.modal-backdrop').remove();
    	// }

			/**added by archana for jira ID-IRI-5474 02-Mar-2023 start */
	  $scope.closes = function (result) {
		var flagData;
		rp.backupData = rp.auditRptAttach.filter(function (obj) {
			return obj.attachmentTypeId == AppConstant.OTHER_RPT_ATCH_ID && obj.fileName
		});
		rp.auditRptAttach.forEach(function (a, index) {
			if (a.attachmentTypeId == AppConstant.OTHER_RPT_ATCH_ID) {
				if (a.attachmentTypeId == AppConstant.OTHER_RPT_ATCH_ID && !a.fileName) {
					rp.auditRptAttach.splice(index, 1);
					if(rp.auditTypeId ==rp.AppConstant.IHM_TYPE_ID){
						rp.reportTypeArray.splice(index, 1);
					}
					flagData = true;
				} else
					if (a.attachmentTypeId == AppConstant.OTHER_RPT_ATCH_ID && a.fileName && a.otherType == '') {
						toaster.warning('Please specify the name of the Other report type attachment.');
						flagData = false;
					} else if (a.attachmentTypeId == AppConstant.OTHER_RPT_ATCH_ID && a.fileName && a.otherType) {
						if(rp.auditTypeId ==rp.AppConstant.IHM_TYPE_ID){
							rp.reportTypeArray.forEach(function(val){ 
    					       if (val.seqNo==a.seqNo && val.attachmentTypeId== AppConstant.OTHER_RPT_ATCH_ID) {
									val.otherType=a.otherType;
									val.comments=a.comments;
								}
							});
						}
						flagData = true;
					}
			} else if (rp.backupData.length == 0) {
				flagData = true;
			}
		})
		if (flagData == true) {
			close(rp.auditRptAttach, 0);
			$('.modal-backdrop').remove();
		}
	  }
		/**added by archana for jira ID-IRI-5474 end*/
    	   /* end closing add attachment model   */	
    	
    	$scope.close = function(result){ 
    	
	    	rp.auditRptAttach.forEach(function(a,index){
	    		
	    		if(a.attachmentTypeId==AppConstant.OTHER_RPT_ATCH_ID && !a.fileByte ){
	    			rp.auditRptAttach.splice(index,1);  
	    			}
	    	});
	    	console.log(rp.auditRptAttach)
	    	rp.reportTypeArray = [];
	    	console.log(rp.reportTypeArray)
	    	
    		close(rp.auditRptAttach, 0);
    		
    		$('.modal-backdrop').remove();
		}
    	    	    	
    	/** *** END OF REPORT CONTROLLER **** */
    }
    
    function docChangedController(close,$scope,$rootScope,data){
    	
    	$scope.confirmationMsg = data;
    	
    	var subMsg = data.substring(0,3);
    	console.log(subMsg)
    	console.log(data.lastIndexOf("RMI"))
    	if(subMsg == 'DOC' || data.lastIndexOf("RMI") != -1)
    		$scope.ok = true;
    	else
    		$scope.ok = false;
    	
    	$scope.close = function(res){
    		
    		close(res,0);
    		
    		$('.modal-backdrop').remove();
    	}
    	
    }
    
    function viewMoreController(close,$scope,$rootScope,data){
    	console.log(data)
    	$scope.LatestVesselDetails = data;
    	
    	
    	$scope.close = function(res){
    		
    		close(res,0);
    		
    		$('.modal-backdrop').remove();
    	}
    }
    
    
    /** *** REPORT PREVIEW CONTROLLER **** */
    function ReportPreviewController($http,$scope,$cookies,scope,reportTypes,$sce,fileData,$rootScope,toaster,close,BASE_URL,detailsFactory,$timeout,auditFactory){    	
    	
    	var companyId = sessionStorage.getItem("companyId");
    	
    	$scope.officeClass = false;
    	console.log(fileData);
    	var auditTypeId = fileData.auditTypeId;
		
    	$scope.close = function(result){
    		
    		setTimeout(function(){
    			
    			close(result, 0);
    			
    			$('.modal-backdrop').remove();
    			
    		},0);
    		
    	}
    	 	
    	$scope.reportType = fileData.ismReport[fileData.index].attchTypeDescAudit ? fileData.ismReport[fileData.index].attchTypeDescAudit : fileData.ismReport[fileData.index].attchmentTypeDesc;
    	
    	$scope.reportprevcomment = fileData.ismReport[fileData.index].comments;
    	
    	var file;
        var fileURL;
    	
        var fileExtension = fileData.file.split('.').pop(); 
		
		detailsFactory.downloadReport(fileData.file,fileData.audSeqNo,auditTypeId,companyId).$promise.then(function(res){
			 
			var assesUrl = BASE_URL+"audit/ism/getAuditRptAttach/"+ fileData.file +"/"+ fileData.audSeqNo +"/"+ auditTypeId +"/"+companyId;
				     	   
			if(res.status == 200 && res.data.byteLength ){
    					        
				downloadFiles(new Blob([res.data], {type : res.headersGetter('content-type')}),fileData.file,assesUrl);
		        
			}else if(fileData.byteArray){
				
				var findingFileByte = atob(fileData.byteArray);

				var bytes = new Uint8Array(findingFileByte.length);
	    	    
				for (var i = 0; i < findingFileByte.length ; i++){
					bytes[i] = findingFileByte.charCodeAt(i);
				}
				
				downloadFiles(new Blob([bytes.buffer], {type : res.headersGetter('content-type')}),fileData.file,'');
			}
		});	
        
		function downloadFiles(blob, fileName,assesUrl) {
    		
    	    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For
																			// IE:
    	    	
    	       window.navigator.msSaveOrOpenBlob(blob, fileName);
    	    	 
// if(assesUrl){
// var authToken = sessionStorage.getItem('authToken');
// assesUrl =
// assesUrl+'?access_token='+authToken.substring(1,authToken.length-1);
// $scope.content = $sce.trustAsResourceUrl(assesUrl);
// }else{
// var link = document.createElement('a');
// link.href = window.URL.createObjectURL(blob);
// $scope.content = $sce.trustAsResourceUrl(link.href);
// }
    	    	
    	    } else {
    	    	// For other browsers:
    	    	
    	    	if(assesUrl){
    	    		/*var authToken = sessionStorage.getItem('authToken');
    	    		assesUrl = assesUrl+'?access_token='+authToken.substring(1,authToken.length-1);
    	    		$scope.content =  $sce.trustAsResourceUrl(assesUrl);*/
    	    		
    	    		
    				
    				var link = document.createElement('a');
         	        link.href = window.URL.createObjectURL(blob);
         	        $scope.content = $sce.trustAsResourceUrl(link.href);
    	    		
    	    		
    	    	}else{

    	    		var link = document.createElement('a');
        	        link.style = "display: none"; 
        	        link.href = window.URL.createObjectURL(blob);
        	        document.body.appendChild(link);
        	       
        	       $scope.content = $sce.trustAsResourceUrl(link.href);
        	       
        	        if(fileExtension == 'xlsx' || fileExtension == 'docx' || fileExtension == 'xls' || fileExtension == 'doc'){
        				
        				$scope.officeFile = true;
        	    		
        	    		$scope.officeClass = true;
        	    		
        	    		$scope.content = $sce.trustAsResourceUrl("");
        	    		
        	    		link.download = fileName;    
            	        
            	        link.click();
            	        
            	        setTimeout(function(){
            	            document.body.removeChild(link);
            	            window.URL.revokeObjectURL(link.href);  
            	        }, 1000);
        			}
    	    		
    	    	}
    	    }
    	}
    	
    	
    	$scope.trustUrl = function(val){
    		
    		return $sce.trustAsResourceUrl(val);
    	
    	}    	    	
    	
    	
    	/** *** END OF REPORT PREVIEW CONTROLLER **** */
    }
    
    
    function sendEmailController (close,$scope,data,$rootScope,auditFactory, $http, BASE_URL,toaster,$cookies ){
    	var sendEmail =this;
    	var email = this;
    	var ef = this;
    	var fname = data.FILE_NAME.split(".");
    	var actual_file_name=fname[0]+"_IRI_"+data.REVIEW_REPORT_NO;
    	ef.sendEmail = function(){
    		if(ef.sendEmailId == null){
    			toaster.warning("Please provide EmailId to send link")
    		}
    		else{
    			 auditFactory.sendDownloadLink(ef.sendEmailId,fname[1],actual_file_name,data.REVIEW_REPORT_NO).$promise.then(function(res) { 
            	 toaster.success(res.msg);
            	 });
    			}
    		
    	}
    	
     
    }
    
    function EmailReportController (close,scope,$scope,$rootScope,auditFactory, $http, BASE_URL,toaster,$cookies ){
    	var email = this;
    	email.certificateDoc = scope.certificateDoc;
    	email.approvaDoc = scope.approvaDoc;
    	email.stampDoc = scope.stampDoc;
    	email.userMailId = '';
    	email.sendEmail = sendEmail;
    	email.reviewDocPr = scope.reviewDocPr;
    	email.reviewDocFr = scope.reviewDocFr;
    	
    	email.receiptDoc = scope.receiptDoc;
    	email.ihmCertDocHk = scope.ihmCertDocHk;
    	email.ihmCertDocEu = scope.ihmCertDocEu;
    	email.ihmCertDocEx = scope.ihmCertDocEx;
    	 
    	email.fileName = scope.vesselDetail.vesselName;
    	email.auditReportNo = scope.auditDetail.auditReportNo;
    	email.userName = scope.auditDetail.userIns ? scope.auditDetail.userIns : scope.auditDetail.auditAuditorDetail[0].userIns;
    	
    	email.vesselName = scope.vesselDetail.vesselName;
    	email.officialNo = scope.vesselDetail.officialNo;
    	email.vesselImoNo = scope.vesselDetail.vesselImoNo;
    	email.auditTypeId = scope.auditDetail.auditTypeId;
    	email.auditSubTypeId = scope.auditDetail.auditSubTypeId;
    		
    	
    	function sendEmail(mailValue){
    		  console.log(email)
    		  auditFactory.sendMailReports(email).$promise.then(function(res) { 
        		toaster.success("Email Sent Successfully");
       	      });
    		  
    		  //$('#pdf-modal-backdrop').remove();
    	}
    }
    
    function removeReportController(close,$scope,data,$rootScope){
    	
    	$scope.attachFinding = "Do You want to delete the "+data;
    	
    	// $rootScope.$broadcast("formsave");
		$scope.close = function(result) {
			if(result=="YES")
				{
				$rootScope.report=true;
				}
			close(result, 0);
			$('.modal-backdrop').remove();
		};
	}
   
    function dateWarningController($scope,close){
    	
    	$scope.close = function(result) {    		
    		close(result,0);
			$('.modal-backdrop').remove();
		};
    }
    
   /* function completionSurveyDateController($scope,close,data){
    	
    	var completionDate = this;
    	
    	completionDate.message = data;
    	
    	completionDate.close = function(result) {
    		
    		close(result,0);
			
			$('.modal-backdrop').remove();
    		};
	}*/
    
    
function approveRejectController($scope,close,toaster,AppConstant){
    	
    	var aprv = this;
    	
    	aprv.AppConstant = AppConstant;
    	
    	aprv.revappr1 = 2;
    	
    	aprv.revnotappr1 = 3;
    	
    	aprv.close = function(result) {    		
    		close(result,0);
			$('.modal-backdrop').remove();
		};
		
		aprv.approved = function(){  
			aprv.revnotappr = 0;
    	}
    	
		aprv.rejected = function(){
			aprv.revappr = 3;
    	}
		
		aprv.validation = function(){
			
			var flag = true;
			
			if(!aprv.revappr && !aprv.revnotappr){
				flag = false;
				toaster.warning("please select Approved or Rejected");
			}
			
			if(aprv.revnotappr){
				if(!aprv.comments || aprv.comments.length<10){
					flag = false;
					toaster.warning("Please enter the Reason for Rejection in  comment box.(Minimun of 10 characters)");
				}
			}
			
			return flag;
		}
		
		aprv.saveApproveReject = function(){
			
			if(aprv.validation()){
				var data = {
						"approve" : aprv.revappr,
						"comments": aprv.comments
				}
				close(data,0);
				$('.modal-backdrop').remove();
			}			
		}
		
	}
	

	function vesselImoNoRegistryController(scope,$scope,toaster,auditFactory,$cookies,YYYYMMDD){
		
		var yatch = this; console.log(yatch);  console.log(scope); console.log($scope);
		
		yatch.checkImoExist  = checkImoExist;
		
		yatch.vesselImoNorsIhm = scope.vesselImoNorsIhm;
		
		yatch.vesselData = scope.vesselDataYatch;
		
		yatch.MaVesselYatchDataImoNors = scope.MaVesselYatchDataImoNors;
		
		function checkImoExist(imoNo){
		console.log(imoNo);
		
		 yatch.exist = _.find(yatch.vesselImoNorsIhm, function(imoNoVal){ return imoNoVal  == imoNo; });
		
		 yatch.existAsYatch = _.find(yatch.MaVesselYatchDataImoNors, function(imoNoVal){ return imoNoVal  == imoNo; });
   
		 if(!imoNo || !imoNo.length){
			 toaster.warning("Please Enter Vessel Imo Number");	 
		 }
		 else if(imoNo.length<7){
			toaster.warning("Vessel Imo Number Should be 7 Digit");	
		} else if(imoNo.length>7){
			toaster.warning("Vessel Imo Number Should be 7 Digit");	
		}else if( yatch.exist){
        	toaster.warning("Vessel Imo Number alredy Exist Please Enter Diffrent Vessel IMO Number");	
        }else if(yatch.existAsYatch){
        	toaster.warning("Vessel Imo Number alredy Exist As a Yatch Vessel IMO Number");	
        }else {
        	
        	auditFactory.checkVesselImoNorExist(imoNo).$promise.then(function(result){
        		console.log(result);
        		if(result.data==1){
        			toaster.warning("Vessel Imo Number alredy Exist in RMI Database");	
        		}else if(result.data==0) {
        			
            yatch.vesselData.vesselImoNo =  imoNo;
        	console.log(yatch.vesselData);
        	yatch.vesselData.activeStatus =1;
        	yatch.vesselData.companyId =  sessionStorage.getItem('companyId');
        	yatch.vesselData.companyId = yatch.vesselData.companyId;
            yatch.vesselData.grt = yatch.vesselData.grossTon;
            yatch.vesselData.officialNo =  yatch.vesselData.officialNumber;
            yatch.vesselData.dateIns =  moment(new Date()).format(YYYYMMDD);
            yatch.vesselData.userIns= (sessionStorage.getItem('emailId')).toString();
            yatch.vesselData.userId= (sessionStorage.getItem('emailId')).toString();
        	yatch.vesselData.tcApprovalStatus = (yatch.vesselData.tcApprovalStatus=='Approved')?1:0; 
        	yatch.vesselData.dateOfRegistry = yatch.vesselData.registrationDate ? yatch.vesselData.registrationDate :'';
        	yatch.vesselData.portOfRegistry = yatch.vesselData.homePort ? yatch.vesselData.homePort :''; 
        	yatch.vesselData.vesselId = yatch.vesselData.vesselID ? yatch.vesselData.vesselID :''; 
        	yatch.vesselData.vesselUk = yatch.vesselData.vesselUK ? yatch.vesselData.vesselUK :'';
        	yatch.vesselData.vesselPk = yatch.vesselData.vesselPK ? yatch.vesselData.vesselPK :'';
        	yatch.vesselData.companyImoNo = yatch.vesselData.companyIMONumber ? yatch.vesselData.companyIMONumber :'';
// var a = yatch.vesselData;
// console.log(a);
     // yatch.vesselData='';
        	auditFactory.saveMaVesselYatch(yatch.vesselData.companyId, yatch.vesselData.userId,yatch.vesselData).$promise.then(function(res) { 
        		console.log(res);
        		toaster.warning("Vessel Imo Number Registered Successfully");
        		scope.setYatchVesselData(yatch.vesselData);
        		yatch.disableAll = true;
        		// yatch.close('Cancel');
        	 });
        	
        }else {toaster.warning("Something Went Wrong Please Contact Administrator");	 }		
        
        });
        }
        
		}
		
		yatch.close = function(result) {
			
		// close(result, 0);
			
			$('.yach-modal').remove();
			
		};
		
		 
    	
    	console.log("vesselImoNoEntryController")
		
    }


  
  
function LetterHistoryController(scope,$scope,$cookies,detailsFactory,MMMDDYYYY,auditTypeId,companyId,auditSeqNo,leadSign,auditService,signerName,$timeout,auditFactory,CERTI_URL,$sce,YYYYMMDD,blockUI,activeStatus,vesselNameAud,companyAddressAud,portOfRegistryAud,companyName,title){
   console.log(scope)
    console.log(portOfRegistryAud);
	var LtrHist=this;
	LtrHist.auditTypeId=auditTypeId;
	LtrHist.companyId=companyId;
	LtrHist.auditSeqNo=auditSeqNo;
	LtrHist.signerName = signerName;
	LtrHist.activeStatus=activeStatus;
	LtrHist.vesselNameAud = vesselNameAud;
	LtrHist.companyAddressAud = companyAddressAud;
	LtrHist.portOfRegistryAud = portOfRegistryAud;
	LtrHist.companyName =companyName;
	LtrHist.leadSign =leadSign;
	LtrHist.title = title;
	LtrHist.companyAddress = LtrHist.companyAddressAud; 	// code changed by kiran for jira id--> IRI-5293, IRI-5295
	
	
	blockUI.start("Opening Letter");
		
		
		// var doc = new jsPDF('p', 'mm', 'a4');
			detailsFactory.getAuditDetail(LtrHist.auditTypeId,LtrHist.companyId,LtrHist.auditSeqNo).$promise.then(function(res) {
				 console.log(res);
				var leadauditorMail = _.findWhere(scope.audObsNameArray, {'sequenceNo':scope.auditDetail.leadAuditorId, 'companyId' : Number(scope.companyId)});
				 
				scope.ihmUserDetails=_.findWhere(scope.audObsNameArray, {'emailId' : leadauditorMail.emailId});
				res.userAddress = (scope.ihmUserDetails &&  scope.ihmUserDetails.address ) ? scope.ihmUserDetails.address :'';
				 
				var particularUserDetails = _.findWhere(scope.audObsNameArray, {'officialId':res.officialId, 'companyId' : Number(scope.companyId)});
				 
				var particularAdd=_.findWhere(scope.audObsNameArray, {'emailId' : particularUserDetails.emailId});
				res.userAddress = (particularAdd &&  particularAdd.address ) ? particularAdd.address :''
				// res.portofreg = "MAJURO";
				//** remove deputytitle code to fix IRI-5239 by kiran  */
				var tempLeadSign='';
				
					detailsFactory.getSignature(res.userIns,res.companyId).$promise.then(function(resSig){
						
							res.auditAuditorDetail.sort(function(c, d){
					            return c.auditRoleID - d.auditRoleID ;
					        });
							
							if(res.auditAuditorDetail[0].audSignature)
								tempLeadSign=atob(res.auditAuditorDetail[0].audSignature);
							else
								tempLeadSign = LtrHist.leadSign;
						
							if(res.auditTypeId==scope.AppConstant.IHM_TYPE_ID){
								
								
								var ihmCertModal = {
							   		       hk : true,
							   		       eu : true
							   		     };
							    switch(res.sspReviewDetail[0].reviewSummary){
							    case 11 :
							    	{
							    	ihmCertModal = {
							   		       hk : true,
							   		       eu : true
							   		     };
									break;
							    	}
								case 10 :
									ihmCertModal = {
							   		       hk : true,
							   		       eu : false
							   		     };
									break;
								case 1 :
									ihmCertModal = {
				        			   		       hk : false,
				        			   		       eu : true
				        			   		     };
									break;
								case 0 :
									ihmCertModal = {
							   		       hk : false,
							   		       eu : false
							   		     };
									break;
							      }
								
							console.log(ihmCertModal)
							
						  var letterViewBaseData = {
								
								'auditTypeId'	 :res.auditTypeId,
								'companyaddress' :LtrHist.companyAddress, /** Fixed IRI-5293 code changed by kiran */
								//'companyname'    :res.sspReviewDetail[0].vesselCompanyName,
								'certIssueDate'	 : res.certIssueDate ? moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):moment(res.closeMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'),
								'auditDate'		 :res.auditDate ? moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):'',
								'vesselName'     :LtrHist.vesselNameAud,
								'officialNo'     :res.sspReviewDetail[0].officialNo,					
								'vesselImoNo'    :res.vesselImoNo,
								'auditSubTypeId' :res.auditSubTypeId,
								'certificateNo' :res.certificateNo,
								'revisionNo':res.sspReviewDetail[0].sspRevisionNo,
								'receiptdate':moment(res.openMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'),
								'leadSign':tempLeadSign,
								'leadAuditorName':LtrHist.signerName,
								'planSignerName' : LtrHist.signerName,/** Fixed IRI-5272 code changed by kiran */
								'title':LtrHist.title,
								'certificateHk':ihmCertModal.hk,
								'certificateEu':ihmCertModal.eu,
								'userAddress':res.userAddress,
								'openMeetingDate' : res.openMeetingDate ? moment(res.openMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY') : '',
								'additionalSurvey' : res.additionalSurvey ? moment(res.additionalSurvey,YYYYMMDD).format('DD-MMMM-YYYY') : '',
								'activeStatus':LtrHist.activeStatus
						  }
						}else{
							var letterViewBaseData = {
									
									'auditTypeId'	 :res.auditTypeId,
									'companyaddress' :LtrHist.companyAddress, /** Fixed IRI-5293 code changed by kiran */
									//'companyname'    :res.sspReviewDetail[0].vesselCompanyName,
									'certIssueDate'	 : res.certIssueDate ? moment(res.certIssueDate,YYYYMMDD).format('DD-MMMM-YYYY'):moment(res.closeMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'),
									'auditDate'		 :res.auditDate ? moment(res.auditDate,YYYYMMDD).format('DD-MMMM-YYYY'):'',
									'vesselName'     :LtrHist.vesselNameAud,
									'officialNo'     :res.sspReviewDetail[0].officialNo,					
									'vesselImoNo'    :res.vesselImoNo,
									'auditSubTypeId' :res.auditSubTypeId,
									'certificateNo' :res.certificateNo,
									'revisionNo':res.sspReviewDetail[0].sspRevisionNo,
									'receiptdate':moment(res.openMeetingDate,YYYYMMDD).format('DD-MMMM-YYYY'),
									'leadSign':tempLeadSign,
									'leadAuditorName':LtrHist.signerName,
									'planSignerName' : LtrHist.signerName,/** Fixed IRI-5272 code changed by kiran */
									'portofreg' :LtrHist.portOfRegistryAud,
									'title':LtrHist.title,
									'activeStatus':LtrHist.activeStatus
							}
						}
							console.log(letterViewBaseData);
								var certificate = "";
								var certificateName = "";
								 if(res.auditTypeId == scope.AppConstant.SSP_TYPE_ID){
		
									 
									 if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
										 certificate = auditService.sspApproveLetter(letterViewBaseData);
		
										 certificateName = 'Approval Letter_' + res.certificateNo + '.pdf';
									 }
									 else if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
										 
										 certificate = auditService.sspAmendmentLetter(letterViewBaseData);
		
										 certificateName = 'Amendment Approval Letter_' + res.certificateNo + '.pdf';
									 }
							    }else if(res.auditTypeId == scope.AppConstant.DMLC_TYPE_ID){
							    	
							    	 // certificateName = 'Receipt Letter_' +
										// res.certificateNo + '.pdf';
							    	 if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){
							    		 console.log(letterViewBaseData);
								    	 certificate = auditService.dmlcReviewLetter(letterViewBaseData);
										 certificateName = 'Review Letter_' + res.certificateNo + '.pdf';
									 }
									 else if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){
										 
										 certificate = auditService.dmlcAmendmentLetter(letterViewBaseData);
										 certificateName = 'Amendment Review Letter_' + res.certificateNo + '.pdf';
									 }
							    }else if(res.auditTypeId == scope.AppConstant.IHM_TYPE_ID){
										 if(res.auditSubTypeId == scope.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
											 certificate = auditService.ihmApproveLetter(letterViewBaseData);
											 certificateName = 'Approval Letter_' + res.certificateNo + '.pdf';
										   }else if(res.auditSubTypeId == scope.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
											 certificate = auditService.ihmAmendmentLetter(letterViewBaseData);
											 certificateName = 'Amendment Approval Letter_' + res.certificateNo + '.pdf';
										 }
							    }else if(res.auditTypeId >= scope.AppConstant.SOPEP_TYPE_ID && res.auditTypeId <= scope.AppConstant.COW_TYPE_ID){
									 if(res.auditSubTypeId == scope.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID){
										 certificate = auditService.planApprovalLetter(letterViewBaseData);
										 certificateName = 'Approval Letter_' + res.certificateNo + '.pdf';
									   }else if(res.auditSubTypeId == scope.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID){
										 certificate = auditService.planApprovalLetter(letterViewBaseData);
										 certificateName = 'Amendment Approval Letter_' + res.certificateNo + '.pdf';
									 }
						    }
		
								pdfMake.createPdf(certificate).getBlob(function(dataBlob) {
								    var assesUrl ='';
									
									downloadFiles(new Blob([dataBlob], {type : 'application/pdf'}),letterViewBaseData,assesUrl);
									
								});
				 });
	
			});
	

	
	
	
	
	
	
	function downloadFiles(blob, fileName,assesUrl) {
		
	    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For
																		// IE:
	    	
	    	window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
	    	
	    		var link = document.createElement('a');
     	        link.href = window.URL.createObjectURL(blob);
     	       LtrHist.letterViewBaseData = $sce.trustAsResourceUrl(link.href);
     	      blockUI.stop();
	    	
	    } else {
	    		var link = document.createElement('a');
    	        link.style = "display: none"; 
    	        link.href = window.URL.createObjectURL(blob);
    	        document.body.appendChild(link);
    	        LtrHist.letterViewBaseData = $sce.trustAsResourceUrl(link.href);
    	        blockUI.stop();
    	 }
	}
	
	
	$scope.trustUrl = function(val){
		
		return $sce.trustAsResourceUrl(val);
	
	}    
	
	
	
	
	
	$scope.close = function(result) {
		
		close(result, 0);
		
		$('.modal-backdrop').remove();
		
	};
	
}
    
 /** * IHM Controller */
function ihmController($state,$scope,scope,auditFactory, $http, BASE_URL,$timeout,detailsFactory,$cookies,blockUI,toaster,$window,moment,MMMDDYYYY,YYYYMMDD){
 
	var ihmContr=this;
	    ihmContr.additionalSurvey = "";
	    ihmContr.saveAmendmentDetails = saveAmendmentDetails;
	    ihmContr.additionalSurveySatus = scope.auditDetail.additionalSurvey;
	     
	    ihmContr.companyId    = Number($window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '');
	    ihmContr.closeModal = closeModal;
	    ihmContr.amnStatusChange = amnStatusChange;
	    ihmContr.amSelect = '';
	    console.log("ihmContr.additionalSurveySatus "+ihmContr.additionalSurveySatus);
	    // on load
	    if(ihmContr.additionalSurveySatus == 'N.A' || ihmContr.additionalSurveySatus === undefined){
	    	ihmContr.amSelect = "NO";
	    	ihmContr.additionalSurvey = 'N.A';
	    }else{
	    	ihmContr.amSelect = "YES";
	    	ihmContr.additionalSurvey = scope.auditDetail.additionalSurvey ? moment(scope.auditDetail.additionalSurvey, YYYYMMDD).format(MMMDDYYYY):'';
	    }
	    
	    ihmContr.amNO ='';
	    ihmContr.amYES ='';
	    function amnStatusChange(){
	    	 if(ihmContr.amSelect == 'NO'){
	    		 ihmContr.amNO = 'NO';
	    		 ihmContr.additionalSurvey = 'N.A';
	    	}else if(ihmContr.amSelect == 'YES'){
	    		ihmContr.amYES = 'YES';
	    		ihmContr.additionalSurvey = '';
	    	}
	    }
	    
	    function saveAmendmentDetails(){
	    	if(ihmContr.amSelect == 'YES'){
	    		if(ihmContr.additionalSurvey){
	    			scope.auditDetail.additionalSurvey = ihmContr.additionalSurvey ?  moment(ihmContr.additionalSurvey,MMMDDYYYY).format(YYYYMMDD):'';
	    			scope.valiudateAndExportAmendmentLetter(scope.auditTypeId,   ihmContr.companyId , scope.auditDetail.auditSeqNo);
	    			scope.auditDetail.sspReviewDetail[0].ltrStatus=1; 
	    			closeModal();
	    			close();
	        		
	    		}else{
	    			toaster.warning('please select due date');	
	    		}
	    	}else if(ihmContr.amSelect == 'NO'){
	    		scope.auditDetail.additionalSurvey = 'N.A';
	    		scope.valiudateAndExportAmendmentLetter(scope.auditTypeId,   ihmContr.companyId , scope.auditDetail.auditSeqNo);
	    		scope.auditDetail.sspReviewDetail[0].ltrStatus=1; 
	    		closeModal();
	    		close();
	    	
	    	}
	    	
	    }
	
	    function closeModal(){
	    	$('.modal').remove();
	    	$('.modal-backdrop').remove();
	    }
	    function close(){
	    	close('Cancel');
    		$('.modal-backdrop').remove();
	    }

}


function ReceiptHistoryController(scope,$scope,$cookies,res,$timeout,$sce,blockUI,auditService){
	   console.log(scope)
	      console.log(res)
	   
		var LtrHist=this;
	  /* recHist.auditTypeId=auditTypeId;
	   recHist.companyId=companyId;
	   recHist.auditSeqNo=auditSeqNo;
	   recHist.signerName = signerName;*/
		
		blockUI.start("Opening Letter");
			
		var certificate = "";
		var certificateName = "";
		if(res.auditTypeId == scope.AppConstant.SSP_TYPE_ID){
	    	
			
			 certificate = auditService.sspReceiptLetter(res);
			 
			 if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){

				 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
			 }
			 else if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){

				 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
			 }
	    }else if(res.auditTypeId == scope.AppConstant.DMLC_TYPE_ID){
	    	
	    	 certificate = auditService.dmlcReceiptLetter(res);
	    	
	    	 //certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
	    	 if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){

				 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
			 }
			 else if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){

				 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
			 }
	    }else if(res.auditTypeId >= scope.AppConstant.SOPEP_TYPE_ID && res.auditTypeId <= scope.AppConstant.COW_TYPE_ID){
	    	
	    	 certificate = auditService.planReceiptLetter(res);
	    	
	    	 //certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
	    	 if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID){

				 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
			 }
			 else if(res.auditSubTypeId == scope.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID){

				 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
			 }
	    }
		
		if(res.auditSubTypeId == scope.AppConstant.IHM_INITIAL_AUD_SUBTYPE_ID && res.auditTypeId == scope.AppConstant.IHM_TYPE_ID){
   		 certificate = auditService.ihmReceiptLetter(res);
			 certificateName = 'Receipt Letter_' + res.certificateNo + '.pdf';
			// pdfMake.createPdf(certificate).download(certificateName);
		 }else if(res.auditSubTypeId == scope.AppConstant.IHM_AMENDMENT_AUD_SUBTYPE_ID && res.auditTypeId == scope.AppConstant.IHM_TYPE_ID){
			 certificateName = 'Amendment Receipt Letter_' + res.certificateNo + '.pdf';
			 certificate = auditService.ihmAmendmentReceiptLetter(res);
			// pdfMake.createPdf(certificateAmendment).download(certificateName);
		 }
		
		
		
		pdfMake.createPdf(certificate).getBlob(function(dataBlob) {
		    var assesUrl ='';
			console.log(dataBlob)
			downloadFiles(new Blob([dataBlob], {type : 'application/pdf'}),res,assesUrl);
			
		});
		
		

//		var enc = window.btoa(certificate);
//
//		var decrypt = window.atob(enc);
//	
//		doc.addImage(decrypt, 'PNG', 0, 0, doc.internal.pageSize.width,doc.internal.pageSize.height, "newCertificate", 'FAST');
//
//		doc.save('Receipt Letter_' + res.certificateNo + '.pdf');
		
		blockUI.stop();
		

		
		
		
		
		
		
		function downloadFiles(blob, fileName,assesUrl) {
			
		    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // For
																			// IE:
		    	
		    	window.navigator.msSaveOrOpenBlob(blob, fileName+'.pdf');
		    	
		    		var link = document.createElement('a');
	     	        link.href = window.URL.createObjectURL(blob);
	     	       LtrHist.letterViewBaseData = $sce.trustAsResourceUrl(link.href);
	     	      blockUI.stop();
		    	
		    } else {
		    		var link = document.createElement('a');
	    	        link.style = "display: none"; 
	    	        link.href = window.URL.createObjectURL(blob);
	    	        document.body.appendChild(link);
	    	        LtrHist.letterViewBaseData = $sce.trustAsResourceUrl(link.href);
	    	        blockUI.stop();
	    	 }
		}
		
		
		$scope.trustUrl = function(val){
			
			return $sce.trustAsResourceUrl(val);
		
		}    
		
		
		
		
		
		$scope.close = function(result) {
			
			close(result, 0);
			
			$('.modal-backdrop').remove();
			
		};
}
    
})();
