(function (){ 
	'use strict';
	var AppConstant = {
		'CREATE'           : 'Create',
		'UPDATE'           : 'Update',
		'NEW_FINDING'      : 'NF',
		'PREVIOUS_FINDING' : 'PF',

		'ISM_TYPE_ID'  : 1001,
		'ISPS_TYPE_ID' : 1002,
		'MLC_TYPE_ID'  : 1003,
	

		'SSP_TYPE_ID'  : 1004,
		'DMLC_TYPE_ID' : 1005,
		'IHM_TYPE_ID'  : 1006,
		
		'SOPEP_TYPE_ID'  : 1007,
		'STS_TYPE_ID'  : 1008,
		'SMPEP_TYPE_ID'  : 1009,
		'BWS_TYPE_ID'  : 1010,
		'VOC_TYPE_ID'  : 1011,
		'SDR_TYPE_ID'  : 1012,
		'COW_TYPE_ID'  : 1013,
		
		'ISM_SRC'  :  'ISM',
		'ISPS_SRC' :  'ISPS',
		'MLC_SRC'  :  'MLC',
		'SSP_SRC'  :  'SSP',
		'DMLC_SRC' :  'DMLC II',

		'COMMENCED_AUDIT_STATUS' : 1001,
		'COMPLETED_AUDIT_STATUS' : 1002,
		'CLOSED_AUDIT_STATUS'    : 1003,
		'VOID_AUDIT_STATUS'      : 1004,
		'REOPEN'                   :1005,
		
		1007 : 'SOPEP',
		1008 : 'STS',
		1009 : 'SMPEP',
		1010 : 'BWS',
		1011 : 'VOC',
		1012 : 'SDR',
		1013 : 'COW', 

		'AUDITOR_ROLE_ID'        : 1001,
		'ADMIN_ROLE_ID'          : 1002,
		'MANAGER_ROLE_ID'        : 1003,
		'AUDIT_AUDITOR_ROLE_ID'  : 1001,
		'AUDIT_OBSERVER_ROLE_ID' : 1002,
		'AUDIT_REVIEWER_ROLE_ID' : 1003,
		'OBSERVER_ROLE_ID'       : 1004,
		'INSPECTOR'              : 'INSPECTOR',
		'AUDITOR'                : 'AUDITOR',
		'DEMO_ROLE_ID'			 : 1005,
		'IHM_MANAGER'			 : 1006,
		'IHM_MANAGER_ROLE_ID'			 : 1006,
		'Approval_MANAGER_ROLE_ID'			 : 1006,
		
		'INTERIM_SUB_TYPE_ID'              : 1001,
		'INITIAL_SUB_TYPE_ID'              : 1002,
		'INTERMEDIATE_SUB_TYPE_ID'         : 1003,
		'RENEWAL_SUB_TYPE_ID'              : 1004,
		'ADDITIONAL_SUB_TYPE_ID'           : 1005,
		'SSP_DMLC_INITIAL_AUD_SUBTYPEID'   : 1001,
		'SSP_DMLC_AMENDMENT_AUD_SUBTYPEID' : 1002,
		'IHM_INITIAL_AUD_SUBTYPE_ID'   	   : 1001,
	    'IHM_AMENDMENT_AUD_SUBTYPE_ID'     : 1002,
		
		'AUDIT_SUB_TYPE': {
			'1001' :{'SUB_TYPE_DESC'  : 'Interim', 		'nextScheduledType':'INITIAL'},
			'1002' :{'SUB_TYPE_DESC'  : 'Initial', 		'nextScheduledType':'INTERMEDIATE'},
			'1003' :{'SUB_TYPE_DESC'  : 'Intermediate', 'nextScheduledType':'RENEWAL'},
			'1004' :{'SUB_TYPE_DESC'  : 'Renewal', 		'nextScheduledType':'INTERMEDIATE'},
			'1005' :{'SUB_TYPE_DESC'  : 'Additional', 	'nextScheduledType':'INTERMEDIATE'},
			'1006' :{'SUB_TYPE_DESC_IHM'  : 'Initial',   	'nextScheduledType':'AMENDMENT'},
			'1007' :{'SUB_TYPE_DESC_IHM'  : 'Amendment',   	'nextScheduledType':'AMENDMENT'}
		},
		
		'VERSION_ID':{
			1001:{'version_type': 'Creation to Lead Signature'},
			1002:{'version_type': 'Reviewer’s Signature'},
			1003:{'version_type': 'Latest Finding Update'},
			//1004:{'version_type': 'Verify / Close'},
			1004:{'version_type': 'Re-open of an Audit'}
		},
	
		'INTERIM_CERT'    		: 1001,
		'SHORT_TERM_CERT' 		: 1002,
		'FULL_TERM_CERT'  		: 1002,
		'EXTENSION' 	  		: 1003,
		'INTERMEDAITE_ENDORSED' : 1004,
		'ADDITIONAL_ENDORSED' 	: 1005,
		'RENEWAL_ENDORSED1' 	: 1006,
		'RENEWAL_ENDORSED2' 	: 1007,
		'RE_ISSUE' 				: 1008,
		
		'FULL_TERM_IHM'         			: 1002,
		'EXTENSION_IHM'						: 1003,
		'ADDITIONAL_ENDORSED_IHM'			: 1005,
		'RENEWAL_ENDORSED_11_7_IHM' 		: 1006,
		'RENEWAL_ENDORSED_11_8_11_9_IHM' 	: 1007,
		'RE_ISSUE_ADMINISTRATIVE_IHM'		: 1008,
		
		
		'INTERIM_SUMMARY_ID' 				: 1004,

		'OPEN_FINDING_STATUS'  : 0,
		'CLOSE_FINDING_STATUS' : 1,

		'MAJOR_FINDING_CATEGORY'           : 1001,
		'MINOR_FINDING_CATEGORY'           : 1002,
		'MAJOR_DOWNGRADE_FINDING_CATEGORY' : 1003,
		'OBS_FINDING_CATEGORY'             : 1004,
		'REVIEW_NOTE'					   : 1005,

		'OPEN'					: 1001,
		'DOWNGRADE'			    : 1002,
		'DOWNGRADED'            : 1003,
		'RESTORE_COMPLAINCE'	: 1004,
		'COMPLAINCE_RESTORED'	: 1005,
		'PLAN_ACCEPTED'			: 1006,
		'VERIFY_CLOSE'			: 1007,
		'VERIFIED_CLOSED'       : 1008,
		'CLOSE' 				: 1009,
		'NIL'                   : 1010,
		'PREVIOUS_STATUS'		: 1011,
		'ALL'					: 1012,
		
		
		'AUD_LEAD_STATUS' : 1,
		'RETRIEVE_STATUS' : 1,
		'OPENFORCAR'      : 2,
		'LINKED_WITH_MLC' : 3,
		'NOT_RETRIEVE_STATUS' : 0,

		'INITIATE_REVIEW_STATUS' : 1,
		'REVERT_REVIEW_STATUS'   : 0,
		'ACCEPTED_REVIEW_STATUS' : 2,
		'REJECTED_REVIEW_STATUS' : 3,

		'DEFAULT_DOC_FLAG'      : 0,
		'ACCEPTED_DOC_FLAG'     : 1,
		'NON_ACCEPTED_DOC_FLAG' : 2,
		'ISPS_REVIEW_OK' : 1,
		'ISM_REVIEW_OK' : 1,
		'IHM_REVIEW_OK'  : 1,
		'PLAN_APPROVAL_REVIEW_OK'  : 1,
		'MLC_REVIEW_OK' : 1,
		'ACTIVE_STATUS'  : 1,
		
		'ACCEPT'  		: 1,
		'NOTACCEPT' 	: 0,

		'CAR_UPDATED_CURRENT_SEQ'   : 600000,
		'ISM_NO_AUD_CERT_AUDITSEQ'  : 600001,
		'ISPS_NO_AUD_CERT_AUDITSEQ' : 600002,
		'MLC_NO_AUD_CERT_AUDITSEQ'  : 600003,
		'IHM_NO_AUD_CERT_AUDITSEQ'  : 600004,

		'AUDIT_PLAN_RPT_ATCH_ID'      : 1001,
		'ATTENDANCE_LIST_RPT_ATCH_ID' : 1002,
		'CERTIFICATE_RPT_ATCH_ID'     : 1003,
		'CREW_LIST_RPT_ATCH_ID'       : 1004,
		'OTHER_RPT_ATCH_ID'           : 1005,

		'AUDIT_PLACE_MAX_LEN'         : 100,
		'NOTES_MAX_LEN'               : 4000,
		'NOTES_MIN_LEN'               : 1,
		'REJECT_COMMENT_MAX_LEN'	   : 100,
		'FINDING_DESCRIPTION_MAX_LEN' : 1000,
		'VESSEL_IMO_MAX_LEN'		   : 7,
		'SSP_DMLC_REVISIONNO_MAX_LEN' : 3,
		'SSP_DMLC_LEADNAME_MAX_LEN'   : 55,
		'SSP_DMLC_REPOTNO_MAX_LEN'    : 10,
		'GRT_MAX_LEN'                 :9,
		'INITIAL_CERT_ISSUE'        : 1001,
		'REVISION_NO_MAX_LEN'       :35,
		'ADMINISTRATIVE_CERT_ISSUE' : 1002,
		'CERTIFICATE_VERSION'        : 'IRI-01',
		'NOT_APPROVED_SUMMARY'    : 1005,
		'ACTIVE'  		: 1,
		'INACTIVE'  	: 0,
    };
	
	var CarFlowStructure = {
			//due date changed by @Ramya on 10-11-2022 for Ticket-574
			1001: {
				
				     1001:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.DOWNGRADE,
								'dueDate'      : 'CURRENT AUDIT'
							},
							{
								'index'        : 1,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.DOWNGRADED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 30
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 90
							},
							{
								'index'        : 3,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
						
				     1002:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 30
							},
							{
								'index'        : 1,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 'NEXT SCHEDULED AUDIT'
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
							
					   1004:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.OBS_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}]
						},
						
			1002: {
					 1001:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.DOWNGRADE,
								'dueDate'      : 'DURING CURRENT AUDIT.'
							},
							{
								'index'        : 1,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.DOWNGRADED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 30
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 90
							},
							{
								'index'        : 3,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
							
					 1002:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.RESTORE_COMPLAINCE,
								'dueDate'      : 'DURING CURRENT AUDIT.'
							},
							{
								'index'        : 1,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.COMPLAINCE_RESTORED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 30
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 'NEXT SCHEDULED AUDIT'
							},
							{
								'index'        : 3,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
							
							1003:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 30
							},
							{
								'index'        : 1,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 'NEXT SCHEDULED AUDIT'
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
						
					   1004:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.OBS_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}]
				 },

			1003: {
				
					 1001:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.DOWNGRADE,
								'dueDate'      : 'CURRENT INSPECTION.'
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.DOWNGRADED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 'DURING CURRENT INSPECTION.'
							},
							{
								'index'        : 3,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 90
							},
							{
								'index'        : 4,
								'categoryId'   : AppConstant.MAJOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
								
					 1002:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.PLAN_ACCEPTED,
								'dueDate'      : 'DURING CURRENT INSPECTION.'
							},
							{
								'index'        : 2,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.PLAN_ACCEPTED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 'NEXT SCHEDULED AUDIT'
							},
							{
								'index'        : 3,
								'categoryId'   : AppConstant.MINOR_FINDING_CATEGORY,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}],
							
					   1004:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.OBS_FINDING_CATEGORY,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}]
						},
				 
				 1005: {
						
					 1005:  [{
								'index'        : 0,
								'categoryId'   : AppConstant.REVIEW_NOTE,
								'statusId'     : AppConstant.OPEN, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.VERIFY_CLOSE,
								'dueDate'      : 'DURING NEXT SCHEDULED INSPECTION.'
							},
							{
								'index'        : 1,
								'categoryId'   : AppConstant.REVIEW_NOTE,
								'statusId'     : AppConstant.VERIFIED_CLOSED, 
								'statusDate'   : '',
								'nextActionId' : AppConstant.NIL,//AppConstant.CLOSE,
								'nextActionId2': 'NIL',
								'dueDate'      : 'N.A.'
							}]
					}
				};
	
	angular
	.module('central')
	.constant('MMMDDYYYY', 'DD-MMM-YYYY')
	.constant('YYYYMMDD', 'YYYY-MM-DD')
	.constant('DDMMMYYYY', 'DD-MMM-YYYY')
	.constant('DDMMYYYY', 'DD-MM-YYYY')
	.constant('MMMMDDYYYY','MMMM-DD-YYYY')
	.constant('HHmm', ' HH:mm')
	.constant('auditType', {
		'1001' :{'AUDIT_TYPE_ID'  : 1001, 'urlMap':'ism',     'src': 'ISM',     'pageTitle' : 'ism audit',      'auditingType' : 'Audit'},
		'1002' :{'AUDIT_TYPE_ID'  : 1002, 'urlMap':'isps',    'src': 'ISPS',    'pageTitle' : 'isps audit',     'auditingType' : 'Audit'},
		'1003' :{'AUDIT_TYPE_ID'  : 1003, 'urlMap':'mlc',     'src': 'MLC',     'pageTitle' : 'mlc inspection', 'auditingType' : 'Inspection'},
		'1004' :{'AUDIT_TYPE_ID'  : 1004, 'urlMap':'ssp',     'src': 'SSP',     'pageTitle' : 'ssp review',     'auditingType' : 'Review'},
		'1005' :{'AUDIT_TYPE_ID'  : 1005, 'urlMap':'dmlc ii', 'src': 'DMLC II', 'pageTitle' : 'dmlc ii review', 'auditingType' : 'Review'},
		'1006' :{'IHM_TYPE_ID'    : 1006, 'urlMap':'ihm',     'src': 'IHM',     'pageTitle' : 'ihm audit',      'auditingType' : 'Audit'},
		'1007' :{'SOPEP_TYPE_ID'  : 1007, 'urlMap':'sopep',   'src': 'SOPEP',   'pageTitle' : 'sopep review',    'auditingType' : 'Review'},
		'1008' :{'STS_TYPE_ID'    : 1008, 'urlMap':'sts',     'src': 'STS',     'pageTitle' : 'sts review',      'auditingType' : 'Review'},
		'1009' :{'SMPEP_TYPE_ID'  : 1009, 'urlMap':'smpep',     'src': 'SMPEP',   'pageTitle' : 'smpep review',    'auditingType' : 'Review'},
		'1010' :{'BWS_TYPE_ID'    : 1010, 'urlMap':'bws',     'src': 'BWS',     'pageTitle' : 'bws review',      'auditingType' : 'Review'},
		'1011' :{'VOC_TYPE_ID'    : 1011, 'urlMap':'voc',     'src': 'VOC',     'pageTitle' : 'voc review',      'auditingType' : 'Review'},
		'1012' :{'SDR_TYPE_ID'    : 1012, 'urlMap':'SDR',     'src': 'SDR',     'pageTitle' : 'sdr review',      'auditingType' : 'Review'},
		'1013' :{'COW_TYPE_ID'    : 1013, 'urlMap':'cow',     'src': 'COW',     'pageTitle' : 'cow review',      'auditingType' : 'Review'}
	})
	
	.constant('BASE_URL','https://auditingapptesting.bsolsystems.com:8181/CentralAuditApi/api/')
	 .constant('BASE_URL_LOGIN','https://auditingapptesting.bsolsystems.com:8181/CentralAuditApi/')
		 .constant('CERTI_URL','https://verify.register-iri.com/qr/docVerify?qid=')
	 .constant('RMI_URL_LOG','http://3.7.127.112:7001/RMIInterSys/ws1/loggers/')
	 
	.constant('AppConstant', AppConstant)
	.constant('CarFlowStructure',CarFlowStructure);
	

})();

