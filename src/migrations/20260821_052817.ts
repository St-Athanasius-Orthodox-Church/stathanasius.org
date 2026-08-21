import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "bulletins" ADD COLUMN "cover_photo_id" integer;
  ALTER TABLE "bulletins" ADD CONSTRAINT "bulletins_cover_photo_id_media_id_fk" FOREIGN KEY ("cover_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "bulletins_cover_photo_idx" ON "bulletins" USING btree ("cover_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "bulletins" DROP CONSTRAINT "bulletins_cover_photo_id_media_id_fk";
  
  DROP INDEX "bulletins_cover_photo_idx";
  ALTER TABLE "bulletins" DROP COLUMN "cover_photo_id";`)
}
