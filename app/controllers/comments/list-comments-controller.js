"use strict"
angular
  .module("ER")
  .controller("listCommentsController", 
    ["$scope", "apiService", 
    ($scope,apiService) => {
      

      $scope.list = (query) => 
        apiService
        .getComments(query)
        .then(resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.comments = resp.data
        })
      


      const init = () => $scope.list()

      init()
    }
  ]
)