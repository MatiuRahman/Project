import express from "express";
import {
  orderItems,
  orderItemsId,
  orderToBePaid,
  myOrders,
  allOrders,
  orderToDelivered
} from "../routeController/orderController.js";
import { protection, admin } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

// description: authenticate user & get token
// route: /api/users/login
router
  .route("/")
  .post(protection, orderItems)
  .get(protection, admin, allOrders);
router.route("/myorders").get(protection, myOrders);
router.route("/:id").get(protection, orderItemsId);
router.route("/:id/pay").put(protection, orderToBePaid);
router.route("/:id/deliver").put(protection, admin, orderToDelivered);

export default router;
