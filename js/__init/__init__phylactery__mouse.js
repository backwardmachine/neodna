function __init__phylactery__mouse__click( px, py )
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
    if ( unit.x == 0
      && unit.y == 0 ) // click on plus
    {
      db__pdmn__tomes__add();
      return;
    }

    var draw = 0;

    console.log( 'unit=', unit );
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
        console.log( 'unit is being removed from DB' );

      }
      else { // double click to goto unit
        console.log( 'unit is already clicked, not adding to DB' );

      }
    }
    else {
      console.log( 'found unit which was clicked=', unit );
      unit.__flags.setflag( __STACK__MOUSE__CLICKED );
      this.mouse.current__clicked = {
        x: unit.x,
        y: unit.y
      };
      unit.modified = 1;
    }

    var pos = unit.pos();
    var index = pos - 1;
    var phylactery = pandeminium.phylactery;
    var tome = phylactery.tomes[ index ];
    //console.log( 'tomes=', phylactery.tomes );
    if ( unit.__flags.isflag( __STACK__MOUSE__SELECTION ) )
    {
      //unit.__flags.endflag( __STACK__MOUSE__SELECTION );
      if ( tome )
      {
        if ( phylactery.tome__selected == tome.id )
        {
          console.log( 'unselecting tome' );
          //var previous = phylactery.tome__selected__;
          //if ( ! previous )
          //  previous = phylactery.tomes[ phylactery.tomes.length - 1 ];
          phylactery.tome__selected = -1;

          // remove from DB
          var parisfair = pandeminium.parisfair;
          var oldenscrybe = parisfair.get( parisfair.oldenscrybe__selected );
          if ( oldenscrybe )
          {
            console.log( 'removing from DB tome=', tome.id );
            db__pdmn__oldenscrybe__pinch( oldenscrybe.id, tome.id );
          }
        }
        else
        {
          phylactery.tome__selected__ = phylactery.tome__selected;
          phylactery.tome__selected = tome.id;
          pandeminium.furnace.draw( 1 );
          pandeminium.library.draw( 1 );
        }
      }
      //if ( tome )
      //  phylactery.selected( tome, 0 );
      // do something
      //var pos = unit.pos();
      //pandeminium.phylactery.itinerary.remove( pos );
      //pandeminium.phylactery.itinerary.changed();
      //draw = 1;
    }
    else
    {
      // add to DB
      if ( tome )
      {
        phylactery.tome__selected__ = phylactery.tome__selected;
        phylactery.tome__selected = tome.id;
        pandeminium.furnace.draw( 1 );
        pandeminium.library.draw( 1 );

        var parisfair = pandeminium.parisfair;
        var oldenscrybe = parisfair.get( parisfair.oldenscrybe__selected );
        if ( oldenscrybe )
        {
          console.log( 'adding to DB tome=', tome.id );
          db__pdmn__oldenscrybe__addend( oldenscrybe.id, tome.id );
        }
      }

      /*
      var tome__id = unit.pos();
      var parisfair = pandeminium.parisfair;
      if ( parisfair.oldenscrybe__selected )
      {
        var oldenscrybe__id = parisfair.oldenscrybe__selected.id;
        db__pdmn__oldenscrybe__addend( oldenscrybe__id, tome__id );
      }
      */

      // do something
      //var tome__id = unit.pos();
      //pandeminium.phylactery.itinerary.add( pos );
      //pandeminium.phylactery.itinerary.changed();
      //draw = 1;
    }

    //if ( draw )
    //  pandeminium.draw( 1 );
  }
}

function __init__phylactery__mouse__over( px, py )
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

    var pos = unit.pos();
    var tome = pandeminium.phylactery.tomes[ pos ];
    if ( tome )
    pandeminium.phylactery.tome__over = tome;
  }
}
