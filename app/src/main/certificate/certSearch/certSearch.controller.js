
(function (){
    'use strict';
   
    angular
        .module('app.certificate.search')        
        .controller('certificateSearchController', certificateSearchController); 
    
    function certificateSearchController(AppConstant,$state,DTOptionsBuilder,DTColumnBuilder, $q,$compile,$scope,certificateFactory,$cookies,$timeout,searchRequiredData,YYYYMMDD,MMMDDYYYY,masterFactory){
    	console.log(searchRequiredData)
    	/*********variable declaration start**********/
    	
    	var certSearch = this; console.log(certSearch);
    	
    	certSearch.AppConstant = AppConstant;
    	
    	certSearch.certSearchCriteria = {
    			certificateNo  : '',
    			companyImoNo : '',
    			certIssueDate  : '',
    			certExpireDate : '',
    			activeStatus   : '',
    			auditTypeId    : '',
    			auditSubTypeId : '',
    			vesselImoNo    : '',
    			checkCertVthAudit : 1001
    			
    	};
    	
    	$scope.pagination = {};
    	
    	certSearch.dtInstance = {};
    	
    	certSearch.showBlock = false;

        certSearch.vesselData        = searchRequiredData[0];
        
        certSearch.audtype           = searchRequiredData[1];
        
        certSearch.pageInitialCount = 1;
        
        certSearch.currentLimitPage = 10;
        
        certSearch.initialSelect = 1;
//        certSearch.audtype = certSearch.audtype.filter(function (obj){
//    		return (obj.auditTypeId != certSearch.AppConstant.SSP_TYPE_ID && obj.auditTypeId != certSearch.AppConstant.DMLC_TYPE_ID)
//    	});
//        
        certSearch.vesselCompanydata = searchRequiredData[2];
        
        certSearch.certificateNos    = searchRequiredData[3];

        certSearch.allAuditStatus    = searchRequiredData[4];
        
        certSearch.allAuditSubTypes  = searchRequiredData[5];
        
        certSearch.certificateNos    = searchRequiredData[6];
        
        certSearch.LatestAuditData   = searchRequiredData[7];
        
        certSearch.audsubtype = [];

        certSearch.audstatus  = [];
        
        certSearch.activeinactive=[{id:'1',value:'Active'},{id:'0',value:'Inactive'},{id:'2',value:'All'}];
        
        certSearch.checkCertifiate       = [{'checkCertVthAudit':1000,'certValue':'No'},{'checkCertVthAudit':1001,'certValue':'Yes'}];
        
        certSearch.certSearchCriteria.certificateIssuedType='1009';
        certSearch.certSearchCriteria.status='2';
        
        /*********variable declaration end**********/
    	
        /*********function declaration start**********/
        
        certSearch.search = search;
    	
    	certSearch.getCertSearchData = getCertSearchData;
    	
    	certSearch.getCertificateNos = getCertificateNos;
    	
    	certSearch.validateVessel    = validateVessel;
    	
    	certSearch.showData          = showData;
    	
    	certSearch.getAuditData      = getAuditData;
    	
    	certSearch.setVessel         = setVessel;
    	
    	certSearch.getCompanyImo     = getCompanyImo;
    	
    	certSearch.setDataTableData  = setDataTableData;
    	
    	certSearch.back              = back;
    	
    	certSearch.clear             = clear;
    	
    	certSearch.quickSearchDataVesselImoNo = sessionStorage.getItem('quickSearchDataVesselImoNo') ? sessionStorage.getItem('quickSearchDataVesselImoNo') :'';
    	
    	certSearch.quickSearchDataAuditTypeId = sessionStorage.getItem('quickSearchDataAuditTypeId') ? sessionStorage.getItem('quickSearchDataAuditTypeId') :'';
    	
    	certSearch.userRoleId = sessionStorage.getItem("userRoleId");	
    	
    	if(certSearch.userRoleId == certSearch.AppConstant.IHM_MANAGER_ROLE_ID){
        	certSearch.certificateIssuedType=[{id:'1002',value:'Full Term'},{id:'1003',value:'Extended(11.6 applies)'},{id:'1005',value:'ADDITIONAL ENDORSED'},{id:'1006',value:' RENEWAL ENDORSED(11.7 applies)'},{id:'1007',value:'RENEWAL ENDORSED(11.8 or 11.9 applies)'},{id:'1008',value:'REISSUE/ADMINISTRATIVE'},{id:'1009',value:'All'}];  //Changed by sudharsan for Jira-ID = 5464
        }else{
        	certSearch.certificateIssuedType=[{id:'1002',value:'Full Term'},{id:'1003',value:'Extension'},{id:'1005',value:'ADDITIONAL ENDORSED'},{id:'1004',value:'INTERMEDIATE ENDORSED'},{id:'1006',value:'RENEWAL ENDORSED(ISM PART B:13:12-13:14/ISPS 19.3.5-19.3.6)'},{id:'1007',value:'RENEWAL ENDORSED (ISM PART B 13:13 / ISPS 19.3.4 / MLC APPENDIX A5–II)'},{id:'1008',value:'REISSUE/ADMINISTRATIVE'},{id:'1009',value:'All'}];  //Changed by sudharsan for Jira-ID = 5469
        }

    	if(certSearch.userRoleId==certSearch.AppConstant.IHM_MANAGER_ROLE_ID){
    		certSearch.ihmAuthorise=true;	
    		certSearch.audtype = certSearch.audtype.filter(function( obj ) {
				console.log(obj)
    			return obj.auditTypeId == certSearch.AppConstant.IHM_TYPE_ID; //removed by sudharsan for Jira-ID = IRI-5553
        			   
				//Added by sudharsan missing type_id in admin

        	});
    	}else{
        masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){
        	console.log(res);
        	
        	
        	if(certSearch.userRoleId==certSearch.AppConstant.MANAGER_ROLE_ID || certSearch.userRoleId==certSearch.AppConstant.AUDITOR_ROLE_ID)
        	{ 	
        		 certSearch.audtype = certSearch.audtype.filter(function( obj ) {
        			 return  obj.auditTypeId != certSearch.AppConstant.SOPEP_TYPE_ID &&
        			 obj.auditTypeId != certSearch.AppConstant.STS_TYPE_ID &&
        			 obj.auditTypeId != certSearch.AppConstant.SMPEP_TYPE_ID &&
        			 obj.auditTypeId != certSearch.AppConstant.BWS_TYPE_ID &&
        			 obj.auditTypeId != certSearch.AppConstant.VOC_TYPE_ID &&
        			 obj.auditTypeId != certSearch.AppConstant.SDR_TYPE_ID &&
					 obj.auditTypeId != certSearch.AppConstant.COW_TYPE_ID &&   //added by kiran  on 28 Feb 2022
        			 obj.auditTypeId != certSearch.AppConstant.SSP_TYPE_ID &&
        			 obj.auditTypeId != certSearch.AppConstant.DMLC_TYPE_ID;   //Added by sudharsan on 21 Feb 2022
        		 });
        	}
    	
        if(certSearch.userRoleId==certSearch.AppConstant.ADMIN_ROLE_ID){
         	certSearch.ihmReviewr =false;
         	certSearch.ihmAuthorise=false;
            certSearch.audtype = certSearch.audtype.filter(function( obj ) { 
     			return  obj.auditTypeId != certSearch.AppConstant.SSP_TYPE_ID &&
     				    obj.auditTypeId != certSearch.AppConstant.DMLC_TYPE_ID&& //Added by sudharsan on 21 Feb 2022
						obj.auditTypeId != certSearch.AppConstant.SOPEP_TYPE_ID &&
						obj.auditTypeId != certSearch.AppConstant.STS_TYPE_ID &&
						obj.auditTypeId != certSearch.AppConstant.SMPEP_TYPE_ID &&
						obj.auditTypeId != certSearch.AppConstant.BWS_TYPE_ID &&
						obj.auditTypeId != certSearch.AppConstant.VOC_TYPE_ID &&
						obj.auditTypeId != certSearch.AppConstant.SDR_TYPE_ID &&
						obj.auditTypeId != certSearch.AppConstant.COW_TYPE_ID;  //Added by sudharsan for jira-id=iri-5497
         });
    	 }else{
        
        /* only ihm user*/
	    if(res && res.length>0 && res[0].ihmreview==1 && ( (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ismreview==0 || !res[0].ismreview)  ))
    	{ 	certSearch.onlyIhm = true;
    	certSearch.audtype = certSearch.audtype.filter(function( obj ) {
			return obj.auditTypeId == certSearch.AppConstant.IHM_TYPE_ID;
    	});
    	}
    	/* not Ihm*/
    	if(res && res.length>0 && ( ( res[0].ihmreview==0 || !res[0].ihmreview ) &&    (res[0].ismreview==1 || !res[0].ismreview ) && (res[0].mlcreview==1 || !res[0].mlcreview)  && (res[0].ismreview==1 || !res[0].ismreview)  )&& (res[0].roles.length >0 && res[0].roles[0].roleId != 1002))
    	{ 	
            console.log(certSearch);
			/**added by archana for jira ID- IRI-5523 start*/
			if (certSearch.userRoleId == 1004) {
				certSearch.audtype = certSearch.audtype.filter(function (obj) {
					if (obj.auditTypeId <= 1003)
						return certSearch.audtype = obj
				});
            } else {
				certSearch.audtype = certSearch.audtype.filter(function (obj) {
					return obj.auditTypeId != certSearch.AppConstant.IHM_TYPE_ID;
				});
			}
			/**added by archana for jira ID-IRI-5523  end*/
    	}
		/**For Observer Role Added by sudharsan for Jira-ID = IRI- 5714*/
		if (res && res.length>0 && res[0].roles[0].roleId == 1004) {
			certSearch.audtype = certSearch.audtype.filter(function (obj) {
					return (res[0].ihmreview ==1 && obj.auditTypeId == certSearch.AppConstant.IHM_TYPE_ID)?true: false ||
					(res[0].ismreview ==1 && obj.auditTypeId == certSearch.AppConstant.ISM_TYPE_ID )?true :false ||
					(res[0].mlcreview ==1 && obj.auditTypeId == certSearch.AppConstant.MLC_TYPE_ID)?true  :false ||
					(res[0].ispsReview ==1 && obj.auditTypeId == certSearch.AppConstant.ISPS_TYPE_ID )?true :false;
			});
		}
    	if(res && res.length>0 && res[0].ihmreview==1 || (res[0].roles.length >0 && res[0].roles[0].roleId == 1002))
    	{ 	certSearch.ihmReviewr = true;  certSearch.ihmAuthorise=true;		
    	}
    	 }
         	
    	});
    	}
        
    	/*********function declaration end**********/

        function getCertSearchData(pageNo){
    		
    		var certSearchBeanValues={
    				
        			'certificateNo' : certSearch.certSearchCriteria.certificateNo ? certSearch.certSearchCriteria.certificateNo : null,
        					
        			'certIssueDate' : certSearch.certSearchCriteria.certIssueDate ? moment(certSearch.certSearchCriteria.certIssueDate, MMMDDYYYY).format(YYYYMMDD) : null,
        					
        			'certExpireDate' :  certSearch.certSearchCriteria.certExpireDate ? moment(certSearch.certSearchCriteria.certExpireDate,MMMDDYYYY).format(YYYYMMDD) : null,
        			
        			'auditTypeId' : certSearch.certSearchCriteria.auditTypeId ? certSearch.certSearchCriteria.auditTypeId : null,
        					
        			'auditSubTypeId' : certSearch.certSearchCriteria.auditSubTypeId ? certSearch.certSearchCriteria.auditSubTypeId : null,
        			
        			'vesselImoNo' :  certSearch.certSearchCriteria.vesselImoNoQuickSearch ? certSearch.certSearchCriteria.vesselImoNoQuickSearch : certSearch.certSearchCriteria.vesselImoNo ? certSearch.certSearchCriteria.vesselImoNo.vesselImoNo : null,
        		        			
        			'companyImoNo' : certSearch.certSearchCriteria.companyImoNo ? certSearch.certSearchCriteria.companyImoNo.companyImoNo : null,
        			
        			'officialNo':	 certSearch.certSearchCriteria.officialNo ? certSearch.certSearchCriteria.officialNo:null,
        			
        			'certIssueId':certSearch.certSearchCriteria.certificateIssuedType!='1009'? certSearch.certSearchCriteria.certificateIssuedType:null,
        			
        			'companyId' : sessionStorage.getItem('companyId'),
        			
        			'pageNo' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null'? pageNo*sessionStorage.getItem('defaultSearchCount') : pageNo*5,
        			
        			'defaultSearchCount' : sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null' ? sessionStorage.getItem('defaultSearchCount') : 5,
        		
        			'activeStatus' :certSearch.certSearchCriteria.status!='2'?certSearch.certSearchCriteria.status:null,
        			
        			'checkCertVthAudit' : certSearch.certSearchCriteria.checkCertVthAudit ? certSearch.certSearchCriteria.checkCertVthAudit : 1001,
        					
        			'ihmAuthorise' :( certSearch.ihmAuthorise && certSearch.ihmAuthorise==true && !certSearch.onlyIhm) ? 1  : (certSearch.onlyIhm) ? 2 : 0,	
        					
        			'roleId' : certSearch.userRoleId ? certSearch.userRoleId: '',
    		};
    		
    		console.log(certSearchBeanValues)
    		return certSearchBeanValues;
		}
	  
	   function search(pageNo,type){
    		
    		certSearch.showBlock = false;
    		
    		certSearch.pagination = false;
    		
    		var roundedsets = null;
    		
    		var  remindersets = null;
    	
    		  masterFactory.getCurrentUserDetail(sessionStorage.getItem("emailId"),sessionStorage.getItem('companyId')).$promise.then(function(res){console.log(res);
    	    	/* only ihm user*/
    		    if(res && res.length>0 && res[0].ihmreview==1 && ( (res[0].ismreview==0 || !res[0].ismreview ) && (res[0].mlcreview==0 || !res[0].mlcreview)  && (res[0].ismreview==0 || !res[0].ismreview)  ))
    	    	{ 	certSearch.onlyIhm = true;
    	    	certSearch.audtype = certSearch.audtype.filter(function( obj ) {
    				return obj.auditTypeId == certSearch.AppConstant.IHM_TYPE_ID;
    	    	});
    	    	}
    	    	/* not Ihm*/
    	    	if(res && res.length>0 && ( ( res[0].ihmreview==0 || !res[0].ihmreview ) &&    (res[0].ismreview==1 || !res[0].ismreview ) && (res[0].mlcreview==1 || !res[0].mlcreview)  && (res[0].ismreview==1 || !res[0].ismreview)  )&& (res[0].roles.length >0 && res[0].roles[0].roleId != 1002))
    	    	{ 	
    	    		certSearch.audtype = certSearch.audtype.filter(function( obj ) {
    				return obj.auditTypeId != certSearch.AppConstant.IHM_TYPE_ID;
    	    	});
    	    	}
    	    	console.log("$scope.pagination.current % 10 "+ $scope.pagination.current % 10);
    	    	if(res && res.length>0 && res[0].ihmreview==1 || (res[0].roles.length >0 && res[0].roles[0].roleId == 1002))
    	    	{ 	certSearch.ihmReviewr = true;  certSearch.ihmAuthorise=true;}
    	    	
    	    	if(type){
    	    		var transferPageset = '';
    	    		if(type == 'next'){
    	    			if($scope.pagination.current && !($scope.pagination.current % 10)){
    	    				transferPageset = 'forword';
    	    	    	}
    	    		}
    	    		else if(type == 'prev'){
    	    			 if( $scope.pagination.current && $scope.pagination.current > 10 && ($scope.pagination.current % 10) == 1){
    	    				 transferPageset = 'backword';
    	    	    	}
    	    		}
        			if(type == 'search' || type == 'startPage'){
        		        certSearch.pageInitialCount = 1;
        		        
        		        certSearch.currentLimitPage = 10;
        		        
        		        certSearch.initialSelect = 1;
        		        pageNo = (certSearch.pageInitialCount*10) -10 ;
        			}
        			else if(type == 'backword' || transferPageset == 'backword' ){
        				
        				certSearch.pageInitialCount = certSearch.pageInitialCount - 1;
        				 certSearch.initialSelect  =  certSearch.initialSelect - 10;
        				 pageNo = type == 'prev' ? pageNo : certSearch.initialSelect -1 ;
        			}
        			else if(type == 'forword'  || transferPageset == 'forword' ){
        				
        				certSearch.pageInitialCount = certSearch.pageInitialCount + 1;
        				certSearch.initialSelect  =  certSearch.initialSelect + 10;
        				pageNo = certSearch.initialSelect - 1;

        			}
        			else if(type == 'endPage'){
        				
        				certSearch.pageInitialCount = $scope.pagination.ShowPages;
        				if($scope.pagination.totalPages < 10){
        					certSearch.initialSelect = 1;
        				}
        				else{
        				 certSearch.initialSelect  =  (certSearch.pageInitialCount * 10) + 1;
        				}
        				 pageNo = pageNo;
					     certSearch.pageInitialCount = certSearch.pageInitialCount+1; //added by archana for jira id-5443
        			}

        			 certSearch.currentLimitPage = certSearch.pageInitialCount*10;
        			 
        		}
        		
    	    	var certSearchBeanValues = certSearch.getCertSearchData(pageNo);
        		
        		certSearch.searchData = certSearchBeanValues;
        		
        		console.log(certSearchBeanValues)
        		

    			
        		$scope.pagination.current = pageNo+1;
        		
        		
              	certificateFactory.getCertSearchResultForIhm(certSearchBeanValues).$promise.then(function(res){
        			
        			$timeout(function() {
        				
        				certSearch.total = res.numOfRecords ? res.numOfRecords: 0;
        				
        			},0);
        			
        			
        			var defaultSearchCount = (sessionStorage.getItem('defaultSearchCount') && sessionStorage.getItem('defaultSearchCount') != 'null') ? sessionStorage.getItem('defaultSearchCount') : 10;
        			
        			$scope.pagination.totalItemCount = res.numOfRecords;
        			
        			$scope.pagination.totalPages = Math.ceil(Number(res.numOfRecords) / defaultSearchCount); 
        			
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
					 //added by archana for jira id-5443 start
					 if(remindersets < 5){
					 if(certSearch.pageInitialCount == roundedsets && remindersets){
						certSearch.lastPageCount = roundedsets+1;
					 }} else
					 if(certSearch.pageInitialCount == roundedsets){
						certSearch.lastPageCount = roundedsets;
					 }
	        		//added by archana for jira id-5443 end	        		
	        
	        		  if(type == 'endPage'){
	        				
	        			  $scope.pagination.ShowPagesMin =certSearch.initialSelect;
			        		 $scope.pagination.ShowPagesMax = $scope.pagination.totalPages;
	        			}
	        		  else {
	        			$scope.pagination.ShowPagesMin = certSearch.initialSelect;
	        			$scope.pagination.ShowPagesMax = $scope.pagination.totalPages < 10 ? $scope.pagination.totalPages : ($scope.pagination.ShowPagesMin+9 > $scope.pagination.totalPages ? $scope.pagination.totalPages :  $scope.pagination.ShowPagesMin+9);
	        		  }
	        
        			if($scope.pagination.totalPages == 0){
        				
        				$scope.pagination.current = 0;
        			}
        			
        			$scope.pagination.last = $scope.pagination.totalPages;
        			
        			
        			$timeout(function() {
            			
        				certSearch.toValue = certSearch.total > 0 ?  certSearch.searchData.pageNo : 0;
            			
            			certSearch.from = certSearch.total > 0 ?  (certSearch.searchData.pageNo+1) : 0;
        				
            		},0);
        			
        			$timeout(function() {
            			
        				certSearch.to = (res.result.length > 0) ? (certSearch.toValue + res.result.length) : 0 ;
        				
            		},0);
        			certSearch.check=res.result;
        			certSearch.check.forEach(function(a){ console.log(a);  if(a.auditTypeId==certSearch.AppConstant.IHM_TYPE_ID){
        					 var auditSubTypeIhm = (a.auditSubTypeId ==certSearch.AppConstant.INTERIM_SUB_TYPE_ID) ? 1006 : (a.auditSubTypeId ==certSearch.AppConstant.INITIAL_SUB_TYPE_ID) ? 1007 :'';
        					 a.audSubTypeDesc=certSearch.AppConstant.AUDIT_SUB_TYPE[auditSubTypeIhm].SUB_TYPE_DESC_IHM ;	 
        				 }else{
        					 a.audSubTypeDesc= certSearch.AppConstant.AUDIT_SUB_TYPE[a.auditSubTypeId].SUB_TYPE_DESC;
        				 }
        				
                      }); 
        			certSearch.setDataTableData(res.result);
        		});
        		
        		sessionStorage.setItem('certCurrPageNo',$scope.pagination.current);
    	    	});
    		  
    		
    	}

        /***** for getting audit data *****/
        function getAuditData(auditTypeId){
            
            certSearch.audsubtype = certSearch.allAuditSubTypes.filter(function( obj ) {
            
                return obj.auditTypeId == auditTypeId;
            });
           
        } 
    	
    	$scope.range = function(minlen,maxlen){
    		
    		var count = [];
    		
    		for (var i = minlen; i <= maxlen; i++) {
    			
    			count.push(i);
    			
    		}
    		
    		return count;    		
    	}


       function validateVessel(val,param){
    	  
    	   
    	   console.log(param);
            if(param=='IMO' && val){
                if(!val.vesselImoNo){
                    certSearch.certSearchCriteria.vesselImoNo = '';
                }
            }else if(param=='VES' && val){
                if(!val.vesselName){
                    certSearch.certSearchCriteria.vesselName = '';
                }
            }else if(param=='COM' && val){
                if(!val.companyImoNo){
                    certSearch.certSearchCriteria.companyImoNo = '';
                }
            }else if(param=='CERT' && val){
            	
            	console.log(certSearch.certificateNos.indexOf(val));
                if(certSearch.certificateNos.indexOf(val)==-1){
                    certSearch.certSearchCriteria.certificateNo = '';
                }
            }
            
        }

        function setVessel(item){
            
            certSearch.certSearchCriteria.vesselImoNo = {'vesselImoNo':item.vesselImoNo};
            
            certSearch.certSearchCriteria.vesselName = {'vesselName':item.vesselName};
            
        }
        
        function getCompanyImo(val){
        	
            var tempArray = [];
            
            if(val=='*'){
                tempArray = certSearch.vesselCompanydata;
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
                  
                  certSearch.vesselCompanydata.forEach(function(a){
                        if(a.companyImoNo.indexOf(val)>-1){
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


	function setDataTableData(data){
   
		var defer = $q.defer();
		
		defer.resolve(data);  
		
		certSearch.dtOptions = DTOptionsBuilder.fromFnPromise(defer.promise)
		
    	.withDOM('<<"tableinside"t>>').withOption('deferRender', true)
    	
        .withOption('rowCallback', rowCallback)
        
        .withDisplayLength(25)
        
       // .withOption('scrollY', 280)
        
        .withOption('responsive', true)
        
        .withOption('createdRow', function (row, data, dataIndex) {
        	
        	$compile(angular.element(row).contents())($scope);
        	
        });
		
		
		
certSearch.dtColumns = [
                        
	                      
                        DTColumnBuilder.newColumn('auditTypeDesc').withTitle('Certificate Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
               			 return data;
               		}}),
  	                    
               	    
                    DTColumnBuilder.newColumn('audSubTypeDesc').withTitle('Certificate Sub Type').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
           		
                    return data;	
           		}}),
           		
	                    DTColumnBuilder.newColumn('certificateNo').withTitle('Certificate No.').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
                            return data;
                        }}),
	                    
                        DTColumnBuilder.newColumn('certIssueDesc').withTitle('Term').withOption('width', '8%').renderWith(function(data){if(!data){return '-'}else{
                  			 return data;
                  		}}),
     	                    
                        
                        
	                    DTColumnBuilder.newColumn(null).withTitle('Issue Date').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
	                  
	                    	
	                    	 if(data.certIssueId=='1008' || data.certIssueId=='1003')
	                    		{
	                    		data=data.extendedIssueDate?moment(data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    		}
	                    	else
	                    		{
	                    		data=data.certIssueDate?moment(data.certIssueDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    		}
               			 return data;
	                    	
                            //return (data.certIssueDate?moment(new Date(data.certIssueDate),YYYYMMDD).format(MMMDDYYYY):'--');
                         }}),
	                    
	                    DTColumnBuilder.newColumn(null).withTitle('Expiry Date').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
	                    	 if(data.certIssueId=='1008')
	                    		{
	                    	//	data=data.extendedExpireDate?moment(new Date(data.extendedExpireDate),YYYYMMDD).format(MMMDDYYYY):'--';
	                    		 data=data.extendedExpireDate?moment(data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    		}
	                    	else
	                    		{
	                    		data=data.certExpireDate?moment(data.certExpireDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    		}
                			 return data;
	                    	
	                    	//return (data.extendedExpireDate?moment(new Date(data.extendedExpireDate),YYYYMMDD).format(MMMDDYYYY):'--');
	                    }}),
	                    
	                   /* DTColumnBuilder.newColumn('activeStatus').withTitle('Status').renderWith(function(data){
	                    	if(data==0){return 'INACTIVE';} else if(!data){return '-';}else{return 'ACTIVE';}
	                    	
	                    	}),*/
	                    
	                   /* DTColumnBuilder.newColumn('auditTypeDesc').withTitle('Type').renderWith(function(data){if(!data){return '-'}else{
                			 return data;
                		}}),*/
	                    
                		 DTColumnBuilder.newColumn(null).withTitle('Extended Date').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
 	                    	
                			 if(data.certIssueId=='1008') {
	                    		data='--';	                    	
	                    	} 
                			 else if(data.certIssueId=='1003' || data.certIssueId=='1006' || data.certIssueId=='1007'){
                				 data=data.extendedExpireDate?moment(data.extendedExpireDate,YYYYMMDD).format(MMMDDYYYY):'--';
                			 }
                			 else {
	                    		data=data.extendedIssueDate?moment(data.extendedIssueDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    	}
                			return data;
                			// return (data.certIssueId!='1008' ? moment(data,YYYYMMDD).format(MMMDDYYYY):'-');
                 		}}),
                 		
                 		/* DTColumnBuilder.newColumn('auditTypeDesc').withTitle('Certificate Status').renderWith(function(data){if(!data){return '-'}else{
                  			 return data;
                  		}}),*/
                  		
                  		 DTColumnBuilder.newColumn(null).withTitle('Certificate Status').notSortable().withOption('width', '4%').renderWith(function(data){if(!data){return '-'}else{
                  			var statusActive;
                  			 if(data.auditSummaryId==certSearch.AppConstant.NOT_APPROVED_SUMMARY){
                  				statusActive = 'Inactive';
                  				data.getExactActiveStatus = 0;
                  			 }
                  			 else
                  				statusActive = (Number(data.getExactActiveStatus) == Number(1))?'Active':'Inactive';
                 			return '<span><i class="fa fa-circle" ng-class="{red:'+data.getExactActiveStatus+'=='+0+',green:'+data.getExactActiveStatus+'=='+1+'}" data-toggle="tooltip" data-original-title="'+statusActive+'" tooltip data-placement="right"></i></span>';
 	                    }}),
                  	
                  		 DTColumnBuilder.newColumn(null).withTitle('Intermediate Endorsement ').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
  	                    	
                  			 if(data.certIssueDesc=='INTERMEDIATE ENDORSED')
  	                    		{
  	                    		data=data.endorsedDate?moment(data.endorsedDate,YYYYMMDD).format(MMMDDYYYY):'--';
  	                    	
  	                    		}
  	                    	else
  	                    		{
  	                    		data='--';
  	                    		}
                  			 return data;
                  		}}),
                  		
                  		 DTColumnBuilder.newColumn(null).withTitle('Additional Endorsement').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
                  			if(data.certIssueDesc=='ADDITIONAL ENDORSED')
	                    		{
                  				data=data.endorsedDate?moment(data.endorsedDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    
	                    		}
	                    	else
	                    		{
	                    		data='--';
	                    		}
              			 return data; 
                  		
                  		}}),
                  		
                  		 DTColumnBuilder.newColumn(null).withTitle('Renewal Endorsement').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
  	                
                  			if(data.certIssueId==1007 || data.certIssueId==1006)
	                    		{
                  				data=data.endorsedDate?moment(data.endorsedDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    		
	                    		}
	                    	else
	                    		{
	                    		data='--';
	                    		}
              			 return data; 
                  		
                  		}}),
                  		
                  		 DTColumnBuilder.newColumn(null).withTitle('Extension Endorsement').withOption('width', '9%').renderWith(function(data){if(!data){return '-'}else{
   	                   
                  			if(data.certIssueDesc=='EXTENSION')
	                    		{
                  			
                  				data=data.extendedEndorsedDate?moment(data.extendedEndorsedDate,YYYYMMDD).format(MMMDDYYYY):'--';
	                    	
	                    		}
	                    	else
	                    		{
	                    		data='--';
	                    		}
              			 return data; 
                  		
                   		}}),
                   		
                  		
	                    DTColumnBuilder.newColumn('vesselName').withTitle('Vessel Name').withOption('width', '7%').renderWith(function(data){if(!data){return '-'}else{
	                    	return data;
	                    }}),
	                    
	                    DTColumnBuilder.newColumn('vesselImoNo').withTitle('Vessel IMO No.').withOption('width', '6%').renderWith(function(data){if(!data){return '-'}else{
                			return data;
	                    }}),
	                    DTColumnBuilder.newColumn('officialNo').withTitle('Official No.').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
                			return data;
	                    }}),
	                    DTColumnBuilder.newColumn('companyImoNo').withTitle('Company IMO No.').withOption('width', '5%').renderWith(function(data){if(!data){return '-'}else{
                			return data;
	                    }})
	                    
                	];
		
		certSearch.showBlock = true;
		
		
		$timeout(function() {
			certSearch.pagination=true;
		},0);
    	
	}
    	
    	function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function(event) {
            	
            	certSearch.showData(aData.auditSeqNo, aData.companyId, aData.utn, aData.seqNo, aData.activeStatus, aData.generateStatus, aData.auditTypeId,aData.socType);
            	
            });
            
            return nRow;
        }
    	
    	function showData(auditSeqNo,companyId,utn,seqNo,activeStatus,generateStatus,auditTypeId,socType){
    		
    		sessionStorage.setItem('certAuditSeqNo',auditSeqNo);
    		sessionStorage.setItem('certCompanyId',companyId);
    		sessionStorage.setItem('certUTN',utn);
    		sessionStorage.setItem('certSeqNo',seqNo);
    		sessionStorage.setItem('certActiveStatus',activeStatus);
    		sessionStorage.setItem('certGenerateStatus',generateStatus);
    		sessionStorage.setItem('certificateSeachType','Search');
    		
    		var searchData = certSearch.searchCriteria;
    		
            sessionStorage.setItem('certSrchData', certSearch.searchData);
            
            sessionStorage.setItem('certificateSeachTypes','Search');
    		if(auditTypeId == certSearch.AppConstant.IHM_TYPE_ID){
    			if(socType == 'exe'){
    				$state.go('app.certificate.detailsihmExe',{'certificate':'Search'},{ reload: true });
    			}else{
    			$state.go('app.certificate.detailsihm',{'certificate':'Search'},{ reload: true });
    			}
    		}else{
            $state.go('app.certificate.details',{'certificate':'Search'},{ reload: true });
    		}
    	}
    	
    	$timeout(function(){ 	
			if($state.params.currPageNo != null){/* commenting because quick search Functiolity 
				
				if(sessionStorage.getItem('certSrchData')){
					
					if(sessionStorage.getItem('certSrchData').auditTypeId){
						certSearch.getAuditData(sessionStorage.getItem('certSrchData').auditTypeId);
					}
					
					certSearch.certSearchCriteria = sessionStorage.getItem('certSrchData');
					certSearch.certSearchCriteria.vesselImoNo= certSearch.certSearchCriteria.vesselImoNo ? {'vesselImoNo' : certSearch.certSearchCriteria.vesselImoNo}:'';
					if(certSearch.certSearchCriteria.vesselImoNo.vesselImoNo){
						certSearch.certSearchCriteria.vesselName = {'vesselName':''};
						certSearch.certSearchCriteria.vesselName.vesselName =  _(certSearch.vesselData).chain().where({'vesselImoNo':certSearch.certSearchCriteria.vesselImoNo.vesselImoNo}).pluck('vesselName').toString();
					}
				}
				
				certSearch.search(Number($state.params.currPageNo)-1); */
			}
		},100);
    	
    	function back(){
    		
    		$state.go('app.dashboard',{},{reload:true});
    	}
    	
        function clear(){ 
        
            certSearch.certSearchCriteria = {}; 
            
            certSearch.showBlock = false;
            
            certSearch.pagination = false;
        }
        
       function getCertificateNos(val){
    		
    		var tempArray = [];
    		
    		if(val=='*'){
    			
    			tempArray = certSearch.certificateNos;
    			
    		}else{
    			
    			  tempArray = _.filter(certSearch.certificateNos, function(a){
       									return a.indexOf(val)>-1;
       	        				});
    		}
    		
    		return tempArray;
    	}
       
    $timeout(function(){
	 if(certSearch.quickSearchDataVesselImoNo){ 	
		certSearch.certSearchCriteria.vesselImoNoQuickSearch = certSearch.quickSearchDataVesselImoNo;
		certSearch.certSearchCriteria.vesselImoNo = certSearch.quickSearchDataVesselImoNo;
	
		certSearch.certSearchCriteria.auditTypeId = Number(certSearch.quickSearchDataAuditTypeId);
		certSearch.getAuditData(certSearch.certSearchCriteria.auditTypeId);
		certSearch.search(0);
	  }
       },10);
    	
    	
    }   
    
})();