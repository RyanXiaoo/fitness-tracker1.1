import Page from "../models/page.model.js";

export const getPage = async (req, res) => {
    try {
        const { title } = req.params;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title parameter is required.",
            });
        }

        const page = await Page.findOne({ title });

        if (!page) {
            return res
                .status(404)
                .json({ success: false, message: "Page not found." });
        }

        res.status(200).json({ success: true, data: page });
    } catch (error) {
        console.error("error in fetching page: ", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const createPage = async (req, res) => {
    const page = req.body;

    if (!page.title || !page.cards) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields" });
    }

    const newPage = new Page(page);

    try {
        await newPage.save();
        res.status(201).json({ success: true, data: newPage });
    } catch (error) {
        console.error("Error in Create page", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deletePage = async (req, res) => {
    const { title } = req.params;

    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: "Title parameter is required." });
    }

    try {
        const deletedPage = await Page.findOneAndDelete({ title: title });

        if (!deletedPage) {
            return res.status(404).json({
                success: false,
                message: "Page not found.",
            });
        }

        res.status(200).json({ success: true, message: "Page deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
