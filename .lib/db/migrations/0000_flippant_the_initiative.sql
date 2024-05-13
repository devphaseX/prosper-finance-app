CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"user_id" text NOT NULL
);
