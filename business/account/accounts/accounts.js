define(["amaze"],function (){
	var ctrl = ["$scope","$http","$state",function($scope,$http,$state){
		$scope.changedPage2logon = function(){
			$state.go("logon");
		}
		// $scope.changedPage2pss = function(){
		// 	$state.go("pwdLogon");
		// }
		$scope.changedPage2orderStatus = function(statusNum){
			// $scope.orderStatus = status;
			// $scope.pageStatus = "orderStatus";
			$state.go("myOrder",{statusId:statusNum})
		}

		$scope.toGOCollect=function(){
			$state.go("collect");
		}

		$scope.toCoupon=function(){
			$state.go("coupon");
		}
		

	}];
	return ctrl;
});