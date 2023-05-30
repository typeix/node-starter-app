import {IAfterConstruct, Inject, Logger} from "@typeix/resty";
import {Arg, Subscribe, WebSocketController, WebSocket} from "@typeix/resty-ws";
import {IncomingMessage} from "http";

@WebSocketController({
  socketOptions: {
    path: "/ws"
  }
})
export class AppControllerSocket implements IAfterConstruct {

  @Inject() logger: Logger;
  @Inject() socket: WebSocket;
  @Inject() request: IncomingMessage;

  @Subscribe("message")
  onMessage(@Arg() buffer: Buffer, @Arg() isBinary: boolean) {
    this.logger.debug({
      message: buffer.toString(),
      isBinary
    }, "MESSAGE SENT");
    this.socket.send(JSON.stringify({
      message: "RECEIVED: " + buffer.toString()
    }));
  }

  afterConstruct(): void {
    this.logger.info({
      headers: this.request.headers
    });
  }
}
