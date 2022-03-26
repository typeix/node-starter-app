import {Inject, Injectable} from "@typeix/resty";
import {User} from "~/modules/data-store/entity/user.entity";
import {MongoDataSource} from "~/modules/data-store/configs/mongo-data-source.service";
import {MongoRepository} from "typeorm/repository/MongoRepository";

@Injectable()
export class UserService {

  @Inject() mongoDataSource: MongoDataSource;

  protected getRepository(): MongoRepository<User> {
    return this.mongoDataSource.getMongoRepository(User);
  }

  async find(): Promise<Array<User>> {
    return this.getRepository().find();
  }

  async save(entity: User): Promise<User> {
    return this.getRepository().save(entity);
  }
}
