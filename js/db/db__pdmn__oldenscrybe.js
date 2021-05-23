function db__pdmn__oldenscrybe__add()
{
  let transaction = db.connection.transaction( "pdmn__oldenscrybe", "readwrite" );
  transaction.oncomplete = function ( event ) {
    db__pdmn__oldenscrybe__fetch();
  }
  let store = transaction.objectStore( "pdmn__oldenscrybe" );
  var index = store.index( "id" );
  var r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( event )
  {
    //console.log( 'found last codex in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    let pdmn__oldenscrybe = {
      id:    next++,
      name:  '',
      color: getRandomColor(),
      itinerary: 0
    };
    var r2 = store.add( pdmn__oldenscrybe );
    r2.onsuccess = function( event )
    {
      console.log( 'pdmn__oldenscrybe was added to the DB=', pdmn__oldenscrybe );
    }
  }
}

function db__pdmn__oldenscrybe__fetch()
{
  pandeminium.parisfair.oldenscrybe = new Array();
  console.log( 'parisfair=', pandeminium.parisfair );
  console.log( 'length=', pandeminium.parisfair.oldenscrybe.length );
  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__oldenscrybe", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded parisfair=' );
    //pandeminium.phylactery.loaded();
    db__pdmn__oldenscrybe__tomes();
  }

  let store = transaction.objectStore( "pdmn__oldenscrybe" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__oldenscrybe__fetch__single;
}

function db__pdmn__oldenscrybe__fetch__single( event )
{
  var request = event.target;
  if ( request.result )
  {
    var oldenscrybe = request.result.value;
    var pdmn__oldenscrybe
      = new neodna__PdmnOldenscrybe(
        oldenscrybe.id,
        oldenscrybe.name,
        oldenscrybe.color
      );
    pandeminium.parisfair.add( pdmn__oldenscrybe );

    request.result.continue();
  }
}

function db__pdmn__oldenscrybe__fetch__id( id )
{
  let transaction
    = db.connection.transaction( "pdmn__oldenscrybe", "readwrite" );
  let store = transaction.objectStore( "pdmn__oldenscrybe" );
  let index = store.index( 'id' );
  let r1 = index.get( id );
  r1.onsuccess = function()
  {
    var __oldenscrybe = r1.result;
    var parisfair   = pandeminium.parisfair;
    for ( let oldenscrybe of parisfair.oldenscrybe )
    {
      if ( oldenscrybe.id == __oldenscrybe.id )
      {
        oldenscrybe.id    = __oldenscrybe.id;
        oldenscrybe.name  = __oldenscrybe.name;
        oldenscrybe.color = __oldenscrybe.color;
        oldenscrybe.itinerary = new neodna__PdmnItinerary();

        db__pdmn__oldenscrybe__fetch__tomes( id );
      }
    }
  }
}

function db__pdmn__oldenscrybe__fetch__tomes( id )
{
  var range = IDBKeyRange.only( id );
  let transaction
    = db.connection.transaction( "pdmn__oldenscrybe__tomes", "readwrite" );
  transaction.oncomplete = function()
  {
    pandeminium.parisfair.refresh( id );
    pandeminium.draw( 1 );
  }

  let store = transaction.objectStore( "pdmn__oldenscrybe__tomes" );
  let index = store.index( "oldenscrybe" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__oldenscrybe__fetch__tomes__only;
}

function db__pdmn__oldenscrybe__fetch__tomes__only( event )
{
  var request = event.target;
  if ( request.result )
  {
    var pair = request.result.value;
    for ( let oldenscrybe of pandeminium.parisfair.oldenscrybe )
    {
      if ( oldenscrybe.id == pair.oldenscrybe )
        oldenscrybe.itinerary.add( pair.tome );
    }
    request.result.continue();
  }
}

function db__pdmn__oldenscrybe__addend( oldenscrybe__id, tome__id )
{
  let transaction
    = db.connection.transaction( "pdmn__oldenscrybe__tomes", "readwrite" );
  transaction.oncomplete = function ( e ) {
    db__pdmn__oldenscrybe__fetch__id( oldenscrybe__id );
  }

  let store = transaction.objectStore( "pdmn__oldenscrybe__tomes" );
  let index = store.index( 'id' );
  let r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( e ) {
    console.log( 'found last sequence in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    let pair = {
      id:           Number( next ),
      oldenscrybe:  Number( oldenscrybe__id ),
      tome:         Number( tome__id )
    };
    let r2 = store.put( pair );
    r2.onsuccess = function( e ) {
      console.log( 'added pair to DB=',  pair );
    }
    r2.onerror = function( e ) {
      console.log( 'failed to add pair to DB=', e );
    }
  }
}

function db__pdmn__oldenscrybe__pinch( oldenscrybe__id, tome__id )
{
  var range = IDBKeyRange.only( oldenscrybe__id );

  let transaction
    = db.connection.transaction( "pdmn__oldenscrybe__tomes", "readwrite" );
  transaction.oncomplete = function ( e ) {
    //console.log( 'delete completed' );
    db__pdmn__oldenscrybe__fetch__id( oldenscrybe__id );
    //db__pdmn__oldenscrybe__fetch__id( oldenscrybe__id );
  }

  let store = transaction.objectStore( "pdmn__oldenscrybe__tomes" );
  let index = store.index( 'oldenscrybe' );
  let r1 = index.openCursor( range );
  r1.onsuccess = function( e )
  {
    console.log( 'iterating results for delete' );
    var request = e.target;
    if ( request.result )
    {
      var entry = request.result.value;
      console.log( 'entry=', entry );
      if ( entry.tome == tome__id )
      {
        let r2 = store.delete( entry.id );
        r2.onsuccess = function( e ) {
          console.log( 'removed tome from DB=', entry );
        }
        r2.onerror = function( e ) {
          console.log( 'failed to remove tome from DB=', entry );
        }
      }
      else
        request.result.continue();
    }
  }
}

function db__pdmn__oldenscrybe__tomes()
{
  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__oldenscrybe__tomes", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded tomes into parisfair=', pandeminium.parisfair );
    pandeminium.parisfair.changed();
    pandeminium.parisfair.loaded();
    if ( ! pandeminium.__loading )
      pandeminium.draw( 1 );
  }

  let store = transaction.objectStore( "pdmn__oldenscrybe__tomes" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__oldenscrybe__tome;
}

function db__pdmn__oldenscrybe__tome( event )
{
  var request = event.target;
  if ( request.result )
  {
    var pair = request.result.value;
    for ( let oldenscrybe of pandeminium.parisfair.oldenscrybe )
    {
      if ( oldenscrybe.id == pair.oldenscrybe )
        oldenscrybe.itinerary.add( pair.tome );
    }
    request.result.continue();
  }
}
