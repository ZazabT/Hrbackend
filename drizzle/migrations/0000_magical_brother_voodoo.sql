CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`job_description` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `departments_id` PRIMARY KEY(`id`),
	CONSTRAINT `departments_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20),
	`address` varchar(255),
	`birth_date` date,
	`hire_date` date NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `job_positions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_title` varchar(255) NOT NULL,
	`job_description` text NOT NULL,
	`min_salary` decimal(10,2) NOT NULL,
	`max_salary` decimal(10,2) NOT NULL,
	`department_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `job_positions_id` PRIMARY KEY(`id`),
	CONSTRAINT `job_positions_job_title_unique` UNIQUE(`job_title`)
);
--> statement-breakpoint
CREATE TABLE `salaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employee_id` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`date` date NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `salaries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `job_positions` ADD CONSTRAINT `job_positions_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `salaries` ADD CONSTRAINT `salaries_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE cascade ON UPDATE no action;