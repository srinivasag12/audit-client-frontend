/**
 * @package app\src\main\audit\search
 *
 */

/**
 * @author sourav ghadai,
 *
 */

(function (){
    'use strict';

    angular
        .module('app.audit.search')        
        .controller('SearchController', SearchController); 
    
    function SearchController(blockUI,searchRequiredData,$cookies,$compile,$state,auditFactory,$scope,DTOptionsBuilder,DTColumnBuilder,$q,$http,$timeout,toaster,ModalService,AppConstant,auditType,YYYYMMDD,MMMDDYYYY,masterFactory){
    	    
    	var search = this; 
    	search.audtypePlanApprovsl = [];
    	
    	search.AppConstant = AppConstant;
    	
    	search.vesselData = searchRequiredData[0];
    
    	search.audtype = searchRequiredData[1];
    	
    	search.vesselCompanydata = searchRequiredData[2];
    	
    	search.certificateNos =searchRequiredData[3];
    	
    	search.letterNos =searchRequiredData[3];
    	
    	search.loginUserDetails = sessionStorage.getItem('loginUserDetails');
    	
    	search.userId = sessionStorage.getItem('userSequenceNo');
    	
    	search.allAuditStatus =searchRequiredData[4];
    	
    	search.latestCreatedImo=searchRequiredData[7];
    	
    	search.userRoleId = sessionStorage.getItem('userRoleId') ? sessionStorage.getItem('userRoleId') :'';
    	
    	search.pageInitialCount = 1;
         
    	search.currentLimitPage = 10;
         
    	search.initialSelect = 1;
    	
    	search.checkScope = [{
         	'scopeId':1000,
         	'scopeName':'Full Scope'
         },
         {
         	'scopeId':1001,
         	'scopeName':'Half Scope'
         }];
    	 
    	search.certType = "Certificate";
    	
    	search.audstatus = search.allAuditStatus.filter(function( obj ) {
    		
    		if(sessionStorage.getItem('userRoleId') == search.AppConstant.IHM_MANAGER_ROLE_ID){ 
    			return obj.auditTypeId == search.AppConstant.ISM_TYPE_ID && obj.auditStatusId != search.AppConstant.CLOSED_AUDIT_STATUS  && obj.auditStatusId != search.AppConstant.REOPEN;
		}else if(sessionStorage.getItem('userRoleId') != search.AppConstant.ADMIN_ROLE_ID && sessionStorage.getItem('userRoleId') != 1003){
    			return obj.auditTypeId == search.AppConstant.ISM_TYPE_ID && obj.auditStatusId != search.AppConstant.CLOSED_AUDIT_STATUS;
    		}else{
    			return obj.auditTypeId == search.AppConstant.ISM_TYPE_ID && obj.auditStatusId != search.AppConstant.CLOSED_AUDIT_STATUS;
    		}
    	});
    	
    	search.allAuditSubTypes =searchRequiredData[5];
    	
    	search.auditorsDetail =searchRequiredData[6];
    	
    	search.auditorsDetail.forEach(function(a){
			delete a.signature;
			delete a.roles;
		}); 
    	
    	search.vesselData.forEach(function(a){ 
  		  a.officialNo  = a.officialNo.toString();
      	});
    	
    	search.dtInstance = {};
    	    	
    	search.audsubtype = [];
    	   	
    	$scope.pagination = {};
    	
    	search.searchData = {};
    	
    	search.showBlock = false;
    	
    	search.searchCriteria = {
    			vesselImoNo : '',
    			companyImoNo : '',
    			certIssuedDate : '',
    			certExpiryDate : '',
    			certificateNo : '',
    			auditTypeId : '',
    			auditSubTypeId : '',
    			auditStatusId:'',
    			auditorName:'',
    			auditorRole:'',
    			letterNo : '',
    	};
    	
    	search.shortingBy = '';
        
    	search.shortingOrder = '';
    	
    	search.searchDataTableIndexAndName = { 1 : 'vesselImoNo',
    										   3 : 'companyImoNo',
    									       4 : 'certIssueDate',
    									       5 : 'certExpireDate',
    									       6 : 'certificateNo',
    									       7 : 'letterNo'};
    	
    	search.reviewIdAndDesc = { 1:'INITIATED',2:'ACCEPTED',3:'REJECTED',4:'VOID',0:'NOT INITIATED' };
    	
    	search.IhmreviewIdAndDesc = { 1:'INITIATED',2:'COMPLETED',4:'VOID',0:'NOT INITIATED'};
    	
    	search.auditorRoles = [{roleId:'1001' , roleDesc:'AUDITOR'},{roleId:'1004' , roleDesc:'INSPECTOR'},{roleId:'1002' , roleDesc:'OBSERVER'},{roleId:'1003' , roleDesc:'REVIEWER'}];
    	
    	search.userRoleId = sessionStorage.getItem('userRoleId');
    	
    	search.quickSearchDataVesselImoNo = sessionStorage.getItem('quickSearchDataVesselImoNo') ? sessionStorage.getItem('quickSearchDataVesselImoNo') :'';
    	
    	search.quickSearchDataAuditTypeId = sessionStorage.getItem('quickSearchDataAuditTypeId') ? sessionStorage.getItem('quickSearchDataAuditTypeId') :'';
    	
//	    if(search.userRoleId==search.AppConstant.IHM_MANAGER_ROLE_ID){
//	     search.auditorRoles = [{roleId:'1001' , roleDesc:'REVIEWER'}];
//	        search.ihmAuthorise=true;
//	    	search.audtype = search.audtype.filter(function( obj ) {
//				return obj.auditTypeId == search.AppConstant.IHM_TYPE_ID;
//	    	});
//	    	
//	    }else{
	    masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	/* only ihm user*/
	    if(res[0].planApprovalReview == 1 || res[0].roleId==AppConstant.ADMIN_ROLE_ID){ //Added by sudharsan for Jira-ID=IRI-5498
	    	search.audtype = search.audtype;
	    }else if(res[0].planApprovalReview == 0){
	    	search.audtype = search.audtype.filter(function( obj ) { 
				if( obj.auditTypeId < 1007)
			     return search.audtype = obj
			     });
	    }
        if(search.userRoleId==search.AppConstant.ADMIN_ROLE_ID){
        	search.ihmReviewr =false;
        	search.ihmAuthorise=false;   console.log("000");

			//Commented by sudharsan for Jira-ID=IRI-5498
        // 	search.audtype = search.audtype.filter(function( obj ) { 
     	// 		return obj.auditTypeId != search.AppConstant.IHM_TYPE_ID;
        //  });
    	 }else{
	   
	    if(res && res.length>0 && (res[0].ihmreview==0 && res[0].ismreview==0 && res[0].mlcreview==0 && res[0].planApprovalReview==1 && res[0].ispsReview==0 ))
    	{ 	search.onlyPlanAprroval = true;
    	
    	}
	    if(res[0].planApprovalReview==1)
	    	search.planApprovalAuthorise = true;
	    
	    if(res[0].planApprovalReview == 1 && res[0].ihmreview == 1 && res[0].ismreview == 1 && res[0].ispsReview == 1 && res[0].mlcreview == 1 ){
	    	search.audtype = search.audtype;
	    }
	    else
	    if(res && res.length>0 && res[0].ihmreview== 1 && res[0].planApprovalReview == 1 && ( (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)  ) && (res[0].roles.length >0 && res[0].roles[0].roleId != 1004))
    	{ 	
    	
    	search.audtype = search.audtype.filter(function( obj ) { 
			if( obj.auditTypeId >= 1006)
		     return search.audtype = obj
		     });
    	}else if(res && res.length>0 && res[0].planApprovalReview ==1 &&(res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)){
 		    	search.audtype = search.audtype.filter(function( obj ) { 
 					if( obj.auditTypeId >= 1007)
 				     return search.audtype = obj
 				     });
 			}else  if(res && res.length>0 && res[0].ihmreview==1 && ( (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ispsReview==0 || !res[0].ispsReview)  ) && (res[0].roles.length >0 && res[0].roles[0].roleId != 1004))
 	    	{ 	search.onlyIhm = true;
 	    	
 	    	 search.audtype = search.audtype.filter(function( obj ) {
 				return obj.auditTypeId == search.AppConstant.IHM_TYPE_ID;
 	    	});
 	    	} 
    	/* not Ihm*/
    	if(res && res.length>0 && ( ( res[0].ihmreview==0 || !res[0].ihmreview ) &&    (res[0].ismreview==1 || !res[0].ismreview ) && (res[0].mlcreview==1 || !res[0].mlcreview)  && (res[0].ispsReview==1 || !res[0].ispsReview)  ) && (res[0].roles.length >0 && res[0].roles[0].roleId != 1002))
    	{ 	search.audtype = search.audtype.filter(function( obj ) { 
			return obj.auditTypeId != search.AppConstant.IHM_TYPE_ID;
    	});
    	}
    	
    	/* observer */
    	
    	if(res && res.length>0 &&  ( res[0].ihmreview==0 || !res[0].ihmreview ) &&   (res[0].roles.length >0 && res[0].roles[0].roleId == 1004))
    	{ 	 search.audtype = search.audtype.filter(function( obj ) { 
			return obj.auditTypeId != search.AppConstant.IHM_TYPE_ID;
    	});
    	}
    	
    	if(res && res.length>0 &&  (res[0].ihmreview  && res[0].ihmreview==1 ) &&   (res[0].roles.length >0 && res[0].roles[0].roleId == 1004))
    	{ 	   search.audtype = search.audtype.filter(function( obj ) { 
			return obj;
    	});
    	}
    	/* observer */
    	
    	
    	
    	if(res && res.length>0 && res[0].ihmreview==1 || (res && res.length>0 && res[0].roles.length >0 && res[0].roles[0].roleId == 1002))
    	{	search.ihmReviewr = true;  search.ihmAuthorise=true; search.certType ="Letter";}
    	
    	 }
    	});
//	    }
    	
    	search.setSearchData = function(pageNo){
    		 
    		var searchBeanValues={
    				
        			'vesselImoNo' : search.searchCriteria.vesselImoNoQuickSearch  ? search.searchCriteria.vesselImoNoQuickSearch  : search.searchCriteria.vesselImoNo ? search.searchCriteria.vesselImoNo.vesselImoNo : null,
        			
        			'officialNo': search.searchCriteria.officialNo ? search.searchCriteria.officialNo.officialNo : null,
        			
        			'certIssueDate' : search.searchCriteria.certIssuedDate ? moment(search.searchCriteria.certIssuedDate, MMMDDYYYY).format(YYYYMMDD) : null,
        					
        			'certExpireDate' :  search.searchCriteria.certExpiryDate ? moment(search.searchCriteria.certExpiryDate,MMMDDYYYY).add(1, 'days').format(YYYYMMDD) : null,
        	
        			'certificateNo' : search.searchCriteria.certificateNo ? search.searchCriteria.certificateNo : null,
        					
        			'letterNo' : search.searchCriteria.letterNo ? search.searchCriteria.letterNo : null,
        					
        			'auditTypeId' : search.searchCriteria.auditTypeId ? search.searchCriteria.auditTypeId : null,
        					
        			 'auditSubTypeId' : search.searchCriteria.auditSubTypeId ? search.searchCriteria.auditSubTypeId : null,
        					        					
        			'companyId' : sessionStorage.getItem('companyId'),
        		
        			'pageNo' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null'  &&  sessionStorage.getItem('defaultSearchCount') != "undefined" ? pageNo*sessionStorage.getItem('defaultSearchCount') : pageNo*5,
        			
        			'userId' : search.userId,
        			
        			'auditStatusId':search.searchCriteria.auditStatusId ? search.searchCriteria.auditStatusId : null,
        					
        			'auditSeqNo':[],
        			
        			'retrieveFlag' : false,
        			
        			'roleId' : sessionStorage.getItem('userRoleId'),
        			
        			'defaultSearchCount' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null' &&  sessionStorage.getItem('defaultSearchCount') != "undefined"? sessionStorage.getItem('defaultSearchCount') : 5,
        			
        			'emailId': sessionStorage.getItem('emailId'),
        			
        			'auditorUserId' : search.searchCriteria.auditorName?search.searchCriteria.auditorName.emailId : null,
        					
        			'auditorRoleId' : search.searchCriteria.auditorRole ? search.searchCriteria.auditorRole : null,
        					
        			'shortingBy' : search.shortingBy ? search.searchDataTableIndexAndName[search.shortingBy] : null,
                    
                	'shortingOrder' :  search.shortingOrder ? search.shortingOrder : null,
        					
        			'scope' : search.scopeId ? search.scopeId : null,
        					
        			'ihmAuthorise' :( search.ihmAuthorise && search.ihmAuthorise==true && !search.onlyIhm) ? 1  : (search.onlyIhm) ? 2 : 0,
        			
        			'planApprovalAuthorise' : search.planApprovalAuthorise && search.onlyPlanAprroval ? 2 : search.planApprovalAuthorise ? 1 : 0
        		}
    		
    		if(searchBeanValues.auditorRoleId && !(searchBeanValues.auditorUserId)){
    			searchBeanValues.auditorUserId = sessionStorage.getItem('emailId');
    		}
    		
    		return searchBeanValues;
    		
    	}
    	
    	search.report = function(values){
    		
    		var searchData = search.searchData;
    		searchData.pageNo = -5;
    		
    		var filExtension = (values ==='pdf') ? 'pdf' : (values ==='excel') ? 'xlsx' : '';
    			
    		auditFactory.generateSearchReport(searchData,'CENTRALSEARCH','WITHCR',values,sessionStorage.getItem('companyId')).$promise.then(function(result) { 
    	    			
    			if(result.status == 200){
    				if(result.data.byteLength){
    					blockUI.start();
    	    					
    					_.downloadFiles(new Blob([result.data],{type:result.headersGetter('content-type')}), 'CENTRALSEARCH_WITHCR_'+values.toUpperCase()+'.'+filExtension);
    	    					
    					blockUI.stop();
    	    		
    				}else{
    					toaster.warning('NO Records Found.');
    	    			}
    	    }	
    	    			
    		});
    		
    	}
    	
    	search.search = function(pageNo,type){ 
    		
    		var roundedsets = null;
    		
    		var  remindersets = null;
    		
    		if($scope.pagination.current &&!($scope.pagination.current %10)){
	    		type = 'front';
	    	
	    	}
    		if(type){
    			if(type == 'search' || type == 'start'){
    				search.pageInitialCount = 1;
    		        
    				search.currentLimitPage = 10;
    		        
    				search.initialSelect = 1;
    			}
    			else if(type == 'back'){
    				
    				search.pageInitialCount = search.pageInitialCount - 1;
    				search.initialSelect  =  search.initialSelect - 10;
    			}

    			else{
    				
    				search.pageInitialCount = search.pageInitialCount + 1;
    				search.initialSelect  =  search.initialSelect + 10;
    			}
    			if(type == 'end'){
    				pageNo = pageNo;
    			}else{
    			 pageNo = (search.pageInitialCount*10) -10 ;
    			}
    			search.currentLimitPage = search.pageInitialCount*10;
    			 
    		}
    		
    		
    		var searchData = search.setSearchData(pageNo);
    		
    		
    		console.log(searchData);
    		
    		search.searchData = searchData;
    		    		
    		$scope.pagination.current = pageNo+1;
    	
    		auditFactory.getSearchCount(searchData).$promise.then(function(res){
    			console.log(res);
    			$timeout(function() {
    				
    				search.total = res.data ? res.data: 0;
    				
    			},0);
    			
    			var defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 5;
    			
    			$scope.pagination.totalItemCount = res.data;
    			
    			$scope.pagination.totalPages = Math.ceil(Number(res.data) / defaultSearchCount);  
    			
    			if($scope.pagination.totalPages > 10){
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
	        			        		
	        	
	        		if(search.currentLimitPage <= ($scope.pagination.ShowPages * 10)){
	        		  if(type == 'end'){
	        				
	        			  $scope.pagination.ShowPagesMin = $scope.pagination.totalPages -(remindersets);
		        		 $scope.pagination.ShowPagesMax = $scope.pagination.totalPages;
	        			}
	        		  else {
	        			  
	        			$scope.pagination.ShowPagesMin = search.initialSelect;
	        			$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : search.currentLimitPage ;
	        		  }
	        		}else {	//Changed by @Ramya for Jira id -IRI-5006
	        			  
	        			$scope.pagination.ShowPagesMin = search.initialSelect;
	        			$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : search.currentLimitPage ;
	        		  }
       			
    			if($scope.pagination.totalPages == 0){
    				
    				$scope.pagination.current = 0;
    			}
    			
    			$scope.pagination.last = $scope.pagination.totalPages;
    		});
    	
    		sessionStorage.setItem('currPageNo',$scope.pagination.current);
    		
    		search.getSearchResult(searchData);
    	}
    	
    	search.getSearchResult = function(searchData){
    		    		    			
    		search.showBlock = false;
    		
    		search.pagination = false;
    		
    	auditFactory.getSearchResult(searchData).$promise.then(function(result) { 
				console.log(result);
    			if(result.length>0){
     			   result.forEach(function(index){ 
     			  var seqNo =	(index.certificateDetail && index.certificateDetail.length >0 ) ?  _.max(index.certificateDetail, function(find){  return   find.seqNo; }) : ''; 
                  var extensionIssueDate = _(index.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedIssueDate').toString();
           		  var extensionexpiryDate = _(index.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('extendedExpireDate').toString();
           		  var certificateNo = _(index.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certificateNo').toString();
           		  var letterNo = _(index.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('letterNo').toString();
           		  var certIssueId = _(index.certificateDetail).chain().where({'seqNo':seqNo.seqNo}).pluck('certIssueId').toString();
           		      
           		      index.certIssueDate  = extensionIssueDate ? extensionIssueDate : index.certIssueDate ;
           		      index.certExpireDate = extensionexpiryDate ? extensionexpiryDate : index.certExpireDate ;
           		      index.certificateNo =   certificateNo ? certificateNo : index.certificateNo; 
           		      index.letterNo =   letterNo ? letterNo : index.letterNo; 
           		      index.certIssueId =   certIssueId ? certIssueId : index.certIssueId; 
           		      
				//commented by ramya for jira id-->IRI-5216

           		//   if(index.auditTypeId == search.AppConstant.SSP_TYPE_ID || index.auditTypeId == search.AppConstant.DMLC_TYPE_ID){ 			
				//        index.certIssueDate = index.auditDate ? index.auditDate : index.certIssueDate;
			    //      }
   			   });
     			}
    			 
        			
       			
    			$timeout(function() {
        			
    				search.toValue = search.total > 0 ?  search.searchData.pageNo : 0;
        			
        			search.from = search.total > 0 ?  (search.searchData.pageNo+1) : 0;
    				
        		},0);
    			
    			$timeout(function() {
        			
    				search.to = (result.length > 0) ? (search.toValue + result.length) : 0 ;
    				
        		},0);
    			
    			search.setDataTableData(result);
    			
	        }); 		
    		        	
    	}
    	
    	search.setDataTableData = function(data){
    	
    	    var defer = $q.defer();
			
			defer.resolve(data);  
			
			search.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)
			
        	.withDOM('<<"tableinside"t>>').withOption('deferRender', true)
        	
            .withOption('rowCallback', rowCallback)
            
            .withOption('drawCallback', drawCallback)
            
           .withOption('order', [[search.shortingBy?search.shortingBy:0, search.shortingOrder?search.shortingOrder:'asc']])//.newOptions()
            
            .withDisplayLength(25)
            
           // .withOption('scrollY', 280)
            
            .withOption('responsive', true)
            
            .withOption('columnDefs', [
                                       { "width": "6%", "targets": 1 },
                                       { "width": "8%", "targets": 2 },
                                       { "width": "6%", "targets": 3 },
                                       { "width": "9%", "targets": 4 },
                                       { "width": "9%", "targets": 5 },
                                       { "width": "9%", "targets": 6 },
                                       { "width": "6%", "targets": 7 },
                                       { "width": "10%", "targets": 8 },
                                       { "width": "9%", "targets": 9 },
                                       { "width": "9%", "targets": 10 },
                                       { "width": "9%", "targets": 11 },
                                       { "width": "10%", "targets": 12 }
                                     ])
            
             .withButtons(
					[
							{
								text : '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF',
								classes : '',
								key : '1',
								action : function(e, dt, node, config) {
									search.report('pdf');
								}
							},
							{
								text : '<i class="fa fa-file-excel-o" aria-hidden="true"></i> EXCEL',
								classes : '',
								key : '1',
								action : function(e, dt, node, config) {
									search.report('excel');
								}
							}])
            
            .withOption('createdRow', function (row, data, dataIndex) {
            	
            	$compile(angular.element(row).contents())($scope);
            	
            });
			
			//data.auditTypeId==search.AppConstant.IHM_TYPE_ID
			console.log(data)
			
			search.dtColumns = [
			                    DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data){
        	                    	
        	                    	return '';}),
        	                    
        	                    DTColumnBuilder.newColumn(null).withTitle('IMO No').renderWith(function(data){
        	                    	
        	                    	if(data.auditSummaryId==1005) {return '<span style="color:red" data-toggle="tooltip" data-original-title="Audit Summary Not Approved" tooltip data-placement="right">'+data.vesselImoNo+' </span>'} else {return data.vesselImoNo;}}),
        	                    
        	                    DTColumnBuilder.newColumn(null).withTitle('Vessel Name').notSortable().renderWith(function(data){if(!data){return '-'}else{
                                    return data.vesselNameAud ? data.vesselNameAud : data.vesselName ;}}),
        	                    
        	                    DTColumnBuilder.newColumn('companyImoNo').withTitle('Company IMO No').renderWith(function(data){if(!data){return '-'}else{
                        			 return data;}}),
        	                    
                        		/*DTColumnBuilder.newColumn(null).withTitle('Issue Date').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
                            		 return data.auditTypeId==search.AppConstant.DMLC_TYPE_ID? moment( new Date(data.auditDate),YYYYMMDD).format(MMMDDYYYY) : data.certIssueDate?moment( new Date(data.certIssueDate),YYYYMMDD).format(MMMDDYYYY):'--';}}),
            	                   
            	                DTColumnBuilder.newColumn(null).withTitle('Expiry Date').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
                        			 return ((data.auditSubTypeId==search.AppConstant.INTERIM_SUB_TYPE_ID || data.auditSubTypeId==search.AppConstant.INITIAL_SUB_TYPE_ID || data.auditSubTypeId==search.AppConstant.RENEWAL_SUB_TYPE_ID) && data.endorseExpireDate) ? moment(new Date(data.endorseExpireDate),YYYYMMDD).format(MMMDDYYYY) : data.certExpireDate?moment( new Date(data.certExpireDate),YYYYMMDD).format(MMMDDYYYY):'--';}}),
        	                    */
                        			 
                        		DTColumnBuilder.newColumn(null).withTitle('Issue Date').renderWith(function(data){if(!data){return '-'}else{
                                	return ( (data.auditTypeId==search.AppConstant.SSP_TYPE_ID ||  data.auditTypeId==search.AppConstant.IHM_TYPE_ID ) || (data.auditTypeId >= search.AppConstant.SOPEP_TYPE_ID && data.auditTypeId <= search.AppConstant.COW_TYPE_ID) && data.certIssueDate)?moment(data.certIssueDate,YYYYMMDD).format(MMMDDYYYY): (data.auditTypeId!=search.AppConstant.DMLC_TYPE_ID && data.auditTypeId!=search.AppConstant.SSP_TYPE_ID && data.auditTypeId!=search.AppConstant.IHM_TYPE_ID && data.certIssueDate )?moment(data.certIssueDate,YYYYMMDD).format(MMMDDYYYY):(data.auditTypeId==search.AppConstant.DMLC_TYPE_ID && data.closeMeetingDate)?moment( new Date(data.closeMeetingDate),YYYYMMDD).format(MMMDDYYYY):'--';}}),
                	                   
                	            DTColumnBuilder.newColumn(null).withTitle('Expiry Date').renderWith(function(data){if(!data){return '-'}else{
                            		return ( (data.auditTypeId==search.AppConstant.DMLC_TYPE_ID ||  data.auditTypeId==search.AppConstant.SSP_TYPE_ID ||  data.auditTypeId==search.AppConstant.IHM_TYPE_ID || (data.auditTypeId >= search.AppConstant.SOPEP_TYPE_ID && data.auditTypeId <= search.AppConstant.COW_TYPE_ID)) ) ? '--' : ((data.auditSubTypeId==search.AppConstant.INTERIM_SUB_TYPE_ID || data.auditSubTypeId==search.AppConstant.INITIAL_SUB_TYPE_ID || data.auditSubTypeId==search.AppConstant.RENEWAL_SUB_TYPE_ID) && data.endorseExpireDate) ? moment(data.endorseExpireDate,YYYYMMDD).format(MMMDDYYYY) : data.certExpireDate?moment( data.certExpireDate,YYYYMMDD).format(MMMDDYYYY):'--';}}),
            	                    
        	                   /* DTColumnBuilder.newColumn('certificateNo').withTitle('Certificate/Letter No.').renderWith(function(data){if(!data){return '-'}else{
                        			 return data;
                        			 }}),*/
                        		
                            	DTColumnBuilder.newColumn(null).withTitle('Certificate/Letter No.').renderWith(function(data){if(!data){return '-'}else{
                            			 return data.auditTypeId == search.AppConstant.IHM_TYPE_ID ? data.letterNo : data.certificateNo;
                            			 }}),
                            			 
                        		/*DTColumnBuilder.newColumn('letterNo').withTitle('Letter No.').renderWith(function(data){if(!data){return '-'}else{
                            			 return data;
                            			 }}),
                            			 */
        	                    DTColumnBuilder.newColumn('auditTypeDesc').withTitle('Type').notSortable().renderWith(function(data){if(!data){return '-'}else{
        	                    	return data;
        	                    }}),
        	                    
        	                    DTColumnBuilder.newColumn('audSubTypeDesc').withTitle('Sub Type').notSortable().renderWith(function(data){if(!data){return '-'}else{
                        			return data;
        	                    }}),
        	                    DTColumnBuilder.newColumn('auditorName').withTitle('Lead Auditor').notSortable().renderWith(function(data){if(!data){return '-'}else{
                        			return data;
        	                    }}),
        	                    DTColumnBuilder.newColumn('lockHolder').withTitle('Lock Holder').notSortable().renderWith(function(data){if(!data){return '-'}else{
                        			return data;
        	                    }}),
        	                    DTColumnBuilder.newColumn(null).withTitle(search.userRoleId==search.AppConstant.IHM_MANAGER_ROLE_ID? 'Review Status' : 'Audit/ Review Status').notSortable().renderWith(function(data){if(!data){return '-'}else{
                        			return '<span><i class="fa fa-circle" ng-class="{orange:'+data.auditStatusId+'=='+search.AppConstant.COMMENCED_AUDIT_STATUS+',green:'+data.auditStatusId+'=='+search.AppConstant.COMPLETED_AUDIT_STATUS+',black:'+data.auditStatusId+'=='+search.AppConstant.CLOSED_AUDIT_STATUS+',red:'+data.auditStatusId+'=='+search.AppConstant.VOID_AUDIT_STATUS+'}" data-toggle="tooltip" data-original-title="'+data.auditStatusDesc+'" tooltip data-placement="left"></i></span>';
        	                    }}),
        	                    DTColumnBuilder.newColumn(null).withTitle('Report Reviewer Status').notSortable().renderWith(function(data){if(!data){return '-'}else{
        	                    	if(data.auditTypeId==search.AppConstant.IHM_TYPE_ID){
        	                    		return '<span><i class="fa fa-circle" ng-class="{orange:'+data.reviewStatus+'=='+0+',green:'+data.reviewStatus+'=='+2+',black:'+data.reviewStatus+'=='+1+',red:'+data.auditStatusId+'=='+search.AppConstant.VOID_AUDIT_STATUS+'}" data-toggle="tooltip" data-original-title="'+search.IhmreviewIdAndDesc[data.reviewStatus]+'" tooltip data-placement="left"></i></span>';
        	                    	}else{
        	                    		return '<span><i class="fa fa-circle" ng-class="{orange:'+data.reviewStatus+'=='+search.AppConstant.REVERT_REVIEW_STATUS+'&&'+data.auditStatusId+'!='+search.AppConstant.VOID_AUDIT_STATUS+',green:'+data.reviewStatus+'=='+search.AppConstant.ACCEPTED_REVIEW_STATUS+'&&'+data.auditStatusId+'!='+search.AppConstant.VOID_AUDIT_STATUS+',black:'+data.reviewStatus+'=='+search.AppConstant.INITIATE_REVIEW_STATUS+'&&'+data.auditStatusId+'!='+search.AppConstant.VOID_AUDIT_STATUS+',red:'+data.reviewStatus+'=='+search.AppConstant.REJECTED_REVIEW_STATUS+'||'+data.auditStatusId+'=='+search.AppConstant.VOID_AUDIT_STATUS+'}" data-toggle="tooltip" data-original-title="'+search.reviewIdAndDesc[data.reviewStatus]+'" tooltip data-placement="left"></i></span>';	
        	                    	}
        	                    }})
        	                    
                        	];	 
			
			search.showBlock = true;
			
			
			$timeout(function() {
				search.pagination=true;
			},0);
        	
    	}
    	
    	function drawCallback(settings){
    		
    		search.shortingBy = settings.aLastSort[0].col;
            
        	search.shortingOrder = settings.aLastSort[0].dir;
    	    
        }
    
    	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function(event) {
            	
            	//	$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
            	if(event.target.cellIndex == 0)
            		{
            			event.preventDefault();
            		}else{
            			$scope.showData(aData.auditSeqNo,aData.vesselImoNo,aData.auditTypeId,aData.companyId);
            		}
            });
            
            return nRow;
        }
    	
    	$timeout(function(){ 	
			if($state.params.currPageNo != null){/* commenting because quick search functionlity
				
				if(sessionStorage.getItem('auditSrchData')){
					
					if(sessionStorage.getItem('auditSrchData').auditTypeId){
						search.getAuditData(sessionStorage.getItem('auditSrchData').auditTypeId);
					}
					search.searchCriteria = sessionStorage.getItem('auditSrchData');
				}
				
				search.search(Number($state.params.currPageNo)-1); */
			}
		},100);
    	
    
    	/***** for getting audit data *****/
    	search.getAuditData = function(auditTypeId){
    		    		
    		search.audsubtype = search.allAuditSubTypes.filter(function( obj ) {
				return obj.auditTypeId == auditTypeId;
			});
		    
    		search.audstatus = search.allAuditStatus.filter(function( obj ) {
      
    			if(sessionStorage.getItem('userRoleId') == search.AppConstant.IHM_MANAGER_ROLE_ID){ console.log( search.AppConstant.REOPEN ); console.log( obj.auditStatusId );
        			return obj.auditTypeId == auditTypeId && obj.auditStatusId != search.AppConstant.REOPEN;
        		}
				//Removed else block by sudharsan for Jira-ID = IRI-5473 on 27-09-2022
				else{
        			return obj.auditTypeId == auditTypeId;
        		}
    		});
    		
    		/*if(auditTypeId == search.AppConstant.SSP_TYPE_ID || auditTypeId == search.AppConstant.DMLC_TYPE_ID){
    			search.audstatus = search.audstatus.filter(function( obj ) {
        			
            		return obj.auditTypeId == auditTypeId && obj.auditStatusId != search.AppConstant.COMPLETED_AUDIT_STATUS;
            	});
    		}*/
    		if(auditTypeId==search.AppConstant.SSP_TYPE_ID || auditTypeId==search.AppConstant.DMLC_TYPE_ID || (auditTypeId >= search.AppConstant.SOPEP_TYPE_ID && auditTypeId <= search.AppConstant.COW_TYPE_ID)){
    			search.scopeId='';
    		}
    	}    
    	
    	search.setVessel = function(item){
    		
    		search.searchCriteria.vesselImoNo = {'vesselImoNo':item.vesselImoNo};
    		
    		search.searchCriteria.vesselName = {'vesselName':item.vesselName};
    		
    	}
    	
    	/**********************************/
    	$scope.range = function(minlen,maxlen){
    		//Changed by @Ramya for Jira id -IRI-5006
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
    	
    	$scope.showData = function(auditSeqNo,vesselImoNo,auditTypeId,companyId){
    		
    		sessionStorage.setItem('auditSeqNo',auditSeqNo);
    		sessionStorage.setItem('companyId',companyId);
    		sessionStorage.setItem('auditTypeId',auditTypeId);
    		
    		var searchData = search.searchCriteria;
    		
    		sessionStorage.setItem('auditSrchData', search.searchCriteria );
    		 
    		if(auditTypeId == search.AppConstant.IHM_TYPE_ID){
    			$state.go('app.audit.detailsIhm',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
    		}else if(auditTypeId >= 1007 && auditTypeId <= 1013){
    			$state.go('app.audit.detailsPlanApproval',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
    		}
    		else{
    			$state.go('app.audit.details',{'audittype':auditType[auditTypeId].urlMap},{reload:true});
    		}
    		
    	}
    	
    	search.clear = function(){
    		
    		search.searchCriteria = {};	
    		
    		search.showBlock = false;
    		
    		search.pagination = false;
    		
    		search.scopeId = '';
    		
			/* START - Added by @Ramya on 6-7-2022 for jira id - IRI-5335*/
			search.pageInitialCount = 1;		
    		        
    		search.currentLimitPage = 10;
    		        
    		search.initialSelect = 1;

			$scope.pagination = {};
			/* Added by @Ramya on 6-7-2022 for jira id - IRI-5335 - END*/

        	sessionStorage.removeItem('auditCycleData','');
        	sessionStorage.removeItem('auditCycleSearchBean', '');
        	sessionStorage.removeItem('quickSearchDataAuditTypeId');
    		sessionStorage.removeItem('quickSearchDataVesselImoNo');
    		sessionStorage.removeItem('quickSearchDataVeslNme');
    		    		
    	}
    	
    	search.back = function(){
    		
    		$state.go('app.dashboard',{},{reload:true});
    		
    	}
    	
    	window.onpopstate = function() {
 			
    		 $state.go('app.dashboard',{},{reload:true});
     	}
    	
    	search.validateVessel = function(val,param){
    		
    		if(param=='IMO' && val){
    			if(!val.vesselImoNo){
    				search.searchCriteria.vesselImoNo = '';
    			}
    		}else if(param=='VES' && val){
    			if(!val.vesselName){
    				search.searchCriteria.vesselName = '';
    			}
    		}else if(param=='COM' && val){
    			if(!val.companyImoNo){
    				search.searchCriteria.companyImoNo = '';
    			}
    		}else if(param=='CERT' && val){
    			if(search.certificateNos.indexOf(val)==-1){
    				search.searchCriteria.certificateNo = '';
    			}
    		}else if(param=='LERT' && val){
    			if(search.letterNos.indexOf(val)==-1){
    				search.searchCriteria.letterNo = '';
    			}
    		}
    		else if(param=='AUDITORNAME' && val){
    			if(!search.searchCriteria.auditorName.emailId){
    				search.searchCriteria.auditorName = '';
    			}
    		}
    		
    	}
    	
    	
    	search.getOffcialId = function(val){
    		var tempArray = [];
    		if(val=='*'){
    			tempArray = search.vesselData;
    			
    		}else{
    			
    			try  
    			{
    				var test = val;
    			  if(test.replace(/[^*]/g, '').length>1){
    					throw 'not';
    				}else if(val.indexOf('*')>0){
    					if(val.indexOf('*')!=val.length-1){
    						throw 'not';
    					}
    					val = val.substring(0,val.indexOf('*'));
    				}
    			  
    			  search.vesselData.forEach(function(a){
    			    if(a.officialNo.indexOf(val)>-1){
    	    				tempArray.push(a); 
    	    			}
    	    		}); 
    				    			 
    			}
    			catch(err)
    			{
    			  tempArray = [];
    			}
    	  }
    		return tempArray;
    	}
    	
    	search.getCertificateNos = function(val){
    		
    		var tempArray = [];
    		
    		if(val=='*'){
    			
    			tempArray = search.certificateNos;
    			
    		}else{
    			
    			try{  
    				
    				var test = val;
    				
    				if(test.replace(/[^*]/g, '').length>1){
    					throw 'not';
    				}else if(val.indexOf('*')>0){
    					if(val.indexOf('*')!=val.length-1){
    						throw 'not';
    					}
    					val = val.substring(0,val.indexOf('*'));
    				}
    			  
    				tempArray = _.filter(search.certificateNos, function(a){
       									return a.indexOf(val)>-1;
       	        				});
    				
    			}catch(err){
    				
    			  tempArray = [];
    			}
    	  }
    		return tempArray;
    	}
    	
    	search.getLetterNos = function(val){
    		
    		var tempArray = [];
    		
    		if(val=='*'){
    			
    			tempArray = search.letterNos;
    			
    		}else{
    			
    			try{  
    				
    				var test = val;
    				
    				if(test.replace(/[^*]/g, '').length>1){
    					throw 'not';
    				}else if(val.indexOf('*')>0){
    					if(val.indexOf('*')!=val.length-1){
    						throw 'not';
    					}
    					val = val.substring(0,val.indexOf('*'));
    				}
    			  
    				tempArray = _.filter(search.letterNos, function(a){
       									return a.indexOf(val)>-1;
       	        				});
    				
    			}catch(err){
    				
    			  tempArray = [];
    			}
    	  }
    		return tempArray;
    	}


    	$timeout(function(){
		if(search.quickSearchDataVesselImoNo){ 	 
    		search.searchCriteria.vesselImoNoQuickSearch = search.quickSearchDataVesselImoNo;
    		search.searchCriteria.vesselImoNo = search.quickSearchDataVesselImoNo;
    		search.searchCriteria.auditTypeId =Number(search.quickSearchDataAuditTypeId);
    		search.getAuditData(search.searchCriteria.auditTypeId);
    		
    		masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
        	if(res && res.length>0 && res[0].ihmreview==1 )
        	{ 	search.ihmReviewr = true;  search.ihmAuthorise=true;}
        	search.search(0);
        	});
    		
    		
    		
    	}
    	},10);
    	
    	    	 
    }
})();