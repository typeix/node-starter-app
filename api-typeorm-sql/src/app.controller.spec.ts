import {Injector} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserService} from "~/modules/datastore/services/user.service";

describe("AppController", () => {

  it("should return Hello World!", async () => {
    const userServiceMock = {
      findAll: () => {}
    };
    const injector = await Injector.createAndResolve(AppController, [
      AppService,
      {
        provide: UserService,
        useValue: userServiceMock
      }
    ]);
    const controller = injector.get(AppController);
    expect(controller.getHello()).toBe("Hello World!");
  });
});
