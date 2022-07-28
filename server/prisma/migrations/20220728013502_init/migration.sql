-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "FoodSupply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "SuppliedFood" (
    "foodSupplyId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,

    PRIMARY KEY ("foodSupplyId", "foodId"),
    CONSTRAINT "SuppliedFood_foodSupplyId_fkey" FOREIGN KEY ("foodSupplyId") REFERENCES "FoodSupply" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SuppliedFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
