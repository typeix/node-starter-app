import {fakeHttpServer, FakeServerApi} from "@typeix/resty";
import {AppModule} from "~/app.module";


describe("UserResolver", () => {
  let fakeServer: FakeServerApi;

  beforeEach(async () => {
    fakeServer = await fakeHttpServer(AppModule);
  });
  describe("Integration", () => {
    test("GetUsers", async () => {
      let body = {
        "query": `
           query GetUsers {
            users {
              id,
              firstName,
              lastName,
              age
            }
          }
        `
      };
      let result = await fakeServer.POST("/graphql", {}, Buffer.from(JSON.stringify(body)));
      expect(JSON.parse(result.getBody().toString())).toEqual({
        "data": {
          "users": [
            {
              "age": 30,
              "firstName": "John",
              "id": "1",
              "lastName": "Doe"
            },
            {
              "age": 31,
              "firstName": "Tifany",
              "id": "2",
              "lastName": "Doe"
            }
          ]
        }
      });
    });
  });
});
