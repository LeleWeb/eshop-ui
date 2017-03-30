define(["amaze","framework/services/accountService"],function(amaze,accountService){
    var ctrl = ["$scope","$state","$stateParams","$q",function($scope,$state,$stateParams,$q){
    	var accountIns = new accountService($q);
        function init(){
			if($stateParams.orderId){
				accountIns.getOrderDetail($stateParams.orderId).then(function(data){
				$scope.orderCurrent = data.data;
			},function(err){
				// alert(111)
				alert(err)
			});
			}else{
				$scope.orderCurrent = $scope.orderDetailsDisplay.order;
			}
        }

        init()
    }];
    
    return ctrl;
});