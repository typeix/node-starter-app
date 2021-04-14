import {fakeHttpServer, Injector} from "@typeix/resty";
import {Application} from "../../../application";


describe("AdminHome controller", () => {


  test("Should Action Index", async () => {
    let result = await fakeHttpServer(Application).GET("/admin");
    expect(result.getBody().toString()).toEqual("GET actionIndex: admin module");
  });

  test("Should Fire Error", async () => {
    let result = await fakeHttpServer(Application).GET("/admin/fire");
    expect(result.getBody().toString()).toEqual("ADMIN -> ERROR -> 500 : FIRE");
  });

  test("Should Throw Error", async () => {
    let result = await fakeHttpServer(Application).GET("/admin/throw");
    expect(result.getBody().toString()).toEqual("ADMIN -> ERROR -> 500 : THROW");
  });
});
