import ContactMessage from "../models/contactMessage.js";

export async function ContactMessagesRequest (req, res) {
    try {
        const { name, email, message } = req.body;  //get name, email and message from request body

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newContactMessage = new ContactMessage({
            name,
            email,
            message
        });

        await newContactMessage.save();

        res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while sending the message",
        })

        }
}