import {Inject, Injectable, InterceptedRequest, Logger, RequestInterceptor} from "@typeix/resty";
import * as Busboy from "busboy";
import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";

/**
 * @constructor
 * @function
 * @name FileUpload
 *
 * @description
 * File upload
 */
@Injectable()
export class FileUpload implements RequestInterceptor {
  @Inject() logger: Logger;

  async invoke(method: InterceptedRequest): Promise<any> {
    const request = method.request;
    if (request.method === "POST") {
      const saveDir = process.cwd() + method.args.uploadPath;
      await fse.ensureDir(saveDir);
      return new Promise(resolve => {
        const parser = new Busboy({headers: request.headers});
        parser.on("file", (fieldName, file, fileName, encoding, mimeType) => {
          this.logger.debug(`File [${fieldName}, ${fileName}, ${encoding}, ${mimeType}] stream in process`);
          const savePath = path.join(saveDir, path.basename(fileName));
          file.pipe(fs.createWriteStream(savePath));
        });
        parser.on("finish", () => {
          method.response.writeHead(303, {
            "Connection": "close",
            "Location": method.route.path + "?isUploaded=true"
          });
          method.response.end();
          resolve("UPLOADED");
        });
        request.pipe(parser);
      });
    }
  }

}
