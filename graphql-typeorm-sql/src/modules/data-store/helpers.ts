import {IProvider} from "@typeix/resty";
import {ObjectType} from "typeorm";
import {PgConfig} from "~/modules/data-store/configs/pg.config";

/**
 * @function
 * @name createRepositoryFactory
 * @param Class
 * @description
 * Create Repository
 */
export function createRepositoryFactory<T>(Class: ObjectType<T>): IProvider {
  return {
    provide: Class,
    useFactory: (config: PgConfig) => config.getCustomRepository(Class),
    providers: [PgConfig]
  };
}
