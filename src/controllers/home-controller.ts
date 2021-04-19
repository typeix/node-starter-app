import {Inject, Controller, GET, PathParam, ResolvedRoute, IResolvedRoute} from "@typeix/resty";

import {AssetsLoader} from "../components/assets-loader";
import {CacheInterceptor} from "../interceptors/cache";
import {TemplateEngine} from "../components/templating-engine";
import {InMemoryCache} from "../components/in-memory-cache";
import {Render} from "../interceptors/render";

/**
 * Controller example
 * @constructor
 * @function
 * @name HomeController
 *
 * @description
 * Define controller, assign action and inject your services.
 * Each request create new instance of controller, your Injected type is injected by top level injector if is not defined
 * as local instance as providers to this controllers.
 *
 * Controllers can be Inherited by thy don't necessary need's to be inherited
 */
@Controller({
  path: "/",
  interceptors: [CacheInterceptor]
})
export class HomeController {

  @Inject() assetLoader: AssetsLoader;
  @Inject() engine: TemplateEngine;
  @Inject() cache: InMemoryCache;
  @ResolvedRoute() route: IResolvedRoute;


  @Render("home_id")
  @GET("/params/<id:(\\d+)>/<name>")
  async actionId(@PathParam("id") id: number, @PathParam("name") name: string) {
    return {
      id,
      name,
      title: "Template engine with typeix"
    };
  }

  /**
   * Rendering Template
   */
  @GET()
  async actionIndex() {
    const result = await this.engine.compileAndRender("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example"
    });
    this.cache.set(this.route.path, result);
    return result;
  }
}
