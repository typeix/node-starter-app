import {Injectable, isTruthy} from "@typeix/resty";
import {Permission} from "~/data/permission.entity";
import {User} from "~/data/user.entity";

@Injectable()
export class PermissionService {
  find(user?: User): Array<Permission> {
    return [
      Permission.new(1, "GetAction"),
      Permission.new(2, "GetOtherAction")

    ].concat(isTruthy(user) ? [Permission.new(3, "PermissionForUser-" + user.firstName)] : []);
  }
}
