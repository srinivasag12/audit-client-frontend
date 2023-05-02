
(function (){
    'use strict';
   
    angular
        .module('app.userSearch')        
        .controller('UserSearchController', UserSearchController); 
    function UserSearchController($state,$compile,$cookies,$scope,userFactory,userSearchFactory,$q,DTOptionsBuilder,DTColumnBuilder,$timeout,searchRequiredData,$filter,AppConstant){
    	
     	var userSearch=this; console.log(userSearch);
    	
    	var companyId = sessionStorage.getItem("companyId");
    	
    	userSearch.AppConstant = angular.copy(AppConstant);
    	
    	userSearch.dtInstance = {};
    	userSearch.auditorsDetail = searchRequiredData[0];
    	userSearch.searchCriteria = {
    			'companyId' : '',
    			
    			'pageNo' : '',
    			'auditorUserId' : '',		
    			'auditorRoleId' : '',
    					
    			'region':''
    	};

    	
    	userSearch.userRoleId = sessionStorage.getItem("userRoleId") ? sessionStorage.getItem("userRoleId"):'';
    	
    	$scope.pagination = {};
    	
    	userSearch.searchData = {};
    	
    	userSearch.showBlock = false;
    	
    	userSearch.shortingBy = '';
        
    	userSearch.shortingOrder = '';
    	
    	userSearch.activestatustrue = 1;
    	
    	userSearch.activestatusfalse= 0;
    	
    	
    	
    	
    	userSearch.activestatus = { 1:'Active',0:'InActive'};
    	
    	userFactory.getManagerRegion(companyId).$promise.then(function(res) {
    		
    		userSearch.regionArray=res;
		});
    	
    	
function drawCallback(settings){
    		
	userSearch.shortingBy = settings.aLastSort[0].col;
            
	userSearch.shortingOrder = settings.aLastSort[0].dir;
    	    
        }
    
userSearch.auditorRoles = [{roleId:'1001' , roleDesc:'AUDITOR'},{roleId:'1004' , roleDesc:'OBSERVER'},{roleId:'1003' , roleDesc:'MANAGER'}];

if(userSearch.userRoleId==userSearch.AppConstant.IHM_MANAGER_ROLE_ID){ userSearch.userRegion=2;
userSearch.auditorRoles = [{roleId:'1001' , roleDesc:'REVIEWER'},{roleId:'1003' , roleDesc:'MANAGER'}];

	userSearch.userQualifiedValues = [{roleId:'1006' , roleDesc:'IHM'},{roleId:'1007' , roleDesc:'PLAN APPROVAL'}]; //Added by sudharsan for Jira-ID=IRI-5502
	userSearch.auditorsDetail = userSearch.auditorsDetail.filter(function( obj ) {
		return (obj.ihmreview==1);
	});	
 }else{
	 userSearch.auditorsDetail = userSearch.auditorsDetail.filter(function( obj ) { console.log(obj);
			return (obj.ismreview==1 || obj.ispsReview==1 || obj.mlcreview==1);
		});	
	 
userSearch.userQualifiedValues = [{roleId:'1001' , roleDesc:'ISM'},{roleId:'1002' , roleDesc:'ISPS'},{roleId:'1003' , roleDesc:'MLC'},
								  {roleId:'1004' , roleDesc:'SSP'},{roleId:'1005' , roleDesc:'DMLC II'},{roleId:'1006' , roleDesc:'IHM'},
								  {roleId:'1013' , roleDesc:'PLAN APPROVAL'}];
								//   {roleId:'1007' , roleDesc:'SOPEP'},{roleId:'1008' , roleDesc:'STS'},{roleId:'1009' , roleDesc:'SMPEP'}, //commented by sudharsan for merging different typeid to as one
								//   {roleId:'1010' , roleDesc:'BWS'},{roleId:'1011' , roleDesc:'VOC'},{roleId:'1012' , roleDesc:'SDR'},{roleId:'1013' , roleDesc:'COW'}]; //Added by sudharsan for Jira-ID=IRI-5502
}  

 
search.validateVessel = function(val,param){
	
	if(param=='AUDITORNAME' && val){
		if(!userSearch.searchCriteria.auditorName.emailId){
			search.searchCriteria.auditorName = '';
		}
	}
	
}




userSearch.setSearchData = function(pageNo){

	var searchBeanValues={
			
			'companyId' : sessionStorage.getItem('companyId'),
			
			'firstName' : userSearch.searchCriteria.auditorName?userSearch.searchCriteria.auditorName.firstName : null,
					
			'lastName' : userSearch.searchCriteria.auditorName?userSearch.searchCriteria.auditorName.lastName : null,
			
			'auditorUserId' : userSearch.searchCriteria.auditorName?userSearch.searchCriteria.auditorName.emailId : null,
					
			'auditorRoleId' : userSearch.searchCriteria.auditorRole ? userSearch.searchCriteria.auditorRole : null,
					
			'region':userSearch.userRegion ? userSearch.userRegion : null,
					
			'pageNo' :  sessionStorage.getItem('defaultSearchCount') != null ? pageNo*sessionStorage.getItem('defaultSearchCount') : pageNo*5,
					
			'shortingBy' : userSearch.shortingBy ? userSearch.searchDataTableIndexAndName[userSearch.shortingBy] : null,
		                    
		     'shortingOrder' :  userSearch.shortingOrder ? userSearch.shortingOrder : null,
		    		 
		     'userQualified':   userSearch.searchCriteria.userQualified==1001 ? "ismQualified" :  userSearch.searchCriteria.userQualified==1002 ? "ispsQualified" :	 userSearch.searchCriteria.userQualified==1003 ? "mlcQualified"  : userSearch.searchCriteria.userQualified==1004 ? "ihmQualified" :'', 
		        			
			'roleId': userSearch.userRoleId ? 	userSearch.userRoleId  : '',	
			/*'shortingBy' : search.shortingBy ? search.searchDataTableIndexAndName[search.shortingBy] : null,
            
        	'shortingOrder' :  search.shortingOrder ? search.shortingOrder : null,*/
        			
        	
					
		}
	
	
	
	return searchBeanValues;
	
}
        
    	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function(event) {
            	
            	//	$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
            	if(event.target.cellIndex == 0)
            		{
            			event.preventDefault();
            		}else{
            			//$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
            		}
            });
            
            return nRow;
        }
    	$scope.range = function(len){
    		
    		var count = [];
    		
    		for (var i = 1; i <= len; i++) {
    			
    			count.push(i);
    			
    		}
    		
    		return count;    		
    	}
    	userSearch.back = function(){
    		
    		$state.go('app.dashboard',{},{reload:true});
    		
    	}
    	
    	
    	userSearch.clear = function(){
    		
    		userSearch.searchCriteria = {};	
    		

    		$timeout(function() {
    			
    		if(userSearch.userRoleId==userSearch.AppConstant.IHM_MANAGER_ROLE_ID){ 
    			userSearch.userRegion=2;
    		}
    		},10);
    		
    		userSearch.showBlock = false;
    		
    		userSearch.pagination = false;
    		
    		userSearch.userRegion=null;
    		    		
    	}
    	
    	var defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 5;
    		
    	
userSearch.search = function(pageNo){
	
	
	var searchData = userSearch.setSearchData(pageNo);
	
	userSearch.searchData = searchData;
	$scope.pagination.current = pageNo+1;
console.log(searchData);
	userSearchFactory.getRegionalUsers(searchData).$promise.then(function(res) {
	
		console.log(res);
		var array = JSON.parse("[" + res.data + "]");
		
		
		$timeout(function() {
			
			userSearch.total = array[0].length ? array[0].length: 0;
			
			
			
		},0);
		
		
		$scope.pagination.totalItemCount = array[0].length;
	
		$scope.pagination.totalPages = Math.ceil(Number(array[0].length) / defaultSearchCount);    
		
		if($scope.pagination.totalPages == 0){
			
			$scope.pagination.current = 0;
		}
	
		$scope.pagination.last = $scope.pagination.totalPages;
		
	});
	
	sessionStorage.setItem('currPageNo',$scope.pagination.current);
	
	
	userSearch.getSearchResult(searchData);
}





userSearch.getSearchResult = function(searchData){
	
	userSearch.showBlock = false;
	
	userSearch.pagination = false;
	
	userSearchFactory.getRegionalUsers(searchData).$promise.then(function(result) {
		
	console.log(result);
			
			var results = JSON.parse("[" + result.data + "]");
			
			
			
			
			
			var result=[];
			
			var index = 0;
			var startRecord = userSearch.searchData.pageNo;
			var endRecord = startRecord + defaultSearchCount;
			
			if(startRecord<0){
				
				results[0]=results[0];
			}
			
			/*for(AuditDetailView av : serachList){
				if(index >= startRecord && index < endRecord){
					resSerachList.add(av);
				}
				index++;
			}*/	
			results=results[0];
			angular.forEach(results, function(val,index) {
				if(index >= startRecord && index < endRecord){
					result.push(results[index]);
				}
				index++;
				
			});
			
			
			console.log(startRecord);
			console.log(endRecord);
			console.log(result);
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			$timeout(function() {
				
				userSearch.toValue = userSearch.total>0 ?  userSearch.searchData.pageNo : 0;
				
				userSearch.from = userSearch.total>0 ?  (userSearch.searchData.pageNo+1) : 0;
				
			
				
 		},0);
			
			
			
		
			$timeout(function() {
				
				
				userSearch.to = (result.length>0) ? (userSearch.toValue + result.length) : 0 ;
				console.log(userSearch.to);
			},0);
		
			
	
			userSearch.setDataTableData(result);
			
     
		
	});
	
}
   
userSearch.setDataTableData = function(data){
	
	//data=data[0];
    var defer = $q.defer();
	
	defer.resolve(data);  
	
	if(data && data.length>0 && userSearch.userRoleId==1006)
	 data= _.filter(data, function(d) {  
       if(d.roles && d.roles[0] && (d.roles[0].roleDesc=='Auditor' || d.roles[0].roleDesc=='OBSERVER' || d.roles[0].roleDesc=='Observer' ) ){
		d.roles[0].roleDesc="REVIEWER";
	    }
			return d;
		});
	
	userSearch.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)
	
	.withDOM('<<"tableinside"t>>').withOption('deferRender', true)
	
    .withOption('rowCallback', rowCallback)
    
    .withOption('drawCallback', drawCallback)
    
   .withOption('order', [[userSearch.shortingBy?userSearch.shortingBy:0, userSearch.shortingOrder?userSearch.shortingOrder:'asc']])//.newOptions()
    
    .withDisplayLength(25)
    
    .withOption('responsive', true)
    
     .withOption('createdRow', function (row, data, dataIndex) {
    	
    	$compile(angular.element(row).contents())($scope);
    	
    });
	
	userSearch.dtColumns = [
	                  
	                    
	                    DTColumnBuilder.newColumn(null).withTitle('USER NAME').notSortable().withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
                            return data.firstName.toUpperCase() +" "+data.lastName.toUpperCase();}}),
	                    
	                    DTColumnBuilder.newColumn('emailId').withTitle('USER ID').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
                			 return data;}}),
	                    
	                    DTColumnBuilder.newColumn('phoneNo').withTitle('CONTACT').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
	               			 return data;}}),
	                      
	                    DTColumnBuilder.newColumn('roles[0].roleDesc.toUpperCase()').withTitle('ROLES').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
               		
	                    	return data;}}),
    	              
	                   
	                    
	                    DTColumnBuilder.newColumn(null).withTitle('ACTIVE STATUS').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
                			return '<span><i class="fa fa-circle" ng-class="{red:'+data.activeStatus+'=='+userSearch.activestatusfalse+',green:'+data.activeStatus+'=='+userSearch.activestatustrue+'}" data-toggle="tooltip" data-original-title="'+userSearch.activestatus[data.activeStatus]+'" tooltip data-placement="left" ></i></span>';
	                    }})
	                    
                	];	 
	
	userSearch.showBlock = true;
	
	
	$timeout(function() {
		userSearch.pagination=true;
	},0);
	
	

	
}


    }
    
     
    
})();