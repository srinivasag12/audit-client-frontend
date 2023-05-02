/**
 * $ Copyright 2018 BSOL Systems- IRI To Present - All rights reserved $ $
 * History – File Name vesselStatement.controller.js $ ***************** Version
 * 1.0.0 ***************** & Author – Tharani priya, Dinesh DateTime – Created
 * Date Thu Mar 30 2017 15:23:44 GMT+0530 (India Standard Time) $ $ Created in -
 * File Name with Package Structure
 * /CentralAudit/app/src/main/vesselStatement/vesselStatement.controller.js $
 */
(function() {
	'use strict';

	angular.module('app.vesselStatement').controller(
			'VesselStatementController', VesselStatementController);

	function VesselStatementController($rootScope, $filter, imonum, toaster,detailsFactory
			, $compile, $state, auditFactory, $scope, auditType,
			DTOptionsBuilder, DTColumnBuilder, $q, $http, AppConstant,
			vesselStatementFactory, $cookies, blockUI, MMMDDYYYY, YYYYMMDD,DDMMMYYYY,auditCycleFactory,ModalService) {

		var stat = this;

		stat.searchscreen = true;

		stat.detailscreen = false;
				
		stat.vesselStateData = vesselStateData;

		stat.tempImo;
		
		stat.vesseldeatls = vesseldeatls;

		stat.output = [];
		var res = [];
		stat.imonum = imonum;
		var VesselNotification = {};
		stat.companyId = sessionStorage.getItem('companyId');
		stat.auditArray = [];
		var inc = 0;
		stat.vesselHistory = [];
		stat.AppConstant = angular.copy(AppConstant);

		stat.auditNavigate = auditNavigate;
		
		stat.quickSearchDataVesselImoNo = sessionStorage.getItem('quickSearchDataVesselImoNo') ? sessionStorage.getItem('quickSearchDataVesselImoNo') :'';
		
		stat.quickSearchDataVeslNme = (sessionStorage.getItem('quickSearchDataVeslNme') && sessionStorage.getItem('quickSearchDataVeslNme')!='undefined') ? sessionStorage.getItem('quickSearchDataVeslNme').toString() :(stat.vesselArray ? stat.vesselArray.vesselName:'');		//changed by @Ramya for Jira id - IRI-4636
		console.log(stat);
		
		stat.overdue=function(){
			
		}
		
		/** page navigation * */
		$rootScope.$on('$stateChangeStart', function(event, fromState,
				toParams, toState) {
			sessionStorage.removeItem('ImoNum');
			sessionStorage.removeItem('VeslNme');

		});
		window.onpopstate = function(fromState, toState) {

			sessionStorage.removeItem('ImoNum');
			sessionStorage.removeItem('VeslNme');
			$rootScope.$on('$stateChangeStart', function(event, fromState,
					toParams, toState) {

				if (fromState.url == "/dashboard"
						&& toState.url == "/vessel-statement") {

					$state.go('app.dashboard', {}, {
						reload : true
					});

				}

			});
		}

		function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

			$('td', nRow).unbind('click');
			$('td', nRow).bind(
					'click',
					function(event) {

						// $scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
						if (event.target.cellIndex == 0) {
							event.preventDefault();
						} else {
							$scope.showData(aData.auditSeqNo,
									aData.vesselImoNo, aData.auditTypeId,
									aData.companyId);
						}

					});

			return nRow;
		}

		/** search Bean * */
		stat.setSearchData = function() {

			var searchBeanValues = {

				"vesselImoNo" : stat.imo,

				"companyId" : stat.companyId,

			}

			return searchBeanValues;
		}

		stat.downloadFiles = function(blob, fileName) {

			if (window.navigator.msSaveOrOpenBlob) { // For IE:

				navigator.msSaveBlob(blob, fileName);

			} else {
				/** For other browsers: * */

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
		
			
		/** VesselHistory Pop-up * */
		
		 function vesseldeatls(data,close,$scope){

	    		 ModalService.showModal({
	      			
	      			templateUrl : 'src/modals/vesselHistoryDetailsPopup.html',
	      			
	      			controller  : 'vesselHistoryDetailsPopupController as vesselHistoryPopup',
	      			
	      			windowClass: 'modal-fit',
	      			
	      			inputs		: {data:stat.vesselHistory,
	      				data2:stat.vesselArray
	      				
	      				
	      			}
	      			 
	      		}).then(function(modal) {
	      			console.log(stat.vesselHistory)
	      			modal.element.modal();
	      			
	  	            modal.close.then(function(result) { 
	  	            	
	  	            	if (result == 'OK') {		     				
								
		     			} else if (result == 'No' || result == 'cancel') {
		     							
		     			}
	  	           });
	  	            
	      		});
	    	 }
	    	 
	    	 
		
		/** end of vessel history pop-up* */
		
		/** print PDF * */
		stat.printPdf = function() {
			var searchData = stat.setSearchData();

			var category = '';

			if (stat.imo) {

				category = 'STATEMENT';

			} else {
				category = 'NOCR';
			}
			
			stat.vesselStateData();

			vesselStatementFactory.generateStatReport($scope.sendArray,
					'VESSEL', category, 'pdf', stat.companyId).$promise
					.then(function(result) {

						if (result.status == 200) {
							if (result.data.byteLength) {
								blockUI.start();

								stat.downloadFiles(new Blob([ result.data ], {
									type : result.headersGetter('content-type')
								}), 'VESSEL_' + category + '_PDF.pdf');

								blockUI.stop();
							} else {
								toaster.warning("No Records Found");
							}
						}

					});

		}

		/** Not null validation * */
		$scope.makenull = function(val) {

			
				stat.detailscreen = false;
				stat.vesselname = null;
				

			
		}
		$scope.makeimonull = function(val) {

		
				stat.detailscreen = false;

				stat.imo = null;
			

		}

		stat.today = moment(new Date(), MMMDDYYYY).format(YYYYMMDD).toUpperCase();

		
		/** Displaying Vessel Search Results * */
		stat.searchResult = function() {
			
			toaster.clear();
			

			$scope.sspArrayVal = [];
			$scope.arryVal = [];

			angular.forEach(stat.imonum, function(key, value) {

				if (key.vesselImoNo == stat.tempImo) {
					stat.vesselId = stat.imonum[value].vesselId;
					
					stat.vesselArray= stat.imonum[value];
				}
			});

			
//			vesselStatementFactory.vesselSpecificDtl(stat.companyId, $cookies
//					.get('userId'), stat.tempImo, stat.vesselId).$promise
//					.then(function(companyResp) {
//						console.log(companyResp);
						vesselStatementFactory.getVesselDetails(stat.tempImo,sessionStorage.getItem('companyId')).$promise
						.then(function(companyResp) {
							if(companyResp!=null && (companyResp.vesselCompany!="" && companyResp.vsselDtl!="")){  //Added by sudharsan for Jira-ID= IRI-5555
							console.log(companyResp);
							
							stat.vesselArray.docExpiry = moment(new Date(companyResp.vesselCompany[0].docExpiry),'MMM DD,YYYY').format('DD-MMM-YYYY');
							stat.vesselArray.keelLaidDate = moment(new Date(companyResp.vsselDtl[0].keelLaidDate),'MMM DD,YYYY').format('DD-MMM-YYYY');
							stat.vesselArray.dateOfRegistry = moment(new Date(companyResp.vsselDtl[0].dateOfRegistry),'MMM DD,YYYY').format('DD-MMM-YYYY');
							stat.vesselArray.docIssuer = companyResp.vesselCompany[0].docIssuer;
							stat.vesselArray.vesselCompanyName = companyResp.vesselCompany[0].vesselCompanyName
							stat.vesselArray.vesselCompanyAddress = companyResp.vesselCompany[0].vesselCompanyAddress;
							stat.vesselArray.grt = companyResp.vsselDtl[0].grt;
							stat.vesselArray.vesselType = companyResp.vsselDtl[0].vesselType;
							stat.vesselArray.registeredCompanyAddress = companyResp.vsselDtl[0].registeredCompanyAddress;
							stat.vesselArray.registeredCompanyName = companyResp.vsselDtl[0].registeredCompanyName;
							stat.vesselArray.companyImoNo = companyResp.vsselDtl[0].companyImoNo;
							stat.vesselArray.regOwnedImoNo = companyResp.vsselDtl[0].regOwnedImoNo;
							stat.vesselArray.portOfRegistry = companyResp.vsselDtl[0].portOfRegistry;
							stat.vesselCompare = angular.copy(companyResp);
							
							
							console.log(companyResp)
							
							vesselStatementFactory.getVesselHistory(stat.tempImo,"vesselImoNO").$promise
							.then(function(resHistory) {
								
								
								
								var vesCo = angular.copy(resHistory.result);
								
								var outputArray = []; 
								
								var start = false;
								for (var j = 0; j < vesCo.length; j++) {
						            for (var k = 0; k < outputArray.length; k++) {
						            	var count = 0;
						                if ( vesCo[j].VESSEL_NAME == outputArray[k].VESSEL_NAME ) {
						                	count++;
						                }
						                if ( vesCo[j].COMPANY_IMO_NO == outputArray[k].COMPANY_IMO_NO ) {
						                	count++;
						                }
						                if ( vesCo[j].DATE_INS == outputArray[k].DATE_INS ) {
						                	count++;
						                }
						                if ( vesCo[j].DATE_OF_REGISTRY == outputArray[k].DATE_OF_REGISTRY ) {
						                	count++;
						                }
						                if ( vesCo[j].DOC_EXPIRY == outputArray[k].DOC_EXPIRY ) {
						                	count++;
						                }
						                if ( vesCo[j].DOC_ISSUER == outputArray[k].DOC_ISSUER ) {
						                	count++;
						                }
						                if ( vesCo[j].GRT == outputArray[k].GRT ) {
						                	count++;
						                }
						                if ( vesCo[j].KEEL_LAID_DATE == outputArray[k].KEEL_LAID_DATE ) {
						                	count++;
						                }
						                if ( vesCo[j].PORT_OF_REGISTRY == outputArray[k].PORT_OF_REGISTRY ) {
						                	count++;
						                }
						                if ( vesCo[j].REGISTERED_COMPANY_ADDRESS == outputArray[k].REGISTERED_COMPANY_ADDRESS ) {
						                	count++;
						                }
						                if ( vesCo[j].REGISTERED_COMPANY_NAME == outputArray[k].REGISTERED_COMPANY_NAME ) {
						                	count++;
						                }
						                if ( vesCo[j].REG_OWNED_IMO_NUMBER == outputArray[k].REG_OWNED_IMO_NUMBER ) {
						                	count++;
						                }
						                if ( vesCo[j].VESSEL_ADDRESS == outputArray[k].VESSEL_ADDRESS ) {
						                	count++;
						                }
						                if ( vesCo[j].VESSEL_TYPE == outputArray[k].VESSEL_TYPE ) {
						                	count++;
						                }
						                
						                if(count==14)
						                	start = true;
						            }
						           
						            if (start == false) {
						                outputArray.push(vesCo[j]);
						            }
						            start = false;
						           
						        }
								 
								 outputArray.sort(function(c, d){
									 return d.SL_NO - c.SL_NO ;
								 });
								 console.log(outputArray)
								var resultFor = angular.copy(outputArray);
								 
								resultFor.forEach(function(hist){
									
									var str = hist.VESSEL_ADDRESS
									var index = str.split('\n');
									//var [company_name, company_address] = [str.slice(0, index), str.slice(index + 1)];
									hist.VESSEL_COMPANY_NAME = index[0]
									hist.VESSEL_COMPANY_ADDRESS = index[1]
									console.log(hist.VESSEL_ADDRES)
									hist.DATE_INS = moment(new Date(hist.DATE_INS),'YYYY-MM-DD').format('DD-MMM-YYYY');
									hist.DATE_OF_REGISTRY = hist.DATE_OF_REGISTRY ? moment(new Date(hist.DATE_OF_REGISTRY),'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
									hist.DOC_EXPIRY = hist.DOC_EXPIRY ? moment(new Date(hist.DOC_EXPIRY),'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
									hist.KEEL_LAID_DATE = hist.KEEL_LAID_DATE ? moment(new Date(hist.KEEL_LAID_DATE),'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
									hist.GRT = hist.GRT != 0 ? hist.GRT : '-';
									hist.REG_OWNED_IMO_NUMBER = hist.REG_OWNED_IMO_NUMBER != 0 ? hist.REG_OWNED_IMO_NUMBER : '-';
																			
									hist.vNameClr = false;
									hist.vTypeClr = false;
									hist.cImoClr = false;
									hist.vcNameClr = false;
									hist.vcAddressClr = false;
									hist.dRegistryClr = false;
									hist.dExpiryClr = false;
									hist.dIssuerClr = false;
									hist.gRTClr = false;
									hist.kDateClr = false;
									hist.rCompanyNameClr = false;
									hist.rCompanyAddClr = false;
									hist.rImonumClr = false;
									hist.pRegClr = false;
									hist.dInsClr = false;
									});
								
								
								var resultHist = [];
								
								resultHist = angular.copy(resultFor);
								
								for (var i = 0; i < resultHist.length; i++) {
									if(i==0){
											if(stat.vesselCompare.vsselDtl[0].vesselName != resultHist[i].VESSEL_NAME)
												resultHist[i].vNameClr = true;
											if(stat.vesselArray.vesselType != resultHist[i].VESSEL_TYPE)
												resultHist[i].vTypeClr = true;
											if(stat.vesselArray.companyImoNo != resultHist[i].COMPANY_IMO_NO)
												resultHist[i].cImoClr = true;
											if(stat.vesselArray.vesselCompanyName != resultHist[i].VESSEL_COMPANY_NAME)
												resultHist[i].vcNameClr = true;
											if(stat.vesselArray.vesselCompanyAddress != resultHist[i].VESSEL_COMPANY_ADDRESS)
												resultHist[i].vcAddressClr = true;
											if(stat.vesselArray.dateOfRegistry != resultHist[i].DATE_OF_REGISTRY)
												resultHist[i].dRegistryClr = true;
											if(stat.vesselArray.docExpiry != resultHist[i].DOC_EXPIRY)
												resultHist[i].dExpiryClr = true;
											if(stat.vesselArray.docIssuer != resultHist[i].DOC_ISSUER)
												resultHist[i].dIssuerClr = true;
											if(stat.vesselArray.grt != resultHist[i].GRT)
												resultHist[i].gRTClr = true;
											if(stat.vesselArray.keelLaidDate != resultHist[i].KEEL_LAID_DATE)
												resultHist[i].kDateClr = true;
											if(stat.vesselArray.registeredCompanyName != resultHist[i].REGISTERED_COMPANY_ADDRESS)
												resultHist[i].rCompanyNameClr = true;
											if(stat.vesselArray.registeredCompanyAddress != resultHist[i].REGISTERED_COMPANY_NAME)
												resultHist[i].rCompanyAddClr = true;
											if(stat.vesselArray.regOwnedImoNo != resultHist[i].REG_OWNED_IMO_NUMBER)
												resultHist[i].rImonumClr = true;
											if(stat.vesselArray.portOfRegistry != resultHist[i].PORT_OF_REGISTRY)
												resultHist[i].pRegClr = true;
												resultHist[i].dInsClr = false;
												if(resultHist.length>1){
													if(resultHist[i].VESSEL_NAME != resultHist[i+1].VESSEL_NAME)
														resultHist[i+1].vNameClr = true;
													if(resultHist[i].VESSEL_TYPE != resultHist[i+1].VESSEL_TYPE)
														resultHist[i+1].vTypeClr = true;
													if(resultHist[i].COMPANY_IMO_NO != resultHist[i+1].COMPANY_IMO_NO)
														resultHist[i+1].cImoClr = true;
													if(resultHist[i].VESSEL_COMPANY_NAME != resultHist[i+1].VESSEL_COMPANY_NAME)
														resultHist[i+1].vcNameClr = true;
													if(resultHist[i].VESSEL_COMPANY_ADDRESS != resultHist[i+1].VESSEL_COMPANY_ADDRESS)
														resultHist[i+1].vcAddressClr = true;
													if(resultHist[i].DATE_OF_REGISTRY != resultHist[i+1].DATE_OF_REGISTRY)
														resultHist[i+1].dRegistryClr = true;
													if(resultHist[i].DOC_EXPIRY != resultHist[i+1].DOC_EXPIRY)
														resultHist[i+1].dExpiryClr = true;
													if(resultHist[i].DOC_ISSUER != resultHist[i+1].DOC_ISSUER)
														resultHist[i+1].dIssuerClr = true;
													if(resultHist[i].GRT != resultHist[i+1].GRT)
														resultHist[i+1].gRTClr = true;
													if(resultHist[i].KEEL_LAID_DATE != resultHist[i+1].KEEL_LAID_DATE)
														resultHist[i+1].kDateClr = true;
													if(resultHist[i].REGISTERED_COMPANY_ADDRESS != resultHist[i+1].REGISTERED_COMPANY_ADDRESS)
														resultHist[i+1].rCompanyNameClr = true;
													if(resultHist[i].REGISTERED_COMPANY_NAME != resultHist[i+1].REGISTERED_COMPANY_NAME)
														resultHist[i+1].rCompanyAddClr = true;
													if(resultHist[i].REG_OWNED_IMO_NUMBER != resultHist[i+1].REG_OWNED_IMO_NUMBER)
														resultHist[i+1].rImonumClr = true;
													if(resultHist[i].PORT_OF_REGISTRY != resultHist[i+1].PORT_OF_REGISTRY)
														resultHist[i+1].pRegClr = true;
													if(resultHist[i].DATE_INS != resultHist[i+1].DATE_INS)
														resultHist[i+1].dInsClr = true;
												}
									}else if(i<resultHist.length-1){
										if(resultHist[i].VESSEL_NAME != resultHist[i+1].VESSEL_NAME)
											resultHist[i+1].vNameClr = true;
										if(resultHist[i].VESSEL_TYPE != resultHist[i+1].VESSEL_TYPE)
											resultHist[i+1].vTypeClr = true;
										if(resultHist[i].COMPANY_IMO_NO != resultHist[i+1].COMPANY_IMO_NO)
											resultHist[i+1].cImoClr = true;
										if(resultHist[i].VESSEL_COMPANY_NAME != resultHist[i+1].VESSEL_COMPANY_NAME)
											resultHist[i+1].vcNameClr = true;
										if(resultHist[i].VESSEL_COMPANY_ADDRESS != resultHist[i+1].VESSEL_COMPANY_ADDRESS)
											resultHist[i+1].vcAddressClr = true;
										if(resultHist[i].DATE_OF_REGISTRY != resultHist[i+1].DATE_OF_REGISTRY)
											resultHist[i+1].dRegistryClr = true;
										if(resultHist[i].DOC_EXPIRY != resultHist[i+1].DOC_EXPIRY)
											resultHist[i+1].dExpiryClr = true;
										if(resultHist[i].DOC_ISSUER != resultHist[i+1].DOC_ISSUER)
											resultHist[i+1].dIssuerClr = true;
										if(resultHist[i].GRT != resultHist[i+1].GRT)
											resultHist[i+1].gRTClr = true;
										if(resultHist[i].KEEL_LAID_DATE != resultHist[i+1].KEEL_LAID_DATE)
											resultHist[i+1].kDateClr = true;
										if(resultHist[i].REGISTERED_COMPANY_ADDRESS != resultHist[i+1].REGISTERED_COMPANY_ADDRESS)
											resultHist[i+1].rCompanyNameClr = true;
										if(resultHist[i].REGISTERED_COMPANY_NAME != resultHist[i+1].REGISTERED_COMPANY_NAME)
											resultHist[i+1].rCompanyAddClr = true;
										if(resultHist[i].REG_OWNED_IMO_NUMBER != resultHist[i+1].REG_OWNED_IMO_NUMBER)
											resultHist[i+1].rImonumClr = true;
										if(resultHist[i].PORT_OF_REGISTRY != resultHist[i+1].PORT_OF_REGISTRY)
											resultHist[i+1].pRegClr = true;
										if(resultHist[i].DATE_INS != resultHist[i+1].DATE_INS)
											resultHist[i+1].dInsClr = true;
										
									}
									/*if(i==resultHist.length-2){
										if(resultHist[i].VESSEL_NAME != resultHist[i+1].VESSEL_NAME)
											resultHist[i].vNameClr = true;
										if(resultHist[i].VESSEL_TYPE != resultHist[i+1].VESSEL_TYPE)
											resultHist[i].vTypeClr = true;
										if(resultHist[i].COMPANY_IMO_NO != resultHist[i+1].COMPANY_IMO_NO)
											resultHist[i].cImoClr = true;
										if(resultHist[i].VESSEL_COMPANY_NAME != resultHist[i+1].VESSEL_COMPANY_NAME)
											resultHist[i].vcNameClr = true;
										if(resultHist[i].VESSEL_COMPANY_ADDRESS != resultHist[i+1].VESSEL_COMPANY_ADDRESS)
											resultHist[i].vcAddressClr = true;
										if(resultHist[i].DATE_OF_REGISTRY != resultHist[i+1].DATE_OF_REGISTRY)
											resultHist[i].dRegistryClr = true;
										if(resultHist[i].DOC_EXPIRY != resultHist[i+1].DOC_EXPIRY)
											resultHist[i].dExpiryClr = true;
										if(resultHist[i].DOC_ISSUER != resultHist[i+1].DOC_ISSUER)
											resultHist[i].dIssuerClr = true;
										if(resultHist[i].GRT != resultHist[i+1].GRT)
											resultHist[i].gRTClr = true;
										if(resultHist[i].KEEL_LAID_DATE != resultHist[i+1].KEEL_LAID_DATE)
											resultHist[i].kDateClr = true;
										if(resultHist[i].REGISTERED_COMPANY_ADDRESS != resultHist[i+1].REGISTERED_COMPANY_ADDRESS)
											resultHist[i].rCompanyNameClr = true;
										if(resultHist[i].REGISTERED_COMPANY_NAME != resultHist[i+1].REGISTERED_COMPANY_NAME)
											resultHist[i].rCompanyNameClr = true;
										if(resultHist[i].REG_OWNED_IMO_NUMBER != resultHist[i+1].REG_OWNED_IMO_NUMBER)
											resultHist[i].rImonumClr = true;
										if(resultHist[i].PORT_OF_REGISTRY != resultHist[i+1].PORT_OF_REGISTRY)
											resultHist[i].pRegClr = true;
										if(resultHist[i].DATE_INS != resultHist[i+1].DATE_INS)
											resultHist[i].dInsClr = true;
										
									}*/
								}
								
								console.log(resultHist)
								
								stat.vesselHistory = angular.copy(resultHist);
								
							});
							
							
						if( companyResp.vsselDtl.length &&  companyResp.vsselDtl.length > 0 ){
							
							companyResp.vsselDtl =companyResp.vsselDtl[0];
							companyResp.vsselDtl.docExpiry = ( companyResp.vesselCompany && companyResp.vesselCompany[0] ) ? companyResp.vesselCompany[0].docExpiry :'';
							stat.CompanyDetails=companyResp.vesselCompany[0];
							
							if ( companyResp.vesselCompany &&  companyResp.vesselCompany.length &&  companyResp.vesselCompany.length > 0 ) {
								companyResp.vsselDtl.vesselCompany = angular.copy(companyResp.vesselCompany[0]);
							}
							
						vesselStatementFactory.getVesselCompanyDetails(companyResp.vsselDtl.companyImoNo,sessionStorage.getItem('companyId')).$promise
						.then(function(result) {
						if (result) {
							
							
							
						stat.detailscreen = true;
						stat.officialNum = companyResp.vsselDtl.officialNo;
						stat.vslnme = companyResp.vsselDtl.vesselName;
						stat.imono = companyResp.vsselDtl.vesselImoNo;
						stat.companyimono = companyResp.vsselDtl.companyImoNo;
						stat.docexpiry = stat.CompanyDetails.docExpiry;
						stat.docissue =stat.CompanyDetails.docIssuer;
						stat.cmpnyname = stat.CompanyDetails.vesselCompanyName;
						stat.doccert = stat.CompanyDetails.docTypeNo ; //chnages +" "+companyResp.vsselDtl.docTypeNumber;
						stat.vesselname = companyResp.vsselDtl.vesselName;				//added by @Ramya for Jira id - IRI-4636
						
						$scope.vesselNameValue = 0;
						$scope.tcApprovalStatusValue=0;
						$scope.officialNoValue = 0;
						$scope.companyImoNoValue = 0;
						$scope.companyNameValue = 0;
						$scope.companyDocValue = 0;
						$scope.docExpiryValue = 0;
						$scope.docIssuerValue = 0;

						vesselStatementFactory.getVesselSearchData(
								stat.tempImo, sessionStorage.getItem('companyId')).$promise
								.then(function(res){
									
									
									if(res.length>0){
										vesselDtlsCheck();
										res.forEach(function(i){
											
											if(i.auditTypeId==1001 && i.auditSubTypeId==1001 && i.certIssueId==1003){
												setTimeout(function() {
												detailsFactory.getCompletionDate(i.vesselImoNo,i.companyId,i.auditTypeId,'extendedEndorsed',i.auditSeqNo).$promise.then(function(completion){
													console.log(moment(new Date(completion.completionDate[0].EXTENDED_ENDORSED_DATE)).format('DD-MMM-YYYY'));
													i.certIssueDate=moment(new Date(completion.completionDate[0].EXTENDED_ENDORSED_DATE)).format('DD-MMM-YYYY');
												});
												},2000);
											}
											i.certificateNo = i.certificateNo ? i.certificateNo : 'Nil';
											i.certificateNo = i.certificateNo2 ? i.certificateNo2 : i.certificateNo;
											//i.certificateNo = i.auditSummaryId && (i.auditSummaryId!=AppConstant.NOT_APPROVED_SUMMARY) ? i.certificateNo : 'Nil';
											
										});
										
										
										
									}
									
									var def = $q.defer();
									def.resolve(result);
									console.log(stat.vesselArray);
								
									if (res.length == 0) {

										toaster
												.warning('No Audit found for the vessel');
									} else {
										$scope.pdfValue = true;
										
										console.log(stat.vesselArray);
										console.log(companyResp.vsselDtl);
										/*if (stat.vesselArray.tcApprovalStatus !== companyResp.vsselDtl.tcApprovalStatus) {
											$scope.tcApprovalStatusValue = 1;
											
											VesselNotification['tcApprovalStatus'] = "from" +""+stat.vesselArray.tcApprovalStatus +" "+ "to" +""+companyResp.vsselDtl.tcApprovalStatus;
										}
										if (stat.vesselArray.vesselName !== companyResp.vsselDtl.vesselName) {
											$scope.vesselNameValue = 1;
											
											VesselNotification['vesselName'] = "from" +""+stat.vesselArray.vesselName +" "+ "to" +""+companyResp.vsselDtl.vesselName;
										}

										if (stat.vesselArray.officialNo !== companyResp.vsselDtl.officialNo) {

											$scope.officialNoValue = 1;
											VesselNotification['officialNumber'] = "from" +" "+stat.vesselArray.officialNo +" "+"to" +companyResp.vsselDtl.officialNo;
											
										}
										console.log(result[0].docTypeNo+" "+stat.vesselArray.docTypeNumber);
										console.log(companyResp.vsselDtl.vesselCompany.docTypeNo+" "+companyResp.vsselDtl.docTypeNumber);
										
										if (result[0].companyImoNo !== companyResp.vsselDtl.vesselCompany.companyImoNo) {
											$scope.companyImoNoValue = 1;
											VesselNotification['companyImoNo'] = "from" +" "+result[0].companyImoNo +" "+ "to" +" "+companyResp.vsselDtl.vesselCompany.companyImoNo;
											
										}
										if (result[0].vesselCompanyName !== companyResp.vsselDtl.vesselCompany.vesselCompanyName) {
											$scope.companyNameValue = 1;
											VesselNotification['vesselCompanyName'] = "from" +" "+result[0].vesselCompanyName +" "+ "to" +" "+companyResp.vsselDtl.vesselCompany.vesselCompanyName;
											
										}
										if (result[0].docTypeNo+" "+stat.vesselArray.docTypeNumber !== companyResp.vsselDtl.vesselCompany.docTypeNo+" "+companyResp.vsselDtl.docTypeNumber) {
											$scope.companyDocValue = 1;
											VesselNotification['docTypeNo'] = "from" +" "+result[0].docTypeNo + "to" +" "+companyResp.vsselDtl.vesselCompany.docTypeNo;
											
										}
										
													
										if (moment(result[0].docExpiry).format("DD-MMM-YYYY") !== moment(
												companyResp.vsselDtl.vesselCompany.docExpiry)
												.format(MMMDDYYYY)) {
											$scope.docExpiryValue = 1;
											VesselNotification['docExpiry'] = "from" +" "+moment(result[0].docExpiry).format("DD-MMM-YYYY") +" "+ "to"+" " +moment(
													companyResp.vsselDtl.vesselCompany.docExpiry)
													.format(MMMDDYYYY);
										}
										if (result[0].docIssuer !== companyResp.vsselDtl.vesselCompany.docIssuer) {
											$scope.docIssuerValue = 1;
											VesselNotification['docIssuer'] = "from" +" "+result[0].docIssuer +" "+ "to" +" "+companyResp.vsselDtl.vesselCompany.docIssuer;
										}
										
									
										if($scope.tcApprovalStatusValue==1 || $scope.vesselNameValue==1 || $scope.officialNoValue==1 || $scope.companyImoNoValue==1 || $scope.companyNameValue==1 || $scope.companyDocValue==1 || $scope.docExpiryValue == 1 || $scope.docExpiryValue == 1){
											
											console.log('asddfsd');
								vesselStatementFactory.getRmiProced(VesselNotification, sessionStorage.getItem('companyId'),stat.tempImo).$promise
										.then(function(res) {
											
											
										});	
										}
										*/
										def.resolve(res);

										res = _
												.filter(
														res,
														function(obj) {
															return obj.auditStatusId != stat.AppConstant.VOID_AUDIT_STATUS;
														});

										$scope.result = res;

										
										stat.isps = $filter('filter')
												(
														res,
														{
															auditTypeId : stat.AppConstant.ISPS_TYPE_ID
														});

										stat.ism = $filter('filter')
												(
														res,
														{
															auditTypeId : stat.AppConstant.ISM_TYPE_ID
														});
										stat.mlc = $filter('filter')
												(
														res,
														{
															auditTypeId : stat.AppConstant.MLC_TYPE_ID
														});
										stat.ssp = $filter('filter')
												(
														res,
														{
															auditTypeId : stat.AppConstant.SSP_TYPE_ID
														});
										stat.dmlc = $filter('filter')
												(
														res,
														{
															auditTypeId : stat.AppConstant.DMLC_TYPE_ID
														});

										if (stat.ism.length == 0) {
											stat.ismvariable = 0;
										} else {
											stat.ismvariable = 1;
										}
										if (stat.isps.length == 0) {
											stat.ispsvariable = 0;
										} else {
											stat.ispsvariable = 1;
										}

										if (stat.mlc.length == 0) {
											stat.mlcvariable = 0;
										} else {
											stat.mlcvariable = 1;
										}

										if (stat.ssp.length == 0) {
											stat.sspvariable = 0;
										} else {
											stat.sspvariable = 1;
										}

										if (stat.dmlc.length == 0) {
											stat.dmlcvariable = 0;
										} else {
											stat.dmlcvariable = 1;
										}
										$scope.sspArrayVal = [
												{

													auditTypeId : stat.AppConstant.SSP_TYPE_ID,
													auditType : 'SSP',
													auditDesc : 'SSP Approval Status',
													nc : 'Failure',
													CerificateNo : 'SSP Approval Letter No.',
													ExpireDate : 'SSP Expiry Date',
													IssueDate : 'SSP Issue Date',
													Auditor : 'Auditor',
													divtag : stat.sspvariable,
													AppDate:'Approval Date'

												},
												{
													auditTypeId : stat.AppConstant.DMLC_TYPE_ID,
													auditType : 'DMLC II',
													auditDesc : 'DMLC II Review Status',
													nc : 'Review Note',
													CerificateNo : 'DMLC II Approval Letter No.',
													ExpireDate : 'DMLC II End Date',
													IssueDate : 'DMLC II Issue Date',
													Auditor : 'Inspector',
													divtag : stat.dmlcvariable,
													AppDate:'Review Date'

												} ];
										$scope.arryVal = [
												{
													auditKind : 'Audit Type',
													auditDat : 'SMC Audit Date',
													Inspection : 'Next Periodical Audit',
													auditTypeId : stat.AppConstant.ISM_TYPE_ID,
													auditType : 'ISM',
													auditDesc : 'SMC Detail',
													dnc : 'Major Non-Conformity',
													nc : 'Non-Conformity',
													obs : 'Observation ',
													CerificateNo : 'SMC  No.',
													ExpireDate : 'SMC Expiry Date',
													IssueDate : 'SMC Issue Date',
													subaudit : 0,
													history : '6 Years of  Audit History',
													Auditor : 'Auditor',
													status : 'Audit Status',
													divtag : stat.ismvariable

												},

												{
													auditKind : 'Audit Type',
													auditDat : 'ISSC Audit Date',
													Inspection : 'Next Periodical Audit',
													auditTypeId : stat.AppConstant.ISPS_TYPE_ID,
													auditType : 'ISPS',
													auditDesc : 'ISSC Detail',
													dnc : 'Major Failure',
													nc : 'Failure',
													obs : 'Observation',
													CerificateNo : 'ISSC No.',
													ExpireDate : 'ISSC Expiry Date',
													IssueDate : 'ISSC Issue Date',
													subaudit : stat.AppConstant.SSP_TYPE_ID,
													history : '6 Years of Audit History',
													Auditor : 'Auditor',
													status : 'Audit Status',
													divtag : stat.ispsvariable

												},
												{
													auditKind : 'Inspection Type',
													auditDat : 'MLC Inspection Date',
													Inspection : 'Next Periodical Inspection',
													auditTypeId : stat.AppConstant.MLC_TYPE_ID,
													auditType : 'MLC',
													auditDesc : 'MLC Detail',
													dnc : 'Serious Deficiency ',
													nc : 'Deficiency',
													obs : 'Observation',
													CerificateNo : 'MLC No.',
													ExpireDate : 'MLC Expiry Date',
													IssueDate : 'MLC Issue Date',
													subaudit : stat.AppConstant.DMLC_TYPE_ID,
													history : '6 Years of Inspection History',
													Auditor : 'Inspector',
													status : 'Inspection Status',
													divtag : stat.mlcvariable

												} ];

										stat.nextArr = function(value, n) {
											
											/*auditCycleFactory.getAuditCreditDate($scope.result[value].auditTypeId,$scope.result[value].vesselImoNo,$scope.result[value].companyId,
													$scope.result[value].auditSeqNo,$scope.result[value].auditSubTypeId).$promise.then(function(cycRes) {
												console.log(cycRes);*/
											
											 auditCycleFactory.getAllCycleDate($scope.result[value].auditTypeId,$scope.result[value].vesselImoNo,$scope.result[value].companyId).$promise.then(function(cycleAllData) {
								        	      console.log(cycleAllData);
								        	      
								        	      var seqNo =	(cycleAllData && cycleAllData.length > 0 ) ?  _.max(cycleAllData, function(find){  return   find.cycleSeqNo; }) : '';
								        	      
								        	      var nextIntermediateStart = (cycleAllData && cycleAllData.length > 0) ? 
								        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextIntermediateStart').toString() : '';
								        	    		  
								        	     var nextIntermediateEnd = (cycleAllData && cycleAllData.length > 0) ? 
								        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextIntermediateEnd').toString() : '';
								        	    		  
						        	    		  var nextRenewal = (cycleAllData && cycleAllData.length > 0) ? 
								        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextRenewal').toString() : '';
								        	    		  
						        	    		  var roleId = (cycleAllData && cycleAllData.length > 0) ? 
								        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('roleId').toString() : '';
								        	    		  
						        	    		  var intermediateDueDate = (cycleAllData && cycleAllData.length > 0) ? 
								        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('intermediateDueDate').toString() : '';
						        	    		 
						        	    		  var nextRenewalDueDate = (cycleAllData && cycleAllData.length > 0) ? 
						        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextRenewalDueDate').toString() : '';
								        	    		  
								        	     console.log('nextIntermediateStart - ' + nextIntermediateStart +', nextIntermediateEnd - ' + nextIntermediateEnd + ', nextRenewal - '+nextRenewal);
								        	     
								        	     /*if(roleId != 1001) {
								        	    	 
								        	    	 nextIntermediateStart =  nextIntermediateStart ? ( moment(nextIntermediateStart, YYYYMMDD).format(MMMDDYYYY) ) : ''; 
								        	    	 nextIntermediateEnd = nextIntermediateEnd ? ( moment(nextIntermediateEnd, YYYYMMDD).format(MMMDDYYYY) ) : '';
								        	     } else {*/
								        	    	 
								        	    	 nextIntermediateStart = nextIntermediateStart ? ( moment(nextIntermediateStart, YYYYMMDD).format(MMMDDYYYY) ) : ''; 
								        	    	 nextIntermediateEnd = nextIntermediateEnd ? ( moment(nextIntermediateEnd, YYYYMMDD).format(MMMDDYYYY) ) : '';
								        	    // }
																						
											console.log(value+', '+n);
											if( $scope.result[value].certExpireDate !== 'Nil' ) {
												
												$scope.result[value].ExtendedExpiryDate ? $scope.result[value].certExpireDate = moment(
														$scope.result[value].ExtendedExpiryDate)
														.format(MMMDDYYYY) : ($scope.result[value].certExpireDate ? $scope.result[value].certExpireDate = moment(
																$scope.result[value].certExpireDate)
																.format(MMMDDYYYY)
																: $scope.result[value].certExpireDate = 'Nil');
											}
											
											if( $scope.result[value].certIssueDate !== 'Nil' ) {
												
													$scope.result[value].ExtendedIssueDate ? $scope.result[value].certIssueDate = moment(
															$scope.result[value].ExtendedIssueDate)
															.format(MMMDDYYYY) : ($scope.result[value].certIssueDate ? $scope.result[value].certIssueDate = moment(
																	$scope.result[value].certIssueDate)
																	.format(MMMDDYYYY)
																	: $scope.result[value].certIssueDate = 'Nil');
											}
											
											$scope.result[value].auditDate = moment(
													$scope.result[value].auditDate)
													.format(MMMDDYYYY);
											
											if($scope.result[value].scope!=1001) {
												
												$scope.result[value].publishStatus==1 ? $scope.result[value].yellow=0 : $scope.result[value].yellow=1;
											}
											 $scope.result[value].auditSummaryId==1005 ? $scope.result[value].audSum=1 : $scope.result[value].audSum=0;
											 $scope.result[value].scope==1001 ? $scope.result[value].yellow=2 : $scope.result[value].yellow;
											 console.log( $scope.result);
												
											if ($scope.result[value + n].auditSubTypeId == stat.AppConstant.INTERIM_SUB_TYPE_ID) {
												
												$scope.result[value].nxtperdte = "INITIAL";
										        //$scope.result[value].Dateform = "Nil";
												$scope.result[value].Dateform = $scope.result[value].auditDate;
												$scope.result[value].resultDate = 'Nil';
												$scope.result[value].annivDate = 'Nil';
												$scope.result[value].dueDate = 'Nil';

											} else if ($scope.result[value + n].auditSubTypeId == stat.AppConstant.INITIAL_SUB_TYPE_ID) {
												
												var startdate = moment(
														$scope.result[value].auditDate)
														.format(MMMDDYYYY);

												var enddate = $scope.result[value + n
																			+ 1] ? moment(
														$scope.result[value + n
																+ 1].auditDate)
														.format(MMMDDYYYY) : " ";

												var finaldate = moment(
														startdate).diff(
														enddate, 'days', true);

												if (finaldate < 1095) {
													
													$scope.result[value].nxtperdte = "INTERMEDIATE";
													$scope.result[value].Dateform = $scope.result[value].auditDate;

													if ($scope.result[value].certIssueDate !== 'Nil') {
														
														$scope.result[value].resultDate1 = moment(
																moment(
																		$scope.result[value].certIssueDate,
																		MMMDDYYYY)
																		.add(1,
																				'years'),
																MMMDDYYYY)
																.format(
																		MMMDDYYYY);
														$scope.result[value].resultDate2 = moment(
																moment(
																		$scope.result[value].certExpireDate,
																		MMMDDYYYY)
																		.subtract(1,
																				'years'),
																MMMDDYYYY)
																.format(
																		MMMDDYYYY);
														/*$scope.result[value].resultDate = $scope.result[value].resultDate1
																+ " "
																+ "-"
																+ " "
																+ $scope.result[value].resultDate2;*/
														
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
														
														$scope.result[value].red = stat.today >= moment($scope.result[value].resultDate2,DDMMMYYYY).format(YYYYMMDD).toUpperCase() ? 1
																: 0;
														$scope.result[value].red==1 ? stat.duealert=1 : stat.duealert=0;
														

													} else {
														console.log($scope.result[value])
														console.log($scope.result[value + n]);
														
														/*****Additional half scope : Displayng initail audit data****/
														if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope == 1001 && $scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
															
															$scope.result[value].nxtperdte = "INTERMEDIATE";
															$scope.result[value].certificateNo = $scope.result[value + n].certificateNo;
															$scope.result[value].certIssueDate = moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY);
															$scope.result[value].certExpireDate = moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY);
															
															$scope.result[value].resultDate1 = moment(
																	moment(
																			moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY),
																			MMMDDYYYY)
																			.add(1,
																					'years'),
																	MMMDDYYYY)
																	.format(
																			MMMDDYYYY);
															$scope.result[value].resultDate2 = moment(
																	moment(
																			moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY),
																			MMMDDYYYY)
																			.subtract(1,
																					'years'),
																	MMMDDYYYY)
																	.format(
																			MMMDDYYYY);
															/*$scope.result[value].resultDate = $scope.result[value].resultDate1
																	+ " "
																	+ "-"
																	+ " "
																	+ $scope.result[value].resultDate2;*/
															
															$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
															
															$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
															
															$scope.result[value].red = stat.today >= moment($scope.result[value].resultDate2,DDMMMYYYY).format(YYYYMMDD).toUpperCase() ? 1 : 0;
															$scope.result[value].red==1 ? stat.duealert=1 : stat.duealert=0;
														
														} else {
															$scope.result[value].resultDate = 'Nil';
															$scope.result[value].dueDate = 'Nil';
														}
														
														
													}
													$scope.result[value].certIssueDate !== 'Nil' ? $scope.result[value].annivDate = moment(
															moment(
																	$scope.result[value].certIssueDate,
																	MMMDDYYYY)
																	.add(2,
																			'years'),
															MMMDDYYYY).format(
															'MMM-DD')
															: $scope.result[value].annivDate = 'Nil';

												}

												else {

													if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope == 1001 && $scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
														
														$scope.result[value].nxtperdte = "INTERMEDIATE";
														$scope.result[value].annivDate = moment($scope.result[value + n].auditDate).format('MMM-DD');
														$scope.result[value].certificateNo = $scope.result[value + n].certificateNo;
														$scope.result[value].certIssueDate = moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY);
														$scope.result[value].certExpireDate = moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY);
														
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
													
													} else {
														
														$scope.result[value].nxtperdte = "INTERMEDIATE";
														$scope.result[value].Dateform = $scope.result[value].auditDate;
	
														//$scope.result[value].annivDate = 'Nil';
														$scope.result[value].annivDate = moment($scope.result[value].auditDate).format('MMM-DD');
	
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
													}

												}

											} else if ($scope.result[value + n].auditSubTypeId == stat.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
												
												if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope == 1001 && $scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
													
													$scope.result[value].nxtperdte = "RENEWAL";
													$scope.result[value].annivDate = 'Nil';
													$scope.result[value].certificateNo = $scope.result[value + n].certificateNo;
													$scope.result[value].certIssueDate = moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY);
													$scope.result[value].certExpireDate = moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY);
													
													/*var d = new Date($scope.result[value].certExpireDate);
													$scope.result[value].resultDate = d.getFullYear();*/
													
													/*$scope.result[value].resultDate = nextRenewal ? ( moment(nextRenewal, YYYYMMDD).subtract(3,'months').format(MMMDDYYYY)
															+ ' - ' + moment(nextRenewal, YYYYMMDD).subtract(1,'days').format(MMMDDYYYY) ) : 'Nil';*/
													
													var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
													$scope.result[value].resultDate = d;
													
													$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
												
												} else {
													
													$scope.result[value].nxtperdte = "RENEWAL";
													$scope.result[value].Dateform = $scope.result[value].auditDate;
	
													$scope.result[value].annivDate = 'Nil';
													
													var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
													$scope.result[value].resultDate = d;
													
													$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
												}

											}

											else if ($scope.result[value + n].auditSubTypeId == stat.AppConstant.RENEWAL_SUB_TYPE_ID) {
												
												var startdate = moment(
														$scope.result[value].auditDate)
														.format(MMMDDYYYY);

												var enddate = moment(
														$scope.result[value + n
																+ 1].auditDate)
														.format(MMMDDYYYY);

												var finaldate = moment(
														startdate).diff(
														enddate, 'days', true);

												if ($scope.result[value + 1].auditSubTypeId == stat.AppConstant.INTERMEDIATE_SUB_TYPE_ID
														&& $scope.result[value - 1].auditStatusId == stat.AppConstant.COMPLETED_AUDIT_STATUS) {
													
													$scope.result[value].nxtperdte = "INTERMEDIATE";
													$scope.result[value].Dateform = $scope.result[value].auditDate;

													if ($scope.result[value].certIssueDate !== 'Nil') {
														$scope.result[value].resultDate1 = moment(
																moment(
																		$scope.result[value].certIssueDate,
																		MMMDDYYYY)
																		.add(2,
																				'years'),
																MMMDDYYYY)
																.format(
																		MMMDDYYYY);
														$scope.result[value].resultDate2 = moment(
																moment(
																		$scope.result[value].certIssueDate,
																		MMMDDYYYY)
																		.add(3,
																				'years'),
																MMMDDYYYY)
																.format(
																		MMMDDYYYY);
														/*$scope.result[value].resultDate = $scope.result[value].resultDate1
																+ " "
																+ "-"
																+ " "
																+ $scope.result[value].resultDate2;*/
														
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
														
														$scope.result[value].red = stat.today >= moment($scope.result[value].resultDate2,DDMMMYYYY).format(YYYYMMDD).toUpperCase() ? 1
																: 0;
														$scope.result[value].red==1 ? stat.duealert=1 : stat.duealert=0;
														

													} else {
														$scope.result[value].resultDate = 'Nil';
														$scope.result[value].dueDate = 'Nil';

													}
													$scope.result[value].certIssueDate !== 'Nil' ? $scope.result[value].annivDate = moment(
															moment(
																	$scope.result[value].certIssueDate,
																	MMMDDYYYY)
																	.add(2,
																			'years'),
															MMMDDYYYY).format(
															'MMM-DD')
															: $scope.result[value].annivDate = 'Nil';

												} else {
													
													$scope.result[value].nxtperdte = "INTERMEDIATE";
													$scope.result[value].Dateform =$scope.result[value].auditDate;

													if ($scope.result[value].certExpireDate !== 'Nil') {
														$scope.result[value].resultDate1 = moment(
																moment(
																		$scope.result[value].certExpireDate,
																		MMMDDYYYY)
																		.subtract(
																				3,
																				'months'),
																MMMDDYYYY)
																.format(
																		MMMDDYYYY);
														$scope.result[value].resultDate2 = moment(
																$scope.result[value].certExpireDate,
																MMMDDYYYY)
																.format(
																		MMMDDYYYY);
														/*$scope.result[value].resultDate = $scope.result[value].resultDate1
																+ " "
																+ "-"
																+ " "
																+ $scope.result[value].resultDate2;*/
														
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate =  intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
														
														$scope.result[value].red = stat.today >= moment($scope.result[value].resultDate2,DDMMMYYYY).format(YYYYMMDD).toUpperCase() ? 1
																: 0;
														$scope.result[value].red==1 ? stat.duealert=1 : stat.duealert=0;
														
													} else {
														
														if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope == 1001 && $scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
															
															$scope.result[value].nxtperdte = "INTERMEDIATE";
															$scope.result[value].annivDate = 'Nil';
															$scope.result[value].certificateNo = $scope.result[value + n].certificateNo;
															$scope.result[value].certIssueDate = moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY);
															$scope.result[value].certExpireDate = moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY);
															
															/*var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
															$scope.result[value].resultDate = d;
															
															$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';*/
															
															$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
															
															$scope.result[value].dueDate =  intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
															
														} else {
															$scope.result[value].resultDate = 'Nil';
														}
													}
													$scope.result[value].certExpireDate !== 'Nil' ? $scope.result[value].annivDate = moment(
															moment(
																	$scope.result[value].certExpireDate,
																	MMMDDYYYY)
																	.subtract(
																			3,
																			'months'),
															MMMDDYYYY).format(
															'MMM-DD')
															: $scope.result[value].annivDate = 'Nil';

												}
											} 
											
											else if ($scope.result[value + n].auditSubTypeId == stat.AppConstant.ADDITIONAL_SUB_TYPE_ID) {
												
												console.log($scope.result.length)
												
												var intrmdFlag = false;
												for(var l=0; l<$scope.result.length; l++) {
													if($scope.result[l].auditSubTypeId == stat.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
														intrmdFlag = true;
													}
												}
												
												if(intrmdFlag){
													
													if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope == 1001 && 
															$scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
														
														$scope.result[value].nxtperdte = "RENEWAL";
														$scope.result[value].annivDate = 'Nil';
														$scope.result[value].certificateNo = $scope.result[value + n].certificateNo;
														$scope.result[value].certIssueDate = moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY);
														$scope.result[value].certExpireDate = moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY);
														
														var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
														$scope.result[value].resultDate = d;
														
														$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
													}
													
													
													if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope != 1001 && 
															$scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
														
														$scope.result[value].nxtperdte = "RENEWAL";
														$scope.result[value].annivDate = 'Nil';
														
														var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
														$scope.result[value].resultDate = d;
														
														$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
													}
												} else {
													
													if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope == 1001 && 
															$scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
														
														$scope.result[value].nxtperdte = "INTERMEDIATE";
														$scope.result[value].annivDate = moment($scope.result[value].auditDate).format('MMM-DD');
														$scope.result[value].certificateNo = $scope.result[value + n].certificateNo;
														$scope.result[value].certIssueDate = moment($scope.result[value + n].certIssueDate).format(MMMDDYYYY);
														$scope.result[value].certExpireDate = moment($scope.result[value + n].certExpireDate).format(MMMDDYYYY);
														
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate =  intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
													}
													
													
													if($scope.result[value].auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID && $scope.result[value].scope != 1001 && 
															$scope.result[value].auditTypeId == $scope.result[value + n].auditTypeId) {
														
														$scope.result[value].nxtperdte = "INTERMEDIATE";
														$scope.result[value].annivDate = moment($scope.result[value].auditDate).format('MMM-DD');
														
														$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
														
														$scope.result[value].dueDate =  intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
													}
												}
												
												
											}
											
											
											});

										}

										angular
												.forEach(
														$scope.result,
														function(key, value) {
															var major = 0, minor = 0, obs = 0, rn = 0;
															angular
																	.forEach(
																			$scope.result[value].auditFinding,
																			function(
																					key1,
																					value1) {
																				if ($scope.result[value].auditFinding[value1].findingDetail.length > 0) {
																					if ($scope.result[value].auditFinding[value1].findingDetail[0].categoryId == stat.AppConstant.MAJOR_FINDING_CATEGORY) {

																						major++;
																					} else if ($scope.result[value].auditFinding[value1].findingDetail[0].categoryId == stat.AppConstant.MINOR_FINDING_CATEGORY) {

																						minor++;
																					} else if ($scope.result[value].auditFinding[value1].findingDetail[0].categoryId == stat.AppConstant.OBS_FINDING_CATEGORY) {

																						obs++;
																					} else if ($scope.result[value].auditFinding[value1].findingDetail[0].categoryId == stat.AppConstant.REVIEW_NOTE) {

																						rn++;
																					}
																				}
																				angular
																				.forEach(
																						$scope.result[value].auditFinding[value1].findingDetail,
																						function(
																								key2,
																								value2) {
																							
																							//$scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].dueDate=moment($scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].dueDate).format(YYYYMMDD).toUpperCase();
																							stat.today=moment(stat.today).format(YYYYMMDD).toUpperCase();
																							//stat.calc=$scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].dueDate;
																							
																							var duedat = new Date($scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].dueDate);
																							var dd = duedat.getDate(); 
																							var mm = duedat.getMonth()+1; //January is 0! 
																							var yyyy = duedat.getFullYear(); 
																							if(dd<10){
																							  dd='0'+dd
																							} 
																							if(mm<10){
																							  mm='0'+mm
																							} 
																							stat.calc = yyyy+'-'+mm+'-'+dd;
																							
																							while(stat.calc.charAt(0) === '-')
																							{
																								stat.calc = stat.calc.substr(1);
																							}
																							if($scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].categoryId == stat.AppConstant.MINOR_FINDING_CATEGORY)
																							{
																								
																								
																									if(stat.calc <= stat.today)
																								{
																									$scope.result[value].overDueNC=1;
																									stat.NCUpdate=1;
																									
																								}
																							}
																							if($scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].categoryId == stat.AppConstant.MAJOR_FINDING_CATEGORY)
																							{
																								console.log($scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].dueDate);
																								if(stat.calc <= stat.today)
																								{
																									$scope.result[value].overDueMNC=1;
																									stat.MNCUpdate=1;
																									
																								}
																							}
																							if($scope.result[value].auditFinding[value1].findingDetail[$scope.result[value].auditFinding[value1].findingDetail.length - 1].categoryId == stat.AppConstant.OBS_FINDING_CATEGORY)
																							{
																								if(stat.calc <= stat.today)
																								{
																									$scope.result[value].overDueOBS=1;
																									stat.OBSUpdate=1;
																									
																								}
																							}
																						});
																				
																			});
															
															
															
															$scope.result[value].dnc = major;
															$scope.result[value].nc = minor;
															$scope.result[value].ob = obs;

															if ($scope.result[value].auditAuditorDetail.length > 0) {
																$scope.result[value].auditorName = $scope.result[value].auditAuditorDetail[0].auditorName;
															} else
																$scope.result[value].auditorName = 'Nil';

															$scope.itr1 = $scope.result[value].auditSubTypeId;
															$scope.itr1Desc = $scope.result[value].audSubTypeDesc;
															$scope.itr1auditStatusDesc = $scope.result[value].auditStatusDesc;
															$scope.result[value].red = 0;

															if ($scope.result[value].auditTypeId == stat.AppConstant.ISM_TYPE_ID
																	|| $scope.result[value].auditTypeId == stat.AppConstant.ISPS_TYPE_ID
																	|| $scope.result[value].auditTypeId == stat.AppConstant.MLC_TYPE_ID) {
																
																 auditCycleFactory.getAllCycleDate($scope.result[value].auditTypeId,$scope.result[value].vesselImoNo,$scope.result[value].companyId).$promise.then(function(cycleAllData) {
													        	      console.log(cycleAllData);
													        	      
													        	      var seqNo =	(cycleAllData && cycleAllData.length > 0 ) ?  _.max(cycleAllData, function(find){  return   find.cycleSeqNo; }) : '';
													        	      
													        	      var nextIntermediateStart = (cycleAllData && cycleAllData.length > 0) ? 
													        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextIntermediateStart').toString() : '';
													        	    		  
													        	     var nextIntermediateEnd = (cycleAllData && cycleAllData.length > 0) ? 
													        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextIntermediateEnd').toString() : '';
													        	    		  
											        	    		  var nextRenewal = (cycleAllData && cycleAllData.length > 0) ? 
													        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextRenewal').toString() : '';
													        	    		  
											        	    		  var roleId = (cycleAllData && cycleAllData.length > 0) ? 
													        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('roleId').toString() : '';
													        	    		  
													        	    var intermediateDueDate = (cycleAllData && cycleAllData.length > 0) ? 
													        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('intermediateDueDate').toString() : '';
											        	    		 
											        	    		  var nextRenewalDueDate = (cycleAllData && cycleAllData.length > 0) ? 
											        	    		  _(cycleAllData).chain().where({'cycleSeqNo':seqNo.cycleSeqNo}).pluck('nextRenewalDueDate').toString() : '';
													        	    		  
													        	     console.log('nextIntermediateStart - ' + nextIntermediateStart +', nextIntermediateEnd - ' + nextIntermediateEnd + ', nextRenewal - '+nextRenewal);
													        	     console.log('intermediateDueDate - ' + intermediateDueDate + ', nextRenewalDueDate - ' + nextRenewalDueDate);
													        	    /* if(roleId != 1001) {
													        	    	 
													        	    	 nextIntermediateStart =  nextIntermediateStart ? ( moment(nextIntermediateStart, YYYYMMDD).format(MMMDDYYYY) ) : ''; 
													        	    	 nextIntermediateEnd = nextIntermediateEnd ? ( moment(nextIntermediateEnd, YYYYMMDD).format(MMMDDYYYY) ) : '';
													        	     } else {*/
													        	    	 
													        	    	 nextIntermediateStart = nextIntermediateStart ? ( moment(nextIntermediateStart, YYYYMMDD).format(MMMDDYYYY) ) : ''; 
													        	    	 nextIntermediateEnd = nextIntermediateEnd ? ( moment(nextIntermediateEnd, YYYYMMDD).format(MMMDDYYYY) ) : '';
													        	    // }
													        	     
													        	     
																/* });
																
																auditCycleFactory.getAuditCreditDate($scope.result[value].auditTypeId,$scope.result[value].vesselImoNo,$scope.result[value].companyId,
																		$scope.result[value].auditSeqNo,$scope.result[value].auditSubTypeId).$promise.then(function(cycRes) {
																	console.log(cycRes);*/
																	
																try {
																	var auditPlace = $scope.result[value].auditPlace ? atob($scope.result[value].auditPlace)
																			: 'Nil';
																	$scope.result[value].auditPlace = decodeURIComponent(auditPlace);
																	
																} catch (err) {
																	console
																			.log(err);
																}
																$scope.result[value].ExtendedExpiryDate ? $scope.result[value].certExpireDate = moment(
																		$scope.result[value].ExtendedExpiryDate)
																		.format(MMMDDYYYY) : ($scope.result[value].certExpireDate ? $scope.result[value].certExpireDate = moment(
																				$scope.result[value].certExpireDate)
																				.format(MMMDDYYYY)
																				: $scope.result[value].certExpireDate = 'Nil');
																
																		$scope.result[value].ExtendedIssueDate ? $scope.result[value].certIssueDate = moment(
																				$scope.result[value].ExtendedIssueDate)
																				.format(MMMDDYYYY) : ($scope.result[value].certIssueDate ? $scope.result[value].certIssueDate = moment(
																						$scope.result[value].certIssueDate)
																						.format(MMMDDYYYY)
																						: $scope.result[value].certIssueDate = 'Nil');
																$scope.result[value].auditDate = moment(
																		$scope.result[value].auditDate)
																		.format(
																				MMMDDYYYY);
																if($scope.result[value].scope!=1001) {
																
																	$scope.result[value].publishStatus==1 ? $scope.result[value].yellow=0 : $scope.result[value].yellow=1;																	
																}
																$scope.result[value].auditSummaryId==1005 ? $scope.result[value].audSum=1 : $scope.result[value].audSum=0;
																$scope.result[value].scope==1001 ? $scope.result[value].yellow=2 : $scope.result[value].yellow;
														
																if ($scope.result[value].auditSubTypeId == stat.AppConstant.INTERIM_SUB_TYPE_ID) {

																	$scope.result[value].nxtperdte = "INITIAL";
																	//$scope.result[value].Dateform = "Nil";
																	$scope.result[value].Dateform = $scope.result[value].auditDate;
																	$scope.result[value].annivDate = 'Nil';
																	$scope.result[value].resultDate = 'Nil';
																	$scope.result[value].dueDate = 'Nil';

																} /*else if ($scope.result[value].auditSubTypeId == stat.AppConstant.INTERIM_SUB_TYPE_ID
																		&& $scope.result[value].certIssueId !== stat.AppConstant.FULL_TERM_CERT) {

																	$scope.result[value].nxtperdte = "Nil";
																	$scope.result[value].Dateform = "Nil";

																	$scope.result[value].annivDate = 'Nil';
																	$scope.result[value].resultDate = 'Nil';

																}
									*/							if ($scope.result[value].auditSubTypeId == stat.AppConstant.INITIAL_SUB_TYPE_ID) {
										
																	$scope.result[value].nxtperdte = "INTERMEDIATE";
																	$scope.result[value].Dateform =$scope.result[value].auditDate;
																	console.log('here');
																	if ($scope.result[value].certIssueDate !== 'Nil') {
																		
																		$scope.result[value].resultDate1 = moment(
																				moment(
																						$scope.result[value].certIssueDate,
																						MMMDDYYYY)
																						.add(
																								1,
																								'years'),
																				MMMDDYYYY)
																				.format(
																						MMMDDYYYY);
																		$scope.result[value].resultDate2 = moment(
																				moment(
																						$scope.result[value].certExpireDate,
																						MMMDDYYYY)
																						.subtract(
																								1,
																								'years'),
																				MMMDDYYYY)
																				.format(
																						MMMDDYYYY);

																		/*$scope.result[value].resultDate = $scope.result[value].resultDate1
																				+ " "
																				+ "-"
																				+ " "
																				+ $scope.result[value].resultDate2;*/
																		
																		$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
																		
																		$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
																		
																		//console.log(stat.today >= moment($scope.result[value].resultDate2).format(YYYYMMDD).toUpperCase() ? 1));
																		
																		//$scope.result[value].red = stat.today >= moment($scope.result[value].resultDate2,DDMMMYYYY).format(YYYYMMDD).toUpperCase() ? 1 : 0;
																		
																		//$scope.result[value].red==1 ? stat.duealert=1 : stat.duealert=0;
																		

																	} else {
																		
																		$scope.result[value].resultDate = 'Nil';
																		$scope.result[value].dueDate = 'Nil';
																	}
																	$scope.result[value].certIssueDate !== 'Nil' ? $scope.result[value].annivDate = moment(
																			moment(
																					$scope.result[value].certIssueDate,
																					MMMDDYYYY)
																					.add(
																							2,
																							'years'),
																			MMMDDYYYY)
																			.format(
																					'MMM-DD')
																			: $scope.result[value].annivDate = 'Nil';

																	
																} /*else if ($scope.result[value].auditSubTypeId == stat.AppConstant.INITIAL_SUB_TYPE_ID
																		&& $scope.result[value].certIssueId !== stat.AppConstant.FULL_TERM_CERT) {

																	$scope.result[value].nxtperdte = "Nil";
																	$scope.result[value].Dateform = moment(
																			$scope.result[value].auditDate)
																			.format(
																					MMMDDYYYY);

																	$scope.result[value].resultDate = 'Nil';

																	$scope.result[value].certIssueDate !== 'Nil' ? $scope.result[value].annivDate = moment(
																			moment(
																					$scope.result[value].certIssueDate,
																					MMMDDYYYY)
																					.add(
																							2,
																							'years'),
																			MMMDDYYYY)
																			.format(
																					'MMM-DD')
																			: $scope.result[value].annivDate = 'Nil';

																}*/

																if ($scope.result[value].auditSubTypeId == stat.AppConstant.ADDITIONAL_SUB_TYPE_ID) {
																	
																	//$scope.result[value].Dateform = "Nil"
																	$scope.result[value].Dateform = $scope.result[value].auditDate;
																	//$scope.result[value].nxtperdte = "Nil";
																	//$scope.result[value].resultDate = 'Nil';
																	//$scope.result[value].annivDate = 'Nil';

																	console.log($scope.result);
																	console.log($scope.result[value]);
																	if ($scope.result[value + 1]) {
																		
																		if ($scope.result[value + 1].auditTypeId == $scope.result[value].auditTypeId) {
																			
																			stat.nextArr(value,1);
																			
																			if ($scope.result[value + 1].auditSubTypeId == stat.AppConstant.ADDITIONAL_SUB_TYPE_ID) {
																				
																				stat.nextArr(value,1);
																				
																				if ($scope.result[value + 1].auditSubTypeId == stat.AppConstant.ADDITIONAL_SUB_TYPE_ID) {
																					
																					stat.nextArr(value, 2);
																				}

																				if ($scope.result[value + 2].auditSubTypeId == stat.AppConstant.ADDITIONAL_SUB_TYPE_ID) {

																					stat.nextArr(value, 3);
																				}
																			}

																		} else {
																			
																			$scope.result[value].nxtperdte = "RENEWAL";
																			$scope.result[value].Dateform = $scope.result[value].auditDate;
							
																			$scope.result[value].annivDate = 'Nil';
																			
																			/*var d = new Date(
																					$scope.result[value].certExpireDate);
																			$scope.result[value].resultDate = d
																					.getFullYear();*/
																			
																			/*$scope.result[value].resultDate = nextRenewal ? ( moment(nextRenewal, YYYYMMDD).subtract(3,'months').format(MMMDDYYYY)
																					+ ' - ' + moment(nextRenewal, YYYYMMDD).subtract(1,'days').format(MMMDDYYYY) ) : 'Nil';*/
																			
																			var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
																			$scope.result[value].resultDate = d;
																			
																			$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
																		}

																	} else {
																		
																		$scope.result[value].nxtperdte = "RENEWAL";
																		$scope.result[value].Dateform = $scope.result[value].auditDate;
						
																		$scope.result[value].annivDate = 'Nil';
																		
																		/*var d = new Date(
																				$scope.result[value].certExpireDate);
																		$scope.result[value].resultDate = d
																				.getFullYear();*/
																		
																		/*$scope.result[value].resultDate = nextRenewal ? ( moment(nextRenewal, YYYYMMDD).subtract(3,'months').format(MMMDDYYYY)
																				+ ' - ' + moment(nextRenewal, YYYYMMDD).subtract(1,'days').format(MMMDDYYYY) ) : 'Nil';*/
																		
																		var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
																		$scope.result[value].resultDate = d;
																		
																		$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
																	}
																}

																if ($scope.result[value].auditSubTypeId == stat.AppConstant.INTERMEDIATE_SUB_TYPE_ID) {
																	$scope.result[value].nxtperdte = "RENEWAL";
																	$scope.result[value].Dateform = $scope.result[value].auditDate;

																	/*var d = new Date(
																			$scope.result[value].certExpireDate);

																	$scope.result[value].resultDate = d
																			.getFullYear();*/
																	
																	/*$scope.result[value].resultDate = nextRenewal ? ( moment(nextRenewal, YYYYMMDD).subtract(3,'months').format(MMMDDYYYY)
																			+ ' - ' + moment(nextRenewal, YYYYMMDD).subtract(1,'days').format(MMMDDYYYY) ) : 'Nil';*/
																	
																	var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
																	$scope.result[value].resultDate = d;
																	
																	$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
																	
																	$scope.result[value].annivDate = 'Nil';

																}

																if ($scope.result[value].auditSubTypeId == stat.AppConstant.RENEWAL_SUB_TYPE_ID) {

																	$scope.result[value].Dateform = $scope.result[value].auditDate;
																	
																	if($scope.result[value].certIssueId == stat.AppConstant.RENEWAL_ENDORSED1 || $scope.result[value].certIssueId == stat.AppConstant.RENEWAL_ENDORSED2) {
																		
																		$scope.result[value].nxtperdte = "RENEWAL";
																		
																		$scope.result[value].dueDate = nextRenewalDueDate ? moment(nextRenewalDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
																		
																		var d = nextRenewal ? ( new Date(nextRenewal).getFullYear() ) : 'Nil';
																		$scope.result[value].resultDate = d;
																		
																		$scope.result[value].annivDate = 'Nil';
																	} else {
																		
																		$scope.result[value].nxtperdte = "INTERMEDIATE";
																		$scope.result[value].resultDate = nextIntermediateStart ? ( nextIntermediateStart + ' - ' + nextIntermediateEnd ) : 'Nil';
																		
																		$scope.result[value].dueDate = intermediateDueDate ? moment(intermediateDueDate, YYYYMMDD).format(MMMDDYYYY) : 'Nil';
																		
																		$scope.result[value].certIssueDate !== '-' ? $scope.result[value].annivDate = moment(
																				moment(
																						$scope.result[value].certIssueDate,
																						MMMDDYYYY)
																						.add(
																								2,
																								'years'),
																				MMMDDYYYY)
																				.format(
																						'MMM-DD')
																				: $scope.result[value].annivDate = 'Nil';
																	}
																		
																	/*$scope.result[value].certIssueDate !== '-' ? $scope.result[value].annivDate = moment(
																			moment(
																					$scope.result[value].certIssueDate,
																					MMMDDYYYY)
																					.add(
																							2,
																							'years'),
																			MMMDDYYYY)
																			.format(
																					'MMM-DD')
																			: $scope.result[value].annivDate = 'Nil';*/

																} /*else if ($scope.result[value].auditSubTypeId == stat.AppConstant.RENEWAL_SUB_TYPE_ID
																		&& $scope.result[value].certIssueId !== stat.AppConstant.FULL_TERM_CERT) {

																	$scope.result[value].nxtperdte = "Nil";
																	$scope.result[value].Dateform = moment(
																			$scope.result[value].auditDate)
																			.format(
																					MMMDDYYYY);

																	if ($scope.result[value].certIssueDate !== 'Nil') {
																		$scope.result[value].resultDate1 = moment(
																				moment(
																						$scope.result[value].certIssueDate,
																						MMMDDYYYY)
																						.add(
																								2,
																								'years'),
																				MMMDDYYYY)
																				.format(
																						MMMDDYYYY);
																		$scope.result[value].resultDate2 = moment(
																				moment(
																						$scope.result[value].certIssueDate,
																						MMMDDYYYY)
																						.add(
																								3,
																								'years'),
																				MMMDDYYYY)
																				.format(
																						MMMDDYYYY);
																		$scope.result[value].resultDate = $scope.result[value].resultDate1
																				+ " "
																				+ "-"
																				+ " "
																				+ $scope.result[value].resultDate2;
																		$scope.result[value].red = stat.today >= moment($scope.result[value].resultDate2).format(YYYYMMDD).toUpperCase() ? 1
																				: 0;
																		$scope.result[value].red==1 ? stat.duealert=1 : stat.duealert=0;
																	} else {
																		$scope.result[value].resultDate = 'Nil';
																	}
																	$scope.result[value].certIssueDate !== 'Nil' ? $scope.result[value].annivDate = moment(
																			moment(
																					$scope.result[value].certIssueDate,
																					MMMDDYYYY)
																					.add(
																							2,
																							'years'),
																			MMMDDYYYY)
																			.format(
																					'MMM-DD')
																			: $scope.result[value].annivDate = 'Nil';

																}*/
																});

															}

															if ($scope.result[value].auditTypeId == stat.AppConstant.DMLC_TYPE_ID
																	|| $scope.result[value].auditTypeId == stat.AppConstant.SSP_TYPE_ID) {

																if($scope.result[value].auditTypeId == stat.AppConstant.DMLC_TYPE_ID) {
																	$scope.result[value].certIssueDates = moment($scope.result[value].closeMeetingDate).format(MMMDDYYYY);
																}
																if($scope.result[value].auditTypeId == stat.AppConstant.SSP_TYPE_ID) {
																	$scope.result[value].certIssueDates = moment($scope.result[value].certIssueDate).format(MMMDDYYYY);
																}
																
																$scope.result[value].auditDates = $scope.result[value].auditDate? moment(
																		$scope.result[value].auditDate)
																		.format(
																				MMMDDYYYY):'Nil';

																$scope.result[value].auditorNames = $scope.result[value].auditorName;
																try {
																	var auditPlace = $scope.result[value].auditPlace ? atob($scope.result[value].auditPlace)
																			: 'Nil';
																	$scope.result[value].auditPlaces = decodeURIComponent(auditPlace);
																} catch (err) {
																	console
																			.log(err);
																}

																$scope.result[value].ncs = rn;
																$scope.result[value].audSubTypeDescs = $scope.result[value].audSubTypeDesc;

																$scope.result[value].certificateNos = $scope.result[value].certificateNo;
																if ($scope.result[value].auditSubTypeId == stat.AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) {

																	$scope.result[value].nxtperdtes = "AMENDMENT";
																	$scope.result[value].Dateforms = $scope.result[value].auditDate;

																}

																if ($scope.result[value].auditSubTypeId == stat.AppConstant.SSP_DMLC_AMENDMENT_AUD_SUBTYPEID) {
																	$scope.result[value].nxtperdtes = "AMENDMENT";
																	$scope.result[value].Dateforms =$scope.result[value].auditDate;

																	$scope.result[value].annivDates = 'Nil';

																}

																$scope.result[value].auditSummaryId==1005 ? $scope.result[value].reviewSum=1 : $scope.result[value].reviewSum=0;
															}

														});

										stat.vesselStateData();
										console.log(companyResp); 
										stat.officialNum = companyResp.vsselDtl.officialNo;
										stat.vslnme = companyResp.vsselDtl.vesselName;
										stat.imono = companyResp.vsselDtl.vesselImoNo;
										stat.companyimono = companyResp.vsselDtl.companyImoNo;
										stat.docexpiry = moment(
												companyResp.vsselDtl.vesselCompany.docExpiry)
												.format(MMMDDYYYY);
										stat.docissue = companyResp.vsselDtl.vesselCompany.docIssuer;
										stat.cmpnyname = companyResp.vsselDtl.vesselCompany.vesselCompanyName;
										stat.doccert = companyResp.vsselDtl.vesselCompany.docTypeNo ; // chnages +" "+companyResp.vsselDtl.docTypeNumber;
										

										stat.detailscreen = true;
										if((stat.NCUpdate==1 || stat.MNCUpdate==1 || stat.OBSUpdate==1) && stat.duealert==1 )
										{
											stat.toastermessage1 = "Findings status update is overdue";
											stat.toastermessage2 = "Audit to be done for that Vessel is Overdue";
											stat.toastermessage = stat.toastermessage1 +"\n" + stat.toastermessage2;
											
										}
										else if(stat.duealert==1)
										{
											stat.toastermessage = "Audit to be done for that Vessel is Overdue";
											
										}
										else if(stat.NCUpdate==1 || stat.MNCUpdate==1 || stat.OBSUpdate==1)
										{
											stat.toastermessage = "Finding status update is overdue";
										}
										

									}
								});
						}
					}); 
				}
		}else{
			//Added by sudharsan for Jira-ID= IRI-5555 start here
			stat.vesselname='';
			stat.imo = '';
			stat.tempImo = (stat.imo);
			sessionStorage.setItem("ImoNum", stat.imo );
			console.log(toaster);
			toaster.clear();
			toaster.warning('Please enter Valid Vessel  Name / IMO Number');
		}
		//Added by sudharsan for Jira-ID= IRI-5555 end here
	});
			
		}
		
		function vesselStateData(){
			console.log('vesselStateData called...')
			
			$scope.sendArray = [];
			$scope.outputArray = [];
			$scope.mlcArray = [];
			$scope.mlcaudTypeDescArray = [];
			$scope.sspArray = [];
			$scope.ispsArray = [];
			$scope.dmlcArray = [];

			$scope.finalVal = $scope.result;
			console.log($scope);
			$scope.finalVal.forEach(function(data){
		           console.log(data);
		           if (data.vesselNameAud &&  stat.vesselname &&  data.vesselNameAud!=stat.vesselname) {
						data.vesselNameMissMatch = data.vesselNameAud;	
						stat.vesselNameMissFound=true; 
					}
		    	});
        
			stat.ispss = $filter('filter')
					(
							$scope.finalVal,
							{
								auditTypeId : stat.AppConstant.ISPS_TYPE_ID
							});

			stat.isms = $filter('filter')
					(
							$scope.finalVal,
							{
								auditTypeId : stat.AppConstant.ISM_TYPE_ID
							});
			stat.mlcs = $filter('filter')
					(
							$scope.finalVal,
							{
								auditTypeId : stat.AppConstant.MLC_TYPE_ID
							});
			stat.ssps = $filter('filter')
					(
							$scope.finalVal,
							{
								auditTypeId : stat.AppConstant.SSP_TYPE_ID
							});
			stat.dmlcs = $filter('filter')
					(
							$scope.finalVal,
							{
								auditTypeId : stat.AppConstant.DMLC_TYPE_ID
							});

			angular
					.forEach(
							$scope.finalVal,
							function(key, value) {

								if ($scope.finalVal[value].auditTypeId == stat.AppConstant.ISM_TYPE_ID) {

									$scope.outputArray
											.push({

												"audSubTypeDesc" : $scope.finalVal[value].audSubTypeDesc,
												"auditDate" : $scope.finalVal[value].auditDate,
												"auditPlace" : $scope.finalVal[value].auditPlace,
												"dnc" : $scope.finalVal[value].dnc,
												"nc" : $scope.finalVal[value].nc,
												"ob" : $scope.finalVal[value].ob,
												"auditorName" : $scope.finalVal[value].auditorName

											});

								}

								if ($scope.finalVal[value].auditTypeId == stat.AppConstant.SSP_TYPE_ID) {
									$scope.sspArray
											.push({

												"audSubTypeDescs" : $scope.finalVal[value].audSubTypeDescs,
												"auditDates" : $scope.finalVal[value].auditDates ? $scope.finalVal[value].auditDates:'Nil',
												"auditPlaces" : $scope.finalVal[value].auditPlaces,
												"auditorNames" : $scope.finalVal[value].auditorNames,
												"certificateNos" : $scope.finalVal[value].certificateNos,
												"certIssueDates" : $scope.finalVal[value].certIssueDates

											});

								}

								if ($scope.finalVal[value].auditTypeId == stat.AppConstant.ISPS_TYPE_ID) {

									$scope.ispsArray
											.push({

												"audSubTypeDesc" : $scope.finalVal[value].audSubTypeDesc,
												"auditDate" : $scope.finalVal[value].auditDate,
												"auditPlace" : $scope.finalVal[value].auditPlace,
												"dnc" : $scope.finalVal[value].dnc,
												"nc" : $scope.finalVal[value].nc,
												"ob" : $scope.finalVal[value].ob,
												"auditorName" : $scope.finalVal[value].auditorName
											});
								}

								if ($scope.finalVal[value].auditTypeId == stat.AppConstant.DMLC_TYPE_ID) {

									$scope.dmlcArray
											.push({

												"audSubTypeDescs" : $scope.finalVal[value].audSubTypeDescs,
												"auditDates" : $scope.finalVal[value].auditDates ? $scope.finalVal[value].auditDates:'Nil' ,
												"auditPlaces" : $scope.finalVal[value].auditPlaces,
												"auditorNames" : $scope.finalVal[value].auditorNames,
												"dnc" : $scope.finalVal[value].dnc,
												"certificateNos" : $scope.finalVal[value].certificateNos,
												"certIssueDates" : $scope.finalVal[value].certIssueDates
											});
								}
								if ($scope.finalVal[value].auditTypeId == stat.AppConstant.MLC_TYPE_ID) {

									$scope.mlcArray
											.push({

												"audSubTypeDesc" : $scope.finalVal[value].audSubTypeDesc,
												"auditDate" : $scope.finalVal[value].auditDate,
												"auditPlace" : $scope.finalVal[value].auditPlace,
												"dnc" : $scope.finalVal[value].dnc,
												"nc" : $scope.finalVal[value].nc,
												"ob" : $scope.finalVal[value].ob,
												"auditorName" : $scope.finalVal[value].auditorName
											});
								}

							});
			
			/** Value setting for PDF * */
			$scope.sendArray = [ {
				"vesselImoNo" : stat.imo ? stat.imo
						: null,
				"vesselName" : stat.vslnme ? stat.vslnme
						: null,
				"companyImoNo" : stat.companyimono ? stat.companyimono
						: null,
				"companyName" : stat.cmpnyname ? stat.cmpnyname
						: null,
				"companyDoc" : stat.doccert ? stat.doccert
						: null,
				"docExpiry" : stat.docexpiry,
				"officialNo" : stat.officialNum,
				"docIssuer" : stat.docissue ? stat.docissue
						: null,
				"auditTypeDesc" : $scope.outputArray,
				"dateform" : stat.isms.length !== 0 ? stat.isms[0].Dateform
						: null,
				"nxtperdte" : stat.isms.length !== 0 ? stat.isms[0].nxtperdte
						: null,
				"anivDate" : stat.isms.length !== 0 ? stat.isms[0].annivDate
						: null,
				"anivDatea" : stat.ispss.length !== 0 ? stat.ispss[0].annivDate
						: null,
				"anivDateb" : stat.mlcs.length !== 0 ? stat.mlcs[0].annivDate
						: null,
				"resultDate" : stat.isms.length !== 0 ? stat.isms[0].resultDate
						: null,
				"certificateNo" : stat.isms.length !== 0 ? stat.isms[0].certificateNo
						: null,
				"certExpireDate" : stat.isms.length !== 0 ? stat.isms[0].certExpireDate
						: null,
				"certIssueDate" : stat.isms.length !== 0 ? stat.isms[0].certIssueDate
						: null,
				"certificateNos" : stat.ssps.length !== 0 ? stat.ssps[0].certificateNos
						: null,
				"certIssueDates" : stat.ssps.length !== 0 ? stat.ssps[0].certIssueDates
						: null,
				"auditTypeDescSsp" : $scope.sspArray,
				"dateforma" : stat.ispss.length !== 0 ? stat.ispss[0].Dateform
						: null,
				"nxtperdtea" : stat.ispss.length !== 0 ? stat.ispss[0].nxtperdte
						: null,
				"resultDatea" : stat.ispss.length !== 0 ? stat.ispss[0].resultDate
						: null,
				"certificateNoa" : stat.ispss.length !== 0 ? stat.ispss[0].certificateNo
						: null,
				"certExpireDatea" : stat.ispss.length !== 0 ? stat.ispss[0].certExpireDate
						: null,
				"certIssueDatea" : stat.ispss.length !== 0 ? stat.ispss[0].certIssueDate
						: null,
				"auditTypeDescIsps" : $scope.ispsArray,
				"certificateNosa" : stat.dmlcs.length !== 0 ? stat.dmlcs[0].certificateNos
						: null,
				"certIssueDatesa" : stat.dmlcs.length !== 0 ? stat.dmlcs[0].certIssueDates
						: null,
				"auditTypeDescDmlc" : $scope.dmlcArray,
				"dateformb" : stat.mlcs.length !== 0 ? stat.mlcs[0].Dateform
						: null,
				"nxtperdteb" : stat.mlcs.length !== 0 ? stat.mlcs[0].nxtperdte
						: null,
				"resultDateb" : stat.mlcs.length !== 0 ? stat.mlcs[0].resultDate
						: null,
				"certificateNob" : stat.mlcs.length !== 0 ? stat.mlcs[0].certificateNo
						: null,
				"certExpireDateb" : stat.mlcs.length !== 0 ? stat.mlcs[0].certExpireDate
						: null,
				"certIssueDateb" : stat.mlcs.length !== 0 ? stat.mlcs[0].certIssueDate
						: null,
				"auditTypeDescMlc" : $scope.mlcArray

			} ];
		}

		stat.search = function() {
			stat.vesselNameMissFound=false;
			stat.NCUpdate=0;
			stat.MNCUpdate=0;
			stat.OBSUpdate=0;
			stat.duealert=0;

			if (stat.imo) {

				stat.tempImo = (stat.imo);

				stat.searchResult();

				sessionStorage.setItem("ImoNum", stat.imo );

				sessionStorage.setItem("VeslNme", stat.vesselname );

			} else {

				toaster.warning('Please enter Vessel  Name / IMO Number');

			}

		}

		if (sessionStorage.getItem("ImoNum")) {

			stat.tempImo = sessionStorage.getItem("ImoNum");

			stat.searchResult();

			stat.imo = sessionStorage.getItem("ImoNum");

			stat.vesselname = sessionStorage.getItem("VeslNme");

		}

		$scope.validateTypeahead = function(val, param) {

			if (param == 'IMONO' && val) {
				if (!val.vesselImoNo) {
					stat.imo = '';
				}
			}

			if (param == 'NAME' && val) {
				if (!val.vesselName) {
					stat.vesselname = '';
				}
			}

		}

		/* creating typeaheads for Imono and vesselName in update mode */
		$scope.vslImo = function(val) {
			var tempArray = [];

			if (val == '*') {
				tempArray = stat.imonum;
			} else if (val.length > 2) {

				tempArray = _.filter(stat.imonum, function(d) {
					return (d.vesselImoNo).toString().indexOf(val) > -1;
				});

			}

			return tempArray;
		}

		/* creating typeaheads for Imono and vesselName in update mode */
		$scope.vslName = function(val) {

			var tempArray = [];

			if (val == '*') {
				tempArray = stat.imonum;
			} else {

				tempArray = _.filter(stat.imonum, function(d) {
					var vesselnm = d.vesselName.toLowerCase();
					return (vesselnm).indexOf(val) > -1;
				});

			}
			return tempArray;
		}

		$scope.autoGenerate = function(val) {
			stat.vesselname = val.vesselName;
			stat.imo = val.vesselImoNo;
		}

		function auditNavigate(obj) {
			//$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);

			sessionStorage.setItem('auditSeqNo', obj.auditSeqNo);
			sessionStorage.setItem('companyId', obj.companyId);
			sessionStorage.setItem('auditTypeId', obj.auditTypeId);

			//var searchData = search.searchCriteria;

			// sessionStorage.setItem('auditSrchData', search.searchCriteria);

			$state.go('app.audit.details', {
				'audittype' : auditType[obj.auditTypeId].urlMap
			}, {
				reload : true
			});
		}
		
		
		if(stat.quickSearchDataVesselImoNo){ 	
		stat.imo = stat.quickSearchDataVesselImoNo;
		stat.vesselname = stat.quickSearchDataVeslNme ? stat.quickSearchDataVeslNme.replace(/\"/g, ""):stat.vesselname;
		stat.search();
	}
		
		function vesselDtlsCheck(){
	    	
			detailsFactory.getVesselRefresh(stat.tempImo).$promise.then(function(res) {
		    			console.log(res);
		    			
		    			res.result[0].docExpiry = res.result[0].docExpiry ? moment(res.result[0].docExpiry,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
		    			res.result[0].registrationDate = res.result[0].registrationDate ? moment(res.result[0].registrationDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
		    			res.result[0].keelLaidDate = res.result[0].keelLaidDate ? moment(res.result[0].keelLaidDate,'YYYY-MM-DD').format('YYYY-MM-DD') : '';
		    			
		    			var count = 0,cntNull=0;
		    			stat.vesselRefreshMsg = 'Vessel Details has been Changed For ';
		    			var dynamicMsg = '';
		    			stat.LatestVesselDetailsVM = [];
		    			stat.LatestVesselDetailsVM.fromPage = 'vesselstatement'
		    			console.log(stat.vesselCompare)
		    			stat.latestVesselDetail = angular.copy(res.result);
	    			
	    				if(res.result[0].companyAddress === stat.vesselCompare.vesselCompany[0].vesselCompanyAddress)
	   	       			 count++;
	    				else{
	    					if(!res.result[0].companyAddress)
		   	       				 cntNull++;
	    					else{
			   	       			 dynamicMsg += 'Company Address,';
			   	       			 stat.LatestVesselDetailsVM.oldAddress = stat.vesselCompare.vesselCompany[0].vesselCompanyAddress ? stat.vesselCompare.vesselCompany[0].vesselCompanyAddress : '-';
			   	       			 stat.LatestVesselDetailsVM.newAddress = res.result[0].companyAddress ? res.result[0].companyAddress : '-';
	    					}
	    				}
	    				
	    				if(res.result[0].customerName == stat.vesselCompare.vesselCompany[0].vesselCompanyName)
	    		 			count++;
	    				else{
	    					if(!res.result[0].customerName)
		   	       				 cntNull++;
	    					else{
			   	       			 dynamicMsg += 'Company Name,';
			   	       			 stat.LatestVesselDetailsVM.oldVMcompanyName = stat.vesselCompare.vesselCompany[0].vesselCompanyName ? stat.vesselCompare.vesselCompany[0].vesselCompanyName : '-';
			   	       			 stat.LatestVesselDetailsVM.newVMcompanyName = res.result[0].customerName ? res.result[0].customerName : '-';
	    					}
			   	       		
	    				}
	    				if(stat.vesselCompare.vesselCompany[0].docExpiry){
		    				var perfectDateEx = stat.vesselCompare.vesselCompany[0].docExpiry ? moment(stat.vesselCompare.vesselCompany[0].docExpiry,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
		    				
			   	       		 if(moment(res.result[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') == perfectDateEx)
			   	       			 count++;
			   	       		 else{
			   	       			 if(!res.result[0].docExpiry)
			   	       				 cntNull++;
			   	       			 else{
				   	       			 dynamicMsg += 'Doc Expiry,';
				   	       			 stat.LatestVesselDetailsVM.oldVMDOCExpiry = perfectDateEx;
				   	       			 stat.LatestVesselDetailsVM.newVMDOCExpiry = res.result[0].docExpiry ? moment(res.result[0].docExpiry,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
			   	       			 }
			   	       		 }
	    				}else
	    					count++;
	    				
	    				if(stat.vesselCompare.vesselCompany[0].docIssuer){
			    			var docIssuer = stat.vesselCompare.vesselCompany[0].docIssuer;
			   	       		 if(res.result[0].docIssuer === docIssuer)
			   	       			 count++;
			   	       	else{
			   	       			if(!res.result[0].docIssuer)
			   	       				cntNull++;
			   	       			else{
				   	       			 dynamicMsg += 'Doc Issuer,';
				   	       			 stat.LatestVesselDetailsVM.oldVMDOCIssuer = docIssuer ? docIssuer : '-';
				   	       			 stat.LatestVesselDetailsVM.newVMDOCIssuer = res.result[0].docIssuer ? res.result[0].docIssuer : '-';
			   	       			}
			   	       		 }
	    				}else
	    					count++;
		    			
		   	       		 var vesselname = stat.vesselCompare.vsselDtl[0].vesselName;
		   	       		 if(res.result[0].vesselName === vesselname)
		   	       			 count++;
		   	       		 else{
			   	       		if(!res.result[0].vesselName)
		   	       				 cntNull++;
			   	       		else{
			   	       			 dynamicMsg += 'Vessel Name,'
			   	       			 stat.LatestVesselDetailsVM.oldVMVesselName = vesselname ? vesselname : '-';
			   	       			 stat.LatestVesselDetailsVM.newVMVesselName = res.result[0].vesselName ? res.result[0].vesselName : '-';
			   	       		}
		   	       		 }
		   	       		 
		   	       		 if(stat.vesselCompare.vsselDtl[0].dateOfRegistry){
			    			var perfectDate = stat.vesselCompare.vsselDtl[0].dateOfRegistry ? moment(stat.vesselCompare.vsselDtl[0].dateOfRegistry,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
			   	       		if(moment(res.result[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') == perfectDate)
			   	       			count++;
			   	       		else{
				   	       		if(!res.result[0].registrationDate)
			   	       				 cntNull++;
				   	       		else{
				   	       			 dynamicMsg += 'Date Of Registry,'
				   	       			 stat.LatestVesselDetailsVM.oldVMPOR = perfectDate;
				   	       			 stat.LatestVesselDetailsVM.newVMPOR = res.result[0].registrationDate ? moment(res.result[0].registrationDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
				   	       		}
			   	       		}
		   	       		 }else
		    					count++;
		   	   	       		
		   	       		var vesselTypeAud=stat.vesselCompare.vsselDtl[0].vesselType;
		   	       		if(res.result[0].vesselType.toUpperCase().trim() === vesselTypeAud.toUpperCase().trim())
		   	       			count++;
		   	       		else{
			   	       		if(!res.result[0].vesselType)
		   	       				 cntNull++;
			   	       		else{
			   	       			 dynamicMsg += 'Vessel Type,';
			   	       			 stat.LatestVesselDetailsVM.oldVMVesselType = vesselTypeAud ? vesselTypeAud : '-';
			   	       			 stat.LatestVesselDetailsVM.newVMVesselType = res.result[0].vesselType ? res.result[0].vesselType : '-';
			   	       		}
		   	       		}
		   	       		if(res.result[0].companyIMONumber == stat.vesselCompare.vsselDtl[0].companyImoNo)
		   	       			count++;
		   	       		else{
			   	       		if(!res.result[0].companyIMONumber)
		   	       				 cntNull++;
			   	       		else{
			   	       			 dynamicMsg += 'Company IMO NO.,'
			   	       			 stat.LatestVesselDetailsVM.oldVMCompanyIMONo = stat.vesselCompare.vsselDtl[0].companyImoNo ? stat.vesselCompare.vsselDtl[0].companyImoNo : '-';
			   	       			 stat.LatestVesselDetailsVM.newVMCompanyIMONo = res.result[0].companyIMONumber ? res.result[0].companyIMONumber : '-';
			   	       		}
		   	       		}
		   	       				 
		   	       		if(res.result[0].grossTon == stat.vesselCompare.vsselDtl[0].grt)
		   	       			count++;
		   	       		else{
			   	       		if(!res.result[0].grossTon)
		   	       				cntNull++;
			   	       		else{
			   	       			 dynamicMsg += 'GRT,';
			   	       			 stat.LatestVesselDetailsVM.oldVMGRT = stat.vesselCompare.vsselDtl[0].grt != 0 ? stat.vesselCompare.vsselDtl[0].grt : '-';
			   	       			 stat.LatestVesselDetailsVM.newVMGRT = res.result[0].grossTon ? res.result[0].grossTon : '-';
			   	       		}
		   	       		}
	    				
	    				if(res.result[0].homePort == stat.vesselCompare.vsselDtl[0].portOfRegistry)
	    		 			count++;
	    				else{
	    					if(!res.result[0].homePort)
		   	       				cntNull++;
	    					else{
			   	       			 dynamicMsg += 'Port of Registry';
			   	       			 stat.LatestVesselDetailsVM.oldportOfRegistry = stat.vesselCompare.vsselDtl[0].portOfRegistry ? stat.vesselCompare.vsselDtl[0].portOfRegistry : '-';
			   	       			 stat.LatestVesselDetailsVM.newportOfRegistry = res.result[0].homePort ? res.result[0].homePort : '-';
	    					}
			   	       		
	    				}
	    				
	    				if(moment(res.result[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') == moment(stat.vesselCompare.vsselDtl[0].keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY'))
	    		 			count++;
	    				else{
	    					if(!res.result[0].keelLaidDate)
		   	       				cntNull++;
	    					else{
			   	       			 dynamicMsg += 'Keel Laid Date,';
			   	       			 stat.LatestVesselDetailsVM.oldkeelLaidDate = stat.vesselCompare.vsselDtl[0].keelLaidDate ? moment(stat.vesselCompare.vsselDtl[0].keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
			   	       			 stat.LatestVesselDetailsVM.newkeelLaidDate = res.result[0].keelLaidDate ? moment(res.result[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
	    					}
			   	       		
	    				}
	    				if(res.result[0].regOwnedImoNo == stat.vesselCompare.vsselDtl[0].regOwnedImoNo)
	    		 			count++;
	    				else{
	    					if(!res.result[0].regOwnedImoNo)
		   	       				cntNull++;
	    					else{
			   	       			 dynamicMsg += 'Register Owner IMO Number,';
			   	       			 stat.LatestVesselDetailsVM.oldregOwnedImoNo = stat.vesselCompare.vsselDtl[0].regOwnedImoNo != 0  ? stat.vesselCompare.vsselDtl[0].regOwnedImoNo : '-';
			   	       			 stat.LatestVesselDetailsVM.newregOwnedImoNo = res.result[0].regOwnedImoNo ? res.result[0].regOwnedImoNo : '-';
	    					}
			   	       		
	    				}
	    				if(res.result[0].registeredCompanyName == stat.vesselCompare.vsselDtl[0].registeredCompanyName)
	    		 			count++;
	    				else{
	    					if(!res.result[0].registeredCompanyName)
		   	       				cntNull++;
	    					else{
			   	       			 dynamicMsg += 'Register Company Name,';
			   	       			 stat.LatestVesselDetailsVM.oldregisteredCompanyName = stat.vesselCompare.vsselDtl[0].registeredCompanyName ? stat.vesselCompare.vsselDtl[0].registeredCompanyName : '-';
			   	       			 stat.LatestVesselDetailsVM.newregisteredCompanyName = res.result[0].registeredCompanyName ? res.result[0].registeredCompanyName : '-';
	    					}
			   	       		
	    				}
	    				if(res.result[0].registeredCompanyAddress == stat.vesselCompare.vsselDtl[0].registeredCompanyAddress)
	    		 			count++;
	    				else{
	    					if(!res.result[0].registeredCompanyAddress)
		   	       				cntNull++;
	    					else{
		   	       			 dynamicMsg += 'Register Company Address,';
		   	       			 stat.LatestVesselDetailsVM.oldregisteredCompanyAddress = stat.vesselCompare.vsselDtl[0].registeredCompanyAddress ? stat.vesselCompare.vsselDtl[0].registeredCompanyAddress : '-';
		   	       			 stat.LatestVesselDetailsVM.newregisteredCompanyAddress = res.result[0].registeredCompanyAddress ? res.result[0].registeredCompanyAddress : '-';
	    					}
			   	       		
	    				}
	    				
		   	       		console.log(count)
		   	       		if(count!=14 && cntNull==0){
		   	       			stat.vesselRefreshMsg += dynamicMsg;
		   	       			stat.LatestVesselDetailsVM.vesselRefreshMsg = stat.vesselRefreshMsg;
		   	       			updateVesselDeatils(stat.LatestVesselDetailsVM);
		   	       		 }
	        	});
	     	
	     }
		function updateVesselDeatils(data){ 
			console.log("hey")
			console.log(data)
			ModalService.showModal({
	    			
	    		templateUrl : 'src/modals/viewMoreAlert.html', 
	    			
	    		controller  : 'viewMoreController',
	    			
	    		inputs		: {data:data},	    			
	    		
	    	}).then(function(modal) {
	    			
	    		modal.element.modal();
	    			
	    		modal.close.then(function(result) { 
	    			
	    		});
	    	});
		}

	}

})();