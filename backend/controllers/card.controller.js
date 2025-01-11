import { Card } from "../models/card.model.js";
import Page from "../models/page.model.js";

export const createCard = async (req, res) => {
    const { exercise, amount, pageTitle } = req.body;

    if (!exercise || !amount || !pageTitle) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    try {
        // Find the corresponding page by title
        const page = await Page.findOne({ title: pageTitle.toUpperCase() });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found.",
            });
        }

        // Check if a card with the same exercise already exists in this page
        const duplicateCard = page.cards.find(
            (card) => card.exercise.toLowerCase() === exercise.toLowerCase()
        );
        if (duplicateCard) {
            return res.status(400).json({
                success: false,
                message: "Duplicate exercise cannot be created",
            });
        }

        // Create and save the new card
        const newCard = new Card({ exercise, amount });
        await newCard.save();

        // Add the new card to the page and save
        page.cards.push(newCard);
        await page.save();

        return res.status(201).json({ success: true, data: newCard });
    } catch (error) {
        console.error("Error in creating the card", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
};

export const deleteCard = async (req, res) => {
    const { exercise, pageTitle } = req.body;

    try {
        const page = await Page.findOne({ title: pageTitle });
        page.cards = page.cards.filter((card) => {
            return card.exercise !== exercise.toString();
        });

        await page.save();
        return res
            .status(200)
            .json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
        console.error("Error deleting card:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
};

export const updateAmount = async (req, res) => {
    console.log(req.body);
    const { amount, exercise, pageTitle } = req.body;

    try {
        const page = await Page.findOne({ title: pageTitle });

        page.cards = page.cards.map((card) => {
            if (card.exercise === exercise) {
                return { exercise: exercise, amount: amount };
            }
            return card;
        });

        await page.save();
        return res
            .status(200)
            .json({ success: true, message: "Card updated successfully" });
    } catch (error) {
        console.error("Error updating card:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
};
