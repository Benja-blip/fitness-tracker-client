import React, { useState, useEffect } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';
import Toggle from '../components/Toggle';
import "./ViewActivity.css";
import Activities from "./Activities";

export default function ViewActivity(props) {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (isLoading) {
            setMessage("Loading...")
        }
    }, [isLoading])

    useEffect(() => {
        async function onload() {
            if(!props.isAuthenticated) {
                return;
            }
            try {
                setIsLoading(true)
                const activities = await loadActivities();
                setActivities(activities);
                setIsLoading(false);
            } catch(e) {
                console.log(e);
            }
        }

        onload();
    }, [props.isAuthenticated]);

    function loadActivities() {
        return API.get("activities", "/activities");
    }

    function renderActivitiesList(activities) {
        return [{}].concat(activities).map((activity, i) =>
            i !== 0 && (
                <div>
                    <Toggle {...props}>
                        {({on, toggle}) => (
                            <div>
                                <button id="activity-button" onClick={toggle}>
                                    <div id="title-div">
                                        {activity.title}
                                    </div>
                                    <div>
                                    {"Type: " + activity.activityType}
                                    {"  |  Routine: " + activity.activityRoutine}
                                    </div>
                                    {"Comment: " + activity.activityComment}
                                </button>
                                {on && <Activities activityId = {activity.activityId} {...props}/>}
                            </div>
                        )}
                    </Toggle>
                </div>
            )
        );
    }

    return (
        <div className="activities">
            {isLoading && message}
            <div className="list-container">
                <div id="actual-list">
                    {props.isAuthenticated && renderActivitiesList(activities)}
                </div>
            </div>
        </div>
    );
}