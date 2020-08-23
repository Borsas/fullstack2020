import React from "react";
import { Segment, Header, Icon} from "semantic-ui-react";

import { OccupationalHealthcareEntry } from "../../types";
import EntryCommon from "./EntryCommon";

const OccupationalEntry:React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    return (
        <Segment>
            <Header>
                {entry.date} <Icon name="stethoscope"/> {entry.employerName}
            </Header>
            <EntryCommon entry={entry}/>
        </Segment>
    )
}

export default OccupationalEntry;