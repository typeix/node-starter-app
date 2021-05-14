import {fakeHttpServer, Injector} from "@typeix/resty";
import {Application} from "@app/application";
import {TemplateEngineService} from "@app/components/templating-engine.service";


describe("Home controller", () => {

  let templateEngine: TemplateEngineService = Injector.Sync.createAndResolve(TemplateEngineService, []).get(TemplateEngineService);
  const href = "http://localhost/";


  test("Should test index action", async () => {
    const server = await fakeHttpServer(Application);
    const result = await server.GET("/");
    const body = await templateEngine.compileAndRender("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example",
      href
    });
    const resultBody = result.getBody();
    expect(resultBody.toString()).toEqual(body.toString());
  });


  test("Should test home id action", async () => {
    const server = await fakeHttpServer(Application);
    const result = await server.GET("/params/100/whatevericansee");
    const body = await templateEngine.compileAndRender("home_id", {
      id: "100",
      name: "whatevericansee",
      title: "Template engine with typeix",
      href: href + "params/100/whatevericansee"
    });
    expect(result.getBody().toString()).toEqual(body.toString());
  });
});
