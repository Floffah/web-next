-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMINISTRATOR', 'EDIT_PRODUCTS');

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissions" "Permission"[];
