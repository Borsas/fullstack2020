import React from "react";
import { Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";

import { Divider, Header } from "semantic-ui-react";

import HospitalEntry from "./Entries/HospitalEntry";
import HealthCheck from "./Entries/HealthCheck";
import Occupational from "./Entries/Occupational";

const Entries: React.FC<{entries: Entry[] | undefined}> = ({entries}) => {
    const [{ diagnoses }] = useStateValue();

    if (!entries) {
        return null;
    }

    const getDiagnoseName = (code: string):string => {
        const name = Object.values(diagnoses).find((c:Diagnosis) => c.code === code);
        if (name === undefined) {
            return "";
        }
        return name.name;
    }

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    return (
        <div>
            <Divider/>
            <Header as="h3">Entries</Header>
            <div>
                {entries.map((entry: Entry) => {
                    switch (entry.type) {
                        case "Hospital":
                            return <HospitalEntry key={entry.id} 
                            entry={entry} getDiagnoseName={getDiagnoseName}/>
                        case "HealthCheck":
                            return <HealthCheck key={entry.id} 
                            entry={entry} getDiagnoseName={getDiagnoseName}/>
                        case "OccupationalHealthcare":
                            return <Occupational key={entry.id} 
                            entry={entry} getDiagnoseName={getDiagnoseName}/>
                        default:
                            return assertNever(entry);
                    }
                    
                })}
            </div>
        </div>
    )
}

export default Entries;