import {Inject, Injectable} from "@typeix/resty";
import {Query, Resolver} from "type-graphql";
import {PermissionService} from "~/services/permission.service";
import {Permission} from "~/data/permission.entity";

@Injectable()
@Resolver(Permission)
export class PermissionResolver {

  @Inject() private permissionService: PermissionService;

  @Query(() => [Permission])
  permissions(): Array<Permission> {
    return this.permissionService.find();
  }
}
