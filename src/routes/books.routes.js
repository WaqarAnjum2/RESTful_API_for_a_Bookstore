const express = require("express");
const { body, param, query } = require("express-validator");
const Book = require("../models/Book");
const { createBooksController } = require("../controllers/books.controller");

const router = express.Router();
const books = createBooksController({ Model: Book });

const bookBodyValidators = [
	body("title").trim().notEmpty().withMessage("title is required"),
	body("author").trim().notEmpty().withMessage("author is required"),
	body("price").isFloat({ min: 0 }).withMessage("price must be a number greater than or equal to 0"),
	body("isbn").trim().notEmpty().withMessage("isbn is required"),
	body("publishedDate").isISO8601().toDate().withMessage("publishedDate must be a valid date"),
];

const bookUpdateValidators = [
	body("title").optional().trim().notEmpty().withMessage("title cannot be empty"),
	body("author").optional().trim().notEmpty().withMessage("author cannot be empty"),
	body("price").optional().isFloat({ min: 0 }).withMessage("price must be a number greater than or equal to 0"),
	body("isbn").optional().trim().notEmpty().withMessage("isbn cannot be empty"),
	body("publishedDate").optional().isISO8601().toDate().withMessage("publishedDate must be a valid date"),
];

const listValidators = [
	query("page").optional().isInt({ min: 1 }).withMessage("page must be an integer greater than or equal to 1").toInt(),
	query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be an integer between 1 and 100").toInt(),
	query("search").optional().isString().trim(),
];

router.get("/", listValidators, books.list);
router.post("/", bookBodyValidators, books.create);
router.get("/:id", param("id").isMongoId().withMessage("Invalid id"), books.getById);
router.put("/:id", param("id").isMongoId().withMessage("Invalid id"), bookUpdateValidators, books.updateById);
router.delete("/:id", param("id").isMongoId().withMessage("Invalid id"), books.removeById);

module.exports = router;