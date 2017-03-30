define(["amaze","framework/services/accountService"],function(amaze,accountService){
	var ctrl = ["$scope","$stateParams","$state","$q",function($scope,$stateParams,$state,$q){

		var accountIns = new accountService($q);
		var header = {
			headers:$scope.users.setheaders
		}


		var money = $stateParams.money;

		$scope.bankCards = {};

		$scope.takeMoney = money;

		// add bankcards details
		$scope.addBankCards = function(){
			$state.go("bankCard");
		}

		// filet default 
		function filterDefault(data){
			if (!data.length) {
				$scope.bankCards.address = "";
				return;
			};
			
			for (var i = 0; i < data.length; i++) {
				if (data[i].is_default == true) {
					$scope.bankCards.address = data[i].card_number;
					break;
					console.log($scope.bankCards.address)
				};
			};
		}

		//get the bankcards address
		function init(){
			accountIns.getBankAddress($scope.users.owner_id).then(function(data){
				console.log(data);
				var addressArray = data.data;
				filterDefault(addressArray)


			},function(err){
				console.log(err)
			});
		}

		// take money
		$scope.takeOffMoney = function(){
			if ($scope.bankCards.take <50) {
				alert("默认提现金额必须大于50元（包含）");
				return;
			};
			var data = {
			    "withdraw_detail": {
			        "sum": $scope.bankCards.take
			    },
			    "customer_id": $scope.users.owner_id,
			    "store_id": 1
			}

			accountIns.applyTakeOffMoney(header,data).then(function(data){
				console.log(data)
				if (data.message == "successful") {
					alert("已成功提交申请，请耐心等待！");
					$state.go("shareMan");
				};
			},function(err){
				console.log(err)
				alert("网络故障，请稍后再试！");
			});
		}


		init();



	}];






	return ctrl;


});