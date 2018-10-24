import {Vector2 as Vector2} from "util/Vector2"
import {Puzzle as Puzzle} from "game/Puzzle"

window.addEventListener("load", () =>
{
	const PuzzleLogic : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5), new Vector2(50, 50), new Vector2(25, 25));
});