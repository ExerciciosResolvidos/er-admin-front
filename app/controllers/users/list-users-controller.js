"use strict"

angular
  .module("ER")
  .controller("listUsersController", 
    ["$scope","apiService", "$rootScope", 
    ($scope, apiService, $rootScope) => {

      $scope.list = (query) =>
        apiService
        .getUsers(query)
        .then( resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.users = resp.data
        })
      
      $scope.list()
    }
  ]
)