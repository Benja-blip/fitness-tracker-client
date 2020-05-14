import React from 'react';
import { Field, reduxForm, Form} from 'redux-form';
import "./TimeForm.css";

let TimeForm = (props) => {

    const { handleSubmit } = props
    return (
        <Form onSubmit={handleSubmit((values) => console.log(values))}>
            <div className="container">
                <div className="interval-form">
                    <label>Work Interval</label>
                    <Field name="workPeriod" component="input" type="text" default/>
                </div>
            </div>
        </Form>
    )
}

TimeForm = reduxForm({
    form: 'intervalSettings',
    initialValues: {
        workPeriod: 30
    },
    destroyOnUnmount: false,
    enableReinitialize: true
})(TimeForm)

export default TimeForm