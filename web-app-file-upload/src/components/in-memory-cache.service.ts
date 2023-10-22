import {Injectable} from "@typeix/resty";
/**
 * @constructor
 * @function
 * @name InMemoryCacheService
 *
 * @description
 * This is just an caching provider example, usually this should be Redis, Memcached etc. provider
 */
@Injectable()
export class InMemoryCacheService {

  private _cache: Map<string, string> = new Map();
  private _timers: Map<string, NodeJS.Timer | number> = new Map();

  /**
     * Clear cache
     */
  clear(): void {
    this._timers.forEach(timer => clearTimeout(<number>timer));
    this._timers.clear();
    this._cache.clear();
  }

  /**
     * Delete cache by key
     * @param key
     * @returns {boolean}
     */
  delete(key: string): boolean {
    if (this._timers.has(key)) {
      clearTimeout(<number>this._timers.get(key));
      this._timers.delete(key);
    }
    return this._cache.delete(key);
  }


  /**
     * Get cache by key
     * @param key
     * @returns {boolean}
     */
  get(key: string): any {
    return this._cache.get(key);
  }

  /**
     * Check if cache key is there
     * @param key
     * @returns {boolean}
     */
  has(key: string): boolean {
    return this._cache.has(key);
  }

  /**
     * Set value in chache
     * @param key
     * @param value
     * @param timeoutInSec
     * @returns {InMemoryCacheService}
     */
  set(key: string, value: any, timeoutInSec = 0): this {
    if (timeoutInSec > 0) {
      this._timers.set(key, setTimeout(() => this.delete(key), 1000 * timeoutInSec));
    }
    this._cache.set(key, value);
    return this;
  }

}
