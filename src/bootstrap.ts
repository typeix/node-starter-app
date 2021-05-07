import {Application} from "./application";
import {pipeServer} from "@typeix/resty";
import {createServer} from "http";
/**
 * Bootstraps server
 *
 * @function
 * @name pipeServer
 *
 * @description
 * Creates server instance on port 9000
 * We always use separate bootstrap file to bootstrap application because of testing or server side fakeHttp feature.
 * We will be able to simulate server side request with fakeHttp
 */
const server = createServer();
pipeServer(server, Application);
server.on("error", e => console.error(e));
server.listen(9000);
