import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlavonSecond1721926762812 implements MigrationInterface {
  name = 'PlavonSecond1721926762812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`plavon_participants\` (\`plavon_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_7a5d6d1c8af38647cd78e259e5\` (\`plavon_id\`), INDEX \`IDX_39d5590a02d7f526c569986baf\` (\`user_id\`), PRIMARY KEY (\`plavon_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`joined_plavons\` (\`user_id\` varchar(36) NOT NULL, \`plavon_id\` varchar(36) NOT NULL, INDEX \`IDX_2ac8e746c0dfc47ba81e4fd8a4\` (\`user_id\`), INDEX \`IDX_535bd634f63e027cfabeb6b02c\` (\`plavon_id\`), PRIMARY KEY (\`user_id\`, \`plavon_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`plavon\` ADD \`color\` varchar(7) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`plavon_participants\` ADD CONSTRAINT \`FK_7a5d6d1c8af38647cd78e259e51\` FOREIGN KEY (\`plavon_id\`) REFERENCES \`plavon\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`plavon_participants\` ADD CONSTRAINT \`FK_39d5590a02d7f526c569986bafa\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`joined_plavons\` ADD CONSTRAINT \`FK_2ac8e746c0dfc47ba81e4fd8a4b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`joined_plavons\` ADD CONSTRAINT \`FK_535bd634f63e027cfabeb6b02ce\` FOREIGN KEY (\`plavon_id\`) REFERENCES \`plavon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`joined_plavons\` DROP FOREIGN KEY \`FK_535bd634f63e027cfabeb6b02ce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`joined_plavons\` DROP FOREIGN KEY \`FK_2ac8e746c0dfc47ba81e4fd8a4b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`plavon_participants\` DROP FOREIGN KEY \`FK_39d5590a02d7f526c569986bafa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`plavon_participants\` DROP FOREIGN KEY \`FK_7a5d6d1c8af38647cd78e259e51\``,
    );
    await queryRunner.query(`ALTER TABLE \`plavon\` DROP COLUMN \`color\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_535bd634f63e027cfabeb6b02c\` ON \`joined_plavons\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_2ac8e746c0dfc47ba81e4fd8a4\` ON \`joined_plavons\``,
    );
    await queryRunner.query(`DROP TABLE \`joined_plavons\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_39d5590a02d7f526c569986baf\` ON \`plavon_participants\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7a5d6d1c8af38647cd78e259e5\` ON \`plavon_participants\``,
    );
    await queryRunner.query(`DROP TABLE \`plavon_participants\``);
  }
}
