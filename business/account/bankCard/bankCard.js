define(["amaze","framework/services/accountService"],function(amaze,accountService){
	var ctrl = ["$scope","$q","$state",function($scope,$q,$state){

		var accountIns = new accountService($q);
		$scope.bankCards = {};
		var header = {
			headers:$scope.users.setheaders
		}



		$scope.saveBankCards = function(){
			if (!($scope.bankCards.name && $scope.bankCards.numbers && $scope.bankCards.address)) {
				alert("请检查信息是否完整");
				return;
			};

			var data = {
			    "back_account": {
			        "name": $scope.bankCards.name,
			        "card_number": $scope.bankCards.numbers,
			        "bank": $scope.bankCards.address,
			        "is_default": true
			    },
			    "customer_id": $scope.users.owner_id
			}


			// var data  = {
			//     "back_account": {
			//         "name": "xxx",
			//         "card_number": "123456",
			//         "bank": "中国银行",
			//         "is_default": true
			//     },
			//     "customer_id": 1
			// }

			accountIns.saveBankAddress(header,data).then(function(data){
				console.log(data)
				if (data.message == "successful") {
					alert("添加成功！")
					$state.go("takeMoney")
				};
			},function(err){
				console.log(err)
				alert("添加出错，请稍后再试！");
			});



		}

	}];



	return ctrl;
});