
/**
 * @package app/src/main/carMaintenance/carDetails
 *
 */

/**
 * @author sourav ghadai
 *
 *
 */
(function() {
	'use strict';

	angular.module('app.carMaintenance.carDetails').controller(
			'CarDetailsController', CarDetailsController);

	function CarDetailsController($compile, $state, carMaintenanceFactory,
			$scope, blockUI, toaster, $cookies, DTOptionsBuilder,$rootScope,broadcastService,
			DTColumnBuilder, ModalService, $q, $http,
			$timeout, MMMDDYYYY, YYYYMMDD, AppConstant) {

		var cardtl = this;

		var defer = $q.defer();

		cardtl.AppConstant = AppConstant;
		
		cardtl.obsCategoryOptions = [];

		cardtl.auditCodeArray = [];

		cardtl.obsStatusOptions = [];

		cardtl.auditSubType = [];
		
		cardtl.statusSeqNo = '';
		
		cardtl.companyId = sessionStorage.getItem("companyId");
		
		cardtl.notAllowUpdate = true;
		
		cardtl.beforeUpdate = true;
		
		cardtl.inspectionAudit = '';
		
		cardtl.dateFormatConversion = dateFormatConversion;

		var audSeqNo = '';
		var findingSeqNo = '';
		var auditTypeId = '';
		var auditTypeSubId='';
		var tempArray = [];

		
		$rootScope.$on('$stateChangeStart', function(event, fromState, toParams,toState){
		
			var element=angular.element(document.getElementById("loader"));
			
			if(cardtl.carDetailsForm){
			
				if(cardtl.carDetailsForm.$dirty==true){
			
					if (broadcastService.confirmService()) {
		
						if(cardtl.detailsScreenValidation()){
							
							cardtl.update();
						
						}else{
							
							event.preventDefault();
						}
					}
				}
			}
		
			element.addClass('hide');
		});
		
		
		$scope.$on('$viewContentLoaded', function(){

			audSeqNo = sessionStorage.getItem('carsrchAudSeqNo');
			findingSeqNo = sessionStorage.getItem('carsrchfindingNo');
			auditTypeId = sessionStorage.getItem('carsrchAuditTypeId');
			
			cardtl.inspectionAudit = auditTypeId==cardtl.AppConstant.MLC_TYPE_ID?'INSPECTION' : auditTypeId==cardtl.AppConstant.DMLC_TYPE_ID? 'REVIEW' : 'AUDIT';

			if(auditTypeId){
			
				carMaintenanceFactory.getObsCategory(auditTypeId,cardtl.companyId).$promise.then(function(res) {
					
					cardtl.obsCategoryOptions = res;
				});

				carMaintenanceFactory.getObsStatus(auditTypeId,cardtl.companyId).$promise.then(function(res) {
						
					cardtl.obsStatusOptions = res;
                });
			}

			if (audSeqNo && findingSeqNo && auditTypeId) {

				carMaintenanceFactory.getHistoryFindingData(Number(audSeqNo), Number(findingSeqNo),cardtl.companyId).$promise.then(function(res) {
					console.log("res"); console.log(res);
						history.previous = true;

						var historyFindingData = res.findingList;
						
						var historyFindingAttachment = res.findingAttachList; 
						
						cardtl.dateFormatConversion(historyFindingData);
						
						cardtl.auditSeqNo = historyFindingData[0].auditSeqNo;
						cardtl.companyId = historyFindingData[0].companyId;
						cardtl.findingSeqNo = historyFindingData[0].findingSeqNo;
						cardtl.serialNo = historyFindingData[0].serialNo;
						cardtl.vesselImoNo = historyFindingData[0].vesselImoNo;
						cardtl.auditTypeId =historyFindingData[0].auditTypeId;
						cardtl.auditTypeDesc = historyFindingData[0].auditTypeDesc;
						cardtl.auditsubtype = historyFindingData[0].audSubTypeDesc;
						cardtl.auditdate = moment(historyFindingData[0].auditDate).format(MMMDDYYYY);
						cardtl.auditor = historyFindingData[0].firstName+' '+historyFindingData[0].lastName;
						cardtl.findingSeqNo = historyFindingData[0].findingSeqNo;
						cardtl.auditCode = historyFindingData[0].auditCode;
						cardtl.auditElements =decodeURIComponent(historyFindingData[0].auditElement);			//changed by @Ramya for Jira id - IRI-5646
						cardtl.categorySection = [];
						cardtl.auditTypeSubId =historyFindingData[0].auditSubTypeId;
						
						historyFindingData.forEach(function(a){
							
							var	nextobsactId = '';
							if(a.categoryId == cardtl.AppConstant.OBS_FINDING_CATEGORY)
								nextobsactId = cardtl.AppConstant.NIL;


									cardtl.categorySection
											.push({
												"currentAuditSeq" : a.currentAuditSeq,
												
												"origAuditSeqNo" : a.origAuditSeqNo,
												
												"companyId" :  a.companyId,
												
												"findingSeqNo" : a.findingSeqNo ? a.findingSeqNo : '',
														
												"statusSeqNo" : a.statusSeqNo ? a.statusSeqNo : '',
														
												"categoryId" : a.categoryId ? a.categoryId : '',
														
												"statusId" : a.findingStatusId ? a.findingStatusId : '',
														
												"statusDate" : a.statusDate ? moment(a.statusDate,YYYYMMDD).format(MMMDDYYYY) : '',
														
												"nextActionId" : a.nextActionId ? a.nextActionId : nextobsactId,
														
												"dueDate" : a.dueDate ? a.dueDate : '',
														
												"descriptions" : a.descriptions ? a.descriptions : '',
														
												"findingRptAttachs" : [],
												
												"updateFlag" : true,
												
												"userIns" : a.userIns ? a.userIns : '',
												
												"dateIns" : a.dateIns ? a.dateIns : moment(Date.now()).format(YYYYMMDD),
														
												"newCreate" : false,
													    
												"updateDescription" : a.updateDescription?a.updateDescription:'',
													    		
												"auditPlace": a.auditPlace?a.auditPlace:''
											});
									cardtl.statusSeqNo = a.statusSeqNo;
									
								});

						cardtl.displayFinging = _(cardtl.obsCategoryOptions).chain().where({'findingsCategoryId' : cardtl.categorySection[cardtl.categorySection.length - 1].categoryId}).pluck('findingsCategoryDesc').toString();

						cardtl.resFindMinDate = moment(moment(res.lastAuditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
						cardtl.length = cardtl.categorySection.length;

						if (cardtl.categorySection[cardtl.categorySection.length - 1].nextActionId && cardtl.nxtAudStatus && cardtl.categorySection[cardtl.categorySection.length - 1].nextActionId != cardtl.AppConstant.CLOSE) {
							
							cardtl.nextActionChange( cardtl.categorySection.length - 1, cardtl.categorySection[cardtl.categorySection.length - 1].nextActionId, auditTypeId);
						}
						
						/*carMaintenanceFactory.checkAuditCompleted(cardtl.vesselImoNo,cardtl.auditTypeId,moment(cardtl.auditdate,MMMDDYYYY).format(YYYYMMDD),cardtl.AppConstant.COMMENCED_AUDIT_STATUS,cardtl.companyId).$promise.then(function(res){
                      
	            	  				cardtl.resFindMinDate = moment(moment(res.lastAuditDate,YYYYMMDD).add(1,'days')).format(YYYYMMDD);
	            	  				
	            	  			//	cardtl.findingMaxDate = new Date();
	            	  				
	            	  				cardtl.nxtAudStatus = res.status;

									if(!cardtl.nxtAudStatus){
										toaster.warning("Current Vessel is under Audit Processing");
									}
									
									cardtl.length = cardtl.categorySection.length;

									if (cardtl.categorySection[cardtl.categorySection.length - 1].nextActionId && cardtl.nxtAudStatus && cardtl.categorySection[cardtl.categorySection.length - 1].nextActionId != cardtl.AppConstant.CLOSE) {
										
									 cardtl.nextActionChange( cardtl.categorySection.length - 1, cardtl.categorySection[cardtl.categorySection.length - 1].nextActionId, auditTypeId);
									}

						});*/

						historyFindingAttachment.forEach(function(a) {
	            	 
									cardtl.categorySection.forEach(function(b, index) {
										
												if (a.findingSeqNo == b.findingSeqNo && a.statusSeqNo == b.statusSeqNo) {
													cardtl.categorySection[index].findingRptAttachs.push({
														
																"currentAuditSeq" : a.currentAuditSeq,
																
																"origAuditSeqNo" : a.origAuditSeqNo,
																
																"companyId" :  a.companyId,
																
																"auditSeqNo" : a.auditSeqNo ? a.auditSeqNo
																		: '',
																"findingSeqNo" : a.findingSeqNo ? a.findingSeqNo
																		: '',
																"statusSeqNo" : a.statusSeqNo ? a.statusSeqNo
																		: '',
																"fileName" : a.fileName ? a.fileName
																		: '',
																"fileSeqNo" : a.fileSeqNo ? a.fileSeqNo
																		: '',
																"ownerFlag" : a.ownerFlag,
																
																"userIns" : a.userIns ? a.userIns : '',
																		
																"dateIns" : a.dateIns ? a.dateIns
																		: moment(Date.now()).format(YYYYMMDD)
															});
												}
										});
						});
						
						if(res && res.findingList && res.findingList.length>0){ 
				        		
				        	sessionStorage.setItem('quickSearchDataVesselImoNo',res.findingList[0].vesselImoNo );
				        	sessionStorage.setItem('quickSearchDataAuditTypeId', res.findingList[0].auditTypeId );
				        	sessionStorage.setItem('quickSearchDataVeslNme', res.findingList[0].vesselName );
				    
				        	}
						

				});
			}
		
			cardtl.setDisplayFinding = function(categoryId){
			
				cardtl.displayFinging = _(cardtl.obsCategoryOptions).chain().where({'findingsCategoryId' : categoryId}).pluck('findingsCategoryDesc').toString();
			}
		
			cardtl.nextActionIDEnable = [];
			
			for(var i=0;i<7;i++){
				cardtl.nextActionIDEnable.push({'status':0});
			}
	});
		

		cardtl.nextActionChange = function(length, nextActionId, auditTypeId) {
			
			if(nextActionId && auditTypeId){
				
			switch (Number(auditTypeId)) {
			
			case cardtl.AppConstant.ISM_TYPE_ID:

				if (cardtl.categorySection[length].nextActionId == cardtl.AppConstant.PREVIOUS_STATUS) {

					cardtl.categorySection.splice(length+1);

					cardtl.categorySection[length].nextActionId = '';
					
					cardtl.categorySection[length].statusDate = '';
					
					cardtl.categorySection[length].dueDate = '';
					
					cardtl.categorySection[length].findingRptAttachs = [];
					
					cardtl.categorySection[length].descriptions = '';

					cardtl.setDisplayFinding(cardtl.categorySection[length].categoryId);

				} else {

					if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN){
						
						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.OPEN;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.PLAN_ACCEPTED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.PLAN_ACCEPTED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.VERIFY_CLOSE;
						$timeout(function(){
			    			$("#description-"+(length + 1)).focus();
			    		},0);
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.PLAN_ACCEPTED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.PLAN_ACCEPTED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.VERIFY_CLOSE;
						$timeout(function(){
			    			$("#description-"+(length + 1)).focus();
			    		},0);
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					}
				}
				break;

			case cardtl.AppConstant.ISPS_TYPE_ID:
				
				if (cardtl.categorySection[length].nextActionId == cardtl.AppConstant.PREVIOUS_STATUS) {

					cardtl.categorySection.splice(length+1);

					cardtl.categorySection[length].nextActionId = '';
					
					cardtl.categorySection[length].statusDate = '';
					
					cardtl.categorySection[length].dueDate = '';
					
					cardtl.categorySection[length].findingRptAttachs = [];
					
					cardtl.categorySection[length].descriptions = '';

					cardtl.setDisplayFinding(cardtl.categorySection[length].categoryId);

				} else {

					if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {
						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.OPEN;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.COMPLAINCE_RESTORED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.COMPLAINCE_RESTORED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.PLAN_ACCEPTED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					}else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.PLAN_ACCEPTED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.VERIFY_CLOSE;
						$timeout(function(){
			    			$("#description-"+(length + 1)).focus();
			    		},0);
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.COMPLAINCE_RESTORED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.COMPLAINCE_RESTORED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.PLAN_ACCEPTED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.PLAN_ACCEPTED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.VERIFY_CLOSE;
						$timeout(function(){
			    			$("#description-"+(length + 1)).focus();
			    		},0);
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					}
				}
				break;

			case cardtl.AppConstant.MLC_TYPE_ID:

				if (cardtl.categorySection[length].nextActionId == cardtl.AppConstant.PREVIOUS_STATUS) {

					cardtl.categorySection.splice(length+1);

					cardtl.categorySection[length].nextActionId = '';
					
					cardtl.categorySection[length].statusDate = '';
					
					cardtl.categorySection[length].dueDate = '';
					
					cardtl.categorySection[length].findingRptAttachs = [];
					
					cardtl.categorySection[length].descriptions = '';

					cardtl.setDisplayFinding(cardtl.categorySection[length].categoryId);

				} else {

					if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {
						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.OPEN;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.COMPLAINCE_RESTORED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.COMPLAINCE_RESTORED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.PLAN_ACCEPTED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					}else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.PLAN_ACCEPTED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.VERIFY_CLOSE;
						$timeout(function(){
			    			$("#description-"+(length + 1)).focus();
			    		},0);
						cardtl.setDisplayFinding(cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.OPEN) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.COMPLAINCE_RESTORED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.COMPLAINCE_RESTORED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.PLAN_ACCEPTED;
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					} else if (cardtl.categorySection[length].categoryId == cardtl.AppConstant.MINOR_FINDING_CATEGORY
							&& cardtl.categorySection[length].statusId == cardtl.AppConstant.PLAN_ACCEPTED) {

						cardtl.categorySection.push(cardtl.addCategory());
						cardtl.categorySection[length + 1].categoryId = cardtl.AppConstant.MINOR_FINDING_CATEGORY;
						cardtl.categorySection[length + 1].statusId = cardtl.AppConstant.VERIFY_CLOSE;
						$timeout(function(){
			    			$("#description-"+(length + 1)).focus();
			    		},0);
						cardtl.setDisplayFinding(cardtl.AppConstant.MINOR_FINDING_CATEGORY);

					}
				}
				break;

			 }
			}
			
			if(cardtl.beforeUpdate){
				if(cardtl.categorySection[cardtl.length].statusDate && cardtl.categorySection[cardtl.length].nextActionId){
					cardtl.notAllowUpdate = false;
					}else{
					cardtl.notAllowUpdate = true;
					}
				}
		}

		cardtl.addCategory = function() {

			cardtl.statusSeqNo = (Number(cardtl.statusSeqNo) + 1);

			return {
				"findingSeqNo" : cardtl.findingSeqNo,
				
				"statusSeqNo" : cardtl.statusSeqNo,
				
				"categoryId" : '',
				
				"statusId" : '',
				
				"statusDate" : '',
				
				"nextActionId" : '',
				
				"dueDate" : '',
				
				"descriptions" : '',
				
				"findingRptAttachs" : [],
				
				"updateFlag" : false,
				
				"newCreate" : true

			};
		}
		cardtl.preview = function(file, index,cIndex) {

			var seqNo = cardtl.auditSeqNo;

			var findingSeqNo = cardtl.categorySection[index].findingSeqNo;

			var statusSeqNo = cardtl.categorySection[index].statusSeqNo;
			
			var fileExtension = file.split('.').pop(); 

			var inputs = {

				ModalData : '',

				fileData : {
					"fileName"    : file,
					"audSeqNo"    : cardtl.auditSeqNo,
					"findNo"      : findingSeqNo,
					"findSeqNo"   : statusSeqNo,
					"audType"     : cardtl.auditTypeDesc,
					"byteArray"   : cardtl.categorySection[index].findingRptAttachs[cIndex].findingFileByte,
					"auditTypeId" : cardtl.auditTypeId
				}

			};
			
			carMaintenanceFactory.downloadFindingFile(cardtl.auditSeqNo,findingSeqNo,file,statusSeqNo,cardtl.auditTypeDesc,cardtl.companyId).$promise
					.then(function(res) {
						
						if(fileExtension == 'xlsx' || fileExtension == 'docx' || fileExtension == 'xls' || fileExtension == 'doc'){
		    	        	
		    				if(inputs.fileData.byteArray){
		    					
		    					var bytes = new Uint8Array(inputs.fileData.byteArray.length);
		    		    	    
		    		    	    for (var i = 0; i < inputs.fileData.byteArray.length ; i++){
		    		    	        bytes[i] = inputs.fileData.byteArray.charCodeAt(i);
		    		    	     }
		    		    	   
		    		    	    cardtl.downloadFiles(new Blob([bytes.buffer], {type : res.headersGetter('content-type')}),file);
		    		    	    
		    		    	    blockUI.stop();
		            			return;
		    					
		    				}
		    				cardtl.downloadFiles(new Blob([res.data], {type : res.headersGetter('content-type')}),file);
		    				return;
		                  }
						
						if (res.status == 200 || inputs.fileData.byteArray) {
							
							
							ModalService.showModal({
		    	    			
		    	    			templateUrl : 'src/modals/findingPreview.html',
		    	    			
		    	    			controller  : "findingFilePreviewController as fPrv",
		    	    			
		    	    			inputs : inputs
		    	    		
		    	    		}).then(function(modal) {
		    	    			
		    	    			modal.element.modal();
		    	    			
		    	    			cardtl.findingFileClick = true;
		    	    			
		    	    			modal.close.then(function(result) {
		    	    				
		    	    				blockUI.stop();
		    	    			});
		    	    			
		    	    		}); 
						}
					});
		}
		
		window.onpopstate = function() {
			
			angular.element(document.getElementsByClassName("bootstrap-datetimepicker-widget")).addClass('hide');
			
			
    		$state.go('app.carMaintenance.carSearch',{'currPageNo':sessionStorage.getItem('carSrchPageNo')},{ reload: true });
    	}
		
		cardtl.back = function() {
			
			$state.go('app.carMaintenance.carSearch',{'currPageNo':sessionStorage.getItem('carSrchPageNo')},{ reload: true });
			
		}

		cardtl.downloadFindingFile = function(fileName, index,cIndex) {

			blockUI.start();
			
			var seqNo = cardtl.auditSeqNo;

			var findingSeqNo = cardtl.categorySection[index].findingSeqNo;

			var statusSeqNo = cardtl.categorySection[index].statusSeqNo;
			
			var findingFileByte = cardtl.categorySection[index].findingRptAttachs[cIndex].findingFileByte;

			if(findingFileByte){
				
				var bytes = new Uint8Array(findingFileByte.length);
	    	    
	    	    for (var i = 0; i < findingFileByte.length ; i++){
	    	        bytes[i] = findingFileByte.charCodeAt(i);
	    	     }
	    	   
	    	    cardtl.downloadFiles(new Blob([bytes.buffer], {type : 'content-type'}),fileName);
	    	    
	    	    blockUI.stop();
    			return;
    		}
			
		carMaintenanceFactory.downloadFindingFile(cardtl.auditSeqNo,findingSeqNo,fileName,statusSeqNo,cardtl.auditTypeDesc,cardtl.companyId).$promise
					.then(function(res) {
						
						if (res.status == 200) {
							cardtl.downloadFiles(new Blob([ res.data ], {
								type : 'Content-Type'
							}), fileName);
						} else {
							toaster.warning(res.data);
							blockUI.stop();
						}
					});
			blockUI.stop();
		}
		
		
         

		cardtl.downloadFiles = function(blob, fileName) {

			if (window.navigator.msSaveOrOpenBlob) { // For IE:

				navigator.msSaveBlob(blob, fileName);

			} else { // For other browsers:   
    	    	
    	        var link = document.createElement('a');
    	        link.style = "display: none"; 
    	        link.href = window.URL.createObjectURL(blob);  
    	        document.body.appendChild(link);
    	        link.download = fileName;    
    	        
    	        link.click();
    	        setTimeout(function(){
    	            document.body.removeChild(link);
    	            window.URL.revokeObjectURL(link.href);  
    	        }, 1000);  
    	    
    	     }
		}

		cardtl.removeFindingFiles = function(file, pIndex, index, statusSeqNo, fileSeqNo) {
    		
    		ModalService.showModal({
    			
    			templateUrl : 'src/modals/deleteAttachment.html',
    			
    			controller  : 'removeReportController',
    			
    			inputs		: {data:'Attachment'},
    			
    		}).then(function(modal) {
    			
    			modal.element.modal();
    				    			
    			modal.close.then(function(result) {
    				if(result=='YES'){
    					blockUI.start();
    					if(file.newUpload){
    						
    		            	   cardtl.categorySection[pIndex].findingRptAttachs.splice(index, 1);
    		            	   blockUI.stop(); 
    		            	   
    		               }else{
    		            	  
    		            	   var data = {
    							"currentAuditSeq" : file.currentAuditSeq ? file.currentAuditSeq
    									: cardtl.AppConstant.CAR_UPDATED_CURRENT_SEQ,
    							"origAuditSeqNo" : file.origAuditSeqNo ? file.origAuditSeqNo
    									: cardtl.auditSeqNo,
    									
    							"companyId" :  file.companyId ? file.companyId:sessionStorage.getItem("companyId"),
    									
    							"auditTypeId" : cardtl.auditTypeId,
    									
    							"seqNo" : Number(file.fileSeqNo),
    							
    							"findingSeqNo" : file.findingSeqNo ? file.findingSeqNo
    									: cardtl.findingSeqNo,
    									
    							"statusSeqNo" : file.statusSeqNo ? file.statusSeqNo
    									:cardtl.categorySection[pIndex].statusSeqNo,
    									
    							"fileName" : file.fileName ? file.fileName
    									: '',
    							"fileSeqNo" : file.fileSeqNo ? file.fileSeqNo
    									: '',
    							"ownerFlag" : file.ownerFlag ? file.ownerFlag
    									: 0,
    						    "findingFileByte" : file.findingFileByte ? btoa(file.findingFileByte):null,
    									
    						    "userIns" : file.userIns ? file.userIns : (sessionStorage.getItem("emailId")).toString(),
    									
    							"dateIns" : file.dateIns ? file.dateIns
    									: moment(Date.now()).format(YYYYMMDD)
    						};
    		            	   
    		            	   
    		            	   carMaintenanceFactory.unlinkFindingFiles(data,cardtl.auditTypeDesc,cardtl.companyId).$promise
    							.then(function(res) {
    								
    								/*cardtl.categorySection[pIndex].findingRptAttachs.splice(
    										index, 1);*/
    								
    								if (res.fileName) {

    									cardtl.categorySection[pIndex].findingRptAttachs.splice(
    											index, 1);

    								}
    								
    							});
    		            	   blockUI.stop(); 
    		               }
    				}
    			});
    			
    		});
    	}

		cardtl.getCarDetailsScreenData = function() {

			var findingData ={}, findingDetail = [];
			

			cardtl.categorySection
					.forEach(function(a, index) {

						if (a.statusDate && a.newCreate
								&& (a.nextActionId || a.statusId == cardtl.AppConstant.CLOSE || a.categoryId == cardtl.AppConstant.OBS_FINDING_CATEGORY)) {

							var findingAttachment = [];
							
							a.findingRptAttachs.forEach(function(b) {
								
								findingAttachment.push({
											"currentAuditSeq" : b.currentAuditSeq ? b.currentAuditSeq
													: cardtl.AppConstant.CAR_UPDATED_CURRENT_SEQ,
											"origAuditSeqNo" : b.origAuditSeqNo ? b.origAuditSeqNo
													: cardtl.auditSeqNo,
													
											"companyId" :  a.companyId ? a.companyId:sessionStorage.getItem("companyId"),
													
											"auditTypeId" : cardtl.auditTypeId,
													
											"seqNo" : Number(b.fileSeqNo),
											
											"findingSeqNo" : a.findingSeqNo ? a.findingSeqNo
													: '',
											"statusSeqNo" : a.statusSeqNo ? a.statusSeqNo
													: '',
											"fileName" : b.fileName ? b.fileName
													: '',
											"fileSeqNo" : b.fileSeqNo ? b.fileSeqNo
													: '',
											"ownerFlag" : b.ownerFlag ? b.ownerFlag
													: 0,
										    "findingFileByte" : b.findingFileByte ? btoa(b.findingFileByte):null,
													
										    "userIns" : b.userIns ? b.userIns : (sessionStorage.getItem("emailId")).toString(),
													
											"dateIns" : b.dateIns ? b.dateIns
													: moment(Date.now()).format(YYYYMMDD)
										});
							});
							
							
							findingDetail.push({
										"currentAuditSeq" : a.currentAuditSeq ? a.currentAuditSeq
												: cardtl.AppConstant.CAR_UPDATED_CURRENT_SEQ,
										"origAuditSeqNo" : a.origAuditSeqNo ? a.origAuditSeqNo
												: cardtl.auditSeqNo,
												
										"companyId" :  a.companyId ? a.companyId:sessionStorage.getItem("companyId"),
												
									    "auditTypeId" : cardtl.auditTypeId,
												
										"seqNo" : index + 1,
										
										"findingSeqNo" : a.findingSeqNo ? a.findingSeqNo : '',
												
										"statusSeqNo" : a.statusSeqNo ? a.statusSeqNo : '',
												
										"categoryId" : a.categoryId ? a.categoryId : '',
													
										"statusId" : a.statusId ? a.statusId : '', 
												
										"statusDate" : a.statusDate ? moment(a.statusDate,MMMDDYYYY).format(YYYYMMDD): '',
												
										"nextActionId" : a.nextActionId ? a.nextActionId : '',
												
										"dueDate" : a.dueDate ? a.dueDate : '',
												
										"descriptions" : a.descriptions ? a.descriptions : '',
												
										"updateFlag" : a.updateFlag,
										
										"userIns" : a.userIns ? a.userIns : (sessionStorage.getItem("emailId")).toString(),
										
										"dateIns" : a.dateIns ? moment(a.dateIns,MMMDDYYYY).format(YYYYMMDD) : moment(Date.now()).format(YYYYMMDD),
												
									   "findingRptAttachs":findingAttachment
									   
										
									});
							

						}// if
					});
			
			findingData={
				
				"findingSeqNo" : cardtl.findingSeqNo,
				    				
				"auditSeqNo" : cardtl.auditSeqNo,
			
				"companyId" : cardtl.companyId,
				
				"auditTypeId" : cardtl.auditTypeId,
			
				"auditDate" : moment(cardtl.auditdate,MMMDDYYYY).format(YYYYMMDD),
			
				"auditCode" : cardtl.auditCode,
				
				"userIns" : (sessionStorage.getItem("emailId")).toString(),
				
				"dateIns" : moment(new Date()).format(YYYYMMDD),
				
				"findingDetail" : findingDetail
		
			};
	

			/*var data = {
				'auditSeqNo' : cardtl.auditSeqNo,
				'findingSeqNo' : cardtl.findingSeqNo,
				'findingDetail' : findingDetail,
				'findingRptAttach' : findingAttachment,
				'companyId' : 2,
				'userIns' : (sessionStorage.getItem("emailId")).toString()
			};*/

			return findingDetail;
		}
		
		cardtl.detailsScreenValidation = function (){
			
			var flag = true;
			
			/*cardtl.categorySection.forEach(function(a,index){
				
				if(index != cardtl.categorySection.length-1){
					if(!a.statusDate){
						toaster.warning("Please Give Status Date For No."+(index+1)+" Finding Status Row. ");
						flag =  false;
					}
				}
			});*/
			if(cardtl.categorySection[cardtl.categorySection.length-1].nextActionId && !(cardtl.categorySection[cardtl.categorySection.length-1].statusDate)){
				toaster.warning("Please Enter Status Date.");
				flag =  false;
			}else if(cardtl.categorySection[cardtl.categorySection.length-1].statusDate && !(cardtl.categorySection[cardtl.categorySection.length-1].nextActionId)){
				toaster.warning("Please Select NextAction.");
				flag =  false;
			}
			
			return flag;
		}

		cardtl.update = function() {
			
			
			if(cardtl.detailsScreenValidation()){
			var carDetailsScreenData = cardtl.getCarDetailsScreenData();
			
			if(tempArray.length <= carDetailsScreenData.length){
			 tempArray = carDetailsScreenData;
		    }else{
		    	
		    	tempArray.forEach(function(findingDetail){
		    	carMaintenanceFactory.updateCarMaintainanceFinding(findingDetail,'Delete',cardtl.auditTypeDesc,cardtl.companyId).$promise.then(function(res) {
		    		
		    	});
		    	});		
		    	tempArray = carDetailsScreenData;
		    }
			
			blockUI.start("Updating Finding Record");

			carDetailsScreenData.forEach(function(findingDetail,index){
			
				var updateFlag;
				if(findingDetail.updateFlag){
					updateFlag = 'Update';
				}else{
					updateFlag = 'Create';
				}
				
			carMaintenanceFactory.updateCarMaintainanceFinding(findingDetail,updateFlag,cardtl.auditTypeDesc,cardtl.companyId).$promise.then(function(res) {
						
						if (res.statusSeqNo) {

							if(carDetailsScreenData.length == index+1){
							$timeout(function(){
								toaster.success("Data Updated Successfully");
							
								$scope.$broadcast('parent',"true");
            					blockUI.stop();
            					},500);
							if(cardtl.carDetailsForm){
							cardtl.carDetailsForm.$dirty=false;
							}
							}
							
							cardtl.categorySection.forEach(function(a, index) {

								if (a.statusDate && a.newCreate
										&& (a.nextActionId || a.statusId == cardtl.AppConstant.CLOSE || a.categoryId == cardtl.AppConstant.OBS_FINDING_CATEGORY)) {
									
									cardtl.categorySection[index].updateFlag = true;
									
									cardtl.categorySection[index].findingRptAttachs.forEach(function(b,cIndex){
										
										cardtl.categorySection[index].findingRptAttachs[cIndex].newUpload = false;
										
									});
								}
							});
						} else {

							blockUI.stop();

							console.log("error : "+res);

						}
					});
			});
			
			if(carDetailsScreenData.length == 0){
				blockUI.stop();
				toaster.success("Data Updated Successfully");
				}
			
			$timeout(function(){
    			$().focus();
    		},0);
			
			cardtl.beforeUpdate = false;
		}
		}

		cardtl.setArrayIndex = function(index, b, statusSeqNo, d) {

			cardtl.index = index;
			cardtl.statusSeqNo = statusSeqNo;
			angular.element("input[type='file']").val(null);
			
		}

		cardtl.uploadFindingsAttach = function(val,index) {
			
				blockUI.start("Uploading Report");
			
             if (val) {
				var fileSeqNo;
				
				var fileData = cardtl.categorySection[cardtl.index].findFileData;
	    		
				if(fileData){
					
					var fileName = fileData.name.substr(0,fileData.name.lastIndexOf("."));
					
				if(fileName.length<=70){
					
				if (cardtl.categorySection[cardtl.index].findingRptAttachs.length > 0) {
						var x = cardtl.categorySection[cardtl.index].findingRptAttachs;
						fileSeqNo = x[x.length - 1].fileSeqNo;
						fileSeqNo = Number(fileSeqNo) + 1;
					} else {
						fileSeqNo = 1;
					}
				

					var reader = new FileReader();
					
				reader.onload = function(readerEvt) {
					
					if (cardtl.validateFileNames(fileData.name,val)){
						//var binaryImage = readerEvt.target.result;

						var binaryImage = '';
						
						var bytes = new Uint8Array(reader.result);
						
	    				var length = bytes.byteLength;
	    				for (var i = 0; i < length; i++) {
	    					binaryImage += String.fromCharCode(bytes[i]);
	    				}
	    				
	    				cardtl.categorySection[cardtl.index].findingRptAttachs.push({
													"fileName"        : fileData.name,
													"fileSeqNo"       : fileSeqNo,
													"findingFileByte" : binaryImage,
													"ownerFlag"       : 0,
													"newUpload"       : true,
												});
									
					$timeout(function() {
						blockUI.stop();
					}, 1000);
									
					toaster.success("File Uploaded Successfully");
								
					} else {
						$timeout(function() {
							blockUI.stop();
							toaster.warning(fileData.name + " Already Exists");
						}, 1000);
					}
				   };
				   reader.readAsArrayBuffer(fileData);
				}else{
					$timeout(function() {
						blockUI.stop();
						toaster.warning("File name should be less than 70 characters");
					}, 1000);
				}
			}else{
    			$timeout(function(){
					blockUI.stop();
					},1000);
    		}

			}else{
    			$timeout(function(){
					blockUI.stop();
					},1000);
    		}
    		
    	}

		cardtl.validateFileNames = function(name, param) {
			var flag = true;
			if (param == "CAR") {
				cardtl.categorySection[cardtl.index].findingRptAttachs
						.forEach(function(a) {
							if (a.fileName == name) {
								flag = false;
							}
						});
			}
			return flag;
		}

		cardtl.setFindDueDate = function(index, categoryId, nActionId) {
			
			if(cardtl.beforeUpdate){
				if(cardtl.categorySection[cardtl.length].statusDate && cardtl.categorySection[cardtl.length].nextActionId){
					cardtl.notAllowUpdate = false;
					}else{
					cardtl.notAllowUpdate = true;
					}
				}
			
			if (cardtl.auditTypeId == cardtl.AppConstant.ISM_TYPE_ID) {

				switch (categoryId) {

				case cardtl.AppConstant.MAJOR_FINDING_CATEGORY:
					if (nActionId == cardtl.AppConstant.DOWNGRADED) {
						cardtl.categorySection[index].dueDate = 'CURRENT '+cardtl.inspectionAudit;
					}
					break;
				case cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY:
					
					if (nActionId == cardtl.AppConstant.PLAN_ACCEPTED) {  
						if (cardtl.categorySection[0].statusDate) {  
							cardtl.categorySection[index].dueDate = moment(
									cardtl.categorySection[0].statusDate,
									MMMDDYYYY).add(30, 'days')
									.format(MMMDDYYYY);
						}
						
					}else if(nActionId == cardtl.AppConstant.VERIFY_CLOSE)
					{  
						if (cardtl.categorySection[0].statusDate) { 
						cardtl.categorySection[index].dueDate = moment(
								cardtl.categorySection[0].statusDate,
								MMMDDYYYY).add(90, 'days')
								.format(MMMDDYYYY);
						     }
				    }else if (nActionId == cardtl.AppConstant.CLOSE) {
						if (cardtl.categorySection[0].statusDate) { 
							//cardtl.categorySection[index].dueDate = moment(cardtl.categorySection[0].statusDate,MMMDDYYYY).add(90, 'days')
								///	.format(MMMDDYYYY);
							cardtl.categorySection[index].dueDate='N.A';
							
						}
					} /*else if (!nActionId) {
						cardtl.categorySection[index].dueDate = 'N.A';
					}*/
					break;

				case cardtl.AppConstant.MINOR_FINDING_CATEGORY:
					if (nActionId == cardtl.AppConstant.PLAN_ACCEPTED) {
						if (cardtl.categorySection[0].statusDate) {
							cardtl.categorySection[index].dueDate = moment(
									cardtl.categorySection[0].statusDate,
									MMMDDYYYY).add(30, 'days')
									.format(MMMDDYYYY);
						}
					} else if (nActionId == cardtl.AppConstant.VERIFY_CLOSE) {
						cardtl.categorySection[index].dueDate = 'NEXT SCHEDULE AUDIT';
					} else if (nActionId==cardtl.AppConstant.CLOSE) {
						cardtl.categorySection[index].dueDate = 'N.A';
					}
					break;
					}
			}
			
			else if (cardtl.auditTypeId == cardtl.AppConstant.ISPS_TYPE_ID) {
				
				  switch (categoryId) {
				  
					case cardtl.AppConstant.MAJOR_FINDING_CATEGORY:
						if(nActionId == cardtl.AppConstant.DOWNGRADED){					
							cardtl.categorySection[index].dueDate = 'DURING CURRENT '+cardtl.inspectionAudit;
						}			
						break;
					case cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY: 
						if(nActionId == cardtl.AppConstant.COMPLAINCE_RESTORED){
							
								cardtl.categorySection[index].dueDate = 'DURING CURRENT '+cardtl.inspectionAudit;
							
						}else if(nActionId == cardtl.AppConstant.PLAN_ACCEPTED){
							if(cardtl.categorySection[0].statusDate){
								cardtl.categorySection[index].dueDate = moment(
										cardtl.categorySection[0].statusDate,
										MMMDDYYYY).add(30, 'days')
										.format(MMMDDYYYY);
								}
						}else if(nActionId == cardtl.AppConstant.VERIFY_CLOSE)
						{  
							if (cardtl.categorySection[0].statusDate) { 
							cardtl.categorySection[index].dueDate = moment(
									cardtl.categorySection[0].statusDate,
									MMMDDYYYY).add(90, 'days')
									.format(MMMDDYYYY);
							     }
					    }else if(nActionId == cardtl.AppConstant.CLOSE){
							if(cardtl.categorySection[0].statusDate){
								/*cardtl.categorySection[index].dueDate = moment(
										cardtl.categorySection[0].statusDate,
										MMMDDYYYY).add(90, 'days')
										.format(MMMDDYYYY);*/
								cardtl.categorySection[index].dueDate='N.A';
							}
						}
						break;
						
					case cardtl.AppConstant.MINOR_FINDING_CATEGORY:
						if(nActionId == cardtl.AppConstant.COMPLAINCE_RESTORED){
							if(cardtl.categorySection[0].statusDate){
								cardtl.categorySection[index].dueDate = 'DURING CURRENT '+cardtl.inspectionAudit;
							}
						}else if(nActionId == cardtl.AppConstant.PLAN_ACCEPTED){
							if(cardtl.categorySection[0].statusDate){
								cardtl.categorySection[index].dueDate = moment(
										cardtl.categorySection[0].statusDate,
										MMMDDYYYY).add(30, 'days')
										.format(MMMDDYYYY);
								}
						}else if(nActionId == cardtl.AppConstant.VERIFY_CLOSE)
						{  
							if (cardtl.categorySection[0].statusDate) { 
								cardtl.categorySection[index].dueDate = 'SCHEDULED NEXT AUDIT';
							     }
					    }else if(nActionId == cardtl.AppConstant.CLOSE){
							cardtl.categorySection[index].dueDate = 'N.A';
						}			
						break;
					}
				  }
			
	else if (cardtl.auditTypeId == cardtl.AppConstant.MLC_TYPE_ID) {
		
	  switch (categoryId) {
	  
		case cardtl.AppConstant.MAJOR_FINDING_CATEGORY:
			if(nActionId == cardtl.AppConstant.DOWNGRADED){					
				cardtl.categorySection[index].dueDate = 'CURRENT '+cardtl.inspectionAudit;
			}			
			break;
			
		case cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY: 
			
			if(nActionId == cardtl.AppConstant.COMPLAINCE_RESTORED){
				
					cardtl.categorySection[index].dueDate = 'DURING CURRENT '+cardtl.inspectionAudit;
				
			}else if(nActionId == cardtl.AppConstant.PLAN_ACCEPTED){
				if(cardtl.auditTypeSubId !=cardtl.AppConstant.RENEWAL_SUB_TYPE_ID && cardtl.auditTypeSubId !=cardtl.AppConstant.INITIAL_SUB_TYPE_ID)
				{
				cardtl.categorySection[index].dueDate =  cardtl.categorySection[index].statusDate;
				}
				
			}else if(nActionId == cardtl.AppConstant.VERIFY_CLOSE){
				if(cardtl.categorySection[0].statusDate){
					cardtl.categorySection[index].dueDate = moment(
							cardtl.categorySection[0].statusDate,
							MMMDDYYYY).add(90, 'days')
							.format(MMMDDYYYY);
				
					}
			}else if(nActionId==cardtl.AppConstant.CLOSE){
				cardtl.categorySection[index].dueDate = 'N.A';
			}	
			break;
			
		case cardtl.AppConstant.MINOR_FINDING_CATEGORY: 
			
			if(nActionId == cardtl.AppConstant.COMPLAINCE_RESTORED){
				cardtl.categorySection[index].dueDate = 'DURING CURRENT '+cardtl.inspectionAudit;
			}else if(nActionId == cardtl.AppConstant.PLAN_ACCEPTED){ 
				//cardtl.categorySection[index].dueDate = 'PRIOR TO DEPARTING VESSEL';
			
			if(cardtl.auditTypeSubId !=cardtl.AppConstant.RENEWAL_SUB_TYPE_ID && cardtl.auditTypeSubId !=cardtl.AppConstant.INITIAL_SUB_TYPE_ID)
				{
				cardtl.categorySection[index].dueDate =  cardtl.categorySection[index].statusDate;
				}
			}else if(nActionId == cardtl.AppConstant.VERIFY_CLOSE){
				cardtl.categorySection[index].dueDate = 'NEXT SCHEDULED AUDIT';
			}else if(nActionId == cardtl.AppConstant.CLOSE){
				cardtl.categorySection[index].dueDate = 'N.A';
			}				
			break;
		
		}
	  }
	}
		
		cardtl.nextActionDisable =  function (index,categoryId,findingStatusId){
			
			switch(cardtl.auditTypeId){
			
			case cardtl.AppConstant.ISM_TYPE_ID:
				
				if(categoryId==cardtl.AppConstant.MAJOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.DOWNGRADED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.PLAN_ACCEPTED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.PLAN_ACCEPTED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.VERIFY_CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.VERIFY_CLOSE){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.PLAN_ACCEPTED;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.PLAN_ACCEPTED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.VERIFY_CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.VERIFY_CLOSE){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.CLOSE;
				}
				break;
				
			case cardtl.AppConstant.ISPS_TYPE_ID:
				
				if(categoryId==cardtl.AppConstant.MAJOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.DOWNGRADED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.COMPLAINCE_RESTORED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.COMPLAINCE_RESTORED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.PLAN_ACCEPTED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.PLAN_ACCEPTED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.VERIFY_CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.VERIFY_CLOSE){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.COMPLAINCE_RESTORED;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.COMPLAINCE_RESTORED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.PLAN_ACCEPTED;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.PLAN_ACCEPTED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.VERIFY_CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.VERIFY_CLOSE){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.CLOSE;
					
				}
				break;
				
		    case cardtl.AppConstant.MLC_TYPE_ID:
		    	
		    	if(categoryId==cardtl.AppConstant.MAJOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.DOWNGRADED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.COMPLAINCE_RESTORED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.COMPLAINCE_RESTORED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.PLAN_ACCEPTED;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.PLAN_ACCEPTED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.VERIFY_CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.VERIFY_CLOSE){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.OPEN){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.COMPLAINCE_RESTORED;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.COMPLAINCE_RESTORED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.PLAN_ACCEPTED;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.PLAN_ACCEPTED){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.VERIFY_CLOSE;
					
				}else if(categoryId==cardtl.AppConstant.MINOR_FINDING_CATEGORY && findingStatusId==cardtl.AppConstant.VERIFY_CLOSE){
					
					cardtl.nextActionIDEnable[index].status = cardtl.AppConstant.CLOSE;
					
				}
				break;
				
			}
		}
		
		cardtl.setFindingMinDate = function(index){
			var date = moment(cardtl.categorySection[index-1].statusDate,MMMDDYYYY).format(YYYYMMDD);
			
			cardtl.findingMinDate = cardtl.resFindMinDate < date ? date : cardtl.resFindMinDate;
		}
		
         function dateFormatConversion(historyFindingData){
        	
        	historyFindingData.forEach( function(id,index){
    				
    				historyFindingData[index].auditDate = historyFindingData[index].auditDate?moment(historyFindingData[index].auditDate):'';
        			
        			historyFindingData[index].dateIns = historyFindingData[index].dateIns?moment(historyFindingData[index].dateIns):'';
            		
        			historyFindingData[index].statusDate = historyFindingData[index].statusDate ?moment(historyFindingData[index].statusDate):'';
    			
    			});
    		
    	 }
	}
})();