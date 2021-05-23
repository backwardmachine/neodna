function __init__stack__canvas( __cfg, width, height )
{
  var elem = document.getElementById( __cfg.nest );
  elem.onselectstart = function () { return false; }

  var canvas = new neodna__Canvas();
  canvas.split (
    width,
    height
  ); // creates a rack
  canvas.span  (
    __cfg.pixels.x,
    __cfg.pixels.y
  );
  canvas.use   ( __cfg.nest );
  canvas.paint ( [
  	'333333',
  	'ffffff',
  	'333333',
  	'ffffff'
  ] );
  if ( __cfg.caoi )
    canvas.caoi  ( __cfg.caoi );
  return canvas;
}
