
(function (){
    'use strict';

    angular
        .module('app.audit.prevfindings')        
        .controller('PrevFindingsController', PrevFindingsController); 
    
    function PrevFindingsController(ModalService,$rootScope,broadcastService,$window,$state,prevFindingsFactory,$timeout,masterData,AppConstant,CarFlowStructure,auditFactory,$scope,blockUI,MMMDDYYYY,YYYYMMDD,DDMMMYYYY,HHmm,toaster,$cookies,auditType,detailsFactory,findingsFactory){
    	
		var pfind 						= this;   console.log(pfind);
		
		pfind.showSwitch                = true;
    
		pfind.AppConstant 				= angular.copy(AppConstant);
		
		pfind.CarFlowStructure 			= CarFlowStructure;
		
		pfind.auditTypeId  				= parseInt($window.sessionStorage.getItem("auditTypeId"));
        
		pfind.inspectionAudit = pfind.auditTypeId==pfind.AppConstant.MLC_TYPE_ID?'INSPECTION':'AUDIT';
		
		pfind.auditSeqNo   				= parseInt($window.sessionStorage.getItem('auditSeqNo'));
		
		pfind.companyId    				= $window.sessionStorage.getItem('companyId') ? $window.sessionStorage.getItem('companyId') : sessionStorage.getItem('companyId') && sessionStorage.getItem('companyId') != 'null' ? sessionStorage.getItem('companyId') : '';

		pfind.obsCategoryOptions 		= masterData.obsCategory;
        
		pfind.obsStatusOptions 			= masterData.obsStatus;
        
		pfind.auditCodeArray 			= masterData.auditCodes;
		
        pfind.auditHome 				= auditHome;
        
        pfind.nextActionChangePrev		= nextActionChangePrev;
        
        pfind.observationarrayprevious	= [];

		pfind.observationarraypreviousFinal =[];    //added by archana for jira ID-IRI-4590
        
        pfind.addCategory 				= addCategory;
        
        pfind.setDisplayFinding 		= setDisplayFinding;
        
        pfind.disableNextAction 		= disableNextAction;
        
        pfind.setPrevFindMaxDate 		= setPrevFindMaxDate;
        
        pfind.save 						= findingSave;
        
        pfind.findingValidation 		= findingValidation;
        
        pfind.setFindingData 			= setFindingData;
        
        pfind.uploadFindingsAttach 		= uploadFindingsAttach;
        
        pfind.setPrevFindDueDate		= setPrevFindDueDate;
        
        pfind.preview					= preview;
        
        pfind.downloadFiles				= downloadFiles;
        
        pfind.downloadFindingFile		= downloadFindingFile;
        
        pfind.removeFindingFiles		= removeFindingFiles;
        
        pfind.changeCallback 			= changeCallback;
        
        pfind.priorToDepatVsl           = 'PRIOR TO DEPARTING VESSEL';
        
        pfind.dateFormatConversion      = dateFormatConversion;
        
        pfind.setUpdateDescOnPlaceChange= setUpdateDescOnPlaceChange;
     
        pfind.preMinDate='';
        
        pfind.changeCompleteFlagForAll  = changeCompleteFlagForAll;
        
        pfind.setNilNextActionForObs    = setNilNextActionForObs;
        pfind.maPort  				 = masterData.maPort;
        pfind.getPort                = getPort;
        
        pfind.userRoleId = sessionStorage.getItem('userRoleId');
        
        
       /* pfind.reportHistoryAdded = false;
        
         pfind.versionId = '';*/
      
        /********* adding json key to array on next action change **********/
        function addCategory(){
    		
    		return {
    			
    			"findingRptAttachs" : [],
    			
    			"findingSeqNo" : '',
    			
    			"categoryId":"",
    			
    			"descriptions":"",
    			
    			"statusId":"",
    			
    			"duedate":"",
    			
    			"statusDate":"",
    			
    			"nextActionId":""
    		};
    	}//addCategory

        /********* on screen load setting data **********/
        $scope.$on('$viewContentLoaded', function() {
        	
        	if(auditFactory.getFindingData()){
        		            	
        		var preFindingsData = auditFactory.getFindingData();
        		
            	pfind.auditStatusId = preFindingsData.auditStatusId;
            	
            	pfind.leadStatus 	= preFindingsData.leadStatus;
            	
            	pfind.leadSign    	= preFindingsData.leadSign;
        		
            	pfind.audSignature 	= preFindingsData.auditorSignature;
        		
            	pfind.openMeeting 	= preFindingsData.openMeeting?preFindingsData.openMeeting:'';
            
            	pfind.closeMeeting 	= preFindingsData.closeMeeting?preFindingsData.closeMeeting:'';

            	pfind.lockStatus 	= preFindingsData.lockStatus;
        		
            	pfind.auditDate 	= preFindingsData.auditDate;
            	
            	pfind.vesselImoNo 	= preFindingsData.vesselImoNo.vesselImoNo;
            	
            	pfind.companyImoNo 	= preFindingsData.companyImoNo;
            	
            	pfind.docTypeNo 	= preFindingsData.docTypeNo;
            	
            	pfind.FindingMaxDate= moment(pfind.openMeeting,MMMDDYYYY).format(YYYYMMDD);
            
            	pfind.reviewStatus	= preFindingsData.reviewStatus;
            	
            	pfind.findingData	= preFindingsData.findingData;
            	
            	pfind.enabled 		= preFindingsData.enabled;
            	
            	pfind.minOpenMeetingDate = preFindingsData.minOpenMeetingDate;
            	
            	pfind.maxOpenMeetingDate = preFindingsData.maxOpenMeetingDate;
            	
            	pfind.auditPlace 	 = preFindingsData.auditPlace;
            	
            	pfind.auditSubtypeId = preFindingsData.auditSubtypeId;
            	
            	pfind.preMinDate = pfind.openMeeting?moment(pfind.openMeeting,MMMDDYYYY).format(YYYYMMDD):'';
            	
            	pfind.lockDisable = preFindingsData.lockDisable;
            	
            	pfind.auditComplteLaptop = preFindingsData.auditComplteLaptop ?  preFindingsData.auditComplteLaptop :'';
            	
            	pfind.openForCar = preFindingsData.openForCar ? preFindingsData.openForCar :'';
            	
            	pfind.previousAudit = preFindingsData.previousAudit ? preFindingsData.previousAudit :'';
            	            	
            	SetPrevIousFinding();
        		
        	}else{
        		
        		pfind.auditHome();
        		
        	}
        	
        	
        });

        
        pfind.portArray = [];
    	
        pfind.maPort.forEach(function(port){
           if(port.activeFlag==1){
    			
    			var portToIns = port.portName?port.portName:'';
    			
    			portToIns = portToIns ? port.countryName ? portToIns+', '+port.countryName : portToIns : port.countryName ? port.countryName :'';
    					
    			pfind.portArray.push(portToIns);
    		}
          
    	});
        
        function getPort(val){
     	 
     	   var tempArray = [];
           	 
     		if(val){
     			var i = 0;
     			
     			for(i=0;i<pfind.portArray.length;i++){
     				if(pfind.portArray[i].toUpperCase().indexOf(val.toUpperCase())>-1){
     					tempArray.push(pfind.portArray[i]);
     				}
     				if(tempArray.length>16 && val.length<4){
     					break;
     				}
     			}
     		}
     		
     		return tempArray;
     	}
        
        
        
        
        /********* for setting previous finding data **********/
        function SetPrevIousFinding(){            

        	$state.current.data.pageTitle	= auditType[pfind.auditTypeId].pageTitle;
        	
        	pfind.auditType    				= auditType[pfind.auditTypeId].auditingType;
        	
        	pfind.auditTypePlace = ( pfind.openForCar && pfind.openForCar==1) ? 'Acceptance ' :pfind.auditType;
        	
        	pfind.majorCountDesc 			= (pfind.auditTypeId == pfind.AppConstant.DMLC_TYPE_ID) ? _(pfind.obsCategoryOptions).chain().where({'auditTypeId':pfind.auditTypeId,'findingsCategoryId':pfind.AppConstant.REVIEW_NOTE}).pluck('findingsCategoryDesc').toString() : _(pfind.obsCategoryOptions).chain().where({'auditTypeId':pfind.auditTypeId,'findingsCategoryId':pfind.AppConstant.MAJOR_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString();
			
        	pfind.minorCountDesc 			=  _(pfind.obsCategoryOptions).chain().where({'auditTypeId':pfind.auditTypeId,'findingsCategoryId':pfind.AppConstant.MINOR_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString();
			
        	pfind.obsCountDesc 				= _(pfind.obsCategoryOptions).chain().where({'auditTypeId':pfind.auditTypeId,'findingsCategoryId':pfind.AppConstant.OBS_FINDING_CATEGORY}).pluck('findingsCategoryDesc').toString();
			
        	pfind.auditauditType 			= auditType[pfind.auditTypeId].src;
        	
        	prevFindingsFactory.getPrevFindingDetails(pfind.auditTypeId,moment(pfind.auditDate,MMMDDYYYY).format(YYYYMMDD),pfind.vesselImoNo,pfind.auditSeqNo,pfind.companyId,pfind.companyImoNo,pfind.docTypeNo).$promise.then(function(res){
        
        		var auditDate = moment(pfind.auditDate,MMMDDYYYY).format(YYYYMMDD);
        		
        	
        		pfind.dateFormatConversion(res);
        		
        		res = res.filter(function( obj ) {
    			
        			return obj.findingDetail[0].categoryId != 1004;
    			});
        		
        		pfind.observationarraypreviousFinal = res.filter(function( obj ) {
    				
        			return (obj.findingDetail[obj.findingDetail.length -1].statusId != pfind.AppConstant.VERIFIED_CLOSED || obj.findingDetail[obj.findingDetail.length -1].currentAuditSeq >= pfind.auditSeqNo || ((obj.findingDetail[obj.findingDetail.length -1].currentAuditSeq == 600000) && (moment(obj.findingDetail[obj.findingDetail.length -1].statusDate,MMMDDYYYY).format(YYYYMMDD)>auditDate)));
    			});
                /** added by archana for jira ID-IRI-4590 start*/
				pfind.observationarrayprevious = _.chain(pfind.observationarraypreviousFinal)
					.sortBy('findingSeqNo')
					.sortBy('auditSeqNo')
					.value();
				/** added by archana for jira ID-IRI-4590 end*/

               if(res.length>0){
    				
    				/*var findingData = [];
        			
        			res.forEach(function(a,aIndex){   			
            	    				    				
        				var findingDetails = [];
            	    				
        				a.auditFlag = true;
        				
        				a.findingDetail.forEach(function(stat){ 
        					
        					var currAuditSeq = stat.currentAuditSeq ? stat.currentAuditSeq : stat.origAuditSeqNo;
        					
        					if((stat.statusId==1005 || stat.categoryId == 1004) && (currAuditSeq < pfind.auditSeqNo) && (currAuditSeq!=600000 || (stat.statusDate <= auditDate) ) && a.findingSeqNo == stat.findingSeqNo){
        						
        						a.auditFlag = false;
        					
        					}
        				
        				});
        				
        				a.findingDetail.forEach(function(b,bIndex){
        					
        					//var orgSeq = b.origAuditSeqNo || b.currentAuditSeq;
        					var orgSeq = b.currentAuditSeq ? b.currentAuditSeq : b.origAuditSeqNo;
        					
        					b.updateFlag = true;
        					
    						if(a.findingSeqNo == b.findingSeqNo && b.categoryId != 1004 && b.statusDate && (b.currentAuditSeq<=pfind.auditSeqNo) && (b.currentAuditSeq!=600000 || (b.statusDate <= auditDate))){
            	        					 
    							var findingAttachment = [];       					
            	        					
    							b.findingRptAttachs.forEach(function(c){
    								
    								var cSeqNo = c.origAuditSeqNo || c.currentAuditSeq;
    								
    								if(b.statusSeqNo == c.statusSeqNo && a.auditSeqNo == orgSeq  && a.findingSeqNo == b.findingSeqNo && orgSeq == cSeqNo && a.findingSeqNo == c.findingSeqNo){
            							
    									findingAttachment.push({
    										
    										"fileName" : c.fileName,
            									
    										"fileSeqNo" : c.fileSeqNo,
            									
    										"ownerFlag" : c.ownerFlag
            									
    									});
    								}
    							});
    						
    							if(pfind.auditSeqNo == b.currentAuditSeq){
    								
    								b.updateFlag = false;
    								
    							}
    							
    							if(b.updateFlag==false){
    								
    								if(a.findingDetail[bIndex-1].updateFlag==true){
    								
    									b.minPrevDate = moment(pfind.FindingMaxDate,MMMDDYYYY);      									
    								}
    							}
    							
    							findingDetails.push({
    								
    								"currentAuditSeq"   : b.currentAuditSeq?b.currentAuditSeq:'',
    								
    								"statusSeqNo" 		: b.statusSeqNo,
    								
    								"findingSeqNo" 		: b.findingSeqNo,
            							
    								"categoryId" 		: b.categoryId,
            							
    								"descriptions"		: b.descriptions?b.descriptions:'',
    										
    								"statusId" 			: b.statusId?b.statusId:'',
            							
    								"dueDate" 			: b.dueDate?b.dueDate:'',
            							
    								"statusDate" 		: b.statusDate?moment(b.statusDate,YYYYMMDD).format(MMMDDYYYY):'',
            							
    								"nextActionId" 		: b.nextActionId?b.nextActionId:'',
            							
    								"updateFlag" 		: b.updateFlag,
    								
    								"minPrevDate" 		: b.minPrevDate,
            							
    								"findingRptAttachs" : findingAttachment
    								
    							});
            	        			
    						}
            	        				
    					});
        				        				
        				findingDetails.forEach(function(stat){ 
        					
        					if((stat.statusId!=1005 || stat.categoryId != 1004)){
        						
        						if(stat.updateFlag==false){
        							
        							a.auditFlag = true;
        						}
        					}
        					
        				
        				});
        				  
        				if(a.auditFlag){  
            								
        					findingData.push({
        						
        						"displayFinging":_(pfind.obsCategoryOptions).chain().where({'findingsCategoryId':findingDetails[findingDetails.length -1].categoryId}).pluck('findingsCategoryDesc').toString(),
        						
        						"findingSeqNo" 	: a.findingSeqNo,
            						
        						"auditCode" 	: a.auditCode,
        						
        						"auditElements" : a.auditElements?decodeURIComponent(a.auditElements):'',
        	             		   
        						"audSubTypeDesc": a.audSubTypeDesc,
        						
        						"auditorName" 	: a.auditorName,
        						
        						"auditDate" 	: a.auditDate?moment(a.auditDate,YYYYMMDD).format(MMMDDYYYY):'',
            					
        						"auditSeqNo" 	: a.auditSeqNo,
        						            						
        						"findingDetail"	: findingDetails
        					});
        					
        				}
            				
        			});
        			
        			pfind.observationarrayprevious = findingData;*/
        			
        			//pfind.countFindingCategoryPrev = _.countFindingCategory([],pfind.observationarrayprevious,pfind.auditTypeId,"PREV");
        			pfind.countFindingCategoryPrev = _.countFindingCategory(pfind.observationarrayprevious,pfind.auditTypeId,"PREV",pfind.obsCategoryOptions);
        			
        			_.countFindingCategory(pfind.findingData,pfind.auditTypeId,"CURR",pfind.obsCategoryOptions);
        			
        			pfind.observationarrayprevious.forEach(function(obs,aIndex){ 
        				
        				obs.auditDate = moment(obs.auditDate,YYYYMMDD).format(MMMDDYYYY);
        				
        				obs.auditElements= obs.auditElements?decodeURIComponent(obs.auditElements):'';
        				
        				if(obs.auditStatus){
        					obs.showAuditChangeCheckBox = true;
						}
        				
        				obs.findingDetail.forEach(function(b,bIndex){
        					
							var hasNumber = /\d/;
        					console.log(hasNumber.test(b.dueDate));
							b.dueDate = hasNumber.test(b.dueDate) == true?moment(b.dueDate).format(MMMDDYYYY): b.dueDate; // added by archana for jira id-MOBILE-711 ,MOBILE-719
        					b.updateFlag = pfind.auditSeqNo == b.currentAuditSeq ? false : true;
							
							if(b.updateFlag==false){
								
								if(obs.findingDetail[bIndex-1] && obs.findingDetail[bIndex-1].updateFlag==true){
								
									b.minPrevDate = pfind.FindingMaxDate;      									
								}
							}
							
        					/*if(pfind.closeMeeting){
        			
        						pfind.priorToDepatVsl = moment(pfind.closeMeeting,YYYYMMDD+ " HH:mm").format(MMMDDYYYY);
        					}
        			   		
         					if(b.currentAuditSeq == pfind.auditSeqNo && (b.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || b.categoryId ==  pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY ) && b.nextActionId==pfind.AppConstant.PLAN_ACCEPTED && pfind.auditTypeId == pfind.AppConstant.MLC_TYPE_ID ){
         				
         						b.dueDate = pfind.priorToDepatVsl;
         					 }*/
         					
         					if(b.categoryId == pfind.AppConstant.OBS_FINDING_CATEGORY || b.statusId==pfind.AppConstant.VERIFIED_CLOSED){
    							b.nextActionId2 = 'NIL';
    						}
         				});
        				
        				if(obs.findingDetail[obs.findingDetail.length-1].nextActionId){
    				
        					pfind.nextActionChangePrev(aIndex, obs.findingDetail.length-1, obs.findingDetail[obs.findingDetail.length-1].nextActionId);
    				    }
        			});  
        			
        			(pfind.observationarrayprevious.length>0)?(pfind.showPrevFinding = false):(pfind.showPrevFinding = true);
    			}
        		
        	});
        	
        }

        /********* go to home screen **********/
        function auditHome(){

            $state.go("app.audit.details",{},{reload:true})

        }
        
        /********* on change of next action setting row data **********/
        /*function nextActionChangePrev(prIndex,index,oldVal){
    		
    		if(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate){
    			
    			var len = pfind.observationarrayprevious[prIndex].findingDetail.length;
        		
        		var categoryId = pfind.observationarrayprevious[prIndex].findingDetail[index].categoryId;
        			
        		var statusId = pfind.observationarrayprevious[prIndex].findingDetail[index].statusId;
        		
        		var nAction = pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId;
        		
        		if(nAction == pfind.AppConstant.PREVIOUS_STATUS){
        			
        			if(pfind.observationarrayprevious[prIndex].findingDetail.length-1 > index){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.splice(-1,1);
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';
            			
        				pfind.setDisplayFinding(pfind.observationarrayprevious[prIndex].findingDetail[index-1].categoryId,prIndex);
        				
        				pfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs=[];
        				
            			
        			}else if(pfind.observationarrayprevious[prIndex].findingDetail.length-1 == index){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
        				
        				pfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs=[];
            		}
        			
        		}else if(categoryId == pfind.AppConstant.MAJOR_FINDING_CATEGORY && statusId == pfind.AppConstant.OPEN){
        			
        			if(nAction == pfind.AppConstant.DOWNGRADED){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.OPEN;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
            			
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
            				
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MAJOR_FINDING_CATEGORY,prIndex);
        			}
        				        				    					
        		}else if(categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && statusId == pfind.AppConstant.OPEN){
        			
        			if(nAction == pfind.AppConstant.PLAN_ACCEPTED && pfind.auditTypeId == pfind.AppConstant.ISM_TYPE_ID){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.PLAN_ACCEPTED;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
            			
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY,prIndex);
            			
        			}else if(nAction == pfind.AppConstant.COMPLAINCE_RESTORED && pfind.auditTypeId == pfind.AppConstant.ISPS_TYPE_ID || pfind.auditTypeId == pfind.AppConstant.MLC_TYPE_ID){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.COMPLAINCE_RESTORED;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
          
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY,prIndex);
        				
        			}			
        			    				
        		}else if(categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && statusId == pfind.AppConstant.PLAN_ACCEPTED){
        			
        			if(nAction == pfind.AppConstant.VERIFY_CLOSE){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.VERIFY_CLOSE;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
          
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			
            			pfind.observationarrayprevious[prIndex].findingDetail[index+1].dueDate = 'N.A.';
            			            			
            			$timeout(function(){
                			$("#description-"+prIndex+'-'+(index+1)).focus();
                		},0);
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY,prIndex);
        			}    				
        				
        		}else if(categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY && statusId == pfind.AppConstant.OPEN){
        			
        			if(nAction == pfind.AppConstant.PLAN_ACCEPTED && pfind.auditTypeId == pfind.AppConstant.ISM_TYPE_ID){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.PLAN_ACCEPTED;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MINOR_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
            				
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
            				
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment($scope.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MINOR_FINDING_CATEGORY,prIndex);
            			
        			}else if(nAction == pfind.AppConstant.COMPLAINCE_RESTORED && (pfind.auditTypeId == pfind.AppConstant.ISPS_TYPE_ID || pfind.auditTypeId == pfind.AppConstant.MLC_TYPE_ID)){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.COMPLAINCE_RESTORED;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MINOR_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
         
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
     
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment($scope.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MINOR_FINDING_CATEGORY,prIndex);
        				
        			}  				
        			    				
        		}else if(categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY && statusId == pfind.AppConstant.PLAN_ACCEPTED){
        			
        			if(nAction == pfind.AppConstant.VERIFY_CLOSE){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.VERIFY_CLOSE;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MINOR_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
            	
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{
            
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			            			
            			pfind.observationarrayprevious[prIndex].findingDetail[index+1].dueDate = 'N.A.';
            			
            			$timeout(function(){
                			$("#description-"+prIndex+'-'+(index+1)).focus();
                		},0);
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MINOR_FINDING_CATEGORY,prIndex);
        			} 
        			
        		}else if(categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && statusId == pfind.AppConstant.COMPLAINCE_RESTORED){
        			
        			if(nAction == pfind.AppConstant.PLAN_ACCEPTED){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.PLAN_ACCEPTED;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
    
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{

            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			            			
            			pfind.observationarrayprevious[prIndex].findingDetail[index+1].dueDate = 'N.A.';
            			
            			$timeout(function(){
                			$("#description-"+prIndex+'-'+(index+1)).focus();
                		},0);
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY,prIndex);
        			} 
        			
        		}else if(categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY && statusId == pfind.AppConstant.COMPLAINCE_RESTORED){
        			
        			if(nAction == pfind.AppConstant.PLAN_ACCEPTED){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory());
    					
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.AppConstant.PLAN_ACCEPTED;
                				
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.AppConstant.MINOR_FINDING_CATEGORY;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
            			
            			if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag){
            				
            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = pfind.FindingMaxDate;
            				
            			}else{

            				pfind.observationarrayprevious[prIndex].findingDetail[index+1].minPrevDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,MMMDDYYYY);
            			}
            			            			
            			pfind.observationarrayprevious[prIndex].findingDetail[index+1].dueDate = 'N.A.';
            			
            			$timeout(function(){
                			$("#description-"+prIndex+'-'+(index+1)).focus();
                		},0);
            			
            			pfind.setDisplayFinding(pfind.AppConstant.MINOR_FINDING_CATEGORY,prIndex);
        			}
        			
        		}else if(categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY && statusId == pfind.AppConstant.VERIFY_CLOSE){
        			
        			if(nAction == pfind.AppConstant.CLOSE){   
            			
        				pfind.setDisplayFinding(pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY,prIndex);
        			}
        		}else if(categoryId == pfind.AppConstant.OBS_FINDING_CATEGORY && statusId == pfind.AppConstant.OPEN){
        			
        			if(!nAction){   
            			
        				pfind.setDisplayFinding(pfind.AppConstant.OBS_FINDING_CATEGORY,prIndex);
        			}
        			
        		}    
    		
    		}
		}*/
        
		/********** on change of next action populating next row **********/
		var firstIndex =0;
        function nextActionChangePrev(prIndex,index,nAction){
        	//added by @Ramya on 14-11-2022 for jira id - IRI-5532
			if( index>=1 && pfind.observationarrayprevious && pfind.observationarrayprevious[prIndex].findingDetail[index-1].dueDate!=undefined && !pfind.observationarrayprevious[prIndex].findingDetail[index-1].dueDate)
			{		
				var nextActionDesc;
				pfind.obsStatusOptions.forEach(function(a) {
					if(a.findingsStatusId==pfind.observationarrayprevious[prIndex].findingDetail[index-1].nextActionId)
					{
						nextActionDesc=a.findingstStatusDesc;
					}

				});
				toaster.warning("Please Select Due Date for "+nextActionDesc);
					if (pfind.observationarrayprevious[prIndex].findingDetail.length - 1 > index) {
						console.log(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate)
						pfind.observationarrayprevious[prIndex].findingDetail.splice(-1, 1);
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
						
						pfind.FindingMinDate='';
						 
						pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';

						pfind.observationarrayprevious[prIndex].findingDetail[index].descriptions= '';		//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = '';
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace = '';
		
						pfind
								.setDisplayFinding(
										pfind.observationarrayprevious[prIndex].findingDetail[index].categoryId,
										prIndex);
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs = [];
		
						pfind.dueMinDate = '';
		
					} else if (pfind.observationarrayprevious[prIndex].findingDetail.length - 1 == index) {
						console.log(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate)
						pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';

						pfind.observationarrayprevious[prIndex].findingDetail[index].descriptions= '';		//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = '';
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace = '';
		
						pfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs = [];
		
						pfind.dueMinDate = '';
					}
				}
			else{
        	var callFromSetData = (nAction) ? true : false;
        	
        	var nAction = nAction ? nAction : pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId;
    		
    		if(nAction == pfind.AppConstant.PREVIOUS_STATUS){
    			
    			if(pfind.observationarrayprevious[prIndex].findingDetail.length-1 > index){
    				
    				pfind.observationarrayprevious[prIndex].findingDetail.splice(-1,1);
        			
    				pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
        			
    				pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
        			
    				pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';

					pfind.observationarrayprevious[prIndex].findingDetail[index].descriptions= '';		//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = '';
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace = '';
        			
    				pfind.setDisplayFinding(pfind.observationarrayprevious[prIndex].findingDetail[index].categoryId,prIndex);
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs=[];
    				
        			
    			}else if(pfind.observationarrayprevious[prIndex].findingDetail.length-1 == index){
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
        			
    				pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate = '';
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = '';

					pfind.observationarrayprevious[prIndex].findingDetail[index].descriptions= '';		//added by @Ramya on 3-2-2023 for Jira id - IRI-5636
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = '';
    				
    				pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace = '';
    				//alert('here');
    				pfind.observationarrayprevious[prIndex].findingDetail[index].findingRptAttachs=[];
    			}
    			
    			if(pfind.observationarrayprevious[prIndex].showAuditChangeCheckBox){
    				
    				var auditSeqNo = pfind.observationarrayprevious[prIndex].auditSeqNo;
    				
    				pfind.observationarrayprevious.forEach(function(obj){
						if(obj.auditSeqNo == auditSeqNo){
							obj.showAuditChangeCheckBox = false;
							obj.auditStatus = 0;
						}
					});
    			}
    			
    		}else{
    			
    			if(pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace || pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag || pfind.observationarrayprevious[prIndex].findingDetail[index].statusId == pfind.AppConstant.VERIFIED_CLOSED){
    				
    				var categoryId = pfind.observationarrayprevious[prIndex].findingDetail[0].categoryId;
    				
    				var auditSubTypeId = pfind.observationarrayprevious[prIndex].auditSubTypeId;
    				
    				if(pfind.auditTypeId == pfind.AppConstant.ISPS_TYPE_ID && (auditSubTypeId==1003 || auditSubTypeId==1005) && categoryId == 1002){
    					categoryId = 1003;
    				}
    				
        			if(nAction != pfind.AppConstant.NIL){
        				
        				pfind.observationarrayprevious[prIndex].findingDetail.push(pfind.addCategory(pfind.observationarrayprevious[prIndex].findingSeqNo,index+2));
            			
            			pfind.observationarrayprevious[prIndex].findingDetail[index+1].categoryId = pfind.CarFlowStructure[pfind.auditTypeId][categoryId][index+1].categoryId;
            			
        				pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusId = pfind.CarFlowStructure[pfind.auditTypeId][categoryId][index+1].statusId;
        				
						pfind.observationarrayprevious[prIndex].findingDetail[index+1].updateFlag = false;
						 
					 if(firstIndex ==0){
						// pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusDate = pfind.closeMeeting ? moment(pfind.closeMeeting,YYYYMMDD).format(MMMDDYYYY) : '';
						 firstIndex++; 
					 }else{
						// pfind.observationarrayprevious[prIndex].findingDetail[index+1].statusDate = pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate ? pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate : ''; 
					 }
						 
						
						pfind.setDisplayFinding(pfind.CarFlowStructure[pfind.auditTypeId][categoryId][index+1].categoryId,prIndex);
        				
        				if(nAction == pfind.AppConstant.VERIFY_CLOSE){
        					$timeout(function(){
        	        			$("#description-"+prIndex+'-'+(index+1)).focus();
        	        		},0);
        				}
        				
        			}else{
        				
        				var auditSeqNo = pfind.observationarrayprevious[prIndex].auditSeqNo;
        				
        				var listOfFindingsOfSameAudit = pfind.observationarrayprevious.filter(function( obj ) {
        					return obj.auditSeqNo == auditSeqNo;
        				});
        				
        				var listOfOpenFindingsOfsameAudit = listOfFindingsOfSameAudit.filter(function( obj ) {
        					return !(obj.findingDetail[obj.findingDetail.length-1].statusId == pfind.AppConstant.VERIFIED_CLOSED && obj.findingDetail[obj.findingDetail.length-1].statusDate);
        				});
        				
        				if(!(listOfOpenFindingsOfsameAudit) || listOfOpenFindingsOfsameAudit.length==0){
        					
        					pfind.observationarrayprevious.forEach(function(obj){
        						if(obj.auditSeqNo == auditSeqNo){
        							obj.showAuditChangeCheckBox = true; 
        						}
        					});
        				}
        				
        				pfind.setDisplayFinding(pfind.CarFlowStructure[pfind.auditTypeId][categoryId][index].categoryId,prIndex);
        				
        			}
        			
        			if(!(callFromSetData) && pfind.observationarrayprevious[prIndex].findingDetail[index].updateFlag==false){
        				
        				var msg = '';
        					
        				if(pfind.observationarrayprevious[prIndex].findingDetail[index].statusId == pfind.AppConstant.PLAN_ACCEPTED){
        					
        					msg = "Plan has been accepted as part of "+ pfind.AppConstant.AUDIT_SUB_TYPE[pfind.auditSubtypeId].SUB_TYPE_DESC +' '+ pfind.inspectionAudit +' at '+ pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate;//moment(new Date()).format(MMMDDYYYY);
            			
        				}else if(pfind.observationarrayprevious[prIndex].findingDetail[index].statusId == pfind.AppConstant.VERIFIED_CLOSED){
        					
        					msg = "Verify/Close Status has been updated as part of "+ pfind.AppConstant.AUDIT_SUB_TYPE[pfind.auditSubtypeId].SUB_TYPE_DESC +' '+ pfind.inspectionAudit +' at '+ pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate;//moment(new Date()).format(MMMDDYYYY);
            			}
        					
        				pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = msg;
        				
        				if(!(pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace)){
        					pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
        					toaster.warning('Please enter '+pfind.auditType+' Place Under '+pfind.observationarrayprevious[prIndex].serialNo);
        				}
        			}
    			}else{
    				toaster.warning('Please enter '+pfind.auditType+' Place Under '+pfind.observationarrayprevious[prIndex].serialNo);
    				pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId = '';
    			}
    		}
		}
        }//end of nextActionChangePrev(prIndex,index)
        
        function setUpdateDescOnPlaceChange(prIndex,index){
        	
        	if(pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription){
        		
        		var msg = '';
        		
        		if(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate){
        			
        			if(pfind.observationarrayprevious[prIndex].findingDetail[index].statusId == pfind.AppConstant.PLAN_ACCEPTED){
            			
            			msg = "Plan has been accepted as part of "+ pfind.AppConstant.AUDIT_SUB_TYPE[pfind.auditSubtypeId].SUB_TYPE_DESC +' '+ pfind.inspectionAudit +' at '+ pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate; //moment(new Date()).format(MMMDDYYYY);
            		
            		}else if(pfind.observationarrayprevious[prIndex].findingDetail[index].statusId == pfind.AppConstant.VERIFIED_CLOSED){
            			
            			msg = "Verify/Close Status has been updated as part of "+ pfind.AppConstant.AUDIT_SUB_TYPE[pfind.auditSubtypeId].SUB_TYPE_DESC +' '+ pfind.inspectionAudit +' at '+ pfind.observationarrayprevious[prIndex].findingDetail[index].auditPlace +' by '+ sessionStorage.getItem('usrname')+' on '+ pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate; //moment(new Date()).format(MMMDDYYYY);
            		}
        		}else{
        			msg = '';
        		}
        		
        		//pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription ? pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription : msg;
        		pfind.observationarrayprevious[prIndex].findingDetail[index].updateDescription = msg;
        	}
        }// end of setUpdateDescOnPlaceChange()
        
        /********* for setting category data **********/
        function setDisplayFinding(categoryId,prIndex){
    		    			
        	pfind.observationarrayprevious[prIndex].displayFinging = _(pfind.obsCategoryOptions).chain().where({'findingsCategoryId':Number(categoryId)}).pluck('findingsCategoryDesc').toString();
        
        	//pfind.countFindingCategoryPrev = _.countFindingCategory([],pfind.observationarrayprevious,pfind.auditTypeId,"PREV");
        	pfind.countFindingCategoryPrev = _.countFindingCategory(pfind.observationarrayprevious,pfind.auditTypeId,"PREV",pfind.obsCategoryOptions);
			
        }
        
        /********** for disabling next action drop down data **********/
        function disableNextAction(stat,catgs,index,prIndex){
        	
        	switch(pfind.auditTypeId){
        	case pfind.AppConstant.ISM_TYPE_ID:
        	
        		return !(catgs.categoryId == pfind.AppConstant.MAJOR_FINDING_CATEGORY && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId == pfind.AppConstant.DOWNGRADED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId == pfind.AppConstant.PLAN_ACCEPTED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.PLAN_ACCEPTED && (stat.findingsStatusId == pfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == pfind.AppConstant.CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	case pfind.AppConstant.ISPS_TYPE_ID:
        		
        		return !(catgs.categoryId == pfind.AppConstant.MAJOR_FINDING_CATEGORY && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId == pfind.AppConstant.DOWNGRADED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId == pfind.AppConstant.COMPLAINCE_RESTORED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.COMPLAINCE_RESTORED && (stat.findingsStatusId == pfind.AppConstant.PLAN_ACCEPTED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.PLAN_ACCEPTED && (stat.findingsStatusId == pfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == pfind.AppConstant.CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	case pfind.AppConstant.MLC_TYPE_ID:
        		
        		return !(catgs.categoryId == pfind.AppConstant.MAJOR_FINDING_CATEGORY && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId == pfind.AppConstant.DOWNGRADED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId == pfind.AppConstant.COMPLAINCE_RESTORED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.COMPLAINCE_RESTORED && (stat.findingsStatusId == pfind.AppConstant.PLAN_ACCEPTED || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) && 
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.PLAN_ACCEPTED && (stat.findingsStatusId == pfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) &&  
        		!((catgs.categoryId == pfind.AppConstant.MINOR_FINDING_CATEGORY || catgs.categoryId == pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY) && catgs.statusId == pfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == pfind.AppConstant.CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	case pfind.AppConstant.SSP_TYPE_ID:
        		
        		return !(catgs.categoryId == pfind.AppConstant.REVIEW_NOTE && catgs.statusId == pfind.AppConstant.OPEN && (stat.findingsStatusId ==  pfind.AppConstant.VERIFY_CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS ))) &&  
        		!(catgs.categoryId == pfind.AppConstant.REVIEW_NOTE && catgs.statusId ==  pfind.AppConstant.VERIFY_CLOSE && (stat.findingsStatusId == pfind.AppConstant.CLOSE || (stat.findingsStatusId == pfind.AppConstant.PREVIOUS_STATUS )));
        		
        		break;
        		
        	}
        	
        }
        
        /********* for setting min and max date for status date **********/
        function setPrevFindMaxDate(val,val2,prevcatgs){
        	  
        	var testDate = moment(val,MMMDDYYYY).format(YYYYMMDD);
        	var openMeetDate = pfind.openMeeting ? moment(pfind.openMeeting,MMMDDYYYY).format(YYYYMMDD):'';
        	 
        	pfind.prevFindMinStatusDate = openMeetDate && openMeetDate>testDate ? openMeetDate: prevcatgs.currentAuditSeq == pfind.auditSeqNo ? testDate : openMeetDate ;
        	pfind.prevFindMaxStatusDate = val2?moment(val2,MMMDDYYYY).format(YYYYMMDD): pfind.closeMeeting?pfind.closeMeeting:'';
        	
        	pfind.FindingMinDate = openMeetDate;
        	pfind.FindingMaxDate = pfind.closeMeeting?pfind.closeMeeting:'';
        }
        
        /********* for saving previous finding data **********/
        function findingSave(event){
        	
        	if(pfind.observationarrayprevious.length>0 && pfind.findingValidation()){
				
        		var data = pfind.setFindingData();
        		
				blockUI.start('Saving Previous Finding Data');
				
				data.forEach(function(a,val){    				
					$timeout(function(){		//added by @Ramya for Jira id - IRI-5633
					auditFactory.saveFindingData(a,'Update','PF',pfind.auditTypeId,pfind.companyId).$promise.then(function(res){
								
						pfind.res=res;
								
						if(res.auditCode){  
							
							blockUI.stop();
							
							toaster.success("Previous Finding(s) updated Successfully");
							
							pfind.PreviousfindingsForm.$dirty=false;
									
							if(event=='/details')
							{
							SetPrevIousFinding();
							$state.go('app.audit.details',{},{reload:true});
							}
							
							findingsFactory.createOrgBlob(pfind.auditSeqNo,pfind.auditTypeId,pfind.companyId).$promise.then(function(tempRes){
            					console.log(tempRes);
            					console.log("Hi");
            					//console.log(screenData);
            				});
							
							if(val == (data.length-1))
							{
								
								prevFindingsFactory.createBlob(pfind.auditSeqNo,pfind.companyId).$promise.then(function(res){
									console.log(res);
								});
								
							}	
						}else{
							
							blockUI.stop();
						}
					});  
					},0);
				});
				
				
				
				
			}
        }// end of findingSave()
        
        
        
        $rootScope.$on('$stateChangeStart', function(event, fromState, toParams,toState) {
      	  
      	  var element=angular.element(document.getElementById("loader"));
      	  
      	  if(pfind.PreviousfindingsForm)
  			{
    			
      		  if(pfind.PreviousfindingsForm.$dirty)
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
    		
    		var screenData = pfind.observationarrayprevious;
    		
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
					var dueDateMsg=0;
					a.findingDetail
							.forEach(function(b) {
								if (b.nextActionId && !b.statusDate 
									&& b.categoryId != pfind.AppConstant.OBS_FINDING_CATEGORY) {
										var nextActionDescr;
										pfind.obsStatusOptions.forEach(function(status) {
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
        				}else if(b.statusDate && b.categoryId != pfind.AppConstant.OBS_FINDING_CATEGORY && (!b.nextActionId || b.nextActionId == pfind.AppConstant.PREVIOUS_STATUS)){
        					
        					flag = false;
        					
    						toaster.warning("Please Select the Next Action Under " + a.serialNo);
    						
        				} else if (!(b.dueDate)
							&& b.categoryId != pfind.AppConstant.OBS_FINDING_CATEGORY
							&& b.statusDate) {
								var nextActionDescr;
								pfind.obsStatusOptions.forEach(function(status) {
								if(status.findingsStatusId==b.nextActionId)
								{
									nextActionDescr=status.findingstStatusDesc;
								}
								});
								flag = false;
								dueDateMsg++;
								if(dueDateMsg==1){
								toaster.warning("Please Select the Due Date for "+nextActionDescr +" Under " + a.serialNo);	//changed by @Ramya on 14-11-2022 for jira id - IRI-5532
							}
							}
    				});
    			}
    			
    			if(flag && a.showAuditChangeCheckBox && !(a.auditStatus)){
    				
    				flag = false;
    				
    				toaster.warning("please mark to complete previous "+pfind.auditType);
        		}
    			
    		});
    		    			
    		return flag;
    	}
        
        /***** to set previous finding json data *****/
        function setFindingData(){
    		
    		var findingData = [], findingDetailsData = [], findingAttachments = [];
    		
    		pfind.observationarrayprevious.forEach(function(a,index){   
    			
    			if((a.findingDetail[0].statusDate && a.findingDetail[0].nextActionId)|| a.findingDetail[0].categoryId==1004){
    				
    				var flag=true , findingStatusId=0;
    				
    				findingDetailsData = [];
        			
        			a.findingDetail.forEach(function(b,subIndex){ 
        				
        				var regExp = new RegExp("'", "g");
        				
        				findingAttachments = [];
            			
            			var desc = b.descriptions?b.descriptions.replace(regExp,"''"):'';
            			
            			if(b.statusDate && flag && (b.nextActionId || b.statusId == pfind.AppConstant.VERIFIED_CLOSED)){
            					
            				
            				if((b.statusId == pfind.AppConstant.VERIFIED_CLOSED && b.statusDate) || b.categoryId==pfind.AppConstant.OBS_FINDING_CATEGORY){
            					
        						findingStatusId = 1;
        					}
            				
            				//if(!b.updateFlag){
            					
            					b.findingRptAttachs.forEach(function(c,cIndex){
                					
            						findingAttachments.push({
            						
            							"fileSeqNo" : c.fileSeqNo? c.fileSeqNo : (Number(cIndex)+1),
            						
            							"fileName" : c.fileName ? c.fileName: "",
            						
            							"ownerFlag" :  0,

            	        				"userIns" : c.userIns ? c.userIns : (sessionStorage.getItem("emailId")).toString(),
            	                				
            	                		"dateIns" : c.dateIns ? c.dateIns : moment(new Date()).format(YYYYMMDD),
            	                		
            	                		"findingFileByte" : c.findingFileByte ? btoa(c.findingFileByte):null,
            	                		
            	                		"findingSeqNo" : c.findingSeqNo ? c.findingSeqNo : a.findingSeqNo,
            	                		
            	                		"origAuditSeqNo" : c.origAuditSeqNo ? c.origAuditSeqNo : a.auditSeqNo,
            	                		
            	                		"currentAuditSeq" :  b.updateFlag?a.auditSeqNo:Number(pfind.auditSeqNo),
            	                		
            	                		"companyId" : c.companyId ? c.companyId : Number(pfind.companyId),
            	                		
            	                		"statusSeqNo" : c.statusSeqNo ? c.statusSeqNo : Number(subIndex)+1,
            	                		
            	                		"auditTypeId" : c.auditTypeId ? c.auditTypeId : pfind.auditTypeId
            	                				
            								
            						});
            					
            					});
            					
            					findingDetailsData.push({
    		    					
            						"statusSeqNo" : b.statusSeqNo ? b.statusSeqNo : Number(subIndex)+1,
            						
            						"findingSeqNo" : b.findingSeqNo ? b.findingSeqNo : a.findingSeqNo,
            						
            						"origAuditSeqNo" : b.origAuditSeqNo ? b.origAuditSeqNo : a.auditSeqNo,
            						
            						"currentAuditSeq" : b.currentAuditSeq?b.currentAuditSeq:Number(pfind.auditSeqNo),
            						
            						"companyId" : b.companyId ? b.companyId : Number(pfind.companyId),
                					
                					"auditTypeId" : b.auditTypeId ? b.auditTypeId : pfind.auditTypeId,
            					    					        					
            						"categoryId" : b.categoryId ? b.categoryId :  "",
            					
            						"statusId" : b.statusId || "",
            					
            						"statusDate" : moment(b.statusDate,MMMDDYYYY).format(YYYYMMDD),		//changed by @Ramya for Jira id - IRI-5578
            					
            						"nextActionId" : b.nextActionId || "",
            					
            						"dueDate" : b.dueDate ? b.dueDate : "",
            					
            						"descriptions" : desc || "",
            						
            						"userIns" : b.userIns ? b.userIns : (sessionStorage.getItem("emailId")).toString(),
                    				
                    				"dateIns" : b.dateIns ? b.dateIns : moment(new Date()).format(YYYYMMDD),
                    				
                    				"findingRptAttachs" : findingAttachments,
                    				
                    				"updateDescription" : b.updateDescription ? b.updateDescription : '',
                    						
                    				"auditPlace"   		: b.auditPlace ? b.auditPlace : ''
            					
            					});
                				
            				//}
        				
            				
            			}else{
            				flag=false;
            			}
        				
        			});
        			
        			findingData.push({
    					   				
    					"auditSeqNo" : a.auditSeqNo?a.auditSeqNo:'',
    					
    					"findingSeqNo" :  a.findingSeqNo,
    				
    					"companyId" : a.companyId ? a.companyId : Number(pfind.companyId),
    					
    					"auditTypeId" : pfind.auditTypeId,
    				
    					"auditDate" : a.auditDate? moment(a.auditDate,MMMDDYYYY).format(YYYYMMDD):'',
        						
    	    			"auditCode" : a.auditCode || '',
    	    					
    	    			"userIns" : a.userIns ? a.userIns : (sessionStorage.getItem("emailId")).toString(),
    	        				
    	        		"dateIns" : moment(new Date()).format(YYYYMMDD),
        				
        				"findingDetail" : findingDetailsData,

						"findingDetailModel":findingDetailsData,		/*added by @Ramya for Jira id - IRI-5633*/
        				
        				"findingStatus" : findingStatusId,
        				
        				"auditStatus"   : a.auditStatus ? a.auditStatus : 0,
        						
        				"serialNo" : a.serialNo ? a.serialNo : 0
    			
    				});
    			}
    			
    			
    		});
    		
    		return findingData;
    		
    	}
        
        /********** for file upload **********/
        function uploadFindingsAttach(prIndex,index){
        	        	
        	_.fileUpload(pfind.observationarrayprevious,prIndex,index); 
    		
    	}
        
        /********** for setting due date **********/
        function setPrevFindDueDate(prIndex,index,categoryId,nActionId){
        	
        	var categoryId2 = pfind.observationarrayprevious[prIndex].findingDetail[0].categoryId;
        	var auditSubTypeId = pfind.observationarrayprevious[prIndex].auditSubTypeId;
			
        	if(pfind.auditTypeId == pfind.AppConstant.ISPS_TYPE_ID && (auditSubTypeId==1003 || auditSubTypeId==1005) && categoryId == 1002){
        		categoryId2 = 1003;
			}
        	
        	if(nActionId && nActionId!=pfind.AppConstant.PREVIOUS_STATUS){
        		
        		var dueDate = pfind.CarFlowStructure[pfind.auditTypeId][categoryId2][index].dueDate;
            	
            	pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = dueDate;
            	
            	/*if(pfind.auditTypeId==pfind.AppConstant.MLC_TYPE_ID && dueDate == 'PRIOR TO DEPARTING VESSEL'){
            		
            		pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate= pfind.priorToDepatVsl;
    		    
            	}else */
            		
            	 
            	pfind.dueMaxDate='';
            	if(!(isNaN(dueDate))){            
            		pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = pfind.closeMeeting ? moment(pfind.closeMeeting,YYYYMMDD).add(dueDate,'days').format(DDMMMYYYY) : '';
            		pfind.dueMaxDate = pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate;
            	}else if(dueDate=='NEXT SCHEDULED AUDIT'){
            		pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = pfind.AppConstant.AUDIT_SUB_TYPE[pfind.auditSubtypeId].nextScheduledType+' '+pfind.inspectionAudit;
    		    }
            	
        	}
        	
        	if(categoryId2 == pfind.AppConstant.OBS_FINDING_CATEGORY){
        		
        		pfind.observationarrayprevious[prIndex].findingDetail[index].nextActionId2 = 'NIL';
        	}
        }
        
        /*function setPrevFindDueDate(prIndex,index,categoryId,nActionId){
        	
        	switch (categoryId) {
    		
			case pfind.AppConstant.MAJOR_FINDING_CATEGORY:
				
				if(nActionId == pfind.AppConstant.DOWNGRADED){	
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'CURRENT '+pfind.inspectionAudit;					
				}	
				
				break;
				
			case pfind.AppConstant.MAJOR_DOWNGRADE_FINDING_CATEGORY: 
				
				if(nActionId == pfind.AppConstant.PLAN_ACCEPTED){
					
					if((moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,DDMMMYYYY).format(YYYYMMDD)) > (moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,DDMMMYYYY).add(29,'days').format(YYYYMMDD))){
         		         toaster.warning('Please select the Date prior to the due date'+ moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,MMMDDYYYY).add(29,'days').format(MMMDDYYYY));
         		        }
					if(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate){
						
						 if(pfind.auditTypeId==pfind.AppConstant.MLC_TYPE_ID)
					     { 	 pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate= pfind.priorToDepatVsl;
			             }else{    
			            	 pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,MMMDDYYYY).add(29,'days').format(MMMDDYYYY);
			                  }
				 	}
					
				}else if(nActionId == pfind.AppConstant.VERIFY_CLOSE){
					
					if(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate){
						
						pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,MMMDDYYYY).add(89,'days').format(MMMDDYYYY);
					}
					
				}else if(nActionId==pfind.AppConstant.CLOSE){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'N.A.';
					
				}else if(nActionId == pfind.AppConstant.COMPLAINCE_RESTORED){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'DURING CURRENT '+pfind.inspectionAudit;					
				}	
				
				break;
				
			case pfind.AppConstant.MINOR_FINDING_CATEGORY:
				
				if(nActionId == pfind.AppConstant.PLAN_ACCEPTED){
					
					if((moment(pfind.observationarrayprevious[prIndex].findingDetail[index].statusDate,DDMMMYYYY).format(YYYYMMDD)) > (moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,DDMMMYYYY).add(29,'days').format(YYYYMMDD))){
         		         toaster.warning('Please select the Date prior to the due date'+ moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,MMMDDYYYY).add(29,'days').format(MMMDDYYYY));
         		       }
					  if(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate){
					
						if(pfind.auditTypeId==pfind.AppConstant.MLC_TYPE_ID)
					     {pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate=pfind.priorToDepatVsl;
			             }else{ 
			            	 pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = moment(pfind.observationarrayprevious[prIndex].findingDetail[0].statusDate,MMMDDYYYY).add(29,'days').format(MMMDDYYYY);
			             }
					}
					
					if(pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate){
						
						//pfind.setAudSumDate(pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate,prIndex,index);
					}
					
				}else if(nActionId == pfind.AppConstant.VERIFY_CLOSE){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'NEXT SCHEDULED AUDIT';
					
				}else if(nActionId == pfind.AppConstant.CLOSE){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'N.A.';
					
				}else if(nActionId == pfind.AppConstant.COMPLAINCE_RESTORED){ 
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'DURING CURRENT '+pfind.inspectionAudit;					
				}	
				
				break;
				
			case pfind.AppConstant.OBS_FINDING_CATEGORY:
				
				if(!nActionId){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'N.A.';
				}
				break;
			case pfind.AppConstant.REVIEW_NOTE:
				
				if(nActionId == pfind.AppConstant.VERIFY_CLOSE){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'DURING CURRENT REVIEW / AUDIT';
					
				}else if(nActionId == pfind.AppConstant.CLOSE){
					
					pfind.observationarrayprevious[prIndex].findingDetail[index].dueDate = 'N.A.';
				}
				break;
			}
    		
    	}*/
        
        /**********modal window pop up for preview**********/
    	function preview(file,pIndex,cIndex,index){ 
    		
    		blockUI.start();
    		
    		pfind.findingFileClick = false;
    		
    		var seqNo, inputs, byteArray;
    		
    		var fileExtension = file.split('.').pop(); 
    		
    		byteArray = pfind.observationarrayprevious[pIndex].findingDetail[cIndex].findingRptAttachs[index].findingFileByte;
    		    		
    		seqNo = pfind.observationarrayprevious[pIndex].auditSeqNo;
    		
    		var findingSeqNo = pfind.observationarrayprevious[pIndex].findingSeqNo;
    		
    		inputs = {
    				
    			ModalData :'',
    				
    			fileData : {"fileName":file,"audSeqNo":seqNo,"findNo":findingSeqNo,"findSeqNo":(Number(cIndex)+1),"audType":pfind.auditauditType,"byteArray":byteArray,"auditTypeId":pfind.auditTypeId}
    		
    		};
    		
    		auditFactory.downloadFindingFile(seqNo,findingSeqNo,file,(Number(cIndex)+1),pfind.auditTypeId,pfind.companyId).$promise.then(function(res){
    			
    			if(fileExtension == 'xlsx' || fileExtension == 'docx' || fileExtension == 'xls' || fileExtension == 'doc'){
    	        	
    				if(inputs.fileData.byteArray){
    					
    					var bytes = new Uint8Array(inputs.fileData.byteArray.length);
    		    	    
    		    	    for (var i = 0; i < inputs.fileData.byteArray.length ; i++){
    		    	        bytes[i] = inputs.fileData.byteArray.charCodeAt(i);
    		    	     }
    		    	   
    		    	    pfind.downloadFiles(new Blob([bytes.buffer], {type : res.headersGetter('content-type')}),file);
    		    	    
    		    	    blockUI.stop();
    		    	    
    		    	    pfind.findingFileClick = true;
    		    	    
            			return;
    					
    				}
    				
    				pfind.downloadFiles(new Blob([res.data], {type : res.headersGetter('content-type')}),file);
    				
    				pfind.findingFileClick = true;
    				
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
    	    			
    	    			pfind.findingFileClick = true;
    	    			
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
    		
    		seqNo = pfind.observationarrayprevious[pIndex].auditSeqNo;
    		
    		fileByte = pfind.observationarrayprevious[pIndex].findingDetail[cIndex].findingRptAttachs[index].findingFileByte;
    		
    		var findingSeqNo = pfind.observationarrayprevious[pIndex].findingSeqNo;
    		    		
    		if(fileByte){
				
				var bytes = new Uint8Array(fileByte.length);
	    	    
	    	    for (var i = 0; i < fileByte.length ; i++){
	    	        bytes[i] = fileByte.charCodeAt(i);
	    	    }
	    	   
	    	    pfind.downloadFiles(new Blob([bytes.buffer], {type : 'content-type'}),file);
	    	    
	    	    blockUI.stop();
	    	    
    			return;
    		}
    		        		
    		auditFactory.downloadFindingFile(seqNo,findingSeqNo,file,Number(cIndex)+1,pfind.auditTypeId,pfind.companyId).$promise.then(function(res){ 
    			
    			if(res.status == 200){
    				
    				pfind.downloadFiles(new Blob([res.data],{type:'Content-Type'}), file);
    				
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
    		    		    		    		
    		    		pfind.observationarrayprevious[pIndex].findingDetail[cIndex].findingRptAttachs.splice(index,1);
    		    		
    		    		blockUI.stop();
    		    		
    				}
    			});
    			
    		});   		
    		    			
    	}
    	
    	/********Lock Applied or Released**********/
    	function changeCallback() {
    		
    			if (pfind.enabled) {
    				pfind.createedit = 'Lock';
    				detailsFactory.updateLockHolder(pfind.auditTypeId, pfind.auditSeqNo,sessionStorage.getItem('emailId'),pfind.companyId).$promise.then(function(data){
    					if(data.data=='Success'){
    						toaster.success('Lock has been applied Successfully');
    						
    						pfind.lockStatus = false;
    							
    	 				}else{
    						toaster.warning('Current '+pfind.auditType+' Locked by '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('firstName').toString()+' '+_(auditorName).chain().where({'emailId':data.lockHolder}).pluck('lastName').toString());
    						
    						pfind.enabled = false;
    					}
    				});	
    				
    			} else {
    				pfind.createedit = 'Unlock';
    				detailsFactory.updateLockHolder(pfind.auditTypeId, pfind.auditSeqNo,' ',pfind.companyId).$promise.then(function(data){
    					if(data.data=='Success'){
    						
    						toaster.success('Lock Released Successfully');
    						
    						pfind.lockStatus = true;
    					}
    	 			});
    			}
    	}
    	
    	
          function dateFormatConversion(obj){
         	 
	        	obj.forEach(function(preFindings){
	        		
	        		//preFindings.auditDate = preFindings.auditDate?moment(new Date(preFindings.auditDate)).format(YYYYMMDD):'';
	        		preFindings.auditDate = preFindings.auditDate?moment(preFindings.auditDate).format(YYYYMMDD):'';
	    			
	    			preFindings.findingDetail.forEach(function(preFinding){
	    	
	    				/*preFinding.dateIns =   preFinding.dateIns?moment(new Date(preFinding.dateIns)).format(YYYYMMDD):'';
	    				preFinding.statusDate = preFinding.statusDate?moment(new Date(preFinding.statusDate)).format(MMMDDYYYY):'';
	    				*/
	    				preFinding.dateIns =   preFinding.dateIns?moment(preFinding.dateIns).format(YYYYMMDD):'';
	    				preFinding.statusDate = preFinding.statusDate?moment(preFinding.statusDate).format(MMMDDYYYY):'';
	    		    });
	    		});
      }//end of dateFormatConversion(obj)
          
          function changeCompleteFlagForAll(index,newValue){
        	  
        	  var auditSeqNo = pfind.observationarrayprevious[index].auditSeqNo;
				
				pfind.observationarrayprevious.forEach(function(obj){
					if(obj.auditSeqNo == auditSeqNo){
						obj.auditStatus = newValue;
					}
				});
          }
          
          function setNilNextActionForObs(pIndex,index){
      		
        	var categoryId = pfind.observationarrayprevious[pIndex].findingDetail[index].categoryId;
        	var auditSubTypeId = pfind.observationarrayprevious[pIndex].auditSubTypeId;
			
        	if(pfind.auditTypeId == pfind.AppConstant.ISPS_TYPE_ID && (auditSubTypeId==1003 || auditSubTypeId==1005) && categoryId == 1002){
        		categoryId = 1003;
			}
      		
      		if(pfind.observationarrayprevious[pIndex].findingDetail[index].statusId==pfind.AppConstant.VERIFIED_CLOSED){
      			
      			if(pfind.observationarrayprevious[pIndex].findingDetail[index].statusDate){
          			
      				pfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId2 = 'NIL';
          			//pfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId = pfind.CarFlowStructure[pfind.auditTypeId][categoryId][index].nextActionId;
          			
      				pfind.nextActionChangePrev(pIndex,index,pfind.AppConstant.NIL);
          			pfind.observationarrayprevious[pIndex].findingDetail[index].dueDate = pfind.CarFlowStructure[pfind.auditTypeId][categoryId][index].dueDate;
          			
          		}else{
          			pfind.nextActionChangePrev(pIndex,index,pfind.AppConstant.PREVIOUS_STATUS);
          			pfind.observationarrayprevious[pIndex].findingDetail[index].nextActionId2 = '';
          		}
      		}else{
      			pfind.setUpdateDescOnPlaceChange(pIndex,index)
      		}	
      	 }//end of setNilNextActionForObs(pIndex,index)
		
        
        /********** END OF CONTROLLER **********/
    }
    
})();