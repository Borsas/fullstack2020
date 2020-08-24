import patientData from "../data/patientsData";
import { v4 as uuid } from "uuid";
import { Patient, NewPatientEntry, PublicPatient, Entry, NewMedicalEntry } from "../types";

const getAll = (): Patient[] => {
    return patientData;
};

const getEntriesNoSSN = (): PublicPatient [] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, 
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getOnePatient = (id: string): Patient | undefined => {
    const patient: Patient | undefined = patientData.find(patient => {
        return patient.id === id;
    });

    if (!patient?.entries) {
        return patient;
    }

    if(checkEntryType(patient.entries)){
        return patient;
    }
    return undefined;
};

const checkEntryType = (entries: Entry[]): boolean => {
    let value = true;
    entries.forEach((entry: Entry) => {
        if(!["OccupationalHealthcare", "Hospital", "HealthCheck"].includes(entry.type)) {
            value = false;
        }
    });
    return value;
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

const addEntry = (newEntryEntry: NewMedicalEntry, patientId:string): Entry => {
    const id: string = uuid();
    const newEntry = {
        ...newEntryEntry,
        id
    };
    const patient:Patient | undefined = patientData.find((patient:Patient) => patient.id === patientId);
    if (!patient) throw new Error("Invalid patient ID");

    patientData[patientData.indexOf(patient)].entries.push(newEntry as Entry);
    return newEntry as Entry;
};


export default {
    getAll,
    getEntriesNoSSN,
    addPatient,
    addEntry,
    getOnePatient
};