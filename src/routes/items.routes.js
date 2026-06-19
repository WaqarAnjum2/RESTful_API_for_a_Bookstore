const express = require("express");
const { body, query } = require("express-validator");
const { createCRUDController } = require("../controllers/crud.controller");
const Item = require("../models/Item");

const router = express.Router();

const crud = createCRUDController({
	Model: Item,
	allowedFields: ["title", "description"],
	searchFields: ["title", "description"],
});

const itemCreateValidators = [
	body("title").trim().notEmpty().withMessage("title is required"),
	body("description").optional().trim().isString().withMessage("description must be a string"),
];

const itemUpdateValidators = [
	body("title").optional().trim().notEmpty().withMessage("title cannot be empty"),
	body("description").optional().trim().isString().withMessage("description must be a string"),
];

const listValidators = [
	query("page").optional().isInt({ min: 1 }).withMessage("page must be an integer greater than or equal to 1").toInt(),
	query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be an integer between 1 and 100").toInt(),
	query("search").optional().isString().trim(),
];

router.get("/", listValidators, crud.list);
router.post("/", itemCreateValidators, crud.create);
router.get("/:id", crud.getById);
router.put("/:id", itemUpdateValidators, crud.updateById);
router.delete("/:id", crud.removeById);

module.exports = router;
