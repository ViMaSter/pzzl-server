import {PuzzleData} from "Game/PuzzleData"
import {SessionServer} from "SessionServer/SessionServer"
import {PageServer} from "PageServer/PageServer"

const sessionServer : Promise<SessionServer> = SessionServer.Create(PuzzleData, parseInt(process.env.PORT || "") || 7996);
const pageServer : Promise<PageServer> = PageServer.Create(parseInt(process.env.PORT || "") || 7995, "html");