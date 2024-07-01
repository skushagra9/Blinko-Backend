-- CreateEnum
CREATE TYPE "CasinoGamePlinkoRiskEnum" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasinoBet" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "payoutMultiplier" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payout" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "game" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stateId" TEXT,

    CONSTRAINT "CasinoBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "risk" "CasinoGamePlinkoRiskEnum" NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CasinoBet" ADD CONSTRAINT "CasinoBet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasinoBet" ADD CONSTRAINT "CasinoBet_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;
