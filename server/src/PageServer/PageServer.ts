import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';

//@ts-ignore
import httpShutdown from 'http-shutdown';

export class PageServer
{
	httpServer : any;
	private constructor() {}
	static Create(port : number, rootFolder : string) : Promise<PageServer>
	{
		const server : PageServer = new PageServer();
		return new Promise<PageServer>((resolve, reject) => {
			if (!fs.lstatSync(rootFolder).isDirectory())
			{
				reject(new ReferenceError(`Root folder '${rootFolder}' is not a valid folder!`));
				return;
			}

			server.httpServer = httpShutdown(http.createServer((request : http.IncomingMessage, response : http.ServerResponse) => {


				const { headers, method, url } = request;
				let body : Uint8Array[] = [];

				request.on('error', (err : Error) => {
					console.error(err);
				}).on('data', (chunk : Buffer) => {
					body.push(chunk);
				}).on('end', () => {
					let filePath : string = rootFolder + request.url;
					if (filePath == rootFolder + "/")
					{
						filePath = rootFolder + "/index.html";
					}

					const extname : string = path.extname(filePath);
					let contentType : string = 'text/html';
					switch (extname) { 
						case '.js':
							contentType = 'text/javascript';
							break;
						case '.css':
							contentType = 'text/css';
							break;
						case '.json':
							contentType = 'application/json';
							break;
						case '.png':
							contentType = 'image/png';
							break;      
						case '.jpg':
							contentType = 'image/jpg';
							break;
					}

					console.log(`[PageServer] Handling request for ${filePath}...`);

					fs.readFile(filePath, function(error : Error, content : Buffer) {
						if (error)
						{
							console.group("[PageServer] Couldn't handle request");
							console.error(error);
							console.groupEnd();
							fs.readFile(rootFolder + '/index.html', function(error : Error, content : Buffer) {
								if (error)
								{
									response.writeHead(500);
									response.end('500');
									console.group("[PageServer] Couldn't return index.html as response to error handling");
									console.error(error);
									console.groupEnd();
									response.end(); 
								}
								response.writeHead(200, { 'Content-Type': contentType });
								response.end(content, 'utf-8');
							});
						}
						else
						{
							response.writeHead(200, { 'Content-Type': contentType });
							response.end(content, 'utf-8');
						}
					});
				});
			}));

			server.httpServer.on('listening', () => {
				console.log(`[PageServer] Listening on port ${port}...`);
				resolve(server);
			})

			server.httpServer.on('error', (error : Error) => {
				console.error(`[PageServer] Error starting server...`);
				console.error(error);
				reject(error);
			})
			
			server.httpServer.listen(port);
		});
	}

	shutdown() : Promise<void>
	{
		return new Promise((resolve, reject) => {
			this.httpServer.shutdown(()=>{
				resolve();
			});
		});
	}
}