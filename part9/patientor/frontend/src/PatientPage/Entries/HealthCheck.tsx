import React from "react";
import { Segment, Header, Icon, Rating} from "semantic-ui-react";

import { HealthCheckEntry } from "../../types";
import EntryCommon from "./EntryCommon";

const HealthCheck:React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return (
        <Segment>
            <Header>
                {entry.date} <Icon name="user md"/>
            </Header>
            <EntryCommon entry={entry}/>
            <div>
                <Rating icon="heart" rating={1 - entry.healthCheckRating} disabled/>
            </div>
        </Segment>
    )
}

export default HealthCheck;