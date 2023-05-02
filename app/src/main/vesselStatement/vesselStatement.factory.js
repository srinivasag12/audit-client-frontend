(function() {
	'use strict';

	angular.module('app.vesselStatement').factory('vesselStatementFactory',
			vesselStatementFactory);

	function vesselStatementFactory(vesselStatementApi) {

		var vesselStatementFactory = {
			getVesselImono : getVesselImono,
			generateStatReport : generateStatReport,
			getVesselSearchData : getVesselSearchData,
			getVesselCompanyDetails:getVesselCompanyDetails,
			vesselSpecificDtl:vesselSpecificDtl,
			getRmiProced:getRmiProced,
			getVesselDetails:getVesselDetails,
			getVesselHistory:getVesselHistory

		};

		
		
		return vesselStatementFactory;
		
		
		function getRmiProced(data,companyId,vesselImo) {
			return vesselStatementApi.getRmiProced.save({
				companyId : companyId,
				vesselImo : vesselImo
			}, data, function(res) {
				return res;
			});
		}
		;
		
		

		function getVesselSearchData(ImoNo, companyId) {
			return vesselStatementApi.getVesselSearchData.query({
				ImoNo : ImoNo,
				companyId : companyId,
				method : 'POST',
				cache : false
			}, function(res) {

				return res;
			}, function(err) {

			});
		}

		function generateStatReport(data, screenId, category, format, companyId) {

			return vesselStatementApi.generateStatReport.put({
				screenId : screenId,
				category : category,
				format : format,
				companyId : companyId,
				method : 'POST',
				catche : true
			}, data, function(res) {
				return res;
			});
		}
		
		 function vesselSpecificDtl(companyId,userId,vesselIMONo,docTypeNum){
    		 return vesselStatementApi.vesselSpecificDtl.query({companyId:companyId,userId:userId,vesselIMONo:vesselIMONo,docTypeNum:docTypeNum,method:'GET'},
    				   	function(res){
    			   			return res;
    		   			});
    	 }

		function getVesselImono(companyId) {
			return vesselStatementApi.getVesselImono.query({
				companyId : companyId,
				method : 'GET',
				cache:false
			}, function(res) {
				return res;
			})
		}
		;
		
		
		
		function getVesselCompanyDetails(imo,companyId) {
			return vesselStatementApi.getVesselCompanyDetails.query({
				imo : imo,
				companyId : companyId,
				method : 'GET',
				cache:false
			}, function(res) {
				return res;
			})
		}
		;
		
		function getVesselDetails(imo,companyId) {
			return vesselStatementApi.getVesselDetails.query({
				imo : imo,
				companyId : companyId,
			
			}, function(res) {
				return res;
			})
		}
		;
		
		function getVesselHistory(vesselImoNo,status) {
			return vesselStatementApi.getVesselHistory.query({
				vesselImoNo : vesselImoNo,
				status : status
			
			}, function(res) {
				return res;
			})
		}
		;

	}

})();