var pandeminium = 0;
function __init__pdmn()
{
  pandeminium = new neodna__Pandeminium();
  gaaden.pandeminium = pandeminium;
  pandeminium.init();

  var elem = document.getElementById( "neodna__pdmn" );
  elem.onselectstart = function ()
  {
    return false;
  }

  var elem__box = elem.getBoundingClientRect();
  elem.style.display = "none";
  elem.style.position = "absolute";
  elem.style.width = window.innerWidth - elem__box.left + "px";
  elem.onclick = function( e )
  {
    console.log( 'click on pdmn=', e );
  }

  var __pdmn__collapse__interval  = 0;
  var __pdmn__collapse__n         = 10;
  var __pdmn__collapse__at        = 0;
  var __pdmn__collapse__stage     = 0;
  var __pdmn__collapse__begin     = 0;
  var __pdmn__collapse__amount    = 0;
  var __pdmn__collapse__move      = 0;
  var __pdmn__collapse__left      = 0;
  var __pdmn__collapse__start     = 0;
  var __pdmn__collapse__start__x  = 0;
  var __pdmn__collapse__start__y  = 0;
  var __pdmn__collapse__start__width = 0;
  var __pdmn__collapse__start__height = 0;
  document.getElementById( "neodna__pdmn__toggle" ).onclick = function( e )
  {
    console.log( 'e=', e );
  	var elem = document.getElementById( "neodna__pdmn" );
    var elem__content = document.getElementById( "neodna__pdmn__content" );
  	if ( elem.style.position == "absolute" )
  	{
      elem__content.style.display = "none";
  		__pdmn__collapse__interval = setInterval( __pdmn__collapse__fn, 10 );
  	}
  	else {
      var elem__box = elem.getBoundingClientRect();
  		elem.style.position = "absolute";
      if ( __pdmn__collapse__start )
      {
        elem.style.left   = __pdmn__collapse__start__x;
        elem.style.top    = __pdmn__collapse__start__y;
        elem.style.width  = __pdmn__collapse__start__width;
        elem.style.height =__pdmn__collapse__start__height;
      }
      else
      {
  		  elem.style.height   = "500px";
        elem.style.width    = window.innerWidth - elem__box.left + "px";
      }
      elem__content.style.display = "block";
  	}
  }

  function __pdmn__collapse__fn()
  {
    var elem = document.getElementById( "neodna__pdmn" );

    if ( __pdmn__collapse__stage == 0 )
    {
      __pdmn__collapse__start         = 1;
      __pdmn__collapse__start__x      = elem.style.left;
      __pdmn__collapse__start__y      = elem.style.top;
      __pdmn__collapse__start__width  = elem.style.width;
      __pdmn__collapse__start__height = elem.style.height;
      __pdmn__collapse__stage = 1;
    }

    if ( __pdmn__collapse__stage == 1 )
    {
    	var amount = ( 500 - 30 ) / __pdmn__collapse__n;
    	amount *= 1 + __pdmn__collapse__at++;
    	elem.style.height = Math.floor( 500 - amount ) + "px";

      if ( __pdmn__collapse__at == __pdmn__collapse__n )
      {
        __pdmn__collapse__stage = 2;
        __pdmn__collapse__at = 0;
        __pdmn__collapse__n = 10;
        elem.style.position = "fixed";
      }

      return;
    }

    if ( __pdmn__collapse__stage == 2 )
    {
      var elem__box = elem.getBoundingClientRect();
      if ( __pdmn__collapse__at == 0 )
      {
        //console.log( 'scrollwidth=', document.body.scrollWidth );
        __pdmn__collapse__begin = elem.offsetWidth;
        __pdmn__collapse__move = ( document.body.scrollWidth - elem.offsetLeft - 30 ) / __pdmn__collapse__n;
        __pdmn__collapse__left = elem.offsetLeft;
      }
      var amount = ( __pdmn__collapse__begin - 30 ) / __pdmn__collapse__n;
      //console.log( 'amount=', amount );
      amount *= 1 + __pdmn__collapse__at++;
      elem.style.width = Math.floor( __pdmn__collapse__begin - amount ) + "px";
      elem.style.left  = Math.floor(
        __pdmn__collapse__left + ( __pdmn__collapse__at * __pdmn__collapse__move )
      ) + "px";
      //console.log( 'elem.style.width=', elem.style.width );
      //console.log( 'elem.style.left=', elem.style.left );
      if ( __pdmn__collapse__at == __pdmn__collapse__n )
      {
        __pdmn__collapse__stage = 0;
        __pdmn__collapse__at = 0;
        __pdmn__collapse__n = 10;
        clearInterval( __pdmn__collapse__interval );
      }

      return;
    }
  }

  var i = 0;
  for ( let satelyte of gaaden.satelytes.satelytes )
  {
  	var elem = document.getElementById( "neodna__satelyte__" + i + "__sheath" );
  	elem.onclick = __init__pdmn__track;
  	elem.value = i;
  	i++;
  }
}

function __init__pdmn__track( e )
{
  //console.log( e );
  var numbers = e.target.id.match( /([0-9]+)/ );
  var host__id = numbers[ 0 ];

  var posX = e.pageX + 4; // x position
  var posY = e.pageY - 4; // y position
  var elem = document.getElementById( "neodna__pdmn" );
  elem.style.display    = "block";
  elem.style.position   = "absolute";
  elem.style.height     = posY + "px";
  elem.style.left       = posX + "px";
  elem.style.width      = ( document.body.scrollWidth - posX ) + "px";
  //console.log( e );
  //console.log( 'posX=', posX );
  //console.log( 'document.body.scrollWidth=', document.body.scrollWidth );
  //console.log( 'setting width to =', elem.style.width );

  var content = document.getElementById( "neodna__pdmn__content" );
  content.style.display = "block";

  var satelyte = gaaden.satelytes.satelytes[ host__id ];
  var parisfair = pandeminium.parisfair;
  parisfair.watch( satelyte );
}

function __init__pdmn__code__click( e ) {
	var index = e.target.value;
}

function __init__pdmn__code__drag( e ) {
	console.log( 'code is being dragged=', e.target.id );
	var numbers = e.target.id.match( /([0-9]+)$/ );
	console.log( 'matched id=', numbers[ 0 ] );
	e.dataTransfer.setData( "data", numbers[ 0 ] );
}
