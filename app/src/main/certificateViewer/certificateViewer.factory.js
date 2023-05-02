(function (){
	
    'use strict';

    angular
    	.module('certificateViewer')
        
        .factory('viewerFactory', viewerFactory);
    

    function viewerFactory(viewerApi){    	   
    	
    	    var viewerFactory = {
    	    		certificateViewerDetails:certificateViewerDetails,
    	    		getAuditCertificateData:getAuditCertificateData
    	    };

    	    function certificateViewerDetails(companyId,qid) {
    	    
    			return viewerApi.certificateViewerDetails.query({
    				companyId : companyId,
    				qid:qid,
    				method : 'GET'
    			}, function(res) {
    				return res;
    			})
    		}
    		;
    		
    		 function getAuditCertificateData(vesselImoNo,companyId,certificateNo,auditTypeId,auditDate){
	    		   return viewerApi.getAuditCertificateData.query({vesselImoNo:vesselImoNo,companyId:companyId,certificateNo:certificateNo,auditTypeId:auditTypeId,auditDate:auditDate,method:'GET',catche:true},
	    				function(res){
	    			   		return res;
	    		   		});
	    	 }
    	   
			return viewerFactory;
			
			
		
    }
    
})();