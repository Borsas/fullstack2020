import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import { Container, Header, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { useStateValue, addCachePatient } from "../state";

import { apiBaseUrl } from "../constants";

import Entries from "./Entries";

const PatientPage: React.FC = () => {
    const [{ cachedPatients }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();
    const patient:Patient | undefined = Object.values(cachedPatients).find((patient: Patient) => {
        return patient.id === id;
    });

    React.useEffect(() => {
        const fetchOnePatient = async () => {
            try {
                const {data: newPatient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(addCachePatient(newPatient));
            } catch (e) {
                console.error(e);
            }
        }
        if (!patient) {
            fetchOnePatient();
        }
    }, [dispatch]);

    type IconType = "mars" | "venus" | "genderless";
    const getGenderIcon = (gender: string): IconType  => {
        switch (gender) {
            case "male":
                return "mars";
            case "female":
                return "venus";
            default:
                return "genderless";
        }
    }

    if (!patient) {
        return <div> Patient not found</div>
    }

    return (
        <div>
        <Container>
            <Header as="h1">
                {patient.name} 
                <Icon name={getGenderIcon(patient.gender)}/>
            </Header>
            <div><b>SSN: {patient.ssn}</b></div>
            <div><b>Occupation: {patient.occupation}</b></div>
            <Entries entries={patient.entries}/>
        </Container>
        </div>
        
    );

};

export default PatientPage;