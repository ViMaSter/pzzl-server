export class Vector2
{
	x : number = 0;
	y : number = 0;
	constructor(x : number, y : number)
	{
		this.set(x, y);
	}

	toString() : string
	{
		return `[${this.x}, ${this.y}]`;
	}

	set(x : number, y : number)
	{
		if (x == undefined)
		{
			throw new RangeError("X cannot be undefined");
		}
		if (y == undefined)
		{
			throw new RangeError("Y cannot be undefined");
		}
		if (Number.isNaN(x))
		{
			throw new RangeError("X cannot be NaN");
		}
		if (Number.isNaN(y))
		{
			throw new RangeError("Y cannot be NaN");
		}
		this.x = x;
		this.y = y;
	}
	static fromString(x : string, y : string) : Vector2
	{
		return new Vector2(parseFloat(x), parseFloat(y));
	}
	static add(posA : Vector2, posB : Vector2) : Vector2
	{
		return new Vector2(
			posA.x + posB.x,
			posA.y + posB.y
		);
	}
	static subtract(posA : Vector2, posB : Vector2) : Vector2
	{
		return new Vector2(
			posA.x - posB.x,
			posA.y - posB.y
		);
	}
	static multiply(posA : Vector2, factor : number|Vector2) : Vector2
	{
		if (typeof factor == "number")
		{
			return new Vector2(
				posA.x * (factor as number),
				posA.y * (factor as number)
			);
		}
		if (factor instanceof Vector2)
		{
			return new Vector2(
				posA.x * (factor as Vector2).x,
				posA.y * (factor as Vector2).y
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
