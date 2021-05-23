class neodna__PdmnCanterroll
{
  constructor()
  {
    this.itinerary = 0;
    this.data    = '';
    this.boundary = {
      x: 0,
      y: 0
    };
  }

  set( itinerary )
  {
    this.itinerary = itinerary;
    this.boundary = {
      x: this.itinerary.length,
      y: 0
    };
  }

  at( x, y )
  {
    if ( this.itinerary[ x ] )
      return this.itinerary[ x ];
    return 0;
  }
/*
  build( oldenscrybe )
  {
    this.ids = oldenscrybe.list();
    console.log( 'got oldenscrybe ids = ', this );
    //this.objects
  }
  */
/*
  rollout()
  {
    for ( this.data as words )
    {
      for each ( word )
      {
        Handler[ id ]( cursor )
        this.strange = {
          x: cursor.libX,
          y: cursor.libY
        };
      }
    }
  }
  */
}
