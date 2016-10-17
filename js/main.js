$(document).ready(function(){
  $("#fileUpload").change(function(){
    console.log(this.files)
    var file = this.files[0];

    var reader = new FileReader();

    reader.onload = function(event) {
      var name = file.name
      var url = event.target.result;
      var img = new Image();
      img.src = url;
      img.width = img.width / 2
      img.height = img.height / 2

      var canvas = document.getElementById("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      // var canvasImage =
      ctx.drawImage(img, 0, 0, img.width, img.height)
      // console.log("canvas?", canvas)
      canvas.toBlob(function(blob) {
        var zip = new JSZip();
        zip
          .folder("export")
          .file(name, blob);
        zip
          .generateAsync({type:"blob"})
          .then(function(content){
            saveAs(content, "export.zip");
          })


        // saveAs(blob, name);
      });
      // var zip = new JSZip();
      // zip.file("name.png", img);
      // zip.generateAsync({type:"blob"})
      //   .then(function(content){
      //     saveAs(content, "export.zip");
      //   })
    }

    reader.readAsDataURL(file);
  })
})
