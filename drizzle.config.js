import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema:"./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
    url: "postgresql://neondb_owner:npg_X4QhswDe9lPH@ep-raspy-darkness-a11gu7ph-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
})