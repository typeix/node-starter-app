import {Logger, RootModule} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AppControllerSocket} from "~/app.controller-socket";

@RootModule({
  imports: [],
  controllers: [AppController, AppControllerSocket],
  providers: [AppService],
  shared_providers: [
    {
      provide: Logger,
      useFactory: () => {
        return new Logger({
          options: {
            level: "debug",
            transport: {
              target: "pino-pretty",
              options: {
                colorize: true
              }
            }
          }
        });
      }
    }
  ]
})
export class AppModule {
}
