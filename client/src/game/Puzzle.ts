import {Vector2 as Vector2} from "util/Vector2"
import {Rect as Rect} from "util/Rect"
import * as PuzzlePiece from "game/Piece"
import {MouseListener as MouseListener} from "util/MouseListener"

export class Puzzle
{
	// Main
	rootElement : HTMLElement;
	playingField : HTMLElement;
	pieces : PuzzlePiece.PieceGrid;
	activePiece : PuzzlePiece.Piece | null = null;

	listener : MouseListener;

	constructor(rootElement : HTMLElement, dimensions : Vector2)
	{
		this.rootElement = <HTMLElement>rootElement;
		this.playingField = <HTMLElement>this.rootElement.querySelector("#playingfield");

		this.listener = new MouseListener();
		this.pieces = new PuzzlePiece.PieceGrid(dimensions, new Vector2(50, 50), this.onSelectItem.bind(this), this.onDeselectItem.bind(this));

		this.GenerateGrid();

		this.listener.attach(this.CursorPositionUpdate.bind(this));
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

		const snapThresholdInPx = 10;
		let leftInBounds : 		boolean = collidingRect.left >		(droppedRect.left - 	snapThresholdInPx) && collidingRect.left < 		(droppedRect.right + 	snapThresholdInPx);
		let rightInBounds : 	boolean = collidingRect.right <		(droppedRect.right + 	snapThresholdInPx) && collidingRect.right > 	(droppedRect.left - 	snapThresholdInPx);
		let topInBounds : 		boolean = collidingRect.top >		(droppedRect.top - 		snapThresholdInPx) && collidingRect.top < 		(droppedRect.bottom +	snapThresholdInPx);
		let bottomInBounds : 	boolean = collidingRect.bottom <	(droppedRect.bottom +	snapThresholdInPx) && collidingRect.bottom > 	(droppedRect.top - 		snapThresholdInPx);

		console.log(`[${droppedPiece.position.x}, ${droppedPiece.position.y}] collides with [${collider.position.x}, ${collider.position.y}]`);
		console.log(`Overlap: left:${leftInBounds} right:${rightInBounds} top:${topInBounds} bottom:${bottomInBounds}`);
		
		if (leftInBounds && rightInBounds && !topInBounds && bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Up, collider);
		}
		if (leftInBounds && rightInBounds && topInBounds && !bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Down, collider);
		}
		if (leftInBounds && !rightInBounds && topInBounds && bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Right, collider);
		}
		if (!leftInBounds && rightInBounds && topInBounds && bottomInBounds)
		{
			droppedPiece.setNeighbor(PuzzlePiece.NeighborDirection.Left, collider);
		}
	}

	private checkForOverlap(piece : PuzzlePiece.Piece)
	{
		const currentRect : ClientRect = piece.element.getBoundingClientRect() as ClientRect;
		let overlaps : PuzzlePiece.Piece[] = [];

		for (let x : number = 0; x < this.pieces.maxSize.x; x++)
		{
			for (let y : number = 0; y < this.pieces.maxSize.y; y++)
			{
				if (x == piece.position.x && y == piece.position.y)
				{
					continue;
				}

				const position : Vector2 = new Vector2(x, y);
				const item : PuzzlePiece.Piece = this.pieces.item(position) as PuzzlePiece.Piece;
				if (Rect.Overlaps(currentRect, item.element.getBoundingClientRect()))
				{
					overlaps.push(item);
				}
			}
		}
		
		if (overlaps.length > 0)
		{
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
		let itemsToProcess : [PuzzlePiece.Piece|null, PuzzlePiece.NeighborDirection|null, PuzzlePiece.Piece][] = [[null, null, piece]];

		while(itemsToProcess.length > 0)
		{
			const nextItem : [PuzzlePiece.Piece|null, PuzzlePiece.NeighborDirection|null, PuzzlePiece.Piece] =<[PuzzlePiece.Piece|null, PuzzlePiece.NeighborDirection|null, PuzzlePiece.Piece]>itemsToProcess.shift();
			itemsProcessed.push(nextItem[2]);

			PuzzlePiece.NeighborDirection.ForEach((direction : PuzzlePiece.NeighborDirection) =>
			{
				if (nextItem[2].getNeighbor(direction) == undefined)
				{
					return;
				}
				const neighborElement = <PuzzlePiece.Piece>nextItem[2].getNeighbor(direction);
				if (itemsProcessed.indexOf(neighborElement) != -1)
				{
					return;
				}
				itemsToProcess.push([nextItem[2], direction, neighborElement]);
			});

			if (nextItem[1] == null)
			{
				continue;
			}
			const oppositeDirection = PuzzlePiece.NeighborDirection.Opposite(<PuzzlePiece.NeighborDirection>nextItem[1]);
			nextItem[2].moveTo(Vector2.add((<PuzzlePiece.Piece>nextItem[0]).getPosition(), Vector2.multiply(oppositeDirection.Position, 50)));
		}
	}
};