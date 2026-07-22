-- AlterTable
ALTER TABLE "User" ADD COLUMN     "target" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
