import {CreateProvider, Injectable} from "@typeix/resty";
import {Connection, createConnection, Logger, ObjectType, EntityManager, ConnectionOptions} from "typeorm";
import * as pgConfig from "~/ormconfig.json";
import {PgLoggerConfig} from "~/modules/data-store/configs/pg.logger.config";

@Injectable()
export class PgConfig {

  @CreateProvider({
    provide: Connection,
    useFactory: async (logger: Logger) => {
      return await createConnection(<ConnectionOptions>{
        ...pgConfig,
        name: "default",
        logging: process.env.NODE_ENV !== "prod",
        logger
      });
    },
    providers: [PgLoggerConfig]
  }) private connection: Connection;

  getConnection(): Connection {
    return this.connection;
  }

  getEntityManager(): EntityManager {
    return this.connection.manager;
  }

  getCustomRepository<T>(entity: ObjectType<T>): T {
    return this.connection.getCustomRepository(entity);
  }
}
