import {Injector, ResolvedRoute} from "@typeix/resty";
import {HomeController} from "./home-controller";
import {AssetsLoader} from "../components/assets-loader";
import {TemplateEngine} from "../components/templating-engine";
import {ServerResponse} from "http";
import {InMemoryCache} from "../components/in-memory-cache";


describe("Home controller", () => {

  let controller: HomeController;
  let assetsMock = {};
  let templateMock = {
    compileAndRender: tpl => Promise.resolve(tpl)
  };
  let responseMock = {};
  let cacheMock = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    set: (key, val) => {}
  };
  let route = {
    url: "/"
  };

  beforeAll(() => {
    let injector = Injector.createAndResolve(HomeController, [
      {
        provide: InMemoryCache,
        useValue: cacheMock
      },
      {
        provide: ResolvedRoute,
        useValue: route
      },
      {
        provide: ServerResponse,
        useValue: responseMock
      },
      {
        provide: AssetsLoader,
        useValue: assetsMock
      },
      {
        provide: TemplateEngine,
        useValue: templateMock
      }
    ]);
    controller = injector.get(HomeController);
  });

  it("Should test redirect action", async () => {
    let templateSpy = jest.spyOn(templateMock, "compileAndRender");
    let cacheSpy = jest.spyOn(cacheMock, "set");
    await controller.actionIndex();
    expect(templateSpy).toHaveBeenCalledWith("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example"
    });
    expect(cacheSpy).toHaveBeenCalledWith(route.url, "home_id");
  });
});
