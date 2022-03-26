import {Controller, getRequest, getResponse, Inject, Injector, POST} from "@typeix/resty";
import {GraphQLSchemaConfig} from "~/modules/data-store/controllers/graphql/graph-ql-schema-config.service";
import {graphqlHTTP} from "express-graphql";

@Controller({
  path: "/graphql"
})
export class GraphqlController {

  @Inject() graphQLSchemaConfig: GraphQLSchemaConfig;
  @Inject() injector: Injector;

  @POST()
  graphqlHTTP() {
    return graphqlHTTP({
      schema: this.graphQLSchemaConfig.getSchema(),
      context: {
        container: this.injector
      }
    })(
      <any>getRequest(this.injector),
      <any>getResponse(this.injector)
    );
  }
}
