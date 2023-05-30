import {IAfterConstruct, Inject, Logger} from "@typeix/resty";
import {IncomingMessage} from "http";
import {SocketIOController, Subscribe, Arg, Socket} from "@typeix/resty-socket-io";


@SocketIOController({
  providers: [],
  middlewares: []
})
export class AppControllerSocketIO implements IAfterConstruct {

  @Inject() logger: Logger;
  @Inject() socket: Socket;
  @Inject() request: IncomingMessage;

  @Subscribe("message")
  onMessage(@Arg() buffer: Buffer) {
    this.logger.debug({
      message: buffer.toString()
    }, "MESSAGE SENT");
    this.socket.emit("message", JSON.stringify({
      message: "RECEIVED: " + buffer.toString()
    }));
  }

  afterConstruct(): void {
    this.logger.info({
      headers: this.request.headers
    });
  }
}
