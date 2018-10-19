import {Vector2 as Vector2} from "util/Vector2"

test('Vector2.constructor', () => {
	expect(new Vector2(-1, -1)).toMatchObject({x: -1, y: -1});
	expect(new Vector2(0, 0)).toMatchObject({x: 0, y: 0});
	expect(new Vector2(1, 1)).toMatchObject({x: 1, y: 1});
	expect(new Vector2(2, 2)).not.toMatchObject({x: 1, y: 1});
})

test('Vector2.fromString', () => {
	expect(Vector2.fromString("-1", "-1")	).toMatchObject(		new Vector2(-1, -1));
	expect(Vector2.fromString("0", "0" )	).toMatchObject(		new Vector2(0, 0));
	expect(Vector2.fromString("1", "1" )	).toMatchObject(		new Vector2(1, 1));
	expect(Vector2.fromString("2", "2" )	).not.toMatchObject(	new Vector2(1, 1));
})

test('Vector2.add', () => {
	expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).toMatchObject(		new Vector2(1, 1) );
	expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(0, 0) );

	expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).toMatchObject(		Vector2.add(new Vector2(1, 1), new Vector2(0, 0)) );
	expect(Vector2.add(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	Vector2.add(new Vector2(1, 1), new Vector2(1, 1)) );

	expect(Vector2.add(new Vector2(0, 0), new Vector2(-1, -1))	).toMatchObject(		Vector2.add(new Vector2(-1, -1), new Vector2(0, 0)) );
	expect(Vector2.add(new Vector2(0, 0), new Vector2(-1, -1))	).not.toMatchObject(	Vector2.add(new Vector2(-1, -1), new Vector2(-1, -1)) );
})
test('Vector2.multiply with Vector2', () => {
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

test('Vector2.multiply with number', () => {
	expect(Vector2.multiply(new Vector2(1, 1), 0)	).toMatchObject(	new Vector2(0, 0) );
	expect(Vector2.multiply(new Vector2(1, 1), 1)	).toMatchObject(	new Vector2(1, 1) );
	expect(Vector2.multiply(new Vector2(1, 0), 1)	).toMatchObject(	new Vector2(1, 0) );
	expect(Vector2.multiply(new Vector2(0, 1), 1)	).toMatchObject(	new Vector2(0, 1) );

	expect(Vector2.multiply(new Vector2(1, 1), 0)	).not.toMatchObject(	new Vector2(1, 1) );
	expect(Vector2.multiply(new Vector2(1, 1), 1)	).not.toMatchObject(	new Vector2(0, 0) );
	expect(Vector2.multiply(new Vector2(1, 0), 1)	).not.toMatchObject(	new Vector2(0, 1) );
	expect(Vector2.multiply(new Vector2(0, 1), 1)	).not.toMatchObject(	new Vector2(1, 0) );
})

test('Vector2.delta', () => {
	expect(Vector2.delta(new Vector2(0, 0), new Vector2(1, 1))	).toMatchObject(		new Vector2(-1, -1) );
	expect(Vector2.delta(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(0, 0) );
	expect(Vector2.delta(new Vector2(0, 0), new Vector2(1, 1))	).not.toMatchObject(	new Vector2(1, 1) );

	expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).toMatchObject(		new Vector2(1, 1) );
	expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).not.toMatchObject(	new Vector2(0, 0) );
	expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).not.toMatchObject(	new Vector2(-1, -1) );

	expect(Vector2.delta(new Vector2(1, 1), new Vector2(0, 0))	).not.toMatchObject(	Vector2.delta(new Vector2(0, 0), new Vector2(1, 1)) );
})

test('Vector2.equal', () => {
	expect(Vector2.equal(new Vector2(0, 0), new Vector2(0, 0))	).toBe(true);

	expect(Vector2.equal(new Vector2(0, 1), new Vector2(0, 0))	).toBe(false);
	expect(Vector2.equal(new Vector2(1, 0), new Vector2(0, 0))	).toBe(false);

	expect(Vector2.equal(new Vector2(0, 0), new Vector2(0, 1))	).toBe(false);
	expect(Vector2.equal(new Vector2(0, 0), new Vector2(1, 0))	).toBe(false);
})






