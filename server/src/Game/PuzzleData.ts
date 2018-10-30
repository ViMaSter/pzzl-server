import {ISessionData as ISessionData} from 'SessionServer/SessionDataInterface'

class Piece
{
	x : number = 0;
	y : number = 0;
}

export class PuzzleData implements ISessionData
{
	pieces : Piece[][] = [];
	imageURL : string = "";
	constructor(parameters : any)
	{
		if (typeof parameters.imageURL != "string")
		{
			throw TypeError("Constructing PuzzleData requires a 'imageURL'-string parameter");
			return;
		}
		this.imageURL = parameters.imageURL;
	}

	Update(parameters : any) : void
	{
		if (typeof parameters.indexX != "number")
		{
			throw TypeError("Constructing PuzzleData requires a 'indexX'-number parameter");
			return;
		}
		if (typeof parameters.indexY != "number")
		{
			throw TypeError("Constructing PuzzleData requires a 'indexY'-number parameter");
			return;
		}
		if (typeof parameters.posX != "number")
		{
			throw TypeError("Constructing PuzzleData requires a 'posX'-number parameter");
			return;
		}
		if (typeof parameters.posY != "number")
		{
			throw TypeError("Constructing PuzzleData requires a 'posY'-number parameter");
			return;
		}
		
		if (typeof this.pieces[parameters.indexX] == "undefined")
		{
			this.pieces[parameters.indexX] = [];
		}
		if (typeof this.pieces[parameters.indexX][parameters.indexY] == "undefined")
		{
			this.pieces[parameters.indexX][parameters.indexY] = new Piece();
		}

		this.pieces[parameters.indexX][parameters.indexY].x = parameters.posX;
		this.pieces[parameters.indexX][parameters.indexY].y = parameters.posY;
	}
}