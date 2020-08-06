import express = require("express");
import {calculateBmi} from "./bmiCalculator"

const app = express();

app.get("/hello", (_req, resp) => {
    resp.send("Hello fullstack!");
});

app.get("/bmi", (req, resp) => {
    try {
        const height:number = Number(req.query.height);
        const weight:number = Number(req.query.weight);
        const bmi:string = calculateBmi(height, weight);

        if (isNaN(height) || isNaN(weight)) {
            console.log("LOL")
            throw new Error()
        }

        resp.json({
            height,
            weight,
            bmi
        });
    } catch (error) {
        resp.json({ error: "Malformatted parameters"});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running at", PORT);
});