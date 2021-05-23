class neodna__Gaaden
{
  constructor()
  {
    this.db__id       = -1;
    this.db__sequence = -1;
    this.db__painted  = new Array();
    this.db__fortunes = new Array();

    this.__stack__center          = 0;
    this.__stack__left            = 0;
    this.__stack__left__packets   = 0;
    this.__stack__right           = 0;
    this.__stack__right__packets  = 0;
    this.__stack__pins            = 0;

    this.painted  = new Array(); // add sequence using index i
    this.programs = new Array(); // add programs ( other sequences ) to index i

    this.pandeminium   = new neodna__Pandeminium();
    this.calismade     = new neodna__Calismade ( 20, 0 );
    this.fortunes      = new neodna__Fortunes  ( 20, 0 );
    this.satelytes     = new neodna__Satelytes ();
  }

  init()
  {
    this.calismade.init(); // container for motes
    this.calismade.size();
    this.fortunes.init();
    this.fortunes.size();
  }

  progress()
  {
    console.log( this );
    console.log( 'this.pandeminium.__loaded=', this.pandeminium.__loaded );
    console.log( 'this.satelytes.__loaded=', this.satelytes.__loaded );
    if ( this.pandeminium.__loaded
      && this.satelytes.__loaded )
      this.loaded();
  }

  loaded()
  {
    console.log( 'gaaden is loaded' );
    var stack = this.__stack__center;
    this.satelytes.program( stack.sequence );
    this.satelytes.link();
    /*
    for ( let satelyte of this.satelytes.satelytes )
    {
      // load program
      var stack = this.__stack__center;
      satelyte.program( stack.sequence );

      // load library
      if ( satelyte.oldenscrybe__id )
      {
        var parisfair = this.pandeminium.parisfair;
        var oldenscrybe = parisfair.get( satelyte.oldenscrybe__id );
        if ( oldenscrybe )
          satelyte.link( oldenscrybe );
      }

      satelyte.reset();
    }
    */
  }

  set( sequence )
  {
    var stack = gaaden.__stack__center;
    stack.sequence.set( sequence );
    stack.sequence.set__offset ( 0 );
    stack.sequence.build();

    //console.log( 'programming satelytes=', stack.sequence );
    this.satelytes.program( stack.sequence );
    this.satelytes.reset();
  }

  offset( n ) // refine this later to avoid rebuilds
  {
    var stack = this.__stack__center;
    stack.sequence.add__offset( n );
    this.update();
    var elem = document.getElementById( "gaaden__calismade__pos__value" );
    elem.innerHTML = stack.sequence.sequence__clip__start;
  }

  load__calismade() // called after db load in transaction oncomplete
  {
    this.calismade.clear();
    for ( let pin of this.db__painted )
    {
      this.calismade.add( {
        i:     pin.i,
        color: pin.color
      } );
    }

    this.calismade.size ();
    this.calismade.read ();
    this.calismade.draw ();
  }

  load__fortunes() // called after db load in transaction oncomplete
  {
    this.fortunes.clear();
    for ( let pin of this.db__fortunes )
    {
      this.fortunes.add( {
        id:    pin.id,
        color: pin.color
      } );
    }

    this.fortunes.size();
    this.fortunes.read();
    this.fortunes.draw();
  }

  add__painted( index, color )
  {
    db__calismade__add( index, color );
  }

  remove__painted( index)
  {
    db__calismade__remove( index );
  }

  update__stack( stack, push = 0 )
  {
    stack.sequence.build();
    var clip__input = stack.sequence.get();

    var w = stack.sequence.getwidth  ();
    var h = stack.sequence.getheight ();

    stack.canvas.split( w, h ); // rebuild rack
    stack.canvas.use  ( stack.canvas.nest ); // keep nest
    //stack.canvas.caoi ( caoi__binary );

    stack.blocks = new neodna__Blocks( w, h, stack );
    stack.blocks.build();
    stack.blocks.data( clip__input.clip__focus );
    if ( push )
      stack.blocks.data__push();
  }

  update__stacks()
  {
    var stack = this.__stack__center;
    this.update__stack( stack );
    var primary = stack.sequence;

    var stack = this.__stack__left;
    stack.sequence.set( primary.get().clip__leading );
    this.update__stack( stack, 1 );

    var stack = this.__stack__right;
    stack.sequence.set( primary.get().clip__trailing );
    this.update__stack( stack );

    var stack = this.__stack__left__packets;
    stack.sequence.packets( primary );
    this.update__stack( stack );

    var stack = this.__stack__right__packets;
    stack.sequence.set( __init__stack__packets( primary ) );
    this.update__stack( stack );
  }

  update__painted()
  {
    var stack     = this.__stack__center;
    var sequence  = stack.sequence;
    var canvas    = stack.canvas;
    var rack      = canvas.rack;
    if ( !rack )
      return;
    for ( let mote of this.calismade.motes )
    {
      if ( mote.i >= sequence.sequence__clip__start
        && mote.i  < sequence.sequence__clip__end )
      {
        var start = mote.i - sequence.sequence__clip__start;
        var y = Math.floor( start / rack.sX );
        var x = start - ( y * rack.sX );
        var unit = canvas.getXY( x, y );
        if ( unit )
        {
          unit.__flags.setflag( __STACK__PAINTED );
          unit.modified = 1;
          unit.color = mote.color;
        }
      }
    }

  }

  update__fortune()
  {
    var elem = document.getElementById( "gaaden__fortune__name__input" );
    if ( elem )
    {
      elem.value = this.db__name;
      //console.log( 'changing value to name=', this.db__name );
    }
  }

  refresh()
  {
    this.update__fortune ();
    this.update__stacks  ();
    this.update__painted ();
  }

  update()
  {
    var elem = document.getElementById( "gaaden__calismade__pos__value" );
    elem.innerHTML = this.__stack__center.sequence.sequence__clip__start;
  }

  to( index )
  {
    var sequence = this.__stack__center.sequence;
    sequence.to( index );
    var elem = document.getElementById( "gaaden__calismade__pos__value" );
    elem.innerHTML = index;
  }

  changed() // changed sequence from one to another
  {
    // load the __stack__center sequence into all satelytes as the program
    //this.satelytes.program( this.__stack__center.sequence );

    // set the data of each satelyte to __stack__center
    for ( let satelyte of this.satelytes.satelytes )
    {
      if ( satelyte.__flags.isflag( __STACK__SATELYTE__LOCKED ) )
        continue;
      //satelyte.set( this.__stack__center.sequence.get().clip__focus );
      //satelyte.reset();
      //satelyte.clear();
      //satelyte.blank();
      //satelyte.attach( satelyte.stack.blocks );
      //satelyte.attach ( this.__stack__center.blocks, 0 );
      //satelyte.read   ();
      //satelyte.attach ( satelyte.stack.blocks, 0 );
    }

  }

  focus()
  {
    var sequence = this.__stack__center.sequence.get();
    console.log( 'focus=', sequence );
    return sequence.clip__focus;
  }

  draw( f = 0 )
  {
    this.__stack__center.draw( f );
    this.__stack__center.resize();

    this.__stack__left.draw( f );
    this.__stack__left.resize();

    this.__stack__right.draw( f );
    this.__stack__right.resize();

    this.__stack__left__packets.draw( f );
    this.__stack__left__packets.resize();

    this.__stack__right__packets.draw( f );
    this.__stack__right__packets.resize();

    var elem = document.getElementById( "neodna__latherituum" );
    //var width = this.width();
    var height = this.height();
    //obj.style.width  = stack.canvas.width  + 'px';
    elem.style.height = height + 'px';
    //obj.width        = stack.canvas.width;
    elem.height       = height;

  }

  height()
  {
    var height = (
        this.__stack__center         .height()
      + this.__stack__left           .height()
      + this.__stack__right          .height()
      + this.__stack__left__packets  .height()
      + this.__stack__right__packets .height()
    );
    //console.log( 'latherituum height = ', height );
    return height;
  }

  adjust( amount )
  {
  	var stack  = this.__stack__center;
  	var canvas = stack.canvas;
  	var mouse  = canvas.mouse;
  	if ( mouse.current__clicked.x >= 0
  		&& mouse.current__clicked.y >= 0 )
  	{
  		var unit = canvas.getXY(
  			mouse.current__clicked.x,
  			mouse.current__clicked.y
  		);
  		if ( unit )
  		{
  			unit.modified = 1;
  			unit.__flags.endflag( __STACK__MOUSE__CLICKED );
  		}

  		mouse.current__clicked.x = -1;
  		mouse.current__clicked.y = -1;
  	}

  	this.offset( amount );
  	this.refresh();
    this.changed();
  	this.draw( 1 );
    //this.haidentot.draw( 1 );
    //this.satelytes.draw( 1 );
  	// Play the animation
  	//this.play();
  }

  play()
  {
    //this.haidentot.play();
    this.satelytes.play();
  }
}
/*
function __adjust__gaaden__down( amount )
{
  __gaaden__left__interval__var = amount;
  __gaaden__left__interval = setInterval( __adjust__gaaden__interval, 10 );
  gaaden.adjust( __gaaden__left__interval__var );
}

function __adjust__gaaden__interval( e )
{
  //console.log( 'adjusting gaaden' );
  gaaden.adjust( __gaaden__left__interval__var );
}

var __gaaden__left__interval      = 0;
var __gaaden__left__interval__var = 0;
*/
