import "jest-extended"

import {Vector2} from "util/Vector2" 

import { Piece, IntersectionDescription, NeighborDirection, ToggleItemCallback } from "game/Piece" 
interface InternalPiece
{
	Create: (position : Vector2, size : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback) => InternalPiece;
	setIntersection: (direction : NeighborDirection, intersectionDescription : IntersectionDescription) => void;
	getCounterForIntersection: (direction : NeighborDirection) => IntersectionDescription;
}

describe('Piece', () => {
	test('CreateCounterCorrect', () => {
		const position : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const piece : Piece = (Piece as any).Create(position, size, ()=>{}, ()=>{});
		
		expect(Vector2.equal(piece.Position, position)).toBe(true);
		expect(Vector2.equal(piece.Size, size)).toBe(true);
	});
	test('CreateCounterInvalidPosition', () => {
		let position : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);

		position = new Vector2(-1, 0);
		let construction = () => {
			const piece : Piece = (Piece as any).Create(position, size, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Position X has to be 0 or bigger!");

		position = new Vector2(0, -1);
		construction = () => {
			const piece : Piece = (Piece as any).Create(position, size, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Position Y has to be 0 or bigger!");
		position = new Vector2(0, 0);
	});
	test('CreateCounterInvalidSize', () => {
		const position : Vector2 = new Vector2(0, 0);
		let size : Vector2 = new Vector2(50, 50);

		size = new Vector2(-1, 1);
		let construction = () => {
			const piece : Piece = (Piece as any).Create(position, size, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Size X has to be bigger than 0!");

		size = new Vector2(1, -1);
		construction = () => {
			const piece : Piece = (Piece as any).Create(position, size, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Size Y has to be bigger than 0!");
	});
});