"use strict"
angular
  .module("ER")
  .controller("listGroupsController", 
    ["$scope", "apiService", "$rootScope", 
    function($scope,apiService, $rootScope) {
      

      $scope.list = (query) => 
        apiService
        .getGroups(query)
        .then(resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.groups = resp.data
        })
        .catch(resp => console.error(resp.data) )
      

      $scope.select = group =>  
        $rootScope.$emit("group:select", group )

      const init = () => $scope.list()

      init()
    }
  ]
)