define(["amaze","framework/services/productService", "framework/services/shoppingService"],function (amaze,pdt,shopList){

	var ctrl = ["$scope","$state","$stateParams","$http","$q","orderList", "$rootScope", function($scope,$state, $stateParams,$http,$q,orderList, $rootScope){

		// $scope.slideFruitData = ["lib/images/img5.png","lib/images/lemon_12.png","lib/images/sangshen_15.png","lib/images/small.jpg","lib/images/spic3.png"];
		$scope.slideFruitData = []
		var productId = $stateParams.productId;
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
		}

		var obj = {};
		function getUsercountId(){
			if ($scope.users !== obj && $scope.users.owner_id) {
				// alert($scope.users.owner_id)
				return $scope.users.owner_id;
			}else{
				return "";
			};
		}
		

		$scope.addTobagData = {
			data:$scope.dataList,
			headers:$scope.users.setheaders
		}
		$scope.computes  = function(){
			$scope.modalObj.showDialog();
			pdtIns.computes($scope.users.setheaders,{number:$scope.productDetails.number-0,money:$scope.productDetails.money-0}).then(function(data){
				$scope.modalObj.hideDialog();
				$scope.productDetails.plans=data.data;
				if($scope.productDetails.plans.length>0){
					$scope.productDetails.plans[0].checked=true;
					$scope.productDetails.planIndex=0;
				}else{
				$scope.modalObjErrComp.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErrComp.hideDialog();
				},2000)
				}
				

			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErrComp.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErrComp.hideDialog();
				},2000)
			})
		}
		$scope.changStatus=function(p,$index){
			var isChecked=!p.checked;
			if(isChecked){
				$scope.productDetails.planIndex=$index;
				for(var i=0;i<$scope.productDetails.plans.length;i++){
					if($index!==i){
						$scope.productDetails.plans[i].checked=false;	
					}
				}
				p.checked=isChecked;	
			}
			
		}
		$scope.buildCarts= function(){
			if($scope.productDetails.category_id===3){
				if($scope.productDetails.plans.length<=0){
					$scope.modalObjErrComp.showDialogdwhite()
					setTimeout(function(){
						$scope.modalObjErrComp.hideDialog();
					},2000)
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

			
			return cart;
		}

		$scope.addToBag = function(product){
			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}

			product.number += 1;

			// add function
			$scope.modalObj.showDialog();

			pdtIns.addTobagList($scope.addTobagData,{cart:$scope.buildCarts()}).then(function(data){
				// code = -1  auth failed
				// alert(JSON.stringify(data));
				$scope.modalObj.hideDialog();
				$scope.modalObjSuc.showDialogdwhite();
				setTimeout(function(){
					$scope.modalObjSuc.hideDialog();
				},500)

				product.shopping_cart = data.data;

				//$scope.shopListNum.num++;
				$rootScope.shopListNum.num++;
			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				},2000)
			})
		}

		$scope.gotoShopList = function(){
			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}
			// add function 
			//$scope.modalObj.showDialog();

			pdtIns.addTobagList($scope.addTobagData,{cart:$scope.buildCarts()}).then(function(data){
				
				$scope.modalObj.hideDialog();
				$scope.modalObjSuc.showDialogdwhite();

				//$scope.shopListNum.num++;
				$rootScope.shopListNum.num++;

				orderList.allPrice = data.data.total_price;
				orderList.setList([data.data]);
				$state.go("payment.pay");
			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				})

			})
			
		}
		$scope.selectPrice = function(price_select){
			$scope.price_select=price_select;
		}
		
		// display in html
		$scope.productDetails ={};
		function init(){
			//pdtIns.getDataforHome(productId).then(function(data){
			//	$(".loading").hide();
			//	var productDetails = data.data;
			//	//顶部轮播图片
			//	$scope.slideFruitData = productDetails.pictures[1];
			//	// 2017.03.28 添加果切分类商品，除团队套餐外，其他都显示价格。
			//	if(productDetails.category_id != 3){
			//		var prices=productDetails.prices;
			//		var index=0;
			//		for(var i in prices){
			//			if(prices[i].is_default){
			//				index=i;
			//			}
			//		}
			//		var defaultprice=prices[index];
			//		var temp=prices[0];
			//		prices[0]=defaultprice;
			//		prices[index]=temp;
			//		prices[0].is_default=true;
			//		$scope.price_select=prices[0];
			//		productDetails.number=1;
			//	}else if(productDetails.category_id===3){
            //
			//		productDetails.number=10;
			//		productDetails.money=100;
			//		productDetails.plans=[];
			//	}else{
			//		console.log("error invalid product detail category!");
			//		alert("我们出现了一些错误");
			//	};
            //
			//	if(productDetails.property===3){
            //
			//		if(productDetails.group_buying&&productDetails.group_buying.end_time){
			//			var end_time= new Date(productDetails.group_buying.end_time);
			//			var now = new Date();
			//			var timeLimits=end_time-now;
			//			if(timeLimits<0){
			//				productDetails.group_buying.end_day=0;
			//			}else{
			//				productDetails.group_buying.end_day=Math.ceil(timeLimits/(1000*60*60*24));
			//			}
			//		}
			//	}
			//	$scope.productDetails=productDetails;
            //
			//},function(err){
			//	console.log("error....");
			//});

			pdtIns.getProduct({customer:$scope.users.owner_id}, productId).then(function(data){
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

					// 20170413 商品详情页加减商品数量是调用接口修改服务端购物车项的数量
					if(productDetails.shopping_cart != null){
						productDetails.number=productDetails.shopping_cart.amount;
					}else{
						productDetails.number=1;
					}
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
			},function(err){
				console.log("error....");
			});
		}

		$scope.reduceAmount = function(price, product){
			if(product.shopping_cart.amount > 1){
				amount = product.shopping_cart.amount - 1;

				// 调用服务端接口，修改购物车商品数量
				var params = {cart: { amount: amount, total_price: price*amount}};
				pdtIns.updateShoppingCartAccount($scope.addTobagData, product.shopping_cart.id, params).then(function(data){
					// 用新建的购物车项对象，刷新商品的购物车属性。
					var cart = data.data;
					product.shopping_cart.amount = cart.amount;
					product.shopping_cart.total_price = cart.total_price;
				},function(err){
					$scope.modalObj.hideDialog();
					$scope.modalObjErr.showDialogdwhite()
					setTimeout(function(){
						$scope.modalObjErr.hideDialog();
					},1000)
				});
			}else{
				$scope.deleteProductCart(product.shopping_cart.id);
				product.shopping_cart = undefined;
				product.number = 0;
			}

			if(product.number > 0){
				product.number--;
			}

			if($rootScope.shopListNum.num > 0){
				$rootScope.shopListNum.num--;
			}
		};

		$scope.increaseAmount = function(price, product){
			amount = product.shopping_cart.amount + 1;

			// 调用服务端接口，修改购物车商品数量
			var params = {cart: { amount: amount, total_price: price*amount}};
			pdtIns.updateShoppingCartAccount($scope.addTobagData, product.shopping_cart.id, params).then(function(data){
				// 用新建的购物车项对象，刷新商品的购物车属性。
				var cart = data.data;
				product.shopping_cart.amount = cart.amount;
				product.shopping_cart.total_price = cart.total_price;
			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				},1000)
			});

			product.number++;
			$rootScope.shopListNum.num++;
		};

		$scope.deleteProductCart = function(cartId){
			shopInc.deleteProductNumber({headers:$scope.users.setheaders},cartId).then(function(data){
			},function(){
			});
		};

		init();
		$scope.reduce = function(){
			if($scope.productDetails.number>1){
				$scope.productDetails.number--;
			}
		}
		$scope.increase = function(){
			$scope.productDetails.number++;
		}
	}];
	return ctrl;
});