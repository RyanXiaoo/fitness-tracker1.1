import express from "express";

import {
    getPage,
    createPage,
    deletePage,
    getAllPages,
} from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", getAllPages);

router.get("/:title", getPage);

router.post("/", createPage);

router.delete("/:title", deletePage);

export default router;
