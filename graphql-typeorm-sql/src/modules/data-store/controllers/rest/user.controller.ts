import {Controller, GET, Inject, POST} from "@typeix/resty";
import {UserRepository} from "~/modules/data-store/repository/user.repository";
import {Transactional} from "~/modules/data-store/transactional.interceptor";
import {User} from "~/modules/data-store/entity/user.entity";

@Controller({
  path: "/"
})
export class UserController {

  @Inject() userRepository: UserRepository;

  @GET("users")
  async users(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  @POST("users")
  @Transactional(UserRepository)
  createUser(@Inject() repository: UserRepository) {
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
    return this.userRepository.save(user);
  }
}
