import {Vector2 as Vector2} from "util/Vector2"

describe('Vector2', () => {
	test('constructor', () => {
		expect(new Vector2(-1, -1)).toMatchObject({x: -1, y: -1});
		expect(new Vector2(0, 0)).toMatchObject({x: 0, y: 0});
		expect(new Vector2(1, 1)).toMatchObject({x: 1, y: 1});
		expect(new Vector2(2, 2)).not.toMatchObject({x: 1, y: 1});
		expect(new Vector2(0.5, 0.5)).toMatchObject({x: 0.5, y: 0.5});
	})

	test('fromString', () => {
		expect(Vector2.fromString("-1", "-1")		).toMatchObject(		new Vector2(-1, -1));
		expect(Vector2.fromString("0", "0" )		).toMatchObject(		new Vector2(0, 0));
		expect(Vector2.fromString("1", "1" )		).toMatchObject(		new Vector2(1, 1));
		expect(Vector2.fromString("0.5", "0.6" )	).toMatchObject(		new Vector2(0.5, 0.6));
		expect(Vector2.fromString("0,5", "0,6" )	).toMatchObject(		new Vector2(0, 0));
		expect(Vector2.fromString("1px2", "1px2" )	).toMatchObject(		new Vector2(1, 1));
		expect(Vector2.fromString("", "" )			).toMatchObject(		new Vector2(NaN, NaN));
		expect(Vector2.fromString("AA", "BB" )		).toMatchObject(		new Vector2(NaN, NaN));
		expect(Vector2.fromString("2", "2" )		).not.toMatchObject(	new Vector2(1, 1));
	})

	test('add', () => {
		expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).toMatchObject(		new Vector2(1, 1) );
		expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(0, 0) );

		expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).toMatchObject(		Vector2.add(new Vector2(1, 1), new Vector2(0, 0)) );
		expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	Vector2.add(new Vector2(1, 1), new Vector2(1, 1)) );

		expect(Vector2.add(new Vector2(0, 0), new Vector2(-1, -1))	).toMatchObject(		Vector2.add(new Vector2(-1, -1), new Vector2(0, 0)) );
		expect(Vector2.add(new Vector2(0, 0), new Vector2(-1, -1))	).not.toMatchObject(	Vector2.add(new Vector2(-1, -1), new Vector2(-1, -1)) );
	})
	test('multiply with Vector2', () => {
		expect(Vector2.multiply(new Vector2(1, 1), new Vector2(1, 1))	).toMatchObject(	new Vector2(1, 1) );
		expect(Vector2.multiply(new Vector2(1, 0), new Vector2(1, 1))	).toMatchObject(	new Vector2(1, 0) );
		expect(Vector2.multiply(new Vector2(0, 1), new Vector2(1, 1))	).toMatchObject(	new Vector2(0, 1) );

		expect(Vector2.multiply(new Vector2(1, 1), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(0, 0) );
		expect(Vector2.multiply(new Vector2(1, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(0, 1) );
		expect(Vector2.multiply(new Vector2(0, 1), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(1, 0) );

		expect(Vector2.multiply(new Vector2(1, 1), new Vector2(1, 1))	).toMatchObject(	Vector2.multiply(new Vector2(1, 1),  new Vector2(1, 1)) );
		expect(Vector2.multiply(new Vector2(1, 0), new Vector2(1, 1))	).toMatchObject(	Vector2.multiply(new Vector2(1, 1),  new Vector2(1, 0)) );
		expect(Vector2.multiply(new Vector2(0, 1), new Vector2(1, 1))	).toMatchObject(	Vector2.multiply(new Vector2(1, 1),  new Vector2(0, 1)) );

		expect(Vector2.multiply(new Vector2(1, 1), new Vector2(1, 1))	).not.toMatchObject(	Vector2.multiply(new Vector2(0, 0),  new Vector2(0, 0)) );
		expect(Vector2.multiply(new Vector2(1, 0), new Vector2(1, 1))	).not.toMatchObject(	Vector2.multiply(new Vector2(0, 1),  new Vector2(1, 1)) );
		expect(Vector2.multiply(new Vector2(1, 1), new Vector2(1, 0))	).not.toMatchObject(	Vector2.multiply(new Vector2(1, 1),  new Vector2(0, 1)) );
	})

	test('multiply with number', () => {
		expect(Vector2.multiply(new Vector2(1, 1), 0)	).toMatchObject(	new Vector2(0, 0) );
		expect(Vector2.multiply(new Vector2(1, 1), 1)	).toMatchObject(	new Vector2(1, 1) );
		expect(Vector2.multiply(new Vector2(1, 0), 1)	).toMatchObject(	new Vector2(1, 0) );
		expect(Vector2.multiply(new Vector2(0, 1), 1)	).toMatchObject(	new Vector2(0, 1) );

		expect(Vector2.multiply(new Vector2(1, 1), 0)	).not.toMatchObject(	new Vector2(1, 1) );
		expect(Vector2.multiply(new Vector2(1, 1), 1)	).not.toMatchObject(	new Vector2(0, 0) );
		expect(Vector2.multiply(new Vector2(1, 0), 1)	).not.toMatchObject(	new Vector2(0, 1) );
		expect(Vector2.multiply(new Vector2(0, 1), 1)	).not.toMatchObject(	new Vector2(1, 0) );
	})

	test('delta', () => {
		expect(Vector2.delta(new Vector2(0, 0), new Vector2(1, 1))	).toMatchObject(		new Vector2(-1, -1) );
		expect(Vector2.delta(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(0, 0) );
		expect(Vector2.delta(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(1, 1) );

		expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).toMatchObject(		new Vector2(1, 1) );
		expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).not.toMatchObject(	new Vector2(0, 0) );
		expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).not.toMatchObject(	new Vector2(-1, -1) );

		expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).not.toMatchObject(	Vector2.delta(new Vector2(0, 0), new Vector2(1, 1)) );
	})

	test('equal', () => {
		expect(Vector2.equal(new Vector2(0, 0), new Vector2(0, 0))	).toBe(true);

		expect(Vector2.equal(new Vector2(0, 1), new Vector2(0, 0))	).toBe(false);
		expect(Vector2.equal(new Vector2(1, 0), new Vector2(0, 0))	).toBe(false);

		expect(Vector2.equal(new Vector2(0, 0), new Vector2(0, 1))	).toBe(false);
		expect(Vector2.equal(new Vector2(0, 0), new Vector2(1, 0))	).toBe(false);
	})
});