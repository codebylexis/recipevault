-- CreateTable
CREATE TABLE "customers" (
    "customer_id" BIGINT,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "store_id" BIGINT,
    "active" BIGINT
);

-- CreateTable
CREATE TABLE "films" (
    "film_id" BIGINT,
    "title" TEXT,
    "genre_id" BIGINT
);

-- CreateTable
CREATE TABLE "genres" (
    "genre_id" BIGINT,
    "genre_name" TEXT
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" BIGINT,
    "customer_id" BIGINT,
    "amount" DOUBLE PRECISION,
    "payment_date" TEXT
);

-- CreateTable
CREATE TABLE "rentals" (
    "rental_id" BIGINT,
    "rental_date" TIMESTAMP(6),
    "return_date" TIMESTAMP(6),
    "film_id" BIGINT,
    "customer_id" BIGINT
);

-- CreateTable
CREATE TABLE "stores" (
    "store_id" BIGINT,
    "city" TEXT
);
