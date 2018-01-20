"use strict"

const formulaUrl = (formula, size) => {
  var formula = String(formula).replace(/(\r\n|\n|\r)/gm,"")
                               .replace(/\\textdollar/gm,"\\$")

  formula = encodeURI(formula)

  return `http://latex.exerciciosresolvidos.net/formula/${formula}/size/${size}`
}

const imageUrl = (id, slug, size) => {
  return `http://images.exerciciosresolvidos.net/imagem/figura/${id}/${slug}/${size}`
}
 
const FormulaView =  {

  $el: () => { return $("[data-equation]") },

  formatText: text => {
    text = text || ""

    var i = 0
    text = text.replace(/\\\$/gm,"\\textdollar")
                         
    text = text.replace(/(\$\$\s?\n?\s?(.|\n)*?\s?\n?\s?\$\$)/gm, (s,m1) => {
      i++
      m1 = m1.replace(/\"?\$\"?/g,"").replace(/\"/g,"&quot;")
      let img = `<img src=${formulaUrl(m1,5)}/>`
      return `<span class="block-equation" data-equation="${m1}">${img}</span>`
    })

    text = text.replace(/(\$(.|\n)*?\$)/gm, (s,m1) => {
      i++
      m1 = m1.replace(/\"?\$\"?/g,"").replace(/\"/g,"&quot;")
      let img = `<img src=${formulaUrl(m1,5)}/>`
      return `<span class="inline-equation" data-equation="${m1}">${img}</span>`
    })


    text = text.replace(/(\$(.|\n)*?\$)/gm, (s,m1) => {
      i++
      m1 = m1.replace(/\"?\$\"?/g,"").replace(/\"/g,"&quot;")
      let img = `<img src=${formulaUrl(m1,5)}/>`
      return `<img class="inline-equation" data-equation="${m1}">${img}</span>`
    })


    text = text.replace(/(\[img=".*?\])/gm, (imgTag) => {
      let id =   imgTag.match(/(img=")(.*?)("\s)/)[2]
      let size = imgTag.match(/(size=")(.*?)("\s)/)[2]
      let slug
      try {
        slug = imgTag.match(/(slug=")(.*?)("\s)/)[2]
      } catch(_err){

      }
      let path = imageUrl(id, slug || "exercicios-resolvidos", size)
      let styles = ""

      if (size === "original")
        styles += "width:50%" 
      return `<img style="${styles}" class="space-1 img-responsive" src="${path}">`
    })

    text = text.replace(/(\r\n|\n|\r)/gm,"</br>")
    return text
	},

  render: () => {
    
    $("p, td, .js-math").each((i, item) => {
      item.innerHTML = FormulaView.formatText(item.innerHTML)
    })

    $(document).trigger("formulas:rendereds")
  }
}
