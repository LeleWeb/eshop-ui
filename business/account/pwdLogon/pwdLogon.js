define(["amaze","framework/services/accountService"],function(amaze,account){
	var ctrl = ["$scope","$q","$state",function($scope,$q,$state){
		var accountIns = new account($q);
		console.log(accountIns);
		$scope.dataLogon = {
			"username":"18717373045",
			"password":"1234"
		}

		$scope.modalObj = {
			// content:"已添加到购物车"
		}
		$scope.addToBag  = function(){
			// $scope.modalObj.showDialogdwhite()
			$scope.modalObj.showDialog()
			setTimeout(function(){
				$scope.modalObj.hideDialog();
			},2000);
		}

		$scope.loginToShop = function(){
			$scope.modalObj.showDialog();
			accountIns.forLogon($scope.dataLogon).then(function(data){
				console.log(data,"logon.....")
				$scope.modalObj.hideDialog();
					
					$scope.users.data = data.data;
					$scope.users.owner_id = data.data.customer.id;
					
					addHeaderToCookie(data.data.account);
					// success then add cookies
					setTimeout(function(){
						$state.go("accounts");
					},300);

			},function(err){
				$scope.modalObj.hideDialog();
				console.log(err,'err....account..');
				alert("登录失败");
			});
		}

		function addHeaderToCookie(data){
			var headers = {
				"Authorization":"Token token=\""+data.authentication_token + "\"," + "mobile_number="+ "\""+data.mobile_number +"\"",
				"Content-Type":'application/json'
			};
			$scope.users.setheaders = headers;

		}

		$scope.toRegister = function(){
			$state.go("register");
		}


//{"code":0,"message":"successful",
// "data":{"id":2,"mobile_number":"18717373045",
// "authentication_token":"+4SkHorO/tQz/FGLpIrYM7ag9fv5ez8KI+iJM/+NsNB42OoIz2h7Gi34mC/tP45NGsTSqxEqq8eWJqovKAOn5Q=="}}


// headers: { 'Authorization': 'Token token="kWjTYg/DKr3mJp+6/ucQHnMa8qcMVbU55Q2UuM8UYiyrO4QCookE+gsYHAciux6J9fNrogZQowzF2gGmF5ucEw==",
// mobile_number="18161803190"',
// 'Content-Type': 'application/json'},

// "Token token='EhGQK3d6IQlijDiq011+MKUgKp6ksfqdu4VOz92h/vCzH6CZUwFPr0SukrNnlbLV7mLvs8jD/RDh4uEr0khgAQ==',
// mobile_number="18717373045"',
// 'Content-Type': 'application/json'"

	}];
	return ctrl;
});