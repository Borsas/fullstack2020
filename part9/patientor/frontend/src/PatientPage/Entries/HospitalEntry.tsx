import React from "react";

import { HospitalEntry } from "../../types";

import { Segment, Header, Icon} from "semantic-ui-react";

interface PatientEntryProps {
    entry: HospitalEntry;
    getDiagnoseName: (code: string) => string
};

const Hospital:React.FC<PatientEntryProps> = ({entry, getDiagnoseName}) => {
    return (
        <Segment>
            <Header>
                {entry.date} <Icon name="hospital"/>
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

export default Hospital;