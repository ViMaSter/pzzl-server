import "jest-extended"

import {Vector2} from "util/Vector2"

import {Piece, NeighborDirection} from "game/Piece" 
import {InternalPiece} from "game/InternalPiece" 
import {PuzzlePieceConnection} from "game/Puzzle" 

describe('PuzzlePieceConnection', () => {

	test('Constructor optional arguments', () => {
		const piece : Piece = ((Piece as any) as InternalPiece).Create(new Vector2(0, 0), new Vector2(50, 50), () => {}, () => {}) as any as Piece;

		const connectionSomeArgs : PuzzlePieceConnection = new PuzzlePieceConnection(piece);
		const connectionAllArgs : PuzzlePieceConnection = new PuzzlePieceConnection(piece, null, null);
		expect(connectionSomeArgs).toMatchObject(connectionAllArgs);
	});

	test('Constructor valid connection', () => {
		const pieceA : Piece = ((Piece as any) as InternalPiece).Create(new Vector2(0, 0), new Vector2(50, 50), () => {}, () => {}) as any as Piece;
		const pieceB : Piece = ((Piece as any) as InternalPiece).Create(new Vector2(1, 1), new Vector2(50, 50), () => {}, () => {}) as any as Piece;

		const connectionAllArgs : PuzzlePieceConnection = new PuzzlePieceConnection(pieceA, NeighborDirection.Up, pieceB);
		expect(connectionAllArgs.AffectedPiece).toMatchObject(pieceA);
		expect(connectionAllArgs.Direction).toMatchObject(NeighborDirection.Up);
		expect(connectionAllArgs.SourcePiece).toMatchObject(pieceB);
	});

});

import {Puzzle} from "game/Puzzle"

const movePieceTo = (piece : Piece, position : Vector2, skipTests : boolean = false) =>
{
	const oldPosition : Vector2 = piece.getPosition();
	const offsetRequired : Vector2 = Vector2.subtract( position, oldPosition );
	document.dispatchEvent(new MouseEvent("mousemove", {clientX: 0, clientY: 0, bubbles: true}));
	piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 0, clientY: 0, bubbles: true}));
	document.dispatchEvent(new MouseEvent("mousemove", {clientX: offsetRequired.x, clientY: offsetRequired.y, bubbles: true}));
	piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: offsetRequired.x, clientY: offsetRequired.y, bubbles: true}));
	
	if (!skipTests)
	{
		expect(piece.getPosition()).toMatchObject(position);
		expect(piece.getPosition()).not.toMatchObject(oldPosition);
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
			'<img src="https://i.ytimg.com/vi/NFI6mVEwtgA/maxresdefault.jpg">'+
			'<div id="puzzle" style="position:absolute;left:0px;top:0px;width:1280px;height:720px">'+
			'<div id="playingfield">'+
			'</div>'+
			'</div>';
	});

	test('Valid constructor', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		expect(((puzzle) as any).rootElement).toMatchObject(document.querySelector("#puzzle") as HTMLElement);
		expect(((puzzle) as any).playingField).toMatchObject(document.querySelector("#puzzle #playingfield") as HTMLElement);
		expect((document.querySelector("#puzzle #playingfield") as HTMLElement).childElementCount).toBe(25);
		expect((document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect().width).not.toEqual(NaN);
		expect((document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect().height).not.toEqual(NaN);
		expect((document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect().top).not.toEqual(NaN);
		expect((document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect().left).not.toEqual(NaN);
		expect((document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect().right).not.toEqual(NaN);
		expect((document.querySelector("#puzzle") as HTMLElement).getBoundingClientRect().bottom).not.toEqual(NaN);
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
		const moveByA : Vector2 = new Vector2(700, 10);
		const moveByB : Vector2 = new Vector2(50, -20);
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		// find piece [2, 2]
		let piece : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let pieceStartingPosition : Vector2 = piece.getPosition();
		// and move it by [200px, 200px];
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: 0, clientY: 0, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 0, clientY: 0, bubbles: true}));
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		expect(piece.getPosition()).not.toMatchObject(pieceStartingPosition);
		expect(piece.getPosition()).toMatchObject(Vector2.add(pieceStartingPosition, moveByA));

		// now move it by [50px, 50px] (total of [250px, 250px]);
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: moveByA.x, clientY: moveByA.y, bubbles: true}));
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: moveByA.x + moveByB.x, clientY: moveByA.y + moveByB.y, bubbles: true}));
		piece.Element.dispatchEvent(new MouseEvent("mouseup", {clientX: moveByA.x + moveByB.x, clientY: moveByA.y + moveByB.y, bubbles: true}));

		expect(piece.getPosition()).not.toMatchObject(pieceStartingPosition);
		expect(piece.getPosition()).not.toMatchObject(Vector2.add(pieceStartingPosition, moveByA));
		expect(piece.getPosition()).toMatchObject(Vector2.add(Vector2.add(pieceStartingPosition, moveByA), moveByB));
	});

	test('Connect two pieces and move them', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		// find piece [2, 2]
		let piece : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let pieceStartingPosition : Vector2 = piece.getPosition();

		let piece22 : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let piece23 : Piece = (puzzle as any).pieces.item(new Vector2(2, 3));

		expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(false);
		expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(false);

		movePieceTo(piece22, new Vector2(500, 500));
		movePieceTo(piece23, new Vector2(500, 545));

		// connection should have happened here
		expect(piece22.hasNeighbor(NeighborDirection.Down)).toBe(true);
		expect(piece23.hasNeighbor(NeighborDirection.Up)).toBe(true);

		expect(piece.getPosition()).toMatchObject(new Vector2(500, 495));

		// items are connected and should follow each other
		movePieceTo(piece22, new Vector2(500, 500));
		expect(piece23.getPosition()).toMatchObject(new Vector2(500, 550));

		expect(piece22.getNeighbor(NeighborDirection.Down).Index).toMatchObject(piece23.Index);
		expect(piece23.getNeighbor(NeighborDirection.Up).Index).toMatchObject(piece22.Index);
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

		movePieceTo(piece, new Vector2(0, 0));
		movePieceTo(piece, new Vector2(1280-50, 0));
		movePieceTo(piece, new Vector2(0, 720-50));
		movePieceTo(piece, new Vector2(1280-50, 720-50));

		movePieceTo(piece, new Vector2(-1, 0), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(-puzzle.SnapThresholdInPx, 0));
		expect(piece.getPosition()).toMatchObject(new Vector2(10, 0));

		movePieceTo(piece, new Vector2(0, -1), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(0, -puzzle.SnapThresholdInPx));
		expect(piece.getPosition()).toMatchObject(new Vector2(0, 10));

		movePieceTo(piece, new Vector2(0, 720), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(0, 720));
		expect(piece.getPosition()).toMatchObject(new Vector2(0, 720 - piece.Size.y - puzzle.SnapThresholdInPx));

		movePieceTo(piece, new Vector2(1280, 0), true);
		expect(piece.getPosition()).not.toMatchObject(new Vector2(1280, 0));
		expect(piece.getPosition()).toMatchObject(new Vector2(1280 - piece.Size.y - puzzle.SnapThresholdInPx, 0));
	});

	test('Snap-back outside of play-area with connected pieces', () => {
		const puzzle : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5));

		let piece : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let pieceStartingPosition : Vector2 = piece.getPosition();

		let piece22 : Piece = (puzzle as any).pieces.item(new Vector2(2, 2));
		let piece23 : Piece = (puzzle as any).pieces.item(new Vector2(2, 3));
		let piece24 : Piece = (puzzle as any).pieces.item(new Vector2(2, 4));

		// connect three pieces
		expect(piece22.setNeighbor(NeighborDirection.Down, piece23)).toBe(true);
		expect(piece23.setNeighbor(NeighborDirection.Down, piece24)).toBe(true);

		// move lowest one out of top of screen
		movePieceTo(piece24, new Vector2(500, -10), true);
		expect(piece24.getPosition()).not.toMatchObject(new Vector2(500, -10));
		expect(piece23.getPosition()).not.toMatchObject(new Vector2(500, -60));
		expect(piece22.getPosition()).not.toMatchObject(new Vector2(500, -110));

		// expect hightest one to be properly corrected and neighbors follow suit
		expect(piece22.getPosition()).toMatchObject(new Vector2(500, 10));
		expect(piece23.getPosition()).toMatchObject(new Vector2(500, 60));
		expect(piece24.getPosition()).toMatchObject(new Vector2(500, 110));
	});

});