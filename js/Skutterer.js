// A cursor into a haidentot
class neodna__Skutterer
{
  constructor( x, y )
  {
    this.__data    = 0; // give a skutterer access to the data blocks when building the haidentot
    this.x         = x;
    this.y         = y;
    this.ox        = x;
    this.oy        = y;
    this.nX        = 0;
    this.nY        = 0;
    this.step      = 1;
    this.direction = 0;
    this.maiden    = 1;
    this.frame     = 0;
    this.incident  = 1;
    this.vars      = new Array();
    this.packets   = new neodna__Packets();
    this.skittle   = new neodna__Skittle();
    this.gate      = new neodna__Gate();
    this.pictures  = new neodna__Pictures();
    this.frames    = new Array();
    this.escape    = 0;
    this.pos       = 0;
    this.opacity   = 1;
    this.itinerary = 0;
    this.codex     = 0;
    this.oldenscrybe = 0;
    this.dally = {
      x: 0,
      y: 0
    }
    this.tail = new neodna__Tail();
    this.chamber = 0;
    this.focus = 0;
  }

  canterroll()
  {
    if ( this.oldenscrybe )
      return this.oldenscrybe.canterroll;
    return 0;
  }
}
