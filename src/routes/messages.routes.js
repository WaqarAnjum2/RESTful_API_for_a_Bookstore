const express = require("express");
const { body, query } = require("express-validator");
const { createCRUDController } = require("../controllers/crud.controller");
const Message = require("../models/Message");

const router = express.Router();

const crud = createCRUDController({
	Model: Message,
	allowedFields: ["toUserId", "text"],
	searchFields: ["text"],
});

const messageCreateValidators = [
	body("toUserId").isMongoId().withMessage("toUserId is required and must be a valid MongoDB ObjectId"),
	body("text").trim().notEmpty().withMessage("text is required"),
];

const messageUpdateValidators = [
	body("toUserId").optional().isMongoId().withMessage("toUserId must be a valid MongoDB ObjectId"),
	body("text").optional().trim().notEmpty().withMessage("text cannot be empty"),
];

const listValidators = [
	query("page").optional().isInt({ min: 1 }).withMessage("page must be an integer greater than or equal to 1").toInt(),
	query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be an integer between 1 and 100").toInt(),
	query("search").optional().isString().trim(),
];

router.get("/", listValidators, crud.list);
router.post("/", messageCreateValidators, crud.create);
router.get("/:id", crud.getById);
router.put("/:id", messageUpdateValidators, crud.updateById);
router.delete("/:id", crud.removeById);

module.exports = router;
