import { create } from "zustand";
import { base } from "../config/baseurl.js";

export const usePageStore = create((set) => ({
    pages: [],

    setPages: (pages) => {
        set({ pages });
    },

    removeCardFromPage: (pageIndex, exercise) => {
        set((state) => {
            const updatedPages = [...state.pages];
            updatedPages[pageIndex].cards = updatedPages[
                pageIndex
            ].cards.filter(
                (card) => card.exercise.toLowerCase() !== exercise.toLowerCase()
            );
            return { pages: updatedPages };
        });
    },

    updateCardFromPage: (pageIndex, exercise, amount) => {
        set((state) => {
            const updatedPages = [...state.pages];
            updatedPages[pageIndex].cards = updatedPages[pageIndex].cards.map(
                (card) => {
                    if (card.exercise === exercise) {
                        return { exercise: exercise, amount: amount };
                    }
                    return card;
                }
            );
            return { pages: updatedPages };
        });
    },

    updatePages: (updater) => {
        set((state) => {
            const newPages = updater(state.pages);
            console.log("Updating pages to:", newPages);
            return { pages: newPages };
        });
    },

    fetchAndMergePages: async () => {
        try {
            const res = await fetch(`${base}/pages/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error fetching pages:", errorData.message);
                return { success: false, message: errorData.message };
            }

            const response = await res.json();
            const fetchedPages = response.data;

            set((state) => {
                const existingTitles = Array.isArray(state.pages)
                    ? state.pages.map((page) => page.title)
                    : [];
                const uniqueFetchedPages = fetchedPages.filter(
                    (page) => !existingTitles.includes(page.title)
                );

                const updatedPages = [...state.pages, ...uniqueFetchedPages];
                console.log("Updated pages in state:", updatedPages);
                return {
                    pages: updatedPages,
                };
            });

            return { success: true, message: "Pages fetched and merged" };
        } catch (error) {
            console.error("Error fetching and merging pages: ", error);
            return {
                success: false,
                message: "Error in fetching and merging pages",
            };
        }
    },

    createPage: async (newPage) => {
        if (!newPage.title || !newPage.cards) {
            return { success: false, message: "Please fill in all fields" };
        }

        const res = await fetch(`${base}/pages/`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newPage),
        });
        const data = await res.json();

        console.log("Creating page with data:", data.data);

        set((state) => ({
            pages: [...state.pages, data.data],
        }));

        return { success: true, message: "Page created successfully" };
    },
}));
