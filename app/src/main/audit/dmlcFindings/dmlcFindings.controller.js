
(function (){
    'use strict';

    angular
        .module('app.audit.dmlcfindings')        
        .controller('DmlcFindingsController', DmlcFindingsController); 
    
    function DmlcFindingsController(ModalService,$rootScope,broadcastService,$window,$state,prevFindingsFactory,$timeout,masterData,AppConstant,CarFlowStructure,auditFactory,$scope,blockUI,MMMDDYYYY,YYYYMMDD,DDMMMYYYY,HHmm,toaster,$cookies,auditType,detailsFactory){
    	
		var dfind 						= this;  
		
		dfind.showSwitch                = true;
    
		dfind.AppConstant 				= angular.copy(AppConstant);
		
		dfind.CarFlowStructure 			= CarFlowStructure;
		
		dfind.auditTypeId  				= 1005;
        
		dfind.inspectionAudit			= dfind.auditTypeId==dfind.AppConstant.DMLC_TYPE_ID?'INSPECTION':'AUDIT';
		
		dfind.auditType					= 'Review';
		
		dfind.auditauditType            = 'DMLC II';
		
		dfind.auditSeqNo   				= parseInt($window.sessionStorage.getItem('auditSeqNo'));
		
		dfind.companyId    				= $window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '';

		dfind.obsCategoryOptions 		= masterData.obsCategory;
        
		dfind.obsStatusOptions 			= masterData.obsStatus;
        
		dfind.auditCodeArray 			= masterData.auditCodes;
		
        dfind.auditHome 				= auditHome;
        
        dfind.nextActionChangePrev		= nextActionChangePrev;
        
        dfind.observationarrayprevious	= [];
        
        dfind.allowNext 				= 0;
        
        dfind.addCategory 				= addCategory;
        
        dfind.setDisplayFinding 		= setDisplayFinding;
        
        dfind.disableNextAction 		= disableNextAction;
        
        dfind.setPrevFindMaxDate 		= setPrevFindMaxDate;
        
        dfind.save 						= findingSave;
        
        dfind.findingValidation 		= findingValidation;
        
        dfind.uploadFindingsAttach 		= uploadFindingsAttach;
        
        dfind.setPrevFindDueDate		= setPrevFindDueDate;
        
        dfind.preview					= preview;
        
        dfind.downloadFiles				= downloadFiles;
        
        dfind.downloadFindingFile		= downloadFindingFile;
        
        dfind.removeFindingFiles		= removeFindingFiles;
        
        dfind.changeCallback 			= changeCallback;
        
        dfind.priorToDepatVsl           = 'PRIOR TO DEPARTING VESSEL';
        
        dfind.dateFormatConversion      = dateFormatConversion;
        
        dfind.setUpdateDescOnPlaceChange= setUpdateDescOnPlaceChange;
     
        dfind.preMinDate='';
        
        dfind.changeCompleteFlagForAll  = changeCompleteFlagForAll;
        
        dfind.setNilNextActionForObs    = setNilNextActionForObs;
        
        dfind.maPort  				 	= masterData.maPort;
        
        dfind.getPort                	= getPort;
        
        dfind.setFindingData			= setFindingData;
        
        dfind.clearFileType				= clearFileType;
        
        dfind.userRoleId = sessionStorage.getItem('userRoleId');

		dfind.disableCheckbox = false;								//added by @Ramya for Jira id - IRI-5596
        
       /* dfind.reportHistoryAdded = false;
        
         dfind.versionId = '';*/
      
        /********* adding json key to array on next action change **********/
        function addCategory(findingSeqNo,statusSeqNo,dmlcAuditSeqNo){
    		
        	return {
    			
    			'statusSeqNo'     : statusSeqNo,
    			
    			'findingSeqNo'    : findingSeqNo,
    			
    			'origAuditSeqNo'  : dmlcAuditSeqNo,
    			
    			'currentAuditSeq' : Number(dfind.auditSeqNo),
    			
    			'companyId'       : Number(dfind.companyId),
    			
    			'auditTypeId'     : dfind.AppConstant.DMLC_TYPE_ID,
    		    					        					
    			'categoryId'      : '',
    		
    			'statusId'        : '',
    		
    			'statusDate'      : '',
    		
    			'nextActionId'    : '',
    		
    			'dueDate'         : '',
    		
    			'descriptions'    : '',
    			
    			'userIns'         : (sessionStorage.getItem('emailId')).toString(),
    			
    			'dateIns'         : moment(new Date()).format(MMMDDYYYY),
    			
    			'findingRptAttachs' : [],
    			
    			'updateFlag'    : false
    		
    		};
    		
    	}//addCategory

        /********* on screen load setting data **********/
        $scope.$on('$viewContentLoaded', function() {
        	
        	if(auditFactory.getdmlcFindingData()){
            	
        		var dmlcFindingsData = auditFactory.getdmlcFindingData();
        		
        		dfind.observationarrayprevious = angular.copy(dmlcFindingsData.dmlcFinding);
        		
        			dfind.observationarrayprevious = dfind.observationarrayprevious.filter(function( obj ) {
        		return (obj.findingDetail[obj.findingDetail.length -1].statusId != dfind.AppConstant.VERIFIED_CLOSED || obj.findingDetail[obj.findingDetail.length -1].currentAuditSeq >= dfind.auditSeqNo || ((obj.findingDetail[obj.findingDetail.length -1].currentAuditSeq == 600000) && (obj.findingDetail[obj.findingDetail.length -1].statusDate>moment(dfind.auditDate,MMMDDYYYY).format(YYYYMMDD))));
     		});
        		
        		console.log(dfind.observationarrayprevious);
        		dfind.observationarraypreviousTemp = angular.copy(dmlcFindingsData.dmlcFinding);
        		
        		dfind.auditStatusId = dmlcFindingsData.auditStatusId;
            	
            	dfind.leadStatus 	= dmlcFindingsData.leadStatus;
            	
            	dfind.leadSign    	= dmlcFindingsData.leadSign;
        		
            	dfind.audSignature 	= dmlcFindingsData.auditorSignature;
        		
            	dfind.openMeeting 	= dmlcFindingsData.openMeeting?dmlcFindingsData.openMeeting:'';
            
            	dfind.closeMeeting 	= dmlcFindingsData.closeMeeting?dmlcFindingsData.closeMeeting:'';

            	dfind.lockStatus 	= dmlcFindingsData.lockStatus;
        		
            	dfind.auditDate 	= dmlcFindingsData.auditDate;
            	
            	//dfind.vesselImoNo 	= dmlcFindingsData.vesselImoNo.vesselImoNo;
            	
            	dfind.companyImoNo 	= dmlcFindingsData.companyImoNo;
            	
            	dfind.docTypeNo 	= dmlcFindingsData.docTypeNo;
            	
            	dfind.FindingMaxDate= moment(dfind.openMeeting,MMMDDYYYY).format(YYYYMMDD);
            
            	dfind.reviewStatus	= dmlcFindingsData.reviewStatus;
            	
            	dfind.findingData	= dmlcFindingsData.findingData;
            	
            	dfind.enabled 		= dmlcFindingsData.enabled;
            	
            	dfind.minOpenMeetingDate = dmlcFindingsData.minOpenMeetingDate;
            	
            	dfind.maxOpenMeetingDate = dmlcFindingsData.maxOpenMeetingDate;
            	
            	dfind.auditPlace 	 = dmlcFindingsData.auditPlace;
            	
            	dfind.auditSubtypeId = dmlcFindingsData.auditSubtypeId;
            	
            	dfind.preMinDate = dfind.openMeeting?moment(dfind.openMeeting,MMMDDYYYY).format(YYYYMMDD):'';
            	
            	dfind.lockDisable = dmlcFindingsData.lockDisable;
            	
            	dfind.sspDmlcAuditSeqNo = dmlcFindingsData.sspDmlcAuditSeqNo;
            	
            	if(dfind.sspDmlcAuditSeqNo){
            		auditFactory.getAuditRelatedData(dfind.sspDmlcAuditSeqNo,dfind.companyId).$promise.then(function(res){
            			console.log(res);
            			dfind.allowNext = res.allowNext;
            		});
    			}
            	
            	dfind.dateFormatConversion(dfind.observationarrayprevious);
            	dfind.observationarrayprevious.forEach(function(preFindings,index){
					if (preFindings.auditStatus) {							//added by @Ramya for Jira id - IRI-5596
						preFindings.showAuditChangeCheckBox = true;
						dfind.disableCheckbox = true;
					}
            		preFindings.auditElements = preFindings.auditElements ? decodeURIComponent(preFindings.auditElements):'';
            		
            		preFindings.findingDetail.forEach(function(findings,cIndex){
            			console.log(findings.statusId)
            			findings.updateFlag = dfind.auditSeqNo == findings.currentAuditSeq ? false : true;
            			
            			if(findings.statusId==dfind.AppConstant.VERIFIED_CLOSED){
                			$timeout(function(){
    							document.getElementById("statusdate-"+index+"-"+(cIndex)).nextElementSibling.innerHTML = 'Date';
    		        		},0);
            			}
            		});
            		
            		if(preFindings.findingDetail[preFindings.findingDetail.length-1].statusId!=dfind.AppConstant.VERIFIED_CLOSED){
            			dfind.nextActionChangePrev(index,preFindings.findingDetail.length-1);
    	    		}
    	    	});
                	
        	}else{
        		
        		dfind.auditHome();
        	}
        });

        
        dfind.portArray = [];
    	
        dfind.maPort.forEach(function(port){
           if(port.activeFlag==1){
    			
    			var portToIns = port.portName?port.portName:'';
    			
    			portToIns = portToIns ? port.countryName ? portToIns+', '+port.countryName : portToIns : port.countryName ? port.countryName :'';
    					
    			dfind.portArray.push(portToIns);
    		}
          
    	});
        
        function getPort(val){
     	 
     	   var tempArray = [];
           	 
     		if(val){
     			var i = 0;
     			
     			for(i=0;i<dfind.portArray.length;i++){
     				if(dfind.portArray[i].toUpperCase().indexOf(val.toUpperCase())>-1){
     					tempArray.push(dfind.portArray[i]);
     				}
     				if(tempArray.length>16 && val.length<4){
     					break;
     				}
     			}
     		}
     		
     		return tempArray;
     	}
        
        

        /********* go to home screen **********/
        function auditHome(){

            $state.go("app.audit.details",{},{reload:true})
         }
        
        /********** on change of next action populating next row **********/
        function nextActionChangePrev(prIndex,index,nAction){
        	
        	var callFromSetData = (nAction) ? true : false;
        	
        	var nAction = nAction ? nAction : dfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId;
    		
    		if(nAction == dfind.AppConstant.PREVIOUS_STATUS){
    			
    			if(dfind.observationarrayprevious[prIndex].findingDetail.length-1 > index){
    				
    				dfind.observationarrayprevious[prIndex].findingDetail.splice(-1,1);
        			
    				dfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
        			
    				dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
        			
    				dfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';

					dfind.observationarrayprevious[prIndex].findingDetail[index].descriptions = '';		//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = '';
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace = '';
        			
    				dfind.setDisplayFinding(dfind.observationarrayprevious[prIndex].findingDetail[index].categoryId,prIndex);
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs=[];
    				
        			
    			}else if(dfind.observationarrayprevious[prIndex].findingDetail.length-1 == index){
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
        			
    				dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';

					dfind.observationarrayprevious[prIndex].findingDetail[index].descriptions = '';			//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = '';
    				
    				dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace = '';
    				//alert('here');
    				dfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs=[];
    			}
    			
    			if(dfind.observationarrayprevious[prIndex].showAuditChangeCheckBox){
    				
    				var auditSeqNo = dfind.observationarrayprevious[prIndex].auditSeqNo;
    				
    				dfind.observationarrayprevious.forEach(function(obj){
						if(obj.auditSeqNo == auditSeqNo){
							obj.showAuditChangeCheckBox = false;
							obj.auditStatus = 0;
							dfind.disableCheckbox = false;
						}
					});
    			}
    			
    		}else{
    			
    			if(dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace || dfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
    				
    				var categoryId = dfind.observationarrayprevious[prIndex].findingDetail[0].categoryId;
    				
    				var auditSubTypeId = dfind.observationarrayprevious[prIndex].auditSubTypeId;
    				
    				if(dfind.auditTypeId == dfind.AppConstant.ISPS_TYPE_ID && (auditSubTypeId==1003 || auditSubTypeId==1005) && categoryId == 1002){
    					categoryId = 1003;
    				}
    				
        			if(nAction != dfind.AppConstant.NIL){
        				
        				dfind.observationarrayprevious[prIndex].findingDetail.push(dfind.addCategory(dfind.observationarrayprevious[prIndex].findingSeqNo,index+2,dfind.observationarrayprevious[prIndex].auditSeqNo));
            			
            			dfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = dfind.CarFlowStructure[dfind.auditTypeId][categoryId][index+1].categoryId;
            			
        				dfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = dfind.CarFlowStructure[dfind.auditTypeId][categoryId][index+1].statusId;
        				
        				dfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
        				
        				dfind.setDisplayFinding(dfind.CarFlowStructure[dfind.auditTypeId][categoryId][index+1].categoryId,prIndex);
        				
        				if(nAction == dfind.AppConstant.VERIFY_CLOSE){
        					
        					$timeout(function(){
        						document.getElementById("statusdate-"+prIndex+"-"+(index+1)).nextElementSibling.innerHTML = 'Date';
        	        			$("#description-"+prIndex+'-'+(index+1)).focus();
        	        		},0);
        				}
        				
        			}else{
        				
        				var auditSeqNo = dfind.observationarrayprevious[prIndex].auditSeqNo;
        				
        				var listOfFindingsOfSameAudit = dfind.observationarrayprevious.filter(function( obj ) {
        					return obj.auditSeqNo == auditSeqNo;
        				});
        				var listOfOpenFindingsOfsameAudit = listOfFindingsOfSameAudit.filter(function( obj ) {
        					return !(obj.findingDetail[obj.findingDetail.length-1].statusId == dfind.AppConstant.VERIFIED_CLOSED && obj.findingDetail[obj.findingDetail.length-1].statusDate);
        				});
        				
        				if(!(listOfOpenFindingsOfsameAudit) || listOfOpenFindingsOfsameAudit.length==0){
        					
        					dfind.observationarrayprevious.forEach(function(obj){
        						if(obj.auditSeqNo == auditSeqNo){
        							obj.showAuditChangeCheckBox = true; 
        						}
        					});
        				}
        				
        				dfind.setDisplayFinding(dfind.CarFlowStructure[dfind.auditTypeId][categoryId][index].categoryId,prIndex);
        			}
        			
        			if(!(callFromSetData) && dfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag==false){
        				
        				var msg = '';
        					
        				if(dfind.observationarrayprevious[prIndex].findingDetail[index].statusId == dfind.AppConstant.PLAN_ACCEPTED){
        					
        					msg = "Plan has been accepted as part of MLC "+ dfind.AppConstant.AUDIT_SUB_TYPE[dfind.auditSubtypeId].SUB_TYPE_DESC +' '+ dfind.inspectionAudit +' at '+ dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate;//moment(new Date()).format(MMMDDYYYY);
            			
        				}else if(dfind.observationarrayprevious[prIndex].findingDetail[index].statusId == dfind.AppConstant.VERIFIED_CLOSED){
        					
        					msg = "Verify/Close Status has been updated as part of MLC "+ dfind.AppConstant.AUDIT_SUB_TYPE[dfind.auditSubtypeId].SUB_TYPE_DESC +' '+ dfind.inspectionAudit +' at '+ dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate;//moment(new Date()).format(MMMDDYYYY);
            			}
        					
        				dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = msg;
        				
        				if(!(dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace)){
        					toaster.warning('Please enter '+dfind.auditType+' place');
        				}
        			}
    			}else{
    				toaster.warning('Please enter '+dfind.auditType+' place');
    				dfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
    			}
    		}
        }//end of nextActionChangePrev(prIndex,index)
        
        function setUpdateDescOnPlaceChange(prIndex,index){
        	
        	if(dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription){
        		
        		var msg = '';
        		
        		if(dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate){
        			
        			if(dfind.observationarrayprevious[prIndex].findingDetail[index].statusId == dfind.AppConstant.PLAN_ACCEPTED){
            			
            			msg = "Plan has been accepted as part of MLC "+ dfind.AppConstant.AUDIT_SUB_TYPE[dfind.auditSubtypeId].SUB_TYPE_DESC +' '+ dfind.inspectionAudit +' at '+ dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate; //moment(new Date()).format(MMMDDYYYY);
            		
            		}else if(dfind.observationarrayprevious[prIndex].findingDetail[index].statusId == dfind.AppConstant.VERIFIED_CLOSED){
            			
            			msg = "Verify/Close Status has been updated as part of MLC "+ dfind.AppConstant.AUDIT_SUB_TYPE[dfind.auditSubtypeId].SUB_TYPE_DESC +' '+ dfind.inspectionAudit +' at '+ dfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ dfind.observationarrayprevious[prIndex].findingDetail[index].statusDate; //moment(new Date()).format(MMMDDYYYY);
            		}
        		}else{
        			msg = '';
        		}
        		
        		//dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription ? dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription : msg;
        		dfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = msg;
        	}
        }// end of setUpdateDescOnPlaceChange()
        
        /********* for setting category data **********/
        function setDisplayFinding(categoryId,prIndex){
        	dfind.observationarrayprevious[prIndex].displayFinging = _(dfind.obsCategoryOptions).chain().where({'findingsCategoryId':Number(categoryId)}).pluck('findingsCategoryDesc').toString();

    		    		dfind.countFindingCategoryPrev = _.countFindingCategory(dfind.observationarrayprevious,dfind.auditTypeId,"PREV",dfind.obsCategoryOptions);
			
        }
        
        /********** for disabling next action drop down data **********/
        function disableNextAction(stat,catgs,index,prIndex){
        	
        	switch(dfind.auditTypeId){
        	case dfind.AppConstant.ISM_TYPE_ID:
        	
        		return !(catgs.categoryId == dfind.AppConstant.MAJOR_FINDING_CATEGORY && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId == dfind.AppConstant.DOWNGRADED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId == dfind.AppConstant.PLAN_ACCEPTED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.PLAN_ACCEPTED && (stat.findingsStatusId == dfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == dfind.AppConstant.CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	case dfind.AppConstant.ISPS_TYPE_ID:
        		
        		return !(catgs.categoryId == dfind.AppConstant.MAJOR_FINDING_CATEGORY && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId == dfind.AppConstant.DOWNGRADED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId == dfind.AppConstant.COMPLAINCE_RESTORED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.COMPLAINCE_RESTORED && (stat.findingsStatusId == dfind.AppConstant.PLAN_ACCEPTED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.PLAN_ACCEPTED && (stat.findingsStatusId == dfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == dfind.AppConstant.CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	case dfind.AppConstant.MLC_TYPE_ID:
        		
        		return !(catgs.categoryId == dfind.AppConstant.MAJOR_FINDING_CATEGORY && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId == dfind.AppConstant.DOWNGRADED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId == dfind.AppConstant.COMPLAINCE_RESTORED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.COMPLAINCE_RESTORED && (stat.findingsStatusId == dfind.AppConstant.PLAN_ACCEPTED || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.PLAN_ACCEPTED && (stat.findingsStatusId == dfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) &&  
        		!((catgs.categoryId == dfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == dfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == dfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == dfind.AppConstant.CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	case dfind.AppConstant.SSP_TYPE_ID:
        		
        		return !(catgs.categoryId == dfind.AppConstant.REVIEW_NOTE && catgs.statusId == dfind.AppConstant.OPEN && (stat.findingsStatusId ==  dfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS ))) &&  
        		!(catgs.categoryId == dfind.AppConstant.REVIEW_NOTE && catgs.statusId ==  dfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == dfind.AppConstant.CLOSE || (stat.findingsStatusId == dfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	}
        	
        }
        
        /********* for setting min and max date for status date **********/
        function setPrevFindMaxDate(val,val2){
        	console.log('testDate'+val);
        	var testDate = moment(val,MMMDDYYYY).format(YYYYMMDD);
        	
        	var openMeetDate = dfind.openMeeting ? moment(dfind.openMeeting,MMMDDYYYY).format(YYYYMMDD):'';
        	
        	console.log('testDate'+testDate);
        	
        	dfind.prevFindMinStatusDate = openMeetDate ? openMeetDate :'';
        	dfind.prevFindMaxStatusDate = val2?moment(val2,MMMDDYYYY).format(YYYYMMDD): dfind.closeMeeting?dfind.closeMeeting:'';
        	console.log(dfind.prevFindMaxStatusDate);
        	dfind.FindingMinDate = openMeetDate;
        	dfind.FindingMaxDate = dfind.closeMeeting?dfind.closeMeeting:'';
        }
        
        /***** to set DMLC II finding json data *****/
        function setFindingData(){
        	var tempFindArray = angular.copy(dfind.observationarrayprevious);
        	
        	tempFindArray = tempFindArray.filter(function( a ) {
    			return a.auditCode && a.findingDetail[0].statusDate;
    		});
    		
    		tempFindArray.forEach(function(a,index){
    			
    			a.auditCode = a.auditCode ? a.auditCode.auditCode ? a.auditCode.auditCode : a.auditCode : '';
    			
    			a.auditDate = a.auditDate? moment(a.auditDate,MMMDDYYYY).format(YYYYMMDD) : moment(dfind.auditDate,MMMDDYYYY).format(YYYYMMDD);
						
    			a.userIns = (sessionStorage.getItem("emailId")).toString();
        		
        		a.dateIns = a.dateIns ? moment(a.dateIns,MMMDDYYYY).format(YYYYMMDD) : moment(new Date()).format(YYYYMMDD);
        				
    			if((a.findingDetail[a.findingDetail.length-1].statusId == dfind.AppConstant.VERIFIED_CLOSED && a.findingDetail[a.findingDetail.length-1].statusDate) || a.findingDetail[0].categoryId==dfind.AppConstant.OBS_FINDING_CATEGORY){
    				
					a.findingStatus = 1;
				}else{
					a.findingStatus = 0;
				}
    			
    			if(!(a.findingDetail[a.findingDetail.length-1].statusDate)){
    				a.findingDetail.splice(a.findingDetail.length-1);
    			}
    			
    			delete a.auditElements;
    			
    			a.findingDetail.forEach(function(b,subIndex){
    				
    				var regExp = new RegExp("'", "g");
    				
    				b.statusDate = moment(b.statusDate,MMMDDYYYY).format(YYYYMMDD);
    				
    				var desc = b.descriptions?b.descriptions.replace(regExp,"''"):'';
    					
    				b.descriptions = desc || "";
    				
    				b.userIns = (sessionStorage.getItem("emailId")).toString();
    				
            		b.dateIns = moment(new Date()).format(YYYYMMDD);
        			
            		delete b.findFileData;
            		
            		b.findingRptAttachs.forEach(function(c,cIndex){
            			
            			c.findingFileByte = c.findingFileByte?btoa(c.findingFileByte):null;
            			
            			c.userIns = (sessionStorage.getItem("emailId")).toString();
        				
                		c.dateIns = moment(new Date()).format(YYYYMMDD);
            		});
        		});
				a.findingDetailModel=a.findingDetail;			//added by @Ramya for Jira id - IRI-5706 
    		});
    		
    		return tempFindArray;
        }
        
        /********* for saving previous finding data **********/
        function findingSave(event){
        	
        	if(dfind.observationarrayprevious.length>0 && dfind.findingValidation()){
        		var text={},mailForStatusClose=false; var temp=[];
        		
        		text.findingSeqNo =''; text.statusSeqNo='';
        		
        		var data = dfind.setFindingData();
        		
        		
        		data.forEach(function(dataindex){
        			
        		
        			dataindex.findingDetail.forEach(function(index){ 
        		
        			if(index.statusSeqNo==2){
        			
        			dfind.observationarraypreviousTemp.forEach(function(indexval){
        				
        				   if(index.findingSeqNo == indexval.findingSeqNo && indexval.findingDetail.length>1){
        				     }else if(index.findingSeqNo == indexval.findingSeqNo) {
        					  text.findingSeqNo =   text.findingSeqNo +'-'+ index.findingSeqNo;
        					  text.dmlcseqNo = index.origAuditSeqNo;
        	        		  text.companyId   =      index.companyId;
        	        		  text.mlcseqNo  = indexval.auditSeqNo;
        	        		  mailForStatusClose = true;
        				     }
        			});
        			}
        			
        		});
        		
        		});
        		
				blockUI.start('Saving DMLC II Review Note(s)');
				
				data.forEach(function(a,val){    				
							
					auditFactory.saveFindingData(a,'Update','PF',dfind.auditTypeId,dfind.companyId).$promise.then(function(res){
						console.log(res);	
						//dfind.observationarraypreviousTemp = angular.copy(res);
						
						dfind.res=res;
								
						if(res.auditCode){  
							
							blockUI.stop();
							
							toaster.success("DMLC II Note(s) updated Successfully");
							
							dfind.PreviousfindingsForm.$dirty=false;
									
							if(event=='/details')
							{
							SetPrevIousFinding();
							$state.go('app.audit.details',{},{reload:true});
							}
							
							if(val == (data.length-1))
							{
								
								prevFindingsFactory.createBlob(dfind.auditSeqNo,dfind.companyId).$promise.then(function(res){
									console.log(res);
								});
								
							}	
						}else{
							
							blockUI.stop();
						}
					});  
				});
				
				if(mailForStatusClose){ 
				   prevFindingsFactory.dmlcFinCloserEmail(text.findingSeqNo,text.dmlcseqNo,text.mlcseqNo,text.companyId).$promise.then(function(res){
						console.log(res);
					});	
				}
				
				
				
			}
        }// end of findingSave()
        
        
        
        $rootScope.$on('$stateChangeStart', function(event, fromState, toParams,toState) {
      	  
      	  var element=angular.element(document.getElementById("loader"));
      	  
      	  if(dfind.PreviousfindingsForm)
  			{
    			
      		  if(dfind.PreviousfindingsForm.$dirty)
  				{
  					
  				if (broadcastService.confirmService()) {
  					if(findingValidation())
  						{
  						if(fromState.url=='/details')
 							 event.preventDefault();
  						findingSave(fromState.url); 
  						}
  					else
  						{
  						 event.preventDefault();
  						}
  		          }	
  				
  				
  				}
  			
  			} 	
  	element.addClass('hide');	
          });
        
        /********** validation for previous finding data **********/
        function findingValidation(){
    		
    		var screenData = dfind.observationarrayprevious;
    		
    		var flag = true;
    		
    		screenData.forEach(function(a){
    			
    			if(!a.auditSeqNo){
    				
    				flag = false;
    				
    				toaster.warning('Audit No is Missing');
    				
    			}else if(!a.findingSeqNo){
    				
    				flag = false;
    				
    				toaster.warning('Finding No Missing');
    				
    			}else if(!a.auditCode){
    				
    				flag = false;
    				
    				toaster.warning('ISM Code Missing');
    			}    	
    			
    			if(flag){
					var statusDateMsg=0;		//added by @Ramya for Jira id - IRI-5614
					a.findingDetail
							.forEach(function(b) {
								if (b.nextActionId && !b.statusDate 
									&& b.categoryId != dfind.AppConstant.OBS_FINDING_CATEGORY) {
										var nextActionDescr;
										dfind.obsStatusOptions.forEach(function(status) {
										if(status.findingsStatusId==b.statusId)
										{
											nextActionDescr=status.findingstStatusDesc;
										}
										});
									flag = false;
									statusDateMsg++;
									if(statusDateMsg==1){
									toaster
											.warning("Please Select the Status Date for "+nextActionDescr +" Status Under "+ a.serialNo);
									}
        				}else if(b.statusDate && b.categoryId != dfind.AppConstant.OBS_FINDING_CATEGORY && (!b.nextActionId || b.nextActionId == dfind.AppConstant.PREVIOUS_STATUS)){
        					
        					flag = false;
        					
    						toaster.warning("Please Select the Next Action Under "+ a.serialNo);
    						
        				}
    				});
    			}
    			
    			if(flag && a.showAuditChangeCheckBox && !(a.auditStatus)){
    				
    				flag = false;
    				
    				toaster.warning("Please mark to complete DMLC II "+dfind.auditType);
        		}
    			
    		});
    		    			
    		return flag;
    	}
        
        /********** for file upload **********/
        function uploadFindingsAttach(prIndex,index){
        	        	
        	_.fileUpload(dfind.observationarrayprevious,prIndex,index); 
    		
    	}
        
        /********** for setting due date **********/
        function setPrevFindDueDate(prIndex,index,categoryId,nActionId){
        	
        	var categoryId2 = dfind.observationarrayprevious[prIndex].findingDetail[0].categoryId;
        	var auditSubTypeId = dfind.observationarrayprevious[prIndex].auditSubTypeId;
			
        	if(dfind.auditTypeId == dfind.AppConstant.ISPS_TYPE_ID && (auditSubTypeId==1003 || auditSubTypeId==1005) && categoryId == 1002){
        		categoryId2 = 1003;
			}
        	
        	if(nActionId && nActionId!=dfind.AppConstant.PREVIOUS_STATUS){
        		
        		var dueDate = dfind.CarFlowStructure[dfind.auditTypeId][categoryId2][index].dueDate;
            	
            	dfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = dueDate;
            	
            	/*if(dfind.auditTypeId==dfind.AppConstant.MLC_TYPE_ID && dueDate == 'PRIOR TO DEPARTING VESSEL'){
            		
            		dfind.observationarrayprevious[prIndex].findingDetail[index].dueDate= dfind.priorToDepatVsl;
    		    
            	}else */
            		
            	if(!(isNaN(dueDate))){
            		
            		dfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = dfind.closeMeeting ? moment(dfind.closeMeeting,YYYYMMDD).add(dueDate,'days').format(MMMDDYYYY) : '';
    		    
            	}else if(dueDate=='NEXT SCHEDULED AUDIT'){
    		    	
            		dfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = dfind.AppConstant.AUDIT_SUB_TYPE[dfind.auditSubtypeId].nextScheduledType+' '+dfind.inspectionAudit;
    		    }
        	}
        	
        	if(categoryId2 == dfind.AppConstant.OBS_FINDING_CATEGORY){
        		
        		dfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId2 = 'NIL';
        	}
        	
        	if(dfind.auditTypeId == dfind.AppConstant.DMLC_TYPE_ID && nActionId == dfind.AppConstant.VERIFY_CLOSE){
				document.getElementById("statusdate-"+prIndex+"-"+(index+1)).nextElementSibling.innerHTML = 'Date';
			}
        	
        }
        
        
        
        /**********modal window pop up for preview**********/
    	function preview(file,pIndex,cIndex,index){ 
    		
    		blockUI.start();
    		
    		dfind.findingFileClick = false;
    		
    		var seqNo, inputs, byteArray;
    		
    		var fileExtension = file.split('.').pop(); 
    		
    		byteArray = dfind.observationarrayprevious[pIndex].findingDetail[cIndex].findingRptAttachs[index].findingFileByte;
    		    		
    		seqNo = dfind.observationarrayprevious[pIndex].auditSeqNo;
    		
    		inputs = {
    				
    			ModalData :'',
    				
    			fileData : {"fileName":file,"audSeqNo":seqNo,"findNo":(Number(pIndex)+1),"findSeqNo":(Number(cIndex)+1),"audType":dfind.auditauditType,"byteArray":byteArray,"auditTypeId":dfind.auditTypeId}
    		
    		};
    		
    		auditFactory.downloadFindingFile(seqNo,(Number(pIndex)+1),file,(Number(cIndex)+1),dfind.auditTypeId,dfind.companyId).$promise.then(function(res){
    			
    			if(fileExtension == 'xlsx' || fileExtension == 'docx' || fileExtension == 'xls' || fileExtension == 'doc'){
    	        	
    				if(inputs.fileData.byteArray){
    					
    					var bytes = new Uint8Array(inputs.fileData.byteArray.length);
    		    	    
    		    	    for (var i = 0; i < inputs.fileData.byteArray.length ; i++){
    		    	        bytes[i] = inputs.fileData.byteArray.charCodeAt(i);
    		    	     }
    		    	   
    		    	    dfind.downloadFiles(new Blob([bytes.buffer], {type : res.headersGetter('content-type')}),file);
    		    	    
    		    	    blockUI.stop();
    		    	    
    		    	    dfind.findingFileClick = true;
    		    	    
            			return;
    					
    				}
    				
    				dfind.downloadFiles(new Blob([res.data], {type : res.headersGetter('content-type')}),file);
    				
    				dfind.findingFileClick = true;
    				
    				return;
                  }
    			
    		 if(res.status == 200 || inputs.fileData.byteArray){
    			 
    				blockUI.stop();
    				
    				ModalService.showModal({
    	    			
    	    			templateUrl : 'src/modals/findingPreview.html',
    	    			
    	    			controller  : "findingFilePreviewController as fPrv",
    	    			
    	    			inputs : inputs
    	    		
    	    		}).then(function(modal) {
    	    			
    	    			modal.element.modal();
    	    			
    	    			dfind.findingFileClick = true;
    	    			
    	    			modal.close.then(function(result) {
    	    				
    	    				blockUI.stop();
    	    			});
    	    			
    	    		});  
    			}
    		});	
    		
    		blockUI.stop();
    	}
    	

    	/********** for downloading files **********/
    	function downloadFiles(blob,fileName){
    		
    	    if (window.navigator.msSaveOrOpenBlob) { // For IE:
    	    	
    	    	navigator.msSaveBlob(blob, fileName);
    	        
    	    } else { // For other browsers:   
    	    	
    	        var link = document.createElement('a');
    	        
    	        link.style = "display: none"; 
    	        
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
    	
    	/*******for download the attached files*******/
    	function downloadFindingFile(file,pIndex,cIndex,index){
    		
    		blockUI.start();
    		
    		var seqNo, data, fileByte; 
    		
    		seqNo = dfind.observationarrayprevious[pIndex].auditSeqNo;
    		
    		fileByte = dfind.observationarrayprevious[pIndex].findingDetail[cIndex].findingRptAttachs[index].findingFileByte;
    		    		
    		if(fileByte){
				
				var bytes = new Uint8Array(fileByte.length);
	    	    
	    	    for (var i = 0; i < fileByte.length ; i++){
	    	        bytes[i] = fileByte.charCodeAt(i);
	    	    }
	    	   
	    	    dfind.downloadFiles(new Blob([bytes.buffer], {type : 'content-type'}),file);
	    	    
	    	    blockUI.stop();
	    	    
    			return;
    		}
    		        		
    		auditFactory.downloadFindingFile(seqNo,(Number(pIndex)+1),file,Number(cIndex)+1,dfind.auditTypeId,dfind.companyId).$promise.then(function(res){ 
    			
    			if(res.status == 200){
    				
    				dfind.downloadFiles(new Blob([res.data],{type:'Content-Type'}), file);
    				
    				blockUI.stop();
    				
    			}else{
    				
    				toaster.warning(res.data);
    				
    				blockUI.stop();
    			} 
    		});
    		
    		blockUI.stop();  
    	}
    	
    	/*******for removing the attached files*******/
    	function removeFindingFiles(file,pIndex,cIndex,index){ 
    		
    		ModalService.showModal({
    			
    			templateUrl : 'src/modals/warning.html',
    			
    			controller  : 'warningController as warn',
    			
    			inputs		: {data:'Do you want to delete the Attachment'},
    		
    		}).then(function(modal) {
    			
    			modal.element.modal();
    				    			
    			modal.close.then(function(result) {
    				
    				if(result=='YES'){
    					
    					blockUI.start();
    		    		    		    		
    		    		dfind.observationarrayprevious[pIndex].findingDetail[cIndex].findingRptAttachs.splice(index,1);
    		    		
    		    		blockUI.stop();
    		    		
    				}
    			});
    			
    		});   		
    		    			
    	}
    	
    	/********Lock Applied or Released**********/
    	function changeCallback() {
    		
    			if (dfind.enabled) {
    				dfind.createedit = 'Lock';
    				detailsFactory.updateLockHolder(1003, dfind.auditSeqNo,sessionStorage.getItem('emailId'),dfind.companyId).$promise.then(function(data){
    					if(data.data=='Success'){
    						toaster.success('Lock has been applied Successfully');
    						
    						dfind.lockStatus = false;
    							
    	 				}else{
    						toaster.warning('Current Inspection Locked by '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('firstName').toString()+' '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('lastName').toString());
    						
    						dfind.enabled = false;
    					}
    				});	
    				
    			} else {
    				dfind.createedit = 'Unlock';
    				detailsFactory.updateLockHolder(1003, dfind.auditSeqNo,' ',dfind.companyId).$promise.then(function(data){
    					if(data.data=='Success'){
    						
    						toaster.success('Lock Released Successfully');
    						
    						dfind.lockStatus = true;
    					}
    	 			});
    			}
    	}
    	
    	
          function dateFormatConversion(obj){
        	 
	        	obj.forEach(function(preFindings){
	        		
	        		preFindings.auditDate = preFindings.auditDate?moment(preFindings.auditDate,YYYYMMDD).format(MMMDDYYYY):'';
	        		preFindings.dateIns = preFindings.dateIns ? moment(preFindings.dateIns,YYYYMMDD).format(MMMDDYYYY):'';
	        			
	    			preFindings.findingDetail.forEach(function(preFinding){
	    	
	    				preFinding.dateIns =   preFinding.dateIns?moment(preFinding.dateIns,YYYYMMDD).format(MMMDDYYYY):'';
	    				preFinding.statusDate = preFinding.statusDate?moment(preFinding.statusDate,YYYYMMDD).format(MMMDDYYYY):'';
	    		    });
	    		});
        }//end of dateFormatConversion(obj)
          
          function changeCompleteFlagForAll(index,newValue){
        	  
        	  var auditSeqNo = dfind.observationarrayprevious[index].auditSeqNo;
				
				dfind.observationarrayprevious.forEach(function(obj){
					if(obj.auditSeqNo == auditSeqNo){
						obj.auditStatus = newValue;
					}
				});
          }
          
          function setNilNextActionForObs(pIndex,index){
      		
        	var categoryId = dfind.observationarrayprevious[pIndex].findingDetail[index].categoryId;
        	var auditSubTypeId = dfind.observationarrayprevious[pIndex].auditSubTypeId;
			
        	if(dfind.auditTypeId == dfind.AppConstant.ISPS_TYPE_ID && (auditSubTypeId==1003 || auditSubTypeId==1005) && categoryId == 1002){
        		categoryId = 1003;
			}
      		
      		if(dfind.observationarrayprevious[pIndex].findingDetail[index].statusId==dfind.AppConstant.VERIFIED_CLOSED){
      			
      			if(dfind.observationarrayprevious[pIndex].findingDetail[index].statusDate){
          			
      				//dfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId2 = 'NIL';
          			//dfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId = dfind.CarFlowStructure[dfind.auditTypeId][categoryId][index].nextActionId;
          			
      				if(dfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId){
      					dfind.nextActionChangePrev(pIndex,index,dfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId);
      				}
      				
          			dfind.observationarrayprevious[pIndex].findingDetail[index].dueDate = dfind.CarFlowStructure[dfind.auditTypeId][categoryId][index].dueDate;
          			
          		}else{
          			//dfind.nextActionChangePrev(pIndex,index,dfind.AppConstant.PREVIOUS_STATUS);
          			dfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId2 = '';
          		}
      		}else{
      			dfind.setUpdateDescOnPlaceChange(pIndex,index)
      		}	
      	 }//end of setNilNextActionForObs(pIndex,index)
          
          /********** removing file data before upload **********/
          function clearFileType(){
          	
          	angular.element("input[type='file']").val(null);
          }
		
        
        /********** END OF CONTROLLER **********/
    }
    
})();