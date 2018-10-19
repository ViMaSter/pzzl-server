import {Vector2 as Vector2} from "util/Vector2"

export type MouseListenerCallback = (lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2) => void;
export class MouseListener
{
	private lastPosition : Vector2 = new Vector2(-1, -1);
	private updateListener : MouseListenerCallback[] = [];
	constructor()
	{
		window.addEventListener("mousemove", this.updateMousePosition.bind(this));
		window.addEventListener("mousedown", this.updateMousePosition.bind(this));
		window.addEventListener("touchmove", this.updateTouchPosition.bind(this), {capture: true, passive: false});
		window.addEventListener("touchstart", this.updateTouchPosition.bind(this), {capture: true, passive: false});
	}
	private UpdatePosition(newPosition : Vector2)
	{
		const deltaPosition = Vector2.delta(newPosition, this.lastPosition);
		this.Update(this.lastPosition, newPosition, deltaPosition)
		this.lastPosition = newPosition;
	}
	private updateMousePosition(event : MouseEvent)
	{
		const newPosition : Vector2 = new Vector2 (event.clientX, event.clientY);
		this.UpdatePosition(newPosition);
		event.preventDefault();
	}
	private updateTouchPosition(event : TouchEvent)
	{
		event.preventDefault();
		if (event.touches.item(0) == null)
		{
			return;
		}
		const firstTouch : Touch = event.touches.item(0) as Touch;
		const newPosition : Vector2 = new Vector2(firstTouch.screenX, firstTouch.screenY);
		this.UpdatePosition(newPosition);
	}

	attach(newListener : MouseListenerCallback)
	{
		const listenerIndex = this.updateListener.indexOf(newListener);
		if (listenerIndex != -1)
		{
			console.error("Attempting to attach an lister that's already attached");
			return;
		}
		this.updateListener.push(newListener);
	}

	detach(newListener : MouseListenerCallback)
	{
		const listenerIndex = this.updateListener.indexOf(newListener);
		if (listenerIndex == -1)
		{
			console.warn("Attempting to remove a listener that wasn't queued");
		}
		this.updateListener.splice(listenerIndex, 1);
	}

	private Update(lastPosition : Vector2, newPosition : Vector2, deltaPosition : Vector2)
	{
		this.updateListener.forEach((listener : MouseListenerCallback) =>
		{
			listener(this.lastPosition, newPosition, deltaPosition);
		})
	}
}