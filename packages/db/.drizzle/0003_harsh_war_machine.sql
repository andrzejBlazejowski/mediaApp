CREATE TABLE `media-app_privilage` (
	`id` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`media` int NOT NULL,
	`branding` int NOT NULL,
	`cast` int NOT NULL,
	`screens` int NOT NULL,
	`dictionary` int NOT NULL,
	`menu` int NOT NULL,
	`purcchase` int NOT NULL,
	CONSTRAINT `media-app_privilage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `media-app_privilage` (`userId`);