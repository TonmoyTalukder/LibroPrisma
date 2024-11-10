import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { memberController } from "./member.controller";
import { memberValidationSchemas } from "./member.validation";

const router = express.Router();

router.get("/", memberController.getAllFromDB);
router.get("/:id", memberController.getByIdFromDB);
router.post(
    "/",
    validateRequest(memberValidationSchemas.create),
    memberController.createMember
);
router.put(
    "/:memberId",
    validateRequest(memberValidationSchemas.update),
    memberController.updateMember
);
router.delete("/:memberId", memberController.deleteMember);

export const memberRoutes = router;
