import {createMethodInterceptor, Inject, Injectable, Interceptor, Logger, Method} from "@typeix/resty";

@Injectable()
class LoggerInterceptor implements Interceptor {
  @Inject() private logger: Logger;

  async invoke(method: Method): Promise<any> {
    let result = await method.invoke();
    this.logger.debug([
      `Injected arguments: ${this.prettyPrint(method.methodArgs)}`,
      `Result ${this.prettyPrint(result)}`,
      `With decorator args: ${this.prettyPrint(method.decoratorArgs)}`
    ].join("\n"));
    return result;
  }

  private prettyPrint(value: any): string {
    return JSON.stringify(value, null, " ");
  }
}


export function LogOutput(value) {
  return createMethodInterceptor(LogOutput, LoggerInterceptor, {value});
}
