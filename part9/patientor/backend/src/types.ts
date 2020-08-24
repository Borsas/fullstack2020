export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    }
  }
  
  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
  
  export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum EntryType {
  "HealthCheck", 
  "OccupationalHealthcare",
  "Hospital"
}

export type PatientWithNoSSN = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;

export type NewMedicalEntry = Omit<Entry, "id">;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export type PublicPatient = Omit<Patient, "ssn" | "entries" >;