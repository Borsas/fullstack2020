import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_CACHE_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  }
  | {
    type: "SET_CACHE_PATIENT_LIST";
    payload: Patient[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_CACHE_PATIENT_LIST":
      return {
        ...state,
        cachedPatients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.cachedPatients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_CACHE_PATIENT":
      return {
        ...state,
        cachedPatients: {
          ...state.cachedPatients,
          [action.payload.id]: action.payload
        }
      }
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnoses
        }
      }
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi :Patient[]):Action => {
  return {
      type: "SET_PATIENT_LIST",
      payload: patientListFromApi 
  }
}

export const addNewPatient = (newPatient: Patient): Action => {
  return { 
    type: "ADD_PATIENT", 
    payload: newPatient 
  }
}

export const addCachePatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_CACHE_PATIENT",
    payload: newPatient
  }
}

export const setDiagnosesList = (diagnosesFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnosesFromApi
  }
}

export const setCachePatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_CACHE_PATIENT_LIST",
    payload: patients
  }
}