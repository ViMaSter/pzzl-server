import {Vector2 as Vector2} from "util/Vector2"
import {Puzzle as Puzzle} from "game/Puzzle"

type callbackDeclaration = () => void;
export class PuzzleListener
{
	private websocket : WebSocket;
	private puzzle : Puzzle;
	private URI : string;
	private currentSessionID : number = -1;

	constructor(hostname : string, port : number, puzzle : Puzzle, onMessageCallback : callbackDeclaration|null = null, onCloseCallback : callbackDeclaration|null = null)
	{
		this.URI = `ws://${hostname}:${port}`;	
		this.websocket = new WebSocket(this.URI);
		this.puzzle = puzzle;

		this.websocket.onopen = this.OnOpen.bind(this);
		this.websocket.onclose = onMessageCallback == null ? this.OnClose.bind(this) : <callbackDeclaration>onCloseCallback;
		this.websocket.onmessage = onCloseCallback == null ? this.OnMessage.bind(this) : <callbackDeclaration>onMessageCallback;
	}

	close()
	{
		this.websocket.close();
	}

	private OnOpen(event : CloseEvent)
	{
		console.group("[WEBSOCKET] Connected to "+this.URI);
		console.groupEnd();
	}

	private OnClose(event : CloseEvent)
	{
		console.group("[WEBSOCKET] Connection closed");
		console.groupEnd();
	}

	CreateSession()
	{
		this.websocket.send(JSON.stringify({
			"command": "createSession",
			"parameters":
			{
				"imageURL": "https://by.vincent.mahn.ke/wp-content/uploads/2018/05/500px_bg.png"
			}
		}));
	}

	JoinSession(sessionID : number)
	{
		this.websocket.send(JSON.stringify({
			"command": "createSession",
			"sessionID": sessionID
		}));
	}

	UpdatePiece(indexX : number, indexY : number, posX : number, posY : number)
	{
		this.websocket.send(JSON.stringify({
			"command": "updateSession",
			"sessionID": this.currentSessionID,
			"parameters": {
				indexX: indexX,
				indexY: indexY,
				posX: posX,
				posY: posY
			}
		}));
	}

	private OnMessage(event : MessageEvent)
	{
		console.group("[WEBSOCKET] Message received");
		console.log(event);
		if (!event.data)
		{
			return;
		}
		const message : any = JSON.parse(event.data);
		console.log(message);
		this.currentSessionID = message.session;
		console.groupEnd();
	}
}