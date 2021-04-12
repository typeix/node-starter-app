import {InMemoryCache} from "../components/in-memory-cache";
import {RequestInterceptor, IRequestInterceptor, Inject, Logger, IResolvedRoute, ResolvedRoute} from "@typeix/resty";
import {ServerResponse} from "http";

/**
 * @constructor
 * @function
 * @name Cache
 *
 * @description
 * Cache filter example
 */
@RequestInterceptor(100)
export class Cache implements IRequestInterceptor {

  @Inject() logger: Logger;
  @Inject() cacheProvider: InMemoryCache;
  @Inject() response: ServerResponse;
  @ResolvedRoute() route: IResolvedRoute;

  async onRequest() {
    if (await this.cacheProvider.has(this.route.url)) {
      this.response.end(this.cacheProvider.get(this.route.url));
    }
  }
}
