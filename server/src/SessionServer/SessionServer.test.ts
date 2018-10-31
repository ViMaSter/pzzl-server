import {PuzzleData} from "Game/PuzzleData"
import {SessionServer} from "SessionServer/SessionServer"

describe("SessionDataInterface", () => {

	test("correct derivative", async () => {
		let sessionServer : SessionServer = await SessionServer.Create(PuzzleData, parseInt(process.env.PORT || "") || 7996);
		sessionServer.Shutdown();
	});

});