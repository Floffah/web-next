-- CreateNanoID
-- https://github.com/Jakeii/nanoid-postgres/blob/main/nanoid.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION nanoid(size int DEFAULT 21)
RETURNS text AS $$
DECLARE
id text := '';
  i int := 0;
  urlAlphabet char(64) := 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
  bytes bytea := gen_random_bytes(size);
  byte int;
  pos int;
BEGIN
  WHILE i < size LOOP
    byte := get_byte(bytes, i);
    pos := (byte & 63) + 1; -- + 1 because substr starts at 1 for some reason
    id := id || substr(urlAlphabet, pos, 1);
    i = i + 1;
END LOOP;
RETURN id;
END

$$ LANGUAGE PLPGSQL STABLE;

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(11) NOT NULL DEFAULT nanoid(),
    "discordId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "access" TEXT,
    "refresh" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.discordId_unique" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User.access_unique" ON "User"("access");

-- CreateIndex
CREATE UNIQUE INDEX "User.refresh_unique" ON "User"("refresh");
