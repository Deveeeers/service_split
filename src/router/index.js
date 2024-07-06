import { Router } from "express";
import { groupController, userController, ExpenseController } from "../controllers/index.js";

export const router = Router();

router.post("/group", groupController.createGroup);
// router.delete("/group/:id", groupController.deleteGroup);
router.post("/groupuser", groupController.addUserToGroup);
router.delete("/groupuser", groupController.deleteUserFromGroup);

router.post("/user", userController.createUser);
router.delete("/user/:id", userController.deleteUser);

router.post("/expense/:action", ExpenseController.add )
