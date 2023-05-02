(function() {
	'use strict';
	angular.module('app.audit').factory('auditApi', auditApi);
	function auditApi($resource, BASE_URL, BASE_URL_LOGIN) {
		var auditApi = {};

		auditApi.getVesselData = $resource('master/getImoNo/:companyId', {
			companyId : '@companyId'
		});

		auditApi.getAuditType = $resource('master/getAuditTypes/:companyId', {
			companyId : '@companyId'
		});

		auditApi.getVesselCompanyImo = $resource(
				'master/getCompanyImoNo/:companyId', {
					companyId : '@companyId'
				});

		auditApi.getAuditCertificate = $resource(BASE_URL
				+ 'audit/search/getAuditCertificate/:companyId', {
			companyId : '@companyId'
		});

		auditApi.getAllAuditStatus = $resource(
				'typeAhead/getAllAuditStatus/:companyId', {
					companyId : '@companyId'
				});

		auditApi.getAllAuditSubTypes = $resource(
				'typeAhead/getAllAuditSubTypes/:companyId', {
					companyId : '@companyId'
				});

		// auditApi.getMaVesselYatchData =
		// $resource('master/getMaVesselYatchData/:companyId',{companyId:'@companyId'});
 
		auditApi.sendDownloadLink = $resource(BASE_URL
				+ 'audit/ism/send_link/:userName/:fileType/:fileName/:reviewReportNo', {
			userName : '@userName',
			fileType : '@fileType',
			fileName : '@fileName',
			reviewReportNo:'@reviewReportNo'
		}, {
			query : {
				method : 'GET',
				cache : false,
				isArray : false
			}
		});
		
		
		

		auditApi.generatePortReport = $resource(
				BASE_URL
						+ 'audit/report/generatePortReport/:screenId/:category/:format/:companyId',
				{
					screenId : '@screenId',
					category : '@category',
					format : '@format',
					companyId : '@companyId'
				}, {

					put : {
						method : 'POST',
						isArray : false,
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,
								status) {
							return {
								data : data,
								status : status,
								headersGetter : headersGetter
							};
						}
					}
				});

		auditApi.getMaVesselYatchData = $resource(BASE_URL
				+ 'master/getMaVesselYatchData/:companyId', {

			companyId : '@companyId'
		}, {
			query : {
				method : 'GET',
				cache : false,
				isArray : true
			}
		});

		auditApi.getSearchResult = $resource(BASE_URL
				+ 'audit/search/getSearchResult', {}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : true
			}
		});

		auditApi.getPortSearchResult = $resource(BASE_URL
				+ 'audit/search/getPortSearchResult', {}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : true
			}
		});

		auditApi.getLatestCreatedVesselCompanyImo = $resource(
				BASE_URL
						+ 'audit/search/getLatestCreatedVesselCompanyImo/:emailId/:companyId',
				{
					emailId : '@emailId',
					companyId : '@companyId'
				}, {
					query : {
						method : 'GET',
						cache : false,
						isArray : true
					}
				});

		auditApi.getEncryPdf = $resource(BASE_URL
				+ 'audit/pdf/pdfSecurity/:pathVariable', {
			pathVariable : '@pathVariable'
		}, {
			query : {
				method : 'GET',
				cache : false,
				isArray : false,
				transformResponse : function(data, headersGetter) {
					return {
						data : data
					};
				}
			}
		});
		auditApi.RetrievePathData = $resource(
				BASE_URL + 'audit/pdf/pathreturn', {}, {
					query : {
						method : 'GET',
						cache : false,
						isArray : false,
						transformResponse : function(data, headersGetter) {
							return {
								data : data
							};
						}
					}
				});

		auditApi.getSearchCount = $resource(BASE_URL
				+ 'audit/search/getSearchCount', {}, {
			query : {
				method : 'POST',
				cache : false,
				isArray : false,
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data,
						status : status
					};
				}
			}
		});

		auditApi.pdfLoad = $resource(BASE_URL + 'audit/ism/upload', {}, {
			query : {
				method : 'POST',
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data
					};
				}
			}
		});

		
		
		auditApi.uploadPdfInToMachine = $resource(BASE_URL + 'audit/ism/uploadPdfInToMachine', {}, {
			query : {
				method : 'POST',
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data
					};
				}
			}
		});
		
		auditApi.pdfPostNo = $resource(BASE_URL + 'audit/ism/postPageNumbers',
				{}, {
					query : {
						method : 'POST',
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,
								status) {
							return {
								data : data
							};
						}
					}
				});

		auditApi.downloadStampPdf = $resource(BASE_URL
				+ 'audit/ism/getPdfSigned/:status/:filename', {
			status : '@status',
			filename : '@filename'
		}, {
			// auditApi.downloadStampPdf =
			// $resource(BASE_URL+'audit/ism/getPdfSigned/:filename',{filename:'@filename'},{
			save : {
				method : 'GET',
				isArray : false,
				responseType : 'arraybuffer',
				transformResponse : function(data, headersGetter, status) {
					return {
						headersGetter : headersGetter,
						data : data,
						status : status
					};
				}
			}
		});

		auditApi.generateSearchReport = $resource(
				BASE_URL
						+ 'audit/report/GenerateSearchReport/:screenId/:category/:format/:companyId',
				{
					screenId : '@screenId',
					category : '@category',
					format : '@format',
					companyId : '@companyId'
				}, {

					put : {
						method : 'POST',
						isArray : false,
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,
								status) {
							return {
								data : data,
								status : status,
								headersGetter : headersGetter
							};
						}
					}
				});

		auditApi.saveFindingData = $resource(
				BASE_URL
						+ 'audit/ism/auditFindings/:status/:findingType/:auditTypeId/:companyId',
				{
					status : '@status',
					findingType : '@findingType',
					auditTypeId : '@auditTypeId',
					companyId : '@companyId'
				}, {
					put : {
						method : 'POST',
						cache : false,
						isArray : false
					}
				});

		auditApi.deleteFindings = $resource(
				BASE_URL
						+ 'audit/ism/deleteFinding/:auditTypeId/:auditSeqNo/:companyId/:findingSeqNo',
				{
					auditTypeId : '@auditTypeId',
					auditSeqNo : '@auditSeqNo',
					companyId : '@companyId',
					findingSeqNo : '@findingSeqNo'
				}, {
					query : {
						method : 'DELETE'
					}
				});

		auditApi.deleteFindingDmlcLinked = $resource(
				BASE_URL
						+ 'audit/ism/deleteFindingDmlcLinked/:auditTypeId/:auditSeqNo/:companyId/:findingSeqNo',
				{
					auditTypeId : '@auditTypeId',
					auditSeqNo : '@auditSeqNo',
					companyId : '@companyId',
					findingSeqNo : '@findingSeqNo'
				}, {
					query : {
						method : 'DELETE'
					}
				});

		auditApi.downloadFindingFile = $resource(
				BASE_URL
						+ 'audit/ism/getFindingStatusAttach/:origAuditSeqNo/:findingSeqNo/:fileName/:statusSeqNo/:auditTypeId/:companyId',
				{
					origAuditSeqNo : '@origAuditSeqNo',
					findingSeqNo : '@findingSeqNo',
					fileName : '@fileName',
					statusSeqNo : '@statusSeqNo',
					auditTypeId : '@auditTypeId',
					companyId : '@companyId'
				}, {
					save : {
						method : 'GET',
						isArray : false,
						responseType : 'arraybuffer',
						transformResponse : function(data, headersGetter,
								status) {
							return {
								headersGetter : headersGetter,
								data : data,
								status : status
							};
						}
					}
				});

		auditApi.getAudDetails = $resource(BASE_URL
				+ 'typeAhead/getAudDetails/:companyId', {
			/* audObsType:'@audObsType' */
			companyId : '@companyId'
		});

		auditApi.saveRetrieveData = $resource('/api/savePdfFile', {}, {
			// console.log("enter here1111");
			query : {
				method : 'POST'
			}
		});

		auditApi.getAuditRelatedData = $resource(BASE_URL
				+ 'audit/ism/getAuditRelatedData/:auditSeqNo/:companyId', {
			auditSeqNo : '@auditSeqNo',
			companyId : '@companyId'
		});

		auditApi.qrCodeGenerator = $resource('/api/qrCodeGenerator/:data', {
			data : '@data'
		}, {
			query : {
				method : 'GET',
			}
		});

		auditApi.carUpdateRemoveAuditorsSign = $resource(
				BASE_URL
						+ 'audit/ism/carUpdateRemoveAuditorsSign/:auditSeqNo/:companyId/:auditTypeId',
				{
					auditSeqNo : '@auditSeqNo',
					companyId : '@companyId',
					auditTypeId : '@auditTypeId'
				}, {
					put : {
						method : 'GET',
						cache : false,
						isArray : false
					}
				});

		auditApi.getReportData = $resource(
				BASE_URL
						+ 'audit/ism/getReportData/:auditTypeId/:auditSeqNo/:companyId',
				{
					auditTypeId : '@auditTypeId',
					auditSeqNo : '@auditSeqNo',
					companyId : '@companyId'
				}, {
					get : {
						cache : false,
						isArray : true
					}
				});

		auditApi.getAllIhmAuditDetail = $resource(
				BASE_URL
						+ 'audit/ism/getAllIhmAuditDetail/:auditTypeId/:vesselImoNo/:companyId',
				{
					auditTypeId : '@auditTypeId',
					vesselImoNo : '@vesselImoNo',
					companyId : '@companyId'
				}, {
					get : {
						cache : false,
						isArray : true
					}
				});
		
		auditApi.getReportBlobData = $resource(
				BASE_URL
						+ 'audit/ism/getReportBlobData/:versionId/:auditSeqNo/:companyId',
				{
					versionId : '@versionId',
					auditSeqNo : '@auditSeqNo',
					companyId : '@companyId'
				}, {
					get : {
						cache : false,
						isArray : false
					}
				});

		auditApi.saveMaVesselYatch = $resource(BASE_URL
				+ 'master/saveMaVesselYatch/:companyId/:userId', {
			companyId : '@companyId',
			userId : '@userId'
		}, {
			put : {
				method : 'POST',
				cache : false,
				isArray : false
			}
		});

		auditApi.checkVesselImoNorExist = $resource(BASE_URL
				+ 'rmiService/checkVesselImoNorExist/:vesselImoNo', {
			vesselImoNo : '@vesselImoNo'
		}, {
			query : {
				method : 'GET',
				cache : true,
				isArray : false,
				transformResponse : function(data, headersGetter, status) {
					return {
						data : data,
						status : status
					};
				}
			}
		});

		// auditApi.saveMaVesselYatch =
		// $resource(BASE_URL+'master/saveMaVesselYatch/:companyId',{
		//    	
		// companyId:'@companyId'
		// },{
		// query : {
		// method : 'GET',
		// cache : false,
		// isArray: false
		// }
		// });
		
		
		auditApi.sendMailReports = $resource(BASE_URL+'audit/ism/sendMailReports/',{},
				 {
		    	   put : {
		    			method :'POST',
		    			cache  : false,
		    			isArray: false 
		    		}
    	  });
		

		return auditApi;
	}

})();