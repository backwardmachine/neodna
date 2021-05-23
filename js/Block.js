class neodna__Block
{
	constructor( posX, posY, parent )
	{
		this.parent 	 = parent;
		this.x 	   		 = posX;
		this.y	   		 = posY;
		this.data      = '';
		this.modified  = 0;
		this.opacity   = 1;
	}

	pos()
	{
		return ( this.y * this.parent.sX ) + this.x;
	}
}

// contains the data via a set of blocks but is seperated from the canvas
// data manipulation occurs here
class neodna__Blocks
{
  constructor( x, y, parent )
  {
    this.parent   = parent;
    this.sX       = x;
    this.sY       = y;
    this.blocks   = new Array();
    this.amount   = this.sX * this.sY;
    //this.canvas   = 0; // display sequence as a canvas
  }

  build()
  {
    this.populate( this.amount );
  }

  populate( amount )
  {
    var i = 0;
    for ( i = 0;
      i < amount;
        i++ )
    {

      var x = i % this.sX;
      var y = Math.floor( i / this.sX );
      var block = new neodna__Block( x, y, this );
      this.blocks.push( block );
    }
  }

  getXY( x, y )
  {
    // out of bounds, nothing there
    if ( x < 0 ) return 0;
    if ( y < 0 ) return 0;
    if ( x >= this.sX ) return 0;
    if ( y >= this.sY ) return 0;

    var n = ( y * this.sX ) + x;
    return this.blocks[ n ];
  }

	data( binary )
	{
		var i = 0;
		var k = 0;
		var wordLength = 1; // two bits per word
		for( let block of this.blocks ) // DO THIS IN REVERSE ORDER FOR LEADING STACK
		{
			var word = '';
			var n = 0;
			while ( n < wordLength )
			{
				if ( typeof binary[ i + n ] === 'undefined' )
					word += '-1';
				else
					word += binary[ i + n ];
				n++;
			}
			//console.log( word );
			block.data = word;
			i+=n;
			k++;
		}
	}

	data__push()
	{
		if ( !this.blocks.length )
			return;
		// push all the data to the back
		var start = 0;
		var n = 0;
		var i = 0;
		for (
			i = this.blocks.length - 1;
				i >= 0;
			 		i-- )
		{
			var block = this.blocks[ i ];
			if ( block.data != '-1' )
			{
				start = i;
				break;
			}
			n++;
		}

		for (
		 	i = start;
		 		i >= 0;
					i-- )
		{
			var block = this.blocks[ i ];
			this.blocks[ i + n ].data = block.data;
		}

		for (
			i = 0;
				i < n;
					i++ )
			this.blocks[ i ].data = '-1';
	}

	clear()
	{
		for ( let block of this.blocks )
		{
			block.data = '0';
			block.modified = 1;
		}
	}
/*
  input( sequence ) // input the sequence
  {
    //console.log( "canvas=", this.canvas );
    //console.log( "canvas.rack=", this.canvas.rack );
		console.log( 'updating unit data to [rack.data=]', sequence );
    this.canvas.rack.data( sequence );
  }

  gfx( canvas ) // display the sequence on a canvas
  {
    this.canvas = canvas;
  }

  draw()
  {
    if ( this.canvas )
      this.canvas.draw( this.canvas );
  }
	*/
}
