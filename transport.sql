CREATE TABLE "account" (
  "idaccount" bigserial PRIMARY KEY,
  "user_acc" varchar(255) NOT NULL,
  "hash_password" varchar(255),
  "first_access" boolean,
  "created_at" timestamp DEFAULT (now()),
  "modified_at" timestamp
);

CREATE TABLE "user" (
  "iduser" bigserial PRIMARY KEY,
  "name" varchar(255),
  "idaccount" bigserial,
  "idlocation" bigserial,
  "created_at" timestamp DEFAULT (now()),
  "modified_at" timestamp
);

CREATE TABLE "location" (
  "idlocation" bigserial PRIMARY KEY,
  "name" varchar(255)
);

CREATE INDEX ON "account" ("idaccount");

CREATE INDEX ON "user" ("iduser");

CREATE INDEX ON "location" ("idlocation");

COMMENT ON COLUMN "account"."hash_password" IS 'TODO';

ALTER TABLE "user" ADD FOREIGN KEY ("idaccount") REFERENCES "account" ("idaccount");

ALTER TABLE "user" ADD FOREIGN KEY ("idlocation") REFERENCES "location" ("idlocation");
