import {Injector} from "@typeix/resty";
import {AssetsLoaderService} from "@app/components/assets-loader.service";
import {ServerResponse} from "http";
import {AssetsController} from "./assets.controller";

jest.mock("mime");

describe("Assets controller",  () => {

  let controller: AssetsController;
  let headers = [];
  let assetsMock = {
    load: data => data
  };
  let responseMock = {
    setHeader: (key, val) => headers.push([key, val])
  };
  beforeAll(async () => {
    let injector = await Injector.createAndResolve(AssetsController, [
      {
        provide: ServerResponse,
        useValue: responseMock
      },
      {
        provide: AssetsLoaderService,
        useValue: assetsMock
      }
    ]);
    controller = injector.get(AssetsController);
  });

  it("Should fileLoadAction", async () => {
    const headerSpy = jest.spyOn(responseMock, "setHeader");
    const assetsSpy = jest.spyOn(assetsMock, "load");
    const file = "/assets/favicon.png";
    const result = await controller.fileLoadAction(file);
    expect(headerSpy).toHaveBeenCalledTimes(2);
    expect(assetsSpy).toHaveBeenCalledWith(file);
    expect(headers).toEqual([
      ["Content-Type", "application/icon"],
      ["Content-Length", 19]
    ]);
    expect(result).toBe(file);
  });

  it("Should faviconLoader", async () => {
    const ctrlSpy = jest.spyOn(controller, "fileLoadAction");
    const file = "favicon.png";
    await controller.faviconLoader();
    expect(ctrlSpy).toHaveBeenCalledWith(file);
  });
});
