/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/toNewPatientEntry";
import { PublicPatient } from "../types";

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

router.get("/:id", (req, res) => {
    const id:string = req.params.id;
    const patient:PublicPatient | undefined  = patientService.getOnePatient(id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(400).send({"message": "Invalid patient"});
    }
});


export default router;