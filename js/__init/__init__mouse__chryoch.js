function __init__mouse__chryoch__tools()
{
  var elem = document.getElementById( "neodna__chryoch__tools__options" );
  elem.onclick = function( e )
  {
    var canvas = this.stack.canvas;
    var p = document.getElementById( "neodna__chryoch__tools" );
    var pr = p.getBoundingClientRect();
    var px = Math.floor( e.clientX - pr.left );
    var py = Math.floor( e.clientY - pr.top );
    var unit = canvas.getXYp( px, py );
    if ( !unit )
      return;
    var index = canvas.index( unit.x, unit.y );
    var chryoch = this.parent;
    var satelyte = chryoch.at( index );
    satelyte.export();
    satelyte.draw( 0 );

  }.bind( this );

  elem.onmousemove = function( e )
  {
    var elem = e.target;
    elem.style.cursor = "pointer";

  }.bind( this );

}

function __init__mouse__chryoch__tools__over( px, py, e )
{
  //console.log( 'mouse is over tools' );
  var chryoch = this.parent;
  var canvas = this.stack.canvas;
  var unit = canvas.getXYp( px, py );
  var pos = canvas.index( unit.x, unit.y );
  if ( !unit )
    return;

  //console.log( 'unit=', unit );
  var h = this.mouse.hovered;
  if ( h.x == unit.x
    && h.y == unit.y )
    return;

  if ( h )
  {
    h.__flags.endflag( __STACK__MOUSE__OVER );
    h.modified = 1;
  }

  if ( chryoch.at( pos ) )
  {
    this.mouse.hovered = unit;
    h = this.mouse.hovered;
    h.__flags.setflag( __STACK__MOUSE__OVER );
    h.modified = 1;
  }
  var elem = document.getElementById( "neodna__chryoch__tools__options" );
  elem.style.display = "none";
}

function __init__mouse__chryoch__tools__click( px, py, e )
{
  console.log( 'click at px=' + px + ', py = ' + py );
  var chryoch = this.parent;
  var canvas = this.stack.canvas;
  var unit = canvas.getXYp( px, py );
  var pos = canvas.index( unit.x, unit.y );
  if ( !unit || !chryoch.at( pos ) )
    return;

  var r = button();
  if ( r )
    return;
  function button()
  {
    var c = unit;
    var cx = c.x * canvas.pixels.x;
    var cy = c.y * canvas.pixels.y;
    var bx = cx + canvas.pixels.x - 40 - 5;
    var by = cy + 5;
    var rect = {
      left:   bx,
      top:    by,
      right:  bx + 40,
      bottom: by + 20
    };
    if ( px >= rect.left
      && px < rect.right
      && py >= rect.top
      && py < rect.bottom )
    {
      var elem = document.getElementById( "neodna__chryoch__tools__options" );
      if ( elem.style.display == "block" )
      {
        elem.style.display == "none";
      }
      else
      {
        elem.style.display = "block";
        elem.style.position = "absolute";
        elem.style.left = rect.left + 'px';
        elem.style.top = rect.bottom + 'px';
        elem.innerHTML = 'export .canter';
      }
      return 1;
    }
    return 0;
  }

  var c = this.mouse.clicked;
  if ( c
    && c.x == unit.x
    && c.y == unit.y ) // double click
  {
    c.__flags.endflag( __STACK__MOUSE__CLICKED );
    c.__flags.endflag( __STACK__MOUSE__SELECTION );
    c.modified = 1;
    this.mouse.clicked = 0;
  }
  else
  {
    if ( c )
    {
      c.__flags.endflag( __STACK__MOUSE__CLICKED );
      c.modified = 1;
    }
    this.mouse.clicked = unit;
    c = this.mouse.clicked;
    c.__flags.setflag( __STACK__MOUSE__CLICKED );
    c.__flags.setflag( __STACK__MOUSE__SELECTION );
    c.modified = 1;

    pdmn = 1;
  }

  if ( pdmn )
  {
    var index = canvas.index(
      c.x,
      c.y
    );
    __init__pdmn__track( e, index );
    var elem = document.getElementById( "neodna__chryoch__tools__options" );
    elem.style.display = "none";
  }

}

function __init__mouse__chryoch__tools__out( px, py, e )
{
  var canvas = this.stack.canvas;
  //console.log( e.fromElement );

  if ( e.target.id == "neodna__chryoch__tools__canvas" )
  {
    var pixel = getpixel( e );
    console.log( 'out pixel=', pixel );
    var unit = canvas.getXYp( pixel.px, pixel.py );
    if ( unit )
    {
      console.log( 'still hovering tools' );
      return;
    }
  }


  console.log( 'mouse has moved away' );
  var elem = document.getElementById( "neodna__chryoch__tools__options" );
  elem.style.display = "none";
  var h = this.mouse.hovered;
  if ( h )
  {
    h.__flags.endflag( __STACK__MOUSE__OVER );
    h.modified = 1;
    this.mouse.hovered = 0;

  }
}
