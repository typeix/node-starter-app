import {CreateProvider, Injectable} from "@typeix/resty";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import {UserResolver} from "~/modules/data-store/controllers/graphql/user.resolver";

@Injectable()
export class GraphQLSchemaConfig {

  @CreateProvider({
    provide: "GraphqlConfigSchema",
    useFactory: async () => {
      return await buildSchema({
        resolvers: [UserResolver],
        container: ({context}) => context.container
      });
    },
    providers: []
  })
  private schema: GraphQLSchema;

  public getSchema(): GraphQLSchema {
    return this.schema;
  }
}
