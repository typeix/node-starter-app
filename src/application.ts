import {
  IAfterConstruct,
  Inject,
  HttpMethod,
  Router,
  RootModule,
  Logger,
  BeforeEach,
  Before,
  Action, After, AfterEach
} from "@typeix/rexxar";
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
  imports: [ AdminModule ], // bootstrap in recursive top level order
  controllers: [ HomeController, CoreController ], // no order
  providers: [ Assets, TemplateEngine, InMemoryCache ],
  shared_providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(Logger.defaultConfig("info"))
    },
    {
      provide: Router,
      useClass: Router,
      providers: [ Logger, InMemoryCache ]
    }
  ]
})
export class Application implements IAfterConstruct {

  /**
   * @param {Assets} assetLoader
   * @description
   * Custom asset loader service
   */
  @Inject() assetLoader: Assets;

  /**
   * @param {Logger} logger
   * @description
   * Logger service
   */
  @Inject() logger: Logger;

  /**
   * @param {Router} router
   * @description
   * Router service
   */
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

    this.router.addRules([
      {
        methods: [ HttpMethod.GET ],
        route: "core/favicon",
        url: "/favicon.ico"
      },
      {
        methods: [ HttpMethod.GET ],
        route: "core/assets",
        url: "/assets/<file:(.*)>"
      },
      {
        methods: [ HttpMethod.GET ],
        route: "home/id",
        url: "/<id:(\\d+)>/<name:(\\w+)>"
      },
      {
        methods: [ HttpMethod.GET ],
        route: "home/id",
        url: "/<id:(\\d+)>"
      },
      {
        methods: [ HttpMethod.GET ],
        route: "home/index",
        url: "/"
      },
      {
        methods: [ HttpMethod.GET ],
        route: "home/redirect",
        url: "/redirect-to-home"
      },
      {
        methods: [ HttpMethod.GET ],
        route: "core/error",
        url: "/throw-error"
      }
    ]);

    this.router.addRule(DynamicRouteRule);
    this.router.setError("core/error");
  }
}
