define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q","$rootScope","$interval",function($scope,$state, $stateParams,$http,$q,$rootScope,$interval){
		var homePageIns = new homePage($q);
		$scope.slideFruitData =  [];
		$scope.gotoProductDetail = function(statusNum){
			$scope.stateGoto(statusNum);
		}

		$scope.scrollTo = function(number){
			$("body").animate({scrollTop: $("#products_"+number).position().top}, 2000);
		}
		
		function init(){
			var query={};
			query.type="home";
			query.customer=$scope.users.owner_id;
			homePageIns.categoryData(query).then(function(data){
				var mainData=data;
				// swiper   to use
				$rootScope.adverts=mainData.adverts;
				$scope.shopListNum.num=mainData.customer_carts.total_count;
				
				var products = data.products;
				$scope.products_single_setmeal = products.single_setmeal;
				$scope.products_personal_setmeal = products.personal_setmeal;
				$scope.products_group_buyings = products.group_buyings;
				//products_1=products_1.concat(products.personal_setmeal);
				//products_1=products_1.concat(products.group_buyings);
				//$scope.products_1=products_1;
				$scope.products_1 = products;

				$scope.team_setmealid=data.team_setmeal[0].id;

				var panic_buying=data.panic_buying;
				if(!panic_buying){
					return;
				}
				var panic_buying_ps=[];
				for(var i=0;i<4&&i<panic_buying.products.length;i++){
					panic_buying_ps.push(panic_buying.products[i])
				}
				$scope.panic_buying_ps=panic_buying_ps;
				var end_time=new Date(panic_buying.end_time);
				var promise=$interval(updateTime,1000);
				function updateTime(){
					var l=end_time-new Date();
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
						$scope.panic_buying_ps=[];
					}
				}
				setTimeout(function(){
					$(".loading").hide();				
				});	
			},function(err){
				console.log(err);
				alert("我们出现了一些错误");
			});
				

		}
		init();



	}];
	return ctrl;
});