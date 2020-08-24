import React from "react";

import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, DiagnosisSelection } from "../../../AddPatientModal/FormField";

import {useStateValue} from "../../../state";
import {EntryValues, HospitalEntryValue} from "../../../types";


interface props  {
    onSubmit: (values: EntryValues) => void;
    onCancel: () => void;
}

const HospitalForm:React.FC<props> = ({onSubmit, onCancel}) => {
    const [{ diagnoses }] = useStateValue()

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                discharge: {
                    date: "",
                    criteria: ""
                },
                diagnosisCodes: []
            } as HospitalEntryValue}
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
                if (!values.discharge.date) {
                    errors.discharge = requiredError;
                }
                if (isNaN(Date.parse(values.discharge.date))) {
                    errors.discharge = "Invalid date";
                }
                if (!values.discharge.criteria) {
                    errors.discharge = requiredError;
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
                    label="Discharge date"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField}
                />
                <Field
                    label="Discharge Criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
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
                        >Add</Button>
                    </Grid.Column>
                </Grid>
            </Form>
        );
      }}
    </Formik>
    )
}

export default HospitalForm;