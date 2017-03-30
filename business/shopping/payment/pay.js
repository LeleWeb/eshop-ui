define(["amaze","wx","framework/services/shoppingService"],function (amaze,wx,shopList){
	var ctrl = ["$scope","$state","orderList","$q",function($scope,$state,orderList,$q){
		var shopInc = new shopList($q);
		// get select product start
		$scope.displayOrderList = orderList.getList();
		$scope.createOrderAddress = {};
		$scope.payProductDetails = [];

		var header = {
			headers:$scope.users.setheaders
		}
		function selectTimeByDate(){
				var a=new Date();
				var getHours=a.getHours();
				var getMinutes=a.getMinutes();

				if(getHours<10){
					return 1;
				}
				if(getHours<11&&getMinutes<30){
					return 1;
				}
				if(getHours<14){
					return 2;
				}
				if(getHours<15&&getMinutes<30){
					return 2;
				}
				return 3;
		}
		var type=selectTimeByDate();
		if(type==1){
			$scope.selecTime="上午11点"
		}else if(type==2){
			$scope.selecTime="下午三点"
		}else{
			$scope.selecTime="即时配送"
		}
		buildTipe();
		function buildTipe(){
			var a= new Date();
			var type=selectTimeByDate();
			if($scope.selecTime=="即时配送"){
				var tips="三小时内配送";
			}else if($scope.selecTime=="上午11点"){
				var  tips="";
				a.setHours(11)
				if(type>1){
					a.setHours(35)
					var  tips="明天";
				}
				tips+=$scope.selecTime;
			}else{
				var  tips="";
				a.setHours(15)
				if(type>2){
					a.setHours(39)
					var  tips="明天";
				}
				tips+=$scope.selecTime;
			}

			$scope.delivery_time=a.Format("yyyy-MM-dd hh:mm:ss");
			$scope.tips=tips;
		}
		$scope.timeSelects=["即时配送","上午11点","下午三点"]

		$scope.selectTime=function (time){
			$scope.selecTime=time;
			buildTipe()
		}
		// createOrderAndPay
		$scope.getSigntureAndPay = function(){


			// check address
			if (!($scope.createOrderAddress.address && $scope.createOrderAddress.address.id ))  {
				alert("请先添加收获地址");
				$scope.addOrChangeAddr();
				// return;
			};
			var shopping_cart_ids=[];
			for (var i = 0; i < $scope.displayOrderList.length; i++) {
				shopping_cart_ids.push($scope.displayOrderList[i].id);
			};

			var details = {
			"total_price":$scope.allPrice,
		    "buyer_id": $scope.users.customer.id,
		    "buyer_type": "Customer",
		    "shopping_cart_ids": shopping_cart_ids,
			"delivery_time" :$scope.delivery_time,
		    "address_id": $scope.createOrderAddress.address.id,
			"pay_away":$scope.payWay
		  }


			shopInc.createOrderAndPay(header,{order:details}).then(function(data){
				if(data.code!==0){
					alert(data.message);
					return;
				}

				var createOrderData=data.data.order.data;
				var prepayData = data.data.prepay_data;

				if($scope.payWay===1){
					var signature = prepayData;
					//alert("000");
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId" : signature.appId,     //公众号名称，由商户传入
							"timeStamp": signature.timeStamp.toString(),         //时间戳，自1970年以来的秒数
							"nonceStr" : signature.nonceStr, //随机串
							"package" : signature.package,
							"signType" : signature.signType,         //微信签名方式:
							"paySign" : signature.paySign    //微信签名
						},

						function(res){
							//alert(JSON.stringify(res))
							if(res.err_msg == "get_brand_wcpay_request:ok" ) {
								$state.go("orderDet",{orderId:createOrderData.id});
								getShopListNum();

							}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
								alert("取消操作");
							}
						}
					);
				}else{
					//alert("111");
					$state.go("orderDet",{orderId:createOrderData.id});
					getShopListNum();
				}


			},function(err){
				alert("网络较差，请重新操作！")
			});
		}


		$scope.allPrice = orderList.allPrice;
		console.log($scope.displayOrderList,"orderlist.....")
		// get select product end

		$scope.addOrChangeAddr = function(){
			$state.go("receiveAddr");
		}
		// address save

		function getShopListNum(){
			shopInc.getAllOrderList($scope.users.customer.id).then(function(data){
				$scope.shopListNum.num = data.data.total_count;
			},function(err){
				alert("网络不流畅，请重新操作！")
				console.log(err,"shopInc...err....")
			});
		}

		function initAddress(){

			shopInc.getAccountAddress($scope.users.owner_id).then(function(data){
			// shopInc.getAccountAddress($scope.users.customer.id).then(function(data){
				console.log(data);
				filterDefault(data.data)
				console.log($scope.createOrderAddress.address)
				function filterDefault(data){
					if (!data.length) {
						$scope.createOrderAddress.address = "";
						return;
					};

					for (var i = 0; i < data.length; i++) {
						if (data[i].is_default == true) {
							var address=data[i];
							address.detailed_address=address.name + " "+address.phone

							+ " "+address.address ;
							$scope.createOrderAddress.address = address;
							break;

						};
					};
				}
			},function(err){

			});
		}
		initAddress();
		$scope.payWay=2;
		$scope.selectPayWay=function (type){
			$scope.payWay=type;
		}
	}]
	return ctrl;
});
