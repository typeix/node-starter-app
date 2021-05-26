import {Module} from "@typeix/resty";
import {PgConfig} from "~/modules/data-store/configs/pg.config";
import {UserRepository} from "~/modules/data-store/repository/user.repository";
import {createRepositoryFactory} from "~/modules/data-store/helpers";

@Module({
  providers: [
    PgConfig,
    createRepositoryFactory(UserRepository)
  ],
  exports: [UserRepository, PgConfig]
})
export class PgModule {

}
