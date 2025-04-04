import { relations } from 'drizzle-orm';
import { date, mysqlTable, varchar , int , decimal , text , timestamp , mysqlEnum ,primaryKey } from 'drizzle-orm/mysql-core';



// User table
export const users = mysqlTable('users' , {
    id:int('id').primaryKey().autoincrement(),
    name:varchar('name' , {length: 255}).notNull(),
    email:varchar('email' , {length : 50}).notNull().unique(),
    password:varchar('password' , {length : 255}).notNull(),
});

// Departments table
export const departments = mysqlTable('departments', {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', {length: 255}).notNull().unique(),
    departmentDescription: text('job_description').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// JobPositions table
export const jobPositions = mysqlTable('job_positions', {
    id: int('id').primaryKey().autoincrement(),
    jobTitle: varchar('job_title', {length: 255}).notNull().unique(),
    jobDescription: text('job_description').notNull(),
    minSalary: decimal('min_salary', {precision: 10, scale: 2}).notNull(),
    maxSalary: decimal('max_salary', {precision: 10, scale: 2}).notNull(),
    departmentId: int('department_id').references(() => departments.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
}); 

// Employees table
export const employees = mysqlTable('employees', {
    id: int('id').primaryKey().autoincrement(),
    firstName: varchar('first_name', {length: 255}).notNull(),
    lastName: varchar('last_name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    phone: varchar('phone', {length: 20}),
    address: varchar('address', {length: 255}),
    birthDate: date('birth_date'),
    hireDate: date('hire_date').notNull(),
    jobPositionId: int('job_position_id').references(() => jobPositions.id, {onDelete: 'cascade'}).notNull(),  // $$$$$$
    createdAt: timestamp('created_at').defaultNow(),
});

// Salaries table
export const salaries = mysqlTable('salaries', {
    id: int('id').primaryKey().autoincrement(),
    employeeId: int('employee_id').references(() => employees.id, {onDelete: 'cascade'}).notNull(),
    amount: decimal('amount', {precision: 10, scale: 2}).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// Leaves table
export const leaves = mysqlTable('leaves', {
    id: int('id').primaryKey().autoincrement(),
    employeeId: int('employee_id').references(() => employees.id, {onDelete: 'cascade'}).notNull(),
    startDate: date('start_date').notNull(),
    endDate: date('end_date').notNull(),
    leaveType: mysqlEnum('leave_type', ['sick', 'vacation', 'personal', 'other']).notNull(),
    reason: text('reason').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// jobListing table
export const jobListings = mysqlTable('jobListings', {
    id: int('id').primaryKey().autoincrement(),
    jobPositionId: int('job_position_id').references(() => jobPositions.id, {onDelete: 'cascade'}).notNull(),
    jobTitle: varchar('job_title', {length: 255}).notNull(),
    jobRequirements: text('job_requirements').notNull(),
    postedDate: date('posted_date').notNull(),
    deadlineDate: date('deadline_date').notNull(),
    status: mysqlEnum('status', ['open', 'closed']).default('open'),
    createdAt: timestamp('created_at').defaultNow(),
});

// candidates table
export const candidates = mysqlTable('candidates', {
    id: int('id').primaryKey().autoincrement(),
    jobListingId: int('job_listing_id').references(() => jobListings.id, {onDelete: 'cascade'}).notNull(),
    firstName: varchar('first_name', {length: 255}).notNull(),
    lastName: varchar('last_name', {length: 255}).notNull(),
    email: varchar('email', {length: 255}).notNull().unique(),
    phone: varchar('phone', {length: 20}),
    address: varchar('address', {length: 255}),
    coverLetter: text('cover_letter').notNull(),
    applicationDate : date('application_date').notNull(),
    status : mysqlEnum('status', ['applied', 'interviewing', 'offer', 'rejected']).default('applied'),
    createdAt: timestamp('created_at').defaultNow(),
});

// jobListingCandidates table
export const jobListingCandidates = mysqlTable('jobListingCandidates', {
    jobListingId: int('job_listing_id').references(() => jobListings.id, {onDelete: 'cascade'}).notNull(),
    candidateId: int('candidate_id').references(() => candidates.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
}, (pk) => ({
    pk: primaryKey(pk.jobListingId, pk.candidateId),
}));


                                                    // RELATIONSHIPS

// Relationship between Departments and JobPositions: One-to-Many
// - One department can have many job positions.
// - Each job position belongs to one department.
export const departmentRelation = relations(departments, ({ many }) => ({
    jobPositions: many(jobPositions),
}));

// Relationship between JobPositions and Departments: Many-to-One
// Relationship between JobPositions and Employees: One-to-Many
// - Each job position belongs to one department.
// - One job position can have many employees.
// - Each employee belongs to one job position.
export const jobPositionRelation = relations(jobPositions, ({ one, many }) => ({
    department: one(departments, {
        fields: [jobPositions.departmentId],
        references: [departments.id],
    }),
    employees: many(employees),
}));

// Relationship between Employees and Salaries: One-to-Many
// Relationship between Employees and Leaves: One-to-Many
// Relationship between Employees and JobPositions: Many-to-One
// - One employee can have many salaries (e.g., pay history).
// - One employee can have many leaves (e.g., vacation records).
// - Each employee belongs to one job position.
export const employeeRelation = relations(employees, ({ one, many }) => ({
    salaries: many(salaries),
    leaves: many(leaves),
    jobPosition: one(jobPositions, {
        fields: [employees.jobPositionId], 
        references: [jobPositions.id],
    }),
}));

// Relationship between Salaries and Employees: Many-to-One
// - Each salary record belongs to one employee.
export const salaryRelation = relations(salaries, ({ one }) => ({
    employee: one(employees, {
        fields: [salaries.employeeId],
        references: [employees.id],
    }),
}));

// Relationship between Leaves and Employees: Many-to-One
// - Each leave record belongs to one employee.
export const leaveRelation = relations(leaves, ({ one }) => ({
    employee: one(employees, {
        fields: [leaves.employeeId],
        references: [employees.id],
    }),
}));

// Relationship between JobListings and JobListingCandidates: One-to-Many
// - One job listing can have many applications (via jobListingCandidates).
// - Each application is tied to one job listing.
export const jobListingRelation = relations(jobListings, ({ many }) => ({
    applications: many(jobListingCandidates),
}));

// Relationship between Candidates and JobListingCandidates: One-to-Many
// - One candidate can have many applications (via jobListingCandidates).
// - Each application is tied to one candidate.
export const candidateRelation = relations(candidates, ({ many }) => ({
    applications: many(jobListingCandidates),
}));

// Relationship between JobListingCandidates and JobListings: Many-to-One
// Relationship between JobListingCandidates and Candidates: Many-to-One
// - Each application (jobListingCandidate) links one job listing to one candidate.
// - This forms a many-to-many relationship between JobListings and Candidates via this junction table.
export const jobListingCandidateRelation = relations(jobListingCandidates, ({ one }) => ({
    jobListing: one(jobListings, {
        fields: [jobListingCandidates.jobListingId],
        references: [jobListings.id],
    }),
    candidate: one(candidates, {
        fields: [jobListingCandidates.candidateId],
        references: [candidates.id],
    }),
}));

