"use strict"
angular
  .module("ER")
  .controller("listContentsController", 
    ["$scope", "apiService", "$rootScope", 
    ($scope,apiService, $rootScope) => {
      

      $scope.list = () =>
        apiService
        .getContents()
        .then(resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.contents = resp.data
        })
      

      const init = () => $scope.list()

      init()
    }
  ]
)