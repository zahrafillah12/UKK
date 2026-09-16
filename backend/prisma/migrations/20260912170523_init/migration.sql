-- CreateTable
CREATE TABLE "AppMaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "app_key" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "maker_id" INTEGER NOT NULL,
    CONSTRAINT "User_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "AppMaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpaceOwner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_coworking" TEXT NOT NULL,
    "nama_pemilik" TEXT NOT NULL,
    "telp" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "SpaceOwner_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_member" TEXT NOT NULL,
    "instansi" TEXT,
    "alamat" TEXT,
    "telp" TEXT,
    "foto" TEXT,
    "id_user" INTEGER NOT NULL,
    "maker_id" INTEGER NOT NULL,
    CONSTRAINT "Member_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Member_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "AppMaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Space" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_space" TEXT NOT NULL,
    "harga_per_jam" REAL NOT NULL,
    "tipe" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "foto" TEXT,
    "deskripsi" TEXT,
    "id_owner" INTEGER NOT NULL,
    "maker_id" INTEGER NOT NULL,
    CONSTRAINT "Space_id_owner_fkey" FOREIGN KEY ("id_owner") REFERENCES "SpaceOwner" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Space_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "AppMaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Diskon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_diskon" TEXT NOT NULL,
    "persentase_diskon" REAL NOT NULL,
    "tanggal_awal" DATETIME NOT NULL,
    "tanggal_akhir" DATETIME NOT NULL,
    "maker_id" INTEGER NOT NULL,
    CONSTRAINT "Diskon_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "AppMaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode_booking" TEXT NOT NULL,
    "tanggal_reservasi" TEXT NOT NULL,
    "jam_mulai" TEXT NOT NULL,
    "durasi_jam" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'belum_dikonfirm',
    "id_member" INTEGER NOT NULL,
    "maker_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservasi_id_member_fkey" FOREIGN KEY ("id_member") REFERENCES "Member" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reservasi_maker_id_fkey" FOREIGN KEY ("maker_id") REFERENCES "AppMaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DetailReservasi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_reservasi" INTEGER NOT NULL,
    "id_space" INTEGER NOT NULL,
    "id_diskon" INTEGER,
    "total_harga_awal" REAL NOT NULL,
    "potongan_diskon" REAL NOT NULL,
    "total_bayar" REAL NOT NULL,
    CONSTRAINT "DetailReservasi_id_reservasi_fkey" FOREIGN KEY ("id_reservasi") REFERENCES "Reservasi" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DetailReservasi_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DetailReservasi_id_diskon_fkey" FOREIGN KEY ("id_diskon") REFERENCES "Diskon" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AppMaker_username_key" ON "AppMaker"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppMaker_email_key" ON "AppMaker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AppMaker_app_key_key" ON "AppMaker"("app_key");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_maker_id_key" ON "User"("username", "maker_id");

-- CreateIndex
CREATE UNIQUE INDEX "SpaceOwner_id_user_key" ON "SpaceOwner"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Member_id_user_key" ON "Member"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Diskon_nama_diskon_maker_id_key" ON "Diskon"("nama_diskon", "maker_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reservasi_kode_booking_key" ON "Reservasi"("kode_booking");

-- CreateIndex
CREATE UNIQUE INDEX "DetailReservasi_id_reservasi_key" ON "DetailReservasi"("id_reservasi");
