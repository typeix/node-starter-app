import {Query, Resolver} from "type-graphql";
import {User} from "~/modules/data-store/entity/user.entity";
import {Inject, Injectable} from "@typeix/resty";
import {UserRepository} from "~/modules/data-store/repository/user.repository";

@Injectable()
@Resolver(User)
export class UserResolver {
  @Inject() userRepository: UserRepository;

  @Query(() => [User])
  async users(): Promise<Array<User>> {
    return await this.userRepository.find();
  }
}
