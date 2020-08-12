import {NewPatientEntry, Gender} from "../types";

const isString = (text: any): text is string => {
    return typeof text === "string"|| text instanceof String;
};

const parseString = (name: string): string => {
    if (isString(name)) {
        return name;
    } else {
        throw new Error("Not a string or missing");
    }
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
  };
  
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object:NewPatientEntry):NewPatientEntry => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };
};

export default toNewPatientEntry;