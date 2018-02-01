"use strict"

angular
  .module("ER")
  .factory("apiService", 
    [
     "$http", 
     "$httpParamSerializerJQLike",
     "configService",
     ($http, $httpParamSerializerJQLike, configService) => {
      
      const resources = [ 
        "Keyword", "Picture", "Content", "Search", "Product", "User",
        "Group","Exercise", "Tag", "Comment", "Transaction"
      ]
    
      const prefix = "http://" + configService.host + "/api/admin"


      let authorizedResources = {}
      let paths = []

      let httpOpts  = { 
        headers: {
          Authentication: localStorage.token
        }
      }


      let filterAttrs = {}

      // create filtereds 
      for(let resource of resources){
        filterAttrs[resource.toLowerCase()] = (attrs) => attrs
      }


      filterAttrs.exercise = (attrs) => {
        if( attrs.exercise.pictures_attributes) {
          for(let picture of attrs.exercise.pictures_attributes){
            delete picture.image_thumb
            delete picture.image_medium
            delete picture.s3_url
          }
        }
        return attrs 
      }

      let api = {}


      for(let resource of resources){
        let lowcase = resource.toLowerCase()
        

        api[`get${resource}`] = (id) => 
          $http.get(`${prefix}/${lowcase}s/show/${id}`,httpOpts)

        api[`get${resource}s`] = (query) => 
          $http.get(`${prefix}/${lowcase}s/list?` + $httpParamSerializerJQLike(query), httpOpts)

        api[`create${resource}`] = (attrs) => 
          $http.post(`${prefix}/${lowcase}s/create` ,filterAttrs[lowcase](attrs), httpOpts)

        api[`update${resource}`] = (id,attrs) => 
          $http.put(`${prefix}/${lowcase}s/update/${id}`, filterAttrs[lowcase](attrs), httpOpts)

        api[`destroy${resource}`] = id => 
           $http.delete(`${prefix}/${lowcase}s/destroy/${id}`, httpOpts)
      }


      // publish api
      api.publishUsers = (options) => 
        $http.post(`${prefix}/publish/users` ,  { options }, httpOpts)
      api.publishTags = (options) => 
        $http.post(`${prefix}/publish/tags` ,  { options }, httpOpts)
      api.publishExercises = (options) => 
        $http.post(`${prefix}/publish/exercises` ,  { options }, httpOpts)


      api.login = (user) => { 
        return $http
        .post(`${prefix}/session/login` , { user })
        .then( resp => {
          localStorage.token = resp.data.token
          httpOpts.headers.Authentication = localStorage.token
          
          api.getCurrentUser() 

          return resp
        })
      }

      api.getCurrentUser = () => {
        return $http.get(`${prefix}/users/current`, httpOpts)
        .then(resp => {

          localStorage.userName = resp.data.name
          localStorage.userId = resp.data.id
          localStorage.role = resp.data.role

        })
      }

      api.logout = () => {
        delete localStorage.token
        delete localStorage.userName 
        delete localStorage.userId
        delete localStorage.role 
        return true
      }

      api.userData = () => {
        return {
          userName: localStorage.userName, 
          userId: localStorage.userId,
          role: localStorage.role 
        }
      }

      api.hasUser = () => !!localStorage.token

   
      return api
    
    }
  ]
)