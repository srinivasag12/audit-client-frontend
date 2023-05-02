(function() {
	'use strict';

	angular.module('app.master.report').factory('reportFactory', reportFactory);

	function reportFactory(reportApi) {

		var reportFactory = {

			
				saveOrUpdateReportAttach:saveOrUpdateReportAttach,
				redisUpdateAttachmentReport:redisUpdateAttachmentReport
		};

		return reportFactory;
		
		
		
		 
   	 function saveOrUpdateReportAttach(data){ 
   		   return reportApi.saveOrUpdateReportAttach.put({method:'POST',catche:true},data,
   				function(res){
   			   
   			   console.log(res);
   			   		return res;
   		   		});
   	 }
	
   	 
   	function redisUpdateAttachmentReport(companyId){
		   return reportApi.redisUpdateAttachmentReport.get({companyId:companyId,method:'GET',catche:false},
				function(res){
			   		return res;
		   		});
	 }
   	 
	
	}

})();