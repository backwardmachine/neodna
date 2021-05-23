function __init__blocks__mouse ( stack, name )
{
  __init__mouse( stack, name );
}

function __init__blocks__mouse__click ( canvas, type )
{
  canvas.mouse.fns.click = function( px, py )
  {
    console.log( 'click at px=' + px + ', py = ' + py );

    var unit__clicked = this.getXY(
      this.mouse.current__clicked.x,
      this.mouse.current__clicked.y
    );
    if ( unit__clicked )
    {
      unit__clicked.__flags.endflag( __STACK__MOUSE__CLICKED );
      unit__clicked.modified = 1;
    }

    var unit = this.getXYp( px, py );
    if ( unit )
    {
      if ( type == __STACK__CALISMADE )
      {
        var index     = this.index( unit.x, unit.y );
        var calismade = gaaden.calismade;
        var mote      = calismade.motes[ index ];
      }

      if ( unit.x == unit__clicked.x
        && unit.y == unit__clicked.y ) // double click on unit
      {
        this.mouse.current__clicked = {
          x: -1,
          y: -1
        }
        unit.modified = 1;
        unit.__flags.endflag( __STACK__MOUSE__CLICKED );

        if ( unit.x == 0
          && unit.y == 0 ) // double click to remove unit
        {

        }
        else { // double click to goto unit
          console.log( 'unit is already clicked, not adding to DB' );

        }
      }
      else {
        console.log( 'type=', type );
        console.log( 'found unit which was clicked=', unit );
        unit.__flags.setflag( __STACK__MOUSE__CLICKED );
        this.mouse.current__clicked = {
          x: unit.x,
          y: unit.y
        };
        unit.modified = 1;


        if ( type == __STACK__CALISMADE )
        {
          if ( mote )
          {
            gaaden.to( mote.i );
            gaaden.refresh();
            gaaden.changed();
            gaaden.play();
            gaaden.draw( 1 );
            //gaaden.haidentot.draw( 1 );
          }
        }
        else if ( type == __STACK__FORTUNES )
        {
          var index     = this.index( unit.x, unit.y );
          var fortunes  = gaaden.fortunes;
          var mote      = fortunes.motes[ index ];
          if ( mote )
          {
            db__sequence__get( mote.id );
            //gaaden.changed();
            //gaaden.play();
            //gaaden.draw( 1 );
          }
        }
      }
    }
  }.bind( canvas );
}

function __init__blocks__mouse__over ( canvas, type )
{
  canvas.mouse.fns.over = function( px, py )
  {
    var unit__over = this.getXY(
      this.mouse.current__over.x,
      this.mouse.current__over.y
    );
    if ( unit__over )
    {
      unit__over.__flags.endflag( __STACK__MOUSE__OVER );
      unit__over.modified = 1;
    }

    var unit = this.getXYp( px, py );
    if ( unit )
    {
      //console.log( 'setting flag __STACK__MOUSE__OVER for unit=', unit );
      unit.__flags.setflag( __STACK__MOUSE__OVER );
      this.mouse.current__over = {
        x: unit.x,
        y: unit.y
      };
      unit.modified = 1;
    }
  }.bind( canvas );
}
