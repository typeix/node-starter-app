import {Controller, Inject, GET} from "@typeix/resty";
import {AppService} from "./app.service";
import {UserService} from "~/modules/datastore/services/user.service";

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
    return this.userService.findAll();
  }

  @GET()
  getHello(): string {
    return this.appService.getHello();
  }
}
