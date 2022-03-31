import {
  addRequestInterceptor,
  BodyAsBufferInterceptor,
  Controller,
  Inject,
  Injector,
  POST, RouterError
} from "@typeix/resty";
import {GraphQLConfig} from "~/modules/data-store/controllers/graphql/graphql-config.service";
import {graphql, Source, validate, parse, specifiedRules} from "graphql";
import {UserResolver} from "~/modules/data-store/controllers/graphql/user.resolver";

@Controller({
  path: "/graphql",
  providers: [UserResolver]
})
export class GraphqlController {

  @Inject() graphQLSchemaConfig: GraphQLConfig;
  @Inject() injector: Injector;

  @POST()
  @addRequestInterceptor(BodyAsBufferInterceptor)
  processGraphQL(@Inject() body: Buffer) {
    let schema = this.graphQLSchemaConfig.getSchema();
    let {query, operationName, variables} = this.parseBody(body);
    let source = new Source(query, operationName);
    let documentAST = parse(source);
    let validationErrors = validate(schema, documentAST, specifiedRules);
    if (validationErrors.length > 0) {
      throw new RouterError("GraphQL validation error.", 400, validationErrors);
    }
    return graphql(
      schema,
      source,
      null,
      {
        container: this.injector
      },
      variables,
      operationName
    );
  }

  private parseBody(body: Buffer): any {
    try {
      return JSON.parse(body.toString());
    } catch (e) {
      throw new RouterError("GraphQL syntax error, cannot parse json request", 400);
    }
  }
}
