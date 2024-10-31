
import { Request, Response } from "express";
import Book from "../models/Book";

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.find();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error("Buku Tidak Ditemukan!");
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) throw new Error("Buku Tidak Ditemukan!");
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) throw new Error("Buku Tidak Ditemukan!");
    res.json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};
