import {Injectable, isFalsy} from "@typeix/resty";
import {User} from "~/data/user.entity";

@Injectable()
export class UserService {
  find(): Array<User> {
    return [
      User.new(1, "John", "Doe", 30),
      User.new(2, "Tifany", "Doe", 31)
    ];
  }

  findByName(firstName: string): Array<User> {
    return this.find().filter(item => isFalsy(firstName) || item.firstName === firstName);
  }
}
