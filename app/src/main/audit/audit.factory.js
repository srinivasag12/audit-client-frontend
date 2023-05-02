(function (){
	
    'use strict';

    angular
    	.module('app.audit')
        
        .factory('auditFactory', auditFactory);
    

    function auditFactory(auditApi){    	   
    	
    	    var auditFactory = {
    	    		findingData:'',
    	    		dmlcFindingData:'',
    	    		certificateData:'',
    	    		getVesselData:getVesselData,
    	    		getAuditType:getAuditType,
    	    		getVesselCompanyImo:getVesselCompanyImo,
    	    		getAuditCertificate:getAuditCertificate,
    	    		getAllAuditStatus:getAllAuditStatus,
    	    		getAllAuditSubTypes:getAllAuditSubTypes,
    	    		getSearchCount:getSearchCount,
    	    		getSearchResult:getSearchResult,
    	    		getPortSearchResult:getPortSearchResult,
    	    		generateSearchReport:generateSearchReport,
    	    		setFindingData:setFindingData,
    	    		setDmlcFindingData:setDmlcFindingData,
    	    		getFindingData:getFindingData,
    	    		saveRetrieveData:saveRetrieveData,
    	    		RetrievePathData:RetrievePathData,
    	    		getEncryPdf:getEncryPdf,
    	    		getdmlcFindingData:getdmlcFindingData,
    	    		saveFindingData:saveFindingData,
    	    		deleteFindings:deleteFindings,
    	    		getAudDetails:getAudDetails,
    	    		getAuditRelatedData:getAuditRelatedData,
    	    		downloadFindingFile:downloadFindingFile,
        	    	qrCodeGenerator:qrCodeGenerator,
        	    	carUpdateRemoveAuditorsSign:carUpdateRemoveAuditorsSign,
        	    	getReportData:getReportData,
        	    	getReportBlobData:getReportBlobData,
        	    	saveCertificateDetails:saveCertificateDetails,
        	    	getCertificateDetails:getCertificateDetails,
        	    	getLatestCreatedVesselCompanyImo:getLatestCreatedVesselCompanyImo,
        	    	deleteFindingDmlcLinked:deleteFindingDmlcLinked,
        	    	saveMaVesselYatch : saveMaVesselYatch,
        	    	getMaVesselYatchData:getMaVesselYatchData,
        	    	checkVesselImoNorExist:checkVesselImoNorExist,
        	    	pdfLoad:pdfLoad,
        	    	pdfPostNo:pdfPostNo,
        	    	downloadStampPdf:downloadStampPdf,
        	    	generatePortReport:generatePortReport,
        	    	sendDownloadLink : sendDownloadLink,
        	    	getAllIhmAuditDetail : getAllIhmAuditDetail,
        	    	uploadPdfInToMachine : uploadPdfInToMachine,
        	    	sendMailReports : sendMailReports
    	    };

			return auditFactory;
			
			function generatePortReport(data,screenId,category,format,companyId){
	     		   return auditApi.generatePortReport.put({screenId:screenId,category:category,format:format,companyId:companyId,method:'POST',catche:true},data,
	     				function(res){
	     			   		console.log(res)
	     			   		return res;
	     		   		});
	     	   };
			
			function downloadFindingFile(seq,findNo,fileName,statusSeqNo,auditTypeId,companyId){
	    		   return auditApi.downloadFindingFile.save({origAuditSeqNo:seq,findingSeqNo:findNo,fileName:fileName,statusSeqNo:statusSeqNo,auditTypeId:auditTypeId,companyId:companyId},function(res){
	    			   return res;
	    		   });
			}
			
			function getVesselData(companyId){
	    		   return auditApi.getVesselData.query({companyId:companyId,method:'GET',catche:true},
	       		   		function(res){
	    			   		return res;
	       		   		});
	    	};
			
			function getAuditType(companyId){
	    		   return auditApi.getAuditType.query({companyId:companyId,method:'GET'},
	       				function(res){
	    			   		return res;
	       		   		});
	    	};
			
			function getVesselCompanyImo(companyId){
	    		   return auditApi.getVesselCompanyImo.query({companyId:companyId,method:'GET',catche:true},
	       		   		function(res){
	       			   		return res;
	       		   		});
	    	};
			
			function getAuditCertificate(companyId){
	    		   return auditApi.getAuditCertificate.query({companyId:companyId,method:'GET',catche:true},
	    				   	function(res){
	    			   			return res;
	    		   			});
	    	};
			
			function getAllAuditStatus(companyId){
	    		   return auditApi.getAllAuditStatus.query({companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	};
			
			function getAllAuditSubTypes(companyId){
	    		   return auditApi.getAllAuditSubTypes.query({companyId:companyId,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		},function(err){
	    		   			return err;
	    		   		});
	    	 };
			
			function getSearchResult(searchBeanValues){ 
    		    return auditApi.getSearchResult.query({method:'POST',catche:true},searchBeanValues,
    				function(res){
    			   		return res;
    		   		});		   
    	   };
    	   
    	   function getPortSearchResult(searchBeanValues){ 
   		    return auditApi.getPortSearchResult.query({method:'POST',catche:true},searchBeanValues,
   				function(res){
   			   		return res;
   		   		});		   
    	   };
    	   
    	   function getSearchCount(data){
    		   return auditApi.getSearchCount.query({method:'POST',catche:true},data,
       				function(res){
       			   		return res;
       		   		});	
    	   };
    	   
    	   function pdfLoad(data){
    		   return auditApi.pdfLoad.query({method:'POST',catche:false},data,
       				function(res){
       			   		return res;
       		   		});	
    	   };
    	   
    	   
    	   function uploadPdfInToMachine(data){
    		   return auditApi.uploadPdfInToMachine.query({method:'POST',catche:true},data,
       				function(res){
       			   		return res;
       		   		});	
    	   };
    	   
    	   
    	   function pdfPostNo(data){
    		   return auditApi.pdfPostNo.query({method:'POST',catche:false},data,
       				function(res){
       			   		return res;
       		   		});	
    	   };
    	   function downloadStampPdf(status,filename){ 
    		   return auditApi.downloadStampPdf.save({status:status,filename:filename},function(){
    			   
    		   });
    		   
    	   }
    	   /*function downloadStampPdf(filename){ 
    		   return auditApi.downloadStampPdf.save({filename:filename},function(){
    			   
    		   });
    		   
    	 }*/
    	   
    	   function getLatestCreatedVesselCompanyImo(emailId,companyId){
        		console.log(companyId);
    		   return auditApi.getLatestCreatedVesselCompanyImo.query({emailId:emailId,companyId:companyId,method:'GET',catche:true},
       		   		function(res){
       			   		return res;
       		   		});
    	   };
    	   
    	   
    	   function generateSearchReport(data,screenId,category,format,companyId){
     		   return auditApi.generateSearchReport.put({screenId:screenId,category:category,format:format,companyId:companyId,method:'POST',catche:true},data,
     				function(res){
     			   		return res;
     		   		});
     	   };
     	   
     	   function setFindingData(data){
     		   this.findingData = data;
     	   }
     	   
     	  function setDmlcFindingData(data){
    		   this.dmlcFindingData = data;
    	   }
     	  
     	   function getFindingData(){
     		   return this.findingData;
    	   }
     	   
     	  function getdmlcFindingData(){
    		   return this.dmlcFindingData;
     	  }
     	   
     	   function saveFindingData(data,status,findingType,auditTypeId,companyId){
     		   return auditApi.saveFindingData.put({status:status,findingType:findingType,auditTypeId:auditTypeId,companyId:companyId,method:'POST',catche:true},data,
    				function(res){
    			   		return res;
    		   		});
     	   }
     	   
     	  function deleteFindings(auditTypeId,auditSeqNo,companyId,findingSeqNo){
   		   return auditApi.deleteFindings.query({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,findingSeqNo:findingSeqNo},
   				   function(res){return res});
     	  }
     	 
     	 function deleteFindingDmlcLinked(auditTypeId,auditSeqNo,companyId,findingSeqNo){
     		   return auditApi.deleteFindingDmlcLinked.query({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,findingSeqNo:findingSeqNo},
     				   function(res){return res});
       	  }
     	  
     	  function getAudDetails(companyId){
  		   return auditApi.getAudDetails.query({companyId:companyId,method:'GET',catche:true},
  				   	function(res){
  			   			return res;
  		   			});
     	  }
     	  
     	 function getAuditRelatedData(auditSeqNo,companyId){
      		return auditApi.getAuditRelatedData.get({auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:true},
   				   	function(res){
   			   			return res;
   		   			});
      	 }
     	 
     	  function qrCodeGenerator(data){
    	    	return auditApi.qrCodeGenerator.query({data:data},function(res){return res;});
      	  }
      	  
     	  function carUpdateRemoveAuditorsSign(auditSeqNo,companyId,auditTypeId){
  		   return auditApi.carUpdateRemoveAuditorsSign.put({auditSeqNo:auditSeqNo,companyId:companyId,auditTypeId:auditTypeId,method:'GET'},
     				function(res){
  			   		return res;
     		   		});
     	 };
  	
     	 
     	function getAllIhmAuditDetail(auditTypeId,vesselImoNo,companyId){
 		   return auditApi.getAllIhmAuditDetail.get({auditTypeId:auditTypeId,vesselImoNo:vesselImoNo,companyId:companyId,method:'GET',catche:false},
 				   	function(res){
 			   			return res;
 		   			});
 	 }
     	
     	function getReportData(auditTypeId,companyId,auditSeqNo){
  		   return auditApi.getReportData.get({auditTypeId:auditTypeId,auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:false},
  				   	function(res){
  			   			return res;
  		   			});
  	 }
     	
     	function getReportBlobData(versionId,auditSeqNo,companyId){
   		   return auditApi.getReportBlobData.get({versionId:versionId,auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:false},
   				   	function(res){
   			   			return res;
   		   			});
   	 }
     	
     	function saveRetrieveData(data){
     		console.log(data);
        	return auditApi.saveRetrieveData.query(data,function(res){return res;});
        }
     	
     	function getEncryPdf(pathVariable){
 		   return auditApi.getEncryPdf.query({pathVariable:pathVariable,method:'GET',catche:true},
    		   		function(res){
 			   		return res;
    		   		});
     	};
//RetrievePathData
     	function RetrievePathData(){
 		   return auditApi.RetrievePathData.query({method:'GET',catche:true},
    		   		function(res){
 			   console.log(res);
 			   		return res;
    		   		});
     	};
     	
     	function saveCertificateDetails(data){
     		console.log(data);
     		this.certificateData=data;
     	}
     	
     	function getCertificateDetails(){
     		return this.certificateData;
     	}
     	
     	 function saveMaVesselYatch(companyId,userId,MaVesselYatch){ console.log(MaVesselYatch); 
   		   return auditApi.saveMaVesselYatch.put({companyId:companyId,method:'POST',catche:true},MaVesselYatch,
  				function(res){
  			   		return res;
  		   		});
   	   }
     	 
     	 
     	 
//     	function getMaVesselYatchData(companyId){
// 		   return auditApi.getMaVesselYatchData.query({companyId:companyId,method:'GET',catche:true},
//    		   		function(res){
// 			   		return res;
//    		   		});
// 	}; 
 	
 	 function getMaVesselYatchData(cId){
		   return auditApi.getMaVesselYatchData.query({companyId:cId,method:'GET',catche:true,isArray:true},
				   	function(res){
			   			return res;
		   			});
	 }
 	 
 	 function checkVesselImoNorExist(vesselImoNo){
		   return auditApi.checkVesselImoNorExist.query({vesselImoNo:vesselImoNo,method:'GET',catche:true,isArray:false},
				   	function(res){
			   			return res;
		   			});
	 }
 	 
 	 
 	 function sendDownloadLink(userName,fileType,fileName,reviewReportNo){
 	 return auditApi.sendDownloadLink.query({userName:userName,fileType:fileType,fileName:fileName,reviewReportNo:reviewReportNo,method:'GET',catche:false,isArray:false},
			   	function(res){
		   			return res;
	   			});
    }
 	 
 
	
	function sendMailReports(data){
		   return auditApi.sendMailReports.put({method:'POST',catche:true},data,
				function(res){
			   		return res;
		   		});
	 }
 	  
 	
    }
    
})();