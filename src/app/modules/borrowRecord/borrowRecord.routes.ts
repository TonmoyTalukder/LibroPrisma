import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { borrowRecordController } from "./borrowRecord.controller";
import { borrowRecordValidationSchemas } from "./borrowRecord.validation";

const router = express.Router();

router.post(
    "/borrow",
    validateRequest(borrowRecordValidationSchemas.borrowABook),
    borrowRecordController.borrowABook
);
router.put(
    "/return",
    validateRequest(borrowRecordValidationSchemas.returnABook),
    borrowRecordController.returnABook
);
router.get("/borrow/overdue", borrowRecordController.getOverdueBooks);

router.get("/borrow/:id", borrowRecordController.getByIdFromDB);
router.get("/borrow", borrowRecordController.getAllFromDB);


export const borrowRecordRoutes = router;
