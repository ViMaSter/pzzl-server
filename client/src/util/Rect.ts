export class Rect
{
	static Overlaps(rectA : DOMRect, rectB : DOMRect) : boolean
	{
		return Rect.OverlapsWithBuffer(rectA, rectB, 0);
	}
	static OverlapsWithBuffer(rectA : DOMRect, rectB : DOMRect, buffer : number) : boolean
	{
		const overlaps : boolean = (rectA.left < (rectB.right + buffer) && rectA.right > (rectB.left - buffer) && -rectA.top > (-rectB.bottom-buffer) && -rectA.bottom < (-rectB.top+buffer) );
		return (rectA.left < (rectB.right + buffer) && rectA.right > (rectB.left - buffer) && -rectA.top > (-rectB.bottom-buffer) && -rectA	.bottom < (-rectB.top+buffer) ) 
	}
}
