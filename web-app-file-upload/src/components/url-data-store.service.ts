import {Injectable, inArray} from "@typeix/resty";

/**
 * Dynamic router database service mock
 * @constructor
 * @function
 * @name DynamicRouteRule
 *
 * @description
 * This is just mock example to display how data could be stored in db
 */
@Injectable()
export class UrlDataStoreService {

  data: Array<string> = ["/dynamic", "/dynamic-simulation", "/dynamic-db-simulation"];
  async isValid(url: string): Promise<boolean> {
    return inArray(this.data, url);
  }
}
