import React from "react";

import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, DiagnosisSelection } from "../../../AddPatientModal/FormField";

import {useStateValue} from "../../../state";
import { EntryValues, OccupationalHealthcareEntryValue } from "../../../types";


interface props  {
    onSubmit: (values: EntryValues) => void;
    onCancel: () => void;
}

const OccupationalForm:React.FC<props> = ({onSubmit, onCancel}) => {
    const [{ diagnoses }] = useStateValue()

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: ""
                },
                diagnosisCodes: []
            } as OccupationalHealthcareEntryValue}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.type) {
                errors.type = requiredError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (!values.date) {
                errors.date = requiredError;
            }
            if (isNaN(Date.parse(values.date))){
                errors.date = "Invalid date"
            }
            if (!values.diagnosisCodes) {
                errors.diagnosisCodes = requiredError;
            }
            if (!values.employerName) {
                errors.employerName = requiredError;
            }
            return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
            return (
            <Form className="form ui">
                <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                />
                <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                />
                <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                />
                <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnoses)}
                />   
                <Field
                    label="Employer name"
                    placeholder="Employer name"
                    name="employerName"
                    component={TextField}
                />
                <Field
                    label="Sick leave start date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                />
                <Field
                    label="Sick leave end date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                />

                <Grid>
                <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                    Cancel
                    </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                    <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid.Column>
                </Grid>
            </Form>
        );
      }}
    </Formik>
    )
}

export default OccupationalForm;