import {
  createMethodInterceptor,
  Inject,
  Injectable, Interceptor, Method
} from "@typeix/resty";
import {TemplateEngineService} from "~/components/templating-engine.service";

@Injectable()
export class RenderInterceptor implements Interceptor {
  @Inject() engine: TemplateEngineService;
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
 * RenderInterceptor template
 */
export function Render(value: string) {
  return createMethodInterceptor(Render, RenderInterceptor, {value});
}

