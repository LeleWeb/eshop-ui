define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		if($stateParams.type==="category"){
			if($stateParams.value === "1"){
				//精品水果
				$scope.title = "精品水果";
				var category = $stateParams.value;

				//var index = $stateParams.index;
				var homePageIns = new homePage($q);
				var query={};
				//此处查询满足分类为：精品水果，属性为：普通商品的所有商品。
				query.category = category;
				//query.property = "1";
				homePageIns.categoryData(query).then(function(data){
					if(data.code===0){
						var panic_buying=data.data;
						$scope.products=panic_buying.products;
					}
				},function(err){
					console.log(err);
					alert("我们出现了一些错误");
				});
			}
		}
	}];
	return ctrl;
});