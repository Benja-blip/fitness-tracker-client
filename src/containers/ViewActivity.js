import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';
import "./ViewActivity.css";

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
                <LinkContainer key={activity.title} to={`/activities/${activity.activityId}`}>
                    <button id="activity-button">
                        <div id="title-div">
                            {activity.title}
                        </div>
                        <div>
                        {"Type: " + activity.type}
                        {"  |  Routine: " + activity.routine}
                        </div>
                        {"Comment: " + activity.comment}
                    </button>
                </LinkContainer>
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