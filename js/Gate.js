class neodna__Gate
{
  constructor ()
  {
    this.t = 0;
    this.g = 20;
    this.a = 0;
  }

  spin( x )
  {
    this.t = ( this.g + this.t + x ) % this.g;
    return this.t;
  }
}
