import {CreateProvider, Injectable, Injector} from "@typeix/resty";
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
import {buildSchema} from "type-graphql";
import {UserResolver} from "~/modules/data-store/resolvers/UserResolver";

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

  @CreateProvider({
    provide: "schema",
    useFactory: async (injector: Injector) => {
      return await buildSchema({
        resolvers: [UserResolver],
        container: <any>injector
      });
    },
    providers: [Injector]
  }) private schema: any;

  getGraphQLSchema() {
    return this.schema;
  }

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
