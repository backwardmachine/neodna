class neodna__PdmnPhylactery
{
  constructor()
  {
    this.tomes              = new Array();
    this.selection          = new Array();
    this.stack              = 0;
    this.tome__over         = 0;
    this.tome__over__       = 0;
    this.tome__selected     = -1;
    this.tome__selected__   = 0;
    this.__loaded           = 0;
  }

  init()
  {
    var __cfg = {
      leading	 		: 0,
      trailing 		: 0,
      width		 		: 18,
      length	 		: 20000,
      nest		 		: "__canvas__phylactery",
      container   : "neodna__pdmn__phylactery",
      caoi		 		: caoi__binary__phylactery,
      pixels	 		: { x: 10, y: 10 },
      visible  		: 2000
    };

    this.stack = __init__stack( '10101001101011010100', __cfg );
    __init__mouse( this.stack, __cfg.container );
    this.stack.canvas.mouse = new neodna__Mouse();
    this.stack.canvas.mouse.fns.click
      = __init__phylactery__mouse__click.bind( this.stack.canvas );
    this.stack.canvas.mouse.fns.over
      = __init__phylactery__mouse__over.bind( this.stack.canvas );
    this.changed();
  }

  loaded()
  {
    this.__loaded = 1;
    console.log( 'phylactery has loaded' );
    pandeminium.progress();
  }

  add( tome )
  {
    this.tomes.push( tome );
  }

  set( data )
  {
    this.stack.set( data );
    //this.selection(); // reflag selection
  }

  get( id )
  {
    for ( let tome of this.tomes )
    {
      if ( tome.id == id )
        return tome;
    }
    return 0;
  }

  position( tome )
  {
    if ( tome )
    {
      var i = 0;
      for ( let tome__ of this.tomes )
      {
        if ( tome__.id == tome.id )
          return i;
        i++;
      }
    }
    return -1;
  }

  clicked( position, on = 1 )
  {
    var canvas = this.stack.canvas;
    var coords = canvas.coords( position + 1 );
    //console.log( 'coords=', coords );
    var unit = canvas.getXY( coords.x, coords.y );
    if ( unit )
    {
      on ? unit.__flags.setflag( __STACK__MOUSE__SELECTION )
         : unit.__flags.endflag( __STACK__MOUSE__SELECTION );
    }
  }

  selected( id )
  {
    var n = 0;
    for ( let __id of this.selection )
    {
      if ( __id == id )
        n++;
    }
    if ( !n )
      this.selection.push( id );
  }

  changed()
  {
    pandeminium.changed();

    var data = '';
    var i = 0;
    for (
      i = 0;
        i < this.tomes.length + 1;
          i++ )
      data += '1';
    this.set( data );

    // do stuff to new instance of blocks and canvas
    var unit = this.stack.canvas.getXY( 0, 0 );
    unit.caoi = new Array();
    unit.caoi.push( caoi__binary__plus );

    this.associate();
    this.select();
  }

  refresh( id )
  {
    // refresh all the oldenscrybe that use this tome
    var oldenscrybe__list = new Array();
    for ( let oldenscrybe of pandeminium.parisfair.oldenscrybe )
    {
      console.log( 'looking at oldenscrybe=', oldenscrybe );
      for ( let __id of oldenscrybe.itinerary.positions )
      {
        if ( __id == id )
        {
          console.log( 'found affected oldenscrybe' );
          oldenscrybe__list.push( oldenscrybe );
        }
      }
    }

    for ( let oldenscrybe of oldenscrybe__list )
    {
      oldenscrybe.refresh();
    }
    /*
    var tome = this.get( id );
    if ( tome )
    {
      var itinerary = tome.itinerary;
      console.log( 'itinerary=', itinerary );
      pandeminium.furnace.deselect();
      pandeminium.furnace.itinerary( itinerary );
      pandeminium.furnace.select();
    }
    */
  }

  associate()
  {
    var i = 1;
    for ( let tome of this.tomes )
    {
      if ( this.stack.blocks.blocks.length > i )
      {
        var block = this.stack.blocks.blocks[ i ];
        block.data     = tome;
        block.modified = 1;
      }
      i++;
    }
  }

  deselect()
  {
    for ( let id of this.selection )
    {
      var tome = this.get( id );
      if ( tome )
      {
        var position = this.position( tome );
        if ( position != -1 )
          this.clicked( position, 0 );
      }
    }
  }

  itinerary( itinerary )
  {
    this.selection = new Array();
    if ( itinerary.positions.length )
    {
      for ( let id of itinerary.positions )
      {
        var tome = this.get( id );
        if ( tome )
          this.selected( tome.id );
      }
    }

    pandeminium.furnace.deselect();
    pandeminium.furnace.selection = new Array();
    for ( let id of this.selection )
    {
      var tome = this.get( id );
      if ( tome )
        pandeminium.furnace.itinerary( tome.itinerary );
    }
    pandeminium.furnace.select();
  }

  select()
  {
    for ( let id of this.selection )
    {
      var tome = this.get( id );
      if ( tome )
      {
        var position = this.position( tome );
        if ( position != -1 )
          this.clicked( position, 1 );
      }
    }
  }

  draw( f = 0 )
  {
    this.stack.draw( 1 );
  }
}
