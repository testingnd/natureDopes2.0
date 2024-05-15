-- CreateTable
CREATE TABLE "passResetToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "passResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passResetToken_token_key" ON "passResetToken"("token");

-- AddForeignKey
ALTER TABLE "passResetToken" ADD CONSTRAINT "passResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
