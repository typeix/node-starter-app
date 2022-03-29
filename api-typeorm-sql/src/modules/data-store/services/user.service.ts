import {Inject, Injectable} from "@typeix/resty";
import {User} from "~/modules/data-store/entity/user.entity";
import {PgDataSource} from "~/modules/data-store/configs/pgdatasource.config";
import {Repository} from "typeorm/repository/Repository";

@Injectable()
export class UserService {

  @Inject() pgDataSource: PgDataSource;

  async find(): Promise<Array<User>> {
    return this.getRepository().find();
  }

  async save(entity: User): Promise<User> {
    return this.getRepository().save(entity);
  }

  protected getRepository(): Repository<User> {
    return this.pgDataSource.getRepository(User);
  }
}
