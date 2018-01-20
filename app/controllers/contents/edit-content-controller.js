"use strict"
angular
  .module("ER")
  .controller("editContentController", 
    ["$scope","apiService","$rootScope", "$routeParams",
    ($scope,apiService, $rootScope, $routeParams)  => {


      let initialReview = {
        title: "Nova resenha",
        description: "..."
      }

      $scope.loadFromRouteParams = () => {

        apiService
        .getContent($routeParams.id)
        .then(resp => {
          console.log(resp.data)
          $scope.content = resp.data
          $scope.setActiveReview($scope.content.reviews_attributes[0])

        })
      }

      $scope.new = () => {
        $scope.content = {
          title: "Novo Conteúdo",
          reviews_attributes: [initialReview]
        }
        $scope.setActiveReview($scope.content.reviews_attributes[0])
      }

      $scope.setActiveReview = (review) => {
        $scope.currentReview = review
      }

      $scope.addPicture = picture => {
        const { userId } = apiService.userData()
        picture.user_id = parseInt(userId)
        picture.content_id = $scope.content.id
        console.log(picture)
        apiService.createPicture({ picture })
                  .then(onSuccess)
                  
      }

      $scope.addReview = () =>
        $scope.content.reviews_attributes.push(angular.copy(initialReview))
      

      $scope.removeReview = review =>{
        if(review.id){
          review._destroy = true
        } else {
          let index = $scope.content.reviews_attributes.indexOf(review)
          $scope.content.reviews_attributes.splice(index, 1) 
          $scope.currentReview = $scope.content.reviews_attributes[index - 1]
        }
      }

      $scope.create = () => {
        const { content } = $scope

        apiService
        .createContent({ content })
        .then(resp => onSuccess(resp))
      }

      $scope.update = () => {
        const { content } = $scope
        apiService
        .updateContent(content.id, { content })
        .then(resp => onSuccess(resp))
      }

      function onSuccess(resp){
        // reload
        location.reload()
        
      }
    }
  ]
)