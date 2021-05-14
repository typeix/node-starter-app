import {
  IAfterConstruct,
  Inject,
  Router,
  RootModule,
  Logger,
  createRouteHandler,
  createRouteDefinition,
  GET, Injector
} from "@typeix/resty";
import {AssetsLoaderService} from "./components/assets-loader.service";
import {AssetsController} from "./controllers/assets.controller";
import {HomeController} from "./controllers/home.controller";
import {AdminModule} from "./modules/admin/admin.module";
import {TemplateEngineService} from "./components/templating-engine.service";
import {InMemoryCacheService} from "./components/in-memory-cache.service";
import {DynamicRouteRule} from "./components/dynamic-route.rule";
import {UrlDataStoreService} from "./components/url-data-store.service";
import {FileUploadModule} from "./modules/file-upload/file-upload.module";

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
  imports: [AdminModule, FileUploadModule], // bootstrap in recursive top level order
  controllers: [AssetsController, HomeController], // no order
  providers: [AssetsLoaderService],
  shared_providers: [
    InMemoryCacheService,
    UrlDataStoreService,
    TemplateEngineService,
    {
      provide: Logger,
      useFactory: () => new Logger({
        options: {
          prettyPrint: true,
          level: "debug"
        }
      })
    },
    Router
  ]
})
export class Application implements IAfterConstruct {

  @Inject() router: Router;
  @Inject() injector: Injector;
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
        injector: this.injector,
        method: "GET",
        path: "This is ignored in dynamic router",
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
