import {Controller, Inject, GET, POST} from "@typeix/resty";
import {AppService} from "./app.service";
import {User} from "~/modules/data-store/entity/user.entity";
import {UserRepository} from "~/modules/data-store/repository/user.repository";


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
