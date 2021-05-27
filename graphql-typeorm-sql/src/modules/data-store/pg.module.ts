import {
  getRequest,
  getResponse,
  IAfterConstruct,
  Inject,
  Injector,
  Logger,
  Module,
  Router
} from "@typeix/resty";
import {PgConfig} from "~/modules/data-store/configs/pg.config";
import {UserRepository} from "~/modules/data-store/repository/user.repository";
import {createRepositoryFactory} from "~/modules/data-store/helpers";
import {UserResolver} from "~/modules/data-store/controllers/graphql/user.resolver";
import {UserController} from "~/modules/data-store/controllers/rest/user.controller";
import {graphqlHTTP} from "express-graphql";
import {buildSchema} from "type-graphql";

@Module({
  controllers: [UserController],
  providers: [
    PgConfig,
    createRepositoryFactory(UserRepository),
    UserResolver,
    {
      provide: "schema",
      useFactory: async (injector: Injector) => {
        return await buildSchema({
          resolvers: [UserResolver],
          container: <any>injector
        });
      },
      providers: [Injector]
    }
  ],
  exports: [UserRepository]
})
export class PgModule implements IAfterConstruct {

  @Inject() router: Router;
  @Inject() logger: Logger;
  @Inject("schema") schema: any;

  afterConstruct(): void {
    this.router.post("/graphql", (injector: Injector) => {
      return graphqlHTTP({
        schema: this.schema
      })(
        <any>getRequest(injector),
        <any>getResponse(injector)
      );
    });
    this.logger.info("Router.add /graphql method POST");
  }
}
