import {normalize} from "path";
import {Injectable} from "@typeix/resty";
import {compileAndRender} from "mu2";


/**
 * Template engine
 * @constructor
 * @function
 * @name TemplateEngine
 *
 * @description
 * Load and compile templates from disk
 */
@Injectable()
export class TemplateEngine {
  /**
     * Gets template path
     * @return {String}
     */
  static getTemplatePath(name: String): string {
    return normalize(process.cwd() + "/views/" + name + ".mustache");
  }

  /**
     * Load template from disk
     * @param template
     * @param data
     * @returns {NodeJS.ReadableStream}
     */
  compileAndRender(template: String, data: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      let tpl = "";
      compileAndRender(TemplateEngine.getTemplatePath(template), data)
        .on("data", (chunk) => tpl += chunk)
        .on("error", error => reject(error))
        .on("end", () => resolve(Buffer.from(tpl)));
    });
  }
}
