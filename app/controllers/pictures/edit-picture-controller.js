"use strict"
angular
  .module("ER")
  .controller("editPictureController", 
    ["$scope","apiService","$rootScope", "$routeParams",
    ($scope,apiService, $rootScope, $routeParams) => {

      $scope.loadFromRouteParams = () => {

        apiService
        .getPicture($routeParams.id)
        .then(resp => {
          $scope.picture = resp.data
        }).catch(resp => console.error(resp))
      }

      $scope.new = () => {
        $scope.picture = {}
      }

      $scope.create = () => {
        apiService
        .createPicture({ picture: $scope.picture })
        .then(resp => onSuccess(resp))
      }

      $scope.update = () => {
        apiService
        .updatePicture($scope.picture.id,{ picture: $scope.picture })
        .then(resp => onSuccess(resp))
      }

      function onSuccess(resp){
      }
    }
  ]
)