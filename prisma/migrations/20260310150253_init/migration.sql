-- CreateEnum
CREATE TYPE "LetterStatus" AS ENUM ('PENDING_VERIFY', 'SCHEDULED', 'SENT', 'CANCELLED', 'FAILED');

-- CreateTable
CREATE TABLE "Letter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "design" JSONB NOT NULL,
    "status" "LetterStatus" NOT NULL DEFAULT 'PENDING_VERIFY',
    "verifyToken" TEXT,
    "cancelToken" TEXT,
    "viewToken" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Letter_verifyToken_key" ON "Letter"("verifyToken");

-- CreateIndex
CREATE UNIQUE INDEX "Letter_cancelToken_key" ON "Letter"("cancelToken");

-- CreateIndex
CREATE UNIQUE INDEX "Letter_viewToken_key" ON "Letter"("viewToken");

-- CreateIndex
CREATE INDEX "Letter_deliveryDate_idx" ON "Letter"("deliveryDate");

-- CreateIndex
CREATE INDEX "Letter_status_deliveryDate_idx" ON "Letter"("status", "deliveryDate");
