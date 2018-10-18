import {Vector2 as Vector2} from "util/Vector2"
import {Rect as Rect} from "util/Rect"
import * as PuzzlePiece from "game/Piece"

export class Puzzle
{
	// Main
	rootElement : HTMLElement;
	playingField : HTMLElement;
	pieces : PuzzlePiece.PieceGrid;
	activePiece : PuzzlePiece.Piece | null = null;

	listener : PuzzlePiece.MouseListener;

	constructor(rootElement : HTMLElement, dimensions : Vector2)
	{
		this.rootElement = <HTMLElement>rootElement;
		this.playingField = <HTMLElement>this.rootElement.querySelector("#playingfield");

		this.listener = new PuzzlePiece.MouseListener();
		this.pieces = new PuzzlePiece.PieceGrid(dimensions, this.onSelectItem.bind(this), this.onDeselectItem.bind(this));

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
		console.log("Selecting element %o [%d, %d]", piece.element, piece.position.x, piece.position.y);

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

		console.log("Attempting to deselect element %o [%d, %d]", piece.element, piece.position.x, piece.position.y);
		this.fixPosition(<PuzzlePiece.Piece>this.activePiece);

		this.checkForOverlap(this.activePiece);

		this.activePiece = null;
	}

	// Snapping and overlapping
	private handleOverlap(droppedPiece : PuzzlePiece.Piece, collider : PuzzlePiece.Piece)
	{
		// @TODO handle proper snapping here
		console.log(`[${droppedPiece.position.x}, ${droppedPiece.position.y}] collides with [${collider.position.x}, ${collider.position.y}]`);
	}

	private checkForOverlap(piece : PuzzlePiece.Piece)
	{
		const currentRect : ClientRect = piece.element.getBoundingClientRect() as ClientRect;
		let overlaps :PuzzlePiece.Piece[] = [];

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
	private fixPosition(piece : PuzzlePiece.Piece)
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

		console.log("Correcting piece %o by [%d, %d] to stay in frame", piece, overlap.x, overlap.y);
		piece.moveBy(overlap);
	}

	private CursorPositionUpdate(lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2)
	{
		if (this.activePiece == null)
		{
			return;
		}

		this.activePiece.moveBy(deltaPosition);
	}
};