import "jest-extended"

import { Vector2 } from "util/Vector2" 
import { PieceGrid, ToggleItemCallback } from "game/Piece" 

describe('Piece', () => {

	test('Construct correctly', () => {
		const dimensions : Vector2 = new Vector2(10, 10);
		const pieceSize : Vector2 = new Vector2(50, 50);
		const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});

		expect(pieceGrid.Dimensions).toMatchObject(dimensions);
		expect(pieceGrid.PieceSize).toMatchObject(pieceSize);
	});

	test('Construct incorrectly', () => {
		let dimensions : Vector2 = new Vector2(10, 10);
		let pieceSize : Vector2 = new Vector2(50, 50);
		let construction = () => {};

		dimensions = new Vector2(0, 0);
		construction = () => {
			const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Dimensions X has to be bigger than 0");

		dimensions = new Vector2(10, 0);
		construction = () => {
			const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Dimensions Y has to be bigger than 0");

		dimensions = new Vector2(-1, -1);
		construction = () => {
			const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Dimensions X has to be bigger than 0");

		dimensions = new Vector2(10, -1);
		construction = () => {
			const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "Dimensions Y has to be bigger than 0");
		dimensions = new Vector2(10, 10);

		pieceSize = new Vector2(-1, 10);
		construction = () => {
			const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "PieceSize X has to be bigger than 0");

		pieceSize = new Vector2(10, -1);
		construction = () => {
			const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		};
		expect(construction).toThrowWithMessage(RangeError, "PieceSize Y has to be bigger than 0");
	});

	test('hasItem & getItem', () => {
		const dimensions : Vector2 = new Vector2(10, 10);
		const pieceSize : Vector2 = new Vector2(50, 50);
		const pieceGrid : PieceGrid = new PieceGrid(dimensions, pieceSize, ()=>{}, ()=>{});
		let access = () => {};
		for (let x : number = -dimensions.x; x < 0; x++)
		{
			for (let y : number = -dimensions.y; y < 0; y++)
			{
				expect(pieceGrid.hasItem(new Vector2(x, y))).toBe(false);

				access = () => {
					return pieceGrid.item(new Vector2(x, y));
				};
				expect(access).toThrow(TypeError);
			}
		}
		for (let x : number = 0; x < dimensions.x; x++)
		{
			for (let y : number = 0; y < dimensions.y; y++)
			{
				expect(pieceGrid.hasItem(new Vector2(x, y))).toBe(true);

				access = () => {
					return pieceGrid.item(new Vector2(x, y));
				};
				expect(access).not.toThrow(TypeError);
				expect(pieceGrid.item(new Vector2(x, y)).Index).toMatchObject(new Vector2(x, y));
			}
		}
		for (let x : number = dimensions.x; x < dimensions.x+dimensions.x; x++)
		{
			for (let y : number = dimensions.y; y < dimensions.y+dimensions.y; y++)
			{
				expect(pieceGrid.hasItem(new Vector2(x, y))).toBe(false);

				access = () => {
					return pieceGrid.item(new Vector2(x, y));
				};
				expect(access).toThrow(TypeError);
			}
		}
	});

});