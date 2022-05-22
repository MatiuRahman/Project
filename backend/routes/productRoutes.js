import express from "express";
import {
  getItems,
  getItemsById,
  deleteItems,
  createItems,
  updateItems,
  createItemsReviews,
  topProducts,
} from "../routeController/itemController.js";
import { protection, admin } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

//fetch all the products
router.route("/").get(getItems).post(protection, admin, createItems);
router.route("/:id/reviews").post(protection, createItemsReviews);
router.get('/top', topProducts);
//fetch single product
router
  .route("/:id")
  .get(getItemsById)
  .delete(protection, admin, deleteItems)
  .put(protection, admin, updateItems);

export default router;
