(function (){
	
    'use strict';

    angular
    	.module('app.carMaintenance')
        
        .factory('carMaintenanceFactory', carMaintenanceFactory);
    
    function carMaintenanceFactory(carMaintenanceApi){    	   
    	
	    var carMaintenanceFactory = {
	    		
	        getAuditSubType:getAuditSubType,
	    	getAudSubType:getAudSubType,
	    	getObsCategory:getObsCategory,
	    	getAuditObsCategory:getAuditObsCategory,
	    	getObsStatus:getObsStatus,
	    	getAudObsStatus:getAudObsStatus,
	    	getDistinctAudObsStatus:getDistinctAudObsStatus,
	    	
	    	getAudObsType:getAudObsType,
	    	getVesselData:getVesselData,
	    	getAuditType:getAuditType,
	    	getAllAuditCode:getAllAuditCode,
	    	
	    	getAuditCode:getAuditCode,
	    	getAudObsData:getAudObsData,
	    	unlinkFindingFiles:unlinkFindingFiles,
	    	
	    	downloadFindingFile:downloadFindingFile,
	    	getHistorySearchResult:getHistorySearchResult,
	    	getHistorySearchCount:getHistorySearchCount,
	    	
	    	saveFindingFiles:saveFindingFiles,
	    	getHistoryFindingData:getHistoryFindingData,
	    	updateCarMaintainanceFinding:updateCarMaintainanceFinding,
	    	checkAuditCompleted:checkAuditCompleted,
	    	getVesselImoNoDetails:getVesselImoNoDetails,
	    	getVesselNameDetails:getVesselNameDetails,
	    	generateSearchReport:generateSearchReport,
	    	getAllFingingStatus:getAllFingingStatus,
	    	leadAuditorNames:leadAuditorNames,
	    	getObsCategorySearch:getObsCategorySearch,
	    	checkAuditorAndNextAdtData:checkAuditorAndNextAdtData
	    };

	    return carMaintenanceFactory;
	    
	    function generateSearchReport(data,screenId,category,format,companyId){
  		   return carMaintenanceApi.generateSearchReport.put({screenId:screenId,category:category,format:format,companyId:companyId,method:'POST',catche:true},data,
  				function(res){
  			   		return res;
  		   		});
  	   }
	    
	   /***** to get the ism types*****/
	   function getAuditSubType(auditType){
		   return carMaintenanceApi.getAuditSubType.query({auditType:auditType,method:'GET',catche:true},
				function(res){
			   		return res;
		   		},function(err){
		   			return err;
		   		});
	   }
	   
	   function getAudSubType(companyId){
		   return carMaintenanceApi.getAudSubType.query({companyId:companyId,method:'GET',catche:true},
					function(res){
				   		return res;
			   		},function(err){
			   			return err;
			   		});
	   }
	 
	   /***** to get the observation category*****/
	   function getObsCategory(audType,companyId){
		   return carMaintenanceApi.getObsCategory.query({audType:audType,companyId:companyId,method:'GET',catche:true},
				function(res){
			   		return res;
		   		});
	   }
	   
	   function getAuditObsCategory(){
		   return carMaintenanceApi.getAuditObsCategory.query({method:'GET',catche:true},
				function(res){
			   		return res;
		   		});
	   }
	   
	   function getDistinctAudObsStatus(companyId){
		   return carMaintenanceApi.getDistinctAudObsStatus.get({companyId:companyId,method:'GET',catche:true},
				function(res){
			   		return res;
		   		});
	   }
	   
	   function getAllAuditCode(){
		   return carMaintenanceApi.getAllAuditCode.query({method:'GET',catche:true},
					function(res){
				   		return res;
			   		});
		   }
	   
	   /***** to get the observation status*****/
	   function getObsStatus(audType,companyId){
		   return carMaintenanceApi.getObsStatus.query({audType:audType,companyId:companyId,method:'GET',catche:true},
				function(res){
			   		return res;
		   		});
	   }
	   function getAudObsStatus(){
		   return carMaintenanceApi.getAudObsStatus.query({method:'GET',catche:true},
					function(res){
				   		return res;
			   		});
		}
	   
	   /*TO get the type of audit*/
	   function getAuditType(companyId){
		   return carMaintenanceApi.getAuditType.query({companyId:companyId,method:'GET'},
   				function(res){
			   		return res;
   		   		});
	   }
	   
	   
	   /***** to get the Audit Observation Detail Type *****/
	   function getAudObsType(audType){
		   return carMaintenanceApi.getAudObsType.query({audType:audType,method:'GET',catche:true},
   				function(res){
   			   		return res;
   		   		});
	   }
	   
	 
	   function getVesselData(companyId){
		   return carMaintenanceApi.getVesselData.query({companyId:companyId,method:'GET',catche:true},
   		   		function(res){
   			   		return res;
   		   		});
	   }
	   
	  
	   function getHistoryFindingData(auditSeqNo,findingSeqNo,companyId){
		   return carMaintenanceApi.getHistoryFindingData.get({auditSeqNo:auditSeqNo,findingSeqNo:findingSeqNo,companyId:companyId,method:'GET',catche:true},
				   	function(res){
			   			return res;
		   			});
	   }
	   
	
	   
	 
	   
	   function getAuditCode(data){
		   return carMaintenanceApi.getAuditCode.query({audType:data,method:'GET',catche:true},
				   	function(res){
			   			return res;
		   			});
	   }
	   
	   function getAudObsData(){
		   return carMaintenanceApi.getAudObsData.query({method:'GET',catche:true},
				   	function(res){
			   			return res;
		   			});
	   }
	   
	   
	   function updateCarMaintainanceFinding(data,updateFlag,auditTypeDesc,companyId){
		   return carMaintenanceApi.updateCarMaintainanceFinding.query({updateFlag:updateFlag,auditTypeDesc:auditTypeDesc,companyId:companyId,method:'POST',cache:true},data,
				function(res){
			   		return res;
		   		});
	   }
	   
	   function unlinkFindingFiles(data,auditTypeDesc,companyId){
		   return carMaintenanceApi.unlinkFindingFiles.query({auditTypeDesc:auditTypeDesc,companyId:companyId,method:'POST',cache:true},data,
				function(res){
			   		return res;
		   		});
	   }
	   	
	
	   
	   function downloadFindingFile(auditSeqNo,findingSeqNo,fileName,statusSeqNo,auditTypeDesc,companyId){
		   return carMaintenanceApi.downloadFindingFile.save({auditSeqNo:auditSeqNo,findingSeqNo:findingSeqNo,fileName:fileName,statusSeqNo:statusSeqNo,auditTypeDesc:auditTypeDesc,companyId:companyId},function(res){
			   return res;
		   });
	   }
	   
	   function saveFindingFiles(data){
		   return carMaintenanceApi.saveFindingFiles.query({method:'POST',cache:true},data,
				function(res){
			   		return res;
		   		});
	   }
	   
	  
	   
	   function getHistorySearchCount(data){
		   return carMaintenanceApi.getHistorySearchCount.query({method:'POST'},data,
      				function(res){
      			   		return res;
      		   		});	
	   }
	   
	   function getHistorySearchResult(searchBeanValues){ 
		    return carMaintenanceApi.getHistorySearchResult.query({method:'POST',catche:true},searchBeanValues,
				function(res){
			   		return res;
		   		});		   
	   }
	   
	   function checkAuditCompleted(vesselImoNo,auditTypeId,auditDate,auditStatusId,companyId){
		   return carMaintenanceApi.checkAuditCompleted.get({vesselImoNo:vesselImoNo, auditTypeId:auditTypeId, auditDate:auditDate, auditStatusId:auditStatusId,companyId:companyId, method:'GET'},
					function(res){
				   		return res;
			   		});
		   }
	   
	   function getVesselNameDetails(val){ 
		   return carMaintenanceApi.getVesselNameDetails.query({vesselName:val,method:'GET'},function(res){return res;});
	   }
	   
	   function getVesselImoNoDetails(val){
		   return carMaintenanceApi.getVesselImoNoDetails.query({vesselImo:val,method:'GET'},function(res){return res;});
	   }
	   
	   function getAllFingingStatus(companyId){
			return carMaintenanceApi.getAllFingingStatus.query({companyId:companyId,method:'GET',catche:true},
					function(res){
					   	return res;
				   	});
	   }
	   
	   function checkAuditorAndNextAdtData(auditSeqNo, companyId, userId, findingSeqNo){
   		   return carMaintenanceApi.checkAuditorAndNextAdtData.get({auditSeqNo:auditSeqNo, companyId:companyId, userId:userId, findingSeqNo:findingSeqNo, method:'get',catche:true},
   				   function(res){
			   			return res;
		   			});		   
   	   }
	   
	   
	   function leadAuditorNames(companyId){
			return carMaintenanceApi.leadAuditorNames.query({companyId:companyId,method:'GET',catche:true},
					function(res){
					   	return res;
				   	});
	   }
	   
	   function getObsCategorySearch(audType,companyId){
		   return carMaintenanceApi.getObsCategorySearch.query({audType:audType,companyId:companyId,method:'GET',catche:true},
				function(res){
			   		return res;
		   		});
	}
	   
	   
}

})();