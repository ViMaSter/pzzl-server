import {Rect as Rect} from "util/Rect"

class DOMRect {
	x : number = 0;
	y : number = 0;
	private Width : number = 0;
	private Height : number = 0;

    constructor(x : number, y : number, width : number, height : number) {
        this.x = x;
        this.y = y;
        this.Width = width;
        this.Height = height;
	}

    get left() : number { return this.x; }
    get top() : number { return this.y; }
    get width() : number { return this.Width; }
    get height() : number { return this.Height; }

    get right() : number { return this.x + this.Width; }
    get bottom() : number { return this.y + this.Height; }

    get toJSON() : any { return {
		left: this.left,
		top: this.top,
		width: this.width,
		height: this.height,
		right: this.right,
		bottom: this.bottom,
		x: this.x,
		y: this.y
    } };
}

const mainRect : DOMRect = new DOMRect(50, 50, 50, 50);
const overlappingRect : DOMRect = new DOMRect(75, 75, 50, 50);
const notOverlappingRect : DOMRect = new DOMRect(110, 100, 50, 50);

test('Rect.Overlaps', () => {
	expect(Rect.Overlaps(mainRect, overlappingRect)).toBe(true);
	expect(Rect.Overlaps(mainRect, notOverlappingRect)).toBe(false);
});

test('Rect.OverlapsWithBuffer', () => {
	expect(Rect.OverlapsWithBuffer(mainRect, notOverlappingRect, 10)).toBe(false);
	expect(Rect.OverlapsWithBuffer(mainRect, notOverlappingRect, 11)).toBe(true);
	expect(Rect.OverlapsWithBuffer(mainRect, overlappingRect, 0)).toBe(true);
	expect(Rect.OverlapsWithBuffer(mainRect, overlappingRect, 10)).toBe(true);
});