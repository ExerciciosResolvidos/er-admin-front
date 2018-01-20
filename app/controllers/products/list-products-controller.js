"use strict"

angular
  .module("ER")
  .controller("listProductsController", 
    ["$scope","apiService", "$rootScope",
    ($scope, apiService, $rootScope) => {

      $scope.list = (query) =>
        apiService
        .getProducts(query)
        .then( resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.products = resp.data
        })
      

      $scope.edit = product => 
        $rootScope.$emit("product:edit", { id: product.id })
      

      $scope.new = () => 
        $rootScope.$emit("product:new")
      

      $scope.destroy = product => 
        apiService
        .destroyProduct(product.id)
        .then( resp => $scope.list() )
      

      $scope.list()
    }
  ]
)