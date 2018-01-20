"use strict"

angular
  .module("ER")
  .controller("listSearchController", 
    ["$scope","apiService", 
    ($scope, apiService) => {

      $scope.list = (query) =>
        apiService
        .getSearchs(query)
        .then( resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.searchs = resp.data
        })
      

      $scope.destroy = (search) => 
        apiService
        .destroySearch(search.id)
        .then(resp => $scope.list())

      $scope.list()
    }
  ]
)