export class Vector2
{
	x : number = 0;
	y : number = 0;
	constructor(x : number = 0, y : number = 0)
	{
		this.x = x;
		this.y = y;
	}
	static fromString(x : string, y : string) : Vector2
	{
		return new Vector2(parseInt(x), parseInt(y));
	}
	static delta(posA : Vector2, posB : Vector2) : Vector2
	{
		return new Vector2(
			posA.x - posB.x,
			posA.y - posB.y
		);
	}
}
