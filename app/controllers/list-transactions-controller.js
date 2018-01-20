"use strict"

angular
  .module("ER")
  .controller("listTransactionsController", 
    ["$scope", "apiService", "$rootScope", 
    ($scope,apiService, $rootScope) => {
      
      let pagseguroStatus = {
        "1": "aguardando pagamento",
        "2": "em análise",
        "3": "pago",
        "4": "disponível",
        "5": "em disputa",
        "6": "devolvida",
        "7": "cancelada"
      } 

      $scope.humanizedStatus = (id) => pagseguroStatus[id]

      $scope.show = (data) => alert(JSON.stringify(data))

      $scope.load = () =>
        apiService
        .getTransactions()
        .then(resp => {
          $scope.transactions = resp.data
        })
        .catch(resp => console.error(resp.data))
    
      const init = () => $scope.load()

      init()
    }
  ]
)