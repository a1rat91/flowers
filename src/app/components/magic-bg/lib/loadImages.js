function loadImages(urls, callback) {
  var images = [];
  var imagesToLoad = urls.length;
  
  // Called each time an image finished loading.
  var onImageLoad = function() {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images);
    }
  };
  
  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImages(urls[ii], onImageLoad);
    images.push(image);
  }
}
function loadImages(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}
