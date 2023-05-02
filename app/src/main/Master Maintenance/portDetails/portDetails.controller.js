(function () {
	'use strict';

	angular.module('app.master.portDetails').controller(
		'PortDetailsController', PortDetailsController);

	function PortDetailsController(AppConstant, $scope, $cookies, $timeout, $compile,
		toaster, portDetailsFactory,portValues, moment, $q,
		YYYYMMDD, DDMMMYYYY, DTOptionsBuilder, DTColumnBuilder, auditFactory, blockUI,masterFactory,$filter) {

		var portDet = this;
		var companyId = sessionStorage.getItem("companyId");
		portDet.enabled = true;
		portDet.createedit = AppConstant.CREATE.toUpperCase();
		portDet.lockMessage = AppConstant.CREATE.toUpperCase();
		portDet.filteredCountry = [];
		portDet.Countries = [];

		$scope.pagination = {};
		portDet.searchData = {};
		portDet.shortingBy = '';
		portDet.shortingOrder = '';
		portDet.activeFlagtrue = 1;
		portDet.activeFlagfalse = 0;
		portDet.showBlock = false;

		portDet.activeFlag = { 1: 'Active', 0: 'InActive' };
		
		portDet.status = 1;

		portDet.pageInitialCount=1;			//added by @Ramya for Jira id - IRI-5006

		portDet.currentLimitPage = 10;
         
    	portDet.initialSelect = 1;
		
		portDet.portValues= portValues;

		portDet.clear = function () { 
			console.log("clear")
			portDet.searchCriteria = {};

			portDet.showBlock = false;

			portDet.pagination = false;
			portDet.portname='';
			
			portDet.countryName='';
			
			portDet.status='';

			portDet.pageInitialCount = 1;			//added by @Ramya for Jira id - IRI-5006
    		        
    		portDet.currentLimitPage = 10;
    		        
    		portDet.initialSelect = 1;

			$scope.pagination = {};
		}

		/** Filtering countries * */
		for (var i = 0; i < portDet.portValues.length; i++) {
			portDet.filteredCountry.push(portDet.portValues[i].countryName);
		}

		if (portDet.filteredCountry && portDet.filteredCountry.length > 0) {
			portDet.filteredCountry.forEach(function (i) {
				if (!_.contains(portDet.Countries, i)) {
					portDet.Countries.push(i);
				}
			});
		}

		/** Toaster clear * */
		portDet.toasterClear = function () {
			toaster.clear();
		}

		/** Fetching all Port details from PortFactory* */
		portDetailsFactory.getAllPort(companyId).$promise.then(function (res) {

			portDet.ports = res;
			$scope.PortTypeArray = res;
		});

		/** Create Or Update function * */
		portDet.changeCallback = function () {
			if (portDet.enabled) {

				portDet.lockMessage = AppConstant.CREATE.toUpperCase();
				portDet.createedit = AppConstant.CREATE.toUpperCase();
				portDet.fieldNull();

			} else {
				portDet.lockMessage = AppConstant.UPDATE.toUpperCase();
				portDet.createedit = AppConstant.UPDATE.toUpperCase();
				portDet.fieldNull();

			}
		};

		/** Making fields null while changing to update or create mode * */
		portDet.fieldNull = function () {

			portDet.portid = null;
			portDet.portname = null;
			portDet.dateins = null;
			portDet.status = null;
			portDet.countryName = null;
		}


		/** Search function to get Port Data's * */

		function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

			$('td', nRow).unbind('click');
			$('td', nRow).bind('click', function (event) {

				//	$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
				if (event.target.cellIndex == 0) {
					event.preventDefault();
				} else {
					//$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
				}
			});

			return nRow;
		}

		function drawCallback(settings) {

			portDet.shortingBy = settings.aLastSort[0].col;

			portDet.shortingOrder = settings.aLastSort[0].dir;

		}

		var defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 5;

		portDet.search = function (pageNo,type) {		//changed by @Ramya for Jira id - IRI-5006
			var roundedsets = null;
			var  remindersets = null;
			if($scope.pagination.current &&!($scope.pagination.current %10)){
	    		type = 'front';
	    	
	    	}
    		if(type){											//added by @Ramya for Jira id - IRI-5006
    			if(type == 'search' || type == 'start'){
    				portDet.pageInitialCount = 1;
    		        
    				portDet.currentLimitPage = 10;
    		        
    				portDet.initialSelect = 1;
    			}
    			else if(type == 'back'){
    				
    				portDet.pageInitialCount = portDet.pageInitialCount - 1;
    				portDet.initialSelect  =  portDet.initialSelect - 10;
    			}

    			else{
    				
    				portDet.pageInitialCount = portDet.pageInitialCount + 1;
    				portDet.initialSelect  =  portDet.initialSelect + 10;
    			}
    			if(type == 'end'){
    				pageNo = pageNo;
    			}else{
    			 pageNo = (portDet.pageInitialCount*10) -10 ;
    			}
    			portDet.currentLimitPage = portDet.pageInitialCount*10;
    			 
    		}
			console.log(portDet.pageInitialCount);
			var searchData = portDet.setSearchData(pageNo);

			portDet.searchData = searchData;

			$scope.pagination.current = pageNo + 1;

			portDet.total = portDet.portValues.length;

			var defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 5;

			$scope.pagination.totalItemCount = portDet.total;

			$scope.pagination.totalPages = Math.ceil(Number(portDet.total) / defaultSearchCount);
			
			if($scope.pagination.totalPages > 10){										//added by @Ramya for Jira id - IRI-5006
				roundedsets  = Math.round($scope.pagination.totalPages / 10 );    
				remindersets = ($scope.pagination.totalPages % 10 ); 
				
				if(remindersets >= 5){
					$scope.pagination.ShowPages = roundedsets+1;
				}
				else{
					$scope.pagination.ShowPages = roundedsets;
				}
				
				}else {
					roundedsets = 0;
					remindersets = $scope.pagination.totalPages;
					$scope.pagination.ShowPages = roundedsets+1;
				}
				if(portDet.currentLimitPage <= ($scope.pagination.ShowPages * 10)){
				  if(type == 'end'){
						
					  $scope.pagination.ShowPagesMin = $scope.pagination.totalPages -(remindersets);
					 $scope.pagination.ShowPagesMax = $scope.pagination.totalPages;
					}
				  else {
					  
					$scope.pagination.ShowPagesMin = portDet.initialSelect;
					$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : portDet.currentLimitPage ;
				  }
				}else {		//Changed by @Ramya for Jira id -IRI-5006
					  
					$scope.pagination.ShowPagesMin = portDet.initialSelect;
					$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : portDet.currentLimitPage ;
				  }
			   
			if($scope.pagination.totalPages == 0){
				
				$scope.pagination.current = 0;
			}
			
			$scope.pagination.last = $scope.pagination.totalPages;
	
		sessionStorage.setItem('currPageNo',$scope.pagination.current);

			portDet.getSearchResult(searchData);
		}

		portDet.getSearchResult = function (searchData) {

			portDet.showBlock = false;

			portDet.pagination = false;

			console.log(searchData)

			auditFactory.getPortSearchResult(searchData).$promise.then(function (result) {

				console.log(result)

				$timeout(function () {

					portDet.toValue = portDet.total > 0 ? portDet.searchData.pageNo : 0;

					portDet.from = portDet.total > 0 ? (portDet.searchData.pageNo + 1) : 0;

				}, 0);

				$timeout(function () {

					portDet.to = (result.length > 0) ? (portDet.toValue + result.length) : 0;

				}, 0);

				portDet.setDataTableData(result);

			});

		}

		portDet.setSearchData = function (pageNo) {

			console.log(pageNo)

			var searchBeanValues = {
				'pageNo': sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null' ? pageNo * sessionStorage.getItem('defaultSearchCount') : pageNo * 5,
				'defaultSearchCount': sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null' ? sessionStorage.getItem('defaultSearchCount') : 5,
				'portName': portDet.portname ? portDet.portname : '',	
				'countryName': portDet.countryName ? portDet.countryName : '',	
				'activeStatus': portDet.status ? 1 : 0,	
				'companyId': sessionStorage.getItem('companyId'),
				'portId' : portDet.portid ? portDet.portid : ''
			}

			console.log(searchBeanValues)

			return searchBeanValues;
		}

		portDet.report = function (values) {

			var searchData = portDet.searchData;
			
			searchData.pageNo = -5;

			auditFactory.generatePortReport(searchData, 'CENTRALPORT', 'WITHCR', values, sessionStorage.getItem('companyId')).$promise.then(function (result) {

				console.log(result)

				if (result.status == 200) {
					if (result.data.byteLength) {
						blockUI.start();

						_.downloadFiles(new Blob([result.data], { type: result.headersGetter('content-type') }), 'CENTRALPORT_WITHCR_' + values.toUpperCase() + '.xlsx');

						blockUI.stop();

					} else {
						toaster.warning('NO Records Found.');
					}
				}

			});

		}

		portDet.setDataTableData = function (data) {

			var defer = $q.defer();

			defer.resolve(data);

			portDet.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)

				.withDOM('<<"tableinside"t>>').withOption('deferRender', true)

				.withOption('rowCallback', rowCallback)

				.withOption('drawCallback', drawCallback)

				.withOption('order', [[portDet.shortingBy ? portDet.shortingBy : 0, portDet.shortingOrder ? portDet.shortingOrder : 'asc']])

				.withDisplayLength(25)

				.withOption('responsive', true)

				.withButtons(
					[
						{
							text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i> EXCEL',
							classes: '',
							key: '1',
							action: function (e, dt, node, config) {
								portDet.report('excel');
							}
						}
					])

				.withOption('createdRow', function (row, data, dataIndex) {

					$compile(angular.element(row).contents())($scope);

				});

			portDet.dtColumns = [


				DTColumnBuilder.newColumn(null).withTitle('PORT NAME').notSortable().withOption('width', '9%').renderWith(function (data) {
					if (!data) { return '-' } else {
						return data.portName;
					}
				}),

				DTColumnBuilder.newColumn(null).withTitle('COUNTRY NAME').notSortable().withOption('width', '9%').renderWith(function (data) {
					if (!data) { return '-' } else {
						return data.countryName;
					}
				}),

				DTColumnBuilder.newColumn(null).withTitle('STATUS').withOption('width', '6%').renderWith(function (data) {
					if (!data) { return '-' } else {
						return '<span><i class="fa fa-circle" ng-class="{red:' + data.activeFlag + '==' + portDet.activeFlagfalse + ',green:' + data.activeFlag + '==' + portDet.activeFlagtrue + '}" data-toggle="tooltip" data-original-title="' + portDet.activeFlag[data.activeFlag] + '" tooltip data-placement="left" ></i></span>';
					}
				})

			];

			portDet.showBlock = true;

			$timeout(function () {
				portDet.pagination = true;
			}, 0);

		}

		/** creating typeaheads for portid in update mode * */
		/*
		 * 
		 * portDet.portIdTypeahead = function(val) {
		 * 
		 * var tempArray = []; console.log(portDet.portValues)
		 * 
		 * if (val == '*') { tempArray = portDet.portValues; } else if(val.length>0) {
		 * console.log(val.length) tempArray = _.filter(portDet.portValues, function(d) {
		 * 
		 * return (d.portId).toString().indexOf(val) >-1 ; }); } return
		 * tempArray; }
		 */

		/** Automatically fetching datas for update mode from PortId * */
		/*
		 * portDet.focusSuccessive = function(val) { console.log(val)
		 * portDet.portid = val.portId; portDet.portname = val.portName;
		 * portDet.dateins = moment(val.docExpiry).format(DDMMMYYYY);
		 * console.log(val.activeFlag) if (val.activeFlag==1){ portDet.status
		 * =1; } else { portDet.status =0; }
		 * 
		 * portDet.countryName = val.countryName; }
		 */

		//added by @Ramya for Jira id - IRI-5006
    	$scope.range = function(minlen,maxlen){
    		var count = [], c=minlen-1;
    		for (var i = minlen; i <=maxlen; i++) {
    			if($scope.pagination.ShowPagesMax<$scope.pagination.totalPages){
    				count.push(i);
				}else if(c<$scope.pagination.totalPages){
					c++;
					count.push(c);
				}
    			
    		}
    		
    		return count;    		
    	}
		/** creating typeaheads for update mode from PortName * */

		portDet.portNameTypeahead = function (val) {
			var portNames = [];
			if (val == '*') {
				portNames = portDet.portValues;
			} else if (val.length > 0) {
				console.log(val);
//				portNames = _.filter(portDet.portValues, function (val) {
//					return (val.portName).toString();
//				});
//				
				/*portNames = _.filter(portDet.portValues, function(port){
    				return (port.portName).toString().indexOf(val)>-1;
    			});*/
				
				var filtered = $filter('filter')(portDet.portValues, val);
				var portNames = _.sortBy(filtered, function(s) {
					return (s.portName).toString().indexOf(val)>-1;
			     });
			}
			console.log(portNames);
			return portNames;
		}

		/** Automatically fetching datas for update mode from PortName * */
		portDet.focusSuccessive = function (val) {
			portDet.portid = val.portId;
			portDet.portname = val.portName;
			portDet.dateins = moment(val.docExpiry).format(DDMMMYYYY);
			if (val.activeFlag == 1) {
				portDet.status = 1;
			} else {
				portDet.status = 0;
			}
			portDet.countryName = val.countryName;
		}

		/** creating typeaheads for PortCountry in create mode * */
		portDet.portCountryTypeahead = function (val) {
			portDet.CountryNames = [];
			if (val == '*') {
				portDet.CountryNames = portDet.Countries;
			} else if (val.length > 0 && portDet.Countries.length > 0) {
				for (i = 0; i < portDet.Countries.length; i++) {
					portDet.CountryNames.push(portDet.Countries[i]);
				}
				var filtered = $filter('filter')( portDet.Countries, val);
				
				portDet.CountryNames = _.sortBy(filtered, function(s) {
					 
			            return (portDet.CountryNames).toString().indexOf(val)>-1;
			    });
				return portDet.CountryNames;
			}
			return portDet.CountryNames;
		}

		/** Automatically fetching form country name * */
		portDet.focusSuccessiveCountry = function (val) {
			portDet.countryName = val;
		}

		/** Not null Validation * */
		portDet.validate = function (val) {
			var flag = true;
			if (!val.portName) {
				flag = false;
				toaster.warning('Check Port Name ')
			} else if (!val.countryName) {
				flag = false;
				toaster.warning('Check Country Name ')
			}
			/*
			 * else if( val.Date == "Invalid date" || !val.Date){ flag = false;
			 * toaster.warning('Check the Date of Inspection ') }
			 */
			return flag;
		}





		/** Port Details Submit function * */
		portDet.submit = function (values) {
			var portdata = {
				"portId": portDet.portid,
				"portName": portDet.portname,
				"activeFlag": portDet.status ? 1 : 0,
				"companyId": sessionStorage.getItem('companyId'),
				"dateIns": moment(new Date()).format(YYYYMMDD),
				"userIns": sessionStorage.getItem('emailId'),
				"countryName": portDet.countryName
			};

			/** Port Details Create Operation * */
			if (portDet.respons = portDet.validate(portdata)) {
				if (portDet.createedit == AppConstant.CREATE.toUpperCase()) {
					portDetailsFactory.savePort(portDet.createedit, portdata).$promise
						.then(function (res) {
							toaster
								.success('Port Details created successfully');
							masterFactory.getPortId(sessionStorage.getItem("companyId")).$promise
							.then(function(data) {
								console.log(data);
								portDet.portValues = data;
								portDet.filteredCountry=[];
								/** Filtering countries * */
								for (var i = 0; i < portDet.portValues.length; i++) {
									portDet.filteredCountry.push(portDet.portValues[i].countryName);
								}

								if (portDet.filteredCountry && portDet.filteredCountry.length > 0) {
									portDet.filteredCountry.forEach(function (i) {
										if (!_.contains(portDet.Countries, i)) {
											portDet.Countries.push(i);
										}
									});
								}
								
							});
							
						});
				}
				/** Port Details Update Operation * */
				else {
					portDet.ports
						.forEach(function (p) {
							console.log(portDet.createedit)
							console.log(p.portId)
							if (p.portId == portdata.portId
								&& p.companyId == portdata.companyId) {
								p.activeFlag = portdata.activeFlag;
								p.companyId = portdata.companyId;
								p.portName = portdata.portName;
								p.dateIns = portdata.dateIns;
								p.userIns = portdata.userIns;
								p.countryName = portdata.countryName;
								console.log(portDet.createedit)
								portDetailsFactory.savePort(portDet.createedit,
									portdata).$promise
									.then(function (res) {
										toaster
											.success('Port Details updated successfully')
									});
							}
						});
				}
				
				return portDet.respons;
			}
		};
	}
})();