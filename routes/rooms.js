import express from "express";

const router = express();

router.get("/", (req, res) => {
    res.send("From rooms api!");
});

export default router;