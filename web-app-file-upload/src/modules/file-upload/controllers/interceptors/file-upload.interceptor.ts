import {CreateProvider, Inject, Injectable, InterceptedRequest, Logger, RequestInterceptor} from "@typeix/resty";
import * as Busboy from "busboy";
import * as fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import {IncomingMessage} from "http";

/**
 * @constructor
 * @function
 * @name FileUploadInterceptor
 *
 * @description
 * File upload
 */
@Injectable()
export class FileUploadInterceptor implements RequestInterceptor {
  @Inject() logger: Logger;
  @CreateProvider({
    provide: Busboy,
    useFactory: (request) => {
      if (request.method === "POST") {
        return new Busboy({headers: request.headers});
      }
    },
    providers: [IncomingMessage]
  }) parser: NodeJS.WritableStream;

  async invoke(method: InterceptedRequest): Promise<any> {
    const request = method.request;
    if (request.method === "POST") {
      const saveDir = process.cwd() + method.args.uploadPath;
      await fse.ensureDir(saveDir);
      return new Promise(resolve => {
        this.parser.on("file", (fieldName, file, fileName, encoding, mimeType) => {
          this.logger.debug(`File [${fieldName}, ${fileName}, ${encoding}, ${mimeType}] stream in process`);
          const savePath = path.join(saveDir, path.basename(fileName));
          file.pipe(fs.createWriteStream(savePath));
        });
        this.parser.on("finish", () => {
          method.response.writeHead(303, {
            "Connection": "close",
            "Location": method.route.path + "?isUploaded=true"
          });
          method.response.end();
          resolve("UPLOADED");
        });
        request.pipe(this.parser);
      });
    }
  }

}
