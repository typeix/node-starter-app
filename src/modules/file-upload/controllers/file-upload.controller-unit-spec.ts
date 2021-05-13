import {Injector, IResolvedRoute, Logger, POST, ResolvedRoute, Router} from "@typeix/resty";
import {FileUploadController} from "./file-upload.controller";
import {createRoute} from "@typeix/resty/build/helpers/server";
import {FileUploadModule} from "@app/modules/file-upload/file-upload.module";
import {TemplateEngine} from "@app/components/templating-engine";
import {IncomingMessage, ServerResponse} from "http";
import {Socket} from "net";

describe("FileUpload controller", () => {

  it("Should render", async () => {

    const headers = {};
    const route: IResolvedRoute = {
      path: "/file/upload",
      headers: headers,
      params: {},
      handler: () => {
        //
      },
      method: "GET",
      url: Router.parseURI("/", headers)
    };
    const templateMock = {
      compileAndRender: () => {
        //
      }
    };
    const logger = {
      debug: () => {
        //
      }
    };
    const injector = Injector.Sync.createAndResolve(FileUploadController, [
      {
        provide: ResolvedRoute,
        useValue: route
      },
      {
        provide: TemplateEngine,
        useValue: templateMock
      },
      {
        provide: Logger,
        useValue: logger
      }
    ]);
    const controller = injector.get(FileUploadController);

    let templateSpy = jest.spyOn(templateMock, "compileAndRender");
    await controller.actionUploadFile(route);
    expect(templateSpy).toHaveBeenCalledWith("file_upload", {
      title: "File Upload example",
      message: "Magic is here",
      isUploaded: null
    });
  });

  it("Should upload", async () => {
    const boundary = "---------------------------paZqsnEHRufoShdX6fh0lUhXBP4k";
    const headers = {
      "content-type": "multipart/form-data; boundary=" + boundary
    };
    const handler = createRoute(
      {name: "actionUploadFile", decorator: POST},
      FileUploadController,
      FileUploadModule
    );
    const route: IResolvedRoute = {
      path: "/file/upload",
      headers: headers,
      params: {},
      handler,
      method: "POST",
      url: Router.parseURI("/", headers)
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const injector = createServerInjectorMock((request: IncomingMessage, response: ServerResponse) => {
      request.url = route.path;
      request.method = route.method;
      request.headers = headers;
      setTimeout(() => request.emit("end"), 100);
    });
    const result = await route.handler(injector, route);
    expect(result).toEqual("UPLOADED");
  });


  // eslint-disable-next-line no-shadow
  function createServerInjectorMock(transform: (request: IncomingMessage, response: ServerResponse) => void): Injector {
    const injector = new Injector();
    const request = new IncomingMessage(new Socket());
    const response = new ServerResponse(request);
    injector.set(IncomingMessage, request);
    injector.set(ServerResponse, response);
    injector.createAndResolve({
      provide: Logger,
      useFactory: () => new Logger({
        options: {
          level: "info"
        }
      })
    }, []);
    transform(request, response);
    return injector;
  }
});
