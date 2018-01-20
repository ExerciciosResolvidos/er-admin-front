"use strict"

angular
  .module('ER')
  .directive("fileModel",
    ["$document","$parse",
    ($document,$parse) => {

    function loadImage(scope, elem, attrs,ngModel){
      let f = elem[0].files[0]
      let reader = new FileReader()

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          let title = escape(theFile.name)

          console.log(theFile)
          let src = e.target.result
          ngModel.$setViewValue(src)

        }
      })(f)

      reader.readAsDataURL(f)
  
    }

    return {
      restrict: "AE", 
      require: "ngModel",    
      scope: {
        typeId: '@',
        ngModel: "="  // same as ngModel=ngModel
      },  
      transclude: true,

      link: function(scope, elem, attrs,ngModel) {

        elem.bind("change", (e) => {
          loadImage(scope, elem, attrs,ngModel)
        })
      }
    }
  }]
)