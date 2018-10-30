import {Vector2 as Vector2} from "util/Vector2"
import {Puzzle as Puzzle} from "game/Puzzle"
import {PuzzleListener as PuzzleListener} from "server/PuzzleListener"

type resolveCallback = (isMatch : boolean) => void;
type rejectCallback = () => void;
class PingPong
{
	private sentMessage : string;
	private expectedResponse : RegExp;
	private websocketClient : WebSocket;
	private isMatch : boolean;

	private resolveMethod : any = () => {};
	private rejectMethod : any = () => {};
 
	public constructor(client : WebSocket, ping : string, pong : RegExp, isMatch : boolean)
	{
		this.websocketClient = client;
		this.sentMessage = ping;
		this.expectedResponse = pong;
		this.isMatch = isMatch;
	}

	public Execute() : Promise<any>
	{ 
		return new Promise<any>(((resolve : resolveCallback, reject : rejectCallback)=>{
			this.websocketClient.addEventListener("message", this.handleMessage.call(this, resolve, reject));
			this.websocketClient.addEventListener("close", this.handleClose.call(this, resolve, reject));
			this.websocketClient.send(this.sentMessage);
		}).bind(this));
	}
	private handleMessage(resolve : resolveCallback, reject : rejectCallback)
	{
		this.resolveMethod = (message : MessageEvent) => {
			this.websocketClient.removeEventListener("message", this.resolveMethod);
			if (this.isMatch)
			{
				expect(message.data).toMatch(this.expectedResponse);
			}
			else
			{
				expect(message.data).not.toMatch(this.expectedResponse);
			}
			resolve(message.data.match(this.expectedResponse));
		};
		return this.resolveMethod;
	}
	private handleClose(resolve : resolveCallback, reject : rejectCallback)
	{
		this.rejectMethod = () => {
			this.websocketClient.removeEventListener("close", this.rejectMethod);
			reject();
		};
		return this.rejectMethod;
	}
}

describe('PuzzleListener', () => {

	beforeAll(() => {
		HTMLElement.prototype.getBoundingClientRect = function (this : HTMLElement) : ClientRect {
			return {
				width: parseInt(this.style.width as string),
				height: parseInt(this.style.height as string),
				top: parseInt(this.style.top as string),
				left: parseInt(this.style.left as string),
				right: parseInt(this.style.width as string) + parseInt(this.style.left as string),
				bottom: parseInt(this.style.height as string) + parseInt(this.style.top as string)
			} as ClientRect;
		};
	});

	beforeEach(() => {
		document.body.innerHTML =
			'<img src="https://i.ytimg.com/vi/NFI6mVEwtgA/maxresdefault.jpg" style="position:absolute;left:0px;top:0px;width:1280px;height:720px">'+
			'<div id="puzzle" style="position:absolute;left:0px;top:0px;width:1920px;height:1080px">'+
			'<div id="playingfield" style="position:absolute;left:420px;top:0px;width:1080px;height:1080px">'+
			'</div>'+
			'</div>';
	});

	test('incorrect raw message ping-pong', async () => {
		const websocket : WebSocket = new WebSocket("ws://localhost:7996/");
		await new Promise((resolve, reject)=>{
			websocket.addEventListener("open", async () => {
				// create session and retrieve ID
				const createSessionID : any = await new PingPong(websocket,
					'{"command":"createSession","parameters":{"imageURL":"https://by.vincent.mahn.ke/wp-content/uploads/2018/05/500px_bg.png"}}',
					/{"aaaaaa"}}/
				, false).Execute();
				resolve();
			});
			websocket.addEventListener("close", async () => {
				reject();
			});
		});
		websocket.close();
	});

	test('correct raw message ping-pong', async () => {
		const websocket : WebSocket = new WebSocket("ws://localhost:7996/");
		await new Promise((resolve, reject)=>{
			websocket.addEventListener("open", async () => {
				// create session and retrieve ID
				const createSessionRequest : any = await new PingPong(websocket,
					'{"command":"createSession","parameters":{"imageURL":"https://by.vincent.mahn.ke/wp-content/uploads/2018/05/500px_bg.png"}}',
					/{"command":"sessionJoin","sessionID":(\d+),"session":{"pieces":\[\],"imageURL":"https:\/\/by.vincent.mahn.ke\/wp-content\/uploads\/2018\/05\/500px_bg.png"}}/
				, true).Execute();
				const createSessionID : number = parseInt(createSessionRequest[1]);
				expect(createSessionID).toBeGreaterThan(-1);
				// update a piece and expect session update
				const updateSessionRequest : any = await new PingPong(websocket,
					'{"command": "updateSession", "sessionID": '+createSessionID+', "parameters": { "indexX": 1, "indexY": 1, "posX": 20, "posY": 20 } }',
					/{"command":"sessionUpdate","sessionID":(\d+),"session":{"pieces":\[null,\[null,{"x":20,"y":20}]],"imageURL":"https:\/\/by.vincent.mahn.ke\/wp-content\/uploads\/2018\/05\/500px_bg.png"}}/
				, true).Execute();
				const updateSessionID : number = parseInt(updateSessionRequest[1]);
				expect(updateSessionID).toBe(createSessionID);
				// leave session
				await new PingPong(websocket,
					'{"command": "leaveSession", "sessionID": '+createSessionID+' }',
					new RegExp('{"command":"sessionLeave","sessionID":'+createSessionID+'}')
				, true).Execute();
				resolve();
			});
			websocket.addEventListener("close", async () => {
				reject();
			});
		});
		websocket.close();
	});

	test('illogical raw message ping-pong', async () => {
		const websocket : WebSocket = new WebSocket("ws://localhost:7996/");
		await new Promise((resolve, reject)=>{
			websocket.addEventListener("open", async () => {
				// leave random session
				await new PingPong(websocket,
					'{"command": "leaveSession", "sessionID": "aaa" }',
					/{"command":"sessionLeave","sessionID":-1}/
				, true).Execute();
				// leave random session
				await new PingPong(websocket,
					'{"command": "leaveSession", "sessionID": 1000000 }',
					/{"command":"sessionLeave","sessionID":-2}/
				, true).Execute();
				// update a piece and expect session update
				await new PingPong(websocket,
					'{"command": "updateSession", "sessionID": "aaaaaa", "parameters": { "indexX": 1, "indexY": 1, "posX": 20, "posY": 20 } }',
					/{"command":"sessionUpdate","sessionID":-1}/
				, true).Execute();
				// update a piece and expect session update
				await new PingPong(websocket,
					'{"command": "updateSession", "sessionID": 1000000, "parameters": { "indexX": 1, "indexY": 1, "posX": 20, "posY": 20 } }',
					/{"command":"sessionUpdate","sessionID":-2}/
				, true).Execute();
				resolve();
			});
			websocket.addEventListener("close", async () => {
				reject();
			});
		});
		websocket.close();
	});

	test('constructor with correct port', async () => {
		await expect(new Promise((resolve, reject)=>{
			const listener : PuzzleListener = new PuzzleListener("localhost", 7996, new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5)));
			((listener as any).websocket as WebSocket).addEventListener("open", () => {
				resolve(true);
				listener.close();
			});
			((listener as any).websocket as WebSocket).addEventListener("close", () => {
				reject(false);
			});
		})).resolves.toBe(true);
	});

	test('create + update session', async () => {
		await expect(new Promise((resolve, reject)=>{
			const listener : PuzzleListener = new PuzzleListener("localhost", 7996, new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5)));
			((listener as any).websocket as WebSocket).addEventListener("open", () => {
				listener.CreateSession();
			});
			((listener as any).websocket as WebSocket).addEventListener("message", (event : MessageEvent) => {
				console.log(event.data);
				const message : any = JSON.parse(event.data.toString());
				expect(message).toMatchObject({"command": "sessionJoin", "session": {"imageURL": "https://by.vincent.mahn.ke/wp-content/uploads/2018/05/500px_bg.png", "pieces": []}});
				resolve(true);
				listener.close();
			});
			((listener as any).websocket as WebSocket).addEventListener("close", (event : CloseEvent) => {
				reject(false);
				console.log(event);
			});
		})).resolves.toBe(true);
	});

	test('constructor with invalid port', async () => {
		await expect(new Promise((resolve, reject)=>{
			const listener : PuzzleListener = new PuzzleListener("localhost", 7999, new Puzzle(document.querySelector("#puzzle") as HTMLElement, document.querySelector("img") as HTMLImageElement, new Vector2(5, 5)));
			((listener as any).websocket as any).onopen = () => {
				resolve(true);
				listener.close();
			};
			((listener as any).websocket as any).onclose = () => {
				reject(false);
			};
		})).rejects.toBe(false);
	});
});