function __init__mouse( stack, name )
{
  //console.log( '__init__mouse on name=', name );
  var elem = document.getElementById( name );
  //console.log( 'elem=', elem );
  elem.onclick = function ( e )
  {
    var pixel = getpixel( e );
    this.click( pixel.px, pixel.py, e );
  }.bind( stack );

  elem.onmousemove = function ( e )
  {
    //console.log( 'mouse is moving' );
    var pixel = getpixel( e );
    this.over( pixel.px, pixel.py, e );
  }.bind( stack );

  elem.onmouseout = function ( e )
  {
    var pixel = getpixel( e );
    this.out( pixel.px, pixel.py, e );
  }.bind( stack );
}
