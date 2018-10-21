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

describe('Puzzle', () => {

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
		HTMLCanvasElement.prototype.getBoundingClientRect = function (this : HTMLCanvasElement) : ClientRect {
			console.log(this.style);
			return {
				width: parseInt(this.style.width as string),
				height: parseInt(this.style.height as string),
				top: parseInt(this.style.top as string),
				left: parseInt(this.style.left as string),
				right: parseInt(this.style.width as string) + parseInt(this.style.left as string),
				bottom: parseInt(this.style.height as string) + parseInt(this.style.top as string)
			} as ClientRect;
		};
		const moveByA : Vector2 = new Vector2(200, 200);
		const moveByB : Vector2 = new Vector2(50, 50);
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

});