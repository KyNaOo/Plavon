import { MigrationInterface, QueryRunner } from "typeorm";

export class GroupMessagePlavon1721769210021 implements MigrationInterface {
    name = 'GroupMessagePlavon1721769210021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`timestamp\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`group_id\` varchar(36) NULL, \`author_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plavon\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(256) NOT NULL, \`description\` text NOT NULL, \`startTime\` datetime NOT NULL, \`endTime\` datetime NOT NULL, \`group_id\` varchar(36) NULL, \`author_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`creatorId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8a45300fd825918f3b40195fbd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_members\` (\`group_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_2c840df5db52dc6b4a1b0b69c6\` (\`group_id\`), INDEX \`IDX_20a555b299f75843aa53ff8b0e\` (\`user_id\`), PRIMARY KEY (\`group_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_groups\` (\`user_id\` varchar(36) NOT NULL, \`group_id\` varchar(36) NOT NULL, INDEX \`IDX_95bf94c61795df25a515435010\` (\`user_id\`), INDEX \`IDX_4c5f2c23c34f3921fbad2cd394\` (\`group_id\`), PRIMARY KEY (\`user_id\`, \`group_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_840551c7b5a3b5eda2e9b099ef4\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_27675d1d5b9dbaabc0546aeb0a1\` FOREIGN KEY (\`author_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plavon\` ADD CONSTRAINT \`FK_dee3416378cd346ef94ac0036f2\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`plavon\` ADD CONSTRAINT \`FK_8139aab09e7dbc2ec3de0e19512\` FOREIGN KEY (\`author_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_2c840df5db52dc6b4a1b0b69c6e\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_20a555b299f75843aa53ff8b0ee\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_95bf94c61795df25a5154350102\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_4c5f2c23c34f3921fbad2cd3940\` FOREIGN KEY (\`group_id\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_4c5f2c23c34f3921fbad2cd3940\``);
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_95bf94c61795df25a5154350102\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_20a555b299f75843aa53ff8b0ee\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_2c840df5db52dc6b4a1b0b69c6e\``);
        await queryRunner.query(`ALTER TABLE \`plavon\` DROP FOREIGN KEY \`FK_8139aab09e7dbc2ec3de0e19512\``);
        await queryRunner.query(`ALTER TABLE \`plavon\` DROP FOREIGN KEY \`FK_dee3416378cd346ef94ac0036f2\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_27675d1d5b9dbaabc0546aeb0a1\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_840551c7b5a3b5eda2e9b099ef4\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c5f2c23c34f3921fbad2cd394\` ON \`user_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_95bf94c61795df25a515435010\` ON \`user_groups\``);
        await queryRunner.query(`DROP TABLE \`user_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_20a555b299f75843aa53ff8b0e\` ON \`group_members\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c840df5db52dc6b4a1b0b69c6\` ON \`group_members\``);
        await queryRunner.query(`DROP TABLE \`group_members\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a45300fd825918f3b40195fbd\` ON \`group\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP TABLE \`plavon\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
