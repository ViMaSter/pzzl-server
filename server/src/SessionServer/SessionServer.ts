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

type ForEachPlayerCallback = (playerID : number) => void;
class Session<SessionData> {
	private id : number;
	private currentSessionData : SessionData;
	private connectedPlayerIDs : number[] = [];
	get CurrentPlayerCount() { return this.connectedPlayerIDs.length; };

	constructor(ID : number, sessionData : SessionData)
	{
		this.id = ID;
		this.currentSessionData = sessionData;
	}

	addPlayerByID(playerID : number) : boolean
	{
		this.connectedPlayerIDs.push(playerID);
		if (this.connectedPlayerIDs.indexOf(playerID) > -1)
		{
			console.error(`[PageServer] Player ${playerID} is already part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
			return false;
		}
		return true;
	}

	removePlayerByID(playerID : number) : boolean
	{
		if (this.connectedPlayerIDs.indexOf(playerID) <= -1)
		{
			console.error(`[PageServer] Player ${playerID} is not part of session ${this.id} (current players: ${this.connectedPlayerIDs.join(', ')})`);
			return false;
		}
		this.connectedPlayerIDs.remove(playerID);
		return true;
	}

	serializeData() : string
	{
		return JSON.stringify(this.currentSessionData);
	}

	forEachPlayer(callback : ForEachPlayerCallback)
	{
		this.connectedPlayerIDs.forEach(callback);
	}
};

import * as http from 'http';
import * as ws from 'websocket';

type commandSignature = (playerID : number, jsonMessage : any) => any;
export class SessionServer<SessionData>
{
	private commands : {[name : string]: commandSignature} = {};

	private nextSessionID : number = 0;
	private sessions : {[ID : number]: Session<SessionData>} = {};

	private nextPlayerID : number = 0;
	private player : {[ID : number]: ws.connection} = {};

	private port : number;

	private httpServer : http.Server;
	private wsServer : ws.server;

	private SetupCommands()
	{
		this.commands["createSession"] = (playerID : number, jsonMessage : any) =>
		{
			const newSessionID = this.generateSessionID();
			this.sessions[newSessionID] = new Session(newSessionID, jsonMessage.mapName);
			if (this.sessions[newSessionID].addPlayerByID(playerID))
			{
				console.error(`[PageServer] Unable to add player ${playerID} to newly created session ${newSessionID}`);
				return;
			}

			console.log(`[PageServer] Created new session with ID ${newSessionID}`);

			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": "sessionJoin",
				"sessionID": newSessionID,
				"session": this.sessions[newSessionID].serializeData()
			}));
		};

		this.commands["joinSession"] = (playerID : number, jsonMessage : any) =>
		{
			console.log(`[PageServer] Player ${playerID} attempting to join session ${jsonMessage.sessionID}`);
			if (jsonMessage.sessionID < -1)
			{
				console.log("[PageServer] Invalid session id");
				return {"sessionID": -1};
			}

			// requesting a join to session ID -1 will join the latest session
			if (jsonMessage.sessionID == -1)
			{
				jsonMessage.sessionID = this.nextSessionID - 1;
			}

			if (!this.sessions[jsonMessage.sessionID])
			{
				console.log(`[PageServer] Session ${jsonMessage.sessionID} (no longer) doesn't exist`);
				return {"sessionID": -1};
			}

			this.sessions[jsonMessage.sessionID].addPlayerByID(playerID);

			this.sendMessageToPlayer(playerID, JSON.stringify({
				"command": "sessionJoin",
				"sessionID": jsonMessage.sessionID,
				"session": this.sessions[jsonMessage.sessionID].serializeData()
			}));
		};

		this.commands["leaveSession"] = (playerID : number, jsonMessage : any) =>
		{
			if (typeof jsonMessage.sessionID != "number")
			{
				console.error(`[PageServer] leaveSession requires a 'sessionID'-parameter as number! (supplied: ${jsonMessage.sessionID} [${typeof jsonMessage.sessionID}])`);
				return;
			}
			this.sessions[jsonMessage.sessionID].removePlayerByID(playerID);
			console.log(`[PageServer] Players left in session ${jsonMessage.sessionID}: ${this.sessions[jsonMessage.sessionID].CurrentPlayerCount}`);
			if (!this.sessions[jsonMessage.sessionID].CurrentPlayerCount)
			{
				console.log(`[PageServer] Session ${jsonMessage.sessionID} has no players left; discarding it`);
				delete this.sessions[jsonMessage.sessionID];
			}

			this.sendMessageToPlayer(playerID, "{}");
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
		console.log(`[PageServer] Connection from player ${playerID} closed...`);
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

		this.player[playerID].on('message', (message) => {
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
		});

		this.player[playerID].on('close',
			this.generatePlayerCloseHandler(playerID)
		);
	}

	constructor(port : number)
	{
		this.port = port;

		this.httpServer = http.createServer(() => {});
		this.httpServer.listen(this.port, () => {});

		this.wsServer = new ws.server({ httpServer: this.httpServer });

		this.wsServer.on('request', this.handleNewPlayer);

		console.log(`[PageServer] Running at port ${this.port}`);
	}

	generatePlayerID()
	{
		return this.nextPlayerID++;
	}

	generateSessionID()
	{
		return this.nextSessionID++;
	}

	handleMessage(playerID : number, jsonMessage : any)
	{
		if (jsonMessage.command)
		{
			if (typeof this.commands[jsonMessage.command] == "function")
			{
				this.commands[jsonMessage.command].apply(this, [playerID, jsonMessage]);
			}
			else
			{
				console.error(`[PageServer] no command called "${jsonMessage.command}" available`)
			}
		}
	}

	sendMessageToPlayer(playerID : number, message : string)
	{
		if (!this.player[playerID])
		{
			console.error(`[PageServer] No player with ID ${playerID} is connected!`);
			return false;
		}

		this.player[playerID].send(message);
		return true;
	}

	updateReplica(session : Session<SessionData>)
	{
		session.forEachPlayer(((playerID : number) =>
		{
			this.sendMessageToPlayer(playerID, JSON.stringify({"command": "sessionUpdate", "session": session.serializeData()}));
		}).bind(this));
	}
};