import {
  IRoute,
  Injectable,
  IResolvedRoute,
  Inject,
  createRouteHandler,
  createRouteDefinition,
  GET
} from "@typeix/resty";
import {InMemoryCache} from "./in-memory-cache";
import {HomeController} from "../controllers/home-controller";

const handler = createRouteHandler(
  createRouteDefinition(
    {
      name: "actionIndex",
      decorator: GET
    },
    HomeController
  )
);
/**
 * Dynamic route rule
 * @constructor
 * @function
 * @name DynamicRouteRule
 *
 * @description
 * Here we can define dynamic route rule which has to implement Route
 */
@Injectable()
export class DynamicRouteRule implements IRoute {

  @Inject() cache: InMemoryCache;

  /**
   * Dynamic parse request example
   * @param pathName
   * @param method
   * @param headers
   * @returns {Promise<{method: string, params: {}, route: string}>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parseRequest(pathName: string, method: string, headers: { [key: string]: any }): Promise<IResolvedRoute> {
    if (/\/dynamic(.*)/.test(pathName) && method === "GET") {
      return {
        method,
        params: {},
        url: pathName,
        handler
      };
    }
    return null;
  }

}
