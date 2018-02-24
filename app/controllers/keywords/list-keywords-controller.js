"use strict"
angular
  .module("ER")
  .controller("listKeywordsController", 
    ["$scope", "apiService", "$rootScope", 
    function($scope,apiService, $rootScope) {

      $scope.list = (query) => 
        apiService
        .getKeywords(query)
        .then(resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.keywords = resp.data
          console.log($scope.keywords)
        })
        .catch(resp => console.error(resp.data))
      

      $scope.q = null;
    
      $scope.resetQuery = () => {
        $scope.q = null;
      };


      $scope.select = (keyword) => $rootScope.$emit("keyword:select", keyword)
      

      const init = () => $scope.list()

      // init()
    }
  ]
)