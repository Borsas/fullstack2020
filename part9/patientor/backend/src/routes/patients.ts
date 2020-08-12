/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/toNewPatientEntry";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getEntriesNoSSN());
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).send(error);
    }
});


export default router;