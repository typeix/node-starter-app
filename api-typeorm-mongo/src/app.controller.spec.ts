import {Injector} from "@typeix/resty";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserService} from "~/modules/data-store/services/user.service";
import {MongoDataSource} from "~/modules/data-store/configs/mongo-data-source.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const injector = await Injector.createAndResolve(AppController, [
      {
        provide: MongoDataSource,
        useValue: {}
      },
      AppService,
      UserService
    ]);
    appController = injector.get(AppController);
  });

  describe("root", () => {
    it("should return Hello World!", () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
