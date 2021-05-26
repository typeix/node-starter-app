import {CreateProvider, Injectable, Injector, isArray} from "@typeix/resty";
import {
  Connection,
  createConnection,
  Logger,
  ObjectType,
  EntityManager,
  ConnectionOptions,
  useContainer, ConnectionManager
} from "typeorm";
import * as pgConfig from "~/ormconfig.json";
import {PgLoggerConfig} from "~/modules/data-store/configs/pg.logger.config";
import {getMigrations} from "~/modules/data-store/helpers";

@Injectable()
export class PgConfig {

  @CreateProvider({
    provide: Connection,
    useFactory: async (logger: Logger, parent: Injector) => {
      const migrations = await getMigrations();
      const injector = await Injector.createAndResolveChild(parent, Function, migrations);
      useContainer(injector);
      return await createConnection(<ConnectionOptions>{
        ...pgConfig,
        name: "default",
        logging: process.env.NODE_ENV !== "prod",
        logger
      });
    },
    providers: [PgLoggerConfig, Injector, ConnectionManager]
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
