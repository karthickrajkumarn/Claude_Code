import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

// Define and validate environment variables
const envSchema = z.object({
  GITHUB_PAT: z.string().min(1, "GitHub PAT is required"),
  GITHUB_BASE_URL: z.string().url().default("https://api.github.com"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "silent"]).default("info"),
  REQUEST_TIMEOUT: z.string().transform(Number).default("30000"),
  DEBUG: z.enum(["true", "false"]).transform((val) => val === "true").default("false"),
});

export const config = envSchema.parse({
  GITHUB_PAT: process.env.GITHUB_PAT,
  GITHUB_BASE_URL: process.env.GITHUB_BASE_URL,
  LOG_LEVEL: process.env.LOG_LEVEL,
  REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT,
  DEBUG: process.env.DEBUG,
});

export type Config = z.infer<typeof envSchema>;
