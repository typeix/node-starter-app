import {CreateProvider, Injectable, RouterError} from "@typeix/resty";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import {UserResolver} from "~/controllers/graphql/user.resolver";
import {PermissionResolver} from "~/controllers/graphql/permission.resolver";

@Injectable()
export class GraphQLConfig {

  @CreateProvider({
    provide: "GraphqlConfigSchema",
    useFactory: async () => {
      return await buildSchema({
        resolvers: [UserResolver, PermissionResolver],
        container: ({context}) => context.container
      });
    },
    providers: []
  })
  private schema: GraphQLSchema;

  public getSchema(): GraphQLSchema {
    return this.schema;
  }

  public parseBody(body: Buffer): any {
    try {
      return JSON.parse(body.toString());
    } catch (e) {
      throw new RouterError("GraphQL syntax error, cannot parse json request", 400);
    }
  }
}
