import {Logger, RootModule} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {PgModule} from "~/modules/data-store/pg.module";

@RootModule({
  imports: [PgModule],
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
