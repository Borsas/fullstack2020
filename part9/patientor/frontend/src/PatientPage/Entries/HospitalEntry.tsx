import React from "react";
import { Segment, Header, Icon} from "semantic-ui-react";

import { HospitalEntry } from "../../types";
import EntryCommon from "./EntryCommon";

const Hospital:React.FC<{entry: HospitalEntry}> = ({entry}) => {
    return (
        <Segment>
            <Header>
                {entry.date} <Icon name="hospital"/>
            </Header>
            <EntryCommon entry={entry}/>
        </Segment>
    )
}

export default Hospital;