const globalAny : any = global;
import {MouseListener as MouseListener} from "util/MouseListener"	

import {Vector2 as Vector2} from "util/Vector2"	
let reportedValues : any = {
	lastPosition: new Vector2(),
	newPosition: new Vector2(),
	deltaPosition: new Vector2()
};
let positionCallback : any = jest.fn((lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2) => {
	reportedValues.lastPosition = lastPosition;
	reportedValues.newPosition = newPosition;
	reportedValues.deltaPosition = deltaPosition;
});
let secondCallback : any = jest.fn((lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2) => {});

let listener : MouseListener;
describe('MouseListener', () => {

	beforeAll(() => {
 		listener = new MouseListener();
	});

	test('initialAttach', () => {
		listener.attach(positionCallback);
		expect(((listener as any).updateListener).length).toBe(1);
	});

	test('detach', () => {
	});

	test('mousemoveWithAttach', () => {
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: 20, clientY: 20, bubbles: true}));
		expect(positionCallback.mock.calls.length).toBe(1);
		expect(reportedValues.lastPosition).toMatchObject({x: -1, y: -1});
		expect(reportedValues.newPosition).toMatchObject({x: 20, y: 20});
		expect(reportedValues.deltaPosition).toMatchObject({x: 21, y: 21});
		
		document.dispatchEvent(new MouseEvent("mousedown", {clientX: 21, clientY: 20, bubbles: true}));
		expect(positionCallback.mock.calls.length).toBe(2);
		expect(reportedValues.lastPosition).toMatchObject({x: 20, y: 20});
		expect(reportedValues.newPosition).toMatchObject({x: 21, y: 20});
		expect(reportedValues.deltaPosition).toMatchObject({x: 1, y: 0});
	});

	test('secondAttach', () => {
		listener.attach(secondCallback);
		expect(((listener as any).updateListener).length).toBe(2);
	});

	test('mousemoveWithSecondAttach', () => {
		document.dispatchEvent(new MouseEvent("mousemove", {clientX: 20, clientY: 20, bubbles: true}));
		expect(positionCallback.mock.calls.length).toBe(3);
		expect(secondCallback.mock.calls.length).toBe(1);
		expect(reportedValues.lastPosition).toMatchObject({x: 21, y: 20});
		expect(reportedValues.newPosition).toMatchObject({x: 20, y: 20});
		expect(reportedValues.deltaPosition).toMatchObject({x: -1, y: 0});
		
		document.dispatchEvent(new MouseEvent("mousedown", {clientX: 21, clientY: 20, bubbles: true}));
		expect(positionCallback.mock.calls.length).toBe(4);
		expect(secondCallback.mock.calls.length).toBe(2);
		expect(reportedValues.lastPosition).toMatchObject({x: 20, y: 20});
		expect(reportedValues.newPosition).toMatchObject({x: 21, y: 20});
		expect(reportedValues.deltaPosition).toMatchObject({x: 1, y: 0});
	});

	test('detach', () => {
		listener.detach(secondCallback);
		document.dispatchEvent(new MouseEvent("mousedown", {clientX: 21, clientY: 20, bubbles: true}));
		expect(secondCallback.mock.calls.length).toBe(2);
	});

});



// callback attaching
// callback detaching
// mouse position update value change
// touch position update value change
// mouse position update single callback
// touch position update single callback
// mouse position update multiple callback
// touch position update multiple callback