import {fakeHttpServer, FakeServerApi} from "@typeix/resty";
import {AppModule} from "~/app.module";


describe("PermissionController", () => {
  let fakeServer: FakeServerApi;

  beforeEach(async () => {
    fakeServer = await fakeHttpServer(AppModule);
  });
  describe("Integration", () => {
    test("GetPermissions", async () => {
      let result = await fakeServer.GET("/permissions");
      expect(JSON.parse(result.getBody().toString())).toEqual([
        {"action": "GetAction", "id": 1},
        {"action": "GetOtherAction", "id": 2}
      ]);
    });
  });
});
