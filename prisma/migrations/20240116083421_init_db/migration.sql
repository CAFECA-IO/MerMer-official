-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "signer" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "TwUserData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "intro" TEXT,

    CONSTRAINT "TwUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnUserData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "intro" TEXT,

    CONSTRAINT "EnUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CnUserData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "intro" TEXT,

    CONSTRAINT "CnUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTitle" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "TwUserDataId" INTEGER NOT NULL,
    "EnUserDataId" INTEGER NOT NULL,
    "CnUserDataId" INTEGER NOT NULL,

    CONSTRAINT "JobTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KM" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "description" TEXT,
    "mdFile" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToKM" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_signer_key" ON "User"("signer");

-- CreateIndex
CREATE UNIQUE INDEX "TwUserData_userId_key" ON "TwUserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EnUserData_userId_key" ON "EnUserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CnUserData_userId_key" ON "CnUserData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "JobTitle_TwUserDataId_key" ON "JobTitle"("TwUserDataId");

-- CreateIndex
CREATE UNIQUE INDEX "JobTitle_EnUserDataId_key" ON "JobTitle"("EnUserDataId");

-- CreateIndex
CREATE UNIQUE INDEX "JobTitle_CnUserDataId_key" ON "JobTitle"("CnUserDataId");

-- CreateIndex
CREATE UNIQUE INDEX "KM_topicId_key" ON "KM"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToKM_AB_unique" ON "_CategoryToKM"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToKM_B_index" ON "_CategoryToKM"("B");

-- AddForeignKey
ALTER TABLE "TwUserData" ADD CONSTRAINT "TwUserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnUserData" ADD CONSTRAINT "EnUserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CnUserData" ADD CONSTRAINT "CnUserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTitle" ADD CONSTRAINT "JobTitle_TwUserDataId_fkey" FOREIGN KEY ("TwUserDataId") REFERENCES "TwUserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTitle" ADD CONSTRAINT "JobTitle_EnUserDataId_fkey" FOREIGN KEY ("EnUserDataId") REFERENCES "EnUserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTitle" ADD CONSTRAINT "JobTitle_CnUserDataId_fkey" FOREIGN KEY ("CnUserDataId") REFERENCES "CnUserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KM" ADD CONSTRAINT "KM_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KM" ADD CONSTRAINT "KM_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToKM" ADD CONSTRAINT "_CategoryToKM_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToKM" ADD CONSTRAINT "_CategoryToKM_B_fkey" FOREIGN KEY ("B") REFERENCES "KM"("id") ON DELETE CASCADE ON UPDATE CASCADE;
