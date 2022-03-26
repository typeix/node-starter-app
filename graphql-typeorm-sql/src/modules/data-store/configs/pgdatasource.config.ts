import {CreateProvider, Injectable, Injector} from "@typeix/resty";
import {
  DataSource,
  Logger,
  EntityManager,
  DataSourceOptions, EntityTarget
} from "typeorm";
import * as pgConfig from "~/ormconfig.json";
import {PgDataSourceLogger} from "~/modules/data-store/configs/pgdatasource.logger.config";
import {Repository} from "typeorm/repository/Repository";

@Injectable()
export class PgDataSource {

  @CreateProvider({
    provide: DataSource,
    useFactory: async (logger: Logger) => {
      return await new DataSource(<DataSourceOptions>{
        ...pgConfig,
        name: "default",
        logging: process.env.NODE_ENV !== "prod",
        logger
      }).initialize();
    },
    providers: [PgDataSourceLogger, Injector]
  }) private dataSource: DataSource;

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getEntityManager(): EntityManager {
    return this.dataSource.manager;
  }

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    return this.dataSource.manager.getRepository(entity);
  }
}
