class neodna__PdmnItinerary
{
  constructor()
  {
    this.positions = new Array();
    this.objects   = new Array();
  }

  add( pos )
  {
    this.positions.push( pos );
  }

  remove( pos )
  {
    const index = this.positions.indexOf( pos );
    if ( index > -1 )
      this.positions.splice( index, 1 );
  }

  changed()
  {

  }
}
