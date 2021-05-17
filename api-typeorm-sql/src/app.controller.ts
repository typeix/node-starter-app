import {Controller, Inject, GET} from "@typeix/resty";
import {AppService} from "./app.service";
import {UserRepository} from "~/modules/datastore/repository/user.repository";


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

  @GET()
  getHello(): string {
    return this.appService.getHello();
  }
}
