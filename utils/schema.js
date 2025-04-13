import { pgTable, text, integer } from 'drizzle-orm/pg-core';

// Define the MockInterview table schema
export const MockInterview = pgTable('mock_interview', {
    mockId: text('mock_id').primaryKey(),
    // Make sure this matches EXACTLY what's in your database
    jsonMockResp: text('json_mock_resp'), // This maps the JS property to DB column
    jobpPosition: text('jobp_position'),
    jobpDesc: text('jobp_desc'),
    jobpExperience: integer('jobp_experience'),
    createdBy: text('created_by'),
    createdAt: text('created_at'),
});