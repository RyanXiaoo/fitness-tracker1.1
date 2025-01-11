import mongoose from "mongoose";
import cardSchema from "./card.model.js";

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    cards: {
        type: [cardSchema],
        required: true,
    },
});

const Page = mongoose.model("Page", pageSchema);

export default Page;
