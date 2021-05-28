function __caoi__tools( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  context.clearRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );

  var bg = 0;
  var border = 0;
  var button = 0;

  if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
  {
    bg = 1;
    button = 1;
    context.fillStyle = '#ffffff';
    context.globalAlpha = 0.2;
  }

  if ( unit.__flags.isflag( __STACK__MOUSE__SELECTION ) )
  {
    bg = 1;
    context.fillStyle = '#999fb9';
    context.globalAlpha = 0.2;
    if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
    {
      border = 1;
      context.fillStyle = '#99fccf';
      context.globalAlpha = 0.1;
    }
    else if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
    {
      button = 1;
      context.fillStyle = '#ffffff';
      context.globalAlpha = 0.2;
    }
  }
  else if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
  {
    bg = 1;
    border = 1;
    context.fillStyle = '#9999ff';
    context.globalAlpha = 0.1;
    /*
    if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
    {
      button = 1;
      context.fillStyle = '#ffffff';
      context.globalAlpha = 0.4;
    }
    */
  }

  if ( bg )
  {
    context.fillRect(
      ( unit.x * spx ),
      ( unit.y * spy ),
      spx,
      spy );
  }

  if ( border )
  {
    var size = 5;
    var cx = unit.x * spx;
    var cy = unit.y * spy;
    var cxf = cx + spx - size;
    var cyf = cy + spy - size;
    context.globalAlpha = 1.0;
    context.fillStyle = '#fca4fa';
    __caoi__tools__border( cx, cy, spx, spy, 5, context );
  }

  if ( button )
  {
    var cx = unit.x * spx;
    var cy = unit.y * spy;
    var bx = 40;
    var by = 20;
    var cxb = cx + spx - bx - 5;
    var cyb = cy + 5;
    context.globalAlpha = 0.5;
    context.fillStyle = '#666666';
    context.fillRect(
      cxb,
      cyb,
      bx,
      by );

    context.globalAlpha = 0.3;
    context.fillStyle = '#666666';
    __caoi__tools__border( cxb, cyb, 40, 20, 1, context );

    var cxt = cxb + 14;
    var cyt = cyb + 6;
    context.globalAlpha = 0.8;
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.moveTo( cxt + 0,  cyt + 0  );
    context.lineTo( cxt + 10, cyt + 0  );
    context.lineTo( cxt + 5, cyt + 10 );
    context.fill();
  }
}

function __caoi__tools__border( x, y, w, h, s, c )
{
  var cxf = x + w - s;
  var cyf = y + h - s;
  c.fillRect( x,   y,   w,   s  );
  c.fillRect( x,   y,   s,   h  );
  c.fillRect( cxf, y,   s,   h  );
  c.fillRect( x,   cyf, w,   s  );
}
