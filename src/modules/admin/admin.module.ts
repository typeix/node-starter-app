import {Module} from "@typeix/resty";
import {AdminHomeController} from "./controllers/admin.home-controller";

/**
 * Application entry point
 * @constructor
 * @function
 * @name Application
 *
 * @description
 * \@Module is used to define application entry point class
 */
@Module({
  path: "admin",
  controllers: [AdminHomeController],
  providers: []
})
export class AdminModule {}
