import {Controller, Inject, GET, POST} from "@typeix/resty";
import {AppService} from "./app.service";
import {User} from "~/modules/datastore/entity/user.entity";
import {UserRepository} from "~/modules/datastore/repository/user.repository";
import {Transactional} from "~/modules/datastore/transactional.interceptor";


@Controller({
  path: "/",
  providers: [],
  interceptors: []
})
export class AppController {

  @Inject() appService: AppService;
  @Inject() userRepository: UserRepository;

  @GET("users")
  getUsers() {
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

  @GET()
  getHello(): string {
    return this.appService.getHello();
  }
}
