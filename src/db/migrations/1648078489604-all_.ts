import {MigrationInterface, QueryRunner} from "typeorm";

export class all_1648078489604 implements MigrationInterface {
    name = 'all_1648078489604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `users` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `users` ADD `id` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD PRIMARY KEY (`id`)");
    }

}