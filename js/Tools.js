class neodna__Tools
{
  constructor( parent, cfg )
  {
    this.stack = 0;
    this.__cfg = cfg;
    this.parent = parent;
    this.items = parent.items();
    this.mouse = {
      clicked: 0,
      hovered: 0,
      selected: new Array()
    };
  }

  init()
  {
    var sequence = '';
    for ( let item of this.items )
      sequence += '1';

    this.stack = __init__stack( sequence, this.__cfg );
    __init__mouse( this.stack, "neodna__chryoch__tools" );
    var fn = __init__mouse__chryoch__tools.bind( this );
    fn();
    var canvas = this.stack.canvas;
    canvas.mouse = new neodna__Mouse( canvas );
    canvas.mouse.fns.click = __init__mouse__chryoch__tools__click .bind( this );
    canvas.mouse.fns.over  = __init__mouse__chryoch__tools__over  .bind( this );
    canvas.mouse.fns.out   = __init__mouse__chryoch__tools__out   .bind( this );
  }

  resize()
  {
    this.stack.resize();
  }

  draw( f = 0 )
  {
    this.stack.draw( f );
  }
}
