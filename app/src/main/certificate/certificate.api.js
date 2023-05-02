 (function (){
    'use strict'; 
    angular
    	.module('app.certificate')
    	.factory('certificateApi', certificateApi);
    function certificateApi($resource,BASE_URL){
		var certificateApi ={};

		
		certificateApi.getCertSearchResult = $resource(BASE_URL+'certificate/getCertSearchResult2',{},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
		
		
		certificateApi.getCertSearchResultForIhm = $resource(BASE_URL+'certificateIhm/getCertSearchResultForIhm',{},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
		
		
		//certificateApi.getCertificateDetail = $resource(BASE_URL+'certificate/getCertificateDetail2/:auditSeqNo/:companyId',{auditSeqNo:'@auditSeqNo', companyId:'@companyId'});
    	certificateApi.getCertificateDetail = $resource(BASE_URL+'certificate/getCertificateDetailnew/:auditSeqNo/:companyId/:seqNo/:activeStatus',{auditSeqNo:'@auditSeqNo', companyId:'@companyId',seqNo:'@seqNo',activeStatus :'@activeStatus'});
    	
    	certificateApi.getCertificateDetailForIhm = $resource(BASE_URL+'certificateIhm/getCertificateDetailForIhm/:auditSeqNo/:companyId/:seqNo/:activeStatus/:socType',{auditSeqNo:'@auditSeqNo', companyId:'@companyId',seqNo:'@seqNo',activeStatus :'@activeStatus',socType:'@socType'});
    	
    	certificateApi.getAllIhmCertificateDetail = $resource(BASE_URL+'certificate/getAllIhmCertificateDetail/:auditTypeId/:vesselImoNo/:companyId',{auditTypeId:'auditTypeId', vesselImoNo:'@vesselImoNo',companyId:'@companyId'});
    	
    	certificateApi.getAllCertificateDetailForIhm = $resource(BASE_URL+'certificateIhm/getAllCertificateDetailForIhm/:auditTypeId/:vesselImoNo/:companyId/:socType',{auditTypeId:'auditTypeId', vesselImoNo:'@vesselImoNo',companyId:'@companyId', socType:'@socType'});
    	
    	certificateApi.getPreviousIssueDate =  $resource(BASE_URL+'certificate/getConsective/:vesselImo/:auditSeqNo/:companyId',{vesselImo:'@vesselImo',auditSeqNo:'@auditSeqNo', companyId:'@companyId'});
    	
    	certificateApi.checkPreviousInitialaudit = $resource(BASE_URL+'certificate/getPreviousInitialCount/:auditType/:vesselImo/:companyId/:auditSubType/:auditSeqNo',{auditType:'@auditType' ,vesselImo:'@vesselImo', companyId:'@companyId', auditSubType:'@auditSubType', auditSeqNo:'@auditSeqNo'});
    	
    	certificateApi.deleteCertificateForIhm = $resource(BASE_URL+'certificateIhm/deleteCertificateForIhm/:certIssueId/:companyId/:vesselImo/:auditSubType/:auditSeqNo/:certNo/:socType',{certIssueId:'@certIssueId' , companyId:'@companyId',vesselImo:'@vesselImo', auditSubType:'@auditSubType', auditSeqNo:'@auditSeqNo', certNo:'@certNo',socType:'@socType'});
    	
    	certificateApi.getSocTypeSelectDefault = $resource(BASE_URL+'certificateIhm/getSocTypeSelectDefault/:certIssueId/:companyId/:vesselImo/:auditSubType/:auditSeqNo/:certLink/:socType',{certIssueId:'@certIssueId' , companyId:'@companyId',vesselImo:'@vesselImo', auditSubType:'@auditSubType', auditSeqNo:'@auditSeqNo', certLink:'@certLink', socType:'@socType'});
    	
    	certificateApi.getAuditCertDetails = $resource(BASE_URL+'certificate/getAuditCertDetails/:auditSeqNo/:companyId',{auditSeqNo:'@auditSeqNo', companyId:'@companyId'});
    	
    	certificateApi.getAuditCertDetailsForIhm = $resource(BASE_URL+'certificateIhm/getAuditCertDetailsForIhm/:auditSeqNo/:companyId',{auditSeqNo:'@auditSeqNo', companyId:'@companyId'});
    	
    	certificateApi.checkRelatedToCurrAdt = $resource(BASE_URL+'certificate/checkRelatedToCurrAdt/:auditSeqNo/:userId/:companyId',{auditSeqNo:'@auditSeqNo', userId:'@userId', companyId:'@companyId'});
    	
    	certificateApi.getCertificateIssueReason = $resource('master/getCertificateIssueReason/:companyId',{companyId:'@companyId'});
    	
    	certificateApi.getCurrentUserFullName = $resource('master/getCurrentUserFullName/:userId/:companyId',{userId : '@userId',companyId:'@companyId'});
    	
    	certificateApi.generateCertificate = $resource(BASE_URL+'certificate/generateCertificate2/:status/:generateStatus',{status:'generateStatusstatus',generateStatus:'@generateStatus'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
//    	certificateApi.getEcGrantedReason = $resource('master/getEcGrantedReason',null,{
//   		 'query':  {method:'GET', isArray:false}
//   	});
    	
    	certificateApi.getEcGrantedReason = $resource('master/getEcGrantedReason',{ 		
      	});
    	certificateApi.generateCertificateForIhm = $resource(BASE_URL+'certificateIhm/generateCertificateForIhm/:status/:generateStatus',{status:'generateStatusstatus',generateStatus:'@generateStatus'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	certificateApi.generateCertificateWithoutAudit = $resource(BASE_URL+'certificate/generateCertificateWithOutAudit/:status/:generateStatus',{status:'generateStatusstatus',generateStatus:'@generateStatus'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	certificateApi.generateCertificateWithOutAuditIhm = $resource(BASE_URL+'certificateIhm/generateCertificateWithOutAuditForIhm/:status/:generateStatus',{status:'generateStatusstatus',generateStatus:'@generateStatus'},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	certificateApi.generateCertificatePublishStatusWithOutAudit = $resource(BASE_URL+'certificate/generateCertificatePublishStatusWithOutAudit',{},{
    		put : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	certificateApi.vesselDetails = $resource(BASE_URL+'rmiService/getVesselDetail/:companyId/:userId/:vesselIMONo/:searchBy',{
    		companyId:'@companyId',
    		userId:'@userId',
    		vesselIMONo:'@vesselIMONo',
    		searchBy:'@searchBy'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : true
    		}
    	});
    	
    	
    	
    	certificateApi.vesselSpecificDtl = $resource(BASE_URL+'rmiService/vesselSpecificDtl/:companyId/:userId/:vesselIMONo/:docTypeNum',{
    		companyId:'@companyId',
    		userId:'@userId',
    		vesselIMONo:'@vesselIMONo',
    		docTypeNum:'@docTypeNum'
    	},{
    		query : {
    			method  : 'GET',
    			isArray : false
    		}
    	});
    	
    	certificateApi.getUTN = $resource(BASE_URL+'rmiService/getUTN',{});
    	
    	certificateApi.getUTNForIhm = $resource(BASE_URL+'rmiService/getUTNForIhm/:count',{});
    	
    	certificateApi.getUtnAndCertificateId = $resource(BASE_URL+'certificate/getUtnAndCertificateId/:auditReportNo/:certificateNo/:companyId',{});
    	
    	certificateApi.getUtnAndCertificateIdForIhm = $resource(BASE_URL+'certificateIhm/getUtnAndCertificateIdForIhm/:auditReportNo/:certificateNo/:companyId',{});
    	
    	certificateApi.publishCertificate = $resource(BASE_URL+'certificate/publishCertificate/:auditSeqNo/:companyId/:seqNo',{});
    	
    	certificateApi.getCertificateReissueReason = $resource('master/getCertificateReissueReason/:companyId',{companyId:'@companyId'});
    	
    	certificateApi.UpdateDirectIntermediateIssueExpiryDate = $resource(BASE_URL+'certificate/UpdateDirectIntermediateIssueExpiryDate/:auditTypeId/:auditSeqNo/:companyId/:certExpireDate/:certIssueDate/:certIssueId/:vesselImoNo',{auditTypeId:'@auditTypeId',auditSeqNo:'@auditSeqNo',companyId:'@companyId',certExpireDate:'@certExpireDate',certIssueDate:'@certIssueDate',certIssueId:'@certIssueId',vesselImoNo:'@vesselImoNo'});
    	
    	certificateApi.getAllCycleDate = $resource(BASE_URL+'auditCycle/getAllCycleDate/:auditTypeId/:vesselImoNo/:companyId',{
    		 auditTypeId:'@auditTypeId',vesselImoNo:'@vesselImoNo',companyId:'@companyId'},
    		 {
    			 query : {
    		 			method : 'GET',
    		 			cache  : false,
    		 			isArray: true
    		     	  }
    	 		} 
    	 );
    	
    	certificateApi.getIntitalCertForDownloadIhm = $resource(BASE_URL+'certificateIhm/getIntitalCertForDownloadIhm/:auditTypeId/:vesselImoNo/:companyId',{auditTypeId:'@auditTypeId',vesselImoNo:'@vesselImoNo',companyId:'@companyId'},{
    		query : {
    			method :'GET',
    			cache  : false
    		}
    	});
    	certificateApi.getCertificateIHM = $resource(BASE_URL+'audit/ism/getCertificateIHM/:VESSEL_IMO_NO/:auditSeqNo',{VESSEL_IMO_NO:'@VESSEL_IMO_NO',auditSeqNo:'@auditSeqNo'},{
    		query : {
    			method :'GET',
    			cache  : false
    		}
    	});
    	
    	certificateApi.getCompletedStatus = $resource(BASE_URL+'audit/ism/getCompletedStatus/:vesselImoNo/:auditTypeId',{vesselImoNo:'@vesselImoNo',auditTypeId:'@auditTypeId'},{
    		query : {
    			method :'GET',
    			cache  : false,
    			isArray: false
    		}
    	});
    	
    	return certificateApi;	
     }
    
   })();