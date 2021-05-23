class neodna__Sequence
{
  constructor( sequence )
  {
    this.__NEODNA__ERRORS = 0;

    this.sequence = {
      clip__blob      : sequence,
      clip__focus     : '',
      clip__leading   : '',
      clip__trailing  : '',
    };

    this.sequence__clip__offset   = 0;
    this.sequence__clip__leading  = 0;
    this.sequence__clip__trailing = 0;
    this.sequence__clip__width    = 8;
    this.sequence__clip__length   = 100000;
    this.sequence__clip__lock     = 0;
    this.sequence__clip__visible  = 100000;
  }

  set( sequence )
  {
    //console.log( 'sequencelength=', sequence.length );
    this.sequence = {
      clip__blob      : sequence,
      clip__focus     : '',
      clip__leading   : '',
      clip__trailing  : '',
    };
  }

  set__offset( n )
  {
    this.sequence__clip__offset = n;
  }

  add__offset( n )
  {
    this.sequence__clip__offset += n;
  }

  set__leading( n )
  {
    this.sequence__clip__leading = n;
  }

  set__trailing( n )
  {
    this.sequence__clip__trailing = n;
  }

  set__width( n )
  {
    this.sequence__clip__width = n;
  }

  set__length( n )
  {
    this.sequence__clip__length = n;
  }

  set__visible( n )
  {
    this.sequence__clip__visible = n;
  }

  set__lock( on = 1 )
  {
    this.sequence__clip__lock = on;
    if ( on )
      this.sequence__clip__lock__length = this.sequence__clip__end - this.sequence__clip__start;
  }

  is__locked()
  {
    return this.sequence__clip__lock;
  }

  frame()
  {
    //if ( !this.sequence.clip__blob.length )
    //  return;

    this.sequence__clip__start  = Math.max( 0, this.sequence__clip__offset );
    this.sequence__clip__end    = Math.max( 0, this.sequence.clip__blob.length + this.sequence__clip__offset );
    if ( this.sequence__clip__end > this.sequence.clip__blob.length ) // can't extend past the blob
      this.sequence__clip__end = this.sequence.clip__blob.length;
    if ( this.sequence__clip__start > this.sequence__clip__end )
      this.sequence__clip__start = this.sequence__clip__end;

    // clip to length
    if ( this.sequence__clip__end - this.sequence__clip__start > this.sequence__clip__length )
      this.sequence__clip__end = this.sequence__clip__start + this.sequence__clip__length;
    if ( this.sequence__clip__lock )
    {
      //console.log( 'sequence__clip__end=', this.sequence__clip__end );
      //console.log( 'sequence__clip__start=', this.sequence__clip__start );
      this.sequence__clip__end = this.sequence__clip__start + this.sequence__clip__lock__length;
      if ( this.sequence__clip__end > this.sequence.clip__blob.length ) // can't extend past the blob
      {
        this.sequence__clip__end   = this.sequence.clip__blob.length;
        this.sequence__clip__start = Math.max( 0, this.sequence__clip__end - this.sequence__clip__lock__length );
        //console.log( 'sequence__clip__end=', this.sequence__clip__end );
        //console.log( 'sequence__clip__start=', this.sequence__clip__start );
      }
    }
  }

  build()
  {
    this.frame();

    // copy focus clip
    var s = '';
    var i = 0;
    for (
      i = this.sequence__clip__start;
        i < this.sequence__clip__end;
          i++ )
      s += this.sequence.clip__blob[ i ];
    this.sequence.clip__focus = s;

    var amount = this.sequence__clip__end - this.sequence__clip__start;
    if ( amount > this.sequence__clip__visible )
      amount = this.sequence__clip__visible;
    this.sequence__clip__height = Math.ceil( amount / this.sequence__clip__width );

    this.sequence.clip__leading = '';
    this.sequence.clip__trailing = '';

    // copy leading clip
    //console.log( 'start = ', this.sequence__clip__start );
    if ( this.sequence__clip__start > 0 )
    {
      var a = this.sequence__clip__start - this.sequence__clip__leading;
      if ( a < 0 )
        a = 0;

      var b = this.sequence__clip__start;
      var i = 0;
      var s = '';
      for (
        i = a;
          i < b;
            i++ )
        s += this.sequence.clip__blob[ i ];
      this.sequence.clip__leading = s;
      //console.log( 'clip__leading=', this.sequence.clip__leading );
      if ( this.__NEODNA__ERRORS )
      {
        //console.log(  );
        console.log(
                     'a=' + Math.max( 0, this.sequence__clip__offset ) + ', '
                   + 'b=' + Math.max( 0, this.sequence__clip__leading + this.sequence__clip__offset ) + ', '
                   + 'offset=' + this.sequence__clip__offset
                 );
        console.log( 'setting leading clip to s=', this.sequence.clip__leading );
      }
    }

    var end = Math.min( this.sequence__clip__length, this.sequence.clip__blob.length );
    //console.log( 'this.sequence__clip__end=', this.sequence__clip__end );
    //console.log( 'end=', end );
    if ( this.sequence__clip__end < end )
    {
      // copy trailing clip
      var a = this.sequence__clip__end;
      var b = Math.min( a + this.sequence__clip__trailing, end );
      //console.log( 'a=', a );
      //console.log( 'b=', b );
      var i = 0;
      var s = '';
      for (
        i = a;
          i < b;
            i++ )
        s += this.sequence.clip__blob[ i ];
      this.sequence.clip__trailing = s;
    }


  }

  getwidth()
  {
    return this.sequence__clip__width;
  }

  getheight()
  {
    return this.sequence__clip__height;
  }

  get()
  {
    return this.sequence;
  }

  focus()
  {
    return this.sequence.clip__focus;
  }

  packets( sequence__clip )
  {
    //console.log( 'packets() sequence__clip=', sequence__clip );
    var clip = sequence__clip.get();
    this.sequence.clip__blob = '';
    var packet__size = 216;
    if ( sequence__clip.sequence__clip__start > 0 )
    {
      //console.log( sequence__clip );
      var packet__scope = sequence__clip.sequence__clip__start;
      //console.log( 'packet scope=', packet__scope );
      //console.log( 'packet calc=', packet__scope / packet__size );
      var n = Math.floor( packet__scope / packet__size );
      var i = 0;
      for (
        i = 0;
          i < n;
            i++
      )
      {
        this.sequence.clip__blob += '1';
      }
      //if ( n > 0 )
      //  console.log( 'n leading packets=', n );
    }
  }

  packets__right( sequence__clip )
  {

  }

  to( index )
  {
    this.sequence__clip__offset = index;
    this.build();
  }
}
