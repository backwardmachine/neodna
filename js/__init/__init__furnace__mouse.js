function __init__furnace__mouse__click( px, py )
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
    var index = pos;
    var library = pandeminium.library;
    var codex = library.codexes[ index ];
    if ( unit.__flags.isflag( __STACK__MOUSE__SELECTION ) )
    {
      pandeminium.furnace.codex__selected = codex.id;
      pandeminium.library.draw( 1 );
      console.log( 'selected furnace id=', codex.id );

      if ( unit.x == unit__clicked.x
        && unit.y == unit__clicked.y ) // double click
      {
        var phylactery = pandeminium.phylactery;
        var tomeid = phylactery.tome__selected;
        if ( tomeid == -1 && phylactery.selection.length )
          tomeid = phylactery.selection[ phylactery.selection.length - 1 ];
        if ( tomeid != -1 )
        {
          var tome = phylactery.get( tomeid );
          if ( tome )
          {
            console.log( 'trying to remove codex=' + codex.id + ' from tome=' + tome.id );
            db__pdmn__tomes__pinch( tome.id, codex.id );
          }
        }
      }
    }
    else
    {
      pandeminium.furnace.codex__selected = codex.id;
      console.log( 'selected furnace id=', codex.id );

      var phylactery = pandeminium.phylactery;
      var tomeid = phylactery.tome__selected;
      if ( tomeid == -1 && phylactery.selection.length )
        tomeid = phylactery.selection[ phylactery.selection.length - 1 ];
      if ( tomeid != -1 )
      {
        var tome = phylactery.get( tomeid );
        if ( tome )
          db__pdmn__tomes__addend( tome.id, codex.id );
      }
    }
  }
}

function __init__furnace__mouse__over( px, py )
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
    var codex = pandeminium.library.codexes[ pos ];
    if ( codex )
    {
      pandeminium.furnace.codex__over = codex.id;
      pandeminium.furnace.focus();
    }
    //console.log( 'codex over=', codex );
  }
}
