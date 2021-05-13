import {fakeHttpServer} from "@typeix/resty";
import {Application} from "@app/application";


describe("AdminHome controller", () => {


  test("Should Action Index", async () => {
    const server = await fakeHttpServer(Application);
    const result = await server.GET("/admin");
    expect(result.getBody().toString()).toEqual("GET actionIndex: admin module");
  });

  test("Should Fire Error", async () => {
    const server = await fakeHttpServer(Application);
    const result = await server.GET("/admin/fire");
    expect(result.getBody().toString()).toEqual("ADMIN -> ERROR -> 500 : FIRE");
  });

  test("Should Throw Error", async () => {
    const server = await fakeHttpServer(Application);
    const result = await server.GET("/admin/throw");
    expect(result.getBody().toString()).toEqual("ADMIN -> ERROR -> 500 : THROW");
  });
});
