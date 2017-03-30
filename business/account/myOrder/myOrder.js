define(["amaze","framework/services/accountService"],function(amaze,accountService){
	var ctrl = ["$scope","$stateParams","$q","$state",function($scope,$stateParams,$q,$state){
		var id =  $stateParams.statusId;
		$scope.orderStatus = $stateParams.statusId;
		// console.log($stateParams,"$stateParams....")
		// console.log($stateParams.statusId,"$stateParams....")

		var accountIns = new accountService($q);
		console.log(id,"myordre.....")
		// valid
		var header = {
			headers:$scope.users.setheaders
		}


		$scope.gotoOrderDet = function(orderObjDetail){
			console.log(orderObjDetail);
			$scope.orderStatusCurrent.num = $scope.orderStatus;
			$scope.orderDetailsDisplay.order = orderObjDetail;
			$state.go("orderDet");
		}
		// $scope.orderData = {
		// 	buyer_type:"Customer",
		// 	buyer_id:$scope.users.owner_id
		// }
		// alert($scope.users.owner_id)
		$scope.orderList = [];

		function filterStatus(list){
			list.forEach(function(item,index,lists){
				switch(item.status){
					case 1:
						$scope.fir = true;
						break;
					case 2:
						$scope.sec = true;
						break;
					case 3 :
						$scope.third = true;
						break;
					case 4 : 
						$scope.fourth = true;
						break;
				}
			});




		}
		function init(){
			$(".loading").show();
			console.log($scope.orderStatusCurrent.num)
			if ($scope.orderStatusCurrent.num != -1) {
				$scope.orderStatus = $scope.orderStatusCurrent.num;
			};

			accountIns.getOrderStatus($scope.users.owner_id).then(function(data){
				
				$scope.orderList = data.data.orders;
				console.log(data.data)
				filterStatus($scope.orderList);
				// alert(JSON.stringify(data))
			},function(err){
				// alert(111)
				// alert(err)
			});
		}
		init();
	}];
	return ctrl;
});