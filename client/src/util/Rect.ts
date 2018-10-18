export class Rect
{
	static Overlaps(rectA : ClientRect, rectB : ClientRect) : boolean
	{
		return (rectA.left < rectB.right && rectA.right > rectB.left && -rectA.top > -rectB.bottom && -rectA.bottom < -rectB.top ) 
	}
}
