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
    this.chryoch       = new neodna__Chryoch();
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
    console.log( 'this.chryoch.__loaded=', this.chryoch.__loaded );
    if ( this.pandeminium.__loaded
      && this.chryoch.__loaded )
      this.loaded();
  }

  loaded()
  {
    console.log( 'gaaden is loaded' );
    var stack = this.__stack__center;
    this.chryoch.program( stack.sequence );
    this.chryoch.link();
  }

  set( sequence )
  {
    var stack = gaaden.__stack__center;
    stack.set( sequence );

    this.chryoch.program( stack.sequence );
    this.chryoch.reset();
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
      elem.value = this.db__name;
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

  changed()
  {
    /*
    for ( let satelyte of this.chryoch.satelytes )
    {
      if ( satelyte.__flags.isflag( __STACK__SATELYTE__LOCKED ) )
        continue;
    }
    */
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
  }

  play()
  {
    this.chryoch.play();
  }
}
