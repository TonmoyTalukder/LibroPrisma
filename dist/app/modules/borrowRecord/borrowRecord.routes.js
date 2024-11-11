"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRecordRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const borrowRecord_controller_1 = require("./borrowRecord.controller");
const borrowRecord_validation_1 = require("./borrowRecord.validation");
const router = express_1.default.Router();
router.post("/borrow", (0, validateRequest_1.default)(borrowRecord_validation_1.borrowRecordValidationSchemas.borrowABook), borrowRecord_controller_1.borrowRecordController.borrowABook);
router.put("/return", (0, validateRequest_1.default)(borrowRecord_validation_1.borrowRecordValidationSchemas.returnABook), borrowRecord_controller_1.borrowRecordController.returnABook);
router.get("/borrow/overdue", borrowRecord_controller_1.borrowRecordController.getOverdueBooks);
router.get("/borrow/:id", borrowRecord_controller_1.borrowRecordController.getByIdFromDB);
router.get("/borrow", borrowRecord_controller_1.borrowRecordController.getAllFromDB);
exports.borrowRecordRoutes = router;
