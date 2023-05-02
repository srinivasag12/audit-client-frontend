(function() {
	'use strict';

	angular.module('app.vesselHistory').controller('vesselHistoryController',
			vesselHistoryController);
	
	function vesselHistoryController($rootScope, $filter, imonum, toaster,detailsFactory
			, $compile, $state, auditFactory, $scope, auditType,
			DTOptionsBuilder, DTColumnBuilder, $q, $http, AppConstant,
			vesselStatementFactory, $cookies, blockUI, MMMDDYYYY, YYYYMMDD,DDMMMYYYY,auditCycleFactory,ModalService ) {

		var vesselHistory = this;

		vesselHistory.searchscreen = true;

		vesselHistory.detailscreen = false;
				

		vesselHistory.tempImo;
		

		vesselHistory.output = [];
		var res = [];
		vesselHistory.imonum = imonum;
		var VesselNotification = {};
		vesselHistory.companyId = sessionStorage.getItem('companyId');
		vesselHistory.auditArray = [];
		var inc = 0;
		vesselHistory.AppConstant = angular.copy(AppConstant);

		
		vesselHistory.quickSearchDataVesselImoNo = sessionStorage.getItem('quickSearchDataVesselImoNo') ? sessionStorage.getItem('quickSearchDataVesselImoNo') :'';
		
		vesselHistory.quickSearchDataVeslNme = sessionStorage.getItem('quickSearchDataVeslNme') ? sessionStorage.getItem('quickSearchDataVeslNme').toString() :'';
		
		
		vesselHistory.overdue=function(){
			
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


		/** search Bean * */
		vesselHistory.setSearchData = function() {

			var searchBeanValues = {

				"vesselImoNo" : vesselHistory.imo,

				"companyId" : vesselHistory.companyId,

			}

			return searchBeanValues;
		}

		

		/** Not null validation * */
		$scope.makenull = function(val) {

			
			vesselHistory.detailscreen = false;
			vesselHistory.vesselname = null;
				

			
		}
		$scope.makeimonull = function(val) {

		
			vesselHistory.detailscreen = false;

			vesselHistory.imo = null;
			

		}

		vesselHistory.today = moment(new Date(), MMMDDYYYY).format(YYYYMMDD).toUpperCase();

		
		/** Displaying Vessel Search Results * */
		vesselHistory.searchResult = function() {
			
			toaster.clear();
			

			$scope.sspArrayVal = [];
			$scope.arryVal = [];

			angular.forEach(vesselHistory.imonum, function(key, value) {

				if (key.vesselImoNo == vesselHistory.tempImo) {
					vesselHistory.vesselId = vesselHistory.imonum[value].vesselId;
					
					vesselHistory.vesselArray= vesselHistory.imonum[value];
				}
			});

		
						vesselStatementFactory.getVesselDetails(vesselHistory.tempImo,sessionStorage.getItem('companyId')).$promise
						.then(function(companyResp) {

							vesselHistory.vesselCompare = angular.copy(companyResp);
							vesselHistory.vesselCompare.docExpiry = moment(new Date(companyResp.vesselCompany[0].docExpiry),'MMM DD,YYYY').format('DD-MMM-YYYY');
							vesselHistory.vesselCompare.keelLaidDate = moment(new Date(companyResp.vsselDtl[0].keelLaidDate),'MMM DD,YYYY').format('DD-MMM-YYYY');
							vesselHistory.vesselCompare.dateOfRegistry = moment(new Date(companyResp.vsselDtl[0].dateOfRegistry),'MMM DD,YYYY').format('DD-MMM-YYYY');
							vesselHistory.vesselCompare.docIssuer = companyResp.vesselCompany[0].docIssuer;
							vesselHistory.vesselCompare.vesselCompanyName = companyResp.vesselCompany[0].vesselCompanyName
							vesselHistory.vesselCompare.vesselCompanyAddress = companyResp.vesselCompany[0].vesselCompanyAddress;
							vesselHistory.vesselCompare.grt = companyResp.vsselDtl[0].grt;
							vesselHistory.vesselCompare.vesselType = companyResp.vsselDtl[0].vesselType;
							vesselHistory.vesselCompare.registeredCompanyAddress = companyResp.vsselDtl[0].registeredCompanyAddress;
							vesselHistory.vesselCompare.registeredCompanyName = companyResp.vsselDtl[0].registeredCompanyName;
							vesselHistory.vesselCompare.companyImoNo = companyResp.vsselDtl[0].companyImoNo;
							vesselHistory.vesselCompare.regOwnedImoNo = companyResp.vsselDtl[0].regOwnedImoNo;
							vesselHistory.vesselCompare.portOfRegistry = companyResp.vsselDtl[0].portOfRegistry;
							
							
							
							console.log(companyResp)
							
							vesselStatementFactory.getVesselHistory(vesselHistory.tempImo,"vesselImoNO").$promise
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
									hist.DOC_EXPIRY = hist.DOC_EXPIRY ? moment(new Date(hist.DOC_EXPIRY),'YYYY-MM-DD').format('DD-MMM-YYYY') : '';
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
											if(vesselHistory.vesselCompare.vsselDtl[0].vesselName != resultHist[i].VESSEL_NAME)
												resultHist[i].vNameClr = true;
											if(vesselHistory.vesselCompare.vesselType != resultHist[i].VESSEL_TYPE)
												resultHist[i].vTypeClr = true;
											if(vesselHistory.vesselCompare.companyImoNo != resultHist[i].COMPANY_IMO_NO)
												resultHist[i].cImoClr = true;
											if(vesselHistory.vesselCompare.vesselCompanyName != resultHist[i].VESSEL_COMPANY_NAME)
												resultHist[i].vcNameClr = true;
											if(vesselHistory.vesselCompare.vesselCompanyAddress != resultHist[i].VESSEL_COMPANY_ADDRESS)
												resultHist[i].vcAddressClr = true;
											if(vesselHistory.vesselCompare.dateOfRegistry != resultHist[i].DATE_OF_REGISTRY)
												resultHist[i].dRegistryClr = true;
											if(vesselHistory.vesselCompare.docExpiry != resultHist[i].DOC_EXPIRY)
												resultHist[i].dExpiryClr = true;
											if(vesselHistory.vesselCompare.docIssuer != resultHist[i].DOC_ISSUER)
												resultHist[i].dIssuerClr = true;
											if(vesselHistory.vesselCompare.grt != resultHist[i].GRT)
												resultHist[i].gRTClr = true;
											if(vesselHistory.vesselCompare.keelLaidDate != resultHist[i].KEEL_LAID_DATE)
												resultHist[i].kDateClr = true;
											if(vesselHistory.vesselCompare.registeredCompanyName != resultHist[i].REGISTERED_COMPANY_ADDRESS)
												resultHist[i].rCompanyNameClr = true;
											if(vesselHistory.vesselCompare.registeredCompanyAddress != resultHist[i].REGISTERED_COMPANY_NAME)
												resultHist[i].rCompanyAddClr = true;
											if(vesselHistory.vesselCompare.regOwnedImoNo != resultHist[i].REG_OWNED_IMO_NUMBER)
												resultHist[i].rImonumClr = true;
											if(vesselHistory.vesselCompare.portOfRegistry != resultHist[i].PORT_OF_REGISTRY)
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
								
								vesselHistory.vesselHistory = angular.copy(resultHist);
								
							});
							
							
						if( companyResp.vsselDtl.length &&  companyResp.vsselDtl.length > 0 ){
							
							companyResp.vsselDtl =companyResp.vsselDtl[0];
							companyResp.vsselDtl.docExpiry = ( companyResp.vesselCompany && companyResp.vesselCompany[0] ) ? companyResp.vesselCompany[0].docExpiry :'';
							vesselHistory.CompanyDetails=companyResp.vesselCompany[0];
							
							if ( companyResp.vesselCompany &&  companyResp.vesselCompany.length &&  companyResp.vesselCompany.length > 0 ) {
								companyResp.vsselDtl.vesselCompany = angular.copy(companyResp.vesselCompany[0]);
							}
							
						vesselStatementFactory.getVesselCompanyDetails(companyResp.vsselDtl.companyImoNo,sessionStorage.getItem('companyId')).$promise
						.then(function(result) {
						if (result) {
							
							
							
							vesselHistory.detailscreen = true;
							vesselHistory.officialNum = companyResp.vsselDtl.officialNo;
							vesselHistory.vslnme = companyResp.vsselDtl.vesselName;
							vesselHistory.imono = companyResp.vsselDtl.vesselImoNo;
							vesselHistory.companyimono = companyResp.vsselDtl.companyImoNo;
							vesselHistory.docexpiry = vesselHistory.CompanyDetails.docExpiry;
							vesselHistory.docissue =vesselHistory.CompanyDetails.docIssuer;
							vesselHistory.cmpnyname = vesselHistory.CompanyDetails.vesselCompanyName;
							vesselHistory.doccert = vesselHistory.CompanyDetails.docTypeNo ; //chnages +" "+companyResp.vsselDtl.docTypeNumber;
						
						$scope.vesselNameValue = 0;
						$scope.tcApprovalStatusValue=0;
						$scope.officialNoValue = 0;
						$scope.companyImoNoValue = 0;
						$scope.companyNameValue = 0;
						$scope.companyDocValue = 0;
						$scope.docExpiryValue = 0;
						$scope.docIssuerValue = 0;

						vesselStatementFactory.getVesselSearchData(vesselHistory.tempImo, sessionStorage.getItem('companyId')).$promise
								.then(function(res){
									if(res.length>0){
										vesselDtlsCheck();
									}
								});
								
						}
					}); 
				}
			});
			
		}
		
	

		vesselHistory.search = function() {
			vesselHistory.vesselNameMissFound=false;
			vesselHistory.NCUpdate=0;
			vesselHistory.MNCUpdate=0;
			vesselHistory.OBSUpdate=0;
			vesselHistory.duealert=0;

			if (vesselHistory.imo) {

				vesselHistory.tempImo = (vesselHistory.imo);

				vesselHistory.searchResult();

				sessionStorage.setItem("ImoNum", vesselHistory.imo );

				sessionStorage.setItem("VeslNme", vesselHistory.vesselname );

			} else {

				toaster.warning('Please enter Vessel  Name / IMO Number');

			}

		}

		if (sessionStorage.getItem("ImoNum")) {

			vesselHistory.tempImo = sessionStorage.getItem("ImoNum");

			vesselHistory.searchResult();

			vesselHistory.imo = sessionStorage.getItem("ImoNum");

			vesselHistory.vesselname = sessionStorage.getItem("VeslNme");

		}

		$scope.validateTypeahead = function(val, param) {

			if (param == 'IMONO' && val) {
				if (!val.vesselImoNo) {
					vesselHistory.imo = '';
				}
			}

			if (param == 'NAME' && val) {
				if (!val.vesselName) {
					vesselHistory.vesselname = '';
				}
			}

		}
		/* creating typeaheads for Imono and vesselName in update mode */
		$scope.vslImo = function(val) {
			var tempArray = [];

			if (val == '*') {
				tempArray = vesselHistory.imonum;
			} else if (val.length > 2) {

				tempArray = _.filter(vesselHistory.imonum, function(d) {
					return (d.vesselImoNo).toString().indexOf(val) > -1;
				});

			}

			return tempArray;
		}

		/* creating typeaheads for Imono and vesselName in update mode */
		$scope.vslName = function(val) {

			var tempArray = [];

			if (val == '*') {
				tempArray = vesselHistory.imonum;
			} else {

				tempArray = _.filter(vesselHistory.imonum, function(d) {
					var vesselnm = d.vesselName.toLowerCase();
					return (vesselnm).indexOf(val) > -1;
				});

			}
			return tempArray;
		}


		$scope.autoGenerate = function(val) {
			vesselHistory.vesselname = val.vesselName;
			vesselHistory.imo = val.vesselImoNo;
		}

		
		if(vesselHistory.quickSearchDataVesselImoNo){ 	
			vesselHistory.imo = vesselHistory.quickSearchDataVesselImoNo;
			vesselHistory.vesselname = vesselHistory.quickSearchDataVeslNme ? vesselHistory.quickSearchDataVeslNme.replace(/\"/g, ""):vesselHistory.vesselname;
			vesselHistory.search();
	}
		
		function vesselDtlsCheck(){
	    	
			detailsFactory.getVesselRefresh(vesselHistory.tempImo).$promise.then(function(res) {
	    			console.log(res);
	    			
	    			res[0].docExpiry = moment(new Date(res[0].docExpiry),'YYYY-MM-DD').format('YYYY-MM-DD');
	    			res[0].registrationDate = moment(new Date(res[0].registrationDate),'YYYY-MM-DD').format('YYYY-MM-DD');
	    			res[0].keelLaidDate = moment(new Date(res[0].keelLaidDate),'YYYY-MM-DD').format('YYYY-MM-DD');
	    			
	    			var count = 0, cntNull=0;
	    			vesselHistory.vesselRefreshMsg = 'Vessel Details has been Changed For ';
	    			var dynamicMsg = '';
	    			vesselHistory.LatestVesselDetailsVM = [];
	    			vesselHistory.LatestVesselDetailsVM.fromPage = 'vesselstatement'
	    			console.log(vesselHistory.vesselCompare)
	    			vesselHistory.latestVesselDetail = angular.copy(res);
    			
    				if(res[0].companyAddress === vesselHistory.vesselCompare.vesselCompany[0].vesselCompanyAddress)
   	       			 count++;
    				else{
    					if(!res[0].companyAddress)
	   	       				 cntNull++;
	   					else{
		   	       			 dynamicMsg += 'Company Address,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldAddress = vesselHistory.vesselCompare.vesselCompany[0].vesselCompanyAddress ? vesselHistory.vesselCompare.vesselCompany[0].vesselCompanyAddress : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newAddress = res[0].companyAddress ? res[0].companyAddress : '-';
	   					}
    				}
    				
    				if(res[0].customerName == vesselHistory.vesselCompare.vesselCompany[0].vesselCompanyName)
    		 			count++;
    				else{
    					if(!res[0].customerName)
	   	       				 cntNull++;
	   					else{
		   	       			 dynamicMsg += 'Company Name,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldVMcompanyName = vesselHistory.vesselCompare.vesselCompany[0].vesselCompanyName ? vesselHistory.vesselCompare.vesselCompany[0].vesselCompanyName : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newVMcompanyName = res[0].customerName ? res[0].customerName : '-';
	   					}
		   	       		
    				}
	    			
	   	       		 var vesselname = vesselHistory.vesselCompare.vsselDtl[0].vesselName;
	   	       		 if(res[0].vesselName === vesselname)
	   	       			 count++;
	   	       		 else{
		   	       		if(!res[0].vesselName)
	  	       				 cntNull++;
	  					else{
		   	       			dynamicMsg += 'Vessel Name,'
			   	       		vesselHistory.LatestVesselDetailsVM.oldVMVesselName = vesselname ? vesselname : '-';
			   	       		vesselHistory.LatestVesselDetailsVM.newVMVesselName = res[0].vesselName ? res[0].vesselName : '-';
	  					}
	   	       		 }
	   	   	       		
	   	       		var vesselTypeAud=vesselHistory.vesselCompare.vsselDtl[0].vesselType;
	   	       		if(res[0].vesselType.toUpperCase().trim() === vesselTypeAud.toUpperCase().trim())
	   	       			count++;
	   	       		else{
		   	       		if(!res[0].vesselType)
	 	       				 cntNull++;
	 					else{
		   	       			 dynamicMsg += 'Vessel Type,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldVMVesselType = vesselTypeAud ? vesselTypeAud : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newVMVesselType = res[0].vesselType ? res[0].vesselType : '-';
	 					}
	   	       		}
	   	       		if(res[0].companyIMONumber == vesselHistory.vesselCompare.vsselDtl[0].companyImoNo)
	   	       			count++;
	   	       		else{
		   	       		if(!res[0].companyIMONumber)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'Company IMO NO.,'
		   	       			 vesselHistory.LatestVesselDetailsVM.oldVMCompanyIMONo = vesselHistory.vesselCompare.vsselDtl[0].companyImoNo ? vesselHistory.vesselCompare.vsselDtl[0].companyImoNo : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newVMCompanyIMONo = res[0].companyIMONumber ? res[0].companyIMONumber : '-';
						}
	   	       		}
	   	       				 
	   	       		if(res[0].grossTon == vesselHistory.vesselCompare.vsselDtl[0].grt)
	   	       			count++;
	   	       		else{
		   	       		if(!res[0].grossTon)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'GRT,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldVMGRT = vesselHistory.vesselCompare.vsselDtl[0].grt != 0 ? vesselHistory.vesselCompare.vsselDtl[0].grt : '-';;
		   	       			 vesselHistory.LatestVesselDetailsVM.newVMGRT = res[0].grossTon ? res[0].grossTon : '-';
						}
	   	       		}
    				
    				if(res[0].homePort == vesselHistory.vesselCompare.vsselDtl[0].portOfRegistry)
    		 			count++;
    				else{
    					if(!res[0].homePort)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'Port of Registry';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldportOfRegistry = vesselHistory.vesselCompare.vsselDtl[0].portOfRegistry ? vesselHistory.vesselCompare.vsselDtl[0].portOfRegistry : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newportOfRegistry = res[0].homePort ? res[0].homePort : '-';
						}
		   	       		
    				}
    				
    				if(moment(res[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') == moment(vesselHistory.vesselCompare.vsselDtl[0].keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY'))
    		 			count++;
    				else{
    					if(!res[0].keelLaidDate)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'Keel Laid Date,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldkeelLaidDate = vesselHistory.vesselCompare.vsselDtl[0].keelLaidDate ? moment(vesselHistory.vesselCompare.vsselDtl[0].keelLaidDate,'MMM DD,YYYY').format('DD-MMM-YYYY') : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newkeelLaidDate = res[0].keelLaidDate ? moment(res[0].keelLaidDate,'YYYY-MM-DD').format('DD-MMM-YYYY') : '-';
						}
		   	       		
    				}
    				if(res[0].regOwnedImoNo == vesselHistory.vesselCompare.vsselDtl[0].regOwnedImoNo)
    		 			count++;
    				else{
    					if(!res[0].regOwnedImoNo)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'Register Owner IMO Number,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldregOwnedImoNo = vesselHistory.vesselCompare.vsselDtl[0].regOwnedImoNo ? vesselHistory.vesselCompare.vsselDtl[0].regOwnedImoNo : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newregOwnedImoNo = res[0].regOwnedImoNo ? res[0].regOwnedImoNo : '-';
						}
		   	       		
    				}
    				if(res[0].registeredCompanyName == vesselHistory.vesselCompare.vsselDtl[0].registeredCompanyName)
    		 			count++;
    				else{
    					if(!res[0].registeredCompanyName)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'Register Company Name,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldregisteredCompanyName = vesselHistory.vesselCompare.vsselDtl[0].registeredCompanyName ? vesselHistory.vesselCompare.vsselDtl[0].registeredCompanyName : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newregisteredCompanyName = res[0].registeredCompanyName ? res[0].registeredCompanyName : '-';
						}
		   	       		
    				}
    				if(res[0].registeredCompanyAddress == vesselHistory.vesselCompare.vsselDtl[0].registeredCompanyAddress)
    		 			count++;
    				else{
    					if(!res[0].registeredCompanyAddress)
		       				 cntNull++;
						else{
		   	       			 dynamicMsg += 'Register Company Address,';
		   	       			 vesselHistory.LatestVesselDetailsVM.oldregisteredCompanyAddress = vesselHistory.vesselCompare.vsselDtl[0].registeredCompanyAddress ? vesselHistory.vesselCompare.vsselDtl[0].registeredCompanyAddress : '-';
		   	       			 vesselHistory.LatestVesselDetailsVM.newregisteredCompanyAddress = res[0].registeredCompanyAddress ? res[0].registeredCompanyAddress : '-';
						}
		   	       		
    				}
    				
	   	       		console.log(count)
	   	       		if(count!=11){
	   	       			vesselHistory.vesselRefreshMsg += dynamicMsg;
	   	       			vesselHistory.LatestVesselDetailsVM.vesselRefreshMsg = vesselHistory.vesselRefreshMsg;
	   	       			updateVesselDeatils(vesselHistory.LatestVesselDetailsVM);
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
