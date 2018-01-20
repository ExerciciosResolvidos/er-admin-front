"use strict"

angular
  .module("ER")
  .controller("listPicturesController", 
    ["$scope","apiService", "$rootScope", "$location",
    ($scope, apiService, $rootScope, $location) => {

      $scope.active  = false

      $scope.list = (query) => {
        // const { q: urlQuery } = $location.search()
        // const { q: functionQuery } = query
        // query.q = functionQuery || urlQuery 


        
        apiService
        .getPictures(query)
        .then( resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.pictures = resp.data
          
        })
      }

      $scope.select = picture => 
        $rootScope.$emit("picture:select", picture)
        
      function load(){
        $scope.list({ page: 1})
      }

      load()
    }
  ]
)