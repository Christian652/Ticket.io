import {MigrationInterface, QueryRunner} from "typeorm";

export class all_1648084085134 implements MigrationInterface {
    name = 'all_1648084085134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `events` CHANGE `description` `description` longtext NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `events` CHANGE `description` `description` longtext NOT NULL");
    }

}
