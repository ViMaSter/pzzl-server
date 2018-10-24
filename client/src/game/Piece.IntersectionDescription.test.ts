import "jest-extended"

import {Vector2} from "util/Vector2" 
import {IntersectionDescription, Shape} from "game/Piece" 

describe('IntersectionDescription', () => {

	test('CreateDefault', () => {
		expect(IntersectionDescription.CreateDefault()).toMatchObject({
			isOutwards: true, 
			shape: Shape.NONE, 
			outwardishSideCurvature: 0, 
			size: new Vector2(1, 1), 
			offset: new Vector2(0, 0)
		});
		expect(IntersectionDescription.CreateDefault()).not.toMatchObject({
			isOutwards: false, 
			shape: Shape.Sphere, 
			outwardishSideCurvature: 1, 
			size: new Vector2(0, 0), 
			offset: new Vector2(1, 1)
		});
	});

	test('CreateNew can rebuild default', () => {
		expect(IntersectionDescription.CreateDefault()).toMatchObject(IntersectionDescription.CreateNew(
			true, 
			Shape.NONE, 
			0, 
			new Vector2(1, 1), 
			new Vector2(0, 0)
		));
		expect(IntersectionDescription.CreateDefault()).not.toMatchObject(IntersectionDescription.CreateNew(
			false, 
			Shape.Sphere, 
			1, 
			new Vector2(0, 0), 
			new Vector2(1, 1)
		));
	});

	test('CreateNew produces sane values', () => {
		const intersectionDescriptionA = IntersectionDescription.CreateNew(true, Shape.NONE, 0, new Vector2(1, 1), new Vector2(0, 0));
		const intersectionDescriptionB = IntersectionDescription.CreateNew(false, Shape.NONE, 0, new Vector2(1, 1), new Vector2(0, 0));

		expect(intersectionDescriptionA).toMatchObject(intersectionDescriptionA);
		expect(intersectionDescriptionA).not.toMatchObject(intersectionDescriptionB);

		expect(intersectionDescriptionA).toMatchObject({
			isOutwards: true,
			shape: Shape.NONE,
			outwardishSideCurvature: 0,
			size: new Vector2(1, 1),
			offset: new Vector2(0, 0)
		});
		expect(intersectionDescriptionB).not.toMatchObject({
			isOutwards: true,
			shape: Shape.NONE,
			outwardishSideCurvature: 0,
			size: new Vector2(0, 0),
			offset: new Vector2(1, 1)
		});
	});

	test('CreateCounter', () => {
		const intersectionDescriptionOriginal = IntersectionDescription.CreateNew(true, Shape.Sphere, 1, new Vector2(1, 1), new Vector2(1, 1));
		const intersectionDescriptionExpectedCounter = IntersectionDescription.CreateNew(false, Shape.Sphere, -1, new Vector2(1, 1), new Vector2(-1, -1));

		expect(IntersectionDescription.CreateCounter(intersectionDescriptionOriginal)).toMatchObject(intersectionDescriptionExpectedCounter);
		expect(IntersectionDescription.CreateCounter(intersectionDescriptionOriginal)).not.toMatchObject(intersectionDescriptionOriginal);
	});

	test('Create out of range', () => {
		let construction = () => {};

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(1, 1),     new Vector2(0.1, 0)) };
		expect(construction).toThrowWithMessage(RangeError, "Size X + Offset X has to be smaller or exactly 1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(1, 1),     new Vector2(0.0, 0.1)) };
		expect(construction).toThrowWithMessage(RangeError, "Size Y + Offset Y has to be smaller or exactly 1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(1, 1),     new Vector2(-0.1, 0)) };
		expect(construction).toThrowWithMessage(RangeError, "Size X - Offset X has to be bigger or exactly -1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(1, 1),     new Vector2(0.0, -0.1)) };
		expect(construction).toThrowWithMessage(RangeError, "Size Y - Offset Y has to be bigger or exactly -1");


		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.5, 0.5), new Vector2(0.6, 0)) };
		expect(construction).toThrowWithMessage(RangeError, "Size X + Offset X has to be smaller or exactly 1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.5, 0.5), new Vector2(0.0, 0.6)) };
		expect(construction).toThrowWithMessage(RangeError, "Size Y + Offset Y has to be smaller or exactly 1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.5, 0.5), new Vector2(-0.6, 0)) };
		expect(construction).toThrowWithMessage(RangeError, "Size X - Offset X has to be bigger or exactly -1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.5, 0.5), new Vector2(0.0, -0.6)) };
		expect(construction).toThrowWithMessage(RangeError, "Size Y - Offset Y has to be bigger or exactly -1");


		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.0, 0.0), new Vector2(1.1, 0)) };
		expect(construction).toThrowWithMessage(RangeError, "Size X + Offset X has to be smaller or exactly 1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.0, 0.0), new Vector2(0.0, 1.1)) };
		expect(construction).toThrowWithMessage(RangeError, "Size Y + Offset Y has to be smaller or exactly 1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.0, 0.0), new Vector2(-1.1, 0)) };
		expect(construction).toThrowWithMessage(RangeError, "Size X - Offset X has to be bigger or exactly -1");

		construction = () => { IntersectionDescription.CreateNew(true, Shape.Triangle, 1, new Vector2(0.0, 0.0), new Vector2(0.0, -1.1)) };
		expect(construction).toThrowWithMessage(RangeError, "Size Y - Offset Y has to be bigger or exactly -1");
	});

});