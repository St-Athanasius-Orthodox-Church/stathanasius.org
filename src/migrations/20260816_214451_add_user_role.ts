import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'parishioner', 'guest');
    ALTER TABLE "users" ADD COLUMN "role" "enum_users_role";
    UPDATE "users" SET "role" = 'admin';
    ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest';
    ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" DROP COLUMN "role";
    DROP TYPE "public"."enum_users_role";
  `)
}
