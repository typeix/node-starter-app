import {Injector} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserService} from "~/modules/data-store/services/user.service";

describe("AppController", () => {

  it("should return Hello World!", async () => {
    const userServiceMock = {
      find: () => {}
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
