import {Logger as TypeOrmLogger, QueryRunner} from "typeorm";
import {Inject, Injectable, Logger} from "@typeix/resty";
import * as chalk from "chalk";
const highlight = require('cli-highlight').highlight

@Injectable()
export class PgLoggerConfig implements TypeOrmLogger {
  @Inject() logger: Logger;

  protected getRunnerInfo(queryRunner?: QueryRunner) {
    return queryRunner && queryRunner.data["request"] ? "(" + queryRunner.data["request"].url + ") " : "";
  }

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
    const info = this.getRunnerInfo(queryRunner);
    if (level === "warn") {
      this.logger.warn(info  + message);
    } else {
      this.logger.info(info + message);
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    const info = this.getRunnerInfo(queryRunner);
    this.logger.info(info + "Migration: " + chalk.white(highlight(message, {language: 'sql', ignoreIllegals: true})));
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const info = this.getRunnerInfo(queryRunner);
    this.logger.info(info + "Query: " + chalk.white(highlight(query, {language: 'sql', ignoreIllegals: true})));
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const info = this.getRunnerInfo(queryRunner);
    this.logger.error(info + "Query: " + chalk.white(highlight(query, {language: 'sql', ignoreIllegals: true})));
    this.logger.error(error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const info = this.getRunnerInfo(queryRunner);
    this.logger.warn(info + "Slow Query: " + chalk.white(highlight(query, {language: 'sql', ignoreIllegals: true})));
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    const info = this.getRunnerInfo(queryRunner);
    this.logger.warn(info + "Schema Build: " + chalk.white(highlight(message, {language: 'sql', ignoreIllegals: true})));
  }

}
