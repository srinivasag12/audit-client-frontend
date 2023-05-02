(function (){
	
    'use strict';
    
    angular.module('app.audit.common', []).constant('_', window._).run(function ($rootScope,toaster,ModalService,$cookies,MMMDDYYYY,YYYYMMDD,HHmm,$timeout,blockUI,AppConstant) {
    	
    	$rootScope._ = window._; var clickFlag = true;
    	
    	_.fileUpload = function(obj,prIndex,index){
    		
    		var fileData = obj[prIndex].findingDetail[index].findFileData;
    		    		
    		if(fileData){
    			
    			blockUI.start("uploading attachment ");
    			
    			var reader = new FileReader();
    			
    			var binary = "";
    			
    			var count = fileData.name.lastIndexOf(".");
    			
    			var fileName = fileData.name.slice(0,count);
    			
    			if(fileName.length>70){
    				
    				blockUI.stop();
    				toaster.warning("File name should be less than 70 characters");
    				return;
    			}    				
    			
    			var validName = _.findIndex(obj[prIndex].findingDetail[index].findingRptAttachs,{'fileName': fileData.name});
        			
    			reader.onload = function(readerEvt) {
        			
        			if(validName == -1){
        				
        				var binaryImage = readerEvt.target.result;
            			
            			var bytes = new Uint8Array(reader.result);
            			
            			var length = bytes.byteLength;
            				
            			for (var i = 0; i < length; i++) {
            				
            				binary += String.fromCharCode(bytes[i]);
            					
            			}
            			                			
            			obj[prIndex].findingDetail[index].findingRptAttachs.push(
            					{	
            						"fileName":fileData.name ? fileData.name : '',
            						
            						"findingFileByte":binary?binary:null,
            						//"findingFileByte" : binary?btoa(binary):null,
            						
            						"fileSeqNo" : obj[prIndex].findingDetail[index].findingRptAttachs.length+1,
            						
        							"ownerFlag" : 0,

        	        				"userIns" : (sessionStorage.getItem("emailId")).toString(),
        	                				
        	                		"dateIns" : moment(new Date()).format(YYYYMMDD),
        	                		
        	                		"findingSeqNo" : obj[prIndex].findingDetail[index].findingSeqNo,
        	                		
        	                		"origAuditSeqNo" : obj[prIndex].findingDetail[index].origAuditSeqNo,
        	                		
        	                		"currentAuditSeq" : obj[prIndex].findingDetail[index].currentAuditSeq,
        	                		
        	                		"companyId" : obj[prIndex].findingDetail[index].companyId,
        	                		
        	                		"statusSeqNo" : index+1,
        	                		
        	                		"auditTypeId" : obj[prIndex].findingDetail[index].auditTypeId
        	                	}
            				);
                			
            			$timeout(function(){
            				blockUI.stop();
            			},1000);            			
                		        				
        			}else{
        				
        				$timeout(function(){
        					blockUI.stop();
        					
        					toaster.warning(fileData.name+" file name already Exists");	
        				},1000);
        				
        			}       			
        				            				     				    				       				  
        		};
        			
        		reader.readAsArrayBuffer(fileData);
    			
    		}
    		
    			
    	}
    	  
    	_.countFindingCategory = function(obj,auditTypeId,param,categoryArray){
    		
    		var major = 0, minor = 0, obs = 0, reviewNote = 0; 		
    		obj.forEach(function(a){
	
    			if(a.findingDetail[0].categoryId == AppConstant.MAJOR_FINDING_CATEGORY){
    				major++;
    			}else if(a.findingDetail[0].categoryId == AppConstant.MINOR_FINDING_CATEGORY){
    				minor++;
    			}else if(a.findingDetail[0].categoryId == AppConstant.OBS_FINDING_CATEGORY){
    				obs++;
    			}else if(a.findingDetail[0].categoryId == AppConstant.REVIEW_NOTE){
    				reviewNote++;
    			}
    			
    		});
    		var findingCategoryCount = {
    				'majorCount'      : major,
    				'minorCount'      : minor,
    				'obsCount'        : obs,
    				'reviewNoteCount' : reviewNote,
    				'auditTypeId'     : auditTypeId,
    				'param'           : param,
    				'categoryArray'   : categoryArray
    		};
	
    		$rootScope.$emit('setCountFindingCategory',findingCategoryCount);
	
    		return 	findingCategoryCount;
    	}
    	
    	/*_.countFindingCategory = function(newFind,prevFind,auditTypeId,param){ 
	
    		var major = 0, minor = 0, obs = 0, reviewNote = 0, prevFindingCategoryCount = {"majorCount":0,"minorCount":0};
    		
    		newFind.forEach(function(a){
	
    			if(a.findingDetail[0].categoryId == AppConstant.MAJOR_FINDING_CATEGORY){
    				major++;
    			}else if(a.findingDetail[0].categoryId == AppConstant.MINOR_FINDING_CATEGORY){
    				minor++;
    			}else if(a.findingDetail[0].categoryId == AppConstant.OBS_FINDING_CATEGORY){
    				obs++;
    			}else if(a.findingDetail[0].categoryId == AppConstant.REVIEW_NOTE){
    				reviewNote++;
    			}
    		});
    		
    		var newFindCategoryCount = {
    				'majorCount'      : major,
    				'minorCount'      : minor,
    				'obsCount'        : obs,
    				'reviewNoteCount' : reviewNote,
    		};
    		
    		if(param != "CURR"){
    			major = 0, minor = 0;
    			prevFind.forEach(function(a){
        			
        			if(a.findingDetail[0].categoryId == AppConstant.MAJOR_FINDING_CATEGORY){
        				major++;
        			}else if(a.findingDetail[0].categoryId == AppConstant.MINOR_FINDING_CATEGORY){
        				minor++;
        			}
        		});
        		
    			prevFindingCategoryCount = {
        				'majorCount'      : major,
        				'minorCount'      : minor
        		};
    			$rootScope.$emit('setCountFindingCategory',newFindCategoryCount,prevFindingCategoryCount,auditTypeId);
    			return prevFindingCategoryCount;
    		}else{
    			$rootScope.$emit('setCountFindingCategory',newFindCategoryCount,prevFindingCategoryCount,auditTypeId);
    			return newFindCategoryCount;
    		}    		    		
    		
    	}*/
    	
    	_.validateVesselImo = function(obj,srcArray,alias,key){
    		
    		if(!(obj && obj.vesselImoNo)){
    			alias[key]='';
    		}
    	}
    	
    	_.validateTypeAheadName = function(array,index,key,relaKey){
    		
    		if(!array[index][relaKey]){
    			array[index][key]='';
    		}
    	}
    	
    	_.validateTypeAhead = function(obj,index,key,val,modelName){
        	
    		if(val){
    			
    			if(!val[key]){
    				
    				if(key == 'vesselImoNo'){
    					
    					obj[modelName] = '';
    					    					
    					return obj = [];
    					
    				}else{
    					
    					obj[index][modelName] = '';
    				}
    			}else{
    				return obj;
    			}
    		}
    	}
    	
    	_.validateTypeAheadAuditCode = function(obj,index,key,val,srcArray,relaKey){
        	
    		if(val){
    			
    			if(!val[key]){
    				
    				var tempArray = _.filter(srcArray, function(object){ 
    					return object[key]==val;
    				});
    				
    				if(tempArray.length < 1 || !obj[index][relaKey]){
    					obj[index][key]='';
    				}
    			}
    		}
    	}
    	
    	_.addAuditorRow = function(arr){
			
    		arr.push({
				
    			'check' : false,
    			
    			'userId' : '',
    			
    			'auditorName' : '',
    			
    			'auditRoleID' : '',
    			
    			'auditRoleDesc' : '',
    			
    			'audSignature':'',
    			
    			'audLeadStatus':0,
    			
    			'companyId' : sessionStorage.getItem('companyId'),
    			
    			'userIns' : (sessionStorage.getItem('emailId')).toString(),
				
				'dateIns' : moment(new Date()).format(YYYYMMDD),
				
				'delegateSign':0,
				
			});
    		
    	}
    	
    	
    	_.deleteRows = function(arr,key){
    		
    		var tempArray = [], flag = false;
    		
    		arr.forEach(function(a){
    			
    			if(a[key] == true){
    				
    				flag = true;
    				
    			}
    			
    		});
    		
    		if(flag == true){
    			
    			arr.forEach(function(a){
    				
        			if(a[key] == false){
        				
        				tempArray.push(a);
        				
        			}
        			
        		});
    			
    			return tempArray;
    			
    		}else{
    			
    			toaster.warning('Please select atleast one row for delete');
    			
    			return arr;
    			
    		}
    	}
    	
    	_.getAuditCodes = function(val,param,auditCodeArray){
 			
    		var tempArray = [];
 			
    		if(val=='*'){
    			
    			tempArray = auditCodeArray;
    			
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
    				    				
    				var re = new RegExp(val, 'i');
    				
    				auditCodeArray.forEach(function(a){ 
        			
    					if(a[param].match(re)){
    						
    						a.auditElements = decodeURIComponent(a.auditElements);
        				
    						tempArray.push(a);
    					}
    				});
    			 
    			}catch(err){
    				
    				tempArray = [];
    				
    			}
    		}
    		
    		return tempArray;
    	}
    	
    	_.downloadFiles = function(blob,fileName){
    		
    	    if (window.navigator.msSaveOrOpenBlob) { // For IE:
    	    	navigator.msSaveBlob(blob, fileName);
    	        
    	    } else { // For other browsers:   
    	    	
    	        var link = document.createElement('a');
    	        link.style = 'display: none'; 
    	        link.href = window.URL.createObjectURL(blob);  
    	        document.body.appendChild(link);
    	        link.download = fileName;    
    	        
    	        link.click();
    	        setTimeout(function(){
    	            document.body.removeChild(link);
    	            window.URL.revokeObjectURL(link.href);  
    	        }, 1000);  
    	    
    	    }
    	}
    	
    	
    	_.getVesselName = function(val,srcArray){
    		
    		var tempArray = [];
    		if(val=='*'){
    			tempArray = srcArray;
    		}else{
    			
    			try{  
    				var test = val;
    				if(val.indexOf('@')>-1 || val.indexOf('$')>-1){
    					throw 'not';
    				
    				}else if(test.replace(/[^*]/g, '').length>1){
    					
    					throw 'not';
    				
    				}else if(val.indexOf('*')>0){
    					if(val.indexOf('*')!=val.length-1){
    						throw 'not';
    					}
    					val = val.substring(0,val.indexOf('*'));
    				}
    				
    				var re = new RegExp(val, 'i');
    				
    				tempArray = _.filter(srcArray, function(obj){ 
    					return obj.vesselName.match(re);
    				});
    			 
    			}catch(err){
    				
    			  tempArray = [];
    			}
    	}
    		
    		return tempArray;
    		
    	}
    	
    	_.getVesselImo = function(val,srcArray){
    		var tempArray = [];
          	 
    		if(val=='*'){
   				
    			//tempArray = srcArray;
   				
    		}else if(val.length>2){
   				
    			tempArray = _.filter(srcArray, function(vessel){
    				return (vessel.vesselImoNo).toString().indexOf(val)>-1 && (vessel.activeStatus)==1;
    			});
    		}
    		
    		return tempArray;
    	}
    	
    	_.getLatestVesselImo = function(val,srcArray,vesselData){
    		var tempArray = srcArray;
    		var tempArray1 = [];
    		var tempArray2 = [];
    		if(val=='*'){
   				
    			//tempArray = srcArray;
   				
    		}else if(val.length>2){
    			
    			tempArray2 = srcArray;
    			tempArray1 = _.filter(vesselData, function(vessel){
    				return (vessel.vesselImoNo).toString().indexOf(val)>-1 && (vessel.activeStatus)==1;
    			});
    			tempArray=tempArray2.concat(tempArray1);
    		}

    		var tempArray2 = tempArray.filter(function(item, pos) {
    		    return tempArray.indexOf(item) == pos;
    		});
    		
    		var tempArray2 = _.uniq(tempArray, 'vesselImoNo');
    		return tempArray2;
    	}
    	
    	
    	
    	/********** date field validation **********/    	
    	_.dateValidation = function(val,id,minDate,maxDate,firstIntermeadite,auditSubTypeId,auditTypeId){
    		//det.auditDetail.certIssueDate,'ihmpart1IssueDate',det.minIssueDate,det.maxIssueDate,'','',det.auditTypeId 
    		  
    		$('#'+val).focus();
    		
    		var flag = true,msg='',msg2='';
			
    		var toastMsg = '';
    		
    		switch (id) {
			case 'auditdate':				
				toastMsg = 'Audit';				
				break;
			case 'issuedate':
				toastMsg = 'Certificate Issue';
				break;
			case 'expirydate':
				toastMsg = 'Certificate Expiry';
				break;
			case 'auditinternal':
				toastMsg = 'Internal Audit';
				break;
			case 'openmeet':
				toastMsg = 'Opening Meeting';
				break;
			case 'closemeet':
				toastMsg = 'Closing Meeting';
				break;
			case 'receiptdate':
				toastMsg = 'Reciept';
				break;
			case 'ispsexpirydate':
				toastMsg = 'ISPS Expiry';
				break;
			case 'sspissuedate':
				toastMsg = 'Issue';
				break;
			case 'revcmpdate':
				toastMsg = 'Review Completion';
				break;
				
			case 'creditDate':
				toastMsg = 'creditDate ';
				break;
				
			case 'ihmpart1IssueDate':
				toastMsg = 'IHM Part I Issue Date';
				break;
				
			case 'addSurvDueDate':
				toastMsg = 'Additional Survey Due Date';
				break;
				
			}
    		
	    	
			
    		 
    		if(auditTypeId==1003){
    			toastMsg='Inspection'
    		}
    		
    		//If not IHM
    		if(auditTypeId !=1006 ){
	    		if(firstIntermeadite && auditSubTypeId==1003){
	    		 msg='Please select ' +toastMsg+' Date. It should be greater than the previous '+toastMsg+'`s first Anniversary Date: '+ moment(minDate,YYYYMMDD).format(MMMDDYYYY);
	    		}else {  
	    		 msg=toastMsg+' Date  should be greater than or equal to '+ moment(minDate,YYYYMMDD).format(MMMDDYYYY);
	    		}
    		
	    		if(auditSubTypeId==1003){
	    			 msg2='Please select ' +toastMsg+' Date. It should be less than the  '+toastMsg+'`s fourth Anniversary Date: '+ moment(maxDate,YYYYMMDD).format(MMMDDYYYY);	
	    		}else { msg2 = toastMsg+' Date  should be less than or equal to '+ moment(maxDate,YYYYMMDD).format(MMMDDYYYY);}
    		
    		}
    		
    		//If it is IHM
    		if(id == 'ihmpart1IssueDate' && auditTypeId ==1006 ){
    			return moment(val,MMMDDYYYY).format(MMMDDYYYY);
    		}
    		
    		 if( auditTypeId == 1006 &&  auditSubTypeId == 1002 && val.length == 0 && id=='addSurvDueDate'){
					 return 'N.A';
				 }
    	
    		if(val && (val.toUpperCase() == (moment(val,MMMDDYYYY).format(MMMDDYYYY)).toUpperCase() || val.toUpperCase() == (moment(val,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm)).toUpperCase() )){
    			
 				if(minDate){ 
 					
 					if(moment(val,MMMDDYYYY).format(YYYYMMDD) < moment(minDate,YYYYMMDD).format(YYYYMMDD)){
 						
 						$timeout(function(){
	    					$('#'+id).focus();
	    					toaster.warning(msg);
	     				},1);
 						
 						flag = false;
 					}
 				}
 				
 				if(maxDate && flag){
 					
 					if(moment(val,MMMDDYYYY).format(YYYYMMDD) > moment(maxDate,YYYYMMDD).format(YYYYMMDD)){
 						
 						$timeout(function(){
	    					$('#'+id).focus();
	    					toaster.warning(msg2);
	     				},1);
 					}
 				}
 				
 				if(id == 'openmeet' || id == 'closemeet' || id == 'receiptdate' || id == 'revcmpdate' ){
 					return moment(val,MMMDDYYYY+HHmm).format(MMMDDYYYY+HHmm);
 				}else{
 					return moment(val,MMMDDYYYY).format(MMMDDYYYY);
 				}	 
 				
 			 				
 			}else if(val && clickFlag){
 				 
 				 if( auditTypeId == 1006 &&  auditSubTypeId == 1002 && (val == 'N.A') && id =='addSurvDueDate'){
 					 return 'N.A';
 				 }else{
 				  clickFlag = false;
 				 				 				
 				ModalService.showModal({
 	    			
 	    			templateUrl : 'src/modals/warning.html', 
 	    			
 	    			controller  : "warningController as warn",
 	    			
 	    			inputs		: {data:'Please Enter Correct Date'},
 	    		
 	    		}).then(function(modal) {
 	    			
 	    			modal.element.modal();
 	    			
 	    			modal.close.then(function(result) {
 	    				if(result == 'YES'){
 	    					clickFlag = true;
 	    				}				
 	    			});
 	    			
 	    		}); 		
 				
 				$timeout(function(){
 					$('#'+id).focus();
 				},0);
 				
 				if(auditTypeId == 1006 &&  auditSubTypeId == 1002 && id=='addSurvDueDate'){
 					return '';
 				}else{
 					return  val;
 				}
 				
 			 }
 			}
				
 			
 		}
    	
    	
    });

})();