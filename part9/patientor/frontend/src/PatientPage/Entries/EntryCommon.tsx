import React from "react";

import { Entry, Diagnosis } from "../../types";
import { useStateValue } from "../../state";

const EntryCommon:React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnoses }] = useStateValue();

    const getDiagnoseName = (code: string):string => {
        const name = Object.values(diagnoses).find((c:Diagnosis) => c.code === code);
        if (name === undefined) {
            return "";
        }
        return name.name;
    }
    return (
        <div>
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
        </div>
    )
}

export default EntryCommon;