ALTER TABLE `screens` RENAME COLUMN `screenContentId` TO `articleScreenId`;--> statement-breakpoint
ALTER TABLE `screens` ADD `vodScreenId` int;