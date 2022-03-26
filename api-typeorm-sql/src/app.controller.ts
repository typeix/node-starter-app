import {Controller, Inject, GET, POST} from "@typeix/resty";
import {AppService} from "./app.service";
import {User} from "~/modules/data-store/entity/user.entity";
import {Transactional} from "~/modules/data-store/transactional.interceptor";
import {UserService} from "~/modules/data-store/services/user.service";
import {Repository} from "typeorm";


@Controller({
  path: "/",
  providers: [],
  interceptors: []
})
export class AppController {

  @Inject() appService: AppService;
  @Inject() userService: UserService;

  @GET("users")
  getUsers() {
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

  @GET()
  getHello(): string {
    return this.appService.getHello();
  }
}
