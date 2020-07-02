const express = require("express");
const router = express.Router();

// The user will auto connect at /Game
router.get("/game", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

module.exports = router;