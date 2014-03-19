var app = angular.module("UserApp",['ngResource']);

//app.config(function($routeProvider){
//    $routeProvider.when("/userlist",{
//        templateUrl: "../templates/users/index.html",
//        controller: "UserController"
//    })
//        .when("/settings",{
//            templateUrl: '../templates/settings.html',
//            controller: 'UserController'
//        })
//        .otherwise({redirectTo: "/"});
//});


app.controller('UserController',['$scope','$http',function($scope, $http){
    $scope.users = [];
    $scope.userform = false;
    $scope.inprogress = false;
    $scope.updateform = false;

    $http({
        method: 'GET',
        url: '/users.json'
    }).success(function(data,status,headers){
        $scope.users = data;
    }).error(function(data,status,headers){
        $scope.users = data;
    });

    $scope.addUser = function(){
        $scope.userform = !$scope.userform;
        $scope.user = {}
        $scope.updateform = false;
    }



    $scope.createUser = function(){
        $scope.inprogress = true;
        user = $scope.user
        $http({
            method: 'POST',
            data: user,
            url: '/users'
        }).success(function(data,status,headers){
            $scope.inprogress = false
            $scope.users = data;
            $scope.user = {}
        }).error(function(data,status,headers){
            console.log("i am in failure")
            $scope.inprogress = false
        });
    }


    $scope.deleteUser = function(id){
        $scope.inprogress = true;
        $http({
            method: 'DELETE',
            data: id,
            url: '/users/'+ id
        }).success(function(data,status,headers){
            $scope.inprogress = false
            $scope.users = data;
        }).error(function(data,status,headers){
            console.log("i am in failure")
            $scope.inprogress = false
        });
    }

    $scope.editUser = function(id){
        $scope.userform = false;
        $scope.updateform = true;
        $http({
            method: 'GET',
            data:id,
            url:'/users/'+id
        }).success(function(data,status, headers){
            $scope.user = data;
        })
    }

    $scope.updateUser = function(user){
        id = user.id
        $http({
            method: 'PUT',
            data:user,
            url:'/users/'+id
        }).success(function(data,status, headers){
            $scope.users = data;
            $scope.updateform = false;
        })
    }
}]);