import {InMemoryCache} from "../components/in-memory-cache";
import {RequestInterceptor, IRequestInterceptor, Inject, Logger, IResolvedRoute, ResolvedRoute} from "@typeix/resty";
import {ServerResponse} from "http";

/**
 * @constructor
 * @function
 * @name CacheInterceptor
 *
 * @description
 * Cache filter example
 */
@RequestInterceptor(100)
export class CacheInterceptor  implements IRequestInterceptor {

  @Inject() logger: Logger;
  @Inject() cacheProvider: InMemoryCache;
  @Inject() response: ServerResponse;
  @ResolvedRoute() route: IResolvedRoute;

  async onRequest() {
    if (await this.cacheProvider.has(this.route.url)) {
      const result = await this.cacheProvider.get(this.route.url);
      this.response.end(result);
      return result;
    }
  }
}
