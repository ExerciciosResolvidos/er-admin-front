"use strict"

angular
  .module('ER')
  .directive('clickOutside',
   function ($document) {

    let $activeElem

    function renderContentFor($element, value){
      if($element){
        $element.hide()
        let $preview = $element.next(".edit-preview")
        let html = FormulaView.formatText(value || $element.val())
        $preview.css({padding: "10px", border: "dashed 1px"})

        $preview.html(html).show()

        $activeElem = null
      }
    }

    function openForEdit($preview){

      let $elem = $preview.prev("input, textarea")
      /* se já houver um elemento ativo */
      if($activeElem && !$elem.is($activeElem))
        renderContentFor($activeElem)
      
      $activeElem = $elem
      $preview.hide()
      $activeElem.show()
    }

    /* click outside */
    $document.bind("click", function(e) {
      e.stopPropagation()
      renderContentFor($activeElem)
    })

    return {
      restrict: 'A',
      scope: {
        typeId: '@',
        ngModel: "="
      },      
      link: function(scope, elem, attrs) {
        

        /* create preview dom */
        let $preview = $("<p class=\"edit-preview\">").insertAfter(elem)

        // proccess each to initial state
        renderContentFor( $(elem), scope.ngModel )

        /* click on preview */
        $preview.bind("click", function(e) {
          e.stopPropagation()
          openForEdit($(this))
        })

        /* click on input */
        elem.bind("click", function(e) {
          e.stopPropagation()
        })

      }
    }
  }
)