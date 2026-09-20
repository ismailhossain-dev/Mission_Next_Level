/*
  Warnings:

  - You are about to drop the column `createAt` on the `subscriptions` table. All the data in the column will be lost.
  - The `status` column on the `subscriptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeSubscriptionId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "subscriptionStatus";

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");
