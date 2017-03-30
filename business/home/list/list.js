define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q","$interval",function($scope,$state, $stateParams,$http,$q,$interval){
		var homePageIns = new homePage($q);
		if($stateParams.type==="category"){
			$scope.title="单品果切";
			var query={};
			query.category=$stateParams.value;
			homePageIns.categoryData(query).then(function(data){
				if(data.code===0){
					var panic_buying=data.data;
					$scope.products=panic_buying.products;	
				}
			},function(err){
				console.log(err);
				alert("我们出现了一些错误");
			});			
		}else if($stateParams.type==="property"){
			$scope.title="团购特价";
			var query={};
			query.property=$stateParams.value;
			homePageIns.categoryData(query).then(function(data){
				if(data.code===0){
					var panic_buying=data.data;
					$scope.products=panic_buying.products;	
				}
			},function(err){
				console.log(err);
				alert("我们出现了一些错误");
			});			
		}else{
			$scope.is_panic_buyings=true;
			var index = $stateParams.index;
			homePageIns.panic_buyings(10).then(function(data){
				if(data.code===0){
					var panic_buying=data.data;
					$scope.products=panic_buying.products;
					var end_time=new Date(panic_buying.end_time);
					var promise=$interval(updateTime,1000);
					function updateTime(){
						var now= new Date();
						var l=end_time-now;
						if(l>0){
							var utcdate=new Date(l);
							var hms=new Date(utcdate-8*60*60*1000);
							var dd=(hms).Format("dd");
							$scope.timeH=addZeroIfLessTen(((hms).Format("hh")-0)+(dd-1)*24);
							$scope.timeM=(hms).Format("mm");
							$scope.timeS=(hms).Format("ss");
							
							function addZeroIfLessTen(str){
								if(str-0<10)
									return "0"+str;
								return str;
							}
						}else{
							$scope.timeH=00;
							$scope.timeM=00;
							$scope.timeS=00;
							$interval.cancel(promise);
							alert("抢光了");
							$state.go('home');
						}
					}

					
				}
			},function(err){
				console.log(err);
				alert("我们出现了一些错误");
			});
		}

	}];
	return ctrl;
});