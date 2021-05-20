import {IProvider, Module} from "@typeix/resty";
import {MongoConfig} from "~/modules/data-store/configs/mongo.config";
import {ObjectType} from "typeorm";
import {UserRepository} from "~/modules/data-store/repository/user.repository";

function createRepositoryFactory<T>(Class: ObjectType<T>): IProvider {
  return  {
    provide: Class,
    useFactory: (config: MongoConfig) => config.getMongoRepository(Class),
    providers: [MongoConfig]
  };
}

@Module({
  providers: [
    MongoConfig,
    createRepositoryFactory(UserRepository)
  ],
  exports: [UserRepository]
})
export class MongoModule {

}
