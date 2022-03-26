import {Controller, GET, Inject, POST} from "@typeix/resty";
import {Transactional} from "~/modules/data-store/transactional.interceptor";
import {User} from "~/modules/data-store/entity/user.entity";
import {Repository} from "typeorm/repository/Repository";
import {UserService} from "~/modules/data-store/services/user.service";

@Controller({
  path: "/"
})
export class UserController {

  @Inject() userService: UserService;

  @GET("users")
  async users(): Promise<Array<User>> {
    return this.userService.find();
  }

  @POST("users")
  @Transactional(User)
  createUser(@Inject() repository: Repository<User>) {
    const user = new User();
    user.age = 100;
    user.firstName = "Igor";
    user.lastName = "Surname";
    return repository.save(user);
  }

  @POST("users-default-transaction")
  createUserWithDefaultTransactionLevel() {
    const user = new User();
    user.age = 100;
    user.firstName = "Igor";
    user.lastName = "Surname";
    return this.userService.save(user);
  }
}
