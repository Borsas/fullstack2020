import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
    res.json("Pong!");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});