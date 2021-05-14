import {readFile} from "fs";
import {normalize} from "path";
import {isDefined, Injectable} from "@typeix/resty";
/**
 * Asset loader service
 * @constructor
 * @function
 * @name AssetsLoaderService
 *
 * @description
 * Load assets from disk
 */
@Injectable()
export class AssetsLoaderService {

  /**
   * Get public path
   * @return {String}
   */
  static publicPath(name: string): string {
    name = normalize(name);
    return normalize(process.cwd() + "/public/" + name);
  }

  /**
   * Load asset from disk
   * @param name
   * @return {Promise<Buffer>}
   */
  async load(name: string): Promise<Buffer> {
    return await <Promise<Buffer>> new Promise(
      (resolve, reject) =>
        readFile(
          AssetsLoaderService.publicPath(name),
          (err, data) => isDefined(err) ? reject(err) : resolve(data)
        )
    );
  }
}
