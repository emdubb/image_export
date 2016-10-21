$(document).ready(function(){
  window.chrome ? null : $('#browser-message').show();
  var counter = 0;
  var canvasArray = [];
  var zip = new JSZip();
  zip.folder("export");
  $("#fileUpload").change(function(){
    formatFiles(this, function(){
      exportFiles()
    });
  })

  function formatFiles(that, callback){
    var files = that.files
    for (var i = 0; i < files.length; i++) {
      (function(file) {
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
          ctx.drawImage(img, 0, 0, img.width, img.height)

          canvas.toBlob(function(blob){
            zip.file("export/" + name, blob);
            canvasArray.push(blob)
            if (canvasArray.length === files.length) {
              callback && callback();
            }
          })

        }
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }

  function exportFiles(){
    zip.generateAsync({type:"blob"})
      .then(function(content) {
          saveAs(content, "export.zip");
      });
  }


})
