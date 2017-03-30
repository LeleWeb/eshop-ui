define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
		var index = $stateParams.index;
		var homePageIns = new homePage($q);
		homePageIns.getAdvert(index).then(function(data){
		$scope.advert=data.data;
		$scope.products=$scope.advert.products;
	},function(err){
		console.log(err);
		alert("我们出现了一些错误");
	});
		

	}];
	return ctrl;
});