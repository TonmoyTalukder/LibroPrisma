"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const member_controller_1 = require("./member.controller");
const member_validation_1 = require("./member.validation");
const router = express_1.default.Router();
router.get("/", member_controller_1.memberController.getAllFromDB);
router.get("/:id", member_controller_1.memberController.getByIdFromDB);
router.post("/", (0, validateRequest_1.default)(member_validation_1.memberValidationSchemas.create), member_controller_1.memberController.createMember);
router.put("/:memberId", (0, validateRequest_1.default)(member_validation_1.memberValidationSchemas.update), member_controller_1.memberController.updateMember);
router.delete("/:memberId", member_controller_1.memberController.deleteMember);
exports.memberRoutes = router;
