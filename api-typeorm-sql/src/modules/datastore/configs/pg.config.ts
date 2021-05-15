import {CreateProvider, Injectable} from "@typeix/resty";
import {Connection, createConnection} from "typeorm";
import {Repository} from "typeorm/repository/Repository";

@Injectable()
export class PgConfig {

  @CreateProvider({
    provide: Connection,
    useFactory: async () => {
      return await createConnection()
    }
  }) private connection: Connection;

  getRepository<T>(entity: T): Repository<T> {
    return this.connection.getRepository(entity);
  }
}
