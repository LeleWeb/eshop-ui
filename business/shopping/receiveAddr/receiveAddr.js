define(["amaze","framework/services/shoppingService",],function (amaze,userAddr){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){

		var addressInc = new userAddr($q);
		$scope.currentuser = {};

		var header = {
			headers:$scope.users.setheaders
		}
		function validatemobile(mobile)  
		{  
			if(!mobile||mobile.length==0)
			{
			   alert('请输入手机号码！');
			   return false;
			}
			if(mobile.length!=11)
			{  
				alert('请输入有效的手机号码！');
				return false;
			}  
			  
			var myreg =/^1[3|4|5|8][0-9]\d{4,8}$/;  
			if(!myreg.test(mobile))  
			{  
				alert('请输入有效的手机号码！');  
				return false;  
			}
			return true;  
		}  
		$scope.saveUserAddr = function(userId){

			if($scope.currentuser.name==""||$scope.currentuser.phone==""||$scope.currentuser.details==""){
				alert("请填写完整信息");
				return;
			}
			if(!validatemobile($scope.currentuser.phone)){
				return;
			}
			var data = {
				"address": {
					"name": $scope.currentuser.name,
					"phone": $scope.currentuser.phone,
					"address": $scope.currentuser.details,
					"is_default": true,
					"customer_id": $scope.users.owner_id
				}
			}

			addressInc.createAddress(header,data).then(function(data){
				// alert("添加成功");
				$state.go("payment.pay");
				console.log(data);
			},function(err){
				console.log(err)
			});

			
		}
		$scope.selectAddr = function(address){
			address.is_default= true;
			
			addressInc.updateAddress(header,address).then(function(data){
				$state.go("payment.pay");
				console.log(data);
			},function(err){
				console.log(err)
			});
		}
		$scope.deleteAddr = function(num){
			addressInc.deleteAddr({headers:$scope.users.setheaders},num).then(function(data){
				console.log(data,"deletesucce.....")
				initAddress()
			},function(){

			});
		}		
		function initAddress(){
			addressInc.getAccountAddress($scope.users.owner_id).then(function(data){
				
				$scope.addresses = data.data;
				
			},function(err){

			});
		}
		initAddress();


	}];


	return ctrl;
});