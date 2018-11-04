import "jest-extended"

import {Vector2} from "util/Vector2"

import {Piece, NeighborDirection} from "game/Piece" 
import {InternalPiece} from "game/InternalPiece" 
import {PuzzlePieceConnection} from "game/Puzzle" 

describe('PuzzlePieceConnection', () => {

	test('Constructor optional arguments', () => {
		const piece : Piece = ((Piece as any) as InternalPiece).Create(new Vector2(0, 0), new Vector2(50, 50), new Vector2(10, 10), () => {}, () => {}) as any as Piece;

		const connectionSomeArgs : PuzzlePieceConnection = new PuzzlePieceConnection(piece);
		const connectionAllArgs : PuzzlePieceConnection = new PuzzlePieceConnection(piece, null, null);
		expect(connectionSomeArgs).toMatchObject(connectionAllArgs);
	});

	test('Constructor valid connection', () => {
		const pieceA : Piece = ((Piece as any) as InternalPiece).Create(new Vector2(0, 0), new Vector2(50, 50), new Vector2(10, 10), () => {}, () => {}) as any as Piece;
		const pieceB : Piece = ((Piece as any) as InternalPiece).Create(new Vector2(1, 1), new Vector2(50, 50), new Vector2(10, 10), () => {}, () => {}) as any as Piece;

		const connectionAllArgs : PuzzlePieceConnection = new PuzzlePieceConnection(pieceA, NeighborDirection.Up, pieceB);
		expect(connectionAllArgs.AffectedPiece).toMatchObject(pieceA);
		expect(connectionAllArgs.Direction).toMatchObject(NeighborDirection.Up);
		expect(connectionAllArgs.SourcePiece).toMatchObject(pieceB);
	});

});

import {Puzzle} from "game/Puzzle"

const movePieceTo = (piece : Piece, targetPosition : Vector2, skipTests : boolean = false) =>
{
	const oldPosition : Vector2 = piece.getPosition();
	const offsetRequired : Vector2 = Vector2.subtract( targetPosition, oldPosition );
	document.dispatchEvent(new MouseEvent("mousemove", {clientX: 0, clientY: 0, bubbles: true}));
	piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 0, clientY: 0, bubbles: true}));
	document.dispatchEvent(new MouseEvent("mousemove", {clientX: offsetRequired.x, clientY: offsetRequired.y, bubbles: true}));
	piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: offsetRequired.x, clientY: offsetRequired.y, bubbles: true}));
	
	if (!skipTests)
	{
		expect(piece.getPosition()).toMatchObject(targetPosition);

		// if the targetPosition and starting position are alike, we cannot guarantee this expect()-call
		if (Vector2.equal(oldPosition, targetPosition))
		{
			expect(piece.getPosition()).not.toMatchObject(oldPosition);
		}
	}
};

describe('Puzzle', () => {

	beforeAll(() => {
		HTMLElement.prototype.getBoundingClientRect = function (this : HTMLElement) : ClientRect {
			return {
				width: parseInt(this.style.width as string),
				height: parseInt(this.style.height as string),
				top: parseInt(this.style.top as string),
				left: parseInt(this.style.left as string),
				right: parseInt(this.style.width as string) + parseInt(this.style.left as string),
				bottom: parseInt(this.style.height as string) + parseInt(this.style.top as string)
			} as ClientRect;
		};
	});

	beforeEach(() => {
		document.body.innerHTML =
			'<img src="https://i.ytimg.com/vi/NFI6mVEwtgA/maxresdefault.jpg" style="position:absolute;left:0px;top:0px;width:1280px;height:720px">'+
			'<div id="puzzle" style="position:absolute;left:0px;top:0px;width:1920px;height:1080px">'+
			'<div id="playingfield" style="position:absolute;left:420px;top:0px;width:1080px;height:1080px">'+
			'</div>'+
			'</div>';
	});

	test('Valid constructor', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		expect(((puzzle) as any).rootElement).toMatchObject(document.querySelector("#puzzle") as HTMLElement);
		expect(((puzzle) as any).playingField).toMatchObject(document.querySelector("#puzzle #playingfield") as HTMLElement);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).childElementCount).toBe(25);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().width).toEqual(1080);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().height).toEqual(1080);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().top).toEqual(0);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().left).toEqual(420);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().right).toEqual(1500);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().bottom).toEqual(1080);

		expect(((puzzle) as any).pieces.item(new Vector2(0, 0)).Size).toEqual((puzzle as any).pieces.PieceSize);
		expect(((puzzle) as any).pieces.item(new Vector2(0, 0)).IntersectionPadding).toEqual((puzzle as any).pieces.IntersectionPadding);
		expect(((puzzle) as any).pieces.item(new Vector2(0, 0)).SizeWithPadding).toEqual((puzzle as any).pieces.PieceSizeWithPadding);
	});

	test('Invalid constructor', () => {
		let construction = () => {};
		construction = () => {
			const puzzle : Puzzle = new Puzzle(document.querySelector("#a") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));
		};
		expect(construction).toThrowWithMessage(ReferenceError, "rootElement is an invalid element");

		construction = () => {
			const puzzle : Puzzle = new Puzzle(document.querySelector("#playingfield") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));
		};
		expect(construction).toThrowWithMessage(ReferenceError, "rootElement has no '#playingfield'-child");

		construction = () => {
			const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("#a") as HTMLImageElement, new Vector2(5, 5));
		};
		expect(construction).toThrowWithMessage(ReferenceError, "No valid image-element was supplied");
	});

	test('Moving pieces', () => {
		const zeroedPosition : Vector2 = new Vector2(
			(document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().left,
			(document.querySelector("#puzzle #playingfield") as HTMLElement).getBoundingClientRect().top
		);
		const moveByA : Vector2 = new Vector2(200, 100);
		const moveByB : Vector2 = new Vector2(-50, -25);
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		// find piece [2, 2]
		let piece : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let pieceStartingPosition : Vector2 = piece.getPosition();

		// reset position to inside the playarea
		expect(piece.getPosition()).toMatchObject(pieceStartingPosition);
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: pieceStartingPosition.x, clientY: pieceStartingPosition.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: pieceStartingPosition.x, clientY: pieceStartingPosition.y, bubbles: true}));
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: zeroedPosition.x, clientY: zeroedPosition.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: zeroedPosition.x, clientY: zeroedPosition.y, bubbles: true}));
		expect(piece.getPosition()).not.toMatchObject(pieceStartingPosition);
		expect(piece.getPosition()).toMatchObject(zeroedPosition);

		document.dispatchEvent(new MouseEvent("mousemove", {clientX: 0, clientY: 0, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 0, clientY: 0, bubbles: true}));
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		expect(piece.getPosition()).not.toMatchObject(zeroedPosition);
		expect(piece.getPosition()).toMatchObject(Vector2.add(zeroedPosition, moveByA));

		document.dispatchEvent(new MouseEvent("mousemove", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: moveByA.x + moveByB.x, clientY: moveByA.y + moveByB.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: moveByA.x + moveByB.x, clientY: moveByA.y + moveByB.y, bubbles: true}));

		expect(piece.getPosition()).not.toMatchObject(zeroedPosition);
		expect(piece.getPosition()).not.toMatchObject(Vector2.add(zeroedPosition, moveByA));
		expect(piece.getPosition()).toMatchObject(Vector2.add(Vector2.add(zeroedPosition, moveByA), moveByB));
	});

	test('Snap-back outside of play-area', () => {
		const dimensions : Vector2 = new Vector2(5, 5);
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, dimensions);

		// fix shuffling
		for (let x = 0; x < dimensions.x; x++)
		{
			for (let y = 0; y < dimensions.y; y++)
			{
				movePieceTo((puzzle as any).pieces.item(new Vector2(x, y)), new Vector2(500, 500));
			}
		}

		let piece : Piece = (puzzle as any).pieces.item(new Vector2(0, 0));

		const playingfieldBounds : ClientRect = (document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect() as ClientRect;
		const pieceSizePadding : Vector2 = (puzzle as any).pieces.PieceSizeWithPadding;

		movePieceTo(piece, new Vector2(playingfieldBounds.left, 0));
		movePieceTo(piece, new Vector2(playingfieldBounds.right-pieceSizePadding.x, 0));
		movePieceTo(piece, new Vector2(playingfieldBounds.left, playingfieldBounds.bottom-pieceSizePadding.y));
		movePieceTo(piece, new Vector2(playingfieldBounds.right-pieceSizePadding.x, playingfieldBounds.bottom-pieceSizePadding.y));

		movePieceTo(piece, new Vector2(playingfieldBounds.left-1, playingfieldBounds.top), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(-Puzzle.SnapThresholdInPx, playingfieldBounds.top));
		expect(piece.getPosition()).toMatchObject(new Vector2(playingfieldBounds.left + Puzzle.SnapThresholdInPx, playingfieldBounds.top));

		movePieceTo(piece, new Vector2(playingfieldBounds.left, playingfieldBounds.top-1), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(playingfieldBounds.left, -Puzzle.SnapThresholdInPx));
		expect(piece.getPosition()).toMatchObject(new Vector2(playingfieldBounds.left, playingfieldBounds.top + Puzzle.SnapThresholdInPx));

		movePieceTo(piece, new Vector2(playingfieldBounds.left, playingfieldBounds.bottom), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(playingfieldBounds.left, playingfieldBounds.bottom));
		expect(piece.getPosition()).toMatchObject(new Vector2(playingfieldBounds.left, playingfieldBounds.bottom - piece.SizeWithPadding.y - Puzzle.SnapThresholdInPx));

		movePieceTo(piece, new Vector2(playingfieldBounds.right, playingfieldBounds.top), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(playingfieldBounds.right, playingfieldBounds.top));
		expect(piece.getPosition()).toMatchObject(new Vector2(playingfieldBounds.right - piece.SizeWithPadding.y - Puzzle.SnapThresholdInPx, playingfieldBounds.top));
	});

	test('Connect two pieces and move them with generated intersection padding', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		const piece22 : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		const piece23 : Piece = (puzzle as any).pieces.item(new Vector2(2, 3));

		expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(false);
		expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(false);

		const offsetFromThreshold : number = 5;
		const offset : number = Puzzle.SnapThresholdInPx - offsetFromThreshold;

		const piece22Move : Vector2 = new Vector2(500, 500);
		const piece23Move : Vector2 = new Vector2(piece22Move.x, piece22Move.y + piece22.SizeWithPadding.y + (Puzzle.SnapThresholdInPx - offset));

		movePieceTo(piece22, new Vector2(piece22Move.x, piece22Move.y));
		movePieceTo(piece23, new Vector2(piece23Move.x, piece23Move.y));

		// connection should have happened here
		expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(true);
		expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(true);
		expect(piece22.getNeighbor(NeighborDirection.Down).Index).toMatchObject(piece23.Index);
		expect(piece23.getNeighbor(NeighborDirection.Up).Index).toMatchObject(piece22.Index);

		expect(piece22.getPosition()).toMatchObject(Vector2.subtract(piece23.getPosition(), new Vector2(0, piece23.SizeWithPadding.y - piece23.IntersectionPadding.y*2)));

		// items are connected and should follow each other
		movePieceTo(piece22, piece22Move);
		expect(piece23.getPosition()).toMatchObject(Vector2.add(piece22.getPosition(), new Vector2(0, piece22.SizeWithPadding.y - piece22.IntersectionPadding.y*2)));
	});

	test('Connect two pieces and connect a third piece through indirect movement', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		const piece22 : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		const piece23 : Piece = (puzzle as any).pieces.item(new Vector2(2, 3));

		expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(false);
		expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(false);

		const offsetFromThreshold : number = 5;
		const offset : number = Puzzle.SnapThresholdInPx - offsetFromThreshold;

		const piece22Move : Vector2 = new Vector2(500, 500);
		const piece23Move : Vector2 = new Vector2(piece22Move.x, piece22Move.y + piece22.SizeWithPadding.y + (Puzzle.SnapThresholdInPx - offset));

		// connect pieces like in test above
		movePieceTo(piece22, piece22Move);
		movePieceTo(piece23, piece23Move);

		// move [2, 2] and expect a connection between [2, 3] and [2, 4] to occur when dropping [2, 2]
		// prepare [2, 4] position
		const piece24 : Piece = (puzzle as any).pieces.item(new Vector2(2, 4));
		const piece24Move : Vector2 = new Vector2(600, 600);
		movePieceTo(piece24, piece24Move);

		// calculate offset required for connection
		const offsetByPiece = piece22.SizeWithPadding.y + (Puzzle.SnapThresholdInPx - offset);
		// move [2, 2]...
		movePieceTo(piece22, new Vector2(piece24Move.x, piece24Move.y - (piece22.Size.y*2) - offsetFromThreshold));

		// .. and verify connection between [2, 3] and [2, 4]
		expect(piece23.hasNeighbor(NeighborDirection.Down)).toBe(true);
		expect(piece24.hasNeighbor(NeighborDirection.Up)).toBe(true);
		expect(piece23.getNeighbor(NeighborDirection.Down).Index).toMatchObject(piece24.Index);
		expect(piece24.getNeighbor(NeighborDirection.Up).Index).toMatchObject(piece23.Index);

		expect(piece23.getPosition()).toMatchObject(Vector2.subtract(piece24.getPosition(), new Vector2(0, piece24.SizeWithPadding.y - piece24.IntersectionPadding.y*2)));

		// items are connected and should follow each other
		movePieceTo(piece22, piece22Move);
		expect(piece24.getPosition()).toMatchObject(Vector2.add(piece23.getPosition(), new Vector2(0, piece23.SizeWithPadding.y - piece23.IntersectionPadding.y*2)));
	});

	const x = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
	const y = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
	const snapThresholdInPx = Math.floor(Math.random() * ((Puzzle.SnapThresholdInPx-1) - 0 + 1)) + 0;

	((x : number, y : number, snapThresholdInPx : number) =>
	{
		test(`[RANDOM] Connect two pieces and move them with custom intersection padding [${x}, ${y}] (thresh ${snapThresholdInPx})`, () => {
			const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5), new Vector2(50, 50), new Vector2(x, y));

			const piece22 : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
			const piece23 : Piece = (puzzle as any).pieces.item(new Vector2(2, 3));

			expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(false);
			expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(false);

			const offset : number = Puzzle.SnapThresholdInPx - snapThresholdInPx;

			const piece22Move : Vector2 = new Vector2(500, 500);
			const piece23Move : Vector2 = new Vector2(piece22Move.x, piece22Move.y + piece22.SizeWithPadding.y + (Puzzle.SnapThresholdInPx - offset));

			movePieceTo(piece22, piece22Move);
			movePieceTo(piece23, piece23Move);

			// connection should have happened here
			expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(true);
			expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(true);
			expect(piece22.getNeighbor(NeighborDirection.Down).Index).toMatchObject(piece23.Index);
			expect(piece23.getNeighbor(NeighborDirection.Up).Index).toMatchObject(piece22.Index);

			expect(piece22.getPosition()).toMatchObject(Vector2.subtract(piece23.getPosition(), new Vector2(0, piece23.SizeWithPadding.y - piece23.IntersectionPadding.y*2)));

			// items are connected and should follow each other
			movePieceTo(piece22, piece22Move);
			expect(piece23.getPosition()).toMatchObject(Vector2.add(piece22.getPosition(), new Vector2(0, piece22.SizeWithPadding.y - piece22.IntersectionPadding.y*2)));
		});
	})(x, y, snapThresholdInPx);

	test('Snap-back outside of play-area with connected pieces with no intersection padding', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5), new Vector2(10, 10));

		let piece : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let pieceStartingPosition : Vector2 = piece.getPosition();

		let piece22 : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let piece23 : Piece = (puzzle as any).pieces.item(new Vector2(2, 3));
		let piece24 : Piece = (puzzle as any).pieces.item(new Vector2(2, 4));

		// fprce-connect three pieces
		expect(piece22.setNeighbor(NeighborDirection.Down, piece23)).toBe(true);
		expect(piece23.setNeighbor(NeighborDirection.Down, piece24)).toBe(true);

		// move lowest one out of top of screen
		const rootPosition = new Vector2(500, -10);
		movePieceTo(piece24, rootPosition, true);

		expect(piece24.getPosition()).not.toMatchObject(new Vector2(rootPosition.x, rootPosition.y));
		expect(piece23.getPosition()).not.toMatchObject(new Vector2(rootPosition.x, rootPosition.y-piece23.SizeWithPadding.y));
		expect(piece22.getPosition()).not.toMatchObject(new Vector2(rootPosition.x, rootPosition.y-piece23.SizeWithPadding.y-piece22.SizeWithPadding.y));

		// expect hightest one to be properly corrected and neighbors follow suit
		expect(piece22.getPosition()).toMatchObject(new Vector2(rootPosition.x, Puzzle.SnapThresholdInPx));
		expect(piece23.getPosition()).toMatchObject(new Vector2(rootPosition.x, Puzzle.SnapThresholdInPx+piece23.SizeWithPadding.y));
		expect(piece24.getPosition()).toMatchObject(new Vector2(rootPosition.x, Puzzle.SnapThresholdInPx+piece23.SizeWithPadding.y+piece24.SizeWithPadding.y));
	});

});