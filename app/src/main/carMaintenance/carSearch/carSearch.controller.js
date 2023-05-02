
(function (){
    'use strict';

    angular
        .module('app.carMaintenance.carSearch')        
        .controller('CarSearchController', CarSearchController); 
    
    function CarSearchController(DDMMYYYY,YYYYMMDD,MMMDDYYYY,DDMMMYYYY,blockUI,$compile,distinctAudStatus,audittype,vesselData,auditSubTypes,$state,carMaintenanceFactory,$scope,$cookies,DTOptionsBuilder,DTColumnBuilder,$q,$http,$timeout,toaster,allFingingStatus,AppConstant,leadAuditorNames,LatestCreatedAudit,$filter){
    	
    	var carsrch=this;
    	
    	var defer = $q.defer(); 
    	
    	carsrch.AppConstant = AppConstant;
    	
    	carsrch.dtInstance = {};
    	
    	$scope.dueDateGreen = [];
    	
    	$scope.dueDateYellow = [];
    	
    	$scope.dueDateRed = [];
    	    	
    	carsrch.allAudsubtype = auditSubTypes;
    	
    	carsrch.leadAuditorNames = [];

		carsrch.pageInitialCount = 1;
         
    	carsrch.currentLimitPage = 10;
         
    	carsrch.initialSelect = 1;
    	
    	distinctAudStatus.distinctFindingSts = distinctAudStatus.distinctFindingSts.filter(function (obj){
    		return (obj.findingsStatusId == carsrch.AppConstant.OPEN || obj.findingsStatusId == carsrch.AppConstant.PLAN_ACCEPTED || obj.findingsStatusId == carsrch.AppConstant.VERIFIED_CLOSED)
    	});
    	
    	leadAuditorNames.forEach(function(index){
    		if(index.roles[0].roleId!=1004){
    		carsrch.leadAuditorNames.push(index);
    		}
    	});
    	
    	carsrch.findingStatus = distinctAudStatus.distinctFindingSts;
    	console.log(carsrch.findingStatus);
    	
    	carsrch.findingStatus.push({'findingsStatusId':carsrch.AppConstant.ALL,'findingstStatusDesc':'ALL'});
    		
    	carsrch.audtype = audittype;
    	
    	carsrch.audtype = carsrch.audtype.filter(function (obj){
    		return (obj.auditTypeId != carsrch.AppConstant.SSP_TYPE_ID && 
				obj.auditTypeId != carsrch.AppConstant.SOPEP_TYPE_ID && 	//Added by Ramya on 21 Feb 2022 for Jira id-->IRI-5133
				obj.auditTypeId != carsrch.AppConstant.STS_TYPE_ID && 
				obj.auditTypeId != carsrch.AppConstant.SMPEP_TYPE_ID && 
				obj.auditTypeId != carsrch.AppConstant.BWS_TYPE_ID && 
				obj.auditTypeId != carsrch.AppConstant.VOC_TYPE_ID && 
				obj.auditTypeId != carsrch.AppConstant.SDR_TYPE_ID &&
				obj.auditTypeId != carsrch.AppConstant.COW_TYPE_ID &&		 //added by kiran  on 28 Feb 2022
				obj.auditTypeId != carsrch.AppConstant.IHM_TYPE_ID)			//Added by sudharsan on 21 Feb 2022
				
    	});
    	
    	carsrch.vesselArray = vesselData;
    	
    	carsrch.LatestAuditArray=LatestCreatedAudit;
    	
    	//console.log(carsrch.LatestAuditArray);
    	
    	carsrch.historyTableData = [];
    	
    	carsrch.previous = '';
    	
    	carsrch.companyId = sessionStorage.getItem("companyId");
    	
    	$scope.pagination = {};
    	
    	carsrch.searchData = {};
    	
    	carsrch.showBlock = false;
    	
    	carsrch.searchCriteria={
    			vesselImoNo : '',
    			vesselName : '',
    			auditmodtype : '',
    			audsubmodtype : '',
    			findingStatus : '',
    			leadAuditorName:'',//carsrch.AppConstant.OPEN
    	};
    	
    	carsrch.quickSearchDataVesselImoNo = sessionStorage.getItem('quickSearchDataVesselImoNo') ? sessionStorage.getItem('quickSearchDataVesselImoNo') :'';
    	
    	carsrch.quickSearchDataAuditTypeId = sessionStorage.getItem('quickSearchDataAuditTypeId') ? sessionStorage.getItem('quickSearchDataAuditTypeId') :'';
    	
    	
     $timeout(function(){ 	
			if($state.params.currPageNo != null){/*commenting because quick search functiolity 
				
				if(sessionStorage.getItem('carSrchData').auditmodtype){
					carsrch.getAuditData(sessionStorage.getItem('carSrchData').auditmodtype);
				}
				carsrch.searchCriteria=sessionStorage.getItem('carSrchData');
				
				carsrch.search(Number($state.params.currPageNo)-1); */
			}
			
		},100);
   
   	
   	/**********validate vessel name and imo Number on blur of input field**********/
       carsrch.validateVessel = function(val,param){
   		
   		if(param=='IMO' && val){
   			if(!val.vesselImoNo){
   				carsrch.searchCriteria.vesselImoNo = '';
   				carsrch.searchCriteria.vesselName = '';
   			}
   		}else if(param=='VES'){
   			if(!val.vesselName){
   				carsrch.searchCriteria.vesselImoNo = '';
   				carsrch.searchCriteria.vesselName = '';
   			}
   		}
   		
   	}
       
       
  /**********set vessel name of selected vessel imo after selecting veseel imo from typehead **********/
    	carsrch.setVesselName = function(item){
    	
    		carsrch.searchCriteria.vesselName = item;
    	}
 
  /**********set vessel imo of selected vessel name after selecting veseel name from typehead **********/
    	carsrch.setVesselImo = function(item){
    		
    		carsrch.searchCriteria.vesselImoNo	= item;
    	}
   
 /**********on click of clear button **********/
    	carsrch.clear = function(){

			carsrch.searchCriteria = {};
			carsrch.showBlock = false;
    		carsrch.pagination = false;
    		carsrch.findingStatus = distinctAudStatus.distinctFindingSts;
    		carsrch.audsubtype = auditSubTypes;

			carsrch.pageInitialCount = 1;		
    		        
    		carsrch.currentLimitPage = 10;
    		        
    		carsrch.initialSelect = 1;

			$scope.pagination = {};

        	sessionStorage.removeItem('auditCycleData','');
        	sessionStorage.removeItem('auditCycleSearchBean', '');
        	sessionStorage.removeItem('quickSearchDataAuditTypeId');
    		sessionStorage.removeItem('quickSearchDataVesselImoNo');
    		sessionStorage.removeItem('quickSearchDataVeslNme');
    		
    	}
    	
  /**********on select of audit type collect audit sub type and finding status for that audit **********/	
    	carsrch.getAuditData = function(item){
    		
    		carsrch.audsubtype = carsrch.allAudsubtype.filter(function( obj ) {
				 return obj.auditTypeId == item;
			});

    		if(item == 0){
    			carsrch.findingStatus = distinctAudStatus.distinctFindingSts;
    			
    		}else{
    			
    			carsrch.findingStatus = allFingingStatus.filter(function( obj ) {
    				return obj.auditTypeId == item && obj.companyId==carsrch.companyId && (obj.findingsStatusId == carsrch.AppConstant.OPEN || obj.findingsStatusId == carsrch.AppConstant.DOWNGRADED || obj.findingsStatusId == carsrch.AppConstant.COMPLAINCE_RESTORED || obj.findingsStatusId == carsrch.AppConstant.PLAN_ACCEPTED || obj.findingsStatusId == carsrch.AppConstant.VERIFIED_CLOSED);
    			   });
    			carsrch.findingStatus.push({'findingsStatusId':carsrch.AppConstant.ALL,'findingstStatusDesc':'ALL'});
    		}
    		
    		/**  on select auditType Get all findingcategory **/
    		carMaintenanceFactory.getObsCategorySearch(item,carsrch.companyId).$promise.then(function(res) {
    			res.push({'findingsCategoryId':carsrch.AppConstant.ALL,'findingsCategoryDesc':'ALL','auditTypeId':item});
    			carsrch.findingCategory = res;
    			
    		
    		 });
    		
    	}
    	
    	/*Report Generation*/
    	
    	carsrch.report = function(values){
    		
    		var searchData = carsrch.searchData;
    		
    		searchData.pageNo = -10;
    		
    		var category = (searchData.vesselImoNo || searchData.auditTypeId || searchData.auditSubTypeId || searchData.findingStatusId)  ? 'WITHCR' : 'NOCR';
    		
    		var filExtension = (values ==='pdf') ? 'pdf' : (values ==='excel') ? 'xlsx' : '';
    		
    		carMaintenanceFactory.generateSearchReport(searchData,'CARSEARCH',category,values,carsrch.companyId).$promise.then(function(result) { 
    	    			
    					if(result.status == 200){
    						
    						if(result.data.byteLength){
    							
    						blockUI.start();
    						
    						_.downloadFiles(new Blob([result.data],{type:result.headersGetter('content-type')}), 'CARSEARCH_'+category+'_'+values.toUpperCase()+'.'+filExtension);
    	    				
    	    				blockUI.stop();
    	    				
    						}else{
    	    					toaster.warning("No Records Found.");
    	    				}
    	    			}	
    	    			
    		 });
    				
    	}
    	
    	
   /**********set car search data to a JSON to send to database  **********/

    	carsrch.setSearchData = function(pageNo){
    		
    		var searchBeanValues={
    				
    				
        			"vesselImoNo": carsrch.searchCriteria.vesselImoNoQuickSearch  ? carsrch.searchCriteria.vesselImoNoQuickSearch  :  carsrch.searchCriteria.vesselImoNo ? carsrch.searchCriteria.vesselImoNo.vesselImoNo : '',
        			
        			"auditTypeId":carsrch.searchCriteria.auditmodtype ? carsrch.searchCriteria.auditmodtype : '',
        					
        			"auditSubTypeId":carsrch.searchCriteria.audsubmodtype ? carsrch.searchCriteria.audsubmodtype : '',
        					
        			"findingStatusId":carsrch.searchCriteria.findingStatus ? carsrch.searchCriteria.findingStatus : '',
        							
        			"companyId":carsrch.companyId,
        			
        			"pageNo" : sessionStorage.getItem("defaultSearchCount") && sessionStorage.getItem("defaultSearchCount") != 'null'? pageNo*sessionStorage.getItem("defaultSearchCount") : pageNo*5,
        		        			
        			"defaultSearchCount" : sessionStorage.getItem("defaultSearchCount") && sessionStorage.getItem("defaultSearchCount") != 'null' ? sessionStorage.getItem("defaultSearchCount") : 5,
        					
        			"leadAuditorUserId": carsrch.searchCriteria.leadAuditorUserId ? carsrch.searchCriteria.leadAuditorUserId : null,
        			
        			"leadAuditorName":	carsrch.searchCriteria.leadAuditorName ? carsrch.searchCriteria.leadAuditorName : null,
        					
        			"categoryId" : 	carsrch.searchCriteria.findingCategory!=carsrch.AppConstant.ALL ? carsrch.searchCriteria.findingCategory : ''	
        				
        				
        		};
    		
    		searchBeanValues.findingStatusId = carsrch.searchCriteria.findingStatus!=carsrch.AppConstant.ALL ? carsrch.searchCriteria.findingStatus : '';
    		
    		
    		return searchBeanValues;
    	}
    	
  
  /**********on click of search **********/
    	carsrch.search = function (pageNo,type) {		//changed by @Ramya for Jira id - IRI-5006
			var roundedsets = null;
    		
    		var  remindersets = null;
    		
    		if($scope.pagination.current &&!($scope.pagination.current %10)){
	    		type = 'front';
	    	
	    	}
    		if(type){
    			if(type == 'search' || type == 'start'){
    				carsrch.pageInitialCount = 1;
    		        
    				carsrch.currentLimitPage = 10;
    		        
    				carsrch.initialSelect = 1;
    			}
    			else if(type == 'back'){
    				
    				carsrch.pageInitialCount = carsrch.pageInitialCount - 1;
    				carsrch.initialSelect  =  carsrch.initialSelect - 10;
    			}

    			else{
    				
    				carsrch.pageInitialCount = carsrch.pageInitialCount + 1;
    				carsrch.initialSelect  =  carsrch.initialSelect + 10;
    			}
    			if(type == 'end'){
    				pageNo = pageNo;
    			}else{
    			 pageNo = (carsrch.pageInitialCount*10) -10 ;
    			}
    			carsrch.currentLimitPage = carsrch.pageInitialCount*10;
    		}
    		
    		
    		var searchData = carsrch.setSearchData(pageNo);
    		
    		
    		console.log(searchData);
    		
    		carsrch.searchData = searchData;
    		    		
    		$scope.pagination.current = pageNo+1;
    	
    		carMaintenanceFactory.getHistorySearchCount(searchData).$promise.then(function(res){
    			console.log(res);
    			$timeout(function() {
    				
    				carsrch.total = res.data ? res.data: 0;
    				
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
	        		if(carsrch.currentLimitPage <= ($scope.pagination.ShowPages * 10)){
	        		  if(type == 'end'){
	        				
	        			  $scope.pagination.ShowPagesMin = $scope.pagination.totalPages -(remindersets);
		        		 $scope.pagination.ShowPagesMax = $scope.pagination.totalPages;
	        			}
	        		  else {
	        			  
	        			$scope.pagination.ShowPagesMin = carsrch.initialSelect;
	        			$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : carsrch.currentLimitPage ;
	        		  }
	        		} else {
	        			  
	        			$scope.pagination.ShowPagesMin = carsrch.initialSelect;
	        			$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : carsrch.currentLimitPage ;
	        		  }
       			
    			if($scope.pagination.totalPages == 0){
    				
    				$scope.pagination.current = 0;
    			}
    			
    			$scope.pagination.last = $scope.pagination.totalPages;
    		});
    	
    		sessionStorage.setItem('currPageNo',$scope.pagination.current);
    		
    		carsrch.getHistorySearchResult(searchData);
    	}
    	
    	
    	/******on click of back button redirect to home page******/
    	carsrch.back =function(){
    		$state.go('app.dashboard',{},{reload:true});
    	}
    	
    	window.onpopstate = function() {
 			
   		 $state.go('app.dashboard',{},{reload:true});
    	}
    	
    	/******collect results according to screen search data******/
    	carsrch.getHistorySearchResult = function(searchData){
    	
    		carsrch.showBlock = false;
    		carsrch.pagination = false;
    		
    		
    		carMaintenanceFactory.getHistorySearchResult(searchData).$promise.then(function(data) {
    			
    			
    			carsrch.historyTableData = data;
				//added by @Ramya for Jira id -IRI-5006
				$timeout(function() {
        			
    				carsrch.toValue = carsrch.total > 0 ?  carsrch.searchData.pageNo : 0;
        			
        			carsrch.from = carsrch.total > 0 ?  (carsrch.searchData.pageNo+1) : 0;
    				
        		},0);
    			
    			$timeout(function() {
        			
    				carsrch.to = (data.length > 0) ? (carsrch.toValue + data.length) : 0 ;
    				
        		},0);

    			carsrch.setHistoryTableData(data);
    		 });
    	}	
    	
    	/******set results in table to display to user******/
    	carsrch.setHistoryTableData =  function (data){    		
    	
    		carsrch.cookiesSetData = {'carSrchRslt':data};
    		
    		data.forEach(function(a){
    	           if(a.categoryId == carsrch.AppConstant.OBS_FINDING_CATEGORY){
    	        	   a.nextActionId = carsrch.AppConstant.NIL;
    	        	   a.nextActionIdDesc = 'NIL';
    	           }
    	    	});
    		
    		var defer = $q.defer();
			
			defer.resolve(data);  
    		
    		carsrch.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)
    		
        	.withDOM('<<"tableinside"t>>').withOption('deferRender', true)
        	
        	.withDisplayLength(25)
            
            .withOption('responsive', true)
            
            .withOption('rowCallback', rowCallback)
            
            .withButtons(
					[
							{
								text : '<i class="fa fa-file-pdf-o" aria-hidden="true"></i> Pdf',
								classes : '',
								key : '1',
								action : function(e, dt, node, config) {
									carsrch.report('pdf');
								}
							},
							{
								text : '<i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel',
								classes : '',
								key : '1',
								action : function(e, dt, node, config) {
									carsrch.report('excel');
								}
							}])
            .withOption('createdRow', function (row, data, dataIndex) {
            	$compile(angular.element(row).contents())($scope);
            });
    		carsrch.dtColumns = [
    		                     
     		                    DTColumnBuilder.newColumn(null).withTitle('').renderWith(function(data){
     		                    	 return '';	      	                    	
 	        	                 }),

 	        	                DTColumnBuilder.newColumn(null).withTitle('IMO No').renderWith(function(data){if(!data){return '-'}else{
 	                                  return data.vesselImoNo;
 	                             }}),
 	                                 
                                 DTColumnBuilder.newColumn(null).withTitle('Vessel Name').renderWith(function(data){if(!data){return '-'}else{
                                   return data.vesselName;
                                  }}),
         	                    
                                 DTColumnBuilder.newColumn('auditTypeDesc').withTitle('Type').renderWith(function(data){if(!data){return '-'}else{
                         			 return data;
                         			 }}),
                         	    DTColumnBuilder.newColumn('audSubTypeDesc').withTitle('Sub Type').renderWith(function(data){if(!data){return '-'}else{
                             			 return data;
                             			 }}),
         	                    DTColumnBuilder.newColumn('categoryDesc').withTitle('Category').renderWith(function(data){if(!data){return '-'}else{
                         			 return data;
                         			 }}),
         	                    
         	                    DTColumnBuilder.newColumn(null).withTitle('Audit/Review Date').renderWith(function(data){if(!data){return '-'}else{
                         			return moment( data.auditDate,YYYYMMDD).format(MMMDDYYYY);
                         			 }}),
         	                    
         	                    DTColumnBuilder.newColumn(null).withTitle('Code').renderWith(function(data){if(!data){return '-'}else{
                         			 return '<span data-toggle="tooltip" data-original-title="'+decodeURIComponent(data.auditElement)+'" tooltip data-placement="bottom">'+data.auditCode+'</span>'
                         			 }}),
         	                    
         	                    /*DTColumnBuilder.newColumn('auditElement').withTitle('Elements').renderWith(function(data){if(!data){return '-'}else{
         	                    	return data;
         	                    	}}),*/
             	                    
                                 DTColumnBuilder.newColumn('findingStatusDesc').withTitle('Status').renderWith(function(data){if(!data){return '-'}else{
                                 	return data;
     	                    	}}),
     	                    	
     	                    	DTColumnBuilder.newColumn('nextActionIdDesc').withTitle('Next Action').renderWith(function(data){if(!data){return '-'}else{
                                 	return data;
     	                    	}}),
     	                    	
     	                    	DTColumnBuilder.newColumn(null).withTitle('Due Date').renderWith(function(data){if(!data){return '-'}else{
     	                    	
     	                    	if(data.dueDate){
     	                    		return '<span ng-class="{dueDateGreen:dueDateGreen['+data.auditSeqNo+''+data.findingSeqNo+''+data.statusSeqNo+'],dueDateYellow:dueDateYellow['+data.auditSeqNo+''+data.findingSeqNo+''+data.statusSeqNo+'],dueDateRed:dueDateRed['+data.auditSeqNo+''+data.findingSeqNo+''+data.statusSeqNo+']}">'+data.dueDate+'</span>';
     	                    	}else{ return '-';} 
     	                    	}})
     	                    	
         	                    
         	                   ];
     		
    		carsrch.showBlock = true;
			
			$timeout(function(){
				carsrch.pagination=true;
			},100);
        		        	 
    	}	
    		
    	
    	
    	
    	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

    		
    		
    		if(aData.dueDate && moment(aData.dueDate,DDMMMYYYY).format(YYYYMMDD) > moment($filter('date')(new Date(), 'dd-MMM-yyyy'),DDMMMYYYY).format(YYYYMMDD)){
    			
    			$scope.dueDateGreen[aData.auditSeqNo+""+aData.findingSeqNo+""+aData.statusSeqNo] = true;
    			
    		}else if(aData.dueDate && moment(aData.dueDate,DDMMMYYYY).format(YYYYMMDD) < moment($filter('date')(new Date(), 'dd-MMM-yyyy'),DDMMMYYYY).format(YYYYMMDD)){
    			
    			$scope.dueDateRed[aData.auditSeqNo+""+aData.findingSeqNo+""+aData.statusSeqNo] = true;
    			
    		}else if(aData.dueDate && moment(aData.dueDate,DDMMMYYYY).format(YYYYMMDD) == moment($filter('date')(new Date(), 'dd-MMM-yyyy'),DDMMMYYYY).format(YYYYMMDD)){
    		
    			$scope.dueDateYellow[aData.auditSeqNo+""+aData.findingSeqNo+""+aData.statusSeqNo] = true;
    			
    		}
    		
            
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function(event) {
            	
        
            	
            	if(event.target.cellIndex == 0)
        		{
        			event.preventDefault();
        		}else{
        	    	$scope.showData(aData.auditSeqNo,aData.findingSeqNo,aData.auditTypeId, aData.categoryId);
        		}
            	
            
            });
            
            return nRow;
        }
    	
    	//Changed by @Ramya for Jira id -IRI-5006
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
    	
    	/******on click of any result vessel name******/
    	$scope.showData = function(auditSeqNo,findingSeqNo,auditTypeId,categoryId){
    		
    		/******put search Criteria to cookies******/
    		
    		sessionStorage.setItem('carSrchData', carsrch.searchCriteria );
    		
    		/******set some vaues in sessionStorage and use them in carDetails screen******/
            sessionStorage.setItem('carsrchAudSeqNo',auditSeqNo);
            sessionStorage.setItem('carsrchfindingNo',findingSeqNo);
            sessionStorage.setItem('carsrchAuditTypeId',auditTypeId);
    		
            sessionStorage.setItem('auditSeqNo',auditSeqNo);
    		sessionStorage.setItem('companyId',carsrch.companyId);
    		sessionStorage.setItem('auditTypeId',auditTypeId);
    		
            /**redirect to car details screen**/
    			
    		if(categoryId==1004){// || categoryId==1005
    			
    			$state.go('app.carMaintenance.carDetails',{},{reload:true});
    			
			}else{
				
				carMaintenanceFactory.checkAuditorAndNextAdtData(auditSeqNo,carsrch.companyId,sessionStorage.getItem('emailId'),findingSeqNo).$promise.then(function(res){
	    			
	    			console.log(res);
	    			
	    			if(res.status && res.auditorDetail.auditRoleID == 1001 && res.lockStatus!=3){
	    				
	    					if(res.auditFinding.findingStatus == 1){
	    						
	    						if(res.openAuditDetail && res.auditFinding.findingDetail[res.auditFinding.findingDetail.length-1].currentAuditSeq == res.openAuditDetail.auditSeqNo){
	    							
	    							sessionStorage.setItem('auditSeqNo',res.openAuditDetail.auditSeqNo);
	        						$state.go('app.audit.details',{'openForCar':true,'page':'prevFind'},{ reload: true });
	        						
	    						}else{
	    							$state.go('app.carMaintenance.carDetails',{},{reload:true});
	    						}
	    						
	    					}else{
	    						
	    						if(res.openAuditDetail){
	    							
	    							sessionStorage.setItem('auditSeqNo',res.openAuditDetail.auditSeqNo);
	        						$state.go('app.audit.details',{'openForCar':true,'page':'prevFind'},{ reload: true });
	        						
	    						}else{
	    							$state.go('app.audit.details',{'openForCar':true,'page':'currFind'},{ reload: true });
	    						}
	    						
	    					}
	    			}else{
	    				// $state.go('app.carMaintenance.carDetails',{},{reload:true});
						$state.go('app.audit.details',{'openForCar':true,'page':'currFind'},{ reload: true });			//changed by @Ramya for Jira is - IRI-5662
	    			}//else
	    		});
			}//else
    		
    	}//end of showData(auditSeqNo,findingSeqNo,auditTypeId,categoryId)
    	
    	 $timeout(function(){
    	if(carsrch.quickSearchDataVesselImoNo){ 	console.log(carsrch.quickSearchDataVesselImoNo);
    	carsrch.searchCriteria.vesselImoNoQuickSearch = carsrch.quickSearchDataVesselImoNo;
    	carsrch.searchCriteria.vesselImoNo = carsrch.quickSearchDataVesselImoNo;
	
    	carsrch.searchCriteria.auditTypeId = Number(carsrch.quickSearchDataAuditTypeId);
    	carsrch.searchCriteria.auditmodtype = Number(carsrch.quickSearchDataAuditTypeId);
    	carsrch.getAuditData(carsrch.searchCriteria.auditTypeId);
    	carsrch.search(0);
	     }
    	 },10);
    		
    }
    
})();