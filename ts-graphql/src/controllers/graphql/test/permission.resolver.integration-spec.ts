import {fakeHttpServer, FakeServerApi} from "@typeix/resty";
import {AppModule} from "~/app.module";


describe("PermissionResolver", () => {
  let fakeServer: FakeServerApi;

  beforeEach(async () => {
    fakeServer = await fakeHttpServer(AppModule);
  });
  describe("Integration", () => {
    test("GetPermissions", async () => {
      let body = {
        "query": `
           query GetPermissions {
            permissions {
              id,
              action
            }
          }
        `
      };
      let result = await fakeServer.POST("/graphql", {}, Buffer.from(JSON.stringify(body)));
      expect(JSON.parse(result.getBody().toString())).toEqual({
        "data": {
          "permissions": [
            {"action": "GetAction", "id": "1"},
            {"action": "GetOtherAction", "id": "2"}
          ]
        }
      });
    });
  });
});
