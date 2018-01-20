"use strict"
angular
  .module("ER")
  .controller("listExercisesController", 
    ["$scope", "apiService", "$rootScope", 
    ($scope,apiService, $rootScope) => {
      
      let userRole = apiService.userData().role
      $scope.list = (query) => {
        if(userRole === "author") {

          apiService
          .getMeExercises(query)
          .then(onSuccess)

        } else {
                  
          apiService
          .getExercises(query)
          .then(onSuccess)
        }
      }

      function onSuccess(resp) {
        $scope.pagination = JSON.parse(resp.headers("X-pagination"))
        $scope.exercises = resp.data
      }
      
      const init = () => $scope.list()

      init()
    }
  ]
)