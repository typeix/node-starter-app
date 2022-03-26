import {CreateProvider, Injectable} from "@typeix/resty";
import {DataSource, DataSourceOptions, MongoEntityManager} from "typeorm";
import * as pgConfig from "~/ormconfig.json";
import {EntityTarget} from "typeorm/common/EntityTarget";
import {MongoRepository} from "typeorm/repository/MongoRepository";

@Injectable()
export class MongoDataSource {

  @CreateProvider({
    provide: DataSource,
    useFactory: async () => {
      return await new DataSource(<DataSourceOptions>{
        ...pgConfig,
        name: "default",
        logging: process.env.NODE_ENV !== "prod"
      }).initialize();
    },
    providers: []
  }) private dataSource: DataSource;

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getEntityManager(): MongoEntityManager {
    return this.dataSource.mongoManager;
  }

  getMongoRepository<T>(entity: EntityTarget<T>): MongoRepository<T> {
    return this.dataSource.getMongoRepository(entity);
  }
}
