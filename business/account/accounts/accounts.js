define(["amaze","framework/services/accountService"],function (amaze,accountService){
	var ctrl = ["$rootScope","$scope","$http","$state","$q",function($rootScope,$scope,$http,$state,$q){
		var accountIns = new accountService($q);

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

		function init(){
			accountIns.getUserDetails($rootScope.users.account_id).then(function(data){
				$rootScope.customer = data.data.customer;
			},function(err){
				console.log(err);
			});
		}

		init();

		}];
	return ctrl;
});