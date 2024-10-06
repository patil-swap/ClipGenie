/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:NyD1QOMle2ES@ep-bitter-field-a50d57j6.us-east-2.aws.neon.tech/ai-shorts?sslmode=require"
  }
};
