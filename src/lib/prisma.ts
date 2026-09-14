import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client.js";



const isDevelopment = process.env.NODE_ENV === "development";

const connectionString = isDevelopment
  ? process.env.LOCAL_DATABASE_URL // Your local PostgreSQL connection string
  : process.env.DIRECT_URL;         // Your online connection string

if (!connectionString) {
  throw new Error(
    `Database connection string is missing for environment: ${process.env.NODE_ENV || "production"}`
  );
}

// below line almost never matter, prisma adapter will try to collect 'DATABASE_URL' from .env file even if you hardcode the string here. so that env variable needs to be changed for development vs production, even the conditional logic to pick the right connection for development vs production doesn't seem to be working as expected. 
const adapter = new PrismaPg({ connectionString });
// const adapter = new PrismaPg("postgresql://postgres:admin@localhost:5432/prismatest?schema=public");

const prisma = new PrismaClient({ adapter });

export { prisma };