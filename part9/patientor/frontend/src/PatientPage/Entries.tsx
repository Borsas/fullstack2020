import React from "react";
import { Entry } from "../types";

import { Divider, Header } from "semantic-ui-react";

import HospitalEntry from "./Entries/HospitalEntry";
import HealthCheck from "./Entries/HealthCheck";
import Occupational from "./Entries/Occupational";
import AddNewEntry from "./AddNewEntry/AddNewEntry";

const Entries: React.FC<{entries: Entry[] | undefined}> = ({entries}) => {
    if (!entries) {
        return null;
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
            <AddNewEntry/>
            <div>
                {entries.map((entry: Entry) => {
                    switch (entry.type) {
                        case "Hospital":
                            return <HospitalEntry key={entry.id} 
                            entry={entry}/>
                        case "HealthCheck":
                            return <HealthCheck key={entry.id} 
                            entry={entry}/>
                        case "OccupationalHealthcare":
                            return <Occupational key={entry.id} 
                            entry={entry}/>
                        default:
                            return assertNever(entry);
                    }
                    
                })}
            </div>
        </div>
    )
}

export default Entries;