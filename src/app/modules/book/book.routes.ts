import express from "express";
import { bookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookValidationSchemas } from "./book.validation";

const router = express.Router();

router.get("/", bookController.getAllFromDB);
router.get("/:id", bookController.getByIdFromDB);
router.post(
    "/",
    validateRequest(bookValidationSchemas.createAndUpdate),
    bookController.createBook
);
router.put(
    "/:bookId",
    validateRequest(bookValidationSchemas.createAndUpdate),
    bookController.updateBook
);
router.delete("/:bookId", bookController.deleteBook);

export const bookRoutes = router;
