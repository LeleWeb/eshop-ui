define(["amaze"],function (){
	var ctrl = ["$scope","$state","$stateParams",function($scope,$state, $stateParams){
		$scope.main = "brands";
		$scope.his = function(){
			 window.history.back(-1)
		}

		$scope.gotoBrandsDetails = function(){
			$state.go("brandsDetails")
		}
		function init(){
			$scope.scrollToZero();
		}
		init();
	}];
	console.log("hasadded.....")
	return ctrl;
});