import React, { useState } from "react";
import LoaderButton from "../components/LoaderButton";
import "./NewActivity.css";
import { API } from "aws-amplify";
import {connect} from "react-redux";

// export default function NewActivity(props) {
const NewActivity = (props) => {
    const [title, setTitle] = useState("");
    const [activityType, setActivityType] = useState("");
    const [activityComment, setActivityComment] = useState("");
    const [activityRoutine, setActivityRoutine] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return title.length > 0 && activityType.length > 0;
    }

    async function handleSubmit(event, activityId) {
        event.preventDefault();

        setIsLoading(true);

        if (props.isAuthenticated) {
            try {
                await createActivity({ title, activityType, activityRoutine, activityComment });
                props.history.push("/");
                setIsLoading(false);
                setTitle("");
                setActivityType("");
                setActivityRoutine("");
                setActivityComment("");
            } catch(e) {
                console.log(e);
                setIsLoading(false);
            }
    
            function createActivity(activity) {
                return API.post("activities", "/activities", {
                    body: activity
                });
            }
        } else {
            console.log("redux activities: ", props.activities);
            const activityId = props.activities.length.toString();
            console.log("activity id: ", props.activities.length.toString());
            const activity = {activityId, title, activityType, activityRoutine, activityComment};
            props.activities.push(activity);
            setIsLoading(false);
            setTitle("");
            setActivityType("");
            setActivityRoutine("");
            setActivityComment("");
            console.log("activity Id now: ", activityId);
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
                        <input value={activityType} onChange={e => setActivityType(e.target.value)} placeholder="Type (required)"/>
                    </div>
                    <div className="input-div">
                        <input value={activityRoutine} onChange={e => setActivityRoutine(e.target.value)} placeholder="Routine"/>
                    </div>
                    <div className="input-div">
                        <input value={activityComment} onChange={e => setActivityComment(e.target.value)} placeholder="Comment"/>
                    </div>
                    <LoaderButton
                    block
                    type="submit"
                    bsSize="ex small"
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
};

const mapStateToProps = state => {
    return {
        activities: state.activitiesList.activities
    };
};

export default connect(mapStateToProps)(NewActivity);