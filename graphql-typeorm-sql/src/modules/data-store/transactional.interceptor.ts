import {
  addRequestInterceptor,
  Inject,
  Injectable,
  Injector,
  InterceptedRequest,
  RequestInterceptor
} from "@typeix/resty";
import {PgDataSource} from "~/modules/data-store/configs/pgdatasource.config";
import {Repository} from "typeorm";
import {EntityManager} from "typeorm/entity-manager/EntityManager";


@Injectable()
class TransactionalInterceptor implements RequestInterceptor {

  @Inject() injector: Injector;
  @Inject() config: PgDataSource;

  async invoke(request: InterceptedRequest): Promise<any> {
    const queryRunner = this.config.getDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction("READ COMMITTED");
    try {
      const type = request.args.type;
      const repository: Repository<typeof type> = await queryRunner.manager.getRepository(type);
      this.injector.set(Repository, repository);
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

