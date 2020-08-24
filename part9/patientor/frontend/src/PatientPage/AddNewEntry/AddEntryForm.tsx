import React from "react";

import { Dropdown } from "semantic-ui-react";

import {EntryValues} from "../../types";

import HospitalForm  from "./EntryForms/HospitalForm";
import HealthCheckForm from "./EntryForms/HealthCheckForm"
import OccupationalForm from "./EntryForms/OccupationalForm";


interface props  {
    onSubmit: (values: EntryValues) => void;
    onCancel: () => void;
}

const AddEntryForm:React.FC<props> = ({onSubmit, onCancel}) => {
    const [typeValue, setTypeValue] = React.useState<string>("");
    
    const types = [
        {
            key: "Hospital",
            text: "Hospital",
            value: "Hospital"
        },
        {
            key: "OccupationalHealthcare",
            text: "OccupationalHealthcare",
            value: "OccupationalHealthcare"
        },
        {
            key: "HealthCheck",
            text: "HealthCheck",
            value: "HealthCheck"
        }
    ]

    return (
        <div>
            <Dropdown
            placeholder="Choose type"
            fluid
            selection
            options={types}
            onChange={(e, {value}) => setTypeValue(value as string)}
            />
            {typeValue === "Hospital" ? <HospitalForm onSubmit={onSubmit} onCancel={onCancel}/>: null}
            {typeValue === "HealthCheck" ? <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel}/>: null}
            {typeValue === "OccupationalHealthcare" ? <OccupationalForm onSubmit={onSubmit} onCancel={onCancel}/>: null}
        </div>
    )
}

export default AddEntryForm;