"use strict"
angular
  .module("ER")
  .controller("publishController", 
    ["$scope","apiService",
    ($scope,apiService) => {

      $scope.publishExercises = () => {
        apiService
        .publishExercises({ force: true})
        .then(()=> alert("exercicios publicado") )
      }

      $scope.publishTags = () => {
        apiService.publishTags({ force: true})
        .then(()=> alert("tags publicadas") )

      }

      $scope.publishUsers = () => {
        apiService.publishUsers({ force: true})
        .then(()=> alert("users publicados") )
      }


      $scope.publishComments = () => {
        apiService.publishComments({ force: true})
        .then(()=> alert("users publicados") )
      }
    }
  ]
)