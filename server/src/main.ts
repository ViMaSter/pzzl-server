import {SessionData} from "Game/SessionData"
import {SessionServer} from "SessionServer/SessionServer"
import {PageServer} from "PageServer/PageServer"

const sessionServer : SessionServer<SessionData> = new SessionServer<SessionData>(parseInt(process.env.PORT || "") || 7996);
const pageServer : PageServer = new PageServer(parseInt(process.env.PORT || "") || 7995, "html");

