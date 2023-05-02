/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name vesselCompanyDetails.controller.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/vesselCompanyDetails/vesselCompanyDetails.controller.js $
**/

(function() {
	'use strict';

	angular.module('app.master.vesselCompanyDetails').controller(
			'VesselCompanyDetailsController', VesselCompanyDetailsController);

	function VesselCompanyDetailsController($scope, $cookies, toaster, $http,
			vesselDetails, $rootScope, broadcastService, MMMDDYYYY,YYYYMMDD, $window,
			blockUI, $timeout, vesselCompanyDetailsFactory, ModalService,AppConstant,DDMMMYYYY) {

		var vcdetail = this;
		var companyId = sessionStorage.getItem("companyId");
		vcdetail.enabled = true;
		vcdetail.AppConstant = angular.copy(AppConstant);
		vcdetail.createedit = vcdetail.AppConstant.CREATE.toUpperCase();
		vcdetail.lockMessage = vcdetail.AppConstant.CREATE.toUpperCase();
		vcdetail.vesselData = vesselDetails;
		vcdetail.today = moment(moment(new Date()).format(MMMDDYYYY), MMMDDYYYY);

		/** Confirmation window while navigating to another page **/
		$rootScope.$on('$stateChangeStart', function(event, fromState,
				toParams, toState) {
			if(vcdetail.createedit == vcdetail.AppConstant.CREATE)
				{
			vcdetail.pushSavedData();
				}
			var element = angular.element(document.getElementById("loader"));
			if (vcdetail.vesselCompanyForm) {
				if (vcdetail.vesselCompanyForm.$dirty == true) {
					if (vcdetail.vesselCompanyForm.cmpnyImo.$valid
							|| vcdetail.vesselCompanyForm.cmpnyName.$valid
							|| vcdetail.vesselCompanyForm.docType.$valid
							|| vcdetail.vesselCompanyForm.docIssuer.$valid
							|| vcdetail.vesselCompanyForm.docExpiry.$valid
							|| vcdetail.vesselCompanyForm.addres.$valid) {
						if (broadcastService.confirmService()) {
							if (vcdetail.submit(vcdetail.createedit)) {
							} else
								event.preventDefault();
						}
					}
				}
			}
			element.addClass('hide');
		});

		/** Validation for CompanyImo typeahead **/
		vcdetail.veselImo = function(val) {
			var tempArray = [];
			if (val == '*') {
				tempArray = vcdetail.vesselData;
			} else if(val.length>2) {
				tempArray = _.filter(vcdetail.vesselData, function(d) {
					return (d.companyImoNo).indexOf(val) > -1;
				});
			}
			return tempArray;

		}

		/** Toaster message disappearance after valid input is filled **/
		vcdetail.toasterClear = function() {
			toaster.clear();
		}

		/** validation for unique ImoNo **/
		vcdetail.checkCmpnyImoNo = function(value) {
			if (value != null) {
				var length;
				if (value[0] == '*' || value[1] == '*' || value[2] == '*'
						|| value[3] == '*' || value[4] == '*'
						|| value[5] == '*' || value[6] == '*') {
					toaster.warning('Please Enter Valid IMO Number');
					vesdet.imonumber = null;
				}
				if (value.length == 7) {
					vesselCompanyDetailsFactory.checkCmpnyImoNo(value, companyId).$promise
							.then(function(res) {
								if (res.success == true) {
									toaster
											.warning('Company IMO Number Already Present')
									vcdetail.companyimono = null;
								}
							});
				} else {
					vcdetail.companyimono = null;
					toaster.warning('Enter Company IMO Number of length 7 ')
				}
			}
		}

		vcdetail.removeElement = function(modelval) {
			vcdetail.doctypeno = null;
			vcdetail.docissuer = null;
			vcdetail.docexpiry = null;
			vcdetail.name = null;
			vcdetail.address = null;
			vcdetail.status = null;
		}

		/** Not null validation **/
		vcdetail.validate = function(val) {
			var flag = true;

			if (!val.companyId) {
				flag = false;
				toaster.warning('Check CompanyId ')
			}

			if (!vcdetail.address) {
				flag = false;
				toaster.warning('Please Enter Company Address')
			}

			if (!vcdetail.docexpiry) {
				flag = false;
				toaster.warning('Please Enter DOC Expiry')
			}

			if (!vcdetail.docissuer) {
				flag = false;
				toaster.warning('Please Enter DOC Issuer')
			}

			if (!vcdetail.doctypeno) {
				flag = false;
				toaster.warning('Please Enter DOC Type Number')
			}

			if (!vcdetail.name) {
				flag = false;
				toaster.warning('Please Enter Company Name')
			}

			if (!vcdetail.companyimono) {
				flag = false;
				toaster.warning('Please enter 7 digit Company IMO Number')

			}

			return flag;
		}

		/** Making fields null while changing to update or create mode **/
		vcdetail.fieldNull = function() {
			vcdetail.companyimono = null;
			vcdetail.doctypeno = null;
			vcdetail.docissuer = null;
			vcdetail.docexpiry = null;
			vcdetail.name = null;
			vcdetail.address = null;
			vcdetail.status = null;
		}

		/** Model setting for Typeahead **/
		vcdetail.validateTypeahead = function(val, param) {
			if (param == 'IMO' && val) {
				if (!val.companyImoNo) {
					vcdetail.companyimono = '';
				}
			}

			if (param == 'NAME' && val) {

				if (!val.vesselCompanyName) {
					vcdetail.name = '';
				}
			}
		}

		/** Automatically fetching form data for update mode **/
		vcdetail.focusSuccessive = function(val) {
			
			vcdetail.address = decodeURIComponent(val.vesselCompanyAddress);
			vcdetail.name = val.vesselCompanyName;
			vcdetail.doctypeno = val.docTypeNo;
			vcdetail.docissuer = val.docIssuer;
			vcdetail.docexpiry =moment(val.docExpiry).format(DDMMMYYYY);
			vcdetail.status = val.activeStatus;
			vcdetail.vesselCompanyForm.$dirty = false;
		}

		vcdetail.changeCallback = function() {
			if (vcdetail.enabled) {
				vcdetail.lockMessage = vcdetail.AppConstant.CREATE.toUpperCase();
				vcdetail.createedit = vcdetail.AppConstant.CREATE.toUpperCase();
				vcdetail.fieldNull();
				vcdetail.docTyp = false;
				vcdetail.issu = false;
				vcdetail.exp = false;
				vcdetail.add = false;
				vcdetail.stat = false;
			} else {
				vcdetail.lockMessage = vcdetail.AppConstant.UPDATE.toUpperCase();
				vcdetail.createedit = vcdetail.AppConstant.UPDATE.toUpperCase();
				vcdetail.docTyp = true;
				vcdetail.issu = true;
				vcdetail.exp = true;
				vcdetail.add = true;
				vcdetail.stat = true;
				vcdetail.fieldNull();
			}
		};

		vcdetail.update = function() {
			vcdetail.enabled = false;
			vcdetail.createedit = vcdetail.AppConstant.UPDATE.toUpperCase();
			vcdetail.address = decodeURIComponent(vcdetail.address);

		}

		vcdetail.submit = function() {
			vcdetail.address = encodeURIComponent(vcdetail.address);
			var MaVesselCompany = {
				"companyImoNo" : vcdetail.companyimono ? vcdetail.companyimono.companyImoNo
						|| vcdetail.companyimono
						: vcdetail.companyimono,
				"docTypeNo" : vcdetail.doctypeno != null ? vcdetail.doctypeno
						.toUpperCase() : vcdetail.doctypeno,
				"docIssuer" : vcdetail.docissuer != null ? vcdetail.docissuer
						.toUpperCase() : vcdetail.docissuer,
				"docExpiry" : vcdetail.docexpiry != null ? moment(vcdetail.docexpiry,MMMDDYYYY).format(YYYYMMDD) : '',
				"vesselCompanyName" : vcdetail.name ? vcdetail.name.vesselCompanyName
						|| vcdetail.name != null ? vcdetail.name.toUpperCase()
						: vcdetail.name
						: vcdetail.name != null ? vcdetail.name.toUpperCase()
								: vcdetail.name,
				"vesselCompanyAddress" : vcdetail.address != null ? vcdetail.address
						.toUpperCase()
						: vcdetail.address,
				"companyId" : Number(companyId),
				"userIns" : 'BSOL',
				"dateIns" : Date.now()
			};

			/** saving and updating vessel company details **/
			if (vcdetail.respons = vcdetail.validate(MaVesselCompany)) {
				vesselCompanyDetailsFactory.saveVesselCompany(vcdetail.createedit,
						MaVesselCompany).$promise
						.then(function(res) {
							if (vcdetail.createedit == vcdetail.AppConstant.CREATE.toUpperCase()) {
								toaster
										.success('Vessel Company Details created successfully')
								vcdetail.vesselCompanyForm.$dirty = false;
							} else {
								toaster
										.success('Vessel Company Details updated successfully')
								vcdetail.vesselCompanyForm.$dirty = false;
							}
							/** pushing the created data for updatemode typeahead **/
							if (vcdetail.createedit == vcdetail.AppConstant.CREATE.toUpperCase()) {
								vcdetail.pushSavedData=function(){
									
								vcdetail.vesselData
										.push({
											companyImoNo : MaVesselCompany.companyImoNo,
											activeStatus : MaVesselCompany.activeStatus,
											companyId : MaVesselCompany.companyId,
											docExpiry : MaVesselCompany.docExpiry,
											docIssuer : MaVesselCompany.docIssuer,
											docTypeNo : MaVesselCompany.docTypeNo,
											userIns : MaVesselCompany.userIns,
											vesselCompanyAddress : MaVesselCompany.vesselCompanyAddress,
											vesselCompanyName : MaVesselCompany.vesselCompanyName
										});
								}
								vcdetail.pushSavedData();
								vcdetail.update();

							}

							/**
							 * **pushing the updated data for update
							 * typeahead****
							 */
							else {
								vcdetail.vesselData
										.forEach(function(a) {
											if (a.companyImoNo == MaVesselCompany.companyImoNo) {
												a.activeStatus = MaVesselCompany.activeStatus;
												a.companyId = MaVesselCompany.companyId;
												a.docExpiry = MaVesselCompany.docExpiry;
												a.docIssuer = MaVesselCompany.docIssuer;
												a.docTypeNo = MaVesselCompany.docTypeNo;
												a.userIns = MaVesselCompany.userIns;
												a.vesselCompanyAddress = MaVesselCompany.vesselCompanyAddress;
												a.vesselCompanyName = MaVesselCompany.vesselCompanyName;
											}
										});
							}
						});
			}
			vcdetail.address = decodeURIComponent(vcdetail.address);

			return vcdetail.respons;
		}

		/** ******* doc history ********* */

		vcdetail.showHistory = function(cImoNo) {

			ModalService.showModal({

				templateUrl : 'src/modals/history.html',

				controller : "historyController as his",

				inputs : {
					data : {"imoNo" : cImoNo,"title":"DOC History","history":"DOC"}
				}

			}).then(function(modal) {

				modal.element.modal();

				modal.close.then(function(result) {

				});

			});

		}

	}

})();