function __init__latherituum__curse ( stack )
{
  var elem = document.getElementById( "neodna__latherituum__curse__left" );
  elem.onmousedown = function ( e )
  {
    __adjust__latherituum__down( -1 );
  };

  elem.onmouseup = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  };

  elem.onmouseout = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  };

  var elem = document.getElementById( "neodna__latherituum__curse__right" );
  elem.onmousedown = function ( e )
  {
    __adjust__latherituum__down( 1 );
  };

  elem.onmouseup = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  };

  elem.onmouseout = function ( e )
  {
    clearInterval( __latherituum__left__interval );
  };
}

function __adjust__latherituum__down( amount )
{
  __latherituum__left__interval__var = amount;
  __latherituum__left__interval = setInterval( __adjust__latherituum__interval, 10 );
  gaaden.adjust( __latherituum__left__interval__var );
}

function __adjust__latherituum__interval( e )
{
  //console.log( 'adjusting gaaden' );
  gaaden.adjust( __latherituum__left__interval__var );
}

var __latherituum__left__interval      = 0;
var __latherituum__left__interval__var = 0;
