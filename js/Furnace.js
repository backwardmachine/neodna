class neodna__PdmnFurnace
{
  constructor()
  {
    // keep record of useful places
    this.stack = new neodna__Stack();
    this.selection = new Array();
    this.codex__over     = -1;
    this.codex__selected = -1;
  }

  init()
  {
    var __cfg = {
      leading	 		: 0,
      trailing 		: 0,
      width		 		: 24,
      length	 		: 20000,
      nest		 		: "__canvas__furnace",
      container   : "neodna__pdmn__furnace__stack",
      caoi		 		: caoi__binary__furnace,
      pixels	 		: { x: 25, y: 25 },
      visible  		: 2000
    };

    this.stack = __init__stack( '10101001101011010100', __cfg );
    __init__mouse( this.stack, __cfg.container );
    this.stack.canvas.mouse = new neodna__Mouse();
    this.stack.canvas.mouse.fns.click
      = __init__furnace__mouse__click.bind( this.stack.canvas );
    this.stack.canvas.mouse.fns.over
      = __init__furnace__mouse__over.bind( this.stack.canvas );
  }

  set( data )
  {
    this.stack.set( data );
  }

  get( id )
  {
    var library = pandeminium.library;
    return library.get( id );
  }

  position( codex )
  {
    if ( codex )
    {
      var i = 0;
      var library = pandeminium.library;
      for ( let codex__ of library.codexes )
      {
        if ( codex__.id == codex.id )
          return i;
        i++;
      }
    }
    return -1;
  }

  clicked( position, on = 1 )
  {
    var canvas = this.stack.canvas;
    var coords = canvas.coords( position );
    var unit = canvas.getXY( coords.x, coords.y );
    if ( unit )
    {
      on ? unit.__flags.setflag( __STACK__MOUSE__SELECTION )
         : unit.__flags.endflag( __STACK__MOUSE__SELECTION );
    }
  }

  selected( id )
  {
    var n = 0;
    for ( let __id of this.selection )
    {
      if ( __id == id )
        n++;
    }
    if ( !n )
      this.selection.push( id );
  }

  deselect()
  {
    for ( let id of this.selection )
    {
      var codex = this.get( id );
      if ( codex )
      {
        var position = this.position( codex );
        if ( position != -1 )
          this.clicked( position, 0 );
      }
    }
  }

  itinerary( itinerary )
  {
    if ( itinerary.positions.length )
    {
      for ( let id of itinerary.positions )
      {
        var codex = this.get( id );
        if ( codex )
          this.selected( codex.id );
      }
    }
  }

  select()
  {
    console.log( 'selecting ids=', this.selection );
    for ( let id of this.selection )
    {
      var codex = this.get( id );
      if ( codex )
      {
        var position = this.position( codex );
        if ( position != -1 )
          this.clicked( position, 1 );
      }
    }
  }

  associate()
  {
    var i = 0;
    for ( let codex of pandeminium.library.codexes )
    {
      if ( this.stack.blocks.blocks.length > i )
      {
        var block = this.stack.blocks.blocks[ i ];
        block.data     = codex;
        block.modified = 1;
      }
      i++;
    }
  }

  focus()
  {
    var elem = document.getElementById( "neodna__pdmn__codex__focus" );
    var html = '';
    var id = this.codex__over;
    var codex = pandeminium.library.get( id );
    if ( codex )
    {
      html += '<div id="neodna__pdmn__codex' + codex.id + '" class="neodna__pdmn__codex">';
      html += codex.html();
      html += '</div>';
    }
    elem.innerHTML = html;
  }

  draw()
  {
    this.stack.draw ( 1 );
  }
}
