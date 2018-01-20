"use strict"
angular
  .module("ER")
  .controller("editKeywordController", 
    ["$scope","apiService","$rootScope","$routeParams", 
    ($scope, apiService, $rootScope, $routeParams) => {


      $scope.loadFromRouteParams = () => {

        apiService
        .getKeyword($routeParams.id)
        .then(resp => {
          $scope.keyword = resp.data
        }).catch(resp => console.error(resp))
      }

      $scope.new = () => {
        $scope.keyword = {
          term: "Nova palavra chave",
        }
      }

      $scope.save = () =>
        ($scope.keyword.id)? update() : create()

      function create() {
        apiService
        .createKeyword({ keyword: $scope.keyword})
        .then(resp => onSuccess(resp))
      }

      function update() {
        apiService
        .updateKeyword($scope.keyword.id,{keyword: $scope.keyword})
        .then(resp => onSuccess(resp))
      }

      function onSuccess(resp){
      }
    }
  ]
)