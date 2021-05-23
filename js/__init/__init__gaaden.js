function __init__gaaden( sequence )
{
  // create the gaaden
  var gaaden = new neodna__Gaaden();

  var __cfg = {
  	leading	 		: 216,
  	trailing 		: 216,
  	width		 		: 24,
  	length	 		: 20000,
  	nest		 		: "__canvas__sequence__center",
  	container   : "neodna__latherituum__center",
  	caoi		 		: caoi__binary,
  	pixels	 		: { x: 12, y: 12 },
  	visible  		: 100
  };

  gaaden.__stack__center = __init__stack( sequence, __cfg );

  var latherituum = gaaden.__stack__center;
  latherituum.canvas.mouse            = new neodna__Mouse();
  latherituum.canvas.mouse.fns.click  = __init__latherituum__mouse__click.bind( latherituum.canvas );
  latherituum.canvas.mouse.fns.over   = __init__latherituum__mouse__over.bind( latherituum.canvas );

  __init__latherituum__curse ( latherituum );
  __init__latherituum__mouse ( latherituum );

  var __cfg = {
  	leading  	: 0,
  	trailing 	: 0,
  	width 	 	: 36,
  	nest		 	: "__canvas__sequence__left",
  	container : "neodna__latherituum__left",
  	caoi  	 	: caoi__binary,
  	pixels	 	: { x: 8, y: 8 }
  };

  gaaden.__stack__left = __init__stack( latherituum.sequence.get().clip__leading, __cfg );

  var __cfg = {
  	leading  	: 0,
  	trailing 	: 0,
  	width 	 	: 36,
  	nest		 	: "__canvas__sequence__left__packets",
  	container : "neodna__latherituum__left__packets",
  	caoi  	 	: caoi__binary__packet,
  	pixels	 	: { x: 8, y: 8 }
  };

  gaaden.__stack__left__packets = __init__stack( '', __cfg );
  gaaden.__stack__left__packets.sequence.packets( latherituum.sequence );

  var __cfg = {
  	leading 		: 0,
  	trailing 		: 0,
  	width 	 		: 36,
  	nest				: "__canvas__sequence__right",
  	container   : "neodna__latherituum__right",
  	caoi  	 		: caoi__binary,
  	pixels	 		: { x: 8, y: 8 }
  };

  gaaden.__stack__right  = __init__stack( latherituum.sequence.get().clip__trailing, __cfg );

  var __cfg = {
  	leading  	: 0,
  	trailing 	: 0,
  	width 	 	: 36,
  	nest		 	: "__canvas__sequence__right__packets",
  	container : "neodna__latherituum__right__packets",
  	caoi  	 	: caoi__binary__packet,
  	pixels	 	: { x: 8, y: 8 }
  };

  var blob = __init__stack__packets( latherituum.sequence );
  gaaden.__stack__right__packets = __init__stack( blob, __cfg );

  return gaaden;
}
