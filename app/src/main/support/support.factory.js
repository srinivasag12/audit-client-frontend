(function() {

	'use strict';

	angular.module('app.support').factory('supportFactory', supportFactory);

	function supportFactory(supportApi) {

		var supportFactory = {
				upload : upload,
				getSupportData : getSupportData,
				getLeadName:getLeadName,
				getSupportSearchResult:getSupportSearchResult,
				checkFileExits:checkFileExits,
				getUploadedSearchResult:getUploadedSearchResult,
				downloadSupportAttach : downloadSupportAttach,
				getReterivedAuditData : getReterivedAuditData,
				getRmiData:getRmiData
		};

		function getSupportSearchResult(searchBeanValues){
			return supportApi.getSupportSearchResult.put({method:'POST',catche:true},searchBeanValues,
					function(res){
				return res;
			});		   
		};
		
		function getUploadedSearchResult(searchBeanValues){
			return supportApi.getUploadedSearchResult.put({method:'POST',catche:true},searchBeanValues,
					function(res){
				return res;
			});		   
		};


		function upload(data) {
			return supportApi.upload.query({
			}, data, function(res2) {
				console.log(res2);
				console.log(JSON.stringify(res2))
				return res2;
			});

		}

		function getLeadName(auditSeqNo,companyId){
						
			return supportApi.getLeadName.query({auditSeqNo:auditSeqNo,companyId:companyId,method:'GET',catche:true},
					function(res){
				return res;
			},function(err){
				return err;
			});
		}
		function getSupportData() {
			return supportApi.getSupportData.query({
				method : 'GET'
			}, function(res) {
				return res;
			});

		}
		
		function downloadSupportAttach(auditSeqNo,vesselImoNo,auditTypeId,auditSubTypeId,companyId){
			
			return supportApi.downloadSupportAttach.query({auditSeqNo:auditSeqNo,vesselImoNo:vesselImoNo,auditTypeId:auditTypeId,
				auditSubTypeId:auditSubTypeId,companyId:companyId,method:'GET',catche:true}, function(res) {
				return res;
			});
		}

		function getReterivedAuditData(auditSeqNo,auditType,auditSubType,companyId){

			return supportApi.getReterivedAuditData.query({auditSeqNo:auditSeqNo,auditType:auditType,auditSubType:auditSubType
				,companyId:companyId,method:'GET',catche:true}, function(res) {
					return res;
				});
		}

		 function checkFileExits(path){
   		   return supportApi.checkFileExits.query(path,function(res){return res;});
  	    }
		 
		 function getRmiData(tableName,key){
		 
		   return supportApi.getRmiData.query({tableName:tableName,key:key,method:'GET',catche:true,isArray:true},
			function(res){
		   		return res;
	   		});
	   }
		
		return supportFactory;

	}

})();