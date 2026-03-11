/**
 * Environment configuration with validation
 */

import * as dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Configuration schema
const configSchema = z.object({
  // Weather API
  WEATHER_API_KEY: z.string().min(1, "WEATHER_API_KEY is required"),
  WEATHER_API_BASE_URL: z.string().url().default("https://api.openweathermap.org/data/2.5"),
  DEFAULT_UNITS: z.enum(["metric", "imperial", "kelvin"]).default("metric"),
  DEFAULT_LANGUAGE: z.string().default("en"),

  // Server configuration
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "silent"]).default("info"),
  REQUEST_TIMEOUT: z.string().transform(Number).default("30000"),
  DEBUG: z.string().transform((val) => val === "true").default("false"),
});

// Validate and export configuration
export const config = configSchema.parse(process.env);

// Configuration type
export type Config = z.infer<typeof configSchema>;
