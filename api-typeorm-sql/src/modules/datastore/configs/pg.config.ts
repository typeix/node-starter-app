import {CreateProvider, Injectable} from "@typeix/resty";
import {Connection, createConnection} from "typeorm";
import {Repository} from "typeorm/repository/Repository";
import {EntityTarget} from "typeorm/common/EntityTarget";

@Injectable()
export class PgConfig {

  @CreateProvider({
    provide: Connection,
    useFactory: async () => {
      return await createConnection()
    }
  }) private connection: Connection;

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    return this.connection.getRepository(entity);
  }
}
