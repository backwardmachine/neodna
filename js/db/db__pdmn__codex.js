function db__pdmn__codex__add()
{
  let transaction = db.connection.transaction( "pdmn__codex", "readwrite" );
  transaction.oncomplete = function ( event ) {
    db__pdmn__codex__fetch();
  }
  let store = transaction.objectStore( "pdmn__codex" );
  var index = store.index( "id" );
  var r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( event )
  {
    console.log( 'found last codex in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    let pdmn__codex = {
      id: next++,
      color: getRandomColor()
    };
    var r2 = store.add( pdmn__codex );
    r2.onsuccess = function( event )
    {
      console.log( 'pdmn__codex was added to the DB=', pdmn__codex );

    }
  }
}

function db__pdmn__codex__fetch()
{
  pandeminium.library.codexes = new Array();

  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__codex", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded codexes into library=', pandeminium.library );
    //console.log( 'fetching codes' );
    db__pdmn__codex__fetch__codes();
  }

  let store = transaction.objectStore( "pdmn__codex" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__pdmn__codex__fetch__single;
}

function db__pdmn__codex__fetch__single( event )
{
  var request = event.target;
  if ( request.result )
  {
    var codex = request.result.value;
    var pdmn__codex
      = new neodna__PdmnCodex( codex.id, codex.color );
    pandeminium.library.add( pdmn__codex );

    request.result.continue();
  }
}

function db__pdmn__codex__addend( code__id, codex__id )
{
  let transaction
    = db.connection.transaction( "pdmn__codex__codes", "readwrite" );
  transaction.oncomplete = function ( e ) {
    console.log( 'codex oncomplete fired' );
    db__pdmn__codex__fetch();
  }

  console.log( 'codex__id=', codex__id );
  var range = IDBKeyRange.bound(
    [ Number( codex__id ), 0 ],
    [ Number( codex__id ), 10000 ]
  );

  let store = transaction.objectStore( "pdmn__codex__codes" );
  let index = store.index( 'codex__code' );
  let r1 = index.count( range );
  r1.onsuccess = function( event )
  {
    console.log( "count=", r1.result );
    if ( r1.result == 4 )
      console.log( 'found 4 records already=', r1.result );
    else
    {
      let i2 = store.index( 'id' );
      let r2 = i2.openCursor( null, 'prev' );
      r2.onsuccess = function( e ) {
        console.log( 'found last sequence in db or null', r1.result );

        var next = 0;
        if ( !r2.result )
          next = 0;
        else
          next = r2.result.value.id + 1;

        let codex__code = {
          id:     Number( next ),
          codex:  Number( codex__id ),
          code:   Number( code__id )
        };
        let r3 = store.put( codex__code );
        r3.onsuccess = function( e ) {
          console.log( 'added codex__code to DB=', codex__code );
        }
        r3.onerror = function( e ) {
          console.log( 'failed to add codex__code to DB=', e );
        }
      }
    }
  }
}

function db__pdmn__codex__replace( find__id, replace__id, codex__id )
{
  let transaction
    = db.connection.transaction( "pdmn__codex__codes", "readwrite" );
  transaction.oncomplete = function ( e ) {
    //db__pdmn__codex__fetch();
  }

  console.log( 'codex__id=', codex__id );
  var range = IDBKeyRange.only(
    [ Number( codex__id ), Number( find__id ) ]
  );

  let store = transaction.objectStore( "pdmn__codex__codes" );
  let index = store.index( 'codex__code' );
  let r1 = index.openCursor( range );
  r1.onsuccess = function( event )
  {
    var request = event.target;
    if ( request.result )
    {
      var entry = request.result.value;
      console.log( 'found entry to delete=', entry );
      let i2 = store.index( 'id' );
      let r2 = store.delete( entry.id );
      r2.onsuccess = function( e )
      {
        console.log( 'removed result from database', e );
        let r3 = i2.openCursor( null, 'prev' );
        r3.onsuccess = function( e )
        {
          console.log( 'found last sequence in db or null', r3.result );

          var next = 0;
          if ( !r3.result )
            next = 0;
          else
            next = r3.result.value.id + 1;

          let codex__code = {
            id:     Number( next ),
            codex:  Number( codex__id ),
            code:   Number( replace__id )
          };
          let r4 = store.put( codex__code );
          r4.onsuccess = function( e ) {
            console.log( 'added codex__code to DB=', codex__code );
          }
          r4.onerror = function( e ) {
            console.log( 'failed to add codex__code to DB=', e );
          }
        }
      }
    }
  }
}

function db__pdmn__codex__fetch__codes()
{
  var range = IDBKeyRange.bound(
    0,
    10000
  );

  let transaction
    = db.connection.transaction( "pdmn__codex__codes", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'loaded pairs into library=', pandeminium.library );
    pandeminium.library.changed();
    pandeminium.library.loaded();
    if ( ! pandeminium.__loading )
      pandeminium.draw( 1 );
    console.log( 'count=', __tmp__count );
  }

  let store = transaction.objectStore( "pdmn__codex__codes" );
  let index = store.index( "id" );
  let r1 = index.openCursor( range );
  __tmp__count = 0;
  r1.onsuccess = db__pdmn__codex__fetch__codes__single;
}
var __tmp__count = 0;
function db__pdmn__codex__fetch__codes__single( event )
{
  //console.log( 'loading single code' );
  var request = event.target;
  if ( request.result )
  {
    var codex__code = request.result.value;
    //console.log( 'result=', request.result.value );
    for ( let codex of pandeminium.library.codexes )
    {
      if ( codex.id == codex__code.codex )
      {
        //console.log( 'added code to codex=', codex );
        codex.add( codex__code.code );
        __tmp__count++;
      }
    }
    request.result.continue();
  }
}
