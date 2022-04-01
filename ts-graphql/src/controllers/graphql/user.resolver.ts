import {Inject, Injectable} from "@typeix/resty";
import {Query, Resolver} from "type-graphql";
import {UserService} from "~/services/user.service";
import {User} from "~/data/user.entity";

@Injectable()
@Resolver(User)
export class UserResolver {


  @Inject() private userService: UserService;

  @Query(()=> [User])
  users(): Array<User> {
    return this.userService.find();
  }
}
