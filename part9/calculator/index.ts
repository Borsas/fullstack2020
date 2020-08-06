import express = require("express");
const app = express();

app.get("/hello", (_req, resp) => {
    resp.send("Hello fullstack!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running at", PORT);
});