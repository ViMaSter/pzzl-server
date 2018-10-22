import {Vector2} from "util/Vector2" 

import { IntersectionDescription, NeighborDirection, ToggleItemCallback } from "game/Piece" 

export interface InternalPiece
{
	Create: (index : Vector2, size : Vector2, intersectionPadding : Vector2, onSelect : ToggleItemCallback, onDeselect : ToggleItemCallback) => InternalPiece;
	setIntersection: (direction : NeighborDirection, intersectionDescription : IntersectionDescription) => void;
	getCounterForIntersection: (direction : NeighborDirection) => IntersectionDescription;
}