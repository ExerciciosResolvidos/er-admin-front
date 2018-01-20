"use strict"
angular
  .module("ER")
  .controller("editUserController", 
    ["$scope","apiService","$rootScope", "$routeParams",
    ($scope,apiService, $rootScope, $routeParams) => {


      $scope.loadFromRouteParams = () => {
        apiService
        .getUser($routeParams.id)
        .then(resp => {
          $scope.user = resp.data
        })
      }

      $scope.new = () => {
        $scope.user = {}
      }

      $scope.create = () => {
        apiService
        .createUser({ user: $scope.user })
        .then(resp => onSuccess(resp))
      }

      $scope.update = () => {
        apiService
        .updateUser($scope.user.id,{ user: $scope.user })
        .then(resp => onSuccess(resp))
      }

      function onSuccess(resp){

      }
    }
  ]
)