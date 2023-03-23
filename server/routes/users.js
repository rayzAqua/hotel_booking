import express from "express";

const router = express();

router.get("/", (req, res) => {
    res.send("From users api!");
});

export default router;