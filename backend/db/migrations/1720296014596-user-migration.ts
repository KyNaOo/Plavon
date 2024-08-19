import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1720296014596 implements MigrationInterface {
  name = 'UserMigration1720296014596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(256) NOT NULL, \`lastName\` varchar(256) NOT NULL, \`email\` varchar(64) NOT NULL, \`password\` varchar(64) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
