import {Injectable} from "@typeix/resty";
import {User} from "~/modules/data-store/entity/user.entity";
import {EntityRepository, MongoRepository} from "typeorm";

@Injectable()
@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {

}
