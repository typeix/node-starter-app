import {pipeServer} from "@typeix/resty";
import {AppModule} from "./app.module";
import {createServer} from "http";
import {pipeWebSocket} from "@typeix/resty-ws";

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
  await pipeWebSocket(server, AppModule);
  server.listen(3000);
}

export default bootstrap();
