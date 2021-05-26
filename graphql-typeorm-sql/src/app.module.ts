import {
  getRequest,
  getResponse,
  IAfterConstruct,
  Inject,
  Injector,
  Logger,
  RootModule,
  Router
} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {PgModule} from "~/modules/data-store/pg.module";
import {graphqlHTTP} from "express-graphql";
import {PgConfig} from "~/modules/data-store/configs/pg.config";

@RootModule({
  imports: [PgModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
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
export class AppModule implements IAfterConstruct {

  @Inject() router: Router;
  @Inject() config: PgConfig;

  afterConstruct(): void {
    this.router.get("/graphql", (injector: Injector) => {
      return graphqlHTTP({
        schema: this.config.getGraphQLSchema()
      })(
        <any>getRequest(injector),
        <any>getResponse(injector)
      );
    });
  }
}
