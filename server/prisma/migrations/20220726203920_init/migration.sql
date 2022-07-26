-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "FoodRestocking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "RestockedFood" (
    "foodRestockingId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,

    PRIMARY KEY ("foodRestockingId", "foodId"),
    CONSTRAINT "RestockedFood_foodRestockingId_fkey" FOREIGN KEY ("foodRestockingId") REFERENCES "FoodRestocking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RestockedFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");
