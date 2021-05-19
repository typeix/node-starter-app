import {Injectable} from "@typeix/resty";
import {User} from "~/modules/data-store/entity/user.entity";
import {EntityRepository, Repository} from "typeorm";

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

}
