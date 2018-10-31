declare global {
	interface Array<T> {
		remove(elem: T): Array<T>;
	}
}

if (Array.prototype.remove) {
	Array.prototype.remove = function<T>(this: T[], elem: T): T[] {
		return this.filter(e => e !== elem);
	}
}

import {ISessionData as ISessionData, ISessionDataConstructor as ISessionDataConstructor} from 'SessionServer/SessionDataInterface';

type ForEachPlayerCallback = (playerID : number) => void;
class Session {
	private id : number;
	private currentSessionData : ISessionData;
	private connectedPlayerIDs : number[] = [];
	get CurrentPlayerCount() { return this.connectedPlayerIDs.length; };

	constructor(sessionType : ISessionDataConstructor, ID : number, sessionCreationArguments : any)
	{
		this.id = ID;
		this.currentSessionData = new sessionType(sessionCreationArguments);
	}

	HasPlayerInSession(playerID : number) : boolean
	{
		return this.connectedPlayerIDs.indexOf(playerID) > -1;
	}

	AddPlayerByID(playerID : number) : boolean
	{
		if (this.HasPlayerInSession(playerID))
		{
			console.error(`[SessionServer] Player ${playerID} is already part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
			return false;
		}
		this.connectedPlayerIDs.push(playerID);
		return true;
	}

	RemovePlayerByID(playerID : number) : boolean
	{
		if (!this.HasPlayerInSession(playerID))
		{
			console.error(`[SessionServer] Player ${playerID} is not part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
			return false;
		}
		this.connectedPlayerIDs.splice(this.connectedPlayerIDs.indexOf(playerID), 1);
		return true;
	}

	Update(playerID : number, sessionUpdateArguments : any) : boolean
	{
		if (!this.HasPlayerInSession(playerID))
		{
			console.error(`[SessionServer] Player ${playerID} is not part of session ${this.id} and therefore can't update the session (current players: ${this.connectedPlayerIDs.join(', ')})`);
			return false;
		}
		this.currentSessionData.Update(sessionUpdateArguments);
		return true;
	}

	GetData() : any
	{
		return this.currentSessionData as any;
	}

	ForEachPlayer(callback : ForEachPlayerCallback)
	{
		this.connectedPlayerIDs.forEach(callback);
	}
};

import * as http from 'http';
import * as ws from 'websocket';

//@ts-ignore
import httpShutdown from 'http-shutdown';

type commandSignature = (playerID : number, jsonMessage : any) => any;
export class SessionServer
{
	private commands : {[name : string]: commandSignature} = {};

	private nextSessionID : number = 0;
	private sessions : {[ID : number]: Session} = {};

	private nextPlayerID : number = 0;
	private player : {[ID : number]: ws.connection} = {};

	private sessionType : ISessionDataConstructor;
	private port : number = -1;

	private httpServer : any;
	private wsServer : ws.server;

	private validateSessionID(playerID : number, sessionID : any, request : string)
	{
		if (typeof sessionID != "number")
		{
			console.error(`[SessionServer] ${request} requires a 'sessionID'-parameter as number! (supplied: ${sessionID} [${typeof sessionID}])`);
			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": request,
				"sessionID": -1
			}));
			return false;
		}
		if (!this.sessions[sessionID])
		{
			console.error(`[SessionServer] Attemping to run {request} on session '${sessionID}' will fail, as the session doesn't exist`);
			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": request,
				"sessionID": -2
			}));
			return false;
		}
		return true;
	}

	private setupCommands()
	{
		this.commands["createSession"] = (playerID : number, jsonMessage : any) =>
		{
			const newSessionID = this.generateSessionID();
			this.sessions[newSessionID] = new Session(this.sessionType, newSessionID, jsonMessage.parameters);
			if (!this.sessions[newSessionID].AddPlayerByID(playerID))
			{
				console.error(`[SessionServer] Unable to add player ${playerID} to newly created session ${newSessionID}`);
				this.sendMessageToPlayer(playerID, JSON.stringify({
					"command": "sessionJoin",
					"sessionID": -1,
					"session": {}
				}));
				return;
			}

			console.log(`[SessionServer] Created new session with ID ${newSessionID}`);

			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": "sessionJoin",
				"sessionID": newSessionID,
				"session": this.sessions[newSessionID].GetData()
			}));
		};

		this.commands["updateSession"] = (playerID : number, jsonMessage : any) =>
		{
			console.log(`[SessionServer] Player ${playerID} attempting to update session ${jsonMessage.sessionID}`);
			if (!this.validateSessionID(playerID, jsonMessage.sessionID, "sessionUpdate"))
			{
				return;
			}

			if (!this.sessions[jsonMessage.sessionID].Update(playerID, jsonMessage.parameters))
			{
				this.sendMessageToPlayer(playerID, JSON.stringify({
					"command": "sessionUpdate",
					"sessionID": -3
				}));
			}

			this.sessions[jsonMessage.sessionID].ForEachPlayer(((playerID : number) =>
			{
				this.sendMessageToPlayer(playerID, JSON.stringify({"command": "sessionUpdate", "sessionID": jsonMessage.sessionID, "session": this.sessions[jsonMessage.sessionID].GetData()}));
			}).bind(this));
		};

		this.commands["joinSession"] = (playerID : number, jsonMessage : any) =>
		{
			if (jsonMessage.sessionID != -1 && !this.validateSessionID(playerID, jsonMessage.sessionID, "sessionJoin"))
			{
				return;
			}

			// requesting a join to session ID -1 will join the latest session
			if (jsonMessage.sessionID == -1)
			{
				jsonMessage.sessionID = this.nextSessionID - 1;
			}

			if (!this.validateSessionID(playerID, jsonMessage.sessionID, "sessionJoin"))
			{
				return;
			}

			if (!this.sessions[jsonMessage.sessionID].AddPlayerByID(playerID))
			{
				this.sendMessageToPlayer(playerID, JSON.stringify({
					"command": "sessionJoin",
					"sessionID": -3
				}));
				return;
			}

			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": "sessionJoin",
				"sessionID": jsonMessage.sessionID,
				"session": this.sessions[jsonMessage.sessionID].GetData()
			}));
		};

		this.commands["leaveSession"] = (playerID : number, jsonMessage : any) =>
		{
			if (!this.validateSessionID(playerID, jsonMessage.sessionID, "sessionLeave"))
			{
				return;
			}

			if (!this.sessions[jsonMessage.sessionID].RemovePlayerByID(playerID))
			{
				this.sendMessageToPlayer(playerID, JSON.stringify({
					"command": "sessionLeave",
					"sessionID": -3
				}));
				return;
			}

			console.log(`[SessionServer] Players left in session ${jsonMessage.sessionID}: ${this.sessions[jsonMessage.sessionID].CurrentPlayerCount}`);
			if (!this.sessions[jsonMessage.sessionID].CurrentPlayerCount)
			{
				console.log(`[SessionServer] Session ${jsonMessage.sessionID} has no players left; discarding it`);
				delete this.sessions[jsonMessage.sessionID];
			}

			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": "sessionLeave",
				"sessionID": jsonMessage.sessionID
			}));
		};
	}

	private generatePlayerMessageHandler(playerID : number)
	{
		return (message : ws.IMessage) => {
			if (message.type === 'utf8')
			{
				try
				{
					const jsonMessage = JSON.parse(message.utf8Data as string);
					this.handleMessage(playerID, jsonMessage);
				}
				catch(e)
				{
					console.group("Invalid JSON string received!");
					console.error(message);
					console.error(e);
					console.groupEnd();
				}
			}
		};
	}

	private generatePlayerCloseHandler(playerID : number)
	{
		return (reasonCode : number, description : string) => {
			this.removePlayer(playerID);
		};
	}

	private removePlayer(playerID : number)
	{
		console.log(`[SessionServer] Connection from player ${playerID} closed...`);
		for (const sessionID in this.sessions)
		{
			this.commands.leaveSession.apply(this, [playerID, {"sessionID": parseInt(sessionID)}]);
		}
		delete this.player[playerID];
	}

	private handleNewPlayer(request : ws.request)
	{
		const connection : ws.connection = request.accept(undefined, request.origin);
		
		const playerID : number = this.generatePlayerID();
		this.player[playerID] = connection;

		this.player[playerID].on('message', this.generatePlayerMessageHandler(playerID));

		this.player[playerID].on('close', this.generatePlayerCloseHandler(playerID));
	}

	private constructor(sessionType : ISessionDataConstructor, port : number)
	{
		this.port = port;

		this.sessionType = sessionType;

		this.httpServer = httpShutdown(http.createServer(() => {}));

		this.wsServer = new ws.server({ httpServer: this.httpServer });
	}

	static Create(sessionType : ISessionDataConstructor, port : number) : Promise<SessionServer>
	{
		return new Promise<SessionServer>((resolve, reject)=>
		{
			const newServer : SessionServer = new SessionServer(sessionType, port);

			newServer.setupCommands();

			newServer.wsServer.on('request', newServer.handleNewPlayer.bind(newServer));

			newServer.httpServer.on('listening', () =>
			{
				console.log(`[SessionServer] Listening on port ${newServer.port}...`);
				resolve(newServer);
			});

			newServer.wsServer.on('error', () =>
			{
				console.group(`[SessionServer] Error initializing server!`);
				reject();
			});

			newServer.httpServer.listen(newServer.port);
		})
	}

	Shutdown() : Promise<void>
	{
		return new Promise((resolve, reject) => {
			this.httpServer.shutdown(()=>{
				resolve();
			});
		});
	}

	Running() : boolean
	{
		return this.httpServer.shutdown();
	}

	private generatePlayerID()
	{
		return this.nextPlayerID++;
	}

	private generateSessionID()
	{
		return this.nextSessionID++;
	}

	private handleMessage(playerID : number, jsonMessage : any)
	{
		if (jsonMessage.command)
		{
			if (typeof this.commands[jsonMessage.command] == "function")
			{
				this.commands[jsonMessage.command].apply(this, [playerID, jsonMessage]);
			}
			else
			{
				console.error(`[SessionServer] no command called "${jsonMessage.command}" available`)
			}
		}
	}

	private sendMessageToPlayer(playerID : number, message : string)
	{
		if (!this.player[playerID])
		{
			console.error(`[SessionServer] No player with ID ${playerID} is connected!`);
			return false;
		}

		this.player[playerID].send(message);
		return true;
	}
};