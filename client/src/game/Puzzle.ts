import {Vector2 as Vector2} from "util/Vector2"
import {Rect as Rect} from "util/Rect"
import * as PuzzlePiece from "game/Piece"
import {MouseListener as MouseListener} from "util/MouseListener"

class PuzzlePieceConnection
{
	private affectedPiece : PuzzlePiece.Piece
	private direction : PuzzlePiece.NeighborDirection|null;
	private sourcePiece : PuzzlePiece.Piece|null;

	getAffectedPiece() : PuzzlePiece.Piece { return this.affectedPiece; }
	getDirection() : PuzzlePiece.NeighborDirection { return <PuzzlePiece.NeighborDirection>this.direction; }
	getSourcePiece() : PuzzlePiece.Piece { return <PuzzlePiece.Piece>this.sourcePiece; }

	isSourcePiece() : boolean
	{
		return this.direction == null && this.sourcePiece == null;
	}

	constructor(affectedPiece : PuzzlePiece.Piece, direction : PuzzlePiece.NeighborDirection|null = null, sourcePiece : PuzzlePiece.Piece|null = null)
	{
		this.affectedPiece = affectedPiece;
		this.direction = direction;
		this.sourcePiece = sourcePiece;			
	}
}

export class Puzzle
{
	// Main
	rootElement : HTMLElement;
	playingField : HTMLElement;
	pieces : PuzzlePiece.PieceGrid;
	activePiece : PuzzlePiece.Piece | null = null;

	listener : MouseListener;

	snapThresholdInPx : number;

	constructor(rootElement : HTMLElement, dimensions : Vector2)
	{
		this.rootElement = <HTMLElement>rootElement;
		this.playingField = <HTMLElement>this.rootElement.querySelector("#playingfield");

		this.snapThresholdInPx = 10;

		this.listener = new MouseListener();
		this.pieces = new PuzzlePiece.PieceGrid(dimensions, new Vector2(50, 50), this.onSelectItem.bind(this), this.onDeselectItem.bind(this));

		this.GenerateGrid();

		this.DrawImage(<HTMLImageElement>document.querySelector("img"));

		this.ShufflePieces();

		this.listener.attach(this.CursorPositionUpdate.bind(this));
	}

	private ShufflePieces()
	{
		let shuffle : (a : any[]) => any[]= (a : any[]) => {
			for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
			}
			return a;
		}

		const pieceAmount : number = this.pieces.maxSize.x * this.pieces.maxSize.y;
		let passedElements : number = 0;
		let passedHalf : boolean = false;
		const padding : number = 10;
		const availableSlots : Vector2 = new Vector2(
			Math.floor((this.rootElement.getBoundingClientRect() as ClientRect).width / (this.pieces.pieceSize.x + padding*2)),
			Math.floor((this.rootElement.getBoundingClientRect() as ClientRect).height / (this.pieces.pieceSize.y + padding*2))
		);
		let currentSlot : Vector2 = new Vector2(0, 0);

		let order : number[][] = [];
		order[0] = shuffle([...Array(this.pieces.maxSize.x).keys()]);
		for (let x : number = 0; x < this.pieces.maxSize.x; x++)
		{
			order[1] = shuffle([...Array(this.pieces.maxSize.y).keys()]);
			for (let y : number = 0; y < this.pieces.maxSize.y; y++)
			{
				const position = new Vector2(order[0][x], order[1][y]);
				const item = this.pieces.item(position);
				if (item == null)
				{
					break;
				}

				let moveToPosition = Vector2.multiply(currentSlot, Vector2.add(this.pieces.pieceSize, new Vector2(padding, padding)));
				moveToPosition = Vector2.add(moveToPosition, new Vector2(padding, padding));
				if (passedHalf)
				{
					moveToPosition.x = (this.rootElement.getBoundingClientRect() as ClientRect).width - (moveToPosition.x + this.pieces.pieceSize.x);
				}
				moveToPosition.x -= ((this.rootElement.getBoundingClientRect() as ClientRect).width - (this.playingField.getBoundingClientRect() as ClientRect).width) / 2
				item.moveTo(moveToPosition);

				passedElements++;
				if (!passedHalf && passedElements > Math.floor(pieceAmount/2))
				{
					passedHalf = true;
					currentSlot.x = 0;
					currentSlot.y = -1;
				}

				currentSlot.y++;
				if (currentSlot.y >= availableSlots.y)
				{
					currentSlot.y = 0;
					currentSlot.x++;
				}
			}
		}
	}

	private DrawImage(imageElement : HTMLImageElement)
	{
		for (let x : number = 0; x < this.pieces.maxSize.x; x++)
		{
			for (let y : number = 0; y < this.pieces.maxSize.y; y++)
			{
				const position = new Vector2(x, y);
				const item = this.pieces.item(position);
				if (item == null)
				{
					break;
				}
				const context : CanvasRenderingContext2D = <CanvasRenderingContext2D>item.element.getContext("2d");
				context.globalAlpha = 0.4;
				context.drawImage(
					imageElement,
					imageElement.naturalWidth / this.pieces.maxSize.x * x,
					imageElement.naturalHeight / this.pieces.maxSize.y * y,
					imageElement.naturalWidth / this.pieces.maxSize.x,
					imageElement.naturalHeight / this.pieces.maxSize.y,
					0, 0,
					item.size.x, item.size.y
				);
			}
		}
	}

	private GenerateGrid()
	{
		for (let x : number = 0; x < this.pieces.maxSize.x; x++)
		{
			for (let y : number = 0; y < this.pieces.maxSize.y; y++)
			{
				const position = new Vector2(x, y);
				const item = this.pieces.item(position);
				if (item == null)
				{
					break;
				}
				this.playingField.appendChild((item as PuzzlePiece.Piece).element);
			}
		}
	}

	// User interaction callbacks
	private onSelectItem(piece : PuzzlePiece.Piece)
	{
		if (this.activePiece != null)
		{
			console.error("Cannot select a new piece, as there is still another one selected");
			return;
		}

		this.activePiece = piece;
	}

	private onDeselectItem(piece : PuzzlePiece.Piece)
	{
		if (this.activePiece == null)
		{
			return;
		}

		this.fixScreenBorderPosition(this.activePiece);

		this.checkForOverlap(this.activePiece);

		this.fixChildPosition(this.activePiece);

		this.activePiece = null;
	}

	private CursorPositionUpdate(lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2)
	{
		if (this.activePiece == null)
		{
			return;
		}

		this.activePiece.moveBy(deltaPosition);

		this.fixChildPosition(this.activePiece);
	}

	// Snapping and overlapping
	private handleOverlap(droppedPiece : PuzzlePiece.Piece, collider : PuzzlePiece.Piece)
	{
		const droppedRect : ClientRect = droppedPiece.element.getBoundingClientRect() as ClientRect;
		const collidingRect : ClientRect = collider.element.getBoundingClientRect() as ClientRect;

		let leftInBounds : 		boolean = droppedRect.left >		(collidingRect.left - 	this.snapThresholdInPx) && droppedRect.left < 		(collidingRect.right + 		this.snapThresholdInPx);
		let rightInBounds : 	boolean = droppedRect.right <		(collidingRect.right + 	this.snapThresholdInPx) && droppedRect.right > 		(collidingRect.left - 		this.snapThresholdInPx);
		let bottomInBounds : 	boolean = droppedRect.bottom <		(collidingRect.bottom +	this.snapThresholdInPx) && droppedRect.bottom > 	(collidingRect.top -		this.snapThresholdInPx);
		let topInBounds : 		boolean = droppedRect.top >			(collidingRect.top -	this.snapThresholdInPx) && droppedRect.top < 		(collidingRect.bottom + 	this.snapThresholdInPx);

		console.log(`[${droppedPiece.position.x}, ${droppedPiece.position.y}] collides with [${collider.position.x}, ${collider.position.y}]`);
		console.log(`Overlap: left:${leftInBounds} right:${rightInBounds} top:${topInBounds} bottom:${bottomInBounds}`);
		
		if (leftInBounds && rightInBounds && !topInBounds && bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Down, collider);
		}
		if (leftInBounds && rightInBounds && topInBounds && !bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Up, collider);
		}
		if (leftInBounds && !rightInBounds && topInBounds && bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Left, collider);
		}
		if (!leftInBounds && rightInBounds && topInBounds && bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Right, collider);
		}
	}

	private checkForOverlap(piece : PuzzlePiece.Piece)
	{
		const currentRect : ClientRect = piece.element.getBoundingClientRect() as ClientRect;
		let overlaps : PuzzlePiece.Piece[] = [];

		for (let x : number = 0; x < this.pieces.maxSize.x; x++)
		{
			for (let y : number = this.pieces.maxSize.y - 1; y >= 0; y--)
			{
				if (x == piece.position.x && y == piece.position.y)
				{
					continue;
				}

				const position : Vector2 = new Vector2(x, y);
				const item : PuzzlePiece.Piece = this.pieces.item(position) as PuzzlePiece.Piece;
				if (Rect.OverlapsWithBuffer(currentRect, item.element.getBoundingClientRect(), this.snapThresholdInPx))
				{
					overlaps.push(item);
				}
			}
		}
		
		if (overlaps.length > 0)
		{
			overlaps = overlaps.filter((item) =>
			{
				let notNeighbor = true;
				PuzzlePiece.NeighborDirection.ForEach((direction : PuzzlePiece.NeighborDirection) =>
				{
					if (piece.hasNeighbor(direction) && piece.getNeighbor(direction).position == item.position)
					{
						notNeighbor = false;
						return false;
					}
				});
				return notNeighbor;
			});
			overlaps.forEach((item) =>
			{
				this.handleOverlap(piece, item);
			});
		}
	}

	// Out-of-screen helper
	private fixScreenBorderPosition(piece : PuzzlePiece.Piece)
	{
		const pieceBounds = piece.element.getBoundingClientRect();
		const boardBounds = this.rootElement.getBoundingClientRect();
		const helperPadding = 10;

		let overlap : Vector2 = new Vector2();
		if (pieceBounds.left < boardBounds.left)
		{
			overlap.x += boardBounds.left - pieceBounds.left + helperPadding;
		}
		if (pieceBounds.right > boardBounds.right)
		{
			overlap.x -= pieceBounds.right - boardBounds.right + helperPadding;
		}
		if (pieceBounds.top < boardBounds.top)
		{
			overlap.y += boardBounds.top - pieceBounds.top + helperPadding;
		}
		if (pieceBounds.bottom > boardBounds.bottom)
		{
			overlap.y -= pieceBounds.bottom - boardBounds.bottom + helperPadding;
		}

		piece.moveBy(overlap);
	}

	// Out-of-screen helper
	private fixChildPosition(piece : PuzzlePiece.Piece)
	{
		let itemsProcessed : PuzzlePiece.Piece[] = [];
		// Set the piece the player interacted with as starting point
		let itemsToProcess : PuzzlePieceConnection[] = [new PuzzlePieceConnection(piece, null, null)];

		// While we have pieces to process...
		while(itemsToProcess.length > 0)
		{
			const nextConnection : PuzzlePieceConnection = <PuzzlePieceConnection>itemsToProcess.shift();
			// ...mark the affected piece as processed
			itemsProcessed.push(nextConnection.getAffectedPiece());

			// ...find all valid neighbors and mark them as "to be processed"
			PuzzlePiece.NeighborDirection.ForEach((direction : PuzzlePiece.NeighborDirection) =>
			{
				// ...check if we have a neighbor in this direction
				if (!nextConnection.getAffectedPiece().hasNeighbor(direction))
				{
					return;
				}
				// ...if so, check if we've already touched it
				const neighborElement = nextConnection.getAffectedPiece().getNeighbor(direction);
				if (itemsProcessed.indexOf(neighborElement) != -1)
				{
					return;
				}
				// ...if not, mark it as "to be processed"
				itemsToProcess.push(new PuzzlePieceConnection(neighborElement, direction, nextConnection.getAffectedPiece()));
			});

			// ...the source block initiating this process doesn't need to be moved (it's movement is what causes connected pieces to follow)
			if (nextConnection.isSourcePiece())
			{
				continue;
			}

			// ...take the source piece this piece is a neighbor of (and in which direction) and offset this piece accordingly
			nextConnection.getAffectedPiece().moveTo(Vector2.add(nextConnection.getSourcePiece().getPosition(), Vector2.multiply(nextConnection.getDirection().Position, 50)));
		}
	}
};