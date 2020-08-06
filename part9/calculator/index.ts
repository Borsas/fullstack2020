/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express = require("express");
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises, excerciseResult} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, resp) => {
    resp.send("Hello fullstack!");
});

app.get("/bmi", (req, resp) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        const bmi:string = calculateBmi(height, weight);

        if (isNaN(height) || isNaN(weight)) {
            console.log("LOL");
            throw new Error();
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

app.post("/excersices", (req, resp) => {
    const excersices: Array<number> = req.body.daily_exercises;
    const target: number = req.body.target;

    if (!excersices || !target) {
        resp.status(400).json({error: "Parameters missing"});
    }

    if (excersices.some(isNaN) || isNaN(target)) {
        resp.status(400).json({error: "Malformed parameters"});
    }

    const result:excerciseResult = calculateExercises(excersices, target);
    resp.json(result);

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running at", PORT);
});