ImagesView = {

  render: () => {

    $("p").each((i,item) => {
      var $item = $(item)
      var new_text =  $item.html().replace(/\[img=".*?\]/gm, (img) => {

        var extension = img.match(/(.*type=")(.*?)(")/)[2]
        var size =  img.match(/(.*size=")(.*?)(")/)[2]
        var id = img.match(/(.*img=")(.*?)(")/)[2]
        var $img = $("<img>", { 
          class: "space-1 img-responsive", 
          src: "/imagem/exercicio/"+ id + "/" + extension + "/" + size  
        })
        
        if(size == "original"){
          $img.attr("width","50%")
        }
        return $img.prop('outerHTML')
      }) //end replace
      $item.html(new_text)
    }) // each p
  }
}
