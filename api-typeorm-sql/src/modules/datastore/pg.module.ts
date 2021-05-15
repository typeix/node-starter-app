import {Module} from "@typeix/resty";
import {PgConfig} from "~/modules/datastore/configs/pg.config";
import {UserService} from "~/modules/datastore/services/user.service";

@Module({
  providers: [
    PgConfig,
    UserService
  ],
  exports: [UserService]
})
export class PgModule{

}
