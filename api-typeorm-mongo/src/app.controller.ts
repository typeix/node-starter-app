import {Controller, Inject, GET, POST} from "@typeix/resty";
import {AppService} from "./app.service";
import {User} from "~/modules/data-store/entity/user.entity";
import {UserService} from "~/modules/data-store/services/user.service";


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
  createUser() {
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
