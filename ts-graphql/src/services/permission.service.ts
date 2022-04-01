import {Injectable} from "@typeix/resty";
import {Permission} from "~/data/permission.entity";

@Injectable()
export class PermissionService {
  find(): Array<Permission> {
    return [
      Permission.new(1, "GetAction"),
      Permission.new(2, "GetOtherAction")
    ];
  }
}
