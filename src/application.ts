import {
  IAfterConstruct,
  Inject,
  Router,
  RootModule,
  Logger
} from "@typeix/resty";
import {AssetsLoader} from "./components/assets-loader";
import {AssetsController} from "./controllers/assets-controller";
import {HomeController} from "./controllers/home-controller";
import {AdminModule} from "./modules/admin/admin.module";
import {TemplateEngine} from "./components/templating-engine";
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
  controllers: [AssetsController, HomeController], // no order
  providers: [AssetsLoader, TemplateEngine],
  shared_providers: [
    InMemoryCache,
    {
      provide: Logger,
      useFactory: () => new Logger(Logger.defaultConfig("info"))
    },
    Router
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
