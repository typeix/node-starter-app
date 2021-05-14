import {InMemoryCacheService} from "@app/components/in-memory-cache.service";
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
  @Inject() cacheProvider: InMemoryCacheService;

  async invoke(method: InterceptedRequest): Promise<any> {
    if (await this.cacheProvider.has(method.route.path)) {
      return await this.cacheProvider.get(method.route.path);
    } else {
      this.cacheProvider.set(method.route.path, await method.handler(), 120);
    }
  }
}
