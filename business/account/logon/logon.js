define(["amaze"],function(){
	var ctrl = ["$scope","$state",function($scope,$state){
		$scope.changedPage2pss = function(){
			$state.go("pwdLogon");
		}
		function init(){
			$scope.scrollToZero();
		}
		init();
	}];
	return ctrl;
});