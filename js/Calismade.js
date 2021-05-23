class neodna__Calismade
{
  constructor( x, y )
  {
    this.stack = new neodna__Stack();
    this.sX    = x;
    this.sY    = y;
    this.motes = new Array();
  }

  init()
  {
    this.stack.container = "gaaden__calismade";

    var __init__vars__canvas = {
      nest:      "__canvas__calismade",
      n__x:      this.sX,
      n__y:      this.sY,
      unit__px:  25,
      unit__py:  25
    }

    this.stack.canvas = __init__canvas(
      __init__vars__canvas
    );
    this.stack.canvas.caoi( caoi__binary__mote );
    this.stack.canvas.background = '#004466';

    __init__blocks__mouse        ( this.stack, "__canvas__calismade" );
    __init__blocks__mouse__click ( this.stack.canvas, __STACK__CALISMADE );
    __init__blocks__mouse__over  ( this.stack.canvas, __STACK__CALISMADE );

    //console.log( 'object=', this.stack.canvas.object );
  }

  size()
  {
    if ( this.sX )
      this.sY = Math.ceil( this.motes.length / this.sX );
    else
      this.sY = 0;
    //console.log( 'sy=', this.sY );

    // create canvas
    var canvas = this.stack.canvas;
    canvas.split(
      this.sX,
      this.sY
    );
    canvas.use( canvas.nest );
    this.stack.resize();

    var elem = document.getElementById( "gaaden__calismade__outer" );
    var height = canvas.height + 50;
    var height = Math.max( 100, height );
    elem.style.height = height + 'px';
    elem.height       = height;

    // create data
    this.stack.blocks = new neodna__Blocks(
      this.sX,
      this.sY,
      this
    );
    this.stack.blocks.build();
  }

  add( mote )
  {
    this.motes.push( mote );
  }

  clear()
  {
    this.motes = new Array();
  }

  read()
  {
    //console.log( 'setting calismade=', this );
    var blocks = this.stack.blocks;
    var i = 0;
    for ( let mote of this.motes )
    {
      var y = Math.floor( i / this.sX );
      var x = i - ( y * this.sX );
      var block = blocks.getXY( x, y );
      if ( block )
        block.data = mote;
      //block.data = mote.color;
      i++;
    }
  }

  draw()
  {
    this.stack.draw( 1 );
  }
}
