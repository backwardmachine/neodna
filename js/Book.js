class neodna__PdmnBook
{
  constructor()
  {
    this.codes = new Array();
    this.__loaded = 0;
  }

  loaded()
  {
    this.__loaded = 1;
    pandeminium.progress();
  }

  add( code )
  {
    this.codes.push( code );
  }

  get( id )
  {
    if ( this.codes )
    {
      for ( let code of this.codes )
      {
        if ( code.id == id )
          return code;
      }
    }
    return 0;
  }

  draw()
  {
    var elem = document.getElementById( "neodna__pdmn__book" );
    var html = this.html();
    elem.innerHTML = html;

    for ( let code of this.codes )
    {
      var elem = document.getElementById( "neodna__pdmn__code__" + code.id );
      elem.onclick 			= __init__pdmn__code__click;
      elem.ondragstart 	= __init__pdmn__code__drag;
    //  elem.ondrop 			= __init__pdmn__code__drop;
    }
  }

  html()
  {
    var html = '';
    for ( let code of this.codes )
    {
    	html += '<div class="neodna__pdmn__code" id="neodna__pdmn__code__'
    	+ code.id + '" draggable="true" style="background:' + code.color
    	+ '">' + code.name + '</div>';


    }
    return html;
  }
}
