define(["amaze"],function(){
    var ctrl = ["$scope","$state",function($scope,$state){

        $scope.paySuccess=function(){
            $state.go("paySuccess");
        }

        $scope.name = "test";
    }];
    return ctrl;
});