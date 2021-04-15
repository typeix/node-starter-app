import {InMemoryCache} from "../components/in-memory-cache";
import {Injectable, Interceptor, InterceptedMethod, Inject} from "@typeix/resty";

/**
 * @constructor
 * @function
 * @name CacheInterceptor
 *
 * @description
 * Cache filter example
 */
@Injectable()
export class CacheInterceptor implements Interceptor {
  @Inject() cacheProvider: InMemoryCache;

  async invoke(method: InterceptedMethod): Promise<any> {
    if (await this.cacheProvider.has(method.route.url)) {
      return await this.cacheProvider.get(method.route.url);
    }
  }
}
