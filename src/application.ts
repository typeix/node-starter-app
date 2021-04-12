import {
  IAfterConstruct,
  Inject,
  Router,
  RootModule,
  Logger, Injector, verifyProvider
} from "@typeix/resty";
import {Assets} from "./components/assets";
import {CoreController} from "./controllers/core";
import {HomeController} from "./controllers/home";
import {AdminModule} from "./modules/admin/admin.module";
import {TemplateEngine} from "./components/mu2";
import {InMemoryCache} from "./components/in-memory-cache";
import {DynamicRouteRule} from "./components/dynamic-router";

/**
 * Application entry point
 * @constructor
 * @function
 * @name Application
 *
 * @description
 * \@Module is used to define application entry point class
 */
@RootModule({
  imports: [AdminModule], // bootstrap in recursive top level order
  controllers: [HomeController, CoreController], // no order
  providers: [Assets, TemplateEngine],
  shared_providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(Logger.defaultConfig("info"))
    },
    {
      provide: Router,
      useClass: Router,
      providers: [InMemoryCache]
    }
  ]
})
export class Application implements IAfterConstruct {

  @Inject() router: Router;

  /**
   * @function
   * @name Application#afterConstruct
   *
   * @description
   * After construct use injected values to define some behavior at entry point
   * Defining main route, all routes are processed
   */
  afterConstruct() {
    this.router.addRule(DynamicRouteRule);
  }
}
