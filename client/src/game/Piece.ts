import {Vector2 as Vector2} from "util/Vector2"

export type MouseListenerCallback = (lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2) => void;
export type ToggleItemCallback = (piece : Piece) => void;
export class MouseListener
{
	lastPosition : Vector2 = new Vector2(-1, -1);
	updateListener : MouseListenerCallback[] = [];
	constructor()
	{
		window.addEventListener("mousemove", this.updateMousePosition.bind(this));
		window.addEventListener("mousedown", this.updateMousePosition.bind(this));
		window.addEventListener("touchmove", this.updateTouchPosition.bind(this), {capture: true, passive: false});
		window.addEventListener("touchstart", this.updateTouchPosition.bind(this), {capture: true, passive: false});
	}
	private UpdatePosition(newPosition : Vector2)
	{
		const deltaPosition = Vector2.delta(newPosition, this.lastPosition);
		this.Update(this.lastPosition, newPosition, deltaPosition)
		this.lastPosition = newPosition;
	}
	private updateMousePosition(event : MouseEvent)
	{
		const newPosition : Vector2 = new Vector2 (event.clientX, event.clientY);
		this.UpdatePosition(newPosition);
		event.preventDefault();
	}
	private updateTouchPosition(event : TouchEvent)
	{
		event.preventDefault();
		if (event.touches.item(0) == null)
		{
			return;
		}
		const firstTouch : Touch = event.touches.item(0) as Touch;
		const newPosition : Vector2 = new Vector2(firstTouch.screenX, firstTouch.screenY);
		this.UpdatePosition(newPosition);
	}

	attach(newListener : MouseListenerCallback)
	{
		const listenerIndex = this.updateListener.indexOf(newListener);
		if (listenerIndex != -1)
		{
			console.error("Attempting to attach an lister that's already attached");
			return;
		}
		this.updateListener.push(newListener);
	}

	deattach(newListener : MouseListenerCallback)
	{
		const listenerIndex = this.updateListener.indexOf(newListener);
		if (listenerIndex == -1)
		{
			console.warn("Attempting to remove a listener that wasn't queued");
		}
		this.updateListener.splice(listenerIndex, 1);
	}

	private Update(lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2)
	{
		this.updateListener.forEach((listener : MouseListenerCallback) =>
		{
			listener(this.lastPosition, newPosition, deltaPosition);
		})
	}
}

export class Piece
{
	element : HTMLElement;
	position : Vector2 = new Vector2(-1, -1);
	constructor(position : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback)
	{
		this.position = position;
		this.element = document.createElement("canvas");
		this.element.classList.add("piece");	
		this.element.dataset.x = position.x + "";
		this.element.dataset.y = position.y + "";

		this.element.addEventListener(	"touchstart",	()=>{onSelect(this)});
		this.element.addEventListener(	"mousedown",	()=>{onSelect(this)});
		window.addEventListener(		"touchend",		()=>{onDeselect(this)});
		window.addEventListener(		"mouseup",		()=>{onDeselect(this)});
	}
	moveBy(delta : Vector2)
	{
		const oldPosition = Vector2.fromString(this.element.style.left || "0", this.element.style.top || "0");
		this.element.style.left = (oldPosition.x + delta.x) + "px";
		this.element.style.top = (oldPosition.y + delta.y) + "px";
	}
}

export class PieceGrid
{
	data : Piece[][] = [];
	maxSize : Vector2;
	constructor(dimensions : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback)
	{
		this.maxSize = dimensions;
		for (let x : number = 0; x < this.maxSize.x; x++)
		{
			this.data[x] = [];
			for (let y : number = 0; y < this.maxSize.y; y++)
			{
				const position = new Vector2(x, y);
				this.data[x][y] = new Piece(position, onSelect, onDeselect);
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