import {pipeServer} from "@typeix/resty";
import {AppModule} from "./app.module";
import {createServer} from "http";
import {pipeWebSocket as pipeSocketIO} from "@typeix/resty-socket-io";
/**
 * Bootstraps server
 *
 * @function
 * @name pipeServer
 *
 */
async function bootstrap() {
  const server = createServer();
  await pipeServer(server, AppModule);
  await pipeSocketIO(server, AppModule);
  server.listen(8080);
}

export default bootstrap();
