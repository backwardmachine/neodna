function db__sequence__get( id )
{
  console.log( 'getting sequence with id=' + id + ' from DB' );
  let transaction
    = db.connection.transaction( "sequences", "readwrite" );

  transaction.oncomplete = function ( e ) {
    console.log( 'gaaden being refreshed after change of fortune' );
    db__calismade__fetch();
  }

  let sequences = transaction.objectStore( "sequences" );
  let index = sequences.index( 'id' );
  let r1 = index.get( id );
  r1.onsuccess = function() {
    console.log( 'successfully got sequence with id=' + id, r1.result );
    gaaden.set( r1.result.sequence );
    gaaden.db__id = id; // allows fetch to work
    gaaden.db__sequence = r1.result.sequence;
    gaaden.db__name = r1.result.name;
    //console.log( 'FETCHED=', r1.result );

  }
  r1.onerror = function() {
    console.log( 'failed retrieving sequence with id=' + id, r1.result );
  }
}

function db__sequence__add( e )
{
  let transaction = db.connection.transaction( "sequences", "readwrite" );
  let sequences = transaction.objectStore( "sequences" );
  var index = sequences.index( "id" );
  var r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function() {
    console.log( 'found last sequence in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;
    console.log( 'next sequence id =', next );

    let sequence = {
      id: next,
      name: "",
      sequence: gaaden.focus()
    };
    var r2 = sequences.add( sequence );
    r2.onsuccess = function() {
      console.log( 'sequence was added to DB', r2.result );
      let transaction = db.connection.transaction( "sequences__ids", "readwrite" );
      let store = transaction.objectStore( "sequences__ids" );
      let sequence = {
        id: next,
        color: getRandomColor()
      };
      var r3 = store.add( sequence );
      r3.onsuccess = function() {
        console.log( 'sequence__id was added to DB', r3.result );
        db__init__fortunes();
      }
      r3.onerror = function() {
        console.log( 'sequence__id failed to be added to DB', r3.result );
      }
    }

    r2.onerror = function()
    {
      console.log( 'failed to add sequence to DB', r2.result );
    }
  }
  r1.onerror = function() {
    console.log( 'failed to find last sequence in DB', r1.result );
  }
}

function db__sequence__update__sequence( sequence )
{
  if ( gaaden.db__id == -1 )
    return;

  console.log( 'updating gaaden id=' + gaaden.db__id + ' with sequence=', sequence );

  var range = IDBKeyRange.only( gaaden.db__id );
  let transaction = db.connection.transaction( "sequences", "readwrite" );
  transaction.oncomplete = function() {
    gaaden.refresh ();
    gaaden.draw( 1 );
    gaaden.play();
  }

  let sequences = transaction.objectStore( "sequences" );
  let r1 = sequences.openCursor( range );
  r1.onsuccess = function( e )
  {
    var result = e.target.result;
    if ( result )
    {
      var store  = e.target.source;
      const object = result.value;
      object.sequence = sequence;
      var r2 = store.put( object );
      console.log( 'put object into sequences=', object );
      r2.onsuccess = function( event )
      {
        db__sequence__get( object.id );
      }
    }
  }
}

function db__sequence__update__name( name )
{
  var range = IDBKeyRange.only( gaaden.db__id );
  let transaction = db.connection.transaction( "sequences", "readwrite" );
  transaction.oncomplete = function() {

  }

  let sequences = transaction.objectStore( "sequences" );
  let r1 = sequences.openCursor( range );
  r1.onsuccess = db__sequence__update__name__each;
}

function db__sequence__update__name__each( request )
{
  var result = request.target.result;
  var store  = request.target.source;

  const object = result.value;
  object.name = gaaden.db__name;
  var r2 = store.put( object );
  r2.onsuccess = function( event )
  {
    db__sequence__get( object.id );
  }
}
