-- CreateTable
CREATE TABLE "Product" (
    "id" VARCHAR(11) NOT NULL DEFAULT nanoid(),
    "name" TEXT NOT NULL,
    "pros" TEXT[],
    "cons" TEXT[],

    PRIMARY KEY ("id")
);
