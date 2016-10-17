$(document).ready(function(){
  $("#fileUpload").change(function(){
    console.log(this.files)
    var file = this.files[0];

    var reader = new FileReader();

    reader.onload = function(event) {
      console.log("test", event.target.result);
      var url = event.target.result;
      var img = new Image();
      img.src = url;
      img.width = img.width / 2
      img.height = img.height / 2
      console.log("new image!", img.width, img.height)
    }

    reader.readAsDataURL(file);
  })
})
