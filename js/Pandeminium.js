class neodna__Pandeminium
{
  constructor()
  {
    this.book       = new neodna__PdmnBook();
    this.library    = new neodna__PdmnLibrary();
    this.furnace    = new neodna__PdmnFurnace();
    this.phylactery = new neodna__PdmnPhylactery();
    this.itinerary  = new neodna__PdmnItinerary();
    this.parisfair  = new neodna__PdmnParisfair();
    this.__loading  = 0;
    this.__loaded   = 0;
  }

  code( id )
  {
    return this.book.get( id );
  }

  init()
  {
    this.furnace.init();
    this.phylactery.init();
    this.parisfair.init();
  }

  changed()
  {
    if ( this.__loaded )
    {
      this.parisfair.select(); // cascade the selection again
      this.parisfair.rollout();
      //this.parisfair.modified();
    }
  }

  loaded()
  {
    console.log( 'pandeminium has loaded' );
    this.__loading = 0;
    this.__loaded = 1;
    gaaden.progress();

    this.changed();
    this.draw( 1 );
  }

  progress()
  {
    if ( this.__loading )
    {
      console.log( 'pandeminium progress++' );
      if ( this.book        .__loaded
        && this.library     .__loaded
        && this.phylactery  .__loaded
        && this.parisfair   .__loaded )
      this.loaded();
    }
  }

  draw()
  {
    this.book       .draw( 1 );
    this.library    .draw( 1 );
    this.furnace    .draw( 1 );
    this.phylactery .draw( 1 );
    this.parisfair  .draw( 1 );
  }
}
