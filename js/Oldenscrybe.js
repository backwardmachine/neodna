class neodna__PdmnOldenscrybe
{
  constructor( id, name, color )
  {
    this.id = id;
    this.name = name;
    this.color = color;
    this.itinerary = new neodna__PdmnItinerary();
    this.canterroll = new neodna__PdmnCanterroll();
    this.subscribers = new Array();
  }

  rollout()
  {
    var list = new Array();
    for ( let tomeid of this.itinerary.positions )
    {
      var tome = pandeminium.phylactery.get( tomeid );
      if ( tome )
      {
        for ( let codexid of tome.itinerary.positions )
        {
          list.push ( codexid );
        }
      }
    }

    list.sort( function( a, b ) {
      return a - b;
    } );
    //console.log( list );
    var set    = new Array();
    var unique = [...new Set( list )];
    for ( let id of unique )
    {
      var codex = pandeminium.library.get( id );
      if ( codex )
      {
        set.push( {
          id:     id,
          object: codex
        } );
      }
    }
    //console.log( set );
    this.canterroll.set( set );
  }

  build()
  {
    //console.log( 'this oldenscrybe canterroll=', this.canterroll );
  }

  refresh()
  {
    console.log( 'refreshing affected oldenscrybe=', this );
    pandeminium.phylactery.deselect();
    pandeminium.phylactery.itinerary( this.itinerary );
    pandeminium.phylactery.select();

    this.rollout();

    // refresh all satelytes
    for ( let satelyte of this.subscribers )
    {
      satelyte.oldenscrybe = this;
      satelyte.reset();
    }
  }

  subscribe( haidentot )
  {
    this.subscribers.push( haidentot );
  }

  unsubscribe( haidentot )
  {
    var i = 0;
    for ( let subscriber of this.subscribers )
    {
      if ( subscriber.id == haidentot.id )
        this.subscribers.splice( i, 1 );
      i++;
    }
  }
}
