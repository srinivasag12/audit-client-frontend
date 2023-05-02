(function() {
	'use strict';

	angular.module('app.support')
	.controller('supportController',supportController);

	function supportController($state, toaster, $http, $scope, $rootScope,
			$cookies, blockUI, supportFactory, YYYYMMDD, $window,AppConstant,$q,$compile,ModalService,
			detailsFactory, searchRequiredData, DTColumnBuilder,DTOptionsBuilder ,$timeout,MMMDDYYYY) {

		var support = this;

		support.back = back;

		$scope.pagination = {};

		support.displayName = '';

		support.AppConstant = AppConstant;

		support.loginUserId = sessionStorage.getItem('userRoleId');

		support.vesselData        = searchRequiredData[0];

		support.allAuditSubTypes  = searchRequiredData[5];

		support.LatestAuditData   = searchRequiredData[7];

		support.auditorsDetail   = searchRequiredData[6];

		support.setVessel         = setVessel;

		support.getAuditData      = getAuditData;

		support.search = search;

		support.getSupportSearchData = getSupportSearchData;

		support.showBlock = false;

		support.setDataTableData  = setDataTableData;

		support.clear             = clear;
		
		support.viewRmiData      = viewRmiData;

		support.supportUpload = supportUpload;

		support.downloadAttach = downloadAttach;
		
		support.getReterviedAuditData = getReterviedAuditData;

		support.tmpArray 			= [];

		$scope.selectedAuditSeq 	= [];

		support.auditType = searchRequiredData[1].filter(function (obj){
			return (obj.auditTypeId != support.AppConstant.SSP_TYPE_ID)
		});

		support.supportCriteria = {
				auditTypeId    : '',
				auditSubTypeId : '',
				vesselImoNo    : '',
				officialNo	   : '',
				auditorName    : '',
				companyId 	   : sessionStorage.getItem('companyId'),
				emailId        : sessionStorage.getItem('emailId')    			
		};

		support.details = {
				fileName : '',
				fileByte : '',
				roleId : '',
				userIns : '',
				dateIns : '',
				auditSeqNo : ''
		};

		function back() {
			$state.go('app.dashboard', {}, {
				reload : true
			});
		}

		function getAuditData(auditTypeId){

			support.audsubtype = support.allAuditSubTypes.filter(function( obj ) {

				return obj.auditTypeId == auditTypeId;
			});

		} 

		function getSupportSearchData(pageNo){

			console.log(support.supportCriteria.auditorName)

			var supportSearchBeanValues={

				'auditTypeId' : support.supportCriteria.auditTypeId ? support.supportCriteria.auditTypeId : null,

						'auditSubTypeId' : support.supportCriteria.auditSubTypeId ? support.supportCriteria.auditSubTypeId : null,

								'vesselImoNo' : support.supportCriteria.vesselImoNo ? support.supportCriteria.vesselImoNo.vesselImoNo : null,

										'pageNo' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null'? pageNo*sessionStorage.getItem('defaultSearchCount') : pageNo*5,

												'officialNo':	 support.supportCriteria.officialNo ? support.supportCriteria.officialNo : null,

														'auditorUserId' : support.supportCriteria.auditorName ? support.supportCriteria.auditorName.emailId : null,

																'companyId' : sessionStorage.getItem('companyId'),

																"emailId" : sessionStorage.getItem('emailId')
			};

			return supportSearchBeanValues;
		}

		function search(pageNo){

			support.showBlock = false;

			support.pagination = false;

			var getSupportSearchBeanVal = support.getSupportSearchData(pageNo);

			support.searchData = getSupportSearchBeanVal;

			$scope.pagination.current = pageNo+1;

			if (support.loginUserId != support.AppConstant.DEMO_ROLE_ID){

				supportFactory.getSupportSearchResult(getSupportSearchBeanVal).$promise.then(function(res){

					setingData(res);

				});

			}else{

				supportFactory.getUploadedSearchResult(getSupportSearchBeanVal).$promise.then(function(res){

					setingData(res);

				});

			}

			sessionStorage.setItem('supportCurrPageNo',$scope.pagination.current);
		}


		function setingData(res){

			$timeout(function() {

				support.total = res ? res.length: 0;

			},0);

			var defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 5;

			var resLength = res ? res.length :0;

			$scope.pagination.totalItemCount = resLength;

			$scope.pagination.totalPages = Math.ceil(Number(resLength) / defaultSearchCount);    

			if($scope.pagination.totalPages == 0){

				$scope.pagination.current = 0;
			}

			$scope.pagination.last = $scope.pagination.totalPages;

			$timeout(function() {

				support.toValue = support.total > 0 ?  support.searchData.pageNo : 0;

				support.from = support.total > 0 ?  (support.searchData.pageNo+1) : 0;

			},0);

			$timeout(function() {

				support.to = (res.length > 0) ? (support.toValue + res.length) : 0 ;

			},0);

			support.setDataTableData(res);

		}



		function setDataTableData(data){

			var defer = $q.defer();

			defer.resolve(data);  

			support.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)

			.withDOM('<<"tableinside"t>>').withOption('deferRender', true)

			.withDisplayLength(25)

			.withOption('responsive', true)

			.withOption('createdRow', function (row, data, dataIndex) {

				$compile(angular.element(row).contents())($scope);

			});

			support.dtColumns = [

				(support.loginUserId == support.AppConstant.DEMO_ROLE_ID) ? DTColumnBuilder.newColumn(null).withTitle('View').withOption('width', '5%').renderWith(function(data){if(!data){return ''}else{
					return '<div><label ng-click=support.getReterviedAuditData('+data.auditSeqNo+','+'"'+data.audTypeDesc+'"'+','+'"'+data.audSubTypeDesc+'"'+','+data.companyId+')> <i class="fa fa-eye" style="font-size:24px" aria-hidden="true" title="View"></i> </label></div>'
					auditSeqNo,auditType,auditSubType,companyId
				}})  :  DTColumnBuilder.newColumn('').withTitle('').withOption('width', '1%').renderWith(function(data){if(!data){return ''}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('vesselImoNo').withTitle('Vessel IMO No').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('vesselName').withTitle('Vessel Name').withOption('width', '7%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('officialNo').withTitle('Official No.').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('audTypeDesc').withTitle('Audit Type').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('audSubTypeDesc').withTitle('Audit Sub Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('companyImoNo').withTitle('Company Imo No').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('auditDate').withTitle('Audit Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),

				DTColumnBuilder.newColumn('audCertIssueDesc').withTitle('Ceritificate Issue Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('certificateNo').withTitle('Certificate No').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				(support.loginUserId == support.AppConstant.DEMO_ROLE_ID) ? DTColumnBuilder.newColumn('leadName').withTitle('Lead Name').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}) : DTColumnBuilder.newColumn('').withTitle('').withOption('width', '0.1%').renderWith(function(data){if(!data){return ''}else{
					return data;
				}}) ,

				DTColumnBuilder.newColumn(null).withTitle(support.loginUserId != support.AppConstant.DEMO_ROLE_ID ? "Laptop Audit Attach" : "Download").notSortable().withOption('width', '8%').renderWith(function(data) {

					if(support.loginUserId != support.AppConstant.DEMO_ROLE_ID){

						return '<div><label ng-click=support.supportUpload('+data.auditSeqNo+','+data.vesselImoNo+','+data.auditTypeId+','+data.auditSubTypeId+','+data.companyId+','+data.officialNo+','+data.companyImoNo+','+'"'+data.audTypeDesc+'"'+','+'"'+data.audSubTypeDesc+'"'+')> <i class="fa fa-paperclip" style="font-size:24px"  aria-hidden="true" title="proceed for support attach"></i> </label></div>'
					}else{
						return '<div><label ng-click=support.downloadAttach('+data.auditSeqNo+','+data.vesselImoNo+','+data.auditTypeId+','+data.auditSubTypeId+','+data.companyId+')> <i class="fa fa-download" style="font-size:24px"  aria-hidden="true" title="Attachments"></i> </label></div>'
					}
				}),

				];

			support.showBlock = true;

			$timeout(function() {
				support.pagination=true;
			},0);

		}

		function setVessel(item){

			support.supportCriteria.vesselImoNo = {'vesselImoNo':item.vesselImoNo};

			support.supportCriteria.vesselName = {'vesselName':item.vesselName};

		}

		function clear(){

			support.supportCriteria = {}; 

			support.showBlock = false;

			support.pagination = false;
		}
		
		function viewRmiData() {
			$state.go('app.support.supportSearch', {}, {
				reload : true
			});
		}
		
		

		function supportUpload(auditSeqNo,vesselImoNo,auditTypeId,auditSubTypeId,companyId,officialNo,companyImoNo,auditTypeDesc,auditSubTypeDesc){
			
			ModalService.showModal({

				templateUrl : 'src/modals/supportAttachment.html',

				controller  : 'supportAttachementController as supAta',

				inputs : {

					data :  {
						'auditSeqNo' : auditSeqNo,
						'vesselImoNo' : vesselImoNo,
						'auditTypeId' : auditTypeId,
						'auditSubTypeId' : auditSubTypeId,
						'companyId' :companyId,
						'officialNo' : officialNo,
						'audTypeDesc' : auditTypeDesc,
						'audSubTypeDesc' : auditSubTypeDesc,
						'companyImoNo' : companyImoNo,
						'path' : 'C:\\Program Files\\ShipboardApplication\\Shipboard\\code\\BackUp\\AuditDetails\\'+auditTypeDesc,
						'fileName' : auditSeqNo+'.zip',
						'disableDisplay' : true
					}

				}

			}).then(function(modal) {

				modal.element.modal();

				modal.close.then(function(result) {

					if (result == 'OK') {
						console.log(result);

					}else if (result == 'No' || result == 'cancel') {
						console.log(result);

					}

				});

			});
		}


		function downloadAttach(auditSeqNo,vesselImoNo,auditTypeId,auditSubTypeId,companyId){

			supportFactory.downloadSupportAttach(auditSeqNo,vesselImoNo,auditTypeId,auditSubTypeId,companyId).$promise.then(function(res){

				if (res.status == 200 && !res.error && res.data.byteLength != 0) {

					_.downloadFiles(new Blob([ res.data ], {
						type : 'Content-Type'
					}), auditSeqNo+'.zip');

					toaster.success('File downloaded successfully');

				}else{
					toaster.warning('No file is present to download');
				}

			});

		}
		
		function getReterviedAuditData(auditSeqNo,auditType,auditSubType,companyId){
			
			
			supportFactory.getReterivedAuditData(auditSeqNo,auditType,auditSubType,companyId).$promise.then(function(res){
								
				if(res){
					
					ModalService.showModal({

						templateUrl : 'src/modals/supportAttachment.html',

						controller  : 'supportAttachementController as supAta',

						inputs : {
							data :  res
						}

					}).then(function(modal) {

						modal.element.modal();
						modal.close.then(function(result) {

							if (result == 'OK') {
								console.log(result);

							}else if (result == 'No' || result == 'cancel') {
								console.log(result);

							}

						});

					});
				}
			});
			
		}
	}

})();