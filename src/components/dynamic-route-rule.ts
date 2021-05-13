import {
  IRoute,
  Injectable,
  IResolvedRoute,
  Inject,
  RouteConfig,
  IRouteConfig, Injector
} from "@typeix/resty";
import {InMemoryCache} from "./in-memory-cache";
import {UrlDataStoreService} from "./url-data-store.service";

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
  @Inject() datastore: UrlDataStoreService;
  @Inject() injector: Injector;
  @RouteConfig() config: IRouteConfig;
  /**
   * Dynamic parse request example
   * @param uri
   * @param method
   * @param headers
   * @returns {Promise<{method: string, params: {}, route: string}>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parseRequest(uri: URL, method: string, headers: { [key: string]: any }): Promise<IResolvedRoute> {
    if (await this.datastore.isValid(uri.pathname) && this.config.method === method) {
      return {
        injector: this.injector,
        method,
        headers,
        url: uri,
        params: {},
        path: uri.pathname,
        handler: this.config.handler
      };
    }
    return null;
  }

}
