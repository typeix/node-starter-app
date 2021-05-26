import {flatten, IProvider, isClass, verifyProviders} from "@typeix/resty";
import {join, normalize} from "path";
import {readdir} from "fs";
import {ObjectType} from "typeorm";
import {PgConfig} from "~/modules/data-store/configs/pg.config";

/**
 * Read directory
 * @param dir
 */
export async function readDir(dir: string): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    readdir(
      normalize(join(module.path, <string>dir)),
      (error, files) => {
        if (error) {
          reject(error);
        } else {
          resolve(files);
        }
      }
    );
  });
}

/**
 * @function
 * @name getMigrations
 * @description
 * Get all migrations
 */
export async function getMigrations(): Promise<Array<IProvider>> {
  const migrationPath = "./migration";
  const list = await readDir(migrationPath);
  const migrations = list.filter(key => key.endsWith(".js"))
    .map(key => require(join(module.path, migrationPath, key)))
    .map(migrationClass => {
      return Object.keys(migrationClass)
        .filter(key => isClass(Reflect.get(migrationClass, key)))
        .map(key => Reflect.get(migrationClass, key));
    });
  return verifyProviders(flatten(migrations));
}

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
