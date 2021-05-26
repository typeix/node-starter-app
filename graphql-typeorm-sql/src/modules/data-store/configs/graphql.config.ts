import {CreateProvider, Injectable, Injector} from "@typeix/resty";
import {buildSchema} from "type-graphql";
import {UserResolver} from "~/modules/data-store/resolvers/UserResolver";

@Injectable()
export class GraphqlConfig {

  @CreateProvider({
    provide: "schema",
    useFactory: async (injector: Injector) => {
      return await buildSchema({
        resolvers: [UserResolver],
        container: <any>injector
      });
    },
    providers: [Injector]
  }) private schema: any;

  getSchema() {
    return this.schema;
  }
}
