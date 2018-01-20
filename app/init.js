"use strict"

const app = angular
  .module("ER", ["ngRoute"])
  .config(
    [ "$httpProvider", 
      "$routeProvider", 
     ( $httpProvider , $routeProvider ) => {


      $routeProvider
      .when("/", {
        templateUrl : "views/session/login.html",
      })
      // exercicios
      .when("/exercicios", {
        templateUrl : "views/exercises/index.html"
      })
      .when("/exercicios/novo", {
        templateUrl : "views/exercises/new.html"
      })
      .when("/exercicios/:id", {
        templateUrl : "views/exercises/edit.html"
      })

      // products
      .when("/products", {
        templateUrl : "views/products/index.html"
      })
      .when("/products/novo", {
        templateUrl : "views/products/new.html"
      })
      .when("/products/:id", {
        templateUrl : "views/products/edit.html"
      })
      // listas
      .when("/listas", {
        templateUrl : "views/groups/index.html"
      })
      .when("/listas/novo", {
        templateUrl : "views/groups/new.html"
      })
      .when("/listas/:id", {
        templateUrl : "views/groups/edit.html"
      })


      .when("/buscas", {
        templateUrl : "views/search/index.html"
      })
      // keywords
      .when("/keywords", {
        templateUrl : "views/keywords/index.html"
      })
      .when("/keywords/novo", {
        templateUrl : "views/keywords/new.html"
      })
      .when("/keywords/:id", {
        templateUrl : "views/keywords/edit.html"
      })
      
      //users
      .when("/usuarios", {
        templateUrl : "views/users/index.html"
      })
      .when("/usuarios/novo", {
        templateUrl : "views/users/new.html"
      })
      .when("/usuarios/:id", {
        templateUrl : "views/users/edit.html"
      })

      //conteudos
      .when("/conteudos", {
        templateUrl : "views/contents/index.html"
      })   
      .when("/conteudos/novo", {
        templateUrl : "views/contents/new.html"
      })   
      .when("/conteudos/:id", {
        templateUrl : "views/contents/edit.html"
      })   

      // pagseguro
      .when("/transactions", {
        templateUrl : "views/transactions/index.html"
      })

      // imagens
      .when("/pictures", {
        templateUrl : "views/pictures/index.html"
      })
      .when("/pictures/:id", {
        templateUrl : "views/pictures/edit.html"
      })

      // tags
      .when("/tags", {
        templateUrl : "views/tags/index.html"
      })
      .when("/tags/novo", {
        templateUrl : "views/tags/new.html"
      })
      .when("/tags/:id", {
        templateUrl : "views/tags/edit.html"
      })
      // facebookcomments
      .when("/comments", {
        templateUrl : "views/comments/index.html"
      })

      // manager
      .when("/system/publish", {
        templateUrl : "views/system/publish.html"
      })

    }
  ]
)

