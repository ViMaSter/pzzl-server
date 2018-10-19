export class Rect
{
	static Overlaps(rectA : ClientRect, rectB : ClientRect) : boolean
	{
		return (rectA.left < rectB.right && rectA.right > rectB.left && -rectA.top > -rectB.bottom && -rectA.bottom < -rectB.top ) 
	}
	static OverlapsWithBuffer(rectA : ClientRect, rectB : ClientRect, buffer : number) : boolean
	{
		return (rectA.left < (rectB.right + buffer) && rectA.right > (rectB.left - buffer) && -rectA.top > (-rectB.bottom-buffer) && -rectA.bottom < (-rectB.top+buffer) ) 
	}
}
