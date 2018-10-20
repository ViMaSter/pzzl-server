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