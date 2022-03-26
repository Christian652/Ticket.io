import {MigrationInterface, QueryRunner} from "typeorm";

export class aaaaaaaaaaaa1648261756418 implements MigrationInterface {
    name = 'aaaaaaaaaaaa1648261756418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `places` ADD `state` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `places` DROP COLUMN `state`");
    }

}
