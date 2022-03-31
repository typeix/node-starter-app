import {Module} from "@typeix/resty";
import {PgDataSource} from "~/modules/data-store/configs/pgdatasource.config";
import {UserController} from "~/modules/data-store/controllers/rest/user.controller";
import {UserService} from "~/modules/data-store/services/user.service";
import {GraphQLConfig} from "~/modules/data-store/controllers/graphql/graphql-config.service";
import {GraphqlController} from "~/modules/data-store/controllers/graphql/graphql.controller";

@Module({
  controllers: [UserController, GraphqlController],
  providers: [
    PgDataSource,
    UserService,
    GraphQLConfig
  ]
})
export class PgModule {

}
