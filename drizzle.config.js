import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:G24fuHXnCUKF@ep-tight-wave-a5n60ohf-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require'
  }
});
