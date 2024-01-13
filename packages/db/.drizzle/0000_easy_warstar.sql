CREATE TABLE `articleScreenImages` (
	`articleScreenId` int,
	`imageId` int,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `articleScreenImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `articleScreens` (
	`title` varchar(255) NOT NULL,
	`content` varchar(5000) NOT NULL,
	`articleScreenImageId` int,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `articleScreens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `media-app_account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `media-app_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `media-app_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `media-app_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `media-app_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `media-app_verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `brandingColorTypes` (
	`key` varchar(255) NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `brandingColorTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brandingColors` (
	`value` varchar(255),
	`brandingId` int,
	`brandingColorTypeId` int,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `brandingColors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brandingImageTypes` (
	`key` varchar(255) NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `brandingImageTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brandingImages` (
	`brandingImageTypeId` int,
	`brandingId` int,
	`imageId` int,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `brandingImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brandings` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `brandings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `castMemberImages` (
	`castMemberId` int NOT NULL,
	`imageId` int NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `castMemberImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_castMembers` (
	`peopleId` int,
	`countryId` int,
	`castRoleId` int,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `media-app_castMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `castRoles` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `castRoles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaCastMembers` (
	`mediaId` int NOT NULL,
	`castMemberId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `mediaCastMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_people` (
	`firstName` varchar(255) NOT NULL,
	`middleName` varchar(255),
	`lastName` varchar(255) NOT NULL,
	`birthDate` varchar(255),
	`deathDate` varchar(255),
	`sex` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `media-app_people_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `backOfficeDictionaries` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `backOfficeDictionaries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clientAppDictionaries` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `clientAppDictionaries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `countries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `genres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_images` (
	`url` varchar(255) NOT NULL,
	`alt` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`name` varchar(255),
	`description` varchar(255),
	CONSTRAINT `media-app_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoiceTemplates` (
	`content` varchar(255) NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `invoiceTemplates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoiceTypes` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `invoiceTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`invoiceTypeId` int NOT NULL,
	`mediaId` int NOT NULL,
	`userId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `invoices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_mediaCategories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`name` varchar(255),
	`description` varchar(255),
	CONSTRAINT `media-app_mediaCategories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_mediaImageTypes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`name` varchar(255),
	`description` varchar(255),
	CONSTRAINT `media-app_mediaImageTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_mediaImages` (
	`mediaId` int NOT NULL,
	`mediaImageTypeId` int NOT NULL,
	`imageId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`name` varchar(255),
	`description` varchar(255),
	CONSTRAINT `media-app_mediaImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_mediaViewImpressions` (
	`progress` int NOT NULL,
	`mediaId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `media-app_mediaViewImpressions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_media` (
	`name` varchar(255) NOT NULL,
	`shortDescription` varchar(500) NOT NULL,
	`longDescription` varchar(2500),
	`type` varchar(255) NOT NULL,
	`isFree` boolean NOT NULL DEFAULT true,
	`mediaCategoryId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `media-app_media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_videoContentTypes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	`name` varchar(255),
	`description` varchar(255),
	CONSTRAINT `media-app_videoContentTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_videoContents` (
	`videoId` int NOT NULL,
	`videoContentTypeId` int NOT NULL,
	`mediaId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `media-app_videoContents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaListMedias` (
	`mediaId` int NOT NULL,
	`mediaListId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `mediaListMedias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaListTypes` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `mediaListTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaLists` (
	`mediaListTypeId` int NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `mediaLists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuLinkImages` (
	`menuLinkId` int NOT NULL,
	`imageId` int NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `menuLinkImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuLinks` (
	`menuLinkImageId` int NOT NULL,
	`destinationScreenId` int NOT NULL,
	`menuId` int NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `menuLinks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuTypes` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `menuTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`platformId` int NOT NULL,
	`menuTypeId` int NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `menus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menuPlatforms` (
	`menuId` int NOT NULL,
	`platformId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `menuPlatforms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platforms` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `platforms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media-app_post` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`content` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media-app_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchaseItems` (
	`purchaseId` int NOT NULL,
	`mediaId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `purchaseItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchaseTypes` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `purchaseTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`purchaseTypeId` int NOT NULL,
	`mediaId` int NOT NULL,
	`userId` int NOT NULL,
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `purchases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `screenTypes` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `screenTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `screens` (
	`screenTypeId` int NOT NULL,
	`screenContentId` int,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `screens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`url` varchar(255) NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vodScreenMediaLists` (
	`vodScreenId` int NOT NULL,
	`mediaListId` int NOT NULL,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `vodScreenMediaLists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vodScreenTypes` (
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `vodScreenTypes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vodScreens` (
	`vodScreenTypeId` int,
	`name` varchar(255),
	`description` varchar(255),
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`createdBy` varchar(255),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` varchar(255),
	`isDeleted` boolean NOT NULL DEFAULT false,
	CONSTRAINT `vodScreens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `id_idx` ON `articleScreenImages` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `articleScreens` (`id`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `media-app_account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `media-app_session` (`userId`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `brandingColorTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `brandingColors` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `brandingImageTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `brandingImages` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `brandings` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `castMemberImages` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_castMembers` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `castRoles` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `mediaCastMembers` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_people` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `backOfficeDictionaries` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `clientAppDictionaries` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `countries` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `genres` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_images` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `invoiceTemplates` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `invoiceTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `invoices` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_mediaCategories` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_mediaImageTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_mediaImages` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_mediaViewImpressions` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_media` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_videoContentTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `media-app_videoContents` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `mediaListMedias` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `mediaListTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `mediaLists` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `menuLinkImages` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `menuLinks` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `menuTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `menus` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `menuPlatforms` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `platforms` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `purchaseItems` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `purchaseTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `purchases` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `screenTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `screens` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `videos` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `vodScreenMediaLists` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `vodScreenTypes` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `vodScreens` (`id`);