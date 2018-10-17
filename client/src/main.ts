class Position
{
	x : number = 0;
	y : number = 0;
	constructor(x : number, y : number)
	{
		this.x = x;
		this.y = y;
	}
	static fromString(x : string, y : string) : Position
	{
		return new Position(parseInt(x), parseInt(y));
	}
	static delta(posA : Position, posB : Position) : Position
	{
		return new Position(
			posA.x - posB.x,
			posA.y - posB.y
		);
	}
}

type PuzzlePieceMouseListenerCallback = (lastPosition : Position, newPosition : Position, deltaPosition : Position) => void;
class PuzzlePieceMouseListener
{
	lastPosition : Position = new Position(-1, -1);
	updateListener : PuzzlePieceMouseListenerCallback[] = [];
	constructor()
	{
		window.addEventListener("mousemove", this.updateMousePosition.bind(this));
		window.addEventListener("touchmove", this.updateTouchPosition.bind(this), {passive: false});
	}
	UpdatePosition(newPosition : Position)
	{
		const deltaPosition = Position.delta(newPosition, this.lastPosition);
		this.Update(this.lastPosition, newPosition, deltaPosition)
		this.lastPosition = newPosition;
	}
	private updateMousePosition(event : MouseEvent)
	{
		const newPosition : Position = new Position (event.clientX, event.clientY);
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
		const newPosition : Position = new Position(firstTouch.screenX, firstTouch.screenY);
		this.UpdatePosition(newPosition);
	}

	attach(newListener : PuzzlePieceMouseListenerCallback)
	{
		const listenerIndex = this.updateListener.indexOf(newListener);
		if (listenerIndex != -1)
		{
			console.error("Attempting to attach an lister that's already attached");
			return;
		}
		this.updateListener.push(newListener);
	}

	deattach(newListener : PuzzlePieceMouseListenerCallback)
	{
		const listenerIndex = this.updateListener.indexOf(newListener);
		if (listenerIndex == -1)
		{
			console.warn("Attempting to remove a listener that wasn't queued");
		}
		this.updateListener.splice(listenerIndex, 1);
	}

	private Update(lastPosition : Position, newPosition : Position, deltaPosition : Position)
	{
		this.updateListener.forEach((listener : PuzzlePieceMouseListenerCallback) =>
		{
			listener(this.lastPosition, newPosition, deltaPosition);
		})
	}
}

class Puzzle
{
	listener : PuzzlePieceMouseListener = new PuzzlePieceMouseListener();

	pieces : HTMLElement[] = [];
	activePiece : HTMLElement | null = null;
	constructor(rootElement : Element)
	{
		this.listener.attach(this.Update.bind(this));

		const pieceElements : NodeListOf<Element> = rootElement.querySelectorAll("#playfield .piece");
		if (pieceElements.length <= 0)
		{
			console.error("%o is not a valid puzzle-element! Missing piece-elements", rootElement);
		}

		pieceElements.forEach((item : Element) =>
		{
			this.pieces.push(<HTMLElement>item);
			this.setupPieceEvents(<HTMLElement>item);
		});
	}

	private setupPieceEvents(item : HTMLElement)
	{
		item.addEventListener("touchstart", this.selectItem.bind(this));
		item.addEventListener("touchend", this.deselectItem.bind(this));
		item.addEventListener("mousedown", this.selectItem.bind(this));
		item.addEventListener("mouseup", this.deselectItem.bind(this));
	}

	private isMouseEvent(event: Event) : event is MouseEvent
	{
	  return 'target' in event;
	}

	private isTouchEvent(event: Event) : event is TouchEvent
	{
	  return 'touches' in event;
	}

	private selectItem(event : Event)
	{
		event.preventDefault();
		if (this.activePiece)
		{
			console.error("Trying to select a new item, while another one is still selected");
			return;
		}

		if (!this.isMouseEvent(event) && !this.isTouchEvent(event))
		{
			console.error("Invalid event passed to method");
		}

		if (this.isMouseEvent(event))
		{
			this.listener.UpdatePosition(new Position(event.clientX, event.clientY));
			this.activePiece = <HTMLElement>event.target;
		}

		if (this.isTouchEvent(event))
		{
			if (event.touches.item(0) == null)
			{
				return;
			}
			const firstTouch : Touch = event.touches.item(0) as Touch;
			this.listener.UpdatePosition(new Position(firstTouch.screenX, firstTouch.screenY));
			this.activePiece = <HTMLElement>firstTouch.target;
		}
	}

	private deselectItem(event : Event)
	{
		event.preventDefault();
		if (this.activePiece != event.target)
		{
			console.error("The item to be deselected does not match the currently selected element");
			return;
		}

		if (!this.isMouseEvent(event) && !this.isTouchEvent(event))
		{
			console.error("Invalid event passed to method");
		}

		this.activePiece = null;
	}

	private Update(lastPosition : Position, newPosition : Position, deltaPosition : Position)
	{
		if (this.activePiece == null)
		{
			return;
		}
		const oldPosition = Position.fromString(this.activePiece.style.left || "0", this.activePiece.style.top || "0");
		this.activePiece.style.left = (oldPosition.x + deltaPosition.x) + "px";
		this.activePiece.style.top = (oldPosition.y + deltaPosition.y) + "px";
	}
};

window.addEventListener("load", () =>
{
	const PuzzleLogic : Puzzle = new Puzzle(document.querySelector("#puzzle") as Element);
});
