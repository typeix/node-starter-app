import {Inject, Controller, GET, PathParam, ResolvedRoute, IResolvedRoute} from "@typeix/resty";

import {TemplateEngine} from "../components/templating-engine";
import {CacheInterceptor} from "../components/interceptors/request/cache";
import {Render} from "../components/interceptors/method/render";


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

  @Inject() engine: TemplateEngine;
  @ResolvedRoute() route: IResolvedRoute;


  @Render("home_id")
  @GET("/params/<id:(\\d+)>/<name>")
  async actionId(@PathParam("id") id: number, @PathParam("name") name: string): Promise<any> {
    return {
      id,
      name,
      title: "Template engine with typeix",
      href: this.route.url.href
    };
  }

  /**
   * Rendering Template
   */
  @GET()
  async actionIndex() : Promise<Buffer> {
    return await this.engine.compileAndRender("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example",
      href: this.route.url.href
    });
  }
}
