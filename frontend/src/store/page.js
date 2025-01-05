import { create } from "zustand";
import { base } from "../config/baseurl.js";

export const usePageStore = create((set) => ({
    pages: [
        {
            title: "LEGS",
            link: "/legs",
            cards: [
                { exercise: "SQUAT", amount: 0 },
                { exercise: "EXTENSIONS", amount: 0 },
                { exercise: "DEADLIFT  ", amount: 0 },
            ],
        },
    ],
    setPages: (pages) => set({ pages }),

    createPage: async (newPage) => {
        if (!newPage.title || !newPage.cards) {
            return { success: false, message: "Please fill in all fields" };
        }
        console.log(newPage);
        const res = await fetch(`${base}/`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newPage),
        });
        const data = await res.json();
        set((state) => ({
            pages: [...state.pages, data.data],
        }));
        console.log([...pages, data.data]);
        return { success: true, message: "Product created successfully" };
    },
}));
