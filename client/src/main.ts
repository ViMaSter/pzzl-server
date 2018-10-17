import {Vector2 as Vector2} from "./util/Vector2.ts"
import {Puzzle as Puzzle} from "./game/Puzzle.ts"

window.addEventListener("load", () =>
{
	const PuzzleLogic : Puzzle = new Puzzle(document.querySelector("#puzzle") as HTMLElement, new Vector2(5, 5));
});
