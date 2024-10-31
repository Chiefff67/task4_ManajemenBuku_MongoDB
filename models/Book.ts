import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    description: "Judul buku",
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    description: "Nomor ISBN buku",
  },
  penulis: {
    type: String,
    required: true,
    description: "Nama penulis buku",
  },
  tahunTerbit: {
    type: Number,
    required: true,
    description: "Tahun buku diterbitkan",
  },
  penerbit: {
    type: String,
    description: "Nama penerbit buku",
  },
  kategori: {
    type: String,
    description: "Kategori/genre buku",
  },
  deskripsi: {
    type: String,
    description: "Deskripsi singkat tentang buku",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware untuk mengupdate updatedAt sebelum save
bookSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Hapus index yang ada terlebih dahulu
bookSchema.index({}, { sparse: true, unique: false });

// Buat index baru untuk ISBN
bookSchema.index(
  { isbn: 1 },
  {
    unique: true,
    sparse: true,
    // Tmenambahkan partial filter expression untuk menghindari error duplicate null values
    partialFilterExpression: { isbn: { $exists: true } },
  }
);

export default mongoose.model("Book", bookSchema);
