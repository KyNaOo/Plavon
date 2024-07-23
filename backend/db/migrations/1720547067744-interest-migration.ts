import { MigrationInterface, QueryRunner } from 'typeorm';

export class InterestMigration1720547067744 implements MigrationInterface {
  name = 'InterestMigration1720547067744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`interest\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_interest\` (\`user_id\` varchar(36) NOT NULL, \`interest_id\` varchar(36) NOT NULL, INDEX \`IDX_f28696ef036bbcf2da3dad24b4\` (\`user_id\`), INDEX \`IDX_9725646cb2c0e9c6e14fa9ea05\` (\`interest_id\`), PRIMARY KEY (\`user_id\`, \`interest_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`bio\` varchar(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_interest\` ADD CONSTRAINT \`FK_f28696ef036bbcf2da3dad24b4f\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_interest\` ADD CONSTRAINT \`FK_9725646cb2c0e9c6e14fa9ea052\` FOREIGN KEY (\`interest_id\`) REFERENCES \`interest\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_interest\` DROP FOREIGN KEY \`FK_9725646cb2c0e9c6e14fa9ea052\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_interest\` DROP FOREIGN KEY \`FK_f28696ef036bbcf2da3dad24b4f\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`bio\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9725646cb2c0e9c6e14fa9ea05\` ON \`user_interest\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f28696ef036bbcf2da3dad24b4\` ON \`user_interest\``,
    );
    await queryRunner.query(`DROP TABLE \`user_interest\``);
    await queryRunner.query(`DROP TABLE \`interest\``);
  }
}
