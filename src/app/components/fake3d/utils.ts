
export function loadImage(url, callback) {
  const image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

export function loadImages(urls, callback) {
  const images = [];
  let imagesToLoad = urls.length;

  // Called each time an image finished loading.
  const onImageLoad = () => {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images);
    }
  };

  for (let ii = 0; ii < imagesToLoad; ++ii) {
    const image = loadImage(urls[ii], onImageLoad);
    images.push(image);
  }
}
export function Uniform( name, suffix, program, gl ) {
  this.name = name;
  this.suffix = suffix;
  this.gl = gl;
  this.program = program;
  this.location = gl.getUniformLocation( program, name );
}

Uniform.prototype.set = function( ...values ) {
  const method = 'uniform' + this.suffix;
  const args = [ this.location ].concat( values );
  this.gl[ method ].apply( this.gl, args );
};

export function Rect( gl ) {
  const buffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
  gl.bufferData( gl.ARRAY_BUFFER, Rect.verts, gl.STATIC_DRAW );
}

Rect.verts = new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  1, 1,
]);

// tslint:disable-next-line
Rect.prototype.render = function( gl ) {
  gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
};
// tslint:disable-next-line
export function clamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

// tslint:disable-next-line
// new Sketch();
