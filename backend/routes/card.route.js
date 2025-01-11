import express from "express";

import {
    createCard,
    deleteCard,
    updateAmount,
} from "../controllers/card.controller.js";

const router = express.Router();

router.post("/", createCard);

router.delete("/", deleteCard);

router.put("/", updateAmount);
export default router;
