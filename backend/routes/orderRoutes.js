
const express = require("express");
const router = express.Router();
console.log("✅ ORDER ROUTES FILE LOADED");

const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
    try {
        const {
            orderNumber,
            customer,
            items,
            totalPrice,
            payment
        } = req.body;

        if (
            !orderNumber ||
            !customer ||
            !customer.name ||
            !customer.email ||
            !customer.phone ||
            !customer.address ||
            !customer.city ||
            !customer.pincode ||
            !items ||
            items.length === 0 ||
            totalPrice === undefined ||
            !payment
        ) {
            return res.status(400).json({
                message: "Please provide all order details."
            });
        }

        const newOrder = new Order({
            orderNumber,
            customer,
            items,
            totalPrice,
            payment
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order saved successfully ✅",
            order: newOrder
        });

    } catch (error) {
        console.error("Order Save Error ❌", error);

        res.status(500).json({
            message: "Failed to save order."
        });
    }
});

// GET ALL ORDERS
router.get("/test", (req, res) => {
    res.json({
        message: "Order routes are working ✅"
    });
});
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {
        console.error("Fetch Orders Error ❌", error);

        res.status(500).json({
            message: "Failed to fetch orders."
        });
    }
});
// GET ORDER BY ORDER NUMBER
router.get("/track/:orderNumber", async (req, res) => {
    try {
        const order = await Order.findOne({
            orderNumber: req.params.orderNumber
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error("Track Order Error ❌", error);

        res.status(500).json({
            message: "Failed to track order."
        });
    }
});
// UPDATE ORDER STATUS
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated successfully ✅",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Update Status Error ❌", error);

        res.status(500).json({
            message: "Failed to update order status."
        });
    }
});
module.exports = router;

