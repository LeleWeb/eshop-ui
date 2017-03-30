define(["amaze","framework/services/homeService"],function(amaze,homePage){
    var ctrl = ["$scope","$q",function($scope,$q){
        $scope.searchString = undefined;
        var homePageIns = new homePage($q);
        $scope.displayProducetList = [];
        $scope.searchData = function(){
        	if ($scope.searchString) {
		        homePageIns.getSearchData($scope.searchString).then(function(data){
                    console.log(data)
		        	$scope.displayProducetList = data.data;
		        },function(err){
		        	console.log(err)
		        });
        	};
        }


    }];
    return ctrl;
});