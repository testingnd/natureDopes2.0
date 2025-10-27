-- AlterTable
ALTER TABLE "api_keys" ADD COLUMN "expires_at" TIMESTAMP(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL '90 days');

-- AlterTable
ALTER TABLE "api_keys" ADD COLUMN "created_ip" VARCHAR(50);

-- Remove default from expires_at for future inserts (keep it only for existing rows)
ALTER TABLE "api_keys" ALTER COLUMN "expires_at" DROP DEFAULT;
