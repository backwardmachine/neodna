function db__calismade__fetch( e )
{
  console.log( 'db__calismade__fetch' );
  var id = gaaden.db__id;
  gaaden.db__painted = new Array();

  var range = IDBKeyRange.bound(
    [id, 0],
    [id, 10000]
  );

  let transaction
    = db.connection.transaction( "sequences__painted", "readwrite" );
  transaction.oncomplete = function() {
    gaaden.update();
    gaaden.load__calismade();
    gaaden.refresh(); // updates stacks
    gaaden.changed(); // read into satelyte, data from stack center
    gaaden.play( 1 );
    gaaden.draw( 1 );
  }

  let sequences = transaction.objectStore( "sequences__painted" );
  let index = sequences.index( "parent__offset" );
  let r1 = index.openCursor( range );
  r1.onsuccess = db__calismade__store;
}

function db__calismade__store( event )
{
  var request = event.target;
  if ( request.result )
  {
    var pin = request.result.value;
    if ( pin.parent == gaaden.db__id )
    {

      gaaden.db__painted.push({
        i:     pin.offset,
        color: pin.color
      } );
    }
    request.result.continue();
  }
}

function db__calismade__add( offset, color )
{
  if ( gaaden.db__id < 0 )
  {
    console.log( 'failed to add painted with no selected gaaden')
    return;
  }

  let transaction = db.connection.transaction( "sequences__painted", "readwrite" );
  let store = transaction.objectStore( "sequences__painted" );
  var index = store.index( "id" );
  var r1 = index.openCursor( null, 'prev' );
  r1.onsuccess = function( e ) {
    console.log( 'found last sequence in db or null', r1.result );

    var next = 0;
    if ( !r1.result )
      next = 0;
    else
      next = r1.result.value.id + 1;

    let painted = {
      id:     next,
      parent: gaaden.db__id,
      offset: offset,
      color:  color
    };
    console.log( 'trying to add painted=', painted );
    var r2 = store.add( painted );
    r2.onsuccess = function() {
      console.log( 'painted index was added to DB', r2.result );
      db__calismade__fetch(); // get everything again
    }
    r2.onerror = function()
    {
      console.log( 'failed to add painted index to DB', r2.result );
      /*
      // DB: update
      console.log( "sequence failed to be added to DB", r2.result );
      console.log( "sequence to update=", sequence );
      let transaction = db.connection.transaction( "sequences", "readwrite" );
      let sequences   = transaction.objectStore( "sequences" );
      var r3 = sequences.get( sequence.id );
      r3.onsuccess = function( event ) {
        console.log( 'sequence was found in DB', r3.result );
        //sequence.id = 1;
        let r4 = sequences.put( sequence );
        r4.onsuccess = function( event ) {
          console.log( 'sequence was updated', r4.result );
        }
        r4.onerror = function( event ) {
          console.log( 'failed to update sequence', r4.result );
        }
      }
      r3.onerror = function( event ) {
        console.log( 'sequence failed to be found in DB', r3.result );
        console.log( event );
      }
      */
    }
  }
  r1.onerror = function() {
    console.log( 'failed to find last sequence in DB', r1.result );
  }
}


function db__calismade__remove( index )
{
  var range = IDBKeyRange.only(
    [ gaaden.db__id, index ]
  );
  let transaction
    = db.connection.transaction( "sequences__painted", "readwrite" );
  transaction.oncomplete = function() {
    console.log( 'removal completed, loading all DB pins')
    db__calismade__fetch();
  }

  let sequences = transaction.objectStore( "sequences__painted" );
  let ind = sequences.index( "parent__offset" );
  let r1 = ind.openCursor( range );
  r1.onsuccess = db__calismade__remove__each;
}

function db__calismade__remove__each( event )
{
  var request = event.target;
  if ( request.result )
  {
    request.result.source.objectStore.delete( request.result.primaryKey );
    var pin = request.result.value;
    request.result.continue();
  }
}
