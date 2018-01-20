"use strict"

angular
  .module('ER')
  .directive('bootstrapModal',
   () => {

    return {
      restrict: 'E',
      transclude: true,
      scope: {
        index: "@",
      },
      // terminal: true, 
      priority: 1001, 
      link: (scope, elem, attrs) => {

        /* updates modal id */
        let id =  "modal" + Math.random().toString().replace(".","")

        $(elem).find(".modal").attr("id",id)
        $(elem).find("[data-target]").attr("data-target",`#${id}`)

      },
      template: (elem, attrs) => { 


       let id =  "modal" + Math.random().toString().replace(".","")

       return `
       <a class="${attrs.btnClasses}" data-toggle="modal" data-target="#${id}">
         ${attrs.callToAction}
       </a>
       <div class="modal fade" id="${id}" role="dialog">
        <div class="modal-dialog ${attrs.classes}">
          <div class="modal-body">
            <div ng-transclude>
          </div>
        </div>
       </div>`
      }
    }
  }
)