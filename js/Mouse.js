class neodna__Mouse
{
	constructor( parent )
	{
		this.x = 0;
		this.y = 0;
		this.px = 0;
		this.py = 0;
		this.parent = parent;
		this.fns = {
			click : 0,
			over  : 0,
			out   : 0
		};
		this.current__over    = { x: -1, y: -1 };
		this.current__clicked = { x: -1, y: -1 };
	}

	click( px, py, e )
	{
		if ( this.fns.click )
			this.fns.click( px, py, e );
	}

	over( px, py, e )
	{
		if ( this.fns.over )
			this.fns.over( px, py, e );
	}

	out( px, py, e )
	{
		if ( this.fns.out )
			this.fns.out( px, py, e );
	}

/*
	setfn__click( fn )
	{
		console.log( 'setting click fn' );
		this.fns.click = fn;
		var elem = document.getElementById( this.parent.nest );
		elem.onclick = this.fns.click;
		console.log( elem );
	}

	setfn__over( fn )
	{
		console.log( 'setting over fn' );
		this.fns.over = fn;
		var elem = document.getElementById( this.parent.nest );
		elem.onmouseover = this.fns.over;
		console.log( elem );
	}
	*/
}
