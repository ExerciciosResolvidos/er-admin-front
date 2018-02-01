"use strict"
angular
  .module("ER")
  .controller("listTagsController", 
    ["$scope", "apiService", "$rootScope", 
    function($scope,apiService, $rootScope) {

      function linkTags(tags) {
        return tags.filter(t => 
          !findInTagThree(t.id, tags)
        )
      }

      function findInTagThree(tagId, tags, first = true) {
        // console.log(tags)
        for(const compareTag of tags) {
          // console.log(compareTag.title)
          // console.log(compareTag.id, tagId)
          if(!first && compareTag.id === tagId)
            return true
          
            
          if(findInTagThree(tagId, compareTag.childs, false)) {
            return true
          }
        }
      
        return false
      }

      $scope.list = query => 
        apiService
        .getTags(query)
        .then(resp => {
          $scope.pagination = JSON.parse(resp.headers("X-pagination"))
          $scope.tags = linkTags(resp.data)
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