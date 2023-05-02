(function() {
	'use strict';

	angular.module('app.audit').service('auditService', auditService);

	function auditService(detailsFactory, $q, $timeout, YYYYMMDD, DDMMYYYY, MMMDDYYYY,
			$cookies, AppConstant, HHmm) {

		var companyId = sessionStorage.getItem('companyId');

		var cenAuthorizationPass = window.btoa('cenAuthorizationPass');

		var centralAccessToken = window.btoa('centralAccessToken');

		var centralExpiresIn = window.btoa('centralExpiresIn');

		var centralRefreshToken = window.btoa('centralRefreshToken');

		var centralTokenType = window.btoa('centralTokenType');

		var cenAuthorizationUser = window.btoa('cenAuthorizationUser');

		//this.sourceToDataURL = sourceToDataURL;

		this.getMasterData = getMasterData;

		this.getAuditData = getAuditData;

		this.ismPdfService = ismPdfService;
		
		this.ispsPdfService = ispsPdfService;
		
		this.mlcPdfService = mlcPdfService;
		
		this.ihmPdfService = ihmPdfService;

		this.reportAuditGenerate = reportAuditGenerate;

	/*	this.sspreviewletter = sspreviewletter;*/
		
		this.sspApproveLetter = sspApproveLetter;
		
		this.ihmApproveLetter = ihmApproveLetter;
    	
    	this.dmlcReviewLetter = dmlcReviewLetter;
    	
    	this.planApprovalLetter = planApprovalLetter;
    	
    	this.planReceiptLetter = planReceiptLetter;
		
		this.sspReceiptLetter = sspReceiptLetter;
		
		this.dmlcReceiptLetter = dmlcReceiptLetter;
		
		this.ihmReceiptLetter =  ihmReceiptLetter;
		
		this.ihmAmendmentReceiptLetter = ihmAmendmentReceiptLetter;
		
		this.sspAmendmentLetter = sspAmendmentLetter;
    	
    	this.ihmAmendmentLetter = ihmAmendmentLetter;
    	
    	this.dmlcAmendmentLetter = dmlcAmendmentLetter;

		this.IENarrativeReport = IENarrativeReport;

		this.getAccessToken = getAccessToken;

		this.getExpiresIn = getExpiresIn;

		this.getRefreshToken = getRefreshToken;

		this.getTokenType = getTokenType;

		this.setAccessToken = setAccessToken;

		this.setExpiresIn = setExpiresIn;

		this.setRefreshToken = setRefreshToken;

		this.setTokenType = setTokenType;

		this.clearAuthSession = clearAuthSession;

		this.setAuthorization = setAuthorization;

		this.getAuthorization = getAuthorization;

		this.setUserAuthorization = setUserAuthorization;

		this.getUserAuthorization = getUserAuthorization;

		this.amendmentLetter = amendmentLetter;

		this.validateSeal = validateSeal;

		this.dateSuffix = dateSuffix;
		
		this.ordinal_suffix_of = ordinal_suffix_of;
		
	

		var sealTitle = '';

		function validateSeal(title) {

			if (title.indexOf('Special') >= 0) {

				sealTitle = document.getElementById("sa");

			} else if (title.indexOf('Deputy') >= 0) {

				sealTitle = document.getElementById("dc");

			}

			return sealTitle;
		}

		
		
		/*function sourceToDataURL(args) {
			var image = document.createElement('img');

			if (args == 'logo') {
				image.src = document.getElementById('sb').src;
			} else if (args == 'watermark') {
				image.src = document.getElementById('sg').src;
			} else if (args == 'sa') {
				image.src = document.getElementById('sa').src;
			} else if (args == 'dc') {
				image.src = document.getElementById('dc').src;
			} else if(args == 'transparent'){
				image.src = document.getElementById('ts').src;
			}

			var canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			canvas.getContext("2d").drawImage(image, 0, 0);

			var imgData = canvas.toDataURL();

			return imgData;
		}*/

		function setAuthorization(object) {

			object = window.btoa(object);

			sessionStorage.setItem(cenAuthorizationPass, object );

			return {
				cenAuthorizationPass : object
			};
		}

		function getAuthorization() {

			return sessionStorage.getItem(cenAuthorizationPass) ? (window.atob(sessionStorage.getItem(cenAuthorizationPass))) : '';
		}

		function clearAuthSession() {

			sessionStorage.removeItem(centralAccessToken);

			sessionStorage.removeItem(centralExpiresIn);

			sessionStorage.removeItem(centralRefreshToken);

			sessionStorage.removeItem(centralTokenType);

			sessionStorage.removeItem(cenAuthorizationPass);

			sessionStorage.removeItem("authToken");

			sessionStorage.removeItem(cenAuthorizationUser);

			sessionStorage.clear();
		}

		function setUserAuthorization(object) {

			object = window.btoa(object);

			sessionStorage.setItem(cenAuthorizationUser, object );

			return {
				cenAuthorizationUser : object
			};

		}

		function getUserAuthorization() {

			return sessionStorage.getItem(cenAuthorizationUser) ? (window.atob(sessionStorage.getItem(cenAuthorizationUser))) : '';
		}

		function setAccessToken(object) {

			object = window.btoa(object);

			sessionStorage.setItem(centralAccessToken, object );

			return {
				centralAccessToken : object
			};
		}

		function getAccessToken() {

			return sessionStorage.getItem(centralAccessToken) ? (window.atob(sessionStorage.getItem(centralAccessToken))) : '';
		}

		function setExpiresIn(object) {

			object = window.btoa(object);

			sessionStorage.setItem(centralExpiresIn, object );

			return {
				centralExpiresIn : object
			};
		}

		function getExpiresIn() {

			return sessionStorage.getItem(centralExpiresIn) ? (window.atob(sessionStorage.getItem(centralExpiresIn))) : '';
		}

		function setRefreshToken(object) {

			object = window.btoa(object);

			sessionStorage.setItem(centralRefreshToken, object );

			return {
				centralRefreshToken : object
			};
		}

		function getRefreshToken() {

			return sessionStorage.getItem(centralRefreshToken) ? (window.atob(sessionStorage.getItem(centralRefreshToken))) : '';
		}

		function setTokenType(object) {

			object = window.btoa(object);

			sessionStorage.setItem(centralTokenType, object );

			return {
				centralTokenType : object
			};
		}

		function getTokenType() {

			return sessionStorage.getItem(centralTokenType) ? (window.atob(sessionStorage.getItem(centralTokenType))) : '';
		}

		function dateSuffix(a) {

			if ((a >= 4 && a <= 20) || (a >= 24 && a <= 30)) {
				return a + 'th';
			}

			if ((a == 1) || (a == 21) || (a == 31)) {
				console.log('st');

				return a + 'st';
			}

			if ((a == 2) || (a == 22)) {
				console.log('nd');

				return a + 'nd';
			}

			if ((a == 3) || (a == 23)) {

				console.log('rd');
				return a + 'rd';
			}

			return ' ';
		}
		
		function GetSortOrder(prop) {  
		    return function(a, b) {  
		        if (a[prop] > b[prop]) {  
		            return 1;  
		        } else if (a[prop] < b[prop]) {  
		            return -1;  
		        }  
		        return 0;  
		    }  
		}
		
		function ordinal_suffix_of(i) {
		    var j = i % 10,
		        k = i % 100;
		    if (j == 1 && k != 11) {
		        return i + "st";
		    }
		    if (j == 2 && k != 12) {
		        return i + "nd";
		    }
		    if (j == 3 && k != 13) {
		        return i + "rd";
		    }
		    return i + "th";
		}
		
		function ismPdfService(certificateData) {
			
			console.log(certificateData)
			var tempcertificateHead, voidStatus,tempcertificatetype, audittype, auditsubtypeidCaps, auditsubtypeidsmall, headSubTitle, cmpnytype, nmecompny = "", shipType = "Type of Ship", Grt = "Gross Tonnage:", signaturetext = "Signature of the duly authorized official issuing the Certificate", subsequentCertificate = "No";
			var voluntaryCert = certificateData.voluntaryCert;
			if(certificateData.AuditStatusId == AppConstant.VOID_AUDIT_STATUS || certificateData.res.activeStatus === 0 || certificateData.res.auditSummaryId === 1005 || certificateData.crossLineStatus === "extent-inactive"){
				
				voidStatus = true;
			}
			if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
				auditsubtypeidCaps = "INTERIM";
				auditsubtypeidsmall = "Interim"
			} else {
				auditsubtypeidCaps = "";
				auditsubtypeidsmall = ""
			}


				tempcertificateHead = "" + auditsubtypeidsmall
						+ " Safety Management Certificate";

				tempcertificatetype = "" + auditsubtypeidsmall
						+ " Safety Management Certificate";
			
			tempcertificateHead = voluntaryCert ? auditsubtypeidsmall+" Voluntary Statement of Compliance" : tempcertificateHead

				audittype = "ISM";
			
			var issuedDay = dateSuffix(Number(certificateData.certissuedate
					.split(' ')[0]));
			
			var issuedDay1=issuedDay?issuedDay:'(Day)';
			
			var issuedMonth = certificateData.certissuedate.split(' ')[1];
			
			var issuedMonth1=issuedMonth?issuedMonth:'(Month';

			var issuedYear = certificateData.certissuedate.split(' ')[2];
			
			var issuedYear1=issuedYear?issuedYear:'Year)';
			
			var place=certificateData.auditplace=certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].auditPlace : certificateData.auditplace?certificateData.auditplace:'(Location)';

			var certificateAuthority = 'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator\n at '
					+ place
					+ ' this '
					+ issuedDay1
					+ ' day of ' + issuedMonth1 + ", " + issuedYear1 + '.';

			var footerNote;

				if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
					footerNote = voluntaryCert?"MSC-297EV Rev. 10/19":"MSC-297E Rev. 2/18";
					
				} else if (certificateData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID
						|| certificateData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID
						|| certificateData.auditSubTypeId == AppConstant.INTERMEDIATE_SUB_TYPE_ID
						|| certificateData.auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID) {

					footerNote = voluntaryCert?"MSC-297FV Rev. 10/19":"MSC-297F Rev. 2/18";

				}

				cmpnytype = "Company";

				nmecompny = "Name and Address of the " + cmpnytype + ":";
				var docDef={};
				
				console.log(certificateData.auditSubTypeId);
				
	if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
		console.log(certificateData)
		 docDef = {
					ownerPassword : '123456',
					permissions : {
						printing : 'highResolution',
						modifying : false,
						copying : false,
						annotating : false,
						fillingForms : false,
						contentAccessibility : false,
						documentAssembly : false
					},
					 
					defaultStyle: {
					    font: 'Times'
					},
					pageSize: 'Letter',

					footer : {
						text : footerNote,
						//alignment : 'right',
						margin : [ 470, -10,0,70 ],
						fontSize : 9
					},

					content : [],
					// pageMargins: [5, 5, 5, 5],
					background : function(currentPage, pageSize) {
						return {
							image : sourceToDataURL('watermark'),
							width : 300,
							absolutePosition : {
								x : 150,
								y : 260
							},
							opacity : 0.7
						}
					},
					styles : {
						rightme : {
							alignment : 'center',
							margin : [ 0, 10 ]
						},
						header : {
							fontSize : 16,
							bold : true
						}
					}
				};

		 docDef.content.push({
				columns : [ {
					image : '',
					width : 80,
					height : 80,
					margin:[10,15,0,0]
				},{
					width : 350,
					margin:[0,10,0,0],
					text : [ {
						text : 'Republic of the Marshall Islands\n',
						fontSize : 23,
						bold : true,
						color : '#525252',style : 'rightme'
					}, {
						text : 'Maritime Administrator\n',
						fontSize : 14,
						bold : true,
						color : '#666666',style : 'rightme'
					}, {
						text : tempcertificateHead+'\n',
						fontSize : 17,
						bold : true,
						color : '#666666',style : 'rightme'
					},
					{
						text : '',
						fontSize : 9,
						color : 'black',
						alignment : 'center',
					},
					{
						text : 'Issued under the provisions of the International Convention for the \n Safety of Life at Sea, 1974 (SOLAS) as amended'+'\n\n',
						fontSize : 10,
						color : 'black',
						alignment : 'center',
					},
					{
						text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
						fontSize : 10,
						color : 'black',
						alignment : 'center'
					}]
					
				}, {
					columns : [ [ {
						text : 'Certificate Number',
						fontSize : 10,
						margin : [ 2, 0,0,0 ]
					}, {
						table : {
							widths: [80],
							//body : [ [ certificateData.certificateNo ] ]
							body : [ [ voluntaryCert?certificateData.certificateNo.replace("E", "EV"):certificateData.certificateNo] ]
						},
						margin : [ -3,2,0,0 ],fontSize:8
					},{
						qr : certificateData.qrCodeUrl,
						fit : 100,
						margin : [ 1, 10,0,0 ]
						/*image:certificateData.QrC,
						width : 60,
						height : 60,
						margin : [ 12, 10,0,0 ]*/
					}
					/*{	qr : certificateData.qrCodeUrl,
						fit : '80',
						margin : [ -10, 10,0,-10 ]
						//margin : [ 15, 10 ]
					}*/] ],
					width : 'auto'
				} ]	
});

				docDef.content[0].columns[0].image = sourceToDataURL('logo');
				docDef.content
						.push({text:'1',fontSize:7,absolutePosition:(certificateData.vesselName.length < 54)?{x:59,y:708} : {x:59,y:718}});

				docDef.content.push({
					text : 'Particulars of the Ship:',
					bold : true,
					fontSize : 10,
					margin : [ 20, 10 ]
				});
				docDef.content.push([{
					
					margin: [20, 0, 0, 0],
					table: {
						widths: [155,315],
				    	heights: [0,0],
					body: [
					    [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Name of Ship:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselName, fontSize: 10,bold:false}]
							    
							    
							}
						], [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.officialNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Port of Registry:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.portofreg, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: Grt, fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.grt, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "IMO No.:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselImoNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Type of Ship :", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.shiptype+'\n\n', fontSize: 10,bold:false}]
							    
							    
							}
						] ]},
						layout: 'noBorders'
				}

				])

				docDef.content.push({
					text : nmecompny,
					bold : true,
					fontSize : 10,
					margin : [ 20, 0 ]
				});

				if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID) {
					docDef.content.push({
						text : '(see paragraph 1.1.2 of the ISM Code) \n\n',
						bold : false,
						fontSize : 10,
						margin : [ 20, 0 ]
					});
				}

				var companyname ='',companyaddress = "";
				if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID
						|| certificateData.AuditTypeId == AppConstant.ISPS_TYPE_ID) {

					companyname = 'Company Name:';

				} else if (certificateData.AuditTypeId == AppConstant.MLC_TYPE_ID) {

					companyname = 'Shipowner Name:';

				}
			
				if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID
							|| certificateData.AuditTypeId == AppConstant.ISPS_TYPE_ID) {

						companyaddress = 'Company Address:';

					} else if (certificateData.AuditTypeId == AppConstant.MLC_TYPE_ID) {

						companyaddress = 'Shipowner Address:';

					}
				
				docDef.content.push([{
					
							margin: [20, 0, 0, 0],
			            	table: {
						    	widths: [155,300],
						    	heights: [25,55],
							body: [
							    [
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
										/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
										text: [{text: companyname, fontSize: 10,bold:false}]
									},{
									    border: [true, true,true, true],
							 			fillColor: '',
										/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
										text: [{text: certificateData.companyname, fontSize: 10,bold:false}]
									    
									    
									}
								], [
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
										/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
										text: [{text: companyaddress, fontSize: 10,bold:false}]
									},{
									    border: [true, true,true, true],
							 			fillColor: '',
										/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
										text: [{text: certificateData.companyaddress, fontSize: 10,bold:false}]
									    
									    
									}
								] ]},
								layout: 'noBorders'
			         }
			        
			        ])			

				docDef.content.push({
					columns : [ {
						width : '*',
						text : [], fontSize: 10,
						margin : [ 10, 0 ]
					}, {
						width : '*',
						text : [], fontSize: 10,
						margin : [ -82, 0 ]
					} ],
					margin : [ 10, 0 ],
					fontSize : 11,
					color : '#141414'
				});

				if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID
						|| certificateData.AuditTypeId == AppConstant.ISPS_TYPE_ID) {

					docDef.content[7].columns[0].text
							.push('Company Identification Number: \n\n');

					docDef.content[7].columns[1].text
							.push(certificateData.companyimono + '\n\n');
				}

				docDef.content.push({ // to draw a horizontal line
					canvas : [ {
						type : 'line',
						x1 : 15,
						y1 : 5,
						x2 : 520,
						y2 : 5,
						lineWidth : 2
					} ]
				});
				console.log(certificateData);
				var certificateInterim = " ", certificateInitial = " ", certificateInitial1 = " ";

				if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID) {

					if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {

						var interimismcontent = " the requirements of paragraph 14.4 of the International Management Code for the Safe Operation of Ships and for Pollution Prevention (ISM Code) have been met and that the "

						var interimismvalidity = 'This Interim Safety Management Certificate is valid until '
								+ certificateData.expirydate.replace(/^0+/, '')
								+ ', subject to the ';

						docDef.content.push({
							text : [
							        {text:'\nTHIS IS TO CERTIFY THAT',bold:true},
							        {text: interimismcontent },
							        {text:'Document of Compliance ',italics:true},
							        {text:'of the Company is relevant to this ship.'+ '\n\n'},
							        {text:interimismvalidity },
							        {text:'Document of Compliance ',italics:true},
							        {text:'remaining valid.'+ '\n\n\n\n\n\n'}
							        ],
							margin : [ 20, 0 ],
							fontSize : 10,
							alignment:'justify'
						});

					} else {

						certificateInitial = "THIS IS TO CERTIFY THAT the safety management system of the ship has been audited and that it complies with the requirements of the International Management Code for the Safe Operation of Ships and for Pollution Prevention (ISM Code), following verification that the Document of Compliance for the Company is applicable to this type of ship.";

						certificateInitial1 = "The Safety Management Certificate is valid until: "
								+ certificateData.expirydate
								+ " subject to periodical verification and the Document of Compliance remaining valid.";
					}

				}

				docDef.content.push({
					columns : [ {
						width : 100,
						text : '', fontSize: 10
					}, {
						width : '*',
						text : '',
						fontSize:10,
						margin:[62,-20,0,0]
					} ]
				})
				console.log("DOce",docDef.content);
				docDef.content.push({
					columns : [ {
						image : '',
						width : 80,
						height : 80,
						margin:[60,0,0,0]
					}, {
						width : '*',
						text : [],
						fontSize:10
					}, {
						columns : [ [ {
							text : [ '\n\n\n' ]
						}, {
							image : '',
							width: 150, 
				            height: 20,
							margin: [-130,15,0,0]
						} ] ],
						width : 80,
						height: 20
					} ]
				})
				docDef.content[10].columns[1].text =certificateAuthority;

				docDef.content[11].columns[0].image = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].sealImage : sourceToDataURL('transparent');
				docDef.content[11].columns[2].columns[0][1].image = certificateData.currInitialPage[0] && certificateData.currInitialPage[0].signToPrint == 1 ? "data:image/png;base64,"
						+ certificateData.currInitialPage[0].issuerSign : sourceToDataURL('transparent');
				
				docDef.content.push({
					columns : [ {
						width : '*',
						text : certificateData.sealcontent + '\n',
						fontSize : 10,
						margin:[20,0,0,0]
					}, {
						canvas : [ {
							type : 'line',
							x1 : 0,
							y1 : 10,
							x2 : 250,
							y2 : 10,
							lineWidth : 1
						} ]
					} ]
				})

				docDef.content.push({
					columns : [ {
						width : '*',
						text : [ '\n', {
							text : "Unique Tracking Number: ",
							fontSize : 10
						}, {
							text : certificateData.utn,
							bold : true,
							fontSize : 10
						} ],margin:[20,0,0,0]
					}, {
						width : '*',
						text : [ {
							text : '',
							alignment : 'center',
							fontSize : 10,
							italics: false
						}, {
							text : '',
							alignment : 'center',
							fontSize : 10,
							italics: false
						} ]
					} ]
				})
				
				docDef.content[13].columns[1].text[0].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameFull : '(Name) \n';
				docDef.content[13].columns[1].text[0].italics = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameItalics : true;
				docDef.content[13].columns[1].text[1].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].title : '(Appointment)';
				docDef.content[13].columns[1].text[1].italics = certificateData.currInitialPage[0] ? false : true;
				
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : 5,
						x2 : 200,
						y2 : 5,
						lineWidth : 1
					} ]
				})
				docDef.content
						.push({
							stack:[
								      {text:"\nInsert the type of ship from among the following: passenger ship; passenger high-speed craft; cargo high-speed craft; bulk carrier; oil tanker; chemical \n",fontSize : 8,margin:[25,0,10,0]},
								      {text:"tanker; gas carrier; mobile offshore drilling unit; other cargo ship.\n",fontSize : 8,margin:[20,0,10,0]}
								      ]
						})
				docDef.content.push({text:'1',fontSize:7,absolutePosition:(certificateData.vesselName.length < 54)?{x:111,y:273} : {x:111,y:284}});
				docDef.content.push(
						{
							stack:[{
						    	   canvas:[
									        {
									        	type: 'rect',
						                        x: 5, y: (certificateData.vesselName.length < 54 )? 28 : 18,
						                        w: 525,
						                        h: -720,
						                        fillOpacity: 0.5,
						                        lineWidth:2
									        }
									    ]
						       },
						       {
						    	   canvas:[
									        {
									        	type: 'rect',
						                        x: 0, y: (certificateData.vesselName.length < 54 )? 33 : 23,
						                        w: 535,
						                        h: -730,
						                        fillOpacity: 0.5
									        }
									     ]
						       },
						       voidStatus==true?{//ism initial second page
						    	   canvas : [ {
								    		   type : 'line',
								    		   	x1 : 0,
												y1 : -40,
												x2 : 525,
												y2 : -765,
												lineColor:'red',
												lineWidth : 2
											} 
						    	   ],
						    	   absolutePosition:{x:45,y:798}  
						       }:{}
							       
							       
							       ]
							
			            })
			            console.log(docDef.content);

					var ismExtendauditPlace = certificateData.extension[0] ? certificateData.extension[0].auditPlace
							: "";

					var ismExtendDay = certificateData.extension[0] ? certificateData.extension[0].extendedIssueDate
							.split(' ')[0]
							: "";

					var ismExtendMnth = certificateData.extension[0] ? certificateData.extension[0].extendedIssueDate
							.split(' ')[1]
							: "";

					var ismExtendYear = certificateData.extension[0] ? certificateData.extension[0].extendedIssueDate
							.split(' ')[2]
							: "";

					var IsmExtendMnthYear = '';

					if (ismExtendMnth != '') {

						IsmExtendMnthYear = ismExtendMnth + ', ' + ismExtendYear;

					}

					certificateAuthority = 'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator \nat '
							+ ismExtendauditPlace
							+ ' this '
							+ ismExtendDay
							+ ' day of ' + IsmExtendMnthYear + '.';

					if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID) {

						if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {

							var ismExtendExpiryDate = certificateData.extension[0] ? certificateData.extension[0].extendedExpireDate
									: '(Date)';
							
							docDef.content
							.push({
								stack:[
								       {
							columns : [ [ {
								text : 'Certificate Number',
								fontSize : 10,
								margin : [ 435, 0,0,0 ]
							}, {
								table : {
									widths: [80],
									body : [ [ voluntaryCert?certificateData.certificateNo.replace("E", "EV"):certificateData.certificateNo] ]
								},
								margin : [ 427,2,0,0 ],fontSize:8
							} ] ],
							pageBreak:'before',
							//alignment:'right'
						},
						{ 
							text:[
							      {text : "\n\n\nThe Validity of this Interim Safety Management Certificate is extended to ",fontSize:10},
							      {text : ismExtendExpiryDate.replace(/^0+/, '')+'.', italics: (ismExtendExpiryDate == '(Date)')? true:false,fontSize:10}
							],
							margin:[25,0,0,0]
						}
						]
							})
							var ismExtendauditPlace = certificateData.extension[0] ? certificateData.extension[0].auditPlace
							: "(Location)";

							var extOrIss;
							if(certificateData.extension[0] && certificateData.extension[0].extendedEndorsedDate){
								var issuedDayfix = moment(certificateData.extension[0].extendedEndorsedDate).format('DD MMM YYYY');
								extOrIss = issuedDayfix;
							}else
								extOrIss = certificateData.extension[0]?certificateData.extension[0].extendedIssueDate:'';
							
							var issuedDayext = extOrIss ? extOrIss.split(' ')[0] : '';
							
							var ismExtendDay=issuedDayext?issuedDayext:'(Day)';

							var issuedMonthext = extOrIss.split(' ')[1]; 
							
							var ismExtendMnth= issuedMonthext?issuedMonthext:'';
							ismExtendMnth = moment().month(ismExtendMnth).format("MMMM")

							var issuedYearext = extOrIss.split(' ')[2];
							
							var ismExtendYear=issuedYearext?issuedYearext:'';
							
							docDef.content.push({
								columns : [ {
									width : 100,
									text : ''
								}, {
									width : '*',
									text : [
									        {text:'\n\n\n\nIssued by the authority of the Republic of the Marshall Islands Maritime Administrator\nat '},
									        {text:(certificateData.extension[0])? ismExtendauditPlace : '(Location)',italics: (ismExtendauditPlace == '(Location)')? true:false},
									        {text:' this '},
									        {text:(certificateData.extension[0])? ordinal_suffix_of(ismExtendDay.replace(/^0+/, '')) : '(Day)',italics:(ismExtendDay == '(Day)')?true:false},
									        {text:' day of '},
									         {text:(certificateData.extension[0])? ismExtendMnth + ', ' + ismExtendYear +".": "(Month, Year).", italics: (certificateData.extension[0])?false:true}
									        ],
									fontSize:10,
									margin:[60,0,0,0]
								} ]
							})
							
							var extTitle = "";
							extTitle= certificateData.extension[0] ? certificateData.extension[0].sealImage : sourceToDataURL('transparent');
							
							docDef.content.push({
								columns : [ {
									image : extTitle,
									width : 80,
									height : 80,
									margin:[60,0,0,0]
								}, {
									width : '*',
									text : []
								}, {
									columns : [ [ {
										text : [ '\n\n\n' ]
									},
									{
										image : '',
										width : 150,
										height: 20,
										margin:[0,0,60,0]
									} 
									] ],
									width : 'auto'
								} ]
							})
							
							
							docDef.content[20].columns[2].columns[0][1].image = certificateData.extension[0] && certificateData.extension[0].signToPrint==1 ? "data:image/png;base64,"
									+ certificateData.extension[0].issuerSign : sourceToDataURL('transparent');

							docDef.content.push({
								columns : [ {
									width : '*',
									text : certificateData.sealcontent + '\n',
									fontSize : 10,
									margin:[20,0,0,0]
								}, {
									canvas : [ {
										type : 'line',
										x1 : 0,
										y1 : 0,
										x2 : 250,
										y2 : 0,
										lineWidth : 1
									} ]
								}]
							})
							
								docDef.content.push({
									columns : [ {
										width : '*',
										text : [ '' ]
									}, {
										width : '*',
										text : [ {
											text : '',
											alignment : 'center',
											fontSize : 10,
											italics:false
										}, {
											text : '',
											alignment : 'center',
											fontSize : 10,
											italics:false
										} ],
										margin:[0,-10,0,0]
									} ]
									
								})
							
							docDef.content[22].columns[1].text[0].text = certificateData.extension[0] ? certificateData.extension[0].nameFull : '(Name) \n';
							docDef.content[22].columns[1].text[0].italics = certificateData.extension[0] ? certificateData.extension[0].nameItalics : true;
							docDef.content[22].columns[1].text[1].text = certificateData.extension[0] ? certificateData.extension[0].title : '(Appointment)';
							docDef.content[22].columns[1].text[1].italics = certificateData.extension[0] ? false : true;

					}
				}
					docDef.content.push(//ism second page border
							{
								stack:[
								       {
								    	   canvas:[
											        {
											        	type: 'rect',
								                        x: 5, y: 474,
								                        w: 525,
								                        h: -720,
								                        fillOpacity: 0.5,
								                        lineWidth:2
											        }
											    ]
								       },
								       {
								    	   canvas:[
											        {
											        	type: 'rect',
								                        x: 0, y: 479,
								                        w: 535,
								                        h: -730,
								                        fillOpacity: 0.5
											        }
											     ]
								       },
								       voidStatus==true?{//ism initial second page
								    	   canvas : [ {
										    		   type : 'line',
										    		   	x1 : 0,
														y1 : -40,
														x2 : 525,
														y2 : -765,
														lineColor:'red',
														lineWidth : 2
													} 
								    	   ],
								    	   absolutePosition:{x:45,y:798}  
								       }:{}
								       ]
								
				            })
				
		}else if(certificateData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID || certificateData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID){
			console.log(certificateData)
			var intermediateCross = false;//(certificateData.additional[0] && certificateData.additional[0].withoutCross)?certificateData.additional[0].withoutCross:'';
			var additionalCross1 = false;
			var additionalCross2 = false;
			var additionalCross3 = false;
			var withoutcross = true;
			
			
			intermediateCross =(certificateData.intermediateReissue[0]) ? certificateData.intermediateReissue[0].interReissue:false;
			additionalCross1=(certificateData.additionalReissue1[0]) ? certificateData.additionalReissue1[0].addReissue : false;
			additionalCross2=(certificateData.additionalReissue2[0]) ? certificateData.additionalReissue2[0].addReissue : false;
			additionalCross3=(certificateData.additionalReissue3[0]) ? certificateData.additionalReissue3[0].addReissue : false;
			
			 docDef = {
					 ownerPassword : '123456',
						permissions : {
							printing : 'highResolution',
							modifying : false,
							copying : false,
							annotating : false,
							fillingForms : false,
							contentAccessibility : false,
							documentAssembly : false
						},
						 
						defaultStyle: {
						    font: 'Times'
						},pageSize: 'Letter',

						footer : {
							text : footerNote,
							alignment : 'right',
							margin : [ 60, -10,60,0 ],
							fontSize : 9
						},

						content : [],
						// pageMargins: [5, 5, 5, 5],
						background : function(currentPage, pageSize) {
							return {
								image : sourceToDataURL('watermark'),
								width : 300,
								absolutePosition : {
									x : 150,
									y : 260
								},
								opacity : 0.7
							}
						},
						styles : {
							rightme : {
								alignment : 'center',
								//margin : [ 0, 10 ]
							},
							header : {
								fontSize : 16,
								bold : true
							}
						}
					};
			
			 
			 docDef.content.push({
					columns : [ {
						image : '',
						width : 80,
						height : 80,
						margin:[10,15,0,0]
					}, {
						width : 350,
						margin:[0,10,0,0],
						text : [ {
							text : 'Republic of the Marshall Islands\n',
							fontSize : 23,
							bold : true,
							color : '#525252'
						}, {
							text : 'Maritime Administrator\n',
							fontSize : 14,
							bold : true,
							color : '#666666'
						}, {
							text : tempcertificateHead,
							fontSize : 17,
							bold : true,
							color : '#666666'
						},{
							text : "\nIssued under the provisions of the International Convention for the "
								+ '\n',
						fontSize : 10,
						color : 'black',
						alignment : 'center'
					},
					{
						text : "Safety of Life at Sea, 1974 (SOLAS), as amended"
								+ '\n\n',
						fontSize : 10,
						color : 'black',
						alignment : 'center'
					},
					{
						text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
						fontSize : 10,
						color : 'black',
						alignment : 'center'
					} ],
						style : 'rightme'
					}, {
						columns : [ [ {
							text : 'Certificate Number',
							fontSize : 10,
							margin : [ 3, 0,0,0 ]
						}, {
							table : {
								widths: [80],
								body : [ [ voluntaryCert?certificateData.certificateNo.replace("F", "FV"):certificateData.certificateNo ] ]
							},
							margin : [ -3,2,0,0 ],fontSize:8
						},{
							qr : certificateData.qrCodeUrl,
							fit : 90,
							margin : [ 1, 10,0,0 ]
							/*image:certificateData.QrC,
							width : 60,
							height : 60,
							margin : [ 12, 10,0,0 ]*/
						}] ],
						width : 'auto'
					} ]
				});

				docDef.content[0].columns[0].image = sourceToDataURL('logo');
			 
				docDef.content
				.push({
					text : [
							 ],
						margin:[0,-40,0,0]
				});
				
				docDef.content.push({
					text : 'Particulars of the Ship:',
					bold : true,
					fontSize : 10,
					margin : [ 20, 50,0,10 ]
				});
				
				docDef.content.push([{
					
					margin: [20, 0, 0, 0],
	            	table: {
	            		widths: [155,315],
				    	heights: [0,0],
					body: [
					    [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Name of Ship:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselName, fontSize: 10,bold:false}]
							    
							    
							}
						], [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.officialNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Port of Registry:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.portofreg, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: Grt, fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.grt, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "IMO No.:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselImoNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Type of Ship :", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.shiptype+'\n\n', fontSize: 10,bold:false}]
							    
							    
							}
						] ]},
						layout: 'noBorders'
				}
	        
	        ])
				var num = {
						text:'1',
						fontSize:5,
						italics:true
				};

				docDef.content.push({
					text : nmecompny,
					bold : true,
					fontSize : 10,
					margin : [ 20, 0 ]
				});

				
					docDef.content.push({
						text : '(see paragraph 1.1.2 of the ISM Code) \n\n',
						bold : false,
						fontSize : 10,
						margin : [ 20, 0 ]
					});
				
					var companyname ='',companyaddress = "";
					if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID
							|| certificateData.AuditTypeId == AppConstant.ISPS_TYPE_ID) {

						companyname = 'Company Name:';

					} else if (certificateData.AuditTypeId == AppConstant.MLC_TYPE_ID) {

						companyname = 'Shipowner Name:';

					}
				
					if (certificateData.AuditTypeId == AppConstant.ISM_TYPE_ID
								|| certificateData.AuditTypeId == AppConstant.ISPS_TYPE_ID) {

							companyaddress = 'Company Address:';

						} else if (certificateData.AuditTypeId == AppConstant.MLC_TYPE_ID) {

							companyaddress = 'Shipowner Address:';

						}
					
					docDef.content.push([{
						
								margin: [20, 0, 0, 0],
				            	table: {
				            		widths: [155,300],
							    	heights: [25,45],
								body: [
								    [
										{ 
											border: [true, true,true, true],
								 			fillColor: '',
											/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
											text: [{text: companyname, fontSize: 10,bold:false}]
										},{
										    border: [true, true,true, true],
								 			fillColor: '',
											/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
											text: [{text: certificateData.companyname, fontSize: 10,bold:false}]
										    
										    
										}
									], [
										{ 
											border: [true, true,true, true],
								 			fillColor: '',
											/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
											text: [{text: companyaddress, fontSize: 10,bold:false}]
										},{
										    border: [true, true,true, true],
								 			fillColor: '',
											/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
											text: [{text: certificateData.companyaddress, fontSize: 10,bold:false}]
										    
										    
										}
									] ]},
									layout: 'noBorders'
				         }
				        
				        ])

										
					

					docDef.content.push({
						columns : [ {
							width : '*',
							text : [],
							margin : [ 10, 0 ]
							
						}, {
							width : '*',
							text : [],
							margin : [ -83, 0, 0, 0]
						} ],
						margin : [ 10, 0 ],
						fontSize : 10,
						color : '#141414'
					});
					
					if(certificateData.companyaddress.length > 60){
						docDef.content[7].columns[0].text
						.push('Company Identification Number: \n\n');

						docDef.content[7].columns[1].text
						.push(certificateData.companyimono=certificateData.companyimono?certificateData.companyimono:'' + '\n\n');
					}else{
						docDef.content[7].columns[0].text
						.push('Company Identification Number: \n\n');

						docDef.content[7].columns[1].text
						.push(certificateData.companyimono=certificateData.companyimono?certificateData.companyimono:'' + '\n\n');
					}
			
			docDef.content.push({ // to draw a horizontal line
				canvas : [ {
					type : 'line',
					x1 : 15,
					y1 : 5,
					x2 : 520,
					y2 : 5,
					lineWidth : 2
				} ]
			});
			var certificateInitial=' the safety management system of the ship has been audited and that it complies'
				+' with the requirements of the International Management Code for the Safe Operation of Ships and for Pollution'
				+' Prevention (ISM Code), following verification that the Document of Compliance for the Company is'
				+' applicable to this type of ship.';
			
			
			var expirydate=certificateData.expirydate?certificateData.expirydate:'(Date)';
			
			var certificateInitial1='This Safety Management Certificate is valid until '+ expirydate.replace(/^0+/, '') +', subject to periodical verification and that the Document of Compliance remains valid.';
			docDef.content.push({
				text : [ {text:'\nTHIS IS TO CERTIFY THAT',bold:true},
				         {text: certificateInitial + '\n\n'+ certificateInitial1 + '\n\n'},
				          ],
				width:10,
				margin : [ 20, 0 ],
				fontSize : 10,
				alignment:'justify'
			});
			//var auditDate=certificateData.certissuedate?certificateData.auditDate:'dd/mm/yy';
			
			var issueDate= certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].completionDate : certificateData.currentCertiObj.completionDate;
			var finalIssuedDate='(Date)';
			if(issueDate && issueDate!='N.A'){
				var issuedDayPrint = issueDate.split('-');
				finalIssuedDate=issuedDayPrint[0]+" "+moment().month(issuedDayPrint[1]).format("MMMM")+" "+issuedDayPrint[2];
			}
			else{
					finalIssuedDate='(Date)';
			}
			
			var certificateInitial2='Completion date of the verification on which this Certificate is based: '+finalIssuedDate+'.';		
			
			docDef.content.push({
				text : certificateInitial2+'\n\n\n',
				fontSize : 10,
				margin : [ 20, 0 ]
			});
			
			
			docDef.content.push({
				stack:[
							{
								text : certificateAuthority+'\n\n',
								fontSize : 10,
								margin : [ 130, -10,0,0 ]
							},
							{text:'1',fontSize:7,absolutePosition:(certificateData.vesselName.length < 54 )?{x:59,y:690} : {x:59,y:700}}
					       ]
			});
			
			
			docDef.content.push({
				columns : [ {
					image : sourceToDataURL('transparent'),
					width : 80,
					height : 80,
					margin:[40,-20,0,0]
				}, {
					width : '*',
					text : []
				}, {
					columns : [ [ {
						text : [ '\n\n\n' ]
					}, {
						image : sourceToDataURL('transparent'),
						width : 160,
						height : 30,
						margin:[20,-20,0,0]
					} ] ],
					//width : 'auto'
				} ]
			})
			//initial section
						 docDef.content[12].columns[0].image = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].sealImage : sourceToDataURL('transparent');
						 docDef.content[12].columns[2].columns[0][1].image = certificateData.currInitialPage[0] && certificateData.currInitialPage[0].signToPrint == 1 ? "data:image/png;base64,"
									+ certificateData.currInitialPage[0].issuerSign : sourceToDataURL('transparent');
					
			
				docDef.content.push({
					columns : [ {
						width : '*',
						text : certificateData.sealcontent + '\n',
						fontSize : 10,
						margin:[20,0,0,0]
					}, {
						canvas : [ {
							type : 'line',
							x1 : 0,
							y1 : 0,
							x2 : 250,
							y2 : 0,
							lineWidth : 1
						} ]
					} ]
				})

				docDef.content.push({
					columns : [ {
						width : '*',
						text : [ '\n', {
							text : "Unique Tracking Number: ",
							fontSize : 10
						}, {
							text : certificateData.utn,
							bold : true,
							fontSize : 10
						} ],
						margin:[20,0,0,0]
					}, {
						width : '*',
						text : [ {
							text : '',
							alignment : 'center',
							fontSize : 10,
							italics:false
						}, {
							text : '',
							alignment : 'center',
							fontSize : 10,
							italics:false
						} ],
						margin:[0,-10,0,0]
					} ]
				})
				//initial section name and title
				
				docDef.content[14].columns[1].text[0].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameFull : '(Name) \n';
				docDef.content[14].columns[1].text[0].italics = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameItalics : true
				docDef.content[14].columns[1].text[1].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].title : '(Appointment)';
				docDef.content[14].columns[1].text[1].italics = certificateData.currInitialPage[0] ? false : true;

				
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : 5,
						x2 : 197,
						y2 : 5,
						lineWidth : 1
					} ]
				})
				
				var isminitialDesc1='\n Insert the type of ship from among the following: passenger ship; passenger high-speed craft; cargo high-speed craft; bulk ';
				var isminitialDesc2='carrier; oil tanker;chemical tanker; gas carrier; mobile offshore drilling unit; other cargo ship.';
				var isminitialDesc1 = isminitialDesc1+isminitialDesc2;
				docDef.content.push({text:'1',fontSize:7,absolutePosition:(certificateData.vesselName.length < 54)?{x:111,y:273} : {x:111,y:283}});
				docDef.content.push({
					stack:[
						      {text:"\nInsert the type of ship from among the following: passenger ship; passenger high-speed craft; cargo high-speed craft; bulk carrier; oil tanker; chemical ",fontSize : 8,margin:[25,0,10,0]},
						      {text:"tanker; gas carrier; mobile offshore drilling unit; other cargo ship. \n",fontSize : 8,margin:[20,0,10,0]},
						      {text:'\n\n'}
						      ]
				},
				{
					stack:[
					       {
					    	   canvas:[
								        {
								        	type: 'rect',
					                        x: 5, y: (certificateData.vesselName.length < 54 )?20 : 20,
					                        w: 525,
					                        h: -725,
					                        fillOpacity: 0.5,
					                        lineWidth:2
								        }
								    ]
					       },
					       {
					    	   canvas:[
								        {
								        	type: 'rect',
					                        x: 0, y: (certificateData.vesselName.length < 54 )?25 : 25,
					                        w: 535,
					                        h: -735,
					                        fillOpacity: 0.5
								        }
								     ]
					       },
					       voidStatus==true?{//ism initial second page
					    	   canvas : [ {
							    		   type : 'line',
							    		   	x1 : 0,
											y1 : -40,
											x2 : 525,
											y2 : -765,
											lineColor:'red',
											lineWidth : 2
										} 
					    	   ],
					    	   absolutePosition:{x:45,y:798}  
					       }:{}
					       ]
					
	            });
				
		var ismendorse='ENDORSEMENT FOR INTERMEDIATE VERIFICATION AND ADDITIONAL VERIFICATION';
		var ismendorse1='(IF REQUIRED)';
		docDef.content.push({
			columns : [{
				columns : [ [ {
					text : 'Certificate Number',
					fontSize : 10,
					pageBreak:'before',
					margin : [ 435, 0,0,0 ]
				}, {
					table : {
						widths: [80],
						body : [ [ voluntaryCert?certificateData.certificateNo.replace("F", "FV"):certificateData.certificateNo ] ]
					},
					margin : [ 427,2,0,0 ],fontSize:8
				} ] ],
				width : 'auto',
			} ]
		},{
			
			stack:[
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y: 693,
			                        w: 525,
			                        h: -727,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 698,
			                        w: 535,
			                        h: -737,
			                        fillOpacity: 0.5
						        }
						     ]
			       }
			       ]
	});
		docDef.content.push({
			text : ismendorse+'\n',
			fontSize : 10,
			bold:true,
			alignment:'center',
			margin : [ 0, 10,0,0 ]
		});
		docDef.content.push({
			text : ismendorse1+'\n\n',
			fontSize : 10,
			bold:true,
			alignment:'center',
			margin : [ 30, 0,0,0 ]
		});
		
		var endorseContent='THIS IS TO CERTIFY that, at the periodical verification in accordance with regulation IX/6.1 of SOLAS and paragraph \n13.8 of the ISM Code, the Safety Management System was found to comply with the requirements of the ISM Code.';
		
		docDef.content.push({
			text : endorseContent+'\n\n\n',
			fontSize : 10,
			margin : [ 30, 0,20,0 ]
		});
		
		// ISM Intermediate Starts here...

		var IntermediatesealContent = '';
		
		IntermediatesealContent = certificateData.intermediate[0] ? certificateData.intermediate[0].sealImage : sourceToDataURL('transparent');
		
		docDef.content.push({
			alignment: 'justify',
			columns:[
			        {
			        	width: 215,
			        	stack:[
						        {
						            text: [
	            					    {text:"Intermediate Verification:\n"},
	            					    {text:'(to be completed between the'+'\n'+ ' second and third anniversary date)',italics:true}
	            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
						        },{
						             image : IntermediatesealContent,
						             width: 70, 
						 		     height: 70,
						 		    margin : [ 45,10,0, 0 ]
						        }
						    ]
			        },
			        {
						width: '*',
						table: {
						body: [
							[
								{
									stack: [
										{
											columns:[
											        {
											            width:40,
											            text:"Signed:",fontSize:10
											        },{
											            image:(certificateData.intermediate[0] &&  certificateData.intermediate[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.intermediate[0].issuerSign: sourceToDataURL('transparent'),
											            width: 150, 
											  		    height: 20,
											            margin:[45,-15,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},{
											text:[
											      {text:(certificateData.intermediate[0] && certificateData.intermediate[0].nameToPrint === 1)? certificateData.intermediate[0].issuerName+'\n':'(Name)\n', italics:(certificateData.intermediate[0] &&  certificateData.intermediate[0].nameToPrint === 1 && certificateData.intermediate[0].issuerName)? false:true},
											      {text:(certificateData.intermediate[0] && certificateData.intermediate[0].title)? certificateData.intermediate[0].title:'(Appointment)', italics:(certificateData.intermediate[0] &&  certificateData.intermediate[0].title)? false:true}
											      ],
											fontSize:10,margin:[20,0,0,0],
											alignment:'center'   
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Place:",
											            fontSize:10,
											            margin:[0,13,0,0]
											        },{
											        	text :(certificateData.intermediate[0] && certificateData.intermediate[0].auditPlace)? certificateData.intermediate[0].auditPlace:'   ',
											        	fontSize : 10,
											        	margin:[5,10,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Date:",
											            fontSize:10,
											            margin:[0,30,0,0]
											        },{
											        	text :(certificateData.intermediate[0] && certificateData.intermediate[0].issuerSignDate)? certificateData.intermediate[0].issuerSignDate.replace(/^0+/, ''):'    ',
											        	fontSize : 10,
											        	margin:[5,25,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										}
									]
								}
							]
						]
					},layout: 'noBorders'}
			]
		})
		docDef.content.push({
			text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
			fontSize : 10,
			italics:true,
			margin:[30,10,0,0]
		})
		if((intermediateCross)){
			docDef.content.push({
				columns : [ {
					width : '*',
					text :'VERIFICATION PREVIOUSLY CARRIED OUT',
					fontSize : 15,
					absolutePosition: {x:175, y:190}
				}]});
			docDef.content.push({
				canvas : [ {
					type : 'line',
					x1 : 20,
					y1 : -15,
					x2 : 510,
					y2 : -148,
					lineWidth : 1
				} ]
			});
		}
		
		// ISM Additional Starts here... (1)
		
		if(certificateData.additional1[0] || certificateData.additional1.length==0 ){
			
			var AdditionalsealContent = '';
			AdditionalsealContent = certificateData.additional1[0] ? certificateData.additional1[0].sealImage : sourceToDataURL('transparent');
			
			
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    {text:"Additional Verification*:\n"}
		            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
							        },{
							             image: AdditionalsealContent,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,17,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												            image:(certificateData.additional1[0] && certificateData.additional1[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional1[0].issuerSign: sourceToDataURL('transparent'),
												            width: 150, 
												  		    height: 20,
												            margin:[45,-15,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
												      {text:(certificateData.additional1[0] && certificateData.additional1[0].nameToPrint === 1)? certificateData.additional1[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional1[0] &&  certificateData.additional1[0].nameToPrint === 1 && certificateData.additional1[0].issuerName)? false:true},
												      {text:(certificateData.additional1[0] && certificateData.additional1[0].title)? certificateData.additional1[0].title:'(Appointment)',italics:(certificateData.additional1[0] && certificateData.additional1[0].title)? false : true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :(certificateData.additional1[0] && certificateData.additional1[0].auditPlace)? certificateData.additional1[0].auditPlace:'     ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.additional1[0] && certificateData.additional1[0].issuerSignDate)? certificateData.additional1[0].issuerSignDate.replace(/^0+/, ''):'   ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[30,10,0,0]
			})
			if((additionalCross1)){
				docDef.content.push({
					columns : [ {
						width : '*',
						text :'VERIFICATION PREVIOUSLY CARRIED OUT',
						fontSize : 15,
						absolutePosition: {x:175, y:333}
					}]});
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : -15,
						x2 : 510,
						y2 : -148,
						lineWidth : 1
					} ]
				});
			}
		}
		
		// ISM Additional Starts here... (2)
		
		if(certificateData.additional2[0] || certificateData.additional2.length==0){
			
			var AdditionalsealContent1 = '';
			AdditionalsealContent1 = certificateData.additional2[0] ? certificateData.additional2[0].sealImage : sourceToDataURL('transparent');
			
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    {text:"Additional Verification*:\n"}
		            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
							        },{
							             image:AdditionalsealContent1,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,17,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												            image:(certificateData.additional2[0] && certificateData.additional2[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional2[0].issuerSign: sourceToDataURL('transparent'),
												            width: 150, 
												  		    height: 20,
												            margin:[45,-15,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
												      {text:(certificateData.additional2[0] && certificateData.additional2[0].nameToPrint === 1)? certificateData.additional2[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional2[0] &&  certificateData.additional2[0].nameToPrint === 1 && certificateData.additional2[0].issuerName)? false:true},
												      {text:(certificateData.additional2[0] && certificateData.additional2[0].title)? certificateData.additional2[0].title:'(Appointment)',italics:(certificateData.additional2[0] && certificateData.additional2[0].title)? false:true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :(certificateData.additional2[0] && certificateData.additional2[0].auditPlace)? certificateData.additional2[0].auditPlace:'     ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.additional2[0] && certificateData.additional2[0].issuerSignDate)? certificateData.additional2[0].issuerSignDate.replace(/^0+/, ''):'   ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[30,10,0,0]
			})
			if(additionalCross2){
				
					docDef.content.push({
						columns : [ {
							width : '*',
							text :'VERIFICATION PREVIOUSLY CARRIED OUT',
							fontSize : 15,
							absolutePosition: {x:175, y:470}
						}]});
					docDef.content.push({
						canvas : [ {
							type : 'line',
							x1 : 20,
							y1 : -15,
							x2 : 510,
							y2 : -148,
							lineWidth : 1
						} ]
					});
			
		}
		
		// ISM Additional Starts here... (3)
		
		if(certificateData.additional3[0] || certificateData.additional3.length==0){
			var AdditionalsealContent2 = '';
			AdditionalsealContent1 = certificateData.additional3[0] ? certificateData.additional3[0].sealImage : sourceToDataURL('transparent');
			
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    {text:"Additional Verification*:\n"}
		            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
							        },{
							             image:AdditionalsealContent1,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,17,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												            image:(certificateData.additional3[0] && certificateData.additional3[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional3[0].issuerSign: sourceToDataURL('transparent'),
												            width: 150, 
												  		    height: 20,
												            margin:[45,-15,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
												      {text:(certificateData.additional3[0] && certificateData.additional3[0].nameToPrint === 1)? certificateData.additional3[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional3[0] &&  certificateData.additional3[0].nameToPrint === 1 && certificateData.additional3[0].issuerName)? false:true},
												      {text:(certificateData.additional3[0] && certificateData.additional3[0].title)? certificateData.additional3[0].title:'(Appointment)',italics:(certificateData.additional3[0] && certificateData.additional3[0].title)? false:true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :(certificateData.additional3[0] && certificateData.additional3[0].auditPlace)? certificateData.additional3[0].auditPlace:'     ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.additional3[0] && certificateData.additional3[0].issuerSignDate)? certificateData.additional3[0].issuerSignDate.replace(/^0+/, ''):'   ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			docDef.content.push(voidStatus==true?{//ism initial second page
			canvas : [ {
	    		   type : 'line',
	    		   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
	   ],
	   absolutePosition:{x:45,y:800} 
	       }:{})
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[30,10,0,0]
			})
			if((additionalCross3)){
				docDef.content.push({
					columns : [ {
						width : '*',
						text :'VERIFICATION PREVIOUSLY CARRIED OUT',
						fontSize : 15,
						absolutePosition: {x:175, y:602}
					}]});
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : -15,
						x2 : 510,
						y2 : -148,
						lineWidth : 1
					} ]
				});
			}
		}
	}
		

		var ismendContents='*If applicable. Refer to the relevant provisions of section 4.3, Initial verification, of the Revised Guidelines on the Implementation of the International Safety Management (ISM) Code by Administrations adopted by the Organization by Resolution A.1118(30).';
		docDef.content.push({
			text :ismendContents,	
			fontSize : 10,
			margin : [ 30,0,20,0],
			italics: true,
			alignment:'justify',
			pageBreak:'after'
				
		});	
		                     

	// Next Page
		docDef.content.push({
			columns : [{
				columns : [ [ {
					text : 'Certificate Number',
					fontSize : 10,
					//pageBreak:'before',
					margin : [ 435, 0,0,0 ]
				}, {
					table : {
						widths: [80],
						body : [ [ voluntaryCert?certificateData.certificateNo.replace("F", "FV"):certificateData.certificateNo ] ]
					},
					margin : [ 427,2,0,0 ],fontSize:8
				} ] ],
				width : 'auto',
			} ]
		},{
			
			stack:[
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y: 693,
			                        w: 525,
			                        h: -727,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 698,
			                        w: 535,
			                        h: -737,
			                        fillOpacity: 0.5
						        }
						     ]
			       }
			       ]
	});
			
		var ismendorsecontent2='ENDORSEMENT WHERE THE RENEWAL VERIFICATION HAS BEEN COMPLETED AND PART B 13.13 OF THE ISM CODE APPLIES.';
		
		docDef.content.push({
			text :ismendorsecontent2+'\n\n',	
			fontSize : 10,
			bold:true,
			margin : [ 30, 10,30,0]
		});	
		var renewalDate = (certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].extendedExpireDate)? certificateData.renewalEndorse2[0].extendedExpireDate : '(Date)'
		var ismendorsecontent3='The ship complies with the relevant provisions of part B of the ISM Code and the Certificate should, in accordance with part B 13.13 of the ISM Code, be accepted as valid until ';
		docDef.content.push({
			text : [
			        {text:ismendorsecontent3},
			        {text:renewalDate.replace(/^0+/, '')+'.\n\n',italics:(renewalDate == '(Date)')?true:false}
			        ],	
			fontSize : 10,
			margin : [ 30, 0]
		});
		
		// Renewal Endorsement start
		if(certificateData.crossLineStatus == "extent-inactive" || certificateData.crossLineStatus == "inactive"){
			if(certificateData.currentCertiObj.certIssueId == 1002){
				certificateData.renewalEndorse2.length = 0;
			}else if(certificateData.currentCertiObj.seqNo < (certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].seqNo)){
				certificateData.renewalEndorse2.length = 0;
				/*certificateData.certificateDetails.forEach(function (exten){
					if(certificateData.currentCertiObj.seqNo > )
				})*/
			}
		}
		
		var renewalsealContent = '';
		
		renewalsealContent = certificateData.renewalEndorse2[0] ? certificateData.renewalEndorse2[0].sealImage : sourceToDataURL('transparent');
		
		docDef.content.push({
			alignment: 'justify',
			columns:[
			        {
			        	width: 215,
			        	stack:[
						        {
						            text: [
	            					    {text:"Endorsement:"},
	            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
						        },{
						             image : renewalsealContent,
						             width: 70, 
						 		     height: 70,
						 		    margin : [ 45,10,0, 0 ]
						        }
						    ]
			        },
			        {
						width: '*',
						table: {
						body: [
							[
								{
									stack: [
										{
											columns:[
											        {
											            width:40,
											            text:"Signed:",fontSize:10
											        },{
											            image:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.renewalEndorse2[0].issuerSign: sourceToDataURL('transparent'),
											            width: 150, 
											  		    height: 20,
											            margin:[45,-15,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},{
											text:[
											      {text:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].nameToPrint === 1)? certificateData.renewalEndorse2[0].issuerName+'\n':'(Name)\n', italics:(certificateData.renewalEndorse2[0] &&  certificateData.renewalEndorse2[0].nameToPrint === 1 && certificateData.renewalEndorse2[0].issuerName)? false:true},
											      {text:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title)? certificateData.renewalEndorse2[0].title:'(Appointment)',italics:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title)? false:true}
											      ],
											fontSize:10,margin:[20,0,0,0],
											alignment:'center'   
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Place:",
											            fontSize:10,
											            margin:[0,13,0,0]
											        },{
											        	text :( certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].auditPlace)? certificateData.renewalEndorse2[0].auditPlace:'   ',
											        	fontSize : 10,
											        	margin:[5,10,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Date:",
											            fontSize:10,
											            margin:[0,30,0,0]
											        },{
											        	text :(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].issuerSignDate)? certificateData.renewalEndorse2[0].issuerSignDate.replace(/^0+/, ''):'    ',
											        	fontSize : 10,
											        	margin:[5,25,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										}
									]
								}
							]
						]
					},layout: 'noBorders'}
			],margin:[0,10,0,0]
		})
		docDef.content.push({
			text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
			fontSize : 10,
			italics:true,
			margin:[30,10,0,0]
		})
		// end
		var endorseExtendContent='ENDORSEMENT TO EXTEND THE VALIDITY OF THE CERTIFICATE UNTIL REACHING THE PORT OF VERIFICATION WHERE PART B 13.12 OF THE ISM CODE APPLIES OR FOR A PERIOD OF GRACE WHERE PART B 13.14 OF THE ISM CODE APPLIES.';
		
		docDef.content.push({
			text :endorseExtendContent+'\n\n',	
			fontSize : 10,
			bold:true,
			margin : [ 30, 0]
		});	
		var extensionDate = (certificateData.extension[0] && certificateData.extension[0].extendedExpireDate)? certificateData.extension[0].extendedExpireDate : '(Date)'
		var endorseExtendContent1='This Certificate should, in accordance with part B 13.12 or part B 13.14 of the ISM Code, be accepted as valid until ';
		docDef.content.push({
			text :[
			       {text:endorseExtendContent1},
			       {text:extensionDate.replace(/^0+/, '')+'.\n\n\n',italics:(extensionDate == '(Date)')?true:false}
			       ],	
			fontSize : 10,
			margin : [ 30, 0]
		});	
		// extension start
		
		if(certificateData.crossLineStatus == "extent-inactive" || certificateData.crossLineStatus == "inactive"){
			
			if(certificateData.currentCertiObj.certIssueId == 1002){
				console.log("extent-inactive");
				certificateData.extension.length = 0;
			}else if(certificateData.currentCertiObj.seqNo < (certificateData.extension[0] && certificateData.extension[0].seqNo)){
				console.log("t-inactive");
				certificateData.extension.length = 0;
				/*certificateData.certificateDetails.forEach(function (exten){
					if(certificateData.currentCertiObj.seqNo > )
				})*/
			}
		}
		var renewalsealContent1 = '';
		
		renewalsealContent1 = certificateData.extension[0] ? certificateData.extension[0].sealImage : sourceToDataURL('transparent');
		
		docDef.content.push({
			alignment: 'justify',
			columns:[
			        {
			        	width: 215,
			        	stack:[
						        {
						            text: [
	            					    {text:"Endorsement to Extend:"},
	            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
						        },{
						             image : renewalsealContent1,
						             width: 70, 
						 		     height: 70,
						 		    margin : [ 45,10,0, 0 ]
						        }
						    ]
			        },
			        {
						width: '*',
						table: {
						body: [
							[
								{
									stack: [
										{
											columns:[
											        {
											            width:40,
											            text:"Signed:",fontSize:10
											        },{
											            image:(certificateData.extension[0] && certificateData.extension[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.extension[0].issuerSign: sourceToDataURL('transparent'),
											            width: 150, 
											  		    height: 20,
											            margin:[45,-15,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},{
											text:[
											      {text:(certificateData.extension[0] && certificateData.extension[0].nameToPrint === 1)? certificateData.extension[0].issuerName+'\n':'(Name)\n', italics:(certificateData.extension[0] &&  certificateData.extension[0].nameToPrint === 1 && certificateData.extension[0].issuerName)? false:true},
											      {text:(certificateData.extension[0] && certificateData.extension[0].title)? certificateData.extension[0].title:'(Appointment)',italics:(certificateData.extension[0] && certificateData.extension[0].title)? false:true}
											      ],
											fontSize:10,margin:[20,0,0,0],
											alignment:'center'   
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Place:",
											            fontSize:10,
											            margin:[0,13,0,0]
											        },{
											        	text :(certificateData.extension[0] && certificateData.extension[0].auditPlace)? certificateData.extension[0].auditPlace:'   ',
											        	fontSize : 10,
											        	margin:[5,10,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Date:",
											            fontSize:10,
											            margin:[0,30,0,0]
											        },{
											        	text :(certificateData.extension[0] && certificateData.extension[0].issuerSignDate)? certificateData.extension[0].issuerSignDate.replace(/^0+/, ''):'    ',
											        	fontSize : 10,
											        	margin:[5,25,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										}
									]
								}
							]
						]
					},layout: 'noBorders'}
			]
		})
		docDef.content.push({
			text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
			fontSize : 10,
			italics:true,
			margin:[30,10,0,0]
		})
		//end
		
		docDef.content.push(voidStatus==true?{//ism initial second page
			canvas : [ {
	    		   type : 'line',
	    		   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
	   ],
	   absolutePosition:{x:45,y:800} 
	       }:{})
		
		}
			return docDef;
		}

		function ispsPdfService(certificateData){

			console.log(certificateData)
			var tempcertificateHead, voidStatus, tempcertificatetype, audittype, auditsubtypeidCaps, auditsubtypeidsmall, headSubTitle, cmpnytype, nmecompny = "", shipType = "Type of Ship", Grt = "Gross Tonnage:", signaturetext = "Signature of the duly authorized official issuing the Certificate", subsequentCertificate = "No";
			var voluntaryCert = certificateData.voluntaryCert;
		if(certificateData.AuditStatusId == AppConstant.VOID_AUDIT_STATUS || certificateData.res.auditSummaryId === 1005 || certificateData.res.activeStatus === 0 || certificateData.crossLineStatus === "extent-inactive" ){
				voidStatus = true;
		}
		if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
			auditsubtypeidCaps = "INTERIM";
			auditsubtypeidsmall = "Interim"
		} else {
			auditsubtypeidCaps = "";
			auditsubtypeidsmall = ""
		}

			tempcertificateHead = "" + auditsubtypeidsmall
					+ " International Ship Security Certificate";

			tempcertificatetype = "" + auditsubtypeidsmall
					+ " International Ship Security Certificate";
		tempcertificateHead = voluntaryCert ? auditsubtypeidsmall+" Voluntary Statement of Compliance" : tempcertificateHead;
			
				audittype = "ISPS";

		var issuedDay = dateSuffix(Number(certificateData.certissuedate
				.split(' ')[0]));

		var issuedMonth = certificateData.certissuedate.split(' ')[1]; 

		var issuedYear = certificateData.certissuedate.split(' ')[2];

		var certificateAuthority = 'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator \nat '
				+ certificateData.auditplace
				+ ' this '
				+ issuedDay
				+ ' day of ' + issuedMonth +", " + issuedYear + '.';

		var footerNote;

			if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
				footerNote = voluntaryCert?"MSC-296GV Rev. 10/19":"MSC-296G Rev. 2/18";

			} else if (certificateData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID
					|| certificateData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID
					|| certificateData.auditSubTypeId == AppConstant.INTERMEDIATE_SUB_TYPE_ID
					|| certificateData.auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID) {

				footerNote = voluntaryCert?"MSC-296HV Rev. 10/19":"MSC-296H Rev. 2/18";


			}
			
		cmpnytype = "Company"

		nmecompny = "Name and Address of the " + cmpnytype + ":";
		
		var docDef={};
		
if(certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID)
{
console.log("Interim",certificateData);



docDef = {
		ownerPassword : '123456',
		permissions : {
			printing : 'highResolution',
			modifying : false,
			copying : false,
			annotating : false,
			fillingForms : false,
			contentAccessibility : false,
			documentAssembly : false
		},
		 
		defaultStyle: {
		    font: 'Times'
		},
		pageSize: 'Letter',
		
		content : [],
		// pageMargins: [5, 5, 5, 5],
		background : function(currentPage, pageSize) {
			return {
				image : sourceToDataURL('watermark'),
				width : 300,
				absolutePosition : {
					x : 150,
					y : 260
				},
				opacity : 0.7
			}
		},
		styles : {
			rightme : {
				alignment : 'center',
				//margin : [ 0, 10 ]
			},
			header : {
				fontSize : 16,
				bold : true
			}
		}
	};
docDef.content.push({
	columns : [ {
		image : '',
		width : 80,
		height : 80,
		margin:[10,15,0,0]
	},{
		width : 355,
		margin:[13,10,0,0],
		text : [ {
			text : 'Republic of the Marshall Islands\n',
			fontSize : 23,
			bold : true,
			color : '#525252'
		}, {
			text : 'Maritime Administrator\n',
			fontSize : 14,
			bold : true,
			color : '#666666',style : 'rightme'
		}, {
			text : tempcertificateHead+'\n',
			fontSize : 17,
			bold : true,
			color : '#666666'
		},
		{
			text : '',
			fontSize : 10,
			color : 'black',
			alignment : 'center',
		},
		{
			text : 'Issued under the provisions of the International Ship and \n Port Facility Security (ISPS) Code'+'\n\n',
			fontSize : 10,
			color : 'black',
			alignment : 'center',
		},
		{
			text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
			fontSize : 10,
			color : 'black',
			alignment : 'center'
		}]
		
	}, {
		columns : [ [ {
			text : 'Certificate Number',
			fontSize : 10,
			margin : [ 7, 0,0,0 ]
		}, {
			table : {
				widths: [77],
				body : [ [ voluntaryCert?certificateData.certificateNo.replace("G", "GV"):certificateData.certificateNo ] ]
			},
			margin : [ 3,2,0,0 ],fontSize:8
		},{
			qr : certificateData.qrCodeUrl,
			fit : 100,
			margin : [ 6, 10,0,0 ]
			/*image:certificateData.QrC,
			width : 60,
			height : 60,
			margin : [ 18, 10,0,0 ]*/
		} ] ],
		width : 'auto'
	} ]
});

docDef.content[0].columns[0].image = sourceToDataURL('logo');
docDef.content
.push({});


docDef.content.push({
	text : 'Particulars of the Ship:',
	bold : true,
	fontSize : 10,
	margin : [ 20, 10 ]
});

docDef.content.push([{
	
	margin: [20, 0, 0, 0],
	table: {
		widths: [155,315],
    	heights: [0,0],
	body: [
	    [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "Name of Ship:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
				text: [{text: certificateData.vesselName, fontSize: 10,bold:false}]
			    
			    
			}
		], [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.officialNo, fontSize: 10,bold:false}]
			    
			    
			}
		],[
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
				text: [{text: "Port of Registry:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.portofreg, fontSize: 10,bold:false}]
			    
			    
			}
		],[
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: Grt, fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.grt, fontSize: 10,bold:false}]
			    
			    
			}
		],[
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "IMO No.:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.vesselImoNo, fontSize: 10,bold:false}]
			    
			    
			}
		],[
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "Type of Ship:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.shiptype, fontSize: 10,bold:false}]
			    
			    
			}
		] ]},
		layout: 'noBorders'
}

])


docDef.content.push({
	text : "Name and Address of the Company:\n\n",
	bold : true,
	fontSize : 10,
	margin : [ 20, 25,0,0 ]
});

docDef.content.push([{
	
	margin: [20, 0, 0, 0],
	table: {
		widths: [155,300],
    	heights: [25,40],
	body: [
	    [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "Company Name:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.companyname, fontSize: 10,bold:false}]
			    
			    
			}
		], [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "Company Address:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.companyaddress, fontSize: 10,bold:false}]
			    
			    
			}
		] ]},
		layout: 'noBorders'
}

])

docDef.content.push({
	columns : [
				{
					text:[
					      {text:'Company Identification Number: \n',margin : [ 30,0,0, 0 ]}
					      ],
					      margin:[20,10,0,0]
					
				},
				{
					text:[
					      {text:(certificateData.vesselName.length < 54 )? certificateData.companyimono +'\n\n\n':certificateData.companyimono + '\n\n',alignment:'justify'}
					      ],
					margin : [ -83, 10,0,0 ]
				} ],
		//margin : [ 10, 0 ],
		fontSize : 10,
		color : '#141414'
})
var issueDateOfInterimCert;
/*if(certificateData.consecutiveId == 1001 && certificateData.ispsPreviousIssueDate==""){
	issueDateOfInterimCert = certificateData.certificateDetails[0].completionDate;
}else{
	issueDateOfInterimCert = (certificateData.consecutiveId) == 1001? certificateData.ispsPreviousIssueDate: 'N.A';
}*/

var issueDate=certificateData.currInitialPage[0] && certificateData.consecutiveId == 1001 ?certificateData.currInitialPage[0].completionDate : certificateData.certificateDetails[0].completionDate;

if(issueDate && issueDate!='N.A' && certificateData.consecutiveId == 1001){
	var issuedDayPrint = issueDate.split('-');
	issueDateOfInterimCert=issuedDayPrint[0]+" "+moment().month(issuedDayPrint[1]).format("MMMM")+" "+issuedDayPrint[2];
}
else{
	issueDateOfInterimCert='N.A';
	
}
docDef.content.push({
			    text: [
		                        {text: 'Is this a subsequent, consecutive Interim Certificate? ', fontSize: 10, color: 'black'},
		                        {text: (certificateData.consecutiveId != 1001) ? 'No': 'Yes', fontSize: 10, color: 'black', italics: false},
		                        {text: '\n If yes, date of issue of initial Interim Certificate: ', fontSize: 10, color: 'black'},
		                        {text: issueDateOfInterimCert, fontSize: 10, color: 'black', italics: false},
		                    ],
		                    margin:[20,0,0,0]
			})
docDef.content.push({ // to draw a horizontal line
	canvas : [ {type : 'line',
		x1 : 15,
		y1 : 5,
		x2 : 520,
		y2 : 5,
		lineWidth : 2
		} ]
});


docDef.content.push({
	text : "",
	margin : [ 10, 0 ],
	bold:true,
	fontSize : 10
});

docDef.content.push({
	
		text: [
			 {text: 'THIS IS TO CERTIFY THAT ', fontSize: 10,margin :[10,20,0,0],bold:true},
			 {text: 'the requirements of section A/19.4.2 of the ISPS Code have been complied with. \n\n',fontSize: 10,margin :[10,0,0,0],alignment:'justify'},
			 {text: 'This Certificate is issued pursuant to section A/19.4 of the ISPS Code.\n\n', fontSize: 10,margin :[10,0,0,0],alignment:'justify'},
		],
		margin:[20,20,0,0]

});

docDef.content.push({
	text : ['This Certificate is valid until '+certificateData.expirydate.replace(/^0+/, '')+'.'+ '\n\n'],
	margin : [ 20, 0 ],
	fontSize : 10,alignment:'justify'
});


docDef.content.push({
	/*text : [ '' + mlcValidity1 + '\n\n' ],
	margin : [ 20, 0 ],
	fontSize : 10,alignment:'justify'*/
});


docDef.content.push({
	text : ["Issued by the authority of the Republic of the Marshall Islands Maritime Administrator"],
	//alignment:'right',
	margin : [ 160, 20,0,0 ],
	fontSize : 10
});

docDef.content.push({
	text : [ 'at ' + certificateData.auditplace
	         + ' this '
	         + issuedDay
	         + ' day of ' + issuedMonth + ", " + issuedYear + '.'+ '\n' ],
	       margin : [ 160, 0,0,0 ],
	     	fontSize : 10
});
docDef.content.push({
	columns : [ {
		image : '',
		width : 80,
		height : 80,
		margin:[45,-10,0,0]
	}, {
		width : '*',
		text : []
	}, {
		columns : [ [ {
			text : [ '\n\n' ]
		}
		, {
			image : '',
			width : 150,
			height: 30,
			margin:[20,15,0,0]
		} 
		] ]
	} ]
})

docDef.content[15].columns[0].image = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].sealImage : sourceToDataURL('transparent');
docDef.content[15].columns[2].columns[0][1].image = certificateData.currInitialPage[0] && certificateData.currInitialPage[0].signToPrint == 1 ? "data:image/png;base64,"
		+ certificateData.currInitialPage[0].issuerSign : sourceToDataURL('transparent');


docDef.content.push({
	columns : [ {
		width : '*',
		text : certificateData.sealcontent + '\n',
		fontSize : 9,
		margin:[20,5,0,0]
		
	}, {
		canvas : [ {
			type : 'line',
			x1 : 0,
			y1 : 10,
			x2 : 250,
			y2 : 10,
			lineWidth : 1
		} ]
	} ]
})
console.log(docDef.content)
	docDef.content.push({
	columns : [ {
		width : '*',
		text : [ '\n\n\n', {
			text : "Unique Tracking Number: ",
			fontSize : 10
		}, {
			text : certificateData.utn,
			bold : true,
			fontSize : 10
		} ],
	}, {
		width : '*',
		text : [ {
			text : '',
			alignment : 'center',
			fontSize : 10,
			italics:false
		}, {
			text : '',
			alignment : 'center',
			fontSize : 10,
			italics:false
		} ]
	} ],margin:[20,0,0,0]
})

docDef.content[17].columns[1].text[0].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameFull : '(Name) \n';
docDef.content[17].columns[1].text[0].italics = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameItalics : true;
docDef.content[17].columns[1].text[1].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].title : '(Appointment)';
docDef.content[17].columns[1].text[1].italics = certificateData.currInitialPage[0] ? false : true;

docDef.content.push(
{
stack:[
       {
    	   canvas:[
			        {
			        	type: 'rect',
                        x: 5, y: (certificateData.vesselName.length < 54 )? 10 : 10,
                        w: 525,
                        h: -720,
                        fillOpacity: 0.5,
                        lineWidth:2
			        }
			    ]
       },
       {
    	   canvas:[
			        {
			        	type: 'rect',
                        x: 0, y: (certificateData.vesselName.length < 54 )? 15 : 15,
                        w: 535,
                        h: -730,
                        fillOpacity: 0.5
			        }
			     ]
       },
       voidStatus==true?{//ism initial second page
    	   canvas : [ {
		    		   type : 'line',
		    		   	x1 : 0,
						y1 : -40,
						x2 : 525,
						y2 : -765,
						lineColor:'red',
						lineWidth : 2
					} 
    	   ],
    	   absolutePosition:{x:45,y:798}  
       }:{}
       ]

});
 
 console.log("isps interim", docDef.content);
}else if(certificateData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID || certificateData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID){
	
	console.log("ISPS initial/renewal certificateData",certificateData);
	
	 var expiryDate=certificateData.expirydate?certificateData.expirydate:'(Date)';
	 
	 var place=certificateData.auditplace=certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].auditPlace : certificateData.auditplace?certificateData.auditplace:'(Location)';
	
	var issueDate=certificateData.certissuedate=certificateData.certissuedate?certificateData.certissuedate:'(Date)';	
	  
	 var issuedDay = dateSuffix(Number(certificateData.certissuedate
				.split(' ')[0]));
	    
	    var issuedDay1=issuedDay?issuedDay:'(Day)';
		
		var issuedMonth = certificateData.certissuedate.split(' ')[1];
		
		var issuedMonth1= issuedMonth?issuedMonth:'(Month';

		var issuedYear = certificateData.certissuedate.split(' ')[2];
		
		var issuedYear1=issuedYear?issuedYear:'Year)';
	
	var  certificateAuthority = 'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator at '
			+ place
			+ ' this '
			+ issuedDay1
			+ ' day of ' + issuedMonth1 +', '+ issuedYear1+'.';
	
	var intermediateCross = false;
	var additionalCross1 = false;
	var additionalCross2 = false;
	var additionalCross3 = false;
	var withoutcross = true;
	
	intermediateCross =(certificateData.intermediateReissue[0]) ? certificateData.intermediateReissue[0].interReissue:false;
	additionalCross1=(certificateData.additionalReissue1[0]) ? certificateData.additionalReissue1[0].addReissue : false;
	additionalCross2=(certificateData.additionalReissue2[0]) ? certificateData.additionalReissue2[0].addReissue : false;
	additionalCross3=(certificateData.additionalReissue3[0]) ? certificateData.additionalReissue3[0].addReissue : false;
	
	docDef = {
			ownerPassword : '123456',
			permissions : {
				printing : 'highResolution',
				modifying : false,
				copying : false,
				annotating : false,
				fillingForms : false,
				contentAccessibility : false,
				documentAssembly : false
			},
			 
			defaultStyle: {
			    font: 'Times'
			},pageSize: 'Letter',
			  
			/*header : {
				columns : [ {
					width : 80,
					text : ''
				}, {
					width : '*',
					text : ''
				}, {
					columns : [ [ {
						text : 'Certificate Number',
						fontSize : 10,
						margin : [ 5, 0 ]
					}, {
						table : {
							body : [ [ certificateData.certificateNo ] ]
						},
						margin : [ 20, 2 ]
					} ] ],
					width : 'auto',
					margin : [ 40, 5 ],
				} ]
			},*/

		/*	footer : {
				text : footerNote,
				alignment : 'right',
				margin : [ 60,0],
				fontSize : 10
			},*/

			content : [],
			// pageMargins: [5, 5, 5, 5],
			background : function(currentPage, pageSize) {
				return {
					image : sourceToDataURL('watermark'),
					width : 300,
					absolutePosition : {
						x : 150,
						y : 260
					},
					opacity : 0.7
				}
			},
			styles : {
				rightme : {
					alignment : 'center',
					margin : [ 0, 10 ]
				},
				header : {
					fontSize : 16,
					bold : true
				}
			}
		};
	docDef.content.push({
		columns : [ {
			image : '',
			width : 80,
			height : 80,
			margin:[10,15,0,0]
		},{
			width : 350,
			margin:[0,10,0,0],
			text : [ {
				text : 'Republic of the Marshall Islands\n',
				fontSize : 23,
				bold : true,
				color : '#525252',style : 'rightme'
			}, {
				text : 'Maritime Administrator\n',
				fontSize : 14,
				bold : true,
				color : '#666666',style : 'rightme'
			}, {
				text : tempcertificateHead+'\n',
				fontSize : 17,
				bold : true,
				color : '#666666',style : 'rightme'
			},
			{
				text : 'Issued under the provisions of the International Ship and \n Port Facility Security (ISPS) Code'+'\n\n',
				fontSize : 10,
				color : 'black',
				alignment : 'center',
			},
			{
				text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
				fontSize : 10,
				color : 'black',
				alignment : 'center'
			}]
			
		}, {
			columns : [ [ {
				text : 'Certificate Number',
				fontSize : 10,
				margin : [ 3, 0,0,0 ]
			}, {
				table : {
					widths: [80],
					body : [ [voluntaryCert?certificateData.certificateNo.replace("H", "HV"):certificateData.certificateNo] ]
				},
				margin : [ -3,2,0,0 ],fontSize:8
			},{
				qr : certificateData.qrCodeUrl,
				fit : 100,
				margin : [ 1, 10,0,0 ]
				/*image:certificateData.QrC,
				width : 60,
				height : 60,
				margin : [ 12, 10,0,0 ]*/
			} ] ],
			width : 'auto'
		} ]
	});
	
	docDef.content[0].columns[0].image = sourceToDataURL('logo');
	
	docDef.content
	.push({
		text : [
				/*{
					text : certificateData.HeadSubTitle
							+ '\n',
					fontSize : 9,
					color : 'black',
					//alignment : 'center',
					//margin:[0,-90,0,0],
					absolutePosition: {x:80, y:50}
				},
				{
					text : certificateData.headSubTitlemlc
							+ '\n',
					fontSize : 9,
					color : 'black',
					alignment : 'center'
				},
				{
					text : certificateData.headSubTitle2
							+ '\n',
					fontSize : 9,
					color : 'black',
					alignment : 'center',
					//absolutePosition: {x:80, y:50}
					//margin:[0,-30,0,0]
				},
				{
					text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
					fontSize : 9,
					color : 'black',
					alignment : 'center'
				}*/ ]
	});
	
	docDef.content.push({
		text : 'Particulars of the Ship:',
		bold : true,
		fontSize : 10,
		margin : [ 20, 5 ]
	});

	docDef.content.push([{
		
		margin: [20, 0, 0, 0],
		table: {
			widths: [155,340],
	    	heights: [0,0],
		body: [
		    [
				{ 
					border: [true, true,true, true],
		 			fillColor: '',
					text: [{text: "Name of Ship:", fontSize: 10,bold:false}]
				},{
				    border: [true, true,true, true],
		 			fillColor: '',
					text: [{text: certificateData.vesselName, fontSize: 10,bold:false}],
					
				    
				}
			], [
				{ 
					border: [true, true,true, true],
		 			fillColor: '',
					text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}]
				},{
				    border: [true, true,true, true],
		 			fillColor: '',
					text: [{text: certificateData.officialNo, fontSize: 10,bold:false}]
				    
				    
				}
			],[
				{ 
					border: [true, true,true, true],
		 			fillColor: '',
					/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
					text: [{text: "Port of Registry:", fontSize: 10,bold:false}]
				},{
				    border: [true, true,true, true],
		 			fillColor: '',
					/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
					text: [{text: certificateData.portofreg, fontSize: 10,bold:false}]
				    
				    
				}
			],[
				{ 
					border: [true, true,true, true],
		 			fillColor: '',
					/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
					text: [{text: Grt, fontSize: 10,bold:false}]
				},{
				    border: [true, true,true, true],
		 			fillColor: '',
					/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
					text: [{text: certificateData.grt, fontSize: 10,bold:false}]
				    
				    
				}
			],[
				{ 
					border: [true, true,true, true],
		 			fillColor: '',
					/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
					text: [{text: "IMO No.:", fontSize: 10,bold:false}]
				},{
				    border: [true, true,true, true],
		 			fillColor: '',
					/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
					text: [{text: certificateData.vesselImoNo, fontSize: 10,bold:false}]
				    
				    
				}
			],[
				{ 
					border: [true, true,true, true],
		 			fillColor: '',
					text: [{text: "Type of Ship:", fontSize: 10,bold:false}]
				},{
				    border: [true, true,true, true],
		 			fillColor: '',
					text: [{text: certificateData.shiptype, fontSize: 10,bold:false}]
				    
				    
				}
			] ]},
			layout: 'noBorders'
	}

	])
	

	docDef.content.push({
		text : "Name and Address of the Company:\n",
		bold : true,
		fontSize : 10,
		margin : [ 20, 15,0,10 ]
	});
	
	
	
	docDef.content.push({
		stack:[
		      {
	
	margin: [20, 0, 0, 0],
	table: {
		widths: [155,300],
    	heights: [25,40],
	body: [
	    [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "Company Name:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.companyname, fontSize: 10,bold:false}]
			    
			    
			}
		], [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: "Company Address:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				text: [{text: certificateData.companyaddress, fontSize: 10,bold:false}]
			    
			    
			}
		] ]},
		layout: 'noBorders'
},
		       {
		    	   columns : [
		    					{
		    						text:[
		    						      {text:'Company Identification Number: \n',margin : [ 30,20,0, 0 ]}
		    						      ],
		    						      margin:[20,0,0,0]
		    						
		    					},
		    					{
		    						text:[
		    						      {text:certificateData.companyimono,margin : [ 30,20,0, 0 ]}
		    						      ],
		    						margin : [ -83, 0,0,0 ]
		    					} ],
		    			margin : [ 0,0,0, 0 ],
		    			fontSize : 10,
		    			color : '#141414'
		       }
		       ]
	});
	
	docDef.content.push({ // to draw a horizontal line
		canvas : [ {
			type : 'line',
			x1 : 15,
			y1 : 5,
			x2 : 520,
			y2 : 5,
			lineWidth : 1
		} ]
	});
	
	
	docDef.content.push({
		text : " THIS IS TO CERTIFY THAT:\n\n",
		margin : [ 20, 10,0,0 ],
		bold:true,
		fontSize : 10
	});
	
	docDef.content.push({
			fontSize:9,
			ol: [
				 {text: "the security system and any associated security equipment of the ship has been verified in accordance with section 19.1 of part A of the ISPS Code; ", fontSize: 10,margin :[30,0,25,0],alignment:'justify'},
				 {text: "the verification showed that the security system and any associated security equipment of the ship is in all respects satisfactory and that the ship complies with the applicable requirements of chapter XI-2 of the International Convention for the Safety of Life at Sea, 1974 (SOLAS) as amended and part A of the ISPS Code; and", fontSize: 10,margin :[30,5,25,0],alignment:'justify'},
				 {text: "the ship is provided with an approved Ship Security Plan. \n\n", fontSize: 10,margin :[30,5,25,0],alignment:'justify'}
			
			]

	});
/*	docDef.content.push({
		text:[
			    {text:"the security system and any associated security equipment of the ship has been verified in accordance with section 19.1 of part A of the ISPS Code; \n"},
			    {text:"the verification showed that the security system and any associated security equipment of the ship is in all respects satisfactory and that the ship complies with the applicable requirements of chapter XI-2 of the International Convention for the Safety of Life at Sea, 1974 (SOLAS) as amended and part A of the ISPS Code; and\n"},
			    {text:"the ship is provided with an approved ship security plan. \n\n"}
			],
		margin : [ 30, 0,25,0 ],
		fontSize : 10,alignment:'justify'
	});*/
	
	var issueDate= certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].completionDate : certificateData.currentCertiObj.completionDate;
	var finalIssuedDate='(Date)';
	if(issueDate && issueDate!='N.A'){
		var issuedDayPrint = issueDate.split('-');
		finalIssuedDate=issuedDayPrint[0]+" "+moment().month(issuedDayPrint[1]).format("MMMM")+" "+issuedDayPrint[2];
	}
	else{
		finalIssuedDate='(Date)';
		
	}
	
	docDef.content.push({
		text:[
			    {text:"Date of "},
			    {text:((certificateData.AuditTypeId)==1002)?'initial ':'renewal ',italics:false},
			    {text:"verification on which this Certificate is based: "},
			    {text:finalIssuedDate+'.',italics:false}
			],
		margin : [ 20, 0 ],
		fontSize : 10,alignment:'justify'
	});
	

	docDef.content.push({
		text:[
			    {text:"\nThis Certificate is valid until "},
			    {text:certificateData.expirydate.replace(/^0+/, ''),italics:false},
			    {text:", subject to verifications in accordance with section 19.1.1 of part A of the ISPS Code.\n"}
			],
		margin : [ 20, -5,25,0 ],
		fontSize : 10,alignment:'justify'
	});
	

	docDef.content.push({
		text:'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator\n', fontSize: 10,alignment: 'right',margin:[-20,15,25,0]
	});
	
	
	docDef.content.push({
		stack:[
               {
                   text: [
                       {text: 'at ', fontSize:10,  margin:[100,0,0,0]},
                        {text: (certificateData.auditplace)?certificateData.auditplace:'(Location)',fontSize:10,italics:false},
                       {text: ' this ' ,fontSize:10},
                       {text: (issuedDay)? issuedDay: '(Day)',fontSize:10,italics:false},
                       {text: ' day of ',fontSize:10},
                       {text: (issuedMonth)? issuedMonth+', ': ' (Month)',fontSize:10,italics:false},
                       {text: (issuedYear)? issuedYear+'.': ' (Year)' + '.',fontSize:10,italics:false}
       ],
       margin:[158,0,0,0] ,
		fontSize : 10 }
		]
	});
	
	docDef.content.push({
		columns : [ {
			image : '',
			width : 80,
			height : 80,
			margin:[45,-20,0,0]
		}, {
			width : '*',
			text : []
		}, {
			columns : [ [ {
				text : [ '\n\n' ]
			}
			, {
				image : '',
				width : 150,
				height: 30,
				margin:[0,0,60,0]
			} 
			] ],
			width : 'auto'
		} ]
	})
	
	//initial section
				 docDef.content[13].columns[0].image = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].sealImage : sourceToDataURL('transparent');
				 docDef.content[13].columns[2].columns[0][1].image = certificateData.currInitialPage[0] && certificateData.currInitialPage[0].signToPrint == 1 ? "data:image/png;base64,"
							+ certificateData.currInitialPage[0].issuerSign : sourceToDataURL('transparent');
	
	docDef.content.push({
		columns : [ {
			width : '*',
			text : certificateData.sealcontent + '\n',
			fontSize : 10,margin:[20,0,0,0]
			
		}, {
			canvas : [ {
				type : 'line',
				x1 : 0,
				y1 : 0,
				x2 : 250,
				y2 : 0,
				lineWidth : 1
			} ]
		} ]
	})
	console.log(docDef.content)
		docDef.content.push({
		columns : [ {
			width : '*',
			text : [ '\n', {
				text : "Unique Tracking Number: ",
				fontSize : 10
			}, {
				text : certificateData.utn,
				bold : true,
				fontSize : 10
			} ],
			margin:[20,30,0,0]
		}, {
			width : '*',
			text : [ {
				text : '',
				alignment : 'center',
				fontSize : 10,
				italics:false
			}, {
				text : '',
				alignment : 'center',
				fontSize : 10
			}
			],
			margin:[0,-10,0,0]
		} ]
	})
	
//initial section name and title
		
		docDef.content[15].columns[1].text[0].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameFull : '(Name) \n';
		docDef.content[15].columns[1].text[0].italics = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameItalics : true
		docDef.content[15].columns[1].text[1].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].title : '(Appointment)';
		docDef.content[15].columns[1].text[1].italics = certificateData.currInitialPage[0] ? false : true;
		
		docDef.content.push({
			text : footerNote,
			alignment : 'right',
			margin : [ 60,-10,10,0],
			fontSize : 10
		});
	
		docDef.content.push(
			{
			stack:[
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y: (certificateData.vesselName.length < 54 )? 14 : 11,
			                        w: 525,
			                        h: (certificateData.vesselName.length < 54 )? -715 : -725,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: (certificateData.vesselName.length < 54 )? 19 : 16,
			                        w: 535,
			                        h: (certificateData.vesselName.length < 54 )? -725 : -735,
			                        fillOpacity: 0.5
						        }
						     ]
			       },
			       voidStatus==true?{//ism initial second page
			    	   canvas : [ {
				 		   type : 'line',
				 		   	x1 : 0,
								y1 : -40,
								x2 : 525,
								y2 : -765,
								lineColor:'red',
								lineWidth : 2
							} 
				],
				absolutePosition:{x:45,y:800}
			       }:{}
			       ]
			
		});
// Second Page
	docDef.content.push({
		columns : [{
			columns : [ [ {
				text : 'Certificate Number',
				fontSize : 10,
				pageBreak:'before',
				margin : [ 435, 0,0,0 ]
			}, {
				table : {
					widths: [80],
					body : [ [ voluntaryCert?certificateData.certificateNo.replace("H", "HV"):certificateData.certificateNo ] ]
				},
				margin : [ 427,2,0,0 ],fontSize:8
			} ] ],
			width : 'auto',
		} ]
	},{
		
		stack:[
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 5, y: 693,
		                        w: 525,
		                        h: -727,
		                        fillOpacity: 0.5,
		                        lineWidth:2
					        }
					    ]
		       },
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 0, y: 698,
		                        w: 535,
		                        h: -737,
		                        fillOpacity: 0.5
					        }
					     ]
		       }
		       ]
});
		docDef.content.push({
			text : 'ENDORSEMENT FOR INTERMEDIATE VERIFICATION ',
			bold : true,
			fontSize : 10,
			alignment :'center'
		});
	
		var endroseContent=' at an intermediate verification required by section 19.1.1 of part A of the ISPS Code, the ship was found to comply with the relevant provisions of chapter XI-2 of SOLAS and part A of the ISPS Code. ';
		docDef.content.push({
			text :[{text:'THIS IS TO CERTIFY THAT',bold:true},
			       {text:endroseContent+'\n\n\n'}
			       ],
			fontSize : 10,
			alignment:'justify',
			margin : [ 30, 10,30,10 ]
		});	
	
		// Intermediate Starts here...

		var IntermediatesealContent = '';
		IntermediatesealContent = certificateData.intermediate[0] ? certificateData.intermediate[0].sealImage : sourceToDataURL('transparent');
		
		docDef.content.push({
			alignment: 'justify',
			columns:[
			        {
			        	width: 215,
			        	stack:[
						        {
						            text: [
	            					    {text:"Intermediate Verification:\n"}
	            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
						        },{
						             image: IntermediatesealContent,
						             width: 70, 
						 		     height: 70,
						 		    margin : [ 45,10,0, 0 ]
						        }
						    ]
			        },
			        {
						width: '*',
						table: {
						body: [
							[
								{
									stack: [
										{
											columns:[
											        {
											            width:40,
											            text:"Signed:",fontSize:10
											        },{
											            image:(certificateData.intermediate[0] &&  certificateData.intermediate[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.intermediate[0].issuerSign: sourceToDataURL('transparent'),
											            width: 150, 
											  		    height: 20,
											            margin:[45,-15,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},{
											text:[
											      {text:(certificateData.intermediate[0] && certificateData.intermediate[0].nameToPrint === 1)? certificateData.intermediate[0].issuerName+'\n':'(Name)\n', italics:(certificateData.intermediate[0] &&  certificateData.intermediate[0].nameToPrint === 1 && certificateData.intermediate[0].issuerName)? false:true},
											      {text:(certificateData.intermediate[0] && certificateData.intermediate[0].title)? certificateData.intermediate[0].title:'(Appointment)', italics:(certificateData.intermediate[0] &&  certificateData.intermediate[0].title)? false:true}
											      ],
											fontSize:10,margin:[20,0,0,0],
											alignment:'center'   
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Place:",
											            fontSize:10,
											            margin:[0,13,0,0]
											        },{
											        	text :(certificateData.intermediate[0] && certificateData.intermediate[0].auditPlace)? certificateData.intermediate[0].auditPlace:'   ',
											        	fontSize : 10,
											        	margin:[5,10,0,0]
											        }
											    ],margin:[0,-3,0,0]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										},
										{
											columns:[
											        {
											            width:40,
											            text:"Date:",
											            fontSize:10,
											            margin:[0,30,0,0]
											        },{
											        	text :(certificateData.intermediate[0] && certificateData.intermediate[0].issuerSignDate)? certificateData.intermediate[0].issuerSignDate.replace(/^0+/, ''):'    ',
											        	fontSize : 10,
											        	margin:[5,25,0,0]
											        }
											    ]
										},
										{
											columns:[
											        {   
											        },{
											        	canvas : [ {
															type : 'line',
															x1 : -125,
															y1 : 10,
															x2 : 125,
															y2 : 10,
															lineWidth : 1
														} ],
		                                				 margin:[20,-11,0,0]
		                                			}
											    ]
										}
									]
								}
							]
						]
					},layout: 'noBorders'}
			]
		})
		docDef.content.push({
			text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
			fontSize : 10,
			italics:true,
			margin:[30,10,0,0]
		})
		if((intermediateCross)){
			docDef.content.push({
				columns : [ {
					width : '*',
					text :'VERIFICATION PREVIOUSLY CARRIED OUT',
					fontSize : 15,
					absolutePosition: {x:175, y:205}
				}]});
			docDef.content.push({
				canvas : [ {
					type : 'line',
					x1 : 20,
					y1 : -15,
					x2 : 510,
					y2 : -148,
					lineWidth : 1
				} ]
			});
		}
		// end
		
		// ISPS Additional Starts here... (1)
		docDef.content.push({
			text :'\n\nENDORSEMENT FOR ADDITIONAL VERIFICATIONS \n\n\n',
			bold : true,
			fontSize : 10,
			alignment:'center',
			margin : [ 0, -15,0,10 ]
		});

		if(certificateData.additional1[0] || certificateData.additional1.length==0 ){
			var AdditionalsealContent = '';
			AdditionalsealContent = certificateData.additional1[0] ? certificateData.additional1[0].sealImage : sourceToDataURL('transparent');
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    {text:"Additional Verification*:\n"}
		            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
							        },{
							             image:AdditionalsealContent,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,17,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												        	image:(certificateData.additional1[0] && certificateData.additional1[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional1[0].issuerSign: sourceToDataURL('transparent'),
												            width: 150, 
												  		    height: 20,
												            margin:[45,-15,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
												      {text:(certificateData.additional1[0] && certificateData.additional1[0].nameToPrint === 1)? certificateData.additional1[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional1[0] &&  certificateData.additional1[0].nameToPrint === 1 && certificateData.additional1[0].issuerName)? false:true},
												      {text:(certificateData.additional1[0] && certificateData.additional1[0].title)? certificateData.additional1[0].title:'(Appointment)',italics:(certificateData.additional1[0] && certificateData.additional1[0].title)? false : true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :(certificateData.additional1[0] && certificateData.additional1[0].auditPlace)? certificateData.additional1[0].auditPlace:'     ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ],margin:[0,-3,0,0]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.additional1[0] && certificateData.additional1[0].issuerSignDate)? certificateData.additional1[0].issuerSignDate.replace(/^0+/, ''):'   ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[30,10,0,0]
			})
			if(additionalCross1){
				docDef.content.push({
					columns : [ {
						width : '*',
						text :'VERIFICATION PREVIOUSLY CARRIED OUT',
						fontSize : 15,
						absolutePosition: {x:175, y:357}
					}]});
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : -15,
						x2 : 510,
						y2 : -148,
						lineWidth : 1
					} ]
				});
			}
		}
		
		// ISPS Additional Starts here... (2)

		if(certificateData.additional2[0] || certificateData.additional2.length==0){
			var AdditionalsealContent2 = '';
			AdditionalsealContent2 = certificateData.additional2[0] ? certificateData.additional2[0].sealImage : sourceToDataURL('transparent');
			
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    {text:"Additional Verification*:\n"}
		            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
							        },{
							             image:AdditionalsealContent2,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,17,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												            image:(certificateData.additional2[0] && certificateData.additional2[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional2[0].issuerSign: sourceToDataURL('transparent'),
												            width: 150, 
												  		    height: 20,
												            margin:[45,-15,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
												      {text:(certificateData.additional2[0] && certificateData.additional2[0].nameToPrint === 1)? certificateData.additional2[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional2[0] &&  certificateData.additional2[0].nameToPrint === 1 && certificateData.additional2[0].issuerName)? false:true},
										      {text:(certificateData.additional2[0] && certificateData.additional2[0].title)? certificateData.additional2[0].title:'(Appointment)',italics:(certificateData.additional2[0] && certificateData.additional2[0].title)? false:true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :(certificateData.additional2[0] && certificateData.additional2[0].auditPlace)? certificateData.additional2[0].auditPlace:'     ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ],margin:[0,-3,0,0]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.additional2[0] && certificateData.additional2[0].issuerSignDate)? certificateData.additional2[0].issuerSignDate.replace(/^0+/, ''):'   ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[30,10,0,0]
			})
			if(additionalCross2){
				
				docDef.content.push({
					columns : [ {
						width : '*',
						text :'VERIFICATION PREVIOUSLY CARRIED OUT',
						fontSize : 15,
						absolutePosition: {x:175, y:490}
					}]});
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : -15,
						x2 : 510,
						y2 : -148,
						lineWidth : 1
					} ]
				});
			}
		}
	
		// ISPS Additional Starts here... (3)

		if(certificateData.additional3[0] || certificateData.additional3.length==0){
			var AdditionalsealContent1 = '';
			AdditionalsealContent1 = certificateData.additional3[0] ? certificateData.additional3[0].sealImage : sourceToDataURL('transparent');
			
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    {text:"Additional Verification*:\n"}
		            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
							        },{
							             image:AdditionalsealContent1,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,17,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												            image:(certificateData.additional3[0] && certificateData.additional3[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional3[0].issuerSign: sourceToDataURL('transparent'),
												            width: 150, 
												  		    height: 20,
												            margin:[45,-15,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
														{text:(certificateData.additional3[0] && certificateData.additional3[0].nameToPrint === 1)? certificateData.additional3[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional3[0] &&  certificateData.additional3[0].nameToPrint === 1 && certificateData.additional3[0].issuerName)? false:true},
														{text:(certificateData.additional3[0] && certificateData.additional3[0].title)? certificateData.additional3[0].title:'(Appointment)',italics:(certificateData.additional3[0] && certificateData.additional3[0].title)? false:true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :(certificateData.additional3[0] && certificateData.additional3[0].auditPlace)? certificateData.additional3[0].auditPlace:'     ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ],margin:[0,-3,0,0]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.additional3[0] && certificateData.additional3[0].issuerSignDate)? certificateData.additional3[0].issuerSignDate.replace(/^0+/, ''):'   ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[30,10,0,0]
			})
			if(additionalCross3){
				docDef.content.push({
					columns : [ {
						width : '*',
						text :'VERIFICATION PREVIOUSLY CARRIED OUT',
						fontSize : 15,
						absolutePosition: {x:175, y:622}
					}]});
				docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : -15,
						x2 : 510,
						y2 : -148,
						lineWidth : 1
					} ]
				});
			}
		}
		docDef.content.push({
			text:"*This part of the certificate shall be adapted by the Administration to indicate whether it has established additional verifications as provided for in section 19.1.1.4.",
			fontSize:10,
			alignment:'justify',
			margin:[30,0,30,0]
		})
		docDef.content.push(voidStatus==true?{//ism initial second page
			canvas : [ {
	 		   type : 'line',
	 		   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
	],
	absolutePosition:{x:45,y:800}
		       }:{})
		
		docDef.content.push({ text: footerNote, absolutePosition: {x:480, y:740}, fontSize:9 });
// Next Page
docDef.content.push({
		columns : [{
			columns : [ [ {
				text : 'Certificate Number',
				fontSize : 10,
				pageBreak:'before',
				margin : [ 435, 0,0,0 ]
			}, {
				table : {
					widths: [80],
					body : [ [ voluntaryCert?certificateData.certificateNo.replace("H", "HV"):certificateData.certificateNo ] ]
				},
				margin : [ 427,2,0,0 ],fontSize:8
			} ] ],
			width : 'auto',
		} ]
	},{
		
		stack:[
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 5, y: 693,
		                        w: 525,
		                        h: -727,
		                        fillOpacity: 0.5,
		                        lineWidth:2
					        }
					    ]
		       },
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 0, y: 698,
		                        w: 535,
		                        h: -737,
		                        fillOpacity: 0.5
					        }
					     ]
		       }]
});
	
	
var ismendorsecontent2='\nENDORSEMENT WHERE THE RENEWAL VERIFICATION HAS BEEN COMPLETED AND SECTION A/19.3.4 OF THE ISPS CODE APPLIES';
	
	docDef.content.push({
		text :ismendorsecontent2+'\n\n',	
		fontSize : 10,
		bold:true,alignment:'center',
		margin : [ 10, 0]
	});	
	var renewalDate = (certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].extendedExpireDate)? certificateData.renewalEndorse2[0].extendedExpireDate : '[DATE]'
	var ismendorsecontent3='The ship complies with the relevant provisions of Part A of the ISPS Code, and the Certificate shall, in accordance with section 19.3.4 of part A of the ISPS Code, be accepted as valid until ';
	var ismendorsecontent4 = renewalDate.replace(/^0+/, '');
	docDef.content.push({
		text:[
	            {text:ismendorsecontent3},
	            {text: ismendorsecontent4 + '.', /*italics:(ismendorsecontent4 == '[DATE]')?true:false*/}
	            ],	
		fontSize : 10,
		margin : [ 30, 10,30,15]
	});
	
	// Renewal Endorsement start
	
	var renewalsealContent = '';
	renewalsealContent = certificateData.renewalEndorse2[0] ? certificateData.renewalEndorse2[0].sealImage : sourceToDataURL('transparent');
	
	docDef.content.push({
		alignment: 'justify',
		columns:[
		        {
		        	width: 215,
		        	stack:[
					        {
					            text: [
            					    {text:"Endorsement:"},
            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
					        },{
					             image:renewalsealContent,
					             width: 70, 
					 		     height: 70,
					 		    margin : [ 45,10,0, 0 ]
					        }
					    ]
		        },
		        {
					width: '*',
					table: {
					body: [
						[
							{
								stack: [
									{
										columns:[
										        {
										            width:40,
										            text:"Signed:",fontSize:10
										        },
										        {
										            image:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.renewalEndorse2[0].issuerSign: sourceToDataURL('transparent'),
										            width: 150, 
										  		    height: 20,
										            margin:[45,-15,0,0]
										        }
										    ]
									},
									{
										columns:[
										        {   
										        },{
										        	canvas : [ {
														type : 'line',
														x1 : -125,
														y1 : 10,
														x2 : 125,
														y2 : 10,
														lineWidth : 1
													} ],
	                                				 margin:[20,-11,0,0]
	                                			}
										    ]
									},{
										text:[
										      {text:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].nameToPrint === 1)? certificateData.renewalEndorse2[0].issuerName+'\n':'(Name)\n', italics:(certificateData.renewalEndorse2[0] &&  certificateData.renewalEndorse2[0].nameToPrint === 1 && certificateData.renewalEndorse2[0].issuerName)? false:true},
										      {text:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title)? certificateData.renewalEndorse2[0].title:'(Appointment)',italics:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title)? false:true}
										      ],
										fontSize:10,margin:[20,0,0,0],
										alignment:'center'   
									},
									{
										columns:[
										        {
										            width:40,
										            text:"Place:",
										            fontSize:10,
										            margin:[0,13,0,0]
										        },{
										        	text :( certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].auditPlace)? certificateData.renewalEndorse2[0].auditPlace:'   ',
										        	fontSize : 10,
										        	margin:[5,10,0,0]
										        }
										    ]
									},
									{
										columns:[
										        {   
										        },{
										        	canvas : [ {
														type : 'line',
														x1 : -125,
														y1 : 10,
														x2 : 125,
														y2 : 10,
														lineWidth : 1
													} ],
	                                				 margin:[20,-11,0,0]
	                                			}
										    ]
									},
									{
										columns:[
										        {
										            width:40,
										            text:"Date:",
										            fontSize:10,
										            margin:[0,30,0,0]
										        },{
										        	text :(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].issuerSignDate)? certificateData.renewalEndorse2[0].issuerSignDate.replace(/^0+/, ''):'    ',
										        	fontSize : 10,
										        	margin:[5,25,0,0]
										        }
										    ]
									},
									{
										columns:[
										        {   
										        },{
										        	canvas : [ {
														type : 'line',
														x1 : -125,
														y1 : 10,
														x2 : 125,
														y2 : 10,
														lineWidth : 1
													} ],
	                                				 margin:[20,-11,0,0]
	                                			}
										    ]
									}
								]
							}
						]
					]
				},layout: 'noBorders'}
		]
	})
	docDef.content.push({
		text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
		fontSize : 10,
		italics:true,
		margin:[30,10,0,0]
	})
	//end
	
	var endorseExtendContent='ENDORSEMENT TO EXTEND THE VALIDITY OF THE CERTIFICATE UNTIL REACHING THE PORT OF VERIFICATION WHERE SECTION A/19.3.5 OF THE ISPS CODE APPLIES OR FOR A PERIOD OF GRACE WHERE SECTION A/19.3.6 OF THE ISPS CODE APPLIES ';
	
	docDef.content.push({
		text :endorseExtendContent+'\n\n',	
		fontSize : 10,
		bold:true,
		margin : [ 20, 0],
		alignment:'center'
	});	
	var extensionDate = (certificateData.extension[0] && certificateData.extension[0].extendedExpireDate)? certificateData.extension[0].extendedExpireDate : '(Date)'
	var endorseExtendContent1='This Certificate shall, in accordance with section 19.3.5/19.3.6 of part A of the ISPS Code, be accepted as valid until ';
	docDef.content.push({
		text:[
	            {text:"This Certificate shall, in accordance with section 19.3.5/19.3.6 of part A of the ISPS Code, be accepted as valid until "},
	            {text: extensionDate.replace(/^0+/, '')+'.', italics:(extensionDate == '(Date)')?true:false}
	            ],	
		fontSize : 10,
		margin : [ 30, 0,30,20]
	});	
	// extension start
	
	if(certificateData.crossLineStatus == "extent-inactive" || certificateData.crossLineStatus == "inactive"){
		
		if(certificateData.currentCertiObj.certIssueId == 1002){
			console.log("extent-inactive");
			certificateData.extension.length = 0;
		}else if(certificateData.currentCertiObj.seqNo < (certificateData.extension[0] && certificateData.extension[0].seqNo)){
			console.log("t-inactive");
			certificateData.extension.length = 0;
		}
	}
	
	var renewalsealContent1 = '';

	renewalsealContent1 = certificateData.extension[0] ? certificateData.extension[0].sealImage : sourceToDataURL('transparent');
	docDef.content.push({
		alignment: 'justify',
		columns:[
		        {
		        	width: 215,
		        	stack:[
					        {
					            text: [
            					    {text:"Endorsement to Extend:"},
            					    ],fontSize : 10,margin : [ 30,0,0, 0 ]
					        },{
					             image:renewalsealContent1,
					             width: 70, 
					 		     height: 70,
					 		    margin : [ 45,10,0, 0 ]
					        }
					    ]
		        },
		        {
					width: '*',
					table: {
					body: [
						[
							{
								stack: [
									{
										columns:[
										        {
										            width:40,
										            text:"Signed:",fontSize:10
										        },{
										            image:(certificateData.extension[0] && certificateData.extension[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.extension[0].issuerSign: sourceToDataURL('transparent'),
										            width: 150, 
										  		    height: 20,
										            margin:[45,-15,0,0]
										        }
										    ]
									},
									{
										columns:[
										        {   
										        },{
										        	canvas : [ {
														type : 'line',
														x1 : -125,
														y1 : 10,
														x2 : 125,
														y2 : 10,
														lineWidth : 1
													} ],
	                                				 margin:[20,-11,0,0]
	                                			}
										    ]
									},{
										text:[
												{text:(certificateData.extension[0] && certificateData.extension[0].nameToPrint === 1)? certificateData.extension[0].issuerName+'\n':'(Name)\n', italics:(certificateData.extension[0] &&  certificateData.extension[0].nameToPrint === 1 && certificateData.extension[0].issuerName)? false:true},
												{text:(certificateData.extension[0] && certificateData.extension[0].title)? certificateData.extension[0].title:'(Appointment)',italics:(certificateData.extension[0] && certificateData.extension[0].title)? false:true}
										      ],
										fontSize:10,margin:[20,0,0,0],
										alignment:'center'   
									},
									{
										columns:[
										        {
										            width:40,
										            text:"Place:",
										            fontSize:10,
										            margin:[0,13,0,0]
										        },{
										        	text :(certificateData.extension[0] && certificateData.extension[0].auditPlace)? certificateData.extension[0].auditPlace:'   ',
										        	fontSize : 10,
										        	margin:[5,10,0,0]
										        }
										    ]
									},
									{
										columns:[
										        {   
										        },{
										        	canvas : [ {
														type : 'line',
														x1 : -125,
														y1 : 10,
														x2 : 125,
														y2 : 10,
														lineWidth : 1
													} ],
	                                				 margin:[20,-11,0,0]
	                                			}
										    ]
									},
									{
										columns:[
										        {
										            width:40,
										            text:"Date:",
										            fontSize:10,
										            margin:[0,30,0,0]
										        },{
										        	text :(certificateData.extension[0] && certificateData.extension[0].issuerSignDate)? certificateData.extension[0].issuerSignDate.replace(/^0+/, ''):'    ',
										        	fontSize : 10,
										        	margin:[5,25,0,0]
										        }
										    ]
									},
									{
										columns:[
										        {   
										        },{
										        	canvas : [ {
														type : 'line',
														x1 : -125,
														y1 : 10,
														x2 : 125,
														y2 : 10,
														lineWidth : 1
													} ],
	                                				 margin:[20,-11,0,0]
	                                			}
										    ]
									}
								]
							}
						]
					]
				},layout: 'noBorders'}
		]
	})
	docDef.content.push({
		text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
		fontSize : 10,
		italics:true,
		margin:[30,10,0,0]
	})
	// end
	/*docDef.content.push({
    canvas: [
               {
               	    type: 'line',
                	x1: 0, y1: 0,
                	x2: 490, y2: 0,
                	lineWidth: 1
		       }
           ],
    margin:[20,140,0,0]
});*/
	
	//renewal endorsement cross line of isps
	 docDef.content.push(voidStatus==true?{
		canvas : [ {
   		   type : 'line',
   		   	x1 : 10,
				y1 : 90,
				x2 : 530,
				y2 : -622,
				lineColor:'red',
				lineWidth : 2
			} 
]
	}:{});
}
		console.log(docDef.content);
		
		
		/*//renewal endorsement cross line of isps
			 docDef.content.push(voidStatus==true?{
				canvas : [ {
		    		   type : 'line',
		    		   	x1 : 10,
						y1 : 90,
						x2 : 530,
						y2 : -622,
						color:'red',
						lineWidth : 2
					} 
 	   ]
			}:{});*/
			
			 docDef.content.push({ text: footerNote, absolutePosition: {x:480, y:740}, fontSize:9 });
		return docDef;

		}
		
		
		
		function mlcPdfService(certificateData){
			console.log(certificateData);
			
			var tempcertificateHead, voidStatus, tempcertificatetype, audittype, auditsubtypeidCaps, auditsubtypeidsmall, headSubTitle, cmpnytype, nmecompny = "", shipType = "Type of Ship", Grt = "Gross Tonnage:", signaturetext = "Signature of the duly authorized official issuing the Certificate", subsequentCertificate = "No";
			var voluntaryCert = certificateData.voluntaryCert;
			if(certificateData.AuditStatusId == AppConstant.VOID_AUDIT_STATUS || certificateData.res.auditSummaryId === 1005 || certificateData.res.activeStatus === 0){
				voidStatus = true;
			}
			if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
				auditsubtypeidCaps = "INTERIM";
				auditsubtypeidsmall = "Interim"
			} else {
				auditsubtypeidCaps = "";
				auditsubtypeidsmall = ""
			}

				tempcertificateHead = "" + auditsubtypeidsmall
						+ " Maritime Labour Certificate";

				tempcertificatetype = "" + auditsubtypeidsmall
						+ " Maritime Labour Certificate";
			
			tempcertificateHead = voluntaryCert ? auditsubtypeidsmall+" Voluntary Statement of Compliance" : tempcertificateHead

			

				audittype = "MLC";

				headSubTitle = certificateData.headSubTitlemlc;
				var mlcIntialContent="THIS IS TO CERTIFY THAT: ";
				
				var mlcContent1= "this ship has been inspected and verified to be in compliance with the requirements of the Convention and the provisions of the attached Declaration of Maritime Labour Compliance; and ";
				
				var mlcContent2="the seafarers’ working and living conditions specified in Appendix A5-I of the Convention were found to correspond to the Republic of the Marshall Islands’ national requirements implementing the Convention. These national requirements are summarized in the Declaration of Maritime Labour Compliance, Part I. \n";
				
				 var expiryDate=certificateData.expirydate?certificateData.expirydate:'(Date)';
				 
				 var place=certificateData.auditplace=certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].auditPlace : certificateData.auditplace?certificateData.auditplace:'(Location)';
				
				var issueDate=certificateData.certissuedate=certificateData.certissuedate?certificateData.certissuedate:'(Date)';
				 
				var auditDate = certificateData.auditDate ? certificateData.auditDate :'(Date)';
				
				var mlcValidity = 'This Certificate is valid until '
						+ expiryDate.replace(/^0+/, '')
						+ ', subject to inspections in accordance with Standards A5.1.3 and A5.1.4 of the Convention. ';
					
				var mlcValidity1 ='This Certificate is valid only when the Declaration of Maritime Labour Compliance issued at '+place + ' on '+ issueDate +' is attached.';
				
				var mlcComplition='Completion date of the inspection on which this Certificate is based: '+auditDate.replace(/^0+/, '')+'.'
				

			var issuedDay = dateSuffix(Number(certificateData.certissuedate
					.split(' ')[0]));

			var issuedDay1=issuedDay?issuedDay:'(Day)';
			
			var issuedMonth = certificateData.certissuedate.split(' ')[1];
			
			var issuedMonth1= issuedMonth?issuedMonth:'(Month';

			var issuedYear = certificateData.certissuedate.split(' ')[2];
			
			var issuedYear1=issuedYear?issuedYear:'Year)';

			var certificateAuthority = 'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator at \n'
					+ certificateData.auditplace
					+ ' this '
					+ issuedDay1
					+ ' day of ' + issuedMonth1 + ", " + issuedYear1 + '.';

			var footerNote;

				if (certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID) {
					footerNote = voluntaryCert?"MSC-400IV Rev. 10/19":"MSC-400I Rev. 2/18";

				} else if (certificateData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID
						|| certificateData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID
						|| certificateData.auditSubTypeId == AppConstant.INTERMEDIATE_SUB_TYPE_ID
						|| certificateData.auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID) {

					footerNote = voluntaryCert?"MSC-400JV Rev. 10/19":"MSC-400J Rev. 2/18";
				}
			
			cmpnytype = "Shipowner"

			nmecompny = "Name and Address of the " + cmpnytype + "";
				
			var docDef = {
					
			};
			
			if(certificateData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID)
				{
				docDef = {
						ownerPassword : '123456',
						permissions : {
							printing : 'highResolution',
							modifying : false,
							copying : false,
							annotating : false,
							fillingForms : false,
							contentAccessibility : false,
							documentAssembly : false
						},
						 
						defaultStyle: {
						    font: 'Times'
						},
						pageSize: 'Letter',
						  
						/*header : {
							columns : [ {
								width : 80,
								text : ''
							}, {
								width : '*',
								text : ''
							}, {
								columns : [ [ {
									text : 'Certificate Number',
									fontSize : 10,
									margin : [ 5, 0 ]
								}, {
									table : {
										body : [ [ certificateData.certificateNo ] ]
									},
									margin : [ 20, 2 ]
								} ] ],
								width : 'auto',
								margin : [ 40, 5 ],
							} ]
						},*/

						footer : {
							text : footerNote,
							alignment : 'right',
							margin : [ 50,-5],
							fontSize : 10
						},

						content : [],
						// pageMargins: [5, 5, 5, 5],
						background : function(currentPage, pageSize) {
							return {
								image : sourceToDataURL('watermark'),
								width : 300,
								absolutePosition : {
									x : 150,
									y : 260
								},
								opacity : 0.7
							}
						},
						styles : {
							rightme : {
								alignment : 'center',
								margin : [ 0, 10 ]
							},
							header : {
								fontSize : 16,
								bold : true
							}
						}
					};
				docDef.content.push({
					columns : [ {
						image : '',
						width : 80,
						height : 80,
						margin:[10,15,0,0]
					},{
						width : 350,
						margin:[0,10,0,0],
						text : [ {
							text : 'Republic of the Marshall Islands\n',
							fontSize : 23,
							bold : true,
							color : '#525252',style : 'rightme'
						}, {
							text : 'Maritime Administrator\n',
							fontSize : 14,
							bold : true,
							color : '#666666',style : 'rightme'
						}, {
							text : tempcertificateHead+'\n',
							fontSize : 17,
							bold : true,
							color : '#666666',style : 'rightme'
						},
						{
							text : 'Issued under the provisions of Article V and Title 5 of the\n  Maritime Labour Convention, 2006 \n(referred to below as the "Convention")'+'\n\n',
							fontSize : 10,
							color : 'black',
							alignment : 'center',
						},
						{
							text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
							fontSize : 10,
							color : 'black',
							alignment : 'center',margin:[0,10,0,0]
						}]
						
					}, {
						columns : [ [ {
							text : 'Certificate Number',
							fontSize : 10,
							margin : [ 1, 0,0,0 ]
						}, {
							table : {
								widths: [80],
								body : [ [ voluntaryCert?certificateData.certificateNo.replace("I", "IV"):certificateData.certificateNo ] ]
							},
							margin : [ -3,2,0,0 ],fontSize:8
						},{
							qr : certificateData.qrCodeUrl,
							fit : 100,
							margin : [ 1, 10,0,0 ]
							/*image:certificateData.QrC,
							width : 60,
							height : 60,
							margin : [ 12, 10,0,0 ]*/
						} ] ],
						width : 'auto'
					} ]
				});
				
				docDef.content[0].columns[0].image = sourceToDataURL('logo');
				
				docDef.content
				.push({
					text : [
							/*{
								text : certificateData.HeadSubTitle
										+ '\n',
								fontSize : 9,
								color : 'black',
								//alignment : 'center',
								//margin:[0,-90,0,0],
								absolutePosition: {x:80, y:50}
							},
							{
								text : certificateData.headSubTitlemlc
										+ '\n',
								fontSize : 9,
								color : 'black',
								alignment : 'center'
							},
							{
								text : certificateData.headSubTitle2
										+ '\n',
								fontSize : 9,
								color : 'black',
								alignment : 'center',
								//absolutePosition: {x:80, y:50}
								//margin:[0,-30,0,0]
							},
							{
								text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
								fontSize : 9,
								color : 'black',
								alignment : 'center'
							}*/ ]
				});
				docDef.content.push({
					text : 'Particulars of the Ship:',
					bold : true,
					fontSize : 10,
					margin : [ 20, 10 ]
				});

				docDef.content.push([{
					
					margin: [20, 0, 0, 0],
					table: {
						widths: [155,315],
				    	heights: [0,0],
					body: [
					    [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								text: [{text: "Name of Ship:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								text: [{text: certificateData.vesselName, fontSize: 10,bold:false}]
							    
							    
							}
						], [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								text: [{text: certificateData.officialNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Port of Registry:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.portofreg, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Date of Registry:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.dateOfReg, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Gross Tonnage :", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.grt, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "IMO No.:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselImoNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Type of Ship:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.shiptype, fontSize: 10,bold:false}]
							    
							    
							}
						] ]},
						layout: 'noBorders'
				}

				])
				

				docDef.content.push({
					text : "Name and Address of the Shipowner  :",
					bold : true,
					fontSize : 10,
					margin : [ 20, 10,0,0 ]
				});
				
				
				
				docDef.content.push([{
					
					margin: [20, 0, 0, 0],
					table: {
						widths: [155,300],
				    	heights: [20,40],
					body: [
					    [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text :'Shipowner Name:',fontSize: 10}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.companyname, fontSize: 10,bold:false}]
							    
							    
							}
						], [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Shipowner Address:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.companyaddress, fontSize: 10,bold:false}]
							    
							    
							}
						] ]},
						layout: 'noBorders'
				}

				])
				
				docDef.content.push({ // to draw a horizontal line
					canvas : [ {
						type : 'line',
						x1 : 15,
						y1 : 5,
						x2 : 520,
						y2 : 5,
						lineWidth : 2
					} ]
				});
				
				
				docDef.content.push({
					text : "THIS IS TO CERTIFY, for the purpose of Standard A5.1.3, paragraph 7, of the Convention, that:",
					margin : [ 20, 2,10,0 ],
					bold:true,
					fontSize : 10
				});
				
				docDef.content.push({
					type: 'lower-alpha',
					ol: [
						'this ship has been inspected, as far as reasonable and practicable, for the matters listed in Appendix A5-I to the Convention, taking into account verification of items under (b), (c) and (d) below;',
						'the shipowner has demonstrated to the competent authority or Recognized Organization that the ship has adequate procedures to comply with the Convention;',
						'the Master is familiar with the requirements of the Convention and the responsibilities for implementation; and',
						'relevant information has been submitted to the competent authority or Recognized Organization to produce a Declaration of Maritime Labour Compliance.'
					],fontSize: 10,alignment:'justify',margin:[20,7,20,0]
				}
			);
				
				docDef.content.push({
					text : [ '\n' + mlcValidity +' Completion date of the inspection referred to under (a) above was '+auditDate.replace(/^0+/, '')+'.'+ '\n\n'],
					margin : [ 20, 0 ],
					fontSize : 10,alignment:'justify'
				});
				

				docDef.content.push({
					/*text : [ '' + mlcValidity1 + '\n\n' ],
					margin : [ 20, 0 ],
					fontSize : 10,alignment:'justify'*/
				});
				

				docDef.content.push({
					text : [],
					fontSize : 10,alignment:'justify'
				});
				
				
				docDef.content.push({
					text : [ '' + certificateAuthority + '\n' ],
					margin : [ 155, 0,0,0 ],
					fontSize : 10
				});
				
				docDef.content.push({
					columns : [ {
						image : '',
						width : 80,
						height : 80,
						margin:[45,-20,0,0]
					}, {
						width : '*',
						text : []
					}, {
						columns : [ [ {
							text : [ '\n\n' ]
						}
						, {
							image : '',
							width : 150,
							height: 30,
							margin:[0,0,60,0]
						} 
						] ],
						width : 'auto'
					} ]
				})
				
				docDef.content[13].columns[0].image = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].sealImage : sourceToDataURL('transparent');
				docDef.content[13].columns[2].columns[0][1].image = certificateData.currInitialPage[0] && certificateData.currInitialPage[0].signToPrint == 1 ? "data:image/png;base64,"
				+ certificateData.currInitialPage[0].issuerSign : sourceToDataURL('transparent');
				
				docDef.content.push({
					columns : [ {
						width : '*',
						text : certificateData.sealcontent + '\n',
						fontSize : 9,margin:[20,3,0,0]
						
					}, {
						canvas : [ {
							type : 'line',
							x1 : 0,
							y1 : 10,
							x2 : 250,
							y2 : 10,
							lineWidth : 1
						} ]
					} ]
				})
				console.log(docDef.content)
					docDef.content.push({
					columns : [ {
						width : '*',
						text : [ '\n', {
							text : "Unique Tracking Number: ",
							fontSize : 10
						}, {
							text : certificateData.utn,
							bold : true,
							fontSize : 10
						} ],margin:[20,5,0,0]
					}, {
						width : '*',
						text : [ {
							text : '',
							alignment : 'center',
							fontSize : 10,
							italics:false
						}, {
							text : '',
							alignment : 'center',
							fontSize : 9,
							italics:false
						} ]
					} ]
				})
				
			
				docDef.content[15].columns[1].text[0].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameFull : '(Name) \n';
				docDef.content[15].columns[1].text[0].italics = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameItalics : true;
				docDef.content[15].columns[1].text[1].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].title : '(Appointment)';
				docDef.content[15].columns[1].text[1].italics = certificateData.currInitialPage[0] ? false : true;

				
					docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : 5,
						x2 : 195,
						y2 : 5,
						lineWidth : 1
					} ]
				})
				
				docDef.content.push({
					
					
					stack: [
						 {text: "For ships covered by the tonnage measurement interim scheme adopted by the International Maritime Organization, the gross tonnage is that which is "+'\n', fontSize:8,alignment:'justify',margin:[25,8,20,0]},
						 {text:"included in the REMARKS column of the International Tonnage Certificate (1969).  See Article II(1)(c) of the Convention."+'\n', fontSize:8,alignment:'justify',margin:[21,0,20,0]},
						 {text: "Shipowner means the owner of the ship or another organization or person, such as the manager, agent or bareboat charterer, who has assumed the "+'\n', fontSize: 8,alignment:'justify',margin:[25,5,20,0]},
						 {text: "responsibility for the operation of the ship from the owner and who, on assuming such responsibility, has agreed to take over the duties and responsibilities imposed on shipowners in accordance with this Convention, regardless of whether any other organizations or persons fulfil certain of the duties or responsibilities on behalf of the shipowner. See Article II(l)(j) of the Convention.", fontSize: 8,alignment:'justify',margin:[21,0,20,0]},
						 {text:'1',absolutePosition:(certificateData.vesselName.length < 54)?{x:120,y:267} : {x:120,y:277},fontSize:8},
						 {text:'2',absolutePosition:(certificateData.vesselName.length < 54)?{x:217,y:321} : {x:217,y:331},fontSize:8},
						 {text:'1',margin:[20,-60,0,0],fontSize:7},
						 {text:'2',absolutePosition:(certificateData.vesselName.length < 54)?{x:59,y:707}:{x:59,y:717},fontSize:7}
					]
		
			},
			{
				stack:[
				       {
				    	   canvas:[
							        {
							        	type: 'rect',
				                        x: 5, y: (certificateData.vesselName.length < 54 )? 73 : 63,
				                        w: 525,
				                        h: -727,
				                        fillOpacity: 0.5,
				                        lineWidth:2
							        }
							    ]
				       },
				       {
				    	   canvas:[
							        {
							        	type: 'rect',
				                        x: 0, y: (certificateData.vesselName.length < 54 )? 78 : 68,
				                        w: 535,
				                        h: -737,
				                        fillOpacity: 0.5
							        }
							     ]
				       },voidStatus==true?{//ism initial second page
				    	   canvas : [ {
				    		   type : 'line',
				    		   	x1 : 0,
								y1 : -40,
								x2 : 525,
								y2 : -765,
								lineColor:'red',
								lineWidth : 2
							} 
		    	   ],
		    	   absolutePosition:{x:45,y:798}  
		       }:{}
				       ]
				
            });}
			else if(certificateData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID || certificateData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID)
				{
				console.log("MLC certificateData",certificateData);
				
				
				var mlcIntialContent="THIS IS TO CERTIFY THAT: ";
				
				var mlcContent1= "this ship has been inspected and verified to be in compliance with the requirements of the Convention and the provisions of the attached Declaration of Maritime Labour Compliance; and ";
				
				var mlcContent2="the seafarers’ working and living conditions specified in Appendix A5-I of the Convention were found to correspond to the Republic of the Marshall Islands’ national requirements implementing the Convention. These national requirements are summarized in the Declaration of Maritime Labour Compliance, Part I. \n";
				
				 var expiryDate=certificateData.expirydate?certificateData.expirydate:'(Date)';
				 
				 //var place=certificateData.auditplace=certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].auditPlace : certificateData.auditplace?certificateData.auditplace:'(Location)';
				
				//var issueDate=certificateData.certissuedate=certificateData.certissuedate?certificateData.certissuedate:'(Date)';
				 
				 var dmlcIssuePlace=certificateData.currInitialPage[0]?certificateData.currInitialPage[0].dmlcIssuePlace : certificateData.certificateDetails[0]? certificateData.certificateDetails[0].dmlcIssuePlace : '(Location)';
				 if(dmlcIssuePlace && dmlcIssuePlace=='N.A')
					 dmlcIssuePlace='(Location)';
				 var place=certificateData.auditplace=certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].auditPlace : certificateData.auditplace?certificateData.auditplace:'(Location)';
					var issueDate=certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].dmlcIssueDate : certificateData.certificateDetails[0]? certificateData.certificateDetails[0].dmlcIssueDate : 'N.A';
					var finalIssuedDate='(Date)';
					if(issueDate && issueDate!='N.A'){
						var issuedDayDmlc = issueDate.split('-');
						finalIssuedDate=issuedDayDmlc[0]+" "+moment().month(issuedDayDmlc[1]).format("MMMM")+" "+issuedDayDmlc[2];
					}
					
					var issueDate= certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].completionDate : certificateData.currentCertiObj.completionDate;
					var finalIssuedDateAudit='(Date)';
					
					if(issueDate && issueDate!='N.A'){
						var issuedDayAudit = issueDate.split('-');
						finalIssuedDateAudit=issuedDayAudit[0]+" "+moment().month(issuedDayAudit[1]).format("MMMM")+" "+issuedDayAudit[2];
					}
					else{
						finalIssuedDateAudit='(Date)'
						
					}
				 
				 var mlcValidity = 'This Certificate is valid until '
						+ expiryDate.replace(/^0+/, '')
						+ ', subject to inspections in accordance with Standards A5.1.3 and A5.1.4 of the Convention. ';
					
				var mlcValidity1 ='This Certificate is valid only when the Declaration of Maritime Labour Compliance issued at '+dmlcIssuePlace + ' on '+ finalIssuedDate+' is attached.';
				
				var mlcComplition='Completion date of the inspection on which this Certificate is based: '+finalIssuedDateAudit
				
				
				  
				 var issuedDay = dateSuffix(Number(certificateData.certissuedate
							.split(' ')[0]));
				    
				    var issuedDay1=issuedDay?issuedDay:'(Day)';
					
					var issuedMonth = certificateData.certissuedate.split(' ')[1];
					
					var issuedMonth1= issuedMonth?issuedMonth:'(Month';

					var issuedYear = certificateData.certissuedate.split(' ')[2];
					
					var issuedYear1=issuedYear?issuedYear:'Year)';
				
				
				
				var  certificateAuthority = 'Issued by the authority of the Republic of the Marshall Islands Maritime Administrator at \n'
						+ place
						+ ' this '
						+ issuedDay1
						+ ' day of ' + issuedMonth1 +', '+ issuedYear1 + '.';
				
				var intialDescription0="For ships covered by the tonnage measurement interim scheme adopted by the International Maritime Organization, the gross tonnage is that which is "; 
				var intialDescription1 = "included in the REMARKS column of the International Tonnage Certificate (1969).  See Article II(1)(c) of the Convention. ";
				
				var intialDescription2="  Shipowner means the owner of the ship or another organization or person, such as the manager, agent or bareboat charterer, who has assumed the ";
				var intialDescription5="responsibility for the operation of the ship from the owner and who, on assuming such responsibility, has agreed to take over the duties and responsibilities imposed on shipowners in accordance with this Convention, regardless of whether any other organizations or persons fulfil certain of the duties or responsibilities on behalf of the shipowner. See Article II(l)(j) of the Convention.";
				
				var intialDescription3="  See Standard A5.1.3, paragraph 10.";
				
				
				
				console.log(certificateData)
				var intermediateCross = false;
				var additionalCross1 = false;
				var additionalCross2 = false;
				var additionalCross3 = false;
				var withoutcross = true;
				
				
				intermediateCross =(certificateData.intermediateReissue[0]) ? certificateData.intermediateReissue[0].interReissue:false;
				additionalCross1=(certificateData.additionalReissue1[0]) ? certificateData.additionalReissue1[0].addReissue : false;
				additionalCross2=(certificateData.additionalReissue2[0]) ? certificateData.additionalReissue2[0].addReissue : false;
				additionalCross3=(certificateData.additionalReissue3[0]) ? certificateData.additionalReissue3[0].addReissue : false;
				
				
				docDef = {
						ownerPassword : '123456',
						permissions : {
							printing : 'highResolution',
							modifying : false,
							copying : false,
							annotating : false,
							fillingForms : false,
							contentAccessibility : false,
							documentAssembly : false
						},
						 
						defaultStyle: {
						    font: 'Times'
						},pageSize: 'Letter',
						  
						
						footer : {
							text : footerNote,
							alignment : 'right',
							margin : [ 50,-5],
							fontSize : 10
						},

						content : [],
						// pageMargins: [5, 5, 5, 5],
						background : function(currentPage, pageSize) {
							return {
								image : sourceToDataURL('watermark'),
								width : 300,
								absolutePosition : {
									x : 150,
									y : 260
								},
								opacity : 0.7
							}
						},
						styles : {
							rightme : {
								alignment : 'center',
								margin : [ 0, 10 ]
							},
							header : {
								fontSize : 16,
								bold : true
							}
						}
					};
				docDef.content.push({
					columns : [ {
						image : '',
						width : 80,
						height : 80,
						margin:[10,15,0,0]
					},{
						width : 350,
						margin:[0,10,0,0],
						text : [ {
							text : 'Republic of the Marshall Islands\n',
							fontSize : 23,
							bold : true,
							color : '#525252',style : 'rightme'
						}, {
							text : 'Maritime Administrator\n',
							fontSize : 14,
							bold : true,
							color : '#666666',style : 'rightme'
						}, {
							text : tempcertificateHead+'\n',
							fontSize : 17,
							bold : true,
							color : '#666666',style : 'rightme'
						},
						{
							text : certificateData.HeadSubTitle+'\n\n',
							fontSize : 9,
							color : '#696969',
							alignment : 'center'
						},
						{
							text : 'Issued under the provisions of Article V and Title 5 of the\n  Maritime Labour Convention, 2006 \n(referred to below as the "Convention")'+'\n\n',
							fontSize : 9,
							color : 'black',
							alignment : 'center',
						},
						{
							text : 'Under the authority of the Government of the Republic of the Marshall Islands\n\n',
							fontSize : 9,
							color : 'black',
							alignment : 'center'
						}]
						
					}, {
						columns : [ [ {
							text : 'Certificate Number',
							fontSize : 10,
							margin : [ 3, 5,0,0 ] //changed by sudharsan for Jira-ID = 5543
						}, {
							table : {
								widths: [80],
								body : [ [ voluntaryCert?certificateData.certificateNo.replace("J", "JV"):certificateData.certificateNo ] ]
							},
							margin : [ -3,2,0,0 ],fontSize:8
						},{
							qr : certificateData.qrCodeUrl,
							fit : 100,
							margin : [ 1, 10,0,0 ]
							/*image:certificateData.QrC,
							width : 60,
							height : 60,
							margin : [ 12, 10,0,0 ]*/
						} ] ],
						width : 'auto'
					} ]
				});
				
				docDef.content[0].columns[0].image = sourceToDataURL('logo');
				
				docDef.content
				.push({
					text : [
							]
				});
				
				docDef.content.push({
					text : 'Particulars of the Ship:',
					bold : true,
					fontSize : 10,
					margin : [ 20, 5,certificateData.companyaddress.length>150?0:20,certificateData.companyaddress.length>150?0:10] //changed by sudharsan for Jira-ID = 5543
				});
				docDef.content.push([{
					
					margin: [20, 0, 0, 0],
					table: {
						widths: [155,315],
				    	heights: [0,0],
					body: [
					    [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Name of Ship:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselName, fontSize: 10,bold:false}]
							    
							    
							}
						], [
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.officialNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Port of Registry:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.portofreg, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Date of Registry:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.dateOfReg, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Gross Tonnage :", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.grt, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "IMO No.:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.vesselImoNo, fontSize: 10,bold:false}]
							    
							    
							}
						],[
							{ 
								border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: "Type of Ship:", fontSize: 10,bold:false}]
							},{
							    border: [true, true,true, true],
					 			fillColor: '',
								/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
								text: [{text: certificateData.shiptype, fontSize: 10,bold:false}]
							    
							    
							}
						] ]},
						layout: 'noBorders'
				}

				])
				

				docDef.content.push({
					text : "Name and Address of the Shipowner  :",
					bold : true,
					fontSize : 10,
					margin : [ 20, 5,0,0 ]
				});
				
				
				
				docDef.content.push([{
	
				margin: [20, 0, 0, 0],
				table: {
					widths: [155,300],
			    	heights: [certificateData.companyaddress.length>150?0:25,certificateData.companyaddress.length>150?0:45],  //Modified by sudharsan for Jira-ID = 5543
						body: [
						    [
								{ 
						border: [true, true,true, true],
			 			fillColor: '',
						/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
						text: [{text :'Shipowner Name:',fontSize: 10}]
					},{
					    border: [true, true,true, true],
			 			fillColor: '',
						/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
						text: [{text: certificateData.companyname, fontSize: 10,bold:false}]
					    
					    
					}
				], [
			{ 
				border: [true, true,true, true],
	 			fillColor: '',
				/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
				text: [{text: "Shipowner Address:", fontSize: 10,bold:false}]
			},{
			    border: [true, true,true, true],
	 			fillColor: '',
				/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
				text: [{text: certificateData.companyaddress, fontSize: 10,bold:false}]
			    
			    
			}
		] ]},
		layout: 'noBorders'
}

])
				
				docDef.content.push({ // to draw a horizontal line
					canvas : [ {
						type : 'line',
						x1 : 15,
						y1 : 5,
						x2 : 520,
						y2 : 5,
						lineWidth : 2
					} ]
				});
				
				
				docDef.content.push({
					text : [mlcIntialContent],
					margin : [ 20, 5,20, 0],
					bold:true,
					fontSize : 10
				});
				
				docDef.content.push({
						fontSize: 9,
						ol: [
							 {text: mlcContent1, fontSize: 10,margin :[20,3,20,0],alignment:'justify'},
							 {text: mlcContent2, fontSize: 10,margin :[20,5,20,0],alignment:'justify'}
						
						]
			
				});
				
				docDef.content.push({
					text : [ mlcValidity + '\n' ],
					margin : [ 20, 5,20,0 ],
					fontSize : 10,alignment:'justify'
				});
				

				docDef.content.push({
					text : [ mlcValidity1 + '\n' ],
					margin : [ 20,4,20,0 ],
					fontSize : 10,alignment:'justify'
				});
				

				docDef.content.push({
					text : [ '' + mlcComplition + '\n' ],
					margin : [ 20, 4,20,5 ],
					fontSize : 10,alignment:'justify'
				});
				
				
				docDef.content.push({
					text : [ '' + certificateAuthority + '\n' ],
					margin : [ 155, 0,0,0 ],
					fontSize : 10
				});
				
				docDef.content.push({
					columns : [ {
						image : '',
						width : 70,
						height : 70,
						margin:[45,-20,0,0]
					}, {
						width : '*',
						text : []
					}, {
						columns : [ [ {
							text : [ '\n\n' ]
						}
						, {
							image : '',
							width : 150,
							height: 30,
							margin:[20,-5,60,0]
						} 
						] ],
						//width : 'auto'
					} ]
				})
			//initial section
				 docDef.content[13].columns[0].image = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].sealImage : sourceToDataURL('transparent');
				 docDef.content[13].columns[2].columns[0][1].image = certificateData.currInitialPage[0] && certificateData.currInitialPage[0].signToPrint == 1 ? "data:image/png;base64,"
							+ certificateData.currInitialPage[0].issuerSign : sourceToDataURL('transparent');
				
				
				docDef.content.push({
					columns : [ {
						width : '*',
						text : certificateData.sealcontent + '\n',
						fontSize : 9,margin:[20,0,0,0]
						
					}, {
						canvas : [ {
							type : 'line',
							x1 : 0,
							y1 : 5,
							x2 : 250,
							y2 : 5,
							lineWidth : 1
						} ]
					} ]
				})
				console.log(docDef.content)
					docDef.content.push({
					columns : [ {
						width : '*',
						text : [ '\n', {
							text : "Unique Tracking Number: ",
							fontSize : 10
						}, {
							text : certificateData.utn,
							bold : true,
							fontSize : 10
						} ],margin:[20,1,0,0]
					}, {
						width : '*',
						text : [ {
							text : '',
							alignment : 'center',
							fontSize : 10,
							italics:false
						}, {
							text : '',
							alignment : 'center',
							fontSize : 10,italics:false
						} ],margin:[0,-5,0,0]
					} ]
				})
				
			
				//initial section name and title
		
				docDef.content[15].columns[1].text[0].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameFull : '(Name) \n';
				docDef.content[15].columns[1].text[0].italics = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].nameItalics : true
				docDef.content[15].columns[1].text[1].text = certificateData.currInitialPage[0] ? certificateData.currInitialPage[0].title : '(Appointment)';
				docDef.content[15].columns[1].text[1].italics = certificateData.currInitialPage[0] ? false : true;

				
					docDef.content.push({
					canvas : [ {
						type : 'line',
						x1 : 20,
						y1 : 0,
						x2 : 195,
						y2 : 0,
						lineWidth : 1
					} ]
				})
				var writeRotatedText = function(text) {
				  var ctx, canvas = document.createElement('canvas');
				  // I am using predefined dimensions so either make this part of the arguments or change at will 
				  canvas.width = 36;
				  canvas.height = 270;
				  ctx = canvas.getContext('2d');
				  var x = new Array(text);
			       for(var i = 0; i < x.length; i++){
			            var size = ctx.measureText(x[i]);
			    ctx.save();
			    var tx = (i*50+20) + (size.width/2);
			    var ty = (50);
			    ctx.translate(tx,ty);
			    ctx.rotate(Math.PI / -5);
			    ctx.translate(-tx,-ty);
			            ctx.fillText(x[i],i*50+20,50);
				  return canvas.toDataURL();
			       }
				};
			
				docDef.content.push({
					stack: [
					     {text: intialDescription0+'\n', fontSize:8,alignment:'justify',margin:[25,7,22,0]},
						 {text: intialDescription1+'\n', fontSize:8,alignment:'justify',margin:[20,0,22,0]},
						 {text: intialDescription2+'\n', fontSize: 8,alignment:'justify',margin:[25,4,20,0]},
						 {text: intialDescription5, fontSize: 8,alignment:'justify',margin:[20,0,20,0]},
						 //{text:'d1',absolutePosition:(certificateData.vesselName.length < 54)?{x:120,y:275} : {x:120,y:285},fontSize:8}, //Commented by sudharsan for Jira-ID = 5543
						 //{text:'d2',absolutePosition:(certificateData.vesselName.length < 54)?{x:216,y:324} : {x:216,y:334},fontSize:8}, //Commented by sudharsan for Jira-ID = 5543
						 {text:'1',margin:[20,-59,0,0],fontSize:7},
						 {text:'2',margin:[20,15,0,0],fontSize:7}
					]
		
			},
			{
				stack:[
				       {
				    	   canvas:[
							        {
							        	type: 'rect',
				                        x: 5, y: (certificateData.vesselName.length < 54 )? 51 : 41,
				                        w: 525,
				                        h: -727,
				                        fillOpacity: 0.5,
				                        lineWidth:2
							        }
							    ]
				       },
				       {
				    	   canvas:[
							        {
							        	type: 'rect',
				                        x: 0, y: (certificateData.vesselName.length < 54 )? 56 : 46,
				                        w: 535,
				                        h: -737,
				                        fillOpacity: 0.5
							        }
							     ]
				       },
				       voidStatus==true?{//ism initial second page
				    	   canvas : [ {
						    		   type : 'line',
						    		   	x1 : 0,
										y1 : -40,
										x2 : 525,
										y2 : -740,
										lineColor:'red',
										lineWidth : 2
									} 
				    	   ],
				    	   absolutePosition:{x:45,y:798}  
				       }:{}
				       ]
				
            });
				var ismendorse='ENDORSEMENT FOR MANDATORY INTERMEDIATE INSPECTION AND, IF REQUIRED, ANY';
				var ismendorse1='ADDITIONAL INSPECTION';
				docDef.content.push({
					columns : [{
						columns : [ [ {
							text : 'Certificate Number',
							fontSize : 10,
							pageBreak:'before',
							margin : [ 435, 0,0,0 ]
						}, {
							table : {
								widths: [80],
								body : [ [ voluntaryCert?certificateData.certificateNo.replace("J", "JV"):certificateData.certificateNo ] ]
							},
							margin : [ 427,2,0,0 ],fontSize:8
						} ] ],
						width : 'auto',
					} ]
				},{
					
					stack:[
					       {
					    	   canvas:[
								        {
								        	type: 'rect',
					                        x: 5, y: 693,
					                        w: 525,
					                        h: -727,
					                        fillOpacity: 0.5,
					                        lineWidth:2
								        }
								    ]
					       },
					       {
					    	   canvas:[
								        {
								        	type: 'rect',
					                        x: 0, y: 698,
					                        w: 535,
					                        h: -737,
					                        fillOpacity: 0.5
								        }
								     ]
					       }
					       ]
			});
				docDef.content.push({
					text : ismendorse+'\n',
					fontSize : 10,
					bold:true,
					alignment:'center',
					margin : [ 20, 5,0,0 ]
				});
				docDef.content.push({
					text : ismendorse1+'\n',
					fontSize : 10,
					bold:true,
					alignment:'center',
					margin : [ 20, 0,0,5 ]
				});
				
				var endorseContent='THIS IS TO CERTIFY THAT the ship was inspected in accordance with Standards A5.1.3 and A5.1.4 of the Convention and that the seafarers’ working and living conditions specified in Appendix A5-I of the Convention were found to correspond to the Republic of the Marshall Islands’ national requirements implementing the Convention. ';
				
				docDef.content.push({
					text : endorseContent+'\n\n',
					fontSize : 10,
					margin : [ 20, 0,20,10 ],alignment:'justify'
				});
				
				// Intermediate Starts here...

				// ISM Intermediate Starts here...

				var IntermediatesealContent = '';

				IntermediatesealContent = certificateData.intermediate[0] ? certificateData.intermediate[0].sealImage : sourceToDataURL('transparent');
				docDef.content.push({
					alignment: 'justify',
					columns:[
					        {
					        	width: 215,
					        	stack:[
								        {
								            text: [
			            					    {text:"Intermediate Inspection:\n"},
			            					    {text:'(to be completed between the'+'\n'+ ' second and third anniversary date)',italics:true}
			            					    ],fontSize : 10,margin : [ 20,0,0, 0 ]
								        },{
								             image:IntermediatesealContent,
								             width: 70, 
								 		     height: 70,
								 		    margin : [ 45,0,0, 0 ]
								        }
								    ]
					        },
					        {
								width: '*',
								table: {
								body: [
									[
										{
											stack: [
												{
													columns:[
													        {
													            width:40,
													            text:"Signed:",fontSize:10
													        },{
													            image:(certificateData.intermediate[0] &&  certificateData.intermediate[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.intermediate[0].issuerSign: sourceToDataURL('transparent'),
													            width: 150, 
													  		    height: 20,
													            margin:[45,-15,0,0]
													        }
													    ]
												},
												{
													columns:[
													        {   
													        },{
													        	canvas : [ {
																	type : 'line',
																	x1 : -125,
																	y1 : 10,
																	x2 : 125,
																	y2 : 10,
																	lineWidth : 1
																} ],
				                                				 margin:[20,-11,0,0]
				                                			}
													    ]
												},{
													text:[
													      {text:(certificateData.intermediate[0] && certificateData.intermediate[0].nameToPrint === 1)? certificateData.intermediate[0].issuerName+'\n':'(Name)\n', italics:(certificateData.intermediate[0] &&  certificateData.intermediate[0].nameToPrint === 1 && certificateData.intermediate[0].issuerName)? false:true},
													      {text:(certificateData.intermediate[0] && certificateData.intermediate[0].title)? certificateData.intermediate[0].title:'(Appointment)', italics:(certificateData.intermediate[0] &&  certificateData.intermediate[0].title)? false:true}
													      ],
													fontSize:10,margin:[20,0,0,0],
													alignment:'center'   
												},
												{
													columns:[
													        {
													            width:40,
													            text:"Place:",
													            fontSize:10,
													            margin:[0,13,0,0]
													        },{
													        	text :(certificateData.intermediate[0] && certificateData.intermediate[0].auditPlace)? certificateData.intermediate[0].auditPlace:'   ',
													        	fontSize : 10,
													        	margin:[5,10,0,0]
													        }
													    ]
												},
												{
													columns:[
													        {   
													        },{
													        	canvas : [ {
																	type : 'line',
																	x1 : -125,
																	y1 : 10,
																	x2 : 125,
																	y2 : 10,
																	lineWidth : 1
																} ],
				                                				 margin:[20,-11,0,0]
				                                			}
													    ]
												},
												{
													columns:[
													        {
													            width:40,
													            text:"Date:",
													            fontSize:10,
													            margin:[0,30,0,0]
													        },{
													        	text :(certificateData.intermediate[0] && certificateData.intermediate[0].issuerSignDate)? certificateData.intermediate[0].issuerSignDate.replace(/^0+/, ''):'    ',
													        	fontSize : 10,
													        	margin:[5,25,0,0]
													        }
													    ]
												},
												{
													columns:[
													        {   
													        },{
													        	canvas : [ {
																	type : 'line',
																	x1 : -125,
																	y1 : 10,
																	x2 : 125,
																	y2 : 10,
																	lineWidth : 1
																} ],
				                                				 margin:[20,-11,0,0]
				                                			}
													    ]
												}
											]
										}
									]
								]
							},layout: 'noBorders'}
					],margin:[0,-5,0,0]
				})
				docDef.content.push({
					text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
					fontSize : 10,
					italics:true,
					margin:[20,7,0,0]
				})
				if((intermediateCross)){
					docDef.content.push({
						columns : [ {
							width : '*',
							text :'VERIFICATION PREVIOUSLY CARRIED OUT',
							fontSize : 15,
							absolutePosition: {x:175, y:185}
						}]});
					docDef.content.push({
						canvas : [ {
							type : 'line',
							x1 : 20,
							y1 : -15,
							x2 : 510,
							y2 : -148,
							lineWidth : 1
						} ]
					});
				}
				
				  // MLC Additional Starts here... (1)
				docDef.content.push({
					text :'ADDITIONAL ENDORSEMENTS (IF REQUIRED)',
					bold : true,
					fontSize : 10,
					alignment:'center',
					margin : [ 20, 0,0,0 ]
				});
             var additionalEndorseContent='THIS IS TO CERTIFY THAT the ship was the subject of an additional inspection for the purpose of verifying that the ship continued to be in compliance with the Republic of the Marshall Islands’ national requirements implementing the Convention, as required by Standard A3.1, paragraph 3, of the Convention (re-registration or substantial alteration of accommodation) or for other reasons. ';
          docDef.content.push({
         text : additionalEndorseContent+'\n\n',	
         fontSize : 10,
         alignment:'justify',
        margin : [ 20,5,20,10 ]
        });
     

          if(certificateData.additional1[0] || certificateData.additional1.length==0 ){
        	  var AdditionalsealContent = '';
        		AdditionalsealContent = certificateData.additional1[0] ? certificateData.additional1[0].sealImage : sourceToDataURL('transparent');
        		
					docDef.content.push({
						alignment: 'justify',
						columns:[
						        {
						        	width: 215,
						        	stack:[
									        {
									            text: [
				            					    {text:"Additional Inspection:\n(if required)"}
				            					    ],fontSize : 10,margin : [ 20,0,0, 0 ]
									        },{
									             image:AdditionalsealContent,
									             width: 70, 
									 		     height: 70,
									 		    margin : [ 45,8,0, 0 ]
									        }
									    ]
						        },
						        {
									width: '*',
									table: {
									body: [
										[
											{
												stack: [
													{
														columns:[
														        {
														            width:40,
														            text:"Signed:",fontSize:10
														        },{
														            image:(certificateData.additional1[0] && certificateData.additional1[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional1[0].issuerSign: sourceToDataURL('transparent'),
														            width: 150, 
														  		    height: 20,
														            margin:[45,-15,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													},{
														text:[
														      {text:(certificateData.additional1[0] && certificateData.additional1[0].nameToPrint === 1)? certificateData.additional1[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional1[0] &&  certificateData.additional1[0].nameToPrint === 1 && certificateData.additional1[0].issuerName)? false:true},
														      {text:(certificateData.additional1[0] && certificateData.additional1[0].title)? certificateData.additional1[0].title:'(Appointment)',italics:(certificateData.additional1[0] && certificateData.additional1[0].title)? false : true}
														      ],
														fontSize:10,margin:[20,0,0,0],
														alignment:'center'   
													},
													{
														columns:[
														        {
														            width:40,
														            text:"Place:",
														            fontSize:10,
														            margin:[0,13,0,0]
														        },{
														        	text :(certificateData.additional1[0] && certificateData.additional1[0].auditPlace)? certificateData.additional1[0].auditPlace:'     ',
														        	fontSize : 10,
														        	margin:[5,10,0,0]
														        }
														    ],margin:[0,-3,0,0]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													},
													{
														columns:[
														        {
														            width:40,
														            text:"Date:",
														            fontSize:10,
														            margin:[0,30,0,0]
														        },{
														        	text :(certificateData.additional1[0] && certificateData.additional1[0].issuerSignDate)? certificateData.additional1[0].issuerSignDate.replace(/^0+/, ''):'   ',
														        	fontSize : 10,
														        	margin:[5,25,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													}
												]
											}
										]
									]
								},layout: 'noBorders'}
						]
					})
					docDef.content.push({
						text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
						fontSize : 10,
						italics:true,
						margin:[20,8,0,0]
					})
					if((additionalCross1)){
						docDef.content.push({
							columns : [ {
								width : '*',
								text :'VERIFICATION PREVIOUSLY CARRIED OUT',
								fontSize : 15,
								absolutePosition: {x:175, y:394}
							}]});
						docDef.content.push({
							canvas : [ {
								type : 'line',
								x1 : 20,
								y1 : -15,
								x2 : 510,
								y2 : -148,
								lineWidth : 1
							} ]
						});
					}
				}
       // MLC Additional Starts here... (2)

          if(certificateData.additional2[0] || certificateData.additional2.length==0){
        	 
          	var AdditionalsealContent1 = '';
          	AdditionalsealContent1 = certificateData.additional2[0] ? certificateData.additional2[0].sealImage : sourceToDataURL('transparent');
          	
					docDef.content.push({
						alignment: 'justify',
						columns:[
						        {
						        	width: 215,
						        	stack:[
									        {
									            text: [
				            					    {text:"Additional Inspection:\n(if required)"}
				            					    ],fontSize : 10,margin : [ 20,0,0, 0 ]
									        },{
									             image:AdditionalsealContent1,
									             width: 70, 
									 		     height: 70,
									 		    margin : [ 45,8,0, 0 ]
									        }
									    ]
						        },
						        {
									width: '*',
									table: {
									body: [
										[
											{
												stack: [
													{
														columns:[
														        {
														            width:40,
														            text:"Signed:",fontSize:10
														        },{
														        	image:(certificateData.additional2[0] && certificateData.additional2[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional2[0].issuerSign: sourceToDataURL('transparent'),
														            width: 150, 
														  		    height: 20,
														            margin:[45,-15,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													},{
														text:[
														      {text:(certificateData.additional2[0] && certificateData.additional2[0].nameToPrint === 1)? certificateData.additional2[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional2[0] &&  certificateData.additional2[0].nameToPrint === 1 && certificateData.additional2[0].issuerName)? false:true},
														      {text:(certificateData.additional2[0] && certificateData.additional2[0].title)? certificateData.additional2[0].title:'(Appointment)',italics:(certificateData.additional2[0] && certificateData.additional2[0].title)? false:true}
														      ],
														fontSize:10,margin:[20,0,0,0],
														alignment:'center'   
													},
													{
														columns:[
														        {
														            width:40,
														            text:"Place:",
														            fontSize:10,
														            margin:[0,13,0,0]
														        },{
														        	text :(certificateData.additional2[0] && certificateData.additional2[0].auditPlace)? certificateData.additional2[0].auditPlace:'     ',
														        	fontSize : 10,
														        	margin:[5,10,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													},
													{
														columns:[
														        {
														            width:40,
														            text:"Date:",
														            fontSize:10,
														            margin:[0,30,0,0]
														        },{
														        	text :(certificateData.additional2[0] && certificateData.additional2[0].issuerSignDate)? certificateData.additional2[0].issuerSignDate.replace(/^0+/, ''):'   ',
														        	fontSize : 10,
														        	margin:[5,25,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													}
												]
											}
										]
									]
								},layout: 'noBorders'}
						]
					})
					docDef.content.push({
						text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
						fontSize : 10,
						italics:true,
						margin:[20,8,0,0]
					})
					console.log(additionalCross2)
					if((additionalCross2)){
						docDef.content.push({
							columns : [ {
								width : '*',
								text :'VERIFICATION PREVIOUSLY CARRIED OUT',
								fontSize : 15,
								absolutePosition: {x:175, y:530}
							}]});
						docDef.content.push({
							canvas : [ {
								type : 'line',
								x1 : 20,
								y1 : -15,
								x2 : 510,
								y2 : -148,
								lineWidth : 1
							} ]
						});
					}
			}


       // MLC Additional Starts here... (3)

          if(certificateData.additional3[0] || certificateData.additional3.length==0){
        	  
          	var AdditionalsealContent2 = '';
        	  AdditionalsealContent2 = certificateData.additional3[0] ? certificateData.additional3[0].sealImage : sourceToDataURL('transparent');
					docDef.content.push({
						alignment: 'justify',
						columns:[
						        {
						        	width: 215,
						        	stack:[
									        {
									            text: [
				            					    {text:"Additional Inspection:\n(if required)"}
				            					    ],fontSize : 10,margin : [ 20,0,0, 0 ]
									        },{
									             image:AdditionalsealContent2,
									             width: 70, 
									 		     height: 70,
									 		    margin : [ 45,8,0, 0 ]
									        }
									    ]
						        },
						        {
									width: '*',
									table: {
									body: [
										[
											{
												stack: [
													{
														columns:[
														        {
														            width:40,
														            text:"Signed:",fontSize:10
														        },{
														        	image:(certificateData.additional3[0] && certificateData.additional3[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.additional3[0].issuerSign: sourceToDataURL('transparent'),
														            width: 150, 
														  		    height: 20,
														            margin:[45,-15,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													},{
														text:[
														      {text:(certificateData.additional3[0] && certificateData.additional3[0].nameToPrint === 1)? certificateData.additional3[0].issuerName+'\n':'(Name)\n', italics:(certificateData.additional3[0] &&  certificateData.additional3[0].nameToPrint === 1 && certificateData.additional3[0].issuerName)? false:true},
														      {text:(certificateData.additional3[0] && certificateData.additional3[0].title)? certificateData.additional3[0].title:'(Appointment)',italics:(certificateData.additional3[0] && certificateData.additional3[0].title)? false:true}
														      ],
														fontSize:10,margin:[20,0,0,0],
														alignment:'center'   
													},
													{
														columns:[
														        {
														            width:40,
														            text:"Place:",
														            fontSize:10,
														            margin:[0,13,0,0]
														        },{
														        	text :(certificateData.additional3[0] && certificateData.additional3[0].auditPlace)? certificateData.additional3[0].auditPlace:'     ',
														        	fontSize : 10,
														        	margin:[5,10,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													},
													{
														columns:[
														        {
														            width:40,
														            text:"Date:",
														            fontSize:10,
														            margin:[0,30,0,0]
														        },{
														        	text :(certificateData.additional3[0] && certificateData.additional3[0].issuerSignDate)? certificateData.additional3[0].issuerSignDate.replace(/^0+/, ''):'   ',
														        	fontSize : 10,
														        	margin:[5,25,0,0]
														        }
														    ]
													},
													{
														columns:[
														        {   
														        },{
														        	canvas : [ {
																		type : 'line',
																		x1 : -125,
																		y1 : 10,
																		x2 : 125,
																		y2 : 10,
																		lineWidth : 1
																	} ],
					                                				 margin:[20,-11,0,0]
					                                			}
														    ]
													}
												]
											},
										       voidStatus==true?{//ism initial second page
										    	   canvas : [ {
												    		   type : 'line',
												    		   	x1 : 0,
																y1 : -40,
																x2 : 525,
																y2 : -765,
																lineColor:'red',
																lineWidth : 2
															} 
										    	   ],
										    	   absolutePosition:{x:45,y:798}  
										       }:{}
										]
									]
								},layout: 'noBorders'}
						]
					})
					if((additionalCross3)){
						docDef.content.push({
							columns : [ {
								width : '*',
								text :'VERIFICATION PREVIOUSLY CARRIED OUT',
								fontSize : 15,
								absolutePosition: {x:175, y:663}
							}]});
						docDef.content.push({
							canvas : [ {
								type : 'line',
								x1 : 40,
								y1 : -15,
								x2 : 510,
								y2 : -108,
								lineWidth : 1
							} ]
						});
					}
					docDef.content.push({
						text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
						fontSize : 10,
						italics:true,
						margin:[20,8,0,0]
					})
					/*docDef.content.push(voidStatus==true?{//ism initial second page
				canvas : [ {
						type : 'line',
		    		   	x1 : 0,
						y1 : -40,
						x2 : 525,
						y2 : -740,
						color:'red',
						lineWidth : 2
					} 
		   ],
		   absolutePosition:{x:45,y:800} 
		       }:{})*/
					
				}
			//3rd page start
			if(certificateData.auditSubTypeId!=1001){
			
			docDef.content.push({
				columns : [{
					columns : [ [ {
						text : 'Certificate Number',
						fontSize : 10,
						
						margin : [ 435, 0,0,0 ]
					}, {
						table : {
							widths: [80],
							body : [ [ voluntaryCert?certificateData.certificateNo.replace("J", "JV"):certificateData.certificateNo ] ]
						},
						margin : [ 427,2,0,0 ],fontSize:8
					} ] ],
					width : 'auto',
				} ]
			},{
				
				stack:[
				       {
				    	   canvas:[
							        {
							        	type: 'rect',
				                        x: 5, y: 693,
				                        w: 525,
				                        h: -727,
				                        fillOpacity: 0.5,
				                        lineWidth:2
							        }
							    ]
				       },
				       {
				    	   canvas:[
							        {
							        	type: 'rect',
				                        x: 0, y: 698,
				                        w: 535,
				                        h: -737,
				                        fillOpacity: 0.5
							        }
							     ]
				       },
				       {
				    	   
				       }]});
			
			
			var ismendorsecontent2='\nEXTENSION AFTER RENEWAL INSPECTION (IF REQUIRED)';
			
			docDef.content.push({
				text :ismendorsecontent2+'\n\n',	
				fontSize : 10,
				bold:true,alignment:'center',
				margin : [ 10, 0]
			});	
			var extensionDate =(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].extendedExpireDate)?moment(certificateData.renewalEndorse2[0].extendedExpireDate).format('D MMMM YYYY') :  '[EXTENSION DATE]' 
			var renewalDate = (certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].endorsedDate)?moment(certificateData.renewalEndorse2[0].endorsedDate).format('D MMMM YYYY') : '[RENEWAL DATE]'
			var ismendorsecontent3='THIS IS TO CERTIFY THAT, following a renewal inspection, the ship was found to continue to be in compliance with national laws'
				+' and regulations or other measures implementing the requirements of this Convention, and that the present certificate is hereby'
				+' extended, in accordance with paragraph 4 of Standard A5.1.3, until '+extensionDate+' (not more than five months after the'
				+' expiry date of the existing certificate) to allow for the new certificate to be issued to and made available on board the ship.'
				+'\n\nCompletion date of the renewal inspection on which this extension is based was '; /*[RENEWAL DATE].*/
			var ismendorsecontent4 = renewalDate.replace(/^0+/, '');
			docDef.content.push({
				text:[
			            {text:ismendorsecontent3},
			            {text: ismendorsecontent4 + '.', /*italics:(ismendorsecontent4 == '[DATE]')?true:false*/}
			            ],	
				fontSize : 10,
				alignment:'justify',
				margin : [ 20, 10,20,25]
			});
			
			// Renewal Endorsement start
			
			var renewalsealContent = '';

			renewalsealContent = certificateData.renewalEndorse2[0] ? certificateData.renewalEndorse2[0].sealImage : sourceToDataURL('transparent');
			//{text:"Endorsement:"},
			
			docDef.content.push({
				alignment: 'justify',
				columns:[
				        {
				        	width: 215,
				        	stack:[
							        {
							            text: [
		            					    
		            					    {text:""},
		            					    ],fontSize : 10,margin : [ 20,0,0, 0 ]
							        },{
							             image:renewalsealContent,
							             width: 70, 
							 		     height: 70,
							 		    margin : [ 45,50,0, 0 ]
							        }
							    ]
				        },
				        {
							width: '*',
							table: {
							body: [
								[
									{
										stack: [
											{
												columns:[
												        {
												            width:40,
												            text:"Signed:",fontSize:10
												        },{
												            image:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].signToPrint === 1)? 'data:image/jpeg;base64,'+certificateData.renewalEndorse2[0].issuerSign: sourceToDataURL('transparent'),
														            width: 150, 
														  		    height: 20,
														            margin:[45,-15,0,0]
														        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},{
												text:[
												       {text:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].nameToPrint === 1)? certificateData.renewalEndorse2[0].issuerName+'\n':'(Name)\n', italics:(certificateData.renewalEndorse2[0] &&  certificateData.renewalEndorse2[0].nameToPrint === 1 && certificateData.renewalEndorse2[0].issuerName)? false:true},
												       {text:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title)? certificateData.renewalEndorse2[0].title:'(Appointment)',italics:(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title)? false:true}
												      ],
												fontSize:10,margin:[20,0,0,0],
												alignment:'center'   
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Place:",
												            fontSize:10,
												            margin:[0,13,0,0]
												        },{
												        	text :( certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].auditPlace)? certificateData.renewalEndorse2[0].auditPlace:'   ',
												        	fontSize : 10,
												        	margin:[5,10,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											},
											{
												columns:[
												        {
												            width:40,
												            text:"Date:",
												            fontSize:10,
												            margin:[0,30,0,0]
												        },{
												        	text :(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].issuerSignDate)? certificateData.renewalEndorse2[0].issuerSignDate.replace(/^0+/, ''):'    ',
												        	fontSize : 10,
												        	margin:[5,25,0,0]
												        }
												    ]
											},
											{
												columns:[
												        {   
												        },{
												        	canvas : [ {
																type : 'line',
																x1 : -125,
																y1 : 10,
																x2 : 125,
																y2 : 10,
																lineWidth : 1
															} ],
			                                				 margin:[20,-11,0,0]
			                                			}
												    ]
											}
										]
									}
								]
							]
						},layout: 'noBorders'}
				]
			})
			docDef.content.push({
				text :'(Seal or stamp of issuing authority, as appropriate)'+'\n\n',	
				fontSize : 10,
				italics:true,
				margin:[20,10,0,0]
			})
			}
			//renewal endorsement cross line of mlc
			docDef.content.push(voidStatus==true?{//ism initial second page
				canvas : [ {
						type : 'line',
		    		   	x1 : 0,
						y1 : -40,
						x2 : 525,
						y2 : -740,
						lineColor:'red',
						lineWidth : 2
					} 
		   ],
		   absolutePosition:{x:45,y:800} 
		       }:{})
			
			}
				return docDef;
			}
		
		function ihmPdfService(certificateData,certType){
		
		var footerNote,voidStatus;
		
		if(certType=='HK'){
			footerNote = 'MI-298C Rev. 12/19';
		}else if(certType=='EU'){
			footerNote = 'MI-298D Rev. 12/19';
		}else{
			footerNote = 'MI-298F Rev. 12/19';
		}
		 
		if((certificateData.AuditStatusId == AppConstant.VOID_AUDIT_STATUS && certificateData.res.activeStatus === 0 )|| certificateData.activeStatus === 0 || certificateData.auditSummarId === 1005 || certificateData.crossLineStatus === "extent-inactive" || certificateData.crossLineStatus == "inactive"){
			voidStatus = true;
			
		}
		if(certificateData.crossLineStatus == "extent-inactive" || certificateData.crossLineStatus == "inactive"){
			
			if(certificateData.currentCertiObj.certIssueId == 1002){
				console.log("extent-inactive");
				certificateData.extension.length = 0;
			}else if(certificateData.currentCertiObj.seqNo < (certificateData.extension[0] && certificateData.extension[0].seqNo)){
				console.log("t-inactive");
				certificateData.extension.length = 0;
			}else if(certificateData.currentCertiObj.seqNo < (certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].seqNo)){
				certificateData.renewalEndorse2.length = 0;
				
			}
		}
		var additionalCross1 = false;
		var additionalCross2 = false;
		var additionalCross3 = false;
		
		additionalCross1 = certificateData.additionalReissue1[0] ? certificateData.additionalReissue1[0].addReissue : false;
		additionalCross2 = certificateData.additionalReissue2[0] ? certificateData.additionalReissue2[0].addReissue : false;
		additionalCross3 = certificateData.additionalReissue3[0] ? certificateData.additionalReissue3[0].addReissue : false;
		console.log(additionalCross1);
		var docDef={
				ownerPassword : '123456',
				permissions : {
					printing : 'highResolution',
					modifying : false,
					copying : false,
					annotating : false,
					fillingForms : false,
					contentAccessibility : false,
					documentAssembly : false
				},
				 
				defaultStyle: {
				    font: 'Times'
				},
				pageSize: 'Letter',
				content:[],
			    background : function(currentPage, pageSize) {
					return {
						image : sourceToDataURL('watermark'),
						width : 300,
						absolutePosition : {
							x : 150,
							y : 260
						},
						opacity : 0.7
					}
				
			 }
		};
		//first page start
		
		//HEADER SECTION
		var headerSecHK =[{
	        columns:[
	        	{
					image : sourceToDataURL('logo'),
					width : 80,
					height : 80,
					margin:[10,15,0,0]
				},
	        {
					stack: [
						{ 
						   width:350,
				           margin:[20,10,0,0],
						   text:[{
							    text:'Republic of the Marshall Islands\n',
				                fontSize:23,
				                bold:true,
				                color : '#525252',style : 'rightme'
				               
						   },
						   {
				                text:'Maritime Administrator\n',
				                fontSize:14,
				                bold:true,
				                color : '#525252',style : 'rightme',
				                alignment:'center'
				            },
				            
						   ]},
	        			
						{
	        				margin:[20,10,0,0],
	        				text:[
	        					{
				                text:'Statement of Compliance for\n Inventory of Hazardous Materials\n',
				                fontSize:17,
				                bold:true,
					            color : '#525252',style : 'rightme',
				                alignment:'center',
				                margin:[0,10,0,0]
	        					}
	        				]
						},
						{
							margin:[20,10,0,0],
							text:[
							   {
					                text:'Issued under the provisions of the Hong Kong International Convention for the\nSafe and Environmentally Sound Recycling of Ships, 2009 (hereinafter referred \nto as the "Convention")',
					                fontSize :10,
									color : 'black',
									alignment : 'center', 
									
					            },
					            {
					                text:'\n\n',
					               
					            },
					            {
					                text:'(Note: This Statement of Compliance shall be supplemented by Part I of the\n Inventory of Hazardous Materials.)',
					                fontSize:10,
					                alignment : 'center', 
					                
					            },
					            {
					                text:'\n\n',
					                
					            },
					            {
					                text:'Issued under the authority of the\nGovernment of the Republic of the Marshall Islands',
					                fontSize:10,
					                alignment : 'center', 
					            }
								]
						}
					]	
				},
	        {
	            columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[5,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
								body : [[ {text:certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 0,2,12,0 ],fontSize:8
	                },
	                {
	                    qr:certificateData.res.qrCodeUrl,
	                    fit : 90,
						margin : [ 8,10,10,10 ]
	                },
	                
	                
	                
	            ]],
	            width : 'auto'
	        }
	        
	        ]
	     }]
		
		 var headerSecEU =[{
		        columns:[
		        	{
						image : sourceToDataURL('logo'),
						width : 80,
						height : 80,
						margin:[10,15,0,0]
					},
		        {
						stack: [
							{ 
							   width:350,
					           margin:[20,10,0,0],
							   text:[{
								    text:'Republic of the Marshall Islands\n',
					                fontSize:23,
					                bold:true,
					                color : '#525252',style : 'rightme'
					               
							   },
							   {
					                text:'Maritime Administrator\n',
					                fontSize:14,
					                bold:true,
					                color : '#525252',style : 'rightme',
					                alignment:'center'
					            },
					            
							   ]},
		        			
							{
		        				margin:[20,10,0,0],
		        				text:[
		        					{
					                text:'Statement of Compliance',
					                fontSize:17,
					                bold:true,
						            color : '#525252',style : 'rightme',
					                alignment:'center',
					                margin:[0,10,0,0]
		        					}
		        				]
							},
							{
								margin:[20,0,0,0],
								text:[
								   {
						                text:'with the requirements of Article 12 of the Regulation (EU)\n 1257/2013 on ship recycling\n',
						                fontSize :10,
										color : 'black',
										alignment : 'center', 
										
						            },
						            {
						            	text:'\n'
						            },
						           
						            {
						                text:'(Note: This Statement of Complaince shall be supplemented by Part I of the\n Inventory of Hazardous Materials.)\n',
						                fontSize:10,
						                alignment : 'center',
						               
						            },
						            {
						            	text:'\n'
						            },
						            
						            {
						                text:'Issued under the provisions of Regulation (EU) 1257/2013 on ship recycling\n under the authority of the Government of the Republic of the Marshall Islands',
						                fontSize:10,
						                alignment : 'center',
						               
						            }
									]
							}
						]	
					},
		        {
		            columns:[[{
		                text:'Statement Number',
		                fontSize:10,
		                margin:[5,4,0,0]
		                },
		                {
		                    table:{
		                        widths: [86],
									body : [[{text: certificateData.certificateNo,alignment:'center'}]]                 
		                    },
		                    margin : [ 0,2,12,0 ],fontSize:8
		                },
		                {
		                    qr:certificateData.res.qrCodeUrl,
		                    fit : 90,
							margin : [ 8,10,10,10 ]
		                },
		                
		                
		                
		            ]],
		            width : 'auto'
		        }
		        
		        ]
		     }]
		 
		
		
		var shipHK=[{
			 columns:[
				 
				 {
					 text : 'Particulars of the Ship:',
					 bold : true,
					 fontSize : 10,
					 margin : [ 20,30,0,10 ]
				 }
				 ]
		 }]
		
		
		var shipEU=[{
			 columns:[
				 
				 {
					 text : 'Particulars of the Ship:',
					 bold : true,
					 fontSize : 10,
					 margin : [ 20,30,0,10 ]
				 }
				 ]
		 }]
		
	
		 var shipDetailsHK=[{
			 columns:[
				 {
					 margin: [20, 0, 0, 0],
						table: {
							widths:[194,290],
					    	heights: [0,0],
				            body: [
				            	[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Name of Ship:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text: certificateData.vesselName?certificateData.vesselName:'' , fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}],
										margin:[0,0,0,9]
									
									},{
									    border: [true, true,true, true],
							 			text: [{text:certificateData.distinletter?certificateData.distinletter:'', fontSize: 10,bold:false}]
									    
									    
									}
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Port of Registry:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.portofreg?certificateData.portofreg:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Gross Tonnage:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.grt?certificateData.grt:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "IMO Number:", fontSize: 10,bold:false}],
									    margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.vesselImoNo?certificateData.vesselImoNo:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{
										border: [true, true,true, true],
							 			
							 			text: [{text: "Name and Address of the Shipowner:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,40]
									},
									
									{
									   border: [true, true,true, true],
							 			
										text: [{text:(certificateData.companyname?certificateData.companyname : '')+ '\n' + (certificateData.companyaddress ? certificateData.companyaddress : ''),fontSize: 10,bold:false}]
									    
									   }
								],
				            	[
									{ 
										border: [true, true,true, true],
							 			
							 			text: [{text: "IMO Registered Owner Identification Number:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			
										text: [{text:certificateData.res.regOwnedImoNo? certificateData.res.regOwnedImoNo :'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "IMO Company Identification Number:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.companyimono?certificateData.companyimono:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "Date on which Keel was Laid:", fontSize: 10,bold:false}],
							 			
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text:certificateData.res.keelLaidDate ?moment(certificateData.res.keelLaidDate).format('DD MMMM YYYY'):'', fontSize: 10,bold:false}]
							 	
									
									   }
								]]
						},
						layout: 'noBorders'
				 
				 }
				 
			 ]
		 
		 }]
		
		 
		 var shipDetailsEU=[{
			 columns:[
				 {
					 margin: [20, 0, 0, 0],
						table: {
							widths:[194,290],
					    	heights: [0,0],
				            body: [
				            	[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Name of Ship:", fontSize: 10,bold:false}],
										margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.vesselName?certificateData.vesselName:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}],
										margin:[0,0,0,9]
									
									},{
									    border: [true, true,true, true],
							 			text: [{text:certificateData.distinletter?certificateData.distinletter:'', fontSize: 10,bold:false}]
									    
									    
									}
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Port of Registry:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.portofreg?certificateData.portofreg:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Gross Tonnage:", fontSize: 10,bold:false}],
									    margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.grt?certificateData.grt:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "IMO Number:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},
									
									{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.vesselImoNo?certificateData.vesselImoNo:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "Name and Address of the Shipowner:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,50]
									},
									
									{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:(certificateData.companyname?certificateData.companyname : '')+ '\n' + (certificateData.companyaddress ? certificateData.companyaddress : ''), fontSize: 10,bold:false}]
									    
									   }
								],
				            	[
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "IMO Registered Owner Identification Number:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.res.regOwnedImoNo ? certificateData.res.regOwnedImoNo :'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "IMO Company Identification Number:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.companyimono?certificateData.companyimono:'', fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "Date on which Keel was Laid:", fontSize: 10,bold:false}],
							 			
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.res.keelLaidDate ?moment(certificateData.res.keelLaidDate).format('DD MMMM YYYY') :'', fontSize: 10,bold:false}]
									    
									   }
								]]
						},
						layout: 'noBorders'
				 
				 }
				 
			 ]
		 
		 }]
		
		
		 
		
		var footerHK=[{
			margin:[20,173,0,0],
		
			 table: {
				 	widths: [230,165,'auto'],
					
			    	
		            body: 
		            	[[
		            		{
						 		text:[{
						 					text :"Unique Tracking Number: ",
						 					bold:false,
						 					fontSize : 10,
						 				},
						 				{	
						 					text:certificateData.utn,
						 					bold:true,
						 					fontSize : 10
						 			}]
			            	},
		            		{
		            			text :'1 of 4',
		            			fontSize: 9,
		            			bold:false,
		            		
		            		},
		            		{
		            			
		    					text : footerNote,
		    					alignment : 'right',
		    					
		    					fontSize : 9,
		    					
		            		}
		            	]]
		            
			 },
			 layout: 'noBorders'
		 
		 }]
	 
	 
		var footerEU=[{
			margin:[20,209,0,0],
		
			 table: {
				 	widths: [230,165,'auto'],
					
			    	
		            body: 
		            	[[
		            		{
						 		text:[{
						 					text :"Unique Tracking Number: ",
						 					bold:false,
						 					fontSize : 10,
						 				},
						 				{	
						 					text:certificateData.utn,
						 					bold:true,
						 					fontSize : 10
						 					
						 			}]
			            	},
					 			
		            		{
		            			text :'1 of 4',
		            			fontSize: 9,
		            			bold:false,
		            		
		            		
		            		},
		            		{
		            			
		    					text : footerNote,
		    					alignment : 'right',
		    					fontSize : 9,
		    					
		    					
		            		}
		            	]]
		            
			 },
			 layout: 'noBorders'
		 
		 }]
	 
	 
	 
		
	 
	 var borderHK=[{
		 stack:[
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 5, y:704,
		                        w: 525,
		                        h: -708,
		                        fillOpacity: 0.5,
		                        lineWidth:2
					        }
					    ]
		       },
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 0, y: 710,
		                        w: 535,
		                        h: -719,
		                        fillOpacity: 0.5
					        }
					     ]
		       }
		 ]
		 
	 }]
		
	var crossLineFirstPageHk=voidStatus==true?{//crossLine first page hk
			canvas : [ {
				type : 'line',
			   	x1 : 0,
				y1 : -40,
				x2 : 525,
				y2 : -765,
				lineColor:'red',
				lineWidth : 2
			} 
	],
	absolutePosition:{x:45,y:800} 
	   }:'';
		
		
		
		var borderEU=[{
			 stack:[
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
						        	
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
						        	 
			                        fillOpacity: 0.5
						        }
						     ]
			       }
			 ]
			 
		 }]
		
	var crossLineFirstPageEu=voidStatus==true?{//crossLine first page eu
			canvas : [ {
				type : 'line',
			   	x1 : 0,
				y1 : -40,
				x2 : 525,
				y2 : -765,
				lineColor:'red',
				lineWidth : 2
			} 
	],
	absolutePosition:{x:45,y:800} 
	   }:'';
		 
		//EXEMPTION 1ST PAGE
		 var headerSecExemption =[{
		        columns:[
		        	{
						image : sourceToDataURL('logo'),
						width : 80,
						height : 80,
						margin:[10,15,0,0]
					},
		        {
						stack: [
							{ 
							   width:350,
					           margin:[20,10,0,0],
							   text:[{
								    text:'Republic of the Marshall Islands\n',
					                fontSize:23,
					                bold:true,
					                color : '#525252',style : 'rightme'
					               
							   },
							   {
					                text:'Maritime Administrator\n',
					                fontSize:14,
					                bold:true,
					                color : '#525252',style : 'rightme',
					                alignment:'center'
					            },
					            
							   ]},
		        			
							{
		        				margin:[20,10,0,0],
		        				text:[
		        					{
					                text:'Exemption Certificate\n',
					                fontSize:17,
					                bold:true,
						            color : '#525252',style : 'rightme',
					                alignment:'center',
					                margin:[0,10,0,0]
		        					}
		        				]
							},
							{
								margin:[20,10,0,0],
								text:[
								   {
						                text:'Issued under the provisions of the International Convention for the Safety of \n Life at Sea, 1974, as amended (the "Convention"), under the authority of the\n',
						                fontSize :10,
										color : 'black',
										margin:[10,0,0,0],
										 
										
						            },
						           {
						                text:'Government of the Republic of the Marshall Islands',
						                fontSize:10,
						                alignment : 'center', 
						            }
									]
							}
						]	
					},
		        {
		            columns:[[{
		                text:'Certificate Number',
		                fontSize:10,
		                margin:[5,4,0,0]
		                },
		                {
		                	table:{
		                        widths: [86],
									body : [[ {text:certificateData.certificateNo,alignment:'center'}]]                 
		                    },
		                    margin : [ 0,2,12,0 ],fontSize:8
		                },
		                {
		                    qr:certificateData.res.qrCodeUrl,
		                    fit : 90,
							margin : [ 8,10,10,10 ]
		                },
		                
		                
		                
		            ]],
		            width : 'auto'
		        }
		        
		        ]
		     }]
		 var shipExemption=[{
			 columns:[
				 
				 {
					 text : 'Particulars of the Ship:',
					 bold : true,
					 fontSize : 10,
					 margin : [ 20,35,0,10 ]
				 }
				 ]
		 }]
		 var shipDetailsExemption=[{
			
					 margin: [20, 0, 0, 0],
						table: {
							widths:[194,290],
					    	heights: [0,0],
				            body: [
				            	[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Name of Ship:", fontSize: 10,bold:false}],
										margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.vesselName, fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: 'Distinctive Number or Letters:', fontSize: 10,bold:false}],
										margin:[0,0,0,9]
									
									},{
									    border: [true, true,true, true],
							 			text: [{text:certificateData.officialNo, fontSize: 10,bold:false}]
									    
									    
									}
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Port of Registry:", fontSize: 10,bold:false}],
							 			margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.portofreg, fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{ 
										border: [true, true,true, true],
							 			text: [{text: "Gross Tonnage:", fontSize: 10,bold:false}],
									    margin:[0,0,0,9]
									},{
									   border: [true, true,true, true],
							 			text: [{text:certificateData.grt, fontSize: 10,bold:false}]
									    
									   }
								],
								[
									{
										border: [true, true,true, true],
							 			fillColor: '',
							 			text: [{text: "IMO Number:", fontSize: 10,bold:false}],
							 			
									},
									
									{
									   border: [true, true,true, true],
							 			fillColor: '',
										text: [{text:certificateData.vesselImoNo, fontSize: 10,bold:false}]
									    
									   }
								]]
						},
						layout: 'noBorders'
				 
			}]
		 
		 var  certifyExemption=[{
			 columns:[{
				        margin:[20,15,0,0],
				        fontSize: 10,
				 		text:[{
				 			text:'This is to certify',
				 			bold:true
				 			
				 			},
				 			{
				 				text:' that the ship is, under the authority conferred by paragraph 13 of MSC.1/Circ. 1374, exempted from \n the requirements of regulation 3-5 of Chapter II-1 of the Convention.',
					 			bold:false
					 			
				 			}]
				 }]
		 }]
		
		 
		 
		 var  certificateExemption=[{
			 		margin: [20, 20, 0, 0],
			 		table: {
			 			widths:[400,190],
			 			
			 			body: [[
			 			       {
			 			    	margin: [0, 0, 0, 30],
			 			        text:[{
			 						text :'Conditions, if any, on which the Exemption Certificate is granted:\n',
			 						bold:false,
			 						fontSize:10,
			 						
			 					},
			 					{
			 						//text :certificateData.res.condEcGrant==1 ? 'No' : (certificateData.res.condEcGrant==3 ? 'Yes': 'N/A'),
			 						text :certificateData.res.condEcGrant,
			 						bold:false,
			 						fontSize:10
			 					
			 					}]
			 			       }],
		            		[
		            		 {
		            			 margin: [0, 0, 0, 30],
		            			 text:[{
		            				 text :'Voyages, if any, for which the Exemption Certificate is granted:\n',
		            				 bold:false,
			 						 fontSize:10
		            				 
		            			 },
		            			 {
		            				text : certificateData.res.voyageEcGrant==1 ? 'No' : (certificateData.res.voyageEcGrant==3 ? 'Yes' : 'N/A'),
					 				bold:false,
					 				fontSize:10
		            			 }
		            		 ]}
		            			
		            		]]
			 		},
			 		layout: 'noBorders'
			
		}] 
		
			
		
		var cDate = certificateData.certIssueDate;
    		//var certdate = monthNames[cDate.getMonth()];
    	 	var check1 = moment(certificateData.certIssueDate, 'YYYYMMDD');
   		var certdate  = check1.format('MMMM');
 
		
		certificateData.certissuedate = certificateData.certissuedate? moment( certificateData.certissuedate).format('DD MMMM YYYY'):'';
		 var exemptionCertificateExemption =[{
			 margin:[20,0,0,0],
				fontSize: 10,
				 table: {
					 	widths: [480],
					 	
						body: 
			            	[[{
			            		
			            		text:[{
			            				text :'This Exemption Certificate is valid until ',
			            				bold:false
			            			},
			            			{
			            				
			            				text: certificateData.expirydate? moment( certificateData.expirydate).format('DD MMMM YYYY')+ ',' :' (date),',
			            				italics:certificateData.expirydate?false:true
			            			},
			            			{
			            				text :' subject to the Certificate, to which this Exemption Certificate is attached, remaining valid.',
			            				bold:false
			            			}
			            			]

			            	}],
			            	
			            	[{
			            		margin:[70,10,0,0],
			            		text:[{
			            			text :'Issued by the Republic of the Marshall Islands Maritime Administrator at \n',
			            			bold:false,
				            		
			            			},
			            			{
			            				text :certificateData.res.auditPlace?certificateData.res.auditPlace:' (location)',
			            				italics:certificateData.res.auditPlace?false:true
			            			},
			            			{
			            				text :' this ',
			            				bold:false,
			            			},
			            			{
			            				text :certificateData.certissuedate?dateSuffix(Number(certificateData.certissuedate
			            						.split(' ')[0])):' (day)',
			            				italics:certificateData.certissuedate?false:true
			            			},
			            			{
			            				text :' day of ',
			            				bold:false,
			            				
			            			},
			            			{
			            				text :certificateData.certissuedate?certificateData.certissuedate.split(' ')[1]+' ':' (month',
			            				italics:certificateData.certissuedate?false:true
			            				
			            			},
			            			{
			            				text :certificateData.certissuedate?certificateData.certissuedate.split(' ')[2]+'.': ' year)',
			            				italics:certificateData.certissuedate?false:true
			            				
			            			}]
			            	}]
			            	
			            ]
				 },
				 layout: 'noBorders'
		 }]
		 
		 var sealType = certificateData.title=="Special Agent"?"sa":"dc"; 	
		 
		 var sealImageExemption=[{
				margin:[20,20,0,0],
				
			 	table: {
			 		widths:[230,240],
			 		body:[[
			 			certificateData.res.seal? {
						image : sourceToDataURL(sealType),
						width : 80,
						height : 80,
						margin:[10,0,0,0]
			 			}:{
			 				text:'',
			 			},
					
					 certificateData.res.signToPrint==1 ?{
								//false ?{
									image : 'data:image/jpeg;base64,'+certificateData.res.issuerSign,
									width : 80,
									height : 40,
									alignment:'center',
									margin:[0,40,0,0]
									
								}:{
									text:'',
								}
						],
						[
							
							{
								text:'',
							},
							{
								//margin:certificateData.res.signToPrint?[0,0,0,0]:[0,80,0,0],
								 canvas : [{
											type : 'line',
											x1 : 0,
											y1 : 5,
											x2 : 240,
											y2 : 5,
											lineWidth : 1,
											
								 }]
							 }
						]
			 	]},
			 	layout: 'noBorders'
			 
		}]
	 
		 
		 
		 var sealExemption=[{
			 		margin:[18,0,0,0],
			 		 table: {
						 	widths: [233, 233],
						 	body: 
				            	[
				            		[{
				            			text :'(Seal or stamp of issuing authority, as appropriate)',	
				            			fontSize : 10,
				            			//margin:certificateData.res.signToPrint?[0,0,0,0]:[0,80,0,0]
				            			
				            		},
				            		{
				            			text :certificateData.res.nameToPrint==1?certificateData.res.issuerName:'(Name)',	
				            			fontSize : 10,
				            			italics:certificateData.res.nameToPrint==1?false:true,
				            			alignment:'left',
				            			margin:[2,0,0,0]
				            			//margin:certificateData.res.signToPrint?[0,0,0,0]:[0,80,0,0]
				            			
				            		}],
				            		[{
				            			text :''	
				            			
				            			
				            		},
				            		{
				            			text :certificateData.res.title?certificateData.res.title:'(Appointment)',	
				            			fontSize : 10,
				            			italics:certificateData.res.title?false:true,
				            			alignment:'left',
				            			margin:[2,0,0,0]
				            			
					            	}]
				            		
				            	]},
				            	layout: 'noBorders'
				            	
			 	}]
		 
		
			 
		 
		 
		 
		 
		 
		 var borderExemption=[{
			 stack:[
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
						        	
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
						        	
			                        fillOpacity: 0.5
						        }
						     ]
			       }
			 ]
			 
		 }]
		 
		 
		 var footerExemption=[{
				margin:[20,0,0,2],
				table: {
					 	widths: [400, 'auto'],
						
				    	
			            body: 
			            	[[
			            		{
						 			text:[{
						 					text :"Unique Tracking Number: ",
						 					bold:false,
						 					fontSize : 10,
						 				},
						 				{	
						 					text:certificateData.utn,
						 					bold:true,
						 					fontSize : 10
		            			}]
			            		},
			            		{
			            			
			    					text : footerNote,
			    					alignment : 'right',
			    					fontSize : 9,
			    					
			            		}
			            	]]
			            
				 },
				 layout: 'noBorders'
			 
			 }]
		 
		 var crossLineFirstPageExe=voidStatus==true?{//crossLine first page exe
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';
		 
		//first page end
		
		
		
//second page start
		 //second page HK
		 var secondBorderHK=[{
			 stack:[
			       {
			    	   pageBreak: 'before',
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
			                        fillOpacity: 0.5
						        }
						     ]
			       }
			 ]
			 
		 }]
	             
		 var certificateNoHK=[{
			 columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[435,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
							body : [[{text: certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 430,2,0,0 ],fontSize:8
	                }
	         ]]
	          
	     }]
	              
		
		 
		 var inventoryHazardousHK=[{
			 columns:[[{
         		text :'Particulars of Part I of the Inventory of Hazardous Materials',
        		fontSize: 10,
        		bold:true,
        		margin:[20,40,0,0],
        	}]]
		 }]
		 
		 var identVerifyHK=[{
			 margin:[20,9,0,0],
			 table: {
					widths:[495],
			    	heights: [0,0],
			    	body: [
		            	[{
		            		text:[{
		            			text :'Part I of the Inventory of Hazardous Materials identification/verification number: ',
		            			fontSize: 10,
		            			bold:false,
		            		
		            		},
		            		{
		            			text :certificateData.res.ihmDocumentNo ? certificateData.res.ihmDocumentNo:'N/A',
		            			fontSize: 10,
		            			bold:false,
		            		}]
		            	}]
		            ]
			 },
		 layout: 'noBorders'
		}] 
		 
		 var noteHK=[{
			 columns:[
			       [{
			    	   fontSize: 10,
			    	   margin:[20,10,20,0],
			    	   lineSpacing: 3,
			    	   text:[
          				
			    	         {
			            		text :'Note:',
			            		
			            		bold:true,
			            		
			            	
			    	         },
			            	{
			            		text :' Part I of the Inventory of Hazardous Materials, as required by regulation 5 of the Annex to the Convention, is an \n essential part of the Statement of Compliance for Inventory of Hazardous Materials and must always accompany the \n Statement of Compliance for Inventory of Hazardous Materials. Part I of the Inventory of Hazardous Materials should be \n compiled on the basis of the standard format shown in the guidelines developed by the Organization.',
			            		fontSize: 10,
			            		bold:false,
			            		
			            	
			            	}
          			]
			 	},{
            		text :'This is to certify:',
            		fontSize: 10,
            		bold:true,
            		margin:[20,20,0,0],
            	
			 	}],
			 	
          	]
		}] 
		 
		
		 var pointsHK=[{
				margin:[48,10,0,0],
		
				 table: {
					 	widths: [35, 360, 'auto'],
						body: 
			            	[[
			            		{
			            			text :'1.',
			            			fontSize: 10,
				            		bold:false,
				            			
				            	},
				            	{
			            			text :'that the ship has been surveyed in accordance with regulation 10 of the Annex to the\n Convention; and',
			            			fontSize: 10,
				            		bold:false,
			            			
				            	},
				            	{
			            			text :'',
			            			
				            	}],
				            	[{
				            		text :'2.',
			            			fontSize: 10,
				            		bold:false
				            	 },
				            	 {
					            		text :'that the survey shows that Part I of the Inventory of Hazardous Materials fully complies \n with the applicable requirements of the Convention.',
				            			fontSize: 10,
					            		bold:false
				            	 },
				            	 {
					            		text :'',
				            			fontSize: 10,
					            		bold:false
				            	 }]
				            	 
			            	]
				 },
				 layout: 'noBorders'
		 }]
		 certificateData.certissuedate = certificateData.certissuedate?moment(certificateData.certissuedate).format('DD MMMM YYYY'):'';
		
		 var dateHK =[{
				margin:[20,10,0,0],
				fontSize: 10,
				 table: {
					 	widths: [470],
					 	
						body: 
			            	[[{
			            		
			            		text:[{
			            				text :'Completion date of the survey on which this Statement of Compliance is based: ',
			            				bold:false
			            			},
			            			{
			            				text:  certificateData.res.completionSurveyDate ? moment(certificateData.res.completionSurveyDate).format('DD MMMM YYYY'):' N/A',
			            				bold:false,
			            			}
			            			]

			            	}],
			            	[{
			            		margin:[0,8,0,0],
			            		text:[{
			            				text :'This Statement of Compliance is valid until: ',
			            				bold:false,
			            				
			            			},
			            			{
			            				text:certificateData.expirydate? moment(certificateData.expirydate).format('DD MMMM YYYY'):' (date)',
			            				italics:certificateData.expirydate?false:true
			            			}]
			            	}],
			            	[{
			            		margin:[170,8,0,0],
			            		text:[{
			            			text :'Issued by the Republic of the Marshall Islands Maritime Administrator at \n',
			            			
				            		bold:false,
				            		//margin:[95,8,0,0]
			            			
			            			},
			            			{
			            				text :certificateData.res.auditPlace?certificateData.res.auditPlace:' (location)',
			            				italics:certificateData.res.auditPlace?false:true
			            			},
			            			{
			            				text :' this ',
			            				bold:false,
			            			},
			            			{
			            				text :certificateData.certissuedate?dateSuffix(Number(certificateData.certissuedate
			            						.split(' ')[0])):' (day)',
			            				italics:certificateData.certissuedate?false:true
			            			},
			            			{
			            				text :' day of ',
			            				bold:false,
			            				
			            			},
			            			{
			            				text :certificateData.certissuedate?certificateData.certissuedate.split(' ')[1]+' ':' (month',
			            				italics:certificateData.certissuedate?false:true
			            				
			            			},
			            			{
			            				text :certificateData.certissuedate?certificateData.certissuedate.split(' ')[2]+'.':'  year)',
			            				italics:certificateData.certissuedate?false:true
			            				
			            			}
			            			
			            			]
			            	
			            		
			            	}]
			            	
			            	]
				 },
				 layout: 'noBorders'
		 }]
		 
		// let sealType = certificateData.title=="Special Agent"?"sa":"dc";
		 
	var sealImageHK=[{
					margin:[20,20,0,0],
				 	table: {
				 		widths:[230,240],
				 		body:[[
				 			certificateData.res.seal ? {
							image : sourceToDataURL(sealType),
							width : 80,
							height : 80,
							margin:[10,0,0,0]
				 			}:{
				 				text:'',
				 			},
						
						 certificateData.res.signToPrint==1 ?{
									//false ?{
										image : 'data:image/jpeg;base64,'+certificateData.res.issuerSign,
										width : 80,
										height : 40,
										alignment:'center',
										margin:[0,40,0,0]
										
									}:{
										text:'',
									}
							],
							[
								{
									text:'',
								},
								{
									// margin:certificateData.res.signToPrint?[0,0,0,0]:[0,80,0,0],
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 240,
												y2 : 5,
												lineWidth : 1
									 }]
								 }
							]
				 	]},
				 	 layout: 'noBorders'
				 
			}]
		 
		 
	var signature=[
		 {
			 //margin:[280,78,0,0],
			 canvas : [{
						type : 'line',
						x1 : 0,
						y1 : 5,
						x2 : 240,
						y2 : 5,
						lineWidth : 1
						}]
		 }]
	 		
	 var sealHK=[			
		 	{
		 		margin:[18,0,0,0],
		 		 table: {
					 	widths: [233, 233],
					 	body: 
			            	[
			            		[{
			            			text :'(Seal or stamp of issuing authority, as appropriate)',	
			            			fontSize : 10
			            			
			            		},
			            		{
			            			text :certificateData.res.nameToPrint==1?certificateData.res.issuerName:'(Name)',	
			            			fontSize : 10,
			            			italics:certificateData.res.nameToPrint==1?false:true,
			            			alignment:'left',
			            			margin:[2,0,0,0]
			            			
			            		}],
			            		[{
			            			text :''	
			            			
			            			
			            		},
			            		{
			            			text :certificateData.res.title?certificateData.res.title:'(Appointment)',	
			            			fontSize : 10,
			            			italics:certificateData.res.title?false:true,
			            			alignment:'left',
			            			margin:[2,0,0,0]
			            			
				            	}]
			            		
			            	]},
			            	layout: 'noBorders'
			            	
		 	}]
	 
		 var SecondPagefooterHK=[{
			 margin :certificateData.res.ihmDocumentNo?(certificateData.res.ihmDocumentNo.length>=33?[20,170,0,0]:[20,200,0,0]):[20,200,0,0],
		
				 table: {
					 	widths: [225, 175, 'auto'],
						
				    	
			            body: 
			            	[[
			            		{
			            			text :'',
			            			
			            		},
			            		{
			            			text :'2 of 4',
			            			fontSize: 9,
			            			bold:false,
			            		
			            		
			            		},
			            		{
			            			
			    					text : footerNote,
			    					alignment : 'right',
			    					
			    					fontSize : 9,
			    					
			    					
			            		}
			            	]]
			            
				 },
				 layout: 'noBorders'
			 
			 }]
		 
		 var crossLineSecondPageHk=voidStatus==true?{//crossLine second page hk
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';

		 
		 
		//SECOND PAGE EU 
 var secondBorderEU=[{
			 stack:[
			       {
			    	   pageBreak: 'before',
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
			                        fillOpacity: 0.5
						        }
						     ]
			       }
			 ]
			 
		 }]
	             
		 var certificateNoEU=[{
			 columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[435,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
							body : [[ {text:certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 430,2,0,0 ],fontSize:8
	                }
	         ]]
	          
	     }]
	              
		var inventoryHazardousEU=[{
			 columns:[[{
         		text :'Particulars of Part I of the Inventory of Hazardous Materials',
        		fontSize: 10,
        		bold:true,
        		margin:[20,40,0,0],
        	}]]
		 }]
		 
		 var identVerifyEU=[{
			 margin:[20,9,0,0],
			 table: {
					widths:[495],
			    	heights: [0,0],
			    	body: [
		            	[{
		            		text:[{
		            			text :'Part I of the Inventory of Hazardous Materials identification/verification number: ',
		            			fontSize: 10,
		            			bold:false,
		            		
		            		},
		            		{
		            			text :certificateData.res.ihmDocumentNo?certificateData.res.ihmDocumentNo:'N/A',
		            			fontSize: 10,
		            			bold:false,
		            		}]
		            	}]
		            ]
			 },
		 layout: 'noBorders'
		}] 
		 
		 var noteEU=[{
			 columns:[
			       [{
			    	   fontSize: 10,
			    	   margin:[20,10,20,0],
			    	   lineSpacing: 3,
			    	   text:[
          				
			    	         {
			            		text :'Note:',
			            		
			            		bold:true,
			            		
			            	
			    	         },
			            	{
			    	        	text:' Part I of the Inventory of Hazardous Materials, as required by Article 12, paragraph 1 of the Regulation (EU) 1257/2013 is an essential part of the Statement of Compliance and must always accompany the Statement of Compliance. Part I of the Inventory of Hazardous Materials should be compiled on the basis of the standard format shown in the guidelines developed by the International Maritime Organization, supplemented, where applicable, by guidelines on aspects specific to Regulation (EU) 1257/2013, such as the EMSA\'s Best Practice Guidance on the Inventory of Hazardous Materials.',
			            		fontSize: 10,
			            		bold:false,
			            		
			            	
			            	}
          			]
			 	},{
            		text :'This is to certify:',
            		fontSize: 10,
            		bold:true,
            		margin:[20,20,0,0],
            	
			 	}],
			 	
          	]
		}] 
		 
		 
		 
		 var pointsEU=[{
				margin:[48,10,0,0],
		
				 table: {
					 	widths: [35, 360, 'auto'],
						body: 
			            	[[
			            		{
			            			text :'1.',
			            			fontSize: 10,
				            		bold:false,
				            			
				            	},
				            	{
			            			text :'that the ship has been surveyed in accordance with Article 12, paragraph 6 of Regulation\n (EU) 1257/2013; and',
			            			fontSize: 10,
				            		bold:false,
			            			
				            	},
				            	{
			            			text :'',
			            			
				            	}],
				            	[{
				            		text :'2.',
			            			fontSize: 10,
				            		bold:false
				            	 },
				            	 {
					            		text :'that the survey shows that Part I of the Inventory of Hazardous Materials fully complies \n with the applicable requirements of Regulation (EU) 1257/2013.',
				            			fontSize: 10,
					            		bold:false
				            	 },
				            	 {
					            		text :'',
				            			fontSize: 10,
					            		bold:false
				            	 }]
				            	 
			            	]
				 },
				 layout: 'noBorders'
		 }]
		 
		 certificateData.certissuedate = certificateData.certissuedate?moment(certificateData.certissuedate).format('DD MMMM YYYY'):'';
		// certificateData.completionSurvey= certificateData.completionSurveyDate ?certificateData.completionSurveyDate.replace(/-/g,' '):' (date)';

		 var dateEU =[{
				margin:[20,10,0,0],
				fontSize: 10,
				 table: {
					 	widths: [470],
					 	
						body: 
			            	[[{
			            		
			            		text:[{
			            				text :'Completion date of the survey on which this Statement of Compliance is based: ',
			            				bold:false
			            			},
			            			{
			            				text:  certificateData.res.completionSurveyDate ? moment(certificateData.res.completionSurveyDate).format('DD MMMM YYYY'):' N/A',
			            				bold:false,
			            			}
			            			]

			            	}],
			            	[{
			            		margin:[0,8,0,0],
			            		text:[{
			            				text :'This Statement of Compliance is valid until: ',
			            				bold:false,
			            				
			            			},
			            			{
			            				text:certificateData.expirydate? moment(certificateData.expirydate).format('DD MMMM YYYY'):' (date)',
			            				italics:certificateData.expirydate?false:true
			            			}]
			            	}],
			            	[{
			            		margin:[170,8,0,0],
			            		text:[{
			            			text :'Issued by the Republic of the Marshall Islands Maritime Administrator at \n',
			            			
				            		bold:false,
				            		//margin:[95,8,0,0]
			            			
			            			},
			            			{
			            				text :certificateData.res.auditPlace?certificateData.res.auditPlace:' (location)',
					            		italics:certificateData.res.auditPlace?false:true
			            			},
			            			{
			            				text :' this ',
			            				bold:false,
			            			},
			            			{
			            				text :certificateData.certissuedate?dateSuffix(Number(certificateData.certissuedate
			            						.split(' ')[0])):' (day)',
			            				italics:certificateData.certissuedate?false:true
			            			},
			            			{
			            				text :' day of ',
			            				bold:false,
			            				
			            			},
			            			{
			            				text :certificateData.certissuedate?certificateData.certissuedate.split(' ')[1]+' ':' (month',
			            				italics:certificateData.certissuedate?false:true
			            				
			            			},
			            			{
			            				text :certificateData.certissuedate?certificateData.certissuedate.split(' ')[2]+'.':' year)',
			            				italics:certificateData.certissuedate?false:true
			            				
			            			}
			            			
			            			]
			            	
			            		
			            	}]
			            	
			            	]
				 },
				 layout: 'noBorders'
		 }]
		 
		// let sealType = certificateData.title=="Special Agent"?"sa":"dc";
		 
	var sealImageEU=[{
					margin:[20,20,0,0],
				 	table: {
				 		widths:[230,240],
				 		body:[[
				 			certificateData.res.seal? {
							image : sourceToDataURL(sealType),
							width : 80,
							height : 80,
							margin:[10,0,0,0]
				 			}:{
				 				text:'',
				 			},
						
						 certificateData.res.signToPrint==1 ?{
									//false ?{
										image : 'data:image/jpeg;base64,'+certificateData.res.issuerSign,
										width : 80,
										height : 40,
										alignment:'center',
										margin:[0,40,0,0]
										
									}:{
										text:'',
									}
							],
							[
								{
									text:'',
								},
								{
									//margin:certificateData.res.signToPrint?[0,0,0,0]:[0,80,0,0],
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 240,
												y2 : 5,
												lineWidth : 1
									 }]
								 }
							]
				 	]},
				 	 layout: 'noBorders'
				 
			}]
		 
	
	 		
	 var sealEU=[			
		 	{
		 		margin:[18,0,0,0],
		 		 table: {
					 	widths: [233, 233],
					 	body: 
			            	[
			            		[{
			            			text :'(Seal or stamp of issuing authority, as appropriate)',	
			            			fontSize : 10
			            			
			            		},
			            		{
			            			text :certificateData.res.nameToPrint==1?certificateData.res.issuerName:'(Name)',	
			            			fontSize : 10,
			            			italics:certificateData.res.nameToPrint==1?false:true,
			            			alignment:'left',
			            			margin:[0,0,0,0]
			            					
			            			
			            		}],
			            		[{
			            			text :''	
			            			
			            			
			            		},
			            		{
			            			text :certificateData.res.title?certificateData.res.title:'(Appointment)',	
			            			fontSize : 10,
			            			italics:certificateData.res.title?false:true,
			            			alignment:'left',
			            			margin:[0,0,0,0]
			            			
				            	}]
			            		
			            	]},
			            	layout: 'noBorders'
			            	
		 	}]
		 var SecondPagefooterEU=[{
			 margin :certificateData.res.ihmDocumentNo?(certificateData.res.ihmDocumentNo.length>=33?[20,150,0,0]:[20,170,0,0]):[20,170,0,0],
		
				 table: {
					 	widths: [225, 175, 'auto'],
						
				    	
			            body: 
			            	[[
			            		{
			            			text :'',
			            			
			            		},
			            		{
			            			text :'2 of 4',
			            			fontSize: 9,
			            			bold:false,
			            		
			            		},
			            		{
			            			
			    					text : footerNote,
			    					alignment : 'right',
			    					
			    					fontSize : 9,
			    					
			            		}
			            	]]
			            
				 },
				 layout: 'noBorders'
			 
			 }]
		 
		 
		 var crossLineSecondPageEu=voidStatus==true?{//crossLine second page eu
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';
		 
		 //second page end
		 
		 //third page HK
		 
		 var thirdBorderHK=[{
			 stack:[
			       {
			    	   pageBreak: 'before',
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
			                        fillOpacity: 0.5
						        }
						]
			       }
			 ]
			 
		 }]
		 
		 var thirdCertificateNoHK=[{
			 columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[435,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
							body : [[{text: certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 430,2,0,0 ],fontSize:8
	                }
	         ]]
	          
	     }]
		 
		 
		 var extensionDate = certificateData.extension[0]? certificateData.extension[0].extendedExpireDate : '(Date)'
			
		 
		 var endorsement1HK=[{
			 
					 margin : [ 20,25,0,0 ],
					 table:{
						widths: [490],
				 		body : 
				 			[[{
				 				text : 'ENDORSEMENT TO EXTEND THE STATEMENT OF COMPLIANCE IF VALID FOR LESS THAN FIVE\n',
				 				bold : true,
				 				fontSize : 10,
				 				margin : [ 10,0,0,0 ]
				 				
				 			}],
				 			[{
				 				text : 'YEARS WHERE CONVENTION REGULATION 11.6 APPLIES',
				 				bold : true,
				 				fontSize : 10,
				 				alignment:'center'
				 				
				 			}],
				 			[{
				 				fontSize : 10,
				 				margin : [ 0,10,0,0 ],
			 					
				 				text:[{
				 						text : 'The ship complies with the relevant provisions of the Convention and this Statement of Compliance shall, in accordance\n with regulation 11.6 of the Annex to the Convention, be accepted as valid until ',
				 						bold : false,
				 						
				 					},
				 					{
				 						text :extensionDate.replace(/-/g,' ')+'.',
				 						italics:(extensionDate =='(Date)')?true:false,
				 						fontSize : 10
					 				
					 			}]
				 			}]	
				 			
				 			
				 	]},
					 layout: 'noBorders'
				 
		 }]
		 
	var extendSealSignature1HK=[{
				margin:[20,10,0,0],
				columns: [
					{//1st column starts
						width: '*',
						stack:[//for left side
							certificateData.extension[0]? {
								image : sourceToDataURL(sealType),
								width : 80,
								height : 80,
								margin:[10,20,0,0]
					 			}:{
					 				text:'',
					 			},
					 			{
					 				text:'(Seal or stamp of issuing authority, as appropriate)',
			 						fontSize : 10,
			 						bold : false,
			 						margin:certificateData.extension[0]?[0,13,0,0]:[0,110,0,0]
					 			}
						]	
					},//1st column ends
					
					{//2nd column starts
						width: 34,
						stack:[//for right side
		 					{
		 						text:'Signed:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,15,0,0]
		 					
		 					},
		 					{
		 						text:'Place:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					},
		 					{
		 						text:'Date: ',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					}
		 					
		 				]},//2nd column ends
			            	
			            	{//3rd column starts
								width: '*',
								 margin : [ 0,0,20,0 ],
								stack:[
									certificateData.extension[0] && certificateData.extension[0].signToPrint==1?{
									//false ?{
									image : 'data:image/jpeg;base64,'+certificateData.extension[0].issuerSign,
									width : 60,
									height : 20,
									alignment:'center'
									//fit: [100, 100]
									}:{
									text:'',
									},
									{
										margin:certificateData.extension[0] && certificateData.extension[0].signToPrint==1?[0,0,0,0]:[0,20,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text :certificateData.extension[0] && certificateData.extension[0].nameToPrint==1?certificateData.extension[0].issuerName:'(Name)\n',	
					            			fontSize : 10,
					            			italics:certificateData.extension[0] && certificateData.extension[0].nameToPrint==1?false:true,
					            			alignment:'left',
					            			margin : [ 0,0,4,0 ]
					            			
									 },
									 {
					            			text :certificateData.extension[0] && certificateData.extension[0].title?certificateData.extension[0].title:'(Appointment)',	
					            			fontSize : 10,
					            			italics:certificateData.extension[0] && certificateData.extension[0].title?false:true,
					            			alignment:'left',
					            			margin : [ 0,0,6,0 ]
					            			
									 },
									 {
					            			text :certificateData.extension[0]?certificateData.extension[0].auditPlace:'',	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,10,0,0 ],
					            			
									 },
									 {
										 margin:certificateData.extension[0]?[0,0,0,0]:[0,10,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text :certificateData.extension[0]?certificateData.extension[0].issuerSignDate:'',
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,30,0,0 ]
					            			
									 },
									 {
										 margin:certificateData.extension[0]?[0,0,0,0]:[0,10,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 }]
			            	}//3rd column ends
					
				]
			}
		]	
		console.log(certificateData)		
		 var renewalDate = (certificateData.renewalEndorse1[0] && certificateData.renewalEndorse1[0].extendedExpireDate)? certificateData.renewalEndorse1[0].extendedExpireDate : '(Date)'
		 var endorsement2HK=[{
			 margin : [ 20,80,0,0 ],
			 table:{
				widths: [490],
		 		body : 
		 			[[{
		 				text : 'ENDORSEMENT WHERE THE RENEWAL SURVEY HAS BEEN COMPLETED AND CONVENTION \n',
		 				bold : true,
		 				fontSize : 10,
		 				margin : [ 10,0,0,0 ]
		 				
		 			}],
		 			[{
		 				text : 'REGULATION 11.7 APPLIES',
		 				bold : true,
		 				fontSize : 10,
		 				alignment:'center'
		 				
		 			}],
		 			[{
		 				fontSize : 10,
		 				margin : [ 0,10,0,0 ],
	 					
		 				text:[{
		 						text : 'The ship complies with the relevant provisions of the Convention and this Statement of Compliance shall, in accordance \n with regulation 11.7 of the Annex to the Convention, be accepted as valid until ',
		 						bold : false,
		 						
		 					},
		 					{
		 						text :renewalDate.replace(/-/g,' ')+'.',
		 						italics:(renewalDate =='(Date)')?true:false,
		 						fontSize : 10,
			 				
			 				
			 			}]
		 			}]	
		 			
		 			
		 	]},
			 layout: 'noBorders'
			 
		 }]
		 
		 
		 var renewal = certificateData.renewalEndorse2.length>0 ? certificateData.renewalEndorse2[0] :'';
		 var renewalSealSignatureHK=[{
			 margin:[20,10,0,0],
				columns: [
					{//1st column starts
						width: '*',
						stack:[//for left side
						       certificateData.renewalEndorse1[0] ? {
								image : sourceToDataURL(sealType),
								width : 80,
								height : 80,
								margin:[10,20,0,0]
					 			}:{
					 				text:'',
					 			},
					 			{
					 				text:'(Seal or stamp of issuing authority, as appropriate)',
			 						fontSize : 10,
			 						bold : false,
			 						margin:  certificateData.renewalEndorse1[0]?[0,13,0,0]:[0,110,0,0]
					 			}
						]	
					},//1st column ends
					
					{//2nd column starts
						width: 34,
						stack:[//for right side
		 					{
		 						text:'Signed:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,15,0,0]
		 					
		 					},
		 					{
		 						text:'Place:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					},
		 					{
		 						text:'Date: ',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					}
		 					
		 				]},//2nd column ends
			            	
			            	{//3rd column starts
								width: '*',
								 margin : [ 0,0,20,0 ],
								stack:[
								    certificateData.renewalEndorse1[0] && certificateData.renewalEndorse1[0].signToPrint==1 ?{
									//false ?{
									image : 'data:image/jpeg;base64,'+  certificateData.renewalEndorse1[0].issuerSign,
									width : 60,
									height : 20,
									alignment:'center'
									//fit: [100, 100]
									}:{
									text:'',
									},
									{
										margin:  certificateData.renewalEndorse1[0] && certificateData.renewalEndorse1[0].signToPrint==1 ?[0,0,0,0]:[0,20,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text :certificateData.renewalEndorse1[0] && certificateData.renewalEndorse1[0].nameToPrint==1?certificateData.renewalEndorse1[0].issuerName:'(Name)\n',	
					            			fontSize : 10,
					            			italics: certificateData.renewalEndorse1[0] &&  certificateData.renewalEndorse1[0].nameToPrint==1?false:true,
					            			alignment:'left',
					            			margin : [ 0,0,4,0 ]
					            			
									 },
									 {
					            			text : certificateData.renewalEndorse1[0] && certificateData.renewalEndorse1[0].title?certificateData.renewalEndorse1[0].title:'(Appointment)',	
					            			fontSize : 10,
					            			italics: certificateData.renewalEndorse1[0] && certificateData.renewalEndorse1[0].title?false:true,
					            			alignment:'left',
					            			margin : [ 0,0,6,0 ]
					            			
									 },
									 {
					            			text : certificateData.renewalEndorse1[0]?certificateData.renewalEndorse1[0].auditPlace:'',	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,10,0,0 ],
					            			
									 },
									 {
										 margin:certificateData.renewalEndorse1[0]?[0,0,0,0]:[0,10,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text : certificateData.renewalEndorse1[0] ? certificateData.renewalEndorse1[0].issuerSignDate:'',	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,30,0,0 ]
					            			
									 },
									 {
										 margin: certificateData.renewalEndorse1[0]?[0,0,0,0]:[0,10,0,0],	
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 }]
			            	}//3rd column ends
					
				]
			}]	
	
		 
	 var thirdPageFooterHK=[{
			margin:[20,140,0,0],
	
			 table: {
				 	widths: [225, 175, 'auto'],
					
			    	
		            body: 
		            	[[
		            		{
		            			text :'',
		            			
		            		},
		            		{
		            			text :'3 of 4',
		            			fontSize: 9,
		            			bold:false,
		            		
		            		},
		            		{
		            			
		    					text : footerNote,
		    					alignment : 'right',
		    					
		    					fontSize : 9,
		    					
		            		}
		            	]]
		            
			 },
			 layout: 'noBorders'
		 
		 }]
		 
		 var crossLineThirdPageHk=voidStatus==true?{//crossLine third page hk
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';

		 
		 //third page EU
		 
	var thirdBorderEU=[{
			 stack:[
			       {
			    	   pageBreak: 'before',
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
			                        fillOpacity: 0.5
						        }
						]
			       }
			 ]
			 
		 }]
		 
		 var thirdCertificateNoEU=[{
			 columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[435,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
							body : [[{text: certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 430,2,0,0 ],fontSize:8
	                }
	         ]]
	          
	     }]
		 
		 var extensionDate = certificateData.extension[0]? certificateData.extension[0].extendedExpireDate : '(Date)'
		 
		 var endorsement1EU=[{
			 
					 margin : [ 20,25,0,0 ],
					 table:{
						widths: [490],
				 		body : 
				 			[[{
				 				text : 'ENDORSEMENT TO EXTEND THE STATEMENT OF \n COMPLIANCE',
				 				bold : true,
				 				fontSize : 10,
				 				alignment:'center'
				 				
				 			}],
				 			
				 			[{
				 				fontSize : 10,
				 				margin : [ 0,10,0,0 ],
			 					
				 				text:[{
				 						text : 'The ship complies with the relevant provisions of Regulation (EU) 1257/2013 and this statement of compliance shall, \n in accordance with Article 12 of this Regulation, be accepted as valid until ',
				 						bold : false,
				 						
				 					},
				 					{
				 						text :extensionDate.replace(/-/g,' ')+'.',
				 						italics:(extensionDate =='(Date)')?true:false,
				 						fontSize : 10,
					 				
					 			}]
				 			}]	
				 			
				 			
				 	]},
					 layout: 'noBorders'
				 
		 }]
		 
		 
	var extendSealSignature1EU=[{
				margin:[20,10,0,0],
				columns: [
					{//1st column starts
						width: '*',
						stack:[//for left side
							certificateData.extension[0]? {
								image : sourceToDataURL(sealType),
								width : 80,
								height : 80,
								margin:[10,20,0,0]
					 			}:{
					 				text:'',
					 			},
					 			{
					 				text:'(Seal or stamp of issuing authority, as appropriate)',
			 						fontSize : 10,
			 						bold : false,
			 						margin:certificateData.extension[0]?[0,13,0,0]:[0,110,0,0]
					 			}
						]	
					},//1st column ends
					
					{//2nd column starts
						width: 34,
						stack:[//for right side
		 					{
		 						text:'Signed:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,15,0,0]
		 					
		 					},
		 					{
		 						text:'Place:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					},
		 					{
		 						text:'Date: ',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					}
		 					
		 				]},//2nd column ends
			            	
			            	{//3rd column starts
								width: '*',
								 margin : [ 0,0,20,0 ],
								stack:[
									certificateData.extension[0] && certificateData.extension[0].signToPrint==1?{
									//false ?{
									image : 'data:image/jpeg;base64,'+certificateData.extension[0].issuerSign,
									width : 60,
									height : 20,
									alignment:'center'
									//fit: [100, 100]
									}:{
									text:'',
									},
									{
										margin:certificateData.extension[0] && certificateData.extension[0].signToPrint==1?[0,0,0,0]:[0,20,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text :certificateData.extension[0] && certificateData.extension[0].nameToPrint==1?certificateData.extension[0].issuerName:'(Name)\n',	
					            			fontSize : 10,
					            			italics:certificateData.extension[0] && certificateData.extension[0].nameToPrint==1?false:true,
					            			alignment:'left',
					            			margin : [ 0,0,4,0 ]
					            			
									 },
									 {
					            			text :certificateData.extension[0] && certificateData.extension[0].title?certificateData.extension[0].title:'(Appointment)',	
					            			fontSize : 10,
					            			italics:certificateData.extension[0] && certificateData.extension[0].title?false:true,
					            			alignment:'left',
					            			margin : [ 0,0,6,0 ]
					            			
									 },
									 {
					            			text :certificateData.extension[0]?certificateData.extension[0].auditPlace:'',	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,10,0,0 ]
					            			
									 },
									 {
										 margin:certificateData.extension[0]?[0,0,0,0]:[0,10,0,0],
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text :certificateData.extension[0]?certificateData.extension[0].issuerSignDate:'',	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,30,0,0 ]
					            			
									 },
									 {
										 margin:certificateData.extension[0]?[0,0,0,0]:[0,10,0,0],	
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 }]
			            	}//3rd column ends
					
				]
			}
		]	
				
				
		 
	
		  
	 var thirdPageFooterEU=[{
			margin:[20,430,0,0],
	
			 table: {
				 	widths: [225, 175, 'auto'],
					
			    	
		            body: 
		            	[[
		            		{
		            			text :'',
		            			
		            		},
		            		{
		            			text :'3 of 4',
		            			fontSize: 9,
		            			bold:false,
		            		
		            		},
		            		{
		            			
		    					text : footerNote,
		    					alignment : 'right',
		    					
		    					fontSize : 9,
		    					
		            		}
		            	]]
		            
			 },
			 layout: 'noBorders'
		 
		 }]
		 
		 
		 var crossLineThirdPageEu=voidStatus==true?{//crossLine third page eu
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';
		 
		  //THIRD PAGE END 
	
		 //FOURTH PAGE START
		 	//fourth page HK
		 
		 var fourthBorderHK=[{
			 stack:[
			       {
			    	   pageBreak: 'before',
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
			                        fillOpacity: 0.5
						        }
						]
			       }
			 ]
			 
		 }]
		 
		 var fourthCertificateNoHK=[{
			 columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[435,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
							body : [[ {text:certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 430,2,0,0 ],fontSize:8
	                }
	         ]]
	          
	     }]
		
		var renewalDate = (certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].extendedExpireDate)? certificateData.renewalEndorse2[0].extendedExpireDate : '(Date)'
		var renewalRegulation =(certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].renewalRegulation) ? certificateData.renewalEndorse2[0].renewalRegulation :'.no'
		 var endorsement3HK=[{
			 
			 margin : [ 20,5,0,0 ],
			 table:{
				widths: [490],
		 		body : 
		 			[[{
		 				text : 'ENDORSEMENT TO EXTEND THE VALIDITY OF THE STATEMENT OF COMPLIANCE UNTIL \n',
		 				bold : true,
		 				fontSize : 10,
		 				margin : [ 24,0,0,0 ]
		 				
		 			}],
		 			[{
		 				text : 'REACHING THE PORT OF SURVEY OR FOR A PERIOD OF GRACE WHERE CONVENTION ',
		 				bold : true,
		 				fontSize : 10,
		 				alignment:'center'
		 				
		 			}],
		 			[{
		 				text : 'REGULATION 11.8 OR 11.9 APPLIES',
		 				bold : true,
		 				fontSize : 10,
		 				alignment:'center'
		 				
		 			}],
		 			[{
		 				fontSize : 10,
		 				margin : [ 0,5,0,0 ],
	 					
		 				text:[{
		 						text : 'This Statement of Compliance shall, in accordance with regulation' + ' (' + renewalRegulation + ') ' +'of the Annex to the Convention, be accepted as \n valid until ',
		 						bold : false,
		 						
		 					},
		 					{
		 						text :renewalDate.replace(/-/g,' ')+'.',
		 						italics:(renewalDate =='(Date)')? true: false,
		 						fontSize : 10,
			 				
			 			}]
		 			}]	
		 			
		 			
		 	]},
			 layout: 'noBorders'
		 
 }]
 
		
var extendSealSignature2HK=[{
		margin:[20,2,0,0],
		columns: [
			{//1st column starts
				width: '*',
				stack:[//for left side
					certificateData.renewalEndorse2[0] ? {
						image : sourceToDataURL(sealType),
						width : 80,
						height : 80,
						margin:[10,20,0,0]
			 			}:{
			 				text:'',
			 			},
			 			{
			 				text:'(Seal or stamp of issuing authority, as appropriate)',
	 						fontSize : 10,
	 						bold : false,
	 						margin:certificateData.renewalEndorse2[0]?[0,13,0,0]:[0,110,0,0]
			 			}
				]	
			},//1st column ends
			
			{//2nd column starts
				width: 34,
				stack:[//for right side
 					{
 						text:'Signed:',
 						fontSize : 10,
 						bold : false,
 						margin:[0,15,0,0]
 					
 					},
 					{
 						text:'Place:',
 						fontSize : 10,
 						bold : false,
 						margin:[0,33,0,0]
 					
 					},
 					{
 						text:'Date: ',
 						fontSize : 10,
 						bold : false,
 						margin:[0,33,0,0]
 					
 					}
 					
 				]},//2nd column ends
	            	
	            	{//3rd column starts
						width: '*',
						 margin : [ 0,0,20,0 ],
						stack:[
							certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].signToPrint==1?{
							//false ?{
							image : 'data:image/jpeg;base64,'+certificateData.renewalEndorse2[0].issuerSign,
							width : 60,
							height : 20,
							alignment:'center'
							//fit: [100, 100]
							
							}:{
							text:'',
							},
							{
								 margin:certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].signToPrint==1?[0,0,0,0]:[0,20,0,0],
								 canvas : [{
											type : 'line',
											x1 : 0,
											y1 : 5,
											x2 : 209,
											y2 : 5
											
											
								 }]
							 },
							 {
			            			text :certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].nameToPrint==1?certificateData.renewalEndorse2[0].issuerName:'(Name)\n',	
			            			fontSize : 10,
			            			italics:certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].nameToPrint==1?false:true,
			            			alignment:'left',
			            			margin : [ 0,0,4,0 ]
			            			
							 },
							 {
			            			text :certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title?certificateData.renewalEndorse2[0].title:'(Appointment)',	
			            			fontSize : 10,
			            			italics:certificateData.renewalEndorse2[0] && certificateData.renewalEndorse2[0].title?false:true,
			            			alignment:'left',
			            			margin : [ 0,0,6,0 ]
			            			
							 },
							 {
			            			text :certificateData.renewalEndorse2[0]?certificateData.renewalEndorse2[0].auditPlace:'',	
			            			fontSize : 10,
			            			bold : false,
			            			margin : [ 0,10,0,0 ],
			            			
							 },
							 {
								 margin:certificateData.renewalEndorse2[0]?[0,0,0,0]:[0,10,0,0],
								 canvas : [{
											type : 'line',
											x1 : 0,
											y1 : 5,
											x2 : 209,
											y2 : 5
											
											
								 }]
							 },
							 {
			            			text :certificateData.renewalEndorse2[0]?certificateData.renewalEndorse2[0].issuerSignDate:'',	
			            			fontSize : 10,
			            			bold : false,
			            			margin : [ 0,30,0,0 ]
			            			
							 },
							 {
								 margin:certificateData.renewalEndorse2[0]?[0,0,0,0]:[0,10,0,0],	
								 canvas : [{
											type : 'line',
											x1 : 0,
											y1 : 5,
											x2 : 209,
											y2 : 5
											
											
								 }]
							 }]
	            	}//3rd column ends
			]
		}]	
		
		 var endorsement4HK=[{
			 margin : [ 20,18,0,0 ],
			 table:{
				widths: [490],
		 		body : 
		 			[[{
		 				text : 'ENDORSEMENT FOR ADDITIONAL SURVEY \n',
		 				bold : true,
		 				fontSize : 10,
		 				alignment:'center'
		 				
		 			}],
		 			
		 			[{
		 				fontSize : 10,
		 				margin : [ 0,5,0,0 ],
	 					
		 				text:[{
		 						text : 'At an additional survey in accordance with regulation 10 of the Annex to the Convention, the ship was found to comply\n with the relevant provisions of the Convention.',
		 						bold : false,
		 						
		 					}]
		 			}]	
		 			
		 			
		 	]},
			 layout: 'noBorders'
			 
		 }]
		 //certificateData.additional1[0] || certificateData.additional1.length==0 
		var additional = certificateData.additional1[0] ? certificateData.additional1[0] :''
		var additional2 = certificateData.additional2[0] ? certificateData.additional2[0] :''
			var additional3 = certificateData.additional3[0] ? certificateData.additional3[0] :''
		 
		/*var additionalSurveyHK=[{
			margin:[20,10,0,0],
			columns: [
				{//1st column starts
					width: '*',
					stack:[//for left side
						 additional.signToPrint ==1? {
							image : sourceToDataURL(sealType),
							width : 80,
							height : 80,
							margin:[10,20,0,0]
				 			}:(additional2.signToPrint ==1?{
				 				image : sourceToDataURL(sealType),
								width : 80,
								height : 80,
								margin:[10,20,0,0]
				 			}:{
				 				text:'',
				 			}),
				 			{
				 				text:'(Seal or stamp of issuing authority, as appropriate)',
		 						fontSize : 10,
		 						bold : false,
		 						margin:additional.signToPrint ?(additional.signToPrint?[0,13,0,0]:[0,110,0,0]):(additional2.signToPrint?[0,13,0,0]:[0,110,0,0])
				 			}
					]	
				},//1st column ends
				
				{//2nd column starts
					width: 34,
					stack:[//for right side
	 					{
	 						text:'Signed:',
	 						fontSize : 10,
	 						bold : false,
	 						margin:[0,15,0,0]
	 					
	 					},
	 					{
	 						text:'Place:',
	 						fontSize : 10,
	 						bold : false,
	 						margin:[0,33,0,0]
	 					
	 					},
	 					{
	 						text:'Date: ',
	 						fontSize : 10,
	 						bold : false,
	 						margin:[0,33,0,0]
	 					
	 					}
	 					
	 				]},//2nd column ends
		            	
		            	{//3rd column starts
							width: '*',
							 margin : [ 0,0,20,0 ],
							stack:[
								 additional.signToPrint==1 ?{
								//false ?{
								image : 'data:image/jpeg;base64,'+ additional.issuerSign,
								width : 60,
								height : 20,
								alignment:'center'
								//fit: [100, 100]
								}:(additional2.signToPrint==1?{
									image : 'data:image/jpeg;base64,'+ additional2.issuerSign,
									width : 60,
									height : 20,
									alignment:'center'
								}:{
									text:'',
								}),
								{
									 margin: additional.signToPrint ?(additional.signToPrint?[0,0,0,0]:[0,20,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,20,0,0]),
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 209,
												y2 : 5
												
												
									 }]
								 },
								 {
				            			text : additional.nameToPrint==1 ?(additional.nameToPrint==1?additional.issuerName:'(Name)\n'):(additional2.nameToPrint==1?additional2.issuerName:'(Name)\n'),	
				            			fontSize : 10,
				            			italics: additional.nameToPrint==1 ?(additional.nameToPrint==1?false:true):(additional2.nameToPrint==1?false:true),
				            			alignment:'left',
				            			margin : [ 0,0,4,0 ]
				            			
								 },
								 {
				            			text : additional.nameToPrint==1?(additional.nameToPrint==1? additional.title:'(Appointment)'):(additional2.nameToPrint==1? additional2.title:'(Appointment)'),	
				            			fontSize : 10,
				            			italics: additional.nameToPrint==1 ?(additional.nameToPrint==1?false:true):(additional2.nameToPrint==1?false:true),
				            			alignment:'left',
				            			margin : [ 0,0,6,0 ]
				            			
								 },
								 {
				            			text : additional.ihmDocumentNo == certificateData.ihmDocumentNo ?additional.auditPlace :(additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.auditPlace:''),	
				            			fontSize : 10,
				            			bold : false,
				            			margin : [ 0,10,0,0 ],
				            			
								 },
								 {
									 margin: additional.signToPrint?(additional.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]),
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 209,
												y2 : 5
												
												
									 }]
								 },
								 {
				            			text : additional.ihmDocumentNo == certificateData.ihmDocumentNo ? additional.issuerSignDate : (additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.issuerSignDate :''),	
				            			fontSize : 10,
				            			bold : false,
				            			margin : [ 0,30,0,0 ]
				            			
								 },
								 {
									margin: additional.signToPrint ?(additional.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]),	
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 209,
												y2 : 5
												
												
									 }]
								 }]
		            	}//3rd column ends
				]
			}]	*/
		
		 
		
		
		var fourthPageFooterHK=[{
			margin:[20,8,0,0],
	
			 table: {
				 	widths: [225, 175, 'auto'],
					
			    	
		            body: 
		            	[[
		            		{
		            			text :'',
		            			
		            		},
		            		{
		            			text :'4 of 4',
		            			fontSize: 9,
		            			bold:false,
		            		
		            		},
		            		{
		            			
		    					text : footerNote,
		    					alignment : 'right',
		    					
		    					fontSize : 9,
		    					
		            		}
		            	]]
		            
			 },
			 layout: 'noBorders'
		 
		 }]
		/* fifth page start*/
		/*var fifthCertificateNoHK=[{
			 columns:[[{
	                text:'Statement Number',
	                fontSize:10,
	                margin:[435,4,0,0]
	                },
	                {
	                    table:{
	                        widths: [86],
							body : [[ {text:certificateData.certificateNo,alignment:'center'}]]                 
	                    },
	                    margin : [ 430,2,0,0 ],fontSize:8
	                }
	         ]]
	          
	     }]*/
		
		
		 /*var fifthBorderHK=[{
			 stack:[
			       {
			    	   pageBreak: 'before',
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 5, y:704,
			                        w: 525,
			                        h: -708,
			                        fillOpacity: 0.5,
			                        lineWidth:2
						        }
						    ]
			       },
			       {
			    	   canvas:[
						        {
						        	type: 'rect',
			                        x: 0, y: 710,
			                        w: 535,
			                        h: -719,
			                        fillOpacity: 0.5
						        }
						]
			       }
			 ]
			 
		 }]
		*/
		var additionalSurveyHK=[{//1st additional survey
			margin:[20,2,0,0],
			columns: [
				{//1st column starts
					width: '*',
					stack:[//for left side
						 additional.signToPrint ==1? {
							image : sourceToDataURL(sealType),
							width : 80,
							height : 80,
							margin:[10,20,0,0]
				 			}:'',
				 			{
				 				text:'(Seal or stamp of issuing authority, as appropriate)',
		 						fontSize : 10,
		 						bold : false,
		 						margin:additional.signToPrint?[0,13,0,0]:[0,110,0,0]
				 			}
					]	
				},//1st column ends
				
				{//2nd column starts
					width: 34,
					stack:[//for right side
	 					{
	 						text:'Signed:',
	 						fontSize : 10,
	 						bold : false,
	 						margin:[0,15,0,0]
	 					
	 					},
	 					{
	 						text:'Place:',
	 						fontSize : 10,
	 						bold : false,
	 						margin:[0,33,0,0]
	 					
	 					},
	 					{
	 						text:'Date: ',
	 						fontSize : 10,
	 						bold : false,
	 						margin:[0,33,0,0]
	 					
	 					}
	 					
	 				]},//2nd column ends
		            	
		            	{//3rd column starts
							width: '*',
							 margin : [ 0,0,20,0 ],
							stack:[
								 additional.signToPrint==1 ?{
								//false ?{
								image : 'data:image/jpeg;base64,'+ additional.issuerSign,
								width : 60,
								height : 20,
								alignment:'center'
								//fit: [100, 100]
								}:'',
								{
									 margin: additional.signToPrint?[0,0,0,0]:[0,20,0,0],
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 209,
												y2 : 5
												
												
									 }]
								 },
								 {
				            			text : additional.nameToPrint==1 ?additional.issuerName:'(Name)\n',	
				            			fontSize : 10,
				            			italics: additional.nameToPrint==1 ?false:true,
				            			alignment:'left',
				            			margin : [ 0,0,4,0 ]
				            			
								 },
								 {
				            			text : additional.nameToPrint==1 ?additional.title:'(Appointment)',	
				            			fontSize : 10,
				            			italics: additional.nameToPrint==1 ?false:true,
				            			alignment:'left',
				            			margin : [ 0,0,6,0 ]
				            			
								 },
								 {
				            			text : additional.auditPlace,	
				            			fontSize : 10,
				            			bold : false,
				            			margin : [ 0,10,0,0 ],
				            			
								 },
								 {
									 margin: additional.signToPrint?[0,0,0,0]:[0,10,0,0],
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 209,
												y2 : 5
												
												
									 }]
								 },
								 {
				            			text : additional.issuerSignDate,	
				            			fontSize : 10,
				            			bold : false,
				            			margin : [ 0,30,0,0 ]
				            			
								 },
								 {
									margin: additional.signToPrint?[0,0,0,0]:[0,10,0,0],	
									 canvas : [{
												type : 'line',
												x1 : 0,
												y1 : 5,
												x2 : 209,
												y2 : 5
												
												
									 }]
								 }]
		            	}//3rd column ends
				]
			},{// 2nd additional survey

				margin:[20,2,0,0],
				columns: [
					{//1st column starts
						width: '*',
						stack:[//for left side
							 additional2.signToPrint ==1? {
								image : sourceToDataURL(sealType),
								width : 80,
								height : 80,
								margin:[10,20,0,0]
					 			}:(additional2.signToPrint ==1?{
					 				image : sourceToDataURL(sealType),
									width : 80,
									height : 80,
									margin:[10,20,0,0]
					 			}:{
					 				text:'',
					 			}),
					 			{
					 				text:'(Seal or stamp of issuing authority, as appropriate)',
			 						fontSize : 10,
			 						bold : false,
			 						margin:additional2.signToPrint ?(additional2.signToPrint?[0,13,0,0]:[0,110,0,0]):(additional2.signToPrint?[0,13,0,0]:[0,110,0,0])
					 			}
						]	
					},//1st column ends
					
					{//2nd column starts
						width: 34,
						stack:[//for right side
		 					{
		 						text:'Signed:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,15,0,0]
		 					
		 					},
		 					{
		 						text:'Place:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					},
		 					{
		 						text:'Date: ',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					}
		 					
		 				]},//2nd column ends
			            	
			            	{//3rd column starts
								width: '*',
								 margin : [ 0,0,20,0 ],
								stack:[
									 additional2.signToPrint==1 ?{
									//false ?{
									image : 'data:image/jpeg;base64,'+ additional2.issuerSign,
									width : 60,
									height : 20,
									alignment:'center'
									//fit: [100, 100]
									}:(additional2.signToPrint==1?{
										image : 'data:image/jpeg;base64,'+ additional2.issuerSign,
										width : 60,
										height : 20,
										alignment:'center'
									}:{
										text:'',
									}),
									{
										 margin: additional2.signToPrint ?(additional2.signToPrint?[0,0,0,0]:[0,20,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,20,0,0]),
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text : additional2.nameToPrint==1 ?(additional2.nameToPrint==1?additional2.issuerName:'(Name)\n'):(additional2.nameToPrint==1?additional2.issuerName:'(Name)\n'),	
					            			fontSize : 10,
					            			italics: additional2.nameToPrint==1 ?(additional2.nameToPrint==1?false:true):(additional2.nameToPrint==1?false:true),
					            			alignment:'left',
					            			margin : [ 0,0,4,0 ]
					            			
									 },
									 {
					            			text : additional2.nameToPrint==1?(additional2.nameToPrint==1? additional.title:'(Appointment)'):(additional2.nameToPrint==1? additional2.title:'(Appointment)'),	
					            			fontSize : 10,
					            			italics: additional2.nameToPrint==1 ?(additional2.nameToPrint==1?false:true):(additional2.nameToPrint==1?false:true),
					            			alignment:'left',
					            			margin : [ 0,0,6,0 ]
					            			
									 },
									 {
					            			text : additional2.ihmDocumentNo == certificateData.ihmDocumentNo ?additional2.auditPlace :(additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.auditPlace:''),	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,10,0,0 ],
					            			
									 },
									 {
										 margin: additional2.signToPrint?(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]),
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text : additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.issuerSignDate : (additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.issuerSignDate :''),	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,30,0,0 ]
					            			
									 },
									 {
										margin: additional2.signToPrint ?(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]),	
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 }]
			            	}//3rd column ends
					]
				
			},{
				//3rd additional survey
				margin:[20,2,0,0],
				columns: [
				          
					{//1st column starts
						width: '*',
						stack:[//for left side
							 additional3.signToPrint ==1? {
								image : sourceToDataURL(sealType),
								width : 80,
								height : 80,
								margin:[10,20,0,0]
					 			}:(additional3.signToPrint ==1?{
					 				image : sourceToDataURL(sealType),
									width : 80,
									height : 80,
									margin:[10,20,0,0]
					 			}:{
					 				text:'',
					 			}),
					 			{
					 				text:'(Seal or stamp of issuing authority, as appropriate)',
			 						fontSize : 10,
			 						bold : false,
			 						margin:additional3.signToPrint ?(additional3.signToPrint?[0,13,0,0]:[0,110,0,0]):(additional3.signToPrint?[0,13,0,0]:[0,110,0,0])
					 			}
						]	
					},//1st column ends
					
					{//2nd column starts
						width: 34,
						stack:[//for right side
		 					{
		 						text:'Signed:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,15,0,0]
		 					
		 					},
		 					{
		 						text:'Place:',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					},
		 					
		 					{
		 						text:'Date: ',
		 						fontSize : 10,
		 						bold : false,
		 						margin:[0,33,0,0]
		 					
		 					}
		 					
		 				]},//2nd column ends
			            	
			            	{//3rd column starts
								width: '*',
								 margin : [ 0,0,20,0 ],
								stack:[
									 additional3.signToPrint==1 ?{
									//false ?{
									image : 'data:image/jpeg;base64,'+ additional3.issuerSign,
									width : 60,
									height : 20,
									alignment:'center'
									//fit: [100, 100]
									}:(additional3.signToPrint==1?{
										image : 'data:image/jpeg;base64,'+ additional3.issuerSign,
										width : 60,
										height : 20,
										alignment:'center'
									}:{
										text:'',
									}),
									{
										 margin: additional3.signToPrint ?(additional3.signToPrint?[0,0,0,0]:[0,20,0,0]):(additional3.signToPrint?[0,0,0,0]:[0,20,0,0]),
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text : additional3.nameToPrint==1 ?(additional3.nameToPrint==1?additional3.issuerName:'(Name)\n'):(additional3.nameToPrint==1?additional3.issuerName:'(Name)\n'),	
					            			fontSize : 10,
					            			italics: additional3.nameToPrint==1 ?(additional3.nameToPrint==1?false:true):(additional3.nameToPrint==1?false:true),
					            			alignment:'left',
					            			margin : [ 0,0,4,0 ]
					            			
									 },
									 {
					            			text : additional3.nameToPrint==1?(additional3.nameToPrint==1? additional3.title:'(Appointment)'):(additional3.nameToPrint==1? additional3.title:'(Appointment)'),	
					            			fontSize : 10,
					            			italics: additional3.nameToPrint==1 ?(additional3.nameToPrint==1?false:true):(additional3.nameToPrint==1?false:true),
					            			alignment:'left',
					            			margin : [ 0,0,6,0 ]
					            			
									 },
									 {
					            			text : additional3.ihmDocumentNo == certificateData.ihmDocumentNo ?additional3.auditPlace :(additional3.ihmDocumentNo == certificateData.ihmDocumentNo ? additional3.auditPlace:''),	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,10,0,0 ],
					            			
									 },
									 {
										 margin: additional3.signToPrint?(additional3.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional3.signToPrint?[0,0,0,0]:[0,10,0,0]),
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 },
									 {
					            			text : additional3.ihmDocumentNo == certificateData.ihmDocumentNo ? additional3.issuerSignDate : (additional3.ihmDocumentNo == certificateData.ihmDocumentNo ? additional3.issuerSignDate :''),	
					            			fontSize : 10,
					            			bold : false,
					            			margin : [ 0,30,0,0 ]
					            			
									 },
									 {
										margin: additional3.signToPrint ?(additional3.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional3.signToPrint?[0,0,0,0]:[0,10,0,0]),	
										 canvas : [{
													type : 'line',
													x1 : 0,
													y1 : 5,
													x2 : 209,
													y2 : 5
													
													
										 }]
									 }]
			            	}//3rd column ends
					]
				
			}]	 
		
		/*var fifthPageFooterHK=[{
			margin:[20,160,0,0],
	
			 table: {
				 	widths: [225, 175, 'auto'],
					
			    	
		            body: 
		            	[[
		            		{
		            			text :'',
		            			
		            		},
		            		{
		            			text :'5 of 5',
		            			fontSize: 9,
		            			bold:false,
		            		
		            		},
		            		{
		            			
		    					text : footerNote,
		    					alignment : 'right',
		    					
		    					fontSize : 9,
		    					
		            		}
		            	]]
		            
			 },
			 layout: 'noBorders'
		 
		 }]
		*/
		 var crossLineFourthPageHk=voidStatus==true?{//crossLine fourth page hk
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';
		   
		   var crossLineFifthPageHk=voidStatus==true?{//crossLine fifth page hk
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
		],
		absolutePosition:{x:45,y:800} 
		   }:'';
		   
		   var crossLineAdditionalHK=[{ //crossline for additional survey
			   columns: [(additionalCross1)?{
			         	stack :[{
			         		width : '1',
			         		text :'VERIFICATION PREVIOUSLY CARRIED OUT',
			         		fontSize : 15,
			         		absolutePosition: {x:100, y:340}
			         		},
			         	{
			         			canvas : [ {
			         				type : 'line',
			         				x1 : 20,
			         				y1 : -270,
			         				x2 : 510,
			         				y2 : -390,
			         				lineWidth : 1
			         			}]
			         	}]
			   }:'']
		   }]
		   
		   var crossLineAdditionalHK1=[{ //crossline for additional survey
			   columns: [(additionalCross2)?{
			         	stack :[{
			         		width : '1',
			         		text :'VERIFICATION PREVIOUSLY CARRIED OUT',
			         		fontSize : 15,
			         		absolutePosition: {x:100, y:470}
			         		},
			         	{
			         			canvas : [ {
			         				type : 'line',
			         				x1 : 20,
			         				y1 : -150,
			         				x2 : 510,
			         				y2 : -250,
			         				lineWidth : 1
			         			}]
			         	}]
			   }:'']
		   }]
		   
		   var crossLineAdditionalHK2=[{ //crossline for additional survey
			   columns: [(additionalCross3)?{
			         	stack :[{
			         		width : '1',
			         		text :'VERIFICATION PREVIOUSLY CARRIED OUT',
			         		fontSize : 15,
			         		absolutePosition: {x:100, y:590}
			         		},
			         	{
			         			canvas : [ {
			         				type : 'line',
			         				x1 : 20,
			         				y1 : -30,
			         				x2 : 510,
			         				y2 : -150,
			         				lineWidth : 1
			         			}]
			         	}]
			   }:'']
		   }]
		 
		 
		 //fourth page eu
	
		
	 var fourthBorderEU=[{
		 stack:[
		       {
		    	   pageBreak: 'before',
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 5, y:704,
		                        w: 525,
		                        h: -708,
		                        fillOpacity: 0.5,
		                        lineWidth:2
					        }
					    ]
		       },
		       {
		    	   canvas:[
					        {
					        	type: 'rect',
		                        x: 0, y: 710,
		                        w: 535,
		                        h: -719,
		                        fillOpacity: 0.5
					        }
					]
		       }
		 ]
		 
	 }]
	 
	 var fourthCertificateNoEU=[{
		 columns:[[{
                text:'Statement Number',
                fontSize:10,
                margin:[435,4,0,0]
                },
                {
                    table:{
                        widths: [86],
						body : [[{text:certificateData.certificateNo,alignment:'center'}]]                 
                    },
                    margin : [ 430,2,0,0 ],fontSize:8
                }
         ]]
          
     }]
	
	 var endorsement2EU=[{
		 
		 margin : [ 20,25,0,0 ],
		 table:{
			widths: [490],
	 		body : 
	 			[[{
	 				text : 'ENDORSEMENT TO ADDITIONAL SURVEY',
	 				bold : true,
	 				fontSize : 10,
	 				margin : [ 15,0,0,0 ],
	 				alignment:'center'
	 				
	 			}],
	 			
	 			
	 			[{
	 				fontSize : 10,
	 				margin : [ 0,10,0,0 ],
 					
	 				text:[{
	 						text : 'At an additional survey in accordance with Article 8, paragraph 6 of Regulation (EU) 1257/2013, the ship was found to comply with the relevant provisions of this Regulation.',
	 						bold : false,
	 						
	 				}]
	 			}]	
	 			
	 			
	 	]},
		 layout: 'noBorders'
	 
}]
		 
var additional = certificateData.additional1[0]? certificateData.additional1[0] :''
var additional2 = certificateData.additional2[0]? certificateData.additional2[0] :''
	var additional3 = certificateData.additional3[0]? certificateData.additional3[0] :''
	console.log(additional);
var sign=additional.signToPrint==1 ? 'data:image/jpeg;base64,'+additional.issuerSign:'sign';
			 
var extendSealSignature2EU=[{//1st additional section
	margin:[20,10,0,0],
	columns: [
		{//1st column starts
			width: '*',
			stack:[//for left side
				additional.signToPrint ? {
					image : sourceToDataURL(sealType),
					width : 80,
					height : 80,
					margin:[10,20,0,0]
		 			}:'',
		 			{
		 				text:'(Seal or stamp of issuing authority, as appropriate)',
 						fontSize : 10,
 						bold : false,
 						margin:additional.signToPrint?[0,13,0,0]:[0,110,0,0]
		 			}
			]	
		},//1st column ends
		
		{//2nd column starts
			width: 34,
			stack:[//for right side
					{
						text:'Signed:',
						fontSize : 10,
						bold : false,
						margin:[0,15,0,0]
					
					},
					{
						text:'Place:',
						fontSize : 10,
						bold : false,
						margin:[0,33,0,0]
					
					},
					{
						text:'Date: ',
						fontSize : 10,
						bold : false,
						margin:[0,33,0,0]
					
					}
					
				]},//2nd column ends
            	
            	{//3rd column starts
					width: '*',
					 margin : [ 0,0,20,0 ],
					stack:[
						additional.signToPrint==1 ?{
						//false ?{
						image : 'data:image/jpeg;base64,'+additional.issuerSign,
						width : 60,
						height : 20,
						alignment:'center'
						//fit: [100, 100]
						}:'',
						{
							margin:additional.signToPrint ?[0,0,0,0]:[0,20,0,0],
							 canvas : [{
										type : 'line',
										x1 : 0,
										y1 : 5,
										x2 : 209,
										y2 : 5
										
										
							 }]
						 },
						 {
		            			text :additional.nameToPrint==1 ?additional.issuerName:'(Name)\n',	
		            			fontSize : 10,
		            			italics:additional.nameToPrint==1?false:true,
		            			alignment:'left',
		            			margin : [ 0,0,4,0 ]
		            			
						 },
						 {
		            			text :additional.nameToPrint==1 ?additional.title:'(Appointment)',	
		            			fontSize : 10,
		            			italics:additional.nameToPrint==1?false:true,
		            			alignment:'left',
		            			margin : [ 0,0,6,0 ]
		            			
						 },
						 {
		            			text :additional.auditPlace,	
		            			fontSize : 10,
		            			bold : false,
		            			margin : [ 0,10,0,0 ],
		            			
						 },
						 {
							 margin:additional.signToPrint ?[0,0,0,0]:[0,10,0,0],
							 canvas : [{
										type : 'line',
										x1 : 0,
										y1 : 5,
										x2 : 209,
										y2 : 5
										
										
							 }]
						 },
						 {
		            			text : additional.issuerSignDate,	
		            			fontSize : 10,
		            			bold : false,
		            			margin : [ 0,30,0,0 ]
		            			
						 },
						 {
							margin:additional.signToPrint?[0,0,0,0]:[0,10,0,0],
							 canvas : [{
										type : 'line',
										x1 : 0,
										y1 : 5,
										x2 : 209,
										y2 : 5
										
										
							 }]
						 }]
            	}//3rd column ends
		]
	},
	{ //2nd additional section
		margin:[20,10,0,0],
		columns: [
		          {//1st column starts
		        	  width: '*',
		        	  stack:[//for left side
		        	         additional2.signToPrint ? {
		        	        	 image : sourceToDataURL(sealType),
		        	        	 width : 80,
		        	        	 height : 80,
		        	        	 margin:[10,20,0,0]
		        	         	}:(additional2.signToPrint?{
		        	         		image : sourceToDataURL(sealType),
		        	         		width : 80,
		        	         		height : 80,
		        	         		margin:[10,20,0,0]
		        	         	}:''),
		        	         	{
		        	         		text:'(Seal or stamp of issuing authority, as appropriate)',
		        	         		fontSize : 10,
		        	         		bold : false,
		        	         		margin:additional2.signToPrint?(additional2.signToPrint?[0,13,0,0]:[0,110,0,0]):(additional2.signToPrint?[0,13,0,0]:[0,110,0,0])
		        	         	}
		        	         ]	
		          },//1st column ends
		
		{//2nd column starts
			width: 34,
			stack:[//for right side
					{
						text:'Signed:',
						fontSize : 10,
						bold : false,
						margin:[0,15,0,0]
					
					},
					{
						text:'Place:',
						fontSize : 10,
						bold : false,
						margin:[0,33,0,0]
					
					},
					{
						text:'Date: ',
						fontSize : 10,
						bold : false,
						margin:[0,33,0,0]
					
					}
					
				]},//2nd column ends
            	
            	{//3rd column starts
					width: '*',
					 margin : [ 0,0,20,0 ],
					stack:[
						additional2.signToPrint==1 ?{
						//false ?{
						image : 'data:image/jpeg;base64,'+additional2.issuerSign,
						width : 60,
						height : 20,
						alignment:'center'
						//fit: [100, 100]
						}:(additional2.signToPrint==1?{
							image : 'data:image/jpeg;base64,'+additional2.issuerSign,
							width : 60,
							height : 20,
							alignment:'center'
						}:{
							text:'',
						}),
						{
							margin:additional2.signToPrint ?(additional2.signToPrint?[0,0,0,0]:[0,20,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,20,0,0]),
							 canvas : [{
										type : 'line',
										x1 : 0,
										y1 : 5,
										x2 : 209,
										y2 : 5
										
										
							 }]
						 },
						 {
		            			text :additional2.nameToPrint==1 ?(additional2.nameToPrint==1?additional2.issuerName:'(Name)\n'):(additional2.nameToPrint==1?additional2.issuerName:'(Name)\n'),	
		            			fontSize : 10,
		            			italics:additional2.nameToPrint==1?(additional2.nameToPrint==1?false:true):(additional2.nameToPrint==1?false:true),
		            			alignment:'left',
		            			margin : [ 0,0,4,0 ]
		            			
						 },
						 {
		            			text :additional2.nameToPrint==1 ?(additional2.nameToPrint==1?additional2.title:'(Appointment)'):(additional2.nameToPrint==1?additional2.title:'(Appointment)'),	
		            			fontSize : 10,
		            			italics:additional2.nameToPrint==1?(additional2.nameToPrint==1?false:true):(additional2.nameToPrint==1?false:true),
		            			alignment:'left',
		            			margin : [ 0,0,6,0 ]
		            			
						 },
						 {
		            			text :additional2.ihmDocumentNo == certificateData.ihmDocumentNo? additional2.auditPlace :(additional2.ihmDocumentNo == certificateData.ihmDocumentNo? additional2.auditPlace :''),	
		            			fontSize : 10,
		            			bold : false,
		            			margin : [ 0,10,0,0 ],
		            			
						 },
						 {
							 margin:additional2.signToPrint ?(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional2.signToPrint?[0,0,0,0]:[0,10,0,0]),
							 canvas : [{
										type : 'line',
										x1 : 0,
										y1 : 5,
										x2 : 209,
										y2 : 5
										
										
							 }]
						 },
						 {
		            			text :additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.issuerSignDate : (additional2.ihmDocumentNo == certificateData.ihmDocumentNo ? additional2.issuerSignDate :''),	
		            			fontSize : 10,
		            			bold : false,
		            			margin : [ 0,30,0,0 ]
		            			
						 },
						 {
							margin:additional2.signToPrint ? (additional2.signToPrint?[0,0,0,0]:[0,10,0,0]): (additional2.signToPrint?[0,0,0,0]:[0,10,0,0]),
							 canvas : [{
										type : 'line',
										x1 : 0,
										y1 : 5,
										x2 : 209,
										y2 : 5
										
										
							 }]
						 }]
            	}//3rd column ends
		]
	},
	{ //3rd additional section
	margin:[20,10,0,0],
	columns: [
	          {//1st column starts
	        	  width: '*',
	        	  stack:[//for left side
	        	         additional3.signToPrint ? {
	        	        	 image : sourceToDataURL(sealType),
	        	        	 width : 80,
	        	        	 height : 80,
	        	        	 margin:[10,20,0,0]
	        	         	}:(additional3.signToPrint?{
	        	         		image : sourceToDataURL(sealType),
	        	         		width : 80,
	        	         		height : 80,
	        	         		margin:[10,20,0,0]
	        	         	}:''),
	        	         	{
	        	         		text:'(Seal or stamp of issuing authority, as appropriate)',
	        	         		fontSize : 10,
	        	         		bold : false,
	        	         		margin:additional3.signToPrint?(additional3.signToPrint?[0,13,0,0]:[0,110,0,0]):(additional3.signToPrint?[0,13,0,0]:[0,110,0,0])
	        	         	}
	        	         ]	
	          },//1st column ends
	
	{//2nd column starts
		width: 34,
		stack:[//for right side
				{
					text:'Signed:',
					fontSize : 10,
					bold : false,
					margin:[0,15,0,0]
				
				},
				{
					text:'Place:',
					fontSize : 10,
					bold : false,
					margin:[0,33,0,0]
				
				},
				{
					text:'Date: ',
					fontSize : 10,
					bold : false,
					margin:[0,33,0,0]
				
				}
				
			]},//2nd column ends
        	
        	{//3rd column starts
				width: '*',
				 margin : [ 0,0,20,0 ],
				stack:[
					additional3.signToPrint==1 ?{
					//false ?{
					image : 'data:image/jpeg;base64,'+additional3.issuerSign,
					width : 60,
					height : 20,
					alignment:'center'
					//fit: [100, 100]
					}:(additional3.signToPrint==1?{
						image : 'data:image/jpeg;base64,'+additional3.issuerSign,
						width : 60,
						height : 20,
						alignment:'center'
					}:{
						text:'',
					}),
					{
						margin:additional3.signToPrint ?(additional3.signToPrint?[0,0,0,0]:[0,20,0,0]):(additional3.signToPrint?[0,0,0,0]:[0,20,0,0]),
						 canvas : [{
									type : 'line',
									x1 : 0,
									y1 : 5,
									x2 : 209,
									y2 : 5
									
									
						 }]
					 },
					 {
	            			text :additional3.nameToPrint==1 ?(additional3.nameToPrint==1?additional3.issuerName:'(Name)\n'):(additional3.nameToPrint==1?additional3.issuerName:'(Name)\n'),	
	            			fontSize : 10,
	            			italics:additional3.nameToPrint==1?(additional3.nameToPrint==1?false:true):(additional3.nameToPrint==1?false:true),
	            			alignment:'left',
	            			margin : [ 0,0,4,0 ]
	            			
					 },
					 {
	            			text :additional3.nameToPrint==1 ?(additional3.nameToPrint==1?additional3.title:'(Appointment)'):(additional3.nameToPrint==1?additional3.title:'(Appointment)'),	
	            			fontSize : 10,
	            			italics:additional3.nameToPrint==1?(additional3.nameToPrint==1?false:true):(additional3.nameToPrint==1?false:true),
	            			alignment:'left',
	            			margin : [ 0,0,6,0 ]
	            			
					 },
					 {
	            			text :additional3.ihmDocumentNo == certificateData.ihmDocumentNo? additional3.auditPlace :(additional3.ihmDocumentNo == certificateData.ihmDocumentNo? additional3.auditPlace :''),	
	            			fontSize : 10,
	            			bold : false,
	            			margin : [ 0,10,0,0 ],
	            			
					 },
					 {
						 margin:additional3.signToPrint ?(additional3.signToPrint?[0,0,0,0]:[0,10,0,0]):(additional3.signToPrint?[0,0,0,0]:[0,10,0,0]),
						 canvas : [{
									type : 'line',
									x1 : 0,
									y1 : 5,
									x2 : 209,
									y2 : 5
									
									
						 }]
					 },
					 {
	            			text :additional3.ihmDocumentNo == certificateData.ihmDocumentNo ? additional3.issuerSignDate : (additional3.ihmDocumentNo == certificateData.ihmDocumentNo ? additional3.issuerSignDate :''),	
	            			fontSize : 10,
	            			bold : false,
	            			margin : [ 0,30,0,0 ]
	            			
					 },
					 {
						margin:additional3.signToPrint ? (additional3.signToPrint?[0,0,0,0]:[0,10,0,0]): (additional3.signToPrint?[0,0,0,0]:[0,10,0,0]),
						 canvas : [{
									type : 'line',
									x1 : 0,
									y1 : 5,
									x2 : 209,
									y2 : 5
									
									
						 }]
					 }]
        	}//3rd column ends
			]
		}]	
	
	
	  
	
	
	var fourthPageFooterEU=[{
		margin:[20,180,0,0],

		 table: {
			 	widths: [225, 175, 'auto'],
				
		    	
	            body: 
	            	[[
	            		{
	            			text :'',
	            			
	            		},
	            		{
	            			text :'4 of 4',
	            			fontSize: 9,
	            			bold:false,
	            		
	            		},
	            		{
	            			
	    					text : footerNote,
	    					alignment : 'right',
	    					
	    					fontSize : 9,
	    					
	            		}
	            	]]
	            
		 },
		 layout: 'noBorders'
	 
	 }]


	var crossLineFourthPageEu=voidStatus==true?{//crossLine fourth page eu
		canvas : [ {
			type : 'line',
		   	x1 : 0,
			y1 : -40,
			x2 : 525,
			y2 : -765,
			lineColor:'red',
			lineWidth : 2
		} 
],
absolutePosition:{x:45,y:800} 
   }:'';
   
   var crossLineAdditionalEU=[{ //cross line for additional survey
	   columns: [(additionalCross1) ?{
	         	stack :[{
	         		width : '1',
	         		text :'VERIFICATION PREVIOUSLY CARRIED OUT',
	         		fontSize : 15,
	         		absolutePosition: {x:100, y:160}
	         		},
	         	{
	         			canvas : [ {
	         				type : 'line',
	         				x1 : 10,
	         				y1 : -270,
	         				x2 : 500,
	         				y2 : -380,
	         				lineWidth : 1,
	         				
	         			}]
	         	}]
	   }:'']
   }]
   
   var crossLineAdditionalEU2=[{ //cross line for additional survey
	   columns: [(additionalCross2) ?{
	         	stack :[{
	         		width : '1',
	         		text :'VERIFICATION PREVIOUSLY CARRIED OUT',
	         		fontSize : 15,
	         		absolutePosition: {x:100, y:280}
	         		},
	         	{
	         			canvas : [ {
	         				type : 'line',
	         				x1 : 10,
	         				y1 : -340,
	         				x2 : 520,
	         				y2 : -440,
	         				lineWidth : 1,
	         				
	         			}]
	         	}]
	   }:'']
   }]
   
   var crossLineAdditionalEU3=[{ //cross line for additional survey
	   columns: [(additionalCross3) ?{
	         	stack :[{
	         		width : '1',
	         		text :'VERIFICATION PREVIOUSLY CARRIED OUT',
	         		fontSize : 15,
	         		absolutePosition: {x:100, y:420}
	         		},
	         	{
	         			canvas : [ {
	         				type : 'line',
	         				x1 : 10,
	         				y1 : -200,
	         				x2 : 510,
	         				y2 : -290,
	         				lineWidth : 1,
	         				
	         			}]
	         	}]
	   }:'']
   }]
	//fourth page end
	
	
	if(certType=='HK'){
		docDef.content.push(borderHK,headerSecHK,shipHK,shipDetailsHK,footerHK,crossLineFirstPageHk,secondBorderHK,certificateNoHK, inventoryHazardousHK,identVerifyHK,noteHK,pointsHK,dateHK,sealImageHK,sealHK,SecondPagefooterHK,crossLineSecondPageHk,thirdBorderHK,thirdCertificateNoHK,endorsement1HK,extendSealSignature1HK,endorsement2HK,renewalSealSignatureHK,thirdPageFooterHK,crossLineThirdPageHk,fourthBorderHK,fourthCertificateNoHK,endorsement3HK,extendSealSignature2HK,endorsement4HK,additionalSurveyHK,fourthPageFooterHK,crossLineFourthPageHk,crossLineAdditionalHK,crossLineAdditionalHK1,crossLineAdditionalHK2);

		
	}else if(certType=='EU'){
		docDef.content.push(borderEU,headerSecEU,shipEU,shipDetailsEU,footerEU,crossLineFirstPageEu,secondBorderEU,certificateNoEU,inventoryHazardousEU,identVerifyEU,noteEU,pointsEU,dateEU,sealImageEU,sealEU,SecondPagefooterEU,crossLineSecondPageEu,thirdBorderEU,thirdCertificateNoEU,endorsement1EU,extendSealSignature1EU,thirdPageFooterEU,crossLineThirdPageEu,fourthBorderEU,fourthCertificateNoEU,endorsement2EU,extendSealSignature2EU,crossLineAdditionalEU,fourthPageFooterEU,crossLineFourthPageEu,crossLineAdditionalEU2,crossLineAdditionalEU3);

		
	}else{
		docDef.content.push(borderExemption,headerSecExemption,shipExemption,shipDetailsExemption, certifyExemption,certificateExemption,exemptionCertificateExemption,sealImageExemption,sealExemption,footerExemption,crossLineFirstPageExe);
		
	}
		 
		return docDef;
		}
		
		function amendmentLetter(certificateData) {

			$('#canvas').remove();

			console.log(certificateData);

			var issuedatecontent = '', certificatecontent = '', certificatecontent1 = '', tempreview = '';

			var canvasEle = document.createElement('canvas');

			canvasEle.id = "canvas";
			canvasEle.width = 797;
			canvasEle.height = 1122;

			var body = document.getElementsByTagName("body")[0];
			body.appendChild(canvasEle);

			var canvashidden = angular.element(document
					.querySelector('#canvas'));
			canvashidden.addClass('hidden');

			var image1 = new Image();

			var doc = new jsPDF('p', 'mm', 'a4');
			var canvas = document.getElementById("canvas"), revdate = "Sep/2017",

			lines, top = 70, left = 90;
			var ctx = canvas.getContext('2d');

			function wrapText(context, text, x, maxWidth, lineHeight) {

				var words = text.split(' '), line = '', lineCount = 0, i, test, metrics;

				for (i = 0; i < words.length; i++) {
					test = words[i];
					metrics = context.measureText(test);
					while (metrics.width > maxWidth) {
						test = test.substring(0, test.length - 1);
						metrics = context.measureText(test);
					}
					if (words[i] != test) {
						words.splice(i + 1, 0, words[i].substr(test.length))
						words[i] = test;
					}

					test = line + words[i] + ' ';
					metrics = context.measureText(test);

					if (metrics.width > maxWidth && i > 0) {
						context.fillText(line, x, top);
						top += 20;
						line = words[i] + ' ';
						lineCount++;
					} else {
						line = test;
					}
				}

				context.fillText(line, x, top);
				top += 20;
			}

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			var images = document.getElementById("images");

			ctx.fillStyle = "#000000";

			ctx.drawImage(images, left + 20, top - 20, 100, 100);

			ctx.font = "500 12px italic";

			ctx.fillText("Maritime Administrator", left + 15, top + 100);

			ctx.font = "800 21px Times New Roman";
			ctx.fillText("Republic of the Marshall Islands", left + 180,
					top = top + 15);

			ctx.font = "800 16px Times New Roman";
			ctx.fillText("Maritime Administrator", left + 240, top = top + 30);

			ctx.font = "500 13px Times New Roman";
			ctx.fillText(
					"11495 Commerce Park Drive, Reston, Virginia 20191-1507",
					left + 180, top = top + 50);

			ctx.fillText("Telephone: (703) 620-4880   Fax: (703) 476-8522",
					left + 210, top = top + 15);

			ctx
					.fillText(
							"Email: msc@register-iri.com   Website: www.register-iri.com",
							left + 180, top = top + 15);

			ctx.font = "800 15px Times New Roman";
			console.log(certificateData.auditDate);

			ctx.fillText(certificateData.auditDate, left, top = top + 80);

			top = top + 50;

			ctx.font = "800 15px Times New Roman";

			var Addrestemp = certificateData.companyname.split('\n');

			for (var i = 0; i < Addrestemp.length; i++) {

				wrapText(ctx, Addrestemp[i], left, 600, '\n', " ");

			}

			ctx.font = "800 15px Times New Roman";

			var Addrestemp = certificateData.companyaddress.split('\n');

			for (var i = 0; i < Addrestemp.length; i++) {

				wrapText(ctx, Addrestemp[i], left, 600, '\n', " ");

			}

			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				issuedatecontent = ''
						+ certificateData.vesselName
						+ ' (Official Number '
						+ certificateData.officialNo
						+ '; IMO Number '
						+ certificateData.vesselImoNo
						+ ') - Amendment(s) to the Declaration of Maritime Labour Compliance (DMLC), Part II Approval.';

				certificatecontent = 'The DMLC, Part II Amendment(s) revision ('
						+ certificateData.revisionNo
						+ '), dated ('
						+ certificateData.certIssueDate
						+ '), has been reviewed and is considered acceptable pursuant to Standard A5.1.3, paragraph 10 of the Maritime Labour Convention, 2006 (MLC, 2006) and the Republic of the Marshall Islands requirements for implementing MLC, 2006.';

				certificatecontent1 = 'A copy of this letter and associated amendment(s) shall be available on board.';

			} else if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				issuedatecontent = ''
						+ certificateData.vesselName
						+ ' (Official Number '
						+ certificateData.officialNo
						+ '; IMO Number '
						+ certificateData.vesselImoNo
						+ ') - Amendment(s) to the Ship Security Plan (SSP) Approval.';

				certificatecontent = 'This SSP Amendment(s) revision ('
						+ certificateData.revisionNo
						+ '), dated ('
						+ certificateData.certIssueDate
						+ '), has been reviewed and is considered acceptable for compliance with the International Ship and Port Facility Security Code. ';

				certificatecontent1 = 'A copy of this letter and associated amendment(s) shall be available on board and shall be presented together with the International Ship Security Certificate (or the Interim International Ship Security Certificate).';

			}

			top = top + 30;

			ctx.font = "900 15px Times New Roman";
			ctx.fillText("RE : ", left, top);

			ctx.font = "500 16px Times New Roman";
			wrapText(ctx, issuedatecontent, left + 40, 600, 18);

			top = top + 30;

			ctx.fillText("To Whom It May Concern:", left, top);

			top = top + 50;

			wrapText(ctx, certificatecontent, left, 640, 18);

			top = top + 30;

			wrapText(ctx, certificatecontent1, left, 640, 18);

			ctx.fillText("Regards,", left, top = top + 30);

			tempreview = top;
			image1.src = "data:image/png;base64," + certificateData.leadSign;
			ctx.drawImage(image1, left, top = top + 80, 235, 35);

			ctx.lineWidth = 2;
			ctx.beginPath();

			ctx.moveTo(left, top = top + 45);
			ctx.lineTo(left + 300, top);

			ctx.stroke();
			ctx.lineWidth = 1;

			ctx.fillText(certificateData.leadAuditorName, left, top = top + 20);

			top = top + 20;

			wrapText(
					ctx,
					"Issued by the authority of the Republic of the Marshall Islands Maritime Administrator",
					left, 300, 18);

			if (validateSeal(certificateData.title) != '') {

				ctx.drawImage(validateSeal(certificateData.title), left + 450,
						tempreview, 150, 150);

			}

			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				ctx.fillText("MI-400G Rev. 4/18", left + 560, 1100);

			} else if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				ctx.fillText("MSC-296C Rev. 4/18", left + 560, 1100);

			}

			var imgData = canvas.toDataURL('image/jpg', '1.0');

			$('#canvas').remove();

			return imgData;
		}
		
		
		 /** IHM Approve letter*/
		
		function ihmApproveLetter(certificateData){
    		console.log("Audit.service.js => ihmApproveLetter() ");
    		
    		var voidStatus;
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
			
    		
    		var monthNames = ["January", "February", "March", "April", "May", "June",
  		                    "July", "August", "September", "October", "November", "December"
  		                  ];
    		console.log(certificateData.auditDate)
    		var d = certificateData.auditDate;
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
    		
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		
    		var c = certificateData.certIssueDate;
    		
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var Cdate  = check1.format('MMMM');
    		
    		var splitAuditDate = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate[0]+' '+Cdate+' '+splitAuditDate[2];

    		var companyaddress = certificateData.companyaddress.split("   ");
    		
    		//var userAddress = certificateData.UserAddress;
    		
    		var useraddress = certificateData.userAddress;
    		//var useraddress = '201-202, Raheja Plaza\nPlot No. 15/B, Parksons Press Compound\nShah Industrial Estate\nOff Andheri Link Road\nAndheri West\nMumbai 400 053, India\nTel: +91-22-4064-1111    Fax: +91-22-4064-1110';
    		
    		var addressTel= useraddress.toString().split('\\nTel');
    		if(addressTel.length==1)
    			addressTel= useraddress.toString().split('\nTel');
    		console.log(addressTel)
    		console.log("splitTel "+addressTel.length)
    		var addvi='';
    		for(var i=0;i<addressTel.length-1;i++){
    			
    			var addressTel1=addressTel[i].split('\\n');
    			if(addressTel1.length==1)
    				addressTel1= addressTel[i].split('\n');
    			console.log("splitTel\n"+addressTel1.length)
    			for(var j=0;j<addressTel1.length;j++){
    				if(addvi!=''){
    	    			if(j%3==0)
    	    				addvi += '\n' + addressTel1[j] + ",";
    	    			else	
    	    				addvi += ' ' +addressTel1[j] + ",";
    	    		}else{
        				addvi = addressTel1[j]+ ",";
        			}
    			}
    		}
    		var Tel;
    		if(addressTel.length==1){
    			var addressTel1=addressTel[0].split('\\n');
    			if(addressTel1.length==1)
    				addressTel1= addressTel[0].split('\n');
    			console.log("splitTel\n"+addressTel1.length)
    			for(var j=0;j<addressTel1.length;j++){
    				if(addvi!=''){
    	    			if(j%3==0)
    	    				addvi += '\n' + addressTel1[j] + ",";
    	    			else	
    	    				addvi += ' ' +addressTel1[j]+ ",";
    	    		}else{
        				addvi = addressTel1[j]+ ",";
        			}
    			}
    			if(addvi==''){
    				addvi = addressTel[0].replace('\\n',' ');
    				addvi = addressTel[0].replace('\n',' ');
    			}
		}else if(addressTel.length>1){
				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
		}
    		useraddress = addvi;
    		
    		console.log(companyaddress);
    		var titleImage='';
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		
    		var footerR = 'MI-298K Rev. 3/20';
    		var footerL = splitAuditDate[1]+'/'+splitAuditDate[2];
    		console.log(footerL)
    		
    		var at1 = '',at2 = '';
		  	var atBox1 = [ { type: 'rect', x: 68, y:2.5, w: 8, h: 8, lineColor: '#000',lineWidth: 0.8 } ];
		  	var atBox2 = [ { type: 'rect', x: 68, y:2.5, w: 8, h: 8, lineColor: '#000',lineWidth: 0.8 } ];
		  				
		  	if (certificateData.certificateHk) {
		  		atBox1 = [
				  			{type: 'rect',  x: 68,  y: 2.5, w: 8, h: 8, lineColor: '#000',lineWidth: 0.8 },
		  			        {type: 'line',	x1: 70, y1: 3,x2: 73, y2: 9,lineWidth: 1},
		  			        {type: 'line',	x1: 83, y1: -2,x2: 73, y2: 9,lineWidth: 1}
		  				    ];
		  				}
  						at1 = "the Hong Kong Convention;";
		  						
		  	if (certificateData.certificateEu) {
		  		atBox2 = [
			         		{type: 'rect',  x: 68,  y: 2.5, w: 8, h: 8, lineColor: '#000',lineWidth: 0.8 },
		  			        {type: 'line',	x1: 70, y1: 3,x2: 73, y2: 9,lineWidth: 1},
		  			        {type: 'line',	x1: 83, y1: -2,x2: 73, y2: 9,lineWidth: 1}
		  				    ];
		  			    }
		  			    at2 = "the European Union Ship Recycling Regulation (No. 1257/2013)";

		  			  var ihmApproveletter = {
		      			    ownerPassword: '123456',
		      			    permissions: {
		      			    printing: 'lowResolution',
		      			    modifying: false,
		      			    copying: false,
		      			    annotating: false,
		      			    fillingForms: false,
		      			    contentAccessibility: false,
		      			    documentAssembly: false,
		      			  },
		      			  footer: {
		      			    columns: [
		      			     // 'Left part',
		      			      //{ text: footerL, alignment: 'left', margin : [60,0] },
		      			      { text: footerR, alignment: 'right', margin : [52,0] }
		      			      
		      			    ],
		      			    
		      			  },
		      			  
		      			  defaultStyle:{
		      				  font:'Times'
		      			  },
		      			content: [
		      			  {
		      						columns: [
		      							{
		      							image: sourceToDataURL('logo'),
		      							width: 80, 
		      							height: 80,
		      							margin: [20,10],
		      							
		      							},
		      							{
		        							width:30,
		        							text:'',
		        						},
		      							{ 
		      							    width: '*',
		      			                    text: [
		      			                    	{text: 'R', fontSize: 18, bold: true, color: 'black'},
		          		                        {text: 'epublic of the ', fontSize: 18, bold: true, color: 'black'},
		          		                        {text: 'M', fontSize: 18, bold: true, color: 'black'},
		          		                        {text: 'arshall ', fontSize: 18, bold: true, color: 'black'},
		          		                        {text: 'I', fontSize: 18, bold: true, color: 'black'},
		          		                        {text: 'slands\n', fontSize: 18, bold: true, color: 'black'},
		          		                        {text: 'M', fontSize: 14, bold: true, color: 'black'},
		          		                        {text: 'aritime ', fontSize: 14, bold: true, color: 'black'},
		          		                        {text: 'A', fontSize: 14, bold: true, color: 'black'},
		          		                        {text: 'dministrator\n\n', fontSize: 14, bold: true, color: 'black'},
		      			                        {text: useraddress, fontSize: 10, bold: false, color: 'black'},
		      			                        {text: Tel , fontSize: 10, bold: false, color: 'black'},
		      			                        {text: '\n Email: ihm@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
		      			                    ],
		      								style: 'rightme',
		      								//alignment: 'center',
		      								margin: [-70,10,0,0]
		      							},
		      						] 
		      			    },
		      			    {
		      				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
		      				},
		      				{
		      				    columns: [
		      							{
		      								text:  AuitDate.replace(/^0+/, ''), 
		      								margin: [20, 20, 0, 0],
		      								fontSize: 12
		      							}
		      					]
		      				},
		      				{
		      				    text: [
		      				        {text: 'RE: Inventory of Hazardous Materials (IHM), Part I Approval Letter', bold: true, fontSize: 12}
		      				    ],
		      				    margin:[20, 10, 0, 0]
		      				},
		      				
		      				// Vessel Details
		  	
		  				    {
		      				
		      				  width: '*',
			                    text: [
		      					{text: certificateData.vesselName, fontSize: 12, color: 'black'},
		      					{text: ' (Official Number ', fontSize: 12, color: 'black'},
		      					{text: certificateData.officialNo, fontSize: 12, color: 'black'},
		      					{text: ', IMO Number ', fontSize: 12, color: 'black'},
		      					{text: certificateData.vesselImoNo, fontSize: 12, color: 'black'},
		      					{text: ')', fontSize: 12, color: 'black'},
		      					],
		  					margin: [20, 20, 0, 10],
		  					fontSize: 12
		  				    },
		  				    /*{
		  				    text: certificateData.officialNo,
		  				    margin: [20, 0, 0, 0],
		  				    fontSize: 12
		  				    },
		  				    {
		  				    text : certificateData.vesselImoNo,
		  				    margin: [20, 0, 0, 0],
		  				    fontSize: 12
		  				    },*/
		  				    
		  				    {
		  				    	
		  				    	margin: [20, 0, 0, 0],
		  				    	table: {
		  				    		widths: [515,30],
		  				        	heights: [20,10],
		  				    	body: [
		  				    	    /*[
		  				    	    	{
		  				    			    border: [true, true,true, true],
		  				    	 			fillColor: '',
		  				    				text: [{text: certificateData.companyname, 
		  				    						fontSize: 12,
		  				    						bold:false}]
		  				    			}],*/
		  				    			[
		  				    			{
		  				    				margin: [0, -10, 0, 0],
		  				    			    border: [true, true,true, true],
		  				    	 			fillColor: '',
		  				    				text: [{text: certificateData.companyaddress,
		  				    					    fontSize: 12,
		  				    					    bold:false}]
		  				    			    
		  				    			    
		  				    			}],
		  				    			
		  				    	    ]},
		  				    		layout: 'noBorders'
		  				    },
		  				    
		  				    
		  					/*{
		      				    text: certificateData.companyname,
		      				    margin: [20, 10, 0, 0],
		      				    fontSize: 11
		      				},
		      				{
		          				columns:[
		          				         {
		          			    				width:350,
		          			    			    text: certificateData.companyaddress,
		          			    			    margin: [20, 0, 0, 0],
		          			    			    fontSize: 11
		          				         }
		          				 ]
		          			},*/
		      				/*{
		      				    text: companyaddress[1].replace(/\s+/g, " "),
		      				    margin: [20, 0, 0, 0],
		      				    fontSize: 12
		      				},*/
		      				{
		      				   text: "To Whom It May Concern,",
		      				   margin: [20, 10, 0, 0],
		      				   fontSize: 12
		      				},
		      				{
		      					
		      					text: [
		  	                    	{text:  'Please be advised that the IHM, Part I revision '+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, ''), fontSize: 12, color: 'black'},
		  	                        {text: ', for the vessel named above has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator.', fontSize: 12, color: 'black'},
		  	                        ],
		  	                      
		  	                        margin: [20, 10, 20, 0],
		      				        alignment: 'justify',
		      				  
		      				},
		      				{
		      				    text: 'During the review of the IHM, Part I, it was verified that the IHM, Part I has been developed in accordance with appropriate provisions for:',
		      				    margin:[20, 10, 20, 0],
		      				    alignment: 'justify',
		      				    fontSize: 12
		      				},
		      				{
		  			            margin: [10, 9, 0, 0],
		  			            	table: {
		  						    	widths: [75, 300, 120, 0, 0, 0, 0, 0],
		  						    	
		  						    	
		  							body: [
		  							    [
		  									{
		  						  
		  										border: certificateData.certificateHk?[true, true, false, false]:[true, true, false, true],
		  										canvas: at1!=''?atBox1:[]
		  									},
		  									{
		  										border: certificateData.certificateHk?[false, true, false, false]:[false, true, false, true],
		  										fillColor: '',
		  										text: at1, fontSize: 12, bold:false
		  									},
		  								] ]},
		      							layout: 'noBorders'
		      							
		  			         },
		  			         {
		  				         margin: [10, 9, 0, 0],
		  				            	table: {
		  							    	widths: [75, 500, 120, 0, 0, 0, 0, 0],
		  							    	
		  								body: [
		  								    [
		  										{	
		  											border: certificateData.certificateEu?[false, true, false, false]:[false, true, false, true],
		  											canvas: at2!=''?atBox2:[]
		  										},
		  										{
		  											border: certificateData.certificateEu?[false, true, false, false]:[false, true, false, true],
		  											fillColor: '',
		  											text: at2, fontSize: 12, bold:false
		  										},
		  										
		  									] ]},
		  			         				layout: 'noBorders'
		  				     },
		      				{
		      				    text: "It is the owner's responsibility to update and maintain the IHM, Part I, especially after any repair, conversion, or sale of a ship. If any machinery or equipment is added to, removed, replaced, or the hull coating is renewed, the IHM, Part I should be updated according to the requirements for new ships as stipulated in the guidelines for IHM development. Updating is not required if identical parts or coatings are installed or applied. ",
		      				    margin:[20, 10, 20, 0],
		      				    alignment: 'justify',
		      				    fontSize: 12
		      				},
		      				{
		      				    text: "The IHM, Part I belongs to the ship. The continuity and conformity of the information it contains should be confirmed, particularly when the flag, owner, or operator of the ship changes.",
		      				    margin:[20, 10, 20, 0],
		      				    alignment: 'justify',
		      				    fontSize: 12
		      				},
		      				/*{
		      				    text: "A copy of this letter must be presented together with the Statement of Compliance.",
		      				    margin:[20, 10, 20, 0],
		      				    alignment: 'justify',
		      				    fontSize: 12
		      				},*/
		      				/*{
		      				    text: 'Any amendments to the approved IHM Part I or to any security equipment specified in the approved IHM Part I are to be submitted to the Administrator for review and approval prior to implementation.',
		      				    margin:[20, 10, 20, 0],
		      				    alignment: 'justify',
		      				    fontSize: 12
		      				},
		      				{
		      				    text: 'A copy of this letter must be presented together with the International Ship Security Certificate(ISSC) or the Interim ISSC.',
		      				    margin:[20, 10, 20, 0],
		      				    alignment: 'justify',
		      				    fontSize: 12
		      				},*/
		      				{
		      				    text:"Regards,",
		      				    margin:[20, 20, 0, 0],
		      				    fontSize: 12
		      				},
		      				{
		      				    stack: [
		  			    				    	/*{
		  					                		text: "Signature:",
		  					                		margin:[0, 25, 0, 0],
		  					                		fontSize: 12
		  					                	},*/
		  					    				{
		  										    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
		  										    width: 80, 
		  										    height: 40,
		  										    //alignment:'right',
		  										    margin:[30, 5, 30, 0],
		  										    fontSize: 12
		  										},
		  										{
		  				                        canvas: [
		  					                              {
		  				                    					type: 'line',
		  				                    					x1: 0, y1: 5,
		  				                    					x2: 290, y2: 5,
		  				                    					lineWidth: 1
		  								                }
		  					                    ]
		  				                    },
		  				                    
		  				                   /* {
		  				                		text: "Name:",
		  				                		margin:[0, 30, 0, 0],
		  				                		fontSize: 12
		  				                	},*/
		  				                	{
		  				                		text: certificateData.leadAuditorName,
		  				                		margin:[0, 10, 0, 0],
		  				                		fontSize: 12
		  				                	},
		  				                	{
		  				                		text: certificateData.title,
		  				                		fontSize: 12,
		  				                		margin:[0, 5, 0, 0]
		  				                	},
		  				                	/*{
		  				                        canvas: [
		  					                              {
		  				                    					type: 'line',
		  				                    					x1: 70, y1: 5,
		  				                    					x2: 290, y2: 5,
		  				                    					lineWidth: 1
		  								                }
		  					                    ]
		  				                    },*/
		  				                	{
		  				                		text:"Issued by the authority of the Republic of the\n",
		  				    				    margin:[0, 3, 0, 0],
		  				    				    fontSize: 12
		  				                	},
		  				                	{
		  				                		text:"Marshall Islands Maritime Administrator",
		  				    				    margin:[0, 3, 0, 0],
		  				    				    fontSize: 12
		  				                	},
		      			                    {
		      			                        image: titleImage,
		      							        width: 100, 
		      							        height: 100,
		      							        alignment:'right',
		      							        margin:[20, -100]
		      			                    }
		      				        ],
		      				        margin:[20, 0, 0, 0]
		      				}
		      				
		      			    ],
		      			    pageSize: 'Letter',
//		      				pageMargins: [10, 10, 20, 10],
		      			    background: function(currentPage, pageSize) { 
		      			        return {
		      			        image: sourceToDataURL('watermark'),
		      			        width: 300,
		      			        absolutePosition: {x: 150, y: 260},
		      			        opacity: 0.7}
		      			    },
		      			    styles:{
		      			        rightme:
		      			        {   
		      			            alignment: 'center',
		      			            margin: [0, 10, 80, 0]
		      			        },
		      			        fntSize:
		          		        {
		          		        	fontSize: 12
		          		        }
		      			    }
		      			}
		      		
		  			ihmApproveletter.content.push( voidStatus==true?{//crossLine ihm approval letter
						canvas : [ {
							type : 'line',
						   	x1 : 0,
							y1 : -40,
							x2 : 525,
							y2 : -765,
							lineColor:'red',
							lineWidth : 2
						} 
						],
						absolutePosition:{x:45,y:800} 
		    		}:'');		
		  			  
		      		return ihmApproveletter;
		      		
		      	};
		
// sspApproveLetter
    	
    	
    	function sspApproveLetter(certificateData){
    		
    		var monthNames = ["January", "February", "March", "April", "May", "June",
  		                    "July", "August", "September", "October", "November", "December"
  		                  ];
    		var d = certificateData.auditDate;
    	//	var Adate = monthNames[d.getMonth()];
    		
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
  		
  		
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		console.log("AuitDate",AuitDate);
    		
    		var c = certificateData.certIssueDate;
    		//var Cdate = monthNames[c.getMonth()];
    		
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var Cdate  = check1.format('MMMM');
    		
    		var splitAuditDate = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate[0]+' '+Cdate+' '+splitAuditDate[2];

    		var companyaddress = certificateData.companyaddress.split("   ");
    		console.log(companyaddress);
    		var titleImage='',voidStatus;
    		
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		
    		var footer = 'MSC-296B Rev. 4/18';

    		var sspApproveletter = {
    			    ownerPassword: '123456',
    			    permissions: {
    			    printing: 'lowResolution',
    			    modifying: false,
    			    copying: false,
    			    annotating: false,
    			    fillingForms: false,
    			    contentAccessibility: false,
    			    documentAssembly: false,
    			  },
    			  footer: {
    			    columns: [
    			     // 'Left part',
    			      { text: footer, alignment: 'right', margin : [30, -30] }
    			    ]
    			  },
    			  defaultStyle:{
    				  font:'Times'
    			  },
    			content: [
    			  {
    						columns: [
    							{
    							image: sourceToDataURL('logo'),
    							width: 80, 
    							height: 80,
    							margin: [20,10],
    							
    							},
    							{ 
    							    width: '*',
    			                    text: [
    			                        {text: 'Republic of the Marshall Islands\n', fontSize: 18, bold: true, color: 'black'},
    			                        {text: 'Maritime Administrator\n\n', fontSize: 14, bold: true, color: 'black'},
    			                        {text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506\n', fontSize: 10, bold: false, color: 'black'},
    			                        {text: 'Telephone: +1-703-620-4880   Fax: +1-703-476-8522 \n', fontSize: 10, color: 'black'},
    			                        {text: 'Email: msc@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    			                    ],
    								style: 'rightme'
    							},
    						] 
    			    },	
    				{
    				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
    				},
    				{
    				    columns: [
    							{
    								text:  AuitDate.replace(/^0+/, ''), 
    								margin: [20, 30, 0, 0],
    								style: 'fntSize'
    							}
    					]
    				},
    				{
    				    text: [
    				        {text:'RE: ', style: 'fntSize',bold:true},
    				        {text: 'Ship Security Plan (SSP) Approval Letter', bold: true, fontSize: 12}
    				    ],
    				    margin:[20, 20, 0, 0]
    				},
    				
    				// Vessel Details
    				{
    				    columns: [
    							{
    								text: [
    								    {text: certificateData.vesselName},
    								    {text: " (Official Number "+certificateData.officialNo+", "+"IMO Number "+certificateData.vesselImoNo+')'}
    								],
    								fontSize: 12
    							},
    							
    					],
    					margin: [20, 20, 0, 0]
    				},
    				{
    				    text: certificateData.companyname,
    				    margin: [20, 0, 0, 0],
    				    fontSize: 12
    				},
    				{
        				columns:[
        				         {
        			    				width:350,
        			    			    text: certificateData.companyaddress,
        			    			    margin: [20, 0, 0, 0],style: 'fntSize'
        				         }
        				 ]
        			},
    				{/*
    				    text: companyaddress[1].replace(/\s+/g, " "),
    				    margin: [20, 0, 0, 0],
    				    fontSize: 12*/
    				},
    				{
    				   text: "To Whom It May Concern:",
    				   margin: [20, 20, 0, 0],fontSize: 12
    				},
    				{
    				   text: 'Please be advised that the SSP revision '+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, '') +', for the vessel named above has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the "Administrator") and is found to be in  compliance  with  Part  A  of  the  International  Ship  and Port Facility Security Code.',
    				   margin: [20, 20, 20, 0],
    				   alignment: 'justify',
    				   fontSize: 12
    				},
    				{
    				    text: 'During the review of the SSP, it was verified that the SSP has been developed in accordance with ISPS Code A/9.4, and the provisions of ISPS Code B/8.1 to B/13.8 have been duly taken into account and applied as appropriate for the ship.',
    				    margin:[20, 10, 20, 0],
    				    alignment: 'justify',
    				    fontSize: 12
    				},
    				{
    				    text: 'Any amendments to the approved SSP or to any security equipment specified in the approved SSP are to be submitted to the Administrator for review and approval prior to implementation.',
    				    margin:[20, 10, 20, 0],
    				    alignment: 'justify',
    				    fontSize: 12
    				},
    				{
    				    text: 'A copy of this letter must be presented together with the International Ship Security Certificate (ISSC) or the Interim ISSC.',
    				    margin:[20, 10, 20, 0],
    				    alignment: 'justify',
    				    fontSize: 12
    				},
    				{
    				    text:"Regards,",
    				    margin:[20, 20, 0, 0],
    				    fontSize: 12
    				},
    				{
    				    stack: [
    				                {
									    image: (certificateData.leadSign)? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 230, 
									    height: 30,
									    //alignment:'right',
									    margin:[0, 30, 0, 0]
									},
									{
    			                        canvas: [
    				                              {
    			                    					type: 'line',
    			                    					x1: 0, y1: 5,
    			                    					x2: 290, y2: 5,
    			                    					lineWidth: 1
    							                }
    				                    ]
    			                    },
    			                    {  
    			                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    			                        margin : [0, 10],
    			                        style: 'fntSize'
    			                        
    			                    },
    			                    {
    			                        image: titleImage,
    							        width: 100, 
    							        height: 100,
    							        alignment:'right',
    							        margin:[20, -100]
    			                    }
    				        ],
    				        margin:[20, 0, 0, 0]
    				}
    				
    			    ],
    			    pageSize: 'Letter',
//    				pageMargins: [10, 10, 20, 10],
    			    background: function(currentPage, pageSize) { 
    			        return {
    			        image: sourceToDataURL('watermark'),
    			        width: 300,
    			        absolutePosition: {x: 150, y: 260},
    			        opacity: 0.7}
    			    },
    			    styles:{
    			        rightme:
    			        {   
    			            alignment: 'center',
    			            margin: [0, 10, 80, 0]
    			        },
    			        fntSize:
        		        {
        		        	fontSize: 12
        		        }
    			    }
    			}
    		
    		sspApproveletter.content.push( voidStatus==true?{//crossLine ssp approval letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');		
    		
    		return sspApproveletter;
    		
    	}
    	
    	
   // dmlcReviewLetter 	
    	
    	function dmlcReviewLetter(certificateData){
    		
    		var monthNames = ["January", "February", "March", "April", "May", "June",
    		                    "July", "August", "September", "October", "November", "December"
    		                  ];
    		var companyaddress = certificateData.companyaddress.split("  ");
    		console.log(companyaddress);
    		var d = certificateData.auditDate;
    		//var Adate = monthNames[d.getMonth()];
    		console.log(certificateData.auditDate);
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
        	

        	console.log(Adate);
    		
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		console.log("AuitDate",AuitDate);
    		
    		var c = certificateData.certIssueDate;
    		console.log(certificateData)
    		//var Cdate = monthNames[c.getMonth()];
    		
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var Cdate  = check1.format('MMMM');
    		
    		var splitAuditDate = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate[0]+' '+Cdate+' '+splitAuditDate[2];
    		
    		var titleImage='',voidStatus;
    		
			if(certificateData.activeStatus == 0 ){
				
				voidStatus = true;
			}
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		
    		var footer = 'MI-400F Rev. 4/18';

    		var dmlcReviewletter = {
    			    ownerPassword: '123456',
    			    permissions: {
    			    printing: 'lowResolution',
    			    modifying: false,
    			    copying: false,
    			    annotating: false,
    			    fillingForms: false,
    			    contentAccessibility: false,
    			    documentAssembly: false,
    			  },
    			  footer: {
    			    columns: [
    			     // 'Left part',
    			      { text: footer, alignment: 'right', margin : [30, -50] }
    			    ]
    			  },
    			  defaultStyle:{
    				  font:'Times'
    			  },
    			  pageSize: 'Letter',
    			content: [
    			  {
    						columns: [
    							{
    							image: sourceToDataURL('logo'),
    							width: 80, 
    							height: 80,
    							margin: [20,10],
    							
    							},
    							{ 
    							    width: '*',
    			                    text: [
    			                        {text: 'Republic of the Marshall Islands\n', fontSize: 18, bold: true, color: 'black'},
    			                        {text: 'Maritime Administrator\n\n', fontSize: 14, bold: true, color: 'black'},
    			                        {text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506\n', fontSize: 10, bold: false, color: 'black'},
    			                        {text: 'Telephone: +1-703-620-4880   Fax: +1-703-476-8522 \n', fontSize: 10, color: 'black'},
    			                        {text: 'Email: msc@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    			                    ],
    								style: 'rightme'
    							},
    						] 
    			    },	
    				{
    				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
    				},
    				{
    				    columns: [
    							{
    								text:  AuitDate.replace(/^0+/, ''), 
    								margin: [20, 30, 0, 0],
    								style: 'fntSize'
    							}
    					]
    				},
    				{
    				    text: [
    				        {text:'RE: ',fontSize:12, bold: true},
    				        {text: 'Declaration of Maritime Labour Compliance (DMLC), Part II Review Letter', bold: true, fontSize: 12}
    				    ],
    				    margin:[20, 20, 0, 0]
    				},
    				
    				// Vessel Details
    				{
    				    columns: [
    							{
    								text: [
    								    {text: certificateData.vesselName},
    								    {text: " (Official Number "+certificateData.officialNo+", "+"IMO Number "+certificateData.vesselImoNo+')'}
    								] ,
    								style: 'fntSize'
    							},
    							
    					],
    					margin: [20, 30, 0, 0]
    				},
    				// {
    				// 	text: certificateData.companyname,
        			//     margin: [20, 0, 0, 0],
        			//     fontSize: 12
    				// },
    				{
    					columns:[
        				         {
        			    				width:360,
        			    			    text: certificateData.companyaddress,
        			    			    margin: [20, 0, 0, 0],fontSize: 12
        				         }
        				 ]
    				},
    				{
    				   text: "To Whom It May Concern:",
    				   margin: [20, 20, 0, 0],
    				   style: 'fntSize'
    				},
    				{
    				   text: "The  DMLC,  Part  II   revision "+ certificateData.revisionNo +",  dated "+ certIssueDate.replace(/^0+/, '')+",  for the vessel named above has been reviewed by the Republic of the Marshall Islands (RMI) Maritime  Administrator  pursuant  to  Standard  A5.1.3,  paragraph   10   of   the Maritime Labour Convention, 2006 (MLC, 2006)  and  RMI  requirements  for  implementing  MLC,  2006. The DMLC, Part II review is considered satisfactory subject to:",
    				   margin: [20, 20, 20, 0],
    				   alignment: 'justify',
    				   style: 'fntSize'
    				},
    				{
    				    ol: [
    				        {text: 'Satisfactory completion  of  onboard  inspection  to  verify implementation  of the measures drawn up by the shipowner in the DMLC, Part II.', fontSize: 12}
    				    ],
    				    margin:[60, 20, 15, 0],
    				    style: 'fntSize'
    				},
    				{
    				    text:"Regards,",
    				    margin:[20, 20, 0, 0],
    				    style: 'fntSize'
    				},
    				{
    				    stack: [
    				                {
									    image: (certificateData.leadSign)? "data:image/png;base64,"+certificateData.leadSign: sourceToDataURL('transparent'),
									    width: 230, 
									    height: 30,
									    //alignment:'right',
									    margin:[0, 30, 0, 0]
									},
									{
    			                        canvas: [
    				                              {
    			                    					type: 'line',
    			                    					x1: 0, y1: 5,
    			                    					x2: 290, y2: 5,
    			                    					lineWidth: 1
    							                }
    				                    ]
    			                    },
    			                    {  
    			                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    			                        margin : [0, 10]
    			                        
    			                    },
    			                    {
    			                        image: titleImage,
    							        width: 120, 
    							        height: 120,
    							        alignment:'right',
    							        margin:[10, -100]
    			                    }
    				        ],
    				        margin:[20, 20, 0, 0]
    				}
    				
    			    ],
//    				pageMargins: [10, 10, 20, 10],
    			    background: function(currentPage, pageSize) { 
    			        return {
    			        image: sourceToDataURL('watermark'),
    			        width: 300,
    			        absolutePosition: {x: 150, y: 260},
    			        opacity: 0.7}
    			    },
    			    styles:{
    			        rightme:
    			        {   
    			            alignment: 'center',
    			            margin: [0, 10, 80, 0]
    			        },
    			        fntSize:
        		        {
        		        	fontSize: 12
        		        }
    			    }
    			}
    		
    		dmlcReviewletter.content.push( voidStatus==true?{//crossLine dmlc approval letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');		
    		
    		
    		return dmlcReviewletter;
    		
    	}
		
    	
    	
    	/* Start New 6 PlanAppoval Review letters */
    	/** Fixed IRI-5193,IRI-5191 and IRI-5190 all 6 new CR letters header issue by Kiran  */
    	
    	function planApprovalLetter(certificateData)
    	{
    		console.log(certificateData);
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
    	  
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		console.log("AuitDate",AuitDate);
    		certificateData.auditplace = certificateData.auditplace?
					decodeURIComponent(atob(certificateData.auditplace)) : '';
    		//var c =certificateData.certIssueDate;
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var Cdate  = check1.format('MMMM');
    		//var Cdate = monthNames[c.getMonth()];
    		
    		var splitAuditDate = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate[0]+' '+Cdate+' '+splitAuditDate[2];

    		var companyaddress = certificateData.companyaddress.split("   ");
    		console.log(companyaddress);
    		var titleImage='';
    		if (certificateData.title != '') {
    			if (certificateData.title.indexOf('Special') >= 0) {
    				titleImage = sourceToDataURL('sa');
    			} else if (certificateData.title.indexOf('Deputy') >= 0) {
    				titleImage = sourceToDataURL('dc');
    			}
    		}
    		
    		if (certificateData.auditTypeId == AppConstant.SOPEP_TYPE_ID || certificateData.auditTypeId==AppConstant.STS_TYPE_ID ||
    			certificateData.auditTypeId == AppConstant.SMPEP_TYPE_ID || certificateData.auditTypeId==AppConstant.BWS_TYPE_ID ||
    			certificateData.auditTypeId == AppConstant.VOC_TYPE_ID || certificateData.auditTypeId==AppConstant.SDR_TYPE_ID
				|| certificateData.auditTypeId==AppConstant.COW_TYPE_ID ) {

				if (certificateData.auditSubTypeId == 1001) {

					var aprovalletteramd = " - Approval Letter";

				} else if (certificateData.auditSubTypeId == 1002) {
					
					var aprovalletteramd = " - Amendment(s) Approval Letter";
					
				}

			}
    		
//SOPEP Management Plan
//** replace deputytitle to title in all 7 CR approval and receipt letters , To fix IRI-5239 by kiran  */
			if (certificateData.auditTypeId == AppConstant.SOPEP_TYPE_ID) {
				var voidStatus;
				if(certificateData.activeStatus == 0 ){
    			
					voidStatus = true;
				}

				//var footerR = 'MI-298K Rev. 3/20';
				var footerR = 'MI-298NR';
				var footerL = 'Rev. 2/22';

				var sopepApproveletter = {
					ownerPassword: '123456',
					permissions: {
						printing: 'lowResolution',
						modifying: false,
						copying: false,
						annotating: false,
						fillingForms: false,
						contentAccessibility: false,
						documentAssembly: false,
					},
					footer: {
						columns: [
							//changed by @Ramya on 23-12-2022 for Ticket - 594
							// 'Left part',
							// { text: footerL, alignment: 'left', margin: [60, 0] },
							// { text: footerR, alignment: 'right', margin: [52, 0] }
							{
								text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298N',
								margin: [60,-60],
								fontSize: 8,
								bold: true,
								font:'Times',
								alignment: 'justify',
								},

						],

					},

					defaultStyle: {
						font: 'Times'
					},
					content: [
						{
							columns: [
								{
									image: sourceToDataURL('logo'),
									width: 80,
									height: 80,
									margin: [20, 10],

								},
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'R', fontSize: 18, bold: true, color: 'black' },
										{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 18, bold: true, color: 'black' },
										{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'I', fontSize: 18, bold: true, color: 'black' },
										{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 14, bold: true, color: 'black' },
										{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
										{ text: 'A', fontSize: 14, bold: true, color: 'black' },
										{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
										//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
										
									],
									style: 'rightme',
									margin: [-70, 10, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
									],
									style: 'rightme',
									margin: [0, -42, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'T', fontSize: 10, color: 'black' },
										{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
										{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
										{ text: ' F', fontSize: 10, color: 'black' },
										{ text: 'AX: ', fontSize: 8, color: 'black' },
										{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
										{ text: 'E', fontSize: 10, color: 'black' },
										{ text: 'MAIL:', fontSize: 8, color: 'black' },
										{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
										{ text: 'W', fontSize: 10, color: 'black' },
										{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
										{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
									],
									style: 'rightme',
									margin: [0, -30, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									text: AuitDate.replace(/^0+/, ''),
									margin: [20, 15, 0, 0],
									fontSize: 12
								}
							]
						},
						{
							text: [
								{ text: "RE: Shipboard Oil Pollution Emergency Plan (SOPEP)" + aprovalletteramd, bold: true, fontSize: 12 }
							],
							margin: [20, 15, 0, 0]
						},

						// Vessel Details

						{

							width: '*',
							text: [
								{ text: certificateData.vesselName, fontSize: 12, color: 'black' },
								{ text: ' (Official No.: ', fontSize: 12, color: 'black' },
								{ text: certificateData.officialNo, fontSize: 12, color: 'black' },
								{ text: ', IMO No.: ', fontSize: 12, color: 'black' },
								{ text: certificateData.vesselImoNo, fontSize: 12, color: 'black' },
								{ text: ', Port of Registry:', fontSize: 12, color: 'black' },
								{ text: certificateData.portofreg, fontSize: 12, color: 'black' },
								{ text: ')', fontSize: 12, color: 'black' },

							],
							margin: [20, 15, 0, 0],
							fontSize: 12
						},
						/*{
						text: certificateData.officialNo,
						margin: [20, 0, 0, 0],
						fontSize: 12
						},
						{
						text : certificateData.vesselImoNo,
						margin: [20, 0, 0, 0],
						fontSize: 12
						},*/

						{

							margin: [20, 10, 0, 0],
							table: {
								widths: [515, 30],
								heights: [20, 10],
								body: [
									/*[
										{
											border: [true, true,true, true],
											 fillColor: '',
											text: [{text: certificateData.companyname, 
													fontSize: 12,
													bold:false}]
										}],*/
									[
										{
											margin: [0, -10, 0, 0],
											border: [true, true, true, true],
											fillColor: '',
											text: [{
												text: certificateData.companyaddress,
												fontSize: 11,
												bold: false
											}]


										}],

								]
							},
							layout: 'noBorders'
						},


						/*{
							text: certificateData.companyname,
							margin: [20, 10, 0, 0],
							fontSize: 11
						},
						{
							columns:[
									 {
											width:350,
											text: certificateData.companyaddress,
											margin: [20, 0, 0, 0],
											fontSize: 11
									 }
							 ]
						},*/
						/*{
							text: companyaddress[1].replace(/\s+/g, " "),
							margin: [20, 0, 0, 0],
							fontSize: 12
						},*/
						{
							text: "To Whom It May Concern,",
							margin: [20, 15, 0, 0],
							fontSize: 12
						},
						{

							text: [
								{
									text: 'The SOPEP for the abovementioned vessel has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the “Administrator”).',
									//+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, ''), fontSize: 12, color: 'black'},
								}

							],

							margin: [20, 10, 20, 0],
							alignment: 'justify',

						},
						{
							text: 'During the review, it was verified that the SOPEP was found in compliance with:',
							margin: [20, 10, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},

						{
							text: "1.",
							margin: [20, 10, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},
						{
							text: 'the “Guidelines for the Development of Shipboard Oil Pollution Emergency Plans”, Resolution MEPC.54(32), as amended by MEPC.86(44); and',
							margin: [40, -14, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},
						{
							text: "2.",
							margin: [20, 10, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},
						{
							text: 'Resolution A.851(20), "General Principles for Ship Reporting Systems and Ship Reporting Requirements, including Guidelines for Reporting Incidents involving Dangerous Goods, Harmful Substances and/or Marine Pollutants" as amended by Resolution MEPC 138(53).',
							margin: [40, -14, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},
						{
							text: "A copy of this letter must be retained on board the vessel and be presented together with the SOPEP. The SOPEP must bear the approval stamp of the Administrator.",
							margin: [20, 10, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},
						{
							text: 'This letter is issued under the provisions of Regulation 37 of Annex I of the International Convention for the Prevention of Pollution from Ships, 1973, as modified by the 1978 and 1997 Protocol.',
							margin: [20, 10, 20, 0],
							alignment: 'justify',
							fontSize: 12
						},

						{
							text: "Regards,",
							margin: [20, 20, 0, 0],
							fontSize: 12
						},
						{
							stack: [
								{
									image: (certificateData.leadSign) ? "data:image/png;base64," + certificateData.leadSign : sourceToDataURL('transparent'),
									width: 80,
									height: 30,
									//alignment:'right',
									margin: [30, 5, 30, 0],
									fontSize: 12
								},
								{
									canvas: [
										{
											type: 'line',
											x1: 0, y1: 5,
											x2: 230, y2: 5,
											lineWidth: 1
										}
									]
								},
								{
									text: certificateData.planSignerName,
									margin: [0, 10, 0, 0],
									fontSize: 12
								},
								{
									text: certificateData.title,
									fontSize: 12,
									margin: [0, 5, 0, 0]
								},
								{
									text: "Issued by the authority of the Republic of the",
									margin: [0, 3, 0, 0],
									fontSize: 12
								},
								{
									text: "Marshall Islands Maritime Administrator",
									margin: [0, 3, 0, -10],
									fontSize: 12
								},
								{		//changed by Ramya on 02-11-2022 for Ticket-594
									image: titleImage,
									width: 110,
									height: 110,
									alignment: 'right',
									margin: [7, -120]
								},
							],
							margin: [20, 0, 0, 0]
						}

					],

					pageSize: 'Letter',
					//		      				pageMargins: [10, 10, 20, 10],
					background: function (currentPage, pageSize) {
						return {
							image: sourceToDataURL('watermark'),
							width: 300,
							absolutePosition: { x: 150, y: 260 },
							opacity: 0.7
						}
					},
					styles: {
						rightme:
						{
							alignment: 'center',
							margin: [0, 10, 80, 0]
						},
						fntSize:
						{
							fontSize: 12
						}
					}
				}
				sopepApproveletter.content.push( voidStatus==true?{//crossLine sopep approval letter
					canvas : [ {
						type : 'line',
						   x1 : 0,
						y1 : -40,
						x2 : 525,
						y2 : -765,
						lineColor:'red',
						lineWidth : 2
					} 
					],
					absolutePosition:{x:45,y:800} 
				}:'');

				return sopepApproveletter;
			}
    	
    	
    	//STS Operations Plan
		else if(certificateData.auditTypeId==AppConstant.STS_TYPE_ID)		
		{
			var voidStatus;
			if(certificateData.activeStatus == 0 ){
			
				voidStatus = true;
			}
			//var footerR = 'MI-298K Rev. 3/20';
			var footerR = 'MI-298PR';
			var footerL = 'Rev. 2/22';
						var stsApproveletter = {
							  ownerPassword: '123456',
							  permissions: {
							  printing: 'lowResolution',
							  modifying: false,
							  copying: false,
							  annotating: false,
							  fillingForms: false,
							  contentAccessibility: false,
							  documentAssembly: false,
							},
							footer: {
							  columns: [
							  //changed by @Ramya on 23-12-2022 for Ticket - 594
							   // 'Left part',
								{
									text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298P',
									margin: [60,-60],
									fontSize: 8,
									bold: true,
									font:'Times',
									alignment: 'justify',
									},
									// { text: footerL,
								// 		alignment: 'left', 
								//    margin : [10,-10] 
							//    },
							// 	{ text: footerR, 
							// 		alignment: 'right', 
							// 	margin : [12,0] 
							// }
								
							  ],
							  
							},
							
							defaultStyle:{
								font:'Times'
							},
						  content: [
							{
								columns: [
									{
										image: sourceToDataURL('logo'),
										width: 80,
										height: 80,
										margin: [20, 10],
	
									},
									{
										width: 30,
										text: '',
									},
									{
										width: '*',
										text: [
											{ text: 'R', fontSize: 18, bold: true, color: 'black' },
											{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
											{ text: 'M', fontSize: 18, bold: true, color: 'black' },
											{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
											{ text: 'I', fontSize: 18, bold: true, color: 'black' },
											{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
											{ text: 'M', fontSize: 14, bold: true, color: 'black' },
											{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
											{ text: 'A', fontSize: 14, bold: true, color: 'black' },
											{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
											//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
											
										],
										style: 'rightme',
										margin: [-70, 10, 0, 0]
									},
								]
							},
							{
								columns: [
									{
										width: 30,
										text: '',
									},
									{
										width: '*',
										text: [
											{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
										],
										style: 'rightme',
										margin: [0, -42, 0, 0]
									},
								]
							},
							{
								columns: [
									{
										width: 30,
										text: '',
									},
									{
										width: '*',
										text: [
											{ text: 'T', fontSize: 10, color: 'black' },
											{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
											{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
											{ text: ' F', fontSize: 10, color: 'black' },
											{ text: 'AX: ', fontSize: 8, color: 'black' },
											{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
											{ text: 'E', fontSize: 10, color: 'black' },
											{ text: 'MAIL:', fontSize: 8, color: 'black' },
											{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
											{ text: 'W', fontSize: 10, color: 'black' },
											{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
											{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
										],
										style: 'rightme',
										margin: [0, -30, 0, 0]
									},
								]
							},
							  {
								  columns: [
										  {
											  text:  AuitDate.replace(/^0+/, ''), 
											  margin: [20, 15, 0, 0],
											  fontSize: 12
										  }
								  ]
							  },
							  {
								  text: [
									  {text: 'RE: Ship-to-Ship (STS) Operations Plan' + aprovalletteramd, bold: true, fontSize: 12}
								  ],
								  margin:[20, 15, 0, 0]
							  },
							  
							  // Vessel Details
			  
							  {
							  
								width: '*',
								text: [
								  {text: certificateData.vesselName, fontSize: 12, color: 'black'},
								  {text: ' (Official No.: ', fontSize: 12, color: 'black'},
								  {text: certificateData.officialNo, fontSize: 12, color: 'black'},
								  {text: ', IMO No.: ', fontSize: 12, color: 'black'},
								  {text: certificateData.vesselImoNo, fontSize: 12, color: 'black'},
								  {text: ', Port of Registry:', fontSize: 12, color:'black'},
								  {text: certificateData.portofreg, fontSize: 12,color: 'black'},
								  {text: ')', fontSize: 12, color: 'black'},
								  
								  ],
							  margin: [20, 15, 0, 0],
							  fontSize: 12
							  },
							  /*{
							  text: certificateData.officialNo,
							  margin: [20, 0, 0, 0],
							  fontSize: 12
							  },
							  {
							  text : certificateData.vesselImoNo,
							  margin: [20, 0, 0, 0],
							  fontSize: 12
							  },*/
							  
							  {
								  
								  margin: [20, 10, 0, 0],
								  table: {
									  widths: [515,30],
									  heights: [20,10],
								  body: [
									  /*[
										  {
											  border: [true, true,true, true],
											   fillColor: '',
											  text: [{text: certificateData.companyname, 
													  fontSize: 12,
													  bold:false}]
										  }],*/
										  [
										  {
											  margin: [0, -10, 0, 0],
											  border: [true, true,true, true],
											   fillColor: '',
											  text: [{text: certificateData.companyaddress,
													  fontSize: 11,
													  bold:false}]
											  
											  
										  }],
										  
									  ]},
									  layout: 'noBorders'
							  },
							  
							  
							  /*{
								  text: certificateData.companyname,
								  margin: [20, 10, 0, 0],
								  fontSize: 11
							  },
							  {
								  columns:[
										   {
												  width:350,
												  text: certificateData.companyaddress,
												  margin: [20, 0, 0, 0],
												  fontSize: 11
										   }
								   ]
							  },*/
							  /*{
								  text: companyaddress[1].replace(/\s+/g, " "),
								  margin: [20, 0, 0, 0],
								  fontSize: 12
							  },*/
							  {
								 text: "To Whom It May Concern,",
								 margin: [20, 15, 0, 0],
								 fontSize: 12
							  },
							  {
								  
								  text: [
									  {text:  'The STS Operations Plan (the "Plan") for the above mentioned vessel has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the "Administrator").',
										  //+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, ''), fontSize: 12, color: 'black'},
									  }
									  
									  ],
									
									  margin: [20, 10, 20, 0],
									  alignment: 'justify',
								
							  },
							  {
								  text: 'During the review, it was verified that the Plan was found in compliance with:',
								  margin:[20, 10, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  
							  {
								  text: "1.",
								  margin:[20, 10, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  {
								  text:"the International Maritime Organization's Manual on Oil Pollution, Section 1, Prevention as amended and ",
								  margin:[50, -13, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  {
								  text: "2.",
								  margin:[20, 10, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  {
								  text:"the International Chamber of Shipping/Oil Companies International Marine Forum's Ship to Ship Transfer Guide for Petroleum, Chemicals and Liquified Gases fourth edition, 2005",
								  margin:[50, -13, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  {
								  text: "A copy of this letter must be retained on board the vessel and be presented together with the Plan. The Plan must bear the approval stamp of the Administrator.",
								  margin:[20, 10, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  {
								  text: 'This letter is issued under the provisions of Regulation 41 of Annex I of the International Convention for the Prevention of Pollution from Ships, 1973, as modified by the 1978 and 1997 Protocol.',
								  margin:[20, 10, 20, 0],
								  alignment: 'justify',
								  fontSize: 12
							  },
							  
							  {
								  text:"Regards,",
								  margin:[20, 20, 0, 0],
								  fontSize: 12
							  },
							  {
								  stack: [
												  /*{
													  text: "Signature:",
													  margin:[0, 25, 0, 0],
													  fontSize: 12
												  },*/
												  {
													  image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
													  width: 80, 
													  height: 30,
													  //alignment:'right',
													  margin:[30, 5, 30, 0],
													  fontSize: 12
												  },
												  {
												  canvas: [
															{
																  type: 'line',
																  x1: 0, y1: 5,
																  x2: 290, y2: 5,
																  lineWidth: 1
														  }
												  ]
											  },
											  
											 /* {
												  text: "Name:",
												  margin:[0, 30, 0, 0],
												  fontSize: 12
											  },*/
											  {
												  text: certificateData.planSignerName,
												  margin:[0, 10, 0, 0],
												  fontSize: 12
											  },
											  {
												  text: certificateData.title,
												  fontSize: 12,
												  margin:[0, 5, 0, 0]
											  },
											  /*{
												  canvas: [
															{
																  type: 'line',
																  x1: 70, y1: 5,
																  x2: 290, y2: 5,
																  lineWidth: 1
														  }
												  ]
											  },*/
											  {
												  text:"Issued by the authority of the Republic of the",
												  margin:[0, 3, 0, 0],
												  fontSize: 12
											  },
											  {
												  text:"Marshall Islands Maritime Administrator",
												  margin:[0, 3, 0, -10],
												  fontSize: 12
											  },
											  {			//changed by Ramya on 02-11-2022 for Ticket-594
												   image: titleImage,
												  width: 110, 
												  height: 110,
												  alignment:'right',
												  margin:[7, -120]
											  
											},
									  ],
									  margin:[20, 0, 0, 0]
							  }
							  
							  ],
							
							  pageSize: 'Letter',
//			      				pageMargins: [10, 10, 20, 10],
							  background: function(currentPage, pageSize) { 
								  return {
								  image: sourceToDataURL('watermark'),
								  width: 300,
								  absolutePosition: {x: 150, y: 260},
								  opacity: 0.7}
							  },
							  styles:{
								  rightme:
								  {   
									  alignment: 'center',
									  margin: [0, 10, 80, 0]
								  },
								  fntSize:
								  {
									  fontSize: 12
								  }
							  }
						  }
						  stsApproveletter.content.push( voidStatus==true?{//crossLine sts approval letter
							canvas : [ {
								type : 'line',
								   x1 : 0,
								y1 : -40,
								x2 : 525,
								y2 : -765,
								lineColor:'red',
								lineWidth : 2
							} 
							],
							absolutePosition:{x:45,y:800} 
						}:'');
					 
					  return stsApproveletter;
								  
					
		
	}
		//Shipboard Marine Pollution Emergency Plan (SMPEP)
		else if(certificateData.auditTypeId == AppConstant.SMPEP_TYPE_ID)		
		{
			var voidStatus;
			if(certificateData.activeStatus == 0 ){
			
				voidStatus = true;
			}
			var footerR = 'MI-298MR';
	    		var footerL = 'Rev. 2/22';
				var smpepApproveletter = {
					ownerPassword: '123456',
					permissions: {
					printing: 'lowResolution',
					modifying: false,
					copying: false,
					annotating: false,
					fillingForms: false,
					contentAccessibility: false,
					documentAssembly: false,
				  },
				  footer: {
					columns: [
						//changed by @Ramya on 23-12-2022 for Ticket - 594
					 // 'Left part',
					//   { text: footerL, alignment: 'left', margin : [60,0] },
					//   { text: footerR, alignment: 'right', margin : [52,0] }
					{
						text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298M',
						margin: [60,-50],
						fontSize: 8,
						bold: true,
						font:'Times',
						alignment: 'justify',
						},
					  
					],
					
				  },
				  
				  defaultStyle:{
					  font:'Times'
				  },
				content: [
					{
						columns: [
							{
								image: sourceToDataURL('logo'),
								width: 80,
								height: 80,
								margin: [20, 10],

							},
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'R', fontSize: 18, bold: true, color: 'black' },
									{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 18, bold: true, color: 'black' },
									{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'I', fontSize: 18, bold: true, color: 'black' },
									{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 14, bold: true, color: 'black' },
									{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
									{ text: 'A', fontSize: 14, bold: true, color: 'black' },
									{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
									//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
									
								],
								style: 'rightme',
								margin: [-70, 10, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
								],
								style: 'rightme',
								margin: [0, -42, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'T', fontSize: 10, color: 'black' },
									{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
									{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
									{ text: ' F', fontSize: 10, color: 'black' },
									{ text: 'AX: ', fontSize: 8, color: 'black' },
									{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
									{ text: 'E', fontSize: 10, color: 'black' },
									{ text: 'MAIL:', fontSize: 8, color: 'black' },
									{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
									{ text: 'W', fontSize: 10, color: 'black' },
									{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
									{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
								],
								style: 'rightme',
								margin: [0, -30, 0, 0]
							},
						]
					},
					{
						columns: [
								{
									text:  AuitDate.replace(/^0+/, ''), 
									margin: [20, 15, 0, 0],
									fontSize: 11
								}
						]
					},
					{
						text: [
							{text: 'RE: Shipboard Marine Pollution Emergency Plan (SMPEP)'  + aprovalletteramd, bold: true, fontSize: 12}
						],
						margin:[20, 15, 0, 0]
					},
					
					// Vessel Details

					{
					
					  width: '*',
					  text: [
						{text: certificateData.vesselName, fontSize: 11, color: 'black'},
						{text: ' (Official No.: ', fontSize: 11, color: 'black'},
						{text: certificateData.officialNo, fontSize: 11, color: 'black'},
						{text: ', IMO No.: ', fontSize: 11, color: 'black'},
						{text: certificateData.vesselImoNo, fontSize: 11, color: 'black'},
						{text: ', Port of Registry: ', fontSize: 11, color:'black'},
						{text: certificateData.portofreg, fontSize: 11,color: 'black'},
						{text: ')', fontSize: 11, color: 'black'},
						
						],
					margin: [20, 15, 0, 0],
					fontSize: 11
					},
					/*{
					text: certificateData.officialNo,
					margin: [20, 0, 0, 0],
					fontSize: 12
					},
					{
					text : certificateData.vesselImoNo,
					margin: [20, 0, 0, 0],
					fontSize: 12
					},*/
					
					{
						
						margin: [20, 10, 0, 0],
						table: {
							widths: [515,30],
							heights: [20,10],
						body: [
							/*[
								{
									border: [true, true,true, true],
									 fillColor: '',
									text: [{text: certificateData.companyname, 
											fontSize: 12,
											bold:false}]
								}],*/
								[
								{
									margin: [0, -10, 0, 0],
									border: [true, true,true, true],
									 fillColor: '',
									text: [{text: certificateData.companyaddress,
											fontSize: 11,
											bold:false}]
									
									
								}],
								
							]},
							layout: 'noBorders'
					},
					
					
					/*{
						text: certificateData.companyname,
						margin: [20, 10, 0, 0],
						fontSize: 11
					},
					{
						columns:[
								 {
										width:350,
										text: certificateData.companyaddress,
										margin: [20, 0, 0, 0],
										fontSize: 11
								 }
						 ]
					},*/
					/*{
						text: companyaddress[1].replace(/\s+/g, " "),
						margin: [20, 0, 0, 0],
						fontSize: 12
					},*/
					{
					   text: "To Whom It May Concern,",
					   margin: [20, 15, 0, 0],
					   fontSize: 11
					},
					{
						
						text: [
							{text:  'The SMPEP for the above mentioned vessel has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the "Administrator").',
								//+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, ''), fontSize: 12, color: 'black'},
							}
							
							],
						  
							margin: [20, 10, 20, 0],
							alignment: 'justify',
							fontSize: 11
					  
					},
					{
						text: 'During the review, it was verified that the SMPEP was found in compliance with:',
						margin:[20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					
					{
						text: "1.",
						margin:[20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text:' the "Guidelines for the Development of Shipboard Marine Pollution Emergency Plans for Oil and/or Noxious Substances," Resolution MEPC.85(44), as amended by MEPC.137(53);',
						margin:[50, -13, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text: "2.",
						margin:[20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text:' the relevant operational instructions from "Guidelines for the development of Shipboard Oil Pollution Emergency Plans,"Resolution MEPC.54(32) as amended by MEPC. 86(44); and',
						margin:[50, -13, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text: "3.",
						margin:[20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text:' Resoution A.851(20), "General Principles for Ship Reporting Systems and Ship Reporting Reqirements, including Guidelines for Reporting Incidents invoving Dangerous Goods, Harmful Substances and/or Marine pollutants," as amended by Resolution MEPC 138(53)',
						margin:[50, -13, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text: "A copy of this letter must be retained on board the vessel and be presented together with the SMPEP. The SMPEP must bear the approval stamp of the Administrator.",
						margin:[20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
					{
						text: 'This letter is issued under the provisions of Regulation 37 of Annex I and Regulation 17 of Annex II of the International Convention for the Prevention of Pollution from Ships, 1973, as modified by the 1978 and 1997 Protocol',
						margin:[20, 10, 20, -10],
						alignment: 'justify',
						fontSize: 11
					},
					
					{
						text:"Regards,",
						margin:[20, 20, 0, 0],
						fontSize: 11
					},
					{
						stack: [
										/*{
											text: "Signature:",
											margin:[0, 25, 0, 0],
											fontSize: 12
										},*/
										{
											image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
											width: 80, 
											height: 30,       // changed by archana for jira id-IRI-5518
											//alignment:'right',
											margin:[30, 5, 30, 0],
											fontSize: 11
										},
										{
										canvas: [
												  {
														type: 'line',
														x1: 0, y1: 5,
														x2: 230, y2: 5,
														lineWidth: 1
												}
										]
									},
									
								   /* {
										text: "Name:",
										margin:[0, 30, 0, 0],
										fontSize: 12
									},*/
									{
										text: certificateData.planSignerName,
										margin:[0, 10, 0, 0],
										fontSize: 11
									},
									{
										text: certificateData.title,
										fontSize: 11,
										margin:[0, 5, 0, 0]
									},
									/*{
										canvas: [
												  {
														type: 'line',
														x1: 70, y1: 5,
														x2: 290, y2: 5,
														lineWidth: 1
												}
										]
									},*/
									{
										text:"Issued by the authority of the Republic of the Marshall \n",
										margin:[0, 3, 0, 0],
										fontSize: 11
									},
									{
										text:"Islands Maritime Administrator",
										margin:[0, 3, 0, -5],
										fontSize: 11
									},
									{		//changed by Ramya on 02-11-2022 for Ticket-594
										image: titleImage,
										width: 110, 
										height: 110,
										alignment:'right',
										margin:[7, -120]
									},
							],
							margin:[20, 0, 0, 0]
					}
					
					],
				  
					pageSize: 'Letter',
//			      				pageMargins: [10, 10, 20, 10],
					background: function(currentPage, pageSize) { 
						return {
						image: sourceToDataURL('watermark'),
						width: 300,
						absolutePosition: {x: 150, y: 260},
						opacity: 0.7}
					},
					styles:{
						rightme:
						{   
							alignment: 'center',
							margin: [0, 10, 80, 0]
						},
						fntSize:
						{
							fontSize: 11
						}
					}
				}
				smpepApproveletter.content.push( voidStatus==true?{//crossLine smpep approval letter
					canvas : [ {
						type : 'line',
						   x1 : 0,
						y1 : -40,
						x2 : 525,
						y2 : -765,
						lineColor:'red',
						lineWidth : 2
					} 
					],
					absolutePosition:{x:45,y:800} 
				}:'');
			return smpepApproveletter;
			
		}
    	
    	
    		
    		//Shipboard Ballast Water Management Plan
    		
    		else if(certificateData.auditTypeId==AppConstant.BWS_TYPE_ID)		
    		{
    	        if(certificateData.activeStatus == 0 ){
    			
					voidStatus = true;
				}
    	        var footer_left = 'Rev. 2/22';
    	        var footer_right='MI-298WR';
    	    
    	        var Approveletter298W = {
    	                ownerPassword: '123456',
    	                permissions: {
    	                printing: 'lowResolution',
    	                modifying: false,
    	                copying: false,
    	                annotating: false,
    	                fillingForms: false,
    	                contentAccessibility: false,
    	                documentAssembly: false,
    	              },
    	              footer: {
    	                columns: [
							//changed by @Ramya on 23-12-2022 for Ticket - 594
    	                 // 'Left part',
    	                //   { text: footer_left, alignment: 'left', margin : [60, 0], fontSize: 11 },
    	                //   { text: footer_right, alignment: 'right', margin : [60, 0],fontSize: 11 }
						{
							text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298W',
							margin: [60,-50],
							fontSize: 8,
							bold: true,
							font:'Times',
							alignment: 'justify',
							},
    	                ]
    	              },
    	              defaultStyle:{
    	                  font:'Times'
    	              },
    	            content: [
						{
							columns: [
								{
									image: sourceToDataURL('logo'),
									width: 80,
									height: 80,
									margin: [20, 10],

								},
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'R', fontSize: 18, bold: true, color: 'black' },
										{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 18, bold: true, color: 'black' },
										{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'I', fontSize: 18, bold: true, color: 'black' },
										{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 14, bold: true, color: 'black' },
										{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
										{ text: 'A', fontSize: 14, bold: true, color: 'black' },
										{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
										//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
										
									],
									style: 'rightme',
									margin: [-70, 10, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
									],
									style: 'rightme',
									margin: [0, -42, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'T', fontSize: 10, color: 'black' },
										{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
										{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
										{ text: ' F', fontSize: 10, color: 'black' },
										{ text: 'AX: ', fontSize: 8, color: 'black' },
										{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
										{ text: 'E', fontSize: 10, color: 'black' },
										{ text: 'MAIL:', fontSize: 8, color: 'black' },
										{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
										{ text: 'W', fontSize: 10, color: 'black' },
										{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
										{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
									],
									style: 'rightme',
									margin: [0, -30, 0, 0]
								},
							]
						},
    	                {
    	                    columns: [
    	                            {
    	                                text:  AuitDate.replace(/^0+/, ''), 
    	                                margin: [20, 5, 0, 0],
    	                                style: 11
    	                            }
    	                    ]
    	                },
    	                {
    	                    text: [
    	                        {text:'RE: ', style: 'fntSize',bold:true},
    	                        {text: 'Ballast Water Management Plan (BWMP or the "Plan")' + aprovalletteramd, bold: true, fontSize: 12}
    	                    ],
    	                    margin:[20, 15, 0, 0]
    	                },
    	                
    	                // Vessel Details
    	                {
    	                    columns: [
    	                            {
    	                                text: [
    	                                    {text: certificateData.vesselName},
    	                                    {text: " (Official No.: "+certificateData.officialNo+", "+"IMO No.: "+certificateData.vesselImoNo+", "+"Port of Registry: "+certificateData.portofreg+')'}
    	                                ],
    	                                fontSize: 11                // changed by archana for jira ID-IRI-5518
    	                            },
    	                            
    	                    ],
    	                    margin: [20, 15, 0, 0]
    	                },
    	                // {
    	                //     text: certificateData.companyname,
    	                //     margin: [20, 0, 0, 0],
    	                //     fontSize: 11
    	                // },
    	                {
    	                    columns:[
								[
									{
										margin: [20, 3, 0, 0],
										border: [true, true,true, true],
										 fillColor: '',
										text: [{text: certificateData.companyaddress,
												fontSize: 11,
												bold:false}]
										
										
									}],
    	                     ]
    	                },
    	                {/*
    	                    text: companyaddress[1].replace(/\s+/g, " "),
    	                    margin: [20, 0, 0, 0],
    	                    fontSize: 12*/
    	                },
    	                {
    	                   text: "To Whom It May Concern,",
    	                   margin: [20, 15, 0, -10],fontSize: 11
    	                },
    	                {  /** fixed IRI-5254 by kiran */
    	                text: 'The BWMP dated '+AuitDate.replace(/^0+/, '')+' for the abovementioned vessel has been approved by the Republic of the Marshall Islands Maritime Administrator (the “Administrator”), subject to verification that the arrangements on board are identical to those described in the Plan. When the attending surveyor responsible for issuing the International Ballast Water Management Certificate has verified that this condition is complied with, he should sign and date the approval page of the manual confirming the verification.',
    	                    margin: [20, 20, 20, 0],
    	                   alignment: 'justify',
    	                   fontSize: 11
    	                },
    	                {text : [
							{
    	                    text: 'During the review of the BWMP, it was verified that the Plan was found in compliance with the',
    	                },
						{
    	                    text: '“Guidelines for Ballast Water Management and the Development of Ballast Water Management Plans”',
							italics: true,
    	                },
						{
    	                    text: '(Resolution MEPC.127(53), as amended by MEPC.306(73)).',
    	                   
    	                }],
						margin:[20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 11
					},
    	                {
    	                    text: 'The owner remains responsible for the accuracy of the Plan, its applicability to the named vessel, for updating the national or local quarantine requirements for the control and management of ships ballast water and sediments as necessary, and for the operational and training requirements included in the above mentioned Resolution.',
    	                    margin:[20, 10, 20, 0],
    	                    alignment: 'justify',
    	                    fontSize: 11
    	                },
    	                {
    	                    text: 'No amendment is to be made to the mandatory sections of this document without the prior consent of the Administrator.',
    	                    margin:[20, 10, 20, 0],
    	                    alignment: 'justify',
    	                    fontSize: 11
    	                },
    	                {
    	                    text: 'A copy of this letter must be retained on board the vessel and be presented together with the Plan. The Plan must bear the approval stamp of the Administrator.',
    	                    margin:[20, 10, 20, 0],
    	                    alignment: 'justify',
    	                    fontSize: 11
    	                },
    	                {
    	                    text: 'This approval letter is issued under the provisions of Regulation B-1 of the International Convention for the Control and Management of Ships’ Ballast Water and Sediments, 2004.',
    	                    margin:[20, 10, 20, -10],
    	                    alignment: 'justify',
    	                    fontSize: 11
    	                },
    	                {
    	                    text:"Regards,",
    	                    margin:[20, 20, 0, 0],
    	                    fontSize: 11
    	                },
    	                {
    	                    stack: [
    	                    	{
									  image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									  width: 80, 
									  height: 30,              // changed by archana for jira ID-IRI-5518
									  //alignment:'right',
									  margin:[30, 5, 30, 0],
									  fontSize: 12
								  },
    	                                {
    	                                    canvas: [
    	                                              {
    	                                                    type: 'line',
    	                                                    x1: 0, y1: 5,
    	                                                    x2: 290, y2: 5,
    	                                                    lineWidth: 1
    	                                            }
    	                                    ]
    	                                },
    	                                {  //changed by Ramya on 02-11-2022 for Ticket-594
    	                                    text: certificateData.planSignerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall Islands Maritime Administrator",
    	                                    margin : [0, 10],
    	                                    style: 'fntSize'
    	                                    
    	                                },
    	                                {
    	                                    image: titleImage,
    	                                    width: 105, 
    	                                    height: 105,
    	                                    alignment:'right',
    	                                    margin:[7, -120]
										},
    	                        ],
    	                        margin:[20, 0, 0, 0]
    	                }
    	                
    	                ],
    	                pageSize: 'Letter',
    	    //    				pageMargins: [10, 10, 20, 10],
    	                background: function(currentPage, pageSize) { 
    	                    return {
    	                    image: sourceToDataURL('watermark'),
    	                    width: 300,
    	                    absolutePosition: {x: 150, y: 260},
    	                    opacity: 0.7}
    	                },
    	                styles:{
    	                    rightme:
    	                    {   
    	                        alignment: 'center',
    	                        margin: [0, 10, 80, 0]
    	                    },
    	                    fntSize:
    	                    {
    	                        fontSize: 11
    	                    }
    	                }
    	            }
					Approveletter298W.content.push( voidStatus==true?{//crossLine bws approval letter
						canvas : [ {
							type : 'line',
							   x1 : 0,
							y1 : -40,
							x2 : 525,
							y2 : -765,
							lineColor:'red',
							lineWidth : 2
						} 
						],
						absolutePosition:{x:45,y:800} 
					}:'');
    	        
    	        return Approveletter298W;
    	        
    		}
    		
    		//Volatile Organic Compounds (VOC) Management Plan
    		
    		else if(certificateData.auditTypeId==AppConstant.VOC_TYPE_ID)		
    		{
				if(certificateData.activeStatus == 0 ){
    			
					voidStatus = true;
				}
    			var footer_left = 'Rev. 2/22';
    	    var footer_right='MI-298VR';

    	    var Approveletter298V = {
    	            ownerPassword: '123456',
    	            permissions: {
    	            printing: 'lowResolution',
    	            modifying: false,
    	            copying: false,
    	            annotating: false,
    	            fillingForms: false,
    	            contentAccessibility: false,
    	            documentAssembly: false,
    	          },
    	          footer: {
    	            columns: [
						//changed by @Ramya on 23-12-2022 for Ticket - 594
    	             // 'Left part',
    	            //   { text: footer_left, alignment: 'left', margin : [60, -30] },
    	            //   { text: footer_right, alignment: 'right', margin : [60, -30] }
					{
						text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298V',
						margin: [60,-60],
						fontSize: 8,
						bold: true,
						font:'Times',
						alignment: 'justify',
						},
    	            ]
    	          },
    	          defaultStyle:{
    	              font:'Times'
    	          },
    	        content: [
					{
						columns: [
							{
								image: sourceToDataURL('logo'),
								width: 80,
								height: 80,
								margin: [20, 10],

							},
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'R', fontSize: 18, bold: true, color: 'black' },
									{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 18, bold: true, color: 'black' },
									{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'I', fontSize: 18, bold: true, color: 'black' },
									{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 14, bold: true, color: 'black' },
									{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
									{ text: 'A', fontSize: 14, bold: true, color: 'black' },
									{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
									//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
									
								],
								style: 'rightme',
								margin: [-70, 10, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' },  /**fixed IRI-5322 code changed by kiran */ 
								],
								style: 'rightme',
								margin: [0, -42, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'T', fontSize: 10, color: 'black' },
									{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
									{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
									{ text: ' F', fontSize: 10, color: 'black' },
									{ text: 'AX: ', fontSize: 8, color: 'black' },
									{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
									{ text: 'E', fontSize: 10, color: 'black' },
									{ text: 'MAIL:', fontSize: 8, color: 'black' },
									{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
									{ text: 'W', fontSize: 10, color: 'black' },
									{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
									{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
								],
								style: 'rightme',
								margin: [0, -30, 0, 0]
							},
						]
					},	
    	            {
    	                columns: [
    	                        {
    	                            text:  AuitDate.replace(/^0+/, ''), 
    	                            margin: [20, 15, 0, 0],
    	                            style: 'fntSize'
    	                        }
    	                ]
    	            },
    	            {
    	                text: [
    	                    {text:'RE: ', style: 'fntSize',bold:true},
    	                    {text: 'Volatile Organic Compounds (VOC) Management Plan' + aprovalletteramd, bold: true, fontSize: 12}
    	                ],
    	                margin:[20, 15, 0, 0]
    	            },
    	            
    	            // Vessel Details
    	            {
    	                columns: [
    	                        {
    	                            text: [
    	                                {text: certificateData.vesselName},
    	                                {text: " (Official No.: "+certificateData.officialNo+", "+"IMO No.: "+certificateData.vesselImoNo+", "+"Port of Registry: "+certificateData.portofreg+')'}
    	                            ],
    	                            fontSize: 12
    	                        },
    	                        
    	                ],
    	                margin: [20, 15, 0, 0]
    	            },
    	            // {
    	            //     text: certificateData.companyname,
    	            //     margin: [20, 0, 0, 0],
    	            //     fontSize: 12
    	            // },
    	            {
    	                columns:[
							[
								{
									margin: [20, 3, 0, 0],
									border: [true, true,true, true],
									 fillColor: '',
									text: [{text: certificateData.companyaddress,
											fontSize: 11,
											bold:false}]
									
									
								}],
    	                 ]
    	            },
    	            {/*
    	                text: companyaddress[1].replace(/\s+/g, " "),
    	                margin: [20, 0, 0, 0],
    	                fontSize: 12*/
    	            },
    	            {
    	               text: "To Whom It May Concern,",
    	               margin: [20, 15, 0, 0],fontSize: 12
    	            },
    	            {   /** fixed IRI-5254 by kiran */
    	                text: 'The VOC Management Plan (the "Plan") dated '+AuitDate.replace(/^0+/, '')+' for the vessel named above has been approved by the Republic of the Marshall Islands Maritime Administrator (the “Administrator”).',
    	                margin: [20, 20, 20, 0],
    	                alignment: 'justify',
    	                fontSize: 12
    	            },
					{
						text: [
							{
								text: 'It has been verified that the Plan meets the requirements of MARPOL Annex I, Regulation 15, and has been developed in accordance with IMO Resolution MEPC.185(59)',
							},
							{
								text: 'Guidelines for the Development of a VOC Management Plan.',
								italics: true,
							},
						],
						margin: [20, 10, 20, 0],
						alignment: 'justify',
						fontSize: 12
					},
    	            {
    	                text: 'A copy of this letter must be retained on board the vessel and be presented together with the Plan. The Plan must bear the approval stamp of the Administrator.',
    	                margin:[20, 10, 20, 0],
    	                alignment: 'justify',
    	                fontSize: 12
    	            },
    	            {
    	                text: 'This approval letter is issued under the provisions of Regulation 15 of Annex VI of the International Convention for the Prevention of Pollution from Ships, 1973, as modified by the 1978 and 1997 Protocols.',
    	                margin:[20, 10, 20, 0],
    	                alignment: 'justify',
    	                fontSize: 12
    	            },
    	            {
    	                text:"Regards,",
    	                margin:[20, 20, 0, 0],
    	                fontSize: 12
    	            },
    	            {
    	                stack: [
    	                	{
								  image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
								  width: 80, 
								  height: 30,
								  //alignment:'right',
								  margin:[30, 5, 30, 0],
								  fontSize: 12
							  },
    	                            {
    	                                canvas: [
    	                                          {
    	                                                type: 'line',
    	                                                x1: 0, y1: 5,
    	                                                x2: 290, y2: 5,
    	                                                lineWidth: 1
    	                                        }
    	                                ]
    	                            },
    	                            {  
    	                                text: certificateData.planSignerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall Islands \n Maritime Administrator",
    	                                margin : [0, 10],
    	                                style: 'fntSize'
    	                                
    	                            },
    	                            {		//changed by Ramya on 02-11-2022 for Ticket-594
    	                                image: titleImage,
    	                                width: 110, 
    	                                height: 110,
    	                                alignment:'right',
    	                                margin:[7, -120]
    								},
    	                    ],
    	                    margin:[20, 0, 0, 0]
    	            }
    	            
    	            ],
    	            pageSize: 'Letter',
//    	    				pageMargins: [10, 10, 20, 10],
    	            background: function(currentPage, pageSize) { 
    	                return {
    	                image: sourceToDataURL('watermark'),
    	                width: 300,
    	                absolutePosition: {x: 150, y: 260},
    	                opacity: 0.7}
    	            },
    	            styles:{
    	                rightme:
    	                {   
    	                    alignment: 'center',
    	                    margin: [0, 10, 80, 0]
    	                },
    	                fntSize:
    	                {
    	                    fontSize: 12
    	                }
    	            }
    	        }
				Approveletter298V.content.push( voidStatus==true?{//crossLine voc approval letter
					canvas : [ {
						type : 'line',
						   x1 : 0,
						y1 : -40,
						x2 : 525,
						y2 : -765,
						lineColor:'red',
						lineWidth : 2
					} 
					],
					absolutePosition:{x:45,y:800} 
				}:'');
    	    
    	    return Approveletter298V;
    		}
    		
    	//Sewage Discharge Rate
		
        	else if(certificateData.auditTypeId==AppConstant.SDR_TYPE_ID)		
        		{
					if(certificateData.activeStatus == 0 ){
    			
						voidStatus = true;
					}
        		var footer_left = 'Rev. 9/21';
        		var footer_right='MI-298S';

        		var Approveletter298S = {
        				ownerPassword: '123456',
        				permissions: {
        				printing: 'lowResolution',
        				modifying: false,
        				copying: false,
        				annotating: false,
        				fillingForms: false,
        				contentAccessibility: false,
        				documentAssembly: false,
        			  },
        			  footer: {
        				columns: [
							//changed by @Ramya on 23-12-2022 for Ticket - 594
        				 // 'Left part',
        				//   { text: footer_left, alignment: 'left', margin : [60, -10] },
        				//   { text: footer_right, alignment: 'right', margin : [60, -10] }
						{
							text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298S',
							margin: [60,-60],
							fontSize: 8,
							bold: true,
							font:'Times',
							alignment: 'justify',
							},
        				]
        			  },
        			  defaultStyle:{
        				  font:'Times'
        			  },
        			content: [
						{
							columns: [
								{
									image: sourceToDataURL('logo'),
									width: 80,
									height: 80,
									margin: [20, 10],

								},
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'R', fontSize: 18, bold: true, color: 'black' },
										{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 18, bold: true, color: 'black' },
										{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'I', fontSize: 18, bold: true, color: 'black' },
										{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 14, bold: true, color: 'black' },
										{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
										{ text: 'A', fontSize: 14, bold: true, color: 'black' },
										{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
										//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
										
									],
									style: 'rightme',
									margin: [-70, 10, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
									],
									style: 'rightme',
									margin: [0, -42, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'T', fontSize: 10, color: 'black' },
										{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
										{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
										{ text: ' F', fontSize: 10, color: 'black' },
										{ text: 'AX: ', fontSize: 8, color: 'black' },
										{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
										{ text: 'E', fontSize: 10, color: 'black' },
										{ text: 'MAIL:', fontSize: 8, color: 'black' },
										{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
										{ text: 'W', fontSize: 10, color: 'black' },
										{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
										{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
									],
									style: 'rightme',
									margin: [0, -30, 0, 0]
								},
							]
						},	
        				{
        					columns: [
        							{
        								text:  AuitDate.replace(/^0+/, ''), 
        								margin: [20, 15, 0, 0],
        								style: 'fntSize'
        							}
        					]
        				},
        				{
        					text: [
        						{text:'RE: ', style: 'fntSize',bold:true},
        						{text: 'Sewage Discharge Rate (SDR)' + aprovalletteramd, bold: true, fontSize: 12}
        					],
        					margin:[20, 15, 0, 0]
        				},
        				
        				// Vessel Details
        				{
        					columns: [
        							{
        								text: [
        									{text: certificateData.vesselName},
        									{text: " (Official No.: "+certificateData.officialNo+", "+"IMO No.: "+certificateData.vesselImoNo+", "+"Port of Registry: "+certificateData.portofreg+')'}
        								],
        								fontSize: 12
        							},
        							
        					],
        					margin: [20, 15, 0, 0]
        				},
        				// {
        				// 	text: certificateData.companyname,
        				// 	margin: [20, 0, 0, 0],
        				// 	fontSize: 12
        				// },
        				{
        					columns:[
								[
									{
										margin: [20, 3, 0, 0],
										border: [true, true,true, true],
										 fillColor: '',
										text: [{text: certificateData.companyaddress,
												fontSize: 11,
												bold:false}]
										
										
									}],
        					 ]
        				},
        				{/*
        					text: companyaddress[1].replace(/\s+/g, " "),
        					margin: [20, 0, 0, 0],
        					fontSize: 12*/
        				},
        				{
        				   text: "To Whom It May Concern,",
        				   margin: [20, 15, 0, 0],fontSize: 12
        				},
        				{
        				text: 'The Republic of the Marshall Islands (RMI) Maritime Adminstrator (the "Administrator") approves the sewage discharge rate standards set forth in the International Maritime Organization (IMO) Resolution MEPC.157(55) for meeting compliance with Regulation 11.1.1 of the Intenational Convention for the Prevention of Pollution from Ships(MARPOL) Annex IV.',
        				//    +'Please be advised that the SSP revision '+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, '') +', for the vessel named above has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the "Administrator") and is found to be in  compliance  with  Part  A  of  the  International  Ship  and Port Facility Security (ISPS) Code.',
        				   margin: [20, 20, 20, 0],
        				   alignment: 'justify',
        				   fontSize: 11
        				},
        				{
        					text: 'The Administrator authorizes the above mentioned vessel to conduct discharges of untreated sewage following the appropriate discharge rates stated in the approved Discharge Rate Table dated '+AuitDate.replace(/^0+/, '')+'.', /** fixed IRI-5254 by kiran */
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text: 'No discharge of untreated sewage is permitted unless the vessel is proceeding at a speed of at least 4 knots and more than 12 nautical miles from the nearest land.',
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text: 'The Discharge Rate Table must bear the approval stamp of the Administrator and is invalid if there is any modification of the vessel which affects the calculation data.',
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text: 'A copy of this letter must be retained on board the vessel together with the International Sewage Pollution Prevention Certificate.',
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text: 'This approval letter is issued under the provisions of Regulation 11.1.1 of MARPOL Annex IV and Resolution MEPC.157(55) "Recommendation on Standards for the Rate of Discharge of Untreated Sewage from Ships."',
        					margin:[20, 10, 20,-10],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text:"Regards,",
        					margin:[20, 20, 0, 0],
        					fontSize: 12
        				},
        				{
        					stack: [
        						{
									  image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									  width: 80, 
									  height: 30,
									  //alignment:'right',
									  margin:[30, 5, 30, 0],
									  fontSize: 12
								  },
        								{
        									canvas: [
        											  {
        													type: 'line',
        													x1: 0, y1: 5,
        													x2: 290, y2: 5,
        													lineWidth: 1
        											}
        									]
        								},
        								{  
        									text: certificateData.planSignerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall \n Islands Maritime Administrator",
        									margin : [0, 10],
        									style: 'fntSize'
        									
        								},
        								{	//changed by Ramya on 02-11-2022 for Ticket-594
        									image: titleImage,
        									width: 110, 
        									height: 110,
        									alignment:'right',
        									margin:[7, -120]
										},
        						],
        						margin:[20, 0, 0, 0]
        				}
        				
        				],
        				pageSize: 'Letter',
//        	    				pageMargins: [10, 10, 20, 10],
        				background: function(currentPage, pageSize) { 
        					return {
        					image: sourceToDataURL('watermark'),
        					width: 300,
        					absolutePosition: {x: 150, y: 260},
        					opacity: 0.7}
        				},
        				styles:{
        					rightme:
        					{   
        						alignment: 'center',
        						margin: [0, 10, 80, 0]
        					},
        					fntSize:
        					{
        						fontSize: 12
        					}
        				}
        			}
        		
					Approveletter298S.content.push( voidStatus==true?{//crossLine sdr approval letter
						canvas : [ {
							type : 'line',
							   x1 : 0,
							y1 : -40,
							x2 : 525,
							y2 : -765,
							lineColor:'red',
							lineWidth : 2
						} 
						],
						absolutePosition:{x:45,y:800} 
					}:'');
        		return Approveletter298S;

        		}

					/**  Crude Oil Washing (COW)approval letter   -added by kiran */

				else if(certificateData.auditTypeId==AppConstant.COW_TYPE_ID)		
        		{
					if(certificateData.activeStatus == 0 ){
    			
						voidStatus = true;
					}
        		var footer_left = 'Rev. 11/21';
        		var footer_right='MI-298X';

        		var Approveletter298S = {
        				ownerPassword: '123456',
        				permissions: {
        				printing: 'lowResolution',
        				modifying: false,
        				copying: false,
        				annotating: false,
        				fillingForms: false,
        				contentAccessibility: false,
        				documentAssembly: false,
        			  },
        			  footer: {
        				columns: [
							//changed by @Ramya on 23-12-2022 for Ticket - 594
        				 // 'Left part',
        				//   { text: footer_left, alignment: 'left', margin : [60, -10] },
        				//   { text: footer_right, alignment: 'right', margin : [60, -10] }
						{
							text: 'The Republic of the Marshall Islands Maritime Administrator, The Trust Company of the Marshall Islands, Inc., its affiliates, respective officers, employees, or agents are, individually and collectively, referred to in this letter as the Administrator. The Administrator assumes no responsibility and shall not be liable to any person for any loss, damage or expense caused by reliance on the information or advice in this document or howsoever provided, unless that person has signed a contract with the Administrator for the provision of this information and in that case any responsibility or liability is exclusively determined by the terms and conditions set out in that contract.\n\n Rev.9/22 \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t MI-298X',
							margin: [60,-60],
							fontSize: 8,
							bold: true,
							font:'Times',
							alignment: 'justify',
							},
        				]
        			  },
        			  defaultStyle:{
        				  font:'Times'
        			  },
        			content: [
						{
							columns: [
								{
									image: sourceToDataURL('logo'),
									width: 80,
									height: 80,
									margin: [20, 10],

								},
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'R', fontSize: 18, bold: true, color: 'black' },
										{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 18, bold: true, color: 'black' },
										{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'I', fontSize: 18, bold: true, color: 'black' },
										{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 14, bold: true, color: 'black' },
										{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
										{ text: 'A', fontSize: 14, bold: true, color: 'black' },
										{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
										//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
										
									],
									style: 'rightme',
									margin: [-70, 10, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
									],
									style: 'rightme',
									margin: [0, -42, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'T', fontSize: 10, color: 'black' },
										{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
										{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
										{ text: ' F', fontSize: 10, color: 'black' },
										{ text: 'AX: ', fontSize: 8, color: 'black' },
										{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
										{ text: 'E', fontSize: 10, color: 'black' },
										{ text: 'MAIL:', fontSize: 8, color: 'black' },
										{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
										{ text: 'W', fontSize: 10, color: 'black' },
										{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
										{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
									],
									style: 'rightme',
									margin: [0, -30, 0, 0]
								},
							]
						},	
        				{
        					columns: [
        							{
        								text:  AuitDate.replace(/^0+/, ''), 
        								margin: [20, 15, 0, 0],
        								style: 'fntSize'
        							}
        					]
        				},
        				{
        					text: [
        						{text:'RE: ', style: 'fntSize',bold:true},
        						{text: 'Crude Oil Washing (COW) Operations and Equipment Manual' + aprovalletteramd, bold: true, fontSize: 12}
        					],
        					margin:[20, 15, 0, 0]
        				},
        				
        				// Vessel Details
        				{
        					columns: [
        							{
        								text: [
        									{text: certificateData.vesselName},
        									{text: " (Official No.: "+certificateData.officialNo+", "+"IMO No.: "+certificateData.vesselImoNo+", "+"Port of Registry: "+certificateData.portofreg+')'}
        								],
        								fontSize: 12
        							},
        							
        					],
        					margin: [20, 15, 0, 0]
        				},
        				// {
        				// 	text: certificateData.companyname,
        				// 	margin: [20, 0, 0, 0],
        				// 	fontSize: 12
        				// },
        				{
        					columns:[
								[
									{
										margin: [20, 3, 0, 0],
										border: [true, true,true, true],
										 fillColor: '',
										text: [{text: certificateData.companyaddress,
												fontSize: 11,
												bold:false}]
										
										
									}],
        					 ]
        				},
        				{/*
        					text: companyaddress[1].replace(/\s+/g, " "),
        					margin: [20, 0, 0, 0],
        					fontSize: 12*/
        				},
        				{
        				   text: "To Whom It May Concern,",
        				   margin: [20, 15, 0, 0],fontSize: 12
        				},
        				{
        				text: 'The COW Operations and Equipment Manual (the “Manual”) for the abovementioned vessel has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the “Administrator”).',
        				//    +'Please be advised that the SSP revision '+ certificateData.revisionNo +', dated '+ certIssueDate.replace(/^0+/, '') +', for the vessel named above has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the "Administrator") and is found to be in  compliance  with  Part  A  of  the  International  Ship  and Port Facility Security (ISPS) Code.',
        				   margin: [20, 20, 20, 0],
        				   alignment: 'justify',
        				   fontSize: 11
        				},
        				{
        					text: 'During the review, it was verified that the Manual was found in compliance with The Standard Format for the COW Manual, International Maritime Organization (IMO) Resolution MEPC.3(XII) as amended by Resolution MEPC.81(43).',
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text: 'A copy of this letter must be retained on board the vessel and be presented together with the Manual. The Manual must bear the approval stamp of the Administrator.',
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text: 'This letter is issued under the provisions of Regulation 35.1 of Annex I of the International Convention for the Prevention of Pollution from Ships, 1973, as modified by the 1978 and 1997 Protocols.',
        					margin:[20, 10, 20, 0],
        					alignment: 'justify',
        					fontSize: 11
        				},
        				{
        					text:"Regards,",
        					margin:[20, 20, 0, 0],
        					fontSize: 12
        				},
        				{
        					stack: [
        						{
									  image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									  width: 80, 
									  height: 30,
									  //alignment:'right',
									  margin:[30, 5, 30, 0],
									  fontSize: 12
								  },
        								{
        									canvas: [
        											  {
        													type: 'line',
        													x1: 0, y1: 5,
        													x2: 290, y2: 5,
        													lineWidth: 1
        											}
        									]
        								},
        								{  
        									text: certificateData.planSignerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall \n Islands Maritime Administrator",
        									margin : [0, 10],
        									style: 'fntSize'
        									
        								},
        								{	//changed by Ramya on 02-11-2022 for Ticket-594
        									image: titleImage,
        									width: 110, 
        									height: 110,
        									alignment:'right',
        									margin:[7, -120]
										},
        						],
        						margin:[20, 0, 0, 0]
        				}
        				
        				],
        				pageSize: 'Letter',
//        	    				pageMargins: [10, 10, 20, 10],
        				background: function(currentPage, pageSize) { 
        					return {
        					image: sourceToDataURL('watermark'),
        					width: 300,
        					absolutePosition: {x: 150, y: 260},
        					opacity: 0.7}
        				},
        				styles:{
        					rightme:
        					{   
        						alignment: 'center',
        						margin: [0, 10, 80, 0]
        					},
        					fntSize:
        					{
        						fontSize: 12
        					}
        				}
        			}
					Approveletter298S.content.push( voidStatus==true?{//crossLine cow approval letter
						canvas : [ {
							type : 'line',
							   x1 : 0,
							y1 : -40,
							x2 : 525,
							y2 : -765,
							lineColor:'red',
							lineWidth : 2
						} 
						],
						absolutePosition:{x:45,y:800} 
					}:'');
        		
        		return Approveletter298S;

        		}

    	}
    	
    	
    	
    	/* end of plan approval letter*/
    	
    	
    	/* start End New 6 PlanAppoval recepit letters */
    	
    	   function planReceiptLetter(certificateData){ 		
       		console.log(certificateData)
       		console.log(certificateData.auditTypeId,"This is audit type id ");
       		
       		//SOPEP Receipt Letter
       		if(certificateData.auditTypeId==AppConstant.SOPEP_TYPE_ID){
       			console.log(certificateData)
           		var titleImage='',voidStatus;
           		
           		if(certificateData.activeStatus == 0 ){
           			
       				voidStatus = true;
       			}
           		
           		if (certificateData.title != '') {
       				if (certificateData.title.indexOf('Special') >= 0) {
       					titleImage = sourceToDataURL('sa');
       				} else if (certificateData.title.indexOf('Deputy') >= 0) {
       					titleImage = sourceToDataURL('dc');
       				}
       			}
           		
           		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sepr", "Octr", "Nov", "Dec"
                       ];
       			var d = certificateData.receiptdate;
       			var check = moment(certificateData.receiptdate, 'MMMDDYYYY');
       			
       			var Adate  = check.format('MMM');
           		console.log(Adate)
           		var splitAuditDate = certificateData.receiptdate.split('-');
           		
           		var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2] 
           		
           		certificateData.auditPlace = certificateData.auditPlace?
    					decodeURIComponent(btoa(certificateData.auditPlace)) : ''; //Added by sudharsan on 8 MAR 2022 Receipt letter not downloading
           		var companyaddress = certificateData.companyaddress.split("   ");
           		
           		var useraddress = certificateData.companyAddressAud;
           		
           		var addressTel= useraddress.toString().split('\\nTel');
           		if(addressTel.length==1)
           			addressTel= useraddress.toString().split('\nTel');
           		console.log(addressTel)
           		console.log("splitTel "+addressTel.length)
           		var addvi='';
           		for(var i=0;i<addressTel.length-1;i++){
           			
           			var addressTel1=addressTel[i].split('\\n');
           			if(addressTel1.length==1)
           				addressTel1= addressTel[i].split('\n');
           			console.log("splitTel\n"+addressTel1.length)
           			for(var j=0;j<addressTel1.length;j++){
           				if(addvi!=''){
           	    			if(j%3==0)
           	    				addvi += '\n' + addressTel1[j]+ ",";
           	    			else	
           	    				addvi += ' ' +addressTel1[j]+ ",";
           	    		}else{
               				addvi = addressTel1[j]+ ",";
               			}
           			}
           		}
           		var Tel;
           		if(addressTel.length==1){
       	    			var addressTel1=addressTel[0].split('\\n');
       	    			if(addressTel1.length==1)
       	    				addressTel1= addressTel[0].split('\n');
       	    			console.log("splitTel\n"+addressTel1.length)
       	    			for(var j=0;j<addressTel1.length;j++){
       	    				if(addvi!=''){
       	    	    			if(j%3==0)
       	    	    				addvi += '\n' + addressTel1[j]+ ",";
       	    	    			else	
       	    	    				addvi += ' ' +addressTel1[j]+ ",";
       	    	    		}else{
       	        				addvi = addressTel1[j]+ ",";
       	        			}
       	    			}
       	    			if(addvi==''){
       	    				addvi = addressTel[0].replace('\\n',' ');
       	    				addvi = addressTel[0].replace('\n',' ');
       	    			}
           		}else if(addressTel.length>1){
           				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
           				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
           		}
           		useraddress = addvi;
           		
           		var footerR = 'Rev. 2/22';
				var footerL = 'MI-298NR';

           		var sopepReceiptletter = {
           		    ownerPassword: '123456',
           		    permissions: {
           		    printing: 'highResolution',
           		    modifying: false,
           		    copying: false,
           		    annotating: false,
           		    fillingForms: false,
           		    contentAccessibility: false,
           		    documentAssembly: false
           		  },
           		  footer: {
           		    columns: [
           		      { text: footerR, alignment: 'left', margin : [60, -10] },
      				  { text: footerL, alignment: 'right', margin : [60, -10] }
           		    ]
           		  },
           			  defaultStyle:{
           				  font:'Times'
           			  }
           		  ,
           		content: [
					{
						columns: [
							{
								image: sourceToDataURL('logo'),
								width: 80,
								height: 80,
								margin: [20, 10],

							},
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'R', fontSize: 18, bold: true, color: 'black' },
									{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 18, bold: true, color: 'black' },
									{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'I', fontSize: 18, bold: true, color: 'black' },
									{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 14, bold: true, color: 'black' },
									{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
									{ text: 'A', fontSize: 14, bold: true, color: 'black' },
									{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
									//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
									
								],
								style: 'rightme',
								margin: [-70, 10, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
								],
								style: 'rightme',
								margin: [0, -42, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'T', fontSize: 10, color: 'black' },
									{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
									{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
									{ text: ' F', fontSize: 10, color: 'black' },
									{ text: 'AX: ', fontSize: 8, color: 'black' },
									{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
									{ text: 'E', fontSize: 10, color: 'black' },
									{ text: 'MAIL:', fontSize: 8, color: 'black' },
									{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
									{ text: 'W', fontSize: 10, color: 'black' },
									{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
									{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
								],
								style: 'rightme',
								margin: [0, -30, 0, 0]
							},
						]
					},
           		    {	
       				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
       				},
           			{
           			    columns: [
           						{
           							text:  receiptdate.replace(/^0+/, ''), 
           							margin: [20, 15, 0, 0],
           							fontSize: 12
           						}
           				]
           			},
           			{
           			    text: [
           			        {text:'RE: Shipboard Oil Pollution Emergency Plan (SOPEP)- Receipt Letter',bold: true, fontSize: 12},
           			    ],
           			    margin:[20, 17, 0, 0]
           			},
           			
           			// Vessel Details

           			{
						text: [
							{ text: certificateData.vesselName, fontSize: 12, color: 'black' },
							{ text: ' (Official No.: ', fontSize: 12, color: 'black' },
							{ text: certificateData.officialNo, fontSize: 12, color: 'black' },
							{ text: ', IMO No.: ', fontSize: 12, color: 'black' },
							{ text: certificateData.vesselImoNo, fontSize: 12, color: 'black' },
							{ text: ', Port of Registry:', fontSize: 12, color: 'black' },
							{ text: certificateData.portofreg, fontSize: 12, color: 'black' },
							{ text: ')', fontSize: 12, color: 'black' },

						],
       					margin: [20, 15, 0, 10],
       					fontSize: 12
       			    },
       			 

           			
           			// Company Details
       			    {
       			    	
       			    	margin: [20, 0, 0, 0],
       			    	table: {
       			    		widths: [515,30],
       			        	heights: [20,10],
       			    	body: [
       			    	 
       			    	   		
       			    			[
       			    			{
       			    				margin: [0, -10, 0, 0],
       			    			    border: [true, true,true, true],
       			    	 			fillColor: '',
       			    				text: [{text: certificateData.companyaddress,
       			    					    fontSize: 11,
       			    					    bold:false}]
       			    			    
       			    			    
       			    			}],
       			    			
       			    	    ]},
       			    		layout: 'noBorders'
       			    },
           			{
           			
           			},
           			{
           			   text: "To Whom It May Concern,",
           			   margin: [20, 15, 0, 0],
           			   fontSize: 12
           			},
           			{
           			   text: "Please be advised that the SOPEP for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator.",
           			   margin: [20, 10, 20, 0],
           			   alignment: 'justify',
           			   fontSize: 12
           			},
           			{
           			    text: 'A copy of this letter must be placed on the vessel until the final approved plan is on board.',
           			    margin:[20, 10, 20, 0],
           			    alignment: 'justify',
           			    fontSize: 12
           			},
           			{
       				    text:"Regards,",
       				    margin:[20, 40, 0, -14],
       				    fontSize: 12
       				},
       				{
       				    stack: [
       		    				    	
       				    				{
       									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
       									    width: 80, 
       									    height: 30,
       									    margin:[30, 5, 30, 0],
       									    fontSize: 12
       									},
       									{
       			                        canvas: [
       				                              {
       			                    					type: 'line',
       			                    					x1: 0, y1: 5,
       			                    					x2: 215, y2: 5,
       			                    					lineWidth: 1
       							                }
       				                    ]
       			                    },
       			                   
       			                	{
       			                		text: certificateData.signerName,/** Fixed IRI-5272 code changed by kiran */
       			                		margin:[0, 3, 0, 0],
       			                		fontSize: 12
       			                	},
       			                	{
       			                		text: certificateData.title,
       			                		fontSize: 12,
       			                		margin:[0, 3, 0, 0]
       			                	},
       			                	
       			                	{
       			                		text:"Issued by the authority of the Republic of the\n",
       			    				    margin:[0, 3, 0, 0],
       			    				    fontSize: 12
       			                	},
       			                	{
       			                		text:"Marshall Islands Maritime Administrator",
       			    				    margin:[0, 3, 0, 0],
       			    				    fontSize: 12
       			                	},
           		                    
           		                    {
           		                        image: titleImage,
           						        width: 122, 
           						        height: 124,
           						        alignment:'right',
           						        margin:[0, -124]
           		                    }
           			        ],
           			        margin:[20, 20, 0, 0]
           			}
           			
           		    ],
           		    pageSize: 'Letter',
           		    background: function(currentPage, pageSize) { 
           		        return {
           		        image: sourceToDataURL('watermark'),
           		        width: 300,
           		        absolutePosition: {x: 150, y: 260},
           		        opacity: 0.7}
           		    },
           		    styles:{
           		        rightme:
           		        {   
           		            alignment: 'center',
           		            margin: [0, 10, 80, 0]
           		        },
           		        fntSize:
           		        {
           		        	fontSize: 12
           		        }
           		    }
           		}
           		sopepReceiptletter.content.push( voidStatus==true?{//crossLine ihm receipt letter
       				canvas : [ {
       					type : 'line',
       				   	x1 : 0,
       					y1 : -40,
       					x2 : 525,
       					y2 : -765,
       					lineColor:'red',
       					lineWidth : 2
       				} 
       				],
       				absolutePosition:{x:45,y:800} 
           		}:'');		
           		console.log("This is audit Place", certificateData.auditPlace,"This is place",certificateData.auditplace);
           		return sopepReceiptletter;
           		
       		}
       		//STS Receipt Letter
       		else if(certificateData.auditTypeId==AppConstant.STS_TYPE_ID){
       			console.log(certificateData);
       			certificateData.auditPlace = certificateData.auditPlace?
    					decodeURIComponent(btoa(certificateData.auditPlace)) : '';  //Added by sudharsan on 8 MAR 2022 Receipt letter not downloading
       		    var titleImage='',voidStatus;
       		    
       		    if(certificateData.activeStatus == 0 ){
       		        
       		        voidStatus = true;
       		    }

       		    if (certificateData.title != '') {
       		        if (certificateData.title.indexOf('Special') >= 0) {
       		            titleImage = sourceToDataURL('sa');
       		        } else if (certificateData.title.indexOf('Deputy') >= 0) {
       		            titleImage = sourceToDataURL('dc');
       		        }
       		    }
       		    
       		    var splitAuditDate = certificateData.receiptdate.split('-');
       		    var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
       		    
       		    var companyaddress = certificateData.companyaddress.split("   ");
       		    
       		    var footerR = 'Rev. 2/22';
       		    var footerL = 'MI-298PR';

       		    var stsReceiptletter = {
       		        ownerPassword: '123456',
       		        permissions: {
       		        printing: 'highResolution',
       		        modifying: false,
       		        copying: false,
       		        annotating: false,
       		        fillingForms: false,
       		        contentAccessibility: false,
       		        documentAssembly: false
       		      },
       		      footer: {
       		        columns: [
       		         // 'Left part',
       		         { text: footerR, alignment: 'left', margin : [60, -10] },
       		         { text: footerL, alignment: 'right', margin : [60, -10] }
       		        ]
       		      },
       		          defaultStyle:{
       		              font:'Times'
       		          }
       		      ,
       		    content: [
       		     {
					columns: [
						{
							image: sourceToDataURL('logo'),
							width: 80,
							height: 80,
							margin: [20, 10],

						},
						{
							width: 30,
							text: '',
						},
						{
							width: '*',
							text: [
								{ text: 'R', fontSize: 18, bold: true, color: 'black' },
								{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
								{ text: 'M', fontSize: 18, bold: true, color: 'black' },
								{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
								{ text: 'I', fontSize: 18, bold: true, color: 'black' },
								{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
								{ text: 'M', fontSize: 14, bold: true, color: 'black' },
								{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
								{ text: 'A', fontSize: 14, bold: true, color: 'black' },
								{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
								//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
								
							],
							style: 'rightme',
							margin: [-70, 10, 0, 0]
						},
					]
				},
				{
					columns: [
						{
							width: 30,
							text: '',
						},
						{
							width: '*',
							text: [
								{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
							],
							style: 'rightme',
							margin: [0, -42, 0, 0]
						},
					]
				},
				{
					columns: [
						{
							width: 30,
							text: '',
						},
						{
							width: '*',
							text: [
								{ text: 'T', fontSize: 10, color: 'black' },
								{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
								{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
								{ text: ' F', fontSize: 10, color: 'black' },
								{ text: 'AX: ', fontSize: 8, color: 'black' },
								{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
								{ text: 'E', fontSize: 10, color: 'black' },
								{ text: 'MAIL:', fontSize: 8, color: 'black' },
								{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
								{ text: 'W', fontSize: 10, color: 'black' },
								{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
								{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
							],
							style: 'rightme',
							margin: [0, -30, 0, 0]
						},
					]
				},
       		        {
       		            text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0],italics:true
       		        },
       		        {
       		            columns: [
       		                    {
       		                        text:  receiptdate.replace(/^0+/, ''), 
       		                        margin: [20, 15, 0, 0],
       		                        style: 'fntSize'
       		                    }
       		            ]
       		        },
       		        {
       		            text: [
       		                {text:'RE: ',bold: true, fontSize: 12},
       		                {text: 'Ship-to-Ship (STS) Transfer Operations Plan - Receipt Letter', bold: true, fontSize: 12}
       		            ],
       		            margin:[20, 15, 0, 0]
       		        },
       		        
       		        // Vessel Details
       		        {
       		            columns: [ 
       		                    {
       		                        text: [
       		                            {text: certificateData.vesselName},
       		                            {text: " (Official No.: "+certificateData.officialNo+", "+"IMO No.: "+certificateData.vesselImoNo+", "+"Port of Registry: "+certificateData.portofreg+')'}
       		                        ],
       		                        style: 'fntSize'
       		                    },
       		                    
       		            ],
       		            margin: [20, 15, 0, 0]
       		        },
       		        {
       		            text: certificateData.companyname,
       		            margin: [20, 0, 0, 0],
       		            style: 'fntSize'
       		        },
       		        {
       		            columns:[
							[
								{
									margin: [20, 3, 0, 0],
									border: [true, true,true, true],
									 fillColor: '',
									text: [{text: certificateData.companyaddress,
											fontSize: 11,
											bold:false}]
									
									
								}],
       		             ]
       		        },
       		        {
       		         
       		        },
       		        {
       		           text: "To Whom It May Concern,",
       		           margin: [20, 15, 0, 0],
       		           style: 'fntSize'
       		        },
       		        {
       		           text: "Please be advised that the STS Transfer Operations Plan  for  the  vessel  named  above  has  been  received  for  review and  approval  by  the   Republic   of   the   Marshall   Islands   Maritime   Administrator.",
       		           margin: [20, 20, 20, 0],
       		           alignment: 'justify',
       		           style: 'fntSize'
       		        },
       		        {
       		            text: 'A copy of this letter  must be placed on the vessel until the final approved plan is on board.',
       		            margin:[20, 10, 20, 0],
       		            alignment: 'justify',
       		            style: 'fntSize'
       		        },
       		        {
       		            text:"Regards,",
       		            margin:[20, 20, 0, 0],
       		            style: 'fntSize'
       		        },
       		        {
       		            stack: [
       		            	{
								    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
								    width: 80, 
								    height: 30,
								    margin:[30, 5, 30, 0],
								    fontSize: 12
								},
       		                            {
       		                            canvas: [
       		                                      {
       		                                            type: 'line',
       		                                            x1: 0, y1: 5,
       		                                            x2: 290, y2: 5,
       		                                            lineWidth: 1
       		                                    }
       		                            ]
       		                        },
       		                        {  
       		                            text: certificateData.signerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall Islands \n Maritime Administrator",
       		                            margin : [0, 10]
       		                            
       		                        },
       		                        {
       		                            image: titleImage,
       		                            width: 120, 
       		                            height: 120,
       		                            alignment:'right',
       		                            margin:[10, -150]
       		                        }
       		                ],
       		                margin:[20, 20, 0, 0]
       		        }
       		        
       		        ],
       		        pageSize: 'Letter',

       		        background: function(currentPage, pageSize) { 
       		            return {
       		            image: sourceToDataURL('watermark'),
       		            width: 300,
       		            absolutePosition: {x: 150, y: 260},
       		            opacity: 0.7}
       		        },
       		        styles:{
       		            rightme:
       		            {   
       		                alignment: 'center',
       		                margin: [0, 10, 80, 0]
       		            },
       		            fntSize:
       		            {
       		                fontSize: 12
       		            }
       		        },
       		           
       		    }
       		    stsReceiptletter.content.push( voidStatus==true?{
       		        canvas : [ {
       		            type : 'line',
       		               x1 : 0,
       		            y1 : -40,
       		            x2 : 525,
       		            y2 : -765,
       		            lineColor:'red',
       		            lineWidth : 2
       		        } 
       		        ],
       		        absolutePosition:{x:45,y:800} 
       		    }:'');		

       		    
       		    
       		    return stsReceiptletter;
       		    
       		}
       		
       		
       		//SMPEP Receipt Letter
       		else if(certificateData.auditTypeId==AppConstant.SMPEP_TYPE_ID){
       			console.log(certificateData)
       			certificateData.auditPlace = certificateData.auditPlace?
    					decodeURIComponent(btoa(certificateData.auditPlace)) : '';   //Added by sudharsan on 8 MAR 2022 Receipt letter not downloading
           		var titleImage='',voidStatus;
           		
           		if(certificateData.activeStatus == 0 ){
           			
       				voidStatus = true;
       			}
           		
           		if (certificateData.title != '') {
       				if (certificateData.title.indexOf('Special') >= 0) {
       					titleImage = sourceToDataURL('sa');
       				} else if (certificateData.title.indexOf('Deputy') >= 0) {
       					titleImage = sourceToDataURL('dc');
       				}
       			}
           		
           		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sepr", "Octr", "Nov", "Dec"
                       ];
       			var d = certificateData.receiptdate;
       			var check = moment(certificateData.receiptdate, 'MMMDDYYYY');
       			
       			var Adate  = check.format('MMM');
           		console.log(Adate)
           		var splitAuditDate = certificateData.receiptdate.split('-');
           		var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
           		
           		var companyaddress = certificateData.companyaddress.split("   ");
           		
           		var useraddress = certificateData.companyAddressAud;
           		
           		var addressTel= useraddress.toString().split('\\nTel');
           		if(addressTel.length==1)
           			addressTel= useraddress.toString().split('\nTel');
           		console.log(addressTel)
           		console.log("splitTel "+addressTel.length)
           		var addvi='';
           		for(var i=0;i<addressTel.length-1;i++){
           			
           			var addressTel1=addressTel[i].split('\\n');
           			if(addressTel1.length==1)
           				addressTel1= addressTel[i].split('\n');
           			console.log("splitTel\n"+addressTel1.length)
           			for(var j=0;j<addressTel1.length;j++){
           				if(addvi!=''){
           	    			if(j%3==0)
           	    				addvi += '\n' + addressTel1[j]+ ",";
           	    			else	
           	    				addvi += ' ' +addressTel1[j]+ ",";
           	    		}else{
               				addvi = addressTel1[j]+ ",";
               			}
           			}
           		}
           		var Tel;
           		if(addressTel.length==1){
       	    			var addressTel1=addressTel[0].split('\\n');
       	    			if(addressTel1.length==1)
       	    				addressTel1= addressTel[0].split('\n');
       	    			console.log("splitTel\n"+addressTel1.length)
       	    			for(var j=0;j<addressTel1.length;j++){
       	    				if(addvi!=''){
       	    	    			if(j%3==0)
       	    	    				addvi += '\n' + addressTel1[j]+ ",";
       	    	    			else	
       	    	    				addvi += ' ' +addressTel1[j]+ ",";
       	    	    		}else{
       	        				addvi = addressTel1[j]+ ",";
       	        			}
       	    			}
       	    			if(addvi==''){
       	    				addvi = addressTel[0].replace('\\n',' ');
       	    				addvi = addressTel[0].replace('\n',' ');
       	    			}
           		}else if(addressTel.length>1){
           				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
           				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
           		}
           		useraddress = addvi;
           		
           		var footerR = 'Rev. 2/22';
           		var footerL = 'MI-298MR';

           		var smpepReceiptletter = {
           		    ownerPassword: '123456',
           		    permissions: {
           		    printing: 'highResolution',
           		    modifying: false,
           		    copying: false,
           		    annotating: false,
           		    fillingForms: false,
           		    contentAccessibility: false,
           		    documentAssembly: false
           		  },
           		  footer: {
           		    columns: [

           		     { text: footerR, alignment: 'left', margin : [60, -10] },
           		     { text: footerL, alignment: 'right', margin : [60, -10] }
           		    ]
           		  },
           			  defaultStyle:{
           				  font:'Times'
           			  }
           		  ,
           		content: [
					{
						columns: [
							{
								image: sourceToDataURL('logo'),
								width: 80,
								height: 80,
								margin: [20, 10],

							},
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'R', fontSize: 18, bold: true, color: 'black' },
									{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 18, bold: true, color: 'black' },
									{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
									{ text: 'I', fontSize: 18, bold: true, color: 'black' },
									{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
									{ text: 'M', fontSize: 14, bold: true, color: 'black' },
									{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
									{ text: 'A', fontSize: 14, bold: true, color: 'black' },
									{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
									//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
									
								],
								style: 'rightme',
								margin: [-70, 10, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
								],
								style: 'rightme',
								margin: [0, -42, 0, 0]
							},
						]
					},
					{
						columns: [
							{
								width: 30,
								text: '',
							},
							{
								width: '*',
								text: [
									{ text: 'T', fontSize: 10, color: 'black' },
									{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
									{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
									{ text: ' F', fontSize: 10, color: 'black' },
									{ text: 'AX: ', fontSize: 8, color: 'black' },
									{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
									{ text: 'E', fontSize: 10, color: 'black' },
									{ text: 'MAIL:', fontSize: 8, color: 'black' },
									{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
									{ text: 'W', fontSize: 10, color: 'black' },
									{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
									{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
								],
								style: 'rightme',
								margin: [0, -30, 0, 0]
							},
						]
					},
           		    {	
       				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
       				},
           			{
           			    columns: [
           						{
           							text:  receiptdate.replace(/^0+/, ''), 
           							margin: [20, 15, 0, 0],
           							fontSize: 12
           						}
           				]
           			},
           			{
           			    text: [
           			        {text:'RE: Shipboard Marine Pollution Emergency Plan (SMPEP)- Receipt Letter',bold: true, fontSize: 12},
           			    ],
           			    margin:[20, 15, 0, 0]
           			},
           			
           			// Vessel Details

           			{
       					text: certificateData.vesselName+' (Official No.: '+certificateData.officialNo+', IMO No.: '+certificateData.vesselImoNo+', Port of Registry: '+certificateData.portofreg+')',
       					margin: [20, 15, 0, 10],
       					fontSize: 12
       			    },
       			          			
           			// Company Details
       			    {
       			    	
       			    	margin: [20, 0, 0, 0],
       			    	table: {
       			    		widths: [515,30],
       			        	heights: [20,10],
       			    	body: [
       			    	   
       			    	   		
       			    			[
       			    			{
       			    				margin: [0, -10, 0, 0],
       			    			    border: [true, true,true, true],
       			    	 			fillColor: '',
       			    				text: [{text: certificateData.companyaddress,
       			    					    fontSize: 11,
       			    					    bold:false}]
       			    			    
       			    			    
       			    			}],
       			    			
       			    	    ]},
       			    		layout: 'noBorders'
       			    },
           			{
           			   
           			},
           			{
           			   text: "To Whom It May Concern,",
           			   margin: [20, 15, 0, 0],
           			   fontSize: 12
           			},
           			{
           			   text: "Please be advised that the SMPEP for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator.",
           			   margin: [20, 10, 20, 0],
           			   alignment: 'justify',
           			   fontSize: 12
           			},
           			{
           			    text: 'A copy of this letter must be placed on the vessel until the final approved plan is on board.',
           			    margin:[20, 10, 20, 0],
           			    alignment: 'justify',
           			    fontSize: 12
           			},
           			{
       				    text:"Regards,",
       				    margin:[20, 40, 0, -14],
       				    fontSize: 12
       				},
       				{
       				    stack: [
       		    				  
       				    				{
       									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
       									    width: 80, 
       									    height: 30,
       									    //alignment:'right',
       									    margin:[30, 5, 30, 0],
       									    fontSize: 12
       									},
       									{
       			                        canvas: [
       				                              {
       			                    					type: 'line',
       			                    					x1: 0, y1: 5,
       			                    					x2: 215, y2: 5,
       			                    					lineWidth: 1
       							                }
       				                    ]
       			                    },
       			                  
       			                	{
       			                		text: certificateData.signerName,/** Fixed IRI-5272 code changed by kiran */
       			                		margin:[0, 3, 0, 0],
       			                		fontSize: 12
       			                	},
       			                	{
       			                		text: certificateData.title,
       			                		fontSize: 12,
       			                		margin:[0, 3, 0, 0]
       			                	},
       			                
       			                	{
       			                		text:"Issued by the authority of the Republic of the\n",
       			    				    margin:[0, 3, 0, 0],
       			    				    fontSize: 12
       			                	},
       			                	{
       			                		text:"Marshall Islands Maritime Administrator",
       			    				    margin:[0, 3, 0, 0],
       			    				    fontSize: 12
       			                	},
           		                    
           		                    {
           		                        image: titleImage,
           						        width: 122, 
           						        height: 124,
           						        alignment:'right',
           						        margin:[0, -124]
           		                    }
           			        ],
           			        margin:[20, 20, 0, 0]
           			}
           			
           		    ],
           		    pageSize: 'Letter',

           		    background: function(currentPage, pageSize) { 
           		        return {
           		        image: sourceToDataURL('watermark'),
           		        width: 300,
           		        absolutePosition: {x: 150, y: 260},
           		        opacity: 0.7}
           		    },
           		    styles:{
           		        rightme:
           		        {   
           		            alignment: 'center',
           		            margin: [0, 10, 80, 0]
           		        },
           		        fntSize:
           		        {
           		        	fontSize: 12
           		        }
           		    }
           		}
           		smpepReceiptletter.content.push( voidStatus==true?{//crossLine ihm receipt letter
       				canvas : [ {
       					type : 'line',
       				   	x1 : 0,
       					y1 : -40,
       					x2 : 525,
       					y2 : -765,
       					lineColor:'red',
       					lineWidth : 2
       				} 
       				],
       				absolutePosition:{x:45,y:800} 
           		}:'');		
           		console.log("This is audit Place", certificateData.auditPlace,"This is place",certificateData.auditplace);
           		return smpepReceiptletter;
       		}
       		
       		//BWMP Receipt Letter
       		else if(certificateData.auditTypeId==AppConstant.BWS_TYPE_ID){
       			
       	    		console.log(certificateData)
       	    		certificateData.auditPlace = certificateData.auditPlace?
    					decodeURIComponent(btoa(certificateData.auditPlace)) : '';  //Added by sudharsan on 8 MAR 2022 Receipt letter not downloading
       	    		var titleImage='',voidStatus;
       	    		
       	    		if(certificateData.activeStatus == 0 ){
       	    			
       					voidStatus = true;
       				}
       	    		
       	    		if (certificateData.title != '') {
       					if (certificateData.title.indexOf('Special') >= 0) {
       						titleImage = sourceToDataURL('sa');
       					} else if (certificateData.title.indexOf('Deputy') >= 0) {
       						titleImage = sourceToDataURL('dc');
       					}
       				}
       	    		
       	    		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
       	                  "Jul", "Aug", "Sepr", "Octr", "Nov", "Dec"
       	                ];
       				var d = certificateData.receiptdate;
       				var check = moment(certificateData.receiptdate, 'MMMDDYYYY');
       				
       				var Adate  = check.format('MMM');
       	    		console.log(Adate)
       	    		var splitAuditDate = certificateData.receiptdate.split('-');
       	    		var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
       	    		
       	    		var companyaddress = certificateData.companyaddress.split("   ");
       	    		
       	    		var useraddress = certificateData.companyAddressAud;

       	    		var addressTel= useraddress.toString().split('\\nTel');
       	    		if(addressTel.length==1)
       	    			addressTel= useraddress.toString().split('\nTel');
       	    		console.log(addressTel)
       	    		console.log("splitTel "+addressTel.length)
       	    		var addvi='';
       	    		for(var i=0;i<addressTel.length-1;i++){
       	    			
       	    			var addressTel1=addressTel[i].split('\\n');
       	    			if(addressTel1.length==1)
       	    				addressTel1= addressTel[i].split('\n');
       	    			console.log("splitTel\n"+addressTel1.length)
       	    			for(var j=0;j<addressTel1.length;j++){
       	    				if(addvi!=''){
       	    	    			if(j%3==0)
       	    	    				addvi += '\n' + addressTel1[j]+ ",";
       	    	    			else	
       	    	    				addvi += ' ' +addressTel1[j]+ ",";
       	    	    		}else{
       	        				addvi = addressTel1[j]+ ",";
       	        			}
       	    			}
       	    		}
       	    		var Tel;
       	    		if(addressTel.length==1){
       		    			var addressTel1=addressTel[0].split('\\n');
       		    			if(addressTel1.length==1)
       		    				addressTel1= addressTel[0].split('\n');
       		    			console.log("splitTel\n"+addressTel1.length)
       		    			for(var j=0;j<addressTel1.length;j++){
       		    				if(addvi!=''){
       		    	    			if(j%3==0)
       		    	    				addvi += '\n' + addressTel1[j]+ ",";
       		    	    			else	
       		    	    				addvi += ' ' +addressTel1[j]+ ",";
       		    	    		}else{
       		        				addvi = addressTel1[j]+ ",";
       		        			}
       		    			}
       		    			if(addvi==''){
       		    				addvi = addressTel[0].replace('\\n',' ');
       		    				addvi = addressTel[0].replace('\n',' ');
       		    			}
       	    		}else if(addressTel.length>1){
       	    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
       	    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
       	    		}
       	    		useraddress = addvi;
       	    		

       	    		var footerR = 'Rev. 2/22';
       	    		var footerL = 'MI-298WR';


       	    		var bwmpReceiptletter = {
       	    		    ownerPassword: '123456',
       	    		    permissions: {
       	    		    printing: 'highResolution',
       	    		    modifying: false,
       	    		    copying: false,
       	    		    annotating: false,
       	    		    fillingForms: false,
       	    		    contentAccessibility: false,
       	    		    documentAssembly: false
       	    		  },
       	    		  footer: {
       	    		    columns: [

       	    		     { text: footerR, alignment: 'left', margin : [60, -10] },
       	    		     { text: footerL, alignment: 'right', margin : [60, -10] }
       	    		    ]
       	    		  },
       	    			  defaultStyle:{
       	    				  font:'Times'
       	    			  }
       	    		  ,
       	    		content: [
						{
							columns: [
								{
									image: sourceToDataURL('logo'),
									width: 80,
									height: 80,
									margin: [20, 10],

								},
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'R', fontSize: 18, bold: true, color: 'black' },
										{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 18, bold: true, color: 'black' },
										{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'I', fontSize: 18, bold: true, color: 'black' },
										{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 14, bold: true, color: 'black' },
										{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
										{ text: 'A', fontSize: 14, bold: true, color: 'black' },
										{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
										//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
										
									],
									style: 'rightme',
									margin: [-70, 10, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
									],
									style: 'rightme',
									margin: [0, -42, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'T', fontSize: 10, color: 'black' },
										{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
										{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
										{ text: ' F', fontSize: 10, color: 'black' },
										{ text: 'AX: ', fontSize: 8, color: 'black' },
										{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
										{ text: 'E', fontSize: 10, color: 'black' },
										{ text: 'MAIL:', fontSize: 8, color: 'black' },
										{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
										{ text: 'W', fontSize: 10, color: 'black' },
										{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
										{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
									],
									style: 'rightme',
									margin: [0, -30, 0, 0]
								},
							]
						},
       	    		    {	
       					    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
       					},
       	    			{
       	    			    columns: [
       	    						{
       	    							text:  receiptdate.replace(/^0+/, ''), 
       	    							margin: [20, 15, 0, 0],
       	    							fontSize: 12
       	    						}
       	    				]
       	    			},
       	    			{
       	    			    text: [
       	    			        {text:'RE: Ballast Water Management Plan (BWMP) - Receipt Letter',bold: true, fontSize: 12},
       	    			    ],
       	    			    margin:[20, 15, 0, 0]
       	    			},
       	    			
       	    			// Vessel Details

       	    			{
       						text: certificateData.vesselName+' (Official No.: '+certificateData.officialNo+', IMO No.: '+certificateData.vesselImoNo+', Port of Registry: '+certificateData.portofreg+')',
       						margin: [20, 15, 0, 10],
       						fontSize: 12
       				    },
       				 
       	    			
       	    			// Company Details
       				    {
       				    	
       				    	margin: [20, 0, 0, 0],
       				    	table: {
       				    		widths: [515,30],
       				        	heights: [20,10],
       				    	body: [
       				    	   
       				    	   		
       				    			[
       				    			{
       				    				margin: [0, -10, 0, 0],
       				    			    border: [true, true,true, true],
       				    	 			fillColor: '',
       				    				text: [{text: certificateData.companyaddress,
       				    					    fontSize: 12,
       				    					    bold:false}]
       				    			    
       				    			    
       				    			}],
       				    			
       				    	    ]},
       				    		layout: 'noBorders'
       				    },
       	    			{
       	    			    
       	    			},
       	    			{
       	    			   text: "To Whom It May Concern,",
       	    			   margin: [20, 15, 0, 0],
       	    			   fontSize: 12
       	    			},
       	    			{
       	    			   text: "Please be advised that the BWMP for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator.",
       	    			   margin: [20, 10, 20, 0],
       	    			   alignment: 'justify',
       	    			   fontSize: 12
       	    			},
       	    			{
       	    			    text: 'A copy of this letter must be placed on the vessel until the final approved plan is on board.',
       	    			    margin:[20, 10, 20, 0],
       	    			    alignment: 'justify',
       	    			    fontSize: 12
       	    			},
       	    			{
       					    text:"Regards,",
       					    margin:[20, 40, 0, -14],
       					    fontSize: 12
       					},
       					{
       					    stack: [
       			    				    	
       					    				{
       										    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
       										    width: 80, 
       										    height: 30,
       										    //alignment:'right',
       										    margin:[30, 5, 30, 0],
       										    fontSize: 12
       										},
       										{
       				                        canvas: [
       					                              {
       				                    					type: 'line',
       				                    					x1: 0, y1: 5,
       				                    					x2: 215, y2: 5,
       				                    					lineWidth: 1
       								                }
       					                    ]
       				                    },
       				                  
       				                	{
       				                		text: certificateData.signerName,/** Fixed IRI-5272 code changed by kiran */
       				                		margin:[0, 3, 0, 0],
       				                		fontSize: 12
       				                	},
       				                	{
       				                		text: certificateData.title,
       				                		fontSize: 12,
       				                		margin:[0, 3, 0, 0]
       				                	},
       				                	
       				                	{
       				                		text:"Issued by the authority of the Republic of the\n",
       				    				    margin:[0, 3, 0, 0],
       				    				    fontSize: 12
       				                	},
       				                	{
       				                		text:"Marshall Islands Maritime Administrator",
       				    				    margin:[0, 3, 0, 0],
       				    				    fontSize: 12
       				                	},
       	    		                    
       	    		                    {
       	    		                        image: titleImage,
       	    						        width: 122, 
       	    						        height: 124,
       	    						        alignment:'right',
       	    						        margin:[0, -124]
       	    		                    }
       	    			        ],
       	    			        margin:[20, 20, 0, 0]
       	    			}
       	    			
       	    		    ],
       	    		    pageSize: 'Letter',

       	    		    background: function(currentPage, pageSize) { 
       	    		        return {
       	    		        image: sourceToDataURL('watermark'),
       	    		        width: 300,
       	    		        absolutePosition: {x: 150, y: 260},
       	    		        opacity: 0.7}
       	    		    },
       	    		    styles:{
       	    		        rightme:
       	    		        {   
       	    		            alignment: 'center',
       	    		            margin: [0, 10, 80, 0]
       	    		        },
       	    		        fntSize:
       	    		        {
       	    		        	fontSize: 12
       	    		        }
       	    		    }
       	    		}
       	    		bwmpReceiptletter.content.push( voidStatus==true?{//crossLine ihm receipt letter
       					canvas : [ {
       						type : 'line',
       					   	x1 : 0,
       						y1 : -40,
       						x2 : 525,
       						y2 : -765,
       						lineColor:'red',
       						lineWidth : 2
       					} 
       					],
       					absolutePosition:{x:45,y:800} 
       	    		}:'');		
       	    		
       	    		return bwmpReceiptletter;
       	    		
       		}
       		
       		//VOC Receipt Letter
					else if (certificateData.auditTypeId == AppConstant.VOC_TYPE_ID) {
						console.log(certificateData);
						certificateData.auditPlace = certificateData.auditPlace ?
							decodeURIComponent(btoa(certificateData.auditPlace)) : '';   //Added by sudharsan on 8 MAR 2022 Receipt letter not downloading
						var titleImage = '', voidStatus;

						if (certificateData.activeStatus == 0) {

							voidStatus = true;
						}

						if (certificateData.title != '') {
							if (certificateData.title.indexOf('Special') >= 0) {
								titleImage = sourceToDataURL('sa');
							} else if (certificateData.title.indexOf('Deputy') >= 0) {
								titleImage = sourceToDataURL('dc');
							}
						}

						var splitAuditDate = certificateData.receiptdate.split('-');
						var receiptdate = splitAuditDate[0] + ' ' + splitAuditDate[1] + ' ' + splitAuditDate[2]

						var companyaddress = certificateData.companyaddress.split("   ");
						var footerR = 'Rev. 2/22';
						var footerL = 'MI-298VR';

						var vocReceiptletter = {
							ownerPassword: '123456',
							permissions: {
								printing: 'highResolution',
								modifying: false,
								copying: false,
								annotating: false,
								fillingForms: false,
								contentAccessibility: false,
								documentAssembly: false
							},
							footer: {
								columns: [
									// 'Left part',
									{ text: footerR, alignment: 'left', margin: [60, -10] },
									{ text: footerL, alignment: 'right', margin: [60, -10] }
								]
							},
							defaultStyle: {
								font: 'Times'
							}
							,
							content: [
								{
									columns: [
										{
											image: sourceToDataURL('logo'),
											width: 80,
											height: 80,
											margin: [20, 10],
		
										},
										{
											width: 30,
											text: '',
										},
										{
											width: '*',
											text: [
												{ text: 'R', fontSize: 18, bold: true, color: 'black' },
												{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
												{ text: 'M', fontSize: 18, bold: true, color: 'black' },
												{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
												{ text: 'I', fontSize: 18, bold: true, color: 'black' },
												{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
												{ text: 'M', fontSize: 14, bold: true, color: 'black' },
												{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
												{ text: 'A', fontSize: 14, bold: true, color: 'black' },
												{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
												//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
												
											],
											style: 'rightme',
											margin: [-70, 10, 0, 0]
										},
									]
								},
								{
									columns: [
										{
											width: 30,
											text: '',
										},
										{
											width: '*',
											text: [
												{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
											],
											style: 'rightme',
											margin: [0, -42, 0, 0]
										},
									]
								},
								{
									columns: [
										{
											width: 30,
											text: '',
										},
										{
											width: '*',
											text: [
												{ text: 'T', fontSize: 10, color: 'black' },
												{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
												{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
												{ text: ' F', fontSize: 10, color: 'black' },
												{ text: 'AX: ', fontSize: 8, color: 'black' },
												{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
												{ text: 'E', fontSize: 10, color: 'black' },
												{ text: 'MAIL:', fontSize: 8, color: 'black' },
												{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
												{ text: 'W', fontSize: 10, color: 'black' },
												{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
												{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
											],
											style: 'rightme',
											margin: [0, -30, 0, 0]
										},
									]
								},
								{
									text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
								},
								{
									columns: [
										{
											text: receiptdate.replace(/^0+/, ''),
											margin: [20, 15, 0, 0],
											style: 'fntSize'
										}
									]
								},
								{
									text: [
										{ text: 'RE: ', bold: true, fontSize: 12 },
										{ text: 'Volatile Organic Compounds (VOC) Management Plan - Receipt Letter', bold: true, fontSize: 12 }
									],
									margin: [20, 15, 0, 0]
								},

								// Vessel Details
								{
									columns: [
										{
											text: [
												{ text: certificateData.vesselName },
												{ text: " (Official No.: " + certificateData.officialNo + ", " + "IMO No.: " + certificateData.vesselImoNo + ", " + "Port of Registry: " + certificateData.portofreg + ')' }
											],
											style: 'fntSize'
										},

									],
									margin: [20, 15, 0, 0]
								},
								{
									text: certificateData.companyname,
									margin: [20, 0, 0, 0],
									style: 'fntSize'
								},
								{
									columns: [
										[
											{
												margin: [20, 3, 0, 0],
												border: [true, true,true, true],
												 fillColor: '',
												text: [{text: certificateData.companyaddress,
														fontSize: 11,
														bold:false}]
												
												
											}],
									]
								},

								{
									text: "To Whom It May Concern,",
									margin: [20, 15, 0, 0],
									style: 'fntSize'
								},
								{
									text: "Please be advised that the VOC Management Plan for  the  vessel  named  above  has  been  received  for  review and  approval  by  the   Republic   of   the   Marshall   Islands   Maritime   Administrator.",
									margin: [20, 20, 20, 0],
									alignment: 'justify',
									style: 'fntSize'
								},
								{
									text: 'A copy of this letter  must be placed on the vessel until the final approved plan is on board.',
									margin: [20, 10, 20, 0],
									alignment: 'justify',
									style: 'fntSize'
								},
								{
									text: "Regards,",
									margin: [20, 20, 0, 0],
									style: 'fntSize'
								},
								{
									stack: [
										{
											image: (certificateData.leadSign) ? "data:image/png;base64," + certificateData.leadSign : sourceToDataURL('transparent'),
											width: 80,
											height: 30,
											//alignment:'right',
											margin: [30, 5, 30, 0],
											fontSize: 12
										},
										{
											canvas: [
												{
													type: 'line',
													x1: 0, y1: 5,
													x2: 290, y2: 5,
													lineWidth: 1
												}
											]
										},
										{
											text: certificateData.signerName + "\n" + certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall Islands \n Maritime Administrator",
											margin: [0, 10]

										},
										{
											image: titleImage,
											width: 120,
											height: 120,
											alignment: 'right',
											margin: [10, -150]
										}
									],
									margin: [20, 20, 0, 0]
								}

							],
							pageSize: 'Letter',
							//       		    			pageMargins: [10, 10, 20, 10],
							background: function (currentPage, pageSize) {
								return {
									image: sourceToDataURL('watermark'),
									width: 300,
									absolutePosition: { x: 150, y: 260 },
									opacity: 0.7
								}
							},
							styles: {
								rightme:
								{
									alignment: 'center',
									margin: [0, 10, 80, 0]
								},
								fntSize:
								{
									fontSize: 12
								}
							},

						}
						vocReceiptletter.content.push(voidStatus == true ? {
							canvas: [{
								type: 'line',
								x1: 0,
								y1: -40,
								x2: 525,
								y2: -765,
								lineColor: 'red',
								lineWidth: 2
							}
							],
							absolutePosition: { x: 45, y: 800 }
						} : '');

						return vocReceiptletter;

					}
       		
       		 	//** COW Receipt Letter -added by kiran */

				   else if(certificateData.auditTypeId==AppConstant.COW_TYPE_ID){
					console.log(certificateData);
					certificateData.auditPlace = certificateData.auditPlace ?
							decodeURIComponent(btoa(certificateData.auditPlace)) : ''; 
					var titleImage='',voidStatus;
					
					if(certificateData.activeStatus == 0 ){
						
						voidStatus = true;
					}
 
					if (certificateData.title != '') {
						if (certificateData.title.indexOf('Special') >= 0) {
							titleImage = sourceToDataURL('sa');
						} else if (certificateData.title.indexOf('Deputy') >= 0) {
							titleImage = sourceToDataURL('dc');
						}
					}
					
					var splitAuditDate = certificateData.receiptdate.split('-');
					var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
					
					var companyaddress = certificateData.companyaddress.split("   ");
					var footerR = 'Rev. 2/22';
					var footerL = 'MI-298XR';
 
					var vocReceiptletter = {
						ownerPassword: '123456',
						permissions: {
						printing: 'highResolution',
						modifying: false,
						copying: false,
						annotating: false,
						fillingForms: false,
						contentAccessibility: false,
						documentAssembly: false
					  },
					  footer: {
						columns: [
						 // 'Left part',
						 { text: footerR, alignment: 'left', margin : [60, -10] },
						 { text: footerL, alignment: 'right', margin : [60, -10] }
						]
					  },
						  defaultStyle:{
							  font:'Times'
						  }
					  ,
					content: [
						{
							columns: [
								{
									image: sourceToDataURL('logo'),
									width: 80,
									height: 80,
									margin: [20, 10],

								},
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'R', fontSize: 18, bold: true, color: 'black' },
										{ text: 'EPUBLIC OF THE ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 18, bold: true, color: 'black' },
										{ text: 'ARSHALL ', fontSize: 14, bold: true, color: 'black' },
										{ text: 'I', fontSize: 18, bold: true, color: 'black' },
										{ text: 'SLANDS\n', fontSize: 14, bold: true, color: 'black' },
										{ text: 'M', fontSize: 14, bold: true, color: 'black' },
										{ text: 'ARITIME ', fontSize: 12, bold: true, color: 'black' },
										{ text: 'A', fontSize: 14, bold: true, color: 'black' },
										{ text: 'DMINISTRATOR\n\n', fontSize: 12, bold: true, color: 'black' },
										//{text: useraddress , fontSize: 10, bold: false, color: 'black'},
										
									],
									style: 'rightme',
									margin: [-70, 10, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506', fontSize: 10, color: 'black' }, /**fixed IRI-5322 code changed by kiran */ 
									],
									style: 'rightme',
									margin: [0, -42, 0, 0]
								},
							]
						},
						{
							columns: [
								{
									width: 30,
									text: '',
								},
								{
									width: '*',
									text: [
										{ text: 'T', fontSize: 10, color: 'black' },
										{ text: 'ELEPHONE:', fontSize: 8, color: 'black' },
										{ text: '+1-703-620-4880 ', fontSize: 10, color: 'black' },
										{ text: ' F', fontSize: 10, color: 'black' },
										{ text: 'AX: ', fontSize: 8, color: 'black' },
										{ text: '+1-703-476-8522 \n', fontSize: 10, color: 'black' },
										{ text: 'E', fontSize: 10, color: 'black' },
										{ text: 'MAIL:', fontSize: 8, color: 'black' },
										{ text: 'MSC@register-iri.com   ', fontSize: 10, color: 'black' },
										{ text: 'W', fontSize: 10, color: 'black' },
										{ text: 'EBSITE: ', fontSize: 8, color: 'black' },
										{ text: 'www.register-iri.com', fontSize: 10, color: 'black' },
									],
									style: 'rightme',
									margin: [0, -30, 0, 0]
								},
							]
						},	
						{
							text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0],italics:true
						},
						{
							columns: [
									{
										text:  receiptdate.replace(/^0+/, ''), 
										margin: [20, 15, 0, 0],
										style: 'fntSize'
									}
							]
						},
						{
							text: [
								{text:'RE: ',bold: true, fontSize: 12},
								{text: 'Crude Oil Washing (COW) Operations and Equipment Manual - Receipt Letter', bold: true, fontSize: 12}
							],
							margin:[20, 15, 0, 0]
						},
						
						// Vessel Details
						{
							columns: [ 
									{
										text: [
											{text: certificateData.vesselName},
											{text: " (Official No.: "+certificateData.officialNo+", "+"IMO No.: "+certificateData.vesselImoNo+", "+"Port of Registry: "+certificateData.portofreg+')'}
										],
										style: 'fntSize'
									},
									
							],
							margin: [20, 15, 0, 0]
						},
						{
							text: certificateData.companyname,
							margin: [20, 0, 0, 0],
							style: 'fntSize'
						},
						{
							columns:[
								[
									{
										margin: [20, 3, 0, 0],
										border: [true, true,true, true],
										 fillColor: '',
										text: [{text: certificateData.companyaddress,
												fontSize: 11,
												bold:false}]
										
										
									}],
							 ]
						},
						
						{
						   text: "To Whom It May Concern,",
						   margin: [20, 15, 0, 0],
						   style: 'fntSize'
						},
						{
						   text: "Please be advised that the COW Operations and Equipment Manual for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator.",
						   margin: [20, 20, 20, 0],
						   alignment: 'justify',
						   style: 'fntSize'
						},
						{
							text: 'A copy of this letter must be placed on the vessel until the final approved manual is on board.',
							margin:[20, 10, 20, 0],
							alignment: 'justify',
							style: 'fntSize'
						},
						{
							text:"Regards,",
							margin:[20, 20, 0, 0],
							style: 'fntSize'
						},
						{
							stack: [
								{
									 image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									 width: 80, 
									 height: 30,
									 //alignment:'right',
									 margin:[30, 5, 30, 0],
									 fontSize: 12
								 },
											{
											canvas: [
													  {
															type: 'line',
															x1: 0, y1: 5,
															x2: 290, y2: 5,
															lineWidth: 1
													}
											]
										},
										{  
											text: certificateData.signerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the Marshall Islands \n Maritime Administrator",
											margin : [0, 10]
											
										},
										{
											image: titleImage,
											width: 120, 
											height: 120,
											alignment:'right',
											margin:[10, -150]
										}
								],
								margin:[20, 20, 0, 0]
						}
						
						],
						pageSize: 'Letter',
 //       		    			pageMargins: [10, 10, 20, 10],
						background: function(currentPage, pageSize) { 
							return {
							image: sourceToDataURL('watermark'),
							width: 300,
							absolutePosition: {x: 150, y: 260},
							opacity: 0.7}
						},
						styles:{
							rightme:
							{   
								alignment: 'center',
								margin: [0, 10, 80, 0]
							},
							fntSize:
							{
								fontSize: 12
							}
						},
						   
					}
					vocReceiptletter.content.push( voidStatus==true?{
						canvas : [ {
							type : 'line',
							   x1 : 0,
							y1 : -40,
							x2 : 525,
							y2 : -765,
							lineColor:'red',
							lineWidth : 2
						} 
						],
						absolutePosition:{x:45,y:800} 
					}:'');		
								  
					return vocReceiptletter;
					
				}
       		
       		
       			
       	};
    	
    	
    	

    	
    	/* End New 6 PlanAppoval recepit letters */
    	
    	
    	
		/*function approveletter(certificateData) {

			$('#canvas').remove();

			console.log(certificateData);

			var issuedatecontent = '', certificatecontent = '', certificatecontent1 = '', tempreview = '', certificatecontent2 = '', certificatecontent3 = '';

			var canvasEle = document.createElement('canvas');

			canvasEle.id = "canvas";
			canvasEle.width = 797;
			canvasEle.height = 1122;

			var body = document.getElementsByTagName("body")[0];
			body.appendChild(canvasEle);

			var canvashidden = angular.element(document
					.querySelector('#canvas'));
			canvashidden.addClass('hidden');

			var image1 = new Image();

			var doc = new jsPDF('p', 'mm', 'a4');
			var canvas = document.getElementById("canvas"), revdate = "Sep/2017",

			lines, top = 70, left = 90;
			var ctx = canvas.getContext('2d');

			function wrapText(context, text, x, maxWidth, lineHeight) {

				var words = text.split(' '), line = '', lineCount = 0, i, test, metrics;

				for (i = 0; i < words.length; i++) {
					test = words[i];
					metrics = context.measureText(test);
					while (metrics.width > maxWidth) {
						test = test.substring(0, test.length - 1);
						metrics = context.measureText(test);
					}
					if (words[i] != test) {
						words.splice(i + 1, 0, words[i].substr(test.length))
						words[i] = test;
					}

					test = line + words[i] + ' ';
					metrics = context.measureText(test);

					if (metrics.width > maxWidth && i > 0) {
						context.fillText(line, x, top);
						top += 20;
						line = words[i] + ' ';
						lineCount++;
					} else {
						line = test;
					}
				}

				context.fillText(line, x, top);
				top += 20;
			}

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			var images = document.getElementById("images");

			ctx.fillStyle = "#000000";

			ctx.drawImage(images, left + 20, top - 20, 100, 100);

			ctx.font = "500 12px italic";

			ctx.fillText("Maritime Administrator", left + 15, top + 100);

			ctx.font = "800 21px Times New Roman";
			ctx.fillText("Republic of the Marshall Islands", left + 180,
					top = top + 15);

			ctx.font = "800 16px Times New Roman";
			ctx.fillText("Maritime Administrator", left + 240, top = top + 30);

			ctx.font = "500 13px Times New Roman";
			ctx.fillText(
					"11495 Commerce Park Drive, Reston, Virginia 20191-1507",
					left + 180, top = top + 50);

			ctx.fillText("Telephone: (703) 620-4880   Fax: (703) 476-8522",
					left + 210, top = top + 15);

			ctx
					.fillText(
							"Email: msc@register-iri.com   Website: www.register-iri.com",
							left + 180, top = top + 15);

			ctx.font = "800 15px Times New Roman";

			if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {
				top = top + 40;

			} else {
				top = top + 80;

			}

			ctx.fillText(certificateData.auditDate, left, top);

			top = top + 50;

			ctx.font = "800 15px Times New Roman";

			var Addrestemp = certificateData.companyname.split('\n');

			for (var i = 0; i < Addrestemp.length; i++) {

				wrapText(ctx, Addrestemp[i], left, 600, '\n', " ");

			}

			ctx.font = "800 15px Times New Roman";

			var Addrestemp = certificateData.companyaddress.split('\n');

			for (var i = 0; i < Addrestemp.length; i++) {

				wrapText(ctx, Addrestemp[i], left, 600, '\n', " ");

			}

			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				issuedatecontent = certificateData.vesselName
						+ ' (Official Number '
						+ certificateData.officialNo
						+ '; IMO Number '
						+ certificateData.vesselImoNo
						+ ') - Declaration of Maritime Labour Compliance (DMLC), Part II Approval.';

				certificatecontent = 'The DMLC, Part II revision ('
						+ certificateData.revisionNo
						+ '), dated ('
						+ certificateData.certIssueDate
						+ '), for the vessel named above has been reviewed by the Republic of the Marshall Islands (RMI) Maritime Administrator pursuant to Standard A5.1.3, paragraph 10 of the Maritime Labour Convention, 2006 (MLC, 2006) and RMI requirements for implementing MLC, 2006. The DMLC, Part II is considered satisfactory subject to: ';

				certificatecontent1 = 'Satisfactory completion of onboard inspection to verify implementation of the measures drawn up by the shipowner in the DMLC, Part II.';

			} else if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				issuedatecontent = certificateData.vesselName
						+ ' (Official Number ' + certificateData.officialNo
						+ '; IMO Number ' + certificateData.vesselImoNo
						+ ') - Ship Security Plan (SSP) Approval.';

				certificatecontent = 'The SSP revision ('
						+ certificateData.revisionNo
						+ '), dated ('
						+ certificateData.certIssueDate
						+ '), for the vessel named above has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the Administrator) and is found to be in compliance with Part A of the International Ship and Port Facility Security (ISPS) Code.';

				certificatecontent1 = 'During the review of the SSP, it was verified that the SSP has been developed in accordance with ISPS Code A/9.4, and the provisions of ISPS Code B/8.1 to B/13.8 have been duly taken into account and applied as appropriate for the ship.';

				certificatecontent2 = 'Any changes to the approved SSP or to any security equipment specified in the approved SSP are to be submitted to the Administrator for review and approval prior to implementation. ';

				certificatecontent3 = 'A copy of this letter and any subsequent amendments shall be available on board and shall be presented together with the International Ship Security Certificate (or the Interim International Ship Security Certificate).';

			}

			top = top + 30;

			ctx.font = "900 15px Times New Roman";
			ctx.fillText("RE : ", left, top);

			ctx.font = "500 16px Times New Roman";
			wrapText(ctx, issuedatecontent, left + 40, 600, 18);

			if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				top = top + 10;

			} else {
				top = top + 30;

			}

			ctx.fillText("To Whom It May Concern:", left, top);

			if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				top = top + 30;

			} else {
				top = top + 50;

			}

			wrapText(ctx, certificatecontent, left, 640, 18);

			top = top + 30;

			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				ctx.fillText("1.", left + 50, top);

				wrapText(ctx, certificatecontent1, left + 80, 500, 18);

			} else {

				wrapText(ctx, certificatecontent1, left, 640, 18);
			}

			if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {
				if (certificateData.auditSubTypeId == AppConstant.SSP_DMLC_INITIAL_AUD_SUBTYPEID) {
					top = top + 30;

					wrapText(ctx, certificatecontent2, left, 640, 18);

					top = top + 30;

					wrapText(ctx, certificatecontent3, left, 640, 18);
				}
			}

			ctx.fillText("Regards,", left, top = top + 30);

			tempreview = top;

			if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				top = top + 40;

			} else {
				top = top + 80;

			}

			image1.src = "data:image/png;base64," + certificateData.leadSign;
			ctx.drawImage(image1, left, top, 235, 35);

			ctx.lineWidth = 2;
			ctx.beginPath();

			ctx.moveTo(left, top = top + 45);
			ctx.lineTo(left + 300, top);

			ctx.stroke();
			ctx.lineWidth = 1;

			ctx.fillText(certificateData.leadAuditorName, left, top = top + 20);

			top = top + 20;

			wrapText(
					ctx,
					"Issued by the authority of the Republic of the Marshall Islands Maritime Administrator",
					left, 300, 18);

			if (validateSeal(certificateData.title) != '') {

				ctx.drawImage(validateSeal(certificateData.title), left + 450,
						tempreview, 150, 150);

			}
			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				ctx.fillText("MI-400F Rev. 4/18", left + 560, 1100);

			} else if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				ctx.fillText("MSC-296B Rev. 4/18", left + 560, 1100);

			}

			var imgData = canvas.toDataURL('image/jpg', '1.0');

			$('#canvas').remove();

			return imgData;

		}*/
		//new report
		function reportAuditGenerate(ReportData) {
			
			var audittype = '', reportTypeCaps = '', reportTypeSmall = '', audinsTypeCaps = '', audinsTypeSmall = '', reportsubTypeSmall = '', reportCertifidet = "", reportSummaryTypeCaps = '', currfindtemp = '', prevtempsec = '', reportsubDateSmall = '', reportrevreport = '';
			
			/* special/specific field variables*/
			
			/*vessel / company section fields*/
			var docExpiry = ReportData.DocExpiry ? ReportData.DocExpiry : 'N/A';
			
			/*title and audit/certificate section fields*/
			var auditStatus = (ReportData.AuditStatus) ? ReportData.AuditStatus: "-";
			var reportTitle = '', dateOfRegistry = '', dateOfRegistryValue = '', certIssued = '', certIssuedVal = '', expiryDate = '', expiryDateVal = '', meetingOrRecipt = '', meetingOrReciptVal = '', SSPAuditorName = '', SSPAuditorNameVal = '', SSPRevNo = '', SSPRevNoVal = '',documentNo='',documentNoVal ='';
			var auditDate = (ReportData.CurVesData.auditDate) ? (moment(ReportData.CurVesData.auditDate, YYYYMMDD).format('DD-MMM-YYYY')) : "N / A";
			var auditCertificateTitle = ReportData.CurVesData.auditTypeId == 1006 ? 'REVIEW / CERTIFICATE' :'AUDIT / CERTIFICATE';
			//3rd and 4th column fields
			var auditPlace = (ReportData.CurVesData.auditPlace) ? decodeURIComponent(atob(ReportData.CurVesData.auditPlace)): "-";
			var certiOrLettNo = '', certiOrLettNoVal = '', issueDate = '', issueDateVal = '',interAuditDate = '', interAuditDateVal= '',closeMeetOrIssueDate = '',closeMeetOrIssueDateVal = '',revRptNo = '', revRptNoVal ='',dmlcIssueDate = '',dmlcIssueDateVal = '', revNo ='', revNoVal='';
			
			/*audit summary section fields*/
			var summaryHeading = '', auditSummaryValue = '';
	
			
			console.log(ReportData);
			if (ReportData.CurVesData.auditTypeId == 1001) {

				audinsTypeCaps = "AUDITOR";

				audinsTypeSmall = "Auditor";

				audittype = "ISM";

				reportTypeCaps = "AUDIT";

				reportSummaryTypeCaps = 'AUDIT';

				reportTypeSmall = "Audit";

				reportsubTypeSmall = "Audit";

				reportsubDateSmall = 'Audit';

			} else if (ReportData.CurVesData.auditTypeId == 1002
					|| ReportData.CurVesData.auditTypeId == 1004 || ReportData.CurVesData.auditTypeId == 1006 
					|| ReportData.CurVesData.auditTypeId == 1007 || ReportData.CurVesData.auditTypeId == 1008 
					|| ReportData.CurVesData.auditTypeId == 1009 || ReportData.CurVesData.auditTypeId == 1010
					|| ReportData.CurVesData.auditTypeId == 1011 || ReportData.CurVesData.auditTypeId == 1012
					|| ReportData.CurVesData.auditTypeId == 1013) {
				 
				if (ReportData.CurVesData.auditTypeId == 1002) {

					audittype = "ISPS";

					reportsubTypeSmall = "Audit";

					reportSummaryTypeCaps = 'AUDIT';

					reportsubDateSmall = 'Audit';

					reportrevreport = 'SSP';

				} 
				else if (ReportData.CurVesData.auditTypeId == 1007 || ReportData.CurVesData.auditTypeId == 1008 
						 || ReportData.CurVesData.auditTypeId == 1009 || ReportData.CurVesData.auditTypeId == 1010
						 || ReportData.CurVesData.auditTypeId == 1011 || ReportData.CurVesData.auditTypeId == 1012
						 || ReportData.CurVesData.auditTypeId == 1013) {

					audittype = "SSP";

					reportsubTypeSmall = "Review";
					reportsubDateSmall = 'Approval';
					reportSummaryTypeCaps = 'REVIEW';
					console.log("review ssp")

				}
				else if (ReportData.CurVesData.auditTypeId == 1004) {

					audittype = "SSP";

					reportsubTypeSmall = "Review";
					reportsubDateSmall = 'Approval';
					reportSummaryTypeCaps = 'REVIEW';
					console.log("review ssp")

				} else if (ReportData.CurVesData.auditTypeId == 1006 ) {
					
					audittype = "IHM Part I";
					reportsubTypeSmall = "Review";
					reportsubDateSmall = 'Review';
					
					reportSummaryTypeCaps = 'REVIEW';
			
				}

				audinsTypeCaps = ( ReportData.CurVesData.auditTypeId == 1006 ) ? "REVIEWER" :"AUDITOR";

				audinsTypeSmall = "Auditor";

				reportTypeCaps = "AUDIT";

				reportTypeSmall = "Audit";

				reportCertifidet = "SSP";

			} else if (ReportData.CurVesData.auditTypeId == 1003
					|| ReportData.CurVesData.auditTypeId == 1005) {

				if (ReportData.CurVesData.auditTypeId == 1003) {

					audittype = "MLC";

					reportsubTypeSmall = "Inspection";

					reportSummaryTypeCaps = 'INSPECTION';

					reportsubDateSmall = 'Inspection';

					reportrevreport = 'DMLC II Review';

				} else if (ReportData.CurVesData.auditTypeId == 1005) {

					audittype = "DMLC II";

					reportsubTypeSmall = "Review";

					reportSummaryTypeCaps = 'REVIEW';

					reportsubDateSmall = 'Review';

				}

				reportCertifidet = "DMLC II";

				audinsTypeCaps = "INSPECTOR";

				audinsTypeSmall = "Inspector";

				reportTypeCaps = "INSPECTION";

				reportTypeSmall = "Inspection";

			}
			
			// report Title
			
			if (ReportData.prelimAudit == 'Yes') {
				if (ReportData.CurVesData.auditTypeId == 1001) {

					reportTitle = "PRELIMINARY ISM SHIPBOARD AUDIT REPORT";
					
				} else if (ReportData.CurVesData.auditTypeId == 1002) {

					reportTitle = "PRELIMINARY ISPS SHIPBOARD AUDIT REPORT";
						
				} else if (ReportData.CurVesData.auditTypeId == 1003) {

					reportTitle = "PRELIMINARY MLC INSPECTION REPORT";

				} else if (ReportData.CurVesData.auditTypeId == 1004) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY SHIP SECURITY PLAN (SSP) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY SHIP SECURITY PLAN (SSP) AMENDMENT REVIEW REPORT";
						
					}

				}else if (ReportData.CurVesData.auditTypeId == 1007) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY SHIPBOARD OIL POLLUTION EMERGENCY PLAN (SOPEP) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY SHIPBOARD OIL POLLUTION EMERGENCY PLAN (SOPEP) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1008) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY SHIP TO SHIP (STS) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY SHIP TO SHIP (STS) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1009) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY SHIPBOARD MARINE POLLUTION EMERGENCY PLAN (SMPEP) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY SHIPBOARD MARINE POLLUTION EMERGENCY PLAN (SMPEP) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1010) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY BALLAST WATER MANAGEMENT PLAN (BWS) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY BALLAST WATER MANAGEMENT PLAN (BWS) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1011) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY VOLATILE ORGANIC COMPOUNDS (VOC) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY VOLATILE ORGANIC COMPOUNDS (VOC) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1012) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY SEWAGE DISCHARGE RATE (SDR) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY SEWAGE DISCHARGE RATE (SDR) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1013) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "PRELIMINARY CRUDE OIL WASHING (COW) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY CRUDE OIL WASHING (COW) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1006) {
				 
					if (ReportData.CurVesData.auditSubTypeId == 1001) {
						 
						reportTitle = "PRELIMINARY INVENTORY OF HAZARDOUS MATERIALS (IHM) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
					 			
						reportTitle = "PRELIMINARY INVENTORY OF HAZARDOUS MATERIALS (IHM) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1005) {
				 
					if (ReportData.CurVesData.auditSubTypeId == 1001) {
						 
						reportTitle = 
							"PRELIMINARY DECLARATION OF MARITIME LABOUR COMPLIANCE PART II\n(DMLC PART II) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "PRELIMINARY DECLARATION OF MARITIME LABOUR COMPLIANCE PART II\n(DMLC PART II) AMENDMENT REVIEW REPORT";

					}

				}

			} else if (ReportData.prelimAudit == 'No') {

				if (ReportData.CurVesData.auditTypeId == 1001) {
					
					reportTitle = "ISM SHIPBOARD AUDIT REPORT";

				} else if (ReportData.CurVesData.auditTypeId == 1002) {
					
					reportTitle = "ISPS SHIPBOARD AUDIT REPORT";

				} else if (ReportData.CurVesData.auditTypeId == 1003) {

					reportTitle = "MLC INSPECTION REPORT";

				} else if (ReportData.CurVesData.auditTypeId == 1004) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "SHIP SECURITY PLAN (SSP) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {

						reportTitle = "SHIP SECURITY PLAN (SSP) AMENDMENT REVIEW REPORT";

					}
				}
				else if (ReportData.CurVesData.auditTypeId == 1007) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "SHIPBOARD OIL POLLUTION EMERGENCY PLAN (SOPEP) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "SHIPBOARD OIL POLLUTION EMERGENCY PLAN (SOPEP) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1008) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = " SHIP TO SHIP (STS) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = " SHIP TO SHIP (STS) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1009) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "SHIPBOARD MARINE POLLUTION EMERGENCY PLAN (SMPEP) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "SHIPBOARD MARINE POLLUTION EMERGENCY PLAN (SMPEP) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1010) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "BALLAST WATER MANAGEMENT PLAN (BWS) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "BALLAST WATER MANAGEMENT PLAN (BWS) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1011) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "VOLATILE ORGANIC COMPOUNDS (VOC) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "VOLATILE ORGANIC COMPOUNDS (VOC) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1012) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "SEWAGE DISCHARGE RATE (SDR) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "SEWAGE DISCHARGE RATE (SDR) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1013) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "CRUDE OIL WASHING (COW) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
						
						reportTitle = "CRUDE OIL WASHING (COW) AMENDMENT REVIEW REPORT";
						
					}

				}
				else if (ReportData.CurVesData.auditTypeId == 1005) {

					if (ReportData.CurVesData.auditSubTypeId == 1001) {

						reportTitle = "DECLARATION OF MARITIME LABOUR COMPLIANCE PART II \n(DMLC PART II) REVIEW REPORT";


					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {

						reportTitle = "DECLARATION OF MARITIME LABOUR COMPLIANCE PART II \n(DMLC PART II) AMENDMENT REVIEW REPORT";

					}

				}else if (ReportData.CurVesData.auditTypeId == 1006) {
				 
					if (ReportData.CurVesData.auditSubTypeId == 1001) {
						 
						reportTitle = "INVENTORY OF HAZARDOUS MATERIALS (IHM) REVIEW REPORT";

					} else if (ReportData.CurVesData.auditSubTypeId == 1002) {
					 			
						reportTitle = "INVENTORY OF HAZARDOUS MATERIALS (IHM) AMENDMENT REVIEW REPORT";
						
					}

				}

			}
		
			//(check)certificate issued , expiry date, ssp auditor.name, ssp rev.no
		
			if (ReportData.CurVesData.auditTypeId != 1005
					&& ReportData.CurVesData.auditTypeId != 1004 && ReportData.CurVesData.auditTypeId != 1006 && ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
					&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
					&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012 
					&& ReportData.CurVesData.auditTypeId != 1013) {
			 
				certIssued = "Certificate Issued";

				certIssuedVal = (ReportData.CertificateIssued) ? ReportData.CertificateIssued : "-";
				//certIssuedVal = '\n :  '+certIssuedVal;

			}

			if (ReportData.CurVesData.auditTypeId != 1005) {

				if (ReportData.CurVesData.auditTypeId != 1004 && ReportData.CurVesData.auditTypeId != 1006 && ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
						&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
						&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
						&& ReportData.CurVesData.auditTypeId != 1013) {

					expiryDate = "Expiry Date";

				} else if (ReportData.CurVesData.auditTypeId == 1004) {

					expiryDate = "ISPS Audit Due Date";

				}

				expiryDateVal = (ReportData.CurVesData.certExpireDate) ? (moment(
						ReportData.CurVesData.certExpireDate,
						YYYYMMDD).format('DD-MMM-YYYY')) : "N / A";
				//expiryDateVal = '\n :  '+expiryDateVal;

			}
				
			if (ReportData.CurVesData.auditTypeId == 1001
					|| ReportData.CurVesData.auditTypeId == 1002
					|| ReportData.CurVesData.auditTypeId == 1003) {

				meetingOrRecipt = "Opening Meeting Date";

			} else if (ReportData.CurVesData.auditTypeId == 1005
					|| ReportData.CurVesData.auditTypeId == 1004 || ReportData.CurVesData.auditTypeId == 1006 
					|| ReportData.CurVesData.auditTypeId == 1007 || ReportData.CurVesData.auditTypeId == 1008 
					 || ReportData.CurVesData.auditTypeId == 1009 || ReportData.CurVesData.auditTypeId == 1010
					 || ReportData.CurVesData.auditTypeId == 1011 || ReportData.CurVesData.auditTypeId == 1012
					 || ReportData.CurVesData.auditTypeId == 1013) {
				 
				meetingOrRecipt = "Receipt Date ";

			}
			if (ReportData.CurVesData.auditTypeId == 1006){
				documentNo = "IHM Part I ID/Doc No.";
				documentNoVal = ReportData.ihmDocumentNo ? ReportData.ihmDocumentNo :'N.A';
			}

			if(ReportData.CurVesData.auditTypeId == 1006 || ReportData.CurVesData.auditTypeId==1004 || ReportData.CurVesData.auditTypeId==1005
					|| ReportData.CurVesData.auditTypeId == 1007 || ReportData.CurVesData.auditTypeId == 1008 
					 || ReportData.CurVesData.auditTypeId == 1009 || ReportData.CurVesData.auditTypeId == 1010
					 || ReportData.CurVesData.auditTypeId == 1011 || ReportData.CurVesData.auditTypeId == 1012
					 || ReportData.CurVesData.auditTypeId == 1013){
				meetingOrReciptVal = (ReportData.CurVesData.openMeetingDate) ? moment(ReportData.CurVesData.openMeetingDate ,
						YYYYMMDD).format('DD-MMM-YYYY' ) : "N / A";
			}else{
				meetingOrReciptVal = (ReportData.CurVesData.openMeetingDate) ? moment(ReportData.CurVesData.openMeetingDate ,
						YYYYMMDD + HHmm).format('DD-MMM-YYYY' + HHmm) : "N / A";
			}
			//meetingOrReciptVal = '\n :  '+ meetingOrReciptVal;

			if (ReportData.CurVesData.auditTypeId == 1003
					|| ReportData.CurVesData.auditTypeId == 1002) {

					SSPAuditorName =reportCertifidet + " " + audinsTypeSmall + " Name";
					
					SSPAuditorNameVal =(ReportData.CurVesData.sspReviewDetail[0].sspLeadName) ? ReportData.CurVesData.sspReviewDetail[0].sspLeadName: "-";

				//	SSPAuditorNameVal ='\n :  '+SSPAuditorNameVal;
			}

				if (ReportData.CurVesData.auditTypeId == 1005
					|| ReportData.CurVesData.auditTypeId == 1003
					|| ReportData.CurVesData.auditTypeId == 1002) {
				
				SSPRevNo =reportCertifidet + " Rev. No.";

				SSPRevNoVal =(ReportData.CurVesData.sspReviewDetail[0].sspRevisionNo) ? ReportData.CurVesData.sspReviewDetail[0].sspRevisionNo: "-";

				SSPRevNoVal = SSPRevNoVal;
			}
				
//3rd and 4th coloum of auditor/certificate section
							
			if (ReportData.CurVesData.auditTypeId == 1001
					|| ReportData.CurVesData.auditTypeId == 1002
					|| ReportData.CurVesData.auditTypeId == 1003) {

				certiOrLettNo = "Certificate Number.";

			} else if (ReportData.CurVesData.auditTypeId == 1005
					|| ReportData.CurVesData.auditTypeId == 1004 || ReportData.CurVesData.auditTypeId == 1006
					|| ReportData.CurVesData.auditTypeId == 1007 || ReportData.CurVesData.auditTypeId == 1008 
					 || ReportData.CurVesData.auditTypeId == 1009 || ReportData.CurVesData.auditTypeId == 1010
					 || ReportData.CurVesData.auditTypeId == 1011 || ReportData.CurVesData.auditTypeId == 1012
					 || ReportData.CurVesData.auditTypeId == 1013) {
				 
				certiOrLettNo = "Letter No.";

			}
			
			if(ReportData.CurVesData.auditTypeId == 1006){
				certiOrLettNoVal = (ReportData.CurVesData.letterNo ) ? ReportData.CurVesData.letterNo : "-";
			}
			if(ReportData.CurVesData.auditTypeId != 1006){
				certiOrLettNoVal = (ReportData.CurVesData.certificateNo) ? ReportData.CurVesData.certificateNo: "-";
			}
				//certiOrLettNoVal = '\n :  '+certiOrLettNoVal;
					
			if (ReportData.CurVesData.auditTypeId != 1005) {

				if (ReportData.CurVesData.auditTypeId == 1004) {

					issueDate = 'SSP Issue Date';

				}else if (ReportData.CurVesData.auditTypeId == 1006) {
				 
					issueDate = 'IHM Part I Issue Date';

				} else {
				 
					issueDate = 'Issue Date';
				}

				issueDateVal = (ReportData.CurVesData.certIssueDate) ? (moment(
								ReportData.CurVesData.certIssueDate,
								YYYYMMDD).format('DD-MMM-YYYY')) : "N / A";
				//issueDateVal = '\n :  '+issueDateVal;

			}
			
			if (ReportData.CurVesData.auditTypeId != 1005
					&& ReportData.CurVesData.auditTypeId != 1004 && ReportData.CurVesData.auditTypeId != 1006
					&& ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
					&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
					&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
					&& ReportData.CurVesData.auditTypeId != 1013) {
			 
				interAuditDate = "Internal " + reportTypeSmall + " Date";
				interAuditDateVal =ReportData.CurVesData.interalAuditDate;

				if (ReportData.CurVesData.interalAuditDate == undefined
						|| ReportData.CurVesData.interalAuditDate == " ") {
					ReportData.CurVesData.interalAuditDate = "N / A"
					interAuditDateVal =ReportData.CurVesData.interalAuditDate;
				}
			}
					
			if (ReportData.CurVesData.auditTypeId != 1004 && ReportData.CurVesData.auditTypeId != 1005 && ReportData.CurVesData.auditTypeId != 1006
					&& ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
					&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
					&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
					&& ReportData.CurVesData.auditTypeId != 1013) {
			
				closeMeetOrIssueDate = "Closing Meeting Date";

				} else if (ReportData.CurVesData.auditTypeId == 1005) {
				
					closeMeetOrIssueDate = "DMLC II Issue Date";

				}
				
				closeMeetOrIssueDateVal = closeMeetOrIssueDate=="DMLC II Issue Date"?(ReportData.CurVesData.closeMeetingDate) ? (moment(
						ReportData.CurVesData.closeMeetingDate,
						YYYYMMDD).format('DD-MMM-YYYY')): "N / A" :(ReportData.CurVesData.closeMeetingDate) ? moment(ReportData.CurVesData.closeMeetingDate ,
								YYYYMMDD + HHmm).format('DD-MMM-YYYY' + HHmm) : "N / A";
					
				//	closeMeetOrIssueDateVal ='\n :  '+ closeMeetOrIssueDateVal;
		
			if (ReportData.CurVesData.auditTypeId == 1003
					|| ReportData.CurVesData.auditTypeId == 1002) {

				revRptNo =reportrevreport + " Rpt. No.";
				revRptNoVal = (ReportData.CurVesData.sspReviewDetail[0].sspReportNo) ? ReportData.CurVesData.sspReviewDetail[0].sspReportNo: "-";
			//	revRptNoVal = '\n :  '+revRptNoVal;
			}
			
			if (ReportData.CurVesData.auditTypeId == 1005) {
				
				dmlcIssueDate = "DMLC I Issue Date";
				dmlcIssueDateVal = (ReportData.CurVesData.interalAuditDate) ? ReportData.CurVesData.interalAuditDate: 'N/A';
				
				if (ReportData.CurVesData.interalAuditDate == undefined
						|| ReportData.CurVesData.interalAuditDate == " ") {
					dmlcIssueDateVal = ReportData.CurVesData.interalAuditDate = "N / A";

				}
				//dmlcIssueDateVal = '\n :  '+dmlcIssueDateVal;
			}
			
			if (ReportData.CurVesData.auditTypeId == 1004) {
				console.log("780")
				 revNo = 'SSP Rev. No.';
				 revNoVal = (ReportData.CurVesData.sspReviewDetail[0].sspRevisionNo) ? ReportData.CurVesData.sspReviewDetail[0].sspRevisionNo: "-";
				// revNoVal = '\n :  '+revNoVal;
			}
			
			//IHM PART I REVISION NUMBER
			
			if (ReportData.CurVesData.auditTypeId == 1006) {
				
				 revNo = 'IHM Part I Rev. No.';
				 revNoVal = (ReportData.CurVesData.sspReviewDetail[0].sspRevisionNo) ? ReportData.CurVesData.sspReviewDetail[0].sspRevisionNo: "-";
				// revNoVal = '\n :  '+revNoVal;
			}
		//check and set audit summary data	
			if (ReportData.CurVesData.auditTypeId == 1001) {
				summaryHeading = 'The undersigned has carried out the above audit according to the ISM Code and found the vessel:';
			} else if (ReportData.CurVesData.auditTypeId == 1002) {
				summaryHeading = 'The undersigned has carried out the above audit according to the ISPS Code and found the vessel:';
			} else if (ReportData.CurVesData.auditTypeId == 1003) {
				summaryHeading = 'The undersigned has carried out the above inspection according to the MLC Code and found the vessel:';
			} else if (ReportData.CurVesData.auditTypeId == 1004) {
				summaryHeading = 'The undersigned has carried out the Ship Security Plan (SSP) review for and on behalf of the Government of the Republic of the Marshall Islands (RMI) for compliance with the International Code for the Security of Ships and Port Facilities (ISPS Code), Part A and the provisions of ISPS Code B/8.1 to B/13.8 as appropriate for the ship:';
			} else if (ReportData.CurVesData.auditTypeId == 1005) {
				summaryHeading = 'The undersigned has carried out the DMLC Part II review pursuant to Standard A5.1.3 paragraph 10(b) of the MLC 2006 and RMI requirements for implementing MLC 2006 and found the DMLC Part II:';
			}else if (ReportData.CurVesData.auditTypeId == 1006) {
				summaryHeading = 'The undersigned has carried out the IHM Part I review pursuant:';
			}else if (ReportData.CurVesData.auditTypeId == 1007) {
				summaryHeading = 'The undersigned has carried out the above review according to the SOPEP Code and found the vessel;';
			}else if (ReportData.CurVesData.auditTypeId == 1008) {
				summaryHeading = 'The undersigned has carried out the above review according to the STS Code and found the vessel;';
			}else if (ReportData.CurVesData.auditTypeId == 1009) {
				summaryHeading = 'The undersigned has carried out the above review according to the SMPEP Code and found the vessel;';
			}else if (ReportData.CurVesData.auditTypeId == 1010) {
				summaryHeading = 'The undersigned has carried out the above review according to the BWS Code and found the vessel;';
			}else if (ReportData.CurVesData.auditTypeId == 1011) {
				summaryHeading = 'The undersigned has carried out the above review according to the VOC Code and found the vessel;';
			}else if (ReportData.CurVesData.auditTypeId == 1012) {
				summaryHeading = 'The undersigned has carried out the above review according to the SDR Code and found the vessel;';
			}else if (ReportData.CurVesData.auditTypeId == 1013) {
				summaryHeading = 'The undersigned has carried out the above review according to the COW Code and found the vessel;';
			}
			
			if(ReportData.AuditSummary.indexOf('Non') > 1){
				var auditSummaryValueSplit = (ReportData.AuditSummary.indexOf('Non') > 1) ? ReportData.AuditSummary.split(' '):'NIL';
				console.log(auditSummaryValueSplit);
				var auditSummary1 = '',auditSummary2 = '';
				if(ReportData.CurVesData.auditSubTypeId == AppConstant.INTERIM_SUB_TYPE_ID){
					for(var i=0;i<12;i++){
						auditSummary1 = auditSummary1+' '+auditSummaryValueSplit[i];
					}
					for(var j=13;j<auditSummaryValueSplit.length;j++){
						auditSummary2 = auditSummary2+' '+auditSummaryValueSplit[j];
					}
				}else if(ReportData.CurVesData.auditSubTypeId == AppConstant.INITIAL_SUB_TYPE_ID || ReportData.CurVesData.auditSubTypeId == AppConstant.RENEWAL_SUB_TYPE_ID
						|| ReportData.CurVesData.auditSubTypeId == AppConstant.INTERMEDIATE_SUB_TYPE_ID || 
						ReportData.CurVesData.auditSubTypeId == AppConstant.ADDITIONAL_SUB_TYPE_ID){
					for(var i=0;i<13;i++){
						auditSummary1 = auditSummary1+' '+auditSummaryValueSplit[i];
					}
					for(var j=14;j<auditSummaryValueSplit.length;j++){
						auditSummary2 = auditSummary2+' '+auditSummaryValueSplit[j];
					}
				}
				
				var auditSummaryd = auditSummary1+' Non-Conformity'+auditSummary2;
				auditSummaryd = auditSummaryd.replace(/\s*,/g, ",");
				auditSummaryValue = auditSummaryd.replace(/\s+/g, " ");
			}else{
				auditSummaryValue = (ReportData.AuditSummary) ? ReportData.AuditSummary : 'NIL';
				console.log(auditSummaryValue);
			}
			console.log(auditSummaryValue);
	

						
	/* check date of registry */
			if (ReportData.CurVesData.auditTypeId == 1003
					|| ReportData.CurVesData.auditTypeId == 1005) {

				dateOfRegistry = "Date of Registry";

				dateOfRegistryValue =ReportData.dateOfReg;

			}
			var ss = ReportData.CurVesData.vesselName;
	//dd object for pdfmake 		
			var dd = {
					/*ownerPassword : '123456',
					permissions : {
						//pageSize: {width: 797, height: 1122},
						printing : 'highResolution',
						modifying : false,
						copying : false,
						annotating : false,
						fillingForms : false,
						contentAccessibility : false,
						documentAssembly : false
						},*/
						pageSize: 'letter',
					defaultStyle: { 
						font: 'Times'
						},
				    header:{
				         text:[
				            {text:'RMI Report No.:  ', alignment: 'right', fontSize: 10, bold: false},
				            {text:ReportData.reportNo, alignment: 'right', fontSize: 11, bold: true}],margin: [0, 15, 30, 10]
				    },
					content: [],
					background : function(currentPage, pageSize) {
						return {
							image : sourceToDataURL('watermark'),
							width : 300,
							absolutePosition : {
								x : 150,
								y : 260
							},
							//opacity : 1
						}
					},
					styles: {
						prevfindigTable: {
							margin: [-10, 0, 0, 30]
						},
						currentfindigTable: {
							margin: [-10, 0, 0, 30]
						},
						dmlcRevNoteTable: {
							margin: ReportData.PreviousDetails.length ==0?[-10, 0, 0, 30]:[-10, 0, 0, 30]
						},
					    
					},footer:function(currentPage, pageCount){
						if(currentPage == 1){
							return {table: {
								widths: ['*'],
								body: [
									[
										{text:'Page '+currentPage.toString() + ' of ' + pageCount, alignment: 'center',margin:[0,10,0,0], fontSize: 11, bold: true}
									]
								]
							},
							layout: 'noBorders'}
						}else{
							return {table: {
								widths: ['*'],
								body: [
									[
										{text:'Page '+currentPage.toString() + ' of ' + pageCount, alignment: 'center',margin:[0,0,0,10], fontSize: 11, bold: true}
									]
								]
							},
							layout: 'noBorders'}
						}
				        
					}
				    
				};
			
		/* report header / Title */
			var reportHeader = [{
			    text:[{text: '\n'+reportTitle, alignment: 'center', fontSize: 14, bold: true,margin: [0, 8, 0, 4]}
			         ],margin: [0, -20, 0, 0]}];
			
/* VESSEL / COMPANY Section */
			var nam = ReportData.CurVesData.vesselName;
			var reportVesselDtl = "";
			 
			if(ReportData.CurVesData.auditTypeId == AppConstant.IHM_TYPE_ID){
				reportVesselDtl = [
			                       
							         {text:'VESSEL / COMPANY', alignment: 'left', fontSize: 12, bold:'true',margin: [0, 10, 0, 5]},
							         {
							            margin: [-10, 0, 0, 0],
							            	table: {
							            		widths: [290,240],
											body: [
											    [	{
													border: [true, true, false, false], fontSize: 11, bold:false,
													table: {
													    widths: [133,1,145],
														body: [
															['Vessel Name', ':' , (ReportData.CurVesData.vesselName == "ST�R LIGHT")? "STÖR LIGHT" : ReportData.CurVesData.vesselName],
															['Vessel Type', ':' , ReportData.VesselType],
															['GRT (MT)', ':' , ReportData.Grt],
															['Operation code', ':' ,ReportData.OperationCode]
														]
													},layout: 'noBorders'
												},
												
												{	border: [false, true, true, false], fontSize: 11, bold:false,
													table: {
													     widths: [105,1,111],
														body: [
															['Vessel IMO No.', ':' ,ReportData.CurVesData.vesselImoNo],
															['Official No.', ':' ,ReportData.OfficialNo],
															['Company IMO No.', ':' ,ReportData.CompanyImoNo],
														]
											
													},layout: 'noBorders'
												}
											     
												],
												[	{colSpan:2,margin: [0, -6, 0, 0],
													border: [true, false, true, true], fontSize: 11, bold:false,
													table: {
													     widths: [133,1,310],
														body: [
															['Name / Address of Company',':' ,ReportData.CompanyAddress],
														]
											
													},layout: 'noBorders'
												},''
												]]},layout: {
											hLineWidth: function (i, node) {
												return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
											},
											
											vLineWidth: function (i, node) {
												return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
											}
							         }
							        
							        }];
			}else{
				reportVesselDtl = [
			                       
							         {text:'VESSEL / COMPANY', alignment: 'left', fontSize: 12, bold:'true',margin: [0, 10, 0, 5]},
							         {
							            margin: [-10, 0, 0, 0],
							            	table: {
							            		widths: [290,240],
											body: [
											    [	{
													border: [true, true, false, false], fontSize: 11, bold:false,
													table: {
													    widths: [133,1,145],
														body: [
															['Vessel Name', ':' , (ReportData.CurVesData.vesselName == "ST�R LIGHT")? "STÖR LIGHT" : ReportData.CurVesData.vesselName],
															['Vessel Type', ':' , ReportData.VesselType],
															['GRT (MT)', ':' , ReportData.Grt],
															['DOC Type', ':' , ReportData.DocTypeNo],
															['DOC Expiry', ':' , docExpiry]
														]
													},layout: 'noBorders'
												},
												
												{	border: [false, true, true, false], fontSize: 11, bold:false,
													table: {
													     widths: [105,1,111],
														body: [
															['Vessel IMO No.', ':' ,ReportData.CurVesData.vesselImoNo],
															['Official No.', ':' ,ReportData.OfficialNo],
															['Company IMO No.', ':' ,ReportData.CompanyImoNo],
															['DOC Issuer', ':' ,ReportData.DocIssuer],
														]
											
													},layout: 'noBorders'
												}
											     
												],
												[	{colSpan:2,margin: [0, -6, 0, 0],
													border: [true, false, true, true], fontSize: 11, bold:false,
													table: {
													     widths: [133,1,310],
														body: [
															['Name / Address of Company',':' ,ReportData.CompanyAddress],
														]
											
													},layout: 'noBorders'
												},''
												]]},layout: {
											hLineWidth: function (i, node) {
												return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
											},
											
											vLineWidth: function (i, node) {
												return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
											}
							         }
							        
							        }];reportVesselDtl = [
									                       
							         			         {text:'VESSEL / COMPANY', alignment: 'left', fontSize: 12, bold:'true',margin: [0, 10, 0, 5]},
							         			         {
							         			            margin: [-10, 0, 0, 0],
							         			            	table: {
							         			            		widths: [290,240],
							         							body: [
							         							    [	{
							         									border: [true, true, false, false], fontSize: 11, bold:false,
							         									table: {
							         									    widths: [133,1,145],
							         										body: [
							         											['Vessel Name', ':' , (ReportData.CurVesData.vesselName == "ST�R LIGHT")? "STÖR LIGHT" : ReportData.CurVesData.vesselName],
							         											['Vessel Type', ':' , ReportData.VesselType],
							         											['GRT (MT)', ':' , ReportData.Grt],
							         											['DOC Type', ':' , ReportData.DocTypeNo],
							         											['DOC Expiry', ':' , docExpiry]
							         										]
							         									},layout: 'noBorders'
							         								},
							         								
							         								{	border: [false, true, true, false], fontSize: 11, bold:false,
							         									table: {
							         									     widths: [105,1,111],
							         										body: [
							         											['Vessel IMO No.', ':' ,ReportData.CurVesData.vesselImoNo],
							         											['Official No.', ':' ,ReportData.OfficialNo],
							         											['Company IMO No.', ':' ,ReportData.CompanyImoNo],
							         											['DOC Issuer', ':' ,ReportData.DocIssuer],
							         										]
							         							
							         									},layout: 'noBorders'
							         								}
							         							     
							         								],
							         								[	{colSpan:2,margin: [0, -6, 0, 0],
							         									border: [true, false, true, true], fontSize: 11, bold:false,
							         									table: {
							         									     widths: [133,1,310],
							         										body: [
							         											['Name / Address of Company',':' ,ReportData.CompanyAddress],
							         										]
							         							
							         									},layout: 'noBorders'
							         								},''
							         								]]},layout: {
							         							hLineWidth: function (i, node) {
							         								return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
							         							},
							         							
							         							vLineWidth: function (i, node) {
							         								return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
							         							}
							         			         }
							         			        
							         			        }];
			}
			
			
			if(dateOfRegistryValue!=''){
				var k =[dateOfRegistry,       ':', dateOfRegistryValue]
				reportVesselDtl[1].table.body[0][0].table.body.push(k);
			}
			
			
			/*AUDITOR / CERTIFICATE SECTION */		
			
			 var auditorCertiDtl = [
			           {text:auditCertificateTitle, alignment: 'left', fontSize: 12, bold:'true',margin: [0, 10, 0, 5]},
				         {
				            margin: [-10, 0, 0, 0],
				            	table: {
							    	widths: [290,240],
							    	heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],
								body: [
								    [
										{
												border: [true, true, false, true], fontSize: 11, bold:false,
												table: {
												    widths: [133,1,145],
													body: [
														[reportsubTypeSmall+' Report No.', ':' , ReportData.reportNo],
														[reportsubTypeSmall+' Sub Type',  ':' , ReportData.AuditSubTypeId],
														[reportsubTypeSmall+' Status',  ':' , auditStatus]
														
													]
												},layout: 'noBorders'
											},
											
											{	border: [false, true, true, true], fontSize: 11, bold:false,
												table: {
												     widths: [105,1,111],
													body: [
														[reportsubDateSmall +' Date ', ':' ,auditDate],
														[reportsubTypeSmall + ' Place',':',auditPlace],
													]
										
												},layout: 'noBorders'
											}
									] ]},layout: {
								hLineWidth: function (i, node) {
									return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
								},
								
								vLineWidth: function (i, node) {
									return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
								}
				         }
				         }
				        
				        ];
			var cerDtlLeft,cerDtlLeftVal,cerDtlRight,cerDtlRightVal;
			  cerDtlLeft =[certIssued,expiryDate,meetingOrRecipt,SSPAuditorName,SSPRevNo,documentNo];
			  cerDtlLeftVal =[certIssuedVal,expiryDateVal == 'Invalid date'? 'N / A':expiryDateVal,meetingOrReciptVal,SSPAuditorNameVal,SSPRevNoVal,documentNoVal];
			  cerDtlRight =[certiOrLettNo,issueDate,interAuditDate,closeMeetOrIssueDate,revRptNo,dmlcIssueDate,revNo];
			  cerDtlRightVal =[certiOrLettNoVal,issueDateVal,interAuditDateVal,closeMeetOrIssueDateVal,revRptNoVal,dmlcIssueDateVal,revNoVal];
			 for(var i=0;i<6;i++){
				if(cerDtlLeft[i]!=''){
					var k =[cerDtlLeft[i],       ':', cerDtlLeftVal[i]]
					auditorCertiDtl[1].table.body[0][0].table.body.push(k);
				}
			}
			for(var i=0;i<7;i++){
				if(cerDtlRight[i]!=''){
					var k =[cerDtlRight[i],       ':', cerDtlRightVal[i]]
					auditorCertiDtl[1].table.body[0][1].table.body.push(k);
				}
			}
				 
/*REPORT ATTACHMENT SECTION*/
			
	
	
	var typeAudit = ReportData.CurVesData.auditTypeId;
	console.log(ReportData.CurVesData.auditRptAttach);
	var arr = ReportData.CurVesData.auditRptAttach;
	var resatt =arr.sort(function (a, b) {
		return a.seqNo - b.seqNo;
	});
	ReportData.CurVesData.auditRptAttach = resatt;
	console.log(resatt);
	if(typeAudit <= 1005 && ReportData.CurVesData.auditRptAttach.length
			|| typeAudit >= 1007 && ReportData.CurVesData.auditRptAttach.length 
			&& ReportData.CurVesData.auditRptAttach.length >0){
		
		var atBox1 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox2 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox3 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox4 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox5 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox6 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox7 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox8 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox9 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox10 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox11 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox12 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox13 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox14 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox15 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		 	atBox16 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
			atBox17 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
			atBox18 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
			atBox19 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
			atBox20 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ];
		}
	else if(typeAudit == 1006 ){
		
		var atBox1 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ],
		atBox2 = [ { type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 } ];
	}
	var boxWithcross = [
	                    {type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 },
	                    {type: 'line',	x1: 21, y1: 1,x2: 10, y2: 12,lineWidth: 1.2},
	                    {type: 'line',	x1: 10, y1: 1,x2: 21, y2: 12,lineWidth: 1.2}
	                   ];
			
	var attachmentFile1 = _(ReportData.CurVesData.auditRptAttach)
			.chain().where({
				'seqNo' : Number(1)
			}).pluck('fileName').toString();

	var attachmentFile2 = _(ReportData.CurVesData.auditRptAttach)
			.chain().where({
				'seqNo' : Number(2)
			}).pluck('fileName').toString();

	var attachmentFile3 = _(ReportData.CurVesData.auditRptAttach)
			.chain().where({
				'seqNo' : Number(3)
			}).pluck('fileName').toString();

	var attachmentFile4 = _(ReportData.CurVesData.auditRptAttach)
			.chain().where({
				'seqNo' : Number(4)
			}).pluck('fileName').toString();

	var attachmentFile5 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(5)
	}).pluck('fileName').toString();
	
	var attachmentFile6 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(6)
	}).pluck('fileName').toString();
	
	var attachmentFile7 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(7)
	}).pluck('fileName').toString();
	
	var attachmentFile8 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(8)
	}).pluck('fileName').toString();
	
	var attachmentFile9 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(9)
	}).pluck('fileName').toString();
	
	var attachmentFile10 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(10)
	}).pluck('fileName').toString();
	
	var attachmentFile11 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(11)
	}).pluck('fileName').toString();
	
	var attachmentFile12 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(12)
	}).pluck('fileName').toString();
	
	var attachmentFile13 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(13)
	}).pluck('fileName').toString();
	
	var attachmentFile14 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(14)
	}).pluck('fileName').toString();
	
	var attachmentFile15 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(15)
	}).pluck('fileName').toString();
	
	var attachmentFile16 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(16)
	}).pluck('fileName').toString();
	var attachmentFile17 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(17)
	}).pluck('fileName').toString();
	var attachmentFile18 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(18)
	}).pluck('fileName').toString();
	var attachmentFile19 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(19)
	}).pluck('fileName').toString();
	var attachmentFile20 = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'seqNo' : Number(20)
	}).pluck('fileName').toString();
	
	var othersName = _(ReportData.CurVesData.auditRptAttach)
	.chain().where({
		'attachmentTypeId' : Number(1005)
	}).pluck('otherType').toString();
	

	var typeAudit = ReportData.CurVesData.auditTypeId;
			/** fixed IRI-5171,IRI-5169    done by kiran m j  start*/
	if (typeAudit > 1000 && typeAudit <= 1005 || typeAudit == 1006 ||typeAudit > 1006 && typeAudit  <= 1013 ) {
		
			if (attachmentFile1 != "") {

				atBox1 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			}
			if (attachmentFile2 != "") {
				atBox2 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];
			}
			if (attachmentFile3 != "") {
				atBox3 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];
			} if (attachmentFile4 != "") {
				atBox4 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];
			} if (attachmentFile5 != "") {
				atBox5 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile6 != "") {
				var atBox6 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile7 != "") {
				atBox7 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile8 != "") {
				atBox8 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile9 != "") {
				atBox9 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile10 != "") {
				atBox10 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile11 != "") {
				atBox11 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile12 != "") {
				atBox12 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile13 != "") {
				atBox13 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile14 != "") {
				atBox14 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile15 != "") {
				atBox15 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile16 != "") {
				atBox16 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile17 != "") {
				atBox17 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile18 != ""  ) {
				atBox18 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile19 != ""  ) {
				atBox19 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			} if (attachmentFile20 != "" ) {
				atBox20 = [
					{ type: 'rect', x: 10, y: 1, w: 11, h: 11, lineColor: '#000', lineWidth: 1.2 },
					{ type: 'line', x1: 21, y1: 1, x2: 10, y2: 12, lineWidth: 1.2 },
					{ type: 'line', x1: 10, y1: 1, x2: 21, y2: 12, lineWidth: 1.2 }
				];

			}
/** fixed IRI-5171,IRI-5169    done by kiran m j  end*/
		if ( typeAudit == 1006) {

			at1 = "Check Sheet";

		} else if ( typeAudit == 1006) {

			at1 = "" + reportTypeSmall + " Plan";

		}
		if(typeAudit == 1006){
			at2 = "IHM Part I/Investigation report";
		}
		if (typeAudit > 1000 && typeAudit <= 1013 ) {
			if(ReportData.CurVesData.auditRptAttach.length &&ReportData.CurVesData.auditRptAttach.length >0){
				
				var attcharray = ReportData.CurVesData.auditRptAttach;
				var arrayotherfilter =  attcharray.filter(function(otheratt) {
					return otheratt.attachmentTypeId != 1005;
				  });
				  console.log("attachment===>",arrayotherfilter.length);

		 var	at1 = arrayotherfilter[0]? (arrayotherfilter[0].attachmentTypeId ==1005 ? " " :(arrayotherfilter[0].attchTypeDescAudit || arrayotherfilter[0].attchmentTypeDesc)) : " ",
				at2 = arrayotherfilter[1] ? (arrayotherfilter[1].attachmentTypeId ==1005 ? " " :(arrayotherfilter[1].attchTypeDescAudit || arrayotherfilter[1].attchmentTypeDesc)) :" ",
				at3 = arrayotherfilter[2]? (arrayotherfilter[2].attachmentTypeId ==1005 ? " " :(arrayotherfilter[2].attchTypeDescAudit || arrayotherfilter[2].attchmentTypeDesc)):" ",
				at4 = arrayotherfilter[3]? (arrayotherfilter[3].attachmentTypeId ==1005 ? " " :(arrayotherfilter[3].attchTypeDescAudit || arrayotherfilter[3].attchmentTypeDesc)):" ",
				at5 = arrayotherfilter[4]? (arrayotherfilter[4].attachmentTypeId ==1005 ? " " :(arrayotherfilter[4].attchTypeDescAudit || arrayotherfilter[4].attchmentTypeDesc)):" ",
				at6 = arrayotherfilter[5]? (arrayotherfilter[5].attachmentTypeId ==1005 ? " " :(arrayotherfilter[5].attchTypeDescAudit || arrayotherfilter[5].attchmentTypeDesc)):" ",
				at7 = arrayotherfilter[6]? (arrayotherfilter[6].attachmentTypeId ==1005 ? " " :(arrayotherfilter[6].attchTypeDescAudit || arrayotherfilter[6].attchmentTypeDesc)):" ",
				at8 = arrayotherfilter[7]? (arrayotherfilter[7].attachmentTypeId ==1005 ? " " :(arrayotherfilter[7].attchTypeDescAudit || arrayotherfilter[7].attchmentTypeDesc)):" ",
				at9 = arrayotherfilter[8]? (arrayotherfilter[8].attachmentTypeId ==1005 ? " " :(arrayotherfilter[8].attchTypeDescAudit || arrayotherfilter[8].attchmentTypeDesc)):" ",
				at10 = arrayotherfilter[9]? (arrayotherfilter[9].attachmentTypeId ==1005 ? " " :(arrayotherfilter[9].attchTypeDescAudit || arrayotherfilter[9].attchmentTypeDesc)):" ",
				at11 = arrayotherfilter[10]? (arrayotherfilter[10].attachmentTypeId ==1005 ? " " :(arrayotherfilter[10].attchTypeDescAudit || arrayotherfilter[10].attchmentTypeDesc)):" ",
				at12 = arrayotherfilter[11]? (arrayotherfilter[11].attachmentTypeId ==1005 ? " " :(arrayotherfilter[11].attchTypeDescAudit || arrayotherfilter[11].attchmentTypeDesc)):" ",
				at13 = arrayotherfilter[12]? (arrayotherfilter[12].attachmentTypeId ==1005 ? " " :(arrayotherfilter[12].attchTypeDescAudit || arrayotherfilter[12].attchmentTypeDesc)):" ",
				at14 = arrayotherfilter[13]? (arrayotherfilter[13].attachmentTypeId ==1005 ? " " :(arrayotherfilter[13].attchTypeDescAudit || arrayotherfilter[13].attchmentTypeDesc)):" ",
				at15 = arrayotherfilter[14]? (arrayotherfilter[14].attachmentTypeId ==1005 ? " " :(arrayotherfilter[14].attchTypeDescAudit || arrayotherfilter[14].attchmentTypeDesc)):" ",
				at16 = arrayotherfilter[15]? (arrayotherfilter[15].attachmentTypeId ==1005 ? " " :(arrayotherfilter[15].attchTypeDescAudit || arrayotherfilter[15].attchmentTypeDesc)):" ",
				at17 = arrayotherfilter[16]? (arrayotherfilter[16].attachmentTypeId ==1005 ? " " :(arrayotherfilter[16].attchTypeDescAudit || arrayotherfilter[16].attchmentTypeDesc)):" ",
				at18 = arrayotherfilter[17]? (arrayotherfilter[17].attachmentTypeId ==1005 ? " " :(arrayotherfilter[17].attchTypeDescAudit || arrayotherfilter[17].attchmentTypeDesc)):" ",
				at19 = arrayotherfilter[18]? (arrayotherfilter[18].attachmentTypeId ==1005 ? " " :(arrayotherfilter[18].attchTypeDescAudit || arrayotherfilter[18].attchmentTypeDesc)):" ",
				at20 = arrayotherfilter[19]? (arrayotherfilter[19].attachmentTypeId ==1005 ? " " :(arrayotherfilter[19].attchTypeDescAudit || arrayotherfilter[19].attchmentTypeDesc)):" ";
								   
			   console.log(at1,at2,at3,at4,at5,at6,at7,at8,at9,at10,at11,at12);						
			
			}
		}

	}
	
	/**added code for to fix IRI-5247  by kiran start  */
	if(arrayotherfilter.length > 0 && arrayotherfilter.length <= 4){
	var reportAttachment = [
			       {text:'ATTACHMENT TO THIS REPORT', alignment: 'left', fontSize: 12, bold:'true',
			         margin: [0, 10, 0, 5]},
			         {
			            margin: [-10, 0, 0, 0],
			            	
			            	table: {
						    	/*widths: [20, 103, 20, typeAudit==1005?200:120, 20, typeAudit==1005?15:95, 20, 77],*/
						    	
						    	/*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
						    	widths:[130,140,125,125],
						    
						    body: [
							    [  
							     {
							    	 border: othersName?[true,true,false,false]:[true, true, false, true],
							    	 table: {
										widths: [20,100],
											body: [
												[{
													  canvas: at1!=" "?(atBox1 ? atBox1 :[]):[]
												},
												{
													fillColor: '',
													text: at1, fontSize: 11, bold:false
												}],
												[{
													canvas: at5!=" "?(atBox5 ? atBox5 :[]):[]

												 },
												 {
													
												
												 }],
												 [{
													 canvas: at9!=" "?(atBox9 ? atBox9 :[]):[]

												 },
												 {
												
												 }],
												 [{
													canvas: at13!=" "?(atBox13 ? atBox13 :[]):[]

												 },
												 {
												
												
												 }],
												 [{
														canvas: at17!=" "?(atBox17 ? atBox17 :[]):[]

													 },
													 {
													
													
												 }],
												
											]},layout: 'noBorders'
							     },
							     {
							    	 border: othersName?[false,true,false,false]:[false, true, false, true],
							    	 table: {
										widths: [20,100],
											body: [
												[{	
													canvas: at2!=" "?(atBox2 ? atBox2 :[]):[]
												},
												{
													fillColor: '',
													text: at2, fontSize: 11, bold:false
												}],
												[{
													canvas: at6!=" "?(atBox6 ? atBox6 :[]):[]

												 },
												 {
												
												
												 }],
												 [{
													canvas: at10!=" "?(atBox10 ? atBox10 :[]):[]

												 },
												 {
												
												
												 }],
												 [{
													 canvas: at14!=" "?(atBox14 ? atBox14 :[]):[]

												 },
												 {
												  
												
												 }],
												 [{
														canvas: at18!=" "?(atBox18 ? atBox18 :[]):[]

													 },
													 {
													
													
												 }],
												
											]},layout: 'noBorders'
							     },
							     {
							    	 border: othersName?[false,true,false,false]:[false, true, false, true],
							    	 table: {
										widths: [20,100],
											body: [
												[{
													canvas: at3!=" "?(atBox3 ? atBox3 :[]):[]

												},
												{
													fillColor: '',
													text: at3, fontSize: 11, bold:false
												}],
												[{
													 canvas: at7!=" "?(atBox7 ? atBox7 :[]):[]
												 },
												 {
												
												
												 }],
												 [{
													canvas: at11!=" "?(atBox11 ? atBox11 :[]):[]
												  },
												 {
	
												
												
												 }],
												 [{
													 canvas: at15!=" "?(atBox15 ? atBox15 :[]):[]

												 },
												 {
	
												
												
												 }],
												 [{
													canvas: at19!=" "?(atBox19 ? atBox19 :[]):[]
												  },
												  {
													
													
												 }],
												
											]},layout: 'noBorders'
							     },
							     {
							    	 border: othersName?[false,true,true,false]:[false, true, true, true],
							    	 table: {
										widths: [20,100],
											body: [
												[{
												  canvas: at4!=" "?(atBox4 ? atBox4 :[]):[]
												  },
										        {
													fillColor: '',
													text:at4 , fontSize: 11, bold:false
												}],
												[{
													canvas: at8!=" "?(atBox8 ? atBox8 :[]):[]
												 },
												 {
												
												
												 }],
												 [{
													canvas: at12!=" "?(atBox12 ? atBox12 :[]):[]

												 },
												 {
													
												
												 }],
												 [{
													canvas: at16!=" "?(atBox16 ? atBox16 :[]):[]

												 },
												 {
													
													
												 }],
												 [{
													 canvas: at20!=" "?(atBox20 ? atBox20 :[]):[]
												  },
												  {
													
													
												 }],
												
											]},layout: 'noBorders'
							     },
							   ]]
							},layout: {
							hLineWidth: function (i, node) {
								return (i === 0 || i === 1||i === node.table.body.length) ? 1.6 : 1;
							},
							
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 1.6 : 1;
							}
			         }
			         }
			        
			        ];	
		
				}else if(arrayotherfilter.length > 4 && arrayotherfilter.length <= 8){
					var reportAttachment = [
						{text:'ATTACHMENT TO THIS REPORT', alignment: 'left', fontSize: 12, bold:'true',
						  margin: [0, 10, 0, 5]},
						  {
							 margin: [-10, 0, 0, 0],
								 
								 table: {
									 /*widths: [20, 103, 20, typeAudit==1005?200:120, 20, typeAudit==1005?15:95, 20, 77],*/
									 
									 /*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
									 widths:[130,140,125,125],
								 
								 body: [
									 [  
									  {
										  border: othersName?[true,true,false,false]:[true, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														   canvas: at1!=" "?(atBox1 ? atBox1 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at1, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at5!=" "?(atBox5 ? atBox5 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at5, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at9!=" "?(atBox9 ? atBox9 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
														 canvas: at13!=" "?(atBox13 ? atBox13 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
															 canvas: at17!=" "?(atBox17 ? atBox17 :[]):[]
	 
														  },
														  {
															 
															
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{	
														 canvas: at2!=" "?(atBox2 ? atBox2 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at2, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at6!=" "?(atBox6 ? atBox6 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at6, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at10!=" "?(atBox10 ? atBox10 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
														  canvas: at14!=" "?(atBox14 ? atBox14 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
															 canvas: at18!=" "?(atBox18 ? atBox18 :[]):[]
	 
														  },
														  {
															 
														
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														 canvas: at3!=" "?(atBox3 ? atBox3 :[]):[]
	 
													 },
													 {
														 fillColor: '',
														 text: at3, fontSize: 11, bold:false
													 }],
													 [{
														  canvas: at7!=" "?(atBox7 ? atBox7 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at7, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at11!=" "?(atBox11 ? atBox11 :[]):[]
													   },
													  {
		 
														 
														
													  }],
													  [{
														  canvas: at15!=" "?(atBox15 ? atBox15 :[]):[]
	 
													  },
													  {
		 
														 
														
													  }],
													  [{
														 canvas: at19!=" "?(atBox19 ? atBox19 :[]):[]
													   },
													   {
														  
														 
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,true,false]:[false, true, true, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
													   canvas: at4!=" "?(atBox4 ? atBox4 :[]):[]
													   },
													 {
														 fillColor: '',
														 text:at4 , fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at8!=" "?(atBox8 ? atBox8 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at8, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at12!=" "?(atBox12 ? atBox12 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
														 canvas: at16!=" "?(atBox16 ? atBox16 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
														  canvas: at20!=" "?(atBox20 ? atBox20 :[]):[]
													   },
													   {
														  
														 
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									]]
								 },layout: {
								 hLineWidth: function (i, node) {
									 return (i === 0 || i === 1||i === node.table.body.length) ? 1.6 : 1;
								 },
								 
								 vLineWidth: function (i, node) {
									 return (i === 0 || i === node.table.widths.length) ? 1.6 : 1;
								 }
						  }
						  }
						 
						 ];	
				}else if(arrayotherfilter.length > 8 && arrayotherfilter.length <= 12){
					var reportAttachment = [
						{text:'ATTACHMENT TO THIS REPORT', alignment: 'left', fontSize: 12, bold:'true',
						  margin: [0, 10, 0, 5]},
						  {
							 margin: [-10, 0, 0, 0],
								 
								 table: {
									 /*widths: [20, 103, 20, typeAudit==1005?200:120, 20, typeAudit==1005?15:95, 20, 77],*/
									 
									 /*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
									 widths:[130,140,125,125],
								 
								 body: [
									 [  
									  {
										  border: othersName?[true,true,false,false]:[true, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														   canvas: at1!=" "?(atBox1 ? atBox1 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at1, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at5!=" "?(atBox5 ? atBox5 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at5, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at9!=" "?(atBox9 ? atBox9 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at9, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at13!=" "?(atBox13 ? atBox13 :[]):[]
	 
													  },
													  {
														 
														
													  }],
													  [{
															 canvas: at17!=" "?(atBox17 ? atBox17 :[]):[]
	 
														  },
														  {
															 
															
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{	
														 canvas: at2!=" "?(atBox2 ? atBox2 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at2, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at6!=" "?(atBox6 ? atBox6 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at6, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at10!=" "?(atBox10 ? atBox10 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at10, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at14!=" "?(atBox14 ? atBox14 :[]):[]
	 
													  },
													  {
														 
													
													  }],
													  [{
															 canvas: at18!=" "?(atBox18 ? atBox18 :[]):[]
	 
														  },
														  {
															 
														
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														 canvas: at3!=" "?(atBox3 ? atBox3 :[]):[]
	 
													 },
													 {
														 fillColor: '',
														 text: at3, fontSize: 11, bold:false
													 }],
													 [{
														  canvas: at7!=" "?(atBox7 ? atBox7 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at7, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at11!=" "?(atBox11 ? atBox11 :[]):[]
													   },
													  {
		 
														 fillColor: '',
														 text:at11, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at15!=" "?(atBox15 ? atBox15 :[]):[]
	 
													  },
													  {
		 
														 
														
													  }],
													  [{
														 canvas: at19!=" "?(atBox19 ? atBox19 :[]):[]
													   },
													   {
														  
														
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,true,false]:[false, true, true, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
													   canvas: at4!=" "?(atBox4 ? atBox4 :[]):[]
													   },
													 {
														 fillColor: '',
														 text:at4 , fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at8!=" "?(atBox8 ? atBox8 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at8, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at12!=" "?(atBox12 ? atBox12 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at12, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at16!=" "?(atBox16 ? atBox16 :[]):[]
	 
													  },
													  {
														 
													
													  }],
													  [{
														  canvas: at20!=" "?(atBox20 ? atBox20 :[]):[]
													   },
													   {
														  
														 
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									]]
								 },layout: {
								 hLineWidth: function (i, node) {
									 return (i === 0 || i === 1||i === node.table.body.length) ? 1.6 : 1;
								 },
								 
								 vLineWidth: function (i, node) {
									 return (i === 0 || i === node.table.widths.length) ? 1.6 : 1;
								 }
						  }
						  }
						 
						 ];	
				}else if(arrayotherfilter.length > 12 && arrayotherfilter.length <= 16){
					var reportAttachment = [
						{text:'ATTACHMENT TO THIS REPORT', alignment: 'left', fontSize: 12, bold:'true',
						  margin: [0, 10, 0, 5]},
						  {
							 margin: [-10, 0, 0, 0],
								 
								 table: {
									 /*widths: [20, 103, 20, typeAudit==1005?200:120, 20, typeAudit==1005?15:95, 20, 77],*/
									 
									 /*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
									 widths:[130,140,125,125],
								 
								 body: [
									 [  
									  {
										  border: othersName?[true,true,false,false]:[true, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														   canvas: at1!=" "?(atBox1 ? atBox1 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at1, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at5!=" "?(atBox5 ? atBox5 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at5, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at9!=" "?(atBox9 ? atBox9 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at9, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at13!=" "?(atBox13 ? atBox13 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at13, fontSize: 11, bold:false
													  }],
													  [{
															 canvas: at17!=" "?(atBox17 ? atBox17 :[]):[]
	 
														  },
														  {
															 
															
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{	
														 canvas: at2!=" "?(atBox2 ? atBox2 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at2, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at6!=" "?(atBox6 ? atBox6 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at6, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at10!=" "?(atBox10 ? atBox10 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at10, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at14!=" "?(atBox14 ? atBox14 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at14, fontSize: 11, bold:false
													  }],
													  [{
															 canvas: at18!=" "?(atBox18 ? atBox18 :[]):[]
	 
														  },
														  {
															 
															
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														 canvas: at3!=" "?(atBox3 ? atBox3 :[]):[]
	 
													 },
													 {
														 fillColor: '',
														 text: at3, fontSize: 11, bold:false
													 }],
													 [{
														  canvas: at7!=" "?(atBox7 ? atBox7 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at7, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at11!=" "?(atBox11 ? atBox11 :[]):[]
													   },
													  {
		 
														 fillColor: '',
														 text:at11, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at15!=" "?(atBox15 ? atBox15 :[]):[]
	 
													  },
													  {
		 
														 fillColor: '',
														 text:at15, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at19!=" "?(atBox19 ? atBox19 :[]):[]
													   },
													   {
														  
														
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,true,false]:[false, true, true, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
													   canvas: at4!=" "?(atBox4 ? atBox4 :[]):[]
													   },
													 {
														 fillColor: '',
														 text:at4 , fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at8!=" "?(atBox8 ? atBox8 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at8, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at12!=" "?(atBox12 ? atBox12 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at12, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at16!=" "?(atBox16 ? atBox16 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at16, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at20!=" "?(atBox20 ? atBox20 :[]):[]
													   },
													   {
														  
														 
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									]]
								 },layout: {
								 hLineWidth: function (i, node) {
									 return (i === 0 || i === 1||i === node.table.body.length) ? 1.6 : 1;
								 },
								 
								 vLineWidth: function (i, node) {
									 return (i === 0 || i === node.table.widths.length) ? 1.6 : 1;
								 }
						  }
						  }
						 
						 ];	
				}else if(arrayotherfilter.length > 16){
					var reportAttachment = [
						{text:'ATTACHMENT TO THIS REPORT', alignment: 'left', fontSize: 12, bold:'true',
						  margin: [0, 10, 0, 5]},
						  {
							 margin: [-10, 0, 0, 0],
								 
								 table: {
									 /*widths: [20, 103, 20, typeAudit==1005?200:120, 20, typeAudit==1005?15:95, 20, 77],*/
									 
									 /*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
									 widths:[130,140,125,125],
								 
								 body: [
									 [  
									  {
										  border: othersName?[true,true,false,false]:[true, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														   canvas: at1!=" "?(atBox1 ? atBox1 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at1, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at5!=" "?(atBox5 ? atBox5 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at5, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at9!=" "?(atBox9 ? atBox9 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at9, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at13!=" "?(atBox13 ? atBox13 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at13, fontSize: 11, bold:false
													  }],
													  [{
															 canvas: at17!=" "?(atBox17 ? atBox17 :[]):[]
	 
														  },
														  {
															 fillColor: '',
															 text:at17, fontSize: 11, bold:false
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{	
														 canvas: at2!=" "?(atBox2 ? atBox2 :[]):[]
													 },
													 {
														 fillColor: '',
														 text: at2, fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at6!=" "?(atBox6 ? atBox6 :[]):[]
	 
													  },
													  {
														  fillColor: '',
														 text:at6, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at10!=" "?(atBox10 ? atBox10 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at10, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at14!=" "?(atBox14 ? atBox14 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at14, fontSize: 11, bold:false
													  }],
													  [{
															 canvas: at18!=" "?(atBox18 ? atBox18 :[]):[]
	 
														  },
														  {
															 fillColor: '',
															 text:at18, fontSize: 11, bold:false
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,false,false]:[false, true, false, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
														 canvas: at3!=" "?(atBox3 ? atBox3 :[]):[]
	 
													 },
													 {
														 fillColor: '',
														 text: at3, fontSize: 11, bold:false
													 }],
													 [{
														  canvas: at7!=" "?(atBox7 ? atBox7 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at7, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at11!=" "?(atBox11 ? atBox11 :[]):[]
													   },
													  {
		 
														 fillColor: '',
														 text:at11, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at15!=" "?(atBox15 ? atBox15 :[]):[]
	 
													  },
													  {
		 
														 fillColor: '',
														 text:at15, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at19!=" "?(atBox19 ? atBox19 :[]):[]
													   },
													   {
														  fillColor: '',
														  text:at19, fontSize: 11, bold:false
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									  {
										  border: othersName?[false,true,true,false]:[false, true, true, true],
										  table: {
											 widths: [20,100],
												 body: [
													 [{
													   canvas: at4!=" "?(atBox4 ? atBox4 :[]):[]
													   },
													 {
														 fillColor: '',
														 text:at4 , fontSize: 11, bold:false
													 }],
													 [{
														 canvas: at8!=" "?(atBox8 ? atBox8 :[]):[]
													  },
													  {
														 fillColor: '',
														 text:at8, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at12!=" "?(atBox12 ? atBox12 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at12, fontSize: 11, bold:false
													  }],
													  [{
														 canvas: at16!=" "?(atBox16 ? atBox16 :[]):[]
	 
													  },
													  {
														 fillColor: '',
														 text:at16, fontSize: 11, bold:false
													  }],
													  [{
														  canvas: at20!=" "?(atBox20 ? atBox20 :[]):[]
													   },
													   {
														  fillColor: '',
														  text:at20, fontSize: 11, bold:false
													  }],
													 
												 ]},layout: 'noBorders'
									  },
									]]
								 },layout: {
								 hLineWidth: function (i, node) {
									 return (i === 0 || i === 1||i === node.table.body.length) ? 1.6 : 1;
								 },
								 
								 vLineWidth: function (i, node) {
									 return (i === 0 || i === node.table.widths.length) ? 1.6 : 1;
								 }
						  }
						  }
						 
						 ];	
				}

				/**added code for to fix IRI-5247  by kiran end  */
		if(othersName){	
			reportAttachment[1].table.body.push([   
					    {      
					    	colSpan: 4,
							border: [true, false, true, true],
							table: { 
								widths: [20,520],
									body: [[ {
										    canvas: [
									                    {type: 'rect', x: 10, y:1, w: 11, h: 11, lineColor: '#000',lineWidth: 1.2 },
									                    {type: 'line',	x1: 21, y1: 1,x2: 10, y2: 12,lineWidth: 1.2},
									                    {type: 'line',	x1: 10, y1: 1,x2: 21, y2: 12,lineWidth: 1.2}
									                ]
											},
											{   
											text: 'Others ('+othersName+')',fontSize: 11, bold:false
											}]
										]
							   },layout: 'noBorders'
					},'','',''
					   
					
					]);
		}

			
			
/*AUDIT SUMMARY SECTION*/
			var auditSummary = [{
			    text:[
			            {text:reportSummaryTypeCaps + " SUMMARY", alignment: 'left', fontSize: 12, bold:'true'}
			         ],margin: [0, 10, 0, 5]},
			         {
			            margin: [-10, 0, 0, 0],
			            	table: {
						    	widths: [538],
						    	/*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
							body: [
							    [
									{ 
										border: [true, true,true, true],
							 			fillColor: '',
										/*text:summaryHeading+'\n\n'+'     '+auditSummary,fontSize: 11, bold:false*/
										text: [
												{text: summaryHeading+'\n\n', fontSize: 11,bold:false},
												{text:auditSummaryValue, fontSize: 11,bold:false }]
									}
								] ]},layout: {
							hLineWidth: function (i, node) {
								return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
							},
							
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
							}
			         }
			         }
			        
			        ];	
			
	
/*AUDITOR DETAILS SECTION*/
			var auditorDetails = [{
			    text:[
			            {text:audinsTypeCaps + " DETAILS", alignment: 'left', fontSize: 12, bold:'true'}
			         ],margin: [0, 10, 0, 5]},
			         {
			            margin: [-10, 0, 0, 30],
			            	table: {
						    	widths: [115, 115, 80, 100, 91],
						    	/*heights: ['auto', '10', 10, 'auto', 10, 'auto', 10, 10],*/
							body: [
							    [
									{
										border: [true, true, false, false],
							 			fillColor: '',
										text:'Type',fontSize: 11, bold:true
									},
									{
										border: [false, true, false, false],
										fillColor: '',
										text: 'Name', fontSize: 11, bold:true
									},
									{
										border: [false, true, false, false],
										fillColor: '',
										text: 'ID', fontSize: 11, bold:true
									},
					                {
										border: [false, true, false, false],
										fillColor: '',
										text: 'Signature', fontSize: 11, bold:true
									},
									{
										border: [false, true, true, false],
										fillColor: '',
										text: 'Date', fontSize: 11, bold:true,margin: [10, 0, 0, 0]
									}
									
								]
								]},layout: {
							hLineWidth: function (i, node) {
								return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
							},
							
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
							}
			         }
			         }
			        
			        ];   
			
			var auditorDtl = ReportData.CurVesData.auditAuditorDetail
			var orderedAuditDtl=[];
			
	/*		forauditorDtl.length
			if(auditorDtl.length>2){
					auditorDtl.auditRoleDesc. =='Lead Auditor'
						
			}
		*/
			
			ReportData.CurVesData.auditAuditorDetail 
					.forEach(function(a,index) {
						
						 var temp=false, auditorSignObj = '', tempArray =[],date = '',auditorSign = '';
					   
					   var userId = (a.userId) ? (_(ReportData.AuditorArray).chain()
							   .where({'emailId' : a.userId}).pluck('sequenceNo').toString()) : "-";
					   
					   if(ReportData.prelimAudit == 'No')
   	    			{
						   date = (a.audSignatureDate) ? (moment(a.audSignatureDate, YYYYMMDD)
								.format('DD-MMM-YYYY')) : "  -";
					   
						   auditorSign = (a.audSignature)? 'data:image/jpeg;base64,'+atob(a.audSignature) :'';
   	    			}
					   
					   if(index == ReportData.CurVesData.auditAuditorDetail.length-1){
					       temp = true;
					   }
					   if(auditorSign === ''){
						auditorSignObj = [{
								border: temp == true ? [false, false, false, true] : [false, false, false, false],
								text: '', fontSize: 11, bold:false }];
					   }else{
						 auditorSignObj =  [{
								border: temp == true ? [false, false, false, true] : [false, false, false, false],
								image: auditorSign,margin: [0, 0, 0, 0],fit: [150, 20] }];
						   }
					   
					  
					tempArray =	[
								{
									border: temp === true ? [true, false, false, true] : [true, false, false, false],
									text: ReportData.CurVesData.auditTypeId == 1006 ? "REVIEWER": a.auditRoleDesc,fontSize: 11, bold:false,
									margin:auditorSign!=''?[0, 8, 0, 0]:[0, 0, 0, 0]
								},
								{
									border: temp === true ? [false, false, false, true] : [false, false, false, false],
									text: a.auditorName, fontSize: 11, bold:false,
									margin:auditorSign!=''?[0, 8, 0, 0]:[0, 0, 0, 0]
								},
								{
									border: temp === true ? [false, false, false, true] : [false, false, false, false],
									text: userId, fontSize: 11, bold:false,
									margin:auditorSign!=''?[0, 8, 0, 0]:[0, 0, 0, 0]
								}
								]
					
					tempArray.push(auditorSignObj[0],{
								border: temp === true ? [false, false, true, true] : [false, false, true , false],
								text: date, fontSize: 11, bold:false,
								margin:auditorSign!=''?[10, 8, 0, 0]:[10, 0, 0, 0]
							})
							
								auditorDetails[1].table.body.push(tempArray);
						
						
						
					});
			
			
			
/*PREVIOUS AUDIT FINDINGS SECTION*/
			var auditFinding = ReportData.CurVesData.auditFinding;
			
			var previousAuditFingdings=[], PreviousDetails = [];
			 var lastStatus ='';
			 			 
			 //
			 var countInfoNew=0;
			
			 for( var i=0; i<auditFinding.length; i++){
				 
				   for( var j=0; j<auditFinding[i].findingDetail.length; j++){
					   if(auditFinding[i].findingDetail[j].descriptions){
						   var vb=auditFinding[i].findingDetail[j].descriptions;
							vb = (vb.match(/\n/g)||[]).length;
							countInfoNew += vb;
					   }
				   }
			 }
			 
			 Number.prototype.countDecimals = function () {
				    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
				    return this.toString().split(".")[1].length || 0; 
				}
			 var pageCnt=countInfoNew/50;
			 var decPageCnt = pageCnt - Math.floor(pageCnt);
			 decPageCnt = decPageCnt.toFixed(2)*100; 
			
			 
			 
			if (ReportData.CurVesData.auditTypeId != 1005
					&& ReportData.CurVesData.auditTypeId != 1004
					&& ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
					&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
					&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
					&& ReportData.CurVesData.auditTypeId != 1013) {
				if (ReportData.PreviousDetails
					&& ReportData.PreviousDetails.length > 0) {
			           //common content for all findings
					console.log("ReportData.PreviousDetails.length",ReportData.PreviousDetails);
				   for( var i=0; i<ReportData.PreviousDetails.length; i++){
					   var pushBlock = true;
					  lastStatus = ReportData.PreviousDetails[i].findingDetail[ReportData.PreviousDetails[i].findingDetail.length-1];
					  console.log(lastStatus);
					   if(lastStatus.statusDesc == "VERIFIED /CLOSED" && (lastStatus.currentAuditSeq < ReportData.CurVesData.auditSeqNo))
					   {
						   pushBlock = false;
						   console.log("entering false");
					   }else{
						   PreviousDetails.push(ReportData.PreviousDetails[i]);
					   }
					   
				   }
				   console.log("PreviousDetails",PreviousDetails);
				   for( var n=0; n<PreviousDetails.length; n++){
						   if(PreviousDetails[n].serialNo.indexOf('OBS')>=0){
							   PreviousDetails.splice(n,1);
					   }
				   }
				   
				    for( var n=0; n<PreviousDetails.length; n++){
				    				    	
				    	var countInfo=0;
						   var prevInfo=0;
						   if(n!=0 && PreviousDetails.length!=0){
							   for( var j=0; j<PreviousDetails[n].findingDetail.length; j++){
								  
								   if(PreviousDetails[n].findingDetail[j].descriptions){
									   var vb=PreviousDetails[n].findingDetail[j].descriptions;
										vb = (vb.match(/\n/g)||[]).length;
										countInfo += vb;
								   }
							   }
							   for( var j=0; j<PreviousDetails[n-1].findingDetail.length; j++){
								   if(PreviousDetails[n-1].findingDetail[j].descriptions){
									   var vb=PreviousDetails[n-1].findingDetail[j].descriptions;
										vb = (vb.match(/\n/g)||[]).length;
										prevInfo += vb;
								   }
							   }
						   }
				    	
				    
				       var findingHeader='';
				     
				    if(n===0){
				    findingHeader={text: 'PREVIOUS '+ reportTypeCaps + ' FINDINGS', alignment: 'left', fontSize: 12, bold: true, pageBreak: (decPageCnt>75) || (auditFinding.length > 0)  ? '' : '', margin: [0, -20, 0, 4]};
				    }
				    
				    previousAuditFingdings.push([
					    findingHeader,
				        {   /*lineHeight: 1.2,*/
					    	/*pageBreak: ((ReportData.CurVesData.previousFinding[0] && (ReportData.CurVesData.previousFinding[0].findingDetail.length == 1 || ReportData.CurVesData.previousFinding[0].findingDetail.length == 2)) && n===0 && 
									ReportData.CurVesData.auditAuditorDetail.length <=2 && ReportData.CurVesData.auditFinding.length == 0)?'after':'',*/
						style: 'prevfindigTable',
						table: {
						    	widths: [96, 99, 93, 99, 115],
						    	heights: ['auto', 10, 10, 'auto', 10, 'auto', 10, 10],
							body: [
								[
									{   colSpan: 5,
										border: [true, true, true, true],
										table: {
										     widths: [115,150],
											body: [
												[{text:'CATEGORY',fontSize: 11, bold:false},{text:audittype + " CODE",fontSize: 11, bold:false}],
												[{text:PreviousDetails[n].serialNo,fontSize: 11, bold:false},{text:PreviousDetails[n].auditCode,fontSize: 11, bold:false}],
											]
										},layout: 'noBorders'
									},'','','',''
									
								],
								[
									{   colSpan: 5,
										border: [true, true, true, true],
							 			fillColor: '',
									    text: [
									            {text: 'CATEGORY           ', fontSize: 12, bold: true},
						                        {text: 'STATUS                     ', fontSize: 12, bold: true},
						                        {text: 'STATUS DATE       ', fontSize: 12, bold: true},
						                        {text: 'NEXT ACTION        ', fontSize: 12, bold: true},
						                        {text: 'DUE DATE        ', fontSize: 12, bold: true},
						                      ]
									},'','','',''
									 
									
								]]},layout: {
							hLineWidth: function (i, node) {
								return (i === 0 || i === 1|| i === 2||i === node.table.body.length) ? 1.5 : 1;
							},
							
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
							},
							hLineColor: function (i, node) {
								return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
							},
							vLineColor: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
							},
							 paddingTop: function(i, node) { return 3; }
							
					},
					
					}]);
						for( var j=0; j<PreviousDetails[n].findingDetail.length; j++){
							
							if(PreviousDetails[n].findingDetail[j].updateDescription){
								var Updatemsg = PreviousDetails[n].findingDetail[j].updateDescription;
								 previousAuditFingdings[n][1].table.body.push([
								   {   colSpan: 5,
									   border: [true, true, true, true],
									   table: { 
											body: [[{
													 
												border: [true, true, true, true],
												  text:[{text:Updatemsg , alignment: 'center' , fontSize: 11}
											         ]
												 }]]
									   },layout: 'noBorders'
									},'','','',''
								                                              
								  ])
							}

                            var hasNumber = /\d/;  //added by archana for jira Id-MOBILE-798
					    	
							previousAuditFingdings[n][1].table.body.push(
						        
						        [
									{
										border: [true, true, true, true],
							 			fillColor: '',
										text:PreviousDetails[n].findingDetail[j].catagoryDesc,fontSize: 11, bold:false
									},
									{
										border: [false, true, true, true],
										fillColor: '',
										text:PreviousDetails[n].findingDetail[j].statusDesc, fontSize: 11, bold:false
									},
									{
										border: [false, true, true, true],
										fillColor: '',
										text:(PreviousDetails[n].findingDetail[j].statusDate) ? moment(
												PreviousDetails[n].findingDetail[j].statusDate).format('DD-MMM-YYYY') : "NIL", fontSize: 11, bold:false
									},
					                {
										border: [false, true, true, true],
										fillColor: '',
										text:PreviousDetails[n].findingDetail[j].nextActionDesc, fontSize: 11, bold:false
									},{
										border: [false, true, true, true],
										fillColor: '',
										text: hasNumber.test(PreviousDetails[n].findingDetail[j].dueDate) == true ?
										moment(PreviousDetails[n].findingDetail[j].dueDate).format('DD-MMM-YYYY') : PreviousDetails[n].findingDetail[j].dueDate, fontSize: 11, bold:false     //added by archana for jira Id-MOBILE-798
									}
									
								],
								[
									{   colSpan: 5,
										border: [true, true, true, true],
							 			fillColor: '',
									    text: [
							                    {text: 'DESCRIPTION\n', fontSize: 12, bold: true},
						                        {text: PreviousDetails[n].findingDetail[j].descriptions ?
						                        		PreviousDetails[n].findingDetail[j].descriptions : '    NIL   '
						                        		, fontSize: 11, bold: false},
						                      ],
						                      margin:[0,0,0,0]
									},'','','',''
									
									
								]
							)
						}
				       }
				   //}
				  
				}
				
				
			}
			
			
/*NEW AUDIT FINDINGS SECTION*/
			
			var newAuditFingdings=[];
			var newAuditFindingHeader = '';
			//var auditFinding = ReportData.CurVesData.auditFinding;
			

				if (ReportData.CurVesData.auditTypeId != 1005 && ReportData.CurVesData.auditTypeId != 1006
						&& ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
						&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
						&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
						&& ReportData.CurVesData.auditTypeId != 1013 ) {
					newAuditFindingHeader = "NEW " + reportTypeCaps + " FINDINGS";
					
				} else if (ReportData.CurVesData.auditTypeId == 1005) {
					newAuditFindingHeader = "REVIEW NOTES";
				}
				
				if(auditFinding.length > 0){
					for( var i=0; i<auditFinding.length; i++){
						
						
						 var findingHeader='';
						 if(i===0){
							    findingHeader={text: newAuditFindingHeader, alignment: 'left', fontSize: 12, bold: true};
						 }
						 newAuditFingdings.push([
							    findingHeader,
						        { 
							    	style: 'currentfindigTable',
							    	
							        table :{
							    		widths:[96, 99, 93, 99, 115],
							    		heights: ['auto', 10, 10, 'auto', 10, 'auto', 10, 10],
							    		body:[
							    			[{   colSpan: 5,
												border: [true, true, true, true],
									 			fillColor: '',
									 			table: {
												     widths: [115,150],
													body: [
														[{text:'CATEGORY',fontSize: 11, bold:false},{text:audittype + " CODE",fontSize: 11, bold:false}],
														[{text:auditFinding[i].serialNo,fontSize: 11, bold:false},{text:auditFinding[i].auditCode,fontSize: 11, bold:false}],
													]
												},layout: 'noBorders'
											}],
											[
												{   colSpan: 5,
													border: [true, true, true, true],
										 			fillColor: '',
												    text: [ {text: 'CATEGORY           ', fontSize: 12, bold: true},
									                        {text: 'STATUS                     ', fontSize: 12, bold: true},
									                        {text: 'STATUS DATE       ', fontSize: 12, bold: true},
									                        {text: 'NEXT ACTION        ', fontSize: 12, bold: true},
									                        {text: 'DUE DATE        ', fontSize: 12, bold: true},

									                      ]
												}
											 ]
							    		]
							    	}
						        }]);
						 
						 
						 for( var j=0; j<auditFinding[i].findingDetail.length; j++){
							 
							 
							 if(auditFinding[i].findingDetail[j].updateDescription && (auditFinding[i].findingDetail[j].statusDesc == "PLAN ACCEPTED" ||auditFinding[i].findingDetail[j].statusDesc == "VERIFIED /CLOSED")){
									var Updatemsg = auditFinding[i].findingDetail[j].updateDescription;
									newAuditFingdings[i].push([
									   {   
										   border: [true, true, true, true],
										   margin: [-10, -30, -0, 30],
									
										   table: { 
											   widths:[538],
											   heights: ['auto', 10, 10, 'auto', 10, 'auto', 10, 10],
											   
												body: [[{
														 
													border: [true, true, true, true],
													text:Updatemsg , alignment: 'center' , fontSize: 11
												}]]
										   },
										}
									                                              
									  ])
								}
							 
							 var nextStatus='';
							 if(auditFinding[i].findingDetail[j].categoryId==1004)
									nextStatus='NIL';
								else{
									nextStatus=auditFinding[i].findingDetail[j].nextActionDesc;
							 console.log(nextStatus);
								}
							newAuditFingdings[i].push([
								
								 {
									 
									 margin: [-10, -30, 0, 30],
								     pageBreak: ((ReportData.CurVesData.auditFinding[0] && ReportData.CurVesData.auditFinding[0].findingDetail.length == 5) && i===0 && 
												ReportData.CurVesData.auditAuditorDetail.length <=3 )?'':'',
									 table: {
									 widths:[96, 99, 93, 99, 115],
									 heights: ['auto', 10, 10, 'auto', 10, 'auto', 10, 10],
									 body: [[
										 	
										 	{
												border: [true, true, true, true],
									 			fillColor: '',
									 			text:auditFinding[i].findingDetail[j].catagoryDesc,fontSize: 11, bold:false
											},
											{ 
												border: [false, true, true, true],
												fillColor: '',
												text:auditFinding[i].findingDetail[j].statusDesc, fontSize: 11, bold:false
											},
											{
												border: [false, true, true, true],
												fillColor: '',
												text:(auditFinding[i].findingDetail[j].statusDate) ? moment(
														auditFinding[i].findingDetail[j].statusDate).format('DD-MMM-YYYY') : "NIL", fontSize: 11, bold:false
											},
							                {
												border: [false, true, true, true],
												fillColor: '',
												text:nextStatus, fontSize: 11, bold:false
											},{
												border: [false, true, true, true],
												fillColor: '',
								                text: auditFinding[i].findingDetail[j].dueDate, fontSize: 11, bold:false
											}
										 
									 ],
									 [
											{   colSpan: 5,
												border: [true, true, true, true],
									 			fillColor: '',
									 			text: [
									 					 {text: 'DESCRIPTION\n', fontSize: 12, bold: true},
									 					 {text: auditFinding[i].findingDetail[j].descriptions ? auditFinding[i].findingDetail[j].descriptions : '    NIL   ',fontSize: 11,margin: [0, 20]}
									 				],
									 				margin:[0,0,0,10]
			
											}
											
											
									 ]]
								        
								        
									}
								}
							]);	


						 }
					}
				}
				
				
				
				
				/*if (auditFinding.length > 0) {
				
			           //common content for all findings
				   for( var i=0; i<auditFinding.length; i++){
				     var countInfo=0;
					   var prevInfo=0;
					   
					   if(i!=0){
						   
						   for( var j=0; j<auditFinding[i].findingDetail.length; j++){
							   if(auditFinding[i].findingDetail[j].descriptions){
								   var vb=auditFinding[i].findingDetail[j].descriptions;
									vb = (vb.match(/\n/g)||[]).length;
									countInfo += vb;
							   }
						   }
						   for( var j=0; j<auditFinding[i-1].findingDetail.length; j++){
							   if(auditFinding[i-1].findingDetail[j].descriptions){
								   var vb=auditFinding[i-1].findingDetail[j].descriptions;
									vb = (vb.match(/\n/g)||[]).length;
									prevInfo += vb;
							   }
						   }
					   }  
				     var findingHeader='';
				     
				    if(i===0){
				    findingHeader={text: newAuditFindingHeader, alignment: 'left', fontSize: 12, bold: true, pageBreak: (countInfo >15) ? 'before' : '',  margin: [0, -20, 0, 4]};
				    }
				    
				    newAuditFingdings.push([
					    findingHeader,
				        {   lineHeight: 1.2,
						style: 'currentfindigTable',
						pageBreak: ((ReportData.CurVesData.auditFinding[0] && ReportData.CurVesData.auditFinding[0].findingDetail.length == 2) && i===0 && 
								ReportData.CurVesData.auditAuditorDetail.length <=3 )?'after':'',
						table: {
						    	widths: [96, 99, 93, 99, 115],
						    	heights: ['auto', 10, 10, 'auto', 10, 'auto', 10, 10],
							body: [
								[
									{   colSpan: 5,
										border: [true, true, true, true],
							 			fillColor: '',
							 			table: {
										     widths: [115,150],
											body: [
												[{text:'CATEGORY',fontSize: 11, bold:false},{text:audittype + " CODE",fontSize: 11, bold:false}],
												[{text:auditFinding[i].serialNo,fontSize: 11, bold:false},{text:auditFinding[i].auditCode,fontSize: 11, bold:false}],
											]
										},layout: 'noBorders'
									},'','','',''
									
								],
								[
									{   colSpan: 5,
										border: [true, true, true, true],
							 			fillColor: '',
									    text: [ {text: 'CATEGORY           ', fontSize: 12, bold: true},
						                        {text: 'STATUS                     ', fontSize: 12, bold: true},
						                        {text: 'STATUS DATE       ', fontSize: 12, bold: true},
						                        {text: 'NEXT ACTION        ', fontSize: 12, bold: true},
						                        {text: 'DUE DATE        ', fontSize: 12, bold: true},

						                      ]
									},'','','',''
									 
									
								]]},layout: {
							hLineWidth: function (i, node) {
								return (i === 0 || i === 1|| i === 2||i === node.table.body.length) ? 1.5 : 1;
							},
							
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
							},
							hLineColor: function (i, node) {
								return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
							},
							vLineColor: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
							},
							 paddingTop: function(i, node) { return 3; }
							
					},
					unbreakable: ((prevInfo<35)||(countInfo>42))&&(i==0)?false:true
					}]);
//need to check.....
						for( var j=0; j<auditFinding[i].findingDetail.length; j++){
						    
							if(auditFinding[i].findingDetail[j].updateDescription){
								var Updatemsg = auditFinding[i].findingDetail[j].updateDescription;
								newAuditFingdings[i][1].table.body.push([
								   {   colSpan: 5,
									   border: [true, true, true, true],
									   table: { 
											body: [[{
													 
												border: [true, true, true, true],
												  text:[{text:Updatemsg , alignment: 'center' , fontSize: 11}
											         ]
												 }]]
									   },layout: 'noBorders'
									},'','','',''
								                                              
								  ])
							}
	*//******//*				console.log(auditFinding[i].findingDetail[j].nextActionDesc)
						//	if(auditFinding[i].findingDetail[j].catagoryDesc != 'OBS'){
								var nextStatus='';
								if(auditFinding[i].findingDetail[j].categoryId==1004)
									nextStatus='NIL';
								else
									nextStatus=auditFinding[i].findingDetail[j].nextActionDesc;
									
								newAuditFingdings[i][1].table.body.push(
								        
								        [
											{
												border: [true, true, true, true],
									 			fillColor: '',
												text:auditFinding[i].findingDetail[j].catagoryDesc,fontSize: 11, bold:false
											},
											{
												border: [false, true, true, true],
												fillColor: '',
												text:auditFinding[i].findingDetail[j].statusDesc, fontSize: 11, bold:false
											},
											{
												border: [false, true, true, true],
												fillColor: '',
												text:(auditFinding[i].findingDetail[j].statusDate) ? moment(
														auditFinding[i].findingDetail[j].statusDate).format('DD-MMM-YYYY') : "NIL", fontSize: 11, bold:false
											},
							                {
												border: [false, true, true, true],
												fillColor: '',
												text:nextStatus, fontSize: 11, bold:false
											},{
												border: [false, true, true, true],
												fillColor: '',
												text: auditFinding[i].findingDetail[j].dueDate, fontSize: 11, bold:false
											}
											
										],
										[
											{   colSpan: 5,
												border: [true, true, true, true],
									 			fillColor: '',
									 			text: [
									 					 {text: 'DESCRIPTION\n', fontSize: 12, bold: true},
									 					 {text: auditFinding[i].findingDetail[j].descriptions ? auditFinding[i].findingDetail[j].descriptions : '    NIL   ',fontSize: 11,margin: [0, 20]}
									 				],
									 				margin:[0,0,0,10]
			
											},'','','',''
											
											
										]
									)	
							//}

						}
				    }
				
			}*/
				
		if(ReportData.CurVesData.auditTypeId != 1004 && ReportData.CurVesData.auditTypeId != 1006
				&& ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
				&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
				&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
				&& ReportData.CurVesData.auditTypeId != 1013){
			if(auditFinding.length == 0){
				newAuditFindingHeader =	{text: newAuditFindingHeader+"               :    NIL", alignment: 'left', fontSize: 12, bold: true, margin: [0, -20, 0, 30]};
				newAuditFingdings.push([newAuditFindingHeader]);
			}
		
			if(ReportData.PreviousDetails
						&& ReportData.PreviousDetails.length ==0 && ReportData.CurVesData.auditTypeId != 1005 && ReportData.CurVesData.auditTypeId != 1006
						&& ReportData.CurVesData.auditTypeId != 1007 && ReportData.CurVesData.auditTypeId != 1008 
						&& ReportData.CurVesData.auditTypeId != 1009 && ReportData.CurVesData.auditTypeId != 1010
						&& ReportData.CurVesData.auditTypeId != 1011 && ReportData.CurVesData.auditTypeId != 1012
						&& ReportData.CurVesData.auditTypeId != 1013){
					findingHeader={text: 'PREVIOUS '+ reportTypeCaps + ' FINDINGS    :    NIL', alignment: 'left', fontSize: 12, bold: true, margin: auditFinding.length == 0?[0, -20, 0, 30]:[0, -20, 0, 30]};
					previousAuditFingdings.push([findingHeader]);
				}
		}	
			 
			
		

		/*DMLC-2 Review Note*/	
			
			var dmlcReviewNote=[];
			if(ReportData.CurVesData.auditTypeId == 1003 && ReportData.dmlcFinding!=''){
				
				console.log("DMLC REVIEW REPORT ",ReportData.dmlcFinding);
				
				var dmlcReviewNoteHeader = '';
				var auditFinding = ReportData.dmlcFinding;
				
				dmlcReviewNoteHeader = "DMLC-II REVIEW NOTES";
					
					
					if (auditFinding.length > 0) {
					
				           //common content for all findings
					   for( var i=0; i<auditFinding.length; i++){
					       
					     var findingHeader='';
					     
					    if(i===0){
					    findingHeader={text: dmlcReviewNoteHeader, alignment: 'left', fontSize: 12, bold: true, margin: ReportData.PreviousDetails.length ==0?[0, -20, 0, 4]: [0, -20, 0, 4]};
					    }
					    
					    dmlcReviewNote.push([
						    findingHeader,
					        {   
							style: 'dmlcRevNoteTable',
							table: {
							    	widths: [96, 99, 93, 99, 115],
							    	heights: ['auto', 10, 10, 'auto', 10, 'auto', 10, 10],
								body: [
									[
										{   colSpan: 5,
											border: [true, true, true, true],
								 			fillColor: '',
								 			table: {
											     widths: [115,150],
												body: [
													[{text:'CATEGORY',fontSize: 11, bold:false},{text:"DMLCII CODE",fontSize: 11, bold:false}],
													[{text:auditFinding[i].serialNo,fontSize: 11, bold:false},{text:auditFinding[i].auditCode,fontSize: 11, bold:false}],
												]
											},layout: 'noBorders'
										},'','','',''
									],
									[
										{   colSpan: 5,
											border: [true, true, true, true],
								 			fillColor: '',
										    text: [
										            {text: 'CATEGORY           ', fontSize: 12, bold: true},
							                        {text: 'STATUS                     ', fontSize: 12, bold: true},
							                        {text: 'STATUS DATE       ', fontSize: 12, bold: true},
							                        {text: 'NEXT ACTION        ', fontSize: 12, bold: true},
							                        {text: 'DUE DATE        ', fontSize: 12, bold: true},
							                      ]
										},'','','',''
										 
										
									]]},layout: {
								hLineWidth: function (i, node) {
									return (i === 0 || i === 1|| i === 2||i === node.table.body.length) ? 1.5 : 1;
								},
								
								vLineWidth: function (i, node) {
									return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
								},
								hLineColor: function (i, node) {
									return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
								},
								vLineColor: function (i, node) {
									return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
								},
								 paddingTop: function(i, node) { return 3; }
								
						}
						}]);

							for( var j=0; j<auditFinding[i].findingDetail.length; j++){
								
								if(auditFinding[i].findingDetail[j].updateDescription){
									var Updatemsg = ReportData.dmlcFinding[i].findingDetail[j].updateDescription;
									dmlcReviewNote[i][1].table.body.push([
									   {   colSpan: 5,
										   border: [true, true, true, true],
										   table: { 
												body: [[{
														 
													border: [true, true, true, true],
													  text:[{text:Updatemsg , alignment: 'justify' , fontSize: 11}
												         ]
													 }]]
										   },layout: 'noBorders'
										},'','','',''
									                                              
									  ])
								}
							    
								dmlcReviewNote[i][1].table.body.push(
							        
							        [
										{
											border: [true, true, true, true],
								 			fillColor: '',
											text:auditFinding[i].findingDetail[j].catagoryDesc,fontSize: 11, bold:false
										},
										{
											border: [false, true, true, true],
											fillColor: '',
											text:auditFinding[i].findingDetail[j].statusDesc, fontSize: 11, bold:false
										},
										{
											border: [false, true, true, true],
											fillColor: '',
											text:(auditFinding[i].findingDetail[j].statusDate) ? moment(
													auditFinding[i].findingDetail[j].statusDate).format('DD-MMM-YYYY') : "NIL", fontSize: 11, bold:false
										},
						                {
											border: [false, true, true, true],
											fillColor: '',
											text:auditFinding[i].findingDetail[j].nextActionDesc, fontSize: 11, bold:false
										},{
											border: [false, true, true, true],
											fillColor: '',
											text: auditFinding[i].findingDetail[j].dueDate, fontSize: 11, bold:false
										}
										
									],
									[
										{   colSpan: 5,
											border: [true, true, true, true],
								 			fillColor: '',
										    text: [
								                    {text: 'DESCRIPTION\n', fontSize: 12, bold: true},
							                        {text: auditFinding[i].findingDetail[j].descriptions ?
							                        		auditFinding[i].findingDetail[j].descriptions : '    NIL   '
							                        		, fontSize: 11, bold: false},
							                      ]
										},'','','',''
										
										
									]
								)
							}
					    }
					
				}
				else if(auditFinding.length == 0){
					dmlcReviewNoteHeader =	{text: dmlcReviewNoteHeader+"               :    NIL", alignment: 'left', fontSize: 12, bold: true, margin: [0, 0, 0, 20]};
					dmlcReviewNote.push([dmlcReviewNoteHeader]);
				}
			}
		
		/*VENDOR DETAILS*/	
		if (ReportData.CurVesData.auditTypeId == 1006){	
			var vendorDetails = [{
			    text:[
			            {text:"VENDOR DETAILS", alignment: 'left', fontSize: 12, bold:'true'}
			         ],margin: [0, 10, 0, 5]},
			         {
			        	 margin: [-10, 0, 0, 0],
			        	 table:{
			        		bold:'true',
	                        widths: [538],
							body : [[ 
							          {	
							        	  border: [true, true,true, true],
							        	  columns:[
							        	        {width: 140,text:'Vendor Name\n\n Vendor Address ', fontSize: 11},
							        	        {width: 10,text:': \n\n :',fontSize: 11},
							        	        {width: '*',text:ReportData.CurVesData.vendorName +'\n\n'+ReportData.CurVesData.vendorAddress,fontSize: 11}
							        	        ]
							          }
							       ],
							       
							]                 
			        	 }
			        	 
			    }];
		}
 /*NARRATIVE SUMMARY SECTION*/	
					var summaryVal = ReportData.CurVesData.narrativeSummary?
					decodeURIComponent(atob(ReportData.CurVesData.narrativeSummary)) : '';
					var textStrInner = summaryVal;
					var domParser = new DOMParser();
					var docElement = domParser.parseFromString(textStrInner, "text/html").documentElement;
					
					summaryVal=docElement.textContent;
					var narrativeSummary = [
		                        {text:summaryVal?'NARRATIVE SUMMARY':'NARRATIVE SUMMARY             :    NIL', alignment: 'left', fontSize: 12, bold:'true',margin: [0, -10, 0, 0], pageBreak:summaryVal?'before':''}, /** code changed IRI-5249 by kiran */
			         {
			            margin: [-10, 0, 0, 0],
			            	table: {
						    	widths: [538],
							body: [] },layout:{
							hLineWidth: function (i, node) {
								return (i === 0 || i === 1||i === node.table.body.length) ? 1.5 : 1;
							},
							
							vLineWidth: function (i, node) {
								return (i === 0 || i === node.table.widths.length) ? 1.5 : 1;
							}
			         }
			         }
			        
			        ];
		
		if(!summaryVal){  
			narrativeSummary[1].table.body.push([{border: [false, false, false, false],text:''}]);	
		}
		/** code added IRI-5249 by kiran */
		// else if(summaryVal){  
		// narrativeSummary[1].table.body.push([{border: [true, true, true, true],text:summaryVal}]);	
		// }
		/** code added IRI-5249 by kiran */
		else{
			getHeight(ReportData).then(function (res){
			
				if (window.navigator.msSaveOrOpenBlob && ReportData.narrativeSummary) {
					 
					 var reportGenerate = IENarrativeReport(ReportData.reportNo);
					 
					 for(var k=0; k<reportGenerate.length;k++){
		    				/*if(k != 0){
		    					doc.addPage();
		    				}*/
		    				//doc.addImage(reportGenerate[k], 'PNG', 0, 0,doc.internal.pageSize.width,doc.internal.pageSize.height,"'reportfind"+k+"'",'FAST');
						 narrativeSummary[1].table.body.push([{
							 border: [true, true,true, true],
								image:reportGenerate[k],
								fit:[600,700]
						 }]);	
		    			}
					 
					 /*$timeout(function(){	
						 doc.save(fileName);
  						
  					},2000);*/
				 }else{	

				var canvas = document.createElement('canvas');
				canvas.id ="canvasReport";
				canvas.width = 890;
				canvas.height = res;
		
				var body = document.getElementsByTagName("body")[0];
				body.appendChild(canvas);
		
				var canvashiddenEnd = angular.element( document.querySelector( '#canvasReport' ));
				canvashiddenEnd.addClass('hidden');
		
				if(window.navigator.userAgent.indexOf('Firefox') > 1){
					var canvas = document.getElementById("canvasReport"),
					html_container = angular.element(document.getElementById("duplicateNarrative"))[0].nextSibling.children[2].children[2].nextElementSibling.innerHTML;
					/*OVERALL  IMAGE DATA*/
					//html = html_container.innerHTML;
					console.log(html_container);
				   rasterizeHTML.drawHTML(html_container,canvas);
				}else{
					var canvas = document.getElementById("canvasReport"),
					html_container = angular.element(document.getElementById("duplicateNarrative"))[0].nextSibling.children[2].children[2],
					/*OVERALL  IMAGE DATA*/
					html = html_container.innerHTML;
					console.log(html_container);
					rasterizeHTML.drawHTML(html,canvas);
					console.log(rasterizeHTML.drawHTML(html,canvas));
				}	
			   //PAGE COUNT
			   console.log(res);
				var val=(''+res/1160).split('.')[0];
				console.log('val : ', val);
				var arr=[];
	
				for(var i=0; i <=val; i++){
		console.log(arr[i]);
					arr[i] = (i+1)*1160;
					console.log(arr[i]);
					if(i == val){
						arr[i] = res-(val*1160);
					}	console.log(arr[i]);
	
				}
	
				$timeout(function(){
					var temp=0,tempValue=0;
					console.log("arr.length : ",arr.length);
					for(var k=0; k<arr.length; k++){	
						var canvasEle = document.createElement('canvas');
						canvasEle.id ="canvasEle";
						canvasEle.width = 890;
						canvasEle.height = 1160;
        		
						var body = document.getElementsByTagName("body")[0];
						body.appendChild(canvasEle);
        		
						var canvashiddenEnd = angular.element( document.querySelector( '#canvasEle' ));
						canvashiddenEnd.addClass('hidden');
						var canvasEle = document.getElementById("canvasEle");
						var ctx =canvasEle.getContext("2d");
						var top=0;
		
						tempValue = (arr.length-1 == k)? arr[k] : 1160;
			
						var img = document.getElementById("canvasReport");
					
						ctx.drawImage(img, 0, temp, 890, tempValue, 0, 0, 890, tempValue);
					
						temp=arr[k];
						
						var elem = canvasEle.toDataURL('image/jpg','1.0');      
						narrativeSummary[1].table.body.push([{ 
						border: [true, true,true, true],
						image:elem,
						fit:[600,700]
						}]);	
						$('#canvasEle').remove();
						
						if((k != (arr.length-1))){
				
							//doc.addPage();
						}
						
						 if(k == (arr.length-1)){
			 				
 							$('#canvasReport').remove();
 						}
					}
				},1000);		
			}
		});
	}	
		
		
			dd.content.push(
							reportHeader,
							reportVesselDtl,
							auditorCertiDtl,
							vendorDetails,
							reportAttachment,
							auditSummary,
							auditorDetails,
							newAuditFingdings,
						    previousAuditFingdings,
							dmlcReviewNote,
							narrativeSummary
							
							
						);
	
			return dd;
		}
		
		function getHeight(ReportData){
    		var def = $q.defer();
    		$timeout(function() {
    		 
    			var tmpHgt=0;
    			 if (window.navigator.msSaveOrOpenBlob) { // For IE:
    				 tmpHgt=20;
    				 def.resolve(tmpHgt);
    				 
    				 
    	    	    }else{
    	    	    	
    			var canvasGetHgt = document.createElement('canvas');
    			canvasGetHgt.id ="canvasGetHeight";
    			canvasGetHgt.width = 797;
    			//canvasGetHgt.height = 100;
    	
    			var body = document.getElementsByTagName("body")[0];
    			body.appendChild(canvasGetHgt);
    	
    			var canvashiddenhgt = angular.element( document.querySelector( '#canvasGetHeight' ));
    			canvashiddenhgt.addClass('hidden');
    	console.log(rasterizeHTML);
    			var canvashgt = document.getElementById("canvasGetHeight");
    			  rasterizeHTML.drawHTML(ReportData.narrativeSummary, canvashgt).then(function success(result){
    					var parser = new DOMParser();
    					var parsedHtml = parser.parseFromString(result.svg, 'text/html');
    				    tmpHgt= parsedHtml.getElementsByTagName("svg")[0].height.baseVal.value;
    					console.log("tmphgt",parsedHtml);
    					def.resolve(tmpHgt);
    				});	
    		
    	
    			$('#canvasGetHeight').remove();
    			
    	    	    }
    		}, 100);
    		
    		return def.promise;
    		
    	}

		function IENarrativeReport(ReportData) {
    		
       		var textStrInner = $('#nodeheight')[0].innerHTML;
            var lengthNarrative = textStrInner.length;
            var valength = Math.ceil(lengthNarrative / 13000);
            var halfLength = parseInt(lengthNarrative / valength);
            var perHalfLength=halfLength;
            var count=0;
            var imgData = [];
            
            for(var narr=0;narr<valength;narr++){
            	var canvasEle = document.createElement('canvas');
    			canvasEle.id = "canvas";
    			canvasEle.width = 890;
    			canvasEle.height = 1122;
    			var body = document.getElementsByTagName("body")[0];
    			body.appendChild(canvasEle);

    			var canvashiddenEnd = angular.element(document
    					.querySelector('#canvas'));
    			canvashiddenEnd.addClass('hidden');
            	var canvas = document.getElementById("canvas");
            	
    			var ctx = canvas.getContext("2d");	
                var restNarr,lastNarr;
            	if(narr==0){
                    var div1Str = textStrInner.substring(0, halfLength);
                    restNarr = div1Str.substring(0, div1Str.lastIndexOf(">") + 1);
                    lastNarr = div1Str.substring(div1Str.lastIndexOf(">") + 1, div1Str.length);
                    getPrintDeatils(restNarr,ctx);
            	}
            	else{
            		
            		var newNarrLength=parseInt(halfLength+perHalfLength);
                    var div1Str= textStrInner.substring(halfLength, newNarrLength);
                    restNarr = div1Str.substring(0, div1Str.lastIndexOf(">") + 1);
                    var div1Str1=lastNarr+restNarr;
                    lastNarr=div1Str.substring(div1Str.lastIndexOf("<"), div1Str.length);
                    
                    getPrintDeatils(div1Str,ctx);
                    
    				halfLength=halfLength+perHalfLength;
            	}
            	imgData[count++] = canvas.toDataURL('image/jpg', '1.0');
            	$('#canvas').remove();
    			
            }
            
            function getPrintDeatils(div1Str,ctx){
            	var domParser = new DOMParser();
	            var htmlString = div1Str;
	            var fontStyNarr= "";
	            var docElement = domParser.parseFromString(htmlString, "text/html").documentElement;                   
	            var ele1 = docElement.getElementsByTagName("*");
				var top=10;
				var bcnt=-1,icnt=-1,ucnt=-1;
				
				for (var i = 0; i < ele1.length; i++) {
					var boNarr=0,itNarr=0;
					var strInnerHtml = ele1[i].innerHTML;
					
					var nInnerHtml = strInnerHtml.indexOf("span");
					var bInnerHtml = strInnerHtml.indexOf("<b>");
					var uInnerHtml = strInnerHtml.indexOf("<u>");
					var iInnerHtml = strInnerHtml.indexOf("<i>");
					var fontFamilNarr="";
					
					if(bInnerHtml>-1)
						bcnt++;
					if(iInnerHtml>-1)
						icnt++;
					if(uInnerHtml>-1)
						ucnt++;
					if(bcnt==0 || ucnt==0 )
						fontFamilNarr='"'+"bold 14pt Arial"+'"';
					else if(icnt==0)
						fontFamilNarr='"'+"italics 14pt Arial"+'"';
					else
						fontFamilNarr='"'+"14pt Arial"+'"';
					
					if(i==0){
						ctx.font = "11pt Arial";
						ctx.fillText("", 0, 10);
					}
					
					/*if(nInnerHtml == 1){
						
						if(strInnerHtml.indexOf("font-family")>-1){
							var stringNarr=strInnerHtml.split("font-family");
							var getFontFam=stringNarr[1].split(";");
							var getFontFamStr=getFontFam[0].split('"');
							var getFontsize=getFontFam[1].split(":")
							
						}
					}*/
					
					if(strInnerHtml.indexOf("<") == -1){
						
						var temp = (ele1[i].innerHTML).replace(/<[^>]*>/g, '');
						var temp1 = temp.replace(/&nbsp;/gi, ' ');
						var temp2 = temp1.replace(/&amp;/gi, '&');
						
						var words = temp2.split(' ');
				        var line = '';
				        
				        for(var n = 0; n < words.length; n++) {
				          var testLine = line + words[n] + ' ';
				          var metrics = ctx.measureText(testLine);
				          var testWidth = metrics.width;
				          if (testWidth > 850 && n > 0) {
				        	ctx.font = "11pt Arial";
				        	ctx.fillText(line, 0, top);
				            line = words[n] + ' ';    
				            top=top+15;
				           }
				          else {
				            line = testLine;
				          }
				          
				        }
				        ctx.font = "11pt Arial";
				        ctx.fillText(line, 0, top);
				        
				        bcnt=-1;
				        icnt=-1;
				        ucnt=-1;
				       
					}
					top=top+6;
					}
            }
            
            return imgData;
    	}

		// ssp Receipt Letter
		
		function sspReceiptLetter(certificateData){
			console.log(certificateData);
    		var titleImage='',voidStatus;
    		
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
    	
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		var splitAuditDate = certificateData.receiptdate.split('-');
    		var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
    		
    		var companyaddress = certificateData.companyaddress.split("   ");
    		
    		var footer = 'MSC-296P Rev. 4/18';

    		var sspReceiptletter = {
    		    ownerPassword: '123456',
    		    permissions: {
    		    printing: 'highResolution',
    		    modifying: false,
    		    copying: false,
    		    annotating: false,
    		    fillingForms: false,
    		    contentAccessibility: false,
    		    documentAssembly: false
    		  },
    		  footer: {
    		    columns: [
    		     // 'Left part',
    		      { text: footer, alignment: 'right', margin : [30,-50] }
    		    ]
    		  },
    			  defaultStyle:{
    				  font:'Times'
    			  }
    		  ,
    		content: [
    		  {
    					columns: [
    						{
    						image: sourceToDataURL('logo'),
    						width: 80, 
    						height: 80,
    						margin: [20,10],
    						
    						},
    						{ 
    						    width: '*',
    		                    text: [
    		                        {text: 'Republic of the Marshall Islands\n', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'Maritime Administrator\n\n', fontSize: 14, bold: true, color: 'black'},
    		                        {text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506\n', fontSize: 10, bold: false, color: 'black'},
    		                        {text: 'Telephone: +1-703-620-4880   Fax: +1-703-476-8522 \n', fontSize: 10, color: 'black'},
    		                        {text: 'Email: msc@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    		                    ],
    							style: 'rightme'
    						},
    					] 
    		    },	
    			{
    			    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0],italics:true
    			},
    			{
    			    columns: [
    						{
    							text:  receiptdate.replace(/^0+/, ''), 
    							margin: [20, 30, 0, 0],
    							style: 'fntSize'
    						}
    				]
    			},
    			{
    			    text: [
    			        {text:'RE: ',bold: true, fontSize: 12},
    			        {text: 'Ship Security Plan (SSP) Review Receipt', bold: true, fontSize: 12}
    			    ],
    			    margin:[20, 20, 0, 0]
    			},
    			
    			// Vessel Details
    			{
    			    columns: [ 
    						{
    							text: [
    							    {text: certificateData.vesselName},
    							    {text: " (Official Number "+certificateData.officialNo+", "+"IMO Number "+certificateData.vesselImoNo+')'}
    							],
    							style: 'fntSize'
    						},
    						
    				],
    				margin: [20, 20, 0, 0]
    			},
    			{
    			    text: certificateData.companyname,
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'
    			},
    			{
    				columns:[
    				         {
    			    				width:350,
    			    			    text: certificateData.companyaddress,
    			    			    margin: [20, 0, 0, 0],style: 'fntSize'
    				         }
    				 ]
    			},
    			{
    			    /*text: companyaddress[1].replace(/\s+/g, " "),
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'*/
    			},
    			{
    			   text: "To Whom It May Concern:",
    			   margin: [20, 20, 0, 0],
    			   style: 'fntSize'
    			},
    			{
    			   text: "Please be advised that the SSP  for  the  vessel  named  above  has  been  received  for  review and  approval  by  the   Republic   of   the   Marshall   Islands   Maritime   Administrator.",
    			   margin: [20, 20, 20, 0],
    			   alignment: 'justify',
    			   style: 'fntSize'
    			},
    			{
    			    text: 'A copy of this letter  must be placed on board the vessel as evidence that  the SSP has been submitted for review and approval in compliance with ISPS Code Part A 19.4.2.2.',
    			    margin:[20, 10, 20, 0],
    			    alignment: 'justify',
    			    style: 'fntSize'
    			},
    			{
    			    text:"Regards,",
    			    margin:[20, 20, 0, 0],
    			    style: 'fntSize'
    			},
    			{
    			    stack: [
    			                {
									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 230, 
									    height: 30,
									    //alignment:'right',
									    margin:[0, 30, 0, 0]
									},
									{
    		                        canvas: [
    			                              {
    		                    					type: 'line',
    		                    					x1: 0, y1: 5,
    		                    					x2: 290, y2: 5,
    		                    					lineWidth: 1
    						                }
    			                    ]
    		                    },
    		                    {  
    		                        text: certificateData.signerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    		                        margin : [0, 10]
    		                        
    		                    },
    		                    {
    		                        image: titleImage,
    						        width: 120, 
    						        height: 120,
    						        alignment:'right',
    						        margin:[20, -100]
    		                    }
    			        ],
    			        margin:[20, 20, 0, 0]
    			}
    			
    		    ],
    		    pageSize: 'Letter',
//    			pageMargins: [10, 10, 20, 10],
    		    background: function(currentPage, pageSize) { 
    		        return {
    		        image: sourceToDataURL('watermark'),
    		        width: 300,
    		        absolutePosition: {x: 150, y: 260},
    		        opacity: 0.7}
    		    },
    		    styles:{
    		        rightme:
    		        {   
    		            alignment: 'center',
    		            margin: [0, 10, 80, 0]
    		        },
    		        fntSize:
    		        {
    		        	fontSize: 12
    		        }
    		    },
    		       
    		}
    		sspReceiptletter.content.push( voidStatus==true?{//crossLine ssp receipt letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');		

    		
    		
    		return sspReceiptletter;
    		
    	}
		
// DMLC Receipt Letter
    	
    	function dmlcReceiptLetter(certificateData){
    		
//    		console.log(certificateData);
    		var companyaddress = certificateData.companyaddress.split("  ");
    		var titleImage='' ,voidStatus;
    		
    		if(certificateData.activeStatus == 0 ){
			
				voidStatus = true;
			}
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
  		
    		var splitAuditDate = certificateData.receiptdate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2];
    		
    		var footer = 'MSC-400P Rev. 4/18';
    		console.log(certificateData.receiptdate);
    		var dmlcReceiptletter = {
    			    ownerPassword: '123456',
    			    permissions: {
    			    printing: 'lowResolution',
    			    modifying: false,
    			    copying: false,
    			    annotating: false,
    			    fillingForms: false,
    			    contentAccessibility: false,
    			    documentAssembly: false,
    			  },
    			  footer: {
    			    columns: [
    			     // 'Left part',
    			      { text: footer, alignment: 'right', margin : [30,-50] }
    			    ]
    			  },
    			  defaultStyle:{
    				  font:'Times'
    			  },
    			  pageSize: 'Letter',
    			content: [
    			  {
    						columns: [
    							{
    							image: sourceToDataURL('logo'),
    							width: 80, 
    							height: 80,
    							margin: [20,10],
    							
    							},
    							{ 
    							    width: '*',
    			                    text: [
    			                        {text: 'Republic of the Marshall Islands\n', fontSize: 18, bold: true, color: 'black'},
    			                        {text: 'Maritime Administrator\n\n', fontSize: 14, bold: true, color: 'black'},
    			                        {text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506\n', fontSize: 10, bold: false, color: 'black'},
    			                        {text: 'Telephone: +1-703-620-4880   Fax: +1-703-476-8522 \n', fontSize: 10, color: 'black'},
    			                        {text: 'Email: msc@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    			                    ],
    								style: 'rightme'
    							},
    						] 
    			    },	
    				{
    				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
    				},
    				{
    				    columns: [
    							{
    								text:  AuitDate.replace(/^0+/, ''), 
    								margin: [20, 30, 0, 0],
    								fontSize: 12
    							}
    					]
    				},
    				{
    				    text: [
    				        {text:'RE: ', fontSize: 12, bold: true},
    				        {text: 'Declaration of Maritime Labour Compliance (DMLC), Part II Review Receipt', bold: true, fontSize: 12}
    				    ],
    				    margin:[20, 20, 0, 0]
    				},
    				
    				// Vessel Details
    				{
    				    columns: [
    							{
    								text: [
    								    {text: certificateData.vesselName},
    								    {text: " (Official Number "+certificateData.officialNo+", "+"IMO Number "+certificateData.vesselImoNo+')'}
    								],
    								fontSize: 12
    							},
    							
    					],
    					margin: [20, 20, 0, 0]
    				},
    				{
    					text: certificateData.companyname,
        			    margin: [20, 0, 0, 0],
        			    fontSize: 12
    				},
    				{
    					columns:[
        				         {
        			    				width:360,
        			    			    text: certificateData.companyaddress,
        			    			    margin: [20, 0, 0, 0],fontSize: 12
        				         }
        				 ]
    				},
    				{
    				   text: "To Whom It May Concern:",
    				   margin: [20, 20, 0, 0],fontSize: 12
    				},
    				{
    				   text: "Please be advised that the DMLC, Part II for the vessel named above has been received for review by the Republic of the Marshall Islands Maritime Administrator.",
    				   margin: [20, 20, 20, 0],
    				   alignment: 'justify',
    				   fontSize: 12
    				},
    				{
    				    text: 'A copy of this letter must be placed on board the vessel as evidence that the DMLC, Part II was submitted for review under Standard  A5.1.3,  paragraph  10  of the Maritime Labour Convention, 2006.',
    				    margin:[20, 10, 20, 0],
    				    alignment: 'justify',
    				    fontSize: 12
    				},
    				{
    				    text:"Regards,",
    				    margin:[20, 20, 0, 0],
    				    fontSize: 12
    				},
    				{
    				    stack: [
									{
									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 230, 
									    height: 30,
									    //alignment:'right',
									    margin:[0, 30, 0, 0]
									},
    				                {
    			                        canvas: [
    				                              {
    			                    					type: 'line',
    			                    					x1: 0, y1: 5,
    			                    					x2: 290, y2: 5,
    			                    					lineWidth: 1
    							                }
    				                    ]
    			                    },
    			                    {  
    			                        text: certificateData.signerName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    			                        margin : [0, 10]
    			                        
    			                    },
    			                    {
    			                        image: titleImage,
    							        width: 120, 
    							        height: 120,
    							        alignment:'right',
    							        margin:[20, -100]
    			                    }
    				        ],
    				        margin:[20, 20, 0, 0]
    				}
    				
    			    ],
//    				pageMargins: [10, 10, 20, 10],
    			    background: function(currentPage, pageSize) { 
    			        return {
    			        image: sourceToDataURL('watermark'),
    			        width: 300,
    			        absolutePosition: {x: 150, y: 260},
    			        opacity: 0.7}
    			    },
    			    styles:{
    			        rightme:
    			        {   
    			            alignment: 'center',
    			            margin: [0, 10, 80, 0]
    			        },
    			        fntSize:
        		        {
        		        	fontSize: 12
        		        }
    			    }
    			}
    		dmlcReceiptletter.content.push( voidStatus==true?{//crossLine dmlc receipt letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');		
    		
    		return dmlcReceiptletter;
    		
    	}
    	
    	//ihm ReceiptLetter	
    	function ihmReceiptLetter(certificateData){
    		console.log(certificateData)
    		var titleImage='',voidStatus;
    		
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
    		
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sepr", "Octr", "Nov", "Dec"
                ];
			var d = certificateData.receiptdate;
			var check = moment(certificateData.receiptdate, 'MMMDDYYYY');
			
			var Adate  = check.format('MMM');
    		console.log(Adate)
    		var splitAuditDate = certificateData.receiptdate.split('-');
    		var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
    		
    		var companyaddress = certificateData.companyaddress.split("   ");
    		
    		var useraddress = certificateData.userAddress;
    		//var useraddress = '201-202, Raheja Plaza\nPlot No. 15/B, Parksons Press Compound\nShah Industrial Estate\n';
    		
    		var addressTel= useraddress.toString().split('\\nTel');
    		if(addressTel.length==1)
    			addressTel= useraddress.toString().split('\nTel');
    		console.log(addressTel)
    		console.log("splitTel "+addressTel.length)
    		var addvi='';
    		for(var i=0;i<addressTel.length-1;i++){
    			
    			var addressTel1=addressTel[i].split('\\n');
    			if(addressTel1.length==1)
    				addressTel1= addressTel[i].split('\n');
    			console.log("splitTel\n"+addressTel1.length)
    			for(var j=0;j<addressTel1.length;j++){
    				if(addvi!=''){
    	    			if(j%3==0)
    	    				addvi += '\n' + addressTel1[j]+ ",";
    	    			else	
    	    				addvi += ' ' +addressTel1[j]+ ",";
    	    		}else{
        				addvi = addressTel1[j]+ ",";
        			}
    			}
    		}
    		var Tel;
    		if(addressTel.length==1){
	    			var addressTel1=addressTel[0].split('\\n');
	    			if(addressTel1.length==1)
	    				addressTel1= addressTel[0].split('\n');
	    			console.log("splitTel\n"+addressTel1.length)
	    			for(var j=0;j<addressTel1.length;j++){
	    				if(addvi!=''){
	    	    			if(j%3==0)
	    	    				addvi += '\n' + addressTel1[j]+ ",";
	    	    			else	
	    	    				addvi += ' ' +addressTel1[j]+ ",";
	    	    		}else{
	        				addvi = addressTel1[j]+ ",";
	        			}
	    			}
	    			if(addvi==''){
	    				addvi = addressTel[0].replace('\\n',' ');
	    				addvi = addressTel[0].replace('\n',' ');
	    			}
    		}else if(addressTel.length>1){
    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
    		}
    		useraddress = addvi;
    		
    		var footerR = 'MI-298J Rev. 3/20';
    		//var footerL = Adate+'/'+splitAuditDate[2];
    		//console.log(footerL)

    		var ihmReceiptletter = {
    		    ownerPassword: '123456',
    		    permissions: {
    		    printing: 'highResolution',
    		    modifying: false,
    		    copying: false,
    		    annotating: false,
    		    fillingForms: false,
    		    contentAccessibility: false,
    		    documentAssembly: false
    		  },
    		  footer: {
    		    columns: [
    		     // 'Left part',
    		     // { text: footerL, alignment: 'left', margin : [60,0] },
    		      { text: footerR, alignment: 'right', margin : [52,0] }
    		    ]
    		  },
    			  defaultStyle:{
    				  font:'Times'
    			  }
    		  ,
    		content: [
    		  {
    					columns: [
    						{
    						image: sourceToDataURL('logo'),
    						width: 80, 
    						height: 80,
    						margin: [20,10],
    						
    						},
    						{
    							width:30,
    							text:'',
    						},
    						{ 
    						    width: '*',
    		                    text: [
    		                    	{text: 'R', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'epublic of the ', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'M', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'arshall ', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'I', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'slands\n', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'M', fontSize: 14, bold: true, color: 'black'},
    		                        {text: 'aritime ', fontSize: 14, bold: true, color: 'black'},
    		                        {text: 'A', fontSize: 14, bold: true, color: 'black'},
    		                        {text: 'dministrator\n\n', fontSize: 14, bold: true, color: 'black'},
			                        {text: useraddress , fontSize: 10, bold: false, color: 'black'},
			                        {text: Tel , fontSize: 10, bold: false, color: 'black'},
			                        {text: '\n Email: ihm@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    		                    ],
    							style: 'rightme',
    							margin: [-70,10,0,0]
    						},
    					] 
    		    },
    		    {
				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
				},
    			{
    			    columns: [
    						{
    							text:  receiptdate.replace(/^0+/, ''), 
    							margin: [20, 20, 0, 0],
    							fontSize: 12
    						}
    				]
    			},
    			{
    			    text: [
    			        {text:'RE: Inventory of Hazardous Materials (IHM), Part I Receipt for Review under the Hong Kong Convention/EU Ship Recycling Regulations No. 1257/2013',bold: true, fontSize: 12},
    			    ],
    			    margin:[20, 17, 0, 0]
    			},
    			
    			// Vessel Details

    			{
					text: certificateData.vesselName+' (Official Number '+certificateData.officialNo+', IMO Number '+certificateData.vesselImoNo+')',
					margin: [20, 20, 0, 10],
					fontSize: 12
			    },
			   /* {
			    	text: certificateData.officialNo,
			    	margin:[20, 0, 0, 0],
    			    alignment: 'justify',
    			    fontSize: 12
    			},
			    {
			    	text: certificateData.vesselImoNo,
			    	margin:[20, 0, 0, 0],
    			    alignment: 'justify',
    			    fontSize: 12
    			 },*/
		

    			
    			// Company Details
			    {
			    	
			    	margin: [20, 0, 0, 0],
			    	table: {
			    		widths: [515,30],
			        	heights: [20,10],
			    	body: [
			    	   /* [
			    	    	{
			    			    border: [true, true,true, true],
			    	 			fillColor: '',
			    				text: [{text: certificateData.companyname ?certificateData.companyname:'', 
			    						fontSize: 12,
			    						bold:false}]
			    			}],*/
			    	   		
			    			[
			    			{
			    				margin: [0, -10, 0, 0],
			    			    border: [true, true,true, true],
			    	 			fillColor: '',
			    				text: [{text: certificateData.companyaddress,
			    					    fontSize: 12,
			    					    bold:false}]
			    			    
			    			    
			    			}],
			    			
			    	    ]},
			    		layout: 'noBorders'
			    },
    			{
    			    /*text: companyaddress[1].replace(/\s+/g, " "),
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'*/
    			},
    			{
    			   text: "To Whom It May Concern,",
    			   margin: [20, 10, 0, 0],
    			   fontSize: 12
    			},
    			{
    			   text: "Please be advised that the IHM, Part I for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator.",
    			   margin: [20, 10, 20, 0],
    			   alignment: 'justify',
    			   fontSize: 12
    			},
    			{
    			    text: 'A copy of this letter must be placed on board the vessel.',
    			    margin:[20, 10, 20, 0],
    			    alignment: 'justify',
    			    fontSize: 12
    			},
    			{
				    text:"Regards,",
				    margin:[20, 140, 0, 0],
				    fontSize: 12
				},
				{
				    stack: [
		    				    	/*{
				                		text: "Signature:",
				                		margin:[0, 25, 0, 0],
				                		fontSize: 12
				                	},*/
				    				{
									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 80, 
									    height: 40,
									    //alignment:'right',
									    margin:[30, 5, 30, 0],
									    fontSize: 12
									},
									{
			                        canvas: [
				                              {
			                    					type: 'line',
			                    					x1: 0, y1: 5,
			                    					x2: 290, y2: 5,
			                    					lineWidth: 1
							                }
				                    ]
			                    },
			                   /* {
			                		text: "Name:",
			                		margin:[0, 30, 0, 0],
			                		fontSize: 12
			                	},*/
			                	{
			                		text: certificateData.leadAuditorName,
			                		margin:[0, 10, 0, 0],
			                		fontSize: 12
			                	},
			                	{
			                		text: certificateData.title,
			                		fontSize: 12,
			                		margin:[0, 5, 0, 0]
			                	},
			                	/*{
			                        canvas: [
				                              {
			                    					type: 'line',
			                    					x1: 70, y1: 5,
			                    					x2: 290, y2: 5,
			                    					lineWidth: 1
							                }
				                    ]
			                    },*/
			                	{
			                		text:"Issued by the authority of the Republic of the\n",
			    				    margin:[0, 3, 0, 0],
			    				    fontSize: 12
			                	},
			                	{
			                		text:"Marshall Islands Maritime Administrator",
			    				    margin:[0, 3, 0, 0],
			    				    fontSize: 12
			                	},
    		                    /*{  
    		                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    		                        margin : [0, 10]
    		                        
    		                    },*/
    		                    {
    		                        image: titleImage,
    						        width: 120, 
    						        height: 120,
    						        alignment:'right',
    						        margin:[20, -100]
    		                    }
    			        ],
    			        margin:[20, 20, 0, 0]
    			}
    			
    		    ],
    		    pageSize: 'Letter',
//    			pageMargins: [10, 10, 20, 10],
    		    background: function(currentPage, pageSize) { 
    		        return {
    		        image: sourceToDataURL('watermark'),
    		        width: 300,
    		        absolutePosition: {x: 150, y: 260},
    		        opacity: 0.7}
    		    },
    		    styles:{
    		        rightme:
    		        {   
    		            alignment: 'center',
    		            margin: [0, 10, 80, 0]
    		        },
    		        fntSize:
    		        {
    		        	fontSize: 12
    		        }
    		    }
    		}
    		ihmReceiptletter.content.push( voidStatus==true?{//crossLine ihm receipt letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');		
    		
    		return ihmReceiptletter;
    		
    	};
	//ihm AmendmentReceiptLetter
    	function ihmAmendmentReceiptLetter(certificateData){
    		console.log(certificateData)
    		var titleImage='',voidStatus;
    		
			if(certificateData.activeStatus == 0 ){
				
				voidStatus = true;
			}
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sepr", "Octr", "Nov", "Dec"
                ];
			var d = certificateData.receiptdate;
			var check = moment(certificateData.receiptdate, 'MMMDDYYYY');
			
			var Adate  = check.format('MMM');
    		console.log(Adate)
    		var splitAuditDate = certificateData.receiptdate.split('-');
    		var receiptdate = splitAuditDate[0]+' '+splitAuditDate[1]+' '+splitAuditDate[2]
    		
    		var companyaddress = certificateData.companyaddress.split("   ");
    		
    		var useraddress = certificateData.userAddress;
    		//var useraddress = '201-202, Raheja Plaza\nPlot No. 15/B, Parksons Press Compound\nShah Industrial Estate\n';
    		
    		var addressTel= useraddress.toString().split('\\nTel');
    		if(addressTel.length==1)
    			addressTel= useraddress.toString().split('\nTel');
    		console.log(addressTel)
    		console.log("splitTel "+addressTel.length)
    		var addvi='';
    		for(var i=0;i<addressTel.length-1;i++){
    			
    			var addressTel1=addressTel[i].split('\\n');
    			if(addressTel1.length==1)
    				addressTel1= addressTel[i].split('\n');
    			console.log("splitTel\n"+addressTel1.length)
    			for(var j=0;j<addressTel1.length;j++){
    				if(addvi!=''){
    	    			if(j%3==0)
    	    				addvi += '\n' + addressTel1[j]+ ",";
    	    			else	
    	    				addvi += ' ' +addressTel1[j]+ ",";
    	    		}else{
        				addvi = addressTel1[j]+ ",";
        			}
    			}
    		}
    		var Tel;
    		if(addressTel.length==1){
	    			var addressTel1=addressTel[0].split('\\n');
	    			if(addressTel1.length==1)
	    				addressTel1= addressTel[0].split('\n');
	    			console.log("splitTel\n"+addressTel1.length)
	    			for(var j=0;j<addressTel1.length;j++){
	    				if(addvi!=''){
	    	    			if(j%3==0)
	    	    				addvi += '\n' + addressTel1[j]+ ",";
	    	    			else	
	    	    				addvi += ' ' +addressTel1[j]+ ",";
	    	    		}else{
	        				addvi = addressTel1[j]+ ",";
	        			}
	    			}
	    			if(addvi==''){
	    				addvi = addressTel[0].replace('\\n',' ');
	    				addvi = addressTel[0].replace('\n',' ');
	    			}
    		}else if(addressTel.length>1){
    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
    		}
    		useraddress = addvi;
    		
    		var footerR = 'MI-298M Rev. 6/20';
    		//var footerL = Adate+'/'+splitAuditDate[2];
    		//console.log(footerL)
    	var ihmPart1IssueDate=certificateData.certIssueDate? moment(certificateData.certIssueDate,YYYYMMDD).format('DD MMMM YYYY'):''

    		var ihmAmendmentReceiptLetter = {
    		    ownerPassword: '123456',
    		    permissions: {
    		    printing: 'highResolution',
    		    modifying: false,
    		    copying: false,
    		    annotating: false,
    		    fillingForms: false,
    		    contentAccessibility: false,
    		    documentAssembly: false
    		  },
    		  footer: {
    		    columns: [
    		     // 'Left part',
    		     // { text: footerL, alignment: 'left', margin : [60,0] },
    		      { text: footerR, alignment: 'right', margin : [52,0] }
    		    ]
    		  },
    			  defaultStyle:{
    				  font:'Times'
    			  }
    		  ,
    		content: [
    		  {
    					columns: [
    						{
    						image: sourceToDataURL('logo'),
    						width: 80, 
    						height: 80,
    						margin: [20,10],
    						
    						},
    						{
    							width:30,
    							text:'',
    						},
    						{ 
    						    width: '*',
    		                    text: [
    		                    	{text: 'R', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'epublic of the ', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'M', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'arshall ', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'I', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'slands\n', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'M', fontSize: 14, bold: true, color: 'black'},
    		                        {text: 'aritime ', fontSize: 14, bold: true, color: 'black'},
    		                        {text: 'A', fontSize: 14, bold: true, color: 'black'},
    		                        {text: 'dministrator\n\n', fontSize: 14, bold: true, color: 'black'},
			                        {text: useraddress , fontSize: 10, bold: false, color: 'black'},
			                        {text: Tel , fontSize: 10, bold: false, color: 'black'},
			                        {text: '\n Email: ihm@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    		                    ],
    							style: 'rightme',
    							margin: [-70,10,0,0]
    						},
    					] 
    		    },
    		    {
				    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
				},
    			{
    			    columns: [
    						{
    							text: receiptdate.replace(/^0+/, '') , 
    							margin: [20, 20, 0, 0],
    							fontSize: 12
    						}
    				]
    			},
    			{
    			    text: [
    			        {text:'RE: Inventory of Hazardous Materials (IHM), Part I - Amendment(s) Review Receipt',bold: true, fontSize: 12},
    			    ],
    			    margin:[20, 17, 0, 0]
    			},
    			
    			// Vessel Details

    			{
					text: certificateData.vesselName+' (Official Number '+certificateData.officialNo+', IMO Number '+certificateData.vesselImoNo+')',
					margin: [20, 20, 0, 10],
					fontSize: 12
			    },
			   /* {
			    	text: certificateData.officialNo,
			    	margin:[20, 0, 0, 0],
    			    alignment: 'justify',
    			    fontSize: 12
    			},
			    {
			    	text: certificateData.vesselImoNo,
			    	margin:[20, 0, 0, 0],
    			    alignment: 'justify',
    			    fontSize: 12
    			 },*/
		

    			
    			// Company Details
			    {
			    	
			    	margin: [20, 0, 0, 0],
			    	table: {
			    		widths: [515,30],
			        	heights: [20,10],
			    	body: [
			    	    /*[
			    	    	{
			    			    border: [true, true,true, true],
			    	 			fillColor: '',
			    				text: [{text: certificateData.companyname, 
			    						fontSize: 12,
			    						bold:false}]
			    			}],*/
			    			[
			    			{
			    				margin: [0, -10, 0, 0],
			    			    border: [true, true,true, true],
			    	 			fillColor: '',
			    				text: [{text: certificateData.companyaddress,
			    					    fontSize: 12,
			    					    bold:false}]
			    			    
			    			    
			    			}],
			    			
			    	    ]},
			    		layout: 'noBorders'
			    },
    			{
    			    /*text: companyaddress[1].replace(/\s+/g, " "),
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'*/
    			},
    			{
    			   text: "To Whom It May Concern,",
    			   margin: [20, 10, 0, 0],
    			   fontSize: 12
    			},
    			{
    			   text: 'The Republic of the Marshall Islands Maritime Administrator has received for review the IHM, Part \n I, with issue date '+ihmPart1IssueDate+' and Revision No. '+certificateData.sspRevisionNo+', and its amendment(s) for the vessel named above.',
    			   margin: [20, 10, 20, 0],
    			   alignment: 'justify',
    			   fontSize: 12
    			},
    			{
    			    text: 'A copy of this Amendment(s) Review Receipt letter must be placed on board the vessel as evidence \n the IHM, Part I is being reviewed.',
    			    margin:[20, 10, 20, 0],
    			    alignment: 'justify',
    			    fontSize: 12
    			},
    			{
				    text:"Regards,",
				    margin:[20, 140, 0, 0],
				    fontSize: 12
				},
				{
				    stack: [
		    				    	/*{
				                		text: "Signature:",
				                		margin:[0, 25, 0, 0],
				                		fontSize: 12
				                	},*/
				    				{
									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 80, 
									    height: 40,
									    //alignment:'right',
									    margin:[30, 5, 30, 0],
									    fontSize: 12
									},
									{
			                        canvas: [
				                              {
			                    					type: 'line',
			                    					x1: 0, y1: 5,
			                    					x2: 290, y2: 5,
			                    					lineWidth: 1
							                }
				                    ]
			                    },
			                   /* {
			                		text: "Name:",
			                		margin:[0, 30, 0, 0],
			                		fontSize: 12
			                	},*/
			                	{
			                		text: certificateData.leadAuditorName,
			                		margin:[0, 10, 0, 0],
			                		fontSize: 12
			                	},
			                	{
			                		text: certificateData.title,
			                		fontSize: 12,
			                		margin:[0, 5, 0, 0]
			                	},
			                	/*{
			                        canvas: [
				                              {
			                    					type: 'line',
			                    					x1: 70, y1: 5,
			                    					x2: 290, y2: 5,
			                    					lineWidth: 1
							                }
				                    ]
			                    },*/
			                	{
			                		text:"Issued by the authority of the Republic of the\n",
			    				    margin:[0, 3, 0, 0],
			    				    fontSize: 12
			                	},
			                	{
			                		text:"Marshall Islands Maritime Administrator",
			    				    margin:[0, 3, 0, 0],
			    				    fontSize: 12
			                	},
    		                    /*{  
    		                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    		                        margin : [0, 10]
    		                        
    		                    },*/
    		                    {
    		                        image: titleImage,
    						        width: 120, 
    						        height: 120,
    						        alignment:'right',
    						        margin:[20, -100]
    		                    }
    			        ],
    			        margin:[20, 20, 0, 0]
    			}
    			
    		    ],
    		    pageSize: 'Letter',
//    			pageMargins: [10, 10, 20, 10],
    		    background: function(currentPage, pageSize) { 
    		        return {
    		        image: sourceToDataURL('watermark'),
    		        width: 300,
    		        absolutePosition: {x: 150, y: 260},
    		        opacity: 0.7}
    		    },
    		    styles:{
    		        rightme:
    		        {   
    		            alignment: 'center',
    		            margin: [0, 10, 80, 0]
    		        },
    		        fntSize:
    		        {
    		        	fontSize: 12
    		        }
    		    }
    		}
    	ihmAmendmentReceiptLetter.content.push( voidStatus==true?{//crossLine dmlc receipt letter
			canvas : [ {
				type : 'line',
			   	x1 : 0,
				y1 : -40,
				x2 : 525,
				y2 : -765,
				lineColor:'red',
				lineWidth : 2
			} 
			],
			absolutePosition:{x:45,y:800} 
		}:'');		
    		
    		return ihmAmendmentReceiptLetter;
    		
    	};
	
// sspAmendmentLetter
    	
    	function sspAmendmentLetter(certificateData){
    		
    		console.log(certificateData);
    		var companyaddress = certificateData.companyaddress.split("   ");
    		//var image1 = new Image();
    		//image1 = "data:image/png;base64,"+certificateData.leadSign;
    		
    		var monthNames = ["January", "February", "March", "April", "May", "June",
    		                    "July", "August", "September", "October", "November", "December"
    		                  ];
    		var d = certificateData.auditDate;
    	//	var Adate = monthNames[d.getMonth()];
    		
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
    		
    		
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		console.log("AuitDate",AuitDate);
    		
    		var c = certificateData.certIssueDate;
    	//	var Cdate = monthNames[d.getMonth()];
    		
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var Cdate  = check1.format('MMMM');
    		
    		var splitAuditDate = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate[0]+' '+Cdate+' '+splitAuditDate[2];
    		
    		var titleImage='',voidStatus;
    		
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		
    		var footer = 'MSC-296R Rev. 4/18';

    		var sspAmendmentletter = {
    		    ownerPassword: '123456',
    		    permissions: {
    		    printing: 'lowResolution',
    		    modifying: false,
    		    copying: false,
    		    annotating: false,
    		    fillingForms: false,
    		    contentAccessibility: false,
    		    documentAssembly: false,
    		  },
    		  footer: {
    		    columns: [
    		     // 'Left part',
    		      { text: footer, alignment: 'right', margin : [30,-50] }
    		    ]
    		  },
    		  defaultStyle:{
				  font:'Times'
			  },
    		content: [
    		  {
    					columns: [
    						{
    						image: sourceToDataURL('logo'),
    						width: 80, 
    						height: 80,
    						margin: [20,10],
    						
    						},
    						{ 
    						    width: '*',
    		                    text: [
    		                        {text: 'Republic of the Marshall Islands\n', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'Maritime Administrator\n\n', fontSize: 14, bold: true, color: 'black'},
    		                        {text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506\n', fontSize: 10, bold: false, color: 'black'},
    		                        {text: 'Telephone: +1-703-620-4880   Fax: +1-703-476-8522 \n', fontSize: 10, color: 'black'},
    		                        {text: 'Email: msc@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    		                    ],
    							style: 'rightme'
    						},
    					] 
    		    },	
    			{
    			    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
    			},
    			{
    			    columns: [
    						{
    							text:  AuitDate.replace(/^0+/, ''),
    							margin: [20, 30, 0, 0],
    							style: 'fntSize'
    						}
    				]
    			},
    			{
    			    text: [
    			        {text:'RE: ', style: 'fntSize',fontSize: 12, bold: true},
    			        {text: 'Ship Security Plan (SSP) Amendment(s) Approval Letter', bold: true, fontSize: 12}
    			    ],
    			    margin:[20, 20, 0, 0]
    			},
    			
    			// Vessel Details
    			{
    			    columns: [
    						{
    							text: [
    							    {text: certificateData.vesselName},
    							    {text: " (Official Number "+certificateData.officialNo+"; "+"IMO Number "+certificateData.vesselImoNo+')'}
    							],
    							style: 'fntSize'
    						},
    						
    				],
    				margin: [20, 20, 0, 0]
    			},
    			{
    			    text: certificateData.companyname ?certificateData.companyname:'',
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'
    			},
    			{
    				columns:[
    				         {
    			    				width:350,
    			    			    text: certificateData.companyaddress,
    			    			    margin: [20, 0, 0, 0],style: 'fntSize'
    				         }
    				 ]
    			},
    			{
    			    /*text: companyaddress[1].replace(/\s+/g, " "),
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'*/
    			},
    			{
    			   text: "To Whom It May Concern:",
    			   margin: [20, 20, 0, 0],
    			   style: 'fntSize'
    			},
    			{
    			   text: "Please be advised that the SSP Amendment(s) revision "+ certificateData.revisionNo +", dated "+ certIssueDate.replace(/^0+/, '')+", for the vessel named above has/have been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator and found to be in compliance with the International Ship and Port Facility Security Code.",
    			   margin: [20, 20, 20, 0],
    			   alignment: 'left',
    			   style: 'fntSize'
    			},
    			{
    			    text: 'A copy of this letter and associated amendment(s) must be available on board. A copy of this letter must be presented together with the International Ship Security Certificate (ISSC) or the Interim ISSC.',
    			    margin:[20, 10, 25, 0],
    			    alignment: 'justify',
    			    style: 'fntSize'
    			},
    			{
    			    text:"Regards,",
    			    margin:[20, 20, 0, 0],
    			    style: 'fntSize'
    			},
    			{
    			    stack: [
									{
									    image: (certificateData.leadSign)? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 230, 
									    height: 30,
									    //alignment:'right',
									    margin:[0, 30, 0, 0]
									},
									{
    		                        canvas: [
    			                              {
    		                    					type: 'line',
    		                    					x1: 0, y1: 5,
    		                    					x2: 290, y2: 5,
    		                    					lineWidth: 1
    						                }
    			                    ]
    		                    },
    		                    {  
    		                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    		                        margin : [0, 10]
    		                        
    		                    },
    		                    {
    		                        image: titleImage,
    						        width: 120, 
    						        height: 120,
    						        alignment:'right',
    						        margin:[20, -100]
    		                    }
    			        ],
    			        margin:[20, 20, 0, 0]
    			}
    			
    		    ],
    		    pageSize: 'Letter',
//    			pageMargins: [10, 10, 20, 10],
    		    background: function(currentPage, pageSize) { 
    		        return {
    		        image: sourceToDataURL('watermark'),
    		        width: 300,
    		        absolutePosition: {x: 150, y: 260},
    		        opacity: 0.7}
    		    },
    		    styles:{
    		        rightme:
    		        {   
    		            alignment: 'center',
    		            margin: [0, 10, 80, 0]
    		        },
    		        fntSize:
    		        {
    		        	fontSize: 12
    		        }
    		    }
    		}
    		
    		sspAmendmentletter.content.push( voidStatus==true?{//crossLine ssp amendment approavl letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');	
    		return sspAmendmentletter;
    		
    	}
    	
    	// dmlcAmendmentLetter
    	function dmlcAmendmentLetter(certificateData){
    		
    		var companyaddress = certificateData.companyaddress.split("  ");
    		
    		console.log("certificateData",certificateData);
    		
    		var monthNames = ["January", "February", "March", "April", "May", "June",
    		                    "July", "August", "September", "October", "November", "December"
    		                  ];
    		var d =certificateData.auditDate;
    		//var Adate = monthNames[d.getMonth()];
    		
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
    		
    		
    		var cDate = certificateData.certIssueDate;
    	//	var certdate = monthNames[cDate.getMonth()];
    		
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var certdate  = check1.format('MMMM');
    		
    		
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		console.log("AuitDate",AuitDate);
    		
    		var splitAuditDate1 = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate1[0]+' '+certdate+' '+splitAuditDate1[2];
    		
    		var titleImage='',voidStatus;
    		
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		
    		var footer = 'MI-400G Rev. 4/18';

    		var dmlcAmendmentletter = {
    		    ownerPassword: '123456',
    		    permissions: {
    		    printing: 'lowResolution',
    		    modifying: false,
    		    copying: false,
    		    annotating: false,
    		    fillingForms: false,
    		    contentAccessibility: false,
    		    documentAssembly: false,
    		  },
    		  footer: {
    		    columns: [
    		     // 'Left part',
    		      { text: footer, alignment: 'right', margin : [30, -50],fontSize:12 }
    		    ]
    		  },
    		  defaultStyle:{
				  font:'Times'
			  },
    		content: [
    		  {
    					columns: [
    						{
    						image: sourceToDataURL('logo'),
    						width: 80, 
    						height: 80,
    						margin: [20,10],
    						
    						},
    						{ 
    						    width: '*',
    		                    text: [
    		                        {text: 'Republic of the Marshall Islands\n', fontSize: 18, bold: true, color: 'black'},
    		                        {text: 'Maritime Administrator\n\n', fontSize: 14, bold: true, color: 'black'},
    		                        {text: '11495 Commerce Park Drive, Reston, Virginia 20191-1506\n', fontSize: 10, bold: false, color: 'black'},
    		                        {text: 'Telephone: +1-703-620-4880   Fax: +1-703-476-8522 \n', fontSize: 10, color: 'black'},
    		                        {text: 'Email: msc@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
    		                    ],
    							style: 'rightme'
    						},
    					] 
    		    },	
    			{
    			    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
    			},
    			{
    			    columns: [
    						{
    							text:  AuitDate.replace(/^0+/, ''), 
    							margin: [20, 30, 0, 0]
    						}
    				]
    			},
    			{
    			    text: [
    			        {text:'RE: ', style: 'fntSize',bold: true,},
    			        {text: 'Declaration of Maritime Labour Compliance (DMLC), Part II Amendment(s) Review Letter', bold: true, fontSize: 12}
    			    ],
    			    margin:[20, 20, 0, 0]
    			},
    			
    			// Vessel Details 
				
    			{
    			    columns: [
    						{
    							text: [
    							    {text: certificateData.vesselName},
    							    {text: " (Official Number "+certificateData.officialNo+", "+"IMO Number "+certificateData.vesselImoNo+')'}
    							] 
    						},
    						
    				],
    				margin: [20, 30, 0, 0]
    			},
    			{
					text: certificateData.companyname,
    			    margin: [20, 0, 0, 0],
    			    fontSize: 12
				},
    			{
					columns:[
    				         {
    			    				width:360,
    			    			    text: certificateData.companyaddress,
    			    			    margin: [20, 0, 0, 0],fontSize: 12
    				         }
    				 ]
				},
    			{
    			   text: "To Whom It May Concern:",
    			   margin: [20, 20, 0, 0],
    			   fontSize: 12
    			},
    			{
    			   text: "Please be advised that the DMLC, Part II Amendment(s) revision "+ certificateData.revisionNo +", dated "+ certIssueDate.replace(/^0+/, '')+", for the vessel named above has/have been reviewed and is/are considered acceptable pursuant to Standard A5.1.3, paragraph 10 of the Maritime Labour Convention, 2006 (MLC, 2006) and the Republic of the Marshall Islands requirements for implementing MLC, 2006.",
    			   margin: [20, 20, 0, 0],
    			   alignment: 'left',
    			   fontSize: 12
    			},
    			{
    			    text: 'A copy of this letter and associated DMLC, Part II amendment(s) must be available on board.',
    			    margin:[20, 10, 0, 0],
    			    fontSize: 12
    			},
    			{
    			    text:"Regards,",
    			    margin:[20, 20, 0, 0],
    			    fontSize: 12
    			},
    			{
    			    stack: [
    			                {
									    image: (certificateData.leadSign) ? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 230, 
									    height: 30,
									    //alignment:'right',
									    margin:[0, 30, 0, 0]
									},
									{
    		                        canvas: [
    			                              {
    		                    					type: 'line',
    		                    					x1: 0, y1: 5,
    		                    					x2: 290, y2: 5,
    		                    					lineWidth: 1
    						                }
    			                    ]
    		                    },
    		                    {
    		                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    		                        margin : [0, 10]
    		                        
    		                    },
    		                    {
    		                        image: titleImage,
    						        width: 120, 
    						        height: 120,
    						        alignment:'right',
    						        margin:[10, -100]
    		                    }
    			        ],
    			        margin:[20, 20, 0, 0]
    			}
    			
    		    ],
    		    pageSize: 'Letter',
//    			pageMargins: [10, 10, 20, 10],
    		    background: function(currentPage, pageSize) { 
    		        return {
    		        image: sourceToDataURL('watermark'),
    		        width: 300,
    		        absolutePosition: {x: 150, y: 260},
    		        opacity: 0.7}
    		    },
    		    styles:{
    		        rightme:
    		        {   
    		            alignment: 'center',
    		            margin: [0, 10, 80, 0]
    		        },
    		        fntSize:
    		        {
    		        	fontSize: 12
    		        }
    		    }
    		}
    		dmlcAmendmentletter.content.push( voidStatus==true?{//crossLine dmlc approval letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');
    		
    		return dmlcAmendmentletter;
    		
    	}
    	
    	
    	function ihmAmendmentLetter(certificateData){
    		console.log(certificateData);
    		
    		var voidStatus;
    		if(certificateData.activeStatus == 0 ){
    			
				voidStatus = true;
			}
    		var companyaddress = certificateData.companyaddress.split("   ");
    		//var image1 = new Image();
    		//image1 = "data:image/png;base64,"+certificateData.leadSign;
    		
    		var monthNames = ["January", "February", "March", "April", "May", "June",
    		                    "July", "August", "September", "October", "November", "December"
    		                  ];
    		var d = certificateData.auditDate;
    	//	var Adate = monthNames[d.getMonth()];
    		
    		var check = moment(certificateData.auditDate, 'MMMDDYYYY');

    		var Adate  = check.format('MMMM');
    		
    		
    		var splitAuditDate = certificateData.auditDate.split('-');
    		var AuitDate = splitAuditDate[0]+' '+Adate+' '+splitAuditDate[2];
    		
    		var c = certificateData.certIssueDate;
    	//	var Cdate = monthNames[d.getMonth()];
    		
    		var check1 = moment(certificateData.certIssueDate, 'MMMDDYYYY');

    		var Cdate  = check1.format('MMMM');
    		
    		var splitAuditDate = certificateData.certIssueDate.split('-');
    		var certIssueDate = splitAuditDate[0]+' '+Cdate+' '+splitAuditDate[2];
    		
    		/*var ad = certificateData.additionalSurvey;
    		var check2 = moment(certificateData.additionalSurvey, 'MMMDDYYYY');
    		var Addate = check2.format('MMMM');
    		var splitAdditionalDate = certificateData.additionalSurvey.split('-');
    		var certAdditionalSurveyDate = splitAdditionalDate [0]+' '+Addate+''+splitAdditionalDate[2];*/
    		
    		var titleImage='';
    		if (certificateData.title != '') {
				if (certificateData.title.indexOf('Special') >= 0) {
					titleImage = sourceToDataURL('sa');
				} else if (certificateData.title.indexOf('Deputy') >= 0) {
					titleImage = sourceToDataURL('dc');
				}
			}
    		
    		var useraddress = certificateData.userAddress;
    		//var useraddress = '201-202, Raheja Plaza\nPlot No. 15/B, Parksons Press Compound\nShah Industrial Estate\n';
    		
    		var addressTel= useraddress.toString().split('\\nTel');
    		if(addressTel.length==1)
    			addressTel= useraddress.toString().split('\nTel');
    		console.log(addressTel)
    		console.log("splitTel "+addressTel.length)
    		var addvi='';
    		for(var i=0;i<addressTel.length-1;i++){
    			
    			var addressTel1=addressTel[i].split('\\n');
    			if(addressTel1.length==1)
    				addressTel1= addressTel[i].split('\n');
    			console.log("splitTel\n"+addressTel1.length)
    			for(var j=0;j<addressTel1.length;j++){
    				if(addvi!=''){
    	    			if(j%3==0)
    	    				addvi += '\n' + addressTel1[j]+ ",";
    	    			else	
    	    				addvi += ' ' +addressTel1[j]+ ",";
    	    		}else{
        				addvi = addressTel1[j]+ ",";
        			}
    			}
    		}
    		var Tel;
    		if(addressTel.length==1){
	    			var addressTel1=addressTel[0].split('\\n');
	    			if(addressTel1.length==1)
	    				addressTel1= addressTel[0].split('\n');
	    			console.log("splitTel\n"+addressTel1.length)
	    			for(var j=0;j<addressTel1.length;j++){
	    				if(addvi!=''){
	    	    			if(j%3==0)
	    	    				addvi += '\n' + addressTel1[j]+ ",";
	    	    			else	
	    	    				addvi += ' ' +addressTel1[j]+ ",";
	    	    		}else{
	        				addvi = addressTel1[j]+ ",";
	        			}
	    			}
	    			if(addvi==''){
	    				addvi = addressTel[0].replace('\\n',' ');
	    				addvi = addressTel[0].replace('\n',' ');
	    			}
    		}else if(addressTel.length>1){
    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\n','');
    				Tel = '\nTel' + addressTel[addressTel.length-1].replace('\\n','');
    		}
    		useraddress = addvi;
    		
    		var additionalSurveyDate= certificateData.additionalSurvey ?certificateData.additionalSurvey.replace(/-/g,' '):certificateData.additionalSurvey;
    		
    		var footer = 'MI-298N Rev. 6/20';

    		var ihmAmendmentLetter = {
        		    ownerPassword: '123456',
        		    permissions: {
        		    printing: 'lowResolution',
        		    modifying: false,
        		    copying: false,
        		    annotating: false,
        		    fillingForms: false,
        		    contentAccessibility: false,
        		    documentAssembly: false,
        		  },
    		  footer: {
    		    columns: [
    		     // 'Left part',
    		      { text: footer, alignment: 'right', margin : [30,-10] }
    		    ]
    		  },
    		  defaultStyle:{
				  font:'Times'
			  },
    		content: [
    		  {
    			  columns: [
                            {
                            image: sourceToDataURL('logo'),
                            width: 80,
                            height: 80,
                            margin: [20,10],
                           
                            },
                            {
                              width:30,
                              text:'',
                          },
                            {
                                width: '*',
                                text: [
                                    {text: 'R', fontSize: 18, bold: true, color: 'black'},
                                    {text: 'epublic of the ', fontSize: 18, bold: true, color: 'black'},
                                    {text: 'M', fontSize: 18, bold: true, color: 'black'},
                                    {text: 'arshall ', fontSize: 18, bold: true, color: 'black'},
                                    {text: 'I', fontSize: 18, bold: true, color: 'black'},
                                    {text: 'slands\n', fontSize: 18, bold: true, color: 'black'},
                                    {text: 'M', fontSize: 14, bold: true, color: 'black'},
                                    {text: 'aritime ', fontSize: 14, bold: true, color: 'black'},
                                    {text: 'A', fontSize: 14, bold: true, color: 'black'},
                                    {text: 'dministrator\n\n', fontSize: 14, bold: true, color: 'black'},
                                    {text: useraddress, fontSize: 10, bold: false, color: 'black'},
                                    {text: Tel , fontSize: 10, bold: false, color: 'black'},
                                    {text: '\n Email: ihm@register-iri.com   Website: www.register-iri.com', fontSize: 10, color: 'black'},
                                ],
                                style: 'rightme',
                                //alignment: 'center',
                                margin: [-70,10,0,0]
                            },
                        ] 
    		    },	
    			{
    			    text: 'Maritime Administrator', bold: false, fontSize: 8, margin: [20, 0, 0, 0], italics: true
    			},
    			{
    			    columns: [
    						{
    							text:  AuitDate.replace(/^0+/, ''),
    							margin: [20, 20, 0, 0],
    							style: 'fntSize'
    						}
    				]
    			},
    			{
    			    text: [
    			        {text:'RE: ', style: 'fntSize',fontSize: 10, bold: true},
    			        {text: 'Inventory of Hazardous Materials (IHM), Part I - Amendment(s) Approval Letter', bold: true, fontSize: 10}
    			    ],
    			    margin:[20, 10, 0, 0]
    			},
    			
    			// Vessel Details
    			{
    			    columns: [
    						{
    							text: [
    							    {text: certificateData.vesselName},
    							    {text: " (Official Number "+certificateData.officialNo+", "+"IMO Number "+certificateData.vesselImoNo+')'}
    							],
    							style: 'fntSize',
    							 fontSize: 10
    						},
    						
    				],
    				margin: [20, 20, 0, 0]
    			},
    			/*{
    			    text: certificateData.companyname +"\n",
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize',
    			    fontSize: 10
    			},*/
    			{
    				columns:[
    				         {
    			    				width:350,
    			    			    text: certificateData.companyaddress,
    			    			    margin: [20, 0, 0, 0],style: 'fntSize',
    			    			    fontSize: 10
    				         }
    				 ]
    			},
    			{
    			    /*text: companyaddress[1].replace(/\s+/g, " "),
    			    margin: [20, 0, 0, 0],
    			    style: 'fntSize'*/
    			},
    			{
    			   text: "To Whom It May Concern,",
    			   margin: [20, 10, 0, 0],
    			   style: 'fntSize',
    			   fontSize: 10
    			},
    			{
    			   text: 'Please be advised that the IHM, Part I issued '+certIssueDate.replace(/^0+/, '')+', revision dated '+certificateData.openMeetingDate.replace(/-/g,' ')+', and the amendment(s)\n No. '+certificateData.revisionNo+', dated '+additionalSurveyDate+", for the vessel named above has been reviewed and approved by the Republic of the Marshall Islands Maritime Administrator (the “Administrator”) and is found to be in compliance with the provisions of the Hong Kong Convention and the European Union Ship Recycling Regulation (EUSRR). " ,
    			   margin: [20, 10, 20, 0],
    			   alignment: 'left',
    			   style: 'fntSize',
    			   fontSize: 10
    			},
    			{
      			   text: 'During the review of the amended IHM, Part I, it was verified that the IHM, Part I amendment(s) have been developed in \n accordance with the Hong Kong Convention and the provisions of the EUSRR to have been taken into account and  \n applied as appropriate for the ship. ',
      			   margin: [20, 10, 20, 0],
      			   alignment: 'left',
      			   style: 'fntSize',
      			   fontSize: 10
      			},
      			{
       			   text: 'It is the owner\'s responsibility to maintain the IHM, Part I and keep it up-to-date. The IHM, Part I should be appropriately maintained and updated, especially after any repair, conversion, or sale of a ship. If any machinery or equipment is added to, removed or replaced, or the hull coating is renewed, the IHM, Part I should be updated according to the requirements for new ships as stipulated in the guidelines for development of IHM. Updating is not required if identical parts or coatings are installed or applied. The IHM, Part I should belong to the ship and the continuity and conformity of the information it contains should be confirmed, especially if the flag, owner, or operator of the ship changes.',
       			   margin: [20, 10, 20, 0],
       			   alignment: 'left',
       			   style: 'fntSize',
       			   fontSize: 10
       			},
    			{
    			    text: 'A copy of this amendment approval letter must be attached to the IHM, Part I approval letter and presented together with the respective Statement(s) of Compliance.',
    			    margin:[20, 10, 25, 0],
    			    alignment: 'justify',
    			    style: 'fntSize',
    			    fontSize: 10
    			},
    			{
    			    text:"Regards,",
    			    margin:[20, 20, 0, 0],
    			    style: 'fntSize',
    			    fontSize: 10
    			},
    			{
    			    stack: [
									{
									    image: (certificateData.leadSign)? "data:image/png;base64,"+certificateData.leadSign : sourceToDataURL('transparent'),
									    width: 80, 
									    height: 40,
									    //alignment:'right',
									    margin:[20, 20, 0, 0]
									},
									{
    		                        canvas: [
    			                              {
    		                    					type: 'line',
    		                    					x1: 0, y1: 5,
    		                    					x2: 290, y2: 5,
    		                    					lineWidth: 1
    						                }
    			                    ]
    		                    },
    		                    {  
    		                        text: certificateData.leadAuditorName + "\n" +certificateData.title + "\n" + "Issued by the authority of the Republic of the \n Marshall Islands Maritime Administrator",
    		                        margin : [0, 10],
    		                        fontSize: 10
    		                        
    		                    },
    		                    {
    		                        image: titleImage,
    						        width: 120, 
    						        height: 120,
    						        alignment:'right',
    						        margin:[20, -100]
    		                    }
    			        ],
    			        margin:[20, 20, 0, 0]
    			}
    			
    		    ],
    		    pageSize: 'Letter',
//    			pageMargins: [10, 10, 20, 10],
    		    background: function(currentPage, pageSize) { 
    		        return {
    		        image: sourceToDataURL('watermark'),
    		        width: 300,
    		        absolutePosition: {x: 150, y: 260},
    		        opacity: 0.7}
    		    },
    		    styles:{
    		        rightme:
    		        {   
    		            alignment: 'center',
    		            margin: [0, 0, 80, 0]
    		        },
    		        fntSize:
    		        {
    		        	fontSize: 12
    		        }
    		    }
    		}
    		
    		ihmAmendmentLetter.content.push( voidStatus==true?{//crossLine ihm amendment approval letter
				canvas : [ {
					type : 'line',
				   	x1 : 0,
					y1 : -40,
					x2 : 525,
					y2 : -765,
					lineColor:'red',
					lineWidth : 2
				} 
				],
				absolutePosition:{x:45,y:800} 
    		}:'');		
    		
    		return ihmAmendmentLetter;
    		
    	
    	}
		
	/*	
		function sspreviewletter(certificateData) {

			$('#canvas').remove();

			console.log(certificateData);

			var issuedatecontent = '', certificatecontent = '', certificatecontent1 = '', tempreview = '';

			var canvasEle = document.createElement('canvas');

			canvasEle.id = "canvas";
			canvasEle.width = 797;
			canvasEle.height = 1122;

			var body = document.getElementsByTagName("body")[0];
			body.appendChild(canvasEle);

			var canvashidden = angular.element(document
					.querySelector('#canvas'));
			canvashidden.addClass('hidden');

			var imageSign = document.getElementById("imageSign");
			
			 * var image1 = new Image(); image1.src
			 * ="data:image/png;base64,"+certificateData.leadSign;
			 
			var doc = new jsPDF('p', 'mm', 'a4');
			var canvas = document.getElementById("canvas"), revdate = "Sep/2017",

			lines, top = 70, left = 90;
			var ctx = canvas.getContext('2d');

			function wrapText(context, text, x, maxWidth, lineHeight) {

				var words = text.split(' '), line = '', lineCount = 0, i, test, metrics;

				for (i = 0; i < words.length; i++) {
					test = words[i];
					metrics = context.measureText(test);
					while (metrics.width > maxWidth) {
						test = test.substring(0, test.length - 1);
						metrics = context.measureText(test);
					}
					if (words[i] != test) {
						words.splice(i + 1, 0, words[i].substr(test.length))
						words[i] = test;
					}

					test = line + words[i] + ' ';
					metrics = context.measureText(test);

					if (metrics.width > maxWidth && i > 0) {
						context.fillText(line, x, top);
						top += 20;
						line = words[i] + ' ';
						lineCount++;
					} else {
						line = test;
					}
				}

				context.fillText(line, x, top);
				top += 20;
			}

			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			var images = document.getElementById("images");

			console.log(images);

			ctx.fillStyle = "#000000";

			ctx.drawImage(images, left + 20, top - 20, 100, 100);

			ctx.font = "500 12px italic";

			ctx.fillText("Maritime Administrator", left + 15, top + 100);

			ctx.font = "800 21px Times New Roman";
			ctx.fillText("Republic of the Marshall Islands", left + 180,
					top = top + 15);

			ctx.font = "800 16px Times New Roman";
			ctx.fillText("Maritime Administrator", left + 240, top = top + 30);

			ctx.font = "500 13px Times New Roman";
			ctx.fillText(
					"11495 Commerce Park Drive, Reston, Virginia 20191-1507",
					left + 180, top = top + 50);

			ctx.fillText("Telephone: (703) 620-4880   Fax: (703) 476-8522",
					left + 210, top = top + 15);

			ctx
					.fillText(
							"Email: msc@register-iri.com   Website: www.register-iri.com",
							left + 180, top = top + 15);

			ctx.font = "800 15px Times New Roman";

			ctx.fillText(certificateData.receiptdate, left, top = top + 80);

			top = top + 50;

			ctx.font = "800 15px Times New Roman";

			var Addrestemp = certificateData.companyname.split('\n');

			for (var i = 0; i < Addrestemp.length; i++) {

				wrapText(ctx, Addrestemp[i], left, 600, '\n', " ");

			}

			ctx.font = "800 15px Times New Roman";

			var Addrestemp = certificateData.companyaddress.split('\n');

			for (var i = 0; i < Addrestemp.length; i++) {

				wrapText(ctx, Addrestemp[i], left, 600, '\n', " ");

			}

			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				issuedatecontent = ''
						+ certificateData.vesselName
						+ ' (Official Number '
						+ certificateData.officialNo
						+ '; IMO Number '
						+ certificateData.vesselImoNo
						+ ') - Receipt of Declaration of Maritime Labour Compliance (DMLC), Part II for Review and Approval.';

				certificatecontent = 'Please be advised that the DMLC, Part II for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator';

				certificatecontent1 = 'A copy of this letter shall be placed on board the ship as evidence of the DMLC, Part II submission for review and approval in compliance with Standard A5.1.3, paragraph 10 of the Maritime Labour Convention, 2006.';

			} else if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				issuedatecontent = ''
						+ certificateData.vesselName
						+ ' (Official Number '
						+ certificateData.officialNo
						+ '; IMO Number '
						+ certificateData.vesselImoNo
						+ ') - Receipt of Ship Security Plan (SSP) for Review and Approval.';

				certificatecontent = 'Please be advised that the SSP for the vessel named above has been received for review and approval by the Republic of the Marshall Islands Maritime Administrator pursuant to Part A of the International Ship and Port Facility Security (ISPS) Code.';

				certificatecontent1 = 'A copy of this letter shall be placed on board the ship as evidence of the SSP submission for review and approval in compliance with ISPS Code Part A 19.4.2.2.';

			}

			top = top + 30;

			ctx.font = "900 15px Times New Roman";
			ctx.fillText("RE : ", left, top);

			ctx.font = "500 16px Times New Roman";
			wrapText(ctx, issuedatecontent, left + 40, 600, 18);

			top = top + 30;

			ctx.fillText("To Whom It May Concern:", left, top);

			top = top + 50;

			wrapText(ctx, certificatecontent, left, 640, 18);

			top = top + 30;

			wrapText(ctx, certificatecontent1, left, 640, 18);

			ctx.fillText("Regards,", left, top = top + 30);

			tempreview = top;

			ctx.drawImage(imageSign, left, top = top + 80, 235, 35);

			ctx.lineWidth = 2;
			ctx.beginPath();

			ctx.moveTo(left, top = top + 45);
			ctx.lineTo(left + 300, top);

			ctx.stroke();
			ctx.lineWidth = 1;

			ctx.fillText(certificateData.leadAuditorName, left, top = top + 20);

			top = top + 20;

			wrapText(
					ctx,
					"Issued by the authority of the Republic of the Marshall Islands Maritime Administrator",
					left, 300, 18);

			console.log(validateSeal(certificateData.title));

			if (validateSeal(certificateData.title) != '') {

				ctx.drawImage(validateSeal(certificateData.title), left + 450,
						tempreview, 150, 150);

			}

			if (certificateData.auditTypeId == AppConstant.DMLC_TYPE_ID) {

				ctx.fillText("MI-400E Rev. 4/18", left + 560, 1100);

			} else if (certificateData.auditTypeId == AppConstant.SSP_TYPE_ID) {

				ctx.fillText("MSC-296A Rev. 4/18", left + 560, 1100);

			}

			var imgData = canvas.toDataURL('image/jpg', '1.0');

			$('#canvas').remove();

			return imgData;
		}*/

		function getMasterData(audType) {

			var companyId2 = 2;//sessionStorage.getItem('companyId');
			
			console.log("audType  "+ audType)
			console.log("companyId2  "+ companyId2)

			return $q.all([

			detailsFactory.getAuditSubType(audType, companyId2).$promise,

			detailsFactory.getAuditStatus(audType, companyId2).$promise,

			detailsFactory.getCertificateIssued(audType, companyId2).$promise,

			detailsFactory.getObsCategory(audType, companyId2).$promise,

			detailsFactory.getObsStatus(audType, companyId2).$promise,

			detailsFactory.getAudObsType(companyId2).$promise,

			detailsFactory.getReportTypes(audType, companyId2).$promise,

			detailsFactory.getVesselData(companyId2).$promise,

			detailsFactory.getVesselTypeData(companyId2).$promise,

			detailsFactory.getAuditType(companyId2).$promise,

			detailsFactory.getAuditSummary(audType, companyId2).$promise,

			detailsFactory.getCompanyDetails(companyId2).$promise,

			detailsFactory.getAuditCode(audType, companyId2).$promise,

			detailsFactory.getMaPort(companyId2).$promise

			]).then(function(res) {
				return {
					'auditSubType' : res[0],
					'auditStatus' : res[1],
					'certificateIssued' : res[2],
					'obsCategory' : res[3],
					'obsStatus' : res[4],
					'audObsType' : res[5],
					'reportTypes' : res[6],
					'vesselData' : res[7],
					'vesselTypeData' : res[8],
					'auditTypes' : res[9],
					'auditSummary' : res[10],
					'companyDetails' : res[11],
					'auditCodes' : res[12],
					'maPort' : res[13]
				};
			})

		}

		function getAuditData(auditTypeId,auditSubTypeId,companyId) {

			return $q
					.all(
							[
									detailsFactory.getAuditSeqNo(auditTypeId,
											companyId).$promise,

									detailsFactory.getNewCertificateNo(
											auditTypeId,auditSubTypeId,companyId).$promise,

									detailsFactory.getAuditReportNo(
											auditTypeId, companyId).$promise

							]).then(function(res) {

						return res;
					})
		}

	}
})();
