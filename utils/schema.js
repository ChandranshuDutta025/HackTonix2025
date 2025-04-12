import { varchar, text, serial } from "drizzle-orm/pg-core"; // Correct imports
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mock_interview', {
    id: serial('id').primaryKey(), // Fixed usage of serial
    jsonMockResp: text('jsonMockResp').notNull(),
    jobpPosition: varchar('jobpPosition').notNull(),
    jobpDesc: varchar('jobpDesc').notNull(),
    jobpExperience: varchar('jobpExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull(),
});