import {Controller, Inject, GET} from "@typeix/resty";
import {Permission} from "~/data/permission.entity";
import {PermissionService} from "~/services/permission.service";

@Controller({
  path: "/permissions",
  providers: [],
  interceptors: []
})
export class PermissionController {

  @Inject() private permissionService: PermissionService;

  @GET()
  permissions(): Array<Permission> {
    return this.permissionService.find();
  }
}
