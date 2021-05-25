function __init__mouse__haidentot__over( px, py, e )
{
  //console.log( 'mouse is over canvas' );
  var unit = this.getXYp( px, py );
  if ( this.border.state != 4 )
  {
    this.border.on = 1;
    this.border.state = 1;
  }
}

function __init__mouse__haidentot__click( px, py, e )
{
  console.log( 'click at px=' + px + ', py = ' + py );
  var unit = this.getXYp( px, py );
  //if ( this.border.state == 4 )
    this.border.state = 2;
  //else
  //  this.border.state = 4;
  __init__pdmn__track( e );
}

function __init__mouse__haidentot__out( px, py, e )
{
  //console.log( 'mouse has moved away' );
  if ( this.border.state != 4 )
  {
    this.border.on = 1;
    this.border.state = 3;
    //this.draw__border();
    this.border.on = 0;
    this.border.state = 0;
  }
}

function __init__canvas__haidentot( nest, width, height )
{
  var elem = document.getElementById( nest );
  if ( elem )
    elem.onselectstart = function () { return false; }

  var canvas = new neodna__Canvas();
  canvas.split ( width, height ); // creates a rack
  canvas.span  ( 4, 4 );
  canvas.use   ( nest    );
  canvas.caoi  ( caoi__binary__clean );
  canvas.mouse = new neodna__Mouse( canvas );
  canvas.mouse.fns.click = __init__mouse__haidentot__click.bind( canvas );
  canvas.mouse.fns.over  = __init__mouse__haidentot__over.bind( canvas );
  canvas.mouse.fns.out   = __init__mouse__haidentot__out.bind( canvas );
  canvas.border = {
    on:       0,
    size:     5,
    state:    0,
    over:     '#ffffff',
    out:      '#000000',
    selected: '#b3b372',
    clicked:  '#ff00ff'
  };
  return canvas;
}


class neodna__Haidentot
{
  constructor( id )
  {
    this.id = id;
    this.name = '';
    this.stack = 0;
    this.sX = 40;
    this.sY = 40;
    this.ox = 20;
    this.oy = 20;
    this.skutterer = 0;
    this.animation = new neodna__Animation();
    this.oldenscrybe = 0;
    this.oldenscrybe__id = -1;
    this.nest = 0;
    this.src = 0;
    this.src__offset = 0;
    this.__flags = new neodna__Flags();
    this.__itinerary = 0;
  }

  init()
  {
    //console.log( 'building haidentot' );
    var stack    = new neodna__Stack();
    var sequence = new neodna__Sequence( '' );
    var str = '';
    var i = 0;
    for (
      i = 0;
        i < this.sX * this.sY;
          i++ )
      str += '0';
    sequence.set( str );
    sequence.set__width    ( this.sX );
    sequence.sequence__clip__length = 100000;
    sequence.build();
    stack.sequence = sequence;
    //console.log( 'haidentot=', this );
    this.stack = stack;
    this.construct();

    //this.animate();
  }

  set( sequence )
  {
    if ( !this.stack )
    {
      console.log( 'please use init() before attempting to set a sequence to this Haidentot.' );
      return 0;
    }
    var stack = this.stack;
    stack.sequence.set( sequence );
    stack.sequence.build();
    this.construct();
    return 1;
  }

  construct()
  {
    console.log( 'constructing haidentot' );
    var stack = this.stack;
    var nX = stack.sequence.getwidth();
    var nY = stack.sequence.getheight();

    // create canvas
    var canvas = __init__canvas__haidentot( this.nest, nX, nY );
    __init__mouse( stack, "neodna__satelyte__haidentot__" + this.id );
    stack.canvas = canvas;
    stack.canvas.intensity = 1;
    stack.canvas.intensity__on = 1;
    //console.log( stack.canvas.mouse );

    // create blocks filled with sequence data
    stack.blocks = new neodna__Blocks( nX, nY, stack );
    stack.blocks.build();
    stack.blocks.clear();
    stack.blocks.data  ( stack.sequence.get().clip__focus );

    if ( !this.src )
      this.src = this.stack.blocks;

    this.skutterer__begin();
  }

  animate()
  {

  }

  attach( data, offset )
  {
    this.src         = data;
    this.src__offset = offset;
    this.skutterer.__data = this.src;
  }

  update()
  {
    //console.log( 'updating haidentot' );
  }

  program( data )
  {
    var sequence = data.get();
    this.animation.program( sequence.clip__focus );
  }

  read()
  {
    var __src = this.src.blocks;
    var __dest = this.stack.blocks;

    for ( let block of __src )
    {
      var b = __dest.getXY(
        block.x,
        block.y
      );

      if ( b )
        b.data = block.data;
    }
  }

  forward( n )
  {
    if ( !this.stack )
    {
      console.log( 'please use init() before forward() is called.' );
      return 0;
    }
    if ( this.skutterer )
      return this.animation.forward( n, this.skutterer );
  }

  complete()
  {
    this.animation.complete( this.skutterer );
  }

  draw( f = 0 )
  {
    if ( !this.stack )
    {
      console.log( 'please use init() before draw() is called.' );
      return 0;
    }
    this.stack.draw( f );
    //this.stack.canvas.draw__buffer();
  }

  // set the region of the haidentot for drawing
  /*
  region( left, top, right, bottom )
  {
    /this.stack.region( left, top, right, bottom );
  }
  */

  clear()
  {
    this.stack.clear();
  }

  reset()
  {
    this.animation.reset();
    this.skutterer__begin();
    //this.program( gaaden.__stack__center.sequence );
    this.clear();
    this.blank();
    console.log( 'reset haidentot =', this );
  }

  blank()
  {
    this.stack.canvas.intensity__on = 0;
    this.draw( 0 ); // make sure we draw cleared pixels
    this.stack.canvas.intensity__on = 1;
  }

  play()
  {
    return;
    /*
  	this.reset();
  	var j = 0;
  	for (
  		j = 0;
  			j < 10;
  				j++ )
  	{
  		this.complete ();
  	}

    console.log( 'gaaden=', gaaden );
  	//console.log( 'played ' + ( i * j ) + ' frames ending at frame=' + haidentot.skutterer.frame );
    */
  }

  tome( tome )
  {
    this.__tome = tome;
  }

  // changed in this function are typically used by the program
  skutterer__begin()
  {
    this.skutterer = new neodna__Skutterer ( this.ox, this.oy );
    //this.skutterer.parent = this;
    this.skutterer.canvas = this.stack.canvas;
    this.skutterer.canvas.intensity = 1;
    this.skutterer.canvas.intensity__on = 1;
    this.skutterer.nX = this.sX;
    this.skutterer.nY = this.sY;
    this.skutterer.__data = this.src;
    this.skutterer.tome = this.__tome;
    //this.skutterer.itinerary = this.__itinerary;
    this.skutterer.oldenscrybe = this.oldenscrybe;
    //console.log( 'this.skutterer.itinerary=', this.skutterer.itinerary );
  }
/*
  itinerary( itinerary )
  {
    //console.log( 'setting itinerary for ', this );
    //console.log( 'to itinerary=', itinerary );
    this.__itinerary = itinerary;
    this.skutterer__begin();
  }
*/
  host( oldenscrybe )
  {
    /*
    console.log( 'haidentot is using new oldenscrybe=', oldenscrybe );
    var oldenscrybe__ = this.oldenscrybe;
    this.oldenscrybe = oldenscrybe;
    this.skutterer.oldenscrybe = oldenscrybe;
    if ( oldenscrybe
      && oldenscrybe__.id != oldenscrybe.id )
    {
      // change of oldenscrybe
    }
    */
  }

  link( oldenscrybe )
  {
    console.log( 'changing haidentot link to=', oldenscrybe );

    var oldenscrybe__previous = this.oldenscrybe;
    if ( oldenscrybe__previous
      && oldenscrybe__previous.id == oldenscrybe.id )
      return; // no change
    this.oldenscrybe = oldenscrybe;

    oldenscrybe          .subscribe   ( this );
    if ( oldenscrybe__previous )
      oldenscrybe__previous.unsubscribe ( this );

    var __haidentot = {
      id:          this.id,
      name:        this.name,
      color:       this.color,
      oldenscrybe: this.oldenscrybe.id
    };
    console.log( 'updating haidentot=', __haidentot );
    db__haidentot__update( __haidentot );

    //this.reset();
    //this.skutterer.oldenscrybe = oldenscrybe;
  }
}
