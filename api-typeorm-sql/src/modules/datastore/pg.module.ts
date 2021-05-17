import {Module} from "@typeix/resty";
import {PgConfig} from "~/modules/datastore/configs/pg.config";
import {UserRepository} from "~/modules/datastore/repository/user.repository";

@Module({
  providers: [
    PgConfig,
    {
      provide: UserRepository,
      useFactory: config => config.getCustomRepository(UserRepository),
      providers: [PgConfig]
    }
  ],
  exports: [UserRepository]
})
export class PgModule {

}
