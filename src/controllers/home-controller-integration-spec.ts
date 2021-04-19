import {fakeHttpServer, Injector} from "@typeix/resty";
import {Application} from "../application";
import {TemplateEngine} from "../components/templating-engine";


describe("Home controller", () => {

  let templateEngine: TemplateEngine = Injector.createAndResolve(TemplateEngine, []).get(TemplateEngine);
  const href = "http://localhost/";


  test("Should test index action", async () => {
    let result = await fakeHttpServer(Application).GET("/");
    let body = await templateEngine.compileAndRender("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example",
      href
    });
    expect(result.getBody().toString()).toEqual(body.toString());
  });


  test("Should test home id action", async () => {
    let result = await fakeHttpServer(Application).GET("/params/100/whatevericansee");
    let body = await templateEngine.compileAndRender("home_id", {
      id: "100",
      name: "whatevericansee",
      title: "Template engine with typeix",
      href: href + "params/100/whatevericansee"
    });
    expect(result.getBody().toString()).toEqual(body.toString());
  });
});
