var __orbit__selected = -1;

function __init__controls()
{
  document.getElementById( "neodna__latherituum__curse__clear" ).onclick = function() {
  	console.log( 'clearing the offset' );
  	var stack = gaaden.__stack__center;
  	var sequence = stack.sequence;
  	sequence.set__offset( 0 );
  	gaaden.refresh ();
    gaaden.changed ();
    gaaden.play();
  	gaaden.draw( 1 );
    //gaaden.haidentot.draw( 1 );
  }

  document.getElementById( "import__export__tabs__fasta" ).onclick = function() {
    console.log( 'click on import__export__tabs__fasta' );
  	var elem = document.getElementById( "fasta__input");
  	if ( elem.style.display == "none"
      || !elem.style.display )
  		elem.style.display = "block";
  	else
  		elem.style.display = "none";

    var text = document.getElementById( "fasta__input__text" );
    var stack = gaaden.__stack__center;
    var sequence = stack.sequence;
    var binary = sequence.get().clip__focus;
    //console.log( 'binary =', binary );
    var fasta = __binary__to__fasta( binary );
    //console.log( 'fasta=', fasta );
    text.value = __binary__to__fasta( binary );
  }

  document.getElementById( "import__export__tabs__export" ).onclick = function() {
    console.log( db );
    exportToJson( db.connection ).then( ( json ) => {
      download( json, 'json.txt', 'text/plain' );
      //console.log( "json"=", json );
    } );
  }

  document.getElementById( "import__export__tabs__import" ).onclick = function() {
    var elem = document.getElementById( "import__export__hidden__input__import");
    if ( elem.style.display == "none"
      || !elem.style.display )
      elem.style.display = "block";
    else
      elem.style.display = "none";
  }

  document.getElementById( "import" ).addEventListener( "change", function( event ) {
    var reader = new FileReader();
    reader.onload = function( event )
    {
      console.log( event );
      var json = event.target.result;
      clearDatabase( db.connection ).then( ( value ) => {
        importFromJson( db.connection, json ).then( ( value ) => {
          console.log( 'imported database' );
          db = db__init();
          var elem = document.getElementById( "import__export__tabs__import" );
          elem.onclick();
        } );
      } );

    };
    if ( event.target.files[ 0 ] )
      reader
        .readAsText( event.target.files[ 0 ] );
  } );

  function __init__fasta__input( e, binary )
  {
    gaaden.set( binary );
    console.log( 'sequence from fasta=', binary );
    db__sequence__update__sequence( binary );

  }

  document.getElementById( "fasta__input__text" ).addEventListener( "paste", function( e ) {
    var input = ( event.clipboardData || window.clipboardData ).getData( 'text' );
    console.log( input );
    var binary = __fasta__to__binary( input );
    __init__fasta__input( e, binary );
  } );

  document.getElementById( "fasta__input__text" ).addEventListener( "keyup", function( e ) {
    console.log( e.target );
    console.log( e.target.value );
    var binary = __fasta__to__binary( e.target.value );
    __init__fasta__input( e, binary );
  } );

  document.getElementById( "neodna__latherituum__curse__lock" ).onclick = function( e ) {
  	console.log( 'toggling lock' );
  	var stack = gaaden.__stack__center;
  	var sequence = stack.sequence;
  	if ( sequence.is__locked() )
  	{
  		e.target.className = 'neodna__latherituum__curse__off';
  		e.target.style.className = 'neodna__latherituum__curse__off';
  		sequence.set__lock( 0 );
  	}
  	else
  	{
  		e.target.className = 'neodna__latherituum__curse__on';
  		e.target.style.className = 'neodna__latherituum__curse__on';
  		sequence.set__lock( 1 );
  	}
  	console.log( 'locked=', sequence.is__locked() );

  }
/*
  document.getElementById( "latherituum__draw" ).onclick = function( e ) {
    console.log( 'drawing' );
    gaaden.refresh();
    gaaden.changed();
    gaaden.play();
  	gaaden.draw( 1 );
    //gaaden.haidentot.draw( 1 );
    gaaden.satelytes.draw( 0 );
  }
*/

  document.getElementById( "neodna__latherituum__create" ).onclick = function ( e ) {
    db__sequence__add( e );
  }

  document.getElementById( "gaaden__fortune__name__input" ).addEventListener( "input", function( e ) {
  	gaaden.db__name = e.target.value;
  	db__sequence__update__name( e.target.value );
  } );
}
