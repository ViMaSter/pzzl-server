import "jest-extended"

import {PuzzleData as PuzzleData} from 'Game/PuzzleData'

describe('PuzzleData', () => {
	test('constructor', () => {
		expect(()=>{ new PuzzleData({}) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'imageURL'-string parameter");
		expect(()=>{ new PuzzleData({"a":1}) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'imageURL'-string parameter");
		expect(()=>{ new PuzzleData({"imageURL":1}) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'imageURL'-string parameter");
		expect(()=>{ new PuzzleData({"imageURL":"snasen.png"}) }).not.toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'imageURL'-string parameter");
	});
	test('update', () => {
		const data : PuzzleData = new PuzzleData({"imageURL":"snasen.png"});

		expect(()=>{ data.Update({                                                      }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'indexX'-number parameter");
		expect(()=>{ data.Update({"indexX": 0                                           }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'indexY'-number parameter");
		expect(()=>{ data.Update({"indexX": 0,   "indexY": 1                            }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'posX'-number parameter");
		expect(()=>{ data.Update({"indexX": 0,   "indexY": 1,   "posX": 2               }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'posY'-number parameter");

		expect(()=>{ data.Update({"indexX": 0,   "indexY": 1,   "posX": 2,   "posY": 3  }) }).not.toThrow(TypeError);

		expect(()=>{ data.Update({"indexX": "a", "indexY": 1,   "posX": 2,   "posY": 3  }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'indexX'-number parameter");
		expect(()=>{ data.Update({"indexX": 0,   "indexY": "a", "posX": 2,   "posY": 3  }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'indexY'-number parameter");
		expect(()=>{ data.Update({"indexX": 0,   "indexY": 1,   "posX": "a", "posY": 3  }) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'posX'-number parameter");
		expect(()=>{ data.Update({"indexX": 0,   "indexY": 1,   "posX": 2,   "posY": "a"}) }).toThrowWithMessage(TypeError, "Constructing PuzzleData requires a 'posY'-number parameter");
	});
	test('updateRetrieveValues', () => {
		const data : PuzzleData = new PuzzleData({"imageURL":"snasen.png"});
		data.Update({"indexX": 1,   "indexY": 1,   "posX": 2,   "posY": 3  });
		expect(data.pieces[1][1].x).toBe(2);
		expect(data.pieces[1][1].y).toBe(3);

		expect(data.pieces[0]).toBeUndefined();
		expect(data.pieces[0]).toBeUndefined();

		expect(data.pieces[2]).toBeUndefined();
		expect(data.pieces[2]).toBeUndefined();

		expect(data.pieces[1][0]).toBeUndefined();
		expect(data.pieces[1][2]).toBeUndefined();
	});
});