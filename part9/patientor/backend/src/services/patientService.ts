import patientData from "../data/patientsData";
import { v4 as uuid } from "uuid";
import { Patient, PatientWithNoSSN, NewPatientEntry, PublicPatient } from "../types";

const getAll = (): Patient[] => {
    return patientData;
};

const getEntriesNoSSN = (): PatientWithNoSSN [] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, 
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getOnePatient = (id: string): PublicPatient | undefined => {
    return patientData.find(patient => {
        return patient.id === id;
    });
};

const addPatient = (patient: NewPatientEntry): Patient => {
    const id: string = uuid();
    const newPatientEntry = {
        ...patient,
        id
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};


export default {
    getAll,
    getEntriesNoSSN,
    addPatient,
    getOnePatient
};