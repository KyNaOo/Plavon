import { MigrationInterface, QueryRunner } from "typeorm";

export class Friendship1724662198983 implements MigrationInterface {
    name = 'Friendship1724662198983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`recipient\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, \`metadata\` varchar(255) NULL, \`read\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`friendships\` (\`userId\` varchar(36) NOT NULL, \`friendId\` varchar(36) NOT NULL, INDEX \`IDX_721d9e1784e4eb781d7666fa7a\` (\`userId\`), INDEX \`IDX_d54199dd09cec12dda4c4a05cd\` (\`friendId\`), PRIMARY KEY (\`userId\`, \`friendId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plavon\` DROP COLUMN \`color\``);
        await queryRunner.query(`ALTER TABLE \`friendships\` ADD CONSTRAINT \`FK_721d9e1784e4eb781d7666fa7ab\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`friendships\` ADD CONSTRAINT \`FK_d54199dd09cec12dda4c4a05cd7\` FOREIGN KEY (\`friendId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`friendships\` DROP FOREIGN KEY \`FK_d54199dd09cec12dda4c4a05cd7\``);
        await queryRunner.query(`ALTER TABLE \`friendships\` DROP FOREIGN KEY \`FK_721d9e1784e4eb781d7666fa7ab\``);
        await queryRunner.query(`ALTER TABLE \`plavon\` ADD \`color\` varchar(7) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_d54199dd09cec12dda4c4a05cd\` ON \`friendships\``);
        await queryRunner.query(`DROP INDEX \`IDX_721d9e1784e4eb781d7666fa7a\` ON \`friendships\``);
        await queryRunner.query(`DROP TABLE \`friendships\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
    }

}
