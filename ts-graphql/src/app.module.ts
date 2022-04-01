import {Logger, RootModule} from "@typeix/resty";
import {UserController} from "./controllers/rest/user.controller";
import {UserService} from "./services/user.service";
import {PermissionService} from "~/services/permission.service";
import {PermissionController} from "~/controllers/rest/permission.controller";
import {GraphQLController} from "~/controllers/graphql/graphql.controller";
import {GraphQLConfig} from "~/controllers/graphql/graphql.config";

@RootModule({
  imports: [],
  controllers: [UserController, PermissionController, GraphQLController],
  providers: [GraphQLConfig, UserService, PermissionService],
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
