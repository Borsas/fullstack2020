import React from "react";
import { Entry } from "../types";

import { Divider, Header } from "semantic-ui-react";

const Entries: React.FC<{entries: Entry[] | undefined}> = ({entries}) => {

    if (!entries) {
        return null;
    }

    return (
        <div>
            <Divider/>
            <Header as="h3">Entries</Header>
            <div>
                {entries.map((entry: Entry) => {
                    return (
                        <div key={entry.id}>
                            <div>
                                {entry.date} <i>{entry.description}</i>
                            </div>
                            <ul>
                                {entry.diagnosisCodes?.map((code: string) => {
                                    return <li key={code}>{code}</li>
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Entries;