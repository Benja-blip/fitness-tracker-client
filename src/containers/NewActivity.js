import React, { useState } from "react";
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
            setIsLoading(false);
            setTitle("");
            setType("");
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
                    <div className="input-div">
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Name (required)"/>
                    </div>
                    <div className="input-div">
                        <input value={type} onChange={e => setType(e.target.value)} placeholder="Type (required)"/>
                    </div>
                    <div className="input-div">
                        <input value={routine} onChange={e => setRoutine(e.target.value)} placeholder="Routine"/>
                    </div>
                    <div className="input-div">
                        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment"/>
                    </div>
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