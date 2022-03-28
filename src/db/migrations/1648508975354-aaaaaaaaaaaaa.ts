import {MigrationInterface, QueryRunner} from "typeorm";

export class aaaaaaaaaaaaa1648508975354 implements MigrationInterface {
    name = 'aaaaaaaaaaaaa1648508975354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `ticket_sales` (`id` int NOT NULL AUTO_INCREMENT, `selled_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `payed_back_at` timestamp NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, `eventId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `role` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `pix_key` varchar(255) NULL, `pix_key_type` varchar(100) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `companyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `companies` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `cnpj` varchar(20) NOT NULL, `owner_name` varchar(255) NOT NULL, `pix_key` varchar(255) NOT NULL, `pix_key_type` varchar(100) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pix_transactions` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `eventId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `places` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `cep` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `events` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `thumb` varchar(255) NOT NULL, `description` longtext NULL, `ticket_limit` int NOT NULL, `ticket_price` decimal(5,2) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `start_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `end_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `companyId` int NULL, `placeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categories` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `events_categories_categories` (`eventsId` int NOT NULL, `categoriesId` int NOT NULL, INDEX `IDX_8ec1afd5bf48b617b478e86ea6` (`eventsId`), INDEX `IDX_91500cdda8bef78e27a5fc795f` (`categoriesId`), PRIMARY KEY (`eventsId`, `categoriesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ticket_sales` ADD CONSTRAINT `FK_a1da69fa88eb8b98b8ca34afb31` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ticket_sales` ADD CONSTRAINT `FK_c4de18ba1371b878a9c710ff0a4` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_6f9395c9037632a31107c8a9e58` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pix_transactions` ADD CONSTRAINT `FK_4c790178920955b592a461a2b65` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `events` ADD CONSTRAINT `FK_b42eb62a0da91cc26d953db93cd` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `events` ADD CONSTRAINT `FK_359b48411878a60ae7df2d5f25e` FOREIGN KEY (`placeId`) REFERENCES `places`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `events_categories_categories` ADD CONSTRAINT `FK_8ec1afd5bf48b617b478e86ea60` FOREIGN KEY (`eventsId`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `events_categories_categories` ADD CONSTRAINT `FK_91500cdda8bef78e27a5fc795f8` FOREIGN KEY (`categoriesId`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `events_categories_categories` DROP FOREIGN KEY `FK_91500cdda8bef78e27a5fc795f8`");
        await queryRunner.query("ALTER TABLE `events_categories_categories` DROP FOREIGN KEY `FK_8ec1afd5bf48b617b478e86ea60`");
        await queryRunner.query("ALTER TABLE `events` DROP FOREIGN KEY `FK_359b48411878a60ae7df2d5f25e`");
        await queryRunner.query("ALTER TABLE `events` DROP FOREIGN KEY `FK_b42eb62a0da91cc26d953db93cd`");
        await queryRunner.query("ALTER TABLE `pix_transactions` DROP FOREIGN KEY `FK_4c790178920955b592a461a2b65`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_6f9395c9037632a31107c8a9e58`");
        await queryRunner.query("ALTER TABLE `ticket_sales` DROP FOREIGN KEY `FK_c4de18ba1371b878a9c710ff0a4`");
        await queryRunner.query("ALTER TABLE `ticket_sales` DROP FOREIGN KEY `FK_a1da69fa88eb8b98b8ca34afb31`");
        await queryRunner.query("DROP INDEX `IDX_91500cdda8bef78e27a5fc795f` ON `events_categories_categories`");
        await queryRunner.query("DROP INDEX `IDX_8ec1afd5bf48b617b478e86ea6` ON `events_categories_categories`");
        await queryRunner.query("DROP TABLE `events_categories_categories`");
        await queryRunner.query("DROP TABLE `categories`");
        await queryRunner.query("DROP TABLE `events`");
        await queryRunner.query("DROP TABLE `places`");
        await queryRunner.query("DROP TABLE `pix_transactions`");
        await queryRunner.query("DROP TABLE `companies`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `ticket_sales`");
    }

}
