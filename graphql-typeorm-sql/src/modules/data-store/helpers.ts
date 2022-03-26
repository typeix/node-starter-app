import {IProvider} from "@typeix/resty";
import {ObjectType} from "typeorm";
import {PgDataSource} from "~/modules/data-store/configs/pgdatasource.config";

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
    useFactory: (config: PgDataSource) => config.getRepository(Class),
    providers: [PgDataSource]
  };
}
