import React from "react";

import { OccupationalHealthcareEntry } from "../../types";

import { Segment, Header, Icon} from "semantic-ui-react";

interface PatientEntryProps {
    entry: OccupationalHealthcareEntry;
    getDiagnoseName: (code: string) => string
};

const OccupationalEntry:React.FC<PatientEntryProps> = ({entry, getDiagnoseName}) => {
    return (
        <Segment>
            <Header>
                {entry.date} <Icon name="stethoscope"/> {entry.employerName}
            </Header>
            <div>
                <i>{entry.description}</i>
            </div>
            <ul>
                {entry.diagnosisCodes?.map((code: string) => {
                    return <li key={code}>
                        {code} {getDiagnoseName(code)}
                        </li>
                })}
            </ul>
        </Segment>
    )
}

export default OccupationalEntry;