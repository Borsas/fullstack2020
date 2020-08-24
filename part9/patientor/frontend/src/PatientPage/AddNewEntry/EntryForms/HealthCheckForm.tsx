import React from "react";

import { Field, Formik, Form} from "formik";
import { Grid, Button } from "semantic-ui-react";

import { TextField, DiagnosisSelection, NumberField } from "../../../AddPatientModal/FormField";

import {useStateValue} from "../../../state";
import {EntryValues, HealthCheckRating, HealthCheckOptions, HealthCheckEntryValue} from "../../../types";


interface props  {
    onSubmit: (values: EntryValues) => void;
    onCancel: () => void;
}

const HealthCheckForm:React.FC<props> = ({onSubmit, onCancel}) => {
    const [{ diagnoses }] = useStateValue()

    const healthOptions: HealthCheckOptions[] = [
        {value: HealthCheckRating.Healthy, label: "Healthy"},
        {value: HealthCheckRating.LowRisk, label: "LowRisk"},
        {value: HealthCheckRating.HighRisk, label: "HighRisk"},
        {value: HealthCheckRating.CriticalRisk, label: "CriticalRisk"},
    ]

    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                healthCheckRating: HealthCheckRating.Healthy,
                diagnosisCodes: []
            } as HealthCheckEntryValue}
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
            if (!values.healthCheckRating) {
                errors.healthCheckRating = requiredError;
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
                    label="HealthCheckRating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={1}
                    max={3}
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

export default HealthCheckForm;