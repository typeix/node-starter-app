import {Controller, Inject, GET} from "@typeix/resty";
import {UserService} from "~/services/user.service";
import {User} from "~/data/user.entity";

@Controller({
  path: "/users",
  providers: [],
  interceptors: []
})
export class UserController {

  @Inject() private userService: UserService;

  @GET()
  users(): Array<User> {
    return this.userService.find();
  }
}
