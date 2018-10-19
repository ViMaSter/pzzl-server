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
	static add(posA : Vector2, posB : Vector2) : Vector2
	{
		return new Vector2(
			posA.x + posB.x,
			posA.y + posB.y
		);
	}
	static multiply(posA : Vector2, factor : number|Vector2) : Vector2
	{
		if (typeof factor == "number")
		{
			return new Vector2(
				posA.x * <number>factor,
				posA.y * <number>factor
			);
		}
		if (factor instanceof Vector2)
		{
			return new Vector2(
				posA.x * (<Vector2>factor).x,
				posA.y * (<Vector2>factor).y
			);
		}
		console.error("Vector2.multiply used with not supported factor-argument");
		return new Vector2(0, 0);	
	}
	static delta(posA : Vector2, posB : Vector2) : Vector2
	{
		return new Vector2(
			posA.x - posB.x,
			posA.y - posB.y
		);
	}
	static equal(posA : Vector2, posB : Vector2) : boolean
	{
		return (
			posA.x == posB.x &&
			posA.y == posB.y
		);
	}
}
