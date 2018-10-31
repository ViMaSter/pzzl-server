import * as fs from 'fs';
import * as http from 'http';
import glob from 'glob';
import {PageServer} from 'PageServer/PageServer'

const port = 8378;
const subfolder = "html";
let pageServer : PageServer;

describe('PageServer', async () => {
	let files : string[] = [];
	beforeAll(async () => {
		await PageServer.Create(port, subfolder).then(
			(server : PageServer) => {
				pageServer = server;
			},
			(error : Error) => {
				console.error("Unable to start test-server!");
				console.error(error);
			}
		);
		return new Promise<string[]>((resolve, reject) =>
		{
			glob(subfolder+'/**/*', (error : Error | null, matches : string[]) => {
				if (error)
				{
					console.error('Error', error);
					reject([error.toString()]);
					return;
				}

				resolve(matches);
			});
		}).then((filenames : string[]) =>
		{
			files = filenames;
		}, (error : Error) =>
		{
			console.error("Unable to glob!");
			console.error(error);
		});
	});

	afterAll(async () => {
		await pageServer.Shutdown().then(() =>
		{
			console.log("Successfully shut down test-server");
		},
		(error : Error) =>
		{
			console.error("Unable to shutdown test-server!");
			console.error(error);
		});
	});

	const getContent = function(url : string) {
		// return new pending promise
		return new Promise<string>((resolve, reject) => {

			// select http or https module, depending on reqested url
			const request = http.get(url, (response : http.IncomingMessage) => {
				// temporary data holder
				let body : string = "";

				// on every content chunk, push it to the data array
				response.on('data', (chunk : string) => {body += chunk});
				// we are done, resolve promise with those joined chunks
				response.on('end', () => {resolve(body)} );
			});

			// handle connection errors of the request
			request.on('error', (err : Error) => {reject(err)});
		})
	};

	const runFileAccessTest = (filename : string) =>
	{
		if (fs.lstatSync(filename).isDirectory())
		{
			return;
		}
			
		const diskData : string = fs.readFileSync(filename).toString('utf8');
		const filenameWithNoPrefix = filename.replace(subfolder+'/', '');
		return getContent(`http://localhost:${port}/${filenameWithNoPrefix}`).then((webData : string) => {
			expect(diskData).toBe(webData);
		});
	};

	test("getallfiles", async () => {
		for (const path in files)
		{
			await runFileAccessTest(files[path]);
		}
	});

	test("Construct server with already allocated port", () => {
		const supressConsole = jest.fn();
		global.console.log = supressConsole;
		global.console.warn = supressConsole;
		global.console.error = supressConsole;

		async function constructServer()
		{
			return await PageServer.Create(port, subfolder).then(
				(filenames : PageServer) =>
				{
				},
				(error : Error) =>
				{
					console.error("Unable to create server!");
					throw error;
				}
			);
		}
		expect(constructServer()).rejects.toThrow(`listen EADDRINUSE :::${port}`);
		supressConsole.mockReset();
	});

	test("Construct server with non-existing port", () => {
		const invalidFolderName = "non-existing";
		async function constructServer()
		{
			return PageServer.Create(port+1, invalidFolderName).then(
				(filenames : PageServer) =>
				{
				},
				(error : Error) =>
				{
					console.error("Unable to create server!");
					throw error;
				}
			);
		}
		return expect(constructServer()).rejects.toThrow(`ENOENT: no such file or directory, lstat '${invalidFolderName}'`);
	});
});