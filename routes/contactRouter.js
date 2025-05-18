import express from "express";
import { ContactMessagesRequest } from "../controllers/contactMessage.js";

const router = express.Router();

router.post("/", ContactMessagesRequest);  // <-- no '/contact' here, since mounted on '/api/contact'

export default router;
