import {Vector2 as Vector2} from "util/Vector2"
import * as PuzzlePiece from "game/Piece"

export class Puzzle
{
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

		this.listener.attach(this.Update.bind(this));
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

		this.activePiece = null;
	}

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

	private Update(lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2)
	{
		if (this.activePiece == null)
		{
			return;
		}

		this.activePiece.moveBy(deltaPosition);
	}
};