ALTER TABLE `candidates` ADD `application_date` date NOT NULL;--> statement-breakpoint
ALTER TABLE `candidates` ADD `status` enum('applied','interviewing','offer','rejected') DEFAULT 'applied';