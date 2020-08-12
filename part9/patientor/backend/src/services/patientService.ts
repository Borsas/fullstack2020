import patientData from "../data/patientsData";
import { v4 as uuid } from "uuid";
import { Patient, PatientWithNoSSN, NewPatientEntry } from "../types";

const getAll = (): Patient[] => {
    return patientData;
};

const getEntriesNoSSN = (): PatientWithNoSSN [] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name,
        dateOfBirth,
        gender,
        occupation
    }));
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
    addPatient
};