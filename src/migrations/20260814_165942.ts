import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_square_sizes_square_filename_idx";
  DROP INDEX "media_sizes_small_sizes_small_filename_idx";
  DROP INDEX "media_sizes_medium_sizes_medium_filename_idx";
  DROP INDEX "media_sizes_large_sizes_large_filename_idx";
  DROP INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx";
  DROP INDEX "media_sizes_og_sizes_og_filename_idx";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url",
  DROP COLUMN "sizes_thumbnail_width",
  DROP COLUMN "sizes_thumbnail_height",
  DROP COLUMN "sizes_thumbnail_mime_type",
  DROP COLUMN "sizes_thumbnail_filesize",
  DROP COLUMN "sizes_thumbnail_filename",
  DROP COLUMN "sizes_square_url",
  DROP COLUMN "sizes_square_width",
  DROP COLUMN "sizes_square_height",
  DROP COLUMN "sizes_square_mime_type",
  DROP COLUMN "sizes_square_filesize",
  DROP COLUMN "sizes_square_filename",
  DROP COLUMN "sizes_small_url",
  DROP COLUMN "sizes_small_width",
  DROP COLUMN "sizes_small_height",
  DROP COLUMN "sizes_small_mime_type",
  DROP COLUMN "sizes_small_filesize",
  DROP COLUMN "sizes_small_filename",
  DROP COLUMN "sizes_medium_url",
  DROP COLUMN "sizes_medium_width",
  DROP COLUMN "sizes_medium_height",
  DROP COLUMN "sizes_medium_mime_type",
  DROP COLUMN "sizes_medium_filesize",
  DROP COLUMN "sizes_medium_filename",
  DROP COLUMN "sizes_large_url",
  DROP COLUMN "sizes_large_width",
  DROP COLUMN "sizes_large_height",
  DROP COLUMN "sizes_large_mime_type",
  DROP COLUMN "sizes_large_filesize",
  DROP COLUMN "sizes_large_filename",
  DROP COLUMN "sizes_xlarge_url",
  DROP COLUMN "sizes_xlarge_width",
  DROP COLUMN "sizes_xlarge_height",
  DROP COLUMN "sizes_xlarge_mime_type",
  DROP COLUMN "sizes_xlarge_filesize",
  DROP COLUMN "sizes_xlarge_filename",
  DROP COLUMN "sizes_og_url",
  DROP COLUMN "sizes_og_width",
  DROP COLUMN "sizes_og_height",
  DROP COLUMN "sizes_og_mime_type",
  DROP COLUMN "sizes_og_filesize",
  DROP COLUMN "sizes_og_filename";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar,
  ADD COLUMN "sizes_thumbnail_width" numeric,
  ADD COLUMN "sizes_thumbnail_height" numeric,
  ADD COLUMN "sizes_thumbnail_mime_type" varchar,
  ADD COLUMN "sizes_thumbnail_filesize" numeric,
  ADD COLUMN "sizes_thumbnail_filename" varchar,
  ADD COLUMN "sizes_square_url" varchar,
  ADD COLUMN "sizes_square_width" numeric,
  ADD COLUMN "sizes_square_height" numeric,
  ADD COLUMN "sizes_square_mime_type" varchar,
  ADD COLUMN "sizes_square_filesize" numeric,
  ADD COLUMN "sizes_square_filename" varchar,
  ADD COLUMN "sizes_small_url" varchar,
  ADD COLUMN "sizes_small_width" numeric,
  ADD COLUMN "sizes_small_height" numeric,
  ADD COLUMN "sizes_small_mime_type" varchar,
  ADD COLUMN "sizes_small_filesize" numeric,
  ADD COLUMN "sizes_small_filename" varchar,
  ADD COLUMN "sizes_medium_url" varchar,
  ADD COLUMN "sizes_medium_width" numeric,
  ADD COLUMN "sizes_medium_height" numeric,
  ADD COLUMN "sizes_medium_mime_type" varchar,
  ADD COLUMN "sizes_medium_filesize" numeric,
  ADD COLUMN "sizes_medium_filename" varchar,
  ADD COLUMN "sizes_large_url" varchar,
  ADD COLUMN "sizes_large_width" numeric,
  ADD COLUMN "sizes_large_height" numeric,
  ADD COLUMN "sizes_large_mime_type" varchar,
  ADD COLUMN "sizes_large_filesize" numeric,
  ADD COLUMN "sizes_large_filename" varchar,
  ADD COLUMN "sizes_xlarge_url" varchar,
  ADD COLUMN "sizes_xlarge_width" numeric,
  ADD COLUMN "sizes_xlarge_height" numeric,
  ADD COLUMN "sizes_xlarge_mime_type" varchar,
  ADD COLUMN "sizes_xlarge_filesize" numeric,
  ADD COLUMN "sizes_xlarge_filename" varchar,
  ADD COLUMN "sizes_og_url" varchar,
  ADD COLUMN "sizes_og_width" numeric,
  ADD COLUMN "sizes_og_height" numeric,
  ADD COLUMN "sizes_og_mime_type" varchar,
  ADD COLUMN "sizes_og_filesize" numeric,
  ADD COLUMN "sizes_og_filename" varchar;
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");`)
}
