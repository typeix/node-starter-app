import {CreateProvider, Injectable} from "@typeix/resty";
import {Connection, createConnection, ConnectionOptions, MongoEntityManager} from "typeorm";
import * as pgConfig from "~/ormconfig.json";
import {ObjectType} from "typeorm/common/ObjectType";

@Injectable()
export class MongoConfig {

  @CreateProvider({
    provide: Connection,
    useFactory: async () => {
      return await createConnection(<ConnectionOptions>{
        ...pgConfig,
        name: "default",
        logging: process.env.NODE_ENV !== "prod"
      });
    },
    providers: []
  }) private connection: Connection;

  getConnection(): Connection {
    return this.connection;
  }

  getEntityManager(): MongoEntityManager {
    return this.connection.mongoManager;
  }

  getMongoRepository<T>(entity: ObjectType<T>): T {
    return this.connection.getCustomRepository(entity);
  }
}
