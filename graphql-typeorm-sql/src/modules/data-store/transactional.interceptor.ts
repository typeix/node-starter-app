import {
  addRequestInterceptor,
  Inject,
  Injectable,
  Injector,
  InterceptedRequest,
  RequestInterceptor
} from "@typeix/resty";
import {PgConfig} from "~/modules/data-store/configs/pg.config";
import {Repository} from "typeorm";


@Injectable()
class TransactionalInterceptor implements RequestInterceptor {

  @Inject() injector: Injector;
  @Inject() config: PgConfig;

  async invoke(request: InterceptedRequest): Promise<any> {
    const queryRunner = this.config.getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction("READ COMMITTED");
    try {
      const type = request.args.type;
      const repository: Repository<typeof type> = await queryRunner.manager.getCustomRepository(type);
      this.injector.set(type, repository);
      await request.handler();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

}

/**
 * Transactional
 * @param type
 * @constructor
 */
export function Transactional<T>(type: T) {
  return addRequestInterceptor(TransactionalInterceptor, {type});
}

