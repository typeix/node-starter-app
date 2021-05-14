import {normalize} from "path";
import {readFile} from "fs";
import {Injectable} from "@typeix/resty";
import {compile} from "handlebars";


/**
 * Template engine
 * @constructor
 * @function
 * @name TemplateEngineService
 *
 * @description
 * Load and compile templates from disk
 */
@Injectable()
export class TemplateEngineService {

  templates: Map<string, HandlebarsTemplateDelegate> = new Map();

  /**
   * Gets template path
   * @return {String}
   */
  static getTemplatePath(name: String): string {
    return normalize(process.cwd() + "/views/" + name + ".hbs");
  }

  /**
   * Read file from disk
   * @param template
   */
  async readFile(template: String): Promise<HandlebarsTemplateDelegate> {
    const path = TemplateEngineService.getTemplatePath(template);
    if (this.templates.has(path)) {
      return Promise.resolve(this.templates.get(path));
    }
    return new Promise((resolve, reject) => {
      readFile(path, {encoding: "utf8"},
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            const tpl = compile(data);
            this.templates.set(path, tpl);
            resolve(tpl);
          }
        }
      );
    });
  }

  /**
   * Load template from disk
   * @param template
   * @param data
   * @returns {NodeJS.ReadableStream}
   */
  async compileAndRender(template: String, data: any): Promise<Buffer> {
    const tpl = await this.readFile(template);
    const html = tpl(data);
    return Buffer.from(html);
  }
}
