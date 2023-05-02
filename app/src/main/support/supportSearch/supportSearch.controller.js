(function() {
	'use strict';

	angular.module('app.support.supportSearch')
	.controller('supportSearchController',supportSearchController);

	function supportSearchController($state, toaster, $http, $scope, $rootScope,
			 blockUI, supportFactory, YYYYMMDD, $window,AppConstant,$q,$compile,ModalService,
			 DTColumnBuilder,DTOptionsBuilder ,$timeout,MMMDDYYYY) {

		var supSearch = this;

		supSearch.back = back;

		$scope.pagination = {};

		supSearch.displayName = '';
        
		supSearch.search = search;
		
        supSearch.showBlock = false;
        
		supSearch.setDataTableDataRmiAudit  = setDataTableDataRmiAudit;
		supSearch.setingDataRmiAudit=setingDataRmiAudit;

		supSearch.clear             = clear;
		
	

		supSearch.auditType = [{'tableId':1001 ,'tableDesc':'RMI_AUDIT'},{'tableId':1002 ,'tableDesc':'RMI_AUDIT_CERTIFICATE'},{'tableId':1003 ,'tableDesc':'RMI_AUDIT_CERT_ENDORSEMENTS'} ];


		supSearch.supSearchCriteria = {
				auditTypeId    : ''   			
		};

		

		function back() {
			$state.go('app.support', {}, {
				reload : true
			});
		}

	 


		function search(pageNo){
			
			supSearch.showBlock = false;

			supSearch.pagination = false;
			
			var tableName=supSearch.supSearchCriteria.tableId==1001?'RMI_AUDIT':  supSearch.supSearchCriteria.tableId==1002 ? 'RMI_AUDIT_CERTIFICATE' :'RMI_AUDIT_CERT_ENDORSEMENTS';
			if(!supSearch.supSearchCriteria.tableId){toaster.warning('Please Select the Table which you want see RMI Data');}else{
			
			supportFactory.getRmiData(tableName,'nothing').$promise.then(function(res){
		    	console.log(res); 
		    	
		    	supSearch.setingDataRmiAudit(res);
		    	
		    	
			});
			}


		}

		function setingDataRmiAudit(res){


			$timeout(function() {
				//support.total = res ? res.length: 0;

			},0);
			/*$timeout(function() {

				supSearch.total = res ? res.length: 0;

			},0);*/

			var defaultSearchCount = 0;

			var resLength = res ? res.length :0;

			$scope.pagination.totalItemCount = resLength;

			$scope.pagination.totalPages = Math.ceil(Number(resLength) / defaultSearchCount);    

			if($scope.pagination.totalPages == 0){

				$scope.pagination.current = 0;
			}

			$scope.pagination.last = $scope.pagination.totalPages;

			$timeout(function() {

				supSearch.toValue = supSearch.total > 0 ?supSearch.searchData.pageNo : 0;

				supSearch.from = supSearch.total > 0 ?  (supSearch.searchData.pageNo+1) : 0;

			},0);

			$timeout(function() {

				supSearch.to = (res.length > 0) ? (supSearch.toValue + res.length) : 0 ;

			},0);
console.log(res);
			if(res && res.RMI_AUDIT){
			supSearch.setDataTableDataRmiAudit(res.RMI_AUDIT);
			}else if(res && res.RMI_AUDIT_CERTIFICATE){
				
				supSearch.setDataTableRmiCertificate(res.RMI_AUDIT_CERTIFICATE);
			}else if(res && res.RMI_AUDIT_CERT_ENDORSEMENTS){
				
				supSearch.setDataTableRmiCertEndo(res.RMI_AUDIT_CERT_ENDORSEMENTS);
			}
			
		}
		
		supSearch.setDataTableRmiCertEndo = function(data){

			var defer = $q.defer();

			defer.resolve(data);  

			supSearch.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)

			.withDOM('<<"tableinside"t>>').withOption('deferRender', true)

			.withDisplayLength(25)

			.withOption('responsive', true)

			.withOption('createdRow', function (row, data, dataIndex) {

				$compile(angular.element(row).contents())($scope);

			});
// missing columns certificateURL
			supSearch.dtColumns = [

				

				DTColumnBuilder.newColumn('certificateID').withTitle('Certificate ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('endorsementID').withTitle('Endorsed ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				

				
				DTColumnBuilder.newColumn('endorsementDate').withTitle('Endorsed Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),
				
			

				DTColumnBuilder.newColumn('endorsementReason').withTitle('Endorsed Reason').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('endorsedBy').withTitle('Endorsed By').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				
				DTColumnBuilder.newColumn('creationDate').withTitle('Creation Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),
				
				DTColumnBuilder.newColumn('lastUpdateDate').withTitle('Last Updated Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),
				
				DTColumnBuilder.newColumn('lastUpdatedBy').withTitle('Last Updated By').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('vesselId').withTitle('Vessel ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('vesselName').withTitle('Vessel Name').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				
				DTColumnBuilder.newColumn('extendDate').withTitle('Extend Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}})
				];

			supSearch.showBlock = true;

			$timeout(function() {
				supSearch.pagination=true;
			},0);

		}

		supSearch.setDataTableRmiCertificate = function(data){

			var defer = $q.defer();

			defer.resolve(data);  

			supSearch.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)

			.withDOM('<<"tableinside"t>>').withOption('deferRender', true)

			.withDisplayLength(25)

			.withOption('responsive', true)

			.withOption('createdRow', function (row, data, dataIndex) {

				$compile(angular.element(row).contents())($scope);

			});
// missing columns certificateURL
			supSearch.dtColumns = [

				

				DTColumnBuilder.newColumn('certificateID').withTitle('Certificate ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('certificateNumber').withTitle('Certificate Number').withOption('width', '7%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('uniqueTrackingNumber').withTitle('Unique Tracking Number').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				

				DTColumnBuilder.newColumn('certificateIssueType').withTitle('Certificate Issue Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('certificateReasons').withTitle('Certificate Reason').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				
				DTColumnBuilder.newColumn('issueDate').withTitle('Certificate Issue Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),
				
				DTColumnBuilder.newColumn('expirationDate').withTitle('Certificate Expiry Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),

				DTColumnBuilder.newColumn('issuedBy').withTitle('Certificate Issued By').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('certificateStatus').withTitle('Certificate Status').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				
				DTColumnBuilder.newColumn('vesselName').withTitle('Vessel Name').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('vesselID').withTitle('Vessel ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('vesselUK').withTitle('Vessel UK').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('vesselPK').withTitle('Vessel PK').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				

				DTColumnBuilder.newColumn('vesselIMONumber').withTitle('Vessel IMO Number').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('grossTonnage').withTitle('GRT').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('classSociety').withTitle('Class Society ').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('officialNumber').withTitle('Official Number').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				
				
				DTColumnBuilder.newColumn('callSign').withTitle('Call Sign').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('docTypeNumber').withTitle('Doc Type Number').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('companyIMONumber').withTitle('Company IMO Number').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('docType').withTitle('Doc Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				
				DTColumnBuilder.newColumn('docIssuer').withTitle('Doc Issuer').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				
				DTColumnBuilder.newColumn('docExpiry').withTitle('Doc Expiry').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('creationDate').withTitle('Creation Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('createdBy').withTitle('Created BY').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('lastUpdateDate').withTitle('Last Updated Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),
				
				DTColumnBuilder.newColumn('lastUpdatedBy').withTitle('Last Updated By').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),
				DTColumnBuilder.newColumn('extendDate').withTitle('Extend Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),
				
				DTColumnBuilder.newColumn('certificateURL').withTitle('Certificate URL').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}})
				];

			supSearch.showBlock = true;

			$timeout(function() {
				supSearch.pagination=true;
			},0);

		}


		function setDataTableDataRmiAudit(data){

			var defer = $q.defer();

			defer.resolve(data);  

			supSearch.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)

			.withDOM('<<"tableinside"t>>').withOption('deferRender', true)

			.withDisplayLength(25)

			.withOption('responsive', true)

			.withOption('createdRow', function (row, data, dataIndex) {

				$compile(angular.element(row).contents())($scope);

			});

			supSearch.dtColumns = [

				

				DTColumnBuilder.newColumn('auditType').withTitle('Audit Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('auditSubType').withTitle('Audit Sub Type').withOption('width', '7%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('auditStatus').withTitle('Audit Status').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				

				DTColumnBuilder.newColumn('auditSubType').withTitle('Audit Sub Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('lastUpdatedBy').withTitle('Last Updated By').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('creationDate').withTitle('Audit Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}}),

				DTColumnBuilder.newColumn('vesselId').withTitle('Vessel ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return data;
				}}),

				DTColumnBuilder.newColumn('lastUpdateDate').withTitle('Last Updated Date').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
					return (data?moment(new Date(data),YYYYMMDD).format(MMMDDYYYY):'--');
				}})

				

				];

			supSearch.showBlock = true;

			$timeout(function() {
				supSearch.pagination=true;
			},0);

		}

		

		function clear(){

			supSearch.supportCriteria = {}; 
			supSearch.supSearchCriteria.tableId ='';
			supSearch.showBlock = false;

			supSearch.pagination = false;
		}
		
		
		}


		

})();