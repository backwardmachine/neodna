/*
function __init__stack__left__vars( stack )
{
  stack.sequence.set__leading  ( 0 );
  stack.sequence.set__trailing ( 0 );
  stack.sequence.set__width    ( 36 );
  stack.nest =
}

function __init__stack__center__vars( stack )
{
  stack.sequence.set__leading  ( 216 );
  stack.sequence.set__trailing ( 216 );
  stack.sequence.set__width    ( 24 );
  stack.sequence.set__length   ( 20000 );
  stack.nest =
  //stack.sequence.set__visible  ( 200 );
}

function __init__stack__center( sequence, __init__vars )
{
  var result = __init__stack__core(
    sequence,
    __init__vars
  );
  //console.log( 'result=', result );
  __init__stack__surface         ( result.stack, result.stack.canvas );
  __init__stack__surface__center ( result.stack, result.stack.canvas );
  return result;
}


function __init__stack__process( sequence, __init__vars )
{
  return __init__stack__core( sequence, __init__vars );
}

function __init__stack( sequence,
  __init__fn,
  __init__vars )
{
  return ( __init__fn )
    ? __init__fn          ( sequence, __init__vars ) :
      __init__stack__core ( sequence, __init__vars );
}
*/
function __init__stack( sequence, __cfg )
{
  // main sequence
  var stack 		 = new neodna__Stack();
  stack.sequence = new neodna__Sequence( sequence );
  stack.sequence.__NEODNA__ERRORS = __cfg.errors ? 1 : 0;
  if ( __cfg.offset )
    stack.sequence.set__offset   ( __cfg.offset );
  if ( __cfg.leading )
    stack.sequence.set__leading  ( __cfg.leading );
  if ( __cfg.trailing )
    stack.sequence.set__trailing ( __cfg.trailing );
  if ( __cfg.width )
    stack.sequence.set__width    ( __cfg.width );
  if ( __cfg.length )
    stack.sequence.set__length   ( __cfg.length );
  if ( __cfg.visible )
    stack.sequence.set__visible  ( __cfg.visible );
  stack.sequence.build();

  var nX = stack.sequence.getwidth();
  var nY = stack.sequence.getheight();

  stack.container = __cfg.container;

  // create canvas
  stack.canvas = __init__stack__canvas(
    __cfg,
    nX,
    nY
  );
  //if ( __cfg.caoi )
  //  stack.canvas.caoi( __cfg.caoi );

  // create blocks
  stack.blocks = new neodna__Blocks(
    nX,
    nY,
    stack );
  stack.blocks.build();
  stack.blocks.data  ( stack.sequence.get().clip__focus );

  return stack;
}
