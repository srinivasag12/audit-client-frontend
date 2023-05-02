(function() {
	'use strict';

	angular.module('app.audit.findings')

	.controller('FindingsController', FindingsController);

	function FindingsController(detailsFactory, $window, $state,
			findingsFactory, $timeout, masterData, AppConstant,
			CarFlowStructure, auditFactory, $scope, blockUI, MMMDDYYYY,
			YYYYMMDD, DDMMMYYYY, HHmm, toaster, $cookies, ModalService,
			auditType, $rootScope, broadcastService, auditorName) {

		var cfind = this;

		cfind.showSwitch = true;

		cfind.AppConstant = AppConstant;

		cfind.auditTypeId = parseInt($window.sessionStorage
				.getItem("auditTypeId"));

		cfind.inspectionAudit = cfind.auditTypeId == cfind.AppConstant.MLC_TYPE_ID ? 'INSPECTION'
				: 'AUDIT';

		cfind.auditSeqNo = parseInt($window.sessionStorage
				.getItem('auditSeqNo'));

		cfind.companyId = $window.sessionStorage.getItem('companyId') ? $window.sessionStorage
				.getItem('companyId')
				: sessionStorage.getItem('companyId')
						&& sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '';

		cfind.CarFlowStructure = CarFlowStructure;

		cfind.obsCategoryOptions = masterData.obsCategory;

		cfind.obsStatusOptions = masterData.obsStatus;

		cfind.auditCodeArray = masterData.auditCodes;

		cfind.maPort = masterData.maPort;

		cfind.findingsNo = 1;

		cfind.priorToDepatVsl = 'PRIOR TO DEPARTING VESSEL';

		cfind.ispsEndorse = false;

		cfind.userRoleId = sessionStorage.getItem('userRoleId');

		cfind.loginUserId = sessionStorage.getItem('emailId');

		cfind.setUpdateDescOnPlaceChange = setUpdateDescOnPlaceChange;

		cfind.setSerialNoAndStatusDate = setSerialNoAndStatusDate;

		cfind.auditAuditorDetail = {};

		cfind.reviwerlogin = false;

		cfind.auditReportNo = '';

		cfind.observationarray = [ {

			'displayFinging' : '',

			'auditSeqNo' : Number(cfind.auditSeqNo),

			'findingSeqNo' : 1,

			'companyId' : Number(cfind.companyId),

			'auditTypeId' : cfind.auditTypeId ? cfind.auditTypeId : '',

			'auditDate' : cfind.auditDate ? moment(cfind.auditDate, MMMDDYYYY)
					.format(YYYYMMDD) : '',

			'auditCode' : '',

			'auditElements' : '',

			'selection' : '',

			'findingStatus' : 0,

			'userIns' : (sessionStorage.getItem('emailId')).toString(),

			'dateIns' : moment(new Date()).format(YYYYMMDD),

			'findingDetail' : [ {

				'statusSeqNo' : 1,

				'findingSeqNo' : 1,

				'origAuditSeqNo' : Number(cfind.auditSeqNo),

				'currentAuditSeq' : Number(cfind.auditSeqNo),

				'companyId' : Number(cfind.companyId),

				'auditTypeId' : cfind.auditTypeId ? cfind.auditTypeId : '',

				'categoryId' : '',

				'statusId' : '',

				'statusDate' : '',

				'nextActionId' : '',

				'dueDate' : '',

				'descriptions' : '',

				'userIns' : (sessionStorage.getItem('emailId')).toString(),

				'dateIns' : moment(new Date()).format(YYYYMMDD),

				'findingRptAttachs' : []
			} ],

			'newCreate' : true

		} ];

		/** **** function declaration ***** */

		cfind.auditHome = auditHome;

		cfind.setDisplayFinding = setDisplayFinding;

		cfind.addCategory = addCategory;

		cfind.setAuditElement = setAuditElement;

		cfind.nextActionChange = nextActionChange;

		cfind.save = saveFinding;

		cfind.findingValidation = findingValidation;

		cfind.setFindingData = setFindingData;

		cfind.momentDateConverter = momentDateConverter;

		cfind.setCurFindDueDate = setCurFindDueDate;

		cfind.uploadFindingsAttach = uploadFindingsAttach;

		cfind.removeItem = removeItem;

		cfind.clearFileType = clearFileType;

		cfind.downloadFiles = downloadFiles;

		cfind.preview = preview;

		cfind.downloadFindingFile = downloadFindingFile;

		cfind.removeFindingFiles = removeFindingFiles;

		cfind.dateFormatConversion = dateFormatConversion;

		cfind.addItem = addItem;

		cfind.changeCallback = changeCallback;

		cfind.setNilNextActionForObs = setNilNextActionForObs;

		cfind.SetCurrentFinding = SetCurrentFinding;

		cfind.getPort = getPort;

		cfind.validateWithClosingMeetingDate = validateWithClosingMeetingDate;

		/** validate mnc verify clse date with audit closing meeting date * */
		function validateWithClosingMeetingDate(dueDate, nextActionId) {

			// cfind.dueMaxDate = (nextActionId
			// ==cfind.AppConstant.PLAN_ACCEPTED && cfind.closeMeeting ) ?
			// moment
			// (cfind.closeMeeting,MMMDDYYYY).add(29,'days').format(MMMDDYYYY) :
			// (nextActionId == cfind.AppConstant.VERIFY_CLOSE &&
			// cfind.closeMeeting) ? moment
			// (cfind.closeMeeting,MMMDDYYYY).add(89,'days').format(MMMDDYYYY) :
			// '';
			//changed by @Ramya on 10-11-2022 for TICKET-574
			cfind.dueMaxDate = (nextActionId == cfind.AppConstant.PLAN_ACCEPTED && cfind.closeMeeting) ? moment(
					cfind.closeMeeting, MMMDDYYYY).add(30, 'days').format(
					YYYYMMDD)
					: (nextActionId == cfind.AppConstant.VERIFY_CLOSE && cfind.closeMeeting) ? moment(
							cfind.closeMeeting, MMMDDYYYY).add(90, 'days')
							.format(YYYYMMDD)
							: '';
			var observationDueDate, closeMeeting, closeDate;
			if (dueDate
					&& (dueDate.toUpperCase() == (moment(dueDate, MMMDDYYYY)
							.format(MMMDDYYYY)).toUpperCase())) {
				dueDate = dueDate ? moment(dueDate, MMMDDYYYY).format(YYYYMMDD)
						: '';
				closeDate = cfind.closeMeeting ? moment(cfind.closeMeeting,
						MMMDDYYYY).format(YYYYMMDD) : '';

				cfind.observationarray
						.forEach(function(index) {

							if (index.findingDetail[2]
									&& (index.findingDetail[2].categoryId == 1001 || index.findingDetail[2].categoryId == 1003)) {
								observationDueDate = (index.findingDetail[2]
										&& (index.findingDetail[2].categoryId == 1001 || index.findingDetail[2].categoryId == 1003) && index.findingDetail[2].nextActionId == 1007) ? moment(
										index.findingDetail[2].dueDate,
										MMMDDYYYY).format(YYYYMMDD)
										: '';
								closeMeeting = moment(closeDate, YYYYMMDD).add(
										90, 'days').format(YYYYMMDD);		//changed by @Ramya on 10-11-2022 for TICKET-574

								if (dueDate > closeMeeting
										&& dueDate == observationDueDate) {
									toaster
											.warning('Due Date canot be beyond 90 days from the Closing Meeting Date ');
									index.findingDetail[2].dueDate = '';
									// cfind.dueMinDate='';
								} else if (dueDate < closeDate
										&& dueDate == observationDueDate) {
									toaster
											.warning('Due Date canot be less then Closing Meeting Date');
									index.findingDetail[2].dueDate = '';
									// cfind.dueMinDate='';
								}
							}

							if (index.findingDetail[1]
									&& (index.findingDetail[1].categoryId == 1001 || index.findingDetail[1].categoryId == 1003)) {
								observationDueDate = (index.findingDetail[1]
										&& (index.findingDetail[1].categoryId == 1001 || index.findingDetail[1].categoryId == 1003) && index.findingDetail[1].nextActionId == 1006) ? moment(
										index.findingDetail[1].dueDate,
										MMMDDYYYY).format(YYYYMMDD)
										: '';
								closeMeeting = moment(closeDate, YYYYMMDD).add(
										30, 'days').format(YYYYMMDD);		//changed by @Ramya on 10-11-2022 for TICKET-574

								if (dueDate > closeMeeting
										&& dueDate == observationDueDate) {
									toaster
											.warning('Due Date canot be beyond 30 days from the Closing Meeting Date ');
									index.findingDetail[1].dueDate = '';
									// cfind.dueMinDate='';
								} else if (dueDate < closeDate
										&& dueDate == observationDueDate) {
									toaster
											.warning('Due Date canot be less then Closing Meeting Date');
									index.findingDetail[1].dueDate = '';
									// cfind.dueMinDate='';
								}
							}

							if (index.findingDetail[0]
									&& index.findingDetail[0].categoryId == 1002) {
								console.log(index);
								closeMeeting = moment(closeDate, YYYYMMDD).add(
										30, 'days').format(YYYYMMDD);				//changed by @Ramya on 10-11-2022 for TICKET-574
								observationDueDate = (index.findingDetail[0] && index.findingDetail[0].nextActionId == 1006) ? moment(
										index.findingDetail[0].dueDate,
										MMMDDYYYY).format(YYYYMMDD)
										: '';

								if (dueDate > closeMeeting
										&& dueDate == observationDueDate) {
									toaster
											.warning('Due Date canot be beyond 30 days from the Closing Meeting Date ');
									index.findingDetail[0].dueDate = '';
									// cfind.dueMinDate='';
								} else if (dueDate < closeDate
										&& dueDate == observationDueDate) {
									toaster
											.warning('Due Date canot be less then Closing Meeting Date');
									index.findingDetail[0].dueDate = '';
									// cfind.dueMinDate='';
								}

							}
						});

			}
		}

		/** ******** adding json key to array on next action change ********* */
		function addCategory(findingSeqNo, statusSeqNo) {

			return {

				'statusSeqNo' : statusSeqNo,

				'findingSeqNo' : findingSeqNo,

				'origAuditSeqNo' : Number(cfind.auditSeqNo),

				'currentAuditSeq' : cfind.openForCar ? cfind.AppConstant.CAR_UPDATED_CURRENT_SEQ
						: Number(cfind.auditSeqNo),

				'companyId' : Number(cfind.companyId),

				'auditTypeId' : cfind.auditTypeId ? cfind.auditTypeId : '',

				'categoryId' : '',

				'statusId' : '',

				'statusDate' : '',

				'nextActionId' : '',

				'dueDate' : '',

				'descriptions' : '',

				'userIns' : (sessionStorage.getItem('emailId')).toString(),

				'dateIns' : moment(new Date()).format(YYYYMMDD),

				'findingRptAttachs' : [],

				'updateFlag' : cfind.openForCar ? false : ''

			};

		}

		cfind.portArray = [];

		cfind.maPort.forEach(function(port) {
			if (port.activeFlag == 1) {

				var portToIns = port.portName ? port.portName : '';

				portToIns = portToIns ? port.countryName ? portToIns + ', '
						+ port.countryName : portToIns
						: port.countryName ? port.countryName : '';

				cfind.portArray.push(portToIns);
			}

		});

		function getPort(val) {

			var tempArray = [];

			if (val) {
				var i = 0;

				for (i = 0; i < cfind.portArray.length; i++) {
					if (cfind.portArray[i].toUpperCase().indexOf(
							val.toUpperCase()) > -1) {
						tempArray.push(cfind.portArray[i]);
					}
					if (tempArray.length > 16 && val.length < 4) {
						break;
					}
				}
			}

			return tempArray;
		}

		/** ******** on screen load setting data ********* */
		$scope
				.$on(
						'$viewContentLoaded',
						function() {

							if (auditFactory.getFindingData()) {

								cfind.observationarray = auditFactory
										.getFindingData().findingData.length > 0 ? auditFactory
										.getFindingData().findingData
										: cfind.observationarray;

								cfind.prevFinding = auditFactory
										.getFindingData().prevFinding;

								var observationarray = cfind.observationarray;

								cfind.dateFormatConversion(observationarray);

								cfind.auditStatusId = auditFactory
										.getFindingData().auditStatusId;

								cfind.leadStatus = auditFactory
										.getFindingData().leadStatus;

								cfind.audSignature = auditFactory
										.getFindingData().auditorSignature;

								cfind.openMeeting = auditFactory
										.getFindingData().openMeeting;

								cfind.closeMeeting = auditFactory
										.getFindingData().closeMeeting;

								cfind.closeMeetingDate= moment(cfind.closeMeeting, DDMMMYYYY + " HH:mm").format(DDMMMYYYY);		//added by @Ramya on 10-11-2022 for TICKET-574

								cfind.lockStatus = auditFactory
										.getFindingData().lockStatus;

								cfind.auditDate = auditFactory.getFindingData().auditDate ? auditFactory
										.getFindingData().auditDate
										: '';

								cfind.reviewStatus = auditFactory
										.getFindingData().reviewStatus;

								cfind.enabled = auditFactory.getFindingData().enabled;

								cfind.openForCar = auditFactory
										.getFindingData().openForCar;

								cfind.auditSubtypeId = auditFactory
										.getFindingData().auditSubtypeId;

								cfind.auditPlace = auditFactory
										.getFindingData().auditPlace;

								cfind.leadSign = auditFactory.getFindingData().leadSign;

								cfind.lockStatusValue = auditFactory
										.getFindingData().lockStatusValue;

								cfind.nextAdtCreated = auditFactory
										.getFindingData().nextAdtCreated;

								cfind.auditMinDate = auditFactory
										.getFindingData().auditMinDate;

								if (cfind.lockStatusValue == cfind.AppConstant.LINKED_WITH_MLC) {

									$timeout(
											function() {

												toaster
														.warning('Current Review is linked in MLC Inspection');
												cfind.lockStatus = true;
											}, 200);

									if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) {
										cfind.mlcDmlcLink = true;
									}
								}

								cfind.lastSameAuditDate = auditFactory
										.getFindingData().lastSameAuditDate;

								cfind.lastSameAuditDate = moment(
										cfind.lastSameAuditDate, YYYYMMDD).add(
										1, 'days').format(YYYYMMDD);

								cfind.lockHolder = auditFactory
										.getFindingData().lockHolder;

								cfind.auditReopnedStatus = auditFactory
										.getFindingData().auditReopnedStatus;

								cfind.vesselImoNo = auditFactory
										.getFindingData().vesselImoNo;

								cfind.lockDisable = auditFactory
										.getFindingData().lockDisable;

								cfind.auditReportNo = auditFactory
										.getFindingData().auditReportNo;

								cfind.auditAuditorDetail = auditFactory
										.getFindingData().auditAuditorDetail ? angular
										.copy(auditFactory.getFindingData().auditAuditorDetail)
										: '';

								if (cfind.auditAuditorDetail) {
									cfind.auditAuditorDetail
											.forEach(function(index) {
												if (index.auditRoleID == cfind.AppConstant.AUDIT_REVIEWER_ROLE_ID
														&& index.userId == cfind.loginUserId)
													cfind.reviwerlogin = true;
											});
								}

								cfind.SetCurrentFinding();

								if (cfind.auditTypeId == cfind.AppConstant.ISPS_TYPE_ID
										&& (cfind.auditSubtypeId == 1003 || cfind.auditSubtypeId == 1005)) {
									cfind.ispsEndorse = true;
								}

								$timeout(
										function() {
											if (!cfind.observationarray[0].auditCode) {

												var parent = angular
														.element(document
																.getElementById("collapse-0"));
												console
														.log(document
																.getElementById("collapse-0"));

												angular
														.element(
																parent[0].previousElementSibling)
														.removeClass(
																"collapsed");

												$("#collapse-0").addClass('in');
											}

										}, 0)

							} else {

								cfind.auditHome();
							}
						});

		/** ******** for setting the finding data ********* */
		function SetCurrentFinding() {

			$state.current.data.pageTitle = auditType[cfind.auditTypeId].pageTitle;

			cfind.auditType = auditType[cfind.auditTypeId].auditingType;

			cfind.reviewCountDesc = (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) ? _(
					cfind.obsCategoryOptions).chain().where({
				'auditTypeId' : cfind.auditTypeId,
				'findingsCategoryId' : cfind.AppConstant.REVIEW_NOTE
			}).pluck('findingsCategoryDesc').toString()
					: '';

			cfind.majorCountDesc = _(cfind.obsCategoryOptions).chain().where({
				'auditTypeId' : cfind.auditTypeId,
				'findingsCategoryId' : cfind.AppConstant.MAJOR_FINDING_CATEGORY
			}).pluck('findingsCategoryDesc').toString();

			cfind.minorCountDesc = _(cfind.obsCategoryOptions).chain().where({
				'auditTypeId' : cfind.auditTypeId,
				'findingsCategoryId' : cfind.AppConstant.MINOR_FINDING_CATEGORY
			}).pluck('findingsCategoryDesc').toString();

			cfind.obsCountDesc = _(cfind.obsCategoryOptions).chain().where({
				'auditTypeId' : cfind.auditTypeId,
				'findingsCategoryId' : cfind.AppConstant.OBS_FINDING_CATEGORY
			}).pluck('findingsCategoryDesc').toString();

			cfind.auditauditType = auditType[cfind.auditTypeId].src;

			var currFindScreen = (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) ? "RNOTE"
					: "CURR";

			cfind.countFindingCategory = _.countFindingCategory(
					cfind.observationarray, cfind.auditTypeId, currFindScreen,
					cfind.obsCategoryOptions);

			cfind.findingsNo = cfind.observationarray[cfind.observationarray.length - 1].findingSeqNo;

			_.countFindingCategory(cfind.prevFinding, cfind.auditTypeId,
					"PREV", cfind.obsCategoryOptions);

			if (cfind.auditTypeId == cfind.AppConstant.ISM_TYPE_ID
					|| cfind.auditTypeId == cfind.AppConstant.ISPS_TYPE_ID
					|| cfind.auditTypeId == cfind.AppConstant.MLC_TYPE_ID) {
				cfind.auditType1 = 'NEW AUDIT FINDINGS';
			} else if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) {

				cfind.auditType1 = 'REVIEW NOTES';
			} else if (cfind.auditTypeId == cfind.AppConstant.SSP_TYPE_ID) {

				cfind.auditType1 = 'NEW REVIEW FINDINGS';
			}

			$timeout(
					function() {

						cfind.observationarray
								.forEach(function(a, aIndex) {

									a.auditElements = a.auditElements ? decodeURIComponent(a.auditElements)
											: '';

									a.findingDetail
											.forEach(function(b, bIndex) {

												/*
												 * if((b.categoryId ==
												 * cfind.AppConstant.MINOR_FINDING_CATEGORY ||
												 * b.categoryId ==
												 * cfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY ) &&
												 * b.nextActionId==cfind.AppConstant.PLAN_ACCEPTED &&
												 * cfind.auditTypeId==cfind.AppConstant.MLC_TYPE_ID){
												 * b.dueDate =
												 * cfind.priorToDepatVsl; }
												 */

												if (b.categoryId == cfind.AppConstant.OBS_FINDING_CATEGORY
														|| b.statusId == cfind.AppConstant.VERIFIED_CLOSED) {
													b.nextActionId2 = 'NIL';
												}

												if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID
														&& b.statusId == cfind.AppConstant.VERIFIED_CLOSED) {
													$timeout(
															function() {
																document
																		.getElementById("statusdate-"
																				+ aIndex
																				+ "-"
																				+ (bIndex)).nextElementSibling.innerHTML = 'Date';
															}, 0);
												}

												if (cfind.openForCar) {
													if (b.currentAuditSeq
															&& b.currentAuditSeq != cfind.AppConstant.CAR_UPDATED_CURRENT_SEQ) {

														b.updateFlag = true;

													} else if ((b.currentAuditSeq == cfind.AppConstant.CAR_UPDATED_CURRENT_SEQ)
															&& (a.findingDetail.lenght > bIndex + 1)
															&& (a.findingDetail[bIndex + 1].currentAuditSeq != cfind.AppConstant.CAR_UPDATED_CURRENT_SEQ)) {
														b.updateFlag = true;
													} else {
														b.updateFlag = false;
													}
												}

												// b.statusDate =
												// b.statusDate?moment(b.statusDate,YYYYMMDD).format(MMMDDYYYY):'';
											});

									if (a.findingDetail[a.findingDetail.length - 1].nextActionId) {
										cfind.dontEditNextactionId=true;
										cfind
												.nextActionChange(
														aIndex,
														a.findingDetail.length - 1,
														a.findingDetail[a.findingDetail.length - 1].nextActionId);

									} else if (a.findingDetail[0].categoryId == cfind.AppConstant.OBS_FINDING_CATEGORY) {

										cfind
												.setDisplayFinding(
														cfind.AppConstant.OBS_FINDING_CATEGORY,
														aIndex);
									}

								});
					}, 0);

		}

		/** ******** for setting audit code && audit element ********* */
		function setAuditElement(item, index) {

			cfind.observationarray[index].auditCode = {
				"auditCode" : item.auditCode
			};

			cfind.observationarray[index].auditElements = {
				"auditElements" : decodeURIComponent(item.auditElements)
			};
		}

		/** ******** on change of next action populating next row ********* */
		function nextActionChange(prIndex, index, nActionId) {
			//added by @Ramya on 10-11-2022 for jira id - IRI-5532
			if( index>=1 && cfind.observationarray[prIndex].findingDetail[index-1].dueDate!=undefined && !cfind.observationarray[prIndex].findingDetail[index-1].dueDate)
			{		
				var nextActionDesc;
				cfind.obsStatusOptions.forEach(function(a) {
					if(a.findingsStatusId==cfind.observationarray[prIndex].findingDetail[index-1].nextActionId)
					{
						nextActionDesc=a.findingstStatusDesc;
					}

				});
				toaster.warning("Please Select Due Date for "+nextActionDesc +" Under " + cfind.observationarray[prIndex].serialNo);
					if (cfind.observationarray[prIndex].findingDetail.length - 1 > index) {
						console.log(cfind.observationarray[prIndex].findingDetail[index].statusDate)
						cfind.observationarray[prIndex].findingDetail.splice(-1, 1);
		
						cfind.observationarray[prIndex].findingDetail[index].nextActionId = '';
		
						cfind.observationarray[prIndex].findingDetail[index].statusDate = '';
						
						cfind.FindingMinDate='';
						 
						cfind.observationarray[prIndex].findingDetail[index].dueDate = '';

						cfind.observationarray[prIndex].findingDetail[index].descriptions = '';			//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
		
						cfind.observationarray[prIndex].findingDetail[index].updateDescription = '';
		
						cfind.observationarray[prIndex].findingDetail[index].auditPlace = '';
		
						cfind
								.setDisplayFinding(
										cfind.observationarray[prIndex].findingDetail[index].categoryId,
										prIndex);
		
						cfind.observationarray[prIndex].findingDetail[index].findingRptAttachs = [];
		
						cfind.dueMinDate = '';
		
					} else if (cfind.observationarray[prIndex].findingDetail.length - 1 == index) {
						console.log(cfind.observationarray[prIndex].findingDetail[index].statusDate)
						cfind.observationarray[prIndex].findingDetail[index].nextActionId = '';
		
						cfind.observationarray[prIndex].findingDetail[index].statusDate = '';
		
						cfind.observationarray[prIndex].findingDetail[index].dueDate = '';

						cfind.observationarray[prIndex].findingDetail[index].descriptions = '';				//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
		
						cfind.observationarray[prIndex].findingDetail[index].updateDescription = '';
		
						cfind.observationarray[prIndex].findingDetail[index].auditPlace = '';
		
						cfind.observationarray[prIndex].findingDetail[index].findingRptAttachs = [];
		
						cfind.dueMinDate = '';
					}
				}
			else{
			cfind.FindingMinDate = cfind.observationarray[prIndex].findingDetail[index].statusDate ? moment(
					cfind.observationarray[prIndex].findingDetail[index].statusDate,
					MMMDDYYYY).format(YYYYMMDD)
					: cfind.FindingMinDate;
			cfind.minFindStatusDate = cfind.observationarray[prIndex].findingDetail[index].statusDate ? moment(
					cfind.observationarray[prIndex].findingDetail[index].statusDate,
					MMMDDYYYY).format(YYYYMMDD)
					: cfind.minFindStatusDate;
					
			var nAction = cfind.observationarray[prIndex].findingDetail[index].nextActionId;

			if (nAction == cfind.AppConstant.PREVIOUS_STATUS) {
					
				if (cfind.observationarray[prIndex].findingDetail.length - 1 > index) {
					console.log(cfind.observationarray[prIndex].findingDetail[index].statusDate)
					cfind.observationarray[prIndex].findingDetail.splice(-1, 1);

					cfind.observationarray[prIndex].findingDetail[index].nextActionId = '';

					cfind.observationarray[prIndex].findingDetail[index].statusDate = '';
					
					cfind.FindingMinDate='';
					 
					cfind.observationarray[prIndex].findingDetail[index].dueDate = '';

					cfind.observationarray[prIndex].findingDetail[index].descriptions = '';			//added by @Ramya on 3-2-2023 for Jira id - IRI-5636

					cfind.observationarray[prIndex].findingDetail[index].updateDescription = '';

					cfind.observationarray[prIndex].findingDetail[index].auditPlace = '';

					cfind
							.setDisplayFinding(
									cfind.observationarray[prIndex].findingDetail[index].categoryId,
									prIndex);

					cfind.observationarray[prIndex].findingDetail[index].findingRptAttachs = [];

					cfind.dueMinDate = '';

				} else if (cfind.observationarray[prIndex].findingDetail.length - 1 == index) {
					console.log(cfind.observationarray[prIndex].findingDetail[index].statusDate)
					cfind.observationarray[prIndex].findingDetail[index].nextActionId = '';

					cfind.observationarray[prIndex].findingDetail[index].statusDate = '';

					cfind.observationarray[prIndex].findingDetail[index].dueDate = '';

					cfind.observationarray[prIndex].findingDetail[index].descriptions = '';			//added by @Ramya on 3-2-2023 for Jira id - IRI-5636

					cfind.observationarray[prIndex].findingDetail[index].updateDescription = '';

					cfind.observationarray[prIndex].findingDetail[index].auditPlace = '';

					cfind.observationarray[prIndex].findingDetail[index].findingRptAttachs = [];

					cfind.dueMinDate = '';
				}
			} else {

				if (cfind.openForCar
						&& !(cfind.observationarray[prIndex].findingDetail[index].updateFlag)
						&& !(cfind.observationarray[prIndex].findingDetail[index].auditPlace)) {

					
					if(!cfind.dontEditNextactionId){
						toaster.warning('Please Select Acceptance Place Under '+cfind.observationarray[prIndex].serialNo);
					cfind.observationarray[prIndex].findingDetail[index].nextActionId = '';
					
					}
					return;
				}

				var categoryId = cfind.observationarray[prIndex].findingDetail[0].categoryId;

				if (cfind.ispsEndorse && categoryId == 1002) {

					categoryId = 1003;
				}

				if (nAction != cfind.AppConstant.NIL) {
					if (nAction == 1007) {
						// cfind.dueMinDate =
						// cfind.observationarray[prIndex].findingDetail[index-1].dueDate;
						cfind.dueMinDate = (cfind.observationarray[prIndex].findingDetail[index - 1] && cfind.observationarray[prIndex].findingDetail[index - 1].dueDate) ? moment(
								(cfind.observationarray[prIndex].findingDetail[index - 1].dueDate),
								MMMDDYYYY).format(YYYYMMDD)
								: '';
					}

					cfind.observationarray[prIndex].findingDetail
							.push(cfind
									.addCategory(
											cfind.observationarray[prIndex].findingSeqNo,
											index + 2));

					cfind.observationarray[prIndex].findingDetail[index + 1].categoryId = cfind.CarFlowStructure[cfind.auditTypeId][categoryId][index + 1].categoryId;

					cfind.observationarray[prIndex].findingDetail[index + 1].statusId = cfind.CarFlowStructure[cfind.auditTypeId][categoryId][index + 1].statusId;

					cfind
							.setDisplayFinding(
									cfind.CarFlowStructure[cfind.auditTypeId][categoryId][index + 1].categoryId,
									prIndex);

					if (nAction == cfind.AppConstant.VERIFY_CLOSE) {
						$timeout(
								function() {

									if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID
											&& nAction == cfind.AppConstant.VERIFY_CLOSE) {
										$timeout(
												function() {
													document
															.getElementById("statusdate-"
																	+ prIndex
																	+ "-"
																	+ (index + 1)).nextElementSibling.innerHTML = 'Date';
												}, 0);
									}

									$(
											"#description-" + prIndex + '-'
													+ (index + 1)).focus();
								}, 0);

					}
				} else {
					cfind
							.setDisplayFinding(
									cfind.CarFlowStructure[cfind.auditTypeId][categoryId][index].categoryId,
									prIndex);
				}

				if (cfind.openForCar && !(nActionId)) {

					var msg = '';

					if (cfind.observationarray[prIndex].findingDetail[index].statusId == cfind.AppConstant.PLAN_ACCEPTED) {

						msg = 'Plan Accepted Status has been updated as part of CAR at '
								+ cfind.observationarray[prIndex].findingDetail[index].auditPlace
								+ ' by '
								+ sessionStorage.getItem('usrname')
								+ ' on '
								+ cfind.observationarray[prIndex].findingDetail[index].statusDate;// moment(new
																									// Date()).format(MMMDDYYYY);

					} else if (cfind.observationarray[prIndex].findingDetail[index].statusId == cfind.AppConstant.VERIFIED_CLOSED) {

						msg = 'Verify/Close Status has been updated as part of CAR at '
								+ cfind.observationarray[prIndex].findingDetail[index].auditPlace
								+ ' by '
								+ sessionStorage.getItem('usrname')
								+ ' on '
								+ cfind.observationarray[prIndex].findingDetail[index].statusDate;// moment(new
																									// Date()).format(MMMDDYYYY);
					}

					cfind.observationarray[prIndex].findingDetail[index].updateDescription = cfind.observationarray[prIndex].findingDetail[index].updateDescription ? cfind.observationarray[prIndex].findingDetail[index].updateDescription
							: msg;
				}
			}
			cfind.dontEditNextactionId=false;
		}
		}// end of nextActionChange(prIndex,index)

		/** ******** on change of category setting category field ********* */
		var onLoadStatusDateDisp = true;
		function setDisplayFinding(categoryId, prIndex, param,fromHtml,oldValue) {

			cfind.observationarray[prIndex].displayFinging = _(
					cfind.obsCategoryOptions).chain().where({
				'findingsCategoryId' : Number(categoryId)
			}).pluck('findingsCategoryDesc').toString();

			// cfind.countFindingCategory =
			// _.countFindingCategory(cfind.observationarray,[],cfind.auditTypeId,"CURR");

			var currFindScreen = (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) ? "RNOTE"
					: "CURR";

			cfind.countFindingCategory = _.countFindingCategory(
					cfind.observationarray, cfind.auditTypeId, currFindScreen,
					cfind.obsCategoryOptions);
			// //on load findings if closing date is present displaying default
			// status date as closing date value
			 
				if (onLoadStatusDateDisp && cfind.auditTypeId != cfind.AppConstant.DMLC_TYPE_ID) {
				cfind.observationarray.forEach(function(a, aIndex) {
					a.findingDetail.forEach(function(b, bIndex) {
						if (b.statusId == 1001) {
							if (cfind.closeMeeting) {
								b.statusDate = b.statusDate ? b.statusDate
										: moment(cfind.closeMeeting,
												MMMDDYYYY + " HH:mm").format(
												MMMDDYYYY);
							}
						}

					});
				});
				onLoadStatusDateDisp = false;
			}
				
				if ( fromHtml && fromHtml == 1 && cfind.auditTypeId != cfind.AppConstant.DMLC_TYPE_ID && categoryId == cfind.AppConstant.OBS_FINDING_CATEGORY) {
					cfind.observationarray.forEach(function(a, aIndex) {
						a.findingDetail.forEach(function(b, bIndex) {
							if (b.statusId == 1001 && b.categoryId == 1004) {
								if (cfind.closeMeeting) {
									b.nextActionId2 = "NIL";
									b.dueDate=  "N.A."; }
								
							}

						});
					});
					
				
			}else if ( fromHtml && fromHtml == 1 &&  oldValue==1004 && cfind.auditTypeId != cfind.AppConstant.DMLC_TYPE_ID) {
				cfind.observationarray.forEach(function(a, aIndex) {
					a.findingDetail.forEach(function(b, bIndex) {
						if (b.statusId == 1001) {
							
								b.nextActionId2 = '';
								b.dueDate=  ""; 
							
						}

					});
				});
				
				
			}
				

		}

		/** ******** go to home page ********* */
		function auditHome() {

			$state.go('app.audit.details', {}, {
				reload : true
			});
		}

		/** ******** saving finding data ********* */
		function saveFinding(event) {

			if (cfind.findingValidation()) {

				detailsFactory.getAuditDetailAndNextAdtCrtStatus(
						cfind.auditTypeId, cfind.companyId, cfind.auditSeqNo,
						cfind.openForCar, cfind.vesselImoNo).$promise
						.then(function(res) {

							if (res.lockStatus == cfind.AppConstant.RETRIEVE_STATUS) {

								toaster
										.warning('Current '
												+ cfind.auditType
												+ ' is Retrieved in the Laptop/Mobile '
												+ cfind.auditType
												+ ' Application by '
												+ _(res.auditAuditorDetail)
														.chain()
														.where(
																{
																	'audLeadStatus' : cfind.AppConstant.AUD_LEAD_STATUS
																}).pluck(
																'auditorName')
														.toString());

								return;

							} else if (res.nxtAdtCrtSts) {

								toaster
										.warning('Current finding is linked with previous finding of ongoing '
												+ cfind.auditType);

								return;

							} else {

								// if(cfind.findingValidation()){

								var screenData = cfind.setFindingData();

								if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) {
									blockUI.start('Saving Review Notes Data');
								} else {
									blockUI.start('Saving Finding Data');
								}
								var len = screenData.length - 1;
							
							/*added by @Ramya for Jira id - IRI-5633*/
							detailsFactory.getFindingData(cfind.auditTypeId,cfind.auditSeqNo,cfind.companyId).$promise.then(function(data){			
								cfind.getData = angular.copy(data);
								screenData
										.forEach(function(a, aIndex) {
											var status=0;
											if(cfind.getData && cfind.getData.length>0){
											for(var i=0;i<cfind.getData.length;i++){
												if(a.findingSeqNo==cfind.getData[i].findingSeqNo && a.auditSeqNo==cfind.getData[i].auditSeqNo){
														status+=1;
												}
											}
											}
											var statusOption=(status!=0)?'Update':'Create';
											auditFactory.saveFindingData(a,
												statusOption, 'NF',
													cfind.auditTypeId,
													cfind.companyId).$promise
													.then(function(res) {

														cfind.res = res;

														if (res.auditCode) {

															if (cfind.lockStatusValue != cfind.AppConstant.OPENFORCAR
																	&& cfind.openForCar) {
																auditFactory
																		.carUpdateRemoveAuditorsSign(
																				cfind.auditSeqNo,
																				cfind.companyId,
																				cfind.auditTypeId).$promise
																		.then(function(
																				res) {
																			console
																					.log("carUpdateRemoveAuditorsSignres");
																			console
																					.log(res);
																			cfind.lockStatusValue = cfind.AppConstant.OPENFORCAR;
																			cfind.leadSign = false;

																			findingsFactory
																					.createOrgBlob(
																							cfind.auditSeqNo,
																							cfind.auditTypeId,
																							cfind.companyId).$promise
																					.then(function(
																							tempRes) {
																						console
																								.log(tempRes);
																						console
																								.log("Hi");
																						console
																								.log(screenData);
																					});

																		});
															}

															cfind.saveFindingData = false;

															if (len == aIndex) {
																blockUI.stop();

																toaster
																		.success("Data Saved Successfully");

																if (cfind.NewFindingsForm) {
																	cfind.NewFindingsForm.$dirty = false;
																	if (event == '/details') {
																		SetCurrentFinding();
																		$state
																				.go(
																						'app.audit.details',
																						{},
																						{
																							reload : true
																						});
																	}
																}

																findingsFactory
																		.createOrgBlob(
																				cfind.auditSeqNo,
																				cfind.auditTypeId,
																				cfind.companyId).$promise
																		.then(function(
																				res) {
																			console
																					.log(res);
																			console
																					.log("Hi");
																			console
																					.log(screenData);
																		});

															}

														} else {

															blockUI.stop();
														}
													});
										});
									});

								if (screenData.length == 0) {
									blockUI.stop();

									cfind.NewFindingsForm.$dirty = false;
									if (event == '/details') {
										$state.go('app.audit.details', {}, {
											reload : true
										});
									}
								}
								// }
							}

						});
			}
		}

		/** ******** finding data validation before save ********* */
		function findingValidation() {

			var screenData = cfind.observationarray;

			var flag = true;

			screenData
					.forEach(function(a) {

						if (!a.findingSeqNo) {

							flag = false;

							toaster.warning('Finding No Missing');

						} else if (a.findingDetail[0].categoryId
								&& (a.findingDetail[0].statusDate || a.findingDetail[0].nextActionId)
								&& !a.auditCode) {

							flag = false;

							toaster.warning('Please Enter ISM Code');

						} else if (a.auditCode && !a.auditElements) {

							flag = false;

							toaster.warning('Please Enter the valid '
									+ cfind.auditauditType + ' Code');
						}

						if (flag) {
							var statusDateMsg=0;		//added by @Ramya for Jira id - IRI-5614
							a.findingDetail
									.forEach(function(b) {
										if (b.nextActionId && !b.statusDate 
											&& b.categoryId != cfind.AppConstant.OBS_FINDING_CATEGORY) {
												var nextActionDescr;
												cfind.obsStatusOptions.forEach(function(status) {
												if(status.findingsStatusId==b.statusId)
												{
													nextActionDescr=status.findingstStatusDesc;
												}
												});
											flag = false;
											statusDateMsg++;
											if(statusDateMsg==1){
											toaster
													.warning("Please Select the Status Date for "+nextActionDescr +" Status Under "+ a.serialNo);
											}
										} else if (b.statusDate
												&& b.categoryId != cfind.AppConstant.OBS_FINDING_CATEGORY
												&& (!b.nextActionId || b.nextActionId == cfind.AppConstant.PREVIOUS_STATUS)) {

											flag = false;

											toaster
													.warning("Please Select the Next Action Under "
															+ a.serialNo);

										} else if (!(b.dueDate)
												&& b.categoryId != cfind.AppConstant.OBS_FINDING_CATEGORY
												&& b.statusDate) {
													var nextActionDescr;
													cfind.obsStatusOptions.forEach(function(status) {
													if(status.findingsStatusId==b.nextActionId)
													{
														nextActionDescr=status.findingstStatusDesc;
													}
													});
													flag = false;
													toaster.warning("Please Select the Due Date for "+nextActionDescr +" Under " + a.serialNo);	//changed by @Ramya on 14-11-2022 for jira id - IRI-5532
										} else if (b.dueDate == '.'
												&& b.dueDate.length == 1) {
													var nextActionDescr;
													cfind.obsStatusOptions.forEach(function(status) {
													if(status.findingsStatusId==b.nextActionId)
													{
														nextActionDescr=status.findingstStatusDesc;
													}
													});
											flag = false;

											toaster
													.warning("Please Select Due Date for "+nextActionDescr +" Under " + a.serialNo);	
										}else if (b.categoryId == 1004
												&& b.nextActionId2 && !b.dueDate) {
											flag = false;

											toaster
													.warning("Please Select Due Date for NIL Under " + a.serialNo);
										}else if (b.categoryId == 1004
												&& b.statusId &&  !b.statusDate) {
													var nextActionDescr;
													cfind.obsStatusOptions.forEach(function(status) {
													if(status.findingsStatusId==b.statusId)
													{
														nextActionDescr=status.findingstStatusDesc;
													}
													});
											flag = false;

											toaster
													.warning("Please Select the Status Date for "+nextActionDescr +" Status Under "+ a.serialNo);
										}else if (b.categoryId == 1004
												&& !b.nextActionId2 && b.statusId) {
											flag = false;

											toaster
													.warning("Please Select the Next Action Under "+ a.serialNo);
										}
									});
						}

					});

			return flag;
		}

		$rootScope.$on('$stateChangeStart', function(event, fromState,
				toParams, toState) {

			var element = angular.element(document.getElementById("loader"));

			if (cfind.NewFindingsForm) {

				var findScreenData = cfind.setFindingData();

				if (findScreenData.length == 0) {

					if (event == '/details') {

						$state.go('app.audit.details', {}, {
							reload : true
						});
					}

				} else if (cfind.NewFindingsForm.$dirty) {

					if (broadcastService.confirmService()) {

						if (cfind.findingValidation()) {
							if (fromState.url == '/details')
								event.preventDefault();
							
							saveFinding(fromState.url);
						} else {
							event.preventDefault();
						}
					}

				}

			}
			element.addClass('hide');
		});

		cfind.Validationscreen2 = function() {

			var flags = true;

			angular
					.forEach(
							cfind.observationarray,
							function(key, value) {

								angular
										.forEach(
												cfind.observationarray[value].findingDetail,
												function(key1, value1) {

													if (value1 == 0) {

														if (!cfind.observationarray[value].findingDetail[value1].nextActionId) {

															flags = false;
															toaster
																	.warning('Please Select the Next Action');

														}

														if (!cfind.observationarray[value].findingDetail[0].statusDate) {

															flags = false;
															toaster
																	.warning('Please Select the Status Date');
														}

														if (!cfind.observationarray[value].findingDetail[value1].categoryId) {
															flags = false;
															toaster
																	.warning('Please Select the Category');
														}

														if (!cfind.observationarray[value].auditCode) {
															flags = false;
															toaster
																	.warning('Please Enter the ISM Code');
														}

													}

													else {

														if (cfind.observationarray[value].findingDetail[value1].statusDate) {
															if (!cfind.observationarray[value].findingDetail[value1].nextActionId) {

																flags = false;
																toaster
																		.warning('Please Select the Next Action');

															}
														}

													}

												});
							});
			return flags;
		}

		/** ******** setting finding bean data ********* */
		function setFindingData() {

			var findingData = [], findingAttachments = [], findingDetailsData;

			var sequence = 0;

			var tempFindArray = angular.copy(cfind.observationarray);

			tempFindArray = tempFindArray.filter(function(a) {
				return a.auditCode && a.findingDetail[0].statusDate;
			});

			tempFindArray
					.forEach(function(a, index) {

						a.auditCode = (a.auditCode ? a.auditCode.auditCode : '')
								|| (a.auditCode ? a.auditCode : '');

						// a.auditDate = a.auditDate? new
						// Date(Date.parse((moment(a.auditDate,MMMDDYYYY).format(DDMMMYYYY+HHmm)).replace(/-/g,'
						// '))) : new
						// Date(Date.parse((moment(cfind.auditDate,MMMDDYYYY).format(DDMMMYYYY+HHmm)).replace(/-/g,'
						// ')));
						a.auditDate = a.auditDate ? moment(a.auditDate,
								MMMDDYYYY).format(YYYYMMDD) : '';

						a.userIns = (sessionStorage.getItem("emailId")).toString();

						// a.dateIns = a.dateIns ? new
						// Date(Date.parse((moment(a.dateIns,MMMDDYYYY).format(DDMMMYYYY+HHmm)).replace(/-/g,'
						// '))) : new Date();
						a.dateIns = a.dateIns ? moment(a.dateIns, MMMDDYYYY)
								.format(YYYYMMDD) : moment(new Date()).format(
								YYYYMMDD);

						if ((a.findingDetail[a.findingDetail.length - 1].statusId == cfind.AppConstant.VERIFIED_CLOSED && a.findingDetail[a.findingDetail.length - 1].statusDate)
								|| a.findingDetail[0].categoryId == cfind.AppConstant.OBS_FINDING_CATEGORY) {

							a.findingStatus = 1;
						} else {
							a.findingStatus = 0;
						}

						// a.auditDate=moment(a.auditDate,MMMDDYYYY).format(YYYYMMDD);

						if (!(a.findingDetail[a.findingDetail.length - 1].statusDate)) {
							a.findingDetail.splice(a.findingDetail.length - 1);
						}

						delete a.auditElements;

						a.findingDetail
								.forEach(function(b, subIndex) {

									var regExp = new RegExp("'", "g");

									b.statusDate = moment(b.statusDate,
											MMMDDYYYY).format(YYYYMMDD);

									var desc = b.descriptions ? b.descriptions
											.replace(regExp, "''") : '';

									b.descriptions = desc || "";

									b.userIns = (sessionStorage.getItem("emailId"))
											.toString();

									// b.dateIns = new Date();
									b.dateIns = b.dateIns ? moment(b.dateIns,
											MMMDDYYYY).format(YYYYMMDD)
											: moment(new Date()).format(
													YYYYMMDD);

									delete b.findFileData;

									b.findingRptAttachs
											.forEach(function(c, cIndex) {

												c.findingFileByte = c.findingFileByte ? btoa(c.findingFileByte)
														: null;

												c.userIns = (sessionStorage.getItem("emailId"))
														.toString();

												c.dateIns = moment(new Date())
														.format(YYYYMMDD);
											});
								});
								a.findingDetailModel =a.findingDetail;	/*added by @Ramya for Jira id - IRI-5633*/
					});

			return tempFindArray;
		}

		/** ******* min and max date of status date ******** */
		function momentDateConverter(val, val2) {
			if (cfind.openForCar) {
				var testDate = moment(val, MMMDDYYYY).format(YYYYMMDD);
				cfind.maxFindStatusDate = '';
				cfind.FindingMinDate = '';
				if (testDate < cfind.lastSameAuditDate) {
					cfind.minFindStatusDate = cfind.lastSameAuditDate;
				} else {
					cfind.minFindStatusDate = testDate;
				}
				// cfind.maxFindStatusDate = moment(new
				// Date()).format(MMMDDYYYY);
				// cfind.FindingMaxDate = moment(cfind.openMeeting,MMMDDYYYY);

			} else if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID
					&& cfind.auditSubtypeId == cfind.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) {
				cfind.minFindStatusDate = moment(val, MMMDDYYYY);
				cfind.maxFindStatusDate = moment(val2, MMMDDYYYY);
			 
				if(cfind.auditDate){
					cfind.statusDates = cfind.observationarray
					&& cfind.observationarray.length > 0
					&& cfind.observationarray[0].findingDetail.length > 0 ? cfind.observationarray[0].findingDetail[0].statusDate
					: '';
			cfind.FindingMinDate = cfind.auditDate ? moment(
					cfind.auditDate, MMMDDYYYY).format(YYYYMMDD)
					: cfind.statusDates;
			cfind.FindingMaxDate = cfind.auditDate ? moment(
					cfind.auditDate, MMMDDYYYY).format(YYYYMMDD)
					: cfind.statusDates;
				}

			} else if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID
					&& cfind.auditSubtypeId == cfind.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID) {
				cfind.minFindStatusDate = moment(val, MMMDDYYYY);
				cfind.maxFindStatusDate = moment(val2, MMMDDYYYY);
				 
				var auditMinDate = cfind.auditMinDate ? moment(
						cfind.auditMinDate, YYYYMMDD).format(MMMDDYYYY) : '';
					 if(cfind.auditDate){
							cfind.statusDates = cfind.observationarray
							&& cfind.observationarray.length > 0
							&& cfind.observationarray[0].findingDetail.length > 0 ? cfind.observationarray[0].findingDetail[0].statusDate
							: '';
					cfind.FindingMinDate = cfind.auditDate ? moment(
							cfind.auditDate, MMMDDYYYY).format(YYYYMMDD)
							: cfind.statusDates;
					cfind.FindingMaxDate = cfind.auditDate ? moment(
							cfind.auditDate, MMMDDYYYY).format(YYYYMMDD)
							: cfind.statusDates; 
					 }
			
				if (!cfind.FindingMaxDate) {
					cfind.FindingMaxDate = auditMinDate ? auditMinDate
							: cfind.FindingMaxDate;
				}

			} else {
				cfind.minFindStatusDate = moment(val, MMMDDYYYY);
				cfind.maxFindStatusDate = moment(val2, MMMDDYYYY);
				cfind.FindingMinDate = moment(cfind.closeMeeting, MMMDDYYYY);
				cfind.FindingMaxDate = moment(cfind.openMeeting, MMMDDYYYY);
			}

			if (cfind.auditReopnedStatus) {
				cfind.minFindStatusDate =val? moment(val, MMMDDYYYY).format(YYYYMMDD): cfind.minFindStatusDate;
				cfind.maxFindStatusDate=''; cfind.FindingMinDate='';
						
			}
		}

		/** ******** for setting due date ********* */
		function setCurFindDueDate(prIndex, index, categoryId, nActionId) {

			var categoryId2 = cfind.observationarray[prIndex].findingDetail[0].categoryId;

			if (cfind.ispsEndorse && categoryId2 == 1002) {

				categoryId2 = 1003;
			}

			if (nActionId && nActionId != cfind.AppConstant.PREVIOUS_STATUS) {

				var dueDate = cfind.CarFlowStructure[cfind.auditTypeId][categoryId2][index].dueDate;

				cfind.observationarray[prIndex].findingDetail[index].dueDate = dueDate;

				if (!(isNaN(dueDate))) {

					cfind.observationarray[prIndex].findingDetail[index].dueDate = cfind.closeMeeting ? moment(
							cfind.closeMeeting, MMMDDYYYY).add(dueDate, 'days')
							.format(MMMDDYYYY)
							: '';

				} else if (dueDate == 'NEXT SCHEDULED AUDIT') {

					cfind.observationarray[prIndex].findingDetail[index].dueDate = cfind.AppConstant.AUDIT_SUB_TYPE[cfind.auditSubtypeId].nextScheduledType
							+ ' ' + cfind.inspectionAudit;
				}
			}

			if (categoryId2 == cfind.AppConstant.OBS_FINDING_CATEGORY) {

				cfind.observationarray[prIndex].findingDetail[index].nextActionId2 = 'NIL';
			}
		}

		/** ******** removing file data before upload ********* */
		function clearFileType() {

			angular.element("input[type='file']").val(null);
		}

		/** ******** for file upload ********* */
		function uploadFindingsAttach(prIndex, index) {

			_.fileUpload(cfind.observationarray, prIndex, index);

		}

		/** *** for adding data to finding array **** */
		function addItem() {
			onLoadStatusDateDisp = true;
			if (cfind.observationarray.length > 0) {

				var ismcodeLen = cfind.observationarray.length - 1;

				if (!cfind.observationarray[ismcodeLen].auditCode) {

					cfind.auditTypeId != cfind.AppConstant.DMLC_TYPE_ID ? toaster.warning("Please fill the record in the Current Finding"):
							toaster.warning("Please fill the record in the Current Review Note");												//changed by @Ramya for Jira id - IRI- 5574
					$("#collapse-" + (ismcodeLen - 1)).removeClass('in');

					var parent = angular.element(document
							.getElementById("collapse-" + (ismcodeLen - 1)));

					angular.element(parent[0].previousElementSibling).addClass(
							"collapsed");

					var parent = angular.element(document
							.getElementById("collapse-" + (ismcodeLen)));

					angular.element(parent[0].previousElementSibling)
							.removeClass("collapsed");

					$("#collapse-" + ismcodeLen).addClass('in');
					return;
				}
			}

			var findingsNo;

			cfind.findingsNo = cfind.findingsNo ? Number(cfind.findingsNo) + 1
					: 2;

			findingsNo = cfind.findingsNo;

			cfind.observationarray.push({

				"auditSeqNo" : Number(cfind.auditSeqNo),

				"findingSeqNo" : findingsNo,

				"companyId" : Number(cfind.companyId),

				"auditTypeId" : cfind.auditTypeId ? cfind.auditTypeId : '',

				"auditDate" : '',

				"auditCode" : '',

				"ismElements" : '',

				"selection" : "",

				"findingStatus" : 0,

				"userIns" : (sessionStorage.getItem("emailId")).toString(),

				"dateIns" : moment(new Date()).format(YYYYMMDD),

				"findingDetail" : [ {

					"statusSeqNo" : 1,

					"findingSeqNo" : findingsNo,

					'origAuditSeqNo' : Number(cfind.auditSeqNo),

					'currentAuditSeq' : Number(cfind.auditSeqNo),

					"companyId" : Number(cfind.companyId),

					"auditTypeId" : cfind.auditTypeId ? cfind.auditTypeId : '',

					"categoryId" : '',

					"statusId" : '',

					"statusDate" : '',

					"nextActionId" : '',

					"dueDate" : '',

					"descriptions" : '',

					"userIns" : (sessionStorage.getItem("emailId")).toString(),

					"dateIns" : moment(new Date()).format(YYYYMMDD),

					"findingRptAttachs" : []
				} ],

				"newCreate" : true

			});

			var ismcodeLen = cfind.observationarray.length - 1;

			$timeout(function() {

				$("#collapse-" + (ismcodeLen - 1)).removeClass('in');

				var parent = angular.element(document
						.getElementById("collapse-" + (ismcodeLen - 1)));

				angular.element(parent[0].previousElementSibling).addClass(
						"collapsed");

				var parent = angular.element(document
						.getElementById("collapse-" + (ismcodeLen)));

				angular.element(parent[0].previousElementSibling).removeClass(
						"collapsed");

				$("#collapse-" + ismcodeLen).addClass('in');

				$("#finIsmCode-" + ismcodeLen).focus();
			}, 0);

		}

		/** *** to remove current finding data **** */
		function removeItem(key) {

			ModalService
					.showModal(
							{

								templateUrl : 'src/modals/warning.html',

								controller : 'warningController as warn',

								inputs : {
									data : cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID ? 'Do you want to delete the Review Note'
											: 'Do you want to delete the Finding'
								},

							})
					.then(
							function(modal) {

								modal.element.modal();

								modal.close
										.then(function(result) {
											if (result == 'YES') {

												var findingsNo, newFilesToDelete, indexValue;

												cfind.observationarray
														.forEach(function(a,
																index) {

															if (a.selection == 1) {

																indexValue = index;

																findingsNo = a.findingsNo;
															}
														});

												auditFactory
														.deleteFindings(
																cfind.auditTypeId,
																cfind.auditSeqNo,
																cfind.companyId,
																cfind.observationarray[key].findingSeqNo).$promise
														.then(function(res) {

															toaster
																	.success('Data Deleted Successfully');
														});

												cfind.observationarray.splice(
														key, 1);

												var currFindScreen = (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) ? "RNOTE"
														: "CURR";

												cfind.countFindingCategory = _
														.countFindingCategory(
																cfind.observationarray,
																cfind.auditTypeId,
																currFindScreen,
																cfind.obsCategoryOptions);

												// cfind.countFindingCategory =
												// _.countFindingCategory(cfind.observationarray,[],cfind.auditTypeId,"CURR");

												saveFinding();
											}
										});

							});
		}

		function dateFormatConversion(observationarray) {

			observationarray.forEach(function(a, index) {

				a.findingDetail.forEach(function(b, index) {

					// b.dateIns = b.dateIns ?moment(new
					// Date(b.dateIns)).format(MMMDDYYYY):'';
					b.dateIns = b.dateIns ? moment(b.dateIns).format(MMMDDYYYY)
							: '';

					// b.statusDate = b.statusDate ?moment(new
					// Date(b.statusDate)).format(MMMDDYYYY):'';
					b.statusDate = b.statusDate ? moment(b.statusDate).format(
							MMMDDYYYY) : '';
				});

				// a.dateIns = a.dateIns ?moment(new
				// Date(a.dateIns)).format(MMMDDYYYY):'';
				a.dateIns = a.dateIns ? moment(a.dateIns).format(MMMDDYYYY)
						: '';

				// a.auditDate = a.auditDate ?moment(new
				// Date(a.auditDate)).format(MMMDDYYYY):'';
				a.auditDate = a.auditDate ? moment(a.auditDate).format(
						MMMDDYYYY) : '';
			});
		}

		/** ********modal window pop up for preview********* */
		function preview(file, pIndex, cIndex, index) {

			blockUI.start();

			cfind.findingFileClick = false;

			var seqNo, inputs, byteArray;

			var fileExtension = file.split('.').pop();

			var findingSeqNo = cfind.observationarray[pIndex].findingSeqNo;

			byteArray = cfind.observationarray[pIndex].findingDetail[cIndex].findingRptAttachs[index].findingFileByte;

			seqNo = cfind.auditSeqNo;

			inputs = {

				ModalData : '',

				fileData : {
					"fileName" : file,
					"audSeqNo" : seqNo,
					"findNo" : findingSeqNo,
					"findSeqNo" : (Number(cIndex) + 1),
					"audType" : cfind.auditauditType,
					"byteArray" : byteArray,
					"auditTypeId" : cfind.auditTypeId
				}

			};

			auditFactory.downloadFindingFile(seqNo, findingSeqNo, file,
					(Number(cIndex) + 1), cfind.auditTypeId, cfind.companyId).$promise
					.then(function(res) {

						if (fileExtension == 'xlsx' || fileExtension == 'docx'
								|| fileExtension == 'xls'
								|| fileExtension == 'doc') {

							if (inputs.fileData.byteArray) {

								var bytes = new Uint8Array(
										inputs.fileData.byteArray.length);

								for (var i = 0; i < inputs.fileData.byteArray.length; i++) {
									bytes[i] = inputs.fileData.byteArray
											.charCodeAt(i);
								}

								cfind
										.downloadFiles(
												new Blob(
														[ bytes.buffer ],
														{
															type : res
																	.headersGetter('content-type')
														}), file);

								blockUI.stop();

								cfind.findingFileClick = true;

								return;

							}

							cfind.downloadFiles(new Blob([ res.data ], {
								type : res.headersGetter('content-type')
							}), file);

							cfind.findingFileClick = true;

							return;
						}

						if (res.status == 200 || inputs.fileData.byteArray) {

							blockUI.stop();

							ModalService
									.showModal(
											{

												templateUrl : 'src/modals/findingPreview.html',

												controller : "findingFilePreviewController as fPrv",

												inputs : inputs

											}).then(function(modal) {

										modal.element.modal();

										cfind.findingFileClick = true;

										modal.close.then(function(result) {

											blockUI.stop();
										});

									});
						}
					});

			blockUI.stop();
		}

		/** ******** for downloading files ********* */
		function downloadFiles(blob, fileName) {

			if (window.navigator.msSaveOrOpenBlob) { // For IE:

				navigator.msSaveBlob(blob, fileName);

			} else { // For other browsers:

				var link = document.createElement('a');

				link.style = "display: none";

				link.href = window.URL.createObjectURL(blob);

				document.body.appendChild(link);

				link.download = fileName;

				link.click();

				setTimeout(function() {

					document.body.removeChild(link);

					window.URL.revokeObjectURL(link.href);

				}, 1000);

			}
		}

		/** *****for download the attached files****** */
		function downloadFindingFile(file, pIndex, cIndex, index) {

			blockUI.start();

			var seqNo, data, fileByte;

			seqNo = cfind.auditSeqNo;

			var findingSeqNo = cfind.observationarray[pIndex].findingSeqNo;

			fileByte = cfind.observationarray[pIndex].findingDetail[cIndex].findingRptAttachs[index].findingFileByte;

			if (fileByte) {

				var bytes = new Uint8Array(fileByte.length);

				for (var i = 0; i < fileByte.length; i++) {
					bytes[i] = fileByte.charCodeAt(i);
				}

				cfind.downloadFiles(new Blob([ bytes.buffer ], {
					type : 'content-type'
				}), file);

				blockUI.stop();

				return;
			}

			auditFactory.downloadFindingFile(seqNo, findingSeqNo, file,
					Number(cIndex) + 1, cfind.auditTypeId, cfind.companyId).$promise
					.then(function(res) {

						if (res.status == 200) {

							cfind.downloadFiles(new Blob([ res.data ], {
								type : 'Content-Type'
							}), file);

							blockUI.stop();

						} else {

							toaster.warning(res.data);

							blockUI.stop();
						}
					});

			blockUI.stop();
		}

		/** *****for removing the attached files****** */
		function removeFindingFiles(file, pIndex, cIndex, index) {

			ModalService
					.showModal({

						templateUrl : 'src/modals/warning.html',

						controller : 'warningController as warn',

						inputs : {
							data : 'Do you want to delete the Attachment'
						},

					})
					.then(
							function(modal) {

								modal.element.modal();

								modal.close
										.then(function(result) {

											if (result == 'YES') {

												blockUI.start();

												cfind.observationarray[pIndex].findingDetail[cIndex].findingRptAttachs
														.splice(index, 1);

												blockUI.stop();

											}
										});

							});

		}

		/** ******Lock Applied or Released********* */
		function changeCallback() {

			if (cfind.enabled) {
				cfind.createedit = 'Lock';
				detailsFactory.updateLockHolder(cfind.auditTypeId,
						cfind.auditSeqNo, sessionStorage.getItem('emailId'),
						cfind.companyId).$promise.then(function(data) {
					if (data.data == 'Success') {
						toaster.success('Lock has been applied successfully');

						cfind.lockStatus = false;

					} else {
						toaster.warning('Current ' + cfind.auditType
								+ ' Locked by '
								+ _(auditorName).chain().where({
									'emailId' : data.lockHolder
								}).pluck('firstName').toString() + ' '
								+ _(auditorName).chain().where({
									'emailId' : data.lockHolder
								}).pluck('lastName').toString());

						cfind.enabled = false;
					}
				});

			} else {
				cfind.createedit = 'Unlock';
				detailsFactory.updateLockHolder(cfind.auditTypeId,
						cfind.auditSeqNo, ' ', cfind.companyId).$promise
						.then(function(data) {
							if (data.data == 'Success') {

								toaster.success('Lock Released Successfully');

								cfind.lockStatus = true;
							}
						});
			}
		}

		function setNilNextActionForObs(pIndex, index) {

			var categoryId = cfind.observationarray[pIndex].findingDetail[index].categoryId;

			if (cfind.ispsEndorse && categoryId == 1002) {

				categoryId = 1003;
			}

			if (categoryId == cfind.AppConstant.OBS_FINDING_CATEGORY
					|| cfind.observationarray[pIndex].findingDetail[index].statusId == cfind.AppConstant.VERIFIED_CLOSED) {

				var statusDate = cfind.observationarray[pIndex].findingDetail[index].statusDate;

				// cfind.observationarray[pIndex].findingDetail[index].nextActionId
				// = statusDate ?
				// cfind.CarFlowStructure[cfind.auditTypeId][categoryId][index].nextActionId
				// : '';
				cfind.observationarray[pIndex].findingDetail[index].nextActionId2 = statusDate ? 'NIL'
						: '';
				cfind.observationarray[pIndex].findingDetail[index].dueDate = statusDate ? cfind.CarFlowStructure[cfind.auditTypeId][categoryId][index].dueDate
						: '';
			}
		}

		function setSerialNoAndStatusDate(prIndex, index, categoryId) {

			if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) {

				console.log(cfind.observationarray);
				cfind.statusDates = cfind.observationarray
						&& cfind.observationarray.length > 0
						&& cfind.observationarray[0].findingDetail.length > 0 ? cfind.observationarray[0].findingDetail[0].statusDate
						: '';

				cfind.observationarray[prIndex].findingDetail[index].statusDate = cfind.auditDate ? moment(
						cfind.auditDate, MMMDDYYYY).format(MMMDDYYYY)
						: cfind.statusDates;
			}

			if (index == 0) {

				var num = '';
				var arr = cfind.observationarray.filter(function(a, ind) {
					return a.findingDetail[0].categoryId == categoryId
							&& ind != prIndex;
				});
				var maxFindSeqSameCat = {};

				if (arr && arr.length > 0) {
					maxFindSeqSameCat = arr[arr.length - 1];
				}

				num = (maxFindSeqSameCat && maxFindSeqSameCat.serialNo) ? Number(maxFindSeqSameCat.serialNo
						.substring(maxFindSeqSameCat.serialNo.lastIndexOf('-') + 1)) + 1
						: 1;

				cfind.observationarray[prIndex].serialNo = cfind.auditReportNo
						+ '-' + _(cfind.obsCategoryOptions).chain().where({
							'findingsCategoryId' : Number(categoryId)
						}).pluck('findingsCategoryDesc').toString() + '-' + num;

				if (cfind.auditTypeId == cfind.AppConstant.DMLC_TYPE_ID) {
					cfind.observationarray[prIndex].serialNo = cfind.auditReportNo
							+ '-' + 'REVIEW NOTE' + '-' + num;
				}
			}
		}

		function setUpdateDescOnPlaceChange(prIndex, index) {

			if (cfind.observationarray && cfind.observationarray[prIndex].findingDetail && cfind.observationarray[prIndex].findingDetail[index].updateDescription) {

				var msg = '';

				if (cfind.observationarray[prIndex].findingDetail[index].statusDate) {

					if (cfind.observationarray[prIndex].findingDetail[index].statusId == cfind.AppConstant.PLAN_ACCEPTED) {

						msg = 'Plan Accepted Status has been updated as part of CAR at '
								+ cfind.observationarray[prIndex].findingDetail[index].auditPlace
								+ ' by '
								+ sessionStorage.getItem('usrname')
								+ ' on '
								+ cfind.observationarray[prIndex].findingDetail[index].statusDate;// moment(new
																									// Date()).format(MMMDDYYYY);

					} else if (cfind.observationarray[prIndex].findingDetail[index].statusId == cfind.AppConstant.VERIFIED_CLOSED) {

						msg = 'Verify/Close Status has been updated as part of CAR at '
								+ cfind.observationarray[prIndex].findingDetail[index].auditPlace
								+ ' by '
								+ sessionStorage.getItem('usrname')
								+ ' on '
								+ cfind.observationarray[prIndex].findingDetail[index].statusDate;// moment(new
																									// Date()).format(MMMDDYYYY);
					}

				} else {
					msg = '';
				}

				cfind.observationarray[prIndex].findingDetail[index].updateDescription = msg;

			} else if (cfind.openForCar) {

				var msg = '';

				if (cfind.observationarray[prIndex].findingDetail[index].statusId == cfind.AppConstant.PLAN_ACCEPTED) {

					msg = 'Plan Accepted Status has been updated as part of CAR at '
							+ cfind.observationarray[prIndex].findingDetail[index].auditPlace
							+ ' by '
							+ sessionStorage.getItem('usrname')
							+ ' on '
							+ cfind.observationarray[prIndex].findingDetail[index].statusDate;// moment(new
																								// Date()).format(MMMDDYYYY);

				} else if (cfind.observationarray[prIndex].findingDetail[index].statusId == cfind.AppConstant.VERIFIED_CLOSED) {

					msg = 'Verify/Close Status has been updated as part of CAR at '
							+ cfind.observationarray[prIndex].findingDetail[index].auditPlace
							+ ' by '
							+ sessionStorage.getItem('usrname')
							+ ' on '
							+ cfind.observationarray[prIndex].findingDetail[index].statusDate;// moment(new
																								// Date()).format(MMMDDYYYY);
				}
			}

		}// end of setUpdateDescOnPlaceChange()

		/** ******* END OF FINDING CONTROLLER ********* */
	}

})();