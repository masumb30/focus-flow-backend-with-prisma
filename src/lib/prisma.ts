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


const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };