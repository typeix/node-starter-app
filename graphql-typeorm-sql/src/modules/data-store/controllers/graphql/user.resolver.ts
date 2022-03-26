import {Query, Resolver} from "type-graphql";
import {User} from "~/modules/data-store/entity/user.entity";
import {Inject, Injectable} from "@typeix/resty";
import {UserService} from "~/modules/data-store/services/user.service";

@Injectable()
@Resolver(User)
export class UserResolver {
  @Inject() userService: UserService;

  @Query(() => [User])
  async users(): Promise<Array<User>> {
    return await this.userService.find();
  }
}
