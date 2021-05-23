class neodna__Satelytes
{
  constructor()
  {
    this.satelytes = new Array();
    this.interval = 1;
    this.__loaded = 0;
    this.__loading = 0;
  }

  init()
  {
    this.html();

    // init each satelyte
    for ( let satelyte of this.satelytes )
      satelyte.init();
  }

  fetching()
  {
    this.__loading = 1;
    this.satelytes = new Array();
  }

  fetched()
  {
    console.log( 'chryoch has fetched' );
    this.__loading = 0;
    this.init();
    if ( !this.__loaded )
      this.loaded();
    else {
      var stack = gaaden.__stack__center;
      this.program( stack.sequence );
      this.link();
    }
  }

  link()
  {
    for ( let satelyte of this.satelytes )
    {
      //satelyte.program( gaaden.__stack__center.sequence );
      if ( satelyte.oldenscrybe__id )
      {
        var parisfair = pandeminium.parisfair;
        var oldenscrybe = parisfair.get( satelyte.oldenscrybe__id );
        if ( oldenscrybe )
          satelyte.link( oldenscrybe );
      }
      satelyte.reset();
    }
  }

  loaded()
  {
    this.__loaded = 1;
    gaaden.progress();
    console.log( 'chryoch has loaded' );
  }

  add( satelyte )
  {
    this.satelytes.push( satelyte );
  }

  build()
  {
    for ( let satelyte of this.satelytes )
      satelyte.build();
  }

  set( sequence )
  {
    for ( let satelyte of this.satelytes )
      satelyte.set( sequence );
  }

  program( data )
  {
    for ( let satelyte of this.satelytes )
      satelyte.program( data );
  }

  reset()
  {
    for ( let satelyte of this.satelytes )
      satelyte.reset();
  }

  play()
  {
    var i = 0;
    for (
      i = 0;
        i < this.interval;
          i++ )
    {
      for ( let satelyte of this.satelytes )
      {
        if ( satelyte.skutterer )
        {
          var success = satelyte.forward( 1 );
          if ( !success )
          {
            satelyte.skutterer.pos = 0;
            satelyte.skutterer.frame = 0;
          }
        }
      }
    }
  }

  read()
  {
    for ( let satelyte of this.satelytes )
    {
      var __src = satelyte.src.blocks;
      var __dest = satelyte.stack.blocks;

      var n = 0;
      for ( let block of __src )
      {
        var b = __dest.getXY(
          block.x,
          block.y
        );

        if ( b )
        {
          n++;
          b.data = block.data;
        }
      }
      //console.log( n + ' operations in read()' );
      //console.log( 'dest=', __dest );
    }
  }

  html()
  {
    var elem = document.getElementById( "neodna__chryoch" );
    var html = '';
    var i = 0;
    for ( let satelyte of this.satelytes ) // write the canvas html for satelytes
    {
      satelyte.nest = '__canvas__satelyte__' + i;
      //html += '<canvas id="' + satelyte.nest + '" style="border:1px solid white;"></canvas>'

      html += '<div class="neodna__satelyte__outer">';
      html += '<div class="neodna__satelyte__haidentot" id="neodna__satelyte__haidentot__' + i + '">';
      html += '<canvas class="__canvas__satelyte" id="__canvas__satelyte__' + i + '"></canvas>';
      html += '</div>';
      html += '<div class="neodna__satelyte__vars" id="neodna__satelyte__' + i + '__vars">';
      html += '</div>';
      html += '<div class="neodna__satelyte__sheath" id="neodna__satelyte__' + i + '__sheath"></div>';
      html += '</div>';

      i++;
    }
    elem.innerHTML = html;
  }

  draw( f = 0 )
  {
    //console.log( 'drawing satelytes=', this.satelytes );
    for ( let satelyte of this.satelytes )
      satelyte.draw( f );
  }


}
