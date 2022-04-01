import {Injector} from "@typeix/resty";
import {UserService} from "~/services/user.service";
import {UserController} from "~/controllers/rest/user.controller";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const injector = await Injector.createAndResolve(UserController, [UserService]);
    userController = injector.get(UserController);
    userService = injector.get(UserService);
  });

  it("should return users", () => {
    expect(userController.users()).toBe(userService.find());
  });
});
