import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Button, Modal } from "semantic-ui-react";
import AddEntryForm from "./AddEntryForm";

import { EntryValues, Entry, Patient } from "../../types";
import { apiBaseUrl }  from "../../constants";
import { useStateValue, setCachePatientList } from "../../state";


const AddNewEntry:React.FC = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const [{cachedPatients}, dispatch] = useStateValue();

    const openModal = () => setModalOpen(true); 
    const closeModal = () => setModalOpen(false);

    const handleNewEntry = async (values: EntryValues) => {
        try {
            const {data: newEntry} = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            const cachePatients:Patient[] = Object.values(cachedPatients);
            const newPatientList = cachePatients.map((patient: Patient) => {

                if (patient.id === id) {
                    if (patient.entries) {
                        patient.entries.push(newEntry);
                    } else {
                        patient.entries = [newEntry];
                    }
                    return patient;
                }
                return patient;
            });
            dispatch(setCachePatientList(newPatientList));
            closeModal();
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Button onClick={() => openModal()}primary size="tiny">Add new Entry</Button>
            <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
                <Modal.Header>Add a new entry</Modal.Header>
                    <Modal.Content>
                        <AddEntryForm onSubmit={handleNewEntry} onCancel={closeModal}/>
                    </Modal.Content>
            </Modal>
        </div>
    )
}

export default AddNewEntry;