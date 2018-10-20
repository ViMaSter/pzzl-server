import {Vector2 as Vector2} from "util/Vector2"

export type ToggleItemCallback = (piece : Piece) => void;

type NeighborDirectionEachCallback = (direction : NeighborDirection) => void;
export class NeighborDirection {
	private name : string = "";
	private position : Vector2 = new Vector2(-1, -1);
	private constructor(name : string, position : Vector2)
	{
		this.name = name;		
		this.position = position;
	}

	get Name() : string { return this.name; }
	get Position() : Vector2 { return this.position; }

    static get Up() : NeighborDirection { return new NeighborDirection("Up", new Vector2(0, -1))};
    static get Down() : NeighborDirection { return new NeighborDirection("Down", new Vector2(0, 1))};
    static get Left() : NeighborDirection { return new NeighborDirection("Left", new Vector2(-1, 0))};
    static get Right() : NeighborDirection { return new NeighborDirection("Right", new Vector2(1, 0))};
    static ForEach(callback : NeighborDirectionEachCallback)
    {
		callback(this.Up);
		callback(this.Down);
		callback(this.Left);
		callback(this.Right);
    }
    static Opposite(direction : NeighborDirection) : NeighborDirection
    {
		if (direction.Name == "Up") 	return NeighborDirection.Down;
		if (direction.Name == "Down") 	return NeighborDirection.Up;
		if (direction.Name == "Left") 	return NeighborDirection.Right;
		if (direction.Name == "Right") 	return NeighborDirection.Left;

		console.error("Invalid direction supplied");
		return new NeighborDirection("", new Vector2(-1, -1));
    }
};

export const enum Shape
{
	NONE = -1,
	Sphere = 0,
	Triangle = 1,
}

export class IntersectionDescription
{
	private isOutwards : boolean;
	get IsOutwards() : boolean { return this.isOutwards; }
	private shape : Shape;
	get Shape() : Shape { return this.shape; }
	private outwardishSideCurvature : number;
	get OutwardishSideCurvature() : number { return this.outwardishSideCurvature; }
	private size : Vector2;
	get Size() : Vector2 { return this.size; }
	private offset : Vector2
	get Offset() : Vector2 { return this.offset; }
	
	private constructor(isOutwards : boolean, shape : Shape, outwardishSideCurvature : number, size : Vector2, offset : Vector2)
	{
		this.isOutwards = isOutwards;
		this.shape = shape;
		this.outwardishSideCurvature = outwardishSideCurvature;
		this.size = size;
		this.offset = offset;
	}

	static CreateDefault()
	{
		return this.CreateNew(true, Shape.NONE, 0, new Vector2(1, 1), new Vector2(0, 1));
	}

	static CreateNew(isOutwards : boolean, shape : Shape, outwardishSideCurvature : number, size : Vector2|null, offset : Vector2|null)
	{
		const finalSize : Vector2 = size == null ? new Vector2(1, 1) : size;
		const finalOffset : Vector2 = offset == null ? new Vector2(1, 1) : offset;
		return new IntersectionDescription(isOutwards, shape, outwardishSideCurvature, finalSize, finalOffset);
	}

	static CreateCounter(sourceIntersection : IntersectionDescription)
	{
		return this.CreateNew(
			!sourceIntersection.isOutwards,
			sourceIntersection.shape,
			-sourceIntersection.outwardishSideCurvature,
			sourceIntersection.size,
			Vector2.multiply(sourceIntersection.offset, new Vector2(-1, -1))
		);
	}
}

interface InternalPiece
{
	Create: (position : Vector2, size : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback) => InternalPiece;
	setIntersection: (direction : NeighborDirection, intersectionDescription : IntersectionDescription) => void;
	getCounterForIntersection: (direction : NeighborDirection) => IntersectionDescription;
}

export class Piece
{
	private element : HTMLCanvasElement;
	private position : Vector2 = new Vector2(-1, -1);
	private size : Vector2 = new Vector2(-1, -1);
	get Element() : HTMLCanvasElement { return this.element; }
	get Position() : Vector2 { return this.position; }
	get Size() : Vector2 { return this.size; }

	private neighbors : Map<string, Piece> = new Map<string, Piece>();
	hasNeighbor(direction : NeighborDirection) : boolean
	{
		return this.neighbors.get(direction.Name) != undefined;
	}
	getNeighbor(direction : NeighborDirection) : Piece
	{
		return this.neighbors.get(direction.Name) as Piece;
	}

	private intersections : Map<string, IntersectionDescription> = new Map<string, IntersectionDescription>();
	private hasIntersection(direction : NeighborDirection) : boolean
	{
		return this.intersections.get(direction.Name) != undefined;
	}
	private getIntersection(direction : NeighborDirection) : IntersectionDescription
	{
		return this.intersections.get(direction.Name) as IntersectionDescription;
	}

	protected getCounterForIntersection(direction : NeighborDirection) : IntersectionDescription
	{
		return IntersectionDescription.CreateCounter(this.getIntersection(direction));
	}
	protected setIntersection(direction : NeighborDirection, intersectionDescription : IntersectionDescription)
	{
		if (this.hasIntersection(direction))
		{
			console.error(`[${this.position.x}, ${this.position.y}] already has a definition for it's ${direction}-intersection`);
			return;
		}
		this.intersections.set(direction.Name, intersectionDescription);
	}

	// Limit creation to this file; constructor cannot be defined in an interface, hence we forward the need through Create()
	private constructor()
	{
		this.element = document.createElement("canvas");
	}
	protected static Create(position : Vector2, size : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback) : Piece
	{
		let newPiece : Piece = new Piece();
		newPiece.position = position;
		newPiece.size = size;
		newPiece.Element.classList.add("piece");	
		newPiece.Element.dataset.x = position.x + "";
		newPiece.Element.dataset.y = position.y + "";
		newPiece.Element.width = size.x;
		newPiece.Element.height = size.y;

		newPiece.Element.addEventListener(	"touchstart",	()=>{onSelect(newPiece)}	);
		newPiece.Element.addEventListener(	"mousedown",	()=>{onSelect(newPiece)}	);
		window.addEventListener(			"touchend",		()=>{onDeselect(newPiece)}	);
		window.addEventListener(			"mouseup",		()=>{onDeselect(newPiece)}	);

		newPiece.setupDebugText();
		return newPiece;
	}

	private setupDebugText()
	{
		const context : CanvasRenderingContext2D = <CanvasRenderingContext2D>this.element.getContext("2d");
		context.font = "20px Arial";
		context.fillStyle = 'white';
		context.fillText(`[${this.position.x}, ${this.position.y}]`, 0, 40);
	}

	setNeighbor(direction : NeighborDirection, newNeighbor : Piece) : boolean
	{
		// set neighbor on this piece
		const expectedNeighborPosition = Vector2.add(this.position, direction.Position);
		if (!Vector2.equal(expectedNeighborPosition, newNeighbor.position))
		{
			console.warn(`[${newNeighbor.position.x}, ${newNeighbor.position.y}] is not the ${direction.Name}-side neighbor of [${this.position.x}, ${this.position.y}] (expected [${expectedNeighborPosition.x}, ${expectedNeighborPosition.y}])`);
			return false;
		}

		if (this.neighbors.get(direction.Name) != undefined)
		{
			console.error(`Piece [${this.position.x}, ${this.position.y}] already has a neighbor in direction '${direction.Name}'`);
			return false;
		}
		this.neighbors.set(direction.Name, newNeighbor);
		console.log(`Piece [${newNeighbor.position.x}, ${newNeighbor.position.y}] is now the ${direction.Name}-neighbor of [${this.position.x}, ${this.position.y}]`);

		// set this piece as neighbor on the neighboring piece
		const opposite : NeighborDirection = NeighborDirection.Opposite(direction);
		
		if (newNeighbor.neighbors.get(opposite.Name) != undefined)
		{
			console.error(`Piece [${newNeighbor.position.x}, ${newNeighbor.position.y}] already has a neighbor in direction '${opposite}'`);
			return false;
		}
		newNeighbor.neighbors.set(opposite.Name, this);
		console.log(`Piece [${this.position.x}, ${this.position.y}] is now the ${opposite.Name}-neighbor of [${newNeighbor.position.x}, ${newNeighbor.position.y}]`);

		return true;
	}

	getPosition() : Vector2
	{
		return Vector2.fromString(this.element.style.left || "0", this.element.style.top || "0");
	}

	moveBy(delta : Vector2)
	{
		this.moveTo(Vector2.add(this.getPosition(), delta));
	}

	moveTo(position : Vector2)
	{
		this.element.style.left = position.x + "px";
		this.element.style.top  = position.y + "px";
	}
}

export class PieceGrid
{
	private data : Piece[][] = [];
	private dimensions : Vector2;
	get Dimensions() : Vector2 { return this.dimensions; }
	private pieceSize : Vector2;
	get PieceSize() : Vector2 { return this.pieceSize; }
	
	constructor(dimensions : Vector2, pieceSize : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback)
	{
		this.dimensions = dimensions;
		this.pieceSize = pieceSize;
		for (let x : number = 0; x < this.dimensions.x; x++)
		{
			this.data[x] = [];
			for (let y : number = 0; y < this.dimensions.y; y++)
			{
				const position = new Vector2(x, y);

				// Create new piece
				this.data[x][y] = ((((Piece as any) as InternalPiece)).Create(position, pieceSize, onSelect, onDeselect) as any) as Piece;

				// Create intersections...
				NeighborDirection.ForEach((direction : NeighborDirection) =>
				{
					// ...that are solid for border pieces
					if ((y == 0 && direction.Name == "Up") ||
						(x == 0 && direction.Name == "Left") ||
						(x == this.dimensions.x-1 && direction.Name == "Right") ||
						(y == this.dimensions.y-1 && direction.Name == "Down"))
					{
						((this.data[x][y] as any) as InternalPiece).setIntersection(direction, IntersectionDescription.CreateDefault());
						return;
					}

					// If we have don't have neighbors in a direction...
					if (!this.hasItem(Vector2.add(position, direction.Position)))
					{
						// ...create our own
						((this.data[x][y] as any) as InternalPiece).setIntersection(direction, IntersectionDescription.CreateNew(true, Shape.Sphere, 0.4, new Vector2(1.5, 0.5), new Vector2(0.5, 0.5)));
						return;
					}
					// ...otherwise create counter for the intersection of the preceding piece
					const precedingNeighbor : Piece = this.item(Vector2.add(position, direction.Position));
					((this.data[x][y] as any) as InternalPiece).setIntersection(direction, ((precedingNeighbor as any) as InternalPiece).getCounterForIntersection(NeighborDirection.Opposite(direction)));
				});
			}
		}
	}

	hasItem(position : Vector2) : boolean
	{
		if (position.x >= this.dimensions.x)
		{
			return false;
		}
		if (position.y >= this.dimensions.y)
		{
			return false;
		}
		if (position.x < 0)
		{
			return false;
		}
		if (position.y < 0)
		{
			return false;
		}
		if (typeof this.data[position.x] == "undefined" || typeof this.data[position.x][position.y] == "undefined")
		{
			return false;
		}
		return true;
	}

	item(position : Vector2) : Piece
	{
		return this.data[position.x][position.y] as Piece;
	}

	itemFromElement(element : HTMLElement)
	{
		if (typeof element.dataset.x == "undefined" || typeof element.dataset.y == "undefined")
		{
			console.error("Cannot look up element %o in grid, as it's not a valid piece!", element);
		}
		return this.item(Vector2.fromString(element.dataset.x as string, element.dataset.y as string));
	}
}