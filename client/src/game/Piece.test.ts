import "jest-extended"

import {Vector2} from "util/Vector2" 

import { Piece, IntersectionDescription, NeighborDirection, ToggleItemCallback } from "game/Piece" 
interface InternalPiece
{
	Create: (index : Vector2, size : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback) => InternalPiece;
	setIntersection: (direction : NeighborDirection, intersectionDescription : IntersectionDescription) => void;
	getCounterForIntersection: (direction : NeighborDirection) => IntersectionDescription;
}

describe('Piece', () => {

	test('CreateCounterCorrect', () => {
		const index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, ()=>{}, ()=>{}) as any as Piece;
		
		expect(Vector2.equal(piece.Index, index)).toBe(true);
		expect(Vector2.equal(piece.Size, size)).toBe(true);
	});

	test('CreateCounterInvalidIndex', () => {
		let index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);

		index = new Vector2(-1, 0);
		let construction = () => {
			const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, ()=>{}, ()=>{}) as any as Piece;
		};
		expect(construction).toThrowWithMessage(RangeError, "Index X has to be 0 or bigger!");

		index = new Vector2(0, -1);
		construction = () => {
			const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, ()=>{}, ()=>{}) as any as Piece;
		};
		expect(construction).toThrowWithMessage(RangeError, "Index Y has to be 0 or bigger!");
		index = new Vector2(0, 0);
	});

	test('CreateCounterInvalidSize', () => {
		const index : Vector2 = new Vector2(0, 0);
		let size : Vector2 = new Vector2(50, 50);

		size = new Vector2(-1, 1);
		let construction = () => {
			const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, ()=>{}, ()=>{}) as any as Piece;
		};
		expect(construction).toThrowWithMessage(RangeError, "Size X has to be bigger than 0!");

		size = new Vector2(1, -1);
		construction = () => {
			const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, ()=>{}, ()=>{}) as any as Piece;
		};
		expect(construction).toThrowWithMessage(RangeError, "Size Y has to be bigger than 0!");
	});
	
	test('CreateCounterCallbacks', () => {
		const index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;
		
		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(1);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(1);
		window.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(1);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(2);
	});
	
	test('MoveBy', () => {
		const index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;

		expect(piece.getPosition()).toMatchObject({x: 0, y: 0});
		expect(piece.getPosition()).not.toMatchObject({x: -1, y: -1});

		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(1);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(1);

		piece.moveBy(new Vector2(50, 50));
		expect(piece.getPosition()).toMatchObject({x: 50, y: 50});
		expect(piece.getPosition()).not.toMatchObject({x: 0, y: 0});

		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 70, clientY: 70, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(2);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(2);
		window.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(2);
	});
	
	test('MoveBy', () => {
		const index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;

		expect(piece.getPosition()).toMatchObject({x: 0, y: 0});
		expect(piece.getPosition()).not.toMatchObject({x: -1, y: -1});

		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(1);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(1);

		piece.moveBy(new Vector2(40, 10));
		piece.moveBy(new Vector2(10, 40));
		expect(piece.getPosition()).toMatchObject({x: 50, y: 50});
		expect(piece.getPosition()).not.toMatchObject({x: 0, y: 0});

		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 70, clientY: 70, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(2);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(2);
		window.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(2);
	});
	
	test('MoveTo', () => {
		const index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;

		expect(piece.getPosition()).toMatchObject({x: 0, y: 0});
		expect(piece.getPosition()).not.toMatchObject({x: -1, y: -1});

		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(1);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(1);

		piece.moveTo(new Vector2(50, 50));
		expect(piece.getPosition()).toMatchObject({x: 50, y: 50});
		expect(piece.getPosition()).not.toMatchObject({x: 0, y: 0});

		piece.Element.dispatchEvent(new MouseEvent("mousedown", {clientX: 70, clientY: 70, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(2);
		window.dispatchEvent(new MouseEvent("mouseup", {clientX: -1, clientY: -1, bubbles: true}));
		expect(onDeselect.mock.calls.length).toBe(2);
		window.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(onSelect.mock.calls.length).toBe(2);
	});
	
	test('Default Neighbors', () => {
		const index : Vector2 = new Vector2(0, 0);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;
		NeighborDirection.ForEach((direction : NeighborDirection) =>
		{
			expect(piece.hasNeighbor(direction)).toBe(false);
		});
	});
	
	test('Neighbors', () => {
		const index : Vector2 = new Vector2(1, 1);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;

		const spyOnConsoleError = jest.spyOn(console, "error");
		spyOnConsoleError.mockImplementation(() => {});
		
		let errorIndex = 0;
		NeighborDirection.ForEach((direction : NeighborDirection) =>
		{
			// Check theres no neighbor...
			expect(piece.hasNeighbor(direction)).toBe(false);
			// Create another piece...
			const neighborPiece : Piece = ((Piece as any) as InternalPiece).Create(Vector2.add(index, direction.Position), size, onSelect, onDeselect) as any as Piece;
			// ...and add it
			expect(piece.setNeighbor(direction, neighborPiece)).toBe(true);

			// Check we have a neighbor
			expect(piece.hasNeighbor(direction)).toBe(true);
			// Check and so does the neighbor cell with the initial cell
			expect(neighborPiece.hasNeighbor(NeighborDirection.Opposite(direction))).toBe(true);

			// Ensure the neighbor's indeces are matching
			expect(
				neighborPiece.getNeighbor(NeighborDirection.Opposite(direction)).Index)
			.toMatchObject(
				piece.Index);

			expect(
				piece.getNeighbor(direction).Index)
			.toMatchObject(
				neighborPiece.Index);

			// And adding another neighbor will fail
			const secondNeighborPiece : Piece = ((Piece as any) as InternalPiece).Create(Vector2.add(index, direction.Position), size, onSelect, onDeselect) as any as Piece;
			expect(piece.setNeighbor(direction, secondNeighborPiece)).toBe(false); errorIndex++;
			expect(spyOnConsoleError).toHaveBeenCalledTimes(errorIndex);
		});
		spyOnConsoleError.mockRestore();
	});
	
	test('Intersection', () => {
		const index : Vector2 = new Vector2(1, 1);
		const size : Vector2 = new Vector2(50, 50);
		const onSelect : any = jest.fn(() => {});
		const onDeselect : any = jest.fn(() => {});

		const piece : Piece = ((Piece as any) as InternalPiece).Create(index, size, onSelect, onDeselect) as any as Piece;

		const spyOnConsoleError = jest.spyOn(console, "error");
		spyOnConsoleError.mockImplementation(() => {});
		
		let errorIndex = 0;

		const intersectionDescription : IntersectionDescription = IntersectionDescription.CreateDefault();
		NeighborDirection.ForEach((direction : NeighborDirection) =>
		{
			expect(piece.hasNeighbor(direction)).toBe(false);
			expect(((piece as any) as InternalPiece).setIntersection(direction, intersectionDescription)).toBe(true);
			expect((piece as any).getIntersection(direction)).toMatchObject(intersectionDescription);
			expect(((piece as any) as InternalPiece).getCounterForIntersection(direction)).toMatchObject(IntersectionDescription.CreateCounter(intersectionDescription));
			expect(((piece as any) as InternalPiece).setIntersection(direction, intersectionDescription)).toBe(false);
		});
		spyOnConsoleError.mockRestore();
	});



		

});