/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `FeatureFlags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlags_name_key" ON "FeatureFlags"("name");
