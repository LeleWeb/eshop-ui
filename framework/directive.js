define(["ui-router","swiper","amaze"],function(router,Swiper,zmaze){
	var mod = angular.module("ui.router");
		// escape physic backbutton bug
		// var shopInc = new shopList($q);
	// date format
	Date.prototype.Format = function (fmt) { 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	mod.filter("DateFormat", function() {
		var filterfun = function(str) {
			if(!str)return str;
			return new Date(str).Format("yyyy-MM-dd hh:mm:ss");
		};
		return filterfun;
	});
	function newGuid(){
	    var guid = "";
	    for (var i = 1; i <= 32; i++){
	      var n = Math.floor(Math.random()*16.0).toString(16);
	      guid +=   n;
	      if((i==8)||(i==12)||(i==16)||(i==20))
	        guid += "-";
	    }
	    return guid;    
	}


	mod.directive("amModalPlug",function(){
		return {
			restrict:"ECA",
			templateUrl:"framework/template/modal.html",
			scope:{
				options:"="
			},
			link:function(scope,element,attr){
				// scope.title = options.title;
				// scope.content = options.content;
				scope._id = newGuid();
				var id = "#" + scope._id;
				scope.options.showDialog = function(){

					$(id).modal({closeViaDimmer:false},"open")
				}
				scope.options.hideDialog = function(){
					$(id).modal("close")
				}
				scope.options.showDialogdwhite = function(){

					$(id).modal({"dimmer":false},"open")
				}
			}
		}
	});

	mod.directive("amSwiperPlug",["$state",function($state){
		return {
			restrict:"ECA",
			templateUrl:"framework/template/swiper.html",
			scope:{
				options:"=",
				type:"="
			},
			link:function(scope,element,attr){
				scope.picArry = [];
				var swiper = undefined;
			
				scope.swiperService = "http://www.dangxiaweb.com"
				scope.stateGoto = function(index){
					$state.go("advert",{index:index});
				}

				scope.$watchCollection("options",function(newone,oldone){
					
				
					scope.picArry = [];
					if (typeof swiper == "object") {
						// console.log("delete.....")
						swiper.destroy();
					};
					scope.picArry = newone;
					setTimeout(function(){
						
					if (typeof newone != "undefined" && newone.length) {
						swiper = new Swiper(".swiper-container", {
							    // nextButton: '.swiper-button-next',
						        // prevButton: '.swiper-button-prev',
						        pagination: '.swiper-pagination',
						        // paginationClickable: true,
						        // Disable preloading of all images
						        // preloadImages: false,
						        // Enable lazy loading
						        lazyLoading: true,
								loop : true,
								autoplay: 3000,
								autoplayDisableOnInteraction : false,
				      		});
						// console.log(swiper)
					};
					},0);
					
										
				},true);
			}
		}
	}]);
	
	



	mod.directive("amCounts",function(){
		return {
			restrict:"ECA",
			scope:{
				production:"="
			},
			link:function(scope,element,attr){
				var parent = scope.$parent;
				scope.production.status = "done"
				scope.production.productEdit = true;
				var initNum = scope.production.amount;
				scope.production.edit = function(){
					if (initNum != scope.production.amount) {
						parent.changebagListNum(scope.production.amount,scope.production.price.real_price,scope.production.id,initNum).then(function(data){
						},function(err){
							scope.production.amount = initNum;
							alert("编辑失败，请重新操作！");
							parent.getAllPrice();
							console.log(err);
						})
						
					};
				
				}

				scope.production.increase = function(){
					scope.production.amount++;
					scope.production.edit();
				}
				scope.production.reduce = function(){
					
					if (scope.production.amount == 1) {

					}else{
						scope.production.amount--;
						scope.production.edit();
					};
				}
				scope.production.changStatus = function(){
					if (scope.production.status == "pending") {
						scope.production.status = "done";
					}else{
						scope.production.status = "pending";
					};
				}
			}
		}
	});

	mod.directive("amStrickyDtv",function(){
		return {
			restrict:"ECA",
			scope:{
				num:"="
			},
			link:function(scope,element,attr){
				$(element[0]).sticky({
					top: scope.num || 0,
					animation:"slide-top"
				})

			}
		}
	});

	mod.directive("amShow",function(){
		return {
			restrict:"EAC",
			link:function(scope,element,attr){
				$(element[0]).css('visibility','hidden'); 
				setTimeout(function(){
					$(element[0]).css('visibility','visible'); 
				},1800);
			}
		}
	});


	mod.directive('lazySrc', ['$window', '$document','$timeout','$interval', function($window, $document,$timeout,$interval){
	    var doc = $document[0],
	        body = doc.body,
	        win = $window,
	        $win = angular.element(win),
	        uid = 0,
	        elements = {};

	    function getUid(el){
	        return el.__uid || (el.__uid = '' + ++uid);
	    }

	    function getWindowOffset(){
	        var t,
	            pageXOffset = (typeof win.pageXOffset == 'number') ? win.pageXOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollLeft == 'number' ? t : body).ScrollLeft,
	            pageYOffset = (typeof win.pageYOffset == 'number') ? win.pageYOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollTop == 'number' ? t : body).ScrollTop;
	        return {
	            offsetX: pageXOffset,
	            offsetY: pageYOffset
	        };
	    }

	    function isVisible(iElement){
	        var elem = iElement[0],
	            elemRect = elem.getBoundingClientRect(),
	            windowOffset = getWindowOffset(),
	            winOffsetX = windowOffset.offsetX,
	            winOffsetY = windowOffset.offsetY,
	            elemWidth = elemRect.width,
	            elemHeight = elemRect.height,
	            elemOffsetX = elemRect.left + winOffsetX,
	            elemOffsetY = elemRect.top + winOffsetY,
	            viewWidth = Math.max(doc.documentElement.clientWidth, win.innerWidth || 0),
	            viewHeight = Math.max(doc.documentElement.clientHeight, win.innerHeight || 0),
	            xVisible,
	            yVisible;
			
	        if(elemOffsetY <= winOffsetY){
	            if(elemOffsetY + elemHeight >= winOffsetY){
	                yVisible = true;
	            }
	        }else if(elemOffsetY >= winOffsetY){
	            if(elemOffsetY <= winOffsetY + viewHeight){
	                yVisible = true;
	            }
	        }

	        if(elemOffsetX <= winOffsetX){
	            if(elemOffsetX + elemWidth >= winOffsetX){
	                xVisible = true;
	            }
	        }else if(elemOffsetX >= winOffsetX){
	            if(elemOffsetX <= winOffsetX + viewWidth){
	                xVisible = true;
	            }
	        }
			
			//console.log(iElement.attr('alt') + ":" + iElement.parent().parent().parent().parent().css('display'));
			//picture is visible and the attribute is block can be true visible(only in our project)
	        return xVisible && yVisible && (iElement.parent().parent().parent().parent().css('display') == 'block');
	    };

	    function checkImage(){
			Object.keys(elements).forEach(function(key){
	            var obj = elements[key],
	                iElement = obj.iElement,
	                $scope = obj.$scope;
	            if(isVisible(iElement)){
	                iElement.attr('src', $scope.lazySrc);
	                // $('.container-gallery').masonry();
	            }
	        });
	    }

	    $win.bind('scroll', checkImage);
	    $win.bind('resize', checkImage);
	    function onLoad(){
	        var $el = angular.element(this),
	            uid = getUid($el);

	        $el.css('opacity', 1);

	        if(elements.hasOwnProperty(uid)){
	            delete elements[uid];
	        }
	    }

	    return {
	        restrict: 'A',
	        scope: {
	            lazySrc: '@'
	        },
	        link: function($scope, iElement,attr){
	            iElement.bind('mouseup', function () {
	                if("goTop"==iElement.attr('id')){
	                    $win.unbind('scroll', checkImage);
	                    $interval(function () {
	                        if(document.body.scrollTop == 0){
	                            $win.bind('scroll', checkImage);
	                            //console.log("true")
	                        }
	                    },200,10);
	                }
	            });
	            iElement.bind('load', onLoad);

	            $scope.$watch('lazySrc', function(){
	                //alert(iElement.parent().parent().parent().parent().attr('ng-show'));
	                if(isVisible(iElement)){
	                    iElement.attr('src', $scope.lazySrc);
	                }else{
	                    var uid = getUid(iElement);
	                    iElement.css({
	                        'background-color': '#fff',
	                        'opacity': 0,
	                        '-webkit-transition': 'opacity 1s',
	                        'transition': 'opacity 1s'
	                    });
	                    elements[uid] = {
	                        iElement: iElement,
	                        $scope: $scope
	                    };
	                }
	            });
	            $scope.$on('$destroy', function(){
	                iElement.unbind('load');
	            });
	        }
	    };
	}]);



	// mod.directive("amSwiperPlug",function(){
	// 	// restrict:"ECA",
	// 	// // templateUrl:"/framework/template/swiper.html",
	// 	// link:function(scope,element,attr){
	// 	// }
	// });
	// mod.directive("amIscroll",function(){
	// 	return {
	// 		restrict:"ECA",
	// 		link:function(scope,element,attr){
	// 			// myScroll = new IScroll('#wrapper', { scrollX: true, freeScroll: true });
	// 			myScroll = new IScroll(element[0], { scrollX: true, 
	// 				freeScroll: true,
	// 				bounce:true,
	// 				freeScroll:true,
	// 				 });

	// 		}
	// 	}
	// });
	

	// router.directive("btDialog",function(){
	// 	var config = {
	// 		restrict:"E",
	// 		transclude: true,
	// 		scope:{
	// 			options:"="
	// 		},
	// 		templateUrl:"/framework/template/dialog.html",
	// 		link:function(scope,element,attr){
				
	// 			scope._id = newGuid();
	// 			var id = "#" + scope._id;
	// 			scope.showDialog = function(){
	// 				$(id).modal("show")
	// 			}

	// 			scope.$watch("options",function(newValue,oldValue){
	// 				scope._title = newValue.titleName || '';
	// 				scope._btnSave = newValue.btnSaveName || "save";
	// 				scope._cancel = newValue.btnCancel || "";
	// 				scope._btnShowName = newValue.butShowName || "modal";
	// 				scope._displayNoBtn = newValue.displayNoBtn || "";
	// 				if (scope._displayNoBtn) {
	// 					$(id).modal("show");
	// 				};

	// 				$(id).on("show.bs.modal",function(){
	// 					if (typeof newValue.beforeShow == "function") {
	// 						newValue.beforeShow();
	// 					};
	// 				});
	// 				scope.save = function(){
	// 					if (newValue.afterShow && typeof newValue.afterShow == "function") {
	// 						newValue.afterShow();
	// 						$(id).modal("hide");
	// 					};
	// 				}

	// 			},true);
	// 		}
	// 	}
	// });
	return mod;
});