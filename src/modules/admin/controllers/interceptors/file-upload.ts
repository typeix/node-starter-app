import {Inject, Injectable, InterceptedRequest, Logger, RequestInterceptor} from "@typeix/resty";
import * as Busboy from "busboy";
import * as fs from "fs";
import * as path from "path";

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
      return new Promise(resolve => {
        const parser = new Busboy({headers: request.headers});
        parser.on("file", (fieldName, file, fileName, encoding, mimeType) => {
          this.logger.debug(`File [${fieldName}, ${fileName}, ${encoding}, ${mimeType}] stream in process`);
          const savePath = path.join(process.cwd() + method.args.uploadPath, path.basename(fileName));
          file.pipe(fs.createWriteStream(savePath));
        });
        parser.on("finish", () => {
          method.response.writeHead(303, {
            "Connection": "close",
            "Location": "/admin/upload?isUploaded=true"
          });
          method.response.end();
          resolve("UPLOADED");
        });
        request.pipe(parser);
      });
    }
  }

}
