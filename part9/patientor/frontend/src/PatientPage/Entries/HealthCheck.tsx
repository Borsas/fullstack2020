import React from "react";

import { HealthCheckEntry } from "../../types";

import { Segment, Header, Icon, Rating} from "semantic-ui-react";

interface PatientEntryProps {
    entry: HealthCheckEntry;
    getDiagnoseName: (code: string) => string
};

const HealthCheck:React.FC<PatientEntryProps> = ({entry, getDiagnoseName}) => {
    return (
        <Segment>
            <Header>
                {entry.date} <Icon name="user md"/>
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
            <div>
                <Rating icon="heart" rating={1 - entry.healthCheckRating} disabled/>
            </div>
        </Segment>
    )
}

export default HealthCheck;