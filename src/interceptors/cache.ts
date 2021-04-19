import {InMemoryCache} from "../components/in-memory-cache";
import {Injectable, Inject, RequestInterceptor, InterceptedRequest} from "@typeix/resty";

/**
 * @constructor
 * @function
 * @name CacheInterceptor
 *
 * @description
 * Cache filter example
 */
@Injectable()
export class CacheInterceptor implements RequestInterceptor {
  @Inject() cacheProvider: InMemoryCache;

  async invoke(method: InterceptedRequest): Promise<any> {
    if (await this.cacheProvider.has(method.route.path)) {
      let result = await this.cacheProvider.get(method.route.path);
      method.response.end(result);
      return result;
    }
  }
}
