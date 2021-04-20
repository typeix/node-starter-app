import {Injector} from "@typeix/resty";
import {AssetsLoader} from "../components/assets-loader";
import {ServerResponse} from "http";
import {AssetsController} from "./assets-controller";
import {getType} from "mime";

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
  beforeAll(() => {
    let injector = Injector.createAndResolve(AssetsController, [
      {
        provide: ServerResponse,
        useValue: responseMock
      },
      {
        provide: AssetsLoader,
        useValue: assetsMock
      }
    ]);
    controller = injector.get(AssetsController);
  });

  it("Should fileLoadAction", async () => {
    const headerSpy = jest.spyOn(responseMock, "setHeader");
    const assetsSpy = jest.spyOn(assetsMock, "load");
    const file = "/assets/favicon.ico";
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
    const file = "favicon.ico";
    await controller.faviconLoader();
    expect(ctrlSpy).toHaveBeenCalledWith(file);
  });
});
