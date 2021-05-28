class neodna__Latherituum
{
  constructor( sequence, __cfg )
  {
    this.sequence = sequence;
    this.__cfg    = __cfg;
    this.__stacks = new Array();

    var i = 0;
    for (
      i = 0;
        i < 5;
          i++
    )
      this.__stacks.push( 0 );
  }

  init()
  {
    var __cfg = {
      leading	 		: 216,
      trailing 		: 216,
      width		 		: 36,
      length	 		: 20000,
      nest		 		: this.__cfg.prefix + "__feature__canvas",
      container   : this.__cfg.prefix + "__feature",
      caoi		 		: caoi__latherituum,
      pixels	 		: { x: 24, y: 24 },
      visible  		: 108
    };

    this.__stacks[ 0 ] = __init__stack( this.sequence, __cfg );
    var feature = this.__stacks[ 0 ];
    feature.canvas.mouse            = new neodna__Mouse();
    feature.canvas.mouse.fns.click  = __init__latherituum__feature__mouse__click.bind( feature.canvas );
    feature.canvas.mouse.fns.over   = __init__latherituum__feature__mouse__over .bind( feature.canvas );
    feature.canvas.text = 1;
    feature.canvas.__cfg.text = this.__cfg.text.profiles[ 0 ];

    __init__latherituum__feature__curse ( this.__cfg.prefix, this, feature );
    __init__latherituum__feature__mouse ( this.__cfg.prefix, this, feature );

    var __cfg = {
      leading  	: 0,
      trailing 	: 0,
      width 	 	: 108,
      nest		 	: this.__cfg.prefix + "__left__canvas",
      container : this.__cfg.prefix + "__left",
      caoi  	 	: caoi__latherituum__side,
      pixels	 	: { x: 8, y: 8 }
    };

    this.__stacks[ 1 ] = __init__stack( feature.sequence.get().clip__leading, __cfg );
    this.__stacks[ 1 ].canvas.__cfg.text = this.__cfg.text.profiles[ 1 ];

    var __cfg = {
      leading  	: 0,
      trailing 	: 0,
      width 	 	: 108,
      nest		 	: this.__cfg.prefix + "__left__packets__canvas",
      container : this.__cfg.prefix + "__left__packets",
      caoi  	 	: caoi__latherituum__packet,
      pixels	 	: { x: 8, y: 8 }
    };

    var blob = __init__stack__packets__left( feature.sequence );
    this.__stacks[ 2 ] = __init__stack( blob, __cfg );

    var __cfg = {
      leading 		: 0,
      trailing 		: 0,
      width 	 		: 108,
      nest				: this.__cfg.prefix + "__right__canvas",
      container   : this.__cfg.prefix + "__right",
      caoi  	 		: caoi__latherituum__side,
      pixels	 		: { x: 8, y: 8 }
    };

    this.__stacks[ 3 ]  = __init__stack( feature.sequence.get().clip__trailing, __cfg );
    this.__stacks[ 3 ].canvas.__cfg.text = this.__cfg.text.profiles[ 1 ];

    var __cfg = {
      leading  	: 0,
      trailing 	: 0,
      width 	 	: 108,
      nest		 	: this.__cfg.prefix + "__right__packets__canvas",
      container : this.__cfg.prefix + "__right__packets",
      caoi  	 	: caoi__latherituum__packet,
      pixels	 	: { x: 8, y: 8 }
    };

    var blob = __init__stack__packets( feature.sequence );
    this.__stacks[ 4 ] = __init__stack( blob, __cfg );
  }

  words( n, array )
  {
    var i = 0;
    for (
      i = 0;
        i < this.__stacks.length;
          i++ )
    {
      //console.log( this.__stacks[ i ] );
      var sequence = this.__stacks[ i ].sequence;
      //console.log( sequence );
      sequence.words( n, array );
      var canvas = this.__stacks[ i ].canvas;
      canvas.__cfg.words = {
        n: n,
        array: array
      };
    }

    this.refresh();
    //console.log( this.__stacks[ 0 ] );
  }

  update()
  {
    this.__stacks[ 0 ].update();
    var primary = this.__stacks[ 0 ].sequence;

    this.__stacks[ 1 ].sequence.set( primary.get().clip__leading );
    this.__stacks[ 2 ].sequence.set( __init__stack__packets__left( primary ) );
    this.__stacks[ 3 ].sequence.set( primary.get().clip__trailing );
    this.__stacks[ 4 ].sequence.set( __init__stack__packets( primary ) );

    var i = 0;
    for (
      i = 1;
        i < this.__stacks.length;
          i++ )
      this.__stacks[ i ].update();
    this.__stacks[ 4 ].blocks.data__push();
  }

  refresh()
  {
    this.update();
  }

  changed()
  {

  }

  offset( n )
  {
    this.__stacks[ 0 ].sequence.add__offset( n );
  }

  adjust( amount )
  {
    var stack  = this.__stacks[ 0 ];
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

  draw( f = 0 )
  {
    //console.log( this.__stacks[ 0 ] );
    for ( let stack of this.__stacks )
    {
      stack.draw( f );
      stack.resize();
    }

    var elem = document.getElementById( this.__cfg.prefix );
    if ( elem )
    {
      var height = this.height();
      elem.style.height = height + 'px';
      elem.height       = height;
    }
  }

  height()
  {
    var h = 0;
    for ( let stack of this.__stacks )
      h += stack.height();
    return h + 20 + 25;
  }
}

function __init__latherituum__feature__mouse ( prefix, latherituum, stack )
{
  var elem = document.getElementById( prefix + "__feature" );
  elem.onclick = function ( e )
  {
    var pixel = getpixel( e );
    this.click( pixel.px, pixel.py );
  }.bind( stack );

  elem.onmousemove = function ( e )
  {
    console.log( 'mouse moving over latherituum' );
    var pixel = getpixel( e );
    this.over( pixel.px, pixel.py );
  }.bind( stack );

  elem.onmouseout = function ( e )
  {
    var pixel = getpixel( e );
    this.out( pixel.px, pixel.py );
  }.bind( stack );
}

function __init__latherituum__feature__mouse__click( px, py )
{
  console.log( 'click at px=' + px + ', py = ' + py );

  var unit__clicked = this.getXY(
    this.mouse.current__clicked.x,
    this.mouse.current__clicked.y
  );
  if ( unit__clicked )
  {
    unit__clicked.__flags.endflag( __STACK__MOUSE__CLICKED );
    unit__clicked.modified = 1;
  }

  var unit = this.getXYp( px, py );
  if ( unit )
  {
    console.log( 'unit=', unit );
    if ( unit.x == unit__clicked.x
      && unit.y == unit__clicked.y ) // double click on unit
    {
      this.mouse.current__clicked = {
        x: -1,
        y: -1
      }
      unit.modified = 1;
      unit.__flags.endflag( __STACK__MOUSE__CLICKED );
    }
    else {
      console.log( 'found unit which was clicked=', unit );
      unit.__flags.setflag( __STACK__MOUSE__CLICKED );
      this.mouse.current__clicked = {
        x: unit.x,
        y: unit.y
      };
      unit.modified = 1;
    }
  }
}

function __init__latherituum__feature__mouse__over( px, py )
{
  var unit__over = this.getXY(
    this.mouse.current__over.x,
    this.mouse.current__over.y
  );
  if ( unit__over )
  {
    unit__over.__flags.endflag( __STACK__MOUSE__OVER );
    unit__over.modified = 1;
  }

  var unit = this.getXYp( px, py );
  if ( unit )
  {
    //console.log( 'setting flag __STACK__MOUSE__OVER for unit=', unit );
    unit.__flags.setflag( __STACK__MOUSE__OVER );
    this.mouse.current__over = {
      x: unit.x,
      y: unit.y
    };
    unit.modified = 1;
  }
}

function __init__latherituum__feature__curse ( prefix, latherituum, stack )
{
  var elem = document.getElementById( prefix + "__curse__left" );
  elem.onmousedown = function ( e )
  {
    __adjust__latherituum__down( -1, this );
  }.bind( latherituum );

  elem.onmouseup = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  }.bind( latherituum );

  elem.onmouseout = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  }.bind( latherituum );

  var elem = document.getElementById( prefix + "__curse__right" );
  elem.onmousedown = function ( e )
  {
    __adjust__latherituum__down( 1, this );
  }.bind( latherituum );

  elem.onmouseup = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  }.bind( latherituum );

  elem.onmouseout = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  }.bind( latherituum );
}

function __adjust__latherituum__down( amount, obj )
{
  __latherituum__left__interval__var = amount;
  __latherituum__left__interval = setInterval( __adjust__latherituum__interval.bind( obj ), 10 );
  obj.adjust( __latherituum__left__interval__var );
}

function __adjust__latherituum__interval( e )
{
  this.adjust( __latherituum__left__interval__var );
}

var __latherituum__left__interval      = 0;
var __latherituum__left__interval__var = 0;

function caoi__latherituum__side( unit, canvas, block )
{
  var elem = document.getElementById( canvas.nest );
  canvas.context = elem.getContext( "2d" );
  if ( block.data == '-1' )
    return;

  if ( canvas.__cfg.words.n == 1 )
  {
    if ( block.data == '0' )
      canvas.context.fillStyle = '#333333';
    else if ( block.data == '1' )
      canvas.context.fillStyle = '#999999';
  }
  else if ( canvas.__cfg.words.n == 2 )
    canvas.context.fillStyle = '#ffffff';

  caoi__latherituum__core( unit, canvas );
  if ( canvas.__cfg.text.on )
    caoi__latherituum__text( unit, canvas, block );
}

function caoi__latherituum__packet( unit, canvas, block )
{
  var elem = document.getElementById( canvas.nest );
  canvas.context = elem.getContext( "2d" );
  if ( block.data == '-1' )
    return;
    //canvas.context.fillStyle = '#666';
  else if ( block.data == '0' )
    canvas.context.fillStyle = '#000000';
  else if ( block.data == '1' )
    canvas.context.fillStyle = '#33ddee';

  caoi__latherituum__core( unit, canvas );
}

function caoi__latherituum( unit, canvas, block, color = 0 )
{
  var elem = document.getElementById( canvas.nest );
  canvas.context = elem.getContext( "2d" );
  if ( block.data == '-1' )
    return;
    //canvas.context.fillStyle = '#333333';

  if ( canvas.__cfg.words.n == 1 )
  {
    if ( block.data == '0' )
      canvas.context.fillStyle = '#000000';
    else if ( block.data == '1' )
      canvas.context.fillStyle = '#ffffff';
  }
  else if ( canvas.__cfg.words.n == 2 )
    canvas.context.fillStyle = '#ffffff';

  caoi__latherituum__core( unit, canvas );
  if ( canvas.__cfg.text.on )
  {
    caoi__latherituum__text( unit, canvas, block );
  }
}

function caoi__latherituum__text( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  if ( canvas.__cfg.words.n == 1 )
  {
    if ( block.data == '0' )
      canvas.context.fillStyle = '#ffffff';
    else if ( block.data == '1' )
      canvas.context.fillStyle = '#000000';
  }
  else if ( canvas.__cfg.words.n == 2 )
    canvas.context.fillStyle = '#000000';

  canvas.context.font = canvas.__cfg.text.font;
  canvas.context.fillText(
    block.data,
    canvas.__cfg.text.left + ( unit.x * spx ),
    canvas.__cfg.text.top  + ( ( unit.y + 1 ) * spy )
  );
}

function caoi__latherituum__core( unit, canvas )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;
  canvas.context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );
}
