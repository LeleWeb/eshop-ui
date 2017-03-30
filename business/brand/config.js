define(["angular","ui-router"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
		$stateProvider.state("brands",{
			url:"/brands",
			templateUrl:"./business/brand/brands/brands.html",
			controller:"brands.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/brand/brands/brands"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("brands.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})

		$stateProvider.state("brandsDetails",{
			url:"/brandsDetails",
			templateUrl:"./business/brand/brandsDetails/brandsDetails.html",
			controller:"brandsDetails.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/brand/brandsDetails/brandsDetails"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("brandsDetails.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		})
		
		
	}];

    var  mo = angular.module("ui.router");
    mo.config(config);
    return  mo;
});
