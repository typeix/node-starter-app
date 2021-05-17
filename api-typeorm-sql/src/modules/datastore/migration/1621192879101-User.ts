import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1621192879101 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true
        },
        {
          name: "firstName",
          type: "varchar",
        },
        {
          name: "lastName",
          type: "varchar",
        },
        {
          name: "age",
          type: "int",
        }
      ]
    }));
    await queryRunner.query(`
      INSERT INTO "user" (id, "firstName", "lastName", age)
      VALUES (1, 'Igor', 'Surname', 100),
             (2, 'Igor', 'Surname', 100);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }

}
