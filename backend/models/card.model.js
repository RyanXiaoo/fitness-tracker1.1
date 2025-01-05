import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

export const Card = mongoose.model("Card", cardSchema);
export default cardSchema;
