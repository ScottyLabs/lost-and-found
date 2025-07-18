-- CreateEnum
CREATE TYPE "Location" AS ENUM ('AN', 'BH', 'BK', 'CUC', 'CIC', 'CFA', 'DH', 'GHC', 'HOA', 'HBH', 'HH', 'HL', 'III', 'MM', 'MI', 'NSH', 'PH', 'POS', 'PCA', 'TEP', 'OTHER');

-- CreateEnum
CREATE TYPE "RetrieveLocation" AS ENUM ('CUC', 'GHC');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BEVERAGE_CONTAINER', 'CORDS_CHARGER', 'CLOTHING_ACCESSORIES', 'EARBUDS_HEADPHONES_CASES', 'GLASSES_CASES', 'JEWELRY_WATCHES', 'KEYS', 'ELECTRONICS', 'BAGS_BACKPACKS', 'CARDS_WALLETS', 'UMBRELLA', 'OTHER');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK', 'BLUE', 'BROWN', 'GREEN', 'GREY', 'MULTICOLOR', 'METALLIC', 'ORANGE', 'PURPLE', 'RED', 'WHITE', 'YELLOW', 'OTHER');

-- CreateEnum
CREATE TYPE "ItemInteraction" AS ENUM ('CREATE', 'APPROVE', 'UNAPPROVE', 'ARCHIVE', 'UNARCHIVE', 'EDIT', 'DELETE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "Value" AS ENUM ('GENERAL', 'HIGH');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "foundDate" TIMESTAMP(3) NOT NULL,
    "foundLocation" "Location" NOT NULL,
    "foundDescription" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "categories" "Category"[],
    "color" "Color" NOT NULL,
    "value" "Value" NOT NULL,
    "identifiable" BOOLEAN NOT NULL,
    "retrieveLocation" "RetrieveLocation" NOT NULL,
    "itemLocation" TEXT NOT NULL,
    "longDescription" TEXT,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "interaction" "ItemInteraction" NOT NULL,
    "actorId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "permission" "Permission" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_category_key" ON "Subscription"("userId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
