const globalAny : any = global;
import {MouseListener as MouseListener} from "util/MouseListener"	

import {Vector2 as Vector2} from "util/Vector2"	
let reportedValues : any = {
	lastPosition: new Vector2(),
	newPosition: new Vector2(),
	deltaPosition: new Vector2()
};
let callbackA : any;
let callbackB : any;

let listener : MouseListener;
describe('MouseListener', () => {

	beforeEach(() => {
 		listener = new MouseListener();

 		callbackA = jest.fn((lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2) => {});
 		callbackB = jest.fn((lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2) => {});
	});

	test('initialAttach', () => {
		listener.attach(callbackA);
		expect(((listener as any).updateListener).length).toBe(1);
	});

	test('detach', () => {
		listener.attach(callbackA);
		expect(((listener as any).updateListener).length).toBe(1);
		listener.detach(callbackA);
		expect(((listener as any).updateListener).length).toBe(0);
	});

	test('mousemoveWithAttach', () => {
		listener.attach(callbackA);

		document.dispatchEvent(new MouseEvent("mousemove", {clientX: 20, clientY: 20, bubbles: true}));
		expect(callbackA.mock.calls.length).toBe(1);
		expect(callbackA.mock.calls[0]).toMatchObject([
			{x: -1, y: -1},	// lastPosition
			{x: 20, y: 20},	// newPosition
			{x: 21, y: 21}	// deltaPosition
		]);
		
		document.dispatchEvent(new MouseEvent("mousedown", {clientX: 21, clientY: 20, bubbles: true}));
		expect(callbackA.mock.calls.length).toBe(2);
		expect(callbackA.mock.calls[1]).toMatchObject([
			{x: 20, y: 20},	// lastPosition
			{x: 21, y: 20},	// newPosition
			{x:  1, y:  0}	// deltaPosition
		]);
	});

	test('secondAttach', () => {
		// Attach callback A
		listener.attach(callbackA);
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: 20, clientY: 20, bubbles: true}));
		expect(callbackA.mock.calls.length).toBe(1);

		// Attach callback B
		listener.attach(callbackB);
		expect(((listener as any).updateListener).length).toBe(2);
		
		// Run event
		document.dispatchEvent(new MouseEvent("mousedown", {clientX: 21, clientY: 20, bubbles: true}));
		expect(callbackA.mock.calls.length).toBe(2);
		expect(callbackB.mock.calls.length).toBe(1);
		// Ensure both received the same values
		expect(callbackB.mock.calls[0]).toMatchObject(callbackA.mock.calls[1]);

		// Detach callback B
		listener.detach(callbackB);
		expect(((listener as any).updateListener).length).toBe(1);
		document.dispatchEvent(new MouseEvent("mousedown", {clientX: 20, clientY: 20, bubbles: true}));
		expect(callbackA.mock.calls.length).toBe(3);
		// Ensure callback B was never called
		expect(callbackB.mock.calls.length).toBe(1);
		// Ensure B's last values mismatch the new values on A
		expect(callbackB.mock.calls[0]).not.toMatchObject(callbackA.mock.calls[2]);
	});

	test("Once this test fails, TypeScript is able to properly mock Touch-events and have to replace this test with something like 'mousemoveWithAttach' for touch-events.", () => {
		const touchEventAvailabilityTest = () => {
			const touchList : TouchList = new TouchList();
		};
		expect(touchEventAvailabilityTest).toThrow(ReferenceError);
	});

});