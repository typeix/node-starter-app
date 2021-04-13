import {Inject, Controller, GET, PathParam} from "@typeix/resty";

import {Assets} from "../components/assets";
import {Cache} from "../filters/cache";
import {TemplateEngine} from "../components/mu2";

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
  interceptors: [Cache]
})
export class HomeController {

  @Inject() assetLoader: Assets;
  @Inject() engine: TemplateEngine;


  @GET("/params/<id:(\\d+)>/<name>")
  actionId(@PathParam("id") id: number, @PathParam("name") name: string) {
    return this.engine.compileAndRender("home_id", {
      id,
      name,
      title: "Template engine with typeix"
    });
  }

  /**
   * Rendering Template
   */
  @GET()
  actionIndex() {
    return this.engine.compileAndRender("home_id", {
      id: "NO_ID",
      name: "this is home page",
      title: "Home page example"
    });
  }
}
