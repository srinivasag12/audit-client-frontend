/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name vesselDetails.controller.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/vesselDetails/vesselDetails.controller.js $
**/

(function() {
	'use strict';

	angular.module('app.master.vesselDetails').controller(
			'VesselDetailsController', VesselDetailsController);

	function VesselDetailsController($scope, $cookies, toaster, $http,
			cmpnyImoNo, vslImoNo, $rootScope, broadcastService, $timeout,
			vesselDetailsFactory, ModalService,AppConstant) {

		var vesdet = this;
		var companyId = sessionStorage.getItem("companyId");
		vesdet.imo = cmpnyImoNo;
		vesdet.vslimo = vslImoNo;
		vesdet.enabled = true;
		vesdet.AppConstant = angular.copy(AppConstant);
		vesdet.createedit = vesdet.AppConstant.CREATE.toUpperCase();
		vesdet.lockMessage = vesdet.AppConstant.CREATE.toUpperCase();

		/** Fetching values for VesselType Dropdown from VesselType db **/
		vesselDetailsFactory.getVesselTypes(companyId).$promise.then(function(
				res) {
			$scope.vesselTypeArray = res;
		});

		vesdet.toasterClear = function() {
			toaster.clear();
		}

		$rootScope.$on('$stateChangeStart', function(event, fromState,
				toParams, toState) {
			if (vesdet.createedit ==  vesdet.AppConstant.CREATE)
				{
			vesdet.pushSavedValues();
				}
			var element = angular.element(document.getElementById("loader"));
			if (vesdet.vesselDetailsForm) {
				if (vesdet.vesselDetailsForm.$dirty == true) {
					if (vesdet.vesselDetailsForm.vslImo.$valid
							|| vesdet.vesselDetailsForm.vslName.$valid
							|| vesdet.vesselDetailsForm.vslType.$valid
							|| vesdet.vesselDetailsForm.companyImo.$valid
							|| vesdet.vesselDetailsForm.offno.$valid
							|| vesdet.vesselDetailsForm.grt.$valid
							|| vesdet.vesselDetailsForm.statid.$valid
							|| vesdet.vesselDetailsForm.vslid.$valid
							|| vesdet.vesselDetailsForm.uk.$valid
							|| vesdet.vesselDetailsForm.pk.$valid) {
						if (broadcastService.confirmService()) {
							if (vesdet.submit(vesdet.createedit)) {
							} else
								event.preventDefault();
						}

					}
				}
			}
			element.addClass('hide');
		});

		vesdet.disable = function(val) {
			if (!val) {
				vesdet.vesselname = null;
				vesdet.vesseltype = null;
				vesdet.officialnumber = null;
				vesdet.grt = null;
				vesdet.status = null;
				vesdet.cmpnyimono = null;
				vesdet.uk=null;
				vesdet.pk=null;
				vesdet.vesselid=null;
				vesdet.tcApprovalStatus=null;
			}
		}

		/** creating typeaheads for Imono and vesselName in update mode **/
		vesdet.vessellImoTypeahead = function(val) {
			var tempArray = [];
			if (val == '*') {
				tempArray = vesdet.vslimo;
			} else if(val.length>2) {
				tempArray = _.filter(vesdet.vslimo, function(d) {
					return (d.vesselImoNo).toString().indexOf(val) > -1;
				});
			}
			return tempArray;
		}

		/** Fetching values from vesselcompany db for companyImono **/
		vesdet.companyImoTypeahead = function(val) {
			var tempArray = [];
			if (val == '*') {
				tempArray = vesdet.imo;
			} else if(val.length>2){
				tempArray = _.filter(vesdet.imo, function(d) {
					return (d.companyImoNo).indexOf(val) > -1;
				});
			}
			return tempArray;
		}

		/** Making fields null while changing to update or create mode **/
		vesdet.fieldNull = function() {
			vesdet.vesselname = null;
			vesdet.vesseltype = null;
			vesdet.officialnumber = null;
			vesdet.grt = null;
			vesdet.status = null;
			vesdet.imonumber = null;
			vesdet.cmpnyimono = null;
			vesdet.uk=null;
			vesdet.pk=null;
			vesdet.vesselid=null;
			vesdet.tcApprovalStatus=null;
		}

		vesdet.changeCallback = function() {
			if (vesdet.enabled) {
				vesdet.lockMessage =  vesdet.AppConstant.CREATE.toUpperCase();
				vesdet.createedit =  vesdet.AppConstant.CREATE.toUpperCase();
				vesdet.fieldNull();
				vesdet.vestyp = false;
				vesdet.offno = false;
				vesdet.gr = false;
				vesdet.cmp = false;
				vesdet.vesnam = false;
				vesdet.vslid=false;
				vesdet.vsluk=false;
				vesdet.vslpk=false;
				
			} else {
				vesdet.lockMessage =  vesdet.AppConstant.UPDATE.toUpperCase();
				vesdet.createedit = vesdet.AppConstant.UPDATE.toUpperCase();
				vesdet.fieldNull();
				vesdet.vestyp = true;
				vesdet.offno = true;
				vesdet.gr = true;
				vesdet.cmp = true;
				vesdet.vesnam = true;
				vesdet.vslid=true;
				vesdet.vsluk=true;
				vesdet.vslpk=true;
			}
		};

		/** validation for unique ImoNo **/
		vesdet.checkImoNo = function(val) {
			if (val != null) {
				if (val[0] == '*' || val[1] == '*' || val[2] == '*'
						|| val[3] == '*' || val[4] == '*' || val[5] == '*'
						|| val[6] == '*') {
					toaster.warning('Please Enter Valid IMO Number');
					vesdet.imonumber = null;
				}
				if (val.length == 7) {
					vesselDetailsFactory.checkImoNo(val, companyId).$promise
							.then(function(res) {
								if (res.success == true) {
									toaster
											.warning('IMO Number Already Present')
									vesdet.imonumber = null;
								}
							});
				} else {
					toaster.warning('Please enter 7 digit IMO Number')
					vesdet.imonumber = null;
				}
			}
		}

		/**Model Setting for Tyepaheads **/
		vesdet.validateTypeahead = function(val, param) {
			
			if (param == 'IMO' && val) {
				
				if (!val.companyImoNo) {
					vesdet.cmpnyimono = '';
				}
			}
			if (param == 'IMONO' && val) {
				if (!val.vesselImoNo) {
					vesdet.imonumber = '';
				}
			}
			if (param == 'NAME' && val) {
				if (!val.vesselName) {
					vesdet.vesselname = '';
				}
			}
		}

		/** Automatically fetching form datas for update mode **/
		vesdet.focusSuccessive = function(val) {
			console.log(val);
			vesdet.vesselname = val.vesselName;
			vesdet.vesseltype = val.vesselType;
			vesdet.officialnumber = val.officialNo;
			vesdet.grt = val.grt;
			vesdet.status = val.activeStatus;
			vesdet.imonumber = {
				vesselImoNo : val.vesselImoNo
			};
			vesdet.cmpnyimono = {
				companyImoNo : val.companyImoNo
			};
			/*vesdet.vesselid=val.vesselid;
			vesdet.uk=val.uk;
			vesdet.pk=val.pk;*/
			vesdet.tcApprovalStatus=val.tcApprovalStatus;
			vesdet.uk=val.vesselUk;
			vesdet.pk=val.vesselPk;
			vesdet.vesselid=val.vesselId;
			vesdet.vesselDetailsForm.$dirty = false;
		}

		/**Not null Validation **/
		vesdet.validate = function(val) {
			var flag = true;

			if (!val.companyId) {
				flag = false;
				toaster.warning('Check CompanyId ')
			}

			if (!val.grt) {
				flag = false;
				toaster.warning('Please Enter GRT')
			}

			if (!val.officialNo) {
				flag = false;
				toaster.warning('Please Enter Official Number')
			}

			if (!val.companyImoNo) {
				flag = false;
				toaster.warning('Please Enter Company IMO Number')
			}

			if (!val.vesselType) {
				flag = false;
				toaster.warning('Please Enter Vessel Type')
			}

			if (!val.vesselName) {
				flag = false;
				toaster.warning('Please Enter Vessel Name')
			}

			if (!val.vesselImoNo) {
				flag = false;
				toaster.warning('Please Enter Vessel IMO Number of Length 7')

			}
			return flag;

		}

		vesdet.update = function() {
			vesdet.enabled = false;
			vesdet.createedit = vesdet.AppConstant.UPDATE.toUpperCase();

		}

		vesdet.submit = function(values) {

			var vesselData = {
				"vesselImoNo" : vesdet.imonumber ? vesdet.imonumber.vesselImoNo
						|| vesdet.imonumber : vesdet.vesselImoNo,
				"vesselName" : vesdet.vesselname ? vesdet.vesselname != null ? vesdet.vesselname
						.toUpperCase()
						: vesdet.vesselname || vesdet.vesselname
						: vesdet.vesselname != null ? vesdet.vesselName
								.toUpperCase() : vesdet.vesselname,
				"activeStatus" : vesdet.status ? 1 : 0,
				"companyId" : Number(companyId),
				"officialNo" : Number(vesdet.officialnumber),
				"grt" : vesdet.grt,
				"companyImoNo" : vesdet.cmpnyimono.companyImoNo,
				"userIns" : 'BSOL',
				"dateIns" : new Date(),
				"vesselType" : vesdet.vesseltype,
				"tcApprovalStatus":vesdet.tcApprovalStatus,
				"vesselId":vesdet.vesselid,
				"vesselUk":vesdet.uk,
				"vesselPk":vesdet.pk
				
				
			};

			/** saving and updating vessel Details **/
			if (vesdet.respons = vesdet.validate(vesselData)) {
				vesselDetailsFactory.saveVesselType(vesdet.createedit,
						vesselData).$promise
						.then(function(res) {
							if (vesdet.createedit ==  vesdet.AppConstant.CREATE.toUpperCase()) {
								{
									toaster
											.success('Vessel Details created successfully')
									vesdet.vesselDetailsForm.$dirty = false;
								}
							} else {
								toaster
										.success('Vessel Details updated successfully')
								vesdet.vesselDetailsForm.$dirty = false;
							}
							if (vesdet.createedit ==  vesdet.AppConstant.CREATE.toUpperCase()) {
								vesdet.pushSavedValues=function(){
								vesdet.vslimo.push({
									companyImoNo : vesselData.companyImoNo,
									activeStatus : vesselData.activeStatus,
									companyId : vesselData.companyId,
									grt : vesselData.grt,
									officialNo : vesselData.officialNo,
									dateIns : vesselData.dateIns,
									userIns : vesselData.userIns,
									vesselImoNo : vesselData.vesselImoNo,
									vesselName : vesselData.vesselName,
									vesselType : vesselData.vesselType,
									vesselId :vesselData.vesselId,
									vesselUk : vesselData.vesselUk,
									vesselPk :vesselData.vesselPk,
									tcApprovalStatus:vesselData.tcApprovalStatus
								});
								}
								vesdet.pushSavedValues();
								vesdet.update();
							} else {
								vesdet.vslimo
										.forEach(function(a) {
											
											if (a.vesselImoNo == vesselData.vesselImoNo) {
												a.companyImoNo = vesselData.companyImoNo;
												a.activeStatus = vesselData.activeStatus;
												a.companyId = vesselData.companyId;
												a.grt = vesselData.grt;
												a.officialNo = vesselData.officialNo;
												a.dateIns = vesselData.dateIns;
												a.userIns = vesselData.userIns;
												a.vesselName = vesselData.vesselName;
												a.vesselType = vesselData.vesselType;
												a.vesselId=vesselData.vesselId;
												a.vesselUk= vesselData.vesselUk;
												a.vesselPk= vesselData.vesselPk;
												a.tcApprovalStatus=vesselData.tcApprovalStatus;
											}
										});
							}
						});
				return vesdet.respons;
			}
		}

		/** ****** vessel history ****** */

		vesdet.showHistory = function(imoNo) {

			ModalService.showModal({

				templateUrl : 'src/modals/history.html',

				controller : "historyController as his",

				inputs : {
					data : {"imoNo" : imoNo,"title":"Vessel Company IMO History","history":"IMO"}
				}

			}).then(function(modal) {

				modal.element.modal();

				modal.close.then(function(result) {

				});

			});

		}

	}

})();
