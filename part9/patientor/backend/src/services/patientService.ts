import patientData from "../data/patientsData";
import { Patient, PatientWithNoSSN } from "../types";

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


export default {
    getAll,
    getEntriesNoSSN
};