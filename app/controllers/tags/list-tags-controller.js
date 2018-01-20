"use strict"
angular
  .module("ER")
  .controller("listTagsController", 
    ["$scope", "apiService", "$rootScope", 
    function($scope,apiService, $rootScope) {


      $scope.list = query => 
        apiService
        .getTags(query)
        .then(resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.tags = resp.data
        })
      
      $scope.destroy = tag => {
        if(confirm(`deseja mesmo remover "${tag.title}" de id = ${tag.id}`))
          apiService.destroyTag(tag.id)
                    .then(() => $scope.list())
      }

      const init = () =>
        $scope.list()

      init()
    }
  ]
)