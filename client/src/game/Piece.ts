import {Vector2 as Vector2} from "util/Vector2"

export type ToggleItemCallback = (piece : Piece) => void;

export type NeighborDirectionEachCallback = (direction : NeighborDirection) => void;
export class NeighborDirection {
	Name : string = "";
	Position : Vector2 = new Vector2(-1, -1);
	private constructor(Name : string, Position : Vector2)
	{
		this.Name = Name;		
		this.Position = Position;
	}
    static Up : NeighborDirection = new NeighborDirection("Up", new Vector2(0, 1));
    static Down : NeighborDirection = new NeighborDirection("Down", new Vector2(0, -1));
    static Left : NeighborDirection = new NeighborDirection("Left", new Vector2(1, 0));
    static Right : NeighborDirection = new NeighborDirection("Right", new Vector2(-1, 0));
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

export class Piece
{
	element : HTMLCanvasElement;
	position : Vector2 = new Vector2(-1, -1);
	size : Vector2 = new Vector2(-1, -1);
	private neighbors : Map<String, Piece> = new Map<String, Piece>();

	constructor(position : Vector2, size : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback)
	{
		this.position = position;
		this.size = size;
		this.element = document.createElement("canvas");
		this.element.classList.add("piece");	
		this.element.dataset.x = position.x + "";
		this.element.dataset.y = position.y + "";
		this.element.width = size.x;
		this.element.height = size.y;

		this.element.addEventListener(	"touchstart",	()=>{onSelect(this)});
		this.element.addEventListener(	"mousedown",	()=>{onSelect(this)});
		window.addEventListener(		"touchend",		()=>{onDeselect(this)});
		window.addEventListener(		"mouseup",		()=>{onDeselect(this)});

		this.setupDebugText();
	}

	getNeighbor(direction : NeighborDirection) : Piece | undefined
	{
		return this.neighbors.get(direction.Name);
	}

	setNeighbor(direction : NeighborDirection, newNeighbor : Piece) : boolean
	{
		if (this.neighbors.get(direction.Name) != undefined)
		{
			console.error(`Piece [${this.position.x}, ${this.position.y}] already has a neighbor in direction '${direction}'`);
			return false;
		}
		this.neighbors.set(direction.Name, newNeighbor);
		console.log(`Piece [${newNeighbor.position.x}, ${newNeighbor.position.y}] is now the ${direction.Name}-neighbor of [${this.position.x}, ${this.position.y}]`);


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

	setupDebugText()
	{
		const context : CanvasRenderingContext2D = <CanvasRenderingContext2D>this.element.getContext("2d");
		context.font = "20px Arial";
		context.fillText(`[${this.position.x}, ${this.position.y}]`, 0, 40);
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
	data : Piece[][] = [];
	maxSize : Vector2;
	pieceSize : Vector2;
	constructor(dimensions : Vector2, pieceSize : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback)
	{
		this.maxSize = dimensions;
		this.pieceSize = pieceSize;
		for (let x : number = 0; x < this.maxSize.x; x++)
		{
			this.data[x] = [];
			for (let y : number = 0; y < this.maxSize.y; y++)
			{
				const position = new Vector2(x, y);
				this.data[x][y] = new Piece(position, pieceSize, onSelect, onDeselect);
			}
		}
	}

	item(position : Vector2) : Piece | null
	{
		if (position.x >= this.maxSize.x)
		{
			console.error(`Attempting to access grid column ${position.x}, which is bigger than ${this.maxSize.x-1}!`);
			return null;
		}
		if (position.y >= this.maxSize.y)
		{
			console.error(`Attempting to access grid row ${position.y}, which is bigger than ${this.maxSize.y-1}!`);
			return null;
		}

		return this.data[position.x][position.y];
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