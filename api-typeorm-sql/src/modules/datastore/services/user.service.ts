import {Inject, Injectable} from "@typeix/resty";
import {PgConfig} from "~/modules/datastore/configs/pg.config";
import {User} from "~/modules/datastore/entity/user.entity";
import {Repository} from "typeorm/repository/Repository";

@Injectable()
export class UserService {

  @Inject() connection: PgConfig;

  protected getRepository(): Repository<User> {
    return this.connection.getRepository(User);
  }

  findAll(): Promise<Array<User>> {
    return this.getRepository().find();
  }
}
