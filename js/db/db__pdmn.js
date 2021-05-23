function db__init__pdmn()
{
  pandeminium.__loading = 1;
  db__init__pdmn__codes();
  db__init__pdmn__codex(); // fill the library
  db__init__pdmn__tomes(); // fill the phylactery
  db__init__pdmn__oldenscrybe(); // fill the parisfair
}

function db__init__pdmn__codes()
{
  let transaction
    = db.connection.transaction( "pdmn__codes", "readwrite" );
  transaction.oncomplete = function() {

  }
  let store = transaction.objectStore( "pdmn__codes" );
  let r1 = store.getAll();
  r1.onsuccess = db__init__pdmn__codes__all;
}

function db__init__pdmn__codes__all( event )
{
  var request = event.target;
  console.log( 'pdmn__codes were loaded from DB', request.result );
  var pdmn__codes = request.result;
  if ( request.result.length == 0 )
    db__init__pdmn__codes__install();
  db__init__pdmn__codes__fetch();
}

function db__init__pdmn__codes__install( event )
{
  console.log( 'installing pdmn codes to the DB' );
  let transaction = db.connection.transaction( "pdmn__codes", "readwrite" );
  transaction.oncomplete = function ( event ) {

  }
  let store = transaction.objectStore( "pdmn__codes" );
  var index = store.index( "id" );
  var r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( event )
  {
    console.log( 'found last code in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    for ( var key in Handler )
    {
      let pdmn__code = {
        id: next++,
        name: key.substring( 6 ),
        color: getRandomColor()
      };
      var r2 = store.add( pdmn__code );
      r2.onsuccess = function( event )
      {
        console.log( 'pdmn__code was added to the DB=', pdmn__code );
      }
    }
  }
}

function db__init__pdmn__codes__fetch( e )
{
  pandeminium.book.codes = new Array();

  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__codes", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded code into pandeminium=', pandeminium );
    pandeminium.book.loaded();
    //pandeminium.book.draw();
  }

  let store = transaction.objectStore( "pdmn__codes" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__init__pdmn__code__store;
}

function db__init__pdmn__code__store( event )
{
  var request = event.target;
  if ( request.result )
  {
    var code = request.result.value;
    pandeminium.book.add( {
        id:    code.id,
        name:  code.name,
        color: code.color
      } );

    request.result.continue();
  }
}

function db__init__pdmn__codex()
{
  db__pdmn__codex__fetch();
}

function db__init__pdmn__tomes()
{
  db__pdmn__tomes__fetch();
}

function db__init__pdmn__oldenscrybe()
{
  db__pdmn__oldenscrybe__fetch();
}
