"use strict"
angular
  .module("ER")
  .factory("configService", [
   () => {

      let config = {}
      let hosts = {
        "localhost": "api.exerciciosresolvidos.net",
        // "localhost": "localhost:3000", 
        "er-app": "api.exerciciosresolvidos.net"
      }

      Object.keys(hosts).forEach((key) => {
        if(location.hostname.match(key)){
          config.host = hosts[key]
        }
      })
      console.log(config)
      return config
   }]
)