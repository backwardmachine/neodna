var __gaaden__satelytes__forward__interval   = 0;
var __gaaden__satelytes__forward__moment = 0;
var __gaaden__satelytes__forward__fn = 0;
var __gaaden__satelytes__forward__on = 0;

function __init__satelytes( )
{
  gaaden.satelytes.init    (); // create the html, init() and construct()
  gaaden.satelytes.program ( gaaden.__stack__center.sequence );

  var elem = document.getElementById( "neodna__chryoch__add" );
  elem.onclick = function( e ) {
    console.log( 'adding haidentot' );
    db__haidentot__add();
  }
  console.log( 'chryoch add= ', elem );

  __gaaden__satelytes__forward__fn = function( e )
  {
  	gaaden.satelytes.interval = 10;
  	gaaden.satelytes.play();
  	gaaden.satelytes.draw( 0 ); // draw modified units only

  	__gaaden__satelytes__forward__moment++;
    if ( ! ( __gaaden__satelytes__forward__moment % 1000 )  )
      console.log( gaaden.satelytes );
  	var html = '';
  	var elem = document.getElementById( "neodna__satelytes__moment" );
  	html += 'moment: ' + __gaaden__satelytes__forward__moment + '<br>';
  	elem.innerHTML = html;

  	var i = 0;
  	var satelytes = gaaden.satelytes;
  	for ( let satelyte of satelytes.satelytes )
  	{
  		var html = '';
   		var elem = document.getElementById( "neodna__satelyte__" + i + "__vars" );
      if ( satelyte.skutterer )
      {
    		html += '<div class="neodna__satelyte__var">frame: ' + satelyte.skutterer.frame + '</div>';
    		html += '<div class="neodna__satelyte__var">pos: ' + satelyte.skutterer.pos + '</div>';
    		html += '<div class="neodna__satelyte__var">x: ' + satelyte.skutterer.x + '</div>';
    		html += '<div class="neodna__satelyte__var">y: ' + satelyte.skutterer.y + '</div>';
    		html += '<div class="neodna__satelyte__var">frames: ' + satelyte.skutterer.frames.length + '</div>';
    		html += '<div class="neodna__satelyte__var">maiden: ' + satelyte.skutterer.maiden + '</div>';
    		html += '<div class="neodna__satelyte__var">skittle: ' + satelyte.skutterer.skittle + '</div>';
      }

  		var canvas = satelyte.stack.canvas;
      if ( canvas )
      {
    		var n = canvas.drawn;
    		html += '<div class="neodna__satelyte__var">drawn: ' + n + '</div>';
      }

  		elem.innerHTML = html;
  		i++;
  	}
  }


  document.getElementById( "neodna__satelytes__forward" ).onclick = function( e )
  {
  	clearInterval( __gaaden__satelytes__forward__interval );
  	if ( __gaaden__satelytes__forward__on )
  	{
  		e.target.style.backgroundImage = "url( './style/rightarrow__plain.png' ) ";
  		__gaaden__satelytes__forward__on = 0;
  	}
  	else {
  		e.target.style.backgroundImage = "url( './style/rightarrow__hover.png' ) ";
  		__gaaden__satelytes__forward__interval = setInterval( __gaaden__satelytes__forward__fn, 10 );
  		__gaaden__satelytes__forward__on = 1;
  	}
  }

  document.getElementById( "neodna__satelytes__program" ).onclick = function( e )
  {
  	for ( let satelyte of gaaden.satelytes.satelytes )
  	{
  		satelyte.reset();
  		satelyte.program( gaaden.__stack__center.sequence );
  		//if ( satelyte.)
  	}
  }
}
