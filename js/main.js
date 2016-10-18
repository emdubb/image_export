$(document).ready(function(){
  $("#fileUpload").change(function(){
    var counter = 0;
    var canvasArray = [];
    var file = this.files[0];
    var files = this.files
    var zip = new JSZip();
    zip.folder("export");

    for (var i = 0; i < files.length; i++) {
      counter++
      console.log("counter", counter)
      // console.log(files.length - 1)
      file = files[i];
      var reader = new FileReader();

      reader.onload = function(event) {
        var name = file.name
        console.log("NAME: ", event);
        var url = event.target.result;

        var img = new Image();
        img.src = url;
        img.width = img.width / 2
        img.height = img.height / 2

        var canvas = document.getElementById("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height)
        // console.log("CANVAS: ", canvas)

        canvas.toBlob(function(blob){
          console.log('ya dummy', blob)
          canvasArray.push(blob)
          // return blob
          console.log(canvasArray)
        })

        console.log("lengths", canvasArray.length, files.length)
        if (canvasArray.length === files.length) {
          console.log('in if statement')
          canvasArray.forEach(function(item){
            console.log('in canvas loop')
            zip.file("export/" + name, item);
          })
          zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "export.zip");
            });

        }
      }
      reader.readAsDataURL(file);
      console.log("FILE: ", file)

      // canvas.toBlob(function(blob) {
      //   zip.file("export/" + name, blob)
      //   zip
      //     .generateAsync({type:"blob"})
      //     .then(function(content){
      //       saveAs(content, "export.zip");
      //     })
      // });


    }

  })
})
