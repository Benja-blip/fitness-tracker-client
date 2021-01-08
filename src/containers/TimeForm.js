import React from 'react';
import { Field, reduxForm, Form} from 'redux-form';
import "./TimeForm.css";
import {useDispatch} from "react-redux";
import {autoTransitionOn} from "../components/Actions";

let TimeForm = (props) => {

    const { handleSubmit } = props
    const dispatch = useDispatch();
    return (
        <Form onSubmit={handleSubmit((values) => console.log(values))}>
            <div className="container">
                <div className="interval-form">
                    <label>Work Interval</label>
                    <Field name="workPeriod" component="input" type="text" default/>
                    <label>Rest Interval</label>
                    <Field name="restPeriod" component="input" type="text" default/>
                    <label>AutoTransition</label>
                    <Field name="autoTransition" component="input" type="checkbox" onSubmit={dispatch(autoTransitionOn())}/>
                </div>
            </div>
        </Form>
    )
}

TimeForm = reduxForm({
    form: 'intervalSettings',
    initialValues: {
        workPeriod: 30,
        restPeriod: 5,
        autoTransition: true
    },
    destroyOnUnmount: false,
    // enableReinitialize: true
})(TimeForm)

export default TimeForm