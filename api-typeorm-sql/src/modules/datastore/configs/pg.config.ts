import {CreateProvider, Injectable} from "@typeix/resty";
import {Connection, createConnection, Logger} from "typeorm";
import {Repository} from "typeorm/repository/Repository";
import {EntityTarget} from "typeorm/common/EntityTarget";
import * as pgConfig from "./ormconfig.json";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";
import {PgLoggerConfig} from "~/modules/datastore/configs/pg.logger.config";

@Injectable()
export class PgConfig {

  @CreateProvider({
    provide: Connection,
    useFactory: async (logger: Logger) => {
      return await createConnection({
        ...<ConnectionOptions>pgConfig,
        logger
      })

    },
    providers: [PgLoggerConfig]
  }) private connection: Connection;

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    return this.connection.getRepository(entity);
  }
}
