function __init__latherituum__mouse ( stack )
{
  var name = "neodna__latherituum__center";
  var elem = document.getElementById( name );
  elem.onclick = function ( e )
  {
    var pixel = getpixel( e );
    this.click( pixel.px, pixel.py );
  }.bind( stack );

  elem.onmousemove = function ( e )
  {
    console.log( 'mouse moving over latherituum center' );
    var pixel = getpixel( e );
    this.over( pixel.px, pixel.py );
  }.bind( stack );

  elem.onmouseout = function ( e )
  {
    var pixel = getpixel( e );
    this.out( pixel.px, pixel.py );
  }.bind( stack );
}

function __init__latherituum__mouse__click( px, py )
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
    var stack          = gaaden.__stack__center;
    var sequence       = gaaden.__stack__center.sequence;
    var index__canvas  = sequence.sequence__clip__start;
    var index__unit    = this.index( unit.x, unit.y );
    var index__painted = (
      index__canvas +
      index__unit
    );

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

        gaaden.remove__painted( index__painted );
        gaaden.update();
        gaaden.draw( 0 );
      }
      else { // double click to goto unit
        console.log( 'unit is already clicked, not adding to DB' );
        gaaden.to( index__painted );
        gaaden.refresh();
        gaaden.changed();
        gaaden.draw( 1 );
        //gaaden.haidentot.draw( 1 );
        gaaden.play();
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

      var randomColor = getRandomColor();
      gaaden.add__painted( index__painted, randomColor );
      gaaden.update();
      gaaden.draw( 0 );
      //console.log( 'added to gaaden=', gaaden );
    }
  }
}

function __init__latherituum__mouse__over( px, py )
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
}
