"use strict"
angular
  .module("ER")
  .controller("editTagController", 
    [ "$scope", "apiService", "$routeParams",
    ($scope, apiService, $routeParams) => {


      function beforeSave(_tag) {
        const tag = {
          id: _tag.id,
          title: _tag.title,
          description: _tag.description,
        }

        if(tag.parent_tag_attributes) {
          tag.tag_id = tag.parent_tag_attributes.id
        }
        
        tag.child_tag_ids = _tag.child_tags_attributes.map(k => k.id)
        return tag
      }

      $scope.loadFromRouteParams = () => {
        apiService
        .getTag($routeParams.id)
        .then(resp => {
          $scope.tag = resp.data

          apiService
          .getTag($scope.tag.tag_id)
          .then(resp => {
            $scope.tag.parent_tag_attributes = resp.data
          })

          apiService
          .getTags({ in: { resource: "tag", id: $scope.tag.id }})
          .then(resp => {
            $scope.tag.child_tags_attributes = resp.data
          })
        })
      }

      $scope.new = () => {
        $scope.tag = {}
      }
      
      $scope.test = () => {
        alert("teste")
      }

      $scope.create = () =>
        apiService
        .createTag({ tag: beforeSave($scope.tag) })
        .then(resp => onSuccess(resp))

      $scope.update = () =>
        apiService
        .updateTag($scope.tag.id, { tag: beforeSave($scope.tag) })
        .then(resp => onSuccess(resp))
      

      $scope.addChildTag = item =>
        ($scope.tag.child_tags_attributes.indexOf(item) === -1) ? $scope.tag.child_tags_attributes.push(item) : null

      $scope.changeParent = tag => {
        $scope.tag.parent_tag_attributes = tag
      }

      $scope.removeChildTag = item => {
        const index = $scope.tag.child_tags_attributes.indexOf(item)
        $scope.tag.child_tags_attributes.splice(index, 1)
      }

      function onSuccess(resp){
        alert("salvo com sucesso")
      }
    }
  ]
)