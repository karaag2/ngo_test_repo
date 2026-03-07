/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_adminId_key" ON "RefreshToken"("adminId");
