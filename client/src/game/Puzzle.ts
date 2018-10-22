import {Vector2 as Vector2} from "util/Vector2"
import {Rect as Rect} from "util/Rect"
import * as PuzzlePiece from "game/Piece"
import {MouseListener as MouseListener} from "util/MouseListener"

export class PuzzlePieceConnection
{
	private affectedPiece : PuzzlePiece.Piece
	private direction : PuzzlePiece.NeighborDirection|null;
	private sourcePiece : PuzzlePiece.Piece|null;

	get AffectedPiece() : PuzzlePiece.Piece { return this.affectedPiece; }
	get Direction() : PuzzlePiece.NeighborDirection { return <PuzzlePiece.NeighborDirection>this.direction; }
	get SourcePiece() : PuzzlePiece.Piece { return <PuzzlePiece.Piece>this.sourcePiece; }

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

type ConnectedPiecesCallback = (connection : PuzzlePieceConnection) => void;
export class Puzzle
{
	// Main
	private rootElement : HTMLElement;
	private playingField : HTMLElement;
	private pieces : PuzzlePiece.PieceGrid;
	private activePiece : PuzzlePiece.Piece | null = null;

	private imageElement : HTMLImageElement;

	private listener : MouseListener;

	static get SnapThresholdInPx() : number { return 10; }

	constructor(rootElement : HTMLElement, image : HTMLImageElement, dimensions : Vector2, pieceSize : Vector2 = new Vector2(-1, -1), intersectionPadding : Vector2 = new Vector2(-1, -1))
	{
		if (rootElement == null)
		{
			throw new ReferenceError("rootElement is an invalid element");
		}
		this.rootElement = rootElement;

		if (this.rootElement.querySelector("#playingfield") as HTMLElement == null)
		{
			throw new ReferenceError("rootElement has no '#playingfield'-child");
		}
		this.playingField = this.rootElement.querySelector("#playingfield") as HTMLElement;

		if (image == null)
		{
			throw new ReferenceError("No valid image-element was supplied");
		}
		this.imageElement = image;

		const playingFieldDimensions : ClientRect = this.playingField.getBoundingClientRect() as ClientRect;
		if (pieceSize.x == -1 || pieceSize.y == -1)
		{
			pieceSize = Vector2.divide(new Vector2((playingFieldDimensions.width*0.9) - Puzzle.SnapThresholdInPx*2, (playingFieldDimensions.height*0.9) - Puzzle.SnapThresholdInPx*2), dimensions);
			pieceSize = new Vector2(Math.round(pieceSize.x), Math.round(pieceSize.y));
		}
		if (intersectionPadding.x == -1 || intersectionPadding.y == -1)
		{
			intersectionPadding = Vector2.divide(pieceSize, 10);
			intersectionPadding = new Vector2(Math.round(intersectionPadding.x), Math.round(intersectionPadding.y));
		}

		this.listener = new MouseListener();

		this.pieces = new PuzzlePiece.PieceGrid(dimensions, pieceSize, intersectionPadding, this.onSelectItem.bind(this), this.onDeselectItem.bind(this));

		this.GenerateGrid();
		this.DrawImage();

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

		const pieceAmount : number = this.pieces.Dimensions.x * this.pieces.Dimensions.y;
		let passedElements : number = 0;
		let passedHalf : boolean = false;
		const availableSlots : Vector2 = new Vector2(
			Math.floor((this.rootElement.getBoundingClientRect() as ClientRect).width / (this.pieces.PieceSize.x + Puzzle.SnapThresholdInPx * 2)),
			Math.floor((this.rootElement.getBoundingClientRect() as ClientRect).height / (this.pieces.PieceSize.y + Puzzle.SnapThresholdInPx * 2))
		);
		let currentSlot : Vector2 = new Vector2(0, 0);

		let order : number[][] = [];
		order[0] = shuffle([...Array(this.pieces.Dimensions.x).keys()]);
		for (let x : number = 0; x < this.pieces.Dimensions.x; x++)
		{
			order[1] = shuffle([...Array(this.pieces.Dimensions.y).keys()]);
			for (let y : number = 0; y < this.pieces.Dimensions.y; y++)
			{
				const position = new Vector2(order[0][x], order[1][y]);
				if (!this.pieces.hasItem(position))
				{
					break;
				}

				const marginVector : Vector2 = new Vector2(Puzzle.SnapThresholdInPx, Puzzle.SnapThresholdInPx);

				const item = this.pieces.item(position);
				let moveToPosition = Vector2.multiply(currentSlot, Vector2.add(item.SizeWithPadding, marginVector));
				moveToPosition = Vector2.add(moveToPosition, marginVector);
				console.groupEnd()
				if (passedHalf)
				{
					moveToPosition.x = (this.rootElement.getBoundingClientRect() as ClientRect).width - (moveToPosition.x + item.SizeWithPadding.x);
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

	private IntoImageSpace(offset : Vector2, piece : PuzzlePiece.Piece) : Vector2
	{
		return new Vector2(
			offset.x / ((piece.Size.x * this.pieces.Dimensions.x) - (piece.IntersectionPadding.x/2)) * this.imageElement.naturalWidth,
			offset.y / ((piece.Size.y * this.pieces.Dimensions.y) - (piece.IntersectionPadding.y/2)) * this.imageElement.naturalHeight
		)
	}

	private DrawImage()
	{
		for (let x : number = 0; x < this.pieces.Dimensions.x; x++)
		{
			for (let y : number = 0; y < this.pieces.Dimensions.y; y++)
			{
				const position = new Vector2(x, y);
				if (!this.pieces.hasItem(position))
				{
					break;
				}

				const item = this.pieces.item(position);
				const context : CanvasRenderingContext2D = <CanvasRenderingContext2D>item.Element.getContext("2d");
				context.globalAlpha = 0.4;

				// // Create a circle
				// context.beginPath();
				// context.arc(item.Size.x/2, item.Size.y/2, 10, 0, Math.PI * 2, false);

				// // Clip to the current path
				// context.clip();

				context.drawImage(
					this.imageElement,
					(this.imageElement.naturalWidth / this.pieces.Dimensions.x * x) - this.IntoImageSpace(item.IntersectionPadding, item).x,
					(this.imageElement.naturalHeight / this.pieces.Dimensions.y * y) - this.IntoImageSpace(item.IntersectionPadding, item).y,
					(this.imageElement.naturalWidth / this.pieces.Dimensions.x) + this.IntoImageSpace(Vector2.multiply(item.IntersectionPadding, 2), item).x,
					(this.imageElement.naturalHeight / this.pieces.Dimensions.y) + this.IntoImageSpace(Vector2.multiply(item.IntersectionPadding, 2), item).y,
					0,
					0,
					item.SizeWithPadding.x,
					item.SizeWithPadding.y
				);
			}
		}
	}

	private GenerateGrid()
	{
		for (let x : number = 0; x < this.pieces.Dimensions.x; x++)
		{
			for (let y : number = 0; y < this.pieces.Dimensions.y; y++)
			{
				const position = new Vector2(x, y);
				if (!this.pieces.hasItem(position))
				{
					break;
				}

				const item = this.pieces.item(position);
				this.playingField.appendChild((item as PuzzlePiece.Piece).Element);
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

		this.forEachConnectedPiece(this.activePiece, (connection : PuzzlePieceConnection) =>
		{
			// ...take the source piece this piece is a neighbor of (and in which direction) and offset this piece accordingly
			//const relativeOverlap : Vector2 = this.IntoImageSpace(connection.AffectedPiece.IntersectionPadding, connection.AffectedPiece);
			const relativeOverlap : Vector2 = connection.AffectedPiece.IntersectionPadding;
			const offset : number = connection.Direction == PuzzlePiece.NeighborDirection.Up || connection.Direction == PuzzlePiece.NeighborDirection.Down ?
				connection.AffectedPiece.Size.y - (relativeOverlap.y*0): 
				connection.AffectedPiece.Size.x - (relativeOverlap.x*0);
			

			connection.AffectedPiece.moveTo(Vector2.add(connection.SourcePiece.getPosition(), Vector2.multiply(connection.Direction.Position, offset)));
			this.fixScreenBorderPosition(connection.AffectedPiece);
		});

		this.activePiece = null;
	}

	private CursorPositionUpdate(lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2)
	{
		if (this.activePiece == null)
		{
			return;
		}

		this.activePiece.moveBy(deltaPosition);

		this.forEachConnectedPiece(this.activePiece, (connection : PuzzlePieceConnection) =>
		{
			// ...take the source piece this piece is a neighbor of (and in which direction) and offset this piece accordingly
			//const relativeOverlap : Vector2 = this.IntoImageSpace(connection.AffectedPiece.IntersectionPadding, connection.AffectedPiece);
			const relativeOverlap : Vector2 = connection.AffectedPiece.IntersectionPadding;
			const offset : number = connection.Direction == PuzzlePiece.NeighborDirection.Up || connection.Direction == PuzzlePiece.NeighborDirection.Down ?
				connection.AffectedPiece.Size.y - (relativeOverlap.y*0): 
				connection.AffectedPiece.Size.x - (relativeOverlap.x*0);
			

			connection.AffectedPiece.moveTo(Vector2.add(connection.SourcePiece.getPosition(), Vector2.multiply(connection.Direction.Position, offset)));
		});
	}

	// Snapping and overlapping
	private handleOverlap(droppedPiece : PuzzlePiece.Piece, collider : PuzzlePiece.Piece)
	{
		const droppedRect : ClientRect = droppedPiece.Element.getBoundingClientRect() as ClientRect;
		const collidingRect : ClientRect = collider.Element.getBoundingClientRect() as ClientRect;

		let leftInBounds : 		boolean = droppedRect.left >		(collidingRect.left - 	Puzzle.SnapThresholdInPx) && droppedRect.left < 		(collidingRect.right + 		Puzzle.SnapThresholdInPx);
		let rightInBounds : 	boolean = droppedRect.right <		(collidingRect.right + 	Puzzle.SnapThresholdInPx) && droppedRect.right > 		(collidingRect.left - 		Puzzle.SnapThresholdInPx);
		let bottomInBounds : 	boolean = droppedRect.bottom <		(collidingRect.bottom +	Puzzle.SnapThresholdInPx) && droppedRect.bottom > 	(collidingRect.top -		Puzzle.SnapThresholdInPx);
		let topInBounds : 		boolean = droppedRect.top >			(collidingRect.top -	Puzzle.SnapThresholdInPx) && droppedRect.top < 		(collidingRect.bottom + 	Puzzle.SnapThresholdInPx);

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
		const currentRect : DOMRect = piece.Element.getBoundingClientRect() as DOMRect;
		let overlaps : PuzzlePiece.Piece[] = [];

		for (let x : number = 0; x < this.pieces.Dimensions.x; x++)
		{
			for (let y : number = this.pieces.Dimensions.y - 1; y >= 0; y--)
			{
				if (x == piece.Index.x && y == piece.Index.y)
				{
					continue;
				}

				const position : Vector2 = new Vector2(x, y);
				if (!this.pieces.hasItem(position))
				{
					continue;
				}

				const item = this.pieces.item(position);
				if (Rect.OverlapsWithBuffer(currentRect, item.Element.getBoundingClientRect() as DOMRect, Puzzle.SnapThresholdInPx))
				{
					overlaps.push(item);
				}
			}
		}
		
		if (overlaps.length > 0)
		{
			overlaps = overlaps.filter((item : PuzzlePiece.Piece) =>
			{
				let notNeighbor = true;
				PuzzlePiece.NeighborDirection.ForEach((direction : PuzzlePiece.NeighborDirection) =>
				{
					if (piece.hasNeighbor(direction) && piece.getNeighbor(direction).Index == item.Index)
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
		const pieceBounds = piece.Element.getBoundingClientRect();
		const boardBounds = this.rootElement.getBoundingClientRect();

		let overlap : Vector2 = new Vector2(0, 0);
		if (pieceBounds.left < boardBounds.left)
		{
			overlap.x += boardBounds.left - pieceBounds.left + Puzzle.SnapThresholdInPx;
		}
		if (pieceBounds.right > boardBounds.right)
		{
			overlap.x -= pieceBounds.right - boardBounds.right + Puzzle.SnapThresholdInPx;
		}
		if (pieceBounds.top < boardBounds.top)
		{
			overlap.y += boardBounds.top - pieceBounds.top + Puzzle.SnapThresholdInPx;
		}
		if (pieceBounds.bottom > boardBounds.bottom)
		{
			overlap.y -= pieceBounds.bottom - boardBounds.bottom + Puzzle.SnapThresholdInPx;
		}

		piece.moveBy(overlap);
		if (overlap.x != 0 || overlap.y != 0)
		{
			this.forEachConnectedPiece(piece, (connection : PuzzlePieceConnection) =>
			{
				// ...take the source piece this piece is a neighbor of (and in which direction) and offset this piece accordingly
				//const relativeOverlap : Vector2 = this.IntoImageSpace(connection.AffectedPiece.IntersectionPadding, connection.AffectedPiece);
				const relativeOverlap : Vector2 = connection.AffectedPiece.IntersectionPadding;
				const offset : number = connection.Direction == PuzzlePiece.NeighborDirection.Up || connection.Direction == PuzzlePiece.NeighborDirection.Down ?
					connection.AffectedPiece.Size.y - (relativeOverlap.y*0): 
					connection.AffectedPiece.Size.x - (relativeOverlap.x*0);
				

				connection.AffectedPiece.moveTo(Vector2.add(connection.SourcePiece.getPosition(), Vector2.multiply(connection.Direction.Position, offset)));
				this.fixScreenBorderPosition(connection.AffectedPiece);
			});
		}
	}

	// Out-of-screen helper
	private forEachConnectedPiece(piece : PuzzlePiece.Piece, callback : ConnectedPiecesCallback)
	{
		let itemsProcessed : PuzzlePiece.Piece[] = [];
		// Set the piece the player interacted with as starting point
		let itemsToProcess : PuzzlePieceConnection[] = [new PuzzlePieceConnection(piece, null, null)];

		// While we have pieces to process...
		while(itemsToProcess.length > 0)
		{
			const nextConnection : PuzzlePieceConnection = itemsToProcess.shift() as PuzzlePieceConnection;
			// ...mark the affected piece as processed
			itemsProcessed.push(nextConnection.AffectedPiece);

			// ...find all valid neighbors and mark them as "to be processed"
			PuzzlePiece.NeighborDirection.ForEach((direction : PuzzlePiece.NeighborDirection) =>
			{
				// ...check if we have a neighbor in this direction
				if (!nextConnection.AffectedPiece.hasNeighbor(direction))
				{
					return;
				}
				// ...if so, check if we've already touched it
				const neighborElement = nextConnection.AffectedPiece.getNeighbor(direction);
				if (itemsProcessed.indexOf(neighborElement) != -1)
				{
					return;
				}
				// ...if not, mark it as "to be processed"
				itemsToProcess.push(new PuzzlePieceConnection(neighborElement, direction, nextConnection.AffectedPiece));
			});

			// ...the source block initiating this process doesn't need to be moved (it's movement is what causes connected pieces to follow)
			if (nextConnection.isSourcePiece())
			{
				continue;
			}

			callback(nextConnection)
		}
	}
};