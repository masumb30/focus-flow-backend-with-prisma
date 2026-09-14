/*
  Warnings:

  - You are about to drop the column `parent_id` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_parent_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "parent_id",
ADD COLUMN     "assigned_to" TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
