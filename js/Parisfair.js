class neodna__PdmnParisfair
{
  constructor()
  {
    this.stack = 0;
    this.oldenscrybe = new Array();
    this.oldenscrybe__over = 0;
    this.oldenscrybe__selected = 0;
    this.host = 0;
    this.canterroll = new Array(); // a straight ordered list of codex ie. 3, 54, 23, 56, 53
  }

  init()
  {
    var __cfg = {
      leading	 		: 0,
      trailing 		: 0,
      width		 		: 18,
      length	 		: 20000,
      nest		 		: "__canvas__parisfair",
      container   : "neodna__pdmn__parisfair",
      caoi		 		: caoi__binary__parisfair,
      pixels	 		: { x: 10, y: 10 },
      visible  		: 2000
    };

    this.stack = __init__stack( '10101001101011010100', __cfg );
    __init__mouse( this.stack, __cfg.container );
    this.stack.canvas.mouse = new neodna__Mouse();
    this.stack.canvas.mouse.fns.click
      = __init__parisfair__mouse__click.bind( this.stack.canvas );
    this.stack.canvas.mouse.fns.over
      = __init__parisfair__mouse__over.bind( this.stack.canvas );
    this.changed();
  }

  loaded()
  {
    this.__loaded = 1;
    pandeminium.progress();
    console.log( 'parisfair has loaded' );
  }

  select()
  {
    // restore previous
    var oldenscrybe = 0;
    var id = this.oldenscrybe__selected;
    if ( id )
      oldenscrybe = this.get( id );
    if ( !oldenscrybe && this.oldenscrybe.length )
      oldenscrybe = this.oldenscrybe[ this.oldenscrybe.length - 1 ];
    if ( oldenscrybe )
      this.selected( oldenscrybe.id );
  }

  rollout()
  {
    for ( let oldenscrybe of this.oldenscrybe )
    {
      oldenscrybe.rollout();
      oldenscrybe.build();
    }

    //for ( let satelyte of gaaden.satelytes.satelytes )
    //  satelyte.reset();
  }

  add( oldenscrybe )
  {
    this.oldenscrybe.push( oldenscrybe );
  }

  set( data )
  {
    this.stack.set( data );
    //this.selection(); // reflag selection
  }

  get( id )
  {
    for ( let oldenscrybe of this.oldenscrybe )
    {
      if ( oldenscrybe.id == id )
        return oldenscrybe;
    }
    return 0;
  }

  position( oldenscrybe )
  {
    if ( oldenscrybe )
    {
      var i = 0;
      for ( let oldenscrybe__ of this.oldenscrybe )
      {
        //console.log( 'testing ' + oldenscrybe__.id + ' for ' + oldenscrybe.id );
        if ( oldenscrybe__.id == oldenscrybe.id )
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
    var unit = canvas.getXY( coords.x, coords.y );
    on ? unit.__flags.setflag( __STACK__MOUSE__CLICKED )
       : unit.__flags.endflag( __STACK__MOUSE__CLICKED );
  }

  adjusted(
    oldenscrybe__next,
    oldenscrybe__previous )
  {
    pandeminium.phylactery.tome__selected = -1;
  }

  to( id )
  {
    console.log( 'setting oldenscrybe to id=', id );
    var oldenscrybe = this.selected( id );
    if ( oldenscrybe )
    {
      if ( this.host )
      {
        this.host.link( oldenscrybe );
        this.host.reset();
      }
    }
  }

  selected( id )
  {
    var oldenscrybe = this.get( id );
    if ( !oldenscrybe )
      return; // no change
    if ( this.oldenscrybe__selected != -1 )
    {
      if ( id == this.oldenscrybe__selected )
        return; // no change
      var oldenscrybe__previous = this.get( this.oldenscrybe__selected );
      if ( oldenscrybe__previous )
      {
        if ( oldenscrybe__previous.id != id ) // change of oldenscrybe
          this.adjusted( oldenscrybe, oldenscrybe__previous );
        var position = this.position( oldenscrybe__previous );
        if ( position != -1 )
          this.clicked( position, 0 );
      }
    }

    this.oldenscrybe__selected = oldenscrybe.id;

    var position = this.position( oldenscrybe );
    if ( position != -1 )
      this.clicked( position, 1 );

    this.refresh( id );

    return oldenscrybe;
  }

  changed()
  {
    pandeminium.changed();

    var data = '';
    var i = 0;
    for (
      i = 0;
        i < this.oldenscrybe.length + 1;
          i++ )
      data += '1';
    this.set( data );

    // do stuff to new instance of blocks and canvas
    var unit = this.stack.canvas.getXY( 0, 0 );
    unit.caoi = new Array();
    unit.caoi.push( caoi__binary__plus );

    this.associate();
    this.selected( this.oldenscrybe__selected );
  }

  refresh( id )
  {
    console.log( 'refreshing oldenscrybe=', id );
    var oldenscrybe = this.get( id );
    if ( oldenscrybe )
    {
      var itinerary = oldenscrybe.itinerary;
      pandeminium.phylactery.deselect();
      pandeminium.phylactery.itinerary( itinerary );
      pandeminium.phylactery.select();

      oldenscrybe.rollout();
    }
  }

  associate()
  {
    var i = 1;
    for ( let oldenscrybe of this.oldenscrybe )
    {
      if ( this.stack.blocks.blocks.length > i )
      {
        var block = this.stack.blocks.blocks[ i ];
        block.data     = oldenscrybe;
        block.modified = 1;
      }
      i++;
    }
  }

  watch( satelyte )
  {
    this.host = satelyte;
    if ( satelyte.skutterer )
    {
      if ( satelyte.skutterer.oldenscrybe )
      {
        console.log( 'using satelyte oldenscrybe=', satelyte.skutterer.oldenscrybe );
        this.selected( satelyte.skutterer.oldenscrybe.id );
        pandeminium.draw( 1 );
      }
      else if ( this.oldenscrybe__selected != -1 )
      {
        var oldenscrybe = this.get( this.oldenscrybe__selected );
        if ( oldenscrybe )
          satelyte.link( oldenscrybe );
      }

    }
    console.log( 'parisfair is hosting satelyte=', satelyte );
  }

  draw( f = 0 )
  {
    console.log( 'drawing parisfair with f=', f );
    this.stack.draw( f );
  }
}
