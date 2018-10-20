import {Vector2} from "util/Vector2" 
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