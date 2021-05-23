function db__init__haidentot()
{
  db__haidentot__fetch();
}

function db__haidentot__add()
{
  let transaction = db.connection.transaction( "haidentot", "readwrite" );
  transaction.oncomplete = function ( event ) {
    db__haidentot__fetch();
  }
  let store = transaction.objectStore( "haidentot" );
  var index = store.index( "id" );
  var r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( event )
  {
    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    let haidentot = {
      id:    next++,
      name:  '',
      color: getRandomColor(),
      oldenscrybe: 0
    };
    var r2 = store.add( haidentot );
    r2.onsuccess = function( event )
    {
      console.log( 'haidentot was added to the DB=', haidentot );
    }
  }
}

function db__haidentot__update( haidentot )
{
  let transaction
    = db.connection.transaction( "haidentot", "readwrite" );
  let store = transaction.objectStore( "haidentot" );
  let index = store.index( 'id' );
  let r1 = index.get( haidentot.id );
  r1.onsuccess = function()
  {
    var __haidentot = r1.result;
    console.log( '__haidentot=', __haidentot );
    __haidentot.name = haidentot.name;
    __haidentot.oldenscrybe = haidentot.oldenscrybe;
    //__haidentot.color = haidentot.color;
    let r2 = store.put( __haidentot );
    r2.onsuccess = function() {
      console.log( 'successfully updated haidentot' );
    }
  }
}

function db__haidentot__fetch()
{
  gaaden.satelytes.fetching();

  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "haidentot", "readwrite" );
  transaction.oncomplete = function() {
    gaaden.satelytes.fetched();
  }
  let store = transaction.objectStore( "haidentot" );
  let r1 = store.openCursor( range );
  r1.onsuccess = db__haidentot__fetch__single;
}

function db__haidentot__fetch__single( e )
{
  var request = e.target;
  if ( request.result )
  {
    var entry = request.result.value;
    if ( entry )
    {
      var haidentot = new neodna__Haidentot( entry.id );
      haidentot.name            = entry.name;
      haidentot.color           = entry.color;
      haidentot.oldenscrybe__id = entry.oldenscrybe;
      //haidentot.program( gaaden.__stack__center.sequence );

      gaaden.satelytes.add( haidentot );
      console.log( 'got haidentot from DB=', entry )
    }
    request.result.continue();
  }

}
