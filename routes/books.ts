import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = Router();

/**
 * @swagger
 * /books/daftar:
 *   get:
 *     summary: Mendapatkan semua daftar buku
 *     responses:
 *       200:
 *         description: Daftar semua buku berhasil ditampilkan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/daftar", getBooks);

/**
 * @swagger
 * /books/detail/{id}:
 *   get:
 *     summary: Mendapatkan detail buku berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Detail buku berhasil ditampilkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Buku tidak ditemukan
 */
router.get("/detail/:id", getBookById);

/**
 * @swagger
 * /books/tambah:
 *   post:
 *     summary: Menambahkan buku baru
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       401:
 *         description: Tidak memiliki akses
 */
router.post("/tambah", auth, addBook);

/**
 * @swagger
 * /books/ubah/{id}:
 *   put:
 *     summary: Mengubah data buku berdasarkan ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID buku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Data buku berhasil diubah
 *       401:
 *         description: Tidak memiliki akses
 *       404:
 *         description: Buku tidak ditemukan
 */
router.put("/ubah/:id", auth, updateBook);

/**
 * @swagger
 * /books/hapus/{id}:
 *   delete:
 *     summary: Menghapus buku berdasarkan ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID buku
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       401:
 *         description: Tidak memiliki akses
 *       404:
 *         description: Buku tidak ditemukan
 */
router.delete("/hapus/:id", auth, deleteBook);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - judul
 *         - penulis
 *         - tahunTerbit
 *       properties:
 *         judul:
 *           type: string
 *           description: Judul buku
 *         penulis:
 *           type: string
 *           description: Nama penulis buku
 *         tahunTerbit:
 *           type: number
 *           description: Tahun buku diterbitkan
 *         penerbit:
 *           type: string
 *           description: Nama penerbit buku
 *         kategori:
 *           type: string
 *           description: Kategori/genre buku
 *         deskripsi:
 *           type: string
 *           description: Deskripsi singkat tentang buku
 */
export default router;
