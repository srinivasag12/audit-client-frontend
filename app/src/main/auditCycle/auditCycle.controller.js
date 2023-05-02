(function () {
	'use strict'
	angular
		.module('app.auditCycle')
		.controller('auditCycleController', auditCycleController)
		.controller('auditCycleDetaileController', auditCycleDetaileController);

	function auditCycleController(masterData, ModalService, getAllAuditSubTypes, getAuditType, detailsFactory, $cookies, $window, $timeout, AppConstant, getAudObsDataMangers, auditCycleFactory, YYYYMMDD, MMMDDYYYY, DTOptionsBuilder, DTColumnBuilder, $q, toaster, $compile, $scope, $state, blockUI, DDMMYYYY) {

		var cycle = this; console.log(cycle);

		cycle.AppConstant = AppConstant;

		cycle.dtInstance = {}; cycle.showBlock = false;

		//cycle.showBlock = false;  

		cycle.shortingBy = '';

		cycle.getAuditCycleHistory = getAuditCycleHistory;

		cycle.getAuditCycleHistorydata = {};


		cycle.shortingOrder = '';

		cycle.setDataTableData = setDataTableData;

		cycle.vesselTypeArray = masterData.vesselTypeData;

		cycle.audtype = getAuditType;

		cycle.getAllAuditSubTypes = getAllAuditSubTypes;

		cycle.companyDetails = masterData.companyDetails;

		cycle.getAuditCycleData = getAuditCycleData;

		cycle.getPreviousAuditDetail = getPreviousAuditDetail;

		cycle.auditorNameArray = getAudObsDataMangers;

		cycle.MangerNameArray = getAudObsDataMangers;

		cycle.vesselDataFromRmi = [];

		cycle.vesselDetails = vesselDetails;

		cycle.vesselSpecificDtl = vesselSpecificDtl;

		cycle.setvesselImoNo = setvesselImoNo;

		cycle.createCycle = createCycle;

		cycle.dateFormatConversion = dateFormatConversion;

		cycle.auditCycleData = {};

		cycle.audsubtypeIteration = {};

		cycle.audsubtypeIterationForCyle = {};

		cycle.retrieveCycleDates = retrieveCycleDates;

		cycle.genrateCycleDates = genrateCycleDates;

		cycle.companyId = Number($window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '');

		cycle.userName = sessionStorage.getItem("usrname");

		cycle.managerName = cycle.userName;

		cycle.validateAuditCycle = validateAuditCycle;

		cycle.auditCycle = sessionStorage.getItem("auditCycleData");

		cycle.cycleSkip = cycleSkip;

		$scope.pagination = {};

		cycle.pageNo = 0;

		cycle.iteratorVal = '';

		cycle.iteratorVal1 = '';

		cycle.vesselImoModel = vesselImoModel;

		cycle.validateVessel = validateVessel;

		cycle.doBlur = doBlur;

		cycle.clearData = clearData;

		cycle.auditTypeChange = auditTypeChange;

		cycle.imolabelVal = 'vesselImoNo';

		cycle.onChangecreditDate = onChangecreditDate;

		cycle.leadchange = leadchange;

		cycle.leadchange1 = '';

		cycle.userRoleId = sessionStorage.getItem('userRoleId');

		cycle.imolabelValOptions = [{
			'index': 0,
			'imolabelValTypeDesc': 'IMO Number',
			'directive': 'numeric',
			'reqUrl': 'vesselImoNo'
		}, {
			'index': 1,
			'imolabelValTypeDesc': 'Vessel Name',
			'directive': 'auditplace',
			'reqUrl': 'vesselName'
		}, {
			'index': 2,
			'imolabelValTypeDesc': 'Official No',
			'directive': 'numeric',
			'reqUrl': 'officialNumber'
		}];

		cycle.disableAll = false;
		cycle.cycleWithAudit = false;
		cycle.cycleWithoutAudit = false;
		cycle.disableSave = false;
		cycle.someClickHandler = someClickHandler

		cycle.audtype = cycle.audtype.filter(function (obj) {
			return (obj.auditTypeId < cycle.AppConstant.SSP_TYPE_ID)
		});

		cycle.auditorNameArray = cycle.auditorNameArray.filter(function (obj) {
			return (obj.roles[0] && obj.roles[0].roleId != 1003);
		});

		cycle.MangerNameArray = cycle.MangerNameArray.filter(function (obj) {
			return (obj.roles[0] && obj.roles[0].roleId == 1003);
		});

		cycle.defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 5;

		$timeout(function () {
			//	if(sessionStorage.getItem('auditCycleSearchBean').withAudit || sessionStorage.getItem('auditCycleSearchBean').auditCycleCreatedSuccessfully  ){
			cycle.auditTypeId = sessionStorage.getItem('auditCycleSearchBean').auditTypeId ? sessionStorage.getItem('auditCycleSearchBean').auditTypeId : '';
			cycle.auditSubTypeId = sessionStorage.getItem('auditCycleSearchBean').auditSubTypeId ? sessionStorage.getItem('auditCycleSearchBean').auditSubTypeId : '';
			cycle.vesselImoNo = sessionStorage.getItem('auditCycleSearchBean').vesselImoNo ? sessionStorage.getItem('auditCycleSearchBean').vesselImoNo : '';
			cycle.vesselName = sessionStorage.getItem('auditCycleSearchBean').vesselName ? sessionStorage.getItem('auditCycleSearchBean').vesselName : '';
			cycle.companyImoNo = sessionStorage.getItem('auditCycleSearchBean').companyImoNo ? sessionStorage.getItem('auditCycleSearchBean').companyImoNo : '';
			cycle.companyDoc = sessionStorage.getItem('auditCycleSearchBean').companyDoc ? sessionStorage.getItem('auditCycleSearchBean').companyDoc : '';
			cycle.docTypeNumber = sessionStorage.getItem('auditCycleSearchBean').docTypeNumber ? sessionStorage.getItem('auditCycleSearchBean').docTypeNumber : '';
			cycle.vesselId = sessionStorage.getItem('auditCycleSearchBean').vesselId ? sessionStorage.getItem('auditCycleSearchBean').vesselId : '';
			cycle.imolabelVal = 'vesselImoNo';
			//}

			if (cycle.auditTypeId && cycle.vesselImoNo) {
				cycle.vesselDetails(cycle.vesselImoNo, 'vesselImoNo');
				cycle.getAuditData(cycle.auditTypeId);
				cycle.getAuditCycleData(cycle.auditTypeId);
				cycle.getPreviousAuditDetail(cycle.auditTypeId);
			}
		}, 200);


		function vesselDetails(vesselImoNo, searchBy) {
			//   blockUI.start();
			var vesData = vesselImoNo;
			cycle.vesselDetail = {};
			var msg = '';
			cycle.vesselCompanyDtl = {};
			console.log(searchBy);
			if (searchBy == 'vesselImoNo') {
				msg = 'IMO Number';
			} else if (searchBy == 'vesselName') {
				msg = 'Vessel Name';
			} else if (searchBy == 'officialNumber') {
				msg = 'Official No';
			}
			console.log(searchBy);
			if (searchBy == 'vesselName' && vesselImoNo.replace(/[*]/g, '').length < 3) {
				console.log(searchBy);
				toaster.warning('Please enter atleast 3 characters');
				vesselImoNo = '';
				console.log(searchBy);
			} else if (searchBy == 'vesselName' && vesselImoNo.length >= 3) {
				console.log(searchBy);
				var vesselImoNo2 = '';
				var i;
				for (i = 0; i < vesselImoNo.length; i++) {
					if ((i == 0 || i == vesselImoNo.length - 1) && vesselImoNo[i] == '*') {
						vesselImoNo2 = vesselImoNo2 + '%';
					} else if (vesselImoNo[i] == '*') {
						vesselImoNo2 = vesselImoNo2 + '_';
					} else {
						vesselImoNo2 = vesselImoNo2 + vesselImoNo[i];
					}
				}
				console.log(searchBy);
				vesselImoNo = vesselImoNo2;
			}

			if (vesselImoNo && ((vesselImoNo.length == 7 && searchBy == 'vesselImoNo') || searchBy != 'vesselImoNo')) {

				detailsFactory.vesselDetails(cycle.companyId, (sessionStorage.getItem('emailId')).toString(), vesselImoNo, searchBy).$promise.then(function (res) {
					console.log(res);
					//	blockUI.stop();
					$timeout(function () {

						cycle.vesselDataFromRmi = angular.copy(res);

						if (cycle.vesselDataFromRmi.length == 1) {

							var selectedVsl = cycle.vesselDataFromRmi[0];
							cycle.vesselSpecificDtl(selectedVsl);

						} else if (cycle.vesselDataFromRmi.length > 0) {

							//det.imolabelVal = 'vesselImoNo';
							cycle.vesselImoModel(cycle.vesselDataFromRmi, vesData, searchBy);

						} else {
							//det.validateVessel();
							toaster.warning('No vessel present with entered ' + msg);
						}

					}, 0);

					return res;
				});
			}
		}//end of vesselDetails


		function vesselSpecificDtl(object) {
			var vesselImoNo = object.imoNumber, docTypeNum = object.vesselID;

			detailsFactory.vesselSpecificDtl(cycle.companyId, (sessionStorage.getItem('emailId')).toString(), vesselImoNo, docTypeNum).$promise.then(function (res) {
				console.log(res);
				/*if(!res.leadSign){
					toaster.warning("Your signature doesn't exist in the IRI System");
					return;
				}*/
				res = angular.copy(res.vsselDtl);
				console.log(res);

				cycle.imolabelVal = 'vesselImoNo';

				cycle.imolabelVal = 'vesselImoNo';

				cycle.vesselImoNo = res.vesselImoNo;

				cycle.companyImoNo = res.companyImoNo;

				cycle.companyDoc = res.vesselCompany.docTypeNo;
				cycle.docTypeNumber = res.docTypeNumber;
				cycle.vesselId = res.vesselId;

				cycle.setvesselImoNo(res);
			});
		}


		function vesselImoModel(vesselList, vesselImoNo, searchBy) {

			ModalService.showModal({

				templateUrl: 'src/modals/vesselImoNo.html',

				controller: 'vesselController as vc',

				inputs: {

					scope: { 'vesselList': vesselList, 'vesselImoNo': vesselImoNo, 'searchBy': searchBy }

				}

			}).then(function (modal) {

				modal.element.modal();

				modal.close.then(function (result) {
					if (result == 'OK') {

						var selectedVsl = _.findWhere(vesselList, { 'check': 1 });

						if (selectedVsl) {
							cycle.vesselSpecificDtl(selectedVsl);
						} else {
							cycle.validateVessel();
						}
					} else {
						cycle.validateVessel();
					}
				});

			});
		}//end of vesselImoModel


		/***** Audit/Inspection/Review Create/Update time, from selected Vessel ImoNo getting vessel and company details *****/
		function setvesselImoNo(item) {

			if (item.tcApprovalStatus == "1") {
				cycle.vesselDetail = angular.copy(item);
				cycle.vesselName = cycle.vesselDetail.vesselName;
			}
		}//setvesselImoNo(p1) end



		/***** for getting audit data *****/
		cycle.getAuditData = function (auditTypeId) {
			cycle.audsubtype = cycle.getAllAuditSubTypes.filter(function (obj) {
				obj.auditLastSubtypeDesc = obj.auditSubtypeDesc;
				return (obj.auditTypeId == auditTypeId);
			});

			cycle.audsubtypeIteration = angular.copy(cycle.audsubtype);

			console.log(cycle.getAllAuditSubTypes);
			cycle.audsubtypeIterationForCyle = cycle.getAllAuditSubTypes.filter(function (obj) {
				obj.startDate = '';
				obj.dueDate = '';
				obj.endDate = '';
				obj.check = 0;

				return (obj.auditTypeId == auditTypeId && obj.auditSubtypeId != cycle.AppConstant.INTERIM_SUB_TYPE_ID && obj.auditSubtypeId != cycle.AppConstant.ADDITIONAL_SUB_TYPE_ID);
			});
			console.log(cycle.audsubtypeIterationForCyle);
		}


		/**To generate new auditcycle based on creditdate,START code added by Archana */
		function onChangecreditDate() {
			console.log("abcc");
			console.log(cycle.audsubtypeIterationForCyle != null);
			if (cycle.audsubtypeIterationForCyle != null) {
				console.log(cycle.audsubtypeIterationForCyle != null);
				cycle.audsubtypeIterationForCyle[0].check = 0;
				cycle.audsubtypeIterationForCyle[1].check = 0;
				cycle.audsubtypeIterationForCyle[2].check = 0;
				cycle.auditCycleData.initialCheck = 0;
				cycle.auditCycleData.intermediatecheck = 0;
				cycle.auditCycleData.renewalcheck = 0

			}

		}
		/**To generate new auditcycle based on creditdate,END code added by Archana */


		function createCycle() {
			if (cycle.validateAuditCycle()) {

				cycle.auditCycleData.creditDate = cycle.creditDate;
				console.log(cycle.audsubtypeIterationForCyle);

				cycle.audsubtypeIterationForCyle.forEach(function (a) {
					if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
						cycle.auditCycleData.nextIntermediateStart = a.startDate ? a.startDate : '';
						cycle.auditCycleData.nextIntermediateEnd = a.endDate ? a.endDate : '';
						cycle.auditCycleData.intermediateDueDate = a.dueDate ? a.dueDate : '';
						cycle.auditCycleData.intermediatecheck = a.check ? a.check : 0;

					} if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID) {
						cycle.auditCycleData.nextRenewal = a.endDate ? a.endDate : '';
						cycle.auditCycleData.nextRenewalStart = a.startDate ? a.startDate : moment(a.endDate).subtract(3, 'months').format(YYYYMMDD);
						cycle.auditCycleData.nextRenewalDueDate = a.endDate ? a.endDate : '';
						cycle.auditCycleData.renewalcheck = a.check ? a.check : 0;
					}
					if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
						cycle.auditCycleData.creditDate = a.startDate ? a.startDate : '';
						cycle.auditCycleData.initialCheck = a.check ? a.check : 0;
					}
					console.log(cycle.auditCycleData.initialCheck);
				});
				cycle.auditCycleData.cycleGenNo = cycle.auditCycleData.cycleGenNo ? cycle.auditCycleData.cycleGenNo : 0;
				cycle.auditCycleData.auditTypeId = cycle.auditTypeId;
				cycle.auditCycleData.auditSubTypeId = cycle.auditSubTypeId;
				cycle.auditCycleData.vesselId = cycle.vesselId;
				cycle.auditCycleData.companyDoc = cycle.companyDoc;
				cycle.auditCycleData.docTypeNumber = cycle.docTypeNumber;
				cycle.auditCycleData.companyId = cycle.companyId;
				cycle.auditCycleData.iterator = cycle.auditCycleData.iterator ? cycle.auditCycleData.iterator : 1;
				cycle.auditCycleData.subIterator = cycle.auditCycleData.subIterator ? cycle.auditCycleData.subIterator : 1;
				cycle.auditCycleData.vesselImoNo = cycle.vesselImoNo;
				cycle.auditCycleData.companyImoNo = cycle.companyImoNo;
				cycle.auditCycleData.dateIns = moment(new Date()).format(YYYYMMDD);
				cycle.auditCycleData.userIns = sessionStorage.getItem('emailId');

				if (cycle.leadchange1 == 1) {
					cycle.auditCycleData.leadNameFromAuditCycle = cycle.leadName.firstName + ' ' + cycle.leadName.lastName;
					if (cycle.auditCycleData.leadNameFromAuditCycle == "undefined undefined") {
						cycle.auditCycleData.leadNameFromAuditCycle = cycle.leadName;
					}
				} else {
					cycle.auditCycleData.leadNameFromAuditCycle = cycle.leadName;
				}

				// cycle.auditCycleData.leadNameFromAuditCycle = cycle.leadName.firstName+' '+cycle.leadName.lastName;
				cycle.auditCycleData.roleId = cycle.userRoleId ? cycle.userRoleId : '';
				cycle.auditCycleData.cycleSeqNo = cycle.auditCycleData.cycleSeqNo ? cycle.auditCycleData.cycleSeqNo : 1;
				cycle.dateFormatConversion(cycle.auditCycleData, MMMDDYYYY, YYYYMMDD);

				if ((cycle.auditCycleData.auditSubTypeId == 1004 && cycle.auditCycleData.auditSubTypeId == 1003 && cycle.auditCycleData.auditSubTypeId == 1005) && cycle.auditCycleData.cycleSeqNo == 1 && cycle.auditCycleData.roleId != 1001) {
					cycle.auditCycleData.createOrUpdate = 'UPDATE';
				}
				if ((cycle.auditCycleData.auditSubTypeId != 1001 && cycle.auditCycleData.auditSubTypeId != 1002) && !cycle.currentAuditUnderProcees && cycle.auditCycleData.cycleSeqNo != 1) {
					cycle.auditCycleData.createOrUpdate = 'CREATE';
					cycle.auditCycleData.auditSeqNo = '';
					cycle.auditCycleData.cycleSeqNo = 1;
					cycle.auditCycleData.cycleGenNo = cycle.auditCycleData.cycleGenNo + 1;
					cycle.auditCycleData.roleId = cycle.userRoleId;

				}

				console.log(cycle.auditCycleData);
				var dataSearch = {
					'vesselImoNo': cycle.vesselImoNo ? cycle.vesselImoNo : '',
					'auditTypeId': cycle.auditTypeId ? cycle.auditTypeId : '',
					'auditSubTypeId': cycle.auditSubTypeId ? cycle.auditSubTypeId : '',
					'vesselName': cycle.vesselName ? cycle.vesselName : '',
					'companyImoNo': cycle.companyImoNo ? cycle.companyImoNo : '',
					'withAudit': cycle.cycleWithAudit ? cycle.cycleWithAudit : '',
					'docTypeNumber': cycle.docTypeNumber ? cycle.docTypeNumber : '',
					'companyDoc': cycle.companyDoc ? cycle.companyDoc : '',
					'vesselId': cycle.vesselId ? cycle.vesselId : '',
					'auditCycleCreatedSuccessfully': true
				}

				var auditcycledata = cycle.auditCycleData;

				blockUI.start('Creating Audit Cycle');

				auditCycleFactory.createAuditCycle(auditcycledata, cycle.companyId).$promise.then(function (res) {
					console.log(res);
					console.log(cycle.leadName);
					cycle.auditCycleData = angular.copy(res.updatedData);
					blockUI.stop();

					if (res.$resolved == true && res.updatedData.vesselImoNo) {
						cycle.auditCycleSearchValues(dataSearch);
						if (cycle.auditCycleData.createOrUpdate && cycle.auditCycleData.createOrUpdate == 'UPDATE') { toaster.success('Audit Cycle Updated successfully '); } else {
							toaster.success('Audit Cycle Created successfully ');
						}
					}
				});
			}
		}


		function leadchange() {
			cycle.leadchange1 = 1;
		}


		/**To get previous audit details start code added by Archana */
		function getPreviousAuditDetail(auditTypeId) {
			detailsFactory.getPreviousAuditDetail(cycle.auditTypeId, cycle.vesselImoNo, cycle.companyId).$promise.then(function (d) {
				console.log(d);
				var useflag = 0;
				var notVoid = true;
				d.prevAuditDtl.forEach(function (prevAudit) {
					if (notVoid) {
						if (prevAudit.auditStatusId != 1004) {
							useflag = 1;
						}
						if (useflag == 1) {
							d.previouseAudit = prevAudit;
							notVoid = false;
						}
					}

				});
				//  d.previouseAudit = d.prevAuditDtl[0];
				console.log(d.previouseAudit);
				if (d.previouseAudit.auditDate && d.previouseAudit.auditSubTypeId) {
					cycle.cycleWithAudit = true;
				}
				cycle.dateFormatConversion(d.previouseAudit, YYYYMMDD, MMMDDYYYY);
				cycle.auditDate = d.previouseAudit.auditDate;
				console.log(cycle);
				console.log(cycle.audsubtypeIterationForCyle);

				cycle.auditSubTypeId = d.previouseAudit.auditSubTypeId;
				cycle.auditLastSubtypeDesc = d.previouseAudit.audSubTypeDesc;

				console.log(cycle.auditSubTypeId);
				console.log(cycle.auditLastSubtypeDesc);
				console.log(cycle.auditDate);
				console.log(d.previouseAudit.auditSubTypeId);
				var voidAuditlen = 0;
				d.prevAuditDtl.forEach(function (am) {
					if (am.auditStatusId == 1004) {
						voidAuditlen = voidAuditlen + 1;
					}
				});
				console.log(d.prevAuditDtl.length);
				if (voidAuditlen == d.prevAuditDtl.length) {
					console.log("working");
					cycle.getAuditCycleData(cycle.auditTypeId);
				}
				/**added by archana for jira id-IRI-5392 start */
				if(d.prevAuditDtl.length != 0 && d.previouseAudit.auditSubTypeId != 1004){  
					// changed by archana for jira id-IRI-5438
					var message = d.previouseAudit.auditTypeId == 1003 ? 'Inspection' : 'Audit';
					if(d.previouseAudit.auditStatusId != 1002 && d.previouseAudit.auditStatusId !=1004 ){ //added by archana for jira id-IRI-5426 
					    toaster.warning('current ' + message + ' is in process');
					    cycle.currentAuditUnderProcees = true;						
					}
					
					if (cycle.cycleWithAudit && cycle.creditDate ) {
						cycle.auditCycleData.audSubTypeDesc = d.previouseAudit.audSubTypeDesc;
						cycle.genrateCycleDatesShow(cycle.creditDate);
						cycle.getAuditCycleHistory(cycle.pageNo);
                    } else if (cycle.creditDate) {
						cycle.getAuditCycleHistory(cycle.pageNo);
						}
				}
				/**added by archana for jira id-IRI-5392 end */

			});
		}
		/**To get previous audit details end */


		function getAuditCycleData(auditTypeId) {

			auditCycleFactory.getAuditCycleData(cycle.vesselImoNo, auditTypeId, cycle.companyId).$promise.then(function (res) {
				cycle.disableSave = false;
				console.log(res);
				console.log(cycle.audsubtypeIterationForCyle);
				console.log(cycle.auditCycleData);
				if (res[0]) {

					cycle.auditCycleData = angular.copy(res[0]);
					console.log(cycle.auditCycleData);
					/**fixed IRI-5125,IRI-5124,IRI-5126,IRI-5127 code added by Archana */
					if (!cycle.auditCycleData.intermediateDueDate) {
						cycle.auditCycleData.intermediatecheck = 1;


					} else {
						cycle.auditCycleData.intermediatecheck = 0;

					}
					if (!cycle.auditCycleData.nextRenewalDueDate) {
						cycle.auditCycleData.renewalcheck = 1;

					}
					else {
						cycle.auditCycleData.renewalcheck = 0;
					}

					if (!cycle.auditCycleData.creditDate) {


						cycle.auditCycleData.initialCheck = 1;

					}
					else {
						cycle.auditCycleData.initialCheck = 0;
					}
					console.log(cycle.auditCycleData.initialCheck);
					console.log("dddd");
					console.log(cycle.auditCycleData);

					if (res[1]) {
						cycle.auditCycleDataPrevious = angular.copy(res[1]);
						//cycle.dateFormatConversion(cycle.auditCycleDataPrevious,YYYYMMDD,MMMDDYYYY);
					}

					res = res[0];
					cycle.auditCycleData.auditSeqNo = cycle.auditCycleData.auditSubTypeId == 1004 ? cycle.auditCycleData.cycleSeqNo : cycle.auditCycleData.auditSeqNo;

					detailsFactory.getAuditDetail(cycle.auditCycleData.auditTypeId, cycle.companyId, cycle.auditCycleData.auditSeqNo).$promise.then(function (res) {
						cycle.currentAuditDetail = angular.copy(res);

						cycle.creditDate = (cycle.currentAuditDetail.creditDate) ? moment(cycle.currentAuditDetail.creditDate, YYYYMMDD).format(MMMDDYYYY) : cycle.creditDate;

						if (cycle.currentAuditDetail && (cycle.currentAuditDetail.auditSeqNo == cycle.auditCycleData.auditSeqNo || (1 == 7))) {
							cycle.currentAuditDetail.auditAuditorDetail.forEach(function (i) {
								if (i.auditRoleID == 1001 && !i.audSignature) {
									if(cycle.auditCycleData.auditStatusId != 1002 && cycle.auditCycleData.auditStatusId != 1004){ // added by archana for jira id-IRI-5426
										var msg = i.auditTypeId == 1003 ? 'Inspection' : 'Audit';
									      toaster.warning('current ' + msg + ' is in process');
									      cycle.currentAuditUnderProcees = true;
									}
								} else if (i.auditRoleID == 1001 && i.audSignature && cycle.auditCycleData.auditSubTypeId == 1004) {
									cycle.renewalComplted = true;
								}
							});
						}
					});

					$scope.pagination.current = cycle.pageNo + 1;

					$scope.pagination.totalItemCount = res.cycleGenNo; // added by archana for jira id-IRI-5389

					if (cycle.auditCycleData.creditDate && cycle.auditCycleData.auditDate) {
						cycle.cycleWithAudit = true;
						cycle.cycleWithoutAudit = false;
						cycle.disableAll = true;
						sessionStorage.setItem('auditCycleData', 'withAudit');
						cycle.auditCycleSearchValues(res);
					} else {
						cycle.disableAll = false;
						cycle.cycleWithAudit = false;
						cycle.cycleWithoutAudit = true;
						cycle.auditCycleSearchValues(res);
						sessionStorage.setItem('auditCycleData', 'withOutAudit');
					}
					cycle.auditSubTypeId = cycle.auditCycleData.auditSubTypeId;

					cycle.dateFormatConversion(cycle.auditCycleData, YYYYMMDD, MMMDDYYYY);
					console.log(cycle.creditDate);
					// cycle.leadName2 = cycle.auditCycleData.leadAuditorName?cycle.auditCycleData.leadAuditorName:cycle.auditCycleData.leadNameFromAuditCycle;
					cycle.leadName = cycle.auditCycleData.leadAuditorName ? cycle.auditCycleData.leadAuditorName : cycle.auditCycleData.leadNameFromAuditCycle;
					cycle.creditDate = cycle.auditCycleData.creditDate ? cycle.auditCycleData.creditDate : '';
					cycle.auditDate = cycle.auditCycleData.auditDate ? cycle.auditCycleData.auditDate : '';
					cycle.managerName = cycle.userName ? cycle.userName : '';
					cycle.nextInterStart = cycle.auditCycleData.nextIntermediateStart;
					cycle.nextInterEnd = cycle.auditCycleData.nextIntermediateEnd;

					if (cycle.cycleWithAudit && cycle.auditCycleData.creditDate) {
						cycle.genrateCycleDatesShow(cycle.creditDate);
						console.log('am');
						cycle.getAuditCycleHistory(cycle.pageNo);

					} else if (cycle.creditDate) {
						cycle.getAuditCycleHistory(cycle.pageNo);
						console.log('mm');
						// cycle.genrateCycleDates(cycle.creditDate);
						//  cycle.retrieveCycleDates();
					}
					cycle.retrieveCycleDates();
					//        	if(cycle.auditSubTypeId && (cycle.auditSubTypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID || cycle.auditSubTypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID)){
					//        		//cycle.audsubtypeIterationForCyle.splice(0, 1); 
					//        	  }
				}

			});

		}


		/****date format conversion****/
		function dateFormatConversion(obj, formPattern, toPattern) {

			if (formPattern == YYYYMMDD && toPattern == MMMDDYYYY) {

				obj.creditDate = obj.creditDate ? moment(obj.creditDate, formPattern).format(toPattern) : '';
				obj.nextIntermediateEnd = obj.nextIntermediateEnd ? moment(obj.nextIntermediateEnd, formPattern).format(toPattern) : '';
				obj.nextIntermediateStart = obj.nextIntermediateStart ? moment(obj.nextIntermediateStart, formPattern).format(toPattern) : '';
				obj.nextRenewal = obj.nextRenewal ? moment(obj.nextRenewal, formPattern).format(toPattern) : '';
				obj.dateIns = obj.dateIns ? moment(new Date(obj.dateIns), formPattern).format(toPattern) : '';
				obj.auditDate = obj.auditDate ? moment(obj.auditDate, formPattern).format(toPattern) : '';
				obj.nextRenewalStart = obj.nextRenewal ? moment(obj.nextRenewalStart, formPattern).format(toPattern) : '';
				obj.nextRenewalDueDate = obj.nextRenewalDueDate ? moment(obj.nextRenewalDueDate, formPattern).format(toPattern) : '';
				obj.intermediateDueDate = obj.intermediateDueDate ? moment(obj.intermediateDueDate, formPattern).format(toPattern) : '';


			} else if (formPattern == MMMDDYYYY && toPattern == YYYYMMDD) {

				obj.creditDate = obj.creditDate ? moment(obj.creditDate, formPattern).format(toPattern) : '';
				obj.nextIntermediateEnd = obj.nextIntermediateEnd ? moment(obj.nextIntermediateEnd, formPattern).format(toPattern) : '';
				obj.nextIntermediateStart = obj.nextIntermediateStart ? moment(obj.nextIntermediateStart, formPattern).format(toPattern) : '';
				obj.nextRenewal = obj.nextRenewal ? moment(obj.nextRenewal, formPattern).format(toPattern) : '';
				obj.nextRenewalStart = obj.nextRenewal ? moment(obj.nextRenewalStart, formPattern).format(toPattern) : '';
				obj.dateIns = obj.dateIns ? moment(new Date(obj.dateIns), formPattern).format(toPattern) : '';
				obj.auditDate = obj.auditDate ? moment(obj.auditDate, formPattern).format(toPattern) : '';
				obj.nextRenewalDueDate = obj.nextRenewalDueDate ? moment(obj.nextRenewalDueDate, formPattern).format(toPattern) : '';
				obj.intermediateDueDate = obj.intermediateDueDate ? moment(obj.intermediateDueDate, formPattern).format(toPattern) : '';


			}

		}


		function someClickHandler(info) {

			ModalService.showModal({

				templateUrl: 'src/modals/auditCycleHistory.html',

				controller: 'auditCycleDetaileController as aCycle',

				inputs: { data: info },

			}).then(function (modal) {

				modal.element.modal();

				modal.close.then(function (result) {

					if (result != 'Cancel') {


					} else {

					}
				});
			});
			blockUI.stop();
		}


		function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			// Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
			$('td', nRow).unbind('click');
			$('td', nRow).bind('click', function () {
				$scope.$apply(function () {
					/** added by archana for jira id-IRI-5389 start */
                    auditCycleFactory.getAllCycleDate(cycle.auditTypeId, cycle.vesselImoNo, 2).$promise.then(function (cycleAllData) {
						cycle.cycleAllData = angular.copy(cycleAllData);
						console.log(cycle.cycleAllData);
						 var a = cycleAllData;
						cycle.cycleAllData.forEach(function (k) {
							if (aData.cycleGenNo == k.cycleGenNo) {
									aData.auditCycle = angular.copy(k);
									}
							});
					   cycle.someClickHandler(aData);
						});
				   /** added by archana for jira id-IRI-5389 end */
					// cycle.someClickHandler(aData);   // commented by archana for jira id-IRI-5426
				});
			});
			return nRow;
		}
		cycle.tempFun = function (data) {

			cycle.tempFunValidate = true;
			cycle.setDataTableData(data);
		}


		function setDataTableData(data) {

			var temp, j = 0;
			if (data.length > 0 && !cycle.filterCondition && !cycle.tempFunValidate) {
				auditCycleFactory.getAllCycleDate(cycle.auditTypeId, cycle.vesselImoNo, 2).$promise.then(function (cycleAllData) {
					cycle.cycleAllData = angular.copy(cycleAllData);
					var a = cycleAllData;
					console.log(a);
					cycle.cycleAllData.forEach(function (k) {

						data.forEach(function (i) {
							if (i.cycleGenNo == k.cycleGenNo) {
								i.auditCycle = angular.copy(k);
								console.log(i);
							}
							j++;
							cycle.iteratorVal = (cycle.iteratorVal > k.cycleGenNo) ? cycle.iteratorVal : k.cycleGenNo;//?  k.cycleGenNo :cycle.iteratorVal ;

							if (j == data.length) {

								cycle.tempFun(data);

							}
						});
					});
				});
			}


			cycle.pagination = true;

			$scope.pagination.totalPages = Math.ceil(Number($scope.pagination.totalItemCount) / cycle.defaultSearchCount);

			// $scope.pagination.current = 1 + 1;
			if ($scope.pagination.totalPages == 0) {

				$scope.pagination.current = 0;
			} 
			/**added by archana for jira id-IRI-5389 start */
			// else if($scope.pagination.totalPages == 1){
            //     $scope.pagination.current = 1;
			// }
			/**added by archana for jira id-IRI-5389 end */

			$scope.pagination.last = $scope.pagination.totalPages;

			sessionStorage.setItem('currPageNo', $scope.pagination.current);

			var defer = $q.defer();

			defer.resolve(data);

			cycle.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)

				.withDOM('<<"tableinside"t>>').withOption('deferRender', true)

				.withOption('order', [[cycle.shortingBy ? cycle.shortingBy : 0, cycle.shortingOrder ? cycle.shortingOrder : 'asc']])//.newOptions()

				.withDisplayLength(25)

				.withOption('responsive', true)

				.withOption('rowCallback', rowCallback)

				.withOption('createdRow', function (row, data, dataIndex) {

					$compile(angular.element(row).contents())($scope);

				});

			cycle.dtColumns = [
				DTColumnBuilder.newColumn(null).withTitle('').renderWith(function (data) {
					return '';
				}),
				DTColumnBuilder.newColumn(null).withTitle('AUDIT CYCLE').notSortable().renderWith(function (data) {
					if (!data) { return '-' } else {
						var temp = ''
						var cycleGenNo = data.cycleGenNo ? data.cycleGenNo + 1 : '';
						data.cycleGenNo == 0 ? temp = "CYCLE 1" : temp = "CYCLE  " + cycleGenNo;
						return temp
					}
				}),
				DTColumnBuilder.newColumn('audSubTypeDesc').withTitle('Audit Sub Type').notSortable().renderWith(function (data) {
					if (!data) { return '-' } else {
						return data ? data : ''
					}
				}),
				DTColumnBuilder.newColumn('auditDate').withTitle('Audit Date').notSortable().renderWith(function (data) {
					if (!data) { return '-' } else {
						return data ? moment(data, YYYYMMDD).format(MMMDDYYYY) : ''
					}
				}),
				DTColumnBuilder.newColumn('leadAuditorName').withTitle('Lead Auditor Name').notSortable().renderWith(function (data) {
					if (!data) { return '-' } else {
						return data;
					}
				})
			];

			cycle.showBlock = true;
			$timeout(function () {
				cycle.pagination = true;
			}, 0);

		}


		/**To get data from audit cycle START code added by Archana */
		/**fixed IRI-5125,IRI-5124,IRI-5126,IRI-5127 code added by Archana */
		function retrieveCycleDates() {
			console.log(cycle.auditCycleData);
			if (!cycle.auditCycleData.creditDate && cycle.auditCycleData.initialCheck == 1) {
				cycle.creditDate = cycle.auditCycleData.nextRenewalDueDate ? moment(cycle.auditCycleData.nextRenewalDueDate).subtract(5, 'years').add(1, 'days').format(MMMDDYYYY) : '';
				// cycle.creditDate=cycle.auditCycleData.nextRenewalDueDate?moment(cycle.auditCycleData.nextRenewalDueDate).subtract(5,'years').add(1,'days').format(DDMMYYYY):'';
				console.log(cycle.creditDate);
			}

			cycle.audsubtypeIterationForCyle.forEach(function (a) {

				console.log(cycle.auditCycleData.nextIntermediateStart == "");
				if (!cycle.auditCycleData.intermediateDueDate && cycle.auditCycleData.intermediatecheck == 1) {
					if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
						a.startDate = '';
						a.endDate = '';
						a.dueDate = '';
						a.check = 1;

					}
				} else {
					if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
						a.startDate = cycle.auditCycleData.nextIntermediateStart;
						a.endDate = cycle.auditCycleData.nextIntermediateEnd;
						a.dueDate = cycle.auditCycleData.intermediateDueDate;
					}
				}

				if (!cycle.auditCycleData.creditDate && cycle.auditCycleData.initialCheck == 1) {
					if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
						a.startDate = '';
						a.check = 1;

					}
				} else {
					if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
						a.startDate = cycle.auditCycleData.creditDate;

					}
				}

				if (!cycle.auditCycleData.nextRenewalDueDate && cycle.auditCycleData.renewalcheck == 1) {
					if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID) {
						a.startDate = '';
						a.endDate = '';
						a.dueDate = '';
						a.check = 1;

					}
				} else {
					if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID) {
						a.startDate = cycle.auditCycleData.nextRenewalStart;
						a.endDate = cycle.auditCycleData.nextRenewal;
						a.dueDate = cycle.auditCycleData.nextRenewalDueDate;
					}
				}
			});
		}


		/**To get data from audit cycle END code added by Archana */
		function genrateCycleDates(creditDate, val) {
			console.log(cycle.audsubtypeIterationForCyle);

			val = (cycle.auditSubTypeId == 1004 || cycle.auditSubTypeId == 1003 || cycle.auditSubTypeId == 1005) ? val : '';

			if (cycle.creditDate && !val && !cycle.renewalComplted && (creditDate.toUpperCase() == (moment(creditDate, MMMDDYYYY).format(MMMDDYYYY)).toUpperCase())) {
				console.log("1");
				console.log(cycle.audsubtypeIterationForCyle);
				creditDate = creditDate ? moment(creditDate, MMMDDYYYY).format(YYYYMMDD) : '';
				var date = (cycle.auditSubTypeId == cycle.AppConstant.INTERIM_SUB_TYPE_ID && creditDate) ? moment(creditDate, YYYYMMDD).add(6, 'months').format(YYYYMMDD) : creditDate ? creditDate : '';
				cycle.audsubtypeIterationForCyle.forEach(function (a) {

					console.log(cycle.auditCycleData.nextIntermediateStart == "");
					if (!cycle.auditCycleData.intermediateDueDate && cycle.auditCycleData.intermediatecheck == 1) {
						if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID && !cycle.renewalComplted) {
							a.startDate = '';
							a.endDate = '';
							a.dueDate = '';
						}
					} else {
						if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID && !cycle.renewalComplted) {
							a.startDate = creditDate ? moment(date, YYYYMMDD).add(2, 'years').subtract(1, 'days').format(MMMDDYYYY) : '';
							a.endDate = creditDate ? moment(date, YYYYMMDD).add(3, 'years').subtract(1, 'days').format(MMMDDYYYY) : '';
							a.dueDate = creditDate ? moment(date, YYYYMMDD).add(30, 'months').subtract(1, 'days').format(MMMDDYYYY) : '';
						}
					}
					console.log(cycle.auditCycleData.initialCheck);
					if (cycle.auditCycleData.initialCheck == 1 && !cycle.audsubtypeIterationForCyle[0].startDate) {
						if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
							if (cycle.auditCycleData.cycleGenNo > 0) {

								a.auditSubtypeDesc = 'RENEWAL' + ' ' + cycle.auditCycleData.cycleGenNo;
							} else { cycle.renewalDesc = cycle.auditCycleData.auditSubTypeId; }
							a.startDate = '';
							console.log('hh');
						}
					}
					else {

						if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
							if (cycle.auditCycleData.cycleGenNo > 0) {

								a.auditSubtypeDesc = 'RENEWAL' + ' ' + cycle.auditCycleData.cycleGenNo;
							} else { cycle.renewalDesc = cycle.auditCycleData.auditSubTypeId; }
							a.startDate = creditDate ? moment(date, YYYYMMDD).format(MMMDDYYYY) : '';
							console.log('jj');
						}
					}

					if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID && !cycle.renewalComplted) {
						a.startDate = creditDate ? moment(date, YYYYMMDD).add(5, 'years').subtract(3, 'months').subtract(1, 'days').format(MMMDDYYYY) : '';
						a.endDate = creditDate ? moment(date, YYYYMMDD).add(5, 'years').subtract(1, 'days').format(MMMDDYYYY) : '';
						a.dueDate = a.endDate ? a.endDate : '';
						//cycle.auditCycleData.nextRenewalStart = creditDate?moment(date,YYYYMMDD).add(5,'years').subtract(3,'months').format(YYYYMMDD):'';
						if (cycle.auditCycleData.cycleGenNo > 0) {
							var temp = cycle.auditCycleData.cycleGenNo + 1;
							a.auditSubtypeDesc = 'RENEWAL' + ' ' + temp;
							cycle.iteratorVal = temp;
						}


						if (cycle.renewalComplted && (cycle.auditSubTypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID || cycle.auditSubTypeId == 1003) && creditDate && cycle.auditCycleData && cycle.auditCycleData.nextRenewalStart && (creditDate > cycle.auditCycleData.nextRenewalStart || creditDate == cycle.auditCycleData.nextRenewalStart)) {
							a.startDate = cycle.auditCycleData.nextRenewal ? moment(cycle.auditCycleData.nextRenewal, MMMDDYYYY).add(5, 'years').subtract(3, 'months').format(MMMDDYYYY) : '';
							a.endDate = cycle.auditCycleData.nextRenewal ? moment(cycle.auditCycleData.nextRenewal, MMMDDYYYY).add(5, 'years').format(MMMDDYYYY) : '';
							a.dueDate = a.endDate ? a.endDate : ''
							//	a.auditSubtypeDesc =='RENEWAL' 
							cycle.audsubtypeIterationForCyle.forEach(function (a) {
								if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
									a.startDate = cycle.auditCycleData.nextRenewal ? moment(cycle.auditCycleData.nextRenewal, MMMDDYYYY).add(5, 'years').subtract(3, 'years').format(MMMDDYYYY) : '';
									a.endDate = cycle.auditCycleData.nextRenewal ? moment(cycle.auditCycleData.nextRenewal, MMMDDYYYY).add(5, 'years').subtract(2, 'years').format(MMMDDYYYY) : '';
									a.dueDate = a.startDate ? moment(a.startDate, MMMDDYYYY).add(6, 'months').format(MMMDDYYYY) : '';
								}

							});
						}


						if (!cycle.renewalComplted && (cycle.auditSubTypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID || cycle.auditSubTypeId == 1003 || cycle.auditSubTypeId == 1005) && creditDate && cycle.auditCycleDataPrevious && cycle.auditCycleDataPrevious.nextRenewalStart && (creditDate > cycle.auditCycleDataPrevious.nextRenewalStart || creditDate == cycle.auditCycleDataPrevious.nextRenewalStart)) {

							a.startDate = cycle.auditCycleDataPrevious.nextRenewal ? moment(cycle.auditCycleDataPrevious.nextRenewal, YYYYMMDD).add(5, 'years').subtract(3, 'months').format(MMMDDYYYY) : '';
							a.endDate = cycle.auditCycleDataPrevious.nextRenewal ? moment(cycle.auditCycleDataPrevious.nextRenewal, YYYYMMDD).add(5, 'years').format(MMMDDYYYY) : '';
							a.dueDate = a.endDate ? a.endDate : ''

							cycle.audsubtypeIterationForCyle.forEach(function (a) {
								if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
									a.startDate = cycle.auditCycleDataPrevious.nextRenewal ? moment(cycle.auditCycleDataPrevious.nextRenewal, YYYYMMDD).add(5, 'years').subtract(3, 'years').format(MMMDDYYYY) : '';
									a.endDate = cycle.auditCycleDataPrevious.nextRenewal ? moment(cycle.auditCycleDataPrevious.nextRenewal, YYYYMMDD).add(5, 'years').subtract(2, 'years').format(MMMDDYYYY) : '';
									a.dueDate = creditDate ? moment(a.startDate, MMMDDYYYY).add(6, 'months').format(MMMDDYYYY) : '';
								}

							});
						}


					}
					if (cycle.auditSubtypeId == 1003) {
						cycle.creditDate = cycle.auditCycleData.creditDateOfCurrentAudit ? moment(cycle.auditCycleData.creditDateOfCurrentAudit, YYYYMMDD).format(MMMDDYYYY) : cycle.creditDate
					}
				});

			} else if (((cycle.renewalComplted || cycle.auditCycleData.renewalCompltedForCycle == 1) && creditDate) || (!cycle.renewalComplted && cycle.auditCycleData.cycleGenNo > 0 && cycle.auditCycleData.cycleSeqNo == 1)) {
				console.log("12");
				var renewalExpiry, creditDate2 = moment(creditDate, MMMDDYYYY).format(YYYYMMDD);

				if ((cycle.renewalComplted || (cycle.auditCycleData.renewalCompltedForCycle && cycle.auditCycleData.renewalCompltedForCycle == 1)) && (cycle.auditSubTypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID || cycle.auditSubTypeId == 1003 || cycle.auditSubTypeId == 1005) && creditDate && cycle.auditCycleData && cycle.auditCycleData.nextRenewalStart && (moment(creditDate, MMMDDYYYY).format(YYYYMMDD) > moment(cycle.auditCycleData.nextRenewalStart, MMMDDYYYY).format(YYYYMMDD) || moment(creditDate, MMMDDYYYY).format(YYYYMMDD) == moment(cycle.auditCycleData.nextRenewalStart, MMMDDYYYY).format(YYYYMMDD))) {
					renewalExpiry = cycle.auditCycleData.nextRenewal ? moment(cycle.auditCycleData.nextRenewal, MMMDDYYYY).add(5, 'years').format(MMMDDYYYY) : '';

				} else {
					renewalExpiry = creditDate ? moment(creditDate, MMMDDYYYY).add(5, 'years').subtract(1, 'days').format(MMMDDYYYY) : '';
				}

				if (cycle.auditCycleData.cycleSeqNo == 1 && cycle.auditCycleDataPrevious && cycle.auditCycleDataPrevious.creditDate) {
					if ((cycle.auditSubTypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID || cycle.auditSubTypeId == 1003 || cycle.auditSubTypeId == 1005) && creditDate2 && cycle.auditCycleDataPrevious && cycle.auditCycleDataPrevious.nextRenewalStart && (creditDate2 > cycle.auditCycleDataPrevious.nextRenewalStart || creditDate2 == cycle.auditCycleDataPrevious.nextRenewalStart)) {
						renewalExpiry = cycle.auditCycleDataPrevious.nextRenewal ? moment(cycle.auditCycleDataPrevious.nextRenewal, YYYYMMDD).add(5, 'years').format(MMMDDYYYY) : '';
					} else {
						renewalExpiry = creditDate ? moment(creditDate2, YYYYMMDD).add(5, 'years').subtract(1, 'days').format(MMMDDYYYY) : '';

					}
				}
				cycle.audsubtypeIterationForCyle.forEach(function (a) {

					if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
						if (cycle.auditCycleData.cycleGenNo > 0) {
							a.auditSubtypeDesc = 'RENEWAL' + ' ' + cycle.auditCycleData.cycleGenNo;
						} else { cycle.renewalDesc = cycle.auditCycleData.auditSubTypeId; }
						a.startDate = creditDate ? creditDate : '';
					}

					if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID) {
						a.startDate = renewalExpiry ? moment(renewalExpiry, MMMDDYYYY).subtract(3, 'months').format(MMMDDYYYY) : '';
						a.endDate = renewalExpiry;
						a.dueDate = renewalExpiry;
					}
					if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {

						a.startDate = renewalExpiry ? moment(renewalExpiry, MMMDDYYYY).subtract(3, 'years').format(MMMDDYYYY) : '';
						a.endDate = renewalExpiry ? moment(renewalExpiry, MMMDDYYYY).subtract(2, 'years').format(MMMDDYYYY) : '';
						a.dueDate = a.startDate ? moment(a.startDate, MMMDDYYYY).add(6, 'months').format(MMMDDYYYY) : '';
					}
				});
			}
		}


		function validateAuditCycle() {

			var flag = true;
    	   /*if(!cycle.vesselImoNo.vesselImoNo)
    	   {toaster.warning('Please Enter IMO Number');
    	   }*/if (!cycle.vesselName) {
				toaster.warning('Please Enter Vessel Name');
				flag = false;
			} else if (!cycle.auditTypeId) {
				toaster.warning('Please Select Audit Type');
				flag = false;
			} else if (!cycle.leadName) {
				toaster.warning('Please Enter Lead Auditor Name');
				flag = false;
			} else if (!cycle.auditSubTypeId && cycle.cycleWithAudit) {
				toaster.warning('Please Select Audit Sub Type');
				flag = false;
			} else if (!cycle.creditDate) {
				toaster.warning('Please Enter CreditDate');
				flag = false;
			} else if (cycle.currentAuditUnderProcees) {
				var msg = cycle.auditCycleData.auditTypeId == 1003 ? 'Inspection' : 'Audit';
				toaster.warning('current ' + msg + ' is in process');
				flag = false;

			}
			return flag;
		}


		function getAuditCycleHistory(pageNo) {
			if (cycle.auditCycleData.cycleGenNo > 0) {
				auditCycleFactory.getAuditCycleHistory(cycle.auditTypeId, cycle.auditSubTypeId, cycle.vesselImoNo, cycle.companyId, pageNo, cycle.defaultSearchCount).$promise.then(function (result) {
					console.log(result);
					// result.splice(0, 1);
					cycle.repeatInitial = [];
					result.forEach(function (a) {
						if (a.auditSubTypeId == 1002) {
							a.cycleGenNo = 0;
							cycle.repeatInitial.push(a.auditSeqNo);

						}

					});
					result.forEach(function (e, index) {
						if (e.auditSeqNo < cycle.repeatInitial[0]) {
							result.splice(index, 1);
						}
					})
					detailsFactory.getPreviousAuditDetail(cycle.auditTypeId, cycle.vesselImoNo, cycle.companyId).$promise.then(function (d) {
						console.log(d);
						/**added by archana for jira id-IRI-5388 start */
						if(d.prevAuditDtl[0].auditSubTypeId == 1003 || d.prevAuditDtl[0].auditSubTypeId == 1005){
                            console.log(d.prevAuditDtl);
	                        if((d.prevAuditDtl[1].auditSubTypeId == 1004 && d.prevAuditDtl[1].auditStatusId == 1002) || 
							(d.prevAuditDtl[1].auditSubTypeId == 1003 && d.prevAuditDtl[1].auditStatusId == 1002)
							){
								result.splice(0,1)
							}
							else{
								if ((d.prevAuditDtl[0].auditStatusId == 1002) || (d.prevAuditDtl[0].auditStatusId == 1004)) {
									console.log(d.prevAuditDtl[0].auditStatusDesc);
									result.splice(0, 1);
								}
							}
						} else {
						if ((d.prevAuditDtl[0].auditStatusId == 1002) || (d.prevAuditDtl[0].auditStatusId == 1004)) {
							console.log(d.prevAuditDtl[0].auditStatusDesc);
							result.splice(0, 1);
						}
					}
					/**added by archana for jira id-IRI-5388 end */
						cycle.getAuditCycleHistorydata = angular.copy(result);
						cycle.setDataTableData(cycle.getAuditCycleHistorydata);
					})
					// cycle.getAuditCycleHistorydata = angular.copy(result);
					// cycle.setDataTableData(cycle.getAuditCycleHistorydata);
				});
			} else {

				auditCycleFactory.getAuditCycleHistory(cycle.auditTypeId, cycle.auditSubTypeId, cycle.vesselImoNo, cycle.companyId, pageNo, cycle.defaultSearchCount).$promise.then(function (result) {
					cycle.getAuditCycleHistorydata = angular.copy(result);
				});
			}
		}


		function cycleSkip(index, auditSubTypeId, creditDate, val) {
			console.log("me1");
			console.log(cycle.auditCycleData);
			creditDate = creditDate ? moment(creditDate, MMMDDYYYY).format(YYYYMMDD) : '';
			var renewalDate;
			var date = cycle.auditSubTypeId == cycle.AppConstant.INTERIM_SUB_TYPE_ID ? moment(creditDate, YYYYMMDD).add(6, 'months').format(YYYYMMDD) : creditDate;

			cycle.audsubtypeIterationForCyle.forEach(function (a) {
				renewalDate = creditDate ? moment(date, YYYYMMDD).add(5, 'years').subtract(1, 'days').format(YYYYMMDD) : '';

				if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.auditSubtypeId == auditSubTypeId && val == 1) {
					a.startDate = '';
					a.endDate = '';
					a.dueDate = '';
					a.intermediatecheck = 1;
					console.log('me2');
				} else if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID && a.auditSubtypeId == auditSubTypeId && val == 0) {

					a.startDate = creditDate ? moment(renewalDate, YYYYMMDD).subtract(3, 'years').format(MMMDDYYYY) : '';
					a.endDate = creditDate ? moment(renewalDate, YYYYMMDD).subtract(2, 'years').format(MMMDDYYYY) : '';
					a.dueDate = a.startDate ? moment(a.startDate, MMMDDYYYY).add(6, 'months').format(MMMDDYYYY) : '';
					a.intermediatecheck = 0;
					console.log('me3');
				}

				if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID && a.auditSubtypeId == auditSubTypeId && val == 1) {
					a.startDate = ''; a.endDate = ''; a.dueDate = ''; a.renewalcheck = 1;
					console.log("me4");
				} else if (a.auditSubtypeId == 1004 && a.auditSubtypeId == auditSubTypeId && val == 0) {
					a.startDate = creditDate ? moment(date, YYYYMMDD).add(5, 'years').subtract(3, 'months').subtract(1, 'days').format(MMMDDYYYY) : '';
					a.endDate = creditDate ? moment(date, YYYYMMDD).add(5, 'years').subtract(1, 'days').format(MMMDDYYYY) : '';
					a.dueDate = a.endDate ? a.endDate : '';
					a.renewalcheck = 0;
					console.log("me5");
				}
				if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID && a.auditSubtypeId == auditSubTypeId && val == 1) {
					a.startDate = '';
					a.initialCheck = 1;
					cycle.dataCheck = true;
					console.log("me6");
				} else if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID && a.auditSubtypeId == auditSubTypeId && val == 0) {
					a.startDate = creditDate ? moment(date, YYYYMMDD).format(MMMDDYYYY) : '';
					a.initialCheck = 0;
					console.log("me7");
				}
				console.log("me8");
			});
			console.log("me9");
			console.log(cycle.audsubtypeIterationForCyle);
		}

		cycle.search = function (pageNo) {

			$scope.pagination.current = pageNo + 1;  //added by archana for jira id-IRI-5389

			cycle.pageNo = pageNo * 5;

			cycle.showBlock = false;

			cycle.pagination = false;

			cycle.getAuditCycleHistory(cycle.pageNo);
		}

		cycle.back = function () {
			sessionStorage.setItem('auditCycleData', '');
			$state.go('app.dashboard', {}, { reload: true });
			sessionStorage.setItem('auditCycleSearchBean', '');
		}

		cycle.auditCycleSearchValues = function (data) {

			var auditCycleSearchBean = {
				'vesselImoNo': data.vesselImoNo,
				'auditTypeId': data.auditTypeId,
				'auditSubTypeId': data.auditSubTypeId,
				'auditSeqNo': data.auditSeqNo ? data.auditSeqNo : '',
				'vesselName': data.vesselName ? data.vesselName : '',
				'withAudit': cycle.cycleWithAudit ? cycle.cycleWithAudit : '',
				'companyImoNo': data.companyImoNo ? data.companyImoNo : '',
				'companyDoc': data.companyDoc ? data.companyDoc : '',
				'docTypeNumber': data.docTypeNumber ? data.docTypeNumber : '',
				'vesselId': data.vesselId ? data.vesselId : '',
				'auditCycleCreatedSuccessfully': data.auditCycleCreatedSuccessfully ? data.auditCycleCreatedSuccessfully : ''
			};
			console.log(auditCycleSearchBean);
			sessionStorage.setItem('auditCycleSearchBean', auditCycleSearchBean);
		}


		/********** ARRAY FOR PAGINATION ************************/
		$scope.range = function (len) {

			var count = [];

			for (var i = 1; i <= len; i++) {

				count.push(i);

			}

			return count;
		}


		function validateVessel() {

			var vssel = cycle.vesselDetail;
			var vselCo = vssel.vesselCompany;
			var flag = false;

			if (!cycle.vesselDetails) {

				cycle.vesselImoNo = '';
			} else if (!vssel.vesselName || !vssel.docTypeNumber || !vssel.activeStatus || !vssel.officialNo || !vssel.grt || !vssel.companyImoNo || !vssel.portOfRegistry) {
				flag = true;
			} else if (!vssel.tcApprovalStatus || !vssel.dateOfRegistry || !vssel.vesselType || !vssel.vesselId || !vssel.vesselPk || !vssel.vesselUk || !vssel.classSociety || !vssel.callSign) {
				flag = true;
			} else if (!vselCo.docTypeNo || !vselCo.docIssuer || !vselCo.docExpiry || !vselCo.vesselCompanyName || !vselCo.vesselCompanyAddress || !vselCo.companyStatus) {
				flag = true;
			}

			return flag;
		}

		function doBlur(event) {
			event.target.blur();
		}


		function clearData() {
			cycle.cycleWithAudit = false;// added by archana for jira Id IRI-5390
			cycle.vesselDetail.vesselStatus = ''; // added by archana for jira Id IRI-5390
			cycle.vesselName = '';
			cycle.creditDate = '';
			cycle.auditTypeId = '';
			cycle.leadName = '';
			cycle.auditSubTypeId = '';
			cycle.auditDate = '';
			sessionStorage.setItem('auditCycleSearchBean', '');
			cycle.audsubtypeIterationForCyle = {};
			cycle.getAuditCycleHistorydata = '';
			cycle.disableSave = true;
			cycle.showBlock = false;
			cycle.iteratorVal = 1;
			cycle.vesselImoNo = '';
			cycle.filterCondition = '';
			cycle.tempFunValidate = '';
			cycle.renewalComplted = '';
		}


		function auditTypeChange(oldVal) {
			cycle.cycleWithAudit = '';
			cycle.renewalComplted = '';
			cycle.iteratorVal = 1;
			cycle.iteratorVal1 = '';
			cycle.auditSubTypeId = '';
			cycle.auditDate = '';
			cycle.creditDate = '';
			cycle.getAuditCycleHistorydata = '';
			cycle.disableSave = true;
			cycle.showBlock = false;
			cycle.tempFunValidate = '';
			cycle.currentAuditUnderProcees = false;
			cycle.leadName = '';

			if (cycle.auditCycleData) {
				Object.keys(cycle.auditCycleData).forEach(function (index) {
					cycle.auditCycleData[index] = '';
				});
			}

			sessionStorage.removeItem('auditCycleData', '');
			sessionStorage.removeItem('auditCycleSearchBean', '');

			$timeout(function () {
				cycle.pageNo = 0;// added by archana for jira id-IRI-5389
				console.log(cycle.auditCycleData);
				cycle.getAuditData(cycle.auditTypeId);
				cycle.getAuditCycleData(cycle.auditTypeId);
				cycle.getPreviousAuditDetail(cycle.auditTypeId);
			}, 100);

		}

		cycle.genrateCycleDatesShow = function (creditDate) {
			console.log(cycle.auditCycleData)
			if (cycle.auditCycleData.cycleGenNo > 0 && cycle.auditCycleData.audSubTypeDesc == 'RENEWAL') {
				cycle.iteratorVal = cycle.auditCycleData.cycleGenNo;
				cycle.auditLastSubtypeDesc = 'RENEWAL' + ' ' + cycle.iteratorVal;
			} else {
				cycle.auditLastSubtypeDesc = cycle.auditCycleData.audSubTypeDesc;
			}

			cycle.audsubtypeIterationForCyle.forEach(function (a) {
				console.log(a);

				if (a.auditSubtypeId == cycle.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
					a.startDate = cycle.auditCycleData.nextIntermediateStart ? cycle.auditCycleData.nextIntermediateStart : '';
					a.endDate = cycle.auditCycleData.nextIntermediateEnd ? cycle.auditCycleData.nextIntermediateEnd : '';
					a.dueDate = cycle.auditCycleData.intermediateDueDate ? cycle.auditCycleData.intermediateDueDate : '';
				}

				if (a.auditSubtypeId == cycle.AppConstant.RENEWAL_SUB_TYPE_ID) {
					if (cycle.auditCycleData.cycleGenNo == 0) {
						a.auditSubtypeDesc = cycle.auditCycleData.auditSubtypeDesc;
					}
					cycle.iteratorVal1 = cycle.auditCycleData.cycleGenNo + 1;
					a.auditSubtypeDesc = 'RENEWAL' + ' ' + cycle.iteratorVal1;
					a.startDate = cycle.auditCycleData.nextRenewalStart ? cycle.auditCycleData.nextRenewalStart : '';
					a.endDate = cycle.auditCycleData.nextRenewal ? cycle.auditCycleData.nextRenewal : '';
					a.dueDate = cycle.auditCycleData.nextRenewalDueDate ? cycle.auditCycleData.nextRenewalDueDate : '';
				}
				if (a.auditSubtypeId == cycle.AppConstant.INITIAL_SUB_TYPE_ID) {
					if (cycle.auditCycleData.cycleGenNo > 0) {
						a.auditSubtypeDesc = 'RENEWAL' + ' ' + cycle.auditCycleData.cycleGenNo;
					} else {
						a.auditSubtypeDesc = 'INITIAL';
					}
					console.log(cycle);
					/**added by archana for jira id-IRI-5392 start */
					if(cycle.auditCycleData.initialCheck == 1){
						a.startDate = '-'
					}
					else{
					a.startDate = creditDate ? creditDate : '';
					a.startDate = (cycle.auditCycleData.roleId == 1001 && cycle.auditSubTypeId == cycle.AppConstant.INTERIM_SUB_TYPE_ID && creditDate) ? creditDate : a.startDate;
					}
					/**added by archana for jira id-IRI-5392 end */
				}
			});

		}

	}


	function auditCycleDetaileController($scope, close, toaster, AppConstant, data, MMMDDYYYY, YYYYMMDD) {

		var aCycle = this;
		/**added by archana for jira id IRI-5391 start */
		if(!data.auditCycle.nextIntermediateStart){
			aCycle.intermediatecheck = 0;
		}
		if(!data.auditCycle.creditDate){
			aCycle.initialCheck = 0;
		}
		if(!data.auditCycle.nextRenewalStart){
			aCycle.renewalcheck =  0;
		}
		/**added by archana for jira id IRI-5391 end */
		var creditDate = data.creditDate ? moment(data.creditDate, MMMDDYYYY).format(YYYYMMDD) : '';
		aCycle.creditDate = data.creditDate ? moment(data.creditDate, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
		aCycle.initilOrRenewal = (data.auditSubTypeId && data.auditSubTypeId == 1004) ? 'RENEWAL' : 'INITIAL';
		aCycle.renewalTemp = (data.auditSubTypeId != 1004) ? '1' : '';
		aCycle.cycleGenNo = data.cycleGenNo ? (data.cycleGenNo + 1) : '';
		aCycle.cycleGenNo1 = data.cycleGenNo ? (data.cycleGenNo) : '';
		aCycle.initialStartDate = data.auditCycle.creditDate ?  moment(data.auditCycle.creditDate, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '-' ; //added by archana for jira id IRI-5391
		aCycle.nextIntermediateStart = data.auditCycle.nextIntermediateStart ? moment(data.auditCycle.nextIntermediateStart, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
		aCycle.nextIntermediateEnd = data.auditCycle.nextIntermediateEnd ? moment(data.auditCycle.nextIntermediateEnd, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
		aCycle.nextRenewalStart = (data.auditCycle.nextRenewalStart && data.auditCycle.nextRenewalStart != '-') ? moment(data.auditCycle.nextRenewalStart, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
		aCycle.nextRenewal = data.auditCycle.nextRenewal ? moment(data.auditCycle.nextRenewal, 'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';

		if (data.auditSubTypeId == 1004 && creditDate && data.auditCycleDataPrevious && data.auditCycleDataPrevious.nextRenewalStart && (creditDate > data.auditCycleDataPrevious.nextRenewalStart || creditDate == data.auditCycleDataPrevious.nextRenewalStart)) {
			aCycle.nextIntermediateStart = data.auditCycleDataPrevious.nextRenewal ? moment(data.auditCycleDataPrevious.nextRenewal, YYYYMMDD).subtract(3, 'years').format(MMMDDYYYY) : '';
			aCycle.nextIntermediateEnd = data.auditCycleDataPrevious.nextRenewal ? moment(data.auditCycleDataPrevious.nextRenewal, YYYYMMDD).subtract(2, 'years').format(MMMDDYYYY) : '';
		}
		//aCycle.auditCycle = data;

		aCycle.AppConstant = AppConstant;

		aCycle.close = function (result) {
			close(result, 0);
			$('.modal-backdrop').remove();
		};
	}

})();