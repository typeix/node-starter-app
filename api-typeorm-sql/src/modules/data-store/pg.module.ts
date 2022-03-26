import {Module} from "@typeix/resty";
import {PgDataSource} from "~/modules/data-store/configs/pgdatasource.config";
import {UserService} from "~/modules/data-store/services/user.service";


@Module({
  providers: [
    PgDataSource,
    UserService
  ],
  exports: [PgDataSource, UserService]
})
export class PgModule {

}
