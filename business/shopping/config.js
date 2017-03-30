define(["angular","ui-router"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
		$stateProvider.state("productList",{
			url:"/productList",
			templateUrl:"./business/shopping/productList/productList.html",
			controller:"productList.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/shopping/productList/productList"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("productList.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})
		$stateProvider.state("payment.pay",{
			url:"/pay",
			templateUrl:"./business/shopping/payment/pay.html",
			controller:"pay.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/shopping/payment/pay"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("pay.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})

		$stateProvider.state("payment",{
			url:"/payment",
			templateUrl:"./business/shopping/payment/payment.html",
			controller:"payment.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/shopping/payment/payment"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("payment.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})

		$stateProvider.state("receiveAddr",{
			url:"/receiveAddr",
			templateUrl:"./business/shopping/receiveAddr/receiveAddr.html",
			controller:"receiveAddr.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/shopping/receiveAddr/receiveAddr"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("receiveAddr.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})

		$stateProvider.state("payPage",{
			url:"/payPage",
			templateUrl:"./business/shopping/payPage/payPage.html",
			controller:"payPage.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/shopping/payPage/payPage"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("payPage.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})

		$stateProvider.state("paySuccess",{
			url:"/paySuccess",
			templateUrl:"./business/shopping/paySuccess/paySuccess.html",
			controller:"paySuccess.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/shopping/paySuccess/paySuccess"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("paySuccess.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})
		
	}];

    var  mo = angular.module("ui.router");

    mo.factory('orderList', function() { 
	  	var service = {    
		    orderList:[],
		    allPrice:0,
		    setList: function(list) { 
		      service.orderList = list; 
		    },
		    getList: function() {
		      return service.orderList;
		    },
		  };  
	  	return service;
	});
    mo.config(config);
    return  mo;
});
