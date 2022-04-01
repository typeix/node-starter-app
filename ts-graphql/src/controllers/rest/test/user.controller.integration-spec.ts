import {fakeHttpServer, FakeServerApi} from "@typeix/resty";
import {AppModule} from "~/app.module";


describe("PermissionController", () => {
  let fakeServer: FakeServerApi;

  beforeEach(async () => {
    fakeServer = await fakeHttpServer(AppModule);
  });
  describe("Integration", () => {
    test("GetUsers", async () => {
      let result = await fakeServer.GET("/users");
      expect(JSON.parse(result.getBody().toString())).toEqual([
        {
          "age": 30,
          "firstName": "John",
          "id": 1,
          "lastName": "Doe",
          "permissions": []
        },
        {
          "age": 31,
          "firstName": "Tifany",
          "id": 2,
          "lastName": "Doe",
          "permissions": []
        }
      ]);
    });
  });
});
