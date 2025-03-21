-- CreateTable
CREATE TABLE "ActivationUserToken" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivationUserToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivationUserToken_user_id_key" ON "ActivationUserToken"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationUserToken_token_key" ON "ActivationUserToken"("token");

-- AddForeignKey
ALTER TABLE "ActivationUserToken" ADD CONSTRAINT "ActivationUserToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
