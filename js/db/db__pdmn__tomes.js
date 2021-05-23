function db__pdmn__tomes__add()
{
  let transaction = db.connection.transaction( "pdmn__tomes", "readwrite" );
  transaction.oncomplete = function ( event ) {
    db__pdmn__tomes__fetch();
  }
  let store = transaction.objectStore( "pdmn__tomes" );
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

    let pdmn__tome = {
      id:    next++,
      name:  '',
      color: getRandomColor(),
      itinerary: 0
    };
    var r2 = store.add( pdmn__tome );
    r2.onsuccess = function( event )
    {
      console.log( 'pdmn__tome was added to the DB=', pdmn__tome );
    }
  }
}

function db__pdmn__tomes__fetch()
{
  pandeminium.phylactery.tomes = new Array();

  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__tomes", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded tomes' );
    //pandeminium.phylactery.loaded();
    db__pdmn__tomes__codex__fetch();
  }

  let store = transaction.objectStore( "pdmn__tomes" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__tomes__fetch__single;
}

function db__pdmn__tomes__fetch__single( event )
{
  var request = event.target;
  if ( request.result )
  {
    var tome = request.result.value;
    var pdmn__tome
      = new neodna__PdmnTome(
        tome.id,
        tome.name,
        tome.color
      );
    pandeminium.phylactery.add( pdmn__tome );

    request.result.continue();
  }
}

function db__pdmn__tomes__fetch__id( id )
{
  let transaction
    = db.connection.transaction( "pdmn__tomes", "readwrite" );
  let store = transaction.objectStore( "pdmn__tomes" );
  let index = store.index( 'id' );
  let r1 = index.get( id );
  r1.onsuccess = function()
  {
    var __tome = r1.result;
    var phylactery = pandeminium.phylactery;
    for ( let tome of phylactery.tomes )
    {
      if ( tome.id == __tome.id )
      {
        tome.id    = __tome.id;
        tome.name  = __tome.name;
        tome.color = __tome.color;
        tome.itinerary = new neodna__PdmnItinerary();

        db__pdmn__tomes__fetch__codex( id );
      }
    }
  }
}

function db__pdmn__tomes__fetch__codex( id )
{
  var range = IDBKeyRange.only( id );
  let transaction
    = db.connection.transaction( "pdmn__tomes__codex", "readwrite" );
  transaction.oncomplete = function()
  {
    pandeminium.phylactery.refresh( id );
    pandeminium.phylactery.changed();
    pandeminium.draw( 1 );
  }

  let store = transaction.objectStore( "pdmn__tomes__codex" );
  let index = store.index( "tome" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__tomes__fetch__codex__only;
}

function db__pdmn__tomes__fetch__codex__only( event )
{
  var request = event.target;
  if ( request.result )
  {
    var pair = request.result.value;
    for ( let tome of pandeminium.phylactery.tomes )
    {
      if ( tome.id == pair.tome )
        tome.itinerary.add( pair.codex );
    }
    request.result.continue();
  }
}

function db__pdmn__tomes__addend( tome__id, codex__id )
{
  console.log( 'adding codex: ' + codex__id + ' to tome: ' + tome__id );
  let transaction
    = db.connection.transaction( "pdmn__tomes__codex", "readwrite" );
  transaction.oncomplete = function ( e ) {
    db__pdmn__tomes__fetch__id( tome__id );
  }

  let store = transaction.objectStore( "pdmn__tomes__codex" );
  let index = store.index( 'id' );
  let r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( e )
  {
    console.log( 'found last sequence in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    let pair = {
      id:    Number( next ),
      tome:  Number( tome__id ),
      codex: Number( codex__id )
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

function db__pdmn__tomes__pinch( tome__id, codex__id )
{
  var range = IDBKeyRange.only( Number( tome__id ) );

  let transaction
    = db.connection.transaction( "pdmn__tomes__codex", "readwrite" );
  transaction.oncomplete = function ( e ) {
    db__pdmn__tomes__fetch__id( tome__id );
  }

  let store = transaction.objectStore( "pdmn__tomes__codex" );
  let index = store.index( 'tome' );
  let r1 = index.openCursor( range );
  r1.onsuccess = function( e )
  {
    var request = e.target;
    if ( request.result )
    {
      var entry = request.result.value;
      if ( entry.codex == codex__id )
      {
        let r2 = store.delete( entry.id );
        r2.onsuccess = function( e ) {
          console.log( 'removed codex from DB=', entry );
        }
        r2.onerror = function( e ) {
          console.log( 'failed to remove codex from DB=', entry );
        }
      }
      else
        request.result.continue();
    }
  }
}

function db__pdmn__tomes__codex__fetch()
{
  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__tomes__codex", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded tomes into phylactery=', pandeminium.phylactery );
    pandeminium.phylactery.changed();
    pandeminium.phylactery.loaded();
    if ( ! pandeminium.__loading )
      pandeminium.draw( 1 );
  }

  let store = transaction.objectStore( "pdmn__tomes__codex" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__tomes__codex__fetch__single;
}

function db__pdmn__tomes__codex__fetch__single( event )
{
  var request = event.target;
  if ( request.result )
  {
    var pair = request.result.value;
    for ( let tome of pandeminium.phylactery.tomes )
    {
      if ( tome.id == pair.tome )
        tome.itinerary.add( pair.codex );
    }
    request.result.continue();
  }
}
