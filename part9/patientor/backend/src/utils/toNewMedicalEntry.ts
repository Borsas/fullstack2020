import { NewMedicalEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewHealthCheckEntry } from "../types";

const checkCommon = (object:NewMedicalEntry): NewMedicalEntry => {
    if (!object.type || !object.specialist || !object.description || !object.date){
        throw new Error("Invalid data");
    }
    const obj = {
        type: object.type,
        specialist: object.specialist,
        description: object.description,
        date: object.date,
    };

    if (object.diagnosisCodes) return {...obj,diagnosisCodes: object.diagnosisCodes};

    return obj;

};

const returnHospital = (object: NewHospitalEntry):NewMedicalEntry => {
    if(!object.discharge || !object.discharge.criteria || !object.discharge.date) {
        throw new Error("Invalid type data");
    }
    return {
        ...checkCommon(object),
        ...object.discharge
    };
};

const returnHealthCheck = (object: NewHealthCheckEntry):NewMedicalEntry => {
    if (!object.healthCheckRating) {
        throw new Error("Invalid type data");
    }
    return {
        ...checkCommon(object),
        healthCheckRating: object.healthCheckRating
    } as NewMedicalEntry;
};

const returnOccupational = (object: NewOccupationalHealthcareEntry):NewMedicalEntry => {
    if(!object.employerName) {
        throw new Error("Invalid type data");
    }

    if (object.sickLeave?.endDate && object.sickLeave.startDate){
        return {
            ...checkCommon(object),
            ...object.sickLeave,
            employerName: object.employerName
        } as NewMedicalEntry;
    }

    return {
        ...checkCommon(object),
        employerName: object.employerName
    } as NewMedicalEntry;
};


const toNewMedicalEntry = (object:NewMedicalEntry):NewMedicalEntry => {
    switch (object.type) {
        case "Hospital":
            return returnHospital(object as NewHospitalEntry);
        case "HealthCheck":
            return returnHealthCheck(object as NewHealthCheckEntry);
        case "OccupationalHealthcare":
            return returnOccupational(object as NewOccupationalHealthcareEntry);
        default:
            throw new Error("Invalid type");
    }
};

export default toNewMedicalEntry;