import {Injector} from "@typeix/resty";
import {PermissionController} from "~/controllers/rest/permission.controller";
import {PermissionService} from "~/services/permission.service";

describe("PermissionController", () => {
  let permissionController: PermissionController;
  let permissionService: PermissionService;

  beforeEach(async () => {
    const injector = await Injector.createAndResolve(PermissionController, [PermissionService]);
    permissionController = injector.get(PermissionController);
    permissionService = injector.get(PermissionService);
  });

  it("should return permissions", () => {
    expect(permissionController.permissions()).toEqual(permissionService.find());
  });
});
