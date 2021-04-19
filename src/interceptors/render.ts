import {
  createMethodInterceptor,
  getResponse,
  Inject,
  Injectable, Interceptor, Method
} from "@typeix/resty";
import {TemplateEngine} from "../components/templating-engine";

@Injectable()
export class RenderInterceptor implements Interceptor {
  @Inject() engine: TemplateEngine;
  async invoke(method: Method): Promise<any> {
    const result = await this.engine.compileAndRender(
      method.decoratorArgs.value,
      await method.invoke()
    );
    return await method.transform(result);
  }
}

export function Render(value: string) {
  return createMethodInterceptor(Render, RenderInterceptor, {value});
}

