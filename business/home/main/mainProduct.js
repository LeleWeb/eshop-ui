define(["amaze",
		"framework/services/homeService",
		"framework/services/productService",
		"framework/services/shoppingService"],function (amaze,homePage,pdt,shopList){
	var ctrl = ["$scope","$state","$stateParams","$http","$q","$rootScope","$interval",function($scope,$state, $stateParams,$http,$q,$rootScope,$interval){
		var homePageIns = new homePage($q);
		var pdtIns = new pdt($q);
		var shopInc = new shopList($q);

		$scope.modalObj = {
			content:"",
		}
		$scope.modalObjSuc = {
			content:"已添加至购物车",
		}
		$scope.modalObjErr = {
			content:"添加失败，请重新操作！",
		}
		$scope.modalObjErrComp = {
			content:"没有合适的推荐,请重新输入人数和金额,点击推荐！",
		};

		$scope.addTobagData = {
			data:$scope.dataList,
			headers:$scope.users.setheaders
		};

		$scope.slideFruitData =  [];
		$scope.gotoProductDetail = function(statusNum){

			$scope.stateGoto(statusNum);
		}

		$scope.scrollTo = function(number){
			$("body").animate({scrollTop: $("#products_"+number).position().top}, 2000);
		}

		$scope.searchProducts = function(keyword){
			alert(keyword);
		};

		$scope.addToBag = function(product){
			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}
			// add function
			$scope.modalObj.showDialog();

			pdtIns.getDataforHome(product.id).then(function(data){
				$(".loading").hide();
				var productDetails = data.data;

				//顶部轮播图片
				$scope.slideFruitData = productDetails.pictures[1];
				// 2017.03.28 添加果切分类商品，除团队套餐外，其他都显示价格。
				if(productDetails.category_id != 3){
					var prices=productDetails.prices;
					var index=0;
					for(var i in prices){
						if(prices[i].is_default){
							index=i;
						}
					}
					var defaultprice=prices[index];
					var temp=prices[0];
					prices[0]=defaultprice;
					prices[index]=temp;
					prices[0].is_default=true;
					$scope.price_select=prices[0];
					productDetails.number=1;
				}else if(productDetails.category_id===3){

					productDetails.number=10;
					productDetails.money=100;
					productDetails.plans=[];
				}else{
					console.log("error invalid product detail category!");
					alert("我们出现了一些错误");
				};

				if(productDetails.property===3){

					if(productDetails.group_buying&&productDetails.group_buying.end_time){
						var end_time= new Date(productDetails.group_buying.end_time);
						var now = new Date();
						var timeLimits=end_time-now;
						if(timeLimits<0){
							productDetails.group_buying.end_day=0;
						}else{
							productDetails.group_buying.end_day=Math.ceil(timeLimits/(1000*60*60*24));
						}
					}
				}

				$scope.productDetails=productDetails;

				if($scope.productDetails.category_id===3){
					if($scope.productDetails.plans.length<=0){
						$scope.modalObjErrComp.showDialogdwhite()
						setTimeout(function(){
							$scope.modalObjErrComp.hideDialog();
						},1000)
						return;
					}
					var computesPlan=$scope.productDetails.plans[$scope.productDetails.planIndex];

					var plans=computesPlan.plans;

					for(var i=0;i<plans.length;i++){
						var plan=plans[i];
						var subitem={
							"product_id": plan.product_id,
							"price_id": plan.price_id,
							"amount": plan.amount,
							"total_price": plan.total_price,
							"owner_id": $scope.users.owner_id,
							"owner_type": "Customer",
							"remark": "xxx",
							"property": 0
						};
						if(i==0){
							var cart=subitem;
							cart.subitems=[];
						}else{
							cart.subitems.push(subitem);
						}
					}
				}else{
					var cart={
						"product_id": $scope.productDetails.id,
						"price_id": $scope.price_select.id,
						"amount": $scope.productDetails.number,
						"total_price": $scope.productDetails.number*$scope.price_select.real_price,
						"owner_id": $scope.users.owner_id,
						"owner_type": "Customer",
						"remark": "xxx",
						"property": 0
					}
				}

				pdtIns.addTobagList($scope.addTobagData,{cart: cart}).then(function(data){
					// code = -1  auth failed
					// alert(JSON.stringify(data));
					$scope.modalObj.hideDialog();
					$scope.modalObjSuc.showDialogdwhite();
					setTimeout(function(){
						$scope.modalObjSuc.hideDialog();
					},500)

					// 购物车总数自增
					$rootScope.shopListNum.num++;

					// 用新建的购物车项对象，刷新商品的购物车属性。
					product.shopping_cart = data.data
				},function(err){
					$scope.modalObj.hideDialog();
					$scope.modalObjErr.showDialogdwhite()
					setTimeout(function(){
						$scope.modalObjErr.hideDialog();
					},1000)
				})
			},function(err){
				console.log("error....");
			});
		};

		$scope.reduceAmount = function(price, shopping_cart){
			if(shopping_cart.amount > 1){
				amount = shopping_cart.amount - 1;

				// 调用服务端接口，修改购物车商品数量
				pdtIns.updateShoppingCartAccount($scope.addTobagData,
												 shopping_cart.id,
												 {cart: { amount: amount, total_price: price*amount}}).then(function(data){
					// 用新建的购物车项对象，刷新商品的购物车属性。
					var cart = data.data;
					shopping_cart.amount = cart.amount;
					shopping_cart.total_price = cart.total_price;
				},function(err){
					$scope.modalObj.hideDialog();
					$scope.modalObjErr.showDialogdwhite()
					setTimeout(function(){
						$scope.modalObjErr.hideDialog();
					},1000)
				});
			}else{
				$scope.deleteProductCart(shopping_cart.id);
				shopping_cart.amount = 0;
			}

			if($rootScope.shopListNum.num > 0){
				$rootScope.shopListNum.num--;
			}
		};

		$scope.increaseAmount = function(price, shopping_cart){
			amount = shopping_cart.amount + 1;

			// 调用服务端接口，修改购物车商品数量
			pdtIns.updateShoppingCartAccount($scope.addTobagData,
											 shopping_cart.id,
											 {cart: { amount: amount, total_price: price*amount}}).then(function(data){
				// 用新建的购物车项对象，刷新商品的购物车属性。
				var cart = data.data;
				shopping_cart.amount = cart.amount;
				shopping_cart.total_price = cart.total_price;
			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				},1000)
			});

			$rootScope.shopListNum.num++;
		};

		$scope.deleteProductCart = function(cartId){
			shopInc.deleteProductNumber({headers:$scope.users.setheaders},cartId).then(function(data){
			},function(){
			});
		}
		
		function init(){
			var query={};
			query.type="home";
			query.customer=$scope.users.owner_id;
			homePageIns.categoryData(query).then(function(data){
				var mainData=data;
				// swiper   to use
				$rootScope.adverts=mainData.adverts;
				//$scope.shopListNum.num=mainData.customer_carts.total_count;
				$rootScope.shopListNum.num = mainData.customer_carts.total_count;
				
				var products = data.products;
				$scope.products_single_setmeal = products.single_setmeal;
				$scope.products_personal_setmeal = products.personal_setmeal;
				$scope.products_group_buyings = products.group_buyings;
				//products_1=products_1.concat(products.personal_setmeal);
				//products_1=products_1.concat(products.group_buyings);
				//$scope.products_1=products_1;
				$scope.products_1 = products;

				$scope.team_setmealid=data.team_setmeal[0].id;

				var panic_buying=data.panic_buying;
				if(!panic_buying){
					return;
				}
				var panic_buying_ps=[];
				for(var i=0;i<4&&i<panic_buying.products.length;i++){
					panic_buying_ps.push(panic_buying.products[i])
				}
				$scope.panic_buying_ps=panic_buying_ps;
				var end_time=new Date(panic_buying.end_time);
				var promise=$interval(updateTime,1000);
				function updateTime(){
					var l=end_time-new Date();
					if(l>0){
						var utcdate=new Date(l);
						var hms=new Date(utcdate-8*60*60*1000);
						var dd=(hms).Format("dd");
						$scope.timeH=addZeroIfLessTen(((hms).Format("hh")-0)+(dd-1)*24);
						$scope.timeM=(hms).Format("mm");
						$scope.timeS=(hms).Format("ss");
						
						function addZeroIfLessTen(str){
							if(str-0<10)
								return "0"+str;
							return str;
						}
					}else{
						$scope.timeH=00;
						$scope.timeM=00;
						$scope.timeS=00;
						$interval.cancel(promise);
						$scope.panic_buying_ps=[];
					}
				}
				setTimeout(function(){
					$(".loading").hide();				
				});	
			},function(err){
				console.log(err);
				alert("我们出现了一些错误");
			});
		}
		init();



	}];
	return ctrl;
});