import {Injector} from "@typeix/resty";
import {HomeController} from "./home";
import {Assets} from "../components/assets";
import {TemplateEngine} from "../components/mu2";
import {ServerResponse} from "http";


describe("Home controller", () => {

  let controller: HomeController;
  let assetsMock = {};
  let templateMock = {
    compileAndRender: tpl => Promise.resolve(tpl)
  };
  let responseMock = {};

  beforeAll(() => {
    let injector = Injector.createAndResolve(HomeController, [
      {
        provide: ServerResponse,
        useValue: responseMock
      },
      {
        provide: Assets,
        useValue: assetsMock
      },
      {
        provide: TemplateEngine,
        useValue: templateMock
      }
    ]);
    controller = injector.get(HomeController);
  });

  it("Should test redirect action", (done) => {
    let aSpy = jest.spyOn(templateMock, "compileAndRender");
    controller.actionIndex().then(() => {
      expect(aSpy).toHaveBeenCalledWith("home_id", {
        id: "NO_ID",
        name: "this is home page",
        title: "Home page example"
      });
      done();
    }).catch(done);
  });
});
