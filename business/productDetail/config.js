define(["angular","ui-router"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
			$stateProvider.state("detail",{
			url:"/detail?:productId",
			params:{productId:null},
			templateUrl:"./business/productDetail/detail/detail.html",
			controller:"detail.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/productDetail/detail/detail"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("detail.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})

			$stateProvider.state("search",{
			url:"/search",
			templateUrl:"./business/home/search/search.html",
			controller:"search.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/home/search/search"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("search.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});



	}];
    var  mo = angular.module("ui.router");
    mo.config(config);
    return  mo;
});
