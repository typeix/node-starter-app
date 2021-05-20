import {Logger, RootModule} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {MongoModule} from "~/modules/data-store/mongo.module";

@RootModule({
  imports: [MongoModule],
  controllers: [AppController],
  providers: [AppService],
  shared_providers: [
    {
      provide: Logger,
      useFactory: () => {
        return new Logger({
          options: {
            prettyPrint: true,
            level: "info"
          }
        });
      }
    }
  ]
})
export class AppModule {
}
