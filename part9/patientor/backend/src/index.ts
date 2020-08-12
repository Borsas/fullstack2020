import express from "express";
import cors from "cors";
import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
    res.json("Pong!");
});

// Routers
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});