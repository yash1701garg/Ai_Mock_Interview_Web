import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MOCKINTERVIEW = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPositon: varchar('jobPosition', { length: 255 }).notNull(), // Add length
    jobDesc: varchar('jobDesc', { length: 255 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 50 }).notNull(),
    createdBy: varchar('createBy', { length: 100 }).notNull(),
    createdAt: varchar('createdAt', { length: 50 }).notNull(),
    mockId: varchar('mockId', { length: 50 }).notNull(),
});

export const UserAnswer = pgTable('userAnswer',{
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId', { length: 50 }).notNull(),
    question:varchar('question',{length:255}).notNull(),
    correctAnswer:text('correctAnswer').notNull(),
    userAns:text('userAns').notNull(),
    feedback:text('feedback').notNull(),
    rating:varchar('rating',{length:255}).notNull(),
    userEmail:varchar('userEmail',{length:255}).notNull(),
    createdAt: varchar('createdAt', { length: 50 }).notNull(),
});