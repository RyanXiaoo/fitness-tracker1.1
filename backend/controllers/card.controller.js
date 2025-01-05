import Card from "../models/card.model.js";
import Page from "../models/page.model.js";

export const createCard = async (req, res) => {
    const { name, amount, pageId } = req.body;

    if (!card.name || !card.amount || !Page.pageId) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newCard = new Card({ name, amount });
        await newCard.save();
        const page = await Page.findById(pageId);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found.",
            });
        }

        page.cards.push(newCard);
        await page.save();
        res.status(201).json({ success: true, data: newCard });
    } catch (error) {
        console.error("Error in creating the card", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteCard = async (req, res) => {
    const { name } = req.body;

    try {
        page.cards.map((card) => {
            if (card.name === name) {
                
            }
        })
    }
};
