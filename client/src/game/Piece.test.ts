/*
NeighborDirection
	Opposite-Check
		Opposite never 'new NeighborDirection("", new Vector2(-1, -1));'
	ForEach

IntersectionDescription
	CreateNew
		isOutwards : boolean, shape : Shape, outwardishSideCurvature : number, size : Vector2, offset : Vector2
		values are correct
	CreateCounter
		inversion works as expected
	CreateDefault()
		double-check values
*/

import {Vector2} from "util/Vector2" 
import {NeighborDirection} from "game/Piece" 

describe('NeighborDirection', () => {

	test('Values', () => {
		expect(NeighborDirection.Up).toMatchObject({name: "Up", position: new Vector2(0, -1)});
		expect(NeighborDirection.Down).toMatchObject({name: "Down", position: new Vector2(0, 1)});
		expect(NeighborDirection.Left).toMatchObject({name: "Left", position: new Vector2(-1, 0)});
		expect(NeighborDirection.Right).toMatchObject({name: "Right", position: new Vector2(1, 0)});
	});

	test('Opposite', () => {
		expect(NeighborDirection.Opposite(NeighborDirection.Up)).toMatchObject(NeighborDirection.Down);
		expect(NeighborDirection.Opposite(NeighborDirection.Down)).toMatchObject(NeighborDirection.Up);
		expect(NeighborDirection.Opposite(NeighborDirection.Left)).toMatchObject(NeighborDirection.Right);
		expect(NeighborDirection.Opposite(NeighborDirection.Right)).toMatchObject(NeighborDirection.Left);
	});

	test('ForEach', () => {
		const method = jest.fn();
		NeighborDirection.ForEach(method);
		expect(method.mock.calls.length).toBe(4);
		expect(method.mock.calls[0][0]).toMatchObject(NeighborDirection.Up);
		expect(method.mock.calls[1][0]).toMatchObject(NeighborDirection.Down);
		expect(method.mock.calls[2][0]).toMatchObject(NeighborDirection.Left);
		expect(method.mock.calls[3][0]).toMatchObject(NeighborDirection.Right);
	});

});


import {IntersectionDescription, Shape} from "game/Piece" 

describe('IntersectionDescription', () => {

	test('CreateDefault', () => {
		expect(IntersectionDescription.CreateDefault()).toMatchObject({
			isOutwards: true, 
			shape: Shape.NONE, 
			outwardishSideCurvature: 0, 
			size: new Vector2(1, 1), 
			offset: new Vector2(0, 1)
		});
		expect(IntersectionDescription.CreateDefault()).not.toMatchObject({
			isOutwards: false, 
			shape: Shape.Sphere, 
			outwardishSideCurvature: 1, 
			size: new Vector2(0, 0), 
			offset: new Vector2(1, 0)
		});
	});

	test('CreateNew can rebuild default', () => {
		expect(IntersectionDescription.CreateDefault()).toMatchObject(IntersectionDescription.CreateNew(
			true, 
			Shape.NONE, 
			0, 
			new Vector2(1, 1), 
			new Vector2(0, 1)
		));
		expect(IntersectionDescription.CreateDefault()).not.toMatchObject(IntersectionDescription.CreateNew(
			false, 
			Shape.Sphere, 
			1, 
			new Vector2(0, 0), 
			new Vector2(1, 0)
		));
	});

	test('CreateNew produces sane values', () => {
		const intersectionDescriptionA = IntersectionDescription.CreateNew(true, Shape.NONE, 0, new Vector2(1, 1), new Vector2(0, 1));
		const intersectionDescriptionB = IntersectionDescription.CreateNew(false, Shape.NONE, 0, new Vector2(1, 1), new Vector2(0, 1));

		expect(intersectionDescriptionA).toMatchObject(intersectionDescriptionA);
		expect(intersectionDescriptionA).not.toMatchObject(intersectionDescriptionB);


		expect(intersectionDescriptionA).toMatchObject({
			isOutwards: true,
			shape: Shape.NONE,
			outwardishSideCurvature: 0,
			size: new Vector2(1, 1),
			offset: new Vector2(0, 1)
		});
		expect(intersectionDescriptionB).not.toMatchObject({
			isOutwards: true,
			shape: Shape.NONE,
			outwardishSideCurvature: 0,
			size: new Vector2(1, 1),
			offset: new Vector2(0, 1)
		});
	});

	test('CreateCounter', () => {
		const intersectionDescriptionOriginal = IntersectionDescription.CreateNew(true, Shape.Sphere, 1, new Vector2(1, 1), new Vector2(1, 1));
		const intersectionDescriptionExpectedCounter = IntersectionDescription.CreateNew(false, Shape.Sphere, -1, new Vector2(1, 1), new Vector2(-1, -1));

		expect(IntersectionDescription.CreateCounter(intersectionDescriptionOriginal)).toMatchObject(intersectionDescriptionExpectedCounter);
		expect(IntersectionDescription.CreateCounter(intersectionDescriptionOriginal)).not.toMatchObject(intersectionDescriptionOriginal);
	});

});