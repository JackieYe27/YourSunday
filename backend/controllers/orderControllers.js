import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";


// Create new Order
// POST /api/orders
// route: GET api/products
const addOrderItems = asyncHandler(async(req,res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      shippingAddress, 
      user: req.user._id,
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// Get order by Id
// GET api/orders/:id
// route: GET api/products
const getOrderById = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.")
  }
});

// Update order to paid
// PUT api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found.")
  }
});

// Get logged in user orders
// GET api/orders/myorders
const getMyOrders = asyncHandler(async(req,res) => {
  const orders = await Order.find({ user:req.user.id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }