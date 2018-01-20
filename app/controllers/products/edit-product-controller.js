"use strict"
angular
  .module("ER")
  .controller("editProductController", 
    ["$scope","apiService","$rootScope","$routeParams", 
    ($scope,apiService, $rootScope, $routeParams ) => {

      $scope.loadFromRouteParams = () => {
        apiService
        .getProduct($routeParams.id)
        .then(resp => {
          console.log(resp)
          $scope.product = resp.data
        })
      }

      $scope.new = () => {
        $scope.product = {}
      }      

      $scope.create = () => {
        apiService
        .createProduct({ product: $scope.product })
        .then(resp => onSuccess(resp))
      }

      $scope.update = () => {
        apiService
        .updateProduct($scope.product.id,{ product: $scope.product })
        .then(resp => onSuccess(resp))
      }

      function onSuccess(resp){
      }
    }
  ]
)