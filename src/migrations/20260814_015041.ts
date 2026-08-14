import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"title" varchar,
  	"bio" jsonb,
  	"user_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "homilies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"speaker_id" integer NOT NULL,
  	"audio_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "people_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audios_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "homilies_id" integer;
  ALTER TABLE "people" ADD CONSTRAINT "people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homilies" ADD CONSTRAINT "homilies_speaker_id_people_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homilies" ADD CONSTRAINT "homilies_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "people_photo_idx" ON "people" USING btree ("photo_id");
  CREATE INDEX "people_user_idx" ON "people" USING btree ("user_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "audios_updated_at_idx" ON "audios" USING btree ("updated_at");
  CREATE INDEX "audios_created_at_idx" ON "audios" USING btree ("created_at");
  CREATE UNIQUE INDEX "audios_filename_idx" ON "audios" USING btree ("filename");
  CREATE INDEX "homilies_speaker_idx" ON "homilies" USING btree ("speaker_id");
  CREATE INDEX "homilies_audio_idx" ON "homilies" USING btree ("audio_id");
  CREATE INDEX "homilies_updated_at_idx" ON "homilies" USING btree ("updated_at");
  CREATE INDEX "homilies_created_at_idx" ON "homilies" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audios_fk" FOREIGN KEY ("audios_id") REFERENCES "public"."audios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_homilies_fk" FOREIGN KEY ("homilies_id") REFERENCES "public"."homilies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_audios_id_idx" ON "payload_locked_documents_rels" USING btree ("audios_id");
  CREATE INDEX "payload_locked_documents_rels_homilies_id_idx" ON "payload_locked_documents_rels" USING btree ("homilies_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "audios" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homilies" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "people" CASCADE;
  DROP TABLE "audios" CASCADE;
  DROP TABLE "homilies" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_people_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audios_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_homilies_fk";
  
  DROP INDEX "payload_locked_documents_rels_people_id_idx";
  DROP INDEX "payload_locked_documents_rels_audios_id_idx";
  DROP INDEX "payload_locked_documents_rels_homilies_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "people_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "audios_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "homilies_id";`)
}
