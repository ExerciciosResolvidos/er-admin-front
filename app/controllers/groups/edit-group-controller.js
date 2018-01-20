"use strict"
angular
  .module("ER")
  .controller("editGroupController", 
    ["$scope","apiService","$rootScope", "$routeParams", 
    function($scope,apiService,$rootScope, $routeParams) {


      $scope.loadFromRouteParams = () => {

        apiService
        .getGroup($routeParams.id)
        .then(resp => {
          $scope.group = resp.data
        })
      }

      $scope.new = () => {
        $scope.group = {}
      }


      $scope.create = () => {
        apiService
        .createGroup({ group: $scope.group})
        .then(resp => onSuccess(resp))
        .catch(resp => onError(resp))
      }

      $scope.update = () => {
        apiService
        .updateGroup($scope.group.id,{group: $scope.group})
        .then(resp => onSuccess(resp))
        .catch(resp => onError(resp))
      }

      function onSuccess(resp){
      }
      function onError(resp){
        $scope.errors = resp.data
      }
    }
  ]
)