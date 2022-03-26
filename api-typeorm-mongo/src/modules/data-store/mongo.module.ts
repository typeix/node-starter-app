import {Module} from "@typeix/resty";
import {MongoDataSource} from "~/modules/data-store/configs/mongo-data-source.service";
import {UserService} from "~/modules/data-store/services/user.service";



@Module({
  providers: [
    MongoDataSource,
    UserService
  ],
  exports: [UserService]
})
export class MongoModule {

}
