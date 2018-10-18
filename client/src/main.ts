import {Vector2 as Vector2} from "util/Vector2"
import {Puzzle as Puzzle} from "game/Puzzle"

window.addEventListener("load", () =>
{
	const PuzzleLogic : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, new Vector2(5, 5));
});