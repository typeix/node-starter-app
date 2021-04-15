import {createMethodInterceptor, Inject, Injectable, InterceptedMethod, Interceptor} from "@typeix/resty";
import {TemplateEngine} from "../components/templating-engine";

@Injectable()
export class RenderInterceptor implements Interceptor {
  @Inject() engine: TemplateEngine;
  async invoke(method: InterceptedMethod): Promise<any> {
    return await this.engine.compileAndRender(method.args.value, await method.handler());
  }
}

export function Template(value: string) {
  return createMethodInterceptor(RenderInterceptor, 100, {value});
}

