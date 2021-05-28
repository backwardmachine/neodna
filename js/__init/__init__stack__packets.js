function __init__stack__packets( sequence )
{
  var clip = sequence.get();
  var blob = '';
  var packet__size = 216;
  if ( sequence.sequence__clip__end > 0 )
  {
    var range = sequence.sequence__clip__end - sequence.sequence__clip__start;
    var packet__scope = range - sequence.sequence__clip__visible;
    if ( packet__scope < 0 )
      packet__scope = 0;
    if ( packet__scope )
    {
      var n = Math.ceil( packet__scope / packet__size );
      var i = 0;
      for (
        i = 0;
          i < n;
            i++
      )
      {
        blob += '1';
      }
    }
  }
  return blob;
}

function __init__stack__packets__left( sequence )
{
  var blob = '';
  var packet__size = 216;
  if ( sequence.sequence__clip__start > 0 )
  {
    var packet__scope = sequence.sequence__clip__start;
    if ( packet__scope )
    {
      var n = Math.floor( packet__scope / packet__size );
      var i = 0;
      for (
        i = 0;
          i < n;
            i++
      )
      {
        blob += '1';
      }
    }
  }
  return blob;
}
