import express from "express";
import {
  userAuth,
  userProfile,
  userRegisteration,
  updateProfile,
  getUsers,
  deleteUsers,
  getUsersById,
  updateUser,
} from "../routeController/userController.js";
import { protection, admin } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

// description: authenticate user & get token
// route: /api/users/login
router.route("/").post(userRegisteration).get(protection, admin, getUsers);
router.post("/login", userAuth);
router
  .route("/profile")
  .get(protection, userProfile)
  .put(protection, updateProfile);
router
  .route("/:id")
  .delete(protection, admin, deleteUsers)
  .get(protection, admin, getUsersById)
  .put(protection, admin, updateUser);

export default router;
