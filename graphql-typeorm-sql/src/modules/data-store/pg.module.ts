import {getRequest, getResponse, IAfterConstruct, Inject, Injector, Logger, Module, Router} from "@typeix/resty";
import {PgConfig} from "~/modules/data-store/configs/pg.config";
import {UserRepository} from "~/modules/data-store/repository/user.repository";
import {createRepositoryFactory} from "~/modules/data-store/helpers";
import {graphqlHTTP} from "express-graphql";
import {GraphqlConfig} from "~/modules/data-store/configs/graphql.config";
import {UserResolver} from "~/modules/data-store/resolvers/UserResolver";

@Module({
  providers: [
    PgConfig,
    createRepositoryFactory(UserRepository),
    UserResolver,
    GraphqlConfig
  ],
  exports: [UserRepository, PgConfig]
})
export class PgModule implements IAfterConstruct {

  @Inject() router: Router;
  @Inject() logger: Logger;
  @Inject() config: GraphqlConfig;

  afterConstruct(): void {
    this.router.post("/graphql", (injector: Injector) => {
      return graphqlHTTP({
        schema: this.config.getSchema()
      })(
        <any>getRequest(injector),
        <any>getResponse(injector)
      );
    });
    this.logger.info("Router.add /graphql method POST");
  }
}
