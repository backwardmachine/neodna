function __init__parisfair__mouse__click( px, py )
{
  console.log( 'click at px=' + px + ', py = ' + py );

  var unit__clicked = this.getXY(
    this.mouse.current__clicked.x,
    this.mouse.current__clicked.y
  );


  var unit = this.getXYp( px, py );
  if ( unit )
  {
    if ( unit.x == 0
      && unit.y == 0 ) // click on plus
    {
      db__pdmn__oldenscrybe__add();
    }
    else {
      //db__pdmn__oldenscrybe__fetch__id( unit.pos() );
    }

    var draw = 0;

    console.log( 'unit=', unit );
    if ( unit.x == unit__clicked.x
      && unit.y == unit__clicked.y ) // double click on unit
    {
      /*
      this.mouse.current__clicked = {
        x: -1,
        y: -1
      }
      unit.modified = 1;
      unit.__flags.endflag( __STACK__MOUSE__CLICKED );

      if ( unit.x == 0
        && unit.y == 0 ) // double click to remove unit
      {
        console.log( 'unit is being removed from DB' );

      }
      else { // double click to goto unit
        console.log( 'unit is already clicked, not adding to DB' );

      }
      */
    }
    else {
      // only change clicked by having another clicked
      if ( unit__clicked )
      {
        unit__clicked.__flags.endflag( __STACK__MOUSE__CLICKED );
        unit__clicked.modified = 1;
      }

      console.log( 'found unit which was clicked=', unit );
      unit.__flags.setflag( __STACK__MOUSE__CLICKED );
      this.mouse.current__clicked = {
        x: unit.x,
        y: unit.y
      };
      unit.modified = 1;

      var pos = unit.pos();
      console.log( 'pos=', pos );
      var parisfair = pandeminium.parisfair;
      var oldenscrybe = parisfair.oldenscrybe[ pos - 1 ];
      if ( oldenscrybe )
      {
        parisfair.to( oldenscrybe.id );
        draw = 1;
      }

    }

    if ( draw )
      pandeminium.draw( 1 );
  }
}

function __init__parisfair__mouse__over( px, py )
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
/*
    var pos = unit.pos();
    var oldenscrybe = pandeminium.parisfair.oldenscrybe[ pos ];
    if ( oldenscrybe )
      pandeminium.parisfair.oldenscrybe__over = oldenscrybe;
      */
  }
}
