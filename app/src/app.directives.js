
(function ()
{
    'use strict';

    angular
        .module('central')
        .directive('datetimepicker',datetimepicker)
        .directive('datepicker', datepicker) 
        .directive('fileModel', ['$parse',fileModel])
        .directive('ngSpinnerBar', ngSpinnerBar)
        .directive('tooltip',tooltip)
        .directive('dropdownMenuHover', dropdownMenuHover)        
        .directive('idatepicker', idatepicker)
        .directive('trailZero', trailZeroFn)
        .directive('ngOnlyNumber', ngOnlyNumberFn)
        .directive('spclCharac',spclCharac)
        .directive('fileMod',['$parse',fileMod])
        .directive('fileRead',['toaster',fileRead])
        .directive('fileReadPho',['toaster','$rootScope',fileReadPho])
        .directive('lettersInput',['$timeout',lettersInput])
        .directive('numDecimal',['$timeout',numDecimal])
         .directive('letterSpcl',['$timeout',letterSpcl])
        .directive('maximumLength',['$timeout',maximumLength])
        .directive('customTooltip',['$compile','$timeout',customTooltip])
        .directive('numeric', ['$timeout',Numeric])
        .directive('alphaNumeric' , alphaNumeric)
        .directive('fileUpload',['$parse',fileUpload])
        .directive('float',['$parse','$timeout',float])
        .directive('plusNumeric',plusNumeric)
        .directive('auditCodeDir', auditCodeDir)
        .directive('autoFocus', autoFocus)
        .directive('iframeAutoSize', iframeAutoSize)
        .directive('auditplace', ['$timeout' , auditPlace])
        .directive('resizable',['$timeout',resizable])
        .directive('mobileAlign',['$parse','$timeout',mobileAlign])
        .directive('charSpaceDotOnly', ['$timeout',charSpaceDotOnly])
        .directive('integer', ['$timeout',integer])
        .directive('ngEnter',ngEnter)
        .directive('ngSpace',ngSpace)
        .directive('clipBoardCopy',['$window',clipBoardCopy]);
    
    
    /*function checkScope(){  .directive('checkScope',checkScope)
    	return { 
			restrict : 'A',
			link : function(scope, element, attrs) {
				var certificateNo;
				var certificatIssueId;
				var certIssueDate;
				var certExpireDate;
				
				element.change("on", function (event) {
					
					if(scope.det.scopeId == 1001){
						 certificateNo=scope.det.auditDetail.certificateNo
						 certificatIssueId=scope.det.auditDetail.certIssueId;
						 certIssueDate=scope.det.auditDetail.certIssueDate;
						 certExpireDate=scope.det.auditDetail.certExpireDate;
						scope.det.auditDetail.certificateNo='';
						scope.det.auditDetail.certIssueId='';
						scope.det.auditDetail.certIssueDate='';
						scope.det.auditDetail.certExpireDate='';
					}else{
						scope.det.auditDetail.certificateNo=certificateNo;
						scope.det.auditDetail.certIssueId=certificatIssueId;
						scope.det.auditDetail.certIssueDate=certIssueDate;
						scope.det.auditDetail.certExpireDate=certExpireDate;
					}
					
				});
			}
    	
    	}
    }*/
    
    function clipBoardCopy($window){
    	return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				element.bind("click", function (event) {
				
				console.log(element);
				
					var body = angular.element($window.document.body);
					var input = angular.element('<input/>');
					input.css({
						position: 'fixed',
						opacity: '0'
					});
					
					//scope.$parent.$parent.det.btnColor = 'success';
					
					element.context.innerHTML = 'Copied';
					
					input.val(attrs.clipBoardCopy);
					body.append(input);
					input[0].select();

					try {
						var successful = document.execCommand('copy');
						if (!successful) throw successful;
					} catch (err) {
						window.prompt("Copy to clipboard: Ctrl+C, Enter", toCopy);
					}

				  input.remove();
					
				});
			}
    	
    	}
    }
    
    


        function ngEnter() {
        	return function (scope, element, attrs) {
        		element.bind("keydown keypress", function (event) {
        			if(event.which === 13) {
        				scope.$apply(function (){
        					scope.$eval(attrs.ngEnter);
        				});     
        				event.preventDefault();
        			}
        		});
        	};
        }
        
        
        
      
        function ngSpace() {
        	return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {
			
					element.on(
							"blur",
							function() {
								
								
								ngModelCtrl.$viewValue=ngModelCtrl.$viewValue.replace(/[\s]/g, '');
								ngModelCtrl.$render();
							});
				
				
				
			}
		};}

    function mobileAlign($parse, $timeout) {

		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {

				angular.element(element.context.parentNode).addClass(
						"phonealign");

				angular.element(element).addClass("phonelabelalign");

				angular.element(element.context.parentNode.nextElementSibling)
						.addClass("phonelabelalign");

				element
						.on(
								"focus",
								function() {

									if (angular
											.element(
													element.context.parentNode.nextElementSibling)
											.hasClass() != "labelfloat") {

										angular.element( element.context.parentNode.nextElementSibling).addClass('labelfloat');
										
										angular.element(element.context.parentNode.nextElementSibling)
										.removeClass("phonelabelalign");

									}

								})
						.on(
								"blur",
								function() {

									if (element.val()) {

										angular
												.element(
														element.context.parentNode.nextElementSibling)
												.addClass('labelfloat');
										
										angular.element(element.context.parentNode.nextElementSibling)
										.removeClass("phonelabelalign");

									} else {

										angular
												.element(
														element.context.parentNode.nextElementSibling)
												.removeClass('labelfloat');
										
										angular.element(element.context.parentNode.nextElementSibling)
										.addClass("phonelabelalign");

									}

								});
				$timeout(function() {

					if (element.context.value != "") {

						angular.element(
								element.context.parentNode.nextElementSibling)
								.addClass('labelfloat');

					} else {

						angular.element(
								element.context.parentNode.nextElementSibling)
								.removeClass('labelfloat');

					}

				}, 1000);

			}
		}
	}
    
    function resizable($timeout) {
    	return {
    		restrict: 'A',
    		scope: {
    			callback: '&onResize'
    		},
    		link: function postLink(scope, elem, attrs) {
    			$(elem).resizable();    			
    			angular.element(elem.context.parentNode).addClass("descripfixed");
    			angular.element(elem).addClass("descripresize");
    			elem.on("focus", function() {
					if(angular.element(elem.context.parentNode.nextSibling.nextSibling).hasClass() != "labelfloat"){
						angular.element(elem.context.parentNode.nextSibling.nextSibling).addClass('labelfloat');
					}
    			}).on("blur", function() {
    				if(elem.val()){
    					angular.element(elem.context.parentNode.nextSibling.nextSibling).addClass('labelfloat');
					}else{
						angular.element(elem.context.parentNode.nextSibling.nextSibling).removeClass('labelfloat');
					}
    			});
    			$timeout(function() {
    				if(elem.context.value != ""){
    					angular.element(elem.context.parentNode.nextSibling.nextSibling).addClass('labelfloat');
    				}else{
    					angular.element(elem.context.parentNode.nextSibling.nextSibling).removeClass('labelfloat');
    				}
    			}, 1000);
            }
    	}
    }
          
    function auditPlace($timeout){
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {
				function fromUser(text) {			
					
					if (text.length > attr.maxLen) {
						text = text.substr(0, attr.maxLen);
						ngModelCtrl.$setViewValue(text);
						ngModelCtrl.$render();
						element.attr('data-original-title', 'Only '+attr.maxLen+' characters');
						element.attr('data-placement', 'bottom');
						element.tooltip('show');
						$timeout(function() {
							element.removeAttr('data-original-title');
							element.removeAttr('data-placement', 'bottom');
							element.tooltip('hide');
						}, 1000);

					}

					return text;
				}
				ngModelCtrl.$parsers.push(fromUser);
			}
		};
    }
        
    function autoFocus(){
    	return {
    		restrict: 'A',
    		link: function(scope, element, attrs) {
    			element[0].focus();
    		}
    	}
    }
    
    function iframeAutoSize() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            element.on('load', function() {
	            	
	            	var fileUrl = element[0].contentDocument.URL;
	            	if(fileUrl.split('.').pop() == 'png' || fileUrl.split('.').pop() == 'jpg' || fileUrl.split('.').pop() == 'PNG' ){
	            		var iFrameHeight = element[0].contentWindow.document.body.scrollHeight ;
    	            	var iFrameWidth = element[0].contentWindow.document.body.scrollWidth ;
    	            	
    	            	element.css('width', iFrameWidth+30+'px');
    	            	element.css('height', iFrameHeight+30+'px');
    	            	
    	            	element.contents().find("body").css('vertical-align', 'middle');
    	            	element.contents().find("body").css('text-align', 'center');
    	            	element.contents().find("body").css('padding-top', '10px');
    	            	
    	            	element[0].parentNode.parentNode.parentNode.style.width = iFrameWidth+60+'px';
    	            	element[0].parentNode.parentNode.parentNode.style.height = iFrameHeight+150+'px';
    	            	
    	            	element[0].parentNode.parentNode.style.width = iFrameWidth+60+'px';
    	            	element[0].parentNode.parentNode.style.height = iFrameHeight+150+'px';
    	            	
    	            	element[0].parentNode.style.width = iFrameWidth+60+'px';
    	            	element[0].parentNode.style.height = iFrameHeight+60+'px';
    	            	    	            	
	            	}else{
	            		var iFrameHeight = element[0].contentWindow.document.body.scrollHeight ;
    	            	var iFrameWidth = element[0].contentWindow.document.body.scrollWidth ;
    	            	
    	            	element.css('width', '100%');
    	            	element.css('height', '100%');
	            		
    	            	$(".iFrameParentId").css("width", '90%');
    	            	$(".iFrameParentId").css("height", '90%');
    	            	
    	            	$(".iFrameModalContent").css("width", '100%');
    	            	$(".iFrameModalContent").css("height", '100%');
    	            	
    	            	$(".iFrameModalBody").css("width", '100%');
    	            	$(".iFrameModalBody").css("height", '83%');
	            	}
	            	
	            });
	        }
	    }
	};
   

	function auditCodeDir(){
    	return {
    		require: 'ngModel',
    		link: function (scope, element, attr,ngModelCtrl) {
    			
    			function fromUser(text) {
    			
    				if (text) {
    					var transformedInput = text.replace(/[^0-9.]/g, '');
    					var reg = /^\d+$/;    					
    					
    					if(isNaN(text)){
    						scope.inValid=true;                	                   	  
    					}
    				
    					if (transformedInput !== text) {    					
    						ngModelCtrl.$setViewValue(transformedInput);
    						ngModelCtrl.$render();
    					}
    					return transformedInput;
    				}
    				return undefined;
    			}  
    		
    			ngModelCtrl.$parsers.push(fromUser);
    		}    	
    	};
    }
    
    
    
	function plusNumeric($timeout) {
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {

				$(element).keypress(function() {
					$timeout(function() {
						element.tooltip('hide');
					}, 1000);
				});

				function fromUser(text) {

					if (text) {
						var transformedInput = text.replace(/[^0-9+]/g, '');
						var reg = /^\d+$/;
						if (reg.test(text)) {
							if (text.length > attr.maxLen) {
								transformedInput = (text.toString()).slice(0,
										-1);
								element.attr('data-original-title', 'Only '
										+ attr.maxLen + ' Digits');
								element.attr('data-placement', 'bottom');
								element.tooltip('show');
								$timeout(function() {
									element.removeAttr('data-original-title');
									element.tooltip('hide');
								}, 1000);
							}
						}
						var specilChars = /[^0-9+*]/g;
						if (specilChars.test(text)) {
							element.attr('data-original-title', 'Not Allowed');
							element.attr('data-placement', 'bottom');
							element.tooltip('show');
							$timeout(function() {
								element.removeAttr('data-original-title');
								element.tooltip('hide');
							}, 1000);
						}
						if (isNaN(text)) {
							scope.inValid = true;
						}

						if (transformedInput !== text) {
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return undefined;
				}

				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	};
    
	function float($parse,$timeout) {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
								
				scope.$watch(attrs.ngModel, function(newValue, oldValue) {
				
					if (newValue != undefined) { 
		            	
						element[0].focus();
		            	  
		              }
		             
		          });
						          
				element.on("focus", function() {
					 
					if(element.hasClass() != "changed"){
						
						element.addClass('changed');
					}
					
				}).on("blur", function() {
					 
					if(element.val()){
						
						element.addClass('changed');
						
					}else{
						 
						element.removeClass('changed');
						
					}
					
				});
								
				$timeout(function() {
				
					if(element.val()){
						
						element.addClass('changed');
						
					}else{
						
						element.removeClass('changed');
						
					}
				}, 0);
			}
		}
	};

	function fileUpload($parse) {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				element.bind('change', function() {
					ngModelCtrl.$setViewValue(element[0].files[0]);
					ngModelCtrl.$render();					
				});
			}
		};
	}
	function fileRead(toaster) {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				element.on("change", function(event) {
					 
					// var openFile = function(event) {
					 var input = event.target;
				// var extn = input.files[0].name.split(".").pop();
					// var fileName =input.files[0].name.split('.')[0].length;
					var totalLength=input.files[0].name.length;
					var count = input.files[0].name.lastIndexOf(".");
		    		var extn = input.files[0].name.slice(count+1,totalLength);
					var fileName =input.files[0].name.slice(0,count);
					if(fileName.length<36 && (extn=="jpg" || extn=="gif" || extn=="jpeg" || extn=="jfif" || extn=="JPG" || extn=="GIF" || extn=="JPEG" || extn=="JFIF" || extn =="png" || extn=="PNG" )){
						 toaster.clear();
					    var reader = new FileReader();
					   
					    reader.onload = function(){
					      var dataURL = reader.result;
					     
					      var output = document.getElementsByClassName('output signatureImage');
					      var data = dataURL.replace(
									/^data:image\/\w+;base64,/, "");
					     scope.$apply(function () {
					    	  scope.signatureImage = data;
		                    });
					     
					    };
					    reader.readAsDataURL(input.files[0]);
						  
					}
					else
						{
						toaster.warning('Please upload image file (FileName should not be longer than 35 characters)');
						}
					
					
				});
			}
		};
	}
	
	function fileReadPho(toaster,$rootScope) {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				$rootScope.fileUploadValue=true;
				element.on("change", function(event) {
					
					// var openFile = function(event) {
					 var input = event.target;
				 var totalLength=input.files[0].name.length;
						var count = input.files[0].name.lastIndexOf(".");
			    		var extn = input.files[0].name.slice(count+1,totalLength);
						var fileName =input.files[0].name.slice(0,count);
					if(fileName.length<36 && (extn=="jpg" || extn=="gif" || extn=="jpeg" || extn=="jfif" || extn=="JPG" || extn=="GIF" || extn=="JPEG" || extn=="JFIF" || extn =="png" || extn=="PNG" )){
						 toaster.clear();
						var reader = new FileReader();
					   
					    reader.onload = function(){
					      var dataURL = reader.result;
					     
					      var output = document.getElementsByClassName('output photoImage');
					      var data = dataURL.replace(
									/^data:image\/\w+;base64,/, "");
					      scope.$apply(function () {
		                        scope.photoImage = data;
		                        scope.config.closeIcon = true;
		                    });
					    
					    };
					    reader.readAsDataURL(input.files[0]);
					    $rootScope.fileUploadValue=true;
						   // console.log(reader.readAsArrayBuffer(input.files[0]));
						    
						 // };
				}
				else
					{
					$rootScope.fileUploadValue=false;
					toaster.warning('Please upload image file (FileName should not be longer than 35 characters)');
					}
					
				});
			}
		};
	}
	function Numeric($timeout) {
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {

				$(element).keypress(function() {
					$timeout(function() {
						element.tooltip('hide');
					}, 1000);
				});

				function fromUser(text) {

					if (text) {
						var transformedInput = text.replace(/[^0-9*]/g, '');
						var reg = /^\d+$/;
						if (reg.test(text)) {
							if (text.length > attr.maxLen) {
								transformedInput = (text.toString()).slice(0,
										-1);
								element.attr('data-original-title', 'Only '
										+ attr.maxLen + ' Digits');
								element.attr('data-placement', 'bottom');
								element.tooltip('show');
								$timeout(function() {
									element.removeAttr('data-original-title');
									element.tooltip('hide');
								}, 1000);
							}
						}
						/*var specilChars = /[^0-9*]/g;
						if (specilChars.test(text)) {
							element.attr('data-original-title', 'Not Allowed');
							element.attr('data-placement', 'bottom');
							element.tooltip('show');
							$timeout(function() {
								element.removeAttr('data-original-title');
								element.tooltip('hide');
							}, 1000);
						}*/
						if (isNaN(text)) {
							console.log(text);
							scope.inValid = true;
						}

						if (transformedInput !== text) {
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return undefined;
				}

				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	};
	
	function charSpaceDotOnly($timeout){
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {

				$(element).keypress(function() {
					$timeout(function() {
						element.tooltip('hide');
					}, 1000);
				});

				function fromUser(text){

					if (text){
						var transformedInput = text.replace(/[^a-zA-Z. ]/g,'');
						
							if (text.length > attr.maxLen) {
								
								transformedInput = (text.toString()).slice(0,-1);
								
								element.attr('data-original-title', 'Only '+ attr.maxLen + ' character');
								
								element.attr('data-placement', 'bottom');
								
								element.tooltip('show');
								
								$timeout(function() {
									element.removeAttr('data-original-title');
									element.tooltip('hide');
								}, 1000);
							}

						if (transformedInput !== text) {
							
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return undefined;
				}

				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	};
	
	function integer($timeout){
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {

				$(element).keypress(function() {
					$timeout(function() {
						element.tooltip('hide');
					}, 1000);
				});

				function fromUser(text){

					if (text){
						var transformedInput = (text.replace(/[^0-9]/g,'')).replace(/ /g,'');
						    
							if (transformedInput.length > attr.maxLen) {
								
								transformedInput = (text.toString()).slice(0,-1);
								
								element.attr('data-original-title', 'Only '+ attr.maxLen + ' digit');
								
								element.attr('data-placement', 'bottom');
								
								element.tooltip('show');
								
								$timeout(function() {
									element.removeAttr('data-original-title');
									element.tooltip('hide');
								}, 1000);
							}

						if (transformedInput !== text) {
							
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return undefined;
				}
				
				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	};
	
	
	
	function customTooltip($compile, $timeout) {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				var flag = true;
				element.on('keydown', function(event) {
					$timeout(function(){
						if (event.keyCode == 8) {
							element.removeAttr('data-original-title');
							element.tooltip('hide');
						}
					},0);					
				});

				
				element.on('blur', function(event) {
					
				if(element[0].value.length <= 2){
					
					element[0].value = "";
				}
					
				});
				
				function userText(text) {
					
					if (text && text.length>2) {
						
						$timeout(function(){
						
							if (String(attrs.customTooltip) == 'true'
								|| String(attrs.customTooltip).toUpperCase() == 'true') {
							element.attr('data-original-title', 'No Results');
							element.attr('data-placement', 'bottom');
							element.tooltip('show');
							$timeout(function() {
								element.removeAttr('data-original-title');
								element.tooltip('hide');
							}, 1000);

						}
							
						},0)

						if (isNaN(text)) {
							scope.inValid = true;
						}

						if (text) {
							ngModelCtrl.$setViewValue(text);
							ngModelCtrl.$render();
						}
						return text;
					}
					return undefined;

				}
				
				

				ngModelCtrl.$parsers.push(userText);

			}
		};
	}

	function alphaNumeric() {
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {

				function fromUser(text) {

					if (text) {
						var transformedInput = text.replace(
								/[^a-zA-Z*0-9@$ ]/g, '');
						var reg = /^\d+$/;

						if (isNaN(text)) {
							scope.inValid = true;
						}

						if (transformedInput !== text) {
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
						}
						return transformedInput;
					}
					return undefined;
				}

				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	}
	
	function maximumLength($timeout) {

		return {
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {

				function inputValue(val) {
					var digits = val;
					var maxlength = Number(attrs.maxLen);
					element.on('keydown', function(event) {
						if (event.keyCode == 8) {
							element.removeAttr('data-original-title');
							element.removeAttr('data-placement', 'bottom');
							element.tooltip('hide');
						}
					});

					if (digits.length > maxlength) {

						digits = digits.substr(0, maxlength);
						ngModelCtrl.$setViewValue(digits);
						ngModelCtrl.$render();
						element.attr('data-original-title', 'Max ' + maxlength
								);
						element.attr('data-placement', 'bottom');
						element.tooltip('show');
						$timeout(function() {
							element.removeAttr('data-original-title');
							element.tooltip('hide');
						}, 1000);

					}

					return digits;
				}
				ngModelCtrl.$parsers.push(inputValue);

			}
		};
	}

	function numDecimal($timeout) {

		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {

				function fromUser(text) {

					if (text) {
						var transformedInput = text.replace(/[^0-9*.]/g, '');
						var reg = /^\d+$/;
						if (reg.test(text)) {
							if (text.length > attr.maxLen) {
								transformedInput = (text.toString()).slice(0,
										-1);
								element.attr('data-original-title', 'Only '
										+ attr.maxLen + ' Digits');
								element.attr('data-placement', 'bottom');
								element.tooltip('show');
								$timeout(function() {
									element.removeAttr('data-original-title');
									element.tooltip('hide');
								}, 1000);
							}
						}
						if (isNaN(text)) {
							scope.inValid = true;
						}

						if (transformedInput !== text) {
							ngModelCtrl.$setViewValue(transformedInput);
							ngModelCtrl.$render();
							element.attr('data-original-title', 'Not Allowed ');
							element.attr('data-placement', 'bottom');
							element.tooltip('show');
							$timeout(function() {
								element.removeAttr('data-original-title');
								element.tooltip('hide');
							}, 1000);
						}
						return transformedInput;
					}
					return undefined;
				}

				ngModelCtrl.$parsers.push(fromUser);
			}
		};

	}

	
	
	
	
	function letterSpcl($timeout) {
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {
				function fromUser(text) {
					var transformedInput = text.replace(/[^0-9A-Za-z" "!@/#$%^&*()_-]/g, '');
					var maxlength = Number(attr.maxLen);

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();

						element.attr('data-original-title', 'Not Allowed ');
						element.attr('data-placement', 'bottom');
						element.tooltip('show');
						$timeout(function() {
							element.removeAttr('data-original-title');
							element.tooltip('hide');
						}, 1000);

					}
					if (transformedInput.length > maxlength) {
						transformedInput = transformedInput
								.substr(0, maxlength);
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
						element.attr('data-original-title', 'Only ' + maxlength
								+ ' Letters');
						element.attr('data-placement', 'bottom');
						element.tooltip('show');
						$timeout(function() {
							element.removeAttr('data-original-title');
							element.removeAttr('data-placement', 'bottom');
							element.tooltip('hide');
						}, 1000);

					}

					return transformedInput;
				}
				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	}
	
	function lettersInput($timeout) {
		return {
			require : 'ngModel',
			link : function(scope, element, attr, ngModelCtrl) {
				function fromUser(text) {
					var transformedInput = text.replace(/[^a-zA-Z" "]/g, '');
					var maxlength = Number(attr.maxLen);

					if (transformedInput !== text) {
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();

						element.attr('data-original-title', 'Not Allowed ');
						element.attr('data-placement', 'bottom');
						element.tooltip('show');
						$timeout(function() {
							element.removeAttr('data-original-title');
							element.tooltip('hide');
						}, 1000);

					}
					if (transformedInput.length > maxlength) {
						transformedInput = transformedInput
								.substr(0, maxlength);
						ngModelCtrl.$setViewValue(transformedInput);
						ngModelCtrl.$render();
						element.attr('data-original-title', 'Only ' + maxlength
								+ ' Letters');
						element.attr('data-placement', 'bottom');
						element.tooltip('show');
						$timeout(function() {
							element.removeAttr('data-original-title');
							element.removeAttr('data-placement', 'bottom');
							element.tooltip('hide');
						}, 1000);

					}

					return transformedInput;
				}
				ngModelCtrl.$parsers.push(fromUser);
			}
		};
	}

	function fileMod($parse) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}

	function spclCharac() {
		return {
			require : 'ngModel',
			link : function(scope, element, attrs, ngmodelCtrl) {

				ngmodelCtrl.$parsers.push(function(inputValue) {
					var transformedInput = inputValue ? inputValue.replace(
							/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
							: null;

					if (transformedInput != inputValue) {
						ngmodelCtrl.$setViewValue(transformedInput);
						ngmodelCtrl.$render();
					}

					return transformedInput;
				});
			}
		};
	}
	
	function datetimepicker(){    
    	return {
    		restrict: 'A',
    		require: 'ngModel',
    		scope : {
    			minDate : '=',
    			maxDate : '='
    		},
    		link : function (scope, element, attrs,ngModelCtrl) { 
    			$(element).datetimepicker({
    				use24hours: false,
    				startDate:scope.minDate?scope.minDate:moment('','DD-MMM-YYYY HH:mm'),
    	    		endDate:scope.maxDate?scope.maxDate:moment('','DD-MMM-YYYY HH:mm'),
    				format: 'DD-MMM-YYYY HH:mm',
    				onSelect: function(dateText){ 
    					scope[ngModelCtrl] = dateText;
    					scope.$apply();
    				}
    			});
    			
    			$(element).on('click', function(event) { 
    				$(element).data('DateTimePicker').setStartDate(scope.minDate);	
    				$(element).data('DateTimePicker').setEndDate(scope.maxDate);
	        	});
    		}
    	};
    }

	function datepicker(){
		return {
			restrict : 'A',
			require : 'ngModel',
			scope : {
				minDate : '=',
				maxDate : '='
			},
			link : function(scope, element, attrs, ngModelCtrl) {
				$(element).datetimepicker({
					startDate : scope.minDate?scope.minDate : moment('','DD-MMM-YYYY'),
					endDate : scope.maxDate?scope.maxDate : moment('','DD-MMM-YYYY'),
					pickTime : false,
					use24hours : false,
					format : 'DD-MMM-YYYY',
					onSelect : function(dateText) {
						scope[ngModelCtrl] = dateText;
						scope.$apply();
					}
				});
				$(element).on('click',function(event){
					$(element).data('DateTimePicker').setStartDate(scope.minDate);
					$(element).data('DateTimePicker').setEndDate(scope.maxDate);
				});
			}
		};
	}

	function tooltip() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				$(element).hover(function() {
					// on mouseenter
					$(element).tooltip('show');
				}, function() {
					// on mouseleave
					$(element).tooltip('hide');
				});
			}
		};
	}

	function idatepicker() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs, ngModelCtrl) {

				$(element).datetimepicker({
					pickTime : false,
					use24hours : false,
					format : 'DD-MMM-YYYY'
				})
			}
		};
	}

	// Added by Prem for fileChooser
	function fileModel($parse, $rootScope, $http) {
		return {
			restrict : 'A',
			link : function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				var reader = new FileReader();
				element.bind('change', function() {
					scope.$apply(function() {
						var file = element[0].files[0];
						modelSetter(scope, element[0].files[0]);
						reader.onload = function(evt) {
							scope.$apply(function(scope) {
								scope.chosenImage = evt.target.result;

							});
						};
						reader.readAsBinaryString(file);
					});
				});
			}
		};
	}

	// Route State Load Spinner(used on page or content load)
	function ngSpinnerBar($rootScope, $state) {
		return {
			link : function(scope, element, attrs) {
				// by defult hide the spinner bar
				element.addClass('hide'); // hide spinner bar by default

				// display the spinner bar whenever the route changes(the
				// content part started loading)
				
				$rootScope.$on('$stateChangeStart', function() {
					//$rootScope.$broadcast('navigate');
					
					element.removeClass('hide'); // show spinner bar
				});

				// hide the spinner bar on rounte change success(after the
				// content loaded)
				$rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
					
					$rootScope.prevstate=from;
					
					element.addClass('hide'); // hide spinner bar
					$('body').removeClass('page-on-load'); // remove page
					// loading indicator
					/*
					 * Layout.setAngularJsSidebarMenuActiveLink('match', null,
					 * event.currentScope.$state); // activate selected link in
					 * the sidebar menu
					 */
					// auto scorll to page top
					setTimeout(function() {
						App.scrollTop(); // scroll to the top on content load
					}/* , $rootScope.settings.layout.pageAutoScrollOnLoad */);
				});

				// handle errors
				$rootScope.$on('$stateNotFound', function() {
					element.addClass('hide'); // hide spinner bar
				});

				// handle errors
				$rootScope.$on('$stateChangeError', function() {
					element.addClass('hide'); // hide spinner bar
				});
			}
		};
	}	

	// Handle Dropdown Hover Plugin Integration
	function dropdownMenuHover() {
		return {
			link : function(scope, elem) {
				elem.dropdownHover();
			}
		};
	}
	function datePicker() {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				$(element).datetimepicker({
					pickTime : false,
					use24hours : false,
					format : 'DD-MMM-YYYY'
				})
			}
		};

	}
	function trailZeroFn() {
		return {
			restrict : 'A',
			require : 'ngModel',
			link : function(scope, element, attrs, ngModelCtrl) {
				element
						.on(
								'blur',
								function(e) {
									e.preventDefault();
									var res = element[0].value.split(".");
									if (res[0]) {
										res[0] = Number(res[0]) ? Number(res[0])
												: "";
									}
									if (res[1]) {
										res[1] = Number(res[1]) ? ("." + res[1])
												: "";
									}
									var transformedInput = Number(res[0]
											+ res[1]) ? Number(res[0] + res[1])
											: (Number(res) ? Number(res) : "");
									ngModelCtrl.$setViewValue(transformedInput);
									ngModelCtrl.$render();
								});
			}
		};
	};

	function ngOnlyNumberFn() {
		return {
			restrict : "AE",
			link : function(scope, elem, attr) {

				if (!$(elem).attr("min")) {
					$(elem).attr("min", 0);
				}
				function toIncreaseMaxLengthBy(elem) {
					var maxDecimalPoints = elem.data('maxDecimalPoints');
					return (1 + maxDecimalPoints);
				}
				var el = $(elem)[0];
				el.initMaxLength = elem.data('maxLength');
				el.maxDecimalPoints = elem.data('maxDecimalPoints');
				var checkPositive = function(elem, ev) {
					try {

						// return checkPositive(elem, event);

						var el = $(elem)[0];
						if (el.value.indexOf('.') > -1) {
							if (ev.charCode >= 48 && ev.charCode <= 57) {
								if (el.value.indexOf('.') == el.value.length
										- toIncreaseMaxLengthBy(elem)) {
									if (el.selectionStart > el.value
											.indexOf('.')) {

										return false;
									} else {
										if (el.value.length == elem
												.data('maxLength')) {

											return false;
										} else {

											return true;
										}
									}
								} else {
									if (el.selectionStart <= el.value
											.indexOf('.')) {
										if (el.value.indexOf('.') == toIncreaseMaxLengthBy(elem)) {

											return false;
										}
									}
								}
							}
						} else {
							if (el.value.length == elem.data('maxLength')) {
								if (ev.charCode == 46) {
									if (typeof el.maxDecimalPoints === 'undefined') {

										return true;
									} else {
										if (el.selectionStart < el.value.length
												- el.maxDecimalPoints) {

											return false;
										}
										;
									}
									elem.data('maxLength', el.initMaxLength
											+ toIncreaseMaxLengthBy(elem));
									return true;
								} else if (ev.charCode >= 48
										&& ev.charCode <= 57) {

									elem.attr('data-original-title',
											'No Results');
									elem.attr('data-placement', 'bottom');
									elem.tooltip('show');

									return false;
								}
							}
							if (ev.charCode == 46) {
								if (el.selectionStart < el.value.length
										- elem.data('maxDecimalPoints')) {
									return false;
								} else {
									return true;
								}
							}
						}
						if (ev.charCode == 46) {
							if (el.value.indexOf('.') > -1) {
								return false;
							} else {
								return true;
							}
						}
						if ((ev.charCode < 48 || ev.charCode > 57)
								&& ev.charCode != 0) {
							return false;
						}
					} catch (err) {
					}
				}
				var change_maxlength = function(elem, ev) {
					try {
						var el = $(elem)[0];
						if (el.value.indexOf('.') > -1) {
							elem.data('maxLength', el.initMaxLength
									+ toIncreaseMaxLengthBy(elem));
						} else {
							if (elem.data('maxLength') == el.initMaxLength
									+ toIncreaseMaxLengthBy(elem)) {
								var dot_pos_past = el.selectionStart;
								el.value = el.value.substring(0, dot_pos_past);
							}
							elem.data('maxLength', el.initMaxLength);
						}
					} catch (err) {
					}
				}
				$(elem).on("keypress", function() {

					return checkPositive(elem, event);
				})
				$(elem).on("input", function() {

					return change_maxlength(elem, event);
				})
			}
		}
	};
	
})();
