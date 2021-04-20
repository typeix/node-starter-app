import {
  createMethodInterceptor,
  Inject,
  Injectable, Interceptor, Method
} from "@typeix/resty";
import {TemplateEngine} from "../../templating-engine";

@Injectable()
export class RenderInterceptor implements Interceptor {
  @Inject() engine: TemplateEngine;
  async invoke(method: Method): Promise<any> {
    const data = await method.invoke();
    const result = await this.engine.compileAndRender(method.decoratorArgs.value, data);
    return await method.transform(result);
  }
}

/**
 * Asset loader service
 * @constructor
 * @function
 * @name Render
 *
 * @description
 * Render template
 */
export function Render(value: string) {
  return createMethodInterceptor(Render, RenderInterceptor, {value});
}

