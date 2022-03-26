import {Module} from "@typeix/resty";
import {PgDataSource} from "~/modules/data-store/configs/pgdatasource.config";
import {UserResolver} from "~/modules/data-store/controllers/graphql/user.resolver";
import {UserController} from "~/modules/data-store/controllers/rest/user.controller";
import {UserService} from "~/modules/data-store/services/user.service";
import {GraphQLSchemaConfig} from "~/modules/data-store/controllers/graphql/graph-ql-schema-config.service";
import {GraphqlController} from "~/modules/data-store/controllers/graphql/graphql.controller";

@Module({
  controllers: [UserController, GraphqlController],
  providers: [
    PgDataSource,
    UserService,
    UserResolver,
    GraphQLSchemaConfig
  ]
})
export class PgModule {

}
