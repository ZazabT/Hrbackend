CREATE TABLE `candidates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_listing_id` int NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20),
	`address` varchar(255),
	`cover_letter` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `candidates_id` PRIMARY KEY(`id`),
	CONSTRAINT `candidates_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `jobListingCandidates` (
	`job_listing_id` int NOT NULL,
	`candidate_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `jobListingCandidates_job_listing_id_candidate_id_pk` PRIMARY KEY(`job_listing_id`,`candidate_id`)
);
--> statement-breakpoint
CREATE TABLE `jobListings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_position_id` int NOT NULL,
	`job_title` varchar(255) NOT NULL,
	`job_requirements` text NOT NULL,
	`posted_date` date NOT NULL,
	`deadline_date` date NOT NULL,
	`status` enum('open','closed') DEFAULT 'open',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `jobListings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaves` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`leave_type` enum('sick','vacation','personal','other') NOT NULL,
	`reason` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leaves_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `employees` ADD `job_position_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `candidates` ADD CONSTRAINT `candidates_job_listing_id_jobListings_id_fk` FOREIGN KEY (`job_listing_id`) REFERENCES `jobListings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobListingCandidates` ADD CONSTRAINT `jobListingCandidates_job_listing_id_jobListings_id_fk` FOREIGN KEY (`job_listing_id`) REFERENCES `jobListings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobListingCandidates` ADD CONSTRAINT `jobListingCandidates_candidate_id_candidates_id_fk` FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobListings` ADD CONSTRAINT `jobListings_job_position_id_job_positions_id_fk` FOREIGN KEY (`job_position_id`) REFERENCES `job_positions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leaves` ADD CONSTRAINT `leaves_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_job_position_id_job_positions_id_fk` FOREIGN KEY (`job_position_id`) REFERENCES `job_positions`(`id`) ON DELETE cascade ON UPDATE no action;