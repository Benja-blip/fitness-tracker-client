import React, { useState } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewActivity.css";
import { API } from "aws-amplify";

export default function NewActivity(props) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [comment, setComment] = useState("");
    const [routine, setRoutine] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return title.length > 0 && type.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await createActivity({ title, type, comment, routine });
            props.history.push("/");
        } catch(e) {
            console.log(e);
            setIsLoading(false);
        }

        function createActivity(activity) {
            return API.post("activities", "/activities", {
                body: activity
            });
        }
    }

    return (
        <div className="NewActivity">
            <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="title" bsSize="small">
                    <FormControl
                      value={title}
                      rows="1"
                      placeholder="Name (required)"
                      componentClass="textarea"
                      onChange={e => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="type" bsSize="small">
                    <FormControl
                      placeholder="Type (required)"
                      rows="1"
                      value={type}
                      componentClass="textarea"
                      onChange={e => setType(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="comment" bsSize="small">
                    <FormControl
                      placeholder="Comment"
                      rows="1"
                      value={comment}
                      componentClass="textarea"
                      onChange={e => setComment(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="routine" bsSize="small">
                    <FormControl
                      placeholder="Routine"
                      rows="1"
                      value={routine}
                      componentClass="textarea"
                      onChange={e => setRoutine(e.target.value)}
                    />
                </FormGroup>
                <LoaderButton
                  block
                  type="submit"
                  bsSize="small"
                  bsStyle="primary"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                >
                  Create
                </LoaderButton>
            </form>
            </div>
        </div>
    );
}