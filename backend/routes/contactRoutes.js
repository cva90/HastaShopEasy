
const express = require("express");
const router = express.Router();

const Message = require("../models/Message");

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message saved successfully ✅"
        });

    } catch (error) {
        console.error("Message Save Error ❌", error);

        res.status(500).json({
            message: "Failed to save message."
        });
    }
});

module.exports = router;

