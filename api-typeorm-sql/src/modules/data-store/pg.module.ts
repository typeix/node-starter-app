import {IProvider, Module} from "@typeix/resty";
import {PgConfig} from "~/modules/data-store/configs/pg.config";
import {UserRepository} from "~/modules/data-store/repository/user.repository";
import {ObjectType} from "typeorm";

function createRepositoryFactory<T>(Class: ObjectType<T>): IProvider {
  return  {
    provide: Class,
    useFactory: (config: PgConfig) => config.getCustomRepository(Class),
    providers: [PgConfig]
  };
}

@Module({
  providers: [
    PgConfig,
    createRepositoryFactory(UserRepository)
  ],
  exports: [UserRepository, PgConfig]
})
export class PgModule {

}
