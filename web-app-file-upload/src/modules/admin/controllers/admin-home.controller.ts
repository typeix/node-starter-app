import {Controller, GET, Inject, OnError, RouterError} from "@typeix/resty";
import {ServerResponse} from "http";

/**
 * Controller example
 * @constructor
 * @function
 * @name AdminHomeController
 *
 * @description
 * Define controller, assign action and inject your services.
 * Each request create new instance of controller, your Injected type is injected by top level injector if is not defined
 * as local instance as providers to this controllers
 */
@Controller({
  path: "/",
  providers: [] // type of local instances within new request since controller is instanciated on each request
})
export class AdminHomeController {

  @Inject() response: ServerResponse;

  /**
   * Error Handler pattern that matches all errors in this controller
   * @param error
   */
  @OnError("(.*)")
  actionError(@Inject(RouterError) error: RouterError) {
    return "ADMIN -> ERROR -> " + error.getCode() + " : " + error.getMessage();
  }

  /**
   * Manually simulate error which is forwarded to previous route
   */
  @GET("fire")
  actionThrowError() {
    throw new RouterError("FIRE", 500);
  }

  /**
   * Manually simulate error which is forwarded to previous route
   */
  @GET("throw")
  actionThrowSecondError() {
    throw new RouterError("THROW", 500);
  }

  /**
   * Admin index action
   */
  @GET()
  actionIndex(): string {
    return "GET actionIndex: admin module";
  }
}
