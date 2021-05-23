
function __debug__draw__dump()
{
  console.log( '__debug__draw=', __debug__.draw );
}

var __debug__draw__default = {
  messages: new Array(),
  n: 0,
  dump: __debug__draw__dump
};

class neodna__Debug
{
  constructor()
  {
    this.draw = __debug__draw__default;
    this.messages = new Array();
  }
}

var __debug__ = new neodna__Debug();
function __debug( msg )
{
  //if ( msg == 'dump' )
  //  console.log( __debug__.messages );
  //__debug__.messages.push( msg );
  return;
}
