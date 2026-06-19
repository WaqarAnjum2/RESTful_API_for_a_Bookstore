const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

function getValidationMessage(req) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return null;
  }
  return errors.array()[0].msg;
}

function pickAllowedFields(body, allowedFields) {
  return allowedFields.reduce((updates, field) => {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
    return updates;
  }, {});
}

function buildSearchFilter(search, fields) {
  const term = (search || "").trim();
  if (!term || fields.length === 0) {
    return {};
  }

  return {
    $or: fields.map((field) => ({
      [field]: { $regex: term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" },
    })),
  };
}

function createCRUDController({ Model, allowedFields = [], searchFields = [] }) {
  async function list(req, res) {
    const validationMessage = getValidationMessage(req);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const searchFilter = buildSearchFilter(req.query.search, searchFields);
    const baseFilter = { userId: req.user._id, ...searchFilter };

    const [docs, total] = await Promise.all([
      Model.find(baseFilter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Model.countDocuments(baseFilter),
    ]);

    return res.json({
      data: docs,
      meta: {
        page,
        limit,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
      },
    });
  }

  async function create(req, res) {
    const validationMessage = getValidationMessage(req);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const payload = pickAllowedFields(req.body, allowedFields);

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "At least one valid field is required" });
    }

    try {
      const doc = await Model.create({
        userId: req.user._id,
        ...payload,
      });
      return res.status(201).json({ data: doc });
    } catch (err) {
      if (err?.code === 11000) {
        return res.status(409).json({ message: "Duplicate value already exists" });
      }

      if (err?.name === "ValidationError" || err?.name === "CastError") {
        return res.status(400).json({ message: err.message });
      }

      return res.status(500).json({ message: "Server error" });
    }
  }

  async function getById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const doc = await Model.findOne({ _id: req.params.id, userId: req.user._id });
    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.json({ data: doc });
  }

  async function updateById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const validationMessage = getValidationMessage(req);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const updates = pickAllowedFields(req.body, allowedFields);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "At least one valid field is required" });
    }

    try {
      const updated = await Model.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: "query" }
      );

      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.json({ data: updated });
    } catch (err) {
      if (err?.code === 11000) {
        return res.status(409).json({ message: "Duplicate value already exists" });
      }

      if (err?.name === "ValidationError" || err?.name === "CastError") {
        return res.status(400).json({ message: err.message });
      }

      return res.status(500).json({ message: "Server error" });
    }
  }

  async function removeById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const deleted = await Model.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted" });
  }

  return { list, create, getById, updateById, removeById };
}

module.exports = { createCRUDController };
