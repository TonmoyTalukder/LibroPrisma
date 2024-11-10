import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { borrowRecordController } from "./borrowRecord.controller";
import { borrowRecordValidationSchemas } from "./borrowRecord.validation";

const router = express.Router();

router.get("/", borrowRecordController.getAllFromDB);
router.get("/:id", borrowRecordController.getByIdFromDB);
router.post(
    "/",
    validateRequest(borrowRecordValidationSchemas.borrowABook),
    borrowRecordController.borrowABook
);
router.put(
    "/return",
    validateRequest(borrowRecordValidationSchemas.returnABook),
    borrowRecordController.returnABook
);
router.get("/overdue", borrowRecordController.getAllFromDB);


export const borrowRecordRoutes = router;
