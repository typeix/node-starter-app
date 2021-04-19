import {
  IAfterConstruct,
  Inject,
  Router,
  RootModule,
  Logger,
  createRouteHandler,
  createRouteDefinition,
  GET
} from "@typeix/resty";
import {AssetsLoader} from "./components/assets-loader";
import {AssetsController} from "./controllers/assets-controller";
import {HomeController} from "./controllers/home-controller";
import {AdminModule} from "./modules/admin/admin.module";
import {TemplateEngine} from "./components/templating-engine";
import {InMemoryCache} from "./components/in-memory-cache";
import {DynamicRouteRule} from "./components/dynamic-route-rule";
import {UrlDataStoreService} from "./components/url-data-store.service";

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
    UrlDataStoreService,
    {
      provide: Logger,
      useFactory: () => new Logger({
        options: {
          level: "debug"
        }
      })
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
    this.router.addRule(
      DynamicRouteRule,
      {
        method: "GET",
        path: "this is ignored in dynamic router",
        handler: createRouteHandler(
          createRouteDefinition(
            {
              name: "actionIndex",
              decorator: GET
            },
            HomeController
          )
        )
      }
    );
  }
}
