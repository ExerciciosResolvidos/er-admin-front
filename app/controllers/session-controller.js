"use strict"

angular
  .module("ER")
  .controller("sessionController", 
    ["$scope","apiService", "$window",
    ($scope, apiService, $window) => {
      let roles = ["author", "editor", "admin"]

      $scope.userName = () => apiService.userData().userName
      $scope.userRole = () => apiService.userData().role
      
      $scope.userRoleIs = roleName => {
        let i = roles.indexOf(roleName)
        for(i; i < roles.length ; i++){
          if(apiService.userData().role === roles[i])
            return true
        }
      }

      $scope.hasUser = () => 
        apiService.hasUser()

      $scope.login = (user) =>
        apiService
        .login($scope.user)
        .then( resp => {
          $window.location.href = "#!exercicios";

        })
        .catch(resp => console.log(resp.data))
      
      $scope.logout = () => {
        apiService.logout()
        $window.location.href = '';
      }
    }
  ]
)