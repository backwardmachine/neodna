class neodna__PdmnLibrary
{
	constructor()
	{
		this.codexes = new Array();
		this.codex   = 0;
    this.visible = 4;
		this.__loaded = 0;
	}

	add( codex ) {
		//console.log( 'codex adding=', codex );
		this.codexes.push( codex );
		//console.log( this.codexes );
	}

  at( id )
  {
    return this.codexes[ id ];
  }

  get( id )
  {
    for ( let codex of this.codexes )
    {
      if ( codex.id == id )
        return codex;
    }
    return 0;
  }

  loaded()
  {
		this.__loaded = 1;
		pandeminium.progress();
    pandeminium.furnace.associate();
  }

  changed()
	{
		//console.log( 'this.codexes=', this.codexes );
		pandeminium.changed();

    var data = '';
    var i = 0;
    for (
      i = 0;
        i < this.codexes.length;
          i++ )
		{
      data += '1';

			//console.log( 'i=', i );
			//var codex = this.codexes[ i ];
			//console.log( 'codex=', codex );
			//codex.changed();
		}

		pandeminium.furnace.set( data );
		pandeminium.furnace.select(); // select the current selection
		console.log( 'changed furnace selection' );
  }

	draw()
	{
		this.html();
	}

	html()
	{
		console.log( 'drawing library code' );
		var elem = document.getElementById( "neodna__pdmn__codexes" );
		var html = '';
		//var html += '<div id="neodna__pdmn__codex__grid">';
		html += '<div id="neodna__pdmn__codexes__plus" class="neodna__pdmn__codexes__plus">+</div>';
		html += '<div id="neodna__pdmn__codexes__global">';
		/*
    var i = 0;
    var list = new Array();
    var selection = pandeminium.furnace.selection;
    for ( let codex of selection )
    {
      list.push( codex );
    }
		list = this.codexes;
    //console.log( 'list=', list );
    var n = 0;
    var i = 0;
		for (
      i = Math.max( 0, list.length - this.visible );
        i < list.length;
          i++ )
		{
      var codex = list[ i ];
      if ( n == this.visible )
        break;
			html += '<div id="neodna__pdmn__codex' + codex.id + '" class="neodna__pdmn__codex">';
			if ( !codex.codes.length )
				console.log( 'codex=', codex );
				html += codex.html();
			html += '</div>';
      n++;
		}
		*/
		console.log( pandeminium.library );
		var id = pandeminium.furnace.codex__selected;
		if ( id != -1 )
		{
			var codex = this.get( id );
			if ( codex )
			{
				console.log( 'showing selected codex=', codex );
				html += '<div id="neodna__pdmn__codex' + id + '" class="neodna__pdmn__codex">';
				html += codex.html();
				html += '</div>';
			}
		}
    html += '<div id="neodna__pdmn__codex__focus">';
    html += '</div>';
		html += '</div>';

		elem.innerHTML = html;
    pandeminium.furnace.focus();

		var elem = document.getElementById( "neodna__pdmn__codexes__plus" );
		elem.onclick = function( e ) {
      console.log( 'adding one codex to DB' );
			db__pdmn__codex__add();
		}
    elem.onselectstart = function () { return false; }

		for ( let codex of this.codexes )
		{
			var elem = document.getElementById( 'neodna__pdmn__codex' + codex.id );
      if ( elem )
      {
  			elem.ondragover = function( e ) {
  				e.preventDefault();
  			}
  			elem.ondrop = function( e ) {
  				console.log( e );
  				e.preventDefault();
  				var code__id  = e.dataTransfer.getData( "data" );
  				console.log( 'matching id=', e.target.id );
  				var numbers = e.target.id.match( /([0-9]+)$/ );
  				var codex__id = numbers[ 1 ];
  				console.log( 'dropped code with id=' + code__id + ' into codex=' + codex__id );
  				for ( let codex of pandeminium.library.codexes )
  				{
  					if ( codex.id == codex__id )
  					{
              console.log( 'storing codex__code in DB' );
              db__pdmn__codex__addend( code__id, codex__id );
  					}
  				}
					var codex = pandeminium.library.get( codex__id );
					if ( codex && ( codex.codes.length == 4 ) )
					{
						console.log( e.target.getBoundingClientRect() );
						var elem__box = e.target.getBoundingClientRect();
						var elem__x = e.clientX - elem__box.left;
						var elem__y = e.clientY - elem__box.top;
						console.log( 'elem__y=', elem__y );
						var s = elem__box.height / 4;
						var n = Math.floor( elem__y / s );
						var index = n;
						if ( index > 3 )
							index = 3;
						var old__id = codex.codes[ index ];
						console.log( 'replacing code=' + old__id + ' with code=' + code__id );
						db__pdmn__codex__replace( old__id, code__id, codex__id );
						console.log( 'n=', n );
					}

					//console.log( );
  			}
      }
		}
	}
}
