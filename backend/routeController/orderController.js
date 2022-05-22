import asyncHandler from "express-async-handler";
import Order from "./../models/orderModel.js";

// @description: Creating Order
// @requestroute: POST /api/orders

const orderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Items.");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @description: order taking through ID
// @requestroute: GET /api/orders/:id

const orderItemsId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});
// @description: paid update order
// @requestroute: GET /api/orders/:id/pay

const orderToBePaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrders = await order.save();
    res.json(updatedOrders);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});
//================================================================
// @description: deliver update order
// @requestroute: GET /api/orders/:id/deliver

const orderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrders = await order.save();
    res.json(updatedOrders);
  } else {
    res.status(404);
    throw new Error("No Order found");
  }
});

//================================================================
// @description: for user orders
// @requestroute: GET /api/orders/myorders

const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @description: for all order
// @route GET /api/orders
const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  orderItems,
  orderItemsId,
  orderToBePaid,
  myOrders,
  allOrders,
  orderToDelivered,
};
