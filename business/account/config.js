define(["angular","ui-router"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
		$stateProvider.state("accounts",{
			url:"/accounts",
			templateUrl:"./business/account/accounts/accounts.html",
			controller:"accounts.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/accounts/accounts"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("accounts.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});



		$stateProvider.state("shareMan",{
			url:"/shareMan",
			templateUrl:"./business/account/shareMan/shareMan.html",
			controller:"shareMan.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/shareMan/shareMan"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("shareMan.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});

		// $stateProvider.state("logon",{
		// 	url:"/logon",
		// 	templateUrl:"./business/account/logon/logon.html",
		// 	controller:"logon.ctrl",
		// 	resolve:{
		// 		deps:function($q,$rootScope){
		// 			var defered = $q.defer();
		// 			var dependiences = ["./business/account/logon/logon"];
		// 			require(dependiences,function(ctrl){
		// 				$rootScope.$apply(function(){
		// 					$controllerProvider.register("logon.ctrl",ctrl);
		// 					defered.resolve();
		// 				});
		// 			});
		// 			return defered.promise;
		// 		}
		// 	}
		// });
		$stateProvider.state("pwdLogon",{
			url:"/pwdLogon",
			templateUrl:"./business/account/pwdLogon/pwdLogon.html",
			controller:"pwdLogon.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/pwdLogon/pwdLogon"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("pwdLogon.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});
		$stateProvider.state("myOrder",{
			url:"/myOrder",
			params:{statusId:null},
			templateUrl:"./business/account/myOrder/myOrder.html",
			controller:"myOrder.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/myOrder/myOrder"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("myOrder.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});
		$stateProvider.state("collect",{
			url:"/collect",
			params:{statusId:null},
			templateUrl:"./business/account/collect/collect.html",
			controller:"collect.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/collect/collect"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("collect.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});

		$stateProvider.state("coupon",{
			url:"/coupon",
			params:{statusId:null},
			templateUrl:"./business/account/coupon/coupon.html",
			controller:"coupon.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/coupon/coupon"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("coupon.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});

		$stateProvider.state("register",{
			url:"/register",
			params:{statusId:null},
			templateUrl:"./business/account/register/register.html",
			controller:"register.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/register/register"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("register.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});

		$stateProvider.state("orderDet",{
			url:"/orderDet?:orderId",
			params:{statusId:null},
			templateUrl:"./business/account/orderDet/orderDet.html",
			controller:"orderDet.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/orderDet/orderDet"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("orderDet.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});

		$stateProvider.state("takeMoney",{
			url:"/takeMoney?money",
			params:{statusId:null},
			templateUrl:"./business/account/takeMoney/takeMoney.html",
			controller:"takeMoney.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/takeMoney/takeMoney"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("takeMoney.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});
		$stateProvider.state("bankCard",{
			url:"/bankCard",
			params:{statusId:null},
			templateUrl:"./business/account/bankCard/bankCard.html",
			controller:"bankCard.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/account/bankCard/bankCard"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("bankCard.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			},
		});


		
		
	}];
    var  mo = angular.module("ui.router");

    mo.config(config);
    return  mo;
});
