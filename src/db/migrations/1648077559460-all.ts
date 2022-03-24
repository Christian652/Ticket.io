import {MigrationInterface, QueryRunner} from "typeorm";

export class all1648077559460 implements MigrationInterface {
    name = 'all1648077559460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `events` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `thumb` varchar(255) NOT NULL, `description` longtext NOT NULL, `ticket_limit` int NOT NULL, `ticket_price` decimal(5,2) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `start_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `end_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `role` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `events`");
    }

}
