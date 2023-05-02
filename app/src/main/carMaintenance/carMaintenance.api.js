 (function (){
    'use strict'; 
    angular
    	.module('app.carMaintenance')
    	.factory('carMaintenanceApi', carMaintenanceApi);
    
    function carMaintenanceApi($resource,BASE_URL){
    	var carMaintenanceApi = {};
    	
    	carMaintenanceApi.getAuditSubType = $resource(BASE_URL+'typeAhead/getAuditSubType/:auditType',{audType:'@auditType'});
    	
    	carMaintenanceApi.getObsCategory = $resource(BASE_URL+'typeAhead/getObsCategory/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	carMaintenanceApi.getObsCategorySearch = $resource('typeAhead/getObsCategory/:audType/:companyId',{audType:'@audType',companyId:'companyId'});
    	
    	carMaintenanceApi.getAuditObsCategory = $resource('/api/car/getAuditObsCategory');
    	
    	carMaintenanceApi.getDistinctAudObsStatus = $resource(BASE_URL+'typeAhead/getDistinctAudObsStatus/:companyId',{companyId:'@companyId'});
    
    	carMaintenanceApi.getAllAuditCode = $resource('/api/car/getAllAuditCode');
    	
    	carMaintenanceApi.getAudObsStatus = $resource('/api/car/getAudObsStatus');
    	
    	carMaintenanceApi.getAudSubType = $resource('typeAhead/getAllAuditSubTypes/:companyId',{companyId:'@companyId'});
    	
        carMaintenanceApi.getObsStatus = $resource(BASE_URL+'typeAhead/getObsStatus/:audType/:companyId',{audType:'@audType',companyId:'@companyId'});
    	
    	carMaintenanceApi.getAuditType = $resource('master/getAuditTypes/:companyId',{companyId:'@companyId'});
    	
    	carMaintenanceApi.getAudObsType = $resource('/api/car/getAudObsType/:audType',{audType:'@audType'});
    	
    	carMaintenanceApi.getVesselData = $resource('master/getImoNo/:companyId',{companyId:'@companyId'});
    	
    	carMaintenanceApi.getVesselNameDetails = $resource('/api/car/getVesselNameDetails/:vesselName',{vesselName:'@vesselName'});
    	
    	carMaintenanceApi.getVesselImoNoDetails = $resource('/api/car/getVesselImoNoDetails/:vesselImo',{vesselImo:'@vesselImo'});
    	
    	
    	carMaintenanceApi.getAuditCode = $resource('/api/car/getAuditCode/:audType',{
    		audType:'@audType'
    	});
    	
    	carMaintenanceApi.getAudObsData = $resource('/api/car/getAudObsData/',{
    		/*audObsType:'@audObsType'*/
    	});
    	
    	carMaintenanceApi.downloadFindingFile = $resource(BASE_URL+'carMaintenance/downloadFindingFile/:auditSeqNo/:findingSeqNo/:fileName/:statusSeqNo/:auditTypeDesc/:companyId',{
    		auditSeqNo:'@auditSeqNo',
    		findingSeqNo:'@findingSeqNo',
    		fileName:'@fileName',
    		statusSeqNo:'@statusSeqNo',
    		auditTypeDesc:'@auditTypeDesc',
    		companyId:'@companyId'
    	   },{
    		save : {
				method : 'GET',
				isArray : false,
				responseType : 'arraybuffer',
				transformResponse : function(data, headersGetter,status) {						
					return {
						data : data,
						headersGetter:headersGetter,
						status : status
					};
				}
			}
    	});
    	
    	carMaintenanceApi.getHistorySearchResult = $resource(BASE_URL+'carMaintenance/getHistorySearchResult',{},{
    		query : {
    			method :'POST',
    			cache  : false,
    			isArray: true 
    		}
    	});
    	carMaintenanceApi.getHistorySearchCount = $resource(BASE_URL+'carMaintenance/getHistorySearchCount',{},{
    		
    	query : {
			method :'POST',
			cache  : false,
			isArray: false,
			transformResponse : function(data, headersGetter,status) {
				return {
					data : data,
					status : status
				};
			}
		}
    	});
    	
    	carMaintenanceApi.updateCarMaintainanceFinding = $resource(BASE_URL+'carMaintenance/updateCarMaintainanceFinding/:updateFlag/:auditTypeDesc/:companyId',{updateFlag:'@updateFlag',auditTypeDesc:'@auditTypeDesc',companyId:'@companyId'},{
    		query : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	
    	});
    	
    	carMaintenanceApi.unlinkFindingFiles = $resource(BASE_URL+'carMaintenance/unlinkFindingFiles/:auditTypeDesc/:companyId',{auditTypeDesc:'@auditTypeDesc',companyId:'@companyId'},{
    		query : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	carMaintenanceApi.saveFindingFiles = $resource('/api/car/saveFindingFiles',{},{
    		query : {
    			method :'POST',
    			cache  : false,
    			isArray: false 
    		}
    	});
    	
    	carMaintenanceApi.getHistoryFindingData = $resource(BASE_URL+'carMaintenance/getHistoryFindingData/:auditSeqNo/:findingSeqNo/:companyId',{
    		auditSeqNo:'@auditSeqNo',
    		findingSeqNo:'@auditSeqNo',
    		companyId:'@companyId'
    	});
    	
    	carMaintenanceApi.checkAuditCompleted = $resource(BASE_URL+'carMaintenance/checkAuditCompleted/:vesselImoNo/:auditTypeId/:auditDate/:auditStatusId/:companyId',{
    		vesselImoNo   : '@vesselImoNo',
    		auditTypeId   : '@auditTypeId',
    		auditDate     : '@auditDate',
    		auditStatusId : '@auditStatusId',
    		companyId     : '@companyId'
    	});
    	
    	carMaintenanceApi.generateSearchReport = $resource(BASE_URL+'audit/report/GenerateCarSearchReport/:screenId/:category/:format/:companyId',{screenId:'@screenId',category:'@category',format:'@format',companyId:'@companyId'},{
        	
        	put : {
    			method : 'POST',
    			isArray : false,
    			responseType : 'arraybuffer',
    			transformResponse : function(data, headersGetter,status){
    				return {
    					data : data,
    					status : status,
    					headersGetter:headersGetter
    				};
    			}
    		}
        });
    	
    	carMaintenanceApi.getAllFingingStatus = $resource(BASE_URL+'typeAhead/getAllFingingStatus/:companyId',{companyId:'@companyId'});
    	
    	carMaintenanceApi.checkAuditorAndNextAdtData = $resource(BASE_URL+'carMaintenance/checkAuditorAndNextAdtData/:auditSeqNo/:userId/:companyId/:findingSeqNo',{auditSeqNo:'@auditSeqNo', userId:'@userId', companyId:'@companyId', findingSeqNo:'@findingSeqNo'});
        
        carMaintenanceApi.leadAuditorNames = $resource(BASE_URL+'typeAhead/leadAuditorNames/:companyId',{companyId:'@companyId'});
    	
    	
    	return carMaintenanceApi;
    }
    
   })();