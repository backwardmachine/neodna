class neodna__DB
{
  constructor( name )
  {
    this.name       = name;
    this.connection = 0;
    this.on         = 0;
  }
}

var db = new neodna__DB( "manatysarerie" );
function db__init()
{
  let request = indexedDB.open( db.name, 26 );
  request.onupgradeneeded = function(event)
  {
    console.log( 'onupgradeneeded event=', event );
    // the existing database version is less than 2 (or it doesn't exist)
    db.connection = request.result;
    var DB = db.connection;
    console.log( 'oldversion=', event.oldVersion );
    switch( event.oldVersion ) { // existing db version
      case 0:
        // version 0 means that the client had no database
        // perform initialization
      case 1:

        const kp = { keyPath: 'id' };
        const ut = { unique: true };
        const uf = { unique: false };

        if ( !DB.objectStoreNames.contains( 'sequences' ) )
        {
          var s = DB.createObjectStore( 'sequences', kp );
          s.createIndex( "id", "id", ut );
        }

        if ( !DB.objectStoreNames.contains( 'sequences__ids' ) )
        {
          var s = DB.createObjectStore( 'sequences__ids', kp );
          s.createIndex( "id", "id", ut );
        }

        if ( !DB.objectStoreNames.contains( 'sequences__painted' ) )
        {
          var s = DB.createObjectStore( 'sequences__painted', kp );
          s.createIndex( "id",     "id",     ut );
          s.createIndex( "parent", "parent", uf );
          s.createIndex( "offset", "offset", uf );
          var arr = [ "parent", "offset" ];
          s.createIndex( "parent__offset", arr, ut );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__codes' ) )
        {
          var s = DB.createObjectStore( 'pdmn__codes', kp );
          s.createIndex( "id", "id", ut );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__codex' ) )
        {
          var s = DB.createObjectStore( 'pdmn__codex', kp );
          s.createIndex( "id", "id", ut );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__codex__codes' ) )
        {
          var s = DB.createObjectStore( 'pdmn__codex__codes', kp );
          s.createIndex( "id",     "id",     ut );
          s.createIndex( "codex",  "codex", uf );
          s.createIndex( "code",   "code", uf );
          var arr = [ "codex", "code" ];
          s.createIndex( "codex__code", arr, uf );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__tomes' ) )
        {
          var s = DB.createObjectStore( 'pdmn__tomes', kp );
          s.createIndex( "id", "id", ut );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__tomes__codex' ) )
        {
          var s = DB.createObjectStore( 'pdmn__tomes__codex', kp );
          s.createIndex( "id",    "id",    ut );
          s.createIndex( "tome",  "tome",  uf );
          s.createIndex( "codex", "codex", uf );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__oldenscrybe' ) )
        {
          var s = DB.createObjectStore( 'pdmn__oldenscrybe', kp );
          s.createIndex( "id", "id", ut );
        }

        if ( !DB.objectStoreNames.contains( 'pdmn__oldenscrybe__tomes' ) )
        {
          var s = DB.createObjectStore( 'pdmn__oldenscrybe__tomes', kp );
          s.createIndex( "id",           "id",           ut );
          s.createIndex( "oldenscrybe",  "oldenscrybe",  uf );
          s.createIndex( "tome",         "tome",         uf );
        }

        if ( !DB.objectStoreNames.contains( 'haidentot' ) )
        {
          var s = DB.createObjectStore( 'haidentot', kp );
          s.createIndex( "id", "id", ut );
        }
    }
  };

  request.onerror = function() {
    console.log( 'database failed to open', request.error );

  };

  request.onsuccess = function() {
    console.log( 'database opened successfully' );
    db.connection = request.result;
    db.on         = 1;

    db__init__pdmn();
    db__init__fortunes();
    db__init__haidentot();
  };

  return db;
}

function db__init__fortunes ()
{
  let transaction
    = db.connection.transaction( "sequences__ids", "readwrite" );
  transaction.oncomplete = function() {
    gaaden.load__fortunes();
  }
  let sequences = transaction.objectStore( "sequences__ids" );
  let r1 = sequences.getAll();
  r1.onsuccess = db__init__fortunes__store;
}

function db__init__fortunes__store( event )
{
  var request = event.target;
  console.log( 'fortunes were loaded from DB', request.result );
  var fortunes = request.result;
  gaaden.db__fortunes = new Array();
  for ( let fortune of fortunes )
    gaaden.db__fortunes.push( fortune );
}
