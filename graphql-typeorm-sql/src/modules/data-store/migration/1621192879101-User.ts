import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1621192879101 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "int",
          isGenerated: true,
          generationStrategy: "increment",
          isPrimary: true
        },
        {
          name: "firstName",
          type: "varchar"
        },
        {
          name: "lastName",
          type: "varchar"
        },
        {
          name: "age",
          type: "int"
        }
      ]
    }));
    await queryRunner.query(`
      INSERT INTO "user" ("firstName", "lastName", age)
      VALUES ('Igor', 'Surname', 100),
             ('Igor', 'Surname', 100);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }

}
