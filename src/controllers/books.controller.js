const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

function getValidationMessage(req) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return null;
  }

  return errors.array()[0].msg;
}

function createBooksController({ Model }) {
  async function list(req, res) {
    const validationMessage = getValidationMessage(req);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const search = (req.query.search || "").trim();

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { isbn: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [books, total] = await Promise.all([
      Model.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Model.countDocuments(filter),
    ]);

    return res.json({
      data: books,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  }

  async function create(req, res) {
    const validationMessage = getValidationMessage(req);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    try {
      const book = await Model.create({
        title: req.body.title,
        author: req.body.author,
        price: Number(req.body.price),
        isbn: req.body.isbn,
        publishedDate: req.body.publishedDate,
      });

      return res.status(201).json({ data: book });
    } catch (err) {
      if (err?.code === 11000) {
        return res.status(409).json({ message: "isbn already exists" });
      }
      return res.status(500).json({ message: "Server error" });
    }
  }

  async function getById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const book = await Model.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });
    return res.json({ data: book });
  }

  async function updateById(req, res) {
    const validationMessage = getValidationMessage(req);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const updates = {};
    const fields = ["title", "author", "price", "isbn", "publishedDate"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = field === "price" ? Number(req.body[field]) : req.body[field];
      }
    });

    if (updates.price !== undefined && Number.isNaN(updates.price)) {
      return res.status(400).json({ message: "price must be a number" });
    }

    if (updates.publishedDate !== undefined && Number.isNaN(new Date(updates.publishedDate).getTime())) {
      return res.status(400).json({ message: "publishedDate must be a valid date" });
    }

    try {
      const book = await Model.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
      if (!book) return res.status(404).json({ message: "Not found" });
      return res.json({ data: book });
    } catch (err) {
      if (err?.code === 11000) {
        return res.status(409).json({ message: "isbn already exists" });
      }
      return res.status(500).json({ message: "Server error" });
    }
  }

  async function removeById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted" });
  }

  return { list, create, getById, updateById, removeById };
}

module.exports = { createBooksController };