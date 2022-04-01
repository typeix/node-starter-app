import {Injectable} from "@typeix/resty";
import {User} from "~/data/user.entity";

@Injectable()
export class UserService {
  find(): Array<User> {
    return [
      User.new(1, "John", "Doe", 30),
      User.new(2, "Tifany", "Doe", 31)
    ];
  }
}
