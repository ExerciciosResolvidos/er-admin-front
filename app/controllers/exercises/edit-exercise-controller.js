"use strict"
angular
  .module("ER")
  .controller("editExerciseController", 
    ["$scope","apiService","$rootScope","$routeParams",
    ($scope,apiService,$rootScope, $routeParams) => {

      $scope.newPictureMaster = {}
      $scope.picture = {
        title: "nova imagem"
      }

      $scope.loadFromRouteParams = () =>{
        apiService
        .getExercise($routeParams.id)
        .then(resp => {
          $scope.exercise = resp.data
          $scope.setActiveResolution($scope.exercise.resolutions[0])
          $scope.getExerciseTags()
          $scope.getExerciseKeywords()
          $scope.getExerciseGroups()
        })
      }

      $scope.new = () => { 
        $scope.exercise = {
          resolutions: [
            { titulo: "resolução", etapas: [] }
          ],
          tags: [],
          keywords: [],
          groups: []
        }
        $scope.setActiveResolution($scope.exercise.resolutions[0])
      }


      $rootScope.$on("tag:select", (e, tag) => 
        $scope.addItem("tags", tag)
      )

      $rootScope.$on("keyword:select", (e, keyword) => 
        $scope.addItem("keywords", keyword)
      )

      $rootScope.$on("group:select", (e, group) => 
        $scope.addItem("groups", group)
      )

      $scope.hasItem = (key, item, checkBy) => 
          checkBy 
          ? ($scope.exercise[key].find(i => i[checkBy] === item[checkBy])) 
          : ($scope.exercise[key].indexOf(item) !== 1)
      

      $scope.addItem = (key,item) => {
        $scope.hasItem(key, item) ? $scope.exercise[key].push(item) : null
      }

      $scope.removeItem =  (key, item) => {
        
        const index = $scope.exercise[key].indexOf(item)
        $scope.exercise[key].splice(index, 1)
      }


      $scope.getExerciseTags = () =>
        apiService
        .getTags({ in: { resource: "exercise", id: $scope.exercise.id }})
        .then(resp => {
          $scope.exercise.tags_attributes = resp.data
        })
        .catch(resp => console.error(resp.data))

      
      $scope.getExerciseKeywords = () =>
        apiService
        .getKeywords({ in: { resource: "exercise", id: $scope.exercise.id } })
        .then(resp => {
          $scope.exercise.keywords = resp.data
        })
        .catch(resp => console.error(resp.data))
      
      $scope.getExerciseGroups = () =>
        apiService
        .getGroups({ in: { resource: "exercise", id: $scope.exercise.id } })
        .then(resp => {
          $scope.exercise.groups = resp.data
        })
        .catch(resp => console.error(resp.data))
      

      $scope.setActiveResolution = (resolution) => {
        $scope.currentResolution = resolution
      }

      $scope.addStep = (resolution) => {
        resolution.etapas.push({
          description: "descrição de exemplo",
          formulas: [],
          obs: "observação de exemplo"
        })
      }

      $scope.removeStep = (step, resolution) => {
        let index = resolution.etapas.indexOf(step)
        resolution.etapas.splice(index, 1)
      }

      $scope.addResolution = () =>
        $scope.exercise.resolutions.push({
          titulo: "nova resolução"
        })

      $scope.addPicture = (picture) => {
        $scope.exercise.pictures.push(angular.copy($scope.picture ))
        delete $scope.picture
        $scope.picture = angular.copy($scope.newPictureMaster)
      }

      $scope.removePicture = (picture) => {
        let index = $scope.exercise.pictures.indexOf(picture)
        $scope.exercise.pictures.splice(index, 1)
      }


      $scope.removeResolution = (resolution, set) =>{
        let index = set.indexOf(resolution)
        set.splice(index, 1)
      }

      $scope.addFormula = (step) => {
        let x = Math.ceil(Math.random() * 1000)
        let y = Math.ceil(Math.random() * 1000)
        if(!step.formulas) step.formulas = []
        step.formulas.push(`\\frac{random ${x}}{ random ${y}}`)
      }

      $scope.removeFormula = (formula,set) => {
        let index = set.indexOf(formula)
        set.splice(index, 1)
      }


      $scope.save = () =>
        ($scope.exercise.id)? update() : create()

      function create() {
        apiService
        .createExercise({ exercise: $scope.exercise })
        .then(resp => onSuccess(resp))
        .catch(resp => {
          $scope.errors = resp.data
        })     
      }

      function update() {
        apiService
        .updateExercise($scope.exercise.id,{ exercise: $scope.exercise })
        .then(resp => onSuccess(resp))
        .catch(resp => {
          $scope.errors = resp.data
        })
      }

      function onSuccess(resp){

      }
    }
  ]
)