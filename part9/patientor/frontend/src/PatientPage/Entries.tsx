import React from "react";
import { Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";

import { Divider, Header } from "semantic-ui-react";

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
                                    return <li key={code}>
                                        {code} {getDiagnoseName(code)}
                                        </li>
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