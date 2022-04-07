import {Inject, Injectable, Logger} from "@typeix/resty";
import {Arg, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {UserService} from "~/services/user.service";
import {User} from "~/data/user.entity";
import {LogOutput} from "~/controllers/graphql/logger.interceptor";
import {PermissionService} from "~/services/permission.service";
import {Permission} from "~/data/permission.entity";

@Injectable()
@Resolver(User)
export class UserResolver {

  @Inject() private userService: UserService;
  @Inject() private permissionService: PermissionService;
  @Inject() private logger: Logger;

  @Query(()=> [User])
  @LogOutput("Logging UserResolver.users")
  users(
    @Arg("firstName", { nullable: true }) firstName: string
  ): Array<User> {
    return this.userService.findByName(firstName);
  }

  @FieldResolver()
  @LogOutput("Logging UserResolver.users.permissions")
  permissions(@Root() user: User): Array<Permission> {
    return this.permissionService.find(user);
  }
}
