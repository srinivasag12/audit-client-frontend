/**
* $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $
* $ History – File Name auditCode.controller.js $
******************  Version 1.0.0 *****************
* & Author – Dinesh,Tharani priya   DateTime – Created Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $
* $ Created in -  File Name with Package Structure /CentralAudit/app/src/main/Master Maintenance/auditCode/auditCode.controller.js $
**/

(function() {
	'use strict';

	angular.module('app.master.auditCode').controller('AuditCodeController',
			AuditCodeController);

	function AuditCodeController($scope, $cookies, toaster, $http, auditCodes,
			$rootScope, broadcastService, $timeout, $state, auditCodeFactory,
			AppConstant) {

		var code = this;
		var companyId = sessionStorage.getItem("companyId");
		code.AppConstant = angular.copy(AppConstant);
		code.enabled = true;
		code.lockMessage = code.AppConstant.CREATE.toUpperCase();
		code.codes = auditCodes;
		code.createedit = code.AppConstant.CREATE.toUpperCase();

		/** Fetching values for auditType Dropdown from auditType db **/
		auditCodeFactory.getAuditType(companyId).$promise.then(function(res) {
			$scope.auditTypeArray = _.filter(res, function(obj) {
				//Added by sudharsan for JIRA-ID=5329 on 28-06-2022
				if(sessionStorage.getItem("userRoleId")==1003||(sessionStorage.getItem("userRoleId") == code.AppConstant.ADMIN_ROLE_ID)){ //Added by sudharsan for Jira-Id = IRI 5504
					return obj.auditTypeId != code.AppConstant.SSP_TYPE_ID && obj.auditTypeId != code.AppConstant.IHM_TYPE_ID
					&& obj.auditTypeId != code.AppConstant.SOPEP_TYPE_ID && obj.auditTypeId != code.AppConstant.STS_TYPE_ID &&
					obj.auditTypeId != code.AppConstant.SMPEP_TYPE_ID && obj.auditTypeId != code.AppConstant.BWS_TYPE_ID &&
					obj.auditTypeId != code.AppConstant.VOC_TYPE_ID && obj.auditTypeId != code.AppConstant.SDR_TYPE_ID &&
					obj.auditTypeId != code.AppConstant.COW_TYPE_ID 
					
				}
			else{
				return obj.auditTypeId != code.AppConstant.SSP_TYPE_ID;
			}
			//Endhere
			});
		});

		window.onpopstate = function(event) {
			code.init = "";
			angular.forEach((event.target.location.pathname).split('/'),
					function(key, value) {
						if (value != 0) {
							code.init = code.init + key + ".";
							code.finalval = code.init;
						}
					});
			if (code.finalval.length - 1 == code.finalval.lastIndexOf(".")) {
				$scope.out = code.finalval.substring(0,
						code.finalval.length - 1);
			}
			$state.go($scope.out, {}, {
				reload : true
			});

		}

		/** Confirmation window while navigating to another page **/
		$rootScope.$on('$stateChangeStart', function(event, fromState,
				toParams, toState) {
			var element = angular.element(document.getElementById("loader"));
			if (code.AuditCodeForm) {
				if (code.AuditCodeForm.$dirty == true) {
					if (code.AuditCodeForm.auditTyp.$valid
							|| code.AuditCodeForm.auditcod.$valid
							|| code.AuditCodeForm.auditElem.$valid
							|| code.AuditCodeForm.statid.$valid) {
						if (broadcastService.confirmService()) {
							if (code.submit(code.createedit)) {
							} else {
								event.preventDefault();
							}
						}
					}
				}
			}
			element.addClass('hide');
		});

		/** validation for AuditCode Typeahead **/
		code.typeaheadArr = function(val) {
			var tempArray = [];
			if (val == '*') {
				code.codes.forEach(function(a) {
					if (a.auditTypeId == code.auditType) {
						tempArray.push(a);
					}
				});
			} else {
				tempArray = _.filter(code.codes, function(d) {
					return (d.auditCode.toLowerCase()).indexOf(val) > -1
							&& d.auditTypeId == code.auditType;
				});
			}
			return tempArray;
		}

		/** Model setting for typeahead values **/
		code.validateCode = function(val, param) {
			if (param == 'CODE' && val) {
				if (!val.auditCode) {
					code.auditcode = '';
				}
			}
		}

		/** Making fields null while changing to update or create mode **/
		code.fieldNull = function() {
			code.auditType = true;
			code.auditType = null;
			code.auditcode = null;
			code.auditelements = null;
			code.status = null;
		}

		/** Making fields empty while moving to Create or update **/
		code.changeCallback = function() {
			if (code.enabled) {
				code.createedit = code.AppConstant.CREATE.toUpperCase();
				code.fieldNull();
				code.lockMessage = code.AppConstant.CREATE.toUpperCase();
				code.auditType = false;
			} else {
				code.createedit = code.AppConstant.UPDATE.toUpperCase();
				code.lockMessage = code.AppConstant.UPDATE.toUpperCase();
				code.fieldNull();
			}
		};

		/** Removing every field on change of Audit Type* */
		code.removeElement = function(modelval) {
			code.auditelements = null;
			code.status = null;
		}

		/** Automatically fetching form datas for update mode * */
		code.updateTypeahead = function(val, $model, $label, $event, values) {
			if (val.auditTypeId == values) {
				code.auditelements = decodeURIComponent(val.auditElements);
				code.status = val.activeStatus;
				code.auditcode = {
					auditCode : val.auditCode
				};
			}
			code.AuditCodeForm.$dirty = false;
		}

		/** Toaster message disappearance after valid input is filled * */
		code.toasterClear = function() {
			toaster.clear();
		}

		/** Validation for unique auditCode **/
		code.checkAuditCode = function(value, values) {
			if (value != null) {
				if (value.slice(-1) == ".") {
					toaster.warning('Invalid Audit Code');
					code.auditcode = null;
				}
				auditCodeFactory.checkAuditCode(companyId).$promise
						.then(function(res) {
							for (var i = 0; res[i] != null; i++) {
								if (res[i].auditCode == value
										&& res[i].auditTypeId == values) {
									if (code.createedit == code.AppConstant.CREATE
											.toUpperCase()) {
										toaster
												.warning('Audit/Inspection code already exists')
										code.auditcode = null;
									}
								}
							}
						});
			}
		}

		/** Once Audittype is changed all the other fields will turn to null **/
		code.changeTypeId = function() {
			code.auditcode = null;
			code.status = null;
			code.auditelements = null;
		}

		/**Not Null Validation **/
		code.validate = function(val) {
			var flag = true;
			if (!val.companyId) {
				flag = false;
				toaster.warning('Check CompanyId ')
			}

			if (!val.auditElements) {
				flag = false;
				toaster.warning('Please Enter Audit Elements')
			}

			if (!val.auditCode) {
				flag = false;
				toaster.warning('Please Enter Audit Code')
			}

			if (!val.auditTypeId) {
				flag = false;
				toaster.warning('Please Enter Audit Type')
			}
			return flag;
		}

		code.update = function() {
			code.enabled = false;
			code.createedit = code.AppConstant.UPDATE.toUpperCase();
			code.auditelements = decodeURIComponent(code.auditelements);

		}

		code.submit = function(values) {
			code.auditelements = encodeURIComponent(code.auditelements);
			var MaAuditCodes = {
				"auditTypeId" : code.auditType,
				"auditCode" : (code.createedit == code.AppConstant.UPDATE
						.toUpperCase() ? code.auditcode.auditCode
						|| code.auditcode.toUpperCase() : code.auditcode
						.toUpperCase()),
				"auditElements" : code.auditelements != null ? code.auditelements
						.toUpperCase()
						: code.auditelements || code.auditElements != null ? code.auditElements
								.toUpperCase()
								: code.auditElements,
				"activeStatus" : code.status ? 1 : 0,
				"companyId" : Number(companyId),
				"userIns" : 'BSOL',
				"dateIns" : Date.now()
			};

			/** Saving or Updating audit codes **/
			if (code.respons = code.validate(MaAuditCodes)) {
				auditCodeFactory.saveAuditCodes(code.createedit, MaAuditCodes).$promise
						.then(function(res) {
							console.log(res);
							/*auditCodeFactory.pushCodes(companyId,res).$promise
							.then(function(resp) {
								console.log(resp);
							});*/
							if (code.createedit == code.AppConstant.CREATE
									.toUpperCase()) {
								toaster
										.success('Audit Code has been created successfully')
								code.AuditCodeForm.$dirty = false;
							} else {
								toaster
										.success('Audit Elements have been updated successfully')
								code.AuditCodeForm.$dirty = false;
							}

							/**
							 * Typeahead in Create mode to display created Audit
							 * Codes in Update mode typeahead
							 */
							if (code.createedit == code.AppConstant.CREATE
									.toUpperCase()) {
								code.codes.push({
									auditCode : MaAuditCodes.auditCode,
									activeStatus : MaAuditCodes.activeStatus,
									companyId : MaAuditCodes.companyId,
									auditElements : MaAuditCodes.auditElements,
									auditTypeId : MaAuditCodes.auditTypeId,
									dateIns : MaAuditCodes.dateIns,
									userIns : MaAuditCodes.userIns
								});
								code.update();
							}

							/***************************************************
							 * Typeahead in update mode to display updated Audit
							 * Codes
							 **************************************************/
							else {
								code.codes
										.forEach(function(a) {
											if (a.auditCode == MaAuditCodes.auditCode
													&& a.auditTypeId == MaAuditCodes.auditTypeId) {
												a.activeStatus = MaAuditCodes.activeStatus;
												a.companyId = MaAuditCodes.companyId;
												a.auditElements = MaAuditCodes.auditElements;
												a.dateIns = MaAuditCodes.dateIns;
												a.userIns = MaAuditCodes.userIns;

											}
										});
							}
						});
			}
			code.auditelements = decodeURIComponent(code.auditelements);
			return code.respons;
		}
	}

})();
