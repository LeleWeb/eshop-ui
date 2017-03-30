define(["amaze","framework/services/accountService"],function(amaze,accountService){
	var ctrl = ["$scope","$q","$state",function($scope,$q,$state){

		var accountIns = new accountService($q);

		var header = {
			headers:$scope.users.setheaders
		}
		$scope.displayQrcode = false;
		$scope.hasPriority = false;
		// modal
		$scope.modalObj = {};


		var id = $scope.users.owner_id;
		accountIns.getPriorityShare(id).then(function(data){
			console.log(data);
			if (data.data) {
				$scope.hasPriority = true;
			};



			accountIns.getDistAmountNum(id).then(function(data){
				console.log(data);
				$scope.commission = data.data.commission;
				$scope.fans= data.data.descendants;
				$scope.usable_commission = data.data.usable_commission;


			},function(err){
				console.log(err)
			});
		},function(err){
			console.log(err);

		});		

		$scope.gotoTakeMoney = function(){
			
			$state.go("takeMoney",{money:$scope.commission});


		}

		$scope.displayArcode = function(){
			var data = {
			    "parent_customer_id": $scope.users.owner_id
			}
			if ($scope.qrcodeUrl) {
				return;
			};
			$scope.modalObj.showDialog();
			accountIns.getDistributionQrcode(header,data).then(function(data){
				$scope.modalObj.hideDialog();
				console.log(data,"qrcode......")
				$scope.qrcodeUrl = data.data
			},function(err){
				console.log(err)
			});
			
		}
		// takeMoney  order  Details
		$scope.displayTakeMoneyDetails = function(){
			if ($scope.takeMoneyList) {
				return;
			};
			accountIns.getTakeMoneyDetails($scope.users.owner_id).then(function(data){
				console.log(data)
				$scope.takeMoneyList = data.data;

			},function(err){
				console.log(err)
			});
		}
		// format date 
		// (new Date(item.operate_time)).Format("yyyy/MM/dd hh:mm:ss")
		$scope.convertDate = function(time){
			return new Date(time).Format("yyyy/MM/dd hh:mm:ss");
		}

		$scope.displayTakeMoneyDetails();

	}];


	return ctrl;
});